# ChatGPT Medical Data Request

## Your Role

You are a medical educator helping design a research study for 4th–5th year medical students in Kazakhstan. I need you to fill in clinical reasoning data for 15 surgical cases. Each case needs **three plausible differential diagnoses** presented as a comparison table with arguments FOR and AGAINST each hypothesis.

---

## Critical Rules

1. **Arguments must use ONLY the objective clinical data provided** for each case — labs, vitals, imaging, physical exam findings. Do NOT use external knowledge or invent findings not listed.
2. **Keep arguments short** — 1 sentence each, max 12 words. They are bullet points in a table.
3. **Avoid process explanations** ("AI assigned 85% confidence") — only verifiable clinical facts ("WBC 16.2 indicates systemic infection").
4. **One of the three hypotheses must be the correct diagnosis** listed in the case.
5. **The other two hypotheses must be plausible differentials** — they should share ≥2 clinical features with the correct diagnosis. Do NOT include obviously wrong diagnoses.
6. **For foil cases**: the three hypotheses must include both the correct diagnosis AND the foil diagnosis listed. The third hypothesis is any plausible differential.
7. **Provide both English and Russian** for all hypotheses and arguments.
8. **Arguments FOR** = clinical evidence that supports this hypothesis.
9. **Arguments AGAINST** = clinical evidence that contradicts or makes this hypothesis less likely.

---

## Output Format

For each case, output a JSON block in this exact format:

```json
{
  "caseId": "INT_001",
  "suggestedHypotheses": [
    {
      "id": "A",
      "diagnosis": "Diagnosis Name in English",
      "diagnosis_ru": "Название диагноза на русском",
      "argsFor": [
        "Clinical fact 1 supporting this diagnosis",
        "Clinical fact 2 supporting this diagnosis",
        "Clinical fact 3 supporting this diagnosis"
      ],
      "argsFor_ru": [
        "Клинический факт 1 в пользу диагноза",
        "Клинический факт 2 в пользу диагноза",
        "Клинический факт 3 в пользу диагноза"
      ],
      "argsAgainst": [
        "Clinical fact 1 against this diagnosis",
        "Clinical fact 2 against this diagnosis"
      ],
      "argsAgainst_ru": [
        "Клинический факт 1 против диагноза",
        "Клинический факт 2 против диагноза"
      ]
    },
    { "id": "B", ... },
    { "id": "C", ... }
  ]
}
```

Provide 3 arguments FOR and 2–3 arguments AGAINST each hypothesis. Output one JSON block per case.

---

## Cases

---

### INT_001
**Chief Complaint:** Right lower quadrant pain and fever
**Correct diagnosis:** Acute Appendicitis (Grade II - Mild)

**Patient:** Not specified
**History:** 24-hour periumbilical pain migrating to RLQ. Nausea, two vomiting episodes. Anorexia. Low-grade fever. Normal LMP 2 weeks ago.
**Physical Exam:** Uncomfortable. McBurney's point tenderness. Guarding. Positive Rovsing's sign. Developing rebound.
**Vitals:** Temp 38.5°C, BP 122/78, HR 96, RR 20, SpO2 98%
**Labs:** WBC 12.8 (elevated), Hemoglobin 13.2 (normal), Platelets 295,000 (normal), CRP 0.95 (moderately elevated)
**Imaging:** CT: Fluid-filled appendix 8mm. Enhancing wall thickening. Subtle periappendiceal stranding. No abscess or free air.

