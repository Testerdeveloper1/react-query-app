import React from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";

function SimpleReactHookform() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{ required: true, maxLength: 30 }}
        render={({ field }) => (
          <InputText
            {...field}
            aria-invalid={errors.name ? "true" : "false"}
            placeholder="Name"
          />
        )}
      />
      {errors.name && errors.name.type === "required" && (
        <span role="alert">This is required</span>
      )}
      {errors.name && errors.name.type === "maxLength" && (
        <span role="alert">Max length exceeded</span>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

export default SimpleReactHookform;
