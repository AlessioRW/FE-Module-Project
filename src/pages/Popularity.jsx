import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";
import '../styles/pages/popularity.scss';

export function Popularity(){
    const [songs, setSongs] = useState([])
    const {token} = useContext(Context)
    const [timeRange, setTimeRange] = useState('short_term')
    const [avgPopularity, setAvgPopularity] = useState(-1) //artist popularity
    const [byPopularity, setByPopularity] = useState([]) //artists ordered by populairty


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

    useEffect(() => { //calculate average artist popularity of top 50 songs
        if (songs.length > 0){
            let popularity = 0
            for (let song of songs){
                popularity += song.popularity
            }
            popularity = popularity/50
            setAvgPopularity(popularity)
            
            let orderedArtists = [{name: songs[0].artists[0].name, popularity: songs[0].popularity}] //tempary array for artists sorted by popularity
            let seenArtists = []
            for (let song of songs){
                if (!seenArtists.includes(song.artists[0].name)){
                    seenArtists.push(song.artists[0].name)
                    
                    for (let i = 0; i < orderedArtists.length; i++){
                        let checkSong =  orderedArtists[i]
                        if (checkSong.popularity >= song.popularity){
                            orderedArtists.splice(i, 0, {name: song.artists[0].name, popularity: song.popularity})
                            break
                        }
                    }
                }
            }
            console.log(orderedArtists)
        }
    }, [songs])


    return (
        <div className="page-popularity">
            <h1 className="title">See how popular your music taste is!</h1>
            <h2 className="desc">Based on your top 50 most listened to artists</h2>

            <div className="avg-popularity">
                <h2>The average popularity of the artists you most listen to is</h2>
                <h2 className="popularity">{avgPopularity}</h2>
                <h3>(0 = Least Popular 100 = most popular)</h3>
            </div>

            <div className="top">
                <div className="most-artists">
                    
                </div>
                    
                <div className="least-artists">

                </div>
            </div>
        </div>
    )
}