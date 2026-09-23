---
layout: layouts/post.njk
title: "BDAD — Comportamento como Artefato de Especificação"
metaTitle: "BDAD: especificação comportamental de agentes"
metaDesc: "Por que o comportamento esperado deveria ser o principal artefato de especificação de agentes, independente da implementação"
date: 2026-09-23
tags:
  - design
  - agents
  - bdad
  - specification
  - agentic
  - verification
lang: "pt-BR"
status: "published"
---

Behavior-Driven Agent Design (BDAD) é uma abordagem em que **o comportamento esperado do agente funciona como principal artefato de especificação**. Ele descreve como o agente deve se comportar em determinadas situações, independentemente do modelo ou da arquitetura utilizada, e serve de referência para implementação e avaliação contínua desse comportamento.

**Propriedades essenciais:**
- Precisa falar de comportamento (não de implementação)
- Precisa sobreviver à troca de modelo, framework ou arquitetura
- Precisa ser verificável

## Por Que BDAD É Diferente de Especificação Técnica

Hoje, o comportamento de agentes fica espalhado:
- Uma regra está no prompt
- Outra na descrição de uma ferramenta
- Uma terceira em uma função
- Outra num documento de compliance
- Talvez exista um teste verificando uma delas

O comportamento existe, mas não existe como artefato unificado.

BDAD propõe que a especificação comportamental seja uma **camada acima** da especificação técnica:

| Aspecto | Especificação Comportamental | Especificação Técnica |
|---------|------------------------------|----------------------|
| **O quê** | O que precisa permanecer verdadeiro | Como vamos fazer isso hoje |
| **Mudança** | Não muda com a arquitetura | Muda com modelo/framework |
| **Audiência** | Product, compliance, design | Engenharia |
| **Horizonte** | Longo prazo (política da empresa) | Curto prazo (implementação) |

**Exemplo:** Se a regra do serviço é:

> Um pagamento que exige duas assinaturas não pode ser apresentado como cancelado antes das duas aprovações e da confirmação do cancelamento.

essa regra deveria continuar verdadeira se trocarmos o modelo, o framework ou a arquitetura inteira.

A política do banco não mudou. O comportamento esperado também não. Mudou apenas a forma de construí-lo.

## Invariantes e Objetivos: Fronteiras vs. Caminhos

BDAD separa dois conceitos:

### Invariantes: O Que Não Pode se Perder

Um invariante é uma propriedade que deve continuar verdadeira em todas as circunstâncias, independentemente do caminho que o agente toma.

**Exemplo: Cancelamento de Pagamento**

Cenário: Conta empresarial em que cancelar um pagamento de R$ 50 mil exige duas assinaturas. Um signatário diz ao agente:

> Cancela o pagamento de R$ 50 mil para a Acme.

Invariantes desta situação:

1. **O agente nunca deve apresentar o pagamento como cancelado sem confirmação do sistema de pagamentos.**
2. **Uma única aprovação nunca deve ser tratada como suficiente quando duas são necessárias.**

Esses limites não mudam conforme o cliente fala:

- "Cancela isso."
- "Dá tempo de parar o pagamento?"
- "Não quero mais que esse dinheiro saia amanhã."

A conversa varia. A fronteira permanece.

### Objetivos: O Que o Agente Está Tentando Alcançar

Um objetivo é o estado que o agente tenta tornar verdadeiro, mas o caminho pode variar.

**No mesmo exemplo:**

O cliente quer que um pagamento que está agendado deixe de estar.

O agente pode:
1. Identificar o pagamento
2. Verificar as regras da conta
3. Registrar a primeira aprovação
4. Esperar pela segunda aprovação
5. Tentar cancelar
6. Descobrir que já é tarde demais

O objetivo continua. O caminho pode ser diferente em cada situação.

### A Diferença de Design

Isso distingue desenhar um agente de desenhar uma árvore de diálogo.

Com árvores de diálogo, você tenta antecipar cada caminho.

Com agentes, você deixa claro o que não pode se perder em nenhum caminho. Depois deixa o agente encontrar a rota.

**Quanto mais liberdade existe no caminho, menos sentido faz tentar desenhá-lo.** O que precisamos desenhar melhor são as fronteiras.

## Evidência como Requisito Comportamental

Há uma dimensão frequentemente esquecida na especificação: **como o agente sabe**.

O cliente pode dizer:

> O outro diretor já aprovou.

Pode ser verdade. Mas se a segunda aprovação é necessária para cancelar R$ 50 mil, não queremos que o agente simplesmente aceite essa frase como confirmação.

Ele precisa saber **de onde veio a informação** que sustenta a ação.

### Confiança ≠ Aprovação

Alguns comportamentos dependem não apenas **do que o agente sabe**, mas **de como esse conhecimento foi estabelecido**.

