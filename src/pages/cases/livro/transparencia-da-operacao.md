---
layout: livro
title: "Transparência"
subtitle: "Os 6 objetos que tornam legível o que está acontecendo"
collection: "Capítulo"
version: ""
date: 2026-09-16
contact: "danieliscoding@gmail.com"
preface: "@danielsouza"
permalink: /cases/livro/transparencia-da-operacao/
eleventyExcludeFromCollections: false
---

## Introdução

Transparência é o grau em que a interface torna legível, no momento da interação, o que está acontecendo. Que sistema é este? O que ele pode fazer? Que informações está usando? Sob quais restrições? Está apenas respondendo ou agindo? Quem mantém o controle? Quem responde pelas consequências?

O foco deste texto não é a abertura completa do modelo nem a exposição de um suposto raciocínio interno. Esses são outros problemas, igualmente importantes. O recorte aqui é a transparência da operação: aquilo que o sistema mostra sobre si mesmo enquanto interpreta, recomenda e age.

Essa escolha não pressupõe que exista uma única forma de transparência. Kathleen Creel distingue transparência do algoritmo, de sua implementação em código e de sua execução concreta. Jenna Burrell, por outro caminho, descreve opacidades produzidas por segredo deliberado, falta de conhecimento técnico e pela própria escala e complexidade dos sistemas de aprendizado de máquina.[^1] As duas contribuições ajudam a evitar a ideia de que "abrir a caixa" resolveria, sozinho, todos os problemas.

Mike Ananny e Kate Crawford vão além. Para eles, a transparência pode produzir a ilusão de que ver um sistema equivale a conhecê-lo ou governá-lo. A exposição de informação não garante que alguém consiga compreender a rede sociotécnica, questionar uma decisão ou atribuir responsabilidade.[^2]

Em outras palavras: mostrar não basta.

O NIST segue uma direção compatível ao afirmar que transparência significativa depende de oferecer níveis adequados de informação, ajustados ao papel e ao conhecimento das pessoas envolvidas. O mesmo documento lembra que um sistema transparente não é necessariamente preciso, seguro, justo ou protegido em termos de privacidade.[^3]

Por isso, transparência não deveria ser tratada como volume de informação. Ela é uma relação entre acesso, contexto e poder de ação. Sempre exige quatro perguntas:

- transparência para quem;
- sobre o quê;
- com qual finalidade;
- em qual situação.

Uma pessoa que recebe uma recomendação financeira precisa de informações diferentes das exigidas por quem audita o sistema. Um operador precisa monitorar desempenho e exceções. Um cliente precisa entender o suficiente para decidir, recusar ou contestar. O conteúdo muda porque a relação muda.

## Transparência não é tudo

Transparência, explicabilidade, verificabilidade e compreensibilidade se apoiam, mas não são sinônimos.

- **Transparência** mostra o sistema e suas condições de operação.
- **Explicabilidade** trata das razões apresentadas para um resultado ou comportamento específico.
- **Verificabilidade** permite conferir se a afirmação ou ação está sustentada por evidências.
- **Compreensibilidade** indica se determinada pessoa recebeu informação suficiente para entender, decidir, agir ou contestar.

A diferença pode ser expressa por quatro perguntas:

> O que está acontecendo?  
> Por que isso aconteceu neste caso?  
> Como posso conferir?  
> Entendo o suficiente para decidir o que fazer?

A opacidade nem sempre decorre da ausência de informação. Uma interface pode apresentar termos técnicos, documentos extensos e percentuais e continuar inacessível para quem precisa tomar uma decisão. A informação está disponível, mas não se transformou em conhecimento utilizável.

Na pesquisa sobre explicações em IA, Nicholas Asher, Soumya Paul e Chris Russell usam a expressão **epistemicamente acessível** para descrever uma explicação que seres humanos conseguem apreender. Os autores também mostram a tensão envolvida: simplificar pode tornar a explicação acessível, mas sua parcialidade pode esconder fatores relevantes ou injustos.[^4] Neste texto, a expressão funciona como uma lente: tornar algo visível não significa, por si só, torná-lo disponível como conhecimento confiável.

Transparência cria as condições e compreensibilidade mostra se elas funcionaram para aquela pessoa.

