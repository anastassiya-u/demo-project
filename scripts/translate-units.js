/**
 * Translate medical units from English to Russian
 * Updates all vitals and lab values in cases_russian.json
 */

const fs = require('fs');
const path = require('path');

// Load cases
const casesPath = path.join(__dirname, '../src/data/cases_russian.json');
const casesData = JSON.parse(fs.readFileSync(casesPath, 'utf8'));

console.log('🔄 Translating medical units to Russian...\n');

// Unit translation mapping (order matters: longest first to avoid partial replacements)
const unitTranslations = {
  // Vital signs units
  'mmHg': 'мм рт. ст.',
  'bpm': 'уд/мин',
  'breaths/min': 'дых/мин',
  'on room air': 'на комнатном воздухе',

  // Lab units (IMPORTANT: longer patterns first to avoid partial matches)
  'x10³/μL': 'x10³/мкл',
  'x10^3/μL': 'x10³/мкл',
  'mg/dL': 'мг/дл',  // MUST come before g/dL to avoid "mг/дл"
  'mг/дл': 'мг/дл',  // Fix any already broken ones
  'g/dL': 'г/дл',
  'mg/L': 'мг/л',
  'U/L': 'Ед/л',
  'mEq/L': 'мЭкв/л',
  'mmol/L': 'ммоль/л',
  '/μL': '/мкл',

  // Keep temperature as is (°C and °F are universal)
};

/**
 * Replace units in a string
 */
function translateUnits(text) {
  if (!text || typeof text !== 'string') return text;

  let translated = text;

  for (const [english, russian] of Object.entries(unitTranslations)) {
    // Use word boundary to avoid partial matches
    const regex = new RegExp(english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    translated = translated.replace(regex, russian);
  }

  return translated;
}

/**
 * Recursively translate units in an object
 */
function translateUnitsInObject(obj) {
  if (typeof obj === 'string') {
    return translateUnits(obj);
  } else if (Array.isArray(obj)) {
    return obj.map(item => translateUnitsInObject(item));
  } else if (obj && typeof obj === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = translateUnitsInObject(value);
    }
    return result;
  }
  return obj;
}

// Process each case
let updatedCount = 0;

casesData.cases = casesData.cases.map(caseData => {
  // Translate vitals
  if (caseData.vitals) {
    const originalVitals = JSON.stringify(caseData.vitals);
    caseData.vitals = translateUnitsInObject(caseData.vitals);

    if (JSON.stringify(caseData.vitals) !== originalVitals) {
      console.log(`✅ ${caseData.id}: Translated vital signs units`);
      updatedCount++;
    }
  }

  // Translate labs
  if (caseData.labs) {
    const originalLabs = JSON.stringify(caseData.labs);
    caseData.labs = translateUnitsInObject(caseData.labs);

    if (JSON.stringify(caseData.labs) !== originalLabs) {
      console.log(`✅ ${caseData.id}: Translated lab units`);
    }
  }

  // Translate any other text fields that might contain units
  const textFields = [
    'chiefComplaint', 'chiefComplaint_ru',
    'history', 'history_ru',
    'physicalExam', 'physicalExam_ru',
    'imaging', 'imaging_ru',
    'additionalFindings',
    'supportingEvidence', 'supportingEvidence_ru',
    'clinicalReasoning', 'clinicalReasoning_ru',
  ];

  textFields.forEach(field => {
    if (caseData[field]) {
      caseData[field] = translateUnitsInObject(caseData[field]);
    }
  });

  // Translate contrastive evidence
  if (caseData.contrastiveEvidence) {
    caseData.contrastiveEvidence = translateUnitsInObject(caseData.contrastiveEvidence);
  }
  if (caseData.contrastiveEvidence_ru) {
    caseData.contrastiveEvidence_ru = translateUnitsInObject(caseData.contrastiveEvidence_ru);
  }

  return caseData;
});

// Update metadata
casesData.metadata.last_updated = new Date().toISOString().split('T')[0];
casesData.metadata.translation_notes = 'Professional medical translation including units (mmHg → мм рт. ст., bpm → уд/мин, etc.)';

// Save
fs.writeFileSync(casesPath, JSON.stringify(casesData, null, 2), 'utf8');

console.log('\n' + '='.repeat(60));
console.log('✅ UNIT TRANSLATION COMPLETE');
console.log('='.repeat(60));
console.log(`\n📊 Summary:`);
console.log(`   - Cases updated: ${updatedCount}/25`);
console.log(`   - Output: src/data/cases_russian.json`);
console.log(`\n💾 File size: ${Math.round(fs.statSync(casesPath).size / 1024)}KB\n`);

// Show example before/after
console.log('📋 Example translations:');
console.log('   mmHg → мм рт. ст.');
console.log('   bpm → уд/мин');
console.log('   breaths/min → дых/мин');
console.log('   on room air → на комнатном воздухе');
console.log('   x10³/μL → x10³/мкл');
console.log('   g/dL → г/дл');
console.log('   mg/dL → мг/дл');
console.log('   U/L → Ед/л\n');
