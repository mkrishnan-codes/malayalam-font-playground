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

  // Default values
  const defaults = {
      font: 'Karumbi',
      size: '24',
      color: '#000000',
      weight: 'normal',
      italic: false,
      background: '#ffffff'
  };

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
      // Generate random 4-letter string
      const randomPrefix = Math.random().toString(36).substring(2, 6);
      
      html2canvas(textDisplay, {
          backgroundColor: textDisplay.style.backgroundColor || '#ffffff',
          scale: 2  // For better quality
      }).then(canvas => {
          const link = document.createElement('a');
          link.download = `${randomPrefix}-malayalam-text.png`;
          link.href = canvas.toDataURL('image/png');
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

  // Reset function
  function resetStyles() {
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

  // Initialize
  updateTextStyle();
  textDisplay.classList.add('align-left', 'align-top');
  alignLeft.classList.add('active');
  alignTop.classList.add('active');