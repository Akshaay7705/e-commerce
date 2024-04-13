import { useState } from 'react';
// import add from '../img/add.jpeg'
const Image = ({ currimg, currkey, img, handleImgClick, handleImgChange }) => {
    return (
        
<div className="">
        <img 
            onClick={() => handleImgClick(currkey)} 
            className={"w-[120px] h-[120px] hover:cursor-pointer hover:opacity-80" + (currimg === currkey ? " active" : "")} 
            src={img} 
            alt="Product Image" 
        />
       
        </div>

    )
}

export default Image;
