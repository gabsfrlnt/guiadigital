const searchInput = document.getElementById("searchInput");

const serviceCards = document.querySelectorAll(".service-card");

const noResults = document.getElementById("noResults");


searchInput.addEventListener("input", function () {

    const searchTerm = searchInput.value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();


    let found = false;


    serviceCards.forEach(function (card) {

        const content = card.textContent
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");


        if (content.includes(searchTerm)) {

            card.style.display = "";

            found = true;

        } else {

            card.style.display = "none";

        }

    });


    if (searchTerm === "") {

        serviceCards.forEach(function (card) {

            card.style.display = "";

        });

        noResults.style.display = "none";

        return;
    }


    if (found) {

        noResults.style.display = "none";

    } else {

        noResults.style.display = "block";

    }

});
