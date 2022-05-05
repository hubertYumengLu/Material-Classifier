let label = '';

let fabric = [];
for (let i = 0; i < )

let metal = [];
let paper = [];
let plastic = [];
let wood = [];

// const IMAGE_WIDTH = 64;
// const IMAGE_HEIGHT = 64;
// const IMAGE_CHANNELS = 4;
// const options = {
//   task: 'imageClassification',
//   inputs:[IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
//   outputs: ['label']
// }
// const materialClassifier = ml5.neuralNetwork(options);
let img;

function setup() {
createCanvas(640, 480)
img = loadImage('Fabric/Fabric1.JPG');
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
image(img, 0, 0)
}