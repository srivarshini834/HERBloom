// HerBloom: Menopause information and symptom tracker
// ---------- menopause ----------
const MS = ["Hot flashes","Night sweats","Poor sleep","Mood changes","Vaginal dryness","Brain fog","Joint aches","Palpitations"];
function vMeno(){
  const u = U(), cnt = {}; u.msyms.forEach(x => cnt[x.s] = (cnt[x.s]||0) + 1);
  const top = Object.entries(cnt).sort((a,b) => b[1]-a[1]), mx = top.length ? top[0][1] : 1;
  return `<h2>Menopause 🍂</h2>
  <div class="card"><h3>The three stages</h3>${li(["Perimenopause: hormones start to fluctuate, often in the 40s. Periods become irregular.","Menopause: confirmed after 12 months without a period. The average age is around 45-55.","Postmenopause: the years after. Bone and heart health matter more."])}</div>
  <div class="card"><h3>Track your symptoms</h3><div class="grid"><div><label for="ms">Symptom</label><select id="ms">${MS.map(s => `<option>${s}</option>`).join("")}</select></div>
  <div><label for="sv">Severity</label><select id="sv"><option>mild</option><option>moderate</option><option>severe</option></select></div></div><button class="btn" id="ma">Log today</button>
  ${top.length ? `<h3 style="margin-top:16px">Your pattern</h3>${top.map(x => `<div style="display:flex;gap:8px;align-items:center;margin:4px 0"><span style="width:130px">${x[0]}</span><div style="background:var(--rose);height:12px;border-radius:6px;width:${x[1]/mx*60}%"></div> ${x[1]}</div>`).join("")}` : ""}</div>
  <div class="card"><h3>Feeling better day to day</h3>${li(["Calcium and vitamin D: dairy, ragi, sesame, sunlight","Weight-bearing exercise and strength work to protect bones","Soy, flaxseed and pulses may ease hot flashes for some women","Layers, cool bedrooms and less caffeine or spice at night","Yoga, breathing exercises and consistent sleep for mood"])}</div>
  <div class="card"><h3>See a doctor if</h3>${li(["Any bleeding after 12 months without a period","Very heavy or prolonged bleeding in perimenopause","Symptoms disrupt work, sleep or relationships","Low mood that does not lift","You want to discuss hormone therapy, bone density or heart checks"])}</div>
  <p class="note">Information only. Hormone therapy and medicines should be decided with your doctor.</p>`;
}
function bMeno(){ $("#ma").onclick = () => { U().msyms.push({s:$("#ms").value, v:$("#sv").value, d:iso(today)}); persist(); render(); }; }