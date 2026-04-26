---
tags:
  -
  - html
  - forms
  - web-development
  - frontend
aliases:
  - Formulários HTML
  - Elemento Form
  - HTML Forms

title: Formularios HTML
desc: Um resumo breve sobre formularios e suas subtags
date: 25 Abr 2026
tag: HTML
readTime: 10 min
thumb: assets/img/blog/minha-imagem.webp
---

---

## 🧩 Subtags Relacionadas

Um `<form>` atua como um contêiner. O poder real vem das subtags que compõem sua estrutura. As principais são:

`button`, `datalist`, `fieldset`, `input`, `label`, `legend`, `meter`, `optgroup`, `option`, `output`, `progress`, `select`, `textarea`.

---

## 📥 A Tag `<input>`

A tag `<input>` é o elemento mais versátil e essencial dentro de um formulário. Ela recebe os dados do usuário e os salva no contexto do formulário ao qual pertence. O tipo de dado que ela aceita é definido pelo atributo `type`.

### Tipos de Inputs Mais Comuns (`type="..."`):

- **`checkbox`**: Aceita um valor booleano (`true` ou `false`). Permite múltiplas seleções.
- **`color`**: Abre um seletor de cores nativo do sistema operacional quando recebe foco ou é clicado.
- **`date`**: Abre um seletor de datas (calendário) nativo do navegador.
- **`email`**: Específico para e-mails. O navegador valida automaticamente se o valor possui um formato básico válido (ex: presença do `@`).
- **`file`**: Permite o upload de arquivos.
  - _Dica:_ Use o atributo auxiliar `accept` para restringir os tipos (ex: `accept=".jpg, .png, application/pdf"`).
- **`number`**: Aceita apenas valores numéricos.
  - _Dica:_ Use o atributo auxiliar `step` para definir as casas decimais aceitas (ex: `step="0.01"` permite valores monetários como `10.50`).
- **`password`**: Aceita valores em texto, porém oculta os caracteres digitados por questões de segurança (exibindo asteriscos ou pontos).

---

## 🔘 A Tag `<button>` no Contexto de Formulários

A tag `<button>` possui várias funções, mas dentro de um `<form>`, seu comportamento depende fundamentalmente do atributo `type`:

- **`type="submit"` _(Comportamento Padrão)_**: Se você colocar um `<button>` dentro de um form sem especificar o tipo, ele assumirá o papel de `submit`. Ao ser clicado, ele tentará enviar o formulário, disparando o evento `onsubmit`.
- **`type="button"`**: Cria um botão genérico. Ele **não** envia o formulário ao ser clicado. Muito útil para engatilhar scripts paralelos no [[JavaScript]] sem recarregar a página ou submeter os dados acidentalmente.
- **`type="reset"`**: Reseta todos os inputs do formulário para seus valores iniciais.

## 📝 Textos Longos e Seleções

Quando um simples `<input type="text">` não é suficiente, utilizamos elementos específicos para textos multilinha ou escolhas predefinidas.

### `<textarea>`

Usado para coletar blocos de texto multilinha (como comentários, biografias ou mensagens).

- **Diferença do input:** Não usa o atributo `value` na tag. O valor inicial é colocado entre a tag de abertura e fechamento.
- **Atributos úteis:** `rows` (linhas visíveis iniciais) e `cols` (largura em caracteres).

```html
<label for="mensagem">Deixe seu comentário:</label>
<textarea
	id="mensagem"
	name="mensagem"
	rows="5"
	placeholder="Escreva aqui..."
></textarea>
```

### `<select>`, `<option>` e `<optgroup>`

Cria um menu suspenso (dropdown) de opções.

- O `<select>` é o contêiner.
- O `<option>` representa cada escolha.
- O `<optgroup>` (opcional) agrupa opções de forma semântica e visual.

HTML

```html
<label for="carro">Escolha um carro:</label>
<select id="carro" name="carro">
	<optgroup label="Marcas Japonesas">
		<option value="honda">Honda</option>
		<option value="toyota">Toyota</option>
	</optgroup>
	<optgroup label="Marcas Alemãs">
		<option value="bmw">BMW</option>
		<option value="audi" selected>Audi</option>
	</optgroup>
</select>
```

### `<datalist>`

Oferece um "híbrido" entre input de texto e select. Ele fornece sugestões de autocompletar baseadas no que o usuário digita. O `<datalist>` é conectado a um `<input>` através do atributo `list`.

HTML

```html
<label for="navegador">Escolha seu navegador:</label>
<input list="navegadores" id="navegador" name="navegador" />

<datalist id="navegadores">
	<option value="Chrome"></option>
	<option value="Firefox"></option>
	<option value="Safari"></option>
	<option value="Edge"></option>
</datalist>
```

---

