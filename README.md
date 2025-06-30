# DesignQAR
A curated dataset of 221 question-answer-rationale triples capturing visualization design decisions and the reasoning behind them, derived from real-world student-authored narratives.


## Dataset Format

Each entry includes:

- `id`: Unique identifier (e.g., `QAR_001`)
- `concept`: One of 9 visualization design concepts (e.g., `Color`, `Layout`, `Interaction`)
- `question`: A natural language question probing a design choice
- `answer`: A short factual answer
- `rationale`: A natural language explanation of the reasoning behind the choice
- `images`: List of filenames associated with the visualization(s)

**Format**: JSONL  
**File**: [`designqar.jsonl`](./data/designqar.jsonl)  
**Images**: Located in the `images/` folder


## Dataset Viewer

You can browse and explore the DesignQAR dataset interactively at:
🔗 https://maevehutch.github.io/designqar/

