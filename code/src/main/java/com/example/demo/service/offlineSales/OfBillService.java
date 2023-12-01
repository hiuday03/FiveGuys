package com.example.demo.service.offlineSales;

import com.example.demo.entity.Bill;
import com.fasterxml.jackson.databind.JsonNode;

public interface OfBillService {
    Bill create(JsonNode data);
}
