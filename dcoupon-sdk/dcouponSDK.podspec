Pod::Spec.new do |s|
  s.name                  = 'dcouponSDK'
  s.version               = '1.0.0' # 1.0.0
  s.summary               = 'dCouponSDK Framework'
  s.license               = { :type => 'MIT' }
  s.description           = <<-DESC
dCoupon SDK for third-party mobile apps
DESC
  s.homepage              = 'https://github.com/Scanbuy-Inc/dcoupon-public-docs/blob/master/dcoupon-sdk-doc.md'
  s.author                = { 'dCoupon Dev Team' => 'sdk@dcoupon.com' }
  s.source                = { :http => 'https://s3-eu-west-1.amazonaws.com/sdk.dcoupon.com/dcouponSDK.zip' }
  s.documentation_url     = 'https://github.com/Scanbuy-Inc/dcoupon-public-docs/blob/master/dcoupon-sdk-doc.md'
  s.platform              = :ios, '11.0'
  s.vendored_frameworks   = 'dcouponSDK.framework', 'Flutter.framework', 'App.framework'
end
