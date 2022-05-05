// let label = '';

// let fabric = [];
// let metal = [];
// let paper = [];
// let plastic = [];
// let wood = [];

// const IMAGE_WIDTH = 64;
// const IMAGE_HEIGHT = 64;
// const IMAGE_CHANNELS = 4;
// const options = {
//   task: 'imageClassification',
//   inputs:[IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
//   outputs: ['label']
// }
// const materialClassifier = ml5.neuralNetwork(options);

function setup() {
createCanvas(640, 480)
}

// function addExample(label) {
//   let inputImage = {
//     image: Image,
//   };
//   let target = {
//     label,
//   };
//   console.log('Adding example: ' + label);
//   materialClassifier.addData(inputImage, target);
// }

function draw(){
image('file://Users/luyumeng/Desktop/ML4Artists/Fabric/Fabric1.JPG/', 0, 0)
}