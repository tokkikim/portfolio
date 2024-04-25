const ImageHover = ({ className }) => {
  return (
    <div
      className={'absolute w-full h-full bg-black bg-opacity-40 flex flex-col'}
    >
      <div className='flex-none p-2 m-5 text-2xl '>포트폴리오 프로젝트</div>
      <div className='absolute top-0 h-full w-full flex justify-center items-center'>
        <div className='w-32 h-16 bg-black bg-opacity-70 text-center content-center'>
          More Detail
        </div>
      </div>
    </div>
  );
};

export default ImageHover;
