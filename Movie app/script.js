document.addEventListener("DOMContentLoaded", () => {
  const name = document.getElementById("movieInput");
  const searchBtn = document.getElementById("submit");
  const errorMsg = document.getElementById("error-message");
  const title = document.getElementById("title");
  const actors = document.getElementById("actors");
  const country = document.getElementById("country");
  const director = document.getElementById("director");
  const plot = document.getElementById("plot");
  const ImdbRating = document.getElementById("imdbRating");
  const year = document.getElementById("year");
  const genre = document.getElementById("genre");
  const image = document.getElementById("image");
  const info = document.getElementById("info");
  const listSec = document.getElementById("movieListings");

  const API_KEY = "12caba64";

  const movieIDs = [
    "tt3896198",
    "tt1190080",
    "tt13751694",
    "tt12735488",
    "tt4574334",
    "tt12004706",
    "tt7286456",
    "tt9389998",
    "tt0995031",
    "tt0993846",
    "tt0993846",
    "tt0120338",
  ];

  movieLists(movieIDs);

  async function movieLists(movieIDs) {
    try {
      const fetchPromises = movieIDs.map(async (element) => {
        const urlList = `https://www.omdbapi.com/?i=${element}&apikey=${API_KEY}`;
        return fetch(urlList).then((response) => response.json());
      });

      const movies = await Promise.all(fetchPromises);

      movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
        <div class="media2" style="background-image: url(${movie.Poster}); cursor: pointer;"></div>
        <div class="card-details">
        <p style="font-size: 1vw;">${movie.Title}</p>
        <p class="psize">Runtime: ${movie.Runtime}</p>
        <p class="psize">Year: ${movie.Year}</p>
        </div>
      `;
        listSec.appendChild(movieCard);
      });
    } catch (error) {
      console.error(error);
    }
  }

  searchBtn.addEventListener("click", async () => {
    const movie = name.value.trim();
    console.log(movie);

    if (!movie) return;

    try {
      const movieDetails = await fetchMovie(movie);
      displayMovie(movieDetails);
    } catch (e) {
      console.log(e);
    }
  });

  async function fetchMovie(movie) {
    const url = `http://www.omdbapi.com/?t=${movie}&apikey=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Movie not found");
    }
    const data = await response.json();
    console.log("res: ", data);
    return data;
  }

  function displayMovie(movieDetails) {
    const {
      Title,
      Year,
      Genre,
      Actors,
      Director,
      Country,
      imdbRating,
      Plot,
      Poster,
      Response,
      Error,
    } = movieDetails;
    if (Response === "False") {
      info.classList.add("hidden");
      errorMsg.textContent = `Error: ${Error}`;
    } else {
      info.classList.remove("hidden");
      errorMsg.classList.add("hidden");
      title.textContent = Title;
      actors.textContent = `Actors: ${Actors}`;
      year.textContent = `Year: ${Year}`;
      genre.textContent = `Genre: ${Genre}`;
      director.textContent = `Director: ${Director}`;
      country.textContent = `Country: ${Country}`;
      ImdbRating.textContent = `IMDB Rating: ${imdbRating}`;
      plot.textContent = `Plot: ${Plot}`;
      image.innerHTML = `
    <div class="media" style="background-image: url(${Poster});"></div>
    `;
    }
  }
});
