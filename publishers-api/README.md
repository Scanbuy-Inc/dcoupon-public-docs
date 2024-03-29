![Logo](https://s3.amazonaws.com/dcoupon.com/sdk/docs/dcouponLogo.png)

# dcoupon Publishers API

Version 2.0 (May 2020)

## Introduction

This API enable to work with dcoupon promotions, this API allows to list available promotions, access to promotion details and access to available filters. Each publisher will have access only to those promotions associated to it.

All requests must be signed with a secret, which is provided by dcoupon.

## Methods:

### Promotions

Returns all active promotions filtered with the parameters sent in the request.

+ URL: [ENV]/publisher/{version}/promotions
+ Type: GET
+ Header:
  + dcoupon-authorization-apikey: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  
+ Parameters: 
  + country: "_Short country code (2 digits), according to ISO 3166-1 alpha-2. The publisher must be authorized to publish offers in this country._"
  + categoryIds: "_Filter offers from this/these category/ies_"
  + retailerTokens: "_Filter offers redeemable in this/these retailer/s_"
  + storeIds: "Filter offers redeemable in those stores form the selected retailer"
  + textSearch: "_Text to search for into promotion name, promotion description and company owner of the promotions_"
  + companyTokens: "_Filter offers from this/these company/ies_"
  + longitude: "_User longitude coordinate (DD format)_"
  + latitude:"_User latitude coordinate (DD format)_"
  + radius: "_Radius in kilometers to make the search for coupons available_"
  + start: "_Number of rows to skip before starting to return rows_" (Optional) (Default: 0)  
  + limit: "_Number of rows fetched_" (Optional)_"
  + orderBy:"_Filter how the result set is sorted_"
    + **NEWEST** : (default) promotions returned will be ordered from newest promotions to oldest.
    + **ENDING** : promotions returned will be ordered starting for those promotions closest to end its publication
    + **VALUE** : promotions returned will be ordered considering face value of the offer, from highest values to lowest
    + **TOP** : promotions returned will be ordered starting for those promotions with a higher number of acquired coupons
  
 + OK Response:

```json
{
  "totalResults": 1,
  "pageSize": 0,
  "start": 0,
  "more": false,
  "filterTotalDiscount": "$100",
  "items": [
    {
      "token": "token_promo_1",
      "name": "promo1",
      "description": "description",
      "smallImageUrl": "https://imageurl.com",
      "bigImageUrl": "https://imageurl.com",
      "bigImageUrl2": "https://imageurl.com",
      "discount": {
        "promoType": "Type1",
        "amount": "$100",
        "maxAmtToDiscount": "$100"
      },
      "redemptionStartDate": "01/01/2016",
      "redemptionEndDate": "01/01/2017",
      "isTransactionIdRequired": false,
      "retailers": [
        {
          "name": "retailer1",
          "logoUrl": "http://retailer.com/img.jpg",
          "token": "token1",
          "validInAllStores": true
        }
      ],
      "url": "https://promo.com"
    }
  ]
}
```

+ Error Response:
HttpStatus + body with:
```json
{
  "errorId": "_Error status_",
  "errorCode": "_Error Response Code_",
  "errorMessage": "_Error Response Message_"
}
```

### Promotion Detail

Get the promotion detail

+ URL: [ENV]/publisher/{version}/promotions/{promotion_token} (From list of promotions)
+ Type: GET
+ Header:
  + dcoupon-authorization-apikey: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  
+ Parameters: 
   + country: "_Short country code (2 digits), according to ISO 3166-1 alpha-2. The publisher must be authorized to publish offers in this country._"
  
 + OK Response:

```json
{
  "token": "token_promo_1",
  "name": "promo1",
  "description": "description",
  "smallImageUrl": "https://imageurl.com",
  "bigImageUrl": "https://imageurl.com",
  "bigImageUrl2": "https://imageurl.com",
  "discount": {
    "promoType": "Type1",
    "amount": "$100",
    "maxAmtToDiscount": "$100"
  },
  "redemptionStartDate": "01/01/2016",
  "redemptionEndDate": "01/01/2017",
  "isTransactionIdRequired": false,
  "retailers": [
    {
      "name": "retailer1",
      "logoUrl": "http://retailer.com",
      "token": "token1",
      "validInAllStores": true
    }
  ],
  "url": "https://promo.com"
}
```

+ Error Response:
HttpStatus + body with:
```json
{
  "errorId": "_Error status_",
  "errorCode": "_Error Response Code_",
  "errorMessage": "_Error Response Message_"
}
```

### Retailers

Returns all retailers where the offers can be redeemed and the number of active offers for each retailer

+ URL: [ENV]/publisher/{version}/retailers
+ Type: GET
+ Header:
  + dcoupon-authorization-apikey: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  
+ Parameters: 
  + country: "_Short country code (2 digits), according to ISO 3166-1 alpha-2. The publisher must be authorized to publish offers in this country._"
  + start: "_Number of rows to skip before starting to return rows_" (Optional) (Default: 0)  
  + limit: "_Number of rows fetched_" (Optional)_"
 
 + OK Response:

```json
{
	"totalResults": 4,
	"pageSize": 10,
	"start": 0,
	"items": [
		{
			"name": "dcoupon demo",
			"token": "q5dn8vbw59t8es4709fu",
			"logoUrl": "s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1580813574943.png",
			"numActiveOffers": 49
		},
		{
			"name": "GADIS",
			"token": "scgildx2619ccqzu4vkj",
			"logoUrl": "s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/mcp_img1460370674807.png",
			"numActiveOffers": 1
		},
		{
			"name": "LUPA",
			"token": "ed7hrbujnzlswvyp7c11",
			"logoUrl": "s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/mcp_img1447785382041.png",
			"numActiveOffers": 1
		},
		{
			"name": "ScanLife Demo",
			"token": "x3vyr8icn081mlrrr0rn",
			"logoUrl": "s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1579625831118.png",
			"numActiveOffers": 61
		}
	]
}
```

+ Error Response:
HttpStatus + body with:
```json
{
  "errorId": "_Error status_",
  "errorCode": "_Error Response Code_",
  "errorMessage": "_Error Response Message_"
}
```

### Stores

Return a list of stores associated with a retailer identified by its retailer API token. (Use retailer_token , not promotion_token ) OR Returns all active promotions associated to the publisher identified by the API token filtered with the parameters sent in the request, including a list of stores from the retailer. (Use promotion_token , can combine with retailer_tokens) Requires either promotion_token OR retailer_token. Or both can be used.

Requires either promotion_token OR retailer_token OR both can be used.

+ URL: [ENV]/publisher/{version}/stores/
+ Type: GET
+ Header:
  + dcoupon-authorization-apikey: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  
+ Parameters
  + publisherToken: Publisher token filter (Required)
  + latitude: Latitude coord for geolocation search (Optional)
  + longitude: Longitude coord for geolocation search (Optional)
  + orderBy: NEWEST|ENDING|TOP|VALUE
  + radius: Radius search for geolocation search (Optional) 
  + retailerTokens: A list of retailers token (Optional)
  + start: Start index result (Optional)
  + limit: Limit of result in one page (Optional)
  + storeIds: A list of store ids (Optional)
  + unit: KM|MI (Optional)
  + zipcode: Zip code (Optional)
  + promotionToken: Search stores by a promotion token (Optional)
  
 + OK Response:

```json
{
  "items": [
    {
      "addressHtml": "_Long/marked string for store address_",
      "city": "_Store city_",
      "distance": "_Distance to store_",
      "id": "_Store id_",
      "latitude": "_Latitude cord of the store_",
      "longitude": "_Longitude cord of the store_",
      "name": "_Name of the store_",
      "region": "_Store region_",
      "retailer": {
        "availability": "_Retailer availability when filtered by promotion_",
        "logoUrl": "_Retailers url logo_",
        "promotionId": "_Promotion id when filtered by promotion_",
        "id": "_Retailer id_",
        "name": "_Retailer name_",
        "token": "_Retailer Token_"
      },
      "zipcode": "_Store Zip code_"
    }
  ],
  "more": "_Boolean for pagination_",
  "pageSize": "_Page items size_",
  "start": "_Start index_",
  "totalResults": "_Total results_"
}
```

+ Error Response:
HttpStatus + body with:
```json
{
  "errorId": "_Error status_",
  "errorCode": "_Error Response Code_",
  "errorMessage": "_Error Response Message_"
}
```

### Categories

Returns all categories and the number of active promotions for each category. 
Supports multiple languages, currently defaults to english (en_US) if requested language is not supported.

+ URL: [ENV]/publisher/{version}/categories/
+ Type: GET
+ Header:
  + dcoupon-authorization-apikey: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  
+ Parameters: 
   + country: "_Short country code (2 digits), according to ISO 3166-1 alpha-2. The publisher must be authorized to publish offers in this country._"
   + lang: "_Language to get category names_"
 
 + OK Response:

```json
{
  "totalResults": 1,
  "pageSize": 1,
  "start": 0,
  "items": [
    {
      "name": "Beverages",
      "id": 191919,
      "numActiveOffer": 150
    }
  ]
}
```

+ Error Response:
HttpStatus + body with:
```json
{
  "errorId": "_Error status_",
  "errorCode": "_Error Response Code_",
  "errorMessage": "_Error Response Message_"
}
```

### Companies

Returns all companies with active promotions and the number of active offers for each company. ONLY companies that have promotions published will be returned

+ URL: [ENV]/publisher/{version}/companies/
+ Type: GET
+ Header:
  + dcoupon-authorization-apikey: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  
+ Parameters: 
   + country: "_Short country code (2 digits), according to ISO 3166-1 alpha-2. The publisher must be authorized to publish offers in this country._"
   + start: "_Number of rows to skip before starting to return rows_" (Optional) (Default: 0)  
   + limit: "_Number of rows fetched_" (Optional)_"
  
 + OK Response:

```json
{
  "totalResults": 2,
  "pageSize": 10,
  "start": 0,
  "items": [
    {
      "name": "Company 1",
      "token": "Token#1",
      "activeOffersCount": 10
    },
    {
      "name": "Company 2",
      "token": "Token#2",
      "activeOffersCount": 12
    }
  ]
}
```

+ Error Response:
HttpStatus + body with:
```json
{
  "errorId": "_Error status_",
  "errorCode": "_Error Response Code_",
  "errorMessage": "_Error Response Message_"
}
```

### Transaction ID

Creates a new Transaction ID and associates it with a promotion ID

+ URL: [ENV]/publisher/{version}/transID/
+ Type: POST
+ Header:
  + dcoupon-authorization-apikey: client's API key
  + dcoupon-authorization-method: should always be 'SIGNATURE'
  + dcoupon-authorization-signature: request' signature, see below
  + dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"
  
+ Request body JSON schema: 
```json
{
    "$schema": "http://json-schema.org/draft-07/schema",
    "type": "object",
    "title": "Transaction ID request body",
    "description": "This schema describes the request body for the method transID method on publisher-api",
    "default": {},
    "required": [
        "publisherToken",
        "promotionToken"
    ],
    "properties": {
        "publisherToken": {
            "type": "string",
            "title": "A valid publisher token",
        },
        "promotionToken": {
            "type": "string",
            "title": "A valid promotion token"
        },
        "validFor": {
            "type": "integer",
            "title": "Days before the transaction ID expires",
            "description": "If this field is omitted, the transaction ID does not expires"
        }
    }
}
```

 + Request example:
```json
{
  "publisherToken": "9c000b77-f5ea-4301",
  "promotionToken": "b9ddea26f9f0",
  "validFor": 30
}
```

 + OK Response example:

```json
{
  "transIDValue": "9c000b77-f5ea-4301-877b-b9ddea26f9f0",
  "expirationDate": "2020-05-01"
}
```
_expirationDate_ is null if _validFor_ is not provided on request.

+ Error Response:
HttpStatus + body with:
```json
{
  "errorId": "_Error status_",
  "errorCode": "_Error Response Code_",
  "errorMessage": "_Error Response Message_"
}
```

+ Response Types for this method:

| HttpStatus | Description |
|----------------|:----------|
| 200 | "OK, transaction ID generated and returned in the json body" |
| 404 | "Publisher or promotion not found" |

## Response Codes:

+ Response types for methods included in this API:

| Response	 | Error Status | Error Code | Error Message |
|----------------|:----------:|:-------------:|-------------|
| INPUT ERROR | 400 | ERROR.INPUT.INVALID.FIELDS | Validation failed |
| UNAUTHORIZED |401 | ERROR.PERMISSION.UNAUTHORIZED | Unauthorized request |
| FORBBIDDEN | 403 | ERROR.PERMISSION.UNAUTHORIZED | Unauthorized request |
| INTERNAL SERVER ERROR | 500 | FATAL.SERVER.ERROR | Internal Server Error|

## Signing requests

All request must be signed using UTF-8 encoding and the HmacSHA256 algorithm. 

The string to sign should have the sollowing pattern:

```
<API_KEY>:<timestamp>
```

_timestamp_ should be in the form "yyyy-MM-dd'T'HH:mm:ssZ", and is the timestamp at the moment of the request.

The string must be signed using the client's secret provided by dcoupon.

## Environments

This API is available in different dcoupon environments, you will get credentials for each environment that you will need to use.

### Integration

This environment is available to develop and test your integration with dcoupon user coupons.

URL to use as [ENV] for this environment is https://services-dev.dcoupon.com/

## API method Version

The version of the api method to use must be provided {version} when making a call

Change Log

| Version | {version} | Launch Date | Available until |
|----------------|:----------:|:-------------:|-------------|
| Version 2.0 | v2 | 27th of May, 2020  | TBD|
