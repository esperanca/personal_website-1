---
layout: layouts/post.njk
title: "Grice e BDAD — Três Camadas de Responsabilidade"
metaTitle: "Como Grice, BDAD e Verificabilidade se relacionam"
metaDesc: "Análise comparativa: especificação comportamental, linguagem responsável e observabilidade em sistemas agênticos"
date: 2026-09-23
tags:
  - design
  - agents
  - bdad
  - grice
  - verification
  - agentic
lang: "pt-BR"
draft: true
status: "published"
---

| Aspecto | Grice | BDAD | Verificabilidade |
|---------|-------|------|------------------|
| **Escopo** | Linguagem (o que afirmar) | Ações (o que fazer) | Observação (como saber) |
| **Pergunta Central** | O que é justificado epistemicamente? | O que é autorizado operacionalmente? | É observável? |
| **Unidade** | Afirmação / Enunciado | Comportamento esperado | Teste / Eval |
| **Aplicação** | "O agente pode dizer X?" | "O agente pode fazer Y?" | "Conseguimos verificar se Z aconteceu?" |
| **Falha Típica** | Dizer coisa errada (hallucination) | Fazer coisa errada (execução indevida) | Não saber se regra foi respeitada |

## O Problema: Três Dimensões de Responsabilidade

Quando um agente recebe um comando como:

> Cancela o pagamento de R$ 50 mil para a Acme.

há três perguntas simultâneas:

1. **O que pode o agente DIZER?** (Grice)
2. **O que pode o agente FAZER?** (BDAD)
3. **Como sabemos se ele fez certo?** (Verificabilidade)

Se você responde bem à pergunta 1 e falha nas 2 e 3, o agente parece responsável mas não é.

## 1. Grice: Linguagem Responsável

Grice define máximas de cooperação: qualidade, quantidade, relação, modo.

**Aplicada a agentes:** O agente pode afirmar apenas aquilo que:
- É verdadeiro (ou suficientemente justificado)
- É relevante para o contexto
- É proporcionado à informação disponível
- É claro e não enganoso

### Exemplo: O Agente Diz

✅ "Identifiquei a fatura XYZ, valor R$ 50 mil, beneficiário Acme Corp"
- Verdadeiro (verificável nos dados)
- Relevante (necessário para cancelar)
- Proporcionado (traz o essencial)
- Claro

✅ "Encontrei 2 pagamentos agendados. Qual você quer cancelar?"
- Honesto sobre limitação
- Delega decisão apropriadamente

❌ "Pagarei com sua melhor taxa"
- Afirmação sem fundamento
- Pressupõe conhecimento que pode não ter

❌ "O diretor aprovou"
- Baseado em relato de terceiro, não confirmação direta

### Limite de Grice

Grice governa **o que é dito**. Não governa **o que é feito**.

Um agente pode dizer a coisa certa e fazer a coisa errada. Ou dizer algo menor e fazer coisas que não deveria.

## 2. BDAD: Comportamento Esperado

BDAD especifica **o que o agente pode fazer** e, mais importante, **em que condições**.

Não é sobre intenção. É sobre autoridade, autorização e execução.

### Distinção Crítica: Intenção ≠ Autoridade ≠ Autorização ≠ Execução

**No exemplo do pagamento:**

1. **Intenção:** Cliente diz "cancela" (claro, mas não suficiente)
2. **Autoridade:** Cliente tem autoridade para iniciar cancelamento (sim)
3. **Autorização:** Cliente sozinho pode authorizar? (não — exige 2 assinaturas)
4. **Execução:** Sistema consegue executar? (pode falhar, ficar pendente, etc)

Um agente responsável distingue todas as quatro.

### Invariantes BDAD no Exemplo

1. **O agente nunca deve apresentar o pagamento como cancelado sem confirmação do sistema de pagamentos.**
2. **Uma única aprovação nunca deve ser tratada como suficiente quando duas são necessárias.**

Esses invariantes precisam ser verdadeiros **independentemente** de:
- Como o cliente pede
- Qual modelo executa
- Qual framework coordena
- Quando mudanças ocorrem

### Limite de BDAD

BDAD governa **ações**. Não governa automaticamente **como você sabe** se agiu certo.

