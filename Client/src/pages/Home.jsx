/** @format */

import useUser from '../hooks/useUser';
import Feed from '../components/Home/Feed';
import Sidebar from '../components/Home/Sidebar/Sidebar';
import Connection from '../components/Home/Connections/Connection';
import Chat from './Chat';
import LoggedUserFooter from '../components/util/LoggedUserFooter';
import CompaniesList from '../components/company/CompaniesList';
import AddExperienceForm from '../components/Home/Sidebar/AddExperienceForm';
import { useState } from 'react';
import useScrollLock from '../hooks/useScrollLock';

function Home() {
  const user = useUser();
  const [isFormOpen, setIsFormOpen] = useState(false);

  useScrollLock(isFormOpen);

  const pageSpcs = {
    width: 'fit',
    title: ' Add to your feed',
  };
  return (
    <div
      className={`w-full gap-5 lg:flex lg:justify-around xl:px-40 2xl:px-96`}
    >
      <div className='hidden max-w-[20%] lg:flex xl:max-w-[35%]'>
        <Sidebar setIsFormOpen={setIsFormOpen} />
      </div>

      <div className='lg:w-[60%]'>
        <Feed user={user} />
      </div>

      <div className='hidden w-[25%] gap-2 md:flex md:flex-col'>
        <Connection pageSpecs={pageSpcs} />
        <CompaniesList />
        <LoggedUserFooter />
      </div>

      {isFormOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <AddExperienceForm setIsFormOpen={setIsFormOpen} />
        </div>
      )}

      <div className='hidden lg:fixed lg:bottom-0 lg:right-0 lg:z-50 lg:block'>
        <Chat />
      </div>
    </div>
  );
}

export default Home;
