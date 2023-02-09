const divPrincipal = document.getElementById("pnlCatalogo");
const receitas = [];
const listaIgredientes = [];


async function getListaIngredientes() {
    const listaJson = await (await fetch("elementos.json")).json();
    const listaReceitas = listaJson.receitas;

    for (let i = 0; i < listaReceitas.length; i++) {
        receitas.push(listaReceitas[i]);

        listaIgredientes.push(listaReceitas[i].igredientes);
    };
};

function getCard() {

    for (let j = 0; j < receitas.length; j++) {
        criaCard = `<div class="card mt-5"></div>`;
        divPrincipal.insertAdjacentHTML('afterbegin', criaCard);
    }

    const card = document.querySelectorAll(".card");

    for (let i = 0; i < receitas.length; i++) {
        card[i].style.width = "250px";
        card[i].style.backgroundColor = "#FFFFFF";
        card[i].innerHTML = `<img src="${receitas[i].imagem}" alt="${receitas[i].titulo}" class="card-img-top"></img>
        <article class="card-body">
        <h1 class="card-title">${receitas[i].titulo}</h1>
        <section class = "card-text">
        <ul id="lista-igredientes"></ul>
        <hr>
        <p>${receitas[i].preparo}</p>
        </section>
        </article>`
    }

    let listaUl = document.querySelectorAll("#lista-igredientes");
    for (let i = 0; i < listaIgredientes.length; i++) {
        for (let j = 0; j < listaIgredientes[i].length; j++) {
            let listaLi = `<li>${listaIgredientes[i][j]}</li>`;
            listaUl[i].insertAdjacentHTML('beforeend', listaLi)
        }

    }

};

async function preencheCatalogo() {
    await getListaIngredientes();
    getCard();
};
