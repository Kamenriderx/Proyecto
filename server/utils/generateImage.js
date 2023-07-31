const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");

const generateImage = async () => {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");  
  ctx.fillStyle = "green";

  // Write "Awesome!"
  ctx.font = "30px Impact";
  ctx.rotate(0.1);
  ctx.fillText("Awesome!", 50, 100);

  // Draw line under text
  var text = ctx.measureText("Awesome!");
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.beginPath();
  ctx.lineTo(50, 102);
  ctx.lineTo(50 + text.width, 102);
  ctx.stroke();

  // Convert the canvas to a buffer (PNG format by default)
  const buffer = canvas.toBuffer("image/jpeg"); // You can also use "image/png" for PNG format

  // Specify the path where the image should be saved
  const imagePath = path.join(__dirname, "images", "output.jpg");

  // Write the buffer to the specified file path
  fs.writeFileSync(imagePath, buffer);
};


module.exports = generateImage;