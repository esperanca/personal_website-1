---
layout: layouts/post.njk
title: "Do conteúdo à compreensão: desenhando agentes confiáveis"
metaTitle: "Do conteúdo à compreensão: desenhando agentes confiáveis"
metaDesc: "sobre design de conteúdo, semântica, contexto e integridade em sistemas agênticos"
date: 2026-09-16T19:44:58-03:00
draft: true
eleventyExcludeFromCollections: true
topics:
  - ia
  - design de conteúdo
  - agentes
  - confiança
---
Status: *Draft. Última atualização: 15 de setembro de 2026, 22:30.*

Na parede do meu escritório, coleciono post-its com princípios de design.  Alguns vêm dos lugares onde trabalhei. Outros, de referências que continuam organizando meu jeito de pensar. Em um desses post-its, escrevi os princípios de design do Itaú: simples, relevante, confiável e memorável. Simples e confiável estão sublinhados por um motivo pessoal. Estes dois princípios me chamam a atenção pela tensão natural que trazem, principalmente para quem trabalha com serviços financeiros.

Um outro post-it na minha parede fala sobre essa tensão e traz uma solução. É um dos princípios de design de serviço do GDS (Government Digital Service)  [^1]:

> *do the right things to make things simple*


É algo que carrego para sempre, principalmente porque pude entender isso em primeira pessoa quando estive lá durante a pandemia. A maneira como eles usaram design de conteúdo aplicando esse princípio, para explicar coisas super difíceis e num momento bastante difícil me inspira até hoje.

Fazer as coisas certas para simplificar é entender que  design não elimina a complexidade de um sistema como um todo. É decidir como lidar com a complexidade sem transferi-la para quem usa. Julia Pupolin resume bem isso em um artigo do Itaú Design sobre problemas complexos:

> “Reduzir complexidade é um ato de cuidado com o usuário — e com os próprios times que mantêm o sistema.”[^2]

Esse desafio é muito familiar para mim, e tem aparecido com frequência no trabalho dos times de design do Inteligência Itaú, que desenham experiências conversacionais para clientes e itubers. Meu time, especificamente, está focado em desenhar sistemas agênticos.

Quando falo em sistemas agênticos, estou falando de experiências digitais que usam IA para interpretar uma solicitação, buscar informações, tomar decisões de encaminhamento e realizar ações. Muitas vezes, a interface visível é uma conversa. Por trás dela, podem existir diferentes agentes, ferramentas e serviços trabalhando juntos. Para o cliente, isso aparece no nosso app hoje por meio do ia.i, wealth assistant e outros.

Em um campo de texto cabe praticamente qualquer pergunta. A promessa das interfaces conversacionais mudou de tamanho, principalmente com a adoção em massa de assistentes de AI.  As pessoas passaram a esperar mais: respostas melhores, ajuda para decidir, planejar e até arealização de tarefas de forma autonoma. A popularidade do conceito co-piloto diz muito sobre essa mudança[^3]

E isso também já está mudando a forma como as pessoas buscam produtos e serviços financeiros. Elas podem começar por uma pergunta, uma necessidade ou uma situação sem saber exatamente qual produto resolve aquilo. A experiência precisa entender o que a pessoa está tentando fazer, qual é o contexto pessoal dela e recomendar um caminho a partir daí.

Na conversa, tudo isso precisa funcionar como um único serviço. Há um trabalho de design de conteúdo e design conversacional quase invisível para que isso aconteça. Um exemplo:

> Qual é o meu limite?

A pergunta cabe em quatro palavras. Em um banco, porém, “limite” pode apontar para coisas diferentes: cartão, crédito, cheque especial, Pix. E mesmo dentro de um desses contextos, ainda pode haver diferença entre o valor total (limite total do cartão) e o que está disponível para usar em uma compra agora.

Nas interfaces gráficas, telas, rótulos, menus e etapas ajudam a restringir o significado. A pessoa já está em algum lugar do serviço, olhando para determinado contexto. Na conversa, boa parte dessas pistas desaparece. O agente precisa entender a que conceito a pessoa se refere antes de decidir que informação consultar.

## Nomear e conectar

Em serviços financeiros, “limite” não pertence a apenas uma categoria de produto. É um conceito que se relaciona com compra, fatura, pagamento e disponibilidade.

