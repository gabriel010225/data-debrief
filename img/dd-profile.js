/* Data Debrief — "About me" pages (skills, experience & education, projects).
   Adds three views to index.html without changing it: #stack, #work, #proj. Logos come from dd-profile-assets.js.
   Content is trilingual; skills link to the notes that show them in practice. */
(function(){
if (typeof render === "undefined") return;

const P = {
 ui:{
  en:{kb:"Notes",me:"About me",stack:"Skills & stack",work:"Experience & education",proj:"Projects",
      stackEye:"About me · skills",stackH:"What I build, and the notes that show it.",
      stackIntro:"Six areas I work in as a data consultant. Each one links to notes from real projects, so you can judge the work, not only the label.",
      proof:"Seen in",toolH:"Toolbox",toolIntro:"Grouped by layer of the stack. The level is my own honest estimate; the number shows how many notes use the tool — click one to see them.",
      all:"All",lv:{core:"Core",used:"Used",learn:"Deepening"},lvd:{core:"used daily, on production work",used:"used on projects",learn:"building deeper expertise now"},
      inNotes:n=>n?`${n} note${n>1?"s":""}`:"",
      workEye:"About me · experience",workH:"From the factory floor to data consulting.",
      workIntro:"Three years as an apprentice data analyst in industry, then data consulting since 2024. Client names, internal systems and figures are left out on purpose.",certH:"Certifications",projEye:"About me · projects",projH:"What I build on my own time.",projIntro:"Side projects where I own everything: the data model, the code and the deployment.",feat:"Featured",shot:"Screenshots",
      expH:"Experience",sideH:"Personal projects",eduH:"Education",
      ctx:"Context",did:"What I did",shows:"What it shows",rel:"Related notes",open:"Open ↗"},
  zh:{kb:"笔记库",me:"关于我",stack:"技能与工具",work:"经历与教育",proj:"个人项目",
      stackEye:"关于我 · 技能",stackH:"我做什么，以及证明它的笔记。",
      stackIntro:"作为数据顾问，我主要在这六个方向上工作。每个方向都链接到来自真实项目的笔记：看到的是做过的事，而不只是一个标签。",
      proof:"相关笔记",toolH:"工具箱",toolIntro:"按技术栈的层次分组。熟练程度是我自己的如实评估；数字表示有几条笔记用到了这个工具，点击即可查看。",
      all:"全部",lv:{core:"核心",used:"用过",learn:"深入中"},lvd:{core:"日常使用，用于生产环境",used:"在项目中用过",learn:"正在系统深入"},
      inNotes:n=>n?`${n} 条笔记`:"",
      workEye:"关于我 · 经历",workH:"从工厂车间到数据咨询。",
      workIntro:"先在工业领域做了三年数据分析学徒，2024 年起做数据咨询。客户名、内部系统和具体数字都刻意略去。",certH:"证书",projEye:"关于我 · 项目",projH:"业余时间做的东西。",projIntro:"从数据模型、代码到部署，全部由我自己负责的个人项目。",feat:"代表作",shot:"截图",
      expH:"工作经历",sideH:"个人项目",eduH:"教育背景",
      ctx:"背景",did:"我做了什么",shows:"体现的能力",rel:"相关笔记",open:"打开 ↗"},
  fr:{kb:"Notes",me:"À propos",stack:"Compétences & stack",work:"Parcours & formation",proj:"Projets",
      stackEye:"À propos · compétences",stackH:"Ce que je construis, et les notes qui le montrent.",
      stackIntro:"Six domaines dans lesquels j'interviens comme consultant data. Chacun renvoie à des notes tirées de vrais projets : on juge le travail, pas seulement l'étiquette.",
      proof:"Dans les notes",toolH:"Boîte à outils",toolIntro:"Regroupés par couche de la stack. Le niveau est ma propre estimation ; le chiffre indique combien de notes utilisent l'outil — cliquer pour les voir.",
      all:"Tout",lv:{core:"Cœur",used:"Pratiqué",learn:"En approfondissement"},lvd:{core:"utilisé au quotidien, en production",used:"utilisé en projet",learn:"en cours d'approfondissement"},
      inNotes:n=>n?`${n} note${n>1?"s":""}`:"",
      workEye:"À propos · parcours",workH:"De l'usine au conseil data.",
      workIntro:"Trois ans d'alternance comme data analyst dans l'industrie, puis consultant data depuis 2024. Noms de clients, systèmes internes et chiffres sont volontairement omis.",certH:"Certifications",projEye:"À propos · projets",projH:"Ce que je construis sur mon temps libre.",projIntro:"Des projets personnels dont je maîtrise tout : le modèle de données, le code et le déploiement.",feat:"Projet phare",shot:"Captures d'écran",
      expH:"Expériences",sideH:"Projets personnels",eduH:"Formation",
      ctx:"Contexte",did:"Ce que j'ai fait",shows:"Ce que ça montre",rel:"Notes liées",open:"Ouvrir ↗"}
 },

 caps:[
  {d:"semantic",
   en:["Semantic layer & BI","Building a single source of truth in Looker / LookML that business teams can trust and reuse; dashboards in Looker, Looker Studio and Spotfire; a Spotfire-to-Looker migration."],
   zh:["语义层与 BI","用 Looker / LookML 搭建业务团队信得过、能复用的单一可信数据源；在 Looker、Looker Studio 和 Spotfire 上做看板；参与过 Spotfire 到 Looker 的迁移。"],
   fr:["Couche sémantique & BI","Construire dans Looker / LookML une source unique de vérité fiable et réutilisable par les métiers ; dashboards Looker, Looker Studio et Spotfire ; migration Spotfire vers Looker."]},
  {d:"modeling",
   en:["Transformation & modeling","dbt projects end to end: staging to reporting layers, macros, tests, incremental models, Elementary for monitoring. Also Dataform and an internal declarative framework."],
   zh:["转换与建模","端到端的 dbt 项目：从 staging 到 reporting 分层，宏、测试、增量模型，用 Elementary 监控。也用过 Dataform 和公司内部的声明式框架。"],
   fr:["Transformation & modélisation","Projets dbt de bout en bout : couches staging à reporting, macros, tests, modèles incrémentaux, monitoring avec Elementary. Aussi Dataform et un framework déclaratif interne."]},
  {d:"orchestration",
   en:["Pipelines & orchestration","Ingesting from connectors, APIs, SFTP and Python scripts; orchestrating with Airflow on GCP (Dataproc), Kestra and Mage; debugging DAGs and tuning cost and run time."],
   zh:["管道与编排","通过数据连接器、API、SFTP 和 Python 脚本接入数据；用 Airflow on GCP（Dataproc）、Kestra、Mage 编排；排查 DAG 问题，优化成本和运行时间。"],
   fr:["Pipelines & orchestration","Ingestion via connecteurs, API, SFTP et scripts Python ; orchestration avec Airflow sur GCP (Dataproc), Kestra et Mage ; débogage de DAG, optimisation des coûts et des temps d'exécution."]},
  {d:"business",
   en:["Business & marketing analytics","Turning business questions into use cases: web analytics (GA4), channel attribution, CRM and booking-system reconciliation, customer segments activated through reverse ETL."],
   zh:["业务与营销分析","把业务问题变成可落地的用例：网站分析（GA4）、渠道归因、CRM 与订单系统对账、通过 reverse ETL 激活客户分群。"],
   fr:["Analytique métier & marketing","Traduire les questions métier en cas d'usage : web analytics (GA4), attribution par canal, rapprochement CRM et système de réservation, segments clients activés en reverse ETL."]},
  {d:"platform",
   en:["Platform & governance","Google Cloud (BigQuery, Cloud Storage, IAM, Cloud Functions), Git workflows and CI/CD, data classification, access and freshness checks."],
   zh:["平台与治理","Google Cloud（BigQuery、Cloud Storage、IAM、Cloud Functions），Git 工作流与 CI/CD，数据分级、权限与新鲜度检查。"],
   fr:["Plateforme & gouvernance","Google Cloud (BigQuery, Cloud Storage, IAM, Cloud Functions), workflows Git et CI/CD, classification des données, accès et contrôles de fraîcheur."]},
  {d:null,
   en:["Delivery & team","Harmonising how a team develops and ships; coaching interns and apprentices on implementation and project follow-up; working in Agile with JIRA and Confluence."],
   zh:["交付与团队","统一团队的开发和交付方式；在技术实现和项目跟进上带实习生和学徒；用 JIRA、Confluence 进行敏捷协作。"],
   fr:["Delivery & équipe","Harmoniser la façon dont une équipe développe et livre ; accompagner stagiaires et apprentis sur la mise en œuvre et le suivi ; travail en Agile avec JIRA et Confluence."]}
 ],

 cats:[
  {id:"cloud",n:{en:"Cloud & warehouse",zh:"云与数仓",fr:"Cloud & entrepôt"},t:[["BigQuery","core"],["Cloud Storage","used"],["Dataproc","used"],["Cloud IAM","used"],["Compute Engine","used"],["Cloud Functions","used"]]},
  {id:"ing",n:{en:"Ingestion & activation",zh:"接入与激活",fr:"Ingestion & activation"},t:[["Airbyte","used"],["Funnel","used"],["Stitch","used"],["Hightouch","used"],["API / SFTP","used"]]},
  {id:"orch",n:{en:"Orchestration",zh:"编排",fr:"Orchestration"},t:[["Airflow","core"],["Kestra","core"],["Mage AI","used"]]},
  {id:"model",n:{en:"Transformation",zh:"转换",fr:"Transformation"},t:[["dbt","core"],["SQL","core"],["LookML","core"],["Python","used"],["Elementary","used"],["Dataform","used"]]},
  {id:"bi",n:{en:"BI & dataviz",zh:"BI 与可视化",fr:"BI & dataviz"},t:[["Looker","core"],["Looker Studio","core"],["Spotfire","core"],["Power BI","used"]]},
  {id:"mkt",n:{en:"Marketing data",zh:"营销数据",fr:"Data marketing"},t:[["GA4","core"],["Google Ads","used"],["Shopify","used"],["Brevo","used"],["Klaviyo","used"]]},
  {id:"dev",n:{en:"Dev & ways of working",zh:"开发与协作",fr:"Dev & méthodes"},t:[["Git","core"],["GitHub","core"],["GitLab","core"],["JIRA / Confluence","used"]]},
  {id:"next",n:{en:"Going deeper",zh:"深入方向",fr:"Approfondissement"},t:[["Databricks","learn"],["Docker","learn"],["Kafka","learn"],["Machine learning","learn"]]}
 ],

 exp:[
  {from:"2025-08",to:null,logo:"consort",org:"Consort Group",
   role:{en:"Data Consultant",zh:"数据顾问",fr:"Consultant Data"},
   kw:{en:["Semantic layer","Single source of truth","Circular economy"],zh:["语义层","单一可信数据源","循环经济"],fr:["Couche sémantique","Source unique de vérité","Économie circulaire"]},
   tools:{src:["SAP"],store:["BigQuery","Dataproc"],orch:["Airflow"],bi:["LookML","Looker","Spotfire"],dev:["GitLab","JIRA / Confluence"]}},
  {from:"2024-02",to:"2025-06",logo:"hanalytics",org:"Hanalytics",
   role:{en:"Data Analyst / Analytics Engineer",zh:"数据分析师 / Analytics Engineer",fr:"Data Analyst / Analytics Engineer"},
   kw:{en:["End-to-end ELT","Marketing data","Reverse ETL"],zh:["端到端 ELT","营销数据","Reverse ETL"],fr:["ELT de bout en bout","Data marketing","Reverse ETL"]},
   tools:{src:["GA4","Google Ads","Shopify","SAP"],ing:["Funnel","Airbyte","Stitch","API / SFTP","Python"],store:["BigQuery","Cloud Storage","Compute Engine","Cloud Functions","Cloud IAM"],tr:["dbt","Dataform","Elementary"],orch:["Kestra","Mage AI"],bi:["Looker Studio"],act:["Hightouch","Brevo","Klaviyo"],dev:["GitHub","JIRA / Confluence"]}},
  {from:"2020-09",to:"2023-09",logo:"renault",org:"Groupe Renault",
   role:{en:"Data Analyst · apprenticeship",zh:"数据分析师 · 学徒",fr:"Data Analyst · alternance"},
   kw:{en:["Manufacturing KPIs","BI migration","Statistics"],zh:["生产指标","BI 迁移","统计分析"],fr:["Indicateurs de fabrication","Migration BI","Statistiques"]},
   tools:{bi:["Looker","Spotfire"]}}
 ],

 layers:[
  ["src",{en:"Sources",zh:"数据源",fr:"Sources"}],
  ["ing",{en:"Ingestion",zh:"数据接入",fr:"Ingestion"}],
  ["store",{en:"Storage & compute",zh:"存储与计算",fr:"Stockage & calcul"}],
  ["tr",{en:"Transformation & quality",zh:"转换与质量",fr:"Transformation & qualité"}],
  ["orch",{en:"Orchestration",zh:"编排",fr:"Orchestration"}],
  ["bi",{en:"Semantic layer & BI",zh:"语义层与 BI",fr:"Couche sémantique & BI"}],
  ["act",{en:"Activation",zh:"数据激活",fr:"Activation"}],
  ["dev",{en:"Dev & collaboration",zh:"开发与协作",fr:"Dev & collaboration"}]
 ],

 edu:[
  {logo:"artsetmetiers",years:"2020 – 2023",school:"Arts et Métiers ParisTech",
   d:{en:"Engineering degree (Diplôme d'Ingénieur)",zh:"工程师学位（Diplôme d'Ingénieur）",fr:"Diplôme d'Ingénieur"}},
  {logo:"parissaclay",years:"2018 – 2020",school:"Université Paris-Saclay",
   d:{en:"DUT in Physical Measurements",zh:"DUT 物理测量",fr:"DUT Mesures Physiques"}}
 ],

 certs:[
  {ic:"img:funnel",n:"Partner Certification Program (Level 1)",by:"Funnel",d:"2025-04"},
  {ic:"si:amazons3:569A31",n:"AWS S3 Basics",by:"Coursera",d:"2023-11"},
  {ic:"img:ibm",n:"IBM Data Engineering",by:"IBM · Coursera",d:"2023-10"},
  {ic:"si:jira:0052CC",n:"Get started with Jira",by:"Atlassian · Coursera",d:"2023-09"},
  {ic:"img:ets",n:"TOEIC — 865 / 990",by:"ETS",d:"2022-06"},
  {ic:"si:googlecloud:4285F4",n:"From Data to Insights with Google Cloud Platform",by:"Google Cloud · Coursera",d:"2020-11"}
 ],

 feat:{url:null,tags:["Knowledge modelling","Bilingual 中文 / EN","Cloudflare Workers","CI/CD"],
  en:{t:"礼仪溯源 Liturgica",sub:"A bilingual reference database of liturgical history",txt:"Scholarly books on liturgy, turned into structured data: rites organised by family and tradition, each step traced to its sources, a family tree of traditions and a timeline of more than 5,000 dated stages. Content lives as data in a private repository, separate from the page, and deploys automatically on every push.",
      caps:["A rite, step by step, with original-language terms and citations","The family tree of liturgical traditions","The timeline: every dated stage, filterable by tradition"]},
  zh:{t:"礼仪溯源 Liturgica",sub:"中英双语的礼仪史资料库",txt:"把礼仪学术著作变成结构化数据：礼仪按家族和传统组织，每个步骤都能追溯到出处，配有礼仪传统谱系图，以及 5000 多条按年代排列的演变时间轴。内容作为数据存放在私有仓库，与页面分离，每次推送自动部署。",
      caps:["逐步查看一个礼仪，附原文术语和出处","礼仪传统谱系图","演变时间轴：所有带年代的阶段，可按传统筛选"]},
  fr:{t:"礼仪溯源 Liturgica",sub:"Une base de référence bilingue sur l'histoire des liturgies",txt:"Des ouvrages savants sur la liturgie transformés en données structurées : rites organisés par famille et tradition, chaque étape rattachée à ses sources, un arbre des traditions et une chronologie de plus de 5 000 étapes datées. Le contenu est stocké comme données dans un dépôt privé, séparé de la page, et déployé automatiquement à chaque push.",
      caps:["Un rite étape par étape, avec termes originaux et citations","L'arbre généalogique des traditions liturgiques","La chronologie : chaque étape datée, filtrable par tradition"]},
  shots:["img/liturgica-1.webp","img/liturgica-2.webp","img/liturgica-3.webp"]},

 side:[
  {url:"https://gabriel010225.github.io/data-debrief/",tags:["HTML / JS","GitHub Pages","Automation"],
   en:["Data Debrief","This site: a trilingual knowledge base built from my LinkedIn posts, grouped by domain and concept. New posts are imported every week by a scheduled job."],
   zh:["Data Debrief","就是这个网站：把我的领英帖子整理成按领域和概念组织的三语知识库，新帖子每周由定时任务自动导入。"],
   fr:["Data Debrief","Ce site : une base de connaissances trilingue construite à partir de mes posts LinkedIn, organisée par domaine et par concept. Les nouveaux posts sont importés chaque semaine par une tâche planifiée."]},
  {url:null,tags:["Databricks","Exam practice"],
   en:["DE Associate practice exam","A mock exam for the Databricks Data Engineer Associate certification, built while preparing for it: timed sessions, explanations per question."],
   zh:["DE Associate 模拟考场","备考 Databricks Data Engineer Associate 认证时自己做的模拟考试：限时答题，每道题附解析。"],
   fr:["Examen blanc DE Associate","Un examen blanc pour la certification Databricks Data Engineer Associate, construit pendant ma préparation : sessions chronométrées, explication par question."]}
 ]
};

/* ---------- styles ---------- */
const css=`
.pf-caps{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;margin-top:18px}
.pf-cap{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px 16px 14px;display:flex;flex-direction:column;gap:8px;border-top:3px solid var(--c,var(--ink))}
.pf-cap h3{margin:0;font-family:var(--display);font-size:18px;line-height:1.2}
.pf-cap p{margin:0;color:var(--muted);font-size:14px}
.pf-proof{margin-top:auto;padding-top:8px;border-top:1px dashed var(--line);display:flex;flex-direction:column;gap:3px}
.pf-proof button{all:unset;cursor:pointer;font-size:13px;line-height:1.35;color:var(--ink)}
.pf-proof button::before{content:"→ ";color:var(--accent)}
.pf-proof button:hover{color:var(--accent)}
.pf-filter{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0 8px}
.pf-filter button{all:unset;cursor:pointer;font-size:13px;padding:4px 11px;border:1px solid var(--line);border-radius:999px;background:var(--surface)}
.pf-filter button[aria-pressed="true"]{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.pf-legend{display:flex;flex-wrap:wrap;gap:14px;font-size:12.5px;color:var(--muted);margin-bottom:6px}
.pf-legend span{display:inline-flex;align-items:center;gap:6px}
.pf-groups{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}
.pf-group{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px}
.pf-group .eyebrow{margin-bottom:8px}
.pf-tool{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;align-items:center;gap:10px;padding:6px 8px;border-radius:7px;cursor:pointer;font-size:14px}
.pf-tool:hover{background:var(--bg)}
.pf-tool[disabled]{cursor:default}
.pf-tool[disabled]:hover{background:transparent}
.pf-tool .nm{display:flex;align-items:center;gap:8px;min-width:0}
.pf-tool .ct{font-family:var(--mono);font-size:11px;color:var(--muted);white-space:nowrap}
.pf-lv{display:inline-flex;gap:2px;flex:none}
.pf-lv i{width:6px;height:6px;border-radius:2px;background:var(--line)}
.pf-lv.core i{background:var(--accent)}
.pf-lv.used i:nth-child(-n+2){background:var(--accent)}
.pf-lv.learn i:first-child{background:var(--mark)}
.pf-ic{width:18px;height:18px;flex:none;margin:1px}
.pf-mono{width:20px;height:20px;flex:none;border-radius:5px;background:var(--accent-soft);color:var(--accent);font-family:var(--mono);font-size:8.5px;font-weight:600;display:grid;place-items:center;letter-spacing:-.02em}
.pf-tool .meta{display:flex;align-items:center;gap:8px}
.pf-switch{display:flex;border:1px solid var(--line);border-radius:9px;overflow:hidden;background:var(--surface)}
.pf-switch button{all:unset;flex:1;text-align:center;cursor:pointer;padding:7px 10px;font-size:13.5px;color:var(--muted)}
.pf-switch button[aria-pressed="true"]{background:var(--accent);color:#fff;font-weight:600}
.pf-switch button:focus-visible{outline:2px solid var(--accent)}
.pf-list{display:flex;flex-direction:column;gap:10px;margin-top:14px}
.pf-row{display:flex;gap:16px;align-items:flex-start;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px}
.pf-row.slim{align-items:center;padding:12px 16px}
.pf-logo{width:48px;height:48px;border-radius:10px;object-fit:contain;flex:none;background:#fff;border:1px solid var(--line)}
.pf-body{min-width:0;flex:1}
.pf-top{display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap}
.pf-body h3{margin:0;font-family:var(--display);font-size:17px}
.pf-body .when{font-family:var(--mono);font-size:12px;color:var(--muted);white-space:nowrap}
.pf-body .org{color:var(--accent);font-weight:600;font-size:14px}
.pf-body p{margin:6px 0 0;font-size:14.5px}
.pf-kw{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.pf-kw span{font-size:13px;font-weight:600;padding:3px 10px;border-radius:999px;background:var(--accent-soft);color:var(--ink)}
.pf-layers{display:grid;grid-template-columns:150px minmax(0,1fr);gap:7px 14px;margin-top:12px;padding-top:12px;border-top:1px dashed var(--line);align-items:baseline}
.pf-layers .ly{font-family:var(--mono);font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:var(--muted)}
.pf-tl{display:flex;flex-wrap:wrap;gap:6px 14px}
.pf-tl span{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--muted)}
.pf-tl .pf-ic{width:16px;height:16px}
.pf-certs{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px;margin-top:14px}
.pf-cert{display:flex;gap:12px;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:12px 14px}
.pf-cic{width:36px;height:36px;flex:none;object-fit:contain;border-radius:8px;background:#fff;border:1px solid var(--line);padding:5px;box-sizing:border-box}
.pf-cert b{display:block;font-size:14px;line-height:1.3}
.pf-cert span{font-size:12.5px;color:var(--muted)}
.pf-feat{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:22px;margin-top:18px;border-top:3px solid var(--mark)}
.pf-feat h2{margin:4px 0 0;font-family:var(--display);font-size:26px}
.pf-sub{color:var(--muted);font-size:14.5px;margin-bottom:8px}
.pf-feat>p{max-width:760px;font-size:15px}
.pf-shots{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px}
.pf-shot{margin:0;padding:0;background:none;border:0;box-shadow:none}
.pf-shot.big{grid-column:1/-1}
.pf-shot button{all:unset;cursor:zoom-in;display:block;border-radius:10px;overflow:hidden;border:1px solid var(--line)}
.pf-shot img{display:block;width:100%;height:auto}
.pf-shot figcaption{font-family:var(--body);font-size:12.5px;color:var(--muted);margin-top:6px;letter-spacing:0;text-transform:none}
.pf-lb{border:0;padding:0;background:transparent;max-width:min(1200px,94vw)}
.pf-lb::backdrop{background:rgba(0,0,0,.75)}
.pf-lb img{display:block;max-width:100%;max-height:82vh;border-radius:10px}
.pf-lb p{color:#fff;text-align:center;font-size:14px}
.pf-lb .x{all:unset;cursor:pointer;position:absolute;top:6px;right:10px;color:#fff;font-size:28px;line-height:1;text-shadow:0 1px 4px #000}
@media (max-width:760px){.pf-layers{grid-template-columns:minmax(0,1fr);gap:3px}.pf-layers .pf-tl{margin-bottom:6px}.pf-shots{grid-template-columns:1fr}.pf-row{gap:12px;padding:14px}.pf-logo{width:40px;height:40px}}
.pf-side{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px;margin-top:16px}
.pf-side .pf-cap{border-top-color:var(--mark)}
.pf-side a{color:var(--accent);font-size:13px;text-decoration:none}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

/* ---------- helpers ---------- */
const U=k=>P.ui[lang][k];
let toolCat="all";
const toolNotes=name=>{const s=name.toLowerCase();return notes.filter(n=>n.stack.some(x=>x.toLowerCase()===s||(s.length>3&&x.toLowerCase().includes(s)))).length;};
const noteLinks=list=>list.map(n=>`<button data-go="note:${n.id}">${esc(N(n).title)}</button>`).join("");
const ym=s=>{if(!s)return lang==="zh"?"至今":lang==="fr"?"aujourd'hui":"present";const [y,m]=s.split("-").map(Number);return lang==="zh"?`${y}.${String(m).padStart(2,"0")}`:`${MON[lang][m-1]} ${y}`;};

/* Tool icons: Simple Icons v13.21.0 (CC0), paths inlined and tinted with the brand colour.
   Tools without an official icon get a short monogram. */
const SIP={"googlebigquery":"M5.676 10.595h2.052v5.244a5.892 5.892 0 0 1-2.052-2.088v-3.156zm18.179 10.836a.504.504 0 0 1 0 .708l-1.716 1.716a.504.504 0 0 1-.708 0l-4.248-4.248a.206.206 0 0 1-.007-.007c-.02-.02-.028-.045-.043-.066a10.736 10.736 0 0 1-6.334 2.065C4.835 21.599 0 16.764 0 10.799S4.835 0 10.8 0s10.799 4.835 10.799 10.8c0 2.369-.772 4.553-2.066 6.333.025.017.052.028.074.05l4.248 4.248zm-5.028-10.632a8.015 8.015 0 1 0-8.028 8.028h.024a8.016 8.016 0 0 0 8.004-8.028zm-4.86 4.98a6.002 6.002 0 0 0 2.04-2.184v-1.764h-2.04v3.948zm-4.5.948c.442.057.887.08 1.332.072.4.025.8.025 1.2 0V7.692H9.468v9.035z","googlecloudstorage":"M24 2.4v8.4h-2.4V2.4H24zM0 10.8h2.4V2.4H0v8.4zm3-8.4h18v8.4H3V2.4zm12.6 4.2a1.8 1.8 0 1 0 3.6 0 1.8 1.8 0 0 0-3.6 0zm-10.8.6H12V6H4.8v1.2zm16.8 14.4H24v-8.4h-2.4v8.4zM0 21.6h2.4v-8.4H0v8.4zm3-8.4h18v8.4H3v-8.4zm12.6 4.2a1.8 1.8 0 1 0 3.6 0 1.8 1.8 0 0 0-3.6 0zM4.8 18H12v-1.2H4.8V18z","googledataproc":"M23.373 20.364a4.682 4.682 0 0 1-8.1 0 4.694 4.694 0 0 1 0-4.669c.326-.564.778-.995 1.272-1.358.472.198 3.394 1.421 3.917 1.717a2.291 2.291 0 0 0-3.109.842 2.304 2.304 0 0 0 0 2.267 2.267 2.267 0 0 0 2.564 1.053 2.254 2.254 0 0 0 1.375-1.053 2.328 2.328 0 0 0 0-2.279 2.478 2.478 0 0 0-.83-.83l-3.53-2.045-5.727-3.317a5.022 5.022 0 0 0 4.139-.36l6.32 3.641a4.682 4.682 0 0 1 1.709 6.391zm-14-2.01v.004l-3.558 2a2.27 2.27 0 0 1-3.102-.823 2.267 2.267 0 0 1 2.551-3.332c.591.161 1.089.56 1.375 1.102v-.05a2.27 2.27 0 0 1-.824 3.103c.559-.303 3.352-2.62 3.465-2.714-.304-1.744-1.573-3.24-3.396-3.72a4.608 4.608 0 0 0-3.558.479 4.67 4.67 0 0 0-1.694 6.383 4.682 4.682 0 0 0 2.865 2.192 4.657 4.657 0 0 0 3.66-.56l6.877-3.973c-.019-1.303.512-2.604 1.375-3.58l-6.036 3.49zm-2.4-4.703v-8.1h.012c.002-1.617.821-3.189 2.321-4.055a4.682 4.682 0 1 1 2.337 8.737 4.678 4.678 0 0 1-1.55-.28c-.016-.085-.733-3.796-.733-4.188L9.29 9.59v6.761a4.075 4.075 0 0 0-2.317-2.7zm2.403-8.1a2.279 2.279 0 1 0 4.546 0 2.23 2.23 0 0 0-.297-1.127 2.279 2.279 0 0 0-1.97-1.14 2.267 2.267 0 0 0-2.279 2.254v.013z","googlecloud":"M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z","airbyte":"M8.308 2.914C10.876.027 15.128-.819 18.624.848c4.644 2.21 6.339 7.846 3.809 12.194l-5.687 9.77c-.319.547-.842.944-1.455 1.107-.613.163-1.267.079-1.818-.236l6.887-11.832c1.835-3.155.608-7.243-2.758-8.854-2.528-1.208-5.613-.604-7.482 1.473-1.031 1.139-1.608 2.613-1.628 4.145-.018 1.532.524 3.019 1.524 4.185.179.21.372.406.579.588l-4.021 6.919c-.157.273-.365.51-.617.699-.249.189-.534.329-.838.411-.303.081-.621.1-.93.061-.313-.041-.614-.143-.885-.298l4.364-7.513C7.041 12.77 6.59 11.763 6.34 10.7l-2.675 4.612c-.317.545-.842.944-1.453 1.107-.615.164-1.269.079-1.818-.237L7.31 4.284c.29-.487.622-.948.998-1.37Zm7.983 3.784c1.666.956 2.242 3.081 1.277 4.734L10.936 22.81c-.317.547-.84.945-1.455 1.109-.612.162-1.268.079-1.816-.237l6.159-10.596c-.495-.1-.96-.308-1.365-.61-.405-.3-.743-.682-.981-1.122-.242-.441-.385-.928-.418-1.428-.033-.501.045-1.002.224-1.47.18-.468.462-.893.824-1.242.362-.35.795-.618 1.273-.784.474-.168.982-.23 1.485-.183.502.046.989.2 1.425.451Zm-2.412 2.139c-.114.087-.21.196-.282.32-.106.186-.158.398-.144.613.014.215.092.42.224.592.13.167.31.297.515.367.207.068.427.077.636.02.209-.056.396-.172.54-.334.143-.161.234-.36.263-.574.027-.213-.008-.43-.105-.622-.097-.195-.246-.354-.433-.46-.126-.072-.263-.118-.406-.136-.143-.02-.286-.01-.424.026-.14.038-.271.101-.384.188Z","apacheairflow":"M17.195 16.822l4.002-4.102C23.55 10.308 23.934 5.154 24 .43a.396.396 0 0 0-.246-.373.392.392 0 0 0-.437.09l-6.495 6.658-4.102-4.003C10.309.45 5.154.066.43 0H.423a.397.397 0 0 0-.277.683l6.658 6.494-4.003 4.103C.45 13.692.065 18.846 0 23.57a.398.398 0 0 0 .683.282l6.494-6.657 3.934 3.837.17.165c2.41 2.353 7.565 2.737 12.288 2.803h.006a.397.397 0 0 0 .277-.683l-6.657-6.495zm-.409-9.476c.04.115.05.24.031.344-.17.96-1.593 2.538-4.304 3.87a.597.597 0 0 0-.08-.079c1.432-3.155 1.828-5.61 1.175-7.322l3.058 2.984.12.203zm-.131 9.44a.73.73 0 0 1-.347.031c-.96-.171-2.537-1.594-3.87-4.307a.656.656 0 0 0 .08-.078l-.001.001c3.155 1.432 5.61 1.83 7.324 1.174l-2.969 3.043M23.568.392a.05.05 0 0 1 .052-.011c.018.006.03.024.029.043-.065 4.655-.437 9.726-2.703 12.05-1.53 1.565-4.326 1.419-8.283-.377.006-.037.021-.07.02-.108 0-.044-.017-.082-.026-.123 2.83-1.39 4.315-3.037 4.506-4.115.057-.322-.009-.542-.102-.688l6.507-6.67V.392zM.393.43A.045.045 0 0 1 .382.38C.39.36.403.343.425.35c4.655.065 9.727.438 12.05 2.703l.002.002c1.56 1.527 1.415 4.323-.379 8.28-.033-.005-.062-.02-.097-.02h-.008c-.045.001-.084.019-.126.027-1.39-2.83-3.037-4.314-4.115-4.506-.323-.057-.542.01-.688.103L.393.43zm11.94 11.563a.331.331 0 0 1-.327.335H12a.332.332 0 0 1-.004-.661c.172.016.333.144.335.326h.002zm-5.12 4.661a.722.722 0 0 1-.03-.345c.17-.96 1.595-2.54 4.309-3.873.013.016.019.035.033.05.013.012.03.017.044.028-1.434 3.158-1.83 5.613-1.177 7.326l-3.041-2.967m-.006-9.659a.735.735 0 0 1 .345-.031c.961.17 2.54 1.594 3.871 4.306a.597.597 0 0 0-.079.08c-2.167-.983-4.007-1.484-5.498-1.484-.68 0-1.289.103-1.825.308L7.128 7.35M.43 23.607c-.018.018-.038.015-.052.01-.019-.007-.028-.021-.028-.043.065-4.654.437-9.725 2.703-12.049 1.527-1.565 4.325-1.419 8.286.378-.006.035-.02.067-.02.104 0 .043.018.083.026.124-2.831 1.391-4.317 3.04-4.51 4.117-.057.322.01.542.103.688L.43 23.607zm23.144.042c-4.655-.065-9.726-.437-12.05-2.703l-.005-.006c-1.56-1.526-1.412-4.322.383-8.279.033.005.064.02.098.02h.009c.043 0 .08-.018.122-.027 1.39 2.832 3.036 4.317 4.115 4.51.083.014.16.021.23.021a.776.776 0 0 0 .45-.133l6.68 6.516c.02.02.016.04.01.052a.042.042 0 0 1-.042.029z","dbt":"M17.9004 9.3763a8.1488 8.1488 0 0 0-3.0421-3.1206l1.7708.8385a10.2874 10.2874 0 0 1 3.74 3.0007l3.234-5.9295a2.8546 2.8546 0 0 0-.0611-2.9604C22.7566.0371 21.2112-.3409 19.9754.3327l-5.8749 3.2101a4.3612 4.3612 0 0 1-4.1761 0L4.1769.408a2.8545 2.8545 0 0 0-2.9592.0632c-1.1673.7853-1.5452 2.33-.8723 3.5655L3.55 9.9106a4.3612 4.3612 0 0 1 0 4.1772l-3.1272 5.743a2.86 2.86 0 0 0 .085 2.9974c.794 1.1438 2.3225 1.5054 3.5448.8385l6.0581-3.3049a10.2877 10.2877 0 0 1-3.0051-3.7454l-.8374-1.7708a8.148 8.148 0 0 0 3.1206 3.0421l10.5832 5.779c1.2213.666 2.7481.3055 3.5426-.8363a2.8699 2.8699 0 0 0 .0796-3.0018L17.9004 9.3763zm3.3801-7.7351c.6022 0 1.0904.4882 1.0904 1.0904s-.4882 1.0904-1.0904 1.0904-1.0904-.4882-1.0904-1.0904.4882-1.0904 1.0904-1.0904zM2.7442 3.822c-.6022 0-1.0904-.4882-1.0904-1.0904s.4882-1.0904 1.0904-1.0904 1.0904.4882 1.0904 1.0904S3.3464 3.822 2.7442 3.822zm0 18.5363c-.6022 0-1.0904-.4882-1.0904-1.0904 0-.6022.4882-1.0904 1.0904-1.0904s1.0904.4882 1.0904 1.0904c0 .6022-.4882 1.0904-1.0904 1.0904zm10.3585-11.4489c-1.2008-.0035-2.177.9672-2.1805 2.1679a2.1738 2.1738 0 0 0 .7052 1.6091c-1.4872-.2091-2.5234-1.5843-2.3142-3.0716.2091-1.4872 1.5843-2.5234 3.0716-2.3142a2.7194 2.7194 0 0 1 2.3142 2.3142 2.1623 2.1623 0 0 0-1.5963-.7054zm8.1778 11.4489c-.6022 0-1.0904-.4882-1.0904-1.0904 0-.6022.4882-1.0904 1.0904-1.0904s1.0904.4882 1.0904 1.0904c0 .6022-.4882 1.0904-1.0904 1.0904z","python":"M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z","looker":"M11.9475 0c-1.1598.0021-2.0982.944-2.096 2.1038a2.1 2.1 0 00.356 1.166l.895-.8959a.884.884 0 11.565.564l-.895.895c.9593.6478 2.2621.3953 2.91-.564.6478-.9593.3953-2.262-.564-2.91A2.096 2.096 0 0011.9475 0zm-.835 6.1128a3.2629 3.2629 0 00-.653-1.965l-1.164 1.162a1.667 1.667 0 01-.318 2.012l.632 1.5449a3.2819 3.2819 0 001.503-2.754zm-3.2499 1.666h-.03c-.9217.0009-1.6697-.7455-1.6707-1.6673-.001-.9217.7454-1.6697 1.6672-1.6707a1.669 1.669 0 01.9195.275l1.152-1.152c-1.4069-1.141-3.4724-.9257-4.6135.4811s-.9257 3.4723.481 4.6135a3.2799 3.2799 0 002.7275.6652l-.633-1.5439v-.001zm4.1279 1.3359c-.728 0-1.452.106-2.15.315l.922 2.2519c2.6872-.6819 5.4184.9438 6.1002 3.631.6818 2.6873-.9439 5.4184-3.6311 6.1002s-5.4184-.9439-6.1002-3.631c-.5682-2.2394.4655-4.5774 2.5041-5.6643l-.91-2.2449c-3.6908 1.808-5.2173 6.2657-3.4093 9.9567l.0005.001c1.808 3.6909 6.2657 5.2173 9.9567 3.4093l.001-.0005c3.6913-1.8071 5.2187-6.2645 3.4116-9.9558a7.4417 7.4417 0 00-6.6865-4.1696h-.008l-.001.001z","googleanalytics":"M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619zM4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726zm7.8728-9.0098c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z","googleads":"M3.9998 22.9291C1.7908 22.9291 0 21.1383 0 18.9293s1.7908-3.9998 3.9998-3.9998 3.9998 1.7908 3.9998 3.9998-1.7908 3.9998-3.9998 3.9998zm19.4643-6.0004L15.4632 3.072C14.3586 1.1587 11.9121.5028 9.9988 1.6074S7.4295 5.1585 8.5341 7.0718l8.0009 13.8567c1.1046 1.9133 3.5511 2.5679 5.4644 1.4646 1.9134-1.1046 2.568-3.5511 1.4647-5.4644zM7.5137 4.8438L1.5645 15.1484A4.5 4.5 0 0 1 4 14.4297c2.5597-.0075 4.6248 2.1585 4.4941 4.7148l3.2168-5.5723-3.6094-6.25c-.4499-.7793-.6322-1.6394-.5878-2.4784z","shopify":"M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z","brevo":"M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zM7.2 4.8h5.747c2.34 0 3.895 1.406 3.895 3.516 0 1.022-.348 1.862-1.09 2.588C17.189 11.812 18 13.22 18 14.785c0 2.86-2.64 5.016-6.164 5.016H7.199v-15zm2.085 1.952v5.537h.07c.233-.432.858-.796 2.249-1.226 2.039-.659 3.037-1.52 3.037-2.655 0-.998-.766-1.656-1.924-1.656H9.285zm4.87 5.266c-.766.385-1.67.748-2.76 1.11-1.229.387-2.11 1.386-2.11 2.407v2.315h2.365c2.387 0 4.149-1.34 4.149-3.155 0-1.067-.625-2.087-1.645-2.677z","git":"M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187","github":"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12","gitlab":"m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0537.8585.8585 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a6.0657 6.0657 0 0 0 2.0119 7.0105l.0113.0087.03.0213 4.976 3.7264 2.462 1.8633 1.4995 1.1321a1.0085 1.0085 0 0 0 1.2197 0l1.4995-1.1321 2.4619-1.8633 5.006-3.7489.0125-.01a6.0682 6.0682 0 0 0 2.0094-7.003z","jira":"M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z","databricks":"M.95 14.184L12 20.403l9.919-5.55v2.21L12 22.662l-10.484-5.96-.565.308v.77L12 24l11.05-6.218v-4.317l-.515-.309L12 19.118l-9.867-5.653v-2.21L12 16.805l11.05-6.218V6.32l-.515-.308L12 11.974 2.647 6.681 12 1.388l7.76 4.368.668-.411v-.566L12 0 .95 6.27v.72L12 13.207l9.919-5.55v2.26L12 15.52 1.516 9.56l-.565.308Z","docker":"M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z","apachekafka":"M9.71 2.136a1.43 1.43 0 0 0-2.047 0h-.007a1.48 1.48 0 0 0-.421 1.042c0 .41.161.777.422 1.039l.007.007c.257.264.616.426 1.019.426.404 0 .766-.162 1.027-.426l.003-.007c.261-.262.421-.629.421-1.039 0-.408-.159-.777-.421-1.042H9.71zM8.683 22.295c.404 0 .766-.167 1.027-.429l.003-.008c.261-.261.421-.631.421-1.036 0-.41-.159-.778-.421-1.044H9.71a1.42 1.42 0 0 0-1.027-.432 1.4 1.4 0 0 0-1.02.432h-.007c-.26.266-.422.634-.422 1.044 0 .406.161.775.422 1.036l.007.008c.258.262.617.429 1.02.429zm7.89-4.462c.359-.096.683-.33.882-.684l.027-.052a1.47 1.47 0 0 0 .114-1.067 1.454 1.454 0 0 0-.675-.896l-.021-.014a1.425 1.425 0 0 0-1.078-.132c-.36.091-.684.335-.881.686-.2.349-.241.75-.146 1.119.099.363.33.691.675.896h.002c.346.203.737.239 1.101.144zm-6.405-7.342a2.083 2.083 0 0 0-1.485-.627c-.58 0-1.103.242-1.482.627-.378.385-.612.916-.612 1.507s.233 1.124.612 1.514a2.08 2.08 0 0 0 2.967 0c.379-.39.612-.923.612-1.514s-.233-1.122-.612-1.507zm-.835-2.51c.843.141 1.6.552 2.178 1.144h.004c.092.093.182.196.265.299l1.446-.851a3.176 3.176 0 0 1-.047-1.808 3.149 3.149 0 0 1 1.456-1.926l.025-.016a3.062 3.062 0 0 1 2.345-.306c.77.21 1.465.721 1.898 1.482v.002c.431.757.518 1.626.313 2.408a3.145 3.145 0 0 1-1.456 1.928l-.198.118h-.02a3.095 3.095 0 0 1-2.154.201 3.127 3.127 0 0 1-1.514-.944l-1.444.848a4.162 4.162 0 0 1 0 2.879l1.444.846c.413-.47.939-.789 1.514-.944a3.041 3.041 0 0 1 2.371.319l.048.023v.002a3.17 3.17 0 0 1 1.408 1.906 3.215 3.215 0 0 1-.313 2.405l-.026.053-.003-.005a3.147 3.147 0 0 1-1.867 1.436 3.096 3.096 0 0 1-2.371-.318v-.006a3.156 3.156 0 0 1-1.456-1.927 3.175 3.175 0 0 1 .047-1.805l-1.446-.848a3.905 3.905 0 0 1-.265.294l-.004.005a3.938 3.938 0 0 1-2.178 1.138v1.699a3.09 3.09 0 0 1 1.56.862l.002.004c.565.572.914 1.368.914 2.243 0 .873-.35 1.664-.914 2.239l-.002.009a3.1 3.1 0 0 1-2.21.931 3.1 3.1 0 0 1-2.206-.93h-.002v-.009a3.186 3.186 0 0 1-.916-2.239c0-.875.35-1.672.916-2.243v-.004h.002a3.1 3.1 0 0 1 1.558-.862v-1.699a3.926 3.926 0 0 1-2.176-1.138l-.006-.005a4.098 4.098 0 0 1-1.173-2.874c0-1.122.452-2.136 1.173-2.872h.006a3.947 3.947 0 0 1 2.176-1.144V6.289a3.137 3.137 0 0 1-1.558-.864h-.002v-.004a3.192 3.192 0 0 1-.916-2.243c0-.871.35-1.669.916-2.243l.002-.002A3.084 3.084 0 0 1 8.683 0c.861 0 1.641.355 2.21.932v.002h.002c.565.574.914 1.372.914 2.243 0 .876-.35 1.667-.914 2.243l-.002.005a3.142 3.142 0 0 1-1.56.864v1.692zm8.121-1.129l-.012-.019a1.452 1.452 0 0 0-.87-.668 1.43 1.43 0 0 0-1.103.146h.002c-.347.2-.58.529-.677.896-.095.365-.054.768.146 1.119l.007.009c.2.347.519.579.874.673.357.103.755.059 1.098-.144l.019-.009a1.47 1.47 0 0 0 .657-.885 1.493 1.493 0 0 0-.141-1.118","scikitlearn":"M15.601 5.53c-1.91.035-3.981.91-5.63 2.56-2.93 2.93-2.083 8.53-1.088 9.525.805.804 6.595 1.843 9.526-1.088a9.74 9.74 0 0 0 .584-.643c.043-.292.205-.66.489-1.106a1.848 1.848 0 0 1-.537.176c-.144.265-.37.55-.676.855-.354.335-.607.554-.76.656a.795.795 0 0 1-.437.152c-.35 0-.514-.308-.494-.924-.22.316-.425.549-.612.7a.914.914 0 0 1-.578.224c-.194 0-.36-.09-.496-.273a1.03 1.03 0 0 1-.193-.507 4.016 4.016 0 0 1-.726.583c-.224.132-.47.197-.74.197-.3 0-.543-.096-.727-.288a.978.978 0 0 1-.257-.524v.004c-.3.276-.564.48-.79.611a1.295 1.295 0 0 1-.649.197.693.693 0 0 1-.571-.275c-.145-.183-.218-.43-.218-.739 0-.464.101-1.02.302-1.67.201-.65.445-1.25.733-1.797l.842-.312a.21.21 0 0 1 .06-.013c.063 0 .116.047.157.14.04.095.061.221.061.38 0 .451-.104.888-.312 1.31-.207.422-.532.873-.974 1.352-.018.23-.027.388-.027.474 0 .193.036.345.106.458.071.113.165.169.282.169a.71.71 0 0 0 .382-.13c.132-.084.333-.26.602-.523.028-.418.187-.798.482-1.142.324-.38.685-.569 1.08-.569.206 0 .37.054.494.16a.524.524 0 0 1 .186.417c0 .458-.486.829-1.459 1.114.088.43.32.646.693.646a.807.807 0 0 0 .417-.117c.129-.076.321-.243.575-.497.032-.252.118-.495.259-.728.182-.3.416-.544.701-.73.285-.185.537-.278.756-.278.276 0 .47.127.58.381l.677-.374h.186l-.292.971c-.15.488-.226.823-.226 1.004 0 .19.067.285.202.285.086 0 .181-.045.285-.137.104-.092.25-.232.437-.42v.001c.143-.155.274-.32.392-.494-.19-.084-.285-.21-.285-.375 0-.17.058-.352.174-.545.116-.194.275-.29.479-.29.172 0 .258.088.258.265 0 .139-.05.338-.149.596.367-.04.687-.32.961-.842l.228-.01c1.059-2.438.828-5.075-.83-6.732-1.019-1.02-2.408-1.5-3.895-1.471zm4.725 8.203a8.938 8.938 0 0 1-1.333 2.151 1.09 1.09 0 0 0-.012.147c0 .168.047.309.14.423.092.113.206.17.34.17.296 0 .714-.264 1.254-.787-.001.04-.003.08-.003.121 0 .146.012.368.036.666l.733-.172c0-.2.003-.357.01-.474.01-.157.033-.33.066-.517.02-.11.07-.216.152-.315l.186-.216a5.276 5.276 0 0 1 .378-.397c.062-.055.116-.099.162-.13a.26.26 0 0 1 .123-.046c.055 0 .083.035.083.106 0 .07-.052.236-.156.497-.194.486-.292.848-.292 1.084 0 .175.046.314.136.418a.45.45 0 0 0 .358.155c.365 0 .803-.269 1.313-.808v-.381c-.361.426-.623.64-.784.64-.109 0-.163-.067-.163-.2 0-.1.065-.316.195-.65.19-.486.285-.836.285-1.048a.464.464 0 0 0-.112-.319.36.36 0 0 0-.282-.127c-.165 0-.354.077-.567.233-.213.156-.5.436-.863.84.053-.262.165-.622.335-1.08l-.809.156a6.54 6.54 0 0 0-.399 1.074c-.04.156-.07.316-.092.48a7.447 7.447 0 0 1-.49.45.38.38 0 0 1-.229.08.208.208 0 0 1-.174-.082.352.352 0 0 1-.064-.222c0-.1.019-.214.056-.343.038-.13.12-.373.249-.731l.308-.849zm-17.21-2.927c-.863-.016-1.67.263-2.261.854-1.352 1.352-1.07 3.827.631 5.527 1.7 1.701 4.95 1.21 5.527.632.467-.466 1.07-3.827-.631-5.527-.957-.957-2.158-1.465-3.267-1.486zm12.285.358h.166v.21H15.4zm.427 0h.166v.865l.46-.455h.195l-.364.362.428.684h-.198l-.357-.575-.164.166v.41h-.166zm1.016 0h.166v.21h-.166zm.481.122h.166v.288h.172v.135h-.172v.717c0 .037.006.062.02.075.012.013.037.02.074.02a.23.23 0 0 0 .078-.01v.141a.802.802 0 0 1-.136.014.23.23 0 0 1-.15-.043.15.15 0 0 1-.052-.123v-.79h-.141v-.136h.141zm-3.562.258c.081 0 .15.012.207.038.057.024.1.061.13.11s.045.106.045.173h-.176c-.006-.111-.075-.167-.208-.167a.285.285 0 0 0-.164.041.134.134 0 0 0-.06.117c0 .035.015.065.045.088.03.024.08.044.15.06l.16.039a.47.47 0 0 1 .224.105c.047.046.07.108.07.186a.3.3 0 0 1-.052.175.327.327 0 0 1-.152.116.585.585 0 0 1-.226.041c-.136 0-.24-.03-.309-.088-.069-.059-.105-.149-.109-.269h.176c.004.037.01.065.017.084a.166.166 0 0 0 .034.054c.044.043.112.065.204.065a.31.31 0 0 0 .177-.045.139.139 0 0 0 .067-.119.116.116 0 0 0-.038-.09.287.287 0 0 0-.124-.055l-.156-.038a1.248 1.248 0 0 1-.159-.05.359.359 0 0 1-.098-.061.22.22 0 0 1-.058-.083.32.32 0 0 1-.016-.108c0-.096.036-.174.109-.232a.45.45 0 0 1 .29-.087zm1.035 0a.46.46 0 0 1 .202.043.351.351 0 0 1 .187.212.577.577 0 0 1 .023.126h-.168a.256.256 0 0 0-.078-.168.242.242 0 0 0-.17-.06.248.248 0 0 0-.155.05.306.306 0 0 0-.1.144.662.662 0 0 0-.034.224.58.58 0 0 0 .035.214.299.299 0 0 0 .101.135.261.261 0 0 0 .157.048c.142 0 .227-.084.256-.252h.167a.519.519 0 0 1-.065.22.35.35 0 0 1-.146.138.464.464 0 0 1-.216.048.448.448 0 0 1-.246-.066.441.441 0 0 1-.161-.192.703.703 0 0 1-.057-.293c0-.085.01-.163.032-.233a.522.522 0 0 1 .095-.182.403.403 0 0 1 .15-.117.453.453 0 0 1 .191-.04zm.603.03h.166v1.046H15.4zm1.443 0h.166v1.046h-.166zm-5.05.618c-.08 0-.2.204-.356.611-.155.407-.308.977-.459 1.71.281-.312.509-.662.683-1.05.175-.387.262-.72.262-.999a.455.455 0 0 0-.036-.197c-.025-.05-.056-.075-.093-.075zm4.662 1.797c-.221 0-.431.188-.629.563-.197.376-.296.722-.296 1.038 0 .12.029.216.088.29a.273.273 0 0 0 .223.111c.221 0 .43-.188.625-.565.196-.377.294-.725.294-1.043a.457.457 0 0 0-.083-.29.269.269 0 0 0-.222-.104zm-2.848.007c-.146 0-.285.11-.417.333-.133.222-.2.51-.2.866.566-.159.849-.452.849-.881 0-.212-.077-.318-.232-.318Z","amazons3":"M20.913 13.147l.12-.895c.947.576 1.258.922 1.354 1.071-.16.031-.562.046-1.474-.176zm-2.174 7.988a.547.547 0 0 0-.005.073c0 .084-.207.405-1.124.768a10.28 10.28 0 0 1-1.438.432c-1.405.325-3.128.504-4.853.504-4.612 0-7.412-1.184-7.412-1.704a.547.547 0 0 0-.005-.073L1.81 5.602c.135.078.28.154.432.227.042.02.086.038.128.057.134.062.272.122.417.18l.179.069c.154.058.314.114.478.168.043.013.084.029.13.043.207.065.423.127.646.187l.176.044c.175.044.353.087.534.127a23.414 23.414 0 0 0 .843.17l.121.023c.252.045.508.085.768.122.071.011.144.02.216.03.2.027.4.053.604.077l.24.027c.245.026.49.05.74.07l.081.009c.275.022.552.04.83.056l.233.012c.21.01.422.018.633.025a33.088 33.088 0 0 0 2.795-.026l.232-.011c.278-.016.555-.034.83-.056l.08-.008c.25-.02.497-.045.742-.072l.238-.026c.205-.024.408-.05.609-.077.07-.01.141-.019.211-.03.261-.037.519-.078.772-.122l.111-.02c.215-.04.427-.082.634-.125l.212-.047c.186-.041.368-.085.546-.13l.166-.042c.225-.06.444-.122.654-.189.04-.012.077-.026.115-.038a10.6 10.6 0 0 0 .493-.173c.058-.021.114-.044.17-.066.15-.06.293-.12.43-.185.038-.017.079-.034.116-.052.153-.073.3-.15.436-.228l-.976 7.245c-2.488-.78-5.805-2.292-7.311-3a1.09 1.09 0 0 0-1.088-1.085c-.6 0-1.088.489-1.088 1.088 0 .6.488 1.089 1.088 1.089.196 0 .378-.056.537-.148 1.72.812 5.144 2.367 7.715 3.15zm-7.42-20.047c5.677 0 9.676 1.759 9.75 2.736l-.014.113c-.01.033-.031.067-.048.101-.015.028-.026.057-.047.087-.024.033-.058.068-.09.102-.028.03-.051.06-.084.09-.038.035-.087.07-.133.105-.04.03-.074.06-.119.091-.053.036-.116.071-.177.107-.05.03-.095.06-.15.09-.068.036-.147.073-.222.11-.059.028-.114.057-.177.085-.084.038-.177.074-.268.111-.068.027-.13.054-.203.082-.097.036-.205.072-.31.107-.075.026-.148.053-.228.079-.111.035-.233.069-.35.103-.085.024-.165.05-.253.073-.124.034-.258.065-.389.098-.093.022-.181.046-.278.068-.139.032-.287.061-.433.091-.098.02-.191.041-.293.06-.155.03-.32.057-.482.084-.1.018-.198.036-.302.052-.166.026-.342.048-.515.072-.11.014-.213.03-.325.044-.181.023-.372.041-.56.06-.11.012-.218.025-.332.036-.188.016-.386.029-.58.043-.122.009-.24.02-.364.028-.207.012-.422.02-.635.028-.12.005-.234.012-.354.016a35.605 35.605 0 0 1-2.069 0c-.12-.004-.234-.011-.352-.016-.214-.008-.43-.016-.637-.028-.122-.008-.238-.02-.36-.027-.195-.015-.394-.028-.584-.044-.11-.01-.215-.024-.324-.035-.19-.02-.384-.038-.568-.06l-.315-.044c-.176-.024-.355-.046-.525-.073-.1-.015-.192-.033-.29-.05-.167-.028-.335-.055-.494-.086-.096-.018-.183-.038-.276-.056-.151-.032-.305-.062-.45-.095-.09-.02-.173-.043-.26-.064-.138-.034-.277-.067-.407-.102-.082-.022-.157-.046-.235-.069a11.75 11.75 0 0 1-.368-.108c-.075-.024-.141-.049-.213-.073-.11-.037-.223-.075-.325-.113-.067-.025-.125-.051-.188-.077-.096-.038-.195-.076-.282-.115-.06-.027-.11-.054-.166-.08-.08-.039-.162-.077-.233-.116-.052-.028-.094-.055-.142-.084-.063-.038-.13-.075-.185-.113-.043-.029-.075-.058-.113-.086-.048-.037-.098-.073-.139-.11-.032-.029-.054-.057-.08-.087-.033-.035-.069-.07-.093-.104-.02-.03-.031-.058-.046-.086-.018-.035-.039-.068-.049-.102l-.015-.113c.076-.977 4.074-2.736 9.748-2.736zm12.182 12.124c-.118-.628-.84-1.291-2.31-2.128l.963-7.16a.531.531 0 0 0 .005-.073C22.16 1.581 16.447 0 11.32 0 6.194 0 .482 1.581.482 3.851a.58.58 0 0 0 .005.072L2.819 21.25c.071 2.002 5.236 2.75 8.5 2.75 1.805 0 3.615-.188 5.098-.531.598-.138 1.133-.3 1.592-.48 1.18-.467 1.789-1.053 1.813-1.739l.945-7.018c.557.131 1.016.197 1.389.197.54 0 .902-.137 1.134-.413a.956.956 0 0 0 .21-.804Z","coursera":"M11.374 23.977c-4.183-.21-8.006-2.626-9.959-6.347-2.097-3.858-1.871-8.864.732-12.454C4.748 1.338 9.497-.698 14.281.23c4.583.857 8.351 4.494 9.358 8.911 1.122 4.344-.423 9.173-3.925 12.04-2.289 1.953-5.295 2.956-8.34 2.797zm7.705-8.05a588.737 588.737 0 0 0-3.171-1.887c-.903 1.483-2.885 2.248-4.57 1.665-2.024-.639-3.394-2.987-2.488-5.134.801-2.009 2.79-2.707 4.357-2.464a4.19 4.19 0 0 1 2.623 1.669c1.077-.631 2.128-1.218 3.173-1.855-2.03-3.118-6.151-4.294-9.656-2.754-3.13 1.423-4.89 4.68-4.388 7.919.54 3.598 3.73 6.486 7.716 6.404a7.664 7.664 0 0 0 6.404-3.563z","googledatastudio":"M19.197 23.002c-1.016-.613-1.697-1.728-1.697-3 0-1.273.681-2.388 1.697-3h-6.909a3.034 3.034 0 0 0-.252-.011c-1.656 0-3.022 1.355-3.036 3.011v.014c0 1.645 1.354 3 3 3 .096 0 .192-.005.288-.014h6.909Zm1.803-6c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3Zm-10.803-2.004c-1.016-.613-1.697-1.728-1.697-3 0-1.273.681-2.388 1.697-3H3.288a3.034 3.034 0 0 0-.252-.011C1.38 8.987.014 10.342 0 11.998v.014c0 1.645 1.354 3 3 3 .096 0 .192-.005.288-.014h6.909Zm1.803-6c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3Zm7.197-2.004c-1.016-.613-1.697-1.728-1.697-3 0-1.273.681-2.388 1.697-3h-6.909c-.08-.006-.16-.01-.24-.01C10.39.984 9.021 2.336 9 3.994v.014c0 1.645 1.354 3 3 3 .096 0 .192-.005.288-.014h6.909Zm1.803-6c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3Z","sap":"M0 6.064v11.872h12.13L24 6.064zm3.264 2.208h.005c.863.001 1.915.245 2.676.633l-.82 1.43c-.835-.404-1.255-.442-1.73-.467-.708-.038-1.064.215-1.069.488-.007.332.669.633 1.305.838.964.306 2.19.715 2.377 1.9L7.77 8.437h2.046l2.064 5.576-.007-5.575h2.37c2.257 0 3.318.764 3.318 2.519 0 1.575-1.09 2.514-2.936 2.514h-.763l-.01 2.094-3.588-.003-.25-.908c-.37.122-.787.189-1.23.189-.456 0-.885-.071-1.263-.2l-.358.919-2 .006.09-.462c-.029.025-.057.05-.087.074-.535.43-1.208.629-2.037.644l-.213.002a5.075 5.075 0 0 1-2.581-.675l.73-1.448c.79.467 1.286.572 1.956.558.347-.007.598-.07.761-.239a.557.557 0 0 0 .156-.369c.007-.376-.53-.553-1.185-.756-.531-.164-1.135-.389-1.606-.735-.559-.41-.825-.924-.812-1.65a1.99 1.99 0 0 1 .566-1.377c.519-.537 1.357-.863 2.363-.863zm10.597 1.67v1.904h.521c.694 0 1.247-.23 1.248-.964 0-.709-.554-.94-1.248-.94zm-5.087.767l-.748 2.362c.223.085.481.133.757.133.268 0 .52-.047.742-.126l-.736-2.37z"};
const ICON={
 "BigQuery":["googlebigquery","4285F4"],"Cloud Storage":["googlecloudstorage","4285F4"],"Dataproc":["googledataproc","4285F4"],
 "Cloud IAM":["googlecloud","4285F4"],"Compute Engine":["googlecloud","4285F4"],"Cloud Functions":["googlecloud","4285F4"],
 "Airbyte":["airbyte","615EFF"],"Airflow":["apacheairflow","017CEE"],"dbt":["dbt","FF694B"],"Python":["python","3776AB"],
 "LookML":["looker","4285F4"],"Looker":["looker","4285F4"],"GA4":["googleanalytics","E37400"],"Google Ads":["googleads","4285F4"],
 "Shopify":["shopify","7AB55C"],"Brevo":["brevo","0B996E"],"Git":["git","F05032"],"GitHub":["github","181717"],"GitLab":["gitlab","FC6D26"],
 "JIRA / Confluence":["jira","0052CC"],"Databricks":["databricks","FF3621"],"Docker":["docker","2496ED"],"Kafka":["apachekafka","231F20"],
 "Machine learning":["scikitlearn","F7931E"]
};
const IMGI={"Funnel":"funnel","Stitch":"stitch","Hightouch":"hightouch","Kestra":"kestra","Mage AI":"mage","Elementary":"elementarydata","Spotfire":"spotfire","Power BI":"microsoft-power-bi","Klaviyo":"klaviyo","Compute Engine":"google-compute-engine","Cloud Functions":"google-cloud-functions"};
Object.assign(ICON,{"SAP":["sap","0FAAFF"],"Cloud IAM":["googlecloud","4285F4"],"Dataform":["googlecloud","4285F4"],"Looker Studio":["googledatastudio","669DF6"]});
delete ICON["Compute Engine"];delete ICON["Cloud Functions"];
const GLYPH={
 "SQL":'<svg class="pf-ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="var(--accent)" stroke-width="1.8"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
 "API / SFTP":'<svg class="pf-ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-3-3M20 16H7l3 3"/></svg>'
};
const IMG=k=>(window.DDA_IMG||{})[k]||"";
const dark=h=>{const n=parseInt(h,16),r=n>>16,g=n>>8&255,b=n&255;return (0.2126*r+0.7152*g+0.0722*b)<60;};
const siSvg=(slug,hex,cls)=>{const c=dark(hex)?"var(--ink)":"#"+hex;return `<svg class="${cls||"pf-ic"}" viewBox="0 0 24 24" aria-hidden="true" style="fill:${c}"><path d="${SIP[slug]}"/></svg>`;};
const toolIcon=nm=>{if(GLYPH[nm])return GLYPH[nm];if(IMGI[nm])return `<img class="pf-ic" src="${IMG(IMGI[nm])}" alt="">`;
  const ic=ICON[nm];return ic?siSvg(ic[0],ic[1]):"";};
const anyIcon=(spec,cls)=>{const [k,a,b]=spec.split(":");return k==="si"?siSvg(a,b,cls):`<img class="${cls}" src="${IMG(a)}" alt="">`;};
const lvBadge=l=>`<span class="pf-lv ${l}" title="${esc(U("lv")[l])}"><i></i><i></i><i></i></span>`;

/* ---------- views ---------- */
function stackView(){
  const caps=P.caps.map(c=>{const [h,p]=c[lang];const d=c.d?D[c.d]:null;const ns=d?inDomain(c.d).slice(0,3):[];
    return `<div class="pf-cap" style="--c:${d?d.color:"var(--mark)"}"><h3>${esc(h)}</h3><p>${esc(p)}</p>${ns.length?`<div class="pf-proof"><span class="eyebrow">${U("proof")}</span>${noteLinks(ns)}</div>`:""}</div>`;}).join("");
  const cats=P.cats.filter(c=>toolCat==="all"||c.id===toolCat).map(c=>`<div class="pf-group"><div class="eyebrow">${esc(c.n[lang])}</div>${c.t.map(([nm,l])=>{const k=toolNotes(nm);
    return `<button class="pf-tool" ${k?`data-pfq="${esc(nm)}"`:"disabled"}><span class="nm">${toolIcon(nm)}${esc(nm)}</span><span class="meta"><span class="ct">${U("inNotes")(k)}</span>${lvBadge(l)}</span></button>`;}).join("")}</div>`).join("");
  return `<div class="eyebrow">${U("stackEye")}</div><h1>${U("stackH")}</h1><p class="intro">${U("stackIntro")}</p>
  <div class="pf-caps">${caps}</div>
  <div class="section-h"><h2>${U("toolH")}</h2></div><p class="intro" style="margin-top:0">${U("toolIntro")}</p>
  <div class="pf-filter" role="group">${[["all",U("all")],...P.cats.map(c=>[c.id,c.n[lang]])].map(([id,n])=>`<button data-pfcat="${id}" aria-pressed="${toolCat===id}">${esc(n)}</button>`).join("")}</div>
  <div class="pf-legend">${["core","used","learn"].map(l=>`<span>${lvBadge(l)}<b>${U("lv")[l]}</b> ${U("lvd")[l]}</span>`).join("")}</div>
  <div class="pf-groups">${cats}</div>`;
}
function workView(){
  const exp=P.exp.map(e=>`<div class="pf-row"><img class="pf-logo" src="${IMG(e.logo)}" alt="${esc(e.org)}"><div class="pf-body"><div class="pf-top"><h3>${esc(e.role[lang])}</h3><span class="when">${ym(e.from)} – ${ym(e.to)}</span></div><div class="org">${esc(e.org)}</div>
    <div class="pf-kw">${e.kw[lang].map(k=>`<span>${esc(k)}</span>`).join("")}</div>
    <div class="pf-layers">${P.layers.filter(([k])=>e.tools[k]).map(([k,n])=>`<span class="ly">${esc(n[lang])}</span><div class="pf-tl">${e.tools[k].map(t=>`<span>${toolIcon(t)}${esc(t)}</span>`).join("")}</div>`).join("")}</div></div></div>`).join("");
  const edu=P.edu.map(e=>`<div class="pf-row slim"><img class="pf-logo" src="${IMG(e.logo)}" alt="${esc(e.school)}"><div class="pf-body"><div class="pf-top"><h3>${esc(e.school)}</h3><span class="when">${e.years}</span></div><div class="org">${esc(e.d[lang])}</div></div></div>`).join("");
  const certs=P.certs.map(c=>`<div class="pf-cert">${anyIcon(c.ic,"pf-cic")}<div><b>${esc(c.n)}</b><span>${esc(c.by)} · ${ym(c.d)}</span></div></div>`).join("");
  return `<div class="eyebrow">${U("workEye")}</div>
  <div class="section-h" style="margin-top:6px"><h2>${U("expH")}</h2></div><div class="pf-list">${exp}</div>
  <div class="section-h"><h2>${U("eduH")}</h2></div><div class="pf-list">${edu}</div>
  <div class="section-h"><h2>${U("certH")}</h2></div><div class="pf-certs">${certs}</div>`;
}
function projView(){
  const f=P.feat,c=f[lang];
  const shots=f.shots.map((src,k)=>`<figure class="pf-shot${k===0?" big":""}"><button data-pfshot="${k}" aria-label="${esc(c.caps[k])}"><img src="${src}" alt="${esc(c.caps[k])}" loading="lazy"></button><figcaption>${esc(c.caps[k])}</figcaption></figure>`).join("");
  const side=P.side.map(s=>{const [h,p]=s[lang];return `<div class="pf-cap"><h3>${esc(h)}</h3><p>${esc(p)}</p><div class="tagrow">${s.tags.map(x=>`<span class="tag stack">${esc(x)}</span>`).join("")}</div>${s.url?`<a href="${s.url}" target="_blank" rel="noopener">${U("open")}</a>`:""}</div>`;}).join("");
  return `<div class="eyebrow">${U("projEye")}</div><h1>${U("projH")}</h1><p class="intro">${U("projIntro")}</p>
  <section class="pf-feat"><div class="eyebrow">★ ${U("feat")}</div><h2>${esc(c.t)}</h2><div class="pf-sub">${esc(c.sub)}</div><p>${esc(c.txt)}</p>
   <div class="tagrow">${f.tags.map(x=>`<span class="tag stack">${esc(x)}</span>`).join("")}</div>
   <div class="pf-shots">${shots}</div></section>
  <div class="pf-side">${side}</div>
  <dialog class="pf-lb" id="pflb"><button class="x" data-pflbclose aria-label="Close">×</button><img alt=""><p></p></dialog>`;
}

/* ---------- hook into the site ---------- */
const PV=["stack","work","proj"];
const baseRender=render, baseSide=renderSide;
window.renderSide=function(){
  baseSide();
  const me=!q&&PV.includes(view.kind);
  let sw=document.getElementById("pfswitch");
  if(!sw){sw=document.createElement("div");sw.id="pfswitch";sw.className="pf-switch";sw.setAttribute("role","group");
    const nav=document.getElementById("nav");nav.parentNode.insertBefore(sw,document.querySelector(".search"));}
  sw.innerHTML=`<button data-go="home" aria-pressed="${!me}">${esc(U("kb"))}</button><button data-go="stack" aria-pressed="${me}">${esc(U("me"))}</button>`;
  document.querySelector(".search").style.display=me?"none":"";
  if(me) document.getElementById("nav").innerHTML=
    [["stack",U("stack")],["work",U("work")],["proj",U("proj")]].map(([k,l])=>`<button data-go="${k}" aria-current="${view.kind===k}"><span class="lbl">${esc(l)}</span></button>`).join("");
};
window.render=function(){
  if(!q&&PV.includes(view.kind)){
    document.getElementById("main").innerHTML=view.kind==="stack"?stackView():view.kind==="work"?workView():projView();
    renderSide();
  } else baseRender();
};
document.addEventListener("click",e=>{
  const c=e.target.closest("[data-pfcat]");if(c){toolCat=c.dataset.pfcat;render();return;}
  const sh=e.target.closest("[data-pfshot]");if(sh){const k=+sh.dataset.pfshot,d=document.getElementById("pflb");d.querySelector("img").src=P.feat.shots[k];d.querySelector("p").textContent=P.feat[lang].caps[k];d.showModal();return;}
  if(e.target.closest("[data-pflbclose]")||e.target.id==="pflb"){document.getElementById("pflb").close();return;}
  const t=e.target.closest("[data-pfq]");if(t){q=t.dataset.pfq;const inp=document.getElementById("q");inp.value=q;render();window.scrollTo({top:0});}
});
const fromHash=()=>{try{const h=location.hash.slice(1);if(PV.includes(h)){view={kind:h};return true;}}catch(e){}return false;};
window.addEventListener("hashchange",()=>{if(fromHash()){render();window.scrollTo({top:0});}});
fromHash();
render();
})();
