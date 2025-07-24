const FormSelectInput = ({ label, register, name, required = false, errors, options }) => (
  <label className="form-control w-full">
    <p className="label-text text-gray-800 mb-1">{label}</p>
    <select
      {...register(name, { required })}
      className="select select-bordered bg-white text-gray-800 w-full"
      defaultValue=""
    >
      <option value="" disabled>Select {name.toLowerCase()}</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    {errors?.[name] && <p className="text-red-500 mt-1">{label.replace("*", "")} is required</p>}
  </label>
);
export default FormSelectInput;
