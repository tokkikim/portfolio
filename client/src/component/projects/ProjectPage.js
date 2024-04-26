import Header from '../Header';
import Main from './Main';
import Loding from '../Loding';
import DetailPage from './DetailPage';
import { useState } from 'react';

const ProjectPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const ClickDetail = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  const onAnimationEnd = () => {
    setIsLoading(false);
  };

  return (
    <div className='h-full bg-black text-white'>
      <Header></Header>
      <Main onClick={ClickDetail}></Main>
      {isLoading && <Loding onAnimationEnd={onAnimationEnd}></Loding>}
      {open && <DetailPage close={close} />}
    </div>
  );
};

export default ProjectPage;
