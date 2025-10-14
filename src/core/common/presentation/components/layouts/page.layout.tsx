import React from 'react';
import { Outlet } from 'react-router-dom';

function PageLayout() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Outlet />
    </div>
  );
}

export default PageLayout;
