package com.example.demo.security.RestControllerAccount;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.Employees;
import com.example.demo.repository.offlineSales.OfEmployeeRepository;
import com.example.demo.security.Request.OTPConfirmationDTO;
import com.example.demo.security.Request.OTPresetPassDTO;
import com.example.demo.security.Request.UserRequestDTO;
import com.example.demo.security.jwt.JwtTokenUtil;
import com.example.demo.security.jwt.JwtUserDetailsService;
import com.example.demo.security.jwt_model.JwtRequest;
import com.example.demo.security.jwt_model.JwtResponse;
import com.example.demo.security.service.impl.UserService;
import com.example.demo.senderMail.Respone.ResponseObject;
import com.example.demo.service.onlineSales.OlAccountService;
import com.example.demo.service.onlineSales.OlCustomerService;
import com.example.demo.service.onlineSales.OlEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class JwtAuthenticationController {

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

    private final AuthenticationManager authenticationManager;

    private final JwtTokenUtil jwtTokenUtil;

    private final JwtUserDetailsService userDetailsService;

    public JwtAuthenticationController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, JwtUserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
    }

    //Method to get auth_token for every further requests.
    @PostMapping(value = "/auth/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
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
        System.out.println(otPresetPassDTO);
        String email = otPresetPassDTO.getEmail();
        String pass = otPresetPassDTO.getNewPassword();
        return userService.resetPassword(email, pass);
    }


    @PostMapping("/auth/forgot-password/{email}")
    public ResponseObject forgotPassword(@PathVariable String email) {
        return userService.forgotPassword(email);
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
                // Trả về một đối tượng JSON với thuộc tính 'employeeLoggedIn' có giá trị true
                Map<String, Object> responseData = new HashMap<>();
                responseData.put("employeeLoggedIn", true);
                return ResponseEntity.ok(responseData);
            }
        }
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("loggedIn", false);
        return ResponseEntity.ok(responseData);
    }


}
