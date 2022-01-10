import React from "react";
import PriorityFilter from "../PriorityFilter/PriorityFilter";
import SearchForm from "../SearchForm/SearchForm";
import "./SearchAndFilterHeader.css";

const SearchAndFilterHeader = ({ priority, setPriority }) => {
  return (
    <div className="search-filter-header">
      <SearchForm />
      <PriorityFilter selected={priority} setSelected={setPriority} />
    </div>
  );
};

export default SearchAndFilterHeader;
