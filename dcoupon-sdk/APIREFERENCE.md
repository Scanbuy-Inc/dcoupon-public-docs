# DCOUPON SDK - API reference

## CLASSES

### Dcoupon
Dcoupon SDK instance to call methods.
```kotlin
class Dcoupon(context: Context)
```

---

### Dcoupon Callback
Dcoupon callback to receive method responses as a code/message tuple or as a boolean in some methods.
```kotlin
interface DcouponCallback {
    fun result(code: Int, message: String)
}

interface DcouponBoolCallback {
    fun result(boolean: Boolean)
}
```

---

## METHODS

### LogIn
Third-party log in method.
```kotlin
fun logIn(
        email: String,
        externalId: String,
        alias: String?,
        gender: String?,
        birthdate: String?,
        callback: DcouponCallback
    )
```
#### Log In flow chart
![login-diagram](https://s3.amazonaws.com/dcoupon.com/sdk/docs/loginflowchart.png?raw=true)


#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `email` | varchar(200) | String | ***true*** | User's email.
| `externalId` | varchar(100) | String | ***true*** | User's id from your system.
| `alias` | varchar(90) | String | *false* | User's alias/name.
| `gender` | 'MALE', 'FEMALE', 'OTHER', 'RATHERNOTSAY' | String | *false* | User's gender.
| `birthdate` | 'YYYY-MM-dd' | String | *false* | User's date of birth.
| `callback` | (code, message) -> {} | Function | ***true*** | Dcoupon callback with code and message

#### Callback response
| code | (type) message | description |
| :---: | :---: | --- |
| 200 | (String) | The user is logged, now the user can access to others methods(getCoupons(), getFilters(),...).
| 301 | (String) | A form view is showed, the user must fill the mandatory data and accept the legal documents.
| 400 | (String) | Bad request, missed mandatory data (email, externalId).
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

**logIn -> Special case:** load the enrollment view because there are mandatory legal texts that need to be accepted by the user.

When the user is logged in, the method **isLoggedIn()** returns *true* in the callback.
```kotlin
fun isLoggedIn(
        callback: DcouponBoolCallback
    )
```

To log out the user, the method **logOut** will do it.
```kotlin
fun logOut()
```

---

### GetUserData
Get the user data.
```kotlin
fun getUserData(
        callback: DcouponCallback
    )
```

#### Input
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `callback` | (code, message) -> {} | Function | ***true*** | Dcoupon callback with code and message


#### Callback response
| code | (type) message | description |
| :---: | :---: | --- |
| 200 | [(JsonObject)](#getuserdata-jsonobject) | Returns the user data.
| 403 | (String) | User is not active.
| 404 | (String) | User not found.
| 406 | (String) | The user session token is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### UpdateUserData
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
| `callback` | (code, message) -> {} | Function | ***true*** | Dcoupon callback with code and message


#### Callback response
| code | (type) message | description |
| :---: | :---: | --- |
| 200 | [(JsonObject)](#updateuserdata-jsonobject) | Returns the user data.
| 403 | (String) | User is not active.
| 404 | (String) | User not found.
| 406 | (String) | The user session token is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### GetCoupons
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
| `callback` | (code, message) -> {} | Function | ***true*** | Dcoupon callback with code and message

Sort By Options:
- **NEWEST** : coupons returned will be ordered from newest coupons to oldest created.
- **ENDING** : coupons returned will be ordered starting for those promotions closest to end its publication.
- **VALUE** : coupons returned will be ordered considering face value of the offer, from highest values to lowest.
- **DEFAULT** : (default) coupons returned will be ordered by the publication start date of the promotions.

#### Callback response
| code | (type) message | description
| :---: | :---: | --- |
| 200 | [(JsonObject)](#getcoupons-jsonobject) | Returns a list of coupons.
| 403 | (String) | User is not active.
| 404 | (String) | User not found.
| 406 | (String) | The user session token is not valid.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.

---

### GetCouponDetail
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
| `callback` | (code, message) -> {} | Function | ***true*** | Dcoupon callback with code and message

#### Callback response
| code | (type) message | description |
| :---: | :---: | --- |
| 200 | [(JsonObject)](#getcoupondetail-jsonobject) | Returns the coupon detail.
| 400 | (String) | Bad request, missed mandatory data (couponId).
| 401 | (String) | Unauthorized, the user is not logged.
| 404 | (String) | Not found, the coupon not exists or does not belong to the user.
| 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

---

#### activateCoupon:
Set the activated status on a coupon.
```java
class Dcoupon{
    void activateCoupon(int couponId);
}
```
##### input:
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `couponId` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | ***true*** | The identifier of the user's coupon.
##### output:
| which | code | (type) message | description |
| --- | :---: | :---: | --- |
| `WHICH_ACTIVATE_COUPON` | 200 | [(JsonObject)](#activatecoupon-jsonobject) | Coupon activated successfully.
| `WHICH_ACTIVATE_COUPON` | 400 | (String) | Bad request, missed mandatory data (couponId).
| `WHICH_ACTIVATE_COUPON` | 401 | (String) | Unauthorized, the user is not logged.
| `WHICH_ACTIVATE_COUPON` | 404 | (String) | Not found, the coupon not exists or does not belong to the user.
| `WHICH_ACTIVATE_COUPON` | 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| `WHICH_ACTIVATE_COUPON` | 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

---

#### deactivateCoupon:
Set the deactivated status on a coupon.
```java
class Dcoupon{
    void deactivateCoupon(int couponId);
}
```
##### input:
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `couponId` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | ***true*** | The identifier of the user's coupon.
##### output:
| which | code | (type) message | description |
| --- | :---: | :---: | --- |
| `WHICH_DEACTIVATE_COUPON` | 200 | [(JsonObject)](#deactivatecoupon-jsonobject) | Coupon deactivated successfully.
| `WHICH_DEACTIVATE_COUPON` | 400 | (String) | Bad request, missed mandatory data (couponId).
| `WHICH_DEACTIVATE_COUPON` | 401 | (String) | Unauthorized, the user is not logged.
| `WHICH_DEACTIVATE_COUPON` | 404 | (String) | Not found, the coupon not exists or does not belong to the user.
| `WHICH_DEACTIVATE_COUPON` | 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| `WHICH_DEACTIVATE_COUPON` | 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

---

#### getRedemptionCode:
Get an available user's redemption code.
```java
class Dcoupon{
    void getRedemptionCode();
}
```
##### output:
| which | code | (type) message | description |
| --- | :---: | :---: | --- |
| `WHICH_GET_REDEMPTION_CODE` | 200 | [(JsonObject)](#getredemptioncode-jsonobject) | Redemption code has been generated successfully.
| `WHICH_GET_REDEMPTION_CODE` | 401 | (String) | Unauthorized, the user is not logged.
| `WHICH_GET_REDEMPTION_CODE` | 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| `WHICH_GET_REDEMPTION_CODE` | 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

---

#### createCoupons:
Create multiple coupons by promotion tokens.
```java
class Dcoupon{
    void createCoupons(@NonNull ArrayList<String> promotionTokens, String latitude, String longitude, String source, String transId, String crmId);
}
```
##### input:
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `promotionTokens` | any | ArrayList<*String*> | ***true*** | Promotions tokens that identifies the promotions.
| `latitude` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninQ.gif) | String | *false* | User latitude coordinate.
| `longitude` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninQ.gif) | String | *false* | User longitude coordinate.
| `source` | varchar(100) | String | *false* | Source from the request.
| `transId` | varchar(50) | String | *false* | Transaction identifier if the promotion requires it.
| `crmId` | varchar(50) | String | *false* | The customer relationship management identifier.
##### output:
| which | code | (type) message | description |
| --- | :---: | :---: | --- |
| `WHICH_CREATE_COUPONS` | 200 | [(JsonObject)](#createcoupons-jsonobject) | Returns a list of each promotion result.
| `WHICH_CREATE_COUPONS` | 400 | (String) | Bad request, missed mandatory data (promotionsTokens).
| `WHICH_CREATE_COUPONS` | 401 | (String) | Unauthorized, the user is not logged.
| `WHICH_CREATE_COUPONS` | 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| `WHICH_CREATE_COUPONS` | 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

---

#### getFilters:
Returns all companies, categories and retailers with active promotions associated to the publisher identified by the API token and the number of active offers for each company, retailer or category. ONLY those companies, retailers and categories that have choose at least one of its promotions to be published using the Publisher identified in the request will be returned.
```java
class Dcoupon{
    void getFilters(int start, int limit);
}
```
##### input:
| name | value | type | mandatory | description
| :--- | :---: | :---: | :---: | --- |
| `start` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Index of first store to be returned. 0 by default.
| `limit` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Maximum number of items to return. 10 by default.
##### output:
| which | code | (type) message | description |
| --- | :---: | :---: | --- |
| `WHICH_GET_FILTERS` | 200 | [(JsonObject)](#getfilters-jsonobject) | Return a list of filters. Filters type: *filterCategory*, *filterCompany*, *filterRetailer*. 
| `WHICH_GET_FILTERS` | 401 | (String) | Unauthorized, the user is not logged.
| `WHICH_GET_FILTERS` | 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| `WHICH_GET_FILTERS` | 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

---

#### getPromotions:
Returns all active promotions associated to the publisher identified by the API token filtered with the parameters sent in the request.
```java
class Dcoupon{
    void getPromotions(int start, int limit, ArrayList<String> categoryIds, ArrayList<String> storeIds, ArrayList<String> retailerTokens,  ArrayList<String> companyTokens, String textSearch, String zipcode, String latitude, String longitude, String radius, String orderBy);
}
```
##### input:
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `start` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | ***true*** | Index of first store to be returned. 0 by default.
| `limit` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | ***true*** | Maximum number of items to return. 10 by default.
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

Order By Options:
- **NEWEST** : (default) promotions returned will be ordered from newest promotions to oldest.
- **ENDING** : promotions returned will be ordered starting for those promotions closest to end its publication.
- **VALUE** : promotions returned will be ordered considering face value of the offer, from highest values to lowest.
- **TOP** : promotions returned will be ordered starting for those promotions with a higher number of acquired coupons.

##### output:
| which | code | (type) message | description |
| --- | :---: | :---: | --- |
| `WHICH_GET_PROMOTIONS` | 200 | [(JsonObject)](#getpromotions-jsonobject) | Returns a list of promotions.
| `WHICH_GET_PROMOTIONS` | 401 | (String) | Unauthorized, the user is not logged.
| `WHICH_GET_PROMOTIONS` | 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| `WHICH_GET_PROMOTIONS` | 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

---

#### getPromotionDetail:
Get the details of a promotion by promotion token sent.
```java
class Dcoupon{
    void getPromotionDetail(@NonNull String promotionToken);
}
```
##### input:
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `promotionToken` | any | String | ***true*** | The token that identifies this promotion.
##### output:
| which | code | (type) message | description |
| --- | :---: | :---: | --- |
| `WHICH_GET_PROMOTION_DETAIL` | 200 | [(JsonObject)](#getpromotiondetail-jsonobject) | Returns the promotion detail.
| `WHICH_GET_PROMOTION_DETAIL` | 401 | (String) | Unauthorized, the user is not logged.
| `WHICH_GET_PROMOTION_DETAIL` | 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| `WHICH_GET_PROMOTION_DETAIL` | 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

---

#### getStores:
Returns all active promotions associated to the publisher identified by the API token filtered with the parameters sent in the request, including a list of stores from the retailer. (Use promotionToken, can combine with retailerTokens).
```java
class Dcoupon{
    void getStores(int start, int limit, String promotionToken, ArrayList<String> retailerTokens, String zipcode, String latitude, String longitude, String radius);
}
```
##### input:
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `start` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | ***true*** | Index of first store to be returned. 0 by default.
| `limit` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | ***true*** | Maximum number of items to return. 10 by default.
| `promotionToken` | any | String | ***true*** | The token that identifies the promotion.
| `retailerTokens` | any | ArrayList<*String*> | *false* | Token from the retailer.
| `zipcode` | any | String | *false* | Zip code to filter the search.
| `latitude` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninQ.gif) | String | *false* | User latitude coordinate.
| `longitude` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninQ.gif) | String | *false* | User longitude coordinate.
| `radius` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | String | *false* | Radius to make the search for coupons available.
##### output:
| which | code | (type) message | description |
| --- | :---: | :---: | --- |
| `WHICH_GET_STORES` | 200 | [(JsonObject)](#getstores-jsonobject) | Return a list of stores.
| `WHICH_GET_STORES` | 401 | (String) | Unauthorized, the user is not logged.
| `WHICH_GET_STORES` | 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| `WHICH_GET_STORES` | 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

---

### Listener for responses - DcouponListener()
```java
public interface DcouponListener {
    void handleMessage(int which, int code, String message);
}
```
example:
```java
class Activity{
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Dcoupon dcoupon = new Dcoupon(this);
        dcoupon.registerListener(new DcouponListener() {
            public void handleMessage(int which, int code, String message) {
                try {
                    switch (which) {
                        case DcouponListener.WHICH_LOGIN:
                            if (dcoupon.isLogged()) {
                                // user is logged
                            }
                            break;
                        case DcouponListener.WHICH_GET_COUPONS:
                            JSONObject jsonCoupons = new JSONObject(message);
                            break;
                        case DcouponListener.WHICH_CREATE_COUPONS:
                            // get response
                            break;
                        default:
                            break;
                    }
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        });
    }
}
```

### Which(codes):
```java
public interface DcouponListener {

    int WHICH_LOGIN = 0;
    int WHICH_GET_COUPONS = 1;
    int WHICH_GET_COUPON_DETAIL = 2;
    int WHICH_ACTIVATE_COUPON = 3;
    int WHICH_DEACTIVATE_COUPON = 4;
    int WHICH_GET_REDEMPTION_CODE = 5;
    int WHICH_CREATE_COUPONS = 6;
    int WHICH_ADD_LOYALTY_CARD = 7;
    int WHICH_GET_USER_REDEMPTION_HISTORY = 8;
    int WHICH_GET_PROMOTIONS = 9;
    int WHICH_GET_PROMOTION_DETAIL = 10;
    int WHICH_GET_FILTERS = 11;
    int WHICH_GET_STORES = 12;
}
```

```swift
public class Dcoupon: DcouponProtocol, DcouponListener {
    public static var WHICH_LOGIN: Int = 0
    public static var WHICH_GET_COUPONS: Int = 1
    public static var WHICH_GET_COUPON_DETAIL: Int = 2
    public static var WHICH_ACTIVATE_COUPON: Int = 3
    public static var WHICH_DEACTIVATE_COUPON: Int = 4
    public static var WHICH_GET_REDEMPTION_CODE: Int = 5
    public static var WHICH_CREATE_COUPONS: Int = 6
    public static var WHICH_ADD_LOYALTY_CARD: Int = 7
    public static var WHICH_GET_USER_REDEMPTION_HISTORY: Int = 8
    public static var WHICH_GET_PROMOTIONS: Int = 9
    public static var WHICH_GET_PROMOTION_DETAIL: Int = 10
    public static var WHICH_GET_FILTERS: Int = 11
    public static var WHICH_GET_STORES: Int = 12
```

### Responses (examples):

#### getUserData (JSONObject)
- Response code 200:
```json
{
  "alias": "_User_alias_",
	"gender": "_User_gender_",
	"birthdate": "YYYY-MM-DD",
	"email": "_User_email_"
}
```
---

#### updateUserData (JSONObject)
- Response code 200:
```json
{
  "responseCode":0,
  "responseMsg":"Command executed successfully"
}
```

---

#### getCoupons (JSONObject)
- Response code 200:
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
		"discount":{
			"discountType": "_Discount type_",
			"amount": "_Discount amount_"
		}
	}],
	"totalDiscount": "_Total discount amount of coupons in user wallet_",
	"totalCount": "_Total number of coupons in user wallet_"
}
```

---

#### getCouponDetail (JSONObject)
- Response code 200:
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

---

#### activateCoupon (JSONObject)
- Response code 200:
```json
{
  "responseCode":0,
  "responseMsg":"Command executed successfully"
}
```

---

#### deactivateCoupon (JSONObject)
- Response code 200:
```json
{
  "responseCode":0,
  "responseMsg":"Command executed successfully"
}
```

---

#### getRedemptionCode (JSONObject)
- Response code 200:
```json
{
  "userIDToken":"49695"
}
```

---

#### createCoupons (JSONObject)
- Response code 200:
```json
{
   "createMultipleCouponResponse":[
      {
         "apiTokenMetaCoupon":"d502bj63lh62502ke17n",
         "couponSerialNumber":"106",
         "idCoupon":15948,
         "genericResponse":{
            "responseCode":0,
            "responseMsg":"Command executed successfully"
         }
      },
      {
         "apiTokenMetaCoupon":"vrljzb7tvzajzevfq38m",
         "couponSerialNumber":"34",
         "idCoupon":15949,
         "genericResponse":{
            "responseCode":0,
            "responseMsg":"Command executed successfully"
         }
      }
   ]
}
```

---

#### getPromotions (JSONObject)
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
         "token":"vrljzb7tvzajzevfq38m",
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
               "token":"x3vyr8icn081mlrrr0rn",
               "validInAllStores":true
            }
         ]
      },
      {
         "id":336,
         "name":"CP039",
         "token":"d502bj63lh62502ke17n",
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
               "token":"x3vyr8icn081mlrrr0rn",
               "validInAllStores":true
            }
         ]
      },
      {
         "id":335,
         "name":"CP038",
         "token":"3df5g32a15j00q37me60",
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
               "token":"x3vyr8icn081mlrrr0rn",
               "validInAllStores":true
            }
         ]
      }
   ]
}
```

---

#### getPromotionDetail (JSONObject)
- Response code 200:
```json
{
   "id":347,
   "name":"CP041",
   "token":"vrljzb7tvzajzevfq38m",
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
         "token":"x3vyr8icn081mlrrr0rn",
         "validInAllStores":true
      }
   ]
}
```

---

#### getFilters (JSONObject)
- Response code 200:
```json
{
   "filtersRetailers":{
      "totalResults":3,
      "pageSize":10,
      "start":0,
      "items":[
         {
            "name":"GADIS",
            "token":"scgildx2619ccqzu4vkj",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/mcp_img1460370674807.png",
            "numActiveOffers":16
         },
         {
            "name":"Leroy Merlín",
            "token":"5ri3050btdhtxztunxfr",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1489422491901.png",
            "numActiveOffers":1
         },
         {
            "name":"ScanLife Demo",
            "token":"x3vyr8icn081mlrrr0rn",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
            "numActiveOffers":43
         }
      ]
   },
   "filtersCompanies":{
      "totalResults":3,
      "pageSize":10,
      "start":0,
      "items":[
         {
            "name":"Company Test SDK  Wincor",
            "token":"ni2sa4ah4rfnr574fumh",
            "numActiveOffers":41
         },
         {
            "name":"Scanbuy Agustin Demo",
            "token":"kkbx2kkcnexvgmgo5p9y",
            "numActiveOffers":2
         },
         {
            "name":"Scanbuy-Sergio",
            "token":"5u4d74fpalho69e221eq",
            "numActiveOffers":1
         }
      ]
   },
   "filtersCategories":{
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
            "token":"x3vyr8icn081mlrrr0rn",
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
            "token":"x3vyr8icn081mlrrr0rn",
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
            "token":"x3vyr8icn081mlrrr0rn",
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
            "token":"x3vyr8icn081mlrrr0rn",
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
            "token":"x3vyr8icn081mlrrr0rn",
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
            "token":"x3vyr8icn081mlrrr0rn",
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
            "token":"x3vyr8icn081mlrrr0rn",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
            "numActiveOffers":44
         },
         "distance":552.8425
      },
      {
         "id":20,
         "name":"Lab. AECOC",
         "longitude":"null",
         "latitude":"null",
         "zipcode":"08080",
         "city":"Barcelona",
         "region":"Barcelona",
         "addressHtml":"",
         "retailer":{
            "name":"ScanLife Demo",
            "token":"x3vyr8icn081mlrrr0rn",
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
            "token":"x3vyr8icn081mlrrr0rn",
            "logoUrl":"s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
            "numActiveOffers":44
         },
         "distance":null
      },
      {
         "id":53,
         "name":"Wincor",
         "longitude":"null",
         "latitude":"null",
         "zipcode":"97370",
         "city":"Madrid",
         "region":"Madrid",
         "addressHtml":"",
         "retailer":{
            "name":"ScanLife Demo",
            "token":"x3vyr8icn081mlrrr0rn",
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