import { ServiceSectionType, TestimonialCardProps } from "../types";

export const serviceSections: ServiceSectionType[] = [
  {
    title: "Spec Review",
    image: "/img/digital.png",
    description:
      "Our team of skilled engineers provide reliable take-off services for construction projects across all fields including Civil , MEP systems and general purpose buildings using advanced software like Bluebeam, Planswift, and OnScreen takeoff to meticulously measure quantities from floor plans which are compiled into comprehensive, accurately organized reports as per your requirements.",
  },
  {
    title: "Quantity Take-Offs",
    image: "/img/specs.png",
    description:
      "Poorly detailed fabrication drawings can result in rework, delays, and material waste. JES solves this with manufacturing-grade shop drawings derived from clash-coordinated BIM models.",
  },

  {
    title: "Equipment Selection",
    image: "/img/digital.png",
    description:
      "Design specifications often carry gaps or inconsistencies that surface only during execution. JES helps you prevent those problems early by conducting in-depth MEP Specification Reviews. We cross-check technical specs, design parameters, and product selections against project standards such as ASHRAE, NFPA, and local codes.",
  },
  {
    title: "Revit Models Component and Assembly",
    image: "/img/engg.png",
    description:
      "Speed up equipment approvals with JES’s Digital Submittals. Centralized documentation, BIM integration, and faster RFI turnaround. ",
  },
  {
    title: "BIM Modelling",
    image: "/img/engg.png",
    description:
      "Speed up equipment approvals with JES’s Digital Submittals. Centralized documentation, BIM integration, and faster RFI turnaround. ",
  },
  {
    title: "Duct & Pipe Layouts",
    image: "/img/bim.png",
    description:
      "Multi-trade? Multi-format? JES handles Complex Submittals with ease—across formats, trades, and consultants.",
  },
  {
    title: "Energy Modeling",
    image: "/img/engg.png",
    description:
      "From LOD 100 to 500, JES delivers BIM models that are accurate, clash-free, and construction-ready—designed to keep your projects flowing.",
  },
  {
    title: "AR & VR Modeling",
    image: "/img/manufacturing.png",
    description:
      "See your projects before they’re built. JES creates immersive 3D environments with AR/VR tools that enhance stakeholder buy-in and design clarity.",
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
