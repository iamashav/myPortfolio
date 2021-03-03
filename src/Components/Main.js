import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animate from 'lottie-web';

const Main = () => {
  const container = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./developer.json'),
    });
    animate.setSpeed(0.5);
  }, []);

  return (
    <section className='my-16 px-5 md:my-32 flex flex-col flex-wrap space-y-16 md:space-y-0 patterns'>
      <div className='m-auto w-72 md:w-96 lg:w-2/5 md:mr-0'>
        <div className= 'container' ref={container}></div>
      </div>
      <div className='pt-20 max-w-md mb-auto space-y-5'>
        <h1 className='text-5xl font-bold md:text-7xl'>Hello. I’m Ashav</h1>
        <p className='tracking-wide leading-relaxed'>
          I am a Front-End developer and I love to make user-friendly and resposive websites. Every new project is a begining of a great adventure to me.{' '}
        </p>
      </div>
    </section>
  );
};

export default Main;
