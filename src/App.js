import "./App.css";

import { SendBirdProvider as SBProvider } from "sendbird-uikit";
import { APP_ID, USER_ID, NICKNAME } from "./config";
import CustomizedApp from "./CustomizedApp";
import "sendbird-uikit/dist/index.css";

function App() {
  return (
    <div className="app-wrapper">
      <SBProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
        <CustomizedApp />
      </SBProvider>
    </div>
  );
}

export default App;
