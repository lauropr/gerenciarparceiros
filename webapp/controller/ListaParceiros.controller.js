sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
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
            },

            aoCriarParceiro: function(){
                //resgata o Roteador
                let oRoteador = this.getOwnerComponent().getRouter();

                //navega para a rota de criação
                oRoteador.navTo("RouteNovoParceiro");
            },

            aoPesquisarParceiro: function(oEvent){

                //resgata a string de pesquisa
                let sPesquisa = oEvent.getParameters().query;

                //resgata a Lista
                let oLista = this.getView().byId("listaParceiros");

                //acessa o objeto de binding da lista
                let oBinding = oLista.getBinding("items");

                let aFilters = [];
                aFilters.push( new Filter({
                    path: "PartnerId",
                    operator: FilterOperator.Contains,
                    value1: sPesquisa,
                    and: false
                }));

                //efetua a pesquisa
                oBinding.filter(aFilters);
            }
        });
    });
