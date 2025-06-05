function getInputValue(id) {
  return parseFloat(document.getElementById(id).value);
}

function getCheckboxState(id) {
  return document.getElementById(id).checked;
}

function calculateFontSizes(base, scale, useScale, manual, useRems) {
  let sizes;

  if (useScale) {
    const sm = base / scale;
    const md = base * scale;
    const lg = md * scale;
    const xl = lg * scale;
    const xxl = xl * scale;
    sizes = { sm, base, md, lg, xl, xxl};
  } else {
    const [ sm, base, md, lg, xl, xxl] = manual;
    sizes = { sm, base, md, lg, xl, xxl };
  }

  if (useRems) {
    for (const key in sizes) {
      sizes[key] = sizes[key] / base;
    }
  }
  return sizes;
}

function setCSSVars(sizes, unit) {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(sizes)) {
    root.style.setProperty(`--ds-font-size-${key}`, `${value}${unit}`);
  }
}

function setHTMLVars(sizes, unit) {
  const h1 = document.getElementById('h1');
  const h2 = document.getElementById('h2');
  const h3 = document.getElementById('h3');
  const h4 = document.getElementById('h4');
  const p = document.getElementById('base');
  const small = document.getElementById('small');
  
  h1.textContent = `${sizes.xxl} ${unit}`;
  h2.textContent = `${sizes.xl} ${unit}`;
  h3.textContent = `${sizes.lg} ${unit}`;
  h4.textContent = `${sizes.md} ${unit}`;
  p.textContent = `${sizes.base}${unit}`;
  small.textContent = `${sizes.sm} ${unit}`;
}

function generateFontFaceCSS(family, url) {
  if (!family) return '';
  if (url) {
    return `@font-face {
  font-family: '${family}';
  src: url('${url}') format('woff2');
}`;
  }
  return `font-family: '${family}';`;
}

function generateCSSCode(fontFace, base, sizes, unit) {
  const sizeVars = Object.entries(sizes).map(
    ([key, val]) => `  --font-size-${key}: ${val}${unit};`
  ).join('\n');

  return `${fontFace}
html {
  font-size: ${base}px;
}

:root {
${sizeVars}
  --ds-font-size-base: 1${unit};
}

h1 { font-size: var(--font-size-xxl); }
h2 { font-size: var(--font-size-xl); }
h3 { font-size: var(--font-size-lg); }
h4 { font-size: var(--font-size-md); }
sm  { font-size: var(--font-size-sm); }`;
}

function updateTypographySize() {
  const base = getInputValue('typographySize');
  const scale = getInputValue('fontScaleNumber');
  const useScale = getCheckboxState('fontScale');
  const useRems = getCheckboxState('useREMs');

  const manualSizes = [
    getInputValue('fontSizeSm'),
    base,
    getInputValue('fontSizeMd'),
    getInputValue('fontSizeLg'),
    getInputValue('fontSizeXl'),
    getInputValue('fontSizeXxl'),
  ];

  const fontFamily = document.getElementById('fontFamilyBody').value;
  const fontImport = document.getElementById('fontImportBody').value;

  const sizes = calculateFontSizes(base, scale, useScale, manualSizes, useRems);
  const unit = useRems ? 'rem' : 'px';

  setCSSVars(sizes, unit);
  setHTMLVars(sizes, unit);

  const designSystem = document.getElementById('design-system');
  designSystem.style.fontSize = useRems ? `1rem` : `${base}px`;

  const cssPreview = generateCSSCode(generateFontFaceCSS(fontFamily, fontImport), base, sizes, unit);
  document.getElementById('cssCode').textContent = cssPreview;
}
