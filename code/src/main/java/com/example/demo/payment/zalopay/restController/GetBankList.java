//package com.example.demo.payment.zalopay.restController;
//
//// Java version "1.8.0_201"
//import com.example.demo.payment.zalopay.crypto.HMACUtil;
//import org.apache.http.NameValuePair; // https://mvnrepository.com/artifact/org.apache.httpcomponents/httpclient
//import org.apache.http.client.methods.CloseableHttpResponse;
//import org.apache.http.client.methods.HttpGet;
//import org.apache.http.client.utils.URIBuilder;
//import org.apache.http.impl.client.CloseableHttpClient;
//import org.apache.http.impl.client.HttpClients;
//import org.apache.http.message.BasicNameValuePair;
//import org.json.JSONObject; // https://mvnrepository.com/artifact/org.json/json
//import org.json.JSONArray;
//
//import java.io.BufferedReader;
//import java.io.InputStreamReader;
//import java.util.*;
//
//public class GetBankList {
//
//    private static Map<String, String> config = new HashMap<String, String>(){{
//        put("appid", "554");
//        put("key1", "8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn");
//        put("key2", "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny");
//        put("endpoint", "https://sbgateway.zalopay.vn/api/getlistmerchantbanks");
//    }};
//
//    public static void main(String[] args) throws Exception {
//        String appid = config.get("appid");
//        String reqtime = Long.toString(System.currentTimeMillis());
//        String data = appid +"|"+ reqtime;
//        String mac = HMACUtil.HMacHexStringEncode(HMACUtil.HMACSHA256, config.get("key1"), data);
//
//        List<NameValuePair> params = new ArrayList<>();
//        params.add(new BasicNameValuePair("appid", appid));
//        params.add(new BasicNameValuePair("reqtime", reqtime)); // miliseconds
//        params.add(new BasicNameValuePair("mac", mac));
//
//        URIBuilder uri = new URIBuilder(config.get("endpoint"));
//        uri.addParameters(params);
//
//        CloseableHttpClient client = HttpClients.createDefault();
//        HttpGet get = new HttpGet(uri.build());
//
//        CloseableHttpResponse res = client.execute(get);
//        BufferedReader rd = new BufferedReader(new InputStreamReader(res.getEntity().getContent()));
//        StringBuilder resultJsonStr = new StringBuilder();
//        String line;
//
//        while ((line = rd.readLine()) != null) {
//            resultJsonStr.append(line);
//        }
//
//        JSONObject result = new JSONObject(resultJsonStr.toString());
//        JSONObject banksObject = result.getJSONObject("banks");
//
//        System.out.format("returncode = %s", result.getInt("returncode"));
//        System.out.format("returnmessage = %s", result.getString("returnmessage"));
//
//        for(String pmcid : banksObject.keySet()) {
//            JSONArray banks = banksObject.getJSONArray(pmcid);
//            banks.forEach(bank -> {
//                System.out.format("%s. %s\n", pmcid, bank.toString());
//            });
//        }
//    }
//}