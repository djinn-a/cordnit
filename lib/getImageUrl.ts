export function getImageUrl(path: string | undefined) {
  if (!path) return '';
  // Return the original path if it's an external URL or an SVG (as we kept SVGs local)
  if (path.startsWith('http') || path.endsWith('.svg')) {
    return path;
  }

  // Ensure path starts without a leading slash for the bucket
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Use NEXT_PUBLIC_SUPABASE_URL if available, otherwise assume a standard Next.js env
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  
  return `${supabaseUrl}/storage/v1/object/public/website-assets/${cleanPath}`;
}
