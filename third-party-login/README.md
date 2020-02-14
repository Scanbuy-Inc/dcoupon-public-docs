![Logo](https://s3.amazonaws.com/dcoupon.com/sdk/docs/dcouponLogo.png)

# dCoupon Third Party Login API

Version 1.0 (January 2020)


## Introduction

The dCoupon 3rd Party Login API allows Scanbuy's corporate clients to log in their users into the dCoupon Platform, so users can benefit from accessing dCoupon services from 3rd party websites, without needing to use an additional login for dCoupon.

When calling the 3rd Party Login API on behalf of a user for the first time, such user is not registered and therefore must accept the dCoupon Term and Conditions. Subsequent calls will immediately return access tokens for such user. If at any point the dCoupon Terms and Conditions change, the user will be prompted to accept them before continuing the log in process. 

After successfully calling the 3rd Party Login API, clients will receive a JSON Web Token, which is valid for accessing the dCoupon Platform.

All requests to the dCoupon Platform must be signed with a secret, which is provided by dCoupon.


## API description

The API consists of a single URL that handles registration and login. This endpoint must be called every time a valid access token to the dCoupon Platform should be obtained.
The endpoint is in the form:

+ POST https://testapi.dcoupon.com/thirdparty/login/v1

And should be provided with the following json:
```json
{
    "email": "_users email_",
    "externalId": "_user id in clients platform_",
    "alias": "_users alias_",
    "birthdate": "_users birthdate_",
    "gender": "_users gender_"
}
```

as a POST body.


Additionally, the following headers must be provided:

+ dcoupon-authorization-apitoken: client's API key
+ dcoupon-authorization-method: should always be 'SIGNATURE'
+ dcoupon-authorization-signature: request' signature, see below
+ dcoupon-authorization-timestamp: timestamp at the time of making the request, in the format "yyyy-MM-dd'T'HH:mm:ssZ"

*It is recommended always issuing a call to the aforementioned login method prior to using any dCoupon Platform API service.*


## API response when users are not registered

When a user is not registered in the dCoupon Platform, or when it is already registered but the Terms and Conditions have changed, he/she must first accept the dCoupon Terms and Conditions before valid access can be granted to the third party. In this case, the API will return a HTTP 301 response code, together with a 'Location' header. The client must redirect the user to the URL contained in the 'Location' header, this URL will show the dCoupon Terms and Conditions to the user.

The redirection to the Terms and Conditions must be opened inside an IFRAME element. Upon acceptance of the dCoupon Terms and Conditions, the parent HTML of the IFRAME element will be notified through an event (IFRAME to parent message passing). We provide Javascript code that can be embedded in a webpage in order to support IFRAME message passing. See the demo source code and HTML to see an example.

![Flow diagram](https://s3.amazonaws.com/dcoupon.com/sdk/docs/third_party_api/third_party_api_registration_flow.jpg)


## API response when users are already registered

When a user is already registered in the dCoupon Platform, the API will return a HTTP 200 response code, together with a json body.
A valid JSON Web Token is available inside the field 'sessionToken'. This token should be used in all subsequent calls to the dCoupon Platform.

![Flow diagram](https://s3.amazonaws.com/dcoupon.com/sdk/docs/third_party_api/third_party_api_ok_flow.jpg)


## Signing requests

All request must be signed using UTF-8 encoding and the HmacSHA256 algorithm. The signed string should be:
```
<API_KEY>:<timestamp>:<POST body>
```

_timestamp_ should be in the form "yyyy-MM-dd'T'HH:mm:ssZ", and is the timestamp at the moment of the request.
The string should be signed using the client's API secret provided by dCoupon.


## JWT Expiration

A brief examination of the JWT token will determine if the token is already expired or not. Check the 'exp' field inside the payload section of the JWT for expiration. If the JSON Web Token is expired, a new one can be obtained by calling the login endpoint (see above, _API description_).


## dCoupon's Terms and Conditions acceptance and IFRAME message passing

A sample application is provided, in order to show how to embed the IFRAME message passing code snippet. It consists of two parts:

+ dcouponwidget.js: Javascript code providing the message handling mechanism for IFRAME communication
+ index.html: a sample HTML with a Javascript code snippet for activating the message passing mechanism.

Third parties should use _both_ parts in order to properly integrate the dCoupon Third Party Login API. 


## Sample application

The sample application is a Spring Boot application with Thymeleaf.

The embeddable contents are:
+ src/main/resources/static/dcouponwidget.js
+ src/main/resources/templates/index.html

