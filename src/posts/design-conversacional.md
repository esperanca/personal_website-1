---
layout: layouts/post.njk
title: "Notas #015 - Desenhando conversas"
metaTitle: "Desenhando conversas"
metaDesc: "sobre os fundamentos, os termos e os princípios do design conversacional — e por que desenhar conversas melhores virou prioridade"
date: 2026-11-28T09:00:00-03:00
updated: 2026-11-28T13:36:46-03:00
draft: false
tags:
  - design conversacional
  - ia
  - linguagem
  - agentes
lang: "pt-BR"
---

Para me atualizar profissionalmente, tenho pesquisado bastante sobre design conversacional. Agora uma parte boa do meu time é de conversation designers, e o tema também ocupa um capítulo do meu livro sobre agentes.

Para mim, design conversacional é uma mistura bela entre o design de interação e as disciplinas de conteúdo.

Os materiais, as tecnologias e a forma do fazer mudam, mas design continua sendo sobre intenção, percepção e propósito. A necessidade de criar conversas melhores também permanece, e design é uma das ferramentas para isso.

Reli alguns livros, entre eles o [*Conversational Design*](https://drive.google.com/file/d/1aqbMTt_T-P66C6GonZnKVoQr0SGaZfxg/view?usp=sharing) (primeira edição, disponível gratuitamente pela autora) e o [*Just Enough Research*](https://abookapart.com/products/just-enough-research.html), ambos da Erika Hall — cofundadora da [Mule Design](https://www.muledesign.com/) e uma referência para mim em design e pesquisa aplicada. Acompanho de perto o trabalho da Dra. Carmen Martinez, que tem doutorado em Linguística Aplicada e experiência em sistemas reais de atendimento e automação no contexto global e latino-americano. O Brasil tem várias autoras e especialistas, e tenho o privilégio de trabalhar com algumas delas. Não dá para citar todo mundo, mas uma pessoa com quem converso muito sobre o assunto é a Janaína Pereira Silva.

Todas elas sempre me lembram que design conversacional é sobre criar sistemas que entendem, respondem, corrigem e antecipam intenções. Com a Jana, falo sempre sobre conversas que explicam coisas complexas, e sobre como a diversidade linguística e cultural do brasileiro impacta nosso trabalho de entender o que as pessoas querem.

Entender contexto, intenção e as sutilezas do “jeitinho” brasileiro faz parte do ofício: a informalidade calculada, o pedido indireto, a necessidade de resolver rápido sem perder a cordialidade. Desenhar conversas para o público brasileiro tem suas diferenças. Grande parte da minha experiência no assunto é em inglês, e por isso sinto na pele a diferença.

O Brasil é um dos líderes globais no uso de WhatsApp e, além disso, chatbots e interfaces de voz são muito populares. Com o desenvolvimento de ML, NLU e IA generativa, o desenho de conversas passa por uma renascença. Muitos dos times de produto das principais instituições brasileiras, das finanças ao varejo, estão investindo no tema. Apesar disso, falta entendimento sobre o que é o ofício. Não é meu objetivo dar uma resposta completa, mas achei importante compartilhar um pouco do que aprendi nesses anos.

Design conversacional, para começar, não é só tom de voz e roteirizar respostas. É mapear fluxos, prever ruídos e antecipar as formas como uma pessoa usuária pode dizer, sugerir ou pedir algo — muitas vezes de forma implícita. É construir diálogos que funcionem mesmo diante da ambiguidade, do improviso e das variações regionais, preservando a autonomia do usuário e mantendo o agente conversacional nos trilhos. Aqui vai um guia rápido, um ponto de partida:

## Termos comuns

**Intenção (intent):** o objetivo que o usuário busca alcançar na conversa. A intenção nem sempre está clara no primeiro enunciado; pode ser implícita e precisa ser inferida pelo agente.

**Enunciado (utterance):** qualquer manifestação verbal do usuário — frase, pergunta, comando, interjeição — em um turno da conversa. É a matéria-prima que o agente interpreta para identificar intenções.

**Contexto:** conjunto de informações relevantes acumuladas durante o diálogo, incluindo dados já fornecidos, decisões tomadas e o histórico imediato. Permite ao agente responder de forma coerente e evitar repetições desnecessárias.

**Alternância de turnos (turn-taking):** organização dinâmica de quem fala quando, garantindo ritmo e previsibilidade. Uma alternância bem desenhada evita sobreposições, silêncios e frustração, tornando o diálogo mais natural e eficiente.

## Três princípios

### Coerência

O agente mantém o diálogo alinhado à intenção do usuário, interpretando cada enunciado à luz do contexto e respeitando a alternância de turnos. Quando há ambiguidade, pede esclarecimento sem interromper o fluxo.

### Recuperação de erros

Quando o agente não entende ou não pode atender um enunciado, ele oferece um fallback que recupera o diálogo: pede mais detalhes, sugere alternativas ou, se necessário, oferece um caminho de saída claro (wayout), incluindo às vezes escalonamento para atendimento humano.

### Proatividade

O agente não espera só o usuário conduzir. Ele antecipa necessidades, sugere próximos passos e planeja turnos que aproximem o usuário do objetivo — sem assumir controle total, mas facilitando o caminho. No contexto de agentes pessoais, isso envolve projetar o que o agente lembra, o que esquece, quando interrompe e quando envia lembretes.

Já falei de [Grice e dos princípios cooperativos](/posts/grice-conversa-acordo/) antes, então minha recomendação de leitura hoje também é um clássico, mas com uma lente um pouco diferente. O artigo de Emanuel Schegloff, Gail Jefferson e Harvey Sacks, ["The Preference for Self-Correction in the Organization of Repair in Conversation"](https://www.conversationanalysis.org/wp-content/uploads/2019/06/11_Schegloff_et_al_The_Preference_For_Self-Correction_in_the_Organization_of_Repair_in_Conversation.pdf) (1977), traz um conceito fundamental para a disciplina: reparação de erros (fallback) é parte natural do diálogo. O objetivo de um bom fluxo não é nunca errar, mas permitir que o usuário e o sistema alinhem o entendimento com o mínimo de atrito social possível.

Para saber mais sobre o assunto, recomendo o [CDI (Conversation Design Institute)](https://www.conversationdesigninstitute.com/), que tem vários cursos e certificações e um plano gratuito para quem está começando. Aproveite.
