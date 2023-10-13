import { Modal, View, StyleSheet, Text } from "react-native";
import { defaultTheme } from "../../theme/default";
import { useCallback, useEffect, useMemo, useState } from "react";
interface FlashMessageProps {
  title: string;
  duration?: number;
  show: boolean;
  type: "success" | "error";
  onClose?: () => void;
}

export const FlashMessage: React.FC<FlashMessageProps> = ({
  title,
  duration,
  show,
  onClose,
  type,
}) => {
  const [showModal, setShowModal] = useState(false);
  const styles = useMemo(() => createStyleSheet(), [defaultTheme]);

  const handleClose = useCallback(() => {
    onClose?.();
    setShowModal(false);
  }, [onClose]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (show) {
      setShowModal(true);
      timerId = setTimeout(() => {
        handleClose();
      }, duration);
    } else {
      setShowModal(false);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [show, handleClose]);

  return (
    showModal && (
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        style={{
          zIndex: 1000,
        }}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor:
                type === "error"
                  ? defaultTheme.colors["negative-medium"]
                  : defaultTheme.colors.positive,
            },
          ]}
        >
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      </Modal>
    )
  );
};

const border = {
  Rounded: 5,
};

function createStyleSheet() {
  return StyleSheet.create({
    container: {
      position: "absolute",
      bottom: "10%",
      left: 16,
      right: 16,
      borderRadius: border.Rounded,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    title: {
      color: defaultTheme.colors["pure-white"],
      fontSize: 16,
    },
    icon: {
      width: 24,
      height: 24,
    },
  });
}
