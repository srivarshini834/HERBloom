// HerBloom: Landing (title) page, sign up and log in
// ---------- title and auth ----------
function viewTitle(){
  const G = [["girl","linear-gradient(180deg,#fde0ec,#fff)","Girls","Gentle first-period guidance, with no shame and no fear."],["woman","linear-gradient(180deg,#e6dcf7,#fff)","Women","Cycle tracking, insights and care that adapts to you."],["mom","linear-gradient(180deg,#fde3d6,#fff)","Mothers-to-be","Week-by-week pregnancy support and a hospital bag checklist."],["meno","linear-gradient(180deg,#f8ecc9,#fff)","Menopause and beyond","Symptom tracking and calm, clear guidance."]];
  return `<div class="landing"><div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div>
  <div class="lnav"><span class="logo" style="display:flex;align-items:center;gap:8px">${bloom(28)} HerBloom</span><button class="btn alt" id="lg" style="margin:0">Log in</button></div>
  <section class="hero2"><div style="display:flex;justify-content:center;gap:6px">${bloom(34)}${bloom(48)}${bloom(34)}</div><h1 class="wm">HerBloom</h1>
  <p class="tag">Blooming through every stage of her life.</p><button class="btn" id="start">Get started</button></section>
  <section class="garden">${G.map(g => `<div class="gcard"><div class="arch" style="background:${g[1]}">${fig(g[0])}</div><h3>${g[2]}</h3><p>${g[3]}</p></div>`).join("")}</section>
  <p class="foot">Private by design · Information only, not medical advice</p></div>`;
}
function viewAuth(){
  const su = authMode === "signup";
  return `<div class="auth"><div class="logo" style="text-align:center;margin-bottom:14px;font-size:1.6rem">🌸 HerBloom</div><div class="card"><h2>${su ? "Create your profile" : "Welcome back"} 🌷</h2>
  ${su ? `<label for="nm">Name</label><input id="nm" autocomplete="name">
  <div class="grid"><div><label for="ag">Age</label><input id="ag" type="number" min="10" max="100"></div>
  <div><label for="wt">Weight (kg)</label><input id="wt" type="number" min="20" max="250"></div></div>
  <label for="bl">Blood type (optional)</label><select id="bl"><option value="">Prefer not to say</option>${["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(b => `<option>${b}</option>`).join("")}</select>` : ""}
  <label for="em">Email</label><input id="em" type="email" autocomplete="email">
  <label for="pw">Password</label><input id="pw" type="password" autocomplete="${su ? "new-password" : "current-password"}">
  <div id="err" class="note" style="display:none"></div>
  <button class="btn" id="go">${su ? "Sign up" : "Log in"}</button>
  <button class="btn alt" id="sw" style="margin-left:8px">${su ? "I have an account" : "Create account"}</button>
  <p class="note">Demo app: accounts are stored only in this browser. Don't reuse a real password.</p></div></div>`;
}
function bindAuth(){
  $("#sw").onclick = () => { authMode = authMode === "signup" ? "login" : "signup"; render(); };
  $("#go").onclick = () => {
    const em = $("#em").value.trim().toLowerCase(), pw = $("#pw").value;
    const fail = m => { $("#err").style.display = "block"; $("#err").textContent = m; };
    if(!/^\S+@\S+\.\S+$/.test(em)) return fail("Enter a valid email.");
    if(pw.length < 6) return fail("Password needs at least 6 characters.");
    if(authMode === "signup"){
      const nm = $("#nm").value.trim(), ag = +$("#ag").value, wt = +$("#wt").value;
      if(!nm) return fail("Please enter your name.");
      if(!(ag >= 10 && ag <= 100)) return fail("Enter an age between 10 and 100.");
      if(!(wt >= 20 && wt <= 250)) return fail("Enter a weight between 20 and 250 kg.");
      if(DB.users[em]) return fail("That email already has an account. Log in instead.");
      DB.users[em] = {name:nm, age:ag, weight:wt, blood:$("#bl").value, pw:hash(pw), periods:[], appts:[], lmp:"", msyms:[]};
    } else if(!DB.users[em] || DB.users[em].pw !== hash(pw)) return fail("Email or password is incorrect.");
    DB.session = em; persist(); screen = "app"; pg = "dash"; render();
  };
}