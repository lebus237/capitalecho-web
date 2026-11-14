import { getSection, type Edition, type Kind } from "./data";

export type ArticleSection = { id: string; heading: string; paragraphs: string[] };

/**
 * Demonstration content. Each sub-edition (deal, country, market…) gets a structured
 * article following the editorial structure described in the spec. Replace this module
 * with a CMS / API call once the editorial team provides real content.
 */
const TEMPLATES: Record<Kind, (l: string, e: Edition) => [string, string[]][]> = {
  deals: (l, e) => [
    ["Présentation", [`${l} fait partie des opérations étudiées dans cette édition, « ${e.title} ». L’opération est présentée ici dans ses grandes lignes : ce qui a été annoncé, par qui, et dans quel calendrier.`, "Elle s’inscrit dans une dynamique d’investissement plus large sur le continent, où les montages financiers se diversifient."]],
    ["Secteur et localisation", [`Le secteur concerné pèse un poids croissant dans l’économie locale. La localisation de l’opération (${e.places}) répond à des besoins identifiés en matière d’infrastructures, d’emplois et de chaînes de valeur.`]],
    ["Acteurs impliqués", ["Plusieurs acteurs interviennent : l’investisseur principal, les partenaires financiers, les autorités locales et les opérateurs sur le terrain. Leurs rôles respectifs déterminent la gouvernance et le calendrier de l’opération."]],
    ["Données clés", ["Les montants, les échéances et les engagements pris sont détaillés lorsqu’ils sont communiqués publiquement. Lorsqu’une donnée n’est pas disponible, la rédaction l’indique explicitement."]],
    ["Impact économique et stratégique", ["Les retombées attendues portent sur l’emploi, la balance commerciale et la capacité industrielle. L’enjeu stratégique est de réduire la dépendance aux importations et d’attirer d’autres investisseurs."]],
    ["Perspectives", ["Les prochaines étapes à surveiller sont les autorisations réglementaires, la mobilisation des financements et le démarrage effectif des travaux."]],
  ],
  countries: (l, e) => [
    ["Synthèse de la semaine", [`Pour ${l}, la semaine a été marquée par plusieurs décisions et publications qui éclairent la trajectoire économique du pays. Cette synthèse reprend les faits essentiels de l’édition « ${e.title} ».`]],
    ["Indicateurs", ["Croissance, inflation, taux de change et conditions de financement : les indicateurs disponibles sont rappelés avec leur date de publication et leur source."]],
    ["Annonces économiques", ["Les annonces des autorités et des entreprises publiques sont passées en revue : budget, réformes, grands projets et appels d’offres."]],
    ["À surveiller", ["Les rendez-vous de la semaine à venir : publications statistiques, réunions des banques centrales et échéances budgétaires."]],
  ],
  markets: (l) => [
    ["La séance", [`Sur ${l}, la séance s’est déroulée dans un climat partagé entre prises de bénéfices et achats sélectifs. Les volumes d’échanges sont comparés à la moyenne récente.`]],
    ["Indices", ["Évolution des principaux indices à la clôture, sur la séance, depuis le début de la semaine et depuis le début de l’année."]],
    ["Principales variations", ["Les valeurs qui se sont le plus distinguées, à la hausse comme à la baisse, avec les raisons identifiées : résultats, dividendes, annonces corporate."]],
    ["Actualité financière", ["Les communiqués de sociétés cotées, les opérations sur titres et les décisions des régulateurs qui ont rythmé la journée."]],
  ],
  topics: (l, e) => [
    ["Ce qui a été annoncé", [`« ${e.title} » : l’annonce a fait les gros titres. Voici ce qu’elle dit précisément — et ce qu’elle ne dit pas. Volet : ${l}.`]],
    ["Le contexte", ["Pour comprendre la portée de l’annonce, il faut revenir sur les mois précédents : négociations, contraintes réglementaires et rapports de force entre acteurs."]],
    ["Les non-dits", ["Certaines conséquences ne figurent pas dans les communiqués : coûts de mise en œuvre, calendrier réel et effets sur les parties prenantes."]],
    ["Ce que cela change", ["Pour les investisseurs, les entreprises et les ménages : les effets possibles à court et moyen terme."]],
  ],
  companies: (l, e) => [
    ["Présentation", [`${l} : portrait d’une entreprise présentée dans l’édition « ${e.title} », réalisée en partenariat avec Valoris lorsque mentionné.`]],
    ["Activité et positionnement", ["Son marché, ses clients, ses concurrents et ce qui la distingue : le modèle économique est expliqué simplement."]],
    ["Chiffres clés", ["Chiffre d’affaires, croissance, effectifs et financements levés, lorsque l’entreprise les communique."]],
    ["Stratégie et perspectives", ["Expansion géographique, nouveaux produits et besoins de financement : ce que l’entreprise prévoit pour les prochaines années."]],
  ],
  focus: (l, e) => [
    ["Vue d’ensemble", [`Cette partie — ${l} — fait partie de l’analyse « ${e.title} ». Elle pose le cadre : taille de l’économie, structure sectorielle et moteurs de croissance.`]],
    ["Les secteurs porteurs", ["Les secteurs qui tirent la croissance et ceux qui concentrent les investissements publics et privés."]],
    ["Le cadre pour investir", ["Fiscalité, réglementation, accès au financement et risques à connaître avant d’investir."]],
    ["Perspectives", ["Les scénarios à moyen terme et les signaux à suivre."]],
  ],
  builders: (l) => [
    ["Le parcours", [`${l} : de l’idée de départ aux premières ventes, les étapes qui ont façonné cette aventure entrepreneuriale.`]],
    ["Les obstacles", ["Financement, recrutement, logistique : les difficultés rencontrées et la manière dont elles ont été surmontées."]],
    ["Les enseignements", ["Ce que ce parcours enseigne à ceux qui souhaitent entreprendre ou investir sur le continent."]],
  ],
  explainer: (l, e) => [
    [l, [`Dans « ${e.title} », cette partie explique : ${l.toLowerCase()}. Les notions sont définies simplement, avec des exemples tirés des marchés africains.`]],
    ["À retenir", ["Les points essentiels en quelques lignes, pour décider en connaissance de cause."]],
    ["Pour aller plus loin", ["Des pistes pour approfondir : documents de référence, régulateurs et publications associées."]],
  ],
  interview: (l, e) => [
    [l, [`Dans cet entretien (« ${e.title} »), l’invité aborde le thème « ${l} ». Les questions de la rédaction sont suivies de ses réponses, résumées fidèlement.`]],
    ["Citation", ["« L’enjeu est de donner aux entreprises africaines les moyens de croître sur la durée. » — extrait illustratif"]],
    ["Ce qu’il faut retenir", ["Trois messages clés de l’entretien, à retrouver aussi dans le format Shorts."]],
  ],
};

export function getArticle(edition: Edition, entryLabel: string): ArticleSection[] {
  const kind = getSection(edition.n).kind;
  return TEMPLATES[kind](entryLabel, edition).map(([heading, paragraphs], i) => ({
    id: `s${i + 1}`,
    heading,
    paragraphs,
  }));
}

/** Short vertical cards for the Shorts format: one per section, first sentence only. */
export function getShorts(edition: Edition, entryLabel: string) {
  return getArticle(edition, entryLabel).map((s) => ({
    id: s.id,
    heading: s.heading,
    text: s.paragraphs[0].split(/(?<=[.!?»])\s/)[0],
  }));
}