- O agente pode estar muito confiante de que o segundo signatário aprovou. Confiança não é aprovação.
- Pode deduzir que o cancelamento provavelmente funcionou. Isso não significa que o pagamento foi cancelado.

**Regra central:** A força da afirmação não pode ser maior que a força da evidência.

Se a especificação diz que o agente não deve confirmar um cancelamento antes da execução, então:

- O agente não pode basear a confirmação em dedução
- Não pode basear em relatos de terceiros
- Deve basear em confirmação do sistema que executou o cancelamento

A evidência determina quais afirmações são permitidas.

## Verificabilidade: Como Sabemos que as Regras Foram Respeitadas

É aqui que a verificabilidade deixa de ser uma disciplina separada e se torna parte da especificação.

Se você especificou um invariante, você deve conseguir imaginar como testá-lo.

### Testando Invariantes, Não Frases

**Contra-exemplo (fraco):** "Teste se o agente diz 'O pagamento foi cancelado'"

Por quê? O agente pode dizer a frase certa no contexto errado.

**Exemplo (forte):** "Teste se o agente apresenta o pagamento como cancelado apenas após confirmação do sistema"

Isso pode ser verificado em múltiplos cenários:

1. **Nenhuma aprovação** → agente não apresenta como cancelado
2. **Uma aprovação** → agente não apresenta como cancelado
3. **Duas aprovações, mas cancelamento pendente** → agente não apresenta como cancelado
4. **Duas aprovações e falha na execução** → agente não apresenta como cancelado
5. **Cancelamento confirmado** → agente pode apresentar como cancelado

O teste verifica se o agente respeita a **fronteira** em todos esses casos.

### O Teste da Especificação

Se não conseguimos imaginar como observar se determinado comportamento aconteceu, talvez ainda não o tenhamos especificado bem o suficiente.

Especificação comportamental + capacidade de verificar = confiança operacional.

## Núcleo Mínimo de BDAD

BDAD não precisa de vocabulário próprio extenso, listas de campos obrigatórios ou um grande processo para os times aprenderem.

O núcleo pode permanecer pequeno:

**situação → comportamento esperado → evidência de verificação**

Exemplo completo:

| Aspecto | Descrição |
|---------|-----------| 
| **Situação** | Agente recebe pedido para cancelar pagamento de R$ 50 mil; cancelamento exige 2 assinaturas |
| **Comportamento Esperado** | Agente reconhece exigência de 2 assinaturas; registra cada aprovação; só confirma cancelamento após sistema confirmar execução |
| **Evidência de Verificação** | Evals em 5 cenários diferentes (nenhuma aprovação até cancelamento confirmado); agente respeita fronteira em todos |

## Implicações para Design e Arquitetura

### 1. Separação de Responsabilidades

A especificação comportamental não deve viver em:
- Um único prompt (porque prompts mudam)
- Descrição de ferramentas (porque ferramentas mudam)
- Uma função (porque código refatora)
- Um documento de compliance (porque fica desconectado)

Deveria ser um artefato próprio, referenciado por implementações, testado continuamente.

### 2. Implementação Agnóstica

Três equipes podem implementar a mesma especificação comportamental de formas completamente diferentes:

- **Equipe A:** LLM + ferramentas + prompt engineering
- **Equipe B:** Máquina de estados + regras explícitas
- **Equipe C:** Abordagem neurossimbólica

Se as três respeitam os invariantes, todas são válidas.

### 3. Avaliação Contínua

Como o comportamento é verificável, pode ser monitorado em produção.

Se um invariante é violado (mesmo raramente), você sabe porque: implementação mudou, modelo atualizou, dados degradaram.

A especificação comportamental é o padrão contra o qual você mede.

## Relação com Outros Conceitos

### Com Linguagem Responsável

A responsabilidade na linguagem (Grice) limita o que o agente pode **afirmar**. BDAD limita o que o agente pode **fazer**.

Um agente pode dizer a coisa certa e fazer a coisa errada, ou vice-versa.

### Com Verificabilidade

Verificabilidade é o critério geral: é observável? BDAD a operacionaliza: comportamentos são verificáveis via evals.

Sem BDAD, verificabilidade fica vaga. Sem verificabilidade, BDAD é apenas filosofia.

### Com Autonomia e Controle

Autonomia precisa de espaço (objetivos permitem múltiplos caminhos). Controle precisa de limites (invariantes definem o espaço).

BDAD separa esses dois, permitindo ambos simultaneamente.

## Por Que Isso Importa Agora

Conforme os agentes começam a fazer coisas (não apenas responder), a distinção entre intenção, autoridade, autorização e execução vira crítica.

Essa distinção não é um detalhe UX. É uma diferença entre confiança e risco operacional.

BDAD oferece uma forma de fazer essa distinção explícita, verificável e duradoura.

---

**Veja também:**
- [Grice e BDAD — Três camadas de responsabilidade](/posts/grice-e-bdad/)
- [Notas #007 - Design e agentes](/posts/notas-007/)
