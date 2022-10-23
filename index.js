const searchbarContainer = document.getElementById('search-bar')
const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const startExploring = document.getElementById('start-exploring')
const movieContainer = document.getElementById('movie-container')
const watchlistContainer = document.getElementById('watchlist-container')
const watchlistPage = document.getElementById('watchlist-page')
const startImg = document.getElementById('start-img')


searchBtn.addEventListener('click', e => {

    movieContainer.innerHTML = ""

    fetch(`http://www.omdbapi.com/?apikey=5f9fe61a&s=${searchInput.value}`)
        .then(res => res.json())
        .then(data => {


            for (let movie of data.Search) {
                fetch(`https://www.omdbapi.com/?apikey=5f9fe61a&t=${movie.Title}&plot=full`)
                    .then(res => res.json())
                    .then(movie => {
                        if (movie.Title != undefined) {
                            movieContainer.innerHTML += `
                                <div class="movie" id="movie">

                                    <img src="${movie.Poster}">

                                    <div class="movie-details">

                                        <div class="movie-name" id="movie-name">
                                            <h2 id="movie-title">${movie.Title}</h2>
                                            <p>⭐${movie.imdbRating}</p>
                                        </div>

                                        <div class="movie-short-info">
                                            <p>${movie.Runtime}</p>
                                            <p>${movie.Genre}</p>
                                            <button class="watchlist" id="watchlist"><strong>&#10753;</strong> Watchlist</button>
                                        </div>

                                        <div class="movie-info">
                                            <p> ${movie.Plot}</p>
                                        </div>
                                    </div>

                                </div>
                            `
                        }
                        searchInput.value = ""
                    })
            }
        })
})


watchlistPage.addEventListener('click', addWatchlist)

document.addEventListener('click', getWatchlistArray)

let watchlistArray = []

function getWatchlistArray(e) {

    if (e.target.id === 'watchlist') {

        let watchlistDiv = e.target.parentElement.parentElement
        let watchlistTitle = watchlistDiv.children[0].children[0].textContent

        watchlistArray.push(watchlistTitle)
        renderWatchlist()
    }

}


function renderWatchlist() {

    watchlistContainer.innerHTML = "<h1>My watchList </h1>"


    watchlistArray.forEach(function (movie) {
        fetch(`https://www.omdbapi.com/?apikey=5f9fe61a&t=${movie}&plot=full`)
            .then(res => res.json())
            .then(movie => {
                if (movie.Title != undefined) {
                    watchlistContainer.innerHTML += `
                        <div class="movie" id="movie">

                            <img src="${movie.Poster}">

                            <div class="movie-details">

                                <div class="movie-name" id="movie-name">
                                    <h2 id="movie-title">${movie.Title}</h2>
                                    <p>⭐${movie.imdbRating}</p>
                                </div>

                                <div class="movie-short-info">
                                    <p>${movie.Runtime}</p>
                                    <p>${movie.Genre}</p>
                                    <button class="remove" id="remove"><strong>&#10753;</strong> remove </button>
                                </div>

                                <div class="movie-info">
                                    <p> ${movie.Plot}</p>
                                </div>
                            </div>

                        </div>
                    `
                }
            })


    })
}

function addWatchlist(e) {

    console.log(watchlistArray)

    movieContainer.classList.toggle('hidden')
    searchbarContainer.classList.toggle('hidden')

    if (movieContainer.classList.contains('hidden')) {
        watchlistContainer.classList.remove('hidden')

    } else {
        watchlistContainer.classList.add('hidden')
    }
    console.log('hidden')


}

