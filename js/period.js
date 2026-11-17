// HerBloom: Period tracker, product advisor and symptom checker
// ---------- period tracker ----------
function vPeriod(){
  const u = U(), st = stats();
  const tabs = [["log","Log & calendar"],["prod","Product advisor"],["sym","Symptom check"]];
  let h = `<h2>Period tracker 🌸</h2><div class="tabs">${tabs.map(t => `<button class="chip ${sub===t[0]?"on":""}" data-s="${t[0]}" style="${sub===t[0]?"background:var(--rose);color:#fff":""}">${t[1]}</button>`).join("")}</div>`;
  if(sub === "log"){
    const who = `<div class="card"><label for="who">Tracking for</label><select id="who">${u.people.map(p => `<option value="${esc(p.id)}" ${p.id===u.activeId?"selected":""}>${esc(p.name)}</option>`).join("")}</select><div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap"><button class="chip" id="addp">+ Add person</button>${u.people.length > 1 ? `<button class="chip" id="delp">Remove this person</button>` : ""}</div></div>`;
    let cal = "";
    if(st){ cal = "<div class='card'><h3>This month at a glance</h3><div class='cal'>" + "SMTWTFS".split("").map(x => `<b>${x}</b>`).join("");
      const f = add(today, -today.getDay());
      for(let i=0;i<35;i++){ const d = add(f,i), c = calPhase(d,st); cal += `<div class="${diff(d,today)===0?"t":""}" style="${c?`background:${c};color:#fff`:""}">${d.getDate()}</div>`; }
      cal += "</div><p class='note'>Rose = period · gold = fertile window · purple = ovulation</p></div>"; }
    const rows = [...u.periods].sort((a,b) => b.start.localeCompare(a.start)).map(p => `<tr><td>${p.start}</td><td>${p.flow}</td><td>${p.pain}</td><td>${esc(p.mood)}</td><td><button class="chip" data-del="${p.start}" aria-label="Delete entry">Delete</button></td></tr>`).join("");
    h += who + cal + `<div class="card"><h3>Log a period</h3><div class="grid"><div><label for="ps">Start date</label><input id="ps" type="date" max="${iso(today)}"></div>
    <div><label for="pf">Flow</label><select id="pf"><option>light</option><option selected>medium</option><option>heavy</option></select></div>
    <div><label for="pp">Pain (0-10)</label><input id="pp" type="number" min="0" max="10" value="2"></div>
    <div><label for="pm">Notes</label><input id="pm" placeholder="mood, symptoms"></div></div><button class="btn" id="add">Save</button></div>
    <div class="card"><h3>History</h3>${rows ? `<table><tr><th>Start</th><th>Flow</th><th>Pain</th><th>Notes</th><th></th></tr>${rows}</table>` : "<p>No periods logged yet.</p>"}</div>`;
  } else if(sub === "prod"){
    const S = (id,l,o) => `<div><label for="${id}">${l}</label><select id="${id}">${o.map(x => `<option value="${x[0]}">${x[1]}</option>`).join("")}</select></div>`;
    h += `<div class="card"><h3>Find your best fit</h3><div class="grid">${S("pf2","Flow",[[1,"Light"],[2,"Medium"],[3,"Heavy"]])}${S("pl","Lifestyle",[["none","Everyday"],["active","Active"],["travel","Travel"],["night","Night use"]])}${S("pb","Priority",[["none","None"],["budget","Budget"],["eco","Eco-friendly"],["sensitive","Sensitive skin"]])}${S("pt","Experience",[["first","First period"],["exp","Used before"]])}</div><button class="btn" id="rec">Recommend</button></div><div id="res"></div>`;
  } else {
    h += `<div class="card"><h3>What are you feeling?</h3>${Object.keys(SYM).map(s => `<label style="display:flex;gap:8px;align-items:center;color:var(--ink)"><input type="checkbox" style="width:auto" value="${esc(s)}">${esc(s)}</label>`).join("")}<button class="btn" id="chk">Check</button></div><div id="res"></div>`;
  }
  return h + `<p class="note">Information only, not a diagnosis. See a doctor for severe or unusual symptoms.</p>`;
}
const PRODS = [{n:"Regular pads",f:[1,2],c:"Low",h:"4-6",t:["first","budget","sensitive"]},{n:"Overnight or XL pads",f:[3],c:"Low",h:"6-8",t:["night"]},{n:"Organic cotton pads",f:[1,2,3],c:"Medium",h:"4-6",t:["sensitive"]},{n:"Tampons",f:[1,2],c:"Medium",h:"4-8",t:["active","travel"]},{n:"Menstrual cup",f:[2,3],c:"Cheapest long term",h:"up to 12",t:["active","travel","budget","eco","night"]},{n:"Period underwear",f:[1,2],c:"Higher upfront",h:"8-12",t:["eco","sensitive","night"]}];
const SYM = {"Mild cramps":1,"Headache":1,"Fatigue":1,"Bloating":1,"Nausea":2,"Cramps that stop daily activity":2,"Dizziness":2,"Soaking a pad every hour for 2+ hours":3,"Fainting":3,"Fever with tampon use":3,"Severe one-sided pelvic pain":3,"Bleeding while pregnant":3};
function bPeriod(){
  document.querySelectorAll("[data-s]").forEach(b => b.onclick = () => { sub = b.dataset.s; render(); });

  // ----- switch / add / remove a person -----
  if($("#who")) $("#who").onchange = e => { U().activeId = e.target.value; persist(); render(); };
  if($("#addp")) $("#addp").onclick = () => {
    const name = (prompt("Name of the person (for example: Mom, Sister, Priya):") || "").trim().slice(0, 30);
    if(!name) return;
    const u = U(), id = "p" + Date.now();
    u.people.push({id, name, periods:[]}); u.activeId = id; persist(); render();
  };
  if($("#delp")) $("#delp").onclick = () => {
    const u = U(), cur = u.people.find(p => p.id === u.activeId);
    if(!confirm("Remove " + cur.name + " and all their saved periods?")) return;
    u.people = u.people.filter(p => p.id !== cur.id); u.activeId = u.people[0].id; persist(); render();
  };

  if($("#add")) $("#add").onclick = () => {
    const s = $("#ps").value; if(!s) return alert("Pick a start date.");
    const u = U();
    // two start dates very close together usually mean another person's data was added to this one
    const near = u.periods.find(p => p.start !== s && Math.abs(diff(D(p.start), D(s))) < 15);
    if(near && !confirm("This date is only " + Math.abs(diff(D(near.start), D(s))) + " days from another entry (" + near.start + "). Cycles are usually 21-35 days.\n\nIf this is for another person, press Cancel and use \"+ Add person\" instead.\n\nSave anyway?")) return;
    u.periods = u.periods.filter(p => p.start !== s); u.periods.push({start:s, flow:$("#pf").value, pain:$("#pp").value, mood:$("#pm").value}); persist(); render();
  };
  document.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { U().periods = U().periods.filter(p => p.start !== b.dataset.del); persist(); render(); });
  if($("#rec")) $("#rec").onclick = () => {
    const f = +$("#pf2").value, l = $("#pl").value, b = $("#pb").value, t = $("#pt").value;
    const o = PRODS.map(p => { let s = p.f.includes(f) ? 3 : 0; if(p.t.includes(l)) s += 2; if(p.t.includes(b)) s += 2; if(t==="first"){ if(p.t.includes("first")) s += 3; else if(p.n==="Tampons"||p.n==="Menstrual cup") s -= 2; } return {...p,s}; }).sort((a,b) => b.s - a.s);
    $("#res").innerHTML = `<div class="card"><h3>Top pick: ${esc(o[0].n)} ✨</h3><table><tr><th>Option</th><th>Cost</th><th>Hours</th><th>Match</th></tr>${o.map(p => `<tr><td>${esc(p.n)}</td><td>${esc(p.c)}</td><td>${p.h}</td><td>${p.s}</td></tr>`).join("")}</table></div>`; };
  if($("#chk")) $("#chk").onclick = () => {
    const s = [...document.querySelectorAll("input:checked")].map(i => SYM[i.value]); if(!s.length) return;
    const L = Math.max(...s), T = [["Low","var(--sage)","Common and usually manageable at home."],["Moderate","var(--gold)","Monitor it. See a doctor if it persists or worsens."],["See a doctor now","var(--rose)","These can be serious. Contact a doctor or emergency service."]][L-1];
    $("#res").innerHTML = `<div class="card"><span class="pill" style="background:${T[1]}">${T[0]}</span><p>${T[2]}</p>${L<3 ? "<b>Comfort ideas</b>" + li(["Heat pad on the lower belly","Water and light meals","Gentle stretching or a walk","Rest","Ask a pharmacist or doctor before any medicine"]) : ""}</div>`; };
}