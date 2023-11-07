package com.example.demo.security;

import com.example.demo.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.PortResolverImpl;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class AuthConfig {

    @Autowired
    private UserDetailsService userDetailsService;
//Này sử dụng mã hóa Pass
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }

//    Đang test bỏ mã hóa vì chưa làm đăng ký
    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public UserDetailsService userDetailsService(AccountRepository accountRepository) {
//        System.out.println("Ok1");
        return new CustomUserDetailsService(accountRepository);
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/templates/**","/assets/**").permitAll()
                                .requestMatchers("/admin/**").hasAnyAuthority("ADMIN", "STAFF")
//                                .requestMatchers("/**").hasAnyAuthority("ADMIN", "STAFF","CUSTOMER")
                                .requestMatchers("/home/authenticated").authenticated()
                                .anyRequest().permitAll()

                )
                .formLogin(login -> login
                        .loginPage("/auth/login/form")
                        .loginProcessingUrl("/auth/login")
                        .defaultSuccessUrl("/auth/login/success",false)
                        .failureUrl("/auth/login/error")
                        .usernameParameter("username")
                        .passwordParameter("password")

                )

//                .rememberMe(rm -> rm
//                        .rememberMeParameter("remember")
//                )
                .logout(lg -> lg
                        .logoutUrl("/auth/logoff")
                        .logoutSuccessUrl("/auth/logoff/success")
                )
                .csrf().disable()
                .cors().disable()
        ;
        return httpSecurity.build();
    }
}
