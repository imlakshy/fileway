import React from 'react'

const FileUploadSection = ({ selectedFiles, setSelectedFiles, fileType }) => {

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

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    return (
        <div>
            <div className="h-[500px] w-[800px] rounded-xl overflow-auto border border-dashed border-gray-600">
                {selectedFiles == 0 && (
                    <div className='h-full'
                        onClick={() => document.getElementById('fileInput').click()}>
                        <input
                            type="file"
                            accept={`${fileType}/*`}
                            multiple
                            className="hidden"
                            id='fileInput'
                            onChange={handleFileChange}
                            onDrop={handleDrop} />
                        <div className="h-full w-full flex flex-col items-center justify-center">
                            <svg
                                width="256px"
                                height="120px"
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
                            <p className="text-lg mt-6">Drag & Drop files here</p>
                            <p className="text-sm text-gray-500">or click to browse</p>
                        </div>

                    </div>)}

                {selectedFiles.length > 0 && (
                    <div className=''>
                        <input
                            type="file"
                            accept={`${fileType}/*`}
                            multiple
                            className="hidden"
                            id='fileInput'
                            onChange={handleFileChange} />
                        <div className='grid grid-cols-11 p-4 text-gray-300 bg-[#111827] border-b border-dashed border-gray-600'>
                            <span className='col-span-3'>Preview</span>
                            <span className='col-span-5'>Name</span>
                            <span className='col-span-2'>Size</span>
                            <div className="col-span-1 flex justify-center items-center cursor-pointer">
                                <svg
                                    onClick={() => document.getElementById('fileInput').click()}
                                    fill="#dee2e6"
                                    height="24px"
                                    width="24px"
                                    viewBox="0 0 512 512"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333 c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333 z"></path>
                                    <path d="M383.996,234.667H277.333V128c0-11.782-9.551-21.333-21.333-21.333s-21.333,9.551-21.333,21.333v106.667H128.038 c-11.782,0-21.333,9.551-21.333,21.333s9.551,21.333,21.333,21.333h106.628V384c0,11.782,9.551,21.333,21.333,21.333 s21.333-9.551,21.333-21.333V277.333h106.662c11.782,0,21.333-9.551,21.333-21.333S395.778,234.667,383.996,234.667z"></path>
                                </svg>
                            </div>
                        </div>


                        {selectedFiles.map((file, index) => (
                            <div key={index} className='grid grid-cols-11 p-4 items-center border-b border-gray-800 overflow-y-auto'>
                                <div className='col-span-3'>
                                    <img src={file.preview} alt="" className="w-[120px] h-[68px]" />
                                </div>

                                <p className="col-span-5">{file.name}</p>

                                <p className="col-span-2">{file.size}</p>

                                <div className="col-span-1 flex justify-center items-center cursor-pointer" >
                                    <svg
                                        onClick={() => handleDelete(file.name)}
                                        width="40px"
                                        height="40px"
                                        viewBox="0 0 1024 1024"
                                        fill="#364153"
                                        stroke="#364153"
                                        strokeWidth="15.36"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="cursor-pointer"
                                    >
                                        <path d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z" />
                                        <path d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z" />
                                        <path d="M328 340.8l32-31.2 348 348-32 32z" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default FileUploadSection
