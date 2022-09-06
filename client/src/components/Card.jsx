// RENDERIZA CADA VIDEOJUEGO
import React from "react";
import '../styles/Card.modules.css'

export default function Card({ name, image, genres, rating }){ 
    return(
        <main className='mainC'>
            <h3 className='name'>{name}</h3>
            <h5 className='genres'>{genres}</h5>
            <h5>{rating}</h5>
            <img className='img' src={image} alt='img not found' width='200px' height='250px'/>
        </main>
    );
};