
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";
import '../styles/pages/popularity.scss';

export function Popularity(){
    const [songs, setSongs] = useState([])
    const {token} = useContext(Context)
    const [timeRange, setTimeRange] = useState('short_term')
    const [avgPopularity, setAvgPopularity] = useState()
    const [byPopularity, setByPopularity] = useState([]) 

    const navigate = useNavigate()
    
    const header = {
        "Authorization": `Bearer ${token}`
    }
    
    useEffect(() => {
        if (token){
            fetch(`https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${timeRange}`, {headers:header}).then(res => res.json()).then(data => {setSongs(data.items)})
        } else{
            navigate('/')
        }
    }, [token, timeRange])

    useEffect(() => { //calculate average popularity of top 50 songs
        if (songs.length > 0){
            let popularity = 0
            for (let song of songs){
                popularity += song.popularity
            }
            popularity = popularity/50
            setAvgPopularity(popularity)
            
            let orderedSongs = [{name: songs[0].name, popularity: songs[0].popularity, img:songs[0].album.images[0].url, artists: songs[0].artists}] //temp array for songs sorted by popularity
            let usedName = orderedSongs[0].name
            for (let song of songs){
                for (let i = 0; i < orderedSongs.length; i++){
                    let checkSong =  orderedSongs[i]
                    if (checkSong.popularity >= song.popularity){
                        orderedSongs.splice(i, 0, {name: song.name, popularity: song.popularity, img:song.album.images[0].url, artists: song.artists})
                        break
                    }
                }
            }

            for (let i = 0; i < orderedSongs.length; i++){
                if (orderedSongs[i].name === usedName){
                    orderedSongs.pop(i)
                    break
                }
            }
            setByPopularity(orderedSongs)
        }
    }, [songs])


    return (
        <div className="page-popularity">
            <h1 className="title">See how popular your music taste is!</h1>
            <h2 className="desc">Based on your top 50 most listened to songs over the past...</h2>

            <div className="time-btns">
                        <button 
                            className={timeRange === 'short_term' ? 'c-btn btn-left' : "c-btn btn-unchecked btn-left"}
                            onClick={() => {setTimeRange('short_term')}}
                            test-id='short-term-btn'
                        >
                            4 Weeks
                        </button> 

                        
                        <button 
                            className={timeRange === 'medium_term' ? 'c-btn' : "c-btn btn-unchecked"}
                            onClick={() => {setTimeRange('medium_term')}}
                            test-id='med-term-btn'
                            >
                                6 Months
                        </button> 


                        <button 
                            className={timeRange === 'long_term' ? 'c-btn btn-right' : "c-btn btn-unchecked btn-right"}
                            onClick={() => {setTimeRange('long_term')}}
                            test-id='long-term-btn'
                            >
                                All Time
                        </button> 
                    </div>

            <div className="avg-popularity">
                <h2>The average popularity of the 50 songs you listen to most is...</h2>
                <h2 className="popularity" test-id="popularity-number">{avgPopularity}</h2>
                <h3>(0 = Least Popular 100 = most popular)</h3>
            </div>

            <div className="top">
                <div className="most-popular">
                    <h2 className="header">Most Popular</h2>
                    {byPopularity.slice(0).reverse().map((song,i) => {
                        if (i < 5){

                            const artists = []
                            for (let artist of song.artists){
                                artists.push(artist.name)
                            }

                            let songName = song.name
                            if (song.name.length > 25){
                                songName = song.name.substring(0,25) + '...'
                            }
                            
                            return (
                                <div className="song-container" test-id="most-popular">
                                    <img src={song.img} alt="album cover" className="cover" />
                                    <h2 className="title">{songName}</h2>
                                    <h2 className="artists">by {artists.join(', ')}</h2>
                                </div>
                            )
                        }
                    })}
                </div>
                
                

                <div className="least-popular">
                    <h2 className="header">Least Popular</h2>
                    {byPopularity.map((song,i) => {
                            if (i < 5){

                                const artists = []
                                for (let artist of song.artists){
                                    artists.push(artist.name)
                                }

                                let songName = song.name
                                if (song.name.length > 25){
                                    songName = song.name.substring(0,25) + '...'
                                }

                                return (
                                    <div className="song-container">
                                        <h2 className="artists">by {artists.join(', ')}</h2>
                                        <h2 className="title">{songName}</h2>
                                        <img src={song.img} alt={`album cover for ${song.name}`} className="cover" />
                                    </div>
                                )
                            }
                     })}
                </div>
            </div>
        </div>
    )
}