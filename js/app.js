let data = [];

async function loadData() {
  const response = await fetch('data/designqar.jsonl');
  const text = await response.text();
  data = text.trim().split('\n').map(line => JSON.parse(line));
  populateConcepts();
  renderData(data);
}

function populateConcepts() {
  const dropdown = document.getElementById("concept");
  const concepts = [...new Set(data.map(d => d.concept))].sort();
  concepts.forEach(concept => {
    const option = document.createElement("option");
    option.value = concept;
    option.textContent = concept;
    dropdown.appendChild(option);
  });
}

function filterData() {
  const concept = document.getElementById("concept").value;
  const filtered = concept ? data.filter(d => d.concept === concept) : data;
  renderData(filtered);
}

function renderData(items) {
  const container = document.getElementById("qarContainer");
  container.innerHTML = "";
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "qar";
    div.innerHTML = `
      <h3>${item.id} — ${item.concept}</h3>
      <div class="label">Question:</div>
      <div>${item.question}</div>
      <div class="label">Answer:</div>
      <div>${item.answer}</div>
      <div class="label">Rationale:</div>
      <div>${item.rationale}</div>
    `;
    if (item.images && item.images.length > 0) {
      item.images.forEach(img => {
        const imageTag = document.createElement("img");
        imageTag.src = `images/${img}`;
        imageTag.alt = img;
        imageTag.className = "image";
        div.appendChild(imageTag);
      });
    }
    container.appendChild(div);
  });
}

window.onload = loadData;
