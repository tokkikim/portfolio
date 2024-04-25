import img1 from '../../assets/images/project/project_img1.svg';
import img2 from '../../assets/images/project/project_img2.svg';
import img3 from '../../assets/images/project/project_img3.svg';
import img4 from '../../assets/images/project/project_img4.svg';
import dragBarInner from '../../assets/images/icon/icon_dragbar_inner.svg';
import dragBarOuter from '../../assets/images/icon/icon_dragbar_outer.svg';

import ScrollDown from '../ScrollDown';
import ImageHover from './ImageHover';
import Marquee from '../Marquee';

import { useState } from 'react';

const Main = () => {
  const [images, setImages] = useState([
    { src: img1, isHovered: false },
    { src: img2, isHovered: false },
    { src: img3, isHovered: false },
    { src: img4, isHovered: false },
  ]);

  const handleMouseover = (index) => () => {
    const newImages = images.map((img, i) => ({
      ...img,
      isHovered: i === index ? true : img.isHovered,
    }));
    setImages(newImages);
  };

  const handleMouseOut = (index) => () => {
    const newImages = images.map((img, i) => ({
      ...img,
      isHovered: i === index ? false : img.isHovered,
    }));
    setImages(newImages);
  };

  return (
    <main className='flex flex-col  items-center h-full'>
      <div className=' w-2/3 text-6xl mt-36 mb-7 p-2'>PROJECT</div>
      <div className='flex gap-6 bg-white w-full px-6 py-12'>
        {images.map((img, index) => (
          <div
            className='relative'
            onMouseOver={handleMouseover(index)}
            onMouseOut={handleMouseOut(index)}
            key={index}
          >
            {img.isHovered && <ImageHover />}
            <img src={img.src} alt='' />
          </div>
        ))}
      </div>
      <div className='relative flex justify-center p-2'>
        <img src={dragBarOuter} alt='' />
        <img className='absolute' src={dragBarInner} alt='' />
      </div>
      <div className='m-10 p-5 text-xl bg-white text-black'>
        더 많은 프로젝트를 확인하세요!
      </div>
      <ScrollDown></ScrollDown>
      <Marquee />
    </main>
  );
};

export default Main;
