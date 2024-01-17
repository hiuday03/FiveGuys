package com.example.demo.repository;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.AddressEntity;
import com.example.demo.entity.Vouchers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<AccountEntity, Long> {
    @Query(value = "SELECT A.Id, A.Account, A.Password, A.Email, A.PhoneNumber, A.ConfirmationCode, A.IdRole, A.Status\n" +
            "FROM Accounts A\n" +
            "LEFT JOIN Customers C ON A.Id = C.IdAccount\n" +
            "LEFT JOIN Employees E ON A.Id = E.IdAccount\n" +
            "WHERE C.Id IS NULL AND E.Id IS NULL", nativeQuery = true)
    List<AccountEntity> loadAccount();

    @Query("SELECT a FROM AccountEntity a WHERE a.status = :a")
    List<AccountEntity> getSStatus(Integer a);

    Optional<AccountEntity> findByAccount(String account);

    List<AccountEntity> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByAccount(String account);

    boolean existsByPhoneNumber(String phoneNumber);
}
