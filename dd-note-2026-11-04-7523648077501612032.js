DD.add({
post:{id:"7523648077501612032",date:"2026-11-04",olang:"en",text:`A common challenge in analytics projects appears when a business question requires combining datasets that describe the same process from different perspectives and at different levels of granularity.
For example:
- Table A tracks the stages a product goes through during an operational process.
- Table B tracks the work time logged by operators on that product.
At first glance, the mapping looks straightforward. In practice, edge cases often emerge:
- several work records can relate to the same process stage,
- a work record can span longer than the stage itself,
- the same stage can occur multiple times for the same product.
The result is that a seemingly simple relationship can lead to duplicated or missing metrics depending on the assumptions made during modeling.
An important lesson is that these situations are rarely visible from the schema alone. They often appear only after reviewing multiple real examples and validating the results with business users.
In many cases, business stakeholders are the first to spot these inconsistencies because they understand the operational process better than the data model. Their feedback is often what reveals the exceptions to the "happy path" initially envisioned.
This is why data validation should not focus only on aggregates, but also on detailed samples and concrete business scenarios.
Quite often, what looks like a SQL issue is actually a granularity issue.
The data may be correct. The challenge is making sure the model represents the real process accurately enough to answer the business question.
#DataEngineering #AnalyticsEngineering #DataModeling #BusinessIntelligence #DataGovernance`},
concepts:{
  bizval:{en:"Business validation",zh:"业务验证",fr:"Validation métier"}
},
figl:{grainmix:{
  en:["Illustrative timeline · one product","Table A","stages","Table B","work time","Stage 1","Stage 2","Stage 1 again","① several work records in one stage","② one work record runs past its stage","③ the same stage occurs twice for the product","Join on product + stage: hours duplicated or missing, depending on the assumption"],
  zh:["示意时间线 · 同一个产品","表 A","工序阶段","表 B","工时记录","阶段 1","阶段 2","再次进入阶段 1","① 同一阶段对应多条工时记录","② 一条工时记录超出了阶段的时间范围","③ 同一个产品多次经过同一阶段","按「产品 + 阶段」关联：取决于建模假设，工时会被重复或遗漏"],
  fr:["Chronologie illustrative · un produit","Table A","étapes","Table B","temps saisi","Étape 1","Étape 2","Étape 1 à nouveau","① plusieurs saisies de temps pour une même étape","② une saisie dure plus longtemps que son étape","③ la même étape revient deux fois pour le produit","Jointure produit + étape : heures doublées ou perdues selon l'hypothèse retenue"]}},
fig:{grainmix:L=>{
  const x0=120;let b="";
  b+=T(640,12,L[0],"f-s-sm","end");
  b+=T(0,40,L[1],"f-t")+T(0,56,L[2],"f-s-sm");
  b+=T(0,96,L[3],"f-t")+T(0,112,L[4],"f-s-sm");
  [[x0,140,L[5],"f-soft"],[270,150,L[6],"f-soft"],[430,170,L[7],"f-accsoft"]].forEach(([x,w,s,c])=>{b+=R(x,24,w,36,c)+T(x+w/2,47,s,"f-t-sm","middle");});
  [[130,58,"f-row"],[198,56,"f-row"],[280,175,"f-warn"],[465,80,"f-row"]].forEach(([x,w,c])=>{b+=R(x,86,w,22,c,4);});
  b+=Ln(420,64,420,118,"f-bad",false);
  b+=T(194,130,"①","f-acc-t","middle")+T(445,130,"②","f-warn-t","middle")+T(515,130,"③","f-acc-t","middle");
  b+=T(0,156,L[8],"f-s")+T(0,174,L[9],"f-s")+T(0,192,L[10],"f-s");
  b+=T(0,218,L[11],"f-warn-t");
  return svgWrap(640,228,b);}},
note:{domain:"modeling",also:["business"],fig:"grainmix",stack:["SQL","Data modeling","BI"],concepts:["grain","fanout","bizval"],
en:{title:"When a SQL problem is really a granularity problem",
 tldr:"Two tables describing the same process at different levels of detail look easy to join. Edge cases in the real process make metrics duplicate or disappear, and they show up in real examples and business feedback, not in the schema.",
 context:"A business question required combining two datasets about the same operational process: one tracks the stages a product goes through, the other tracks the work time operators log on that product.",
 problem:"The mapping looked simple, but the real process has exceptions: several work records can belong to one stage, a work record can last longer than the stage itself, and the same stage can occur several times for the same product. Depending on the modeling assumptions, the same relationship produces duplicated or missing metrics, and none of this is visible from the schema alone.",
 approach:["Before joining, state the grain of each table and how one row of one relates to rows of the other.","Review several real examples end to end to find the cases that break the “happy path”.","Validate the results with business users, who know the operational process better than the data model and often spot the inconsistencies first.","Validate on detailed samples and concrete business scenarios, not only on aggregates."],
 principles:[["Check the grain first","What looks like a SQL issue is often a granularity issue."],["The schema hides the exceptions","Edge cases appear in real data and real scenarios, not in table definitions."],["Model the real process","The data may be correct; the model has to represent the process accurately enough to answer the question."]]},
zh:{title:"看似是 SQL 问题，其实是粒度问题",
 tldr:"两张表从不同角度、以不同粒度描述同一个流程，看起来很容易关联。但真实流程里的特殊情况会让指标重复或丢失，而这些情况只有在真实样例和业务反馈中才会暴露，光看表结构是看不出来的。",
 context:"一个业务问题需要把描述同一运营流程的两份数据结合起来：一张表记录产品经过的各个工序阶段，另一张表记录操作员在该产品上登记的工时。",
 problem:"映射关系看起来很简单，但实际流程中有不少例外：一个阶段可能对应多条工时记录，一条工时记录可能比阶段本身持续得更久，同一个产品还可能多次经过同一阶段。根据建模时的不同假设，同样的关联会算出重复或缺失的指标，而这一切单看表结构都发现不了。",
 approach:["关联之前，先明确每张表的粒度，以及一张表的一行和另一张表的行之间是什么关系。","完整地走查几个真实样例，找出打破「理想路径」的情况。","和业务用户一起验证结果：他们比数据模型更了解实际流程，往往最先发现不一致。","不只验证汇总数，也要验证明细样本和具体的业务场景。"],
 principles:[["先看粒度","看起来像 SQL 的问题，很多时候其实是粒度问题。"],["表结构看不出例外","特殊情况出现在真实数据和真实场景里，而不是表定义里。"],["让模型贴近真实流程","数据本身可能没错，关键是模型要足够准确地反映流程，才能回答业务问题。"]]},
fr:{title:"Quand un problème SQL est en fait un problème de granularité",
 tldr:"Deux tables qui décrivent le même processus à des niveaux de détail différents semblent faciles à joindre. Les cas particuliers du processus réel font doubler ou disparaître les métriques, et ils se révèlent dans les exemples réels et les retours métier, pas dans le schéma.",
 context:"Une question métier demandait de croiser deux jeux de données sur le même processus opérationnel : l'un suit les étapes par lesquelles passe un produit, l'autre le temps de travail saisi par les opérateurs sur ce produit.",
 problem:"La correspondance paraissait simple, mais le processus réel a ses exceptions : plusieurs saisies de temps peuvent relever d'une même étape, une saisie peut durer plus longtemps que l'étape elle-même, et une même étape peut revenir plusieurs fois pour le même produit. Selon les hypothèses de modélisation, la même relation donne des métriques doublées ou manquantes, et rien de cela ne se voit dans le schéma seul.",
 approach:["Avant de joindre, expliciter le grain de chaque table et la façon dont une ligne de l'une se rattache aux lignes de l'autre.","Dérouler plusieurs exemples réels de bout en bout pour repérer les cas qui sortent du « chemin idéal ».","Valider les résultats avec les utilisateurs métier : ils connaissent le processus mieux que le modèle de données et repèrent souvent les incohérences en premier.","Valider sur des échantillons détaillés et des scénarios métier concrets, pas seulement sur des agrégats."],
 principles:[["Vérifier le grain d'abord","Ce qui ressemble à un problème SQL est souvent un problème de granularité."],["Le schéma ne montre pas les exceptions","Les cas particuliers apparaissent dans les données et les scénarios réels, pas dans la définition des tables."],["Modéliser le processus réel","Les données peuvent être justes ; le modèle doit représenter le processus assez fidèlement pour répondre à la question."]]}}
});
