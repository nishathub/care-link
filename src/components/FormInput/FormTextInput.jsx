const FormTextInput = ({
  label,
  type ="text",
  name,
  register,
  required = false,
  errors,
  ...rest
}) => (
  <label className="form-control w-full">
    <span className="label-text text-gray-800">{label}</span>
    <input
      type={type}
      {...register(name, { required })}
      className="input input-bordered w-full bg-white text-gray-800"
      // PLACEHOLDER IS HANDLED BY ...REST
      {...rest}
    />
    {errors?.[name] && (
      <p className="text-red-500 mt-1">{label.replace("*", "")} is required</p>
    )}
  </label>
);

export default FormTextInput;
