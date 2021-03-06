import React, { useState, useEffect, useMemo } from "react";
import bookmarkoff from "../assets/bookmarkoff.svg";
import bookmarkon from "../assets/bookmarkon.svg";
import useCallGuardianApi from "../utils/useCallGuardianApi";
import Loader from "./Loader";

export default function Newsdetails() {
  const slug = window.location.pathname.replace(/^\/|\/$/g, "");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkText, setBookmarkText] = useState("ADD BOOKMARK");
  const [bookmarkicon, setBookmarkicon] = useState(false);

  const newsInfo = useCallGuardianApi(slug, "format=json");
  const info = newsInfo;
  const response = info.data;
  const boomarksArr = JSON.parse(localStorage.getItem("bookmarks"));
  let listbookmarks = useMemo(() => {
    return boomarksArr || [];
  }, [boomarksArr]);

  useEffect(() => {
    if (newsInfo.isLoaded) {
      var alreadyBookmarked = listbookmarks.includes(response.content.id);

      if (alreadyBookmarked === true) {
        setIsBookmarked(true);
        setBookmarkText("REMOVE BOOKMARK");
        setBookmarkicon(true);
      }
    }
  }, [newsInfo.isLoaded, listbookmarks, response]);

  function handleBookmark() {
    setBookmarkicon(!bookmarkicon);
    if (bookmarkicon) {
      setBookmarkText("ADD BOOKMARK");
      var filteredlist = listbookmarks.filter(function (value, index, arr) {
        return value !== response.content.id;
      });
      localStorage.setItem("bookmarks", JSON.stringify(filteredlist));
    } else {
      if (!isBookmarked) {
        listbookmarks.push(response.content.id);
        localStorage.setItem("bookmarks", JSON.stringify(listbookmarks));
      }

      setBookmarkText("REMOVE BOOKMARK");
    }
  }

  return (
    <div className="content detailspage">
      {newsInfo.isLoaded ? (
        <>
          <section>
            <div
              className="leftcontent"
              style={{ borderBottom: "solid 1px #ddd" }}
            >
              <div className="row mt-2">
                <button className="bookmarkbtn" onClick={handleBookmark}>
                  <img
                    src={bookmarkicon === true ? bookmarkon : bookmarkoff}
                    alt=""
                  />{" "}
                  {bookmarkText}
                </button>
              </div>

              <div className="row">
                <p>
                  {new Date(response.content.webPublicationDate).toString()}
                </p>
              </div>
              <div className="row">
                <h1>{response.content.webTitle}</h1>
              </div>
              <div className="row">
                <h3>{response.content.fields.headline}</h3>
              </div>
            </div>
            <div className="rightcontent"></div>
          </section>

          <section>
            <div className="leftcontent">
              <div className="row">
                <div
                  dangerouslySetInnerHTML={{
                    __html: response.content.fields.body,
                  }}
                />
              </div>
            </div>
            <div className="rightcontent">
              <img src={response.content.fields.thumbnail} alt="" />
            </div>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
