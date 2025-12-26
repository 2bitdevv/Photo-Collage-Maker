let images = [];
let gridCount = 4;
let gridCols = 2;

// Hamburger Menu Toggle
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburgerBtn.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Color picker display update
const bgColorInput = document.getElementById("bgColor");
const colorDisplay = document.getElementById("colorDisplay");
function updateColorDisplay() {
  colorDisplay.style.backgroundColor = bgColorInput.value;
}
bgColorInput.addEventListener("input", updateColorDisplay);
bgColorInput.addEventListener("change", updateColorDisplay);
// Initialize color display
updateColorDisplay();

function setQuickTemplate(count, cols) {
  document.getElementById("gridCount").value = count;
  document.getElementById("gridCols").value = cols;
  gridCount = count;
  gridCols = cols;

  document
    .querySelectorAll(".template-btn")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.closest(".template-btn").classList.add("active");

  updateGrid();
}

document.getElementById("gridCount").addEventListener("change", (e) => {
  gridCount = Math.min(100, Math.max(1, parseInt(e.target.value) || 1));
  e.target.value = gridCount;
  updateGrid();
});

document.getElementById("gridCols").addEventListener("change", (e) => {
  gridCols = Math.min(10, Math.max(1, parseInt(e.target.value) || 1));
  e.target.value = gridCols;
  updateGrid();
});

document.getElementById("fileInput").addEventListener("change", (e) => {
  const files = Array.from(e.target.files);
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (images.length < gridCount) {
          images.push(img);
          updateGrid();
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
});

function updateGrid() {
  const grid = document.getElementById("imageGrid");

  grid.className = "image-grid grid-custom";
  grid.style.setProperty("--cols", gridCols);
  grid.innerHTML = "";

  for (let i = 0; i < gridCount; i++) {
    const item = document.createElement("div");
    item.className = "image-item";

    if (images[i]) {
      const img = document.createElement("img");
      img.src = images[i].src;
      item.appendChild(img);

      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-btn";
      removeBtn.innerHTML = "×";
      removeBtn.onclick = () => removeImage(i);
      item.appendChild(removeBtn);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "placeholder";
      placeholder.innerHTML = "+";
      item.appendChild(placeholder);
    }

    item.onclick = () => {
      if (!images[i]) {
        document.getElementById("fileInput").click();
      }
    };

    grid.appendChild(item);
  }
}

function removeImage(index) {
  images.splice(index, 1);
  updateGrid();
}

function clearAll() {
  images = [];
  updateGrid();
  const canvas = document.getElementById("collageCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = 0;
  canvas.height = 0;
}

function generateCollage() {
  if (images.length === 0) {
    alert("Please select photos first!");
    return;
  }

  const canvas = document.getElementById("collageCanvas");
  const ctx = canvas.getContext("2d");
  const spacing = parseInt(document.getElementById("spacing").value);
  const bgColor = document.getElementById("bgColor").value;

  const cellSize = 400;
  const rows = Math.ceil(gridCount / gridCols);
  const canvasWidth = gridCols * cellSize + (gridCols + 1) * spacing;
  const canvasHeight = rows * cellSize + (rows + 1) * spacing;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  for (let i = 0; i < Math.min(images.length, gridCount); i++) {
    const row = Math.floor(i / gridCols);
    const col = i % gridCols;
    const x = col * cellSize + (col + 1) * spacing;
    const y = row * cellSize + (row + 1) * spacing;

    // object-fit: cover logic
    const img = images[i];
    const imgRatio = img.width / img.height;
    const cellRatio = 1; // cellSize/cellSize
    let drawWidth = cellSize, drawHeight = cellSize;
    let sx = 0, sy = 0, sw = img.width, sh = img.height;

    if (imgRatio > cellRatio) {
      // Image is wider than cell: crop sides
      sw = img.height * cellRatio;
      sx = (img.width - sw) / 2;
    } else {
      // Image is taller than cell: crop top/bottom
      sh = img.width / cellRatio;
      sy = (img.height - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, x, y, drawWidth, drawHeight);
  }

  canvas.scrollIntoView({ behavior: "smooth", block: "center" });
}

function downloadCollage() {
  const canvas = document.getElementById("collageCanvas");
  if (canvas.width === 0) {
    alert("Please generate the collage first!");
    return;
  }

  const link = document.createElement("a");
  link.download = `collage_${Date.now()}.png`;
  link.href = canvas.toDataURL();
  link.click();
}

updateGrid();
// Theme toggle
const themeToggle = document.querySelector(".switch input");
const html = document.documentElement;

// Check saved theme preference
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  html.classList.add("dark-mode");
  themeToggle.checked = true;
}

// Toggle theme
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    html.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    html.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});

// Hide loader when page loaded
window.addEventListener('load', function() {
  var loader = document.getElementById('pageLoader');
  if(loader) loader.style.display = 'none';
});
