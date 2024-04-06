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
            },

            aoEditar: function(){
                //resgata o modelo "modo"
                let oModeloModo = this.getOwnerComponent().getModel("modo");                

                //alterar o valor para true (habilitar os campos pra edição)
                oModeloModo.setProperty("/editavel", true);

                //resgata a view
                let oView = this.getView();
                //resgata o botao cancelar da view
                let oBotaoCancelar = oView.byId("botaoCancelar");
                //habilita o botão de cancelamento
                oBotaoCancelar.setVisible();

                 //resgata o botao Salvar e mostra na tela. A variável do botao foi omitida para simplificar
                //a corrente de chamadas
                oView.byId("botaoSalvar").setVisible();

                //esconde o botao Editar no modo de edição
                oView.byId("botaoEditar").setVisible(false);

               
            },

            aoCancelar: function(){

                //resgata a view
                let oView = this.getView();

                //resgata o botao cancelar da view
                let oBotaoCancelar = oView.byId("botaoCancelar");
                oBotaoCancelar.setVisible(false);
                
                //resgata o modelo "modo"
                let oModeloModo = this.getOwnerComponent().getModel("modo");                
                //alterar o valor para true (habilitar os campos pra edição)
                oModeloModo.setProperty("/editavel", false);

                //reabilita o botao de Editar em modo de visualização
                oView.byId("botaoEditar").setVisible();

                //desabilita o botão salvar em modo de visualização
                oView.byId("botaoSalvar").setVisible(false);


                //cancela as alterações no modelo
                let oModelo = this.getOwnerComponent().getModel();
                oModelo.resetChanges();

            },

            aoSalvar: function(){

                this.getView().setBusy(true);

                //resgata os dados editados
                let oDados = this.getView().getBindingContext().getObject();

                //resgata o caminho para montar a requisição PUT
                let sCaminho = this.getView().getBindingContext().getPath();

                //resgata o modelo OData para a requisição PUT
                let oModel = this.getOwnerComponent().getModel();
                
                oModel.setHeaders({ 'X-Requested-With': 'X'});
                oModel.sDefaultUpdatedMethod = "PUT";

                let oModeloi18n = this.getOwnerComponent().getModel("i18n");
                let oModeloBundle = oModeloi18n.getResourceBundle();

                //formata a mensagem de sucesso
                var sMsgSucesso = oModeloBundle.getText("updateSucesso1") + " " +
                                  oDados.PartnerId + " " +
                                  oModeloBundle.getText("updateSucesso2");


                oModel.update(sCaminho, oDados, {
                    success: oResult => {
                        //Mensagem rápida na tela sem bloquear acesso
                        MessageToast.show(sMsgSucesso);

                        this.getView().setBusy(false);
                    },
                    error: oError => {
                        this.getView().setBusy(false);

                        //Mensagem bloqueando acesso para forçar user a ler o erro
                        let oErro = JSON.parse(oError.responseText);
                        MessageBox.error(oErro.error.message.value);
                    }
                    // success: function(oResult){
                    // }.bind(this),

                    // error: function(oError){
                    // }.bind(this)
                });



            }

            

        });
    });
