import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../App";
import logo from '../common/images/logo.png';
import '../styles/components/navbar.scss';

export function Navbar(){
    const {profileLoaded, token} = useContext(Context)
    const navigate = useNavigate()

    return (
        <div className="navbar">
            
            <div className="logo-container">
                <img src={logo} alt="bass clef with sound stats following" 
                    onClick={() => {navigate('/')}}
                    />
            </div>

            <div className="nav-items">
               {profileLoaded && <div className="nav-item">
                    <Link to='/' className="link" >Home</Link>
               </div>}

               {profileLoaded && <div className="nav-item">
                    <Link to='/playlists/' className="link" >My Playlists</Link>
               </div>}



                
            </div>
        </div>
    )
}