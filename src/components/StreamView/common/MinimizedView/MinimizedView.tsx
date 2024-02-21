import "./MinimizedView.scss";
import { Button } from "components/ui";

const MinimizedView = (props: {
  videoSrc?: any;
  videoName?: any;
  hasIncomingCall?: Boolean;
  answerCall?: Function;
}) => {
  const { videoSrc, videoName, hasIncomingCall, answerCall } = props;
  return (
    <div className="minimized-view">
      {/* mine */}
      <h5>{videoName || "Steven Omole"}</h5>
      {videoSrc?.current && <video ref={videoSrc} autoPlay playsInline />}
      {hasIncomingCall && (
        <Button text="Accept Call" onClick={() => answerCall?.()} />
      )}
    </div>
  );
};

export default MinimizedView;
