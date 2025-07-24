import React, { useState } from 'react'
import FileUploadSection from '../fileUploadSection'
import uploadToSupabase from '@/lib/uploadToSupabase';
import { deleteFromSupabase } from '@/lib/deleteFromSupabase';
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';


const PDFSec = () => {

    const [selectedFiles, setSelectedFiles] = useState([]);

    const fancyButtonClass = "w-full p-2 flex justify-center border-2 text-xl font-s    hover:border-white transition-all duration-300 cursor-pointer rounded-full text-[#bfbfbf] hover:text-white"

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
            icon: "https://unpkg.com/lucide-static/icons/merge.svg",
        },
        {
            name: "Split PDF",
            description: "Splits a PDF into multiple files",
            icon: "https://unpkg.com/lucide-static/icons/split.svg",
        },
        {
            name: "Unlock PDF",
            description: "Removes password protection from a PDF",
            icon: "https://unpkg.com/lucide-static@0.436.0/icons/lock-open.svg",
        },
        {
            name: "Protect PDF",
            description: "Adds password protection to a PDF",
            icon: "https://unpkg.com/lucide-static/icons/lock.svg",
        },
        {
            name: "Dark Mode PDF",
            description: "Converts PDF to dark mode",
            icon: "https://unpkg.com/lucide-static/icons/moon.svg",
        },
        {
            name: "Compress PDF",
            description: "Reduces PDF file size",
            icon: "https://unpkg.com/lucide-static@0.436.0/icons/shrink.svg",
        },
        {
            name: "Organise PDF",
            description: "Rearrange, add, or remove PDF pages",
            icon: "https://unpkg.com/lucide-static@0.436.0/icons/layout-list.svg",
        },
        {
            name: "Convert to Image",
            description: "Convert PDF pages to images",
            icon: "https://unpkg.com/lucide-static/icons/image.svg",
        },
        {
            name: "Convert to Excel",
            description: "Convert PDF to Excel spreadsheet",
            icon: "https://unpkg.com/lucide-static/icons/file-spreadsheet.svg",
        },
        {
            name: "Convert to Word",
            description: "Convert PDF to Word document",
            icon: "https://unpkg.com/lucide-static@0.436.0/icons/file.svg",
        },
        {
            name: "Convert to PPT",
            description: "Convert PDF to PowerPoint presentation",
            icon: "https://unpkg.com/lucide-static@0.436.0/icons/presentation.svg",
        },
        {
            name: "Convert to Text",
            description: "Extract text from PDF",
            icon: "https://unpkg.com/lucide-static/icons/file-text.svg",
        },
    ];

    const [selectedTool, setSelectedTool] = useState(null);

    const handleToolClick = (tool) => {
        setSelectedTool(tool);
    };

    const handleReset = () => {
        setSelectedTool(null);
    };


    return (
        <div className='flex gap-[20px] w-[370px] md:w-[720px] justify-center items-center flex-wrap col-span-2'>
            {/* <FileUploadSection selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} fileType={".pdf,application/pdf"} /> */}

            {/* <div className='min-w-[350px] w-full max-w-[500px] h-[500px] flex flex-col gap-4 '>
                <div className={fancyButtonClass} onClick={mergerPdf}>
                    Merge PDF
                </div>

                <div className={fancyButtonClass} onClick={unlockPdf}>
                    Unlock PDF
                </div>
                <div className={fancyButtonClass} onClick={splitPdf}>
                    Split PDF
                </div>
                <div className={fancyButtonClass} onClick={darkModePdf}>
                    Dark Mode PDF
                </div>
                <div className={fancyButtonClass} onClick={compressPdf}>
                    Compress PDF
                </div>
                <div className={fancyButtonClass} onClick={protectPdf}>
                    Protect PDF
                </div>
                <div className={`${fancyButtonClass} flex flex-col items-center`} onClick={protectPdf}>
                    Organise PDF  <p className='text-xs text-gray-400 pt-1'>Add, Delete, Extract Page</p>
                </div>
            </div> */}

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
                                className="w-[350px] cursor-pointer bg-[#18181b] hover:bg-black hover:border-2 hover:border-amber-900 hover:scale-102 transition-all duration-300 border-2 border-transparent rounded-2xl shadow-lg hover:shadow-xl  flex items-center gap-4 p-5"
                                onClick={() => handleToolClick(tool.name)}
                            >
                                <img
                                    src={tool.icon}
                                    alt={tool.name + " icon"}
                                    className="w-12 h-12 bg-amber-900 rounded-xl p-2"
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
                            className="w-full max-w-md bg-gray-800 p-6 rounded shadow">
                            <h2 className="text-xl mb-4 capitalize">{selectedTool} Files</h2>

                            <input
                                type="file"
                                multiple
                                className="mb-4 w-full text-gray-200 file:bg-amber-700 file:text-white file:rounded file:px-3 file:py-1"
                            />

                            <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 transition w-full mb-2">
                                Perform {selectedTool}
                            </button>

                            <button onClick={handleReset} className="text-sm text-gray-400 hover:text-white underline mt-2">
                                Go Back
                            </button>
                        </motion.div>
                    )}
            </AnimatePresence>



        </div>
    )
}

export default PDFSec