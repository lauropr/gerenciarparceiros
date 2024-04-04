/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "z99/gerenciarparceiros/model/models",
        "sap/ui/model/json/JSONModel"
    ],
    function (UIComponent, Device, models, JSONModel) {
        "use strict";

        return UIComponent.extend("z99.gerenciarparceiros.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                //cria modelo de Layout para o Flexible Column Layout
                let oModeloLayout = new JSONModel();

                //cria uma propriedade que está vinculada na App.view.xml e associa o valor OneColumn
                //para iniciar o app com apenas uma coluna visível
                oModeloLayout.setProperty("/modoDeExibicao", "OneColumn");

                //associa o modelo no Component.js com o nome layout
                this.setModel(oModeloLayout, "layout");



            }
        });
    }
);