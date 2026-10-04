async function searchRecipe() {

    const searchInput =
        document.getElementById("searchInput");

    const recipesContainer =
        document.getElementById("recipes");


    const query =
        searchInput.value.trim();


    if (query === "") {

        recipesContainer.innerHTML =
            "<p class='error'>Please enter a food name.</p>";

        return;
    }


    recipesContainer.innerHTML =
        "<p class='loading'>Finding recipes...</p>";


    try {

        const url =
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Unable to fetch recipes."
            );
        }


        const data =
            await response.json();


        if (!data.meals) {

            recipesContainer.innerHTML =
                "<p class='error'>No recipes found.</p>";

            return;
        }


        recipesContainer.innerHTML = "";


        data.meals.forEach(meal => {

            const card =
                document.createElement("div");


            card.className = "recipe-card";


            const instructions =
                meal.strInstructions
                ? meal.strInstructions.substring(0, 180) + "..."
                : "No instructions available.";


            card.innerHTML = `

                <img
                    src="${meal.strMealThumb}"
                    alt="${meal.strMeal}"
                >


                <div class="recipe-content">

                    <h2>
                        ${meal.strMeal}
                    </h2>


                    <p>
                        <strong>Category:</strong>
                        ${meal.strCategory}
                    </p>


                    <p>
                        <strong>Cuisine:</strong>
                        ${meal.strArea}
                    </p>


                    <p>
                        ${instructions}
                    </p>


                    ${
                        meal.strYoutube
                        ?
                        `<a
                            href="${meal.strYoutube}"
                            target="_blank"
                        >
                            Watch Recipe
                        </a>`
                        :
                        ""
                    }

                </div>

            `;


            recipesContainer.appendChild(card);

        });


    } catch (error) {

        recipesContainer.innerHTML =
            `<p class="error">
                ${error.message}
            </p>`;

    }

}