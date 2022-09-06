// RUTA DE CREACION DE VIDEOJUEGOS
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postVideogame, getGenres, getPlatforms } from '../actions';
import { useDispatch, useSelector } from "react-redux";
import '../styles/VideogameCreate.modules.css'

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Complete the name before creating the game'
    } else if(!input.description){
        errors.description = 'Complete a description before creating the game'
    } else if(!input.releaseDate){
        errors.releaseDate = 'Complete the release date before creating the game'
    } else if(!input.rating){
        errors.rating = 'add the rating before creating the game'
    } else if(!input.img){
        errors.img = 'Add an image before creating the game'
    };
    return errors;
};

export default function VideogameCreate(){
    const platforms = useSelector((state) => state.platforms);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const genres = useSelector((state) => state.genres);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({ // estado del formulario
        name: '',
        description: '',
        releaseDate: '',
        rating: '',
        img: '',
        platforms: [],
        genres: []
    });

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
    }, [dispatch]);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    function handleSelectPlatforms(e){
        if(input.platforms.length === 0){
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        }
        for(let i =0; i < input.platforms.length; i++){
            if(input.platforms[i] === e.target.value){
                return(
                    alert(`The platform "${e.target.value}" has already been selected`)
                )
            }
            else
            {
                setInput({
                    ...input,
                    platforms: [...input.platforms, e.target.value]
                })
            }
        }
    }

    function handleSelect(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        });
    };

    function handleClick(e){
        if(input.name.length === 0){
            alert('Complete the name before creating the game')
            e.preventDefault();
        }
        else if(input.releaseDate.length === 0){
            alert('Complete the release date before creating the game')
            e.preventDefault();
        }
        else if(input.platforms.length === 0){
            alert('Add the platforms before creating the game')
            e.preventDefault();
        }
        else if(input.rating.length === 0){
            alert('add the rating before creating the game')
            e.preventDefault();
        }
        else if(input.img.length === 0){
            alert('Add an image before creating the game')
            e.preventDefault();
        }
        else if(input.genres.length === 0){
            alert('Add the genres before creating the game')
            e.preventDefault();
        }
        else if(input.description.length === 0){
            alert('Complete a description before creating the game')
            e.preventDefault();
        }
        
        else{
        e.preventDefault();
        dispatch(postVideogame(input))
        alert('The game has been created!')
        setInput({
            name: '',
            releaseDate: '',
            platforms: [],
            rating: '',
            img: '',
            genre: [],
            description: ''
        })
        navigate('/videogames')}
    }

    function handleDelete(e){
        e.preventDefault();
        setInput({
            ...input,
            genres: input.genres.filter(el => el !== e.target.name)
        });
    };

    function handleDeletePlatforms(e){
        e.preventDefault();
        setInput({
            ...input,
            platforms: input.platforms.filter(el => el !== e.target.name)
        })
    }

    return(
        <div className='divVideoCreate'>
            <Link to='/videogames'>
                <button className='buttonBackCreate'>Back</button>
            </Link>
            <h1 className='titleVideoCreate'>Create your videogame!</h1>
            <form className='formulario'>
                <div className='divFormCreate'>
                    <label className='nameCreate'>Name:</label>
                    <input className='inputNameCreate' type='text' value={input.name} name='name' onChange={e => handleChange(e)}/>{errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div className='divFormCreate'>
                    <label className='descCreate'>Description:</label>
                    <input className='inputDescCreate' type='text' value={input.description} name='description' onChange={e => handleChange(e)}/>{errors.description && (
                        <p className='error'>{errors.description}</p>
                    )}
                </div>
                <div className='divFormCreate'>
                    <label className='releasedCreate'>Release date:</label>
                    <input className='inputReleasedCreate' type='text' value={input.releaseDate} name='releaseDate' onChange={e => handleChange(e)}/>{errors.releaseDate && (
                        <p className='error'>{errors.releaseDate}</p>
                    )}
                </div>
                <div className='divFormCreate'>
                    <label className='ratingCreate'>Rating:</label>
                    <input className='inputRatingCreate' type='text' value={input.rating} name='rating' onChange={e => handleChange(e)}/>{errors.rating && (
                        <p className='error'>{errors.rating}</p>
                    )}
                </div>
                <div className='divFormCreate'>
                    <label className='imageCreate'>Image:</label>
                    <input className='inputImageCreate' type='text' value={input.img} name='img' onChange={e => handleChange(e)}/>{errors.img && (
                        <p className='error'>{errors.img}</p>
                    )}
                </div>
                <div className='divFormCreate' >
                    <label className='platformsCreate'>Platforms: 
                        <select className='selectPlatformsCreate' onChange={e => handleSelectPlatforms(e)}>
                        <option>Platforms</option>
                            {platforms?.map(el => {
                                return (
                                    <option value={el} key={input.platforms.indexOf(el)}>{el}</option>
                                )
                            })}
                        </select>
                    </label>
                </div>
                {input.platforms.map(el => 
                    <div key={el}>
                        <p>{el}</p>
                        <button className='buttonX' name={el} onClick={(e) => {handleDeletePlatforms(e)}}>X</button>
                    </div>
                )}
                <div className='divFormCreate'>
                    <label className='genresCreate'>Genres:
                        <select className='selectGenresCreate' onChange={e => {handleSelect(e)}}>
                        <option>Genres</option>
                            {genres.map(el => (
                                <option value={el.name}>{el.name}</option>
                            ))}
                        </select>
                        {input.genres.map(el => 
                            <div key={el}>
                                <p>{el}</p>
                                <button className='buttonX' name={el} onClick={(e) => {handleDelete(e)}}>X</button>
                            </div>
                        )}
                        </label>
                </div>
                <div>
                    <button className='buttonCreate' type='submit' onClick={e => {handleClick(e)}}>CREATE</button>
                </div>
            </form>
        </div>
    );
};