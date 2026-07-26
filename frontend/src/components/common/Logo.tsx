import logo from '@/assets/logo.png';

function Logo() {
  return (
    <div className="">
      <img src={logo} alt="Logo" className="h-30 w-30 md:h-40 md:w-40 lg:h-50 lg:w-50" />
    </div>
  );
}

export default Logo;