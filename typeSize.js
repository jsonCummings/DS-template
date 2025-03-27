function updateTypographySize() {
    const baseSize = document.getElementById('typographySize').value;
    const scaleFont = document.getElementById('fontScale').checked;
    let smSize = document.getElementById('fontSizeSm').value;
    let mdSize = document.getElementById('fontSizeMd').value;
    let lgSize = document.getElementById('fontSizeLg').value;
    let xlSize = document.getElementById('fontSizeXl').value;
    let xxlSize = document.getElementById('fontSizeXxl').value;
    const fontFamily = document.getElementById('fontFamily').value;
    const fontImport = document.getElementById('fontImport').value;
    const designSystem = document.getElementById('design-system');
    const cssCodeBlock = document.getElementById('cssCode');
    

    

    let fontFaceImport = '';
    // Generate optional @font-face import if provided
    if(fontFamily) {
        if(fontImport) {
            fontFaceImport = 
            `@font-face {
                font-family: '${fontFamily}';
                src: url('${fontImport}') format('woff2');
            }`}
        else {
            fontFaceImport = 
            `font-family: '${fontFamily}';`
        }
    }
    
    if(scaleFont) {
        smSize = baseSize * 0.75;
        mdSize = baseSize * 1.25;
        lgSize = baseSize * 1.5;
        xlSize = baseSize * 2;
        xxlSize = baseSize * 2.5;
    }
    
    // Apply the new font size and font family to the design system column
    designSystem.style.fontSize = baseSize + 'px';
    designSystem.style.fontFamily = fontFamily;
    
    // Update the CSS display
    cssCodeBlock.textContent = `
html {
    font-size: ${baseSize}px;
}

:root {
    --font-size-sm: ${smSize}px;
    --font-size-md: ${mdSize}px;
    --font-size-lg: ${lgSize}px;
    --font-size-xl: ${xlSize}px;
    --font-size-xxl: ${xxlSize}px;
}
${fontFaceImport}

h1 {
    font-size: var(--font-size-xxl);
}
h2 {
    font-size: var(--font-size-xl);
}
h3 {
    font-size: var(--font-size-lg);
}
sm {
    font-size: var(--font-size-sm);
}
`;
}
    
//     // Apply the new font size only to the design system column
//     designSystem.style.fontSize = baseSize + 'px';
    
//     // Update the CSS display
//     cssCodeBlock.textContent = 
// `:root {
//     --font-size-base: ${baseSize}px;
//     --font-size-sm: ${baseSize * 0.75}px;
//     --font-size-md: ${baseSize * 1.25}px;
//     --font-size-lg: ${baseSize * 1.5}px;
//     --font-size-xl: ${baseSize * 2}px;
//     --font-size-xxl: ${baseSize * 2.5}px;
// }`;
