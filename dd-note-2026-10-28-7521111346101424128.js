DD.add({
post:{id:"7521111346101424128",date:"2026-10-28",olang:"en",text:`A small data governance question that turned into a useful reminder
While working on a new data integration, I came across a situation where the source dataset had a higher confidentiality classification than the target environment.
My first reaction was straightforward: if the source is classified as restricted, shouldn’t the target environment be upgraded to the same level? But the discussion highlighted an important distinction: The classification of a dataset does not necessarily mean that every individual data element inside it carries the same level of sensitivity.
A dataset can contain a mix of information: technical characteristics, business-sensitive attributes, identifiers, or potentially personal data. The real question is therefore not only: “What is the classification of the source?” but rather: “What data are we actually consuming, and what risk does that specific data carry?”
This changes the approach quite significantly. Instead of automatically propagating the highest classification through the entire data pipeline, it makes more sense to assess the actual scope of consumption:
Source → Selected data → Transformation → Target → End users
It was a good reminder that data governance is not just about labeling datasets. It is about understanding data lineage, purpose, sensitivity, and exposure throughout the full lifecycle. For data engineers, this also means that governance is not something happening “around” the data platform. It directly influences how we design access, pipelines, semantic layers, and downstream analytics.
A useful question to keep in mind: Are we classifying the container, or are we actually understanding the data inside it?
#DataEngineering #DataGovernance #DataSecurity #DataManagement #AnalyticsEngineering`},
concepts:{
  classification:{en:"Data classification",zh:"数据分级",fr:"Classification des données"}
},
figl:{scope:{
  en:["Source","classified: restricted","Selected data","only the columns used","Transformation","Target","End users","Assess sensitivity here, on what is actually consumed","Not: copy the source label to everything downstream"],
  zh:["源数据","分级：受限","选取的数据","只取用到的字段","转换","目标","最终用户","在这里评估敏感度：看实际消费的数据","而不是：把源头的标签复制到下游所有环节"],
  fr:["Source","classée : restreinte","Données sélectionnées","seulement les colonnes utilisées","Transformation","Cible","Utilisateurs finaux","Évaluer la sensibilité ici, sur ce qui est réellement consommé","Et non : recopier l'étiquette de la source partout en aval"]}},
fig:{scope:L=>{
  const w=128,g=22,items=[[L[0],L[1],"f-warn"],[L[2],L[3],"f-accsoft"],[L[4],"","f-soft"],[L[5],"","f-soft"],[L[6],"","f-soft"]];
  let b="";
  items.forEach(([a,s,c],i)=>{const x=i*(w+g);b+=R(x,30,w,56,c)+T(x+w/2,s?54:63,a,"f-t","middle")+(s?T(x+w/2,73,s,"f-s-sm","middle"):"");if(i<4)b+=Ln(x+w+2,58,x+w+g-2,58);});
  b+=`<path d="M${w+g} 26 L${w+g} 18 L${5*w+4*g} 18 L${5*w+4*g} 26" class="f-acc-line" fill="none"/>`+T((w+g+5*w+4*g)/2,12,L[7],"f-acc-t","middle");
  b+=T(0,112,L[8],"f-warn-t");
  return svgWrap(5*w+4*g,120,b);}},
note:{domain:"platform",also:["business"],fig:"scope",stack:["Data governance","Pipelines","Semantic layer"],concepts:["classification","access","trace"],
en:{title:"Classify the data you consume, not the container it came from",
 tldr:"A restricted source does not automatically make the whole pipeline restricted. Assess sensitivity on the data actually selected and exposed, along the path from source to end users.",
 context:"On a new data integration, the source dataset had a higher confidentiality classification than the target environment.",
 problem:"The first reflex was to upgrade the target to the source's level. But a dataset's classification does not mean every element inside it is equally sensitive: one dataset can mix technical characteristics, business-sensitive attributes, identifiers and possibly personal data. Propagating the highest label everywhere over-restricts the platform without describing the real risk.",
 approach:["Change the question from “what is the classification of the source?” to “what data are we actually consuming, and what risk does that specific data carry?”","Assess the real scope of consumption step by step: source → selected data → transformation → target → end users.","Treat governance as part of the design: it shapes access, pipelines, semantic layers and downstream analytics, rather than sitting around the platform."],
 principles:[["Understand the content, not the label","A classification on a container is a starting point, not a verdict on every field."],["Follow the lineage","Sensitivity and exposure have to be assessed across the full lifecycle of the data."],["Governance is engineering","Access and classification decisions are design decisions for data engineers."]]},
zh:{title:"按实际消费的数据分级，而不是按它来自的「容器」",
 tldr:"源数据是受限级别，并不意味着整条管道都要受限。应当沿着从源头到最终用户的路径，评估真正被选取和暴露的数据有多敏感。",
 context:"在一个新的数据集成项目中，源数据集的保密等级高于目标环境。",
 problem:"第一反应是把目标环境升级到和源头一样的等级。但数据集的分级并不意味着里面每个元素都同样敏感：同一个数据集可能混合了技术特征、业务敏感属性、标识符，甚至个人数据。把最高等级一路传播下去，会过度限制平台，却并没有准确描述真实的风险。",
 approach:["把问题从「源头是什么等级？」换成「我们实际消费了哪些数据？这些数据本身有什么风险？」","沿着消费路径逐段评估：源数据 → 选取的数据 → 转换 → 目标 → 最终用户。","把治理当作设计的一部分：它影响权限、管道、语义层和下游分析，而不是游离在平台之外。"],
 principles:[["理解内容，而不是标签","容器上的分级只是起点，不是对每个字段的结论。"],["顺着数据血缘看","敏感度和暴露程度要在数据的整个生命周期里评估。"],["治理就是工程","权限和分级的决定，本身就是数据工程师的设计决定。"]]},
fr:{title:"Classer la donnée consommée, pas le contenant d'où elle vient",
 tldr:"Une source restreinte ne rend pas automatiquement tout le pipeline restreint. Évaluer la sensibilité sur les données réellement sélectionnées et exposées, de la source jusqu'aux utilisateurs finaux.",
 context:"Sur une nouvelle intégration, le jeu de données source avait une classification de confidentialité plus élevée que l'environnement cible.",
 problem:"Premier réflexe : remonter la cible au niveau de la source. Mais la classification d'un dataset ne signifie pas que chaque élément qu'il contient est aussi sensible : un même dataset peut mêler caractéristiques techniques, attributs sensibles pour le métier, identifiants, voire données personnelles. Propager partout l'étiquette la plus haute sur-restreint la plateforme sans décrire le risque réel.",
 approach:["Passer de « quelle est la classification de la source ? » à « quelles données consommons-nous réellement, et quel risque portent-elles ? »","Évaluer le périmètre réel de consommation étape par étape : source → données sélectionnées → transformation → cible → utilisateurs finaux.","Intégrer la gouvernance à la conception : elle façonne les accès, les pipelines, la couche sémantique et l'analytique aval, au lieu de rester « autour » de la plateforme."],
 principles:[["Comprendre le contenu, pas l'étiquette","La classification d'un contenant est un point de départ, pas un verdict sur chaque champ."],["Suivre le lignage","Sensibilité et exposition s'évaluent sur tout le cycle de vie de la donnée."],["La gouvernance, c'est de l'ingénierie","Les choix d'accès et de classification sont des choix de conception pour le data engineer."]]}}
});
