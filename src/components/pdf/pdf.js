import React, { useState } from 'react'
import FileUploadSection from '../fileUploadSection'
import uploadToSupabase from '@/lib/uploadToSupabase';
import { deleteFromSupabase } from '@/lib/deleteFromSupabase';
import axios from "axios";


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





    return (
        <div className='flex gap-4 h-full w-full'>
            <FileUploadSection selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} fileType={"application"} />

            <div className='w-[500px] h-[500px] flex flex-col gap-4 '>
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
            </div>
        </div>
    )
}

export default PDFSec