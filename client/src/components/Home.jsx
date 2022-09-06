// RUTA PRINCIPAL
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogame, filterVideogameByGenre, filterCreated, orderByName, getGenres, filterByRating } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import '../styles/Home.modules.css'


export default function Home(){

    const dispatch = useDispatch(); 
    const allVideogames = useSelector((state) => state.videogames); 
    const genres = useSelector((state) => state.genres);
    const [, setOrder] = useState(''); 
    const [currentPage, setCurrenPage] = useState(1);
    const [videogamesPerPage, ] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage; 
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
                                                                                                

    const paginado = (pageNumber) => {
        setCurrenPage(pageNumber);
    };

    console.log(allVideogames)
    console.log(genres)

    useEffect(() => {
        dispatch(getVideogame()); 
        dispatch(getGenres()); 
    }, [dispatch]);

    function handleClick(e){  
    e.preventDefault();
    dispatch(getVideogame());
    };

    function handleFilterGenre(e){
        dispatch(filterVideogameByGenre(e.target.value)); 
    };

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value)); 
    };

    function handleSortRating(e){
        e.preventDefault();
        dispatch(filterByRating(e.target.value));
        setCurrenPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    };

    function handleSort(e){  
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrenPage(1);
        setOrder(`Ordenado ${e.target.value}`); 
    };
        return(
            <div className='divH'>
            <Link to = '/videogame'>
                <button className='createH'>Create your videogame</button>
            </Link>
            <h1 className='titleH'>VIDEOGAMES</h1>
            <button className='reloadButton' onClick={e => {handleClick(e)}}>Reload videogames</button>
                    <SearchBar/>
                <select className='filterName' onChange={e => {handleSort(e)}}>
                    <option value='All'>Name</option>
                    <option value='asc'>Ascendente</option>
                    <option value='dsc'>Descendente</option>
                </select>
                <select className='filterGenre'  onChange={e => {handleFilterGenre(e)}}>
                    <option value='All'>Genre</option>
                    {
                        genres.map(el => {
                            return(
                                <option value={el.name} key={el.id}>{el.name}</option>
                            );
                        })
                    }
                </select>
                <select className='filterCreated' onChange={e => {handleFilterCreated(e)}}>
                    <option value='All'>All</option>
                    <option value='exist'>Exist</option>
                    <option value='created'>Created</option>
                </select>
                <select className='filterRating' onChange={e => {handleSortRating(e)}}>
                    <option value='All'>Rating</option>
                    <option value='higher'>Higher</option>
                    <option value='lower'>Lower</option>
                </select>
                <Paginado
                className='paginadoH'
                videogamesPerPage = {videogamesPerPage}
                allVideogames = {allVideogames.length}
                paginado = {paginado}
                />
            {
                currentVideogames?.map(el => {
                    return(
                        <div className='Card'>
                            <Link to={'/videogames/' + el.id}>
                                <Card 
                                name={el.name} 
                                genres={!el.createInDb ? el.genres.map(el => `${el} `) : el.genres.map(el => `${el.name}  `)} 
                                image={el.image ? el.image : el.img} 
                                key={el.id} 
                                rating={el.rating}/>
                            </Link>
                        </div>
                    );
                }) 
            }    
            <Paginado
                videogamesPerPage = {videogamesPerPage}
                allVideogames = {allVideogames.length}
                paginado = {paginado}
                />
           
        </div>
    );
};
