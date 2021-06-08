import React from "react";
import bookmarkon from "../assets/bookmarkon.svg";
import { Link } from "react-router-dom";

export default function SortingBookmark(props) {
  const bookmardivcls = props.hideBookmark ? "hidden" : "bookmarkbtn";
  return (
    <>
      <div className="sorting">
        <div className={bookmardivcls}>
          <Link to="/boomarkslist">
            <img src={bookmarkon} alt="" /> VIEW BOOKMARK
          </Link>
        </div>
        <select name="" onChange={(e) => props.handleSorting(e)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
    </>
  );
}
