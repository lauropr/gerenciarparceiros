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
                //limpa o modelo de novos dados
                let oModeloNovoParceiro = this.getOwnerComponent().getModel("novoParceiro");
                
                //passa o caminho raiz com o "/" com um objeto vazio para efetuar a limpeza
                oModeloNovoParceiro.setProperty("/", {});

                let oRoteador = this.getOwnerComponent().getRouter();
                oRoteador.navTo("RouteListaParceiros");
            },

            aoSalvar: function(){
                let oDados = {};

                //Resgatar os dados do modelo e formatar como um objeto (payload)
                let oDadosOriginais = this.getOwnerComponent().getModel("novoParceiro").getProperty("/");

                //resgata o modelo OData
                let oModel = this.getOwnerComponent().getModel();

                //efetua a chamada Create 
                oModel.setHeaders({ 'X-Requested-With': 'X'});

                oDados.PartnerType = oDadosOriginais.PartnerType;
                oDados.PartnerName1 = oDadosOriginais.PartnerName1;
                oDados.PartnerName2 = oDadosOriginais.PartnerName2;
                oDados.SearchTerm1 = oDadosOriginais.SearchTerm1;
                oDados.SearchTerm2 = oDadosOriginais.SearchTerm2;
                oDados.Street= oDadosOriginais.SearchTerm2;
                oDados.HouseNumber = oDadosOriginais.HouseNumber;
                oDados.District = oDadosOriginais.District;
                oDados.City = oDadosOriginais.City;
                oDados.Region = oDadosOriginais.Region;
                oDados.ZipCode = oDadosOriginais.ZipCode;
                oDados.Country = oDadosOriginais.Country;

                oModel.create("/Parceiros", oDados, {
                    success: oResult => {
                        //monta a mensagem de sucesso
                        let oModeloi18n = this.getOwnerComponent().getModel("i18n");
                        let oModeloBundle = oModeloi18n.getResourceBundle();

                        let sMsg = oModeloBundle.getText("createSucesso1") + " " +
                                   oResult.PartnerId + " " +  
                                   oModeloBundle.getText("createSucesso2");
                        
                        MessageToast.show(sMsg);

                    },
                    error: oError => {
                        //Mensagem bloqueando acesso para forçar user a ler o erro
                        let oErro = JSON.parse(oError.responseText);
                        MessageBox.error(oErro.error.message.value);
                    }
                });
            },

            aoEscolherCategoria: function(oEvent){
                //resgata o item selecionado
                let oItem = oEvent.getParameters().selectedItem;

                let oModel = this.getOwnerComponent().getModel("novoParceiro");
                oModel.setProperty("/PartnerType", oItem.getBindingContext("novoParceiro").getObject().PartnerType);
            }

            

        });
    });
