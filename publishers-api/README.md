![Logo](https://s3.amazonaws.com/dcoupon.com/sdk/docs/dcouponLogo.png)

# dcoupon Publishers API

Version 2.0 (May 2020)

## Introduction

This API enable to work with dcoupon promotions, this API allows to list available promotions, access to promotion details and access to available filters

All requests must be signed with a secret, which is provided by dcoupon.

## Methods:

### Promotions

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
  + storeIds: "_Filter offers redeemable in those stores form the selected retailer"
  + textSearch: "_Text to search for into promotion name, promotion description and company owner of the promotions_"
  + companyTokens: "_Filter offers from this/these company/ies_"
  + longitude: "_User longitude coordinate (DD format)_"
  + latitude:"_User latitude coordinate (DD format)_"
  + radius: "_Radius to make the search for coupons available_ *FR incluir unidad de medida"
  + zipcode: "_Zip code to filter the search_ *FR validar que funciona"
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

### Retailers

### Stores

### Categories

### Companies

