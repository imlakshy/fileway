import React from 'react'
import ImageConvert from './imageConvert'
import ImageResize from './imageResize'
import FileUploadSection from '../fileUploadSection';
import { useState } from "react";

const ImageSec = () => {

    const [imgActive, setImgActive] = useState("resize");

    const [selectedFiles, setSelectedFiles] = useState([]);

    return (
        <div>
            <div className="flex m-20 gap-16">

                <FileUploadSection selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} fileType={"image"}/>

                <div className="h-[50vh] w-[50vh]">
                    <div className="btns flex w-full justify-around h-[50px] text-xl">
                        <button onClick={() => { setImgActive("resize") }} className={`w-full p-1 transition-all duration-300 ease-in-out ${imgActive == "resize" ? "text-gray-200 border-b-2 border-gray-200 " : "text-gray-500 border-b-2 border-transparent"}`}>Resize</button>

                        <button onClick={() => { setImgActive("convert") }} className={`w-full p-1 transition-all duration-300 ease-in-out ${imgActive == "convert" ? "text-gray-200 border-b-2 border-gray-200 " : "text-gray-500 border-b-2 border-transparent"}`}>Convert</button>

                    </div>

                    {imgActive == "resize" && (
                        <ImageResize />
                    )}

                    {imgActive == "convert" && (
                        <ImageConvert files={selectedFiles}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ImageSec
