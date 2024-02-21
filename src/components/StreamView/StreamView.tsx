import { SocketContext } from "socketContext";
import BaseView from "./BaseView/BaseView";
import OtherViews from "./OtherViews/OtherViews";
import "./StreamView.scss";
import StreamViewActions from "./StreamViewActions/StreamViewActions";
import { useContext } from "react";

const StreamView = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    startWebcam,
    stopWebcam,
    answerCall,
    me,
  } = useContext<any>(SocketContext);

  console.log({
    call,
    myVideo,
    userVideo,
    stream,
    callAccepted,
    name,
    me,
    callEnded,
    isEqual: myVideo === userVideo,
    g:callAccepted && !callEnded
  });
  return (
    <div className="stream-view">
      <BaseView myVideo={myVideo} />
      <OtherViews
        userVideo={userVideo}
        userName={call?.name}
        hasOtherMember={callAccepted && !callEnded}
        callId={me}
        answerCall={answerCall}
        hasIncomingCall={call?.isReceivingCall && !callAccepted}
        stream={stream}
      />
      <StreamViewActions
        {...{ startWebcam, stopWebcam }}
        isWebCamEmabled={Boolean(myVideo)}
      />
    </div>
  );
};

export default StreamView;
