package com.example.demo.payment.zalopay;

// Java version "1.8.0_201"
import com.example.demo.payment.zalopay.crypto.HMACUtil;
import org.apache.http.NameValuePair; // https://mvnrepository.com/artifact/org.apache.httpcomponents/httpclient
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONObject; // https://mvnrepository.com/artifact/org.json/json

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.logging.Logger;

public class Refund {
//    private static Logger logger = Logger.getLogger(App.class.getName());

    private static Map<String, String> config = new HashMap<String, String>(){{
        put("appid", "554");
        put("key1", "8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn");
        put("key2", "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny");
        put("endpoint", "https://sandbox.zalopay.com.vn/v001/tpe/partialrefund");
    }};

    private static String getCurrentTimeString(String format) {
        Calendar cal = new GregorianCalendar(TimeZone.getTimeZone("GMT+7"));
        SimpleDateFormat fmt = new SimpleDateFormat(format);
        fmt.setCalendar(cal);
        return fmt.format(cal.getTimeInMillis());
    }

    public static void main( String[] args ) throws Exception
    {
        String appid = config.get("appid");
        Random rand = new Random();
        long timestamp = System.currentTimeMillis(); // miliseconds
        String uid = timestamp + "" + (111 + rand.nextInt(888)); // unique id

        Map<String, Object> order = new HashMap<String, Object>(){{
            put("appid", appid);
            put("zptransid", 123456789);
            put("mrefundid", getCurrentTimeString("yyMMdd") +"_"+ appid +"_"+uid);
            put("timestamp", timestamp);
            put("amount", 50000);
            put("description", "ZaloPay Intergration Demo");
        }};

        // appid|zptransid|amount|description|timestamp
        String data = order.get("appid") +"|"+ order.get("zptransid") +"|"+ order.get("amount")
                +"|"+ order.get("description") +"|"+ order.get("timestamp");
        order.put("mac",
                HMACUtil.HMacHexStringEncode(
                        HMACUtil.HMACSHA256, config.get("key1"), data));

        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost post = new HttpPost(config.get("endpoint"));

        List<NameValuePair> params = new ArrayList<>();
        for (Map.Entry<String, Object> e : order.entrySet()) {
            params.add(new BasicNameValuePair(e.getKey(), e.getValue().toString()));
        }

        post.setEntity(new UrlEncodedFormEntity(params));

        CloseableHttpResponse res = client.execute(post);
        BufferedReader rd = new BufferedReader(new InputStreamReader(res.getEntity().getContent()));
        StringBuilder resultJsonStr = new StringBuilder();
        String line;

        while ((line = rd.readLine()) != null) {
            resultJsonStr.append(line);
        }

        JSONObject result = new JSONObject(resultJsonStr.toString());
        for (String key : result.keySet()) {
            System.out.format("%s = %s\n", key, result.get(key));
        }
    }
}