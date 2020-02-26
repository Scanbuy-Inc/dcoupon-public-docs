![Logo](https://s3.amazonaws.com/dcoupon.com/sdk/docs/dcouponLogo.png)

# dcoupon-sdk - Third Party SDK

Version 1.0 (January 2020)

## Introduction

The dcoupon SDK allows our clients to log in their users into the dcoupon service, so users can benefit from accessing dcoupon service from 3rd party apps, without needing to use an additional login for dcoupon

All dcoupon users must provide the following information when registering:
-	Alias/nickname
-	Email address
-   External identifier
-	Gender
-	Birthdate

and they need to accept the terms and conditions and the privacy policy of the service. The 3rd party app will be able to provide the user’s personal information through the SDK, so the user won’t need to enter it again. 

On the first access, the user will need to accept the legal documents and to fill in personal information (if that info was not provided by the 3rd party) or update this info. 

On the following times the user access the dcoupon service, if any legal doc has changed, they will be prompted to accept those changes before continuing.

## Get started with Android SDK
### Setup to start
#### Android studio settings
To use the dCoupon SDK in an Android project, add the SDK as a compilation unit and import it.
1. Go to **Android Studio -> New Project -> Minimum SDK**.
2. Select **API 16: Android 4.1 (Jelly Bean)** or higher and create a new project.
3. Once the project is created, open Gradle Scripts | build.gradle (Project: <*your_project*> and do the following:
- 3.a) Ensure you have the repositories configured, otherwise add them:
```groovy
repositories {
    maven {
        url '/home/user/dcoupon_sdk/'
    }
    maven {
        url 'http://download.flutter.io'
    }
}
```
note: Unzip and place the dcoupon sdk files under your home repository. Ex: '/home/user/dcoupon_sdk'

   - 3.b) Add the following code snippet to the **dependencies {}** section of the build.gradle (Project) file:
```groovy
dependencies {
    implementation 'com.dcoupon_sdk_flutter_module:flutter_release:1.0'
}
```

   - 3.c) Save and close the build.gradle file (Project: <*your_project*>).

To learn more, visit https://flutter.dev/go/build-aar

4. Add the 'dcoupon_sdk_android_interface' in your project as a module:
   - 4.a) Go to File -> New -> Import Module...
   - 4.b) Select the source directory of the Module you want to import and click Finish.
   - 4.c) Open Project Structure and open Module Settings for your project.
   - 4.d) Open the Dependencies tab.
   - 4.e) Click the (+) icon and select Module Dependency. Select the module and click Ok.
   - 4.f) Open Gradle Scripts | build.gradle (Module: app) and do the following:
     - 4.f.1) Add the following code snippet to the **dependencies {}** section of the build.gradle (Module: app) file:
     - 4.f.2) Save and close the build.gradle file (Module: app).
         
```groovy
dependencies {
    implementation project(path: ':dcoupon_sdk_android_interface')
}
```
         
5. Build the project. You can now import **com.dcoupon.sdk.Dcoupon** into the application.

#### Add your keys in dcoupon application
Next, add the dCoupon application identifiers to the project chain file and update the Android manifest:
1. Open the file /app/res/values/strings.xml.
2. Add the string elements to the file with the names attributes:
- dcoupon_client_token
- dcoupon_client_secret_key
- dcoupon_client_country
- dcoupon_client_domain
- dcoupon_client_publisher_api_token

And the value as an identifier for the dCoupon application. For example:
```xml
<resources>
    <string name="dcoupon_client_token">YOUR CLIENT TOKEN HERE</string>
    <string name="dcoupon_client_secret_key">YOUR CLIENT SECRET KEY HERE</string>
    <string name="dcoupon_client_country">YOUR CLIENT COUNTRY HERE</string>
    <string name="dcoupon_client_domain">YOUR CLIENT DOMAIN HERE</string>
    <string name="dcoupon_client_publisher_api_token">YOUR CLIENT PUBLISHER API TOKEN HERE</string>
</resources>
```
3. Open the file /app/manifests/AndroidManifest.xml.
4. Add this element **uses-permission** in the manifest:
```xml
<uses-permission android:name="android.permission.INTERNET"/>
```
5. Add the **meta-data** elements inside the application tag:
```xml
<application>
    <meta-data
        android:name="com.dcoupon.sdk.ClientToken"
        android:value="@string/dcoupon_client_token" />
    <meta-data
        android:name="com.dcoupon.sdk.ClientSecretKey"
        android:value="@string/dcoupon_client_secret_key" />
    <meta-data
        android:name="com.dcoupon.sdk.ClientCountry"
        android:value="@string/dcoupon_client_country" />
    <meta-data
        android:name="com.dcoupon.sdk.ClientDomain"
        android:value="@string/dcoupon_client_domain" />
    <meta-data
        android:name="com.dcoupon.sdk.ClientPublisherApiToken"
        android:value="@string/dcoupon_client_publisher_api_token" />
</application>
```
---

