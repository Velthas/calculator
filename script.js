//Initialize the object that will be used to store calculation values
let calculation = {};

//This variable will signal what to do on multiple equal button presses
let consecutive = 0

//Get both the displays to use in the functions below
const upperDisplay = document.querySelector('.operations');
const lowerDisplay = document.querySelector('.calculation'); 

//Add event listeners to each of the buttons to populate display on click
const numbersNodeList = document.querySelectorAll('.numbers');
populateDisplay(numbersNodeList);

//Enable AC button functionality to get a full reset on click
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clearCalculation);

//Enable +/- functionality to convert display values to positive or negative
const convertButton = document.querySelector('.convert');
convertButton.addEventListener('click', convertToNegative)

//Enable decimal point functionality
const decimalButton = document.querySelector('.decimal');
decimalButton.addEventListener('click', addDecimalPoint)

//Add event listeners to the operator and equal button
storeOperator();
performOperation();

//Takes values and does calculations based on the operator
function operate(operator, number1, number2) {

    switch (true) {

        case operator === "+":
            return number1 + number2;
        
        case operator === "-":
            return number1 - number2;

        case operator === "*":
            return number1 * number2;

        case operator === "/":
            if (number1 === 0 || number2 === 0) {
            alert('Just.. just... okay?!');
            return "Bruh"
            }
            return number1 / number2;

        case operator === "%":
            return number1 % number2;

        default:
            setTimeout(clearButton.click(), 2000)
            return "Bruh"

    }

}

//Number buttons clicks will add them to the display
function populateDisplay(nodeList) {

    //When a number button is clicked add it to the display value.
    nodeList.forEach(button => {
        button.addEventListener('click', () => { lowerDisplay.textContent = lowerDisplay.textContent + button.textContent
            limitDisplayLength(); })

        
    });

}

//Handles clicks on operators * / + - %
function storeOperator() {

    //Get the operator buttons.
    const operatorButtons = document.querySelectorAll('.operators');

    //Add event listeners for each of the operators
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {

            //If a user selects a different operator the operation is not deemed consecutive
            consecutive = 0;

            //User might manipulate result after getting it, so just update it before performing the rest of the usual actions
            //This also prevents issues on multiple operators click
            if(calculation['ans']) {

                //Slot the selected operator inside the object
                calculation['operator'] = button.textContent;

                //Get the length of text content and ans for comparison
                let ansLength = calculation['ans'].toString().length;
                let textContentLength = lowerDisplay.textContent.length;

                updateAns(ansLength, textContentLength);

                upperDisplay.textContent = `${calculation['ans']} ${calculation['operator']}`;
                lowerDisplay.textContent = "";

                return;
    
            }

            else if(lowerDisplay.textContent === "") {
                lowerDisplay.textContent = "0";
            }

            //Store the first number by getting what's in the display
            calculation['number1'] = Number(lowerDisplay.textContent);

            //Slot the selected operator inside the object
            calculation['operator'] = button.textContent;

            //Display history of values typed and wait for the next value
            upperDisplay.textContent = `${calculation['number1']} ${calculation['operator']}`;
            lowerDisplay.textContent = "";
        })

    })

}

//Handles storing of values inside the calculation object when equals is pressed
function performOperation() {

    //Get the equal button
    const equalButton = document.querySelector('.equals')

    equalButton.addEventListener('click', function() {

        //Check if a first number isn't there, or if the second number has not been written
        //Works because the first number is only recorded on first operator click
        if (calculation['number1'] === undefined || lowerDisplay.textContent === "") {
            return;
        }

        //On equals click, register what's inside the text-content as second number
        //calculation['number2'] = Number(lowerDisplay.textContent);
        
        //If the first operation was a success, perform calculations based on the result
        if(!(calculation.ans === undefined)) {

            //If this is a consecutive equal click, reuse the value and operator
            if (consecutive === 1) {

                //Get the length of text content and ans for comparison
                let ansLength = calculation['ans'].toString().length;
                let textContentLength = lowerDisplay.textContent.length;
                
                //Check if the user changed the result value before operating
                updateAns(ansLength, textContentLength);
                
                //Do the calculations and plug results to the display
                calculateResults(calculation.ans, calculation.number1);

                shrinkResult();

            }

            //Otherwise perform the calculation with the new number
            else {
                
                //This is not a consecutive equal press, so store the new value for calculation
                calculation['number2'] = Number(lowerDisplay.textContent);

                //Do the calculation and plug the results to the display
                calculateResults(calculation.ans, calculation.number2)

                //Store the second number in the first slot for eventual consecutive evaluation.
                calculation['number1'] = calculation['number2'];

                shrinkResult();

                //Poise the system to expect and handle multiple equal presses
                consecutive = 1;

            }

        }

        //This executes for the first operation, or if the operation object is reset.
        else{

            //Fetch the second number from the display
            calculation['number2'] = Number(lowerDisplay.textContent);

            //Update both the displays with the calculations and results
            calculateResults(calculation.number1, calculation.number2);
            
            //Poise the system to expect and handle multiple equals presses
            calculation['number1'] = calculation['number2'];
            consecutive = 1;

            shrinkResult();
        }

    });

}

