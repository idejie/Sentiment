/*--------------------------------------------------------------------------*/
/*  ANEW.JS								    */
/*    Routines to calculate ANEW scores					    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  01-May-12	Christopher G. Healey	Initial implementation		    */
/*--------------------------------------------------------------------------*/

//  Module global variables

//  ANEW description structure:
//  - word, full term
//  - stem, stemmed term
//  - avg, [ ARO, VAL ] average score (1..9)
//  - std, [ ARO, VAL ] standard deviation score
//  - fq, number of volunteers scoring term

var  anew_term = {			// ANEW terms, indexed by word
  "abduction": {
    dict: "anew", word: "abduction", stem: "abduct",
    avg: [ 5.53, 2.76 ], std: [ 2.43, 2.06 ], fq: 1
  },
  "abortion": {
    dict: "anew", word: "abortion", stem: "abort",
    avg: [ 5.39, 3.5 ], std: [ 2.8, 2.3 ], fq: 6
  },
  "absurd": {
    dict: "anew", word: "absurd", stem: "absurd",
    avg: [ 4.36, 4.26 ], std: [ 2.2, 1.82 ], fq: 17
  },
  "abundance": {
    dict: "anew", word: "abundance", stem: "abund",
    avg: [ 5.51, 6.59 ], std: [ 2.63, 2.01 ], fq: 13
  },
  "abuse": {
    dict: "anew", word: "abuse", stem: "abus",
    avg: [ 6.83, 1.8 ], std: [ 2.7, 1.23 ], fq: 18
  },
  "acceptance": {
    dict: "anew", word: "acceptance", stem: "accept",
    avg: [ 5.4, 7.98 ], std: [ 2.7, 1.42 ], fq: 49
  },
  "accident": {
    dict: "anew", word: "accident", stem: "accid",
    avg: [ 6.26, 2.05 ], std: [ 2.87, 1.19 ], fq: 33
  },
  "ace": {
    dict: "anew", word: "ace", stem: "ace",
    avg: [ 5.5, 6.88 ], std: [ 2.66, 1.93 ], fq: 15
  },
  "ache": {
    dict: "anew", word: "ache", stem: "ach",
    avg: [ 5, 2.46 ], std: [ 2.45, 1.52 ], fq: 4
  },
  "achievement": {
    dict: "anew", word: "achievement", stem: "achiev",
    avg: [ 5.53, 7.89 ], std: [ 2.81, 1.38 ], fq: 65
  },
  "activate": {
    dict: "anew", word: "activate", stem: "activ",
    avg: [ 4.86, 5.46 ], std: [ 2.56, 0.98 ], fq: 2
  },
  "addict": {
    dict: "anew", word: "addict", stem: "addict",
    avg: [ 5.66, 2.48 ], std: [ 2.26, 2.08 ], fq: 1
  },
  "addicted": {
    dict: "anew", word: "addicted", stem: "addict",
    avg: [ 4.81, 2.51 ], std: [ 2.46, 1.42 ], fq: 3
  },
  "admired": {
    dict: "anew", word: "admired", stem: "admir",
    avg: [ 6.11, 7.74 ], std: [ 2.36, 1.84 ], fq: 17
  },
  "adorable": {
    dict: "anew", word: "adorable", stem: "ador",
    avg: [ 5.12, 7.81 ], std: [ 2.71, 1.24 ], fq: 3
  },
  "adult": {
    dict: "anew", word: "adult", stem: "adult",
    avg: [ 4.76, 6.49 ], std: [ 1.95, 1.5 ], fq: 25
  },
  "advantage": {
    dict: "anew", word: "advantage", stem: "advantag",
    avg: [ 4.76, 6.95 ], std: [ 2.18, 1.85 ], fq: 73
  },
  "adventure": {
    dict: "anew", word: "adventure", stem: "adventur",
    avg: [ 6.98, 7.6 ], std: [ 2.15, 1.5 ], fq: 14
  },
  "affection": {
    dict: "anew", word: "affection", stem: "affect",
    avg: [ 6.21, 8.39 ], std: [ 2.75, 0.86 ], fq: 18
  },
  "afraid": {
    dict: "anew", word: "afraid", stem: "afraid",
    avg: [ 6.67, 2 ], std: [ 2.54, 1.28 ], fq: 57
  },
  "aggressive": {
    dict: "anew", word: "aggressive", stem: "aggress",
    avg: [ 5.83, 5.1 ], std: [ 2.33, 1.68 ], fq: 17
  },
  "agility": {
    dict: "anew", word: "agility", stem: "agil",
    avg: [ 4.85, 6.46 ], std: [ 1.8, 1.57 ], fq: 3
  },
  "agony": {
    dict: "anew", word: "agony", stem: "agoni",
    avg: [ 6.06, 2.43 ], std: [ 2.67, 2.17 ], fq: 9
  },
  "agreement": {
    dict: "anew", word: "agreement", stem: "agreement",
    avg: [ 5.02, 7.08 ], std: [ 2.24, 1.59 ], fq: 106
  },
  "air": {
    dict: "anew", word: "air", stem: "air",
    avg: [ 4.12, 6.34 ], std: [ 2.3, 1.56 ], fq: 257
  },
  "alcoholic": {
    dict: "anew", word: "alcoholic", stem: "alcohol",
    avg: [ 5.69, 2.84 ], std: [ 2.36, 2.34 ], fq: 3
  },
  "alert": {
    dict: "anew", word: "alert", stem: "alert",
    avg: [ 6.85, 6.2 ], std: [ 2.53, 1.76 ], fq: 33
  },
  "alien": {
    dict: "anew", word: "alien", stem: "alien",
    avg: [ 5.45, 5.6 ], std: [ 2.15, 1.82 ], fq: 16
  },
  "alimony": {
    dict: "anew", word: "alimony", stem: "alimoni",
    avg: [ 4.3, 3.95 ], std: [ 2.29, 2 ], fq: 2
  },
  "alive": {
    dict: "anew", word: "alive", stem: "aliv",
    avg: [ 5.5, 7.25 ], std: [ 2.74, 2.22 ], fq: 57
  },
  "allergy": {
    dict: "anew", word: "allergy", stem: "allergi",
    avg: [ 4.64, 3.07 ], std: [ 2.34, 1.64 ], fq: 1
  },
  "alley": {
    dict: "anew", word: "alley", stem: "alley",
    avg: [ 4.91, 4.48 ], std: [ 2.42, 1.97 ], fq: 8
  },
  "alone": {
    dict: "anew", word: "alone", stem: "alon",
    avg: [ 4.83, 2.41 ], std: [ 2.66, 1.77 ], fq: 195
  },
  "aloof": {
    dict: "anew", word: "aloof", stem: "aloof",
    avg: [ 4.28, 4.9 ], std: [ 2.1, 1.92 ], fq: 5
  },
  "ambition": {
    dict: "anew", word: "ambition", stem: "ambit",
    avg: [ 5.61, 7.04 ], std: [ 2.92, 1.98 ], fq: 19
  },
  "ambulance": {
    dict: "anew", word: "ambulance", stem: "ambul",
    avg: [ 7.33, 2.47 ], std: [ 1.96, 1.5 ], fq: 6
  },
  "angel": {
    dict: "anew", word: "angel", stem: "angel",
    avg: [ 4.83, 7.53 ], std: [ 2.63, 1.58 ], fq: 18
  },
  "anger": {
    dict: "anew", word: "anger", stem: "anger",
    avg: [ 7.63, 2.34 ], std: [ 1.91, 1.32 ], fq: 48
  },
  "angry": {
    dict: "anew", word: "angry", stem: "angri",
    avg: [ 7.17, 2.85 ], std: [ 2.07, 1.7 ], fq: 45
  },
  "anguished": {
    dict: "anew", word: "anguished", stem: "anguish",
    avg: [ 5.33, 2.12 ], std: [ 2.69, 1.56 ], fq: 2
  },
  "ankle": {
    dict: "anew", word: "ankle", stem: "ankl",
    avg: [ 4.16, 5.27 ], std: [ 2.03, 1.54 ], fq: 8
  },
  "annoy": {
    dict: "anew", word: "annoy", stem: "annoy",
    avg: [ 6.49, 2.74 ], std: [ 2.17, 1.81 ], fq: 2
  },
  "answer": {
    dict: "anew", word: "answer", stem: "answer",
    avg: [ 5.41, 6.63 ], std: [ 2.43, 1.68 ], fq: 152
  },
  "anxious": {
    dict: "anew", word: "anxious", stem: "anxious",
    avg: [ 6.92, 4.81 ], std: [ 1.81, 1.98 ], fq: 29
  },
  "applause": {
    dict: "anew", word: "applause", stem: "applaus",
    avg: [ 5.8, 7.5 ], std: [ 2.79, 1.5 ], fq: 14
  },
  "appliance": {
    dict: "anew", word: "appliance", stem: "applianc",
    avg: [ 4.05, 5.1 ], std: [ 2.06, 1.21 ], fq: 5
  },
  "arm": {
    dict: "anew", word: "arm", stem: "arm",
    avg: [ 3.59, 5.34 ], std: [ 2.4, 1.82 ], fq: 94
  },
  "army": {
    dict: "anew", word: "army", stem: "armi",
    avg: [ 5.03, 4.72 ], std: [ 2.03, 1.75 ], fq: 132
  },
  "aroused": {
    dict: "anew", word: "aroused", stem: "arous",
    avg: [ 6.63, 7.97 ], std: [ 2.7, 1 ], fq: 20
  },
  "arrogant": {
    dict: "anew", word: "arrogant", stem: "arrog",
    avg: [ 5.65, 3.69 ], std: [ 2.23, 2.4 ], fq: 2
  },
  "art": {
    dict: "anew", word: "art", stem: "art",
    avg: [ 4.86, 6.68 ], std: [ 2.88, 2.1 ], fq: 208
  },
  "assassin": {
    dict: "anew", word: "assassin", stem: "assassin",
    avg: [ 6.28, 3.09 ], std: [ 2.53, 2.09 ], fq: 6
  },
  "assault": {
    dict: "anew", word: "assault", stem: "assault",
    avg: [ 7.51, 2.03 ], std: [ 2.28, 1.55 ], fq: 15
  },
  "astonished": {
    dict: "anew", word: "astonished", stem: "astonish",
    avg: [ 6.58, 6.56 ], std: [ 2.22, 1.61 ], fq: 6
  },
  "astronaut": {
    dict: "anew", word: "astronaut", stem: "astronaut",
    avg: [ 5.28, 6.66 ], std: [ 2.11, 1.6 ], fq: 2
  },
  "athletics": {
    dict: "anew", word: "athletics", stem: "athlet",
    avg: [ 6.1, 6.61 ], std: [ 2.29, 2.08 ], fq: 9
  },
  "autumn": {
    dict: "anew", word: "autumn", stem: "autumn",
    avg: [ 4.51, 6.3 ], std: [ 2.5, 2.14 ], fq: 22
  },
  "avalanche": {
    dict: "anew", word: "avalanche", stem: "avalanch",
    avg: [ 5.54, 3.29 ], std: [ 2.37, 1.95 ], fq: 1
  },
  "avenue": {
    dict: "anew", word: "avenue", stem: "avenu",
    avg: [ 4.12, 5.5 ], std: [ 2.01, 1.37 ], fq: 46
  },
  "awed": {
    dict: "anew", word: "awed", stem: "awe",
    avg: [ 5.74, 6.7 ], std: [ 2.31, 1.38 ], fq: 5
  },
  "baby": {
    dict: "anew", word: "baby", stem: "babi",
    avg: [ 5.53, 8.22 ], std: [ 2.8, 1.2 ], fq: 62
  },
  "bake": {
    dict: "anew", word: "bake", stem: "bake",
    avg: [ 5.1, 6.17 ], std: [ 2.3, 1.71 ], fq: 12
  },
  "bandage": {
    dict: "anew", word: "bandage", stem: "bandag",
    avg: [ 3.9, 4.54 ], std: [ 2.07, 1.75 ], fq: 4
  },
  "bankrupt": {
    dict: "anew", word: "bankrupt", stem: "bankrupt",
    avg: [ 6.21, 2 ], std: [ 2.79, 1.31 ], fq: 5
  },
  "banner": {
    dict: "anew", word: "banner", stem: "banner",
    avg: [ 3.83, 5.4 ], std: [ 1.95, 0.83 ], fq: 8
  },
  "bar": {
    dict: "anew", word: "bar", stem: "bar",
    avg: [ 5, 6.42 ], std: [ 2.83, 2.05 ], fq: 82
  },
  "barrel": {
    dict: "anew", word: "barrel", stem: "barrel",
    avg: [ 3.36, 5.05 ], std: [ 2.28, 1.46 ], fq: 24
  },
  "basket": {
    dict: "anew", word: "basket", stem: "basket",
    avg: [ 3.63, 5.45 ], std: [ 2.02, 1.15 ], fq: 17
  },
  "bastard": {
    dict: "anew", word: "bastard", stem: "bastard",
    avg: [ 6.07, 3.36 ], std: [ 2.15, 2.16 ], fq: 12
  },
  "bath": {
    dict: "anew", word: "bath", stem: "bath",
    avg: [ 4.16, 7.33 ], std: [ 2.31, 1.45 ], fq: 26
  },
  "bathroom": {
    dict: "anew", word: "bathroom", stem: "bathroom",
    avg: [ 3.88, 5.55 ], std: [ 1.72, 1.36 ], fq: 18
  },
  "bathtub": {
    dict: "anew", word: "bathtub", stem: "bathtub",
    avg: [ 4.36, 6.69 ], std: [ 2.59, 1.57 ], fq: 4
  },
  "beach": {
    dict: "anew", word: "beach", stem: "beach",
    avg: [ 5.53, 8.03 ], std: [ 3.07, 1.59 ], fq: 61
  },
  "beast": {
    dict: "anew", word: "beast", stem: "beast",
    avg: [ 5.57, 4.23 ], std: [ 2.61, 2.41 ], fq: 7
  },
  "beautiful": {
    dict: "anew", word: "beautiful", stem: "beauti",
    avg: [ 6.17, 7.6 ], std: [ 2.34, 1.64 ], fq: 127
  },
  "beauty": {
    dict: "anew", word: "beauty", stem: "beauti",
    avg: [ 4.95, 7.82 ], std: [ 2.57, 1.16 ], fq: 71
  },
  "bed": {
    dict: "anew", word: "bed", stem: "bed",
    avg: [ 3.61, 7.51 ], std: [ 2.56, 1.38 ], fq: 127
  },
  "bees": {
    dict: "anew", word: "bees", stem: "bee",
    avg: [ 6.51, 3.2 ], std: [ 2.14, 2.07 ], fq: 15
  },
  "beggar": {
    dict: "anew", word: "beggar", stem: "beggar",
    avg: [ 4.91, 3.22 ], std: [ 2.45, 2.02 ], fq: 2
  },
  "bench": {
    dict: "anew", word: "bench", stem: "bench",
    avg: [ 3.59, 4.61 ], std: [ 2.07, 1.4 ], fq: 35
  },
  "bereavement": {
    dict: "anew", word: "bereavement", stem: "bereav",
    avg: [ 4.2, 4.57 ], std: [ 2.15, 1.7 ], fq: 4
  },
  "betray": {
    dict: "anew", word: "betray", stem: "betray",
    avg: [ 7.24, 1.68 ], std: [ 2.06, 1.02 ], fq: 4
  },
  "beverage": {
    dict: "anew", word: "beverage", stem: "beverag",
    avg: [ 5.21, 6.83 ], std: [ 2.46, 1.48 ], fq: 5
  },
  "bird": {
    dict: "anew", word: "bird", stem: "bird",
    avg: [ 3.17, 7.27 ], std: [ 2.23, 1.36 ], fq: 31
  },
  "birthday": {
    dict: "anew", word: "birthday", stem: "birthday",
    avg: [ 6.68, 7.84 ], std: [ 2.11, 1.92 ], fq: 18
  },
  "black": {
    dict: "anew", word: "black", stem: "black",
    avg: [ 4.61, 5.39 ], std: [ 2.24, 1.8 ], fq: 203
  },
  "blackmail": {
    dict: "anew", word: "blackmail", stem: "blackmail",
    avg: [ 6.03, 2.95 ], std: [ 2.7, 1.95 ], fq: 2
  },
  "bland": {
    dict: "anew", word: "bland", stem: "bland",
    avg: [ 3.29, 4.1 ], std: [ 1.89, 1.08 ], fq: 3
  },
  "blase": {
    dict: "anew", word: "blase", stem: "blase",
    avg: [ 3.94, 4.89 ], std: [ 1.76, 1.16 ], fq: 7
  },
  "blasphemy": {
    dict: "anew", word: "blasphemy", stem: "blasphemi",
    avg: [ 4.93, 3.75 ], std: [ 2.34, 2.26 ], fq: 4
  },
  "bless": {
    dict: "anew", word: "bless", stem: "bless",
    avg: [ 4.05, 7.19 ], std: [ 2.59, 1.69 ], fq: 9
  },
  "blind": {
    dict: "anew", word: "blind", stem: "blind",
    avg: [ 4.39, 3.05 ], std: [ 2.36, 1.99 ], fq: 47
  },
  "bliss": {
    dict: "anew", word: "bliss", stem: "bliss",
    avg: [ 4.41, 6.95 ], std: [ 2.95, 2.24 ], fq: 4
  },
  "blister": {
    dict: "anew", word: "blister", stem: "blister",
    avg: [ 4.1, 2.88 ], std: [ 2.34, 1.75 ], fq: 3
  },
  "blond": {
    dict: "anew", word: "blond", stem: "blond",
    avg: [ 5.07, 6.43 ], std: [ 2.7, 2.04 ], fq: 11
  },
  "bloody": {
    dict: "anew", word: "bloody", stem: "bloodi",
    avg: [ 6.41, 2.9 ], std: [ 2, 1.98 ], fq: 8
  },
  "blossom": {
    dict: "anew", word: "blossom", stem: "blossom",
    avg: [ 5.03, 7.26 ], std: [ 2.65, 1.18 ], fq: 7
  },
  "blubber": {
    dict: "anew", word: "blubber", stem: "blubber",
    avg: [ 4.57, 3.52 ], std: [ 2.38, 1.99 ], fq: 1
  },
  "blue": {
    dict: "anew", word: "blue", stem: "blue",
    avg: [ 4.31, 6.76 ], std: [ 2.2, 1.78 ], fq: 143
  },
  "board": {
    dict: "anew", word: "board", stem: "board",
    avg: [ 3.36, 4.82 ], std: [ 2.12, 1.23 ], fq: 239
  },
  "body": {
    dict: "anew", word: "body", stem: "bodi",
    avg: [ 5.52, 5.55 ], std: [ 2.63, 2.37 ], fq: 276
  },
  "bold": {
    dict: "anew", word: "bold", stem: "bold",
    avg: [ 5.6, 6.8 ], std: [ 2.21, 1.61 ], fq: 21
  },
  "bomb": {
    dict: "anew", word: "bomb", stem: "bomb",
    avg: [ 7.15, 2.1 ], std: [ 2.4, 1.19 ], fq: 36
  },
  "book": {
    dict: "anew", word: "book", stem: "book",
    avg: [ 4.17, 5.72 ], std: [ 2.49, 1.54 ], fq: 193
  },
  "bored": {
    dict: "anew", word: "bored", stem: "bore",
    avg: [ 2.83, 2.95 ], std: [ 2.31, 1.35 ], fq: 14
  },
  "bottle": {
    dict: "anew", word: "bottle", stem: "bottl",
    avg: [ 4.79, 6.15 ], std: [ 2.44, 1.49 ], fq: 76
  },
  "bouquet": {
    dict: "anew", word: "bouquet", stem: "bouquet",
    avg: [ 5.46, 7.02 ], std: [ 2.47, 1.84 ], fq: 4
  },
  "bowl": {
    dict: "anew", word: "bowl", stem: "bowl",
    avg: [ 3.47, 5.33 ], std: [ 2.12, 1.33 ], fq: 23
  },
  "boxer": {
    dict: "anew", word: "boxer", stem: "boxer",
    avg: [ 5.12, 5.51 ], std: [ 2.26, 1.8 ], fq: 1
  },
  "boy": {
    dict: "anew", word: "boy", stem: "boy",
    avg: [ 4.58, 6.32 ], std: [ 2.37, 1.6 ], fq: 242
  },
  "brave": {
    dict: "anew", word: "brave", stem: "brave",
    avg: [ 6.15, 7.15 ], std: [ 2.45, 1.64 ], fq: 24
  },
  "breast": {
    dict: "anew", word: "breast", stem: "breast",
    avg: [ 5.37, 6.5 ], std: [ 2.39, 1.78 ], fq: 11
  },
  "breeze": {
    dict: "anew", word: "breeze", stem: "breez",
    avg: [ 4.37, 6.85 ], std: [ 2.32, 1.71 ], fq: 14
  },
  "bride": {
    dict: "anew", word: "bride", stem: "bride",
    avg: [ 5.55, 7.34 ], std: [ 2.74, 1.71 ], fq: 33
  },
  "bright": {
    dict: "anew", word: "bright", stem: "bright",
    avg: [ 5.4, 7.5 ], std: [ 2.33, 1.55 ], fq: 87
  },
  "broken": {
    dict: "anew", word: "broken", stem: "broken",
    avg: [ 5.43, 3.05 ], std: [ 2.42, 1.92 ], fq: 63
  },
  "brother": {
    dict: "anew", word: "brother", stem: "brother",
    avg: [ 4.71, 7.11 ], std: [ 2.68, 2.17 ], fq: 73
  },
  "brutal": {
    dict: "anew", word: "brutal", stem: "brutal",
    avg: [ 6.6, 2.8 ], std: [ 2.36, 1.9 ], fq: 7
  },
  "building": {
    dict: "anew", word: "building", stem: "build",
    avg: [ 3.92, 5.29 ], std: [ 1.94, 1.15 ], fq: 160
  },
  "bullet": {
    dict: "anew", word: "bullet", stem: "bullet",
    avg: [ 5.33, 3.29 ], std: [ 2.48, 2.06 ], fq: 28
  },
  "bunny": {
    dict: "anew", word: "bunny", stem: "bunni",
    avg: [ 4.06, 7.24 ], std: [ 2.61, 1.32 ], fq: 1
  },
  "burdened": {
    dict: "anew", word: "burdened", stem: "burden",
    avg: [ 5.63, 2.5 ], std: [ 2.07, 1.32 ], fq: 4
  },
  "burial": {
    dict: "anew", word: "burial", stem: "burial",
    avg: [ 5.08, 2.05 ], std: [ 2.4, 1.41 ], fq: 11
  },
  "burn": {
    dict: "anew", word: "burn", stem: "burn",
    avg: [ 6.22, 2.73 ], std: [ 1.91, 1.72 ], fq: 15
  },
  "bus": {
    dict: "anew", word: "bus", stem: "bus",
    avg: [ 3.55, 4.51 ], std: [ 1.8, 1.57 ], fq: 34
  },
  "busybody": {
    dict: "anew", word: "busybody", stem: "busybodi",
    avg: [ 4.84, 5.17 ], std: [ 2.41, 2.02 ], fq: 0
  },
  "butter": {
    dict: "anew", word: "butter", stem: "butter",
    avg: [ 3.17, 5.33 ], std: [ 1.84, 1.2 ], fq: 27
  },
  "butterfly": {
    dict: "anew", word: "butterfly", stem: "butterfli",
    avg: [ 3.47, 7.17 ], std: [ 2.39, 1.2 ], fq: 2
  },
  "cabinet": {
    dict: "anew", word: "cabinet", stem: "cabinet",
    avg: [ 3.43, 5.05 ], std: [ 1.85, 0.31 ], fq: 17
  },
  "cake": {
    dict: "anew", word: "cake", stem: "cake",
    avg: [ 5, 7.26 ], std: [ 2.37, 1.27 ], fq: 9
  },
  "cancer": {
    dict: "anew", word: "cancer", stem: "cancer",
    avg: [ 6.42, 1.5 ], std: [ 2.83, 0.85 ], fq: 25
  },
  "candy": {
    dict: "anew", word: "candy", stem: "candi",
    avg: [ 4.58, 6.54 ], std: [ 2.4, 2.09 ], fq: 16
  },
  "cane": {
    dict: "anew", word: "cane", stem: "cane",
    avg: [ 4.2, 4 ], std: [ 1.93, 1.8 ], fq: 12
  },
  "cannon": {
    dict: "anew", word: "cannon", stem: "cannon",
    avg: [ 4.71, 4.9 ], std: [ 2.84, 2.2 ], fq: 7
  },
  "capable": {
    dict: "anew", word: "capable", stem: "capabl",
    avg: [ 5.08, 7.16 ], std: [ 2.07, 1.39 ], fq: 66
  },
  "car": {
    dict: "anew", word: "car", stem: "car",
    avg: [ 6.24, 7.73 ], std: [ 2.04, 1.63 ], fq: 274
  },
  "carcass": {
    dict: "anew", word: "carcass", stem: "carcass",
    avg: [ 4.83, 3.34 ], std: [ 2.07, 1.92 ], fq: 7
  },
  "carefree": {
    dict: "anew", word: "carefree", stem: "carefre",
    avg: [ 4.17, 7.54 ], std: [ 2.84, 1.38 ], fq: 9
  },
  "caress": {
    dict: "anew", word: "caress", stem: "caress",
    avg: [ 5.14, 7.84 ], std: [ 3, 1.16 ], fq: 1
  },
  "cash": {
    dict: "anew", word: "cash", stem: "cash",
    avg: [ 7.37, 8.37 ], std: [ 2.21, 1 ], fq: 36
  },
  "casino": {
    dict: "anew", word: "casino", stem: "casino",
    avg: [ 6.51, 6.81 ], std: [ 2.12, 1.66 ], fq: 2
  },
  "cat": {
    dict: "anew", word: "cat", stem: "cat",
    avg: [ 4.38, 5.72 ], std: [ 2.24, 2.43 ], fq: 0
  },
  "cell": {
    dict: "anew", word: "cell", stem: "cell",
    avg: [ 4.08, 3.82 ], std: [ 2.19, 1.7 ], fq: 65
  },
  "cellar": {
    dict: "anew", word: "cellar", stem: "cellar",
    avg: [ 4.39, 4.32 ], std: [ 2.33, 1.68 ], fq: 26
  },
  "cemetery": {
    dict: "anew", word: "cemetery", stem: "cemeteri",
    avg: [ 4.82, 2.63 ], std: [ 2.66, 1.4 ], fq: 15
  },
  "chair": {
    dict: "anew", word: "chair", stem: "chair",
    avg: [ 3.15, 5.08 ], std: [ 1.77, 0.98 ], fq: 66
  },
  "champ": {
    dict: "anew", word: "champ", stem: "champ",
    avg: [ 6, 7.18 ], std: [ 2.43, 1.97 ], fq: 1
  },
  "champion": {
    dict: "anew", word: "champion", stem: "champion",
    avg: [ 5.85, 8.44 ], std: [ 3.15, 0.9 ], fq: 23
  },
  "chance": {
    dict: "anew", word: "chance", stem: "chanc",
    avg: [ 5.38, 6.02 ], std: [ 2.58, 1.77 ], fq: 131
  },
  "chaos": {
    dict: "anew", word: "chaos", stem: "chao",
    avg: [ 6.67, 4.17 ], std: [ 2.06, 2.36 ], fq: 17
  },
  "charm": {
    dict: "anew", word: "charm", stem: "charm",
    avg: [ 5.16, 6.77 ], std: [ 2.25, 1.58 ], fq: 26
  },
  "cheer": {
    dict: "anew", word: "cheer", stem: "cheer",
    avg: [ 6.12, 8.1 ], std: [ 2.45, 1.17 ], fq: 8
  },
  "child": {
    dict: "anew", word: "child", stem: "child",
    avg: [ 5.55, 7.08 ], std: [ 2.29, 1.98 ], fq: 213
  },
  "chin": {
    dict: "anew", word: "chin", stem: "chin",
    avg: [ 3.31, 5.29 ], std: [ 1.98, 1.27 ], fq: 27
  },
  "chocolate": {
    dict: "anew", word: "chocolate", stem: "chocol",
    avg: [ 5.29, 6.88 ], std: [ 2.55, 1.89 ], fq: 9
  },
  "christmas": {
    dict: "anew", word: "christmas", stem: "christma",
    avg: [ 6.27, 7.8 ], std: [ 2.56, 1.55 ], fq: 27
  },
  "church": {
    dict: "anew", word: "church", stem: "church",
    avg: [ 4.34, 6.28 ], std: [ 2.45, 2.31 ], fq: 348
  },
  "circle": {
    dict: "anew", word: "circle", stem: "circl",
    avg: [ 3.86, 5.67 ], std: [ 2.13, 1.26 ], fq: 60
  },
  "circus": {
    dict: "anew", word: "circus", stem: "circus",
    avg: [ 5.97, 7.3 ], std: [ 2.59, 1.84 ], fq: 7
  },
  "city": {
    dict: "anew", word: "city", stem: "citi",
    avg: [ 5.24, 6.03 ], std: [ 2.53, 1.37 ], fq: 393
  },
  "cliff": {
    dict: "anew", word: "cliff", stem: "cliff",
    avg: [ 6.25, 4.67 ], std: [ 2.15, 2.08 ], fq: 11
  },
  "clock": {
    dict: "anew", word: "clock", stem: "clock",
    avg: [ 4.02, 5.14 ], std: [ 2.54, 1.54 ], fq: 20
  },
  "clothing": {
    dict: "anew", word: "clothing", stem: "cloth",
    avg: [ 4.78, 6.54 ], std: [ 2.88, 1.85 ], fq: 20
  },
  "clouds": {
    dict: "anew", word: "clouds", stem: "cloud",
    avg: [ 3.3, 6.18 ], std: [ 2.08, 2.18 ], fq: 38
  },
  "clumsy": {
    dict: "anew", word: "clumsy", stem: "clumsi",
    avg: [ 5.18, 4 ], std: [ 2.4, 2.22 ], fq: 6
  },
  "coarse": {
    dict: "anew", word: "coarse", stem: "coars",
    avg: [ 4.21, 4.55 ], std: [ 1.84, 1.42 ], fq: 10
  },
  "coast": {
    dict: "anew", word: "coast", stem: "coast",
    avg: [ 4.59, 5.98 ], std: [ 2.31, 1.86 ], fq: 61
  },
  "cockroach": {
    dict: "anew", word: "cockroach", stem: "cockroach",
    avg: [ 6.11, 2.81 ], std: [ 2.78, 2.11 ], fq: 2
  },
  "coffin": {
    dict: "anew", word: "coffin", stem: "coffin",
    avg: [ 5.03, 2.56 ], std: [ 2.79, 1.96 ], fq: 7
  },
  "coin": {
    dict: "anew", word: "coin", stem: "coin",
    avg: [ 4.29, 6.02 ], std: [ 2.48, 1.96 ], fq: 10
  },
  "cold": {
    dict: "anew", word: "cold", stem: "cold",
    avg: [ 5.19, 4.02 ], std: [ 2.23, 1.99 ], fq: 171
  },
  "color": {
    dict: "anew", word: "color", stem: "color",
    avg: [ 4.73, 7.02 ], std: [ 2.64, 1.57 ], fq: 141
  },
  "column": {
    dict: "anew", word: "column", stem: "column",
    avg: [ 3.62, 5.17 ], std: [ 1.91, 0.85 ], fq: 71
  },
  "comedy": {
    dict: "anew", word: "comedy", stem: "comedi",
    avg: [ 5.85, 8.37 ], std: [ 2.81, 0.94 ], fq: 39
  },
  "comfort": {
    dict: "anew", word: "comfort", stem: "comfort",
    avg: [ 3.93, 7.07 ], std: [ 2.85, 2.14 ], fq: 43
  },
  "computer": {
    dict: "anew", word: "computer", stem: "comput",
    avg: [ 4.75, 6.24 ], std: [ 1.93, 1.61 ], fq: 13
  },
  "concentrate": {
    dict: "anew", word: "concentrate", stem: "concentr",
    avg: [ 4.65, 5.2 ], std: [ 2.13, 1.28 ], fq: 11
  },
  "confident": {
    dict: "anew", word: "confident", stem: "confid",
    avg: [ 6.22, 7.98 ], std: [ 2.41, 1.29 ], fq: 16
  },
  "confused": {
    dict: "anew", word: "confused", stem: "confus",
    avg: [ 6.03, 3.21 ], std: [ 1.88, 1.51 ], fq: 44
  },
  "consoled": {
    dict: "anew", word: "consoled", stem: "consol",
    avg: [ 4.53, 5.78 ], std: [ 2.22, 1.64 ], fq: 2
  },
  "contempt": {
    dict: "anew", word: "contempt", stem: "contempt",
    avg: [ 5.28, 3.85 ], std: [ 2.04, 2.13 ], fq: 15
  },
  "contents": {
    dict: "anew", word: "contents", stem: "content",
    avg: [ 4.32, 4.89 ], std: [ 2.14, 0.89 ], fq: 16
  },
  "context": {
    dict: "anew", word: "context", stem: "context",
    avg: [ 4.22, 5.2 ], std: [ 2.24, 1.38 ], fq: 2
  },
  "controlling": {
    dict: "anew", word: "controlling", stem: "control",
    avg: [ 6.1, 3.8 ], std: [ 2.19, 2.25 ], fq: 23
  },
  "cook": {
    dict: "anew", word: "cook", stem: "cook",
    avg: [ 4.44, 6.16 ], std: [ 1.96, 1.89 ], fq: 47
  },
  "cord": {
    dict: "anew", word: "cord", stem: "cord",
    avg: [ 3.54, 5.1 ], std: [ 2.09, 1.09 ], fq: 6
  },
  "cork": {
    dict: "anew", word: "cork", stem: "cork",
    avg: [ 3.8, 5.22 ], std: [ 2.18, 1.13 ], fq: 9
  },
  "corner": {
    dict: "anew", word: "corner", stem: "corner",
    avg: [ 3.91, 4.36 ], std: [ 1.92, 1.21 ], fq: 115
  },
  "corpse": {
    dict: "anew", word: "corpse", stem: "corps",
    avg: [ 4.74, 2.18 ], std: [ 2.94, 1.48 ], fq: 7
  },
  "corridor": {
    dict: "anew", word: "corridor", stem: "corridor",
    avg: [ 3.63, 4.88 ], std: [ 2.41, 1.14 ], fq: 17
  },
  "corrupt": {
    dict: "anew", word: "corrupt", stem: "corrupt",
    avg: [ 4.67, 3.32 ], std: [ 2.35, 2.32 ], fq: 8
  },
  "cottage": {
    dict: "anew", word: "cottage", stem: "cottag",
    avg: [ 3.39, 6.45 ], std: [ 2.54, 1.52 ], fq: 19
  },
  "couple": {
    dict: "anew", word: "couple", stem: "coupl",
    avg: [ 6.39, 7.41 ], std: [ 2.31, 1.97 ], fq: 122
  },
  "cow": {
    dict: "anew", word: "cow", stem: "cow",
    avg: [ 3.49, 5.57 ], std: [ 2.13, 1.53 ], fq: 29
  },
  "coward": {
    dict: "anew", word: "coward", stem: "coward",
    avg: [ 4.07, 2.74 ], std: [ 2.19, 1.64 ], fq: 8
  },
  "cozy": {
    dict: "anew", word: "cozy", stem: "cozi",
    avg: [ 3.32, 7.39 ], std: [ 2.28, 1.53 ], fq: 1
  },
  "crash": {
    dict: "anew", word: "crash", stem: "crash",
    avg: [ 6.95, 2.31 ], std: [ 2.44, 1.44 ], fq: 20
  },
  "crime": {
    dict: "anew", word: "crime", stem: "crime",
    avg: [ 5.41, 2.89 ], std: [ 2.69, 2.06 ], fq: 34
  },
  "criminal": {
    dict: "anew", word: "criminal", stem: "crimin",
    avg: [ 4.79, 2.93 ], std: [ 2.51, 1.66 ], fq: 24
  },
  "crisis": {
    dict: "anew", word: "crisis", stem: "crisi",
    avg: [ 5.44, 2.74 ], std: [ 3.07, 2.23 ], fq: 82
  },
  "crown": {
    dict: "anew", word: "crown", stem: "crown",
    avg: [ 4.28, 6.58 ], std: [ 2.53, 1.42 ], fq: 19
  },
  "crucify": {
    dict: "anew", word: "crucify", stem: "crucifi",
    avg: [ 6.47, 2.23 ], std: [ 2.47, 1.72 ], fq: 2
  },
  "crude": {
    dict: "anew", word: "crude", stem: "crude",
    avg: [ 5.07, 3.12 ], std: [ 2.37, 1.65 ], fq: 15
  },
  "cruel": {
    dict: "anew", word: "cruel", stem: "cruel",
    avg: [ 5.68, 1.97 ], std: [ 2.65, 1.67 ], fq: 15
  },
  "crushed": {
    dict: "anew", word: "crushed", stem: "crush",
    avg: [ 5.52, 2.21 ], std: [ 2.87, 1.74 ], fq: 10
  },
  "crutch": {
    dict: "anew", word: "crutch", stem: "crutch",
    avg: [ 4.14, 3.43 ], std: [ 2.05, 1.62 ], fq: 1
  },
  "cuddle": {
    dict: "anew", word: "cuddle", stem: "cuddl",
    avg: [ 4.4, 7.72 ], std: [ 2.67, 1.92 ], fq: 0
  },
  "cuisine": {
    dict: "anew", word: "cuisine", stem: "cuisin",
    avg: [ 4.39, 6.64 ], std: [ 1.99, 1.48 ], fq: 1
  },
  "curious": {
    dict: "anew", word: "curious", stem: "curious",
    avg: [ 5.82, 6.08 ], std: [ 1.64, 1.63 ], fq: 46
  },
  "curtains": {
    dict: "anew", word: "curtains", stem: "curtain",
    avg: [ 3.67, 4.83 ], std: [ 1.83, 0.83 ], fq: 8
  },
  "custom": {
    dict: "anew", word: "custom", stem: "custom",
    avg: [ 4.66, 5.85 ], std: [ 2.12, 1.53 ], fq: 14
  },
  "cut": {
    dict: "anew", word: "cut", stem: "cut",
    avg: [ 5, 3.64 ], std: [ 2.32, 2.08 ], fq: 192
  },
  "cute": {
    dict: "anew", word: "cute", stem: "cute",
    avg: [ 5.53, 7.62 ], std: [ 2.71, 1.01 ], fq: 5
  },
  "cyclone": {
    dict: "anew", word: "cyclone", stem: "cyclon",
    avg: [ 6.36, 3.6 ], std: [ 2.89, 2.38 ], fq: 0
  },
  "dagger": {
    dict: "anew", word: "dagger", stem: "dagger",
    avg: [ 6.14, 3.38 ], std: [ 2.64, 1.77 ], fq: 1
  },
  "damage": {
    dict: "anew", word: "damage", stem: "damag",
    avg: [ 5.57, 3.05 ], std: [ 2.26, 1.65 ], fq: 33
  },
  "dancer": {
    dict: "anew", word: "dancer", stem: "dancer",
    avg: [ 6, 7.14 ], std: [ 2.2, 1.56 ], fq: 31
  },
  "danger": {
    dict: "anew", word: "danger", stem: "danger",
    avg: [ 7.32, 2.95 ], std: [ 2.07, 2.22 ], fq: 70
  },
  "dark": {
    dict: "anew", word: "dark", stem: "dark",
    avg: [ 4.28, 4.71 ], std: [ 2.21, 2.36 ], fq: 185
  },
  "dawn": {
    dict: "anew", word: "dawn", stem: "dawn",
    avg: [ 4.39, 6.16 ], std: [ 2.81, 2.33 ], fq: 28
  },
  "daylight": {
    dict: "anew", word: "daylight", stem: "daylight",
    avg: [ 4.77, 6.8 ], std: [ 2.5, 2.17 ], fq: 15
  },
  "dazzle": {
    dict: "anew", word: "dazzle", stem: "dazzl",
    avg: [ 6.33, 7.29 ], std: [ 2.02, 1.09 ], fq: 1
  },
  "dead": {
    dict: "anew", word: "dead", stem: "dead",
    avg: [ 5.73, 1.94 ], std: [ 2.73, 1.76 ], fq: 174
  },
  "death": {
    dict: "anew", word: "death", stem: "death",
    avg: [ 4.59, 1.61 ], std: [ 3.07, 1.4 ], fq: 277
  },
  "debt": {
    dict: "anew", word: "debt", stem: "debt",
    avg: [ 5.68, 2.22 ], std: [ 2.74, 1.17 ], fq: 13
  },
  "deceit": {
    dict: "anew", word: "deceit", stem: "deceit",
    avg: [ 5.68, 2.9 ], std: [ 2.46, 1.63 ], fq: 2
  },
  "decompose": {
    dict: "anew", word: "decompose", stem: "decompos",
    avg: [ 4.65, 3.2 ], std: [ 2.39, 1.81 ], fq: 1
  },
  "decorate": {
    dict: "anew", word: "decorate", stem: "decor",
    avg: [ 5.14, 6.93 ], std: [ 2.39, 1.3 ], fq: 2
  },
  "defeated": {
    dict: "anew", word: "defeated", stem: "defeat",
    avg: [ 5.09, 2.34 ], std: [ 3, 1.66 ], fq: 15
  },
  "defiant": {
    dict: "anew", word: "defiant", stem: "defiant",
    avg: [ 6.1, 4.26 ], std: [ 2.51, 2.12 ], fq: 3
  },
  "deformed": {
    dict: "anew", word: "deformed", stem: "deform",
    avg: [ 4.07, 2.41 ], std: [ 2.34, 1.66 ], fq: 0
  },
  "delayed": {
    dict: "anew", word: "delayed", stem: "delay",
    avg: [ 5.62, 3.07 ], std: [ 2.39, 1.74 ], fq: 25
  },
  "delight": {
    dict: "anew", word: "delight", stem: "delight",
    avg: [ 5.44, 8.26 ], std: [ 2.88, 1.04 ], fq: 29
  },
  "demon": {
    dict: "anew", word: "demon", stem: "demon",
    avg: [ 6.76, 2.11 ], std: [ 2.68, 1.56 ], fq: 9
  },
  "dentist": {
    dict: "anew", word: "dentist", stem: "dentist",
    avg: [ 5.73, 4.02 ], std: [ 2.13, 2.23 ], fq: 12
  },
  "depressed": {
    dict: "anew", word: "depressed", stem: "depress",
    avg: [ 4.72, 1.83 ], std: [ 2.95, 1.42 ], fq: 11
  },
  "depression": {
    dict: "anew", word: "depression", stem: "depress",
    avg: [ 4.54, 1.85 ], std: [ 3.19, 1.67 ], fq: 24
  },
  "derelict": {
    dict: "anew", word: "derelict", stem: "derelict",
    avg: [ 4.1, 4.28 ], std: [ 1.94, 1.84 ], fq: 1
  },
  "deserter": {
    dict: "anew", word: "deserter", stem: "desert",
    avg: [ 5.5, 2.45 ], std: [ 2.55, 1.8 ], fq: 0
  },
  "desire": {
    dict: "anew", word: "desire", stem: "desir",
    avg: [ 7.35, 7.69 ], std: [ 1.76, 1.39 ], fq: 79
  },
  "despairing": {
    dict: "anew", word: "despairing", stem: "despair",
    avg: [ 5.68, 2.43 ], std: [ 2.37, 1.47 ], fq: 4
  },
  "despise": {
    dict: "anew", word: "despise", stem: "despis",
    avg: [ 6.28, 2.03 ], std: [ 2.43, 1.38 ], fq: 7
  },
  "destroy": {
    dict: "anew", word: "destroy", stem: "destroi",
    avg: [ 6.83, 2.64 ], std: [ 2.38, 2.03 ], fq: 48
  },
  "destruction": {
    dict: "anew", word: "destruction", stem: "destruct",
    avg: [ 5.82, 3.16 ], std: [ 2.71, 2.44 ], fq: 38
  },
  "detached": {
    dict: "anew", word: "detached", stem: "detach",
    avg: [ 4.26, 3.86 ], std: [ 2.57, 1.88 ], fq: 12
  },
  "detail": {
    dict: "anew", word: "detail", stem: "detail",
    avg: [ 4.1, 5.55 ], std: [ 2.24, 1.58 ], fq: 72
  },
  "detest": {
    dict: "anew", word: "detest", stem: "detest",
    avg: [ 6.06, 2.17 ], std: [ 2.39, 1.3 ], fq: 1
  },
  "devil": {
    dict: "anew", word: "devil", stem: "devil",
    avg: [ 6.07, 2.21 ], std: [ 2.61, 1.99 ], fq: 25
  },
  "devoted": {
    dict: "anew", word: "devoted", stem: "devot",
    avg: [ 5.23, 7.41 ], std: [ 2.21, 1.37 ], fq: 51
  },
  "diamond": {
    dict: "anew", word: "diamond", stem: "diamond",
    avg: [ 5.53, 7.92 ], std: [ 2.96, 1.2 ], fq: 8
  },
  "dignified": {
    dict: "anew", word: "dignified", stem: "dignifi",
    avg: [ 4.12, 7.1 ], std: [ 2.29, 1.26 ], fq: 7
  },
  "dinner": {
    dict: "anew", word: "dinner", stem: "dinner",
    avg: [ 5.43, 7.16 ], std: [ 2.14, 1.5 ], fq: 91
  },
  "diploma": {
    dict: "anew", word: "diploma", stem: "diploma",
    avg: [ 5.67, 8 ], std: [ 2.8, 1.39 ], fq: 0
  },
  "dirt": {
    dict: "anew", word: "dirt", stem: "dirt",
    avg: [ 3.76, 4.17 ], std: [ 2.26, 1.77 ], fq: 43
  },
  "dirty": {
    dict: "anew", word: "dirty", stem: "dirti",
    avg: [ 4.88, 3.08 ], std: [ 2.29, 2.05 ], fq: 36
  },
  "disappoint": {
    dict: "anew", word: "disappoint", stem: "disappoint",
    avg: [ 4.92, 2.39 ], std: [ 2.64, 1.44 ], fq: 0
  },
  "disaster": {
    dict: "anew", word: "disaster", stem: "disast",
    avg: [ 6.33, 1.73 ], std: [ 2.7, 1.13 ], fq: 26
  },
  "discomfort": {
    dict: "anew", word: "discomfort", stem: "discomfort",
    avg: [ 4.17, 2.19 ], std: [ 2.44, 1.23 ], fq: 7
  },
  "discouraged": {
    dict: "anew", word: "discouraged", stem: "discourag",
    avg: [ 4.53, 3 ], std: [ 2.11, 2.16 ], fq: 15
  },
  "disdainful": {
    dict: "anew", word: "disdainful", stem: "disdain",
    avg: [ 5.04, 3.68 ], std: [ 2.14, 1.9 ], fq: 2
  },
  "disgusted": {
    dict: "anew", word: "disgusted", stem: "disgust",
    avg: [ 5.42, 2.45 ], std: [ 2.59, 1.41 ], fq: 6
  },
  "disloyal": {
    dict: "anew", word: "disloyal", stem: "disloy",
    avg: [ 6.56, 1.93 ], std: [ 2.21, 1.61 ], fq: 2
  },
  "displeased": {
    dict: "anew", word: "displeased", stem: "displeas",
    avg: [ 5.64, 2.79 ], std: [ 2.48, 2.23 ], fq: 7
  },
  "distressed": {
    dict: "anew", word: "distressed", stem: "distress",
    avg: [ 6.4, 1.94 ], std: [ 2.38, 1.1 ], fq: 4
  },
  "disturb": {
    dict: "anew", word: "disturb", stem: "disturb",
    avg: [ 5.8, 3.66 ], std: [ 2.39, 2 ], fq: 10
  },
  "diver": {
    dict: "anew", word: "diver", stem: "diver",
    avg: [ 5.04, 6.45 ], std: [ 2.1, 1.55 ], fq: 1
  },
  "divorce": {
    dict: "anew", word: "divorce", stem: "divorc",
    avg: [ 6.33, 2.22 ], std: [ 2.71, 1.88 ], fq: 29
  },
  "doctor": {
    dict: "anew", word: "doctor", stem: "doctor",
    avg: [ 5.86, 5.2 ], std: [ 2.7, 2.54 ], fq: 100
  },
  "dog": {
    dict: "anew", word: "dog", stem: "dog",
    avg: [ 5.76, 7.57 ], std: [ 2.5, 1.66 ], fq: 75
  },
  "doll": {
    dict: "anew", word: "doll", stem: "doll",
    avg: [ 4.24, 6.09 ], std: [ 2.43, 1.96 ], fq: 10
  },
  "dollar": {
    dict: "anew", word: "dollar", stem: "dollar",
    avg: [ 6.07, 7.47 ], std: [ 2.67, 1.72 ], fq: 46
  },
  "door": {
    dict: "anew", word: "door", stem: "door",
    avg: [ 3.8, 5.13 ], std: [ 2.29, 1.44 ], fq: 312
  },
  "dove": {
    dict: "anew", word: "dove", stem: "dove",
    avg: [ 3.79, 6.9 ], std: [ 2.28, 1.54 ], fq: 4
  },
  "dreadful": {
    dict: "anew", word: "dreadful", stem: "dread",
    avg: [ 5.84, 2.26 ], std: [ 2.62, 1.91 ], fq: 10
  },
  "dream": {
    dict: "anew", word: "dream", stem: "dream",
    avg: [ 4.53, 6.73 ], std: [ 2.72, 1.75 ], fq: 64
  },
  "dreary": {
    dict: "anew", word: "dreary", stem: "dreari",
    avg: [ 2.98, 3.05 ], std: [ 2.18, 1.58 ], fq: 6
  },
  "dress": {
    dict: "anew", word: "dress", stem: "dress",
    avg: [ 4.05, 6.41 ], std: [ 1.89, 1.34 ], fq: 67
  },
  "drown": {
    dict: "anew", word: "drown", stem: "drown",
    avg: [ 6.57, 1.92 ], std: [ 2.33, 1.48 ], fq: 3
  },
  "dummy": {
    dict: "anew", word: "dummy", stem: "dummi",
    avg: [ 4.35, 3.38 ], std: [ 2.25, 1.7 ], fq: 3
  },
  "dump": {
    dict: "anew", word: "dump", stem: "dump",
    avg: [ 4.12, 3.21 ], std: [ 2.36, 1.87 ], fq: 4
  },
  "dustpan": {
    dict: "anew", word: "dustpan", stem: "dustpan",
    avg: [ 3.43, 3.98 ], std: [ 2, 1.68 ], fq: 0
  },
  "earth": {
    dict: "anew", word: "earth", stem: "earth",
    avg: [ 4.24, 7.15 ], std: [ 2.49, 1.67 ], fq: 150
  },
  "easy": {
    dict: "anew", word: "easy", stem: "easi",
    avg: [ 4.48, 7.1 ], std: [ 2.82, 1.91 ], fq: 125
  },
  "easygoing": {
    dict: "anew", word: "easygoing", stem: "easygo",
    avg: [ 4.3, 7.2 ], std: [ 2.52, 1.5 ], fq: 1
  },
  "eat": {
    dict: "anew", word: "eat", stem: "eat",
    avg: [ 5.69, 7.47 ], std: [ 2.51, 1.73 ], fq: 61
  },
  "ecstasy": {
    dict: "anew", word: "ecstasy", stem: "ecstasi",
    avg: [ 7.38, 7.98 ], std: [ 1.92, 1.52 ], fq: 6
  },
  "education": {
    dict: "anew", word: "education", stem: "educ",
    avg: [ 5.74, 6.69 ], std: [ 2.46, 1.77 ], fq: 214
  },
  "egg": {
    dict: "anew", word: "egg", stem: "egg",
    avg: [ 3.76, 5.29 ], std: [ 2.39, 1.82 ], fq: 12
  },
  "elated": {
    dict: "anew", word: "elated", stem: "elat",
    avg: [ 6.21, 7.45 ], std: [ 2.3, 1.77 ], fq: 3
  },
  "elbow": {
    dict: "anew", word: "elbow", stem: "elbow",
    avg: [ 3.81, 5.12 ], std: [ 2.14, 0.92 ], fq: 10
  },
  "elegant": {
    dict: "anew", word: "elegant", stem: "eleg",
    avg: [ 4.53, 7.43 ], std: [ 2.65, 1.26 ], fq: 14
  },
  "elevator": {
    dict: "anew", word: "elevator", stem: "elev",
    avg: [ 4.16, 5.44 ], std: [ 1.99, 1.18 ], fq: 12
  },
  "embarrassed": {
    dict: "anew", word: "embarrassed", stem: "embarrass",
    avg: [ 5.87, 3.03 ], std: [ 2.55, 1.85 ], fq: 8
  },
  "embattled": {
    dict: "anew", word: "embattled", stem: "embattl",
    avg: [ 5.36, 4.39 ], std: [ 2.37, 1.63 ], fq: 1
  },
  "employment": {
    dict: "anew", word: "employment", stem: "employ",
    avg: [ 5.28, 6.47 ], std: [ 2.12, 1.81 ], fq: 47
  },
  "engaged": {
    dict: "anew", word: "engaged", stem: "engag",
    avg: [ 6.77, 8 ], std: [ 2.07, 1.38 ], fq: 47
  },
  "engine": {
    dict: "anew", word: "engine", stem: "engin",
    avg: [ 3.98, 5.2 ], std: [ 2.33, 1.18 ], fq: 50
  },
  "enjoyment": {
    dict: "anew", word: "enjoyment", stem: "enjoy",
    avg: [ 5.2, 7.8 ], std: [ 2.72, 1.2 ], fq: 21
  },
  "ennui": {
    dict: "anew", word: "ennui", stem: "ennui",
    avg: [ 4.4, 5.09 ], std: [ 2.33, 1.76 ], fq: 0
  },
  "enraged": {
    dict: "anew", word: "enraged", stem: "enrag",
    avg: [ 7.97, 2.46 ], std: [ 2.17, 1.65 ], fq: 1
  },
  "erotic": {
    dict: "anew", word: "erotic", stem: "erot",
    avg: [ 7.24, 7.43 ], std: [ 1.97, 1.53 ], fq: 8
  },
  "errand": {
    dict: "anew", word: "errand", stem: "errand",
    avg: [ 3.85, 4.58 ], std: [ 1.92, 1.74 ], fq: 7
  },
  "event": {
    dict: "anew", word: "event", stem: "event",
    avg: [ 5.1, 6.21 ], std: [ 2.4, 1.63 ], fq: 81
  },
  "evil": {
    dict: "anew", word: "evil", stem: "evil",
    avg: [ 6.39, 3.23 ], std: [ 2.44, 2.64 ], fq: 72
  },
  "excellence": {
    dict: "anew", word: "excellence", stem: "excel",
    avg: [ 5.54, 8.38 ], std: [ 2.67, 0.96 ], fq: 15
  },
  "excitement": {
    dict: "anew", word: "excitement", stem: "excit",
    avg: [ 7.67, 7.5 ], std: [ 1.91, 2.2 ], fq: 32
  },
  "excuse": {
    dict: "anew", word: "excuse", stem: "excus",
    avg: [ 4.48, 4.05 ], std: [ 2.29, 1.41 ], fq: 27
  },
  "execution": {
    dict: "anew", word: "execution", stem: "execut",
    avg: [ 5.71, 2.37 ], std: [ 2.74, 2.06 ], fq: 15
  },
  "exercise": {
    dict: "anew", word: "exercise", stem: "exercis",
    avg: [ 6.84, 7.13 ], std: [ 2.06, 1.58 ], fq: 58
  },
  "fabric": {
    dict: "anew", word: "fabric", stem: "fabric",
    avg: [ 4.14, 5.3 ], std: [ 1.98, 1.2 ], fq: 15
  },
  "face": {
    dict: "anew", word: "face", stem: "face",
    avg: [ 5.04, 6.39 ], std: [ 2.18, 1.6 ], fq: 371
  },
  "failure": {
    dict: "anew", word: "failure", stem: "failur",
    avg: [ 4.95, 1.7 ], std: [ 2.81, 1.07 ], fq: 89
  },
  "fall": {
    dict: "anew", word: "fall", stem: "fall",
    avg: [ 4.7, 4.09 ], std: [ 2.48, 2.21 ], fq: 147
  },
  "FALSE": {
    dict: "anew", word: "FALSE", stem: "fals",
    avg: [ 3.43, 3.27 ], std: [ 2.09, 1.4 ], fq: 29
  },
  "fame": {
    dict: "anew", word: "fame", stem: "fame",
    avg: [ 6.55, 7.93 ], std: [ 2.46, 1.29 ], fq: 18
  },
  "family": {
    dict: "anew", word: "family", stem: "famili",
    avg: [ 4.8, 7.65 ], std: [ 2.71, 1.55 ], fq: 331
  },
  "famous": {
    dict: "anew", word: "famous", stem: "famous",
    avg: [ 5.73, 6.98 ], std: [ 2.68, 2.07 ], fq: 89
  },
  "fantasy": {
    dict: "anew", word: "fantasy", stem: "fantasi",
    avg: [ 5.14, 7.41 ], std: [ 2.82, 1.9 ], fq: 14
  },
  "farm": {
    dict: "anew", word: "farm", stem: "farm",
    avg: [ 3.9, 5.53 ], std: [ 1.95, 1.85 ], fq: 125
  },
  "fascinate": {
    dict: "anew", word: "fascinate", stem: "fascin",
    avg: [ 5.83, 7.34 ], std: [ 2.73, 1.68 ], fq: 3
  },
  "fat": {
    dict: "anew", word: "fat", stem: "fat",
    avg: [ 4.81, 2.28 ], std: [ 2.8, 1.92 ], fq: 60
  },
  "father": {
    dict: "anew", word: "father", stem: "father",
    avg: [ 5.92, 7.08 ], std: [ 2.6, 2.2 ], fq: 383
  },
  "fatigued": {
    dict: "anew", word: "fatigued", stem: "fatigu",
    avg: [ 2.64, 3.28 ], std: [ 2.19, 1.43 ], fq: 3
  },
  "fault": {
    dict: "anew", word: "fault", stem: "fault",
    avg: [ 4.07, 3.43 ], std: [ 1.69, 1.38 ], fq: 22
  },
  "favor": {
    dict: "anew", word: "favor", stem: "favor",
    avg: [ 4.54, 6.46 ], std: [ 1.86, 1.52 ], fq: 78
  },
  "fear": {
    dict: "anew", word: "fear", stem: "fear",
    avg: [ 6.96, 2.76 ], std: [ 2.17, 2.12 ], fq: 127
  },
  "fearful": {
    dict: "anew", word: "fearful", stem: "fear",
    avg: [ 6.33, 2.25 ], std: [ 2.28, 1.18 ], fq: 13
  },
  "feeble": {
    dict: "anew", word: "feeble", stem: "feebl",
    avg: [ 4.1, 3.26 ], std: [ 2.07, 1.47 ], fq: 8
  },
  "festive": {
    dict: "anew", word: "festive", stem: "festiv",
    avg: [ 6.58, 7.3 ], std: [ 2.29, 2.26 ], fq: 2
  },
  "fever": {
    dict: "anew", word: "fever", stem: "fever",
    avg: [ 4.29, 2.76 ], std: [ 2.31, 1.64 ], fq: 19
  },
  "field": {
    dict: "anew", word: "field", stem: "field",
    avg: [ 4.08, 6.2 ], std: [ 2.41, 1.37 ], fq: 274
  },
  "fight": {
    dict: "anew", word: "fight", stem: "fight",
    avg: [ 7.15, 3.76 ], std: [ 2.19, 2.63 ], fq: 98
  },
  "filth": {
    dict: "anew", word: "filth", stem: "filth",
    avg: [ 5.12, 2.47 ], std: [ 2.32, 1.68 ], fq: 2
  },
  "finger": {
    dict: "anew", word: "finger", stem: "finger",
    avg: [ 3.78, 5.29 ], std: [ 2.42, 1.42 ], fq: 40
  },
  "fire": {
    dict: "anew", word: "fire", stem: "fire",
    avg: [ 7.17, 3.22 ], std: [ 2.06, 2.06 ], fq: 187
  },
  "fireworks": {
    dict: "anew", word: "fireworks", stem: "firework",
    avg: [ 6.67, 7.55 ], std: [ 2.12, 1.5 ], fq: 5
  },
  "fish": {
    dict: "anew", word: "fish", stem: "fish",
    avg: [ 4, 6.04 ], std: [ 2.19, 1.94 ], fq: 35
  },
  "flabby": {
    dict: "anew", word: "flabby", stem: "flabbi",
    avg: [ 4.82, 2.66 ], std: [ 2.81, 1.87 ], fq: 0
  },
  "flag": {
    dict: "anew", word: "flag", stem: "flag",
    avg: [ 4.6, 6.02 ], std: [ 2.35, 1.66 ], fq: 16
  },
  "flirt": {
    dict: "anew", word: "flirt", stem: "flirt",
    avg: [ 6.91, 7.52 ], std: [ 1.69, 1.19 ], fq: 1
  },
  "flood": {
    dict: "anew", word: "flood", stem: "flood",
    avg: [ 6, 3.19 ], std: [ 2.02, 1.66 ], fq: 19
  },
  "flower": {
    dict: "anew", word: "flower", stem: "flower",
    avg: [ 4, 6.64 ], std: [ 2.44, 1.78 ], fq: 23
  },
  "foam": {
    dict: "anew", word: "foam", stem: "foam",
    avg: [ 5.26, 6.07 ], std: [ 2.54, 2.03 ], fq: 37
  },
  "food": {
    dict: "anew", word: "food", stem: "food",
    avg: [ 5.92, 7.65 ], std: [ 2.11, 1.37 ], fq: 147
  },
  "foot": {
    dict: "anew", word: "foot", stem: "foot",
    avg: [ 3.27, 5.02 ], std: [ 1.98, 0.93 ], fq: 70
  },
  "fork": {
    dict: "anew", word: "fork", stem: "fork",
    avg: [ 3.96, 5.29 ], std: [ 1.94, 0.97 ], fq: 14
  },
  "foul": {
    dict: "anew", word: "foul", stem: "foul",
    avg: [ 4.93, 2.81 ], std: [ 2.23, 1.52 ], fq: 4
  },
  "fragrance": {
    dict: "anew", word: "fragrance", stem: "fragranc",
    avg: [ 4.79, 6.07 ], std: [ 2.54, 1.97 ], fq: 6
  },
  "fraud": {
    dict: "anew", word: "fraud", stem: "fraud",
    avg: [ 5.75, 2.67 ], std: [ 2.45, 1.66 ], fq: 8
  },
  "free": {
    dict: "anew", word: "free", stem: "free",
    avg: [ 5.15, 8.26 ], std: [ 3.04, 1.31 ], fq: 260
  },
  "freedom": {
    dict: "anew", word: "freedom", stem: "freedom",
    avg: [ 5.52, 7.58 ], std: [ 2.72, 2.04 ], fq: 128
  },
  "friend": {
    dict: "anew", word: "friend", stem: "friend",
    avg: [ 5.74, 7.74 ], std: [ 2.57, 1.24 ], fq: 133
  },
  "friendly": {
    dict: "anew", word: "friendly", stem: "friend",
    avg: [ 5.11, 8.43 ], std: [ 2.96, 1.08 ], fq: 61
  },
  "frigid": {
    dict: "anew", word: "frigid", stem: "frigid",
    avg: [ 4.75, 3.5 ], std: [ 2.56, 1.85 ], fq: 5
  },
  "frog": {
    dict: "anew", word: "frog", stem: "frog",
    avg: [ 4.54, 5.71 ], std: [ 2.03, 1.74 ], fq: 1
  },
  "frustrated": {
    dict: "anew", word: "frustrated", stem: "frustrat",
    avg: [ 5.61, 2.48 ], std: [ 2.76, 1.64 ], fq: 10
  },
  "fun": {
    dict: "anew", word: "fun", stem: "fun",
    avg: [ 7.22, 8.37 ], std: [ 2.01, 1.11 ], fq: 44
  },
  "funeral": {
    dict: "anew", word: "funeral", stem: "funer",
    avg: [ 4.94, 1.39 ], std: [ 3.21, 0.87 ], fq: 33
  },
  "fungus": {
    dict: "anew", word: "fungus", stem: "fungus",
    avg: [ 4.68, 3.06 ], std: [ 2.33, 1.75 ], fq: 2
  },
  "fur": {
    dict: "anew", word: "fur", stem: "fur",
    avg: [ 4.18, 4.51 ], std: [ 2.44, 1.88 ], fq: 13
  },
  "game": {
    dict: "anew", word: "game", stem: "game",
    avg: [ 5.89, 6.98 ], std: [ 2.37, 1.97 ], fq: 123
  },
  "gangrene": {
    dict: "anew", word: "gangrene", stem: "gangren",
    avg: [ 5.7, 2.28 ], std: [ 2.96, 1.91 ], fq: 0
  },
  "garbage": {
    dict: "anew", word: "garbage", stem: "garbag",
    avg: [ 5.04, 2.98 ], std: [ 2.5, 1.96 ], fq: 7
  },
  "garden": {
    dict: "anew", word: "garden", stem: "garden",
    avg: [ 4.39, 6.71 ], std: [ 2.35, 1.74 ], fq: 60
  },
  "garment": {
    dict: "anew", word: "garment", stem: "garment",
    avg: [ 4.49, 6.07 ], std: [ 2.5, 1.61 ], fq: 6
  },
  "garter": {
    dict: "anew", word: "garter", stem: "garter",
    avg: [ 5.47, 6.22 ], std: [ 2.15, 1.59 ], fq: 2
  },
  "gender": {
    dict: "anew", word: "gender", stem: "gender",
    avg: [ 4.38, 5.73 ], std: [ 2.13, 1.55 ], fq: 2
  },
  "gentle": {
    dict: "anew", word: "gentle", stem: "gentl",
    avg: [ 3.21, 7.31 ], std: [ 2.57, 1.3 ], fq: 27
  },
  "germs": {
    dict: "anew", word: "germs", stem: "germ",
    avg: [ 4.49, 2.86 ], std: [ 2.24, 1.39 ], fq: 1
  },
  "gift": {
    dict: "anew", word: "gift", stem: "gift",
    avg: [ 6.14, 7.77 ], std: [ 2.76, 2.24 ], fq: 33
  },
  "girl": {
    dict: "anew", word: "girl", stem: "girl",
    avg: [ 4.29, 6.87 ], std: [ 2.69, 1.64 ], fq: 220
  },
  "glacier": {
    dict: "anew", word: "glacier", stem: "glacier",
    avg: [ 4.24, 5.5 ], std: [ 2.29, 1.25 ], fq: 1
  },
  "glamour": {
    dict: "anew", word: "glamour", stem: "glamour",
    avg: [ 4.68, 6.76 ], std: [ 2.23, 1.6 ], fq: 5
  },
  "glass": {
    dict: "anew", word: "glass", stem: "glass",
    avg: [ 4.27, 4.75 ], std: [ 2.07, 1.38 ], fq: 99
  },
  "gloom": {
    dict: "anew", word: "gloom", stem: "gloom",
    avg: [ 3.83, 1.88 ], std: [ 2.33, 1.23 ], fq: 14
  },
  "glory": {
    dict: "anew", word: "glory", stem: "glori",
    avg: [ 6.02, 7.55 ], std: [ 2.71, 1.68 ], fq: 21
  },
  "god": {
    dict: "anew", word: "god", stem: "god",
    avg: [ 5.95, 8.15 ], std: [ 2.84, 1.27 ], fq: 318
  },
  "gold": {
    dict: "anew", word: "gold", stem: "gold",
    avg: [ 5.76, 7.54 ], std: [ 2.79, 1.63 ], fq: 52
  },
  "golfer": {
    dict: "anew", word: "golfer", stem: "golfer",
    avg: [ 3.73, 5.61 ], std: [ 2.26, 1.93 ], fq: 3
  },
  "good": {
    dict: "anew", word: "good", stem: "good",
    avg: [ 5.43, 7.47 ], std: [ 2.85, 1.45 ], fq: 807
  },
  "gossip": {
    dict: "anew", word: "gossip", stem: "gossip",
    avg: [ 5.74, 3.48 ], std: [ 2.38, 2.33 ], fq: 13
  },
  "graduate": {
    dict: "anew", word: "graduate", stem: "graduat",
    avg: [ 7.25, 8.19 ], std: [ 2.25, 1.13 ], fq: 30
  },
  "grass": {
    dict: "anew", word: "grass", stem: "grass",
    avg: [ 4.14, 6.12 ], std: [ 2.11, 1.44 ], fq: 53
  },
  "grateful": {
    dict: "anew", word: "grateful", stem: "grate",
    avg: [ 4.58, 7.37 ], std: [ 2.14, 0.97 ], fq: 25
  },
  "greed": {
    dict: "anew", word: "greed", stem: "greed",
    avg: [ 4.71, 3.51 ], std: [ 2.26, 1.93 ], fq: 3
  },
  "green": {
    dict: "anew", word: "green", stem: "green",
    avg: [ 4.28, 6.18 ], std: [ 2.46, 2.05 ], fq: 116
  },
  "greet": {
    dict: "anew", word: "greet", stem: "greet",
    avg: [ 5.27, 7 ], std: [ 2.31, 1.52 ], fq: 7
  },
  "grenade": {
    dict: "anew", word: "grenade", stem: "grenad",
    avg: [ 5.7, 3.6 ], std: [ 2.52, 1.88 ], fq: 3
  },
  "grief": {
    dict: "anew", word: "grief", stem: "grief",
    avg: [ 4.78, 1.69 ], std: [ 2.84, 1.04 ], fq: 10
  },
  "grime": {
    dict: "anew", word: "grime", stem: "grime",
    avg: [ 3.98, 3.37 ], std: [ 2.29, 1.34 ], fq: 0
  },
  "gripe": {
    dict: "anew", word: "gripe", stem: "gripe",
    avg: [ 5, 3.14 ], std: [ 2.19, 1.56 ], fq: 0
  },
  "guillotine": {
    dict: "anew", word: "guillotine", stem: "guillotin",
    avg: [ 6.56, 2.48 ], std: [ 2.54, 2.11 ], fq: 0
  },
  "guilty": {
    dict: "anew", word: "guilty", stem: "guilti",
    avg: [ 6.04, 2.63 ], std: [ 2.76, 1.98 ], fq: 29
  },
  "gun": {
    dict: "anew", word: "gun", stem: "gun",
    avg: [ 7.02, 3.47 ], std: [ 1.84, 2.48 ], fq: 118
  },
  "gymnast": {
    dict: "anew", word: "gymnast", stem: "gymnast",
    avg: [ 5.02, 6.35 ], std: [ 2.2, 1.79 ], fq: 1
  },
  "habit": {
    dict: "anew", word: "habit", stem: "habit",
    avg: [ 3.95, 4.11 ], std: [ 2.11, 1.77 ], fq: 23
  },
  "hairdryer": {
    dict: "anew", word: "hairdryer", stem: "hairdryer",
    avg: [ 3.71, 4.84 ], std: [ 1.75, 0.84 ], fq: 0
  },
  "hairpin": {
    dict: "anew", word: "hairpin", stem: "hairpin",
    avg: [ 3.27, 5.26 ], std: [ 2.41, 1.45 ], fq: 1
  },
  "hamburger": {
    dict: "anew", word: "hamburger", stem: "hamburg",
    avg: [ 4.55, 6.27 ], std: [ 2.14, 1.5 ], fq: 6
  },
  "hammer": {
    dict: "anew", word: "hammer", stem: "hammer",
    avg: [ 4.58, 4.88 ], std: [ 2.02, 1.16 ], fq: 9
  },
  "hand": {
    dict: "anew", word: "hand", stem: "hand",
    avg: [ 4.4, 5.95 ], std: [ 2.07, 1.38 ], fq: 431
  },
  "handicap": {
    dict: "anew", word: "handicap", stem: "handicap",
    avg: [ 3.81, 3.29 ], std: [ 2.27, 1.69 ], fq: 6
  },
  "handsome": {
    dict: "anew", word: "handsome", stem: "handsom",
    avg: [ 5.95, 7.93 ], std: [ 2.73, 1.47 ], fq: 40
  },
  "haphazard": {
    dict: "anew", word: "haphazard", stem: "haphazard",
    avg: [ 4.07, 4.02 ], std: [ 2.18, 1.41 ], fq: 2
  },
  "happy": {
    dict: "anew", word: "happy", stem: "happi",
    avg: [ 6.49, 8.21 ], std: [ 2.77, 1.82 ], fq: 98
  },
  "hard": {
    dict: "anew", word: "hard", stem: "hard",
    avg: [ 5.12, 5.22 ], std: [ 2.19, 1.82 ], fq: 202
  },
  "hardship": {
    dict: "anew", word: "hardship", stem: "hardship",
    avg: [ 4.76, 2.45 ], std: [ 2.55, 1.61 ], fq: 9
  },
  "hat": {
    dict: "anew", word: "hat", stem: "hat",
    avg: [ 4.1, 5.46 ], std: [ 2, 1.36 ], fq: 56
  },
  "hate": {
    dict: "anew", word: "hate", stem: "hate",
    avg: [ 6.95, 2.12 ], std: [ 2.56, 1.72 ], fq: 42
  },
  "hatred": {
    dict: "anew", word: "hatred", stem: "hatr",
    avg: [ 6.66, 1.98 ], std: [ 2.56, 1.92 ], fq: 20
  },
  "hawk": {
    dict: "anew", word: "hawk", stem: "hawk",
    avg: [ 4.39, 5.88 ], std: [ 2.29, 1.62 ], fq: 14
  },
  "hay": {
    dict: "anew", word: "hay", stem: "hay",
    avg: [ 3.95, 5.24 ], std: [ 2.58, 1.24 ], fq: 19
  },
  "headache": {
    dict: "anew", word: "headache", stem: "headach",
    avg: [ 5.07, 2.02 ], std: [ 2.74, 1.06 ], fq: 5
  },
  "headlight": {
    dict: "anew", word: "headlight", stem: "headlight",
    avg: [ 3.81, 5.24 ], std: [ 2.22, 1.51 ], fq: 0
  },
  "heal": {
    dict: "anew", word: "heal", stem: "heal",
    avg: [ 4.77, 7.09 ], std: [ 2.23, 1.46 ], fq: 2
  },
  "health": {
    dict: "anew", word: "health", stem: "health",
    avg: [ 5.13, 6.81 ], std: [ 2.35, 1.88 ], fq: 105
  },
  "heart": {
    dict: "anew", word: "heart", stem: "heart",
    avg: [ 6.34, 7.39 ], std: [ 2.25, 1.53 ], fq: 173
  },
  "heaven": {
    dict: "anew", word: "heaven", stem: "heaven",
    avg: [ 5.61, 7.3 ], std: [ 3.2, 2.39 ], fq: 43
  },
  "hell": {
    dict: "anew", word: "hell", stem: "hell",
    avg: [ 5.38, 2.24 ], std: [ 2.62, 1.62 ], fq: 95
  },
  "helpless": {
    dict: "anew", word: "helpless", stem: "helpless",
    avg: [ 5.34, 2.2 ], std: [ 2.52, 1.42 ], fq: 21
  },
  "heroin": {
    dict: "anew", word: "heroin", stem: "heroin",
    avg: [ 5.11, 4.36 ], std: [ 2.72, 2.73 ], fq: 2
  },
  "hide": {
    dict: "anew", word: "hide", stem: "hide",
    avg: [ 5.28, 4.32 ], std: [ 2.51, 1.91 ], fq: 22
  },
  "highway": {
    dict: "anew", word: "highway", stem: "highway",
    avg: [ 5.16, 5.92 ], std: [ 2.44, 1.72 ], fq: 40
  },
  "hinder": {
    dict: "anew", word: "hinder", stem: "hinder",
    avg: [ 4.12, 3.81 ], std: [ 2.01, 1.42 ], fq: 0
  },
  "history": {
    dict: "anew", word: "history", stem: "histori",
    avg: [ 3.93, 5.24 ], std: [ 2.29, 2.01 ], fq: 286
  },
  "hit": {
    dict: "anew", word: "hit", stem: "hit",
    avg: [ 5.73, 4.33 ], std: [ 2.09, 2.35 ], fq: 115
  },
  "holiday": {
    dict: "anew", word: "holiday", stem: "holiday",
    avg: [ 6.59, 7.55 ], std: [ 2.73, 2.14 ], fq: 17
  },
  "home": {
    dict: "anew", word: "home", stem: "home",
    avg: [ 4.21, 7.91 ], std: [ 2.94, 1.63 ], fq: 547
  },
  "honest": {
    dict: "anew", word: "honest", stem: "honest",
    avg: [ 5.32, 7.7 ], std: [ 1.92, 1.43 ], fq: 47
  },
  "honey": {
    dict: "anew", word: "honey", stem: "honey",
    avg: [ 4.51, 6.73 ], std: [ 2.25, 1.7 ], fq: 25
  },
  "honor": {
    dict: "anew", word: "honor", stem: "honor",
    avg: [ 5.9, 7.66 ], std: [ 1.83, 1.24 ], fq: 66
  },
  "hooker": {
    dict: "anew", word: "hooker", stem: "hooker",
    avg: [ 4.93, 3.34 ], std: [ 2.82, 2.31 ], fq: 0
  },
  "hope": {
    dict: "anew", word: "hope", stem: "hope",
    avg: [ 5.44, 7.05 ], std: [ 2.47, 1.96 ], fq: 178
  },
  "hopeful": {
    dict: "anew", word: "hopeful", stem: "hope",
    avg: [ 5.78, 7.1 ], std: [ 2.09, 1.46 ], fq: 12
  },
  "horror": {
    dict: "anew", word: "horror", stem: "horror",
    avg: [ 7.21, 2.76 ], std: [ 2.14, 2.25 ], fq: 17
  },
  "horse": {
    dict: "anew", word: "horse", stem: "hors",
    avg: [ 3.89, 5.89 ], std: [ 2.17, 1.55 ], fq: 117
  },
  "hospital": {
    dict: "anew", word: "hospital", stem: "hospit",
    avg: [ 5.98, 5.04 ], std: [ 2.54, 2.45 ], fq: 110
  },
  "hostage": {
    dict: "anew", word: "hostage", stem: "hostag",
    avg: [ 6.76, 2.2 ], std: [ 2.63, 1.8 ], fq: 2
  },
  "hostile": {
    dict: "anew", word: "hostile", stem: "hostil",
    avg: [ 6.44, 2.73 ], std: [ 2.28, 1.5 ], fq: 19
  },
  "hotel": {
    dict: "anew", word: "hotel", stem: "hotel",
    avg: [ 4.8, 6 ], std: [ 2.53, 1.77 ], fq: 126
  },
  "house": {
    dict: "anew", word: "house", stem: "hous",
    avg: [ 4.56, 7.26 ], std: [ 2.41, 1.72 ], fq: 591
  },
  "hug": {
    dict: "anew", word: "hug", stem: "hug",
    avg: [ 5.35, 8 ], std: [ 2.76, 1.55 ], fq: 3
  },
  "humane": {
    dict: "anew", word: "humane", stem: "human",
    avg: [ 4.5, 6.89 ], std: [ 1.91, 1.7 ], fq: 5
  },
  "humble": {
    dict: "anew", word: "humble", stem: "humbl",
    avg: [ 3.74, 5.86 ], std: [ 2.33, 1.42 ], fq: 18
  },
  "humiliate": {
    dict: "anew", word: "humiliate", stem: "humili",
    avg: [ 6.14, 2.24 ], std: [ 2.42, 1.34 ], fq: 0
  },
  "humor": {
    dict: "anew", word: "humor", stem: "humor",
    avg: [ 5.5, 8.56 ], std: [ 2.91, 0.81 ], fq: 47
  },
  "hungry": {
    dict: "anew", word: "hungry", stem: "hungri",
    avg: [ 5.13, 3.58 ], std: [ 2.44, 2.01 ], fq: 23
  },
  "hurricane": {
    dict: "anew", word: "hurricane", stem: "hurrican",
    avg: [ 6.83, 3.34 ], std: [ 2.06, 2.12 ], fq: 8
  },
  "hurt": {
    dict: "anew", word: "hurt", stem: "hurt",
    avg: [ 5.85, 1.9 ], std: [ 2.49, 1.26 ], fq: 37
  },
  "hydrant": {
    dict: "anew", word: "hydrant", stem: "hydrant",
    avg: [ 3.71, 5.02 ], std: [ 1.75, 0.93 ], fq: 0
  },
  "icebox": {
    dict: "anew", word: "icebox", stem: "icebox",
    avg: [ 4.17, 4.95 ], std: [ 2.11, 1 ], fq: 3
  },
  "idea": {
    dict: "anew", word: "idea", stem: "idea",
    avg: [ 5.86, 7 ], std: [ 1.81, 1.34 ], fq: 195
  },
  "identity": {
    dict: "anew", word: "identity", stem: "ident",
    avg: [ 4.95, 6.57 ], std: [ 2.24, 1.99 ], fq: 55
  },
  "idiot": {
    dict: "anew", word: "idiot", stem: "idiot",
    avg: [ 4.21, 3.16 ], std: [ 2.47, 1.91 ], fq: 2
  },
  "idol": {
    dict: "anew", word: "idol", stem: "idol",
    avg: [ 4.95, 6.12 ], std: [ 2.14, 1.86 ], fq: 7
  },
  "ignorance": {
    dict: "anew", word: "ignorance", stem: "ignor",
    avg: [ 4.39, 3.07 ], std: [ 2.49, 2.25 ], fq: 16
  },
  "illness": {
    dict: "anew", word: "illness", stem: "ill",
    avg: [ 4.71, 2.48 ], std: [ 2.24, 1.4 ], fq: 20
  },
  "imagine": {
    dict: "anew", word: "imagine", stem: "imagin",
    avg: [ 5.98, 7.32 ], std: [ 2.14, 1.52 ], fq: 61
  },
  "immature": {
    dict: "anew", word: "immature", stem: "immatur",
    avg: [ 4.15, 3.39 ], std: [ 1.96, 1.7 ], fq: 7
  },
  "immoral": {
    dict: "anew", word: "immoral", stem: "immor",
    avg: [ 4.98, 3.5 ], std: [ 2.48, 2.16 ], fq: 5
  },
  "impair": {
    dict: "anew", word: "impair", stem: "impair",
    avg: [ 4.04, 3.18 ], std: [ 2.14, 1.86 ], fq: 4
  },
  "impotent": {
    dict: "anew", word: "impotent", stem: "impot",
    avg: [ 4.57, 2.81 ], std: [ 2.59, 1.92 ], fq: 2
  },
  "impressed": {
    dict: "anew", word: "impressed", stem: "impress",
    avg: [ 5.42, 7.33 ], std: [ 2.65, 1.84 ], fq: 30
  },
  "improve": {
    dict: "anew", word: "improve", stem: "improv",
    avg: [ 5.69, 7.65 ], std: [ 2.15, 1.16 ], fq: 39
  },
  "incentive": {
    dict: "anew", word: "incentive", stem: "incent",
    avg: [ 5.69, 7 ], std: [ 2.45, 1.72 ], fq: 12
  },
  "indifferent": {
    dict: "anew", word: "indifferent", stem: "indiffer",
    avg: [ 3.18, 4.61 ], std: [ 1.85, 1.28 ], fq: 11
  },
  "industry": {
    dict: "anew", word: "industry", stem: "industri",
    avg: [ 4.47, 5.3 ], std: [ 2.43, 1.61 ], fq: 171
  },
  "infant": {
    dict: "anew", word: "infant", stem: "infant",
    avg: [ 5.05, 6.95 ], std: [ 2.66, 2.08 ], fq: 11
  },
  "infatuation": {
    dict: "anew", word: "infatuation", stem: "infatu",
    avg: [ 7.02, 6.73 ], std: [ 1.87, 2.08 ], fq: 4
  },
  "infection": {
    dict: "anew", word: "infection", stem: "infect",
    avg: [ 5.03, 1.66 ], std: [ 2.77, 1.34 ], fq: 8
  },
  "inferior": {
    dict: "anew", word: "inferior", stem: "inferior",
    avg: [ 3.83, 3.07 ], std: [ 2.05, 1.57 ], fq: 7
  },
  "inhabitant": {
    dict: "anew", word: "inhabitant", stem: "inhabit",
    avg: [ 3.95, 5.05 ], std: [ 1.97, 1.34 ], fq: 0
  },
  "injury": {
    dict: "anew", word: "injury", stem: "injuri",
    avg: [ 5.69, 2.49 ], std: [ 2.06, 1.76 ], fq: 27
  },
  "ink": {
    dict: "anew", word: "ink", stem: "ink",
    avg: [ 3.84, 5.05 ], std: [ 1.88, 0.81 ], fq: 7
  },
  "innocent": {
    dict: "anew", word: "innocent", stem: "innoc",
    avg: [ 4.21, 6.51 ], std: [ 1.99, 1.34 ], fq: 37
  },
  "insane": {
    dict: "anew", word: "insane", stem: "insan",
    avg: [ 5.83, 2.85 ], std: [ 2.45, 1.94 ], fq: 13
  },
  "insect": {
    dict: "anew", word: "insect", stem: "insect",
    avg: [ 4.07, 4.07 ], std: [ 2.46, 2.16 ], fq: 14
  },
  "insecure": {
    dict: "anew", word: "insecure", stem: "insecur",
    avg: [ 5.56, 2.36 ], std: [ 2.34, 1.33 ], fq: 3
  },
  "insolent": {
    dict: "anew", word: "insolent", stem: "insol",
    avg: [ 5.38, 4.35 ], std: [ 2.37, 1.76 ], fq: 2
  },
  "inspire": {
    dict: "anew", word: "inspire", stem: "inspir",
    avg: [ 5, 6.97 ], std: [ 2.53, 1.91 ], fq: 3
  },
  "inspired": {
    dict: "anew", word: "inspired", stem: "inspir",
    avg: [ 6.02, 7.15 ], std: [ 2.67, 1.85 ], fq: 25
  },
  "insult": {
    dict: "anew", word: "insult", stem: "insult",
    avg: [ 6, 2.29 ], std: [ 2.46, 1.33 ], fq: 7
  },
  "intellect": {
    dict: "anew", word: "intellect", stem: "intellect",
    avg: [ 4.75, 6.82 ], std: [ 2.5, 1.96 ], fq: 5
  },
  "intercourse": {
    dict: "anew", word: "intercourse", stem: "intercours",
    avg: [ 7, 7.36 ], std: [ 2.07, 1.57 ], fq: 9
  },
  "interest": {
    dict: "anew", word: "interest", stem: "interest",
    avg: [ 5.66, 6.97 ], std: [ 2.26, 1.53 ], fq: 330
  },
  "intimate": {
    dict: "anew", word: "intimate", stem: "intim",
    avg: [ 6.98, 7.61 ], std: [ 2.21, 1.51 ], fq: 21
  },
  "intruder": {
    dict: "anew", word: "intruder", stem: "intrud",
    avg: [ 6.86, 2.77 ], std: [ 2.41, 2.32 ], fq: 1
  },
  "invader": {
    dict: "anew", word: "invader", stem: "invad",
    avg: [ 5.5, 3.05 ], std: [ 2.4, 2.01 ], fq: 1
  },
  "invest": {
    dict: "anew", word: "invest", stem: "invest",
    avg: [ 5.12, 5.93 ], std: [ 2.42, 2.1 ], fq: 3
  },
  "iron": {
    dict: "anew", word: "iron", stem: "iron",
    avg: [ 3.76, 4.9 ], std: [ 2.06, 1.02 ], fq: 43
  },
  "irritate": {
    dict: "anew", word: "irritate", stem: "irrit",
    avg: [ 5.76, 3.11 ], std: [ 2.15, 1.67 ], fq: 0
  },
  "item": {
    dict: "anew", word: "item", stem: "item",
    avg: [ 3.24, 5.26 ], std: [ 2.08, 0.86 ], fq: 54
  },
  "jail": {
    dict: "anew", word: "jail", stem: "jail",
    avg: [ 5.49, 1.95 ], std: [ 2.67, 1.27 ], fq: 21
  },
  "jealousy": {
    dict: "anew", word: "jealousy", stem: "jealousi",
    avg: [ 6.36, 2.51 ], std: [ 2.66, 1.83 ], fq: 4
  },
  "jelly": {
    dict: "anew", word: "jelly", stem: "jelli",
    avg: [ 3.7, 5.66 ], std: [ 2.29, 1.44 ], fq: 3
  },
  "jewel": {
    dict: "anew", word: "jewel", stem: "jewel",
    avg: [ 5.38, 7 ], std: [ 2.54, 1.72 ], fq: 1
  },
  "joke": {
    dict: "anew", word: "joke", stem: "joke",
    avg: [ 6.74, 8.1 ], std: [ 1.84, 1.36 ], fq: 22
  },
  "jolly": {
    dict: "anew", word: "jolly", stem: "jolli",
    avg: [ 5.57, 7.41 ], std: [ 2.8, 1.92 ], fq: 4
  },
  "journal": {
    dict: "anew", word: "journal", stem: "journal",
    avg: [ 4.05, 5.14 ], std: [ 1.96, 1.49 ], fq: 42
  },
  "joy": {
    dict: "anew", word: "joy", stem: "joy",
    avg: [ 7.22, 8.6 ], std: [ 2.13, 0.71 ], fq: 40
  },
  "joyful": {
    dict: "anew", word: "joyful", stem: "joy",
    avg: [ 5.98, 8.22 ], std: [ 2.54, 1.22 ], fq: 1
  },
  "jug": {
    dict: "anew", word: "jug", stem: "jug",
    avg: [ 3.88, 5.24 ], std: [ 2.15, 1.65 ], fq: 6
  },
  "justice": {
    dict: "anew", word: "justice", stem: "justic",
    avg: [ 5.47, 7.78 ], std: [ 2.54, 1.35 ], fq: 114
  },
  "kerchief": {
    dict: "anew", word: "kerchief", stem: "kerchief",
    avg: [ 3.43, 5.11 ], std: [ 2.08, 1.33 ], fq: 1
  },
  "kerosene": {
    dict: "anew", word: "kerosene", stem: "kerosen",
    avg: [ 4.34, 4.8 ], std: [ 2.51, 1.59 ], fq: 6
  },
  "ketchup": {
    dict: "anew", word: "ketchup", stem: "ketchup",
    avg: [ 4.09, 5.6 ], std: [ 2.08, 1.35 ], fq: 1
  },
  "kettle": {
    dict: "anew", word: "kettle", stem: "kettl",
    avg: [ 3.22, 5.22 ], std: [ 2.23, 0.91 ], fq: 3
  },
  "key": {
    dict: "anew", word: "key", stem: "key",
    avg: [ 3.7, 5.68 ], std: [ 2.18, 1.62 ], fq: 88
  },
  "kick": {
    dict: "anew", word: "kick", stem: "kick",
    avg: [ 4.9, 4.31 ], std: [ 2.35, 2.18 ], fq: 16
  },
  "kids": {
    dict: "anew", word: "kids", stem: "kid",
    avg: [ 5.27, 6.91 ], std: [ 2.36, 1.99 ], fq: 32
  },
  "killer": {
    dict: "anew", word: "killer", stem: "killer",
    avg: [ 7.86, 1.89 ], std: [ 1.89, 1.39 ], fq: 21
  },
  "kind": {
    dict: "anew", word: "kind", stem: "kind",
    avg: [ 4.46, 7.59 ], std: [ 2.55, 1.67 ], fq: 313
  },
  "kindness": {
    dict: "anew", word: "kindness", stem: "kind",
    avg: [ 4.3, 7.82 ], std: [ 2.62, 1.39 ], fq: 5
  },
  "king": {
    dict: "anew", word: "king", stem: "king",
    avg: [ 5.51, 7.26 ], std: [ 2.77, 1.67 ], fq: 88
  },
  "kiss": {
    dict: "anew", word: "kiss", stem: "kiss",
    avg: [ 7.32, 8.26 ], std: [ 2.03, 1.54 ], fq: 17
  },
  "kitten": {
    dict: "anew", word: "kitten", stem: "kitten",
    avg: [ 5.08, 6.86 ], std: [ 2.45, 2.13 ], fq: 5
  },
  "knife": {
    dict: "anew", word: "knife", stem: "knife",
    avg: [ 5.8, 3.62 ], std: [ 2, 2.18 ], fq: 76
  },
  "knot": {
    dict: "anew", word: "knot", stem: "knot",
    avg: [ 4.07, 4.64 ], std: [ 2.15, 1.36 ], fq: 8
  },
  "knowledge": {
    dict: "anew", word: "knowledge", stem: "knowledg",
    avg: [ 5.92, 7.58 ], std: [ 2.32, 1.32 ], fq: 145
  },
  "lake": {
    dict: "anew", word: "lake", stem: "lake",
    avg: [ 3.95, 6.82 ], std: [ 2.44, 1.54 ], fq: 54
  },
  "lamb": {
    dict: "anew", word: "lamb", stem: "lamb",
    avg: [ 3.36, 5.89 ], std: [ 2.18, 1.73 ], fq: 7
  },
  "lamp": {
    dict: "anew", word: "lamp", stem: "lamp",
    avg: [ 3.8, 5.41 ], std: [ 2.12, 1 ], fq: 18
  },
  "lantern": {
    dict: "anew", word: "lantern", stem: "lantern",
    avg: [ 4.05, 5.57 ], std: [ 2.28, 1.19 ], fq: 13
  },
  "laughter": {
    dict: "anew", word: "laughter", stem: "laughter",
    avg: [ 6.75, 8.45 ], std: [ 2.5, 1.08 ], fq: 22
  },
  "lavish": {
    dict: "anew", word: "lavish", stem: "lavish",
    avg: [ 4.93, 6.21 ], std: [ 2.4, 2.03 ], fq: 3
  },
  "lawn": {
    dict: "anew", word: "lawn", stem: "lawn",
    avg: [ 4, 5.24 ], std: [ 1.79, 0.86 ], fq: 15
  },
  "lawsuit": {
    dict: "anew", word: "lawsuit", stem: "lawsuit",
    avg: [ 4.93, 3.37 ], std: [ 2.44, 2 ], fq: 1
  },
  "lazy": {
    dict: "anew", word: "lazy", stem: "lazi",
    avg: [ 2.65, 4.38 ], std: [ 2.06, 2.02 ], fq: 9
  },
  "leader": {
    dict: "anew", word: "leader", stem: "leader",
    avg: [ 6.27, 7.63 ], std: [ 2.18, 1.59 ], fq: 74
  },
  "learn": {
    dict: "anew", word: "learn", stem: "learn",
    avg: [ 5.39, 7.15 ], std: [ 2.22, 1.49 ], fq: 84
  },
  "legend": {
    dict: "anew", word: "legend", stem: "legend",
    avg: [ 4.88, 6.39 ], std: [ 1.76, 1.34 ], fq: 26
  },
  "leisurely": {
    dict: "anew", word: "leisurely", stem: "leisur",
    avg: [ 3.8, 6.88 ], std: [ 2.38, 1.81 ], fq: 5
  },
  "leprosy": {
    dict: "anew", word: "leprosy", stem: "leprosi",
    avg: [ 6.29, 2.09 ], std: [ 2.23, 1.4 ], fq: 1
  },
  "lesbian": {
    dict: "anew", word: "lesbian", stem: "lesbian",
    avg: [ 5.12, 4.67 ], std: [ 2.27, 2.45 ], fq: 0
  },
  "letter": {
    dict: "anew", word: "letter", stem: "letter",
    avg: [ 4.9, 6.61 ], std: [ 2.37, 1.59 ], fq: 145
  },
  "liberty": {
    dict: "anew", word: "liberty", stem: "liberti",
    avg: [ 5.6, 7.98 ], std: [ 2.65, 1.22 ], fq: 46
  },
  "lice": {
    dict: "anew", word: "lice", stem: "lice",
    avg: [ 5, 2.31 ], std: [ 2.26, 1.78 ], fq: 2
  },
  "lie": {
    dict: "anew", word: "lie", stem: "lie",
    avg: [ 5.96, 2.79 ], std: [ 2.63, 1.92 ], fq: 59
  },
  "life": {
    dict: "anew", word: "life", stem: "life",
    avg: [ 6.02, 7.27 ], std: [ 2.62, 1.88 ], fq: 715
  },
  "lightbulb": {
    dict: "anew", word: "lightbulb", stem: "lightbulb",
    avg: [ 4.1, 5.61 ], std: [ 2.02, 1.28 ], fq: 0
  },
  "lighthouse": {
    dict: "anew", word: "lighthouse", stem: "lighthous",
    avg: [ 4.41, 5.89 ], std: [ 2.44, 2.08 ], fq: 0
  },
  "lightning": {
    dict: "anew", word: "lightning", stem: "lightn",
    avg: [ 6.61, 4.57 ], std: [ 1.77, 2.66 ], fq: 14
  },
  "limber": {
    dict: "anew", word: "limber", stem: "limber",
    avg: [ 4.57, 5.68 ], std: [ 2.26, 1.49 ], fq: 2
  },
  "lion": {
    dict: "anew", word: "lion", stem: "lion",
    avg: [ 6.2, 5.57 ], std: [ 2.16, 1.99 ], fq: 17
  },
  "listless": {
    dict: "anew", word: "listless", stem: "listless",
    avg: [ 4.1, 4.12 ], std: [ 2.31, 1.73 ], fq: 1
  },
  "lively": {
    dict: "anew", word: "lively", stem: "live",
    avg: [ 5.53, 7.2 ], std: [ 2.9, 1.97 ], fq: 26
  },
  "locker": {
    dict: "anew", word: "locker", stem: "locker",
    avg: [ 3.38, 5.19 ], std: [ 2.13, 1.31 ], fq: 9
  },
  "loneliness": {
    dict: "anew", word: "loneliness", stem: "loneli",
    avg: [ 4.56, 1.61 ], std: [ 2.97, 1.02 ], fq: 9
  },
  "lonely": {
    dict: "anew", word: "lonely", stem: "lone",
    avg: [ 4.51, 2.17 ], std: [ 2.68, 1.76 ], fq: 25
  },
  "loser": {
    dict: "anew", word: "loser", stem: "loser",
    avg: [ 4.95, 2.25 ], std: [ 2.57, 1.48 ], fq: 1
  },
  "lost": {
    dict: "anew", word: "lost", stem: "lost",
    avg: [ 5.82, 2.82 ], std: [ 2.62, 1.83 ], fq: 173
  },
  "lottery": {
    dict: "anew", word: "lottery", stem: "lotteri",
    avg: [ 5.36, 6.57 ], std: [ 2.45, 2.04 ], fq: 1
  },
  "louse": {
    dict: "anew", word: "louse", stem: "lous",
    avg: [ 4.98, 2.81 ], std: [ 2.03, 1.92 ], fq: 3
  },
  "love": {
    dict: "anew", word: "love", stem: "love",
    avg: [ 6.44, 8.72 ], std: [ 3.35, 0.7 ], fq: 232
  },
  "loved": {
    dict: "anew", word: "loved", stem: "love",
    avg: [ 6.38, 8.64 ], std: [ 2.68, 0.71 ], fq: 56
  },
  "loyal": {
    dict: "anew", word: "loyal", stem: "loyal",
    avg: [ 5.16, 7.55 ], std: [ 2.42, 1.9 ], fq: 18
  },
  "lucky": {
    dict: "anew", word: "lucky", stem: "lucki",
    avg: [ 6.53, 8.17 ], std: [ 2.34, 1.06 ], fq: 21
  },
  "lump": {
    dict: "anew", word: "lump", stem: "lump",
    avg: [ 4.8, 4.16 ], std: [ 2.82, 2.34 ], fq: 7
  },
  "luscious": {
    dict: "anew", word: "luscious", stem: "luscious",
    avg: [ 5.34, 7.5 ], std: [ 2.51, 1.08 ], fq: 2
  },
  "lust": {
    dict: "anew", word: "lust", stem: "lust",
    avg: [ 6.88, 7.12 ], std: [ 1.85, 1.62 ], fq: 5
  },
  "luxury": {
    dict: "anew", word: "luxury", stem: "luxuri",
    avg: [ 4.75, 7.88 ], std: [ 2.91, 1.49 ], fq: 21
  },
  "machine": {
    dict: "anew", word: "machine", stem: "machin",
    avg: [ 3.82, 5.09 ], std: [ 2.4, 1.67 ], fq: 103
  },
  "mad": {
    dict: "anew", word: "mad", stem: "mad",
    avg: [ 6.76, 2.44 ], std: [ 2.26, 1.72 ], fq: 39
  },
  "madman": {
    dict: "anew", word: "madman", stem: "madman",
    avg: [ 5.56, 3.91 ], std: [ 2.78, 2.49 ], fq: 2
  },
  "maggot": {
    dict: "anew", word: "maggot", stem: "maggot",
    avg: [ 5.28, 2.06 ], std: [ 2.96, 1.47 ], fq: 2
  },
  "magical": {
    dict: "anew", word: "magical", stem: "magic",
    avg: [ 5.95, 7.46 ], std: [ 2.36, 1.64 ], fq: 12
  },
  "mail": {
    dict: "anew", word: "mail", stem: "mail",
    avg: [ 5.63, 6.88 ], std: [ 2.36, 1.74 ], fq: 47
  },
  "malaria": {
    dict: "anew", word: "malaria", stem: "malaria",
    avg: [ 4.4, 2.4 ], std: [ 2.54, 1.38 ], fq: 3
  },
  "malice": {
    dict: "anew", word: "malice", stem: "malic",
    avg: [ 5.86, 2.69 ], std: [ 2.75, 1.84 ], fq: 2
  },
  "man": {
    dict: "anew", word: "man", stem: "man",
    avg: [ 5.24, 6.73 ], std: [ 2.31, 1.7 ], fq: 1207
  },
  "mangle": {
    dict: "anew", word: "mangle", stem: "mangl",
    avg: [ 5.44, 3.9 ], std: [ 2.1, 2.01 ], fq: 0
  },
  "maniac": {
    dict: "anew", word: "maniac", stem: "maniac",
    avg: [ 5.39, 3.76 ], std: [ 2.46, 2 ], fq: 4
  },
  "manner": {
    dict: "anew", word: "manner", stem: "manner",
    avg: [ 4.56, 5.64 ], std: [ 1.78, 1.34 ], fq: 124
  },
  "mantel": {
    dict: "anew", word: "mantel", stem: "mantel",
    avg: [ 3.27, 4.93 ], std: [ 2.23, 1.4 ], fq: 3
  },
  "manure": {
    dict: "anew", word: "manure", stem: "manur",
    avg: [ 4.17, 3.1 ], std: [ 2.09, 1.74 ], fq: 6
  },
  "market": {
    dict: "anew", word: "market", stem: "market",
    avg: [ 4.12, 5.66 ], std: [ 1.83, 1.02 ], fq: 155
  },
  "massacre": {
    dict: "anew", word: "massacre", stem: "massacr",
    avg: [ 5.33, 2.28 ], std: [ 2.63, 1.74 ], fq: 1
  },
  "masterful": {
    dict: "anew", word: "masterful", stem: "master",
    avg: [ 5.2, 7.09 ], std: [ 2.85, 1.78 ], fq: 2
  },
  "masturbate": {
    dict: "anew", word: "masturbate", stem: "masturb",
    avg: [ 5.67, 5.45 ], std: [ 2.18, 2.02 ], fq: 0
  },
  "material": {
    dict: "anew", word: "material", stem: "materi",
    avg: [ 4.05, 5.26 ], std: [ 2.34, 1.29 ], fq: 174
  },
  "measles": {
    dict: "anew", word: "measles", stem: "measl",
    avg: [ 5.06, 2.74 ], std: [ 2.44, 1.97 ], fq: 2
  },
  "medicine": {
    dict: "anew", word: "medicine", stem: "medicin",
    avg: [ 4.4, 5.67 ], std: [ 2.36, 2.06 ], fq: 30
  },
  "meek": {
    dict: "anew", word: "meek", stem: "meek",
    avg: [ 3.8, 3.87 ], std: [ 2.13, 1.69 ], fq: 10
  },
  "melody": {
    dict: "anew", word: "melody", stem: "melodi",
    avg: [ 4.98, 7.07 ], std: [ 2.52, 1.79 ], fq: 21
  },
  "memories": {
    dict: "anew", word: "memories", stem: "memori",
    avg: [ 6.1, 7.48 ], std: [ 2.1, 1.61 ], fq: 15
  },
  "memory": {
    dict: "anew", word: "memory", stem: "memori",
    avg: [ 5.42, 6.62 ], std: [ 2.25, 1.5 ], fq: 76
  },
  "menace": {
    dict: "anew", word: "menace", stem: "menac",
    avg: [ 5.52, 2.88 ], std: [ 2.45, 1.64 ], fq: 9
  },
  "merry": {
    dict: "anew", word: "merry", stem: "merri",
    avg: [ 5.9, 7.9 ], std: [ 2.42, 1.49 ], fq: 8
  },
  "messy": {
    dict: "anew", word: "messy", stem: "messi",
    avg: [ 3.34, 3.15 ], std: [ 2.37, 1.73 ], fq: 3
  },
  "metal": {
    dict: "anew", word: "metal", stem: "metal",
    avg: [ 3.79, 4.95 ], std: [ 1.96, 1.17 ], fq: 61
  },
  "method": {
    dict: "anew", word: "method", stem: "method",
    avg: [ 3.85, 5.56 ], std: [ 2.58, 1.76 ], fq: 142
  },
  "mighty": {
    dict: "anew", word: "mighty", stem: "mighti",
    avg: [ 5.61, 6.54 ], std: [ 2.38, 2.19 ], fq: 29
  },
  "mildew": {
    dict: "anew", word: "mildew", stem: "mildew",
    avg: [ 4.08, 3.17 ], std: [ 1.79, 1.36 ], fq: 1
  },
  "milk": {
    dict: "anew", word: "milk", stem: "milk",
    avg: [ 3.68, 5.95 ], std: [ 2.57, 2.16 ], fq: 49
  },
  "millionaire": {
    dict: "anew", word: "millionaire", stem: "millionair",
    avg: [ 6.14, 8.03 ], std: [ 2.7, 1.42 ], fq: 2
  },
  "mind": {
    dict: "anew", word: "mind", stem: "mind",
    avg: [ 5, 6.68 ], std: [ 2.68, 1.84 ], fq: 325
  },
  "miracle": {
    dict: "anew", word: "miracle", stem: "miracl",
    avg: [ 7.65, 8.6 ], std: [ 1.67, 0.71 ], fq: 16
  },
  "mischief": {
    dict: "anew", word: "mischief", stem: "mischief",
    avg: [ 5.76, 5.57 ], std: [ 1.95, 2.05 ], fq: 5
  },
  "misery": {
    dict: "anew", word: "misery", stem: "miseri",
    avg: [ 5.17, 1.93 ], std: [ 2.69, 1.6 ], fq: 15
  },
  "mistake": {
    dict: "anew", word: "mistake", stem: "mistak",
    avg: [ 5.18, 2.86 ], std: [ 2.42, 1.79 ], fq: 34
  },
  "mobility": {
    dict: "anew", word: "mobility", stem: "mobil",
    avg: [ 5, 6.83 ], std: [ 2.18, 1.79 ], fq: 8
  },
  "modest": {
    dict: "anew", word: "modest", stem: "modest",
    avg: [ 3.98, 5.76 ], std: [ 2.24, 1.28 ], fq: 29
  },
  "mold": {
    dict: "anew", word: "mold", stem: "mold",
    avg: [ 4.07, 3.55 ], std: [ 1.98, 1.7 ], fq: 45
  },
  "moment": {
    dict: "anew", word: "moment", stem: "moment",
    avg: [ 3.83, 5.76 ], std: [ 2.29, 1.65 ], fq: 246
  },
  "money": {
    dict: "anew", word: "money", stem: "money",
    avg: [ 5.7, 7.59 ], std: [ 2.66, 1.4 ], fq: 265
  },
  "month": {
    dict: "anew", word: "month", stem: "month",
    avg: [ 4.03, 5.15 ], std: [ 1.77, 1.09 ], fq: 130
  },
  "moody": {
    dict: "anew", word: "moody", stem: "moodi",
    avg: [ 4.18, 3.2 ], std: [ 2.38, 1.58 ], fq: 5
  },
  "moral": {
    dict: "anew", word: "moral", stem: "moral",
    avg: [ 4.49, 6.2 ], std: [ 2.28, 1.85 ], fq: 142
  },
  "morbid": {
    dict: "anew", word: "morbid", stem: "morbid",
    avg: [ 5.06, 2.87 ], std: [ 2.68, 2.14 ], fq: 1
  },
  "morgue": {
    dict: "anew", word: "morgue", stem: "morgu",
    avg: [ 4.84, 1.92 ], std: [ 2.96, 1.32 ], fq: 1
  },
  "mosquito": {
    dict: "anew", word: "mosquito", stem: "mosquito",
    avg: [ 4.78, 2.8 ], std: [ 2.72, 1.91 ], fq: 1
  },
  "mother": {
    dict: "anew", word: "mother", stem: "mother",
    avg: [ 6.13, 8.39 ], std: [ 2.71, 1.15 ], fq: 216
  },
  "mountain": {
    dict: "anew", word: "mountain", stem: "mountain",
    avg: [ 5.49, 6.59 ], std: [ 2.43, 1.66 ], fq: 33
  },
  "movie": {
    dict: "anew", word: "movie", stem: "movi",
    avg: [ 4.93, 6.86 ], std: [ 2.54, 1.81 ], fq: 29
  },
  "mucus": {
    dict: "anew", word: "mucus", stem: "mucus",
    avg: [ 3.41, 3.34 ], std: [ 2.17, 2.29 ], fq: 2
  },
  "muddy": {
    dict: "anew", word: "muddy", stem: "muddi",
    avg: [ 4.13, 4.44 ], std: [ 2.13, 2.07 ], fq: 10
  },
  "muffin": {
    dict: "anew", word: "muffin", stem: "muffin",
    avg: [ 4.76, 6.57 ], std: [ 2.42, 2.04 ], fq: 0
  },
  "murderer": {
    dict: "anew", word: "murderer", stem: "murder",
    avg: [ 7.47, 1.53 ], std: [ 2.18, 0.96 ], fq: 19
  },
  "muscular": {
    dict: "anew", word: "muscular", stem: "muscular",
    avg: [ 5.47, 6.82 ], std: [ 2.2, 1.63 ], fq: 16
  },
  "museum": {
    dict: "anew", word: "museum", stem: "museum",
    avg: [ 3.6, 5.54 ], std: [ 2.13, 1.86 ], fq: 32
  },
  "mushroom": {
    dict: "anew", word: "mushroom", stem: "mushroom",
    avg: [ 4.72, 5.78 ], std: [ 2.33, 2.22 ], fq: 2
  },
  "music": {
    dict: "anew", word: "music", stem: "music",
    avg: [ 5.32, 8.13 ], std: [ 3.19, 1.09 ], fq: 216
  },
  "mutation": {
    dict: "anew", word: "mutation", stem: "mutat",
    avg: [ 4.84, 3.91 ], std: [ 2.52, 2.44 ], fq: 0
  },
  "mutilate": {
    dict: "anew", word: "mutilate", stem: "mutil",
    avg: [ 6.41, 1.82 ], std: [ 2.94, 1.45 ], fq: 3
  },
  "mystic": {
    dict: "anew", word: "mystic", stem: "mystic",
    avg: [ 4.84, 6 ], std: [ 2.57, 2.21 ], fq: 3
  },
  "naked": {
    dict: "anew", word: "naked", stem: "nake",
    avg: [ 5.8, 6.34 ], std: [ 2.8, 2.42 ], fq: 32
  },
  "name": {
    dict: "anew", word: "name", stem: "name",
    avg: [ 4.25, 5.55 ], std: [ 2.47, 2.24 ], fq: 294
  },
  "narcotic": {
    dict: "anew", word: "narcotic", stem: "narcot",
    avg: [ 4.93, 4.29 ], std: [ 2.57, 2.3 ], fq: 2
  },
  "nasty": {
    dict: "anew", word: "nasty", stem: "nasti",
    avg: [ 4.89, 3.58 ], std: [ 2.5, 2.38 ], fq: 5
  },
  "natural": {
    dict: "anew", word: "natural", stem: "natur",
    avg: [ 4.09, 6.59 ], std: [ 2.37, 1.57 ], fq: 156
  },
  "nature": {
    dict: "anew", word: "nature", stem: "natur",
    avg: [ 4.37, 7.65 ], std: [ 2.51, 1.37 ], fq: 191
  },
  "nectar": {
    dict: "anew", word: "nectar", stem: "nectar",
    avg: [ 3.89, 6.9 ], std: [ 2.48, 1.53 ], fq: 3
  },
  "needle": {
    dict: "anew", word: "needle", stem: "needl",
    avg: [ 5.36, 3.82 ], std: [ 2.89, 1.73 ], fq: 15
  },
  "neglect": {
    dict: "anew", word: "neglect", stem: "neglect",
    avg: [ 4.83, 2.63 ], std: [ 2.31, 1.64 ], fq: 12
  },
  "nervous": {
    dict: "anew", word: "nervous", stem: "nervous",
    avg: [ 6.59, 3.29 ], std: [ 2.07, 1.47 ], fq: 24
  },
  "neurotic": {
    dict: "anew", word: "neurotic", stem: "neurot",
    avg: [ 5.13, 4.45 ], std: [ 2.76, 2.23 ], fq: 10
  },
  "news": {
    dict: "anew", word: "news", stem: "news",
    avg: [ 5.17, 5.3 ], std: [ 2.11, 1.67 ], fq: 102
  },
  "nice": {
    dict: "anew", word: "nice", stem: "nice",
    avg: [ 4.38, 6.55 ], std: [ 2.69, 2.44 ], fq: 75
  },
  "nightmare": {
    dict: "anew", word: "nightmare", stem: "nightmar",
    avg: [ 7.59, 1.91 ], std: [ 2.23, 1.54 ], fq: 9
  },
  "nipple": {
    dict: "anew", word: "nipple", stem: "nippl",
    avg: [ 5.56, 6.27 ], std: [ 2.55, 1.81 ], fq: 0
  },
  "noisy": {
    dict: "anew", word: "noisy", stem: "noisi",
    avg: [ 6.38, 5.02 ], std: [ 1.78, 2.02 ], fq: 6
  },
  "nonchalant": {
    dict: "anew", word: "nonchalant", stem: "nonchal",
    avg: [ 3.12, 4.74 ], std: [ 1.93, 1.11 ], fq: 1
  },
  "nonsense": {
    dict: "anew", word: "nonsense", stem: "nonsens",
    avg: [ 4.17, 4.61 ], std: [ 2.02, 1.63 ], fq: 13
  },
  "noose": {
    dict: "anew", word: "noose", stem: "noos",
    avg: [ 4.39, 3.76 ], std: [ 2.08, 1.64 ], fq: 3
  },
  "nourish": {
    dict: "anew", word: "nourish", stem: "nourish",
    avg: [ 4.29, 6.46 ], std: [ 2.51, 1.69 ], fq: 0
  },
  "nude": {
    dict: "anew", word: "nude", stem: "nude",
    avg: [ 6.41, 6.82 ], std: [ 2.09, 1.63 ], fq: 20
  },
  "nuisance": {
    dict: "anew", word: "nuisance", stem: "nuisanc",
    avg: [ 4.49, 3.27 ], std: [ 2.69, 1.86 ], fq: 5
  },
  "nun": {
    dict: "anew", word: "nun", stem: "nun",
    avg: [ 2.93, 4.93 ], std: [ 1.8, 1.89 ], fq: 2
  },
  "nurse": {
    dict: "anew", word: "nurse", stem: "nurs",
    avg: [ 4.84, 6.08 ], std: [ 2.04, 2.08 ], fq: 17
  },
  "nursery": {
    dict: "anew", word: "nursery", stem: "nurseri",
    avg: [ 4.04, 5.73 ], std: [ 2.74, 2.3 ], fq: 13
  },
  "obesity": {
    dict: "anew", word: "obesity", stem: "obes",
    avg: [ 3.87, 2.73 ], std: [ 2.82, 1.85 ], fq: 5
  },
  "obey": {
    dict: "anew", word: "obey", stem: "obey",
    avg: [ 4.23, 4.52 ], std: [ 1.72, 1.88 ], fq: 8
  },
  "obnoxious": {
    dict: "anew", word: "obnoxious", stem: "obnoxi",
    avg: [ 4.74, 3.5 ], std: [ 2.42, 2.18 ], fq: 5
  },
  "obscene": {
    dict: "anew", word: "obscene", stem: "obscen",
    avg: [ 5.04, 4.23 ], std: [ 2.3, 2.3 ], fq: 2
  },
  "obsession": {
    dict: "anew", word: "obsession", stem: "obsess",
    avg: [ 6.41, 4.52 ], std: [ 2.13, 2.13 ], fq: 5
  },
  "ocean": {
    dict: "anew", word: "ocean", stem: "ocean",
    avg: [ 4.95, 7.12 ], std: [ 2.79, 1.72 ], fq: 34
  },
  "odd": {
    dict: "anew", word: "odd", stem: "odd",
    avg: [ 4.27, 4.82 ], std: [ 2.46, 2.04 ], fq: 44
  },
  "offend": {
    dict: "anew", word: "offend", stem: "offend",
    avg: [ 5.56, 2.76 ], std: [ 2.06, 1.5 ], fq: 4
  },
  "office": {
    dict: "anew", word: "office", stem: "offic",
    avg: [ 4.08, 5.24 ], std: [ 1.92, 1.59 ], fq: 255
  },
  "opinion": {
    dict: "anew", word: "opinion", stem: "opinion",
    avg: [ 4.89, 6.28 ], std: [ 2.46, 1.45 ], fq: 96
  },
  "optimism": {
    dict: "anew", word: "optimism", stem: "optim",
    avg: [ 5.34, 6.95 ], std: [ 2.58, 2.24 ], fq: 15
  },
  "option": {
    dict: "anew", word: "option", stem: "option",
    avg: [ 4.74, 6.49 ], std: [ 2.23, 1.31 ], fq: 5
  },
  "orchestra": {
    dict: "anew", word: "orchestra", stem: "orchestra",
    avg: [ 3.52, 6.02 ], std: [ 2.29, 1.89 ], fq: 60
  },
  "orgasm": {
    dict: "anew", word: "orgasm", stem: "orgasm",
    avg: [ 8.1, 8.32 ], std: [ 1.45, 1.31 ], fq: 7
  },
  "outdoors": {
    dict: "anew", word: "outdoors", stem: "outdoor",
    avg: [ 5.92, 7.47 ], std: [ 2.55, 1.8 ], fq: 6
  },
  "outrage": {
    dict: "anew", word: "outrage", stem: "outrag",
    avg: [ 6.83, 3.52 ], std: [ 2.26, 2.12 ], fq: 4
  },
  "outstanding": {
    dict: "anew", word: "outstanding", stem: "outstand",
    avg: [ 6.24, 7.75 ], std: [ 2.59, 1.75 ], fq: 37
  },
  "overcast": {
    dict: "anew", word: "overcast", stem: "overcast",
    avg: [ 3.46, 3.65 ], std: [ 1.92, 1.61 ], fq: 9
  },
  "overwhelmed": {
    dict: "anew", word: "overwhelmed", stem: "overwhelm",
    avg: [ 7, 4.19 ], std: [ 2.37, 2.61 ], fq: 4
  },
  "owl": {
    dict: "anew", word: "owl", stem: "owl",
    avg: [ 3.98, 5.8 ], std: [ 1.87, 1.31 ], fq: 2
  },
  "pain": {
    dict: "anew", word: "pain", stem: "pain",
    avg: [ 6.5, 2.13 ], std: [ 2.49, 1.81 ], fq: 88
  },
  "paint": {
    dict: "anew", word: "paint", stem: "paint",
    avg: [ 4.1, 5.62 ], std: [ 2.36, 1.72 ], fq: 37
  },
  "palace": {
    dict: "anew", word: "palace", stem: "palac",
    avg: [ 5.1, 7.19 ], std: [ 2.75, 1.78 ], fq: 38
  },
  "pamphlet": {
    dict: "anew", word: "pamphlet", stem: "pamphlet",
    avg: [ 3.62, 4.79 ], std: [ 2.02, 1.05 ], fq: 3
  },
  "pancakes": {
    dict: "anew", word: "pancakes", stem: "pancak",
    avg: [ 4.06, 6.08 ], std: [ 2.13, 1.83 ], fq: 0
  },
  "panic": {
    dict: "anew", word: "panic", stem: "panic",
    avg: [ 7.02, 3.12 ], std: [ 2.02, 1.84 ], fq: 22
  },
  "paper": {
    dict: "anew", word: "paper", stem: "paper",
    avg: [ 2.5, 5.2 ], std: [ 1.85, 1.21 ], fq: 157
  },
  "paradise": {
    dict: "anew", word: "paradise", stem: "paradis",
    avg: [ 5.12, 8.72 ], std: [ 3.38, 0.6 ], fq: 12
  },
  "paralysis": {
    dict: "anew", word: "paralysis", stem: "paralysi",
    avg: [ 4.73, 1.98 ], std: [ 2.83, 1.44 ], fq: 6
  },
  "part": {
    dict: "anew", word: "part", stem: "part",
    avg: [ 3.82, 5.11 ], std: [ 2.24, 1.78 ], fq: 500
  },
  "party": {
    dict: "anew", word: "party", stem: "parti",
    avg: [ 6.69, 7.86 ], std: [ 2.84, 1.83 ], fq: 216
  },
  "passage": {
    dict: "anew", word: "passage", stem: "passag",
    avg: [ 4.36, 5.28 ], std: [ 2.13, 1.44 ], fq: 49
  },
  "passion": {
    dict: "anew", word: "passion", stem: "passion",
    avg: [ 7.26, 8.03 ], std: [ 2.57, 1.27 ], fq: 28
  },
  "pasta": {
    dict: "anew", word: "pasta", stem: "pasta",
    avg: [ 4.94, 6.69 ], std: [ 2.04, 1.64 ], fq: 0
  },
  "patent": {
    dict: "anew", word: "patent", stem: "patent",
    avg: [ 3.5, 5.29 ], std: [ 1.84, 1.08 ], fq: 35
  },
  "patient": {
    dict: "anew", word: "patient", stem: "patient",
    avg: [ 4.21, 5.29 ], std: [ 2.37, 1.89 ], fq: 86
  },
  "patriot": {
    dict: "anew", word: "patriot", stem: "patriot",
    avg: [ 5.17, 6.71 ], std: [ 2.53, 1.69 ], fq: 10
  },
  "peace": {
    dict: "anew", word: "peace", stem: "peac",
    avg: [ 2.95, 7.72 ], std: [ 2.55, 1.75 ], fq: 198
  },
  "penalty": {
    dict: "anew", word: "penalty", stem: "penalti",
    avg: [ 5.1, 2.83 ], std: [ 2.31, 1.56 ], fq: 14
  },
  "pencil": {
    dict: "anew", word: "pencil", stem: "pencil",
    avg: [ 3.14, 5.22 ], std: [ 1.9, 0.68 ], fq: 34
  },
  "penis": {
    dict: "anew", word: "penis", stem: "peni",
    avg: [ 5.54, 5.9 ], std: [ 2.63, 1.72 ], fq: 0
  },
  "penthouse": {
    dict: "anew", word: "penthouse", stem: "penthous",
    avg: [ 5.52, 6.81 ], std: [ 2.49, 1.64 ], fq: 1
  },
  "people": {
    dict: "anew", word: "people", stem: "peopl",
    avg: [ 5.94, 7.33 ], std: [ 2.09, 1.7 ], fq: 847
  },
  "perfection": {
    dict: "anew", word: "perfection", stem: "perfect",
    avg: [ 5.95, 7.25 ], std: [ 2.73, 2.05 ], fq: 11
  },
  "perfume": {
    dict: "anew", word: "perfume", stem: "perfum",
    avg: [ 5.05, 6.76 ], std: [ 2.36, 1.48 ], fq: 10
  },
  "person": {
    dict: "anew", word: "person", stem: "person",
    avg: [ 4.19, 6.32 ], std: [ 2.45, 1.74 ], fq: 175
  },
  "pervert": {
    dict: "anew", word: "pervert", stem: "pervert",
    avg: [ 6.26, 2.79 ], std: [ 2.61, 2.12 ], fq: 1
  },
  "pest": {
    dict: "anew", word: "pest", stem: "pest",
    avg: [ 5.62, 3.13 ], std: [ 2.15, 1.82 ], fq: 4
  },
  "pet": {
    dict: "anew", word: "pet", stem: "pet",
    avg: [ 5.1, 6.79 ], std: [ 2.59, 2.32 ], fq: 8
  },
  "phase": {
    dict: "anew", word: "phase", stem: "phase",
    avg: [ 3.98, 5.17 ], std: [ 1.82, 0.79 ], fq: 72
  },
  "pie": {
    dict: "anew", word: "pie", stem: "pie",
    avg: [ 4.2, 6.41 ], std: [ 2.4, 1.89 ], fq: 14
  },
  "pig": {
    dict: "anew", word: "pig", stem: "pig",
    avg: [ 4.2, 5.07 ], std: [ 2.42, 1.97 ], fq: 8
  },
  "pillow": {
    dict: "anew", word: "pillow", stem: "pillow",
    avg: [ 2.97, 7.92 ], std: [ 2.52, 1.4 ], fq: 8
  },
  "pinch": {
    dict: "anew", word: "pinch", stem: "pinch",
    avg: [ 4.59, 3.83 ], std: [ 2.1, 1.7 ], fq: 6
  },
  "pistol": {
    dict: "anew", word: "pistol", stem: "pistol",
    avg: [ 6.15, 4.2 ], std: [ 2.19, 2.58 ], fq: 27
  },
  "pity": {
    dict: "anew", word: "pity", stem: "piti",
    avg: [ 3.72, 3.37 ], std: [ 2.02, 1.57 ], fq: 14
  },
  "pizza": {
    dict: "anew", word: "pizza", stem: "pizza",
    avg: [ 5.24, 6.65 ], std: [ 2.09, 2.23 ], fq: 3
  },
  "plain": {
    dict: "anew", word: "plain", stem: "plain",
    avg: [ 3.52, 4.39 ], std: [ 2.05, 1.46 ], fq: 48
  },
  "plane": {
    dict: "anew", word: "plane", stem: "plane",
    avg: [ 6.14, 6.43 ], std: [ 2.39, 1.98 ], fq: 114
  },
  "plant": {
    dict: "anew", word: "plant", stem: "plant",
    avg: [ 3.62, 5.98 ], std: [ 2.25, 1.83 ], fq: 125
  },
  "pleasure": {
    dict: "anew", word: "pleasure", stem: "pleasur",
    avg: [ 5.74, 8.28 ], std: [ 2.81, 0.92 ], fq: 62
  },
  "poetry": {
    dict: "anew", word: "poetry", stem: "poetri",
    avg: [ 4, 5.86 ], std: [ 2.85, 1.91 ], fq: 88
  },
  "poison": {
    dict: "anew", word: "poison", stem: "poison",
    avg: [ 6.05, 1.98 ], std: [ 2.82, 1.44 ], fq: 10
  },
  "politeness": {
    dict: "anew", word: "politeness", stem: "polit",
    avg: [ 3.74, 7.18 ], std: [ 2.37, 1.5 ], fq: 5
  },
  "pollute": {
    dict: "anew", word: "pollute", stem: "pollut",
    avg: [ 6.08, 1.85 ], std: [ 2.42, 1.11 ], fq: 1
  },
  "poster": {
    dict: "anew", word: "poster", stem: "poster",
    avg: [ 3.93, 5.34 ], std: [ 2.56, 1.75 ], fq: 4
  },
  "poverty": {
    dict: "anew", word: "poverty", stem: "poverti",
    avg: [ 4.87, 1.67 ], std: [ 2.66, 0.9 ], fq: 20
  },
  "power": {
    dict: "anew", word: "power", stem: "power",
    avg: [ 6.67, 6.54 ], std: [ 1.87, 2.21 ], fq: 342
  },
  "powerful": {
    dict: "anew", word: "powerful", stem: "power",
    avg: [ 5.83, 6.84 ], std: [ 2.69, 1.8 ], fq: 63
  },
  "prairie": {
    dict: "anew", word: "prairie", stem: "prairi",
    avg: [ 3.41, 5.75 ], std: [ 2.17, 1.43 ], fq: 21
  },
  "present": {
    dict: "anew", word: "present", stem: "present",
    avg: [ 5.12, 6.95 ], std: [ 2.39, 1.85 ], fq: 377
  },
  "pressure": {
    dict: "anew", word: "pressure", stem: "pressur",
    avg: [ 6.07, 3.38 ], std: [ 2.26, 1.61 ], fq: 185
  },
  "prestige": {
    dict: "anew", word: "prestige", stem: "prestig",
    avg: [ 5.86, 7.26 ], std: [ 2.08, 1.9 ], fq: 29
  },
  "pretty": {
    dict: "anew", word: "pretty", stem: "pretti",
    avg: [ 6.03, 7.75 ], std: [ 2.22, 1.26 ], fq: 107
  },
  "prick": {
    dict: "anew", word: "prick", stem: "prick",
    avg: [ 4.7, 3.98 ], std: [ 2.59, 1.73 ], fq: 2
  },
  "pride": {
    dict: "anew", word: "pride", stem: "pride",
    avg: [ 5.83, 7 ], std: [ 2.48, 2.11 ], fq: 42
  },
  "priest": {
    dict: "anew", word: "priest", stem: "priest",
    avg: [ 4.41, 6.42 ], std: [ 2.71, 2 ], fq: 16
  },
  "prison": {
    dict: "anew", word: "prison", stem: "prison",
    avg: [ 5.7, 2.05 ], std: [ 2.56, 1.34 ], fq: 42
  },
  "privacy": {
    dict: "anew", word: "privacy", stem: "privaci",
    avg: [ 4.12, 5.88 ], std: [ 1.83, 1.5 ], fq: 12
  },
  "profit": {
    dict: "anew", word: "profit", stem: "profit",
    avg: [ 6.68, 7.63 ], std: [ 1.78, 1.3 ], fq: 28
  },
  "progress": {
    dict: "anew", word: "progress", stem: "progress",
    avg: [ 6.02, 7.73 ], std: [ 2.58, 1.34 ], fq: 120
  },
  "promotion": {
    dict: "anew", word: "promotion", stem: "promot",
    avg: [ 6.44, 8.2 ], std: [ 2.58, 1.15 ], fq: 26
  },
  "protected": {
    dict: "anew", word: "protected", stem: "protect",
    avg: [ 4.09, 7.29 ], std: [ 2.77, 1.79 ], fq: 31
  },
  "proud": {
    dict: "anew", word: "proud", stem: "proud",
    avg: [ 5.56, 8.03 ], std: [ 3.01, 1.56 ], fq: 50
  },
  "pungent": {
    dict: "anew", word: "pungent", stem: "pungent",
    avg: [ 4.24, 3.95 ], std: [ 2.17, 2.09 ], fq: 4
  },
  "punishment": {
    dict: "anew", word: "punishment", stem: "punish",
    avg: [ 5.93, 2.22 ], std: [ 2.4, 1.41 ], fq: 21
  },
  "puppy": {
    dict: "anew", word: "puppy", stem: "puppi",
    avg: [ 5.85, 7.56 ], std: [ 2.78, 1.9 ], fq: 2
  },
  "pus": {
    dict: "anew", word: "pus", stem: "pus",
    avg: [ 4.82, 2.86 ], std: [ 2.06, 1.91 ], fq: 0
  },
  "putrid": {
    dict: "anew", word: "putrid", stem: "putrid",
    avg: [ 5.74, 2.38 ], std: [ 2.26, 1.71 ], fq: 0
  },
  "python": {
    dict: "anew", word: "python", stem: "python",
    avg: [ 6.18, 4.05 ], std: [ 2.25, 2.48 ], fq: 14
  },
  "quality": {
    dict: "anew", word: "quality", stem: "qualiti",
    avg: [ 4.48, 6.25 ], std: [ 2.12, 1.59 ], fq: 114
  },
  "quarrel": {
    dict: "anew", word: "quarrel", stem: "quarrel",
    avg: [ 6.29, 2.93 ], std: [ 2.56, 2.06 ], fq: 20
  },
  "quart": {
    dict: "anew", word: "quart", stem: "quart",
    avg: [ 3.59, 5.39 ], std: [ 2.51, 2.01 ], fq: 3
  },
  "queen": {
    dict: "anew", word: "queen", stem: "queen",
    avg: [ 4.76, 6.44 ], std: [ 2.18, 1.43 ], fq: 41
  },
  "quick": {
    dict: "anew", word: "quick", stem: "quick",
    avg: [ 6.57, 6.64 ], std: [ 1.78, 1.61 ], fq: 68
  },
  "quiet": {
    dict: "anew", word: "quiet", stem: "quiet",
    avg: [ 2.82, 5.58 ], std: [ 2.13, 1.83 ], fq: 76
  },
  "rabbit": {
    dict: "anew", word: "rabbit", stem: "rabbit",
    avg: [ 4.02, 6.57 ], std: [ 2.19, 1.92 ], fq: 11
  },
  "rabies": {
    dict: "anew", word: "rabies", stem: "rabi",
    avg: [ 6.1, 1.77 ], std: [ 2.62, 0.97 ], fq: 1
  },
  "radiant": {
    dict: "anew", word: "radiant", stem: "radiant",
    avg: [ 5.39, 6.73 ], std: [ 2.82, 2.17 ], fq: 8
  },
  "radiator": {
    dict: "anew", word: "radiator", stem: "radiat",
    avg: [ 4.02, 4.67 ], std: [ 1.94, 1.05 ], fq: 4
  },
  "radio": {
    dict: "anew", word: "radio", stem: "radio",
    avg: [ 4.78, 6.73 ], std: [ 2.82, 1.47 ], fq: 120
  },
  "rage": {
    dict: "anew", word: "rage", stem: "rage",
    avg: [ 8.17, 2.41 ], std: [ 1.4, 1.86 ], fq: 16
  },
  "rain": {
    dict: "anew", word: "rain", stem: "rain",
    avg: [ 3.65, 5.08 ], std: [ 2.35, 2.51 ], fq: 70
  },
  "rainbow": {
    dict: "anew", word: "rainbow", stem: "rainbow",
    avg: [ 4.64, 8.14 ], std: [ 2.88, 1.23 ], fq: 4
  },
  "rancid": {
    dict: "anew", word: "rancid", stem: "rancid",
    avg: [ 5.04, 4.34 ], std: [ 2.27, 2.28 ], fq: 0
  },
  "rape": {
    dict: "anew", word: "rape", stem: "rape",
    avg: [ 6.81, 1.25 ], std: [ 3.17, 0.91 ], fq: 5
  },
  "rat": {
    dict: "anew", word: "rat", stem: "rat",
    avg: [ 4.95, 3.02 ], std: [ 2.36, 1.66 ], fq: 6
  },
  "rattle": {
    dict: "anew", word: "rattle", stem: "rattl",
    avg: [ 4.36, 5.03 ], std: [ 2.18, 1.23 ], fq: 5
  },
  "razor": {
    dict: "anew", word: "razor", stem: "razor",
    avg: [ 5.36, 4.81 ], std: [ 2.44, 2.16 ], fq: 15
  },
  "red": {
    dict: "anew", word: "red", stem: "red",
    avg: [ 5.29, 6.41 ], std: [ 2.04, 1.61 ], fq: 197
  },
  "refreshment": {
    dict: "anew", word: "refreshment", stem: "refresh",
    avg: [ 4.45, 7.44 ], std: [ 2.7, 1.29 ], fq: 2
  },
  "regretful": {
    dict: "anew", word: "regretful", stem: "regret",
    avg: [ 5.74, 2.28 ], std: [ 2.32, 1.42 ], fq: 1
  },
  "rejected": {
    dict: "anew", word: "rejected", stem: "reject",
    avg: [ 6.37, 1.5 ], std: [ 2.56, 1.09 ], fq: 33
  },
  "relaxed": {
    dict: "anew", word: "relaxed", stem: "relax",
    avg: [ 2.39, 7 ], std: [ 2.13, 1.77 ], fq: 14
  },
  "repentant": {
    dict: "anew", word: "repentant", stem: "repent",
    avg: [ 4.69, 5.53 ], std: [ 1.98, 1.86 ], fq: 1
  },
  "reptile": {
    dict: "anew", word: "reptile", stem: "reptil",
    avg: [ 5.18, 4.77 ], std: [ 2.19, 2 ], fq: 0
  },
  "rescue": {
    dict: "anew", word: "rescue", stem: "rescu",
    avg: [ 6.53, 7.7 ], std: [ 2.56, 1.24 ], fq: 15
  },
  "resent": {
    dict: "anew", word: "resent", stem: "resent",
    avg: [ 4.47, 3.76 ], std: [ 2.12, 1.9 ], fq: 8
  },
  "reserved": {
    dict: "anew", word: "reserved", stem: "reserv",
    avg: [ 3.27, 4.88 ], std: [ 2.05, 1.83 ], fq: 27
  },
  "respect": {
    dict: "anew", word: "respect", stem: "respect",
    avg: [ 5.19, 7.64 ], std: [ 2.39, 1.29 ], fq: 125
  },
  "respectful": {
    dict: "anew", word: "respectful", stem: "respect",
    avg: [ 4.6, 7.22 ], std: [ 2.67, 1.27 ], fq: 4
  },
  "restaurant": {
    dict: "anew", word: "restaurant", stem: "restaur",
    avg: [ 5.41, 6.76 ], std: [ 2.55, 1.85 ], fq: 41
  },
  "reunion": {
    dict: "anew", word: "reunion", stem: "reunion",
    avg: [ 6.34, 6.48 ], std: [ 2.35, 2.45 ], fq: 11
  },
  "reverent": {
    dict: "anew", word: "reverent", stem: "rever",
    avg: [ 4, 5.35 ], std: [ 1.6, 1.21 ], fq: 3
  },
  "revolt": {
    dict: "anew", word: "revolt", stem: "revolt",
    avg: [ 6.56, 4.13 ], std: [ 2.34, 1.78 ], fq: 8
  },
  "revolver": {
    dict: "anew", word: "revolver", stem: "revolv",
    avg: [ 5.55, 4.02 ], std: [ 2.39, 2.44 ], fq: 14
  },
  "reward": {
    dict: "anew", word: "reward", stem: "reward",
    avg: [ 4.95, 7.53 ], std: [ 2.62, 1.67 ], fq: 15
  },
  "riches": {
    dict: "anew", word: "riches", stem: "rich",
    avg: [ 6.17, 7.7 ], std: [ 2.7, 1.95 ], fq: 2
  },
  "ridicule": {
    dict: "anew", word: "ridicule", stem: "ridicul",
    avg: [ 5.83, 3.13 ], std: [ 2.73, 2.24 ], fq: 5
  },
  "rifle": {
    dict: "anew", word: "rifle", stem: "rifl",
    avg: [ 6.35, 4.02 ], std: [ 2.04, 2.76 ], fq: 63
  },
  "rigid": {
    dict: "anew", word: "rigid", stem: "rigid",
    avg: [ 4.66, 3.66 ], std: [ 2.47, 2.12 ], fq: 24
  },
  "riot": {
    dict: "anew", word: "riot", stem: "riot",
    avg: [ 6.39, 2.96 ], std: [ 2.63, 1.93 ], fq: 7
  },
  "river": {
    dict: "anew", word: "river", stem: "river",
    avg: [ 4.51, 6.85 ], std: [ 2.42, 1.69 ], fq: 165
  },
  "roach": {
    dict: "anew", word: "roach", stem: "roach",
    avg: [ 6.64, 2.35 ], std: [ 2.64, 1.7 ], fq: 2
  },
  "robber": {
    dict: "anew", word: "robber", stem: "robber",
    avg: [ 5.62, 2.61 ], std: [ 2.72, 1.69 ], fq: 2
  },
  "rock": {
    dict: "anew", word: "rock", stem: "rock",
    avg: [ 4.52, 5.56 ], std: [ 2.37, 1.38 ], fq: 75
  },
  "rollercoaster": {
    dict: "anew", word: "rollercoaster", stem: "rollercoast",
    avg: [ 8.06, 8.02 ], std: [ 1.71, 1.63 ], fq: 0
  },
  "romantic": {
    dict: "anew", word: "romantic", stem: "romant",
    avg: [ 7.59, 8.32 ], std: [ 2.07, 1 ], fq: 32
  },
  "rotten": {
    dict: "anew", word: "rotten", stem: "rotten",
    avg: [ 4.53, 2.26 ], std: [ 2.38, 1.37 ], fq: 2
  },
  "rough": {
    dict: "anew", word: "rough", stem: "rough",
    avg: [ 5.33, 4.74 ], std: [ 2.04, 2 ], fq: 41
  },
  "rude": {
    dict: "anew", word: "rude", stem: "rude",
    avg: [ 6.31, 2.5 ], std: [ 2.47, 2.11 ], fq: 6
  },
  "runner": {
    dict: "anew", word: "runner", stem: "runner",
    avg: [ 4.76, 5.67 ], std: [ 2.4, 1.91 ], fq: 1
  },
  "rusty": {
    dict: "anew", word: "rusty", stem: "rusti",
    avg: [ 3.77, 3.86 ], std: [ 2.16, 1.47 ], fq: 8
  },
  "sad": {
    dict: "anew", word: "sad", stem: "sad",
    avg: [ 4.13, 1.61 ], std: [ 2.38, 0.95 ], fq: 35
  },
  "safe": {
    dict: "anew", word: "safe", stem: "safe",
    avg: [ 3.86, 7.07 ], std: [ 2.72, 1.9 ], fq: 58
  },
  "sailboat": {
    dict: "anew", word: "sailboat", stem: "sailboat",
    avg: [ 4.88, 7.25 ], std: [ 2.73, 1.71 ], fq: 1
  },
  "saint": {
    dict: "anew", word: "saint", stem: "saint",
    avg: [ 4.49, 6.49 ], std: [ 1.9, 1.7 ], fq: 16
  },
  "salad": {
    dict: "anew", word: "salad", stem: "salad",
    avg: [ 3.81, 5.74 ], std: [ 2.29, 1.62 ], fq: 9
  },
  "salute": {
    dict: "anew", word: "salute", stem: "salut",
    avg: [ 5.31, 5.92 ], std: [ 2.23, 1.57 ], fq: 3
  },
  "sapphire": {
    dict: "anew", word: "sapphire", stem: "sapphir",
    avg: [ 5, 7 ], std: [ 2.72, 1.88 ], fq: 0
  },
  "satisfied": {
    dict: "anew", word: "satisfied", stem: "satisfi",
    avg: [ 4.94, 7.94 ], std: [ 2.63, 1.19 ], fq: 36
  },
  "save": {
    dict: "anew", word: "save", stem: "save",
    avg: [ 4.95, 6.45 ], std: [ 2.19, 1.93 ], fq: 62
  },
  "savior": {
    dict: "anew", word: "savior", stem: "savior",
    avg: [ 5.8, 7.73 ], std: [ 3.01, 1.56 ], fq: 6
  },
  "scalding": {
    dict: "anew", word: "scalding", stem: "scald",
    avg: [ 5.95, 2.82 ], std: [ 2.55, 2.12 ], fq: 1
  },
  "scandal": {
    dict: "anew", word: "scandal", stem: "scandal",
    avg: [ 5.12, 3.32 ], std: [ 2.22, 1.81 ], fq: 8
  },
  "scapegoat": {
    dict: "anew", word: "scapegoat", stem: "scapegoat",
    avg: [ 4.53, 3.67 ], std: [ 2.13, 1.65 ], fq: 1
  },
  "scar": {
    dict: "anew", word: "scar", stem: "scar",
    avg: [ 4.79, 3.38 ], std: [ 2.11, 1.7 ], fq: 10
  },
  "scared": {
    dict: "anew", word: "scared", stem: "scare",
    avg: [ 6.82, 2.78 ], std: [ 2.03, 1.99 ], fq: 21
  },
  "scholar": {
    dict: "anew", word: "scholar", stem: "scholar",
    avg: [ 5.12, 7.26 ], std: [ 2.46, 1.42 ], fq: 15
  },
  "scissors": {
    dict: "anew", word: "scissors", stem: "scissor",
    avg: [ 4.47, 5.05 ], std: [ 1.76, 0.96 ], fq: 1
  },
  "scorching": {
    dict: "anew", word: "scorching", stem: "scorch",
    avg: [ 5, 3.76 ], std: [ 2.74, 1.83 ], fq: 0
  },
  "scorn": {
    dict: "anew", word: "scorn", stem: "scorn",
    avg: [ 5.48, 2.84 ], std: [ 2.52, 2.07 ], fq: 4
  },
  "scornful": {
    dict: "anew", word: "scornful", stem: "scorn",
    avg: [ 5.04, 3.02 ], std: [ 2.56, 2.03 ], fq: 5
  },
  "scorpion": {
    dict: "anew", word: "scorpion", stem: "scorpion",
    avg: [ 5.38, 3.69 ], std: [ 3.08, 2.63 ], fq: 0
  },
  "scream": {
    dict: "anew", word: "scream", stem: "scream",
    avg: [ 7.04, 3.88 ], std: [ 1.96, 2.07 ], fq: 13
  },
  "scum": {
    dict: "anew", word: "scum", stem: "scum",
    avg: [ 4.88, 2.43 ], std: [ 2.36, 1.56 ], fq: 0
  },
  "scurvy": {
    dict: "anew", word: "scurvy", stem: "scurvi",
    avg: [ 4.71, 3.19 ], std: [ 2.72, 2 ], fq: 1
  },
  "seasick": {
    dict: "anew", word: "seasick", stem: "seasick",
    avg: [ 5.8, 2.05 ], std: [ 2.88, 1.2 ], fq: 0
  },
  "seat": {
    dict: "anew", word: "seat", stem: "seat",
    avg: [ 2.95, 4.95 ], std: [ 1.72, 0.98 ], fq: 54
  },
  "secure": {
    dict: "anew", word: "secure", stem: "secur",
    avg: [ 3.14, 7.57 ], std: [ 2.47, 1.76 ], fq: 30
  },
  "selfish": {
    dict: "anew", word: "selfish", stem: "selfish",
    avg: [ 5.5, 2.42 ], std: [ 2.62, 1.62 ], fq: 8
  },
  "sentiment": {
    dict: "anew", word: "sentiment", stem: "sentiment",
    avg: [ 4.41, 5.98 ], std: [ 2.3, 1.71 ], fq: 23
  },
  "serious": {
    dict: "anew", word: "serious", stem: "serious",
    avg: [ 4, 5.08 ], std: [ 1.87, 1.59 ], fq: 116
  },
  "severe": {
    dict: "anew", word: "severe", stem: "sever",
    avg: [ 5.26, 3.2 ], std: [ 2.36, 1.74 ], fq: 39
  },
  "sex": {
    dict: "anew", word: "sex", stem: "sex",
    avg: [ 7.36, 8.05 ], std: [ 1.91, 1.53 ], fq: 84
  },
  "sexy": {
    dict: "anew", word: "sexy", stem: "sexi",
    avg: [ 7.36, 8.02 ], std: [ 1.91, 1.12 ], fq: 2
  },
  "shadow": {
    dict: "anew", word: "shadow", stem: "shadow",
    avg: [ 4.3, 4.35 ], std: [ 2.26, 1.23 ], fq: 36
  },
  "shamed": {
    dict: "anew", word: "shamed", stem: "shame",
    avg: [ 4.88, 2.5 ], std: [ 2.27, 1.34 ], fq: 1
  },
  "shark": {
    dict: "anew", word: "shark", stem: "shark",
    avg: [ 7.16, 3.65 ], std: [ 1.96, 2.47 ], fq: 0
  },
  "sheltered": {
    dict: "anew", word: "sheltered", stem: "shelter",
    avg: [ 4.28, 5.75 ], std: [ 1.77, 1.92 ], fq: 4
  },
  "ship": {
    dict: "anew", word: "ship", stem: "ship",
    avg: [ 4.38, 5.55 ], std: [ 2.29, 1.4 ], fq: 83
  },
  "shotgun": {
    dict: "anew", word: "shotgun", stem: "shotgun",
    avg: [ 6.27, 4.37 ], std: [ 1.94, 2.75 ], fq: 8
  },
  "shriek": {
    dict: "anew", word: "shriek", stem: "shriek",
    avg: [ 5.36, 3.93 ], std: [ 2.91, 2.22 ], fq: 5
  },
  "shy": {
    dict: "anew", word: "shy", stem: "shi",
    avg: [ 3.77, 4.64 ], std: [ 2.29, 1.83 ], fq: 13
  },
  "sick": {
    dict: "anew", word: "sick", stem: "sick",
    avg: [ 4.29, 1.9 ], std: [ 2.45, 1.14 ], fq: 51
  },
  "sickness": {
    dict: "anew", word: "sickness", stem: "sick",
    avg: [ 5.61, 2.25 ], std: [ 2.67, 1.71 ], fq: 6
  },
  "silk": {
    dict: "anew", word: "silk", stem: "silk",
    avg: [ 3.71, 6.9 ], std: [ 2.51, 1.27 ], fq: 12
  },
  "silly": {
    dict: "anew", word: "silly", stem: "silli",
    avg: [ 5.88, 7.41 ], std: [ 2.38, 1.8 ], fq: 15
  },
  "sin": {
    dict: "anew", word: "sin", stem: "sin",
    avg: [ 5.78, 2.8 ], std: [ 2.21, 1.67 ], fq: 53
  },
  "sinful": {
    dict: "anew", word: "sinful", stem: "sin",
    avg: [ 6.29, 2.93 ], std: [ 2.43, 2.15 ], fq: 3
  },
  "sissy": {
    dict: "anew", word: "sissy", stem: "sissi",
    avg: [ 5.17, 3.14 ], std: [ 2.57, 1.96 ], fq: 0
  },
  "skeptical": {
    dict: "anew", word: "skeptical", stem: "skeptic",
    avg: [ 4.91, 4.52 ], std: [ 1.92, 1.63 ], fq: 7
  },
  "skijump": {
    dict: "anew", word: "skijump", stem: "skijump",
    avg: [ 7.06, 7.06 ], std: [ 2.1, 1.73 ], fq: 0
  },
  "skull": {
    dict: "anew", word: "skull", stem: "skull",
    avg: [ 4.75, 4.27 ], std: [ 1.85, 1.83 ], fq: 3
  },
  "sky": {
    dict: "anew", word: "sky", stem: "sky",
    avg: [ 4.27, 7.37 ], std: [ 2.17, 1.4 ], fq: 58
  },
  "skyscraper": {
    dict: "anew", word: "skyscraper", stem: "skyscrap",
    avg: [ 5.71, 5.88 ], std: [ 2.17, 1.87 ], fq: 2
  },
  "slap": {
    dict: "anew", word: "slap", stem: "slap",
    avg: [ 6.46, 2.95 ], std: [ 2.58, 1.79 ], fq: 2
  },
  "slaughter": {
    dict: "anew", word: "slaughter", stem: "slaughter",
    avg: [ 6.77, 1.64 ], std: [ 2.42, 1.18 ], fq: 10
  },
  "slave": {
    dict: "anew", word: "slave", stem: "slave",
    avg: [ 6.21, 1.84 ], std: [ 2.93, 1.13 ], fq: 30
  },
  "sleep": {
    dict: "anew", word: "sleep", stem: "sleep",
    avg: [ 2.8, 7.2 ], std: [ 2.66, 1.77 ], fq: 65
  },
  "slime": {
    dict: "anew", word: "slime", stem: "slime",
    avg: [ 5.36, 2.68 ], std: [ 2.63, 1.66 ], fq: 1
  },
  "slow": {
    dict: "anew", word: "slow", stem: "slow",
    avg: [ 3.39, 3.93 ], std: [ 2.22, 1.6 ], fq: 60
  },
  "slum": {
    dict: "anew", word: "slum", stem: "slum",
    avg: [ 4.78, 2.39 ], std: [ 2.52, 1.25 ], fq: 8
  },
  "slush": {
    dict: "anew", word: "slush", stem: "slush",
    avg: [ 3.73, 4.66 ], std: [ 2.23, 1.88 ], fq: 0
  },
  "smallpox": {
    dict: "anew", word: "smallpox", stem: "smallpox",
    avg: [ 5.58, 2.52 ], std: [ 2.13, 2.08 ], fq: 2
  },
  "smooth": {
    dict: "anew", word: "smooth", stem: "smooth",
    avg: [ 4.91, 6.58 ], std: [ 2.57, 1.78 ], fq: 42
  },
  "snake": {
    dict: "anew", word: "snake", stem: "snake",
    avg: [ 6.82, 3.31 ], std: [ 2.1, 2.2 ], fq: 44
  },
  "snob": {
    dict: "anew", word: "snob", stem: "snob",
    avg: [ 5.65, 3.36 ], std: [ 2.36, 1.81 ], fq: 1
  },
  "snow": {
    dict: "anew", word: "snow", stem: "snow",
    avg: [ 5.75, 7.08 ], std: [ 2.47, 1.83 ], fq: 59
  },
  "snuggle": {
    dict: "anew", word: "snuggle", stem: "snuggl",
    avg: [ 4.16, 7.92 ], std: [ 2.8, 1.24 ], fq: 4
  },
  "social": {
    dict: "anew", word: "social", stem: "social",
    avg: [ 4.98, 6.88 ], std: [ 2.59, 1.82 ], fq: 380
  },
  "soft": {
    dict: "anew", word: "soft", stem: "soft",
    avg: [ 4.63, 7.12 ], std: [ 2.61, 1.34 ], fq: 61
  },
  "solemn": {
    dict: "anew", word: "solemn", stem: "solemn",
    avg: [ 3.56, 4.32 ], std: [ 1.95, 1.51 ], fq: 12
  },
  "song": {
    dict: "anew", word: "song", stem: "song",
    avg: [ 6.07, 7.1 ], std: [ 2.42, 1.97 ], fq: 70
  },
  "soothe": {
    dict: "anew", word: "soothe", stem: "sooth",
    avg: [ 4.4, 7.3 ], std: [ 3.08, 1.85 ], fq: 2
  },
  "sour": {
    dict: "anew", word: "sour", stem: "sour",
    avg: [ 5.1, 3.93 ], std: [ 1.95, 1.98 ], fq: 3
  },
  "space": {
    dict: "anew", word: "space", stem: "space",
    avg: [ 5.14, 6.78 ], std: [ 2.54, 1.66 ], fq: 184
  },
  "spanking": {
    dict: "anew", word: "spanking", stem: "spank",
    avg: [ 5.41, 3.55 ], std: [ 2.73, 2.54 ], fq: 0
  },
  "sphere": {
    dict: "anew", word: "sphere", stem: "sphere",
    avg: [ 3.88, 5.33 ], std: [ 1.99, 0.87 ], fq: 22
  },
  "spider": {
    dict: "anew", word: "spider", stem: "spider",
    avg: [ 5.71, 3.33 ], std: [ 2.21, 1.72 ], fq: 2
  },
  "spirit": {
    dict: "anew", word: "spirit", stem: "spirit",
    avg: [ 5.56, 7 ], std: [ 2.62, 1.32 ], fq: 182
  },
  "spouse": {
    dict: "anew", word: "spouse", stem: "spous",
    avg: [ 5.21, 7.58 ], std: [ 2.75, 1.48 ], fq: 3
  },
  "spray": {
    dict: "anew", word: "spray", stem: "spray",
    avg: [ 4.14, 5.45 ], std: [ 2.28, 1.63 ], fq: 16
  },
  "spring": {
    dict: "anew", word: "spring", stem: "spring",
    avg: [ 5.67, 7.76 ], std: [ 2.51, 1.51 ], fq: 127
  },
  "square": {
    dict: "anew", word: "square", stem: "squar",
    avg: [ 3.18, 4.74 ], std: [ 1.76, 1.02 ], fq: 143
  },
  "stagnant": {
    dict: "anew", word: "stagnant", stem: "stagnant",
    avg: [ 3.93, 4.15 ], std: [ 1.94, 1.57 ], fq: 5
  },
  "star": {
    dict: "anew", word: "star", stem: "star",
    avg: [ 5.83, 7.27 ], std: [ 2.44, 1.66 ], fq: 25
  },
  "startled": {
    dict: "anew", word: "startled", stem: "startl",
    avg: [ 6.93, 4.5 ], std: [ 2.24, 1.67 ], fq: 21
  },
  "starving": {
    dict: "anew", word: "starving", stem: "starv",
    avg: [ 5.61, 2.39 ], std: [ 2.53, 1.82 ], fq: 6
  },
  "statue": {
    dict: "anew", word: "statue", stem: "statu",
    avg: [ 3.46, 5.17 ], std: [ 1.72, 0.7 ], fq: 17
  },
  "stench": {
    dict: "anew", word: "stench", stem: "stench",
    avg: [ 4.36, 2.19 ], std: [ 2.46, 1.37 ], fq: 1
  },
  "stiff": {
    dict: "anew", word: "stiff", stem: "stiff",
    avg: [ 4.02, 4.68 ], std: [ 2.41, 1.97 ], fq: 21
  },
  "stink": {
    dict: "anew", word: "stink", stem: "stink",
    avg: [ 4.26, 3 ], std: [ 2.1, 1.79 ], fq: 3
  },
  "stomach": {
    dict: "anew", word: "stomach", stem: "stomach",
    avg: [ 3.93, 4.82 ], std: [ 2.49, 2.06 ], fq: 37
  },
  "stool": {
    dict: "anew", word: "stool", stem: "stool",
    avg: [ 4, 4.56 ], std: [ 2.14, 1.72 ], fq: 8
  },
  "storm": {
    dict: "anew", word: "storm", stem: "storm",
    avg: [ 5.71, 4.95 ], std: [ 2.34, 2.22 ], fq: 26
  },
  "stove": {
    dict: "anew", word: "stove", stem: "stove",
    avg: [ 4.51, 4.98 ], std: [ 2.14, 1.69 ], fq: 15
  },
  "street": {
    dict: "anew", word: "street", stem: "street",
    avg: [ 3.39, 5.22 ], std: [ 1.87, 0.72 ], fq: 244
  },
  "stress": {
    dict: "anew", word: "stress", stem: "stress",
    avg: [ 7.45, 2.09 ], std: [ 2.38, 1.41 ], fq: 107
  },
  "strong": {
    dict: "anew", word: "strong", stem: "strong",
    avg: [ 5.92, 7.11 ], std: [ 2.28, 1.48 ], fq: 202
  },
  "stupid": {
    dict: "anew", word: "stupid", stem: "stupid",
    avg: [ 4.72, 2.31 ], std: [ 2.71, 1.37 ], fq: 24
  },
  "subdued": {
    dict: "anew", word: "subdued", stem: "subdu",
    avg: [ 2.9, 4.67 ], std: [ 1.81, 1.31 ], fq: 8
  },
  "success": {
    dict: "anew", word: "success", stem: "success",
    avg: [ 6.11, 8.29 ], std: [ 2.65, 0.93 ], fq: 93
  },
  "suffocate": {
    dict: "anew", word: "suffocate", stem: "suffoc",
    avg: [ 6.03, 1.56 ], std: [ 3.19, 0.96 ], fq: 1
  },
  "sugar": {
    dict: "anew", word: "sugar", stem: "sugar",
    avg: [ 5.64, 6.74 ], std: [ 2.18, 1.73 ], fq: 34
  },
  "suicide": {
    dict: "anew", word: "suicide", stem: "suicid",
    avg: [ 5.73, 1.25 ], std: [ 3.14, 0.69 ], fq: 17
  },
  "sun": {
    dict: "anew", word: "sun", stem: "sun",
    avg: [ 5.04, 7.55 ], std: [ 2.66, 1.85 ], fq: 112
  },
  "sunlight": {
    dict: "anew", word: "sunlight", stem: "sunlight",
    avg: [ 6.1, 7.76 ], std: [ 2.3, 1.43 ], fq: 17
  },
  "sunrise": {
    dict: "anew", word: "sunrise", stem: "sunris",
    avg: [ 5.06, 7.86 ], std: [ 3.05, 1.35 ], fq: 10
  },
  "sunset": {
    dict: "anew", word: "sunset", stem: "sunset",
    avg: [ 4.2, 7.68 ], std: [ 2.99, 1.72 ], fq: 14
  },
  "surgery": {
    dict: "anew", word: "surgery", stem: "surgeri",
    avg: [ 6.35, 2.86 ], std: [ 2.32, 2.19 ], fq: 6
  },
  "surprised": {
    dict: "anew", word: "surprised", stem: "surpris",
    avg: [ 7.47, 7.47 ], std: [ 2.09, 1.56 ], fq: 58
  },
  "suspicious": {
    dict: "anew", word: "suspicious", stem: "suspici",
    avg: [ 6.25, 3.76 ], std: [ 1.59, 1.42 ], fq: 13
  },
  "swamp": {
    dict: "anew", word: "swamp", stem: "swamp",
    avg: [ 4.86, 5.14 ], std: [ 2.36, 2.24 ], fq: 5
  },
  "sweetheart": {
    dict: "anew", word: "sweetheart", stem: "sweetheart",
    avg: [ 5.5, 8.42 ], std: [ 2.73, 0.83 ], fq: 9
  },
  "swift": {
    dict: "anew", word: "swift", stem: "swift",
    avg: [ 5.39, 6.46 ], std: [ 2.53, 1.76 ], fq: 32
  },
  "swimmer": {
    dict: "anew", word: "swimmer", stem: "swimmer",
    avg: [ 4.82, 6.54 ], std: [ 2.49, 1.64 ], fq: 0
  },
  "syphilis": {
    dict: "anew", word: "syphilis", stem: "syphili",
    avg: [ 5.69, 1.68 ], std: [ 3.25, 1.23 ], fq: 0
  },
  "table": {
    dict: "anew", word: "table", stem: "tabl",
    avg: [ 2.92, 5.22 ], std: [ 2.16, 0.72 ], fq: 198
  },
  "talent": {
    dict: "anew", word: "talent", stem: "talent",
    avg: [ 6.27, 7.56 ], std: [ 1.8, 1.25 ], fq: 40
  },
  "tamper": {
    dict: "anew", word: "tamper", stem: "tamper",
    avg: [ 4.95, 4.1 ], std: [ 2.01, 1.88 ], fq: 1
  },
  "tank": {
    dict: "anew", word: "tank", stem: "tank",
    avg: [ 4.88, 5.16 ], std: [ 1.86, 1.87 ], fq: 12
  },
  "taste": {
    dict: "anew", word: "taste", stem: "tast",
    avg: [ 5.22, 6.66 ], std: [ 2.38, 1.57 ], fq: 59
  },
  "taxi": {
    dict: "anew", word: "taxi", stem: "taxi",
    avg: [ 3.41, 5 ], std: [ 2.14, 1.96 ], fq: 16
  },
  "teacher": {
    dict: "anew", word: "teacher", stem: "teacher",
    avg: [ 4.05, 5.68 ], std: [ 2.61, 2.12 ], fq: 80
  },
  "tease": {
    dict: "anew", word: "tease", stem: "teas",
    avg: [ 5.87, 4.84 ], std: [ 2.56, 2.51 ], fq: 6
  },
  "tender": {
    dict: "anew", word: "tender", stem: "tender",
    avg: [ 4.88, 6.93 ], std: [ 2.3, 1.28 ], fq: 11
  },
  "tennis": {
    dict: "anew", word: "tennis", stem: "tenni",
    avg: [ 4.61, 6.02 ], std: [ 2.6, 1.97 ], fq: 15
  },
  "tense": {
    dict: "anew", word: "tense", stem: "tens",
    avg: [ 6.53, 3.56 ], std: [ 2.1, 1.36 ], fq: 15
  },
  "termite": {
    dict: "anew", word: "termite", stem: "termit",
    avg: [ 5.39, 3.58 ], std: [ 2.43, 2.08 ], fq: 0
  },
  "terrible": {
    dict: "anew", word: "terrible", stem: "terribl",
    avg: [ 6.27, 1.93 ], std: [ 2.44, 1.44 ], fq: 45
  },
  "terrific": {
    dict: "anew", word: "terrific", stem: "terrif",
    avg: [ 6.23, 8.16 ], std: [ 2.73, 1.12 ], fq: 5
  },
  "terrified": {
    dict: "anew", word: "terrified", stem: "terrifi",
    avg: [ 7.86, 1.72 ], std: [ 2.27, 1.14 ], fq: 7
  },
  "terrorist": {
    dict: "anew", word: "terrorist", stem: "terrorist",
    avg: [ 7.27, 1.69 ], std: [ 2.38, 1.42 ], fq: 0
  },
  "thankful": {
    dict: "anew", word: "thankful", stem: "thank",
    avg: [ 4.34, 6.89 ], std: [ 2.31, 2.29 ], fq: 6
  },
  "theory": {
    dict: "anew", word: "theory", stem: "theori",
    avg: [ 4.62, 5.3 ], std: [ 1.94, 1.49 ], fq: 129
  },
  "thermometer": {
    dict: "anew", word: "thermometer", stem: "thermomet",
    avg: [ 3.79, 4.73 ], std: [ 2.02, 1.05 ], fq: 0
  },
  "thief": {
    dict: "anew", word: "thief", stem: "thief",
    avg: [ 6.89, 2.13 ], std: [ 2.13, 1.69 ], fq: 8
  },
  "thorn": {
    dict: "anew", word: "thorn", stem: "thorn",
    avg: [ 5.14, 3.64 ], std: [ 2.14, 1.76 ], fq: 3
  },
  "thought": {
    dict: "anew", word: "thought", stem: "thought",
    avg: [ 4.83, 6.39 ], std: [ 2.46, 1.58 ], fq: 515
  },
  "thoughtful": {
    dict: "anew", word: "thoughtful", stem: "thought",
    avg: [ 5.72, 7.65 ], std: [ 2.3, 1.03 ], fq: 11
  },
  "thrill": {
    dict: "anew", word: "thrill", stem: "thrill",
    avg: [ 8.02, 8.05 ], std: [ 1.65, 1.48 ], fq: 5
  },
  "tidy": {
    dict: "anew", word: "tidy", stem: "tidi",
    avg: [ 3.98, 6.3 ], std: [ 2.22, 1.56 ], fq: 1
  },
  "time": {
    dict: "anew", word: "time", stem: "time",
    avg: [ 4.64, 5.31 ], std: [ 2.75, 2.02 ], fq: 1599
  },
  "timid": {
    dict: "anew", word: "timid", stem: "timid",
    avg: [ 4.11, 3.86 ], std: [ 2.09, 1.55 ], fq: 5
  },
  "tobacco": {
    dict: "anew", word: "tobacco", stem: "tobacco",
    avg: [ 4.83, 3.28 ], std: [ 2.9, 2.16 ], fq: 19
  },
  "tomb": {
    dict: "anew", word: "tomb", stem: "tomb",
    avg: [ 4.73, 2.94 ], std: [ 2.72, 1.88 ], fq: 11
  },
  "tool": {
    dict: "anew", word: "tool", stem: "tool",
    avg: [ 4.33, 5.19 ], std: [ 1.78, 1.27 ], fq: 40
  },
  "toothache": {
    dict: "anew", word: "toothache", stem: "toothach",
    avg: [ 5.55, 1.98 ], std: [ 2.51, 1.15 ], fq: 0
  },
  "tornado": {
    dict: "anew", word: "tornado", stem: "tornado",
    avg: [ 6.83, 2.55 ], std: [ 2.49, 1.78 ], fq: 1
  },
  "torture": {
    dict: "anew", word: "torture", stem: "tortur",
    avg: [ 6.1, 1.56 ], std: [ 2.77, 0.79 ], fq: 3
  },
  "tower": {
    dict: "anew", word: "tower", stem: "tower",
    avg: [ 3.95, 5.46 ], std: [ 2.28, 1.75 ], fq: 13
  },
  "toxic": {
    dict: "anew", word: "toxic", stem: "toxic",
    avg: [ 6.4, 2.1 ], std: [ 2.41, 1.48 ], fq: 3
  },
  "toy": {
    dict: "anew", word: "toy", stem: "toy",
    avg: [ 5.11, 7 ], std: [ 2.84, 2.01 ], fq: 4
  },
  "tragedy": {
    dict: "anew", word: "tragedy", stem: "tragedi",
    avg: [ 6.24, 1.78 ], std: [ 2.64, 1.31 ], fq: 49
  },
  "traitor": {
    dict: "anew", word: "traitor", stem: "traitor",
    avg: [ 5.78, 2.22 ], std: [ 2.47, 1.69 ], fq: 2
  },
  "trash": {
    dict: "anew", word: "trash", stem: "trash",
    avg: [ 4.16, 2.67 ], std: [ 2.16, 1.45 ], fq: 2
  },
  "trauma": {
    dict: "anew", word: "trauma", stem: "trauma",
    avg: [ 6.33, 2.1 ], std: [ 2.45, 1.49 ], fq: 1
  },
  "travel": {
    dict: "anew", word: "travel", stem: "travel",
    avg: [ 6.21, 7.1 ], std: [ 2.51, 2 ], fq: 61
  },
  "treasure": {
    dict: "anew", word: "treasure", stem: "treasur",
    avg: [ 6.75, 8.27 ], std: [ 2.3, 0.9 ], fq: 4
  },
  "treat": {
    dict: "anew", word: "treat", stem: "treat",
    avg: [ 5.62, 7.36 ], std: [ 2.25, 1.38 ], fq: 26
  },
  "tree": {
    dict: "anew", word: "tree", stem: "tree",
    avg: [ 3.42, 6.32 ], std: [ 2.21, 1.56 ], fq: 59
  },
  "triumph": {
    dict: "anew", word: "triumph", stem: "triumph",
    avg: [ 5.78, 7.8 ], std: [ 2.6, 1.83 ], fq: 22
  },
  "triumphant": {
    dict: "anew", word: "triumphant", stem: "triumphant",
    avg: [ 6.78, 8.82 ], std: [ 2.58, 0.73 ], fq: 5
  },
  "trophy": {
    dict: "anew", word: "trophy", stem: "trophi",
    avg: [ 5.39, 7.78 ], std: [ 2.44, 1.22 ], fq: 8
  },
  "trouble": {
    dict: "anew", word: "trouble", stem: "troubl",
    avg: [ 6.85, 3.03 ], std: [ 2.03, 2.09 ], fq: 134
  },
  "troubled": {
    dict: "anew", word: "troubled", stem: "troubl",
    avg: [ 5.94, 2.17 ], std: [ 2.36, 1.21 ], fq: 31
  },
  "truck": {
    dict: "anew", word: "truck", stem: "truck",
    avg: [ 4.84, 5.47 ], std: [ 2.17, 1.88 ], fq: 57
  },
  "trumpet": {
    dict: "anew", word: "trumpet", stem: "trumpet",
    avg: [ 4.97, 5.75 ], std: [ 2.13, 1.38 ], fq: 7
  },
  "trunk": {
    dict: "anew", word: "trunk", stem: "trunk",
    avg: [ 4.18, 5.09 ], std: [ 2.19, 1.57 ], fq: 8
  },
  "trust": {
    dict: "anew", word: "trust", stem: "trust",
    avg: [ 5.3, 6.68 ], std: [ 2.66, 2.71 ], fq: 52
  },
  "truth": {
    dict: "anew", word: "truth", stem: "truth",
    avg: [ 5, 7.8 ], std: [ 2.77, 1.29 ], fq: 126
  },
  "tumor": {
    dict: "anew", word: "tumor", stem: "tumor",
    avg: [ 6.51, 2.36 ], std: [ 2.85, 2.04 ], fq: 17
  },
  "tune": {
    dict: "anew", word: "tune", stem: "tune",
    avg: [ 4.71, 6.93 ], std: [ 2.09, 1.47 ], fq: 10
  },
  "twilight": {
    dict: "anew", word: "twilight", stem: "twilight",
    avg: [ 4.7, 7.23 ], std: [ 2.41, 1.8 ], fq: 4
  },
  "ugly": {
    dict: "anew", word: "ugly", stem: "ugli",
    avg: [ 5.38, 2.43 ], std: [ 2.23, 1.27 ], fq: 21
  },
  "ulcer": {
    dict: "anew", word: "ulcer", stem: "ulcer",
    avg: [ 6.12, 1.78 ], std: [ 2.68, 1.17 ], fq: 5
  },
  "umbrella": {
    dict: "anew", word: "umbrella", stem: "umbrella",
    avg: [ 3.68, 5.16 ], std: [ 1.99, 1.57 ], fq: 8
  },
  "unfaithful": {
    dict: "anew", word: "unfaithful", stem: "unfaith",
    avg: [ 6.2, 2.05 ], std: [ 2.7, 1.55 ], fq: 1
  },
  "unhappy": {
    dict: "anew", word: "unhappy", stem: "unhappi",
    avg: [ 4.18, 1.57 ], std: [ 2.5, 0.96 ], fq: 26
  },
  "unit": {
    dict: "anew", word: "unit", stem: "unit",
    avg: [ 3.75, 5.59 ], std: [ 2.49, 1.87 ], fq: 103
  },
  "untroubled": {
    dict: "anew", word: "untroubled", stem: "untroubl",
    avg: [ 3.89, 7.62 ], std: [ 2.54, 1.41 ], fq: 0
  },
  "upset": {
    dict: "anew", word: "upset", stem: "upset",
    avg: [ 5.86, 2 ], std: [ 2.4, 1.18 ], fq: 14
  },
  "urine": {
    dict: "anew", word: "urine", stem: "urin",
    avg: [ 4.2, 3.25 ], std: [ 2.18, 1.71 ], fq: 1
  },
  "useful": {
    dict: "anew", word: "useful", stem: "use",
    avg: [ 4.26, 7.14 ], std: [ 2.47, 1.6 ], fq: 58
  },
  "useless": {
    dict: "anew", word: "useless", stem: "useless",
    avg: [ 4.87, 2.13 ], std: [ 2.58, 1.42 ], fq: 17
  },
  "utensil": {
    dict: "anew", word: "utensil", stem: "utensil",
    avg: [ 3.57, 5.14 ], std: [ 1.98, 1.39 ], fq: 0
  },
  "vacation": {
    dict: "anew", word: "vacation", stem: "vacat",
    avg: [ 5.64, 8.16 ], std: [ 2.99, 1.36 ], fq: 47
  },
  "vagina": {
    dict: "anew", word: "vagina", stem: "vagina",
    avg: [ 5.55, 6.14 ], std: [ 2.55, 1.77 ], fq: 10
  },
  "valentine": {
    dict: "anew", word: "valentine", stem: "valentin",
    avg: [ 6.06, 8.11 ], std: [ 2.91, 1.35 ], fq: 2
  },
  "vampire": {
    dict: "anew", word: "vampire", stem: "vampir",
    avg: [ 6.37, 4.26 ], std: [ 2.35, 1.86 ], fq: 1
  },
  "vandal": {
    dict: "anew", word: "vandal", stem: "vandal",
    avg: [ 6.4, 2.71 ], std: [ 1.88, 1.91 ], fq: 1
  },
  "vanity": {
    dict: "anew", word: "vanity", stem: "vaniti",
    avg: [ 4.98, 4.3 ], std: [ 2.31, 1.91 ], fq: 7
  },
  "vehicle": {
    dict: "anew", word: "vehicle", stem: "vehicl",
    avg: [ 4.63, 6.27 ], std: [ 2.81, 2.34 ], fq: 35
  },
  "venom": {
    dict: "anew", word: "venom", stem: "venom",
    avg: [ 6.08, 2.68 ], std: [ 2.44, 1.81 ], fq: 2
  },
  "vest": {
    dict: "anew", word: "vest", stem: "vest",
    avg: [ 3.95, 5.25 ], std: [ 2.09, 1.33 ], fq: 4
  },
  "victim": {
    dict: "anew", word: "victim", stem: "victim",
    avg: [ 6.06, 2.18 ], std: [ 2.32, 1.48 ], fq: 27
  },
  "victory": {
    dict: "anew", word: "victory", stem: "victori",
    avg: [ 6.63, 8.32 ], std: [ 2.84, 1.16 ], fq: 61
  },
  "vigorous": {
    dict: "anew", word: "vigorous", stem: "vigor",
    avg: [ 5.9, 6.79 ], std: [ 2.66, 1.54 ], fq: 29
  },
  "village": {
    dict: "anew", word: "village", stem: "villag",
    avg: [ 4.08, 5.92 ], std: [ 1.87, 1.34 ], fq: 72
  },
  "violent": {
    dict: "anew", word: "violent", stem: "violent",
    avg: [ 6.89, 2.29 ], std: [ 2.47, 1.78 ], fq: 33
  },
  "violin": {
    dict: "anew", word: "violin", stem: "violin",
    avg: [ 3.49, 5.43 ], std: [ 2.26, 1.98 ], fq: 11
  },
  "virgin": {
    dict: "anew", word: "virgin", stem: "virgin",
    avg: [ 5.51, 6.45 ], std: [ 2.06, 1.76 ], fq: 35
  },
  "virtue": {
    dict: "anew", word: "virtue", stem: "virtu",
    avg: [ 4.52, 6.22 ], std: [ 2.52, 2.06 ], fq: 30
  },
  "vision": {
    dict: "anew", word: "vision", stem: "vision",
    avg: [ 4.66, 6.62 ], std: [ 2.43, 1.84 ], fq: 56
  },
  "volcano": {
    dict: "anew", word: "volcano", stem: "volcano",
    avg: [ 6.33, 4.84 ], std: [ 2.21, 2.14 ], fq: 2
  },
  "vomit": {
    dict: "anew", word: "vomit", stem: "vomit",
    avg: [ 5.75, 2.06 ], std: [ 2.84, 1.57 ], fq: 3
  },
  "voyage": {
    dict: "anew", word: "voyage", stem: "voyag",
    avg: [ 5.55, 6.25 ], std: [ 2.23, 1.91 ], fq: 17
  },
  "wagon": {
    dict: "anew", word: "wagon", stem: "wagon",
    avg: [ 3.98, 5.37 ], std: [ 2.04, 0.97 ], fq: 55
  },
  "war": {
    dict: "anew", word: "war", stem: "war",
    avg: [ 7.49, 2.08 ], std: [ 2.16, 1.91 ], fq: 464
  },
  "warmth": {
    dict: "anew", word: "warmth", stem: "warmth",
    avg: [ 3.73, 7.41 ], std: [ 2.4, 1.81 ], fq: 28
  },
  "wasp": {
    dict: "anew", word: "wasp", stem: "wasp",
    avg: [ 5.5, 3.37 ], std: [ 2.17, 1.63 ], fq: 2
  },
  "waste": {
    dict: "anew", word: "waste", stem: "wast",
    avg: [ 4.14, 2.93 ], std: [ 2.3, 1.76 ], fq: 35
  },
  "watch": {
    dict: "anew", word: "watch", stem: "watch",
    avg: [ 4.1, 5.78 ], std: [ 2.12, 1.51 ], fq: 81
  },
  "water": {
    dict: "anew", word: "water", stem: "water",
    avg: [ 4.97, 6.61 ], std: [ 2.49, 1.78 ], fq: 442
  },
  "waterfall": {
    dict: "anew", word: "waterfall", stem: "waterfal",
    avg: [ 5.37, 7.88 ], std: [ 2.84, 1.03 ], fq: 2
  },
  "wealthy": {
    dict: "anew", word: "wealthy", stem: "wealthi",
    avg: [ 5.8, 7.7 ], std: [ 2.73, 1.34 ], fq: 12
  },
  "weapon": {
    dict: "anew", word: "weapon", stem: "weapon",
    avg: [ 6.03, 3.97 ], std: [ 1.89, 1.92 ], fq: 42
  },
  "weary": {
    dict: "anew", word: "weary", stem: "weari",
    avg: [ 3.81, 3.79 ], std: [ 2.29, 2.12 ], fq: 17
  },
  "wedding": {
    dict: "anew", word: "wedding", stem: "wed",
    avg: [ 5.97, 7.82 ], std: [ 2.85, 1.56 ], fq: 32
  },
  "whistle": {
    dict: "anew", word: "whistle", stem: "whistl",
    avg: [ 4.69, 5.81 ], std: [ 1.99, 1.21 ], fq: 4
  },
  "white": {
    dict: "anew", word: "white", stem: "white",
    avg: [ 4.37, 6.47 ], std: [ 2.14, 1.59 ], fq: 365
  },
  "whore": {
    dict: "anew", word: "whore", stem: "whore",
    avg: [ 5.85, 2.3 ], std: [ 2.93, 2.11 ], fq: 2
  },
  "wicked": {
    dict: "anew", word: "wicked", stem: "wick",
    avg: [ 6.09, 2.96 ], std: [ 2.44, 2.37 ], fq: 9
  },
  "wife": {
    dict: "anew", word: "wife", stem: "wife",
    avg: [ 4.93, 6.33 ], std: [ 2.22, 1.97 ], fq: 228
  },
  "win": {
    dict: "anew", word: "win", stem: "win",
    avg: [ 7.72, 8.38 ], std: [ 2.16, 0.92 ], fq: 55
  },
  "windmill": {
    dict: "anew", word: "windmill", stem: "windmil",
    avg: [ 3.74, 5.6 ], std: [ 2.13, 1.65 ], fq: 1
  },
  "window": {
    dict: "anew", word: "window", stem: "window",
    avg: [ 3.97, 5.91 ], std: [ 2.01, 1.38 ], fq: 119
  },
  "wine": {
    dict: "anew", word: "wine", stem: "wine",
    avg: [ 4.78, 5.95 ], std: [ 2.34, 2.19 ], fq: 72
  },
  "wink": {
    dict: "anew", word: "wink", stem: "wink",
    avg: [ 5.44, 6.93 ], std: [ 2.68, 1.83 ], fq: 7
  },
  "wise": {
    dict: "anew", word: "wise", stem: "wise",
    avg: [ 3.91, 7.52 ], std: [ 2.64, 1.23 ], fq: 36
  },
  "wish": {
    dict: "anew", word: "wish", stem: "wish",
    avg: [ 5.16, 7.09 ], std: [ 2.62, 2 ], fq: 110
  },
  "wit": {
    dict: "anew", word: "wit", stem: "wit",
    avg: [ 5.42, 7.32 ], std: [ 2.44, 1.9 ], fq: 20
  },
  "woman": {
    dict: "anew", word: "woman", stem: "woman",
    avg: [ 5.32, 6.64 ], std: [ 2.59, 1.76 ], fq: 224
  },
  "wonder": {
    dict: "anew", word: "wonder", stem: "wonder",
    avg: [ 5, 6.03 ], std: [ 2.23, 1.58 ], fq: 67
  },
  "world": {
    dict: "anew", word: "world", stem: "world",
    avg: [ 5.32, 6.5 ], std: [ 2.39, 2.03 ], fq: 787
  },
  "wounds": {
    dict: "anew", word: "wounds", stem: "wound",
    avg: [ 5.82, 2.51 ], std: [ 2.01, 1.58 ], fq: 8
  },
  "writer": {
    dict: "anew", word: "writer", stem: "writer",
    avg: [ 4.33, 5.52 ], std: [ 2.45, 1.9 ], fq: 73
  },
  "yacht": {
    dict: "anew", word: "yacht", stem: "yacht",
    avg: [ 5.61, 6.95 ], std: [ 2.72, 1.79 ], fq: 4
  },
  "yellow": {
    dict: "anew", word: "yellow", stem: "yellow",
    avg: [ 4.43, 5.61 ], std: [ 2.05, 1.94 ], fq: 55
  },
  "young": {
    dict: "anew", word: "young", stem: "young",
    avg: [ 5.64, 6.89 ], std: [ 2.51, 2.12 ], fq: 385
  },
  "youth": {
    dict: "anew", word: "youth", stem: "youth",
    avg: [ 5.67, 6.75 ], std: [ 2.52, 2.29 ], fq: 82
  },
  "zest": {
    dict: "anew", word: "zest", stem: "zest",
    avg: [ 5.59, 6.79 ], std: [ 2.66, 2.04 ], fq: 5
  }
};

