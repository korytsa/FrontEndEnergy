//Time
const time = document.querySelector('.header__time');

showTime = () => {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();
    hour = hour % 24 || 24;
    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    setTimeout(showTime, 1000);
}
addZero = (n) => {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}
showTime();


//Get data about energy
async function getEnergy() {
    try {
        let response = await fetch('https://obscure-coast-28848.herokuapp.com/energy');
        let energies = await response.json();

        const max = energies.map((item) => (item.max));

        const real = (i) =>{
            return (Math.random() * max[i] + 0).toFixed(3)
        }
        
        const tableMain = document.querySelector('.table__main');
        const tableSun = document.querySelector('.table__sun');
        const tableWind = document.querySelector('.table__wind');
        const tableWater = document.querySelector('.table__water');
        const tableBioMas = document.querySelector('.table__biomas');
        const tableBioGas = document.querySelector('.table__biogas');

        const belData = energies.map(e => `<tr><td>${e.name}</td><td>${e.max}</td><td class='changeBEL'>5.25</td><td>${e.off}</td></tr>`);
        const GES = energies.map(e => `<tr><td>${e.name}</td><td>${e.max}</td><td class='change'>${e.max}</td><td>${e.off}</td></tr>`);
        const mainData = energies.map((e, index) => `<tr><td>${e.name}</td><td>${e.max}</td><td class='change'>${real(index)}</td><td>${e.off}</td></tr>`);
        
        const BEL = `${belData[0]}`;
        const mainInfo = `
            ${BEL}
            ${mainData[1]}
            ${mainData[2]}
            ${mainData[3]}
            ${mainData[4]}
            ${GES[5]}
            ${GES[6]}
            ${GES[7]}
            ${GES[8]}
            ${GES[9]}
            ${GES[10]}
            ${GES[11]}
            ${GES[12]}
        `;
        tableMain.innerHTML = mainInfo;
        tableSun.innerHTML = energies.map((e, index) => `<tr><td>${e.name}</td><td>${e.max}</td><td>${real(index)}</td><td>${e.off}</td></tr> `).slice(13, 27).join('');
        tableWind.innerHTML = energies.map((e, index) => `<tr><td>${e.name}</td><td>${e.max}</td><td>${real(index)}</td><td>${e.off}</td></tr> `).slice(27, 44).join('');
        tableWater.innerHTML = energies.map((e, index) => `<tr><td>${e.name}</td><td>${e.max}</td><td>${real(index)}</td><td>${e.off}</td></tr> `).slice(44, 48).join('');
        tableBioMas.innerHTML = energies.map((e, index) => `<tr><td>${e.name}</td><td>${e.max}</td><td>${real(index)}</td><td>${e.off}</td></tr> `).slice(48, 50).join('');
        tableBioGas.innerHTML = energies.map((e, index) => `<tr><td>${e.name}</td><td>${e.max}</td><td>${real(index)}</td><td>${e.off}</td></tr> `).slice(50, 53).join('');
        
        const need = document.querySelector('.need');
        
        let sum = pluser();
        let result = (5.25 + sum).toFixed(3);
        need.innerHTML = result;

    } catch (error) {
        alert(error);
    }
}

getEnergy();

function pluser(){
    var els = document.querySelectorAll('.change');
    return Array.prototype.slice.call(els).reduce( addMe, 0);
}

function addMe(p,c){
    return p + (parseFloat(c.textContent));
}