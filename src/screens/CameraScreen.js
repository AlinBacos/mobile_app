import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  StatusBar,
  TouchableWithoutFeedbackComponent,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState, useEffect } from "react";
import { db } from "../database/firebase";
import { set, ref, onValue } from "firebase/database";
import backgroundImage from "../images/background.png";

function CameraScreen() {
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("MAKE YOUR FIRST SCAN");
  const [verifyQrCode, setVerifyQrCode] = useState("");
  const [qrData, setQrData] = useState([]);
  const [color, setColor] = useState("");

  useEffect(() => {
    const qrRef = ref(db, "qrcode/");
    onValue(qrRef, (snapshot) => {
      const data = snapshot.val();
      const qrPost = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setQrData(qrPost);
      console.log(qrData);
    });
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setText(data);
    const validateQr = qrData.some((item) => item.qrData.includes(data));
    if (validateQr) {
      setVerifyQrCode("QR CODE IS VALID!");
      setColor("green");
    } else {
      setVerifyQrCode("QR CODE IS NOT VALID!");
      setColor("red");
    }
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar
        barStyle="light"
        backgroundColor="transparent"
        translucent={true}
      />
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.qrCodeBox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }}
          />
        </View>
        <Text style={styles.displayText}>{text}</Text>
        {scanned && (
          <>
            <Button
              title={"Scan again?"}
              onPress={() => setScanned(false)}
              color="#673ab7"
              style={styles.button}
            />
            <Text style={[styles.displayText, { color }]}>{verifyQrCode}</Text>
          </>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  displayText: {
    fontSize: 16,
    margin: 20,
    color: "white",
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
  qrCodeBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "#673ab7",
  },
  button: {
    width: 300,
  },
});

export default CameraScreen;
