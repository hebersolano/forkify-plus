import View from './view';
import previewView from './previewView';

class SortViews extends View {
  _parentElement = document.querySelector('.resultsBtns');
  _errorMessage = 'error rendering buttons';

  _generateMarkup(result) {
    return `
      <button class="btn-sort btn--sortByIng">
        <span>Sort by Ingredient </span>
      </button>
      <button class="btn-sort btn--sortByDur">
        <span>Sort by Duration</span>
      </button>
    `;
  }

  addHandlerSort(handler) {
    const callback = function (e) {
      e.preventDefault();
      const sortBtn = e.target.closest('.btn-sort');
      if (!sortBtn) return;

      console.log(sortBtn);
      if (sortBtn.classList.contains('btn--sortByIng')) {
        handler(this._sortByIng());
      } else if (sortBtn.classList.contains('btn--sortByDur')) {
        handler(this._sortByDur());
      }
    };

    this._parentElement.addEventListener('click', callback.bind(this));
  }

  _sortByIng() {
    let data = this._data;
    data.sort((a, b) => a.numIngredients - b.numIngredients);
    return data;
  }

  _sortByDur() {
    let data = this._data;
    data.sort((a, b) => a.cookingTime - b.cookingTime);
    return data;
  }
}

export default new SortViews();
