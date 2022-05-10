let img;

let arrowY = 375;
let imgSize = 400;
let inputText = '';
let result = '';
let confidence = 0;

let firstTrained = false;
let introductionScene = true;
let imageUploadedScene = false;
let categorisedScene = false;
let testingScene = false;
let inputError = false;

let options = {
    inputs: [imgSize, imgSize, 4],
    task: 'imageClassification',
    debug: true,
}
let nn = ml5.neuralNetwork(options);


function setup() {
    createCanvas(800, 400);
    
    // see https://p5js.org/reference/#/p5/createFileInput
    let fileInput = createFileInput(handleFile, true);
    fileInput.position(0, 400);

    let inp = createInput('');
    inp.position(200, 420);
    inp.size(200);
    inp.input(textInput);

    let saveButton = createButton('Save data');
    saveButton.position(0, 420);
    saveButton.mousePressed(saveData);
    
}
  
function draw() {
      if (introductionScene) {
          if (!firstTrained) {
            introduction();
          } else {
            trained();
          }
      } else if (imageUploadedScene) {
        imageUploaded();
        if (inputError) {
            fill(255, 0, 0);
            textSize(15);
            textAlign(CENTER);
            text('ERROR: Material must be defined', 200, 350);
        }
      } else if (categorisedScene) {
        categorised();
      } else if (testingScene) {
        testing();
      }
    
}
  
function handleFile(file) {
    if (file.type !== 'image') {
        console.log(file.name + ' is not an image, ignoring');
        return;
    }
    console.log('Adding ' + file.name + '...');
  
    // turn it into an image
    
    img = createImg(file.data, '');
    img.size(imgSize, imgSize);
    img.hide();
    console.log(img)
    if (!firstTrained) {
        imageUploadedScene = true;
        testingScene = false;
    } else {
        testingScene = true;
    }
    introductionScene = false;
    categorisedScene = false;
    

    // you should be able to add img to the Neural Network
    // here, e.g.
    //pixelBrain.addData(img, label);

}

//Scenes
function introduction() {
    inputError = false;
    background(255);
    fill(0);
    textSize(30);
    textAlign(CENTER);
    text('This program is here to', 200, 100);
    text('help build a future project:', 200, 140);
    textSize(20);
    text('A webcam-based material detecting', 200, 190);
    text('neural network', 200, 220);
    textAlign(LEFT);
    textSize(15);
    text('Click here to add', 10, 295);
    text('an image for training', 10, 315);
    strokeWeight(3);
    line(45, arrowY - 50, 45, arrowY);
    line(45, arrowY, 45 - 15, arrowY - 20);
    line(45, arrowY, 45 + 15, arrowY - 20);
    arrowY += sin(frameCount / 10);
}

function imageUploaded() {
    background(255);
    fill(0);
    textSize(30);
    textAlign(CENTER);
    text('Thank you!', 200, 100);
    text('What is it made of?', 200, 140);
    textSize(20);
    text('Please input below:', 200, 180)

    if (((mouseX < 200 + 30) && (mouseX > 200 - 30)) && ((mouseY > 245) && (mouseY < 280))) {
        fill(0, 125, 255);
    } else {
        fill(0);
    }
    textSize(15);
    text('Done!', 200, 260);
    image(img, 400, 0);
    strokeWeight(3);
    line(240, arrowY - 180, 240, arrowY);
    line(240, arrowY, 240 - 15, arrowY - 20);
    line(240, arrowY, 240 + 15, arrowY - 20);
    arrowY += sin(frameCount / 10);
    
}

function categorised() {
    background(255);
    fill(0)
    textSize(30);
    textAlign(CENTER);
    text('Thank you!', 200, 140);
    textSize(20);
    text('Keep uploading files until you have', 200, 180);
    text('at least two categories.', 200, 210)
}

function testing() {
    classifyObject();
    background(255);
    image(img, 400, 0);
    fill(0)
    textSize(20);
    textAlign(CENTER);
    text('It is ' + confidence * 100 + '% sure that', 200, 130);
    text('the object in this image is made of...', 200, 150);
    fill(255, 0, 255);
    text(result, 200, 180);
    fill(0);
    text('Is it correct?', 200, 210)
    if (((mouseX < 75 + 50) && (mouseX > 75)) && ((mouseY > 225) && (mouseY < 225 + 30))) {
        fill(0, 200, 0);
    } else {
        fill(0);
    }
    text('YES', 100, 250);
    if (((mouseX < 275 + 50) && (mouseX > 275)) && ((mouseY > 225) && (mouseY < 225 + 30))) {
        fill(255, 0, 0);
    } else {
        fill(0);
    }
    text('NO', 300, 250);
}

function trained() {
    inputError = false;
    background(255);
    fill(0);
    textSize(30);
    textAlign(CENTER);
    text('Thank you!', 200, 100);
    textSize(20);
    text('You have trained', 200, 140);
    text('a neural network.', 200, 170);
    textAlign(LEFT);
    text('Please upload another image', 10, 295);
    text('for the machine to classify.', 10, 315);
    strokeWeight(3);
    line(45, arrowY - 50, 45, arrowY);
    line(45, arrowY, 45 - 15, arrowY - 20);
    line(45, arrowY, 45 + 15, arrowY - 20);
    arrowY += sin(frameCount / 10);
}

//Interactions
function mousePressed() {
    arrowY = 375;
    if (imageUploadedScene) {
        // If mouse goes to "Done!" button
        if (((mouseX < 200 + 30) && (mouseX > 200 - 30)) && ((mouseY > 245) && (mouseY < 280))) {
            if (inputText == '') {
                error();
            }
            else {
            categorisedScene = true;
            imageUploadedScene = false;
            introductionScene = false;
            testingScene = false;
            addExample(inputText);

            nn.normalizeData();
            nn.train({epochs: 50}, finishedTraining)
            }
        }
    } else if (categorisedScene) {
        introductionScene = true;
        imageUploadedScene = false;
        categorisedScene = false;
        testingScene = false;
    } else if (testingScene) {
        // If mouse goes to "YES" button
        if (((mouseX < 75 + 50) && (mouseX > 75)) && ((mouseY > 225) && (mouseY < 225 + 30))) {
         
            addExample(result);

            nn.normalizeData();
            nn.train({epochs: 50}, finishedTraining)
        } 

        // If mouse goes to "NO" button
        if (((mouseX < 275 + 50) && (mouseX > 275)) && ((mouseY > 225) && (mouseY < 225 + 30))) {
             
            imageUploadedScene = true;
            introductionScene = false;
            categorisedScene = false;
            testingScene = false;
        } 
    }
    
    
}

function textInput(){
    inputText = this.value();
    console.log(inputText);
}

function addExample(label) {
    let inputImage = {
      image: img,
    };
    let target = {
      label,
    };
    console.log('Adding example: ' + label);
    nn.addData(inputImage, target);
}

function saveData() {
    nn.saveData();
}

function finishedTraining() {
    firstTrained = true;
    console.log('Training complete!');
    introductionScene = true;
}

function classifyObject() {
    let inputImage = {
        image: img,
      };
      nn.classify(inputImage, gotResults);
}

function gotResults(error, results) {
    if (error) {
      return;
    }
    result = results[0].label;
    confidence = results[0].confidence;
    console.log(results)
  }

function error() {
    inputError = true;
    console.log('ERROR: material must be defined')
}