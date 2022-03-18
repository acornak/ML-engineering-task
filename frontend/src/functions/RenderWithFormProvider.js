import React from "react";
import { useForm, FormProvider } from "react-hook-form";

const RenderWithFormProvider = ({ children }) => {
  const methods = useForm({
    mode: "onBlur",
    shouldUseNativeValidation: true,
  });

  const { watch } = methods;

  return (
    <FormProvider {...methods}>
      <div>{JSON.stringify(watch())}</div>
      {children}
    </FormProvider>
  );
};

export default RenderWithFormProvider;
