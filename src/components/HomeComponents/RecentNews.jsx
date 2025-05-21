import Link from "next/link";
import Card from "../Card/Card";
import SectionHeading from "../SectionHeading/SectionHeading";

const RecentNews = () => {
  const numberOfCards = [1, 2, 3];
  return (
    <div>
      <div>
        <SectionHeading
          heading={"Recent News & Updates"}
          paragraph={""}
        ></SectionHeading>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {numberOfCards.map((i, card) => {
          return <Card key={i}></Card>;
        })}
      </div>
      <div className="w-fit mx-auto mt-6">
        <Link className="btn btn-primary w-60" href={"/"}>
          More
        </Link>
      </div>
    </div>
  );
};

export default RecentNews;
