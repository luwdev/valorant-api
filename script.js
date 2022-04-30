const body = document.querySelector("body");
const container = document.querySelector("#container")
const model = document.querySelector(".model")
const background = document.querySelector("#background")
const ulAb = document.querySelector(".ulAb")

background.style.display= "none"

async function render(){
    let valorantAPI = await fetch("https://valorant-api.com/v1/agents").then(val => val.json())
    const agentDatas = valorantAPI.data;
    [...agentDatas].forEach(val=> renderDatas(val))
    function renderDatas(data){
        const htmlContent =`
        <section class="agentCard" data-id="${data.uuid}">
        <div class="agentImgContainer">
            <img src="${data.displayIcon}" alt="" >
            </div>
            <h3 class="agentName">${data.displayName}</h3>
            <p class="agentDescription">${data.description}</p>
           <button class="agentButton">Know More !</button>
       </section>
        `   
        container.insertAdjacentHTML("afterbegin" , htmlContent)
    }

    const knowButtons = document.querySelectorAll(".agentButton")
    knowButtons.forEach(val=> val.addEventListener("click" , async function(){
        const parent = this.parentElement.dataset.id;
        const data = await fetch(`https://valorant-api.com/v1/agents/${parent}`).then(val=> val.json()).then(val=> val.data).catch(err=> alert(err))
        background.style.display="flex"
        model.querySelector("img").src = data.fullPortraitV2; 
        model.querySelector(".modelHeader").textContent = data.displayName;
        model.querySelector(".modelDescrpiton").textContent = data.description;
        model.querySelectorAll(".ablites").forEach(val=> val.textContent = data.abilities[0].displayName);
        container.style.display = "none"
        
        model.querySelector("span").addEventListener("click" , function(){
            background.style.display="none"
            container.style.display = "flex"
            ulAb.innerHTML = null;
        })
        for(let i = 0 ; i < 5 ; i++){
            const abilitiesHtml = `
            <li class="abilities">
            <span class="abSp">
            <img src="${data.abilities[i].displayIcon}" class="abImg" alt="">
            </span>
            <h4 class="abH">${data.abilities[i].displayName}</h4>
            <p class="abP">${data.abilities[i].description}</p>
            </li>
        `
        ulAb.insertAdjacentHTML("beforeend" , abilitiesHtml)
        };

        
    }))
    
}
render();

