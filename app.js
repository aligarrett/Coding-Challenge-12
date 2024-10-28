// Task 2: Configure the JavaScript for Drawing Context 

// Get references to HTML elements
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color');
const clearButton = document.getElementById('clearCanvas');
const tools = document.getElementsByName('tool');
const shapes = document.getElementsByName('shape');

// Initialize drawing state
let drawing = false; // Tracks whether the user is currently drawing
let currentTool = 'pencil'; // Default tool
let color = colorPicker.value; // Initial color from the color picker
let startX = 0, startY = 0; // Starting position for shapes

// Set up mouse event listeners on the canvas
canvas.addEventListener('mousedown', startDrawing); // Start drawing on mouse down
canvas.addEventListener('mousemove', draw); // Draw on mouse move
canvas.addEventListener('mouseup', stopDrawing); // Stop drawing on mouse up
canvas.addEventListener('mouseout', stopDrawing); // Stop drawing when mouse leaves canvas

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
    drawing = true; // Set drawing state to true
    startX = event.offsetX; // Get the starting X coordinate
    startY = event.offsetY; // Get the starting Y coordinate
    ctx.beginPath(); // Start a new path for drawing
    ctx.moveTo(startX, startY); // Move to the starting position
}

// Draw on canvas
function draw(event) {
    if (!drawing) return; // Exit if not currently drawing

    const currentX = event.offsetX; // Get the current X coordinate
    const currentY = event.offsetY; // Get the current Y coordinate

    // Clear and redraw for dynamic shape sizing
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

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
    ctx.strokeStyle = color; // Set the stroke color
    ctx.lineWidth = currentTool === 'brush' ? 5 : 1; // Set line width based on tool
    ctx.beginPath(); // Start a new path for the line
    ctx.moveTo(startX, startY); // Move to starting position
    ctx.lineTo(x, y); // Draw line to current position
    ctx.stroke(); // Apply the stroke
}

// Stop drawing
function stopDrawing() {
    drawing = false; // Set drawing state to false
    ctx.closePath(); // Close the path

    const currentX = event.offsetX;  // Get the current X coordinate
    const currentY = event.offsetY;  // Get the current Y coordinate

    switch (currentTool) { // Switch based on selected tool
        case 'line':
            drawLine(currentX, currentY); // Draw a line
            break;
        case 'rectangle':
            drawRectangle(currentX, currentY); // Draw a rectangle
            break;
        case 'circle':
            drawCircle(currentX, currentY); // Draw a circle
            break;
        case 'fill':
            fillShape(currentX, currentY); // Fill the shape
            break;
    }
}


// Task 4: Add Color Selection and Canvas Clearing

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
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
    ctx.strokeStyle = color; // Set the stroke color
    ctx.lineWidth = currentTool === 'brush' ? 5 : 1; // Set line width based on tool
    ctx.beginPath(); // Start a new path
    ctx.rect(startX, startY, x - startX, y - startY); // Draw the rectangle
    ctx.stroke(); // Apply the stroke
}

// Draw a circle
function drawCircle(x, y) {
    const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2)); // Calculate the radius
    ctx.strokeStyle = color; // Set the stroke color
    ctx.lineWidth = currentTool === 'brush' ? 5 : 1; // Set line width based on tool
    ctx.beginPath(); // Start a new path
    ctx.arc(startX, startY, radius, 0, Math.PI * 2); // Draw the circle
    ctx.stroke(); // Apply the stroke
}

// Fill a shape (rectangle or circle)
function fillShape(x, y) {
    ctx.fillStyle = color; // Set the fill color
    if (currentShape === 'rectangle') {
        ctx.fillRect(startX, startY, x - startX, y - startY); // Fill the rectangle
    } else if (currentShape === 'circle') {
        const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2)); // Calculate the radius
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2); // Draw the circle
        ctx.fill(); // Fill the circle
    }
}