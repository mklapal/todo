import React, { useState } from "react";

interface Props {
  onSearch: (arg1: string) => void;
}

const Search: React.FC<Props> = ({ onSearch }) => {
  const [value, setValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <div className="flex md:fixed md:right-0">
      <div className="bg-blue-200 flex m-auto md:m-0 md:ml-auto py-5 pr-5 pl-5">
        <input
          className="p-2 h-[40px] outline-none"
          placeholder="Search"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Search;
