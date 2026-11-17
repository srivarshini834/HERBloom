// HerBloom: Faceless SVG illustrations and flower drawings
// ---------- illustrations (faceless, drawn in SVG) ----------
function fl(x,y,r,c,m){ m = m || "#f7d774"; return `<g transform="translate(${x} ${y})">${[0,72,144,216,288].map(a => `<ellipse cx="0" cy="${-r*.62}" rx="${r*.4}" ry="${r*.62}" fill="${c}" transform="rotate(${a})"/>`).join("")}<circle r="${r*.28}" fill="${m}"/></g>`; }
function stem(x,h,c,r){ const y = 218 - h/2; return `<path d="M${x} 218 Q${x-4} ${y} ${x} ${218-h}" stroke="#5a9a78" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="${x+8}" cy="${y}" rx="8" ry="3.5" fill="#6fae8a" transform="rotate(-30 ${x+8} ${y})"/>${fl(x,218-h,r,c)}`; }
const bloom = n => `<svg width="${n}" height="${n}" viewBox="-20 -20 40 40" aria-hidden="true">${[0,72,144,216,288].map(a => `<ellipse cx="0" cy="-9" rx="6.5" ry="10" fill="#d9648f" transform="rotate(${a})"/>`).join("")}<circle r="5" fill="#f7c873"/></svg>`;
function fig(k){
  const T = {girl:{s:"#e8b796",h:"#3b2a2a",d:"#f08fb3",f:["#f08fb3","#ffffff","#c9a6f0"]}, woman:{s:"#c98e6a",h:"#2b1d1d",d:"#8b6bbd",f:["#f6a5c0","#ffffff","#f7c873"]}, mom:{s:"#dca181",h:"#3a2420",d:"#ef9a7f",f:["#b79df0","#f6a5c0","#ffffff"]}, meno:{s:"#d9a07e",h:"#cfc9da",d:"#b0306b",f:["#f7c873","#f6a5c0","#c9a6f0"]}}[k];
  const {s,h,d} = T, legs = y => `<rect x="52" y="${y}" width="7" height="${191-y}" rx="3" fill="${s}"/><rect x="63" y="${y}" width="7" height="${191-y}" rx="3" fill="${s}"/>`;
  const arm = (x1,y1,x2,y2,w) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${s}" stroke-width="${w}" stroke-linecap="round"/>`;
  const B = {
   girl:`<circle cx="44" cy="97" r="6" fill="${h}"/><circle cx="76" cy="97" r="6" fill="${h}"/><circle cx="46" cy="92" r="2.5" fill="#fff"/><circle cx="74" cy="92" r="2.5" fill="#fff"/>
    ${legs(156)}<rect x="57" y="101" width="6" height="8" fill="${s}"/>${arm(50,110,41,136,5)}${arm(70,110,79,136,5)}
    <path d="M49 106 Q60 111 71 106 L74 130 L85 158 Q60 164 35 158 L46 130 Z" fill="${d}"/><circle cx="60" cy="90" r="13" fill="${s}"/><path d="M47 89 Q48 74 60 74 Q72 74 73 89 Q66 80 47 89Z" fill="${h}"/>`,
   woman:`<path d="M44 40 Q44 18 60 18 Q76 18 76 40 L80 84 Q60 90 40 84 Z" fill="${h}"/>${legs(170)}<rect x="55" y="52" width="10" height="16" fill="${s}"/>
    ${arm(46,70,37,114,7)}${arm(74,70,83,114,7)}<path d="M46 66 Q60 73 74 66 L78 100 L89 174 Q60 182 31 174 L42 100 Z" fill="${d}"/><path d="M43 100 Q60 107 77 100" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none"/>
    <circle cx="60" cy="40" r="14" fill="${s}"/><path d="M46 38 Q48 22 60 22 Q72 22 74 38 Q66 28 46 38Z" fill="${h}"/>`,
   mom:`<path d="M44 40 Q44 18 60 18 Q76 18 76 40 Q81 68 74 88 Q60 94 46 88 Q39 68 44 40Z" fill="${h}"/>${legs(170)}<rect x="55" y="52" width="10" height="16" fill="${s}"/>
    <path d="M46 66 Q60 73 74 66 L76 92 Q96 120 85 152 L91 174 Q60 182 29 174 L35 152 Q24 120 44 92 Z" fill="${d}"/><ellipse cx="60" cy="127" rx="22" ry="24" fill="#fff" fill-opacity=".18"/>
    <path d="M60 136 C51 127 53 120 60 125 C67 120 69 127 60 136Z" fill="#fff" fill-opacity=".8"/>
    <path d="M46 70 Q28 100 49 128" stroke="${s}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M74 70 Q92 100 71 128" stroke="${s}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <circle cx="60" cy="40" r="14" fill="${s}"/><path d="M46 38 Q48 22 60 22 Q72 22 74 38 Q66 28 46 38Z" fill="${h}"/>`,
   meno:`<circle cx="60" cy="15" r="9" fill="${h}"/>${fl(68,12,5,"#f6a5c0")}<path d="M44 42 Q44 22 60 22 Q76 22 76 42 L75 62 Q60 66 45 62Z" fill="${h}"/>${legs(172)}<rect x="55" y="52" width="10" height="16" fill="${s}"/>
    ${arm(46,70,37,116,7)}${arm(74,70,83,116,7)}<path d="M45 66 Q60 73 75 66 L79 102 L90 176 Q60 184 30 176 L41 102 Z" fill="${d}"/>
    <path d="M44 66 Q62 76 80 64 L88 122 Q70 104 56 104 Z" fill="#e9c46a"/><path d="M52 90 Q70 96 84 110" stroke="#fff" stroke-opacity=".5" stroke-width="2" fill="none"/>
    <circle cx="60" cy="42" r="14" fill="${s}"/><path d="M46 40 Q48 26 60 26 Q72 26 74 40 Q64 32 46 40Z" fill="${h}"/>`
  }[k];
  return `<svg viewBox="0 0 160 220" role="img" aria-label="Illustration of a ${k==="mom"?"pregnant woman":k==="meno"?"woman in her fifties":k==="girl"?"young girl":"woman"}"><ellipse cx="80" cy="201" rx="36" ry="4" fill="#000" opacity=".08"/>${stem(22,52,T.f[0],11)}${stem(40,30,T.f[1],8)}${stem(138,56,T.f[2],12)}${stem(121,28,T.f[0],8)}<g transform="translate(20 10)">${B}</g></svg>`;
}