package com.example.demo.service.serviceiplm;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.RefreshToken;
import com.example.demo.repository.RefreshTokenRepository;
import com.example.demo.security.jwt.JwtTokenUtil;
import com.example.demo.service.AccountService;
import com.example.demo.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.chrono.ChronoLocalDate;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;


@Service
public class RefreshTokenImpl implements RefreshTokenService {



    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

//    @Autowired
//    private AccountService accountService;

    @Override
    public RefreshToken save(RefreshToken refreshToken) {
        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    public void delete(Long id) {
        refreshTokenRepository.deleteById(id);
    }


    public static final long JWT_TOKENRFRESH_VALIDITY = 24 * 60 * 60;



    /**
     * Find a refresh token based on the natural id i.e the token itself
     */
    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }


    /**
     * Creates and returns a new refresh token
     */
    @Override
    public RefreshToken createRefreshToken(UserDetails userDetails, AccountEntity accountEntity) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setExpiryDate(new Date(System.currentTimeMillis() + JWT_TOKENRFRESH_VALIDITY * 1000));
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setAccountEntity(accountEntity);
        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    public AccountEntity verifyExpiration(String token) {
        Optional<RefreshToken> refreshTokenOptional = refreshTokenRepository.findByToken(token);
        if (refreshTokenOptional.isPresent()) {
            RefreshToken refreshToken = refreshTokenOptional.get();

            Date expiryDate = refreshToken.getExpiryDate();
            if (expiryDate != null && expiryDate.before(new Date())) {
                refreshTokenRepository.delete(refreshToken);
                return null; // Token đã hết hạn
            }
            return refreshToken.getAccountEntity();
        }
        return null;
    }


    @Override
    public void deleteByAccount(AccountEntity accountEntity) {
        refreshTokenRepository.deleteByAccountEntity(accountEntity);
    }
//
//    public String generateToken(UserDetails userDetails) {
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("role", userDetails.getAuthorities());
//        return doGenerateToken(claims, userDetails.getUsername());
//    }
//
//    private String doGenerateToken(Map<String, Object> claims, String subject) {
//        return Jwts.builder()
//                .setClaims(claims)
//                .setSubject(subject)
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
//                .signWith(SignatureAlgorithm.HS512, secret)
//                .compact();
//    }

    /**
     * Verify whether the token provided has expired or not on the basis of the current
     * server time and/or throw error otherwise
     */
//    public void verifyExpiration(RefreshToken token) {
//        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
//            throw new TokenRefreshException(token.getToken(), "Expired token. Please issue a new request");
//        }
//    }

    /**
     * Delete the refresh token associated with the user device
     */
//    public void deleteById(Long id) {
//        refreshTokenRepository.deleteById(id);
//    }

    /**
     * Increase the count of the token usage in the database. Useful for
     * audit purposes
     */
//    public void increaseCount(RefreshToken refreshToken) {
//        refreshToken.incrementRefreshCount();
//        save(refreshToken);
//    }





}
