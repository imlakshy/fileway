import React, { act } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = ({ active }) => {
    return (
        <div
            className={`bg-[#121212] flex w-full justify-center items-center transition-all border-b-2 border-amber-900 duration-1000  ${active !== "" ? "h-20" : "h-[50vh]"}`}
        >
            <div
                className={`leading-[1.3] transition-all duration-1000 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent ${active !== ""
                        ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
                        : "text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black"
                    }`}
            >
                FileWay
            </div>
        </div>

    )
}

export default NavBar
