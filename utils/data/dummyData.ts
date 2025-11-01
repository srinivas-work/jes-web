import {
  PortalCardType,
  ProjectItemType,
  SecurityItemType,
  ServiceItemType,
  SolutionType,
  TestimonialCardProps,
} from "../types";

const serviceSections: ServiceItemType[] = [
  {
    title: "Quantity Take Off",
    image: "/img/services/qto.png",
    description:
      "Our team of skilled engineers provide reliable take-off services for construction projects across all fields including Civil, MEP systems and general purpose buildings using advanced software like Bluebeam, Planswift, and OnScreen takeoff to meticulously measure quantities from floor plans which are compiled into comprehensive, accurately organized reports as per your requirements.",
    subServices: [
      {
        title: "Specialized Quantity Surveying",
        desc: [
          "Accurate measurement and estimation of quantities for construction projects in diverse fields like civil, MEP, etc.",
        ],
      },
      {
        title: "Software-Aided QTO",
        desc: [
          "Utilization of advanced software tools like Bluebeam, Planswift, or specialized QTO software for precise calculations and project evaluation.",
        ],
      },
      {
        title: "Customized Reports & Documentation",
        desc: [
          "Preparation of comprehensive reports outlining the measured quantities, including breakdowns.",
          "Customized documentation catering to the specific needs of clients or projects.",
        ],
      },
      {
        title: "Consultancy and Project Support",
        desc: [
          "Support throughout the project lifecycle, from initial estimation to final execution.",
        ],
      },
      {
        title: "Quality Assurance and Compliance",
        desc: [
          "Ensuring compliance with industry standards, regulations, and best practices during the quantity estimation process.",
          "Quality checks to maintain accuracy and reliability of the quantity take-off data.",
        ],
      },
      {
        title: "Domain-specific QTO Services",
        desc: [
          "Tailoring QTO services to different industries like real estate, infrastructure, manufacturing, etc., based on their unique requirements and standards.",
        ],
      },
    ],
    extraDetails: [
      {
        title: "JESi Customer Portal",
        description:
          "Using JESi, our all-in-one project management portal designed to elevate collaboration and streamline project workflows. With our user-friendly interface, clients can effortlessly upload project files, ensuring seamless communication and file sharing.",
        services: [
          {
            title: "Effortless File Uploads",
            desc: "Our platform allows clients to upload project files with ease, eliminating the hassle of traditional methods. Effortlessly share documents, plans, and specifications to keep everyone on the same page.",
          },
          {
            title: "Live Chat for Instant Clarity",
            desc: "Need immediate clarification? Our live chat feature enables real-time communication between clients and our team of engineers. Instantly address queries, seek clarifications, and discuss project specifics without delays.",
          },
          {
            title: "Real-time Project Status Updates",
            desc: "Stay informed about project progress at all times. Our portal provides real-time status updates, ensuring transparency and allowing clients to track milestones, deadlines, and developments effortlessly.",
          },
          {
            title: "Transparent Communication Tracking",
            desc: "Keep an eye on the communication history between clients and our engineers. Monitor the activity log to review discussions, decisions, and actions taken, ensuring complete transparency and accountability.",
          },
        ],
        image:
          "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FJE_Si_676ad8ceb5.png&w=1080&q=90",
      },
    ],
  },
  {
    title: "Equipment / Product Selection",
    image: "/img/services/equipment-selection.png",
    description: [
      "Jersey Engineering Solutions provides equipment selection services for the air-side and chilled water refrigerant controls. We support in choosing the most suitable and efficient mechanical and electrical equipment for your construction projects. Equipment selected to meet local building codes and safety regulations ensures project compliance.",
      "Equipment selection services are therefore very useful for optimizing the performance, efficiency, and cost-effectiveness of MEP systems in construction projects, while also promoting sustainability and compliance with industry standards.",
    ],
    pdfLink: "/pdfs/equipment_selection.pdf",
    subServices: [
      {
        title: "Comprehensive Equipment Selection",
        desc: [
          "Support in choosing the most suitable mechanical and electrical equipment for construction projects.",
          "Focus on air-side, chilled water, and refrigerant control systems.",
        ],
      },
      {
        title: "Efficiency & Performance Optimization",
        desc: [
          "Selection aimed at maximizing system efficiency and operational performance.",
          "Ensures long-term reliability and reduced energy consumption.",
        ],
      },
      {
        title: "Regulatory Compliance",
        desc: [
          "Equipment chosen in alignment with local building codes and safety regulations.",
          "Guarantees project compliance and safety assurance.",
        ],
      },
      {
        title: "Cost-effective Solutions",
        desc: [
          "Balance between performance, cost, and sustainability during equipment selection.",
          "Helps optimize overall project budget without compromising quality.",
        ],
      },
      {
        title: "Sustainability-driven Approach",
        desc: [
          "Focus on environmentally responsible systems supporting green building standards.",
          "Promotes long-term efficiency and reduced carbon footprint.",
        ],
      },
    ],
  },
  {
    title: "Spec Review",
    image: "/img/services/spec-review.png",

    description:
      "JES reviews specifications to ensure all representative products are listed, maximizing bid opportunities. Provides feedback within 24 hours through the JES portal. Supplies a pre-defined email.",
  },
  {
    title: "BIM Modelling",
    image: "/img/services/bim-modelling.jpg",

    description:
      "Our team of skilled engineers provide reliable take-off services for construction projects across all fields including Civil , MEP systems and general purpose buildings using advanced software like Bluebeam, Planswift, and OnScreen takeoff to meticulously measure quantities from floor plans which are compiled into comprehensive, accurately organized reports as per your requirements.",
    subServices: [
      {
        title: "LOD 100 - Conceptual Design",
        desc: [
          "LOD 100 represents the most basic level of BIM modeling.",
          "It includes conceptual information, basic geometry, and overall project massing.",
          "Used in the early stages of design to communicate the project's basic form and concept.",
        ],
      },
      {
        title: "LOD 200 - Schematic Design",
        desc: [
          "LOD 200 involves more developed elements than LOD 100.",
          "It includes approximate sizes, shapes, and locations of building elements.",
          "Used in the schematic design phase to visualize the project and assess its feasibility.",
        ],
      },
      {
        title: "LOD 300 - Detailed Design",
        desc: [
          "LOD 300 provides a more detailed representation of building elements.",
          "It includes accurate geometry, sizes, shapes, quantities, and relationships between components.",
          "Used during the detailed design phase for coordination and construction documentation.",
        ],
      },
      {
        title: "LOD 400 - Fabrication and Assembly",
        desc: [
          "LOD 400 is highly detailed and suitable for fabrication and assembly purposes.",
          "It includes precise geometry, specific product information, and assembly details.",
          "Used for manufacturing, fabrication, and assembly of building components.",
        ],
      },
      {
        title: "LOD 500 - As-Built Model",
        desc: [
          "LOD 500 represents the highest level of detail, capturing actual installed elements and accurate as-built conditions.",
          "It includes precise geometry, product data, and operational information.",
          "Used for facility management, maintenance, and renovation purposes post-construction.",
        ],
      },
    ],
  },
  {
    title: "Revit Models: Component & Assembly",
    image: "/img/services/revit-models.png",

    description: [
      "At Jersey Engineering Solutions (JES), our Revit-based Component and Assembly Modelling services bridge the gap between design intent and real-world construction. By integrating data-rich, parametric models from multiple manufacturers into a unified BIM environment, we deliver accurate, coordination-ready models that streamline project workflows.",
      "Each model, whether an individual component or a complete assembly—is meticulously developed to represent true-to-life geometry, performance characteristics, and connectivity details. This ensures seamless integration across mechanical, electrical, and architectural disciplines.",
    ],
    subServices: [
      {
        title: "Integrated Component Modelling",
        desc: [
          "Creation of intelligent Revit models integrating parts from multiple manufacturers.",
          "Ensures seamless coordination across MEP systems.",
        ],
      },
      {
        title: "Comprehensive Submittal Packages",
        desc: [
          "Preparation of detailed 3D component assemblies and technical drawings.",
          "Includes family types, connection points, and performance data for approval.",
        ],
      },
      {
        title: "BIM-driven Efficiency",
        desc: [
          "Standardized, parametric Revit families for accurate coordination.",
          "Reduces rework and improves design precision and collaboration.",
        ],
      },
      {
        title: "Assembly Modelling",
        desc: [
          "Development of combined mechanical, electrical, and structural assemblies.",
          "Supports modular installation and clash detection for site efficiency.",
        ],
      },
      {
        title: "Deliverables",
        desc: [
          "Parametric Revit families (.RFA) and assemblies (.RVT).",
          "Coordinated views, schedules, and LOD-compliant BIM models.",
        ],
      },
    ],
    extraDetails: [
      {
        title: "Component Modeling",
        description:
          "We develop intelligent Revit-based 3D component models that integrate products from multiple manufacturers into a single coordinated BIM environment. Each component is built with precise parameters, metadata, and documentation to enhance design accuracy, coordination, and project efficiency across MEP systems.",
        services: [
          {
            title: "Integrated Multi-Manufacturer Models",
            desc: "JES combined components from different manufacturers into a single, cohesive model for seamless client use.",
          },
          {
            title: "Comprehensive Submittal",
            desc: "Delivered a fully documented model with all integrated components for approval and implementation.",
          },
          {
            title: "Efficiency & Accuracy",
            desc: "Streamlined design process by ensuring compatibility and reducing coordination effort.",
          },
        ],
        image: "/img/services/revit-models-3.png",
      },
    ],
  },
  {
    title: "AR/VR Modelling",
    image: "/img/services/ar-vr.jpg",

    description: [
      "We provide state-of-the-art AR(Augmented Reality) & VR (Virtual Reality) 3D modeling at affordable prices that are custom-designed by professionally trained industry leading experts. These value added services present you with cutting-edge solutions for immersive digital experiences.",
      "We create interactive 3D models and environments that enhance value across various industries in the segment. AR & VR modeling enable users to engage with realistic, computer-generated simulations that augment the real world (AR) or create entirely virtual environments (VR) for an array of applications, transforming how we experience and interact with content and information.",
    ],
    subServices: [
      {
        title: "Immersive AR/VR Solutions",
        desc: [
          "Development of interactive 3D models and environments for AR and VR platforms.",
          "Enhances visualization and engagement across industries.",
        ],
      },
      {
        title: "Cutting-edge Digital Experiences",
        desc: [
          "Creation of realistic simulations that augment reality or form virtual spaces.",
          "Transforms how users interact with digital environments.",
        ],
      },
      {
        title: "Expert-driven Design",
        desc: [
          "Models crafted by experienced professionals ensuring realism and precision.",
          "Tailored to meet specific client objectives and applications.",
        ],
      },
      {
        title: "Affordable Innovation",
        desc: [
          "High-quality AR/VR modeling services offered at competitive pricing.",
          "Combines technology and creativity for maximum value.",
        ],
      },
      {
        title: "Versatile Industry Applications",
        desc: [
          "AR/VR models designed for sectors like architecture, education, real estate, and manufacturing.",
          "Enables immersive presentations, training, and simulation experiences.",
        ],
      },
    ],
    extraDetails: [
      {
        title: "Benefits of AR & VR Experiences with us.",
        description:
          "We provide state-of-the-art AR & VR 3D modeling at an affordable rate, Custom-designed by professionally trained industry leading experts.",
        services: [
          {
            title: "Low cost Augmented & Virtual  Reality Services",
            desc: "Affordable, high-quality AR/VR 3D modeling for interactive visualizations, walkthroughs, and simulations tailored to client needs.",
          },
          {
            title: "Unlock Your Engineering Potential with Our AR/VR Services",
            desc: "By outsourcing your AR and VR work to us, you can unlock your engineering potential TODAY without breaking the bank.",
          },
          {
            title: "Elevate your collaboration and communications",
            desc: "We enable you to visualize complex designs in a 3-D space, and spot potential design flaws and space constraints and to do this collaboratively.",
          },
        ],
        image:
          "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FAR_VR_Modeling_dbbe228b1f.jpg&w=1080&q=90",
      },
    ],
  },
  {
    title: "MEP Drafting",
    image: "/img/services/mep-drafting.png",

    description: [
      "We specialize in providing high-quality Mechanical, Electrical, and Plumbing (MEP) AutoCAD drafting services that cater to the diverse needs of the construction and engineering industry. With a dedicated focus on precision, innovation, and efficiency, we serve as your trusted partner in delivering impeccable MEP drafting solutions.",
      "Our drafting services encompass meticulous creation of Mechanical Drawings, Electrical Layouts, and Plumbing Designs. Precision is our hallmark, ensuring that every detail is accurately represented. With expertise in CAD technology, we deliver comprehensive, industry-compliant drafts, facilitating seamless integration for successful implementation in diverse construction and engineering projects.",
    ],
    subServices: [
      {
        title: "MEP AutoCAD Drafting",
        desc: [
          "Our team of experienced drafters utilize the power of AutoCAD to create accurate and detailed MEP drawings. From HVAC layouts to electrical plans and plumbing schematics, we ensure precision in every aspect of MEP design.",
        ],
      },
      {
        title: "2D Drafting and Detailing",
        desc: [
          "We excel in converting conceptual ideas into comprehensive 2D drafts, providing detailed layouts that adhere to industry standards and project specifications.",
        ],
      },
      {
        title: "3D Modeling Integration",
        desc: [
          "Seamlessly integrating 3D MEP models into AutoCAD, we ensure a holistic view of MEP systems, facilitating better visualization and coordination among various project stakeholders.",
        ],
      },
      {
        title: "As-Built Documentation",
        desc: [
          "We assist in creating as-built documentation, capturing accurate representations of installed MEP components for renovation or maintenance purposes.",
        ],
      },
      {
        title: "Coordination and Clash Detection",
        desc: [
          "We perform detailed coordination among architectural, structural, and MEP trades to identify and resolve clashes early, ensuring smooth on-site installation and reduced rework.",
        ],
      },
      {
        title: "BIM to CAD Conversion",
        desc: [
          "Our experts efficiently convert BIM models into detailed 2D CAD drawings, maintaining accuracy, scale, and data integrity for construction and documentation purposes.",
        ],
      },
    ],
    extraDetails: [
      {
        title: "Benefits of outsourcing MEP drafting to us.",
        description:
          "We provide state-of-the-art AR & VR 3D modeling at an affordable rate, Custom-designed by professionally trained industry leading experts.",
        services: [
          {
            title: "Focus on Core Competencies",
            desc: "Outsourcing MEP drafting allows your team to focus on core business functions while we handle the intricate drafting tasks.",
          },
          {
            title: "Scalability",
            desc: "Our flexible outsourcing model accommodates varying project sizes and requirements, ensuring scalability and timely delivery.",
          },
          {
            title: "Time Efficiency",
            desc: "Benefit from our streamlined processes and expertise, reducing project turnaround time and accelerating project completion.",
          },
        ],
        image:
          "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2Fdrawing_management_large_1152x688_1_d480d4f19e.jpg&w=1080&q=90",
      },
    ],
  },
  {
    title: "Energy Modelling / Building Engineering Services",
    image: "/img/services/energy-modelling.png",

    description: [
      "We provide advanced Energy Modelling and Building Engineering services to optimize the efficiency, sustainability, and performance of building systems. Our analyses are rooted in precise engineering calculations and simulation tools to ensure comfort, reliability, and energy savings across MEP systems.",
      "Through data-driven design and simulation, we help engineers and project stakeholders make informed decisions that reduce operational costs and environmental impact while meeting international building performance standards.",
    ],
    subServices: [
      {
        title: "Thermal Load Calculation",
        desc: [
          "Comprehensive assessment of heating and cooling loads using industry-standard methods to ensure accurate HVAC system sizing and energy efficiency.",
        ],
      },
      {
        title: "Ductwork E.S.P Calculation",
        desc: [
          "Detailed calculation of External Static Pressure (ESP) for duct systems, ensuring optimal airflow, balanced pressure distribution, and reduced system losses.",
        ],
      },
      {
        title: "Pump Head Calculation",
        desc: [
          "Precise evaluation of total dynamic head for chilled water and plumbing systems to determine pump capacity and ensure efficient hydraulic performance.",
        ],
      },
      {
        title: "Energy Simulation & Analysis",
        desc: [
          "Utilization of software tools like HAP or IES-VE for modeling building energy performance, identifying savings opportunities, and verifying design compliance.",
        ],
      },
      {
        title: "System Optimization & Reporting",
        desc: [
          "Preparation of energy efficiency reports, system performance summaries, and recommendations to improve sustainability and reduce operational costs.",
        ],
      },
    ],
  },
];

