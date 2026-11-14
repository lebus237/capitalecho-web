export type Kind = "countries" | "markets" | "topics" | "deals" | "companies" | "focus" | "builders" | "explainer" | "interview";

export type Section = {
  n: string;
  name: string;
  promise: string;
  partner?: string;
  kind: Kind;
  /** SVG path data on a 24x24 viewBox (stroke icon). */
  icon: string;
  about: { mission: string; approach: string; rhythm: string };
};

export type Edition = {
  id: string;
  /** Section number, e.g. "04". */
  n: string;
  kicker: string;
  title: string;
  summary: string;
  places: string;
  date: string;
  author: string;
  readMin: number;
  /** Labels of the sub-editions (deals, countries, markets…) shown in the contextual sidebar. */
  entries: string[];
};

export type TickerItem = { name: string; value: string; change: string; date: string };

export const SECTIONS: Section[] = [
  { n: "01", name: "African Economic Weekly", kind: "countries", promise: "The Week’s Economy, Across The Continent", icon: "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20M2 12h20M12 2a15.3 15.3 0 0 1 4 10a15.3 15.3 0 0 1-4 10a15.3 15.3 0 0 1-4-10a15.3 15.3 0 0 1 4-10",
    about: { mission: "Donner chaque semaine une lecture claire de l’actualité économique des principaux pays africains.", approach: "Une synthèse par pays : actualités, indicateurs disponibles, annonces et événements marquants de la semaine.", rhythm: "Chaque lundi" } },
  { n: "02", name: "Daily Market Review", kind: "markets", promise: "Africa’s Markets, Every Trading Day", icon: "M3 3v18h18M7 16v-3M11 16v-6M15 16v-4M19 16V7",
    about: { mission: "Résumer chaque jour de bourse ce qu’il faut retenir des places financières africaines.", approach: "Une fiche par marché : évolution des indices, principales variations de titres et actualité financière.", rhythm: "Chaque jour de bourse" } },
  { n: "03", name: "Beyond The Headlines", kind: "topics", promise: "The Story Behind Africa’s Business News", icon: "M4 4h13v16H6a2 2 0 0 1-2-2zM17 8h3v10a2 2 0 0 1-2 2M8 8h5M8 12h5M8 16h5",
    about: { mission: "Aller au-delà de l’annonce pour expliquer ce que les grands titres ne disent pas.", approach: "Un décryptage par sujet, avec contexte, acteurs concernés et enjeux de fond.", rhythm: "Deux fois par semaine" } },
  { n: "04", name: "Africa Impact Deals", kind: "deals", promise: "Inside Africa’s Most Transformative Investments", icon: "m11 17 2 2a1 1 0 1 0 3-3M14 14l2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4M21 3l1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8",
    about: { mission: "Mettre en lumière les opérations d’investissement qui transforment les économies africaines.", approach: "Chaque édition regroupe plusieurs deals : présentation, acteurs, objectifs stratégiques, retombées et perspectives.", rhythm: "Chaque semaine" } },
  { n: "05", name: "Inside Company", kind: "companies", promise: "Inside Africa’s Most Promising Companies", partner: "Partnership with Valoris", icon: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18zM6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4",
    about: { mission: "Faire connaître les entreprises africaines qui attirent les investisseurs.", approach: "Un portrait par entreprise : activité, positionnement, stratégie et perspectives, réalisé en partenariat avec Valoris.", rhythm: "Chaque semaine" } },
  { n: "06", name: "Country Focus", kind: "focus", promise: "One Country, Read In Depth", icon: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0zM12 7a3 3 0 1 0 0 6a3 3 0 1 0 0-6",
    about: { mission: "Lire un pays en profondeur : son économie, ses secteurs et ses perspectives d’investissement.", approach: "Une analyse structurée en parties thématiques, avec sommaire interactif et blocs dépliables.", rhythm: "Toutes les deux semaines" } },
  { n: "07", name: "African Success Stories", kind: "builders", promise: "Inside Africa’s Most Inspiring Builders", icon: "M12 2a6 6 0 1 0 0 12a6 6 0 1 0 0-12M15.5 12.9 17 22l-5-3-5 3 1.5-9.1",
    about: { mission: "Raconter les parcours d’entrepreneurs qui bâtissent à l’échelle du continent.", approach: "Un portrait par entrepreneur : origine du projet, étapes clés, obstacles et enseignements.", rhythm: "Chaque semaine" } },
  { n: "08", name: "Investment Explained", kind: "explainer", promise: "Africa’s Investment Ideas, Made Clear", icon: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4",
    about: { mission: "Rendre les concepts d’investissement accessibles avant de passer à l’action.", approach: "Des explications pas à pas : le principe, les risques, les exemples africains et les questions à se poser.", rhythm: "Chaque semaine" } },
  { n: "09", name: "CapitalEcho Interview", kind: "interview", promise: "Conversations With Africa’s Decision-Makers", icon: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3",
    about: { mission: "Donner la parole aux décideurs qui façonnent l’économie africaine.", approach: "Un entretien structuré autour de quelques questions clés, en texte, en vidéo et en format court.", rhythm: "Chaque semaine" } },
];

