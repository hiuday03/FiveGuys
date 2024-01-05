package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OLColorRepository extends JpaRepository<Color, Long> {

    @Query("SELECT c FROM Color c WHERE c.status = 1")
    List<Color> findAllByStatusEqualsOne();

}
