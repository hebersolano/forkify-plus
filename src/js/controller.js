import * as model from './model.js'; ///. means current folder
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import sortViews from './views/sortViews.js';

const searchResults = document.querySelector('.results');

// import icons from '../img/icons.svg'; -parcel 1
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(await model.getSearchResultsPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    ////////////////////////////////////
    // 3) Rendering recipe
    recipeView.render(model.state.recipe); // render method
    // const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
    console.error(err);
  }
};
// controlRecipes();

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    //if (!query) return;

    // 2) Load search results
    //await model.loadSearchResults(query);

    //3) Render results
    // resultsView.render(model.state.search.results);
    //resultsView.render(await model.getSearchResultsPage(1));
    resultsView.render(model.state.search.results);

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);

    // 5) Render sorting buttons and send data to sort
    sortViews.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const controlSortSearchResults = function (data) {
  try {
    //1) Render NEW results
    resultsView.render(data);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = async function (goToPage) {
  //1) Render NEW results
  resultsView.render(await model.getSearchResultsPage(goToPage));
  sortViews.render(model.state.search.resultsPage, false); // actualize data in sortView but doesn't render buttons again

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);

  // 3) Render a number of page which is displayed
  paginationView.showActualPage(model.state.search);

  // console.log('goToPage');
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Succes message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // This method allow us to change url without reloading the page
    // window.history.back()

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  sortViews.addHandlerSort(controlSortSearchResults);
};
init();
console.log(model.state);

/* git init
git add -A
commit -m 'Initial commit'
git reset --hard HEAD
git log
git reset --hard cab71e90a960(id commit)
git branch
q - close
git branch new-feature
git checkout new-feature
git merge new-feature
*/
