const fs = require('fs');

const showcaseFile = fs.readFileSync('src/components/InteractiveShowcase.tsx', 'utf8');
const dataFile = fs.readFileSync('src/data.ts', 'utf8');

const match = showcaseFile.match(/export const PLAYGROUNDS[\s\S]*?};/);
if (!match) {
    console.error('Could not find PLAYGROUNDS object');
    process.exit(1);
}

const content = match[0];
const itemRegex = /name:\s*"([^"]+)",[\s\S]*?description:\s*"([^"]+)",/g;

let items = [];
let itemMatch;
while ((itemMatch = itemRegex.exec(content)) !== null) {
    const title = itemMatch[1];
    let description = itemMatch[2];
    
    // Clean up description (remove Lab # prefixes if desired, but fine to keep)
    description = description.replace(/"/g, '\\"');
    
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Only add if not already present in data.ts
    if (!dataFile.includes(`name: "${slug}"`)) {
      items.push(`      { name: "${slug}", title: "${title}", isNew: true, video: "", author: "Oxygen Playground", releaseDate: "2026-07-03", description: "${description}" }`);
    }
}

console.log('Found ' + items.length + ' new items to add to data.ts');

if (items.length > 0) {
  const newCategory = `  {\n    title: "Playground Elements",\n    items: [\n${items.join(',\n')}\n    ]\n  },\n`;
  const updatedDataFile = dataFile.replace(/export const categories = \[/, 'export const categories = [\n' + newCategory);
  fs.writeFileSync('src/data.ts', updatedDataFile);
  console.log('Successfully added components to data.ts');
} else {
  console.log('All components are already in data.ts');
}
