/*
 * (C) Copyright 2019-2020 Scanbuy Retail
 */
package com.scanbuy.demo.thirdparty;

import lombok.Data;

@Data
public class LoginRequestBody {
	private String email;
	private String externalId;
	private String alias;
	private String birthdate;
	private String gender;
	private String clientCountry;
}
