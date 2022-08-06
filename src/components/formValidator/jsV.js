// validate////////////////////////////////////////////////////////////////////////////////////////////////////////
let form = document.querySelector('.form-popup__inner'),
    formInputs = document.querySelectorAll('.js-input'),
    inputEmail = document.querySelector('.js-input-email'),
    inputPhone = document.querySelector('.js-input-phone');


    function validateEmail(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
      let re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
      return re.test(String(phone));
  }


    form.onsubmit = function () {
      let emailVal = inputEmail.value,
          phoneVal = inputPhone.value,
          emptyInputs = Array.from(formInputs).filter(input => input.value === '');

          formInputs.forEach(function (input) {
            if (input.value === '') {
              input.classList.add('error');
              console.log('input not filled');
            } else{
              input.classList.remove('error');
            }
          
            
          })

          if (emptyInputs.length !== 0) {
            console.log('inputs not filled');
            return false;
          }

          if (!validateEmail(emailVal)) {
            console.log('email not valid');
            inputEmail.classList.add('error');
            return false;
          } else {
            inputEmail.classList.remove('error');
          }

          if (!validatePhone(phoneVal)) {
            console.log('phone not valid');
            inputPhone.classList.add('error');
            return false;
        } else {
            inputPhone.classList.remove('error');
        }

    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
