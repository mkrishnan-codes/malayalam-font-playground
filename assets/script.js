// Get all control elements
const fontSelect = document.getElementById('font-family');
const fontSize = document.getElementById('font-size');
const fontColor = document.getElementById('font-color');
const fontWeight = document.getElementById('font-weight');
const italicToggle = document.getElementById('italic-toggle');
const bgColor = document.getElementById('bg-color');
const textDisplay = document.getElementById('text-display');
const resetButton = document.getElementById('reset-button');
const cursorToggle = document.getElementById('cursor-toggle');
const screenshotButton = document.getElementById('screenshot-button');
const fontColorHex = document.getElementById('font-color-hex');
const bgColorHex = document.getElementById('bg-color-hex');

// Get alignment buttons
const alignLeft = document.getElementById('align-left');
const alignCenter = document.getElementById('align-center');
const alignRight = document.getElementById('align-right');
const alignTop = document.getElementById('align-top');
const alignMiddle = document.getElementById('align-middle');
const alignBottom = document.getElementById('align-bottom');

// Get size mode buttons
const squareButton = document.getElementById('square-button');
const landscapeButton = document.getElementById('landscape-button');
const portraitButton = document.getElementById('portrait-button');

// Default values
const defaults = {
    font: 'Karumbi',
    size: '24',
    color: '#000000',
    weight: 'normal',
    italic: false,
    background: '#ffffff'
};

let isItalic = false;
let isCursorVisible = true;

// Basic update function
function updateTextStyle() {
    textDisplay.style.fontFamily = fontSelect.value;
    textDisplay.style.fontSize = fontSize.value + 'px';
    textDisplay.style.color = fontColor.value;
    textDisplay.style.fontWeight = fontWeight.value;
    textDisplay.style.backgroundColor = bgColor.value;
    textDisplay.style.fontStyle = isItalic ? 'italic' : 'normal';
}

// Basic event listeners
fontSelect.addEventListener('change', updateTextStyle);
fontSize.addEventListener('input', updateTextStyle);
fontWeight.addEventListener('change', updateTextStyle);

fontColor.addEventListener('input', (e) => {
    fontColorHex.value = e.target.value;
    updateTextStyle();
});

bgColor.addEventListener('input', (e) => {
    bgColorHex.value = e.target.value;
    updateTextStyle();
});

// Toggle italic
italicToggle.addEventListener('click', () => {
    isItalic = !isItalic;
    italicToggle.classList.toggle('active');
    updateTextStyle();
});

// Cursor toggle
cursorToggle.addEventListener('click', () => {
    isCursorVisible = !isCursorVisible;
    textDisplay.classList.toggle('hide-cursor');
    cursorToggle.textContent = isCursorVisible ? 'Hide Cursor' : 'Show Cursor';
    cursorToggle.classList.toggle('active');
});

// Size modes
function setSizeMode(mode) {
    switch(mode) {
        case 'square':
            textDisplay.style.height = '800px';
            textDisplay.style.width = '800px';
            break;
        case 'landscape':
            textDisplay.style.height = '800px';
            textDisplay.style.width = '1200px';
            break;
        case 'portrait':
            textDisplay.style.height = '1200px';
            textDisplay.style.width = '800px';
            break;
    }
    updateActiveButton([squareButton, landscapeButton, portraitButton], 
        document.getElementById(`${mode}-button`));
}

squareButton.addEventListener('click', () => setSizeMode('square'));
landscapeButton.addEventListener('click', () => setSizeMode('landscape'));
portraitButton.addEventListener('click', () => setSizeMode('portrait'));

// Alignment functions
function updateActiveButton(buttons, activeButton) {
    buttons.forEach(button => button.classList.remove('active'));
    activeButton.classList.add('active');
}

alignLeft.addEventListener('click', () => {
    textDisplay.classList.remove('align-center', 'align-right');
    textDisplay.classList.add('align-left');
    updateActiveButton([alignLeft, alignCenter, alignRight], alignLeft);
});

alignCenter.addEventListener('click', () => {
    textDisplay.classList.remove('align-left', 'align-right');
    textDisplay.classList.add('align-center');
    updateActiveButton([alignLeft, alignCenter, alignRight], alignCenter);
});

alignRight.addEventListener('click', () => {
    textDisplay.classList.remove('align-left', 'align-center');
    textDisplay.classList.add('align-right');
    updateActiveButton([alignLeft, alignCenter, alignRight], alignRight);
});

alignTop.addEventListener('click', () => {
    textDisplay.classList.remove('align-middle', 'align-bottom');
    textDisplay.classList.add('align-top');
    updateActiveButton([alignTop, alignMiddle, alignBottom], alignTop);
});

alignMiddle.addEventListener('click', () => {
    textDisplay.classList.remove('align-top', 'align-bottom');
    textDisplay.classList.add('align-middle');
    updateActiveButton([alignTop, alignMiddle, alignBottom], alignMiddle);
});

alignBottom.addEventListener('click', () => {
    textDisplay.classList.remove('align-top', 'align-middle');
    textDisplay.classList.add('align-bottom');
    updateActiveButton([alignTop, alignMiddle, alignBottom], alignBottom);
});

// Reset function
resetButton.addEventListener('click', () => {
    fontSelect.value = defaults.font;
    fontSize.value = defaults.size;
    fontColor.value = defaults.color;
    fontWeight.value = defaults.weight;
    bgColor.value = defaults.background;
    isItalic = false;
    italicToggle.classList.remove('active');
    textDisplay.classList.remove('hide-cursor');
    cursorToggle.textContent = 'Hide Cursor';
    cursorToggle.classList.remove('active');
    setSizeMode('square');
    updateTextStyle();
});

// Screenshot functionality
screenshotButton.addEventListener('click', () => {
    const randomPrefix = Math.random().toString(36).substring(2, 6);
    html2canvas(textDisplay, {
        backgroundColor: textDisplay.style.backgroundColor || '#ffffff',
        scale: 2.5,
        useCORS: true,
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `${randomPrefix}-malayalam-text.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
    });
});

// Initialize
window.addEventListener('load', () => {
    setSizeMode('square');
    updateTextStyle();
});