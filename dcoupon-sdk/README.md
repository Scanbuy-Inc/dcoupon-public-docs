![Logo](https://s3.amazonaws.com/dcoupon.com/sdk/docs/dcouponLogo.png)

# dcoupon-sdk - Third Party dcoupon SDK

Document Date: July 2022

Latest SDK Version: 7.0.0

## Changelog

## 7.0.0

- **BREAKING**: Context is no longer needed for Dcoupon class.
- **BREAKING**: GetCategories has a lang parameter (required).

## 6.0.1

- CHANGE: Limit parameter is nullable now.

## 6.0.0

- **BREAKING**: Enrollment form has been removed.

## 5.1.0

- FEAT: Legal documents ids as arguments to login method to avoid enrollment form.

## 5.0.2

- FIX: Language in api calls.

## 5.0.1

- FIX: Enrollment form crash on CA, GL languages.

## 5.0.0

- CHANGE: Upgrade apis.

## 4.5.0

- FEAT: Add unregisterUser method.

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

The dcoupon SDK allows to log in client users into the dcoupon service, so users can benefit from accessing dcoupon service from 3rd party apps, without needing to use an additional authentication for dcoupon. 

**NOTE: A successful logIn call is necessary before calling some SDK methods. logIn calls does NOT persist after closing your app.**

All dcoupon users can provide the following information when registering:
- External identifier (MANDATORY)
- Referral code (OPTIONAL)

---

## How to set up dcoupon SDK

**Flutter**. If you want to set up dcoupon SDK on Flutter, visit [dcoupon Flutter Package](https://pub.dev/packages/dcoupon_sdk_flutter_package).

**Android**. If you want to set up dcoupon SDK on Android, visit [dcoupon Android Library](https://github.com/Scanbuy-Inc/dcoupon-public-docs/blob/master/dcoupon-sdk/android-SETUP.md).

**iOS**. If you want to set up dcoupon SDK on iOS, visit [dcoupon iOS Framework](https://github.com/Scanbuy-Inc/dcoupon-public-docs/blob/master/dcoupon-sdk/iOS-SETUP.md).


