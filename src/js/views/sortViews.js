import View from './view';
import previewView from './previewView';

class SortViews extends View {
  _parentEl = document.querySelector('.results');

  generateSortingButtons() {
    return `  <button class="btn--sortbying">
            <span>Sort by number of ingredient </span>
          </button>
          <button class="btn--sortbydur">
            <span>Sort by prepairing duration</span>
          </button> `;
  }

  addHandlerSortByIng(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const sortBtn = e.target.closest('.btn--sortbying');
      if (!sortBtn) return;

      e.preventDefault();

      let data = this._data.slice();
      data.sort((a, b) => a.numIng - b.numIng);
      handler(data);
    });
  }

  addHandlerSortByDuration(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const sortBtn = e.target.closest('.btn--sortbydur');
      if (!sortBtn) return;

      e.preventDefault();

      let data = this._data.slice();
      data.sort((a, b) => a.cookingTime - b.cookingTime);
      handler(data);
    });
  }
}

export default new SortViews();
