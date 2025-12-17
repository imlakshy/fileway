import React from 'react'
import ImageConvert from './imageConvert'
import ImageResize from './imageResize'
import FileUploadSection from '../fileUploadSection';
import { useState } from "react";
import ImgUpload from './imgUploadSection';

const ImageSec = () => {

    const [imgActive, setImgActive] = useState("resize");

    const [selectedFiles, setSelectedFiles] = useState([]);

    return (
        <div className="flex gap-4 h-[calc(100vh-200px)] overflow-y-auto px-2 scrollbar-none lg:gap-16 xl:gap-24 items-center lg:justify-center flex-col lg:flex-row">

            <div className='h-full w-1/2 flex items-center justify-center'>
                <ImgUpload selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
            </div>

            <div className="h-full w-[clamp(350px,90vw,430px)] flex items-center justify-center flex-col">
                <div className="btns flex w-full justify-around h-[50px] md:text-xl">
                    <button onClick={() => { setImgActive("resize") }} className={`cursor-pointer w-full p-1 transition-all duration-300 ease-in-out ${imgActive == "resize" ? "text-gray-200 border-b-2 border-gray-200 " : "text-gray-500 border-b-2 border-transparent"}`}>Resize</button>

                    <button onClick={() => { setImgActive("convert") }} className={`cursor-pointer w-full p-1 transition-all duration-300 ease-in-out ${imgActive == "convert" ? "text-gray-200 border-b-2 border-gray-200 " : "text-gray-500 border-b-2 border-transparent"}`}>Convert</button>

                </div>

                {imgActive == "resize" && (
                    <ImageResize />
                )}

                {imgActive == "convert" && (
                    <ImageConvert files={selectedFiles} />
                )}
            </div>
        </div>
    )
}

export default ImageSec
