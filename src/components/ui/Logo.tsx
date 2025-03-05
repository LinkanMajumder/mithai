import React from 'react';
import { Candy } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return <Candy className={`w-8 h-8 ${className}`} />;
};

export default Logo;