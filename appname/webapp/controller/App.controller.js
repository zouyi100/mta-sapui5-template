sap.ui.define([
	"./MyController"
], function (MyController) {
	"use strict";

	return MyController.extend("cn.bosch.template.controller.App", {
		onInit: function () {

		},

		// onLanguageSelectDialogShow: function (oEvent) {
		// 	const oButton = oEvent.getSource();
		// 	if (!this._actionSheet) {
		// 		this._actionSheet = sap.ui.xmlfragment(
		// 			"cn.bosch.template.fragment.LanguageList",
		// 			this
		// 		);
		// 		this.getView().addDependent(this._actionSheet);
		// 	}

		// 	this._actionSheet.openBy(oButton);
		// },

		// selectLanguage: function (oEvent) {
		// 	const local = oEvent.getSource().getId()
		// 	this.setAppLanguage(local)
		// }
	});
});