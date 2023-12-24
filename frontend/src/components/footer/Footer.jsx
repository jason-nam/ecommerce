import "./Footer.css"
import { Link } from 'react-router-dom';

export default function Footer() {

    
    return (
        <footer>
            <div className="footer">
                <div className='footer-container'>
                    <ul className="footer-pages">
                        <Link to="/contacts"><li>Contact Us</li></Link>
                    </ul>
                    <div className="coders"><span className="normal">By </span><a href="https://github.com/gyhn2"><span>gyhn2</span></a><span className="normal"> & </span><a href="https://github.com/jason-yunjae-nam"><span>jason-yunjae-nam</span></a></div>
                </div>
                <div className='footer-bounce'></div>
            </div>
        </footer>
    )
}