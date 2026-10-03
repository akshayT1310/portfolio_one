export function FloatingBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(rgba(17,24,39,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.025)_1px,transparent_1px),radial-gradient(ellipse_at_12%_0%,rgba(196,181,253,0.26),transparent_36%),radial-gradient(ellipse_at_88%_12%,rgba(165,243,252,0.2),transparent_32%)] bg-[size:56px_56px,56px_56px,auto,auto]"
    />
  );
}