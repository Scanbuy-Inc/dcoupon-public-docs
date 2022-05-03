# DCOUPON SDK - API reference

## CLASSES

### Dcoupon
dcoupon SDK instance to call methods.
```kotlin
class Dcoupon(context: Context)
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
#### Log In flow chart
![login-diagram](https://s3.amazonaws.com/dcoupon.com/sdk/docs/loginflowchart.png?raw=true)


#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `externalId` | varchar(100) | String | ***true*** | User's id from your system.
| `email` | varchar(200) | String | *false* | User's email.
| `callback` | (code, message) -> {} | Function | ***true*** | dcoupon callback with code and message.

#### Callback response
| code | (type) message | description |
| --- | :---: | --- |
| 200 | (String) | The user is logged, now the user can access to others methods(getCoupons(), getFilters(),...).
| 301 | (String) | A form view is showed, the user must accept the legal documents.
| 400 | (String) | Bad request, missing mandatory data (externalId).
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

**logIn -> Special case:** load the enrollment view because there are mandatory legal texts that need to be accepted by the user.

To log out the user, the method **logOut** will do it.
```kotlin
fun logOut()
```

---

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `callback` | (bool) -> {} | Function | ***true*** | dcoupon callback with boolean

#### Callback response
| (type) | description |
| --- | --- |
| (Boolean) | Returns true if the user is still logged in and false in any other case (not logged in, error).

---

### logOut
Log out the user.
```kotlin
fun logOut()
```

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
    alias: String?,
    gender: String?,
    birthdate: String?,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `alias` | varchar(90) | String | *false* | User's alias/name.
| `gender` | 'MALE', 'FEMALE', 'OTHER', 'RATHERNOTSAY' | String | *false* | User's gender.
| `birthdate` | 'YYYY-MM-dd' | String | *false* | User's date of birth.
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
    publisherToken: String?,
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
| `publisherToken` | varchar | String | *false* | The client publisher token.
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
    gmtTimeZoneOffset: Int?,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `redemptionId` | any | String | ***true*** | The id that identifies this redemption.
| `gmtTimeZoneOffset` | any | int | *false* | The GMT timezone offset. Default to 0.
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
    gmtTimeZoneOffset: Int?,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `groupBy` | 'DAY', 'WEEK', 'MONTH', 'YEAR' | String | ***true*** | How the redemptions are grouped.
| `startDate` | 'YYYY-MM-dd' | String | *false* | Filter redemptions that are after this date.
| `endDate` | 'YYYY-MM-dd' | String | *false* | Filter redemptions that are before this date.
| `gmtTimeZoneOffset` | any | int | *false* | The GMT timezone offset. Default to 0.
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
    gmtTimeZoneOffset: Int?,
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
| `gmtTimeZoneOffset` | any | int | *false* | The GMT timezone offset. Default to 0.
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
    publisherToken: String?,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `publisherToken` | varchar | String | *false* | The client publisher token.
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
    publisherToken: String?,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `start` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Index of first item to be returned.
| `limit` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Maximum number of items to return.
| `publisherToken` | varchar | String | *false* | The client publisher token.
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
    publisherToken: String?,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `start` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Index of first item to be returned.
| `limit` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Maximum number of items to return.
| `publisherToken` | varchar | String | *false* | The client publisher token.
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
Returns all active promotions associated to the publisher tokenentified by the API token filtered with the parameters sent in the request.
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
    publisherToken: String?,
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
| `publisherToken` | varchar | String | *false* | The client publisher token.

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
    publisherToken: String?,
    callback: DcouponCallback
)
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `promotionToken` | any | String | ***true*** | The token that identifies this promotion.
| `publisherToken` | varchar | String | *false* | The client publisher token.

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
        promotionToken: String,
        start: Int?,
        limit: Int?,
        retailerTokens: ArrayList<String>?,
        zipcode: String?,
        latitude: String?,
        longitude: String?,
        radius: String?,
        publisherToken: String?,
        callback: DcouponCallback
    )
```
#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `promotionToken` | any | String | ***true*** | The token that identifies the promotion.
| `start` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Index of first store to be returned. 0 by default.
| `limit` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Maximum number of items to return. 10 by default.
| `retailerTokens` | any | ArrayList<*String*> | *false* | Token from the retailer.
| `zipcode` | any | String | *false* | Zip code to filter the search.
| `latitude` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninQ.gif) | String | *false* | User latitude coordinate.
| `longitude` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninQ.gif) | String | *false* | User longitude coordinate.
| `radius` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | String | *false* | Radius to make the search for coupons available.
| `publisherToken` | varchar | String | *false* | The client publisher token.

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
- Response code 200:
```json
{
    "alias": "John Doe",
	"gender": "MALE",
	"birthdate": "1990-12-31",
	"email": "john@doe.com"
}
```
---

