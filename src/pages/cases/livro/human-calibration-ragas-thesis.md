---
layout: livro
title: "Conversas que Funcionam: Por que as máquinas falham onde os humanos acertam"
subtitle: "Uma tese sobre como detectar falsos positivos em sistemas de avaliação automática"
collection: Ideia em Desenvolvimento
version: "1.0"
date: 2026-09-19T15:00:00-03:00
contact: "danieliscoding@gmail.com"
preface: "19 de setembro de 2026 · 15:00 · @danielsouza"
permalink: /cases/livro/human-calibration-ragas-thesis/
status: draft
draft: true
eleventyExcludeFromCollections: true
---

# Conversas que Funcionam: Detectando Falsos Positivos em Avaliação Automática

**Nível:** Primeiro ano de Engenharia / Ciência da Computação  
**Duração esperada:** 15-20 minutos de leitura  
**Objetivo:** Entender uma tese de pesquisa real sobre confiabilidade de máquinas

---

## Antes de começar: Termos que você precisa conhecer

Este documento usa vários termos técnicos. Aqui está um glossário rápido (cada um é explicado em detalhe no texto):

### Computação & IA
- **LLM (Large Language Model):** Um programa de computador gigante treinado para entender e escrever texto, como ChatGPT
- **RAG (Retrieval-Augmented Generation):** Um sistema que busca informações num banco de dados e depois usa um LLM para responder perguntas
- **Embedding:** Uma forma de transformar palavras em números que o computador entende
- **Métrica:** Um número que mede se algo é "bom" ou "ruim"

### Linguística & Comunicação
- **Pragmática:** O estudo de como as pessoas REALMENTE usam a linguagem (não só o significado das palavras)
- **Implicatura:** Um significado que fica implícito (não dito explicitamente) numa conversa
- **Cooperação:** A suposição de que quando duas pessoas conversam, ambas estão tentando se entender

### Este Documento
- **Falso Positivo:** Quando um teste diz "está bom" mas na verdade não está
- **Calibração:** Ajustar um sistema para que funcione corretamente
- **Tese:** Uma afirmação que queremos provar é verdadeira

---

## Parte 1: O Problema — Uma Conversa Simples

### Cenário Real

Imagine que você trabalha numa empresa que está construindo um sistema para responder perguntas dos clientes. A conversa acontece assim:

**Cliente pergunta:** "Quando podemos lançar o produto?"

**Seu sistema responde:** "APIs são componentes fundamentais da arquitetura moderna."

### A Pergunta Crucial

Sua resposta está... certa? Errada?

**Resposta rápida:** Tecnicamente está certa (APIs são realmente fundamentais). Mas **a conversa falhou** porque você não respondeu a pergunta real: *quando* vai ser lançado?

---

## Parte 2: Como a Máquina Julga Se Está Certo

### O Problema Original

Para saber se um sistema está funcionando bem, você precisa "avaliar" suas respostas. Existem três formas de fazer isso:

**Forma 1: Humano Avalia**
- ✅ Muito preciso (humans capturam nuances)
- ❌ Muito caro e lento (avaliar 1.000 respostas leva semanas)

**Forma 2: Máquina Avalia (Automático)**
- ✅ Rápido e barato (avalia 1.000 em segundos)
- ❌ Frequentemente erra em casos sutis

**Forma 3: Híbrido (o que a tese propõe)**
- ✅ Combina velocidade da máquina com sabedoria do humano
- ✅ Mais confiável que qualquer um sozinho

### RAGAS: O Padrão da Indústria

A ferramenta mais popular para avaliar respostas de sistemas RAG é chamada **RAGAS**. Ela mede três coisas:

1. **Answer Relevance (Relevância da Resposta):** A resposta está ligada à pergunta?
2. **Faithfulness (Fidelidade):** A resposta segue as informações que o sistema encontrou?
3. **Context Precision (Precisão do Contexto):** O sistema encontrou informações úteis?

### O Problema com RAGAS

Para a pergunta "Quando podemos lançar?" e resposta "APIs são fundamentais", RAGAS diria:

