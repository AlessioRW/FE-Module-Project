import { useContext, useEffect, useState } from "react"
import { TokenContext } from "../App"
import '../styles/components/button.scss'
import '../styles/main.scss'
import '../styles/pages/home.scss'

const CLIENT_ID = "d403f28e99054b44b0bd98298f309f28"
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"
const SCOPE = 'user-top-read'
const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`


export function Home(){
    const [profile, setProfile] = useState()
    const [topSongs, setTopSongs] = useState([])
    const [topArtists, setTopArtists] = useState([])
    const [timeRange, setTimeRange] = useState('short_term')
    const token = useContext(TokenContext)
    useEffect(() => {
        if (token){
            // console.log(token)
            const header = {
                "Authorization": `Bearer ${token}`
              }
            fetch('https://api.spotify.com/v1/me', {headers: header}).then(res => res.json()).then(data => {setProfile(data)})
            fetch(`https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=${timeRange}`, {headers:header}).then(res => res.json()).then(data => {setTopSongs(data.items)})
            fetch(`https://api.spotify.com/v1/me/top/artists?limit=5&time_range=${timeRange}`, {headers:header}).then(res => res.json()).then(data => {setTopArtists(data.items)})
        }
    }, [token])



    if (!token){ //user is not logged in
        return(


            <div className='page-home-login'> 

                <div className="info-section">
                    <h2 className="title" >Welcome to SoundStats</h2>

                </div>
                <button onClick={() => {window.location.href=loginUrl}} className="c-btn">Login</button>
            </div>
        )
    } else {
        if (profile){
            return (
                <div className="page-home">
                    <h1 className="username">{profile.display_name}</h1>
                    <img className="profile-picture" src={profile.images[0].url}/>

                    <div className="top">
                        <div className="top-songs">
                            <h2 className="title">Top Songs</h2>
                            {topSongs.map((song) => {
                                //console.log(song.album.images[0].url)
                                const artists = []
                                for (let artist of song.artists){
                                    artists.push(artist.name)
                                }

                                let songName = song.name
                                if (song.name.length > 40){
                                    songName = song.name.substring(0,40) + '...'
                                }
                        
                                return (
                                    <div className="song-container">
                                        <img className="album-cover" src={song.album.images[0].url}/>
                                        <h2 className="song-title">{songName}</h2>
                                        <h3 className="artist-list"> by {artists.join(', ')}</h3>
                                    </div>
                                )
                            })}
                        </div>
                        
                        <div className="top-artists">
                            <h2 className="title"> Top Artists</h2>
                            <div className="artists">
                                {topArtists.map((artist) => {

                                    return (
                                        <div className="artist-container">
                                            <h2 className="name">{artist.name}</h2>
                                            <img className="image" src={artist.images[0].url}/>
                                                
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </div>                    
                </div>
            )
        }
        
    }
    
}