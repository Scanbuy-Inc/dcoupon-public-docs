# dcoupon_sdk_ios_framework

An iOS framework for dcoupon SDK. dcoupon SDK allows our clients to log in their users into the dcoupon service, so users can benefit from accessing dcoupon service from 3rd party apps, without needing to use an additional login for dcoupon.


## How to add the framework to your iOS project

1. If your existing application doesn’t already have a **Podfile**, follow the [CocoaPods getting started guide](https://guides.cocoapods.org/using/using-cocoapods.html) to add a **Podfile** to your project.

2. Add the following lines to your **Podfile**:
```ruby
target '<YourAppName>' do
...
    ## Works in simulator/real device
    pod 'dcouponSDK-debug', :configurations => ['Debug']

    ## ---- OR ----

    ## Works ONLY in real device
    pod 'dcouponSDK', :configurations => ['Release']
...
end
```
3. Run **pod install**.

## Set up Dcoupon SDK

**NOTE: Steps 1 & 2 are just orientative. You can load your JSON config in any way.**

1. Add a json file to your Assets with the following content: (To add a json file to the Assets. Click on Assets.xcassets -> Right click & New Data Set -> Drag & drop your json file in the created Data Set)

```json
{
  "com.dcoupon.sdk.ClientToken": "<YOUR_CLIENT_TOKEN_HERE>",
  "com.dcoupon.sdk.ClientSecretKey": "<YOUR_CLIENT_SECRET_KEY_HERE>",
  "com.dcoupon.sdk.ClientCountry": "<YOUR_CLIENT_COUNTRY_2_LETTER_CODE_HERE>",
  "com.dcoupon.sdk.ClientDomain": "<YOUR_CLIENT_DOMAIN_HERE>"
}
```

2. Read the json:
```swift
let asset = NSDataAsset(name: "DcouponSDKConfig", bundle: Bundle.main)
let json = try? JSONSerialization.jsonObject(with: asset!.data, options: JSONSerialization.ReadingOptions.allowFragments)
let jsonData =  try? JSONSerialization.data(withJSONObject: json, options: JSONSerialization.WritingOptions.prettyPrinted)
let jsonString = String(data: jsonData!, encoding: String.Encoding.utf8)     
```

3. Configure the SDK with the json contents:
```swift
var dcoupon : Dcoupon = Dcoupon()
dcoupon.loadConfig(jsonString: jsonString!)
```

## API reference

Go to [dcoupon SDK API reference](https://github.com/Scanbuy-Inc/dcoupon-public-docs/blob/master/dcoupon-sdk/APIREFERENCE.md)