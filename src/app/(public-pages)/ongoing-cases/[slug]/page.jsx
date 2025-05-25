import BankAccountCard from "@/components/BankAccountCard/BankAccountCard";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Image from "next/image";

const SingleOngoing = () => {
  const imageLink =
    "https://t4.ftcdn.net/jpg/06/72/16/39/360_F_672163907_F9iv8hElbhWk9KmDR1HkVAadniCElTyB.jpg";

  const relatedQuote = `inventore minima soluta aspernatur rerum esse sed iusto possimus fugit tempora nisi. Sequi, totam ratione
        laboriosam distinctio animi commodi est praesenti`;

  const spendCategories = [
    "Buy Land",
    "Construction",
    "Utilities",
    "Scholarships",
  ];
  const description = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi nam
        delectus natus placeat vitae ea dolor officia ad distinctio non
        accusantium, quod nisi et corrupti sunt tempore magnam saepe deleniti
        aliquid? Assumenda libero esse nihil officiis quam. Tempore totam nihil
        consequuntur fuga in nam sint ratione, at, similique voluptatem
        necessitatibus rerum porro eius quidem officiis sequi dolorum possimus
        dicta! Explicabo quas hic labore iste recusandae tempore inventore
        minima soluta aspernatur rerum esse sed iusto possimus fugit, ex non, a
        nesciunt eos magni, aperiam cum! Vitae quam fugiat eveniet dicta, ex
        cupiditate temporibus ipsam nihil tempora nisi. Sequi, totam ratione
        laboriosam distinctio animi commodi est praesentium natus esse optio
        maiores at ducimus ullam saepe fugiat rerum nihil facere eius dicta
        libero veritatis. Ipsam consequuntur maxime fuga. Sit laborum corporis
        officia rerum dolorum ipsam aut, ipsum, distinctio quasi earum, cum
        tempora! Doloribus deserunt non a magni fugit cum quo laborum omnis
        soluta iure facilis, praesentium ducimus nihil laboriosam obcaecati
        officiis quasi quisquam, aspernatur corrupti exercitationem quas
        deleniti optio voluptatem officia. Laborum aut nemo deleniti. Animi,
        nihil suscipit. Quas veritatis exercitationem repellendus possimus
        accusamus sint praesentium reprehenderit laborum blanditiis. Minima
        eligendi modi perspiciatis laudantium sequi similique excepturi,
        deleniti voluptate molestias! Natus ab similique maxime ullam saepe
        voluptates optio fuga sapiente libero, eligendi nostrum nam! Illo
        voluptatem at asperiores corrupti deleniti ipsam laudantium, dolor
        consequatur voluptate numquam illum harum ea voluptatibus eaque amet!
        Sint, recusandae minima esse autem voluptate quia! Quam voluptate quis
        rerum mollitia expedita, libero eos adipisci quae reprehenderit!
        Voluptatem, ut facilis at fugiat consequuntur sunt distinctio, expedita
        blanditiis nulla optio magni maiores tenetur! Libero non, expedita
        soluta ipsam aperiam doloribus accusantium odio est pariatur tempora sit
        reiciendis rem ipsa error deserunt, qui aut sunt, porro cumque dicta
        nemo perferendis atque hic voluptatem. Placeat earum totam incidunt.
        Eligendi labore quibusdam animi voluptate.`;

  return (
    <div>
      <SectionHeading
        heading={"Single Page Title Long Large Two Lines Alignment "}
      ></SectionHeading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="max-w-2xl mx-auto w-full space-y-8">
          <div className="h-80 border rounded-lg shadow-2xl relative">
            <Image
              src={imageLink}
              alt="charity-photo"
              fill
              className="object-cover rounded-lg"
            ></Image>
          </div>
          <div className="border rounded-lg shadow-2xl p-4">
            <p className="text-lg lg:text-xl font-bold text-sky-700 text-center">
              {relatedQuote}
            </p>
          </div>
          <div className="border rounded-lg shadow-2xl p-4">
            <h6 className="font-bold text-sky-700">Spend Category</h6>
            <ul className="steps steps-vertical">
              {spendCategories.map((cat, index) => {
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
            <p className="">{description}</p>
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

export default SingleOngoing;
