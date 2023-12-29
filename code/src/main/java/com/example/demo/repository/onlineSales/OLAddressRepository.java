package com.example.demo.repository.onlineSales;

import com.example.demo.entity.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OLAddressRepository extends JpaRepository<AddressEntity, Long> {

    List<AddressEntity> findAllByCustomer_IdAndStatus(Long Id,int status);
}
