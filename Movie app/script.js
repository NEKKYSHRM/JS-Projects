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

  const API_KEY = "12caba64";

  searchBtn.addEventListener("click", async () => {
    const movie = name.value.trim();
    console.log(movie);

    if (!movie) return;

    try {
      const movieDetails = await fetchMovie(movie);
      displayMovie(movieDetails);
    } catch (e) {
      console.log(e);
      ;
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
      errorMsg.classList.add("hidden")
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
