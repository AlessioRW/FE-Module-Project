import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";
import { MyPlaylists } from "../components/MyPlaylists";
import '../styles/pages/playlists.scss';

export function Playlists(){
    const [playlists, setPlaylists] = useState([])
    const [profile, setProfile] = useState()
    const {token} = useContext(Context)
    const navigate = useNavigate()
    
    const header = {
        "Authorization": `Bearer ${token}`
    }
    
    useEffect(() => {
        if (token){
            fetch('https://api.spotify.com/v1/me', {headers: header}).then(res => res.json()).then(data => {setProfile(data)})
        } else{
            navigate('/')
        }
    }, [token])

    useEffect(() => { //seperate use effect which requires data from first use effect
        if (profile){
            fetch(`https://api.spotify.com/v1/users/${profile.id}/playlists?limit=50`, {headers:header}).then(res => res.json()).then(data => {setPlaylists(data.items)})
        }
    }, [profile])

    return (

        <div className="page-playlists">
            <div className="info">
                <p>Click the name of any of your playlists to see the overview of it</p>
            </div>
            <MyPlaylists playlists={playlists}/>
        </div>
    )
}

