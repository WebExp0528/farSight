const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

var imageCount = new Number(process.argv[3]);
var won = process.argv[2];
const width = 1200;
const height = 630;

const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');

loadImage('./resources/TESTBACKDROP.png').then(image => {
  for (var i = 1; i <= imageCount; i++) {
    context.drawImage(image, 0, 0, width, height);

    context.font = 'bold 70pt Menlo';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillStyle = '#3574d4';

    const text = 'WO#' + won;

    const textWidth = context.measureText(text).width;
    context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120);
    context.fillStyle = '#ff0';
    context.fillText(text, 600, 170);

    context.fillStyle = '#f00';
    context.font = 'bold 30pt Menlo';
    context.fillText('IMAGE # ' + i, 600, 530);

    const dataURL = canvas.toDataURL('image/jpeg', 0.5);
    var data = dataURL.replace(/^data:image\/\w+;base64,/, '');

    let filename = './output/FS_TEST_' + won + '_' + i + '.jpg';
    console.log(dataURL);
    fs.writeFileSync(filename, data, { encoding: 'base64' });
  }
});
