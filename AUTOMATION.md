# Data Debrief: weekly import runbook

Lingzhe posts on LinkedIn every Wednesday around 08:30 (Europe/Paris). A scheduled
Claude task runs shortly after and follows this file.

## Where things live

- `index.html`: the site, with the base notes (Jan–Oct 2026) built in. Do not rewrite it.
- `dd-loader.js`: loads every file listed in `dd-notes.json` and adds it to the site.
- `dd-notes.json`: `{"version": N, "files": [...]}`, one entry per extra note, oldest first.
- `dd-note-YYYY-MM-DD-<activityId>.js`: one file per imported post, calling `DD.add({...})`.

## 1. Find posts that are not on the site yet

1. Clone the public repo (read access needs no credentials):
   `git clone https://github.com/gabriel010225/data-debrief`
2. Collect the LinkedIn activity IDs already imported: every 19-digit id in `index.html`
   and in the `dd-note-*.js` files.
3. In the user's Chrome, open https://www.linkedin.com/in/lingzhe-huang/recent-activity/all/
   Each post is a `main [role=listitem]` whose text starts with "Post du fil d’actualité";
   its id is in the HTML as `urn:li:activity:<id>`. Click the "… plus" buttons to expand text.
4. Keep only posts that are (a) written by Lingzhe, not reposts ("a republié ce contenu"),
   (b) not already imported, and (c) not in the skip list below.
5. Date: LinkedIn shows relative dates ("52 min", "1 sem", "3 sem"); convert to the actual
   calendar date (posts are published on Wednesdays).

Skip list (never import):
- `7516022580001230848`: 14 Oct 2026, the post introducing the Data Debrief site itself.

If there is nothing new, stop and report "no new post".

## 2. Write one note file per post

Copy the structure of an existing `dd-note-*.js` file exactly. Required content:

- `post`: `{id, date: "YYYY-MM-DD", olang: "en" | "fr", text}`, the full original post
  text including the hashtag line (escape backticks).
- `note`: `domain` (one of `semantic`, `modeling`, `orchestration`, `business`, `platform`),
  `also` (other domains), `stack` (tools), `concepts` (keys; reuse existing keys from
  `CONCEPTS` in index.html when they fit, add new ones in `concepts:{key:{en,zh,fr}}`),
  optional `series` key, optional `fig` name, and `en` / `zh` / `fr` blocks, each with
  `title`, `tldr`, `context`, `problem`, `approach` (3–5 items), `principles`
  (2–3 `[heading, sentence]` pairs).
- Writing rules: stay faithful to the post; do not invent client names, numbers or results.
  The "approach" may generalise the lesson but must not claim actions the post doesn't
  imply. Plain, direct sentences. The Chinese and French must be natural, not literal.
- Diagram: add one only when it explains a mechanism (a flow, a table that goes wrong, a
  before/after). Define it in the same file with `figl:{name:{en:[...],zh:[...],fr:[...]}}`
  and `fig:{name:L=>svgWrap(w,h,...)}` using the helpers `R`, `T`, `Ln`, `svgWrap` and the
  existing CSS classes (`f-soft`, `f-accsoft`, `f-warn`, `f-t`, `f-s`, `f-mono-ink`, …).
  Mark invented example values as "Illustrative".

Then append the new file name to `dd-notes.json` and increase `version` by 1.

## 3. Test before publishing

Serve the folder (`python3 -m http.server`) and open it with Playwright (Chromium is at
`/opt/pw-browsers/chromium`). Check: no page errors; the new note opens with
`go('note:<id>')` in EN, 中文 and FR; the figure has no overlapping text; the page has no
horizontal scroll at 390 px width.

## 4. Publish through the user's Chrome (signed in to GitHub)

Pushing with git is not authorised for this repo, so upload through the browser:

1. Open https://github.com/gabriel010225/data-debrief/upload/main
2. With JavaScript in that page, build `File` objects for the new note file(s) and the
   updated `dd-notes.json` (pass each file's text as a JSON string literal), put them in a
   `DataTransfer`, and dispatch `dragenter`, `dragover`, `drop` on `document.documentElement`.
   Keep each JavaScript call under ~15 KB; for bigger content, store parts in `window`
   across several calls first.
3. Check the file names appear in the list, fill the commit message
   ("Add note: <English title>") with form input, click "Commit changes".
4. Wait about 2 minutes, open https://gabriel010225.github.io/data-debrief/#note-<id>
   and confirm the note shows.

## 5. Report

Send the user a short message: which posts were imported (date + title), which were
skipped and why, and the link to each new note. If any step failed (computer offline,
Chrome extension not connected, LinkedIn logged out, GitHub upload refused), say which
step and stop without partial publishing. The next run will pick the post up again.
