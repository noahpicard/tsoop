function loadScript(urls, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = urls[0];

    var short = urls.slice(1, urls.length);
    var next = () => loadScript(short, callback);
    if (short.length === 0) {
      next = callback;
    }

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = next;
    script.onload = next;

    // Fire the loading
    head.appendChild(script);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var state = null;
var ctx = null;
var width = 100;
var height = 100;
var activeTimers = {};

function main() {
  init()

  startSyncTimer('draw', draw, 30);
  // startSyncTimer('print', print, 3000);
}

function stopSyncTimer(id) {
  activeTimers[id] = 0;
}

function startSyncTimer(id, callback, delay) {
  activeTimers[id] = delay;
  (function loop(){
    setTimeout(function() {
      if (activeTimers[id] > 0) {
        callback();
        loop();
      }
    }, activeTimers[id]);
  })();
}

function step() {
  state.takeStep();
}

function print() {
  state.print();
}

function drawDot(x, y, pointSize, color) {
  ctx.fillStyle = color; // Red color
  ctx.beginPath(); //Start path
  ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
  ctx.fill(); // Close the path and fill.
}

function draw() {
  ctx.clearRect(0, 0, width * 10, height * 10);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width * 10, height * 10);
  state.objects.map((obj) => {
    drawDot(obj.x * 10, obj.y * 10, 3, obj.color);
  })
}

function init() {
  var imax = 100;
  var jmax = 100;
  for (var i = 0; i < imax; i+=5) {
    for (var j = 0; j < jmax; j+=5) {
      var tsooper = new Tsooper();
      tsooper.init(i * imax + j, i, j, i * j, width, height);
      //state.objects.push(tsooper);

      var tsooper2 = new Tsooper();
      tsooper2.init(i * imax + j, i + 0.5, j + 0.5, i * j, width, height, alpha=0, beta=-17);
      state.objects.push(tsooper2);
    }
  }
  var istep = 4;
  var jstep = 4;
  for (var i = 0; i < imax; i+=istep) {
    for (var j = 0; j < jmax; j+=jstep) {
      var tsooper = new Tsooper();
      tsooper.init(1000 + i * imax + j, 50+i*0.0000001, 50+j*0.0000001, (i/istep*(jmax/jstep)) + (j/jstep), width, height);
      state.objects.push(tsooper);
    }
  }


  for (var i = 0; i < 100; i += 1) {
    var x = getRandomInt(width);
    var y = getRandomInt(height);
    var dir = getRandomInt(360);
    var alpha = getRandomInt(360);
    var beta = getRandomInt(360);
    var tsooper = new Tsooper();
    tsooper.init(i, x, y, dir, width, height, alpha, beta);
    //state.objects.push(tsooper);
  }
}

var onLoad = function() {
  state = new State();
  window.onload = (event) => {
    console.log('loaded!');
    // SETUP
    var canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    main();
  }
};

loadScript(["js/tsooper.js", "js/state.js"], onLoad);






