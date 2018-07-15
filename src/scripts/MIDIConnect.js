var Tone = require('tone');

let pads =  new Tone.Players({
  SadOrganLick1: require(`../sounds/drum pad/SadOrganLick1_keyBmin.wav`),
  SadOrganLick2: require(`../sounds/drum pad/SadOrganLick2_keyDMaj.wav`),
  SawSynth_a: require(`../sounds/drum pad/SawSynth_A.wav`),
  SawSynth_d: require(`../sounds/drum pad/SawSynth_D.wav`),
  SawSynth_c: require(`../sounds/drum pad/SawSytnh_C.wav`),
  CutestSounds: require(`../sounds/drum pad/SqueakyCutestSounds.wav`),
  WeirdoPerc: require(`../sounds/drum pad/WeirdoPerc.wav`),
  Whistle: require(`../sounds/drum pad/Whistle.wav`),
  DonNico: require(`../sounds/drum pad/Don_Nico_Cmon.wav`),
  Yoddle: require("../sounds/drum pad/Yoddle2_keyFmin.wav"),
  EGChord: require(`../sounds/drum pad/Electric_Guitar_chord_keyAmin_120bpm.wav`),
  EGCurious: require(`../sounds/drum pad/Electric_Guitar_curious1_Amin6_80bpm.wav`),
  HarpCourtyard: require(`../sounds/drum pad/Harp_courtyard_keyCmin_124bpm.wav`),
  HarpYoung: require(`../sounds/drum pad/Harp_young_and_the_restless_keyCmin_120bpm.wav`),
  Saxkf: require(`../sounds/drum pad/Sax_kf_x_yy_keyGmin_5dry.wav`),
  SaxMan: require(`../sounds/drum pad/Sax_manhattan_keyGmin_1wet_114bpm.wav`),
}).toMaster();

const noteNames = {
  36: "SadOrganLick1",
  37: "SawSynth_a",
  38: "SawSynth_c",
  39: "WeirdoPerc",
  40: "DonNico",
  41: "EGChord",
  42: "HarpCourtyard",
  43: "Saxkf",
  44: "SadOrganLick2",
  45: "SawSynth_d",
  46: "CutestSounds",
  47: "Whistle",
  48: "Yoddle",
  49: "EGCurious",
  50: "HarpYoung",
  51: "SaxMan",
}

export function play(padPressed) {
  pads.get(noteNames[padPressed]).start()
}