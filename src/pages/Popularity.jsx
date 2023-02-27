import { useEffect, useState } from "react";


export function TopGenres(){
    const [songs, setSongs] = useState([])
    const {token} = useContext(Context)
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
    }, [token])

    return (
        <div className="page-popularity">
            
        </div>
    )
}