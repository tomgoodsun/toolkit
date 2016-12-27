(function (window, document) {
  'use strict';

  const LETTER_TYPES = {
    'signs':'`~!@#$%^&*()_+-=[]\\;\',./{}|:"<>?',
    'uppercase':'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'lowercase':'abcdefghijklmnopqrstuvwxyz',
    'numbers':'0123456789',
    'space':' '
  };

  /**
   * Password Generator
   * Class declaration
   */
  var PasswordGenerator = function () {
    this.samplingNum = parseInt(document.getElementById('opt-sampling-num').value, 10);
    this.maxLength = parseInt(document.getElementById('opt-max-chars').value, 10);
    this.minLength = parseInt(document.getElementById('opt-min-chars').value, 10);
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
          result += LETTER_TYPES[i];
        }
      }
      return result;
    },

    /**
     * Calculate length of generating password
     *
     * @return {int}
     */
    calcPasswordLength: function () {
      if (this.minLength == this.maxLength) {
        return this.minLength;
      }
      return Toolkit.Math.getRandomInt(this.minLength, this.maxLength);
    },

    /**
     * Generate lists of passwords
     *
     * @return {array}
     */
    generate: function () {
      var result = [],
        amount = this.samplingNum;
      amount = amount == 0 || amount == '' ? 1 : parseInt(amount, 10);
      if (isNaN(amount)) {
        throw new Error('Amount must be a number.');
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
      var result = '',
        len = this.calcPasswordLength(),
        charLength = this.availableChars.length;
      if (this.noDuplicateChars && len > charLength) {
        throw new Error(sprintf('Specified length for password is too short (min: %s / max: %s).', this.minLength, this.maxLength));
      }
      for (var i = 0; i < len; i++) {
        var tmp = this.availableChars.charAt(parseInt(Math.random() * charLength));
        if (this.noDuplicateChars && result.indexOf(tmp) > -1) {
          i--;
        } else {
          result += tmp;
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
          passwords = gen.generate(),
          resultElem = document.getElementById('result');
        resultElem.innerHTML = '';
        for (var i = 0, len = passwords.length; i < len; i++) {
          resultElem.appendChild(
            Toolkit.Element.create('li', {
              className: 'password',
              innerHTML: passwords[i]
            })
          );
        }
      }, false);
    });
    document.querySelectorAll('.draw').forEach(function (elem) {
      elem.addEventListener('click', function () {
        var drawnResult = document.getElementById('drawn-result');
        drawnResult.innerHTML = ' ';
        var passwords = document.querySelectorAll('#result .password');
        if (passwords.length > 0) {
          var index = Toolkit.Math.getRandomInt(0, passwords.length - 1);
          drawnResult.innerHTML = passwords[index].innerHTML;
        }
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
})(window, window.document);
