---
title: "Zero-Based Budgeting for Your Engineering Team"
date: 2026-03-21
slug: "zero-based-budgeting-engineering"
---

A founder I back asked me last week if I knew anyone who could help them rethink their engineering org from scratch. Not a layoff consultant. Not a recruiter. Someone who could help them answer a harder question:

*If I were building this team today, knowing what AI can do now, what would it look like?*

I've been hearing versions of this question from almost every CEO in our portfolio. And I think it's the right question at the right time.

## What Zero-Based Engineering Means

In finance, zero-based budgeting means you don't start from last year's budget and adjust. You start from zero and justify every dollar. No line item gets a free pass just because it existed before.

Apply that to your engineering team.

Don't start from your current headcount and ask "who can I cut?" Start from zero and ask "what do I actually need built, maintained, and operated, and what's the best way to do each of those things today?"

The answer in 2024 would have been very different from the answer today. AI coding tools have gone from cute autocomplete to genuine capability. Not for everything. But for enough that the math has changed.

## The Maintenance vs. Creation Distinction

Here's the nuance most people miss: AI is much better at maintaining existing code than most people think, and less reliable at building complex new systems than the hype suggests.

Maintaining a codebase (fixing bugs, writing tests, updating dependencies, refactoring for performance, adding straightforward features to established patterns) is where AI tools are already shockingly competent. An engineer paired with Claude Code or Cursor can maintain a codebase at a pace that would have required a team of three eighteen months ago.

But there's an important caveat. A recent benchmark called [SWE-CI](https://arxiv.org/abs/2603.03823), out of Alibaba Research, tested something most AI benchmarks don't: what happens when an AI agent has to maintain a system *over time*. Not just write code once, but repeatedly modify a real codebase across dozens of commits spanning months of evolution. The results were sobering. Even the best-performing models broke existing behavior in roughly half of their maintenance iterations.

The failure modes tell you a lot about where the limits actually are. Agents apply minimal fixes to a failing test without understanding broader dependencies, causing cascading regressions. They change a function signature but don't update callers across the codebase. Over many iterations, they accumulate duplicated logic and inconsistent abstractions. They treat tests as constraints to bypass rather than signals about how the system is supposed to work.

In other words: AI agents can generate technical debt just as fast as they generate code.

This doesn't mean AI can't maintain systems. It means the *kind* of maintenance matters. AI is excellent at well-scoped, pattern-following work within clean codebases. It struggles with the kind of long-horizon stewardship that requires understanding dependencies, preserving architectural intent, and predicting the ripple effects of changes.

Building new systems from scratch, making judgment calls about tradeoffs, understanding the business context behind technical decisions: this still requires experienced humans. AI makes them faster, not optional.

The implication: you probably need fewer maintenance engineers and more architect-level thinkers than you currently have. But the architects aren't just designing new things. They're the ones who understand the system well enough to direct AI effectively and catch the failure modes that don't show up in test suites until it's too late. The ratio has shifted, but the senior end of the ratio matters more than ever.

## What Does the Team Look Like?

If I were building a startup engineering team from zero today, here's roughly how I'd think about it:

**1-2 senior engineers who think in systems.** These are your architects. They make the hard calls: what to build, how to structure it, where the complexity lives. They use AI tools aggressively but their value is judgment, not keystrokes. They're also the ones who can spot when AI-generated changes are introducing the kind of slow architectural erosion that doesn't show up in test suites until it's too late.

**AI-augmented "full stack operators."** Engineers who are comfortable using AI to move fast across the stack. They're not specialists in one layer. They're generalists who can ship end-to-end with AI doing the heavy lifting on boilerplate. One of these people today can cover ground that used to require a frontend dev, a backend dev, and a QA engineer.

**A DevOps/infra person (maybe).** Depending on your stack. If you're on Vercel/Railway/managed everything, you might not need this. If you're running your own infrastructure, you still do. AI hasn't automated "3am the database is on fire" yet.

**Product-minded leadership.** The more AI handles the how, the more important it is to have humans focused on the what and why. Product sense becomes your scarcest resource, not engineering capacity.

What you probably don't need: large teams of mid-level engineers writing CRUD endpoints, manual QA teams, or dedicated frontend/backend splits for standard product work.

## You're Not Just Rebuilding the Team. You're Rebuilding the Product.

There's a second zero-based question most founders aren't asking yet, but should be:

*If I were designing this product today, who would be using it?*

