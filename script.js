const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");
const editor = document.getElementById("editor");
const originalPreview = document.getElementById("originalPreview");
const compressedPreview = document.getElementById("compressedPreview");
const fileName = document.getElementById("fileName");
const originalSize = document.getElementById("originalSize");
const quality = document.getElementById("quality");
const qualityValue = document.getElementById("qualityValue");
const newSize = document.getElementById("newSize");
const saved = document.getElementById("saved");
const downloadBtn = document.getElementById("downloadBtn");
const resetBtn = document.getElementById("resetBtn");

let currentFile = null;
let compressedBlob = null;
let compressedUrl = null;
let originalUrl = null;

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024, index)).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function showEditor(file) {
  currentFile = file;
  fileName.textContent = file.name;
  originalSize.textContent = formatBytes(file.size);

  if (originalUrl) URL.revokeObjectURL(originalUrl);
  originalUrl = URL.createObjectURL(file);
  originalPreview.src = originalUrl;

  dropZone.classList.add("hidden");
  editor.classList.remove("hidden");

  compressImage();
}

function compressImage() {
  if (!currentFile) return;

  const img = new Image();
  const reader = new FileReader();

  reader.onload = (event) => {
    img.onload = () => {
      const maxDimension = 2400;
      const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
      const width = Math.max(1, Math.round(img.width * scale));
      const height = Math.max(1, Math.round(img.height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // JPEG gives predictable compression and works well for photos.
      canvas.toBlob((blob) => {
        if (!blob) return;

        compressedBlob = blob;

        if (compressedUrl) URL.revokeObjectURL(compressedUrl);
        compressedUrl = URL.createObjectURL(blob);
        compressedPreview.src = compressedUrl;

        const percentage = Math.max(
          0,
          Math.round((1 - blob.size / currentFile.size) * 100)
        );

        newSize.textContent = formatBytes(blob.size);
        saved.textContent = `${percentage}%`;
      }, "image/jpeg", Number(quality.value) / 100);
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(currentFile);
}

function handleFile(file) {
  if (!file) return;

  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) {
    alert("Please choose a JPG, PNG or WebP image.");
    return;
  }

  if (file.size > 20 * 1024 * 1024) {
    alert("The maximum file size is 20 MB.");
    return;
  }

  showEditor(file);
}

fileInput.addEventListener("change", () => {
  handleFile(fileInput.files[0]);
});

quality.addEventListener("input", () => {
  qualityValue.textContent = `${quality.value}%`;
  clearTimeout(window.compressTimer);
  window.compressTimer = setTimeout(compressImage, 120);
});

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("dragover");
  handleFile(event.dataTransfer.files[0]);
});

resetBtn.addEventListener("click", () => {
  fileInput.value = "";
  currentFile = null;
  compressedBlob = null;

  if (originalUrl) URL.revokeObjectURL(originalUrl);
  if (compressedUrl) URL.revokeObjectURL(compressedUrl);

  originalUrl = null;
  compressedUrl = null;

  editor.classList.add("hidden");
  dropZone.classList.remove("hidden");
});

downloadBtn.addEventListener("click", () => {
  if (!compressedBlob) return;

  const link = document.createElement("a");
  link.href = compressedUrl;
  link.download = `${currentFile.name.replace(/\.[^/.]+$/, "")}-compressed.jpg`;
  document.body.appendChild(link);
  link.click();
  link.remove();
});
