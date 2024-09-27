import {
  Call,
  CallingState,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
export default function CallScreen() {
  const [call, setCall] = useState<Call | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const client = useStreamVideoClient();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    let slug: string;

    if (id !== "(home)" && id) {
      // Joining existing call
      slug = id.toString();

      const _call = client?.call("default", slug);
      _call?.join({ create: false }).then(() => {
        // Toast popup
        setCall(_call);
      });
    } else {
      // Creating a new call
      slug = "demoroom";
      const _call = client?.call("default", slug);
      _call?.join({ create: true }).then(() => {
        // Toast popup
        setCall(_call);
      });
    }

    setSlug(slug);
  }, [id, client]);

  useEffect(() => {
    if (call?.state.callingState! !== CallingState.LEFT) {
      call?.leave();
    }
  }, [call]);

  if (!call || !slug) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <StreamCall call={call}>
      <Text>[id]</Text>
    </StreamCall>
  );
}
