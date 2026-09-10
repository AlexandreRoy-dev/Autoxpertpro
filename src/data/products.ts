import type { CategoryId } from "./categories";
import type { VendorId } from "./vendors";

export type Localized = { fr: string; en: string };

export type VendorOffer = {
  vendorId: VendorId;
  price: number;
  stock: number;
  shippingDays: number;
  sku: string;
};

export type ProductSpec = {
  key: string;
  label: Localized;
  value: Localized;
};

export type Product = {
  id: string;
  slug: string;
  categoryId: CategoryId;
  brand: string;
  partNumber: string;
  name: Localized;
  description: Localized;
  image: string;
  specs: ProductSpec[];
  fitmentIds: string[] | "all";
  offers: VendorOffer[];
  rating: number;
  reviewCount: number;
};

const civic = ["honda-civic-2018-15t", "honda-civic-2016-20"];
const rav4 = ["toyota-rav4-2018-25"];
const f150 = ["ford-f150-2021-35"];
const commonCars = [
  ...civic,
  ...rav4,
  "toyota-corolla-2021-20",
  "kia-rio-2009-16",
  "kia-sportage-2020-24",
  "hyundai-tucson-2019-20",
  "volkswagen-jetta-2019-14t",
  "mazda-cx5-2021-25",
  "nissan-rogue-2020-25",
  "subaru-outback-2018-25",
];

function offers(
  rows: Array<[VendorId, number, number, number, string]>,
): VendorOffer[] {
  return rows.map(([vendorId, price, stock, shippingDays, sku]) => ({
    vendorId,
    price,
    stock,
    shippingDays,
    sku,
  }));
}

