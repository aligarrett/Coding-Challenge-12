// Task 2: Configure the JavaScript for Drawing Context

// Get references to HTML elements
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const colorPicker = document.getElementById('color');
const clearButton = document.getElementById('clearCanvas');
const tools = document.getElementsByName('tool');
const shapes = document.getElementsByName('shape');

// Initialize drawing state
let drawing = false;              // Tracks whether the user is currently drawing
let currentTool = 'pencil';       // Default tool
let color = colorPicker.value;     // Initial color from the color picker
let startX = 0, startY = 0;       // Starting position for shapes

// Set up mouse event listeners on the canvas
canvas.addEventListener('mousedown', startDrawing); // Start drawing on mouse down
canvas.addEventListener('mousemove', draw);          // Draw on mouse move
canvas.addEventListener('mouseup', stopDrawing);      // Stop drawing on mouse up
canvas.addEventListener('mouseout', stopDrawing);     // Stop drawing when mouse leaves canvas

// Tool selection event listener
tools.forEach(tool => {
    tool.addEventListener('change', () => {
        currentTool = document.querySelector('input[name="tool"]:checked').value; // Update tool selection
    });
});

// Task 4: Add Color Selection and Canvas Clearing

// Color selection event listener
colorPicker.addEventListener('input', (event) => {
    color = event.target.value; // Update color based on user selection
});

// Clear canvas button event listener
clearButton.addEventListener('click', clearCanvas); // Clear canvas when button is clicked

// Start drawing
function startDrawing(event) {
    drawing = true;                   // Set drawing state to true
    startX = event.offsetX;          // Get the starting X coordinate
    startY = event.offsetY;          // Get the starting Y coordinate
    context.beginPath();             // Start a new path for drawing
    context.moveTo(startX, startY);  // Move to the starting position
}

// Draw on canvas
function draw(event) {
    if (!drawing) return;             // Exit if not currently drawing

    const currentX = event.offsetX;  // Get the current X coordinate
    const currentY = event.offsetY;  // Get the current Y coordinate

    // Clear and redraw for dynamic shape sizing
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    switch (currentShape) { // Switch based on selected shape
        case 'line':
            drawLine(currentX, currentY); // Draw a line
            break;
        case 'rectangle':
            drawRectangle(currentX, currentY); // Draw a rectangle
            break;
        case 'circle':
            drawCircle(currentX, currentY); // Draw a circle
            break;
    }
}

// Draw a line
function drawLine(x, y) {
    context.strokeStyle = color; // Set the stroke color
    context.lineWidth = currentTool === 'brush' ? 5 : 1; // Set line width based on tool
    context.lineTo(x, y); // Draw line to current position
    context.stroke(); // Apply the stroke
}

// Stop drawing
function stopDrawing() {
    drawing = false; // Set drawing state to false
    context.closePath(); // Close the path
}

// Task 4: Add Color Selection and Canvas Clearing

// Clear the canvas
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
}

// Task 3: Implement Shape Drawing Logic

// Initialize shape state
let currentShape = 'line'; // Default shape

// Shape selection event listener
shapes.forEach(shape => {
    shape.addEventListener('change', () => {
        currentShape = document.querySelector('input[name="shape"]:checked').value; // Update selected shape
    });
});

// Draw a rectangle
function drawRectangle(x, y) {
    context.strokeStyle = color; // Set the stroke color
    context.lineWidth = currentTool === 'brush' ? 5 : 1; // Set line width based on tool
    context.beginPath(); // Start a new path
    context.rect(startX, startY, x - startX, y - startY); // Draw the rectangle
    context.stroke(); // Apply the stroke
}

// Draw a circle
function drawCircle(x, y) {
    const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2)); // Calculate the radius
    context.strokeStyle = color; // Set the stroke color
    context.lineWidth = currentTool === 'brush' ? 5 : 1; // Set line width based on tool
    context.beginPath(); // Start a new path
    context.arc(startX, startY, radius, 0, Math.PI * 2); // Draw the circle
    context.stroke(); // Apply the stroke
}