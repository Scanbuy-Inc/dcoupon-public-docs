![Logo](https://s3.amazonaws.com/dcoupon.com/sdk/docs/dcouponLogo.png)

# dcoupon Third Party Login API

Version 4.0 (July 2022)


## Introduction

The dcoupon 3rd Party Login API allows Scanbuy's corporate clients to log in their users into the dcoupon Platform, so users can benefit from accessing dcoupon services from 3rd party websites, without needing to use an additional login for dcoupon.

After successfully calling the 3rd Party Login API, clients will receive a JSON Web Token, which is valid for accessing the dcoupon Platform.

All requests to the dcoupon Platform must be signed with a secret, which is provided by dcoupon.

## API response

The API will return a HTTP 200 response code, together with a json body.
A valid JSON Web Token is available inside the field 'sessionToken'. This token should be used in all subsequent calls to the dcoupon Platform.

## API description

The API consists of a single URL that handles registration and login. This endpoint must be called every time a valid access token to the dcoupon Platform should be obtained.
The endpoint is in the form:

+ POST https://endpoint-url/thirdparty/v4/login

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
    "referralCode": "DC-AA18976"
  }
}
```

###### Responses

| Response     | StatusCode | Description                                    |
| ------------ | :--------: | ---------------------------------------------- |
| Success      |    200     | "OK"                                           |
| Unauthorized |    401     | "Unauthorized"                                 |
| Bad request  |    404     | "Missing parameters"                           |
| Error        |    500     | "Internal Server Error"                        |

examples:

**Status code 200**

```json
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json; charset=utf-8",
  },
  "body": {
    "message": "OK",
    "sessionToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1Yjk0MjVkMC01YWZjLTQ2YmMtYmI5Ni0zYjIwMzAwNTNiOWEiLCJpc3MiOiJkY291cG9uLmNvbSIsImlhdCI6MTYyNTU2NDY0MiwiZXhwIjoxNjU3MTAwNjQyLCJzdWIiOjcyNywiY2xpZW50QXBpS2V5IjoieDN2eXI4aWNuMDgxbWxycnIwcm4iLCJleHRlcm5hbElkIjoiZmx1dHRlci1leGFtcGxlLWV4dGVybmFsSWQiLCJsdCI6WyI2MGI4NTBlNjNkNDY3ZjliMjIwNTQwZTM3ZDUyYWU2MSIsImEyYzcwNmMzYzRjMTNiNzlmMzFiNGI3YWVmN2YxYmIzIl0sImVtYWlsIjoiUUlxVFF3V1gyUXk4blczNlhRSTNzclpvTkdiRERTUDBmcVNyUVM5RTFQckR1TC9PYmM2dHpzM2lqWVZIdWZiYiJ9.woQMXwByx32YQyWIOu-avx84n_FHSoLFPA4OIXx1sc8"
  }
}
```


## Signing requests

All request must be signed using UTF-8 encoding and the HmacSHA256 algorithm. The signed string should be:
```
<API_KEY>:<timestamp>
```

_timestamp_ should be in the form "yyyy-MM-dd'T'HH:mm:ssZ", and is the timestamp at the moment of the request.
The string should be signed using the client's API secret provided by dcoupon.


## JWT Expiration

A brief examination of the JWT token will determine if the token is already expired or not. Check the 'exp' field inside the payload section of the JWT for expiration. If the JSON Web Token is expired, a new one can be obtained by calling the login endpoint (see above, _API description_).
