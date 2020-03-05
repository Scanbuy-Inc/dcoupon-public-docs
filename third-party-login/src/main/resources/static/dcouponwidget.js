/*! dcouponwidget - v1.0.1 - 2016-08-03
 * Copyright (c) Scanbuy Retail 2016-2020 */
(function($) {

	$.fn.dcouponWidget = function(options) {

		return this.each(function() {
			$.dcouponWidget(this, options);
		});
	};

	function Dcoupon(placeholder, options) {
		if (options) {
			this.iframeSrc = options.src;
			this.display = options.display || 'out';
			this.uid = options.uid || '';// TODO: add random UID I
			this.originDomain = options.originDomain || window.location.host;
			this.myParentElement = placeholder[0] || document.body;
			this.clearListeners();

			if (options.ssoTokenCallback) {
				this.ssoTokenCallback = options.ssoTokenCallback;
				console.log("ssoTokenCallback set");
			}
			if (options.logoutCallback) {
				this.logoutCallback = options.logoutCallback;
				console.log("logoutCallback set");
			} else {
				console.log("logoutCallback empty");
				this.logoutCallback = function() {
				};
			}
			if (options.appReadyCallback) {
				this.appReadyCallback = options.appReadyCallback;
				console.log("appReadyCallback set");
			} else {
				console.log("appReadyCallback empty");
				this.appReadyCallback = function() {
				};
			}
			if (options.thirdPartyCallback) {
				this.thirdPartyCallback = options.thirdPartyCallback;
				console.log("thirdPartyCallback set");
			} else {
				console.log("thirdPartyCallback empty");
				this.thirdPartyCallback = function() {
				};
			}
			if (options.legalAcceptanceRequired) {
				this.legalAcceptanceRequired = options.legalAcceptanceRequired;
				console.log("legalAcceptanceRequired set");
			} else {
				console.log("legalAcceptanceRequired empty");
				this.legalAcceptanceRequired = function() {
				};
			}
		}
	}

	Dcoupon.prototype.initListener = function() {
		var that = this;
		console.log("initListener called");
		$(window).on("message", function(e) {
			console.log("processing event 'on message'");
			that.processEvents(e);
		});
	};

	Dcoupon.prototype.processEvents = function(event) {		
		if (!event.originalEvent) {
			return;
		}
		if (!event.originalEvent.origin) {
			return;
		}

		if (event.originalEvent.origin.indexOf("ui.dcoupon.com") < 0) {
			console.log("testing domain origin...");
		}

		if (this.ssoToken == event.originalEvent.data.ssoToken && (event.originalEvent.data.ssoToken)) {
			// Do nothing same ssoToken stored
		} else {

			this.ssoToken = event.originalEvent.data.ssoToken;

			var eventData = event.originalEvent.data;

			switch (eventData.eventType) {
				case "LOGIN" :
					console.log("login ok");
					this.ssoToken = eventData.ssoToken;
					this.ssoTokenCallback(eventData);
					break;
				case "LOGOUT" :
					console.log("logout ok");
					this.ssoToken = null;
					this.logoutCallback("LOGOUT");
					break;

				case "APP_READY" :
					console.log("appready ok");
					this.appReadyCallback(this);
					break;
				case "THIRDPARTY_LOGIN_CALLBACK" :
					console.log("thirdpartycallback ok");
					this.thirdPartyCallback(eventData, this);
					break;
				case "LEGAL_ACCEPTANCE_REQUIRED" :
					console.log("legalacceptreq ok");
					this.legalAcceptanceRequired(eventData, this);
					break;
				default :
					eventCallbacks.forEach(function(callback) {
						callback(eventData);
					});
					break;
			}
		}
	};

	var eventCallbacks = [];

	// iniz function
	Dcoupon.prototype.init = function() {
		this.initListener();
	};

	Dcoupon.prototype.registerListener = function(callback) {
		// register the callback.. to be call when a SSSo message is received
		eventCallbacks.push(callback);
		console.log("pushing callback");

	};

	/**
	 * Create a Login/Account Button, for a popup.
	 */
	Dcoupon.prototype.createButton = function() {

	};

	/**
	 * Just embed the iframe only.
	 */
	Dcoupon.prototype.createIFrame = function() {
		this.iframe = document.createElement("iframe");
		this.iframe.id = "dcoupon-login-iframe";
		// '&uid='+this.uid+
		this.iframe.src = this.iframeSrc + '&display=' + this.display + '&originDomain=' + this.originDomain;
		// this.iframe.frameBorder = 0;
		// this.iframe.width = this.myParentElement.offsetWidth+"px";
		// this.iframe.height = this.myParentElement.offsetHeight+"px";

		this.myParentElement.appendChild(this.iframe);
		console.log("iframe created");

	};

	Dcoupon.prototype.clearListeners = function() {
		// register the callback.. to be call when a SSSo message is received
		eventCallbacks = [];
	};
	Dcoupon.prototype.loginWithToken = function(jwtToken, targetDomain) {
		console.log("posting message loginWithToken");

		// Send postMessage to Login With Token.
		this.iframe.contentWindow.postMessage({
			action : "TokenLogin",
			jwt : jwtToken
		}, targetDomain);
	};
	
	Dcoupon.prototype.loginButtonClicked = function(targetDomain) {
		console.log("loginButtonClicked");
		this.iframe.contentWindow.postMessage(
			      { action:"loginButtonClicked"},targetDomain);
	};

	/*
	 * send third party data after successful login to register/login user and send back jwt example facebook login data = { accessToken: <accessToken with
	 * permissions(email,public_profile,user_birthday)> }; thirdPartyType = 'FACEBOOK'
	 */
	Dcoupon.prototype.thirdPartyRelay = function(data, thirdPartyType, targetDomain) {
		console.log(data, thirdPartyType, targetDomain);
		this.iframe.contentWindow.postMessage({
			action : "THIRDPARTY_RELAY_DATA",
			data : data,
			thirdPartyType : thirdPartyType
		}, targetDomain);
	};

	Dcoupon.prototype.reloadIframe = function() {

	};

	Dcoupon.prototype.setUID = function(uid) {
		this.uid = uid;

	};

	$.dcouponWidget = function(placeholder, options) {
		return new Dcoupon($(placeholder), options);

	};
	$.dcouponWidget.version = "0.0.2";

}(jQuery));
