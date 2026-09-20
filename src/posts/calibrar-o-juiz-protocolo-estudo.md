---
title: Calibrar o juiz com especialistas e leigos
subtitle: Como avaliar agentes conversacionais em escala, sem perder o que leigos e especialistas veem diferente
date: 2026-09-21
draft: true
tags:
  - avaliação de agentes
  - LLM como juiz
  - metodologia
  - pragmática conversacional
---

# Calibrar o juiz com especialistas e leigos

Juízes baseados em LLM escalam a avaliação de agentes conversacionais, mas suas notas dependem de quem os calibra. Um especialista e um usuário comum veem coisas diferentes numa mesma resposta — e a literatura tratou isso como um problema a eliminar. Este protocolo trata como um dado a usar.

## O problema

Hoje, quando queremos saber se um agente conversacional está funcionando bem, fazemos uma de duas coisas:
1. Perguntamos a especialistas do domínio (mais rigorosos, mas caros de escala).
2. Deixamos um LLM julgar sozinho (mais rápido, mas com viés e sem verificação independente).

O que ninguém faz é: usar a discordância entre especialistas e leigos como sinal de que algo na resposta pode estar errado — especialmente quando o usuário real depois reformula ou desiste.

## O que o protocolo propõe

**Hipótese central:** quando leigos e especialistas discordam sobre uma resposta que o juiz aprova, essa discordância prevê se o usuário vai reformular a pergunta ou desistir.

Se isso for verdade, podemos calibrar o juiz com um balanço entre os dois grupos — não escolher um lado, mas equilibrar. E verificar se um juiz assim calibrado prevê o comportamento do usuário melhor do que um calibrado só com especialistas ou só com leigos.

A contribuição é metodológica: um instrumento em linguagem simples (5 perguntas que leigos, especialistas e juiz respondem igual), duas rodadas de avaliação (uma cega, outra com contexto), e um desenho que separa o julgamento do comportamento que o valida.

## Por que isso importa

Em serviços financeiros, um agente que responde bem "no papel" mas não ajuda o usuário a dar o próximo passo é um agente que falhou. A qualidade da resposta e a usabilidade não são a mesma coisa.

Além disso, o protocolo mapeia os critérios que juízes usam hoje (relevância, utilidade, concisão, fundamentação) de volta para as máximas conversacionais de Grice — e testa se essa ligação é coerente. Pode ser que critérios prontos estejam medindo coisas diferentes do que a gente acha.

## Estrutura

O relatório tem 10 seções:

1. **Introdução** — o gap entre validade de juízes e a falta de calibração com públicos diferentes.
2. **Fundamentação** — evidência sobre quando juízes falham, especialmente fora do inglês.
3. **Escopo e premissas** — o método vale para agentes cujos dados vêm de sistemas de registro.
4. **Desenho** — unidade (tripla humano-agente-humano), instrumento, avaliadores, rodadas.
5. **Hipóteses** — H1 (discordância prevê comportamento), H-cal (calibração com balanço é melhor), objetivos exploratórios.
6. **Análise** — descrição, testes, sensibilidades, efeitos de avaliador.
7. **Ética, privacidade, governança** — consentimento, LGPD, comitê de ética.
8. **Caso de aplicação** — agente de serviços financeiros para empresas.
9. **Limitações** — viés de seleção, comportamento é ruidoso, evidência fora do inglês é escassa.
10. **Pendências** — definições finais antes do piloto.

Dois apêndices: registro de decisões (70+ decisões e propostas) e glossário português-inglês.

## O que precisa de revisão

- **Fontes**: verificar cobertura e atualidade das referências (muitas marcadas como "resumo visto").
- **Lógica das hipóteses**: H1 é testada em ~100 triplas rotuladas; H-cal é verificada em milhares de turnos com comportamento derivado. Essa separação é sólida?
- **Audiência**: "leigo" é um parâmetro do método (descrito, sem pretensão de representatividade). Isso fica claro?
- **Transferência**: juiz é calibrado em texto reescrito (anonimizado), mas aplicado em produção no original. Validade mantém?
- **Poder e efeito mínimo**: AUC 0,70 para H1 é realista? Os números da simulação (30 eventos, 0,7 correlação) têm base?

## Análise crítica

Criei um arquivo separado com 35+ perguntas sobre o protocolo — estruturadas por tema (validade, desenho, hipóteses, audiência, transferência). Estou respondendo uma a uma.

**Link para revisão colaborativa:** `/Hermes-Global-Projects-Nova/Desenhando Confiança/artigo_verificando_o_juiz_analise_critica.md`

---

**Próximos passos:**
- Responder as perguntas críticas.
- Congelar as 10 decisões abertas (Apêndice A.3).
- Piloto com 20–30 triplas para calibrar o instrumento e escolher os juízes.
- Alinhamento com comitê de ética antes de qualquer coleta.

Comente diretamente no arquivo de análise ou por email.
