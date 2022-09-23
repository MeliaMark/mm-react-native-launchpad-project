import { MMKV } from "react-native-mmkv";
import { PlayerData, SavedPlayer } from "../types";
import auth from '@react-native-firebase/auth'

const getStoredPlayerData = (storage: MMKV): PlayerData => {
    const storedPlayerDataString = storage.getString(`playerData.${auth().currentUser?.uid}`);
    if (!storedPlayerDataString) {
      console.log('No playerData stored');
      throw new Error('No playerData stored');
    }
    const storedPlayerData: PlayerData = JSON.parse(storedPlayerDataString);
    return storedPlayerData
}

export default getStoredPlayerData