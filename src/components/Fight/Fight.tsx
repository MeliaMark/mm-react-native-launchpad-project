// Navigate to here
// Knows what stage the fight is at

//Tracks
// playerData
// stat chosen by player and its value
// qr code first or second
// generated qr code scanned
// opponent qr code scanned and retrieved data
// Then compute winner and do stuff

import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import determineWinner from '../../functions/determineWinner';
import {storage} from '../../store/mmkvStorage';
import {
  OpponentData,
  PlayerData,
  PlayerSelection,
  StatSelection,
  Winner,
} from '../../types';
import FightView from './FightView';

export type QRScanStatus = {
  choiceComplete: boolean;
  scanningFirst: boolean;
  playerScanned: boolean;
  opponentScanned: boolean;
};

export enum FightDisplay {
  Choice = 'choice',
  QRCode = 'qrCode',
  QRScanner = 'qrScanner',
  Resolution = 'resolution',
}

export const Fight = () => {
  const storedPlayerDataString = storage.getString('playerData');
  if (!storedPlayerDataString) {
    return <Text>Something went wrong, please try again</Text>;
  }
  const storedPlayerData: PlayerData = JSON.parse(storedPlayerDataString);
  const defaultPlayerStatChoice: PlayerSelection = {
    stat: StatSelection.Stat1,
    value: storedPlayerData.avatarStats.stat1,
  };

  const [playerData, setPlayerData] = useState<PlayerData>();
  const [opponentData, setOpponentData] = useState<OpponentData>();
  const [playerStatChoice, setPlayerStatChoice] = useState<PlayerSelection>(
    defaultPlayerStatChoice,
  );
  const [qrScanStatus, setQrScanStatus] = useState<QRScanStatus>();
  const [winner, setWinner] = useState<Winner>(Winner.Undecided);
  const [display, setDisplay] = useState<FightDisplay>(FightDisplay.Choice);

  const changePlayerSelection = (stat: StatSelection) => {
    // State 0
    // adjusts which stat the player will use to fight
    const chosenStat: PlayerSelection = {
      stat,
      value:
        playerData?.avatarStats[stat] ?? storedPlayerData.avatarStats[stat],
    };
    setPlayerStatChoice(chosenStat);
  };

  const generateQRCodeValue = (): OpponentData => {
    // take player uri and chosen stat to put in QR code
    const data: OpponentData = {
      name: playerData?.name ?? storedPlayerData.name,
      avatarUri: playerData?.avatarUri ?? storedPlayerData.avatarUri,
      selection: playerStatChoice,
    };
    // console.log(JSON.stringify(data)); //for testing
    return data;
  };

  const commenceScanning = (playerScanningFirst: boolean) => {
    // Transitions state 0. to state 1. if playerScanningFirst = true, else state 0. to state 3.
    // updates qrScanStatus with choiceComplete = true, scanningFirst = playerScanningFirst
    // this should trigger a rerender to show either the QR code or the scanner
    const newQRScanStatus: QRScanStatus = {
      choiceComplete: true,
      scanningFirst: playerScanningFirst,
      playerScanned: false,
      opponentScanned: false,
    };
    setQrScanStatus(newQRScanStatus);
  };

  const confirmScan = () => {
    // transitions state 3. to state 4. OR state 2. to state 5.
    // updates qrScanStatus such that opponentScanned = true
    // if playerScanned = false then open QR code scanner
    // if playerScanned = true then start fight, determine winner and update winner state
    if (!qrScanStatus) {
      console.log('no qrScanStatus, returning.');
      return;
    }
    const newQRScanStatus: QRScanStatus = {
      choiceComplete: true,
      scanningFirst: qrScanStatus.scanningFirst,
      playerScanned: qrScanStatus.scanningFirst,
      opponentScanned: true,
    };
    setQrScanStatus(newQRScanStatus);
  };

  const onSuccessfulScan = (e: any) => {
    console.log('QR Code scanned', e);
    // transitions state 1. to state 2. OR state
    if (!qrScanStatus) {
      console.log('no qrScanStatus, returning.');
      return;
    }

    // update opponentData using the info from QR code
    try {
      const opponentData = JSON.parse(e.data);
      if (
        !opponentData.selection ||
        !opponentData.selection.stat1 ||
        !opponentData.avatarUri ||
        !opponentData.name
      ) {
        throw new Error(
          'opponentData object does not match the expected pattern',
        );
      }
      setOpponentData(opponentData);
    } catch (error) {
      console.log('Error when parsing data from QR code: ', error);
    }

    const newQRScanStatus: QRScanStatus = {
      choiceComplete: true,
      scanningFirst: qrScanStatus.scanningFirst,
      playerScanned: true,
      opponentScanned: !qrScanStatus.scanningFirst,
    };
    setQrScanStatus(newQRScanStatus);
  };

  const resetFight = () => {
    const newQRScanStatus: QRScanStatus = {
      choiceComplete: false,
      scanningFirst: false,
      playerScanned: false,
      opponentScanned: false,
    };
    setQrScanStatus(newQRScanStatus);
    setPlayerStatChoice(defaultPlayerStatChoice);
    setOpponentData(undefined);
  };

  const determineFightDisplay = ({
    choiceComplete,
    scanningFirst,
    playerScanned,
    opponentScanned,
  }: QRScanStatus): FightDisplay => {
    if (!choiceComplete) {
      return FightDisplay.Choice;
    }
    if (playerScanned && opponentScanned) {
      return FightDisplay.Resolution;
    }
    if (scanningFirst) {
      return playerScanned ? FightDisplay.QRCode : FightDisplay.QRScanner;
    } else {
      return opponentScanned ? FightDisplay.QRScanner : FightDisplay.QRCode;
    }
  };

  useEffect(() => {
    if (!qrScanStatus) {
      setDisplay(FightDisplay.Choice);
    } else {
      const fightDisplay = determineFightDisplay(qrScanStatus);
      if (fightDisplay === FightDisplay.Resolution && opponentData) {
        const winner = determineWinner(
          playerStatChoice,
          opponentData?.selection,
        );
        setWinner(winner);
      }
      setDisplay(fightDisplay);
    }
  }, [qrScanStatus]);

  return (
    <FightView
      fightDisplay={display}
      playerData={playerData ?? storedPlayerData}
      playerStatChoice={
        playerStatChoice ?? {
          stat: StatSelection.Stat1,
          value: storedPlayerData.avatarStats.stat1,
        }
      }
      opponentData={opponentData}
      winner={winner}
      changePlayerSelection={changePlayerSelection}
      commenceScanning={commenceScanning}
      generateQRCodeValue={generateQRCodeValue}
      confirmScan={confirmScan}
      onSuccessfulScan={onSuccessfulScan}
      resetFight={resetFight}
    />
  );
};

// 0. if !choiceComplete then display stat selection screen

// 1. if choiceComplete && scanningFirst && !playerScanned then display QRScanner
// 2. if choiceComplete && scanningFirst && playerScanned then display QRCode
// 3. if choiceComplete && !scanningFirst && !opponentScanned then display QRCode
// 4 .if choiceComplete && !scanningFirst && opponentScanned then display QRScanner

// 5. if choiceComplete(?) && playerScanned && opponentScanned then display Fight over view
