import React, { useState, useEffect } from "react";
import useCallGuardianApi from "../utils/useCallGuardianApi";
import Loader from "./Loader";
import NewsItems from "./NewsItems";
import SortingBookmark from "./SortingBookmark";

export default function Bookmarkslist() {
  const [sorting, setSorting] = useState("newest");
  const listbookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const ids = listbookmarks.toString();
  const filterStr = ids !== "" ? "ids=" + ids + "&order-by=" + sorting : "";
  const [listResults, setListResults] = useState([]);
  const bookmarkedNews = useCallGuardianApi("search", filterStr);

  useEffect(() => {
    if (filterStr !== "") {
      if (bookmarkedNews.isLoaded) {
        setListResults(bookmarkedNews.data.results);
      }
    }
  }, [bookmarkedNews, filterStr]);

  function handleSorting(e) {
    setSorting(e.target.value);
  }

  return (
    <div className="content searchcontent wrapper">
      <section>
        <h1>All Bookmark</h1>

        <SortingBookmark hideBookmark={true} handleSorting={handleSorting} />
      </section>

      {ids !== "" ? (
        bookmarkedNews.isLoaded ? (
          <NewsItems
            data={listResults}
            hideBodyText={true}
            error={bookmarkedNews.error}
          />
        ) : (
          <Loader />
        )
      ) : (
        "Bookmarks list is empty."
      )}
    </div>
  );
}
