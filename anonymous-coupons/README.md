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
```json
{
	"code": "_Operation response code_", 
	"description": "_Operation response description or hash unique cupon identifier _",
}

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
	"couponId":Coupon id,
	"mcToken":Token,
	"lowImage":Path to low image,
	"highImage":Path to high image,
	"highImage2":Another path to high image,
	"name":Coupon name,
	"description":Coupon description,
	"offerRedemptionStartDate":Start date,
	"offerRedemptionEndDate":End date,
	"status":status,
	"sgcn":sgcn,
	"canBeRedeemed":If cab be redeem,
	"termsAndConditions":Terms and conditions,
	"rewardedItems":[
		{
			"idREWARDED_ITEMS":id item,
			"itemId":internal id item,
			"rewardedItemQuantity":quantity,
		}
	],
	"promotionType":type of promotion,
	"totalStampsBurnt":stamps burnt,
	"maxStamps":max number of stamps,
	"retailerNameImg":[
		{
			"retailerName":Retailer name,
			"retailerLogo":Retailer logo,
			"retailerToken":Retailer token
		}
	],
	"stampsBurnt":{
		"redemption":redemption data
	},
	"discount":{
		"discountType":discount type,
		"amount":amount
	},
	"genericResponse":{
		"code":code of response,
		"description":description of response
	}
}



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
	"code": "_Operation response code_", 
	"description": "_Temporal token for use with_",
}

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

### Response types

OPERATION_OK(0,"Command executed successfully"),
POS_TIMEOUT(1, "Timeout waiting for POS redemption response"), 
LOGINID_USED(101, "LoginId in use"),
APPID_USED(102, "App_id in use"), 
PASSWORD_FORMAT_INCORRECT(103, "Password format invalid acording specifications"),
TOKEN_NOT_FOUND(104, "Token not found"), 
USER_NOT_FOUND(105, "User not found"),
PASSWORD_NOT_VALID(106, "Password not valid"), 
APPID_ALREADY_ASSIGNED(107, "App id asigned to other user"),
APPID_NOT_FOUND(108, "App id not found"), 
NO_COUPONS_FOR_USER(109, "No Coupons for the user in this point of sale"),
COUPONID_NOT_FOUND(111, "Coupon id not found"), 
POSID_NOT_FOUND(115, "Pos id not found"),
RETAILER_NOT_FOUND(116, "Retailer not found"), 
METACOUPON_NOT_FOUND(117, "MetaCoupon token not found"),
PUBLISHER_NOT_FOUND(118, "Publisher token not found"),
MAX_COUPON_EXCEEDED(119, "User exceeded the max coupon available per user"),
LOGINID_IS_NOT_VALID(120, "Login id is not a valid email"),
EXPIRED_TOKEN(121, "Expired token time.Token must be created again"),
USER_TOKEN_NOT_VALID(122, "User Token Not Valid"), 
TOKEN_NOT_CREATED(123, "Token has not been created yet"),
RETAILER_ALLOCATED_NOT_VALID(124, "No valid Allocated retailers"),
COUPONS_DETAILS_NOT_FOUND(125, "Unable to find details of coupon"),
PROMOTION_NOT_INITIATED(126, "Promotion not initiated"),
PROMTION_EXPIRED(127, "Promotion expired"), 
COUNTRY_NOT_FOUND(128, "Country not found"),
AFFILIATE_API_TOKEN_NOT_FOUND(129, "Loyalty affiliate api token not found"),
MAX_NON_REDEEMED_COUPONS_EXCEEDED(130, "MAX non redeemed coupons exceeded"),
MAX_COUPONS_PER_OFFER_EXCEEDED(131,"Max Coupons per Offer exceeded"),
TRANSID_NOT_VALID(132,"TransId not valid"),
PUBLISHER_NOT_VALID(133,"Publisher not valid"),
NO_COUPONS_AVAILABLE(134,"No coupons available"), 
PUBLISHER_EXCEED_MAX_NUMBER_OF_COUPONS(135,"Publisher exceed max number of coupons for this campaign"), 
CORDS_NOT_VALIDS(136,"Latitude or Longitude not valid"), 
PROMOTION_STATE_NOT_VALID(137,"Promotion's state is not valid for coupon creation"),
CARD_NUMBER_NOT_FOUND(138,"Card Number not found"),
TRANSACTION_ALIVE(139,"Transaction still alive"),
CAMPAIGN_LIST_ERROR(140,"Error in the list of campaigns"),
SIGNATURE_INCORRECT(141,"Incorrect signature"), 
SESSION_TOKEN_NOT_VALID(142,"Session Token Not Valid"),
LOYALTY_CARD_USED(143,"Loyalty card in use"),
INVALID_REDEMPTION_ID(144,"Invalid redemptionID parameter"),
INVALID_GTMTIMEZONEOFFSET(145,"Invalid gtmTimeZoneOffset parameter"),
INVALID_GROUPBY(146,"Invalid groupBy parameter"),
USER_NOT_ACTIVE(147,"User not active"),
USER_NOT_REGISTERED(148,"User not registered via $1, registration type: #"),
PARAMATER_NOT_FOUND(149,"Required parameter not found"),
PARAMETER_NOT_CORRECT(150,"Parameter is not correct"),
TIME_ACQUISITION_NOT_ELAPSED(151,"Time between consecutive coupons acquisition not elapsed"),
PROMOTION_NOT_FOUND(152, "Promotion not found"), 
INTERNAL_ERROR(500,"Internal Error"), 
PARAMETER_TRANSID_NOT_FOUND(153,"Parameter transid not found"), 
PROMOTION_NOT_ALLOW_ANONYMOUS(154,"Promotion not allow creation of anonymous coupons");
