let calculation = localStorage.getItem('calculation') || '';

// console.log(document.querySelectorAll('.calculator_button'));

// Display calculation when the page first loads.
displayCalculation();

document.querySelectorAll('.calculator_button').forEach(numberButton => {
  const thirdClassName = numberButton.classList[2];
  numberButton.addEventListener('click', () => {
    if (thirdClassName === 'js_button_clear'){
      calculation = '';
      displayCalculation();
      localStorage.setItem('calculation', calculation);
    }
    else if(thirdClassName === 'js_button_equal'){
      calculation = eval(calculation);
      displayCalculation();
      localStorage.setItem('calculation', calculation);
    }
    else{
      updateCalculation(thirdClassName.charAt(thirdClassName.length-1))
    }
  })
});

function updateCalculation(operation){
  calculation += operation;
  displayCalculation();
  localStorage.setItem('calculation', calculation);
}

function displayCalculation(){
  document.querySelector('.js_calculation').innerHTML = calculation;
}