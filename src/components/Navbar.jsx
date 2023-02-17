import { Link } from "react-router-dom";
import '../styles/components/navbar.scss';

export function Navbar(){

    return (
        <div className="navbar">
            

            <div className="nav-items">
               <div className="nav-item">
                    <Link to='/' className="link">Home</Link>
               </div>



                
            </div>
        </div>
    )
}