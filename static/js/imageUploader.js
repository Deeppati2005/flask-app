// Initialize variables
const uploader = document.getElementById("imageUploader");
const fileInput = document.getElementById("fileInput");
const previewContainer = document.getElementById("previewContainer");
const preview = document.getElementById("preview");
const removeBtn = document.getElementById("removeBtn");
const submitBtn = document.getElementById("submitBtn");
const medicineDiv = document.querySelector(".medicine");
const relatedDiv = document.querySelector(".related-texts");

let selectedFile = null; // To store the selected file

// Add event listeners
function initializeEventListeners() {
  // Drag and drop events
  uploader.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploader.classList.add("drag-over");
  });

  uploader.addEventListener("dragleave", () => {
    uploader.classList.remove("drag-over");
  });

  uploader.addEventListener("drop", (e) => {
    e.preventDefault();
    uploader.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    previewFile(file);
  });

  // Click to upload event
  uploader.addEventListener("click", (e) => {
    e.stopPropagation(); // Stop propagation to prevent double triggering
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files[0]) {
      previewFile(e.target.files[0]);
    }
  });

  // Clear preview
  removeBtn.addEventListener("click", clearPreview);

  // Submit image
  submitBtn.addEventListener("click", () => {
    if (selectedFile) {
      handleSubmit();
    } else {
      alert("Please select a file first.");
    }
  });
}

function previewFile(file) {
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
    preview.src = e.target.result;
    uploader.style.display = "none";
    previewContainer.hidden = false;
  };
  reader.readAsDataURL(file);
  selectedFile = file; // Store the file
}

function clearPreview() {
  preview.src = "";
  previewContainer.hidden = true;
  uploader.style.display = "block";
  fileInput.value = "";
  selectedFile = null; // Clear the stored file
}

async function handleSubmit() {
  submitBtn.disabled = true;
  submitBtn.classList.add("loading");

  const formData = new FormData();
  formData.append("file", selectedFile);

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
    displayResults(result);
    clearPreview();
  } catch (error) {
    alert("Error processing image. Please try again: " + error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");
  }
}

function displayResults(results) {
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
      findRelatedTexts(item.text);
    });

    const div = document.createElement("div");
    div.appendChild(h4);
    div.appendChild(button);

    medicineDiv.appendChild(div);
  });
}

async function findRelatedTexts(text) {
  try {
    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer m46txx67yL3h9wK1fvsDMwfGO6g0htuWxjoEZ5Bx",
      },
      body: JSON.stringify({
        model: "command-xlarge-nightly",
        prompt: `Given the random input '${text}', generate a meaningful medical term, such as the name of a drug or treatment, 
          by interpreting the input phonetically or structurally. 
          Adjust unpronounceable or random fragments into recognizable components commonly used in the medical or pharmaceutical field.
          If you cant find any related words, generate drug-names having at-least 2 characters same as the word supplied
          Output should be like "Word1, Word2, ...", or "No related words found".`,
        max_tokens: 800,
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
    displayRelatedTexts(data.generations[0].text);
  } catch (error) {
    alert("Error fetching related texts. Please try again: " + error.message);
  }
}

function displayRelatedTexts(relatedTexts) {
  relatedDiv.innerHTML = ""; // Clear previous results

  const p = document.createElement("p");
  p.textContent = relatedTexts;
  relatedDiv.appendChild(p);

  // Scroll to the related texts section
  relatedDiv.scrollIntoView({ behavior: "smooth" });
}

// Initialize event listeners
initializeEventListeners();
