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
    const relatedDiv = document.querySelector(".related-texts");
    medicineDiv.innerHTML = ""; // Clear previous results
    relatedDiv.innerHTML = ""; // Clear related texts

    if (!results.length) {
      medicineDiv.innerHTML = "<h4>No text found</h4>";
      return;
    }

    results.forEach((item) => {
      const h4 = document.createElement("h4");
      h4.textContent = `${item.text} (Confidence: ${item.confidence})`;

      const button = document.createElement("button");
      button.textContent = "Find Related";
      button.addEventListener("click", () => {
        alert("Scroll down to the 'Related Texts' section to see the results.");
        this.findRelatedTexts(item.text);
      });
      const div = document.createElement("div");
      div.appendChild(h4);
      div.appendChild(button);

      medicineDiv.appendChild(div);
    });
  }

  async findRelatedTexts(text) {
    try {
      const response = await fetch("https://api.cohere.ai/v1/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer m46txx67yL3h9wK1fvsDMwfGO6g0htuWxjoEZ5Bx",
        },
        body: JSON.stringify({
          model: "command-xlarge-nightly",
          prompt: `Find related texts for: ${text}`,
          max_tokens: 200,
          temperature: 0.5,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      this.displayRelatedTexts(data.generations[0].text);
    } catch (error) {
      alert("Error fetching related texts. Please try again: " + error.message);
    }
  }

  displayRelatedTexts(relatedTexts) {
    const relatedDiv = document.querySelector(".related-texts");
    relatedDiv.innerHTML = ""; // Clear previous results

    const p = document.createElement("p");
    p.textContent = relatedTexts;
    relatedDiv.appendChild(p);
    // Scroll to the related texts section
    document
      .querySelector(".related-texts")
      .scrollIntoView({ behavior: "smooth" });
  }
}

// Initialize the image uploader
new ImageUploader();
