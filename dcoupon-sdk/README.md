![Logo](https://s3.amazonaws.com/dcoupon.com/sdk/docs/dcouponLogo.png)

# dcoupon-sdk - Third Party SDK

Document Version 1.1 (September 2020)

## Introduction

The dcoupon SDK allows to log in client' users into the dcoupon service, so users can benefit from accessing dcoupon service from 3rd party apps, without needing to use an additional login for dcoupon

All dcoupon users must provide the following information when registering:
-	Alias/nickname
-	Email address
-   External identifier
-	Gender
-	Birthdate

and they need to accept the terms and conditions and the privacy policy of the service. The 3rd party app will be able to provide the user’s personal information through the SDK, so the user won’t need to enter it again. 

In the first access, the user will need to accept the legal documents and to fill in personal information (if that info was not provided by the 3rd party) or update this info. 

In future attempts, if any legal doc has changed, they will be prompted to accept those changes before proceeding.

---

## How to set up Dcoupon SDK

**Flutter**. If you want to set up Dcoupon SDK on Flutter, visit [Dcoupon Flutter Package](https://pub.dev/packages/dcoupon_sdk_flutter_package).

**Android**. If you want to set up Dcoupon SDK on Android, visit [Dcoupon Android Library](https://bintray.com/dcouponsdk/maven-dcoupon-sdk/android_library#read).

**iOS**. If you want to set up Dcoupon SDK on iOS, visit [Dcoupon iOS Framework](https://github.com/Scanbuy-Inc/dcoupon-public-docs/blob/master/dcoupon-sdk/iOS-SETUP.md).


