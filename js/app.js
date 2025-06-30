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
  
  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "qar";
    
    // Create header with ID and concept
    const headerDiv = document.createElement('div');
    headerDiv.className = 'qa-header';
    
    const qaIdSpan = document.createElement('span');
    qaIdSpan.className = 'qa-id';
    qaIdSpan.textContent = `ID: ${item.id}`;
    
    const conceptSpan = document.createElement('span');
    conceptSpan.className = `qa-concept concept-${item.concept.toLowerCase()}`;
    conceptSpan.textContent = item.concept;
    
    headerDiv.appendChild(qaIdSpan);
    headerDiv.appendChild(conceptSpan);
    div.appendChild(headerDiv);
    
    // Question section
    div.appendChild(createSection('Question', item.question, 'question'));
    
    // Answer section  
    div.appendChild(createSection('Answer', item.answer, 'answer'));
    
    // Rationale section
    div.appendChild(createSection('Rationale', item.rationale, 'rationale'));
    
    // Images section
    const imagesDiv = document.createElement('div');
    imagesDiv.className = 'qa-section';
    
    const imagesLabel = document.createElement('div');
    imagesLabel.className = 'qa-label';
    imagesLabel.textContent = 'Images:';
    imagesDiv.appendChild(imagesLabel);
    
    const imagesContainer = document.createElement('div');
    imagesContainer.className = 'images-container';
    
    if (item.images && item.images.length > 0) {
      item.images.forEach(img => {
        const imageDiv = document.createElement('div');
        imageDiv.className = 'image-item';
        
        const imageTag = document.createElement('img');
        imageTag.src = `images/${img}`;
        imageTag.alt = img;
        imageTag.title = img;
        imageDiv.appendChild(imageTag);
        
        const caption = document.createElement('div');
        caption.className = 'image-caption';
        caption.textContent = img;
        imageDiv.appendChild(caption);
        
        imagesContainer.appendChild(imageDiv);
      });
    } else {
      const noImagesDiv = document.createElement('div');
      noImagesDiv.className = 'no-images';
      noImagesDiv.textContent = 'No images available';
      imagesContainer.appendChild(noImagesDiv);
    }
    
    imagesDiv.appendChild(imagesContainer);
    div.appendChild(imagesDiv);
    
    container.appendChild(div);
  });
}

// Helper function to create sections for question, answer, or rationale
function createSection(label, content, className) {
  const sectionDiv = document.createElement('div');
  sectionDiv.className = 'qa-section';
  
  const labelDiv = document.createElement('div');
  labelDiv.className = 'qa-label';
  labelDiv.textContent = label + ':';
  sectionDiv.appendChild(labelDiv);
  
  const contentDiv = document.createElement('div');
  contentDiv.className = `qa-content ${className}`;
  contentDiv.textContent = content || 'N/A';
  sectionDiv.appendChild(contentDiv);
  
  return sectionDiv;
}

window.onload = loadData;
