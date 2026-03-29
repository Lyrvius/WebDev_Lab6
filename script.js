const field = document.getElementById('field');
const currentLevelText = document.getElementById('current-level');
let rows = 1;
let cols = 1;
let currentLevel = 1;
let nextValue = 1;

SetLevel(rows, cols, 1); // Initialize the first level

field.addEventListener('click', function(event) { // Handle cell clicks
    const target = event.target;
    
    if (target.tagName === 'TD') {
        if (parseInt(target.textContent) === nextValue) { // Correct cell clicked
            target.classList.toggle('highlighted');
            nextValue++;    
        }
        if(nextValue > rows * cols) { // Level completed
            currentLevel++;
            rows++;
            cols++;
            SetLevel(rows, cols, currentLevel);
        }
    }
});

function CreateField(rows, cols, values) {
    for (let i = 0; i < rows; i++) {
        let row = document.createElement('tr');
        
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('td');
            let size = GetRandomInt(15, 23); // Random font size for each cell
            cell.style.fontSize = size + 'px';
            cell.textContent = values[i * cols + j];
            row.appendChild(cell);
        }
        
        field.appendChild(row);
    }
}

function SetLevel(newRows, newCols, level) { // Change the field to the new level
    rows = newRows;
    cols = newCols;
    currentLevel = level;
    currentLevelText.textContent = `Level ${level}`;
    field.innerHTML = '';
    nextValue = 1;
    let fieldValues = ShuffleArray(GenerateArray(rows * cols));
    CreateField(rows, cols, fieldValues);
}

function GenerateArray(size) { // Generate an array of numbers from 1 to size
    let array = [];
    for (let i = 1; i < size + 1; i++) {
        array.push(i);
    }
    return array;
}

function ShuffleArray(array) { // Shuffle the array using the Fisher-Yates algorithm
    let shuffledArray = [];

    while (array.length > 0) {
        let randomIndex = GetRandomInt(0, array.length - 1);
        shuffledArray.push(array.splice(randomIndex, 1)[0]);
    }
    return shuffledArray;
}

function GetRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}