Not just who. *What.*

The first generation of software was built for humans clicking buttons. The next generation is being built for AI agents making API calls. And the gap between those two is bigger than most people realize.

Think about what's already happening. AI agents are booking travel, managing inboxes, writing code, doing research, placing orders. They don't need beautiful UI. They need clean APIs, structured data, predictable behavior, and good documentation. The "user" increasingly isn't a person. It's software acting on a person's behalf.

This changes what you build and how you build it.

Your product needs to be *findable and usable by agents*, not just humans. Well-documented, with predictable error handling and sensible defaults. Tool-use schemas and structured outputs aren't nice-to-haves anymore. They're how your product gets chosen by the AI layer sitting between you and the end user.

You also need two kinds of UX now. One for humans, one for agents. Humans want intuitive flows. Agents want predictable contracts. Building both well requires a different kind of product thinking than most teams have today.

And distribution changes too. If agents are choosing tools on behalf of users, your moat isn't brand awareness or ad spend. It's being the tool the agent picks. Reliability, speed, and being easy for an AI to work with matter more than your landing page.

So what does *this* mean for the team?

You need people who understand how AI agents consume software, not just how humans do. Product people who think about what the agent experience looks like. Engineers who design for machine callers first. People who are building the connective tissue between your product and the agentic ecosystem, not just shipping features for a dashboard.

This is the deeper version of the zero-based question. It's not just "what team do I need to build what I'm building?" It's "am I even building the right thing for the world that's emerging?"

## How Do You Manage the Risk?

This is the part most founders get stuck on. "Okay, I believe the team could be smaller. But how do I get from here to there without breaking everything?"

Three approaches I'm seeing:

**Component-by-component refactor.** Take your existing codebase and, module by module, assess: can AI reliably maintain this? Is the code well-structured enough that an AI tool can work with it? If yes, you've reduced the human maintenance burden for that component. If no, refactor it until it is. That's a one-time engineering investment that pays dividends.

This is the conservative approach. Lower risk, slower payoff. Good if your product is in-market with paying customers and you can't afford instability.

**Parallel "red team" rebuild.** Stand up a small team (or even one senior engineer with AI tools) to rebuild a component or service from scratch in parallel. Compare quality, speed, and maintainability against the existing system. If the rebuild wins, swap it in. If not, you've learned something about where the boundaries of AI-assisted development actually are for your specific stack.

This is the aggressive approach. Higher risk, faster learning. Good if you have components that are already technical debt and need to be rewritten anyway.

**The hybrid.** Refactor the stable, well-understood parts. Rebuild the parts that are already a mess. Most teams should do this.

## The Stability Question

One thing I keep hearing from CTOs: "But can I trust AI to maintain my codebase long-term?"

The honest answer is: it depends on your codebase.

If your code is well-typed, well-tested, modular, and follows consistent patterns, AI tools are remarkably good at working with it. They can read the patterns, follow the conventions, and extend the system coherently. The SWE-CI data backs this up: AI agents perform best in codebases with clear structure and comprehensive test coverage. The failures cluster in the messy parts, where high-churn files with accumulated complexity are exactly where cascading regressions concentrate.

If your code is a tangled monolith with no tests, implicit dependencies everywhere, and tribal knowledge locked in the heads of engineers who've since left, AI will struggle with it just like a new hire would. Except the new hire might eventually figure it out through sheer determination, while the AI will confidently produce something that looks right and isn't.

This means investing in code quality isn't just good practice anymore. It's a prerequisite for being able to run a lean team. The teams that can reduce headcount are the ones whose code is clean enough for AI to work with. Technical debt has become a hiring cost.

## What I'd Tell a Founder Right Now

If you're a Series A or B company with 8-15 engineers and you haven't done this exercise, do it this quarter. Not because you need to fire people. Maybe you don't. But because you need to know:

- Which parts of your system can AI reliably maintain today?
- Which parts need human judgment and how much?
- Where is your team's time actually going: new features, maintenance, firefighting?
- If you were hiring from zero, would you hire the same roles?

The companies that figure this out early will operate at 2-3x the efficiency of those that don't. And in a market where efficiency is the new growth, that's a real competitive advantage.

This isn't about replacing engineers with AI. It's about being honest about what the job actually requires now, and building a team that reflects that reality instead of last year's.

---

*If you're a founder thinking about this and want to compare notes, I'm collecting frameworks and examples from across our portfolio. Reach out.*
