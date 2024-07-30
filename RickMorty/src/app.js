const API = 'https://rickandmortyapi.com/api/character'

const cards = document.getElementById('cards')
const search = document.getElementById('search')
const form = document.getElementById('form')
const dark = document.getElementById('dark')
const sun = document.getElementById('sun')
const body = document.getElementById('body')
const settings = document.getElementById('settings')
const modal = document.getElementById('modal')
const close = document.getElementById('close')
const modaltxt = document.getElementById('modaltxt')
const err = document.getElementById('error')
const loader = document.getElementById('loader')

close.addEventListener('click', ()=>{
    modal.classList.toggle('hidden')
})
function errfunc(){
    err.classList.toggle('hidden')
}
settings.addEventListener('click', ()=>{
    modal.classList.toggle('hidden')
})
sun.addEventListener('click', ()=>{
    sun.classList.toggle('hidden')
    dark.classList.remove('hidden')
    body.classList.replace('bg-black', 'bg-white')
    modaltxt.classList.replace('text-white', 'text-black')
})
dark.addEventListener('click', ()=>{
    dark.classList.toggle('hidden')
    sun.classList.remove('hidden')
    body.classList.replace('bg-white', 'bg-black')
    modaltxt.classList.replace('text-black', 'text-white')
})
form.addEventListener('keyup', (e) => {
    e.preventDefault();
    const value = search.value.trim().toLowerCase();
    getData(API)
        .then((data)=>{
            const filterMult = data.results.filter((character) => {
                return character.name.toLowerCase().includes(value);
            });
            renderMult(filterMult);
        });
});
function renderMult(array){
    cards.innerHTML = ''
    array.forEach(data => {
        cards.innerHTML += `
        <div id="card" class="my-[1vw] hover:scale-[1.1] ease-out duration-200">
            <div class="h-[32vw] max-sm:h-[40vw] p-[1vw] rounded-[1vw] w-full flex items-center flex-col bg-red-800">
                <img class="w-[20vw] max-sm:w-[30vw] rounded-[1vw]" src="${data.image}" alt="">
                <div class="mt-[1vw] flex gap-[1vw] flex-col overflow-y-auto">
                    <h1 class="w-[20vw] max-sm:text-[2vw] text-[1.5vw] justify-center flex">${data.name}</h1>
                    <div class="w-[20vw] max-sm:w-[25vw] flex justify-start gap-[.5vw] flex-col">
                        <h1 class="text-[1.1vw] max-sm:text-[1.5vw]">Species: ${data.species}</h1>
                        <h1 class="text-[1.1vw] max-sm:text-[1.5vw]">Gender: ${data.gender}</h1>
                    </div>
                </div>
            </div>
        </div>
        `
    });
}
const getData = async(URL)=>{
    loader.classList.toggle('hidden')
    const request = await fetch(URL)
    if(request.status !=200){
        throw new Error()
    }
    const data = await request.json()
    loader.classList.toggle('hidden')
    return data
}
getData(API)
    .then((data)=>{
        renderMult(data.results)
    })
    .catch(()=>{
        loader.classList.toggle('hidden')
        errfunc()
    })