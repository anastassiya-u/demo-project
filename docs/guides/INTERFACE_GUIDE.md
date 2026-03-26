# Interface Guide
## Oracle vs. Critic: Two AI Interaction Paradigms

---

## Quick Overview

You're testing **two ways students collaborate with AI** for medical diagnosis:

| **Oracle (Blue)** | **Critic (Purple)** |
|---|---|
| AI is the expert/boss | AI is the peer reviewer |
| AI tells answer first | You diagnose first |
| Only supporting evidence | Evidence FOR and AGAINST |
| All info at once | Progressive reveal |
| Passive learning | Active learning |

**Goal:** Test which approach reduces **overreliance** (blindly trusting AI when it's wrong)

---

## The Two Interfaces

### Oracle Interface (Directive XAI)

**Visual:** Blue gradient, authority-style presentation

**Flow:**
```
Clinical Case
↓
🤖 AI RECOMMENDATION: Pneumonia (89%)
↓
✓ Why This Diagnosis?
  • Evidence point 1
  • Evidence point 2
  • Evidence point 3
↓
[Agree] or [Disagree]
```

**Characteristics:**
- Immediate AI recommendation (no input required)
- Unilateral explanation (only supporting evidence)
- All evidence visible at once
- One-click to accept AI's answer

**The Problem:**
- **Confirmation bias by design** - only shows evidence that makes AI look right
- **Automation bias** - easy to agree without thinking
- **Can't catch errors** - when AI is wrong, no contradicting evidence shown

**Research Expectation:** 70-80% of students agree with AI even when wrong

---

### Critic Interface (Evaluative AI)

**Visual:** Purple gradient, collaborative presentation

**Flow:**
```
Clinical Case
↓
💭 What's YOUR diagnosis? [Required input]
↓
You diagnosed: Pneumonia
↓
✓ SUPPORTS          |  ✗ CHALLENGES
• Fever present     |  • No shortness of breath
• X-ray infiltrate  |  • Recent viral infection
↓
[Click to reveal evidence...]
🧪 Lab Results  🔬 Differential Diagnosis
↓
[Keep] or [Revise] your diagnosis
```

**Characteristics:**
- **Hypothesis lock** - AI output blocked until you submit diagnosis
- **Contrastive evidence** - shows BOTH sides (balanced view)
- **Progressive reveal** - click buttons to explore evidence
- **Error detection possible** - can verify if AI is wrong

**The Advantage:**
- Forces independent thinking before seeing AI
- Enables verification through balanced evidence
- Activates analytical reasoning (System 2 thinking)

**Research Expectation:** 20-40% agreement with wrong AI (better error detection)

---

## The 2×2 Experimental Design

Every student gets ONE of these combinations:

| Group | Interface | AI Accuracy | What Happens |
|-------|-----------|-------------|--------------|
| 1 | Oracle | 100% | AI always right, but dependency develops |
| 2 | Oracle | 70% | AI wrong 30% of time, can't detect errors |
| 3 | Critic | 100% | AI always right, practice verification |
| 4 | Critic | 70% | AI wrong 30% of time, CAN detect errors |

**Key Question:** Does Critic help you catch AI mistakes better than Oracle?

---

## Theoretical Foundation

### Hypothesis Lock (Critic)
- **Based on:** Cognitive Forcing Functions (Buçinca et al., 2021)
- **Purpose:** Prevents anchoring bias, forces System 2 thinking
- **Context:** Breaks Semashko system's authority deference pattern (Kazakhstan)

### Contrastive Evidence (Critic)
- **Based on:** Verifiability (Fok & Weld, 2024)
- **Purpose:** Enables users to verify if AI is correct
- **Key:** Shows objective facts FOR and AGAINST, not just "how AI decided"

### Progressive Reveal (Critic)
- **Based on:** Partiality (de Jong et al., 2025)
- **Purpose:** Forces active exploration vs. passive consumption
- **Effect:** Builds mental models incrementally, improves error detection

### Sensible Foils
- **What:** 30% of cases have plausible AI errors
- **Example:** Pneumonia (correct) → Bronchitis (foil with similar symptoms)
- **Purpose:** Tests if users verify AI reasoning vs. accept plausible-sounding answers
- **Key Differentiator:** X-ray infiltrate (present in pneumonia, absent in bronchitis)

---

## Testing Both Interfaces

### Access Oracle (Blue)
1. Register as TEST001
2. If you get Critic, clear storage and try again:
```javascript
// Browser console (Cmd+Option+I)
localStorage.clear()
// Refresh and register as TEST002
```

### Access Critic (Purple)
Same process - keep registering new test IDs until assigned to Critic

### What to Look For

**Oracle Checklist:**
- [ ] Blue gradient
- [ ] AI recommendation shown immediately
- [ ] Only positive evidence (no contradictions)
- [ ] Agree/Disagree buttons
- [ ] One-click to accept

**Critic Checklist:**
- [ ] Purple gradient
- [ ] Must enter diagnosis before seeing AI
- [ ] Two columns: SUPPORTS and CHALLENGES
- [ ] Buttons to reveal more evidence
- [ ] Option to revise after reviewing

---

## Common Questions

**Q: Why do they look different?**
A: Testing two theories about Human-AI collaboration:
- Oracle: AI as expert, human accepts guidance
- Critic: Human as expert, AI provides verification tools

**Q: Which one is better?**
A: That's what the research will determine! Hypothesis: **Critic is better** because it:
1. Reduces overreliance (catches errors)
2. Builds critical thinking (cognitive forcing)
3. Improves learning (active engagement)

**Q: Why 30% error rate?**
A: Perfect AI (100%) doesn't test trust calibration. Need to see:
- Can you detect when AI is wrong?
- Do you trust AI appropriately?

The 70/30 split reflects realistic AI performance in medical diagnosis.

**Q: What are "sensible foils"?**
A: AI's errors are **plausible mistakes**, not random. A human doctor might make the same error.

Example:
- **Correct:** Pneumonia (has X-ray infiltrate)
- **Foil:** Acute Bronchitis (similar symptoms, but NO infiltrate)

Tests whether users verify AI reasoning or just accept plausible answers.

**Q: Why Kazakhstan context?**
A: Semashko system (Soviet-era hierarchy) trained doctors to defer to authority. Hypothesis lock breaks this pattern. If Critic works here, it should work anywhere.

---

## For Non-Medical Testers

You don't need medical knowledge to test the mechanics:

### Oracle Test
1. **Timer:** How long until you click "Agree"? (Expected: 10-30 sec)
2. **Scrolling:** How much do you read? (Expected: Skim, agree quickly)
3. **Disagreement:** How often click "Disagree"? (Expected: Rarely)

### Critic Test
1. **Hypothesis Lock:** Can you see AI without entering diagnosis? (Expected: NO)
2. **Exploration:** How many reveal buttons do you click? (Expected: 2-4 panels)
3. **Revision:** How often change diagnosis? (Expected: 20-40% if evidence contradicts)

---

## Platform Status

**Live:** https://demo-project-two-peach.vercel.app/
**Database:** Connected and logging
**Interfaces:** Both functional
**Randomization:** Active (2×2 design)
**Ready for:** Pilot testing (N=5-10) before full launch (N=120)

---

**For detailed testing procedures, see:** [TESTING_GUIDE.md](TESTING_GUIDE.md)
