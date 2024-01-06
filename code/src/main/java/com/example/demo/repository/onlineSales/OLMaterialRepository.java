package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Material;
import com.example.demo.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OLMaterialRepository extends JpaRepository<Material, Long> {


    @Query("SELECT c FROM Material c WHERE c.status = 1")
    List<Material> findAllByStatusEqualsOne();
}
