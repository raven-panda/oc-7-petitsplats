export default class RecipeCardDOM {
  #cardArticle;

  constructor(recipeTitle, recipeDescription, imageName, ingredients) {
    this.#cardArticle = this.#createArticle(recipeTitle, recipeDescription, imageName, ingredients);
  }

  #createArticle(recipeTitle, recipeDescription, imageName, ingredients) {
    const article = document.createElement("article");
    article.classList.add("lpp_recipe-card", "card");

    article.appendChild(this.#createCardImg("./assets/pictures/recipes/" + imageName, "Image de " + recipeTitle));
    article.appendChild(this.#createCardBody(recipeTitle, recipeDescription, ingredients));

    return article;
  }

  #createCardImg(src, alt) {
    const img = document.createElement("img");
    img.classList.add("card-img-top", "object-fit-cover")
    img.src = src;
    img.alt = alt;
    img.width = 380; 
    img.height = 253;

    return img;
  }

  #createCardBody(recipeName, recipeDescription, ingredients) {
    const bodyContainer = document.createElement("div");
    bodyContainer.classList.add("card-body");
    
    bodyContainer.appendChild(this.#createCardTitle(recipeName));
    bodyContainer.appendChild(this.#createCardSubtitle("Recettes"));
    bodyContainer.appendChild(this.#createCardRecipeDescription(recipeDescription));
    bodyContainer.appendChild(this.#createCardSubtitle("Ingrédients"));
    bodyContainer.appendChild(this.#createCardIngredientsSection(ingredients));

    return bodyContainer;
  }

  #createCardTitle(content) {
    const title = document.createElement("h4");
    title.classList.add("card-title");
    title.textContent = content;

    return title;
  }

  #createCardSubtitle(content) {
    const subTitle = document.createElement("h5");
    subTitle.classList.add("lpp_card-subtitle");
    subTitle.textContent = content;

    return subTitle;
  }

  #createCardRecipeDescription(content) {
    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.classList.add("card-text");
    descriptionParagraph.textContent = content;

    return descriptionParagraph;
  }

  #createCardIngredientsSection(ingredients) {
    const ingredientsSection = document.createElement("section");
    ingredientsSection.classList.add("lpp_card-ingredients-container");

    ingredients.forEach(ingredient => {
      const ingredientName = document.createElement("p");
      ingredientName.classList.add("lpp_card-ingredient-name");
      ingredientName.textContent = ingredient.ingredient;

      const ingredientContainer = document.createElement("div");
      ingredientContainer.appendChild(ingredientName);

      if (ingredient.quantity) {
        const ingredientAmount = document.createElement("p");
        ingredientAmount.classList.add("lpp_card-ingredient-amount");
        ingredientAmount.textContent = ingredient.quantity + (ingredient.unit ? " " + ingredient.unit : "");
        
        ingredientContainer.appendChild(ingredientAmount);
      }

      ingredientsSection.appendChild(ingredientContainer);
    })

    return ingredientsSection;
  }

  displayCardData(parent) {
    parent.appendChild(this.#cardArticle);
  }

}