const debounce = (func, delay) => {
  // the debounce function is structured to take in the first parameter as a function and the elay timer
  let timeOutId;
  return (...args) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

// <article class="media">
//   <figure class="media-left">
//     <p class="image">
//       <img src="${movieDetail.Poster}" alt="movie Picture" />
//     </p>
//   </figure>
//   <div class="media-content">
//     <div class="content">
//       <h1>${movieDetail.Title}</h1>
//       <h4>${movieDetail.Genre}</h4>
//       <p>${movieDetail.Plot}</p>
//     </div>
//   </div>
// </article>
