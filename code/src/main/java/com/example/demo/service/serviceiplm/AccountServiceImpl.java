package com.example.demo.service.serviceiplm;

import com.example.demo.entity.AccountEntity;
import com.example.demo.repository.AccountRepository;
import com.example.demo.security.Request.UserRequestDTO;
import com.example.demo.security.service.AccountEmailSender;
import com.example.demo.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service

public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountEmailSender accountEmailSender;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public List<AccountEntity> getAllAccount() {
        return accountRepository.findAll();
    }

    @Override
    public List<AccountEntity> loadAccount() {
        return accountRepository.loadAccount();
    }

    @Override
    public AccountEntity getAccountById(Long id) {
        return accountRepository.findById(id).orElse(null);
    }

    @Override
    public Optional<AccountEntity> findByAccount(String account) {
        Optional<AccountEntity> accountEntity = accountRepository.findByAccount(account);
        if (accountEntity.isPresent()){
            return accountEntity;
        }
        return Optional.empty();
    }

    @Override
    public Page<AccountEntity> getAllAccountPage(Integer page) {
        Pageable pageable = PageRequest.of(page, 1);
        return accountRepository.findAll(pageable);
    }

    @Override
    public AccountEntity createAccount(AccountEntity accountEntity) {
        AccountEntity account = accountRepository.save(accountEntity);
        // Gửi email thông báo khi tạo mới tài khoản
//        accountEmailSender.sendAccountCreationEmail(
//                account.getEmail(),
//                account.getAccount(),
//                account.getId(),
//                account.getConfirmationCode()
//        );

        return account;
    }

    @Override
    public AccountEntity save(AccountEntity accountEntity) {
        return accountRepository.save(accountEntity);
    }
//    @Override
//    public AccountEntity createAccount(AccountEntity accountEntity) {
//        AccountEntity account = accountRepository.save(accountEntity);
//        MailSender email = new MailSender();
//        email.setToEmail(new String[]{account.getEmail()});
//        email.setSubject("Chào mừng đến với trang Web trvelViVu");
//        email.setTitleEmail("Chúc mừng " + account.getAccount());
//        String confirmationLink = "http://localhost:3000/owner/comfirmmail?id=" + account.getId();
//        String emailBody = "Bạn đã đăng ký thành công. Vui lòng xác nhận email bằng cách nhấp vào liên kết sau: " + confirmationLink;
//        email.setBody(emailBody);
//        mailSenderService.sendEmail(email.getToEmail(), email.getSubject(), email.getTitleEmail(), emailBody);
//        return account;
//    }


    @Override
    public AccountEntity updateAccount(AccountEntity accountEntity, Long id) {
        Optional<AccountEntity> existingAddress = accountRepository.findById(id);
        if (existingAddress.isPresent()) {
            AccountEntity account = existingAddress.get();
            account.setAccount(accountEntity.getAccount());
            account.setPassword(accountEntity.getPassword());
            account.setEmail(accountEntity.getEmail());
            account.setPhoneNumber(accountEntity.getPhoneNumber());
            account.setRole(accountEntity.getRole());
            account.setStatus(accountEntity.getStatus());

            return accountRepository.save(account); // Lưu khách hàng đã cập nhật vào cơ sở dữ liệu
        } else {
            // Trả về null hoặc thông báo lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy Accout với ID " + id);
//            return null;
        }
    }

    @Override
    public void deleteAccount(Long id) {
        // Kiểm tra xem khách hàng có tồn tại trước khi xóa
        if (accountRepository.existsById(id)) {
            accountRepository.deleteById(id);
        } else {
            // Xử lý lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy Địa chỉ với ID " + id);
        }
    }

    @Override
    public List<AccountEntity> getAll() {
        return accountRepository.findAll();
    }



    public  UserRequestDTO mapAccountToUserRequestDTO(AccountEntity account) {
        UserRequestDTO userRequestDTO = new UserRequestDTO();
        userRequestDTO.setAccount(account.getAccount());
        userRequestDTO.setEmail(account.getEmail());
        userRequestDTO.setId(account.getId());
        // Các trường thông tin khác
        return userRequestDTO;
    }

    @Override
    public Optional<AccountEntity> findByAccount2(String username) {
        Optional<AccountEntity> account = accountRepository.findByAccount(username);
        if (account.isPresent()){
            return account;
        }
        return Optional.empty();
    }

    @Override
    public List<UserRequestDTO> getAllAccount2() {
        List<AccountEntity> accounts = accountRepository.findAll();
        List<UserRequestDTO> userRequestDTOs = new ArrayList<>();
        for (AccountEntity account : accounts) {
            userRequestDTOs.add(mapAccountToUserRequestDTO(account));
        }
        return userRequestDTOs;
    }

    @Override
    public AccountEntity createAccount2(AccountEntity accountEntity) {
        return null;
    }

    @Override
    public Optional<AccountEntity> findByEmail(String email) {

        Optional<AccountEntity> account = accountRepository.findByEmail(email);
        if (account.isPresent()){
            return account;
        }


        return Optional.empty();
    }
}
