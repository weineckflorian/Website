import Link from "next/link";

export default function RootPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://schluesselnotdienst-weineck.de";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Schlüsselnotdienst Florian Weineck",
    url: siteUrl,
    inLanguage: ["de-DE", "en-US"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/de/`,
      "query-input": "required name=search_term_string",
    },
    about: "Schlüsseldienst Heidelberg und Rhein-Neckar",
  };

  return (
    <main id="main-content" className="mx-auto max-w-4xl px-6 py-10" role="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header>
        <h1 className="text-3xl font-bold text-zinc-900">
          Schlüsseldienst Heidelberg - Schlüsselnotdienst Florian Weineck
        </h1>
        <p className="mt-4 text-zinc-700">
          Willkommen bei Ihrem lokalen Schlüsseldienst für Heidelberg und die
          Rhein-Neckar-Region. Diese Seite dient als zentrale Übersicht für
          Nutzerinnen, Nutzer und Suchmaschinen. Sie finden hier die wichtigsten
          Leistungen, Kontaktwege und weiterführenden Seiten zu
          <strong> Türöffnung Heidelberg</strong>, Schlosswechsel,
          Sicherheitsberatung und Notfallhilfe.
        </p>
      </header>

      <section className="mt-8" aria-labelledby="leistungen">
        <h2 id="leistungen" className="text-2xl font-semibold text-zinc-900">
          Leistungen und Einsatzgebiet
        </h2>
        <p className="mt-3 text-zinc-700">
          Unser <em>Schlüsselnotdienst in Heidelberg</em> hilft bei zugefallenen
          Türen, defekten Schlössern und verlorenen Schlüsseln. Der Fokus liegt auf
          transparenter Preisstruktur, schneller Verfügbarkeit und sauberer Arbeit.
          Für viele Einsätze kann bereits am Telefon eine realistische Einschätzung
          gegeben werden, damit Sie vor Ort keine unangenehmen Überraschungen
          erleben.
        </p>
        <p className="mt-3 text-zinc-700">
          Wir arbeiten in Heidelberg sowie in angrenzenden Stadtteilen und Orten
          des Rhein-Neckar-Kreises. Dabei gilt: fair beraten, nachvollziehbar
          abrechnen und verständlich erklären, welche Optionen im konkreten Fall
          sinnvoll sind. Ein guter Schlüsseldienst bedeutet nicht nur schnelle
          Öffnung, sondern auch eine dauerhaft sichere Lösung für Ihre Immobilie.
        </p>
        <ul className="mt-4 list-disc pl-6 text-zinc-700">
          <li>Türöffnung ohne unnötige Beschädigung</li>
          <li>Schlosswechsel bei Defekt oder Verlust</li>
          <li>Sicherheits-Check für Wohnung und Haus</li>
          <li>Hilfe bei Notfällen rund um die Uhr</li>
        </ul>
      </section>

      <section className="mt-8" aria-labelledby="navigation">
        <h2 id="navigation" className="text-2xl font-semibold text-zinc-900">
          Wichtige Seiten (interne Links)
        </h2>
        <p className="mt-3 text-zinc-700">
          Nutzen Sie die internen Seiten für detaillierte Informationen. Diese klare
          Seitenstruktur hilft Besuchern und unterstützt Suchmaschinen bei der
          Einordnung der Inhalte.
        </p>
        <ul className="mt-4 list-disc pl-6 text-zinc-700">
          <li><Link href="/de/" title="Schlüsseldienst Heidelberg auf Deutsch" className="underline">Startseite DE</Link></li>
          <li><Link href="/en/" title="Locksmith Heidelberg in English" className="underline">Startseite EN</Link></li>
          <li><Link href="/de/impressum/" title="Impressum Schlüsseldienst Heidelberg" className="underline">Impressum DE</Link></li>
          <li><Link href="/de/datenschutz/" title="Datenschutz Schlüsseldienst Heidelberg" className="underline">Datenschutz DE</Link></li>
          <li><Link href="/en/impressum/" title="Imprint locksmith Heidelberg" className="underline">Impressum EN</Link></li>
          <li><Link href="/en/datenschutz/" title="Privacy policy locksmith Heidelberg" className="underline">Datenschutz EN</Link></li>
          <li><Link href="/sitemap.xml" title="XML Sitemap Schlüsseldienst Heidelberg" className="underline">Sitemap XML</Link></li>
          <li><Link href="/robots.txt" title="Robots Datei Schlüsseldienst Heidelberg" className="underline">Robots.txt</Link></li>
          <li><Link href="/de/#services" title="Leistungen Schlüsseldienst Heidelberg" className="underline">Leistungen</Link></li>
          <li><Link href="/de/#faq" title="FAQ Schlüsseldienst Heidelberg" className="underline">FAQ</Link></li>
          <li><Link href="/de/#kontakt" title="Kontakt Schlüsseldienst Heidelberg" className="underline">Kontakt</Link></li>
          <li><Link href="/de/#bewertungen" title="Bewertungen Schlüsseldienst Heidelberg" className="underline">Bewertungen</Link></li>
        </ul>
      </section>

      <section className="mt-8" aria-labelledby="medien">
        <h2 id="medien" className="text-2xl font-semibold text-zinc-900">
          Bilder und Kontext
        </h2>
        <p className="mt-3 text-zinc-700">
          Aussagekräftige Bilder mit passenden Dateinamen und Alt-Texten helfen
          Menschen mit Screenreadern und verbessern das thematische Verständnis für
          Crawler.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <img
            src="/images/heidelberg-hero.jpg"
            alt="Schlüsseldienst Heidelberg im Einsatz"
            title="Schlüsseldienst Heidelberg"
            loading="lazy"
          />
          <img
            src="/images/key-service-heidelberg.jpg"
            alt="Türöffnung durch Schlüsseldienst in Heidelberg"
            title="Türöffnung Heidelberg"
            loading="lazy"
          />
        </div>
      </section>

      <section className="mt-8" aria-labelledby="vertrauen">
        <h2 id="vertrauen" className="text-2xl font-semibold text-zinc-900">
          Qualität, Transparenz und vertrauenswürdige Quellen
        </h2>
        <p className="mt-3 text-zinc-700">
          Beim Thema Sicherheit zählen seriöse Informationen. Deshalb verlinken wir
          auch auf themenrelevante externe Quellen. Diese Verweise helfen Nutzern bei
          weiterführender Recherche und sind ein positives Signal für inhaltliche
          Einordnung.
        </p>
        <ol className="mt-4 list-decimal pl-6 text-zinc-700">
          <li>
            Sicherheitshinweise der Polizei:
            {" "}
            <a
              href="https://www.polizei-beratung.de/"
              target="_blank"
              rel="noopener noreferrer"
              title="Polizeiliche Kriminalprävention Einbruchschutz"
              className="underline"
            >
              polizei-beratung.de
            </a>
          </li>
          <li>
            Verbraucherinformationen:
            {" "}
            <a
              href="https://www.verbraucherzentrale.de/"
              target="_blank"
              rel="noopener noreferrer"
              title="Verbraucherzentrale Deutschland"
              className="underline"
            >
              verbraucherzentrale.de
            </a>
          </li>
        </ol>
        <blockquote className="mt-4 border-l-4 border-zinc-300 pl-4 italic text-zinc-700">
          "Ziel ist ein Schlüsseldienst in Heidelberg, der fair arbeitet,
          verständlich kommuniziert und langfristig empfohlen wird."
          <cite className="ml-2 not-italic">- Florian Weineck</cite>
        </blockquote>
      </section>

      <section className="mt-8" aria-labelledby="abschluss">
        <h3 id="abschluss" className="text-xl font-semibold text-zinc-900">
          Schnell zur passenden Sprachversion
        </h3>
        <p className="mt-3 text-zinc-700">
          Für die vollständigen Inhalte wechseln Sie direkt zur gewünschten
          Sprachversion. Dort finden Sie alle Details zu Leistungen, Ablauf, FAQ,
          Bewertungen und Kontakt. <b>Schlüsseldienst Heidelberg</b> und
          <i>Schlüsselnotdienst Heidelberg</i> bleiben auf allen Seiten klar und
          konsistent benannt, damit Suchmaschinen und KI-Systeme den Fokus der
          Website eindeutig erkennen.
        </p>
      </section>
    </main>
  );
}
