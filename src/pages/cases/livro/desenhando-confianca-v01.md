---
layout: livro
title: "Desenhando Confiança"
subtitle: "Design, agentes de IA e verificabilidade em serviços financeiros"
collection: "Prévia consolidada"
version: ""
date: 2026-07-04
contact: "danieliscoding@gmail.com"
preface: "@danielsouza"
permalink: /cases/livro/
tableOfContents:
  - { id: "prefacio", title: "Prefácio — Design e Qualidade" }
  - { id: "capitulo-1", title: "Capítulo 1 — Confiável ou só convincente?" }
  - { id: "transparencia", title: "Transparência" }
  - { id: "explicabilidade", title: "Explicabilidade" }
  - { id: "verificabilidade", title: "Verificabilidade" }
  - { id: "compreensibilidade", title: "Compreensibilidade" }
---

## Prefácio

### Design e Qualidade

Design e qualidade sempre estiveram ligados. Mas definir qualidade em design nunca foi fácil.

Durante décadas, a qualidade mais visível esteve na superfície. Interface bem composta, hierarquia clara, composição, contraste. Para muita gente, design ainda significa "fazer ficar bonito". A camada final que facilita o entendimento e o desejo de usar algo melhorando estética e comunicação.

Mas a disciplina sempre ambicinou mais do que isso. 

A interação humano-computador trouxe critérios mais profundos. Usabilidade. Acessibilidade. Prevenção de erro. Feedback. Consistência. A qualidade deixou de ser apenas visual e passou a ser medida pelo que a pessoa conseguia fazer: a clareza da ação, a redução do atrito, a capacidade de um sistema responder de forma previsível e segura.

Com o amadurecimento dos produtos digitais, a régua se moveu de novo. Não bastava desenhar telas eficientes. Era preciso desenhar jornadas coerentes, experiências íntegras, relações contínuas entre canais e momentos. A qualidade deixou de depender da beleza isolada de uma interface e passou a depender da coesão do sistema.

Agora, com sistemas generativos e agênticos, estamos diante de outro deslocamento.

O designer deixa de atuar apenas sobre a superfície visível. Passa a influenciar sistemas que interpretam contexto, produzem linguagem, tomam decisões e executam ações em nome das pessoas. A interface importa, mas é insuficiente. O comportamento do sistema vira material de design.

Isso reescreve a pergunta.

Não basta perguntar se a experiência é clara ou acessível. É preciso perguntar se o sistema é transparente sobre como opera. Se suas decisões são explicáveis. Se seu comportamento é verificável. Se seus limites são compreensíveis. E, no fim, se a pessoa entende o que está acontecendo e quem responde quando algo falha.

A qualidade em design deixa de ser propriedade da experiência percebida. Passa a ser propriedade do sistema em funcionamento.

---

## Capítulo 1

### Confiável ou só convincente?

Existe um momento em que uma tecnologia disruptiva deixa de ser novidade para entusiastas e passa a fazer parte do cotidiano de todo mundo: estranha o suficiente para assustar, próxima demais para ignorar[^1]. Interfaces conversacionais chegaram assim.

Em novembro de 2022, Jake Moffatt entrou no site da Air Canada com uma pergunta prática: se ele comprasse passagens de última hora para o velório de sua avó, poderia pedir o desconto de tarifa de luto[^2] depois de voltar? Antes de gastar dinheiro, ele quis confirmar as regras. Perguntou ao chatbot e fez uma captura de tela com a resposta. A resposta confirmava que o reembolso poderia ser solicitado depois da viagem. Ele comprou as passagens. Voltou. Pediu o reembolso. Semanas depois, a Air Canada recusou.

Moffatt não deixou por isso mesmo. Nos meses seguintes, trocou e-mails com a companhia, recebeu respostas negativas e decidiu levar o caso ao Civil Resolution Tribunal da British Columbia[^3]. Em fevereiro de 2024, o tribunal condenou a Air Canada a pagar a diferença e registrou algo além da condenação: não havia razão para Moffatt saber que uma parte do site era mais confiável do que outra. A empresa não explicou por que a página de tarifas de luto deveria ser considerada mais autoritativa do que o chatbot.

