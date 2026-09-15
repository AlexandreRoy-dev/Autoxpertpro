import { getVehicle } from "@/data/vehicles";
import { answerChat, type ChatContext } from "@/lib/chatbot";
import { entretienSnapshot, searchCatalogue, vehicleSnapshot } from "@/lib/mechanic-tools";
import { convertToModelMessages, isStepCount, streamText, tool, type UIMessage } from "ai";
import { z } from "zod";

export const dynamic = "force-dynamic";

type SimpleMessage = { role: "user" | "assistant"; content: string };

type Incoming = {
  messages?: UIMessage[] | SimpleMessage[];
  locale?: "fr" | "en";
  fitmentId?: string | null;
  cartCount?: number;
  lastUser?: string;
};

function lastUserText(body: Incoming) {
  if (body.lastUser?.trim()) return body.lastUser.trim();
  const last = [...(body.messages ?? [])].reverse().find((message) => message.role === "user");
  if (!last) return "";
  if ("content" in last && typeof last.content === "string") return last.content;
  if ("parts" in last && Array.isArray(last.parts)) {
    return last.parts
      .filter((part) => part.type === "text" && "text" in part)
      .map((part) => String(part.text))
      .join(" ");
  }
  return "";
}

function mechanicSystem(locale: "fr" | "en", fitmentId?: string | null, cartCount = 0) {
  const vehicle = vehicleSnapshot(fitmentId);
  const vehicleLine = vehicle.selected
    ? `${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.engine})`
    : locale === "fr"
      ? "aucun véhicule sélectionné"
      : "no vehicle selected";

  return locale === "fr"
    ? `Tu es Marc, mécanicien-conseiller d’AutoXpert, un catalogue québécois qui compare NAPA, Canadian Tire, PartSource et l’entrepôt AutoXpert.
Parle comme un mécanicien de comptoir: clair, concret, sans slogans. Réponds en français.
Véhicule en cours: ${vehicleLine}. Articles au panier: ${cartCount}.
Utilise les outils pour chercher des pièces ou les intervalles d’entretien avant d’inventer un numéro de pièce ou un prix.
Cette version est un prototype: taxes, transport réel et paiement ne sont pas branchés. Dis-le si on te demande de payer ou de suivre un colis.
Cite la marque, le n° de pièce et le meilleur prix en stock quand tu recommandes quelque chose.`
    : `You are Marc, the AutoXpert counter mechanic. AutoXpert compares NAPA, Canadian Tire, PartSource and the AutoXpert warehouse for drivers in Quebec.
Speak like a shop advisor: plain, specific, no slogans. Answer in English.
Current vehicle: ${vehicleLine}. Items in cart: ${cartCount}.
Use tools to look up parts or service intervals before inventing a part number or a price.
This version is a prototype: live freight, taxes and payment are not wired. Say so if asked to pay or track a shipment.
When you recommend a part, mention brand, part number and the best in-stock price.`;
}

export async function POST(req: Request) {
  const body = (await req.json()) as Incoming;
  const locale = body.locale === "en" ? "en" : "fr";
  const fitmentId = body.fitmentId ?? null;
  const vehicle = fitmentId ? (getVehicle(fitmentId) ?? null) : null;
  const ctx: ChatContext = {
    locale,
    vehicle,
    cartCount: body.cartCount ?? 0,
    cart: [],
    orders: [],
  };
  const lastText = lastUserText(body);

  if (!process.env.AI_GATEWAY_API_KEY) {
    return Response.json(answerChat(lastText || (locale === "fr" ? "bonjour" : "hello"), ctx), {
      headers: { "x-chat-mode": "fallback" },
    });
  }

  const incoming = body.messages ?? [];
  const modelMessages =
    incoming.length && incoming[0] && "parts" in incoming[0]
      ? await convertToModelMessages(incoming as UIMessage[])
      : (incoming as SimpleMessage[]);

  try {
    const result = streamText({
      model: "openai/gpt-5.5",
      system: mechanicSystem(locale, fitmentId, body.cartCount),
      messages: modelMessages,
      stopWhen: isStepCount(5),
      tools: {
        searchParts: tool({
          description: "Search AutoXpert catalogue parts for the current vehicle.",
          inputSchema: z.object({
            query: z.string().describe("Part type, brand, symptom or part number"),
          }),
          execute: async ({ query }) => searchCatalogue(query, locale, fitmentId),
        }),
        getVehicle: tool({
          description: "Return the vehicle currently selected on the site.",
          inputSchema: z.object({}),
          execute: async () => vehicleSnapshot(fitmentId),
        }),
        getServiceIntervals: tool({
          description: "Return general service intervals. Owner’s manual still wins.",
          inputSchema: z.object({
            type: z.string().optional().describe("oil, brakes, battery, filter, etc."),
          }),
          execute: async ({ type }) => entretienSnapshot(locale, type),
        }),
      },
    });

    return result.toTextStreamResponse();
  } catch {
    return Response.json(answerChat(lastText || (locale === "fr" ? "bonjour" : "hello"), ctx), {
      headers: { "x-chat-mode": "fallback" },
    });
  }
}
