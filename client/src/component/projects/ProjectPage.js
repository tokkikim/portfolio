import Header from '../Header';
import Main from './Main';
import Loding from '../Loding';
import { useState } from 'react';

const ProjectPage = () => {
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

export default ProjectPage;
