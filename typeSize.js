function updateTypographySize() {
    const baseSize = document.getElementById('typographySize').value;
    const scaleFont = document.getElementById('fontScale').checked;
    let smSize = document.getElementById('fontSizeSm').value;
    let mdSize = document.getElementById('fontSizeMd').value;
    let lgSize = document.getElementById('fontSizeLg').value;
    let xlSize = document.getElementById('fontSizeXl').value;
    let xxlSize = document.getElementById('fontSizeXxl').value;
    
    const fontFamilyHeading = document.getElementById('fontFamilyHeading').value;
    const fontImportHeading = document.getElementById('fontImportHeading').value;
    const fontFamilyBody = document.getElementById('fontFamilyBody').value;
    const fontImportBody = document.getElementById('fontImportBody').value;
    const designSystem = document.getElementById('design-system');
    const cssCodeBlock = document.getElementById('cssCode');
    

    

    let fontFaceImportHeading = '';
    let fontFaceImportBody = '';
    let fontFaceAssign = '';
    // Generate optional @font-face import if provided
    if (fontFamilyHeading) {
        // if (fontImportHeading) {
            fontFaceImportHeading = fontImportHeading ? 
            `@font-face {
                font-family: '${fontFamilyHeading}';
                src: url('${fontImportHeading}') format('woff2');
            }` : `font-family: '${fontFamilyHeading}';`
    }
    if (fontFamilyBody) {
        if (fontImportBody) {
            fontFaceImportBody = 
            `@font-face {
                font-family: '${fontFamilyBody}';
                src: url('${fontImportBody}') format('woff2');
            }`}
        else {
            fontFaceImportBody = 
            `font-family: '${fontFamilyBody}';`
        }
    }
    if (fontFamilyHeading && fontFamilyBody) {
        fontFaceAssign = `
            font-family: '${fontFamilyBody}';
            h1,h2,h3,h4,h5 {
            font-family: '${fontFamilyHeading}'
            }`;
            designSystem.style.fontFamily = fontFamilyBody;
            designSystem.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(header => {header.style.fontFamily = fontFamilyHeading;});
    } else if (fontFamilyBody) {
        fontFaceAssign = `font-family: '${fontFamilyBody}';`
        designSystem.style.fontFamily = fontFamilyBody;
    }
    
    if (scaleFont) {
        smSize = baseSize * 0.75;
        mdSize = baseSize * 1.25;
        lgSize = baseSize * 1.5;
        xlSize = baseSize * 2;
        xxlSize = baseSize * 2.5;
    }

    // Apply the new font size and font family to the design system column
    designSystem.style.fontSize = baseSize + 'px';
    // designSystem.style.fontFamily = fontFamily;
    
    // Update the CSS display
    cssCodeBlock.textContent = `
${fontFaceImportHeading}
${fontFaceImportBody}
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

${fontFaceAssign}
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
    
