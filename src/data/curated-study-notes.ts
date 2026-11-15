export interface StudySubtopic {
  subtopicTitle: string;
  points: {
    term: string;
    explanation: string;
    exampleOrDetail?: string;
  }[];
  practicalTakeaway?: string;
}

export interface ComprehensiveModule {
  id: string;
  courseTitle: string;
  domainMapping: string;
  examWeight: string;
  estimatedReadTime: string;
  moduleOverview: string;
  audioDriveUrl?: string;
  audioEmbedUrl?: string;
  slideDeckUrl?: string;
  subtopics: StudySubtopic[];
  examFocusPoints: string[];
  officialDocLinks: { title: string; url: string }[];
}

export const COMPREHENSIVE_STUDY_MODULES: ComprehensiveModule[] = [
  // =========================================================================
  // MODULE 1: GEN AI - BEYOND THE CHATBOT
  // =========================================================================
  {
    id: 'course-1-foundations',
    courseTitle: 'Module 1: Gen AI - Beyond the Chatbot',
    domainMapping: 'Domain 1: Fundamentals (~30%)',
    examWeight: '30% of Exam',
    estimatedReadTime: '15 mins',
    audioDriveUrl: 'https://drive.google.com/file/d/13MSnaU2JaJ4XtTbEATc6FchBjy2Pq351/view?usp=drive_link',
    audioEmbedUrl: 'https://drive.google.com/file/d/13MSnaU2JaJ4XtTbEATc6FchBjy2Pq351/preview',
    slideDeckUrl: 'https://drive.google.com/file/d/1vL_Aw9vHjL5axdcr3DZ5M8DhTtNkNaJn/view?usp=sharing',
    moduleOverview:
      'Establishes the core definition of generative AI and dismantles the misconception that it is merely a technology for chatbots. Explores the value creation spectrum—from synthetic prototype imagery to multimodal analysis—the 5 layers of the Gen AI landscape, and why the most successful business adoption combines top-down executive vision with bottom-up team experimentation.',
    subtopics: [
      {
        subtopicTitle: '1. The AI, ML, Deep Learning & Generative AI Hierarchy',
        points: [
          {
            term: 'Artificial Intelligence (AI)',
            explanation: 'The overarching scientific discipline of creating computer systems capable of performing tasks that traditionally require human intelligence, such as visual perception, decision-making, and natural language understanding.',
            exampleOrDetail: 'Encompasses everything from simple symbolic rule engines to complex deep neural networks.',
          },
          {
            term: 'Machine Learning (ML)',
            explanation: 'A subfield of AI focused on algorithms that learn statistical representations and patterns from historical training data without being explicitly hand-coded with if-then rules.',
            exampleOrDetail: 'Example: An algorithm trained on thousands of email headers to automatically predict whether an incoming message is spam.',
          },
          {
            term: 'Deep Learning (DL)',
            explanation: 'A specialized branch of machine learning that utilizes artificial neural networks with multiple hidden layers (deep architectures) to automatically discover hierarchical features directly from raw data.',
            exampleOrDetail: 'Eliminates manual feature engineering. Lower layers learn edges and textures; higher layers learn complex semantic concepts like faces or sentence structures.',
          },
          {
            term: 'Generative AI (GenAI)',
            explanation: 'A cutting-edge subset of deep learning models that generate novel, synthetic content—including natural text, software code, realistic imagery, audio, and video—by learning the underlying probability distribution of massive datasets.',
            exampleOrDetail: 'Crucial Exam Distinction: Traditional/Discriminative AI asks "What category does this input belong to?"; Generative AI asks "What should come next based on patterns in the training data?"',
          },
        ],
        practicalTakeaway:
          'Remember the Russian doll concept: Generative AI is inside Deep Learning, which is inside Machine Learning, which is inside Artificial Intelligence.',
      },
      {
        subtopicTitle: '2. Traditional Predictive AI vs Generative Foundation Models',
        points: [
          {
            term: 'Traditional AI Models',
            explanation: 'Trained on narrow, task-specific datasets to perform single specialized functions (e.g., predicting customer churn, classifying sentiment as positive/negative, or forecasting quarterly sales).',
            exampleOrDetail: 'Limitation: Highly rigid. A model trained to detect credit card fraud cannot summarize a contract or generate a marketing slogan.',
          },
          {
            term: 'Foundation Models',
            explanation: 'Large-scale AI models pre-trained on vast, diverse multimodal corpora across billions of parameters. They develop generalized reasoning and language understanding capable of adapting to hundreds of downstream tasks.',
            exampleOrDetail: 'Exam Distinction: Foundation models are generalists adaptable via prompt engineering or fine-tuning, whereas traditional models are narrow specialists requiring re-training from scratch for each task.',
          },
          {
            term: 'Augmenting Human Capabilities',
            explanation: 'Gen AI acts as a cognitive collaborator. It provides synthesized data, initial drafts, alternative hypotheses, and prototypes that human experts then evaluate and refine to make informed decisions.',
          },
        ],
      },
      {
        subtopicTitle: '3. Beyond the Chatbot: The Enterprise Value Creation Spectrum',
        points: [
          {
            term: 'The "Only a Chatbot" Misconception',
            explanation: 'A frequent executive hesitation: CEOs or business leaders believing Gen AI is only useful for basic customer service chatbots. In reality, conversational chat is only one minor surface application.',
            exampleOrDetail: 'Exam Scenario: If an executive asks what Gen AI can offer beyond customer chat, prime examples include: creating photorealistic 3D product prototypes from descriptions (Imagen), synthesizing multi-hour video footage into executive briefings, generating synthetic test data for software, and automated code migration.',
          },
          {
            term: 'Multimodal Applications',
            explanation: 'Systems that accept and generate multiple modalities simultaneously—such as analyzing customer sentiment across video testimonials and written survey data, or explaining mechanical schematics from an image and voice prompt.',
          },
          {
            term: 'The Google Cloud Ecosystem Advantage',
            explanation: 'Allows enterprises to leverage Google\'s decades of AI research and planetary-scale infrastructure without building foundation models from scratch, while preserving enterprise-grade security, data sovereignty, and compliance.',
          },
        ],
      },
      {
        subtopicTitle: '4. Strategic Business Adoption: Top-Down Vision + Bottom-Up Innovation',
        points: [
          {
            term: 'The Hybrid Implementation Model',
            explanation: 'The officially recommended approach for Gen AI adoption: Combine a top-down strategic vision from executive leadership with bottom-up input and experimentation from frontline teams.',
            exampleOrDetail: 'Why Top-Down Alone Fails: Executive mandates without frontline input lead to disconnected solutions that don\'t solve real operational problems. Why Bottom-Up Alone Fails: Grassroots experiments without executive governance create fragmented tools, compliance risks, and wasted budget.',
          },
          {
            term: 'The Vital Role of Mid-Level Managers & ICs',
            explanation: 'Mid-level managers and individual contributors are essential because their proximity to daily workflows allows them to identify authentic bottlenecks, high-impact automation targets, and practical use cases that senior executives cannot see.',
            exampleOrDetail: 'Exam Trigger: Questions asking who should drive use-case discovery emphasize mid-level managers and domain specialists who understand the day-to-day workflow friction.',
          },
        ],
        practicalTakeaway: 'Exam Rule: The optimal AI organizational strategy is NEVER pure top-down or pure bottom-up; it is always a HYBRID approach empowering mid-level managers.',
      },
      {
        subtopicTitle: '5. The 5 Core Layers of the Gen AI Landscape',
        points: [
          {
            term: 'Layer 1: Infrastructure',
            explanation: 'The physical compute, network, and storage substrate powering model training and inference.',
            exampleOrDetail: 'Cloud TPUs (v4, v5e, v5p), NVIDIA GPUs (H100, A100, L4), Jupiter petabit networking fabric, and high-performance Cloud Storage/Filestore.',
          },
          {
            term: 'Layer 2: Models',
            explanation: 'Pre-trained foundation models that process, reason across, and generate multimodal information.',
            exampleOrDetail: 'Google First-Party: Gemini (multimodal text/code/vision/audio), Gemma (open weights for private deployment), Imagen 3, and Veo.',
          },
          {
            term: 'Layer 3: Platforms',
            explanation: 'Development, testing, tuning, and operationalization environments.',
            exampleOrDetail: 'Vertex AI (enterprise platform with Model Garden, Studio, endpoints, IAM governance) and Google AI Studio (fast web-based prototyping with API keys).',
          },
          {
            term: 'Layer 4: Agents',
            explanation: 'Autonomous goal-driven systems that combine reasoning loops, external tool execution (extensions, functions, data stores), memory, and orchestration.',
            exampleOrDetail: 'Vertex AI Agent Builder, Customer Engagement Suite (CCAI), and custom multi-agent workflows.',
          },
          {
            term: 'Layer 5: Applications',
            explanation: 'End-user productivity software and business solutions powered by generative capabilities.',
            exampleOrDetail: 'Gemini for Google Workspace (Docs, Sheets, Slides, Gmail), NotebookLM, Gemini Code Assist, and custom business portals.',
          },
        ],
        practicalTakeaway: 'Exam Blueprint Tip: When a scenario asks which layer solves a problem, map the requirement: compute/chips = Infrastructure; Gemini/Gemma = Models; Vertex AI console/IAM = Platform; reasoning + tools = Agents; Workspace/NotebookLM = Applications.',
      },
    ],
    examFocusPoints: [
      'Hierarchy: AI (broadest) > Machine Learning > Deep Learning > Generative AI (novel content).',
      'Foundation models are generalists trained on diverse data; traditional models are narrow specialists.',
      'Gen AI delivers value far beyond chatbots: synthetic prototyping, multimodal video/audio analysis, code generation.',
      'Recommended adoption strategy: Hybrid Top-Down Strategic Vision combined with Bottom-Up input from mid-level managers.',
      'The 5 Layers of the Landscape: Infrastructure, Models, Platforms, Agents, Applications.',
    ],
    officialDocLinks: [
      { title: 'Google Cloud: What is Artificial Intelligence?', url: 'https://cloud.google.com/learn/what-is-artificial-intelligence' },
      { title: 'Vertex AI Generative AI Overview', url: 'https://cloud.google.com/vertex-ai/generative-ai/docs/learn/overview' },
      { title: 'Course 1 Slide Deck (Google Drive PDF)', url: 'https://drive.google.com/file/d/1vL_Aw9vHjL5axdcr3DZ5M8DhTtNkNaJn/view?usp=sharing' },
    ],
  },

  // =========================================================================
  // MODULE 2: GEN AI - UNLOCK FOUNDATIONAL CONCEPTS
  // =========================================================================
  {
    id: 'course-2-landscape',
    courseTitle: 'Module 2: Gen AI - Unlock Foundational Concepts',
    domainMapping: 'Domain 1: Fundamentals (~30%)',
    examWeight: '30% of Exam',
    estimatedReadTime: '18 mins',
    audioDriveUrl: 'https://drive.google.com/file/d/1XdXiynxKn7TisiZlxv8hla8TL6xXo2dx/view?usp=sharing',
    audioEmbedUrl: 'https://drive.google.com/file/d/1XdXiynxKn7TisiZlxv8hla8TL6xXo2dx/preview',
    slideDeckUrl: 'https://drive.google.com/file/d/1osba4LC4PWbHEYA9Q9-K_lnTh3kn3GHH/view?usp=sharing',
    moduleOverview:
      'Unlocks the core mechanics of machine learning and large language models: supervised vs unsupervised vs reinforcement learning (RLHF), structured vs unstructured data handling, the 4 vital data quality dimensions, token economics, overcoming hallucinations via grounding and HITL, high-performance storage for AI pipelines, and legal compliance.',
    subtopics: [
      {
        subtopicTitle: '1. Machine Learning Approaches & The ML Lifecycle',
        points: [
          {
            term: 'Supervised Learning',
            explanation: 'The model trains on a dataset containing input features paired with ground-truth target labels. The model learns a mathematical mapping function from inputs to outputs.',
            exampleOrDetail: 'Common Use Cases: Predicting real estate prices (regression) or categorizing customer support tickets into billing vs technical (classification).',
          },
          {
            term: 'Unsupervised Learning',
            explanation: 'The algorithm analyzes unlabeled data to uncover inherent groupings, latent structures, or anomalous data points without explicit supervision.',
            exampleOrDetail: 'Common Use Cases: Customer segmentation for marketing cohorts, topic modeling, and fraud anomaly detection.',
          },
          {
            term: 'Reinforcement Learning (RL) & RLHF',
            explanation: 'An agent learns optimal actions by interacting with an environment, receiving reward signals for beneficial steps and penalties for errors. RLHF (Reinforcement Learning from Human Feedback) uses human preferences to align raw language models with helpfulness, truthfulness, and safety guidelines.',
            exampleOrDetail: 'RLHF is what transforms an unsteered next-token predictor into a polite, enterprise-grade conversational assistant like Gemini.',
          },
          {
            term: 'The 5 Stages of the ML Lifecycle on Google Cloud',
            explanation: '1. Ingestion: Loading raw data via Cloud Storage or BigQuery.\n2. Preparation: Cleaning, labeling, and feature engineering via Dataprep or Vertex AI Feature Store.\n3. Training: Running distributed model training using Cloud TPUs or GPUs.\n4. Deployment: Hosting models on scalable serverless endpoints via Vertex AI Endpoints.\n5. Management: Continuous monitoring for data drift, latency, and throughput degradation.',
          },
        ],
      },
      {
        subtopicTitle: '2. Data Architectures & The 4 Critical Data Quality Dimensions',
        points: [
          {
            term: 'Structured vs Unstructured Data',
            explanation: 'Structured data adheres to strict relational schemas (SQL, BigQuery tables, CSVs) and is best analyzed using BigQuery ML. Unstructured data (PDF contracts, emails, call center audio, images) represents >80% of enterprise information and is where Gen AI shines.',
          },
          {
            term: 'Accuracy',
            explanation: 'Whether data contains correct facts, accurate labels, and verified ground truth. Training on inaccurate data directly causes flawed predictions and severe model bias.',
          },
          {
            term: 'Consistency',
            explanation: 'Uniform formatting, taxonomy, and labeling standards across the entire dataset. Inconsistent labeling formats confuse neural networks during backpropagation and severely hinder learning.',
            exampleOrDetail: 'Exam Question Focus: If two annotators label the same sentiment differently or date formats vary wildly, consistency is compromised, degrading model training convergence.',
          },
          {
            term: 'Completeness & Relevance',
            explanation: 'Completeness ensures no missing critical fields. Relevance ensures training data reflects current business reality rather than obsolete historical patterns.',
          },
        ],
        practicalTakeaway: 'Exam Rule: Data quality always trumps raw quantity. Clean, curated, and consistently labeled data beats massive noisy datasets every time.',
      },
      {
        subtopicTitle: '3. Foundation Models, Tokens & Context Windows',
        points: [
          {
            term: 'Tokens & Token Economics',
            explanation: 'The fundamental atomic units of natural language processed by language models. A token can be a single word, part of a word, or punctuation symbol (approximately 1 token ≈ 4 characters or 0.75 English words).',
            exampleOrDetail: 'Vertex AI API consumption and compute costs are calculated based on input and output token counts.',
          },
          {
            term: 'Context Window Size',
            explanation: 'The maximum total number of tokens (prompt + conversation history + retrieved documents + generated output) that a model can hold in its active memory for a single inference call.',
            exampleOrDetail: 'Gemini 1.5 Pro features a 2,000,000-token context window—capable of analyzing 1 hour of video, 11 hours of audio, or 700,000 words of technical manuals in one prompt.',
          },
          {
            term: 'Embeddings & Vector Spaces',
            explanation: 'High-dimensional numerical representations of text, images, or audio that capture semantic meaning. Words with similar meanings are located close to each other in vector space.',
          },
        ],
      },
      {
        subtopicTitle: '4. Overcoming Model Limitations: Hallucinations, Drift & HITL',
        points: [
          {
            term: 'Hallucination',
            explanation: 'When a model produces fluent, grammatically sound assertions that are factually erroneous, ungrounded, or fabricated.',
            exampleOrDetail: 'Solutions: Grounding with enterprise data (RAG), Grounding with Google Search, lower temperature settings (0.0 to 0.2), and Human-in-the-Loop validation.',
          },
          {
            term: 'Human-in-the-Loop (HITL)',
            explanation: 'Integrating human judgment and oversight into the ML lifecycle, especially for high-stakes decisions (healthcare, lending, legal compliance) and model evaluation.',
            exampleOrDetail: 'HITL ensures accountability and acts as a final safeguard against edge-case hallucinations or biased predictions.',
          },
          {
            term: 'Data Drift vs Concept Drift',
            explanation: 'Data Drift: Statistical distribution of inputs changes over time. Concept Drift: The underlying relationship between input data and expected target output shifts.',
            exampleOrDetail: 'Monitored continuously using Vertex AI Model Monitoring with automated alerting.',
          },
        ],
      },
      {
        subtopicTitle: '5. High-Performance Storage for AI & Legal Responsibilities',
        points: [
          {
            term: 'Why High-Performance Storage is Vital for Gen AI',
            explanation: 'Model training and large-scale batch inference consume massive multimodal datasets. High-throughput storage (Cloud Storage with gcsfuse and Filestore high-IOPS shared file system) ensures TPUs and GPUs are never starved of data, maximizing hardware utilization.',
            exampleOrDetail: 'Exam Question: High-performance storage is required to store and efficiently access the massive datasets used in AI training without causing I/O bottlenecks.',
          },
          {
            term: 'Enterprise Legal & Compliance Responsibilities',
            explanation: 'Organizations deploying AI must ensure strict adherence to regional data privacy laws (GDPR, CCPA, HIPAA), non-discrimination principles, and the specific intellectual property licensing terms of the models they consume.',
            exampleOrDetail: 'Legal compliance is not a one-time check; continuous governance and data auditing are mandatory for trustworthy enterprise AI.',
          },
        ],
      },
    ],
    examFocusPoints: [
      'Inconsistent labeling formats confuse neural models and hinder learning; inaccurate data causes biased outputs.',
      'High-performance storage (Cloud Storage/Filestore) is critical to feed massive datasets to AI processors without I/O bottlenecks.',
      'Overcoming foundation model limitations requires: Grounding, Prompt Engineering, Fine-Tuning, and Humans in the Loop (HITL).',
      'Organizations must maintain continuous legal review covering privacy laws, non-discrimination, and model licensing.',
    ],
    officialDocLinks: [
      { title: 'Vertex AI Generative AI Documentation', url: 'https://cloud.google.com/vertex-ai/generative-ai/docs' },
      { title: 'Course 2 Slide Deck (Google Drive PDF)', url: 'https://drive.google.com/file/d/1osba4LC4PWbHEYA9Q9-K_lnTh3kn3GHH/view?usp=sharing' },
    ],
  },

  // =========================================================================
  // MODULE 3: GEN AI - NAVIGATE THE LANDSCAPE
  // =========================================================================
  {
    id: 'course-3-techniques',
    courseTitle: 'Module 3: Gen AI - Navigate the Landscape',
    domainMapping: 'Domain 2: Google Cloud Offerings (~35%)',
    examWeight: '35% of Exam',
    estimatedReadTime: '20 mins',
    audioDriveUrl: 'https://drive.google.com/file/d/1piDC9brzAKYEvMuWladLpcS0Bt67D9GI/view?usp=sharing',
    audioEmbedUrl: 'https://drive.google.com/file/d/1piDC9brzAKYEvMuWladLpcS0Bt67D9GI/preview',
    slideDeckUrl: 'https://drive.google.com/file/d/1CDjtzSPvnYKw8kC3b8LF4839IjKYfPae/view?usp=sharing',
    moduleOverview:
      'Navigates Google Cloud\'s complete enterprise AI portfolio: AI Hypercomputer hardware (Cloud TPUs & NVIDIA GPUs), the Model Garden catalog (Gemini, Gemma, Imagen 3, Veo, open-weight and partner models), Google AI Studio vs Vertex AI Studio, the 3 discrete stages of RAG, sampling parameters, and cost optimization factors.',
    subtopics: [
      {
        subtopicTitle: '1. AI-Optimized Infrastructure: TPUs & GPUs',
        points: [
          {
            term: 'Cloud TPUs (Tensor Processing Units)',
            explanation: 'Google\'s custom ASICs engineered specifically for machine learning matrix multiplication and linear algebra.',
            exampleOrDetail: 'Generations: TPU v4 (high performance), TPU v5e (optimized for cost-efficiency and inference scale), and TPU v5p (Google\'s most powerful accelerator for foundational model training).',
          },
          {
            term: 'NVIDIA GPUs on Google Cloud',
            explanation: 'Industry-standard graphics processing units (NVIDIA H100, A100, L4) available on Compute Engine and GKE for customers with pre-existing CUDA codebases.',
          },
          {
            term: 'AI Hypercomputer Architecture',
            explanation: 'An integrated system design combining custom accelerator hardware, Jupiter petabit-scale networking fabric, high-throughput storage (Cloud Storage, Filestore), and open-source orchestration (GKE, Slurm, Ray).',
          },
        ],
      },
      {
        subtopicTitle: '2. Google\'s Model Families & Vertex AI Model Garden',
        points: [
          {
            term: 'Gemini Family (Proprietary / Managed API)',
            explanation: 'Google\'s flagship multimodal models trained natively on text, code, images, audio, and video simultaneously.\n• Gemini Flash: Ultra-fast, cost-effective for high-frequency production tasks.\n• Gemini Pro: Designed for complex reasoning, math, and coding.\n• Gemini Nano: Lightweight model designed for edge devices and Android.',
            exampleOrDetail: 'Important: Gemini models are accessed via API on Vertex AI. Model weights are never downloadable.',
          },
          {
            term: 'Gemma Family (Open-Weights)',
            explanation: 'Google\'s family of lightweight, open-weight models derived from the same research and technology used to create Gemini. Available in sizes like 2B, 9B, and 27B parameters, plus specialized variants like CodeGemma and PaliGemma.',
            exampleOrDetail: 'Exam Scenario Trigger: If an enterprise requires full custody of model weights, offline air-gapped hosting, or local on-premise execution, GEMMA is the correct Google Cloud recommendation.',
          },
          {
            term: 'Imagen 3 & Veo',
            explanation: 'Imagen 3: State-of-the-art text-to-image foundation model generating photorealistic visuals with SynthID digital watermarking. Veo: Generative video model creating 1080p cinematic video clips with precise temporal consistency.',
          },
          {
            term: 'Vertex AI Model Garden (150+ Models)',
            explanation: 'Curated hub featuring: 1) Google First-Party (Gemini, Imagen, Veo), 2) Open-Weight Models (Gemma, Llama 3, Mistral), and 3) Partner Models (Anthropic Claude, AI21 Labs). Allows deploying open models with one click as managed serverless endpoints.',
          },
        ],
      },
      {
        subtopicTitle: '3. Development Platforms: Vertex AI Studio vs Google AI Studio',
        points: [
          {
            term: 'Google AI Studio',
            explanation: 'A lightweight, web-based prototyping sandbox tailored for individual developers and rapid experimentation. Accessible with a simple Google account and API key without configuring enterprise cloud billing or IAM projects.',
            exampleOrDetail: 'Best For: Fast idea validation, zero-friction prompt testing, and quick code prototyping.',
          },
          {
            term: 'Vertex AI Studio',
            explanation: 'Google Cloud\'s enterprise development console for generative AI. Fully integrated with GCP project governance, IAM permissions, private VPC endpoints, enterprise billing, and SLAs.',
            exampleOrDetail: 'Best For: Production deployment, enterprise compliance, fine-tuning, system instruction management, and multi-team collaboration.',
          },
        ],
        practicalTakeaway: 'Exam Rule: Prototyping with an API key = Google AI Studio; Enterprise production with IAM, VPC, and SLAs = Vertex AI Studio.',
      },
      {
        subtopicTitle: '4. The 3 Discrete Stages of RAG (Retrieval-Augmented Generation)',
        points: [
          {
            term: 'Stage 1: Retrieval',
            explanation: 'Fetching relevant documents and text chunks from an enterprise knowledge base or vector database based on semantic similarity to the user\'s query.',
            exampleOrDetail: 'Exam Definition: The stage in RAG that involves fetching relevant documents from a knowledge base based on the user query.',
          },
          {
            term: 'Stage 2: Augmentation',
            explanation: 'Adding context to the user query by injecting the retrieved document chunks and metadata into the LLM prompt context.',
            exampleOrDetail: 'Exam Definition: The stage in RAG that involves adding context to the query by including additional information from the knowledge base.',
          },
          {
            term: 'Stage 3: Generation',
            explanation: 'Creating a coherent, natural language response to the user\'s query based on the augmented prompt context, complete with source citations.',
            exampleOrDetail: 'Exam Definition: The stage in RAG that involves creating a response to the user\'s query in natural language.',
          },
        ],
        practicalTakeaway: 'Remember the 3 RAG Stages: Retrieval (fetch docs) → Augmentation (inject context into prompt) → Generation (synthesize grounded answer).',
      },
      {
        subtopicTitle: '5. Sampling Parameters: Controlling Randomness & Entropy',
        points: [
          {
            term: 'Temperature (0.0 to 2.0)',
            explanation: 'Controls the randomness of the model\'s next-token selection:\n• Low Temperature (0.0 - 0.2): Probability distribution is sharpened. Model chooses the highest-probability tokens. Ideal for code generation, mathematical analysis, and factual extraction.\n• Moderate Temperature (0.5 - 0.7): Balanced creativity and coherence for customer service and general summarization.\n• High Temperature (0.8 - 1.5+): Flattens probability distribution, introducing rare token choices. Ideal for creative brainstorming and advertising hooks.',
          },
          {
            term: 'Top-P (Nucleus Sampling)',
            explanation: 'Dynamically truncates candidate vocabulary to the smallest set of tokens whose cumulative probability equals or exceeds threshold P (e.g. 0.95).',
          },
          {
            term: 'Top-K Sampling',
            explanation: 'Strictly limits token selection to the top K most likely words (e.g. K=40), regardless of cumulative probability percentage.',
          },
        ],
      },
      {
        subtopicTitle: '6. Model Customization Spectrum & Cost Optimization Factors',
        points: [
          {
            term: 'Customization Decision Tree',
            explanation: '1. Prompt Engineering: Lowest cost, zero infrastructure. 2. Grounding / RAG: Best for dynamic private company knowledge. 3. Fine-Tuning (PEFT/LoRA): Best for teaching specialized domain style, tone, or niche code syntax. 4. Pre-training from Scratch: Highest cost/risk, reserved for novel scientific domains.',
          },
          {
            term: 'Cost Drivers in Gen AI Solutions',
            explanation: 'Key cost drivers include model parameter size, token consumption volume, and context window size. A larger context window processes significantly more tokens, increasing latency, memory, and API spend.',
            exampleOrDetail: 'Exam Question: Which factor increases the cost of using a model? Larger context window / higher token volumes.',
          },
          {
            term: 'Vertex AI Context Caching',
            explanation: 'Pre-computes and caches frequently queried context blocks (long manuals, legal repos) in memory, slashing input token billing by up to 75% and reducing latency.',
          },
        ],
      },
    ],
    examFocusPoints: [
      'Cloud TPUs are Google ASICs; NVIDIA GPUs are industry GPUs for existing CUDA code.',
      'Gemini = Managed API (closed weights); Gemma = Open-weights (self-hostable).',
      'The 3 Stages of RAG: 1. Retrieval (fetching docs), 2. Augmentation (adding context to query), 3. Generation (creating response).',
      'Google AI Studio = Fast developer web prototyping; Vertex AI Studio = Enterprise production with IAM.',
      'Larger context windows increase model costs; Vertex AI Context Caching reduces costs by up to 75%.',
    ],
    officialDocLinks: [
      { title: 'Vertex AI Model Garden', url: 'https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform' },
      { title: 'Google Cloud AI Hypercomputer', url: 'https://cloud.google.com/solutions/ai-hypercomputer' },
      { title: 'Course 3 Slide Deck (Google Drive PDF)', url: 'https://drive.google.com/file/d/1CDjtzSPvnYKw8kC3b8LF4839IjKYfPae/view?usp=sharing' },
    ],
  },

  // =========================================================================
  // MODULE 4: GEN AI APPS - TRANSFORM YOUR WORK
  // =========================================================================
  {
    id: 'course-4-work',
    courseTitle: 'Module 4: Gen AI Apps - Transform Your Work',
    domainMapping: 'Domain 2: Google Cloud Offerings (~35%)',
    examWeight: '35% of Exam (Applications)',
    estimatedReadTime: '14 mins',
    audioDriveUrl: 'https://drive.google.com/file/d/1kpZpGyjEp5KfJx0DaaBYvGSYaC76_0br/view?usp=sharing',
    audioEmbedUrl: 'https://drive.google.com/file/d/1kpZpGyjEp5KfJx0DaaBYvGSYaC76_0br/preview',
    slideDeckUrl: 'https://drive.google.com/file/d/1MMBnREBEH3-4UNO7iBJXcTRTJ-DgURrp/view?usp=sharing',
    moduleOverview:
      'Explores end-user generative AI productivity applications: Gemini App, custom Gems, Gemini for Google Workspace, NotebookLM research assistant, Gemini Code Assist, enterprise data protection guarantees, and essential prompt engineering frameworks.',
    subtopics: [
      {
        subtopicTitle: '1. Gemini App, Gemini Advanced & Custom Gems',
        points: [
          {
            term: 'Gemini App vs Gemini Advanced',
            explanation: 'The web and mobile interface for conversational AI. Gemini Advanced provides access to Google\'s most capable models (Gemini Pro/Ultra) with a 1M+ token context window for analyzing extensive code, audio, and documents.',
          },
          {
            term: 'Gems (Custom AI Experts)',
            explanation: 'Customized versions of Gemini created without code for specific scenarios, personas, or workflows by defining natural-language instructions and guardrails.',
            exampleOrDetail: 'Exam Scenario Trigger: A freelance writer or marketing team needing to switch between consistent brand tones (e.g. blog posts vs social copy vs technical copy) should use GEMS to create dedicated specialized personas.',
          },
        ],
      },
      {
        subtopicTitle: '2. Gemini for Google Workspace',
        points: [
          {
            term: 'Help Me Write (Docs & Gmail)',
            explanation: 'Generates email drafts, executive summaries, meeting agendas, and proposals directly inside Docs and Gmail.',
          },
          {
            term: 'Help Me Organize (Google Sheets)',
            explanation: 'Automatically constructs custom project trackers, event schedules, task management tables, and budget templates based on plain-language prompts.',
          },
          {
            term: 'Help Me Visualize (Google Slides & Meet)',
            explanation: 'Generates unique studio-quality imagery in Slides; generates custom professional background environments in Google Meet.',
          },
          {
            term: 'Enterprise Data Protection in Workspace',
            explanation: 'Google Cloud contractually guarantees that customer Workspace data, emails, prompts, and attachments are encrypted, kept in tenant isolation, and NEVER used to train public foundation models.',
            exampleOrDetail: 'Crucial Exam Fact: Enterprise employees can safely process confidential memos and internal communications without data leakage concerns.',
          },
        ],
      },
      {
        subtopicTitle: '3. NotebookLM: Personalized AI Research Assistant',
        points: [
          {
            term: 'What is NotebookLM?',
            explanation: 'An AI-powered personalized notebook and research assistant developed by Google that is strictly grounded in the specific source materials uploaded by the user.',
            exampleOrDetail: 'Accepts Google Docs, PDFs, web URLs, and notes. Responses include clickable citation numbers linking directly to exact quotes in your source text.',
          },
          {
            term: 'Audio Overviews (Deep Dive Podcasts)',
            explanation: 'Transforms uploaded source documents into engaging, natural-sounding two-host conversational podcast discussions (NotebookLM Audio Overviews) that explain complex concepts dynamically.',
          },
        ],
      },
      {
        subtopicTitle: '4. Gemini Code Assist for Enterprise Development',
        points: [
          {
            term: 'Developer Productivity Companion',
            explanation: 'An enterprise coding assistant that integrates natively into popular IDEs (VS Code, IntelliJ, PyCharm, Google Cloud Workstations).',
            exampleOrDetail: 'Provides context-aware code completion, natural-language explanation, automated unit test generation, vulnerability scanning, and legacy code refactoring.',
          },
          {
            term: 'Private Codebase Customization',
            explanation: 'Can be connected to an enterprise\'s private repositories (GitHub, GitLab, Bitbucket) so generated code conforms strictly to internal libraries, APIs, and company design standards.',
          },
        ],
      },
      {
        subtopicTitle: '5. Core Prompt Engineering Techniques for Business Apps',
        points: [
          {
            term: 'Zero-Shot Prompting',
            explanation: 'Presenting a task instruction to the model without providing any reference examples of completed input-output pairs.',
            exampleOrDetail: 'Relies entirely on the foundation model\'s pre-existing knowledge.',
          },
          {
            term: 'Few-Shot Prompting',
            explanation: 'Providing 2 to 5 curated demonstration pairs inside the prompt to guide output schema, format, and style.',
          },
          {
            term: 'Role / Persona Prompting',
            explanation: 'Assigning the model a specific persona or professional framing (e.g., "Act as a senior cloud security auditor").',
            exampleOrDetail: 'Exam Question: What is the main advantage of role prompting? It influences the style, tone, and focus of the AI\'s responses by assigning it a specific persona.',
          },
          {
            term: 'Chain-of-Thought (CoT) Prompting',
            explanation: 'Explicitly instructing the model to generate intermediate reasoning steps before arriving at a final conclusion ("Think step-by-step"). Essential for multi-step logic and mathematical reasoning.',
          },
        ],
      },
    ],
    examFocusPoints: [
      'Gems are custom AI experts tailored for persistent personas and specialized workflows without coding.',
      'Customer Workspace emails and documents are NEVER used to train public Google models.',
      'NotebookLM grounds responses solely on uploaded user source materials and generates Audio Overviews.',
      'Gemini Code Assist supports enterprise codebase awareness while preserving intellectual property.',
      'Role prompting influences the style, tone, and focus of AI responses by assigning a specific persona.',
    ],
    officialDocLinks: [
      { title: 'Gemini for Google Workspace', url: 'https://cloud.google.com/gemini-for-workspace' },
      { title: 'NotebookLM Overview', url: 'https://notebooklm.google/' },
      { title: 'Course 4 Slide Deck (Google Drive PDF)', url: 'https://drive.google.com/file/d/1MMBnREBEH3-4UNO7iBJXcTRTJ-DgURrp/view?usp=sharing' },
    ],
  },

  // =========================================================================
  // MODULE 5: GEN AI AGENTS & TRANSFORM YOUR ORGANIZATION
  // =========================================================================
  {
    id: 'course-5-organization',
    courseTitle: 'Module 5: Gen AI Agents & Transform Your Organization',
    domainMapping: 'Domain 4: Business Strategy (~15%)',
    examWeight: '15% of Exam',
    estimatedReadTime: '18 mins',
    audioDriveUrl: 'https://drive.google.com/file/d/1mEQkC1YMhHEGuq5SIrmuYl6qOoemEnt1/view?usp=sharing',
    audioEmbedUrl: 'https://drive.google.com/file/d/1mEQkC1YMhHEGuq5SIrmuYl6qOoemEnt1/preview',
    slideDeckUrl: 'https://drive.google.com/file/d/1Kx-94xEOOrwe0yEZ0J64yPo67ZFsC6AY/view?usp=sharing',
    moduleOverview:
      'Guides leaders through the transition from simple chatbots to autonomous goal-driven agents. Explores the 4 agent tool types, the agent reasoning loop, multi-agent systems, hybrid CX agents, Customer Engagement Suite (CCAI), the Secure AI Framework (SAIF), Google\'s 7 AI Principles & Prohibited Uses, data anonymization vs pseudonymization, and planning for business impact.',
    subtopics: [
      {
        subtopicTitle: '1. Autonomous AI Agents vs Conversational Chatbots',
        points: [
          {
            term: 'From Passive Chatbot to Active Agent',
            explanation: 'A traditional chatbot simply answers questions with static text. An AI Agent is goal-driven: it evaluates objectives, reasons across multiple steps, invokes external tools/APIs, queries databases, and takes real-world actions in enterprise systems.',
            exampleOrDetail: 'Exam Question: What two key elements distinguish AI agents from standalone LLMs? A reasoning loop and the ability to use tools.',
          },
          {
            term: 'The Agent Reasoning Loop',
            explanation: 'An iterative cognitive cycle: 1) Observe (perceive user input and environmental state), 2) Reason (evaluate goals, determine next step or sub-goal), 3) Act (execute tool, call API, or query database), 4) Evaluate (inspect tool results and refine).',
            exampleOrDetail: 'Exam Question: The reasoning loop guides the agent through an iterative process of observation, internal reasoning, and decision-making to solve complex tasks.',
          },
        ],
      },
      {
        subtopicTitle: '2. The 4 Agent Tool Types in Google Cloud',
        points: [
          {
            term: 'Extensions',
            explanation: 'Enable agents to connect to external services via REST APIs (e.g. querying a shipping carrier API or flight booking endpoint).',
            exampleOrDetail: 'Exam Question: Which tool enables you to connect to external services via APIs? Extensions.',
          },
          {
            term: 'Functions',
            explanation: 'Enable agents to define specific client-side executable actions, computations, or business tasks.',
            exampleOrDetail: 'Exam Question: Which tool enables you to define specific actions or tasks? Functions.',
          },
          {
            term: 'Data Stores',
            explanation: 'Provide agents with access to unstructured or structured enterprise knowledge bases and vector indexes.',
            exampleOrDetail: 'Exam Question: Which tool provides access to information? Data stores.',
          },
          {
            term: 'Plugins',
            explanation: 'Enable agents to add new modular skills, integrations, and capabilities.',
            exampleOrDetail: 'Exam Question: Which tool enables you to add new skills and integrations? Plugins.',
          },
        ],
        practicalTakeaway: 'Exam Memory Rule: Extensions = External APIs; Functions = Actions/Tasks; Data Stores = Information/Docs; Plugins = New Skills/Integrations.',
      },
      {
        subtopicTitle: '3. Multi-Agent Systems & Hybrid CX Agents',
        points: [
          {
            term: 'Multi-Agent Collaboration',
            explanation: 'A system where multiple specialized AI agents collaborate to achieve a complex objective that exceeds single-agent scope.',
            exampleOrDetail: 'Exam Scenario: An AI-powered travel booking system where one agent searches flights, a second agent reserves hotels, and a third verifies company expense policy compliance.',
          },
          {
            term: 'Hybrid CX Agent Design (Deterministic + Generative)',
            explanation: 'Combining deterministic rule-based dialogue flow (for regulatory compliance, customer authentication, and transactional execution) with generative models (for flexible conversation, tone empathy, and edge-case handling).',
            exampleOrDetail: 'Exam Question: What is the key advantage of a hybrid CX approach? It enables strict control over agent behavior and compliance while leveraging the flexibility of generative AI.',
          },
        ],
      },
      {
        subtopicTitle: '4. Google Customer Engagement Suite (CCAI)',
        points: [
          {
            term: 'Conversational Agents (Virtual Agents)',
            explanation: 'Customer-facing conversational bots that automate call center phone and chat inquiries with natural voice synthesis and task fulfillment.',
          },
          {
            term: 'Agent Assist (Human Call Copilot)',
            explanation: 'Assists human customer service agents during live phone calls by transcribing in real time, recommending relevant knowledge articles, and generating automated post-call summaries.',
            exampleOrDetail: 'Reduces Average Handling Time (AHT) and dramatically speeds up post-call wrap-up work.',
          },
          {
            term: 'Contact Center Insights',
            explanation: 'Applies conversational analytics across recorded calls to identify customer sentiment, trending complaints, and compliance infractions.',
          },
        ],
      },
      {
        subtopicTitle: '5. Google Secure AI Framework (SAIF) & AI Security',
        points: [
          {
            term: 'What is SAIF?',
            explanation: 'A practical conceptual framework introduced by Google to establish security standards for building and deploying AI responsibly, addressing threats like prompt injection, model theft, data poisoning, and training extraction.',
          },
          {
            term: 'The 6 SAIF Core Pillars',
            explanation: '1. Expand strong security foundations to the AI ecosystem.\n2. Extend detection and response to bring AI into the threat universe.\n3. Automate defenses to keep pace with threats.\n4. Harmonize platform-level controls for consistent protection.\n5. Adapt controls to adjust mitigations and feedback loops.\n6. Contextualize AI system risks in business processes.',
          },
          {
            term: 'Securing the Training Phase',
            explanation: 'Safeguarding training data and model parameters from unauthorized access, tampering, and leakage.',
          },
        ],
      },
      {
        subtopicTitle: '6. Responsible AI: Google\'s 7 Principles & 4 Prohibited Uses',
        points: [
          {
            term: 'Google\'s 7 AI Principles',
            explanation: '1) Socially beneficial, 2) Avoid unfair bias, 3) Built & tested for safety, 4) Accountable to people, 5) Privacy design, 6) Scientific excellence, 7) Accord with principles.',
          },
          {
            term: 'Google\'s 4 Explicitly Prohibited AI Applications',
            explanation: 'Google strictly prohibits designing or deploying AI in:\n1. Weapons or technologies whose principal purpose is to cause bodily injury.\n2. Technologies that cause or are likely to cause overall harm.\n3. Technologies that gather information for surveillance violating internationally accepted norms.\n4. Technologies whose purpose contravenes international law and human rights.',
            exampleOrDetail: 'Important Exam Fact: Google Cloud will never build or license autonomous weapons systems or unlawful surveillance tools.',
          },
          {
            term: 'Privacy Engineering: Data Anonymization vs Pseudonymization',
            explanation: '• Data Anonymization: Irreversibly alters or removes personal identifiers so individuals can never be re-identified, even with auxiliary data.\n• Data Pseudonymization: Replaces direct identifiers with artificial pseudonyms/tokens. Individuals can only be re-identified by authorized personnel with separate, securely stored decryption keys.\n• Sensitive Data Protection (Cloud DLP): Automated Google Cloud service for discovering, classifying, masking, and tokenizing PII/PHI in training sets and user prompts.',
          },
        ],
      },
      {
        subtopicTitle: '7. Planning for Impact, ROI & Unit Economics',
        points: [
          {
            term: 'The 3-Step Impact Framework',
            explanation: '1. Define key metrics (e.g. deflection rate, customer satisfaction, developer velocity).\n2. Collect and analyze data against baselines.\n3. Iterate and continuously improve models and prompt instructions.',
          },
          {
            term: 'Prioritization Matrix (Value vs Feasibility)',
            explanation: 'Start with Quick Wins (high value, high feasibility) such as internal semantic search or call summarization before attempting complex autonomous transactions.',
          },
        ],
      },
    ],
    examFocusPoints: [
      'Agents differ from LLMs by having a reasoning loop and tool execution capabilities.',
      'The 4 Agent Tool Types: Extensions (APIs), Functions (Actions), Data Stores (Info), Plugins (Skills).',
      'The Reasoning Loop: Observe -> Reason -> Act -> Evaluate.',
      'Hybrid CX Agents combine deterministic rule-based control with generative flexibility.',
      'Know the 6 SAIF Pillars and Google\'s 4 Prohibited AI Applications (weapons, harm, surveillance, human rights violations).',
      'Data Anonymization is irreversible; Data Pseudonymization allows re-identification via private key.',
    ],
    officialDocLinks: [
      { title: 'Google Secure AI Framework (SAIF)', url: 'https://cloud.google.com/security/ai-framework' },
      { title: 'Google AI Principles', url: 'https://ai.google/principles/' },
      { title: 'Course 5 Slide Deck (Google Drive PDF)', url: 'https://drive.google.com/file/d/1Kx-94xEOOrwe0yEZ0J64yPo67ZFsC6AY/view?usp=sharing' },
    ],
  },
];
