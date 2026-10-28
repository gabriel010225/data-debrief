/* Data Debrief — weekly note loader.
   index.html holds the base notes. Each new note lives in its own small file
   (dd-note-YYYY-MM-DD-<activityId>.js) listed in dd-notes.json, and calls DD.add({...}). */
(function(){
  if (typeof notes === "undefined") return;
  window.DD = {
    add(o){
      const id = o.post.id;
      if (byId[id]) return;
      if (o.concepts) Object.assign(CONCEPTS, o.concepts);
      if (o.figl) Object.assign(FIGL, o.figl);
      if (o.fig) Object.assign(FIG, o.fig);
      if (o.series) for (const [k, v] of Object.entries(o.series)) {
        if (SERIES[k]) (v.ids || []).forEach(x => { if (!SERIES[k].ids.includes(x)) SERIES[k].ids.push(x); });
        else SERIES[k] = v;
      }
      NOTES[id] = o.note;
      const lines = o.post.text.split("\n").map(s => s.trim()).filter(Boolean);
      if (lines.length && lines[lines.length - 1].startsWith("#")) lines.pop();
      const n = { also: [], ...o.note, id, date: o.post.date, olang: o.post.olang || "en", orig: lines, raw: o.post.text };
      notes.push(n); byId[id] = n;
      n.concepts.forEach(c => (conceptNotes[c] = conceptNotes[c] || []).push(id));
    }
  };
  const load = src => new Promise(res => { const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = res; document.body.appendChild(s); });
  fetch("dd-notes.json", { cache: "no-store" }).then(r => r.ok ? r.json() : { files: [] }).then(async m => {
    const v = m.version || Date.now();
    for (const f of m.files || []) await load(f + "?v=" + v);
    notes.sort((a, b) => b.date.localeCompare(a.date));
    notes.forEach((n, i) => n.order = i);
    try {
      const h = location.hash.slice(1), mm = h.match(/^(domain|note)-(.+)$/);
      if (mm && (mm[1] === "domain" ? D[mm[2]] : byId[mm[2]])) view = { kind: mm[1], id: mm[2] };
    } catch (e) {}
    render();
  }).catch(() => {});
})();
