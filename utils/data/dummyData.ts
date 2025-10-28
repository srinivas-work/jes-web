import {
  ProjectItemType,
  ServiceSectionType,
  TestimonialCardProps,
} from "../types";

export const serviceSections: ServiceSectionType[] = [
  {
    title: "Quantity Take-Offs",
    image: "/img/specs.png",
    description:
      "Our team of skilled engineers provide reliable take-off services for construction projects across all fields including Civil , MEP systems and general purpose buildings using advanced software like Bluebeam, Planswift, and OnScreen takeoff to meticulously measure quantities from floor plans which are compiled into comprehensive, accurately organized reports as per your requirements.",
  },
  {
    title: "Equipment/Product Selection",
    image: "/img/digital.png",
    description:
      "Design specifications often carry gaps or inconsistencies that surface only during execution. JES helps you prevent those problems early by conducting in-depth MEP Specification Reviews. We cross-check technical specs, design parameters, and product selections against project standards such as ASHRAE, NFPA, and local codes.",
  },
  {
    title: "Spec Review",
    image: "/img/digital.png",
    description:
      "Our team of skilled engineers provide reliable take-off services for construction projects across all fields including Civil , MEP systems and general purpose buildings using advanced software like Bluebeam, Planswift, and OnScreen takeoff to meticulously measure quantities from floor plans which are compiled into comprehensive, accurately organized reports as per your requirements.",
  },

  {
    title: "BIM Modelling",
    image: "/img/engg.png",
    description:
      "Speed up equipment approvals with JES’s Digital Submittals. Centralized documentation, BIM integration, and faster RFI turnaround. ",
  },
  {
    title: "Revit Models: Component & Assembly",
    image: "/img/engg.png",
    description:
      "Speed up equipment approvals with JES’s Digital Submittals. Centralized documentation, BIM integration, and faster RFI turnaround. ",
  },
  {
    title: "AR/VR Modelling",
    image: "/img/manufacturing.png",
    description:
      "See your projects before they’re built. JES creates immersive 3D environments with AR/VR tools that enhance stakeholder buy-in and design clarity.",
  },
  {
    title: "MEP Drafting",
    image: "/img/bim.png",
    description:
      "Multi-trade? Multi-format? JES handles Complex Submittals with ease—across formats, trades, and consultants.",
  },
  {
    title: "Energy Modelling/Building Engineering Services",
    image: "/img/engg.png",
    description:
      "From LOD 100 to 500, JES delivers BIM models that are accurate, clash-free, and construction-ready—designed to keep your projects flowing.",
  },
];

export const services = [
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

export const testimonials: TestimonialCardProps[] = [
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

const projects: ProjectItemType[] = [
  {
    name: "KIPP School Washington DC, USA",
    imgLink: "/img/projects/kipp-school.jpg",
    thumbnailLink: "/img/projects/kipp-school-thumb.jpg",
    location: "Lusail City, Qatar",
    overview:
      "KIPP DC Quest Academy educates District of Columbia children in Grades 1 through 4. KIPP DC Elementary Schools work with students to become thoughtful thinkers and teammates who will return as college-educated leaders of their community. Upon completion of fourth grade, Quest Academy students move onto KIPP DC Valor Academy.",
    client: "Qatari Diar & Lusail City",
    contractor: "Voltas Ltd.",
    serviceType: "BIM Modeling",
  },
  {
    name: "Shura Island - HC02 & HC03, KSA",
    imgLink: "/img/projects/shura-island.jpg",
    location: "Kingdom of Saudi Arabia",
    overview:
      "Shura is the main hub island at The Red Sea. With a natural dolphin shape, the island is one of 92 in our archipelago and home to stunning vistas, incredible native fauna and flora, and beautiful wildlife. Due to open to guests in 2024, the island will house 11 world-class hotels and resorts including Edition, Fairmont, Raffles, SLS, InterContinental, Jumeirah, Miraval, Rosewood and Grand Hyatt brands. Guests will have a wide choice of experiences and attractions to enjoy, including an 18-hole championship golf course, a marina and a beach club, as well as a variety of luxury retail options.",
    client: "Red Sea Global",
    contractor: "Al Futtaim",
    serviceType: "BIM Modeling",
  },
  {
    name: "Lusail Boulevard, Qatar",
    imgLink: "/img/projects/lusail-boulevard.jpg",
    thumbnailLink: "/img/projects/lusail-boulevard-thumb.jpg",
    location: "Lusail City, Qatar",
    overview:
      "Lusail Boulevard is what truly modern and bustling City lifestyle offers: amazing architecture, retail, entertainment, restaurants and cafes, pedestrian and cycling pathways, all within walking distance to the iconic Lusail stadium , yet another architectural wonder and a stunning spectacle to behold.",
    client: "Qatari Diar & Lusail City",
    contractor: "Voltas Ltd.",
    serviceType: "Ductwork E.S.P calculation",
  },
  {
    name: "Al Bayt Stadium, Qatar",
    imgLink: "/img/projects/al_bayt_stadium.jpg",
    thumbnailLink: "/img/projects/al_bayt_stadium-thumb.jpg",
    location: "Lusail City, Qatar",
    overview:
      "Al Bayt Stadium hosted the opening match of the 2022 World Cup, and hosted a semi-final and a quarter-final match. The stadium hosted around 60,000 World Cup fans, including 1,000 seats for the press. The architectural design takes its inspiration from the traditional tents of the nomadic people of Qatar and the region. It features a retractable roof, providing covered seating for all spectators.",
    overviewOpt:
      "It connects to transportation systems and has onsite parking for 6,000 cars, 350 buses and the movement of 150 public buses/shuttles, as well as 1,000 taxis and water taxis. The stadium is certified for its sustainability credentials under the Global Sustainability Assessment System (GSAS) for a number of certifications representing sustainable design & build, construction management practices and the efficiency of its energy centre.",
    client: "Qatari Diar & Lusail City",
    contractor: "Voltas Ltd.",
    serviceType: "BIM Modeling",
  },
];
