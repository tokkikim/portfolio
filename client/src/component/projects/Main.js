import img1 from '../../assets/images/project/project_img1.svg';
import img2 from '../../assets/images/project/project_img2.svg';
import img3 from '../../assets/images/project/project_img3.svg';
import img4 from '../../assets/images/project/project_img4.svg';
import dragBarInner from '../../assets/images/icon/icon_dragbar_inner.svg';
import dragBarOuter from '../../assets/images/icon/icon_dragbar_outer.svg';

import ScrollDown from '../ScrollDown';
import ImageHover from './ImageHover';
import Marquee from '../Marquee';
import DetailPage from './DetailPage';

import { useState } from 'react';

const Main = ({ onClick, close }) => {
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
    <main className='flex flex-col  justify-center items-center h-full'>
      <div className='grid grid-cols-12 px-6 w-full'>
        <h1 className='col-span-3 content-center text-6xl p-2'>PROJECT</h1>
      </div>
      {/* <div className='bg-white w-full h-[28em] px-6 py-12 overflow-hidden'> */}
      <div className='bg-white px-6 py-12 overflow-hidden'>
        <div className='relative w-full h-full flex gap-6 flex-nowrap box-content'>
          {images.map((img, index) => (
            <div className='group relative' key={index}>
              <ImageHover onClick={onClick} close={close} />
              <img src={img.src} alt='' />
            </div>
          ))}
        </div>
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
