import React from 'react';
import {motion} from 'framer-motion';

const Header = ({delay}) => {
    return (
        <motion.div 
            initial={{
            opacity: 0,
            y: -150,
            }}
            animate={{
            opacity: 1,
            y: 0,
            }}
            transition={{
            delay: delay,
            type: "spring",
            damping: 8,
            }}
        >
            <nav className='space-x-10'>
                <ul className='flex flex-row space-x-4 md:space-x-10 md:text-xl justify-center md:justify-end font-thin'>
                    <li>
                        <a href='#projects' className='py-1 px-5 hover:bg-gray focus:bg-gray rounded-lg'>
                            Projects
                        </a>
                    </li>
                    <li>
                        <a href='#contact' className='py-1 px-5 hover:bg-gray focus:bg-gray rounded-lg'>
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
        </motion.div>
    );
};

export default Header;