export const products: Product[] = [
  {
    id: "napa-rotor-front",
    slug: "disque-frein-avant-ventile",
    categoryId: "brakes",
    brand: "NAPA",
    partNumber: "4884401",
    name: {
      fr: "Disque de frein avant ventilé, une pièce",
      en: "One-piece vented front brake rotor",
    },
    description: {
      fr: "Disque avant en fonte ventilée pour un freinage stable en ville et sur autoroute. Surface usinée, chapeau d’équilibrage et revêtement anticorrosion sur le chapeau. Compatibilité vérifiée pour les Honda Civic 1.5T et 2.0L de cette génération.",
      en: "Vented cast-iron front rotor for stable braking in town and on the highway. Machined face, balancing hat and anti-corrosion coating on the hat. Fitment checked for this Civic 1.5T and 2.0L generation.",
    },
    image: "/parts/rotor.svg",
    specs: [
      { key: "diameter", label: { fr: "Diamètre", en: "Diameter" }, value: { fr: "282 mm", en: "282 mm" } },
      { key: "height", label: { fr: "Hauteur", en: "Height" }, value: { fr: "47 mm", en: "47 mm" } },
      { key: "hub", label: { fr: "Alésage central", en: "Hub bore" }, value: { fr: "64,2 mm", en: "64.2 mm" } },
      { key: "holes", label: { fr: "Nombre de trous", en: "Bolt holes" }, value: { fr: "5", en: "5" } },
      { key: "type", label: { fr: "Type", en: "Type" }, value: { fr: "Ventilé, une pièce", en: "Vented, one-piece" } },
      { key: "material", label: { fr: "Matériau", en: "Material" }, value: { fr: "Fonte G3000", en: "G3000 cast iron" } },
    ],
    fitmentIds: civic,
    offers: offers([
      ["napa", 159.79, 12, 2, "NAPA-4884401"],
      ["autoxpert", 147.5, 8, 1, "AX-BR-282"],
      ["canadiantire", 174.99, 4, 3, "CT-141-282"],
      ["partsource", 168.45, 0, 5, "PS-ROTOR-282"],
    ]),
    rating: 4.6,
    reviewCount: 128,
  },
  {
    id: "wagner-pads-front",
    slug: "plaquettes-frein-avant",
    categoryId: "brakes",
    brand: "Wagner",
    partNumber: "MX1633",
    name: {
      fr: "Plaquettes de frein avant céramique",
      en: "Ceramic front brake pads",
    },
    description: {
      fr: "Jeu de plaquettes céramiques avec capteurs d’usure. Moins de poussière sur les jantes qu’un composé semi-métallique, conçu pour le trafic stop-and-go de Montréal et Québec.",
      en: "Ceramic pad set with wear sensors. Less dust on the wheels than a semi-metallic compound, meant for stop-and-go traffic in Montreal and Quebec City.",
    },
    image: "/parts/pads.svg",
    specs: [
      { key: "compound", label: { fr: "Composé", en: "Compound" }, value: { fr: "Céramique", en: "Ceramic" } },
      { key: "axle", label: { fr: "Essieu", en: "Axle" }, value: { fr: "Avant", en: "Front" } },
      { key: "includes", label: { fr: "Inclus", en: "Includes" }, value: { fr: "Capteurs, greisse", en: "Sensors, grease" } },
    ],
    fitmentIds: civic,
    offers: offers([
      ["autoxpert", 64.99, 20, 1, "AX-PAD-1633"],
      ["napa", 72.45, 9, 2, "NAPA-MX1633"],
      ["partsource", 69.99, 6, 2, "PS-PAD-F"],
    ]),
    rating: 4.4,
    reviewCount: 86,
  },
  {
    id: "acdelco-pads-rear",
    slug: "plaquettes-frein-arriere",
    categoryId: "brakes",
    brand: "ACDelco",
    partNumber: "17D1823C",
    name: {
      fr: "Plaquettes de frein arrière",
      en: "Rear brake pads",
    },
    description: {
      fr: "Plaquettes arrière pour Civic. À remplacer en même temps que l’essieu avant si l’usure est proche.",
      en: "Rear pads for the Civic. Replace with the front axle when wear is close.",
    },
    image: "/parts/pads.svg",
    specs: [
      { key: "axle", label: { fr: "Essieu", en: "Axle" }, value: { fr: "Arrière", en: "Rear" } },
    ],
    fitmentIds: civic,
    offers: offers([
      ["napa", 54.99, 11, 2, "NAPA-17D1823"],
      ["canadiantire", 49.99, 7, 3, "CT-REAR-PAD"],
    ]),
    rating: 4.2,
    reviewCount: 41,
  },
  {
    id: "fram-oil-filter",
    slug: "filtre-huile",
    categoryId: "filters",
    brand: "FRAM",
    partNumber: "XG7317",
    name: {
      fr: "Filtre à huile",
      en: "Oil filter",
    },
    description: {
      fr: "Filtre à huile fileté, média synthétique. Convient aux vidanges 0W-20 des Civic turbo.",
      en: "Spin-on oil filter with synthetic media. Fits 0W-20 oil changes on turbo Civics.",
    },
    image: "/parts/oil-filter.svg",
    specs: [
      { key: "type", label: { fr: "Type", en: "Type" }, value: { fr: "Fileté", en: "Spin-on" } },
      { key: "media", label: { fr: "Média", en: "Media" }, value: { fr: "Synthétique", en: "Synthetic" } },
    ],
    fitmentIds: civic,
    offers: offers([
      ["autoxpert", 14.99, 40, 1, "AX-OF-7317"],
      ["canadiantire", 16.49, 22, 1, "CT-XG7317"],
      ["napa", 15.79, 18, 2, "NAPA-OF-7317"],
    ]),
    rating: 4.7,
    reviewCount: 210,
  },
  {
    id: "wix-air-filter",
    slug: "filtre-air",
    categoryId: "filters",
    brand: "WIX",
    partNumber: "42495",
    name: {
      fr: "Filtre à air moteur",
      en: "Engine air filter",
    },
    description: {
      fr: "Panneau filtrant pour boîte à air d’origine. À inspecter à chaque vidange, surtout après un hiver de sel et de slush.",
      en: "Panel filter for the OEM airbox. Check at every oil change, especially after a salt-and-slush winter.",
    },
    image: "/parts/air-filter.svg",
    specs: [
      { key: "shape", label: { fr: "Forme", en: "Shape" }, value: { fr: "Panneau", en: "Panel" } },
    ],
    fitmentIds: civic,
    offers: offers([
      ["partsource", 22.99, 14, 2, "PS-AF-42495"],
      ["napa", 24.5, 10, 2, "NAPA-42495"],
      ["autoxpert", 21.5, 16, 1, "AX-AF-42495"],
    ]),
    rating: 4.5,
    reviewCount: 73,
  },
  {
    id: "cabin-filter-civic",
    slug: "filtre-habitacle",
    categoryId: "filters",
    brand: "ATP",
    partNumber: "CF-122",
    name: {
      fr: "Filtre d’habitacle au charbon",
      en: "Cabin air filter, charcoal",
    },
    description: {
      fr: "Filtre habitacle au charbon actif. Réduit les odeurs de circulation qui rentrent par le chauffage.",
      en: "Charcoal cabin filter. Cuts traffic smells coming in through the heater.",
    },
    image: "/parts/cabin-filter.svg",
    specs: [
      { key: "media", label: { fr: "Média", en: "Media" }, value: { fr: "Carbon", en: "Charcoal" } },
    ],
    fitmentIds: civic,
    offers: offers([
      ["canadiantire", 27.99, 9, 2, "CT-CABIN-122"],
      ["autoxpert", 24.99, 13, 1, "AX-CABIN-122"],
    ]),
    rating: 4.3,
    reviewCount: 55,
  },
  {
    id: "pennzoil-0w20",
    slug: "huile-moteur-0w20",
    categoryId: "oil",
    brand: "Pennzoil",
    partNumber: "550042932",
    name: {
      fr: "Huile moteur 0W-20 synthétique, 5 L",
      en: "0W-20 synthetic engine oil, 5 L",
    },
    description: {
      fr: "Bidon de 5 litres, grade 0W-20, pour les Civic turbo et plusieurs Toyota récents. Suffisant pour une vidange complète.",
      en: "5-litre jug, 0W-20 grade, for turbo Civics and several recent Toyotas. Enough for a full oil change.",
    },
    image: "/parts/oil.svg",
    specs: [
      { key: "grade", label: { fr: "Grade", en: "Grade" }, value: { fr: "0W-20", en: "0W-20" } },
      { key: "volume", label: { fr: "Volume", en: "Volume" }, value: { fr: "5 L", en: "5 L" } },
    ],
    fitmentIds: [...civic, ...rav4, "toyota-corolla-2021-20"],
    offers: offers([
      ["canadiantire", 42.99, 30, 1, "CT-0W20-5L"],
      ["napa", 44.99, 12, 2, "NAPA-0W20"],
      ["autoxpert", 39.99, 18, 1, "AX-0W20-5L"],
    ]),
    rating: 4.8,
    reviewCount: 340,
  },
  {
    id: "ngk-laser-iridium",
    slug: "bougies-iridium",
    categoryId: "ignition",
    brand: "NGK",
    partNumber: "DILZKR7B11G",
    name: {
      fr: "Bougies d’allumage iridium (jeu de 4)",
      en: "Iridium spark plugs (set of 4)",
    },
    description: {
      fr: "Jeu de quatre bougies iridium pour Civic 1.5T. Intervalle recommandé autour de 40 000 à 60 000 km selon l’usage.",
      en: "Set of four iridium plugs for the Civic 1.5T. Recommended interval around 40,000 to 60,000 km depending on use.",
    },
    image: "/parts/plugs.svg",
    specs: [
      { key: "gap", label: { fr: "Écartement", en: "Gap" }, value: { fr: "1,1 mm", en: "1.1 mm" } },
      { key: "qty", label: { fr: "Quantité", en: "Quantity" }, value: { fr: "4", en: "4" } },
    ],
    fitmentIds: ["honda-civic-2018-15t"],
    offers: offers([
      ["napa", 78.99, 8, 2, "NAPA-DILZKR"],
      ["partsource", 74.5, 5, 3, "PS-NGK-4"],
      ["autoxpert", 69.99, 11, 1, "AX-PLUG-4"],
    ]),
    rating: 4.9,
    reviewCount: 97,
  },
  {
    id: "odyssey-battery",
    slug: "batterie-groupe-51r",
    categoryId: "battery",
    brand: "Odyssey",
    partNumber: "Odyssey-51R",
    name: {
      fr: "Batterie groupe 51R",
      en: "Group 51R battery",
    },
    description: {
      fr: "Batterie AGM groupe 51R, mieux adaptée aux démarrages par grand froid que plusieurs batteries conventionnelles.",
      en: "Group 51R AGM battery, better suited to cold starts than many flooded batteries.",
    },
    image: "/parts/battery.svg",
    specs: [
      { key: "group", label: { fr: "Groupe", en: "Group" }, value: { fr: "51R", en: "51R" } },
      { key: "cca", label: { fr: "CCA", en: "CCA" }, value: { fr: "500 A", en: "500 A" } },
    ],
    fitmentIds: civic,
    offers: offers([
      ["napa", 229.99, 3, 2, "NAPA-51R"],
      ["canadiantire", 219.99, 6, 1, "CT-51R"],
      ["autoxpert", 209.99, 4, 1, "AX-51R"],
    ]),
    rating: 4.6,
    reviewCount: 62,
  },
  {
    id: "bosch-wiper-26",
    slug: "essuie-glace-avant",
    categoryId: "wipers",
    brand: "Bosch",
    partNumber: "26A",
    name: {
      fr: "Balais d’essuie-glace avant (paire)",
      en: "Front wiper blades (pair)",
    },
    description: {
      fr: "Paire de balais plat 26 / 18 po. Un remplacement d’automne évite les traces sur le sel de novembre.",
      en: "26 / 18 in beam blade pair. An autumn swap avoids streaking on November salt.",
    },
    image: "/parts/wiper.svg",
    specs: [
      { key: "size", label: { fr: "Tailles", en: "Sizes" }, value: { fr: "26 / 18 po", en: "26 / 18 in" } },
    ],
    fitmentIds: civic,
    offers: offers([
      ["canadiantire", 38.99, 25, 1, "CT-WIPER-26"],
      ["autoxpert", 34.99, 14, 1, "AX-WIPER-26"],
    ]),
    rating: 4.1,
    reviewCount: 44,
  },
  {
    id: "gates-thermostat",
    slug: "thermostat",
    categoryId: "cooling",
    brand: "Gates",
    partNumber: "34048",
    name: {
      fr: "Thermostat de refroidissement",
      en: "Cooling thermostat",
    },
    description: {
      fr: "Thermostat à 82 °C avec joint. À considérer si le moteur tarde à atteindre sa température en hiver.",
      en: "82 °C thermostat with gasket. Worth considering if the engine is slow to reach temperature in winter.",
    },
    image: "/parts/thermostat.svg",
    specs: [
      { key: "temp", label: { fr: "Température", en: "Temperature" }, value: { fr: "82 °C", en: "82 °C" } },
    ],
    fitmentIds: civic,
    offers: offers([
      ["napa", 32.99, 7, 2, "NAPA-34048"],
      ["partsource", 29.99, 4, 3, "PS-THERM"],
    ]),
    rating: 4.4,
    reviewCount: 28,
  },
  {
    id: "prestone-coolant",
    slug: "liquide-refroidissement",
    categoryId: "cooling",
    brand: "Prestone",
    partNumber: "AF2100",
    name: {
      fr: "Liquide de refroidissement concentré, 3,78 L",
      en: "Concentrated coolant, 3.78 L",
    },
    description: {
      fr: "Antigel concentré à diluer 50/50. Compatible avec plusieurs circuits Honda et Toyota de cette décennie.",
      en: "Concentrated antifreeze to dilute 50/50. Compatible with several Honda and Toyota systems from this decade.",
    },
    image: "/parts/coolant.svg",
    specs: [
      { key: "volume", label: { fr: "Volume", en: "Volume" }, value: { fr: "3,78 L", en: "3.78 L" } },
    ],
    fitmentIds: [...civic, ...rav4],
    offers: offers([
      ["canadiantire", 19.99, 20, 1, "CT-AF2100"],
      ["napa", 21.49, 8, 2, "NAPA-AF2100"],
    ]),
    rating: 4.5,
    reviewCount: 119,
  },
  {
    id: "kyb-strut-front",
    slug: "amortisseur-avant",
    categoryId: "suspension",
    brand: "KYB",
    partNumber: "339251",
    name: {
      fr: "Amortisseur avant",
      en: "Front strut",
    },
    description: {
      fr: "Jambe de force avant. À remplacer par paire; les nids-de-poule de printemps accélèrent l’usure des butées.",
      en: "Front strut. Replace in pairs; spring potholes wear out the bump stops faster.",
    },
    image: "/parts/strut.svg",
    specs: [
      { key: "axle", label: { fr: "Essieu", en: "Axle" }, value: { fr: "Avant", en: "Front" } },
    ],
    fitmentIds: civic,
    offers: offers([
      ["napa", 129.99, 4, 3, "NAPA-339251"],
      ["autoxpert", 119.99, 3, 2, "AX-STRUT-F"],
      ["partsource", 134.5, 2, 4, "PS-KYB-F"],
    ]),
    rating: 4.3,
    reviewCount: 37,
  },
  {
    id: "gates-serpentine",
    slug: "courroie-accessoires",
    categoryId: "belts",
    brand: "Gates",
    partNumber: "K060735",
    name: {
      fr: "Courroie d’accessoires",
      en: "Serpentine belt",
    },
    description: {
      fr: "Courroie micro-V pour alternateur, direction et climatisation. Un grincement à froid est souvent le premier signe.",
      en: "Micro-V belt for the alternator, steering and A/C. A cold squeal is often the first sign.",
    },
    image: "/parts/belt.svg",
    specs: [
      { key: "ribs", label: { fr: "Nervures", en: "Ribs" }, value: { fr: "6", en: "6" } },
    ],
    fitmentIds: civic,
    offers: offers([
      ["autoxpert", 36.99, 9, 1, "AX-BELT-735"],
      ["napa", 41.25, 6, 2, "NAPA-K060735"],
    ]),
    rating: 4.6,
    reviewCount: 51,
  },
  {
    id: "denso-o2",
    slug: "sonde-oxygene",
    categoryId: "exhaust",
    brand: "Denso",
    partNumber: "234-5010",
    name: {
      fr: "Sonde à oxygène en amont",
      en: "Upstream oxygen sensor",
    },
    description: {
      fr: "Sonde lambda en amont du catalyseur. Un voyant moteur avec mélange pauvre peut pointer ici.",
      en: "Upstream O2 sensor. A check-engine light with a lean mixture can point here.",
    },
    image: "/parts/sensor.svg",
    specs: [
      { key: "position", label: { fr: "Position", en: "Position" }, value: { fr: "Amont", en: "Upstream" } },
    ],
    fitmentIds: civic,
    offers: offers([
      ["napa", 89.99, 5, 3, "NAPA-2345010"],
      ["partsource", 94.99, 2, 4, "PS-O2-UP"],
    ]),
    rating: 4.2,
    reviewCount: 19,
  },
  {
    id: "four-seasons-compressor",
    slug: "compresseur-climatisation",
    categoryId: "hvac",
    brand: "Four Seasons",
    partNumber: "158410",
    name: {
      fr: "Compresseur de climatisation",
      en: "A/C compressor",
    },
    description: {
      fr: "Compresseur neuf avec embrayage. Prévoir un tirage au vide et une recharge R-1234yf chez un atelier certifié.",
      en: "New compressor with clutch. Plan for a vacuum pull and R-1234yf recharge at a certified shop.",
    },
    image: "/parts/compressor.svg",
    specs: [
      { key: "gas", label: { fr: "Gaz", en: "Refrigerant" }, value: { fr: "R-1234yf", en: "R-1234yf" } },
    ],
    fitmentIds: ["honda-civic-2018-15t"],
    offers: offers([
      ["napa", 389.0, 2, 5, "NAPA-158410"],
      ["autoxpert", 359.0, 1, 4, "AX-AC-158410"],
    ]),
    rating: 4.0,
    reviewCount: 12,
  },
  {
    id: "moog-tie-rod",
    slug: "rotule-direction",
    categoryId: "steering",
    brand: "MOOG",
    partNumber: "EV800441",
    name: {
      fr: "Rotule de direction intérieure",
      en: "Inner tie rod",
    },
    description: {
      fr: "Rotule intérieure. Un jeu dans le volant ou une usure en dents de scie sur le pneu avant mérite une inspection.",
      en: "Inner tie rod. Play in the wheel or sawtooth wear on a front tire is worth an inspection.",
    },
    image: "/parts/tierod.svg",
    specs: [
      { key: "side", label: { fr: "Côté", en: "Side" }, value: { fr: "Intérieur", en: "Inner" } },
    ],
    fitmentIds: civic,
    offers: offers([
      ["partsource", 47.99, 6, 2, "PS-EV800441"],
      ["napa", 52.49, 4, 2, "NAPA-EV800441"],
    ]),
    rating: 4.5,
    reviewCount: 23,
  },
  {
    id: "bosch-fuel-filter",
    slug: "filtre-carburant",
    categoryId: "fuel-air",
    brand: "Bosch",
    partNumber: "F026402046",
    name: {
      fr: "Filtre à carburant",
      en: "Fuel filter",
    },
    description: {
      fr: "Filtre en ligne pour le circuit d’essence. Utile après un réservoir contaminé ou un ralenti instable.",
      en: "In-line fuel filter. Useful after a contaminated tank or an unstable idle.",
    },
    image: "/parts/fuel-filter.svg",
    specs: [
      { key: "type", label: { fr: "Type", en: "Type" }, value: { fr: "En ligne", en: "In-line" } },
    ],
    fitmentIds: civic,
    offers: offers([
      ["autoxpert", 28.99, 8, 2, "AX-FF-2046"],
      ["napa", 31.99, 5, 3, "NAPA-F026"],
    ]),
    rating: 4.3,
    reviewCount: 17,
  },
  {
    id: "f150-pads",
    slug: "plaquettes-f150",
    categoryId: "brakes",
    brand: "Motorcraft",
    partNumber: "BRF-235",
    name: {
      fr: "Plaquettes avant Motorcraft, F-150",
      en: "Motorcraft front pads, F-150",
    },
    description: {
      fr: "Jeu avant pour F-150 3.5 EcoBoost. Prévu pour le poids à vide et les remorques légères.",
      en: "Front set for the F-150 3.5 EcoBoost. Sized for curb weight and light towing.",
    },
    image: "/parts/pads.svg",
    specs: [
      { key: "axle", label: { fr: "Essieu", en: "Axle" }, value: { fr: "Avant", en: "Front" } },
    ],
    fitmentIds: f150,
    offers: offers([
      ["napa", 89.99, 7, 2, "NAPA-BRF235"],
      ["canadiantire", 84.99, 5, 3, "CT-F150-PAD"],
      ["autoxpert", 79.99, 6, 2, "AX-F150-PAD"],
    ]),
    rating: 4.5,
    reviewCount: 64,
  },
  {
    id: "f150-rotor",
    slug: "disque-f150",
    categoryId: "brakes",
    brand: "Motorcraft",
    partNumber: "BRR-235",
    name: {
      fr: "Disque de frein avant, F-150",
      en: "Front brake rotor, F-150",
    },
    description: {
      fr: "Disque avant pour F-150. À jumeler aux plaquettes Motorcraft du même essieu.",
      en: "Front rotor for the F-150. Pair it with the Motorcraft pads on the same axle.",
    },
    image: "/parts/rotor.svg",
    specs: [
      { key: "diameter", label: { fr: "Diamètre", en: "Diameter" }, value: { fr: "350 mm", en: "350 mm" } },
    ],
    fitmentIds: f150,
    offers: offers([
      ["napa", 189.99, 4, 3, "NAPA-BRR235"],
      ["autoxpert", 174.99, 3, 2, "AX-F150-ROT"],
    ]),
    rating: 4.4,
    reviewCount: 31,
  },
  {
    id: "f150-oil-filter",
    slug: "filtre-huile-f150",
    categoryId: "filters",
    brand: "Motorcraft",
    partNumber: "FL-500-S",
    name: {
      fr: "Filtre à huile F-150",
      en: "F-150 oil filter",
    },
    description: {
      fr: "Filtre d’origine Motorcraft pour EcoBoost 3.5. Intervalle typique 8 000 à 12 000 km.",
      en: "Motorcraft OEM-style filter for the 3.5 EcoBoost. Typical interval 8,000 to 12,000 km.",
    },
    image: "/parts/oil-filter.svg",
    specs: [
      { key: "type", label: { fr: "Type", en: "Type" }, value: { fr: "Cartouche", en: "Cartridge" } },
    ],
    fitmentIds: f150,
    offers: offers([
      ["napa", 18.99, 15, 1, "NAPA-FL500"],
      ["canadiantire", 17.49, 11, 1, "CT-FL500"],
    ]),
    rating: 4.7,
    reviewCount: 88,
  },
  {
    id: "rav4-pads",
    slug: "plaquettes-rav4",
    categoryId: "brakes",
    brand: "Akebono",
    partNumber: "ACT1432",
    name: {
      fr: "Plaquettes avant Akebono, RAV4",
      en: "Akebono front pads, RAV4",
    },
    description: {
      fr: "Céramique d’équipementier pour RAV4. Freinage progressif, peu de poussière.",
      en: "OEM-supplier ceramic for the RAV4. Progressive pedal, low dust.",
    },
    image: "/parts/pads.svg",
    specs: [
      { key: "compound", label: { fr: "Composé", en: "Compound" }, value: { fr: "Céramique", en: "Ceramic" } },
    ],
    fitmentIds: rav4,
    offers: offers([
      ["autoxpert", 71.99, 8, 2, "AX-RAV-PAD"],
      ["napa", 79.99, 5, 2, "NAPA-ACT1432"],
      ["partsource", 76.5, 4, 3, "PS-RAV-PAD"],
    ]),
    rating: 4.6,
    reviewCount: 52,
  },
  {
    id: "rav4-filter",
    slug: "filtre-huile-rav4",
    categoryId: "filters",
    brand: "Toyota",
    partNumber: "04152-YZZA6",
    name: {
      fr: "Filtre à huile Toyota, RAV4",
      en: "Toyota oil filter, RAV4",
    },
    description: {
      fr: "Filtre d’origine Toyota pour le 2.5 L. Joint déjà huilé d’usine.",
      en: "Genuine Toyota filter for the 2.5 L. Gasket pre-oiled at the factory.",
    },
    image: "/parts/oil-filter.svg",
    specs: [
      { key: "type", label: { fr: "Type", en: "Type" }, value: { fr: "Fileté", en: "Spin-on" } },
    ],
    fitmentIds: rav4,
    offers: offers([
      ["napa", 12.99, 20, 1, "NAPA-YZZA6"],
      ["autoxpert", 11.49, 14, 1, "AX-YZZA6"],
    ]),
    rating: 4.8,
    reviewCount: 143,
  },
  {
    id: "universal-wiper-fluid",
    slug: "lave-glace-hiver",
    categoryId: "wipers",
    brand: "Recochem",
    partNumber: "14-334",
    name: {
      fr: "Lave-glace d’hiver −40 °C, 3,78 L",
      en: "Winter washer fluid −40 °C, 3.78 L",
    },
    description: {
      fr: "Lave-glace d’hiver québécois, −40 °C. Convient à tous les véhicules du catalogue.",
      en: "Quebec winter washer fluid, −40 °C. Fits every vehicle in the catalogue.",
    },
    image: "/parts/washer.svg",
    specs: [
      { key: "temp", label: { fr: "Protection", en: "Protection" }, value: { fr: "−40 °C", en: "−40 °C" } },
    ],
    fitmentIds: "all",
    offers: offers([
      ["canadiantire", 5.99, 80, 1, "CT-WG-40"],
      ["autoxpert", 5.49, 40, 1, "AX-WG-40"],
    ]),
    rating: 4.4,
    reviewCount: 501,
  },
  {
    id: "led-headlight",
    slug: "ampoule-led-h11",
    categoryId: "electrical",
    brand: "Philips",
    partNumber: "H11-XUS",
    name: {
      fr: "Ampoules LED H11 (paire)",
      en: "H11 LED bulbs (pair)",
    },
    description: {
      fr: "Paire H11 pour antibrouillards ou feux de croisement selon le faisceau. Vérifiez le code sur la lampe d’origine.",
      en: "H11 pair for fog lamps or low beams depending on the housing. Check the code on the original bulb.",
    },
    image: "/parts/bulb.svg",
    specs: [
      { key: "base", label: { fr: "Culot", en: "Base" }, value: { fr: "H11", en: "H11" } },
    ],
    fitmentIds: commonCars,
    offers: offers([
      ["canadiantire", 79.99, 10, 2, "CT-H11-LED"],
      ["napa", 84.99, 6, 2, "NAPA-H11"],
      ["autoxpert", 72.99, 9, 1, "AX-H11"],
    ]),
    rating: 4.1,
    reviewCount: 76,
  },
  {
    id: "rio-pads",
    slug: "plaquettes-rio",
    categoryId: "brakes",
    brand: "Wagner",
    partNumber: "ZX698",
    name: {
      fr: "Plaquettes avant, Kia Rio",
      en: "Front pads, Kia Rio",
    },
    description: {
      fr: "Jeu avant pour Rio 2009. Un essieu simple, à budgéter avec les disques si l’épaisseur est limite.",
      en: "Front set for the 2009 Rio. A simple axle — budget rotors too if thickness is close.",
    },
    image: "/parts/pads.svg",
    specs: [
      { key: "axle", label: { fr: "Essieu", en: "Axle" }, value: { fr: "Avant", en: "Front" } },
    ],
    fitmentIds: ["kia-rio-2009-16"],
    offers: offers([
      ["partsource", 44.99, 6, 2, "PS-RIO-PAD"],
      ["autoxpert", 41.99, 5, 2, "AX-RIO-PAD"],
    ]),
    rating: 4.2,
    reviewCount: 22,
  },
  {
    id: "alt-civic",
    slug: "alternateur-civic",
    categoryId: "electrical",
    brand: "Remy",
    partNumber: "11190",
    name: {
      fr: "Alternateur remanufacturé",
      en: "Remanufactured alternator",
    },
    description: {
      fr: "Alternateur reman, 12 V. Un voltmètre sous 13,5 V au ralenti avec accessoires allumés justifie un test.",
      en: "Reman 12 V alternator. A voltmeter under 13.5 V at idle with accessories on is worth a test.",
    },
    image: "/parts/alternator.svg",
    specs: [
      { key: "amps", label: { fr: "Intensité", en: "Amperage" }, value: { fr: "130 A", en: "130 A" } },
    ],
    fitmentIds: civic,
    offers: offers([
      ["napa", 249.99, 2, 4, "NAPA-11190"],
      ["autoxpert", 229.99, 2, 3, "AX-ALT-11190"],
    ]),
    rating: 4.0,
    reviewCount: 15,
  },
];

export function getProduct(slugOrId: string) {
  return products.find((p) => p.slug === slugOrId || p.id === slugOrId);
}

export function productsForCategory(categoryId: CategoryId, vehicleId?: string | null) {
  return products.filter((product) => {
    if (product.categoryId !== categoryId) return false;
    if (!vehicleId || product.fitmentIds === "all") return true;
    return product.fitmentIds.includes(vehicleId);
  });
}

export function productsForVehicle(vehicleId?: string | null) {
  if (!vehicleId) return products;
  return products.filter(
    (product) => product.fitmentIds === "all" || product.fitmentIds.includes(vehicleId),
  );
}

export function bestOffer(product: Product) {
  const inStock = product.offers.filter((o) => o.stock > 0);
  const pool = inStock.length ? inStock : product.offers;
  return [...pool].sort((a, b) => a.price - b.price)[0];
}

export function similarProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, limit);
}
