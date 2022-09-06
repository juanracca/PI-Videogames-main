// PAGINA INICIAL

import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/LandingPage.modules.css'



export default function LandingPage(){
    return(
        <div className='divLP'>
            <h1 className='Title'>HOUSE OF VIDEOGAMES</h1>
            <Link to = '/videogames'>
                <button className='Boton'>ENTER</button>
            </Link>
        </div>
    );
};