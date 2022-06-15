searchFormBtn.addEventListener('click', () => {location.hash = 'search='+searchFormInput.value });
arrowBtn.addEventListener('click', () => history.back() 
//location.hash = 'home='
);
trendingBtn.addEventListener('click', () => location.hash = 'trends=');


window.addEventListener('DOMContentLoad', navigator , false);
window.addEventListener('hashchange', navigator , false);
function navigator() {
    if (location.hash.startsWith('#trends=')) {
        trends();
    } else if (location.hash.startsWith('#search=')) {
        searchMovie();
    } else if (location.hash.startsWith('#movie=')) {
        movie();
    } else if (location.hash.startsWith('#category=')) {
        category();
    } else {
        home();
    }

    function trends (){
        headerSection.classList.remove('header-container--long');
        headerSection.style.background = '';
        arrowBtn.classList.remove('inactive');
        arrowBtn.classList.remove('header-arrow--white');
        headerTitle.classList.add('inactive');
        headerCategoryTitle.classList.remove('inactive');
        searchForm.classList.add('inactive');

        trendingPreviewSection.classList.add('inactive');
        categoriesPreviewSection.classList.add('inactive');
        genericSection.classList.remove('inactive');
        movieDetailSection.classList.add('inactive');
        getTrendingMovie();
    }
    function searchMovie() {
        headerSection.classList.remove('header-container--long');
        headerSection.style.background = '';
        arrowBtn.classList.remove('inactive');
        arrowBtn.classList.remove('header-arrow--white');
        headerTitle.classList.add('inactive');
        headerCategoryTitle.classList.add('inactive');
        searchForm.classList.remove('inactive');

        trendingPreviewSection.classList.add('inactive');
        categoriesPreviewSection.classList.add('inactive');
        genericSection.classList.remove('inactive');
        movieDetailSection.classList.add('inactive');

        const query = location.hash.split("=")[1];
        // [#search, searchValue]
        // getMoviesBySearch(query);
        console.log(query);
        getMoviesBySearch(query);
    }
    function movie(){
        headerSection.classList.add('header-container--long');
        headerSection.style.background = '';
        arrowBtn.classList.remove('inactive');
        arrowBtn.classList.add('header-arrow--white');
        headerTitle.classList.add('inactive');
        headerCategoryTitle.classList.add('inactive');
        searchForm.classList.add('inactive');

        trendingPreviewSection.classList.add('inactive');
        categoriesPreviewSection.classList.add('inactive');
        genericSection.classList.add('inactive');
        movieDetailSection.classList.remove('inactive');

        const movieId = location.hash.split("=")[1];
        // [#search, searchValue]
        // getMoviesBySearch(query);
        getMovieById(movieId);
        getRelatedMovieById(movieId);
    }
    function category(){
        headerSection.classList.remove('header-container--long');
        headerSection.style.background = '';
        arrowBtn.classList.remove('inactive');
        arrowBtn.classList.remove('header-arrow--white');
        headerTitle.classList.add('inactive');
        headerCategoryTitle.classList.remove('inactive');
        searchForm.classList.add('inactive');

        trendingPreviewSection.classList.add('inactive');
        categoriesPreviewSection.classList.add('inactive');
        genericSection.classList.remove('inactive');
        movieDetailSection.classList.add('inactive');

        const [id, name] = location.hash.split("=")[1].split("-");
        // [#category, [#id,#name]]
        getMoviesByCategory(id, name);
    }
    function home(){
        headerSection.classList.remove('header-container--long');
        headerSection.style.background = '';
        arrowBtn.classList.add('inactive');
        arrowBtn.classList.remove('header-arrow--white');
        headerTitle.classList.remove('inactive');
        headerCategoryTitle.classList.add('inactive');
        searchForm.classList.remove('inactive');

        trendingPreviewSection.classList.remove('inactive');
        categoriesPreviewSection.classList.remove('inactive');
        genericSection.classList.add('inactive');
        movieDetailSection.classList.add('inactive');


    }
}

navigator();