### Constructor - Dcoupon()
```java
public class Dcoupon implements DcouponInterface{
    // constructor
    public Dcoupon(@NonNull Context context){
        //...
    }
}
```
In an android Activity or in a frame class add the application context. For example:
```java
class Activity{
    Dcoupon dcoupon = new Dcoupon(this);
}
```

## Get started with iOS SDK
### Add dcoupon frameworks to your application
1) If your existing application doesn’t already have a **Podfile**, follow the [CocoaPods getting started guide](https://guides.cocoapods.org/using/using-cocoapods.html) to add a **Podfile** to your project.
2) Download the [dCoupon Podspec file](https://github.com/Scanbuy-Inc/dcoupon-public-docs/blob/master/dcoupon-sdk/dcouponSDK.podspec) to your **existing application folder**.
3) Add the following line to your **Podfile**:
```
target '<YourAppName>' do
...
   pod 'dcouponSDK', :podspec => 'dcouponSDK.podspec'
...
end
```
4) Run **pod install**.

#### Add your keys to the dcoupon.plist
1) Download the [dcoupon Property List file](https://github.com/Scanbuy-Inc/dcoupon-public-docs/blob/master/dcoupon-sdk/dcoupon.plist)
2) Drag and drop the provided **dcoupon.plist** file into your **existing application folder**.
3) Replace YOUR_CLIENT_... below with the values we provided you:
For example:
![Add keys](https://s3.amazonaws.com/dcoupon.com/sdk/docs/plistInProject.png)

You can now use the Dcoupon class to make SDK calls. For example, to login:
```swift
...
import dcouponSDK

class SceneDelegate: UIResponder, UIWindowSceneDelegate, DcouponListener {
    var window: UIWindow?
    var dcoupon:Dcoupon? = nil

    func handleMessage(which: Int, code: Int, message: String) {
        print("VIEWCONTROLLER LISTENER handleMessage: \(which) \(code) \(message)")
        if(which == Dcoupon.WHICH_LOGIN) {
            dcoupon!.getRedemptionCode()
        }
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
             // Called when the scene has moved from an inactive state to an active state.
             // Use this method to restart any tasks that were paused (or not yet started) when the scene was inactive.
             let rootVC = self.window?.rootViewController
             dcoupon = Dcoupon(withListener: self, viewController: rootVC!)
             dcoupon!.login(email: "example@email.com", externalId: "12345", alias: "example_alias", gender: "MALE", birthdate: "1984-02-05")

         }
...
```

---
### Methods:
#### login:
Third-party login method.
```java
class Dcoupon{
    void login(@NonNull String email, @NonNull String externalId, String alias, String gender, String birthdate);
}
```
##### login flow chart
![login-diagram](https://s3.amazonaws.com/dcoupon.com/sdk/docs/loginflowchart.png?raw=true)

##### input:
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `email` | varchar(200) | String | ***true*** | User's email.
| `externalId` | varchar(100) | String | ***true*** | User's id from your system.
| `alias` | varchar(90) | String | *false* | User's alias/name.
| `gender` | 'MALE', 'FEMALE', 'OTHER', 'RATHERNOTSAY' | String | *false* | User's gender.
| `birthdate` | 'YYYY-MM-dd' | String | *false* | User's date of birth.
##### output:
| which | code | (type) message | description |
| --- | :---: | :---: | --- |
| `WHICH_LOGIN` | 200 | (String) | The user is logged, now the user can access to others methods(getCoupons(), getFilters(),...).
| `WHICH_LOGIN` | 301 | (String) | A form view is showed, the user must fill the mandatory data and accept the legal documents.
| `WHICH_LOGIN` | 400 | (String) | Bad request, missed mandatory data (email, externalId).
| `WHICH_LOGIN` | 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| `WHICH_LOGIN` | 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

**login** -> Special case: load the enrollment view because there are mandatory legal texts to be accepted by the user.
When the user is logged the method **isLogged()** returns *true*:
```java
public interface DcouponInterface {
    boolean isLogged();
}
```

---

#### getCoupons:
Get the list of user's coupons.
```java
class Dcoupon{
    void getCoupons(int start, int limit, String sortBy);
}
```
##### input:
| name | value | type | mandatory | description
| :--- | :---: | :---: | :---: | --- |
| `start` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Index of first store to be returned. 0 by default.
| `limit` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | *false* | Maximum number of items to return. 10 by default.
| `sortBy` | 'NEWEST', 'ENDING', 'VALUE', 'DEFAULT' | String | *false* | How the result set is sorted.

Sort By Options:
- **NEWEST** : coupons returned will be ordered from newest coupons to oldest created.
- **ENDING** : coupons returned will be ordered starting for those promotions closest to end its publication.
- **VALUE** : coupons returned will be ordered considering face value of the offer, from highest values to lowest.
- **DEFAULT** : (default) coupons returned will be ordered by the publication start date of the promotions.

##### output:
| which | code | (type) message | description
| --- | :---: | :---: | --- |
| `WHICH_GET_COUPONS` | 200 | [(JsonObject)](#getcoupons-jsonobject) | Returns a list of coupons.
| `WHICH_GET_COUPONS` | 401 | (String) | Unauthorized, the user is not logged.
| `WHICH_GET_COUPONS` | 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| `WHICH_GET_COUPONS` | 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

---

#### getCouponDetail:
Get the details of one coupon by the couponId.
```java
class Dcoupon{
    void getCouponDetail(int couponId);
}
```
##### input:
| name | value | type | mandatory | description |
| :--- | :---: | :---: | :---: | --- |
| `couponId` | ![equation](https://s3.amazonaws.com/dcoupon.com/sdk/docs/forallninN.gif) | int | ***true*** | The identifier of the user's coupon.
##### output:
| which | code | (type) message | description |
| --- | :---: | :---: | --- |
| `WHICH_GET_COUPON_DETAIL` | 200 | [(JsonObject)](#getcoupondetail-jsonobject) | Returns the coupon detail.
| `WHICH_GET_COUPON_DETAIL` | 400 | (String) | Bad request, missed mandatory data (couponId).
| `WHICH_GET_COUPON_DETAIL` | 401 | (String) | Unauthorized, the user is not logged.
| `WHICH_GET_COUPON_DETAIL` | 404 | (String) | Not found, the coupon not exists or does not belong to the user.
| `WHICH_GET_COUPON_DETAIL` | 500 | (String) | An internal error has occurred, please try again later. If the error persist, please contact support.
| `WHICH_GET_COUPON_DETAIL` | 503 | (String) | Service unavailable, other service in background thread is running, please wait a moment.

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
#### getCoupons (JSONObject)
- Response code 200:
```json
{
  "couponDetail":[
     {
        "couponId":15949,
        "mcToken":"vrljzb7tvzajzevfq38m",
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
              "retailerToken":"x3vyr8icn081mlrrr0rn"
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
        "mcToken":"d502bj63lh62502ke17n",
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
              "retailerToken":"x3vyr8icn081mlrrr0rn"
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
        "mcToken":"hq28mtv2lon7jgu4zea9",
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
              "retailerToken":"scgildx2619ccqzu4vkj"
           },
           {
              "retailerName":"ScanLife Demo",
              "retailerLogo":"https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
              "retailerToken":"x3vyr8icn081mlrrr0rn"
           }
        ],
        "sgcn":"JUANCMP000901360",
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

#### getCouponDetail (JSONObject)
- Response code 200:
```json
{
   "couponId":15940,
   "mcToken":"hq28mtv2lon7jgu4zea9",
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
         "retailerToken":"scgildx2619ccqzu4vkj"
      },
      {
         "retailerName":"ScanLife Demo",
         "retailerLogo":"https://s3.amazonaws.com/dev.imgs.dcoupon.scanlife.com/files/retailers/img1553166021496.png",
         "retailerToken":"x3vyr8icn081mlrrr0rn"
      }
   ],
   "sgcn":"JUANCMP000901360",
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
