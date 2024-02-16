import React from 'react';
import './MainImage.css';

interface Props {
    imageUrl: string;
}

export const MainImage: React.FC<Props> = ({ imageUrl }) => {
    return (
        <div >
            <img src={imageUrl} alt="Main Image" className='main-image' />
        </div>
    );
};


