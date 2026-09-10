export function formatCad(value: number, locale: string) {
  return new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(value);
}

export function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

export function formatKm(value: number, locale: string) {
  return `${new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA").format(value)} km`;
}
