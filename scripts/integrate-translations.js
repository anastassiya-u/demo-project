/**
 * Integration Script: Integrate Russian translations into cases_russian.json
 * Parses translated markdown files and adds _ru fields to clinical evidence
 */

const fs = require('fs');
const path = require('path');

// Load the current cases_russian.json
const casesData = require('../src/data/cases_russian.json');

// Read translation files
const clinicalEvidenceMd = fs.readFileSync('CLINICAL_EVIDENCE_TO_TRANSLATE_ru.md', 'utf8');
const labAnnotationsMd = fs.readFileSync('LAB_ANNOTATIONS_TO_TRANSLATE_ru.md', 'utf8');

console.log('🔍 Parsing Russian translations...\n');

/**
 * Parse clinical evidence translations from markdown
 */
function parseClinicalEvidence(markdown) {
  const cases = {};
  const caseBlocks = markdown.split('---').filter(b => b.trim());

  caseBlocks.forEach(block => {
    // Extract case ID
    const idMatch = block.match(/## (INT_\d+):/);
    if (!idMatch) return;

    const caseId = idMatch[1];
    cases[caseId] = {
      supportingEvidence_ru: [],
      clinicalReasoning_ru: '',
      contrastiveEvidence_ru: {
        supporting: [],
        challenging: []
      }
    };

    // Extract supportingEvidence
    const supportingMatch = block.match(/### supportingEvidence[^\n]*\n([\s\S]*?)(?=\n###|$)/);
    if (supportingMatch) {
      const items = supportingMatch[1].match(/^\d+\.\s(.+)$/gm);
      if (items) {
        cases[caseId].supportingEvidence_ru = items.map(item =>
          item.replace(/^\d+\.\s/, '').trim()
        );
      }
    }

    // Extract clinicalReasoning
    const reasoningMatch = block.match(/### clinicalReasoning:\n([\s\S]*?)(?=\n###|---|\n\n##|$)/);
    if (reasoningMatch) {
      cases[caseId].clinicalReasoning_ru = reasoningMatch[1].trim();
    }

    // Extract contrastiveEvidence.supporting
    const contrastSupportMatch = block.match(/### contrastiveEvidence\.supporting:\n([\s\S]*?)(?=\n###|$)/);
    if (contrastSupportMatch) {
      const items = contrastSupportMatch[1].match(/^\d+\.\s(.+)$/gm);
      if (items) {
        cases[caseId].contrastiveEvidence_ru.supporting = items.map(item =>
          item.replace(/^\d+\.\s/, '').trim()
        );
      }
    }

    // Extract contrastiveEvidence.challenging
    const contrastChallMatch = block.match(/### contrastiveEvidence\.challenging:\n([\s\S]*?)(?=\n###|---|\n\n##|$)/);
    if (contrastChallMatch) {
      const items = contrastChallMatch[1].match(/^\d+\.\s(.+)$/gm);
      if (items) {
        cases[caseId].contrastiveEvidence_ru.challenging = items.map(item =>
          item.replace(/^\d+\.\s/, '').trim()
        );
      }
    }
  });

  return cases;
}

/**
 * Parse lab annotations from markdown
 */
function parseLabAnnotations(markdown) {
  const labs = {};
  const caseBlocks = markdown.split('##').filter(b => b.trim());

  caseBlocks.forEach(block => {
    // Extract case ID
    const idMatch = block.match(/^([A-Z]+_\d+):/);
    if (!idMatch) return;

    const caseId = idMatch[1];

    // Extract JSON block
    const jsonMatch = block.match(/```json\n"labs":\s*\{([\s\S]*?)\}\n```/);
    if (!jsonMatch) return;

    const labsContent = '{' + jsonMatch[1] + '}';

    try {
      // Parse the JSON (handling trailing commas)
      const labsJson = JSON.parse(labsContent.replace(/,(\s*[}\]])/g, '$1'));
      labs[caseId] = labsJson;
    } catch (e) {
      console.error(`⚠️  Failed to parse labs for ${caseId}:`, e.message);
    }
  });

  return labs;
}

// Parse translations
console.log('📖 Parsing clinical evidence translations...');
const clinicalTranslations = parseClinicalEvidence(clinicalEvidenceMd);
console.log(`   Found ${Object.keys(clinicalTranslations).length} cases`);

console.log('📖 Parsing lab annotation translations...');
const labTranslations = parseLabAnnotations(labAnnotationsMd);
console.log(`   Found ${Object.keys(labTranslations).length} cases`);

// Integrate translations into cases_russian.json
console.log('\n🔧 Integrating translations...\n');

let updatedCount = 0;

casesData.cases.forEach((caseData, index) => {
  const caseId = caseData.id;

  // Add clinical evidence translations (INT cases only)
  if (clinicalTranslations[caseId]) {
    const trans = clinicalTranslations[caseId];

    caseData.supportingEvidence_ru = trans.supportingEvidence_ru;
    caseData.clinicalReasoning_ru = trans.clinicalReasoning_ru;

    if (caseData.contrastiveEvidence) {
      caseData.contrastiveEvidence_ru = {
        supporting: trans.contrastiveEvidence_ru.supporting,
        challenging: trans.contrastiveEvidence_ru.challenging
      };
    }

    console.log(`✅ ${caseId}: Added clinical evidence translations`);
    updatedCount++;
  }

  // Update lab annotations (all cases)
  if (labTranslations[caseId] && caseData.labs) {
    Object.keys(labTranslations[caseId]).forEach(labKey => {
      if (caseData.labs[labKey]) {
        caseData.labs[labKey] = labTranslations[caseId][labKey];
      }
    });

    console.log(`✅ ${caseId}: Updated lab annotations`);
  }
});

// Update metadata
casesData.metadata.last_updated = new Date().toISOString().split('T')[0];
casesData.metadata.language = 'ru';
casesData.metadata.translation_version = '2.0';
casesData.metadata.translation_notes = 'Professional medical translation including clinical evidence, reasoning, and lab annotations';

// Save updated file
fs.writeFileSync(
  path.join(__dirname, '../src/data/cases_russian.json'),
  JSON.stringify(casesData, null, 2),
  'utf8'
);

console.log('\n' + '='.repeat(60));
console.log('✅ INTEGRATION COMPLETE');
console.log('='.repeat(60));
console.log(`\n📊 Summary:`);
console.log(`   - Clinical evidence added: ${updatedCount} cases`);
console.log(`   - Lab annotations updated: ${Object.keys(labTranslations).length} cases`);
console.log(`   - Output: src/data/cases_russian.json`);
console.log(`\n💾 File size: ${Math.round(fs.statSync('src/data/cases_russian.json').size / 1024)}KB\n`);
