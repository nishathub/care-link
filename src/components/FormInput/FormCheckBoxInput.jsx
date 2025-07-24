const FormCheckboxInput = ({ label, register, name }) => (
  <label className="flex items-center gap-3 mt-1">
    <input
      type="checkbox"
      {...register(name)}
      className="checkbox checkbox-success bg-white"
    />
    <span className="label-text text-gray-800">{label}</span>
  </label>
);
export default FormCheckboxInput;