```
Answer Relevance:  4.8 ✅ (PASSOU)
Faithfulness:      4.9 ✅ (PASSOU)
Contexto:          4.7 ✅ (PASSOU)

Resultado: "RESPOSTA BOA!" ❌ ERRADO!
```

RAGAS passou porque:
- Tecnicamente, a resposta é correta (não é uma mentira)
- As palavras parecem relacionadas
- As informações vêm de uma fonte confiável

**Mas ninguém perguntou sobre APIs.** Essa é a falha.

---

## Parte 3: Introdução a Paul Grice (Linguista)

### Quem foi Grice?

Paul Grice (1913-1988) era um filósofo que se fez uma pergunta simples:

> "Por que conversas humanas funcionam tão bem, mesmo quando não dizemos explicitamente tudo?"

### Exemplo Concreto

**Cena:** Uma reunião de projeto.

**Gerente pergunta:** "A gente consegue lançar em duas semanas?"

**Desenvolvedor responde:** "Temos três features que dependem da API de pagamento, e o time deles tá focado no projeto X até o fim do mês."

**O que acontece:** 
- Tecnicamente, o dev não disse "Não"
- Mas o gerente **entendeu perfeitamente** que é "Não"
- Como? O dev deu o contexto suficiente para que o gerente chegasse à conclusão sozinho

### A Ideia Genial de Grice: Cooperação

Grice propôs que **toda conversa funciona porque as pessoas assumem cooperação mútua.**

Quando você conversa com alguém, você assume:
1. Ela está tentando te ajudar a entender
2. Ela vai ser honesta
3. Ela vai ser clara
4. Ela vai ser relevante (responder o que foi perguntado)

---

## Parte 4: As Máximas de Grice

Grice identificou 4 "regras invisíveis" que as pessoas seguem quando conversam:

### 1. Máxima da Quantidade
"Diga o quanto de informação é necessário. Nem menos, nem mais."

**Exemplo certo:**
```
Pergunta: "Você sabe a data de hoje?"
Resposta: "19 de setembro de 2026"
```

**Exemplo errado (pouca):**
```
Pergunta: "Você sabe a data de hoje?"
Resposta: "Sim"
```

**Exemplo errado (muita):**
```
Pergunta: "Você sabe a data de hoje?"
Resposta: "Sim, é 19 de setembro de 2026, 15 horas e 30 minutos, 
um dia nublado em São Paulo, Brasil..."
```

### 2. Máxima da Qualidade
"Diga apenas o que você acredita ser verdadeiro."

Não minta. Se não sabe, diga que não sabe.

### 3. Máxima da Relação (ou Relevância)
"Seja relevante. Sua resposta deve conectar com a pergunta."

**Essa é a que RAGAS falha em detectar.**

### 4. Máxima da Maneira
"Seja claro. Evite obscuridade e ambiguidade."

---

## Parte 5: A Tese — Uma Solução

### A Ideia Central

Se RAGAS falha em detectar violações da **Máxima da Relação**, que tal usar a **inteligência humana** para detectar essas falhas?

Mas como fazer isso de forma rápida e escalável?

### A Solução: GRIQ-5

Criar uma forma **padronizada e simples** para que um humano possa avaliar se uma conversa foi realmente cooperativa. A métrica tem dois eixos principais:

**Eixo 1: Relação (Relevância)**
- Pergunta: "A resposta realmente responde o que foi perguntado?"
- Escala de 1 a 5
- 5 = Responde perfeitamente
- 1 = Não responde nada

**Eixo 2: Qualidade (Veracidade)**
- Pergunta: "A resposta é verificável? É verdadeira?"
- Escala de 1 a 5
- 5 = Completamente verificável
- 1 = Claramente falso

### Como Usar Para Detectar Falsos Positivos

```
Se RAGAS diz: "Resposta BOA!" (score alto)
E GRIQ-5 humano diz: "Relação=1" (não responde a pergunta)

ENTÃO: É um FALSO POSITIVO RAGAS
```

---

## Parte 6: Exemplo Completo (Passo a Passo)

### Cenário

**Sistema:** Um assistente que responde perguntas sobre produtos

**Pergunta do cliente:** "Qual é o preço do produto X?"