const services = [
  {
    category: "BIM & MEP DRAFTING",
    items: [
      {
        name: "BIM Modeling",
        //href: "/services/bim-modelling",
        href: "/services/4",
        icon: "🏗️",
      },
      {
        name: "Revit Models Component and Assembly",
        //href: "/services/mep-drafting-services",
        href: "/services/3",
        icon: "⚙️",
      },
      {
        name: "AR & VR Modeling",
        //href: "/services/ar-vr-modelling",
        href: "/services/7",
        icon: "🔌",
      },
    ],
  },
  {
    category: "Application Engineering",
    items: [
      {
        name: "Quantity Take Off",
        //href: "/services/quantity-take-off",
        href: "/services/1",
        icon: "💡",
      },
      {
        name: "Spec Review",
        //href: "/services/thermal-load-calculation",
        href: "/services/0",
        icon: "📊",
      },
      {
        name: "Equipment Selection",
        //href: "/services/ductwork-esp-calculation",
        href: "/services/2",
        icon: "✅",
      },
      {
        name: "Duct & Pipe Layouts",
        //href: "/services/pump-head-calculation",
        href: "/services/5",
        icon: "🛡️",
      },
      {
        name: "Energy Modeling",
        //href: "/services/equipment-selection",
        href: "/services/6",
        icon: "🛡️",
      },
    ],
  },
  //   {
  //     category: "Solutions",
  //     items: [
  //       {
  //         name: "Maintenance Services",
  //         href: "/services/maintenance",
  //         icon: "🔧",
  //       },
  //       {
  //         name: "Training & Support",
  //         href: "/services/training-support",
  //         icon: "👨‍🏫",
  //       },
  //       {
  //         name: "Custom Solutions",
  //         href: "/services/custom-solutions",
  //         icon: "🎯",
  //       },
  //       {
  //         name: "Emergency Response",
  //         href: "/services/emergency-response",
  //         icon: "🚨",
  //       },
  //     ],
  //   },
];

