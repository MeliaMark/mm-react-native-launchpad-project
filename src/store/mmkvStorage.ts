import {MMKV} from "react-native-mmkv"

export const storage = new MMKV()

// import into other file
//can store objects by stringifying json when storing, and parsing when retrieving

//store values

storage.set("thing.stuff", "value")
storage.set("thing.bits", 1)
storage.set("guff", false)

//retrieve values

const thing = storage.getString("thing.stuff")
const bits = storage.getNumber("thing.bits")
const guff = storage.getBoolean("guff")