### updateUserData (JSONObject)
- Response code 200:
```json
{
  "code":0,
  "description":"Command executed successfully"
}
```

---

### getCoupons (JSONObject)
- Response code 200:
```json
{
	"coupons":[
        { 
            "couponId":15949,
            "mcToken":"xxxxxxxxxxxxxxxxxx",
            "lowImage":"",
            "highImage":"",
            "highImage2":"",
            "name":"CP041",
            "description":"Sello de compra para artículo 2000000000090<br>",
            "offerRedemptionStartDate":"2019-01-21T17:59:00Z",
            "offerRedemptionEndDate":"2020-12-31T22:59:59Z",
            "status":true,
            "retailerNameImg":[
            {
                "retailerName":"ScanLife Demo",
                "retailerLogo":"https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
                "retailerToken":"xxxxxxxxxxxxxxxxxx"
            }
            ],
            "sgcn":"TESTCMP00108334",
            "canBeRedeemed":true,
            "termsAndConditions":"",
            "rewardedItems":[
            {
                "idRewardedItems":749,
                "idMcoupon":347,
                "itemId":"2000000000090",
                "rewardedItemQuantity":1
            }
            ],
            "promotionType":2,
            "totalStampsBurnt":0,
            "maxStamps":1,
            "stampsBurnt":{
            "redemption":[

            ]
            },
            "discount":{
            "discountType":"PERCENTAGE",
            "amount":"0.0%"
            },
            "genericResponse":null
        },
        {
            "couponId":15948,
            "mcToken":"xxxxxxxxxxxxxxxxxx",
            "lowImage":"",
            "highImage":"",
            "highImage2":"",
            "name":"CP039",
            "description":"<div>3% de descuento en los artículos A, G, H. Limitado a máximo 10 productos</div><div>Máximo a descontar 1,5 €</div><div>10 usos por transacción </div>",
            "offerRedemptionStartDate":"2018-11-20T11:25:00Z",
            "offerRedemptionEndDate":"2019-12-31T22:59:59Z",
            "status":true,
            "retailerNameImg":[
            {
                "retailerName":"ScanLife Demo",
                "retailerLogo":"https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
                "retailerToken":"xxxxxxxxxxxxxxxxxx"
            }
            ],
            "sgcn":"TESTCMP001052106",
            "canBeRedeemed":true,
            "termsAndConditions":"",
            "rewardedItems":[
            {
                "idRewardedItems":733,
                "idMcoupon":336,
                "itemId":"2000000000084",
                "rewardedItemQuantity":1
            },
            {
                "idRewardedItems":734,
                "idMcoupon":336,
                "itemId":"2000000000077",
                "rewardedItemQuantity":1
            },
            {
                "idRewardedItems":735,
                "idMcoupon":336,
                "itemId":"2000000000015",
                "rewardedItemQuantity":1
            }
            ],
            "promotionType":1,
            "totalStampsBurnt":0,
            "maxStamps":1,
            "stampsBurnt":{
            "redemption":[

            ]
            },
            "discount":{
            "discountType":"PERCENTAGE",
            "amount":"3.0 %"
            },
            "genericResponse":null
        },
        {
            "couponId":15940,
            "mcToken":"xxxxxxxxxxxxxxxxxx",
            "lowImage":"https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/promos/img_83_1512639655944.jpg",
            "highImage":"https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/promos/img_83_1512639520657.png",
            "highImage2":"",
            "name":"CP036",
            "description":"1,56€ de descuento al comprar artículos de L o por la compra de 2 artículos de K<br>2 usos por transacción.<br><br>",
            "offerRedemptionStartDate":"2017-12-07T09:55:00Z",
            "offerRedemptionEndDate":"2019-12-31T22:59:59Z",
            "status":true,
            "retailerNameImg":[
            {
                "retailerName":"GADIS",
                "retailerLogo":"https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/mcp_img1460370674807.png",
                "retailerToken":"xxxxxxxxxxxxxxxxxx"
            },
            {
                "retailerName":"ScanLife Demo",
                "retailerLogo":"https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
                "retailerToken":"xxxxxxxxxxxxxxxxxx"
            }
            ],
            "sgcn":"IDCMP000901360",
            "canBeRedeemed":true,
            "termsAndConditions":"",
            "rewardedItems":[
            {
                "idRewardedItems":585,
                "idMcoupon":285,
                "itemId":"2000100003305",
                "rewardedItemQuantity":4
            },
            {
                "idRewardedItems":586,
                "idMcoupon":285,
                "itemId":"2000100003213",
                "rewardedItemQuantity":2
            }
            ],
            "promotionType":1,
            "totalStampsBurnt":0,
            "maxStamps":1,
            "stampsBurnt":{
            "redemption":[

            ]
            },
            "discount":{
            "discountType":"FIXED",
            "amount":"EUR1.56"
            },
            "genericResponse":null
        }
    ],
	"totalDiscount":"EUR3.06",
    "totalCount":3
}
```