Por isso, não basta ter uma lista de termos. O sistema precisa saber que nomes existem, onde eles aparecem e como se relacionam.

Uma taxonomia ajuda a organizar esses nomes em categorias e hierarquias. Uma ontologia vai além: torna explícitas as relações entre os conceitos de um domínio.

No caso do cartão de crédito:

- limite total é o valor máximo concedido;
- limite disponível é a parte que ainda pode ser usada;
- uma compra compromete parte desse valor;
- o pagamento da fatura pode recompô-lo.

“Limite”, “compra”, “fatura” e “pagamento” não são termos independentes. O sentido de um depende, em parte, da relação com os outros.

Esse tipo de estrutura ajuda a preservar diferenças importantes. Mas saber exatamente o que é “limite disponível” ainda não nos diz se determinado valor se aplica à situação diante do agente.

## Uma informação correta pode não se aplicar

Imagine que o limite total de um cartão seja de R$ 10 mil e R$ 8 mil já estejam comprometidos.

Se o agente responde “Seu limite é de R$ 10 mil”, o dado está correto. A pessoa talvez esteja querendo saber se consegue fazer uma compra.

Nesse caso, o que importa são os R$ 2 mil disponíveis.

O agente pode perguntar:

> Você quer saber seu limite total ou o disponível para compras?

Ou, quando o contexto permitir:

> Você tem R$ 2 mil disponíveis dos seus R$ 10 mil de limite total.

É uma diferença pequena na linguagem, mas importante para a compreensão.

Mesmo depois de resolver essa diferença, ainda precisamos saber de qual cartão estamos falando, para qual pessoa e quando aquele valor foi consultado.

Significado e contexto começam a se separar.

Semântica é o que ajuda o sistema a entender **o que aquilo significa**.

Contexto é o que mostra **quando, onde e para quem aquilo vale**.

“Limite disponível” pode estar perfeitamente definido como conceito. O valor associado a ele só faz sentido dentro de determinadas condições.

A mesma coisa acontece com tarifas, critérios de elegibilidade e regras de produto. Uma informação pode estar correta em um contexto e errada em outro.

No meu time, brincamos sempre com o fato que nosso trabalho é na maioria das vezes desambiguar.

## Estrutura também é conteúdo

Considere uma regra escrita assim:

> Clientes de determinado segmento têm direito a um benefício específico a partir de determinada data, exceto quando...

Uma pessoa talvez consiga interpretar tudo isso no parágrafo. Para um agente, faz diferença reconhecer separadamente o segmento, o benefício, a vigência e a exceção.

Não porque tudo precise virar campo ou tabela. Mas porque algumas partes da informação precisam continuar identificáveis quando o conteúdo é recuperado, combinado ou reutilizado.

Esse trabalho já existe em content design, em taxonomias, metadata, modelos e arquiteturas de conteúdo. Sistemas agênticos apenas deixam a importância disso mais evidente.

Passamos a desenhar o que alguém vai ler e o caminho para que aquela informação seja encontrada, reconhecida e usada no momento certo.

## Integridade depende de continuidade

Frederick Brooks chamou de **integridade conceitual** a coerência produzida por um conjunto consistente de ideias de design.[^4]

Rahel Anne Bailie propõe o **Content Integrity Model** para pensar a integridade do conteúdo em quatro dimensões: estratégica, editorial, operacional e de infraestrutura. O modelo ajuda a olhar para a capacidade de preservar a qualidade do conteúdo enquanto ele é planejado, escrito, estruturado, reutilizado, distribuído e mantido.[^5]

As duas ideias apontam para uma preocupação parecida: o que precisa permanecer consistente quando a experiência se desdobra no tempo, atravessa sistemas e depende de diferentes fontes de informação.

Para agentes, isso é central.

Se a pessoa perguntou pelo limite disponível, o agente não deveria voltar a tratá-lo como limite total alguns turnos depois.

O mesmo vale quando a conversa avança:

> Pague minha fatura.
>
> Só 3 mil.
>
> Pode fazer.

Para executar essa sequência corretamente, o agente precisa manter o significado entre os turnos. “Só 3 mil” continua relacionado ao pagamento da fatura. “Pode fazer” autoriza aquela ação específica.

Coerência na conversa parece simples, mas é um desafio informacional interessante, que depende de proveniência da informação.

## De onde veio essa informação?

