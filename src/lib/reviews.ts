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

type GoogleDetailsResult = {
  rating?: number;
  user_ratings_total?: number;
  reviews?: PlaceReview[];
};

const MOCK_REVIEWS_DE: PlaceReview[] = [
  {
    author_name: "S. Mueller",
    rating: 5,
    relative_time_description: "vor 2 Wochen",
    text: "Sehr freundlich und super schnell vor Ort. Tuer ohne Schaden geoeffnet und der Preis war wie vorher am Telefon gesagt.",
  },
  {
    author_name: "Julia K.",
    rating: 5,
    relative_time_description: "vor 1 Monat",
    text: "Abends ausgesperrt gewesen, nach 25 Minuten da. Transparent erklaert was gemacht wird und faire Rechnung.",
  },
  {
    author_name: "M. Schneider",
    rating: 4,
    relative_time_description: "vor 3 Wochen",
    text: "Kompetent und zuverlaessig. Schlosswechsel sauber erledigt, kurze Wartezeit.",
  },
  {
    author_name: "Lena Hofmann",
    rating: 5,
    relative_time_description: "vor 6 Tagen",
    text: "Sehr guter Service, freundlich und professionell. Wuerde ich jederzeit wieder anrufen.",
  },
  {
    author_name: "Tobias W.",
    rating: 5,
    relative_time_description: "vor 2 Monaten",
    text: "Preis-Leistung top. Keine versteckten Kosten und schnelle Hilfe.",
  },
];

const MOCK_REVIEWS_EN: PlaceReview[] = [
  {
    author_name: "S. Mueller",
    rating: 5,
    relative_time_description: "2 weeks ago",
    text: "Very friendly and arrived quickly. Opened the door without damage and the price matched what was quoted on the phone.",
  },
  {
    author_name: "Julia K.",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "Locked out in the evening, arrived in about 25 minutes. Transparent process and fair invoice.",
  },
  {
    author_name: "M. Schneider",
    rating: 4,
    relative_time_description: "3 weeks ago",
    text: "Competent and reliable. Lock replacement was done cleanly with short waiting time.",
  },
  {
    author_name: "Lena Hofmann",
    rating: 5,
    relative_time_description: "6 days ago",
    text: "Great service, friendly and professional. Would call again anytime.",
  },
  {
    author_name: "Tobias W.",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "Excellent value for money. No hidden costs and fast support.",
  },
];

function getMockPayload(locale: string): ReviewsPayload {
  const reviews = locale === "en" ? MOCK_REVIEWS_EN : MOCK_REVIEWS_DE;
  return {
    ok: true,
    configured: false,
    placeResolved: true,
    reviews,
    rating: 4.9,
    user_ratings_total: 87,
  };
}

function getPlaceIdFromEnv(): string | undefined {
  return process.env.GOOGLE_PLACE_ID?.trim() || undefined;
}

async function resolvePlaceId(apiKey: string): Promise<string | null> {
  const fromEnv = getPlaceIdFromEnv();
  if (fromEnv) return fromEnv;

  const phone = encodeURIComponent(
    process.env.GOOGLE_PLACES_PHONE ?? "+491747120901",
  );
  const findUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${phone}&inputtype=phonenumber&fields=place_id&key=${apiKey}`;
  const findRes = await fetch(findUrl);
  const findData = (await findRes.json()) as {
    status: string;
    candidates?: { place_id: string }[];
  };
  if (findData.status === "OK" && findData.candidates?.[0]?.place_id) {
    return findData.candidates[0].place_id;
  }

  const q = encodeURIComponent(
    process.env.GOOGLE_PLACES_SEARCH_QUERY ??
      "Schlüsselnotdienst Florian Weineck Heidelberg",
  );
  const textUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${q}&key=${apiKey}`;
  const textRes = await fetch(textUrl);
  const textData = (await textRes.json()) as {
    status: string;
    results?: { place_id: string }[];
  };
  if (textData.status === "OK" && textData.results?.[0]?.place_id) {
    return textData.results[0].place_id;
  }

  return null;
}

export async function getReviewsForLocale(
  locale: string,
): Promise<ReviewsPayload> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const lang = locale === "en" ? "en" : "de";

  if (!apiKey) {
    return getMockPayload(locale);
  }

  const placeId = await resolvePlaceId(apiKey);
  if (!placeId) {
    return {
      ok: false,
      configured: true,
      placeResolved: false,
      reviews: [],
      rating: null,
      user_ratings_total: null,
    };
  }

  const detailsUrl =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${encodeURIComponent(placeId)}` +
    `&fields=reviews,rating,user_ratings_total` +
    `&language=${encodeURIComponent(lang)}` +
    `&key=${encodeURIComponent(apiKey)}`;

  const detailsRes = await fetch(detailsUrl);
  const detailsData = (await detailsRes.json()) as {
    status: string;
    result?: GoogleDetailsResult;
  };

  if (detailsData.status !== "OK" || !detailsData.result) {
    return {
      ok: false,
      configured: true,
      placeResolved: true,
      reviews: [],
      rating: null,
      user_ratings_total: null,
    };
  }

  const r = detailsData.result;
  return {
    ok: true,
    configured: true,
    placeResolved: true,
    reviews: r.reviews ?? [],
    rating: r.rating ?? null,
    user_ratings_total: r.user_ratings_total ?? null,
  };
}
