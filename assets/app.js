export function qs(k){ return new URLSearchParams(location.search).get(k); }
export function esc(s){ return String(s??"").replace(/[&<>"']/g,m=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m])); }
export function uuid(prefix="id"){ return `${prefix}-${Math.random().toString(16).slice(2)}-${Date.now()}`; }

export async function loadData(){
  const local = localStorage.getItem("EBOOK_DATA");
  if(local) return JSON.parse(local);
  const res = await fetch("./data/data.json", { cache: "no-store" });
  if(!res.ok) throw new Error("فشل تحميل data/data.json");
  return await res.json();
}
export function saveData(data){
  localStorage.setItem("EBOOK_DATA", JSON.stringify(data));
}
export function resetLocal(){
  localStorage.removeItem("EBOOK_DATA");
}

export function downloadJson(filename, obj){
  const blob = new Blob([JSON.stringify(obj,null,2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function fileToDataUrl(file){
  return new Promise((resolve,reject)=>{
    const r = new FileReader();
    r.onload = ()=> resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

// محرر سريع (execCommand) — عملي وسريع للمبتدئين
export function cmd(name, val=null){
  document.execCommand(name, false, val);
}
