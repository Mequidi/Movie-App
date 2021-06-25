const apiKey = "93285016d034e67fe5e25b23e8d151af";
const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;
const imgPath = `https://image.tmdb.org/t/p/w500`
const main = document.getElementById("main")


const getMovies = () =>{
    fetch(apiUrl)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            data.results.forEach((movie)=>{
            //  const imgEl = document.createElement("img")
            //  imgEl.src= imgPath + movie.poster_path;
            //  document.body.appendChild(imgEl)
                const divEl = document.createElement("div")
                divEl.innerHTML= `
                        <img src="${imgPath + movie.poster_path}"/>
                        <div class="movie-info">
                            <h3 class="title">${movie.title}</h3>
                            <span class="${getColor(movie.vote_average)}">${rating(movie.vote_average)}</span>
                        </div>
                ` 
                divEl.classList.add("movie-container");
                main.appendChild(divEl);                                   
            })
        })         
}
getMovies();

const getColor = (rate) =>{
    if(rate<6)
        return "red"
    else if (rate<8)
        return "yellow"
    else    return "green"
}

const rating = (voteAvg) =>{
    if(voteAvg)
        return voteAvg
    else
        return "NA"
} 