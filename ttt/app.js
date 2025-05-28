const mousetable = Array.from(document.getElementsByClassName('box'));
let currentPlayer = 'o'; 

// Winning combinations
const winnCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// MouseOver & mouseOut for each box
mousetable.forEach(box => {
    box.addEventListener('mouseover', myfunction1);
    box.addEventListener('mouseout', myfunction2);
    box.addEventListener('click', handleBoxClick); // Add click event to handle moves
});

// Set hover image on mouseover for empty boxes.
function myfunction1() {
    if (!this.classList.contains('boxHuman') && !this.classList.contains('boxComputer')) { 
         this.style.backgroundImage = currentPlayer === 'o' ? "url('img/o.svg')" : "url('img/x.svg')";
    }
}

// Reset box to default on mouseOut (if not occupied)
function myfunction2() { 
    if (!this.classList.contains('boxHuman') && !this.classList.contains('boxComputer')) { 
       this.style.backgroundImage = '';
    }
}

// Handle box click to make a move
function handleBoxClick() {
    if (!this.classList.contains('boxHuman') && !this.classList.contains('boxComputer')) {
        this.classList.add(currentPlayer === 'o' ? 'boxHuman' : 'boxComputer'); 
        this.style.backgroundImage = currentPlayer === 'o' ? "url('img/o.svg')" : "url('img/x.svg')";
        
        // Check for a winner
        if (checkWinner()) {
            setTimeout(() => {
                alert(currentPlayer + " Player wins! Restart?");
                restart();
            }, 100);
            return;
        }

// Check for a draw
        if (checkDraw()) {
            setTimeout(() => {
                alert("It's a draw! Restart?");
                restart();
            }, 100);
            return;
        }

        // Switch to the next player
        switchPlayer();
    }
}
// Function to check for a draw
function checkDraw() {
    return mousetable.every(box => box.classList.contains('boxHuman') || box.classList.contains('boxComputer'));
}

// Function to switch players
function switchPlayer() {
    currentPlayer = currentPlayer === 'o' ? 'x' : 'o'; 
}

// Function to check the winner
function checkWinner() {
    for (let combo of winnCombos) {
        const boxes = combo.map(index => mousetable[index]); // Get the boxes for the current winning combination
        const playerClasses = boxes.map(box => {
            if (box.classList.contains('boxHuman')) {
                return 'boxHuman'; // Player O
            } else if (box.classList.contains('boxComputer')) {
                return 'boxComputer'; // Player X
            } else {
                return null; // Empty box
            }
        });

        // Check if all boxes in the combination belong to the same player
        if (playerClasses[0] !== null && playerClasses.every(cls => cls === playerClasses[0])) {
            return true; // A player wins
        }
    }
    return false; // No winner yet
}

// Restart the game
function restart() {
    // Clear all boxes
    mousetable.forEach(box => {
        box.classList.remove('boxHuman', 'boxComputer');
        box.style.backgroundImage = '';
        box.style.backgroundColor = '';
    });
    currentPlayer = 'o'; // Reset to initial player
}


// Restart the game
function restart() {
    window.location.reload(); // Reload the page to restart the game
}

