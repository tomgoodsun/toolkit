(function (window, document) {
  'use strict';

  function init() {
    document.querySelectorAll('.convert').forEach(function (elem) {
      elem.addEventListener('click', function () {
        var json = document.getElementById('json').value;
        if (json.length > 0) {
          document.getElementById('result').value = JSON.stringify(JSON.parse(json), null, 2);
        }
      }, false);
    });
  }

  window.addEventListener('load', function () {
    init();
  }, false);
})(window, window.document);
