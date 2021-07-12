![Logo](https://s3.amazonaws.com/dcoupon.com/sdk/docs/dcouponLogo.png)

# dcoupon Third Party Login API

Version 2.0 (July 2021)


## Introduction

The dcoupon 3rd Party Login API allows Scanbuy's corporate clients to log in their users into the dcoupon Platform, so users can benefit from accessing dcoupon services from 3rd party websites, without needing to use an additional login for dcoupon.

When calling the 3rd Party Login API on behalf of a user for the first time, such user is not registered and therefore must accept the dcoupon Term and Conditions. Subsequent calls will immediately return access tokens for such user. If at any point the dcoupon Terms and Conditions change, the user will be prompted to accept them before continuing the log in process. 

After successfully calling the 3rd Party Login API, clients will receive a JSON Web Token, which is valid for accessing the dcoupon Platform.

All requests to the dcoupon Platform must be signed with a secret, which is provided by dcoupon.

## API response when users are not registered

When a user is not registered in the dcoupon Platform, or when it is already registered but the Terms and Conditions have changed, he/she must first accept the dcoupon Terms and Conditions before valid access can be granted to the third party. In this case, the API will return a HTTP 301 response code, together with a 'Location' header. The client must redirect the user to the URL contained in the 'Location' header, this URL will show the dcoupon Terms and Conditions to the user.

The redirection to the Terms and Conditions must be opened inside an IFRAME element. Upon acceptance of the dcoupon Terms and Conditions, the parent HTML of the IFRAME element will be notified through an event (IFRAME to parent message passing). We provide Javascript code that can be embedded in a webpage in order to support IFRAME message passing. See the demo source code and HTML to see an example.

![Flow diagram](https://s3.amazonaws.com/dcoupon.com/sdk/docs/third_party_api/third_party_api_registration_flow.jpg)


## API response when users are already registered

When a user is already registered in the dcoupon Platform, the API will return a HTTP 200 response code, together with a json body.
A valid JSON Web Token is available inside the field 'sessionToken'. This token should be used in all subsequent calls to the dcoupon Platform.

![Flow diagram](https://s3.amazonaws.com/dcoupon.com/sdk/docs/third_party_api/third_party_api_ok_flow.jpg)

## API description

The API consists of a single URL that handles registration and login. This endpoint must be called every time a valid access token to the dcoupon Platform should be obtained.
The endpoint is in the form:

+ POST https://services-dev.dcoupon.com/thirdparty/login/v2

###### Request

```json
{
  "headers": {
    "dcoupon-authorization-apikey": "(mandatory) String",
    "dcoupon-authorization-method": "(mandatory) String",
    "dcoupon-authorization-timestamp": "(mandatory) String",
    "dcoupon-authorization-signature": "(mandatory) String"
  },
  "body": {
    "externalId": "(mandatory) String",
    "clientCountry": "(mandatory) String",
    "email": "(optional) String",
    "referralCode": "(optional) String"
  }
}
```

example:

```json
{
  "headers": {
    "dcoupon-authorization-apikey": "YOUR_API_KEY",
    "dcoupon-authorization-method": "SIGNATURE",
    "dcoupon-authorization-timestamp": "yyyy-MM-dd'T'HH:mm:ssZ",
    "dcoupon-authorization-signature": "HmacSHA256(YOUR_API_KEY:timestamp, YOUR_SECRET_KEY)"
  },
  "body": {
    "externalId": "external-id-example-01",
    "clientCountry": "ES",
    "email": "example@email.com",
    "referralCode": "DC-AA18976"
  }
}
```

###### Responses

| Response     | StatusCode | Description                                    |
| ------------ | :--------: | ---------------------------------------------- |
| SignIn       |    200     | "OK"                                           |
| Redirect     |    301     | "There are mandatory documents to be accepted" |
| Unauthorized |    401     | "Unauthorized"                                 |
| Bad request  |    404     | "Missing parameters"                           |
| Error        |    500     | "Internal Server Error"                        |

examples:

**Status code 301**

```json
{
  "statusCode": 301,
  "headers": {
    "Content-Type": "application/json; charset=utf-8",
    "Location": "http://localhost:3000/enrollmentform/v2?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3Mzg0NWU2OC01ZDJjLTQyZGUtYTE4YS00MmM3ODhhOGRhY2QiLCJpc3MiOiJkY291cG9uLmNvbSIsImlhdCI6MTYyNTU2NDY0MiwiZXhwIjoxNjU3MTAwNjQyLCJzdWIiOjE0NTMsImNsaWVudEFwaUtleSI6IngzdnlyOGljbjA4MW1scnJyMHJuIiwiZXh0ZXJuYWxJZCI6IjEyMyIsImNvdW50cnkiOiJFUyIsImx0IjpbIjBiODUwZTYzZDQ2N2Y5YjIyMDU0MGUzN2Q1MmFlNjEiLCIyYzcwNmMzYzRjMTNiNzlmMzFiNGI3YWVmN2YxYmIzIl0sImVtYWlsIjoiOGNFUklzUFJiclh5SWhHT1d2cGtxaXFQTmM3SzQybE9xU1ZidVdRNWc2NHBkaytkUGpqSzVYc09FMFF2aks1cSJ9.AuMu5MkR5JN7lNfDKz7pUaRPMdCYmfaAwyo5I_vVqyg"
  },
  "body": {
    "message": "There are mandatory documents to be accepted"
  }
}
```

**Status code 200**

```json
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json; charset=utf-8",
    "client-type": "CLIENT-TYPE"
  },
  "body": {
    "message": "OK",
    "sessionToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1Yjk0MjVkMC01YWZjLTQ2YmMtYmI5Ni0zYjIwMzAwNTNiOWEiLCJpc3MiOiJkY291cG9uLmNvbSIsImlhdCI6MTYyNTU2NDY0MiwiZXhwIjoxNjU3MTAwNjQyLCJzdWIiOjcyNywiY2xpZW50QXBpS2V5IjoieDN2eXI4aWNuMDgxbWxycnIwcm4iLCJleHRlcm5hbElkIjoiZmx1dHRlci1leGFtcGxlLWV4dGVybmFsSWQiLCJsdCI6WyI2MGI4NTBlNjNkNDY3ZjliMjIwNTQwZTM3ZDUyYWU2MSIsImEyYzcwNmMzYzRjMTNiNzlmMzFiNGI3YWVmN2YxYmIzIl0sImVtYWlsIjoiUUlxVFF3V1gyUXk4blczNlhRSTNzclpvTkdiRERTUDBmcVNyUVM5RTFQckR1TC9PYmM2dHpzM2lqWVZIdWZiYiJ9.woQMXwByx32YQyWIOu-avx84n_FHSoLFPA4OIXx1sc8"
  }
}
```

*It is recommended always issuing a call to the aforementioned login method prior to using any dcoupon Platform API service.*


## Signing requests

All request must be signed using UTF-8 encoding and the HmacSHA256 algorithm. The signed string should be:
```
<API_KEY>:<timestamp>
```

_timestamp_ should be in the form "yyyy-MM-dd'T'HH:mm:ssZ", and is the timestamp at the moment of the request.
The string should be signed using the client's API secret provided by dcoupon.


## JWT Expiration

A brief examination of the JWT token will determine if the token is already expired or not. Check the 'exp' field inside the payload section of the JWT for expiration. If the JSON Web Token is expired, a new one can be obtained by calling the login endpoint (see above, _API description_).


## dcoupon's Terms and Conditions acceptance

If you receive a 301 HTTP status code, the login flow will continue in a web page that must be shown inside an iframe or webview, where we handle dcoupon's T&C acceptance. This section explains how to implement this.

### Events

Our web page will post events when the user is in the T&C step. These events are "SIGN_IN_SUCCESS" and "SIGN_IN_CANCELLED". If the eventType is "SIGN_IN_SUCCESS", it will contain the sessionToken.

```json
{
  "eventType": "SIGN_IN_SUCCESS",
  "sessionToken": "xxxxxxx"
}

or

{
  "eventType": "SIGN_IN_CANCELLED"
}
```

### iFrame implementation

You need to add the following code at your DOM Window to handle the events.

```javascript
window.addEventListener('message', event => {
  var data = event.data 
  if(data.eventType == 'SIGN_IN_CANCELLED'){
    //Cancel your login request
  }
  if(data.eventType == 'SIGN_IN_SUCCESS'){
    var sessionToken = data.sessionToken // the user session token
  }
})
```

### Webview implementation

You need to add the following code (choose your platform) to handle the events.

1. IOS. You need to use WKScriptMessageHandler protocol.

```swift
var mDcouponPostMessage : String = "DcouponPostMessage"
mWebKitView.configuration.userContentController.add(self, name: mDcouponPostMessage)

func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
  if message.name == mDcouponPostMessage {
    message.body as? String // Received message from webview in native, process data/sessionToken
    var data = jsonDecode(message.body)
    if(data.eventType == 'SIGN_IN_CANCELLED'){
      //Cancel your login request
    }
    if(data.eventType == 'SIGN_IN_SUCCESS'){
      var sessionToken = data.sessionToken // the user session token
    }
  }
}
```

2. ANDROID. Add a Javascript Interface.
```java
class DcouponPostMessage(){
    @JavascriptInterface
    public boolean postMessage(String message) {
      // Received message from webview in native, process data/sessionToken
      var data = jsonDecode(message)
      if(data.eventType == 'SIGN_IN_CANCELLED'){
        //Cancel your login request
      }
      if(data.eventType == 'SIGN_IN_SUCCESS'){
        var sessionToken = data.sessionToken // the user session token
      }
    }
}

mWebViewComponent.settings.javaScriptEnabled = true
mWebViewComponent.addJavascriptInterface(DcouponPostMessage(),"DcouponPostMessage")
```

3. FLUTTER. Using webview_flutter plugin and JavascriptChannels.
```dart
JavascriptChannel _dcouponPostMessage(BuildContext context) {
  return JavascriptChannel(
    name: 'DcouponPostMessage',
    onMessageReceived: (JavascriptMessage message) {
      // Received message from webview in native, process data/sessionToken
      var data = jsonDecode(message.message)
      if(data.eventType == 'SIGN_IN_CANCELLED'){
        //Cancel your login request
      }
      if(data.eventType == 'SIGN_IN_SUCCESS'){
        var sessionToken = data.sessionToken // the user session token
      }
    },
  );
}
 
WebView(
    javascriptChannels: <JavascriptChannel>[
        _dcouponPostMessage(context),
    ].toSet(),
;
```

4. IONIC. Using inappbrowser plugin.

```javascript
this.inAppBrowserRef.on('message').subscribe((event) => {
  const postObject:any = event
  if(postObject.data){
    var data = jsonDecode(postObject.data)
    if(data.eventType == 'SIGN_IN_CANCELLED'){
      //Cancel your login request
    }
    if(data.eventType == 'SIGN_IN_SUCCESS'){
      var sessionToken = data.sessionToken // the user session token
    }
  }
})
```