---

### getCouponDetail (JSONObject)
- Response code 200:
```json
{
   "couponId":15940,
   "mcToken":"xxxxxxxxxxxxxxxxxx",
   "lowImage":"https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/promos/img_83_1512639655944.jpg",
   "highImage":"https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/promos/img_83_1512639520657.png",
   "highImage2":"",
   "name":"CP036",
   "description":"1,56€ de descuento al comprar 4 artículos de L o por la compra de 2 artículos de K<br>2 usos por transacción.<br><br>",
   "offerRedemptionStartDate":"2017-12-07T09:55:00Z",
   "offerRedemptionEndDate":"2019-12-31T22:59:59Z",
   "status":false,
   "retailerNameImg":[
      {
         "retailerName":"GADIS",
         "retailerLogo":"https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/mcp_img1460370674807.png",
         "retailerToken":"xxxxxxxxxxxxxxxxxx"
      },
      {
         "retailerName":"ScanLife Demo",
         "retailerLogo":"https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
         "retailerToken":"xxxxxxxxxxxxxxxxxx"
      }
   ],
   "sgcn":"IDCMP000901360",
   "canBeRedeemed":true,
   "termsAndConditions":"",
   "rewardedItems":[
      {
         "idRewardedItems":585,
         "idMcoupon":285,
         "itemId":"2000100003305",
         "rewardedItemQuantity":4
      },
      {
         "idRewardedItems":586,
         "idMcoupon":285,
         "itemId":"2000100003213",
         "rewardedItemQuantity":2
      }
   ],
   "promotionType":1,
   "totalStampsBurnt":0,
   "maxStamps":1,
   "stampsBurnt":{
      "redemption":[

      ]
   },
   "discount":{
      "discountType":"FIXED",
      "amount":"EUR1.56"
   }
}
```

---

### activateCoupon (JSONObject)
- Response code 200:
```json
{
  "code":0,
  "description":"Command executed successfully"
}
```

---

### deactivateCoupon (JSONObject)
- Response code 200:
```json
{
  "code":0,
  "description":"Command executed successfully"
}
```

---


### createCoupons (JSONObject)
- Response code 200:
```json
[
  {
    "apiToken": "xxxxxxxxxxxxxxxxxx",
    "idCoupon": 214725,
    "coupon": "ZjE49y0X7Luj1cl_SE9xEhUDuVprWIiloxzw76AmTTI=",
    "response": {
      "code": 0,
      "description": "Command executed successfully"
    }
  }
]
```

