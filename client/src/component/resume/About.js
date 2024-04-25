import Header from '../Header';

const About = () => {
  return (
    <div className='bg-black h-full flex justify-center items-center text-white'>
      <Header></Header>
      <div className='w-[1420px] h-[635px]'>
        <h1 className='text-6xl'>RESUME</h1>
        <div className='flex gap-5 text-black text-xl font-bold my-5'>
          <button className='px-5 py-3 bg-white'>About</button>
          <button className='px-5 py-3 bg-white'>Career</button>
        </div>
        <div className='border-y-2 border-white tracking-tight'>
          <h6 className='mx-7 my-5 text-2xl'>About</h6>
          <div className='mx-7 my-5 flex flex-col text-lg'>
            <div className='flex gap-5'>
              <div>
                <div className='py-2'>이름</div>
                <div className='py-2'>생년월일</div>
                <div className='py-2'>연락처</div>
                <div className='py-2'>이메일</div>
              </div>
              <div className='text-[#999999]'>
                <div className='py-2'>김현석</div>
                <div className='py-2'>1986년 2월 13일</div>
                <div className='py-2'>010-3081-7615</div>
                <div className='py-2'>jjangnarana@gmail.com</div>
              </div>
            </div>
            <div>
              <div className='py-2'>저는 이런사람입니다</div>
              <div className='text-[#999999]'>
                디지털 옥외광고 업계에서 10년간 일해온 일꾼입니다. <br />
                운영센터, 관리, 구축, 솔루션 개발/설계 참여까지 매체 운영에
                있어서 A to Z 경험을 가지고 있습니다.
                <br />
                인생의 중요한 시기에 퇴사를 한 뒤 온라인 유통사업을 시작하고
                개인 창업을 준비했습니다. <br />
                결과를 떠나 삶의 태도와 가치관에 크게 영향을 받게 된 귀중한
                시간이었습니다.
                <br />
                지금까지의 경험을 바탕으로 앞으로의 미래를 계획했고 현재는
                개발자가 되기 위해 노력하고 있습니다.
                <br />
                색이 선명한, 패기 있으면서도 가볍지 않은 신입 개발자를
                찾으신다면 제가 좋은 선택지가 되어 드리겠습니다.
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

export default About;
