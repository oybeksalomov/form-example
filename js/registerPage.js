"use strict"
/**********************************************Register Page **************************************/
const tab = document.querySelectorAll('.tab'), // Current tab is set to be the first tab (0);
  prevBtn = document.querySelector('#prevBtn'),
  nextBtn = document.querySelector('#nextBtn'),
  regForm = document.querySelector('#regForm'),
  step = document.querySelectorAll('.step'),
  regPass = document.querySelector(".regPass"),
  regPassRepeat = document.querySelector(".regPassRepeat")

let currentTab = 0;
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  tab[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "inline";
  }
  if (n == (tab.length - 1)) {
    nextBtn.innerHTML = "Submit";
  } else {
    nextBtn.innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display

  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  tab[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= tab.length) {
    // ... the form gets submitted:
    regForm.submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  let i, valid = true;
  const regInput = tab[currentTab].querySelectorAll(".regInput");
  
  // A loop that checks every input field in the current tab:
  for (i = 0; i < regInput.length; i++) {
    // If a field is empty...
    if (regInput[i].value == "") {
      // add an "invalid" class to the field:
      regInput[i].classList.add("invalid");
      // and set the current valid status to false
      valid = false;
    } else {
      regInput[i].classList.remove("invalid");
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.querySelectorAll(".step")[currentTab].classList.add("finish");
    
  }
  
  return valid; // return the valid status
  
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  let i;
  for (i = 0; i < step.length; i++) {
    step[i].className = step[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  step[n].className += " active";
}

regForm.addEventListener("submit", (evnt) => {
  evnt.preventDefault()

  let regPassVal = regPass.value,
    regPassRepeatVal = regPassRepeat.value;

  if(regPassVal != regPassRepeatVal && regPassVal == "") {
    regPass.classList.add(" invalid")
    regPassRepeat.classList.add(" invalid")
  }

})