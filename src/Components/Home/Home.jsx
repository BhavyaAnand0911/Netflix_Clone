import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import "./Home.scss"
import { Link } from 'react-router-dom';
import { BiPlay } from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'

const apiKey = 'df2403893c071f3b67cfd6906ff6bc83'
const url = 'https://api.themoviedb.org/3'
const upcoming = 'upcoming'
const imgUrl = 'https://image.tmdb.org/t/p/original'
const nowPlaying = 'now_playing'
const popular = 'popular' 
const topRated = 'top_rated'



// fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

const Card = ({image}) => {
  return (
    <img className='card' src={image} alt='coverImage'></img>
  );
};

const Row = ({ title, arr = []}) => {
  return (
    <div className='row'>
      <h2>
        {title}
      </h2>
      <div>
        {
          arr.map((item,index) => 
            <Card key={ index} image={`${imgUrl}/${item.poster_path}`}/>
          )
          }
      </div>
    </div>
  );
}

const Home = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genreMovies, setgenreMovies] = useState([]);

  //everytime the page is reloaded or mounted useEffect is called.
  useEffect(() => {
    const fetchUpcoming = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
      setUpcomingMovies(results);
    }
    const fetchNowPlaying = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
      setNowPlayingMovies(results);
    }
    const fetchPopular = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setPopularMovies(results);
    }
    const fetchTopRated = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
      setTopRatedMovies(results);
    }
    const getGenres = async () => {
      const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setgenreMovies(genres);
    }
    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    getGenres();
  },[])

  return (
      <section className="home">
      <div className="banner" style={{
          backgroundImage: popularMovies[16]?`url(${`${imgUrl}/${popularMovies[16].backdrop_path}`})`:'rgb(14, 14, 14)'
      }}>
        {
          popularMovies[16] && (
            <h1>
              {popularMovies[16].original_title}
            </h1>
          )
        }
        {
          popularMovies[16] && (
            <p>
              {popularMovies[16].overview}
            </p>
          )
        }
        <div>
          <button>Play <BiPlay/></button>
        <button>My List<AiOutlinePlus/></button>
        </div>
      </div>
      <Row title={"Now Playing"} arr={nowPlayingMovies}/> 
      <Row title={"Upcoming Movies"} arr={upcomingMovies}/> 
      <Row title={"Popular"} arr={popularMovies}/> 
      <Row title={"Top Rated"} arr={topRatedMovies} /> 
      <div className="genreBox">
        {
          genreMovies.map((item) => 
            <Link key={item.id} to={ `/genre/${item.id}`}>{item.name}</Link>
          )
        }
      </div>
    </section>
  )
}

export default Home
