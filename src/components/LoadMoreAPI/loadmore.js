
//load cards/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
  const wrapp = document.querySelector('.cards__inner');
  const defaultViewCards = 6;
  const incrementAdditional = 6;

  (async function getPosts() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const json = await response.json();
      const data = await json;
      renderCards(data, 0, defaultViewCards);
      loadMoreCards(data, 0, defaultViewCards);
  }());

  function renderCards(data, start, end) {
      let cardHTML, obj;
      for (let i = start; i < end; i++) {
          obj = data[i];
          cardHTML = `
              <div class="cards__items card-item">
                  <div class="card-item__body card">
                      <div class="card__content">
                          <div class="card__img">
                              <img src="img/cards/card1.jpg" alt="монеты">
                          </div>
                          <h3 class="card__title">
                              ${obj.title}
                          </h3>
                          <span class="card__subtitle">How to increase your productivity with a Music</span>
                          <div class="card__text">
                              <p>
                                  ${obj.body}
                              </p>
                              <p>
                                  Posted by <span>Eugenia</span>, on July 24, 2019
                              </p>
                          </div>
                          <div class="card__link">
                              <a href="">Continue reading</a>
                          </div>
                      </div>
                  </div>
              </div>
          `;
          wrapp.insertAdjacentHTML(`beforeend`, cardHTML);
      }
  }

  function loadMoreCards(data, start, end) {
      const button = document.querySelector('.cards__more');
      button.addEventListener('click', function() {
          let condition = end + incrementAdditional;
          if (condition < data.length) {
              start = start + incrementAdditional;
              end = end + incrementAdditional;
              renderCards(data, start, end);
          } else {
              renderCards(data, end, data.length);
              button.remove();
          }
      })
  }
})

// [button-load-more]
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
