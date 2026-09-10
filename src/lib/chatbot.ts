import { categories, getCategory, type Category } from "@/data/categories";
import { entretienTypes } from "@/data/entretien";
import { bestOffer, products, productsForVehicle, type Product } from "@/data/products";
import { getVendor } from "@/data/vendors";
import type { VehicleFitment } from "@/data/vehicles";
import { formatCad, formatKm } from "@/lib/format";
import type { CartItem, Order } from "@/lib/store";

export type ChatLink = { href: string; label: string };

export type ChatReply = {
  text: string;
  links?: ChatLink[];
};

export type ChatContext = {
  locale: "fr" | "en";
  vehicle: VehicleFitment | null;
  cartCount: number;
  orders: Order[];
  cart: CartItem[];
};

const categoryKeywords: Record<string, string[]> = {
  brakes: ["frein", "plaquette", "disque", "rotor", "brake", "pad"],
  filters: ["filtre", "filter", "habitacle", "cabin"],
  oil: ["huile", "oil", "0w-20", "vidange"],
  ignition: ["bougie", "allumage", "spark", "plug", "iridium"],
  battery: ["batterie", "battery", "51r"],
  wipers: ["essuie", "wiper", "lave-glace", "washer"],
  cooling: ["thermostat", "coolant", "antigel", "refroid"],
  suspension: ["amortisseur", "strut", "suspension"],
  belts: ["courroie", "belt"],
  electrical: ["alternateur", "ampoule", "led", "electrical", "bulb"],
  exhaust: ["sonde", "oxygene", "exhaust", "o2"],
  hvac: ["climatisation", "compresseur", "a/c", "ac "],
  steering: ["direction", "rotule", "tie rod", "steering"],
  "fuel-air": ["carburant", "fuel"],
};

