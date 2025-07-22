import BankAccountCard from "@/components/BankAccountCard/BankAccountCard";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Image from "next/image";
import DonationForm from "../DonationForm/DonationForm";
import { Quote } from "lucide-react";
import PageCover from "../PageCover/PageCover";

const SingleItemDetails = ({
  data,
  showExpense = true,
  showBankCard = true,
  showDonationForm = true,
  showQuote = true,
}) => {
  const fallbackImage =
    "https://res.cloudinary.com/dntewbvod/image/upload/v1752316345/y9DpT_hflfb4.jpg";

  return (
    <div>
      <div className="absolute z-10 left-0 w-full top-16 lg:top-20">
        <PageCover pageName={data?.title} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-4 sm:mt-0">
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
          {data?.quote1 && (
            <div className="text-center bg-sky-100 rounded-lg shadow-2xl p-4">
              <Quote className="text-sky-700 w-8 lg:w-12 h-auto mx-auto"></Quote>
              <p className="text-lg lg:text-xl italic font-semibold mt-2">
                {data?.quote1}
              </p>
            </div>
          )}
          {data?.quote2 && (
            <div className="text-center bg-sky-100 rounded-lg shadow-2xl p-4">
              <p className="text-lg lg:text-xl font-semibold mt-2">
                {data?.quote2}
              </p>
            </div>
          )}

          {showExpense && (
            <div className="bg-sky-100 rounded-lg shadow-2xl p-4">
              <h6 className="font-bold text-sky-700">Expense</h6>
              <ul className="steps steps-vertical">
                {data?.expenseCategories?.map((cat, index) => {
                  return (
                    <li key={index} className="step step-neutral">
                      {cat}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {data?.numericDetails && (
            <div className="bg-sky-100 text-justify rounded-lg shadow-2xl p-4">
              <p className="">{data?.numericDetails}</p>
            </div>
          )}
        </div>
        <div className="max-w-2xl mx-auto w-full space-y-8">
          {(data?.context || data?.goal) && (
            <div className="bg-sky-100 text-justify rounded-lg shadow-2xl p-4">
              <p className="">{data?.context}</p>
              <p className="">{data?.goal}</p>
            </div>
          )}
          {data?.description && (
            <div className="bg-sky-100 text-justify rounded-lg shadow-2xl p-4">
              <p className="">{data?.description}</p>
            </div>
          )}
          {(data?.goal || data?.strategy) && (
            <div className="bg-sky-100 text-justify rounded-lg shadow-2xl p-4">
              <p className="">{data?.strategy}</p>
              <p className="">{data?.appeal}</p>
            </div>
          )}

          {showBankCard && <BankAccountCard></BankAccountCard>}
          {showDonationForm && (
            <div className="">
              <DonationForm tag={data?.tag} title={data?.title}></DonationForm>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleItemDetails;
