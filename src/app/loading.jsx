import CustomLoading from "@/components/CustomLoading/CustomLoading";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-800 text-center">
      <CustomLoading size={52}/>
    </div>
  );
};

export default Loading;