A falha documentada no processo não foi ausência de informação. O site tinha informação. O que faltava eram qualidades que a resposta não entregou.

O chatbot da Air Canada era convencional. No fim daquele mesmo novembro, a OpenAI lançou o ChatGPT. Nos anos seguintes, a IA generativa se tornou a base das interfaces conversacionais: sistemas mais fluidos, mais persuasivos, mais difíceis de checar. O problema que levou Moffatt ao tribunal ficou mais comum, não mais raro.

O caso concentra, de uma vez só, os quatro problemas que este texto vai destrinchar:

- **Transparência:** o chatbot não deixou claro em quais políticas ou informações da empresa estava baseando sua resposta.
- **Explicabilidade:** o chatbot afirmou que o desconto poderia ser solicitado depois da compra, mas não explicou qual regra da empresa sustentava essa conclusão.
- **Verificabilidade:** a resposta não oferecia um link, uma referência ou qualquer forma de confirmar a informação antes da compra.
- **Compreensibilidade:** a resposta era clara e fácil de entender. Justamente por isso, o passageiro confiou nela.

Esses quatro conceitos não são sinônimos nem intercambiáveis, mas camadas complementares na construção da confiança.

## Transparência

Transparência é o grau em que o sistema deixa claro como opera: que dados usa, quais são seus limites, que regras segue, quem responde por ele.

Essa ideia vem da governança pública e da responsabilidade institucional. Foi incorporada às *Ethics Guidelines for Trustworthy AI* da União Europeia e ao *AI Risk Management Framework* do NIST[^4] como princípio central.

> Documentar regras não é a mesma coisa que explicar uma decisão. Um sistema pode parecer transparente e, ainda assim, ser opaco.

Um exemplo comum: "Não foi possível aprovar sua solicitação." A interface encerra a conversa. Não revela quais dados foram usados, se havia algum desatualizado, se houve revisão real ou somente uma resposta automática.

## Explicabilidade

Explicabilidade é a capacidade de um sistema justificar a própria resposta, decisão ou recomendação. Responde a uma pergunta específica: por que isso aconteceu?

O termo ganhou peso com o programa XAI da DARPA[^5], liderado por David Gunning e David Aha, e foi refinado depois por pesquisadores como Tim Miller e por instituições como o NIST.

Um agente explicável não esconde o próprio raciocínio. Mostra os critérios que pesaram na decisão, mesmo que de forma resumida.

## Verificabilidade

Verificabilidade é a possibilidade de checar se uma resposta está correta, sustentada por fontes ou de acordo com critérios definidos. A pergunta que ela responde é direta: isso pode ser confirmado?

Vem de uma linhagem antiga: ciência, auditoria, verificação formal em engenharia de software. Ganhou um capítulo recente com a IA generativa, na pesquisa de Nelson F. Liu, Tianyi Zhang e Percy Liang sobre buscadores que respondem com citação de fonte. Os três auditaram quatro motores de busca generativos e encontraram um padrão revelador: só 51,5% das frases produzidas tinham sustentação completa nas citações.

Quase metade das frases passava o teste de fluência sem passar o teste de sustentação. Verificabilidade é a diferença entre os dois testes: a possibilidade de confrontar uma resposta com uma fonte externa e citável, não apenas com a coerência do próprio sistema.

## Compreensibilidade

Compreensibilidade é a qualidade de uma explicação ser entendida pela pessoa certa, no contexto certo, no nível de detalhe certo. A pergunta muda de novo: o usuário entendeu o suficiente para decidir, agir ou contestar?

Derek Doran, Sarah Schulz e Tarek Besold separam sistemas compreensíveis de sistemas apenas interpretáveis. O interpretável produz uma explicação tecnicamente válida; o compreensível produz uma explicação que a pessoa do outro lado consegue usar. Tim Miller trouxe as ciências sociais para esse debate, mostrando como humanos processam explicações na prática — não como um sistema deveria, em teoria, produzi-las.

