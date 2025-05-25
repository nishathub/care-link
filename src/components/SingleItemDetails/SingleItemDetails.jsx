import BankAccountCard from "@/components/BankAccountCard/BankAccountCard";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Image from "next/image";

const SingleItemDetails = ({data}) => {
  const imageLink =
    "https://t4.ftcdn.net/jpg/06/72/16/39/360_F_672163907_F9iv8hElbhWk9KmDR1HkVAadniCElTyB.jpg";

  return (
    <div>
      <SectionHeading heading={data.projectTitle}></SectionHeading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="max-w-2xl mx-auto w-full space-y-8">
          <div className="h-80 border rounded-lg shadow-2xl relative">
            <Image
              src={imageLink}
              alt="charity-photo"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover rounded-lg"
            ></Image>
          </div>
          <div className="border rounded-lg shadow-2xl p-4">
            <p className="text-lg lg:text-xl font-bold text-sky-700 text-center">
              {data.relatedQuote}
            </p>
          </div>
          <div className="border rounded-lg shadow-2xl p-4">
            <h6 className="font-bold text-sky-700">Expense Category</h6>
            <ul className="steps steps-vertical">
              {data.spendCategories.map((cat, index) => {
                return (
                  <li key={index} className="step">
                    {cat}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="max-w-2xl mx-auto w-full space-y-8">
          <div className="border text-justify rounded-lg shadow-2xl p-4">
            <p className="">{data.description}</p>
          </div>
          <BankAccountCard></BankAccountCard>
          <div className="h-72 border rounded-lg shadow-2xl p-4">
            Payment Form
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItemDetails;