function norm(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function scoreProduct(product: Product, query: string, locale: "fr" | "en") {
  const hay = norm(
    `${product.brand} ${product.partNumber} ${product.name[locale]} ${product.description[locale]} ${product.categoryId}`,
  );
  return query
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .reduce((score, word) => score + (hay.includes(word) ? 2 : 0), 0);
}

function matchingCategory(query: string): Category | undefined {
  for (const category of categories) {
    const keys = categoryKeywords[category.id] ?? [];
    if (keys.some((key) => query.includes(key)) || query.includes(category.id) || query.includes(category.slug)) {
      return category;
    }
  }
  return undefined;
}

function productLinks(items: Product[], locale: "fr" | "en"): ChatLink[] {
  return items.slice(0, 4).map((product) => {
    const category = getCategory(product.categoryId)!;
    return {
      href: `/pieces/${category.slug}/${product.slug}`,
      label: `${product.brand} — ${product.name[locale]}`,
    };
  });
}

function vehicleLine(vehicle: VehicleFitment | null, locale: "fr" | "en") {
  if (!vehicle) {
    return locale === "fr"
      ? "Aucun véhicule n’est sélectionné pour le moment."
      : "No vehicle is selected right now.";
  }
  return `${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.engine})`;
}

export function answerChat(raw: string, ctx: ChatContext): ChatReply {
  const { locale, vehicle, cartCount, orders } = ctx;
  const query = norm(raw);
  const pool = productsForVehicle(vehicle?.id);
  const fr = locale === "fr";

  if (/bonjour|salut|allo|hello|hi\b|hey\b/.test(query)) {
    return {
      text: fr
        ? `Bonjour. Je suis le conseiller AutoXpert. Véhicule en cours : ${vehicleLine(vehicle, locale)}. Dites-moi la pièce ou l’entretien que vous cherchez.`
        : `Hello. I’m the AutoXpert advisor. Current vehicle: ${vehicleLine(vehicle, locale)}. Tell me the part or service you need.`,
    };
  }

  if (/comment ca marche|how (does it|it) work|plusieurs marchand|vendor|unifie/.test(query)) {
    return {
      text: fr
        ? "AutoXpert réunit NAPA, Canadian Tire, PartSource et notre entrepôt sur la même fiche. Le meilleur prix en stock s’affiche en premier; vous commandez au même endroit et le marchand reste indiqué sur le bon."
        : "AutoXpert lists NAPA, Canadian Tire, PartSource and our warehouse on one page. The best in-stock price shows first; you order in one place and the vendor stays on the receipt.",
      links: [{ href: "/pieces", label: fr ? "Voir les pièces" : "Browse parts" }],
    };
  }

  if (/livr|ship|delai|shipping|retrait|pickup/.test(query)) {
    return {
      text: fr
        ? "Les délais sur les fiches sont des estimations de prototype (1 à 5 jours selon le marchand). Le transport réel, les taxes et le paiement ne sont pas branchés dans cette version. Le retrait en magasin n’est pas encore offert ici."
        : "Lead times on product pages are prototype estimates (1 to 5 days by vendor). Live freight, taxes and payment are not wired in this version. In-store pickup is not offered here yet.",
    };
  }

  if (/panier|cart|commande|order|achat|suivi|tracking/.test(query) && !/huile|oil|filtre|filter/.test(query)) {
    const last = orders[0];
    const lastProduct = last ? products.find((p) => p.id === last.productId) : null;
    return {
      text: fr
        ? `Le panier contient ${cartCount} article${cartCount > 1 ? "s" : ""}. ${
            last && lastProduct
              ? `Dernière commande de démo : ${last.id} (${lastProduct.name.fr}), statut ${last.status}.`
              : "Aucune commande de démo n’est liée pour l’instant."
          } Le paiement n’est pas branché.`
        : `The cart has ${cartCount} item${cartCount > 1 ? "s" : ""}. ${
            last && lastProduct
              ? `Latest demo order: ${last.id} (${lastProduct.name.en}), status ${last.status}.`
              : "No demo order is on file yet."
          } Payment is not wired.`,
      links: [
        { href: "/panier", label: fr ? "Ouvrir le panier" : "Open the cart" },
        { href: "/compte/achats", label: fr ? "Mes achats" : "My orders" },
      ],
    };
  }

  if (/garage|vehicule|vehicle|niv|vin|ajouter/.test(query) && !matchingCategory(query)) {
    return {
      text: fr
        ? `Véhicule en cours : ${vehicleLine(vehicle, locale)}. Vous pouvez en ajouter d’autres dans le garage pour filtrer le catalogue et le carnet d’entretien.`
        : `Current vehicle: ${vehicleLine(vehicle, locale)}. You can add others in the garage to filter the catalogue and the service log.`,
      links: [
        { href: "/compte/vehicules", label: fr ? "Mes véhicules" : "My vehicles" },
        { href: "/", label: fr ? "Choisir un véhicule" : "Choose a vehicle" },
      ],
    };
  }

  if (/entretien|vidange|interval|service log|maintenance|kilometr/.test(query)) {
    const type = entretienTypes.find((item) => {
      const labels = {
        oil: ["huile", "oil", "vidange"],
        "oil-filter": ["filtre a huile", "oil filter"],
        "cabin-filter": ["habitacle", "cabin"],
        "air-filter": ["filtre a air", "air filter"],
        plugs: ["bougie", "spark"],
        coolant: ["liquide", "coolant"],
        brakes: ["frein", "brake"],
        tires: ["pneu", "tire", "rotation"],
        battery: ["batterie", "battery"],
        other: [],
      }[item.id];
      return labels?.some((word) => query.includes(word));
    });
    const picked = type ?? entretienTypes[0];
    return {
      text: fr
        ? `Pour ${vehicleLine(vehicle, locale)}, l’intervalle de référence « ${picked.id} » est d’environ ${formatKm(picked.km, "fr")} ou ${picked.months} mois. Ce sont des repères généraux : le carnet du propriétaire prime. Vous pouvez inscrire un entretien dans le portail.`
        : `For ${vehicleLine(vehicle, locale)}, the reference interval for “${picked.id}” is about ${formatKm(picked.km, "en")} or ${picked.months} months. These are general marks — the owner’s manual wins. You can log service in the portal.`,
      links: [{ href: "/compte/entretien", label: fr ? "Carnet d’entretien" : "Service log" }],
    };
  }

  const ranked = pool
    .map((product) => ({ product, score: scoreProduct(product, query, locale) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((row) => row.product);

  const category = matchingCategory(query);
  const fromCategory = category
    ? pool.filter((product) => product.categoryId === category.id)
    : [];
  const found = ranked.length ? ranked : fromCategory;

  if (found.length) {
    const top = found[0];
    const offer = bestOffer(top);
    const others = [...top.offers].sort((a, b) => a.price - b.price);
    const offerLines = others
      .map((item) => `${getVendor(item.vendorId).name} ${formatCad(item.price, locale)}${item.stock < 1 ? (fr ? " (rupture)" : " (out)") : ""}`)
      .join(fr ? ", " : ", ");

    return {
      text: fr
        ? `Pour ${vehicleLine(vehicle, locale)}, je retiens surtout ${top.brand} ${top.name.fr} (${top.partNumber}). Meilleure offre en stock : ${formatCad(offer.price, locale)} chez ${getVendor(offer.vendorId).name}. Autres marchands : ${offerLines}.`
        : `For ${vehicleLine(vehicle, locale)}, the closest match is ${top.brand} ${top.name.en} (${top.partNumber}). Best in-stock offer: ${formatCad(offer.price, locale)} at ${getVendor(offer.vendorId).name}. Other vendors: ${offerLines}.`,
      links: [
        ...productLinks(found, locale),
        category
          ? { href: `/pieces/${category.slug}`, label: fr ? "Toute la catégorie" : "Whole category" }
          : { href: "/pieces", label: fr ? "Catalogue" : "Catalogue" },
      ],
    };
  }

  if (category) {
    return {
      text: fr
        ? `Je n’ai pas de pièce « ${category.slug} » pour ${vehicleLine(vehicle, locale)} dans ce prototype. Changez de véhicule ou parcourez le catalogue.`
        : `I don’t have a “${category.slug}” part for ${vehicleLine(vehicle, locale)} in this prototype. Switch vehicle or browse the catalogue.`,
      links: [{ href: `/pieces/${category.slug}`, label: fr ? "Ouvrir la catégorie" : "Open category" }],
    };
  }

  return {
    text: fr
      ? `Je n’ai pas trouvé ça dans le catalogue du véhicule (${vehicleLine(vehicle, locale)}). Essayez un type de pièce (plaquettes, filtre, huile, batterie) ou ouvrez le garage.`
      : `I couldn’t find that in this vehicle’s catalogue (${vehicleLine(vehicle, locale)}). Try a part type (pads, filter, oil, battery) or open the garage.`,
    links: [
      { href: "/pieces", label: fr ? "Pièces" : "Parts" },
      { href: "/compte/vehicules", label: fr ? "Garage" : "Garage" },
    ],
  };
}

export function greeting(ctx: ChatContext): ChatReply {
  const fr = ctx.locale === "fr";
  return {
    text: fr
      ? `Je peux comparer les offres et confirmer la compatibilité. Véhicule en cours : ${vehicleLine(ctx.vehicle, ctx.locale)}.`
      : `I can compare offers and check fitment. Current vehicle: ${vehicleLine(ctx.vehicle, ctx.locale)}.`,
  };
}

export function productPrompt(product: Product, locale: "fr" | "en") {
  return locale === "fr"
    ? `Cette pièce convient-elle à mon véhicule : ${product.name.fr} (${product.partNumber}) ?`
    : `Does this part fit my vehicle: ${product.name.en} (${product.partNumber})?`;
}
