document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Fields
  (function() {
    var requestForm = document.getElementById('js-request');
    var fieldAutoupdate = document.getElementsByClassName('js-autovalidate');
    var cleanBtnsList = document.querySelectorAll('[data-clean]');

    if (!requestForm) return;

    // Clear btns
    for (var i = 0; i < cleanBtnsList.length; i++) {
      cleanBtnsList[i].addEventListener('click', function() {
        var boundedInput = getClosestInput(this);

        boundedInput.value = '';
        setFieldClear(boundedInput);
      });
    }

    // Auto validate
    for (var k = 0; k < fieldAutoupdate.length; k++) {
      fieldAutoupdate[k].addEventListener('input', function() {
        isFieldFill(this) ? setFieldFilled(this) : setFieldClear(this);

        if (this.nodeName !== 'INPUT') return;

        if (this.getAttribute('type') === 'email') {
          if (isFieldEmpty(this)) setFieldClear();
          isEmailValid(this) ? setFieldValid(this) : setFieldInvalid(this);
        } else if (this.getAttribute('pattern')) {
          isPatternValid(this) ? setFieldValid(this) : setFieldInvalid(this);
        }
      });
    }

    // Submit form
    requestForm.addEventListener('submit', function(e) {
      e.preventDefault();

      formValidate(this);

      if (isFormValid(this)) {
        formSend(this);
      }
    });

    // Hide errors
    document.body.addEventListener('click', function() {
      hideAllErorrs();
    })


    // FUNCTIONS
    function formValidate(formEl) {
      var formElementsList = formEl.querySelectorAll('[data-validate]');

      for (var i = 0; i < formElementsList.length; i++) {
        var formField = formElementsList[i];
        var formFieldType = formField.getAttribute('type');

        switch (formFieldType) {
          case 'checkbox':
            (!formField.checked) ? showErorr(formField) : hideErorr(formField);
            break;

          case 'text':
            if (!formField.getAttribute('pattern')) return;

            if (isFieldEmpty(formField)) {
              showErorr(formField);
            } else if (!isPatternValid(formField)) {
              showErorr(formField);
            } else {
              hideErorr(formField);
            }
            break;

          case 'email':
            if (isFieldEmpty(formField)) {
              showErorr(formField);
            } else if (!isEmailValid(formField)) {
              showErorr(formField);
            } else {
              hideErorr(formField);
            }
            break;

          default:
            isFieldEmpty(formField) ? showErorr(formField) : hideErorr(formField);
        }
      }

      return formElementsList;
    }

    function showErorr(field) {
      var tooltip = field.closest('.parent-error').getElementsByClassName('error-tooltip')[0];

      if (!tooltip) return;
      tooltip.classList.add('is-visible');
    }

    function hideErorr(field) {
      var tooltip = field.closest('.parent-error').getElementsByClassName('error-tooltip')[0];

      if (!tooltip) return;
      tooltip.classList.remove('is-visible');
    }

    function hideAllErorrs() {
      var tooltips = document.getElementsByClassName('error-tooltip');

      for (var i = 0; i < tooltips.length; i++) {
        tooltips[i].classList.remove('is-visible')
      }
    }

    function isFormValid(form) {
      if (!form.querySelector('.error-tooltip.is-visible')) return true;
    }

    function isFieldEmpty(field) {
      if (field.value === '') return true;
      else return false;
    }

    function isFieldFill(field) {
      if (field.value === '') return false;
      else return true;
    }

    function setFieldValid(field) {
      var parent = getClosestField(field);
      parent.classList.add('is-valid');
      parent.classList.remove('is-invalid');
    }

    function setFieldInvalid(field) {
      var parent = getClosestField(field);
      parent.classList.add('is-invalid');
      parent.classList.remove('is-valid');
    }

    function setFieldClear(field) {
      var parent = getClosestField(field);
      parent.classList.remove('is-invalid');
      parent.classList.remove('is-valid');
      parent.classList.remove('is-fill');
    }

    function setFieldFilled(field) {
      var parent = getClosestField(field);
      parent.classList.add('is-fill');
    }

    function getClosestField(el) {
      return el.parentElement
    }

    function getClosestInput(el) {
      var field = getClosestField(el);
      return field.getElementsByClassName('input')[0];
    }

    function isEmailValid(input) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(input.value);
    }

    function isPatternValid(input) {
      var regex = new RegExp(input.getAttribute('pattern'));
      return regex.test(input.value);
    }

    function formSend(form) {
      form.classList.add('is-sended');
    }
  })();

});
