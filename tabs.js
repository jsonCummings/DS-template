
function openControlsTab(event, tabId) {
  const button = event.currentTarget;

  if (button.classList.contains('active')) return;

  document.querySelectorAll('.tablink-controls').forEach(btn => {
    btn.classList.remove('active');
  });

  document.querySelectorAll('.tab-content-controls').forEach(section => {
    section.style.display = 'none';
  });

  const selected = document.getElementById(tabId);
  if (selected) {
    selected.style.display = 'block';
  }

  button.classList.add('active');
}

function openPreviewTab(event, tabId) {
  const button = event.currentTarget;

  if (button.classList.contains('active')) return;

  document.querySelectorAll('.tablink-preview').forEach(btn => {
    btn.classList.remove('active');
  });

  document.querySelectorAll('.examples').forEach(section => {
    section.style.display = 'none';
  });

  const selected = document.getElementById(tabId + 'Example');
  if (selected) {
    selected.style.display = 'block';
  }

  button.classList.add('active');
}
