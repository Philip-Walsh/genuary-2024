// TODO!
var canvas = document.getElementById("sineWaveCanvas");
var ctx = canvas.getContext("2d");

function drawSineWave(amplitude = 50, frequency = 0.02) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    var x = 0;
    var y = canvas.height / 2;
    ctx.moveTo(x, y);

    for (var i = 0; i < canvas.width; i++) {
        x = i;
        y = canvas.height / 2 + amplitude * Math.sin(frequency * x);
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#009688";
    ctx.lineWidth = 2;
    ctx.stroke();
}

drawSineWave();

document.addEventListener('DOMContentLoaded', function () {
    let amplitude;
    let frequency;

    const form = document.getElementById('values');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        amplitude = document.getElementById('amplitude').value;
        frequency = document.getElementById('frequency').value;
        drawSineWave(amplitude, frequency);
    });
});
