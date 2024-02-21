const StreamViewActions = (props: {
  stopWebcam?: Function;
  startWebcam?: Function;
  stopAudio?: Function;
  startAudio?: Function;
  isWebCamEmabled: Boolean;
}) => {
  const { startWebcam, isWebCamEmabled, stopWebcam } = props;
  const handleWebcam = () => {
    isWebCamEmabled ? stopWebcam?.() : startWebcam?.();
  };
  return (
    <div className="stream-view_actions">
      <div>M</div>
      <div>C</div>
      <div onClick={handleWebcam}>V</div>
    </div>
  );
};

export default StreamViewActions;
