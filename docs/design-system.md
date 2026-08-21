# Design system — danielsouza.com

Este documento descreve os tokens e componentes compartilhados definidos em
`src/scss/utilities/`. O objetivo é ter uma única fonte de verdade para cor,
espaçamento, tipografia e padrões visuais repetidos (prosa, formulários,
botões), em vez de cada componente reinventar os próprios valores.

## Estrutura

```
src/scss/
├── style.scss              # entrypoint, importa tudo na ordem certa
├── utilities/
│   ├── _variables.scss     # tokens: cor, espaçamento, tipografia, radius,
│   │                       # shadow, transition, z-index, breakpoints
│   ├── _typography.scss    # @font-face + escala de heading (h1–h4)
│   ├── _prose.scss         # %prose — placeholder de texto longo
│   ├── _forms.scss         # %form-label / %form-input / %btn-primary
│   ├── _wrapper.scss       # .wrapper (largura máxima + padding responsivo)
│   └── _visually-hidden.scss
└── components/              # um arquivo por componente de página (BEM)
```

Tudo é importado via `@import` legado (não `@use`) a partir de
`style.scss`, então todas as variáveis e placeholders ficam disponíveis
globalmente para qualquer arquivo em `components/`. **Não** adicione
`@use 'variables' as *;` dentro de `components/*.scss` — isso conflita com
o `@import` global e quebra o build (veja histórico de commits).

## Tokens (`_variables.scss`)

| Categoria    | Variáveis                                                        |
| ------------ | ----------------------------------------------------------------- |
| Tipografia   | `$text-xs` … `$text-6xl`                                          |
| Espaçamento  | `$space-unit`, `$space-xxs` … `$space-xxl`                        |
| Cor          | `$black`, `$white`, `$gray-1` … `$gray-10`, `$accent`             |
| Cor semântica| `$color-bg`, `$color-text`, `$color-border`, `$color-link*`, `$color-header-*`, `$color-footer-*` |
| Superfícies  | `$border-subtle`, `$bg-subtle`, `$bg-wash`                         |
| Radius       | `$radius-sm`, `$radius-md`, `$radius-lg`, `$radius-full`          |
| Shadow       | `$shadow-sm`, `$shadow-md`                                        |
| Transition   | `$transition-fast` (0.2s), `$transition-base` (0.3s)              |
| Z-index      | `$z-behind`, `$z-base`, `$z-elevated`                              |
| Forms        | `$form-element-*`, `$btn-primary-*`                                |
| Breakpoints  | `$phone-width`, `$tablet-width`, `$desktop-width` + mixins `phone`/`tablet`/`desktop` |

Regra prática: **antes de escrever uma cor, radius, sombra ou transição
nova, procure aqui primeiro.** Se não existir um token adequado, adicione
um novo token em vez de um valor solto — é isso que mantém o sistema
coerente.

## Componentes compartilhados

### `%prose` (`_prose.scss`)

Estilo de corpo de texto longo: parágrafos, headings, links, blockquote,
código, tabela, figura/legenda. Usado por `.post__body` e `.page__content`
via `@extend %prose`. Qualquer ajuste em como blockquotes ou tabelas são
exibidas deve ser feito aqui, não duplicado em cada componente.

`.livro-body` **não** usa `%prose` de propósito — é isolado com as
próprias custom properties CSS (`--ink`, `--accent`, `--gray-2`, `--wash`)
para poder ser colado/testado de forma independente. Essas custom
properties, porém, apontam para os mesmos tokens SCSS (`--ink: #{$black}`
etc.), então mudar a paleta em `_variables.scss` também atualiza o livro.

### `%form-label` / `%form-input` / `%btn-primary` (`_forms.scss`)

Campo de formulário e botão primário (fundo preto, pill de
`$radius-lg`). Usado por `.contact` e `.newsletter`, que antes tinham os
mesmos ~50 blocos de CSS duplicados letra por letra.

Para um novo formulário, siga o padrão:

```scss
.meu-form {
  &__label { @extend %form-label; }
  &__input { @extend %form-input; }
  &__button { @extend %btn-primary; }
}
```

## Inconsistências conhecidas (não corrigidas automaticamente)

Registradas aqui para decisão deliberada, não corrigidas nesta passada
para não alterar o visual sem confirmação:

- `_page.scss` tem um `blockquote` com `border-left: #c4c4c4`, um cinza
  que não corresponde exatamente a nenhum `$gray-*` (o mais próximo é
  `$gray-3 = #bbbbbc`). Considerar unificar.
- Os mixins `phone`/`tablet` em `_variables.scss` usam
  `$phone-width: 64em` e `$tablet-width: 64em` — o mesmo valor. Isso faz
  o mixin `phone` (`max-width: 64em`) cobrir tudo até o breakpoint de
  tablet, o que pode não ser intencional. Vale confirmar com quem escreveu
  antes de mudar, pois pode ter sido proposital.
- Algumas transições usam `ease-out` (`_post-list.scss`,
  `_homepage.scss`) enquanto o token `$transition-base` usa `ease` simples
  — foram mantidas como estão porque a curva de easing é visualmente
  diferente, não uma duplicata exata.