Um agente pode estar em conformidade com BDAD (respeita invariantes) e ainda não ser verificável (porque você não consegue checar depois).

## 3. Verificabilidade: Observação Contínua

Verificabilidade é a capacidade de observar se um comportamento aconteceu, em produção e retroativamente.

Responde: "Conseguimos imaginar um teste para isso?"

### Exemplo: Testando BDAD

Se a especificação BDAD diz "agente não confirma cancelamento sem confirmação do sistema", você pode testar:

| Cenário | Esperado | Verificação |
|---------|----------|-------------|
| Nenhuma aprovação | Agente não apresenta como cancelado | Buscar logs; filtrar "cancelado confirmado"; nenhum resultado |
| Uma aprovação | Agente não apresenta como cancelado | Idem |
| Duas aprovações, sem exec | Agente não apresenta como cancelado | Idem |
| Duas aprovações + falha | Agente não apresenta como cancelado | Idem |
| Exec confirmada | Agente pode apresentar como cancelado | Existe um resultado |

O teste não verifica **exatamente qual frase o agente usou**. Verifica se ele respeitou a **fronteira** em todos os casos.

### Limite de Verificabilidade

Verificabilidade responde "é observável?" mas não responde "o que deve ser verdadeiro?".

Sem BDAD (especificação), você não sabe o que procurar. Com BDAD sem verificabilidade, você sabe o que quer mas não consegue checar.

## Como as Três Se Encontram

### Camada 1: O Que Você Pode Dizer (Grice)

```
Cliente: "O diretor aprovou?"
Agente: "Ele enviou email dizendo que sim"  ← Grice: válido? 
        Verdade: sim
        Relevante: sim
        Proporcionado: sim
        Claro: sim
        ✅ Passa Grice
```

### Camada 2: O Que Você Pode Fazer (BDAD)

```
Com base no relato, agente deveria:
  → Cancelar o pagamento?
  → Registrar primeira aprovação e esperar segunda?
  → Verificar email diretamente?
  
BDAD: "Nunca fazer com base em relato de terceiro. Sempre confirmar no sistema."
❌ Agente falha em BDAD (mesmo que tenha passado em Grice)
```

### Camada 3: Como Você Sabe que Fez Certo (Verificabilidade)

```
Em produção, alguém precisa responder:
  "Esse agente respeita o invariante de nunca confirmar cancelamento sem sistema?"
  
Verificabilidade: "Conseguimos rodar evals contra logs históricos"
✅ Verificável

Se não conseguisse verificar, o invariante não valeria.
```

## O Problema de Saltar Camadas

### Só Grice (Linguagem Correta, Mas Ações Erradas)

Agente sempre fala a verdade, mas:
- Cancela pagamentos com uma aprovação (deveria ter 2)
- Executa ações que não deveria (fora de mandato)
- Você não consegue auditar depois

Parece responsável na superfície. Não é.

### Só BDAD (Especificação Clara, Mas Não Verificável)

Você especificou bem "nunca confirmar sem sistema", mas:
- Não consegue checar se isso realmente aconteceu
- Não consegue auditar o que foi feito
- Confiança é teórica, não operacional

### Só Verificabilidade (Testes, Mas Sem Direção)

Você tem muitos testes, mas:
- Não sabe exatamente qual comportamento protegem
- Agente pode passar nos testes e fazer coisas erradas que não testou
- Testes são frágeis (testam frases específicas, não fronteiras)

## Integração: O Modelo Completo

**Um sistema responsável:**

1. **Define o que pode dizer** (Grice) — máximas de cooperação
2. **Define o que pode fazer** (BDAD) — invariantes comportamentais
3. **Define como verificar** (Verificabilidade) — evals observáveis
4. **Conecta tudo** — especificação comportamental guia implementação

```
Grice (Linguagem)
    ↓ (fundamenta)
BDAD (Comportamento)  ← Especificação
    ↓ (é testada por)
Verificabilidade (Observação)
    ↓ (retroalimenta)
Operação em Produção
```

---

**Veja também:**
- [BDAD — Comportamento como Artefato de Especificação](/posts/bdad/)
- [Notas #007 - Design e agentes](/posts/notas-007/)
