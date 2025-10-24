const steps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const progress = document.querySelector(".progress");
const form = document.getElementById("multiStepForm");
const passwordError = document.getElementById("passwordError");
let currentStep = 0;

nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (validateStep()) {
      if (currentStep === steps.length - 2) showPreview();
      currentStep++;
      updateFormSteps();
    }
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    currentStep--;
    updateFormSteps();
  });
});

function validateStep() {
  const inputs = steps[currentStep].querySelectorAll("input[required]");
  for (let input of inputs) {
    if (!input.value.trim()) {
      alert("Please fill all required fields!");
      return false;
    }
  }

  if (currentStep === 1) {
    const pass = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;
    if (pass !== confirm) {
      passwordError.textContent = "Passwords do not match!";
      return false;
    } else {
      passwordError.textContent = "";
    }
  }
  return true;
}

function updateFormSteps() {
  steps.forEach((step, i) => step.classList.toggle("active", i === currentStep));
  progress.style.width = ((currentStep + 1) / steps.length) * 100 + "%";
}

function showPreview() {
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    age: document.getElementById("age").value,
    city: document.getElementById("city").value,
    address: document.getElementById("address").value,
    zipcode: document.getElementById("zipcode").value,
    education: document.getElementById("education").value,
    institution: document.getElementById("institution").value
  };
  document.getElementById("previewData").innerHTML = `
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Age:</strong> ${data.age}</p>
    <p><strong>City:</strong> ${data.city}</p>
    <p><strong>Address:</strong> ${data.address}</p>
    <p><strong>Zip Code:</strong> ${data.zipcode}</p>
    <p><strong>Education:</strong> ${data.education}</p>
    <p><strong>Institution:</strong> ${data.institution}</p>
  `;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const record = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    age: document.getElementById("age").value,
    city: document.getElementById("city").value,
    address: document.getElementById("address").value,
    zipcode: document.getElementById("zipcode").value,
    education: document.getElementById("education").value,
    institution: document.getElementById("institution").value
  };

  let stored = JSON.parse(sessionStorage.getItem("records")) || [];
  stored.push(record);
  sessionStorage.setItem("records", JSON.stringify(stored));

  alert("✅ Registration Submitted Successfully!");
  form.reset();
  currentStep = 0;
  updateFormSteps();
});

document.getElementById("viewRecords").addEventListener("click", () => {
  const recordsList = document.getElementById("recordsList");
  const stored = JSON.parse(sessionStorage.getItem("records")) || [];
  if (stored.length === 0) {
    recordsList.innerHTML = "<p>No records found.</p>";
    return;
  }
  recordsList.innerHTML = stored.map((r, i) => `
    <div>
      <strong>${i + 1}. ${r.name}</strong> (${r.email})<br>
      Age: ${r.age}, City: ${r.city}<br>
      Address: ${r.address}, Zip: ${r.zipcode}<br>
      Education: ${r.education} (${r.institution})<hr>
    </div>
  `).join("");
});
