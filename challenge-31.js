(function($) {
    'use strict';

    /*
    Vamos estruturar um pequeno app utilizando módulos.
    Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
    A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
    seguinte forma:
    - No início do arquivo, deverá ter as informações da sua empresa - nome e
    telefone (já vamos ver como isso vai ser feito)
    - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
    um formulário para cadastro do carro, com os seguintes campos:
      - Imagem do carro (deverá aceitar uma URL)
      - Marca / Modelo
      - Ano
      - Placa
      - Cor
      - e um botão "Cadastrar"

    Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
    carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
    aparecer no final da tabela.

    Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
    empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
    Dê um nome para a empresa e um telefone fictício, preechendo essas informações
    no arquivo company.json que já está criado.

    Essas informações devem ser adicionadas no HTML via Ajax.

    Parte técnica:
    Separe o nosso módulo de DOM criado nas últimas aulas em
    um arquivo DOM.js.

    E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
    que será nomeado de "app".
    */

    var app = (function (){
        return{
            init: function() {
                this.companyInfos();
                this.initEvents();
            },

            initEvents: function initEvents(){
                $('[data-js="register"]').on('submit', this.submit);
            },

            submit: function submit(e){
                e.preventDefault();
                var $table = $('[data-js="table"]').get();
                $table.appendChild(app.addToTable());
                app.removeCar();
            },

            addToTable: function addToTable(){
                var $fragment = document.createDocumentFragment();
                var $tr = document.createElement('tr');
                var $tdImage = document.createElement('td');
                var $image = document.createElement('img');
                var $tdModel = document.createElement('td');
                var $tdYear = document.createElement('td');
                var $tdPlate = document.createElement('td');
                var $tdColor = document.createElement('td');       
                
                $image.setAttribute('src', $('[data-js="image"]').get().value);
                $tdImage.appendChild($image);

                $tdModel.textContent = $('[data-js="model"]').get().value;
                $tdYear.textContent = $('[data-js="year"]').get().value;
                $tdPlate.textContent = $('[data-js="plate"]').get().value;
                $tdColor.textContent = $('[data-js="color"]').get().value;

                $tr.appendChild($tdImage);
                $tr.appendChild($tdModel);
                $tr.appendChild($tdYear);
                $tr.appendChild($tdPlate);
                $tr.appendChild($tdColor);
                $tr.appendChild(app.createButton());
    
                return $fragment.appendChild($tr)
            },

            createButton: function createButton(){
                var $td = document.createElement('td');
                var $button = document.createElement('button');
                var $text = document.createTextNode("X");
                $button.setAttribute('data-js','remove');
                $button.appendChild($text);
                $td.appendChild($button);
                return $td;
            },

            removeCar: function removeCar(){
                var $buttons = $('[data-js="remove"]');

                $buttons.forEach(function(element) {
                    element.addEventListener('click', app.removeLine, false); 
                })
            },

            removeLine: function removeLine(){                
                var $tabel = this.parentNode.parentNode.parentNode;
                var $line = this.parentNode.parentNode;
                $tabel.removeChild($line);
            },

            companyInfos: function companyInfos(){
                var ajax = new XMLHttpRequest();
                ajax.open('GET','/company.json',true);
                ajax.send();
                ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
            },

            getCompanyInfo: function getCompanyInfo(){
                if(this.readyState === 4 && this.status === 200){
                   var data = JSON.parse(this.responseText);
                   var $name = $('[data-js="name"]');
                   var $phone = $('[data-js="phone"]')

                   $name.get().textContent = data.name;
                   $phone.get().textContent = data.phone;
                }
                return;
            }

        };

    })();

    app.init();

})(window.DOM);
