import React from 'react';
import {motion} from 'framer-motion';

const Skills = ({skillsDelay}) => {
  return (
    <motion.div
        initial={{
            scale: 0,
            }}
        animate={{
            scale: 1,
        }}
        transition={{
            delay: skillsDelay,
            duration: 0.45,
        }}
      >
    <section className='my-28  px-5'>
      <header className='text-2xl font-bold pt-10'>
        <h2>Skills & Tools</h2>
      </header>
      <div className='my-7 grid gap-5 grid-cols-3 md:grid-cols-6'>
        <div className='flex flex-col items-center' tabIndex='0' role='img' aria-label='Javascript'>
          <img src='./images/icons/javascript-original.svg' alt='' loading='lazy' className='w-16 mb-1' width='64px' height='64px' />
          Javascript
        </div>
        <div className='flex flex-col items-center' tabIndex='0' role='img' aria-label='React Js'>
          <img src='./images/icons/react-original.svg' alt='' loading='lazy' className='w-16 mb-1' width='64px' height='64px' />
          React JS
        </div>
        <div className='flex flex-col items-center' tabIndex='0' role='img' aria-label='Redux'>
          <img src='./images/icons/icons8-redux.svg' alt='' loading='lazy' className='w-16 mb-1' width='64px' height='64px' />
          Redux
        </div>
        <div className='flex flex-col items-center' tabIndex='0' role='img' aria-label='Python'>
          <img src='./images/icons/icons8-python.svg' alt='' loading='lazy' className='w-16 mb-1' width='64px' height='64px' />
          Python
        </div>
        <div className='flex flex-col items-center' tabIndex='0' role='img' aria-label='HTML 5'>
          <img src='./images/icons/html5-original.svg' alt='' loading='lazy' className='w-16 mb-1' width='64px' height='64px' />
          HTML 5
        </div>
        <div className='flex flex-col items-center' tabIndex='0' role='img' aria-label='CSS 3'>
          <img src='./images/icons/css3-original.svg' alt='' loading='lazy' className='w-16 mb-1' width='64px' height='64px' />
          CSS 3
        </div>
      </div>
    </section>
    </motion.div>
  );
};

export default Skills;
