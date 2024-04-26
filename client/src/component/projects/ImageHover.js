import { Link } from 'react-router-dom';
import DetailPage from './DetailPage';
import { useState } from 'react';

const ImageHover = ({ onClick }) => {
  return (
    <div
      className={
        'hidden group-hover:block absolute w-full h-full bg-black bg-opacity-40'
      }
    >
      <div className='flex-none p-2 m-5 text-2xl '>포트폴리오 프로젝트</div>
      <div className='absolute top-0 h-full w-full flex justify-center items-center'>
        <button
          onClick={onClick}
          className='w-32 h-16  bg-black bg-opacity-70 text-center content-center'
        >
          More Detail
        </button>
      </div>
    </div>
  );
};

export default ImageHover;
