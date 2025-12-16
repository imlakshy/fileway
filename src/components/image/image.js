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
        <div className="flex gap-4 lg:h-[calc(100vh-270px)] lg:gap-16 items-center justify-center flex-col lg:flex-row">

            <ImgUpload selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />

            <div className="h-[50vh] w-[clamp(350px,90vw,430px)]">
                <div className="btns flex w-full justify-around h-[50px] text-xl">
                    <button onClick={() => { setImgActive("resize") }} className={`w-full p-1 transition-all duration-300 ease-in-out ${imgActive == "resize" ? "text-gray-200 border-b-2 border-gray-200 " : "text-gray-500 border-b-2 border-transparent"}`}>Resize</button>

                    <button onClick={() => { setImgActive("convert") }} className={`w-full p-1 transition-all duration-300 ease-in-out ${imgActive == "convert" ? "text-gray-200 border-b-2 border-gray-200 " : "text-gray-500 border-b-2 border-transparent"}`}>Convert</button>

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
