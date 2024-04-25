const Loding = ({ onAnimationEnd }) => {
  return (
    <div
      className='absolute z-1000 top-0 w-full h-1 bg-black animate-loding'
      onAnimationEnd={() => onAnimationEnd()}
    ></div>
  );
};

export default Loding;
