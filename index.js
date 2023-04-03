// REFACTORING

const autoCompleteConfig = {
  // refactoring the function for render options for when a user fills the search field
  renderOption(element) {
    const imageSrc = element.Poster == 'N/A' ? '' : element.Poster;
    return `
    <img src =${imageSrc} />
    ${element.Title}
    (${element.Year})
    `;
  },

  // refactoring for what remains on the search box after seleting the moive
  inputValue(element) {
    return `${element.Title} (${element.Year})
    `;
  },

  // refactoring for async API call
  async fetchData(searchTerm) {
    // USING AXIOS TO HELP US BOYCOT THE .JSON AND OTHER BACHGROUND ACTIVITIES FOR FETCHING API
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: '915179fe',
        s: searchTerm,
        //   i: 'tt0848228',
      },
    });

    return response.data.Search;
    //   console.log(response.data);
  },
};

// LEFT HAND SIDE
// calling the auto complete function and defining the parameters it takes to run
createAutoComplete({
  ...autoCompleteConfig,
  // refactoring what happens when any thing is clicked in the seacrch box
  root: document.querySelector('#left-autocomplete'),
  // refactoring the selection function for when a user selects a movie
  onOptionselect(element) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    // onMovieSelect taking in three parameters now
    onMovieSelect(element, document.querySelector('#left-summary'), 'left');
  },
});

// RIGHT HAND SIDE
createAutoComplete({
  ...autoCompleteConfig,
  // refactoring what happens when any thing is clicked in the seacrch box
  root: document.querySelector('#right-autocomplete'),
  // refactoring the selection function for when a user selects a movie
  onOptionselect(element) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    // onMovieSelect taking in three parameters now
    onMovieSelect(element, document.querySelector('#right-summary'), 'right');
  },
});

let leftMovie;
let rightMovie;

// SETTING THE TIMOEUT FOR THE DEBOUNCING O THE INPUT SEARCH BOX
const onMovieSelect = async (movie, summaryElement, side) => {
  // sending request to the omdbapi
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '915179fe',
      i: movie.imdbID,
      //   i: 'tt0848228',
    },
  });

  console.log(response.data);
  summaryElement.innerHTML = movieTemplate(response.data);

  if (side == 'left') {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    runComparism();
  }
};

const runComparism = () => {
  console.log('time for comparism');
};

const movieTemplate = (movieDetail) => {
  const dollars = parseInt(
    movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')
  );

  const metascore = parseInt(movieDetail.Metascore);
  const imdbRating = parseInt(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
  console.log(dollars, metascore, imdbRating, imdbVotes);

  return `
  <figure class="movie">
  <div class="movie__hero">
    <img src="${movieDetail.Poster}">
  </div>
  <div class="movie__content">
    <div class="movie__title">
      <h1 class="heading__primary">${movieDetail.Title}<i class="fas fa-fire"></i></h1>
      <div class="movie__tag movie__tag--1">${movieDetail.Genre}</div>
      <div class="movie__tag movie__tag--2">${movieDetail.imdbVotes}</div>
    </div>
    <p class="movie__description">${movieDetail.Plot}</p> </br>
    <h1 class="movie__description"> Awards: ${movieDetail.Awards}</h1>
    <div class="movie__details">
      <p class="movie__detail"><span class="icons icons-red">Meta Score</i> </span>${movieDetail.Metascore}</p>
      <p class="movie__detail"><span class="icons icons-grey">Rating</i> </span>${movieDetail.imdbRating}</p>
      <p class="movie__detail"><span class="icons icons-yellow">Box Office</i>
        </span>${movieDetail.BoxOffice}</p>
    </div>
  </div>
  <div class="movie__price">$12.56</div>
</figure>
  `;
};
