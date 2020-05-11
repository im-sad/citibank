@@include('./modal.js');
@@include('./closest-polyfill.js');
@@include('./form-validation.js');

document.addEventListener('DOMContentLoaded', function() {
  // Modals init
  (function() {
    initBaseModals();

    function initBaseModals() {
      var modals = document.getElementsByClassName('js-modal');

      for (var i = 0; i < modals.length; i++) {
        initModal(modals[i]);
      }
    }

    function initModal(modalElement) {
      var modalPlugin = new Modal(modalElement);
      var modalId =  modalElement.getAttribute('id');

      addButtonsEvent(modalPlugin);

      return modalPlugin;

      function addButtonsEvent(obj) {
        var modalBtns = document.querySelectorAll('[data-modal="'+ modalId +'"]');

        for (var j = 0; j < modalBtns.length; j++) {
          modalBtns[j].addEventListener('click', function() {
            obj.open();
            }, false);
        }
      }
    }
  })();


  // Fake links
  (function() {
    const fakeLinksList = document.getElementsByClassName('js-fake-link');

    for (var i = 0; i < fakeLinksList.length; i++) {
      fakeLinksList[i].addEventListener('click', function(e) {
        e.preventDefault();
      })
    }
  })();
});
