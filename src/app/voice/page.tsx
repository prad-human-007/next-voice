"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  LiveKitRoom,
  useVoiceAssistant,
  BarVisualizer,
  RoomAudioRenderer,
  VoiceAssistantControlBar,
  AgentState,
  DisconnectButton,
} from "@livekit/components-react";
import { useCallback, useEffect, useState } from "react";
import { MediaDeviceFailure } from "livekit-client";
import type { ConnectionDetails } from "../api/connection-details/route";
import { NoAgentNotification } from "@/components/NoAgentNotification";
import { CloseIcon } from "@/components/CloseIcon";
import { useKrispNoiseFilter } from "@livekit/components-react/krisp";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { TranscriptionTile } from "@/transcriptions/TranscriptionTile";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useRoomContext } from "@livekit/components-react";
import { useConnectionState } from "@livekit/components-react";
import MyControlBar from "@/components/MyControlBar";
export default function Page() {
  const [connectionDetails, updateConnectionDetails] = useState<
    ConnectionDetails | undefined
  >(undefined);
  const [agentState, setAgentState] = useState<AgentState>("disconnected");
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [audioTrack, setAudioTrack] = useState<any | null>(null);
  const [allMessages, setAllMessages] = useState<any | null>(null);

  useEffect(() => {
    const supabase = createClient();

    // Check authentication status
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (error || !user) {
        router.replace("/sign-in"); // Redirect unauthenticated users
      } else {
        /// Allow access if authenticated
        setIsAuthenticated(true)
      }
    
    });
  }, [router]);

  const onConnectButtonClicked = useCallback(async () => {
    // Generate room connection details, including:
    //   - A random Room name
    //   - A random Participant name
    //   - An Access Token to permit the participant to join the room
    //   - The URL of the LiveKit server to connect to
    //
    // In real-world application, you would likely allow the user to specify their
    // own participant name, and possibly to choose from existing rooms to join.

    const url = new URL(
      process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ??
      "/api/connection-details",
      window.location.origin
    );
    console.log("URL for the Voice mode: ", url.toString())
    const response = await fetch(url.toString());
    const connectionDetailsData = await response.json();
    console.log("Resonse from server: ", connectionDetailsData);
    updateConnectionDetails(connectionDetailsData);
  }, []);

  if(!isAuthenticated) {
    return (
        <>
        <h1> Loading... </h1>
        </>
    )
  }

  const onConvoClose = async () => {
    console.log("ALL MESSAGES: ", allMessages)
    let msgCombine = ''
    allMessages.forEach((element:any) => {
        console.log(element.message)
        msgCombine += element.message + ' ';
    });
    const response = await fetch('/api/score/', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: 'Summarize this in one line: ' + msgCombine,
    })
    const { message } = await response.json()
    console.log( message )
  }

  return (
    <main
      data-lk-theme="default"
      className="flex flex-col justify-center items-center h-screen bg-[var(--lk-bg)]"
    >
        <Button onClick={onConvoClose}> See Messages </Button>
        <LiveKitRoom
            token={connectionDetails?.participantToken}
            serverUrl={connectionDetails?.serverUrl}
            connect={connectionDetails !== undefined}
            audio={true}
            video={false}
            onMediaDeviceFailure={onDeviceFailure}
            onDisconnected={() => {
                updateConnectionDetails(undefined);
            }}
            className="flex flex-col max-h-full py-6 "
        >
        
            <SimpleVoiceAssistant onStateChange={setAgentState} onAudioTrackChange={setAudioTrack}/>
            <MyControlBar
                onConnectButtonClicked={onConnectButtonClicked}
                agentState={agentState}
                onConvoClose={onConvoClose}
            />
            {audioTrack && (
                <div className="flex w-full max-h-full justify-center items-center">
                    <div className="flex max-w-[400px] max-h-[400px] h-full w-full px-2 overflow-y-auto">
                        <TranscriptionTile
                            agentAudioTrack={audioTrack}
                            accentColor={'cyan'}
                            setAllMessages={setAllMessages}
                        />
                    </div>
                </div>
                
            )}
            <RoomAudioRenderer />
            <NoAgentNotification state={agentState} />
        </LiveKitRoom>
    </main>
  );
}

function SimpleVoiceAssistant(props: {
  onStateChange: (state: AgentState) => void;
  onAudioTrackChange: (track: any) => void;
}) {
  const { state, audioTrack } = useVoiceAssistant();
  useEffect(() => {
    props.onStateChange(state);
    props.onAudioTrackChange(audioTrack)
  }, [props, state]);

  return (
    <div className="flex flex-col gap-2 h-[300px] max-w-[90vw] mx-auto">
      <BarVisualizer
        state={state}
        barCount={5}
        trackRef={audioTrack}
        className="agent-visualizer"
        options={{ minHeight: 24 }}
      />
      
    </div>
  );
}

function onDeviceFailure(error?: MediaDeviceFailure) {
  console.error(error);
  alert(
    "Error acquiring camera or microphone permissions. Please make sure you grant the necessary permissions in your browser and reload the tab"
  );
}