---

### getCouponsCompanies (JSONObject)
- Response code 200:
```json
[
  {
    "name": "Scanbuy Demo",
    "token": "xxxxxxxxxxxxxxxxxx",
    "logo": "https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/promos/mcp_img1435738789745.png"
  },
  {
    "name": "Company Test Integracion",
    "token": "xxxxxxxxxxxxxxxxxx",
    "logo": "https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/companies/img_1560332543256.png"
  }
]
```

---

### getCouponsRetailers (JSONObject)
- Response code 200:
```json
[
  {
    "retailerName": "ScanLife Demo",
    "retailerLogo": "https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1579625831118.png",
    "retailerToken": "xxxxxxxxxxxxxxxxxx"
  },
  {
    "retailerName": "7-eleven",
    "retailerLogo": "https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1529915570305.png",
    "retailerToken": "xxxxxxxxxxxxxxxxxx"
  },
  {
    "retailerName": "dcoupon demo",
    "retailerLogo": "https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1580813574943.png",
    "retailerToken": "xxxxxxxxxxxxxxxxxx"
  }
]
```

---

### getRedemptionCode (JSONObject)
- Response code 200:
```json
{
 "temporalToken": "14926",
}
```

---

### getRedemptionDetail (JSONObject)
- Response code 200:
```json
{
  "redemptionInfo": {
    "id": "13362020-09-02 18:28:33.80590032d53-975b-4634-8dc8-b1f533aea778",
    "date": "2020-09-02",
    "amount": 2.7,
    "couponsCount": 1,
    "retailerNameImg": {
      "retailerName": "ScanLife Demo",
      "retailerLogo": "https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1579625831118.png",
      "retailerToken": "xxxxxxxxxxxxxxxxxx"
    }
  },
  "couponsRedeemedList": [
    {
      "serial": 5423,
      "promotionName": "CP034",
      "redeemedAmount": 2.7,
      "stampsBurnt": 1,
      "gcn": "IDCMP000765"
    }
  ]
}
```

---

### getRedemptionSummary (JSONObject)
- Response code 200:
```json
[
  {
    "redemptionAmount": 189081.04,
    "id_label": "2019",
    "year": 2019,
    "initialDate": "2019-02-01 13:13:52",
    "endDate": "2019-12-23 15:41:38"
  },
  {
    "redemptionAmount": 221969.08,
    "id_label": "2020",
    "year": 2020,
    "initialDate": "2020-01-01 01:00:00",
    "endDate": "2020-09-02 18:28:34"
  }
]
```

---

### getRedemptionHistory (JSONObject)
- Response code 200:
```json
{
  "redemptions": [
    {
      "id": "cBr_ZcVjuUg6ToLGvxXwhKxtzTt_4WcQB-XJ4l-Qh8Zwp6RahzG4Pkld6ibYDBDAMe6Vi6M-3zM0fPvQyPSTJg==",
      "date": "2020-09-02",
      "amount": 2.7,
      "couponsCount": 1,
      "retailerNameImg": {
        "retailerName": "ScanLife Demo",
        "retailerLogo": "https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1579625831118.png",
        "retailerToken": "xxxxxxxxxxxxxxxxxx"
      }
    }
  ],
  "totalDiscount": "411.050,12 €",
  "totalCount": 64016
}
```

---

### getLoyaltyAffiliates (JSONObject)
- Response code 200:
```json
[
  {
    "id": 1,
    "name": "Fidelizacion Supermercado Gadisa",
    "affiliateLogoPath": "https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/loyalties/mcp_img1446549650592.png",
    "countryCode": "ES",
    "apiTokenAffiliate": "xxxxxxxxxxxxxxxxxx"
  },
  {
    "id": 2,
    "name": "Carrefour",
    "affiliateLogoPath": "https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/loyalties/mcp_img1446549664991.png",
    "countryCode": "ES",
    "apiTokenAffiliate": "xxxxxxxxxxxxxxxxxx"
  },
  {
    "id": 3,
    "name": "Scanlife Demo",
    "affiliateLogoPath": "https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/loyalties/mcp_img1444730430643.png",
    "countryCode": "ES",
    "apiTokenAffiliate": "xxxxxxxxxxxxxxxxxx"
  },
  {
    "id": 5,
    "name": "Travel Club",
    "affiliateLogoPath": "https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/loyalties/mcp_img1446549751766.png",
    "countryCode": "ES",
    "apiTokenAffiliate": "xxxxxxxxxxxxxxxxxx"
  }
]
```

