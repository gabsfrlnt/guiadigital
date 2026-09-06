/* =====================================================
   GUIA DIGITAL
   Funcionalidades:
   - Pesquisa de serviços
   - Filtros por categoria
   - Acessibilidade
   - Alto contraste
   - Botão voltar ao topo
===================================================== */


/* ================= PESQUISA ================= */

const searchInput = document.getElementById("searchInput");

const serviceCards = document.querySelectorAll(".service-card");

const noResults = document.getElementById("noResults");


function normalizeText(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


function filterServices() {

    const searchTerm = normalizeText(searchInput.value.trim());

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


/* ================= FILTROS ================= */

const filterButtons =
    document.querySelectorAll(".filter-button");


filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        this.classList.add("active");


        filterServices();

    });

});


/* ================= AUMENTAR FONTE ================= */

const increaseFont =
    document.getElementById("increaseFont");

const decreaseFont =
    document.getElementById("decreaseFont");

const resetFont =
    document.getElementById("resetFont");


increaseFont.addEventListener("click", function () {

    document.body.classList.add("large-font");

});


decreaseFont.addEventListener("click", function () {

    document.body.classList.remove("large-font");

});


resetFont.addEventListener("click", function () {

    document.body.classList.remove("large-font");

});


/* ================= ALTO CONTRASTE ================= */

const contrastButton =
    document.getElementById("contrastButton");


contrastButton.addEventListener("click", function () {

    document.body.classList.toggle("high-contrast");

});


/* ================= VOLTAR AO TOPO ================= */

const topButton =
    document.getElementById("topButton");


window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});


topButton.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ================= FEEDBACK VISUAL ================= */

document.querySelectorAll(".service-button").forEach(button => {

    button.addEventListener("click", function () {

        console.log(
            "Serviço acessado:",
            this.closest(".service-card").querySelector("h3").textContent
        );

    });

});