const projectList: ProjectItemType[] = [
  {
    name: "Nissan Stadium , Tennessee Titan Stadium",
    imgLink: "/img/projects/nissan-stadium.jpg",
    location: "Tennessee, USA",
    overview: [
      "KIPP DC Quest Academy educates District of Columbia children in Grades 1 through 4. KIPP DC Elementary Schools work with students to become thoughtful thinkers and teammates who will return as college-educated leaders of their community. Upon completion of fourth grade, Quest Academy students move onto KIPP DC Valor Academy.",
    ],
    client: "Qatari Diar & Lusail City",
    contractor: "Voltas Ltd.",
    serviceType: "BIM Modeling",
  },
  {
    name: "Wisconsin State Capital Building Renovation",
    imgLink: "/img/projects/wisconsin-state-capital.jpg",
    location: "Wisconsin, USA",
    overview: [
      "Shura is the main hub island at The Red Sea. With a natural dolphin shape, the island is one of 92 in our archipelago and home to stunning vistas, incredible native fauna and flora, and beautiful wildlife. Due to open to guests in 2024, the island will house 11 world-class hotels and resorts including Edition, Fairmont, Raffles, SLS, InterContinental, Jumeirah, Miraval, Rosewood and Grand Hyatt brands. Guests will have a wide choice of experiences and attractions to enjoy, including an 18-hole championship golf course, a marina and a beach club, as well as a variety of luxury retail options.",
    ],
    client: "Red Sea Global",
    contractor: "Al Futtaim",
    serviceType: "BIM Modeling",
  },
  {
    name: "KIPP School Washington DC, USA",
    imgLink: "/img/projects/kipp-school.jpg",
    thumbnailLink: "/img/projects/kipp-school-thumb.jpg",
    location: "Lusail City, Qatar",
    overview: [
      "KIPP DC Quest Academy educates District of Columbia children in Grades 1 through 4. KIPP DC Elementary Schools work with students to become thoughtful thinkers and teammates who will return as college-educated leaders of their community. Upon completion of fourth grade, Quest Academy students move onto KIPP DC Valor Academy.",
    ],
    client: "Qatari Diar & Lusail City",
    contractor: "Voltas Ltd.",
    serviceType: "BIM Modeling",
  },
  {
    name: "Shura Island - HC02 & HC03, KSA",
    imgLink: "/img/projects/shura-island.jpg",
    location: "Kingdom of Saudi Arabia",
    overview: [
      "Shura is the main hub island at The Red Sea. With a natural dolphin shape, the island is one of 92 in our archipelago and home to stunning vistas, incredible native fauna and flora, and beautiful wildlife. Due to open to guests in 2024, the island will house 11 world-class hotels and resorts including Edition, Fairmont, Raffles, SLS, InterContinental, Jumeirah, Miraval, Rosewood and Grand Hyatt brands. Guests will have a wide choice of experiences and attractions to enjoy, including an 18-hole championship golf course, a marina and a beach club, as well as a variety of luxury retail options.",
    ],
    client: "Red Sea Global",
    contractor: "Al Futtaim",
    serviceType: "BIM Modeling",
  },
  {
    name: "Lusail Boulevard, Qatar",
    imgLink: "/img/projects/lusail-boulevard.jpg",
    thumbnailLink: "/img/projects/lusail-boulevard-thumb.jpg",
    location: "Lusail City, Qatar",
    overview: [
      "Lusail Boulevard is what truly modern and bustling City lifestyle offers: amazing architecture, retail, entertainment, restaurants and cafes, pedestrian and cycling pathways, all within walking distance to the iconic Lusail stadium , yet another architectural wonder and a stunning spectacle to behold.",
    ],
    client: "Qatari Diar & Lusail City",
    contractor: "Voltas Ltd.",
    serviceType: "Ductwork E.S.P calculation",
  },
  {
    name: "Al Bayt Stadium, Qatar",
    imgLink: "/img/projects/al_bayt_stadium.jpg",
    thumbnailLink: "/img/projects/al_bayt_stadium-thumb.jpg",
    location: "Lusail City, Qatar",
    overview: [
      "Al Bayt Stadium hosted the opening match of the 2022 World Cup, and hosted a semi-final and a quarter-final match. The stadium hosted around 60,000 World Cup fans, including 1,000 seats for the press. The architectural design takes its inspiration from the traditional tents of the nomadic people of Qatar and the region. It features a retractable roof, providing covered seating for all spectators.",
      "It connects to transportation systems and has onsite parking for 6,000 cars, 350 buses and the movement of 150 public buses/shuttles, as well as 1,000 taxis and water taxis. The stadium is certified for its sustainability credentials under the Global Sustainability Assessment System (GSAS) for a number of certifications representing sustainable design & build, construction management practices and the efficiency of its energy centre.",
    ],
    client: "Qatari Diar & Lusail City",
    contractor: "Voltas Ltd.",
    serviceType: "BIM Modeling",
  },
  {
    name: "Multi Purpose Hall at Lusail, Qatar",
    imgLink: "/img/projects/multi-purpose-hall-lusail.jpg",
    thumbnailLink: "/img/projects/multi-purpose-hall-lusail-thumb.jpg",
    location: "Lusail City, Qatar",
    overview: [
      "Al Bayt Stadium hosted the opening match of the 2022 World Cup, and hosted a semi-final and a quarter-final match. The stadium hosted around 60,000 World Cup fans, including 1,000 seats for press. The architectural design takes its inspiration from the traditional tents of the nomadic peoples of Qatar and the region. It features a retractable roof, providing covered seating for all spectators.",
      "It connects to transportation systems and have onsite parking for 6,000 cars, 350 buses and the coming and going of 150 public buses/shuttles, as well as 1,000 taxis and water taxis. The stadium is certified for its sustainability credentials under the Global Sustainability Assessment System (GSAS) for a number of certifications representing sustainable design & build, construction management practices and the efficiency of its energy centre.",
      "The stadium hosted around 60,000 World Cup fans, including 1,000 seats for press. The architectural design takes its inspiration from the traditional tents of the nomadic peoples of Qatar and the region. It features a retractable roof, providing covered seating for all spectators. It connects to transportation systems and have onsite parking for 6,000 cars, 350 buses and the coming and going of 150 public buses/shuttles, as well as 1,000 taxis and water taxis.",
    ],
    client: "Qatari Diar & Lusail City",
    contractor: "Voltas Ltd.",
    serviceType: "",
  },
];

