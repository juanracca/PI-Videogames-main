const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Genre, Videogame} = require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl1 = await axios.get('https://api.rawg.io/api/games?key=cd87957d6ac34b8381b7f2030b23acec&page_size=40&page=1');
    const apiUrl2 = await axios.get('https://api.rawg.io/api/games?key=cd87957d6ac34b8381b7f2030b23acec&page_size=40&page=2');
    const apiUrl3 = await axios.get('https://api.rawg.io/api/games?key=cd87957d6ac34b8381b7f2030b23acec&page_size=40&page=3');
    let data1 = apiUrl1.data.results;
    let data2 = apiUrl2.data.results;
    let data3 = apiUrl3.data.results;

    let totalInfo = [...data1, ...data2, ...data3]
    const apiInfo1 = await totalInfo.map(el => {
        return {
            name: el.name,
            image: el.background_image,
            platforms: el.platforms.map(el => el.platform.name),
            id: el.id,
            rating: el.rating,
            released: el.released,
            genres: el.genres.map(el => el.name)
        };
    });
    console.log(apiInfo1)
    return apiInfo1;
};

const getDbInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
};

const getAllVideogames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    console.log(apiInfo)
    const videogamesInfo = apiInfo.concat(dbInfo);
    return videogamesInfo;
};

router.get('/videogames', async (req, res) => {
    const name = req.query.name;
    let videogamesTotal = await getAllVideogames();

    if(name){
        let videogameName = await videogamesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        videogameName.length ?
        res.status(200).send(videogameName) :
        res.status(404).send('Videogame was not found!');

    } else {
        res.status(200).send(videogamesTotal);
    };
});

router.get('/videogames/:id', async (req, res) => {
    const id = req.params.id;
    
    if(id.length > 5){
        var videogamesTotal = await getAllVideogames();
        let videogameId = await videogamesTotal.filter(el => el.id === id);
        videogameId.length ?
        res.status(200).send(videogameId[0]) :
        res.status(404).send('No se encuentra dicho id');
    };
    const gameDetails = await axios.get(`https://api.rawg.io/api/games/${id}?key=cd87957d6ac34b8381b7f2030b23acec`)
    const gameId = gameDetails.data;
    const gamesData = {
        name: gameId.name,
        description: gameId.description_raw,
        released: gameId.released,
        image: gameId.background_image,
        rating: gameId.rating,
        platforms: gameId.platforms.map(el => el.platform.name),
        genres: gameId.genres.map(el => el.name)
    };
    res.status(200).send(gamesData);
});

router.get('/genres', async (req, res) => {
    const genreApi = await axios.get(`https://api.rawg.io/api/genres?key=db5d960df49c48e7a2b0ac6dbb92505f`)
    const genreApiName = genreApi.data.results.map(el => el.name)
    
    genreApiName.forEach(el => {
        Genre.findOrCreate({
            where: {name: el}
        })
    })
    const allGenres = await Genre.findAll();
    res.send(allGenres)
    
});

router.post('/videogame', async (req, res) => {
    let {
        name,
            description,
            releaseDate,
            rating,
            img,
            platforms,
            genres
    } = req.body;

    try{
        let videogameCreated = await Videogame.create({
            name, releaseDate, platforms, rating, img, genres, description
        })
        
        let genreDb = await Genre.findAll({
            where: {name: genres}
        })

        videogameCreated.addGenre(genreDb)
        
        res.status(200).send('sd') 
    }
        
    catch(e){
        res.status(404).send('la pe')
    } 
    
})

router.get('/platforms', async(req, res) => {
    const platforms = await getAllVideogames();
    const platformsApi = platforms.map(el => el.platforms.map(el => el))

    const allPlatforms = [];

    for(let i = 0; i < platformsApi.length; i++){
        for(let j = 0; j < platformsApi[i].length; j++){
            allPlatforms.push(platformsApi[i][j])
        }
    }

    allPlatforms.sort()

    const allPlatformsCleaned = []
    
    for(let i = 0; i < allPlatforms.length; i++){
        if(allPlatforms[i] !== allPlatforms[i + 1]){
            allPlatformsCleaned.push(allPlatforms[i])
        }
    }

    res.send(allPlatformsCleaned)

})

module.exports = router;
