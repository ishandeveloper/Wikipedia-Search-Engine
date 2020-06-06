// Refer to the form element
const form = document.querySelector(".search-form");

// Add event handler to form submission
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  // prevent page from reloading when form is submitted
  event.preventDefault();
  // get the value of the input field
  const input = document.querySelector(".search-input").value;
  // remove whitespace from the input
  const searchQuery = input.trim();
  // print `searchQuery` to the console
  fetchResults(searchQuery);
}

function fetchResults(searchQuery) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=25&srsearch=${searchQuery}`;

  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const results = data.query.search;
      displayResults(results);
    })
    .catch(() => console.log("An error occurred"));
}

function displayResults(results) {
  // Store a reference to `.searchResults`
  const searchResults = document.querySelector(".results");
  // Remove all child elements
  searchResults.innerHTML = "";
  // Loop over results array
  results.forEach((result) => {
    const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

    searchResults.insertAdjacentHTML(
      "beforeend",
      `<div class="result">
        <h3 class="result-title">
          <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
        </h3>
        <span class="result-snippet">${result.snippet}</span><br>
        <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
      </div>`
    );
  });
}
