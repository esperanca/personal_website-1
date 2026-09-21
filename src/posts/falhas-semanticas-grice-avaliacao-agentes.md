---
title: "Falhas Semânticas e as Máximas de Grice em Avaliação de Agentes"
description: "Como avaliar respostas de agentes após sua camada de ferramentas garantir integridade de dados. Um framework para capturar falhas semânticas através das máximas conversacionais de Grice, verificações determinísticas e calibração humana."
date: 2026-09-21
tags: ["evaluation", "agents", "ai-quality", "grice", "design", "verificabilidade"]
draft: true
status: "[aguardando revisão humana]"
lang: "pt-BR"
en_url: "/posts/when-data-is-clean/"
---

# Falhas Semânticas e as Máximas de Grice em Avaliação de Agentes

> [aguardando revisão humana]
>
> **English version:** [When Data Is Clean: Semantic Failures and Grice's Maxims in Agent Evaluation](/posts/when-data-is-clean/)

## Introdução: Grice e a Violação Invisível

Em 1975, Paul Grice descreveu como humanos cooperam através da linguagem (Grice, 1975). Falantes seguem quatro regras não ditas—as máximas da Conversação—e ouvintes inferem significado baseado na suposição de que essas regras estão sendo seguidas. Quando alguém quebra uma regra sem marcá-la, o ouvinte experimenta a resposta como enganosa, mesmo se as palavras forem literalmente verdadeiras.

Um agente que retorna dados combinando com o resultado de uma ferramenta, mas estrutura esses dados de forma a responder a pergunta errada, viola a máxima de Relação de Grice. Parece cooperativo. Os dados estão corretos. A sentença é clara. Ainda assim, engana.

A análise de Sekuj em setembro de 2026 sobre modos de falha em avaliação no Monte Carlo identificou cinco casos onde evals padrão—testes executados em transcrições apenas—não capturam nada. O fio condutor através de todos os cinco: cada violação é uma quebra de máxima disfarçada de output fluente. A resposta lê como cooperativa quando não deveria ser.

Mas aqui há uma distinção crítica: três dessas cinco falhas pertencem à montante, em sua camada de execução de ferramentas. Este artigo aborda os dois que permanecem.

## Por Que Grice em Avaliações de Agentes: O Problema da Pragmática

As máximas de Grice foram aplicadas a avaliação de agentes nos últimos anos—Krause & Vossen (2024) surveiam seu uso generalizado em NLP, e frameworks como GriceBench (2026) e Lamoids (AAMAS 2025, Zhi-Xuan et al.) demonstram melhorias mensuráveis (27–95% melhor detecção de falhas semânticas) quando agentes aderem explicitamente às máximas. Miehling et al. (2024) documentaram que LLMs frequentemente violam as máximas de Relação e Qualidade em conversas humano-IA.

Porém, tentativas anteriores de eval conflitaram dois problemas distintos:

1. **Violações de máximas como falhas estruturais** (detectáveis, determinísticas)
2. **Interpretação pragmática** (inferir intenção do usuário a partir de contexto, requer ground truth)

Pragmática—a disciplina de entender como contexto molda significado—é onde esses frameworks tropeçaram. Um usuário escreve "Mostre-me a receita." Pragmaticamente, você infere que eles significam receita do *seu* contexto atual, não um agregado genérico. Mas sua camada de eval não pode inferir isso sem confiar em seu sistema de identidade e camada de ferramentas. Se qualquer um deles for barulhento, você etiquetará incorretamente a resposta do agente.

Este framework **coloca pragmática completamente entre parênteses**. Assume que sua camada de ferramentas é o oráculo: dados são limpos, identidade é resolvida, parâmetros são registrados. Com essas garantias, as máximas de Grice tornam-se puramente verificações *estruturais*—consistência, resolução dêitica, rastreamento de proveniência—não inferência de intenção.

Interpretação pragmática de objetivos do usuário permanece uma área de pesquisa aberta, especialmente em contextos com agentes conversacionais em português. Este framework não tenta resolvê-la. Em vez disso, cria a fundação—uma camada de eval semântica limpa—sobre a qual raciocínio pragmático pode mais tarde ser construído.

## Premissas Verificadas: Antes de Avaliar Semântica

Este framework assume que sua camada de ferramentas garante integridade de dados. Qualquer framework de eval construído sobre dados corrompidos atribuirá falhas incorretamente. Antes de proceder, verifique que você tem:

**Na execução de ferramentas:**
- [ ] Cada chamada de ferramenta é registrada com: nome, argumentos (valores exatos passados), status de retorno (sucesso/erro/timeout) e payload de resultado
- [ ] Validação de schema de ferramenta acontece em tempo de execução—ranges numéricos, formatos de data, campos obrigatórios são checados *antes* do resultado sair da ferramenta
- [ ] Erros são expostos, não silenciados. Uma chamada falhada retorna `{status: "error", message: "..."}`, não um resultado vazio ou parcial
- [ ] Resultados de ferramentas são armazenados por turno, não cacheados através de turnos sem um timestamp ou flag de mudança de parâmetro

**Na estrutura do trace:**
- [ ] Cada turno é um registro autocontido: input do usuário, parâmetros passados para ferramentas, chamadas de ferramentas com seu status e resultados, resposta do agente
- [ ] Sessões agrupam turnos em ordem com timestamps em um timezone compartilhado (América/São_Paulo para deployments brasileiros)
- [ ] Identidade do usuário é resolvida uma vez por sessão e declarada no trace, não inferida do contexto

**No contrato de output da camada de ferramentas:**
- [ ] Dados numéricos em resultados já estão validados (somas combinam, percentagens são 0–100, datas fazem parse)
- [ ] Se uma ferramenta retorna um número, esse número é ground truth para o domínio dessa ferramenta. Avaliação downstream não pode questioná-lo
- [ ] Se uma ferramenta retorna `null` ou vazio, é marcado como tal no resultado, não tratado como uma chamada faltante

Se você não pode responder sim a todos esses, pare aqui. Sua camada de ferramentas é a fonte de verdade. Construa a camada de logging e validação primeiro. Tudo abaixo assume que esses são verdadeiros.

## O Que Permanece: Três Falhas Semânticas

Com dados garantidos limpos, três modos de falha persistem. Todos são violações de máximas invisíveis para avaliação apenas de transcrição.

### Falha 1: Context Rot (Relação)

O agente cita dados do contexto errado. Um usuário pergunta "Mostre-me a receita Q3" enquanto conectado ao escritório de São Paulo. O agente retorna dados de receita nacional em vez disso. A chamada de ferramenta estava correta—os *argumentos* correspondiam às palavras do usuário. Mas o contexto de sessão do usuário mudou três turnos atrás, e o agente não re-aplicou.

**Máxima violada:** Relação (máxima de relevância). A resposta é precisa mas responde à pergunta de ontem com parâmetros de hoje.

**Exemplo:**
- Turno 1: "Mostre-me a receita para o escritório de São Paulo." → Agent calls revenue_by_region(region="SP", period="Q3") → retorna R$ 10M
- Turno 2: "Mude para Rio." → User muda contexto
- Turno 3: "E Q3?" → Agent chama revenue_by_region(period="Q3") sem region, ou usa resultado cacheado de SP

A transcrição lê naturalmente. Os dados estão corretos. A violação é Relação.

### Falha 2: Desalinhamento de Parâmetro (Relação)

Os argumentos de ferramenta do agente não correspondem aos parâmetros atuais do usuário. Um usuário pede dados "em USD" mas a ferramenta é chamada com currency="BRL". A ferramenta retorna dados corretos—na moeda errada. A resposta cita o número sem marcar a discrepância de moeda.

**Máxima violada:** Relação. O agente respondeu a uma pergunta diferente da que foi feita.

**Exemplo:**
- User: "Mostre-me isso em USD." (parâmetro atual: currency="USD")
- Agent chama: revenue(currency="BRL") [usando setting do turno anterior ou padrão]
- Agent response: "Receita Q3 foi R$ 10M" [número correto, moeda errada; nenhuma nota sobre a discrepância]

### Falha 3: Clarificação Inapropriada (Quantidade)

O agente pede clarificação quando o input era inequívoco. A máxima de Quantidade de Grice diz seja tão informativo quanto necessário, nem mais, nem menos. Clarificação é cooperativa *apenas se* o input é genuinamente ambíguo. Se o usuário especificou um parâmetro claramente, perguntar "qual região você quis dizer?" viola Quantidade—undermina em vez de suportar a conversa.

**Máxima violada:** Quantidade. O agente fornece menos informação do que poderia sem boa razão, e força o usuário a repetir-se.

**Exemplo:**
- User: "Mostre-me receita para São Paulo, Q3, em USD."
- Agent: "Qual região você gostaria de ver?" [inputs estão totalmente especificados; perguntar desperdiça um turno]

Inversamente, se um usuário diz "dados de receita" sem especificar região ou período, pedir clarificação *não* é uma violação—é cooperativo e necessário.

## Remapeando as Falhas

As Cinco Falhas Originais agora mapeiam assim:

| Original | Agora capturado onde | Papel da Eval |
|---|---|---|
| Ghost answer (sem chamada de ferramenta) | Camada de ferramentas (logs de chamadas faltantes) | — |
| Self-contradiction (data → dois formatos) | Camada de ferramentas (validação de schema) + Assembly de resposta (Manner) | Manner-02 (consistência em resposta) |
| Context-dependent (perfil errado) | Relation-05 (identity binding) | Track A + Track B |
| Multi-turn decay (dados obsoletos) | Relation-02 (provenance check) | Track A + Track B |
| False-positive eval (clarificação julgada errado) | Quantity-01 (clarification legitimacy) | Track A + Track B |

Três falhas pertencem à montante (em sua camada de ferramentas, que é a fonte de verdade). Duas permanecem para a camada de eval, mais um novo predicado (Manner consistency). Com essa distinção clara, sua camada de eval torna-se focada e testável.

## Track A: Verificações Semânticas Determinísticas

Com dados de ferramentas garantidos limpos, verificações determinísticas tornam-se puramente semânticas. Elas verificam que a *estrutura* de resposta é consistente e que parâmetros são *resolvidos* e *declarados*.

### Predicados de Qualidade (Simplificado)

Esses checam a resposta contra sua própria lógica interna e contra os resultados de ferramentas que cita.

**QLT-05 [D]:** Consistência interna. Se um número aparece duas vezes na resposta, aparece com o mesmo valor ambas as vezes. Uma região mencionada duas vezes é a mesma região. Uma data declarada em dois formatos (12/09/2026 e setembro 12, 2026) é a mesma data.
- Gate: Falha se inconsistente (regra R11 aplica; turno falha).
- Test: Parse todos números, datas e nomes próprios. Checa por duplicatas com valores diferentes.

**QLT-06 [D]:** Resolução dêitica. Expressões temporais ("hoje", "mês passado", "Q3") são resolvidas para uma data ou range específico *uma vez* na resposta e declaradas explicitamente.
- Gate: Falha se resolvido para diferentes datas em diferentes sentenças, ou se não declarado explicitamente ao menos uma vez.
- Test: Extrai expressões temporais. Usa timestamp de turno e timezone de sessão. Verifica que todos citam o mesmo range.

**QLT-07 [J]:** Fidelidade de redação. Quando citando um número específico de um resultado de ferramenta, a resposta declara esse número com precisão. "R$ 1.234,56" não é parafraseado como "aproximadamente R$ 1.2k" sem um marcador ("aproximadamente").
- Gate: Pergunta Jev (binária): A resposta cita o número da ferramenta sem distorção material?
- Test: Extrai números de resultados de ferramentas. Encontra citações em resposta. Checa por "sobre", "aproximadamente", "mais ou menos", etc.

**QLT-08 [J]:** Estimativas marcadas. Afirmações não derivadas de uma chamada de ferramenta no turno atual são marcadas como estimativas, forecasts, ou baseadas em dados históricos.
- Gate: Falha se uma afirmação não verificada é declarada como fato. Marca para revisão humana se borderline.
- Test: Pergunta Jev: Toda afirmação na resposta é (a) de um resultado de ferramenta este turno, (b) de dados de sessão anterior com fonte declarada, ou (c) marcada como estimativa?

### Predicados de Relação (Core)

Esses verificam que a resposta responde à pergunta atual com parâmetros atuais.

**REL-02 [D]:** Proveniência de dados. Se um número aparece na resposta, vem de uma chamada de ferramenta *este turno* com os parâmetros atuais. Se vem de um turno anterior ou resultado cacheado, a resposta declara a data quando foi recuperado ou nota que é histórico.
- Gate: Falha se um número é citado sem referência de turno e os parâmetros mudaram.
- Test: Extrai cada número da resposta. Rastreia de volta para uma chamada de ferramenta. Checa: (1) é a chamada neste turno? (2) os argumentos da chamada correspondem parâmetros atuais? (3) se não, está a obsolescência notada?

**REL-03 [J]:** Pergunta atual respondida. Esta resposta responde à pergunta que o usuário *acaba de fazer*, ou aborda uma pergunta de turno anterior?
- Gate: Pergunta Jev: A resposta aborda diretamente a mensagem atual do usuário, ou responde uma pergunta anterior?
- Test: Jev recebe mensagem atual, dois turnos anteriores, e resposta. Retorna sim/não com confiança.

**REL-04 [D/J]:** Rastreamento de parâmetro. Os parâmetros atuais do usuário (região, moeda, período, etc.) são explicitamente declarados na resposta ao menos uma vez nas duas primeiras sentenças.
- Gate: Falha se parâmetros são deixados implícitos ou se a resposta não confirma o que foi perguntado.
- Test: Extrai parâmetros de argumentos de ferramentas. Checa se aparecem na resposta. Jev confirma que são declarados upfront.

**REL-05 [D]:** Identity binding. Referências em primeira pessoa na resposta ("Eu", "nós", "seu") resolvem para o usuário ou entidade correto. Uma declaração como "Sua receita Q3 foi R$ 10M" deve ser precisa para o usuário logado, não para uma entidade diferente ou perfil.
- Gate: Falha se identidade está errada.
- Test: Rastreia o user ID do turno. Verifica que corresponde a entidade para a qual dados são atribuídos.

### Predicados de Quantidade e Manner (Sparse)

**QTY-01 [J]:** Legitimidade de clarificação. Se a resposta pede clarificação, o input do usuário era genuinamente ambíguo ou insuficientemente especificado?
- Gate: Falha se o usuário deu parâmetros completos e o agente ainda pede "qual região?".
- Test: Pergunta Jev: Dado a mensagem do usuário, os parâmetros necessários (região, período, moeda, etc.) estão presentes ou ausentes? A requisição do agente por clarificação é justificada?

**MNR-01 [D]:** Confirmação implícita. A resposta abre com uma declaração do que está sendo respondido, usando a linguagem do usuário.
- Não é uma gate (falha sem isso), mas sinalizado para revisão humana.
- Test: Jev: A primeira sentença confirma a requisição? "Você perguntou por receita Q3 em São Paulo..." ou "Aqui está a receita Q3 de São Paulo..." vs. abrindo com dados diretamente.

**MNR-02 [D]:** Recebimento de ação. Se a resposta confirma uma ação (e.g., "Atualizei suas configurações"), inclui um identificador ou timestamp.
- Não é uma gate, mas sinalizado.
- Test: Regex simples: se verbo é "salvei", "atualizei", "mudei", a resposta inclui um ID ou timestamp?

### Regras de Gate do Tier (Atualizado)

**R10 (gate Relation/Quality):** Sem um trace limpo, o turno recebe `insumo_insuficiente`. Eval para.

**R11 (falha Quality é falha de turno):** Uma falha em QLT-05, QLT-06, ou REL-02 falha o turno inteiro. Inconsistência interna significa a resposta não pode ser confiada.

**R12 ("Não encontrado" como Quality 4):** Se uma ferramenta retorna resultado vazio (status: "not_found"), Quality é capeado em 4 (satisfatório mas limitado). Se a ferramenta erros ou times out, Quality é 2 ou menor.

**R13 (turnos de clarificação):** Se a resposta é uma pergunta de clarificação, avalie-a apenas por QTY-01. Não aplique predicados de Relation (não há dados para checar, nenhum parâmetro para verificar).

**R14 (teste isolation per profile):** Uma resposta de ouro é insuficiente. Uma pergunta deve ser testada contra ao menos três perfis distintos (regiões diferentes, roles, níveis de acesso de dados) para capturar REL-05 e falhas de context rot.

## Track B: Calibração Humana Sem Ruído de Dados

Como sua camada de ferramentas valida dados, avaliadores humanos podem focar no que fazem melhor: julgar se a resposta *encaixa* na pergunta e se a estrutura suporta clareza.

### Protocolo de Avaliador Leigo

Restrinja avaliadores leigos a essas perguntas:

1. **Esta resposta responde à pergunta que o usuário acaba de fazer?** (REL-03)
   - Forneça a mensagem do usuário e os dois turnos anteriores para contexto.
   - Não forneça resultados de ferramentas ou detalhes de trace.
   - Não peça para verificar números.

2. **O agente deveria ter pedido clarificação em vez disso?** (QTY-01)
   - Mostre a mensagem do usuário.
   - Pergunte: "Tudo que o usuário pediu é claro, ou há detalhes faltando (qual região, que data, que moeda)?"
   - Se claro: clarificação é violação. Se não claro: clarificação é cooperativa.

3. **A resposta declara região, data e moeda no começo?** (REL-04)
   - Mostre apenas a resposta (não a pergunta).
   - Não peça para verificar acurácia; assuma que números estão corretos.
   - Pergunte: "Você consegue dizer do que é sobre região, período e moeda nas duas primeiras sentenças?"

### Protocolo de Avaliador Especialista

Especialistas com acesso a traces avaliam:

- QLT-05 (consistência interna)
- QLT-06 (resolução dêitica)
- REL-02 (proveniência de dados)
- REL-05 (identity binding)

Este é um set menor que antes. Sem aritmética, sem date parsing—apenas lógica estrutural.

### Workflow de Rotulagem Dois-Tier

1. **Construa um seeded set** de 100–150 turnos com falhas conhecidas injetadas:
   - Injete context rot (use região anterior em turno atual).
   - Injete parameter drift (mude moeda mid-session, cite moeda antiga).
   - Injete clarificações inapropriadas (peça por dados que foram fornecidos).
   - Injete mismatches de identidade (cite dados para usuário A quando logado como usuário B).
   - Adicione hard negatives (respostas corretas, edge cases, input ambíguo).

2. **Especialista rotula primeiro.** Rotule o set completo do seeded para predicados Relation, Quality e Quantity. Esta é sua ground truth.

3. **Avaliadores leigos rotulam blind.** Mostre aos avaliadores leigos os mesmos turnos sem traces de ferramentas. Pergunte apenas sobre Relation (REL-03, REL-04) e Quantity (QTY-01). Meça concordância com rótulos especialistas.

4. **Meça por-predicado recall e false-alert rate.**
   - Quantas das falhas injetadas os avaliadores leigos capturaram?
   - Quantas respostas corretas os avaliadores leigos incorretamente sinalizaram?
   - Shankar et al. (UIST 2024) mostram que isso importa; avaliadores driftam ao longo do tempo. Meça e corrija.

5. **Expanda para produção.** Uma vez calibrado, execute avaliadores leigos em amostra aleatória (~50 turnos por semana) e especialistas em casos sinalizados. Alocação de orçamento (leigo vs. especialista) é uma decisão aberta.

### Correção de Viés

Lee et al. (arXiv:2511.21140, 2026) mostram que LLM-as-judge e human judge ambos têm viéses. Corrija para esses usando sensibilidade e especificidade:

- **Sensibilidade:** Dos turnos realmente ruins, quantos o juiz capturou?
- **Especificidade:** Dos turnos realmente bons, quantos o juiz aceitou?

Um juiz que captura 100% de turnos ruins mas sinaliza 50% de bons como ruins (alta sensibilidade, baixa especificidade) não é útil. Meça ambos. Se um avaliador é enviesado para sinalizar, repondera seus rótulos posteriores ou re-brief.

## Papel de Jev: Julgamento Semântico Puro

Com dados garantidos limpos e verificações determinísticas removidas, Jev torna-se um classificador para três perguntas que requerem julgamento mas não raciocínio:

1. **REL-03 (binária, Noul):** "Esta resposta responde à pergunta atual do usuário, ou aborda um turno anterior?"
   - Input: mensagem atual do usuário, dois turnos anteriores, resposta
   - Output: probabilidade que a resposta é on-topic para o turno atual
   - Threshold de confiança: 0.75 (acima = age; 0.5–0.75 = revisão humana; abaixo = sinaliza como off-topic)

2. **QTY-01 (binária, Noul):** "O input do usuário é específico o suficiente que pedir clarificação é violação?"
   - Input: mensagem do usuário apenas
   - Output: probabilidade que o input especifica região, período e moeda
   - Threshold de confiança: 0.80 (especificidade alta requerida; ambigüidade deveria disparar pergunta do agente)

3. **QLT-07 (binária, Noul):** "A resposta cita o número da ferramenta sem distorção material?"
   - Input: excerpt de resultado de ferramenta, excerpt de resposta
   - Output: probabilidade que o número é citado acuratamente
   - Threshold de confiança: 0.85 (números são objetivos; "aproximadamente" ou "sobre" muda o semântico)

**Por que não usar Jev para QLT-05, QLT-06, REL-02?** Essas são perguntas code-over-trace. Regex ou parsing simples dá certeza. Um modelo dá probabilidade. Para uma gate que falha o turno, certeza vence.

**Por que não usar Jev para REL-04, REL-05?** REL-04 é parse determinístico (os parâmetros aparecem na resposta?). REL-05 requer oracle de identidade (esses dados são deste usuário?). Código é mais rápido e defensível.

**Constraints de Jev:**
- Uma pergunta por chamada. Avaliar várias à vez causa o modelo a conflitar (Miehling et al., EMNLP Findings 2024).
- Nenhuma rationale de texto-livre. Quando um turno pontua mal, leia seus próprios critérios para debug. Qualquer coisa customer-facing ainda precisa modelo generativo no topo.
- Context rot. Acurácia cai conforme input state preenche com material irrelevante. Pare o input para claim específico sendo checado.
- Não consegue abstain. Jev padrão para a resposta menos errada se forçado em binário. Forneça opção "não consegue dizer" se seu domínio tem casos genuinamente ambíguos, e envie essa banda para humanos.

## Implementação: Uma Abordagem Faseada

### Fase 1: Construir o Tier Determinístico (Semana 1–2)

1. Instrumente seu engine Golang para fazer log de chamadas de ferramentas com argumentos, status e resultados.
2. Implemente validação de schema em tempo de execução de ferramentas (ranges numéricos, formatos de data).
3. Construa um extrator de trace que cria registros de turno estruturados: input do usuário, parâmetros, chamadas de ferramentas, resposta.
4. Code os predicados determinísticos: QLT-05, QLT-06, REL-02, REL-04.
5. Teste contra 50 turnos rotulados manualmente de produção. Aim para >95% concordância (esses são lógica, não julgamento).

### Fase 2: Calibrar Avaliadores Humanos (Semana 3–4)

1. Injete 100–150 falhas em um set seeded.
2. Tenha especialistas rotulem o set completo (ground truth).
3. Tenha avaliadores leigos rotularem questões Relation e Quantity apenas.
4. Meça recall e especificidade por avaliador. Re-brief se enviesado.
5. Deploys para produção com amostras semanais.

### Fase 3: Adicionar Decisões Jev (Semana 5)

1. Configure acesso Jev (waitlist, OpenRouter, ou Vercel AI Gateway).
2. Chame Jev para REL-03, QTY-01, QLT-07 com os três thresholds (0.75, 0.80, 0.85).
3. Log confiança de Jev. Envie turnos mid-band (0.5–threshold) para revisão humana.
4. Meça recall de Jev e false-alert rate contra rótulos especialistas.
5. Ajuste thresholds baseado em feedback de produção.

### Fase 4: Iterar e Calibrar (Contínuo)

- Execute amostras semanais de 50 turnos: tier determinístico (código), avaliadores humanos (leigo + especialista), Jev (automatizado).
- Meça correlação entre os três. Identifique desalinhamento sistemático (e.g., "Jev sinaliza 20% de turnos; humanos aceitam 95%").
- Re-calibre instruções de avaliador ou thresholds de Jev mensalmente.

## Limites e Decisões Abertas

**Não resolvido aqui:**

- **QLT-09 (verdade per profile).** Se a resposta é verdadeira para um usuário específico requer ground truth que você pode não ter. Se usuário A e usuário B têm níveis de acesso diferentes e veem dados diferentes, a resposta é "verdadeira"? Isso requer oracle per profile (Fase 2).
- **REL-05 (identity binding).** Requer seu sistema de identidade mapear usuários para domínios de dados confiávelmente. Se seu sistema conflita roles ou níveis de acesso, esse predicado falhará mesmo se seu eval é sólido. Audit sua camada de identidade primeiro.
- **Variabilidade de avaliador leigo.** Shankar et al. mostram que avaliadores driftam. Cheks de calibração mensal são um piso, não teto. Orçamento para re-briefing ou reposição.
- **Context rot de Jev.** Acurácia cai se input state é longo. Trimming do input para o claim específico ajuda, mas pode bater parede em traces muito longos. Teste antes de deployar em escala.

**Parâmetros abertos:**

- **ε (tolerância para number matching).** Se a ferramenta retorna R$ 1.234,56 e a resposta diz "R$ 1.235", é violação? Defina sua tolerância upfront (0%, 1%, 5%).
- **θ1 (similaridade de reformulação).** Se um usuário reformula sua pergunta ("Mostre-me receita Q3" → "E Q3?"), é novo contexto ou mesma pergunta? Isso afeta REL-03 e REL-04 scoring. Use similaridade semântica (cosine em embeddings) com threshold; teste contra seu domínio primeiro.
- **Budget split (leigo vs. especialista).** Se você tem 1000 turnos para rotular por mês, split 800 leigo + 200 especialista, ou 500/500? Depende sua taxa de injeção de falha e fadiga de avaliador. Comece 80/20; ajuste mensalmente.
- **Sample strategy.** Cada turno, ou amostra aleatória semanal? Evals contínuos custam mais mas capturam drift mais rápido. Sampling é mais barato mas risco perder falhas sistemáticas. Híbrido: daily tier determinístico (código, sem custo), weekly sampling para humanos.

**Quando declarar sucesso:**

Você tem uma camada de eval semântica funcional quando:
1. Seus predicados determinísticos (código) alcançam >95% recall em falhas injetadas.
2. Seus avaliadores leigos (humanos) concordam com especialistas em Relation em >80% (Cohen's kappa ≥ 0.70).
3. Seu classificador Jev concorda com especialistas em REL-03 em >75%.
4. Um turno sinalizado por qualquer dos três correlaciona com reclamações reais de produção (rastreado via feedback de usuário).

## Referências

**Grice e máximas conversacionais:**
- Grice, H. P. (1975). "Logic and Conversation." *Syntax and Semantics*, Vol. 3, pp. 41–58.
- Krause, S., & Vossen, G. (2024). "Grice in the time of LLMs: A survey of conversational maxims in natural language processing." *Proceedings of INLG*, 2024.
- Khayrallah, H., & Sedoc, J. (2021). "The power and limitations of unsupervised neural abstractive summarization." *Proceedings of NAACL*.
- Setlur, V., & Tory, M. (2022). "Towards design patterns for ambiguity resolution in analytical chatbots." *Proceedings of CHI*.

**LLM-as-judge e frameworks Gricean:**
- Miehling, D., Shao, R., Zhao, Y., et al. (2024). "How LLMs conflate sub-maxims: The cost of principle aggregation in multi-criteria judgment." *EMNLP Findings*.
- Zhou, Y., Frank, M., & Sap, M. (2025). "Graders should cheat: Using privileged information in LLM evaluation." *Proceedings of EMNLP*.
- Zhi-Xuan, T., et al. (2025). "Gricean Norms as a Basis for Effective Collaboration." *Proceedings of AAMAS 2025*.

**Calibração humana:**
- Shankar, S., Halpern, Y., Breck, E., et al. (2024). "EvalGen: Towards human-aligned automatic rubric generation." *Proceedings of UIST*.
- Lee, M., Tao, Y., & Dreyer, M. (2026). "Bias correction in LLM-as-a-judge via sensitivity and specificity." *arXiv:2511.21140*.

**Evals práticos em escala:**
- Langfuse. (2026). "Using TypeSafe's Jev for evals." Blog post. https://langfuse.com/blog/2026-09-18-using-typesafes-jev-for-evals.md
- Arize AI. (2026). "Can decision models replace LLM judges?" Blog post. https://arize.com/blog/typesafe-jev-llm-judge/

**Qualidade de dados e logging de ferramentas:**
- Goodstart Labs. (2026). "Verification is the bottleneck." Research report. https://goodstartlabs.com/research/verification-is-the-bottleneck

---

**Próximos passos:**

Este framework é designado para times com uma camada de ferramentas limpa e uma superfície semântica clara para avaliar. Se você está construindo essa camada agora, a seção Premissas Verificadas é seu checklist. Se você já tem uma, comece com Fase 1 (tier determinístico) e meça de lá.

Dúvidas sobre essa abordagem? Chegue. A camada de eval é onde design encontra dados; deveria ser tão intencional quanto o interface mesmo.
