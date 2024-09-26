import { Text, TouchableOpacity } from "react-native";
export default function StyledButton({
  title,
  onPress,
  style,
}: {
  title: string;
  onPress: () => void;
  style?: any;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "white",
        padding: 12,
        borderRadius: 5,
        width: "100%",
        ...style,
      }}
    >
      <Text
        style={{
          color: "#5F5DEC",
          fontSize: 16,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
