import * as React from 'react';
import LeonSans from 'leonsans/src/leonsans';

function useLeonSans(canvasRef, fontOptions, canvasOptions) {
  const { canvasWidth, canvasHeight, pixelRatio, backgroundColor } = canvasOptions;
  const leonSansRef = React.useRef(null);
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();
  const context = React.useRef(null);
  let animate = null;
  

  React.useEffect(() => {
    if (context.current === null && canvasRef.current !== null) {
      context.current = canvasRef.current.getContext("2d");
    }
  }, [context, canvasRef]);

  React.useEffect(() => {
    if (canvasRef.current === null || context.current === null) {
      return;
    }
    
    const animate = (time) => {
      if (context.current === null || leonSansRef === null) {
        return;
      }
  
      previousTimeRef.current = time;
      
      requestRef.current = requestAnimationFrame(animate);
      context.current.clearRect(0, 0, canvasWidth, canvasHeight);
      
      const x = (canvasWidth - leonSansRef.current.rect.w) / 2;
      const y = (canvasHeight - leonSansRef.current.rect.h) / 2;
      leonSansRef.current.position(x, y);
      leonSansRef.current.draw(context.current);
    };

    canvasRef.current.width = canvasWidth * pixelRatio;
    canvasRef.current.height = canvasHeight * pixelRatio;
    canvasRef.current.style.width = canvasWidth + "px";
    canvasRef.current.style.height = canvasHeight + "px";
    canvasRef.current.style.backgroundColor = backgroundColor;
    context.current.scale(pixelRatio, pixelRatio);
    leonSansRef.current = new LeonSans({ ...canvasOptions, ...fontOptions });
    requestRef.current = requestAnimationFrame(animate);
  }, [animate, context, canvasHeight, canvasOptions, canvasRef, canvasWidth, fontOptions, pixelRatio, backgroundColor]);

  return { leonSansRef };
}

export default useLeonSans;
