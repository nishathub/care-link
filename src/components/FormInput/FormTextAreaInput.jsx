const FormTextAreaInput = ({ label, register, name, required = false, errors, placeholder }) => (
  <label className="form-control w-full">
    <p className="label-text text-gray-700 mb-1">{label}</p>
    <textarea
      {...register(name, { required })}
      placeholder={placeholder}
      className="textarea textarea-bordered w-full bg-white text-gray-800"
      rows={3}
    />
    {errors?.[name] && <p className="text-red-500 mt-1">{label.replace("*", "")} is required</p>}
  </label>
);
export default FormTextAreaInput;
