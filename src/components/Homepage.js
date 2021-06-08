import { useState } from "react";
import TopStories from "./Topstories";
import NewsItems from "./NewsItems";
import Loader from "./Loader";
import SortingBookmark from "./SortingBookmark";
import useCallGuardianApi from "../utils/useCallGuardianApi";

export default function Homepage() {
  let catNames = [];
  catNames["sport"] = "Sports";
  catNames["culture"] = "Culture";
  catNames["lifeandstyle"] = "Life & Style";
  const [sorting, setSorting] = useState("newest");
  const [category, setCategory] = useState("sport");
  const [categoryName, setCategoryName] = useState("Sports");

  const TopStoriesList = useCallGuardianApi(
    "search",
    "section=news&page-size=8&order-by=" + sorting
  );

  const categoryBasedNews = useCallGuardianApi(
    "search",
    "section=" + category + "&page-size=3&order-by=" + sorting
  );

  function handleSorting(e) {
    setSorting(e.target.value);
  }

  function handleChangeCategory(e) {
    setCategory(e.target.value);
    setCategoryName(catNames[e.target.value]);
  }

  return (
    <div className="content">
      <section className={!TopStoriesList.isLoaded ? "hidden" : ""}>
        <h1>Top Stories</h1>

        <SortingBookmark handleSorting={handleSorting} />
      </section>
      {TopStoriesList.isLoaded ? (
        <TopStories
          data={TopStoriesList.data.results}
          error={TopStoriesList.error}
        />
      ) : (
        <Loader />
      )}

      <>
        <section className={!categoryBasedNews.isLoaded ? "hidden" : ""}>
          <h1>{categoryName}</h1>
          <div className="sorting">
            <p>
              <strong>Change Category</strong>
            </p>
            <select name="" onChange={(e) => handleChangeCategory(e)}>
              <option value="sport">Sport</option>
              <option value="culture">Culture</option>
              <option value="lifeandstyle">Life & Style</option>
            </select>
          </div>
        </section>
        <div class="wrapper">
          <div className="row mt-1">
            {categoryBasedNews.isLoaded ? (
              <NewsItems
                data={categoryBasedNews.data.results}
                hideBodyText={true}
                error={categoryBasedNews.error}
              />
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </>
    </div>
  );
}