## Seis objetos da transparência operacional

Em interfaces generativas e agênticas, a transparência pode ser organizada em torno de seis objetos. Eles não constituem uma taxonomia normativa. São uma síntese de design, informada por pesquisa em interação humano–IA, por referências regulatórias e por bibliotecas contemporâneas de padrões, como *The Shape of AI*.[^5]

| Objeto | O que precisa se tornar visível | Pergunta principal |
|---|---|---|
| **Identidade** | Natureza, papel e representação do sistema | Que sistema é este e em nome de quem atua? |
| **Capacidade e limites** | Funções, desempenho esperado e condições de falha | O que pode e não pode fazer nesta situação? |
| **Contexto e dados** | Informações, memória, documentos e inferências utilizados | Com quais informações está trabalhando? |
| **Configuração e escopo** | Parâmetros, fontes, restrições e fronteiras da tarefa | Dentro de quais limites está operando? |
| **Autonomia e controle** | Permissões, aprovações e possibilidades de intervenção | O que pode fazer sem mim? |
| **Evidência e responsabilização** | Fontes, rastros, resultados, incerteza e responsáveis | Como conferir o que aconteceu e quem responde? |

Esses objetos não precisam aparecer juntos. A transparência pode ser progressiva e proporcional ao risco. Quanto maior a capacidade de produzir efeitos, mais explícitas devem ser as condições de operação.

## Identidade

O primeiro objeto é a identidade.

O sistema precisa deixar claro que a pessoa está interagindo com uma IA. O artigo 50 do AI Act europeu prevê essa informação para sistemas destinados a interagir diretamente com pessoas, salvo quando isso for óbvio no contexto.[^6] Para o design, porém, reconhecer a presença da IA é apenas o começo.

A interface também precisa mostrar **que tipo de sistema está presente e qual papel ele exerce naquele momento**.

Um assistente conversacional responde, orienta e ajuda a pessoa a decidir. Um agente pode avançar: planejar etapas, acionar ferramentas, acessar outros sistemas e produzir efeitos fora da conversa. Essa é uma distinção funcional usada neste texto, não uma classificação técnica universal. O ponto é tornar legível a diferença entre falar e agir.

A identidade precisa revelar três aspectos:

1. **Natureza do sistema**  
   Ele atua como assistente, agente, recomendador, executor, mediador, representante ou monitor?

2. **Escopo de atuação**  
   Pode responder, sugerir, preparar, executar, acompanhar, alterar, comprar ou enviar?

3. **Relação com o usuário**  
   Está ajudando a pessoa a decidir, participando da decisão ou agindo em seu nome?

Esses aspectos alteram o risco da interação e os controles necessários. Um nome ou selo de IA não basta quando o modo de operação pode mudar durante a tarefa. O mesmo sistema pode responder em um momento, preparar uma ação no seguinte e solicitar autorização para executá-la depois.

Badges como "Posso analisar arquivos" ajudam a tornar capacidades visíveis. Indicadores como "Requer aprovação" mostram limites de autonomia. Mensagens como "Estou redirecionando você para Maria, do Atendimento" esclarecem quando a responsabilidade operacional passa da máquina para uma pessoa.

Bibliotecas de padrões como *The Shape of AI* reúnem identificadores visuais — nome, avatar, cor e iconografia — e mecanismos de *disclosure* para marcar conteúdo ou interações mediados por IA.[^7] Esses componentes ajudam, mas não resolvem o problema sozinhos. Uma identidade visual reconhecível não informa necessariamente o que o sistema pode fazer.

A pergunta mais útil é:

> Que sistema é este, o que pode fazer e quem está no controle?

Quanto mais autonomia o sistema recebe, mais explícita precisa ser sua identidade. Não porque a interface deva dramatizar a presença da IA, mas porque a pessoa precisa entender que tipo de poder está prestes a delegar.

## Capacidade e limites

Uma interface transparente não deveria apenas anunciar capacidades. Deveria mostrar também as condições sob as quais elas funcionam.

"Posso analisar documentos" diz pouco. Que documentos? Para qual finalidade? O sistema consegue extrair informações, comparar versões ou interpretar cláusulas? Reconhece quando uma página está ilegível? Sua análise pode fundamentar uma decisão ou precisa ser revisada?

