import { createContext, useState, useRef, useEffect, ReactNode } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext({});

const socket = io("wss://video-call-server-app.onrender.com/");

const ContextProvider = (props: {
  children: ReactNode;
  hasMeetingStarted?: Boolean;
}) => {
  const { children, hasMeetingStarted } = props;

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [name, setName] = useState("StevenTest");
  const [call, setCall] = useState<{
    signal?: any;
    from?: any;
    isReceivingCall?: any;
    name?: any;
    callerName?: any;
  }>({});
  const [me, setMe] = useState("");
  const myVideo = useRef<any>({
    srcObject: "",
  });

  const userVideo = useRef<any>({
    srcObject: "",
  });

  const connectionRef = useRef<any>();

  const startWebcam = async () => {
    try {
      // Request access to the user's camera
      const streamVideo: any = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // if (myVideo.current) {
      setStream(streamVideo);
      // console.log('video started', streamVideo)
      myVideo.current.srcObject = streamVideo;
      return streamVideo;
      // }
      // return streamVideo;
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const stopWebcam = async () => {
    if (myVideo.current) {
      const stream = myVideo.current.srcObject;
      if (stream) {
        // const tracks: Array<any> = stream?.getTracks?.();
        // tracks.forEach((track) => track.stop());
      }
    }
  };

  useEffect(() => {
    const myVideoRef = myVideo.current;

    if (hasMeetingStarted) {
      startWebcam();
    }

    socket.on("me", (id) => setMe(id));
    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    return () => {
      if (myVideoRef) {
        const stream = myVideoRef.srcObject;
        if (stream) {
          // const tracks: Array<any> = stream.getTracks();
          // tracks.forEach((track) => track.stop());
        }
      }
    };
    // eslint-disable-next-line
  }, [hasMeetingStarted]);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data: any) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream: any) => {
      console.log("answered call", currentStream);
      // if (userVideo?.current) {
      userVideo.current.srcObject = currentStream;
      // }
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const initiateCall = (id: any, callerVideoStream: any) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: callerVideoStream,
    });

    peer.on("signal", (data: any) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream: any) => {
      console.log("initiate call", currentStream);
      //  if(userVideo?.current){
      userVideo.current.srcObject = currentStream;
      //  }
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const callUser = async (id: any) => {
    const callerVideoStream = await startWebcam();
    setTimeout(() => {
      initiateCall(id, callerVideoStream);
    }, 3000);
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current?.destroy?.();
    window.location.reload();
  };

  console.log('userVideo', userVideo)
  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        stopWebcam,
        startWebcam,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
