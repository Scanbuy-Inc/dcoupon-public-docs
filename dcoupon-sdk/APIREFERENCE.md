# DCOUPON SDK - API reference

## CLASSES

### Dcoupon
dcoupon SDK instance to call methods.
```kotlin
class Dcoupon()
```

---

### Dcoupon Callback
dcoupon callback to receive method responses as a code/message tuple or as a boolean in some methods.
```kotlin
interface DcouponCallback {
    fun result(code: Int, message: String)
}

interface DcouponBoolCallback {
    fun result(boolean: Boolean)
}
```

Callback example in one of the methods.

```kotlin
dcoupon.logIn(..., (code, message) -> {
                            //Your logic
                        });
```

---

## METHODS

### logIn
Third-party log in method.
```kotlin
fun logIn(
    externalId: String,
    referralCode: String?,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `externalId` | varchar(100) | String | ***true*** | User's id from your system.
| `referralCode` | varchar(200) | String | *false* | Referral code.
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | (String) | The user is logged, now the user can access to others methods(getCoupons(), getFilters(),...).
| 400 | (String) | Bad request, missing mandatory data (externalId).
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.


---

### logOut
Log out the user.
```kotlin
fun logOut()
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `callback` | (bool) -> {} | Function | ***true*** | dcoupon callback with boolean

#### Callback response
| (type) | description |
| --- | --- |
| (Boolean) | Returns true if the user is still logged in and false in any other case (not logged in, error).


---

