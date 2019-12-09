(function($) {
    'use strict';

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
                console.log('submit');
                var $table = $('[data-js="table"]').get();
                $table.appendChild(app.addToTable());
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

                return $fragment.appendChild($tr)
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
