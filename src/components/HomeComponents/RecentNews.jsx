import Card from "../Card/Card";
import SectionHeading from "../SectionHeading/SectionHeading";

const RecentNews = () => {
  const numberOfCards = [1, 2, 3];
  return (
    <div>
      <div>
        <SectionHeading
          heading={"Impact Stories"}
          paragraph={"You can help to ease their lives"}
        ></SectionHeading>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {numberOfCards.map((i, card) => {
          return <Card key={i}></Card>;
        })}
      </div>
    </div>
  );
};

export default RecentNews;
