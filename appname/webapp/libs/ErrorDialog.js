sap.ui.define([
    'sap/m/Dialog',
    'sap/m/Text',
    'sap/m/Button'
], function(Dialog, Text, Button) {
    'use strict';
    
    return {
        __DEFAULTMSG: {
            "000": `Please try again later`
        },

        /**
         * 
         * @param {object} err  http response
         * @returns {void} open the error dialog
         */
        open: function (e) {
            // change to string or '000' if no err code
            let code = `${e.code}` || "000"; 
            let msg = e.msg || this.__DEFAULTMSG[code];
            const dialog = new Dialog({
                title: `Message: Error Code ${code}`,
				type: "Message",
				content: new Text({
                    text: msg
				}),
				endButton: new Button({
					text: 'Close',
					press: () => {
                        dialog.close();
                    }
				}),
				afterClose: function() {
					dialog.destroy();
				}
            })
            dialog.open();
        }
    }
});