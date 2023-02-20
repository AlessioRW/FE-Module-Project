import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../App";

export function ViewPlaylist(){
    const [playlist, setPlaylist] = useState(null)
    const {token} = useContext(Context)

    const {id} = useParams()
    
    const header = {
        "Authorization": `Bearer ${token}`
    }

    useEffect(() => {
        fetch(`https://api.spotify.com/v1/playlists/${id}`, {headers: header}).then(res => res.json()).then(data => console.log(data))
    }, [])

    return (
        <div className="page-view-playlist">

        </div>
    )
}