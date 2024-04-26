import detail_img from '../../assets/images/project/detail_img/detail_1.png';
import button_left from '../../assets/images/icon/icon_button_left.svg';
import button_right from '../../assets/images/icon/icon_button_right.svg';
import img_close from '../../assets/images/icon/icon_close.svg';
const DetailPage = ({ close }) => {
  return (
    <div className='absolute top-0 z-50 w-full bg-black bg-opacity-70 flex justify-center items-center '>
      <div className='bg-black w-1/2 border-x-white border-2 text-white flex flex-col overflow-hidden'>
        <div className='px-10 pt-10'>
          <div className='grid  grid-rows-2 grid-cols-12 justify-between'>
            <h2 className=' row-start-2 col-start-1 col-end-5 py-2 text-2xl tracking-tight font-semibold'>
              포트폴리오 프로젝트
            </h2>
            <button className='col-start-12' onClick={close}>
              <img src={img_close} alt='' />
            </button>
          </div>
          <div className='flex text-lg'>
            <div className='pb-4 pr-5 '>
              <div className='py-1'>버전</div>
              <div className='py-1'>코드</div>
              <div className='py-1'>URL</div>
              <div className='py-1'>생성일</div>
            </div>
            <div className='pr-5 text-[#999999]'>
              <div className='py-1'>1.0.0.0</div>
              <div className='py-1'>
                https://github.com/jjangnarana/portfolio
              </div>
              <div className='py-1'>
                https://github.com/jjangnarana/portfolio
              </div>
              <div className='py-1'>2024년 4월 21일</div>
            </div>
          </div>
          <nav>
            <ul className='flex gap-2 text-black text-lg font-bold'>
              <li className='p-2 bg-white'>소개</li>
              <li className='p-2 bg-white'>와이어프레임</li>
              <li className='p-2 bg-white'>디자인</li>
              <li className='p-2 bg-white'>ERD</li>
            </ul>
          </nav>
          <main className='py-6'>
            <p>
              현재 접속한 포트폴리오 사이트입니다. <br />
              프론트앤드는 리액트를 사용하고 백앤드는 Node.js express
              프레임워크를 사용하였습니다. <br />
              사실 이전 초기 버전이 있었지만 웹 디자인을 전혀 고려하지 않아서
              <br />
              사이트를 볼때마다 가슴이 너무 답답하였습니다.
              <br />
              배포 직전 프로젝트를 엎었고 디자인부터 다시 하나하나 고민하며 새로
              시작한 프로젝트입니다.
              <br />
              처음엔 취업을 위해 만들었고, 앞으로는 소통과 지식공유의 공간으로
              재창조 해나갈 예정입니다.
            </p>
          </main>
        </div>
        <div className='relative flex justify-center items-center'>
          <img className='absolute left-5' src={button_left} alt='' />
          <img className='absolute right-5' src={button_right} alt='' />
          <img src={detail_img} alt='' className='' />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
