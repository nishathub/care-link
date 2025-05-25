import OngoingCasesComponent from "@/components/HomeComponents/OngoingCasesComponent";

const OngoingCases = async () => {
  return (
    <div>
      <h1>Ongoing Projects</h1>
      <div>
        <OngoingCasesComponent
          hideMoreButton={true}
          hideSectionTitle={true}
        ></OngoingCasesComponent>
      </div>
    </div>
  );
};

export default OngoingCases;
