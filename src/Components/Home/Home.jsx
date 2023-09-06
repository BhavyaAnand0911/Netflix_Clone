import React from 'react'
import "./Home.scss"

const Card = ({image}) => {
  return (
    <img className='card' src={image} alt='coverImage'></img>
  );
};

const Row = ({ title, arr = [{
  image:"https://stat4.bollywoodhungama.in/wp-content/uploads/2016/03/ZNMD-Poster-Feature-306x393.jpg"
}]}) => {
  return (
    <div className='row'>
      <h2>
        {title}
      </h2>
      <div>
        {
          arr.map((item) => 
            <Card image={item.image}/>
          )
          }
      </div>
    </div>
  );
}

const Home = () => {
  return (
      <section className="home">
        <div className="banner">
      </div>
      <Row title={"Popular on NetFlix"}/> 
      <Row title={"Movies"}/> 
      <Row title={"TV Shows"}/> 
      <Row title={"Recently Viewed"}/> 
      <Row title={"My List"}/> 
      </section>
  )
}

export default Home
