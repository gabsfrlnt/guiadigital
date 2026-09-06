/*PESQUISA DE SERVIÇOS */

const searchInput = document.getElementById("searchInput");

const serviceCards = document.querySelectorAll(".service-card");

const noResults = document.getElementById("noResults");


/*Remove acentos e transforma o texto em minúsculas*/

function normalizeText(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


/* Filtra os serviços */

function filterServices() {

    const searchTerm =
        normalizeText(searchInput.value.trim());


    const activeButton =
        document.querySelector(".filter-button.active");


    const selectedCategory =
        activeButton.dataset.category;


    let found = false;


    serviceCards.forEach(card => {

        const content =
            normalizeText(card.textContent);


        const category =
            card.dataset.category;


        const matchesSearch =
            content.includes(searchTerm);


        const matchesCategory =
            selectedCategory === "todos" ||
            category === selectedCategory;


        if (matchesSearch && matchesCategory) {

            card.style.display = "";

            found = true;

        } else {

            card.style.display = "none";

        }

    });


    /* Mostra mensagem caso não encontre nenhum serviço */

    if (found) {

        noResults.style.display = "none";

    } else {

        noResults.style.display = "block";

    }

}


/* Pesquisa enquanto o usuário digita */

searchInput.addEventListener(
    "input",
    filterServices
);



/* FILTROS POR CATEGORIA*/

const filterButtons =
    document.querySelectorAll(".filter-button");


filterButtons.forEach(button => {

    button.addEventListener("click", function () {


        /* Remove o destaque dos outros botões */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        /* Ativa o botão selecionado */

        this.classList.add("active");


        /* Executa o filtro */

        filterServices();

    });

});



/*ACESSIBILIDADE - TAMANHO DA FONTE*/

const increaseFont =
    document.getElementById("increaseFont");


const decreaseFont =
    document.getElementById("decreaseFont");


const resetFont =
    document.getElementById("resetFont");

const defaultFontSize = 16;

const minimumFontSize = 12;

const maximumFontSize = 26;


/* Recupera o tamanho salvo anteriormente.Se não existir nenhum tamanho salvo,utiliza 16px.*/

let savedFontSize =
    localStorage.getItem("guiaDigitalFontSize");


let fontSize =
    savedFontSize
        ? parseInt(savedFontSize)
        : defaultFontSize;


/* Garante que o tamanho esteja dentro dos limites */

if (
    fontSize < minimumFontSize ||
    fontSize > maximumFontSize
) {

    fontSize = defaultFontSize;

}


/* Aplica o tamanho da fonte */

function applyFontSize() {

    document.body.style.fontSize =
        fontSize + "px";


    /* Salva a preferência do usuário */

    localStorage.setItem(
        "guiaDigitalFontSize",
        fontSize
    );

}


/* Aplica o tamanho salvo ao abrir o site */

applyFontSize();



/*  BOTÃO A+ - AUMENTAR FONTE */

increaseFont.addEventListener("click", function () {


    /*
       Aumenta 2px a cada clique.

       Exemplo:

       16 → 18 → 20 → 22 → 24 → 26
    */

    if (fontSize < maximumFontSize) {

        fontSize += 2;

        applyFontSize();

    }

});



/* BOTÃO A- - DIMINUIR FONTE */

decreaseFont.addEventListener("click", function () {


    /*
       Diminui 2px a cada clique.

       Exemplo:

       26 → 24 → 22 → 20 → 18 → 16 → 14 → 12
    */

    if (fontSize > minimumFontSize) {

        fontSize -= 2;

        applyFontSize();

    }

});



/* BOTÃO A - RESTAURAR FONTE */

resetFont.addEventListener("click", function () {

    fontSize = defaultFontSize;

    applyFontSize();

});



/* ALTO CONTRASTE*/

const contrastButton =
    document.getElementById("contrastButton");


/*  Recupera a preferência de contraste*/

const savedContrast =
    localStorage.getItem("guiaDigitalHighContrast");


/* Se o usuário já havia ativado o contraste,
   ativa automaticamente.*/

if (savedContrast === "true") {

    document.body.classList.add("high-contrast");

}


/* Alterna o alto contraste */

contrastButton.addEventListener("click", function () {


    document.body.classList.toggle(
        "high-contrast"
    );


    /* Salva a preferência do usuário*/

    const contrastEnabled =
        document.body.classList.contains(
            "high-contrast"
        );


    localStorage.setItem(
        "guiaDigitalHighContrast",
        contrastEnabled
    );

});



/* BOTÃO VOLTAR AO TOPO= */

const topButton =
    document.getElementById("topButton");


/* Mostra o botão quando o usuário desce mais de 400px.*/

window.addEventListener("scroll", function () {


    if (window.scrollY > 400) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});


/* Ao clicar, volta suavemente para o topo.*/

topButton.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});



/* REGISTRO DOS SERVIÇOS ACESSADOS */

/* Esta função apenas registra no console qual serviço foi clicado. Não coleta dados pessoais do usuário.*/

document
    .querySelectorAll(".service-button")
    .forEach(button => {


        button.addEventListener("click", function () {


            const serviceCard =
                this.closest(".service-card");


            const serviceName =
                serviceCard.querySelector("h3")
                    .textContent;


            console.log(
                "Serviço acessado:",
                serviceName
            );

        });

    });



/* INICIALIZAÇÃO= */

/* Garante que os serviços apareçam corretamente quando o site for aberto.*/

filterServices();

console.log(
    "Guia Digital carregado com sucesso!"
);

