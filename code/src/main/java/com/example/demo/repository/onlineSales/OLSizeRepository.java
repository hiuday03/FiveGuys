package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OLSizeRepository extends JpaRepository<Size, Long> {


    @Query("SELECT c FROM Size c WHERE c.status = 1")
    List<Size> findAllByStatusEqualsOne();
}
