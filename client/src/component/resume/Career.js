import Header from '../Header';
import ScrollDown from '../ScrollDown';

const Career = () => {
  return (
    <div className='bg-black h-full flex justify-center items-center text-white '>
      <Header></Header>
      <ScrollDown></ScrollDown>
      <div className='w-[1420px] h-[635px] '>
        <h1 className='text-6xl '>RESUME</h1>
        <div className='flex gap-5 text-black text-xl font-bold my-5'>
          <button className='px-5 py-3 bg-white'>About</button>
          <button className='px-5 py-3 bg-white'>Career</button>
        </div>
        <div className='border-y-2 border-white tracking-tight'>
          <h6 className='mx-7 my-5 text-2xl'>Career</h6>
          <div className='mx-7 my-5 flex flex-col text-lg'>
            <div className='flex gap-5'>
              <div className='leading-tight	'>
                <div className='py-2'>회사명</div>
                <div className='py-2'>기간</div>
              </div>
              <div className='text-[#999999] leading-tight	'>
                <div className='py-2'>씨제이파워캐스트</div>
                <div className='py-2'>2012.08 ~ 2020.11 (8년 4개월)</div>
              </div>
            </div>
            <div>
              <div className='py-2'>회사소개 및 담당업무</div>
              <div className='text-[#999999] leading-tight	'>
                씨제이파워캐스트(현 CJCGV)는 CGV극장 광고 및 외부전광판 등의
                옥외 광고사업와 방송 송출 대행 사업을 영위하는 회사입니다.{' '}
                <br />
                <br />
                □ 광고 매체 운영/관리
                <br />
                - 전국 CGV의 스크린/로비, 삼성역 옥외자유표시구역의 대형전광판,
                코엑스, 올리브영,
                <br />
                이마트, 지하철, 고속도로 빌보드 외 다수 매체의 디지털 광고
                운영/관리
                <br />
                <br />
                □ 광고 매체 운영 파트 관리
                <br />
                - 광고 소재 인코딩, 편성, 모니터링, 장비 및 서버 관리 등 운영을
                담당하는 파트의 관리를 맡아
                <br />
                인력과 업무 관리
                <br />
                <br />
                □ 광고 매체 운영 프로그램 개발
                <br />
                - 광고 송출과 편성을 위한 프로그램 개발에 참여
                <br />
                - 회사의 ERP와 광고 프로그램 통합 및 고도화를 위한 프로젝트 참여
                <br />
              </div>
            </div>
            <div className='py-4'>
              <button className='flex-none text-lg font-bold px-5 py-3 bg-white text-black'>
                Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