const A = "Rédaction CapitalEcho";

export const EDITIONS: Edition[] = [
  // 01
  { id: "aew-2026-11-09", n: "01", kicker: "African Economic Weekly", title: "Croissance, inflation et monnaie : la semaine économique en Afrique de l’Ouest", summary: "Les principaux faits économiques de la semaine dans six pays d’Afrique de l’Ouest et centrale.", places: "Afrique de l’Ouest", date: "9 novembre 2026", author: A, readMin: 6, entries: ["Cameroun", "Côte d’Ivoire", "Nigeria", "Kenya", "Afrique du Sud", "Ghana"] },
  { id: "aew-2026-11-02", n: "01", kicker: "African Economic Weekly", title: "Budgets 2027 : ce que prévoient les gouvernements de la région", summary: "Tour d’horizon des projets de budget annoncés.", places: "Afrique de l’Ouest", date: "2 novembre 2026", author: A, readMin: 5, entries: ["Côte d’Ivoire", "Sénégal", "Ghana"] },
  { id: "aew-2026-10-26", n: "01", kicker: "African Economic Weekly", title: "Taux directeurs : les banques centrales restent prudentes", summary: "Les décisions monétaires de la semaine.", places: "Afrique", date: "26 octobre 2026", author: A, readMin: 5, entries: ["Nigeria", "Kenya", "Afrique du Sud"] },
  // 02
  { id: "dmr-2026-11-13", n: "02", kicker: "Daily Market Review", title: "Bourses africaines : ce qu’il fallait retenir de la séance", summary: "Les mouvements des principales places africaines à la clôture.", places: "Afrique de l’Ouest · Afrique australe", date: "13 novembre 2026", author: A, readMin: 4, entries: ["BRVM — Marché régional de l’UEMOA", "BVMAC — Marché financier de la CEMAC", "NGX — Nigeria", "Ghana Stock Exchange — Ghana", "Nairobi Securities Exchange — Kenya", "Johannesburg Stock Exchange — Afrique du Sud"] },
  { id: "dmr-2026-11-12", n: "02", kicker: "Daily Market Review", title: "Séance du 12 novembre : prises de bénéfices sur plusieurs places", summary: "Retour sur la séance de la veille.", places: "Afrique", date: "12 novembre 2026", author: A, readMin: 4, entries: ["BRVM — Marché régional de l’UEMOA", "NGX — Nigeria", "Johannesburg Stock Exchange — Afrique du Sud"] },
  { id: "dmr-2026-11-11", n: "02", kicker: "Daily Market Review", title: "Séance du 11 novembre : la BRVM résiste", summary: "Les faits marquants de la séance.", places: "Afrique de l’Ouest", date: "11 novembre 2026", author: A, readMin: 4, entries: ["BRVM — Marché régional de l’UEMOA", "NGX — Nigeria"] },
  // 03
  { id: "btl-2026-11-12", n: "03", kicker: "Beyond The Headlines", title: "Derrière l’annonce : ce que les grands titres ne disent pas", summary: "Décryptage de deux annonces récentes qui ont fait la une.", places: "Afrique de l’Est", date: "12 novembre 2026", author: A, readMin: 7, entries: ["L’annonce", "Les acteurs", "Ce qui change"] },
  { id: "btl-2026-11-09", n: "03", kicker: "Beyond The Headlines", title: "Fusion bancaire : les enjeux cachés", summary: "Ce que cache le rapprochement annoncé.", places: "Afrique de l’Est", date: "9 novembre 2026", author: A, readMin: 6, entries: ["L’annonce", "Les acteurs", "Ce qui change"] },
  { id: "btl-2026-11-05", n: "03", kicker: "Beyond The Headlines", title: "Dette : lecture d’un accord très attendu", summary: "Les conditions réelles de l’accord.", places: "Afrique", date: "5 novembre 2026", author: A, readMin: 6, entries: ["L’annonce", "Les acteurs", "Ce qui change"] },
  // 04
  { id: "impact-2026-11-02", n: "04", kicker: "Deal à impact", title: "Trois pays, trois opérations, trois enjeux d’investissement", summary: "Trois opérations d’investissement lues à travers leurs enjeux économiques et stratégiques.", places: "Cameroun · Côte d’Ivoire · Gabon", date: "2 novembre 2026", author: A, readMin: 9, entries: ["Deal 01 — Énergie et infrastructures", "Deal 02 — Financement d’une entreprise technologique", "Deal 03 — Investissement dans l’agriculture"] },
  { id: "impact-dangote-hydrocarbures", n: "04", kicker: "Deal à impact", title: "Après le ciment, Dangote se lance dans les hydrocarbures au Cameroun", summary: "Un groupe industriel diversifie ses activités vers les hydrocarbures.", places: "Cameroun", date: "[Date de publication]", author: A, readMin: 6, entries: ["Le deal"] },
  { id: "impact-2026-10-26", n: "04", kicker: "Deal à impact", title: "Énergie solaire : un financement qui change d’échelle", summary: "Un financement structuré pour l’énergie solaire.", places: "Gabon · Sénégal", date: "26 octobre 2026", author: A, readMin: 7, entries: ["Deal 01 — Énergie solaire", "Deal 02 — Réseau de distribution"] },
  // 05
  { id: "company-2026-11-11", n: "05", kicker: "Inside Company", title: "Des entreprises africaines qui attirent les investisseurs", summary: "Deux portraits d’entreprises soutenues par des investisseurs.", places: "Nigeria · Maroc", date: "11 novembre 2026", author: A, readMin: 8, entries: ["Entreprise A — Nigeria", "Entreprise B — Maroc"] },
  { id: "company-2026-11-04", n: "05", kicker: "Inside Company", title: "Logistique : un acteur régional en pleine expansion", summary: "Portrait d’un opérateur logistique.", places: "Côte d’Ivoire", date: "4 novembre 2026", author: A, readMin: 6, entries: ["Présentation", "Stratégie"] },
  { id: "company-2026-10-28", n: "05", kicker: "Inside Company", title: "Fintech : le pari du paiement mobile", summary: "Portrait d’une fintech.", places: "Kenya", date: "28 octobre 2026", author: A, readMin: 6, entries: ["Présentation", "Stratégie"] },
  // 06
  { id: "focus-2026-11-10", n: "06", kicker: "Country Focus", title: "Sénégal : les grands chantiers qui structurent l’économie", summary: "Analyse sectorielle et perspectives d’investissement.", places: "Sénégal", date: "10 novembre 2026", author: A, readMin: 12, entries: ["Vue d’ensemble", "Énergie", "Infrastructures", "Perspectives"] },
  { id: "focus-2026-10-27", n: "06", kicker: "Country Focus", title: "Maroc : l’industrie automobile à la conquête de l’Afrique", summary: "Une filière industrielle en croissance.", places: "Maroc", date: "27 octobre 2026", author: A, readMin: 11, entries: ["Vue d’ensemble", "Industrie", "Perspectives"] },
  { id: "focus-2026-10-13", n: "06", kicker: "Country Focus", title: "Kenya : l’économie numérique, moteur de croissance", summary: "Le numérique au cœur de la croissance.", places: "Kenya", date: "13 octobre 2026", author: A, readMin: 11, entries: ["Vue d’ensemble", "Numérique", "Perspectives"] },
  // 07
  { id: "stories-2026-11-08", n: "07", kicker: "African Success Stories", title: "Des entrepreneurs qui bâtissent à l’échelle du continent", summary: "Deux parcours d’entrepreneurs.", places: "Côte d’Ivoire · Ghana", date: "8 novembre 2026", author: A, readMin: 8, entries: ["Portrait 01 — Côte d’Ivoire", "Portrait 02 — Ghana"] },
  { id: "stories-2026-11-01", n: "07", kicker: "African Success Stories", title: "Du marché local aux rayons régionaux", summary: "Un parcours dans l’agro-industrie.", places: "Ghana", date: "1 novembre 2026", author: A, readMin: 7, entries: ["Le parcours", "Les enseignements"] },
  { id: "stories-2026-10-25", n: "07", kicker: "African Success Stories", title: "Construire une marque panafricaine", summary: "Un parcours dans la mode.", places: "Nigeria", date: "25 octobre 2026", author: A, readMin: 7, entries: ["Le parcours", "Les enseignements"] },
  // 08
  { id: "explained-2026-11-07", n: "08", kicker: "Investment Explained", title: "Comprendre les obligations souveraines avant d’investir", summary: "Le principe, les risques et les questions à se poser.", places: "Afrique de l’Ouest", date: "7 novembre 2026", author: A, readMin: 6, entries: ["Le principe", "Les risques", "Les exemples", "Les questions à se poser"] },
  { id: "explained-2026-10-31", n: "08", kicker: "Investment Explained", title: "Qu’est-ce qu’un indice boursier ?", summary: "Comment lire un indice.", places: "Afrique", date: "31 octobre 2026", author: A, readMin: 5, entries: ["Le principe", "Les exemples"] },
  { id: "explained-2026-10-24", n: "08", kicker: "Investment Explained", title: "Capital-investissement : comment ça marche ?", summary: "Le fonctionnement d’un fonds.", places: "Afrique", date: "24 octobre 2026", author: A, readMin: 6, entries: ["Le principe", "Les risques"] },
  // 09
  { id: "interview-2026-11-06", n: "09", kicker: "CapitalEcho Interview", title: "Entretien : la parole à un décideur sur le financement des PME", summary: "Un dirigeant explique comment financer la croissance des PME.", places: "Maroc", date: "6 novembre 2026", author: A, readMin: 10, entries: ["Le parcours", "Le financement des PME", "Les perspectives"] },
  { id: "interview-2026-10-30", n: "09", kicker: "CapitalEcho Interview", title: "Entretien : les marchés de capitaux régionaux", summary: "Un régulateur partage sa vision.", places: "Afrique de l’Ouest", date: "30 octobre 2026", author: A, readMin: 9, entries: ["Le parcours", "Les marchés régionaux"] },
  { id: "interview-2026-10-23", n: "09", kicker: "CapitalEcho Interview", title: "Entretien : bâtir un fonds panafricain", summary: "Un gestionnaire de fonds raconte.", places: "Afrique", date: "23 octobre 2026", author: A, readMin: 9, entries: ["Le parcours", "La stratégie"] },
];

export const TICKER: TickerItem[] = [
  { name: "BRVM Composite", value: "512,81", change: "−1,74 %", date: "10 nov." },
  { name: "NGX ASI", value: "252 456,74", change: "+1,44 %", date: "9 nov." },
  { name: "JSE All Share", value: "113 286,18", change: "+3,70 %", date: "5 nov." },
  { name: "EGX 30", value: "51 414,93", change: "+1,19 %", date: "9 nov." },
  { name: "EUR / XAF", value: "655,957", change: "0,00 %", date: "parité fixe" },
];

export const DEFAULT_SECTION_INDEX = 3; // "04 Africa Impact Deals"

export const editionsOf = (n: string) => EDITIONS.filter((e) => e.n === n);
export const getEdition = (id: string) => EDITIONS.find((e) => e.id === id);
export const getSection = (n: string) => SECTIONS.find((s) => s.n === n)!;

export const slug = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const entryId = (label: string) => slug(label);
