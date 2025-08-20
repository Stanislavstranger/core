module.exports = {
  '*.{ts,tsx,js,jsx}': [
    'eslint --fix',
    'prettier --write',
    'jest --bail --findRelatedTests --passWithNoTests',
  ],
  '*.{ts,tsx}': () => 'tsc --noEmit -p tsconfig.json',
  '*.{json,md,css,html}': ['prettier --write'],
};