## ♿ Acessibilidade e Agrupamento Semântico

A forma como você estrutura um formulário dita se ele será fácil de usar por pessoas com deficiências e se será bem interpretado pelo motor de renderização.

### O Poder do `<label>`

Nunca deixe um `<input>` sem um `<label>` associado. Ele define o rótulo do campo.

- **Acessibilidade:** Leitores de tela anunciam o texto do label quando o usuário foca no input.
- **Usabilidade (UX):** Clicar no texto do label foca no input associado (ótimo para checkboxes e radio buttons onde a área de clique nativa é minúscula).
- **Como associar:** Use o atributo `for` no `<label>` com o valor exato do `id` do `<input>`.

### `<fieldset>` e `<legend>`

Usados para agrupar controles de formulário relacionados. É quase obrigatório ao usar botões do tipo rádio (`type="radio"`).

- O `<fieldset>` desenha uma caixa em volta dos elementos (visualmente e semanticamente).
- O `<legend>` atua como o título desse grupo.

HTML

```html
<fieldset>
	<legend>Qual sua linguagem favorita?</legend>

	<input type="radio" id="js" name="linguagem" value="JavaScript" />
	<label for="js">JavaScript</label><br />

	<input type="radio" id="py" name="linguagem" value="Python" />
	<label for="py">Python</label>
</fieldset>
```

---

## 📊 Elementos de Feedback Visual

O HTML5 introduziu tags nativas para demonstrar progresso ou valores escalares, sem precisar construir divs complexas no CSS/JS.

- **`<progress>`**: Representa o progresso de uma tarefa contínua (ex: barra de download, envio de formulário).
  - _Atributos:_ `value` (valor atual) e `max` (valor total).
- **`<meter>`**: Representa uma medida escalar dentro de um intervalo conhecido (ex: uso de disco, nível de força de uma senha).
  - _Atributos:_ `value`, `min`, `max`, `low`, `high`, `optimum`.
- **`<output>`**: Exibe o resultado de um cálculo ou ação do usuário. Usualmente atualizado via [[JavaScript]].

HTML

```html
<label for="upload">Progresso do Upload:</label>
<progress id="upload" value="75" max="100">75%</progress>

<label for="forca">Força da Senha:</label>
<meter id="forca" value="2" min="0" max="4" low="1" high="3" optimum="4">
	Razoável
</meter>
```

---

## 🛡️ Atributos de Validação Nativa (HTML5)

Antes de enviar os dados para o backend ou validar com bibliotecas (como [[zod]] no [[React]]), o próprio HTML consegue impedir o envio de dados incorretos, disparando tooltips nativas do navegador.

- **`required`**: O campo não pode estar vazio.
- **`minlength` / `maxlength`**: Define o tamanho mínimo e máximo de caracteres para inputs de texto.
- **`min` / `max`**: Define os valores mínimos e máximos para inputs do tipo `number` ou `date`.
- **`pattern`**: Aceita uma expressão regular (Regex) para validações complexas. (Ex: aceitar apenas CEPs numéricos).
- **`disabled`**: Desabilita o input. O usuário não pode interagir, clicar ou focar. **Importante:** Inputs `disabled` _não_ são enviados na requisição do formulário.
- **`readonly`**: O usuário pode ler, selecionar e copiar o texto, mas não pode alterá-lo. Ao contrário do `disabled`, o valor _é_ enviado na submissão.

### Exemplo Completo de Validação:

HTML

```html
<form>
	<label for="senha"
		>Senha (mínimo 8 caracteres, apenas letras e números):</label
	>
	<input
		type="password"
		id="senha"
		name="senha"
		required
		minlength="8"
		pattern="[a-zA-Z0-9]+"
	/>
	<button type="submit">Registrar</button>
</form>
```

---

## ⚡ Boas Práticas e Ecossistema (React / Zod)

No desenvolvimento moderno de interfaces web (como usando [[React]] e [[TypeScript]]), raramente usamos as ações nativas (`action` e métodos GET/POST literais no HTML). Em vez disso, interceptamos o evento de envio, prevenimos o recarregamento e gerenciamos os dados manualmente.

Ao usar ferramentas de validação de schema (como o **Zod**), garantimos que os dados digitados nos `<input>`s estejam no formato exato antes de enviá-los ao backend.

TypeScript

```ts
// Exemplo conceitual de integração de eventos com formulários
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  // Previne o comportamento padrão do form (recarregar a tela ou mudar a URL)
  e.preventDefault();

  // Aqui entraria a validação do Zod antes de enviar para uma API
  console.log("Formulário interceptado e pronto para validação!");
};

<form onSubmit={handleSubmit}>
  <input type="email" name="userEmail" required />
  <input type="password" name="userPass" required />
  <button type="submit">Entrar no Dashboard</button>
</form>
```
