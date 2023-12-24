package com.example.demo.senderMail;

import com.example.demo.entity.AccountEntity;
import com.example.demo.senderMail.Respone.ResponseObject;
import com.example.demo.senderMail.util.Helper;
import com.example.demo.service.AccountService;
import com.example.demo.service.serviceiplm.AccountServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
//    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);


    @Autowired
    private JavaMailSender javaMailSender;

    private final AccountServiceImpl accountService;
    private final ModelMapper mapper;
    private final PasswordEncoder bcryptEncoder;
    private final Helper helper;
    private final AccountEmailSender accountEmailSender;

    @Autowired
    public UserServiceImpl(AccountServiceImpl accountService, ModelMapper mapper, PasswordEncoder bcryptEncoder, Helper helper, AccountEmailSender accountEmailSender) {
        this.accountService = accountService;
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
    public ResponseObject register(AccountEntity user) {
        AccountEntity userRequestDTO = helper.getUser(user.getAccount(), accountService.getAllAccount());
        if (userRequestDTO != null) {
            return new ResponseObject("400", "Email này tồn tại", null);
        } else {
            String otp = helper.generateOTP(); // Tạo mã OTP
            user.setActive(false);
            user.setPassword(bcryptEncoder.encode(user.getPassword()));
            user.setConfirmationCode(otp); // Đặt mã OTP cho người dùng
            // Lưu thông tin người dùng vào cơ sở dữ liệu với mã OTP
            AccountEntity savedUser = mapper.map(user, AccountEntity.class);
            savedUser = this.accountService.createAccount(savedUser);
//            AccountEntity savedUser = accountService.createAccount(user);
            if (savedUser != null) {
                // Gửi email với mã OTP
                accountEmailSender.sendAccountCreationEmail(user.getEmail(), user.getAccount(), savedUser.getId(), otp);
                return new ResponseObject("200", "Người dùng " + user.getAccount() + "Đã đăng ký thành công. Kiểm tra email của bạn và kích hoạt tài khoản của bạn", null);
            } else {
                // Xử lý lỗi nếu không lưu được người dùng vào cơ sở dữ liệu
                return new ResponseObject("500", "Không thể đăng ký sử dụng", null);
            }
        }
    }
//
//    @Override
//    public ResponseObject register(AccountEntity user) {
//        AccountEntity userRequestDTO = helper.getUser(user.getAccount(), accountService.getAllAccount());
//        if (userRequestDTO != null) {
//            return new ResponseObject("400", "This email exists", null);
//        } else {
//            String otp = helper.generateOTP();
//            user.setConfirmationCode(otp);
//            user.setActive(false);
//            System.out.println(("Password: " + user.getPassword()));
//            user.setPassword(bcryptEncoder.encode(user.getPassword()));
//            AccountEntity user1 = mapper.map(user, AccountEntity.class);
//            this.accountService.createAccount(user1);
//            System.out.println("Created account with username: " + user.getAccount() + ", encoded password: " + user.getPassword());
////            String subject = "Chúc mừng bạn đăng ký tài khoản thành công";
////            String text = "Cảm ơn bạn đã đăng ký trên trang web của chúng tôi. Để hoàn tất đăng ký, vui lòng nhập mã xác thực sau đây: ";
////            sendSimpleEmail(user.getEmail(), subject, text);
//            return new ResponseObject("200", "User " + user.getAccount() + " register successfully. Go to your mail and active account", null);
//
//        }
//    }

    @Override
    public ResponseObject reSendOTP(String account) {
        AccountEntity userRequestDTO = helper.getUser(account, accountService.getAllAccount());
        if (userRequestDTO == null) {
            return new ResponseObject("400", "email này không tồn tại", null);
        } else {
            String new_otp = helper.generateOTP();
            userRequestDTO.setConfirmationCode(new_otp);
            AccountEntity user1 = mapper.map(userRequestDTO, AccountEntity.class);
            this.accountService.createAccount(user1);
            sendSimpleEmail(userRequestDTO.getEmail(), new_otp, "Đây là OTP mới của bạn");
            return new ResponseObject("200", "Gửi lại OTP thành công", null);
        }
    }

    @Override
    public ResponseObject active(AccountEntity userDTO) {
        try {
            Optional<AccountEntity> user = this.accountService.findByAccount(userDTO.getAccount());
            AccountEntity userRequestDTO = user.get();
            if (userDTO.getConfirmationCode().equals(userRequestDTO.getConfirmationCode())) {
                userRequestDTO.setActive(true);
                AccountEntity user1 = mapper.map(userRequestDTO, AccountEntity.class);
                this.accountService.createAccount(user1);
                System.out.println("Tài khoản được kích hoạt với tên người dùng: " + user.get().getAccount());
                return new ResponseObject("200", "Kích hoạt tài khoản thành công", null);
            } else {
                System.out.println("Tài khoản được kích hoạt với tên người dùng: " + user.get().getAccount() + " fail. Invalid OTP");
                return new ResponseObject("400", "OTP sai, vui lòng kiểm tra email", null);
            }
        } catch (Exception e) {
            System.out.println("Tài khoản kích hoạt không thành công. Không tìm thấy người dùng");
            return new ResponseObject("400", "Tai khoản này không tôn tại!", null);
        }
    }

    @Override
    public ResponseObject forgotPassword(String account) {
        return null;
    }

    @Override
    public ResponseObject confirmOTP(String userEmail, String enteredOTP) {
        // Lấy thông tin người dùng từ email
        Optional<AccountEntity> user = accountService.findByAccount(userEmail);

        if (user.isPresent()) {
            AccountEntity userEntity = user.get();
            String storedOTP = userEntity.getConfirmationCode();

            if (enteredOTP.equals(storedOTP)) {
                // Mã OTP khớp, cập nhật trạng thái xác nhận trong cơ sở dữ liệu
                userEntity.setActive(true);
                accountService.createAccount(userEntity); // Lưu thông tin cập nhật vào cơ sở dữ liệu

                return new ResponseObject("200", "Đã xác minh OTP và kích hoạt tài khoản.", null);
            } else {
                return new ResponseObject("400", "OTP không hợp lệ.", null);
            }
        } else {
            return new ResponseObject("404", "Không tìm thấy người dùng.", null);
        }
    }
}
