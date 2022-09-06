import axios from 'axios';

export function getVideogame(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/videogames');
        console.log(json.data)
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        });
    };
};

export function getGenres(){
    return async function(dispatch){
        var info = await axios.get('http://localhost:3001/genres', {

        });
        return dispatch({
            type: 'GET_GENRES',
            payload: info.data 
        });
    };
};

export function postVideogame(payload){
    return async function(dispatch){
        const res = await axios.post('http://localhost:3001/videogame', payload)
        return res;
    };
};

export function getDetail(id){
    return async function(dispatch){
        try{
            const detail = await axios.get('http://localhost:3001/videogames/' + id)
            return dispatch({
                type: 'GET_DETAILS',
                payload: [detail.data]
            })
        } catch(error){
            console.log(error)
        };
    };
};

export function getNameVideogames(payload){
    return async function(dispatch){
        try {
            var json = await axios.get('http://localhost:3001/videogames?name=' + payload);
            return dispatch ({
                type: 'GET_NAME_VIDEOGAMES',
                payload: json.data
            });
        }
        catch (error){
            alert('Videojuego no encontrado!');
        };
    };
};

export function filterVideogameByGenre(payload){
    return {
        type: 'FILTER_BY_GENRE',
        payload
    };
};

export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload
    };
};

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    };
}; 

export function filterByRating(payload){
    return {
        type: 'FILTER_BY_RATING',
        payload
    };
};
 
export function getPlatforms(){

    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/platforms');

        return dispatch({
            type: 'GET_PLATFORMS',
            payload: json.data
        })
    }
 }

export function clearDetailState(payload){
    return {
        type: 'CLEAR_DETAIL_STATE',
        payload
    }
}