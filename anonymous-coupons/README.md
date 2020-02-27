![Logo](https://s3.amazonaws.com/dcoupon.com/sdk/docs/dcouponLogo.png)

# dcoupon Anonymous coupon API

Version 1.0 (February 2020)

## Introduction

This API allow to generate coupons from dcupon promotions wihtout identifying the user. Once an anonymous coupons is created this API allows to access to coupon detail and to generate the temporary token suitable to redeem the coupon into assocciated stores.

All requests must be signed with a secret, which is provided by dcoupon.

## Methods:
### CreateAnonymousCoupon

This method generates a coupon from a promotion, identified by its promoToken. To be able to create the coupon, the promotion must allow anonymous coupons. If everything is correct, the method will return a unique cupon identifier that will be used to access coupon detail, and to generate the temporal token to redeem the coupon


+ URL:
+ Type: POST
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  
+ Body:
```json
{
	"promoToken": "_Token that identify the promotion_", 
	"publisherId": "_Publisher Identifier_",
	"source": "_Identifies which site sent the request_",
	"creationLatitude": "_Customer latitude_",
	"creationLongitude": "_Customer longitude",
	"crmId": "_Customer identifier_",
	"transId": "_Transaction ID_"
}
```

+ Ok Response:

```json
{
"_Hash unique cupon identifier_"
}
```
If a petition can't be resolved for any cause and error json response will be rise with the following structure:

+ Error Response:
HttpStatus + body with:
```json
{
 "code":"_Internal Error Code_",
 "description":"_Error description_"
}
```

+ Posibles Response Types for this method:

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
| PROMOTION_STATE_NOT_VALID | 202 | 137 | "Promotion's state is not valid for coupon creation" |
| PARAMATER_NOT_FOUND | 404 | 149 | "Required parameter not found" |
| PARAMETER_NOT_CORRECT | 406 | 150 | "Parameter is not correct" |
| PROMOTION_NOT_FOUND | 404 | 152 |  "Promotion not found" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |
| PARAMETER_TRANSID_NOT_FOUND | 404 | 153 | "Parameter transid not found" |
| PROMOTION_NOT_ALLOW_ANONYMOUS | 202 | 154 | "Promotion not allow creation of anonymous coupons" |

### GetAnonymousCouponDetail

Returns a JSON with the detailed information of the coupon, including promotion description, promotion token,  redemption dates, retailers where to redeem ... 

To access stores allowed to redeem this coupon, you can call stores API with the promotion token from the response.

+ URL:
+ Type: GET
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  
+ Parameters:
  + coupon: Coupon identifier, returned in CreateAnonymousCoupon method 
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

If a petition can't be resolved for any cause and error json response will be rise with the following structure:

+ Error Response:
HttpStatus + body with:
```json
{
 "code":"_Internal Error Code_",
 "description":"_Error description_"
}
```

+ Posibles Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| PARAMATER_NOT_FOUND | 404 | 149 | "Required parameter not found" |
| PARAMETER_NOT_CORRECT | 406 | 150 | "Parameter is not correct" |
| NO_COUPONS_AVAILABLE | 404 | 134 | "No coupons available" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |

### GenerateTemporalCouponToken

Returns the temporal code to use for coupon redemption in stores allowed to redeem the coupon . 

This value can be displayed as a text or encoded inside a Code-128 barcode, adding "DC" as a prefix.

+ URL:
+ Type: GET
+ Header:
  + dcoupon-authorization-apitoken: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  
+ Parameters:
  + coupon: Coupon identifier, returned in CreateAnonymousCoupon method 
    
+ Response:

```json
{
 "_Temporal token for redemption_"
}
```

If a petition can't be resolved for any cause and error json response will be rise with the following structure:

+ Error Response:
HttpStatus + body with:
```json
{
 "code":"_Internal Error Code_",
 "description":"_Error description_"
}
```

+ Posibles Response Types for this method:

| Response	 | HttpStatus | Internal Code | Description |
|----------------|:----------:|:-------------:|-------------|
| PARAMATER_NOT_FOUND | 404 | 149 | "Required parameter not found" |
| PARAMETER_NOT_CORRECT | 406 | 150 | "Parameter is not correct" |
| NO_COUPONS_AVAILABLE | 404 | 134 | "No coupons available" |
| INTERNAL_ERROR | 500 | 500 | "Internal Error" |

## Signing requests

All request must be signed using UTF-8 encoding and the HmacSHA256 algorithm. 

The signed string should be:

 + POST request

```
<API_KEY>:<timestamp>:<POST body>
```

 + GET request

```
<API_KEY>:<timestamp>
```

_timestamp_ should be in the form "yyyy-MM-dd'T'HH:mm:ssZ", and is the timestamp at the moment of the request.

The string must be signed using the client's API secret provided by dcoupon.
