import { CallContent } from "@stream-io/video-react-native-sdk";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RoomId from "./RoomId";

export default function CallRoom({ slug }: { slug: string }) {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: "absolute", top: 10, left: 10, zIndex: 100 }}>
        <RoomId slug={slug} />
      </View>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <CallContent
          onHangupCallHandler={() => {
            router.back();
          }}
        />
      </GestureHandlerRootView>
    </View>
  );
}