var  anew_stem = {			// ANEW terms, indexed by stem
  "abduct": {
     dict: "anew-stem", word: "abduction", stem: "abduct",
     avg: [ 5.53, 2.76 ], std: [ 2.43, 2.06 ], fq: 1
   },
   "abort": {
     dict: "anew-stem", word: "abortion", stem: "abort",
     avg: [ 5.39, 3.5 ], std: [ 2.8, 2.3 ], fq: 6
   },
   "abund": {
     dict: "anew-stem", word: "abundance", stem: "abund",
     avg: [ 5.51, 6.59 ], std: [ 2.63, 2.01 ], fq: 13
   },
   "abus": {
     dict: "anew-stem", word: "abuse", stem: "abus",
     avg: [ 6.83, 1.8 ], std: [ 2.7, 1.23 ], fq: 18
   },
   "accept": {
     dict: "anew-stem", word: "acceptance", stem: "accept",
     avg: [ 5.4, 7.98 ], std: [ 2.7, 1.42 ], fq: 49
   },
   "accid": {
     dict: "anew-stem", word: "accident", stem: "accid",
     avg: [ 6.26, 2.05 ], std: [ 2.87, 1.19 ], fq: 33
   },
   "ac": {
     dict: "anew-stem", word: "ace", stem: "ac",
     avg: [ 5.5, 6.88 ], std: [ 2.66, 1.93 ], fq: 15
   },
   "ach": {
     dict: "anew-stem", word: "ache", stem: "ach",
     avg: [ 5, 2.46 ], std: [ 2.45, 1.52 ], fq: 4
   },
   "achiev": {
     dict: "anew-stem", word: "achievement", stem: "achiev",
     avg: [ 5.53, 7.89 ], std: [ 2.81, 1.38 ], fq: 65
   },
   "activ": {
     dict: "anew-stem", word: "activate", stem: "activ",
     avg: [ 4.86, 5.46 ], std: [ 2.56, 0.98 ], fq: 2
   },
   "admir": {
     dict: "anew-stem", word: "admired", stem: "admir",
     avg: [ 6.11, 7.74 ], std: [ 2.36, 1.84 ], fq: 17
   },
   "ador": {
     dict: "anew-stem", word: "adorable", stem: "ador",
     avg: [ 5.12, 7.81 ], std: [ 2.71, 1.24 ], fq: 3
   },
   "advantag": {
     dict: "anew-stem", word: "advantage", stem: "advantag",
     avg: [ 4.76, 6.95 ], std: [ 2.18, 1.85 ], fq: 73
   },
   "adventur": {
     dict: "anew-stem", word: "adventure", stem: "adventur",
     avg: [ 6.98, 7.6 ], std: [ 2.15, 1.5 ], fq: 14
   },
   "affect": {
     dict: "anew-stem", word: "affection", stem: "affect",
     avg: [ 6.21, 8.39 ], std: [ 2.75, 0.86 ], fq: 18
   },
   "aggress": {
     dict: "anew-stem", word: "aggressive", stem: "aggress",
     avg: [ 5.83, 5.1 ], std: [ 2.33, 1.68 ], fq: 17
   },
   "agil": {
     dict: "anew-stem", word: "agility", stem: "agil",
     avg: [ 4.85, 6.46 ], std: [ 1.8, 1.57 ], fq: 3
   },
   "agoni": {
     dict: "anew-stem", word: "agony", stem: "agoni",
     avg: [ 6.06, 2.43 ], std: [ 2.67, 2.17 ], fq: 9
   },
   "alcohol": {
     dict: "anew-stem", word: "alcoholic", stem: "alcohol",
     avg: [ 5.69, 2.84 ], std: [ 2.36, 2.34 ], fq: 3
   },
   "alimoni": {
     dict: "anew-stem", word: "alimony", stem: "alimoni",
     avg: [ 4.3, 3.95 ], std: [ 2.29, 2 ], fq: 2
   },
   "aliv": {
     dict: "anew-stem", word: "alive", stem: "aliv",
     avg: [ 5.5, 7.25 ], std: [ 2.74, 2.22 ], fq: 57
   },
   "allergi": {
     dict: "anew-stem", word: "allergy", stem: "allergi",
     avg: [ 4.64, 3.07 ], std: [ 2.34, 1.64 ], fq: 1
   },
   "allei": {
     dict: "anew-stem", word: "alley", stem: "allei",
     avg: [ 4.91, 4.48 ], std: [ 2.42, 1.97 ], fq: 8
   },
   "alon": {
     dict: "anew-stem", word: "alone", stem: "alon",
     avg: [ 4.83, 2.41 ], std: [ 2.66, 1.77 ], fq: 195
   },
   "ambit": {
     dict: "anew-stem", word: "ambition", stem: "ambit",
     avg: [ 5.61, 7.04 ], std: [ 2.92, 1.98 ], fq: 19
   },
   "ambul": {
     dict: "anew-stem", word: "ambulance", stem: "ambul",
     avg: [ 7.33, 2.47 ], std: [ 1.96, 1.5 ], fq: 6
   },
   "angri": {
     dict: "anew-stem", word: "angry", stem: "angri",
     avg: [ 7.17, 2.85 ], std: [ 2.07, 1.7 ], fq: 45
   },
   "anguish": {
     dict: "anew-stem", word: "anguished", stem: "anguish",
     avg: [ 5.33, 2.12 ], std: [ 2.69, 1.56 ], fq: 2
   },
   "ankl": {
     dict: "anew-stem", word: "ankle", stem: "ankl",
     avg: [ 4.16, 5.27 ], std: [ 2.03, 1.54 ], fq: 8
   },
   "annoi": {
     dict: "anew-stem", word: "annoy", stem: "annoi",
     avg: [ 6.49, 2.74 ], std: [ 2.17, 1.81 ], fq: 2
   },
   "anxiou": {
     dict: "anew-stem", word: "anxious", stem: "anxiou",
     avg: [ 6.92, 4.81 ], std: [ 1.81, 1.98 ], fq: 29
   },
   "applaus": {
     dict: "anew-stem", word: "applause", stem: "applaus",
     avg: [ 5.8, 7.5 ], std: [ 2.79, 1.5 ], fq: 14
   },
   "applianc": {
     dict: "anew-stem", word: "appliance", stem: "applianc",
     avg: [ 4.05, 5.1 ], std: [ 2.06, 1.21 ], fq: 5
   },
   "armi": {
     dict: "anew-stem", word: "army", stem: "armi",
     avg: [ 5.03, 4.72 ], std: [ 2.03, 1.75 ], fq: 132
   },
   "arous": {
     dict: "anew-stem", word: "aroused", stem: "arous",
     avg: [ 6.63, 7.97 ], std: [ 2.7, 1 ], fq: 20
   },
   "arrog": {
     dict: "anew-stem", word: "arrogant", stem: "arrog",
     avg: [ 5.65, 3.69 ], std: [ 2.23, 2.4 ], fq: 2
   },
   "astonish": {
     dict: "anew-stem", word: "astonished", stem: "astonish",
     avg: [ 6.58, 6.56 ], std: [ 2.22, 1.61 ], fq: 6
   },
   "athlet": {
     dict: "anew-stem", word: "athletics", stem: "athlet",
     avg: [ 6.1, 6.61 ], std: [ 2.29, 2.08 ], fq: 9
   },
   "avalanch": {
     dict: "anew-stem", word: "avalanche", stem: "avalanch",
     avg: [ 5.54, 3.29 ], std: [ 2.37, 1.95 ], fq: 1
   },
   "avenu": {
     dict: "anew-stem", word: "avenue", stem: "avenu",
     avg: [ 4.12, 5.5 ], std: [ 2.01, 1.37 ], fq: 46
   },
   "aw": {
     dict: "anew-stem", word: "awed", stem: "aw",
     avg: [ 5.74, 6.7 ], std: [ 2.31, 1.38 ], fq: 5
   },
   "babi": {
     dict: "anew-stem", word: "baby", stem: "babi",
     avg: [ 5.53, 8.22 ], std: [ 2.8, 1.2 ], fq: 62
   },
   "bandag": {
     dict: "anew-stem", word: "bandage", stem: "bandag",
     avg: [ 3.9, 4.54 ], std: [ 2.07, 1.75 ], fq: 4
   },
   "beauti": {
     dict: "anew-stem", word: "beautiful", stem: "beauti",
     avg: [ 6.17, 7.6 ], std: [ 2.34, 1.64 ], fq: 127
   },
   "bee": {
     dict: "anew-stem", word: "bees", stem: "bee",
     avg: [ 6.51, 3.2 ], std: [ 2.14, 2.07 ], fq: 15
   },
   "bereav": {
     dict: "anew-stem", word: "bereavement", stem: "bereav",
     avg: [ 4.2, 4.57 ], std: [ 2.15, 1.7 ], fq: 4
   },
   "betrai": {
     dict: "anew-stem", word: "betray", stem: "betrai",
     avg: [ 7.24, 1.68 ], std: [ 2.06, 1.02 ], fq: 4
   },
   "beverag": {
     dict: "anew-stem", word: "beverage", stem: "beverag",
     avg: [ 5.21, 6.83 ], std: [ 2.46, 1.48 ], fq: 5
   },
   "birthdai": {
     dict: "anew-stem", word: "birthday", stem: "birthdai",
     avg: [ 6.68, 7.84 ], std: [ 2.11, 1.92 ], fq: 18
   },
   "blasphemi": {
     dict: "anew-stem", word: "blasphemy", stem: "blasphemi",
     avg: [ 4.93, 3.75 ], std: [ 2.34, 2.26 ], fq: 4
   },
   "bloodi": {
     dict: "anew-stem", word: "bloody", stem: "bloodi",
     avg: [ 6.41, 2.9 ], std: [ 2, 1.98 ], fq: 8
   },
   "bodi": {
     dict: "anew-stem", word: "body", stem: "bodi",
     avg: [ 5.52, 5.55 ], std: [ 2.63, 2.37 ], fq: 276
   },
   "bore": {
     dict: "anew-stem", word: "bored", stem: "bore",
     avg: [ 2.83, 2.95 ], std: [ 2.31, 1.35 ], fq: 14
   },
   "bottl": {
     dict: "anew-stem", word: "bottle", stem: "bottl",
     avg: [ 4.79, 6.15 ], std: [ 2.44, 1.49 ], fq: 76
   },
   "boi": {
     dict: "anew-stem", word: "boy", stem: "boi",
     avg: [ 4.58, 6.32 ], std: [ 2.37, 1.6 ], fq: 242
   },
   "breez": {
     dict: "anew-stem", word: "breeze", stem: "breez",
     avg: [ 4.37, 6.85 ], std: [ 2.32, 1.71 ], fq: 14
   },
   "build": {
     dict: "anew-stem", word: "building", stem: "build",
     avg: [ 3.92, 5.29 ], std: [ 1.94, 1.15 ], fq: 160
   },
   "bunni": {
     dict: "anew-stem", word: "bunny", stem: "bunni",
     avg: [ 4.06, 7.24 ], std: [ 2.61, 1.32 ], fq: 1
   },
   "burden": {
     dict: "anew-stem", word: "burdened", stem: "burden",
     avg: [ 5.63, 2.5 ], std: [ 2.07, 1.32 ], fq: 4
   },
   "bu": {
     dict: "anew-stem", word: "bus", stem: "bu",
     avg: [ 3.55, 4.51 ], std: [ 1.8, 1.57 ], fq: 34
   },
   "busybodi": {
     dict: "anew-stem", word: "busybody", stem: "busybodi",
     avg: [ 4.84, 5.17 ], std: [ 2.41, 2.02 ], fq: 0
   },
   "butterfli": {
     dict: "anew-stem", word: "butterfly", stem: "butterfli",
     avg: [ 3.47, 7.17 ], std: [ 2.39, 1.2 ], fq: 2
   },
   "candi": {
     dict: "anew-stem", word: "candy", stem: "candi",
     avg: [ 4.58, 6.54 ], std: [ 2.4, 2.09 ], fq: 16
   },
   "capabl": {
     dict: "anew-stem", word: "capable", stem: "capabl",
     avg: [ 5.08, 7.16 ], std: [ 2.07, 1.39 ], fq: 66
   },
   "carefre": {
     dict: "anew-stem", word: "carefree", stem: "carefre",
     avg: [ 4.17, 7.54 ], std: [ 2.84, 1.38 ], fq: 9
   },
   "cemeteri": {
     dict: "anew-stem", word: "cemetery", stem: "cemeteri",
     avg: [ 4.82, 2.63 ], std: [ 2.66, 1.4 ], fq: 15
   },
   "chanc": {
     dict: "anew-stem", word: "chance", stem: "chanc",
     avg: [ 5.38, 6.02 ], std: [ 2.58, 1.77 ], fq: 131
   },
   "chao": {
     dict: "anew-stem", word: "chaos", stem: "chao",
     avg: [ 6.67, 4.17 ], std: [ 2.06, 2.36 ], fq: 17
   },
   "chocol": {
     dict: "anew-stem", word: "chocolate", stem: "chocol",
     avg: [ 5.29, 6.88 ], std: [ 2.55, 1.89 ], fq: 9
   },
   "christma": {
     dict: "anew-stem", word: "christmas", stem: "christma",
     avg: [ 6.27, 7.8 ], std: [ 2.56, 1.55 ], fq: 27
   },
   "circl": {
     dict: "anew-stem", word: "circle", stem: "circl",
     avg: [ 3.86, 5.67 ], std: [ 2.13, 1.26 ], fq: 60
   },
   "circu": {
     dict: "anew-stem", word: "circus", stem: "circu",
     avg: [ 5.97, 7.3 ], std: [ 2.59, 1.84 ], fq: 7
   },
   "citi": {
     dict: "anew-stem", word: "city", stem: "citi",
     avg: [ 5.24, 6.03 ], std: [ 2.53, 1.37 ], fq: 393
   },
   "cloth": {
     dict: "anew-stem", word: "clothing", stem: "cloth",
     avg: [ 4.78, 6.54 ], std: [ 2.88, 1.85 ], fq: 20
   },
   "cloud": {
     dict: "anew-stem", word: "clouds", stem: "cloud",
     avg: [ 3.3, 6.18 ], std: [ 2.08, 2.18 ], fq: 38
   },
   "clumsi": {
     dict: "anew-stem", word: "clumsy", stem: "clumsi",
     avg: [ 5.18, 4 ], std: [ 2.4, 2.22 ], fq: 6
   },
   "coars": {
     dict: "anew-stem", word: "coarse", stem: "coars",
     avg: [ 4.21, 4.55 ], std: [ 1.84, 1.42 ], fq: 10
   },
   "comedi": {
     dict: "anew-stem", word: "comedy", stem: "comedi",
     avg: [ 5.85, 8.37 ], std: [ 2.81, 0.94 ], fq: 39
   },
   "comput": {
     dict: "anew-stem", word: "computer", stem: "comput",
     avg: [ 4.75, 6.24 ], std: [ 1.93, 1.61 ], fq: 13
   },
   "concentr": {
     dict: "anew-stem", word: "concentrate", stem: "concentr",
     avg: [ 4.65, 5.2 ], std: [ 2.13, 1.28 ], fq: 11
   },
   "confid": {
     dict: "anew-stem", word: "confident", stem: "confid",
     avg: [ 6.22, 7.98 ], std: [ 2.41, 1.29 ], fq: 16
   },
   "confus": {
     dict: "anew-stem", word: "confused", stem: "confus",
     avg: [ 6.03, 3.21 ], std: [ 1.88, 1.51 ], fq: 44
   },
   "consol": {
     dict: "anew-stem", word: "consoled", stem: "consol",
     avg: [ 4.53, 5.78 ], std: [ 2.22, 1.64 ], fq: 2
   },
   "content": {
     dict: "anew-stem", word: "contents", stem: "content",
     avg: [ 4.32, 4.89 ], std: [ 2.14, 0.89 ], fq: 16
   },
   "control": {
     dict: "anew-stem", word: "controlling", stem: "control",
     avg: [ 6.1, 3.8 ], std: [ 2.19, 2.25 ], fq: 23
   },
   "corps": {
     dict: "anew-stem", word: "corpse", stem: "corps",
     avg: [ 4.74, 2.18 ], std: [ 2.94, 1.48 ], fq: 7
   },
   "cottag": {
     dict: "anew-stem", word: "cottage", stem: "cottag",
     avg: [ 3.39, 6.45 ], std: [ 2.54, 1.52 ], fq: 19
   },
   "coupl": {
     dict: "anew-stem", word: "couple", stem: "coupl",
     avg: [ 6.39, 7.41 ], std: [ 2.31, 1.97 ], fq: 122
   },
   "cozi": {
     dict: "anew-stem", word: "cozy", stem: "cozi",
     avg: [ 3.32, 7.39 ], std: [ 2.28, 1.53 ], fq: 1
   },
   "crimin": {
     dict: "anew-stem", word: "criminal", stem: "crimin",
     avg: [ 4.79, 2.93 ], std: [ 2.51, 1.66 ], fq: 24
   },
   "crisi": {
     dict: "anew-stem", word: "crisis", stem: "crisi",
     avg: [ 5.44, 2.74 ], std: [ 3.07, 2.23 ], fq: 82
   },
   "crucifi": {
     dict: "anew-stem", word: "crucify", stem: "crucifi",
     avg: [ 6.47, 2.23 ], std: [ 2.47, 1.72 ], fq: 2
   },
   "crush": {
     dict: "anew-stem", word: "crushed", stem: "crush",
     avg: [ 5.52, 2.21 ], std: [ 2.87, 1.74 ], fq: 10
   },
   "cuddl": {
     dict: "anew-stem", word: "cuddle", stem: "cuddl",
     avg: [ 4.4, 7.72 ], std: [ 2.67, 1.92 ], fq: 0
   },
   "cuisin": {
     dict: "anew-stem", word: "cuisine", stem: "cuisin",
     avg: [ 4.39, 6.64 ], std: [ 1.99, 1.48 ], fq: 1
   },
   "curiou": {
     dict: "anew-stem", word: "curious", stem: "curiou",
     avg: [ 5.82, 6.08 ], std: [ 1.64, 1.63 ], fq: 46
   },
   "curtain": {
     dict: "anew-stem", word: "curtains", stem: "curtain",
     avg: [ 3.67, 4.83 ], std: [ 1.83, 0.83 ], fq: 8
   },
   "cyclon": {
     dict: "anew-stem", word: "cyclone", stem: "cyclon",
     avg: [ 6.36, 3.6 ], std: [ 2.89, 2.38 ], fq: 0
   },
   "damag": {
     dict: "anew-stem", word: "damage", stem: "damag",
     avg: [ 5.57, 3.05 ], std: [ 2.26, 1.65 ], fq: 33
   },
   "dazzl": {
     dict: "anew-stem", word: "dazzle", stem: "dazzl",
     avg: [ 6.33, 7.29 ], std: [ 2.02, 1.09 ], fq: 1
   },
   "decompos": {
     dict: "anew-stem", word: "decompose", stem: "decompos",
     avg: [ 4.65, 3.2 ], std: [ 2.39, 1.81 ], fq: 1
   },
   "decor": {
     dict: "anew-stem", word: "decorate", stem: "decor",
     avg: [ 5.14, 6.93 ], std: [ 2.39, 1.3 ], fq: 2
   },
   "defeat": {
     dict: "anew-stem", word: "defeated", stem: "defeat",
     avg: [ 5.09, 2.34 ], std: [ 3, 1.66 ], fq: 15
   },
   "deform": {
     dict: "anew-stem", word: "deformed", stem: "deform",
     avg: [ 4.07, 2.41 ], std: [ 2.34, 1.66 ], fq: 0
   },
   "delai": {
     dict: "anew-stem", word: "delayed", stem: "delai",
     avg: [ 5.62, 3.07 ], std: [ 2.39, 1.74 ], fq: 25
   },
   "depress": {
     dict: "anew-stem", word: "depressed", stem: "depress",
     avg: [ 4.72, 1.83 ], std: [ 2.95, 1.42 ], fq: 11
   },
   "desert": {
     dict: "anew-stem", word: "deserter", stem: "desert",
     avg: [ 5.5, 2.45 ], std: [ 2.55, 1.8 ], fq: 0
   },
   "desir": {
     dict: "anew-stem", word: "desire", stem: "desir",
     avg: [ 7.35, 7.69 ], std: [ 1.76, 1.39 ], fq: 79
   },
   "despair": {
     dict: "anew-stem", word: "despairing", stem: "despair",
     avg: [ 5.68, 2.43 ], std: [ 2.37, 1.47 ], fq: 4
   },
   "despis": {
     dict: "anew-stem", word: "despise", stem: "despis",
     avg: [ 6.28, 2.03 ], std: [ 2.43, 1.38 ], fq: 7
   },
   "destroi": {
     dict: "anew-stem", word: "destroy", stem: "destroi",
     avg: [ 6.83, 2.64 ], std: [ 2.38, 2.03 ], fq: 48
   },
   "destruct": {
     dict: "anew-stem", word: "destruction", stem: "destruct",
     avg: [ 5.82, 3.16 ], std: [ 2.71, 2.44 ], fq: 38
   },
   "detach": {
     dict: "anew-stem", word: "detached", stem: "detach",
     avg: [ 4.26, 3.86 ], std: [ 2.57, 1.88 ], fq: 12
   },
   "devot": {
     dict: "anew-stem", word: "devoted", stem: "devot",
     avg: [ 5.23, 7.41 ], std: [ 2.21, 1.37 ], fq: 51
   },
   "dignifi": {
     dict: "anew-stem", word: "dignified", stem: "dignifi",
     avg: [ 4.12, 7.1 ], std: [ 2.29, 1.26 ], fq: 7
   },
   "dirti": {
     dict: "anew-stem", word: "dirty", stem: "dirti",
     avg: [ 4.88, 3.08 ], std: [ 2.29, 2.05 ], fq: 36
   },
   "disast": {
     dict: "anew-stem", word: "disaster", stem: "disast",
     avg: [ 6.33, 1.73 ], std: [ 2.7, 1.13 ], fq: 26
   },
   "discourag": {
     dict: "anew-stem", word: "discouraged", stem: "discourag",
     avg: [ 4.53, 3 ], std: [ 2.11, 2.16 ], fq: 15
   },
   "disdain": {
     dict: "anew-stem", word: "disdainful", stem: "disdain",
     avg: [ 5.04, 3.68 ], std: [ 2.14, 1.9 ], fq: 2
   },
   "disgust": {
     dict: "anew-stem", word: "disgusted", stem: "disgust",
     avg: [ 5.42, 2.45 ], std: [ 2.59, 1.41 ], fq: 6
   },
   "disloy": {
     dict: "anew-stem", word: "disloyal", stem: "disloy",
     avg: [ 6.56, 1.93 ], std: [ 2.21, 1.61 ], fq: 2
   },
   "displeas": {
     dict: "anew-stem", word: "displeased", stem: "displeas",
     avg: [ 5.64, 2.79 ], std: [ 2.48, 2.23 ], fq: 7
   },
   "distress": {
     dict: "anew-stem", word: "distressed", stem: "distress",
     avg: [ 6.4, 1.94 ], std: [ 2.38, 1.1 ], fq: 4
   },
   "divorc": {
     dict: "anew-stem", word: "divorce", stem: "divorc",
     avg: [ 6.33, 2.22 ], std: [ 2.71, 1.88 ], fq: 29
   },
   "dread": {
     dict: "anew-stem", word: "dreadful", stem: "dread",
     avg: [ 5.84, 2.26 ], std: [ 2.62, 1.91 ], fq: 10
   },
   "dreari": {
     dict: "anew-stem", word: "dreary", stem: "dreari",
     avg: [ 2.98, 3.05 ], std: [ 2.18, 1.58 ], fq: 6
   },
   "dummi": {
     dict: "anew-stem", word: "dummy", stem: "dummi",
     avg: [ 4.35, 3.38 ], std: [ 2.25, 1.7 ], fq: 3
   },
   "easi": {
     dict: "anew-stem", word: "easy", stem: "easi",
     avg: [ 4.48, 7.1 ], std: [ 2.82, 1.91 ], fq: 125
   },
   "easygo": {
     dict: "anew-stem", word: "easygoing", stem: "easygo",
     avg: [ 4.3, 7.2 ], std: [ 2.52, 1.5 ], fq: 1
   },
   "ecstasi": {
     dict: "anew-stem", word: "ecstasy", stem: "ecstasi",
     avg: [ 7.38, 7.98 ], std: [ 1.92, 1.52 ], fq: 6
   },
   "educ": {
     dict: "anew-stem", word: "education", stem: "educ",
     avg: [ 5.74, 6.69 ], std: [ 2.46, 1.77 ], fq: 214
   },
   "elat": {
     dict: "anew-stem", word: "elated", stem: "elat",
     avg: [ 6.21, 7.45 ], std: [ 2.3, 1.77 ], fq: 3
   },
   "eleg": {
     dict: "anew-stem", word: "elegant", stem: "eleg",
     avg: [ 4.53, 7.43 ], std: [ 2.65, 1.26 ], fq: 14
   },
   "elev": {
     dict: "anew-stem", word: "elevator", stem: "elev",
     avg: [ 4.16, 5.44 ], std: [ 1.99, 1.18 ], fq: 12
   },
   "embarrass": {
     dict: "anew-stem", word: "embarrassed", stem: "embarrass",
     avg: [ 5.87, 3.03 ], std: [ 2.55, 1.85 ], fq: 8
   },
   "embattl": {
     dict: "anew-stem", word: "embattled", stem: "embattl",
     avg: [ 5.36, 4.39 ], std: [ 2.37, 1.63 ], fq: 1
   },
   "employ": {
     dict: "anew-stem", word: "employment", stem: "employ",
     avg: [ 5.28, 6.47 ], std: [ 2.12, 1.81 ], fq: 47
   },
   "engag": {
     dict: "anew-stem", word: "engaged", stem: "engag",
     avg: [ 6.77, 8 ], std: [ 2.07, 1.38 ], fq: 47
   },
   "engin": {
     dict: "anew-stem", word: "engine", stem: "engin",
     avg: [ 3.98, 5.2 ], std: [ 2.33, 1.18 ], fq: 50
   },
   "enjoy": {
     dict: "anew-stem", word: "enjoyment", stem: "enjoy",
     avg: [ 5.2, 7.8 ], std: [ 2.72, 1.2 ], fq: 21
   },
   "enrag": {
     dict: "anew-stem", word: "enraged", stem: "enrag",
     avg: [ 7.97, 2.46 ], std: [ 2.17, 1.65 ], fq: 1
   },
   "erot": {
     dict: "anew-stem", word: "erotic", stem: "erot",
     avg: [ 7.24, 7.43 ], std: [ 1.97, 1.53 ], fq: 8
   },
   "excel": {
     dict: "anew-stem", word: "excellence", stem: "excel",
     avg: [ 5.54, 8.38 ], std: [ 2.67, 0.96 ], fq: 15
   },
   "excit": {
     dict: "anew-stem", word: "excitement", stem: "excit",
     avg: [ 7.67, 7.5 ], std: [ 1.91, 2.2 ], fq: 32
   },
   "excus": {
     dict: "anew-stem", word: "excuse", stem: "excus",
     avg: [ 4.48, 4.05 ], std: [ 2.29, 1.41 ], fq: 27
   },
   "execut": {
     dict: "anew-stem", word: "execution", stem: "execut",
     avg: [ 5.71, 2.37 ], std: [ 2.74, 2.06 ], fq: 15
   },
   "exercis": {
     dict: "anew-stem", word: "exercise", stem: "exercis",
     avg: [ 6.84, 7.13 ], std: [ 2.06, 1.58 ], fq: 58
   },
   "failur": {
     dict: "anew-stem", word: "failure", stem: "failur",
     avg: [ 4.95, 1.7 ], std: [ 2.81, 1.07 ], fq: 89
   },
   "famili": {
     dict: "anew-stem", word: "family", stem: "famili",
     avg: [ 4.8, 7.65 ], std: [ 2.71, 1.55 ], fq: 331
   },
   "famou": {
     dict: "anew-stem", word: "famous", stem: "famou",
     avg: [ 5.73, 6.98 ], std: [ 2.68, 2.07 ], fq: 89
   },
   "fantasi": {
     dict: "anew-stem", word: "fantasy", stem: "fantasi",
     avg: [ 5.14, 7.41 ], std: [ 2.82, 1.9 ], fq: 14
   },
   "fascin": {
     dict: "anew-stem", word: "fascinate", stem: "fascin",
     avg: [ 5.83, 7.34 ], std: [ 2.73, 1.68 ], fq: 3
   },
   "fatigu": {
     dict: "anew-stem", word: "fatigued", stem: "fatigu",
     avg: [ 2.64, 3.28 ], std: [ 2.19, 1.43 ], fq: 3
   },
   "feebl": {
     dict: "anew-stem", word: "feeble", stem: "feebl",
     avg: [ 4.1, 3.26 ], std: [ 2.07, 1.47 ], fq: 8
   },
   "festiv": {
     dict: "anew-stem", word: "festive", stem: "festiv",
     avg: [ 6.58, 7.3 ], std: [ 2.29, 2.26 ], fq: 2
   },
   "firework": {
     dict: "anew-stem", word: "fireworks", stem: "firework",
     avg: [ 6.67, 7.55 ], std: [ 2.12, 1.5 ], fq: 5
   },
   "flabbi": {
     dict: "anew-stem", word: "flabby", stem: "flabbi",
     avg: [ 4.82, 2.66 ], std: [ 2.81, 1.87 ], fq: 0
   },
   "fragranc": {
     dict: "anew-stem", word: "fragrance", stem: "fragranc",
     avg: [ 4.79, 6.07 ], std: [ 2.54, 1.97 ], fq: 6
   },
   "friendli": {
     dict: "anew-stem", word: "friendly", stem: "friendli",
     avg: [ 5.11, 8.43 ], std: [ 2.96, 1.08 ], fq: 61
   },
   "frustrat": {
     dict: "anew-stem", word: "frustrated", stem: "frustrat",
     avg: [ 5.61, 2.48 ], std: [ 2.76, 1.64 ], fq: 10
   },
   "funer": {
     dict: "anew-stem", word: "funeral", stem: "funer",
     avg: [ 4.94, 1.39 ], std: [ 3.21, 0.87 ], fq: 33
   },
   "fungu": {
     dict: "anew-stem", word: "fungus", stem: "fungu",
     avg: [ 4.68, 3.06 ], std: [ 2.33, 1.75 ], fq: 2
   },
   "gangren": {
     dict: "anew-stem", word: "gangrene", stem: "gangren",
     avg: [ 5.7, 2.28 ], std: [ 2.96, 1.91 ], fq: 0
   },
   "garbag": {
     dict: "anew-stem", word: "garbage", stem: "garbag",
     avg: [ 5.04, 2.98 ], std: [ 2.5, 1.96 ], fq: 7
   },
   "gentl": {
     dict: "anew-stem", word: "gentle", stem: "gentl",
     avg: [ 3.21, 7.31 ], std: [ 2.57, 1.3 ], fq: 27
   },
   "germ": {
     dict: "anew-stem", word: "germs", stem: "germ",
     avg: [ 4.49, 2.86 ], std: [ 2.24, 1.39 ], fq: 1
   },
   "glori": {
     dict: "anew-stem", word: "glory", stem: "glori",
     avg: [ 6.02, 7.55 ], std: [ 2.71, 1.68 ], fq: 21
   },
   "graduat": {
     dict: "anew-stem", word: "graduate", stem: "graduat",
     avg: [ 7.25, 8.19 ], std: [ 2.25, 1.13 ], fq: 30
   },
   "grate": {
     dict: "anew-stem", word: "grateful", stem: "grate",
     avg: [ 4.58, 7.37 ], std: [ 2.14, 0.97 ], fq: 25
   },
   "grenad": {
     dict: "anew-stem", word: "grenade", stem: "grenad",
     avg: [ 5.7, 3.6 ], std: [ 2.52, 1.88 ], fq: 3
   },
   "guillotin": {
     dict: "anew-stem", word: "guillotine", stem: "guillotin",
     avg: [ 6.56, 2.48 ], std: [ 2.54, 2.11 ], fq: 0
   },
   "guilti": {
     dict: "anew-stem", word: "guilty", stem: "guilti",
     avg: [ 6.04, 2.63 ], std: [ 2.76, 1.98 ], fq: 29
   },
   "hamburg": {
     dict: "anew-stem", word: "hamburger", stem: "hamburg",
     avg: [ 4.55, 6.27 ], std: [ 2.14, 1.5 ], fq: 6
   },
   "handsom": {
     dict: "anew-stem", word: "handsome", stem: "handsom",
     avg: [ 5.95, 7.93 ], std: [ 2.73, 1.47 ], fq: 40
   },
   "happi": {
     dict: "anew-stem", word: "happy", stem: "happi",
     avg: [ 6.49, 8.21 ], std: [ 2.77, 1.82 ], fq: 98
   },
   "hatr": {
     dict: "anew-stem", word: "hatred", stem: "hatr",
     avg: [ 6.66, 1.98 ], std: [ 2.56, 1.92 ], fq: 20
   },
   "hai": {
     dict: "anew-stem", word: "hay", stem: "hai",
     avg: [ 3.95, 5.24 ], std: [ 2.58, 1.24 ], fq: 19
   },
   "headach": {
     dict: "anew-stem", word: "headache", stem: "headach",
     avg: [ 5.07, 2.02 ], std: [ 2.74, 1.06 ], fq: 5
   },
   "highwai": {
     dict: "anew-stem", word: "highway", stem: "highwai",
     avg: [ 5.16, 5.92 ], std: [ 2.44, 1.72 ], fq: 40
   },
   "histori": {
     dict: "anew-stem", word: "history", stem: "histori",
     avg: [ 3.93, 5.24 ], std: [ 2.29, 2.01 ], fq: 286
   },
   "holidai": {
     dict: "anew-stem", word: "holiday", stem: "holidai",
     avg: [ 6.59, 7.55 ], std: [ 2.73, 2.14 ], fq: 17
   },
   "honei": {
     dict: "anew-stem", word: "honey", stem: "honei",
     avg: [ 4.51, 6.73 ], std: [ 2.25, 1.7 ], fq: 25
   },
   "hors": {
     dict: "anew-stem", word: "horse", stem: "hors",
     avg: [ 3.89, 5.89 ], std: [ 2.17, 1.55 ], fq: 117
   },
   "hospit": {
     dict: "anew-stem", word: "hospital", stem: "hospit",
     avg: [ 5.98, 5.04 ], std: [ 2.54, 2.45 ], fq: 110
   },
   "hostag": {
     dict: "anew-stem", word: "hostage", stem: "hostag",
     avg: [ 6.76, 2.2 ], std: [ 2.63, 1.8 ], fq: 2
   },
   "hostil": {
     dict: "anew-stem", word: "hostile", stem: "hostil",
     avg: [ 6.44, 2.73 ], std: [ 2.28, 1.5 ], fq: 19
   },
   "hous": {
     dict: "anew-stem", word: "house", stem: "hous",
     avg: [ 4.56, 7.26 ], std: [ 2.41, 1.72 ], fq: 591
   },
   "human": {
     dict: "anew-stem", word: "humane", stem: "human",
     avg: [ 4.5, 6.89 ], std: [ 1.91, 1.7 ], fq: 5
   },
   "humbl": {
     dict: "anew-stem", word: "humble", stem: "humbl",
     avg: [ 3.74, 5.86 ], std: [ 2.33, 1.42 ], fq: 18
   },
   "humili": {
     dict: "anew-stem", word: "humiliate", stem: "humili",
     avg: [ 6.14, 2.24 ], std: [ 2.42, 1.34 ], fq: 0
   },
   "hungri": {
     dict: "anew-stem", word: "hungry", stem: "hungri",
     avg: [ 5.13, 3.58 ], std: [ 2.44, 2.01 ], fq: 23
   },
   "hurrican": {
     dict: "anew-stem", word: "hurricane", stem: "hurrican",
     avg: [ 6.83, 3.34 ], std: [ 2.06, 2.12 ], fq: 8
   },
   "ident": {
     dict: "anew-stem", word: "identity", stem: "ident",
     avg: [ 4.95, 6.57 ], std: [ 2.24, 1.99 ], fq: 55
   },
   "ignor": {
     dict: "anew-stem", word: "ignorance", stem: "ignor",
     avg: [ 4.39, 3.07 ], std: [ 2.49, 2.25 ], fq: 16
   },
   "ill": {
     dict: "anew-stem", word: "illness", stem: "ill",
     avg: [ 4.71, 2.48 ], std: [ 2.24, 1.4 ], fq: 20
   },
   "imagin": {
     dict: "anew-stem", word: "imagine", stem: "imagin",
     avg: [ 5.98, 7.32 ], std: [ 2.14, 1.52 ], fq: 61
   },
   "immatur": {
     dict: "anew-stem", word: "immature", stem: "immatur",
     avg: [ 4.15, 3.39 ], std: [ 1.96, 1.7 ], fq: 7
   },
   "immor": {
     dict: "anew-stem", word: "immoral", stem: "immor",
     avg: [ 4.98, 3.5 ], std: [ 2.48, 2.16 ], fq: 5
   },
   "impot": {
     dict: "anew-stem", word: "impotent", stem: "impot",
     avg: [ 4.57, 2.81 ], std: [ 2.59, 1.92 ], fq: 2
   },
   "impress": {
     dict: "anew-stem", word: "impressed", stem: "impress",
     avg: [ 5.42, 7.33 ], std: [ 2.65, 1.84 ], fq: 30
   },
   "improv": {
     dict: "anew-stem", word: "improve", stem: "improv",
     avg: [ 5.69, 7.65 ], std: [ 2.15, 1.16 ], fq: 39
   },
   "incent": {
     dict: "anew-stem", word: "incentive", stem: "incent",
     avg: [ 5.69, 7 ], std: [ 2.45, 1.72 ], fq: 12
   },
   "indiffer": {
     dict: "anew-stem", word: "indifferent", stem: "indiffer",
     avg: [ 3.18, 4.61 ], std: [ 1.85, 1.28 ], fq: 11
   },
   "industri": {
     dict: "anew-stem", word: "industry", stem: "industri",
     avg: [ 4.47, 5.3 ], std: [ 2.43, 1.61 ], fq: 171
   },
   "infatu": {
     dict: "anew-stem", word: "infatuation", stem: "infatu",
     avg: [ 7.02, 6.73 ], std: [ 1.87, 2.08 ], fq: 4
   },
   "infect": {
     dict: "anew-stem", word: "infection", stem: "infect",
     avg: [ 5.03, 1.66 ], std: [ 2.77, 1.34 ], fq: 8
   },
   "inhabit": {
     dict: "anew-stem", word: "inhabitant", stem: "inhabit",
     avg: [ 3.95, 5.05 ], std: [ 1.97, 1.34 ], fq: 0
   },
   "injuri": {
     dict: "anew-stem", word: "injury", stem: "injuri",
     avg: [ 5.69, 2.49 ], std: [ 2.06, 1.76 ], fq: 27
   },
   "innoc": {
     dict: "anew-stem", word: "innocent", stem: "innoc",
     avg: [ 4.21, 6.51 ], std: [ 1.99, 1.34 ], fq: 37
   },
   "insan": {
     dict: "anew-stem", word: "insane", stem: "insan",
     avg: [ 5.83, 2.85 ], std: [ 2.45, 1.94 ], fq: 13
   },
   "insecur": {
     dict: "anew-stem", word: "insecure", stem: "insecur",
     avg: [ 5.56, 2.36 ], std: [ 2.34, 1.33 ], fq: 3
   },
   "insol": {
     dict: "anew-stem", word: "insolent", stem: "insol",
     avg: [ 5.38, 4.35 ], std: [ 2.37, 1.76 ], fq: 2
   },
   "inspir": {
     dict: "anew-stem", word: "inspire", stem: "inspir",
     avg: [ 5, 6.97 ], std: [ 2.53, 1.91 ], fq: 3
   },
   "intercours": {
     dict: "anew-stem", word: "intercourse", stem: "intercours",
     avg: [ 7, 7.36 ], std: [ 2.07, 1.57 ], fq: 9
   },
   "intim": {
     dict: "anew-stem", word: "intimate", stem: "intim",
     avg: [ 6.98, 7.61 ], std: [ 2.21, 1.51 ], fq: 21
   },
   "intrud": {
     dict: "anew-stem", word: "intruder", stem: "intrud",
     avg: [ 6.86, 2.77 ], std: [ 2.41, 2.32 ], fq: 1
   },
   "invad": {
     dict: "anew-stem", word: "invader", stem: "invad",
     avg: [ 5.5, 3.05 ], std: [ 2.4, 2.01 ], fq: 1
   },
   "irrit": {
     dict: "anew-stem", word: "irritate", stem: "irrit",
     avg: [ 5.76, 3.11 ], std: [ 2.15, 1.67 ], fq: 0
   },
   "jealousi": {
     dict: "anew-stem", word: "jealousy", stem: "jealousi",
     avg: [ 6.36, 2.51 ], std: [ 2.66, 1.83 ], fq: 4
   },
   "jelli": {
     dict: "anew-stem", word: "jelly", stem: "jelli",
     avg: [ 3.7, 5.66 ], std: [ 2.29, 1.44 ], fq: 3
   },
   "jolli": {
     dict: "anew-stem", word: "jolly", stem: "jolli",
     avg: [ 5.57, 7.41 ], std: [ 2.8, 1.92 ], fq: 4
   },
   "joi": {
     dict: "anew-stem", word: "joy", stem: "joi",
     avg: [ 7.22, 8.6 ], std: [ 2.13, 0.71 ], fq: 40
   },
   "joy": {
     dict: "anew-stem", word: "joyful", stem: "joy",
     avg: [ 5.98, 8.22 ], std: [ 2.54, 1.22 ], fq: 1
   },
   "justic": {
     dict: "anew-stem", word: "justice", stem: "justic",
     avg: [ 5.47, 7.78 ], std: [ 2.54, 1.35 ], fq: 114
   },
   "kerosen": {
     dict: "anew-stem", word: "kerosene", stem: "kerosen",
     avg: [ 4.34, 4.8 ], std: [ 2.51, 1.59 ], fq: 6
   },
   "kettl": {
     dict: "anew-stem", word: "kettle", stem: "kettl",
     avg: [ 3.22, 5.22 ], std: [ 2.23, 0.91 ], fq: 3
   },
   "kei": {
     dict: "anew-stem", word: "key", stem: "kei",
     avg: [ 3.7, 5.68 ], std: [ 2.18, 1.62 ], fq: 88
   },
   "kid": {
     dict: "anew-stem", word: "kids", stem: "kid",
     avg: [ 5.27, 6.91 ], std: [ 2.36, 1.99 ], fq: 32
   },
   "knowledg": {
     dict: "anew-stem", word: "knowledge", stem: "knowledg",
     avg: [ 5.92, 7.58 ], std: [ 2.32, 1.32 ], fq: 145
   },
   "lazi": {
     dict: "anew-stem", word: "lazy", stem: "lazi",
     avg: [ 2.65, 4.38 ], std: [ 2.06, 2.02 ], fq: 9
   },
   "leisur": {
     dict: "anew-stem", word: "leisurely", stem: "leisur",
     avg: [ 3.8, 6.88 ], std: [ 2.38, 1.81 ], fq: 5
   },
   "leprosi": {
     dict: "anew-stem", word: "leprosy", stem: "leprosi",
     avg: [ 6.29, 2.09 ], std: [ 2.23, 1.4 ], fq: 1
   },
   "liberti": {
     dict: "anew-stem", word: "liberty", stem: "liberti",
     avg: [ 5.6, 7.98 ], std: [ 2.65, 1.22 ], fq: 46
   },
   "lighthous": {
     dict: "anew-stem", word: "lighthouse", stem: "lighthous",
     avg: [ 4.41, 5.89 ], std: [ 2.44, 2.08 ], fq: 0
   },
   "lightn": {
     dict: "anew-stem", word: "lightning", stem: "lightn",
     avg: [ 6.61, 4.57 ], std: [ 1.77, 2.66 ], fq: 14
   },
   "live": {
     dict: "anew-stem", word: "lively", stem: "live",
     avg: [ 5.53, 7.2 ], std: [ 2.9, 1.97 ], fq: 26
   },
   "loneli": {
     dict: "anew-stem", word: "loneliness", stem: "loneli",
     avg: [ 4.56, 1.61 ], std: [ 2.97, 1.02 ], fq: 9
   },
   "lone": {
     dict: "anew-stem", word: "lonely", stem: "lone",
     avg: [ 4.51, 2.17 ], std: [ 2.68, 1.76 ], fq: 25
   },
   "lotteri": {
     dict: "anew-stem", word: "lottery", stem: "lotteri",
     avg: [ 5.36, 6.57 ], std: [ 2.45, 2.04 ], fq: 1
   },
   "lous": {
     dict: "anew-stem", word: "louse", stem: "lous",
     avg: [ 4.98, 2.81 ], std: [ 2.03, 1.92 ], fq: 3
   },
   "lucki": {
     dict: "anew-stem", word: "lucky", stem: "lucki",
     avg: [ 6.53, 8.17 ], std: [ 2.34, 1.06 ], fq: 21
   },
   "lusciou": {
     dict: "anew-stem", word: "luscious", stem: "lusciou",
     avg: [ 5.34, 7.5 ], std: [ 2.51, 1.08 ], fq: 2
   },
   "luxuri": {
     dict: "anew-stem", word: "luxury", stem: "luxuri",
     avg: [ 4.75, 7.88 ], std: [ 2.91, 1.49 ], fq: 21
   },
   "machin": {
     dict: "anew-stem", word: "machine", stem: "machin",
     avg: [ 3.82, 5.09 ], std: [ 2.4, 1.67 ], fq: 103
   },
   "magic": {
     dict: "anew-stem", word: "magical", stem: "magic",
     avg: [ 5.95, 7.46 ], std: [ 2.36, 1.64 ], fq: 12
   },
   "malic": {
     dict: "anew-stem", word: "malice", stem: "malic",
     avg: [ 5.86, 2.69 ], std: [ 2.75, 1.84 ], fq: 2
   },
   "mangl": {
     dict: "anew-stem", word: "mangle", stem: "mangl",
     avg: [ 5.44, 3.9 ], std: [ 2.1, 2.01 ], fq: 0
   },
   "manur": {
     dict: "anew-stem", word: "manure", stem: "manur",
     avg: [ 4.17, 3.1 ], std: [ 2.09, 1.74 ], fq: 6
   },
   "massacr": {
     dict: "anew-stem", word: "massacre", stem: "massacr",
     avg: [ 5.33, 2.28 ], std: [ 2.63, 1.74 ], fq: 1
   },
   "master": {
     dict: "anew-stem", word: "masterful", stem: "master",
     avg: [ 5.2, 7.09 ], std: [ 2.85, 1.78 ], fq: 2
   },
   "masturb": {
     dict: "anew-stem", word: "masturbate", stem: "masturb",
     avg: [ 5.67, 5.45 ], std: [ 2.18, 2.02 ], fq: 0
   },
   "materi": {
     dict: "anew-stem", word: "material", stem: "materi",
     avg: [ 4.05, 5.26 ], std: [ 2.34, 1.29 ], fq: 174
   },
   "measl": {
     dict: "anew-stem", word: "measles", stem: "measl",
     avg: [ 5.06, 2.74 ], std: [ 2.44, 1.97 ], fq: 2
   },
   "medicin": {
     dict: "anew-stem", word: "medicine", stem: "medicin",
     avg: [ 4.4, 5.67 ], std: [ 2.36, 2.06 ], fq: 30
   },
   "melodi": {
     dict: "anew-stem", word: "melody", stem: "melodi",
     avg: [ 4.98, 7.07 ], std: [ 2.52, 1.79 ], fq: 21
   },
   "memori": {
     dict: "anew-stem", word: "memories", stem: "memori",
     avg: [ 6.1, 7.48 ], std: [ 2.1, 1.61 ], fq: 15
   },
   "menac": {
     dict: "anew-stem", word: "menace", stem: "menac",
     avg: [ 5.52, 2.88 ], std: [ 2.45, 1.64 ], fq: 9
   },
   "merri": {
     dict: "anew-stem", word: "merry", stem: "merri",
     avg: [ 5.9, 7.9 ], std: [ 2.42, 1.49 ], fq: 8
   },
   "messi": {
     dict: "anew-stem", word: "messy", stem: "messi",
     avg: [ 3.34, 3.15 ], std: [ 2.37, 1.73 ], fq: 3
   },
   "mighti": {
     dict: "anew-stem", word: "mighty", stem: "mighti",
     avg: [ 5.61, 6.54 ], std: [ 2.38, 2.19 ], fq: 29
   },
   "millionair": {
     dict: "anew-stem", word: "millionaire", stem: "millionair",
     avg: [ 6.14, 8.03 ], std: [ 2.7, 1.42 ], fq: 2
   },
   "miracl": {
     dict: "anew-stem", word: "miracle", stem: "miracl",
     avg: [ 7.65, 8.6 ], std: [ 1.67, 0.71 ], fq: 16
   },
   "miseri": {
     dict: "anew-stem", word: "misery", stem: "miseri",
     avg: [ 5.17, 1.93 ], std: [ 2.69, 1.6 ], fq: 15
   },
   "mistak": {
     dict: "anew-stem", word: "mistake", stem: "mistak",
     avg: [ 5.18, 2.86 ], std: [ 2.42, 1.79 ], fq: 34
   },
   "mobil": {
     dict: "anew-stem", word: "mobility", stem: "mobil",
     avg: [ 5, 6.83 ], std: [ 2.18, 1.79 ], fq: 8
   },
   "monei": {
     dict: "anew-stem", word: "money", stem: "monei",
     avg: [ 5.7, 7.59 ], std: [ 2.66, 1.4 ], fq: 265
   },
   "moodi": {
     dict: "anew-stem", word: "moody", stem: "moodi",
     avg: [ 4.18, 3.2 ], std: [ 2.38, 1.58 ], fq: 5
   },
   "morgu": {
     dict: "anew-stem", word: "morgue", stem: "morgu",
     avg: [ 4.84, 1.92 ], std: [ 2.96, 1.32 ], fq: 1
   },
   "movi": {
     dict: "anew-stem", word: "movie", stem: "movi",
     avg: [ 4.93, 6.86 ], std: [ 2.54, 1.81 ], fq: 29
   },
   "mucu": {
     dict: "anew-stem", word: "mucus", stem: "mucu",
     avg: [ 3.41, 3.34 ], std: [ 2.17, 2.29 ], fq: 2
   },
   "muddi": {
     dict: "anew-stem", word: "muddy", stem: "muddi",
     avg: [ 4.13, 4.44 ], std: [ 2.13, 2.07 ], fq: 10
   },
   "murder": {
     dict: "anew-stem", word: "murderer", stem: "murder",
     avg: [ 7.47, 1.53 ], std: [ 2.18, 0.96 ], fq: 19
   },
   "mutat": {
     dict: "anew-stem", word: "mutation", stem: "mutat",
     avg: [ 4.84, 3.91 ], std: [ 2.52, 2.44 ], fq: 0
   },
   "mutil": {
     dict: "anew-stem", word: "mutilate", stem: "mutil",
     avg: [ 6.41, 1.82 ], std: [ 2.94, 1.45 ], fq: 3
   },
   "nake": {
     dict: "anew-stem", word: "naked", stem: "nake",
     avg: [ 5.8, 6.34 ], std: [ 2.8, 2.42 ], fq: 32
   },
   "narcot": {
     dict: "anew-stem", word: "narcotic", stem: "narcot",
     avg: [ 4.93, 4.29 ], std: [ 2.57, 2.3 ], fq: 2
   },
   "nasti": {
     dict: "anew-stem", word: "nasty", stem: "nasti",
     avg: [ 4.89, 3.58 ], std: [ 2.5, 2.38 ], fq: 5
   },
   "natur": {
     dict: "anew-stem", word: "natural", stem: "natur",
     avg: [ 4.09, 6.59 ], std: [ 2.37, 1.57 ], fq: 156
   },
   "needl": {
     dict: "anew-stem", word: "needle", stem: "needl",
     avg: [ 5.36, 3.82 ], std: [ 2.89, 1.73 ], fq: 15
   },
   "nervou": {
     dict: "anew-stem", word: "nervous", stem: "nervou",
     avg: [ 6.59, 3.29 ], std: [ 2.07, 1.47 ], fq: 24
   },
   "neurot": {
     dict: "anew-stem", word: "neurotic", stem: "neurot",
     avg: [ 5.13, 4.45 ], std: [ 2.76, 2.23 ], fq: 10
   },
   "new": {
     dict: "anew-stem", word: "news", stem: "new",
     avg: [ 5.17, 5.3 ], std: [ 2.11, 1.67 ], fq: 102
   },
   "nightmar": {
     dict: "anew-stem", word: "nightmare", stem: "nightmar",
     avg: [ 7.59, 1.91 ], std: [ 2.23, 1.54 ], fq: 9
   },
   "nippl": {
     dict: "anew-stem", word: "nipple", stem: "nippl",
     avg: [ 5.56, 6.27 ], std: [ 2.55, 1.81 ], fq: 0
   },
   "noisi": {
     dict: "anew-stem", word: "noisy", stem: "noisi",
     avg: [ 6.38, 5.02 ], std: [ 1.78, 2.02 ], fq: 6
   },
   "nonchal": {
     dict: "anew-stem", word: "nonchalant", stem: "nonchal",
     avg: [ 3.12, 4.74 ], std: [ 1.93, 1.11 ], fq: 1
   },
   "nonsens": {
     dict: "anew-stem", word: "nonsense", stem: "nonsens",
     avg: [ 4.17, 4.61 ], std: [ 2.02, 1.63 ], fq: 13
   },
   "noos": {
     dict: "anew-stem", word: "noose", stem: "noos",
     avg: [ 4.39, 3.76 ], std: [ 2.08, 1.64 ], fq: 3
   },
   "nuisanc": {
     dict: "anew-stem", word: "nuisance", stem: "nuisanc",
     avg: [ 4.49, 3.27 ], std: [ 2.69, 1.86 ], fq: 5
   },
   "nurs": {
     dict: "anew-stem", word: "nurse", stem: "nurs",
     avg: [ 4.84, 6.08 ], std: [ 2.04, 2.08 ], fq: 17
   },
   "nurseri": {
     dict: "anew-stem", word: "nursery", stem: "nurseri",
     avg: [ 4.04, 5.73 ], std: [ 2.74, 2.3 ], fq: 13
   },
   "obes": {
     dict: "anew-stem", word: "obesity", stem: "obes",
     avg: [ 3.87, 2.73 ], std: [ 2.82, 1.85 ], fq: 5
   },
   "obei": {
     dict: "anew-stem", word: "obey", stem: "obei",
     avg: [ 4.23, 4.52 ], std: [ 1.72, 1.88 ], fq: 8
   },
   "obnoxi": {
     dict: "anew-stem", word: "obnoxious", stem: "obnoxi",
     avg: [ 4.74, 3.5 ], std: [ 2.42, 2.18 ], fq: 5
   },
   "obscen": {
     dict: "anew-stem", word: "obscene", stem: "obscen",
     avg: [ 5.04, 4.23 ], std: [ 2.3, 2.3 ], fq: 2
   },
   "obsess": {
     dict: "anew-stem", word: "obsession", stem: "obsess",
     avg: [ 6.41, 4.52 ], std: [ 2.13, 2.13 ], fq: 5
   },
   "offic": {
     dict: "anew-stem", word: "office", stem: "offic",
     avg: [ 4.08, 5.24 ], std: [ 1.92, 1.59 ], fq: 255
   },
   "optim": {
     dict: "anew-stem", word: "optimism", stem: "optim",
     avg: [ 5.34, 6.95 ], std: [ 2.58, 2.24 ], fq: 15
   },
   "outdoor": {
     dict: "anew-stem", word: "outdoors", stem: "outdoor",
     avg: [ 5.92, 7.47 ], std: [ 2.55, 1.8 ], fq: 6
   },
   "outrag": {
     dict: "anew-stem", word: "outrage", stem: "outrag",
     avg: [ 6.83, 3.52 ], std: [ 2.26, 2.12 ], fq: 4
   },
   "outstand": {
     dict: "anew-stem", word: "outstanding", stem: "outstand",
     avg: [ 6.24, 7.75 ], std: [ 2.59, 1.75 ], fq: 37
   },
   "overwhelm": {
     dict: "anew-stem", word: "overwhelmed", stem: "overwhelm",
     avg: [ 7, 4.19 ], std: [ 2.37, 2.61 ], fq: 4
   },
   "palac": {
     dict: "anew-stem", word: "palace", stem: "palac",
     avg: [ 5.1, 7.19 ], std: [ 2.75, 1.78 ], fq: 38
   },
   "pancak": {
     dict: "anew-stem", word: "pancakes", stem: "pancak",
     avg: [ 4.06, 6.08 ], std: [ 2.13, 1.83 ], fq: 0
   },
   "paradis": {
     dict: "anew-stem", word: "paradise", stem: "paradis",
     avg: [ 5.12, 8.72 ], std: [ 3.38, 0.6 ], fq: 12
   },
   "paralysi": {
     dict: "anew-stem", word: "paralysis", stem: "paralysi",
     avg: [ 4.73, 1.98 ], std: [ 2.83, 1.44 ], fq: 6
   },
   "parti": {
     dict: "anew-stem", word: "party", stem: "parti",
     avg: [ 6.69, 7.86 ], std: [ 2.84, 1.83 ], fq: 216
   },
   "passag": {
     dict: "anew-stem", word: "passage", stem: "passag",
     avg: [ 4.36, 5.28 ], std: [ 2.13, 1.44 ], fq: 49
   },
   "peac": {
     dict: "anew-stem", word: "peace", stem: "peac",
     avg: [ 2.95, 7.72 ], std: [ 2.55, 1.75 ], fq: 198
   },
   "penalti": {
     dict: "anew-stem", word: "penalty", stem: "penalti",
     avg: [ 5.1, 2.83 ], std: [ 2.31, 1.56 ], fq: 14
   },
   "peni": {
     dict: "anew-stem", word: "penis", stem: "peni",
     avg: [ 5.54, 5.9 ], std: [ 2.63, 1.72 ], fq: 0
   },
   "penthous": {
     dict: "anew-stem", word: "penthouse", stem: "penthous",
     avg: [ 5.52, 6.81 ], std: [ 2.49, 1.64 ], fq: 1
   },
   "peopl": {
     dict: "anew-stem", word: "people", stem: "peopl",
     avg: [ 5.94, 7.33 ], std: [ 2.09, 1.7 ], fq: 847
   },
   "perfect": {
     dict: "anew-stem", word: "perfection", stem: "perfect",
     avg: [ 5.95, 7.25 ], std: [ 2.73, 2.05 ], fq: 11
   },
   "perfum": {
     dict: "anew-stem", word: "perfume", stem: "perfum",
     avg: [ 5.05, 6.76 ], std: [ 2.36, 1.48 ], fq: 10
   },
   "piti": {
     dict: "anew-stem", word: "pity", stem: "piti",
     avg: [ 3.72, 3.37 ], std: [ 2.02, 1.57 ], fq: 14
   },
   "pleasur": {
     dict: "anew-stem", word: "pleasure", stem: "pleasur",
     avg: [ 5.74, 8.28 ], std: [ 2.81, 0.92 ], fq: 62
   },
   "poetri": {
     dict: "anew-stem", word: "poetry", stem: "poetri",
     avg: [ 4, 5.86 ], std: [ 2.85, 1.91 ], fq: 88
   },
   "polit": {
     dict: "anew-stem", word: "politeness", stem: "polit",
     avg: [ 3.74, 7.18 ], std: [ 2.37, 1.5 ], fq: 5
   },
   "pollut": {
     dict: "anew-stem", word: "pollute", stem: "pollut",
     avg: [ 6.08, 1.85 ], std: [ 2.42, 1.11 ], fq: 1
   },
   "poverti": {
     dict: "anew-stem", word: "poverty", stem: "poverti",
     avg: [ 4.87, 1.67 ], std: [ 2.66, 0.9 ], fq: 20
   },
   "prairi": {
     dict: "anew-stem", word: "prairie", stem: "prairi",
     avg: [ 3.41, 5.75 ], std: [ 2.17, 1.43 ], fq: 21
   },
   "pressur": {
     dict: "anew-stem", word: "pressure", stem: "pressur",
     avg: [ 6.07, 3.38 ], std: [ 2.26, 1.61 ], fq: 185
   },
   "prestig": {
     dict: "anew-stem", word: "prestige", stem: "prestig",
     avg: [ 5.86, 7.26 ], std: [ 2.08, 1.9 ], fq: 29
   },
   "pretti": {
     dict: "anew-stem", word: "pretty", stem: "pretti",
     avg: [ 6.03, 7.75 ], std: [ 2.22, 1.26 ], fq: 107
   },
   "privaci": {
     dict: "anew-stem", word: "privacy", stem: "privaci",
     avg: [ 4.12, 5.88 ], std: [ 1.83, 1.5 ], fq: 12
   },
   "promot": {
     dict: "anew-stem", word: "promotion", stem: "promot",
     avg: [ 6.44, 8.2 ], std: [ 2.58, 1.15 ], fq: 26
   },
   "protect": {
     dict: "anew-stem", word: "protected", stem: "protect",
     avg: [ 4.09, 7.29 ], std: [ 2.77, 1.79 ], fq: 31
   },
   "punish": {
     dict: "anew-stem", word: "punishment", stem: "punish",
     avg: [ 5.93, 2.22 ], std: [ 2.4, 1.41 ], fq: 21
   },
   "puppi": {
     dict: "anew-stem", word: "puppy", stem: "puppi",
     avg: [ 5.85, 7.56 ], std: [ 2.78, 1.9 ], fq: 2
   },
   "pu": {
     dict: "anew-stem", word: "pus", stem: "pu",
     avg: [ 4.82, 2.86 ], std: [ 2.06, 1.91 ], fq: 0
   },
   "qualiti": {
     dict: "anew-stem", word: "quality", stem: "qualiti",
     avg: [ 4.48, 6.25 ], std: [ 2.12, 1.59 ], fq: 114
   },
   "rabi": {
     dict: "anew-stem", word: "rabies", stem: "rabi",
     avg: [ 6.1, 1.77 ], std: [ 2.62, 0.97 ], fq: 1
   },
   "radiat": {
     dict: "anew-stem", word: "radiator", stem: "radiat",
     avg: [ 4.02, 4.67 ], std: [ 1.94, 1.05 ], fq: 4
   },
   "rattl": {
     dict: "anew-stem", word: "rattle", stem: "rattl",
     avg: [ 4.36, 5.03 ], std: [ 2.18, 1.23 ], fq: 5
   },
   "refresh": {
     dict: "anew-stem", word: "refreshment", stem: "refresh",
     avg: [ 4.45, 7.44 ], std: [ 2.7, 1.29 ], fq: 2
   },
   "regret": {
     dict: "anew-stem", word: "regretful", stem: "regret",
     avg: [ 5.74, 2.28 ], std: [ 2.32, 1.42 ], fq: 1
   },
   "reject": {
     dict: "anew-stem", word: "rejected", stem: "reject",
     avg: [ 6.37, 1.5 ], std: [ 2.56, 1.09 ], fq: 33
   },
   "relax": {
     dict: "anew-stem", word: "relaxed", stem: "relax",
     avg: [ 2.39, 7 ], std: [ 2.13, 1.77 ], fq: 14
   },
   "repent": {
     dict: "anew-stem", word: "repentant", stem: "repent",
     avg: [ 4.69, 5.53 ], std: [ 1.98, 1.86 ], fq: 1
   },
   "reptil": {
     dict: "anew-stem", word: "reptile", stem: "reptil",
     avg: [ 5.18, 4.77 ], std: [ 2.19, 2 ], fq: 0
   },
   "rescu": {
     dict: "anew-stem", word: "rescue", stem: "rescu",
     avg: [ 6.53, 7.7 ], std: [ 2.56, 1.24 ], fq: 15
   },
   "reserv": {
     dict: "anew-stem", word: "reserved", stem: "reserv",
     avg: [ 3.27, 4.88 ], std: [ 2.05, 1.83 ], fq: 27
   },
   "restaur": {
     dict: "anew-stem", word: "restaurant", stem: "restaur",
     avg: [ 5.41, 6.76 ], std: [ 2.55, 1.85 ], fq: 41
   },
   "rever": {
     dict: "anew-stem", word: "reverent", stem: "rever",
     avg: [ 4, 5.35 ], std: [ 1.6, 1.21 ], fq: 3
   },
   "revolv": {
     dict: "anew-stem", word: "revolver", stem: "revolv",
     avg: [ 5.55, 4.02 ], std: [ 2.39, 2.44 ], fq: 14
   },
   "rich": {
     dict: "anew-stem", word: "riches", stem: "rich",
     avg: [ 6.17, 7.7 ], std: [ 2.7, 1.95 ], fq: 2
   },
   "ridicul": {
     dict: "anew-stem", word: "ridicule", stem: "ridicul",
     avg: [ 5.83, 3.13 ], std: [ 2.73, 2.24 ], fq: 5
   },
   "rifl": {
     dict: "anew-stem", word: "rifle", stem: "rifl",
     avg: [ 6.35, 4.02 ], std: [ 2.04, 2.76 ], fq: 63
   },
   "rollercoast": {
     dict: "anew-stem", word: "rollercoaster", stem: "rollercoast",
     avg: [ 8.06, 8.02 ], std: [ 1.71, 1.63 ], fq: 0
   },
   "romant": {
     dict: "anew-stem", word: "romantic", stem: "romant",
     avg: [ 7.59, 8.32 ], std: [ 2.07, 1 ], fq: 32
   },
   "rusti": {
     dict: "anew-stem", word: "rusty", stem: "rusti",
     avg: [ 3.77, 3.86 ], std: [ 2.16, 1.47 ], fq: 8
   },
   "salut": {
     dict: "anew-stem", word: "salute", stem: "salut",
     avg: [ 5.31, 5.92 ], std: [ 2.23, 1.57 ], fq: 3
   },
   "sapphir": {
     dict: "anew-stem", word: "sapphire", stem: "sapphir",
     avg: [ 5, 7 ], std: [ 2.72, 1.88 ], fq: 0
   },
   "satisfi": {
     dict: "anew-stem", word: "satisfied", stem: "satisfi",
     avg: [ 4.94, 7.94 ], std: [ 2.63, 1.19 ], fq: 36
   },
   "scald": {
     dict: "anew-stem", word: "scalding", stem: "scald",
     avg: [ 5.95, 2.82 ], std: [ 2.55, 2.12 ], fq: 1
   },
   "scare": {
     dict: "anew-stem", word: "scared", stem: "scare",
     avg: [ 6.82, 2.78 ], std: [ 2.03, 1.99 ], fq: 21
   },
   "scissor": {
     dict: "anew-stem", word: "scissors", stem: "scissor",
     avg: [ 4.47, 5.05 ], std: [ 1.76, 0.96 ], fq: 1
   },
   "scorch": {
     dict: "anew-stem", word: "scorching", stem: "scorch",
     avg: [ 5, 3.76 ], std: [ 2.74, 1.83 ], fq: 0
   },
   "scurvi": {
     dict: "anew-stem", word: "scurvy", stem: "scurvi",
     avg: [ 4.71, 3.19 ], std: [ 2.72, 2 ], fq: 1
   },
   "secur": {
     dict: "anew-stem", word: "secure", stem: "secur",
     avg: [ 3.14, 7.57 ], std: [ 2.47, 1.76 ], fq: 30
   },
   "seriou": {
     dict: "anew-stem", word: "serious", stem: "seriou",
     avg: [ 4, 5.08 ], std: [ 1.87, 1.59 ], fq: 116
   },
   "sever": {
     dict: "anew-stem", word: "severe", stem: "sever",
     avg: [ 5.26, 3.2 ], std: [ 2.36, 1.74 ], fq: 39
   },
   "sexi": {
     dict: "anew-stem", word: "sexy", stem: "sexi",
     avg: [ 7.36, 8.02 ], std: [ 1.91, 1.12 ], fq: 2
   },
   "shame": {
     dict: "anew-stem", word: "shamed", stem: "shame",
     avg: [ 4.88, 2.5 ], std: [ 2.27, 1.34 ], fq: 1
   },
   "shelter": {
     dict: "anew-stem", word: "sheltered", stem: "shelter",
     avg: [ 4.28, 5.75 ], std: [ 1.77, 1.92 ], fq: 4
   },
   "silli": {
     dict: "anew-stem", word: "silly", stem: "silli",
     avg: [ 5.88, 7.41 ], std: [ 2.38, 1.8 ], fq: 15
   },
   "sissi": {
     dict: "anew-stem", word: "sissy", stem: "sissi",
     avg: [ 5.17, 3.14 ], std: [ 2.57, 1.96 ], fq: 0
   },
   "skeptic": {
     dict: "anew-stem", word: "skeptical", stem: "skeptic",
     avg: [ 4.91, 4.52 ], std: [ 1.92, 1.63 ], fq: 7
   },
   "skyscrap": {
     dict: "anew-stem", word: "skyscraper", stem: "skyscrap",
     avg: [ 5.71, 5.88 ], std: [ 2.17, 1.87 ], fq: 2
   },
   "snuggl": {
     dict: "anew-stem", word: "snuggle", stem: "snuggl",
     avg: [ 4.16, 7.92 ], std: [ 2.8, 1.24 ], fq: 4
   },
   "sooth": {
     dict: "anew-stem", word: "soothe", stem: "sooth",
     avg: [ 4.4, 7.3 ], std: [ 3.08, 1.85 ], fq: 2
   },
   "spank": {
     dict: "anew-stem", word: "spanking", stem: "spank",
     avg: [ 5.41, 3.55 ], std: [ 2.73, 2.54 ], fq: 0
   },
   "spous": {
     dict: "anew-stem", word: "spouse", stem: "spous",
     avg: [ 5.21, 7.58 ], std: [ 2.75, 1.48 ], fq: 3
   },
   "sprai": {
     dict: "anew-stem", word: "spray", stem: "sprai",
     avg: [ 4.14, 5.45 ], std: [ 2.28, 1.63 ], fq: 16
   },
   "squar": {
     dict: "anew-stem", word: "square", stem: "squar",
     avg: [ 3.18, 4.74 ], std: [ 1.76, 1.02 ], fq: 143
   },
   "startl": {
     dict: "anew-stem", word: "startled", stem: "startl",
     avg: [ 6.93, 4.5 ], std: [ 2.24, 1.67 ], fq: 21
   },
   "starv": {
     dict: "anew-stem", word: "starving", stem: "starv",
     avg: [ 5.61, 2.39 ], std: [ 2.53, 1.82 ], fq: 6
   },
   "statu": {
     dict: "anew-stem", word: "statue", stem: "statu",
     avg: [ 3.46, 5.17 ], std: [ 1.72, 0.7 ], fq: 17
   },
   "subdu": {
     dict: "anew-stem", word: "subdued", stem: "subdu",
     avg: [ 2.9, 4.67 ], std: [ 1.81, 1.31 ], fq: 8
   },
   "suffoc": {
     dict: "anew-stem", word: "suffocate", stem: "suffoc",
     avg: [ 6.03, 1.56 ], std: [ 3.19, 0.96 ], fq: 1
   },
   "suicid": {
     dict: "anew-stem", word: "suicide", stem: "suicid",
     avg: [ 5.73, 1.25 ], std: [ 3.14, 0.69 ], fq: 17
   },
   "sunris": {
     dict: "anew-stem", word: "sunrise", stem: "sunris",
     avg: [ 5.06, 7.86 ], std: [ 3.05, 1.35 ], fq: 10
   },
   "surgeri": {
     dict: "anew-stem", word: "surgery", stem: "surgeri",
     avg: [ 6.35, 2.86 ], std: [ 2.32, 2.19 ], fq: 6
   },
   "surpris": {
     dict: "anew-stem", word: "surprised", stem: "surpris",
     avg: [ 7.47, 7.47 ], std: [ 2.09, 1.56 ], fq: 58
   },
   "suspici": {
     dict: "anew-stem", word: "suspicious", stem: "suspici",
     avg: [ 6.25, 3.76 ], std: [ 1.59, 1.42 ], fq: 13
   },
   "syphili": {
     dict: "anew-stem", word: "syphilis", stem: "syphili",
     avg: [ 5.69, 1.68 ], std: [ 3.25, 1.23 ], fq: 0
   },
   "tabl": {
     dict: "anew-stem", word: "table", stem: "tabl",
     avg: [ 2.92, 5.22 ], std: [ 2.16, 0.72 ], fq: 198
   },
   "tast": {
     dict: "anew-stem", word: "taste", stem: "tast",
     avg: [ 5.22, 6.66 ], std: [ 2.38, 1.57 ], fq: 59
   },
   "teas": {
     dict: "anew-stem", word: "tease", stem: "teas",
     avg: [ 5.87, 4.84 ], std: [ 2.56, 2.51 ], fq: 6
   },
   "tenni": {
     dict: "anew-stem", word: "tennis", stem: "tenni",
     avg: [ 4.61, 6.02 ], std: [ 2.6, 1.97 ], fq: 15
   },
   "tens": {
     dict: "anew-stem", word: "tense", stem: "tens",
     avg: [ 6.53, 3.56 ], std: [ 2.1, 1.36 ], fq: 15
   },
   "termit": {
     dict: "anew-stem", word: "termite", stem: "termit",
     avg: [ 5.39, 3.58 ], std: [ 2.43, 2.08 ], fq: 0
   },
   "terribl": {
     dict: "anew-stem", word: "terrible", stem: "terribl",
     avg: [ 6.27, 1.93 ], std: [ 2.44, 1.44 ], fq: 45
   },
   "terrif": {
     dict: "anew-stem", word: "terrific", stem: "terrif",
     avg: [ 6.23, 8.16 ], std: [ 2.73, 1.12 ], fq: 5
   },
   "terrifi": {
     dict: "anew-stem", word: "terrified", stem: "terrifi",
     avg: [ 7.86, 1.72 ], std: [ 2.27, 1.14 ], fq: 7
   },
   "thank": {
     dict: "anew-stem", word: "thankful", stem: "thank",
     avg: [ 4.34, 6.89 ], std: [ 2.31, 2.29 ], fq: 6
   },
   "theori": {
     dict: "anew-stem", word: "theory", stem: "theori",
     avg: [ 4.62, 5.3 ], std: [ 1.94, 1.49 ], fq: 129
   },
   "thermomet": {
     dict: "anew-stem", word: "thermometer", stem: "thermomet",
     avg: [ 3.79, 4.73 ], std: [ 2.02, 1.05 ], fq: 0
   },
   "tidi": {
     dict: "anew-stem", word: "tidy", stem: "tidi",
     avg: [ 3.98, 6.3 ], std: [ 2.22, 1.56 ], fq: 1
   },
   "toothach": {
     dict: "anew-stem", word: "toothache", stem: "toothach",
     avg: [ 5.55, 1.98 ], std: [ 2.51, 1.15 ], fq: 0
   },
   "tortur": {
     dict: "anew-stem", word: "torture", stem: "tortur",
     avg: [ 6.1, 1.56 ], std: [ 2.77, 0.79 ], fq: 3
   },
   "toi": {
     dict: "anew-stem", word: "toy", stem: "toi",
     avg: [ 5.11, 7 ], std: [ 2.84, 2.01 ], fq: 4
   },
   "tragedi": {
     dict: "anew-stem", word: "tragedy", stem: "tragedi",
     avg: [ 6.24, 1.78 ], std: [ 2.64, 1.31 ], fq: 49
   },
   "treasur": {
     dict: "anew-stem", word: "treasure", stem: "treasur",
     avg: [ 6.75, 8.27 ], std: [ 2.3, 0.9 ], fq: 4
   },
   "trophi": {
     dict: "anew-stem", word: "trophy", stem: "trophi",
     avg: [ 5.39, 7.78 ], std: [ 2.44, 1.22 ], fq: 8
   },
   "troubl": {
     dict: "anew-stem", word: "trouble", stem: "troubl",
     avg: [ 6.85, 3.03 ], std: [ 2.03, 2.09 ], fq: 134
   },
   "ugli": {
     dict: "anew-stem", word: "ugly", stem: "ugli",
     avg: [ 5.38, 2.43 ], std: [ 2.23, 1.27 ], fq: 21
   },
   "unfaith": {
     dict: "anew-stem", word: "unfaithful", stem: "unfaith",
     avg: [ 6.2, 2.05 ], std: [ 2.7, 1.55 ], fq: 1
   },
   "unhappi": {
     dict: "anew-stem", word: "unhappy", stem: "unhappi",
     avg: [ 4.18, 1.57 ], std: [ 2.5, 0.96 ], fq: 26
   },
   "untroubl": {
     dict: "anew-stem", word: "untroubled", stem: "untroubl",
     avg: [ 3.89, 7.62 ], std: [ 2.54, 1.41 ], fq: 0
   },
   "urin": {
     dict: "anew-stem", word: "urine", stem: "urin",
     avg: [ 4.2, 3.25 ], std: [ 2.18, 1.71 ], fq: 1
   },
   "us": {
     dict: "anew-stem", word: "useful", stem: "us",
     avg: [ 4.26, 7.14 ], std: [ 2.47, 1.6 ], fq: 58
   },
   "vacat": {
     dict: "anew-stem", word: "vacation", stem: "vacat",
     avg: [ 5.64, 8.16 ], std: [ 2.99, 1.36 ], fq: 47
   },
   "valentin": {
     dict: "anew-stem", word: "valentine", stem: "valentin",
     avg: [ 6.06, 8.11 ], std: [ 2.91, 1.35 ], fq: 2
   },
   "vampir": {
     dict: "anew-stem", word: "vampire", stem: "vampir",
     avg: [ 6.37, 4.26 ], std: [ 2.35, 1.86 ], fq: 1
   },
   "vaniti": {
     dict: "anew-stem", word: "vanity", stem: "vaniti",
     avg: [ 4.98, 4.3 ], std: [ 2.31, 1.91 ], fq: 7
   },
   "vehicl": {
     dict: "anew-stem", word: "vehicle", stem: "vehicl",
     avg: [ 4.63, 6.27 ], std: [ 2.81, 2.34 ], fq: 35
   },
   "victori": {
     dict: "anew-stem", word: "victory", stem: "victori",
     avg: [ 6.63, 8.32 ], std: [ 2.84, 1.16 ], fq: 61
   },
   "vigor": {
     dict: "anew-stem", word: "vigorous", stem: "vigor",
     avg: [ 5.9, 6.79 ], std: [ 2.66, 1.54 ], fq: 29
   },
   "villag": {
     dict: "anew-stem", word: "village", stem: "villag",
     avg: [ 4.08, 5.92 ], std: [ 1.87, 1.34 ], fq: 72
   },
   "virtu": {
     dict: "anew-stem", word: "virtue", stem: "virtu",
     avg: [ 4.52, 6.22 ], std: [ 2.52, 2.06 ], fq: 30
   },
   "voyag": {
     dict: "anew-stem", word: "voyage", stem: "voyag",
     avg: [ 5.55, 6.25 ], std: [ 2.23, 1.91 ], fq: 17
   },
   "wast": {
     dict: "anew-stem", word: "waste", stem: "wast",
     avg: [ 4.14, 2.93 ], std: [ 2.3, 1.76 ], fq: 35
   },
   "waterfal": {
     dict: "anew-stem", word: "waterfall", stem: "waterfal",
     avg: [ 5.37, 7.88 ], std: [ 2.84, 1.03 ], fq: 2
   },
   "wealthi": {
     dict: "anew-stem", word: "wealthy", stem: "wealthi",
     avg: [ 5.8, 7.7 ], std: [ 2.73, 1.34 ], fq: 12
   },
   "weari": {
     dict: "anew-stem", word: "weary", stem: "weari",
     avg: [ 3.81, 3.79 ], std: [ 2.29, 2.12 ], fq: 17
   },
   "wed": {
     dict: "anew-stem", word: "wedding", stem: "wed",
     avg: [ 5.97, 7.82 ], std: [ 2.85, 1.56 ], fq: 32
   },
   "whistl": {
     dict: "anew-stem", word: "whistle", stem: "whistl",
     avg: [ 4.69, 5.81 ], std: [ 1.99, 1.21 ], fq: 4
   },
   "wick": {
     dict: "anew-stem", word: "wicked", stem: "wick",
     avg: [ 6.09, 2.96 ], std: [ 2.44, 2.37 ], fq: 9
   },
   "windmil": {
     dict: "anew-stem", word: "windmill", stem: "windmil",
     avg: [ 3.74, 5.6 ], std: [ 2.13, 1.65 ], fq: 1
   },
   "wound": {
     dict: "anew-stem", word: "wounds", stem: "wound",
     avg: [ 5.82, 2.51 ], std: [ 2.01, 1.58 ], fq: 8
   }
};


