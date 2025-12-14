import React from 'react'
import { useState } from 'react'
import { X, Plus } from "lucide-react";

const PdfUpload = ({ selectedFiles, setSelectedFiles, status }) => {

    const handleFiles = (files) => {
        const fileArray = Array.from(files);
        const fileData = fileArray.map((f) => ({
            name: f.name,
            size: (f.size / 1024).toFixed(2) + ' KB',
            preview: URL.createObjectURL(f),
            file: f,
        }));
        setSelectedFiles((prev) => [...prev, ...fileData]);
    };

    const handleFileChange = (e) => {
        handleFiles(e.target.files);
    };

    const handleDelete = (name) => {
        setSelectedFiles((prev) => prev.filter((file) => file.name !== name));
    };


    return (
        <div className={`transition-all duration-300 pb-4
        ${status !== "idle" ? "opacity-20 pointer-events-none" : ""}`}>

            {selectedFiles.length > 0 && (<div className='flex flex-row-reverse gap-2 pb-2'>
                <div
                    className="group h-8 w-8 hover:w-24 bg-amber-900 rounded-full flex items-center gap-1.5 px-2 cursor-pointer shadow-sm overflow-hidden transition-all duration-300 ease-in-out  hover:bg-amber-900" onClick={() => setSelectedFiles([])}>

                    <X className="w-4 h-4 shrink-0" />

                    <span className="text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-10">
                        Clear All
                    </span>
                </div>

                <div onClick={() => document.getElementById("fileInput").click()}
                    className=" group h-8 w-8 hover:w-24  bg-amber-900 rounded-full flex items-center gap-1.5 px-2 cursor-pointer shadow-sm overflow-hidden transition-all duration-300 ease-in-out">
                    <Plus className="w-4 h-4 shrink-0" />

                    <span className=" text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
                        Add More
                    </span>

                    <input type="file" accept="application/pdf" multiple className="hidden" id="fileInput" onChange={handleFileChange} />
                </div>
            </div>)}

            <div className='relative min-h-[320px] max-h-[370px] rounded-xl overflow-y-auto border border-dashed border-gray-600 flex items-center justify-center flex-wrap transition-all duration-300'>
                {selectedFiles.length == 0 && (
                    <div className='h-full'
                        onClick={() => document.getElementById('fileInput').click()}>
                        <input
                            type="file"
                            accept="application/pdf"
                            multiple
                            className="hidden"
                            id='fileInput'
                            onChange={handleFileChange}
                        />
                        <div className="h-full w-full flex flex-col items-center justify-center">
                            <svg
                                width="206px"
                                height="100px"
                                viewBox="0 0 24.00 24.00"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"

                            >
                                <path
                                    d="M19 7V13.8C19 14.9201 19 15.4802 18.782 15.908C18.5903 16.2843 18.2843 16.5903 17.908 16.782C17.4802 17 16.9201 17 15.8 17H12.2C11.0799 17 10.5198 17 10.092 16.782C9.71569 16.5903 9.40973 16.2843 9.21799 15.908C9 15.4802 9 14.9201 9 13.8V6.2C9 5.0799 9 4.51984 9.21799 4.09202C9.40973 3.71569 9.71569 3.40973 10.092 3.21799C10.5198 3 11.0799 3 12.2 3H15M19 7L15 3M19 7H16.6C16.0399 7 15.7599 7 15.546 6.89101C15.3578 6.79513 15.2049 6.64215 15.109 6.45399C15 6.24008 15 5.96005 15 5.4V3M5 7V14.6C5 16.8402 5 17.9603 5.43597 18.816C5.81947 19.5686 6.43139 20.1805 7.18404 20.564C8.03969 21 9.15979 21 11.4 21H15"
                                    stroke="#8898aa"
                                    strokeWidth="0.84"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-6">Drag & Drop files here</p>
                            <p className="text-xs md:text-sm text-gray-500">or click to browse</p>
                        </div>

                    </div>)}

                {selectedFiles.map((file, index) => (
                    <div
                        key={index}
                        className="relative group w-[120px] mt-3 p-3 rounded-xl shadow flex flex-col items-center transition-transform duration-200 hover:bg-[#222] hover:scale-105"
                    >
                        {/* Delete button - hidden until hover */}
                        <button
                            onClick={() => handleDelete(file.name)}
                            className="absolute top-2 left-2 p-1 bg-red-500 text-white rounded-full transition cursor-pointer"
                        >
                            <X size={14} />
                        </button>

                        <img
                            src="/icons/pdf.png"
                            alt="PDF Icon"
                            className="w-25 aspect-square object-contain"
                        />

                        <p className="mt-2 text-center text-[14px] font-medium text-gray-200 line-clamp-2 break-all">
                            {file.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">{file.size}</p>
                    </div>
                ))}
            </div>
        </div>)
}

export default PdfUpload
