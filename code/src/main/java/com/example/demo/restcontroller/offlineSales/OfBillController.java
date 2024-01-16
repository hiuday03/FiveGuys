package com.example.demo.restcontroller.offlineSales;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.entity.ProductDetail;
import com.example.demo.service.ProductDetailService;
import com.example.demo.service.offlineSales.OfBillService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lib.payos.PayOS;
import com.lib.payos.type.ItemData;
import com.lib.payos.type.PaymentData;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/payos")
public class OfBillController {
    @Autowired
    private ProductDetailService proService;

    @Autowired
    private OfBillService billService;

    private final PayOS payOS;

    public OfBillController(PayOS payOS) {
        super();
        this.payOS = payOS;
    }

    @PostMapping("/create")
    public ObjectNode create(@RequestBody JsonNode orderData) {
        ObjectMapper mapper = new ObjectMapper();
        Bill bill = mapper.convertValue(orderData, Bill.class);
        BigDecimal money = bill.getTotalAmountAfterDiscount().compareTo(BigDecimal.ZERO) == 0 ? new BigDecimal(String.valueOf(bill.getTotalAmount())) : new BigDecimal(String.valueOf(bill.getTotalAmountAfterDiscount()));
        money.add(new BigDecimal(String.valueOf(bill.getShippingFee())));
        String namePayment = bill.getPaymentMethod().getName();
        if (namePayment.equals("Chuyển khoản")) {
            try {
                final String description = "Thanh toán đơn hàng";
                final String returnUrl = "http://127.0.0.1:5555/Html-DATN2/ofView/Thuong/sell-quicklly.html";
                final String cancelUrl = "http://127.0.0.1:5555/Html-DATN2/ofView/Thuong/sell-quicklly.html";

                List<ItemData> itemList = new ArrayList<>();
                JsonNode billDetailNode = orderData.get("billDetail");

                if (billDetailNode != null && billDetailNode.isArray()) {
                    TypeReference<List<BillDetail>> type = new TypeReference<>() {
                    };
                    List<BillDetail> billDetails = mapper.convertValue(billDetailNode, type);

                    for (BillDetail billDetail : billDetails) {
                        ProductDetail productDetail = proService.getById(billDetail.getProductDetail().getId());;
                        String productName = productDetail.getProduct().getName() + " " + productDetail.getProduct().getMaterial().getName() + " " + productDetail.getSize().getName();
                        int quantity = billDetail.getQuantity(); // Thay bằng phương thức lấy số lượng từ BillDetail
                        int price = Integer.valueOf(String.valueOf(billDetail.getPrice())); // Thay bằng phương thức lấy giá từ BillDetail

                        ItemData item = new ItemData(productName, quantity, price);
                        itemList.add(item);
                    }
                }
                String currentTimeString = String.valueOf(new Date().getTime());
                int orderCode = Integer.parseInt(currentTimeString.substring(currentTimeString.length() - 6));
                PaymentData paymentData = new PaymentData(orderCode, Integer.valueOf(String.valueOf(money)), description, itemList, cancelUrl, returnUrl);
                JsonNode data = payOS.createPaymentLink(paymentData);
                if (data.isObject()) {
                    ObjectNode objectNode = (ObjectNode) data;
                    String checkoutUrl = data.get("checkoutUrl").asText();
                    String newURL = checkoutUrl.replace("https://pay.payos.vn", "https://next.pay.payos.vn");
                    objectNode.put("checkoutUrl", newURL);
                }
                ObjectNode respon = mapper.createObjectNode();
                respon.put("error", 0);
                respon.put("message", "success");
                respon.set("data", data);
                respon.set("bill", orderData);
                return respon;
            } catch (Exception e) {
                e.printStackTrace();
                ObjectNode respon = mapper.createObjectNode();
                respon.put("error", -1);
                respon.put("message", "fail");
                respon.set("data", null);
                respon.set("bill", null);
                return respon;
            }
        }
        Bill bill2 = billService.create(orderData);
        ObjectNode respon = mapper.createObjectNode();
        respon.put("error", 0);
        respon.put("message", "success");
        respon.set("bill", mapper.valueToTree(bill2));
        return respon;
    }

    private String formatterDateTimeFromArray(JsonNode dateTimeArray) {
        int year = dateTimeArray.get(0).asInt();
        int month = dateTimeArray.get(1).asInt();
        int day = dateTimeArray.get(2).asInt();
        int hour = dateTimeArray.get(3).asInt();
        int minute = dateTimeArray.get(4).asInt();
        int second = dateTimeArray.get(5).asInt();

        return String.format("%04d-%02d-%02d %02d:%02d:%02d", year, month, day, hour, minute, second);
    }

    @GetMapping(path = "/{orderId}")
    public ObjectNode getOrderById(@PathVariable("orderId") int orderId) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode respon = objectMapper.createObjectNode();

        try {
            JsonNode order = payOS.getPaymentLinkInfomation(orderId);

            respon.set("data", order);
            respon.put("error", 0);
            respon.put("message", "ok");
            return respon;
        } catch (Exception e) {
            e.printStackTrace();
            respon.put("error", -1);
            respon.put("message", e.getMessage());
            respon.set("data", null);
            return respon;
        }

    }
    @PutMapping(path = "/{orderId}")
    public ObjectNode cancelOrder(@PathVariable("orderId") int orderId) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode respon = objectMapper.createObjectNode();
        try {
            JsonNode order = payOS.cancelPaymentLink(orderId, null);
            respon.set("data", order);
            respon.put("error", 0);
            respon.put("message", "ok");
            return respon;
        } catch (Exception e) {
            e.printStackTrace();
            respon.put("error", -1);
            respon.put("message", e.getMessage());
            respon.set("data", null);
            return respon;
        }
    }
    @PostMapping(path = "/confirm-webhook")
    public ObjectNode confirmWebhook(@RequestBody Map<String, String> requestBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode respon = objectMapper.createObjectNode();
        try {
            String str = payOS.confirmWebhook(requestBody.get("webhookUrl"));
            respon.set("data", null);
            respon.put("error", 0);
            respon.put("message", "ok");
            return respon;
        } catch (Exception e) {
            e.printStackTrace();
            respon.put("error", -1);
            respon.put("message", e.getMessage());
            respon.set("data", null);
            return respon;
        }
    }
}
