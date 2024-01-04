package com.example.demo.payment.paypal;


import java.math.BigDecimal;
 import java.math.RoundingMode;
 import java.util.ArrayList;
import java.util.List;

import com.paypal.base.rest.APIContext;
import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.stereotype.Service;
 import com.paypal.api.payments.Amount;
 import com.paypal.api.payments.Payer;
 import com.paypal.api.payments.Payment;
 import com.paypal.api.payments.PaymentExecution;
 import com.paypal.api.payments.RedirectUrls;
 import com.paypal.api.payments.Transaction;
 import com.paypal.base.rest.PayPalRESTException;

@Service
public class PaypalService {

	@Autowired
	private APIContext apiContext;


	public Payment createPayment(
			Double total,
			String currency,
			String method,
			String intent,
			String description,
			String cancelUrl,
			 String orderId,
			String successUrl) throws PayPalRESTException{
		Amount amount = new Amount();
		amount.setCurrency(currency);
		total = new BigDecimal(total).setScale(2, RoundingMode.HALF_UP).doubleValue();
		amount.setTotal(String.format("%.2f", total));

		Transaction transaction = new Transaction();
		transaction.setDescription(description);
		transaction.setAmount(amount);
		transaction.setInvoiceNumber(orderId);
		List<Transaction> transactions = new ArrayList<>();
		transactions.add(transaction);

		Payer payer = new Payer();
		payer.setPaymentMethod(method.toString());

		Payment payment = new Payment();
		payment.setIntent(intent.toString());
		payment.setPayer(payer);
		payment.setTransactions(transactions);
		RedirectUrls redirectUrls = new RedirectUrls();
		redirectUrls.setCancelUrl(cancelUrl);
		redirectUrls.setReturnUrl(successUrl);
		payment.setRedirectUrls(redirectUrls);
		System.out.println(payment);
		return payment.create(apiContext);
	}

	public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException{
		Payment payment = new Payment();
		payment.setId(paymentId);
		PaymentExecution paymentExecute = new PaymentExecution();
		paymentExecute.setPayerId(payerId);
		return payment.execute(apiContext, paymentExecute);
	}


	public Payment getTransactionDetails(String orderId) throws PayPalRESTException {
		// Sử dụng APIContext để lấy thông tin giao dịch dựa trên orderId
		System.out.println(apiContext);
		return Payment.get(apiContext, orderId);
	}

}