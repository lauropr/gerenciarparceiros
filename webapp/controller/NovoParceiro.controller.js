sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    'sap/m/MessageBox'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("z99.gerenciarparceiros.controller.NovoParceiro", {
            onInit: function () {
                //resgata o roteador
                let oRoteador = this.getOwnerComponent().getRouter();

                //intercepta a rota de detalhe com uma função para o evento Pattern Matched
                let oRotaDesejada = oRoteador.getRoute("RouteNovoParceiro");
                oRotaDesejada.attachPatternMatched(this.rotaNovoParceiro, this);

            },
            rotaNovoParceiro: function(oEvent){

            },

            aoCancelar: function(){

            },

            aoSalvar: function(){

            }

            

        });
    });
