import React from 'react';
import { 
  Beaker, Layers, Activity, Factory, 
  Cpu, Zap, Settings, ShieldCheck, Box
} from 'lucide-react';

export const coreProducts = [
  { id: 1, name: "Tube Furnace", description: "High-temp material synthesis and calcination.", specs: "Up to 1200°C", code: "DAS-CORE-01", image: "/Tube Furnace.svg", icon: <Cpu className="w-6 h-6" /> },
  { id: 2, name: "Muffle Furnace", description: "High-precision heat treatment for battery powders.", specs: "Up to 1100°C", code: "DAS-CORE-02", image: "/Muffle Furnace.svg", icon: <Cpu className="w-6 h-6" /> },
  { id: 3, name: "Planetary Ball Mill", description: "Nano-scale material grinding and mixing.", specs: "600rpm high-energy", code: "DAS-CORE-03", image: "/Planetary Ball Mill.svg", icon: <Settings className="w-6 h-6" /> },
  { id: 4, name: "Vacuum Mixer", description: "Bubble-free electrode slurry preparation.", specs: "Vacuum < -0.09MPa", code: "DAS-CORE-04", image: "/Vacuum Mixer.svg", icon: <Zap className="w-6 h-6" /> },
  { id: 5, name: "Battery Testing Machine", description: "Multi-channel cycling and capacity validation.", specs: "8/16/32 Channels", code: "DAS-CORE-05", image: "/Battery Testing Machine.svg", icon: <Activity className="w-6 h-6" /> },
  { id: 6, name: "Film Coater Machine", description: "Precision electrode film application.", specs: "Width: 200mm", code: "DAS-CORE-06", image: "/Film Coater Machine.svg", icon: <Box className="w-6 h-6" /> },
  { id: 7, name: "Battery Sealing Machine", description: "Hydraulic sealing for various cell formats.", specs: "Max 20MPa force", code: "DAS-CORE-07", image: "/Battery Sealing Machine.svg", icon: <ShieldCheck className="w-6 h-6" /> },
  { id: 8, name: "Roll Press Machine", description: "High-precision electrode calendering.", specs: "Gap: 0-2mm accuracy", code: "DAS-CORE-08", image: "/ROLL PRESSING MACHINE.svg", icon: <ShieldCheck className="w-6 h-6" /> },
  { id: 9, name: "Electrolyte Filling Machine", description: "Precision electrolyte dispensing systems.", specs: "Accuracy: ±1%", code: "DAS-CORE-09", image: "/Electrolyte Filling Machine.svg", icon: <Settings className="w-6 h-6" /> },
  { id: 10, name: "Glove Box", description: "Controlled inert atmosphere workstations.", specs: "H2O/O2 < 1ppm", code: "DAS-CORE-10", image: "/glovebox.svg", icon: <ShieldCheck className="w-6 h-6" /> },
  { id: 11, name: "Vacuum Drying Oven", description: "Moisture removal for cell components.", specs: "Up to 250°C", code: "DAS-CORE-11", image: "/Vacuum Drying Oven.svg", icon: <Cpu className="w-6 h-6" /> },
  { id: 12, name: "Punching Machine", description: "Precision electrode disc cutting.", specs: "Die size: 8-24mm", code: "DAS-CORE-12", image: "/Punching Machine.svg", icon: <Box className="w-6 h-6" /> },
  { id: 13, name: "Sheet Cutting Machine", description: "Large format electrode sheet preparation.", specs: "High-speed shearing", code: "DAS-CORE-13", image: "/Sheet Cutting Machine.svg", icon: <Box className="w-6 h-6" /> },
  { id: 14, name: "Electrode Diffusion Machine", description: "Accelerated electrolyte soaking systems.", specs: "Vacuum-pressure cycles", code: "DAS-CORE-14", image: "/Electrode Diffusion Machine.svg", icon: <Zap className="w-6 h-6" /> },
  { id: 15, name: "Ultrasonic Spot Welding", description: "Precision tab-to-collector welding.", specs: "20kHz Industrial", code: "DAS-CORE-15", image: "/Ultrasonic Spot Welding Machine.svg", icon: <Zap className="w-6 h-6" /> },
  { id: 16, name: "Spot Welding Machine", description: "Bottom tab and terminal welding.", specs: "Dual-pulse precision", code: "DAS-CORE-16", image: "/SPOT WELDING.svg", icon: <Zap className="w-6 h-6" /> },
  { id: 17, name: "Electrode Winding Machine", description: "Cylindrical jellyroll winding system.", specs: "Auto tension control", code: "DAS-CORE-17", image: "/Electrode Winding Machine.svg", icon: <Settings className="w-6 h-6" /> },
  { id: 18, name: "Cylindrical Case Sealing", description: "Automatic cap and safety valve sealing.", specs: "PLC Controlled", code: "DAS-CORE-18", image: "/Cylindrical Cases Sealing Machine.svg", icon: <ShieldCheck className="w-6 h-6" /> },
  { id: 19, name: "Grooving Machine", description: "Cylindrical case grooving and preparation.", specs: "Uniform depth control", code: "DAS-CORE-19", image: "/Grooving Machine.svg", icon: <Settings className="w-6 h-6" /> },
  { id: 20, name: "Die Cutter Machine", description: "Pouch electrode precise shape cutting.", specs: "Custom die support", code: "DAS-CORE-20", image: "/Die_Cutter_Machine.svg", icon: <Box className="w-6 h-6" /> },
  { id: 21, name: "Stacking Machine", description: "Multi-layer Z-fold or sheet stacking.", specs: "High-speed automated", code: "DAS-CORE-21", image: "/Stacking Machine.svg", icon: <Layers className="w-6 h-6" /> },
  { id: 22, name: "Top & Side Sealing", description: "Pouch cell case thermal sealing.", specs: "Dual-heat control", code: "DAS-CORE-22", image: "/Top & Side Sealing Machine.svg", icon: <ShieldCheck className="w-6 h-6" /> },
  { id: 23, name: "Forming Machine", description: "Initial cell activation and grading.", specs: "High-precision formation", code: "DAS-CORE-23", image: "/Forming Machine.svg", icon: <Activity className="w-6 h-6" /> },
  { id: 24, name: "Ultrasonic Welder", description: "Heavy-duty ultrasonic metal welding.", specs: "Multi-layer capability", code: "DAS-CORE-24", image: "/Ultrasonic Spot Welding Machine.svg", icon: <Zap className="w-6 h-6" /> }
];

