/*
 * (C) Copyright 2019-2020 Scanbuy Retail
 */
package com.scanbuy.demo.thirdparty;

import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Hex;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

@Controller
public class DemoController {

	public static final String API_KEY = "oqkjskfpxip5fd23tqrh";
	public static final String API_SECRET = "insert_secret_here";

	@RequestMapping("/")
	public String viewHome(Model model)
			throws NoSuchAlgorithmException, UnsupportedEncodingException, InvalidKeyException {

		// access the dCoupon Third Party API
		RestTemplate restTemplate = new RestTemplate();
		LoginRequestBody requestBody = new LoginRequestBody();

		requestBody.setAlias("gapadaxide");
		requestBody.setEmail("glaxo1@mail.com");
		requestBody.setExternalId("glaxo1234");

		String resourceUrl = "https://testapi.dcoupon.com/thirdparty/login/v1";

		final Charset asciiCs = Charset.forName("US-ASCII");
		Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
		// SecretKeySpec secret_key = new
		// javax.crypto.spec.SecretKeySpec(asciiCs.encode(API_SECRET).array(),
		// "HmacSHA256");
		SecretKeySpec secret_key = new SecretKeySpec(API_SECRET.getBytes("UTF-8"), "HmacSHA256");
		sha256_HMAC.init(secret_key);
		String timestamp = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ").format(new Date());
		;
		String data = API_KEY + ":" + timestamp;
		String signature = " " + Hex.encodeHexString(sha256_HMAC.doFinal(data.getBytes("UTF-8")));

		HttpHeaders headers = new HttpHeaders();
		headers.add("dcoupon-authorization-apitoken", API_KEY);
		headers.add("dcoupon-authorization-method", "SIGNATURE");
		headers.add("dcoupon-authorization-signature", signature);
		headers.add("dcoupon-authorization-timestamp", timestamp);

		System.out.println("signature = " + signature);
		System.out.println("timestamp = " + timestamp);

		HttpEntity<LoginRequestBody> request = new HttpEntity<LoginRequestBody>(requestBody, headers);

		ResponseEntity<String> result = restTemplate.postForEntity(resourceUrl, request, String.class);

		String enrollmentFormUrl = "";

		if (result.getStatusCode() == HttpStatus.MOVED_PERMANENTLY) {
			enrollmentFormUrl = result.getHeaders().getLocation().toString();
			System.out.println("Please redirect to " + enrollmentFormUrl);
		} else {
			System.out.println(result);
		}

		String originDomain = "http://localhost:8080";
		enrollmentFormUrl = enrollmentFormUrl + "?originDomain=" + originDomain;

		model.addAttribute("enrollmentFormUrl", enrollmentFormUrl);

		return "index";
	}
}
