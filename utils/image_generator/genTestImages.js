const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

var imageCount = new Number(process.argv[3]);
var padToDigits = imageCount.toString().length;
var won = process.argv[2];
const width = 4032;
const height = 3024;

const backgroundCanvas = createCanvas(width, height);
const backgroundContext = backgroundCanvas.getContext('2d');
const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');

loadImage(path.join(__dirname, 'resources/TESTBACKDROP.png')).then(image => {
  backgroundContext.drawImage(image, 0, 0, width, height);
  let imageData = backgroundContext.getImageData(0, 0, width, height);
  for (var i = 1; i <= imageCount; i++) {
    context.putImageData(imageData, 0, 0);
    context.font = 'bold 140pt Menlo';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillStyle = '#3574d4aa';

    const text = 'WO#' + won;

    const textWidth = context.measureText(text).width;
    context.fillRect(2016 - textWidth / 2 - 25, 1512 - 150, textWidth + 50, 400);
    context.fillStyle = '#ff0a';
    context.fillText(text, 2016, 1412);

    context.fillStyle = '#f00a';
    context.font = 'bold 120pt Menlo';
    context.fillText('IMAGE # ' + i, 2016, 1600);

    const dataURL = canvas.toDataURL('image/jpeg', 0.5);
    var data = dataURL.replace(/^data:image\/\w+;base64,/, '');
    let pad_i = i.toString().padStart(padToDigits, '0');
    let filename = path.join(__dirname, `output/FS_TEST_${won}_${pad_i}.jpg`);
    console.log(filename);
    fs.writeFile(filename, data, { encoding: 'base64' }, () => {});
  }
});
