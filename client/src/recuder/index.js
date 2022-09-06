
const initialState = {
    videogames : [],
    videogamesCopy: [],
    genres: [],
    detail: []
};

function rootReducer(state = initialState, action) {
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                videogamesCopy: action.payload
            };
        case 'GET_NAME_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload
            };
        case 'GET_DETAILS': 
            return {
                ...state,
                detail: action.payload
            };
        case 'GET_GENRES':
            return {
                ...state,
                // genres: [{name:'juan', id: 1}, {name: 'carlos', id: 2}]
                genres: action.payload
            };
        case 'POST_VIDEOGAME':
            return {
                ...state,
            };
        case 'FILTER_BY_GENRE':
            const allVideogames = state.videogamesCopy;
            const videogamesFilteredByGenre = action.payload === 'All' ? allVideogames : allVideogames.filter(el => el.genres[0] === action.payload || el.genres[1] === action.payload || el.genres[2] === action.payload || el.genres[3] === action.payload);
            return {
                ...state,
                videogames: videogamesFilteredByGenre
            };
        case 'FILTER_CREATED': 
            const allVideogames2 = state.videogamesCopy;
            const createdFilter = action.payload === 'created' ? allVideogames2.filter(el => el.createInDb) : allVideogames2.filter(el => !el.createInDb);
            return {
                ...state,
                videogames: action.payload === 'All' ? allVideogames2 : createdFilter 
            };
        case 'ORDER_BY_NAME':
            const sortedArr = action.payload === 'asc' ?
                state.videogames.sort(function(a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        console.log(a.name)
                        return 1;
                    };
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return -1;
                    };
                    return 0;
                }) :
                state.videogames.sort(function(a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return -1;
                    };
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return 1;
                    };
                    return 0;
                });
            return {
                ...state,
                videogames: action.payload === 'All' ? state.videogames : sortedArr
            };
        case 'FILTER_BY_RATING':
            const sortedArr2 = action.payload === 'higher' ?
                state.videogames.sort(function(a, b){
                    if(a.rating > b.rating){
                        return -1;
                    };
                    if(b.rating > a.rating){
                        return 1;
                    };
                    return 0;
                }) :
                state.videogames.sort(function(a, b){
                    if(a.rating > b.rating){
                        return 1;
                    };
                    if(b.rating > a.rating){
                        return -1;
                    };
                    return 0;
                });
                console.log(sortedArr2)
            return {
                ...state,
                videogames: action.payload === 'All' ? state.videogames : sortedArr2
            };
        case 'GET_PLATFORMS':
            return {
                ...state,
                platforms: action.payload
            };
        case 'CLEAR_DETAIL_STATE':
            return {
                ...state,
                detail: []
            };
        default:
            return {...state};
    };
};

export default rootReducer;