---

### addUpdateLoyaltyCard (JSONObject)
- Response code 200:
```json
{
  "code":0,
  "description":"Command executed successfully"
}
```

---

### getLoyaltyCards (JSONObject)
- Response code 200:
```json
[
  {
    "apiTokenAffiliate": "xxxxxxxxxxxxxxxxxx",
    "cardNumber": "66666666"
  }
]
```

---

### deleteLoyaltyCard (JSONObject)
- Response code 200:
```json
{
  "code":0,
  "description":"Command executed successfully"
}
```

---

### getCategories (JSONObject)
- Response code 200:
```json
{
    "totalResults":4,
    "pageSize":4,
    "start":0,
    "items":[
        {
            "id":5,
            "name":"Personal care",
            "numActiveOffers":1
        },
        {
            "id":4,
            "name":"Home",
            "numActiveOffers":1
        },
        {
            "id":1,
            "name":"Food",
            "numActiveOffers":41
        },
        {
            "id":2,
            "name":"Clothes",
            "numActiveOffers":1
        }
    ]
}
```

---

### getCompanies (JSONObject)
- Response code 200:
```json
{
    "totalResults":3,
    "pageSize":10,
    "start":0,
    "items":[
        {
            "name":"Company Test SDK",
            "token":"nxxxxxxxxxxxxxxxxxx",
            "numActiveOffers":41
        },
        {
            "name":"Scanbuy  Demo",
            "token":"xxxxxxxxxxxxxxxxxx",
            "numActiveOffers":2
        },
        {
            "name":"Scanbuy-Test",
            "token":"xxxxxxxxxxxxxxxxxx",
            "numActiveOffers":1
        }
    ]
}
```

---

### getRetailers (JSONObject)
- Response code 200:
```json
{
    "totalResults":3,
    "pageSize":10,
    "start":0,
    "items":[
        {
            "name":"GADIS",
            "token":"xxxxxxxxxxxxxxxxxx",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/mcp_img1460370674807.png",
            "numActiveOffers":16
        },
        {
            "name":"Leroy Merlín",
            "token":"xxxxxxxxxxxxxxxxxx",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1489422491901.png",
            "numActiveOffers":1
        },
        {
            "name":"ScanLife Demo",
            "token":"xxxxxxxxxxxxxxxxxx",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
            "numActiveOffers":43
        }
    ]
}
```

---

