import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  "components/features/about/AboutContent/AboutContent.tsx",
  "components/features/about/AboutTeam/TeamMemberCard.tsx",
  "components/features/about/AboutHero/AboutHero.tsx",
  "components/features/home/InsightsSection/InsightCard.tsx",
  "components/features/home/RecognitionSection/RecognitionCard.tsx",
  "components/features/contact/ContactHero/ContactHero.tsx",
  "components/features/home/HeroSection/HeroMedia.tsx",
  "components/layout/Navbar/Navbar.tsx",
  "components/blocks/CtaSection/CtaSection.tsx",
  "components/layout/Footer/Footer.tsx"
];

for (const relPath of filesToUpdate) {
  const fullPath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) continue;

  const content = fs.readFileSync(fullPath, 'utf-8');
  
  let modified = false;

  const newContent = content
    .replace(/<img([\s\S]*?)src="([^"]+)"/g, (match, p1, p2) => {
      modified = true;
      return `<img${p1}src={getImageUrl("${p2}")}`;
    })
    .replace(/<img([\s\S]*?)src={([^}]+)}/g, (match, p1, p2) => {
      if (p2.includes('getImageUrl')) return match;
      modified = true;
      return `<img${p1}src={getImageUrl(${p2})}`;
    });

  if (modified) {
    let finalContent = newContent;
    if (!finalContent.includes("getImageUrl")) {
      finalContent = `import { getImageUrl } from '@/lib/getImageUrl';\n` + finalContent;
    }
    fs.writeFileSync(fullPath, finalContent, 'utf-8');
    console.log(`Updated ${relPath}`);
  }
}
