const createAutoComplete = ({
  root,
  renderOption,
  onOptionselect,
  inputValue,
  fetchData,
}) => {
  // const root = document.querySelector('.autocomplete');
  root.innerHTML = `
<label><b>Search </b></label>
<input class = "input" />
  <div class= "dropdown">
    <div class= "dropdown-menu">
      <div class= "dropdown-content results"></div>
    <div>
  <div>
`;

  const input = root.querySelector('input'); // selecting the seach box using the query selector
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');

  const onInput = async (event) => {
    // awairing for whatever happens when the drop down menu is not clicked
    const items = await fetchData(event.target.value);

    // checking to see if there is no input in the searchbox, drop down should be inactive
    if (!items) {
      dropdown.classList.remove('is-active');
      return;
    }

    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    // short circuiting if the seacrch input return an invalid result on the api
    items?.forEach((element) => {
      const option = document.createElement('a'); // creating an element from javascript to be appended on a parent element existing in the index page

      // const imageSrc = element.Poster == 'N/A' ? '' : element.Poster;

      option.classList.add('dropdown-item');

      option.innerHTML = renderOption(element);

      // event to handle the search box input in order to hold on the movie selected and collapse the dop down menu
      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        input.value = inputValue(element);
        onOptionselect(element);
      });
      resultsWrapper.appendChild(option); // appending the parent element to the child element
    });

    // console.log(items);
  };

  // The add event listener calls the debounce in reference to callling the onInput function as the required parameter for the debounce function
  input.addEventListener('input', debounce(onInput, 500)); // handling the event "input" of the search box

  // removing the active class for the dropdown if the click event is not pointing to the dropdown anymore
  const clicked = (e) => {
    if (!root.contains(e.target)) {
      dropdown.classList.remove('is-active');
    }
  };
  document.addEventListener('click', clicked);
};
