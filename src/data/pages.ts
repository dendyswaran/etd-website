export const pages = [
  {
    slug: 'solusi-ai',
    kind: 'Services',
    title: 'AI solutions & automation for businesses in Indonesia',
    description:
      'AI agents, model adaptation, speech-to-text, and workflow integration. Discuss your goals and data readiness with East Town Digital.',
    lead: 'East Town Digital helps businesses in Indonesia apply AI to everyday work. From conversation analysis and service evaluation to workflow automation, we connect AI capabilities with the applications, data, and processes your team already uses.',
    sections: [
      {
        heading: 'AI agents and agent harnesses',
        text: 'Our team uses a range of agent harnesses in software development. A harness manages context, instructions, tool access, and the steps an agent follows. For business applications, this approach can support AI-assisted workflows connected to your systems. Permissions, action limits, testing, and human approval points are defined around the work involved.',
      },
      {
        heading: 'AI training based on goals and data readiness',
        text: 'AI training starts with a goal, sample data, and a way to measure results. We discuss data preparation, knowledge organization, evaluation, and configuration to fit your business context. The choice between prompting, knowledge retrieval, and model training such as fine-tuning follows a review of data and feasibility. Adding documents to a knowledge base is not the same as retraining a model.',
      },
      {
        heading: 'Speech-to-text and conversation analysis',
        text: 'Recorded conversations can support transcription, speaker role identification, rubric-based evaluation, and coaching. Our development experience covers audio-to-transcript workflows, AI evaluation grounded in reference knowledge, result review, and report exports. Audio quality, language, specialist terminology, and privacy requirements are part of the discussion.',
      },
      {
        heading: 'Start with one workflow you can evaluate',
        text: 'Tell us which task you want AI to help with, which applications you use, and what data is available and permitted for processing. We discuss initial scope, evaluation examples, model service costs, integration, and human oversight. AI results need testing against representative examples. Accuracy targets and operational benefits should be agreed around your needs, without assuming every automated result will be correct.',
      },
    ],
    related: [
      'studi-kasus/ai-quality-assurance',
      'integrasi-sistem',
      'software-custom',
    ],
  },
  {
    slug: 'studi-kasus/ai-quality-assurance',
    kind: 'Case studies',
    title: 'AI quality assurance: from recordings to service evaluation',
    description:
      'Experience building an AI-assisted QA workflow with speech-to-text, rubric-based evaluation, coaching notes, reviewer corrections, and reporting.',
    lead: 'Recorded conversations provide useful context for reviewing service quality. Our development experience includes a system that turns audio into transcripts and structured evaluations, while allowing reviewers to check and correct results. This summary does not disclose client identities or conversation data.',
    sections: [
      {
        heading: 'From audio to reviewable transcripts',
        text: 'The workflow starts with recording uploads, speech-to-text transcription, and speaker role identification. Audio feature extraction adds information for evaluation. Processing runs through a queue with job status and failure handling, so the team can follow each stage without carrying out every step manually.',
      },
      {
        heading: 'Evaluation grounded in rubrics and reference knowledge',
        text: 'The AI evaluator uses transcripts, assessment rubrics, and product and procedure knowledge as references. Outputs include structured assessments, evidence from the conversation, and coaching notes. The system recalculates final scores using rubric weights. This separates AI interpretation from score calculation and makes the reasoning behind an assessment easier to inspect.',
      },
      {
        heading: 'Reviewers retain the final decision',
        text: 'Reviewers can inspect and correct assessments with notes, after which the system recalculates the results. Corrections can inform subsequent evaluations as examples and context; this does not imply model retraining. Processing history supports traceability, while report exports help the team summarize and discuss results.',
      },
      {
        heading: 'Lessons for your business',
        text: 'A workflow like this needs clear quality definitions, human assessment examples, and testing against representative recordings. Access to recordings, processing permission, storage, and the AI services involved should be discussed early. Each business has different requirements. This experience informs scope and evaluation discussions, rather than guaranteeing a particular accuracy or savings figure.',
      },
    ],
    related: ['solusi-ai', 'integrasi-sistem', 'software-custom'],
  },
  {
    slug: 'jasa-pembuatan-website',
    kind: 'Services',
    title: 'Website development for businesses in Indonesia',
    description:
      'Company websites and content management tailored to your business. Discuss content structure, website management, and integration with East Town Digital.',
    lead: 'A useful website helps potential customers understand your business and find their next step. East Town Digital helps plan company websites, product pages, and content management around the needs of your team.',
    sections: [
      {
        heading: 'Start with the visitor’s goal',
        text: 'Do visitors need to understand your services, explore project experience, or contact your sales team? That goal shapes the page structure, information, and contact path. We work with you to identify your audience and the questions they need answered before deciding to get in touch.',
      },
      {
        heading: 'Content your team can manage',
        text: 'If articles, services, or company information change regularly, a CMS may be part of the project. Our development experience includes article management, drafts, publishing, and website content editing. Permissions and approval processes should reflect how your team works, rather than simply adding an admin panel.',
      },
      {
        heading: 'Scope and integration',
        text: 'For the initial discussion, prepare your brand identity, service list, approved photography, and examples of websites you like. If the site needs to connect to other applications, explain the data sources and who manages them. Forms, languages, content migration, and maintenance are scope decisions that can affect the estimate.',
      },
      {
        heading: 'How to get started',
        text: 'You do not need a complete technical specification. Share your business goals and current website challenges through WhatsApp. We can discuss priority pages, materials to prepare, and possible approaches. Costs and schedules can be assessed once the requirements and boundaries of the work are understood.',
      },
    ],
    related: [
      'software-custom',
      'studi-kasus/pos-reservasi-salon',
      'artikel/biaya-software-custom',
    ],
  },
  {
    slug: 'software-custom',
    kind: 'Services',
    title: 'Custom software & business applications',
    description:
      'Custom software for transactions, inventory, reservations, queues, and business monitoring. Discuss your operational needs with East Town Digital.',
    lead: 'Custom software addresses needs that off-the-shelf applications do not adequately cover. The aim is to align the system with your business processes, users, and the data rules you actually need.',
    sections: [
      {
        heading: 'Identify the process that needs support',
        text: 'Start with one process, such as recording transactions, managing reservations, or reporting project expenses. Explain who enters data, who approves it, and what information supports decisions. Sample documents and workflows help identify the problem before committing to a long feature list.',
      },
      {
        heading: 'Relevant operational experience',
        text: 'Our development experience includes salon POS and reservations, service queue systems, and financial and project monitoring. This work covers user roles, transaction records, summaries, and report exports. These examples show the kinds of needs we can discuss, rather than a feature package that automatically fits every business.',
      },
      {
        heading: 'Define the boundaries early',
        text: 'Permissions, transaction states, data corrections, and reporting requirements need a shared definition. Legacy system integration and spreadsheet migration involve separate work. Begin with the most important workflow, then review further requirements based on actual use. Testing, acceptance, deployment, and maintenance are also part of the project discussion.',
      },
      {
        heading: 'When custom software makes sense',
        text: 'Consider custom software when a critical process needs specific rules, involves several roles, or creates repeated data entry. Off-the-shelf applications may be enough for simpler needs. Share your situation so the discussion starts with value and scope, rather than assuming every process needs to be rebuilt.',
      },
    ],
    related: [
      'studi-kasus/sistem-antrean',
      'studi-kasus/monitoring-keuangan-proyek',
      'artikel/kapan-beralih-dari-excel',
    ],
  },
  {
    slug: 'aplikasi-mobile',
    kind: 'Services',
    title: 'Mobile applications for teams & customers',
    description:
      'Discuss mobile applications, mobile web, and PWAs for customers or field operations with East Town Digital. Choose an approach around user needs.',
    lead: 'Work does not always happen at a desk. Mobile applications help people access the workflows they need from the devices they carry, with layouts and interactions designed for smaller screens.',
    sections: [
      {
        heading: 'Choose an approach around the work',
        text: 'Native applications, mobile websites, and Progressive Web Apps (PWAs) have different characteristics. Camera access, distribution, internet connectivity, and user devices need to be mapped before choosing an approach. Not every project needs an app store release, and not every device requirement can be met through a browser alone.',
      },
      {
        heading: 'Mobile web and PWA experience',
        text: 'One example of our development work is a mobile interface for recording project expenses and uploading receipts. The workflow connects field activity with desktop monitoring. Capabilities such as camera access and PWA installation still need testing on target devices and browsers, as support varies across platforms.',
      },
      {
        heading: 'Consider the workflow, not just screen size',
        text: 'Long forms, file uploads, data confirmation, and error messages should be designed for real usage conditions. Discuss who will use the system, whether devices are company-owned or personal, and how other teams use the data. Offline use must be an explicit requirement rather than an assumed capability.',
      },
      {
        heading: 'Prepare for an initial discussion',
        text: 'Bring examples of tasks people will perform on their phones, the devices they use, and the systems to connect. We can discuss feature priorities, platforms, integration, and testing. Estimates follow the agreed scope, including distribution, account management, and maintenance after implementation.',
      },
    ],
    related: [
      'studi-kasus/monitoring-keuangan-proyek',
      'integrasi-sistem',
      'artikel/biaya-software-custom',
    ],
  },
  {
    slug: 'integrasi-sistem',
    kind: 'Services',
    title: 'API, database & business system integration',
    description:
      'Connect applications, databases, and operational workflows through integration tailored to your needs. Discuss your APIs and data sources with East Town Digital.',
    lead: 'The same data is often entered again in several applications. System integration connects these processes and data sources, with clear rules for ownership, updates, and error handling.',
    sections: [
      {
        heading: 'Map data sources and destinations',
        text: 'Identify the application that holds the primary record, the data to transfer, and when updates are needed. Integration may involve APIs, file imports, or approved data connections. Documentation and permission from system owners must be confirmed before choosing a solution and preparing an estimate.',
      },
      {
        heading: 'Business rules remain central',
        text: 'Connecting two systems involves more than sending data. Transaction identifiers, date formats, payment states, permissions, and duplicate handling need to be understood. Define what should happen when a connection fails or data is rejected. These decisions help the team trace errors and avoid confusing updates.',
      },
      {
        heading: 'Examples of needs we can discuss',
        text: 'Our business application experience includes transaction and inventory records, spreadsheet imports, and operational summary exports. Your project may involve different data sources or devices. Integration with a particular service can only be confirmed after reviewing its interfaces, usage limits, and required access.',
      },
      {
        heading: 'What to prepare',
        text: 'Prepare a list of applications, anonymized sample data, API documentation if available, and an explanation of the processes to connect. Do not send production credentials for an initial discussion. Start with the integration goal, data owners, and current challenges so we can discuss an approach with a clear scope.',
      },
    ],
    related: [
      'software-custom',
      'studi-kasus/monitoring-keuangan-proyek',
      'artikel/kapan-beralih-dari-excel',
    ],
  },
  {
    slug: 'studi-kasus/pos-reservasi-salon',
    kind: 'Case studies',
    title: 'Salon POS & reservation system development',
    description:
      'An anonymous summary of salon POS development experience: reservation calendars, staff roles, checkout, and receipt printing.',
    lead: 'This summary describes the scope of a previous implementation. Customer identities, operational data, and internal access details are omitted. It makes no claims about revenue or efficiency improvements without measurement.',
    sections: [
      {
        heading: 'The operational needs',
        text: 'Salon operations bring together booking times, staff availability, selected services, and payments. The system needs to support the move from reservation to checkout while retaining transaction context. Staff roles also need to be distinguished so views and actions match each person’s responsibilities.',
      },
      {
        heading: 'Development scope',
        text: 'The implementation covers a booking calendar, staff role management, checkout, and receipt printing. Printing support involves several device approaches, so the method needs to suit the operating environment. A feature in one implementation does not imply automatic compatibility with every printer or device.',
      },
      {
        heading: 'What to consider',
        text: 'Before developing a similar system, map how reservations arrive, scheduling change rules, checkout, and the devices used at the counter. Branch differences, permissions, and reporting needs can change the scope. Testing real workflows and hardware is an important part of implementation planning.',
      },
      {
        heading: 'Relevance to your business',
        text: 'This example is relevant when reservations and transactions need a connected workflow. Your salon may have simpler or more complex needs. Discuss your current situation and priorities through WhatsApp. Start with the process that causes the most friction, rather than copying every feature from another project.',
      },
    ],
    related: [
      'software-custom',
      'jasa-pembuatan-website',
      'artikel/biaya-software-custom',
    ],
  },
  {
    slug: 'studi-kasus/sistem-antrean',
    kind: 'Case studies',
    title: 'Service queue system development',
    description:
      'An anonymous summary of queue system development: ticket numbers, operator calls, information displays, and service reports.',
    lead: 'A queue system needs more than a number display. This development experience covers the relationship between ticket issuance, operator actions, visitor information, and service reporting. The summary omits customer identities and internal data.',
    sections: [
      {
        heading: 'Connected workflows',
        text: 'Visitors take a number, operators call the queue, and displays show relevant information. Everyone involved needs to understand status changes. Service categories, repeat calls, and daily resets should be defined before development so the workflow reflects actual operations.',
      },
      {
        heading: 'Implementation scope',
        text: 'Development covers number issuance, operator queue calls, displays, summaries, and report exports. It also includes ticket printing and display content management. Hardware integration and report formats are tailored to the implementation, making the installation environment part of the review.',
      },
      {
        heading: 'Lessons for similar projects',
        text: 'Counter layouts, devices, ticket formats, and reporting requirements affect system design. Teams also need a way to handle missed turns and operational corrections. Simulating the workflow with users helps uncover requirements that screen designs alone may miss.',
      },
      {
        heading: 'Discussing your service needs',
        text: 'If you want to organize your queue workflow, prepare an overview of the service location, service categories, available devices, and reporting examples. This information helps define the work. This summary demonstrates implementation experience; waiting-time or visitor-satisfaction results are not presented as measured outcomes.',
      },
    ],
    related: [
      'software-custom',
      'integrasi-sistem',
      'artikel/kapan-beralih-dari-excel',
    ],
  },
  {
    slug: 'studi-kasus/monitoring-keuangan-proyek',
    kind: 'Case studies',
    title: 'Financial & project monitoring development',
    description:
      'An anonymous summary of a project monitoring application: budgets, payment milestones, expenses, receipts, and mobile web access.',
    lead: 'When expenses are recorded in the field while budgets are monitored in the office, the system needs to connect each transaction with its project. This summary focuses on development scope without disclosing contract values, customers, or internal financial data.',
    sections: [
      {
        heading: 'Monitoring needs',
        text: 'Project managers need to compare budgets, payment milestones, and expenses. Field users need a way to record receipts without relying on a desktop interface. These different roles inform the user experience.',
      },
      {
        heading: 'What was developed',
        text: 'The implementation covers project and budget information, payment milestones, expenses, receipt galleries, and a monitoring dashboard. Mobile web and PWA interfaces support receipt uploads and expense confirmation. Change history and user roles are part of application data management.',
      },
      {
        heading: 'Preserving data context',
        text: 'Dashboard figures are useful only when the source and status of transactions are clear. Relationships between projects, expenses, receipts, and users need to be designed early. Correction rules, export formats, and data import requirements should follow the processes of the organization using the system.',
      },
      {
        heading: 'Assessing your business needs',
        text: 'If your team combines summaries from many spreadsheets, start by mapping the most important data and who owns it. Not every requirement needs to be developed at once. This example does not claim specific cost savings. The benefits of a new project need to be defined and measured against an agreed starting point.',
      },
    ],
    related: ['software-custom', 'aplikasi-mobile', 'integrasi-sistem'],
  },
  {
    slug: 'artikel/biaya-software-custom',
    kind: 'Guides',
    title: 'What determines the cost of custom software?',
    description:
      'Understand custom software cost factors: workflows, features, integration, data migration, testing, and maintenance before requesting an estimate.',
    lead: 'Cost questions are easier to answer once the project requirements are understood. Two applications that look similar can involve different work because their business rules, integrations, and initial data quality differ.',
    sections: [
      {
        heading: 'Scope matters more than screen count',
        text: 'A single checkout screen may involve calculations, permissions, transaction states, corrections, and printing. An estimate should therefore cover user actions and the rules behind them. Separate launch requirements from needs that can be reviewed after the system is in use.',
      },
      {
        heading: 'Integration and migration involve separate work',
        text: 'A documented API differs from a system that only offers file exports. Spreadsheet migration may require column mapping, data cleaning, and result checks. Explain the data sources, available access, and who can confirm accuracy when requesting an estimate.',
      },
      {
        heading: 'Include testing and operations',
        text: 'Discuss target devices, deployment environments, user testing, documentation, and handover. Ask about maintenance boundaries too: feature changes, issue resolution, and infrastructure management are not always included in the same scope. A clear proposal explains what will be delivered and how the work will be accepted.',
      },
      {
        heading: 'How to prepare an estimate request',
        text: 'Describe your business goal, main users, current workflow, required integrations, and target timeline if available. Include anonymized sample data. You can discuss these needs with East Town Digital through WhatsApp. This guide does not set a price range because an estimate should follow a reviewed project scope.',
      },
    ],
    related: ['software-custom', 'jasa-pembuatan-website', 'integrasi-sistem'],
  },
  {
    slug: 'artikel/kapan-beralih-dari-excel',
    kind: 'Guides',
    title: 'When should your business move from Excel to an application?',
    description:
      'Recognize when spreadsheets make collaboration, permissions, change tracking, and operational reporting difficult enough to consider a business application.',
    lead: 'Spreadsheets remain useful for many tasks. Moving to an application becomes worth considering when sharing, updating, and checking data starts to hinder important business processes.',
    sections: [
      {
        heading: 'Look for recurring problems',
        text: 'Does your team struggle to identify the correct report version? Is data entered again in several files? Does only one person understand critical formulas? Record actual incidents and the processes they affect. This list is more useful for defining requirements than deciding immediately that every spreadsheet must be replaced.',
      },
      {
        heading: 'Permissions and change history',
        text: 'When several roles share data, clarify who can view, edit, or approve it. An application can support these needs, but the organization still has to agree on the rules. Change history also requires decisions about which actions to record and who may review them.',
      },
      {
        heading: 'Start with one measurable process',
        text: 'Choose a process with a clear data source and owner, such as project expense records or inventory transactions. Agree on measures of success with the team before implementation. Map and check the initial data so the move does not simply transfer inconsistencies from old files into a new application.',
      },
      {
        heading: 'Plan the transition',
        text: 'Discuss import and export formats, data validation, user training, and how to check results before retiring the old system. Improving a spreadsheet or using an off-the-shelf application may be enough for some businesses. If custom workflows or integration are needed, discuss custom software development around the problems already identified.',
      },
    ],
    related: [
      'software-custom',
      'integrasi-sistem',
      'studi-kasus/monitoring-keuangan-proyek',
    ],
  },
];
