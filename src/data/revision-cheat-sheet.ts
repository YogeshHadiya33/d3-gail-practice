export interface CheatSheetSection {
  domainId: string;
  domainTitle: string;
  weight: string;
  summary: string;
  categories: {
    categoryTitle: string;
    bulletPoints: {
      boldTerm: string;
      quickFact: string;
      examTip?: string;
    }[];
  }[];
}

export const REVISION_CHEAT_SHEET: CheatSheetSection[] = [
  // DOMAIN 1: FUNDAMENTALS OF GENAI (30%)
  {
    domainId: 'fundamentals',
    domainTitle: 'Domain 1: Fundamentals of Generative AI',
    weight: '30% of Exam',
    summary: 'Core concepts, architectures, model families, data types, and inherent limitations.',
    categories: [
      {
        categoryTitle: 'AI Hierarchy & Learning Paradigms',
        bulletPoints: [
          {
            boldTerm: 'Artificial Intelligence (AI)',
            quickFact: 'Broadest umbrella term: Any technique enabling machines to mimic human intelligence, reasoning, or decision-making.',
          },
          {
            boldTerm: 'Machine Learning (ML)',
            quickFact: 'Subset of AI where algorithms learn patterns from data rather than following explicit, hard-coded rules.',
          },
          {
            boldTerm: 'Deep Learning (DL)',
            quickFact: 'Subset of ML using multi-layered artificial neural networks capable of learning hierarchical feature representations from raw, unstructured data.',
          },
          {
            boldTerm: 'Generative AI (GenAI)',
            quickFact: 'Subset of Deep Learning that generates novel text, code, images, audio, or synthetic data by learning joint probability distributions.',
            examTip: 'Exam distinction: Discriminative models classify/predict ("Is this spam?"); Generative models create new content ("Write an email").',
          },
          {
            boldTerm: 'Supervised Learning',
            quickFact: 'Trains on labeled input-output pairs (e.g. house features -> price, image -> dog/cat). Common for classification and regression.',
          },
          {
            boldTerm: 'Unsupervised Learning',
            quickFact: 'Discovers hidden patterns or groupings in unlabeled data (e.g. customer segmentation, clustering, dimensionality reduction).',
          },
          {
            boldTerm: 'Reinforcement Learning from Human Feedback (RLHF)',
            quickFact: 'Fine-tunes foundation models using human reward rankings to align outputs with human values, safety guidelines, and helpfulness.',
          },
        ],
      },
      {
        categoryTitle: 'Foundation Models & Multimodal Concepts',
        bulletPoints: [
          {
            boldTerm: 'Foundation Model',
            quickFact: 'A massive model pre-trained on diverse, broad-scale data that can be adapted to hundreds of downstream tasks without task-specific training.',
          },
          {
            boldTerm: 'Multimodal Foundation Model',
            quickFact: 'A model natively designed to process and synthesize multiple data types simultaneously (e.g., text, code, audio, images, and video).',
          },
          {
            boldTerm: 'Tokens & Tokenization',
            quickFact: 'The basic units of text processed by an LLM. Approximately 1 token ≈ 4 characters or 0.75 English words.',
          },
          {
            boldTerm: 'Context Window',
            quickFact: 'The maximum token capacity a model can consider in a single prompt and conversation history (e.g., Gemini 1.5 Pro handles up to 2 million tokens).',
          },
          {
            boldTerm: 'Embeddings & Vector Space',
            quickFact: 'Numerical vector representations of words, sentences, or images where semantic similarity corresponds to geometric closeness.',
          },
        ],
      },
      {
        categoryTitle: 'Google Foundation Model Families',
        bulletPoints: [
          {
            boldTerm: 'Gemini 1.5 / 2.0 Flash',
            quickFact: 'Google\'s high-speed, lightweight multimodal API model designed for high-frequency production tasks, low latency, and cost-efficiency.',
            examTip: 'Exam keyword: Choose Flash for high-volume customer-facing apps where speed and low token cost are top priorities.',
          },
          {
            boldTerm: 'Gemini 1.5 / 2.0 Pro',
            quickFact: 'Google\'s flagship model for deep multimodal reasoning, complex code generation, math, and massive context windows (up to 2M tokens).',
            examTip: 'Exam keyword: Choose Pro for complex multi-step reasoning, analyzing massive documents, or complex coding.',
          },
          {
            boldTerm: 'Gemini Nano',
            quickFact: 'Google\'s smallest, on-device model designed to run locally on smartphones (Android, Pixel) without an internet connection.',
            examTip: 'Exam keyword: Choose Nano for mobile, edge computing, or zero-cloud latency.',
          },
          {
            boldTerm: 'Gemma 2 (2B, 9B, 27B)',
            quickFact: 'Google\'s family of lightweight, open-weight models available for downloading, self-hosting, and offline datacenter deployment.',
            examTip: 'Exam rule: If a company requires full ownership of model weights or an air-gapped on-premise datacenter, GEMMA is the answer.',
          },
          {
            boldTerm: 'Imagen 3',
            quickFact: 'Google\'s state-of-the-art text-to-image foundation model. Includes SynthID digital watermarking embedded in pixels.',
          },
          {
            boldTerm: 'Veo',
            quickFact: 'Google\'s high-definition cinematic text-to-video generation model capable of 1080p clips with realistic camera movements.',
          },
        ],
      },
      {
        categoryTitle: 'Data Types & Model Limitations',
        bulletPoints: [
          {
            boldTerm: 'Structured Data',
            quickFact: 'Tabular data with strict schemas (rows & columns, SQL databases, BigQuery). Best analyzed with BigQuery ML rather than raw LLMs.',
          },
          {
            boldTerm: 'Unstructured Data',
            quickFact: 'Free-form documents, PDFs, customer audio, images, emails. Represents >80% of enterprise data where GenAI provides peak ROI.',
          },
          {
            boldTerm: 'Hallucination',
            quickFact: 'When an LLM generates plausible-sounding but factually false claims. Cannot be solved by model size alone; requires Grounding/RAG.',
          },
          {
            boldTerm: 'Knowledge Cutoff Date',
            quickFact: 'The chronological point when a model\'s training data ended. Real-time world events require Grounding with Google Search.',
          },
          {
            boldTerm: 'Data Drift vs Concept Drift',
            quickFact: 'Data Drift = statistical shift in input queries. Concept Drift = shift in the underlying relationship between inputs and desired business outputs.',
          },
        ],
      },
    ],
  },

  // DOMAIN 2: GOOGLE CLOUD'S GENAI OFFERINGS (35%)
  {
    domainId: 'google-cloud-offerings',
    domainTitle: "Domain 2: Google Cloud's Gen AI Offerings",
    weight: '35% of Exam',
    summary: 'The full enterprise AI stack: infrastructure, Model Garden, development platforms, agents, and SaaS tools.',
    categories: [
      {
        categoryTitle: 'AI Infrastructure & Hardware',
        bulletPoints: [
          {
            boldTerm: 'Cloud TPUs (Tensor Processing Units)',
            quickFact: 'Google\'s custom-designed ASICs optimized specifically for accelerated machine learning and matrix multiplication (v4, v5e, v5p).',
            examTip: 'TPU v5e = cost-performance efficiency; TPU v5p = massive large-scale foundational training.',
          },
          {
            boldTerm: 'NVIDIA GPUs on GCP',
            quickFact: 'A100, H100, L4 instances available on Compute Engine and GKE for open-source framework flexibility.',
          },
          {
            boldTerm: 'AI Hypercomputer',
            quickFact: 'Google Cloud\'s integrated supercomputing architecture uniting hardware, Jupiter high-speed networking, storage, and ML software frameworks.',
          },
        ],
      },
      {
        categoryTitle: 'Vertex AI Platform & Studio',
        bulletPoints: [
          {
            boldTerm: 'Vertex AI Model Garden',
            quickFact: 'Enterprise catalog with 150+ models: Google first-party (Gemini, Imagen, Veo), Open-source (Gemma, Llama 3, Mistral), and Partners (Claude).',
            examTip: 'Model Garden enables serverless one-click testing, evaluation, and deployment without managing VM clusters.',
          },
          {
            boldTerm: 'Vertex AI Studio',
            quickFact: 'Google Cloud Console playground for prompt design, testing system instructions, multimodal testing, and tuning under enterprise IAM & billing.',
          },
          {
            boldTerm: 'Google AI Studio',
            quickFact: 'Free, fast, web-based prototyping sandbox with an API key. For individual developers prototyping before enterprise GCP onboarding.',
            examTip: 'Exam trap: Google AI Studio is for quick web prototyping; Vertex AI Studio is for enterprise production with GCP security and billing.',
          },
        ],
      },
      {
        categoryTitle: 'Agent Builder & Customer Solutions',
        bulletPoints: [
          {
            boldTerm: 'Vertex AI Agent Builder',
            quickFact: 'No-code / low-code console to build grounded enterprise search engines and conversational virtual agents connected to corporate data.',
          },
          {
            boldTerm: 'Vertex AI Search (Out-of-the-Box RAG)',
            quickFact: 'Turn-key enterprise search over Cloud Storage, BigQuery, Jira, and websites. Provides verifiable citations and respects document ACLs.',
            examTip: 'Always recommend Vertex AI Search when business teams need grounded internal search without coding custom vector databases.',
          },
          {
            boldTerm: 'Customer Engagement Suite (CCAI)',
            quickFact: 'Comprehensive suite for contact centers: Conversational Agents (virtual bots), Agent Assist (human copilot), and Conversational Insights.',
          },
          {
            boldTerm: 'Agent Assist',
            quickFact: 'Listens to live customer phone calls in real time to suggest answers, surface knowledge articles, and auto-generate post-call summaries for HUMAN agents.',
            examTip: 'Exam keyword: Agent Assist assists human call agents; Conversational Agents talk directly to customers.',
          },
        ],
      },
      {
        categoryTitle: 'Productivity Applications & Prebuilt APIs',
        bulletPoints: [
          {
            boldTerm: 'Gemini for Google Workspace',
            quickFact: 'Embedded GenAI in Docs (drafting), Gmail (summarizing), Sheets (organizing data), Slides (image generation), and Meet (transcripts).',
            examTip: 'Privacy guarantee: Google contractually guarantees customer Workspace data is NEVER used to train commercial foundation models.',
          },
          {
            boldTerm: 'NotebookLM',
            quickFact: 'Personalized AI research assistant that is strictly grounded in uploaded source documents, PDFs, Google Docs, and notes.',
          },
          {
            boldTerm: 'Gemini Code Assist',
            quickFact: 'AI pair programmer in IDEs (VS Code, IntelliJ, Cloud Workstations) offering codebase-aware completions, debugging, and unit tests.',
          },
          {
            boldTerm: 'Document AI API',
            quickFact: 'Specialized ML models for structured invoice, form, receipt, and tax document extraction with spatial table parsing.',
          },
          {
            boldTerm: 'BigQuery ML',
            quickFact: 'Allows data analysts to build and execute machine learning models directly inside BigQuery using standard SQL queries.',
          },
        ],
      },
    ],
  },

  // DOMAIN 3: TECHNIQUES TO IMPROVE MODEL OUTPUT (20%)
  {
    domainId: 'improve-output',
    domainTitle: 'Domain 3: Techniques to Improve Model Output',
    weight: '20% of Exam',
    summary: 'Prompting strategies, grounding, RAG pipelines, generation parameters, and fine-tuning trade-offs.',
    categories: [
      {
        categoryTitle: 'Prompt Design & In-Context Learning',
        bulletPoints: [
          {
            boldTerm: 'Zero-Shot Prompting',
            quickFact: 'Providing only task instructions to the model without any example input-output pairs.',
          },
          {
            boldTerm: 'One-Shot / Few-Shot Prompting',
            quickFact: 'Providing 1 to 5 demonstration pairs in the prompt before the actual query. Drastically improves output format consistency.',
            examTip: 'Few-shot prompting is the fastest, cheapest way to enforce custom JSON schemas or unique tone without retraining weights.',
          },
          {
            boldTerm: 'Role / Persona Prompting',
            quickFact: 'Explicitly instructing the model to adopt a specific professional perspective (e.g. "Act as a senior cybersecurity auditor...").',
          },
          {
            boldTerm: 'Chain-of-Thought (CoT)',
            quickFact: 'Instructing the model to break down its reasoning step-by-step before outputting the final answer ("Let\'s think step by step").',
            examTip: 'Essential for math, logic puzzles, and complex multi-step deductions.',
          },
          {
            boldTerm: 'Prompt Chaining',
            quickFact: 'Decomposing a complex workflow into smaller, sequential prompts where output of Step 1 serves as input to Step 2.',
          },
          {
            boldTerm: 'ReAct (Reason + Act)',
            quickFact: 'Combining reasoning traces with external tool/API execution (Thought -> Action -> Observation -> Next Thought).',
          },
        ],
      },
      {
        categoryTitle: 'Grounding & RAG Architecture',
        bulletPoints: [
          {
            boldTerm: 'Grounding',
            quickFact: 'Anchoring model outputs in verifiable, authoritative external facts to prevent hallucinations.',
          },
          {
            boldTerm: 'Grounding with Google Search',
            quickFact: 'Direct toggle in Vertex AI Studio that queries the live web for breaking news and fresh world events beyond training cutoffs.',
          },
          {
            boldTerm: 'Retrieval-Augmented Generation (RAG)',
            quickFact: 'The standard 4-step pipeline: 1) Ingest & Chunk documents, 2) Store vectors, 3) Retrieve matching chunks, 4) Generate grounded response.',
            examTip: 'Golden Rule: RAG modifies the prompt context in RAM; it does NOT alter the underlying neural weights of the foundation model.',
          },
          {
            boldTerm: 'Citations & Auditability',
            quickFact: 'Vertex AI Search provides clickable source links and page numbers alongside generated answers for compliance audit trails.',
          },
        ],
      },
      {
        categoryTitle: 'Sampling Parameters & Generation Controls',
        bulletPoints: [
          {
            boldTerm: 'Temperature (0.0 to 2.0)',
            quickFact: 'Controls output randomness. Low temp (0.0 - 0.2) = deterministic, precise, analytical. High temp (0.8 - 1.5) = creative, diverse.',
            examTip: 'For financial calculations, code generation, or medical summaries: Always set Temperature to 0.0 or near 0.1.',
          },
          {
            boldTerm: 'Top-P (Nucleus Sampling)',
            quickFact: 'Selects from the dynamic smallest pool of tokens whose cumulative probability reaches threshold P (e.g. 0.95 is standard default).',
          },
          {
            boldTerm: 'Top-K Sampling',
            quickFact: 'Selects the next token strictly from the top K most probable words (e.g. K=40). Fixed number cutoff.',
          },
          {
            boldTerm: 'Max Output Tokens',
            quickFact: 'Hard limit on response length to control latency and prevent runaway generation costs.',
          },
          {
            boldTerm: 'Stop Sequences',
            quickFact: 'Pre-defined character triggers (e.g. "\n\n", "User:") that immediately halt generation upon appearance.',
          },
        ],
      },
      {
        categoryTitle: 'Model Customization: Fine-Tuning & Distillation',
        bulletPoints: [
          {
            boldTerm: 'RAG vs Fine-Tuning Rule',
            quickFact: 'Use RAG to teach dynamic facts and internal corporate knowledge. Use Fine-Tuning to teach unique style, tone, syntax, or niche formatting.',
            examTip: 'Exam Trap: Never fine-tune to teach dynamic facts that change weekly (e.g. product catalog or HR policies). Use RAG!',
          },
          {
            boldTerm: 'Supervised Fine-Tuning (SFT)',
            quickFact: 'Retraining model weights on hundreds to thousands of curated prompt-response pairs.',
          },
          {
            boldTerm: 'PEFT / LoRA (Parameter-Efficient)',
            quickFact: 'Freezes the base model and injects small, trainable low-rank adapter matrices. Cuts compute and memory costs by >80%.',
          },
          {
            boldTerm: 'Model Distillation',
            quickFact: 'Training a smaller, faster "student" model (e.g. Gemini Flash) to mimic the outputs of a larger "teacher" model (e.g. Pro).',
          },
        ],
      },
    ],
  },

  // DOMAIN 4: BUSINESS STRATEGIES & RESPONSIBLE AI (15%)
  {
    domainId: 'business-strategies',
    domainTitle: 'Domain 4: Business Strategies for Gen AI',
    weight: '15% of Exam',
    summary: 'Google\'s Secure AI Framework (SAIF), responsible AI ethics, governance, change management, and ROI.',
    categories: [
      {
        categoryTitle: 'Google Secure AI Framework (SAIF)',
        bulletPoints: [
          {
            boldTerm: 'SAIF Definition',
            quickFact: 'Google\'s conceptual framework to secure AI systems against cyber threats, prompt injection, data exfiltration, and model manipulation.',
          },
          {
            boldTerm: 'Pillar 1: Strong Security Foundations',
            quickFact: 'Apply traditional battle-tested IT security (IAM least privilege, VPC Service Controls, encryption) to AI workloads.',
          },
          {
            boldTerm: 'Pillar 2: Detection and Response',
            quickFact: 'Monitor query logs and anomaly detectors for AI-specific attacks like prompt injection and model extraction.',
          },
          {
            boldTerm: 'Pillar 3: Automated Defenses',
            quickFact: 'Use automated response mechanisms to contain security threats faster than human intervention.',
          },
          {
            boldTerm: 'Pillar 4: Harmonized Controls',
            quickFact: 'Ensure uniform security guardrails, data classifications, and safety filters across all company models.',
          },
          {
            boldTerm: 'Pillar 5: Continuous Feedback Adaptation',
            quickFact: 'Continuously evaluate outputs, track model drift, and incorporate rapid user feedback loops.',
          },
          {
            boldTerm: 'Pillar 6: Contextualize Business Risk',
            quickFact: 'Calibrate AI security depth to the impact and criticality of the business process being automated.',
          },
        ],
      },
      {
        categoryTitle: 'Responsible AI & Prohibited Uses',
        bulletPoints: [
          {
            boldTerm: 'Google 7 AI Commitments',
            quickFact: '1) Socially beneficial, 2) Avoid unfair bias, 3) Built & tested for safety, 4) Accountable to people, 5) Privacy by design, 6) Scientific excellence, 7) Accord with principles.',
          },
          {
            boldTerm: 'Google 4 Prohibited Applications',
            quickFact: 'Google will NEVER pursue: 1) Weapons or bodily harm, 2) Surveillance violating international norms, 3) Violating international law/human rights, 4) Overall harmful technologies.',
            examTip: 'Non-negotiable exam rule: Google cloud services will never support military weapons or unlawful surveillance systems.',
          },
          {
            boldTerm: 'Human-in-the-Loop (HITL)',
            quickFact: 'Mandatory human approval before finalizing high-consequence decisions (e.g. loan approvals, medical diagnoses, legal filings).',
          },
          {
            boldTerm: 'Model Cards & Explainable AI',
            quickFact: 'Standardized documentation summarizing model capabilities, limitations, evaluation benchmarks, and feature attribution explanations.',
          },
        ],
      },
      {
        categoryTitle: 'Adoption Strategy & Unit Economics',
        bulletPoints: [
          {
            boldTerm: 'Value vs Feasibility Matrix',
            quickFact: 'Prioritize Quick Wins (high value, high feasibility) first (e.g. customer FAQ bots, meeting summaries) to prove early ROI.',
          },
          {
            boldTerm: 'Context Caching',
            quickFact: 'Vertex AI feature that caches repeated large prompt context in memory, reducing input token billing costs by up to 75%.',
          },
          {
            boldTerm: 'Total Cost of Ownership (TCO)',
            quickFact: 'Evaluate inference token costs, latency SLA requirements, fine-tuning hosting costs, and engineer maintenance overhead.',
          },
          {
            boldTerm: 'Change Management',
            quickFact: 'Drive employee AI adoption through centralized prompt libraries, continuous upskilling, and transparent internal governance councils.',
          },
        ],
      },
    ],
  },
];

