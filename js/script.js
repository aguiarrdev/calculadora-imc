//busca elementos HTML
var ageElement = document.querySelector('#age');
var heightElement = document.querySelector('#height');
var weightElement = document.querySelector('#weight');
var sexElement = document.querySelector('#sex');
var message = document.querySelector('.message');
var resultDiv = document.querySelector('.result-div');
var resultMessage = document.querySelector('#imc-message');
var resultImc = document.querySelector('#result-span');
var closePopUp = document.querySelector('.a-result-div');
var button = document.querySelector('#btn');

//tablema de imc masculina adulto
const mascTable = {
    low: [ 0,20.7 ],
    ideal: [ 20.8, 26.4 ],
    plusWeight: [ 26.5, 27.8 ],
    overweight: [ 28.0, 31.1 ],
    obesity: [ 31.2, 100 ]
}

//tablema de imc feminina adulto
const femTable = {
    low: [  0, 19.1 ],
    ideal: [ 19.2, 25.8 ],
    plusWeight: [ 25.9, 27.3 ],
    overweight: [ 27.4, 32.3 ],
    obesity: [ 32.4, 100.0 ]
}

//tablema de imc idoso adulto
const oldTable = {
    low: [  0, 22.0 ],
    ideal: [ 22.1, 27.0 ],
    overweight: [ 27, 100 ],
}

//adiciona evento de click no botão de fechar
closePopUp.addEventListener( "click", () => {
    resultDiv.style.display = "none";
});

//adiciona evento de click no botão de calcular
button.addEventListener( "click", () => {

    message.innerText = " ";

    var fields = verifyFields();
    if ( !fields ) return;

    var imc = calcImc( fields[2], fields[1] );

    var result = verifyImc( fields[3], fields[0], imc );

    if ( result ) {

        result = translateMessage(result);
        displayMessage( result, imc );
    }

});

//mostra a mensagem de resultado
function displayMessage( result, imc ) {
    resultImc.innerText = imc;
    resultMessage.innerText = result;

    resultDiv.style.display = "flex";
}

//Troca o nome do resultado que ira aparece na mensagem
function translateMessage( result ) {

    switch (result) {

        case "low":
            return "Abaixo do peso";

        case "ideal":
            return "Peso ideal";

        case "plusWeight":
            return "Pouco acima do peso";

        case "overweight":
            return "Acima do peso";

        case "obesity":
            return "Obesidade";
    
        default:
            message.innerText = "Internal Error!"
            break;
    }
}

// verifica qual das tabelas de IMC o usuário se enquadra
function verifyImc( sex, age, imc ) {

    let result;
    
    if ( age >= 60 ) {
        Object.entries(oldTable).forEach(([key, value]) => {
            if ( imc >= value[0] && imc <= value[1] ) {
                result = key;
            }
        });
        return result;
    }

    switch (sex) {
        case "masc":
            Object.entries(mascTable).forEach(([key, value]) => {
                if ( imc >= value[0] && imc <= value[1] ) {
                    result = key;
                }
            });
            return result;

        case "fem":
            Object.entries(femTable).forEach(([key, value]) => {
                if ( imc >= value[0] && imc <= value[1] ) {
                    result = key;
                }
            });
            return result;

        default:
            message.innerText = "Selecione o sexo do usuário!"
            break
    }
}

//verifica se há alguma variável vazia e retorna par ao usuário
function verifyFields() {
    let age = ageElement.value;
    let height = heightElement.value;
    let weight = weightElement.value;
    let sex = sexElement.value;

    let variables = [age, height, weight, sex];

    let isInvalidy = false;

    variables.forEach(element => {
        if ( ! element || element == undefined ) {
            isInvalidy = true;
        }
    });

    if ( isInvalidy ) {
        message.innerText = "Alguns dos valores inseridos são inválidos!"
        return false;
    } else {
        return variables;
    }
}

//calcula o imc do usuário
function calcImc( weight, height ) {
    return (weight / ( height * height )).toFixed(1);
}

