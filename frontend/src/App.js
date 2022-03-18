import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import MainNavigation from "./navbar/MainNavigation";
import AlertHandler from "./homepage/AlertHandler";
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
  const [sampleResponse, setSampleResponse] = useState({});

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
          {/* <AlertHandler sampleResponse={sampleResponse} /> */}
          <Sample setShowSampleModal={setShowSampleModal} />
          <SampleModal
            setShowSampleModal={setShowSampleModal}
            showSampleModal={showSampleModal}
            setSampleResponse={setSampleResponse}
            methods={methods}
          />
          <Predict setShowPredictModal={setShowPredictModal} />
          <PredictModal
            setShowPredictModal={setShowPredictModal}
            showPredictModal={showPredictModal}
            methods={methods}
          />
          <Monitor />
        </FormProvider>
      </main>
    </div>
  );
};

export default App;