Esse é o termo mais próximo do trabalho de um designer de conteúdo. Uma explicação pode estar tecnicamente correta e ainda causar confusão. O inverso é mais perigoso: uma explicação clara sobre uma informação errada convence com mais eficiência do que uma confusa. Compreensibilidade sem transparência, explicabilidade e verificabilidade não é virtude — é risco.

### Por que isso importa para designers e para quem constrói agentes generativos

Desenhar para confiança significa decidir, em cada interface e em cada resposta, que tipo de confiança o produto está pedindo da pessoa.

O sistema mostra de onde fala? Isso é transparência. Mostra por que respondeu assim? Isso é explicabilidade. Permite conferir se está certo? Isso é verificabilidade. Ajuda a pessoa entender o suficiente para agir? Isso é compreensibilidade.

Quando uma interface de IA não responde a essas perguntas, ela ainda pode soar clara, útil e segura. Esse é justamente o problema. A confiança começa quando a resposta deixa de ser apenas convincente e passa a ser confiável.

O trabalho de um designer sempre foi traduzir intenção em comportamento. Com agentes de IA, essa tradução ficou mais complexa.

Este livro propõe um caminho concreto. Ao longo dos capítulos, você vai aprender a escrever critérios que especificam o comportamento de um agente — não diretrizes de tom, mas condições verificáveis: quando declarar premissas, quando pedir confirmação, quando reconhecer incerteza. Vai entender como avaliar um agente antes de confiar nele, usando evals como parte do processo de design, não como pós-produção de engenharia. E vai aprender a reconhecer cada momento em que o agente para, pergunta, limita ou escala como uma decisão de experiência — algo que você pode, e deve, tomar conscientemente.

Ao final, a pergunta que orienta seu trabalho se expande. Deixa de ser apenas "essa experiência é fácil de usar?" e passa a incluir: "essa experiência pode ser compreendida, avaliada e contestada?"

Essa segunda pergunta é o que separa um agente que convence de um agente que merece ser confiado.

## Referências

1. CBC News (2024). Air Canada found liable for chatbot's bad advice on bereavement rates.
2. Gunning, D. & Aha, D. (2019). DARPA's Explainable Artificial Intelligence (XAI) Program. *AI Magazine*.
3. Miller, T. (2019). Explanation in Artificial Intelligence: Insights from the Social Sciences. *Artificial Intelligence*.
4. NIST (2021). Four Principles of Explainable Artificial Intelligence (NISTIR 8312).
5. High-Level Expert Group on AI, Comissão Europeia (2019). Ethics Guidelines for Trustworthy AI.
6. NIST (2023). AI Risk Management Framework (AI RMF 1.0).
7. Liu, N. F., Zhang, T. & Liang, P. (2023). Evaluating Verifiability in Generative Search Engines. *Findings of EMNLP*.
8. Doran, D., Schulz, S. & Besold, T. R. (2017). What Does Explainable AI Really Mean? A New Conceptualization of Perspectives.
9. Moore, G. A. (1991). *Crossing the Chasm*. HarperCollins.
10. Gartner. Gartner Hype Cycle Research Methodology.

[^1]: O Gartner chama esse momento de vale da desilusão: quando o entusiasmo inicial cede à realidade das limitações, e a adoção acontece antes dos critérios para avaliar o que foi adotado.

[^2]: Tarifas de luto (bereavement fares) são descontos que companhias aéreas oferecem a passageiros que precisam viajar com urgência pela morte ou iminência de morte de um familiar próximo. As políticas e requisitos documentais variam por empresa.

[^3]: O Civil Resolution Tribunal (CRT) é um tribunal administrativo online da British Columbia, Canadá, para disputas de pequenas causas. Funciona sem audiências presenciais; suas decisões têm força legal equivalente à de um tribunal convencional.

[^4]: O National Institute of Standards and Technology é uma agência federal americana que desenvolve padrões técnicos e frameworks de gestão de risco.

[^5]: A Defense Advanced Research Projects Agency é a agência de pesquisa avançada do Departamento de Defesa americano. Seu programa XAI (Explainable AI, 2016–2021) financiou boa parte da pesquisa contemporânea sobre explicabilidade — e estabeleceu a distinção entre modelos de alto desempenho e modelos compreensíveis como um problema de design, não só de engenharia.
