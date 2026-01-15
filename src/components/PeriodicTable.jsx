import { useState, useMemo, useCallback } from 'react';
import periodicData from '../data/periodic.json';
import { elementExtendedData, categoryColors, categoryNames, elementCategories } from '../data/elementExtendedData';

// Video data cho các nguyên tố - Cập nhật từ Periodic Videos playlist
// Nguồn: https://www.youtube.com/playlist?list=PL7A1F4CF36C085DE1
// Cập nhật: 2026-01-15
const FALLBACK_VIDEO = 'https://www.youtube.com/embed/rz4Dd1I_fX0';

const elementVideos = {
  // Chu kỳ 1
  H: 'https://www.youtube.com/embed/6rdmpx39PRk', // ✓ Hydrogen
  He: 'https://www.youtube.com/embed/M6xZZiaLOV4', // ✓ Helium
  // Chu kỳ 2
  Li: 'https://www.youtube.com/embed/LfS10ArXTBA', // ✓ Lithium
  Be: 'https://www.youtube.com/embed/qy8JyQShZRA', // ✓ Beryllium
  B: 'https://www.youtube.com/embed/JzqdHkpXuy4', // ✓ Boron
  C: 'https://www.youtube.com/embed/QuW4_bRHbUk', // ✓ Carbon
  N: 'https://www.youtube.com/embed/H8XNdqA18-M', // ✓ Nitrogen
  O: 'https://www.youtube.com/embed/WuG5WTId-IY', // ✓ Oxygen
  F: 'https://www.youtube.com/embed/vtWp45Eewtw', // ✓ Fluorine
  Ne: 'https://www.youtube.com/embed/ILkvZKSVRI4', // ✓ Neon
  // Chu kỳ 3
  Na: 'https://www.youtube.com/embed/7IT2I3LtlNE', // ✓ Sodium
  Mg: 'https://www.youtube.com/embed/FKkWdizutxI', // ✓ Magnesium
  Al: 'https://www.youtube.com/embed/4AhZ8503WPs', // ✓ Aluminium
  Si: 'https://www.youtube.com/embed/a2aWO5cL410', // ✓ Silicon
  P: 'https://www.youtube.com/embed/LSYLUat03A4', // ✓ Phosphorus
  S: 'https://www.youtube.com/embed/mGMR72X8V-U', // ✓ Sulfur
  Cl: 'https://www.youtube.com/embed/BXCfBl4rmh0', // ✓ Chlorine
  Ar: 'https://www.youtube.com/embed/N0Gw6-xMLlo', // ✓ Argon
  // Chu kỳ 4
  K: 'https://www.youtube.com/embed/pPdevJTGAYY', // ✓ Potassium
  Ca: 'https://www.youtube.com/embed/V9fuY8_ffFg', // ✓ Calcium
  Sc: 'https://www.youtube.com/embed/gab_2a7gyLU', // ✓ Scandium
  Ti: 'https://www.youtube.com/embed/MpFTQYynrc4', // ✓ Titanium
  V: 'https://www.youtube.com/embed/MbCmaQzrZoc', // ✓ Vanadium
  Cr: 'https://www.youtube.com/embed/9NPjdDS11C4', // ✓ Chromium
  Mn: 'https://www.youtube.com/embed/uTVtBuY9Q-0', // ✓ Manganese
  Fe: 'https://www.youtube.com/embed/euQUgp5AY-Y', // ✓ Iron
  Co: 'https://www.youtube.com/embed/MWtL3pvGC68', // ✓ Cobalt
  Ni: 'https://www.youtube.com/embed/AUmoaZn9bek', // ✓ Nickel
  Cu: 'https://www.youtube.com/embed/kop1sWzTK-I', // ✓ Copper
  Zn: 'https://www.youtube.com/embed/99wPiMb-k0o', // ✓ Zinc
  Ga: 'https://www.youtube.com/embed/N6ccRvKKwZQ', // ✓ Gallium
  Ge: 'https://www.youtube.com/embed/osrKWVknkgs', // ✓ Germanium
  As: 'https://www.youtube.com/embed/yD8Vz-mFHgI', // ✓ Arsenic
  Se: 'https://www.youtube.com/embed/IHrUtKjcAFE', // ✓ Selenium
  Br: 'https://www.youtube.com/embed/Slt3_5upuSs', // ✓ Bromine
  Kr: 'https://www.youtube.com/embed/il4OOY7Zseg', // ✓ Krypton
  // Chu kỳ 5
  Rb: 'https://www.youtube.com/embed/0XLGopBovoI', // ✓ Rubidium
  Sr: 'https://www.youtube.com/embed/d5ztPGrsgNQ', // ✓ Strontium
  Y: 'https://www.youtube.com/embed/NxbOQ1FhqdQ', // ✓ Yttrium
  Zr: 'https://www.youtube.com/embed/gNJE2MPktvg', // ✓ Zirconium
  Nb: 'https://www.youtube.com/embed/2ciPAsVTq6c', // ✓ Niobium
  Mo: 'https://www.youtube.com/embed/ZRQ3vBGskds', // ✓ Molybdenum
  Tc: 'https://www.youtube.com/embed/ud5c1TVkcnU', // ✓ Technetium
  Ru: 'https://www.youtube.com/embed/wl5ZYb0hDTc', // ✓ Ruthenium
  Rh: 'https://www.youtube.com/embed/PPSO5798k2I', // ✓ Rhodium
  Pd: 'https://www.youtube.com/embed/4ALTGeqmNFM', // ✓ Palladium
  Ag: 'https://www.youtube.com/embed/pPd5qAb4J50', // ✓ Silver
  Cd: 'https://www.youtube.com/embed/boRius1DYdQ', // ✓ Cadmium
  In: 'https://www.youtube.com/embed/TviX7V-ay5I', // ✓ Indium
  Sn: 'https://www.youtube.com/embed/rXZscASelkc', // ✓ Tin
  Sb: 'https://www.youtube.com/embed/kcc6qNT3BoU', // ✓ Antimony
  Te: 'https://www.youtube.com/embed/5ChFbVu4Mpk', // ✓ Tellurium
  I: 'https://www.youtube.com/embed/JUBsJLRSM64', // ✓ Iodine
  Xe: 'https://www.youtube.com/embed/Ejoct_6pQ74', // ✓ Xenon
  // Chu kỳ 6
  Cs: 'https://www.youtube.com/embed/5aD6HwUE2c0', // ✓ Caesium
  Ba: 'https://www.youtube.com/embed/9srJdQU3NOo', // ✓ Barium
  La: 'https://www.youtube.com/embed/Q21clW0s0B8', // ✓ Lanthanum
  Ce: 'https://www.youtube.com/embed/frD3126ry8o', // ✓ Cerium
  Pr: 'https://www.youtube.com/embed/IL06CzXF3ns', // ✓ Praseodymium
  Nd: 'https://www.youtube.com/embed/PBbl-3_R3mk', // ✓ Neodymium
  Pm: 'https://www.youtube.com/embed/HplP_MY78NQ', // ✓ Promethium
  Sm: 'https://www.youtube.com/embed/RBTO5f8U218', // ✓ Samarium
  Eu: 'https://www.youtube.com/embed/88YOmg_FUVo', // ✓ Europium
  Gd: 'https://www.youtube.com/embed/uUo7pY38fGY', // ✓ Gadolinium
  Tb: 'https://www.youtube.com/embed/On5LjH9TQxY', // ✓ Terbium
  Dy: 'https://www.youtube.com/embed/8TE3iRXVcmY', // ✓ Dysprosium
  Ho: 'https://www.youtube.com/embed/HQahtzCU0BU', // ✓ Holmium
  Er: 'https://www.youtube.com/embed/E-DY_RT4fJ4', // ✓ Erbium
  Tm: 'https://www.youtube.com/embed/vS0vhYdOGMc', // ✓ Thulium
  Yb: 'https://www.youtube.com/embed/H8XtiaWm5eY', // ✓ Ytterbium
  Lu: 'https://www.youtube.com/embed/7wrDfRnRHqI', // ✓ Lutetium
  Hf: 'https://www.youtube.com/embed/Qb9f5uBKJhg', // ✓ Hafnium
  Ta: 'https://www.youtube.com/embed/51xFP1Yn3g0', // ✓ Tantalum
  W: 'https://www.youtube.com/embed/59ph6I0DoQE', // ✓ Tungsten
  Re: 'https://www.youtube.com/embed/YOmStzA2azw', // ✓ Rhenium
  Os: 'https://www.youtube.com/embed/AdX-T2Vv68Y', // ✓ Osmium
  Ir: 'https://www.youtube.com/embed/cuovE4OQi2g', // ✓ Iridium
  Pt: 'https://www.youtube.com/embed/byzaoji_9kk', // ✓ Platinum
  Au: 'https://www.youtube.com/embed/7dF0QTzcuac', // ✓ Gold
  Hg: 'https://www.youtube.com/embed/oL0M_6bfzkU', // ✓ Mercury
  Tl: 'https://www.youtube.com/embed/4SVhSZ-rfLM', // ✓ Thallium
  Pb: 'https://www.youtube.com/embed/2ERfPN5JLX8', // ✓ Lead
  Bi: 'https://www.youtube.com/embed/vyIo-c7VmIM', // ✓ Bismuth
  Po: 'https://www.youtube.com/embed/bbr5yWwsI1o', // ✓ Polonium
  At: 'https://www.youtube.com/embed/GP8jJgzEmwE', // ✓ Astatine
  Rn: 'https://www.youtube.com/embed/mTuC_LrEfbU', // ✓ Radon
  // Chu kỳ 7
  Fr: 'https://www.youtube.com/embed/hpYxllgfMSg', // ✓ Francium
  Ra: 'https://www.youtube.com/embed/5_I6vj-lXNM', // ✓ Radium
  Ac: 'https://www.youtube.com/embed/rKm0ShaJNFM', // ✓ Actinium
  Th: 'https://www.youtube.com/embed/2yZGcr0mpw0', // ✓ Thorium
  Pa: 'https://www.youtube.com/embed/bsIMMa7iEKU', // ✓ Protactinium
  U: 'https://www.youtube.com/embed/B8vVZTvJNGk', // ✓ Uranium
  Np: 'https://www.youtube.com/embed/1D75B0_URbE', // ✓ Neptunium
  Pu: 'https://www.youtube.com/embed/89UNPdNtOoE', // ✓ Plutonium
  Am: 'https://www.youtube.com/embed/CC-L-CITg3k', // ✓ Americium
  Cm: 'https://www.youtube.com/embed/sZobqPFNcwg', // ✓ Curium
  Bk: 'https://www.youtube.com/embed/7p1D9C1qkZY', // ✓ Berkelium
  Cf: 'https://www.youtube.com/embed/E0wtKOG8trE', // ✓ Californium
  Es: 'https://www.youtube.com/embed/UdJeLlwrVUI', // ✓ Einsteinium
  Fm: 'https://www.youtube.com/embed/SQhI52sqanA', // ✓ Fermium
  Md: 'https://www.youtube.com/embed/0JlshAo8DuE', // ✓ Mendelevium
  No: 'https://www.youtube.com/embed/t_ZpauMxapY', // ✓ Nobelium
  Lr: 'https://www.youtube.com/embed/_zBsnnJOkyA', // ✓ Lawrencium
  // Nguyên tố siêu nặng (104-118)
  Rf: 'https://www.youtube.com/embed/dOj9ZjKnJcY', // ✓ Rutherfordium
  Db: 'https://www.youtube.com/embed/5d4VekfRnMs', // ✓ Dubnium
  Sg: 'https://www.youtube.com/embed/UWq0djr790E', // ✓ Seaborgium
  Bh: 'https://www.youtube.com/embed/okJnQIjELY4', // ✓ Bohrium
  Hs: 'https://www.youtube.com/embed/u4GEVxbLego', // ✓ Hassium
  Mt: 'https://www.youtube.com/embed/N8VR7Qscq4k', // ✓ Meitnerium
  Ds: 'https://www.youtube.com/embed/lhvMqva3-7M', // ✓ Darmstadtium
  Rg: 'https://www.youtube.com/embed/MTq1hzhCF0g', // ✓ Roentgenium
  Cn: 'https://www.youtube.com/embed/QHcbQfcwegY', // ✓ Copernicium
  Nh: 'https://www.youtube.com/embed/-HcSEKuYGM8', // ✓ Nihonium
  Fl: 'https://www.youtube.com/embed/5L-NNFPiRog', // ✓ Flerovium
  Mc: 'https://www.youtube.com/embed/ewQAJtbgr7w', // ✓ Moscovium
  Lv: 'https://www.youtube.com/embed/YWKlqO9niuY', // ✓ Livermorium
  Ts: 'https://www.youtube.com/embed/1RGlXh9eC5E', // ✓ Tennessine
  Og: 'https://www.youtube.com/embed/VMv44bIBdQI', // ✓ Oganesson
};

