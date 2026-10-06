import { createClient } from "@supabase/supabase-js";

const BUCKET = "website-assets";
const src = createClient(process.env.OLD_URL!, process.env.OLD_KEY!, { auth: { persistSession: false } });
const dst = createClient(process.env.NEW_URL!, process.env.NEW_KEY!, { auth: { persistSession: false } });

async function listAll(prefix = ""): Promise<string[]> {
  const out: string[] = [];
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await src.storage.from(BUCKET).list(prefix, { limit: 1000, offset });
    if (error) throw error;
    for (const e of data) {
      const p = prefix ? `${prefix}/${e.name}` : e.name;
      if (e.id === null) out.push(...(await listAll(p)));
      else out.push(p);
    }
    if (data.length < 1000) return out;
  }
}

async function main() {
  const { data: buckets, error } = await dst.storage.listBuckets();
  if (error) throw error;
  if (!buckets.some((b) => b.id === BUCKET)) {
    const { error: e } = await dst.storage.createBucket(BUCKET, { public: true, fileSizeLimit: 52428800 });
    if (e) throw e;
    console.log(`created bucket ${BUCKET}`);
  }

  const paths = await listAll();
  console.log(`found ${paths.length} objects`);
  let ok = 0;
  for (const p of paths) {
    const { data: blob, error: dlErr } = await src.storage.from(BUCKET).download(p);
    if (dlErr) throw new Error(`download ${p}: ${dlErr.message}`);
    const { error: upErr } = await dst.storage
      .from(BUCKET)
      .upload(p, blob, { contentType: blob.type || undefined, upsert: true, cacheControl: "3600" });
    if (upErr) throw new Error(`upload ${p}: ${upErr.message}`);
    ok++;
  }
  console.log(`copied ${ok}/${paths.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
