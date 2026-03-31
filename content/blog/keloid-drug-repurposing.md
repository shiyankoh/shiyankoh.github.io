---
title: "Can a VC with Claude Code find better keloid treatments?"
date: 2026-03-31
slug: "keloid-drug-repurposing"
---

I have keloids. If you don't know what those are, consider yourself lucky. They're raised, rubbery scars that grow way beyond the original wound. They itch. They're painful. They come back after treatment. And if you're unlucky enough to be prone to them (hi), every cut, piercing, or surgical incision is a roll of the dice.

The standard playbook is steroid injections, silicone sheets, maybe surgery — which ironically can trigger more keloids. There's no gold-standard cure. The research is thin. And if I'm being honest, it's one of those conditions that doesn't get a ton of attention because it disproportionately affects people of color and it won't kill you.

So I decided to do something about it. Not as a scientist — I'm not one. As a person with keloids and access to some pretty powerful new tools.

## The idea: what if the drug already exists?

Drug repurposing is the concept that a drug approved for one condition might work for another. It happens more than you'd think. Viagra was a blood pressure drug. Thalidomide — yes, that thalidomide — came back as a cancer treatment. Minoxidil was for hypertension before it was for hair loss.

The logic for keloids is pretty straightforward. We actually know a lot about the molecular pathways that drive keloid formation — TGF-beta signaling, mTOR, inflammation cascades, collagen overproduction. These same pathways are targeted by drugs that already exist for other diseases. Cancer drugs. Autoimmune drugs. Even common anti-inflammatories.

The question is: which of those drugs overlap with the most keloid pathways, and which ones are safe enough that you'd actually consider using them for a condition that's painful and disfiguring but not life-threatening?

That's a needle-in-a-haystack problem. There are thousands of FDA-approved drugs. Manually cross-referencing them against keloid biology would take a researcher months.

I figured I'd see if I could build a pipeline to do it in a weekend.

## What I built (with a lot of help from Claude)

I'm not an engineer. I'm a VC who can prompt an AI coding tool and troubleshoot when things break. That's my technical ceiling. But it turns out that ceiling is a lot higher than it used to be.

Using Claude Code, I built a Python pipeline that:

1. **Seeds keloid biology.** I manually curated 22 molecular targets across 10 pathways known to drive keloid formation — TGF-beta, mTOR, VEGF, collagen synthesis, etc. Then I enriched that list with data from OpenTargets, a public database of disease-gene associations.

2. **Finds drugs that hit those targets.** The pipeline queries DGIdb (Drug Gene Interaction Database) to find every FDA-approved drug that interacts with those keloid-associated genes.

3. **Scores and ranks them.** Each drug gets a composite score based on how many keloid pathways it touches, the strength of the evidence linking it to those targets, and whether it hits multiple pathways (suggesting broader anti-keloid potential).

4. **Flags safety concerns.** I manually classified the top 50 candidates into green (safe enough for a benign condition), yellow (needs careful evaluation), and red (oncology-grade toxicity — probably not appropriate).

5. **Cross-references clinical trials.** The pipeline checks ClinicalTrials.gov for any existing keloid or hypertrophic scar trials involving these candidates.

The whole thing runs locally. SQLite database, no credentials needed, all public APIs. It cached the API responses so I could re-run it without hammering academic databases.

## What came out

1,230 drug candidates scored. Here's what's interesting.

**The top scorers are cancer drugs.** Sorafenib, erlotinib, osimertinib — they hit the most keloid pathways because cancer and keloids share molecular machinery (uncontrolled cell growth, angiogenesis, inflammation). But you're not going to take a chemo drug for a scar. These are red-tier candidates. Interesting to validate the biology, not useful in practice.

**The actionable list is 12 drugs.** These are green or yellow safety tier, hitting 2+ curated pathways:

- **Celecoxib** (Celebrex) — a COX-2 inhibitor, basically a prescription Advil. Hits 4 keloid pathways. Green tier.
- **Dexamethasone** — already used for keloids via injection. But it hits 3 pathways, suggesting broader mechanisms than we typically exploit.
- **Sirolimus** (rapamycin) — an mTOR inhibitor already being studied topically for keloids. One completed early-phase trial exists.
- **Aspirin** — yes, aspirin. Hits 3 pathways. The ultimate "already proven safe" candidate.
- **Imatinib** (Gleevec) — a tyrosine kinase inhibitor originally for leukemia, but with a much more manageable safety profile than most cancer drugs. 4 pathways.

**6 candidates already have keloid trials on ClinicalTrials.gov.** This was a nice sanity check. The pipeline independently surfaced drugs that researchers have already thought worth testing — dexamethasone, sirolimus, pirfenidone, bevacizumab. It's reassuring when your automated analysis aligns with where the field is heading.

## What I don't know (a lot)

I want to be really clear about the limitations because they're significant.

**I can't tell if a drug helps or hurts keloids.** The pipeline finds drugs that *interact* with keloid-relevant genes. It can't distinguish between "inhibits the pathway driving scar formation" and "activates the pathway driving scar formation." A drug that touches TGF-beta might suppress it (good) or amplify it (bad).

**Breadth isn't the same as efficacy.** The scoring rewards drugs that hit many pathways. But a drug that precisely modulates one critical pathway could be more effective than one that weakly touches five. Verapamil, a calcium channel blocker that some dermatologists already use for keloids, scores low in my pipeline because it works through a single, focused mechanism.

**This is hypothesis generation, not medical advice.** I built a filter. A very rough, first-pass filter. It tells you which haystack to look in, not which needle to pick.

## Why I'm writing this

Two reasons.

**First, I think this is a genuinely interesting use case for AI tools.** A non-technical person with a personal health question used publicly available databases and an AI coding assistant to build a research pipeline that would've required a bioinformatics team a few years ago. The pipeline has 57 unit tests. It's reproducible. The [code is open source](https://github.com/shiyankoh/keloid-drug-repurposing). That's wild to me.

I'm not saying this replaces scientists. I'm saying the barrier to doing *useful preliminary work* has dropped dramatically. Patients and advocates can now ask structured questions of public data, not just Google symptoms at 2am.

**Second, I'd love feedback from people who actually know what they're doing.** Specifically:

- **Dermatologists:** Does this approach have legs? Are there candidates on this list that make you go "huh, that's interesting" or "that's been tried, it doesn't work"? Am I missing pathways that matter?
- **Computational biologists:** Is my experiment design reasonable? The scoring formula is simple — normalized pathway overlap, evidence strength, multi-target bonus. What would you change? What databases am I missing?
- **Anyone who treats keloids:** What does the clinical reality look like that my pipeline can't see? Drug delivery matters a lot for keloids (topical vs. injection vs. systemic). My pipeline doesn't account for that at all.

The pipeline, data, and full report are [on GitHub](https://github.com/shiyankoh/keloid-drug-repurposing). If you want to run it yourself, it's `pip install -r requirements.txt` and `./run_pipeline.sh`. No API keys needed.

I don't know if any of this leads anywhere useful. But I've got keloids, I've got curiosity, and I've got tools that didn't exist two years ago. Seemed worth a shot.

---

*If you work on keloids or drug repurposing and want to chat, I'm [keloid-research@agentmail.to](mailto:keloid-research@agentmail.to). I'm also curious about [David Fajgenbaum's work at Every Cure](https://everycure.org) — this pipeline is loosely modeled on his computational pharmacophenomics approach for rare diseases.*
