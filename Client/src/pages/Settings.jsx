import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SettingsSidebar from '../components/Settings/util/SettingsSidebar';

export default function Settings() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const location = useLocation();
  const path = location.pathname;
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? (
    path === '/Settings' ? (
      <SettingsSidebar isMobile={isMobile} />
    ) : (
      <div>
        <Outlet context={{ formWidth: 'lg:w-[80%]', isMobile: isMobile }} />
      </div>
    )
  ) : (
    <div className='flex min-h-screen w-full'>
      <div className='fixed left-0 top-0 h-full w-72'>
        <SettingsSidebar isMobile={isMobile} />
      </div>
      <main className='ml-64 flex-1 p-10'>
        <div className='mx-auto max-w-3xl'>
          <Outlet context={{ formWidth: 'lg:w-full', isMobile: isMobile }} />
        </div>
      </main>
    </div>
  );
}
