import BankAccountCard from "@/components/BankAccountCard/BankAccountCard";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Image from "next/image";
import DonationForm from "../DonationForm/DonationForm";
import { Quote } from "lucide-react";

const SingleItemDetails = ({
  data,
  showExpense = true,
  showBankCard = true,
  showDonationForm = true,
  showQuote = true,
}) => {
  const fallbackImage =
    "https://t4.ftcdn.net/jpg/06/72/16/39/360_F_672163907_F9iv8hElbhWk9KmDR1HkVAadniCElTyB.jpg";

  return (
    <div>
      <SectionHeading heading={data?.title}></SectionHeading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="max-w-2xl mx-auto w-full space-y-8">
          <div className="h-80 rounded-lg shadow-2xl relative">
            <Image
              src={data?.imageLink ? data.imageLink : fallbackImage}
              alt="charity-photo"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              unoptimized
              className="object-cover rounded-lg"
            ></Image>
          </div>
          {showQuote && (
            <div className="text-center bg-sky-100 rounded-lg shadow-2xl p-4">
              <Quote className="text-sky-700 w-8 lg:w-12 h-auto mx-auto"></Quote>
              <p className="text-lg lg:text-xl italic font-semibold mt-2">
                {data?.relatedQuote}
              </p>
            </div>
          )}
          {showExpense && (
            <div className="bg-sky-100 rounded-lg shadow-2xl p-4">
              <h6 className="font-bold text-sky-700">Expense</h6>
              <ul className="steps steps-vertical">
                {data?.expenseCategories?.map((cat, index) => {
                  return (
                    <li key={index} className="step">
                      {cat}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div className="max-w-2xl mx-auto w-full space-y-8">
          <div className="bg-sky-100 text-justify rounded-lg shadow-2xl p-4">
            <p className="">{data?.description}</p>
          </div>
          {showBankCard && <BankAccountCard></BankAccountCard>}
          {showDonationForm && (
            <div className="">
              <DonationForm></DonationForm>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleItemDetails;
