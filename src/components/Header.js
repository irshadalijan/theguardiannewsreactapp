import React, { useRef } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import useSearchBoxClick from "../utils/useSearchBoxClick";

export default function Header() {
  const wrapdivRef = useRef(null);
  const { showHideSearchInput, inputDivCls } = useSearchBoxClick(wrapdivRef);

  const textInput = useRef(null);
  function handleShowHideInput() {
    textInput.current.focus();
  }

  function handleSubmit(e) {
    const query = textInput.current.value;
    if (query === "") {
      e.preventDefault();
    }
    return true;
  }

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <Link to="/">
            <img src={logo} className="logo" alt="logo" />
          </Link>
          <div ref={wrapdivRef} className={`searchinput ${inputDivCls}`}>
            <form action="/search" method="GET" onSubmit={handleSubmit}>
              <input
                name="q"
                placeholder="Search all news"
                type="text"
                ref={textInput}
                className={`${showHideSearchInput} searchfield changephcolor`}
              />
              <input
                type="submit"
                name=""
                className="searchbtn"
                value=""
                onClick={handleShowHideInput}
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
