const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key' : API_KEY,
    },    
})

// Utils

function renderMovies(movie, container){
    container.innerHTML="";
        movie.forEach(movie => {
        const movieContainer = document.createElement('DIV');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => location.hash = 'movie='+movie.id);
        const movieImg = document.createElement('IMG');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300'+ movie.poster_path);
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function renderCategory(category, container){
    container.innerHTML="";
    category.forEach(category => {
        const categoryContainer = document.createElement('DIV');
        categoryContainer.classList.add('category-container');
        const categoryTitle = document.createElement('H3');
        categoryTitle.setAttribute('id', 'id'+category.id);
        categoryTitle.addEventListener('click', () => location.hash = `category=${category.id}-${category.name}`);
        categoryTitle.classList.add('category-title');
        categoryTitle.innerText = category.name;
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    }); 

}

// Llamadas API

async function getTrendingAll() {
    const { data }  = await api("trending/all/day?");
    const movie = data.results;
    renderMovies(movie, trendingMoviesPreviewContainer);
}

async function getTrendingMovie() {
    const { data }  = await api("trending/all/day?");
    const movie = data.results;
    window.scrollTo(0,0);
    headerCategoryTitle.innerText="Tendencias";
    renderMovies(movie, genericSection);
}

async function getGenre() {
    const { data } = await api("genre/movie/list?");
    const category = data.genres;
    renderCategory(category, categoriesPreviewList);

}

async function getMoviesByCategory(id, name) {
    const { data }  = await api("discover/movie?with_genres",{
        params: {
        'with_genres': id,
        },
    });
    window.scrollTo(0,0);
    // Para subir la ventana despues renderizar la nueva pestaña
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
    const movie = data.results;
    headerCategoryTitle.innerText=name;
    renderMovies(movie, genericSection);
}

async function getMoviesBySearch(query) {
    const { data }  = await api("search/movie?",{
        params: {
            query,
        },
    });
    const movie = data.results;
    window.scrollTo(0,0);
    renderMovies(movie, genericSection);
}

async function getMovieById(movie_id) {
    const { data }  = await api('movie/'+movie_id );
    const movie = data;
    const movieUrl = 'https://image.tmdb.org/t/p/w500'+movie.poster_path;
    window.scrollTo(0,0);
    headerSection.style.background= `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${movieUrl})`;
    movieDetailTitle.innerText=movie.title;
    movieDetailDescription.innerText=movie.overview;
    movieDetailScore.innerText=movie.vote_average;
    renderCategory(movie.genres, movieDetailCategoriesList);
}

async function getRelatedMovieById(movie_id) {
    const { data }  = await api(`movie/${movie_id}/recommendations` );
    const movie = data.results;
    renderMovies(movie, relatedMoviesContainer);
}
getTrendingAll();
getGenre();