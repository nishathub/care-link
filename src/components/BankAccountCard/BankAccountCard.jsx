const BankAccountCard = () => {
  return (
    <div className="flex items-center rounded-lg shadow-2xl overflow-hidden">
      <div className="hidden lg:flex items-center w-36 h-40 bg-sky-300">
        <img
          src="/city-bank-logo-resized.png"
          className=""
          alt="city-bank-logo"
        />
      </div>
      <div className="pl-2 flex-grow bg-sky-800 h-40 flex items-center">
        <ul className="">
          <li className="">
            <span className="inline-block w-32">Account Name</span>{" "}
            <span>: Care Link</span>
          </li>
          <li className="">
            <span className="inline-block w-32">Account Number</span>{" "}
            <span>: 20503100100179614</span>
          </li>
          <li className="">
            <span className="inline-block w-32">Bank</span>{" "}
            <span>: City Bank</span>
          </li>
          <li className="">
            <span className="inline-block w-32">Branch</span>{" "}
            <span>: Banani</span>
          </li>
          <li className="">
            <span className="inline-block w-32">Routing Number</span>{" "}
            <span>: 195270541</span>
          </li>
          <li className="">
            <span className="inline-block w-32">Swift Code</span>{" "}
            <span>: CITYBNDH</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BankAccountCard;
