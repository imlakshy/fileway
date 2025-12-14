import React, { useState } from 'react'
import uploadToSupabase from '@/lib/uploadToSupabase';
import { deleteFromSupabase } from '@/lib/deleteFromSupabase';
import axios from "axios";
import PdfUpload from './pdfFileUpload';
import { toast } from "react-toastify";


const PDFSec = () => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [status, setStatus] = useState("idle");
    const [selectedTool, setSelectedTool] = useState(null);

    const handleToolClick = (tool) => {
        setSelectedTool(tool);
    };

    const handleReset = () => {
        setSelectedTool(null);
    };

    async function mergePdfFunction(files) {
        if (files.length < 2) {
            toast.error("Please select at least 2 PDF");
            return;
        } else {
            setStatus("uploading");
            const urls = await uploadToSupabase({ selectedFiles: files })

            setStatus("processing");
            const response = await axios.post("https://fileway-backend.onrender.com/merge-pdfs", {
                pdf_urls: urls,
            }, {
                responseType: "blob",
            });

            // Create a blob from response
            const blob = new Blob([response.data], { type: "application/pdf" });

            // Create temporary download link
            setStatus("downloading");
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Merged.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);


            // CLEANUP: Call delete function after download
            console.log("Cleaning up uploaded files...");
            await deleteFromSupabase({ urls });
            setStatus("done");

            setTimeout(() => {
                setStatus("idle");
                setSelectedFiles([]);
            }, 2000);
        }

    }

    async function splitPdfFunction(files) {
        if (files.length === 0) {
            toast.error("Please select at least a PDF");
            return;
        } else {
            const startpg = window.prompt("Start Page:");
            const endpg = window.prompt("End Page:");

            setStatus("uploading");

            const urls = await uploadToSupabase({ selectedFiles: files })
            setStatus("processing");

            const response = await axios.post("https://fileway-backend.onrender.com/split-pdf", {
                pdf_urls: urls,
                start: startpg,
                end: endpg,
            }, {
                responseType: "blob",
            });

            // Create a blob from response
            const blob = new Blob([response.data], { type: "application/pdf" });
            setStatus("downloading");

            // Create temporary download link
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Splited.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setStatus("done");

            setTimeout(() => {
                setStatus("idle");
                setSelectedFiles([]);
            }, 2000);

        }

    }

    async function unlockPdfFunction(files) {
        if (files.length === 0) {
            toast.error("Please select at least a PDF");
            return;
        } else {
            try {
                const pdfPassword = window.prompt("Enter password:");
                setStatus("uploading");

                const urls = await uploadToSupabase({ selectedFiles: files })

                setStatus("processing");

                const response = await axios.post("https://fileway-backend.onrender.com/unlock-pdf", {
                    pdf_urls: urls,
                    password: pdfPassword,
                }, {
                    responseType: "blob",
                });

                // Create a blob from response
                const blob = new Blob([response.data], { type: "application/pdf" });
                setStatus("downloading");

                // Create temporary download link
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "Unlocked.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setStatus("done");

                setTimeout(() => {
                    setStatus("idle");
                    setSelectedFiles([]);
                }, 2000);
            } catch (error) {
                toast.error("Incorrect PDF password");
                setStatus("idle");
            }
        }
    }

    async function protectPdfFunction(files) {
        if (files.length === 0) {
            toast.error("Please select at least a PDF");
            return;
        } else {
            const input = window.prompt("password")
            setStatus("uploading");

            const urls = await uploadToSupabase({ selectedFiles: files })

            setStatus("processing");

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
            setStatus("downloading");

            // Create temporary download link
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Protected.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setStatus("done");

            setTimeout(() => {
                setStatus("idle");
                setSelectedFiles([]);
            }, 2000);
        }
    }

    async function darkModePdfFunction(files) {
        if (files.length === 0) {
            toast.error("Please select at least a PDF");
            return;
        } else {
            try {
                setStatus("uploading");

                const urls = await uploadToSupabase({ selectedFiles: files })

                setStatus("processing");

                const response = await axios.post("https://fileway-backend.onrender.com/dark-mode-pdf", {
                    pdf_urls: urls,
                }, {
                    responseType: "blob",
                });

                // Create a blob from response
                const blob = new Blob([response.data], { type: "application/pdf" });
                setStatus("downloading");
                // Create temporary download link
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "Color Inverted.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setStatus("done");

                setTimeout(() => {
                    setStatus("idle");
                    setSelectedFiles([]);
                }, 2000);
            } catch (error) {
                toast.error("An error occurred while processing the PDF.");
                setStatus("idle");
            }
        }
    }

    async function compressPdfFunction(files) {
        if (files.length === 0) {
            toast.error("Please select at least a PDF");
            return;
        } else {
            const input = window.prompt("Enter size:")
            setStatus("uploading");

            const urls = await uploadToSupabase({ selectedFiles: files })

            setStatus("processing");

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

            setStatus("downloading");
            // Create temporary download link
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Compressed.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setStatus("done");

            setTimeout(() => {
                setStatus("idle");
                setSelectedFiles([]);
            }, 2000);
        }
    }

    async function convertToImageFunction(files) {
        if (files.length === 0) {
            toast.error("Please select atleast a PDF");
            return;
        } else {
            setStatus("uploading");
            const urls = await uploadToSupabase({ selectedFiles: files })

            setStatus("processing");
            const response = await axios.post("https://fileway-backend.onrender.com/pdf-to-images", {
                pdf_urls: urls,
            }, {
                responseType: "blob",
            });
            setStatus("downloading");

            // Get content type from response headers
            const contentType = response.headers["content-type"];

            // Decide file type & name
            let fileName = "download";
            let mimeType = contentType;

            if (contentType.includes("application/zip")) {
                fileName = "Images.zip";
            } else if (contentType.includes("image/jpeg")) {
                fileName = "Image.jpg";
            } else if (contentType.includes("image/png")) {
                fileName = "Image.png";
            }

            // Create blob
            const blob = new Blob([response.data], { type: mimeType });

            // Download
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);



            // CLEANUP: Call delete function after download
            console.log("Cleaning up uploaded files...");
            await deleteFromSupabase({ urls });
            setStatus("done");

            setTimeout(() => {
                setStatus("idle");
                setSelectedFiles([]);
            }, 2000);
        }
    }

    async function convertToExcelFunction(files) {
        if (files.length === 0) {
            toast.error("Please select atleast a PDF");
            return;
        } else {
            setStatus("uploading");
            const urls = await uploadToSupabase({ selectedFiles: files })

            setStatus("processing");
            const response = await axios.post("https://fileway-backend.onrender.com/pdf-to-excel", {
                pdf_urls: urls,
            }, {
                responseType: "blob",
            });

            // Create a blob from response
            const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

            // Create temporary download link
            setStatus("downloading");
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Sheet.xlsx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);


            // CLEANUP: Call delete function after download
            console.log("Cleaning up uploaded files...");
            await deleteFromSupabase({ urls });
            setStatus("done");

            setTimeout(() => {
                setStatus("idle");
                setSelectedFiles([]);
            }, 2000);
        }
    }

    async function convertToWordFunction(files) {
        if (files.length === 0) {
            toast.error("Please select atleast a PDF");
            return;
        } else {
            setStatus("uploading");
            const urls = await uploadToSupabase({ selectedFiles: files })

            setStatus("processing");
            const response = await axios.post("https://fileway-backend.onrender.com/pdf-to-word", {
                pdf_urls: urls,
            }, {
                responseType: "blob",
            });

            // Create a blob from response
            const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });

            // Create temporary download link
            setStatus("downloading");
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Document.docx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);


            // CLEANUP: Call delete function after download
            console.log("Cleaning up uploaded files...");
            await deleteFromSupabase({ urls });
            setStatus("done");

            setTimeout(() => {
                setStatus("idle");
                setSelectedFiles([]);
            }, 2000);
        }
    }

    async function convertToPptFunction(files) {
        if (files.length === 0) {
            toast.error("Please select atleast a PDF");
            return;
        } else {
            setStatus("uploading");
            const urls = await uploadToSupabase({ selectedFiles: files })

            setStatus("processing");
            const response = await axios.post("https://fileway-backend.onrender.com/pdf-to-powerpoint", {
                pdf_urls: urls,
            }, {
                responseType: "blob",
            });

            // Create a blob from response
            const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" });

            // Create temporary download link
            setStatus("downloading");
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Slide.pptx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);


            // CLEANUP: Call delete function after download
            console.log("Cleaning up uploaded files...");
            await deleteFromSupabase({ urls });
            setStatus("done");

            setTimeout(() => {
                setStatus("idle");
                setSelectedFiles([]);
            }, 2000);
        }
    }

    async function convertToTextFunction(files) {
        if (files.length === 0) {
            toast.error("Please select atleast a PDF");
            return;
        } else {
            setStatus("uploading");
            const urls = await uploadToSupabase({ selectedFiles: files })

            setStatus("processing");
            const response = await axios.post("https://fileway-backend.onrender.com/pdf-to-text", {
                pdf_urls: urls,
            }, {
                responseType: "blob",
            });

            // Create a blob from response
            const blob = new Blob([response.data], { type: "text/plain" });

            // Create temporary download link
            setStatus("downloading");
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Text.txt";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);


            // CLEANUP: Call delete function after download
            console.log("Cleaning up uploaded files...");
            await deleteFromSupabase({ urls });
            setStatus("done");

            setTimeout(() => {
                setStatus("idle");
                setSelectedFiles([]);
            }, 2000);
        }
    }

    const pdfTools = [
        {
            name: "Merge PDF",
            description: "Merges multiple PDFs into one PDF",
            icon: "/PdfSec/merge.png",
            operation: mergePdfFunction
        },
        {
            name: "Split PDF",
            description: "Splits a PDF into multiple files",
            icon: "/PdfSec/split.png",
            operation: splitPdfFunction
        },
        {
            name: "Unlock PDF",
            description: "Removes password protection from a PDF",
            icon: "/PdfSec/unlock.png",
            operation: unlockPdfFunction
        },
        {
            name: "Protect PDF",
            description: "Adds password protection to a PDF",
            icon: "/PdfSec/protect.png",
            operation: protectPdfFunction
        },
        {
            name: "Dark Mode PDF",
            description: "Converts PDF to dark mode",
            icon: "/PdfSec/darkMode.png",
            operation: darkModePdfFunction
        },
        {
            name: "Compress PDF",
            description: "Reduces PDF file size",
            icon: "/PdfSec/compress.png",
            operation: compressPdfFunction
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
            operation: convertToImageFunction
        },
        {
            name: "Convert to Excel",
            description: "Convert PDF to Excel spreadsheet",
            icon: "/PdfSec/toExcel.png",
            operation: convertToExcelFunction
        },
        {
            name: "Convert to Word",
            description: "Convert PDF to Word document",
            icon: "/PdfSec/toWord.png",
            operation: convertToWordFunction
        },
        {
            name: "Convert to PPT",
            description: "Convert PDF to PowerPoint presentation",
            icon: "/PdfSec/toPpt.png",
            operation: convertToPptFunction
        },
        {
            name: "Convert to Text",
            description: "Extract text from PDF",
            icon: "/PdfSec/split.png",
            operation: convertToTextFunction
        },
    ];

    return (
        <div className='flex gap-[20px] w-[370px] md:w-[720px] justify-center items-center flex-wrap col-span-2'>

            {!selectedTool && (
                <div
                    className=" w-screen flex justify-center">
                    <div
                        className=" w-screen max-w-[100vw] max-h-[calc(100vh-200px)] overflow-y-auto px-2 scrollbar-none">
                        <div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className=" flex flex-wrap gap-[20px] justify-center">
                            {pdfTools.map((tool) => (
                                <div
                                    key={tool.name}
                                    className=" w-[350px] cursor-pointer  bg-black hover:bg-[#121212] hover:border-2 hover:border-white hover:scale-102 transition-all duration-300 border-2 border-transparent rounded-2xl shadow-lg hover:shadow-xl flex items-center gap-4 p-8 "
                                    onClick={() => handleToolClick(tool)}>
                                    <img
                                        src={tool.icon}
                                        alt={`${tool.name} icon`}
                                        className="aspect-square w-12" />
                                    <div>
                                        <h2 className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                                            {tool.name}
                                        </h2>
                                        <p className="text-gray-400 text-xs md:text-sm">
                                            {tool.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}


            {selectedTool && (
                <div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-md rounded shadow">

                    <div className='flex flex-row justify-start items-center gap-4'>
                        <img src="/icons/back.png" className='w-5 h-5 aspect-square cursor-pointer' onClick={() => { handleReset(); setSelectedFiles([]) }} alt="GoBack" />

                        <h2 className="text-2xl capitalize py-4">{selectedTool.name} Files</h2>
                    </div>



                    <PdfUpload
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                        status={status}
                    />


                    <button
                        onClick={() => selectedTool.operation(selectedFiles)}
                        disabled={status !== "idle"}
                        className={` border-2 border-amber-900 px-4 py-3 w-full cursor-pointer flex items-center justify-center gap-3 transition-all duration-500 ease-in-out rounded-full
                            ${status === "idle" ? " hover:bg-amber-900" : "rounded-full bg-amber-900"}
                            ${status !== "idle" && "pointer-events-none"}`}>
                        {/* Loader */}
                        {status !== "idle" && status !== "done" && (
                            <span
                                className=" w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        )}

                        {/* Done Tick */}
                        {status === "done" && (
                            <span
                                className=" text-green-600 text-lg animate-[pop_0.7s_ease-out]">
                                ✓
                            </span>
                        )}

                        {/* Status Text */}
                        <span className="transition-opacity duration-700">
                            {status === "idle" && selectedTool.name}
                            {status === "uploading" && "Uploading…"}
                            {status === "processing" && "Processing…"}
                            {status === "downloading" && "Downloading…"}
                            {status === "done" && "Done"}
                        </span>
                    </button>

                </div>
            )}

        </div>
    )
}

export default PDFSec