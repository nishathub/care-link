import Link from "next/link";
import Card from "../Card/Card";
import SectionHeading from "../SectionHeading/SectionHeading";

const ImpactStories = () => {
  const numberOfCards = [1, 2, 3, 4, 5, 6];
  return (
    <div>
      <div>
        <SectionHeading
          heading={"Impact Stories"}
          paragraph={"Your Donation Matters"}
        ></SectionHeading>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {numberOfCards.map((i, card) => {
          return (
            <Card
              key={i}
              readMoreLink="/"
              image={
                "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              }
              title={"Card Title"}
              description={"Short description of the story ..."}
            ></Card>
          );
        })}
      </div>
      <div className="w-fit mx-auto mt-6">
        <Link className="btn btn-primary w-40" href={"/"}>
          More
        </Link>
      </div>
    </div>
  );
};

export default ImpactStories;
