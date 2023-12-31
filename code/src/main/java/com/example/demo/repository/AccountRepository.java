package com.example.demo.repository;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AccountRepository extends JpaRepository<AccountEntity, Long> {
    @Query(value = "SELECT A.Id, A.Account, A.Password, A.Email, A.PhoneNumber, A.IdRole, A.Status\n" +
            "FROM Accounts A\n" +
            "LEFT JOIN Customers C ON A.Id = C.IdAccount\n" +
            "LEFT JOIN Employees E ON A.Id = E.IdAccount\n" +
            "WHERE C.Id IS NULL AND E.Id IS NULL", nativeQuery = true)
List<AccountEntity> loadAccount();
}
