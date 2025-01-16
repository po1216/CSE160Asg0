// asg0
var canvas;
var ctx;

function main() {  
  // Retrieve <canvas> element
  canvas = document.getElementById('cnv1');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var v1 = new Vector3([2.25, 2.25, 0.0]);
  drawVector(v1, "red");
  //handleDrawEvent();
}

function drawVector(v, color) {
  let v_x = v.elements[0] * 20;
  let v_y = v.elements[1] * 20;

  ctx.strokeStyle = color;
  let cx = canvas.width/2;
  let cy = canvas.height/2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + v_x, cy - v_y, 0.0);
  ctx.stroke();
}

function handleDrawEvent() {
  let x1 = document.getElementById("v1_x").value;
  let y1 = document.getElementById("v1_y").value;
  let x2 = document.getElementById("v2_x").value;
  let y2 = document.getElementById("v2_y").value;
  // console.log(x1)
  // console.log(y1)
  
  // Clear the canvas and recreate one
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw v1 and v2
  let v1 = new Vector3([x1, y1, 0.0]);
  drawVector(v1, "red");
  let v2 = new Vector3([x2, y2, 0.0]);
  drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
  let x1 = document.getElementById("v1_x").value;
  let y1 = document.getElementById("v1_y").value;
  let x2 = document.getElementById("v2_x").value;
  let y2 = document.getElementById("v2_y").value;

  // Clear the canvas and recreate one
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw v1 and v2
  let v1 = new Vector3([x1, y1, 0.0]);
  drawVector(v1, "red");
  let v2 = new Vector3([x2, y2, 0.0]);
  drawVector(v2, "blue");

  let op = document.getElementById("operations").value;
  if (op == "add") {
    // let v3 = v1.add(v2);
    drawVector(v1.add(v2), "green");
  } else if (op == "sub") {
    // let v3 = v1.sub(v2);
    drawVector(v1.sub(v2), "green");
  } else if (op == "mul") {
    let sc = document.getElementById("scalar").value;
    // let v3 = v1.mul(sc);
    // let v4 = v2.mul(sc);
    drawVector(v1.mul(sc), "green");
    drawVector(v2.mul(sc), "green");
  } else if (op == "div") {
    let sc = document.getElementById("scalar").value;
    // v3 = v1.div(sc);
    // v4 = v2.div(sc);
    drawVector(v1.div(sc), "green");
    drawVector(v2.div(sc), "green");
  } else if (op == "mag") {
    let m1 = v1.magnitude();
    let m2 = v2.magnitude();
    console.log("Magnitude v1: " + m1);
    console.log("Magnitude v2: " + m2);
  } else if (op == "nor") {
    drawVector(v1.normalize(), "green");
    drawVector(v2.normalize(), "green");
  } else if (op == "ang") {
    angleBetween(v1, v2);
  } else if (op == "area") {
    areaTriangle(v1, v2);
  }
}

function angleBetween(v1, v2) {
  let dot = Vector3.dot(v1, v2);
  let m1 = v1.magnitude();
  let m2 = v2.magnitude();

  let angle = dot /(m1 * m2);
  angle = Math.acos(angle);
  angle *= 180/Math.PI; 
  console.log("Angle: " + angle);
}

function areaTriangle(v1, v2) {
  let cross = Vector3.cross(v1, v2);
  let v3 = new Vector3([cross[0], cross[1], cross[2]]);
  let area = v3.magnitude() / 2;
  console.log("Area of this triangle: " + area);
}