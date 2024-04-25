import Header from '../Header';
import ScrollDown from '../ScrollDown';
import Marquee from '../Marquee';

const Sendmail = () => {
  return (
    <div className='flex flex-col bg-black  text-white relative'>
      <Header></Header>
      <main className='py-36 px-60'>
        <h1 className='text-6xl tracking-tight m-3'>COMMUNICATON</h1>
        <div className='text-xl text-black font-medium'>
          <button className='px-5 py-3 m-2 bg-white'>Infomation</button>
          <button className='px-5 py-3 m-2 bg-white'>Send mail</button>
        </div>
        <h3 className='text-2xl tracking-tight m-2'>Send Mail</h3>
        <div>
          <form className='flex flex-col' action=''>
            <label className='m-2' htmlFor='subject'>
              제목
            </label>
            <input
              className='mx-2 mb-3 p-2 w-96 bg-black border-2'
              name='subject'
              type='text'
              placeholder='제목을 입력하세요'
            />
            <label className='m-2' htmlFor='content'>
              내용
            </label>
            <textarea
              className='mx-2 p-2 w-2/4 h-80 bg-black border-2'
              name='content'
              placeholder='내용을 입력하세요'
            ></textarea>
            <div>
              <input
                type='submit'
                className='px-5 py-3 m-2 bg-white text-black'
                value={'보내기'}
              />
            </div>
          </form>
        </div>
      </main>
      <div className='absolute bottom-0'>
        <Marquee />
      </div>
      <ScrollDown />
    </div>
  );
};

export default Sendmail;