A pesquisa de Amershi e colegas sobre interação humano–IA coloca duas recomendações logo no início: tornar claro o que o sistema pode fazer e quão bem consegue fazê-lo. A distinção importa. Possuir uma função não significa executá-la com a mesma confiabilidade em todas as condições.[^8]

A interface deveria tornar visíveis ao menos quatro classes de limite:

1. **Funcional** — pode preparar uma transferência, mas não enviá-la; pode gerar um documento, mas não assiná-lo.
2. **Epistêmico** — não possui informação suficiente, atualizada ou confiável para responder.
3. **Operacional** — conhece a ação, mas não tem a ferramenta, integração ou permissão necessária.
4. **Situacional** — a função existe, mas encontra restrições em contas conjuntas, valores elevados, operações internacionais ou situações que exigem revisão humana.

Esses limites não deveriam aparecer apenas depois da falha. Uma mensagem como "Não consigo fazer isso" chega tarde quando a pessoa já forneceu dados, investiu tempo ou delegou uma decisão.

Uma formulação mais transparente seria:

> Posso preparar a ordem de transferência e verificar os campos obrigatórios. Não posso enviá-la sem sua aprovação.

Ela informa capacidade, limite e condição. É diferente de uma promessa genérica como "Posso ajudar com transferências".

Também é preciso distinguir **não poder**, **não ter permissão** e **não ter confiança suficiente**:

- "Não tenho acesso a essa conta."
- "Esta operação exige a aprovação do outro titular."
- "Não encontrei informação suficiente para confirmar o beneficiário."

As três situações interrompem a ação, mas sugerem próximos passos diferentes. Sem a distinção, todo limite parece uma recusa arbitrária.

O artigo 13 do AI Act europeu segue lógica semelhante para sistemas de alto risco ao exigir informações claras sobre finalidade, capacidades, limitações de desempenho, precisão esperada e circunstâncias conhecidas que podem afetar o funcionamento.[^9] A regra é específica a seu contexto regulatório, mas sustenta um princípio útil para o design: capacidade sem condição de uso é uma promessa incompleta.

Capacidades geram expectativas. Limites organizam essas expectativas. Uma interface que anuncia apenas o que a IA pode fazer está apresentando uma demonstração de produto, não uma representação honesta do sistema.

## Contexto e dados

Todo sistema generativo responde a partir de algum contexto. A pergunta é se a pessoa consegue perceber qual.

Esse contexto pode incluir o texto da conversa, documentos anexados, dados de uma conta, memória de interações anteriores, instruções da organização, resultados de ferramentas e informações recuperadas de fontes externas.

Quando esses elementos permanecem invisíveis, o sistema apresenta conclusões sem mostrar as premissas que as condicionaram.

> Que informações este sistema está usando para produzir este resultado?

A transparência de contexto não exige apresentar cada detalhe técnico. Também não significa publicar instruções confidenciais ou toda a arquitetura do produto. Significa tornar visíveis os elementos que podem mudar a interpretação, a decisão ou o risco.

Uma recomendação financeira pode utilizar:

- dados declarados pelo cliente;
- histórico de transações;
- perfil de risco registrado pela instituição;
- documentos anexados naquela interação;
- memória de conversas anteriores;
- políticas e critérios internos;
- informações de mercado;
- inferências produzidas pelo sistema.

Essas fontes não têm o mesmo estatuto. Uma preferência declarada é diferente de uma preferência inferida. Um saldo consultado em tempo real é diferente de um documento enviado meses atrás. Uma regra institucional é diferente de uma sugestão gerada pelo modelo.

A interface precisa ajudar a distinguir origem, atualidade, finalidade, abrangência e persistência dos dados:

> Considerei sua carteira atual, o perfil de risco aprovado em 12 de março e os objetivos informados nesta conversa. Não usei informações das suas outras contas.

Essa mensagem ainda não explica por que determinada recomendação foi feita. Ela torna visível o contexto que a condicionou.

Memória exige cuidado particular. Amershi e colegas distinguem memória de curto prazo — usada para dar continuidade à interação — do aprendizado de preferências ao longo do tempo. Também recomendam controles globais sobre o que o sistema monitora e como se comporta.[^10]

