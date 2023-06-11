"use strict";

// Calculate BMI
function calculateBMI(altura, peso) {
    // Calculate the BMI using the formula: weight / (height * height)
    const imc = peso / (altura * altura);
    return imc.toFixed(2); // Round the BMI value to 2 decimal places
}

function circularProgress(imc, circularComponent) {
    let progressValue = 0;
    let progressEndValue = imc;
    let speed = 0.01;

    // Update the circular progress animation using setInterval
    let progress = setInterval(() => {
        progressValue += 0.01;
        circularComponent.style.background = `conic-gradient(
            transparent ${progressValue * 3.6}deg, 
            #f2f2f2 ${progressValue * 3.6}deg
            )`;
        if (progressValue.toFixed(2) == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}

// Show user data on the screen
function showUserInfo(altura, peso, imc, circularComponent) {
    const user_altura = document.querySelector("#user-info_altura");
    const user_peso = document.querySelector("#user-info_peso");
    const user_imc = document.querySelector("#user-info_imc");

    // Update the user's height, weight, and BMI on the screen
    user_altura.textContent = altura;
    user_peso.textContent = peso;
    user_imc.textContent = imc;

    // Update the circular progress component based on the BMI value

        circularProgress(imc, circularComponent);
}



function setErrorMessage(messageComponent, text) {
    // Display an error message on the screen
    messageComponent.style.display = "block";
    messageComponent.textContent = text;

    // Hide the message after 3 seconds
    setTimeout(function () {
        messageComponent.style.display = "none";
    }, 3000);
}

// Handle form submission
function onSubmit(e, messageComponent, circularComponent) {
    e.preventDefault();

    const altura = Number.parseFloat(e.target[0].value);
    const peso = Number.parseFloat(e.target[1].value);

    let errorText;

    // Validate the input values
    if (!altura) {
        errorText = "Por favor, digite sua altura";
        setErrorMessage(messageComponent, errorText);
    }

    if (altura !== 1 && altura !== 2) {
        if (altura % 1 === 0) {
            errorText = "Por favor, informe as casas decimais do número";
            setErrorMessage(messageComponent, errorText);
        }
    }

    if (!peso) {
        errorText = "Por favor, digite seu peso";
        setErrorMessage(messageComponent, errorText);
    }

    // Calculate the BMI and show user information on the screen
    const imc = calculateBMI(altura, peso);
    if (!isNaN(imc) && !isNaN(altura) && !isNaN(peso)) {
        showUserInfo(altura, peso, imc, circularComponent);
    
    }
}

function init() {
    const messageComponent = document.querySelector("#error-message");
    const circularComponent = document.querySelector(".circular-progress");

    // Initialize the application
    document.addEventListener("DOMContentLoaded", function () {
        // Add form submit event listener
        document.querySelector("#get-user-data").addEventListener("submit", (event) =>
            onSubmit(event, messageComponent, circularComponent)
        );
    });
}

// Start the application
init();