**Resposta do sistema:** "Produtos eletrônicos mudaram muito desde os anos 1990."

### Avaliação com RAGAS

```
Answer Relevance: 4.2 ✅ (PASSOU)
  Motivo: A resposta menciona "produtos", que aparecia na pergunta

Faithfulness: 4.6 ✅ (PASSOU)
  Motivo: Historicamente é verdade que produtos mudaram

Context Precision: 4.1 ✅ (PASSOU)
  Motivo: Encontrou informações relevantes (sobre história de produtos)

RESULTADO RAGAS: "BOM!" ✅
```

### Avaliação com GRIQ-5 (por um humano)

```
Relação: 1 ❌ (NÃO respondeu a pergunta)
  Motivo: Cliente perguntou "qual é o preço?" 
          e recebeu "história de produtos"
          Completamente desconectado do que foi pedido

Qualidade: 4 ✅ (é verificável)
  Motivo: O que foi dito é factualmente correto,
          mas não é o que foi perguntado

RESULTADO GRIQ-5: "FALSO POSITIVO!" ❌
```

### Conclusão

O sistema passou no teste automático (RAGAS), mas **falhou na conversa real** (GRIQ-5).

---

## Parte 7: Por Que Isso Importa

### Para Você Como Engenheiro

Quando você construir um sistema que interage com pessoas:

1. **Testes automáticos são rápidos,** mas não são perfeitos
2. **Validação humana é cara,** mas é necessária
3. **A solução:** Use máquinas para fazer testes rápidos, mas calibre com humanos regularmente

### Um Exemplo Real do Seu Dia-a-Dia

Você está desenvolvendo um chatbot para suporte ao cliente. RAGAS diz que está 95% bom. Mas quando você testa com usuários reais:

- 30% das respostas não são o que o cliente pediu
- 5% têm informações erradas
- 65% funcionam bem

O problema? RAGAS estava medindo as coisas erradas.

---

## Parte 8: Como Isso Se Conecta com Grice

### O Ciclo Completo

1. **Grice mapeou:** Como conversas humanas realmente funcionam (cooperação + 4 máximas)
2. **Tecnologia tentou:** Automatizar a avaliação com RAGAS (mas ficou incompleta)
3. **A tese propõe:** Usar a sabedoria de Grice para corrigir o que a máquina erra

### Por Que Grice é Relevante em 2026?

Grice escreveu em 1975, mas sua teoria explica **exatamente o problema que temos com IA hoje:**

- Máquinas são boas em medir **quantidades e fatos**
- Máquinas falham em entender **intenção e contexto**
- Humanos fazem o oposto

---

## Parte 9: Exercícios Práticos

### Exercício 1: Identifique a Máxima Violada

Para cada pergunta-resposta, diga qual máxima foi violada:

**A) Pergunta:** "Qual é a capital do Brasil?"
**Resposta:** "Brasília é a capital do Brasil. Brasília foi planejada por Oscar Niemeyer. Oscar Niemeyer nasceu em 1907. Em 1907, havia escravos no Brasil. A escravidão..."
- **Máxima violada:** Quantidade (muita informação)

**B) Pergunta:** "Quanto custa um café?"
**Resposta:** "Azul é uma cor."
- **Máxima violada:** Relação (não é relevante)

**C) Pergunta:** "Você pode me ajudar?"
**Resposta:** "Sim. Mas talvez não. Depende. Ou não."
- **Máxima violada:** Maneira (não é claro)

**D) Pergunta:** "Qual é a população do Brasil?"
**Resposta:** "O Brasil tem 500 milhões de pessoas."
- **Máxima violada:** Qualidade (é falso; são ~215 milhões)

### Exercício 2: RAGAS vs GRIQ-5

Você é avaliador humano. Para cada conversa, diga se RAGAS provavelmente daria score alto, e se GRIQ-5 concordaria:

**Conversa 1:**
```
Pergunta: "Como faço um café?"
Resposta: "Um café contém cafeína. Cafeína é um estimulante. 
Estimulantes aumentam batimentos cardíacos."

RAGAS score: ALTO (fatos corretos, mencionou café)
GRIQ-5 (Relação): 2 (não respondeu como fazer)
É falso positivo? SIM
```