Uma preferência lembrada pode ser conveniente, mas também pode estar desatualizada ou fora de contexto:

> Você mencionou anteriormente que prefere investimentos de baixo risco. Deseja que eu use essa informação nesta análise?

A memória deixa de ser uma função invisível. Passa a ser algo que a pessoa pode reconhecer, corrigir, limitar ou descartar.

Hipóteses e conflitos também precisam ser visíveis. Sistemas generativos podem completar lacunas com inferências plausíveis. Para quem recebe a resposta, porém, pode ser difícil distinguir o que foi encontrado do que foi presumido.

> Não encontrei a data de vencimento no documento. Antes de continuar, preciso que você confirme esse dado.

Da mesma forma, se dois documentos apresentam valores diferentes, escolher silenciosamente uma versão produz opacidade. Fatos confirmados, inferências, suposições e dados ausentes não deveriam receber o mesmo tratamento visual.

O contexto é a matéria-prima da decisão. Se permanece invisível, a interface mostra o resultado enquanto esconde suas premissas.

## Configuração e escopo

Se capacidade descreve o universo de possibilidades, configuração e escopo definem qual parte desse universo está ativa naquela interação.

Um agente pode ter acesso a milhares de documentos, várias contas e diferentes ferramentas. Isso não significa que deveria usar tudo. Seu comportamento precisa ser delimitado por uma tarefa, um conjunto de dados, um período, uma política e um nível de autoridade.

O escopo responde:

> Dentro de quais fronteiras este sistema está trabalhando?

Essas fronteiras podem definir:

- documentos e fontes permitidos;
- contas ou carteiras incluídas;
- período analisado;
- ferramentas disponíveis;
- pessoas que podem ser contatadas;
- ações proibidas;
- critérios de interrupção;
- decisões que exigem revisão humana.

"Analise meus investimentos" é um escopo amplo. Uma configuração mais explícita seria:

> Analise apenas a carteira de longo prazo, usando as posições consolidadas em 18 de julho. Não considere a conta conjunta. Compare o resultado com o perfil de risco aprovado e não execute alterações.

Nesse caso, a configuração deixa de ser detalhe técnico. Torna-se uma especificação provisória do comportamento esperado.

O NIST recomenda documentar o escopo de aplicação a partir da capacidade do sistema, do contexto estabelecido e da categoria de uso.[^11] Na interface, isso significa mostrar as restrições que alteram materialmente o resultado — sobretudo fontes, período, permissões e critérios relevantes.

Defaults silenciosos são uma forma comum de opacidade. O sistema escolhe um período, uma fonte ou um critério e apresenta o resultado como se a escolha fosse inevitável.

"Encontrei três oportunidades" parece neutro. Talvez, porém, o sistema tenha considerado apenas produtos da própria instituição, excluído investimentos sem liquidez diária ou usado um perfil de risco desatualizado.

> Considerei apenas produtos desta instituição, com liquidez em até 30 dias e risco compatível com o seu perfil atual.

A pessoa não precisa conhecer todos os parâmetros. Precisa conhecer as escolhas que moldaram o resultado.

Mudanças de escopo também não deveriam acontecer silenciosamente. Se o agente começou analisando uma carteira e depois pretende consultar e-mails, documentos externos ou dados de outra conta, deve informar a ampliação e, quando necessário, pedir nova autorização.

Mais controles não significam mais transparência. Um painel com dezenas de parâmetros pode apenas transferir a complexidade para o usuário. O objetivo é tornar visíveis as fronteiras relevantes e as consequências de alterá-las.

## Autonomia e controle

Autonomia descreve quanto o sistema pode avançar sem intervenção humana. Controle descreve a capacidade real de orientar, restringir, interromper, revisar ou desfazer esse avanço.

As duas coisas precisam ser projetadas juntas.

Um sistema pode informar, recomendar, preparar uma ação, executá-la depois de uma aprovação ou agir sozinho dentro de limites predefinidos. Cada nível produz efeitos diferentes.

