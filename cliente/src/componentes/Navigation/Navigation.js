import React from 'react';

const Navigation = ({ onRouteChange, estaActivo }) =>{
    if(estaActivo){
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('afuera')} className='f3 link dim black underline pa3 pointer'>Salir</p>
            </nav>
        )
    }else{
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('registro')} className='f3 link dim black underline pa3 pointer'>Ingresar</p>
                <p onClick={() => onRouteChange('nuevo')} className='f3 link dim black underline pa3 pointer'>Registrarse</p>
            </nav>
        )
    }
}

export default Navigation;