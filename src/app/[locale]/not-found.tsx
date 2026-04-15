import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-700">
        404
      </p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">
        Die Seite existiert nicht. / This page does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-ring px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
      >
        Home
      </Link>
    </div>
  );
}
