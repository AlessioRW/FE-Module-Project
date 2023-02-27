import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";
import '../styles/pages/popularity.scss';

export function Popularity(){
    const [songs, setSongs] = useState([])
    const {token} = useContext(Context)
    const [timeRange, setTimeRange] = useState('short_term')
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


    return (
        <div className="page-popularity">
            <h1 className="title">See how popular your music taste is</h1>
        </div>
    )
}