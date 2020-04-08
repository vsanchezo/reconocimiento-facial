import React from 'react';
import Tilt from 'react-tilt';
import chip from './chip.png'
import './Logo.css';

const Logo = () =>{
    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa2">
                    <img style={{padding: '3px'}} src={chip} alt='logo' />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;