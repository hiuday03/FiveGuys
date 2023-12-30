package com.example.demo.security.service;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.Roles;
import com.example.demo.security.Request.UserRequestDTO;
import com.example.demo.security.service.impl.UserService;
import com.example.demo.security.util.Helper;
import com.example.demo.senderMail.Respone.ResponseObject;
import com.example.demo.service.AccountService;
import com.example.demo.service.CustomerService;
import com.example.demo.service.RoleService;
import com.example.demo.service.onlineSales.OlAccountService;
import com.example.demo.service.serviceiplm.AccountServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
//    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);


    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private AccountService accountService;

    @Autowired
    private CustomerService customerService;

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
        Optional<AccountEntity> accountEntity = accountService.findByEmail(email);
        if (accountEntity.isPresent()){
            accountEntity.get().setPassword(bcryptEncoder.encode(newPassword));
            accountService.createAccount(accountEntity.get());
            return true; // Trả về true khi reset mật khẩu thành công
        } else {
            return false; // Trả về false nếu không tìm thấy tài khoản để reset mật khẩu
        }
    }

    @Override
    public boolean resetPassword2(String username, String newPassword) {
        Optional<AccountEntity> accountEntity = accountService.findByAccount2(username);
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

            this.accountService.createAccount2(user1);
            sendSimpleEmail(userRequestDTO.getEmail(), new_otp, "Đây là OTP mới của bạn");
            return new ResponseObject("200", "Gửi lại OTP thành công", null);
        }
    }



    @Override
    public ResponseObject forgotPassword(String email) {
        Optional<AccountEntity>  user = accountService.findByEmail(email);
        if (user.get() != null && user.isPresent()) {
            String new_otp = helper.generateOTP();
            user.get().setConfirmationCode(new_otp);
            accountService.save(user.get());
            sendSimpleEmail(email, "Mã xác nhận của bạn là  " + new_otp + ">Reset your password now!</a>", "Someone just request to reset your password, if you do this, please follow these steps");
            return new ResponseObject("200", "Forgot password request accepted, please go to your email and reset your password", null);
        } else {
            return new ResponseObject("400", "User not found", null);
        }
    }

    @Override
    public Boolean confirmOTP(String userEmail, String enteredOTP) {
        // Lấy thông tin người dùng từ email
        Optional<AccountEntity> user = accountService.findByEmail(userEmail);

        if (user.isPresent()) {
            AccountEntity userEntity = user.get();
            String storedOTP = userEntity.getConfirmationCode();

            if (enteredOTP.equals(storedOTP)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;

        }
    }
}
