document.getElementById('read').addEventListener('click', () => {
    window.open('https://github.com/qndm/Easy-Box3-JavaScript/blob/main/ebjs.js');
});
var codeText = document.getElementById('code').innerText,
    layers = 0,
    inNotes = false;
document.getElementById('code').innerHTML = '';
for (var index in codeText) {
    var text = codeText[index];
    if (index != 0) var previousText = codeText[index - 1];
    else previousText = '';
    if (index != (codeText.length - 1)) var nextText = codeText[index + 1];
    else nextText = '';
    if (text == '{') layers++;
    if (text == '}') layers--;
    if ((text == '*' && previousText == '/')) inNotes = true;
    if ((text == '/' && previousText == '*')) inNotes = false;
    if ((text == '/' && previousText == '*') || text == ';' || (text == '}' && nextText != ',') || text == '{') {
        if (!inNotes || (text != '{' && text != '}')) {
            document.getElementById('code').innerHTML += (text + '<br>');
            for (var i = 0; i < layers; i++) document.getElementById('code').innerHTML += '&#160;&#160;&#160;&#160;';
        } else document.getElementById('code').innerHTML += text;
    } else if ((text == '*' && previousText != '/' && previousText != '*') && inNotes) {
        document.getElementById('code').innerHTML += '<br>';
        for (var i = 0; i < layers; i++) document.getElementById('code').innerHTML += '&#160;&#160;&#160;&#160;';
        document.getElementById('code').innerHTML += text;
    } else document.getElementById('code').innerHTML += text;
}
