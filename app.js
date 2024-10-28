// Task 2: Configure the JavaScript for Drawing Context

// Get references to HTML elements
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const colorPicker = document.getElementById('color');
const clearButton = document.getElementById('clearCanvas');
const tools = document.getElementsByName('tool');
const shapes = document.getElementsByName('shape');

// Initialize drawing state
let drawing = false;
let currentTool = 'pencil';
let color = colorPicker.value;
let startX = 0, startY = 0; // Starting position for shapes

// Set up mouse event listeners on the canvas
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Tool selection event listener
tools.forEach(tool => {
    tool.addEventListener('change', () => {
        currentTool = document.querySelector('input[name="tool"]:checked').value;
    });
});

// Color selection event listener
colorPicker.addEventListener('input', (event) => {
    color = event.target.value;
});

// Clear canvas button event listener
clearButton.addEventListener('click', clearCanvas);

// Start drawing
function startDrawing(event) {
    drawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
    context.beginPath();
    context.moveTo(startX, startY);
}

// Draw on canvas
function draw(event) {
    if (!drawing) return;

    const currentX = event.offsetX;
    const currentY = event.offsetY;

    // Choose drawing function based on selected tool
    if (currentTool === 'eraser') {
        clearCanvas(); // Clear the canvas while drawing as an eraser
    } else {
        drawLine(currentX, currentY);
    }
}

// Draw a line
function drawLine(x, y) {
    context.strokeStyle = color;
    context.lineWidth = currentTool === 'brush' ? 5 : 1;
    context.lineTo(x, y);
    context.stroke();
}

// Stop drawing
function stopDrawing() {
    drawing = false;
    context.closePath();
}

// Clear the canvas
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Task 3: Implement Shape Drawing Logic

// Initialize shape state
let currentShape = 'line'; // Default shape

// Shape selection event listener
shapes.forEach(shape => {
    shape.addEventListener('change', () => {
        currentShape = document.querySelector('input[name="shape"]:checked').value;
    });
});

// Draw on canvas with shapes
function draw(event) {
    if (!drawing) return;

    const currentX = event.offsetX;
    const currentY = event.offsetY;

    // Clear and redraw for dynamic shape sizing
    context.clearRect(0, 0, canvas.width, canvas.height);

    switch (currentShape) {
        case 'line':
            drawLine(currentX, currentY);
            break;
        case 'rectangle':
            drawRectangle(currentX, currentY);
            break;
        case 'circle':
            drawCircle(currentX, currentY);
            break;
    }
}

// Draw a rectangle
function drawRectangle(x, y) {
    context.strokeStyle = color;
    context.lineWidth = currentTool === 'brush' ? 5 : 1;
    context.beginPath();
    context.rect(startX, startY, x - startX, y - startY);
    context.stroke();
}

// Draw a circle
function drawCircle(x, y) {
    const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
    context.strokeStyle = color;
    context.lineWidth = currentTool === 'brush' ? 5 : 1;
    context.beginPath();
    context.arc(startX, startY, radius, 0, Math.PI * 2);
    context.stroke();
}