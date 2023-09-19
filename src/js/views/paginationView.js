import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);

      handler(goToPage);
    });
  }

  generateMarkupButtonPrev() {
    let curPage = this._data.page;
    return `
    <button data-goto = "${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
  </button>
  `;
  }

  showActualPage() {
    let curPage = this._data.page;
    return `
      <button data-goto = "${curPage}" class="btn--actual1 pagination__btn--actual">
    <svg class="search__icon">
    </svg>
    <span>Page  ${curPage}</span>  
  </button>
  `;
  }

  generateMarkupButtonNext() {
    let curPage = this._data.page;
    return `
    <button data-goto = "${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
        `;
  }

  generateMarkupButtonNext1() {
    let curPage = this._data.page;
    return `
    <button data-goto = "${
      curPage + 1
    }" class="btn--inline pagination__btn--next1">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
        `;
  }

  _generateMarkup() {
    let markup = '';
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      markup += this.generateMarkupButtonNext();
      markup += this.showActualPage();
      return markup;
    }

    // Page 1, and there are NO other pages
    if (curPage === 1 && numPages <= 1) {
      markup += this.showActualPage();
      // return '';
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      markup += this.generateMarkupButtonPrev();
      markup += this.showActualPage();
      return markup;
    }

    // Other page
    if (curPage < numPages) {
      markup += this.generateMarkupButtonPrev();
      markup += this.showActualPage();
      markup += this.generateMarkupButtonNext();
      return markup;
    }
  }
}

export default new PaginationView();
