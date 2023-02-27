import { useEffect, useState } from "react";


export function TopGenres({tracks}){
    const [genres,setGenres] = useState([])
    useEffect(() => {
        if (tracks.length > 0){
            for (let track of tracks){
                console.log(track)
            }
        }
        
    }, [tracks])
}