const portalCardList: PortalCardType[] = [
  {
    imgLink:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXBsb2FkJTIwZG9jdW1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&h=500&q=80",
    title: "Drop your RFQ",
    desc: "Drop your RFQ -Upload everything in our secure portal. We take it from there.",
  },
  {
    imgLink:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5hbHl6ZSUyMGRhdGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&h=500&q=80",
    title: "Align with the team",
    desc: "Specify exactly what you need via the portal or email. Fast, direct, clear.",
  },
  {
    imgLink:
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cXVvdGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&h=500&q=80",
    title: "Revise and track live",
    desc: "Submit and upload everything in our secure portal for 100% accurate, real-time processing, we’ll take it from there.",
  },
];

const securityList: SecurityItemType[] = [
  {
    imgLink: "/icons/security/aws.png",
    title: "SERVERS",
    desc: "AWS provides a comprehensive, scalable, and secure platform for businesses to host their applications, store their data, and manage their infrastructure.",
  },
  {
    imgLink: "/icons/security/mfa.png",
    title: "MULTI FACTOR AUTHENTICATION (MFA)",
    desc: "It is an authentication method that provides an extra layer of security beyond a password. MFA requires users to provide at least two types of authentication, such as a password and a one-time code generated by a mobile device or sent via text message.",
  },
  {
    imgLink: "/icons/security/backup.png",
    title: "BACKUP",
    desc: "AWS provides various BACKUP solutions for protecting your data and ensuring its availability.",
  },
  {
    imgLink: "/icons/security/ssl.png",
    title: "SSL",
    desc: "It is a technology that provides secure communication between a website and its users. It encrypts the data being transmitted, making it difficult for anyone to intercept or steal the information.",
  },
];
const aboutUsAccordionList = [
  {
    heading: "Who are we?",
    subheading: "",
    description:
      "JES is powered by a senior team of tenured executives from industry leaders including Daikin, Price, McQuay, Trane, Dunham‑Bush, Flex Master, and others—people who’ve served as President, SVP, and General Manager. Our engineers hold accredited degrees in engineering, with graduate business degrees in the mix and one PhD. We bring decades of practical, leadership‑level experience to every engagement. Our strength is our team—and the experience we put to work for our clients.",
  },
  {
    heading: "Why choose us?",
    subheading: "",
    description:
      "Establish a groundbreaking paradigm in the MEP industry with Jersey Engineering, empowering you to achieve your best. Our services offer a more effective way to run your business, allowing you the time to concentrate on what only you can do much better and at ease serving your customers, managing your employees, and nurturing the overall well-being of your enterprise.",
  },
  {
    heading: "Our Mission",
    subheading: "",
    description:
      "Our goal is to empower HVAC professionals and manufacturer reps with accurate, scalable, and tech-enabled solutions that enhance speed, precision, and overall project success. By integrating advanced technology, we streamline every phase of the process—from initial concept through to completion—ensuring more informed decision-making, faster execution, and higher-quality outcomes. We aim to provide HVAC professionals with the tools and resources they need to achieve greater efficiency, reduce errors, and deliver exceptional results in every project.",
  },
  {
    heading: "Our Vision",
    subheading: "",
    description:
      "Our Vision is to become the most valued and trusted partner of our Clients and Partners by; “Freeing you to be your best!",
  },
  {
    heading: "Our Values",
    subheading: "",
    description:
      "Precision First. Speed with Integrity. Built for Partners. Own the Outcome. Scalable by Design. Innovate with Purpose. Clariy in Communication",
  },
];

