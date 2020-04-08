import React from 'react';
import './fr.css';

const FaceRecognition = ({imageURL, box}) => {
    return(
    <div className='center'>
        <div className="absolute mt2">
            <img id='inputimage' src={imageURL} alt=' ' width='600px' height="auto" />
            <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left:box.leftCol }}></div>
        </div>
    </div>
    )
}

export default FaceRecognition;