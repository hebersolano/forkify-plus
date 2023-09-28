import View from './view';
import icons from 'url:../../img/icons.svg';

class SortViews extends View {
  _parentElement = document.querySelector('.resultsBtns');
  _errorMessage = 'error rendering buttons';

  _generateMarkup(result) {
    return `
      <button class="btn-sort btn--sortByIng">
        <span>Sort by Ingredient </span>
        <svg class="sort-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <button class="btn-sort btn--sortByDur">
        <span>Sort by Duration</span>
        <svg class="sort-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
    `;
  }

  addHandlerSort(handler) {
    const callback = function (e) {
      e.preventDefault();
      const sortBtn = e.target.closest('.btn-sort');
      if (!sortBtn) return;
      let typeSort = sortBtn.classList.contains('desc') ? 'desc' : 'asc';

      if (sortBtn.classList.contains('btn--sortByIng')) {
        handler(this._sortBy('numIngredients', typeSort));
      } else if (sortBtn.classList.contains('btn--sortByDur')) {
        handler(this._sortBy('cookingTime', typeSort));
      }

      sortBtn.classList.toggle('desc');
    };

    this._parentElement.addEventListener('click', callback.bind(this));
  }

  _sortBy(type, order) {
    let data = this._data;
    const compareFunc = function (a, b) {
      if (order == 'asc') {
        return a[type] - b[type];
      } else if (order == 'desc') {
        return b[type] - a[type];
      }
    };
    data.sort(compareFunc);
    return data;
  }
}

export default new SortViews();
