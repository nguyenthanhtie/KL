// Video data cho các nguyên tố - Cập nhật từ Periodic Videos playlist
// Nguồn: https://www.youtube.com/playlist?list=PL7A1F4CF36C085DE1
// Cập nhật: 2026-01-15
const FALLBACK_VIDEO = 'https://www.youtube.com/embed/rz4Dd1I_fX0';

const elementVideos = {
  H: 'https://www.youtube.com/embed/6rdmpx39PRk', // ✓ Periodic Videos
  He: 'https://www.youtube.com/embed/M6xZZiaLOV4', // ✓ Periodic Videos
  Li: 'https://www.youtube.com/embed/LfS10ArXTBA', // ✓ Periodic Videos
  Be: 'https://www.youtube.com/embed/qy8JyQShZRA', // ✓ Periodic Videos
  B: 'https://www.youtube.com/embed/JzqdHkpXuy4', // ✓ Periodic Videos
  C: 'https://www.youtube.com/embed/QuW4_bRHbUk', // ✓ Periodic Videos
  N: 'https://www.youtube.com/embed/H8XNdqA18-M', // ✓ Periodic Videos
  O: 'https://www.youtube.com/embed/WuG5WTId-IY', // ✓ Periodic Videos
  F: 'https://www.youtube.com/embed/vtWp45Eewtw', // ✓ Periodic Videos
  Ne: 'https://www.youtube.com/embed/ILkvZKSVRI4', // ✓ Periodic Videos
  Na: 'https://www.youtube.com/embed/7IT2I3LtlNE', // ✓ Periodic Videos
  Mg: 'https://www.youtube.com/embed/FKkWdizutxI', // ✓ Periodic Videos
  Al: 'https://www.youtube.com/embed/4AhZ8503WPs', // ✓ Periodic Videos
  Si: 'https://www.youtube.com/embed/a2aWO5cL410', // ✓ Periodic Videos
  P: 'https://www.youtube.com/embed/LSYLUat03A4', // ✓ Periodic Videos
  S: 'https://www.youtube.com/embed/mGMR72X8V-U', // ✓ Periodic Videos
  Cl: 'https://www.youtube.com/embed/BXCfBl4rmh0', // ✓ Periodic Videos
  Ar: 'https://www.youtube.com/embed/N0Gw6-xMLlo', // ✓ Periodic Videos
  K: 'https://www.youtube.com/embed/pPdevJTGAYY', // ✓ Periodic Videos
  Ca: 'https://www.youtube.com/embed/V9fuY8_ffFg', // ✓ Periodic Videos
  Sc: 'https://www.youtube.com/embed/gab_2a7gyLU', // ✓ Periodic Videos
  Ti: 'https://www.youtube.com/embed/MpFTQYynrc4', // ✓ Periodic Videos
  V: 'https://www.youtube.com/embed/MbCmaQzrZoc', // ✓ Periodic Videos
  Cr: 'https://www.youtube.com/embed/9NPjdDS11C4', // ✓ Periodic Videos
  Mn: 'https://www.youtube.com/embed/uTVtBuY9Q-0', // ✓ Periodic Videos
  Fe: 'https://www.youtube.com/embed/euQUgp5AY-Y', // ✓ Periodic Videos
  Co: 'https://www.youtube.com/embed/MWtL3pvGC68', // ✓ Periodic Videos
  Ni: 'https://www.youtube.com/embed/AUmoaZn9bek', // ✓ Periodic Videos
  Cu: 'https://www.youtube.com/embed/kop1sWzTK-I', // ✓ Periodic Videos
  Zn: 'https://www.youtube.com/embed/99wPiMb-k0o', // ✓ Periodic Videos
  Ga: 'https://www.youtube.com/embed/N6ccRvKKwZQ', // ✓ Periodic Videos
  Ge: 'https://www.youtube.com/embed/osrKWVknkgs', // ✓ Periodic Videos
  As: 'https://www.youtube.com/embed/yD8Vz-mFHgI', // ✓ Periodic Videos
  Se: 'https://www.youtube.com/embed/IHrUtKjcAFE', // ✓ Periodic Videos
  Br: 'https://www.youtube.com/embed/Slt3_5upuSs', // ✓ Periodic Videos
  Kr: 'https://www.youtube.com/embed/il4OOY7Zseg', // ✓ Periodic Videos
  Rb: 'https://www.youtube.com/embed/0XLGopBovoI', // ✓ Periodic Videos
  Sr: 'https://www.youtube.com/embed/d5ztPGrsgNQ', // ✓ Periodic Videos
  Y: 'https://www.youtube.com/embed/NxbOQ1FhqdQ', // ✓ Periodic Videos
  Zr: 'https://www.youtube.com/embed/gNJE2MPktvg', // ✓ Periodic Videos
  Nb: 'https://www.youtube.com/embed/2ciPAsVTq6c', // ✓ Periodic Videos
  Mo: 'https://www.youtube.com/embed/ZRQ3vBGskds', // ✓ Periodic Videos
  Tc: 'https://www.youtube.com/embed/ud5c1TVkcnU', // ✓ Periodic Videos
  Ru: 'https://www.youtube.com/embed/wl5ZYb0hDTc', // ✓ Periodic Videos
  Rh: 'https://www.youtube.com/embed/PPSO5798k2I', // ✓ Periodic Videos
  Pd: 'https://www.youtube.com/embed/4ALTGeqmNFM', // ✓ Periodic Videos
  Ag: 'https://www.youtube.com/embed/pPd5qAb4J50', // ✓ Periodic Videos
  Cd: 'https://www.youtube.com/embed/boRius1DYdQ', // ✓ Periodic Videos
  In: 'https://www.youtube.com/embed/TviX7V-ay5I', // ✓ Periodic Videos
  Sn: 'https://www.youtube.com/embed/rXZscASelkc', // ✓ Periodic Videos
  Sb: 'https://www.youtube.com/embed/kcc6qNT3BoU', // ✓ Periodic Videos
  Te: 'https://www.youtube.com/embed/5ChFbVu4Mpk', // ✓ Periodic Videos
  I: 'https://www.youtube.com/embed/JUBsJLRSM64', // ✓ Periodic Videos
  Xe: 'https://www.youtube.com/embed/Ejoct_6pQ74', // ✓ Periodic Videos
  Cs: 'https://www.youtube.com/embed/5aD6HwUE2c0', // ✓ Periodic Videos
  Ba: 'https://www.youtube.com/embed/9srJdQU3NOo', // ✓ Periodic Videos
  La: 'https://www.youtube.com/embed/Q21clW0s0B8', // ✓ Periodic Videos
  Ce: 'https://www.youtube.com/embed/frD3126ry8o', // ✓ Periodic Videos
  Pr: 'https://www.youtube.com/embed/IL06CzXF3ns', // ✓ Periodic Videos
  Nd: 'https://www.youtube.com/embed/PBbl-3_R3mk', // ✓ Periodic Videos
  Pm: 'https://www.youtube.com/embed/HplP_MY78NQ', // ✓ Periodic Videos
  Sm: 'https://www.youtube.com/embed/RBTO5f8U218', // ✓ Periodic Videos
  Eu: 'https://www.youtube.com/embed/88YOmg_FUVo', // ✓ Periodic Videos
  Gd: 'https://www.youtube.com/embed/uUo7pY38fGY', // ✓ Periodic Videos
  Tb: 'https://www.youtube.com/embed/On5LjH9TQxY', // ✓ Periodic Videos
  Dy: 'https://www.youtube.com/embed/8TE3iRXVcmY', // ✓ Periodic Videos
  Ho: 'https://www.youtube.com/embed/HQahtzCU0BU', // ✓ Periodic Videos
  Er: 'https://www.youtube.com/embed/E-DY_RT4fJ4', // ✓ Periodic Videos
  Tm: 'https://www.youtube.com/embed/vS0vhYdOGMc', // ✓ Periodic Videos
  Lu: 'https://www.youtube.com/embed/7wrDfRnRHqI', // ✓ Periodic Videos
  Hf: 'https://www.youtube.com/embed/Qb9f5uBKJhg', // ✓ Periodic Videos
  Ta: 'https://www.youtube.com/embed/51xFP1Yn3g0', // ✓ Periodic Videos
  W: 'https://www.youtube.com/embed/59ph6I0DoQE', // ✓ Periodic Videos
  Re: 'https://www.youtube.com/embed/YOmStzA2azw', // ✓ Periodic Videos
  Os: 'https://www.youtube.com/embed/AdX-T2Vv68Y', // ✓ Periodic Videos
  Ir: 'https://www.youtube.com/embed/cuovE4OQi2g', // ✓ Periodic Videos
  Au: 'https://www.youtube.com/embed/7dF0QTzcuac', // ✓ Periodic Videos
  Hg: 'https://www.youtube.com/embed/oL0M_6bfzkU', // ✓ Periodic Videos
  Tl: 'https://www.youtube.com/embed/4SVhSZ-rfLM', // ✓ Periodic Videos
  Pb: 'https://www.youtube.com/embed/2ERfPN5JLX8', // ✓ Periodic Videos
  Bi: 'https://www.youtube.com/embed/vyIo-c7VmIM', // ✓ Periodic Videos
  Po: 'https://www.youtube.com/embed/bbr5yWwsI1o', // ✓ Periodic Videos
  Rn: 'https://www.youtube.com/embed/mTuC_LrEfbU', // ✓ Periodic Videos
  Fr: 'https://www.youtube.com/embed/hpYxllgfMSg', // ✓ Periodic Videos
  Ra: 'https://www.youtube.com/embed/5_I6vj-lXNM', // ✓ Periodic Videos
  Th: 'https://www.youtube.com/embed/2yZGcr0mpw0', // ✓ Periodic Videos
  U: 'https://www.youtube.com/embed/B8vVZTvJNGk', // ✓ Periodic Videos
  Np: 'https://www.youtube.com/embed/1D75B0_URbE', // ✓ Periodic Videos
  Pu: 'https://www.youtube.com/embed/89UNPdNtOoE', // ✓ Periodic Videos
  Am: 'https://www.youtube.com/embed/CC-L-CITg3k', // ✓ Periodic Videos
  Cm: 'https://www.youtube.com/embed/sZobqPFNcwg', // ✓ Periodic Videos
  Bk: 'https://www.youtube.com/embed/7p1D9C1qkZY', // ✓ Periodic Videos
  Cf: 'https://www.youtube.com/embed/E0wtKOG8trE', // ✓ Periodic Videos
  Es: 'https://www.youtube.com/embed/UdJeLlwrVUI', // ✓ Periodic Videos
  Fm: 'https://www.youtube.com/embed/SQhI52sqanA', // ✓ Periodic Videos
  Yb: FALLBACK_VIDEO, // Video gốc không hoạt động
  Pt: FALLBACK_VIDEO, // Video gốc không hoạt động
  At: FALLBACK_VIDEO, // Video gốc không hoạt động
  Ac: FALLBACK_VIDEO, // Video gốc không hoạt động
  Pa: FALLBACK_VIDEO, // Video gốc không hoạt động
  Md: FALLBACK_VIDEO, // Video gốc không hoạt động
  No: FALLBACK_VIDEO, // Video gốc không hoạt động
  Lr: FALLBACK_VIDEO, // Video gốc không hoạt động
  Rf: FALLBACK_VIDEO, // Không có video riêng
  Db: FALLBACK_VIDEO, // Không có video riêng
  Sg: FALLBACK_VIDEO, // Không có video riêng
  Bh: FALLBACK_VIDEO, // Không có video riêng
  Hs: FALLBACK_VIDEO, // Không có video riêng
  Mt: FALLBACK_VIDEO, // Không có video riêng
  Ds: FALLBACK_VIDEO, // Không có video riêng
  Rg: FALLBACK_VIDEO, // Không có video riêng
  Cn: FALLBACK_VIDEO, // Không có video riêng
  Nh: FALLBACK_VIDEO, // Không có video riêng
  Fl: FALLBACK_VIDEO, // Không có video riêng
  Mc: FALLBACK_VIDEO, // Không có video riêng
  Lv: FALLBACK_VIDEO, // Không có video riêng
  Ts: FALLBACK_VIDEO, // Không có video riêng
  Og: FALLBACK_VIDEO, // Không có video riêng
};
