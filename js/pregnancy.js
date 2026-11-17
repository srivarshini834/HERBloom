// HerBloom: Pregnancy tracking and appointments
// ---------- pregnancy ----------
const TRI = [["First trimester (weeks 1-13)",["Take folic acid as your doctor advises","Small frequent meals for nausea","Avoid alcohol, smoking, raw papaya, unpasteurised dairy","Ask your doctor before any medicine"]],["Second trimester (weeks 14-27)",["Add iron, calcium and protein","Gentle walking and prenatal yoga","Sleep on your side","Anomaly scan is usually around weeks 18-22"]],["Third trimester (weeks 28-40)",["Count baby's movements daily","Pack your hospital bag","Learn the signs of labour","Checkups become more frequent"]]];
function vPreg(){
  const u = U(); let info = "";
  if(u.lmp){ const wk = Math.floor(diff(today, D(u.lmp))/7), due = add(D(u.lmp),280), t = TRI[wk < 14 ? 0 : wk < 28 ? 1 : 2];
    info = `<div class="card"><div class="stat"><b>Week ${wk}</b><span>Due about ${iso(due)} · ${diff(due,today)} days to go</span></div><h3 style="margin-top:12px">${t[0]}</h3>${li(t[1])}<p class="note">Seek urgent care for heavy bleeding, severe belly pain, severe headache with blurred vision, face or hand swelling, fever, fluid leaking, or reduced baby movement.</p></div>`; }
  const ap = [...u.appts].sort((a,b) => a.d.localeCompare(b.d)).map((a,i) => `<tr><td>${a.d}</td><td>${esc(a.t)}</td><td>${diff(D(a.d),today) < 0 ? "past" : "in " + diff(D(a.d),today) + " days"}</td><td><button class="chip" data-a="${i}">Remove</button></td></tr>`).join("");
  return `<h2>Pregnancy 🤰</h2><div class="card"><label for="lmp">First day of your last period</label><input id="lmp" type="date" value="${u.lmp}" max="${iso(today)}"><button class="btn" id="sl">Save</button> <button class="btn alt" id="cl">Clear</button></div>${info}
  <div class="card"><h3>Appointments</h3><div class="grid"><div><label for="ad">Date</label><input id="ad" type="date"></div><div><label for="at">What</label><input id="at" placeholder="Scan, test, vaccine"></div></div><button class="btn" id="aa">Add reminder</button>${ap ? `<table style="margin-top:12px">${ap}</table>` : ""}</div>
  <p class="note">General guidance only. Always follow your own doctor's advice.</p>`;
}
function bPreg(){
  $("#sl").onclick = () => { U().lmp = $("#lmp").value; persist(); render(); }; $("#cl").onclick = () => { U().lmp = ""; persist(); render(); };
  $("#aa").onclick = () => { if(!$("#ad").value || !$("#at").value) return alert("Add a date and a name."); U().appts.push({d:$("#ad").value, t:$("#at").value}); persist(); render(); };
  document.querySelectorAll("[data-a]").forEach(b => b.onclick = () => { U().appts.splice(+b.dataset.a,1); persist(); render(); });
}