import CustomLoading from "@/components/CustomLoading/CustomLoading";

const Loading = () => {
  return (
    <div className="flex items-center justify-center text-center">
      <CustomLoading size={42}/>
    </div>
  );
};

export default Loading;
