const FormTextInput = ({ label, name, placeholder, register, required, errors, ...rest }) => (
  <label className="form-control w-full">
    <span className="label-text text-gray-800">{label}</span>
    <input
      {...register(name, { required })}
      className="input input-bordered w-full bg-white text-gray-800"
      placeholder={placeholder}
      {...rest}
    />
    {errors?.[name] && <p className="text-red-500 mt-1">{label} is required</p>}
  </label>
);

export default FormTextInput;
