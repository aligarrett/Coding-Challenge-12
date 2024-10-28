// Task 2: Configure the JavaScript for Drawing Context

// Get references to HTML elements
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const colorPicker = document.getElementById('color');
const clearButton = document.getElementById('clearCanvas');
const tools = document.getElementsByName('tool');

// Initialize drawing state
let drawing = false;
let currentTool = 'pencil';
let color = colorPicker.value;

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
    context.beginPath();
    context.moveTo(event.offsetX, event.offsetY);
}

// Draw on canvas
function draw(event) {
    if (!drawing) return;

    context.lineTo(event.offsetX, event.offsetY);
    context.strokeStyle = color;
    context.lineWidth = currentTool === 'brush' ? 5 : 1;
    context.globalCompositeOperation = currentTool === 'eraser' ? 'destination-out' : 'source-over';
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
