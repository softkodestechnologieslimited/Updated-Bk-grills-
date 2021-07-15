import React from "react";

import "./search.styles.scss";

const Search = () => {
  return (
    <section className="search-wrapper container">
      <form className="search-form">
        <input
          type="text"
          name="search"
          className="search-input"
          placeholder="Search for meals or drinks"
          // value={query}
          // onChange={onChange}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
    </section>
  );
};

export default Search;
