import { AnimatePresence, motion } from "framer-motion";
import { 
    DisconnectButton, 
    VoiceAssistantControlBar,
    AgentState
} from "@livekit/components-react";
import { useKrispNoiseFilter } from "@livekit/components-react/krisp";
import { CloseIcon } from "./CloseIcon";
import { useEffect } from "react";
import { useRoomContext } from "@livekit/components-react";

export default function MyControlBar(props: {
    onConnectButtonClicked: () => void;
    agentState: AgentState;
  }) {
    /**
     * Use Krisp background noise reduction when available.
     * Note: This is only available on Scale plan, see {@link https://livekit.io/pricing | LiveKit Pricing} for more details.
     */
    const krisp = useKrispNoiseFilter();
    useEffect(() => {
      krisp.setNoiseFilterEnabled(true);
    }, []);

    const room = useRoomContext()

    const onConectionClicked = () => {
        console.log("Connection Timer Started in My ControlBar");
        setTimeout(() => {
            console.log("20 seconds have passed in MyContorlBar");
            if(room){
              console.log('ROOM CONTEXT', room)
              room.disconnect(true)
            }
        }, 60000);
    }

    return (
      <div className="relative h-[100px]">
        <AnimatePresence>
          {props.agentState === "disconnected" && (
            <motion.button
              initial={{ opacity: 0, top: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, top: "-10px" }}
              transition={{ duration: 1, ease: [0.09, 1.04, 0.245, 1.055] }}
              className="uppercase absolute left-1/2 -translate-x-1/2 px-4 py-2 bg-white text-black rounded-md"
              onClick={() => {
                  props.onConnectButtonClicked();
                  onConectionClicked()
              }}
            >
              Start a conversation
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {props.agentState !== "disconnected" &&
            props.agentState !== "connecting" && (
              <motion.div
                initial={{ opacity: 0, top: "10px" }}
                animate={{ opacity: 1, top: 0 }}
                exit={{ opacity: 0, top: "-10px" }}
                transition={{ duration: 0.4, ease: [0.09, 1.04, 0.245, 1.055] }}
                className="flex h-8 absolute left-1/2 -translate-x-1/2  justify-center"
              >
                <VoiceAssistantControlBar controls={{ leave: false }} />
                <DisconnectButton>
                  <CloseIcon />
                </DisconnectButton>
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    );
  }