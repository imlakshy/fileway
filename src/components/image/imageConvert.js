import React from 'react'
import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { styleEffect } from 'framer-motion';

const ImageConvert = ({ files, inputFormat }) => {

    const Imgformats = ["JPEG", "PNG", "WEBP", "PDF", "GIF", "BMP", "TIFF" , "ICO", "PPM", "EPS"];

    const [userInputFormat, setUserInputFormat] = useState("")

    const [isDownloading, setIsDownloading] = useState(false);

    const [singlePDF, setSinglePDf] = useState(false);

    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadSpeed, setUploadSpeed] = useState(0);
    const [uploadTime, setUploadTime] = useState(0);
    const [downloadTime, setDownloadTime] = useState(0);

    const handleUploadAndDownload = async () => {

        if (files.length < 1) {
            toast.error("Please upload a file first!");
            return;
        }

        const formData = new FormData();
        files.forEach((f) => {
            formData.append("files", f.file);

        })
        formData.append("outputFormat", userInputFormat);
        formData.append("singlePdf", singlePDF)

        try {
            setIsDownloading(true);
            const res = await axios.post("https://fileway.up.railway.app/imgFormatConvert/", formData, {
                responseType: "blob"
            });
            // Response file downloading logic
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download",
                files.length > 1 ?
                    (singlePDF ?
                        "Processed PDF.pdf" : "Processed files.zip")
                    : `Processed files.${userInputFormat.toLowerCase()}`
            );
            document.body.appendChild(link);
            link.click();

        } catch (err) {
            alert("Upload failed");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="flex flex-wrap justify-center items-center">
            {Imgformats.map((ext) => (
                <button
                    key={ext}
                    className={`cursor-pointer w-[45%] p-2 my-4 mx-1 border-2 border-transparent transition-all duration-300 ${userInputFormat == ext
                        ? "bg-white text-black border-white"
                        : "hover:border-white"
                        }`}
                    onClick={() => setUserInputFormat(ext)
                    }
                >{ext}</button>
            ))}

            {userInputFormat == "PDF" && files.length > 1 && (
                <div className='transition-all duration-300 flex gap-2 items-center py-4 justify-start w-full text-gray-400 italic'>

                    <div className={`flex items-center justify-center w-[20px] h-[20px] border-2 border-gray-400 ${singlePDF ? "bg-gray-700 border-0" : ""}`}

                        onClick={() => { setSinglePDf(!singlePDF) }} >
                        {singlePDF ?
                            <svg width="12px"
                                height="12px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#ffffff">
                                <path d="M4 12.6111L8.92308 17.5L20 6.5"
                                    stroke="#ffffff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round" />
                            </svg> : ""
                        }
                    </div>
                    Merge all images into a single PDF?
                </div>
            )}

            <button
                className={`cursor-pointer w-full border-2 p-2 mt-1.5 font-semibold transition duration-300 
    ${userInputFormat === "" || isDownloading
                        ? "text-gray-500 border-gray-500 cursor-not-allowed"
                        : "hover:bg-white hover:text-black active:bg-white border-white active:text-black"
                    }`}
                onClick={handleUploadAndDownload}
                disabled={userInputFormat === "" || isDownloading}
            >
                {isDownloading ? (
                    <span className="flex justify-center items-center gap-2">
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
                        Processing...
                    </span>
                ) : (
                    "Convert"
                )}
            </button>

            {isDownloading && (
                <div className="mt-4 bg-gray-900 text-white p-4 rounded shadow">
                    <p>Uploading: {uploadProgress}%</p>
                    <div className="h-2 bg-gray-600 rounded overflow-hidden my-2">
                        <div
                            className="bg-green-400 h-full"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                    <p>Upload Speed: {uploadSpeed} KB/s</p>
                    <p>Time Elapsed: {uploadTime} sec</p>
                </div>
            )}

            {downloadTime > 0 && (
                <div className="mt-4 text-sm text-white bg-gray-800 p-3 rounded">
                    <p>Download Time: {downloadTime} ms</p>
                </div>
            )}
        </div>
    )
}

export default ImageConvert
