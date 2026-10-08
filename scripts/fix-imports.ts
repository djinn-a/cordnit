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
  
  if (content.includes("getImageUrl") && !content.includes("import { getImageUrl }")) {
    const finalContent = `import { getImageUrl } from '@/lib/getImageUrl';\n` + content;
    fs.writeFileSync(fullPath, finalContent, 'utf-8');
    console.log(`Added import to ${relPath}`);
  }
}
