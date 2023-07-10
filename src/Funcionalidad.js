import React, { useState, useEffect } from "react";
import axios from 'axios'
import YouTube from 'react-youtube'


const Funcionalidad = () => {
  const key = '962d31215e50e4f741a0c6b45d2f62af';
  const url = `https://api.themoviedb.org/3`;
  const Image_path = 'https://image.tmdb.org/t/p/original'
  const ulr_image = 'https://image.tmdb.org/t/p/original'
 
//Variables de estado

const [movies, setMovies] = useState([])
const [searchKey, setSearchKey] = useState("")
const [trailer, setTrailer] = useState(null)
const [movie, setMovie] = useState({title:"Loading movie..."})
const [playing, setPlaying] = useState(false)




//funcion para realizar la peticion por get a la api




const fetchMovie = async(searchKey) => {
  const type = searchKey ? "search" : "discover"
  const { data: { results },
} = await axios.get(`${url}/${type}/movie`, {
  params: {
    api_key: key,
    query: searchKey,
  },
})
setMovies(results)
setMovie(results[0])
//this 
if(results.length){
  await fetchMovies(results[0].id)
}

}
//Reproductor de video
const fetchMovies = async(id)=>{
const {data} = await axios.get(`${url}/movie/${id}`, {
  params:{
    api_key: key,
    append_to_response: "videos"
  }
})
if(data.videos && data.videos.results){
  const trailer = data.videos.results.find(
    (vid) => vid.type === "Trailer"
  )
  setTrailer(trailer ? trailer : data.videos.results[0])
  
}
setMovie(data)
}

const selectMovie = async(movie) =>{
fetchMovies(movie.id)
setMovie(movie)
window.scrollTo(0,0)
}

const searchMovies = (e) => {
  e.preventDefault()
  fetchMovie(searchKey)
}

useEffect(()=>{
  fetchMovie()
}, [])

return(
<div className="central-container">


{/* videoReproductor trailer */}

{/* reproductor de video */}
<div>
  <main>
    {movie ? (
      <div
      className="viewtrailer"
      style={{
        backgroundImage: movie.backdrop_path !== null && movie.backdrop_path !== undefined
          ? `url("${Image_path}${movie.backdrop_path}")`
          : "none",
      }}  
      >
        {playing ? (
          <>
          {trailer && (
  <YouTube
    videoId={trailer.key}
    className="reproductor container"
    containerClassName={"youtube-container amru"}
    opts={{
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 1,
        controls: 0,
        cc_load_policy: 0,
        fs: 0,
        iv_load_policy: 0,
        modestbranding: 0,
        rel: 0,
        showinfo: 0,
            },
    
           }}
           />
          )}
           <button onClick={() => setPlaying(false)} className="boton">
            Close
            </button>
          </>
        ) : ( 
          <div className="container">
            <div>
              {trailer ? (
                <button
                className="boton"
                onClick={() => setPlaying(true)}
                type="button"
                >
                  Play Trailer
                </button>
              ) : (
                "sorry, no trailer available"
              )}
              <h1 className="text-white">{movie.title}</h1>
              <p className="text-white">{movie.overview}</p>
            </div>
            </div>
        )}
      </div>
    ) : null}
  </main>
</div>



<h2 className="trailer">Trailer Movies</h2>
<div className="buscador-container">
<form onSubmit={searchMovies} className="buscador">
  <input className="buscador-barra" placeholder="Buscar" type="text" onChange={(e) => setSearchKey(e.target.value)}></input>
  <button id="btn-buscar" className="btn">Search</button>
</form>
</div>



  <div className="contenedor">
{movies.map((movie) => (
  <div key={movie.id} className="contenedor-movies" onClick={() => {
    fetchMovies(movie.id)
  }}>
      <img src={`${ ulr_image + movie.poster_path}`} alt="" height={300} width={300}></img>
      <h4 className="text-movie">{movie.title}</h4>
    </div>
))}
  </div>
</div>

)
}

export default Funcionalidad; 