// Hình ảnh cho các nguyên tố (từ images-of-elements.com - nguồn đáng tin cậy)
const elementImages = {
  // Chu kỳ 1
  H: 'https://images-of-elements.com/hydrogen.jpg',
  He: 'https://images-of-elements.com/helium.jpg',
  // Chu kỳ 2
  Li: 'https://images-of-elements.com/lithium.jpg',
  Be: 'https://images-of-elements.com/beryllium.jpg',
  B: 'https://images-of-elements.com/boron.jpg',
  C: 'https://images-of-elements.com/carbon.jpg',
  N: 'https://images-of-elements.com/nitrogen.jpg',
  O: 'https://images-of-elements.com/oxygen.jpg',
  F: 'https://images-of-elements.com/fluorine.jpg',
  Ne: 'https://images-of-elements.com/neon.jpg',
  // Chu kỳ 3
  Na: 'https://images-of-elements.com/sodium.jpg',
  Mg: 'https://images-of-elements.com/magnesium.jpg',
  Al: 'https://images-of-elements.com/aluminium.jpg',
  Si: 'https://images-of-elements.com/silicon.jpg',
  P: 'https://images-of-elements.com/phosphorus.jpg',
  S: 'https://images-of-elements.com/sulfur.jpg',
  Cl: 'https://images-of-elements.com/chlorine.jpg',
  Ar: 'https://images-of-elements.com/argon.jpg',
  // Chu kỳ 4
  K: 'https://images-of-elements.com/potassium.jpg',
  Ca: 'https://images-of-elements.com/calcium.jpg',
  Sc: 'https://images-of-elements.com/scandium.jpg',
  Ti: 'https://images-of-elements.com/titanium.jpg',
  V: 'https://images-of-elements.com/vanadium.jpg',
  Cr: 'https://images-of-elements.com/chromium.jpg',
  Mn: 'https://images-of-elements.com/manganese.jpg',
  Fe: 'https://images-of-elements.com/iron.jpg',
  Co: 'https://images-of-elements.com/cobalt.jpg',
  Ni: 'https://images-of-elements.com/nickel.jpg',
  Cu: 'https://images-of-elements.com/copper.jpg',
  Zn: 'https://images-of-elements.com/zinc.jpg',
  Ga: 'https://images-of-elements.com/gallium.jpg',
  Ge: 'https://images-of-elements.com/germanium.jpg',
  As: 'https://images-of-elements.com/arsenic.jpg',
  Se: 'https://images-of-elements.com/selenium.jpg',
  Br: 'https://images-of-elements.com/bromine.jpg',
  Kr: 'https://images-of-elements.com/krypton.jpg',
  // Chu kỳ 5
  Rb: 'https://images-of-elements.com/rubidium.jpg',
  Sr: 'https://images-of-elements.com/strontium.jpg',
  Y: 'https://images-of-elements.com/yttrium.jpg',
  Zr: 'https://images-of-elements.com/zirconium.jpg',
  Nb: 'https://images-of-elements.com/niobium.jpg',
  Mo: 'https://images-of-elements.com/molybdenum.jpg',
  Tc: 'https://images-of-elements.com/technetium.jpg',
  Ru: 'https://images-of-elements.com/ruthenium.jpg',
  Rh: 'https://images-of-elements.com/rhodium.jpg',
  Pd: 'https://images-of-elements.com/palladium.jpg',
  Ag: 'https://images-of-elements.com/silver.jpg',
  Cd: 'https://images-of-elements.com/cadmium.jpg',
  In: 'https://images-of-elements.com/indium.jpg',
  Sn: 'https://images-of-elements.com/tin.jpg',
  Sb: 'https://images-of-elements.com/antimony.jpg',
  Te: 'https://images-of-elements.com/tellurium.jpg',
  I: 'https://images-of-elements.com/iodine.jpg',
  Xe: 'https://images-of-elements.com/xenon.jpg',
  // Chu kỳ 6
  Cs: 'https://images-of-elements.com/caesium.jpg',
  Ba: 'https://images-of-elements.com/barium.jpg',
  // Lanthanides
  La: 'https://images-of-elements.com/lanthanum.jpg',
  Ce: 'https://images-of-elements.com/cerium.jpg',
  Pr: 'https://images-of-elements.com/praseodymium.jpg',
  Nd: 'https://images-of-elements.com/neodymium.jpg',
  Pm: 'https://images-of-elements.com/promethium.jpg',
  Sm: 'https://images-of-elements.com/samarium.jpg',
  Eu: 'https://images-of-elements.com/europium.jpg',
  Gd: 'https://images-of-elements.com/gadolinium.jpg',
  Tb: 'https://images-of-elements.com/terbium.jpg',
  Dy: 'https://images-of-elements.com/dysprosium.jpg',
  Ho: 'https://images-of-elements.com/holmium.jpg',
  Er: 'https://images-of-elements.com/erbium.jpg',
  Tm: 'https://images-of-elements.com/thulium.jpg',
  Yb: 'https://images-of-elements.com/ytterbium.jpg',
  Lu: 'https://images-of-elements.com/lutetium.jpg',
  // Tiếp tục chu kỳ 6
  Hf: 'https://images-of-elements.com/hafnium.jpg',
  Ta: 'https://images-of-elements.com/tantalum.jpg',
  W: 'https://images-of-elements.com/tungsten.jpg',
  Re: 'https://images-of-elements.com/rhenium.jpg',
  Os: 'https://images-of-elements.com/osmium.jpg',
  Ir: 'https://images-of-elements.com/iridium.jpg',
  Pt: 'https://images-of-elements.com/platinum.jpg',
  Au: 'https://images-of-elements.com/gold.jpg',
  Hg: 'https://images-of-elements.com/mercury.jpg',
  Tl: 'https://images-of-elements.com/thallium.jpg',
  Pb: 'https://images-of-elements.com/lead.jpg',
  Bi: 'https://images-of-elements.com/bismuth.jpg',
  Po: 'https://images-of-elements.com/polonium.jpg',
  At: 'https://images-of-elements.com/astatine.jpg',
  Rn: 'https://images-of-elements.com/radon.jpg',
  // Chu kỳ 7
  Fr: 'https://images-of-elements.com/francium.jpg',
  Ra: 'https://images-of-elements.com/radium.jpg',
  // Actinides
  Ac: 'https://images-of-elements.com/actinium.jpg',
  Th: 'https://images-of-elements.com/thorium.jpg',
  Pa: 'https://images-of-elements.com/protactinium.jpg',
  U: 'https://images-of-elements.com/uranium.jpg',
  Np: 'https://images-of-elements.com/neptunium.jpg',
  Pu: 'https://images-of-elements.com/plutonium.jpg',
  Am: 'https://images-of-elements.com/americium.jpg',
  Cm: 'https://images-of-elements.com/curium.jpg',
  Bk: 'https://images-of-elements.com/berkelium.jpg',
  Cf: 'https://images-of-elements.com/californium.jpg',
  Es: 'https://images-of-elements.com/einsteinium.jpg',
  Fm: 'https://images-of-elements.com/fermium.jpg',
  Md: 'https://images-of-elements.com/mendelevium.jpg',
  No: 'https://images-of-elements.com/nobelium.jpg',
  Lr: 'https://images-of-elements.com/lawrencium.jpg',
  // Tiếp tục chu kỳ 7
  Rf: 'https://images-of-elements.com/rutherfordium.jpg',
  Db: 'https://images-of-elements.com/dubnium.jpg',
  Sg: 'https://images-of-elements.com/seaborgium.jpg',
  Bh: 'https://images-of-elements.com/bohrium.jpg',
  Hs: 'https://images-of-elements.com/hassium.jpg',
  Mt: 'https://images-of-elements.com/meitnerium.jpg',
  Ds: 'https://images-of-elements.com/darmstadtium.jpg',
  Rg: 'https://images-of-elements.com/roentgenium.jpg',
  Cn: 'https://images-of-elements.com/copernicium.jpg',
  Nh: 'https://images-of-elements.com/nihonium.jpg',
  Fl: 'https://images-of-elements.com/flerovium.jpg',
  Mc: 'https://images-of-elements.com/moscovium.jpg',
  Lv: 'https://images-of-elements.com/livermorium.jpg',
  Ts: 'https://images-of-elements.com/tennessine.jpg',
  Og: 'https://images-of-elements.com/oganesson.jpg',
};

