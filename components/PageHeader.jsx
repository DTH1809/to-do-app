import React from "react";

const PageHeader = ({ text }) => {
  return (
    <header className="p-4 bg-sky-800 rounded-md lg:px-8 text-center my-5">
      <h1 className="text-2xl font-bold text-white">
        {text}
      </h1>
    </header>
  );
};

export default PageHeader;