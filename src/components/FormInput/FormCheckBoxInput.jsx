const FormCheckboxInput = ({ label, register, name }) => (
  <label className="flex items-center gap-3">
    <input
      type="checkbox"
      {...register(name)}
      className="checkbox checkbox-primary"
    />
    <span className="label-text text-gray-800">{label}</span>
  </label>
);
export default FormCheckboxInput;
