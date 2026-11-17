// HerBloom: Profile and About page
// ---------- profile and about ----------
function vMe(){
  const u = U();
  return `<h2>Profile 👤</h2><div class="card"><div class="grid"><div><label for="pn">Name</label><input id="pn" value="${esc(u.name)}"></div><div><label for="pa">Age</label><input id="pa" type="number" value="${u.age}"></div>
  <div><label for="pw2">Weight (kg)</label><input id="pw2" type="number" value="${u.weight}"></div><div><label for="pb2">Blood type</label><select id="pb2"><option value="">Not shared</option>${["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(b => `<option ${u.blood===b?"selected":""}>${b}</option>`).join("")}</select></div></div>
  <p style="color:var(--mute)">${esc(DB.session)}</p><button class="btn" id="sv2">Save changes</button> <button class="btn alt" id="del">Delete my account</button></div>
  <div class="card"><h2>About HerBloom 🌸</h2><p>HerBloom is a companion for every stage of a woman's reproductive life. It predicts cycles, adapts food and movement tips to your phase, supports pregnancy tracking, and offers guidance through menopause.</p>
  <h3>Our approach</h3>${li(["Privacy first: your data stays in this browser and you can delete it any time","Inclusive, judgement-free language","General guidance based on public WHO, ACOG and Indian health ministry material, not a substitute for a doctor"])}
  <h3>🌸🌸🌸🌸</h3><p>Bloom at your own pace. 🌸.</p></div>`;
}
function bMe(){
  $("#sv2").onclick = () => { const u = U(); u.name = $("#pn").value.trim() || u.name; u.age = +$("#pa").value || u.age; u.weight = +$("#pw2").value || u.weight; u.blood = $("#pb2").value; persist(); alert("Saved."); render(); };
  $("#del").onclick = () => { if(confirm("Delete your account and all data? This can't be undone.")){ delete DB.users[DB.session]; DB.session = null; persist(); screen = "title"; render(); } };
}