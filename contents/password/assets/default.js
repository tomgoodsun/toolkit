(function (window, document) {
  'use strict';

  const LETTER_TYPES = {
    //'signs':'`~!@#$%^&*()_+-=[]\\;\',./{}|:"<>?',
    //'uppercase':'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    //'lowercase':'abcdefghijklmnopqrstuvwxyz',
    //'numbers':'0123456789',
    //'space':' '
    'signs':{view:'Use signs', value:'`~!@#$%^&*()_+-=[]\\;\',./{}|:"<>?', checked:true},
    'uppercase':{view:'Use upper alphabets (A-Z)', value:'ABCDEFGHIJKLMNOPQRSTUVWXYZ', checked:true},
    'lowercase':{view:'Use lower alphabets (a-z)', value:'abcdefghijklmnopqrstuvwxyz', checked:true},
    'numbers':{view:'Use numbers (0-9)', value:'0123456789', checked:true},
    'space':{view:'Use space', value:' ', checked:false}
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
          var elem = document.getElementById('option-sample-chars-' + i);
          if (elem === null) {
            result += LETTER_TYPES[i].value;
          } else {
            result += elem.value;
          }
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
        charLength = this.availableChars.length,
        i = 0;
      if (this.noDuplicateChars && len > charLength) {
        throw new Error(sprintf('Specified length for password is too short (min: %s / max: %s).', this.minLength, this.maxLength));
      }
      while (i < len) {
        var tmp = this.availableChars.charAt(parseInt(Math.random() * charLength));
        if (this.noDuplicateChars && result.indexOf(tmp) > -1) {
        } else {
          result += tmp;
          i++;
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

  function initOptions() {
    var wrappers = document.querySelectorAll('.option-wrapper'),
      len = wrappers.length;
    for (var i in LETTER_TYPES) {
      var options = LETTER_TYPES[i],
        labelAttrs = {
          for: 'opt-' + i
        },
        inputAttrs = {
          id: 'opt-' + i,
          className: 'options',
          'data-name': i
        };
      var elem = Toolkit.Mdl.createCheckbox(options.view, labelAttrs, inputAttrs, options.checked);
      if (i != 'space') {
        var input = Toolkit.Element.create('input', {
          type: 'text',
          id: 'option-sample-chars-' + i,
          className: 'option-sample-chars',
          value: options.value,
          'data-orig-value': options.value
        });
        elem.appendChild(input);
      }

      for (var j = 0; j < len; j++) {
        wrappers[j].appendChild(elem);
      }
    }
  }

  function setGeneratingHandler() {
    document.querySelectorAll('.generate').forEach(function (elem) {
      elem.addEventListener('click', function () {
        var gen = new PasswordGenerator(),
          passwords = gen.generate(),
          resultElem = document.getElementById('result');
        resultElem.innerHTML = '';
        for (var i = 0, len = passwords.length; i < len; i++) {
          var resultHtml = Toolkit.Element.create('li', {className: 'password'});
          resultHtml.appendChild(document.createTextNode(passwords[i]));
          resultElem.appendChild(resultHtml);
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
    initOptions();
    setGeneratingHandler();
  }, false);
})(window, window.document);
