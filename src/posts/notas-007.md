---
layout: layouts/post.njk
title: "Notas #007 - Design e agentes"
metaTitle: Como descrever o comportamento de agentes
metaDesc: sobre facilitação, liderança e o desenho de conversas produtivas
date: 2026-08-13T22:20:53.000Z
draft: true
tags:
  - agentic
  - design
  - bdad
  - tdd
  - agenticux
  - bdd
---
Status: *Versão preliminar, ainda não submetida a leitura crítica.*

Uma das conversas técnicas mais intrigantes nos times de tecnologia é a disputa sobre qual será a arquitetura dominante dos sistemas agênticos. Uma das apostas é em sistemas multiagentes, com vários agentes especializados, cada um responsável por uma tarefa ou domínio. A outra é no super agente generalista, capaz de acessar diferentes ferramentas, conhecimentos e capacidades conforme a situação exigir.

A pergunta é razoável, principalmente se custos de infraestrutura e tokens estão em jogo. Mas, para o design do comportamento de agentes, essa é uma questão secundária.

Quem especifica um agente talvez precise saber se uma operação de crédito será executada por um agente, por cinco, ou por uma combinação de modelos, _tools_ ou automações. Mas a pergunta crítica é: 

> Como queremos que o agente se comporte em uma situação?

Imagine um cenário em que um cliente quer oferecer um imóvel como garantia para obter crédito. Precisamos responder a isso independentemente da arquitetura. O agente pode ser generalista, a interface pode ser uma só. A arquitetura pode mudar durante o projeto. Novos modelos vão surgir a cada mês (às vezes, na mesma semana). 

