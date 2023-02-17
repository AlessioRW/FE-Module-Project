import '../styles/components/myPlaylists.scss'

export function MyPlaylists({playlists}){

    return (
        <div className="my-playlists"> {/*sorry for the awful div class names  */}
            <h2 className="title">My Playlists</h2>
            <div className="playlists">
                {playlists.map((playlist) => {
                    // console.log(playlist)

                    let playlistName = playlist.name
                    if (playlistName.length > 20){
                        playlistName = playlistName.substring(0,20) + '...'
                    }

                    return (
                        <div className="playlist-container">
                            <img className="image" src={playlist.images[0].url}/>
                            <h2 className="name">{playlistName}</h2>

                            <h2 className="track-num">{playlist.tracks.total} songs</h2>
                        </div>
                    )
                })}
            </div>
            
    </div>
    )
}