![Logo](https://s3.amazonaws.com/dcoupon.com/sdk/docs/dcouponLogo.png)

# dcoupon-sdk - Third Party dcoupon SDK

Document Date: May 2022

Latest SDK Version: 4.4.2

## Changelog


## 4.4.2

- CHANGE: Remove loyalty card number from add/update request.
- CHANGE: Legal docs are shown in webview now.

## 4.3.0

- **BREAKING**: Loyalty card addUpdateLoyaltyCard params changed.

## 4.2.1

- CHANGE: Enrollment form localizations.

## 4.2.0

- CHANGE: Rework all the legal docs enrollment form UI.

## 4.1.1

- FEAT: Add PT localization.

# 4.1.0

- CHANGE: createCoupons parameters (utmSource & saveMethod)

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


