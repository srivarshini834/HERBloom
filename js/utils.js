// HerBloom: Shared helpers, storage (localStorage) and global UI state
const $ = s => document.querySelector(s);
const esc = t => String(t ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const li = a => "<ul>" + a.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul>";
let DB = {users:{}, session:null};
try { DB = Object.assign(DB, JSON.parse(localStorage.getItem("cc2") || "{}")); } catch(e){}
const persist = () => { try { localStorage.setItem("cc2", JSON.stringify(DB)); } catch(e){} };
const hash = s => { let h = 5381; for(const c of s) h = (h * 33) ^ c.charCodeAt(0); return String(h >>> 0); };

// Each account can track several people. Data is saved as u.people = [{id, name, periods}].
// u.periods stays available everywhere else in the app: it always points to the ACTIVE person's list.
function ensurePeople(u){
  if(!Array.isArray(u.people) || !u.people.length){
    u.people = [{id:"p1", name:"Me", periods: Array.isArray(u.periods) ? u.periods : []}];
    u.activeId = "p1";
  }
  if(!u.people.some(p => p.id === u.activeId)) u.activeId = u.people[0].id;
  const d = Object.getOwnPropertyDescriptor(u, "periods");
  if(!d || !d.get){
    delete u.periods;
    Object.defineProperty(u, "periods", {
      configurable:true, enumerable:false,
      get(){ return (u.people.find(p => p.id === u.activeId) || u.people[0]).periods; },
      set(v){ (u.people.find(p => p.id === u.activeId) || u.people[0]).periods = v; }
    });
  }
}
const U = () => { const u = DB.users[DB.session]; if(u) ensurePeople(u); return u; };
let screen = DB.session ? "app" : "title", pg = "dash", authMode = "signup", sub = "log";