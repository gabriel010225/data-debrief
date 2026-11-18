DD.add({
post:{id:"7526917746018828290",date:"2026-11-13",olang:"fr",text:`Quand les données sources ne sont pas d’accord avec elles-mêmes... ou est-ce le cas ?  
Récemment, je suis tombé sur ce qui semblait être un problème de qualité des données évident. Une table source contenait trois champs : start_date, end_date, durée L’hypothèse semblait évidente :  
durée = end_date - start_date
Un utilisateur professionnel a alors repéré plusieurs enregistrements dont la durée stockée ne correspondait pas à la différence entre les horodatages. Ma première réaction a été simple : supposer que la durée était incorrecte. Recalculer à partir de start_date et end_date. Demander à l’équipe en amont de corriger le champ source. Techniquement, cela semblait être une victoire facile.  
Avant de changer quoi que ce soit, j’ai vérifié auprès des développeurs responsables de l’application opérationnelle. Leur réponse a complètement changé l’histoire. Les opérateurs peuvent travailler sur plusieurs produits simultanément. Lorsque les activités se chevauchent, le système réaffecte le temps de travail proportionnellement entre les tâches simultanées.  
En conséquence :  
Durée ≠end_date - start_date 
La valeur stockée n’était pas fausse. Il s’agissait d’appliquer une règle métier qui n’était pas visible dans le schéma. La partie intéressante n’était pas la question de la qualité des données en elle-même, mais le processus d’investigation : ce champ est erroné — > Reconstruisons-le nous-mêmes — > Que mesure exactement ce champ ?  
Une leçon à tirer de cette expérience : lorsqu’un champ dérivé semble incorrect, ne supposez pas immédiatement que les données sont erronées. Un autre exemple : les cas limites sont rarement découverts uniquement à partir des schémas. Ils émergent généralement après avoir examiné de réels échantillons de données, discuté de cas inhabituels avec des utilisateurs métier, et validé des hypothèses avec des développeurs ou des experts du sujet. Très souvent, les utilisateurs métier sont les premiers à repérer ces situations car ils comprennent mieux le processus opérationnel réel que le modèle de données.  
Parfois, le problème ne vient pas des données.  
Parfois, le problème réside dans l’hypothèse derrière l’analyse.
#DataEngineering #AnalyticsEngineering #DataQuality #DataModeling #SemanticLayer #BusinessIntelligence`},
concepts:{
  derived:{en:"Derived fields",zh:"派生字段",fr:"Champs dérivés"}
},
figl:{overlap:{
  en:["Illustrative · one operator, two products at once","Product A","Product B","10:00","11:00","12:00","overlap: time split 50 / 50","end − start","stored duration","A: 2 h","A: 1.5 h","B: 1 h","B: 0.5 h","Stored ≠ end − start, and it is correct:","the business rule lives in the application, not in the schema"],
  zh:["示意 · 一名操作员同时处理两个产品","产品 A","产品 B","10:00","11:00","12:00","重叠时段：工时按 50 / 50 分摊","结束 − 开始","存储的时长","A：2 小时","A：1.5 小时","B：1 小时","B：0.5 小时","存储值 ≠ 结束 − 开始，但它是对的：","业务规则在应用程序里，不在表结构里"],
  fr:["Illustratif · un opérateur, deux produits en même temps","Produit A","Produit B","10:00","11:00","12:00","chevauchement : temps réparti 50 / 50","fin − début","durée stockée","A : 2 h","A : 1,5 h","B : 1 h","B : 0,5 h","Durée stockée ≠ fin − début, et elle est juste :","la règle métier vit dans l'application, pas dans le schéma"]}},
fig:{overlap:L=>{
  let b="";
  b+=T(0,12,L[0],"f-s-sm");
  [[120,L[3]],[320,L[4]],[520,L[5]]].forEach(([x,s])=>{b+=T(x,34,s,"f-mono","middle");});
  b+=T(0,61,L[1],"f-t")+T(0,97,L[2],"f-t");
  b+=R(120,44,400,26,"f-soft")+R(320,80,200,26,"f-soft");
  b+=Ln(320,40,320,112,"f-bad",false)+Ln(520,40,520,112,"f-bad",false);
  b+=T(420,128,L[6],"f-warn-t","middle");
  b+=T(120,158,L[7],"f-s")+T(320,158,L[8],"f-s-acc");
  b+=T(120,178,L[9],"f-mono-ink")+T(320,178,L[10],"f-mono-ink");
  b+=T(120,196,L[11],"f-mono-ink")+T(320,196,L[12],"f-mono-ink");
  b+=T(0,226,L[13],"f-acc-t")+T(0,244,L[14],"f-acc-t");
  return svgWrap(640,254,b);}},
note:{domain:"modeling",also:["business"],fig:"overlap",stack:["Source systems","Data quality","Business rules"],concepts:["derived","bizval","bizcontext"],
en:{title:"When a field looks wrong, first ask what it measures",
 tldr:"A stored duration did not match end_date − start_date and looked like an easy data quality fix. The developers of the source application explained why: when operators work on several products at once, the time is split between them. The value was right; the assumption was wrong.",
 context:"A source table had three fields: start_date, end_date and a duration. The obvious assumption was duration = end_date − start_date. A business user then spotted several records where the stored duration did not match the gap between the two timestamps.",
 problem:"The first reflex was to treat the duration as wrong: recompute it from the timestamps and ask the upstream team to fix the source field. It looked like an easy win. But operators can work on several products at the same time, and when activities overlap the application reallocates work time proportionally between the simultaneous tasks. The stored value applied a business rule that was not visible in the schema.",
 approach:["Before changing anything, check with the developers who own the operational application how the field is produced.","Change the question: from “this field is wrong, let's rebuild it ourselves” to “what exactly does this field measure?”","When a derived field looks wrong, do not assume the data is wrong; test the assumption behind the calculation first.","Look for edge cases in real data samples, in unusual cases discussed with business users and in assumptions validated with developers or subject-matter experts, not in the schema alone."],
 principles:[["Question the assumption, not only the data","Sometimes the problem is not the data but the hypothesis behind the analysis."],["Derived fields can carry business rules","A value that differs from the obvious formula may be applying a rule the schema does not show."],["Ask the people who know the process","Business users often spot these cases first, and the source application's developers can explain them."]]},
zh:{title:"字段看起来不对时，先问它到底在衡量什么",
 tldr:"存储的时长和 end_date − start_date 对不上，看起来是一个很好修的数据质量问题。源系统的开发人员给出了解释：操作员同时处理多个产品时，工时会在这些任务之间分摊。数值没错，错的是假设。",
 context:"一张源表有三个字段：start_date、end_date 和时长。最直观的假设是：时长 = end_date − start_date。后来一位业务用户发现，有好几条记录的存储时长和两个时间戳之差并不一致。",
 problem:"第一反应是认定时长字段有误：用两个时间戳重新计算，再让上游团队修正源字段。看起来轻松就能解决。但操作员可以同时处理多个产品，当活动时间重叠时，系统会把工时按比例分摊到同时进行的任务上。存储的值其实执行了一条业务规则，而这条规则在表结构里根本看不出来。",
 approach:["动手修改之前，先找负责这套业务系统的开发人员，确认这个字段是怎么生成的。","换一个问题：从「这个字段错了，我们自己重算」变成「这个字段到底在衡量什么？」","派生字段看起来不对时，不要马上认定数据有错，先检验计算背后的假设。","特殊情况要到真实数据样本里找，和业务用户讨论不寻常的案例，并和开发人员或领域专家核实假设，而不是只看表结构。"],
 principles:[["质疑假设，而不只是质疑数据","有时候问题不在数据，而在分析背后的假设。"],["派生字段可能藏着业务规则","和直观公式对不上的值，可能正在执行一条表结构里看不到的规则。"],["去问懂流程的人","业务用户往往最先发现这些情况，而源系统的开发人员能解释原因。"]]},
fr:{title:"Quand un champ semble faux, demander d'abord ce qu'il mesure",
 tldr:"Une durée stockée ne correspondait pas à end_date − start_date et ressemblait à un problème de qualité facile à corriger. Les développeurs de l'application source ont donné l'explication : quand les opérateurs travaillent sur plusieurs produits à la fois, le temps est réparti entre eux. La valeur était juste ; c'est l'hypothèse qui était fausse.",
 context:"Une table source contenait trois champs : start_date, end_date et une durée. L'hypothèse évidente : durée = end_date − start_date. Un utilisateur métier a ensuite repéré plusieurs enregistrements dont la durée stockée ne correspondait pas à l'écart entre les deux horodatages.",
 problem:"Le premier réflexe a été de considérer la durée comme fausse : la recalculer à partir des horodatages et demander à l'équipe amont de corriger le champ source. Une victoire facile, en apparence. Mais les opérateurs peuvent travailler sur plusieurs produits en même temps, et quand les activités se chevauchent, l'application réaffecte le temps de travail proportionnellement entre les tâches simultanées. La valeur stockée appliquait une règle métier invisible dans le schéma.",
 approach:["Avant de modifier quoi que ce soit, vérifier auprès des développeurs de l'application opérationnelle comment le champ est produit.","Changer de question : passer de « ce champ est faux, reconstruisons-le » à « que mesure exactement ce champ ? »","Quand un champ dérivé semble incorrect, ne pas supposer que la donnée est fausse ; tester d'abord l'hypothèse derrière le calcul.","Chercher les cas limites dans de vrais échantillons, dans les cas inhabituels discutés avec les métiers et dans les hypothèses validées avec les développeurs ou les experts, pas seulement dans le schéma."],
 principles:[["Questionner l'hypothèse, pas seulement la donnée","Parfois, le problème ne vient pas des données mais de l'hypothèse derrière l'analyse."],["Un champ dérivé peut porter une règle métier","Une valeur qui s'écarte de la formule évidente applique peut-être une règle que le schéma ne montre pas."],["Interroger ceux qui connaissent le processus","Les utilisateurs métier repèrent souvent ces cas en premier, et les développeurs de l'application source savent les expliquer."]]}}
});
