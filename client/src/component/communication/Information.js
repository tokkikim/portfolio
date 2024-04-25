import Header from '../Header';
import ScrollDown from '../ScrollDown';
import Marquee from '../Marquee';
const Information = () => {
  return (
    <div className='flex flex-col bg-black h-full text-white'>
      <Header></Header>
      <main className='py-36 px-60'>
        <h1 className='text-6xl tracking-tight m-3'>COMMUNICATION</h1>
        <div className='text-xl text-black font-medium'>
          <button className='px-5 py-3 m-2 bg-white'>Infomation</button>
          <button className='px-5 py-3 m-2 bg-white'>Send mail</button>
        </div>
        <h3 className='text-2xl tracking-tight m-2'>Information</h3>
        <div className='flex gap-7 m-3'>
          <div className='flex flex-col gap-2'>
            <div>이메일</div>
            <div>연락처</div>
            <div>github</div>
            <div>blog</div>
          </div>
          <div className='text-[#999999] flex flex-col gap-2'>
            <div>jjangnarana@gmail.com</div>
            <div>010-3081-7615</div>
            <div>https://github.com/jjangnarana</div>
            <div>https://developer-kimtokki.tistory.com/</div>
          </div>
        </div>
      </main>
      <ScrollDown />
      <div class='flex-1 content-end'>
        <Marquee />
      </div>
    </div>
  );
};

export default Information;
