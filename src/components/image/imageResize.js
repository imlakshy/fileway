import React from 'react'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import uploadToSupabase from '@/lib/uploadToSupabase';
import axios from 'axios';


const ImageResize = ({ files }) => {
    const [Rstatus, setRStatus] = useState("idle");
    const [Dstatus, setDStatus] = useState("resizing");
    const [size, setSize] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");


    async function resizeBySize() {
        if (files.length === 0) {
            toast.error("Please upload a file first!");
        } else {
            try {
                setRStatus("resizing");

                const urls = await uploadToSupabase({ selectedFiles: files });

                const response = await axios.post("https://fileway-backend.onrender.com/resizeImgByKB", {
                    img_urls: urls,
                    sizeInKB: size,
                }, {
                    responseType: "blob",
                });

                const isZip = urls.length > 1;
                const blob = new Blob([response.data], {
                    type: isZip
                        ? "application/zip"
                        : `image/jpg`,
                });

                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = isZip ? "Images.zip" : `Image.jpg`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setRStatus("idle");

                setTimeout(() => {
                    setSize("");
                }, 2000);
            } catch (error) {
                toast.error("An error occurred during conversion. Please try again.");
                setRStatus("idle");
            }
        }
    }

    async function resizeByDimension() {
        if (files.length === 0) {
            toast.error("Please upload a file first!");
        } else {
            try {
                setDStatus("resizing");

                const urls = await uploadToSupabase({ selectedFiles: files });

                const response = await axios.post("https://fileway-backend.onrender.com/resizeImgByHW", {
                    img_urls: urls,
                    width: width,
                    height: height,
                }, {
                    responseType: "blob",
                });
                const isZip = urls.length > 1;

                // if single image, backend keeps original format, so read it from response header
                const contentType = response.headers?.["content-type"] || response.headers?.get?.("content-type");

                const blob = new Blob([response.data], {
                    type: isZip ? "application/zip" : (contentType || "application/octet-stream"),
                });

                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);

                // pick extension from content-type (only for single file)
                let ext = "img";
                if (!isZip && contentType) {
                    if (contentType.includes("jpeg")) ext = "jpg";
                    else if (contentType.includes("png")) ext = "png";
                    else if (contentType.includes("webp")) ext = "webp";
                    else if (contentType.includes("gif")) ext = "gif";
                    else if (contentType.includes("bmp")) ext = "bmp";
                    else if (contentType.includes("tiff")) ext = "tiff";
                    else if (contentType.includes("x-icon")) ext = "ico";
                    else if (contentType.includes("postscript")) ext = "eps";
                    else if (contentType.includes("pdf")) ext = "pdf";
                }

                link.download = isZip ? "Images.zip" : `Image.${ext}`;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);

                setDStatus("idle");

                setTimeout(() => {
                    setSize("");
                }, 2000);
            } catch (error) {
                toast.error("An error occurred during conversion. Please try again.");
                setDStatus("idle");
            }
        }
    }


    return (
        <div className="text-xl p-6 rounded-2xl shadow-md space-y-8 transition-all duration-300 ease-in-out w-full">

            {/* By Dimension */}
            <div className={`space-y-4 disabled={Rstatus === "resizing"} ${Rstatus==="resizing" ? "opacity-20 disabled" : "opacity-100"} `}>
                <li className="font-semibold">By Dimension</li>
                <p className="text-base text-gray-400">Enter width and height in px:</p>

                <div className="flex items-end gap-6">
                    {/* Width */}
                    <div className="flex flex-col">
                        <label htmlFor="width" className="mb-1 text-sm font-medium text-gray-400">
                            Width
                        </label>
                        <input type="number" id="width" className="text-base border-2 rounded-lg px-3 py-1 w-[120px]" placeholder="e.g. 800" onChange={(e) => setWidth(Number(e.target.value))} value={width} onKeyDown={(e) => { if (e.key === "Enter" && height !== "" && width !== "") { resizeByDimension() } }} />
                    </div>

                    {/* Height + Tick */}
                    <div className="flex items-end gap-2">
                        <div className="flex flex-col">
                            <label htmlFor="height" className="mb-1 text-sm font-medium text-gray-400">
                                Height
                            </label>
                            <input type="number" id="height" className="text-base border-2 rounded-lg px-3 py-1 w-[120px]" placeholder="e.g. 600" onChange={(e) => setHeight(Number(e.target.value))} value={height}
                                onKeyDown={(e) => { if (e.key === "Enter" && height !== "" && width !== "") { resizeByDimension() } }} />
                        </div>

                        {/* Tick Button */}
                        <button
                            onClick={resizeByDimension}
                            className={` h-[34px] mt-[22px] flex items-center justify-center cursor-pointer transition ${(width > 0 && height > 0) ? "" : "hidden"}`}>
                            {Dstatus === "resizing" ? (
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

            </div>

            <div className={`flex items-center w-full my-6 ${Rstatus==="resizing" || Dstatus==="resizing" ? "opacity-20" : "opacity-100"} `}>
                <div className="flex-grow border-t border-gray-500"></div>
                <span className="px-4 text-gray-400 text-sm">or</span>
                <div className="flex-grow border-t border-gray-500"></div>
            </div>

            {/* By Size */}
            <div className={`space-y-4 ${Dstatus==="resizing" ? "opacity-20" : "opacity-100"}`}>
                <li className="font-semibold">By Size</li>
                <p className="text-xs text-gray-400 italic">This will return image in JPG without transparency</p>
                <p className="text-base text-gray-400">Enter size:</p>

                <div className="flex flex-col gap-2">
                    <label htmlFor="size" className="text-sm font-medium text-gray-400">Size</label>
                    <div className="flex items-center">
                        <input type="number" id="size" value={size} className="text-base border-2 rounded-lg px-3 py-1 w-[120px]" placeholder="e.g. 500" onChange={(e) => setSize(Number(e.target.value))} onKeyDown={(e) => { if (e.key === "Enter" && size !== "") { resizeBySize() } }} />
                        <span className="text-sm text-gray-400 ml-2">KB</span>

                        <button className={`ml-4 cursor-pointer ${size > 0 ? "" : "hidden"}`}
                            onClick={() => { resizeBySize() }}>
                            {Rstatus === "resizing" ? (<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                            </svg>) : (<svg
                                className="h-5 w-5 mx-1 shrink-0"
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

                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageResize
