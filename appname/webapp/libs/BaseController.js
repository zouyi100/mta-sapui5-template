sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	// @ts-ignore
	const $ = jQuery;

	const devMode = true;

	const authToken = {
		Authorization: ""
	};

	return Controller.extend("cn.bosch.TestDataManagementFrontend.libs.BaseController", {
		/**
		 * Convenience method for accessing the router in every controller of the application.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		/**
		 * Convenience method for getting the view model by name in every controller of the application.
		 * @public
		 * @param {string} sName the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model in every controller of the application.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.core.mvc.View} the view instance
		 */
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Convenience method for getting the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Event handler for navigating back.
		 * It there is a history entry we go one step back in the browser history
		 * If not, it will replace the current entry of the browser history with the master route.
		 * @public
		 */
		onNavBack: function () {
			let sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("master", {}, true);
			}
		},

		/**
		 * Function for change application language.
		 * Paramter local is one of [zh, de, en ...]
		 * If you do not use the function, the language will be user's system language.
		 * Default value is 'en' if you do not pass a local string.
		 * @public
		 * @param { string } local - i18n [zh, de, en]
		 */
		setAppLanguage: function (local = "en") {
			sap.ui.getCore().getConfiguration().setLanguage(local);
		},

		$http: {
            /**
             * 
             * @param { string } url - http request remote url
             * @param { array } path - request parameter in path seperate by /
             * @param { object } params - params in key-value format
             * @param { object } header - customer request header in key-value format
             * @returns { Promise } http request promise
             */
			get: function (url, path, params, header) {
				url = this._spliceURL(url, path, params);
				header = this._mergeHeader(header);
				return new Promise((resolve, reject) => {
					$.ajax({
						url: url,
						type: "GET",
						headers: header,
						success: res => {
							let code = res.code + "";
							if (typeof (res.code) == "undefined") {
								resolve(res);
							} else if (code[0] == "2") {
								resolve(res.data);
							} else {
								reject(res);
							}

						},
						error: res => {
							reject(res);
						}
					});
				});
			},

            /**
             * 
             * @param { string } url - http request remote url
             * @param { array } path - request parameter in path seperate by /
             * @param { object } params - params in key-value format
             * @param { any } body - request body
             * @param { object } header - customer request header in key-value format
             * @returns { Promise } http request promise
             */
			post: function (url, path, params, body, header) {
				url = this._spliceURL(url, path, params);
				header = this._mergeHeader(header);
				return new Promise((resolve, reject) => {
					$.ajax({
						url: url,
						type: "POST",
						headers: header,
						data: JSON.stringify(body),
						success: res => {
							let code = res.code + "";
							if (typeof (res.code) == "undefined") {
								resolve(res);
							} else if (code[0] == "2") {
								resolve(res.data);
							} else {
								reject(res);
							}
						},
						error: res => {
							reject(res);
						}
					});
				});
			},

            /**
             * 
             * @param { string } url - http request remote url
             * @param { any } fileobj - request fileobj
             * @returns { Promise } http request promise
             */
			postFile: function (url, fileobj) {
				const fd = new FormData();
				for (let key in fileobj) {
					fd.append(key, fileobj[key]);
				}
				return new Promise((resolve, reject) => {
					$.ajax({
						method: "POST",
						data: fd,
						url: url,
						processData: false,
						contentType: false,
						success: res => {
							let code = res.code + "";
							if (typeof (res.code) == "undefined") {
								resolve(res);
							} else if (code[0] == "2") {
								resolve(res.data);
							} else {
								reject(res);
							}
						},
						error: res => {
							reject(res);
						}
					});
				});
			},

            /**
             * 
             * @param { string } url - http request remote url
             * @param { array } path - request parameter in path seperate by /
             * @param { object } params - params in key-value format
             * @param { any } body - request body
             * @param { object } header - customer request header in key-value format
             * @returns { Promise } http request promise
             */
			patch: function (url, path, params, body, header) {
				url = this._spliceURL(url, path, params);
				header = this._mergeHeader(header);
				return new Promise((resolve, reject) => {
					$.ajax({
						url: url,
						type: "PATCH",
						headers: header,
						data: JSON.stringify(body),
						success: res => {
							let code = res.code + "";
							if (typeof (res.code) == "undefined") {
								resolve(res);
							} else if (code[0] == "2") {
								resolve(res.data);
							} else {
								reject(res);
							}
						},
						error: res => {
							reject(res);
						}
					});
				});
			},

            /**
             * 
             * @param { string } url - http request remote url
             * @param { array } path - request parameter in path seperate by /
             * @param { object } params - params in key-value format
             * @param { any } body - request body
             * @param { object } header - customer request header in key-value format
             * @returns { Promise } http request promise
             */
			delete: function (url, path, params, body, header) {
				url = this._spliceURL(url, path, params);
				header = this._mergeHeader(header);
				return new Promise((resolve, reject) => {
					$.ajax({
						url: url,
						type: "DELETE",
						headers: header,
						data: JSON.stringify(body),
						success: res => {
							let code = res.code + "";
							if (typeof (res.code) == "undefined") {
								resolve(res);
							} else if (code[0] == "2") {
								resolve(res.data);
							} else {
								reject(res);  // code: 301, msg: "aaa"
							}
						},
						error: res => {
							reject(res);
						}
					});
				});
			},

			_spliceURL: function (url, path, params) {
				for (let e in path) {
					url += ("/" + encodeURIComponent(path[e]));
				}
				url += "?";
				for (let e in params) {
					if (typeof (params[e]) === "object") {
						let t = params[e];
						for (let p in t) {
							url += (e + "=" + encodeURIComponent(t[p]) + "&");
						}
					} else {
						url += (e + "=" + encodeURIComponent(params[e]) + "&");
					}
				}
				if (url.endsWith('?') || url.endsWith('&')) {
					url = url.slice(0, -1);
				}
				return url;
			},

			_mergeHeader: function (h) {
				let header = h || {};
				if (devMode) {
					header["Authorization"] = authToken.Authorization;
				}
				if (!header.hasOwnProperty("Content-Type")) {
					header["Content-Type"] = "application/json";
				}
				return header;
			}
		},

        /**
         * 
         * @param { string } name - Cookie key
         * @param { string } value - Cookie value 
         * @param { number } days - expire day
         */
		setCookie: function (name, value, days) {
			let expires = "";
			if (days) {
				let date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toUTCString();
			}
			document.cookie = name + "=" + (value || "") + expires + "; path=/";
		},

        /**
         * 
         * @param { string } name - Cookie key
         * @returns { string } Cookie value
         */
		getCookie: function (name) {
			let nameEQ = name + "=";
			let ca = document.cookie.split(';');
			for (let i = 0; i < ca.length; i++) {
				let c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		},

        /**
         * 
         * @param { string } name - Cookie key
         */
		eraseCookie: function (name) {
			document.cookie = name + '=; Max-Age=-99999999;';
		}

	});
});