### getUserData
Get the user data.
```kotlin
fun getUserData(
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.


#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#getuserdata-jsonobject) | Returns the user data.
| 403 | (String) | Forbidden, user is not active.
| 404 | (String) | Not found, the user is not found.
| 406 | (String) | Not acceptable, the user session token is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### updateUserData
Update the user data.
```kotlin
fun updateUserData(
    alias: String,
    gender: String,
    birthdate: String,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `alias` | varchar(90) | String | ***true*** | User's alias/name.
| `gender` | 'MALE', 'FEMALE', 'OTHER', 'RATHERNOTSAY' | String | ***true*** | User's gender.
| `birthdate` | 'YYYY-MM-dd' | String | ***true*** | User's date of birth.
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.


#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#updateuserdata-jsonobject) | Returns the user data.
| 403 | (String) | Forbidden, user is not active.
| 404 | (String) | Not found, the user is not found.
| 406 | (String) | Not acceptable, the user session token is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### unregisterUser
Delete the user account.
```kotlin
fun unregisterUser(
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.


#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | (String) | The user has been unregistered successfully.
| 404 | (String) | Not found, the user is not found.
| 406 | (String) | Session token for the user is not valid.
| 422 | (String) | Deleted entity, the user is already deleted.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---
### getCoupons
Get the list of user's coupons.
```kotlin
fun getCoupons(
    offset: Int?,
    limit: Int?,
    sortBy: String?,
    companyTokens: ArrayList<String>?,
    retailerTokens: ArrayList<String>?,
    callback: DcouponCallback
)
```
#### Input
| name | value | type | mandatory | description
| :--- | :---: | :---: | :---: | --- |
| `start` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Index of first store to be returned. 0 by default.
| `limit` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Maximum number of items to return. 10 by default.
| `sortBy` | 'NEWEST', 'ENDING', 'VALUE', 'DEFAULT' | String | *false* | How the result set is sorted.
| `companyTokens` | any | ArrayList<*String*> | *false* | Filter user coupons by this/these company/s.
| `retailerTokens` | any | ArrayList<*String*> | *false* | Filter user coupons by this/these retailer/s.
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

Sort By Options:
- **NEWEST** : coupons returned will be ordered from newest coupons to oldest created.
- **ENDING** : coupons returned will be ordered starting for those promotions closest to end its publication.
- **VALUE** : coupons returned will be ordered considering face value of the offer, from highest values to lowest.
- **DEFAULT** : (default) coupons returned will be ordered by the publication start date of the promotions.

#### Callback response
| code | (type) message | description
| --- | :---: | --- |
| 200 | [(JsonObject)](#getcoupons-jsonobject) | Returns a list of coupons.
| 403 | (String) | Forbidden, user is not active.
| 404 | (String) | Not found, the user is not found.
| 406 | (String) | Not acceptable, the user session token is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### getCouponDetail
Get the details of one coupon by the couponId.
```kotlin
fun getCouponDetail(
    couponId: Int,
    callback: DcouponCallback
)
```
#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `couponId` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | ***true*** | The identifier of the user's coupon.
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#getcoupondetail-jsonobject) | Returns the coupon detail.
| 202 | (String) | Accepted, coupon promotion not initiated or coupon promotion expired or coupon promotion state not valid.
| 403 | (String) | Forbidden, user is not active.
| 404 | (String) | Not found, the user is not found or the couponId does not exist or does not belong to the user.
| 406 | (String) | Not acceptable, the user session token is not valid or the couponId is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### activateCoupon
Set the activated status on a coupon.
```kotlin
fun activateCoupon(
    couponId: Int,
    callback: DcouponCallback
)
```
#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `couponId` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | ***true*** | The identifier of the user's coupon.
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#activatecoupon-jsonobject) | Coupon activated successfully.
| 202 | (String) | Accepted, coupon promotion not initiated or coupon promotion expired or coupon promotion state not valid.
| 403 | (String) | Forbidden, user is not active.
| 404 | (String) | Not found, the user is not found or the couponId does not exist or does not belong to the user.
| 406 | (String) | Not acceptable, the user session token is not valid or the couponId is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### deactivateCoupon
Set the deactivated status on a coupon.
```kotlin
fun deactivateCoupon(
    couponId: Int,
    callback: DcouponCallback
)
```
#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `couponId` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | ***true*** | The identifier of the user's coupon.
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#deactivatecoupon-jsonobject) | Coupon deactivated successfully.
| 202 | (String) | Accepted, coupon promotion not initiated or coupon promotion expired or coupon promotion state not valid.
| 403 | (String) | Forbidden, user is not active.
| 404 | (String) | Not found, the user is not found or the couponId does not exist or does not belong to the user.
| 406 | (String) | Not acceptable, the user session token is not valid or the couponId is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### createCoupons
Create multiple coupons by promotion tokens.
```kotlin
fun createCoupons(
    promotionTokens: ArrayList<String>,
    latitude: String?,
    longitude: String?,
    saveMethod: String?,
    utmSource: String?,
    transId: String?,
    crmId: String?,
    publisherToken: String,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `promotionTokens` | any | ArrayList<*String*> | ***true*** | Promotions tokens that identifies the promotions.
| `latitude` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninQ.gif) | String | *false* | User latitude coordinate.
| `longitude` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninQ.gif) | String | *false* | User longitude coordinate.
| `saveMethod` | varchar(100) | String | *false* | Save method (app business logic to save these coupons).
| `utmSource` | varchar(100) | String | *false* | UtmSource to identify the coupon.
| `transId` | varchar(50) | String | *false* | Transaction identifier if the promotion requires it.
| `crmId` | varchar(50) | String | *false* | The customer relationship management identifier.
| `publisherToken` | varchar | String | ***true*** | The client publisher token.
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#createcoupons-jsonobject) | Returns a list of each promotion result.
| 202 | (String) | Accepted, coupon promotion not initiated or coupon promotion expired or coupon promotion state not valid or user coupons max exceeded or coupons per promotion max exceeded or publisher campaign coupons max exceeded.
| 403 | (String) | Forbidden, user is not active.
| 404 | (String) | Not found, the user is not found or promotion/s not found or transId not found.
| 406 | (String) | Not acceptable, the user session token is not valid or transId is not valid or publisher is not valid or latitude/longitude not valid or one of the parameters is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### getCouponsCompanies
Get the list of companies for all active user's coupons.
```kotlin
fun getCouponsCompanies(
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#getCouponsCompanies-jsonobject) | Returns a list of each company result.
| 403 | (String) | Forbidden, user is not active.
| 404 | (String) | Not found, the user is not found.
| 406 | (String) | Not acceptable, the user session token is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### getCouponsRetailers
Get the list of retailers for all active user's coupons.
```kotlin
fun getCouponsRetailers(
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#getCouponsRetailers-jsonobject) | Returns a list of each retailer result.
| 403 | (String) | Forbidden, user is not active.
| 404 | (String) | Not found, the user is not found.
| 406 | (String) | Not acceptable, the user session token is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---


### getRedemptionCode
Get an available user's redemption code.
```kotlin
fun getRedemptionCode(
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#getredemptioncode-jsonobject) | Returns the temporal redemption code.
| 403 | (String) | Forbidden, user is not active.
| 404 | (String) | Not found, the user is not found.
| 406 | (String) | Not acceptable, the user session token is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### getRedemptionDetail
Return redemption detailed data for an active user and redemption id.
```kotlin
fun getRedemptionDetail(
    redemptionId: String,
    gmtTimeZoneOffset: Int,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `redemptionId` | any | String | ***true*** | The id that identifies this redemption.
| `gmtTimeZoneOffset` | any | int | ***true*** | The GMT timezone offset.
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#getRedemptionDetail-jsonobject) | Returns the redemption detail.
| 403 | (String) | Forbidden, user is not active.
| 404 | (String) | Not found, the user is not found.
| 406 | (String) | Not acceptable, the user session token is not valid or gmtTimeZoneOffset is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### getRedemptionSummary
Return redemption data for an active user grouped by date chunks.
```kotlin
fun getRedemptionSummary(
    groupBy: String,
    startDate: String?,
    endDate: String?,
    gmtTimeZoneOffset: Int,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `groupBy` | 'DAY', 'WEEK', 'MONTH', 'YEAR' | String | ***true*** | How the redemptions are grouped.
| `startDate` | 'YYYY-MM-dd' | String | *false* | Filter redemptions that are after this date.
| `endDate` | 'YYYY-MM-dd' | String | *false* | Filter redemptions that are before this date.
| `gmtTimeZoneOffset` | any | int | ***true*** | The GMT timezone offset.
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#getRedemptionSummary-jsonobject) | Returns the redemption summary data.
| 403 | (String) | Forbidden, user is not active.
| 404 | (String) | Not found, the user is not found.
| 406 | (String) | Not acceptable, the user session token is not valid or groupBy is not valid or gmtTimeZoneOffset is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### getRedemptionHistory
Return redemption history data for an active user.
```kotlin
fun getRedemptionHistory(
    limit: Int?,
    offset: Int?,
    startDate: String?,
    endDate: String?,
    gmtTimeZoneOffset: Int,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `start` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Index of first item to be returned.
| `limit` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Maximum number of items to return.
| `startDate` | 'YYYY-MM-dd' | String | *false* | Filter redemptions that are after this date.
| `endDate` | 'YYYY-MM-dd' | String | *false* | Filter redemptions that are before this date.
| `gmtTimeZoneOffset` | any | int | ***true*** | The GMT timezone offset.
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#getRedemptionHistory-jsonobject) | Returns the redemption history list.
| 403 | (String) | Forbidden, user is not active.
| 404 | (String) | Not found, the user is not found.
| 406 | (String) | Not acceptable, the user session token is not valid or gmtTimeZoneOffset is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### getLoyaltyAffiliates
Returns all available loyalty affiliates for the current country.
```kotlin
fun getLoyaltyAffiliates(
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#getLoyaltyAffiliates-jsonobject) | Returns the loyalty affiliates list.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### addUpdateLoyaltyCard
Update or add one loyalty card for an user.
```kotlin
fun addUpdateLoyaltyCard(
    affiliateApiToken: String,
    formData: Map<String, Any>,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `affiliateApiToken` | any | String | ***true*** | The affiliate token.
| `formData` | any | Map<String, Any> | ***true*** | The JSON Schema form data containing the card number.
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#addUpdateLoyaltyCard-jsonobject) | Card succesfully added/updated.
| 403 | (String) | Forbidden, user is not active.
| 404 | (String) | Not found, the user is not found.
| 406 | (String) | Not acceptable, the user session token is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### getLoyaltyCards
Returns basic data from all active loyalty cards for an user.
```kotlin
fun getLoyaltyCards(
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#getLoyaltyCards-jsonobject) | Returns the loyalty affiliates cards list for the user.
| 403 | (String) | Forbidden, user is not active.
| 404 | (String) | Not found, the user is not found.
| 406 | (String) | Not acceptable, the user session token is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### deleteLoyaltyCard
Delete one loyalty card for an user.
```kotlin
fun deleteLoyaltyCard(
    affiliateApiToken: String,
    cardNumber: String,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `affiliateApiToken` | any | String | ***true*** | The affiliate token.
| `cardNumber` | any | String | ***true*** | The card number.
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#deleteLoyaltyCard-jsonobject) | Card succesfully deleted.
| 403 | (String) | Forbidden, user is not active.
| 404 | (String) | Not found, the user is not found.
| 406 | (String) | Not acceptable, the user session token is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### getCategories
Returns all categories with active promotions associated to the publisher and the number of active offers for category.
```kotlin
fun getCategories(
    lang: String,
    publisherToken: String,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `lang` | varchar | String | ***true*** | The client publisher token.
| `publisherToken` | varchar | String | ***true*** | The client publisher token.
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#getCategories-jsonobject) | Returns the categories list.
| 401 | (String) | Bad request, user is not logged in.
| 403 | (String) | Forbidden, wrong publisher token.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

---

### getCompanies
Returns all companies with active promotions associated to the publisher and the number of active offers for category. **NOTE**: only those companies that have choose at least one of its promotions to be published using the publisher will be returned.
```kotlin
fun getCompanies(
    start: Int?,
    limit: Int?,
    publisherToken: String,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `start` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Index of first item to be returned.
| `limit` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Maximum number of items to return.
| `publisherToken` | varchar | String | ***true*** | The client publisher token.
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#getCompanies-jsonobject) | Returns the companies list.
| 401 | (String) | Bad request, user is not logged in.
| 403 | (String) | Forbidden, wrong publisher token.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

---

### getRetailers
Returns all retailers with active promotions associated to the publisher and the number of active offers for category.
```kotlin
fun getRetailers(
    start: Int?,
    limit: Int?,
    publisherToken: String,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `start` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Index of first item to be returned.
| `limit` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Maximum number of items to return.
| `publisherToken` | varchar | String | ***true*** | The client publisher token.
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#getRetailers-jsonobject) | Returns the retailers list.
| 401 | (String) | Bad request, user is not logged in.
| 403 | (String) | Forbidden, wrong publisher token.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

---

### getPromotions:
Returns all active promotions associated to the publisher token identified by the API token filtered with the parameters sent in the request.
```kotlin
fun getPromotions(
    start: Int?,
    limit: Int?,
    categoryIds: ArrayList<String>?,
    storeIds: ArrayList<String>?,
    retailerTokens: ArrayList<String>?,
    companyTokens: ArrayList<String>?,
    textSearch: String?,
    zipcode: String?,
    latitude: String?,
    longitude: String?,
    radius: String?,
    orderBy: String?,
    publisherToken: String,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `start` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Index of first item to be returned.
| `limit` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Maximum number of items to return.
| `categoryIds` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | ArrayList<*String*> | *false* | Filter offers from this/these category/ies.
| `storeIds` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | ArrayList<*String*> | *false* | Filter offers redeemable in those stores form the selected retailer.
| `retailerTokens` | any | ArrayList<*String*> | *false* | Filter offers redeemable in this/these retailer/s.
| `companyTokens` | any | ArrayList<*String*> | *false* | Filter offers by this/these company/s.
| `textSearch` | any | String | *false* | Text to search for into promotion name, promotion description and company owner of the promotions.
| `zipcode` | any | String | *false* | Zip code to filter the search.
| `latitude` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninQ.gif) | String | *false* | User latitude coordinate.
| `longitude` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninQ.gif) | String | *false* | User longitude coordinate.
| `radius` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | String | *false* | Radius to make the search for coupons available.
| `orderBy` | 'NEWEST', 'ENDING', 'VALUE', 'TOP' | String | *false* | How the result set is sorted.
| `publisherToken` | varchar | String | ***true*** | The client publisher token.

Order By Options:
- **NEWEST** : (default) promotions returned will be ordered from newest promotions to oldest.
- **ENDING** : promotions returned will be ordered starting for those promotions closest to end its publication.
- **VALUE** : promotions returned will be ordered considering face value of the offer, from highest values to lowest.
- **TOP** : promotions returned will be ordered starting for those promotions with a higher number of acquired coupons.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#getpromotions-jsonobject) | Returns a list of promotions.
| 401 | (String) | Unauthorized, the user is not logged.
| 403 | (String) | Forbidden, wrong publisher token.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

---

### getPromotionDetail
Get the details of a promotion by promotion token sent.
```kotlin
fun getPromotionDetail(
    promotionToken: String,
    publisherToken: String,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `promotionToken` | any | String | ***true*** | The token that identifies this promotion.
| `publisherToken` | varchar | String | ***true*** | The client publisher token.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#getpromotiondetail-jsonobject) | Returns the promotion detail.
| 401 | (String) | Unauthorized, the user is not logged.
| 403 | (String) | Forbidden, wrong publisher token.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

---

### getStores
Returns all active promotions associated to the publisher filtered with the parameters sent in the request, including a list of stores from the retailer. (Use promotionToken, can combine with retailerTokens).
```kotlin
    fun getStores(
        promotionToken: String?,
        start: Int?,
        limit: Int?,
        retailerTokens: ArrayList<String>?,
        zipcode: String?,
        latitude: String?,
        longitude: String?,
        radius: String?,
        publisherToken: String,
        callback: DcouponCallback
    )
```
#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `promotionToken` | any | String | *false* | The token that identifies the promotion.
| `start` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Index of first store to be returned. 0 by default.
| `limit` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Maximum number of items to return. 10 by default.
| `retailerTokens` | any | ArrayList<*String*> | *false* | Token from the retailer.
| `zipcode` | any | String | *false* | Zip code to filter the search.
| `latitude` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninQ.gif) | String | *false* | User latitude coordinate.
| `longitude` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninQ.gif) | String | *false* | User longitude coordinate.
| `radius` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | String | *false* | Radius to make the search for coupons available.
| `publisherToken` | varchar | String | ***true*** | The client publisher token.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | [(JsonObject)](#getstores-jsonobject) | Return a list of stores.
| 401 | (String) | Unauthorized, the user is not logged.
| 403 | (String) | Forbidden, wrong publisher token.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

---

## Methods Response Examples

### getUserData (JSONObject)
```json
{
	"alias": "_User_alias_",
	"gender": "_User_gender_",
	"birthdate": "YYYY-MM-DD",
	"email": "_User_email_"
}
```
---

### updateUserData (JSONObject)
```json
{
	"alias": "_alias_",
	"gender": "MALE | FEMALE | OTHER | RATHER_NOT_SAY",
	"birthdate": "YYYY-MM-DD"
}
```

---

### getCoupons (JSONObject)
```json
{
	"coupons":[{
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
		"promoDiscount":{
			"type": "_Discount type_",
			"amount": "_Discount amount_",
			"textToDisplay": "",
			"maxAmount": "_Discount amount_",
			"currency": "EUR|USD|MXN"
		}
	}],
	"discountTotal":{
	  "amount": "_Total discount amount of coupons in user wallet_",
	  "currency":"EUR|USD|MXN"
    },
	"totalCount": "_Total number of coupons in user wallet_"
}
```

---

### getCouponDetail (JSONObject)
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
	"promoDiscount":{
		"type": "_Discount type_",
		"amount": "_Discount amount_",
		"textToDisplay": "",
		"maxAmount": "_Discount amount_",
		"currency": "EUR|USD|MXN"
	}
}
```

---

### activateCoupon (JSONObject)
```json
{
	"code":"_dcoupon response code_",
 	"description":"_dcoupon response description_"
}
```

---

### deactivateCoupon (JSONObject)
```json
{
	"code":"_dcoupon response code_",
 	"description":"_dcoupon response description_"
}
```

---


### createCoupons (JSONObject)
```json
[
  {
    "apiToken":"_Promotion token_",
    "idCoupon":"_New created coupond id_",
    "coupon":"_Hash unique coupon identifier_",
    "response":{
      "code":"_dcoupon response code_",
      "description":"_dcoupon response description_"
    }
}
]
```

---

### getCouponsCompanies (JSONObject)
```json
[
	{
	"name":"Company Name_",
	"logo":"_URL for company logo_",
	"token":"_Company api token_"
	}
]
```

---

### getCouponsRetailers (JSONObject)
```json
[
	 {
	  "retailerName":"_Retailer Name_",
	  "retailerLogo":"_URL for retailer logo_",
	  "retailerToken":"_Retailer api token_"
	  }
]
```

---

### getRedemptionCode (JSONObject)
```json
{
 "temporalToken": "_temporal Token_",
}
```

---

### getRedemptionDetail (JSONObject)
```json
{
  "redemptionInfo": {
    "id": "internal_redemption_id",
    "date": "yyyy-MM-dd",
    "discount":{
      "amount": "_amount_rewarded_",
      "currency": "EUR|USD|MXN"
    },
    "couponsCount": "_coupons_count_",
    "retailerNameImg": {
      "retailerName": "_retailer_name_",
      "retailerLogo": "_retailer_logo_path_",
      "retailerToken": "_retailer_api_token_"
    },
    "couponsRedeemedList": [
      {
        "serial": "_coupon_serial_number",
        "promotionName": "_promotion_name_",
        "redeemedAmount": "_amount_rewarded_",
        "stampsBurnt": "_stamps_burnt_",
        "gcn": "_coupon_gcn_"
      }
    ]
  }
}
```

---

### getRedemptionSummary (JSONObject)
```json
[
	{
		"discount":{
		  "amount": "_total_amount_rewarded__",
		  "currency": "EUR|USD|MXN"
		},
		"id_label": "_day_of_redemptions_",
		"year": "_year_of_redemptions_",
		"initialDate": "YYYY-MM-DD HH:MM:SS",
		"endDate": "YYYY-MM-DD HH:MM:SS"
	}
]
```

---

### getRedemptionHistory (JSONObject)
```json
{
	"redemptions": [
		{
			"id": "_redemption_id_codified_in_base64_",
			"date": "YYYY-MM-DD",
			"discount":{
			  "amount": "_amount_rewarded_",
			  "currency": "EUR|USD|MXN"
			},
			"couponsCount": "_coupons_count_",
			"retailerNameImg": {
				"retailerName": "_retailer_name_",
				"retailerLogo": "_retailer_logo_path_",
				"retailerToken": "_retailer_api_token_"
			}
		}
	],
	"totalDiscount": "_Total discount history_",
	"totalCount": "_Total coupons redeemed history_"
}
```

---

### getLoyaltyAffiliates (JSONObject)
```json
[
	{
		"id": "_internal_id_affiliate",
		"name": "_affiliate_name_",
		"affiliateLogoPath": "_affiliate_logo_path_",
		"countryCode": "_country_short_codename_",
		"apiTokenAffiliate": "_affiliate_api_token_",
		"retailerNameImg": [{
		    "retailerName": "_retailer_name_",
		    "retailerLogo": "_retailer_logo_path_",
		    "retailerToken": "_retailer_api_token_"
	   }],
	   "jsonSchema": "_jsonSchema to the front-end to create a dynamic form_"
	}
]
```

---

### addUpdateLoyaltyCard (JSONObject)
```json
{
	"code": "_Internal Ok Response Code_",
	"description": "_Operation description_"
}
```

---

### getLoyaltyCards (JSONObject)
```json
[
	{
		"apiTokenAffiliate": "_affiliate_api_token_",
		"cardNumber": "_card_number_"
	}
]
```

---

### deleteLoyaltyCard (JSONObject)
```json
{
	"code": "_Internal Ok Response Code_",
	"description": "_Operation description_"
}
```

---

### getCategories (JSONObject)
```json
{
  "items": [
    {
      "id": "_Category Id_",
      "name": "_Translate category name_",
      "numActiveOffers": "_Number of active offers for this category_"
    }
  ],
  "pageSize": "_Page size_",
  "start": "_Start index",
  "totalResults": "_Total results_"
}
```

---

### getCompanies (JSONObject)
```json
{
  "items": [
    {
      "name": "_Company name_",
      "numActiveOffers": "_Number of active offers for this company_",
      "token": "_Company token_"
    }
  ],
  "pageSize": "_Page size_",
  "start": "_Start index_",
  "totalResults": "_Total results_"
}
```

---

### getRetailers (JSONObject)
```json
{
  "items": [
    {
      "token": "_Retailer api token_",
      "logoUrl": "_Retailer url logo_",
      "name": "_Retailer name_",
      "offerCount": "_Total offers count_"
    }
  ],
  "pageSize": "_Page items size_",
  "start": "_Start index_",
  "totalResults": "_Total results_"
}
```

---

### getPromotions (JSONObject)
```json
{
  "totalDiscount":  {
	"amount": "_Total sum of max promotion discount: Calculated by promoDiscount * maxUsesPerTx * maxCouponsPerUser_",
	"currency": "_Currency for promotion by country related company_",
	},
  "items": [
    {
        "bigImageUrl": "_1st Big image for promotion_",
		  "bigImageUrl2": "_2nd Big image for promotion_",
		  "couponType": "Promotion type id_",
		  "description": "_Promotion description_",
		  "promotionDiscount": {
		    "amount": "_Promotion discount_",
		    "currency": "_Currency for promotion by country related company_",
		    "maxAmount": "_Max amount to discount_",
		    "type": "_FIXED|PERCENTAGE_",
		    "textToDisplay": "_Promotion text for display_"
			},
	  "id": "_Promotion id_",
	  "isTransactionIdRequired": "_Boolean for transaction requirement_",
	  "name": "_Promotion name_",
	  "publishingEndDate": "_Promotion publisher end date_",
	  "redemptionEndDate": "_Redempetion end date_",
	  "redemptionStartDate": "_Redemption start date_",
	  "retailers": [
   		 {
	      	"logoUrl": "_Retailer url logo_",
   	   		"name": "_Retailer Name_",
      		"token": "_Retailer Token_",
     	 	"validInAllStores": "_Boolean for geo promotion type_"
	    }
  	  ],
	  "smallImageUrl": "_Small image for promotion_",
	  "termsAndConditions": "_Promotion terms and conditions_",
	  "token": "_Promotion token_",
	  "url": "_Promotion url_",
	  "maxUsesPerTx": "_Max uses per transaction_",
     "maxCoponsPerUser": "_Max coupons per user_"
    }
  ],
  "more": "_Boolean for pagination_",
  "pageSize": "_Page items size_",
  "start": "_Start index_",
  "totalResults": "_Total results_"
}
```

---

### getPromotionDetail (JSONObject)
```json
{
  "bigImageUrl": "_1st Big image for promotion_",
  "bigImageUrl2": "_2nd Big image for promotion_",
  "couponType": "Promotion type id_",
  "description": "_Promotion description_",
  "promotionDiscount": {
    "amount": "_Promotion discount_",
    "currency": "_Currency for promotion by country related company_",
    "maxAmount": "_Max amount to discount_",
    "type": "_FIXED|PERCENTAGE_",
    "textToDisplay": "_Promotion text for display_"
  },
  "id": "_Promotion id_",
  "isTransactionIdRequired": "_Boolean for transaction requirement_",
  "name": "_Promotion name_",
  "publishingEndDate": "_Promotion publisher end date_",
  "redemptionEndDate": "_Redempetion end date_",
  "redemptionStartDate": "_Redemption start date_",
  "retailers": [
    {
      "logoUrl": "_Retailer url logo_",
      "name": "_Retailer Name_",
      "token": "_Retailer Token_",
      "validInAllStores": "_Boolean for geo promotion type_"
    }
  ],
  "smallImageUrl": "_Small image for promotion_",
  "termsAndConditions": "_Promotion terms and conditions_",
  "token": "_Promotion token_",
  "url": "_Promotion url_"
}
```

---

#### getStores (JSONObject)
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