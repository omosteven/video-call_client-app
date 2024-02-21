import { Button, Input } from "components/ui";
import "./GetStarted.scss";
import { useContext, useState } from "react";
import { SocketContext } from "socketContext";

const GetStarted = (props: { startStream: Function }) => {
  const { startStream } = props;
  const [loading, setLoading] = useState(false);
  const [meetingId, setMeetingId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { callUser } = useContext<any>(SocketContext);

  const onSubmit = (e: any) => {
    e?.preventDefault?.();
    setErrorMessage("");
    if (!Boolean(meetingId?.length)) {
      setErrorMessage("Meeting link or ID is required");
    } else {
      callUser(meetingId);
      startStream(true);
    }
  };

  return (
    <div className="get-started">
      <h1>Vide-Chat Made Free!</h1>
      <form onSubmit={onSubmit}>
        <Input
          placeholder="Enter meeting code or paste link"
          type="text"
          name="text"
          onChange={setMeetingId}
          hasError={Boolean(errorMessage)}
          required
        />
        <Button text="Join" isLoading={loading} />
      </form>

      <div className="get-started__actions">
        <Button
          text="Or Start New Meeting"
          className="start_new"
          onClick={() => startStream()}
        />
        <Button text="Sign Up" className="signup" />
      </div>
    </div>
  );
};

export default GetStarted;
