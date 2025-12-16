import React from 'react'
import { useEffect, useState } from "react";

const ImageResize = () => {
    return (
        <div className="text-xl p-6 rounded-2xl shadow-md space-y-8 transition-all duration-300 ease-in-out w-[clamp(380px,90vw,500px)]">

            {/* By Dimension */}
            <div className="space-y-4">
                <li className="font-semibold">By Dimension</li>
                <p className="text-base text-gray-400">Enter width and height in px:</p>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="width" className="mb-1 text-sm font-medium text-gray-400">Width</label>
                        <input type="number" id="width" className="text-base border-2 rounded-lg px-3 py-1 w-[120px]" placeholder="e.g. 800" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="height" className="mb-1 text-sm font-medium text-gray-400">Height</label>
                        <input type="number" id="height" className="text-base border-2 rounded-lg px-3 py-1 w-[120px]" placeholder="e.g. 600" />
                    </div>
                </div>
            </div>

            <div className="flex items-center w-full my-6">
                <div className="flex-grow border-t border-gray-500"></div>
                <span className="px-4 text-gray-400 text-sm">or</span>
                <div className="flex-grow border-t border-gray-500"></div>
            </div>

            {/* By Size */}
            <div className="space-y-4">
                <li className="font-semibold">By Size</li>
                <p className="text-xs text-gray-400 italic">This will return image in JPG without transparency</p>
                <p className="text-base text-gray-400">Enter size:</p>

                <div className="flex flex-col gap-2">
                    <label htmlFor="size" className="text-sm font-medium text-gray-400">Size</label>
                    <div>
                        <input type="number" id="size" className="text-base border-2 rounded-lg px-3 py-1 w-[120px]" placeholder="e.g. 500" />
                        <span className="text-sm text-gray-400 ml-2">KB</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageResize
