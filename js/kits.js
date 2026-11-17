// HerBloom: Checklists: first period care, pregnancy kit, menopause kit
// ---------- kits and care guides ----------
function kitCard(title, sections){
  const u = U(); u.kits = u.kits || {};
  const all = sections.flatMap(x => x[1]), done = all.filter(i => u.kits[i]).length;
  return `<div class="card"><h3>${title}</h3><div class="prog"><div style="width:${done/all.length*100}%"></div></div><p style="color:var(--mute);margin:6px 0 12px">${done} of ${all.length} ready</p>
  <div class="kg">${sections.map(x => `<div><b>${x[0]}</b>${x[1].map(i => `<label class="ck"><input type="checkbox" data-k="${esc(i)}" ${u.kits[i] ? "checked" : ""}> ${esc(i)}</label>`).join("")}</div>`).join("")}</div></div>`;
}
function bKit(){
  document.querySelectorAll("[data-k]").forEach(c => c.onchange = () => { U().kits[c.dataset.k] = c.checked; persist(); const y = scrollY; render(); scrollTo(0, y); });
}
function vFirst(){
  return `<h2>First period care 🎀</h2>
  <div class="card hero-card"><h3>It is completely normal 💛</h3><p style="margin:0">A first period (menarche) usually arrives between ages 9 and 15, often about two years after breast development begins. It is a healthy sign of growing up. It is natural, never impure or shameful, and you can carry on with school, bathing, washing your hair, sports and daily life.</p></div>
  <div class="grid" style="margin-bottom:18px"><div class="stat"><b>9 to 15</b><span>Usual age</span></div><div class="stat"><b>3 to 7 days</b><span>Typical length</span></div><div class="stat"><b>21 to 45</b><span>Teen cycle in days</span></div><div class="stat"><b>2 to 6 tbsp</b><span>Typical total flow</span></div></div>
  <div class="card"><h3>What to expect</h3>${li(["Blood can look pink, red or brown, and the first one is often light","Cramps, tiredness, mood swings, breast tenderness and pimples are common","Cycles stay irregular for the first 1 to 2 years","A little white discharge in the months before is normal"])}</div>
  <div class="card"><h3>How to use a pad</h3>${li(["Wash your hands","Unwrap the pad and peel the paper off the sticky strip","Stick it to the centre of your underwear and fold the wings around the sides","Change every 4 to 6 hours, or sooner if it feels full","Wrap the used pad in paper and put it in a bin. Never flush it","Wash your hands again"])}</div>
  ${kitCard("My first period kit", [["In your school bag",["2 regular pads","1 overnight pad","Spare underwear","Small pouch to carry it all","Tissues or wet wipes","Paper or bags for disposal"]],["At home",["Hot water bottle or heat pad","Dark, comfortable bottoms","Water bottle","Period tracker (this app!)"]]])}
  <div class="card"><h3>Talk to a trusted adult or doctor if</h3>${li(["No period by age 15, or 3 years after breast development began","Pain is severe or stops you from your day","You soak a pad every hour for several hours","Periods that were regular suddenly stop","You feel worried or confused. Asking is always okay"])}</div>
  <p class="note">General information only. A parent, school nurse or doctor can answer your personal questions.</p>`;
}
function vPKit(){
  const u = U(), wk = u.lmp ? Math.floor(diff(today, D(u.lmp))/7) : null;
  const when = wk === null ? "Add your last period date in the Pregnancy page and I will tell you when to pack." : wk < 32 ? `You are in week ${wk}. Start packing around week 32.` : wk < 37 ? `You are in week ${wk}. It is time to finish packing.` : `You are in week ${wk}. Keep your bag by the door.`;
  return `<h2>Pregnancy kit 🎒</h2><div class="card hero-card"><h3>Your hospital bag</h3><p style="margin:0">Aim to have it packed by week 36, since babies can arrive early. ${when}</p></div>
  ${kitCard("Hospital bag checklist", [
   ["Documents",["ID and insurance papers","Antenatal file and scan reports","Blood group and test reports","Doctor and hospital contact numbers"]],
   ["For mom",["Front-open nightgowns","Nursing bras","Maternity pads","Disposable underwear","Slippers and warm socks","Toiletries and lip balm","Hair ties","Phone and charger","Snacks and water bottle","Loose going-home outfit"]],
   ["For baby",["3 or 4 soft cotton onesies","Caps, mittens and socks","Swaddle wraps","Newborn diapers and wipes","Soft blanket","Going-home outfit","Car seat if you travel by car"]],
   ["For your partner",["Change of clothes","Snacks and cash","Charger"]]])}
  ${kitCard("At-home essentials", [["Comfort",["Pregnancy pillow","Comfortable supportive footwear","Stretch-mark moisturiser","Loose cotton clothes"]],["Health",["Prenatal vitamins as your doctor advises","Healthy snacks: nuts, fruit","Water bottle"]]])}
  <div class="card"><h3>Signs it may be time to go</h3>${li(["Contractions about 5 minutes apart, lasting about a minute, for an hour","Your water breaks","Bleeding","Baby is moving much less","Severe pain or a severe headache with blurred vision"])}<p class="note">If in doubt, call your doctor or hospital. Never wait.</p></div>`;
}
function vMKit(){
  return `<h2>Menopause kit 🧺</h2><div class="card hero-card"><h3>Everyday essentials</h3><p style="margin:0">Small comforts make a big difference with hot flashes, sleep trouble and dryness. Pick what suits you.</p></div>
  ${kitCard("My menopause essentials", [
   ["Cooling and sleep",["Light cotton clothes in layers","Cotton or bamboo bed sheets","Bedside fan or cooling pillow","Handheld portable fan","Water bottle"]],
   ["Comfort",["Water-based vaginal moisturiser or lubricant (ask your doctor)","Mild unscented wash","Breathable cotton underwear","Spare pad or liner for irregular periods"]],
   ["Mind and mood",["Symptom journal or this app","Caffeine-free herbal tea","Meditation or breathing app","Book or hobby for wind-down time"]],
   ["Bones and body",["Calcium-rich foods: dairy, ragi, sesame","Vitamin D from sunlight or as advised","Resistance bands or light weights","Comfortable walking shoes"]]])}
  <div class="card"><h3>Health checks to discuss with your doctor</h3>${li(["Blood pressure, blood sugar and cholesterol","Thyroid test","Bone density scan (DEXA)","Mammogram and cervical screening on schedule","Whether hormone therapy suits you"])}</div>
  <p class="note">Information only. Supplements and hormone therapy should be decided with your doctor.</p>`;
}