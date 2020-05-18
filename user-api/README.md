![Logo](https://s3.amazonaws.com/dcoupon.com/sdk/docs/dcouponLogo.png)

# dcoupon Users API

Version 1.0 (May 2020)

## Introduction

This API allow to consult user data, modify part of it and generate token to redeem coupons. It's posible to consult a summary and history of remdemptions for the user and the detail of each one aswell. It also have some utils methods to find countries and affiliates.

All requests must be signed with a secret, which is provided by dcoupon.

## Methods:
### redemptionToken

This method return a temporal generated token to redeem coupons for an user. It will be valid 90 seconds by default.

+ URL: [ENV]/users/{version}/redemptionToken
+ Type: GET
+ Header:
  + dcoupon-authorization-apikey: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  + dcoupon-user-jwt: User encrypted session data token
  
 + OK Response:
HttpStatus + body with:
```json
{
 "code":"_Internal Response Ok Code_",
 "description":"_Generated Token for user_"
}
```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:
```json
{
 "code":"_Internal Error Response Code_",
 "description":"_Error Response description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| SESSION_TOKEN_NOT_VALID | 406 | 142 |  "Session Token Not Valid" |
| USER_NOT_FOUND | 404 | 105 |  "User not found" |
| USER_NOT_ACTIVE | 403 | 147 |  "User not active" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |
  
 
### GetUserData 

It returns an simple json object with some user data

+ URL: [ENV]/users/{version}/data
+ Type: GET
+ Header:
  + dcoupon-authorization-apikey: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  + dcoupon-user-jwt: User encrypted session data token

+ OK Response:

```json
{
 "code":"_Internal Ok Response Code_",
 "description":{"alias":"_User_alias_","gender":"_User_gender_","birthdate":"YYYY-MM-DD","email":"_User_email_"}
}
```
If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:
```json
{
 "code":"_Internal Error Response Code_",
 "description":"_Error Response description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| SESSION_TOKEN_NOT_VALID | 406 | 142 |  "Session Token Not Valid" |
| USER_NOT_FOUND | 404 | 105 |  "User not found" |
| USER_NOT_ACTIVE | 403 | 147 |  "User not active" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |


### UpdateUserData

This method allow to update some user data

+ URL: [ENV]/users/{version}/data
+ Type: POST
+ Header:
  + dcoupon-authorization-apikey: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  + dcoupon-user-jwt: User encrypted session data token
  
+ Body:
```json
{
	"alias":"_alias_",
    "gender":"MALE | FEMALE | OTHER | RATHER_NOT_SAY",
    "birthday":"YYYY-MM-DD"
}
```

+ OK Response:

```json
{
 "code":"_Internal Ok Response Code_",
 "description":"_Operation description_"
}
```
If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:
```json
{
 "code":"_Internal Error Response Code_",
 "description":"_Error Response description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| SESSION_TOKEN_NOT_VALID | 406 | 142 |  "Session Token Not Valid" |
| USER_NOT_FOUND | 404 | 105 |  "User not found" |
| USER_NOT_ACTIVE | 403 | 147 |  "User not active" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |

### GetAvailableCountries

Returns a JSON with the detailed information about all available countries in dcoupn system

+ URL:[ENV]/users/{version}/countries
+ Type: GET
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  
+ Response:

```json
{
 "code":"_Internal Ok Response Code_",
 "description":{"countryShort":"_Country short name_","name":"_Country name_","loyaltyAffiliatesCount":"_Number of loyalty affiliates added to the country_"}
}
```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:
```json
{
 "code":"_Internal Response Error Code_",
 "description":"_Internal Response Error description_"
}
```

+ Posibles Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |

### GetLoyaltyAffiliates

Returns a JSON with the detailed information about all available affiliates for a country

+ URL:[ENV]/users/{version}/loyalty/affiliates/{countryCode}
+ URL:[ENV]/users/{version}/loyalty/affiliates
+ Type: GET
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
    
+ Response:

```json
{
 "code":"_Internal Response Ok Code_",
 "description":{"id":"_internal_id_affiliate","name":"_affiliate_name_","affiliateLogoPath":"_affiliate_logo_path_","countryCode":"_country_short_codename_","apiTokenAffiliate":"_affiliate_api_token_"}
}
```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:
```json
{
 "code":"_Internal Response Error Code_",
 "description":"_Internal Response Error description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| COUNTRY_NOT_FOUND | 404 | 128 |  "Country not found" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |

### GetLoyaltyCardsFromUser

Returns basic data from all active cards for an user

+ URL:[ENV]/users/{version}/loyalty/cards
+ Type: GET
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  + dcoupon-user-jwt: User encrypted session data token
    
+ Response:

```json
{
 "code":"_Internal Response Ok Code_",
 "description":[{"apiTokenAffilliate":"_affiliate_api_token_","cardNumber":"_card_number_"}]
}
```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:
```json
{
 "code":"_Internal Response Error Code_",
 "description":"_Internal Response Error description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| SESSION_TOKEN_NOT_VALID | 406 | 142 |  "Session Token Not Valid" |
| USER_NOT_FOUND | 404 | 105 |  "User not found" |
| USER_NOT_ACTIVE | 403 | 147 |  "User not active" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |


### AddOrUpdateLoyaltyCard

Update or add one loyalty card for an user

+ URL:[ENV]/users/{version}/loyalty/card
+ Type: POST
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  + dcoupon-user-jwt: User encrypted session data token
 
+ Body:
```json
{
  "affilliateId":"_affiliate_api_token_",
  "cardNumber":"_card_number_"
}
```

+ Response:

```json
{
 "code":"_Internal Response Ok Code_",
 "description":"_Operation description_"
}
```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:
```json
{
 "code":"_Internal Response Error Code_",
 "description":"_Internal Response Error description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| SESSION_TOKEN_NOT_VALID | 406 | 142 |  "Session Token Not Valid" |
| USER_NOT_FOUND | 404 | 105 |  "User not found" |
| USER_NOT_ACTIVE | 403 | 147 |  "User not active" |
| AFFILIATE_API_TOKEN_NOT_FOUND | 404 | 129 | "Loyalty affiliate api token not found" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |

### deleteLoyaltyCard 

Delete one loyalty card for an user

+ URL:[ENV]/users/{version}/loyalty/card
+ Type: DELETE
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  + dcoupon-user-jwt: User encrypted session data token
 
+ Body:
```json
{
  "affilliateId":"_affiliate_api_token_",
  "cardNumber":"_card_number_"
}
```

+ Response:

```json
{
 "code":"_Internal Response Ok Code_",
 "description":"_Operation description_"
}
```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:
```json
{
 "code":"_Internal Response Error Code_",
 "description":"_Internal Response Error description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| SESSION_TOKEN_NOT_VALID | 406 | 142 |  "Session Token Not Valid" |
| USER_NOT_FOUND | 404 | 105 |  "User not found" |
| USER_NOT_ACTIVE | 403 | 147 |  "User not active" |
| USER_LOYALTY_CARD_NOT_FOUND | 404 | 157 | "User loyalty card not found" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |

### GetUserRedemptionSummary

Return an array of remdemption data for an active user. It could be grouped by date chunks.

+ URL:[ENV]/users/{version}/redemption/summary
+ Type: GET
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  + dcoupon-user-jwt: User encrypted session data token
	
+ Parameters:
  + groupBy: "DAY|WEEK|MONTH|YEAR" (Required)
  + gtmTimeZoneOffset: _Hour_offset_ (Required)
  + initialDate: "_Start_date_string" (Optional)
  + endDate: "_End_date_string" (Optional)
  
+ Response:

```json
{
 "code":"_Internal Response Ok Code_",
 "description":[{"redemptionAmount":"_total_amount_rewarded__",
				"id_label":"_day_of_redemptions_",
				"year":"_year_of_redemptions_",
				"initialDate":"YYYY-MM-DD HH:MM:SS",
				"endDate":"YYYY-MM-DD HH:MM:SS"}]
}
```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:
```json
{
 "code":"_Internal Response Error Code_",
 "description":"_Internal Response Error description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| SESSION_TOKEN_NOT_VALID | 406 | 142 |  "Session Token Not Valid" |
| USER_NOT_FOUND | 404 | 105 |  "User not found" |
| USER_NOT_ACTIVE | 403 | 147 |  "User not active" |
| INVALID_GROUPBY | 406 | 146 |  "Invalid groupBy parameter" |
| INVALID_GTMTIMEZONEOFFSET | 406 | 145 |  "Invalid gtmTimeZoneOffset parameter" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |

### GetUserRedemptionHistory

Return an array of remdemption history data for an active user.

+ URL:[ENV]/users/{version}/redemption/history
+ Type: GET
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  + dcoupon-user-jwt: User encrypted session data token
	
+ Parameters:
  + limit: _number_of_rows_returned_ (Required)
  + gtmTimeZoneOffset: _Hour_offset_ (Required)
  + initialDate: "_Start_date_string" (Optional)
  + endDate: "_End_date_string" (Optional)
  
+ Response:

```json
{
 "code":"_Internal Response Ok Code_",
 "description":[{"id":"_redemption_id_codified_in_base64_",
				"date":"YYYY-MM-DD",
				"amount":"_amount_rewarded_",
				"couponsCount":"_coupons_count_",
				"retailerNameImg":{
					"retailerName":"_retailer_name_",
					"retailerLogo":"_retailer_logo_path_",
					"retailerToken":"_retailer_api_token_"}
				}]
}
```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:
```json
{
 "code":"_Internal Response Error Code_",
 "description":"_Internal Response Error description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| SESSION_TOKEN_NOT_VALID | 406 | 142 |  "Session Token Not Valid" |
| USER_NOT_FOUND | 404 | 105 |  "User not found" |
| USER_NOT_ACTIVE | 403 | 147 |  "User not active" |
| INVALID_GTMTIMEZONEOFFSET | 406 | 145 |  "Invalid gtmTimeZoneOffset parameter" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |


### GetRedemptionDetail

Return an object with remdemption detailed data for an active user and remdemption id

+ URL:[ENV]/users/{version}/redemption/detail/{remdemption_identifier} (returned in GetUserRedemptionHistory method).
+ Type: GET
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  + dcoupon-user-jwt: User encrypted session data token
	
+ Parameters:
  + gtmTimeZoneOffset: _Hour_offset_ (Required)
  
+ Response:

```json
{
 "code":"_Internal Response Ok Code_",
 "description":[{"redemptionInfo":{
					"id":"internal_redemption_id",
					"date":"yyyy-MM-dd",
					"amount":"_amount_rewarded_",
					"couponsCount":"_coupons_count_",
					"retailerNameImg":
						{"retailerName":"_retailer_name_",
						"retailerLogo":"_retailer_logo_path_",
						"retailerToken":"_retailer_api_token_"}},
						"couponsRedeemedList":
							[{"serial":"_coupon_serial_number",
							"promotionName":"_promotion_name_",
							"redeemedAmount":"_amount_rewarded_",
							"stampsBurnt":"_stamps_burnt_",
							"gcn":"_coupon_gcn_"}]
				]}
}
```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:
```json
{
 "code":"_Internal Response Error Code_",
 "description":"_Internal Response Error description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| SESSION_TOKEN_NOT_VALID | 406 | 142 |  "Session Token Not Valid" |
| USER_NOT_FOUND | 404 | 105 |  "User not found" |
| USER_NOT_ACTIVE | 403 | 147 |  "User not active" |
| INVALID_GTMTIMEZONEOFFSET | 406 | 145 |  "Invalid gtmTimeZoneOffset parameter" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |



## Signing requests

All request must be signed using UTF-8 encoding and the HmacSHA256 algorithm. 

The string to sign should have the sollowing pattern:

```
<API_KEY>:<timestamp>
```

_timestamp_ should be in the form "yyyy-MM-dd'T'HH:mm:ssZ", and is the timestamp at the moment of the request.

The string must be signed using the client's secret provided by dcoupon.

## Environments

This API is available in different dcoupon environments, you will get credentials for each environmen that you will need to use.

### Integration

This environment is available to develop and test your integration with dcoupon user coupons.

URL to use as [ENV] for this environment is https://integration.coupon.com/

## API method Version

The version of the api method to use must be provided {version} when making a call

Change Log

| Version | {version} | Launch Date | Available until |
|----------------|:----------:|:-------------:|-------------|
| Version 1.0 | v1 | 18th of May, 2020  | TBD|


 