### getPromotions (JSONObject)
- Response code 200:
```json
{
   "totalResults":44,
   "pageSize":3,
   "start":0,
   "more":true,
   "filterTotalDiscount":"EUR151.82",
   "items":[
      {
         "id":347,
         "name":"CP041",
         "token":"xxxxxxxxxxxxxxxxxx",
         "couponType":2,
         "smallImageUrl":"",
         "bigImageUrl":"",
         "bigImageUrl2":"",
         "description":"Sello de compra para artículo 2000000000090<br>",
         "discount":{
            "promoType":"PERCENTAGE",
            "amount":"0.00%",
            "maxAmtToDiscount":"EUR0.00"
         },
         "redemptionStartDate":"2019-01-21 17:59:00",
         "redemptionEndDate":"2020-12-31 22:59:59",
         "publishingEndDate":"2020-12-31 22:59:59",
         "isTransactionIdRequired":false,
         "retailers":[
            {
               "name":"ScanLife Demo",
               "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
               "token":"xxxxxxxxxxxxxxxxxx",
               "validInAllStores":true
            }
         ]
      },
      {
         "id":336,
         "name":"CP039",
         "token":"xxxxxxxxxxxxxxxxxx",
         "couponType":1,
         "smallImageUrl":"",
         "bigImageUrl":"",
         "bigImageUrl2":"",
         "description":"<div>3% de descuento en los artículos A, G, H. Limitado a máximo 10 productos</div><div>Máximo a descontar 1,5 €</div><div>10 usos por transacción </div>",
         "discount":{
            "promoType":"PERCENTAGE",
            "amount":"3.00%",
            "maxAmtToDiscount":"EUR1.50"
         },
         "redemptionStartDate":"2018-11-20 11:25:00",
         "redemptionEndDate":"2019-12-31 22:59:59",
         "publishingEndDate":"2019-12-31 22:59:59",
         "isTransactionIdRequired":false,
         "retailers":[
            {
               "name":"ScanLife Demo",
               "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
               "token":"xxxxxxxxxxxxxxxxxx",
               "validInAllStores":true
            }
         ]
      },
      {
         "id":335,
         "name":"CP038",
         "token":"xxxxxxxxxxxxxxxxxx",
         "couponType":1,
         "smallImageUrl":"",
         "bigImageUrl":"",
         "bigImageUrl2":"",
         "description":"<div>Descuento del 20% al comprar 3 artículos A o 2 artículos B o 1 artículo de C. <br></div><div>Importe máximo a descontar 9€</div><div>4 usos por transacción<br></div>",
         "discount":{
            "promoType":"PERCENTAGE",
            "amount":"20.00%",
            "maxAmtToDiscount":"EUR9.00"
         },
         "redemptionStartDate":"2018-11-20 11:20:00",
         "redemptionEndDate":"2019-12-31 22:59:59",
         "publishingEndDate":"2019-12-31 22:59:59",
         "isTransactionIdRequired":false,
         "retailers":[
            {
               "name":"ScanLife Demo",
               "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
               "token":"xxxxxxxxxxxxxxxxxx",
               "validInAllStores":true
            }
         ]
      }
   ]
}
```

---

### getPromotionDetail (JSONObject)
- Response code 200:
```json
{
   "id":347,
   "name":"CP041",
   "token":"xxxxxxxxxxxxxxxxxx",
   "couponType":2,
   "smallImageUrl":"",
   "bigImageUrl":"",
   "bigImageUrl2":"",
   "description":"Sello de compra para artículo 2000000000090<br>",
   "discount":{
      "promoType":"PERCENTAGE",
      "amount":"0.00%",
      "maxAmtToDiscount":"EUR0.00"
   },
   "redemptionStartDate":"2019-01-21 17:59:00",
   "redemptionEndDate":"2020-12-31 22:59:59",
   "publishingEndDate":"2020-12-31 22:59:59",
   "isTransactionIdRequired":false,
   "retailers":[
      {
         "name":"ScanLife Demo",
         "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
         "token":"xxxxxxxxxxxxxxxxxx",
         "validInAllStores":true
      }
   ]
}
```

---

