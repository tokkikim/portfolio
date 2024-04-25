import Header from './Header';
import Main from './main/Main';
import Loding from './Loding';
import { useState } from 'react';

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const onAnimationEnd = () => {
    setIsLoading(false);
  };
  return (
    <div className='h-full bg-black text-white'>
      <Header></Header>
      <Main></Main>
      {isLoading && <Loding onAnimationEnd={onAnimationEnd}></Loding>}
    </div>
  );
};

export default MainPage;
