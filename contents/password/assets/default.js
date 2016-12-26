(function (window) {
  'use strict';

  const LETTERSETS = {
    'signs':'`~!@#$%^&*()_+-=[]\\;\',./{}|:"<>?',
    'uppercase':'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'lowercase':'abcdefghijklmnopqrstuvwxyz',
    'numbers':'0123456789',
    'space':''
  };

  /**
   * Password Generator
   * Class declaration
   */
  var PasswordGenerator = function () {
    this.samplingNum = document.getElementById('opt-sampling-num').value;
    this.maxLength = document.getElementById('opt-max-chars').value;
    this.minLength = document.getElementById('opt-min-chars').value;
    this.noDuplicateChars = document.getElementById('opt-no-duplicate').checked;
    this.options = this.getOptions();
    this.availableChars = this.getAvailableChars();
  };

  /**
   * Password Generator
   * Class methods
   */
  PasswordGenerator.prototype = {
    /**
     * Get lists of checked or written hostnames
     *
     * @return {Array}
     */
    getOptions: function () {
      var elems = document.querySelectorAll('input.options'),
        name,
        result = {};

      for (var i = 0, len = elems.length; i < len; i++) {
        if (!elems[i].disabled && elems[i].checked) {
          name = elems[i].getAttribute('data-name');
          result[name] = elems[i].checked;
        }
      }
      return result;
    },

    /**
     * Get available charaters of current settings
     *
     * @return {string}
     */
    getAvailableChars: function () {
      var result = '';
      for (var i in this.options) {
        if (this.options[i]) {
          result += LETTERSETS[i];
        }
      }
      return result;
    },

    /**
     * Generate lists of passwords
     *
     * @return {array}
     */
    generate: function () {
      var result = [];
      var amount = this.samplingNum;
      amount = amount == 0 || amount == '' ? 1 : parseInt(amount, 10);
      if (isNaN(amount)) {
        alert('Amount must be a number.');
        return;
      }
      if (amount == 1) {
        result.push(this.generatePassword());
      } else {
        for (var i = 0; i < amount; i++) {
          var password = this.generatePassword();
          if (password !== null) {
            result.push(password);
          }
        }
      }
      return result;
    },

    /**
     * Generate password
     *
     * @return {string}
     */
    generatePassword: function() {
      //var passwordLength = this.calcLength();
      var result = '';
      var charLength = this.availableChars.length;
      //var dupchk = this.byId('settingNoDuplicate').checked;
      //if (dupchk && passwordLength > charLength) {
      //  alert('Too large number is specified for password length.');
      //  return null;
      //}
      for ( var i = 0; i < this.maxLength; i++) {
        var tempChar = this.availableChars.charAt(parseInt(Math.random() * charLength));
        if (this.noDuplicateChars && result.indexOf(tempChar) > -1) {
          i--;
        } else {
          result += tempChar;
        }
      }
      return result;
    }
  };

  //function initDialogs() {
  //  document.querySelectorAll('dialog').forEach(function (dialog) {
  //    if (!dialog.showModal) {
  //      dialogPolyfill.registerDialog(dialog);
  //    }
  //    dialog.querySelector('.close').addEventListener('click', function() {
  //      dialog.close();
  //    });
  //  });
  //  setGeneratingHandler();
  //}

  function setGeneratingHandler() {
    document.querySelectorAll('.generate').forEach(function (elem) {
      elem.addEventListener('click', function () {
        var gen = new PasswordGenerator(),
          passwords = gen.generate();
        console.log(passwords);
        //var dialog = document.querySelector('dialog#' + this.getAttribute('data-dialog-id'));
        //dialog.querySelector('.mdl-dialog__title').innerHTML = this.getAttribute('data-dialog-title');
        //dialog.querySelector('.mdl-dialog__content').innerHTML = '<pre>' + statement + '</pre>';
        //dialog.showModal();
      }, false);
    });
  }

  window.addEventListener('load', function () {
    //createHostCheckboxes();
    //createPrivilegeCheckboxes();
    //createCharsetSelectList();
    //setPrivilegeHandler();
    //initDialogs();
    setGeneratingHandler();
  }, false);
})(window);