// Trạng thái vật chất ở nhiệt độ phòng
const elementPhases = {
  gas: ['H', 'He', 'N', 'O', 'F', 'Ne', 'Cl', 'Ar', 'Kr', 'Xe', 'Rn'],
  liquid: ['Br', 'Hg'],
  // Còn lại là rắn
};

// Bảng tuần hoàn layout - 18 cột x 7 hàng (không bao gồm Lanthanides/Actinides)
const PERIODIC_TABLE_LAYOUT = [
  ['H', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'He'],
  ['Li', 'Be', '', '', '', '', '', '', '', '', '', '', 'B', 'C', 'N', 'O', 'F', 'Ne'],
  ['Na', 'Mg', '', '', '', '', '', '', '', '', '', '', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'],
  ['K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'],
  ['Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe'],
  ['Cs', 'Ba', 'La*', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn'],
  ['Fr', 'Ra', 'Ac**', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'],
];

// Lanthanides (Hàng La series)
const LANTHANIDES = ['La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu'];

// Actinides (Hàng Ac series)
const ACTINIDES = ['Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr'];

const PeriodicTable = ({ onElementSelect }) => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showElectronShells, setShowElectronShells] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, electron, media, properties

  const elements = useMemo(() => periodicData, []);

  // Helper function to get phase of element
  const getElementPhase = useCallback((symbol) => {
    if (elementPhases.gas.includes(symbol)) return { phase: 'gas', icon: '💨', label: 'Khí' };
    if (elementPhases.liquid.includes(symbol)) return { phase: 'liquid', icon: '💧', label: 'Lỏng' };
    return { phase: 'solid', icon: '🧊', label: 'Rắn' };
  }, []);

  // Helper function to get electronegativity color
  const getElectronegativityColor = useCallback((value) => {
    if (!value) return '#666';
    const normalized = (value - 0.7) / (4 - 0.7); // Normalize between Francium (0.7) and Fluorine (4.0)
    const r = Math.round(255 * normalized);
    const b = Math.round(255 * (1 - normalized));
    return `rgb(${r}, 100, ${b})`;
  }, []);

  const filteredElements = useMemo(() => {
    return Object.keys(elements).filter(symbol => {
      const element = elements[symbol];
      const matchesCategory = filterCategory === 'all' || elementCategories[symbol] === filterCategory;
      const matchesSearch = searchTerm === '' || 
        element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.atomicNumber.toString().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });
  }, [elements, filterCategory, searchTerm]);

  const handleElementClick = useCallback((symbol) => {
    const element = elements[symbol];
    if (element) {
      setSelectedElement(symbol);
      if (onElementSelect) {
        onElementSelect({ ...element, ...elementExtendedData[symbol] });
      }
    }
  }, [elements, onElementSelect]);

  const getElementStyle = useCallback((symbol) => {
    if (!symbol || symbol === '') return null;
    const category = elementCategories[symbol] || 'unknown';
    const color = categoryColors[category] || categoryColors.unknown;
    const isFiltered = filteredElements.includes(symbol);
    const isHovered = hoveredElement === symbol;
    const isSelected = selectedElement === symbol;

    return {
      backgroundColor: isFiltered ? color : '#2d2d2d',
      opacity: isFiltered ? 1 : 0.3,
      transform: isHovered ? 'scale(1.15)' : isSelected ? 'scale(1.1)' : 'scale(1)',
      boxShadow: isSelected ? `0 0 20px ${color}` : isHovered ? `0 0 15px ${color}50` : 'none',
      border: isSelected ? `3px solid ${color}` : '1px solid rgba(255,255,255,0.2)',
      zIndex: isHovered || isSelected ? 10 : 1,
    };
  }, [filteredElements, hoveredElement, selectedElement]);

  const renderElement = useCallback((symbol, rowIndex, colIndex) => {
    if (symbol === '') {
      return <div key={`empty-${rowIndex}-${colIndex}`} className="w-12 h-14 md:w-14 md:h-16" />;
    }

    // Xử lý các kí tự đặc biệt (La*, Ac**)
    const cleanSymbol = symbol.replace(/[\*]+/g, '');
    const element = elements[cleanSymbol];
    
    if (!element) {
      return (
        <div key={`missing-${symbol}`} className="w-12 h-14 md:w-14 md:h-16 bg-gray-700 rounded flex items-center justify-center text-gray-500 text-xs">
          {cleanSymbol}
        </div>
      );
    }

    const style = getElementStyle(cleanSymbol);
    const isHovered = hoveredElement === cleanSymbol;
    const phaseInfo = getElementPhase(cleanSymbol);
    
    return (
      <div
        key={symbol}
        className="w-12 h-14 md:w-14 md:h-16 rounded cursor-pointer transition-all duration-200 flex flex-col items-center justify-center p-1 relative group"
        style={style}
        onClick={() => handleElementClick(cleanSymbol)}
        onMouseEnter={() => setHoveredElement(cleanSymbol)}
        onMouseLeave={() => setHoveredElement(null)}
      >
        <span className="text-[8px] text-gray-300 absolute top-0.5 left-1">{element.atomicNumber}</span>
        <span className="text-sm md:text-base font-bold text-white">{element.symbol}</span>
        <span className="text-[7px] md:text-[8px] text-gray-200 truncate w-full text-center">{element.name}</span>
        {symbol.includes('*') && <span className="text-[6px] text-yellow-400 absolute top-0.5 right-1">*</span>}
        {!symbol.includes('*') && <span className="text-[8px] absolute top-0.5 right-1">{phaseInfo.icon}</span>}
        {showElectronShells && element.electrons && (
          <span className="text-[6px] text-gray-400 absolute bottom-0.5">{element.electrons.join('-')}</span>
        )}
        
        {/* Hover tooltip với thông tin nhanh */}
        {isHovered && (
          <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-900 border border-gray-600 rounded-lg p-3 shadow-xl pointer-events-none">
            <div className="text-center mb-2">
              <span className="text-lg font-bold text-white">{element.name}</span>
              <span className="text-gray-400 text-sm ml-2">({element.symbol})</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Số hiệu:</span>
                <span className="text-white">{element.atomicNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Khối lượng:</span>
                <span className="text-white">{element.atomicMass} u</span>
              </div>
              {element.electronegativity && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Độ âm điện:</span>
                  <span className="text-white" style={{ color: getElectronegativityColor(element.electronegativity) }}>{element.electronegativity}</span>
                </div>
              )}
              {element.electrons && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Lớp e⁻:</span>
                  <span className="text-blue-300">{element.electrons.join('-')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Trạng thái:</span>
                <span className="text-white">{phaseInfo.icon} {phaseInfo.label}</span>
              </div>
            </div>
            <div className="text-center text-[10px] text-blue-400 mt-2 pt-2 border-t border-gray-700">
              👆 Click để xem chi tiết
            </div>
            {/* Arrow pointing down */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
              <div className="w-3 h-3 bg-gray-900 border-r border-b border-gray-600 transform rotate-45"></div>
            </div>
          </div>
        )}
      </div>
    );
  }, [elements, getElementStyle, handleElementClick, showElectronShells, hoveredElement, getElementPhase, getElectronegativityColor]);

  const renderElectronShells = useCallback((electrons) => {
    if (!electrons || !Array.isArray(electrons)) return null;
    const shellColors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9B59B6', '#E74C3C', '#1ABC9C'];
    const shellNames = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
    const maxRadius = 80;
    const shellSpacing = maxRadius / (electrons.length + 1);

    return (
      <div className="flex flex-col items-center">
        <svg width="200" height="200" className="mx-auto">
          {/* Hạt nhân */}
          <circle cx="100" cy="100" r="14" fill="linear-gradient(135deg, #FF6B6B, #ee5a5a)" />
          <circle cx="100" cy="100" r="14" fill="#FF6B6B" />
          <text x="100" y="104" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">+</text>
          
          {electrons.map((electronCount, shellIndex) => {
            const radius = (shellIndex + 1) * shellSpacing + 18;
            const electronPositions = [];
            for (let i = 0; i < electronCount; i++) {
              const angle = (2 * Math.PI * i) / electronCount - Math.PI / 2;
              electronPositions.push({ x: 100 + radius * Math.cos(angle), y: 100 + radius * Math.sin(angle) });
            }
            return (
              <g key={`shell-${shellIndex}`}>
                {/* Quỹ đạo */}
                <circle 
                  cx="100" cy="100" r={radius} 
                  fill="none" 
                  stroke={shellColors[shellIndex % shellColors.length]} 
                  strokeWidth="1.5" 
                  strokeDasharray="4,3" 
                  opacity="0.6" 
                />
                {/* Electron trên quỹ đạo */}
                {electronPositions.map((pos, i) => (
                  <g key={`electron-${shellIndex}-${i}`}>
                    <circle 
                      cx={pos.x} cy={pos.y} r="7" 
                      fill={shellColors[shellIndex % shellColors.length]} 
                      className="animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                    <text x={pos.x} y={pos.y + 3} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">−</text>
                  </g>
                ))}
              </g>
            );
          })}
        </svg>
        
        {/* Legend for electron shells */}
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {electrons.map((count, idx) => (
            <div key={idx} className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
              style={{ backgroundColor: shellColors[idx % shellColors.length] + '30', color: shellColors[idx % shellColors.length] }}>
              <span className="font-bold">{shellNames[idx]}:</span>
              <span>{count}e⁻</span>
            </div>
          ))}
        </div>
      </div>
    );
  }, []);

  // Render electron configuration với orbital notation
  const renderElectronConfig = useCallback((config) => {
    if (!config) return null;
    
    // Parse electron configuration
    const parts = config.split(' ');
    
    return (
      <div className="bg-gray-800/50 rounded-xl p-4">
        <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-lg">⚛️</span> Cấu hình electron chi tiết
        </h5>
        <div className="flex flex-wrap gap-2 justify-center">
          {parts.map((part, idx) => {
            // Match patterns like 1s², [Ne], etc.
            const orbitalMatch = part.match(/(\d)([spdf])([¹²³⁴⁵⁶⁷⁸⁹⁰]+)/);
            const coreMatch = part.match(/\[(\w+)\]/);
            
            if (coreMatch) {
              return (
                <span key={idx} className="px-3 py-2 bg-purple-600/40 text-purple-300 rounded-lg font-mono text-sm border border-purple-500/50">
                  [{coreMatch[1]}]
                </span>
              );
            }
            
            if (orbitalMatch) {
              const [, n, l, count] = orbitalMatch;
              const orbitalColors = { s: 'blue', p: 'green', d: 'orange', f: 'pink' };
              const color = orbitalColors[l] || 'gray';
              
              return (
                <span key={idx} className={`px-3 py-2 bg-${color}-600/40 text-${color}-300 rounded-lg font-mono text-sm border border-${color}-500/50`}
                  style={{ 
                    backgroundColor: `${color === 'blue' ? '#3B82F6' : color === 'green' ? '#22C55E' : color === 'orange' ? '#F97316' : '#EC4899'}20`,
                    color: color === 'blue' ? '#93C5FD' : color === 'green' ? '#86EFAC' : color === 'orange' ? '#FDBA74' : '#F9A8D4',
                    borderColor: `${color === 'blue' ? '#3B82F6' : color === 'green' ? '#22C55E' : color === 'orange' ? '#F97316' : '#EC4899'}50`
                  }}>
                  {n}{l}<sup>{count}</sup>
                </span>
              );
            }
            
            return (
              <span key={idx} className="px-3 py-2 bg-gray-600/40 text-gray-300 rounded-lg font-mono text-sm">
                {part}
              </span>
            );
          })}
        </div>
        
        {/* Giải thích */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded" style={{ backgroundColor: '#3B82F620', border: '1px solid #3B82F650' }}></span>
            <span className="text-gray-400">s: hình cầu (max 2e⁻)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded" style={{ backgroundColor: '#22C55E20', border: '1px solid #22C55E50' }}></span>
            <span className="text-gray-400">p: hình số 8 (max 6e⁻)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded" style={{ backgroundColor: '#F9731620', border: '1px solid #F9731650' }}></span>
            <span className="text-gray-400">d: hình hoa (max 10e⁻)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded" style={{ backgroundColor: '#EC489920', border: '1px solid #EC489950' }}></span>
            <span className="text-gray-400">f: phức tạp (max 14e⁻)</span>
          </div>
        </div>
      </div>
    );
  }, []);

  // Render electronegativity scale
  const renderElectronegativityScale = useCallback((value) => {
    if (!value) return null;
    const percentage = ((value - 0.7) / (4 - 0.7)) * 100;
    
    return (
      <div className="bg-gray-800/50 rounded-xl p-4">
        <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="text-lg">⚡</span> Thang độ âm điện Pauling
        </h5>
        <div className="relative h-8 rounded-lg overflow-hidden" 
          style={{ background: 'linear-gradient(90deg, #3B82F6, #22C55E, #FACC15, #F97316, #EF4444)' }}>
          <div className="absolute top-0 left-0 h-full w-1 bg-white transform -translate-x-1/2 shadow-lg"
            style={{ left: `${percentage}%` }}>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>0.7 (Fr)</span>
          <span>1.5</span>
          <span>2.5</span>
          <span>3.5</span>
          <span>4.0 (F)</span>
        </div>
        <div className="text-center mt-3">
          <span className="text-2xl font-bold" style={{ color: getElectronegativityColor(value) }}>{value}</span>
          <span className="text-gray-400 ml-2 text-sm">
            {value < 1.5 ? '(Rất thấp - Kim loại mạnh)' : 
             value < 2.0 ? '(Thấp - Kim loại)' :
             value < 2.5 ? '(Trung bình)' :
             value < 3.0 ? '(Cao - Phi kim)' : '(Rất cao - Phi kim mạnh)'}
          </span>
        </div>
      </div>
    );
  }, [getElectronegativityColor]);

  const selectedElementData = selectedElement ? { ...elements[selectedElement], ...elementExtendedData[selectedElement] } : null;

  return (
    <div className="bg-gray-900 rounded-xl p-4 md:p-6 overflow-x-auto">
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
        <h2 className="text-2xl font-bold text-white">🧪 Bảng Tuần Hoàn Tương Tác</h2>
        <div className="flex flex-wrap gap-3">
          <input type="text" placeholder="Tìm nguyên tố..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none w-40" />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none">
            <option value="all">Tất cả loại</option>
            {Object.entries(categoryNames).map(([key, name]) => (<option key={key} value={key}>{name}</option>))}
          </select>
          <button onClick={() => setShowElectronShells(!showElectronShells)}
            className={`px-4 py-2 rounded-lg transition-all ${showElectronShells ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
            ⚛️ Lớp e⁻
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(categoryNames).map(([key, name]) => (
          <div key={key} className="flex items-center gap-1 px-2 py-1 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity"
            style={{ backgroundColor: categoryColors[key] + '40' }} onClick={() => setFilterCategory(filterCategory === key ? 'all' : key)}>
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: categoryColors[key] }} />
            <span className="text-white">{name}</span>
          </div>
        ))}
      </div>

      <div className="inline-block min-w-max">
        <div className="flex flex-col gap-1">
          {PERIODIC_TABLE_LAYOUT.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex gap-1">
              <span className="w-6 h-14 md:h-16 flex items-center justify-center text-gray-500 text-sm">{rowIndex + 1}</span>
              {row.map((symbol, colIndex) => renderElement(symbol, rowIndex, colIndex))}
            </div>
          ))}
        </div>

        {/* Lanthanides Series */}
        <div className="mt-6 mb-4 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-semibold w-12">* La series:</span>
            <div className="flex gap-1">
              {LANTHANIDES.map((symbol) => renderElement(symbol, 8, LANTHANIDES.indexOf(symbol)))}
            </div>
          </div>

          {/* Actinides Series */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-semibold w-12">** Ac series:</span>
            <div className="flex gap-1">
              {ACTINIDES.map((symbol) => renderElement(symbol, 9, ACTINIDES.indexOf(symbol)))}
            </div>
          </div>
        </div>

        {/* Legend & Annotations */}
        <div className="mt-6 pt-4 border-t border-gray-700 text-xs text-gray-400 space-y-2">
          <div className="flex gap-4 flex-wrap">
            <div>💧 <span className="text-gray-300">Lỏng ở T° phòng:</span> Hg, Br</div>
            <div>💨 <span className="text-gray-300">Khí ở T° phòng:</span> H, N, O, F, Cl, He, Ne, Ar, Kr, Xe, Rn</div>
          </div>
        </div>
      </div>

      {selectedElementData && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={() => { setSelectedElement(null); setActiveTab('overview'); }}>
          <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden border-2 flex flex-col"
            style={{ borderColor: categoryColors[elementCategories[selectedElement]] }} onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div className="p-6 border-b border-gray-700 flex-shrink-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-xl flex flex-col items-center justify-center text-white relative overflow-hidden"
                    style={{ backgroundColor: categoryColors[elementCategories[selectedElement]] }}>
                    <span className="absolute top-1 left-2 text-xs opacity-80">{selectedElementData.atomicNumber}</span>
                    <span className="text-4xl font-bold">{selectedElementData.symbol}</span>
                    <span className="text-[10px] opacity-80">{selectedElementData.atomicMass}</span>
                    {(() => {
                      const phaseInfo = getElementPhase(selectedElement);
                      return <span className="absolute top-1 right-2 text-sm">{phaseInfo.icon}</span>;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">{selectedElementData.name}</h3>
                    <p className="text-gray-400 mt-1">
                      {categoryNames[elementCategories[selectedElement]]} • Nhóm {selectedElementData.group || 'N/A'} • Chu kỳ {selectedElementData.period}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      {selectedElementData.electronConfig && (
                        <span className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm">
                          ⚛️ {selectedElementData.electronConfig}
                        </span>
                      )}
                      {selectedElementData.electronegativity && (
                        <span className="px-3 py-1 bg-yellow-600/30 text-yellow-300 rounded-full text-sm">
                          ⚡ χ = {selectedElementData.electronegativity}
                        </span>
                      )}
                      {(() => {
                        const phaseInfo = getElementPhase(selectedElement);
                        return (
                          <span className="px-3 py-1 bg-cyan-600/30 text-cyan-300 rounded-full text-sm">
                            {phaseInfo.icon} {phaseInfo.label} (25°C)
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                </div>
                <button onClick={() => { setSelectedElement(null); setActiveTab('overview'); }} 
                  className="text-gray-400 hover:text-white text-3xl hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-all">×</button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700 px-6 flex-shrink-0">
              {[
                { id: 'overview', label: '📋 Tổng quan', icon: '📋' },
                { id: 'electron', label: '⚛️ Cấu hình e⁻', icon: '⚛️' },
                { id: 'media', label: '🎬 Video & Hình ảnh', icon: '🎬' },
                { id: 'properties', label: '📊 Tính chất', icon: '📊' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-[2px] ${
                    activeTab === tab.id 
                      ? 'text-white border-blue-500 bg-blue-500/10' 
                      : 'text-gray-400 border-transparent hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  {selectedElementData.description && (
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <span className="text-lg">📝</span> Mô tả
                      </h4>
                      <p className="text-gray-300 leading-relaxed">{selectedElementData.description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center hover:bg-gray-800 transition-all">
                      <p className="text-gray-400 text-xs mb-1">Khối lượng nguyên tử</p>
                      <p className="text-white font-bold text-lg">{selectedElementData.atomicMass}</p>
                      <p className="text-gray-500 text-xs">u (đvC)</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center hover:bg-gray-800 transition-all">
                      <p className="text-gray-400 text-xs mb-1">Độ âm điện</p>
                      <p className="text-white font-bold text-lg" style={{ color: getElectronegativityColor(selectedElementData.electronegativity) }}>
                        {selectedElementData.electronegativity || 'N/A'}
                      </p>
                      <p className="text-gray-500 text-xs">Pauling</p>
                    </div>
                    {selectedElementData.meltingPoint !== undefined && selectedElementData.meltingPoint !== null && (
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center hover:bg-gray-800 transition-all">
                        <p className="text-gray-400 text-xs mb-1">🔥 Nhiệt độ nóng chảy</p>
                        <p className="text-white font-bold text-lg">{selectedElementData.meltingPoint}°C</p>
                      </div>
                    )}
                    {selectedElementData.boilingPoint !== undefined && selectedElementData.boilingPoint !== null && (
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center hover:bg-gray-800 transition-all">
                        <p className="text-gray-400 text-xs mb-1">💨 Nhiệt độ sôi</p>
                        <p className="text-white font-bold text-lg">{selectedElementData.boilingPoint}°C</p>
                      </div>
                    )}
                  </div>

                  {selectedElementData.applications && (
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <span className="text-lg">🔧</span> Ứng dụng thực tế
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedElementData.applications.map((app, i) => (
                          <span key={i} className="px-3 py-2 bg-blue-600/20 text-blue-300 rounded-lg text-sm border border-blue-500/30 hover:bg-blue-600/30 transition-all cursor-default">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedElementData.facts && (
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <span className="text-lg">💡</span> Sự thật thú vị
                      </h4>
                      <ul className="space-y-2">
                        {selectedElementData.facts.map((fact, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-all">
                            <span className="text-yellow-400 text-lg">✦</span>
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedElementData.discoveredBy && (
                    <div className="flex items-center justify-center gap-4 p-4 bg-gray-800/30 rounded-xl">
                      <span className="text-gray-500">🔬 Phát hiện bởi:</span>
                      <span className="text-gray-300 font-medium">{selectedElementData.discoveredBy}</span>
                      {selectedElementData.discoveryYear && (
                        <>
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-400">{selectedElementData.discoveryYear}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Electron Configuration Tab */}
              {activeTab === 'electron' && (
                <div className="space-y-6">
                  {selectedElementData.electrons && (
                    <div className="bg-gray-800/50 rounded-xl p-6">
                      <h4 className="text-white font-semibold mb-4 text-center flex items-center justify-center gap-2">
                        <span className="text-xl">🔮</span> Mô hình nguyên tử Bohr
                      </h4>
                      {renderElectronShells(selectedElementData.electrons)}
                      <p className="text-center text-gray-400 text-sm mt-4">
                        Tổng số electron: <span className="text-white font-bold">{selectedElementData.electrons.reduce((a, b) => a + b, 0)}</span>
                      </p>
                    </div>
                  )}

                  {renderElectronConfig(selectedElementData.electronConfig)}

                  {selectedElementData.electronegativity && renderElectronegativityScale(selectedElementData.electronegativity)}

                  {selectedElementData.oxidationStates && (
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <span className="text-lg">🔢</span> Số oxi hóa
                      </h5>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {selectedElementData.oxidationStates.map((state, i) => (
                          <span key={i} className={`px-4 py-2 rounded-lg font-mono font-bold ${
                            state > 0 ? 'bg-red-600/30 text-red-300 border border-red-500/50' :
                            state < 0 ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50' :
                            'bg-gray-600/30 text-gray-300 border border-gray-500/50'
                          }`}>
                            {state > 0 ? `+${state}` : state}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Media Tab */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  {/* Element Image */}
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <span className="text-lg">📷</span> Hình ảnh thực tế
                    </h4>
                    <div className="flex justify-center">
                      {elementImages[selectedElement] ? (
                        <div className="relative group" id={`img-container-${selectedElement}`}>
                          <img 
                            src={elementImages[selectedElement]} 
                            alt={`${selectedElementData.name} - hình ảnh thực tế`}
                            className="max-h-64 min-w-[200px] rounded-xl object-cover shadow-lg border border-gray-700 group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { 
                              // Ẩn cả container khi hình không load được
                              e.target.parentElement.innerHTML = `
                                <div class="w-full h-48 bg-gray-700/50 rounded-xl flex flex-col items-center justify-center gap-3 min-w-[300px]">
                                  <span class="text-4xl">🖼️</span>
                                  <p class="text-gray-400 text-center">Không thể tải hình ảnh<br/><span class="text-xs text-gray-500">(Có thể do giới hạn truy cập)</span></p>
                                  <a href="${elementImages[selectedElement]}" target="_blank" rel="noopener noreferrer" class="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                                    Xem trên Wikipedia
                                  </a>
                                </div>
                              `;
                            }}
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-b-xl">
                            <p className="text-white text-sm text-center whitespace-nowrap">{selectedElementData.name} trong tự nhiên</p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-48 bg-gray-700/50 rounded-xl flex flex-col items-center justify-center gap-3">
                          <span className="text-4xl">🖼️</span>
                          <p className="text-gray-500">Chưa có hình ảnh cho nguyên tố này</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Element Video */}
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <span className="text-lg">🎬</span> Video về {selectedElementData.name}
                    </h4>
                    <div className="flex justify-center">
                      {elementVideos[selectedElement] ? (
                        <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-700">
                          <iframe
                            src={elementVideos[selectedElement]}
                            title={`Video về ${selectedElementData.name}`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-video max-w-2xl bg-gray-700/50 rounded-xl flex flex-col items-center justify-center gap-3">
                          <span className="text-4xl">🎥</span>
                          <p className="text-gray-500">Chưa có video cho nguyên tố này</p>
                          <a 
                            href={`https://www.youtube.com/results?search_query=${selectedElementData.name}+element+periodic+table`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex items-center gap-2"
                          >
                            <span>▶️</span> Tìm trên YouTube
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* External Links */}
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <span className="text-lg">🔗</span> Tìm hiểu thêm
                    </h4>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <a 
                        href={`https://vi.wikipedia.org/wiki/${selectedElementData.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all flex items-center gap-2"
                      >
                        📚 Wikipedia tiếng Việt
                      </a>
                      <a 
                        href={`https://www.webelements.com/${selectedElementData.name?.toLowerCase()}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-all flex items-center gap-2"
                      >
                        🌐 WebElements
                      </a>
                      <a 
                        href={`https://pubchem.ncbi.nlm.nih.gov/element/${selectedElementData.atomicNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                      >
                        🔬 PubChem
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Properties Tab */}
              {activeTab === 'properties' && (
                <div className="space-y-4">
                  {/* Physical Properties */}
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <span className="text-lg">⚗️</span> Tính chất vật lý
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                          <span className="text-gray-400">Trạng thái (25°C):</span>
                          <span className="text-white font-medium flex items-center gap-2">
                            {(() => {
                              const phaseInfo = getElementPhase(selectedElement);
                              return <>{phaseInfo.icon} {phaseInfo.label}</>;
                            })()}
                          </span>
                        </div>
                        {selectedElementData.density && (
                          <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                            <span className="text-gray-400">Khối lượng riêng:</span>
                            <span className="text-white font-medium">{selectedElementData.density} g/cm³</span>
                          </div>
                        )}
                        {selectedElementData.meltingPoint !== undefined && selectedElementData.meltingPoint !== null && (
                          <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                            <span className="text-gray-400">Nhiệt độ nóng chảy:</span>
                            <span className="text-white font-medium">{selectedElementData.meltingPoint}°C</span>
                          </div>
                        )}
                        {selectedElementData.boilingPoint !== undefined && selectedElementData.boilingPoint !== null && (
                          <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                            <span className="text-gray-400">Nhiệt độ sôi:</span>
                            <span className="text-white font-medium">{selectedElementData.boilingPoint}°C</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        {selectedElementData.color && (
                          <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                            <span className="text-gray-400">Màu sắc:</span>
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full border border-gray-500" style={{ backgroundColor: selectedElementData.color }}></span>
                              <span className="text-white font-medium">{selectedElementData.color}</span>
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                          <span className="text-gray-400">Số hiệu nguyên tử:</span>
                          <span className="text-white font-medium">{selectedElementData.atomicNumber}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                          <span className="text-gray-400">Khối lượng nguyên tử:</span>
                          <span className="text-white font-medium">{selectedElementData.atomicMass} u</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chemical Properties */}
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <span className="text-lg">🧪</span> Tính chất hóa học
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                          <span className="text-gray-400">Nhóm:</span>
                          <span className="text-white font-medium">{selectedElementData.group || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                          <span className="text-gray-400">Chu kỳ:</span>
                          <span className="text-white font-medium">{selectedElementData.period}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                          <span className="text-gray-400">Phân loại:</span>
                          <span className="text-white font-medium px-2 py-1 rounded" 
                            style={{ backgroundColor: categoryColors[elementCategories[selectedElement]] + '40' }}>
                            {categoryNames[elementCategories[selectedElement]]}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                          <span className="text-gray-400">Độ âm điện:</span>
                          <span className="text-white font-medium" style={{ color: getElectronegativityColor(selectedElementData.electronegativity) }}>
                            {selectedElementData.electronegativity || 'N/A'}
                          </span>
                        </div>
                        {selectedElementData.oxidationStates && (
                          <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                            <span className="text-gray-400">Số oxi hóa:</span>
                            <span className="text-white font-medium">
                              {selectedElementData.oxidationStates.map(s => s > 0 ? `+${s}` : s).join(', ')}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                          <span className="text-gray-400">Cấu hình e⁻:</span>
                          <span className="text-blue-300 font-mono text-sm">{selectedElementData.electronConfig}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Electron shells visualization */}
                  {selectedElementData.electrons && (
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <span className="text-lg">🔵</span> Phân bố electron theo lớp
                      </h4>
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        {selectedElementData.electrons.map((count, idx) => (
                          <div key={idx} className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full border-2 border-blue-400 flex items-center justify-center text-white font-bold bg-blue-500/20">
                              {count}
                            </div>
                            <span className="text-xs text-gray-400 mt-1">Lớp {idx + 1}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-center text-gray-500 text-sm mt-3">
                        {selectedElementData.electrons.join(' - ')} = {selectedElementData.electrons.reduce((a, b) => a + b, 0)} electron
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;
