import React from "react";
import { Link } from "react-router-dom";

import peaksPlaceholderImage from "../assets/thepeaks.png";

export default function Newscard(props) {
  const { id, title, details, image, showImage, cardClasses } = props;
  return (
    <>
      {showImage === true ? (
        <div className={"card " + cardClasses}>
          <Link to={`/${id}`}>
            <img
              className="card-img"
              src={
                image === "" || typeof image === "undefined"
                  ? peaksPlaceholderImage
                  : image
              }
              alt=""
            />

            <div className="card-img-overlay">
              <h3>{title}</h3>
              <p>{details}</p>
            </div>
          </Link>
        </div>
      ) : (
        <div className={"card card-without-img " + cardClasses}>
          <Link to={`/${id}`}>
            <h3>{title}</h3>
            <p>{details}</p>
          </Link>
        </div>
      )}
    </>
  );
}
