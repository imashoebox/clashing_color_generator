const colorPicker = document.getElementById('colorPicker');
colorPicker.value = '#'+Math.floor(Math.random()*16777215).toString(16).padEnd(6, 0);
colorConverter();

colorPicker.addEventListener('input', colorConverter)

function colorConverter() {

    var H = colorPicker.value;
    document.getElementById('pickedColor').style.background = H

    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(0);
    l = +(l * 100).toFixed(0);

    const newS = 100 - s;
    const newL = 100 - l;
    let newH = 360 - h;

    if (h < 18 || h > 350) {
        newH = h + 250;
    } else if (h < 250 && h > 150) {
        newH = h + 100;
    }
    document.getElementById('badCube').style.background = HSLstring(newH, newS, newL)

    document.getElementById('display').innerText = HSLstring(h, s, l)
    document.getElementById('badDisplay').innerText = HSLstring(newH, newS, newL)

}

function HSLstring(h, s, l) {
    return `hsl(${h}, ${s}%, ${l}%)`

}