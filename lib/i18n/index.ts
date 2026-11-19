import { messages as ptBR } from "./pt-BR";

/**
 * Só pt-BR por enquanto. Para um segundo idioma: crie `lib/i18n/en.ts`
 * com o mesmo formato de `Messages` e escolha o catálogo aqui (ou por segmento).
 * Posts continuam em `content/posts` até existir `content/<locale>/posts`.
 */
const catalogs = { "pt-BR": ptBR } as const;

export const locale = "pt-BR" as const;
export const m = catalogs[locale];
export type Messages = typeof ptBR;
