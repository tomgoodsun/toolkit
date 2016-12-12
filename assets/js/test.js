(function (window) {
  window.addEventListener('load', function () {
    // labelタグ作成
    var label = document.createElement('label');
    label.id = 'sample-label';
    label.className += ' mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect';

    // inputタグ作成
    var input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'sample';
    input.className += ' mdl-checkbox__input';

    // labelのテキスト作成
    var labelText = document.createTextNode('Check me!');

    // 作成した要素をlabelタグに追加
    label.appendChild(input);
    label.appendChild(labelText);

    // MDL用に要素をアップデート
    componentHandler.upgradeElement(label);

    // 作成したlabel要素をbodyに追加
    document.getElementById('checkboxes').appendChild(label);

    document.getElementById('toggle').addEventListener('click', function () {
      document.getElementById('sample-label').MaterialCheckbox.check();
      //var checkbox = document.getElementById('sample');
      //if (checkbox.checked) {
      //  checkbox.checked = false;
      //} else {
      //  checkbox.checked = true;
      //}
    }, false);
  }, false);
})(window);
