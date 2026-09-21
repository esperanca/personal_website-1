---
layout: livro
title: "Transparência"
subtitle: "Os 6 objetos que tornam legível o que está acontecendo"
collection: "Capítulo"
version: "v2-autoral"
date: 2026-09-16
contact: "danieliscoding@gmail.com"
preface: "@danielsouza"
permalink: /cases/livro/transparencia-v2-autoral/
eleventyExcludeFromCollections: true
---

Começamos com um chatbot em Vancouver, em 2022. Jake Moffatt perguntou ao site da Air Canada se podia pedir um desconto de luto após a viagem — a companhia oferecia a política. O chatbot disse que sim, desde que pedisse em até 90 dias. Ele comprou a passagem, fez a viagem, voltou. Pediu o reembolso. A Air Canada recusou.

Nos meses seguintes, Moffatt trocou e-mails. Recebeu negativas. A companhia admitiu: o chatbot tinha usado "palavras enganosas". Mas não pagaria.

Em fevereiro de 2024, um tribunal canadense venceu a empresa. A decisão registrou algo simples e incômodo: **não era óbvio que o tribunal poderia perguntar que sistema era aquele**. Moffatt tinha direito de saber que parte do site era mais confiável. Não sabia.

Esse caso mostra o que queremos nomear aqui: transparência não é volume de informação. Transparência é **o que fica legível no momento em que você interage**. Que sistema é este? O que faz? Que dados usa? Quem controla? Quem responde quando falha?

O foco não é abrir completamente o modelo. Isso é outro debate, igualmente importante. Aqui é mais simples: **o que o sistema mostra sobre si enquanto interpreta, recomenda, age?**

Transparência parece óbvia. Não é. Existem muitas formas dela. E mostrar dados não basta. Uma interface pode publicar logs técnicos, percentuais, arquivos de rastreamento — ficar transparente no sentido literal — e você continuar sem saber o que fazer com a resposta.

Isso porque transparência é uma **relação**. Ela depende de quem está vendo, por quê, e do que pode fazer com a informação.

Sempre exige quatro perguntas:

- transparência para **quem**?
- sobre **o quê**?
- com qual **finalidade**?
- em qual **situação**?

Uma auditora examina logs de sistema. Um cliente recebe uma recomendação. Um operador monitora exceções. Cada um precisa de informações diferentes. A mesma companhia de dados não funciona para três públicos diferentes.

## Quatro elementos que não são sinônimos

Transparência, explicabilidade, verificabilidade e compreensibilidade andam juntas? Raramente.

- **Transparência** mostra o sistema. Suas condições, fontes, limites.
- **Explicabilidade** oferece uma razão. Por que essa resposta, nesse caso.
- **Verificabilidade** deixa você conferir. Se a resposta está sustentada, se os dados são reais.
- **Compreensibilidade** é quando você efetivamente entendeu o suficiente para decidir algo.

Uma interface pode ser transparente — mostrar tudo — e você continuar sem compreender. Uma interface pode ser compreensível para um tipo de pessoa e totalmente fechada para outro.

## Seis objetos

Em interfaces generativas e agênticas, a transparência se organiza em torno de seis coisas que precisam ficar visíveis:

| Objeto | O que precisa estar claro | Pergunta principal |
|---|---|---|
| **Identidade** | Natureza, papel, representação | Que sistema é este e em nome de quem atua? |
| **Capacidade e limites** | O que faz, como faz, onde falha | O que pode e não pode fazer aqui? |
| **Contexto e dados** | Informações, memória, documentos, inferências | Com quais informações está trabalhando? |
| **Configuração e escopo** | Parâmetros, restrições, fronteiras | Dentro de quais limites opera? |
| **Autonomia e controle** | Permissões, aprovações, intervenção | O que pode fazer sem mim? |
| **Evidência e responsabilização** | Fontes, rastros, responsáveis | Como conferir e quem responde? |

## Identidade

Um assistente responde. Um agente age. Essa diferença é importante.

Um assistente conversacional ajuda você a decidir. Ele reúne informação, orienta, sugere caminhos. Você decide. Um agente faz mais: planeja etapas, aciona ferramentas, acessa outras máquinas, produz efeitos fora da conversa. Você delega.

Parecem próximos. Para o risco e o controle, são mundos diferentes.

A identidade precisa revelar três coisas:

