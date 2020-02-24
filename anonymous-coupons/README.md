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
+ Response:


### GetAnonymousCouponDetail

Returns a JSON with the detailed information of the coupon/promotion, including description, redemption dates, retailers where to redeem ... 

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
The string should be signed using the client's API secret provided by dcoupon.
