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

const debugInfo = document.getElementById('debug-info');

// Default values
const defaults = {
    font: 'Manjari',
    size: '24',
    color: '#2f3640',
    weight: 'normal',
    italic: false,
    background: '#f5f6fa'
};

let isItalic = false;
let isCursorVisible = true;

// Add PWA install prompt functionality
let deferredPrompt;

// Create install button in the controls section
const installButton = document.createElement('button');
installButton.textContent = '📱 Install App';
installButton.classList.add('install-button');
// Add it to the beginning of controls
const controlsDiv = document.querySelector('.controls');
controlsDiv.insertBefore(installButton, controlsDiv.firstChild);

// Initially hide the button
installButton.style.display = 'none';

// Debug logging
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt fired');
    e.preventDefault();
    deferredPrompt = e;
    // Show the install button
    installButton.style.display = 'block';
});

installButton.addEventListener('click', async () => {
    console.log('Install button clicked');
    if (!deferredPrompt) {
        console.log('No deferred prompt available');
        return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    deferredPrompt = null;
    installButton.style.display = 'none';
});

window.addEventListener('appinstalled', (evt) => {
    console.log('App was installed');
    installButton.style.display = 'none';
});
const printDebugInfo = (msg) => {
    debugInfo.textContent = msg;
}

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

// Add hex input listeners for font color
fontColorHex.addEventListener('input', (e) => {
    const hexValue = e.target.value;
    // Validate hex color format
    if (/^#[0-9A-Fa-f]{6}$/.test(hexValue)) {
        fontColor.value = hexValue;
        updateTextStyle();
    }
});

// Add hex input listeners for background color
bgColorHex.addEventListener('input', (e) => {
    const hexValue = e.target.value;
    // Validate hex color format
    if (/^#[0-9A-Fa-f]{6}$/.test(hexValue)) {
        bgColor.value = hexValue;
        updateTextStyle();
    }
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
const ADJUSTED_OFFSET = 100;
function setSizeByRatio(ratioWidth, ratioHeight) {
    const deviceWidth = window.innerWidth-ADJUSTED_OFFSET;
    textDisplay.style.height = `${deviceWidth*ratioHeight}px`;
    textDisplay.style.width = `${deviceWidth*ratioWidth}px`;
}
// Size modes

function setSizeMode(mode) {
    switch(mode) {
        case 'square':
           setSizeByRatio(1,1);
            break;
        case 'landscape':
            setSizeByRatio(1,0.56);
           
            break;
        case 'portrait':
            setSizeByRatio(1,1.78);
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

// Horizontal alignment
alignLeft.addEventListener('click', () => {
    textDisplay.style.textAlign = 'left';
    updateActiveButton([alignLeft, alignCenter, alignRight], alignLeft);
});

alignCenter.addEventListener('click', () => {
    textDisplay.style.textAlign = 'center';
    updateActiveButton([alignLeft, alignCenter, alignRight], alignCenter);
});

alignRight.addEventListener('click', () => {
    textDisplay.style.textAlign = 'right';
    updateActiveButton([alignLeft, alignCenter, alignRight], alignRight);
});

// Vertical alignment
alignTop.addEventListener('click', () => {
    textDisplay.style.justifyContent = 'flex-start';
    updateActiveButton([alignTop, alignMiddle, alignBottom], alignTop);
});

alignMiddle.addEventListener('click', () => {
    textDisplay.style.justifyContent = 'center';
    updateActiveButton([alignTop, alignMiddle, alignBottom], alignMiddle);
});

alignBottom.addEventListener('click', () => {
    textDisplay.style.justifyContent = 'flex-end';
    updateActiveButton([alignTop, alignMiddle, alignBottom], alignBottom);
});

// Make sure text display has flex properties
textDisplay.style.display = 'flex';
textDisplay.style.flexDirection = 'column';
textDisplay.style.minHeight = '100%'; // Ensure full height for alignment

// Reset function
resetButton.addEventListener('click', () => {
    fontSelect.value = defaults.font;
    fontSize.value = defaults.size;
    fontColor.value = defaults.color;
    fontColorHex.value = defaults.color;
    fontWeight.value = defaults.weight;
    bgColor.value = defaults.background;
    bgColorHex.value = defaults.background;
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

// Set initial alignment states
window.addEventListener('load', () => {
    setSizeMode('square');
    updateTextStyle();
    
    // Set default horizontal alignment (left) and highlight the button
    textDisplay.style.textAlign = 'left';
    alignLeft.classList.add('active');
    
    // Set default vertical alignment (top) and highlight the button
    textDisplay.style.justifyContent = 'flex-start';
    alignTop.classList.add('active');
});