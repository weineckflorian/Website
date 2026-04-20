export type PlaceReview = {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url?: string;
};

export type ReviewsPayload = {
  ok: boolean;
  configured: boolean;
  placeResolved: boolean;
  reviews: PlaceReview[];
  rating: number | null;
  user_ratings_total: number | null;
};

const STATIC_REVIEWS_DE: PlaceReview[] = [
  {
    author_name: "Jens Gandyra",
    rating: 5,
    relative_time_description: "vor 2 Tagen",
    text: "Top Service! Schnell, zuverlässig und absolut professionell.",
  },
  {
    author_name: "Timbo",
    rating: 5,
    relative_time_description: "vor einer Woche",
    text: "Ich hatte mich ausgesperrt und der Dienst war unglaublich schnell zur Stelle. Sehr freundlicher und kompetenter Mitarbeiter, der die Tür in wenigen Minuten ohne jegliche Schäden geöffnet hat. Der Preis war absolut fair und transparent. Klare Empfehlung – vielen Dank für die schnelle Hilfe!",
  },
  {
    author_name: "Selina Orfanelli",
    rating: 5,
    relative_time_description: "vor einer Woche",
    text: "Schnell und zuverlässig - alles Top!",
  },
  {
    author_name: "Dennis Schuranski",
    rating: 5,
    relative_time_description: "vor einer Woche",
    text: "Ich hatte kürzlich ein Problem mit meiner Haustür und habe den Schlüsseldienst Weineck kontaktiert und ich bin wirklich sehr zufrieden Der Service war schnell, zuverlässig und absolut professionell. Schon am Telefon wurde ich freundlich und kompetent beraten.",
  },
  {
    author_name: "Sabine",
    rating: 5,
    relative_time_description: "vor 2 Wochen",
    text: "Hr. Weineck hat alles schnell und sauber erledigt 👍",
  },
  {
    author_name: "Christian Hefele",
    rating: 5,
    relative_time_description: "vor 2 Wochen",
    text: "Zuverlässig und gute Arbeit. Top!",
  },
  {
    author_name: "Fiona Rosenbaum",
    rating: 5,
    relative_time_description: "vor 2 Wochen",
    text: "War sehr hilfreich und nett",
  },
  {
    author_name: "Daniel Schreiter",
    rating: 5,
    relative_time_description: "vor 2 Wochen",
    text: "Herr Weineck war sehr professionell und zuverlässig an meiner Tür. Ich hatte mich ausgesperrt und er kam zeitnah und öffnete die Tür schon nach kurzer Zeit. Der Preis war fair und klar kommuniziert. Gerne wieder!",
  },
  {
    author_name: "yannik storz",
    rating: 5,
    relative_time_description: "vor 2 Wochen",
    text: "Ich musste den Schlüsseldienst Weineck an einem Sonntagabend kontaktieren, weil ich mich ausgesperrt hatte. Am Telefon wurde mir direkt ein fairer Festpreis genannt, inklusive Anfahrt, was ich schon mal positiv fand.",
  },
  {
    author_name: "svenja",
    rating: 5,
    relative_time_description: "vor 2 Wochen",
    text: "Richtig guter Service. Er war schnell da, sehr freundlich und zuverlässig. Der Preis war auch unschlagbar. Falls mir wieder so etwas passieren sollte werde ich nochmal hier anrufen!!",
  },
];

function getStaticPayload(): ReviewsPayload {
  return {
    ok: true,
    configured: true,
    placeResolved: true,
    reviews: STATIC_REVIEWS_DE,
    rating: 5,
    user_ratings_total: 10,
  };
}

export async function getReviewsForLocale(
  _locale: string,
): Promise<ReviewsPayload> {
  return getStaticPayload();
}
