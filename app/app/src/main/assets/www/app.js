const $ = (id) => document.getElementById(id);
const pages = ["homePage","historyPage","settingsPage","resultPage","processingPage"];
let selectedFile = null, audioUrl = null, progressTimer = null, progress = 0;
const audio = $("audioPreview");

function showPage(id){
  pages.forEach(p => $(p).classList.toggle("active", p===id));
  document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.page===id));
  const nav = ["homePage","historyPage","settingsPage"].includes(id);
  document.querySelector(".bottom-nav").style.display = nav ? "flex" : "none";
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll(".nav-item").forEach(btn => btn.addEventListener("click",()=>showPage(btn.dataset.page)));
$("settingsShortcut").addEventListener("click",()=>showPage("settingsPage"));

function formatSize(bytes){
  if(bytes < 1024*1024) return (bytes/1024).toFixed(1)+" KB";
  return (bytes/1024/1024).toFixed(2)+" MB";
}
$("audioInput").addEventListener("change", e => {
  const file = e.target.files[0];
  if(!file) return;
  if(!file.type.startsWith("audio/") && !/\.(mp3|wav|m4a|flac)$/i.test(file.name)){
    alert("សូមជ្រើសរើសឯកសារសំឡេង។"); e.target.value=""; return;
  }
  selectedFile = file;
  $("fileName").textContent = file.name;
  $("fileMeta").textContent = formatSize(file.size);
  $("selectedFile").classList.remove("hidden");
  $("processBtn").disabled = false;
  $("processHint").textContent = "ឯកសាររួចរាល់ អ្នកអាចចាប់ផ្ដើមបាន។";
  if(audioUrl) URL.revokeObjectURL(audioUrl);
  audioUrl = URL.createObjectURL(file);
  audio.src = audioUrl;
  audio.classList.remove("hidden");
  saveHistory(file);
});
$("removeFile").addEventListener("click",()=>{
  selectedFile=null; $("audioInput").value=""; $("selectedFile").classList.add("hidden");
  $("processBtn").disabled=true; $("processHint").textContent="សូមជ្រើសរើសបទចម្រៀងជាមុនសិន";
  audio.pause(); audio.classList.add("hidden");
  if(audioUrl){URL.revokeObjectURL(audioUrl);audioUrl=null;}
});
function saveHistory(file){
  let items=JSON.parse(localStorage.getItem("v008_history")||"[]");
  if(!items.some(x=>x.name===file.name && x.size===file.size)){
    items.unshift({name:file.name,size:file.size,date:new Date().toLocaleString()});
    localStorage.setItem("v008_history",JSON.stringify(items.slice(0,30)));
  }
  renderHistory();
}
function renderHistory(){
  const items=JSON.parse(localStorage.getItem("v008_history")||"[]");
  $("historyList").innerHTML=items.map(x=>`<div class="history-item"><div class="file-icon">♫</div><div><b>${escapeHtml(x.name)}</b><small>${formatSize(x.size)} · ${escapeHtml(x.date)}</small></div></div>`).join("");
  $("emptyHistory").classList.toggle("hidden",items.length>0);
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}

$("processBtn").addEventListener("click",()=>{
  if(!selectedFile) return;
  $("processingFile").textContent=selectedFile.name;
  progress=0; $("progressFill").style.width="0%"; $("progressPercent").textContent="0%";
  $("progressStatus").textContent="UI preview only";
  showPage("processingPage");
  clearInterval(progressTimer);
  progressTimer=setInterval(()=>{
    progress=Math.min(100,progress+4+Math.floor(Math.random()*7));
    $("progressFill").style.width=progress+"%";
    $("progressPercent").textContent=progress+"%";
    if(progress>=100){
      clearInterval(progressTimer);
      $("progressStatus").textContent="Preview complete";
      setTimeout(()=>{
        $("resultTrackName").textContent=selectedFile ? selectedFile.name : "Selected audio";
        showPage("resultPage");
      },450);
    }
  },180);
});
$("cancelProcess").addEventListener("click",()=>{clearInterval(progressTimer);showPage("homePage");});
$("backHome").addEventListener("click",()=>showPage("homePage"));
renderHistory();