function anew_extend( term, avg, std, fq )

  //  Extend the ANEW dictionary with the given term
  //
  //  term:  Term to add
  //  avg:   [ valence, arousal ] averages
  //  std:   [ valence, arousal ] standard deviations
  //  fq:    Term evaluation frequency
{
  var  stem;				// Stemmed term


  term = term.toLowerCase();
  stem = stemmer( term );

  //  Warning if we're replacing terms rather than adding them

  if ( anew_term.hasOwnProperty( term ) ) {
    console.log( "anew_extend(), replacing term " + term );
  }
  if ( anew_stem.hasOwnProperty( stem ) ) {
    console.log( "anew_extend(), replacing stem " + stem );
  }

  anew_term[ term ] =
    { dict: "anew", word: term, stem: stem, avg: avg, std: std, fq: fq };
  anew_stem[ stem ] =
    { dict: "anew-stem", word: term, stem: stem, avg: avg, std: std, fq: fq };
}					// End routine anew_extend


function anew_find_stem( s )

  //  Return the stem's in the ANEW dictionary, or -1 if no such stem
  //
  //  s:  Stem to search
{
  if ( s.length == 0 ) {		// Empty term?
    return -1;
  }

  if ( anew_stem.hasOwnProperty( s ) ) {
    return anew_stem[ s ];
  }

  return -1;
}					// End routine anew_find_stem


function anew_find_word( w )

  //  Return the word's in the ANEW dictionary, or -1 if no such word
  //
  //  w:  Word to search
{
  if ( w.length == 0 ) {		// Empty term?
    return -1;
  }

  if ( anew_term.hasOwnProperty( w ) ) {
    return anew_term[ w ];
  }

  return -1;
}					// End routine anew_find_word
