import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import MainNavigation from "./navbar/MainNavigation";
import Greetings from "./homepage/Greetings";
import Sample from "./homepage/Sample";
import Predict from "./homepage/Predict";
import SampleModal from "./modals/SampleModal";
import PredictModal from "./modals/PredictModal";
import Monitor from "./homepage/Monitor";
import "./css/customStyles.css";
import "./css/nc.css";

const App = () => {
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [showPredictModal, setShowPredictModal] = useState(false);

  const methods = useForm({
    mode: "onBlur",
    shouldUseNativeValidation: true,
  });

  return (
    <div>
      <MainNavigation />
      <main>
        <FormProvider {...methods}>
          <Greetings />
          <Sample setShowSampleModal={setShowSampleModal} />
          <SampleModal
            setShowSampleModal={setShowSampleModal}
            showSampleModal={showSampleModal}
            methods={methods}
          />
          <Predict setShowPredictModal={setShowPredictModal} />
          <PredictModal
            setShowPredictModal={setShowPredictModal}
            showPredictModal={showPredictModal}
          />
          <Monitor />
        </FormProvider>
      </main>
    </div>
  );
};

export default App;
