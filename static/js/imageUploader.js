class ImageUploader {
  constructor() {
    this.uploader = document.getElementById("imageUploader");
    this.fileInput = document.getElementById("fileInput");
    this.previewContainer = document.getElementById("previewContainer");
    this.preview = document.getElementById("preview");
    this.removeBtn = document.getElementById("removeBtn");
    this.submitBtn = document.getElementById("submitBtn");

    this.selectedFile = null; // To store the selected file

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Drag and drop events
    this.uploader.addEventListener("dragover", (e) => {
      e.preventDefault();
      this.uploader.classList.add("drag-over");
    });

    this.uploader.addEventListener("dragleave", () => {
      this.uploader.classList.remove("drag-over");
    });

    this.uploader.addEventListener("drop", (e) => {
      e.preventDefault();
      this.uploader.classList.remove("drag-over");
      const file = e.dataTransfer.files[0];
      this.previewFile(file);
    });

    // Click to upload event modified to prevent propagation
    this.uploader.addEventListener("click", (e) => {
      e.stopPropagation(); // Stop propagation to prevent double triggering
      this.fileInput.click();
    });

    this.fileInput.addEventListener("change", (e) => {
      if (e.target.files[0]) {
        this.previewFile(e.target.files[0]);
      }
    });

    // Clear preview
    this.removeBtn.addEventListener("click", () => {
      this.clearPreview();
    });

    // Submit image
    this.submitBtn.addEventListener("click", () => {
      if (this.selectedFile) {
        this.handleSubmit();
      } else {
        alert("Please select a file first.");
      }
    });
  }

  previewFile(file) {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.preview.src = e.target.result;
      this.uploader.style.display = "none";
      this.previewContainer.hidden = false;
    };
    reader.readAsDataURL(file);
    this.selectedFile = file; // Store the file
  }

  clearPreview() {
    this.preview.src = "";
    this.previewContainer.hidden = true;
    this.uploader.style.display = "block";
    this.fileInput.value = "";
    this.selectedFile = null; // Clear the stored file
  }

  async handleSubmit() {
    this.submitBtn.disabled = true;
    this.submitBtn.classList.add("loading");

    const formData = new FormData();
    formData.append("file", this.selectedFile);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      alert("Image processed successfully!");
      this.displayResults(result);
      this.clearPreview();
    } catch (error) {
      alert("Error processing image. Please try again: " + error.message);
    } finally {
      this.submitBtn.disabled = false;
      this.submitBtn.classList.remove("loading");
    }
  }

  displayResults(results) {
    const medicineDiv = document.querySelector(".medicine");
    medicineDiv.innerHTML = ""; // Clear previous results

    if (!results.length) {
        medicineDiv.innerHTML = "<h4>No text found</h4>";
        return;
    }

    results.forEach((item) => {
        const h4 = document.createElement("h4");
        h4.textContent = `${item.text} (Confidence: ${item.confidence})`;
        medicineDiv.appendChild(h4);
    });
  }
}

// Initialize the image uploader
new ImageUploader();