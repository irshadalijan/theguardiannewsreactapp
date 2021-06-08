import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import useCallGuardianApi from "../utils/useCallGuardianApi";
import Loader from "./Loader";
import NewsItems from "./NewsItems";
import SortingBookmark from "./SortingBookmark";

export default function SearchResults() {
  const { search } = useLocation();
  const { q } = queryString.parse(search);
  const [sorting, setSorting] = useState("newest");
  const [currPage, setCurrPage] = useState(2);
  const [totalPages, setTotalPages] = useState(1);

  const searchBasedNews = useCallGuardianApi(
    "search",
    "q=" + q + "&page=1&page-size=15&order-by=" + sorting
  );

  const moreNews = useCallGuardianApi(
    "search",
    "q=" + q + "&page=" + currPage + "&page-size=15&order-by=" + sorting
  );

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchBasedNews.isLoaded) {
      setTotalPages(searchBasedNews.data.pages);
      setSearchResults(searchBasedNews.data.results);
    }
  }, [searchBasedNews.isLoaded]);

  useEffect(() => {
    if (moreNews.isLoaded) {
      searchResults.push(...moreNews.data.results);
      setSearchResults(searchResults);
    }
  }, [currPage]);

  function handleSorting(e) {
    setSorting(e.target.value);
  }

  function handleLoadMore() {
    if (totalPages > 1 && currPage < totalPages) {
      setCurrPage(currPage + 1);
    } else {
      console.log("No More Results....");
    }
  }

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      handleLoadMore();
    }
  };

  return (
    <div className="content searchcontent">
      <section className={!searchBasedNews.isLoaded ? "hidden" : ""}>
        <h1>Search Results</h1>

        <SortingBookmark handleSorting={handleSorting} />
      </section>
      <div className="wrapper">
        {searchBasedNews.isLoaded ? (
          totalPages === 0 ? (
            "Results not found, try with another term."
          ) : (
            <NewsItems
              data={searchResults}
              hideBodyText={true}
              error={searchBasedNews.error}
            />
          )
        ) : (
          <Loader />
        )}
      </div>

      {moreNews.isLoaded ? null : <Loader />}
    </div>
  );
}