Uma resposta pode combinar coisas de naturezas muito diferentes: um dado consultado no sistema de contas, uma regra de produto, uma política, um conteúdo de ajuda ou algo que a própria pessoa disse alguns turnos antes.

Na interface, tudo aparece como conversa. Para o serviço, essas informações não são equivalentes.

A origem, ou proveniencia, ajuda a entender de onde uma informação veio. Quando ela é recuperada para compor uma resposta,como pode ser usada, quando precisa ser atualizada e qual fonte tem autoridade sobre ela.[^6]

## Quando a realidade muda

Conteúdo não permanece correto sozinho.

Produtos mudam. Regras, taxas e critérios também.

Quando isso acontece, atualizar uma página pode não resolver o problema. A mudança precisa chegar aos outros lugares que dependem daquela informação.

É aí que a manutenção do conteúdo passa a fazer parte da sua qualidade. Se uma regra foi alterada na fonte de referência e o agente continua usando a versão anterior, temos um problema mesmo que a frase apresentada à pessoa seja clara e bem escrita.

## A conversa é só a superfície

Em experiências agênticas, isso fica ainda mais evidente. A conversa que aparece para a pessoa é só a superfície. Antes disso, existe um trabalho de organizar significado, contexto, origem, validade e circulação da informação.

Esse trabalho não cabe inteiro em uma disciplina.

Arquitetura da informação, engenharia de software, ciência de dados, produto, designers, risco e compliance e especialistas em cada domínio atuam juntos para fazer com que o agente entenda corretamente uma pergunta, recupere a informação adequada e use no contexto certo. A resposta não é só texto, ela carrega muitas decisòes.

Design de conteúdo nunca foi apenas sobre escrever. E é uma disciplina cada vez mais importante quando as pessoas usuárias passam grande parte do tempo interagindo em um capo de texto.

A pergunta deixa de ser só “qual mensagem aparece na tela?”. Passa também por entender o que a pessoa está tentando entender, que termos podem ser ambíguos, que diferenças não podem desaparecer, que contexto muda o sentido da resposta e que informação o sistema precisa recuperar para ajudar alguém a decidir ou agir.

Em agentes, content design se aproxima da arquitetura da informação porque a qualidade da conversa depende da qualidade das estruturas que a sustentam.

O trabalho é ajudar a desenhar as condições para que a informação possa ser encontrada, compreendida, recuperada e usada sem perder o significado.


---

## Notas

[^1]: Government Digital Service. *Government Design Principles*. Princípio: “Do the hard work to make it simple”.

[^2]: Pupolin, Julia. “6 aprendizados do curso no MIT para resolver problemas complexos”. *Itaú Design Team*, Medium, 8 ago. 2025. Disponível em: https://medium.com/itaudesign/6-aprendizados-do-curso-no-mit-para-resolver-problemas-complexos-923ac7e5df85

[^3]: Kantar Profiles. *Connecting with the AI Consumer*. Community Report, julho de 2025.

[^4]: Brooks, Frederick P. *The Mythical Man-Month: Essays on Software Engineering*. Referência ao conceito de “conceptual integrity”.

[^5]: Bailie, Rahel Anne. *The Content Integrity Model*. *Content Seriously*, 2026. O modelo organiza a integridade do conteúdo nas dimensões estratégica, editorial, operacional e de infraestrutura.

[^6]: World Wide Web Consortium (W3C). *PROV-DM: The PROV Data Model*. Referência ao conceito de *provenance* como informação sobre entidades, atividades e pessoas envolvidas na produção ou entrega de dados, usada para avaliar qualidade, confiabilidade e uso.

## Referências bibliográficas

BAILIE, Rahel Anne. *The Content Integrity Model*. *Content Seriously*, 2026.

BROOKS, Frederick P. *The Mythical Man-Month: Essays on Software Engineering*. Boston: Addison-Wesley, 1975.

GOVERNMENT DIGITAL SERVICE. *Government Design Principles*. Government Digital Service, GOV.UK.

KANTAR PROFILES. *Connecting with the AI Consumer*. Community Report, jul. 2025.

PUPOLIN, Julia. “6 aprendizados do curso no MIT para resolver problemas complexos”. *Itaú Design Team*, Medium, 8 ago. 2025.

WORLD WIDE WEB CONSORTIUM. *PROV-DM: The PROV Data Model*. W3C Recommendation, 2013.
