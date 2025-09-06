import React, { useState } from 'react'
import PdfUpload from '../pdfFileUpload';
import uploadToSupabase from '@/lib/uploadToSupabase';
import { deleteFromSupabase } from '@/lib/deleteFromSupabase';
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';


const PDFSec = () => {

    const [selectedFiles, setSelectedFiles] = useState([]);


    const mergerPdf = async () => {
        console.log("Staring...");

        const urls = await uploadToSupabase({ selectedFiles })

        console.log("Uploading Complete ✅");
        console.log("Now Processing...");

        const response = await axios.post("https://fileway-backend.onrender.com/merge-pdfs", {
            pdf_urls: urls,
        }, {
            responseType: "blob",
        });

        // Create a blob from response
        const blob = new Blob([response.data], { type: "application/pdf" });
        console.log("Processed! ✅");


        // Create temporary download link
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "merged.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // CLEANUP: Call delete function after download
        console.log("Cleaning up uploaded files...");
        await deleteFromSupabase({ urls });
    }

    const unlockPdf = async () => {
        const pdfPassword = window.prompt("Enter password:");
        console.log("Staring...");

        const urls = await uploadToSupabase({ selectedFiles })

        console.log("Uploading complete");
        console.log("Now Processing...");

        const response = await axios.post("https://fileway-backend.onrender.com/unlock-pdf", {
            pdf_urls: urls,
            password: pdfPassword,
        }, {
            responseType: "blob",
        });

        // Create a blob from response
        const blob = new Blob([response.data], { type: "application/pdf" });
        console.log("Processed!!!");
        // Create temporary download link
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "merged.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

    const splitPdf = async () => {
        const startpg = window.prompt("Start Page:");
        const endpg = window.prompt("End Page:");

        console.log("Staring...");

        const urls = await uploadToSupabase({ selectedFiles })

        console.log("Uploading complete");
        console.log("Now Processing...");

        const response = await axios.post("https://fileway-backend.onrender.com/split-pdf", {
            pdf_urls: urls,
            start: startpg,
            end: endpg,
        }, {
            responseType: "blob",
        });

        // Create a blob from response
        const blob = new Blob([response.data], { type: "application/pdf" });
        console.log("Processed!!!");
        // Create temporary download link
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "merged.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

    const darkModePdf = async () => {
        console.log("Staring...");

        const urls = await uploadToSupabase({ selectedFiles })

        console.log("Uploading complete");
        console.log("Now Processing...");

        const response = await axios.post("https://fileway-backend.onrender.com/dark-mode-pdf", {
            pdf_urls: urls,
        }, {
            responseType: "blob",
        });

        // Create a blob from response
        const blob = new Blob([response.data], { type: "application/pdf" });
        console.log("Processed!!!");
        // Create temporary download link
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "merged.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const compressPdf = async () => {
        const input = window.prompt("Enter size:")
        console.log("Staring...");

        const urls = await uploadToSupabase({ selectedFiles })

        console.log("Uploading complete");
        console.log("Now Processing...");

        const response = await axios.post("https://fileway-backend.onrender.com/compress-pdf", {
            pdf_urls: urls,
            target_kb: input,

        }, {
            responseType: "blob",
        });

        if (response.headers["content-type"].includes("application/json")) {
            const text = await response.data.text(); // ⬅️ this reads the blob as string
            const json = JSON.parse(text); // convert to object
            console.log("✅ JSON response:", json);
            console.log("Min possible size:", json.min_possible_kb);
        }


        // Create a blob from response
        const blob = new Blob([response.data], { type: "application/pdf" });
        console.log("Processed!!!");
        // Create temporary download link
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "merged.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const protectPdf = async () => {
        const input = window.prompt("password")
        console.log("Staring...");

        const urls = await uploadToSupabase({ selectedFiles })

        console.log("Uploading complete");
        console.log("Now Processing...");

        const response = await axios.post("https://fileway-backend.onrender.com/encrypt-pdf", {
            pdf_urls: urls,
            password: input,

        }, {
            responseType: "blob",
        });

        if (response.headers["content-type"].includes("application/json")) {
            const text = await response.data.text(); // ⬅️ this reads the blob as string
            const json = JSON.parse(text); // convert to object
            console.log("✅ JSON response:", json);
            console.log("Min possible size:", json.min_possible_kb);
        }


        // Create a blob from response
        const blob = new Blob([response.data], { type: "application/pdf" });
        console.log("Processed!!!");
        // Create temporary download link
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "merged.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    const pdfTools = [
        {
            name: "Merge PDF",
            description: "Merges multiple PDFs into one PDF",
            icon: "/PdfSec/merge.png",
        },
        {
            name: "Split PDF",
            description: "Splits a PDF into multiple files",
            icon: "/PdfSec/split.png",
        },
        {
            name: "Unlock PDF",
            description: "Removes password protection from a PDF",
            icon: "/PdfSec/unlock.png",
        },
        {
            name: "Protect PDF",
            description: "Adds password protection to a PDF",
            icon: "/PdfSec/protect.png",
        },
        {
            name: "Dark Mode PDF",
            description: "Converts PDF to dark mode",
            icon: "/PdfSec/darkMode.png",
        },
        {
            name: "Compress PDF",
            description: "Reduces PDF file size",
            icon: "/PdfSec/compress.png",
        },
        {
            name: "Organise PDF",
            description: "Rearrange, add, or remove PDF pages",
            icon: "/PdfSec/organise.png",
        },
        {
            name: "Convert to Image",
            description: "Convert PDF pages to images",
            icon: "/PdfSec/toImage.png",
        },
        {
            name: "Convert to Excel",
            description: "Convert PDF to Excel spreadsheet",
            icon: "/PdfSec/toExcel.png",
        },
        {
            name: "Convert to Word",
            description: "Convert PDF to Word document",
            icon: "/PdfSec/toWord.png",
        },
        {
            name: "Convert to PPT",
            description: "Convert PDF to PowerPoint presentation",
            icon: "/PdfSec/toPpt.png",
        },
        {
            name: "Convert to Text",
            description: "Extract text from PDF",
            icon: "/PdfSec/split.png",
        },
    ];

    const [selectedTool, setSelectedTool] = useState(null);

    const handleToolClick = (tool) => {
        setSelectedTool(tool);
    };

    const handleReset = () => {
        setSelectedTool(null);
    };

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

    


    return (
        <div className='flex gap-[20px] w-[370px] md:w-[720px] justify-center items-center flex-wrap col-span-2'>
            <AnimatePresence mode="wait">

                {!selectedTool ? (
                    <motion.div
                        key="buttons"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-wrap gap-[20px] w-[370px] md:w-[720px] justify-center">
                        {pdfTools.map((tool) => (
                            <div
                                key={tool.name}
                                className="w-[350px] cursor-pointer bg-black hover:bg-[#121212] hover:border-2 hover:border-white hover:scale-102 transition-all duration-300 border-2 border-transparent rounded-2xl shadow-lg hover:shadow-xl  flex items-center gap-4 p-5"
                                onClick={() => handleToolClick(tool.name)}
                            >
                                <img
                                    src={tool.icon}
                                    alt={tool.name + " icon"}
                                    className='aspect-square w-12'
                                />
                                <div>
                                    <h2 className="text-white text-lg font-semibold">{tool.name}</h2>
                                    <p className="text-gray-400 text-sm">{tool.description}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>)
                    :
                    (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="w-full max-w-md p-6 rounded shadow">
                            <img src="/icons/back.png" className='w-5 h-5 aspect-square cursor-pointer' onClick={handleReset} alt="GoBack" />

                            <h2 className="text-2xl capitalize my-4">{selectedTool} Files</h2>

                            
                            
                            <PdfUpload/>


                            <button className="bg-amber-900 px-4 py-2 hover:bg-amber-700 transition w-full my-2">
                                Perform {selectedTool}
                            </button>


                        </motion.div>
                    )}
            </AnimatePresence>
        </div>
    )
}

export default PDFSec