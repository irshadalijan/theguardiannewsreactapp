import NewsCard from "./Newscard";
import { limitChars } from "../utils/helper_funcs";

export default function NewsItems(props) {
  const { error, data, hideBodyText } = props;

  const mediumCardClasses = "w32 f-left medium-card btred";

  return error !== null ? (
    <h3>{error}</h3>
  ) : (
    <>
      {data.map((item, index) => (
        <NewsCard
          key={index}
          id={item.id}
          title={item.webTitle}
          details={
            hideBodyText === true ? "" : limitChars(item.fields.bodyText, 50)
          }
          image={item.fields.thumbnail}
          showImage={true}
          cardClasses={mediumCardClasses}
        />
      ))}
    </>
  );
}
