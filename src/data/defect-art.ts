// Line-drawing of each defect, so someone standing at the printer can identify
// what they are looking at WITHOUT already knowing the jargon. This is the whole
// reason the canonical competitor (Simplify3D's Print Quality Guide) gets linked
// everywhere: it is a grid of pictures, not a list of terms.
//
// Drawn rather than photographed: no licensing, ~1 KB each, sharp at any size,
// readable in a dark theme, and the defect can be exaggerated for recognition.
//
// Convention: `.ok` = geometry as it should be (dim). `.bad` = the defect (accent).
// Canvas is 72×56 with the bed at y=48.

export const defectArt: Record<string, string> = {
  stringing: `
    <rect class="ok" x="13" y="18" width="12" height="30" rx="1"/>
    <rect class="ok" x="47" y="18" width="12" height="30" rx="1"/>
    <path class="bad" d="M25 24c4 3 8-3 11 0s5 3 11 0"/>
    <path class="bad" d="M25 31c4 3 8-3 11 0s5 3 11 0"/>
    <path class="bad" d="M25 38c4 3 8-3 11 0s5 3 11 0"/>
    <line class="bed" x1="6" y1="48" x2="66" y2="48"/>`,

  'first-layer-not-sticking': `
    <line class="bed" x1="6" y1="48" x2="66" y2="48"/>
    <path class="bad" d="M18 40c6-10 14 4 22-2"/>
    <path class="bad" d="M18 40c-4 2-6 5-6 8"/>
    <path class="ok" d="M40 38h16"/>
    <path class="ok" d="M44 32h12"/>
    <circle class="bad" cx="15" cy="44" r="1.6"/>`,

  warping: `
    <line class="bed" x1="6" y1="48" x2="66" y2="48"/>
    <path class="bad" d="M14 40c4-8 10-10 22-10s18 2 22 10"/>
    <path class="ok" d="M20 34h32"/>
    <path class="ok" d="M22 28h28"/>
    <path class="bad" d="M14 40l-3 4M58 40l3 4"/>`,

  'under-extrusion': `
    <line class="bed" x1="6" y1="48" x2="66" y2="48"/>
    <path class="bad" d="M14 42h10M30 42h6M44 42h14"/>
    <path class="bad" d="M14 34h6M26 34h14M48 34h10"/>
    <path class="bad" d="M14 26h16M38 26h4M50 26h8"/>
    <path class="bad" d="M14 18h8M30 18h12M50 18h4"/>`,

  'over-extrusion': `
    <line class="bed" x1="6" y1="48" x2="66" y2="48"/>
    <path class="bad" d="M14 42c8-3 14 3 22 0s14-3 22 0"/>
    <path class="bad" d="M14 33c8 3 14-3 22 0s14 3 22 0"/>
    <path class="bad" d="M14 24c8-3 14 3 22 0s14-3 22 0"/>
    <circle class="bad" cx="30" cy="19" r="3"/>
    <circle class="bad" cx="48" cy="21" r="2.2"/>`,

  'layer-shifting': `
    <line class="bed" x1="6" y1="48" x2="66" y2="48"/>
    <rect class="ok" x="18" y="38" width="30" height="6" rx="1"/>
    <rect class="ok" x="18" y="30" width="30" height="6" rx="1"/>
    <rect class="bad" x="30" y="22" width="30" height="6" rx="1"/>
    <rect class="bad" x="30" y="14" width="30" height="6" rx="1"/>`,

  'elephant-foot': `
    <line class="bed" x1="6" y1="48" x2="66" y2="48"/>
    <path class="ok" d="M22 44V16h28v28"/>
    <path class="bad" d="M22 44c0-3-4-3-4 4h36c0-7-4-7-4-4"/>`,

  'ringing-ghosting': `
    <line class="bed" x1="6" y1="48" x2="66" y2="48"/>
    <path class="ok" d="M16 44V18h8"/>
    <path class="bad" d="M24 18c4 0 4 6 8 6s4-5 8-5 4 4 8 4 4-3 8-3"/>
    <path class="bad" d="M24 28c4 0 4 6 8 6s4-5 8-5 4 4 8 4 4-3 8-3"/>
    <path class="bad" d="M24 38c4 0 4 5 8 5s4-4 8-4 4 3 8 3 4-2 8-2"/>`,

  'layer-separation': `
    <line class="bed" x1="6" y1="48" x2="66" y2="48"/>
    <rect class="ok" x="20" y="40" width="32" height="5" rx="1"/>
    <rect class="ok" x="20" y="33" width="32" height="5" rx="1"/>
    <rect class="bad" x="20" y="22" width="32" height="5" rx="1"/>
    <rect class="bad" x="20" y="15" width="32" height="5" rx="1"/>
    <path class="bad" d="M22 30h6l3-3 4 5 4-4 3 2h8"/>`,

  'blobs-and-zits': `
    <line class="bed" x1="6" y1="48" x2="66" y2="48"/>
    <path class="ok" d="M22 44V16h28v28"/>
    <circle class="bad" cx="36" cy="21" r="3"/>
    <circle class="bad" cx="36" cy="30" r="2.4"/>
    <circle class="bad" cx="36" cy="38" r="3.2"/>`,

  pillowing: `
    <line class="bed" x1="6" y1="48" x2="66" y2="48"/>
    <path class="ok" d="M16 44V26h40v18"/>
    <path class="bad" d="M16 26c5-4 9 4 14 0s9 4 12 0 8 3 14 0"/>
    <circle class="bad" cx="27" cy="21" r="2.2"/>
    <circle class="bad" cx="41" cy="20" r="1.8"/>
    <circle class="bad" cx="52" cy="22" r="2"/>`,

  'clogged-nozzle': `
    <path class="ok" d="M28 12h16v14l-6 8h-4l-6-8z"/>
    <circle class="bad" cx="36" cy="24" r="3.4"/>
    <path class="bad" d="M36 34v3M36 39v2"/>
    <line class="bed" x1="6" y1="48" x2="66" y2="48"/>
    <path class="bad" d="M22 44h6M34 44h3M44 44h8"/>`,
};