const solutions: SolutionType[] = [
  {
    title: "For Manufacturer Reps",
    description:
      "Transform your vision into reality with our comprehensive architectural BIM services. We create detailed 3D models that enable seamless coordination between all stakeholders.",
    services: [
      "Quantity Take-off",
      "Product Selections",
      "Quotes & Submittals",
      "Spec Review",
      "Component Modelling & Assemblies",
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
  },
  {
    title: "For Manufacturers",
    description:
      "Optimize structural systems with precision BIM modeling and analysis. Our team delivers accurate structural models that integrate seamlessly with architectural and MEP systems.",
    services: [
      "Specialized Production Drawings",
      "Revit Family Creation",
      "Offshore Manufacturing & Sourcing Support",
    ],
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
  },
  {
    title: "For Engineers & Contractors",
    description:
      "Streamline mechanical, electrical, and plumbing systems with intelligent BIM coordination. We ensure all building systems work harmoniously, identifying conflicts before construction begins.",
    services: ["BIM Modelling ", "MEP Drafting", "Energy Modelling"],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
  },
  {
    title: "Infrastructure & Civil",
    description:
      "Deliver large-scale infrastructure projects with advanced civil BIM solutions. From highways to bridges, our models provide comprehensive insights for better planning and design.",
    services: [
      "Road & Highway Design",
      "Bridge Engineering",
      "Site Development",
      "Grading & Drainage",
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
  },
  {
    title: "Facility Management",
    description:
      "Maximize operational efficiency with BIM-enabled facility management solutions. We create digital twins that provide real-time insights into building performance and maintenance.",
    services: [
      "Asset Information Modeling",
      "Maintenance Planning",
      "Space Management",
      "Energy Analysis",
    ],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
  },
  {
    title: "Construction Management",
    description:
      "Enhance project delivery with 4D and 5D BIM solutions. We provide construction sequencing, cost estimation, and progress tracking to keep your projects on time and within budget.",
    services: [
      "4D Scheduling",
      "5D Cost Estimation",
      "Progress Monitoring",
      "Site Logistics Planning",
    ],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
  },
];

const energyModellingSolutions: SolutionType[] = [
  {
    title: "Thermal Load Calculation",
    description:
      "Accurate thermal load calculation in a building is vital as it lets you estimate the required capacity of your heating systems, thereby meeting the required temperature conditions in the conditioned space.",
    services: [
      "Heat Load Analysis",
      "HVAC System Design Support",
      "Energy Efficiency Optimization",
      "Troubleshooting and Assessment",
    ],
    image:
      "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FThermal_load_calc_e20d82a2dc.jpg&w=1920&q=90",
  },
  {
    title: "Ductwork E.S.P Calculations",
    description:
      "Optimize structural systems with precision BIM modeling and analysis. Our team delivers accurate structural models that integrate seamlessly with architectural and MEP systems.",
    services: [
      "Detailed Analysis",
      "Ductwork Design Optimization",
      "Equipment Selection Support",
      "Troubleshooting and Optimization",
    ],
    image:
      "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FHVAC_2_761e9977f7.png&w=1920&q=90",
  },
  {
    title: "Pump Head Calculation",
    description:
      "Streamline mechanical, electrical, and plumbing systems with intelligent BIM coordination. We ensure all building systems work harmoniously, identifying conflicts before construction begins.",
    services: [
      "Hydraulic Analysis",
      "Efficiency Optimization",
      "System Design Support",
      "Troubleshooting and Assessment",
    ],
    image:
      "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2Fgallery9_79ecb57d8d.jpg&w=1920&q=90",
  },
];

const testimonials: TestimonialCardProps[] = [
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    name: "Sarah Johnson",
    title: "Designer",
    desc: "The intuitive design tools have completely transformed my workflow. I can now bring ideas to life faster than ever.",
    rating: 4,
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    name: "Michael Chen",
    title: "Developer",
    desc: "I was skeptical at first, but this AI tool saved me hours of work. The automation features are a game-changer.",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    name: "Emily Rodriguez",
    title: "Manager",
    desc: "Managing our design and dev teams is so much easier now. The platform keeps everything organized and effortless.",
    rating: 3,
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    name: "David Kim",
    title: "Engineer",
    desc: "The performance and reliability are outstanding. It integrates smoothly with our existing tools.",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    name: "Lisa Park",
    title: "Designer",
    desc: "Beautiful interface and seamless experience — it’s a joy to use daily. Our clients love the results too!",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    name: "James Wilson",
    title: "Consultant",
    desc: "The insights I gained from using this platform are invaluable. It feels like having an extra teammate.",
    rating: 4,
  },
  {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    name: "Maria Garcia",
    title: "Analyst",
    desc: "I appreciate how user-friendly it is. Even complex data feels simple to understand and act on.",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    name: "Sarah Johnson",
    title: "Designer",
    desc: "It’s like having a creative assistant at my fingertips. My design productivity has doubled.",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    name: "Michael Chen",
    title: "Developer",
    desc: "The documentation and support are top-notch. I got everything running in minutes!",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    name: "Emily Rodriguez",
    title: "Manager",
    desc: "It helped us automate repetitive tasks so our team can focus on strategy. Worth every penny.",
    rating: 4,
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    name: "Lisa Park",
    title: "Designer",
    desc: "Every update just makes it better. The attention to detail in the UI is incredible.",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    name: "James Wilson",
    title: "Consultant",
    desc: "It’s not just software — it’s a complete ecosystem for productivity. Highly recommended.",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    name: "Maria Garcia",
    title: "Analyst",
    desc: "This tool turned hours of manual work into minutes. It’s a real game-changer for my reports.",
    rating: 5,
  },
];

const faq = [
  {
    question: "What is Quantity Take-Off and why is it important?",
    answer:
      "Quantity Take-Off (QTO) is the process of measuring materials, components, and labor needed for construction projects. It ensures accurate cost estimation, reduces material wastage, and supports better budgeting and project planning.",
  },
  {
    question: "How does your team assist with Equipment or Product Selection?",
    answer:
      "We help clients choose the most efficient, cost-effective, and specification-compliant products and equipment. Our team evaluates performance data, compatibility, and sustainability to ensure the best selection for your project.",
  },
  {
    question: "What does a Specification Review include?",
    answer:
      "Our Specification Review process checks technical documentation for consistency, clarity, and compliance with project requirements. This helps prevent design conflicts, delays, and rework during later stages.",
  },
  {
    question: "What are the benefits of BIM Modelling for my project?",
    answer:
      "BIM (Building Information Modelling) provides a 3D digital representation of your project that integrates design, cost, and time data. It enhances collaboration, reduces design errors, and allows for better decision-making throughout the construction lifecycle.",
  },
  {
    question:
      "What’s the difference between Component and Assembly Revit Models?",
    answer:
      "Component models represent individual elements such as walls, doors, or HVAC units. Assembly models combine multiple components to form complex systems or units, enabling better visualization and coordination across disciplines.",
  },
];

export {
  faq,
  portalCardList,
  projectList,
  services,
  serviceSections,
  testimonials,
  securityList,
  aboutUsAccordionList,
  solutions,
  energyModellingSolutions,
};
