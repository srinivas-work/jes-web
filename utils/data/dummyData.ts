import {
  HeaderMenuItemType,
  InsightItemType,
  PdfCardItemType,
  PortalCardType,
  ProjectItemType,
  Region,
  SecurityItemType,
  ServiceItemType,
  SolutionType,
  TestimonialCardProps,
} from "../types";

const defaultHeaderMenuItems: HeaderMenuItemType[] = [
  { name: "Services", path: "/#services" },
  { name: "Solutions For", path: "/solutions" },
  { name: "Insight Hub", path: "/insights" },
  { name: "About Us", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact Us", path: "/contact" },
];

const serviceSections: ServiceItemType[] = [
  {
    title: "Quantity Take Off",
    image: "/img/services/qto.png",
    pdfLink: "/pdfs/service-docs/Jersey_Quantity_Take_Off_US.pdf",
    img1: "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FGroup_21_553dee3fe0.jpg&w=640&q=90",
    img2: "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FRectangle_35_9b6cebc560.jpg&w=640&q=90",
    description:
      "Our team of 200+ factory-trained engineers combine a proven process with state-of-the-art AI to deliver accurate MEP takeoffs and selections and we partner closely with your team for fast, reliable file management.",
    subServices: [
      {
        title: "Specialized Quantity Take-Off",
        desc: ["Using manufacturing software, with 10+ years QTO experience."],
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
          "We tailor the QTO package to match your existing BOQ sheets and pivot files, ensuring smooth integration into your workflow.",
        ],
      },

      {
        title: "Quality Assurance and Compliance",
        desc: [
          "Ensuring compliance with industry standards, regulations, and best practices during the quantity estimation process.",
          "Quality checks to maintain accuracy and reliability of the quantity take-off data.",
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
      {
        caseStudy: true,
        title: "QTO & Selection Support Success",
        services: [
          {
            title: "Challenge",
            desc: "A mid-sized US Air-Distribution Representative lost two estimators, creating operational gaps in their estimating and quoting processes. 167% Efficiency Gain increase in weekly quoting efficiency.",
          },
          {
            title: "Solution",
            desc: "JES provided comprehensive estimating and quoting support, leveraging expertise to boost efficiency and profitability. $3M Added Revenue - Additional Annual Revenue.",
          },
          {
            title: "Results",
            desc: "Weekly quoting increased by $528K (167% efficiency gain). Monthly sales grew by $200K with just $6,950 investment. Additional $50K monthly margin. $700k Margin Growth - Extra Annual Profit Margin",
          },
        ],
        image: "/img/services/spec-review.png",
      },
    ],
    toolsUsed: [
      "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FPlan_Swift_Logo_Lrg_3a74a35ff2.png&w=384&q=100",
      "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/tool3_ce410bd7df.svg",
      "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2Fon_center_software_logo_bycc_www_e8c4a31429.png&w=384&q=100",
    ],
  },
  {
    title: "Equipment / Product Selection",
    image: "/img/services/equipment-selection.png",
    img1: "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2Fd8a7a68b9d4d121713a62556451f0c4d9ca6d9ec_1438x985_90082729a1.webp&w=640&q=90",
    img2: "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FRectangle_29_f4d8f843e7.jpg&w=640&q=90",
    description: [
      "JES provides equipment selection services for the air-side, applied MEP equipment and controls. We support in choosing the most suitable and efficient mechanical and electrical equipment for your construction projects. Equipment selected to meet local building codes and safety regulations ensures project compliance.",
      "Equipment selection services are therefore very useful for optimizing the performance, efficiency, and cost-effectiveness of MEP systems in construction projects, while also promoting sustainability and compliance with industry standards.",
    ],
    pdfLink: "/pdfs/service-docs/Jersey_Equipment_Selection_US.pdf",

    subServices: [
      {
        title: "Comprehensive Equipment Selection",
        desc: ["We are factory trained by the leading manufacturers."],
      },
      {
        title: "Efficiency & Performance Optimization",
        desc: ["Selections reviewed to optimize spec and energy requirements."],
      },
      // {
      //   title: "Regulatory Compliance",
      //   desc: [
      //     "Equipment chosen in alignment with local building codes and safety regulations.",
      //     "Guarantees project compliance and safety assurance.",
      //   ],
      // },
      {
        title: "Cost-effective Solutions",
        desc: [
          "Balance between performance, cost, and sustainability during equipment selection.",
          "Helps optimize overall project budget without compromising quality.",
        ],
      },
      // {
      //   title: "Sustainability-driven Approach",
      //   desc: [
      //     "Focus on environmentally responsible systems supporting green building standards.",
      //     "Promotes long-term efficiency and reduced carbon footprint.",
      //   ],
      // },
    ],
  },
  {
    title: "Spec Review",
    image: "/img/services/spec-review.png",
    img2: "/img/services/spec-review-2.png",
    description:
      "JES Spec review ensures client's equipment meets or wisely challenges the Spec, using a thorough tested process to , perform electrical, controls and physical specifications are addressed.",
  },
  {
    title: "BIM Modelling",
    pdfLink: "/pdfs/service-docs/Jersey_BIM_Detailed_brochure_US.pdf",
    image: "/img/services/bim-modelling.jpg",
    img1: "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FRectangle_52_2196634e4a.jpg&w=640&q=90",
    img2: "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2Fwhat_is_bim_thumb_1172x660_888f6c7af1.jpg&w=640&q=90",
    description:
      "Building Information Modeling (BIM) employs different levels of detail (LOD) to categorize the extent of development and detailing within a BIM model. These levels help define the granularity and sophistication of information contained in the model at various stages of the project.",
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
    toolsUsed: [
      "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FFrame_189727_fa99135d7e.png&w=384&q=100",
      "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FGroup_189727_d3db82f79c.png&w=384&q=100",
      "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FGroup_189728_4bdd969802.png&w=384&q=100",
    ],
    extraDetails: [
      {
        caseStudy: true,
        title: "Engineering Model integration",
        services: [
          {
            title: "Challenge",
            desc: "Engineers needed a complete model including an ERU, fan system, and vibration curb.",
          },
          {
            title: "Solution",
            desc: "JES engaged manufacturers to retrieve models for all components.",
          },
          {
            title: "Outcome",
            desc: "Model delivered overnight, allowing the rep to engage with JES in the afternoon and have the model ready for the engineer the next morning.",
          },
        ],
        image: "/img/services/subServices/equipment-case-study.png",
      },
    ],
  },
  {
    title: "Revit Models: Component & Assembly",
    image: "/img/services/revit-models.png",
    img1: "/img/services/revit-models-2.png",
    img2: "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2Fwhat_is_bim_thumb_1172x660_888f6c7af1.jpg&w=640&q=90",
    description: [
      "At JES Inc., our Revit-based Component and Assembly Modelling services bridge the gap between design intent and real-world construction. By integrating data-rich, parametric models from multiple manufacturers into a unified BIM environment, we deliver accurate, coordination-ready models that streamline project workflows.",
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
        caseStudy: true,
        title: "Engineering Model integration",
        services: [
          {
            title: "Challenge",
            desc: "Engineers needed a complete model including an ERU, fan system, and vibration curb.",
          },
          {
            title: "Solution",
            desc: "JES engaged manufacturers to retrieve models for all components.",
          },
          {
            title: "Outcome",
            desc: "Model delivered overnight, allowing the rep to engage with JES in the afternoon and have the model ready for the engineer the next morning.",
          },
        ],
        image: "/img/services/subServices/equipment-case-study.png",
      },

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
    pdfLink: "/pdfs/service-docs/Jersey_AR_and_VR_Modeling_US.pdf",
    img1: "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FFrame_627513_edf1367c2e.png&w=640&q=90",
    img2: "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FRectangle_21_87e7dacf53.jpg&w=640&q=90",
    description: [
      "We provide state-of-the-art AR(Augmented Reality) & VR(Virtual Reality) 3D modeling at affordable prices that are custom-designed by professionally trained industry leading experts. These value added services present you with cutting-edge solutions for immersive digital experiences.",
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
    pdfLink: "/pdfs/service-docs/Jersey_MEP_Drafting_Services_US.pdf",
    image: "/img/services/mep-drafting.png",
    img1: "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2Fmep_drafting_services_intro_b23052ada0.jpg&w=640&q=90",
    img2: "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FSpace_Management_Software_8c243ef07d.webp&w=640&q=90",
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

      {
        caseStudy: true,
        title: "Space Design Challenges Solved in Record Time",
        services: [
          {
            title: "The Challenge",
            desc: "Client faced critical space constraints with modular chiller replacement.",
          },
          {
            title: "Our Response",
            desc: "Delivered detailed 3D Revit model within 48 hours",
          },
          {
            title: "The Result",
            desc: "Client visualized exact space utilization. WE WON THE $400,000 JOB IN NYC",
          },
        ],
        image: "/img/services/subServices/mep-case-study.jpg",
      },
    ],
    toolsUsed: [
      "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FFrame_189727_fa99135d7e.png&w=384&q=100",
      "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FGroup_189727_d3db82f79c.png&w=384&q=100",
    ],
  },
  {
    title: "Energy Modelling / Building Engineering Services",
    pdfLink: "/pdfs/service-docs/Jersey_Thermal_Load_Calculation_US.pdf",
    image: "/img/services/energy-modelling.png",
    img1: "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2FThermal_load_calc_2_a858c198db.jpg&w=384&q=90",
    img2: "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2F3d_rendering_ventilation_system_5_b1bd869dfe.jpg&w=384&q=90",
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
    extraDetails: [
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
    ],
  },
];

const projectList: ProjectItemType[] = [
  {
    name: "Nissan Stadium, Tennessee Titan Stadium",
    imgLink: "/img/projects/nissan-stadium.jpg",
    location: "Tennessee, USA",
    overview: [
      `<section>
  <p>
    JES delivered full Revit modeling and immersive VR reviews to finalize the perfect outdoor plant room location.
  </p>

  <p>
    Using virtual reality, the design team and client could “walk” the stadium as fans – from every seat, suite, and concourse – while we instantly relocated the entire plant room around the site in real time.
  </p>

  <h3>The result?</h3>

  <ul style="padding-left: 2.5rem;">
    <li>Mechanical equipment is completely hidden from view</li>
    <li>Noise impact is minimized regardless of event configuration (concerts, football, soccer, etc.)</li>
    <li>Zero interference with the guest experience</li>
  </ul>

  <p>
    VR didn’t just help visualize – it guaranteed the plant disappears for 70,000+ fans on game day.
  </p>
</section>

`,
    ],
    client: "Nissan Stadium",
    contractor: "Voltas Ltd.",
    serviceType: "Revit modeling + Immersive VR",
  },
  {
    name: "Wisconsin State Capital Building Renovation",
    imgLink: "/img/projects/wisconsin-state-capital.jpg",
    location: "Wisconsin, USA",
    overview: [
      "Wisconsin State Capital,  was fully renovated several years earlier with a unique custom designed underground ducting system - JES worked on the equipment QTO and selection for the expansion, making the selection of new equipment faster and simpler.",
    ],
    client: "Wisconsin State Capital",
    contractor: "Al Futtaim",
    serviceType: "QTO",
  },
  {
    name: "KIPP School",
    imgLink: "/img/projects/kipp-school.jpg",
    thumbnailLink: "/img/projects/kipp-school-thumb.jpg",
    location: "Washington DC, United States",
    overview: [
      "KIPP DC Quest Academy educates District of Columbia children in Grades 1 through 4. KIPP DC Elementary Schools work with students to become thoughtful thinkers and teammates who will return as college-educated leaders of their community. Upon completion of fourth grade, Quest Academy students move onto KIPP DC Valor Academy.",
    ],
    client: "KIPP DC",
    contractor: "SETTY ASSOCIATES INTERNATIONAL",
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
      "Lusail Boulevard is what truly modern and bustling City lifestyle offers: amazing architecture, retail, entertainment, restaurants and cafes, pedestrian and cycling pathways, all within walking distance to the iconic Lusail stadium, yet another architectural wonder and a stunning spectacle to behold.",
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
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    heading: "Our Vision & Mission",
    subheading: "",
    description:
      "Our goal is to empower HVAC professionals and manufacturer reps with accurate, scalable, and tech-enabled solutions that enhance speed, precision, and overall project success. By integrating advanced technology, we streamline every phase of the process—from initial concept through to completion—ensuring more informed decision-making, faster execution, and higher-quality outcomes. We aim to provide HVAC professionals with the tools and resources they need to achieve greater efficiency, reduce errors, and deliver exceptional results in every project.",
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
      "Quotes & Submittals Preparation",
      "Specification Review & Compliance Matrix",
      "Component Modelling & Assemblies",
      // "Quantity Takeoffs (QTO)",
      // "Product Selections and Alternates",
      // "Quotes and Complete Submittal Packages",
      // "Specification Review and Compliance Matrix",
      // "Component Modeling and Revit Families",
      // "End-to-end product videos: script, film, edit, and 3D animation",
      // "Equipment Schedules and BOMs",
      // "Addenda and RFI Tracking",
      // "RFQ to Submittal Turnaround SLAs",
      // "Post-Bid Revisions and Change-Order Support",
      // "QA/QC Review by Senior Engineer",
      // "OEM Pricing and Lead-Time Coordination",
      // "Controls Points List and Sequence Alignment",
      // "Documentation: Cover sheets, cut sheets, wiring diagrams, and IOM links",
      // "CRM Handoff and Pipeline Notes for Sales Follow-Up",
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
      "Cut sheets and submittal packages",
      "3D product visualization and animations",
      // "Custom shop and production drawings",
      // "Revit family creation and maintenance",
      // "Product design support and engineering consultation",
      // "Application guides, cut sheets, and submittal packages",
      // "3D product visualization and animations",
      // "BIM content QA/QC and standards compliance",
      // "Integration support with specifiers and OEM workflows",
      // "Expanded distribution via our rep and contractor network",
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
];

const testimonials: TestimonialCardProps[] = [
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    name: "Thermosystems, IL",
    title: "Senior Partner",
    desc: "We appreciate JES’s expertise in VRV and FCU takeoffs. Their fast, accurate, and on-time support has been key to our success. Highly recommended for reliable, high-quality service.",
    rating: 4,
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    name: "Nick Colby, Colby Equipment",
    title: "President",
    desc: "We truly appreciate your work. Without outsourcing our takeoffs and selections, we couldn’t handle the volume our estimating department manages today. Excellent support all around.",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    name: "MRG, Nashville, TN",
    title: "Sales Engineer",
    desc: "JES’s 3D virtual design blew my client away. Their detail and dedication exceeded expectations, giving me confidence in presenting our equipment designs. Outstanding expertise.",
    rating: 4,
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    name: "D & B Building Services, NJ",
    title: "Partner",
    desc: "JES enhanced our air handling business with excellent selection, drawings, and submittals. Their quick, reliable service saves time, cuts costs, and improves satisfaction.",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    name: "Thermosystems, IL",
    title: "Senior Partner",
    desc: "We appreciate JES’s expertise in VRV and FCU takeoffs. Their fast, accurate, and on-time support has been key to our success. Highly recommended for reliable, high-quality service.",
    rating: 4,
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    name: "Nick Colby, Colby Equipment",
    title: "President",
    desc: "We truly appreciate your work. Without outsourcing our takeoffs and selections, we couldn’t handle the volume our estimating department manages today. Excellent support all around.",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    name: "MRG, Nashville, TN",
    title: "Sales Engineer",
    desc: "JES’s 3D virtual design blew my client away. Their detail and dedication exceeded expectations, giving me confidence in presenting our equipment designs. Outstanding expertise.",
    rating: 4,
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    name: "D & B Building Services, NJ",
    title: "Partner",
    desc: "JES enhanced our air handling business with excellent selection, drawings, and submittals. Their quick, reliable service saves time, cuts costs, and improves satisfaction.",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    name: "Thermosystems, IL",
    title: "Senior Partner",
    desc: "We appreciate JES’s expertise in VRV and FCU takeoffs. Their fast, accurate, and on-time support has been key to our success. Highly recommended for reliable, high-quality service.",
    rating: 4,
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    name: "Nick Colby, Colby Equipment",
    title: "President",
    desc: "We truly appreciate your work. Without outsourcing our takeoffs and selections, we couldn’t handle the volume our estimating department manages today. Excellent support all around.",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    name: "MRG, Nashville, TN",
    title: "Sales Engineer",
    desc: "JES’s 3D virtual design blew my client away. Their detail and dedication exceeded expectations, giving me confidence in presenting our equipment designs. Outstanding expertise.",
    rating: 4,
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    name: "D & B Building Services, NJ",
    title: "Partner",
    desc: "JES enhanced our air handling business with excellent selection, drawings, and submittals. Their quick, reliable service saves time, cuts costs, and improves satisfaction.",
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

const highlights = [
  {
    title: "JES Inc.",
    description: "Trusted American company with decades of experience.",
    delay: 0,
  },
  {
    title: "Fast Delivery & Accuracy",
    description: "Known for lightning-fast project delivery and precision.",
    delay: 0.15,
  },
  {
    title: "ISO Certifications",
    description: "Offshore partner with ISO 27001 & ISO 9001 certifications.",
    delay: 0.3,
  },
  {
    title: "Efficient Processes",
    description:
      "Rigorous training and streamlined processes for unmatched speed and accuracy.",
    delay: 0.45,
  },
  {
    title: "High Output",
    description: "Completing 1,000–2,000 projects per month.",
    delay: 0.6,
  },
  {
    title: "Trusted Network",
    description:
      "Serving 38 clients, including manufacturer reps, distributors, and contractors.",
    delay: 0.45,
  },
];

const regions: Region[] = [
  {
    name: "United States",
    hasDetails: true,
    details: [
      "US – SALES OFFICE Charlottesville, Virginia 22902, United States",
      "+1434218-8403",
      "bruce.dorey@jerseyeng.com",
    ],
    mapPosition: { top: "50%", left: "20%" },
  },
  {
    name: "India",
    hasDetails: true,
    details: [
      "Head Quarters - Plot No 22-A, AMRL Hi-Tech City Ltd, Multi Product SEZ, Nanguneri, Tirunelveli, Tamilnadu - 627108",
      "+919994701501",
      "info@jerseyeng.com",
    ],
    mapPosition: { top: "57%", left: "64%" },
  },
  {
    name: "Canada",
    hasDetails: true,
    details: [
      "CANADA - SALES OFFICE 7405 East Danbro Crescent, Mississauga, Ontario, L5N 6P8 CANADA",
      "+14168045900",
      "info@jerseyeng.com",
    ],
    mapPosition: { top: "38%", left: "18%" },
  },
  {
    name: "Europe",
    hasDetails: true,
    details: [
      "EUROPE - BELGIUM OFFICE BLERCO BVBA Sint-Jacobsnieuw, straat 45 Ghent 9000, Belgium",
      "+4915124064230",
      "info@jerseyeng.com",
    ],
    mapPosition: { top: "40%", left: "48%" },
  },
  {
    name: "Middle East",
    hasDetails: true,
    details: [
      "Jersey Group, Building No. 44, Zone No. 91، Street No. 3062, Logistic Park-B, Birkat Al Awamer, State of Qatar.",
      "+97444925077",
      "info@jerseygroup.com",
    ],
    mapPosition: { top: "52%", left: "55%" },
  },
  {
    name: "Africa",
    hasDetails: true,
    details: [
      "AFRICA - NIGERIA OFFICE Plot 18, Nike Art Gallery Road, Lekki Lagos, Nigeria",
      "+2348134210881",
      "info@jerseyeng.com",
    ],
    mapPosition: { top: "65%", left: "50%" },
  },
];

const insightsData: InsightItemType[] = [
  {
    id: 1,
    title: "The Future of Digital Transformation",
    excerpt:
      "Exploring how emerging technologies are reshaping business landscapes and creating new opportunities for innovation.",
    category: "Technology",
    date: "Oct 8, 2025",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Design Thinking in Modern Product Development",
    excerpt:
      "Understanding the principles of user-centered design and how they drive successful product innovation.",
    category: "Design",
    date: "Oct 5, 2025",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Sustainable Business Practices for 2025",
    excerpt:
      "Implementing eco-friendly strategies that benefit both the environment and your bottom line.",
    category: "Sustainability",
    date: "Oct 2, 2025",
    image:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "AI Integration in Customer Experience",
    excerpt:
      "Leveraging artificial intelligence to create personalized and engaging customer journeys.",
    category: "AI & ML",
    date: "Sep 28, 2025",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "Building High-Performance Teams",
    excerpt:
      "Strategies for fostering collaboration, innovation, and excellence in remote and hybrid work environments.",
    category: "Leadership",
    date: "Sep 25, 2025",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "Data-Driven Decision Making",
    excerpt:
      "Harnessing the power of analytics to make informed strategic choices that drive growth.",
    category: "Analytics",
    date: "Sep 22, 2025",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    readTime: "6 min read",
  },
];

const whitePapers: InsightItemType[] = [
  {
    id: 1,
    title: "Hidden Cost of In-House Takeoffs",
    category: "White Papers",
    date: "Nov 23, 2025",
    image: "/img/thumbnails/hidden-cost-of-in-house-takeoffs.jpg",
    pdfUrl: "/pdfs/white-papers/hidden-cost-of-in-house-takeoffs.pdf",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Leakage by Design: The Distributed Refrigerant Fallacy",
    category: "White Papers",
    date: "Oct 12, 2025",
    image:
      "/img/thumbnails/leakage-by-design-the-distributed-refrigerant-fallacy.jpg",
    pdfUrl:
      "/pdfs/white-papers/leakage-by-design-the-distributed-refrigerant-fallacy.pdf",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "AI Alone Will Crash and Burn in Engineering",
    category: "White Papers",
    date: "Nov 23, 2025",
    image: "/img/thumbnails/ai-alone-will-crash.jpg",
    pdfUrl: "/pdfs/white-papers/ai-alone-will-crash.pdf",
    readTime: "5 min read",
  },
];

const whitePaperList: PdfCardItemType[] = [
  {
    name: "Hidden Cost of In-House Takeoffs",
    pdfUrl: "/pdfs/white-papers/hidden-cost-of-in-house-takeoffs.pdf",
    thumbnail: "/img/thumbnails/hidden-cost-of-in-house-takeoffs.jpg",
  },
  {
    name: "Leakage by Design: The Distributed Refrigerant Fallacy",
    pdfUrl:
      "/pdfs/white-papers/leakage-by-design-the-distributed-refrigerant-fallacy.pdf",
    thumbnail:
      "/img/thumbnails/leakage-by-design-the-distributed-refrigerant-fallacy.jpg",
  },
  {
    name: "AI Alone Will Crash and Burn in Engineering",
    pdfUrl: "/pdfs/white-papers/ai-alone-will-crash.pdf",
    thumbnail: "/img/thumbnails/ai-alone-will-crash.jpg",
  },
];

export {
  defaultHeaderMenuItems,
  faq,
  portalCardList,
  projectList,
  serviceSections,
  testimonials,
  securityList,
  aboutUsAccordionList,
  solutions,
  highlights,
  regions,
  whitePaperList,
  insightsData,
  whitePapers,
};
