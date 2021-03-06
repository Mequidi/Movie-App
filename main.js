const apiKey = "93285016d034e67fe5e25b23e8d151af";
let currentPage = 1;
const apiUrl = getApiUrl(currentPage);
const imgPath = `https://image.tmdb.org/t/p/w500`
const searchApiPath = getSearchApiPath(currentPage);
let submitText = "";


const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const numbBtns = document.querySelectorAll(".numbered-btn .btn")
const title = document.querySelector(".title");
const preloader = document.querySelector(".preloader-container")
const btn = document.querySelectorAll(".btn");

window.addEventListener("load", () => {
    preloader.classList.add("hide-preloader");
})

const getMovies = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            showMovies(data);
        })
}

getMovies(apiUrl);

// btn.forEach((btn)=>{
//     btn.addEventListener("click",()=>{
//         // ScrollOrReload();
//     })
// })

prevBtn.addEventListener("click", () => {

    currentPage--;
    if (currentPage < 1)
        currentPage = 1;

    if (!submitText)
        getMovies(getApiUrl(currentPage));
    else
        getMovies(getSearchApiPath(currentPage) + submitText);
    window.scrollTo({left:0,top:0});
})

nextBtn.addEventListener("click", () => {

    if (currentPage >= totalPages)
        currentpage = totalPages;
    else currentPage++;

    if (!submitText)
        getMovies(getApiUrl(currentPage));
    else
        getMovies(getSearchApiPath(currentPage) + submitText);
    window.scrollTo({left:0,top:0});
})

numbBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        currentPage = index + 1;
        if (!submitText)
            getMovies(getApiUrl(currentPage));
        else
            getMovies(getSearchApiPath(currentPage) + submitText);
    })
    window.scrollTo({left:0,top:0});
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitText = search.value;
    currentPage = 1;
    if (submitText === "") {
        title.textContent = "Upcoming movies"
        getMovies(apiUrl);
    } else {
        title.textContent = `Search for "${search.value}" Movies`
        getMovies(searchApiPath + submitText);
    }
})
const showMovies = (movies) => {
    
    main.innerHTML = "";
    totalPages = movies.total_pages;
    movies.results.forEach((movie) => {
        const divEl = document.createElement("div")
        divEl.innerHTML = `
                        
                        <img class="image" src="${imgUrlGenerator(imgPath,movie.poster_path)}"/>
                        <div class="movie-info">
                            <h3 class="title">${movie.title}</h3>
                            <span class="${getColor(movie.vote_average)}">${rating(movie.vote_average)}</span>
                        </div>
                        <div class ="overview">
                            <h2>Overview</h2>
                            <p>${movie.overview}</p>
                        </div>
                    
                `
        divEl.classList.add("movie-container");
        main.appendChild(divEl);
    })
    const movieContainer = document.querySelectorAll(".movie-container");
    if(screen.width<500){
        movieContainer.forEach((movie) => {
            movie.addEventListener("click", () => {
                console.log("clicked!")
                const children = movie.children;
                const overview = children[children.length-1];
                overview.classList.toggle("show-overview")
            })
        })   
    }
}

const imgUrlGenerator = (imgPath, poster_path) => {
    if (poster_path)
        return imgPath + poster_path;
    else {
        return "https://fakeimg.pl/400x300/373B69/?text=No_Image"
    }
}
const getColor = (rate) => {
    if (rate < 6)
        return "red"
    else if (rate < 8)
        return "yellow"
    else return "green"
}

const rating = (voteAvg) => {
    if (voteAvg)
        return voteAvg
    else
        return "NA"
}

function getApiUrl(current) {
    return `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${current}`;
}

function getSearchApiPath(current) {
    return `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${current}&query=`;
}

function ScrollOrReload() {
    if (window.screen.width < 500) {
        window.location.reload();
        console.log("smol screen")
    } else
        window.scrollTo({
            left: 0,
            top: 0
        });
}