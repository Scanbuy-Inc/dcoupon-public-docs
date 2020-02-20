![Logo](https://s3.amazonaws.com/dcoupon.com/sdk/docs/dcouponLogo.png)

# dcoupon Anonymous coupon API

Version 1.0 (February 2020)

## Introduction

This API allow to generate coupons from dcupon promotions wihtout identifying the user. Once an anonymous coupons is created this API allows to access to coupon detail and to generate the temporary token suitable to redeem the coupon into assocciated stores.

All requests must be signed with a secret, which is provided by dcoupon.

## Methods:
### CreateAnonymousCoupon
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

### GenerateTemporalCouponToken

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
