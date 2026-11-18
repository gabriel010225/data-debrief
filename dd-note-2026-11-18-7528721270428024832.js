DD.add({
post:{id:"7528721270428024832",date:"2026-11-18",olang:"en",text:`We fixed the bug in production. Three weeks later, the customer reported the exact same bug.
The fix was fine. The customer’s files just weren’t coming from production.
A Gold dataset feeds files we send to an external customer. I corrected a data quality issue and deployed it to production. A few weeks later: same complaint, same rows.
Tracing the full chain showed why: the export was reading from the integration environment, not production.
Nobody chose this. The flow started as a stopgap — even the destination bucket was temporary, waiting for the final one to be validated. Then:
 → the files arrived
 → the customer could use them
 → nobody complained
So the stopgap kept running, and quietly became the production flow.
The customer can’t tell DEV from INT from PROD. They see files. If the files look right, they have no reason to ask where they come from. And the team had long moved on.
What I now check when a “temporary” flow has an external consumer:
Source: which environment does the export actually read from? Make it an explicit parameter, never a default.
Owner and review date: a temporary flow gets a named owner and a date to replace it.
Same rules as production: monitoring, alerting, and the same deployment path.
Verify the fix where the customer sees it: check the delivered file, not just the table.
If a customer consumes it, it’s production — whatever we call it internally.
Have you ever found a “temporary” flow still running months later? What gave it away?
#DataEngineering #DataOps #DataGovernance`},
concepts:{
  stopgap:{en:"Temporary flows",zh:"临时流程",fr:"Flux temporaires"}
},
figl:{stopgap:{
  en:["Illustrative · what the chain really did","Gold · PROD","fix deployed","Gold · INT","fix not there","Export","reads INT","Temporary bucket","still in use","External customer","same rows again","expected source","The customer sees files, not environments.","If a customer consumes it, it's production."],
  zh:["示意 · 链路实际是怎么跑的","Gold · 生产","已部署修复","Gold · 集成","没有修复","导出","读取集成环境","临时存储桶","一直在用","外部客户","同样的行又出错","本应读取的来源","客户看到的是文件，不是环境。","只要客户在用，它就是生产。"],
  fr:["Illustratif · ce que la chaîne faisait vraiment","Gold · PROD","correctif déployé","Gold · INT","pas de correctif","Export","lit l'INT","Bucket temporaire","toujours en service","Client externe","mêmes lignes","source attendue","Le client voit des fichiers, pas des environnements.","Si un client le consomme, c'est de la production."]}},
fig:{stopgap:L=>{
  let b="";const y=110,w=142,h=48;
  b+=T(640,12,L[0],"f-s-sm","end");
  b+=R(0,24,w,h,"f-accsoft")+T(w/2,44,L[1],"f-t","middle")+T(w/2,62,L[2],"f-s-sm","middle");
  b+=Ln(w,48,236,y-4,"f-bad")+T(186,62,L[11],"f-s");
  [[0,L[3],L[4],"f-warn"],[166,L[5],L[6],"f-soft"],[332,L[7],L[8],"f-soft"],[498,L[9],L[10],"f-soft"]].forEach(([x,a,s,c],i)=>{
    b+=R(x,y,w,h,c)+T(x+w/2,y+20,a,"f-t","middle")+T(x+w/2,y+38,s,i===0||i===3?"f-warn-t":"f-s-sm","middle");
    if(i<3)b+=Ln(x+w+2,y+h/2,x+w+22,y+h/2);});
  b+=T(0,y+h+32,L[12],"f-acc-t")+T(0,y+h+50,L[13],"f-acc-t");
  return svgWrap(640,y+h+60,b);}},
note:{domain:"platform",also:["orchestration"],fig:"stopgap",stack:["Dev / prod environments","Gold dataset","File exports","Monitoring & alerting"],concepts:["envs","stopgap","techdebt"],
en:{title:"If a customer consumes it, it's production",
 tldr:"A data quality fix was deployed to production, yet the customer reported the exact same bug three weeks later. The export had been reading from the integration environment all along: a temporary flow that had quietly become the production flow.",
 context:"A Gold dataset feeds files sent to an external customer. A data quality issue was corrected and deployed to production. A few weeks later the customer came back with the same complaint, on the same rows.",
 problem:"Tracing the full chain showed that the export read from the integration environment, not production. Nobody chose this: the flow started as a stopgap, and even the destination bucket was temporary while the final one was being validated. The files arrived, the customer could use them, nobody complained, so the stopgap kept running. The customer cannot tell DEV from INT from PROD; they see files, and if the files look right they have no reason to ask. The team had long moved on.",
 approach:["Source: make the environment the export reads from an explicit parameter, never a default.","Owner and review date: give every temporary flow a named owner and a date to replace it.","Same rules as production: monitoring, alerting and the same deployment path.","Verify the fix where the customer sees it: check the delivered file, not just the table."],
 principles:[["The consumer defines production","If a customer consumes it, it's production, whatever it is called internally."],["Temporary needs an owner and a date","A stopgap that works and draws no complaints keeps running by default."],["Check at the point of delivery","A fix in the table is not proven until the delivered file shows it."]]},
zh:{title:"只要客户在用，它就是生产环境",
 tldr:"一个数据质量修复已经部署到生产环境，三周后客户却报告了一模一样的问题。原来导出一直读取的是集成环境：一个临时流程，悄无声息地变成了生产流程。",
 context:"一个 Gold 数据集为发给外部客户的文件提供数据。我们修正了一个数据质量问题并部署到生产环境。几周后，客户又提出了同样的投诉，而且是同样的那几行数据。",
 problem:"把整条链路追查下来才发现，导出读取的是集成环境，而不是生产环境。这不是谁有意的选择：这个流程最初只是权宜之计，连目标存储桶都是临时的，等着正式的那个通过验证。文件按时送达，客户能用，没人抱怨，于是这个临时方案就一直跑了下去。客户分不清 DEV、INT 和 PROD，他们只看到文件；只要文件看起来没问题，就没有理由追问来源。而团队早就转去做别的事了。",
 approach:["数据来源：导出读取哪个环境，要做成显式参数，绝不依赖默认值。","负责人和复查日期：每个临时流程都要有明确的负责人，以及一个替换它的日期。","和生产同样的规则：监控、告警，以及同一条部署路径。","在客户看到的地方验证修复：检查交付出去的文件，而不只是检查表。"],
 principles:[["由使用方定义什么是生产","只要客户在用，它就是生产，不管内部怎么称呼它。"],["临时方案要有负责人和期限","能用又没人抱怨的权宜之计，默认就会一直跑下去。"],["在交付点上检查","表里修好了不算数，交付的文件里体现出来才算。"]]},
fr:{title:"Si un client le consomme, c'est de la production",
 tldr:"Un correctif de qualité des données a été déployé en production, et pourtant le client a signalé exactement le même bug trois semaines plus tard. L'export lisait depuis le début l'environnement d'intégration : un flux temporaire devenu, sans bruit, le flux de production.",
 context:"Un dataset Gold alimente des fichiers envoyés à un client externe. Un problème de qualité des données a été corrigé et déployé en production. Quelques semaines plus tard, le client revient avec la même réclamation, sur les mêmes lignes.",
 problem:"En remontant toute la chaîne, il est apparu que l'export lisait l'environnement d'intégration, pas la production. Personne ne l'avait décidé : le flux avait démarré comme une solution provisoire, et même le bucket de destination était temporaire, en attendant la validation du définitif. Les fichiers arrivaient, le client pouvait les utiliser, personne ne se plaignait : le provisoire a continué de tourner. Le client ne distingue pas DEV, INT et PROD ; il voit des fichiers, et s'ils ont l'air justes, il n'a aucune raison de demander d'où ils viennent. L'équipe, elle, était passée à autre chose depuis longtemps.",
 approach:["Source : faire de l'environnement lu par l'export un paramètre explicite, jamais une valeur par défaut.","Responsable et date de revue : tout flux temporaire a un responsable nommé et une date de remplacement.","Mêmes règles que la production : monitoring, alerting et le même chemin de déploiement.","Vérifier le correctif là où le client le voit : contrôler le fichier livré, pas seulement la table."],
 principles:[["C'est le consommateur qui définit la production","Si un client le consomme, c'est de la production, quel que soit son nom en interne."],["Le temporaire a besoin d'un responsable et d'une date","Une solution provisoire qui fonctionne et ne suscite aucune plainte continue de tourner par défaut."],["Vérifier au point de livraison","Un correctif dans la table n'est prouvé que lorsque le fichier livré le montre."]]}}
});
