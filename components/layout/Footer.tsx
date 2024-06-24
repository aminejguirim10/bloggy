import React from "react";

const Footer = () => {
  const cuurentYear = new Date().getFullYear();
  return (
    <div className="max-w-7xl mx-auto py-4 px-6 border-t w-full flex justify-center items-center font-bold mt-6">
      Made By Amine Jguirim {cuurentYear}
    </div>
  );
};

export default Footer;
