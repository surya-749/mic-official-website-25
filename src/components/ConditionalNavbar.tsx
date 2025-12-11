'use client';

import { usePathname } from 'next/navigation';
import CubeNavbar from './navbar';
import Image from 'next/image';
import Link from 'next/link';   


const Logo = () => (
    <Image
      src="/images/mic-logo.png"
      alt="MIC Logo"
      width={80}
      height={80}
      style={{ position: 'absolute', top: 20, left: 20, zIndex: 9999, cursor: 'pointer', imageRendering: 'pixelated' }}
      priority
    />
);

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Don't render navbar on home page
  if (pathname === '/' || pathname === '/mobile') {
    return <Logo />;
  }
  
  return (
    <>
      <CubeNavbar />
      <Link href="/main" >
      <Logo />
      </Link>
      
    </>
  );
}