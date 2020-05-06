const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


//show input error message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//show input success 
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

//check email validity
const checkEmail = (input) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    return showSuccess(input)
  }
  return showError(input, `${getFieldName(input)} is not a valid email`)
}


//check required fields

const checkRequired = (inputArray) => {
  inputArray.forEach(input => {
    if (input.value.trim() === '') {
      return showError(input, `${getFieldName(input)} is required`)
    }
    return showSuccess(input)
  });
}

// check length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    return showError(input, `${getFieldName(input)} must be at least ${min} characters `)
  }
  if (input.value.length > max) {
    return showError(input, `${getFieldName(input)} must be less than ${max} characters `)
  }
  return showSuccess(input)
}
//check password match
const checkPasswordMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    return showError(input2, 'Passwords do not match')
  }
  return showSuccess(input)
}



//get field Name
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}



//event listener
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email)
  checkPasswordMatch(password, password2)
})
