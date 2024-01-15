package com.example.demo.security.service;

import com.example.demo.entity.*;
import com.example.demo.model.request.TokenResponse;
import com.example.demo.security.Request.UserRequestDTO;
import com.example.demo.security.jwt.JwtTokenUtil;
import com.example.demo.security.jwt.JwtUserDetailsService;
import com.example.demo.security.jwt_model.JwtRequest;
import com.example.demo.security.service.impl.UserService;
import com.example.demo.security.util.Helper;
import com.example.demo.senderMail.Respone.ResponseObject;
import com.example.demo.service.AccountService;
import com.example.demo.service.CustomerService;
import com.example.demo.service.RefreshTokenService;
import com.example.demo.service.RoleService;
import com.example.demo.service.onlineSales.OlAccountService;
import com.example.demo.service.onlineSales.OlCustomerService;
import com.example.demo.service.onlineSales.OlEmployeeService;
import com.example.demo.service.serviceiplm.AccountServiceImpl;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
//    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private  JwtUserDetailsService userDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private AccountService accountService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private OlAccountService olAccountService;

    @Autowired
    private OlEmployeeService olEmployeeService;

    @Autowired
    private OlCustomerService olCustomerService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private RoleService roleService;

    private final ModelMapper mapper;
    private final PasswordEncoder bcryptEncoder;
    private final Helper helper;
    private final AccountEmailSender accountEmailSender;

    @Autowired
    public UserServiceImpl(AccountServiceImpl accountService, ModelMapper mapper, PasswordEncoder bcryptEncoder, Helper helper, AccountEmailSender accountEmailSender) {
        this.mapper = mapper;
        this.bcryptEncoder = bcryptEncoder;
        this.helper = helper;
        this.accountEmailSender = accountEmailSender;
    }

//    @Value("${spring.mail.username}")
//    private String sender;

    public void sendSimpleEmail(String toEmail, String text, String subject) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setText(text);
        message.setSubject(subject);
        javaMailSender.send(message);
    }

    @Override
    public boolean resetPassword(String email, String newPassword) {
        List<AccountEntity> accountEntity = (List<AccountEntity>) accountService.findByEmail(email);
        if (accountEntity.get(0) != null){
            accountEntity.get(0).setPassword(bcryptEncoder.encode(newPassword));
            accountEntity.get(0).setConfirmationCode(null);
            accountService.createAccount(accountEntity.get(0));
            return true; // Trả về true khi reset mật khẩu thành công
        } else {
            return false; // Trả về false nếu không tìm thấy tài khoản để reset mật khẩu
        }
    }

    @Override
    public boolean resetPassword2(String username, String newPassword) {
        Optional<AccountEntity> accountEntity = accountService.findByAccount2(username);
        System.out.println(accountEntity.get());

        if (accountEntity.isPresent()){
            accountEntity.get().setPassword(bcryptEncoder.encode(newPassword));
            accountService.createAccount(accountEntity.get());
            return true; // Trả về true khi reset mật khẩu thành công
        } else {
            return false; // Trả về false nếu không tìm thấy tài khoản để reset mật khẩu
        }
    }

    @Override
    public ResponseObject register(UserRequestDTO user) {
        UserRequestDTO userRequestDTO = helper.getUser(user.getAccount(), accountService.getAllAccount2());
        if (userRequestDTO != null) {
            return new ResponseObject("400", "Email này tồn tại", null);
        } else {
            String otp = helper.generateOTP(); // Tạo mã OTP
            user.setPassword(bcryptEncoder.encode(user.getPassword()));
            AccountEntity savedUser = mapper.map(user, AccountEntity.class);

            Optional<Roles> roles = roleService.findByFullNameAndStatus("CUSTOMER",1);
            if (!roles.isPresent()){
                Roles rolesNew = new Roles();
                rolesNew.setFullName("CUSTOMER");
                rolesNew.setCreatedAt(new Date());
                rolesNew.setStatus(1);
              Roles roles1 =  roleService.save(rolesNew);
                savedUser.setRole(roles1);

            }else {
                savedUser.setRole(roles.get());
            }
            savedUser = this.accountService.createAccount(savedUser);
            if (savedUser != null) {
                CustomerEntity customerEntity = new CustomerEntity();
                customerEntity.setAccount(savedUser);
                customerEntity.setFullName(user.getLastName() + user.getFirstName());
                customerEntity.setAvatar("https://res.cloudinary.com/dvtz5mjdb/image/upload/v1703880421/image/InfoHome/a2mnm9slz4bf7n3ivkhf.jpg");
                customerEntity.setStatus(1);
                customerEntity.setCreatedAt(new Date());
                customerService.createCustomer(customerEntity);

                accountEmailSender.sendAccountCreationEmail(user.getEmail(), user.getAccount(), savedUser.getId(), otp);
                return new ResponseObject("200", "Người dùng " + user.getAccount() + "Đã đăng ký thành công", savedUser);
            } else {
                // Xử lý lỗi nếu không lưu được người dùng vào cơ sở dữ liệu
                return new ResponseObject("500", "Không thể đăng ký sử dụng", null);
            }
        }
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            System.out.println("User is disabled: " + e.getMessage());
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            System.out.println("Invalid credentials: " + e.getMessage());
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @Transactional
    @Override
    public TokenResponse login(JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);



        Optional<AccountEntity> account = olAccountService.findByAccount(authenticationRequest.getUsername());
        TokenResponse tokenResponse = new TokenResponse();
        if (account.isPresent()) {
            Optional<CustomerEntity> customerEntity = Optional.ofNullable(olCustomerService.findByAccount_Id(account.get().getId()));
            Optional<Employees> employeeEntity = Optional.ofNullable(olEmployeeService.findByAccount_Id(account.get().getId()));
            refreshTokenService.deleteByAccount(account.get());
            if (customerEntity.isPresent()) {
                RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails,account.get());

                tokenResponse.setAccessToken(token);
                tokenResponse.setRefreshToken(refreshToken.getToken());
                return tokenResponse;

            } else if (employeeEntity.isPresent()) {
                RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails,account.get());
                tokenResponse.setAccessToken(token);
                tokenResponse.setRefreshToken(refreshToken.getToken());
                return tokenResponse;

            }
        }

        return tokenResponse;
    }

