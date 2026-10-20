# Before you send — The Date Crew

[Live demo](https://diniiidinesh.github.io/tdcassignment/) · [Run the browser tests](https://diniiidinesh.github.io/tdcassignment/tests.html)

A working static prototype that checks dealbreakers in both directions before a simulated send.
It ranks a shared people pool by two separately explained, weighted preference-fit scores.
Matchmakers can manage profiles and preferences, classify feedback, and approve learning suggestions.
A historical replay illustrates fewer avoidable sends without claiming causal acceptance uplift.

## Run locally

Keep the six files together: `index.html`, `styles.css`, `app.js`, `data.js`, `tests.html`, `README.md`.
Open `index.html` for the offline demo, or serve this directory:

```sh
python3 -m http.server 8080
```

Visit http://localhost:8080 and select **Run tests**. There is no installation, framework, build step, backend or required API key. For optional live LLM calls, use localhost or HTTPS. Browser storage is optional: every localStorage read, write and removal is inside try/catch. When storage is unavailable, the app continues in memory. API keys are never saved to storage or included in exports.

## Deploy on GitHub Pages in five steps

1. Create a GitHub repository for the assignment.
2. Commit all six files to the repository root on `main`, uploading the folder contents rather than the enclosing folder.
3. Open the repository's **Settings → Pages**.
4. Choose **Deploy from a branch**, select **main** and **/(root)**, and save.
5. Wait for deployment, open the reported URL and verify `tests.html` and the named assignment fixture. Never upload an API key.

## Assumptions to validate with TDC before submission

These assumptions are also visible under **People & data → Assignment assumptions & how ownership works**.

- **One shared database:** every person has one structured record in a common pool. A TDC client can appear as a candidate for another TDC client; a person is not duplicated into a separate client database.
- **Assigned clients:** paying TDC clients have a current owner, Matchmaker A or B. A matchmaker owns the client relationship rather than a private candidate database. The five seeded client assignments alternate A/B/A/B/A.
- **Sourced profiles:** non-client profiles carry a source such as Shaadi, Jeevansathi, Referral or Other and do not have a client-owner matchmaker. Source tags are fictional provenance for the demo. No website has been scraped, connected or imported automatically; permission and provenance would need checking for real integrations.
- **Operator versus owner:** the operator records who performed a send; it can differ from the client's currently assigned owner to support staff cover. The dropdown simulates operator context. It is not login, authorization or an access restriction. All demo operators can inspect the same pool.
- **Prototype boundary:** this app has a shared in-browser model, not a multiuser server database. Changes persist in this browser when storage is available. Other devices, browsers or users do not receive those changes automatically. JSON export/import supports manual transfer. A real backend is needed for cross-device synchronization and authenticated staff accounts.
- **Matching population:** partner gender is an explicit, editable dealbreaker in the live seed records, never an implicit inference from the person's gender. Every other gate rule is also stated explicitly. Self-matches are excluded.
- **Ranking:** sort first by fit against the selected client's preferences, then by the selected client's fit against the other person's preferences. Reverse fit breaks forward-score ties, not the other way round. This is not a blended mutual score or a probability of acceptance. Confirm with TDC whether a future product should instead prioritize balanced mutual fit.
- **Names and original fixture:** all names are fictional full names. Advaith Hegde is assignment Candidate A; Rishabh Malhotra is B; Chirag Kulkarni is C. The full database is now shown by default as requested. All people are always evaluated; the assignment-only filter has been removed. Their exact numeric case remains covered by tests.

## People and data management

The live seed database contains **35 people**: five assigned TDC clients plus 30 sourced profiles. Every seeded person has their own structured attributes, dealbreakers and weighted soft preferences. `data.js` also retains immutable baseline client/candidate fixtures for the assignment tests and historical replay; UI edits never mutate those reference fixtures.

**People & data** provides search by name/city/mother tongue, type/owner/source filters, every structured attribute, and complete partner preferences. Add people, edit profile data or manage anyone's preferences, including a sourced person's own preferences used for reverse scoring. **Work with client** selects a TDC client in the matching workspace. Both assigned clients and sourced prospects can appear as candidates.

New profiles require explicit values for name, gender, age, height, city, education, annual income, diet, smoking, drinking, children, marital status and mother tongue. Empty attributes are not guessed. Age must be an integer 18–100, height 48–90 inches, annual income 0–10,000 INR lakhs; enum values are checked, names must be 2–80 characters, city and mother tongue 1–60 characters. Bangalore is canonicalized to Bengaluru, and common demo cities are case-normalized. These broad numeric bounds are prototype data-quality constraints, not eligibility judgments. Extend them with TDC before real use.

A TDC client must use source TDC and have an owner A/B. A sourced profile must use a non-TDC source and have no assigned client owner. Record-type changes preselect appropriate ownership/source values, then validate them. At least one TDC client must remain. Stable IDs keep references intact when names change. Name alone is not treated as a unique identifier. Newly added people start with no partner preferences until those preferences are explicitly entered; missing reverse preferences show **Not stated**, never a fabricated 100%.

**Export people JSON** includes profiles and preferences, excluding API keys, rejection observations and staff activity. Import accepts the version 2 export format, validates all records and duplicate IDs before changing anything, then updates matching IDs and adds new IDs. It does not delete records absent from the file. Invalid imports leave all records unchanged. Limits are 2 MB per import and 2,000 live people. Browser storage is versioned and validated on load; invalid/unavailable stored data falls back to the seed model.

**Reset demo** has an explicit confirmation because it clears this prototype's saved people, reviews and recorded activity in the current browser. It restores the 35-person pool. Export people first to keep custom profiles. No real email is ever sent.

## Human-readable height

Profiles and candidate cards show feet plus inches together with centimetres, for example **5′11″ (180.3 cm)**. The profile editor and height preference controls offer **Feet + inches** or **Centimetres**, including both endpoints of height ranges. Changing the display unit alone does not change stored height or freshness. Feet must be a whole number and the inch component must be less than 12; the existing broad height bounds are displayed in both units. Internally heights remain in inches for backward compatibility with old records, imports and the original scoring fixture; conversions use exactly 2.54 cm per inch. This does not change the 2-inch near-miss tolerance or A/B/C scores. Fractional inches are supported for exact metric conversions.

## Profile freshness and external profile references

People lists, shortlists, blocked rows and expanded profiles show **Profile updated** in India time. `updatedAt` records changed local profile attributes or provenance; an unchanged save preserves it. Preference changes have a separate `preferencesUpdatedAt` timestamp, so changing a weight or moving a tier does not make the person's attributes appear fresh. Sending or rejecting does not update either timestamp. Seed dates are explicitly fictional. Legacy records/imports without dates show **Not recorded** rather than inventing a recent update.

The profile editor accepts an optional `sourceUrl`, `sourceProfileId` and manually reported `sourceUpdatedAt` in India time. Timestamps export as canonical UTC ISO strings and display in India time. Source update dates are not verified, scraped or automatically refreshed; a local edit is not evidence that an external profile is current. Seeded sourced profiles have clearly labelled dummy URLs on reserved `shaadi.example` / `jeevansathi.example` domains and DEMO profile IDs. These are illustrative links, not live accounts. Replace them with a real profile URL and uncheck the dummy-link flag when available. The source-domain validator permits these reserved sample hosts only when the dummy-link flag is set. Existing manually entered URLs and IDs are preserved. Links appear when supplied and open in a new tab; some sites require login. HTTPS is required, embedded credentials are rejected, and Shaadi/Jeevansathi links must match their selected source domains (including subdomains). IDs use letters, numbers, dots, underscores or hyphens. Invalid/future timestamps are rejected. Metadata persists and travels with people exports/imports; old version 2 exports without it remain compatible.

## Add, edit or remove preferences

Use **Client preferences → Add a preference**, or **People & data → Preferences** for anyone else. Choose dealbreaker or soft preference, a field, comparison and value; numeric fields support exact, minimum, maximum and inclusive range rules. Soft preferences also require an integer importance of 1–10.

Edit existing rule values and weights directly, temporarily disable a hard rule, or use its **Remove** button. Both scores and eligibility recalculate immediately. To change a rule's comparison, remove it and add the desired comparison. Duplicate fields within the same tier are rejected: age minimum and maximum should be one age range. A field can deliberately exist in both hard and soft tiers (e.g., a broad hard age range plus a narrower preferred age range). Categories, numeric bounds and range order are validated before mutation. Blank and invalid values do not overwrite an existing rule.

### Switching between dealbreakers and soft preferences

The field and condition define the preference; its tier defines how it is used. Use **Make dealbreaker** or **Make soft preference** on an existing rule, in either the client workspace or any person's Preferences editor. A short dialog explains the effect before **Apply change**. Moving to soft requires importance 1–10; a former soft weight is remembered when a preference temporarily becomes hard, otherwise the editable default is 5. Cancel makes no changes.

The move preserves the field, comparison, exact value/range and near-miss tolerance. It removes the rule from the original tier and adds it to the destination tier, activating it explicitly. A hard rule blocks and contributes no points; a soft rule contributes weighted points without blocking. Both sides of the gate and both fit scores update immediately. Stored tolerance has no effect while a rule is hard. If the destination tier already has a rule for the same field (possibly with a different threshold), the change is refused without modifying either rule; edit or remove the conflicting rule first. Historical snapshots are unchanged. Feedback suggestions still require manual approval and never move tiers automatically.

## Two-way gate and scoring formula

`MatchLogic` exports separately testable `meets`, `gate`, `credit`, `score`, `rank`, `classify`, `stated`, `suggestions`, `impact`, `makeHistory`, `validateRule`, `validatePerson`, `addRule`, `moveRule`, `asClient` and `mergePeople`. The UI uses these same functions. `app.js` also exports them through CommonJS; UI startup is skipped without the app element, as on `tests.html`.

Block a profile if it fails any active client dealbreaker OR the selected client fails any of that person's active dealbreakers. All failures show the rule and direction. Missing required fields fail the rule. Hard rules never earn near-miss leniency.

For an eligible candidate X and selected client Y:

```text
X fits Y = round(100 × Σ(Y's soft weight × credit for X's attribute) / Σ(Y's soft weights))
Y fits X = round(100 × Σ(X's soft weight × credit for Y's attribute) / Σ(X's soft weights))
credit = 1 if met; 0 if missed
near misses on: credit = 0.5 if a numeric miss is within tolerance
```

Near misses apply independently to both directions: height within 2 inches, income within 15% of the relevant boundary, or age within 1 year. Endpoints count. Categorical rules and exact-equality rules get no near-miss credit; partial credit is for minimum, maximum or range boundaries. With no soft preferences on a side, its score is unavailable and sorts below a stated score. Ranking compares unrounded ratios first: forward descending, then reverse descending, then numeric-aware person ID for deterministic ties. Two rounded displayed scores can therefore look tied while their full-precision scores differ. No global re-sort by reverse fit is performed.

Example with Ananya: Rishabh fits Ananya at **79% (19/24)**, while Ananya fits Rishabh at **100% (18/18)**. Each score panel explains its own met, missed and near-miss rules. The two denominators can differ because they belong to different people. Rohan and Varun both fit Ananya at **75% (18/24)**; Rohan ranks first among them because Ananya fits him at **53%**, versus **47%** for Varun.

### Original A/B/C case traced by hand, near misses OFF

Ananya's original dealbreakers are non-smoker, wants children, age 29–34. Soft weight total = 8 + 6 + 5 + 3 + 2 = 24. The live gender rule is satisfied by all three and does not alter the fixture result.

- **Advaith Hegde (A):** 31, wants children, but smokes. Ananya's non-smoker rule blocks him, regardless of other attributes.
- **Rishabh Malhotra (B):** 32, non-smoker, wants children. Height 71 ≥ 70, Bengaluru and postgraduate earn 8 + 6 + 5 = 19. Income 24 < 30 and non-vegetarian earn 0. `Math.round(100 * 19 / 24)` = **79%**.
- **Chirag Kulkarni (C):** 30, non-smoker, wants children. Height 67 < 70 and Pune earn 0. Postgraduate, income 38 ≥ 30 and vegetarian earn 5 + 3 + 2 = 10. `Math.round(100 * 10 / 24)` = **42%**.

## Feedback classification

Exactly one category is returned: `height`, `age`, `location`, `education`, `income`, `diet`, `smoking/drinking`, `children`, `marital status`, `family background`, `photo/attraction`, `personality/vibe`, `other`.

```json
{
  "category": "diet",
  "matched_stated_preference": true,
  "summary": "Rejection mentions diet",
  "confidence": 0.78
}
```

Without a key, keyword rules choose the first category matched in the priority order in `classify`; unknown feedback becomes `other` at 0.35 confidence. The 0.78 keyword confidence is heuristic, not a calibrated probability. Multi-reason feedback is reduced to one category. The boolean means the category exists in active stated preferences; it does not prove an actual rule violation. Structured gate checks, not feedback categories, determine impact.

With an optional key, the browser calls OpenAI Chat Completions using a strict JSON Schema and a system prompt treating feedback as untrusted data. The model is configured in one constant, `LLM_MODEL`. Category, required values, confidence and the 12-word summary limit are validated locally. The stated-preference boolean is recomputed locally. Errors, refusals, invalid JSON and a 20-second timeout fall back to the offline method with a visible label. Only feedback and active stated rules are included, not profile names or full profiles. The key stays in page/request memory and can be cleared; it is excluded from browser storage and JSON exports. No paid request was tested because no key was supplied. Reference: [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=chat).

## Learning and approval

Two or more matched rejection observations in the same explicitly stated soft category can suggest +3 weight, capped at 10. Existing active dealbreakers and weights already at 10 are excluded. Unmapped/other categories never create learning suggestions. Approve updates that weight and recalculates; Dismiss records the reviewed count. Either action suppresses the suggestion until new evidence appears. Preferences never change automatically.

For the third-objection demo, Ananya has two historical diet objections and a visible prior dismissal at count two. Log `not vegetarian, food habits matter` for Rishabh, then approve the reopened diet suggestion. Vegetarian changes 2 → 5; Rishabh's forward score becomes 19/27 = **70%**, while his reverse score remains **100%**. Chirag's forward score becomes 13/27 = **48%**. Some clients reject profiles they later accept; one rejection is deliberately insufficient. Repeated sends about the same person are not independent evidence, a limitation made visible in the synthetic fixture.

**Send** records a pending simulated send by the selected operator. Logging feedback resolves the latest pending send for that client/person if present, or creates a standalone preference observation otherwise. Activity and reviews persist locally when browser storage works; they do not rewrite the historical replay.

## Impact audit

The historical dataset has 40 sends per original client, 200 total, with frozen profile/preference snapshots. Complete copies are included in `mock-data/people.json`, `mock-data/clients.json`, `mock-data/candidates.json`, `mock-data/send-log.json` and `mock-data/review-history.json`. The app loads its seed records from `data.js` and generates the same deterministic historical log in `app.js`, so it also works directly from local files without a server or database. The JSON exports provide independently inspectable copies of every mock record. Present edits, new clients, ownership changes, imports and feedback do not change these past rules or outcomes.

- All clients: 200 sends; 62 accepted; 138 rejected. 48 rejected sends fail the two-way gate: **48 / 138 = 34.78%**. Acceptance today **62 / 200 = 31.0%**; projected **62 / (200 − 48) = 40.79%**.
- Matchmaker A: 100 sends; 32 accepted; 68 rejected; 12 gate-blocked rejections. **17.65%** of rejections preventable; **32.0% → 36.36%** acceptance.
- Matchmaker B: 100 sends; 30 accepted; 70 rejected; 36 gate-blocked rejections. **51.43%** of rejections preventable; **30.0% → 46.88%** acceptance.

The replay's "broke a stated preference" means a stated hard rule failed in either direction; a soft miss alone cannot block. Count a send once even if several rules fail. The generic function also removes gate-blocked accepted sends from the numerator if such a dataset is supplied. No retained sends produces N/A. The brief's 1,000/310 is context, not an extra 800 fabricated records: this 200-record sample reproduces 31% acceptance.

Projection assumes no replacement sends and unchanged outcomes among retained sends. It changes the denominator and is not evidence of new acceptances or causal uplift. Historical fixture dates are October 1–19, 2026, within the reference date's last 30 days; new activity uses the current date in India.

## Verification

`tests.html` runs 29 tests against the shared implementation: original A/B/C, reverse hard block, near-miss off/on and boundaries, approval re-ranking, no soft preferences, all blocked, impact integrity, learning thresholds/dismissal, classifier, missing data, reciprocal scoring and self-exclusion, lexicographic sorting, reciprocal near misses/unknown preferences, add/remove rules, profile validation, shared edits, and maximum comparisons, atomic imports, unmapped-category handling, tier round trips, weight validation during demotion, conflicting tier moves, source-link and timestamp validation, metadata imports, and profile freshness updates. The same suite runs without a network or test library in a browser or via Node with a minimal display shim.

The A/B/C calculations and 34.78% impact are traced above. Browser checks cover adding/removing a dealbreaker, adding a complete sourced person, adding their own preference, persistence through reload, and the main matching workflow. No real staff login, external data integration or live LLM call was tested because those are not connected in this static build.

## Known limitations and next steps

All records, names, sources, preferences, partner-gender choices and outcomes are fictional. Exact structured data means explicit fixture/input values, not externally verified facts. The prototype has no website integrations, scraping, real email, authentication, staff permissions, server database or multiuser synchronization. Clearing browser data loses locally saved work; exports intentionally omit feedback and activity. Unknown attributes are not supported for new profiles yet; production should model unknown values explicitly with provenance and verification dates rather than infer them.

Keyword classification is English-focused and can misread negation, slang and multi-reason comments. LLM outputs also need review. Shared category counts can overstate evidence, particularly repeat objections about the same person. Mother-tongue and custom city equality currently use exact strings, aside from supported city normalization. Family background and attraction never create inferred hard rules. This preference-fit percentage measures stated constraints, not relationship quality or consent.

A browser-entered key is accessible to the page runtime even when never persisted. Production should use authenticated server-side API requests and managed credentials. Add staff sign-in, authorization and a real shared PostgreSQL database next; keep client ownership separate from send-operator attribution. Maintain versioned preferences, immutable historical snapshots and audit events, authorized source integrations, deduplication and idempotent delivery. Add consent, retention/deletion policies and data minimization before real personal data. Then improve multilingual classification and evidence quality, and compare lexicographic ranking with balanced mutual ranking in a prospective evaluation of acceptance and false blocks.
