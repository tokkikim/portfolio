import ScrollDown from '../ScrollDown';
import { useNavigate } from 'react-router-dom';

const text = `환영합니다
  개발자를 구하시나요?
  저에 대해 알려드리겠습니다.
  Check out my project now!
  스크롤을 내려 시작해보세요!`;

const Main = () => {
  const navigate = useNavigate();

  const navToProject = () => {
    navigate('/project');
  };

  return (
    <main
      className='flex flex-col h-full justify-center items-center'
      onWheel={navToProject}
    >
      <>
        <div className='relative w-[940px] h-[100px] overflow-hidden'>
          <div className='absolute animate-move'>
            <h1 className='text-7xl leading-tight content-center text-center'>
              환영합니다 <br />
              개발자를 구하시나요? <br />
              저에 대해 알려드리겠습니다.
              <br /> Check out my project now!
              <br /> 스크롤을 내려 시작해보세요!
            </h1>
          </div>
        </div>

        <ScrollDown></ScrollDown>
      </>
    </main>
  );
};

export default Main;