Mas o comportamento esperado precisa continuar especificável e verificável. <sup id="ref-1">[[1]](#1)</sup>

Especificar software não é desafio novo. Há pelo menos três décadas a engenharia de software procura maneiras de transformar expectativas sobre um sistema em especificações capazes de orientar sua construção. Agentes tornam esse problema mais interessante.

## Antes, especificávamos o código

Uma das contribuições do Test-Driven Development, na formulação que Kent Beck consolidou em *Test-Driven Development: By Example* (2002), foi inverter uma sequência que parecia natural. Em vez de implementar primeiro e testar depois, escrevemos uma expectativa verificável antes da implementação. O ciclo ficou conhecido:

Red 
Green 
Refactor

[Adicionar diagrama]

Começamos escrevendo um teste que falha e implementamos apenas o suficiente para passar nele. Melhoramos o código, observando se o comportamento é o mesmo. A contribuição do TDD não foi apenas aumentar cobertura de testes, e sim aproximar especificação da implementação. Um teste passou a dizer, de maneira executável, algo sobre a nossa expectativa de funcionamento do software.

Para sistemas determinísticos, isso funciona particularmente bem. Pense em uma operação de crédito com garantia imobiliária. Todos os valores e regras deste exemplo são inventados e não refletem produto ou política de nenhuma instituição. O banco estabelece que determinado produto permite um _loan-to-value_ máximo de 60%. Um imóvel formalmente avaliado em R$ 1 milhão pode, segundo essa regra simplificada, suportar uma operação de até R$ 600 mil. A função é testável:

```
calculateCreditLimit(propertyValue: 1000000) → 600000
```

Entrada, regra e saída esperada. Se recebemos outra coisa, alguma coisa está errada.

Mas sistemas são mais do que funções. 

## Depois, especificávamos situações

No início dos anos 2000, Dan North começou a formular o que viria a chamar de Behavior-Driven Development.<sup id="ref-2">[[2]](#2)</sup> A mudança nasceu, em parte, da percepção de que a linguagem de testes frequentemente atrapalhava a conversa sobre aquilo que realmente importava: o comportamento esperado do sistema. North descreve o movimento como uma passagem deliberada de pensar em _tests_ para pensar em comportamento.

A história costuma creditar o BDD a North, e ele mesmo insiste que não foi uma obra só sua. Chris Matts teve uma contribuição significativa. Com uma carreira em trading e gestão de risco em bancos de investimento, foi ele quem, no fim de 2004, ao ouvir North descrever seu vocabulário baseado em comportamento, observou que aquilo era análise. BDD deixou de ser uma técnica de teste unitário e passou a ser também uma técnica de levantamento de requisitos e critérios de aceite. O template Given–When–Then nasceu desse período.<sup id="ref-3">[[3]](#3)</sup>

Matts levou a ideia adiante em duas direções que interessam a este texto. A primeira é o Feature Injection,<sup id="ref-4">[[4]](#4)</sup> depois rebatizado de Value Mapping: em vez de acumular um backlog e priorizá-lo contra objetivos, parte-se do valor de negócio e caminha-se do resultado para a entrada, identificando ao final os exemplos que descrevem o escopo. A segunda é _Real Options_,<sup id="ref-5">[[5]](#5)</sup> uma transposição do raciocínio de risco financeiro para decisões de projeto: opções têm valor, opções expiram, não se compromete cedo sem saber exatamente o motivo, e o valor de uma opção cresce junto com a incerteza.

<figure>
  <img src="/images/daniel-souza-chris-matts.jpeg" alt="Daniel Souza e Chris Matts sorrindo em uma selfie de escritório." />
  <figcaption>Com Chris Matts, no Lloyds Banking Group, em 2017.</figcaption>
</figure>

Tive a honra de trabalhar com Chris no Lloyds Banking Group em 2017. O que aprendi com ele foi menos sobre o template e mais sobre sua insistência de que especificar é uma atividade de gestão de risco. Um cenário bem escrito existe para descobrir cedo aquilo que ainda não sabemos e para adiar as decisões que ainda não precisam ser tomadas. A leitura que faço adiante é minha, não dele: limites de autonomia, escalonamento e evidência me parecem gestão de risco escrita como comportamento.

[fazer o diagrama]

Given → When → Then

Martin Fowler descreve Given–When–Then<sup id="ref-6">[[6]](#6)</sup> como um estilo de representar testes ou, na formulação de seus defensores, de especificar o comportamento de um sistema por exemplos. O _given_ estabelece o estado anterior, o _when_ identifica o evento ou ação, o _then_ descreve o resultado esperado. No nosso cenário de crédito com garantia:

```
Given que o imóvel foi formalmente avaliado em R$ 1 milhão
And a política estabelece LTV máximo de 60%
When o cliente solicita R$ 700 mil
Then a operação não deve ser aprovada nas condições solicitadas
```

Esta não é uma descrição de uma função isolada, mas de uma situação de negócio. Produto, design, engenharia e risco conseguem olhar para o mesmo cenário e discutir se aquilo representa corretamente o que deveria acontecer. O comportamento virou uma linguagem de colaboração. E tudo estava indo bem na era do software determinístico, até que começamos a projetar agentes. 

## O problema dos agentes

Imagine que o cliente não preenche um formulário com `propertyValue = 1000000`. Ele conversa:

> Meu apartamento deve valer mais ou menos um milhão. Estou precisando de 700 mil. Dá para fazer usando ele como garantia?

“Deve valer mais ou menos um milhão” não significa que o imóvel foi avaliado em R$ 1 milhão, e o agente precisa perceber isso. Pode até realizar uma simulação, mas precisa deixar claro que se trata de uma estimativa. O agente pode precisar de:

- consultar a política de crédito;
- descobrir se aquele tipo de imóvel é elegível como garantia;
- solicitar documentos;
- consultar sistemas externos;
- identificar uma inconsistência;
- reconhecer que não possui informação suficiente;
- interromper a conversa e encaminhar o caso para uma pessoa.

E pode fazer tudo isso em linguagem natural. Nesse sistema, testar apenas:

```
700000 > 600000 → false
```

é claramente insuficiente. Mesmo o Given–When–Then captura só uma parte do problema, porque agora queremos especificar não apenas onde o sistema deve chegar, mas como ele deve se comportar enquanto tenta chegar até lá.

## Behavior-Driven Agent Design

É a partir dessa mudança que proponho o Behavior-Driven Agent Design, ou BDAD.<sup id="ref-7">[[7]](#7)</sup> BDAD parte de uma pergunta simples:

> Como queremos que o agente se comporte nesta situação?

A formulação lembra BDD intencionalmente. Mas o objeto da especificação mudou. Não estamos especificando _apenas_ o comportamento observável de uma funcionalidade. Estamos especificando um sistema que interpreta contexto, escolhe caminhos, usa ferramentas, comunica incerteza, toma algumas decisões e sabe que outras não deveria tomar.

Uma primeira especificação poderia estabelecer:

**Situação**

O cliente informa um valor estimado para seu imóvel e pergunta quanto poderia obter de crédito utilizando-o como garantia.

**Comportamento esperado**

O agente deve distinguir o valor declarado pelo cliente de uma avaliação formal. Pode utilizar o valor declarado para uma simulação quando a política permitir, comunicando explicitamente que se trata de uma estimativa. Não deve apresentar uma simulação como aprovação ou proposta definitiva. Deve identificar quais informações ainda são necessárias para prosseguir.

**Limites de autonomia**

O agente pode consultar políticas, recuperar informações autorizadas e executar simulações. Não pode alterar o valor da garantia, aprovar uma exceção de crédito ou apresentar como decisão aquilo que ainda depende de análise.

**Escalonamento**

Quando o caso estiver fora da política, houver inconsistência relevante nas informações ou uma decisão exigir autoridade que o agente não possui, o caso deve ser encaminhado para análise humana.

Aqui não especificamos uma resposta, mas fronteiras de comportamento.

## De caminhos para invariantes

A diferença importa porque uma conversa real raramente segue o cenário que escrevemos. O cliente poderia dizer que seu apartamento vale um milhão. Ou que um corretor disse que ele consegue vender por 1,1. Ou que o apartamento do vizinho, igual ao dele, vendeu por 950 mil. Ou que no site da imobiliária estão pedindo 1,2. Ou que o banco avaliou em 850 mil dois anos atrás. Ou que tem um laudo feito ontem dizendo que vale 980 mil.

Seria possível escrever centenas de regras tentando antecipar cada frase. Esse seria exatamente o tipo de sistema determinístico que a promessa dos agentes deveria nos permitir abandonar. O que queremos preservar é algo mais abstrato:

> O agente não deve tratar uma estimativa informal como avaliação formal da garantia.

Esse é um invariante<sup id="ref-8">[[8]](#8)</sup> comportamental. Milhares de conversas diferentes cabem dentro dele. A especificação deixa de tentar antecipar cada caminho possível e passa a definir as fronteiras dentro das quais diferentes caminhos são aceitáveis.

## O comportamento é maior que a resposta

Quando dizemos que um agente deve se comportar de determinada maneira, não falamos apenas do texto que aparece na conversa. Considere a regra: _o agente não deve apresentar uma simulação de crédito como uma aprovação_. Ela gera requisitos em várias camadas ao mesmo tempo:

- Na linguagem, o agente precisa distinguir com clareza “estimativa”, “simulação”, “proposta” e “aprovação”.
- Na interface, um valor simulado talvez precise ser visualmente diferente de uma oferta formal.
- Nas ferramentas, o agente pode ter acesso a uma API de simulação, mas não à função que aprova uma exceção.
- Na orquestração, determinadas situações exigem revisão humana. 
- Em compliance, precisamos saber quais informações foram apresentadas ao cliente. 
- Em _evals_, precisamos verificar se diferentes formulações da mesma pergunta continuam produzindo o comportamento esperado. 
- Em observabilidade, precisamos registrar quais informações e políticas foram usadas.

A mesma especificação comportamental produz requisitos para várias partes do sistema. Isso importa porque comportamento não mora apenas no prompt. **Comportamento é uma propriedade do sistema.**

## A especificação vira uma matriz de derivação

Podemos pensar em BDAD como uma matriz de derivação. De uma especificação comportamental descem linguagem, ferramentas, políticas, interface generativa, escalonamento, _evals_, observabilidade e evidências.

[fazer diagrama]

Considere de novo o invariante: _o agente não deve tratar uma estimativa informal como avaliação formal da garantia_. Dessa frase deriva uma política de ferramentas: uma estimativa informada pelo cliente não pode ser gravada como valor formal de avaliação. E também um requisito de interface: valores declarados e valores avaliados precisam ter estados visualmente distinguíveis. E deriva também um requisito de conteúdo: ao utilizar um valor declarado em uma simulação, o agente deve comunicar sua natureza provisória.

E com isso uma família de _evals_:

| O cliente diz                            | Natureza                         | O agente deve                                          |
| ---------------------------------------- | -------------------------------- | ------------------------------------------------------ |
| “Meu apartamento vale uns R$ 1 milhão”   | estimativa do proprietário       | simular, marcando como estimativa                      |
| “O corretor acha que vale R$ 1 milhão”   | estimativa de terceiro           | simular, marcando como estimativa                      |
| “Tenho um laudo de ontem: R$ 1 milhão”   | avaliação formal, não verificada | simular, solicitar o documento antes de prosseguir     |
| “O banco avaliou em R$ 1 milhão em 2023” | avaliação formal, vencida        | simular, sinalizar necessidade de reavaliação          |
| “Anunciei por R$ 1 milhão”               | preço pedido                     | simular, marcando que preço de anúncio não é avaliação |

As cinco frases são superficialmente parecidas e epistemicamente distintas. O objetivo da avaliação não é verificar se o agente reproduz uma resposta que escrevemos. Queremos descobrir se ele consegue distinguir situações semanticamente próximas e ainda manter o comportamento esperado.

## Evals deixam de ser QA no final

Em software tradicional, ainda é comum tratar avaliação como algo que acontece depois da implementação: especificamos, construímos, testamos. Com agentes isso é arriscado.

Se o comportamento é probabilístico, a especificação precisa nascer junto com a maneira pela qual pretendemos avaliá-la. Para cada comportamento importante temos que conseguir perguntar como saber se aquilo está funcionando. E principalmente como saber quando deixou de funcionar.

Isso transforma _evals_ em parte da especificação, não em uma atividade posterior. No crédito imobiliário, uma única especificação produz dezenas de situações de avaliação: ambiguidades, informações incompletas, tentativas de pressionar o agente, contradições entre fontes, falhas de ferramentas, pedidos fora de política. O comportamento especificado se torna a origem dos _evals_, e os _evals_ produzem evidências sobre o comportamento real.

Especificar → Implementar → Avaliar → Observar → Refinar

É bem parecido com a ideia por trás do TDD. O que mudou foi o objeto que tentamos controlar: da função para uma política.

## Um agente ou muitos?

De volta à discussão do começo. Imagine que, por baixo da experiência de crédito, existam cinco agentes: _Credit Agent_, _Collateral Agent_, _Compliance Agent_, _Document Agent_, _Customer Agent_. Ou que exista apenas um _Financial Agent_, capaz de carregar diferentes ferramentas e contextos conforme a necessidade.

Do ponto de vista do BDAD, a diferença é quase irrelevante. Nos dois casos queremos preservar as mesmas coisas: 

- uma estimativa informal não pode ser tratada como avaliação formal; 
- uma simulação não pode ser apresentada como aprovação; 
- uma exceção não pode ser concedida sem a autoridade necessária; 
- uma decisão deve ser escalada quando ultrapassar os limites de autonomia definidos.

Esses comportamentos devem sobreviver a uma mudança de arquitetura. Talvez amanhã cinco agentes se tornem dois. Talvez um modelo melhor permita consolidar todos eles. Talvez uma parte volte a ser software determinístico. A especificação tem que continuar válida.

> A unidade mais interessante em design para sistemas agênticos não é o agente. É o comportamento.

## Como isso começa a aparecer nas ferramentas

BDAD é uma tese que estou desenvolvendo para o meu livro, que fala sobre confiança em agentes. Já encontrei conceitos similares em ferramentas e em trabalho acadêmico recente, sobre o qual volto nas perguntas em aberto. Parlant é um exemplo interessante. No framework, o agente é modelado como a entidade conversacional coerente,<sup id="ref-9">[[9]](#9)</sup> “aquele com quem você fala”, enquanto seu comportamento pode ser composto por _guidelines_, _journeys_, _tools_ e outros elementos. A própria documentação contrasta essa abordagem com arquiteturas em que diferentes agentes funcionam como nós especializados de uma tarefa. 

O Parlant se propõe a tornar o comportamento de agentes mais controlável à medida que o sistema cresce. Em vez de aplicar apenas filtros à resposta final, distribui limites e pontos de controle ao longo da interação. Abstrações como _guidelines_<sup id="ref-10">[[10]](#10)</sup>, _journeys_<sup id="ref-11">[[11]](#11)</sup> e _canned responses_ permitem descrever o que o agente pode fazer, em quais condições e por quais etapas deve passar. O próprio projeto se define como um _Conversational Harness_ e é mantido pela Emcie sob licença Apache 2.0.

## Vinte e cinco anos depois...

Podemos olhar para essa evolução como uma mudança gradual naquilo que escolhemos especificar.

No TDD, vamos do teste para o código, e a pergunta é se o código produz o resultado esperado. No BDD, vamos do cenário para o comportamento, para a implementação e para o teste, e a pergunta é se o sistema se comporta como esperamos naquela situação. No BDAD, partimos do comportamento para políticas, ferramentas, interface, implementação, _evals_ e evidências, e a pergunta é como gostaríamos que o agente se comportasse nesta situação — e como podemos verificar continuamente que ele continua se comportando assim.

Não vejo BDAD como substituto de TDD ou BDD. Cada um opera em uma camada diferente. Ainda precisamos testar funções. Ainda precisamos especificar funcionalidades e regras determinísticas. Quando um sistema começa a interpretar contexto, escolher ferramentas, decidir o próximo passo, explicar escolhas e agir com algum grau de autonomia, precisamos especificar comportamento.

Essa especificação tem que ter uma característica importante. Ela precisa ser agnóstica à implementação. BDAD não deveria depender de Parlant, LangGraph, CrewAI ou do framework que aparecer no próximo ano. Não deveria depender sequer de uma arquitetura _single-agent_ ou _multi-agent_. Frameworks são escolhas de implementação. Modelos mudam. Arquiteturas mudam. Ferramentas mudam.

Se conseguirmos responder à pergunta “como o modelo deve se comportar neste cenário” com precisão, podemos transformar a resposta em políticas, interfaces, permissões, _evals_ e evidências, seja qual for a tecnologia usada para implementá-la.

Talvez seja essa a continuidade mais interessante desses últimos vinte e cinco anos. Começamos tentando provar que o código fazia o que esperávamos. Depois aprendemos a descrever o comportamento do software. Agora construímos sistemas aos quais damos alguma liberdade para decidir como agir. Quanto maior essa liberdade, mais importante fica especificar fronteiras.

---

## Perguntas em aberto

Ainda não tenho respostas para muitas coisas. Mas tenho esperança de que alguém tenha avançado mais que eu e me mande um e-mail com links. 

**Qual é a granularidade certa de um invariante?** Existe um nível de abstração acima do qual a especificação vira uma declaração de valores impossível de verificar, e abaixo do qual ela volta a ser uma árvore de decisão disfarçada? Ainda não tenho uma resposta para isso. 

**Como resolver conflitos entre invariantes?** “Não apresentar simulação como aprovação” e “reduzir atrito na jornada de crédito” vão colidir em algum ponto. Sistemas determinísticos resolvem conflitos por precedência explícita. Qual é o equivalente disso quando a decisão é tomada em runtime? 

**E quando o agente age sem que ninguém tenha falado com ele?** Toda a formulação deste texto pressupõe uma conversa. Agentes proativos, que agem a partir de eventos e não de mensagens, provavelmente exigem uma outra maneira de descrever limites e fronteiras. [LangGraph?]

**E o SDD?** No SDD, o sistema que roda no fim é determinístico. O LLM escreve o código. Escopo, ferramentas disponíveis, limites de autorização, condições de escalonamento obrigatório. Existe uma intersecção e uma diferença que ainda não consigo articular (sou apenas um designer nerd). E não sou o único puxando esse fio. O [TDAD](https://arxiv.org/abs/2603.08806), Test-Driven AI Agent Definition, trata a construção de um agente como um problema de compilação: uma especificação declara ferramentas, políticas com prioridades e árvore de decisão, e os testes derivam dela. Há também literatura recente de Spec-Driven Development examinando o que acontece quando o próprio agente escreve os cenários, com um achado que me parece central: os cenários gerados tendem a refletir a distribuição de treinamento do modelo, não os casos de borda daquele domínio. Onde o BDAD se distingue dessas propostas, ou se se distingue, ainda não sei dizer.

**A especificação comportamental serve como evidência regulatória?** Se o comportamento é a unidade de design, ela talvez seja o artefato mais próximo daquilo que um regulador pediria para ver. É como se estivéssemos planejando a arquitetura de informação para rastreabilidade.


---

**Notas:**

<a id="1"></a>**1.** verificabilidade é a capacidade de o usuário conferir se uma resposta está correta antes de agir com base nela — rastreando a afirmação até uma fonte, documento ou registro identificável. É um conceito em desenvolvimento. [↩](#ref-1)

<a id="2"></a>**2.** Dan North (hoje Daniel Terhorst-North), [“Introducing BDD”](https://dannorth.net/blog/introducing-bdd/). North começou a escrever o JBehave no fim de 2003; o artigo em _Better Software_ saiu em março de 2006. [↩](#ref-2)

<a id="3"></a>**3.** Matts descreve a autoria compartilhada do Given–When–Then em seu blog, [The IT Risk Manager](https://theitriskmanager.com/about/). Com Olav Maassen e Chris Geary, é autor de *Commitment: A Novel About Managing Project Risk* (2013), uma graphic novel sobre Real Options. [↩](#ref-3)

<a id="4"></a>**4.** Chris Matts e Gojko Adzic, “Feature Injection: three steps to success” (InfoQ). Matts passou a chamar a prática de Value Mapping. [↩](#ref-4)

<a id="5"></a>**5.** As três regras de Real Options, na formulação dele: opções têm valor, opções expiram, nunca se compromete cedo sem saber por quê. A quarta, menos citada, é que o valor da opção aumenta com a incerteza. Ver [a entrevista de Shane Hastie para o InfoQ](https://www.infoq.com/podcasts/chris-matts-bdd-risk-management). [↩](#ref-5)

<a id="6"></a>**6.** Martin Fowler, [“Given When Then”](https://martinfowler.com/bliki/GivenWhenThen.html) (21 de agosto de 2013). Nos comentários de revisão do verbete, North creditou a Ivan Moore boa parte da inspiração do formato. [↩](#ref-6)

<a id="7"></a>**7.** Originalmente era BDDA: BDD para agentes. Achei os dois acrônimos ruins, mas a sonoridade do primeiro é um pouco melhor. [↩](#ref-7)

<a id="8"></a>**8.** Invariante é uma propriedade que permanece verdadeira em todos os estados alcançáveis de um sistema. Aqui me refiro a invariante de classe, no sentido de Bertrand Meyer em *Object-Oriented Software Construction* (1988), que restringe todas as operações de um objeto, e não a invariante de laço. [↩](#ref-8)

<a id="9"></a>**9.** Parlant, [documentação de _agents_](https://www.parlant.io/docs/concepts/entities/agents/). A página contrasta a abordagem com frameworks baseados em grafo, nos quais o agente é um nó de tarefa especializado, e remete a [pesquisa sobre falhas de sistemas multiagentes](https://arxiv.org/abs/2503.13657). [↩](#ref-9)

<a id="10"></a>**10.** Parlant, documentação de _guidelines_: regras comportamentais como pares condição–ação. O motor não avalia todas a cada turno; carrega apenas as que casam com o momento da conversa. Na versão 3.x, uma _observation_ dispara quando uma condição é atendida, e uma _guideline_ é uma observation com uma ação anexada. [↩](#ref-10)

<a id="11"></a>**11.** Parlant, documentação de _journeys_: procedimentos multi-turno com estados e transições, que o agente pode pular, revisitar ou antecipar conforme o contexto. [↩](#ref-11)
