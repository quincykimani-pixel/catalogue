import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function placeholder(seed: string, hex: string) {
  const text = encodeURIComponent(seed);
  return [
    `https://placehold.co/800x600/${hex}/FFFFFF?text=${text}`,
    `https://placehold.co/800x600/E2E5EA/12181F?text=${text}+2`,
  ];
}

const CATEGORY_COLOR: Record<string, string> = {
  "Solar & Energy": "1E8A4C",
  "Electrical": "0F2A4A",
  "3-Phase & Industrial": "0A1D33",
  "Lighting": "C98A1B",
  "Water & Power": "1E4270",
};

interface SeedProduct {
  name: string;
  category: string;
  price: number;
  shortDescription: string;
  description: string;
  specifications: { name: string; value: string }[];
  featured?: boolean;
}

const PRODUCTS: SeedProduct[] = [
  // SOLAR & ENERGY
  { name: "Solar Panel 550W", category: "Solar & Energy", price: 25000,
    shortDescription: "High-efficiency monocrystalline solar panel for residential and commercial use.",
    description: "High-efficiency monocrystalline solar panel suitable for residential and commercial solar installations. Built for durability under East African weather conditions with a robust aluminium frame and tempered glass.",
    specifications: [
      { name: "Wattage", value: "550W" },
      { name: "Type", value: "Monocrystalline" },
      { name: "Voltage", value: "41.8V" },
      { name: "Efficiency", value: "21.3%" },
    ], featured: true },
  { name: "Solar Inverter 5kW", category: "Solar & Energy", price: 145000,
    shortDescription: "Grid-tie/hybrid inverter for medium-sized solar systems.",
    description: "A reliable 5kW hybrid solar inverter that manages power flow between panels, batteries and the grid, with built-in monitoring.",
    specifications: [
      { name: "Capacity", value: "5kW" },
      { name: "Type", value: "Hybrid" },
      { name: "Input Voltage", value: "150-500V DC" },
    ], featured: true },
  { name: "Solar Battery 200Ah", category: "Solar & Energy", price: 68000,
    shortDescription: "Deep-cycle lithium battery for solar energy storage.",
    description: "Long-life lithium iron phosphate battery designed for daily deep-cycle use in off-grid and hybrid solar systems.",
    specifications: [
      { name: "Voltage", value: "12V" },
      { name: "Capacity", value: "200Ah" },
      { name: "Energy", value: "2.4kWh" },
    ] },
  { name: "Solar Charge Controller 60A MPPT", category: "Solar & Energy", price: 18500,
    shortDescription: "MPPT charge controller for efficient battery charging.",
    description: "MPPT solar charge controller that maximises panel output and protects batteries from overcharge and deep discharge.",
    specifications: [
      { name: "Type", value: "MPPT" },
      { name: "Rating", value: "60A" },
      { name: "System Voltage", value: "12/24/48V Auto" },
    ] },
  { name: "Solar Cable 6mm² (per metre)", category: "Solar & Energy", price: 180,
    shortDescription: "UV-resistant double-insulated solar cable.",
    description: "Double-insulated, UV-resistant DC cable rated for outdoor solar installations, sold per metre.",
    specifications: [
      { name: "Size", value: "6mm²" },
      { name: "Colour", value: "Black / Red" },
    ] },
  { name: "MC4 Connectors (Pair)", category: "Solar & Energy", price: 450,
    shortDescription: "Weatherproof MC4 connector pair for solar cabling.",
    description: "Standard MC4 male/female connector pair for making watertight solar panel cable connections.",
    specifications: [
      { name: "Pair", value: "Male + Female" },
      { name: "Type", value: "MC4 Standard" },
    ] },
  { name: "DC Isolator 32A", category: "Solar & Energy", price: 3200,
    shortDescription: "DC isolator switch for solar array disconnection.",
    description: "Rotary DC isolator used to safely disconnect solar panel strings for maintenance.",
    specifications: [
      { name: "Pole", value: "2 Pole" },
      { name: "Amp", value: "32A" },
    ] },
  { name: "DC/AC Breaker 20A", category: "Solar & Energy", price: 2100,
    shortDescription: "Circuit breaker rated for solar DC/AC protection.",
    description: "Miniature circuit breaker suitable for both DC and AC protection in solar installations.",
    specifications: [
      { name: "Pole", value: "1 Pole" },
      { name: "Amp", value: "20A" },
    ] },
  { name: "Solar SPD Type 2 (DC)", category: "Solar & Energy", price: 5400,
    shortDescription: "Surge protection device for DC solar circuits.",
    description: "Type 2 surge protection device protecting solar DC circuits from lightning-induced surges.",
    specifications: [
      { name: "Type", value: "DC Type 2" },
      { name: "Rating", value: "40kA" },
    ] },
  { name: "Combiner Box 4-String", category: "Solar & Energy", price: 9800,
    shortDescription: "Weatherproof combiner box for multiple solar strings.",
    description: "IP65-rated combiner box that consolidates multiple PV strings with integrated fusing and surge protection.",
    specifications: [
      { name: "String", value: "4-Way" },
      { name: "Rating", value: "IP65" },
    ] },
  { name: "Mounting Rail Kit", category: "Solar & Energy", price: 6500,
    shortDescription: "Aluminium rail, clamp and bracket kit for roof mounting.",
    description: "Complete aluminium mounting kit including rails, mid clamps, end clamps and roof brackets for a standard panel installation.",
    specifications: [
      { name: "Rails", value: "2 x 2.1m" },
      { name: "Includes", value: "Clamps + Brackets" },
    ] },
  { name: "Earthing Kit Complete", category: "Solar & Energy", price: 7200,
    shortDescription: "Full earthing kit for solar array grounding.",
    description: "Complete earthing kit including earth rod, clamps and cable for grounding a solar PV array.",
    specifications: [
      { name: "Kit", value: "Complete" },
    ] },
  { name: "Cable Glands (Pack of 10)", category: "Solar & Energy", price: 1500,
    shortDescription: "Waterproof cable glands for enclosure entries.",
    description: "IP68 waterproof cable glands used to seal cable entry points on inverters and combiner boxes.",
    specifications: [
      { name: "Size", value: "PG16" },
      { name: "Pack", value: "10 pcs" },
    ] },

  // ELECTRICAL
  { name: "Flexible Cable 2.5mm² (per metre)", category: "Electrical", price: 95,
    shortDescription: "Multi-strand flexible copper cable.",
    description: "General purpose flexible copper cable for indoor wiring, sold per metre.",
    specifications: [
      { name: "Size", value: "2.5mm²" },
      { name: "Conductor", value: "Copper" },
    ] },
  { name: "MCB 20A Single Pole", category: "Electrical", price: 650,
    shortDescription: "Miniature circuit breaker for circuit protection.",
    description: "Single pole miniature circuit breaker protecting lighting and socket circuits from overload.",
    specifications: [
      { name: "Pole", value: "1 Pole" },
      { name: "Amp", value: "20A" },
      { name: "Curve", value: "Type C" },
    ], featured: true },
  { name: "RCCB 40A 30mA", category: "Electrical", price: 3800,
    shortDescription: "Residual current circuit breaker for earth-leakage protection.",
    description: "Double pole RCCB providing earth-leakage protection for domestic and commercial circuits.",
    specifications: [
      { name: "Pole", value: "2 Pole" },
      { name: "Amp", value: "40A" },
      { name: "mA", value: "30mA" },
    ] },
  { name: "SPD Type 2 (AC)", category: "Electrical", price: 6200,
    shortDescription: "Surge protection device for AC distribution boards.",
    description: "Type 2 surge protection device installed at the distribution board to protect connected equipment.",
    specifications: [
      { name: "Pole", value: "1P+N" },
      { name: "Rating", value: "40kA" },
    ] },
  { name: "Changeover Switch 63A", category: "Electrical", price: 8500,
    shortDescription: "Manual changeover switch for backup power.",
    description: "Manual changeover switch allowing safe switching between mains and generator power.",
    specifications: [
      { name: "Amp", value: "63A" },
      { name: "Pole", value: "4 Pole" },
    ] },
  { name: "ATS 63A", category: "Electrical", price: 42000,
    shortDescription: "Automatic transfer switch for generator backup.",
    description: "Automatic transfer switch that seamlessly transfers load between the grid and a standby generator.",
    specifications: [
      { name: "Amp", value: "63A" },
      { name: "Pole", value: "4 Pole" },
    ] },
  { name: "Contactor 40A", category: "Electrical", price: 4200,
    shortDescription: "3-pole contactor for motor and load switching.",
    description: "3-pole electromagnetic contactor used for remote switching of motors and heavy loads.",
    specifications: [
      { name: "Amp", value: "40A" },
      { name: "Coil Voltage", value: "230V AC" },
    ] },
  { name: "Overload Relay 18-25A", category: "Electrical", price: 3600,
    shortDescription: "Thermal overload relay for motor protection.",
    description: "Adjustable thermal overload relay protecting motors from sustained overcurrent conditions.",
    specifications: [
      { name: "Range", value: "18-25A" },
    ] },
  { name: "Digital Timer Switch", category: "Electrical", price: 2400,
    shortDescription: "Programmable timer for automated switching.",
    description: "Digital programmable timer switch for automating lighting and equipment on a daily schedule.",
    specifications: [
      { name: "Type", value: "Digital" },
      { name: "Rating", value: "16A" },
    ] },
  { name: "Relay 16A", category: "Electrical", price: 950,
    shortDescription: "General purpose control relay.",
    description: "General purpose electromagnetic relay used in control panels and automation circuits.",
    specifications: [
      { name: "Type", value: "SPDT" },
      { name: "Voltage", value: "230V" },
    ] },
  { name: "Consumer Unit 12-Way", category: "Electrical", price: 11500,
    shortDescription: "12-way distribution board for domestic wiring.",
    description: "12-way metal-clad consumer unit for organising and protecting domestic electrical circuits.",
    specifications: [
      { name: "Ways", value: "12" },
    ], featured: true },
  { name: "Switch & Socket Combo", category: "Electrical", price: 850,
    shortDescription: "Wall-mounted switch and socket unit.",
    description: "Durable wall-mounted single switch and 13A socket combination for general use.",
    specifications: [
      { name: "Type", value: "1 Gang Switch + Socket" },
    ] },

  // 3-PHASE & INDUSTRIAL
  { name: "3-Phase Cable 4mm² (per metre)", category: "3-Phase & Industrial", price: 420,
    shortDescription: "4-core armoured cable for 3-phase supply.",
    description: "4-core copper armoured cable suitable for 3-phase power distribution, sold per metre.",
    specifications: [
      { name: "Core", value: "4 Core" },
      { name: "Size", value: "4mm²" },
    ] },
  { name: "3-Phase MCB 32A", category: "3-Phase & Industrial", price: 4600,
    shortDescription: "Triple pole MCB for 3-phase circuit protection.",
    description: "Triple pole miniature circuit breaker protecting 3-phase circuits from overload and short circuit.",
    specifications: [
      { name: "Pole", value: "3 Pole" },
      { name: "Amp", value: "32A" },
    ] },
  { name: "3-Phase Changeover Switch 100A", category: "3-Phase & Industrial", price: 26000,
    shortDescription: "Manual 3-phase changeover for generator backup.",
    description: "Heavy-duty manual changeover switch for 3-phase installations switching between mains and generator.",
    specifications: [
      { name: "Amp", value: "100A" },
      { name: "Pole", value: "4 Pole" },
    ] },
  { name: "Industrial Contactor 63A", category: "3-Phase & Industrial", price: 9200,
    shortDescription: "Heavy-duty contactor for industrial motor control.",
    description: "Industrial-grade 3-pole contactor built for frequent switching of large motors and loads.",
    specifications: [
      { name: "Amp", value: "63A" },
      { name: "Coil Voltage", value: "230V AC" },
    ] },
  { name: "Industrial Protection Relay", category: "3-Phase & Industrial", price: 14500,
    shortDescription: "Multi-function protection relay for 3-phase systems.",
    description: "Protection relay monitoring voltage, phase sequence and overload conditions on 3-phase circuits.",
    specifications: [
      { name: "Type", value: "Multi-function" },
    ] },

  // LIGHTING
  { name: "LED Panel Light 60x60 40W", category: "Lighting", price: 2800,
    shortDescription: "Recessed LED panel for offices and commercial spaces.",
    description: "Slim recessed LED panel light providing even, energy-efficient illumination for offices and commercial interiors.",
    specifications: [
      { name: "Wattage", value: "40W" },
      { name: "Size", value: "600x600mm" },
    ], featured: true },
  { name: "Crystal Chandelier 8-Light", category: "Lighting", price: 32000,
    shortDescription: "Decorative crystal chandelier for feature spaces.",
    description: "8-light crystal chandelier designed as a statement fixture for lobbies, dining rooms and event spaces.",
    specifications: [
      { name: "Size", value: "800mm dia" },
      { name: "Design", value: "8-Arm Crystal" },
    ] },
  { name: "Pendant Light Industrial", category: "Lighting", price: 4500,
    shortDescription: "Industrial-style pendant light fixture.",
    description: "Metal-shade pendant light fixture with an industrial finish, suited to cafes and retail spaces.",
    specifications: [
      { name: "Design", value: "Industrial Metal Shade" },
      { name: "Wattage", value: "E27 Bulb" },
    ] },
  { name: "Magnetic Track Light Kit 2m", category: "Lighting", price: 15500,
    shortDescription: "Modular magnetic track lighting system.",
    description: "2-metre magnetic track lighting kit with adjustable spotlight fittings for flexible retail and gallery lighting.",
    specifications: [
      { name: "Track", value: "2m" },
      { name: "Fittings", value: "4 Heads Included" },
    ] },
  { name: "LED Floodlight 100W", category: "Lighting", price: 3200,
    shortDescription: "Weatherproof outdoor floodlight.",
    description: "High-output IP65 LED floodlight for security, yard and outdoor commercial lighting.",
    specifications: [
      { name: "Wattage", value: "100W" },
    ] },
  { name: "Solar Street Light 60W All-in-One", category: "Lighting", price: 12800,
    shortDescription: "Integrated solar street light with motion sensor.",
    description: "All-in-one solar street light with integrated panel, battery, LED and motion sensor for off-grid lighting.",
    specifications: [
      { name: "Wattage", value: "60W" },
      { name: "Type", value: "All-in-One Solar" },
    ], featured: true },

  // WATER & POWER
  { name: "Electric Water Heater 50L", category: "Water & Power", price: 15500,
    shortDescription: "Storage water heater for household hot water.",
    description: "50-litre storage electric water heater with thermostat control for reliable household hot water.",
    specifications: [
      { name: "Capacity", value: "50L" },
    ] },
  { name: "Rain Shower Head Set", category: "Water & Power", price: 3400,
    shortDescription: "Overhead rain shower head with mixer set.",
    description: "Wide overhead rain shower head paired with a mixer set for a modern bathroom finish.",
    specifications: [
      { name: "Type", value: "Overhead Rain" },
    ] },
  { name: "Portable Power Station 1000W", category: "Water & Power", price: 89000,
    shortDescription: "Portable battery power station with multiple outputs.",
    description: "1000W portable power station with AC, USB and DC outputs, ideal for backup power and outdoor use.",
    specifications: [
      { name: "Capacity", value: "1kW / 1kWh" },
    ], featured: true },
];

async function main() {
  await prisma.product.deleteMany();
  let count = 0;
  for (const p of PRODUCTS) {
    const slug = slugify(p.name);
    const hex = CATEGORY_COLOR[p.category] ?? "0F2A4A";
    await prisma.product.create({
      data: {
        name: p.name,
        slug,
        category: p.category,
        price: p.price,
        sku: `KYX-${(count + 1).toString().padStart(4, "0")}`,
        shortDescription: p.shortDescription,
        description: p.description,
        images: placeholder(p.name, hex),
        specifications: p.specifications,
        availability: "In Stock",
        featured: !!p.featured,
      },
    });
    count++;
  }
  console.log(`Seeded ${count} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