export const productCategories = [
  {
    id: 'coin',
    name: "Coin Cell Line",
    icon: <Box />,
    description: "Complete laboratory-scale fabrication solutions for CR20xx series research.",
    features: ["Precision Sealing", "Manual/Auto Filling", "Compact R&D Design"],
    image: "/coin_cell.svg"
  },
  {
    id: 'pouch',
    name: "Pouch Cell Line",
    icon: <Layers />,
    description: "Advanced pilot line equipment for high-performance pouch cell assembly.",
    features: ["Vacuum Sealing", "Precision Stacking", "Ultrasonic Tab Welding"],
    image: "/pouch_cell.svg"
  },
  {
    id: 'cylindrical',
    name: "Cylindrical Cell Line",
    icon: <Cpu />,
    description: "Industrial-grade equipment for 18650, 21700, and 4680 cell production.",
    features: ["Grooving & Sealing", "Automatic Winding", "Electrolyte Injection"],
    image: "/cylindrical_cell.svg"
  },
  {
    id: 'prismatic',
    name: "Prismatic Cell Line",
    icon: <Box />,
    description: "Large-format cell fabrication lines for EV and Energy Storage Systems.",
    features: ["Heavy Duty Pressing", "Laser Welding Support", "Process Safety"],
    image: "/prismatic_cell.svg"
  },
  {
    id: 'glovebox',
    name: "Glove Box Systems",
    icon: <ShieldCheck />,
    description: "Stainless steel inert atmosphere workstations with ultra-low moisture levels.",
    features: ["H2O/O2 < 1ppm", "PLC Control System", "Modular Scalability"],
    image: "/logo_official.png"
  },
  {
    id: 'ecw',
    name: "Electrochemical Workstation",
    icon: <Activity />,
    description: "High-precision potentiostats and EIS analyzers for fundamental research.",
    features: ["EIS Analysis", "Multi-channel Support", "Expert Software"],
    image: "/logo_official.png"
  }
];

