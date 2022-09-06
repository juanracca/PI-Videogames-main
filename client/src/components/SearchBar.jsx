// INPUT DE BUSQUEDA
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions";
import '../styles/SearchBar.modules.css'

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameVideogames(name)); // el name es lo que esta escribiendo el usuario
    };

    return (
        <div className='divSearch'>
            <input className='inputSearch' type='text' placeholder='Buscar...' onChange={e => {handleInputChange(e)}}/>
            <button className='buttonSearch' type='sumbit' onClick={e => {handleSubmit(e)}}>Search</button>
        </div>
    );
};