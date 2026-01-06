import React from "react";

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex h-screen overflow-hidden">{children}</div>;
};

export default CommonDashboardLayout;
