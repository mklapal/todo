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
    <div className="text-center border">
      <h1>Search</h1>

      <input placeholder="Search" value={value} onChange={handleChange} />
    </div>
  );
};

export default Search;
