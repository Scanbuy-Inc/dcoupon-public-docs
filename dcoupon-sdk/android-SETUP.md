# dcoupon_sdk_android_library

An Android library for dcoupon SDK. dcoupon SDK allows our clients to log in their users into the dcoupon service, so users can benefit from accessing dcoupon service from 3rd party apps, without needing to use an additional login for dcoupon.


## How to add the library to your Android project

1. Go to your app level [build.gradle] and add the following:

```groovy
//Add this
repositories {
    maven {
      url 'https://s3-eu-west-1.amazonaws.com/sdk.dcoupon.com/maven-repo'
    }
    maven {
        url 'https://storage.googleapis.com/download.flutter.io'
    }
}

...

dependencies {
    
    //Add this
    debugImplementation 'com.dcoupon.sdk.android_library:android_debug:<version>'
    releaseImplementation 'com.dcoupon.sdk.android_library:android_release:<version>'
}
```

## Set up Dcoupon SDK

**NOTE: Steps 1 & 2 are just orientative. You can load your JSON config in any way.**

1. Add a json file to your app res/raw folder with the following:
```json
{
  "com.dcoupon.sdk.ClientToken": "<YOUR_CLIENT_TOKEN_HERE>",
  "com.dcoupon.sdk.ClientSecretKey": "<YOUR_CLIENT_SECRET_KEY_HERE>",
  "com.dcoupon.sdk.ClientCountry": "<YOUR_CLIENT_COUNTRY_2_LETTER_CODE_HERE>",
  "com.dcoupon.sdk.ClientDomain": "<YOUR_CLIENT_DOMAIN_HERE>",
}
```

2. Read the json

```java
InputStream jsonStream = this.getResources().openRawResource(R.raw.your_json_name);
String jsonString = readJsonFile(jsonStream);
```

3. Configure the SDK with the json contents

```java
Dcoupon dcoupon = new Dcoupon();
dcoupon.loadConfig(jsonString);
```

## API reference

Go to [dcoupon SDK API reference](https://github.com/Scanbuy-Inc/dcoupon-public-docs/blob/master/dcoupon-sdk/APIREFERENCE.md)