import { stock } from "@/data/stock";

export type Post = {
  slug: string;
  date: string;
  day: string;
  month: { fr: string; en: string };
  tag: { fr: string; en: string };
  title: { fr: string; en: string };
  excerpt: { fr: string; en: string };
  image: string;
  href: string;
  body: { fr: string[]; en: string[] };
};

export const posts: Post[] = [
  {
    slug: "plaquettes-de-frein-quebec",
    date: "2026-03-10",
    day: "10",
    month: { fr: "Mar", en: "Mar" },
    tag: { fr: "Freins", en: "Brakes" },
    title: {
      fr: "Quand changer les plaquettes sur un véhicule conduit au Québec",
      en: "When to replace brake pads on a vehicle driven in Quebec",
    },
    excerpt: {
      fr: "Le sel, les arrêts fréquents et les côtes usent les plaquettes plus vite qu’un manuel générique ne le dit.",
      en: "Salt, frequent stops and hills wear pads faster than a generic manual suggests.",
    },
    image: stock.brakes,
    href: "/pieces/freins",
    body: {
      fr: [
        "Les plaquettes se changent selon l’épaisseur restante, pas selon un kilométrage fixe. Au Québec, le sel, les arrêts en ville et les descentes usent le matériau plus vite que les intervalles souvent cités pour un usage autoroutier.",
        "Un grincement léger au premier freinage du matin peut venir de l’humidité. Un grincement qui revient à chaque arrêt, une vibration dans le volant ou une pédale plus longue indiquent plutôt une plaquette mince ou un disque voilé.",
        "Mesurez l’épaisseur si vous avez accès à la roue. Sous 3 mm, planifiez le remplacement. Si le témoin d’usure métallique frotte déjà, changez les plaquettes avant que le disque soit rayé.",
        "Les plaquettes se vendent souvent par essieu. Comparez le composé (céramique ou semi-métallique) et le prix chez plusieurs marchands pour le même numéro de pièce, plutôt que de choisir uniquement la marque la plus connue.",
        "Après le montage, prévoyez une période de rodage : freinages progressifs, sans arrêt d’urgence, sur les premiers 300 km. Vérifiez le niveau de liquide et l’état des durites si la pédale reste molle.",
      ],
      en: [
        "Pads are replaced by remaining thickness, not a fixed odometer number. In Quebec, salt, city stops and downhill braking wear the material faster than highway intervals often quoted online.",
        "A light squeak on the first morning stop can be moisture. A squeak on every stop, a shake in the wheel or a longer pedal usually means a thin pad or a warped rotor.",
        "Measure the pad if you can see the wheel. Under 3 mm, plan the replacement. If the metal wear tab is already scraping, change the pads before the rotor is scored.",
        "Pads are usually sold per axle. Compare the compound (ceramic or semi-metallic) and the price of the same part number across vendors, instead of picking only the best-known brand.",
        "After the install, bed the pads in: progressive stops, no panic braking, for the first 300 km. Check fluid level and hoses if the pedal stays soft.",
      ],
    },
  },
  {
    slug: "huile-moteur-hiver",
    date: "2026-01-15",
    day: "15",
    month: { fr: "Jan", en: "Jan" },
    tag: { fr: "Huile", en: "Oil" },
    title: {
      fr: "Choisir une huile 0W pour un démarrage par grand froid",
      en: "Choosing a 0W oil for cold-weather starts",
    },
    excerpt: {
      fr: "Le premier chiffre de la viscosité compte plus que la marque quand le moteur reste dehors toute la nuit.",
      en: "The first viscosity number matters more than the brand when the engine sits outside overnight.",
    },
    image: stock.engine,
    href: "/pieces/huile",
    body: {
      fr: [
        "Le manuel du propriétaire fixe la viscosité et la norme (dexos, API SP, etc.). Pour un stationnement extérieur au Québec, une huile 0W-20 ou 0W-16, si elle est homologuée pour le moteur, circule plus vite au premier tour de clé qu’une 5W du même grade chaud.",
        "Une huile trop épaisse au démarrage tarde à lubrifier les paliers. Ce n’est pas une raison de descendre sous la spécification du constructeur : une 0W hors norme peut augmenter la consommation ou le bruit du distributeur variable.",
        "Changez le filtre à chaque vidange. Un filtre colmaté fait ouvrir la soupape de dérivation et l’huile non filtrée circule. Notez le kilométrage et la date dans le carnet, surtout si vous mélangez des marchands.",
        "Les délais de 8 000 à 12 000 km indiqués sur certaines huiles synthétiques supposent un usage mixte. Les trajets courts en hiver (le moteur n’atteint pas sa température) rapprochent l’intervalle. En cas de doute, suivez l’intervalle sévère du manuel.",
      ],
      en: [
        "The owner’s manual sets viscosity and spec (dexos, API SP, and so on). For outdoor parking in Quebec, a 0W-20 or 0W-16 oil, if it is approved for the engine, reaches the bearings faster on the first crank than a 5W of the same hot grade.",
        "Oil that is too thick at start-up is slow to lubricate. That is not a reason to go below the maker’s spec: an off-spec 0W can raise consumption or make variable valve timing noisy.",
        "Replace the filter with every oil change. A clogged filter opens the bypass and unfiltered oil circulates. Record kilometres and date in the service log, especially if you buy from more than one vendor.",
        "The 8,000 to 12,000 km windows printed on some synthetics assume mixed use. Short winter trips (the engine never fully warms) shorten the interval. When unsure, use the severe-service interval in the manual.",
      ],
    },
  },
  {
    slug: "filtres-habitacle-et-air",
    date: "2026-02-04",
    day: "04",
    month: { fr: "Fév", en: "Feb" },
    tag: { fr: "Filtres", en: "Filters" },
    title: {
      fr: "Filtre d’habitacle et filtre à air : deux pièces, deux rôles",
      en: "Cabin filter and engine air filter: two parts, two jobs",
    },
    excerpt: {
      fr: "L’un protège le moteur, l’autre l’air que vous respirez. Ils ne se changent pas au même intervalle.",
      en: "One protects the engine, the other the air you breathe. They are not due at the same interval.",
    },
    image: stock.garage,
    href: "/pieces/filtres",
    body: {
      fr: [
        "Le filtre à air moteur retient poussière et sel avant l’admission. Un filtre saturé réduit le remplissage des cylindres : le moteur peut manquer de couple à bas régime et le calculateur enrichit parfois le mélange.",
        "Le filtre d’habitacle se trouve derrière la boîte à gants sur beaucoup de véhicules. Un filtre bouché sent le moisi, embue les vitres et fatigue le ventilateur. Au printemps, le pollen le colmate plus vite qu’en janvier.",
        "Ces deux filtres portent des numéros de pièce distincts. Vérifiez l’année, le moteur et, pour l’habitacle, la présence d’un capteur de qualité d’air : certains boîtiers prennent un filtre plus épais.",
        "Un intervalle courant est 20 000 à 30 000 km pour l’air moteur et 15 000 km ou un an pour l’habitacle en ville. Inspectez-les plutôt que de les changer « par habitude » si le véhicule roule surtout sur autoroute propre.",
      ],
      en: [
        "The engine air filter keeps dust and salt out of the intake. A packed filter reduces cylinder fill: the engine can feel weak at low rpm and the computer may richen the mixture.",
        "The cabin filter sits behind the glove box on many cars. A blocked filter smells musty, fogs the glass and works the blower harder. In spring, pollen clogs it faster than in January.",
        "The two filters have different part numbers. Check year, engine and, for the cabin, whether an air-quality sensor is fitted: some housings take a thicker filter.",
        "A common window is 20,000 to 30,000 km for the engine filter and 15,000 km or one year for the cabin filter in city use. Inspect them instead of replacing on habit if the car mostly sees clean highway air.",
      ],
    },
  },
  {
    slug: "batterie-par-grand-froid",
    date: "2025-11-20",
    day: "20",
    month: { fr: "Nov", en: "Nov" },
    tag: { fr: "Batterie", en: "Battery" },
    title: {
      fr: "Une batterie faible se révèle souvent à la première nuit à −20 °C",
      en: "A weak battery often shows up on the first night at −20 °C",
    },
    excerpt: {
      fr: "Le CCA baisse avec le froid. Testez la batterie en novembre plutôt qu’au premier non-démarrage.",
      en: "CCA falls with the cold. Test the battery in November, not on the first no-start.",
    },
    image: stock.battery,
    href: "/pieces/batterie",
    body: {
      fr: [
        "Une batterie de 4 à 6 ans peut encore afficher 12,6 V au repos et manquer de courant de démarrage à froid. Le chiffre utile est le CCA (cold cranking amps) mesuré sous charge, pas seulement la tension au voltmètre.",
        "Les sièges chauffants, le dégivrage et les modules qui restent en veille après la fermeture des portes augmentent la demande. Un véhicule qui dort dehors a besoin d’une batterie dont le groupe (souvent 51R, 24F ou H6 selon le modèle) et la polarité correspondent exactement.",
        "Avant d’acheter, confirmez la hauteur du bac et la position de la borne positive. Une batterie plus haute soulève le capot ou pince le faisceau. Comparez le CCA et la garantie entre marchands pour le même groupe.",
        "Après le remplacement, laissez le moteur tourner 15 à 20 minutes ou utilisez un chargeur adapté. Si le témoin de batterie revient, faites tester l’alternateur : une batterie neuve ne corrige pas un régulateur défaillant.",
      ],
      en: [
        "A 4- to 6-year-old battery can still show 12.6 V at rest and lack cold-cranking current. The useful number is CCA under load, not only open-circuit voltage.",
        "Heated seats, defrost and modules that stay awake after lock-up raise demand. A car that sleeps outside needs a battery whose group size (often 51R, 24F or H6) and polarity match exactly.",
        "Before you buy, check tray height and the positive-terminal side. A taller case can lift the hood or pinch a harness. Compare CCA and warranty across vendors for the same group.",
        "After the swap, idle the engine 15 to 20 minutes or use a proper charger. If the battery lamp returns, have the alternator tested: a new battery does not fix a failing regulator.",
      ],
    },
  },
  {
    slug: "essuie-glaces-avant-la-neige",
    date: "2025-10-28",
    day: "28",
    month: { fr: "Oct", en: "Oct" },
    tag: { fr: "Essuie-glaces", en: "Wipers" },
    title: {
      fr: "Remplacer les balais avant la première bordée, pas après",
      en: "Replace wiper blades before the first snowfall, not after",
    },
    excerpt: {
      fr: "Un balai durci laisse des voiles. Le lave-glace d’hiver et la bonne longueur évitent un essuie-glace qui tape le montant.",
      en: "A hardened blade leaves haze. Winter washer fluid and the right length keep the arm from hitting the A-pillar.",
    },
    image: stock.winter,
    href: "/pieces/essuie-glaces",
    body: {
      fr: [
        "Les balais durcissent au soleil d’été. Dès qu’ils laissent un voile ou un grincement, changez-les avant le sel et la neige collante. Un balai fendu raye le verre si un grain de sable reste coincé.",
        "Vérifiez la longueur de chaque côté : beaucoup de véhicules ont un balai plus long côté conducteur. Un balai trop long frappe le montant; trop court, il laisse une bande non balayée dans le champ de vision.",
        "Utilisez un lave-glace coté −40 °C, pas un mélange d’été dilué. Le réservoir et les gicleurs gèlent autrement dès la première nuit froide. Si le jet est faible, dégagez les gicleurs avant de remplacer la pompe.",
        "Les faisceaux « beam » épousent mieux un pare-brise galbé que les balais à arceaux. Comparez le type d’attache (crochet, bouton-poussoir, broche) sur la fiche produit, pas seulement la marque.",
      ],
      en: [
        "Blades harden in summer sun. As soon as they haze or chatter, replace them before salt and sticky snow. A split rubber can scratch the glass if grit is trapped.",
        "Check length on each side: many cars use a longer blade on the driver side. Too long and the arm hits the A-pillar; too short and a streak stays in the sight line.",
        "Use washer fluid rated to −40 °C, not diluted summer mix. The tank and jets otherwise freeze on the first cold night. If the spray is weak, clear the jets before replacing the pump.",
        "Beam-style blades follow a curved windshield better than old frame blades. Match the connector (hook, push-button, pin) on the product page, not only the brand.",
      ],
    },
  },
  {
    slug: "comparer-les-offres-des-marchands",
    date: "2026-04-02",
    day: "02",
    month: { fr: "Avr", en: "Apr" },
    tag: { fr: "Catalogue", en: "Catalogue" },
    title: {
      fr: "Comment AutoXpert affiche plusieurs marchands sur une même fiche",
      en: "How AutoXpert shows several vendors on one product page",
    },
    excerpt: {
      fr: "Le meilleur prix en stock apparaît en premier. Le fournisseur reste indiqué sur le bon.",
      en: "The best in-stock price appears first. The supplier stays on the receipt.",
    },
    image: stock.sedan,
    href: "/pieces",
    body: {
      fr: [
        "Chaque fiche produit regroupe les offres de NAPA, Canadian Tire, PartSource et de l’entrepôt AutoXpert lorsque le numéro de pièce correspond au véhicule sélectionné. Le prix mis en avant est le plus bas parmi les marchands qui ont encore du stock.",
        "Un prix plus bas chez un marchand en rupture n’est pas proposé comme premier choix. Vous pouvez quand même ouvrir cette offre si vous acceptez un délai plus long, mais le prototype le signale clairement.",
        "Le véhicule (année, marque, modèle, moteur) filtre le catalogue avant l’affichage. Sans véhicule, les fiches restent visibles, mais la compatibilité n’est pas confirmée. Ajoutez le véhicule dans le garage pour le garder d’une visite à l’autre.",
        "Cette version est un prototype : taxes, transport réel et paiement ne sont pas branchés. Les délais affichés sont des estimations. Le fournisseur choisi reste nommé sur le bon pour que le suivi et les retours restent les siens.",
      ],
      en: [
        "Each product page gathers offers from NAPA, Canadian Tire, PartSource and the AutoXpert warehouse when the part number matches the selected vehicle. The featured price is the lowest among vendors that still have stock.",
        "A cheaper offer that is out of stock is not shown as the first choice. You can still open it if you accept a longer wait; the prototype marks that state clearly.",
        "Year, make, model and engine filter the catalogue before prices appear. Without a vehicle, pages stay visible but fitment is not confirmed. Add the vehicle in the garage to keep it between visits.",
        "This version is a prototype: taxes, live freight and payment are not wired. Lead times are estimates. The chosen supplier stays on the receipt so tracking and returns remain theirs.",
      ],
    },
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
