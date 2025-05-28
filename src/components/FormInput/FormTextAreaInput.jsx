const FormTextAreaInput = ({ label, register, name, required, errors, placeholder }) => (
  <label className="form-control w-full">
    <span className="label-text text-gray-700">{label}</span>
    <textarea
      {...register(name, { required })}
      placeholder={placeholder}
      className="textarea textarea-bordered w-full bg-white text-gray-800"
      rows={4}
    />
    {errors?.[name] && <p className="text-red-500 mt-1">{label} is required</p>}
  </label>
);
export default FormTextAreaInput;
