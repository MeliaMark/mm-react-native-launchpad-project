// Select a stat
// Choose whether to scan opponent QR code first or second
// In some order:
// QR code with "done scanning" button
// Scanner
// Once both are done (will need to track this in state?) both players have all the same data
// Determine winner (should be same person on each device) and display
// winner saves the avatar of opponent

import React from 'react';
import {View, Text} from 'react-native';
import {
  OpponentData,
  PlayerData,
  PlayerSelection,
  StatSelection,
  Winner,
} from '../../types';
import {FightDisplay, QRScanStatus} from './Fight';
import {FightEnd} from './FightEnd';
import {FightQRCode} from './FightQRCode';
import {FightStart} from './FightStart';
import FightQRScanner from './QRScanner';

interface FightViewProps {
  fightDisplay: FightDisplay;
  playerData: PlayerData; // For choosing which stat to use, displaying image
  playerStatChoice: PlayerSelection; // For displaying chosen stat at choice stage (and maybe at fight resolution)
  opponentData?: OpponentData; // For displaying avatar, and maybe stat at fight resolution
  //   qrScanStatus: QRScanStatus; // to work out which screen to show - might be turned into a single variable
  winner: Winner; // To display who has won
  changePlayerSelection: (stat: StatSelection) => void;
  commenceScanning: (playerScanningFirst: boolean) => void; // onPress of buttons to take to scanning screens, one with true, one with false
  generateQRCodeValue: () => OpponentData;
  confirmScan: () => void; //onPress of button on FightQRCode
  onSuccessfulScan: (e: any) => void; //to pass to scanner
  resetFight: () => void;
}

const FightView = ({
  fightDisplay,
  playerData,
  playerStatChoice,
  opponentData,
  winner,
  changePlayerSelection,
  commenceScanning,
  generateQRCodeValue,
  confirmScan,
  onSuccessfulScan,
  resetFight,
}: FightViewProps) => {
  if (fightDisplay === FightDisplay.Choice) {
    return (
      <FightStart
        playerSelection={playerStatChoice}
        playerData={playerData}
        changeHandler={changePlayerSelection}
        commenceScanningHandler={commenceScanning}
      />
    );
  } else if (fightDisplay === FightDisplay.QRCode) {
    return (
      <FightQRCode
        generateQRCodeValue={generateQRCodeValue}
        confirmScanHandler={confirmScan}
        resetFight={resetFight}
      />
    );
  } else if (fightDisplay === FightDisplay.QRScanner) {
    return (
      <FightQRScanner onSuccess={onSuccessfulScan} resetFight={resetFight} />
    );
  } else if (fightDisplay === FightDisplay.Resolution) {
    return (
      <FightEnd
        winner={winner}
        opponentData={opponentData}
        playerData={playerData}
        playerSelection={playerStatChoice}
        resetFight={resetFight}
      />
    );
  } else {
    return <Text>Something went wrong</Text>;
  }
};

export default FightView;