| Nível de atuação | Comportamento | Controle esperado |
|---|---|---|
| **Informar** | Responde e apresenta informações | Pedir fontes, corrigir ou reformular |
| **Recomendar** | Compara opções e sugere um caminho | Aceitar, rejeitar ou explorar alternativas |
| **Preparar** | Preenche dados, gera documentos ou monta uma ação | Revisar e editar antes da execução |
| **Executar com aprovação** | Realiza a ação após confirmação | Visualizar efeitos e autorizar |
| **Executar dentro de limites** | Age sozinho dentro de regras acordadas | Acompanhar, interromper e alterar limites |
| **Gerir por exceção** | Conduz o processo e escala situações anormais | Revisar exceções, auditar e revogar a delegação |

Essa escala é analítica. Não precisa aparecer literalmente na interface. O modo atual, porém, precisa estar claro.

Verbos vagos como "cuidar", "resolver" ou "gerenciar" escondem diferenças importantes. "Vou ajudar a preparar o pagamento" é diferente de "Vou realizar o pagamento". A linguagem precisa dizer se o sistema vai analisar, sugerir, preparar, enviar, alterar ou executar.

Antes da ação, a pessoa precisa conhecer objetivo, plano, ferramentas, dados acessados, limites e pontos de aprovação:

> Permitir que o agente consulte os pagamentos dos últimos 90 dias e prepare uma proposta de conciliação. Ele não poderá enviar mensagens nem realizar pagamentos sem aprovação.

Durante a execução, a interface precisa mostrar estado, progresso, próxima etapa, desvios e dependências:

> Analisei 24 transações e encontrei três divergências. Agora vou preparar os documentos de conciliação. Nenhum pagamento será realizado nesta etapa.

Se o plano mudar materialmente, a autorização original precisa ser reconsiderada. A autonomia concedida para uma tarefa não deveria se expandir silenciosamente.

O artigo 14 do AI Act europeu exige que a supervisão de sistemas de alto risco seja proporcional ao risco, ao nível de autonomia e ao contexto. Também afirma que as pessoas responsáveis pela supervisão devem compreender capacidades e limitações, monitorar o funcionamento e estar aptas a intervir.[^12] O perfil de IA generativa do NIST reforça que diferentes usos podem exigir diferentes configurações entre humanos e IA, além de revisão, documentação e acompanhamento adicionais.[^13]

Ter uma pessoa "no circuito" não garante controle significativo. Uma aprovação pode ser cerimonial quando a interface oferece informação insuficiente, pressiona por uma resposta rápida ou não permite modificar a ação proposta.

Uma aprovação real mostra o que será feito, com quais dados, quais efeitos são esperados, que incertezas permanecem e se a ação pode ser desfeita.

> O pagamento de €2.400 foi preparado, mas exige a aprovação dos dois titulares. Leili ainda não aprovou. Nenhum valor foi transferido.

A segunda aprovação não é falha do agente. É parte do comportamento esperado.

Depois da execução, controle significa poder confirmar, corrigir, cancelar, desfazer, contestar ou revogar a autonomia concedida. "Concluído" diz pouco quando a ação produz efeitos fora da conversa.

Nem toda etapa precisa de confirmação. Pedir aprovação para tudo gera fadiga e transforma controle em burocracia. A intervenção deve acompanhar risco, reversibilidade e impacto. O objetivo não é manter alguém clicando em "confirmar". É preservar a capacidade de perceber, decidir e intervir quando isso importa.

Autonomia sem transparência vira perda de controle. Controle sem poder de intervenção vira decoração de interface.

## Evidência e responsabilização

Uma resposta pode parecer razoável sem estar correta. Pode ser clara e convincente sem ter sustentação.

Por isso, transparência não termina no resultado. A interface precisa oferecer elementos que permitam reconstruir o que aconteceu:

- informações e fontes utilizadas;
- regras ou políticas aplicadas;
- ferramentas acionadas;
- ações realizadas;
- resultados produzidos;
- incertezas e pendências;
- pessoas ou instituições responsáveis pela revisão.

Isso não exige publicar um raciocínio interno. Exige um **rastro operacional**: fatos, escolhas, ferramentas e efeitos que possam ser observados e conferidos.

> Reunião agendada para terça-feira, às 10h, com Ana e Roberto. O convite foi enviado pelo calendário corporativo. A sala ainda não foi reservada.

