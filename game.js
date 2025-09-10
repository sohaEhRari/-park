const trashTypes=["🍎","🍊","🍌","🍕","🍒"];
const gameEI= document.getElementById("game");
const binEI= document.getElementById("bin");
const msgEI= document.getElementById("msg");
const levelEI= document.getElementById("level");
const recycleEI= document.getElementById("recycle");
const trashEI= document.getElementById("trash");
const startSound= document.getElementById("startSound");
const levelUpSound= document.getElementById("levelUpSound");



let level=1;
let recycle=0;

const playOnce=()=>startSound.play().catch(e =>console.log(e));

document.body.addEventListener("click", playOnce,{once:true});
document.body.addEventListener("touchstart",playOnce,{once:true});    
window.onload=()=>{
    crateTrash(level*2);
};










function createTrash(num){
    const rect= gameEI.getBoundingClientRect();
for (let i = 0; i <num; i++) {
    const el = document.createElement("div");
    el.className = "trash";
    el.textContent= trashTypes[Math.floor(Math.random()*trashTypes.length)];

    el.style.position= "absolute";
    el.style.left= Math.random()*(rect.width - 60)+"px";
    el.style.top= Math.random()*(rect.height - 160)+50 +"px";

   
    

el.draggable= true;
el.id="trash-"+i;
el.ondragstart= function(e){
 e.dataTransfer.setData("id",el.id);
 
};
gameEI.appendChild(el);
}
}
binEI.ondragover=function(e){
    e.preventDefault();

};

binEI.ondrop=function(e){
    e.preventDefault();
    let id= e.dataTransfer.getData("id");
    let trashEI= document.getElementById(id);
    if(trashEI){
        trashEI.remove();
        recycle++;
        recycleEI.textContent=recycle;
    

    }
    if(gameEI.querySelectorAll(".trash").length===0){
        level ++;
        levelEI.textContent=level;
        createTrash(3+level);
    }

    
};
createTrash(5);
startSound.play();
binEI.ondrop=function(e){
    e.preventDefault();
    let id = e.dataTransfer.getData("id");
    let trashEI=document.getElementById(id);
    if(trashEI){
        trashEI.remove();
        recycle++;
        recycleEI.textContent= recycle;
    }

    if(gameEI.querySelectorAll(".trash").length===0){
        level++;
        levelEI.textContent=level;
        levelUpSound.currentTime=0;
        levelUpSound.play();
        createTrash(3+level);

        
    }

};

 el.animate([
    {transform: "translate(0,0) rotate(0deg)"},
    {transform: "translate(2px,0) rotate(5deg)"},
    {transform: "translate(-2px,0) rotate(-5deg)"},
    {transform: "translate(0,0) rotate(0deg)"},


 ],{duration: 1000, iterations: Infinity});



 el.draggable= true;
 el.addEventListener("dragstart", e=>{
    e.dataTransfer.setData("id", Date.now().toString());
    el.dataset.dragging="";

 });
 el.addEventListener("dragent",()=>{
    el.dataset.dragging="true";

 });

 gameEI.appendChild(el);
 trashItems.push(el);


updateCounter();


function updateCounter(){
    trashcountEI.textContent=trashItems.length;
    recycleEI.textContent= recycle;
    levelEI.textContent= level;


}

binEI.addEventListener("dragover", e=> e.preventDefault());
binEI.addEventListener("drop", e=>{
    const dragging= trashItems.find(t=> t.dataset.dragging==="true");
    if(dragging){
        gameEI.removeChild(dragging);
        trashItems= trashItems.filter(t => t!==dragging);
    recycle++;
    updateCounter();
    checkLevelUp();
    }
});

function checkLevelUp(){
    if(recycle>= level*5){
        level++;
        msgEI.textContent=" level up!";
        setTimeout(()=>msgEI.textContent="",2000);
        crateTrash(level+2);
    }
}

msgEI.textContent="start for playing";
gameEI.addEventListener("click", ()=>{
    if(trashItems.length===0){
        crateTrash(3);
        msgEI.textContent="put the trashes into bin please";
    }
});



