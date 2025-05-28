const OverlayLoader = ({ message = "Submitting..." }) => (
  <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
    <p className="text-white text-lg">{message}</p>
  </div>
);
export default OverlayLoader;
