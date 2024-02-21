import ListOtherMembers from "../common/ListOtherMembers/ListOtherMembers";
import MinimizedView from "../common/MinimizedView/MinimizedView";
import ShareActions from "../common/ShareActions/ShareActions";
import "./OtherViews.scss";

const OtherViews = (props: {
  hasOtherMember: Boolean;
  userVideo?: any;
  userName?: any;
  callId?: any;
  answerCall?: Function;
  hasIncomingCall?: Boolean;
  stream: MediaStream;
}) => {
  const {
    userName,
    userVideo,
    callId,
    hasIncomingCall,
    answerCall,
    stream,
    hasOtherMember,
  } = props;

  return (
    <div className="other-views">
      <ShareActions callId={callId} />
      {[1].map(() => (
        <MinimizedView
          videoSrc={userVideo}
          videoName={userName}
          hasIncomingCall={hasIncomingCall}
          answerCall={answerCall}
          stream={stream}
          hasOtherMember={hasOtherMember}
        />
      ))}

      <ListOtherMembers />
    </div>
  );
};

export default OtherViews;
