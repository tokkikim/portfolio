import scrollDown from '../assets/images/icon/icon_scrolldown.svg';
const ScrollDown = () => {
  return (
    <div className='absolute bottom-12 left-12'>
      <div className='py-10 text-center animate-ping-py'>scroll down</div>
      <img className='' src={scrollDown} />
    </div>
  );
};

export default ScrollDown;
