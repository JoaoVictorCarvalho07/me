const MONTHS: Record<string, number> = {
  jan: 0,
  janeiro: 0,
  feb: 1,
  fev: 1,
  fevereiro: 1,
  mar: 2,
  marco: 2,
  apr: 3,
  abr: 3,
  abril: 3,
  may: 4,
  mai: 4,
  maio: 4,
  jun: 5,
  junho: 5,
  jul: 6,
  julho: 6,
  aug: 7,
  ago: 7,
  agosto: 7,
  sep: 8,
  set: 8,
  setembro: 8,
  oct: 9,
  out: 9,
  outubro: 9,
  nov: 10,
  novembro: 10,
  dec: 11,
  dez: 11,
  dezembro: 11,
};

const SHORT = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

export function parsePostDate(raw: string): Date {
  const trimmed = raw.trim();
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(trimmed);
  if (iso) {
    return new Date(Date.UTC(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])));
  }
  const named = /^(\d{1,2})\s+([A-Za-zÀ-ÿ]+)\s+(\d{4})$/.exec(trimmed);
  if (named) {
    const key = named[2]
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{M}/gu, "");
    const month = MONTHS[key];
    if (month === undefined) throw new Error(`Mês desconhecido em "${raw}"`);
    return new Date(Date.UTC(Number(named[3]), month, Number(named[1])));
  }
  throw new Error(`Data inválida: "${raw}"`);
}

export function formatPostDate(date: Date): string {
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${day} ${SHORT[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
