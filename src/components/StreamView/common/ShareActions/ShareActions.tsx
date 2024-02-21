import { Button } from "components/ui";
import "./ShareActions.scss";
import { useState } from "react";
import { copyToClipboard } from "utils/helper";

const ShareActions = (props: { callId?: any }) => {
  const { callId } = props;
  const [isCopied, setIsCopied] = useState<Boolean>(false);
  
  const handleCopy = () => {
    copyToClipboard(callId);
    setIsCopied(true);
  };

  return (
    <div className="share-actions">
      <b onClick={handleCopy}>{isCopied ? "URL Copied" : "Copy Meeting URL"}</b>
      <Button text="Turn Meeting Public" />
    </div>
  );
};

export default ShareActions;
