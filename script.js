//old code, do not use
// This code is for a movie search application that fetches movie data from the OMDB API
// this code was created while learning about APIs and JavaScript
//fetchData();


//async function fetchData() {
 //   try {
    //  const movieTitle = document.getElementById('movieTitle').value;
      //  const API_KEY = 'bd012492';
      //  const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`;
        
    //    const response = await fetch(url);
     //   if (!response.ok) {
     //       throw new Error('Network response was not ok');
     //   }
      //  const data = await response.json();
      //  console.log(data);
   // } catch (error) {
   //     console.error('Error fetching data:', error);                       
 //   }
//}

//async function getMoviedata() {
    //const movieTitle = document.getElementById('movieTitle').value;
    //const apiKey = "bd012492";
   // const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;
   // const response = await axios.get(url);
   // console.log(response.data);

    //const text = document.createElement("p");
    //text.innerText = response.data.Title + " (" + response.data.Year + ") - " + response.data.Genre + " - " + response.data.Plot + " - Featured Actors: " + response.data.Actors + " - Director: " + response.data.Director + " - MetaCritic Rating: " + response.data.Ratings[2].Value;
   // document.body.appendChild(text);
//}
//getMoviedata();


async function searchMovies() {
    const movieTitle = document.getElementById('movieTitle').value;
    const apiKey = "bd012492";
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(movieTitle)}`;
    const response = await axios.get(url);
    const movies = response.data.Search;

    // Clear previous results
    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (movies) {
        for (const movie of movies) {
            const detailsUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`;
            const detailsResponse = await axios.get(detailsUrl);
            const details = detailsResponse.data;

            // Create card div
            const card = document.createElement('div');
            card.className = 'movie-card';

            // Add poster if available
            if (details.Poster && details.Poster !== "N/A") {
                const img = document.createElement('img');
                img.src = details.Poster;
                img.alt = `${details.Title} Poster`;
                img.className = 'movie-poster';
                card.appendChild(img);
            }

            // Ratings
            let imdbRating = details.imdbRating && details.imdbRating !== "N/A" ? details.imdbRating : "Not available";
            let metacriticRating = "Not available";
            if (details.Ratings && Array.isArray(details.Ratings)) {
                const meta = details.Ratings.find(r => r.Source === "Metacritic");
                if (meta) metacriticRating = meta.Value;
            }

            // Add movie info
            const info = document.createElement('div');
            info.className = 'movie-info';
            info.innerHTML = `
                <h3>${details.Title} (${details.Year})</h3>
                <p><strong>Genre:</strong> ${details.Genre}</p>
                <p><strong>Plot:</strong> ${details.Plot}</p>
                <p><strong>Actors:</strong> ${details.Actors}</p>
                <p><strong>Director:</strong> ${details.Director}</p>
                <p><strong>IMDb Rating:</strong> ${imdbRating}</p>
                <p><strong>Metacritic Rating:</strong> ${metacriticRating}</p>
            `;
            card.appendChild(info);
            console.log(card);

            resultsDiv.appendChild(card);
        }
    } else {
        resultsDiv.innerText = "No movies found.";
    }
}

async function searchMoviesByYear() {
    const movieTitle = document.getElementById('movieTitle').value;
    const movieYear = document.getElementById('movieYear').value;
    const apiKey = "bd012492";
    // Add &y=movieYear to the URL if a year is provided
    let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(movieYear)}`;
    if (movieYear) {
        url += `&y=${encodeURIComponent(movieYear)}`;
    }
    const response = await axios.get(url);
    const movies = response.data.Search;

    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (movies) {
        for (const movie of movies) {
            const detailsUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`;
            const detailsResponse = await axios.get(detailsUrl);
            const details = detailsResponse.data;

            const card = document.createElement('div');
            card.className = 'movie-card';

            if (details.Poster && details.Poster !== "N/A") {
                const img = document.createElement('img');
                img.src = details.Poster;
                img.alt = `${details.Title} Poster`;
                img.className = 'movie-poster';
                card.appendChild(img);
            }

            let imdbRating = details.imdbRating && details.imdbRating !== "N/A" ? details.imdbRating : "Not available";
            let metacriticRating = "Not available";
            if (details.Ratings && Array.isArray(details.Ratings)) {
                const meta = details.Ratings.find(r => r.Source === "Metacritic");
                if (meta) metacriticRating = meta.Value;
            }

            const info = document.createElement('div');
            info.className = 'movie-info';
            info.innerHTML = `
                <h3>${details.Title} (${details.Year})</h3>
                <p><strong>Genre:</strong> ${details.Genre}</p>
                <p><strong>Plot:</strong> ${details.Plot}</p>
                <p><strong>Actors:</strong> ${details.Actors}</p>
                <p><strong>Director:</strong> ${details.Director}</p>
                <p><strong>IMDb Rating:</strong> ${imdbRating}</p>
                <p><strong>Metacritic Rating:</strong> ${metacriticRating}</p>
            `;
            card.appendChild(info);

            resultsDiv.appendChild(card);
        }
    } else {
        resultsDiv.innerText = "No movies found.";
    }
}

async function searchMoviesByGenre() {
    const genreInput = document.getElementById('movieGenre').value.trim().toLowerCase();
    const movieTitle = document.getElementById('movieTitle').value;
    const apiKey = "bd012492";
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(genreInput)}`;
    const response = await axios.get(url);
    const movies = response.data.Search;

    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (movies) {
        let found = false;
        for (const movie of movies) {
            // Fetch full details to get genres
            const detailsUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`;
            const detailsResponse = await axios.get(detailsUrl);
            const details = detailsResponse.data;

            // Check if genre matches
            if (details.Genre && details.Genre.toLowerCase().includes(genreInput)) {
                found = true;
                const card = document.createElement('div');
                card.className = 'movie-card';

                if (details.Poster && details.Poster !== "N/A") {
                    const img = document.createElement('img');
                    img.src = details.Poster;
                    img.alt = `${details.Title} Poster`;
                    img.className = 'movie-poster';
                    card.appendChild(img);
                }
                 let imdbRating = details.imdbRating && details.imdbRating !== "N/A" ? details.imdbRating : "Not available";
                let metacriticRating = "Not available";
                 if (details.Ratings && Array.isArray(details.Ratings)) {
                const meta = details.Ratings.find(r => r.Source === "Metacritic");
                if (meta) metacriticRating = meta.Value;
            }

                const info = document.createElement('div');
                info.className = 'movie-info';
                info.innerHTML = `
                    <h3>${details.Title} (${details.Year})</h3>
                    <p><strong>Genre:</strong> ${details.Genre}</p>
                    <p><strong>Plot:</strong> ${details.Plot}</p>
                    <p><strong>Actors:</strong> ${details.Actors}</p>
                    <p><strong>Director:</strong> ${details.Director}</p>
                    <p><strong>IMDb Rating:</strong> ${imdbRating}</p>
                    <p><strong>Metacritic Rating:</strong> ${metacriticRating}</p>
                `;
                card.appendChild(info);

                resultsDiv.appendChild(card);
            }
        }
        if (!found) {
            resultsDiv.innerText = "No movies found for that genre.";
        }
    } else {
        resultsDiv.innerText = "No movies found.";
    }
}
