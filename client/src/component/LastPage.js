import lastImg from '../assets/images/img_last_page.svg';

const LastPage = () => {
  return (
    <div className='bg-black flex flex-col justify-center items-center content-center text-white text-xl h-full'>
      <div className='text-8xl'>
        <div className='max-h-screen'>P O R T</div>
      </div>
      <div className='flex justify-center'>
        <img className='bg-cover w-10/12 max-h-screen ' src={lastImg} alt='' />
      </div>
      <div className='text-8xl'>
        <div className='max-h-screen'>F O I L O</div>
      </div>
    </div>
  );
};

export default LastPage;