1. **Natureza do sistema**  
   Assistente, agente, recomendador, executor?

2. **O que pode fazer**  
   Responde, sugere, prepara uma ação, executa?

3. **Sua relação com você**  
   Ajuda você a decidir, participa da decisão ou age em seu nome?

Um visual, um nome, um badge — nada disso resolve sozinho. O mesmo sistema pode mudar de papel durante uma interação. Começa respondendo. Depois prepara uma ação. Depois pede sua aprovação para executar.

A pergunta mais útil é: "Que sistema é este, o que está prestes a fazer e quem está no controle neste momento?"

Quanto mais autonomia você vai conceder, mais essa pergunta importa.

## Capacidade e limites

"Posso analisar documentos" diz quase nada.

Que documentos? Para que? O sistema consegue extrair informação, comparar versões, interpretar uma cláusula? Reconhece quando uma página está ilegível ou quando faltam dados? Sua análise é suficiente para uma decisão ou precisa ser revisada por uma pessoa?

A interface deveria tornar visíveis pelo menos quatro tipos de limite:

1. **Funcional**  
   Pode preparar, mas não enviar. Gera, mas não assina.

2. **Epistêmico**  
   Não tem informação suficiente, atual ou confiável.

3. **Operacional**  
   Conhece a ação, mas não tem ferramenta, integração ou permissão.

4. **Situacional**  
   A função existe, mas encontra restrições — contas conjuntas, valores altos, contextos que exigem revisão humana.

Esses limites não deveriam aparecer apenas quando falha. Deveriam estar visíveis desde o começo.

"Não consigo fazer isso" chega tarde demais. Você já forneceu dados, investiu tempo, talvez delegou uma decisão.

Melhor: "Posso preparar a ordem e verificar se os campos estão corretos. Não posso enviá-la sem sua aprovação."

Essa frase informa capacidade, limite e condição. É diferente de "Posso ajudar com transferências".

Também é preciso distinguir três coisas diferentes:

- "Não tenho acesso a essa conta."
- "Esta operação exige aprovação do outro titular."
- "Não encontrei informação suficiente para confirmar quem vai receber."

As três interrompem a ação. Mas apontam próximos passos completamente diferentes.

## Contexto e dados

Todo sistema generativo responde a partir de um contexto. A questão é: qual contexto?

Pode ser a conversa que você tem neste momento. Pode ser documentos que você anexou. Dados da sua conta. Memória de conversas antigas. Instruções internas da companhia. Ferramentas que o sistema consultou. Informações que buscou na internet. Inferências que fez porque faltavam dados.

Quando tudo isso permanece invisível, você recebe a conclusão sem as premissas que a geraram.

Tome uma recomendação financeira. Ela pode usar:

- dados que você declarou ("prefiro baixo risco");
- histórico de suas transações;
- perfil de risco que a instituição tem sobre você;
- documentos que você enviou nesta conversa;
- memória de conversas passadas;
- políticas internas da companhia;
- informações de mercado;
- palpites do próprio sistema.

Essas fontes não são iguais. Uma preferência que você declarou é diferente de uma que o sistema inferiu. Um saldo consultado agora é diferente de um documento que você enviou meses atrás. Uma regra que a companhia estabeleceu é diferente de uma sugestão que o modelo criou.

Uma boa resposta seria: "Considerei sua carteira atual, o perfil de risco que você aprovou em 12 de março e os objetivos que você mencionou nesta conversa. Não usei informações das suas outras contas."

Com isso, o contexto fica legível.

Memória exige cuidado particular. Quando o sistema lembra de uma preferência sua, isso é conveniente. Mas pode estar desatualizado, fora de contexto, impertinente.

Melhor perguntar: "Você mencionou antes que prefere investimentos de baixo risco. Eu devo usar essa informação agora?"

Da mesma forma: se dois documentos mostram valores diferentes, o sistema não deveria escolher um silenciosamente. Fatos confirmados, inferências, suposições e dados que faltam não deveriam parecer a mesma coisa visualmente.

## Configuração e escopo

Se capacidade descreve o que é possível, configuração e escopo definem qual parte desse possível está ativa naquele momento.

Um agente pode ter acesso a milhares de documentos, várias contas, dúzias de ferramentas. Isso não quer dizer que deveria usar tudo. Seu comportamento precisa de fronteiras: uma tarefa, um período, uma política, um nível de autoridade.

