const apiKey = "93285016d034e67fe5e25b23e8d151af";
const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;
const imgPath = `https://image.tmdb.org/t/p/w500`

const getMovies = () =>{
    fetch(apiUrl)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            data.results.forEach((movie)=>{
            //     const imgEl = document.createElement("img")
            //     imgEl.src= imgPath + movie.poster_path;
            //     document.body.appendChild(imgEl)
            })
        })         
}
getMovies();

