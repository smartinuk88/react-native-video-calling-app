import Room from "@/components/Room";
import {
  Call,
  CallingState,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { generateSlug } from "random-word-slugs";

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
      slug = generateSlug(3, {
        categories: {
          adjective: ["color", "personality"],
          noun: ["animals", "food"],
        },
      });

      // Creating a new call
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
      <Room slug={slug} />
    </StreamCall>
  );
}