#### getStores (JSONObject)
- Response code 200:
```json
{
   "totalResults":20,
   "pageSize":10,
   "start":0,
   "more":true,
   "items":[
      {
         "id":76,
         "name":"Tienda 100",
         "longitude":"-1.3",
         "latitude":"41.6",
         "zipcode":"28001",
         "city":"Madrid",
         "region":"Madrid",
         "addressHtml":"<strong>HTML address 100</strong>",
         "retailer":{
            "name":"ScanLife Demo",
            "token":"xxxxxxxxxxxxxxxxxx",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
            "numActiveOffers":44
         },
         "distance":395.0137
      },
      {
         "id":77,
         "name":"Tienda 101",
         "longitude":"-1.4",
         "latitude":"42.6",
         "zipcode":"28001",
         "city":"Madrid",
         "region":"Madrid",
         "addressHtml":"<strong>HTML address 101</strong>",
         "retailer":{
            "name":"ScanLife Demo",
            "token":"xxxxxxxxxxxxxxxxxx",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
            "numActiveOffers":44
         },
         "distance":425.8518
      },
      {
         "id":83,
         "name":"Tienda 107",
         "longitude":"-2.1",
         "latitude":"41.65",
         "zipcode":"28001",
         "city":"Madrid",
         "region":"Madrid",
         "addressHtml":"<strong>HTML address 107</strong>",
         "retailer":{
            "name":"ScanLife Demo",
            "token":"xxxxxxxxxxxxxxxxxx",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
            "numActiveOffers":44
         },
         "distance":461.6452
      },
      {
         "id":78,
         "name":"Tienda 102",
         "longitude":"-1.5",
         "latitude":"43.6",
         "zipcode":"28002",
         "city":"Bilbao",
         "region":"Madrid",
         "addressHtml":"<strong>HTML address 102</strong>",
         "retailer":{
            "name":"ScanLife Demo",
            "token":"xxxxxxxxxxxxxxxxxx",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
            "numActiveOffers":44
         },
         "distance":480.8531
      },
      {
         "id":84,
         "name":"Tienda 108",
         "longitude":"-2.2",
         "latitude":"42.6",
         "zipcode":"28001",
         "city":"Barcelona",
         "region":"Madrid",
         "addressHtml":"<strong>HTML address 108</strong>",
         "retailer":{
            "name":"ScanLife Demo",
            "token":"xxxxxxxxxxxxxxxxxx",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
            "numActiveOffers":44
         },
         "distance":488.1854
      },
      {
         "id":85,
         "name":"Tienda 109",
         "longitude":"-2.3",
         "latitude":"43.6",
         "zipcode":"28002",
         "city":"Bilbao",
         "region":"Madrid",
         "addressHtml":"<strong>HTML address 109</strong>",
         "retailer":{
            "name":"ScanLife Demo",
            "token":"xxxxxxxxxxxxxxxxxx",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
            "numActiveOffers":44
         },
         "distance":536.9864
      },
      {
         "id":79,
         "name":"Tienda 103",
         "longitude":"-1.6",
         "latitude":"44.6",
         "zipcode":"28003",
         "city":"Sevilla",
         "region":"Madrid",
         "addressHtml":"<strong>HTML address 103</strong>",
         "retailer":{
            "name":"ScanLife Demo",
            "token":"xxxxxxxxxxxxxxxxxx",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
            "numActiveOffers":44
         },
         "distance":552.8425
      },
      {
         "id":20,
         "name":"Lab. Integración",
         "longitude":"null",
         "latitude":"null",
         "zipcode":"08080",
         "city":"Barcelona",
         "region":"Barcelona",
         "addressHtml":"",
         "retailer":{
            "name":"ScanLife Demo",
            "token":"xxxxxxxxxxxxxxxxxx",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
            "numActiveOffers":44
         },
         "distance":null
      },
      {
         "id":18,
         "name":"Virtual Stores",
         "longitude":"null",
         "latitude":"null",
         "zipcode":"",
         "city":"",
         "region":"A Coruña",
         "addressHtml":"",
         "retailer":{
            "name":"ScanLife Demo",
            "token":"xxxxxxxxxxxxxxxxxx",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
            "numActiveOffers":44
         },
         "distance":null
      },
      {
         "id":53,
         "name":"Demo Store",
         "longitude":"null",
         "latitude":"null",
         "zipcode":"97370",
         "city":"Madrid",
         "region":"Madrid",
         "addressHtml":"",
         "retailer":{
            "name":"ScanLife Demo",
            "token":"xxxxxxxxxxxxxxxxxx",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
            "numActiveOffers":44
         },
         "distance":null
      }
   ]
}
```

### Flowcharts
#### login flowchart
```flow
st=>start: Start|past
e=>end: user logged|future
loguser=>operation: login|approved
showform=>subroutine: Enrollment Form View|current
islogged=>condition: is logged?
accept=>condition: accept?|past

st->loguser()->islogged(left)
islogged(yes)->e
islogged(no, bottom)->showform
showform->accept(top)
accept(yes)->e
```
