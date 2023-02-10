import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';

export const TokenContext = createContext()

function App() {
  const [token, setToken] = useState('')
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
    <TokenContext.Provider value={token}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TokenContext.Provider>

  );
}

export default App;
