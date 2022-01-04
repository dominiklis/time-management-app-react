import React, { useState } from "react";
import "./SearchForm.css";

import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";
import InputField from "../Inputs/InputField";

const SearchForm = () => {
  let navigate = useNavigate();

  const [searchInput, setsearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchInput}`);
  };

  const handleChange = (e) => setsearchInput(e.target.value);

  return (
    <div className="search">
      <h5>search</h5>
      <form className="search__form" onSubmit={handleSubmit}>
        <InputField
          onChange={handleChange}
          fullwidth
          value={searchInput}
          id="searchInput"
          type="text"
          name="searchInput"
          lightBorder
        />
        <Button type="submit" color="primary" disabled={!searchInput}>
          search
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
