/** Plain markup on purpose: Suspense fallbacks are prerendered, and antd must not load during prerender. */
export default function PageSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite" aria-label="Loading">
      <div className="cms-skel" style={{ width: 220, height: 32, marginBottom: 20 }} />
      <div style={{ background: "#fff", borderRadius: 12, padding: 24, display: "grid", gap: 14 }}>
        {[90, 70, 80, 60, 75, 65].map((w, i) => (
          <div key={i} className="cms-skel" style={{ width: `${w}%`, height: 16 }} />
        ))}
      </div>
    </div>
  );
}
