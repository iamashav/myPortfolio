import React from 'react';
import {motion} from 'framer-motion';


const Contact = ({contactDelay}) => {


    return (
        <motion.div
            initial={{
                scale: 0,
                }}
            animate={{
                scale: 1,
            }}
            transition={{
                delay: contactDelay,
                duration: 0.45,
            }}
        >
        <section className='my-28' id='contact'>
            <header className='px-5 text-2xl font-bold pt-10'>
                <h2>Contact Me</h2>
                <p className='text-base font-thin'>I'd love to hear your thoughts!</p>
            </header>
            <div className='md:mx-6 flex flex-col flex-wrap md:flex-row justify-between'>
                <div className='md:w-6/12 md:px-0 my-1'>
                    
                    <div className='flex flex-row flex-wrap mt-7'>
                        <div className='ml-4 md:ml-0 mr-4'>
                            <a href='mailto: ashavparihar7@gmail.com' target='_blank' rel='noreferrer'>
                                <span className='mb-2 flex flex-row items-end border border-gray-500 p-2 rounded-lg text-sm'>
                                    <img src='./images/icons/external-link.svg' alt='' width='24px' height='24px' className='mr-1' />
                                    Email
                                </span>
                            </a>
                        </div>
                        <div className='ml-4 md:ml-0 mr-4'>
                            <a href='https://www.linkedin.com/in/ashavparihar/' target='_blank' rel='noreferrer'>
                                <span className='mb-2 flex flex-row items-end border border-gray-500 p-2 rounded-lg text-sm'>
                                <img src='./images/icons/linkedin.svg' alt='' width='24px' height='24px' className='mr-1' />
                                LinkedIn
                                </span>
                            </a>
                        </div>

                        <div className='ml-4 md:ml-0 mr-4'>
                            <a href='https://github.com/iamashav' target='_blank' rel='noreferrer'>
                                <span className='mb-2 flex flex-row items-end border border-gray-500 p-2 rounded-lg text-sm'>
                                <img src='./images/icons/github.svg' alt='' width='24px' height='24px' className='mr-1' />
                                GitHub
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
                
            <div className='pt-20 max-w-md m-auto space-y-5'>
                <p className='text-lg sm:text-3xl md:text-5xl font-light footer-font text-center'>That's all, folks.</p>
            </div>
        </section>
        </motion.div>
    );
};

export default Contact;