O registro é mais útil do que "Pronto, cuidei disso". Mostra ação, resultado e pendência.

A evidência cumpre três funções:

1. **Verificação** — permite conferir se a resposta ou ação corresponde aos dados, às regras e à intenção original.
2. **Contestação** — permite apontar uma fonte incorreta, uma premissa inadequada ou uma ação indevida.
3. **Reconstrução** — permite compreender posteriormente o que ocorreu quando diferentes sistemas, pessoas e ferramentas participaram do processo.

O artigo 12 do AI Act europeu exige que sistemas de alto risco permitam o registro automático de eventos relevantes para rastreabilidade e monitoramento.[^14] O perfil de IA generativa do NIST também trata proveniência como registro da origem e do histórico de dados e conteúdos.[^15] Essas referências sustentam a importância dos rastros, mas não determinam como devem aparecer para o usuário.

Logs técnicos podem ser adequados para engenharia, auditoria ou supervisão e continuar inacessíveis para quem recebeu a decisão. Rastreabilidade interna não equivale automaticamente a transparência de interface. O rastro precisa ser traduzido para o papel de quem deve decidir, revisar ou contestar.

Evidência, sozinha, também não resolve o problema. Fontes e logs não dizem necessariamente quem tem autoridade para corrigir o resultado.

> Quem pode revisar, corrigir ou reparar esta ação?

"Foi uma decisão da IA" não é uma resposta suficiente. A responsabilidade permanece ligada às pessoas e instituições que definiram as regras, disponibilizaram as ferramentas e autorizaram o uso do sistema.

O caso *Moffatt v. Air Canada*, decidido em 2024 pelo Civil Resolution Tribunal da Colúmbia Britânica, tornou essa questão concreta. Um chatbot no site da companhia forneceu informação incorreta sobre tarifas de luto. A empresa argumentou, entre outras coisas, que não deveria responder pela informação do chatbot. O tribunal rejeitou a separação: o chatbot era parte do site da empresa, que continuava responsável pelas informações ali oferecidas.[^16]

O caso não cria uma regra universal para todos os agentes ou jurisdições. Mostra algo mais simples: incorporar uma IA ao serviço não apaga a responsabilidade institucional.

Em serviços financeiros, a interface deveria tornar visível:

- em nome de qual instituição o agente atua;
- qual política sustenta uma restrição;
- quem supervisiona a ação;
- como solicitar revisão humana;
- como corrigir ou desfazer uma operação;
- onde registrar uma contestação;
- quem responde quando algo dá errado.

Responsabilização não é apenas oferecer um link para atendimento. É construir um caminho de revisão com autoridade real para intervir.

Uma explicação sem evidência pode ser apenas uma narrativa convincente. Uma evidência sem responsável é um rastro abandonado.

## Mostrar o que importa

Transparência não é a tentativa de mostrar tudo. Sistemas complexos possuem mais dados, estados, regras e relações do que qualquer interface seria capaz de apresentar de uma vez.

O trabalho de design está na seleção.

É preciso mostrar o que muda a decisão, o que altera o risco, o que delimita a delegação e o que permite contestar o resultado. Em alguns momentos, isso será um badge. Em outros, um resumo do contexto, um plano de ação, um pedido de aprovação, uma fonte ou um caminho para revisão humana.

Os seis objetos ajudam a organizar essa seleção:

- identidade mostra com quem estamos lidando;
- capacidade e limites organizam expectativas;
- contexto e dados revelam as premissas;
- configuração e escopo delimitam a tarefa;
- autonomia e controle preservam intervenção;
- evidência e responsabilização permitem conferir e responder pelas consequências.

Transparência não produz confiança automaticamente. Ela produz algo anterior: condições para que a confiança seja examinada.

Sem essas condições, a interface pode continuar fluida. Pode até parecer inteligente.

Mas a pessoa ainda estará no escuro.

---

## Nota de apuração regulatória

Este texto usa o AI Act da União Europeia como referência comparativa, não como afirmação de obrigação jurídica aplicável a todo produto ou território. No Brasil, o PL 2.338/2023 continuava em tramitação na Câmara dos Deputados em 19 de julho de 2026, aguardando parecer na comissão especial. Por isso, o projeto não foi apresentado aqui como lei vigente.[^17]

