![Logo](https://s3.amazonaws.com/dcoupon.com/sdk/docs/dcouponLogo.png)

# dcoupon-sdk - Third Party dcoupon SDK

Document Date: November 2021

Latest SDK Version: 4.0.1

## Changelog

# 4.0.1

- **BREAKING CHANGE**: publisherId param has been renamed to publisherToken

## Introduction

The dcoupon SDK allows to log in client' users into the dcoupon service, so users can benefit from accessing dcoupon service from 3rd party apps, without needing to use an additional login for dcoupon.

All dcoupon users must provide the following information when registering:
- External identifier (MANDATORY)
- Referral code (OPTIONAL)

and they need to accept the terms and conditions and the privacy policy of the service.

In the first access, the user will need to accept the legal documents. 

In future attempts, if any legal doc has changed, they will be prompted to accept those changes before proceeding.

---

## How to set up dcoupon SDK

**Flutter**. If you want to set up dcoupon SDK on Flutter, visit [dcoupon Flutter Package](https://pub.dev/packages/dcoupon_sdk_flutter_package).

**Android**. If you want to set up dcoupon SDK on Android, visit [dcoupon Android Library](https://github.com/Scanbuy-Inc/dcoupon-public-docs/blob/master/dcoupon-sdk/android-SETUP.md).

**iOS**. If you want to set up dcoupon SDK on iOS, visit [dcoupon iOS Framework](https://github.com/Scanbuy-Inc/dcoupon-public-docs/blob/master/dcoupon-sdk/iOS-SETUP.md).


