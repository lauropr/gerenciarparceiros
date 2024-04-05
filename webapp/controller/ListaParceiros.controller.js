sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("z99.gerenciarparceiros.controller.ListaParceiros", {
            onInit: function () {

            },

            aoSelecionarParceiro: function(oEvent){
                //resgata o item clicado
                let oItem = oEvent.getParameters().listItem;

                //usa o contexto de binding pra acessar o item no modelo principal
                let oItemDoModelo = oItem.getBindingContext().getObject();
                
                //guarda o ID do parceiro para usar na navegação
                let IdDoParceiro = oItemDoModelo.PartnerId;

                //realiza a navegação
                let oRoteador = this.getOwnerComponent().getRouter();

                oRoteador.navTo("RouteDetalheParceiro", {
                    PartnerId: IdDoParceiro
                });
            }
        });
    });
