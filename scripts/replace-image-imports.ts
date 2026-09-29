import fs from 'fs';
import path from 'path';

const dirsToScan = [
  path.join(process.cwd(), 'app'),
  path.join(process.cwd(), 'components'),
];

function processDirectory(dirPath: string) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      // Don't replace inside the wrapper itself!
      if (fullPath.endsWith('components/ui/Image.tsx')) continue;

      let content = fs.readFileSync(fullPath, 'utf-8');
      const importRegex = /import\s+Image\s+from\s+['"]next\/image['"];?/g;
      
      if (importRegex.test(content)) {
        content = content.replace(importRegex, "import { Image } from '@/components/ui/Image';");
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Updated ${path.relative(process.cwd(), fullPath)}`);
      }
    }
  }
}

dirsToScan.forEach(dir => processDirectory(dir));
console.log("Finished replacing imports.");
