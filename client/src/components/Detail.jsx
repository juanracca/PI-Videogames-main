// RUTA DE DETALLE DEL VIDEOJUEGO
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetailState } from "../actions";
import '../styles/Detail.modules.css'

export default function Detail(props){
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getDetail(id))
        return () => {
            dispatch(clearDetailState())
        }
    },[dispatch, id]);

    const myVideogame = useSelector((state) => state.detail);

    return(
        <div className='divDetailBack'>
            <h1 className='comaPrinci'>'</h1>
            {
                myVideogame.length > 0 ?
                <div className='divDetail'>
            <Link to='/videogames'>
                <button className='buttonDetail1'>Back</button>
            </Link>      
                    <h1 className='nameDetail'>{myVideogame[0].name}</h1>
                    <div className='divImgDesc'>
                    <img className='imgDetail' alt='' src={myVideogame[0].img ? myVideogame[0].img : myVideogame[0].image} width='900px' height='700px'/>
                    </div>
                    <h2 className='ratingDetail'>{myVideogame[0].rating}</h2>
                    <h2 className='releasedDetail'>{myVideogame[0].released ? myVideogame[0].released : myVideogame[0].releaseDate}</h2>
                    <h2 className='platformsDetail'>{myVideogame[0].platforms.map(el => `${el}, `)}</h2>
                    <h2 className='genresDetail'>{!myVideogame[0].createInDb ? myVideogame[0].genres.map(el => `${el}, `) : myVideogame[0].genres.map(el => `${el.name}, `)}</h2>
                    <h2 className='descriptionDetail'>{myVideogame[0].description}</h2>
                </div> :
                <p className='loading'>Loading...</p>
            }
            <h1 className='comaFinal'>'</h1>
        </div>
    );
};
