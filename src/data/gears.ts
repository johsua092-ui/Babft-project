export type GearType = {
  id: string;
  name: string;
  color: string;
  desc: string;
};

export const GEAR_TYPES: GearType[] = [
  { id: "spur", name: "Spur Gear", color: "#4caf50", desc: "Most common gear type with straight teeth parallel to the axis" },
  { id: "helical", name: "Helical Gear", color: "#2196f3", desc: "Teeth cut at an angle for smoother and quieter operation" },
  { id: "double-helical", name: "Double Helical/Herringbone", color: "#9c27b0", desc: "Two helical gears mirrored to cancel axial thrust" },
  { id: "bevel", name: "Bevel Gear", color: "#ff9800", desc: "Conical gears that transmit power between intersecting shafts" },
  { id: "spiral-bevel", name: "Spiral Bevel Gear", color: "#f44336", desc: "Bevel gear with curved teeth for smooth engagement" },
  { id: "zerol-bevel", name: "Zerol Bevel Gear", color: "#e91e63", desc: "Spiral bevel with zero spiral angle" },
  { id: "hypoid", name: "Hypoid Gear", color: "#ff5722", desc: "Similar to spiral bevel but with offset axes" },
  { id: "worm", name: "Worm Gear", color: "#795548", desc: "Screw-like gear meshing with a worm wheel for high reduction" },
  { id: "worm-wheel", name: "Worm Wheel", color: "#607d8b", desc: "Mating gear to a worm in worm gear sets" },
  { id: "rack", name: "Rack & Pinion", color: "#009688", desc: "Converts rotational motion to linear motion" },
  { id: "internal", name: "Internal/Ring Gear", color: "#3f51b5", desc: "Gear with teeth on the inner surface of a ring" },
  { id: "planetary", name: "Planetary/Epicyclic", color: "#673ab7", desc: "Sun, planet, and ring gear arrangement for high torque density" },
  { id: "sun", name: "Sun Gear", color: "#ffc107", desc: "Central gear in a planetary gear system" },
  { id: "ring-gear", name: "Ring Gear (Annulus)", color: "#8bc34a", desc: "Outer ring gear in a planetary gear system" },
  { id: "compound", name: "Compound Gear", color: "#00bcd4", desc: "Multiple gear stages on a single shaft" },
  { id: "idler", name: "Idler Gear", color: "#ff9800", desc: "Intermediate gear that reverses direction without changing torque" },
  { id: "miter", name: "Miter Gear", color: "#4caf50", desc: "Bevel gears with equal 1:1 ratio at 90 degrees" },
  { id: "crown", name: "Crown Gear", color: "#ffd700", desc: "Bevel gear with teeth on the face rather than the cone" },
  { id: "face", name: "Face Gear", color: "#ff6b35", desc: "Gear with teeth on the face, meshes with a spur gear" },
  { id: "skew-bevel", name: "Skew Bevel Gear", color: "#da70d6", desc: "Bevel gear with non-intersecting skew axes" },
  { id: "crossed-helical", name: "Crossed Helical/Screw", color: "#20b2aa", desc: "Helical gears with non-parallel, non-intersecting axes" },
  { id: "harmonic", name: "Harmonic Drive/Flexspline", color: "#7b68ee", desc: "Zero backlash gear with high reduction ratio" },
  { id: "cycloidal", name: "Cycloidal Drive", color: "#32cd32", desc: "Eccentric cam-based gear mechanism" },
  { id: "noncircular", name: "Non-circular Gear", color: "#ff4500", desc: "Gears with non-circular pitch curves for variable speed" },
  { id: "elliptical", name: "Elliptical Gear", color: "#1e90ff", desc: "Non-circular gear with elliptical pitch curve" },
  { id: "sector", name: "Sector Gear", color: "#ff69b4", desc: "Partial gear tooth arc for intermittent motion" },
  { id: "segment", name: "Segment Gear", color: "#adff2f", desc: "Gear segment used in limited rotation applications" },
  { id: "lantern", name: "Lantern/Pin Gear", color: "#dda0dd", desc: "Gear made of pins between two disks" },
  { id: "cage", name: "Cage Gear", color: "#f0e68c", desc: "Gear with pins held in a cage structure" },
  { id: "sprocket", name: "Sprocket/Chain Gear", color: "#b8860b", desc: "Toothed wheel for engaging a chain" },
  { id: "ratchet", name: "Ratchet & Pawl", color: "#cd5c5c", desc: "Allows rotation in one direction only" },
  { id: "geneva", name: "Geneva Drive", color: "#4682b4", desc: "Converts continuous rotation into intermittent rotary motion" },
  { id: "globoid", name: "Globoid/Hindley Worm", color: "#2e8b57", desc: "Enveloping worm gear for higher load capacity" },
  { id: "straight-bevel", name: "Straight Bevel Gear", color: "#d2691e", desc: "Bevel gear with straight teeth tapering to a point" },
  { id: "conical", name: "Conical Involute Gear", color: "#8fbc8f", desc: "Gear with involute teeth on a conical surface" },
  { id: "magnetic", name: "Magnetic Gear", color: "#9400d3", desc: "Non-contact gear using magnetic field coupling" },
];
