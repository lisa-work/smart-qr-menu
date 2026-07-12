import logo from '@/assets/logo.png';

function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <img src={logo} alt="Logo" className="h-8 w-8" />
    </div>
  );
}

export default Logo;