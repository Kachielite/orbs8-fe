import React from "react";
import {Outlet} from 'react-router-dom';

import {GlobalLoader} from "@/core/common/presentation/components/global-loader";
import useSync from "@/core/common/presentation/state/hooks/use-sync";
import useGetUser from "@/features/user/presentation/state/hook/use-get-user";

const AuthLayout = () => {
    useSync();
    const {isFetchingUser} = useGetUser();
    if (isFetchingUser) {
        return <GlobalLoader show={true}/>;
    }

  return (
    <div className="min-h-screen flex items-center justify-center w-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
