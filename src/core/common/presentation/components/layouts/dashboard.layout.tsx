import {Outlet} from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center w-screen">
      <Outlet />
    </div>
  );
};

export default DashboardLayout;