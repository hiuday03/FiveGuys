package com.example.demo.security.RestControllerAccount;

import com.example.demo.entity.*;
import com.example.demo.model.request.TokenResponse;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.offlineSales.OfEmployeeRepository;
import com.example.demo.security.Request.OTPConfirmationDTO;
import com.example.demo.security.Request.OTPresetPassDTO;
import com.example.demo.security.Request.UserRequestDTO;
import com.example.demo.security.jwt.JwtTokenUtil;
import com.example.demo.security.jwt_model.JwtRequest;
import com.example.demo.security.service.impl.UserService;
import com.example.demo.senderMail.Respone.ResponseObject;
import com.example.demo.service.RefreshTokenService;
import com.example.demo.service.onlineSales.OlAccountService;
import com.example.demo.service.onlineSales.OlCustomerService;
import com.example.demo.service.onlineSales.OlEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class JwtAuthenticationController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private OlAccountService olAccountService;

    @Autowired
    private OfEmployeeRepository ofEmployeeRepository;

    @Autowired
    private OlEmployeeService olEmployeeService;

    @Autowired
    private OlCustomerService olCustomerService;

    @Autowired
    private UserService userService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;





//    private final JwtTokenUtil jwtTokenUtil;

//    private final JwtUserDetailsService userDetailsService;


//    public JwtAuthenticationController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, JwtUserDetailsService userDetailsService) {
//        this.authenticationManager = authenticationManager;
//        this.jwtTokenUtil = jwtTokenUtil;
//        this.userDetailsService = userDetailsService;
//    }

    //Method to get auth_token for every further requests.
    @PostMapping(value = "/auth/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        TokenResponse tokenResponse =  userService.login(authenticationRequest);
        return ResponseEntity.ok(tokenResponse);
    }


    @PostMapping("/RFToken/{refreshToken}")
    public ResponseEntity<TokenResponse> refreshToken(@PathVariable("refreshToken") String refreshToken) {
        if (refreshToken != null) {
            System.out.println("Refresh token success");
            AccountEntity accountEntity = refreshTokenService.verifyExpiration(refreshToken);
            if (accountEntity != null) {
//                String newAccessToken = jwtTokenUtil.refreshToken(existingRefreshToken.getAccountEntity());
                TokenResponse tokenResponse = new TokenResponse();
                tokenResponse.setAccessToken(jwtTokenUtil.refreshToken(accountEntity));
                tokenResponse.setRefreshToken(refreshToken);
                System.out.println(tokenResponse);
                return ResponseEntity.ok(tokenResponse);
            } else {
                throw new RuntimeException("Invalid refresh token");
            }
        } else {
            return ResponseEntity.badRequest().build();
        }
    }


    @PostMapping("/auth/register")
    public ResponseObject register(@RequestBody UserRequestDTO user) {
        return userService.register(user);
    }
//    @PostMapping("/active")
//    public ResponseObject active(@RequestBody UserRequestDTO user) {
//        return userService.active(user);
//    }

    @PostMapping("/auth/reSendOTP/{email}")
    public ResponseObject reSendOTP(@PathVariable String email) {
        System.out.println(email);

        return userService.reSendOTP(email);
    }

    @PostMapping("/auth/confirm-otp")
    public boolean confirmOTP(@RequestBody OTPConfirmationDTO otpConfirmationDTO) {
        String email = otpConfirmationDTO.getEmail();
        String enteredOTP = otpConfirmationDTO.getEnteredOTP();
        return userService.confirmOTP(email, enteredOTP);
    }


    @PostMapping("/auth/reset-password")
        public boolean resetPassword(@RequestBody OTPresetPassDTO otPresetPassDTO) {
        String email = otPresetPassDTO.getEmail();
        String pass = otPresetPassDTO.getNewPassword();
        System.out.println(otPresetPassDTO);
        return userService.resetPassword(email, pass);
    }


    @PostMapping("/auth/forgot-password/{email}")
    public ResponseObject forgotPassword(@PathVariable String email) {
        return userService.forgotPassword(email);
    }

    @PostMapping("/check-email")
    public ResponseEntity<Object> checkEmailExists(@RequestBody CheckRequest checkRequest) {
        boolean exists = accountRepository.existsByEmail(checkRequest.getEmail());
        return ResponseEntity.ok(exists);
    }


    @PostMapping("/check-account")
    public ResponseEntity<Object> checkAccountExists(@RequestBody CheckRequest checkRequest) {
        boolean exists = accountRepository.existsByAccount(checkRequest.getAccount());
        return ResponseEntity.ok(exists);
    }

    @PostMapping("/check-phone-number")
    public ResponseEntity<Object> checkPhoneNumberExists(@RequestBody CheckRequest checkRequest) {
        boolean exists = accountRepository.existsByPhoneNumber(checkRequest.getPhoneNumber());
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/api/ol/user")
    public ResponseEntity<?> getUserOl(@RequestParam(name = "username") String currentUsername) {

        Optional<AccountEntity> account = olAccountService.findByAccount(currentUsername);

        if (account.isPresent()) {
            Optional<CustomerEntity> customerEntity = Optional.ofNullable(olCustomerService.findByAccount_Id(account.get().getId()));
            Optional<Employees> employeeEntity = Optional.ofNullable(olEmployeeService.findByAccount_Id(account.get().getId()));

            if (customerEntity.isPresent()) {
                return ResponseEntity.ok(customerEntity);
            } else if (employeeEntity.isPresent()) {

                return ResponseEntity.ok(employeeEntity);
            }
        }
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("loggedIn", false);
        return ResponseEntity.ok(responseData);
    }


}
