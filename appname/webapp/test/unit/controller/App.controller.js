/*global QUnit*/

sap.ui.define([
	"cn/bosch/template/controller/App.controller"
], function (Controller) {
	"use strict";

	QUnit.module("App Controller");

	QUnit.test("I should test the App controller", assert => {
		const oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});