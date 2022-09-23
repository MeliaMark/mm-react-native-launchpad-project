import React from 'react';
import {View, Button} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {OpponentData} from '../../types';

interface FightQRCodeProps {
  generateQRCodeValue: () => OpponentData;
  confirmScanHandler: () => void;
  resetFight: () => void;
}

export const FightQRCode = ({
  generateQRCodeValue,
  confirmScanHandler,
  resetFight,
}: FightQRCodeProps) => {
  const qrCodeValue = JSON.stringify(generateQRCodeValue());
  return (
    <View>
      <QRCode value={qrCodeValue} />
      <Button
        title="Opponent has scanned my QR code"
        onPress={confirmScanHandler}
      />
      <Button title="Back to selection screen" onPress={resetFight} />
    </View>
  );
};