export const ecosystems = {
  coin: {
    title: "Coin Cell And | Lab R&D Equipment",
    mainProduct: "/coin_cell.svg",
    items: [
      { id: 'coin-1', name: 'Tube Furnace', code: 'DAS-TF12', type: 'thermal', desc: '1200°C split tube furnace for material synthesis.', image: '/Tube Furnace.svg', specs: ["Max Temp: 1200°C", "Quartz Tube: 60/80/100mm", "Heating Zone: 300mm"] },
      { id: 'coin-2', name: 'Muffle Furnace', code: 'DAS-MF10', type: 'thermal', desc: 'High temperature muffle furnace for calcination.', image: '/Muffle Furnace.svg', specs: ["Max Temp: 1100°C", "Chamber Size: 300x200x200mm", "Precision: ±1°C"] },
      { id: 'coin-3', name: 'Planetary Ball Mill', code: 'DAS-PBM4', type: 'mixing', desc: 'High energy ball milling for powder preparation.', image: '/Planetary Ball Mill.svg', specs: ["Jar Capacity: 50ml - 500ml", "Max Speed: 600rpm", "Timing: 1-9999min"] },
      { id: 'coin-4', name: 'Vacuum Mixer', code: 'DAS-VM15', type: 'mixing', desc: 'Degassing and mixing slurry under vacuum.', image: '/Vacuum Mixer.svg', specs: ["Max Speed: 1500rpm", "Vacuum Level: -0.09MPa", "Container: 150ml/500ml"] },
      { id: 'coin-5', name: 'Battery Testing Machine', code: 'DAS-BT08', type: 'analysis', desc: 'Multi-channel capacity and cycle tester.', image: '/Battery Testing Machine.svg', specs: ["Channels: 8/16/32", "Voltage: 0-5V", "Current: 0-10A"] },
      { id: 'coin-6', name: 'Film Coater Machine', code: 'DAS-FC20', type: 'coating', desc: 'Precision electrode film application.', image: '/Film Coater Machine.svg', specs: ["Coating Width: 200mm", "Heating: Max 150°C", "Speed: 1-100mm/s"] },
      { id: 'coin-7', name: 'Battery Sealing Machine', code: 'DAS-BS20', type: 'assembly', desc: 'Hydraulic sealing for coin cell cases.', image: '/Battery Sealing Machine.svg', specs: ["Pressure: Max 20MPa", "Compatible: CR2016/2025/2032", "Operation: Hydraulic"] },
      { id: 'coin-8', name: 'Roll Press Machine', code: 'DAS-RP10', type: 'calendering', desc: 'High-precision electrode calendering.', image: '/ROLL PRESSING MACHINE.svg', specs: ["Roll Width: 100mm/200mm", "Gap Adjustment: 0-2mm", "Pressure: Max 10T"] },
      { id: 'coin-9', name: 'Electrolyte Filling Machine', code: 'DAS-EF01', type: 'assembly', desc: 'Precision electrolyte dispensing.', image: '/Electrolyte Filling Machine.svg', specs: ["Dose: 0.1ml - 10ml", "Accuracy: ±1%", "Control: Digital PLC"] },
      { id: 'coin-10', name: 'Glove Box', code: 'DAS-GB01', type: 'atmosphere', desc: 'Inert atmosphere assembly workstation.', image: '/glovebox.svg', specs: ["H2O/O2: < 1ppm", "Chamber: 1200x750x900mm", "Purification: Auto Regenerative"] },
      { id: 'coin-11', name: 'Vacuum Drying Oven', code: 'DAS-VO30', type: 'thermal', desc: 'Controlled drying for battery components.', image: '/Vacuum Drying Oven.svg', specs: ["Temp: RT+10 - 250°C", "Vacuum: < 133Pa", "Volume: 30L/50L/90L"] },
      { id: 'coin-12', name: 'Punching Machine', code: 'DAS-PM16', type: 'cutting', desc: 'Precision electrode disc punching.', image: '/Punching Machine.svg', specs: ["Die Size: 8-24mm", "Pressure: Manual/Pneumatic", "Operation: Spring-loaded return"] }
    ]
  },
  pouch: {
    title: "Pouch Cell And | Lab R&D Equipment",
    mainProduct: "/pouch_cell.svg",
    items: [
      { id: 201, name: "Tube Furnace", type: "thermal", code: "DAS-TF-P", desc: "Material heat treatment.", image: "/Tube Furnace.svg" },
      { id: 202, name: "Muffle Furnace", type: "thermal", code: "DAS-MF-P", desc: "Powder calcination.", image: "/Muffle Furnace.svg" },
      { id: 203, name: "Planetary Ball Mill", type: "mixing", code: "DAS-PBM-P", desc: "Material grinding.", image: "/Planetary Ball Mill.svg" },
      { id: 204, name: "Vacuum Mixer", type: "mixing", code: "DAS-VM-P", desc: "Slurry mixing.", image: "/Vacuum Mixer.svg" },
      { id: 205, name: "Film Coater Machine", type: "coating", code: "DAS-FCM-P", desc: "Precision coating.", image: "/Film Coater Machine.svg" },
      { id: 206, name: "Roll Press Machine", type: "calendering", code: "DAS-RPM-P", desc: "Calendering.", image: "/ROLL PRESSING MACHINE.svg" },
      { id: 207, name: "Die Cutter Machine", type: "cutting", code: "DAS-DCM-P", desc: "Pouch electrode cutting.", image: "/Die_Cutter_Machine.svg" },
      { id: 208, name: "Stacking Machine", type: "assembly", code: "DAS-STM-P", desc: "Multi-layer stacking.", image: "/Stacking Machine.svg" },
      { id: 209, name: "Ultrasonic Welder", type: "assembly", code: "DAS-UW-P", desc: "Tab welding.", image: "/Ultrasonic Spot Welding Machine.svg" },
      { id: 210, name: "Vacuum Drying Oven", type: "thermal", code: "DAS-VDO-P", desc: "Final drying.", image: "/Vacuum Drying Oven.svg" },
      { id: 211, name: "Forming Machine", type: "analysis", code: "DAS-FM-P", desc: "Cell formation.", image: "/Forming Machine.svg" },
      { id: 212, name: "Top & Side Sealing", type: "assembly", code: "DAS-TSS-P", desc: "Case sealing.", image: "/Top & Side Sealing Machine.svg" },
      { id: 213, name: "Glove Box", type: "atmosphere", code: "DAS-GB-P", desc: "Pouch assembly.", image: "/glovebox.svg" },
      { id: 214, name: "Electrolyte Filling", type: "assembly", code: "DAS-EFM-P", desc: "Pouch filling.", image: "/Electrolyte Filling Machine.svg" },
      { id: 215, name: "Vacuum Sealing Machine", type: "assembly", code: "DAS-VSM-P", desc: "Pouch sealing.", image: "/Top & Side Sealing Machine.svg" },
      { id: 216, name: "Battery Tester Machine", type: "analysis", code: "DAS-BT-P", desc: "Pouch cell testing.", image: "/Battery Testing Machine.svg" }
    ]
  },
  cylindrical: {
    title: "Cylindrical Cell And | Lab R&D Equipment",
    mainProduct: "/cylindrical_cell.svg",
    items: [
      { id: 301, name: "Tube Furnace", type: "thermal", code: "DAS-TF-C", desc: "Active material synthesis.", image: "/Tube Furnace.svg" },
      { id: 302, name: "Planetary Ball Mill", type: "mixing", code: "DAS-PBM-C", desc: "High-energy milling.", image: "/Planetary Ball Mill.svg" },
      { id: 303, name: "Vacuum Mixing", type: "mixing", code: "DAS-VM-C", desc: "Homogeneous slurry prep.", image: "/Vacuum Mixer.svg" },
      { id: 304, name: "Electrode Coating", type: "coating", code: "DAS-EC-C", desc: "Continuous roll-to-roll coating.", image: "/Film Coater Machine.svg" },
      { id: 305, name: "Heat Rolling Press Machine", type: "calendering", code: "DAS-HRP-C", desc: "Precision calendering.", image: "/ROLL PRESSING MACHINE.svg" },
      { id: 306, name: "Sheet Cutting", type: "cutting", code: "DAS-SC-C", desc: "Electrode sheet preparation.", image: "/Sheet Cutting Machine.svg" },
      { id: 307, name: "Vacuum Drying", type: "thermal", code: "DAS-VD-C", desc: "Moisture removal.", image: "/Vacuum Drying Oven.svg" },
      { id: 308, name: "Ultrasonic Spot Welding Machine", type: "assembly", code: "DAS-USW-C", desc: "Tab-to-collector welding.", image: "/Ultrasonic Spot Welding Machine.svg" },
      { id: 309, name: "Electrode Winding", type: "assembly", code: "DAS-EW-C", desc: "Cylindrical jellyroll winding.", image: "/Electrode Winding Machine.svg" },
      { id: 310, name: "Spot Welding", type: "assembly", code: "DAS-SW-C", desc: "Bottom tab welding.", image: "/SPOT WELDING.svg" },
      { id: 311, name: "Grooving", type: "assembly", code: "DAS-GM-C", desc: "Cylindrical case grooving.", image: "/Grooving Machine.svg" },
      { id: 312, name: "Glove Box", type: "atmosphere", code: "DAS-GB-C", desc: "Assembly under inert gas.", image: "/glovebox.svg" },
      { id: 313, name: "Electrolyte Filling Machine", type: "assembly", code: "DAS-EF-C", desc: "High-precision filling.", image: "/Electrolyte Filling Machine.svg" },
      { id: 314, name: "Electrode Diffusion", type: "assembly", code: "DAS-ED-C", desc: "Electrolyte soaking process.", image: "/Electrode Diffusion Machine.svg" },
      { id: 315, name: "Cylindrical Cases Sealing Machine", type: "assembly", code: "DAS-CSM-C", desc: "Cap and safety valve sealing.", image: "/Cylindrical Cases Sealing Machine.svg" },
      { id: 316, name: "5V 3A6A 8Channel Battery Testing Machine", type: "analysis", code: "DAS-BTM-C", desc: "Performance characterization.", image: "/Battery Testing Machine.svg" }
    ]
  },
  prismatic: {
    title: "Prismatic Cell And | Lab R&D Equipment",
    mainProduct: "/prismatic_cell.svg",
    items: [
      { id: 401, name: "Vacuum Mixer", type: "mixing", code: "DAS-VM-S", desc: "Large batch slurry.", image: "/Vacuum Mixer.svg" },
      { id: 402, name: "Film Coater Machine", type: "coating", code: "DAS-FCM-S", desc: "Wide format coating.", image: "/Film Coater Machine.svg" },
      { id: 403, name: "Roll Press Machine", type: "calendering", code: "DAS-RPM-S", desc: "High force press.", image: "/ROLL PRESSING MACHINE.svg" },
      { id: 404, name: "Die Cutter Machine", type: "cutting", code: "DAS-DCM-S", desc: "Prismatic electrode cutting.", image: "/Die_Cutter_Machine.svg" },
      { id: 405, name: "Stacking Machine", type: "assembly", code: "DAS-STM-S", desc: "Automated cell stacking.", image: "/Stacking Machine.svg" },
      { id: 406, name: "Ultrasonic Welder", type: "assembly", code: "DAS-UW-S", desc: "Copper/Aluminum welding.", image: "/Ultrasonic Spot Welding Machine.svg" },
      { id: 407, name: "Vacuum Sealing Machine", type: "assembly", code: "DAS-VSM-S", desc: "Case sealing.", image: "/Top & Side Sealing Machine.svg" },
      { id: 408, name: "Electrolyte Filling Machine", type: "assembly", code: "DAS-EFM-S", desc: "High volume filling.", image: "/Electrolyte Filling Machine.svg" },
      { id: 409, name: "Glove Box", type: "atmosphere", code: "DAS-GB-S", desc: "Module assembly.", image: "/glovebox.svg" },
      { id: 410, name: "Top & Side Sealing", type: "assembly", code: "DAS-TSS-S", desc: "Final case closure.", image: "/Top & Side Sealing Machine.svg" },
      { id: 411, name: "Forming Machine", type: "analysis", code: "DAS-FM-S", desc: "Activation and grading.", image: "/Forming Machine.svg" },
      { id: 412, name: "Vacuum Drying Oven", type: "thermal", code: "DAS-VDO-S", desc: "Cell bake-out.", image: "/Vacuum Drying Oven.svg" }
    ]
  }
};
