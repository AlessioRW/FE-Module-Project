import { useContext, useEffect, useState } from "react"
import { Context } from "../App"
import logo from '../common/images/logo.png'
import { MyPlaylists } from "../components/MyPlaylists"
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
    const [playlists, setPlaylists] = useState([])
    const {token, setProfileLoaded} = useContext(Context)

    const header = {
        "Authorization": `Bearer ${token}`
    }
      
    useEffect(() => {
        if (token){
            // console.log(token)
            
            fetch('https://api.spotify.com/v1/me', {headers: header}).then(res => res.json()).then(data => {setProfile(data)})
            fetch(`https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=${timeRange}`, {headers:header}).then(res => res.json()).then(data => {setTopSongs(data.items)})
            fetch(`https://api.spotify.com/v1/me/top/artists?limit=5&time_range=${timeRange}`, {headers:header}).then(res => res.json()).then(data => {setTopArtists(data.items)})
            setProfileLoaded(true)
        }
    }, [token,timeRange])

    useEffect(() => { //seperate use effect which requires data from first use effect
        if (profile){
            fetch(`https://api.spotify.com/v1/users/${profile.id}/playlists?limit=50`, {headers:header}).then(res => res.json()).then(data => {setPlaylists(data.items)})
        }
    }, [profile,timeRange])



    if (!token){ //user is not logged in
        return(


            <div className='home not-login'> 
                <img src={logo} alt="" className="logo" />
                <div className="info-section">
                    <h2 className="title" >Welcome to SoundStats</h2>
                    <p className="desc">Click the login button to link your account through the Spotify API with this app so you can view your account analytics</p>

                </div>
                <button onClick={() => {window.location.href=loginUrl}} className="c-btn">Login</button>
            </div>
        )
    } else {
        if (profile){
            // console.log(profile)
            return (
                <div className="home logged-in">

                <div className="bar-horizontal">.</div>

                    <div className="user-info">
                        <h1 className="username">{profile.display_name}</h1>
                        <img className="profile-picture" src={profile.images[0].url}/>
                    </div>

                    
                    <div className="time-btns">
                        <button 
                            className={timeRange === 'short_term' ? 'c-btn btn-left' : "c-btn btn-unchecked btn-left"}
                            onClick={() => {setTimeRange('short_term')}}
                        >
                            4 Weeks
                        </button> 

                        
                        <button 
                            className={timeRange === 'medium_term' ? 'c-btn' : "c-btn btn-unchecked"}
                            onClick={() => {setTimeRange('medium_term')}}
                            >
                                6 Months
                        </button> 


                        <button 
                            className={timeRange === 'long_term' ? 'c-btn btn-right' : "c-btn btn-unchecked btn-right"}
                            onClick={() => {setTimeRange('long_term')}}
                            >
                                All Time
                        </button> 
                    </div>
                   

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
                                    <div key={song.id} className="song-container">
                                        <img className="album-cover" src={song.album.images[0].url}/>
                                        <h2 className="song-title">{songName}</h2>
                                        <h3 className="artist-list"> by {artists.join(', ')}</h3>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="bar-vertical">.</div>
                        
                        <div className="top-artists">
                            <h2 className="title"> Top Artists</h2>
                            <div className="artists">
                                {topArtists.map((artist) => {

                                    return (
                                        <div key={artist.id} className="artist-container">
                                            <h2 className="name">{artist.name}</h2>
                                            <img className="image" src={artist.images[0].url}/>
                                                
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </div>


                    <MyPlaylists playlists={playlists}/>

                    <div className="bar-horizontal">.</div>
                    
                    
                                     
                </div>
            )
        }
        
    }
    
}