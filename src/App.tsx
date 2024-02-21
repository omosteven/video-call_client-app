import "./App.css";
import StreamView from "components/StreamView/StreamView";
import GetStarted from "pages/GetStarted/GetStarted";
import { useState } from "react";
import { ContextProvider } from "socketContext";

export const MODES = {
  AUTH: "AUTH",
  STREAM: "STREAM",
};

function App() {
  const [mode, setMode] = useState(MODES.AUTH);
  const [isCaller, setIsCaller] = useState(false);

  const startStream = (isCalling: boolean) => {
    setIsCaller(isCalling);
    setMode(MODES.STREAM);
  };

  const renderBasedOnMode = () => {
    switch (mode) {
      case MODES.AUTH:
        return <GetStarted startStream={startStream} />;
      case MODES.STREAM:
        return <StreamView />;
      default:
        return "";
    }
  };

  return (
    <div className="">
      <ContextProvider
        hasMeetingStarted={!isCaller ? mode === MODES.STREAM : isCaller}
      >
        {renderBasedOnMode()}
      </ContextProvider>
    </div>
  );
}

export default App;
