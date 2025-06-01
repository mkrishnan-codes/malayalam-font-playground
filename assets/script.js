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

  // Define storage key
  const STORAGE_KEY = 'malayalamFontPlayground';

  // Update text styling function
  function updateTextStyle() {
      textDisplay.style.fontFamily = fontSelect.value;
      textDisplay.style.fontSize = fontSize.value + 'px';
      textDisplay.style.color = fontColor.value;
      textDisplay.style.fontWeight = fontWeight.value;
      textDisplay.style.backgroundColor = bgColor.value;
  }

  // Add event listeners
  fontSelect.addEventListener('change', updateTextStyle);
  fontSize.addEventListener('input', updateTextStyle);
  fontColor.addEventListener('input', (e) => {
      fontColorHex.value = e.target.value;
      updateTextStyle();
  });
  fontWeight.addEventListener('change', updateTextStyle);
  bgColor.addEventListener('input', (e) => {
      bgColorHex.value = e.target.value;
      updateTextStyle();
  });

  // Toggle italic
  let isItalic = false;
  italicToggle.addEventListener('click', () => {
      isItalic = !isItalic;
      textDisplay.style.fontStyle = isItalic ? 'italic' : 'normal';
      italicToggle.classList.toggle('active');
  });

  // Cursor toggle functionality
  let isCursorVisible = true;
  cursorToggle.addEventListener('click', () => {
      isCursorVisible = !isCursorVisible;
      textDisplay.classList.toggle('hide-cursor');
      cursorToggle.textContent = isCursorVisible ? 'Hide Cursor' : 'Show Cursor';
      cursorToggle.classList.toggle('active');
  });

  // Screenshot functionality
  screenshotButton.addEventListener('click', () => {
      const randomPrefix = Math.random().toString(36).substring(2, 6);
      
      html2canvas(textDisplay, {
          backgroundColor: textDisplay.style.backgroundColor || '#ffffff',
          scale: 2.5,  // Increased scale for better quality
          useCORS: true,
          logging: false
      }).then(canvas => {
          const link = document.createElement('a');
          link.download = `${randomPrefix}-malayalam-text.png`;
          link.href = canvas.toDataURL('image/png', 1.0); // Maximum quality
          link.click();
      });
  });

  // Update hex inputs when color pickers change
  fontColorHex.addEventListener('input', (e) => {
      if (e.target.checkValidity()) {
          fontColor.value = e.target.value;
          updateTextStyle();
      }
  });

  bgColorHex.addEventListener('input', (e) => {
      if (e.target.checkValidity()) {
          bgColor.value = e.target.value;
          updateTextStyle();
      }
  });

  // Horizontal alignment
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

  // Vertical alignment
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

  // Helper function to update active button state
  function updateActiveButton(buttons, activeButton) {
      buttons.forEach(button => button.classList.remove('active'));
      activeButton.classList.add('active');
  }

  // Function to save state to localStorage
  function saveToLocalStorage() {
      const state = {
          font: fontSelect.value,
          size: fontSize.value,
          color: fontColor.value,
          weight: fontWeight.value,
          italic: isItalic,
          background: bgColor.value,
          text: textDisplay.innerHTML,
          cursorVisible: isCursorVisible,
          alignmentH: textDisplay.classList.contains('align-right') ? 'right' : 
                     textDisplay.classList.contains('align-center') ? 'center' : 'left',
          alignmentV: textDisplay.classList.contains('align-bottom') ? 'bottom' : 
                     textDisplay.classList.contains('align-middle') ? 'middle' : 'top',
          sizeMode: textDisplay.style.width === '1200px' ? 'landscape' : 
                   textDisplay.style.height === '1200px' ? 'portrait' : 'square'
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // Function to load state from localStorage
  function loadFromLocalStorage() {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
          const state = JSON.parse(savedState);
          
          // Restore values
          fontSelect.value = state.font;
          fontSize.value = state.size;
          fontColor.value = state.color;
          fontWeight.value = state.weight;
          bgColor.value = state.background;
          textDisplay.innerHTML = state.text;
          
          // Restore italic state
          isItalic = state.italic;
          textDisplay.style.fontStyle = isItalic ? 'italic' : 'normal';
          italicToggle.classList.toggle('active', isItalic);
          
          // Restore cursor visibility
          isCursorVisible = state.cursorVisible;
          textDisplay.classList.toggle('hide-cursor', !isCursorVisible);
          cursorToggle.textContent = isCursorVisible ? 'Hide Cursor' : 'Show Cursor';
          cursorToggle.classList.toggle('active', !isCursorVisible);
          
          // Restore horizontal alignment
          switch(state.alignmentH) {
              case 'right':
                  alignRight.click();
                  break;
              case 'center':
                  alignCenter.click();
                  break;
              default:
                  alignLeft.click();
          }
          
          // Restore vertical alignment
          switch(state.alignmentV) {
              case 'bottom':
                  alignBottom.click();
                  break;
              case 'middle':
                  alignMiddle.click();
                  break;
              default:
                  alignTop.click();
          }
          
          // Restore size mode
          setSizeMode(state.sizeMode);
          
          // Update hex inputs
          fontColorHex.value = state.color;
          bgColorHex.value = state.background;
          
          // Update display
          updateTextStyle();
      }
  }

  // Add storage event listeners to all controls
  fontSelect.addEventListener('change', saveToLocalStorage);
  fontSize.addEventListener('input', saveToLocalStorage);
  fontColor.addEventListener('input', saveToLocalStorage);
  fontWeight.addEventListener('change', saveToLocalStorage);
  bgColor.addEventListener('input', saveToLocalStorage);
  textDisplay.addEventListener('input', saveToLocalStorage);
  italicToggle.addEventListener('click', saveToLocalStorage);
  cursorToggle.addEventListener('click', saveToLocalStorage);

  // Add storage to alignment buttons
  [alignLeft, alignCenter, alignRight, alignTop, alignMiddle, alignBottom]
      .forEach(button => button.addEventListener('click', saveToLocalStorage));

  // Add storage to size mode buttons
  [squareButton, landscapeButton, portraitButton]
      .forEach(button => button.addEventListener('click', saveToLocalStorage));

  // Reset function
  function resetStyles() {
      localStorage.removeItem(STORAGE_KEY);
      fontSelect.value = defaults.font;
      fontSize.value = defaults.size;
      fontColor.value = defaults.color;
      fontWeight.value = defaults.weight;
      bgColor.value = defaults.background;
      
      // Reset italic
      isItalic = defaults.italic;
      textDisplay.style.fontStyle = 'normal';
      italicToggle.classList.remove('active');
      
      // Reset cursor visibility
      isCursorVisible = true;
      textDisplay.classList.remove('hide-cursor');
      cursorToggle.textContent = 'Hide Cursor';
      cursorToggle.classList.remove('active');
      
      // Reset alignments
      textDisplay.classList.remove(
          'align-left', 'align-center', 'align-right',
          'align-top', 'align-middle', 'align-bottom'
      );
      textDisplay.classList.add('align-left', 'align-top');
      
      // Reset alignment buttons
      updateActiveButton([alignLeft, alignCenter, alignRight], alignLeft);
      updateActiveButton([alignTop, alignMiddle, alignBottom], alignTop);
      
      // Update display
      updateTextStyle();
      fontColorHex.value = defaults.color;
      bgColorHex.value = defaults.background;
  }

  // Add reset button event listener
  resetButton.addEventListener('click', resetStyles);

  // Add text display container sizing
  function initializeTextDisplay() {
      // Set initial dimensions
      textDisplay.style.minHeight = '200px';  // Minimum starting height
      textDisplay.style.maxHeight = '2800px';  // Maximum height
      textDisplay.style.width = '95vw';       // 90% of viewport width
      textDisplay.style.maxWidth = '1500px';  // Maximum width
      
      // Make text display auto-expandable
      textDisplay.addEventListener('input', function() {
          this.style.height = 'auto';
          const newHeight = Math.min(Math.max(this.scrollHeight, 200), 2800);
          this.style.height = newHeight + 'px';
      });
  }

  // Add to initialization
  function initialize() {
      updateTextStyle();
      initializeTextDisplay();
      textDisplay.classList.add('align-left', 'align-top');
      alignLeft.classList.add('active');
      alignTop.classList.add('active');
  }

  // Call initialize instead of individual functions
  initialize();

  // Add event listeners for size mode buttons
  squareButton.addEventListener('click', () => setSizeMode('square'));
  landscapeButton.addEventListener('click', () => setSizeMode('landscape'));
  portraitButton.addEventListener('click', () => setSizeMode('portrait'));

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
      
      // Update active button state
      updateActiveButton([squareButton, landscapeButton, portraitButton], 
          document.getElementById(`${mode}-button`));
  }

  // Set default size mode when page loads
  window.addEventListener('load', () => {
      setSizeMode('square');  // Set square as default
  });

  // Load saved state when page loads
  window.addEventListener('load', loadFromLocalStorage);