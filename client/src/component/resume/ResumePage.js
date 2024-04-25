import img1 from '../../assets/images/resume/img1.svg';
import img2 from '../../assets/images/resume/img2.svg';
import img3 from '../../assets/images/resume/img3.svg';

import Header from '../Header';
import ScrollDown from '../ScrollDown';

const ResumePage = () => {
  return (
    <>
      <div className='relative min-h-full w-full bg-black text-white'>
        <div className='flex h-screen'>
          <div
            className='flex-none w-1/4 bg-cover bg-center bg-opacity-75 shadow-lg'
            style={{ backgroundImage: `url(${img1})` }}
          ></div>
          <div
            className='flex-1 w-1/4 bg-cover bg-center bg-opacity-75 shadow-lg'
            style={{ backgroundImage: `url(${img2})` }}
          ></div>
          <div
            className='flex-none w-1/4 bg-cover bg-center bg-opacity-75 shadow-lg'
            style={{ backgroundImage: `url(${img3})` }}
          ></div>
        </div>
        <Header></Header>
        <ScrollDown></ScrollDown>
        <div className='absolute top-36 left-16 text-5xl tracking-tight leading-tight	'>
          <p>
            쉬운 일도 없고 힘들지 않은 일도 없습니다. <br />
            모든 일이 비슷하게 어렵고 힘이 든다면
            <br />
            저는 <span className='text-6xl text-[#FF8888]'>하고 싶은 일</span>을
            하고 살겠습니다.
            <br />
            끊임없이 도전하는 개발자 김현석입니다.
          </p>
        </div>
      </div>
    </>
  );
};

export default ResumePage;
