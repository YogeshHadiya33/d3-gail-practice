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
  subtopics: StudySubtopic[];
  examFocusPoints: string[];
  officialDocLinks: { title: string; url: string }[];
}

export const COMPREHENSIVE_STUDY_MODULES: ComprehensiveModule[] = [
  // MODULE 1: UNLOCK FOUNDATIONAL CONCEPTS
  {
    id: 'course-1-foundations',
    courseTitle: 'Course 1: Unlock Foundational Concepts',
    domainMapping: 'Domain 1: Fundamentals (~30%)',
    examWeight: '30% of Exam',
    estimatedReadTime: '15 mins',
    moduleOverview:
      'Covers the fundamental principles of artificial intelligence, machine learning, and deep learning. Explains how generative foundation models differ from traditional predictive algorithms, how tokens and embeddings work, and the reality of model hallucinations and data drift.',
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
            exampleOrDetail: 'Crucial Exam Distinction: Discriminative AI asks "What category does this input belong to?"; Generative AI asks "What should come next based on patterns in the training data?"',
          },
        ],
        practicalTakeaway:
          'Remember the Russian doll concept: Generative AI is inside Deep Learning, which is inside Machine Learning, which is inside Artificial Intelligence.',
      },
      {
        subtopicTitle: '2. Machine Learning Approaches & The ML Lifecycle',
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
            explanation: 'An agent learns optimal actions by interacting with an environment, receiving reward signals for beneficial steps and penalties for errors. RLHF (Reinforcement Learning from Human Feedback) uses human preferences to align raw language models with helpfulness and safety guidelines.',
            exampleOrDetail: 'RLHF is what transforms a raw, unpredictable base LLM into a well-behaved conversational assistant like Gemini.',
          },
          {
            term: 'The 5 Stages of the ML Lifecycle on Google Cloud',
            explanation: '1. Ingestion: Loading raw data via Cloud Storage or BigQuery.\n2. Preparation: Cleaning, labeling, and feature engineering via Dataprep or Vertex AI Feature Store.\n3. Training: Running distributed model training using Cloud TPUs or GPUs.\n4. Deployment: Hosting models on scalable serverless endpoints via Vertex AI Endpoints.\n5. Management: Continuous monitoring for data drift, latency, and throughput degradation.',
          },
        ],
      },
      {
        subtopicTitle: '3. Data Types: Structured vs Unstructured, Labeled vs Unlabeled',
        points: [
          {
            term: 'Structured Data',
            explanation: 'Highly organized tabular data adhering to strict relational schemas, data types, and primary/foreign keys (e.g., SQL tables, BigQuery datasets, CSV spreadsheets).',
            exampleOrDetail: 'Best Practice: Analyzed and modeled using SQL-based tools like BigQuery ML rather than raw text generation models.',
          },
          {
            term: 'Unstructured Data',
            explanation: 'Information lacking a predefined conceptual data model or tabular format (e.g., PDF contracts, call center voice recordings, customer emails, product photos, sensor logs).',
            exampleOrDetail: 'Represents over 80% of typical corporate data. This is the primary domain where Generative AI delivers transformational business value.',
          },
          {
            term: 'Data Quality Dimensions in AI',
            explanation: 'Completeness (no missing critical fields), Consistency (uniform formatting), Relevance (aligned with current business reality), Freshness (up-to-date), and Volume.',
            exampleOrDetail: 'In AI, data quality always trumps raw quantity. Training on clean, curated datasets yields dramatically fewer errors than training on massive, noisy corpora.',
          },
        ],
      },
      {
        subtopicTitle: '4. Foundation Models, Tokens & Context Windows',
        points: [
          {
            term: 'Foundation Models',
            explanation: 'Broad, large-scale deep learning models trained on vast multimodal datasets through self-supervised pre-training. They serve as a shared foundation that can be adapted to hundreds of business applications without training from scratch.',
          },
          {
            term: 'Tokens & Token Economics',
            explanation: 'The fundamental atomic units of natural language processed by language models. A token can be a single word, part of a word, or punctuation symbol (approximately 1 token ≈ 4 characters or 0.75 English words).',
            exampleOrDetail: 'API pricing across Google Cloud Vertex AI is billed on the exact volume of input and output tokens processed.',
          },
          {
            term: 'Context Window Size',
            explanation: 'The maximum total number of tokens (prompt context + historical conversation + retrieved documents + generated output) that a model can hold in its active memory for a single inference call.',
            exampleOrDetail: 'Google\'s Gemini 1.5 Pro features an industry-leading context window of up to 2,000,000 tokens—capable of ingesting 1 hour of video, 11 hours of audio, or over 700,000 words of documentation in one prompt.',
          },
        ],
      },
      {
        subtopicTitle: '5. Overcoming Model Limitations: Hallucinations & Drift',
        points: [
          {
            term: 'Hallucination',
            explanation: 'When a model produces fluent, grammatically sound assertions that are factually erroneous, ungrounded, or fabricated.',
            exampleOrDetail: 'Causes: The model is a next-token probability engine, not a verified factual database. Solutions: Grounding with enterprise data (RAG), Grounding with Google Search, lower temperature settings (0.0 to 0.2), and Human-in-the-Loop validation.',
          },
          {
            term: 'Knowledge Cutoff Date',
            explanation: 'A pre-trained foundation model only has internal knowledge up to the exact date its training dataset was gathered. It cannot answer questions about recent corporate policy updates or today\'s news without external grounding.',
          },
          {
            term: 'Data Drift vs Concept Drift',
            explanation: 'Data Drift occurs when the statistical distribution of input data changes over time. Concept Drift occurs when the underlying relationship between inputs and outputs changes.',
            exampleOrDetail: 'Mitigation on Google Cloud: Vertex AI Model Monitoring continuously monitors live inference traffic and alerts teams when drift exceeds predefined thresholds.',
          },
        ],
      },
    ],
    examFocusPoints: [
      'Understand the hierarchy: AI > ML > Deep Learning > Generative AI.',
      'Discriminative models classify; Generative models synthesize novel artifacts.',
      'Structured tabular SQL data is best handled by BigQuery ML; unstructured text/audio is handled by Vertex AI GenAI.',
      'Hallucinations cannot be solved by model size alone—they require Grounding and RAG.',
    ],
    officialDocLinks: [
      { title: 'Google Cloud: What is Artificial Intelligence?', url: 'https://cloud.google.com/learn/what-is-artificial-intelligence' },
      { title: 'Vertex AI Generative AI Overview', url: 'https://cloud.google.com/vertex-ai/generative-ai/docs/learn/overview' },
    ],
  },

  // MODULE 2: NAVIGATE THE CLOUD LANDSCAPE
  {
    id: 'course-2-landscape',
    courseTitle: 'Course 2: Navigate the Google Cloud Landscape',
    domainMapping: 'Domain 2: Google Cloud Offerings (~35%)',
    examWeight: '35% of Exam',
    estimatedReadTime: '18 mins',
    moduleOverview:
      'Explores the layers of Google Cloud\'s enterprise AI architecture: custom AI hardware (TPUs & GPUs), the Model Garden catalog (150+ models), Vertex AI Studio vs Google AI Studio, turn-key agent builders, and pre-built perceptual APIs.',
    subtopics: [
      {
        subtopicTitle: '1. AI-Optimized Infrastructure: TPUs & GPUs',
        points: [
          {
            term: 'Cloud TPUs (Tensor Processing Units)',
            explanation: 'Google\'s custom application-specific integrated circuits (ASICs) engineered specifically for machine learning matrix multiplication and linear algebra.',
            exampleOrDetail: 'Generations: TPU v4 (high performance), TPU v5e (optimized for cost-efficiency and inference scale), and TPU v5p (Google\'s most powerful accelerator for foundational model training).',
          },
          {
            term: 'NVIDIA GPUs on Google Cloud',
            explanation: 'Industry-standard graphics processing units (NVIDIA H100, A100, L4) available on Compute Engine and Google Kubernetes Engine (GKE) for customers with pre-existing CUDA codebases.',
          },
          {
            term: 'AI Hypercomputer Architecture',
            explanation: 'An integrated system design combining custom accelerator hardware, Jupiter petabit-scale networking fabric, high-throughput storage (Cloud Storage, Filestore), and open-source orchestration (GKE, Slurm, Ray).',
          },
        ],
      },
      {
        subtopicTitle: '2. Google\'s Model Families: Gemini, Gemma, Imagen & Veo',
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
            term: 'Imagen 3',
            explanation: 'Google\'s state-of-the-art text-to-image foundation model that generates photorealistic imagery with rich lighting, accurate typography, and integrated SynthID digital watermarking.',
          },
          {
            term: 'Veo',
            explanation: 'Google\'s generative video model capable of creating high-definition 1080p cinematic video clips with precise temporal consistency and simulated camera angles.',
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
            explanation: 'Google Cloud\'s enterprise development console for generative AI. Fully integrated with Google Cloud Platform (GCP) project governance, IAM permissions, private VPC endpoints, enterprise billing, and SLAs.',
            exampleOrDetail: 'Best For: Production deployment, enterprise compliance, fine-tuning, system instruction management, and multi-team collaboration.',
          },
          {
            term: 'Vertex AI Model Garden',
            explanation: 'A curated enterprise hub featuring over 150 foundational models:\n1. Google First-Party: Gemini, Imagen, Veo, Chirp, Codey.\n2. Open-Weight Models: Gemma, Llama 3, Mistral, Falcon, Stable Diffusion.\n3. Partner Models: Anthropic Claude, AI21 Labs.',
            exampleOrDetail: 'Allows deploying open models with one click as managed serverless endpoints without provisioning raw compute nodes manually.',
          },
        ],
      },
      {
        subtopicTitle: '4. Turn-Key Search & Pre-built Perception APIs',
        points: [
          {
            term: 'Vertex AI Agent Builder (Search & Conversation)',
            explanation: 'The lowest-code, fastest way to build enterprise generative search engines and multi-turn conversational bots grounded directly in internal company files.',
            exampleOrDetail: 'Connects directly to Cloud Storage, BigQuery, Salesforce, Jira, and websites with automated chunking, embeddings, and verifiable citations.',
          },
          {
            term: 'Document AI API',
            explanation: 'Specialized machine learning parsers trained specifically on forms, invoices, receipts, tax documents, and procurement orders with spatial table understanding.',
            exampleOrDetail: 'Rule: Use Document AI for complex invoices and structured PDF forms rather than raw, prompt-based LLM OCR.',
          },
          {
            term: 'Pre-Trained Perceptual APIs',
            explanation: '• Cloud Vision API: Image categorization, OCR, object recognition.\n• Speech-to-Text & Text-to-Speech: Real-time audio streaming transcription and neural voice generation.\n• Translation API: Neural machine translation across 100+ languages.',
          },
        ],
      },
    ],
    examFocusPoints: [
      'Gemini = Managed API only (closed weights). Gemma = Open weights (downloadable, self-hostable).',
      'Google AI Studio = Fast developer web prototyping. Vertex AI Studio = Enterprise GCP production with IAM.',
      'Agent Builder is the fastest out-of-the-box solution for enterprise search over internal documents.',
      'Model Garden offers Google, Open Source (Llama, Mistral), and Partner models (Claude).',
    ],
    officialDocLinks: [
      { title: 'Vertex AI Model Garden', url: 'https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform' },
      { title: 'Google Cloud AI Hypercomputer', url: 'https://cloud.google.com/solutions/ai-hypercomputer' },
    ],
  },

  // MODULE 3: BEYOND THE CHATBOT
  {
    id: 'course-3-techniques',
    courseTitle: 'Course 3: Beyond the Chatbot (Techniques to Improve Output)',
    domainMapping: 'Domain 3: Output Techniques (~20%)',
    examWeight: '20% of Exam',
    estimatedReadTime: '20 mins',
    moduleOverview:
      'Focuses on practical methodologies to steer and optimize foundation model outputs. Deep dives into prompt engineering, grounding with Google Search and internal documents, Retrieval-Augmented Generation (RAG), sampling controls, and fine-tuning trade-offs.',
    subtopics: [
      {
        subtopicTitle: '1. Prompt Engineering & In-Context Learning',
        points: [
          {
            term: 'Zero-Shot Prompting',
            explanation: 'Presenting a task instruction to the model without providing any reference examples of completed input-output pairs.',
            exampleOrDetail: 'Example: "Summarize the following customer feedback in 2 bullet points: [text]"',
          },
          {
            term: 'Few-Shot Prompting',
            explanation: 'Including 2 to 5 curated input-output demonstration pairs directly inside the prompt context before posing the actual request.',
            exampleOrDetail: 'The most cost-effective method to teach the model custom output schemas (like specific JSON keys or unique corporate formatting) without altering weights.',
          },
          {
            term: 'Role / Persona Prompting',
            explanation: 'Instructing the model to adopt a specific professional framing (e.g. "You are an enterprise cloud security architect...").',
            exampleOrDetail: 'Helps focus the model\'s attention on domain-specific vocabulary and appropriate depth of explanation.',
          },
          {
            term: 'Chain-of-Thought (CoT) Prompting',
            explanation: 'Explicitly instructing the model to generate intermediate reasoning steps before arriving at a final conclusion ("Let\'s break this down step-by-step").',
            exampleOrDetail: 'Crucial for multi-step arithmetic, logic analysis, and complex business scenario evaluations.',
          },
          {
            term: 'Prompt Chaining & ReAct Framework',
            explanation: 'Prompt Chaining splits large tasks into sequential sub-tasks. The ReAct (Reason + Act) framework alternates between internal reasoning and invoking external tools/APIs to accomplish tasks.',
          },
        ],
      },
      {
        subtopicTitle: '2. Grounding & Retrieval-Augmented Generation (RAG)',
        points: [
          {
            term: 'Grounding',
            explanation: 'The process of connecting foundation model outputs to verifiable, authoritative external information sources to drastically reduce hallucinations and ensure factual accuracy.',
          },
          {
            term: 'Grounding with Google Search',
            explanation: 'An out-of-the-box feature in Vertex AI that allows Gemini to query Google Search for real-time web facts, breaking news, and up-to-date public data.',
            exampleOrDetail: 'Includes direct web citations and search snippets alongside the generated response.',
          },
          {
            term: 'RAG (Retrieval-Augmented Generation)',
            explanation: 'The standard architectural pattern for querying private enterprise knowledge:\n1. Ingestion & Chunking: Splitting enterprise documents into semantic blocks.\n2. Vector Embeddings: Converting text into mathematical vectors via an embedding model (e.g., text-embedding-004).\n3. Vector Search: Matching the user query to the most semantically relevant document chunks.\n4. Augmented Generation: Injecting the retrieved chunks into the prompt context for the LLM to synthesize.',
            exampleOrDetail: 'Key Rule: RAG modifies only the runtime prompt context in memory; it does NOT modify or retrain model weights.',
          },
        ],
      },
      {
        subtopicTitle: '3. Sampling Parameters: Controlling Randomness & Entropy',
        points: [
          {
            term: 'Temperature (0.0 to 2.0)',
            explanation: 'Controls the randomness of the model\'s next-token selection:\n• Low Temperature (0.0 - 0.2): Probability distribution is sharpened. Model chooses the highest-probability tokens. Ideal for code generation, mathematical analysis, and factual extraction.\n• Moderate Temperature (0.5 - 0.7): Balanced creativity and coherence for customer service and general summarization.\n• High Temperature (0.8 - 1.5+): Flattens probability distribution, introducing rare token choices. Ideal for creative brainstorming and advertising hooks.',
          },
          {
            term: 'Top-P (Nucleus Sampling)',
            explanation: 'Dynamically truncates the candidate vocabulary to the smallest set of tokens whose cumulative probability equals or exceeds threshold P (e.g. 0.95).',
            exampleOrDetail: 'Adapts candidate pool size on the fly: Narrow pool when confident, wider pool when uncertainty is high.',
          },
          {
            term: 'Top-K Sampling',
            explanation: 'Strictly limits token selection to the top K most likely words (e.g. K=40), regardless of cumulative probability percentage.',
          },
          {
            term: 'Max Output Tokens & Stop Sequences',
            explanation: 'Max tokens enforces a hard ceiling on generation length. Stop sequences (e.g. "\n\n", "END") trigger immediate termination to prevent formatting run-ons.',
          },
        ],
      },
      {
        subtopicTitle: '4. Model Customization: Prompting vs RAG vs Fine-Tuning',
        points: [
          {
            term: 'When to Use Prompt Engineering',
            explanation: 'Use for 80% of business tasks where prompt instructions and few-shot examples can guide tone, format, and behavior without infrastructure overhead.',
          },
          {
            term: 'When to Use Grounding / RAG',
            explanation: 'Use whenever you need the model to answer questions based on internal, private, or frequently updating corporate documents (HR policies, manuals, product catalogs).',
          },
          {
            term: 'When to Use Fine-Tuning (SFT / PEFT / LoRA)',
            explanation: 'Use ONLY when you need to teach a highly specialized domain style, niche code syntax, or proprietary terminology that cannot fit inside a prompt context.',
            exampleOrDetail: 'PEFT (Parameter-Efficient Fine-Tuning) and LoRA freeze the base model and train small adapter layers, reducing compute requirements by >80%.',
          },
        ],
      },
    ],
    examFocusPoints: [
      'Golden Rule: Teach facts with RAG; teach style/format with Fine-Tuning.',
      'Low Temperature (0.0 to 0.2) = Factual, deterministic, code, math. High Temp = Creative.',
      'Few-shot prompting is the lowest-cost way to enforce structured output formatting.',
      'Grounding with Google Search connects models to real-time world knowledge.',
    ],
    officialDocLinks: [
      { title: 'Prompt Design Strategies', url: 'https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/prompt-design-strategies' },
      { title: 'Vertex AI Grounding Overview', url: 'https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview' },
    ],
  },

  // MODULE 4: GEN AI APPS - TRANSFORM YOUR WORK
  {
    id: 'course-4-work',
    courseTitle: 'Course 4: Gen AI Apps (Transform Your Work)',
    domainMapping: 'Domain 2: Google Cloud Offerings (~35%)',
    examWeight: '35% of Exam (Applications)',
    estimatedReadTime: '12 mins',
    moduleOverview:
      'Explores end-user productivity tools powered by generative AI: Gemini for Google Workspace, NotebookLM research assistant, Gemini Code Assist, and the fundamental data privacy guarantees Google provides enterprise customers.',
    subtopics: [
      {
        subtopicTitle: '1. Gemini for Google Workspace',
        points: [
          {
            term: 'Help Me Write (Docs & Gmail)',
            explanation: 'Generates email drafts, customer proposals, executive briefings, and meeting agendas directly inside Google Docs and Gmail.',
          },
          {
            term: 'Help Me Organize (Google Sheets)',
            explanation: 'Automatically constructs custom project trackers, event schedules, task management tables, and budget templates based on plain-language prompts.',
          },
          {
            term: 'Help Me Visualize (Google Slides & Meet)',
            explanation: 'Generates unique studio-quality imagery and custom presentation visuals in Slides; generates custom studio background environments in Google Meet.',
          },
          {
            term: 'Enterprise Data Protection in Workspace',
            explanation: 'Google Cloud contractually guarantees that customer Workspace data, prompts, and attachments are encrypted, kept in tenant isolation, and NEVER used to train public foundation models.',
            exampleOrDetail: 'Crucial for compliance: Enterprise employees can safely process confidential memos and internal communications without data leakage concerns.',
          },
        ],
      },
      {
        subtopicTitle: '2. NotebookLM: Personalized AI Research Assistant',
        points: [
          {
            term: 'What is NotebookLM?',
            explanation: 'An AI-powered personalized notebook and research assistant developed by Google that is strictly grounded in the specific source materials uploaded by the user.',
            exampleOrDetail: 'Accepts Google Docs, PDFs, web URLs, and pasted notes. Responses automatically include clickable citation numbers linking directly to quotes in your source text.',
          },
          {
            term: 'Key Capabilities',
            explanation: 'Summarizes dense research papers, synthesizes cross-document insights, creates study guides and FAQs, and generates Audio Overviews (conversational podcast-style deep dives).',
          },
        ],
      },
      {
        subtopicTitle: '3. Gemini Code Assist',
        points: [
          {
            term: 'Developer Productivity Companion',
            explanation: 'An enterprise coding assistant that integrates natively into popular IDEs (VS Code, IntelliJ, PyCharm, Google Cloud Workstations).',
            exampleOrDetail: 'Capabilities: Context-aware code completion, natural-language code explanation, automated unit test generation, security vulnerability scanning, and legacy code refactoring.',
          },
          {
            term: 'Private Codebase Customization',
            explanation: 'Can be connected to an enterprise\'s private repositories (GitHub, GitLab, Bitbucket) so generated code conforms strictly to internal libraries, APIs, and company design standards.',
          },
        ],
      },
    ],
    examFocusPoints: [
      'Customer Workspace emails and documents are NEVER used to train public Google models.',
      'NotebookLM grounds responses solely on uploaded user source materials.',
      'Gemini Code Assist supports enterprise codebase awareness while preserving intellectual property.',
    ],
    officialDocLinks: [
      { title: 'Gemini for Google Workspace', url: 'https://cloud.google.com/gemini-for-workspace' },
      { title: 'NotebookLM Overview', url: 'https://notebooklm.google/' },
    ],
  },

  // MODULE 5: GEN AI AGENTS & STRATEGY
  {
    id: 'course-5-organization',
    courseTitle: 'Course 5: Gen AI Agents & Enterprise Strategy',
    domainMapping: 'Domain 4: Business Strategy (~15%)',
    examWeight: '15% of Exam',
    estimatedReadTime: '16 mins',
    moduleOverview:
      'Guides leaders through the transition from simple chatbots to autonomous goal-driven agents. Covers Google Cloud Customer Engagement Suite (CCAI), the Secure AI Framework (SAIF), Google\'s 7 AI Principles & Prohibited Uses, and measuring business ROI.',
    subtopics: [
      {
        subtopicTitle: '1. Autonomous AI Agents vs Conversational Chatbots',
        points: [
          {
            term: 'From Passive Chatbot to Active Agent',
            explanation: 'A traditional chatbot simply answers questions with static text. An AI Agent is goal-driven: it evaluates objectives, reasons across multiple steps, invokes external tools/APIs, queries databases, and takes real-world actions in enterprise systems.',
            exampleOrDetail: 'Example: An agent that not only explains the return policy, but authenticates the user, verifies order delivery date in BigQuery, creates a return label via shipping API, and initiates a refund.',
          },
          {
            term: 'Agent Tooling Components',
            explanation: '• Extensions / Function Calling: Enabling the model to execute REST APIs and databases.\n• Data Stores: Connectors to enterprise vector indexes.\n• Guardrails: Deterministic safety policies that prevent unauthorized transactions.',
          },
        ],
      },
      {
        subtopicTitle: '2. Google Customer Engagement Suite (CCAI)',
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
            explanation: 'Applies conversational analytics across thousands of recorded customer calls to identify customer sentiment, trending complaints, and compliance infractions.',
          },
        ],
      },
      {
        subtopicTitle: '3. Google Secure AI Framework (SAIF)',
        points: [
          {
            term: 'What is SAIF?',
            explanation: 'A practical conceptual framework introduced by Google to secure generative AI systems against novel adversarial threats like prompt injection, model theft, data poisoning, and training data extraction.',
          },
          {
            term: 'The 6 SAIF Core Pillars',
            explanation: '1. Expand strong security foundations to the AI ecosystem (IAM least privilege, VPC perimeters, encryption).\n2. Extend detection and response to bring AI into the threat universe (log monitoring for prompt injections).\n3. Automate defenses to keep pace with threats (automated incident containment).\n4. Harmonize platform-level controls (uniform guardrails across models).\n5. Adapt controls to adjust mitigations (continuous monitoring of output drift).\n6. Contextualize AI system risks in business processes (calibrating security depth to business criticality).',
          },
        ],
      },
      {
        subtopicTitle: '4. Responsible AI & Google\'s Ethical Commitments',
        points: [
          {
            term: 'Google\'s 7 AI Principles',
            explanation: '1) Be socially beneficial, 2) Avoid creating or reinforcing unfair bias, 3) Be built and tested for safety, 4) Be accountable to people, 5) Incorporate privacy design principles, 6) Uphold high standards of scientific excellence, 7) Be made available for uses that accord with these principles.',
          },
          {
            term: 'Google\'s 4 Explicitly Prohibited AI Applications',
            explanation: 'Google strictly prohibits designing or deploying AI in:\n1. Weapons or technologies whose principal purpose is to cause bodily injury.\n2. Technologies that cause or are likely to cause overall harm.\n3. Technologies that gather information for surveillance violating internationally accepted norms.\n4. Technologies whose purpose contravenes international law and human rights.',
            exampleOrDetail: 'Important Exam Fact: Google Cloud will never build or license autonomous weapons systems or unlawful surveillance tools.',
          },
          {
            term: 'Human-in-the-Loop (HITL)',
            explanation: 'A governance safeguard requiring human review and approval before finalized decisions are executed in high-stakes domains (healthcare diagnoses, loan underwriting, legal filings).',
          },
        ],
      },
      {
        subtopicTitle: '5. ROI, Unit Economics & Context Caching',
        points: [
          {
            term: 'Use Case Prioritization Matrix (Value vs Feasibility)',
            explanation: 'Start with Quick Wins (high business value, high technical feasibility) such as internal search or meeting summarization to prove early ROI before tackling high-risk strategic bets.',
          },
          {
            term: 'Context Caching on Vertex AI',
            explanation: 'Caches frequently queried large context blocks (e.g. 500-page policy PDFs or large code repositories) in active GPU memory.',
            exampleOrDetail: 'Reduces recurring input token costs by up to 75% and slashes query response latency.',
          },
        ],
      },
    ],
    examFocusPoints: [
      'Know the 6 Pillars of SAIF: Secure foundations, Detection/Response, Automate, Harmonize, Adapt, Contextualize.',
      'Agent Assist supports human call center agents; Conversational Agents talk to customers.',
      'Google explicitly prohibits weaponized AI and surveillance violating human rights.',
      'Context Caching delivers up to 75% cost savings for repeated large prompt contexts.',
    ],
    officialDocLinks: [
      { title: 'Google Secure AI Framework (SAIF)', url: 'https://cloud.google.com/security/ai-framework' },
      { title: 'Google AI Principles', url: 'https://ai.google/principles/' },
      { title: 'Vertex AI Context Caching', url: 'https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-overview' },
    ],
  },
];
