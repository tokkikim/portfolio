import { useState } from 'react';
import logo from '../assets/images/Logo.svg';
import LNB from '../assets/images/LNB.svg';
import { Link } from 'react-router-dom';
const Header = () => {
  const [menuClicked, setMenuClicked] = useState(false);

  const handleMenuClick = () => {
    // 메뉴 클릭 상태를 업데이트
    setMenuClicked(!menuClicked);
  };
  return (
    <header className='fixed top-0 left-0 right-0 z-50 px-10 py-5 tracking-tight text-white'>
      <nav className='flex justify-between  items-center px-5 py-[5px]'>
        <Link to='/'>
          <div className='flex'>
            <img src={logo} alt='로고' />
            <div className='flex flex-col justify-center'>
              <span className='text-[11px]'>KIMTOKKI PORTFOLIO</span>
              <span className='text-[14px]'>김토끼 포트폴리오</span>
            </div>
          </div>
        </Link>
        <div className='relative min-w-[200px] text-end'>
          <button
            className='cursor-pointer'
            onClick={handleMenuClick}
            aria-label='메뉴버튼'
          >
            MENU
          </button>
          {menuClicked && (
            <>
              <div className='bg-black absolute'>
                <img src={LNB} alt='Local Navigatoin Line' />
              </div>
              <ul className='absolute flex flex-col gap-5 top-11 text-start'>
                <li>
                  <Link to='/project'>PROJECTS</Link>
                </li>
                <li>
                  <Link to='/resume'>RESUME</Link>
                </li>
                <li>
                  <Link to='/communication'>COMMUNICATION</Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
