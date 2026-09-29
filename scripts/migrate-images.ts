import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
// @ts-ignore
// Let's use simple extension based mime-type instead of installing mime-types
const mimeTypes: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif'
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY; // Using service role key to bypass RLS and create buckets

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const BUCKET_NAME = 'website-assets';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

async function ensureBucketExists() {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    console.error("Error listing buckets:", listError);
    process.exit(1);
  }

  const bucketExists = buckets.some(b => b.name === BUCKET_NAME);
  if (!bucketExists) {
    console.log(`Creating public bucket '${BUCKET_NAME}'...`);
    const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 52428800, // 50MB
    });
    if (createError) {
      console.error("Error creating bucket:", createError);
      process.exit(1);
    }
    console.log(`Bucket '${BUCKET_NAME}' created successfully.`);
  } else {
    console.log(`Bucket '${BUCKET_NAME}' already exists.`);
  }
}

function getFilesToUpload(dirPath: string): string[] {
  let files: string[] = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files = [...files, ...getFilesToUpload(fullPath)];
    } else {
      // Exclude SVG as requested, include common image formats
      if (/\.(webp|png|jpg|jpeg|gif)$/i.test(entry.name)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function uploadFiles() {
  const files = getFilesToUpload(PUBLIC_DIR);
  console.log(`Found ${files.length} images to upload (excluding SVGs).`);

  for (const filePath of files) {
    const relativePath = path.relative(PUBLIC_DIR, filePath);
    // Supabase paths use forward slashes
    const supabasePath = relativePath.split(path.sep).join('/');
    
    console.log(`Uploading ${supabasePath}...`);
    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    const { error } = await supabase.storage.from(BUCKET_NAME).upload(supabasePath, fileBuffer, {
      contentType,
      upsert: true, // Overwrite if exists
    });

    if (error) {
      console.error(`Failed to upload ${supabasePath}:`, error.message);
    }
  }
  console.log("Upload complete.");
}

async function main() {
  await ensureBucketExists();
  await uploadFiles();
}

main();
