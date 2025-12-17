import React from 'react'
import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { styleEffect } from 'framer-motion';
import uploadToSupabase from '@/lib/uploadToSupabase';

const ImageConvert = ({ files }) => {

    const Imgformats = ["JPEG", "PNG", "WEBP", "PDF", "GIF", "BMP", "TIFF", "ICO", "PPM", "EPS"];

    const [userInputFormat, setUserInputFormat] = useState("");
    const [status, setStatus] = useState("idle");

    async function changeExt() {
        if (files.length === 0) {
            toast.error("Please upload a file first!");
        } else {
            try{
            setStatus("uploading");
            const urls = await uploadToSupabase({ selectedFiles: files });

            setStatus("processing");
            const response = await axios.post("http://127.0.0.1:8000/changeImgExt", {
                img_urls: urls,
                UserDesiredConvertedExtension: userInputFormat,
            }, {
                responseType: "blob",
            });

            setStatus("downloading");
            const isZip = urls.length > 1;
            const ext = userInputFormat.replace(".", "").toLowerCase();

            const blob = new Blob([response.data], {
                type: isZip
                    ? "application/zip"
                    : `image/${ext === "jpg" ? "jpeg" : ext}`,
            });

            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = isZip ? "Images.zip" : `Image.${ext}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setStatus("done");

            setTimeout(() => {
                setStatus("idle");
                setUserInputFormat("");

            }, 2000);
        }catch (error) {
            toast.error("An error occurred during conversion. Please try again.");
            setStatus("idle");
        }
    }
        

    }

    return (
        <div className="flex flex-wrap justify-center items-center w-full">
            {Imgformats.map((ext) => (
                <button
                    key={ext}
                    className={`cursor-pointer w-[45%] p-2 my-4 mx-1 border-2 border-transparent transition-all duration-300 ${userInputFormat == ext
                        ? "bg-white text-black border-white"
                        : "hover:border-white"
                        }`}
                    onClick={() => setUserInputFormat(ext)
                    }
                >{ext}
                </button>
            ))}

            <button
                className={`w-full border-2 p-2 mt-1.5 font-semibold transition duration-300 
    ${userInputFormat === ""
                        ? "text-gray-500 border-gray-500 cursor-not-allowed"
                        : "hover:bg-white hover:text-black active:bg-white border-white active:text-black cursor-pointer"
                    }`}
                onClick={() => changeExt()}
                disabled={userInputFormat === ""}
            >
                {status !== "idle" ? (
                    <span className="flex justify-center items-center gap-2">
                        {status !== "done" ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                ></path>
                            </svg>
                        ) : (<svg
                            className="h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20 6L9 17l-5-5" />
                        </svg>)}
                        <span className="font-medium tracking-wide">
                            {status === "idle" && selectedTool.name}
                            {status === "uploading" && "Uploading…"}
                            {status === "processing" && "Processing…"}
                            {status === "downloading" && "Downloading…"}
                            {status === "done" && "Done!"}
                        </span>
                    </span>
                ) : (
                    "Convert"
                )}
            </button>
        </div>
    )
}

export default ImageConvert
