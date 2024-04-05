sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("z99.gerenciarparceiros.controller.DetalheParceiro", {
            onInit: function () {

                //resgata o roteador
                let oRoteador = this.getOwnerComponent().getRouter();

                //intercepta a rota de detalhe com uma função para o evento Pattern Matched
                let oRotaDesejada = oRoteador.getRoute("RouteDetalheParceiro");
                oRotaDesejada.attachPatternMatched(this.rotaDetalhe, this);

            },

            rotaDetalhe: function(oEvent){

                //resgata a view
                let oView = this.getView();

                //resgata o Id do parceiro da URL
                let sIdParceiro = oEvent.getParameters().arguments.PartnerId;

                //resgata o modelo principal sem nome 
                let oModel = oView.getModel();

                //monta o caminho do modelo com a chave e a entidade desejada
                let sCaminho = oModel.createKey("/Parceiros", {
                    PartnerId: sIdParceiro
                });

                //associa o READ com a view para disponibilizar os campos do parceiro para a view xml
                oView.bindElement({
                    path: sCaminho
                });

            }
        });
    });
