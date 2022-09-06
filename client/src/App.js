import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage'
import Home from './components/Home';
import VideogameCreate from './components/VideogameCreate';
import Detail from './components/Detail';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path = '/' element = {<LandingPage/>}/>
          <Route path = '/videogames' element = {<Home/>}/>
          <Route path = '/videogame' element = {<VideogameCreate/>}/>
          <Route exact path = '/videogames/:id' element = {<Detail/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
