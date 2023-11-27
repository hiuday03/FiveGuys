package com.example.demo.restcontroller.offlineSales;

import com.example.demo.entity.Cards;
import com.example.demo.service.offlineSales.Impl.OfCardServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/card")
public class CardsController {
    @Autowired
    private OfCardServiceImpl cardService;

    @GetMapping()
    public ResponseEntity<List<Cards>> getAllAddress() {
        List<Cards> listCard = cardService.getAll();
        return ResponseEntity.ok(listCard);
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody Cards card) {
        return ResponseEntity.ok(cardService.save(card));
    }
}
