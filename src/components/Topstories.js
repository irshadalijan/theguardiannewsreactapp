import NewsCard from "./Newscard";
import { limitChars } from "../utils/helper_funcs";

export default function Topstories(props) {
  const { error, data } = props;
  const results = data;
  const mediumCardClasses = "w32 f-left medium-card btred";
  const smallCardClasses = "w48 f-left small-card";
  const miniCardClasses = "w48 f-left";

  return error !== null ? (
    <h3>{error}</h3>
  ) : (
    <>
      <div className="wrapper">
        <div className="row">
          <div className="w50 mr-5">
            <NewsCard
              id={results[0].id}
              title={results[0].webTitle}
              details={limitChars(results[0].fields.bodyText)}
              image={results[0].fields.thumbnail}
              showImage={true}
              cardClasses="btgreen large-card"
            />
          </div>
          <div className="w50">
            <div className="row">
              <NewsCard
                id={results[1].id}
                title={results[1].webTitle}
                details=""
                image={results[1].fields.thumbnail}
                showImage={true}
                cardClasses={`${smallCardClasses} btred`}
              />

              <NewsCard
                id={results[2].id}
                title={results[2].webTitle}
                details=""
                image={results[2].fields.thumbnail}
                showImage={true}
                cardClasses={`${smallCardClasses} btyellow`}
              />
            </div>
            <div className="row mt-1">
              <NewsCard
                id={results[3].id}
                title={results[3].webTitle}
                details=""
                image={results[3].fields.thumbnail}
                showImage={false}
                cardClasses={`${miniCardClasses} btred`}
              />

              <NewsCard
                id={results[4].id}
                title={results[4].webTitle}
                details=""
                image={results[4].fields.thumbnail}
                showImage={false}
                cardClasses={`${miniCardClasses} btyellow`}
              />
            </div>
          </div>
        </div>

        <div className="row mt-1">
          <NewsCard
            id={results[5].id}
            title={results[5].webTitle}
            details={limitChars(results[5].fields.bodyText, 50)}
            image={results[5].fields.thumbnail}
            showImage={true}
            cardClasses={mediumCardClasses}
          />

          <NewsCard
            id={results[6].id}
            title={results[6].webTitle}
            details={limitChars(results[6].fields.bodyText, 50)}
            image={results[6].fields.thumbnail}
            showImage={true}
            cardClasses={mediumCardClasses}
          />

          <NewsCard
            id={results[7].id}
            title={results[7].webTitle}
            details={limitChars(results[7].fields.bodyText, 50)}
            image={results[7].fields.thumbnail}
            showImage={true}
            cardClasses={mediumCardClasses}
          />
        </div>
      </div>
    </>
  );
}
