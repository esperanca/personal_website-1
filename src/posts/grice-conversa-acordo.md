---
layout: layouts/post.njk
title: "Notas #010 - Conversa é um acordo"
metaTitle: "Grice: conversa é um acordo"
metaDesc: "sobre Grice, implicatura e por que agentes de IA precisam construir cooperação em vez de simulá-la"
socialImage: "/images/social-share-1200x630-a.jpg"
date: 2026-09-27T01:50:54.000Z
draft: false
tags:
  - ia
  - agentes
  - grice
  - confiança
  - linguagem
lang: "pt-BR"
---
Você já leu um elogio que, no fundo, era uma crítica?

O filósofo Paul Grice tinha um exemplo preferido para isso.

Um professor, ao responder a uma solicitação de carta de recomendação para um aluno candidato a uma vaga de doutorado, escreve apenas:

> “Escreve bem em inglês e frequentou as aulas com regularidade.”

A resposta não é, em essência, ruim. Mesmo assim, qualquer pessoa entende o recado e preenche o espaço em branco: não aprove o candidato.

Grice chamava esse preenchimento de implicatura: o que se comunica sem ser dito. Sua pesquisa tentava entender como as pessoas se entendem. E a teoria dizia que, partindo da premissa de que existe cooperação entre os interlocutores, quatro máximas podem ser observadas em uma conversa:

**Qualidade**: afirme apenas o que pode ser comprovado.

**Quantidade**: diga o essencial. Nem menos, para não gerar dúvida; nem mais, para não sobrecarregar.

**Relação**: responda diretamente à pergunta, respeitando o contexto.

**Modo**: seja claro, organizado e prático. Sem rodeios.

O exemplo é direto: o professor segue literalmente a máxima de Qualidade, dizendo apenas o que é verdadeiro. E, conceitualmente, usa bem a da Quantidade, dizendo só o necessário. Mas viola a de Relação, pois a resposta não é relevante ao propósito da solicitação. Um texto prolixo ou com termos vagos violaria o Modo, porque dificultaria a compreensão imediata.

Quando alguém pede uma recomendação e você responde apenas “escreve bem e frequenta aulas”, o silêncio sobre competência acadêmica implica que ela não existe. Caso contrário, seria relevante mencionar.

Com pessoas, isso funciona razoavelmente bem. O acordo implícito é que existe um reconhecimento mútuo de que ambas as partes compartilham um mesmo propósito. Reconhecer que o outro é um agente racional — uma pessoa que age — é o que permite a implicatura funcionar.

Um agente de IA pode gerar uma resposta que viola brutalmente a máxima de Qualidade, afirmando algo sem fundamento, sem saber que está violando um contrato social. Agentes de IA ainda não reconhecem esse contrato e podem violá-lo ostensivamente. A sensação de cooperação é real para você, mas não há agente racional do outro lado fazendo suposições sobre o que você quer. Há apenas tokens e previsão estatística.

O agente de IA não fez escolhas; fez previsões. A cooperação que você sente é projeção: você completa um espaço em branco, atribuindo intenção a um padrão estatístico que parece intencional porque imita a lógica griciana.

Para o design de agentes de IA, a cooperação não pode ser assumida; precisa ser construída. O “contrato” de Grice vira um checklist técnico: validar fontes (Qualidade), dimensionar a resposta (Quantidade), manter relevância ao objetivo do usuário (Relação) e estruturar a saída de forma clara (Modo).

Sem esses mecanismos, o usuário projeta intenção onde há apenas padrão. A conversa parece verossímil, mas é apenas ruído.

[1] Grice, H. P. Logic and Conversation, 1975.