## Referências

[^1]: CREEL, Kathleen A. [*Transparency in Complex Computational Systems*](https://doi.org/10.1086/709729). *Philosophy of Science*, v. 87, n. 4, p. 568–589, 2020; BURRELL, Jenna. [*How the Machine "Thinks": Understanding Opacity in Machine Learning Algorithms*](https://doi.org/10.1177/2053951715622512). *Big Data & Society*, 2016.

[^2]: ANANNY, Mike; CRAWFORD, Kate. [*Seeing without knowing: Limitations of the transparency ideal and its application to algorithmic accountability*](https://doi.org/10.1177/1461444816676645). *New Media & Society*, v. 20, n. 3, p. 973–989, 2018.

[^3]: NATIONAL INSTITUTE OF STANDARDS AND TECHNOLOGY. [*Artificial Intelligence Risk Management Framework (AI RMF 1.0)*](https://doi.org/10.6028/NIST.AI.100-1). NIST AI 100-1, 2023, seção 3.4.

[^4]: ASHER, Nicholas; PAUL, Soumya; RUSSELL, Chris. [*Adequate and Fair Explanations*](https://arxiv.org/abs/2001.07578). 2020, rev. 2021.

[^5]: CAMPBELL, Emily. [*The Shape of AI: UX Patterns for Artificial Intelligence Design*](https://www.shapeof.ai/). 2025. Trata-se de uma biblioteca de padrões de design, não de uma taxonomia acadêmica ou regulatória validada.

[^6]: UNIÃO EUROPEIA. [Regulamento (UE) 2024/1689 — Artificial Intelligence Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng), artigo 50(1).

[^7]: CAMPBELL, Emily. [*Identifiers*](https://www.shapeof.ai/pattern-types/identifiers) e [*Trust builders*](https://www.shapeof.ai/pattern-types/trust-builders). *The Shape of AI*, 2025.

[^8]: AMERSHI, Saleema et al. [*Guidelines for Human-AI Interaction*](https://doi.org/10.1145/3290605.3300233). *Proceedings of CHI 2019*. Diretrizes G1 e G2.

[^9]: UNIÃO EUROPEIA. [Regulamento (UE) 2024/1689 — Artificial Intelligence Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng), artigo 13.

[^10]: AMERSHI, Saleema et al. [*Guidelines for Human-AI Interaction*](https://doi.org/10.1145/3290605.3300233). Diretrizes G12, G13 e G17.

[^11]: NATIONAL INSTITUTE OF STANDARDS AND TECHNOLOGY. [*AI RMF 1.0*](https://doi.org/10.6028/NIST.AI.100-1), subcategoria MAP 3.3.

[^12]: UNIÃO EUROPEIA. [Regulamento (UE) 2024/1689 — Artificial Intelligence Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng), artigo 14.

[^13]: NATIONAL INSTITUTE OF STANDARDS AND TECHNOLOGY. [*Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile*](https://doi.org/10.6028/NIST.AI.600-1). NIST AI 600-1, 2024.

[^14]: UNIÃO EUROPEIA. [Regulamento (UE) 2024/1689 — Artificial Intelligence Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng), artigo 12.

[^15]: NATIONAL INSTITUTE OF STANDARDS AND TECHNOLOGY. [*Generative Artificial Intelligence Profile*](https://doi.org/10.6028/NIST.AI.600-1), apêndice A.1.6, 2024.

[^16]: [*Moffatt v. Air Canada*, 2024 BCCRT 149](https://canlii.ca/t/k2spq). Os parágrafos 27 e 28 também estão reproduzidos no [CanLII Blog](https://blog.canlii.org/2024/03/07/whats-hot-on-canlii-%F0%9F%94%A5-february-2024/). O Civil Resolution Tribunal é um tribunal administrativo; a decisão não deve ser descrita como precedente judicial universal.

[^17]: CÂMARA DOS DEPUTADOS. [PL 2.338/2023 — ficha de tramitação](https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262). Consulta em 19 jul. 2026.

---

<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--gray-2);">
  <a href="/cases/livro/prefacio/" style="text-decoration: none; font-weight: 700;">← Anterior: Prefácio</a>
  <span></span>
</div>
