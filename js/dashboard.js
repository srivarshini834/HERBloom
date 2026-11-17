// HerBloom: Dashboard and insights
// ---------- dashboard / insights ----------
function vDash(){
  const u = U(), st = stats(), ms = u.msyms;
  let h = `<h2>Good to see you, ${esc(u.name.split(" ")[0])} 🌷</h2><p style="color:var(--mute);margin-top:0">Here are your insights for today.</p>`;
  if(st){
    const P = PH[st.phase], pains = st.p.map(x => +x.pain), ap = (pains.reduce((a,b)=>a+b,0)/pains.length).toFixed(1);
    const reg = st.gaps.length < 2 ? "Need more data" : st.sd <= 3 ? "Regular" : st.sd <= 7 ? "Slightly varied" : "Irregular";
    h += `<div class="card hero-card"><div class="hrow">${ringSVG(st.day,st.avg,"of "+st.avg+" days")}<div><h3>${P.e} ${st.phase[0].toUpperCase()+st.phase.slice(1)} phase</h3><p style="margin:0;color:var(--mute);max-width:420px">${P.about}</p></div></div>
    <div class="grid"><div class="stat"><b>${iso(st.next).slice(5)}</b><span>Next period (in ${diff(st.next,today)} days)</span></div>
    <div class="stat"><b>${iso(st.ov).slice(5)}</b><span>Estimated ovulation</span></div>
    <div class="stat"><b>${st.avg} d</b><span>Average cycle</span></div>
    
    <div class="stat"><b>${ap}/10</b><span>Average pain</span></div></div>
    ${st.flags.length ? `<p class="note">Worth a chat with a doctor: ${esc(st.flags.join(", "))}.</p>` : ""}</div>`;
    if(st.gaps.length){ const g = st.gaps.slice(-6), mx = Math.max(...g, 40);
      h += `<div class="card"><h3>Your recent cycle lengths</h3><div class="bars">${g.map(x => `<div style="height:${x/mx*100}%"><i>${x}</i></div>`).join("")}</div></div>`; }
    h += `<div class="card"><h3>Today's care</h3><b>Eat</b>${li(P.food)}<b>Move</b>${li(P.move)}</div>`;
  } else h += `<div class="card"><h3>Start with your last period</h3><p>Open the Period tracker and log a start date. Insights appear after that and sharpen with every cycle.</p></div>`;
  if(u.age >= 40) h += `<div class="card"><h3>🍂 Menopause insights</h3><p>${ms.length ? `You have logged ${ms.length} symptom entries.` : "At your age, perimenopause can begin. The Menopause page has a symptom tracker and guidance."}</p></div>`;
  return h;
}