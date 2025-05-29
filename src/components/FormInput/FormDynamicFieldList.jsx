import { useFieldArray } from "react-hook-form";

const FormDynamicFieldList = ({
  control,
  register,
  name,
  label,
  required = false,
  errors,
}) => {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div>
      <span className="label-text text-gray-800">{label}</span>
      <div className="space-y-2 mt-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center">
            <input
              {...register(`${name}.${index}`, { required })}
              placeholder={`Item ${index + 1}`}
              className="input input-bordered w-full bg-white text-gray-800"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append("")}
          className="btn btn-sm bg-gray-700 text-white mt-2"
        >
          + Add {label}
        </button>
      </div>
    </div>
  );
};

export default FormDynamicFieldList;