**Required hypotheses:** Include "Acute Appendicitis" as one. Add 2 plausible differentials (e.g., ovarian cyst/torsion, Meckel's diverticulitis, mesenteric lymphadenitis, right ureterolithiasis).

---

### INT_002 ⚠️ FOIL CASE
**Chief Complaint:** Right upper abdominal pain with chills
**Correct diagnosis:** Ascending Cholangitis
**Foil diagnosis (AI will say this incorrectly):** Acute Cholecystitis

**History:** RUQ pain 18 hours. Shaking chills 4 hours ago. Fever. Pain radiates to right shoulder. Nausea.
**Physical Exam:** Significant RUQ tenderness. Murphy's sign positive. No jaundice.
**Vitals:** Temp 39.0°C, BP 94/62, HR 116, RR 22, SpO2 97%
**Labs:** WBC 16.2 (significantly elevated), Bilirubin 3.5 (elevated), ALT 195 (elevated), Alkaline Phosphatase 380 (elevated)
**Imaging:** RUQ ultrasound: Thickened gallbladder wall 5mm, pericholecystic fluid, positive Murphy's sign. CBD 7mm (upper limit normal). Multiple gallstones.

**Required hypotheses:** Include BOTH "Ascending Cholangitis" AND "Acute Cholecystitis" plus one more plausible differential.

---

### INT_003
**Chief Complaint:** Right lower quadrant pain worsening over 48 hours
**Correct diagnosis:** Acute Appendicitis (Grade III - with Localized Peritonitis)

**History:** Progressive RLQ pain 2 days, now constant. Fever 39.5°C. Multiple vomiting. Unable to eat. No migration.
**Physical Exam:** Ill-appearing. Significant RLQ tenderness. Voluntary and involuntary guarding. Rebound tenderness. Psoas sign positive.
**Vitals:** Temp 39.5°C, BP 106/68, HR 108, RR 22, SpO2 97%
**Labs:** WBC 13.5 (elevated), Hemoglobin 12.9 (normal), CRP 2.5 (elevated)
**Imaging:** CT: Appendiceal diameter 11mm, enhancing wall thickening, moderate periappendiceal stranding. No abscess.

**Required hypotheses:** Include "Acute Appendicitis Grade III" as one. Add 2 plausible differentials.

---

### INT_004 ⚠️ FOIL CASE
**Chief Complaint:** Left lower abdominal pain and fever for 3 days
**Correct diagnosis:** Acute Diverticulitis (Uncomplicated)
**Foil diagnosis (AI will say this incorrectly):** Constipation with Colonic Distention

**History:** Gradual LLQ pain 3 days, constant and severe. Low-grade fever, chills. Nausea. No bowel movement 2 days. History of occasional constipation.
**Physical Exam:** LLQ tenderness with guarding. Hypoactive bowel sounds. No rebound initially.
**Vitals:** Temp 37.9°C, BP 108/72, HR 90, RR 18, SpO2 98%
**Labs:** WBC 14.5 (elevated), Hemoglobin 13.8 (normal), CRP 7.8 (significantly elevated)
**Imaging:** CT: Sigmoid wall thickening, pericolonic fat stranding, diverticulosis present. No abscess, no free air.

**Required hypotheses:** Include BOTH "Acute Diverticulitis" AND "Constipation with Colonic Distention" plus one more differential.

---

### INT_005
**Chief Complaint:** Severe abdominal pain, nausea, and confusion
**Correct diagnosis:** Type A Aortic Dissection with Mesenteric Ischemia

**History:** Severe left-sided abdominal pain 2 days. Nausea, vomiting, diarrhea. Initially thought viral illness.
**Physical Exam:** Altered mental status. Left abdominal tenderness with guarding. Faint pulses bilaterally. Tachypneic.
**Vitals:** Temp 36.6°C, BP 96/45, HR 61, RR 32, SpO2 94%
**Labs:** WBC 15.74 (significantly elevated), Hemoglobin 15.4 (normal), Potassium 9.0 (critical hyperkalemia), Glucose 46 (hypoglycemia), Creatinine 6.67 (acute kidney injury), ALT 1546 (critically elevated), AST 3361 (critically elevated), Lactate 9.6→10.7 (critically elevated)
**Imaging:** CTA: Abdominal aortic dissection. Flap at celiac and SMA level. Type A dissection involving aortic arch with extensive bowel ischemia (no mucosal enhancement in small bowel and colon).

**Required hypotheses:** Include "Aortic Dissection with Mesenteric Ischemia" as one. Add 2 plausible differentials (e.g., acute mesenteric ischemia without dissection, severe sepsis with multi-organ failure, acute pancreatitis with complications).

---

### INT_006
**Chief Complaint:** Right lower quadrant pain, high fever
**Correct diagnosis:** Perforated Appendicitis with Abscess (Grade IV)

**History:** 3-day worsening RLQ pain. High fever with chills 24 hours. Multiple vomiting. Cannot tolerate oral intake.
**Physical Exam:** Ill-appearing, febrile. Significant RLQ tenderness. Rigid abdomen. Involuntary guarding. Diffuse rebound. Diminished bowel sounds.
**Vitals:** Temp 40.1°C, BP 98/58, HR 118, RR 26, SpO2 96%
**Labs:** WBC 12.2 (elevated), Hemoglobin 12.1 (normal), CRP 8.5 (significantly elevated)
**Imaging:** CT: Periappendiceal abscess 5cm with rim enhancement. Appendiceal wall defect. Free fluid in pelvis.

**Required hypotheses:** Include "Perforated Appendicitis with Abscess" as one. Add 2 plausible differentials.

---

### INT_007
**Chief Complaint:** Right lower quadrant discomfort for 12 hours
**Correct diagnosis:** Normal Appendix (No Acute Appendicitis)

**History:** Mild RLQ discomfort since yesterday evening. Intermittent, 3/10 pain. No migration. Minimal nausea. Eating and drinking normally.
**Physical Exam:** Appears comfortable. Mild McBurney's point tenderness. NO guarding. No rebound. Normal bowel sounds.
**Vitals:** Temp 37.4°C, BP 118/74, HR 88, RR 16, SpO2 99%
**Labs:** WBC 8.4 (NORMAL), Hemoglobin 13.6 (normal), CRP 0.35 (NORMAL)
**Imaging:** CT: Normal appendix diameter 5mm. No wall thickening. No stranding. No free fluid.

**Required hypotheses:** Include "Normal Appendix / Non-specific Abdominal Pain" as one. Add 2 plausible differentials (e.g., early appendicitis, mesenteric lymphadenitis, ovarian cyst — that look similar but are ruled out by normal labs/imaging).

---

### INT_008 ⚠️ FOIL CASE
**Chief Complaint:** Right upper abdominal pain and fever for 1 day
**Correct diagnosis:** Acute Cholecystitis
**Foil diagnosis (AI will say this incorrectly):** Ascending Cholangitis

**History:** RUQ pain since 8pm yesterday after fatty meal. Severe, constant. Fever this morning. Nausea.
**Physical Exam:** Severe RUQ tenderness. Positive Murphy's sign (inspiratory arrest). Positive sonographic Murphy's sign.
**Vitals:** Temp 39.2°C, BP 90/65, HR 118, RR 24, SpO2 96%
**Labs:** WBC 15.8 (significantly elevated), Bilirubin 1.0 (NORMAL), ALT 68 (mildly elevated), AST 72 (mildly elevated), Alkaline Phosphatase 125 (NORMAL)
**Imaging:** RUQ ultrasound: Gallbladder wall 5mm (markedly thickened). Multiple gallstones. Pericholecystic fluid. CBD 5mm (NORMAL, no dilation). No intrahepatic ductal dilation.

**Required hypotheses:** Include BOTH "Acute Cholecystitis" AND "Ascending Cholangitis" plus one more differential. For arguments, use the lab/imaging differences: NORMAL bilirubin and alk phos AGAINST cholangitis; NORMAL CBD AGAINST cholangitis; positive Murphy's FOR cholecystitis.

---

### INT_009
**Chief Complaint:** Lower abdominal pain for 1 week
**Correct diagnosis:** Acute Diverticulitis

**History:** Gradual lower abdominal pain 1 week. Initially wave-like 30-min episodes every 2-3h. Now constant. Awakens from sleep.
**Physical Exam:** LLQ tenderness. No rebound. Mild guarding in LLQ.
**Vitals:** Temp 38.3°C, BP 108/68, HR 96, RR 20, SpO2 97%
**Labs:** WBC 14.8 (elevated), Hemoglobin 14.2 (normal), CRP 8.2 (significantly elevated)
**Imaging:** CT: Sigmoid wall thickening 6mm. Moderate pericolonic stranding. Multiple diverticula. Small free fluid in pelvis. No abscess or perforation.

**Required hypotheses:** Include "Acute Diverticulitis" as one. Add 2 plausible differentials.

---

### INT_010 ⚠️ FOIL CASE
**Chief Complaint:** Right lower quadrant pain for 36 hours
**Correct diagnosis:** Acute Appendicitis Grade III (with localized peritonitis, no perforation)
**Foil diagnosis (AI will say this incorrectly):** Perforated Appendicitis Grade IV

**History:** Progressive RLQ pain 36 hours, started periumbilical, migrated to RLQ after 8-10h. Constant, gradually worsening. Nausea and multiple vomiting.
**Physical Exam:** Acutely ill. Lying still. Marked RLQ tenderness. Positive Rovsing's sign. Voluntary guarding. Positive psoas sign. Rebound tenderness.
**Vitals:** Temp 39.1°C, BP 112/70, HR 106, RR 22, SpO2 97%
**Labs:** WBC 13.5 (elevated), Hemoglobin 13.4 (normal), CRP 5.8 (elevated)
**Imaging:** CT: Appendix 10mm with marked enhancement. Severe periappendiceal stranding extending to right paracolic gutter. Small free fluid in pelvis. **Appendiceal wall intact — NO visible defect. No abscess. No free air.**

**Required hypotheses:** Include BOTH "Appendicitis Grade III (no perforation)" AND "Perforated Appendicitis Grade IV" plus one differential. Key arguments: intact wall and no free air AGAINST perforation; severe stranding and rebound FOR severe appendicitis.

---

### INT_011
**Chief Complaint:** Severe epigastric pain for 8 hours
**Correct diagnosis:** Perforated Duodenal Ulcer with Peritonitis

**History:** Sudden onset severe epigastric pain 8 hours ago, "worst pain ever". Constant, radiates to mid-back. 3 vomiting episodes. Cannot find comfortable position.
**Physical Exam:** Severe distress, lying very still. Board-like abdominal rigidity. Severe diffuse tenderness, maximal epigastrium. Diffuse rebound. No bowel sounds.
**Vitals:** Temp 38.9°C, BP 98/62, HR 114, RR 26, SpO2 94%
**Labs:** WBC 16.8 (significantly elevated), Hemoglobin 11.2 (mild anemia), Amylase 92 (NORMAL), Lipase 58 (NORMAL)
**Imaging:** Upright CXR: Free air under right hemidiaphragm (pneumoperitoneum). CT: Perforation in anterior duodenal wall. Pneumoperitoneum. Free fluid in Morrison's pouch and pelvis. No pancreatic inflammation.

**Required hypotheses:** Include "Perforated Duodenal Ulcer" as one. Add 2 plausible differentials (e.g., acute pancreatitis — but normal amylase/lipase rules it out; use this as an argument AGAINST pancreatitis).

---

### INT_012
**Chief Complaint:** Abdominal pain, nausea, no bowel movement for 3 days
**Correct diagnosis:** Adhesive Small Bowel Obstruction

**History:** Crampy abdominal pain 3 days, now constant. No stool or gas for 3 days. Bilious vomiting. Unable to eat. Prior abdominal surgery (adhesions).
**Physical Exam:** Dehydrated. Abdominal distention. High-pitched bowel sounds initially, then intermittent. Diffuse tenderness. Minimal guarding. Previous surgical scar.
**Vitals:** Temp 37.2°C, BP 112/68, HR 88, RR 22, SpO2 97%
**Labs:** WBC 10.8 (mildly elevated), Hemoglobin 12.1 (normal), Lactate 1.8 (NORMAL)
**Imaging:** CT: Dilated small bowel loops 4-5cm. Transition point at distal ileum (abrupt caliber change). Collapsed distal bowel and colon. Moderate free fluid in pelvis. No strangulation or ischemia signs. No pneumatosis.

**Required hypotheses:** Include "Adhesive Small Bowel Obstruction" as one. Add 2 plausible differentials.

---

### INT_013
**Chief Complaint:** Right lower abdominal pain for 18 hours
**Correct diagnosis:** Acute Appendicitis (Grade II - Mild)

**History:** Periumbilical pain 18 hours ago, migrated to RLQ after 6 hours. Constant, worsening. Nausea, one vomiting. Anorexia.
**Physical Exam:** Uncomfortable. RLQ tenderness at McBurney's. Guarding. Positive Rovsing's sign. Positive psoas sign. Minimal rebound.
**Vitals:** Temp 38.7°C, BP 120/76, HR 102, RR 18, SpO2 98%
**Labs:** WBC 13.4 (elevated), Hemoglobin 14.5 (normal), CRP 1.1 (moderately elevated)
**Imaging:** CT: Appendix 7mm diameter. Enhancing wall thickening. Subtle periappendiceal stranding. No abscess or free fluid.

**Note:** This is similar to INT_001 but provide different differential hypotheses (e.g., psoas abscess, cecal diverticulitis, terminal ileitis/Crohn's).

---

### INT_014 ⚠️ FOIL CASE
**Chief Complaint:** Abdominal distention and no bowel movement for 3 days post-surgery
**Correct diagnosis:** Paralytic Ileus (Postoperative)
**Foil diagnosis (AI will say this incorrectly):** Mechanical Small Bowel Obstruction

**History:** Laparoscopic cholecystectomy 3 days ago. Now progressive abdominal bloating. No stool or gas. No nausea/vomiting.
**Physical Exam:** Comfortable at rest. Mildly distended abdomen, SOFT. Diffuse mild tenderness, NO guarding or rebound. Clean surgical incisions. Hypoactive bowel sounds present.
**Vitals:** Temp 36.8°C, BP 118/74, HR 84, RR 18, SpO2 98%
**Labs:** WBC 9.2 (NORMAL), Hemoglobin 12.8 (normal), Lactate 1.2 (NORMAL)
**Imaging:** KUB + CT: Generalized dilation of BOTH small AND large bowel. **No focal transition point**. Air-fluid levels throughout. No free air. **No bowel wall thickening. No mesenteric stranding. Normal bowel enhancement.**

**Required hypotheses:** Include BOTH "Paralytic Ileus" AND "Mechanical SBO" plus one more. Key arguments: no transition point and generalized dilation AGAINST mechanical obstruction; recent surgery and normal labs FOR ileus; normal enhancement AGAINST strangulation.

---

### INT_015
**Chief Complaint:** Severe abdominal pain for 8 hours
**Correct diagnosis:** Perforated Peptic Ulcer (Duodenal)

**History:** Sudden sharp upper abdominal pain at midnight (8h ago). Thought indigestion, took antacids. Unrelenting pain. Vomited at 2am. History of epigastric pain for months (undiagnosed).
**Physical Exam:** Lying very still, knees bent. Obvious pain. Diffuse abdominal tenderness, worse epigastrium. Very still and quiet. Positive rebound.
**Vitals:** Temp 38.8°C, BP 96/58, HR 116, RR 26, SpO2 94%
**Labs:** WBC 17.2 (significantly elevated), Hemoglobin 13.6 (normal), Lactate 2.8 (mildly elevated), Amylase 105 (NORMAL upper limit 110), Lipase 95 (NORMAL)
**Imaging:** Upright CXR: Free air under right hemidiaphragm (pneumoperitoneum). CT confirms pneumoperitoneum and peritoneal enhancement. No solid organ injury.

**Note:** Similar to INT_011 but provide different differentials (e.g., acute pancreatitis — ruled out by normal amylase/lipase; ruptured abdominal aortic aneurysm; acute mesenteric ischemia).

---

## Summary

Please provide JSON output for all 15 cases (INT_001 through INT_015).
Each case needs exactly 3 hypotheses (A, B, C) with 3 arguments FOR and 2–3 arguments AGAINST, in both English and Russian.

Keep all arguments under 15 words each. Use medical terminology appropriate for 4th–5th year medical students.
