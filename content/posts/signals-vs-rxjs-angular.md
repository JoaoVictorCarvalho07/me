---
tags:
  - angular
  - signals
  - rxjs
  - frontend
  - typescript
  - estado
aliases:
  - Signals vs RxJS
  - Signals ou RxJS Angular
  - Quando usar Signal e quando usar RxJS
title: Signals ou RxJS? O modelo mental que finalmente fez sentido
desc: Depois de construir um sistema inteiro em Angular, parei de tratar Signal e RxJS como rivais e entendi onde cada um brilha
date: 16 Jun 2026
tag: Frontend
readTime: 8 min
thumb:
---

Quando comecei a mexer com Angular moderno, caí numa dúvida que me travou por uns dias: **uso Signal ou uso RxJS?** Os dois falam de "reatividade", os dois parecem resolver as mesmas coisas, e a maioria dos tutoriais usa um ou outro sem explicar *quando* escolher.

Depois de construir um sistema inteiro (um gestor de consultas odontológicas), cheguei num modelo mental que finalmente fez sentido. Este post é ele.

---

## Os dois parecem a mesma coisa (mas não são)

No começo eu tentei usar só um dos dois pra tudo. Dois becos sem saída:

- **Só RxJS:** todo estado de tela virava `BehaviorSubject` + `async` pipe. Funcionava, mas era verboso demais pra coisas simples ("esse modal está aberto?").
- **Só Signals:** ótimo pro estado, até eu precisar **cancelar uma requisição anterior** quando o filtro muda. Signal não tem `switchMap`. Não tem `debounce`. Não tem `retry`.

A virada foi parar de ver os dois como concorrentes. Eles resolvem problemas diferentes.

---

## O modelo que adotei

> **Signals = estado síncrono e derivações. RxJS = composição assíncrona.**

- **Signal** pra estado de UI (`loading`, `erro`, `busca`, `modalAberto`), pra valores **derivados** (`computed`: listas filtradas, totais) e como **gatilho** reativo. O template lê o signal direto.
- **RxJS** pro que é assíncrono de verdade: o HTTP (o `HttpClient` já devolve `Observable`), e principalmente quando preciso de operadores como `switchMap`, `distinctUntilChanged`, `catchError`, `shareReplay`.

Exemplo de `computed`, que substituiu vários `Subject` que eu tinha:

```ts
readonly pacientesFiltrados = computed(() => {
  const termo = this.busca().toLowerCase();
  return this.lista.items().filter(p => p.nome.toLowerCase().includes(termo));
});
```

Sem inscrição, sem unsubscribe, sem `async` pipe. Só lê outros signals e recalcula sozinho.

---

## Por que o cache não virou um Signal

Aqui foi a decisão que mais me fez pensar. Eu queria que, ao navegar entre telas, os dados **não** fossem rebuscados toda vez. A tentação era guardar num signal. Mas o cache ficou num `Observable`:

```ts
getAll(): Observable<Procedimento[]> {
  return (this.allCache$ ??= this.http
    .get<Procedimento[]>(`${this.API}/procedimentos`)
    .pipe(shareReplay({ bufferSize: 1, refCount: false })));
}

invalidateAll() { this.allCache$ = undefined; }
```

O `shareReplay` faz duas coisas que um signal sozinho não faz:
- **multicast:** se dois lugares pedem `getAll()` ao mesmo tempo, sai **uma** requisição, não duas.
- **replay:** quem chega depois recebe o último valor sem refazer a chamada.

E o `refCount: false` mantém o cache vivo mesmo quando ninguém está inscrito, ou seja, sobrevive à navegação. Foi o caso clássico de "use a ferramenta certa": isso é trabalho de RxJS.

---

## A ponte: `toObservable` / `toSignal`

O que costura os dois mundos é o `@angular/core/rxjs-interop`. O padrão que se repete no projeto inteiro:

```ts
private reload = signal(0);

readonly procedimentos = toSignal(
  toObservable(this.reload).pipe(
    switchMap(() => this.service.getAll())
  ),
  { initialValue: [] as Procedimento[] },
);
```

Lendo de fora pra dentro:
1. `reload` é um **signal** gatilho.
2. `toObservable(reload)` vira um **stream**.
3. `switchMap` chama o service (cancelando a chamada anterior se houver).
4. `toSignal` traz o resultado de volta como **signal** que o template consome.

Pra recarregar, é só `this.reload.update(t => t + 1)`. Signal entra, RxJS faz o trabalho assíncrono no meio, signal sai.

---

## Três jeitos de carregar uma lista

Acabei com três padrões, cada um pro seu caso:

| Estilo | Quando usei |
|---|---|
| **Declarativo** (`toSignal` + `reload` + `switchMap(getAll)`) | listas simples: "carrega tudo e mostra" |
| **`PagedCollection`** | tabelas com paginação no servidor |
| **Imperativo** (`subscribe` + signals) | telas sob demanda (relatórios) e ações one-shot (login) |

Não existe "o jeito certo", existe o jeito certo pra cada tela.

---

## `PagedCollection`: os dois trabalhando juntos

A peça que mais me orgulho juntou tudo num lugar reutilizável. Um objeto com estado em signals e **um** pipeline RxJS por dentro:

```ts
// estado: signals
query = signal({ page: 0, size: 10 });
reloadTick = signal(0);
page = signal<Page<T> | null>(null);

// derivados: computed
readonly items = computed(() => this.page()?.content ?? []);
readonly isLast = computed(() => this.pageIndex() >= this.totalPages() - 1);

// o motor: RxJS
toObservable(trigger).pipe(
  distinctUntilChanged(...),                 // nao busca de novo a toa
  tap(() => this.loading.set(true)),
  switchMap(q => this.fetch(q).pipe(
    catchError(() => of(emptyPage(q))),      // erro nao quebra a tela
  )),
  tap(() => this.loading.set(false)),
).subscribe(result => this.page.set(result));
```

O componente que usa isso **nunca dá `subscribe`**. Ele só lê signals (`lista.items()`, `lista.loading()`, `lista.isLast()`) e chama ações (`lista.next()`, `lista.reload()`). RxJS por dentro, Signals por fora.

---

## O que ficou

A pergunta "Signal **ou** RxJS?" estava errada desde o começo. A resposta é "Signal **e** RxJS", cada um onde faz sentido:

- Estado e derivação vão de **Signal** (menos código, change detection fina, sem unsubscribe).
- Assíncrono com cancelamento, dedupe, cache ou recuperação de erro vai de **RxJS**.
- Na fronteira, `toObservable` e `toSignal` deixam os dois conversarem.

Parei de escolher um lado. Agora escolho por problema, e o código ficou bem mais limpo por causa disso.
