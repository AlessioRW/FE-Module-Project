import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../App";
import '../styles/pages/ViewPlaylist.scss';


export function ViewPlaylist(){
    const [playlist, setPlaylist] = useState(null)
    const {token} = useContext(Context)
    const {id} = useParams()
    const [tracks,setTracks] = useState([])
    const navigate = useNavigate()
    
    const header = {
        "Authorization": `Bearer ${token}`
    }

    useEffect(() => {
        if (token){
            fetch(`https://api.spotify.com/v1/playlists/${id}`, {headers: header}).then(res => res.json()).then(data => setPlaylist(data))
        }
        else{
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (playlist){
            let url = `https://api.spotify.com/v1/playlists/${id}/tracks?offset=0&limit=100`
            fetch(url, {headers: header}).then(res => res.json()).then(data => {
                const newTracks = [...tracks, ...data.items]
                setTracks(newTracks)
            })
        }
    }, [playlist])


    function loadMore(){
        let url = `https://api.spotify.com/v1/playlists/${id}/tracks?offset=${tracks.length}&limit=100`
        fetch(url, {headers: header}).then(res => res.json()).then(data => {
            const newTracks = [...tracks, ...data.items]
            setTracks(newTracks)
        })
    }

    if (playlist){
        return (
            <div className="page-view-playlist">
                {/* {console.log(playlist)} */}

                <div className="main-info">
                    <img alt='playlist cover' src={playlist.images[0].url} className="cover" />
                    <h2 className="name">{playlist.name}</h2>
                    <h2 className="length">{playlist.tracks.total} tracks</h2>
                    <h2 className="desc">{playlist.description}</h2>
                </div>

                <div className="songs">
                    {tracks.map((song) => {
                        song = song.track
                        console.log(song)

                        const artistList = []
                        for (let artist of song.artists){
                            artistList.push(artist.name)
                        }
                        let artists = artistList.join(',')


                        let songName = song.name
                        if (song.name.length > 40){
                            songName = song.name.substring(0,40) + '...'
                        }

                        return (
                            <div key={song.id} className="song-container">
                                <div className="song-info">
                                    <img alt='album cover' className='album-cover' src={song.album.images[0].url} />
                                    <h2 className="name">{songName}</h2>
                                    <h2 className="artists">{artists}</h2>
                                </div>
                                <div className="bar">.</div>
                            </div>
                            
                        )
                    })}
                    {tracks.length < playlist.tracks.total && <button
                        onClick={() => {loadMore()}}
                        className="more-btn c-btn">Load More
                    </button>}
                </div>
            </div>
        )}
}
