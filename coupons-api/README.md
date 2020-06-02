![Logo](https://s3.amazonaws.com/dcoupon.com/sdk/docs/dcouponLogo.png)

# dcoupon 
# Coupons API

Version 1.1 (May 2020)

## Introduction

This API allow to generate coupons from dcupon promotions for an user. Once an user coupons is created this API allows to access the coupon detail, activate and deactivae the user coupons, list all his coupons by filtering them and listing retailers and companies of his active coupons.

Also this API allow to generate coupons from dcupon promotions wihtout identifying the user. Once an anonymous coupons is created this API allows to access to coupon detail and to generate the temporary token suitable to redeem the coupon into assocciated stores.

All requests must be signed with a secret, which is provided by dcoupon.

## Methods:
### CreateAnonymousCoupon

This method generates a coupon from a promotion, identified by its promoToken. To be able to create the coupon, the promotion must allow anonymous coupons. If everything is correct, the method will return a unique coupon identifier that will be used to access coupon detail, and to generate the temporal token to redeem the coupon


+ URL: [ENV]/coupons/{version}/createAnonymousCoupon
+ Type: POST
+ Header:
  + dcoupon-authorization-apikey: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  
+ Body:

```json
{
	"promoTokens": ["_Array of Tokens that identify the promotions_"], 
	"publisherId": "_Publisher Identifier_",
	"source": "_Identifies which site sends the request_",
	"creationLatitude": "_Customer latitude_",
	"creationLongitude": "_Customer longitude",
	"crmId": "_Customer identifier_",
	"transId": "_Transaction ID_"
}
```

+ OK Response:

```json
{
 "coupon":"_Hash unique cupon identifier_"
}
```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:

```json ResponseType
{
 "code":"_dcoupon response code_",
 "description":"_dcoupon response description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| COUPONID_NOT_FOUND | 404 | 111 |  "Coupon id not found" |
| MAX_COUPON_EXCEEDED | 202 | 119 |  "User exceeded the max coupon available per user" |
| PROMOTION_NOT_INITIATED | 202 | 126 |  "Promotion not initiated" |
| PROMOTION_EXPIRED | 202 | 127 |  "Promotion expired" |
| MAX_COUPONS_PER_OFFER_EXCEEDED | 202 | 131 | "Max Coupons per Offer exceeded" |
| TRANSID_NOT_VALID | 406 | 132 | "TransId not valid" |
| PUBLISHER_NOT_VALID | 406 | 133 | "Publisher not valid" |
| PUBLISHER_EXCEED_MAX_NUMBER_OF_COUPONS | 202 | 135 | "Publisher exceed max number of coupons for this campaign" |
| CORDS_NOT_VALIDS | 406 | 136 | "Latitude or Longitude not valid" |
| PROMOTION_STATE_NOT_VALID | 202 | 137 | "Promotion's state does not allow this operation" |
| PARAMATER_NOT_FOUND | 404 | 149 | "Required parameter not found" |
| PARAMETER_NOT_CORRECT | 406 | 150 | "Parameter is not correct" |
| PROMOTION_NOT_FOUND | 404 | 152 |  "Promotion not found" |
| PARAMETER_TRANSID_NOT_FOUND | 404 | 153 | "Parameter transid not found" |
| PROMOTION_NOT_ALLOW_ANONYMOUS | 202 | 154 | "Promotion does not allow creation of anonymous coupons" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |

### detail (GetAnonymousCouponDetail)

Returns a JSON with the detailed information of the coupon, including promotion description, promotion token,  redemption dates, retailers where to redeem ... 

To access stores allowed to redeem this coupon, you can call stores API with the promotion token from the response.

+ URL:[ENV]/coupons/{version}/getAnonymousCouponDetail/{coupon identifier} (returned in CreateAnonymousCoupon method)
+ URL:[ENV]/coupons/{version}/anonymous/detail/{coupon identifier} (returned in CreateAnonymousCoupon method)
+ Type: GET
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  
+ Parameters:
  + lang: language to display currency
  
+ Response:

```json
{
	"couponId": "_Coupon id_",
	"mcToken": "_Promotion token_",
	"lowImage": "_Path to low image_",
	"highImage": "_Path to high image_",
	"highImage2": "_Path to second high image_",
	"name": "_Coupon name_",
	"description": "_Coupon description_",
	"offerRedemptionStartDate": "_Coupon redemption start date_",
	"offerRedemptionEndDate": "_Coupon redemption end date_",
	"status": "_Active/Inactive_",
	"sgcn": "_sgcn_",
	"canBeRedeemed": "_Flag indicating if the coupon can be redeem_",
	"termsAndConditions": "_Terms and conditions_",
	"rewardedItems":[
		{
			"idREWARDED_ITEMS": "__Internal item id_",
			"itemId": "_EAN/UPC of the item_",
			"rewardedItemQuantity": "_quantity_"
		}
	],
	"promotionType": "_type of promotion_",
	"totalStampsBurnt": "_stamps burnt_",
	"maxStamps": "_max number of stamps_",
	"retailerNameImg":[
		{
			"retailerName": "_Retailer name_",
			"retailerLogo": "_Retailer logo_",
			"retailerToken": "_Retailer token_"
		}
	],
	"stampsBurnt":[
		{	
			"redemption": 
			{
				"redDate": "_Redemption date_",
				"stamps": "_Stamps burnt_"
			}
		}
	]
	,
	"discount":{
		"discountType": "_Discount type_",
		"amount": "_Discount amount_"
	}
}
```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:

```json ResponseType
{
 "code":"_dcoupon response code_",
 "description":"_dcoupon response description_"
}
```

+ Posibles Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| PARAMATER_NOT_FOUND | 404 | 149 | "Required parameter not found" |
| PARAMETER_NOT_CORRECT | 406 | 150 | "Parameter is not correct" |
| NO_COUPONS_AVAILABLE | 404 | 134 | "No coupons available" |
| PROMOTION_NOT_ALLOW_ANONYMOUS | 202 | 154 | "Promotion does not allow creation of anonymous coupons" |
| PROMOTION_NOT_INITIATED | 202 | 126 | "Promotion not initiated" |
| PROMOTION_EXPIRED | 202 | 127 | "Promotion expired" | 
| PROMOTION_STATE_NOT_VALID | 202 | 137 | "Promotion's state does not allow this operation" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |

### GenerateTemporalCouponToken

Returns the temporal code to use for coupon redemption in stores allowed to redeem the coupon . 

This value can be displayed as a text or encoded inside a Code-128 barcode, adding "DC" as a prefix.

+ URL:[ENV]/coupons/{version}/generateTemporalCouponToken/{coupon identifier} (returned in CreateAnonymousCoupon method)
+ Type: GET
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
    
+ Response:

```json TemporalTokenAnonymousResponse
{
 "temporalToken":"_Temporal token for anonymous user_",
}
```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:

```json ResponseType
{
 "code":"_dcoupon response code_",
 "description":"_dcoupon response description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| PARAMATER_NOT_FOUND | 404 | 149 | "Required parameter not found" |
| PARAMETER_NOT_CORRECT | 406 | 150 | "Parameter is not correct" |
| NO_COUPONS_AVAILABLE | 404 | 134 | "No coupons available" |
| COUNPON_CANT_BE_REEDEMED| 202 | 155 | "Coupon can not be redeemed" |
| PROMOTION_NOT_ALLOW_ANONYMOUS | 202 | 154 | "Promotion does not allow creation of anonymous coupons" |
| PROMOTION_NOT_INITIATED | 202 | 126 | "Promotion not initiated" |
| PROMOTION_EXPIRED | 202 | 127 | "Promotion expired" | 
| PROMOTION_STATE_NOT_VALID | 202 | 137 | "Promotion's state does not allow this operation" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |


### redemptionToken

This method return a temporal generated token to redeem coupons for an user. It will be valid 90 seconds by default.

+ URL: [ENV]/coupons/{version}/redemptionToken
+ Type: GET
+ Header:
  + dcoupon-authorization-apikey: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  + dcoupon-user-jwt: User encrypted session data token
  
 + OK Response:
HttpStatus + body with:

```json TemporalTokenUserResponse
{
 "temporalToken":"_Temporal user token_",
}
```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:

```json ResponseType
{
 "code":"_dcoupon response code_",
 "description":"_dcoupon response description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| SESSION_TOKEN_NOT_VALID | 406 | 142 |  "Session Token Not Valid" |
| USER_NOT_FOUND | 404 | 105 |  "User not found" |
| USER_NOT_ACTIVE | 403 | 147 |  "User not active" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |


### list (getUserCoupons)

This method return all user coupons. Can be filtered by retailers and companies and sorted NEWEST, ENDING or VALUE. The response can be pageable by setting LIMIT and OFFSET.

+ URL: [ENV]/coupons/{version}/list
+ Type: GET
+ Header:
  + dcoupon-authorization-apikey: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  + dcoupon-user-jwt: User encrypted session data token
+ Parameters: 
  + retailers: "_Array of retailers_" (Optional)
  + companies: "_Array of companies_" (Optional)
  + lang: "ES|US" (Optional)
  + sortBy: "NEWEST|ENDING|VALUE" (Optional)
  + limit: "_Number of rows fetched_" (Optional) (Default: 100)
  + offset: "_Number of rows to skip before starting to return rows_" (Optional) (Default: 0)  
  
 + OK Response:

```json array of CouponDetailResponse
[{
	"couponId": "_Coupon id_",
	"mcToken": "_Promotion token_",
	"lowImage": "_Path to low image_",
	"highImage": "_Path to high image_",
	"highImage2": "_Path to second high image_",
	"name": "_Coupon name_",
	"description": "_Coupon description_",
	"offerRedemptionStartDate": "_Coupon redemption start date_",
	"offerRedemptionEndDate": "_Coupon redemption end date_",
	"status": "_Active/Inactive_",
	"sgcn": "_sgcn_",
	"canBeRedeemed": "_Flag indicating if the coupon can be redeem_",
	"termsAndConditions": "_Terms and conditions_",
	"rewardedItems":[
		{
			"idREWARDED_ITEMS": "__Internal item id_",
			"itemId": "_EAN/UPC of the item_",
			"rewardedItemQuantity": "_quantity_"
		}
	],
	"promotionType": "_type of promotion_",
	"totalStampsBurnt": "_stamps burnt_",
	"maxStamps": "_max number of stamps_",
	"retailerNameImg":[
		{
			"retailerName": "_Retailer name_",
			"retailerLogo": "_Retailer logo_",
			"retailerToken": "_Retailer token_"
		}
	],
	"stampsBurnt":[
		{	
			"redemption": 
			{
				"redDate": "_Redemption date_",
				"stamps": "_Stamps burnt_"
			}
		}
	]
	,
	"discount":{
		"discountType": "_Discount type_",
		"amount": "_Discount amount_"
	}
}]
```
If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:

```json ResponseType
{
 "code":"_dcoupon response code_",
 "description":"_dcoupon response description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| SESSION_TOKEN_NOT_VALID | 406 | 142 |  "Session Token Not Valid" |
| USER_NOT_FOUND | 404 | 105 |  "User not found" |
| USER_NOT_ACTIVE | 403 | 147 |  "User not active" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |
  
 
### CreateUserCoupon

This method generates coupons for different promotions, identified by its promoToken. To be able to create the coupons, the promotion must be valid. If everything is correct, the method will return an array of coupons identifiers that will be used to access each coupon detail.

+ URL: [ENV]/coupons/{version}/createUserCoupon
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
	"promoTokens": ["_Array of Tokens that identifiers the promotions_"], 
	"publisherId": "_Publisher Identifier_",
	"source": "_Identifies which site sends the request_",
	"creationLatitude": "_Customer latitude_",
	"creationLongitude": "_Customer longitude",
	"crmId": "_Customer identifier_",
	"transId": "_Transaction ID_"
}
```

+ OK Response:

```json array of CouponDetailResponse
[{"apiToken":"_Promotion token_",
	"idCoupon":"_New created coupond id_",
	"coupon":"_Hash unique cupon identifier_",
	"response":{
		"code":"_dcoupon response code_",
 		"description":"_dcoupon response description_"
	}
}]

```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:

```json ResponseType
{
	"code":"_dcoupon response code_",
 	"description":"_dcoupon response description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| SESSION_TOKEN_NOT_VALID | 406 | 142 |  "Session Token Not Valid" |
| USER_NOT_FOUND | 404 | 105 |  "User not found" |
| USER_NOT_ACTIVE | 403 | 147 |  "User not active" |
| COUPONID_NOT_FOUND | 404 | 111 |  "Coupon id not found" |
| MAX_COUPON_EXCEEDED | 202 | 119 |  "User exceeded the max coupon available per user" |
| PROMOTION_NOT_INITIATED | 202 | 126 |  "Promotion not initiated" |
| PROMOTION_EXPIRED | 202 | 127 |  "Promotion expired" |
| MAX_COUPONS_PER_OFFER_EXCEEDED | 202 | 131 | "Max Coupons per Offer exceeded" |
| TRANSID_NOT_VALID | 406 | 132 | "TransId not valid" |
| PUBLISHER_NOT_VALID | 406 | 133 | "Publisher not valid" |
| PUBLISHER_EXCEED_MAX_NUMBER_OF_COUPONS | 202 | 135 | "Publisher exceed max number of coupons for this campaign" |
| CORDS_NOT_VALIDS | 406 | 136 | "Latitude or Longitude not valid" |
| PROMOTION_STATE_NOT_VALID | 202 | 137 | "Promotion's state does not allow this operation" |
| PARAMATER_NOT_FOUND | 404 | 149 | "Required parameter not found" |
| PARAMETER_NOT_CORRECT | 406 | 150 | "Parameter is not correct" |
| PROMOTION_NOT_FOUND | 404 | 152 |  "Promotion not found" |
| PARAMETER_TRANSID_NOT_FOUND | 404 | 153 | "Parameter transid not found" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |

### detail (GetUserCouponDetail)

Returns a JSON with the detailed information of the coupon, including promotion description, promotion token,  redemption dates, retailers where to redeem ... 

To access stores allowed to redeem this coupon, you can call stores API with the promotion token from the response.

+ URL:[ENV]/coupons/{version}/detail/{coupon_identifier} (returned in CreateUserCoupon method)
+ URL:[ENV]/coupons/{version}/user/detail/{coupon_identifier} (returned in CreateUserCoupon method)
+ Type: GET
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  + dcoupon-user-jwt: User encrypted session data token
  
+ Parameters:
  + lang: language to display currency
  
+ Response:

```json CouponDetailResponse
{
	"couponId": "_Coupon id_",
	"mcToken": "_Promotion token_",
	"lowImage": "_Path to low image_",
	"highImage": "_Path to high image_",
	"highImage2": "_Path to second high image_",
	"name": "_Coupon name_",
	"description": "_Coupon description_",
	"offerRedemptionStartDate": "_Coupon redemption start date_",
	"offerRedemptionEndDate": "_Coupon redemption end date_",
	"status": "_Active/Inactive_",
	"sgcn": "_sgcn_",
	"canBeRedeemed": "_Flag indicating if the coupon can be redeem_",
	"termsAndConditions": "_Terms and conditions_",
	"rewardedItems":[
		{
			"idREWARDED_ITEMS": "__Internal item id_",
			"itemId": "_EAN/UPC of the item_",
			"rewardedItemQuantity": "_quantity_"
		}
	],
	"promotionType": "_type of promotion_",
	"totalStampsBurnt": "_stamps burnt_",
	"maxStamps": "_max number of stamps_",
	"retailerNameImg":[
		{
			"retailerName": "_Retailer name_",
			"retailerLogo": "_Retailer logo_",
			"retailerToken": "_Retailer token_"
		}
	],
	"stampsBurnt":[
		{	
			"redemption": 
			{
				"redDate": "_Redemption date_",
				"stamps": "_Stamps burnt_"
			}
		}
	]
	,
	"discount":{
		"discountType": "_Discount type_",
		"amount": "_Discount amount_"
	}
}
```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:

```json ResponseType
{
	"code":"_dcoupon response code_",
 	"description":"_dcoupon response description_"
}
```

+ Posibles Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| SESSION_TOKEN_NOT_VALID | 406 | 142 |  "Session Token Not Valid" |
| USER_NOT_FOUND | 404 | 105 |  "User not found" |
| USER_NOT_ACTIVE | 403 | 147 |  "User not active" |
| PARAMATER_NOT_FOUND | 404 | 149 | "Required parameter not found" |
| PARAMETER_NOT_CORRECT | 406 | 150 | "Parameter is not correct" |
| NO_COUPONS_AVAILABLE | 404 | 134 | "No coupons available" |
| PROMOTION_NOT_INITIATED | 202 | 126 | "Promotion not initiated" |
| PROMOTION_EXPIRED | 202 | 127 | "Promotion expired" | 
| PROMOTION_STATE_NOT_VALID | 202 | 137 | "Promotion's state does not allow this operation" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |

### activate (ActivateUserCoupon)

Activate a user coupon if not already active.

+ URL:[ENV]/coupons/{version}/activate/{coupon_identifier} (returned in CreateUserCoupon method)
+ Type: GET
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  + dcoupon-user-jwt: User encrypted session data token
    
+ Response:

```json ResponseType
{
	"code":"_dcoupon response code_",
 	"description":"_dcoupon response description_"
}
```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:

```json ResponseType
{
	"code":"_dcoupon response code_",
 	"description":"_dcoupon response description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| SESSION_TOKEN_NOT_VALID | 406 | 142 |  "Session Token Not Valid" |
| USER_NOT_FOUND | 404 | 105 |  "User not found" |
| USER_NOT_ACTIVE | 403 | 147 |  "User not active" |
| PARAMATER_NOT_FOUND | 404 | 149 | "Required parameter not found" |
| PARAMETER_NOT_CORRECT | 406 | 150 | "Parameter is not correct" |
| NO_COUPONS_AVAILABLE | 404 | 134 | "No coupons available" |
| COUNPON_CANT_BE_REEDEMED| 202 | 155 | "Coupon can not be redeemed" |
| PROMOTION_NOT_INITIATED | 202 | 126 | "Promotion not initiated" |
| PROMOTION_EXPIRED | 202 | 127 | "Promotion expired" | 
| PROMOTION_STATE_NOT_VALID | 202 | 137 | "Promotion's state does not allow this operation" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |

### deactivate (DeactivateUserCoupon)

Deactivate a user coupon if not already deactive.

+ URL:[ENV]/coupons/{version}/deactivate/{coupon_identifier} (returned in CreateUserCoupon method)
+ Type: GET
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  + dcoupon-user-jwt: User encrypted session data token
    
+ Response:

```json ResponseType
{
	"code":"_dcoupon response code_",
 	"description":"_dcoupon response description_"
}
```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:

```json ResponseType
{
	"code":"_dcoupon response code_",
 	"description":"_dcoupon response description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| SESSION_TOKEN_NOT_VALID | 406 | 142 |  "Session Token Not Valid" |
| USER_NOT_FOUND | 404 | 105 |  "User not found" |
| USER_NOT_ACTIVE | 403 | 147 |  "User not active" |
| PARAMATER_NOT_FOUND | 404 | 149 | "Required parameter not found" |
| PARAMETER_NOT_CORRECT | 406 | 150 | "Parameter is not correct" |
| NO_COUPONS_AVAILABLE | 404 | 134 | "No coupons available" |
| COUNPON_CANT_BE_REEDEMED| 202 | 155 | "Coupon can not be redeemed" |
| PROMOTION_NOT_INITIATED | 202 | 126 | "Promotion not initiated" |
| PROMOTION_EXPIRED | 202 | 127 | "Promotion expired" | 
| PROMOTION_STATE_NOT_VALID | 202 | 137 | "Promotion's state does not allow this operation" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |

### retailers (UserCouponRetailers)

Return an array of retailers data for all active user coupons

+ URL:[ENV]/coupons/{version}/retailers
+ Type: GET
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  + dcoupon-user-jwt: User encrypted session data token
    
+ Response:

```json array of RetailerNameImg
[
	 {
	  "retailerName":"_Retailer Name_",
	  "retailerLogo":"_URL for retailer logo_",
	  "retailerToken":"_Retailer api token_"
	  }
]

```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:

```json ResponseType
{
	"code":"_dcoupon response code_",
 	"description":"_dcoupon response description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| SESSION_TOKEN_NOT_VALID | 406 | 142 |  "Session Token Not Valid" |
| USER_NOT_FOUND | 404 | 105 |  "User not found" |
| USER_NOT_ACTIVE | 403 | 147 |  "User not active" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |

### companies (UserCouponCompanies)

Return an array of companies data for all active user coupons

+ URL:[ENV]/coupons/{version}/companies
+ Type: GET
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  + dcoupon-user-jwt: User encrypted session data token
    
+ Response:

```json array of Company
[
	{
	"name":"Company Name_",
	"logo":"_URL for company logo_",
	"token":"_Company api token_"
	}
]

```

If a request can't be resolved, an error JSON response will be returned with the following structure:

+ Error Response:
HttpStatus + body with:

```json ResponseType
{
	"code":"_dcoupon response code_",
 	"description":"_dcoupon response description_"
}
```

+ Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| SESSION_TOKEN_NOT_VALID | 406 | 142 |  "Session Token Not Valid" |
| USER_NOT_FOUND | 404 | 105 |  "User not found" |
| USER_NOT_ACTIVE | 403 | 147 |  "User not active" |
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

URL to use as [ENV] for this environment is https://services-dev.dcoupon.com/

## API method Version

The version of the api method to use must be provided {version} when making a call

Change Log

| Version | {version} | Launch Date | Available until |
|----------------|:----------:|:-------------:|-------------|
| Version 1.0 | v1 | 17th of April, 2020  | TBD|
| Version 1.1 | v1 | 28th of May, 2020  | TBD|


 


