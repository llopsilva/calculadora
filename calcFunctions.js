// Coletar os elementos da tela
let numbers = document.querySelectorAll('div#number.btn'), // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    operators = document.querySelectorAll('div#operator.btn'),// [ '+' , '-' , '÷' , '×']
    clear = document.getElementById('clear'),
    result = document.getElementById('result'),
    screen = document.getElementById('screen'),
    resultDislayed = false;

    
// Modifica o display da screen
screen.innerHTML = '';

// Regras para a utilização dos operadores
for (let i = 0; i < operators.length; i++){
    operators[i].addEventListener('click', function(){

        let newInput = operators[i].innerHTML;

        let lastChar = screen.innerHTML[screen.innerHTML.length - 1];

        if (resultDislayed) resultDislayed = false;
        
        if (screen.innerHTML === ''){
            if (newInput == '-') {screen.innerHTML = '0' + newInput}
        }
        else {
            if (lastChar == '+' || lastChar == '-' || lastChar == '÷' || lastChar == '×') {
                let newString = screen.innerHTML;
                newString = newString.substring(0, newString.length-1);
                screen.innerHTML = newString;
            }
            
            screen.innerHTML += newInput;
            
        }
    })
}

// Regras para a utilização dos numeros
for (let i = 0; i < numbers.length; i++){
    numbers[i].addEventListener('click', function(){
        
        let newInput = numbers[i].innerHTML

        let lastChar = screen.innerHTML[screen.innerHTML.length - 1]

        if (resultDislayed === true){
            resultDislayed = false;
            screen.innerHTML = ''
        }

        if (newInput === '.') {
            if ((lastChar == '+' || lastChar == '-' || lastChar == '÷' || lastChar == '×') || screen.innerHTML == ''){
                newInput = '0.'
            }
        }
        
        screen.innerHTML += newInput
    })
}


// Regras para a utilização do Clear
clear.addEventListener('click', function(){
    screen.innerHTML = '';
})

// Regras para a utilização do result
result.addEventListener('click', function(){
    let array = screen.innerHTML.split(new RegExp(/(\+|\-|\×|\÷)/g));

    array = array.filter(function(e) { return e !== ''})

    for (n = 0; n < array.length; n++){
        if (!(array[n] == '-' || array[n] == '+' || array[n] == '×' || array[n] == '÷')){
            let count = 0
            for (i = 0; i < array[n].length; i++){
                
                let num = array[n]

                if (num[i] == '.') count ++

                if (count > 1){
                    screen.innerHTML = 'NaN'
                    resultDislayed = true
                    return
                }
            }

            array[n] = parseFloat(array[n])
        }

        if (array[n-1] == '-'){
            array[n] = -array[n]
            array[n-1] = '+'
        }
    }

    let division = array.indexOf('÷')
    while (division != -1){

        if (array[division+1] == 0) {
            screen.innerHTML = 'NaN'
            resultDislayed = true
            return
        }
        
        array.splice(division-1,3,array[division-1]/array[division+1])
        division = array.indexOf('÷')
    }

    let multiply = array.indexOf('×')
    while (multiply != -1){
        array.splice(multiply-1,3,array[multiply-1]*array[multiply+1])
        multiply = array.indexOf('×')
    }

    let sum = array.indexOf('+')
    while (sum != -1){
        array.splice(sum-1,3,array[sum-1]+array[sum+1])
        sum = array.indexOf('+')
    }

    screen.innerHTML = ''
    screen.innerHTML = array[0]
    resultDislayed = true
})