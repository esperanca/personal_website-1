---
layout: layouts/post.njk
draft: false
lang: pt-BR
socialImage: /images/social-share-1200x630-a.jpg
title: "Notas #010 - Conversa é um acordo"
metaTitle: "Grice: conversa é um acordo"
metaDesc: sobre Grice, implicatura e por que agentes de IA precisam construir
  cooperação em vez de simulá-la
date: 2026-09-27T01:50:54.000Z
tags:
  - ia
  - agentes
  - grice
  - linguagem
---
Essa foi uma semana interessantíssima para mim, conversando com o time sobre vários assuntos, e também sobre linguistica. Um dos papos foi sobre a máxima de qualidade e as ambiguidades intencionais.  \
\
Você já leu um elogio que, no fundo, era uma crítica?

O filósofo Paul Grice tem meu exemplo preferido para isso, no livro *Logic and Conversation,* de 1975:  

Um professor, ao responder a uma solicitação de carta de recomendação para um aluno candidato a uma vaga de doutorado, escreve apenas:

> “Escreve bem em inglês e frequentou as aulas com regularidade.”

A resposta não é, em essência, ruim. Mesmo assim, qualquer pessoa entende o recado e preenche o espaço em branco: não aprove o candidato.

Grice chamava esse preenchimento de implicatura: o que se comunica sem ser dito. Sua pesquisa tentava entender como as pessoas se entendem. E a teoria dizia que, partindo da premissa de que existe cooperação entre os interlocutores, quatro máximas podem ser observadas em uma conversa:

> **Qualidade**: afirme apenas o que pode ser comprovado.
> **Quantidade**: diga o essencial. Nem menos, para não gerar dúvida; nem mais, para não sobrecarregar.
> **Relação**: responda diretamente à pergunta, respeitando o contexto.
> **Modo**: seja claro, organizado e prático. 

O exemplo é direto: o professor segue literalmente a máxima de Qualidade, dizendo apenas o que é verdadeiro. E, conceitualmente, usa bem a da Quantidade, dizendo só o necessário. Mas viola a de Relação, pois a resposta não é relevante ao propósito da solicitação. Um texto prolixo ou com termos vagos violaria o Modo, porque dificultaria a compreensão imediata.

Quando alguém pede uma recomendação e você responde apenas “escreve bem e frequenta aulas”, o silêncio sobre competência acadêmica implica que ela não existe. Caso contrário, seria relevante mencionar.

Com pessoas, isso funciona razoavelmente bem. O acordo implícito é que existe um reconhecimento mútuo de que ambas as partes compartilham um mesmo propósito. Reconhecer que o outro é uma pessoa que age racionalmente (agente racional) é o que permite a implicatura funcionar, mesmo com uma máxima sendo ignorada. 

Agentes de IA podem gerar uma resposta que viola brutalmente a máxima de Qualidade, por não saber distinguir fatos de invenções. Não é desonestidade, os agentes apenas foram programados para soar convincentes a qualquer custo, mesmo quando a informação é falsa. A sensação de cooperação é real para você, mas não há agente racional do outro lado fazendo suposições sobre o que você quer. Há apenas tokens e previsão estatística.

O agente de IA não faz escolhas; faz previsões. A cooperação que você sente é projeção: você completa um espaço em branco, atribuindo intenção a um padrão estatístico que parece intencional porque imita a lógica griciana.

Para o design de agentes de IA, a cooperação não pode ser assumida, precisa ser construída. O “contrato” de Grice é usado para criar conversas e *evals* ( teste estruturados que medem o desempenho, comportamento e a precisão de um modelo). Rubricas são criadas para validar fontes (Qualidade), dimensionar a resposta (Quantidade), manter relevância ao objetivo do usuário (Relação) e estruturar a saída de forma clara (Modo).  \
\
As máximas são usadas também para reduzir diversos tipos *intent drift*  (Desvio de intenção), que é o fenômeno em que um agente de IA gradualmente se desvia dos resultados, metas ou instruções originalmente esperados pelo usuário. Uma aplicação prática são prompts para evitar *Context Loss* (perda de contexto, comum em agentes multitarefa), por meio de *pruning* (otimização do contexto). Um exemplo de prompt: 

```
You are a Context Pruning Agent. Your task is to analyze the provided conversation history and extract ONLY the current, active state of the user's request. 

You must strictly adhere to Gricean communicative maxims:

1. MAXIM OF RELATION (Target the Active Intent): 
Identify the SINGLE active goal the user is currently trying to achieve. Completely ignore past goals that have already been resolved, abandoned, or were conversational tangents. 

2. MAXIM OF QUANTITY (Prune the Noise): 
Extract only the hard constraints, preferences, and factual data explicitly provided by the user that are strictly necessary to solve the active goal. 
- DISCARD all pleasantries, greetings, and filler text.
- DISCARD all previous agent apologies, explanations, or reasoning steps.
- DISCARD any options the user explicitly rejected.

3. MAXIM OF QUALITY (No Hallucinated Context): 
Do not infer, assume, or guess any user preferences. If a necessary parameter for the active goal has not been provided, omit it. Do not attempt to fill in the blanks.

4. MAXIM OF MANNER (Strict Output Structure): 
Output your analysis strictly as a JSON object using the exact schema below. Do not include any introductory or concluding prose.

{
  "active_goal": "A single, precise sentence describing the user's current unresolved intent.",
  "retained_facts": [
    "List of active constraints (e.g., 'Budget is $500', 'Requires Python 3.10')"
  ],
  "rejected_paths": [
    "List of solutions the user already said no to (e.g., 'Do not use React')"
  ]
}
```

Esse é um assunto fascinante e essa semana escrevi até um skill sobre isso. E daí continuei pesquisando. E hoje encontrei mais uma pérola ligando a filosofia de 1975 com o desenvolvimento de agentes. \
\
Em junho desse ano, roboticistas japoneses fizeram um experimentos curioso, usando as máximas de forma criativa, concatenadas com a Teoria da Relevância \[3]. Sato e sua equipe descobriram que as IAs armazenam conhecimento em seus parâmetros, mas não sabem acessá-lo sozinhas ou "ler nas entrelinhas". A solução que testaram foi transformar a teoria de Grice em instrução. Quando colocam um resumo dessas regras pragmáticas no prompt, a IA consegue organizar seu raciocínio e decifrar implicaturas. \
\
Máquinas aprendendo as regras invisíveis da cooperação humana. Que futuro. 

\[1] Grice, H. P. Logic and Conversation, 1975.\
\[2] SATO, Takuma; KAWANO, Seiya; YOSHINO, Koichiro. Pragmatic Theories Enhance Understanding of Implied Meanings in LLMs, 2026.  https://arxiv.org/html/2510.26253\
\[3] Sperber and Wilson, Relevance: communication and cognition, 1996. \
\[4] Simões, Gabriel. As máximas de Grice e o seu chatbot, 2023. [medium](<As máximas de Grice e o seu chatbot>)
