import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

interface FightQRScannerProps {
  onSuccess: (e: any) => void;
  resetFight: () => void;
}

//change top and bottom content
//have a fight reset button
const FightQRScanner = ({onSuccess, resetFight}: FightQRScannerProps) => {
  return (
    <QRCodeScanner
      onRead={onSuccess}
      topContent={<Text>Scan the QR code on your opponent's device</Text>}
      bottomContent={
        <TouchableOpacity onPress={resetFight}>
          <Text>Back to selection</Text>
        </TouchableOpacity>
      }
    />
  );
};

export default FightQRScanner;
