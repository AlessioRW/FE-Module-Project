import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Playlists } from './pages/Playlists';
import { Popularity } from './pages/Popularity';
import { ViewPlaylist } from './pages/ViewPlaylist';

export const Context = createContext()

function App() {
  const [profileLoaded, setProfileLoaded] = useState(false)
  const [token, setToken] = useState('')
  const [playlistFilter, setPlaylistFilter] = useState('')
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if (!token && hash) {
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]

      window.location.hash = ''
      window.localStorage.setItem('token', token)
    }

    setToken(token)
  }, [])

  function logout() {
    setToken('')
    window.localStorage.removeItem('token')
  }


  return (
    <Context.Provider value={{ token: token, profileLoaded: profileLoaded, setProfileLoaded: setProfileLoaded }}>
      <div className="App"> -
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/playlists/' element={<Playlists />} />
            <Route exact path='/playlist/:id' element={<ViewPlaylist />} />
            <Route exact path='/popularity' element={<Popularity />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Context.Provider>

  );
}
export default App;
