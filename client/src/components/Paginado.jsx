import React from "react";
import '../styles/Paginado.modules.css'

export default function Paginado({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers = [];

    for(let i = 1; i<Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumbers.push(i);
    };

    return(
        <nav className='nav'>
            <ul className = 'paginado'>
                { pageNumbers.map(number =>{
                    return( 
                        <label key = {number}>
                        <button className = 'numberPaginado' key={number} onClick={() => paginado(number)}>{number}</button>
                        </label>
                    )
                    })}
            </ul>
        </nav>
    );
};