//    @Override// TODO kiểm tra xem token hết hạn chưa
//    public RefreshToken verifyExpiration(RefreshToken token) {
//        // trả về thời gian hết hạn của token < Thời gian hiện tại tức token hết hạn
//        if (token.getExpiryDate().compareTo(ChronoLocalDate.from(Instant.now())) < 0) {
//            refreshTokenervice.delete(token); // Xóa token
//            throw new RuntimeException(token.getToken() +
//                    " Refresh token was expired. Please make a new signin request");
//        }
//        return token;
//    }


//    @Override
//    public ResponseObject active(UserRequestDTO userDTO) {
//        try {
//            Optional<AccountEntity> user = this.accountService.findByAccount(userDTO.getAccount());
//            AccountEntity userRequestDTO = user.get();
//            if (userDTO.getOtp().equals(userRequestDTO.getConfirmationCode())) {
//                userRequestDTO.setActive(true);
//                AccountEntity user1 = mapper.map(userRequestDTO, AccountEntity.class);
//                this.accountService.createAccount(user1);
//                System.out.println("Tài khoản được kích hoạt với tên người dùng: " + user.get().getAccount());
//                return new ResponseObject("200", "Kích hoạt tài khoản thành công", null);
//            } else {
//                System.out.println("Tài khoản được kích hoạt với tên người dùng: " + user.get().getAccount() + " fail. Invalid OTP");
//                return new ResponseObject("400", "OTP sai, vui lòng kiểm tra email", null);
//            }
//        } catch (Exception e) {
//            System.out.println("Tài khoản kích hoạt không thành công. Không tìm thấy người dùng");
//            return new ResponseObject("400", "Tai khoản này không tôn tại!", null);
//        }
//    }


    @Override
    public ResponseObject reSendOTP(String email) {
        UserRequestDTO userRequestDTO = helper.getUserByEmail(email, accountService.getAllAccount2());
        if (userRequestDTO == null) {
            return new ResponseObject("400", "email này không tồn tại", null);
        } else {
            String new_otp = helper.generateOTP();
//            userRequestDTO.setOtp(new_otp);
            AccountEntity user1 = mapper.map(userRequestDTO, AccountEntity.class);
            user1.setConfirmationCode(new_otp);

            this.accountService.createAccount(user1);
            sendSimpleEmail(userRequestDTO.getEmail(), new_otp, "Đây là OTP mới của bạn" + new_otp);
            return new ResponseObject("200", "Gửi lại OTP thành công", null);
        }
    }



    @Override
    public ResponseObject forgotPassword(String email) {
        List<AccountEntity> user = accountService.findByEmail(email);
        if ( user.get(0) != null) {

            // Thêm email vào query parameter của URL
            String resetPasswordLink = "http://127.0.0.1:5555/login/resetPass.html?email=" + email;

            sendSimpleEmail(email, "Truy cập link này để thay đổi mật khẩu "+ "<a href='" + resetPasswordLink + "'>Đặt lại mật khẩu của bạn ngay!</a>", "[FiveGuys] Mã xác minh");
            return new ResponseObject("200", "Yêu cầu quên mật khẩu được chấp nhận, vui lòng kiểm tra email và đặt lại mật khẩu của bạn", null);
        } else {
            return new ResponseObject("400", "Người dùng không tồn tại", null);
        }
    }


    @Override
    public Boolean confirmOTP(String userEmail, String enteredOTP) {
        // Lấy thông tin người dùng từ email
        List<AccountEntity> user = accountService.findByEmail(userEmail);

        if (user.get(0) != null) {
            AccountEntity userEntity = user.get(0);
            String storedOTP = userEntity.getConfirmationCode();

            if (storedOTP != null && enteredOTP.equals(storedOTP)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}