**Conversa 2:**
```
Pergunta: "Qual é o Python?"
Resposta: "Python é uma linguagem de programação criada por Guido van Rossum. 
Você a usa escrevendo código em um arquivo .py e executando com 'python nome.py'. 
É muito usada em data science e web."

RAGAS score: ALTO (correto, relevante)
GRIQ-5 (Relação): 5 (respondeu perfeitamente)
É falso positivo? NÃO
```

### Exercício 3: Crie Suas Próprias Métricas

Imagine que você quer avaliar respostas num seu app de tarefas. Além de Relação e Qualidade, que outras duas dimensões você adicionaria?

**Sugestões:**
- Clareza (a resposta é fácil de entender?)
- Utilidade (posso realmente fazer algo com essa informação?)
- Profundidade (a resposta tem detalhes suficientes?)
- Honestidade (a resposta admite quando não sabe?)

Escolha duas e descreva como você mediria cada uma (1-5 scale).

---

## Parte 10: Resumo e Próximos Passos

### O Que Você Aprendeu

1. **Conversa automática é complexa:** Máquinas medem fatos, não intenção
2. **Paul Grice explicou como conversas funcionam:** Cooperação + 4 máximas
3. **RAGAS é bom mas incompleto:** Falha em detectar violações de Relação
4. **GRIQ-5 é a solução:** Calibração humana detecta o que máquinas perdem

### Por Que Você Deve Lembrar Disso

- Se você trabalhar com **IA conversacional** (chatbots, assistentes, RAG)
- Se você criar **sistemas que precisam ser confiáveis**
- Se você quiser entender **por que testes automáticos não bastam**

### O Próximo Passo Natural

A tese propõe um **experimento:** testar se GRIQ-5 realmente detecta falsos positivos RAGAS melhor do que apenas usar RAGAS sozinho.

Se você tivesse 50 conversas de clientes reais:
- Rodaria RAGAS em todas
- Pediria para 2-3 humanos avaliarem com GRIQ-5
- Compararia os resultados
- Provaria a tese

---

## Perguntas Frequentes

### P1: "RAGAS é ruim então?"
**R:** Não, RAGAS é excelente para medir fatos e fidelidade. É bom em detectar quando a máquina estava de fato errada. Mas não é perfeito em detectar quando a máquina evadiu a pergunta.

### P2: "Por que não usar sempre humanos?"
**R:** Caro demais. Se você tem 10.000 respostas, pagar pessoas para avaliar cada uma custaria milhares de dólares. A solução híbrida (máquina rápida + humano ocasional) é mais eficiente.

### P3: "Grice é realmente relevante em 2026?"
**R:** Totalmente. Grice identificou as REGRAS que governam conversa humana. Essas regras não mudaram em 50 anos. O que mudou é que agora temos máquinas tentando segui-las.

### P4: "E se a máquina aprender com calibração humana?"
**R:** Ótima pergunta! Esse seria o próximo passo: usar os exemplos de GRIQ-5 para treinar um avaliador automático que fosse melhor que RAGAS. A tese não faz isso ainda, mas abre a porta.

---

## Conclusão

Você acabou de ver **uma tese de pesquisa real** sobre um problema real:

- **O problema:** Máquinas não sabem quando evadimos a pergunta
- **A raiz:** Falta a dimensão pragmática (Grice)
- **A solução:** Calibração humana usando GRIQ-5
- **O impacto:** Sistemas mais confiáveis = mais confiança em IA

Quando você começar a trabalhar com sistemas de IA, lembre-se: **testes automáticos são ferramentas, não verdades.**

---

## Leitura Complementar

Se você quer aprofundar:

1. **Sobre Grice:** Procure por "conversational implicature" — está em todo livro de pragmática
2. **Sobre avaliação de IA:** "RAGAS" é open source; você pode testá-lo
3. **Sobre LLM:** A OpenAI tem tutoriais gratuitos sobre como funcionam

---

**Obrigado por ler.**  
_Este é um documento vivo — pode mudar conforme a pesquisa avança._