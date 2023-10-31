package com.example.demo.service.serviceiplm;

import com.example.demo.entity.AccountEntity;
import com.example.demo.repository.AccountRepository;
import com.example.demo.service.AccountService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public List<AccountEntity> getAllAccount() {
        return accountRepository.findAll();
    }

    @Override
    public AccountEntity getAccountById(Long id) {
        return accountRepository.findById(id).orElse(null);
    }

    @Override
    public Page<AccountEntity> getAllAccountPage(Integer page) {
        Pageable pageable = PageRequest.of(page, 1);
        return accountRepository.findAll(pageable);
    }

    @Override
    public AccountEntity createAccount(AccountEntity accountEntity) {
        return accountRepository.save(accountEntity);
    }

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
}