//Empty the object and clear the display in case of AC button press
function clearCalculation() {

    calculation = {};
    lowerDisplay.textContent = "";
    upperDisplay.textContent = "";
    consecutive = 0;

}

//Updates the displays and records result of operations
function calculateResults(number1, number2) {

                //Update both the displays with calculations and results respectively
                upperDisplay.textContent = `${number1} ${calculation.operator} ${number2}`
                lowerDisplay.textContent = operate(calculation.operator, number1, number2)
            
                //Store the result as ANS.
                calculation['ans'] = Number(lowerDisplay.textContent);

}

//This function detects if the user has manipulated the value of ans, and updates it.
function updateAns(ansLength, displayLength) {

                //Handles negative values
                if (lowerDisplay.textContent.slice(0, 1) === "-") {
                    calculation['ans'] = ansLength < displayLength ? Number( "-" + calculation['ans'] + lowerDisplay.textContent.slice(ansLength + 1)) : calculation['ans'];
                    return;
                }
                else {
                //I am slicing through because just having ans be the textcontent could result in it being changed to nothing upon multiple consecutive operator presses
                calculation['ans'] = ansLength < displayLength ? Number(calculation['ans'] + lowerDisplay.textContent.slice(ansLength)) : calculation['ans'];
                }

                //Show current operation on display
                upperDisplay.textContent = `${calculation['ans']} ${calculation['operator']}`;
                lowerDisplay.textContent = "";

}

//Allows user to switch positive values to negative and vice-versa
function convertToNegative () {

    if (lowerDisplay.textContent === "") {
        return;
    }
    
    let number = Number(lowerDisplay.textContent);
    let convertedNumber = -number
    lowerDisplay.textContent = convertedNumber.toString();

    if (calculation['ans']){
        calculation['ans'] = lowerDisplay.textContent;
    }


}

//Allows user to add a decimal point to numbers
function addDecimalPoint () {

    //Indexof returns negative 1 if no match is found, otherwise the index itself
    if(lowerDisplay.textContent.indexOf('.') !== -1) {
        return;
    };

    if(lowerDisplay.textContent === "") {
        lowerDisplay.textContent = "0."
    }
    else {
        lowerDisplay.textContent = lowerDisplay.textContent + ".";
    }

}

//Makes it so the user cannot type more than 15 numbers into the display
function limitDisplayLength () {

if(lowerDisplay.textContent.length > 15) {
    lowerDisplay.textContent = lowerDisplay.textContent.slice(0,15)
}

}

//Check what the operations results to, if number is too big for the display, shrink it.
function shrinkResult () {

    //This evaluates to true if the media-query is enabled
    const mediaQuery = window.matchMedia( "(max-width: 370px)" );

    if (mediaQuery) {

        if (lowerDisplay.textContent.length > 15) {

            lowerDisplay.setAttribute('style', 'font-size: 23px;')
        }

        else {
            lowerDisplay.style.fontSize = '25px';
        }

    }
    //Otherwise it just behaves regularly
    else {

        if (lowerDisplay.textContent.length > 15) {

            lowerDisplay.setAttribute('style', 'font-size: 25px;')
        }
        else {
            lowerDisplay.style.fontSize = '40px';
        }

    }

}