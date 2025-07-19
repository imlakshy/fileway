import React, { act } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = ({ active }) => {
    return (
        <div
            className={``}
        >
            <div
                className={`leading-[1.3] transition-all duration-1000 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent ${active !== ""
                        ? "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold"
                        : "text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black"
                    }`}
            >
                FileWay
            </div>
        </div>

    )
}

export default NavBar
