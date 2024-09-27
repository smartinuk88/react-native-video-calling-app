import { copySlug, formatSlug } from "@/lib/slugs";
import { Text, TouchableOpacity } from "react-native";
export default function RoomId({ slug }: { slug: string }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
        borderRadius: 5,
      }}
      onPress={() => copySlug(slug)}
    >
      <Text style={{ color: "white" }}>Call ID: {formatSlug(slug)}</Text>
    </TouchableOpacity>
  );
}
