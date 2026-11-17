// HerBloom: Date helpers, cycle prediction, phase logic and phase tips
// ---------- dates and cycle logic ----------
const D = s => new Date(s + "T00:00:00"), iso = d => d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
const add = (d,n) => { const x = new Date(d); x.setDate(x.getDate()+n); return x; };
const diff = (a,b) => Math.round((a-b)/864e5);
const today = D(iso(new Date()));
function stats(){
  const p = [...U().periods].sort((a,b) => a.start.localeCompare(b.start));
  if(!p.length) return null;
  const gaps = []; for(let i=1;i<p.length;i++) gaps.push(diff(D(p[i].start), D(p[i-1].start)));
  const r = gaps.slice(-6), avg = r.length ? Math.round(r.reduce((a,b)=>a+b,0)/r.length) : 28;
  const sd = r.length > 1 ? Math.sqrt(r.reduce((a,b)=>a+(b-avg)**2,0)/r.length) : 0;
  const last = D(p[p.length-1].start);
  let next = add(last, avg); while(next < today) next = add(next, avg);
  const day = diff(today, last) % avg + 1, ovDay = avg - 13;
  const flags = [];
  if(avg < 21) flags.push("cycles shorter than 21 days"); if(avg > 35) flags.push("cycles longer than 35 days");
  if(sd > 7) flags.push("cycle length varies a lot"); if(diff(today,last) > avg + 7) flags.push("period more than a week late");
  return {p, gaps, avg, sd, last, next, ov:add(next,-14), day, ovDay, flags, flow:p[p.length-1].flow, phase:phaseAt(day, ovDay)};
}
function phaseAt(day, ovDay){ return day <= 5 ? "menstrual" : day < ovDay-1 ? "follicular" : day <= ovDay+1 ? "ovulation" : "luteal"; }
function calPhase(d, st){
  const n = diff(d, st.last); if(n < 0) return null;
  const day = n % st.avg + 1;
  if(day <= 5) return "var(--rose)"; if(day >= st.ovDay-5 && day < st.ovDay-1) return "#e7c58a";
  if(day >= st.ovDay-1 && day <= st.ovDay+1) return "#9b7cc8"; return null;
}
const PH = {
  menstrual:{e:"🌑", about:"Hormones are at their lowest and the uterine lining is shedding.", food:["Iron-rich foods: spinach, lentils, dates, jaggery","Warm fluids and water","Magnesium: nuts, seeds, bananas"], move:["Gentle yoga and stretching","Rest when you need it"]},
  follicular:{e:"🌱", about:"Estrogen rises and energy usually builds.", food:["Fresh vegetables, fruit, protein","Curd and fermented foods"], move:["Cardio, cycling, dance","Try a new workout"]},
  ovulation:{e:"🌕", about:"An egg is released. This is your most fertile time.", food:["Leafy greens, fibre, hydration","Light balanced meals"], move:["Strength training","High-energy sessions"]},
  luteal:{e:"🍂", about:"Progesterone rises. Bloating, tiredness and mood changes are common.", food:["Complex carbs: oats, brown rice, sweet potato","Less salt and caffeine","Calcium-rich foods"], move:["Pilates, swimming, steady walks","Good sleep and wind-down time"]}
};

function ringSVG(day, total, label){
  const c = 2*Math.PI*54, off = c*(1 - Math.min(day/total,1));
  return `<svg class="ring" viewBox="0 0 120 120" role="img" aria-label="Day ${day} of ${total}"><defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a8346c"/><stop offset="1" stop-color="#6f4e9c"/></linearGradient></defs><circle cx="60" cy="60" r="54" fill="none" stroke="#f1e2eb" stroke-width="10"/><circle cx="60" cy="60" r="54" fill="none" stroke="url(#rg)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 60 60)"/><text x="60" y="60" text-anchor="middle" font-size="28" font-weight="700" fill="#3d1a3a" font-family="Outfit,sans-serif">${day}</text><text x="60" y="78" text-anchor="middle" font-size="9" fill="#6f5f6e" font-family="Roboto,sans-serif">${label}</text></svg>`;
}