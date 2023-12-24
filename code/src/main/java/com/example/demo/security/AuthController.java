package com.example.demo.security;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.Employees;
import com.example.demo.repository.offlineSales.OfEmployeeRepository;
import com.example.demo.repository.onlineSales.OlCustomerRepository;
import com.example.demo.repository.onlineSales.OlEmployeeRepository;
import com.example.demo.service.onlineSales.OlAccountService;
import com.example.demo.service.onlineSales.OlCustomerService;
import com.example.demo.service.onlineSales.OlEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
@CrossOrigin("*")
@Controller
public class AuthController {

    @Autowired
    private UserAuthentication userAuthentication;

//    @Autowired
//    private AccountRepository accountRepository;

    @Autowired
    private OlAccountService olAccountService;

    @Autowired
    private OfEmployeeRepository ofEmployeeRepository;

    @Autowired
    private OlEmployeeService olEmployeeService;

    @Autowired
    private OlCustomerService olCustomerService;


    @ResponseBody
    @GetMapping("/api/user")
    public ResponseEntity<?> getEmployess() {

        if (userAuthentication.getAuthentication() != null && userAuthentication.getAuthentication().isAuthenticated() && !"anonymousUser".equals(userAuthentication.getAuthentication().getPrincipal())) {
            String currentUsername = userAuthentication.getAuthentication().getName();
            Optional<AccountEntity> account = olAccountService.findByAccount(currentUsername);

            if (account.isPresent()) {
                Optional<Employees> employees = Optional.ofNullable(ofEmployeeRepository.findByAccount_Id(account.get().getId()));
                return ResponseEntity.ok(employees);
            }
        }

        return ResponseEntity.status(400).body(null);
    }

    @ResponseBody
    @GetMapping("/api/ol/user")
    public ResponseEntity<?> getUserOl() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null) {
            System.out.println("Principal: " + authentication.getPrincipal());
            System.out.println("Is Authenticated: " + authentication.isAuthenticated());
            System.out.println("Roles: " + authentication.getAuthorities());
        }
        if (userAuthentication.getAuthentication() != null && userAuthentication.getAuthentication().isAuthenticated() && !"anonymousUser".equals(userAuthentication.getAuthentication().getPrincipal())) {
            String currentUsername = userAuthentication.getAuthentication().getName();
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
        }
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("loggedIn", false);
        return ResponseEntity.ok(responseData);
    }



//    @ResponseBody
//    @GetMapping("/api/ol/user/authenticated")
//    public boolean isAuthenticated() {
//
//        return authentication != null && authentication.isAuthenticated() && !"anonymousUser".equals(authentication.getPrincipal());
//
//    }

    @GetMapping("/auth/login/form")
    public String form(Model model){

        return "login/index";

    }

    @GetMapping("/auth/login/success")
    public String success(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        userAuthentication.setAuthentication(authentication);
        System.out.println(authentication.getName());
        model.addAttribute("message", "Đăng nhập thành công");
        model.addAttribute("name", authentication.getName());
        return "forward:/auth/login/form";
    }


    @GetMapping("/auth/login/error")
    public String error(Model model){
        model.addAttribute("message","Sai thong tin dang nhap");
        return "forward:/auth/login/form";
    }

    @GetMapping("/auth/logoff/success")
    public String logoff(Model model){
        Authentication  authentication = SecurityContextHolder.getContext().getAuthentication();
        userAuthentication.setAuthentication(authentication);
        model.addAttribute("message","Dang xuat thanh cong bấm login mới có thể đăng nhập tiếp");
        return "forward:/auth/login/form";
    }

    @GetMapping("/auth/access/denied")
    public String denied(Model model){
        model.addAttribute("message","Ban ko co quyen truy xuat");
        return "login/index";
    }

}