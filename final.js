const apiKey = 'd271c71a3f1bc26e36d078a2fccd801b'; 


// Open modal with movie description, release date, and IMDb rating
function openModal(movie) {
    const modal = document.getElementById('movieDescriptionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalReleaseDate = document.getElementById('modalReleaseDate');
    const modalImdbRating = document.getElementById('modalImdbRating');
  
    modalTitle.textContent = movie.title;
    modalDescription.textContent = movie.overview;
    modalReleaseDate.textContent = `Release Date: ${movie.release_date}`;
    modalImdbRating.textContent = `IMDb Rating: ${movie.vote_average}`;
  
    modal.style.display = 'block';
  }
  

function closeModal() {
    const modal = document.getElementById('movieDescriptionModal');
    modal.style.display = 'none';
  }
  
 
  document.addEventListener('DOMContentLoaded', async () => {
   
    
    const closeButton = document.getElementsByClassName('close')[0];
    closeButton.addEventListener('click', closeModal);
  });
  

  

// Fetch popular movies
async function fetchMovies() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log('Error:', error);
    return [];
  }
}

// Display movies on the page
function displayMovies(movies) {
  const movieContainer = document.getElementById('movieContainer');
  movieContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movieCard';
    movieCard.addEventListener('click', () => openModal(movie));

    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const movieImage = document.createElement('img');
    movieImage.src = imageUrl;
    movieCard.appendChild(movieImage);

    const movieTitle = document.createElement('h2');
    movieTitle.textContent = movie.title;
    movieCard.appendChild(movieTitle);

    const movieOverview = document.createElement('p');
    movieOverview.textContent = movie.overview;
    movieCard.appendChild(movieOverview);

    movieContainer.appendChild(movieCard);
  });
}


function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
  
    const movieCards = document.getElementsByClassName('movie-card');
    for (const card of movieCards) {
      const title = card.querySelector('h2').textContent.toLowerCase();
      if (title.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    }
  }
  
  // Fetch movies and display them when the page loads
  document.addEventListener('DOMContentLoaded', async () => {
    const movies = await fetchMovies();
    displayMovies(movies);
  });
  
  // Event listener for search input
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', handleSearch);
  
