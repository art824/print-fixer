// Central registry: powers the homepage symptom picker, every defect page,
// and the automatic "related problems" interlinking.
//
// Editorial rules for this file:
//  - Fixes are ordered by what actually fixes it most often, not by theory.
//  - Every setting names the slicer path, because "lower your retraction" is
//    useless advice and it is what every forum thread already says.
//  - Ranges are starting points for 0.4 mm nozzles unless stated.

export interface Setting {
  name: string;
  where: string;
  try: string;
}

export interface Fix {
  title: string;
  why: string;
  /** 'first' = try this before anything else; 'common' = frequent; 'less' = rarer cause */
  rank: 'first' | 'common' | 'less';
  settings?: Setting[];
  action?: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Defect {
  slug: string;
  /** short label for the symptom picker */
  short: string;
  /** one-line description of what the user is looking at */
  looksLike: string;
  metaTitle: string;
  description: string;
  h1: string;
  intro: string;
  fixes: Fix[];
  faqs: Faq[];
}

export const defects: Defect[] = [
  {
    slug: 'stringing',
    short: 'Stringing / wispy hairs',
    looksLike: 'Thin plastic whiskers strung between separate parts of the model.',
    metaTitle: 'Fix 3D Print Stringing — Retraction & Temp Settings',
    description:
      'Fix stringing on PLA and PETG in the order that works: dry the filament, drop temperature, then tune retraction. Exact settings for Cura and OrcaSlicer.',
    h1: 'Stringing and oozing',
    intro:
      'Thin hairs between towers or across gaps. Almost always molten plastic leaking out of the nozzle during travel moves — so the fix is either less pressure in the nozzle, or less time for it to leak.',
    fixes: [
      {
        title: 'Dry the filament',
        why: 'Wet filament is the single most common cause and no retraction setting will fix it. Water in the filament flashes to steam at the nozzle and pushes plastic out. PETG, TPU and nylon absorb moisture in days; PLA takes weeks but still does it.',
        rank: 'first',
        action:
          'Dry at 45–55 °C for 4–6 hours for PLA, 60–65 °C for 6–8 hours for PETG and nylon. A filament dryer, a food dehydrator, or an oven that can hold a low temperature all work. Tell-tale sign: popping or hissing from the nozzle while printing.',
      },
      {
        title: 'Lower the nozzle temperature',
        why: 'Hotter plastic is thinner and leaks more easily. Drop in 5 °C steps and re-print — the difference between 215 °C and 200 °C on the same PLA is often the whole problem.',
        rank: 'first',
        settings: [
          { name: 'Printing Temperature', where: 'Cura → Material', try: '−5 °C at a time, down to the low end of the spool label' },
          { name: 'Nozzle temperature', where: 'OrcaSlicer / Bambu Studio → Filament → Filament', try: '−5 °C per test' },
          { name: 'Nozzle → Other layers', where: 'PrusaSlicer → Filament Settings → Temperature', try: '−5 °C per test' },
        ],
      },
      {
        title: 'Increase retraction distance',
        why: 'Retraction pulls filament back so pressure drops before a travel move. Too little and it keeps oozing. Direct drive needs far less than Bowden — using a Bowden value on a direct-drive printer causes its own problems.',
        rank: 'common',
        settings: [
          { name: 'Retraction Distance', where: 'Cura → Travel', try: 'Direct drive: 0.5–1.5 mm · Bowden: 4–7 mm' },
          { name: 'Retraction length', where: 'OrcaSlicer → Filament → Setting Overrides', try: 'Direct drive: 0.5–1.5 mm · Bowden: 4–7 mm' },
          { name: 'Length', where: 'PrusaSlicer → Printer Settings → Extruder 1 → Retraction', try: 'Direct drive: 0.5–1.5 mm · Bowden: 4–7 mm' },
        ],
      },
      {
        title: 'Raise travel speed',
        why: 'The faster the head crosses open air, the less time any ooze has to form a visible string. This is a real fix, not a workaround — it often clears the last faint hairs after temperature is already right.',
        rank: 'common',
        settings: [
          { name: 'Travel Speed', where: 'Cura → Speed', try: '150–200 mm/s if your frame handles it' },
          { name: 'Travel speed', where: 'OrcaSlicer → Process → Speed → Travel', try: '150–250 mm/s' },
        ],
      },
      {
        title: 'Turn on combing / avoid crossing perimeters',
        why: 'Keeps travel moves inside the model where a string will not show on the outside surface. Does not stop the ooze, but hides what is left of it.',
        rank: 'less',
        settings: [
          { name: 'Combing Mode', where: 'Cura → Travel', try: 'Within Infill' },
          { name: 'Avoid crossing walls', where: 'OrcaSlicer → Process → Quality', try: 'Enabled' },
        ],
      },
    ],
    faqs: [
      {
        q: 'Why does my PETG string so much more than PLA?',
        a: 'PETG is stickier when molten and absorbs moisture much faster — a spool left out for a week is often already wet. Expect to dry PETG far more often than PLA, and to run it 10–20 °C above PLA temperatures, which also makes it ooze more readily.',
      },
      {
        q: 'Does more retraction always mean less stringing?',
        a: 'No, and past a point it makes things worse. Too much retraction pulls molten plastic up into the cool zone of the hotend, where it can jam, and it grinds a flat spot into the filament. On direct drive, anything above about 2 mm is usually a sign the real problem is temperature or moisture.',
      },
      {
        q: 'Can I just remove the strings afterwards?',
        a: 'For a one-off, a heat gun on low or a quick pass with a lighter will melt light wisps away. It is a cosmetic patch, not a fix — heavy stringing usually means the same underlying cause is also hurting dimensional accuracy and surface finish.',
      },
    ],
  },
  {
    slug: 'first-layer-not-sticking',
    short: 'First layer not sticking',
    looksLike: 'The print peels off the bed, or the first layer never bonds and turns into spaghetti.',
    metaTitle: 'First Layer Not Sticking — Fix Bed Adhesion Step by Step',
    description:
      'First layer lifting or not bonding? Fix it in order: wash the bed, set Z-offset, bed temp, first-layer speed. Exact settings for Cura and OrcaSlicer.',
    h1: 'First layer not sticking',
    intro:
      'The most common failure in FDM, and almost never the fault of the bed surface people usually blame. Work through these in order — the first two fix the large majority of cases.',
    fixes: [
      {
        title: 'Wash the bed with soap and water',
        why: 'Fingerprints leave an invisible oil film that nothing sticks to. Isopropyl alcohol smears oil around rather than removing it — dish soap and warm water actually lifts it. This fixes more "my PEI sheet is dead" cases than any setting.',
        rank: 'first',
        action:
          'Take the sheet off, wash both sides with dish soap and warm water, rinse, dry with a clean paper towel, and handle it by the edges afterwards. On smooth PEI, an occasional light scuff with a green scouring pad restores tooth.',
      },
      {
        title: 'Set the Z-offset so the first layer is squished',
        why: 'A correct first layer is slightly squashed, not round. If you can see gaps between the first-layer lines, the nozzle is too high. Lower in 0.02–0.025 mm steps while printing and watch the lines merge.',
        rank: 'first',
        action:
          'Print a first-layer test patch and adjust live (on most printers: Tune → Z-offset, or the Live-Z / Baby-stepping menu). The lines should touch each other with no valleys, and the surface should look smooth rather than corduroy.',
      },
      {
        title: 'Raise the bed temperature',
        why: 'A cold bed will not let the plastic bond. It also matters that the bed reaches temperature before probing, since the sheet expands as it heats.',
        rank: 'common',
        settings: [
          { name: 'Build Plate Temperature', where: 'Cura → Material', try: 'PLA 55–65 °C · PETG 70–85 °C · ABS/ASA 95–110 °C' },
          { name: 'Bed temperature', where: 'OrcaSlicer → Filament → Filament', try: 'PLA 55–65 °C · PETG 70–85 °C · ABS/ASA 95–110 °C' },
        ],
      },
      {
        title: 'Slow the first layer down',
        why: 'The first layer needs time to melt into the texture of the sheet. Anything above about 30 mm/s on the first layer is asking for trouble, no matter how fast the rest of the print runs.',
        rank: 'common',
        settings: [
          { name: 'Initial Layer Speed', where: 'Cura → Speed', try: '20–25 mm/s' },
          { name: 'First layer speed', where: 'OrcaSlicer → Process → Speed', try: '20–30 mm/s' },
          { name: 'First layer speed', where: 'PrusaSlicer → Print Settings → Speed', try: '20–25 mm/s' },
        ],
      },
      {
        title: 'Add a brim',
        why: 'A brim multiplies the contact area at the corners, which is where lifting starts. Costs a few grams and a knife-trim, and rescues tall or small-footprint parts that will never stick otherwise.',
        rank: 'less',
        settings: [
          { name: 'Build Plate Adhesion Type', where: 'Cura → Build Plate Adhesion', try: 'Brim, 5–8 mm width' },
          { name: 'Brim type / width', where: 'OrcaSlicer → Process → Support → Raft/Brim', try: 'Outer brim, 5 mm' },
        ],
      },
      {
        title: 'Turn the first-layer fan off',
        why: 'Cooling air on the first layer fights the bed heat and causes lifting, especially with PETG, ABS and ASA. Nearly every stock profile already disables it — if yours does not, that alone can be the whole problem.',
        rank: 'less',
        settings: [
          { name: 'Regular Fan Speed at Layer', where: 'Cura → Cooling', try: 'Start fan at layer 2–4, 0 % before that' },
          { name: 'Fan speed → first layer', where: 'OrcaSlicer → Filament → Cooling', try: '0 %' },
        ],
      },
    ],
    faqs: [
      {
        q: 'Should I use glue stick or hairspray?',
        a: 'Only as a release agent, not as glue. On smooth PEI, PETG and TPU bond so well they can tear chunks out of the sheet — a thin layer of glue stick there is protecting the plate, not improving adhesion. If PLA needs glue to stick, something else is wrong.',
      },
      {
        q: 'My bed is level but the first layer is still bad. Why?',
        a: 'Level and Z-offset are different things. Level means the four corners are the same height; Z-offset is how far the nozzle sits above that plane. A perfectly level bed with a Z-offset 0.1 mm too high will still fail everywhere, evenly.',
      },
      {
        q: 'Does auto bed leveling replace manual levelling?',
        a: 'No. Probes compensate for a warped or tilted surface, but the mesh is built relative to whatever Z-offset you set, and most probes cannot correct a bed that is badly out to begin with. Manually get the corners close, then let the probe handle what is left.',
      },
    ],
  },
  {
    slug: 'warping',
    short: 'Warping / corners lifting',
    looksLike: 'Corners curl up off the bed and the bottom of the print is no longer flat.',
    metaTitle: 'Fix 3D Print Warping — Stop Corners Lifting Off the Bed',
    description:
      'Stop corners lifting off the bed on ABS, ASA and PETG: draft control, bed temperature, cooling and brim. Exact settings for Cura and OrcaSlicer.',
    h1: 'Warping and lifting corners',
    intro:
      'Plastic shrinks as it cools. When the top of a part cools and contracts faster than the layer glued to the bed, something has to give — and it is usually the corners. This is a temperature-gradient problem, so the fixes are all about cooling the part more evenly.',
    fixes: [
      {
        title: 'Stop the draft',
        why: 'An open window, an air conditioner, or a fan pointed at the printer will warp ABS and ASA every time regardless of settings. Even PETG suffers. This is the cheapest fix on the list and the most overlooked.',
        rank: 'first',
        action:
          'Enclose the printer, even crudely — a cardboard box or a photo tent works. For ABS and ASA an enclosure is not optional; for PLA it usually is not needed at all, and can cause heat creep instead.',
      },
      {
        title: 'Raise the bed temperature',
        why: 'Keeping the bottom of the part hot keeps it soft enough to relieve stress instead of tearing off the plate. Go to the top of the material range.',
        rank: 'first',
        settings: [
          { name: 'Build Plate Temperature', where: 'Cura → Material', try: 'ABS/ASA 100–110 °C · PETG 80–85 °C · PLA 60–65 °C' },
          { name: 'Bed temperature', where: 'OrcaSlicer → Filament → Filament', try: 'ABS/ASA 100–110 °C · PETG 80–85 °C' },
        ],
      },
      {
        title: 'Reduce part cooling',
        why: 'Counter-intuitive but correct for high-shrinkage materials: the fan is what creates the temperature gradient tearing the part off the bed. ABS and ASA generally want almost no fan; PLA wants a lot.',
        rank: 'common',
        settings: [
          { name: 'Fan Speed', where: 'Cura → Cooling', try: 'ABS/ASA 0–20 % · PETG 30–50 % · PLA 100 %' },
          { name: 'Fan speed', where: 'OrcaSlicer → Filament → Cooling', try: 'ABS/ASA 0–20 % · PETG 30–50 %' },
        ],
      },
      {
        title: 'Add a brim and round the corners',
        why: 'A brim holds the corners down mechanically while the part is most vulnerable. If you control the model, a 2–3 mm fillet on the bottom corners removes the stress concentration entirely — sharp corners warp first for the same reason cracks start at sharp edges.',
        rank: 'common',
        settings: [
          { name: 'Build Plate Adhesion Type', where: 'Cura → Build Plate Adhesion', try: 'Brim, 8–10 mm for ABS' },
          { name: 'Brim width', where: 'OrcaSlicer → Process → Support', try: '8–10 mm' },
        ],
      },
      {
        title: 'Switch material if the geometry is the problem',
        why: 'A long flat part in ABS will fight you forever. PLA shrinks about a fifth as much as ABS and PETG sits in between. If the part does not need heat resistance or toughness, the material is the variable worth changing.',
        rank: 'less',
      },
    ],
    faqs: [
      {
        q: 'Why does ABS warp so much more than PLA?',
        a: 'Shrinkage on cooling. ABS contracts roughly 0.7–0.8 % as it cools, PLA about 0.2–0.3 %. Over a 200 mm part that is well over a millimetre of pull for ABS — more than enough to peel a corner. It is a material property, not a printer fault.',
      },
      {
        q: 'Will a raft stop warping?',
        a: 'Sometimes, but it treats the symptom. A raft gives more surface area and a sacrificial layer to warp instead of your part, at the cost of material, time and a rough bottom surface. Fix the thermal environment first; reach for a raft when geometry leaves no other option.',
      },
      {
        q: 'My print warped only on one side. What does that mean?',
        a: 'Almost always a draft from one direction, or an uneven bed where one region runs cooler. Check whether the lifted side faces a door, window or vent, and compare bed temperature at the centre versus that corner with an infrared thermometer if you have one.',
      },
    ],
  },
  {
    slug: 'under-extrusion',
    short: 'Under-extrusion / gaps',
    looksLike: 'Thin, patchy or missing lines; walls with gaps between them; weak brittle parts.',
    metaTitle: 'Fix Under-Extrusion — Gaps, Thin Walls and Missing Lines',
    description:
      'Gappy walls and thin lines: find the partial clog first, then temperature, flow rate and extruder tension. Exact settings for Cura and OrcaSlicer.',
    h1: 'Under-extrusion',
    intro:
      'Less plastic is coming out than the slicer asked for. The result is gappy walls, weak parts and a top surface you can see through. The causes split cleanly into "something is blocking it" and "the numbers are wrong" — check the blockage first, because tuning numbers around a partial clog wastes hours.',
    fixes: [
      {
        title: 'Check for a partial clog',
        why: 'A partially blocked nozzle under-extrudes intermittently, which is why the problem seems to come and go. Test it before touching any setting: heat the nozzle and push filament through by hand.',
        rank: 'first',
        action:
          'Heat to printing temperature, release the extruder tension, and push filament through by hand. It should come out in a smooth straight line with light pressure. If it curls hard to one side, dribbles, or needs real force, do a cold pull (heat, cool to ~90 °C for PLA, pull the filament out sharply) and inspect the tip for burnt residue.',
      },
      {
        title: 'Raise the nozzle temperature',
        why: 'Plastic that is too cool is too viscous to push at print speed. This shows up first on fast prints and thick layers — the same profile that works at 40 mm/s under-extrudes at 150 mm/s because the hotend cannot melt fast enough.',
        rank: 'first',
        settings: [
          { name: 'Printing Temperature', where: 'Cura → Material', try: '+5 °C at a time, up to the high end of the spool label' },
          { name: 'Nozzle temperature', where: 'OrcaSlicer → Filament → Filament', try: '+5 °C per test' },
        ],
      },
      {
        title: 'Set the correct filament diameter and calibrate flow',
        why: 'The slicer computes volume from a diameter you told it. If the profile says 2.85 mm and your filament is 1.75 mm, it will extrude a fraction of what is needed. After that, flow rate trims the remaining error.',
        rank: 'common',
        settings: [
          { name: 'Diameter', where: 'Cura → Material', try: '1.75 mm for almost all desktop printers' },
          { name: 'Flow', where: 'Cura → Material', try: '100 %, then ±2–5 % after a calibration cube' },
          { name: 'Flow ratio', where: 'OrcaSlicer → Filament → Filament', try: '0.98–1.02 typical after calibration' },
        ],
      },
      {
        title: 'Check extruder tension and the drive gear',
        why: 'If the gear cannot grip, it grinds a flat into the filament and stops feeding. Look for plastic dust in the extruder and a shiny flat patch on the filament just above the gear.',
        rank: 'common',
        action:
          'Open the extruder, blow out any ground plastic packed into the gear teeth, and set the idler tension so the filament is gripped firmly but not crushed out of round. Over-tightening deforms the filament and makes feeding worse.',
      },
      {
        title: 'Slow down or raise line width',
        why: 'There is a hard limit to how many cubic millimetres per second a hotend can melt — roughly 8–12 mm³/s for a stock V6-style hotend with PLA. Past that no setting helps; you are asking for more plastic than the heater can melt.',
        rank: 'less',
        settings: [
          { name: 'Print Speed', where: 'Cura → Speed', try: '−20 % as a test' },
          { name: 'Max volumetric speed', where: 'OrcaSlicer → Filament → Filament', try: '8–12 mm³/s stock hotend · 20+ mm³/s high-flow' },
        ],
      },
    ],
    faqs: [
      {
        q: 'How do I tell under-extrusion from a clog?',
        a: 'Consistency. A clog is usually intermittent or gets progressively worse within one print, and hand-extruding feels wrong. Genuine under-extrusion from settings is uniform — every layer is equally thin, and the nozzle extrudes cleanly by hand.',
      },
      {
        q: 'Can wet filament cause under-extrusion?',
        a: 'Yes, indirectly. Steam bubbles in the melt zone interrupt the flow and leave voids, which looks like intermittent under-extrusion and often comes with popping sounds. If the filament also strings badly, moisture is the likely common cause.',
      },
      {
        q: 'Is a bigger nozzle a fix?',
        a: 'It raises the ceiling rather than fixing a fault. A 0.6 mm nozzle can push far more plastic per second than a 0.4 mm, so it helps if you are genuinely at the melt limit on fast or large prints. It will not help at all if the real cause is a clog, moisture or extruder slip.',
      },
    ],
  },
  {
    slug: 'layer-shifting',
    short: 'Layer shifting',
    looksLike: 'The print suddenly steps sideways part-way up and everything above is offset.',
    metaTitle: 'Fix Layer Shifting — Belts, Speed and Collisions',
    description:
      'Print shifted sideways mid-job? Belt tension, acceleration, nozzle collisions and driver heat, diagnosed in order. Settings for Cura and OrcaSlicer.',
    h1: 'Layer shifting',
    intro:
      'The head lost its place. Because most desktop printers have no position feedback, once a step is missed the printer never knows — everything above prints perfectly, just in the wrong place. Which axis shifted tells you a lot, so look at that first.',
    fixes: [
      {
        title: 'Check belt tension',
        why: 'A loose belt lets the pulley skip teeth under acceleration. Plucked like a guitar string, a correctly tensioned belt gives a low musical note, not a dull thud. This is the most common cause by a wide margin.',
        rank: 'first',
        action:
          'With the printer off, push the head to the centre and pluck each belt. Both should sound similar and neither should visibly sag. Then check the pulley grub screws — a set screw that is not seated on the flat of the motor shaft will slip under load and mimic a loose belt exactly.',
      },
      {
        title: 'Lower acceleration and jerk',
        why: 'Shifts that happen on fast infill or sharp direction changes are inertia beating the motor. Reducing acceleration costs print time but is a definitive test — if the shift disappears, the mechanics cannot keep up with the profile.',
        rank: 'first',
        settings: [
          { name: 'Print Acceleration', where: 'Cura → Speed (enable Acceleration Control)', try: '−30 %, e.g. 3000 → 2000 mm/s²' },
          { name: 'Normal printing acceleration', where: 'OrcaSlicer → Process → Speed → Acceleration', try: '−30 % as a test' },
          { name: 'Jerk / Junction deviation', where: 'Cura → Speed · OrcaSlicer → Process → Speed', try: 'Jerk 8 mm/s · Junction deviation 0.02' },
        ],
      },
      {
        title: 'Stop the nozzle hitting the print',
        why: 'A curled corner or a blob sticking up gets clipped by the nozzle on the next pass, and the impact knocks the head off position. If the shift happens at the same height every time, this is almost certainly it.',
        rank: 'common',
        settings: [
          { name: 'Z Hop When Retracted', where: 'Cura → Travel', try: 'Enabled, 0.2–0.4 mm' },
          { name: 'Z hop height', where: 'OrcaSlicer → Process → Quality → Precision', try: '0.2–0.4 mm' },
        ],
        action: 'Also fix the curling itself — see the warping and over-extrusion pages, since a raised blob is a symptom of one of those.',
      },
      {
        title: 'Check for mechanical binding',
        why: 'A dry rod, a misaligned linear rail or a wheel tightened too far adds drag that the motor cannot always overcome. With the printer off, push each axis by hand end to end: it should glide with even resistance the whole way.',
        rank: 'common',
        action:
          'Clean and lightly oil smooth rods, check that eccentric nuts on V-wheel printers are snug but still let the wheels turn, and confirm nothing (a cable chain, a spool holder, a clip) is catching at the extremes of travel.',
      },
      {
        title: 'Let the stepper drivers cool',
        why: 'Drivers that overheat go into thermal shutdown for a moment and drop steps, then recover. Classic sign: shifts appear only well into long prints, and only in warm weather or an enclosure.',
        rank: 'less',
        action:
          'Confirm the mainboard fan runs, add a heatsink to the driver, and check driver current is not set higher than the motor needs. In an enclosed printer, keep the electronics bay outside the heated volume.',
      },
    ],
    faqs: [
      {
        q: 'Only the X axis shifted. Does that narrow it down?',
        a: 'Yes — it points at that axis specifically: its belt, its pulley grub screw, its motor, its driver. A shift that affects both X and Y at once is more likely a collision or a firmware/power event than a belt.',
      },
      {
        q: 'Can a bad G-code file cause layer shifts?',
        a: 'It can look like one. A corrupted SD card or a flaky USB connection can drop or garble commands mid-stream, which produces offsets or missing sections that mimic mechanical shifting. Re-slice, copy to a different card, and print again before dismantling anything.',
      },
      {
        q: 'Why does it always shift at the same height?',
        a: 'That is the signature of a collision rather than a random miss. Something at that Z height — a curled edge, a support tip, a stray blob — is being struck. Enable Z-hop and look closely at the layer just below where it happens.',
      },
    ],
  },
  {
    slug: 'elephant-foot',
    short: 'Elephant foot',
    looksLike: 'The bottom one or two layers bulge outwards, so the base is wider than the rest.',
    metaTitle: 'Fix Elephant Foot — Bulging First Layer on 3D Prints',
    description:
      'Bulging bottom layers that stop parts fitting: Z-offset, bed temperature and first-layer compensation. Settings for Cura, OrcaSlicer and PrusaSlicer.',
    h1: 'Elephant foot',
    intro:
      'The base flares out, so parts no longer fit together and the footprint is oversized. It is the weight of the part pressing hot, soft plastic outwards while the bed keeps it above its softening point. Two real fixes and one compensation.',
    fixes: [
      {
        title: 'Raise the Z-offset slightly',
        why: 'The usual cause is a first layer squashed harder than it needs to be. There is a narrow band between "not sticking" and "elephant foot" — you want the least squish that still gives a solid, gap-free first layer.',
        rank: 'first',
        action:
          'Raise the Z-offset by 0.01–0.02 mm and re-print. If gaps appear between first-layer lines you have gone too far; back off by half a step.',
      },
      {
        title: 'Lower the bed temperature after the first layers',
        why: 'A bed that stays hot keeps the bottom of the part soft for the entire print, and the weight above keeps pressing it out. Dropping 5–10 °C after the first few layers lets the base set without hurting adhesion.',
        rank: 'first',
        settings: [
          { name: 'Build Plate Temperature (initial vs. rest)', where: 'Cura → Material', try: 'Initial 60 °C, then 50–55 °C for PLA' },
          { name: 'Bed temperature → other layers', where: 'OrcaSlicer → Filament → Filament', try: '5–10 °C below the first-layer value' },
        ],
      },
      {
        title: 'Apply first-layer horizontal compensation',
        why: 'Shrinks the bottom layers in the slicer to cancel the bulge. This is a compensation, not a cure — but for a part that must fit a hole, it is the fastest route to dimensional accuracy.',
        rank: 'common',
        settings: [
          { name: 'Initial Layer Horizontal Expansion', where: 'Cura → Shell', try: '−0.1 to −0.2 mm' },
          { name: 'Elephant foot compensation', where: 'OrcaSlicer / PrusaSlicer → Process → Quality → Precision', try: '0.1–0.2 mm' },
        ],
      },
      {
        title: 'Chamfer the bottom edge in CAD',
        why: 'A 0.4–0.6 mm chamfer on the bottom edge gives the bulge somewhere to go, so the part still measures correctly at the mating surface. Standard practice for printed parts that must fit something.',
        rank: 'less',
      },
    ],
    faqs: [
      {
        q: 'Is elephant foot the same as over-extrusion?',
        a: 'No. Over-extrusion makes every layer too fat; elephant foot affects only the bottom one or two. If your walls are also bulging further up the part, you are looking at over-extrusion or a flow-rate problem instead.',
      },
      {
        q: 'Why do my parts not fit together even though the model is right?',
        a: 'Elephant foot is one of the top causes. The first layers being 0.2 mm wider than designed is enough to stop a peg entering a hole. Measure with calipers at the base and 5 mm up — if those numbers differ, this is your problem.',
      },
      {
        q: 'Does elephant foot compensation affect the rest of the print?',
        a: 'No — it only shrinks the first layers, by default just the bottom one or two depending on slicer. It has no effect on dimensions higher up, which is exactly why it works as a targeted fix.',
      },
    ],
  },
  {
    slug: 'ringing-ghosting',
    short: 'Ringing / ghosting',
    looksLike: 'Ripples or echoes on the surface just after a corner or a sharp feature.',
    metaTitle: 'Fix Ringing and Ghosting — Ripples After Corners',
    description:
      'Ripples after every corner: acceleration, belt tension, input shaping and frame stiffness. Exact settings for Cura, OrcaSlicer and PrusaSlicer.',
    h1: 'Ringing and ghosting',
    intro:
      'Wavy echoes that fade out after each corner. The print head changed direction, the whole machine rang like a bell, and the nozzle wrote that vibration into the surface. Everything that reduces it either lowers the excitation or stiffens the machine.',
    fixes: [
      {
        title: 'Lower acceleration and jerk',
        why: 'The abruptness of the direction change is what excites the vibration. This is the direct, immediate fix and it always works — the trade is print time.',
        rank: 'first',
        settings: [
          { name: 'Print Acceleration', where: 'Cura → Speed (enable Acceleration Control)', try: '1500–2500 mm/s² on a bed-slinger' },
          { name: 'Jerk / Junction deviation', where: 'Cura → Speed', try: 'Jerk 7–8 mm/s · Junction deviation 0.015–0.02' },
          { name: 'Outer wall acceleration', where: 'OrcaSlicer → Process → Speed → Acceleration', try: '1000–2000 mm/s² — only the visible wall needs to be slow' },
        ],
      },
      {
        title: 'Tighten belts and check pulleys',
        why: 'A slack belt is a spring, and a spring oscillates. Tension both belts to a firm musical note and make sure every pulley grub screw is seated on the flat of its shaft.',
        rank: 'first',
        action:
          'Also check idler pulleys spin freely without wobble. A worn or over-tightened idler introduces its own periodic error that shows up as evenly spaced ripples.',
      },
      {
        title: 'Enable input shaping if your firmware supports it',
        why: 'Input shaping measures the machine\'s resonant frequency and pre-compensates the motion so the vibration cancels itself. It is the only fix that removes ringing without giving up speed. Available in Klipper, Marlin 2.1+, and built into most 2023-onward printers.',
        rank: 'common',
        action:
          'Klipper: run the resonance test with an accelerometer and apply the suggested shaper. Marlin: enable Fixed-Time Motion or use a ringing test tower to find the frequency manually. On Bambu and recent Prusa machines it runs automatically at the start of each print.',
      },
      {
        title: 'Stiffen or steady the printer',
        why: 'A flexing frame or a wobbly table amplifies everything. A bed-slinger on a springy IKEA shelf will ring no matter how well tuned the firmware is.',
        rank: 'common',
        action:
          'Put the printer on a solid, heavy surface — a paving slab or a concrete tile under it is a cheap and genuinely effective upgrade. Check frame bolts, especially where the gantry meets the uprights, and make sure the spool is not swinging on a rattly holder.',
      },
      {
        title: 'Slow only the outer wall',
        why: 'Ringing is only visible on the exterior. Printing just the outer perimeter slowly while everything else stays fast gets most of the surface quality for a fraction of the time cost.',
        rank: 'less',
        settings: [
          { name: 'Outer Wall Speed', where: 'Cura → Speed', try: '25–40 mm/s' },
          { name: 'Outer wall speed', where: 'OrcaSlicer → Process → Speed', try: '25–50 mm/s' },
        ],
      },
    ],
    faqs: [
      {
        q: 'What is the difference between ringing and ghosting?',
        a: 'They are two words for the same artefact — the terms are used interchangeably. Some people reserve "ghosting" for faint echoes of a feature repeated further along the wall, and "ringing" for the ripple immediately after a corner, but the cause and the fixes are identical.',
      },
      {
        q: 'Why is ringing worse on the Y axis of my printer?',
        a: 'On a bed-slinger, the Y axis has to accelerate the entire bed and the print, which gets heavier as the print grows. The X axis only moves the toolhead. That mass difference is why Y ringing is usually worse, and why it gets worse as the print goes on.',
      },
      {
        q: 'Will a heavier print head make it worse?',
        a: 'Yes. Direct-drive extruders, multiple fans and added cameras all raise the moving mass, which lowers the resonant frequency and makes ringing more pronounced. It is a real trade-off against the benefits of direct drive, not a fault.',
      },
    ],
  },
  {
    slug: 'layer-separation',
    short: 'Layer separation / cracking',
    looksLike: 'Layers split apart, usually part-way up a tall print, and the part snaps along a layer line.',
    metaTitle: 'Fix Layer Separation and Cracking — Weak Layer Adhesion',
    description:
      'Layers splitting apart: nozzle temperature, too much cooling, wet filament and layer height. Exact settings for Cura, OrcaSlicer and PrusaSlicer.',
    h1: 'Layer separation and cracking',
    intro:
      'Layers are not welding to each other. FDM parts are only as strong as the bond between layers, and that bond is made by heat — a layer must still be hot enough to melt into the one below when it lands. Nearly every cause on this list is a heat problem.',
    fixes: [
      {
        title: 'Raise the nozzle temperature',
        why: 'The most direct lever on layer adhesion. Hotter plastic melts further into the previous layer. Layer strength climbs steadily with temperature right up to the point where stringing and heat creep become the limiting factor.',
        rank: 'first',
        settings: [
          { name: 'Printing Temperature', where: 'Cura → Material', try: '+5 to +15 °C, toward the top of the spool range' },
          { name: 'Nozzle temperature', where: 'OrcaSlicer → Filament → Filament', try: '+5 °C per test' },
        ],
      },
      {
        title: 'Reduce part cooling',
        why: 'The fan is actively working against layer bonding. PLA tolerates full cooling because it bonds easily; ABS, ASA, PC and nylon do not — running them at 100 % fan will produce parts that fall apart in your hand.',
        rank: 'first',
        settings: [
          { name: 'Fan Speed', where: 'Cura → Cooling', try: 'ABS/ASA 0–20 % · PC 0–20 % · nylon 0–30 % · PETG 30–50 %' },
          { name: 'Fan speed', where: 'OrcaSlicer → Filament → Cooling', try: 'Match the material, not the printer default' },
        ],
      },
      {
        title: 'Dry the filament',
        why: 'Moisture ruins layer adhesion as badly as it causes stringing. Steam voids inside the extrudate leave the bond porous, and the part breaks along a layer under light load. Nylon and PC are the worst offenders — they can absorb enough moisture in a single humid day to matter.',
        rank: 'common',
        action:
          'Dry at 60–65 °C for 6–8 hours for PETG, ABS and nylon; 45–55 °C for 4–6 hours for PLA. For nylon and PC, print straight from a heated dry box rather than drying once and leaving the spool out.',
      },
      {
        title: 'Enclose the printer',
        why: 'For high-temperature materials, ambient temperature is part of the process. In a cold room an ABS part cools too fast between layers to bond properly, and the internal stress that builds cracks it apart part-way up.',
        rank: 'common',
        action: 'Any enclosure helps. For ABS and ASA aim for a chamber around 40–50 °C. Keep the electronics and stepper drivers outside that heated volume.',
      },
      {
        title: 'Lower the layer height or raise line width',
        why: 'A layer taller than about 75 % of the nozzle diameter has too little contact area with the layer below. On a 0.4 mm nozzle, 0.32 mm layers bond noticeably worse than 0.2 mm ones.',
        rank: 'less',
        settings: [
          { name: 'Layer Height', where: 'Cura → Quality', try: '≤ 0.75 × nozzle diameter (0.3 mm max on a 0.4 mm nozzle)' },
          { name: 'Line width', where: 'OrcaSlicer → Process → Quality', try: '105–120 % of nozzle diameter' },
        ],
      },
    ],
    faqs: [
      {
        q: 'Why did my print crack only after it finished?',
        a: 'Internal stress. Each layer shrinks slightly as it cools, and in a tall part those forces accumulate. If the layer bond is weaker than the accumulated stress, the part splits — often hours later, sometimes with an audible crack. It points at layer adhesion and cooling rate, not at a mechanical fault.',
      },
      {
        q: 'Will printing slower improve layer adhesion?',
        a: 'Usually yes, but less than temperature does. Slower printing gives the layer below more time to cool, which cuts both ways — the real benefit is that the hotend has more time to fully melt the plastic, so it lands hotter and more consistently.',
      },
      {
        q: 'Is layer adhesion always weaker than the plastic itself?',
        a: 'Yes, for FDM. A printed part is typically 30–60 % as strong across layers as it is along them, depending on material and settings. Design around it: orient the part so the load runs along the layers rather than across them.',
      },
    ],
  },
  {
    slug: 'blobs-and-zits',
    short: 'Blobs / zits on surface',
    looksLike: 'Small bumps or pimples scattered on the outer wall, often lined up in a vertical seam.',
    metaTitle: 'Fix Blobs and Zits — Surface Bumps and Seam Marks',
    description:
      'Blobs, zits and ugly Z-seams on 3D prints: pressure control, seam placement, coasting and wipe. Exact settings for Cura, OrcaSlicer and PrusaSlicer.',
    h1: 'Blobs and zits',
    intro:
      'Little pimples on the outside wall. They form where the nozzle starts or stops a perimeter — pressure inside the nozzle does not vanish the instant the extruder stops, so a bit extra squeezes out. Modern slicers can compensate for this well.',
    fixes: [
      {
        title: 'Enable pressure advance / linear advance',
        why: 'This is the real fix. It models nozzle pressure and adjusts the extruder ahead of time so flow starts and stops cleanly. Once tuned, it removes blobs at line ends and also sharpens corners.',
        rank: 'first',
        action:
          'Klipper: run a pressure-advance calibration tower and set the value per filament (typical: PLA 0.03–0.05, PETG 0.05–0.08 with a direct drive). Marlin: use Linear Advance with M900. OrcaSlicer has a built-in pressure advance calibration under Calibration.',
      },
      {
        title: 'Move or randomise the seam',
        why: 'Lined-up zits are the Z-seam — the point where each perimeter starts. You cannot remove it, but you can put it somewhere it does not matter, or scatter it so it never forms a visible stripe.',
        rank: 'first',
        settings: [
          { name: 'Z Seam Alignment', where: 'Cura → Shell', try: 'Sharpest Corner, or User Specified to hide it on a back face' },
          { name: 'Seam position', where: 'OrcaSlicer / PrusaSlicer → Process → Quality', try: 'Aligned with "rear" or Random' },
        ],
      },
      {
        title: 'Turn on coasting and wipe',
        why: 'Coasting stops the extruder slightly before the end of the line and lets residual pressure finish it; wipe drags the nozzle over already-printed material to leave the excess where it will not show.',
        rank: 'common',
        settings: [
          { name: 'Enable Coasting', where: 'Cura → Experimental', try: 'On, volume 0.05–0.1 mm³' },
          { name: 'Wipe on loops', where: 'OrcaSlicer / PrusaSlicer → Process → Quality', try: 'Enabled' },
        ],
      },
      {
        title: 'Lower the temperature',
        why: 'Cooler plastic oozes less between the stop and the next start. If blobs come with stringing, treat them as the same problem and see the stringing page.',
        rank: 'common',
        settings: [{ name: 'Printing Temperature', where: 'Cura → Material', try: '−5 °C per test' }],
      },
      {
        title: 'Check retraction is not over-aggressive',
        why: 'Too much retraction can pull in a bubble of air that comes back out as a blob at the next start. If you added retraction to fight stringing and gained blobs, you overshot.',
        rank: 'less',
        settings: [
          { name: 'Retraction Distance', where: 'Cura → Travel', try: 'Direct drive: keep under 1.5 mm' },
          { name: 'Retract on layer change', where: 'OrcaSlicer → Filament → Setting Overrides', try: 'Try disabling if seam blobs are per-layer' },
        ],
      },
    ],
    faqs: [
      {
        q: 'What is the Z-seam and can I get rid of it entirely?',
        a: 'It is where each layer\'s outer perimeter begins and ends — an unavoidable consequence of printing a closed loop with a single nozzle. It cannot be eliminated, only hidden or minimised. "Scarf" or sloped seams in newer slicers come closest by blending the join across a distance.',
      },
      {
        q: 'Why do the blobs only appear on one side of my print?',
        a: 'That is the seam alignment doing its job — most default settings put the seam in a consistent place. Set seam position to "Random" to scatter it, or "User Specified" to point it at a face nobody sees.',
      },
      {
        q: 'Does pressure advance need re-tuning for every filament?',
        a: 'Ideally yes, per material type rather than per spool. PETG needs a noticeably different value from PLA because it is more viscous. Different brands of the same material are usually close enough to share a value.',
      },
    ],
  },
  {
    slug: 'pillowing',
    short: 'Pillowing / holes in top',
    looksLike: 'The top surface has bumps, gaps or open holes instead of coming out flat and solid.',
    metaTitle: 'Fix Pillowing — Holes and Bumps in the Top Surface',
    description:
      'Holes and bumps in the top surface: top layer count, infill density and cooling. Exact settings for Cura, OrcaSlicer and PrusaSlicer.',
    h1: 'Pillowing and holes in top layers',
    intro:
      'The top surface never closes properly, leaving bumps and gaps. The top layers are being printed across gaps in the infill below, and without enough support or cooling they sag and curl instead of bridging cleanly.',
    fixes: [
      {
        title: 'Add more top layers',
        why: 'One or two top layers cannot span sparse infill. The usual guidance is enough top layers to total at least 0.6–0.8 mm of solid thickness — at 0.2 mm layers that means four, not two.',
        rank: 'first',
        settings: [
          { name: 'Top Layers', where: 'Cura → Shell', try: '4–5 at 0.2 mm layer height' },
          { name: 'Top shell layers', where: 'OrcaSlicer / PrusaSlicer → Process → Strength', try: '4–5' },
        ],
      },
      {
        title: 'Raise infill density',
        why: 'The top layers have to bridge the gaps in the infill grid. Below about 15 % those gaps get wide enough that no amount of cooling will stop the sag.',
        rank: 'first',
        settings: [
          { name: 'Infill Density', where: 'Cura → Infill', try: '15–25 %' },
          { name: 'Sparse infill density', where: 'OrcaSlicer → Process → Strength', try: '15–25 %, gyroid or grid' },
        ],
      },
      {
        title: 'Turn cooling up',
        why: 'Plastic spanning a gap needs to solidify almost immediately or it droops. This is the one situation where more fan is unambiguously better, PLA especially.',
        rank: 'common',
        settings: [
          { name: 'Fan Speed', where: 'Cura → Cooling', try: '100 % for PLA on top layers' },
          { name: 'Fan speed', where: 'OrcaSlicer → Filament → Cooling', try: 'Max the material tolerates' },
        ],
      },
      {
        title: 'Enable ironing for a flat finish',
        why: 'After the top is solid, ironing runs the hot nozzle back over it with almost no extrusion to smooth the surface. It does not fix structural pillowing — do the three fixes above first — but it turns a good top surface into a very good one.',
        rank: 'less',
        settings: [
          { name: 'Enable Ironing', where: 'Cura → Top/Bottom', try: 'On, Top Surface Only, flow 10 %' },
          { name: 'Ironing type', where: 'OrcaSlicer → Process → Quality', try: 'Top surfaces' },
        ],
      },
    ],
    faqs: [
      {
        q: 'How many top layers should I use?',
        a: 'Work in millimetres, not layers. Aim for 0.6–0.8 mm of solid top: that is 3–4 layers at 0.2 mm, but 6–8 at 0.1 mm. Slicer defaults are often stated in layers, which is why halving your layer height and changing nothing else suddenly produces pillowing.',
      },
      {
        q: 'Does infill pattern matter for pillowing?',
        a: 'Somewhat. Gyroid and grid give a more even distribution of support points than large-cell patterns like cubic or lightning, so they bridge better at the same density. Lightning infill in particular saves a lot of plastic but leaves very little under the top surface.',
      },
      {
        q: 'Why is only part of the top surface pillowing?',
        a: 'Almost always the area over the widest infill gaps, or a region where cooling is weakest — often the side away from a single-sided part cooling fan. Compare where the bumps are against where the fan blows.',
      },
    ],
  },
  {
    slug: 'over-extrusion',
    short: 'Over-extrusion / rough walls',
    looksLike: 'Walls look fat and bumpy, dimensions come out oversized, and the nozzle drags through excess plastic.',
    metaTitle: 'Fix Over-Extrusion — Rough Walls and Oversized Parts',
    description:
      'Fat rough walls and oversized parts: filament diameter, E-steps, flow rate and temperature, calibrated in order. Settings for Cura and OrcaSlicer.',
    h1: 'Over-extrusion',
    intro:
      'More plastic is coming out than the model needs. It shows as rough bulging walls, parts that measure oversized, blobs where the nozzle ploughs through its own excess, and top surfaces that look overfilled. Fixing it is mostly calibration, done in a fixed order.',
    fixes: [
      {
        title: 'Check the filament diameter setting',
        why: 'Check this before anything else — it is a one-line fix that invalidates every other calibration if wrong. The slicer computes volume from this number, so a profile left at 2.85 mm while you run 1.75 mm filament will massively over-extrude.',
        rank: 'first',
        settings: [
          { name: 'Diameter', where: 'Cura → Material', try: '1.75 mm' },
          { name: 'Filament diameter', where: 'OrcaSlicer / PrusaSlicer → Filament → Filament', try: '1.75 mm — measure your spool with calipers to confirm' },
        ],
      },
      {
        title: 'Calibrate E-steps, then flow',
        why: 'E-steps make the extruder push exactly the length it was told; flow rate then trims for material differences. Doing them the other way round means the flow value is hiding a hardware error and you have to redo it for every filament.',
        rank: 'first',
        action:
          'Mark 120 mm of filament above the extruder, command a 100 mm extrusion, then measure what is left. If 30 mm remains you extruded 90 mm, so new E-steps = old × (100 ÷ 90). Save with M92 and M500.',
      },
      {
        title: 'Tune flow rate with a single-wall cube',
        why: 'The definitive measurement. Print a hollow cube with one wall and no top or bottom, then measure the wall with calipers. It should equal your line width — if it measures 0.46 mm against a 0.42 mm target, reduce flow by that ratio.',
        rank: 'common',
        settings: [
          { name: 'Flow', where: 'Cura → Material', try: 'Adjust by measured ÷ expected, typically 94–100 %' },
          { name: 'Flow ratio', where: 'OrcaSlicer → Filament → Filament', try: '0.94–1.00 · OrcaSlicer has a built-in Flow Rate calibration' },
        ],
      },
      {
        title: 'Lower the temperature',
        why: 'Hotter plastic is less viscous and keeps flowing after the extruder stops, which reads as over-extrusion even when the flow number is right. If you also have stringing and blobs, temperature is the shared cause.',
        rank: 'less',
        settings: [{ name: 'Printing Temperature', where: 'Cura → Material', try: '−5 °C per test' }],
      },
    ],
    faqs: [
      {
        q: 'How do I know whether it is over-extrusion or a Z-offset problem?',
        a: 'Look at where it happens. Over-extrusion affects the whole part — every wall is fat and the dimensions are out top to bottom. A Z-offset that is too low only affects the first layer or two, which is elephant foot instead.',
      },
      {
        q: 'Should flow rate be different for each filament?',
        a: 'Yes, slightly. Different materials and even different brands vary in true diameter and melt behaviour, so a value tuned on one PLA may be 1–3 % off on a PETG. Set flow per filament profile, not globally.',
      },
      {
        q: 'My parts measure oversized but the walls look fine. Is that over-extrusion?',
        a: 'Possibly not. Consistent oversizing with clean walls is more often elephant foot at the base, or the natural "bulge" of an extruded line on outer surfaces. Measure at several heights and check horizontal expansion compensation before touching flow.',
      },
    ],
  },
  {
    slug: 'clogged-nozzle',
    short: 'Clog / extruder clicking',
    looksLike: 'Extruder clicks or skips, extrusion stops mid-print, or nothing comes out at all.',
    metaTitle: 'Fix a Clogged Nozzle — Clicking Extruder and Heat Creep',
    description:
      'Clicking extruder or no extrusion: cold pull, heat creep, retraction length and PTFE gaps. Exact settings for Cura, OrcaSlicer and PrusaSlicer.',
    h1: 'Clogged nozzle and extruder clicking',
    intro:
      'The extruder is trying to push filament that will not go. The click is the drive gear slipping. Clear the blockage first, then find out why it formed — a nozzle that clogs repeatedly has a cause, and cleaning it each time is not a fix.',
    fixes: [
      {
        title: 'Do a cold pull',
        why: 'Pulls the blockage out with the filament instead of trying to push it through. Works on the burnt residue and dust that cause most partial clogs, and takes five minutes.',
        rank: 'first',
        action:
          'Heat to printing temperature, push a little filament through, then let it cool to about 90 °C for PLA (130 °C for PETG). Pull the filament out firmly in one motion. The tip should come out shaped like the inside of the nozzle. Repeat until it comes out clean.',
      },
      {
        title: 'Check for heat creep',
        why: 'If clogs happen part-way into long prints but never at the start, heat is travelling up the heatbreak and softening filament before the melt zone, where it jams. This is a cooling fault, not a nozzle fault — cleaning the nozzle will fix it for exactly one print.',
        rank: 'first',
        action:
          'Confirm the hotend heatsink fan actually spins the whole time (it is a different fan from the part cooling fan). Clear dust from the heatsink fins, check the heatbreak is tight against the heatsink, and if your printer is enclosed, make sure PLA is not cooking inside it.',
      },
      {
        title: 'Reduce retraction distance',
        why: 'Excessive retraction pulls molten plastic up into the cool zone where it solidifies into a plug. If clogs started right after you increased retraction to fight stringing, this is the cause.',
        rank: 'common',
        settings: [
          { name: 'Retraction Distance', where: 'Cura → Travel', try: 'Direct drive: ≤ 1.5 mm · Bowden: ≤ 7 mm' },
          { name: 'Retraction length', where: 'OrcaSlicer → Filament → Setting Overrides', try: 'Direct drive: 0.5–1.5 mm' },
        ],
      },
      {
        title: 'Check the PTFE tube seats fully',
        why: 'In an all-metal-free hotend, a gap between the end of the PTFE tube and the top of the nozzle collects molten plastic that carbonises into a plug. Very common after a nozzle change.',
        rank: 'common',
        action:
          'Heat the hotend, loosen the nozzle slightly, push the PTFE tube fully down, then re-tighten the nozzle against it while hot. Replace the tube if the end is charred or deformed — burnt PTFE will not seal.',
      },
      {
        title: 'Raise temperature or slow down',
        why: 'Clicking with a clean nozzle usually means you are asking for more melted plastic per second than the hotend can supply. Either give it more heat or ask for less.',
        rank: 'less',
        settings: [
          { name: 'Printing Temperature', where: 'Cura → Material', try: '+5–10 °C' },
          { name: 'Max volumetric speed', where: 'OrcaSlicer → Filament → Filament', try: '8–12 mm³/s on a stock hotend' },
        ],
      },
    ],
    faqs: [
      {
        q: 'Should I use a needle to clear the nozzle?',
        a: 'Sparingly. A 0.35 mm acupuncture needle can clear a blockage while the nozzle is hot, but pushing debris around can scratch the bore and make the nozzle string forever after. A cold pull is safer and usually more effective; brass nozzles are cheap enough to replace when in doubt.',
      },
      {
        q: 'Why does my printer clog only with certain filaments?',
        a: 'Filled filaments (wood, carbon fibre, glow-in-the-dark, metallic) contain abrasive or chunky particles that block a 0.4 mm nozzle easily. Use a 0.6 mm hardened nozzle for those. Cheap unfilled filament with inconsistent diameter also jams more often.',
      },
      {
        q: 'Is clicking always a clog?',
        a: 'No. The click is the extruder failing to advance filament, and a clog is only one reason for that. Also check the spool is not tangled or binding on its holder, the path is not kinked, and the idler tension is not so tight it has crushed the filament out of round.',
      },
    ],
  },
];

/** Returns up to `count` other defects, cycling from the current one, for interlinking. */
export function relatedFor(slug: string, count = 4) {
  const idx = defects.findIndex((d) => d.slug === slug);
  const out: Defect[] = [];
  for (let i = 1; out.length < count && i < defects.length; i++) {
    out.push(defects[(idx + i) % defects.length]);
  }
  // Trailing slash must match the canonical URL Astro emits (directory build
  // format), or Google indexes both variants and splits the ranking signal.
  return out.map((d) => ({ href: `/${d.slug}/`, label: d.short }));
}
