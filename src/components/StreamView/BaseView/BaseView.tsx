import "./BaseView.scss";
import { useState } from "react";

const BaseView = (props: { myVideo?: any }) => {
  const { myVideo } = props;
  const [showFull, toggleShow] = useState<Boolean>(false);

  return (
    <div className={`base-view ${showFull ? "base-view-full" : ""}`}>
      <div
        className={`${showFull ? "full" : "default"}`}
        onClick={() => toggleShow(!showFull)}
      ></div>
      <h5>James Doe</h5>
      {/* <video controls playsInline  autoPlay>
        <source src={myVideo}  />
      </video> */}
      {/* {myVideo && <video src={myVideo} autoPlay playsInline />} */}

      {myVideo?.current && <video ref={myVideo} autoPlay playsInline />}
    </div>
  );
};

export default BaseView;