"Analise meus investimentos" é vago. Mais claro: "Analise apenas a carteira de longo prazo, usando as posições consolidadas de 18 de julho. Não considere a conta conjunta. Não execute alterações."

Defaults silenciosos são forma comum de opacidade. O sistema escolhe um período, uma fonte, um critério e apresenta a resposta como se a escolha fosse óbvia ou neutra.

"Encontrei três oportunidades" pode parecer neutro. Talvez tenha considerado apenas produtos da própria instituição, excluído investimentos sem liquidez diária, ou usado um perfil de risco desatualizado.

Mais honesto: "Considerei apenas produtos desta instituição, com liquidez de até 30 dias, e risco compatível com seu perfil atual."

Mudanças de escopo também não deveriam ser silenciosas. Se o agente começou em uma carteira e depois quer consultar e-mails, documentos externos ou outra conta, deveria avisar e pedir nova autorização.

## Autonomia e controle

Autonomia descreve quanto o sistema pode avançar sem você. Controle descreve sua capacidade real de orientar, parar, reverter, revisar.

Um sistema pode informar, recomendar, preparar uma ação, executá-la após sua aprovação, agir sozinho dentro de limites que você acordou. Cada nível é uma delegação diferente.

| Nível | O sistema faz | Você controla |
|---|---|---|
| **Informar** | Responde e apresenta | Pedir fontes, corrigir, reformular |
| **Recomendar** | Compara opções e sugere | Aceitar, rejeitar, explorar alternativas |
| **Preparar** | Gera documentos, monta uma ação | Revisar e editar antes de executar |
| **Executar com aprovação** | Realiza após sua confirmação | Visualizar e autorizar |
| **Executar dentro de limites** | Age sozinho em regras acordadas | Acompanhar, parar, alterar os limites |

Verbos vagos escondem diferenças importantes. "Vou cuidar do pagamento" pode significar dez coisas. "Vou preparar a ordem de transferência e esperar sua aprovação" deixa claro.

Antes da ação, você precisa saber objetivo, plano, ferramentas, dados acessados, limites e onde você entra para aprovar.

Durante a execução, a interface mostra estado, progresso, próxima etapa, desvios.

Depois, você pode confirmar, corrigir, cancelar, reverter, contestar ou revogar a delegação.

Uma aprovação de verdade mostra o que vai acontecer, com que dados, que efeitos são esperados, que incertezas ficam, se é reversível.

## Evidência e responsabilização

Uma resposta pode parecer razoável, clara, convincente e estar completamente errada.

Por isso, transparência não termina no resultado. Você precisa de rastros: informações e fontes utilizadas, regras aplicadas, ferramentas acionadas, ações realizadas, resultados produzidos, incertezas, pessoas responsáveis.

"Reunião agendada para terça, 10h, com Ana e Roberto. O convite foi enviado via calendário corporativo. A sala ainda não foi reservada" é mais útil do que "Pronto, cuidei disso".

A evidência faz três coisas:

1. **Verificação** — você confere se a resposta corresponde aos dados, às regras e ao que você pediu.
2. **Contestação** — você aponta uma fonte errada, uma premissa inadequada, uma ação indevida.
3. **Reconstrução** — você compreende posteriormente o que aconteceu quando sistemas e pessoas diferentes participaram.

Mas evidência, sozinha, não resolve. Logs e rastros não dizem quem tem poder para corrigir algo.

"Foi uma decisão da IA" não é resposta. A responsabilidade permanece ligada às pessoas e às instituições que definiram as regras, disponibilizaram as ferramentas, autorizaram o uso do sistema.

No caso Moffatt v. Air Canada, um chatbot forneceu informação falsa. A companhia argumentou que não deveria responder pelo chatbot. O tribunal rejeitou: o chatbot era parte do site da empresa. A empresa continuava responsável.

Em um serviço financeiro, a interface deveria deixar claro em nome de qual instituição o agente atua, qual política sustenta uma restrição, quem supervisiona a ação, como você solicita revisão humana, como corrige uma operação, onde contesta algo, quem responde quando dá errado.

---

<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--gray-2);">
  <a href="/cases/livro/prefacio/" style="text-decoration: none; font-weight: 700;">← Anterior: Prefácio</a>
  <span></span>
</div>
