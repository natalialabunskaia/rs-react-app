import Navbar from '@components/Navbar';
import { Outlet } from 'react-router';

const Root = () => {
  return (
    <>
      <Navbar />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
