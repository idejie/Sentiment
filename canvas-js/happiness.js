/*--------------------------------------------------------------------------*/
/*  HAPPINESS.JS							    */
/*    Routines to calculate libMIT happiness scores			    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  03-Feb-13	Christopher G. Healey	Converted from ANEW.JS		    */
/*--------------------------------------------------------------------------*/

//  Module global variables

//  Happiness description structure:
//  - key, full term
//  - dict, dictionary
//  - word, full term
//  - stem, stemmed term
//  - avg, happiness average
//  - std, happiness standard deviation
//
//  Happiness terms are not stemmed, because the original dataset was
//  specifically designed not to conflate terms

var  happy_term = {
  "laughter": {
    dict: "happiness", word: "laughter", stem: "laughter", anew: "laughter",
    avg: [ 6.75, 8.50 ], std: [ 2.50, 0.93 ], fq: 50 
  },
  "happiness": {
    dict: "happiness", word: "happiness", stem: "happi", anew: "happy",
    avg: [ 6.49, 8.44 ], std: [ 2.77, 0.97 ], fq: 50 
  },
  "love": {
    dict: "happiness", word: "love", stem: "love", anew: "loved",
    avg: [ 6.38, 8.42 ], std: [ 2.68, 1.11 ], fq: 50 
  },
  "happy": {
    dict: "happiness", word: "happy", stem: "happi", anew: "happy",
    avg: [ 6.49, 8.30 ], std: [ 2.77, 0.99 ], fq: 50 
  },
  "laugh": {
    dict: "happiness", word: "laugh", stem: "laugh", anew: "joke",
    avg: [ 6.74, 8.22 ], std: [ 1.84, 1.37 ], fq: 50 
  },
  "excellent": {
    dict: "happiness", word: "excellent", stem: "excel", anew: "excellence",
    avg: [ 5.54, 8.18 ], std: [ 2.67, 1.10 ], fq: 50 
  },
  "laughs": {
    dict: "happiness", word: "laughs", stem: "laugh", anew: "joke",
    avg: [ 6.74, 8.18 ], std: [ 1.84, 1.16 ], fq: 50 
  },
  "joy": {
    dict: "happiness", word: "joy", stem: "joy", anew: "joyful",
    avg: [ 5.98, 8.16 ], std: [ 2.54, 1.06 ], fq: 50 
  },
  "successful": {
    dict: "happiness", word: "successful", stem: "success", anew: "success",
    avg: [ 6.11, 8.16 ], std: [ 2.65, 1.08 ], fq: 50 
  },
  "win": {
    dict: "happiness", word: "win", stem: "win", anew: "win",
    avg: [ 7.72, 8.12 ], std: [ 2.16, 1.08 ], fq: 50 
  },
  "rainbow": {
    dict: "happiness", word: "rainbow", stem: "rainbow", anew: "rainbow",
    avg: [ 4.64, 8.10 ], std: [ 2.88, 0.99 ], fq: 50 
  },
  "won": {
    dict: "happiness", word: "won", stem: "won", anew: "win",
    avg: [ 7.72, 8.10 ], std: [ 2.16, 1.22 ], fq: 50 
  },
  "pleasure": {
    dict: "happiness", word: "pleasure", stem: "pleasur", anew: "pleasure",
    avg: [ 5.74, 8.08 ], std: [ 2.81, 0.97 ], fq: 50 
  },
  "rainbows": {
    dict: "happiness", word: "rainbows", stem: "rainbow", anew: "rainbow",
    avg: [ 4.64, 8.06 ], std: [ 2.88, 1.36 ], fq: 50 
  },
  "winning": {
    dict: "happiness", word: "winning", stem: "win", anew: "win",
    avg: [ 7.72, 8.04 ], std: [ 2.16, 1.05 ], fq: 50 
  },
  "celebration": {
    dict: "happiness", word: "celebration", stem: "celebr", anew: "solemn",
    avg: [ 3.56, 8.02 ], std: [ 1.95, 1.53 ], fq: 50 
  },
  "enjoyed": {
    dict: "happiness", word: "enjoyed", stem: "enjoy", anew: "enjoyment",
    avg: [ 5.20, 8.02 ], std: [ 2.72, 1.53 ], fq: 50 
  },
  "healthy": {
    dict: "happiness", word: "healthy", stem: "healthi", anew: "respectful",
    avg: [ 4.60, 8.02 ], std: [ 2.67, 1.06 ], fq: 50 
  },
  "music": {
    dict: "happiness", word: "music", stem: "music", anew: "music",
    avg: [ 5.32, 8.02 ], std: [ 3.19, 1.12 ], fq: 50 
  },
  "comedy": {
    dict: "happiness", word: "comedy", stem: "comedi", anew: "comedy",
    avg: [ 5.85, 7.98 ], std: [ 2.81, 1.15 ], fq: 50 
  },
  "jokes": {
    dict: "happiness", word: "jokes", stem: "joke", anew: "joke",
    avg: [ 6.74, 7.98 ], std: [ 1.84, 0.98 ], fq: 50 
  },
  "rich": {
    dict: "happiness", word: "rich", stem: "rich", anew: "riches",
    avg: [ 6.17, 7.98 ], std: [ 2.70, 1.32 ], fq: 50 
  },
  "victory": {
    dict: "happiness", word: "victory", stem: "victori", anew: "victory",
    avg: [ 6.63, 7.98 ], std: [ 2.84, 1.08 ], fq: 50 
  },
  "christmas": {
    dict: "happiness", word: "christmas", stem: "christma", anew: "christmas",
    avg: [ 6.27, 7.96 ], std: [ 2.56, 1.29 ], fq: 50 
  },
  "free": {
    dict: "happiness", word: "free", stem: "free", anew: "free",
    avg: [ 5.15, 7.96 ], std: [ 3.04, 1.26 ], fq: 50 
  },
  "fun": {
    dict: "happiness", word: "fun", stem: "fun", anew: "fun",
    avg: [ 7.22, 7.96 ], std: [ 2.01, 1.31 ], fq: 50 
  },
  "holidays": {
    dict: "happiness", word: "holidays", stem: "holiday", anew: "holiday",
    avg: [ 6.59, 7.96 ], std: [ 2.73, 1.26 ], fq: 50 
  },
  "loved": {
    dict: "happiness", word: "loved", stem: "love", anew: "loved",
    avg: [ 6.38, 7.96 ], std: [ 2.68, 1.16 ], fq: 50 
  },
  "loves": {
    dict: "happiness", word: "loves", stem: "love", anew: "loved",
    avg: [ 6.38, 7.96 ], std: [ 2.68, 1.37 ], fq: 50 
  },
  "loving": {
    dict: "happiness", word: "loving", stem: "love", anew: "loved",
    avg: [ 6.38, 7.96 ], std: [ 2.68, 1.01 ], fq: 50 
  },
  "beach": {
    dict: "happiness", word: "beach", stem: "beach", anew: "beach",
    avg: [ 5.53, 7.94 ], std: [ 3.07, 1.06 ], fq: 50 
  },
  "kissing": {
    dict: "happiness", word: "kissing", stem: "kiss", anew: "kiss",
    avg: [ 7.32, 7.94 ], std: [ 2.03, 1.13 ], fq: 50 
  },
  "sunshine": {
    dict: "happiness", word: "sunshine", stem: "sunshin", anew: "sun",
    avg: [ 5.04, 7.94 ], std: [ 2.66, 1.17 ], fq: 50 
  },
  "beautiful": {
    dict: "happiness", word: "beautiful", stem: "beauti", anew: "beauty",
    avg: [ 4.95, 7.92 ], std: [ 2.57, 1.18 ], fq: 50 
  },
  "delicious": {
    dict: "happiness", word: "delicious", stem: "delici", anew: "delight",
    avg: [ 5.44, 7.92 ], std: [ 2.88, 1.26 ], fq: 50 
  },
  "friends": {
    dict: "happiness", word: "friends", stem: "friend", anew: "friendly",
    avg: [ 5.11, 7.92 ], std: [ 2.96, 1.19 ], fq: 50 
  },
  "funny": {
    dict: "happiness", word: "funny", stem: "funni", anew: "suspicious",
    avg: [ 6.25, 7.92 ], std: [ 1.59, 1.05 ], fq: 50 
  },
  "outstanding": {
    dict: "happiness", word: "outstanding", stem: "outstand", anew: "outstanding",
    avg: [ 6.24, 7.92 ], std: [ 2.59, 1.14 ], fq: 50 
  },
  "paradise": {
    dict: "happiness", word: "paradise", stem: "paradis", anew: "paradise",
    avg: [ 5.12, 7.92 ], std: [ 3.38, 1.40 ], fq: 50 
  },
  "sweetest": {
    dict: "happiness", word: "sweetest", stem: "sweetest", anew: "angel",
    avg: [ 4.83, 7.92 ], std: [ 2.63, 1.29 ], fq: 50 
  },
  "vacation": {
    dict: "happiness", word: "vacation", stem: "vacat", anew: "vacation",
    avg: [ 5.64, 7.92 ], std: [ 2.99, 1.90 ], fq: 50 
  },
  "butterflies": {
    dict: "happiness", word: "butterflies", stem: "butterfli", anew: "butterfly",
    avg: [ 3.47, 7.92 ], std: [ 2.39, 1.08 ], fq: 50 
  },
  "freedom": {
    dict: "happiness", word: "freedom", stem: "freedom", anew: "freedom",
    avg: [ 5.52, 7.90 ], std: [ 2.72, 1.42 ], fq: 50 
  },
  "flower": {
    dict: "happiness", word: "flower", stem: "flower", anew: "flower",
    avg: [ 4.00, 7.88 ], std: [ 2.44, 1.17 ], fq: 50 
  },
  "great": {
    dict: "happiness", word: "great", stem: "great", anew: "outstanding",
    avg: [ 6.24, 7.88 ], std: [ 2.59, 1.21 ], fq: 50 
  },
  "sunlight": {
    dict: "happiness", word: "sunlight", stem: "sunlight", anew: "sunlight",
    avg: [ 6.10, 7.88 ], std: [ 2.30, 1.49 ], fq: 50 
  },
  "sweetheart": {
    dict: "happiness", word: "sweetheart", stem: "sweetheart", anew: "sweetheart",
    avg: [ 5.50, 7.88 ], std: [ 2.73, 1.27 ], fq: 50 
  },
  "sweetness": {
    dict: "happiness", word: "sweetness", stem: "sweet", anew: "bouquet",
    avg: [ 5.46, 7.88 ], std: [ 2.47, 1.19 ], fq: 50 
  },
  "award": {
    dict: "happiness", word: "award", stem: "award", anew: "honor",
    avg: [ 5.90, 7.86 ], std: [ 1.83, 1.57 ], fq: 50 
  },
  "chocolate": {
    dict: "happiness", word: "chocolate", stem: "chocol", anew: "chocolate",
    avg: [ 5.29, 7.86 ], std: [ 2.55, 1.03 ], fq: 50 
  },
  "heaven": {
    dict: "happiness", word: "heaven", stem: "heaven", anew: "heaven",
    avg: [ 5.61, 7.86 ], std: [ 3.20, 1.58 ], fq: 50 
  },
  "peace": {
    dict: "happiness", word: "peace", stem: "peac", anew: "peace",
    avg: [ 2.95, 7.86 ], std: [ 2.55, 1.34 ], fq: 50 
  },
  "splendid": {
    dict: "happiness", word: "splendid", stem: "splendid", anew: "excellence",
    avg: [ 5.54, 7.86 ], std: [ 2.67, 1.46 ], fq: 50 
  },
  "success": {
    dict: "happiness", word: "success", stem: "success", anew: "success",
    avg: [ 6.11, 7.86 ], std: [ 2.65, 1.64 ], fq: 50 
  },
  "enjoying": {
    dict: "happiness", word: "enjoying", stem: "enjoy", anew: "enjoyment",
    avg: [ 5.20, 7.84 ], std: [ 2.72, 1.50 ], fq: 50 
  },
  "kissed": {
    dict: "happiness", word: "kissed", stem: "kiss", anew: "kiss",
    avg: [ 7.32, 7.84 ], std: [ 2.03, 1.50 ], fq: 50 
  },
  "celebrated": {
    dict: "happiness", word: "celebrated", stem: "celebr", anew: "history",
    avg: [ 3.93, 7.80 ], std: [ 2.29, 1.18 ], fq: 50 
  },
  "hero": {
    dict: "happiness", word: "hero", stem: "hero", anew: "champion",
    avg: [ 5.85, 7.80 ], std: [ 3.15, 1.40 ], fq: 50 
  },
  "hugs": {
    dict: "happiness", word: "hugs", stem: "hug", anew: "hug",
    avg: [ 5.35, 7.80 ], std: [ 2.76, 1.44 ], fq: 50 
  },
  "positive": {
    dict: "happiness", word: "positive", stem: "posit", anew: "confident",
    avg: [ 6.22, 7.80 ], std: [ 2.41, 1.25 ], fq: 50 
  },
  "sun": {
    dict: "happiness", word: "sun", stem: "sun", anew: "sun",
    avg: [ 5.04, 7.80 ], std: [ 2.66, 1.36 ], fq: 50 
  },
  "birthday": {
    dict: "happiness", word: "birthday", stem: "birthday", anew: "birthday",
    avg: [ 6.68, 7.78 ], std: [ 2.11, 1.91 ], fq: 50 
  },
  "blessed": {
    dict: "happiness", word: "blessed", stem: "bless", anew: "bless",
    avg: [ 4.05, 7.78 ], std: [ 2.59, 1.28 ], fq: 50 
  },
  "fantastic": {
    dict: "happiness", word: "fantastic", stem: "fantast", anew: "terrific",
    avg: [ 6.23, 7.78 ], std: [ 2.73, 1.09 ], fq: 50 
  },
  "winner": {
    dict: "happiness", word: "winner", stem: "winner", anew: "achievement",
    avg: [ 5.53, 7.78 ], std: [ 2.81, 1.69 ], fq: 50 
  },
  "delight": {
    dict: "happiness", word: "delight", stem: "delight", anew: "delight",
    avg: [ 5.44, 7.78 ], std: [ 2.88, 1.42 ], fq: 50 
  },
  "beauty": {
    dict: "happiness", word: "beauty", stem: "beauti", anew: "beauty",
    avg: [ 4.95, 7.76 ], std: [ 2.57, 1.61 ], fq: 50 
  },
  "butterfly": {
    dict: "happiness", word: "butterfly", stem: "butterfli", anew: "butterfly",
    avg: [ 3.47, 7.76 ], std: [ 2.39, 1.33 ], fq: 50 
  },
  "funniest": {
    dict: "happiness", word: "funniest", stem: "funniest", anew: "suspicious",
    avg: [ 6.25, 7.76 ], std: [ 1.59, 1.56 ], fq: 50 
  },
  "honesty": {
    dict: "happiness", word: "honesty", stem: "honesti", anew: "honest",
    avg: [ 5.32, 7.76 ], std: [ 1.92, 1.27 ], fq: 50 
  },
  "sky": {
    dict: "happiness", word: "sky", stem: "sky", anew: "sky",
    avg: [ 4.27, 7.76 ], std: [ 2.17, 1.08 ], fq: 50 
  },
  "succeed": {
    dict: "happiness", word: "succeed", stem: "succeed", anew: "win",
    avg: [ 7.72, 7.76 ], std: [ 2.16, 1.70 ], fq: 50 
  },
  "wonderful": {
    dict: "happiness", word: "wonderful", stem: "wonder", anew: "wonder",
    avg: [ 5.00, 7.76 ], std: [ 2.23, 1.79 ], fq: 50 
  },
  "kisses": {
    dict: "happiness", word: "kisses", stem: "kiss", anew: "kiss",
    avg: [ 7.32, 7.74 ], std: [ 2.03, 1.19 ], fq: 50 
  },
  "promotion": {
    dict: "happiness", word: "promotion", stem: "promot", anew: "promotion",
    avg: [ 6.44, 7.74 ], std: [ 2.58, 1.38 ], fq: 50 
  },
  "family": {
    dict: "happiness", word: "family", stem: "famili", anew: "family",
    avg: [ 4.80, 7.72 ], std: [ 2.71, 1.31 ], fq: 50 
  },
  "gift": {
    dict: "happiness", word: "gift", stem: "gift", anew: "gift",
    avg: [ 6.14, 7.72 ], std: [ 2.76, 1.34 ], fq: 50 
  },
  "humor": {
    dict: "happiness", word: "humor", stem: "humor", anew: "humor",
    avg: [ 5.50, 7.72 ], std: [ 2.91, 1.09 ], fq: 50 
  },
  "romantic": {
    dict: "happiness", word: "romantic", stem: "romant", anew: "romantic",
    avg: [ 7.59, 7.72 ], std: [ 2.07, 1.20 ], fq: 50 
  },
  "festival": {
    dict: "happiness", word: "festival", stem: "festiv", anew: "festive",
    avg: [ 6.58, 7.70 ], std: [ 2.29, 1.07 ], fq: 50 
  },
  "honour": {
    dict: "happiness", word: "honour", stem: "honour", anew: "respectful",
    avg: [ 4.60, 7.70 ], std: [ 2.67, 1.25 ], fq: 50 
  },
  "relax": {
    dict: "happiness", word: "relax", stem: "relax", anew: "relaxed",
    avg: [ 2.39, 7.70 ], std: [ 2.13, 1.07 ], fq: 50 
  },
  "angel": {
    dict: "happiness", word: "angel", stem: "angel", anew: "angel",
    avg: [ 4.83, 7.68 ], std: [ 2.63, 1.24 ], fq: 50 
  },
  "bonus": {
    dict: "happiness", word: "bonus", stem: "bonu", anew: "incentive",
    avg: [ 5.69, 7.68 ], std: [ 2.45, 1.46 ], fq: 50 
  },
  "brilliant": {
    dict: "happiness", word: "brilliant", stem: "brilliant", anew: "bright",
    avg: [ 5.40, 7.68 ], std: [ 2.33, 1.62 ], fq: 50 
  },
  "diamonds": {
    dict: "happiness", word: "diamonds", stem: "diamond", anew: "diamond",
    avg: [ 5.53, 7.68 ], std: [ 2.96, 1.48 ], fq: 50 
  },
  "holiday": {
    dict: "happiness", word: "holiday", stem: "holiday", anew: "holiday",
    avg: [ 6.59, 7.68 ], std: [ 2.73, 1.30 ], fq: 50 
  },
  "lucky": {
    dict: "happiness", word: "lucky", stem: "lucki", anew: "lucky",
    avg: [ 6.53, 7.68 ], std: [ 2.34, 1.27 ], fq: 50 
  },
  "mother": {
    dict: "happiness", word: "mother", stem: "mother", anew: "mother",
    avg: [ 6.13, 7.68 ], std: [ 2.71, 1.67 ], fq: 50 
  },
  "super": {
    dict: "happiness", word: "super", stem: "super", anew: "ace",
    avg: [ 5.50, 7.68 ], std: [ 2.66, 1.60 ], fq: 50 
  },
  "amazing": {
    dict: "happiness", word: "amazing", stem: "amaz", anew: "astonished",
    avg: [ 6.58, 7.66 ], std: [ 2.22, 1.49 ], fq: 50 
  },
  "angels": {
    dict: "happiness", word: "angels", stem: "angel", anew: "angel",
    avg: [ 4.83, 7.66 ], std: [ 2.63, 1.47 ], fq: 50 
  },
  "enjoy": {
    dict: "happiness", word: "enjoy", stem: "enjoy", anew: "enjoyment",
    avg: [ 5.20, 7.66 ], std: [ 2.72, 1.47 ], fq: 50 
  },
  "friend": {
    dict: "happiness", word: "friend", stem: "friend", anew: "friendly",
    avg: [ 5.11, 7.66 ], std: [ 2.96, 1.51 ], fq: 50 
  },
  "friendly": {
    dict: "happiness", word: "friendly", stem: "friendli", anew: "favor",
    avg: [ 4.54, 7.66 ], std: [ 1.86, 1.55 ], fq: 50 
  },
  "profit": {
    dict: "happiness", word: "profit", stem: "profit", anew: "profit",
    avg: [ 6.68, 7.66 ], std: [ 1.78, 1.24 ], fq: 50 
  },
  "champion": {
    dict: "happiness", word: "champion", stem: "champion", anew: "champion",
    avg: [ 5.85, 7.64 ], std: [ 3.15, 1.22 ], fq: 50 
  },
  "kiss": {
    dict: "happiness", word: "kiss", stem: "kiss", anew: "kiss",
    avg: [ 7.32, 7.64 ], std: [ 2.03, 1.76 ], fq: 50 
  },
  "kitten": {
    dict: "happiness", word: "kitten", stem: "kitten", anew: "kitten",
    avg: [ 5.08, 7.64 ], std: [ 2.45, 1.29 ], fq: 50 
  },
  "miracle": {
    dict: "happiness", word: "miracle", stem: "miracl", anew: "miracle",
    avg: [ 7.65, 7.64 ], std: [ 1.67, 1.89 ], fq: 50 
  },
  "sweet": {
    dict: "happiness", word: "sweet", stem: "sweet", anew: "angel",
    avg: [ 4.83, 7.64 ], std: [ 2.63, 1.06 ], fq: 50 
  },
  "blessings": {
    dict: "happiness", word: "blessings", stem: "bless", anew: "bless",
    avg: [ 4.05, 7.62 ], std: [ 2.59, 1.63 ], fq: 50 
  },
  "bright": {
    dict: "happiness", word: "bright", stem: "bright", anew: "bright",
    avg: [ 5.40, 7.62 ], std: [ 2.33, 1.14 ], fq: 50 
  },
  "cutest": {
    dict: "happiness", word: "cutest", stem: "cutest", anew: "cute",
    avg: [ 5.53, 7.62 ], std: [ 2.71, 1.09 ], fq: 50 
  },
  "entertaining": {
    dict: "happiness", word: "entertaining", stem: "entertain", anew: "nurse",
    avg: [ 4.84, 7.62 ], std: [ 2.04, 1.09 ], fq: 50 
  },
  "excited": {
    dict: "happiness", word: "excited", stem: "excit", anew: "excitement",
    avg: [ 7.67, 7.62 ], std: [ 1.91, 1.40 ], fq: 50 
  },
  "excitement": {
    dict: "happiness", word: "excitement", stem: "excit", anew: "excitement",
    avg: [ 7.67, 7.62 ], std: [ 1.91, 1.65 ], fq: 50 
  },
  "joke": {
    dict: "happiness", word: "joke", stem: "joke", anew: "joke",
    avg: [ 6.74, 7.62 ], std: [ 1.84, 1.40 ], fq: 50 
  },
  "millionaire": {
    dict: "happiness", word: "millionaire", stem: "millionair", anew: "millionaire",
    avg: [ 6.14, 7.62 ], std: [ 2.70, 2.13 ], fq: 50 
  },
  "prize": {
    dict: "happiness", word: "prize", stem: "prize", anew: "respectful",
    avg: [ 4.60, 7.62 ], std: [ 2.67, 1.21 ], fq: 50 
  },
  "succeeded": {
    dict: "happiness", word: "succeeded", stem: "succeed", anew: "win",
    avg: [ 7.72, 7.62 ], std: [ 2.16, 1.14 ], fq: 50 
  },
  "successfully": {
    dict: "happiness", word: "successfully", stem: "success", anew: "success",
    avg: [ 6.11, 7.62 ], std: [ 2.65, 1.26 ], fq: 50 
  },
  "winners": {
    dict: "happiness", word: "winners", stem: "winner", anew: "achievement",
    avg: [ 5.53, 7.62 ], std: [ 2.81, 1.54 ], fq: 50 
  },
  "shines": {
    dict: "happiness", word: "shines", stem: "shine", anew: "fall",
    avg: [ 4.70, 7.60 ], std: [ 2.48, 1.59 ], fq: 50 
  },
  "awesome": {
    dict: "happiness", word: "awesome", stem: "awesom", anew: "awed",
    avg: [ 5.74, 7.60 ], std: [ 2.31, 1.59 ], fq: 50 
  },
  "genius": {
    dict: "happiness", word: "genius", stem: "geniu", anew: "star",
    avg: [ 5.83, 7.60 ], std: [ 2.44, 1.25 ], fq: 50 
  },
  "achievement": {
    dict: "happiness", word: "achievement", stem: "achiev", anew: "achievement",
    avg: [ 5.53, 7.58 ], std: [ 2.81, 1.43 ], fq: 50 
  },
  "cake": {
    dict: "happiness", word: "cake", stem: "cake", anew: "cake",
    avg: [ 5.00, 7.58 ], std: [ 2.37, 1.11 ], fq: 50 
  },
  "cheers": {
    dict: "happiness", word: "cheers", stem: "cheer", anew: "cheer",
    avg: [ 6.12, 7.58 ], std: [ 2.45, 1.47 ], fq: 50 
  },
  "exciting": {
    dict: "happiness", word: "exciting", stem: "excit", anew: "excitement",
    avg: [ 7.67, 7.58 ], std: [ 1.91, 1.34 ], fq: 50 
  },
  "goodness": {
    dict: "happiness", word: "goodness", stem: "good", anew: "good",
    avg: [ 5.43, 7.58 ], std: [ 2.85, 1.37 ], fq: 50 
  },
  "hug": {
    dict: "happiness", word: "hug", stem: "hug", anew: "hug",
    avg: [ 5.35, 7.58 ], std: [ 2.76, 1.47 ], fq: 50 
  },
  "party": {
    dict: "happiness", word: "party", stem: "parti", anew: "party",
    avg: [ 6.69, 7.58 ], std: [ 2.84, 1.46 ], fq: 50 
  },
  "puppy": {
    dict: "happiness", word: "puppy", stem: "puppi", anew: "puppy",
    avg: [ 5.85, 7.58 ], std: [ 2.78, 1.46 ], fq: 50 
  },
  "song": {
    dict: "happiness", word: "song", stem: "song", anew: "song",
    avg: [ 6.07, 7.58 ], std: [ 2.42, 1.34 ], fq: 50 
  },
  "succeeding": {
    dict: "happiness", word: "succeeding", stem: "succeed", anew: "win",
    avg: [ 7.72, 7.58 ], std: [ 2.16, 1.34 ], fq: 50 
  },
  "victories": {
    dict: "happiness", word: "victories", stem: "victori", anew: "victory",
    avg: [ 6.63, 7.58 ], std: [ 2.84, 1.76 ], fq: 50 
  },
  "achieved": {
    dict: "happiness", word: "achieved", stem: "achiev", anew: "achievement",
    avg: [ 5.53, 7.56 ], std: [ 2.81, 1.37 ], fq: 50 
  },
  "cakes": {
    dict: "happiness", word: "cakes", stem: "cake", anew: "cake",
    avg: [ 5.00, 7.56 ], std: [ 2.37, 1.46 ], fq: 50 
  },
  "easier": {
    dict: "happiness", word: "easier", stem: "easier", anew: "leisurely",
    avg: [ 3.80, 7.56 ], std: [ 2.38, 1.15 ], fq: 50 
  },
  "flowers": {
    dict: "happiness", word: "flowers", stem: "flower", anew: "flower",
    avg: [ 4.00, 7.56 ], std: [ 2.44, 1.43 ], fq: 50 
  },
  "gifts": {
    dict: "happiness", word: "gifts", stem: "gift", anew: "gift",
    avg: [ 6.14, 7.56 ], std: [ 2.76, 1.94 ], fq: 50 
  },
  "gold": {
    dict: "happiness", word: "gold", stem: "gold", anew: "gold",
    avg: [ 5.76, 7.56 ], std: [ 2.79, 1.11 ], fq: 50 
  },
  "merry": {
    dict: "happiness", word: "merry", stem: "merri", anew: "merry",
    avg: [ 5.90, 7.56 ], std: [ 2.42, 1.15 ], fq: 50 
  },
  "families": {
    dict: "happiness", word: "families", stem: "famili", anew: "family",
    avg: [ 4.80, 7.54 ], std: [ 2.71, 1.28 ], fq: 50 
  },
  "handsome": {
    dict: "happiness", word: "handsome", stem: "handsom", anew: "handsome",
    avg: [ 5.95, 7.54 ], std: [ 2.73, 1.25 ], fq: 50 
  },
  "affection": {
    dict: "happiness", word: "affection", stem: "affect", anew: "affection",
    avg: [ 6.21, 7.53 ], std: [ 2.75, 1.53 ], fq: 50 
  },
  "candy": {
    dict: "happiness", word: "candy", stem: "candi", anew: "candy",
    avg: [ 4.58, 7.52 ], std: [ 2.40, 1.49 ], fq: 50 
  },
  "cute": {
    dict: "happiness", word: "cute", stem: "cute", anew: "cute",
    avg: [ 5.53, 7.52 ], std: [ 2.71, 1.20 ], fq: 50 
  },
  "diamond": {
    dict: "happiness", word: "diamond", stem: "diamond", anew: "diamond",
    avg: [ 5.53, 7.52 ], std: [ 2.96, 1.72 ], fq: 50 
  },
  "earnings": {
    dict: "happiness", word: "earnings", stem: "earn", anew: "profit",
    avg: [ 6.68, 7.52 ], std: [ 1.78, 1.42 ], fq: 50 
  },
  "interesting": {
    dict: "happiness", word: "interesting", stem: "interest", anew: "interest",
    avg: [ 5.66, 7.52 ], std: [ 2.26, 1.18 ], fq: 50 
  },
  "peacefully": {
    dict: "happiness", word: "peacefully", stem: "peac", anew: "peace",
    avg: [ 2.95, 7.52 ], std: [ 2.55, 1.05 ], fq: 50 
  },
  "relaxing": {
    dict: "happiness", word: "relaxing", stem: "relax", anew: "relaxed",
    avg: [ 2.39, 7.52 ], std: [ 2.13, 1.22 ], fq: 50 
  },
  "heavens": {
    dict: "happiness", word: "heavens", stem: "heaven", anew: "heaven",
    avg: [ 5.61, 7.51 ], std: [ 3.20, 1.73 ], fq: 50 
  },
  "cherish": {
    dict: "happiness", word: "cherish", stem: "cherish", anew: "treasure",
    avg: [ 6.75, 7.50 ], std: [ 2.30, 1.47 ], fq: 50 
  },
  "comfort": {
    dict: "happiness", word: "comfort", stem: "comfort", anew: "comfort",
    avg: [ 3.93, 7.50 ], std: [ 2.85, 1.15 ], fq: 50 
  },
  "extraordinary": {
    dict: "happiness", word: "extraordinary", stem: "extraordinari", anew: "sinful",
    avg: [ 6.29, 7.50 ], std: [ 2.43, 1.37 ], fq: 50 
  },
  "glory": {
    dict: "happiness", word: "glory", stem: "glori", anew: "glory",
    avg: [ 6.02, 7.50 ], std: [ 2.71, 1.61 ], fq: 50 
  },
  "hilarious": {
    dict: "happiness", word: "hilarious", stem: "hilari", anew: "scream",
    avg: [ 7.04, 7.50 ], std: [ 1.96, 1.98 ], fq: 50 
  },
  "peaceful": {
    dict: "happiness", word: "peaceful", stem: "peac", anew: "peace",
    avg: [ 2.95, 7.50 ], std: [ 2.55, 1.09 ], fq: 50 
  },
  "romance": {
    dict: "happiness", word: "romance", stem: "romanc", anew: "flirt",
    avg: [ 6.91, 7.50 ], std: [ 1.69, 1.43 ], fq: 50 
  },
  "glad": {
    dict: "happiness", word: "glad", stem: "glad", anew: "happy",
    avg: [ 6.49, 7.48 ], std: [ 2.77, 1.52 ], fq: 50 
  },
  "profits": {
    dict: "happiness", word: "profits", stem: "profit", anew: "profit",
    avg: [ 6.68, 7.48 ], std: [ 1.78, 1.33 ], fq: 50 
  },
  "smart": {
    dict: "happiness", word: "smart", stem: "smart", anew: "ache",
    avg: [ 5.00, 7.48 ], std: [ 2.45, 1.37 ], fq: 50 
  },
  "babies": {
    dict: "happiness", word: "babies", stem: "babi", anew: "baby",
    avg: [ 5.53, 7.46 ], std: [ 2.80, 1.50 ], fq: 50 
  },
  "cheer": {
    dict: "happiness", word: "cheer", stem: "cheer", anew: "cheer",
    avg: [ 6.12, 7.46 ], std: [ 2.45, 1.68 ], fq: 50 
  },
  "courage": {
    dict: "happiness", word: "courage", stem: "courag", anew: "brave",
    avg: [ 6.15, 7.46 ], std: [ 2.45, 1.18 ], fq: 50 
  },
  "honest": {
    dict: "happiness", word: "honest", stem: "honest", anew: "honest",
    avg: [ 5.32, 7.46 ], std: [ 1.92, 1.13 ], fq: 50 
  },
  "loyal": {
    dict: "happiness", word: "loyal", stem: "loyal", anew: "loyal",
    avg: [ 5.16, 7.46 ], std: [ 2.42, 1.25 ], fq: 50 
  },
  "opportunities": {
    dict: "happiness", word: "opportunities", stem: "opportun", anew: "chance",
    avg: [ 5.38, 7.46 ], std: [ 2.58, 1.09 ], fq: 50 
  },
  "triumph": {
    dict: "happiness", word: "triumph", stem: "triumph", anew: "triumph",
    avg: [ 5.78, 7.46 ], std: [ 2.60, 1.83 ], fq: 50 
  },
  "wow": {
    dict: "happiness", word: "wow", stem: "wow", anew: "riot",
    avg: [ 6.39, 7.46 ], std: [ 2.63, 1.45 ], fq: 50 
  },
  "jewels": {
    dict: "happiness", word: "jewels", stem: "jewel", anew: "jewel",
    avg: [ 5.38, 7.46 ], std: [ 2.54, 1.62 ], fq: 50 
  },
  "dreams": {
    dict: "happiness", word: "dreams", stem: "dream", anew: "dream",
    avg: [ 4.53, 7.44 ], std: [ 2.72, 1.42 ], fq: 50 
  },
  "fantasy": {
    dict: "happiness", word: "fantasy", stem: "fantasi", anew: "fantasy",
    avg: [ 5.14, 7.44 ], std: [ 2.82, 1.62 ], fq: 50 
  },
  "food": {
    dict: "happiness", word: "food", stem: "food", anew: "food",
    avg: [ 5.92, 7.44 ], std: [ 2.11, 1.21 ], fq: 50 
  },
  "honey": {
    dict: "happiness", word: "honey", stem: "honey", anew: "honey",
    avg: [ 4.51, 7.44 ], std: [ 2.25, 1.59 ], fq: 50 
  },
  "miracles": {
    dict: "happiness", word: "miracles", stem: "miracl", anew: "miracle",
    avg: [ 7.65, 7.44 ], std: [ 1.67, 1.94 ], fq: 50 
  },
  "sex": {
    dict: "happiness", word: "sex", stem: "sex", anew: "sex",
    avg: [ 7.36, 7.44 ], std: [ 1.91, 1.68 ], fq: 50 
  },
  "sing": {
    dict: "happiness", word: "sing", stem: "sing", anew: "whistle",
    avg: [ 4.69, 7.44 ], std: [ 1.99, 1.34 ], fq: 50 
  },
  "thankful": {
    dict: "happiness", word: "thankful", stem: "thank", anew: "thankful",
    avg: [ 4.34, 7.44 ], std: [ 2.31, 1.50 ], fq: 50 
  },
  "wins": {
    dict: "happiness", word: "wins", stem: "win", anew: "win",
    avg: [ 7.72, 7.44 ], std: [ 2.16, 1.26 ], fq: 50 
  },
  "achieve": {
    dict: "happiness", word: "achieve", stem: "achiev", anew: "achievement",
    avg: [ 5.53, 7.42 ], std: [ 2.81, 1.23 ], fq: 50 
  },
  "adored": {
    dict: "happiness", word: "adored", stem: "ador", anew: "adorable",
    avg: [ 5.12, 7.42 ], std: [ 2.71, 1.44 ], fq: 50 
  },
  "cash": {
    dict: "happiness", word: "cash", stem: "cash", anew: "cash",
    avg: [ 7.37, 7.42 ], std: [ 2.21, 1.67 ], fq: 50 
  },
  "parties": {
    dict: "happiness", word: "parties", stem: "parti", anew: "party",
    avg: [ 6.69, 7.42 ], std: [ 2.84, 1.44 ], fq: 50 
  },
  "perfect": {
    dict: "happiness", word: "perfect", stem: "perfect", anew: "perfection",
    avg: [ 5.95, 7.42 ], std: [ 2.73, 1.72 ], fq: 50 
  },
  "surprise": {
    dict: "happiness", word: "surprise", stem: "surpris", anew: "surprised",
    avg: [ 7.47, 7.42 ], std: [ 2.09, 1.54 ], fq: 50 
  },
  "truth": {
    dict: "happiness", word: "truth", stem: "truth", anew: "truth",
    avg: [ 5.00, 7.42 ], std: [ 2.77, 1.40 ], fq: 50 
  },
  "blessing": {
    dict: "happiness", word: "blessing", stem: "bless", anew: "bless",
    avg: [ 4.05, 7.40 ], std: [ 2.59, 1.74 ], fq: 50 
  },
  "dinner": {
    dict: "happiness", word: "dinner", stem: "dinner", anew: "dinner",
    avg: [ 5.43, 7.40 ], std: [ 2.14, 1.14 ], fq: 50 
  },
  "kindness": {
    dict: "happiness", word: "kindness", stem: "kind", anew: "kindness",
    avg: [ 4.30, 7.40 ], std: [ 2.62, 1.09 ], fq: 50 
  },
  "pleased": {
    dict: "happiness", word: "pleased", stem: "pleas", anew: "delight",
    avg: [ 5.44, 7.40 ], std: [ 2.88, 1.16 ], fq: 50 
  },
  "sexy": {
    dict: "happiness", word: "sexy", stem: "sexi", anew: "sexy",
    avg: [ 7.36, 7.40 ], std: [ 1.91, 1.23 ], fq: 50 
  },
  "thank": {
    dict: "happiness", word: "thank", stem: "thank", anew: "thankful",
    avg: [ 4.34, 7.40 ], std: [ 2.31, 1.12 ], fq: 50 
  },
  "thanks": {
    dict: "happiness", word: "thanks", stem: "thank", anew: "thankful",
    avg: [ 4.34, 7.40 ], std: [ 2.31, 1.51 ], fq: 50 
  },
  "thanksgiving": {
    dict: "happiness", word: "thanksgiving", stem: "thanksgiv", anew: "bless",
    avg: [ 4.05, 7.40 ], std: [ 2.59, 1.41 ], fq: 50 
  },
  "treasure": {
    dict: "happiness", word: "treasure", stem: "treasur", anew: "treasure",
    avg: [ 6.75, 7.40 ], std: [ 2.30, 1.71 ], fq: 50 
  },
  "valentine": {
    dict: "happiness", word: "valentine", stem: "valentin", anew: "valentine",
    avg: [ 6.06, 7.40 ], std: [ 2.91, 1.70 ], fq: 50 
  },
  "riches": {
    dict: "happiness", word: "riches", stem: "rich", anew: "riches",
    avg: [ 6.17, 7.39 ], std: [ 2.70, 1.67 ], fq: 50 
  },
  "awarded": {
    dict: "happiness", word: "awarded", stem: "award", anew: "present",
    avg: [ 5.12, 7.38 ], std: [ 2.39, 1.16 ], fq: 50 
  },
  "hope": {
    dict: "happiness", word: "hope", stem: "hope", anew: "hopeful",
    avg: [ 5.78, 7.38 ], std: [ 2.09, 1.31 ], fq: 50 
  },
  "kids": {
    dict: "happiness", word: "kids", stem: "kid", anew: "kids",
    avg: [ 5.27, 7.38 ], std: [ 2.36, 1.60 ], fq: 50 
  },
  "magical": {
    dict: "happiness", word: "magical", stem: "magic", anew: "magical",
    avg: [ 5.95, 7.38 ], std: [ 2.36, 1.29 ], fq: 50 
  },
  "nice": {
    dict: "happiness", word: "nice", stem: "nice", anew: "nice",
    avg: [ 4.38, 7.38 ], std: [ 2.69, 1.51 ], fq: 50 
  },
  "wealth": {
    dict: "happiness", word: "wealth", stem: "wealth", anew: "riches",
    avg: [ 6.17, 7.38 ], std: [ 2.70, 1.23 ], fq: 50 
  },
  "fantasies": {
    dict: "happiness", word: "fantasies", stem: "fantasi", anew: "fantasy",
    avg: [ 5.14, 7.36 ], std: [ 2.82, 1.39 ], fq: 50 
  },
  "cares": {
    dict: "happiness", word: "cares", stem: "care", anew: "wish",
    avg: [ 5.16, 7.36 ], std: [ 2.62, 1.40 ], fq: 50 
  },
  "daughters": {
    dict: "happiness", word: "daughters", stem: "daughter", anew: "girl",
    avg: [ 4.29, 7.36 ], std: [ 2.69, 1.22 ], fq: 50 
  },
  "favorable": {
    dict: "happiness", word: "favorable", stem: "favor", anew: "favor",
    avg: [ 4.54, 7.36 ], std: [ 1.86, 1.51 ], fq: 50 
  },
  "grateful": {
    dict: "happiness", word: "grateful", stem: "grate", anew: "grateful",
    avg: [ 4.58, 7.36 ], std: [ 2.14, 1.47 ], fq: 50 
  },
  "inspired": {
    dict: "happiness", word: "inspired", stem: "inspir", anew: "inspired",
    avg: [ 6.02, 7.36 ], std: [ 2.67, 1.10 ], fq: 50 
  },
  "mothers": {
    dict: "happiness", word: "mothers", stem: "mother", anew: "mother",
    avg: [ 6.13, 7.36 ], std: [ 2.71, 1.47 ], fq: 50 
  },
  "liberation": {
    dict: "happiness", word: "liberation", stem: "liber", anew: "fire",
    avg: [ 7.17, 7.35 ], std: [ 2.06, 1.30 ], fq: 50 
  },
  "melody": {
    dict: "happiness", word: "melody", stem: "melodi", anew: "melody",
    avg: [ 4.98, 7.35 ], std: [ 2.52, 1.77 ], fq: 50 
  },
  "beloved": {
    dict: "happiness", word: "beloved", stem: "belov", anew: "loved",
    avg: [ 6.38, 7.34 ], std: [ 2.68, 1.27 ], fq: 50 
  },
  "caring": {
    dict: "happiness", word: "caring", stem: "care", anew: "wish",
    avg: [ 5.16, 7.34 ], std: [ 2.62, 1.41 ], fq: 50 
  },
  "inspiring": {
    dict: "happiness", word: "inspiring", stem: "inspir", anew: "inspired",
    avg: [ 6.02, 7.34 ], std: [ 2.67, 1.19 ], fq: 50 
  },
  "movies": {
    dict: "happiness", word: "movies", stem: "movi", anew: "movie",
    avg: [ 4.93, 7.34 ], std: [ 2.54, 1.45 ], fq: 50 
  },
  "precious": {
    dict: "happiness", word: "precious", stem: "preciou", anew: "cute",
    avg: [ 5.53, 7.34 ], std: [ 2.71, 1.52 ], fq: 50 
  },
  "respect": {
    dict: "happiness", word: "respect", stem: "respect", anew: "respectful",
    avg: [ 4.60, 7.34 ], std: [ 2.67, 1.61 ], fq: 50 
  },
  "satisfy": {
    dict: "happiness", word: "satisfy", stem: "satisfi", anew: "satisfied",
    avg: [ 4.94, 7.34 ], std: [ 2.63, 1.44 ], fq: 50 
  },
  "wedding": {
    dict: "happiness", word: "wedding", stem: "wed", anew: "wedding",
    avg: [ 5.97, 7.34 ], std: [ 2.85, 1.52 ], fq: 50 
  },
  "accomplished": {
    dict: "happiness", word: "accomplished", stem: "accomplish", anew: "execution",
    avg: [ 5.71, 7.32 ], std: [ 2.74, 1.30 ], fq: 50 
  },
  "adorable": {
    dict: "happiness", word: "adorable", stem: "ador", anew: "adorable",
    avg: [ 5.12, 7.32 ], std: [ 2.71, 1.70 ], fq: 50 
  },
  "comfortable": {
    dict: "happiness", word: "comfortable", stem: "comfort", anew: "comfort",
    avg: [ 3.93, 7.32 ], std: [ 2.85, 1.10 ], fq: 50 
  },
  "cuddle": {
    dict: "happiness", word: "cuddle", stem: "cuddl", anew: "cuddle",
    avg: [ 4.40, 7.32 ], std: [ 2.67, 1.73 ], fq: 50 
  },
  "games": {
    dict: "happiness", word: "games", stem: "game", anew: "game",
    avg: [ 5.89, 7.32 ], std: [ 2.37, 1.22 ], fq: 50 
  },
  "life": {
    dict: "happiness", word: "life", stem: "life", anew: "life",
    avg: [ 6.02, 7.32 ], std: [ 2.62, 1.70 ], fq: 50 
  },
  "lovely": {
    dict: "happiness", word: "lovely", stem: "love", anew: "loved",
    avg: [ 6.38, 7.32 ], std: [ 2.68, 1.54 ], fq: 50 
  },
  "pretty": {
    dict: "happiness", word: "pretty", stem: "pretti", anew: "pretty",
    avg: [ 6.03, 7.32 ], std: [ 2.22, 1.70 ], fq: 50 
  },
  "proud": {
    dict: "happiness", word: "proud", stem: "proud", anew: "proud",
    avg: [ 5.56, 7.32 ], std: [ 3.01, 1.43 ], fq: 50 
  },
  "united": {
    dict: "happiness", word: "united", stem: "unit", anew: "unit",
    avg: [ 3.75, 7.32 ], std: [ 2.49, 1.20 ], fq: 50 
  },
  "adventure": {
    dict: "happiness", word: "adventure", stem: "adventur", anew: "adventure",
    avg: [ 6.98, 7.30 ], std: [ 2.15, 1.43 ], fq: 50 
  },
  "couple": {
    dict: "happiness", word: "couple", stem: "coupl", anew: "couple",
    avg: [ 6.39, 7.30 ], std: [ 2.31, 1.27 ], fq: 50 
  },
  "dollars": {
    dict: "happiness", word: "dollars", stem: "dollar", anew: "dollar",
    avg: [ 6.07, 7.30 ], std: [ 2.67, 1.46 ], fq: 50 
  },
  "eating": {
    dict: "happiness", word: "eating", stem: "eat", anew: "eat",
    avg: [ 5.69, 7.30 ], std: [ 2.51, 1.78 ], fq: 50 
  },
  "fortune": {
    dict: "happiness", word: "fortune", stem: "fortun", anew: "chance",
    avg: [ 5.38, 7.30 ], std: [ 2.58, 1.39 ], fq: 50 
  },
  "golden": {
    dict: "happiness", word: "golden", stem: "golden", anew: "gold",
    avg: [ 5.76, 7.30 ], std: [ 2.79, 1.34 ], fq: 50 
  },
  "intelligence": {
    dict: "happiness", word: "intelligence", stem: "intellig", anew: "news",
    avg: [ 5.17, 7.30 ], std: [ 2.11, 1.20 ], fq: 50 
  },
  "luxury": {
    dict: "happiness", word: "luxury", stem: "luxuri", anew: "luxury",
    avg: [ 4.75, 7.30 ], std: [ 2.91, 1.68 ], fq: 50 
  },
  "money": {
    dict: "happiness", word: "money", stem: "money", anew: "money",
    avg: [ 5.70, 7.30 ], std: [ 2.66, 1.84 ], fq: 50 
  },
  "passion": {
    dict: "happiness", word: "passion", stem: "passion", anew: "passion",
    avg: [ 7.26, 7.30 ], std: [ 2.57, 1.47 ], fq: 50 
  },
  "prosperity": {
    dict: "happiness", word: "prosperity", stem: "prosper", anew: "success",
    avg: [ 6.11, 7.30 ], std: [ 2.65, 1.53 ], fq: 50 
  },
  "sweetie": {
    dict: "happiness", word: "sweetie", stem: "sweeti", anew: "sweetheart",
    avg: [ 5.50, 7.30 ], std: [ 2.73, 1.13 ], fq: 50 
  },
  "valentines": {
    dict: "happiness", word: "valentines", stem: "valentin", anew: "valentine",
    avg: [ 6.06, 7.30 ], std: [ 2.91, 1.78 ], fq: 50 
  },
  "educated": {
    dict: "happiness", word: "educated", stem: "educ", anew: "education",
    avg: [ 5.74, 7.29 ], std: [ 2.46, 1.31 ], fq: 50 
  },
  "baby": {
    dict: "happiness", word: "baby", stem: "babi", anew: "baby",
    avg: [ 5.53, 7.28 ], std: [ 2.80, 1.85 ], fq: 50 
  },
  "books": {
    dict: "happiness", word: "books", stem: "book", anew: "book",
    avg: [ 4.17, 7.28 ], std: [ 2.49, 1.33 ], fq: 50 
  },
  "bride": {
    dict: "happiness", word: "bride", stem: "bride", anew: "bride",
    avg: [ 5.55, 7.28 ], std: [ 2.74, 1.54 ], fq: 50 
  },
  "cherished": {
    dict: "happiness", word: "cherished", stem: "cherish", anew: "treasure",
    avg: [ 6.75, 7.28 ], std: [ 2.30, 1.58 ], fq: 50 
  },
  "employed": {
    dict: "happiness", word: "employed", stem: "employ", anew: "employment",
    avg: [ 5.28, 7.28 ], std: [ 2.12, 1.36 ], fq: 50 
  },
  "glow": {
    dict: "happiness", word: "glow", stem: "glow", anew: "burn",
    avg: [ 6.22, 7.28 ], std: [ 1.91, 1.29 ], fq: 50 
  },
  "god": {
    dict: "happiness", word: "god", stem: "god", anew: "god",
    avg: [ 5.95, 7.28 ], std: [ 2.84, 1.93 ], fq: 50 
  },
  "likes": {
    dict: "happiness", word: "likes", stem: "like", anew: "wish",
    avg: [ 5.16, 7.28 ], std: [ 2.62, 1.54 ], fq: 50 
  },
  "perfectly": {
    dict: "happiness", word: "perfectly", stem: "perfectli", anew: "dead",
    avg: [ 5.73, 7.28 ], std: [ 2.73, 1.59 ], fq: 50 
  },
  "satisfied": {
    dict: "happiness", word: "satisfied", stem: "satisfi", anew: "satisfied",
    avg: [ 4.94, 7.28 ], std: [ 2.63, 1.53 ], fq: 50 
  },
  "juicy": {
    dict: "happiness", word: "juicy", stem: "juici", anew: "blue",
    avg: [ 4.31, 7.27 ], std: [ 2.20, 1.20 ], fq: 50 
  },
  "divine": {
    dict: "happiness", word: "divine", stem: "divin", anew: "inspired",
    avg: [ 6.02, 7.26 ], std: [ 2.67, 1.41 ], fq: 50 
  },
  "dreaming": {
    dict: "happiness", word: "dreaming", stem: "dream", anew: "dream",
    avg: [ 4.53, 7.26 ], std: [ 2.72, 1.26 ], fq: 50 
  },
  "foods": {
    dict: "happiness", word: "foods", stem: "food", anew: "food",
    avg: [ 5.92, 7.26 ], std: [ 2.11, 1.48 ], fq: 50 
  },
  "fresh": {
    dict: "happiness", word: "fresh", stem: "fresh", anew: "wise",
    avg: [ 3.91, 7.26 ], std: [ 2.64, 1.32 ], fq: 50 
  },
  "greatest": {
    dict: "happiness", word: "greatest", stem: "greatest", anew: "outstanding",
    avg: [ 6.24, 7.26 ], std: [ 2.59, 1.52 ], fq: 50 
  },
  "hearts": {
    dict: "happiness", word: "hearts", stem: "heart", anew: "heart",
    avg: [ 6.34, 7.26 ], std: [ 2.25, 1.68 ], fq: 50 
  },
  "luck": {
    dict: "happiness", word: "luck", stem: "luck", anew: "chance",
    avg: [ 5.38, 7.26 ], std: [ 2.58, 1.88 ], fq: 50 
  },
  "play": {
    dict: "happiness", word: "play", stem: "play", anew: "flirt",
    avg: [ 6.91, 7.26 ], std: [ 1.69, 1.23 ], fq: 50 
  },
  "progress": {
    dict: "happiness", word: "progress", stem: "progress", anew: "progress",
    avg: [ 6.02, 7.26 ], std: [ 2.58, 1.16 ], fq: 50 
  },
  "savings": {
    dict: "happiness", word: "savings", stem: "save", anew: "save",
    avg: [ 4.95, 7.26 ], std: [ 2.19, 1.27 ], fq: 50 
  },
  "appreciation": {
    dict: "happiness", word: "appreciation", stem: "appreci", anew: "admired",
    avg: [ 6.11, 7.24 ], std: [ 2.36, 1.47 ], fq: 50 
  },
  "bliss": {
    dict: "happiness", word: "bliss", stem: "bliss", anew: "bliss",
    avg: [ 4.41, 7.24 ], std: [ 2.95, 1.76 ], fq: 50 
  },
  "bloom": {
    dict: "happiness", word: "bloom", stem: "bloom", anew: "flower",
    avg: [ 4.00, 7.24 ], std: [ 2.44, 1.60 ], fq: 50 
  },
  "book": {
    dict: "happiness", word: "book", stem: "book", anew: "book",
    avg: [ 4.17, 7.24 ], std: [ 2.49, 1.20 ], fq: 50 
  },
  "child": {
    dict: "happiness", word: "child", stem: "child", anew: "child",
    avg: [ 5.55, 7.24 ], std: [ 2.29, 1.56 ], fq: 50 
  },
  "computer": {
    dict: "happiness", word: "computer", stem: "comput", anew: "computer",
    avg: [ 4.75, 7.24 ], std: [ 1.93, 1.39 ], fq: 50 
  },
  "gardens": {
    dict: "happiness", word: "gardens", stem: "garden", anew: "garden",
    avg: [ 4.39, 7.24 ], std: [ 2.35, 1.35 ], fq: 50 
  },
  "gentle": {
    dict: "happiness", word: "gentle", stem: "gentl", anew: "gentle",
    avg: [ 3.21, 7.24 ], std: [ 2.57, 0.98 ], fq: 50 
  },
  "impressed": {
    dict: "happiness", word: "impressed", stem: "impress", anew: "impressed",
    avg: [ 5.42, 7.24 ], std: [ 2.65, 1.04 ], fq: 50 
  },
  "kind": {
    dict: "happiness", word: "kind", stem: "kind", anew: "kindness",
    avg: [ 4.30, 7.24 ], std: [ 2.62, 1.39 ], fq: 50 
  },
  "knowledge": {
    dict: "happiness", word: "knowledge", stem: "knowledg", anew: "knowledge",
    avg: [ 5.92, 7.24 ], std: [ 2.32, 1.46 ], fq: 50 
  },
  "liberty": {
    dict: "happiness", word: "liberty", stem: "liberti", anew: "liberty",
    avg: [ 5.60, 7.24 ], std: [ 2.65, 1.27 ], fq: 50 
  },
  "nature": {
    dict: "happiness", word: "nature", stem: "natur", anew: "nature",
    avg: [ 4.37, 7.24 ], std: [ 2.51, 1.80 ], fq: 50 
  },
  "pal": {
    dict: "happiness", word: "pal", stem: "pal", anew: "brother",
    avg: [ 4.71, 7.24 ], std: [ 2.68, 1.27 ], fq: 50 
  },
  "passionate": {
    dict: "happiness", word: "passionate", stem: "passion", anew: "passion",
    avg: [ 7.26, 7.24 ], std: [ 2.57, 1.08 ], fq: 50 
  },
  "promoted": {
    dict: "happiness", word: "promoted", stem: "promot", anew: "promotion",
    avg: [ 6.44, 7.24 ], std: [ 2.58, 1.49 ], fq: 50 
  },
  "reward": {
    dict: "happiness", word: "reward", stem: "reward", anew: "reward",
    avg: [ 4.95, 7.24 ], std: [ 2.62, 1.89 ], fq: 50 
  },
  "warmth": {
    dict: "happiness", word: "warmth", stem: "warmth", anew: "warmth",
    avg: [ 3.73, 7.24 ], std: [ 2.40, 1.65 ], fq: 50 
  },
  "amazed": {
    dict: "happiness", word: "amazed", stem: "amaz", anew: "astonished",
    avg: [ 6.58, 7.22 ], std: [ 2.22, 1.87 ], fq: 50 
  },
  "appreciate": {
    dict: "happiness", word: "appreciate", stem: "appreci", anew: "treasure",
    avg: [ 6.75, 7.22 ], std: [ 2.30, 1.18 ], fq: 50 
  },
  "brother": {
    dict: "happiness", word: "brother", stem: "brother", anew: "brother",
    avg: [ 4.71, 7.22 ], std: [ 2.68, 1.23 ], fq: 50 
  },
  "confidence": {
    dict: "happiness", word: "confidence", stem: "confid", anew: "confident",
    avg: [ 6.22, 7.22 ], std: [ 2.41, 1.28 ], fq: 50 
  },
  "darling": {
    dict: "happiness", word: "darling", stem: "darl", anew: "pet",
    avg: [ 5.10, 7.22 ], std: [ 2.59, 1.31 ], fq: 50 
  },
  "encouraging": {
    dict: "happiness", word: "encouraging", stem: "encourag", anew: "promotion",
    avg: [ 6.44, 7.22 ], std: [ 2.58, 1.56 ], fq: 50 
  },
  "energy": {
    dict: "happiness", word: "energy", stem: "energi", anew: "vigorous",
    avg: [ 5.90, 7.22 ], std: [ 2.66, 1.30 ], fq: 50 
  },
  "films": {
    dict: "happiness", word: "films", stem: "film", anew: "movie",
    avg: [ 4.93, 7.22 ], std: [ 2.54, 1.28 ], fq: 50 
  },
  "garden": {
    dict: "happiness", word: "garden", stem: "garden", anew: "garden",
    avg: [ 4.39, 7.22 ], std: [ 2.35, 1.18 ], fq: 50 
  },
  "graduated": {
    dict: "happiness", word: "graduated", stem: "graduat", anew: "graduate",
    avg: [ 7.25, 7.22 ], std: [ 2.25, 1.27 ], fq: 50 
  },
  "health": {
    dict: "happiness", word: "health", stem: "health", anew: "health",
    avg: [ 5.13, 7.22 ], std: [ 2.35, 1.25 ], fq: 50 
  },
  "heart": {
    dict: "happiness", word: "heart", stem: "heart", anew: "heart",
    avg: [ 6.34, 7.22 ], std: [ 2.25, 1.43 ], fq: 50 
  },
  "honor": {
    dict: "happiness", word: "honor", stem: "honor", anew: "honor",
    avg: [ 5.90, 7.22 ], std: [ 1.83, 1.20 ], fq: 50 
  },
  "like": {
    dict: "happiness", word: "like", stem: "like", anew: "wish",
    avg: [ 5.16, 7.22 ], std: [ 2.62, 1.22 ], fq: 50 
  },
  "musical": {
    dict: "happiness", word: "musical", stem: "music", anew: "music",
    avg: [ 5.32, 7.22 ], std: [ 3.19, 1.56 ], fq: 50 
  },
  "pets": {
    dict: "happiness", word: "pets", stem: "pet", anew: "pet",
    avg: [ 5.10, 7.22 ], std: [ 2.59, 1.53 ], fq: 50 
  },
  "relaxed": {
    dict: "happiness", word: "relaxed", stem: "relax", anew: "relaxed",
    avg: [ 2.39, 7.22 ], std: [ 2.13, 1.06 ], fq: 50 
  },
  "star": {
    dict: "happiness", word: "star", stem: "star", anew: "star",
    avg: [ 5.83, 7.22 ], std: [ 2.44, 1.58 ], fq: 50 
  },
  "sweeter": {
    dict: "happiness", word: "sweeter", stem: "sweeter", anew: "angel",
    avg: [ 4.83, 7.22 ], std: [ 2.63, 1.11 ], fq: 50 
  },
  "trust": {
    dict: "happiness", word: "trust", stem: "trust", anew: "trust",
    avg: [ 5.30, 7.22 ], std: [ 2.66, 1.23 ], fq: 50 
  },
  "ecstasy": {
    dict: "happiness", word: "ecstasy", stem: "ecstasi", anew: "ecstasy",
    avg: [ 7.38, 7.20 ], std: [ 1.92, 1.73 ], fq: 50 
  },
  "benefits": {
    dict: "happiness", word: "benefits", stem: "benefit", anew: "profit",
    avg: [ 6.68, 7.20 ], std: [ 1.78, 1.05 ], fq: 50 
  },
  "comforted": {
    dict: "happiness", word: "comforted", stem: "comfort", anew: "comfort",
    avg: [ 3.93, 7.20 ], std: [ 2.85, 1.44 ], fq: 50 
  },
  "discount": {
    dict: "happiness", word: "discount", stem: "discount", anew: "ignorance",
    avg: [ 4.39, 7.20 ], std: [ 2.49, 1.29 ], fq: 50 
  },
  "good": {
    dict: "happiness", word: "good", stem: "good", anew: "good",
    avg: [ 5.43, 7.20 ], std: [ 2.85, 1.46 ], fq: 50 
  },
  "perfection": {
    dict: "happiness", word: "perfection", stem: "perfect", anew: "perfection",
    avg: [ 5.95, 7.20 ], std: [ 2.73, 1.63 ], fq: 50 
  },
  "presents": {
    dict: "happiness", word: "presents", stem: "present", anew: "present",
    avg: [ 5.12, 7.20 ], std: [ 2.39, 1.46 ], fq: 50 
  },
  "prizes": {
    dict: "happiness", word: "prizes", stem: "prize", anew: "treasure",
    avg: [ 6.75, 7.20 ], std: [ 2.30, 2.03 ], fq: 50 
  },
  "wishes": {
    dict: "happiness", word: "wishes", stem: "wish", anew: "wish",
    avg: [ 5.16, 7.20 ], std: [ 2.62, 1.21 ], fq: 50 
  },
  "alive": {
    dict: "happiness", word: "alive", stem: "aliv", anew: "alive",
    avg: [ 5.50, 7.18 ], std: [ 2.74, 1.29 ], fq: 50 
  },
  "awards": {
    dict: "happiness", word: "awards", stem: "award", anew: "honor",
    avg: [ 5.90, 7.18 ], std: [ 1.83, 1.21 ], fq: 50 
  },
  "bed": {
    dict: "happiness", word: "bed", stem: "bed", anew: "bed",
    avg: [ 3.61, 7.18 ], std: [ 2.56, 1.29 ], fq: 50 
  },
  "best": {
    dict: "happiness", word: "best", stem: "best", anew: "respectful",
    avg: [ 4.60, 7.18 ], std: [ 2.67, 1.69 ], fq: 50 
  },
  "coffee": {
    dict: "happiness", word: "coffee", stem: "coffe", anew: "chocolate",
    avg: [ 5.29, 7.18 ], std: [ 2.55, 1.48 ], fq: 50 
  },
  "comfy": {
    dict: "happiness", word: "comfy", stem: "comfi", anew: "comfort",
    avg: [ 3.93, 7.18 ], std: [ 2.85, 1.22 ], fq: 50 
  },
  "imagine": {
    dict: "happiness", word: "imagine", stem: "imagin", anew: "imagine",
    avg: [ 5.98, 7.18 ], std: [ 2.14, 1.10 ], fq: 50 
  },
  "leisure": {
    dict: "happiness", word: "leisure", stem: "leisur", anew: "leisurely",
    avg: [ 3.80, 7.18 ], std: [ 2.38, 1.70 ], fq: 50 
  },
  "promise": {
    dict: "happiness", word: "promise", stem: "promis", anew: "hopeful",
    avg: [ 5.78, 7.18 ], std: [ 2.09, 1.19 ], fq: 50 
  },
  "respected": {
    dict: "happiness", word: "respected", stem: "respect", anew: "respectful",
    avg: [ 4.60, 7.18 ], std: [ 2.67, 1.02 ], fq: 50 
  },
  "rest": {
    dict: "happiness", word: "rest", stem: "rest", anew: "sleep",
    avg: [ 2.80, 7.18 ], std: [ 2.66, 1.26 ], fq: 50 
  },
  "travel": {
    dict: "happiness", word: "travel", stem: "travel", anew: "travel",
    avg: [ 6.21, 7.18 ], std: [ 2.51, 1.42 ], fq: 50 
  },
  "abundant": {
    dict: "happiness", word: "abundant", stem: "abund", anew: "abundance",
    avg: [ 5.51, 7.16 ], std: [ 2.63, 1.65 ], fq: 50 
  },
  "devoted": {
    dict: "happiness", word: "devoted", stem: "devot", anew: "devoted",
    avg: [ 5.23, 7.16 ], std: [ 2.21, 1.36 ], fq: 50 
  },
  "favourite": {
    dict: "happiness", word: "favourite", stem: "favourit", anew: "pet",
    avg: [ 5.10, 7.16 ], std: [ 2.59, 1.36 ], fq: 50 
  },
  "heroes": {
    dict: "happiness", word: "heroes", stem: "hero", anew: "champion",
    avg: [ 5.85, 7.16 ], std: [ 3.15, 1.57 ], fq: 50 
  },
  "ideas": {
    dict: "happiness", word: "ideas", stem: "idea", anew: "idea",
    avg: [ 5.86, 7.16 ], std: [ 1.81, 1.28 ], fq: 50 
  },
  "liked": {
    dict: "happiness", word: "liked", stem: "like", anew: "wish",
    avg: [ 5.16, 7.16 ], std: [ 2.62, 0.91 ], fq: 50 
  },
  "oceans": {
    dict: "happiness", word: "oceans", stem: "ocean", anew: "ocean",
    avg: [ 4.95, 7.16 ], std: [ 2.79, 1.62 ], fq: 50 
  },
  "pizza": {
    dict: "happiness", word: "pizza", stem: "pizza", anew: "pizza",
    avg: [ 5.24, 7.16 ], std: [ 2.09, 1.33 ], fq: 50 
  },
  "skies": {
    dict: "happiness", word: "skies", stem: "sky", anew: "sky",
    avg: [ 4.27, 7.16 ], std: [ 2.17, 1.35 ], fq: 50 
  },
  "sleep": {
    dict: "happiness", word: "sleep", stem: "sleep", anew: "sleep",
    avg: [ 2.80, 7.16 ], std: [ 2.66, 1.71 ], fq: 50 
  },
  "spring": {
    dict: "happiness", word: "spring", stem: "spring", anew: "spring",
    avg: [ 5.67, 7.16 ], std: [ 2.51, 1.43 ], fq: 50 
  },
  "sunset": {
    dict: "happiness", word: "sunset", stem: "sunset", anew: "sunset",
    avg: [ 4.20, 7.16 ], std: [ 2.99, 2.11 ], fq: 50 
  },
  "adoring": {
    dict: "happiness", word: "adoring", stem: "ador", anew: "adorable",
    avg: [ 5.12, 7.14 ], std: [ 2.71, 1.69 ], fq: 50 
  },
  "brighter": {
    dict: "happiness", word: "brighter", stem: "brighter", anew: "bright",
    avg: [ 5.40, 7.14 ], std: [ 2.33, 1.32 ], fq: 50 
  },
  "cure": {
    dict: "happiness", word: "cure", stem: "cure", anew: "heal",
    avg: [ 4.77, 7.14 ], std: [ 2.23, 1.51 ], fq: 50 
  },
  "fireworks": {
    dict: "happiness", word: "fireworks", stem: "firework", anew: "fireworks",
    avg: [ 6.67, 7.14 ], std: [ 2.12, 1.48 ], fq: 50 
  },
  "home": {
    dict: "happiness", word: "home", stem: "home", anew: "home",
    avg: [ 4.21, 7.14 ], std: [ 2.94, 1.83 ], fq: 50 
  },
  "honored": {
    dict: "happiness", word: "honored", stem: "honor", anew: "honor",
    avg: [ 5.90, 7.14 ], std: [ 1.83, 1.28 ], fq: 50 
  },
  "journey": {
    dict: "happiness", word: "journey", stem: "journey", anew: "travel",
    avg: [ 6.21, 7.14 ], std: [ 2.51, 1.51 ], fq: 50 
  },
  "opportunity": {
    dict: "happiness", word: "opportunity", stem: "opportun", anew: "chance",
    avg: [ 5.38, 7.14 ], std: [ 2.58, 1.71 ], fq: 50 
  },
  "paid": {
    dict: "happiness", word: "paid", stem: "paid", anew: "devoted",
    avg: [ 5.23, 7.14 ], std: [ 2.21, 1.71 ], fq: 50 
  },
  "parks": {
    dict: "happiness", word: "parks", stem: "park", anew: "green",
    avg: [ 4.28, 7.14 ], std: [ 2.46, 1.57 ], fq: 50 
  },
  "playing": {
    dict: "happiness", word: "playing", stem: "play", anew: "toy",
    avg: [ 5.11, 7.14 ], std: [ 2.84, 1.47 ], fq: 50 
  },
  "shine": {
    dict: "happiness", word: "shine", stem: "shine", anew: "fall",
    avg: [ 4.70, 7.14 ], std: [ 2.48, 1.71 ], fq: 50 
  },
  "wealthy": {
    dict: "happiness", word: "wealthy", stem: "wealthi", anew: "wealthy",
    avg: [ 5.80, 7.14 ], std: [ 2.73, 1.75 ], fq: 50 
  },
  "appreciated": {
    dict: "happiness", word: "appreciated", stem: "appreci", anew: "treasure",
    avg: [ 6.75, 7.12 ], std: [ 2.30, 1.51 ], fq: 50 
  },
  "children": {
    dict: "happiness", word: "children", stem: "children", anew: "baby",
    avg: [ 5.53, 7.12 ], std: [ 2.80, 1.35 ], fq: 50 
  },
  "inspire": {
    dict: "happiness", word: "inspire", stem: "inspir", anew: "inspired",
    avg: [ 6.02, 7.12 ], std: [ 2.67, 1.48 ], fq: 50 
  },
  "partners": {
    dict: "happiness", word: "partners", stem: "partner", anew: "spouse",
    avg: [ 5.21, 7.12 ], std: [ 2.75, 1.44 ], fq: 50 
  },
  "son": {
    dict: "happiness", word: "son", stem: "son", anew: "boy",
    avg: [ 4.58, 7.12 ], std: [ 2.37, 1.81 ], fq: 50 
  },
  "stronger": {
    dict: "happiness", word: "stronger", stem: "stronger", anew: "hard",
    avg: [ 5.12, 7.12 ], std: [ 2.19, 1.08 ], fq: 50 
  },
  "tree": {
    dict: "happiness", word: "tree", stem: "tree", anew: "tree",
    avg: [ 3.42, 7.12 ], std: [ 2.21, 1.32 ], fq: 50 
  },
  "women": {
    dict: "happiness", word: "women", stem: "women", anew: "woman",
    avg: [ 5.32, 7.12 ], std: [ 2.59, 1.47 ], fq: 50 
  },
  "glowing": {
    dict: "happiness", word: "glowing", stem: "glow", anew: "burn",
    avg: [ 6.22, 7.10 ], std: [ 1.91, 1.43 ], fq: 50 
  },
  "admiration": {
    dict: "happiness", word: "admiration", stem: "admir", anew: "admired",
    avg: [ 6.11, 7.10 ], std: [ 2.36, 1.46 ], fq: 50 
  },
  "computers": {
    dict: "happiness", word: "computers", stem: "comput", anew: "computer",
    avg: [ 4.75, 7.10 ], std: [ 1.93, 1.28 ], fq: 50 
  },
  "confident": {
    dict: "happiness", word: "confident", stem: "confid", anew: "confident",
    avg: [ 6.22, 7.10 ], std: [ 2.41, 1.18 ], fq: 50 
  },
  "dearest": {
    dict: "happiness", word: "dearest", stem: "dearest", anew: "good",
    avg: [ 5.43, 7.10 ], std: [ 2.85, 1.28 ], fq: 50 
  },
  "dream": {
    dict: "happiness", word: "dream", stem: "dream", anew: "dream",
    avg: [ 4.53, 7.10 ], std: [ 2.72, 1.96 ], fq: 50 
  },
  "plants": {
    dict: "happiness", word: "plants", stem: "plant", anew: "plant",
    avg: [ 3.62, 7.10 ], std: [ 2.25, 1.30 ], fq: 50 
  },
  "quality": {
    dict: "happiness", word: "quality", stem: "qualiti", anew: "quality",
    avg: [ 4.48, 7.10 ], std: [ 2.12, 1.42 ], fq: 50 
  },
  "rabbit": {
    dict: "happiness", word: "rabbit", stem: "rabbit", anew: "rabbit",
    avg: [ 4.02, 7.10 ], std: [ 2.19, 1.22 ], fq: 50 
  },
  "shopping": {
    dict: "happiness", word: "shopping", stem: "shop", anew: "grass",
    avg: [ 4.14, 7.10 ], std: [ 2.11, 1.54 ], fq: 50 
  },
  "sincere": {
    dict: "happiness", word: "sincere", stem: "sincer", anew: "solemn",
    avg: [ 3.56, 7.10 ], std: [ 1.95, 1.04 ], fq: 50 
  },
  "stars": {
    dict: "happiness", word: "stars", stem: "star", anew: "star",
    avg: [ 5.83, 7.10 ], std: [ 2.44, 1.54 ], fq: 50 
  },
  "toys": {
    dict: "happiness", word: "toys", stem: "toy", anew: "toy",
    avg: [ 5.11, 7.10 ], std: [ 2.84, 1.66 ], fq: 50 
  },
  "useful": {
    dict: "happiness", word: "useful", stem: "use", anew: "useful",
    avg: [ 4.26, 7.10 ], std: [ 2.47, 1.20 ], fq: 50 
  },
  "wise": {
    dict: "happiness", word: "wise", stem: "wise", anew: "wise",
    avg: [ 3.91, 7.10 ], std: [ 2.64, 1.27 ], fq: 50 
  },
  "desirable": {
    dict: "happiness", word: "desirable", stem: "desir", anew: "desire",
    avg: [ 7.35, 7.08 ], std: [ 1.76, 1.66 ], fq: 50 
  },
  "sparkle": {
    dict: "happiness", word: "sparkle", stem: "sparkl", anew: "foam",
    avg: [ 5.26, 7.08 ], std: [ 2.54, 1.62 ], fq: 50 
  },
  "bless": {
    dict: "happiness", word: "bless", stem: "bless", anew: "bless",
    avg: [ 4.05, 7.08 ], std: [ 2.59, 1.97 ], fq: 50 
  },
  "cooking": {
    dict: "happiness", word: "cooking", stem: "cook", anew: "cook",
    avg: [ 4.44, 7.08 ], std: [ 1.96, 1.29 ], fq: 50 
  },
  "faith": {
    dict: "happiness", word: "faith", stem: "faith", anew: "trust",
    avg: [ 5.30, 7.08 ], std: [ 2.66, 1.44 ], fq: 50 
  },
  "graduate": {
    dict: "happiness", word: "graduate", stem: "graduat", anew: "graduate",
    avg: [ 7.25, 7.08 ], std: [ 2.25, 1.24 ], fq: 50 
  },
  "improvements": {
    dict: "happiness", word: "improvements", stem: "improv", anew: "improve",
    avg: [ 5.69, 7.08 ], std: [ 2.15, 1.41 ], fq: 50 
  },
  "memories": {
    dict: "happiness", word: "memories", stem: "memori", anew: "memory",
    avg: [ 5.42, 7.08 ], std: [ 2.25, 1.19 ], fq: 50 
  },
  "park": {
    dict: "happiness", word: "park", stem: "park", anew: "green",
    avg: [ 4.28, 7.08 ], std: [ 2.46, 1.35 ], fq: 50 
  },
  "pet": {
    dict: "happiness", word: "pet", stem: "pet", anew: "pet",
    avg: [ 5.10, 7.08 ], std: [ 2.59, 1.70 ], fq: 50 
  },
  "powerful": {
    dict: "happiness", word: "powerful", stem: "power", anew: "powerful",
    avg: [ 5.83, 7.08 ], std: [ 2.69, 1.54 ], fq: 50 
  },
  "qualities": {
    dict: "happiness", word: "qualities", stem: "qualiti", anew: "quality",
    avg: [ 4.48, 7.08 ], std: [ 2.12, 1.16 ], fq: 50 
  },
  "thrill": {
    dict: "happiness", word: "thrill", stem: "thrill", anew: "thrill",
    avg: [ 8.02, 7.08 ], std: [ 1.65, 1.56 ], fq: 50 
  },
  "true": {
    dict: "happiness", word: "true", stem: "true", anew: "honest",
    avg: [ 5.32, 7.08 ], std: [ 1.92, 1.10 ], fq: 50 
  },
  "wonder": {
    dict: "happiness", word: "wonder", stem: "wonder", anew: "wonder",
    avg: [ 5.00, 7.08 ], std: [ 2.23, 1.31 ], fq: 50 
  },
  "everlasting": {
    dict: "happiness", word: "everlasting", stem: "everlast", anew: "perfection",
    avg: [ 5.95, 7.06 ], std: [ 2.73, 1.39 ], fq: 50 
  },
  "caress": {
    dict: "happiness", word: "caress", stem: "caress", anew: "caress",
    avg: [ 5.14, 7.06 ], std: [ 3.00, 1.72 ], fq: 50 
  },
  "charm": {
    dict: "happiness", word: "charm", stem: "charm", anew: "charm",
    avg: [ 5.16, 7.06 ], std: [ 2.25, 1.42 ], fq: 50 
  },
  "father": {
    dict: "happiness", word: "father", stem: "father", anew: "father",
    avg: [ 5.92, 7.06 ], std: [ 2.60, 1.74 ], fq: 50 
  },
  "grand": {
    dict: "happiness", word: "grand", stem: "grand", anew: "wonder",
    avg: [ 5.00, 7.06 ], std: [ 2.23, 1.36 ], fq: 50 
  },
  "idea": {
    dict: "happiness", word: "idea", stem: "idea", anew: "idea",
    avg: [ 5.86, 7.06 ], std: [ 1.81, 1.28 ], fq: 50 
  },
  "pictures": {
    dict: "happiness", word: "pictures", stem: "pictur", anew: "movie",
    avg: [ 4.93, 7.06 ], std: [ 2.54, 1.32 ], fq: 50 
  },
  "restaurant": {
    dict: "happiness", word: "restaurant", stem: "restaur", anew: "restaurant",
    avg: [ 5.41, 7.06 ], std: [ 2.55, 1.25 ], fq: 50 
  },
  "strong": {
    dict: "happiness", word: "strong", stem: "strong", anew: "strong",
    avg: [ 5.92, 7.06 ], std: [ 2.28, 1.52 ], fq: 50 
  },
  "talent": {
    dict: "happiness", word: "talent", stem: "talent", anew: "talent",
    avg: [ 6.27, 7.06 ], std: [ 1.80, 0.98 ], fq: 50 
  },
  "talented": {
    dict: "happiness", word: "talented", stem: "talent", anew: "talent",
    avg: [ 6.27, 7.06 ], std: [ 1.80, 1.53 ], fq: 50 
  },
  "tenderness": {
    dict: "happiness", word: "tenderness", stem: "tender", anew: "tender",
    avg: [ 4.88, 7.06 ], std: [ 2.30, 1.27 ], fq: 50 
  },
  "weddings": {
    dict: "happiness", word: "weddings", stem: "wed", anew: "wedding",
    avg: [ 5.97, 7.06 ], std: [ 2.85, 1.66 ], fq: 50 
  },
  "dove": {
    dict: "happiness", word: "dove", stem: "dove", anew: "dove",
    avg: [ 3.79, 7.04 ], std: [ 2.28, 1.44 ], fq: 50 
  },
  "cherry": {
    dict: "happiness", word: "cherry", stem: "cherri", anew: "red",
    avg: [ 5.29, 7.04 ], std: [ 2.04, 1.46 ], fq: 50 
  },
  "daughter": {
    dict: "happiness", word: "daughter", stem: "daughter", anew: "girl",
    avg: [ 4.29, 7.04 ], std: [ 2.69, 1.81 ], fq: 50 
  },
  "eat": {
    dict: "happiness", word: "eat", stem: "eat", anew: "eat",
    avg: [ 5.69, 7.04 ], std: [ 2.51, 1.46 ], fq: 50 
  },
  "favorite": {
    dict: "happiness", word: "favorite", stem: "favorit", anew: "pet",
    avg: [ 5.10, 7.04 ], std: [ 2.59, 1.65 ], fq: 50 
  },
  "girlfriend": {
    dict: "happiness", word: "girlfriend", stem: "girlfriend", anew: "girl",
    avg: [ 4.29, 7.04 ], std: [ 2.69, 1.63 ], fq: 50 
  },
  "hoping": {
    dict: "happiness", word: "hoping", stem: "hope", anew: "hopeful",
    avg: [ 5.78, 7.04 ], std: [ 2.09, 1.14 ], fq: 50 
  },
  "impressive": {
    dict: "happiness", word: "impressive", stem: "impress", anew: "impressed",
    avg: [ 5.42, 7.04 ], std: [ 2.65, 1.03 ], fq: 50 
  },
  "safe": {
    dict: "happiness", word: "safe", stem: "safe", anew: "safe",
    avg: [ 3.86, 7.04 ], std: [ 2.72, 1.62 ], fq: 50 
  },
  "scholarship": {
    dict: "happiness", word: "scholarship", stem: "scholarship", anew: "learn",
    avg: [ 5.39, 7.04 ], std: [ 2.22, 1.65 ], fq: 50 
  },
  "shining": {
    dict: "happiness", word: "shining", stem: "shine", anew: "bright",
    avg: [ 5.40, 7.04 ], std: [ 2.33, 1.76 ], fq: 50 
  },
  "sunrise": {
    dict: "happiness", word: "sunrise", stem: "sunris", anew: "sunrise",
    avg: [ 5.06, 7.04 ], std: [ 3.05, 1.80 ], fq: 50 
  },
  "respects": {
    dict: "happiness", word: "respects", stem: "respect", anew: "respectful",
    avg: [ 4.60, 7.02 ], std: [ 2.67, 1.62 ], fq: 50 
  },
  "fairy": {
    dict: "happiness", word: "fairy", stem: "fairi", anew: "queen",
    avg: [ 4.76, 7.02 ], std: [ 2.18, 1.48 ], fq: 50 
  },
  "humanity": {
    dict: "happiness", word: "humanity", stem: "human", anew: "humane",
    avg: [ 4.50, 7.02 ], std: [ 1.91, 1.63 ], fq: 50 
  },
  "brave": {
    dict: "happiness", word: "brave", stem: "brave", anew: "brave",
    avg: [ 6.15, 7.02 ], std: [ 2.45, 1.29 ], fq: 50 
  },
  "colours": {
    dict: "happiness", word: "colours", stem: "colour", anew: "color",
    avg: [ 4.73, 7.02 ], std: [ 2.64, 1.38 ], fq: 50 
  },
  "dollar": {
    dict: "happiness", word: "dollar", stem: "dollar", anew: "dollar",
    avg: [ 6.07, 7.02 ], std: [ 2.67, 1.52 ], fq: 50 
  },
  "easily": {
    dict: "happiness", word: "easily", stem: "easili", anew: "easy",
    avg: [ 4.48, 7.02 ], std: [ 2.82, 1.63 ], fq: 50 
  },
  "inspiration": {
    dict: "happiness", word: "inspiration", stem: "inspir", anew: "inspired",
    avg: [ 6.02, 7.02 ], std: [ 2.67, 1.45 ], fq: 50 
  },
  "saints": {
    dict: "happiness", word: "saints", stem: "saint", anew: "saint",
    avg: [ 4.49, 7.02 ], std: [ 1.90, 1.72 ], fq: 50 
  },
  "sleeping": {
    dict: "happiness", word: "sleeping", stem: "sleep", anew: "sleep",
    avg: [ 2.80, 7.02 ], std: [ 2.66, 1.67 ], fq: 50 
  },
  "wisdom": {
    dict: "happiness", word: "wisdom", stem: "wisdom", anew: "wise",
    avg: [ 3.91, 7.02 ], std: [ 2.64, 1.56 ], fq: 50 
  },
  "believed": {
    dict: "happiness", word: "believed", stem: "believ", anew: "trust",
    avg: [ 5.30, 7.00 ], std: [ 2.66, 1.28 ], fq: 50 
  },
  "better": {
    dict: "happiness", word: "better", stem: "better", anew: "respectful",
    avg: [ 4.60, 7.00 ], std: [ 2.67, 1.28 ], fq: 50 
  },
  "color": {
    dict: "happiness", word: "color", stem: "color", anew: "color",
    avg: [ 4.73, 7.00 ], std: [ 2.64, 1.37 ], fq: 50 
  },
  "colors": {
    dict: "happiness", word: "colors", stem: "color", anew: "color",
    avg: [ 4.73, 7.00 ], std: [ 2.64, 1.75 ], fq: 50 
  },
  "discovered": {
    dict: "happiness", word: "discovered", stem: "discov", anew: "key",
    avg: [ 3.70, 7.00 ], std: [ 2.18, 1.25 ], fq: 50 
  },
  "gentlemen": {
    dict: "happiness", word: "gentlemen", stem: "gentlemen", anew: "man",
    avg: [ 5.24, 7.00 ], std: [ 2.31, 1.43 ], fq: 50 
  },
  "girl": {
    dict: "happiness", word: "girl", stem: "girl", anew: "girl",
    avg: [ 4.29, 7.00 ], std: [ 2.69, 1.16 ], fq: 50 
  },
  "hopes": {
    dict: "happiness", word: "hopes", stem: "hope", anew: "hopeful",
    avg: [ 5.78, 7.00 ], std: [ 2.09, 1.55 ], fq: 50 
  },
  "reliable": {
    dict: "happiness", word: "reliable", stem: "reliabl", anew: "honest",
    avg: [ 5.32, 7.00 ], std: [ 1.92, 1.48 ], fq: 50 
  },
  "trip": {
    dict: "happiness", word: "trip", stem: "trip", anew: "travel",
    avg: [ 6.21, 7.00 ], std: [ 2.51, 1.55 ], fq: 50 
  },
  "approval": {
    dict: "happiness", word: "approval", stem: "approv", anew: "bless",
    avg: [ 4.05, 6.98 ], std: [ 2.59, 1.20 ], fq: 50 
  },
  "brothers": {
    dict: "happiness", word: "brothers", stem: "brother", anew: "brother",
    avg: [ 4.71, 6.98 ], std: [ 2.68, 1.45 ], fq: 50 
  },
  "encouraged": {
    dict: "happiness", word: "encouraged", stem: "encourag", anew: "promotion",
    avg: [ 6.44, 6.98 ], std: [ 2.58, 1.24 ], fq: 50 
  },
  "giving": {
    dict: "happiness", word: "giving", stem: "give", anew: "devoted",
    avg: [ 5.23, 6.98 ], std: [ 2.21, 1.15 ], fq: 50 
  },
  "ideal": {
    dict: "happiness", word: "ideal", stem: "ideal", anew: "saint",
    avg: [ 4.49, 6.98 ], std: [ 1.90, 1.71 ], fq: 50 
  },
  "intellectual": {
    dict: "happiness", word: "intellectual", stem: "intellectu", anew: "intellect",
    avg: [ 4.75, 6.98 ], std: [ 2.50, 1.29 ], fq: 50 
  },
  "marry": {
    dict: "happiness", word: "marry", stem: "marri", anew: "wedding",
    avg: [ 5.97, 6.98 ], std: [ 2.85, 1.87 ], fq: 50 
  },
  "outdoors": {
    dict: "happiness", word: "outdoors", stem: "outdoor", anew: "outdoors",
    avg: [ 5.92, 6.98 ], std: [ 2.55, 1.70 ], fq: 50 
  },
  "plenty": {
    dict: "happiness", word: "plenty", stem: "plenti", anew: "mountain",
    avg: [ 5.49, 6.98 ], std: [ 2.43, 1.22 ], fq: 50 
  },
  "trees": {
    dict: "happiness", word: "trees", stem: "tree", anew: "tree",
    avg: [ 3.42, 6.98 ], std: [ 2.21, 1.60 ], fq: 50 
  },
  "trips": {
    dict: "happiness", word: "trips", stem: "trip", anew: "travel",
    avg: [ 6.21, 6.98 ], std: [ 2.51, 1.32 ], fq: 50 
  },
  "unique": {
    dict: "happiness", word: "unique", stem: "uniqu", anew: "alone",
    avg: [ 4.83, 6.98 ], std: [ 2.66, 1.44 ], fq: 50 
  },
  "thrills": {
    dict: "happiness", word: "thrills", stem: "thrill", anew: "thrill",
    avg: [ 8.02, 6.98 ], std: [ 1.65, 1.33 ], fq: 50 
  },
  "bath": {
    dict: "happiness", word: "bath", stem: "bath", anew: "bath",
    avg: [ 4.16, 6.96 ], std: [ 2.31, 1.26 ], fq: 50 
  },
  "benefit": {
    dict: "happiness", word: "benefit", stem: "benefit", anew: "profit",
    avg: [ 6.68, 6.96 ], std: [ 1.78, 1.31 ], fq: 50 
  },
  "birds": {
    dict: "happiness", word: "birds", stem: "bird", anew: "bird",
    avg: [ 3.17, 6.96 ], std: [ 2.23, 1.43 ], fq: 50 
  },
  "elegant": {
    dict: "happiness", word: "elegant", stem: "eleg", anew: "elegant",
    avg: [ 4.53, 6.96 ], std: [ 2.65, 1.93 ], fq: 50 
  },
  "fair": {
    dict: "happiness", word: "fair", stem: "fair", anew: "honest",
    avg: [ 5.32, 6.96 ], std: [ 1.92, 1.26 ], fq: 50 
  },
  "fancy": {
    dict: "happiness", word: "fancy", stem: "fanci", anew: "fantasy",
    avg: [ 5.14, 6.96 ], std: [ 2.82, 1.37 ], fq: 50 
  },
  "imagination": {
    dict: "happiness", word: "imagination", stem: "imagin", anew: "imagine",
    avg: [ 5.98, 6.96 ], std: [ 2.14, 1.35 ], fq: 50 
  },
  "improving": {
    dict: "happiness", word: "improving", stem: "improv", anew: "improve",
    avg: [ 5.69, 6.96 ], std: [ 2.15, 0.88 ], fq: 50 
  },
  "mountains": {
    dict: "happiness", word: "mountains", stem: "mountain", anew: "mountain",
    avg: [ 5.49, 6.96 ], std: [ 2.43, 1.19 ], fq: 50 
  },
  "ocean": {
    dict: "happiness", word: "ocean", stem: "ocean", anew: "ocean",
    avg: [ 4.95, 6.96 ], std: [ 2.79, 1.71 ], fq: 50 
  },
  "pancakes": {
    dict: "happiness", word: "pancakes", stem: "pancak", anew: "pancakes",
    avg: [ 4.06, 6.96 ], std: [ 2.13, 1.21 ], fq: 50 
  },
  "present": {
    dict: "happiness", word: "present", stem: "present", anew: "present",
    avg: [ 5.12, 6.96 ], std: [ 2.39, 1.28 ], fq: 50 
  },
  "reunion": {
    dict: "happiness", word: "reunion", stem: "reunion", anew: "reunion",
    avg: [ 6.34, 6.96 ], std: [ 2.35, 1.63 ], fq: 50 
  },
  "safely": {
    dict: "happiness", word: "safely", stem: "safe", anew: "safe",
    avg: [ 3.86, 6.96 ], std: [ 2.72, 1.46 ], fq: 50 
  },
  "saving": {
    dict: "happiness", word: "saving", stem: "save", anew: "save",
    avg: [ 4.95, 6.96 ], std: [ 2.19, 1.26 ], fq: 50 
  },
  "singing": {
    dict: "happiness", word: "singing", stem: "sing", anew: "whistle",
    avg: [ 4.69, 6.96 ], std: [ 1.99, 1.70 ], fq: 50 
  },
  "songs": {
    dict: "happiness", word: "songs", stem: "song", anew: "song",
    avg: [ 6.07, 6.96 ], std: [ 2.42, 1.87 ], fq: 50 
  },
  "terrific": {
    dict: "happiness", word: "terrific", stem: "terrif", anew: "terrific",
    avg: [ 6.23, 6.96 ], std: [ 2.73, 2.08 ], fq: 50 
  },
  "theater": {
    dict: "happiness", word: "theater", stem: "theater", anew: "house",
    avg: [ 4.56, 6.96 ], std: [ 2.41, 1.55 ], fq: 50 
  },
  "adore": {
    dict: "happiness", word: "adore", stem: "ador", anew: "adorable",
    avg: [ 5.12, 6.96 ], std: [ 2.71, 1.86 ], fq: 50 
  },
  "gentleman": {
    dict: "happiness", word: "gentleman", stem: "gentleman", anew: "man",
    avg: [ 5.24, 6.96 ], std: [ 2.31, 1.73 ], fq: 50 
  },
  "autumn": {
    dict: "happiness", word: "autumn", stem: "autumn", anew: "autumn",
    avg: [ 4.51, 6.94 ], std: [ 2.50, 1.50 ], fq: 50 
  },
  "cozy": {
    dict: "happiness", word: "cozy", stem: "cozi", anew: "cozy",
    avg: [ 3.32, 6.94 ], std: [ 2.28, 1.46 ], fq: 50 
  },
  "dear": {
    dict: "happiness", word: "dear", stem: "dear", anew: "lamb",
    avg: [ 3.36, 6.94 ], std: [ 2.18, 1.54 ], fq: 50 
  },
  "gardening": {
    dict: "happiness", word: "gardening", stem: "garden", anew: "garden",
    avg: [ 4.39, 6.94 ], std: [ 2.35, 1.27 ], fq: 50 
  },
  "girls": {
    dict: "happiness", word: "girls", stem: "girl", anew: "girl",
    avg: [ 4.29, 6.94 ], std: [ 2.69, 1.46 ], fq: 50 
  },
  "outdoor": {
    dict: "happiness", word: "outdoor", stem: "outdoor", anew: "outdoors",
    avg: [ 5.92, 6.94 ], std: [ 2.55, 1.24 ], fq: 50 
  },
  "piano": {
    dict: "happiness", word: "piano", stem: "piano", anew: "soft",
    avg: [ 4.63, 6.94 ], std: [ 2.61, 1.27 ], fq: 50 
  },
  "sea": {
    dict: "happiness", word: "sea", stem: "sea", anew: "ocean",
    avg: [ 4.95, 6.94 ], std: [ 2.79, 1.28 ], fq: 50 
  },
  "trusted": {
    dict: "happiness", word: "trusted", stem: "trust", anew: "trust",
    avg: [ 5.30, 6.94 ], std: [ 2.66, 1.53 ], fq: 50 
  },
  "favored": {
    dict: "happiness", word: "favored", stem: "favor", anew: "favor",
    avg: [ 4.54, 6.92 ], std: [ 1.86, 1.35 ], fq: 50 
  },
  "game": {
    dict: "happiness", word: "game", stem: "game", anew: "game",
    avg: [ 5.89, 6.92 ], std: [ 2.37, 1.60 ], fq: 50 
  },
  "healing": {
    dict: "happiness", word: "healing", stem: "heal", anew: "heal",
    avg: [ 4.77, 6.92 ], std: [ 2.23, 1.40 ], fq: 50 
  },
  "learned": {
    dict: "happiness", word: "learned", stem: "learn", anew: "learn",
    avg: [ 5.39, 6.92 ], std: [ 2.22, 1.52 ], fq: 50 
  },
  "learning": {
    dict: "happiness", word: "learning", stem: "learn", anew: "learn",
    avg: [ 5.39, 6.92 ], std: [ 2.22, 1.35 ], fq: 50 
  },
  "promote": {
    dict: "happiness", word: "promote", stem: "promot", anew: "promotion",
    avg: [ 6.44, 6.92 ], std: [ 2.58, 1.07 ], fq: 50 
  },
  "secure": {
    dict: "happiness", word: "secure", stem: "secur", anew: "secure",
    avg: [ 3.14, 6.92 ], std: [ 2.47, 1.29 ], fq: 50 
  },
  "unity": {
    dict: "happiness", word: "unity", stem: "uniti", anew: "ace",
    avg: [ 5.50, 6.92 ], std: [ 2.66, 1.75 ], fq: 50 
  },
  "wish": {
    dict: "happiness", word: "wish", stem: "wish", anew: "wish",
    avg: [ 5.16, 6.92 ], std: [ 2.62, 1.50 ], fq: 50 
  },
  "favour": {
    dict: "happiness", word: "favour", stem: "favour", anew: "favor",
    avg: [ 4.54, 6.92 ], std: [ 1.86, 1.53 ], fq: 50 
  },
  "clean": {
    dict: "happiness", word: "clean", stem: "clean", anew: "white",
    avg: [ 4.37, 6.90 ], std: [ 2.14, 1.90 ], fq: 50 
  },
  "dynamic": {
    dict: "happiness", word: "dynamic", stem: "dynam", anew: "activate",
    avg: [ 4.86, 6.90 ], std: [ 2.56, 1.31 ], fq: 50 
  },
  "encourage": {
    dict: "happiness", word: "encourage", stem: "encourag", anew: "promotion",
    avg: [ 6.44, 6.90 ], std: [ 2.58, 1.68 ], fq: 50 
  },
  "infant": {
    dict: "happiness", word: "infant", stem: "infant", anew: "infant",
    avg: [ 5.05, 6.90 ], std: [ 2.66, 1.76 ], fq: 50 
  },
  "paintings": {
    dict: "happiness", word: "paintings", stem: "paint", anew: "paint",
    avg: [ 4.10, 6.90 ], std: [ 2.36, 1.59 ], fq: 50 
  },
  "voyage": {
    dict: "happiness", word: "voyage", stem: "voyag", anew: "voyage",
    avg: [ 5.55, 6.90 ], std: [ 2.23, 1.33 ], fq: 50 
  },
  "worthy": {
    dict: "happiness", word: "worthy", stem: "worthi", anew: "desire",
    avg: [ 7.35, 6.90 ], std: [ 1.76, 1.68 ], fq: 50 
  },
  "fulfill": {
    dict: "happiness", word: "fulfill", stem: "fulfil", anew: "execution",
    avg: [ 5.71, 6.90 ], std: [ 2.74, 1.34 ], fq: 50 
  },
  "accuracy": {
    dict: "happiness", word: "accuracy", stem: "accuraci", anew: "truth",
    avg: [ 5.00, 6.88 ], std: [ 2.77, 1.17 ], fq: 50 
  },
  "breeze": {
    dict: "happiness", word: "breeze", stem: "breez", anew: "breeze",
    avg: [ 4.37, 6.88 ], std: [ 2.32, 1.33 ], fq: 50 
  },
  "bunny": {
    dict: "happiness", word: "bunny", stem: "bunni", anew: "bunny",
    avg: [ 4.06, 6.88 ], std: [ 2.61, 1.79 ], fq: 50 
  },
  "education": {
    dict: "happiness", word: "education", stem: "educ", anew: "education",
    avg: [ 5.74, 6.88 ], std: [ 2.46, 1.61 ], fq: 50 
  },
  "flavor": {
    dict: "happiness", word: "flavor", stem: "flavor", anew: "spirit",
    avg: [ 5.56, 6.88 ], std: [ 2.62, 1.22 ], fq: 50 
  },
  "pillow": {
    dict: "happiness", word: "pillow", stem: "pillow", anew: "pillow",
    avg: [ 2.97, 6.88 ], std: [ 2.52, 1.22 ], fq: 50 
  },
  "pure": {
    dict: "happiness", word: "pure", stem: "pure", anew: "virgin",
    avg: [ 5.51, 6.88 ], std: [ 2.06, 1.35 ], fq: 50 
  },
  "saved": {
    dict: "happiness", word: "saved", stem: "save", anew: "save",
    avg: [ 4.95, 6.88 ], std: [ 2.19, 1.51 ], fq: 50 
  },
  "survived": {
    dict: "happiness", word: "survived", stem: "surviv", anew: "lively",
    avg: [ 5.53, 6.88 ], std: [ 2.90, 1.48 ], fq: 50 
  },
  "taste": {
    dict: "happiness", word: "taste", stem: "tast", anew: "taste",
    avg: [ 5.22, 6.88 ], std: [ 2.38, 1.27 ], fq: 50 
  },
  "valued": {
    dict: "happiness", word: "valued", stem: "valu", anew: "treasure",
    avg: [ 6.75, 6.88 ], std: [ 2.30, 1.12 ], fq: 50 
  },
  "infants": {
    dict: "happiness", word: "infants", stem: "infant", anew: "infant",
    avg: [ 5.05, 6.88 ], std: [ 2.66, 1.63 ], fq: 50 
  },
  "silk": {
    dict: "happiness", word: "silk", stem: "silk", anew: "silk",
    avg: [ 3.71, 6.88 ], std: [ 2.51, 1.45 ], fq: 50 
  },
  "dreamed": {
    dict: "happiness", word: "dreamed", stem: "dream", anew: "dream",
    avg: [ 4.53, 6.87 ], std: [ 2.72, 1.39 ], fq: 50 
  },
  "acceptance": {
    dict: "happiness", word: "acceptance", stem: "accept", anew: "acceptance",
    avg: [ 5.40, 6.86 ], std: [ 2.70, 1.28 ], fq: 50 
  },
  "dancer": {
    dict: "happiness", word: "dancer", stem: "dancer", anew: "dancer",
    avg: [ 6.00, 6.86 ], std: [ 2.20, 1.54 ], fq: 50 
  },
  "grace": {
    dict: "happiness", word: "grace", stem: "grace", anew: "bless",
    avg: [ 4.05, 6.86 ], std: [ 2.59, 1.53 ], fq: 50 
  },
  "guarantee": {
    dict: "happiness", word: "guarantee", stem: "guarante", anew: "secure",
    avg: [ 3.14, 6.86 ], std: [ 2.47, 1.31 ], fq: 50 
  },
  "improved": {
    dict: "happiness", word: "improved", stem: "improv", anew: "improve",
    avg: [ 5.69, 6.86 ], std: [ 2.15, 1.36 ], fq: 50 
  },
  "improvement": {
    dict: "happiness", word: "improvement", stem: "improv", anew: "improve",
    avg: [ 5.69, 6.86 ], std: [ 2.15, 1.26 ], fq: 50 
  },
  "liking": {
    dict: "happiness", word: "liking", stem: "like", anew: "wish",
    avg: [ 5.16, 6.86 ], std: [ 2.62, 0.88 ], fq: 50 
  },
  "pasta": {
    dict: "happiness", word: "pasta", stem: "pasta", anew: "pasta",
    avg: [ 4.94, 6.86 ], std: [ 2.04, 1.41 ], fq: 50 
  },
  "sailing": {
    dict: "happiness", word: "sailing", stem: "sail", anew: "voyage",
    avg: [ 5.55, 6.86 ], std: [ 2.23, 1.48 ], fq: 50 
  },
  "seas": {
    dict: "happiness", word: "seas", stem: "sea", anew: "ocean",
    avg: [ 4.95, 6.86 ], std: [ 2.79, 1.63 ], fq: 50 
  },
  "toast": {
    dict: "happiness", word: "toast", stem: "toast", anew: "salute",
    avg: [ 5.31, 6.86 ], std: [ 2.23, 1.41 ], fq: 50 
  },
  "superstar": {
    dict: "happiness", word: "superstar", stem: "superstar", anew: "champion",
    avg: [ 5.85, 6.86 ], std: [ 3.15, 1.97 ], fq: 50 
  },
  "advantage": {
    dict: "happiness", word: "advantage", stem: "advantag", anew: "advantage",
    avg: [ 4.76, 6.84 ], std: [ 2.18, 1.28 ], fq: 50 
  },
  "buddy": {
    dict: "happiness", word: "buddy", stem: "buddi", anew: "brother",
    avg: [ 4.71, 6.84 ], std: [ 2.68, 1.06 ], fq: 50 
  },
  "daylight": {
    dict: "happiness", word: "daylight", stem: "daylight", anew: "daylight",
    avg: [ 4.77, 6.84 ], std: [ 2.50, 1.40 ], fq: 50 
  },
  "discover": {
    dict: "happiness", word: "discover", stem: "discov", anew: "key",
    avg: [ 3.70, 6.84 ], std: [ 2.18, 1.40 ], fq: 50 
  },
  "hopefully": {
    dict: "happiness", word: "hopefully", stem: "hope", anew: "hopeful",
    avg: [ 5.78, 6.84 ], std: [ 2.09, 1.52 ], fq: 50 
  },
  "horses": {
    dict: "happiness", word: "horses", stem: "hors", anew: "horse",
    avg: [ 3.89, 6.84 ], std: [ 2.17, 1.48 ], fq: 50 
  },
  "interested": {
    dict: "happiness", word: "interested", stem: "interest", anew: "interest",
    avg: [ 5.66, 6.84 ], std: [ 2.26, 1.09 ], fq: 50 
  },
  "kid": {
    dict: "happiness", word: "kid", stem: "kid", anew: "kids",
    avg: [ 5.27, 6.84 ], std: [ 2.36, 1.48 ], fq: 50 
  },
  "live": {
    dict: "happiness", word: "live", stem: "live", anew: "lively",
    avg: [ 5.53, 6.84 ], std: [ 2.90, 1.52 ], fq: 50 
  },
  "movie": {
    dict: "happiness", word: "movie", stem: "movi", anew: "movie",
    avg: [ 4.93, 6.84 ], std: [ 2.54, 1.98 ], fq: 50 
  },
  "solution": {
    dict: "happiness", word: "solution", stem: "solut", anew: "answer",
    avg: [ 5.41, 6.84 ], std: [ 2.43, 1.38 ], fq: 50 
  },
  "swim": {
    dict: "happiness", word: "swim", stem: "swim", anew: "drown",
    avg: [ 6.57, 6.84 ], std: [ 2.33, 1.30 ], fq: 50 
  },
  "toy": {
    dict: "happiness", word: "toy", stem: "toy", anew: "toy",
    avg: [ 5.11, 6.84 ], std: [ 2.84, 2.03 ], fq: 50 
  },
  "understanding": {
    dict: "happiness", word: "understanding", stem: "understand", anew: "agreement",
    avg: [ 5.02, 6.84 ], std: [ 2.24, 1.17 ], fq: 50 
  },
  "universe": {
    dict: "happiness", word: "universe", stem: "univers", anew: "world",
    avg: [ 5.32, 6.84 ], std: [ 2.39, 1.28 ], fq: 50 
  },
  "woman": {
    dict: "happiness", word: "woman", stem: "woman", anew: "woman",
    avg: [ 5.32, 6.84 ], std: [ 2.59, 1.65 ], fq: 50 
  },
  "rivers": {
    dict: "happiness", word: "rivers", stem: "river", anew: "river",
    avg: [ 4.51, 6.84 ], std: [ 2.42, 1.53 ], fq: 50 
  },
  "sail": {
    dict: "happiness", word: "sail", stem: "sail", anew: "voyage",
    avg: [ 5.55, 6.84 ], std: [ 2.23, 1.56 ], fq: 50 
  },
  "cared": {
    dict: "happiness", word: "cared", stem: "care", anew: "wish",
    avg: [ 5.16, 6.83 ], std: [ 2.62, 1.27 ], fq: 50 
  },
  "active": {
    dict: "happiness", word: "active", stem: "activ", anew: "activate",
    avg: [ 4.86, 6.82 ], std: [ 2.56, 1.77 ], fq: 50 
  },
  "babe": {
    dict: "happiness", word: "babe", stem: "babe", anew: "baby",
    avg: [ 5.53, 6.82 ], std: [ 2.80, 1.27 ], fq: 50 
  },
  "believes": {
    dict: "happiness", word: "believes", stem: "believ", anew: "impressed",
    avg: [ 5.42, 6.82 ], std: [ 2.65, 1.19 ], fq: 50 
  },
  "born": {
    dict: "happiness", word: "born", stem: "born", anew: "nature",
    avg: [ 4.37, 6.82 ], std: [ 2.51, 1.65 ], fq: 50 
  },
  "compassion": {
    dict: "happiness", word: "compassion", stem: "compass", anew: "pity",
    avg: [ 3.72, 6.82 ], std: [ 2.02, 1.90 ], fq: 50 
  },
  "dedicated": {
    dict: "happiness", word: "dedicated", stem: "dedic", anew: "devoted",
    avg: [ 5.23, 6.82 ], std: [ 2.21, 1.32 ], fq: 50 
  },
  "experienced": {
    dict: "happiness", word: "experienced", stem: "experienc", anew: "lively",
    avg: [ 5.53, 6.82 ], std: [ 2.90, 1.17 ], fq: 50 
  },
  "fathers": {
    dict: "happiness", word: "fathers", stem: "father", anew: "father",
    avg: [ 5.92, 6.82 ], std: [ 2.60, 1.83 ], fq: 50 
  },
  "gains": {
    dict: "happiness", word: "gains", stem: "gain", anew: "win",
    avg: [ 7.72, 6.82 ], std: [ 2.16, 1.48 ], fq: 50 
  },
  "heal": {
    dict: "happiness", word: "heal", stem: "heal", anew: "heal",
    avg: [ 4.77, 6.82 ], std: [ 2.23, 1.45 ], fq: 50 
  },
  "new": {
    dict: "happiness", word: "new", stem: "new", anew: "young",
    avg: [ 5.64, 6.82 ], std: [ 2.51, 1.14 ], fq: 50 
  },
  "young": {
    dict: "happiness", word: "young", stem: "young", anew: "young",
    avg: [ 5.64, 6.82 ], std: [ 2.51, 1.24 ], fq: 50 
  },
  "mansion": {
    dict: "happiness", word: "mansion", stem: "mansion", anew: "house",
    avg: [ 4.56, 6.82 ], std: [ 2.41, 1.63 ], fq: 50 
  },
  "prevail": {
    dict: "happiness", word: "prevail", stem: "prevail", anew: "triumph",
    avg: [ 5.78, 6.82 ], std: [ 2.60, 1.73 ], fq: 50 
  },
  "air": {
    dict: "happiness", word: "air", stem: "air", anew: "air",
    avg: [ 4.12, 6.80 ], std: [ 2.30, 1.65 ], fq: 50 
  },
  "animal": {
    dict: "happiness", word: "animal", stem: "anim", anew: "beast",
    avg: [ 5.57, 6.80 ], std: [ 2.61, 1.85 ], fq: 50 
  },
  "horse": {
    dict: "happiness", word: "horse", stem: "hors", anew: "horse",
    avg: [ 3.89, 6.80 ], std: [ 2.17, 1.51 ], fq: 50 
  },
  "magic": {
    dict: "happiness", word: "magic", stem: "magic", anew: "magical",
    avg: [ 5.95, 6.80 ], std: [ 2.36, 1.76 ], fq: 50 
  },
  "manners": {
    dict: "happiness", word: "manners", stem: "manner", anew: "manner",
    avg: [ 4.56, 6.80 ], std: [ 1.78, 1.25 ], fq: 50 
  },
  "naturally": {
    dict: "happiness", word: "naturally", stem: "natur", anew: "nature",
    avg: [ 4.37, 6.80 ], std: [ 2.51, 1.60 ], fq: 50 
  },
  "pies": {
    dict: "happiness", word: "pies", stem: "pie", anew: "pie",
    avg: [ 4.20, 6.80 ], std: [ 2.40, 1.37 ], fq: 50 
  },
  "protect": {
    dict: "happiness", word: "protect", stem: "protect", anew: "protected",
    avg: [ 4.09, 6.80 ], std: [ 2.77, 1.41 ], fq: 50 
  },
  "smooth": {
    dict: "happiness", word: "smooth", stem: "smooth", anew: "smooth",
    avg: [ 4.91, 6.80 ], std: [ 2.57, 1.18 ], fq: 50 
  },
  "elevated": {
    dict: "happiness", word: "elevated", stem: "elev", anew: "elevator",
    avg: [ 4.16, 6.80 ], std: [ 1.99, 1.19 ], fq: 50 
  },
  "coke": {
    dict: "happiness", word: "coke", stem: "coke", anew: "snow",
    avg: [ 5.75, 6.78 ], std: [ 2.47, 1.62 ], fq: 50 
  },
  "creation": {
    dict: "happiness", word: "creation", stem: "creation", anew: "world",
    avg: [ 5.32, 6.78 ], std: [ 2.39, 1.40 ], fq: 50 
  },
  "dogs": {
    dict: "happiness", word: "dogs", stem: "dog", anew: "dog",
    avg: [ 5.76, 6.78 ], std: [ 2.50, 1.82 ], fq: 50 
  },
  "esteemed": {
    dict: "happiness", word: "esteemed", stem: "esteem", anew: "respectful",
    avg: [ 4.60, 6.78 ], std: [ 2.67, 1.40 ], fq: 50 
  },
  "green": {
    dict: "happiness", word: "green", stem: "green", anew: "green",
    avg: [ 4.28, 6.78 ], std: [ 2.46, 1.69 ], fq: 50 
  },
  "heartbeat": {
    dict: "happiness", word: "heartbeat", stem: "heartbeat", anew: "wink",
    avg: [ 5.44, 6.78 ], std: [ 2.68, 1.71 ], fq: 50 
  },
  "medal": {
    dict: "happiness", word: "medal", stem: "medal", anew: "decorate",
    avg: [ 5.14, 6.78 ], std: [ 2.39, 1.43 ], fq: 50 
  },
  "museums": {
    dict: "happiness", word: "museums", stem: "museum", anew: "museum",
    avg: [ 3.60, 6.78 ], std: [ 2.13, 1.72 ], fq: 50 
  },
  "painting": {
    dict: "happiness", word: "painting", stem: "paint", anew: "paint",
    avg: [ 4.10, 6.78 ], std: [ 2.36, 1.17 ], fq: 50 
  },
  "pie": {
    dict: "happiness", word: "pie", stem: "pie", anew: "pie",
    avg: [ 4.20, 6.78 ], std: [ 2.40, 1.72 ], fq: 50 
  },
  "reading": {
    dict: "happiness", word: "reading", stem: "read", anew: "learn",
    avg: [ 5.39, 6.78 ], std: [ 2.22, 1.46 ], fq: 50 
  },
  "real": {
    dict: "happiness", word: "real", stem: "real", anew: "rattle",
    avg: [ 4.36, 6.78 ], std: [ 2.18, 1.20 ], fq: 50 
  },
  "ruby": {
    dict: "happiness", word: "ruby", stem: "rubi", anew: "red",
    avg: [ 5.29, 6.78 ], std: [ 2.04, 1.27 ], fq: 50 
  },
  "share": {
    dict: "happiness", word: "share", stem: "share", anew: "part",
    avg: [ 3.82, 6.78 ], std: [ 2.24, 1.40 ], fq: 50 
  },
  "sons": {
    dict: "happiness", word: "sons", stem: "son", anew: "boy",
    avg: [ 4.58, 6.78 ], std: [ 2.37, 1.62 ], fq: 50 
  },
  "traveling": {
    dict: "happiness", word: "traveling", stem: "travel", anew: "travel",
    avg: [ 6.21, 6.78 ], std: [ 2.51, 1.67 ], fq: 50 
  },
  "variety": {
    dict: "happiness", word: "variety", stem: "varieti", anew: "kindness",
    avg: [ 4.30, 6.78 ], std: [ 2.62, 1.31 ], fq: 50 
  },
  "wonders": {
    dict: "happiness", word: "wonders", stem: "wonder", anew: "wonder",
    avg: [ 5.00, 6.78 ], std: [ 2.23, 1.89 ], fq: 50 
  },
  "guaranteed": {
    dict: "happiness", word: "guaranteed", stem: "guarante", anew: "secure",
    avg: [ 3.14, 6.78 ], std: [ 2.47, 1.18 ], fq: 50 
  },
  "visions": {
    dict: "happiness", word: "visions", stem: "vision", anew: "vision",
    avg: [ 4.66, 6.78 ], std: [ 2.43, 1.37 ], fq: 50 
  },
  "easy": {
    dict: "happiness", word: "easy", stem: "easi", anew: "easy",
    avg: [ 4.48, 6.76 ], std: [ 2.82, 1.60 ], fq: 50 
  },
  "effective": {
    dict: "happiness", word: "effective", stem: "effect", anew: "good",
    avg: [ 5.43, 6.76 ], std: [ 2.85, 1.29 ], fq: 50 
  },
  "humans": {
    dict: "happiness", word: "humans", stem: "human", anew: "humane",
    avg: [ 4.50, 6.76 ], std: [ 1.91, 1.45 ], fq: 50 
  },
  "intimate": {
    dict: "happiness", word: "intimate", stem: "intim", anew: "intimate",
    avg: [ 6.98, 6.76 ], std: [ 2.21, 1.30 ], fq: 50 
  },
  "married": {
    dict: "happiness", word: "married", stem: "marri", anew: "wedding",
    avg: [ 5.97, 6.76 ], std: [ 2.85, 1.85 ], fq: 50 
  },
  "muffin": {
    dict: "happiness", word: "muffin", stem: "muffin", anew: "muffin",
    avg: [ 4.76, 6.76 ], std: [ 2.42, 1.24 ], fq: 50 
  },
  "savior": {
    dict: "happiness", word: "savior", stem: "savior", anew: "savior",
    avg: [ 5.80, 6.76 ], std: [ 3.01, 1.62 ], fq: 50 
  },
  "shop": {
    dict: "happiness", word: "shop", stem: "shop", anew: "grass",
    avg: [ 4.14, 6.76 ], std: [ 2.11, 1.04 ], fq: 50 
  },
  "sister": {
    dict: "happiness", word: "sister", stem: "sister", anew: "baby",
    avg: [ 5.53, 6.76 ], std: [ 2.80, 1.65 ], fq: 50 
  },
  "style": {
    dict: "happiness", word: "style", stem: "style", anew: "manner",
    avg: [ 4.56, 6.76 ], std: [ 1.78, 1.62 ], fq: 50 
  },
  "supporter": {
    dict: "happiness", word: "supporter", stem: "support", anew: "champion",
    avg: [ 5.85, 6.76 ], std: [ 3.15, 1.22 ], fq: 50 
  },
  "top": {
    dict: "happiness", word: "top", stem: "top", anew: "crown",
    avg: [ 4.28, 6.76 ], std: [ 2.53, 1.52 ], fq: 50 
  },
  "capable": {
    dict: "happiness", word: "capable", stem: "capabl", anew: "capable",
    avg: [ 5.08, 6.74 ], std: [ 2.07, 1.68 ], fq: 50 
  },
  "complete": {
    dict: "happiness", word: "complete", stem: "complet", anew: "perfection",
    avg: [ 5.95, 6.74 ], std: [ 2.73, 1.24 ], fq: 50 
  },
  "drinks": {
    dict: "happiness", word: "drinks", stem: "drink", anew: "beverage",
    avg: [ 5.21, 6.74 ], std: [ 2.46, 1.43 ], fq: 50 
  },
  "focused": {
    dict: "happiness", word: "focused", stem: "focus", anew: "concentrate",
    avg: [ 4.65, 6.74 ], std: [ 2.13, 1.14 ], fq: 50 
  },
  "justice": {
    dict: "happiness", word: "justice", stem: "justic", anew: "justice",
    avg: [ 5.47, 6.74 ], std: [ 2.54, 1.96 ], fq: 50 
  },
  "lake": {
    dict: "happiness", word: "lake", stem: "lake", anew: "lake",
    avg: [ 3.95, 6.74 ], std: [ 2.44, 1.68 ], fq: 50 
  },
  "mankind": {
    dict: "happiness", word: "mankind", stem: "mankind", anew: "humane",
    avg: [ 4.50, 6.74 ], std: [ 1.91, 1.60 ], fq: 50 
  },
  "merit": {
    dict: "happiness", word: "merit", stem: "merit", anew: "virtue",
    avg: [ 4.52, 6.74 ], std: [ 2.52, 1.21 ], fq: 50 
  },
  "performance": {
    dict: "happiness", word: "performance", stem: "perform", anew: "execution",
    avg: [ 5.71, 6.74 ], std: [ 2.74, 1.34 ], fq: 50 
  },
  "plant": {
    dict: "happiness", word: "plant", stem: "plant", anew: "plant",
    avg: [ 3.62, 6.74 ], std: [ 2.25, 1.35 ], fq: 50 
  },
  "prepared": {
    dict: "happiness", word: "prepared", stem: "prepar", anew: "machine",
    avg: [ 3.82, 6.74 ], std: [ 2.40, 1.07 ], fq: 50 
  },
  "raise": {
    dict: "happiness", word: "raise", stem: "rais", anew: "fire",
    avg: [ 7.17, 6.74 ], std: [ 2.06, 1.21 ], fq: 50 
  },
  "shiny": {
    dict: "happiness", word: "shiny", stem: "shini", anew: "bright",
    avg: [ 5.40, 6.74 ], std: [ 2.33, 1.23 ], fq: 50 
  },
  "sugar": {
    dict: "happiness", word: "sugar", stem: "sugar", anew: "sugar",
    avg: [ 5.64, 6.74 ], std: [ 2.18, 1.94 ], fq: 50 
  },
  "surprising": {
    dict: "happiness", word: "surprising", stem: "surpris", anew: "surprised",
    avg: [ 7.47, 6.74 ], std: [ 2.09, 1.29 ], fq: 50 
  },
  "technology": {
    dict: "happiness", word: "technology", stem: "technolog", anew: "engine",
    avg: [ 3.98, 6.74 ], std: [ 2.33, 1.50 ], fq: 50 
  },
  "treat": {
    dict: "happiness", word: "treat", stem: "treat", anew: "treat",
    avg: [ 5.62, 6.74 ], std: [ 2.25, 1.71 ], fq: 50 
  },
  "wishing": {
    dict: "happiness", word: "wishing", stem: "wish", anew: "wish",
    avg: [ 5.16, 6.74 ], std: [ 2.62, 1.05 ], fq: 50 
  },
  "desires": {
    dict: "happiness", word: "desires", stem: "desir", anew: "desire",
    avg: [ 7.35, 6.73 ], std: [ 1.76, 1.47 ], fq: 50 
  },
  "wished": {
    dict: "happiness", word: "wished", stem: "wish", anew: "wish",
    avg: [ 5.16, 6.73 ], std: [ 2.62, 1.41 ], fq: 50 
  },
  "car": {
    dict: "happiness", word: "car", stem: "car", anew: "car",
    avg: [ 6.24, 6.72 ], std: [ 2.04, 2.10 ], fq: 50 
  },
  "knowing": {
    dict: "happiness", word: "knowing", stem: "know", anew: "loved",
    avg: [ 6.38, 6.72 ], std: [ 2.68, 1.36 ], fq: 50 
  },
  "neat": {
    dict: "happiness", word: "neat", stem: "neat", anew: "cork",
    avg: [ 3.80, 6.72 ], std: [ 2.18, 1.44 ], fq: 50 
  },
  "orchestra": {
    dict: "happiness", word: "orchestra", stem: "orchestra", anew: "orchestra",
    avg: [ 3.52, 6.72 ], std: [ 2.29, 1.37 ], fq: 50 
  },
  "plays": {
    dict: "happiness", word: "plays", stem: "play", anew: "flirt",
    avg: [ 6.91, 6.72 ], std: [ 1.69, 1.58 ], fq: 50 
  },
  "shower": {
    dict: "happiness", word: "shower", stem: "shower", anew: "lavish",
    avg: [ 4.93, 6.72 ], std: [ 2.40, 1.51 ], fq: 50 
  },
  "surprised": {
    dict: "happiness", word: "surprised", stem: "surpris", anew: "surprised",
    avg: [ 7.47, 6.72 ], std: [ 2.09, 1.36 ], fq: 50 
  },
  "tremendous": {
    dict: "happiness", word: "tremendous", stem: "tremend", anew: "terrific",
    avg: [ 6.23, 6.72 ], std: [ 2.73, 1.59 ], fq: 50 
  },
  "values": {
    dict: "happiness", word: "values", stem: "valu", anew: "treasure",
    avg: [ 6.75, 6.72 ], std: [ 2.30, 1.57 ], fq: 50 
  },
  "villages": {
    dict: "happiness", word: "villages", stem: "villag", anew: "village",
    avg: [ 4.08, 6.72 ], std: [ 1.87, 1.37 ], fq: 50 
  },
  "warm": {
    dict: "happiness", word: "warm", stem: "warm", anew: "quick",
    avg: [ 6.57, 6.72 ], std: [ 1.78, 1.80 ], fq: 50 
  },
  "secured": {
    dict: "happiness", word: "secured", stem: "secur", anew: "secure",
    avg: [ 3.14, 6.71 ], std: [ 2.47, 1.15 ], fq: 50 
  },
  "believe": {
    dict: "happiness", word: "believe", stem: "believ", anew: "trust",
    avg: [ 5.30, 6.70 ], std: [ 2.66, 1.59 ], fq: 50 
  },
  "bucks": {
    dict: "happiness", word: "bucks", stem: "buck", anew: "horse",
    avg: [ 3.89, 6.70 ], std: [ 2.17, 1.68 ], fq: 50 
  },
  "dancers": {
    dict: "happiness", word: "dancers", stem: "dancer", anew: "dancer",
    avg: [ 6.00, 6.70 ], std: [ 2.20, 1.61 ], fq: 50 
  },
  "dog": {
    dict: "happiness", word: "dog", stem: "dog", anew: "dog",
    avg: [ 5.76, 6.70 ], std: [ 2.50, 1.84 ], fq: 50 
  },
  "hired": {
    dict: "happiness", word: "hired", stem: "hire", anew: "engaged",
    avg: [ 6.77, 6.70 ], std: [ 2.07, 1.49 ], fq: 50 
  },
  "learn": {
    dict: "happiness", word: "learn", stem: "learn", anew: "learn",
    avg: [ 5.39, 6.70 ], std: [ 2.22, 1.42 ], fq: 50 
  },
  "marriage": {
    dict: "happiness", word: "marriage", stem: "marriag", anew: "wedding",
    avg: [ 5.97, 6.70 ], std: [ 2.85, 2.27 ], fq: 50 
  },
  "partner": {
    dict: "happiness", word: "partner", stem: "partner", anew: "spouse",
    avg: [ 5.21, 6.70 ], std: [ 2.75, 1.25 ], fq: 50 
  },
  "productive": {
    dict: "happiness", word: "productive", stem: "product", anew: "riches",
    avg: [ 6.17, 6.70 ], std: [ 2.70, 1.13 ], fq: 50 
  },
  "teaches": {
    dict: "happiness", word: "teaches", stem: "teach", anew: "learn",
    avg: [ 5.39, 6.70 ], std: [ 2.22, 1.09 ], fq: 50 
  },
  "treats": {
    dict: "happiness", word: "treats", stem: "treat", anew: "treat",
    avg: [ 5.62, 6.70 ], std: [ 2.25, 1.57 ], fq: 50 
  },
  "water": {
    dict: "happiness", word: "water", stem: "water", anew: "water",
    avg: [ 4.97, 6.70 ], std: [ 2.49, 1.22 ], fq: 50 
  },
  "virtues": {
    dict: "happiness", word: "virtues", stem: "virtu", anew: "virtue",
    avg: [ 4.52, 6.69 ], std: [ 2.52, 1.43 ], fq: 50 
  },
  "brains": {
    dict: "happiness", word: "brains", stem: "brain", anew: "mind",
    avg: [ 5.00, 6.69 ], std: [ 2.68, 1.48 ], fq: 50 
  },
  "sensation": {
    dict: "happiness", word: "sensation", stem: "sensat", anew: "star",
    avg: [ 5.83, 6.68 ], std: [ 2.44, 1.40 ], fq: 50 
  },
  "ability": {
    dict: "happiness", word: "ability", stem: "abil", anew: "powerful",
    avg: [ 5.83, 6.68 ], std: [ 2.69, 1.00 ], fq: 50 
  },
  "ace": {
    dict: "happiness", word: "ace", stem: "ace", anew: "ace",
    avg: [ 5.50, 6.68 ], std: [ 2.66, 1.68 ], fq: 50 
  },
  "animals": {
    dict: "happiness", word: "animals", stem: "anim", anew: "beast",
    avg: [ 5.57, 6.68 ], std: [ 2.61, 2.02 ], fq: 50 
  },
  "bake": {
    dict: "happiness", word: "bake", stem: "bake", anew: "bake",
    avg: [ 5.10, 6.68 ], std: [ 2.30, 1.41 ], fq: 50 
  },
  "desire": {
    dict: "happiness", word: "desire", stem: "desir", anew: "desire",
    avg: [ 7.35, 6.68 ], std: [ 1.76, 1.36 ], fq: 50 
  },
  "famous": {
    dict: "happiness", word: "famous", stem: "famou", anew: "fame",
    avg: [ 6.55, 6.68 ], std: [ 2.46, 2.00 ], fq: 50 
  },
  "fountain": {
    dict: "happiness", word: "fountain", stem: "fountain", anew: "spring",
    avg: [ 5.67, 6.68 ], std: [ 2.51, 1.28 ], fq: 50 
  },
  "greater": {
    dict: "happiness", word: "greater", stem: "greater", anew: "outstanding",
    avg: [ 6.24, 6.68 ], std: [ 2.59, 1.32 ], fq: 50 
  },
  "grow": {
    dict: "happiness", word: "grow", stem: "grow", anew: "farm",
    avg: [ 3.90, 6.68 ], std: [ 1.95, 1.22 ], fq: 50 
  },
  "liberties": {
    dict: "happiness", word: "liberties", stem: "liberti", anew: "liberty",
    avg: [ 5.60, 6.68 ], std: [ 2.65, 1.71 ], fq: 50 
  },
  "living": {
    dict: "happiness", word: "living", stem: "live", anew: "lively",
    avg: [ 5.53, 6.68 ], std: [ 2.90, 1.22 ], fq: 50 
  },
  "museum": {
    dict: "happiness", word: "museum", stem: "museum", anew: "museum",
    avg: [ 3.60, 6.68 ], std: [ 2.13, 1.46 ], fq: 50 
  },
  "novel": {
    dict: "happiness", word: "novel", stem: "novel", anew: "refreshment",
    avg: [ 4.45, 6.68 ], std: [ 2.70, 1.46 ], fq: 50 
  },
  "palace": {
    dict: "happiness", word: "palace", stem: "palac", anew: "palace",
    avg: [ 5.10, 6.68 ], std: [ 2.75, 1.65 ], fq: 50 
  },
  "power": {
    dict: "happiness", word: "power", stem: "power", anew: "powerful",
    avg: [ 5.83, 6.68 ], std: [ 2.69, 1.49 ], fq: 50 
  },
  "privilege": {
    dict: "happiness", word: "privilege", stem: "privileg", anew: "favor",
    avg: [ 4.54, 6.68 ], std: [ 1.86, 1.65 ], fq: 50 
  },
  "river": {
    dict: "happiness", word: "river", stem: "river", anew: "river",
    avg: [ 4.51, 6.68 ], std: [ 2.42, 1.33 ], fq: 50 
  },
  "shares": {
    dict: "happiness", word: "shares", stem: "share", anew: "part",
    avg: [ 3.82, 6.68 ], std: [ 2.24, 1.22 ], fq: 50 
  },
  "theatre": {
    dict: "happiness", word: "theatre", stem: "theatr", anew: "house",
    avg: [ 4.56, 6.68 ], std: [ 2.41, 1.53 ], fq: 50 
  },
  "well": {
    dict: "happiness", word: "well", stem: "well", anew: "good",
    avg: [ 5.43, 6.68 ], std: [ 2.85, 1.25 ], fq: 50 
  },
  "acceptable": {
    dict: "happiness", word: "acceptable", stem: "accept", anew: "acceptance",
    avg: [ 5.40, 6.67 ], std: [ 2.70, 1.21 ], fq: 50 
  },
  "possibilities": {
    dict: "happiness", word: "possibilities", stem: "possibl", anew: "theory",
    avg: [ 4.62, 6.67 ], std: [ 1.94, 1.48 ], fq: 50 
  },
  "charms": {
    dict: "happiness", word: "charms", stem: "charm", anew: "charm",
    avg: [ 5.16, 6.66 ], std: [ 2.25, 1.38 ], fq: 50 
  },
  "greet": {
    dict: "happiness", word: "greet", stem: "greet", anew: "greet",
    avg: [ 5.27, 6.66 ], std: [ 2.31, 1.56 ], fq: 50 
  },
  "personality": {
    dict: "happiness", word: "personality", stem: "person", anew: "person",
    avg: [ 4.19, 6.66 ], std: [ 2.45, 1.52 ], fq: 50 
  },
  "powers": {
    dict: "happiness", word: "powers", stem: "power", anew: "powerful",
    avg: [ 5.83, 6.66 ], std: [ 2.69, 1.32 ], fq: 50 
  },
  "raises": {
    dict: "happiness", word: "raises", stem: "rais", anew: "fire",
    avg: [ 7.17, 6.66 ], std: [ 2.06, 1.62 ], fq: 50 
  },
  "bird": {
    dict: "happiness", word: "bird", stem: "bird", anew: "bird",
    avg: [ 3.17, 6.64 ], std: [ 2.23, 1.55 ], fq: 50 
  },
  "care": {
    dict: "happiness", word: "care", stem: "care", anew: "wish",
    avg: [ 5.16, 6.64 ], std: [ 2.62, 1.65 ], fq: 50 
  },
  "cat": {
    dict: "happiness", word: "cat", stem: "cat", anew: "cat",
    avg: [ 4.38, 6.64 ], std: [ 2.24, 1.98 ], fq: 50 
  },
  "cook": {
    dict: "happiness", word: "cook", stem: "cook", anew: "cook",
    avg: [ 4.44, 6.64 ], std: [ 1.96, 1.50 ], fq: 50 
  },
  "expert": {
    dict: "happiness", word: "expert", stem: "expert", anew: "good",
    avg: [ 5.43, 6.64 ], std: [ 2.85, 1.32 ], fq: 50 
  },
  "high": {
    dict: "happiness", word: "high", stem: "high", anew: "luxury",
    avg: [ 4.75, 6.64 ], std: [ 2.91, 1.21 ], fq: 50 
  },
  "leading": {
    dict: "happiness", word: "leading", stem: "lead", anew: "star",
    avg: [ 5.83, 6.64 ], std: [ 2.44, 1.51 ], fq: 50 
  },
  "picture": {
    dict: "happiness", word: "picture", stem: "pictur", anew: "movie",
    avg: [ 4.93, 6.64 ], std: [ 2.54, 1.31 ], fq: 50 
  },
  "promising": {
    dict: "happiness", word: "promising", stem: "promis", anew: "bright",
    avg: [ 5.40, 6.64 ], std: [ 2.33, 1.12 ], fq: 50 
  },
  "recovered": {
    dict: "happiness", word: "recovered", stem: "recov", anew: "heal",
    avg: [ 4.77, 6.64 ], std: [ 2.23, 1.32 ], fq: 50 
  },
  "salad": {
    dict: "happiness", word: "salad", stem: "salad", anew: "salad",
    avg: [ 3.81, 6.64 ], std: [ 2.29, 1.71 ], fq: 50 
  },
  "shops": {
    dict: "happiness", word: "shops", stem: "shop", anew: "grass",
    avg: [ 4.14, 6.64 ], std: [ 2.11, 1.24 ], fq: 50 
  },
  "solutions": {
    dict: "happiness", word: "solutions", stem: "solut", anew: "answer",
    avg: [ 5.41, 6.64 ], std: [ 2.43, 1.38 ], fq: 50 
  },
  "sparks": {
    dict: "happiness", word: "sparks", stem: "spark", anew: "activate",
    avg: [ 4.86, 6.64 ], std: [ 2.56, 1.31 ], fq: 50 
  },
  "sport": {
    dict: "happiness", word: "sport", stem: "sport", anew: "mutation",
    avg: [ 4.84, 6.64 ], std: [ 2.52, 1.69 ], fq: 50 
  },
  "theaters": {
    dict: "happiness", word: "theaters", stem: "theater", anew: "house",
    avg: [ 4.56, 6.64 ], std: [ 2.41, 1.66 ], fq: 50 
  },
  "tunes": {
    dict: "happiness", word: "tunes", stem: "tune", anew: "tune",
    avg: [ 4.71, 6.64 ], std: [ 2.09, 1.38 ], fq: 50 
  },
  "unite": {
    dict: "happiness", word: "unite", stem: "unit", anew: "unit",
    avg: [ 3.75, 6.64 ], std: [ 2.49, 1.19 ], fq: 50 
  },
  "simplicity": {
    dict: "happiness", word: "simplicity", stem: "simplic", anew: "easy",
    avg: [ 4.48, 6.62 ], std: [ 2.82, 1.52 ], fq: 50 
  },
  "attained": {
    dict: "happiness", word: "attained", stem: "attain", anew: "hit",
    avg: [ 5.73, 6.62 ], std: [ 2.09, 1.40 ], fq: 50 
  },
  "chatting": {
    dict: "happiness", word: "chatting", stem: "chat", anew: "gossip",
    avg: [ 5.74, 6.62 ], std: [ 2.38, 1.24 ], fq: 50 
  },
  "crown": {
    dict: "happiness", word: "crown", stem: "crown", anew: "crown",
    avg: [ 4.28, 6.62 ], std: [ 2.53, 1.47 ], fq: 50 
  },
  "dresses": {
    dict: "happiness", word: "dresses", stem: "dress", anew: "dress",
    avg: [ 4.05, 6.62 ], std: [ 1.89, 1.71 ], fq: 50 
  },
  "homes": {
    dict: "happiness", word: "homes", stem: "home", anew: "home",
    avg: [ 4.21, 6.62 ], std: [ 2.94, 1.24 ], fq: 50 
  },
  "immortal": {
    dict: "happiness", word: "immortal", stem: "immort", anew: "god",
    avg: [ 5.95, 6.62 ], std: [ 2.84, 1.65 ], fq: 50 
  },
  "invest": {
    dict: "happiness", word: "invest", stem: "invest", anew: "invest",
    avg: [ 5.12, 6.62 ], std: [ 2.42, 1.03 ], fq: 50 
  },
  "kitty": {
    dict: "happiness", word: "kitty", stem: "kitti", anew: "kitten",
    avg: [ 5.08, 6.62 ], std: [ 2.45, 1.86 ], fq: 50 
  },
  "offer": {
    dict: "happiness", word: "offer", stem: "offer", anew: "tender",
    avg: [ 4.88, 6.62 ], std: [ 2.30, 1.03 ], fq: 50 
  },
  "organized": {
    dict: "happiness", word: "organized", stem: "organ", anew: "machine",
    avg: [ 3.82, 6.62 ], std: [ 2.40, 1.24 ], fq: 50 
  },
  "performances": {
    dict: "happiness", word: "performances", stem: "perform", anew: "execution",
    avg: [ 5.71, 6.62 ], std: [ 2.74, 1.37 ], fq: 50 
  },
  "perfume": {
    dict: "happiness", word: "perfume", stem: "perfum", anew: "perfume",
    avg: [ 5.05, 6.62 ], std: [ 2.36, 1.61 ], fq: 50 
  },
  "rescue": {
    dict: "happiness", word: "rescue", stem: "rescu", anew: "rescue",
    avg: [ 6.53, 6.62 ], std: [ 2.56, 1.66 ], fq: 50 
  },
  "restaurants": {
    dict: "happiness", word: "restaurants", stem: "restaur", anew: "restaurant",
    avg: [ 5.41, 6.62 ], std: [ 2.55, 1.78 ], fq: 50 
  },
  "sisters": {
    dict: "happiness", word: "sisters", stem: "sister", anew: "baby",
    avg: [ 5.53, 6.62 ], std: [ 2.80, 1.69 ], fq: 50 
  },
  "slept": {
    dict: "happiness", word: "slept", stem: "slept", anew: "sleep",
    avg: [ 2.80, 6.62 ], std: [ 2.66, 1.56 ], fq: 50 
  },
  "stories": {
    dict: "happiness", word: "stories", stem: "stori", anew: "history",
    avg: [ 3.93, 6.62 ], std: [ 2.29, 1.59 ], fq: 50 
  },
  "varieties": {
    dict: "happiness", word: "varieties", stem: "varieti", anew: "kindness",
    avg: [ 4.30, 6.62 ], std: [ 2.62, 1.31 ], fq: 50 
  },
  "vision": {
    dict: "happiness", word: "vision", stem: "vision", anew: "vision",
    avg: [ 4.66, 6.62 ], std: [ 2.43, 1.21 ], fq: 50 
  },
  "wife": {
    dict: "happiness", word: "wife", stem: "wife", anew: "wife",
    avg: [ 4.93, 6.62 ], std: [ 2.22, 1.81 ], fq: 50 
  },
  "youth": {
    dict: "happiness", word: "youth", stem: "youth", anew: "youth",
    avg: [ 5.67, 6.62 ], std: [ 2.52, 1.88 ], fq: 50 
  },
  "stimulation": {
    dict: "happiness", word: "stimulation", stem: "stimul", anew: "aroused",
    avg: [ 6.63, 6.61 ], std: [ 2.70, 1.35 ], fq: 50 
  },
  "touching": {
    dict: "happiness", word: "touching", stem: "touch", anew: "affection",
    avg: [ 6.21, 6.61 ], std: [ 2.75, 1.68 ], fq: 50 
  },
  "suitable": {
    dict: "happiness", word: "suitable", stem: "suitabl", anew: "desire",
    avg: [ 7.35, 6.60 ], std: [ 1.76, 0.89 ], fq: 50 
  },
  "art": {
    dict: "happiness", word: "art", stem: "art", anew: "art",
    avg: [ 4.86, 6.60 ], std: [ 2.88, 1.50 ], fq: 50 
  },
  "beam": {
    dict: "happiness", word: "beam", stem: "beam", anew: "radiator",
    avg: [ 4.02, 6.60 ], std: [ 1.94, 1.37 ], fq: 50 
  },
  "captain": {
    dict: "happiness", word: "captain", stem: "captain", anew: "masterful",
    avg: [ 5.20, 6.60 ], std: [ 2.85, 1.63 ], fq: 50 
  },
  "clothing": {
    dict: "happiness", word: "clothing", stem: "cloth", anew: "clothing",
    avg: [ 4.78, 6.60 ], std: [ 2.88, 1.31 ], fq: 50 
  },
  "desired": {
    dict: "happiness", word: "desired", stem: "desir", anew: "desire",
    avg: [ 7.35, 6.60 ], std: [ 1.76, 1.56 ], fq: 50 
  },
  "dress": {
    dict: "happiness", word: "dress", stem: "dress", anew: "dress",
    avg: [ 4.05, 6.60 ], std: [ 1.89, 1.18 ], fq: 50 
  },
  "ideals": {
    dict: "happiness", word: "ideals", stem: "ideal", anew: "saint",
    avg: [ 4.49, 6.60 ], std: [ 1.90, 1.62 ], fq: 50 
  },
  "protected": {
    dict: "happiness", word: "protected", stem: "protect", anew: "protected",
    avg: [ 4.09, 6.60 ], std: [ 2.77, 1.18 ], fq: 50 
  },
  "spirit": {
    dict: "happiness", word: "spirit", stem: "spirit", anew: "spirit",
    avg: [ 5.56, 6.60 ], std: [ 2.62, 1.50 ], fq: 50 
  },
  "supported": {
    dict: "happiness", word: "supported", stem: "support", anew: "stomach",
    avg: [ 3.93, 6.60 ], std: [ 2.49, 1.54 ], fq: 50 
  },
  "therapeutic": {
    dict: "happiness", word: "therapeutic", stem: "therapeut", anew: "heal",
    avg: [ 4.77, 6.60 ], std: [ 2.23, 1.56 ], fq: 50 
  },
  "visiting": {
    dict: "happiness", word: "visiting", stem: "visit", anew: "gossip",
    avg: [ 5.74, 6.60 ], std: [ 2.38, 1.21 ], fq: 50 
  },
  "expressions": {
    dict: "happiness", word: "expressions", stem: "express", anew: "face",
    avg: [ 5.04, 6.60 ], std: [ 2.18, 1.30 ], fq: 50 
  },
  "sleeps": {
    dict: "happiness", word: "sleeps", stem: "sleep", anew: "sleep",
    avg: [ 2.80, 6.59 ], std: [ 2.66, 1.47 ], fq: 50 
  },
  "vocals": {
    dict: "happiness", word: "vocals", stem: "vocal", anew: "song",
    avg: [ 6.07, 6.59 ], std: [ 2.42, 1.46 ], fq: 50 
  },
  "impress": {
    dict: "happiness", word: "impress", stem: "impress", anew: "impressed",
    avg: [ 5.42, 6.58 ], std: [ 2.65, 1.47 ], fq: 50 
  },
  "advance": {
    dict: "happiness", word: "advance", stem: "advanc", anew: "win",
    avg: [ 7.72, 6.58 ], std: [ 2.16, 1.33 ], fq: 50 
  },
  "advanced": {
    dict: "happiness", word: "advanced", stem: "advanc", anew: "win",
    avg: [ 7.72, 6.58 ], std: [ 2.16, 1.07 ], fq: 50 
  },
  "arts": {
    dict: "happiness", word: "arts", stem: "art", anew: "art",
    avg: [ 4.86, 6.58 ], std: [ 2.88, 1.94 ], fq: 50 
  },
  "baking": {
    dict: "happiness", word: "baking", stem: "bake", anew: "bake",
    avg: [ 5.10, 6.58 ], std: [ 2.30, 1.57 ], fq: 50 
  },
  "colour": {
    dict: "happiness", word: "colour", stem: "colour", anew: "color",
    avg: [ 4.73, 6.58 ], std: [ 2.64, 1.53 ], fq: 50 
  },
  "drawing": {
    dict: "happiness", word: "drawing", stem: "draw", anew: "lottery",
    avg: [ 5.36, 6.58 ], std: [ 2.45, 1.11 ], fq: 50 
  },
  "fish": {
    dict: "happiness", word: "fish", stem: "fish", anew: "fish",
    avg: [ 4.00, 6.58 ], std: [ 2.19, 1.75 ], fq: 50 
  },
  "invented": {
    dict: "happiness", word: "invented", stem: "invent", anew: "fabric",
    avg: [ 4.14, 6.58 ], std: [ 1.98, 1.03 ], fq: 50 
  },
  "preferred": {
    dict: "happiness", word: "preferred", stem: "prefer", anew: "pet",
    avg: [ 5.10, 6.58 ], std: [ 2.59, 0.95 ], fq: 50 
  },
  "radio": {
    dict: "happiness", word: "radio", stem: "radio", anew: "radio",
    avg: [ 4.78, 6.58 ], std: [ 2.82, 1.60 ], fq: 50 
  },
  "ready": {
    dict: "happiness", word: "ready", stem: "readi", anew: "quick",
    avg: [ 6.57, 6.58 ], std: [ 1.78, 1.16 ], fq: 50 
  },
  "springs": {
    dict: "happiness", word: "springs", stem: "spring", anew: "spring",
    avg: [ 5.67, 6.58 ], std: [ 2.51, 1.25 ], fq: 50 
  },
  "student": {
    dict: "happiness", word: "student", stem: "student", anew: "scholar",
    avg: [ 5.12, 6.58 ], std: [ 2.46, 1.25 ], fq: 50 
  },
  "traditions": {
    dict: "happiness", word: "traditions", stem: "tradit", anew: "custom",
    avg: [ 4.66, 6.58 ], std: [ 2.12, 1.64 ], fq: 50 
  },
  "upgrade": {
    dict: "happiness", word: "upgrade", stem: "upgrad", anew: "promotion",
    avg: [ 6.44, 6.58 ], std: [ 2.58, 1.18 ], fq: 50 
  },
  "saviour": {
    dict: "happiness", word: "saviour", stem: "saviour", anew: "savior",
    avg: [ 5.80, 6.57 ], std: [ 3.01, 1.53 ], fq: 50 
  },
  "muscles": {
    dict: "happiness", word: "muscles", stem: "muscl", anew: "muscular",
    avg: [ 5.47, 6.56 ], std: [ 2.20, 1.41 ], fq: 50 
  },
  "able": {
    dict: "happiness", word: "able", stem: "abl", anew: "capable",
    avg: [ 5.08, 6.56 ], std: [ 2.07, 1.25 ], fq: 50 
  },
  "butter": {
    dict: "happiness", word: "butter", stem: "butter", anew: "butter",
    avg: [ 3.17, 6.56 ], std: [ 1.84, 1.51 ], fq: 50 
  },
  "diploma": {
    dict: "happiness", word: "diploma", stem: "diploma", anew: "diploma",
    avg: [ 5.67, 6.56 ], std: [ 2.80, 1.74 ], fq: 50 
  },
  "film": {
    dict: "happiness", word: "film", stem: "film", anew: "movie",
    avg: [ 4.93, 6.56 ], std: [ 2.54, 1.58 ], fq: 50 
  },
  "morning": {
    dict: "happiness", word: "morning", stem: "morn", anew: "sunrise",
    avg: [ 5.06, 6.56 ], std: [ 3.05, 1.95 ], fq: 50 
  },
  "natural": {
    dict: "happiness", word: "natural", stem: "natur", anew: "nature",
    avg: [ 4.37, 6.56 ], std: [ 2.51, 1.49 ], fq: 50 
  },
  "preservation": {
    dict: "happiness", word: "preservation", stem: "preserv", anew: "save",
    avg: [ 4.95, 6.56 ], std: [ 2.19, 1.25 ], fq: 50 
  },
  "progressive": {
    dict: "happiness", word: "progressive", stem: "progress", anew: "progress",
    avg: [ 6.02, 6.56 ], std: [ 2.58, 1.33 ], fq: 50 
  },
  "protection": {
    dict: "happiness", word: "protection", stem: "protect", anew: "protected",
    avg: [ 4.09, 6.56 ], std: [ 2.77, 1.33 ], fq: 50 
  },
  "raised": {
    dict: "happiness", word: "raised", stem: "rais", anew: "fire",
    avg: [ 7.17, 6.56 ], std: [ 2.06, 1.23 ], fq: 50 
  },
  "showers": {
    dict: "happiness", word: "showers", stem: "shower", anew: "lavish",
    avg: [ 4.93, 6.56 ], std: [ 2.40, 1.05 ], fq: 50 
  },
  "teach": {
    dict: "happiness", word: "teach", stem: "teach", anew: "learn",
    avg: [ 5.39, 6.56 ], std: [ 2.22, 1.55 ], fq: 50 
  },
  "traveler": {
    dict: "happiness", word: "traveler", stem: "travel", anew: "travel",
    avg: [ 6.21, 6.56 ], std: [ 2.51, 1.45 ], fq: 50 
  },
  "worldwide": {
    dict: "happiness", word: "worldwide", stem: "worldwid", anew: "world",
    avg: [ 5.32, 6.56 ], std: [ 2.39, 1.26 ], fq: 50 
  },
  "privileges": {
    dict: "happiness", word: "privileges", stem: "privileg", anew: "favor",
    avg: [ 4.54, 6.55 ], std: [ 1.86, 1.72 ], fq: 50 
  },
  "accepted": {
    dict: "happiness", word: "accepted", stem: "accept", anew: "acceptance",
    avg: [ 5.40, 6.54 ], std: [ 2.70, 1.46 ], fq: 50 
  },
  "adoption": {
    dict: "happiness", word: "adoption", stem: "adopt", anew: "acceptance",
    avg: [ 5.40, 6.54 ], std: [ 2.70, 1.46 ], fq: 50 
  },
  "cats": {
    dict: "happiness", word: "cats", stem: "cat", anew: "cat",
    avg: [ 4.38, 6.54 ], std: [ 2.24, 2.02 ], fq: 50 
  },
  "coin": {
    dict: "happiness", word: "coin", stem: "coin", anew: "coin",
    avg: [ 4.29, 6.54 ], std: [ 2.48, 1.18 ], fq: 50 
  },
  "cooked": {
    dict: "happiness", word: "cooked", stem: "cook", anew: "cook",
    avg: [ 4.44, 6.54 ], std: [ 1.96, 1.09 ], fq: 50 
  },
  "dawn": {
    dict: "happiness", word: "dawn", stem: "dawn", anew: "dawn",
    avg: [ 4.39, 6.54 ], std: [ 2.81, 1.39 ], fq: 50 
  },
  "done": {
    dict: "happiness", word: "done", stem: "done", anew: "execution",
    avg: [ 5.71, 6.54 ], std: [ 2.74, 1.43 ], fq: 50 
  },
  "eager": {
    dict: "happiness", word: "eager", stem: "eager", anew: "bored",
    avg: [ 2.83, 6.54 ], std: [ 2.31, 1.31 ], fq: 50 
  },
  "exercises": {
    dict: "happiness", word: "exercises", stem: "exercis", anew: "exercise",
    avg: [ 6.84, 6.54 ], std: [ 2.06, 1.30 ], fq: 50 
  },
  "found": {
    dict: "happiness", word: "found", stem: "found", anew: "wit",
    avg: [ 5.42, 6.54 ], std: [ 2.44, 1.18 ], fq: 50 
  },
  "give": {
    dict: "happiness", word: "give", stem: "give", anew: "spring",
    avg: [ 5.67, 6.54 ], std: [ 2.51, 1.73 ], fq: 50 
  },
  "groovy": {
    dict: "happiness", word: "groovy", stem: "groovi", anew: "cork",
    avg: [ 3.80, 6.54 ], std: [ 2.18, 1.76 ], fq: 50 
  },
  "moral": {
    dict: "happiness", word: "moral", stem: "moral", anew: "moral",
    avg: [ 4.49, 6.54 ], std: [ 2.28, 1.86 ], fq: 50 
  },
  "overcome": {
    dict: "happiness", word: "overcome", stem: "overcom", anew: "overwhelmed",
    avg: [ 7.00, 6.54 ], std: [ 2.37, 1.67 ], fq: 50 
  },
  "pays": {
    dict: "happiness", word: "pays", stem: "pay", anew: "devoted",
    avg: [ 5.23, 6.54 ], std: [ 2.21, 1.74 ], fq: 50 
  },
  "pride": {
    dict: "happiness", word: "pride", stem: "pride", anew: "pride",
    avg: [ 5.83, 6.54 ], std: [ 2.48, 1.74 ], fq: 50 
  },
  "right": {
    dict: "happiness", word: "right", stem: "right", anew: "mighty",
    avg: [ 5.61, 6.54 ], std: [ 2.38, 1.27 ], fq: 50 
  },
  "rising": {
    dict: "happiness", word: "rising", stem: "rise", anew: "revolt",
    avg: [ 6.56, 6.54 ], std: [ 2.34, 1.11 ], fq: 50 
  },
  "save": {
    dict: "happiness", word: "save", stem: "save", anew: "save",
    avg: [ 4.95, 6.54 ], std: [ 2.19, 1.16 ], fq: 50 
  },
  "scholars": {
    dict: "happiness", word: "scholars", stem: "scholar", anew: "scholar",
    avg: [ 5.12, 6.54 ], std: [ 2.46, 1.30 ], fq: 50 
  },
  "shelter": {
    dict: "happiness", word: "shelter", stem: "shelter", anew: "sheltered",
    avg: [ 4.28, 6.54 ], std: [ 1.77, 1.31 ], fq: 50 
  },
  "tasting": {
    dict: "happiness", word: "tasting", stem: "tast", anew: "taste",
    avg: [ 5.22, 6.54 ], std: [ 2.38, 1.15 ], fq: 50 
  },
  "visit": {
    dict: "happiness", word: "visit", stem: "visit", anew: "gossip",
    avg: [ 5.74, 6.54 ], std: [ 2.38, 1.20 ], fq: 50 
  },
  "advantages": {
    dict: "happiness", word: "advantages", stem: "advantag", anew: "advantage",
    avg: [ 4.76, 6.53 ], std: [ 2.18, 1.37 ], fq: 50 
  },
  "sailed": {
    dict: "happiness", word: "sailed", stem: "sail", anew: "voyage",
    avg: [ 5.55, 6.53 ], std: [ 2.23, 1.53 ], fq: 50 
  },
  "feather": {
    dict: "happiness", word: "feather", stem: "feather", anew: "square",
    avg: [ 3.18, 6.52 ], std: [ 1.76, 1.32 ], fq: 50 
  },
  "brain": {
    dict: "happiness", word: "brain", stem: "brain", anew: "mind",
    avg: [ 5.00, 6.52 ], std: [ 2.68, 1.53 ], fq: 50 
  },
  "champ": {
    dict: "happiness", word: "champ", stem: "champ", anew: "champ",
    avg: [ 6.00, 6.52 ], std: [ 2.43, 1.87 ], fq: 50 
  },
  "ease": {
    dict: "happiness", word: "ease", stem: "eas", anew: "easy",
    avg: [ 4.48, 6.52 ], std: [ 2.82, 1.59 ], fq: 50 
  },
  "ethics": {
    dict: "happiness", word: "ethics", stem: "ethic", anew: "moral",
    avg: [ 4.49, 6.52 ], std: [ 2.28, 1.36 ], fq: 50 
  },
  "fries": {
    dict: "happiness", word: "fries", stem: "fri", anew: "child",
    avg: [ 5.55, 6.52 ], std: [ 2.29, 1.37 ], fq: 50 
  },
  "growing": {
    dict: "happiness", word: "growing", stem: "grow", anew: "farm",
    avg: [ 3.90, 6.52 ], std: [ 1.95, 0.99 ], fq: 50 
  },
  "nights": {
    dict: "happiness", word: "nights", stem: "night", anew: "dark",
    avg: [ 4.28, 6.52 ], std: [ 2.21, 1.52 ], fq: 50 
  },
  "prefer": {
    dict: "happiness", word: "prefer", stem: "prefer", anew: "favor",
    avg: [ 4.54, 6.52 ], std: [ 1.86, 1.03 ], fq: 50 
  },
  "read": {
    dict: "happiness", word: "read", stem: "read", anew: "learn",
    avg: [ 5.39, 6.52 ], std: [ 2.22, 1.58 ], fq: 50 
  },
  "sang": {
    dict: "happiness", word: "sang", stem: "sang", anew: "whistle",
    avg: [ 4.69, 6.52 ], std: [ 1.99, 1.31 ], fq: 50 
  },
  "swimming": {
    dict: "happiness", word: "swimming", stem: "swim", anew: "drown",
    avg: [ 6.57, 6.52 ], std: [ 2.33, 1.22 ], fq: 50 
  },
  "world": {
    dict: "happiness", word: "world", stem: "world", anew: "world",
    avg: [ 5.32, 6.52 ], std: [ 2.39, 1.66 ], fq: 50 
  },
  "bounce": {
    dict: "happiness", word: "bounce", stem: "bounc", anew: "spring",
    avg: [ 5.67, 6.51 ], std: [ 2.51, 1.50 ], fq: 50 
  },
  "eden": {
    dict: "happiness", word: "eden", stem: "eden", anew: "heaven",
    avg: [ 5.61, 6.51 ], std: [ 3.20, 1.56 ], fq: 50 
  },
  "agriculture": {
    dict: "happiness", word: "agriculture", stem: "agricultur", anew: "farm",
    avg: [ 3.90, 6.50 ], std: [ 1.95, 1.30 ], fq: 50 
  },
  "allies": {
    dict: "happiness", word: "allies", stem: "alli", anew: "friendly",
    avg: [ 5.11, 6.50 ], std: [ 2.96, 1.25 ], fq: 50 
  },
  "couples": {
    dict: "happiness", word: "couples", stem: "coupl", anew: "couple",
    avg: [ 6.39, 6.50 ], std: [ 2.31, 1.20 ], fq: 50 
  },
  "deals": {
    dict: "happiness", word: "deals", stem: "deal", anew: "mountain",
    avg: [ 5.49, 6.50 ], std: [ 2.43, 1.58 ], fq: 50 
  },
  "determined": {
    dict: "happiness", word: "determined", stem: "determin", anew: "mold",
    avg: [ 4.07, 6.50 ], std: [ 1.98, 1.53 ], fq: 50 
  },
  "eaten": {
    dict: "happiness", word: "eaten", stem: "eaten", anew: "eat",
    avg: [ 5.69, 6.50 ], std: [ 2.51, 1.22 ], fq: 50 
  },
  "fame": {
    dict: "happiness", word: "fame", stem: "fame", anew: "fame",
    avg: [ 6.55, 6.50 ], std: [ 2.46, 1.74 ], fq: 50 
  },
  "gives": {
    dict: "happiness", word: "gives", stem: "give", anew: "spring",
    avg: [ 5.67, 6.50 ], std: [ 2.51, 1.28 ], fq: 50 
  },
  "hire": {
    dict: "happiness", word: "hire", stem: "hire", anew: "engaged",
    avg: [ 6.77, 6.50 ], std: [ 2.07, 1.34 ], fq: 50 
  },
  "innocence": {
    dict: "happiness", word: "innocence", stem: "innoc", anew: "innocent",
    avg: [ 4.21, 6.50 ], std: [ 1.99, 1.73 ], fq: 50 
  },
  "leadership": {
    dict: "happiness", word: "leadership", stem: "leadership", anew: "leader",
    avg: [ 6.27, 6.50 ], std: [ 2.18, 1.59 ], fq: 50 
  },
  "legend": {
    dict: "happiness", word: "legend", stem: "legend", anew: "legend",
    avg: [ 4.88, 6.50 ], std: [ 1.76, 1.43 ], fq: 50 
  },
  "newest": {
    dict: "happiness", word: "newest", stem: "newest", anew: "young",
    avg: [ 5.64, 6.50 ], std: [ 2.51, 1.56 ], fq: 50 
  },
  "performing": {
    dict: "happiness", word: "performing", stem: "perform", anew: "execution",
    avg: [ 5.71, 6.50 ], std: [ 2.74, 1.31 ], fq: 50 
  },
  "roast": {
    dict: "happiness", word: "roast", stem: "roast", anew: "ridicule",
    avg: [ 5.83, 6.50 ], std: [ 2.73, 1.45 ], fq: 50 
  },
  "starting": {
    dict: "happiness", word: "starting", stem: "start", anew: "part",
    avg: [ 3.82, 6.50 ], std: [ 2.24, 1.05 ], fq: 50 
  },
  "grows": {
    dict: "happiness", word: "grows", stem: "grow", anew: "farm",
    avg: [ 3.90, 6.49 ], std: [ 1.95, 1.36 ], fq: 50 
  },
  "rays": {
    dict: "happiness", word: "rays", stem: "ray", anew: "radiator",
    avg: [ 4.02, 6.49 ], std: [ 1.94, 1.42 ], fq: 50 
  },
  "answers": {
    dict: "happiness", word: "answers", stem: "answer", anew: "answer",
    avg: [ 5.41, 6.48 ], std: [ 2.43, 1.15 ], fq: 50 
  },
  "boost": {
    dict: "happiness", word: "boost", stem: "boost", anew: "promotion",
    avg: [ 6.44, 6.48 ], std: [ 2.58, 1.23 ], fq: 50 
  },
  "humble": {
    dict: "happiness", word: "humble", stem: "humbl", anew: "humble",
    avg: [ 3.74, 6.48 ], std: [ 2.33, 1.30 ], fq: 50 
  },
  "mate": {
    dict: "happiness", word: "mate", stem: "mate", anew: "couple",
    avg: [ 6.39, 6.48 ], std: [ 2.31, 1.78 ], fq: 50 
  },
  "offers": {
    dict: "happiness", word: "offers", stem: "offer", anew: "tender",
    avg: [ 4.88, 6.48 ], std: [ 2.30, 1.55 ], fq: 50 
  },
  "perform": {
    dict: "happiness", word: "perform", stem: "perform", anew: "execution",
    avg: [ 5.71, 6.48 ], std: [ 2.74, 1.23 ], fq: 50 
  },
  "restored": {
    dict: "happiness", word: "restored", stem: "restor", anew: "doctor",
    avg: [ 5.86, 6.48 ], std: [ 2.70, 1.22 ], fq: 50 
  },
  "scholar": {
    dict: "happiness", word: "scholar", stem: "scholar", anew: "scholar",
    avg: [ 5.12, 6.48 ], std: [ 2.46, 1.13 ], fq: 50 
  },
  "sings": {
    dict: "happiness", word: "sings", stem: "sing", anew: "whistle",
    avg: [ 4.69, 6.48 ], std: [ 1.99, 1.79 ], fq: 50 
  },
  "soft": {
    dict: "happiness", word: "soft", stem: "soft", anew: "soft",
    avg: [ 4.63, 6.48 ], std: [ 2.61, 1.22 ], fq: 50 
  },
  "story": {
    dict: "happiness", word: "story", stem: "stori", anew: "history",
    avg: [ 3.93, 6.48 ], std: [ 2.29, 1.34 ], fq: 50 
  },
  "supporting": {
    dict: "happiness", word: "supporting", stem: "support", anew: "stomach",
    avg: [ 3.93, 6.48 ], std: [ 2.49, 0.97 ], fq: 50 
  },
  "drums": {
    dict: "happiness", word: "drums", stem: "drum", anew: "barrel",
    avg: [ 3.36, 6.47 ], std: [ 2.28, 1.58 ], fq: 50 
  },
  "virtue": {
    dict: "happiness", word: "virtue", stem: "virtu", anew: "virtue",
    avg: [ 4.52, 6.47 ], std: [ 2.52, 1.77 ], fq: 50 
  },
  "activities": {
    dict: "happiness", word: "activities", stem: "activ", anew: "activate",
    avg: [ 4.86, 6.46 ], std: [ 2.56, 1.22 ], fq: 50 
  },
  "athletic": {
    dict: "happiness", word: "athletic", stem: "athlet", anew: "athletics",
    avg: [ 6.10, 6.46 ], std: [ 2.29, 1.51 ], fq: 50 
  },
  "clothes": {
    dict: "happiness", word: "clothes", stem: "cloth", anew: "clothing",
    avg: [ 4.78, 6.46 ], std: [ 2.88, 1.23 ], fq: 50 
  },
  "cultivated": {
    dict: "happiness", word: "cultivated", stem: "cultiv", anew: "nature",
    avg: [ 4.37, 6.46 ], std: [ 2.51, 1.36 ], fq: 50 
  },
  "goods": {
    dict: "happiness", word: "goods", stem: "good", anew: "good",
    avg: [ 5.43, 6.46 ], std: [ 2.85, 1.15 ], fq: 50 
  },
  "grass": {
    dict: "happiness", word: "grass", stem: "grass", anew: "grass",
    avg: [ 4.14, 6.46 ], std: [ 2.11, 1.39 ], fq: 50 
  },
  "memory": {
    dict: "happiness", word: "memory", stem: "memori", anew: "memory",
    avg: [ 5.42, 6.46 ], std: [ 2.25, 1.28 ], fq: 50 
  },
  "mint": {
    dict: "happiness", word: "mint", stem: "mint", anew: "mountain",
    avg: [ 5.49, 6.46 ], std: [ 2.43, 1.31 ], fq: 50 
  },
  "prime": {
    dict: "happiness", word: "prime", stem: "prime", anew: "flower",
    avg: [ 4.00, 6.46 ], std: [ 2.44, 1.28 ], fq: 50 
  },
  "prospect": {
    dict: "happiness", word: "prospect", stem: "prospect", anew: "chance",
    avg: [ 5.38, 6.46 ], std: [ 2.58, 1.50 ], fq: 50 
  },
  "resource": {
    dict: "happiness", word: "resource", stem: "resourc", anew: "imagine",
    avg: [ 5.98, 6.46 ], std: [ 2.14, 1.51 ], fq: 50 
  },
  "resources": {
    dict: "happiness", word: "resources", stem: "resourc", anew: "imagine",
    avg: [ 5.98, 6.46 ], std: [ 2.14, 1.15 ], fq: 50 
  },
  "rocking": {
    dict: "happiness", word: "rocking", stem: "rock", anew: "rock",
    avg: [ 4.52, 6.46 ], std: [ 2.37, 1.47 ], fq: 50 
  },
  "scored": {
    dict: "happiness", word: "scored", stem: "score", anew: "hit",
    avg: [ 5.73, 6.46 ], std: [ 2.09, 1.64 ], fq: 50 
  },
  "tender": {
    dict: "happiness", word: "tender", stem: "tender", anew: "tender",
    avg: [ 4.88, 6.45 ], std: [ 2.30, 1.72 ], fq: 50 
  },
  "chance": {
    dict: "happiness", word: "chance", stem: "chanc", anew: "chance",
    avg: [ 5.38, 6.44 ], std: [ 2.58, 1.42 ], fq: 50 
  },
  "coast": {
    dict: "happiness", word: "coast", stem: "coast", anew: "coast",
    avg: [ 4.59, 6.44 ], std: [ 2.31, 1.39 ], fq: 50 
  },
  "earth": {
    dict: "happiness", word: "earth", stem: "earth", anew: "earth",
    avg: [ 4.24, 6.44 ], std: [ 2.49, 1.82 ], fq: 50 
  },
  "eats": {
    dict: "happiness", word: "eats", stem: "eat", anew: "eat",
    avg: [ 5.69, 6.44 ], std: [ 2.51, 1.64 ], fq: 50 
  },
  "familiar": {
    dict: "happiness", word: "familiar", stem: "familiar", anew: "intimate",
    avg: [ 6.98, 6.44 ], std: [ 2.21, 1.26 ], fq: 50 
  },
  "fast": {
    dict: "happiness", word: "fast", stem: "fast", anew: "loyal",
    avg: [ 5.16, 6.44 ], std: [ 2.42, 1.23 ], fq: 50 
  },
  "gained": {
    dict: "happiness", word: "gained", stem: "gain", anew: "win",
    avg: [ 7.72, 6.44 ], std: [ 2.16, 1.59 ], fq: 50 
  },
  "graphics": {
    dict: "happiness", word: "graphics", stem: "graphic", anew: "art",
    avg: [ 4.86, 6.44 ], std: [ 2.88, 1.25 ], fq: 50 
  },
  "improve": {
    dict: "happiness", word: "improve", stem: "improv", anew: "improve",
    avg: [ 5.69, 6.44 ], std: [ 2.15, 1.50 ], fq: 50 
  },
  "infinite": {
    dict: "happiness", word: "infinite", stem: "infinit", anew: "space",
    avg: [ 5.14, 6.44 ], std: [ 2.54, 1.50 ], fq: 50 
  },
  "nap": {
    dict: "happiness", word: "nap", stem: "nap", anew: "sleep",
    avg: [ 2.80, 6.44 ], std: [ 2.66, 1.92 ], fq: 50 
  },
  "professional": {
    dict: "happiness", word: "professional", stem: "profession", anew: "masterful",
    avg: [ 5.20, 6.44 ], std: [ 2.85, 1.16 ], fq: 50 
  },
  "rides": {
    dict: "happiness", word: "rides", stem: "ride", anew: "free",
    avg: [ 5.15, 6.44 ], std: [ 3.04, 1.34 ], fq: 50 
  },
  "satisfactory": {
    dict: "happiness", word: "satisfactory", stem: "satisfactori", anew: "acceptance",
    avg: [ 5.40, 6.44 ], std: [ 2.70, 1.61 ], fq: 50 
  },
  "scoring": {
    dict: "happiness", word: "scoring", stem: "score", anew: "hit",
    avg: [ 5.73, 6.44 ], std: [ 2.09, 1.25 ], fq: 50 
  },
  "support": {
    dict: "happiness", word: "support", stem: "support", anew: "lively",
    avg: [ 5.53, 6.44 ], std: [ 2.90, 1.43 ], fq: 50 
  },
  "teachers": {
    dict: "happiness", word: "teachers", stem: "teacher", anew: "teacher",
    avg: [ 4.05, 6.44 ], std: [ 2.61, 1.30 ], fq: 50 
  },
  "teaching": {
    dict: "happiness", word: "teaching", stem: "teach", anew: "learn",
    avg: [ 5.39, 6.44 ], std: [ 2.22, 1.20 ], fq: 50 
  },
  "wage": {
    dict: "happiness", word: "wage", stem: "wage", anew: "engaged",
    avg: [ 6.77, 6.44 ], std: [ 2.07, 1.30 ], fq: 50 
  },
  "wink": {
    dict: "happiness", word: "wink", stem: "wink", anew: "wink",
    avg: [ 5.44, 6.44 ], std: [ 2.68, 1.15 ], fq: 50 
  },
  "wit": {
    dict: "happiness", word: "wit", stem: "wit", anew: "wit",
    avg: [ 5.42, 6.44 ], std: [ 2.44, 1.51 ], fq: 50 
  },
  "accept": {
    dict: "happiness", word: "accept", stem: "accept", anew: "acceptance",
    avg: [ 5.40, 6.42 ], std: [ 2.70, 1.07 ], fq: 50 
  },
  "band": {
    dict: "happiness", word: "band", stem: "band", anew: "circle",
    avg: [ 3.86, 6.42 ], std: [ 2.13, 1.55 ], fq: 50 
  },
  "chat": {
    dict: "happiness", word: "chat", stem: "chat", anew: "gossip",
    avg: [ 5.74, 6.42 ], std: [ 2.38, 1.18 ], fq: 50 
  },
  "contribution": {
    dict: "happiness", word: "contribution", stem: "contribut", anew: "part",
    avg: [ 3.82, 6.42 ], std: [ 2.24, 1.49 ], fq: 50 
  },
  "curves": {
    dict: "happiness", word: "curves", stem: "curv", anew: "cut",
    avg: [ 5.00, 6.42 ], std: [ 2.32, 1.23 ], fq: 50 
  },
  "dates": {
    dict: "happiness", word: "dates", stem: "date", anew: "engaged",
    avg: [ 6.77, 6.42 ], std: [ 2.07, 1.29 ], fq: 50 
  },
  "delivered": {
    dict: "happiness", word: "delivered", stem: "deliv", anew: "save",
    avg: [ 4.95, 6.42 ], std: [ 2.19, 1.20 ], fq: 50 
  },
  "feed": {
    dict: "happiness", word: "feed", stem: "feed", anew: "eat",
    avg: [ 5.69, 6.42 ], std: [ 2.51, 1.20 ], fq: 50 
  },
  "gaming": {
    dict: "happiness", word: "gaming", stem: "game", anew: "game",
    avg: [ 5.89, 6.42 ], std: [ 2.37, 1.87 ], fq: 50 
  },
  "interests": {
    dict: "happiness", word: "interests", stem: "interest", anew: "interest",
    avg: [ 5.66, 6.42 ], std: [ 2.26, 1.77 ], fq: 50 
  },
  "jazz": {
    dict: "happiness", word: "jazz", stem: "jazz", anew: "loved",
    avg: [ 6.38, 6.42 ], std: [ 2.68, 1.46 ], fq: 50 
  },
  "traveled": {
    dict: "happiness", word: "traveled", stem: "travel", anew: "travel",
    avg: [ 6.21, 6.42 ], std: [ 2.51, 1.39 ], fq: 50 
  },
  "wine": {
    dict: "happiness", word: "wine", stem: "wine", anew: "wine",
    avg: [ 4.78, 6.42 ], std: [ 2.34, 2.12 ], fq: 50 
  },
  "wondered": {
    dict: "happiness", word: "wondered", stem: "wonder", anew: "wonder",
    avg: [ 5.00, 6.42 ], std: [ 2.23, 1.28 ], fq: 50 
  },
  "farming": {
    dict: "happiness", word: "farming", stem: "farm", anew: "farm",
    avg: [ 3.90, 6.42 ], std: [ 1.95, 1.53 ], fq: 50 
  },
  "hats": {
    dict: "happiness", word: "hats", stem: "hat", anew: "hat",
    avg: [ 4.10, 6.41 ], std: [ 2.00, 1.32 ], fq: 50 
  },
  "hearted": {
    dict: "happiness", word: "hearted", stem: "heart", anew: "heart",
    avg: [ 6.34, 6.41 ], std: [ 2.25, 1.38 ], fq: 50 
  },
  "baked": {
    dict: "happiness", word: "baked", stem: "bake", anew: "bake",
    avg: [ 5.10, 6.40 ], std: [ 2.30, 1.88 ], fq: 50 
  },
  "buying": {
    dict: "happiness", word: "buying", stem: "buy", anew: "corrupt",
    avg: [ 4.67, 6.40 ], std: [ 2.35, 1.29 ], fq: 50 
  },
  "chicken": {
    dict: "happiness", word: "chicken", stem: "chicken", anew: "yellow",
    avg: [ 4.43, 6.40 ], std: [ 2.05, 1.63 ], fq: 50 
  },
  "drawings": {
    dict: "happiness", word: "drawings", stem: "draw", anew: "lottery",
    avg: [ 5.36, 6.40 ], std: [ 2.45, 1.51 ], fq: 50 
  },
  "educational": {
    dict: "happiness", word: "educational", stem: "educ", anew: "education",
    avg: [ 5.74, 6.40 ], std: [ 2.46, 1.48 ], fq: 50 
  },
  "gain": {
    dict: "happiness", word: "gain", stem: "gain", anew: "win",
    avg: [ 7.72, 6.40 ], std: [ 2.16, 1.54 ], fq: 50 
  },
  "kidding": {
    dict: "happiness", word: "kidding", stem: "kid", anew: "kids",
    avg: [ 5.27, 6.40 ], std: [ 2.36, 1.37 ], fq: 50 
  },
  "light": {
    dict: "happiness", word: "light", stem: "light", anew: "bright",
    avg: [ 5.40, 6.40 ], std: [ 2.33, 1.51 ], fq: 50 
  },
  "mountain": {
    dict: "happiness", word: "mountain", stem: "mountain", anew: "mountain",
    avg: [ 5.49, 6.40 ], std: [ 2.43, 1.71 ], fq: 50 
  },
  "pics": {
    dict: "happiness", word: "pics", stem: "pic", anew: "movie",
    avg: [ 4.93, 6.40 ], std: [ 2.54, 1.36 ], fq: 50 
  },
  "poetry": {
    dict: "happiness", word: "poetry", stem: "poetri", anew: "poetry",
    avg: [ 4.00, 6.40 ], std: [ 2.85, 1.91 ], fq: 50 
  },
  "possibility": {
    dict: "happiness", word: "possibility", stem: "possibl", anew: "theory",
    avg: [ 4.62, 6.40 ], std: [ 1.94, 1.25 ], fq: 50 
  },
  "resolved": {
    dict: "happiness", word: "resolved", stem: "resolv", anew: "answer",
    avg: [ 5.41, 6.40 ], std: [ 2.43, 1.47 ], fq: 50 
  },
  "studies": {
    dict: "happiness", word: "studies", stem: "studi", anew: "field",
    avg: [ 4.08, 6.40 ], std: [ 2.41, 1.37 ], fq: 50 
  },
  "tennis": {
    dict: "happiness", word: "tennis", stem: "tenni", anew: "tennis",
    avg: [ 4.61, 6.40 ], std: [ 2.60, 1.41 ], fq: 50 
  },
  "touch": {
    dict: "happiness", word: "touch", stem: "touch", anew: "affection",
    avg: [ 6.21, 6.40 ], std: [ 2.75, 1.28 ], fq: 50 
  },
  "touched": {
    dict: "happiness", word: "touched", stem: "touch", anew: "affection",
    avg: [ 6.21, 6.40 ], std: [ 2.75, 1.23 ], fq: 50 
  },
  "tradition": {
    dict: "happiness", word: "tradition", stem: "tradit", anew: "custom",
    avg: [ 4.66, 6.40 ], std: [ 2.12, 1.62 ], fq: 50 
  },
  "twins": {
    dict: "happiness", word: "twins", stem: "twin", anew: "couple",
    avg: [ 6.39, 6.40 ], std: [ 2.31, 1.65 ], fq: 50 
  },
  "visits": {
    dict: "happiness", word: "visits", stem: "visit", anew: "gossip",
    avg: [ 5.74, 6.40 ], std: [ 2.38, 1.29 ], fq: 50 
  },
  "wages": {
    dict: "happiness", word: "wages", stem: "wage", anew: "engaged",
    avg: [ 6.77, 6.40 ], std: [ 2.07, 1.34 ], fq: 50 
  },
  "younger": {
    dict: "happiness", word: "younger", stem: "younger", anew: "young",
    avg: [ 5.64, 6.40 ], std: [ 2.51, 1.50 ], fq: 50 
  },
  "exercised": {
    dict: "happiness", word: "exercised", stem: "exercis", anew: "exercise",
    avg: [ 6.84, 6.39 ], std: [ 2.06, 1.58 ], fq: 50 
  },
  "seeds": {
    dict: "happiness", word: "seeds", stem: "seed", anew: "germs",
    avg: [ 4.49, 6.39 ], std: [ 2.24, 1.50 ], fq: 50 
  },
  "bigger": {
    dict: "happiness", word: "bigger", stem: "bigger", anew: "adult",
    avg: [ 4.76, 6.38 ], std: [ 1.95, 1.40 ], fq: 50 
  },
  "breath": {
    dict: "happiness", word: "breath", stem: "breath", anew: "intimate",
    avg: [ 6.98, 6.38 ], std: [ 2.21, 1.58 ], fq: 50 
  },
  "committed": {
    dict: "happiness", word: "committed", stem: "commit", anew: "invest",
    avg: [ 5.12, 6.38 ], std: [ 2.42, 1.41 ], fq: 50 
  },
  "designers": {
    dict: "happiness", word: "designers", stem: "design", anew: "decorate",
    avg: [ 5.14, 6.38 ], std: [ 2.39, 1.48 ], fq: 50 
  },
  "faster": {
    dict: "happiness", word: "faster", stem: "faster", anew: "loyal",
    avg: [ 5.16, 6.38 ], std: [ 2.42, 1.35 ], fq: 50 
  },
  "lamb": {
    dict: "happiness", word: "lamb", stem: "lamb", anew: "lamb",
    avg: [ 3.36, 6.38 ], std: [ 2.18, 1.26 ], fq: 50 
  },
  "leader": {
    dict: "happiness", word: "leader", stem: "leader", anew: "leader",
    avg: [ 6.27, 6.38 ], std: [ 2.18, 1.34 ], fq: 50 
  },
  "lottery": {
    dict: "happiness", word: "lottery", stem: "lotteri", anew: "lottery",
    avg: [ 5.36, 6.38 ], std: [ 2.45, 2.13 ], fq: 50 
  },
  "meet": {
    dict: "happiness", word: "meet", stem: "meet", anew: "satisfied",
    avg: [ 4.94, 6.38 ], std: [ 2.63, 1.26 ], fq: 50 
  },
  "played": {
    dict: "happiness", word: "played", stem: "play", anew: "toy",
    avg: [ 5.11, 6.38 ], std: [ 2.84, 1.43 ], fq: 50 
  },
  "preserve": {
    dict: "happiness", word: "preserve", stem: "preserv", anew: "save",
    avg: [ 4.95, 6.38 ], std: [ 2.19, 1.50 ], fq: 50 
  },
  "queens": {
    dict: "happiness", word: "queens", stem: "queen", anew: "queen",
    avg: [ 4.76, 6.38 ], std: [ 2.18, 1.66 ], fq: 50 
  },
  "sails": {
    dict: "happiness", word: "sails", stem: "sail", anew: "voyage",
    avg: [ 5.55, 6.38 ], std: [ 2.23, 1.38 ], fq: 50 
  },
  "saves": {
    dict: "happiness", word: "saves", stem: "save", anew: "save",
    avg: [ 4.95, 6.38 ], std: [ 2.19, 1.52 ], fq: 50 
  },
  "score": {
    dict: "happiness", word: "score", stem: "score", anew: "hit",
    avg: [ 5.73, 6.38 ], std: [ 2.09, 1.09 ], fq: 50 
  },
  "seeing": {
    dict: "happiness", word: "seeing", stem: "see", anew: "controlling",
    avg: [ 6.10, 6.38 ], std: [ 2.19, 1.31 ], fq: 50 
  },
  "sung": {
    dict: "happiness", word: "sung", stem: "sung", anew: "whistle",
    avg: [ 4.69, 6.38 ], std: [ 1.99, 1.24 ], fq: 50 
  },
  "tasted": {
    dict: "happiness", word: "tasted", stem: "tast", anew: "taste",
    avg: [ 5.22, 6.38 ], std: [ 2.38, 1.32 ], fq: 50 
  },
  "tastes": {
    dict: "happiness", word: "tastes", stem: "tast", anew: "taste",
    avg: [ 5.22, 6.38 ], std: [ 2.38, 1.76 ], fq: 50 
  },
  "thinks": {
    dict: "happiness", word: "thinks", stem: "think", anew: "imagine",
    avg: [ 5.98, 6.38 ], std: [ 2.14, 1.23 ], fq: 50 
  },
  "thought": {
    dict: "happiness", word: "thought", stem: "thought", anew: "thoughtful",
    avg: [ 5.72, 6.38 ], std: [ 2.30, 1.34 ], fq: 50 
  },
  "touches": {
    dict: "happiness", word: "touches", stem: "touch", anew: "affection",
    avg: [ 6.21, 6.38 ], std: [ 2.75, 1.26 ], fq: 50 
  },
  "agricultural": {
    dict: "happiness", word: "agricultural", stem: "agricultur", anew: "farm",
    avg: [ 3.90, 6.38 ], std: [ 1.95, 1.45 ], fq: 50 
  },
  "acquire": {
    dict: "happiness", word: "acquire", stem: "acquir", anew: "win",
    avg: [ 7.72, 6.36 ], std: [ 2.16, 1.32 ], fq: 50 
  },
  "calm": {
    dict: "happiness", word: "calm", stem: "calm", anew: "quiet",
    avg: [ 2.82, 6.36 ], std: [ 2.13, 1.60 ], fq: 50 
  },
  "curious": {
    dict: "happiness", word: "curious", stem: "curiou", anew: "odd",
    avg: [ 4.27, 6.36 ], std: [ 2.46, 1.27 ], fq: 50 
  },
  "developed": {
    dict: "happiness", word: "developed", stem: "develop", anew: "education",
    avg: [ 5.74, 6.36 ], std: [ 2.46, 1.48 ], fq: 50 
  },
  "distinguished": {
    dict: "happiness", word: "distinguished", stem: "distinguish", anew: "severe",
    avg: [ 5.26, 6.36 ], std: [ 2.36, 1.43 ], fq: 50 
  },
  "dressed": {
    dict: "happiness", word: "dressed", stem: "dress", anew: "dress",
    avg: [ 4.05, 6.36 ], std: [ 1.89, 1.12 ], fq: 50 
  },
  "drink": {
    dict: "happiness", word: "drink", stem: "drink", anew: "beverage",
    avg: [ 5.21, 6.36 ], std: [ 2.46, 1.77 ], fq: 50 
  },
  "employment": {
    dict: "happiness", word: "employment", stem: "employ", anew: "employment",
    avg: [ 5.28, 6.36 ], std: [ 2.12, 1.78 ], fq: 50 
  },
  "farms": {
    dict: "happiness", word: "farms", stem: "farm", anew: "farm",
    avg: [ 3.90, 6.36 ], std: [ 1.95, 1.51 ], fq: 50 
  },
  "fashion": {
    dict: "happiness", word: "fashion", stem: "fashion", anew: "manner",
    avg: [ 4.56, 6.36 ], std: [ 1.78, 1.80 ], fq: 50 
  },
  "imagined": {
    dict: "happiness", word: "imagined", stem: "imagin", anew: "imagine",
    avg: [ 5.98, 6.36 ], std: [ 2.14, 1.50 ], fq: 50 
  },
  "innocent": {
    dict: "happiness", word: "innocent", stem: "innoc", anew: "innocent",
    avg: [ 4.21, 6.36 ], std: [ 1.99, 1.38 ], fq: 50 
  },
  "interest": {
    dict: "happiness", word: "interest", stem: "interest", anew: "interest",
    avg: [ 5.66, 6.36 ], std: [ 2.26, 1.54 ], fq: 50 
  },
  "justified": {
    dict: "happiness", word: "justified", stem: "justifi", anew: "excuse",
    avg: [ 4.48, 6.36 ], std: [ 2.29, 1.21 ], fq: 50 
  },
  "mail": {
    dict: "happiness", word: "mail", stem: "mail", anew: "mail",
    avg: [ 5.63, 6.36 ], std: [ 2.36, 1.69 ], fq: 50 
  },
  "mobile": {
    dict: "happiness", word: "mobile", stem: "mobil", anew: "mobility",
    avg: [ 5.00, 6.36 ], std: [ 2.18, 1.21 ], fq: 50 
  },
  "original": {
    dict: "happiness", word: "original", stem: "origin", anew: "masterful",
    avg: [ 5.20, 6.36 ], std: [ 2.85, 1.44 ], fq: 50 
  },
  "performed": {
    dict: "happiness", word: "performed", stem: "perform", anew: "execution",
    avg: [ 5.71, 6.36 ], std: [ 2.74, 1.47 ], fq: 50 
  },
  "please": {
    dict: "happiness", word: "please", stem: "pleas", anew: "delight",
    avg: [ 5.44, 6.36 ], std: [ 2.88, 1.68 ], fq: 50 
  },
  "rain": {
    dict: "happiness", word: "rain", stem: "rain", anew: "rain",
    avg: [ 3.65, 6.36 ], std: [ 2.35, 1.91 ], fq: 50 
  },
  "relation": {
    dict: "happiness", word: "relation", stem: "relat", anew: "intercourse",
    avg: [ 7.00, 6.36 ], std: [ 2.07, 1.16 ], fq: 50 
  },
  "teacher": {
    dict: "happiness", word: "teacher", stem: "teacher", anew: "teacher",
    avg: [ 4.05, 6.36 ], std: [ 2.61, 1.54 ], fq: 50 
  },
  "technologies": {
    dict: "happiness", word: "technologies", stem: "technolog", anew: "engine",
    avg: [ 3.98, 6.36 ], std: [ 2.33, 1.69 ], fq: 50 
  },
  "value": {
    dict: "happiness", word: "value", stem: "valu", anew: "treasure",
    avg: [ 6.75, 6.36 ], std: [ 2.30, 1.24 ], fq: 50 
  },
  "branches": {
    dict: "happiness", word: "branches", stem: "branch", anew: "fork",
    avg: [ 3.96, 6.35 ], std: [ 1.94, 1.20 ], fq: 50 
  },
  "existed": {
    dict: "happiness", word: "existed", stem: "exist", anew: "lively",
    avg: [ 5.53, 6.35 ], std: [ 2.90, 1.44 ], fq: 50 
  },
  "bread": {
    dict: "happiness", word: "bread", stem: "bread", anew: "sugar",
    avg: [ 5.64, 6.34 ], std: [ 2.18, 1.76 ], fq: 50 
  },
  "castle": {
    dict: "happiness", word: "castle", stem: "castl", anew: "palace",
    avg: [ 5.10, 6.34 ], std: [ 2.75, 1.71 ], fq: 50 
  },
  "clouds": {
    dict: "happiness", word: "clouds", stem: "cloud", anew: "clouds",
    avg: [ 3.30, 6.34 ], std: [ 2.08, 1.98 ], fq: 50 
  },
  "connected": {
    dict: "happiness", word: "connected", stem: "connect", anew: "unit",
    avg: [ 3.75, 6.34 ], std: [ 2.49, 0.98 ], fq: 50 
  },
  "employ": {
    dict: "happiness", word: "employ", stem: "employ", anew: "employment",
    avg: [ 5.28, 6.34 ], std: [ 2.12, 1.42 ], fq: 50 
  },
  "exists": {
    dict: "happiness", word: "exists", stem: "exist", anew: "lively",
    avg: [ 5.53, 6.34 ], std: [ 2.90, 1.35 ], fq: 50 
  },
  "experience": {
    dict: "happiness", word: "experience", stem: "experi", anew: "lively",
    avg: [ 5.53, 6.34 ], std: [ 2.90, 1.21 ], fq: 50 
  },
  "hiring": {
    dict: "happiness", word: "hiring", stem: "hire", anew: "engaged",
    avg: [ 6.77, 6.34 ], std: [ 2.07, 1.80 ], fq: 50 
  },
  "house": {
    dict: "happiness", word: "house", stem: "hous", anew: "house",
    avg: [ 4.56, 6.34 ], std: [ 2.41, 1.62 ], fq: 50 
  },
  "lord": {
    dict: "happiness", word: "lord", stem: "lord", anew: "masterful",
    avg: [ 5.20, 6.34 ], std: [ 2.85, 1.83 ], fq: 50 
  },
  "released": {
    dict: "happiness", word: "released", stem: "releas", anew: "free",
    avg: [ 5.15, 6.34 ], std: [ 3.04, 1.52 ], fq: 50 
  },
  "saint": {
    dict: "happiness", word: "saint", stem: "saint", anew: "saint",
    avg: [ 4.49, 6.34 ], std: [ 1.90, 1.80 ], fq: 50 
  },
  "soon": {
    dict: "happiness", word: "soon", stem: "soon", anew: "present",
    avg: [ 5.12, 6.34 ], std: [ 2.39, 0.89 ], fq: 50 
  },
  "soul": {
    dict: "happiness", word: "soul", stem: "soul", anew: "person",
    avg: [ 4.19, 6.34 ], std: [ 2.45, 1.67 ], fq: 50 
  },
  "activity": {
    dict: "happiness", word: "activity", stem: "activ", anew: "activate",
    avg: [ 4.86, 6.32 ], std: [ 2.56, 1.00 ], fq: 50 
  },
  "agreement": {
    dict: "happiness", word: "agreement", stem: "agreement", anew: "agreement",
    avg: [ 5.02, 6.32 ], std: [ 2.24, 1.22 ], fq: 50 
  },
  "date": {
    dict: "happiness", word: "date", stem: "date", anew: "engaged",
    avg: [ 6.77, 6.32 ], std: [ 2.07, 1.61 ], fq: 50 
  },
  "deal": {
    dict: "happiness", word: "deal", stem: "deal", anew: "mountain",
    avg: [ 5.49, 6.32 ], std: [ 2.43, 1.08 ], fq: 50 
  },
  "designer": {
    dict: "happiness", word: "designer", stem: "design", anew: "decorate",
    avg: [ 5.14, 6.32 ], std: [ 2.39, 1.63 ], fq: 50 
  },
  "devotion": {
    dict: "happiness", word: "devotion", stem: "devot", anew: "devoted",
    avg: [ 5.23, 6.32 ], std: [ 2.21, 2.09 ], fq: 50 
  },
  "experiences": {
    dict: "happiness", word: "experiences", stem: "experi", anew: "lively",
    avg: [ 5.53, 6.32 ], std: [ 2.90, 1.08 ], fq: 50 
  },
  "kin": {
    dict: "happiness", word: "kin", stem: "kin", anew: "family",
    avg: [ 4.80, 6.32 ], std: [ 2.71, 1.50 ], fq: 50 
  },
  "lights": {
    dict: "happiness", word: "lights", stem: "light", anew: "bright",
    avg: [ 5.40, 6.32 ], std: [ 2.33, 1.41 ], fq: 50 
  },
  "mornings": {
    dict: "happiness", word: "mornings", stem: "morn", anew: "sunrise",
    avg: [ 5.06, 6.32 ], std: [ 3.05, 2.23 ], fq: 50 
  },
  "newspaper": {
    dict: "happiness", word: "newspaper", stem: "newspap", anew: "paper",
    avg: [ 2.50, 6.32 ], std: [ 1.85, 1.35 ], fq: 50 
  },
  "offering": {
    dict: "happiness", word: "offering", stem: "offer", anew: "tender",
    avg: [ 4.88, 6.32 ], std: [ 2.30, 1.65 ], fq: 50 
  },
  "resolve": {
    dict: "happiness", word: "resolve", stem: "resolv", anew: "answer",
    avg: [ 5.41, 6.32 ], std: [ 2.43, 1.17 ], fq: 50 
  },
  "snow": {
    dict: "happiness", word: "snow", stem: "snow", anew: "snow",
    avg: [ 5.75, 6.32 ], std: [ 2.47, 2.18 ], fq: 50 
  },
  "sure": {
    dict: "happiness", word: "sure", stem: "sure", anew: "trust",
    avg: [ 5.30, 6.32 ], std: [ 2.66, 1.49 ], fq: 50 
  },
  "waters": {
    dict: "happiness", word: "waters", stem: "water", anew: "water",
    avg: [ 4.97, 6.32 ], std: [ 2.49, 1.15 ], fq: 50 
  },
  "worship": {
    dict: "happiness", word: "worship", stem: "worship", anew: "reverent",
    avg: [ 4.00, 6.32 ], std: [ 1.60, 1.48 ], fq: 50 
  },
  "writers": {
    dict: "happiness", word: "writers", stem: "writer", anew: "writer",
    avg: [ 4.33, 6.32 ], std: [ 2.45, 1.27 ], fq: 50 
  },
  "scent": {
    dict: "happiness", word: "scent", stem: "scent", anew: "perfume",
    avg: [ 5.05, 6.31 ], std: [ 2.36, 1.25 ], fq: 50 
  },
  "volumes": {
    dict: "happiness", word: "volumes", stem: "volum", anew: "book",
    avg: [ 4.17, 6.31 ], std: [ 2.49, 1.29 ], fq: 50 
  },
  "whistle": {
    dict: "happiness", word: "whistle", stem: "whistl", anew: "whistle",
    avg: [ 4.69, 6.31 ], std: [ 1.99, 1.40 ], fq: 50 
  },
  "absolutely": {
    dict: "happiness", word: "absolutely", stem: "absolut", anew: "dead",
    avg: [ 5.73, 6.30 ], std: [ 2.73, 1.42 ], fq: 50 
  },
  "atmosphere": {
    dict: "happiness", word: "atmosphere", stem: "atmospher", anew: "air",
    avg: [ 4.12, 6.30 ], std: [ 2.30, 1.20 ], fq: 50 
  },
  "bought": {
    dict: "happiness", word: "bought", stem: "bought", anew: "corrupt",
    avg: [ 4.67, 6.30 ], std: [ 2.35, 1.23 ], fq: 50 
  },
  "engineer": {
    dict: "happiness", word: "engineer", stem: "engin", anew: "engine",
    avg: [ 3.98, 6.30 ], std: [ 2.33, 1.18 ], fq: 50 
  },
  "exercise": {
    dict: "happiness", word: "exercise", stem: "exercis", anew: "exercise",
    avg: [ 6.84, 6.30 ], std: [ 2.06, 1.64 ], fq: 50 
  },
  "feeding": {
    dict: "happiness", word: "feeding", stem: "feed", anew: "eat",
    avg: [ 5.69, 6.30 ], std: [ 2.51, 1.31 ], fq: 50 
  },
  "flowing": {
    dict: "happiness", word: "flowing", stem: "flow", anew: "fall",
    avg: [ 4.70, 6.30 ], std: [ 2.48, 1.37 ], fq: 50 
  },
  "joined": {
    dict: "happiness", word: "joined", stem: "join", anew: "couple",
    avg: [ 6.39, 6.30 ], std: [ 2.31, 1.09 ], fq: 50 
  },
  "paint": {
    dict: "happiness", word: "paint", stem: "paint", anew: "paint",
    avg: [ 4.10, 6.30 ], std: [ 2.36, 1.07 ], fq: 50 
  },
  "painted": {
    dict: "happiness", word: "painted", stem: "paint", anew: "paint",
    avg: [ 4.10, 6.30 ], std: [ 2.36, 0.99 ], fq: 50 
  },
  "plane": {
    dict: "happiness", word: "plane", stem: "plane", anew: "plane",
    avg: [ 6.14, 6.30 ], std: [ 2.39, 1.63 ], fq: 50 
  },
  "produced": {
    dict: "happiness", word: "produced", stem: "produc", anew: "farm",
    avg: [ 3.90, 6.30 ], std: [ 1.95, 1.20 ], fq: 50 
  },
  "protecting": {
    dict: "happiness", word: "protecting", stem: "protect", anew: "protected",
    avg: [ 4.09, 6.30 ], std: [ 2.77, 1.61 ], fq: 50 
  },
  "relations": {
    dict: "happiness", word: "relations", stem: "relat", anew: "intercourse",
    avg: [ 7.00, 6.30 ], std: [ 2.07, 1.61 ], fq: 50 
  },
  "swing": {
    dict: "happiness", word: "swing", stem: "swing", anew: "cut",
    avg: [ 5.00, 6.30 ], std: [ 2.32, 1.27 ], fq: 50 
  },
  "visited": {
    dict: "happiness", word: "visited", stem: "visit", anew: "gossip",
    avg: [ 5.74, 6.30 ], std: [ 2.38, 1.42 ], fq: 50 
  },
  "cheeks": {
    dict: "happiness", word: "cheeks", stem: "cheek", anew: "bold",
    avg: [ 5.60, 6.29 ], std: [ 2.21, 1.53 ], fq: 50 
  },
  "observation": {
    dict: "happiness", word: "observation", stem: "observ", anew: "watch",
    avg: [ 4.10, 6.29 ], std: [ 2.12, 1.32 ], fq: 50 
  },
  "rum": {
    dict: "happiness", word: "rum", stem: "rum", anew: "odd",
    avg: [ 4.27, 6.29 ], std: [ 2.46, 2.09 ], fq: 50 
  },
  "babes": {
    dict: "happiness", word: "babes", stem: "babe", anew: "baby",
    avg: [ 5.53, 6.28 ], std: [ 2.80, 1.75 ], fq: 50 
  },
  "buy": {
    dict: "happiness", word: "buy", stem: "buy", anew: "corrupt",
    avg: [ 4.67, 6.28 ], std: [ 2.35, 1.36 ], fq: 50 
  },
  "cooler": {
    dict: "happiness", word: "cooler", stem: "cooler", anew: "tank",
    avg: [ 4.88, 6.28 ], std: [ 1.86, 1.31 ], fq: 50 
  },
  "fairly": {
    dict: "happiness", word: "fairly", stem: "fairli", anew: "pretty",
    avg: [ 6.03, 6.28 ], std: [ 2.22, 1.16 ], fq: 50 
  },
  "fix": {
    dict: "happiness", word: "fix", stem: "fix", anew: "secure",
    avg: [ 3.14, 6.28 ], std: [ 2.47, 1.53 ], fq: 50 
  },
  "founded": {
    dict: "happiness", word: "founded", stem: "found", anew: "plant",
    avg: [ 3.62, 6.28 ], std: [ 2.25, 1.25 ], fq: 50 
  },
  "globe": {
    dict: "happiness", word: "globe", stem: "globe", anew: "earth",
    avg: [ 4.24, 6.28 ], std: [ 2.49, 1.43 ], fq: 50 
  },
  "hoped": {
    dict: "happiness", word: "hoped", stem: "hope", anew: "hopeful",
    avg: [ 5.78, 6.28 ], std: [ 2.09, 1.11 ], fq: 50 
  },
  "introduced": {
    dict: "happiness", word: "introduced", stem: "introduc", anew: "present",
    avg: [ 5.12, 6.28 ], std: [ 2.39, 1.36 ], fq: 50 
  },
  "lead": {
    dict: "happiness", word: "lead", stem: "lead", anew: "chair",
    avg: [ 3.15, 6.28 ], std: [ 1.77, 1.46 ], fq: 50 
  },
  "listening": {
    dict: "happiness", word: "listening", stem: "listen", anew: "mind",
    avg: [ 5.00, 6.28 ], std: [ 2.68, 1.44 ], fq: 50 
  },
  "lots": {
    dict: "happiness", word: "lots", stem: "lot", anew: "mountain",
    avg: [ 5.49, 6.28 ], std: [ 2.43, 1.43 ], fq: 50 
  },
  "market": {
    dict: "happiness", word: "market", stem: "market", anew: "market",
    avg: [ 4.12, 6.28 ], std: [ 1.83, 1.60 ], fq: 50 
  },
  "monkey": {
    dict: "happiness", word: "monkey", stem: "monkey", anew: "tamper",
    avg: [ 4.95, 6.28 ], std: [ 2.01, 1.71 ], fq: 50 
  },
  "professionals": {
    dict: "happiness", word: "professionals", stem: "profession", anew: "masterful",
    avg: [ 5.20, 6.28 ], std: [ 2.85, 1.40 ], fq: 50 
  },
  "remembering": {
    dict: "happiness", word: "remembering", stem: "rememb", anew: "memory",
    avg: [ 5.42, 6.28 ], std: [ 2.25, 1.26 ], fq: 50 
  },
  "sentimental": {
    dict: "happiness", word: "sentimental", stem: "sentiment", anew: "sentiment",
    avg: [ 4.41, 6.28 ], std: [ 2.30, 1.67 ], fq: 50 
  },
  "students": {
    dict: "happiness", word: "students", stem: "student", anew: "scholar",
    avg: [ 5.12, 6.28 ], std: [ 2.46, 1.83 ], fq: 50 
  },
  "themes": {
    dict: "happiness", word: "themes", stem: "theme", anew: "idea",
    avg: [ 5.86, 6.28 ], std: [ 1.81, 1.25 ], fq: 50 
  },
  "thinking": {
    dict: "happiness", word: "thinking", stem: "think", anew: "thoughtful",
    avg: [ 5.72, 6.28 ], std: [ 2.30, 1.29 ], fq: 50 
  },
  "tips": {
    dict: "happiness", word: "tips", stem: "tip", anew: "crown",
    avg: [ 4.28, 6.28 ], std: [ 2.53, 1.58 ], fq: 50 
  },
  "vehicles": {
    dict: "happiness", word: "vehicles", stem: "vehicl", anew: "vehicle",
    avg: [ 4.63, 6.28 ], std: [ 2.81, 1.50 ], fq: 50 
  },
  "village": {
    dict: "happiness", word: "village", stem: "villag", anew: "village",
    avg: [ 4.08, 6.28 ], std: [ 1.87, 1.13 ], fq: 50 
  },
  "white": {
    dict: "happiness", word: "white", stem: "white", anew: "white",
    avg: [ 4.37, 6.28 ], std: [ 2.14, 1.54 ], fq: 50 
  },
  "wines": {
    dict: "happiness", word: "wines", stem: "wine", anew: "wine",
    avg: [ 4.78, 6.28 ], std: [ 2.34, 2.37 ], fq: 50 
  },
  "reasonably": {
    dict: "happiness", word: "reasonably", stem: "reason", anew: "pretty",
    avg: [ 6.03, 6.27 ], std: [ 2.22, 1.36 ], fq: 50 
  },
  "observe": {
    dict: "happiness", word: "observe", stem: "observ", anew: "watch",
    avg: [ 4.10, 6.27 ], std: [ 2.12, 1.37 ], fq: 50 
  },
  "regards": {
    dict: "happiness", word: "regards", stem: "regard", anew: "wish",
    avg: [ 5.16, 6.27 ], std: [ 2.62, 1.33 ], fq: 50 
  },
  "allows": {
    dict: "happiness", word: "allows", stem: "allow", anew: "reserved",
    avg: [ 3.27, 6.26 ], std: [ 2.05, 1.19 ], fq: 50 
  },
  "appropriate": {
    dict: "happiness", word: "appropriate", stem: "appropri", anew: "reserved",
    avg: [ 3.27, 6.26 ], std: [ 2.05, 1.24 ], fq: 50 
  },
  "cars": {
    dict: "happiness", word: "cars", stem: "car", anew: "car",
    avg: [ 6.24, 6.26 ], std: [ 2.04, 1.69 ], fq: 50 
  },
  "develop": {
    dict: "happiness", word: "develop", stem: "develop", anew: "education",
    avg: [ 5.74, 6.26 ], std: [ 2.46, 1.05 ], fq: 50 
  },
  "events": {
    dict: "happiness", word: "events", stem: "event", anew: "event",
    avg: [ 5.10, 6.26 ], std: [ 2.40, 1.47 ], fq: 50 
  },
  "flag": {
    dict: "happiness", word: "flag", stem: "flag", anew: "flag",
    avg: [ 4.60, 6.26 ], std: [ 2.35, 1.31 ], fq: 50 
  },
  "gave": {
    dict: "happiness", word: "gave", stem: "gave", anew: "devoted",
    avg: [ 5.23, 6.26 ], std: [ 2.21, 1.29 ], fq: 50 
  },
  "gods": {
    dict: "happiness", word: "gods", stem: "god", anew: "god",
    avg: [ 5.95, 6.26 ], std: [ 2.84, 1.91 ], fq: 50 
  },
  "hotels": {
    dict: "happiness", word: "hotels", stem: "hotel", anew: "hotel",
    avg: [ 4.80, 6.26 ], std: [ 2.53, 1.48 ], fq: 50 
  },
  "human": {
    dict: "happiness", word: "human", stem: "human", anew: "humane",
    avg: [ 4.50, 6.26 ], std: [ 1.91, 1.64 ], fq: 50 
  },
  "leap": {
    dict: "happiness", word: "leap", stem: "leap", anew: "spring",
    avg: [ 5.67, 6.26 ], std: [ 2.51, 1.29 ], fq: 50 
  },
  "lifetime": {
    dict: "happiness", word: "lifetime", stem: "lifetim", anew: "life",
    avg: [ 6.02, 6.26 ], std: [ 2.62, 1.63 ], fq: 50 
  },
  "produce": {
    dict: "happiness", word: "produce", stem: "produc", anew: "farm",
    avg: [ 3.90, 6.26 ], std: [ 1.95, 1.12 ], fq: 50 
  },
  "prominent": {
    dict: "happiness", word: "prominent", stem: "promin", anew: "outstanding",
    avg: [ 6.24, 6.26 ], std: [ 2.59, 1.10 ], fq: 50 
  },
  "promises": {
    dict: "happiness", word: "promises", stem: "promis", anew: "hopeful",
    avg: [ 5.78, 6.26 ], std: [ 2.09, 1.55 ], fq: 50 
  },
  "raising": {
    dict: "happiness", word: "raising", stem: "rais", anew: "fire",
    avg: [ 7.17, 6.26 ], std: [ 2.06, 1.23 ], fq: 50 
  },
  "school": {
    dict: "happiness", word: "school", stem: "school", anew: "education",
    avg: [ 5.74, 6.26 ], std: [ 2.46, 1.88 ], fq: 50 
  },
  "spark": {
    dict: "happiness", word: "spark", stem: "spark", anew: "activate",
    avg: [ 4.86, 6.26 ], std: [ 2.56, 1.66 ], fq: 50 
  },
  "travelers": {
    dict: "happiness", word: "travelers", stem: "travel", anew: "travel",
    avg: [ 6.21, 6.26 ], std: [ 2.51, 1.56 ], fq: 50 
  },
  "spirits": {
    dict: "happiness", word: "spirits", stem: "spirit", anew: "spirit",
    avg: [ 5.56, 6.24 ], std: [ 2.62, 1.80 ], fq: 50 
  },
  "advances": {
    dict: "happiness", word: "advances", stem: "advanc", anew: "win",
    avg: [ 7.72, 6.24 ], std: [ 2.16, 1.35 ], fq: 50 
  },
  "answer": {
    dict: "happiness", word: "answer", stem: "answer", anew: "answer",
    avg: [ 5.41, 6.24 ], std: [ 2.43, 1.57 ], fq: 50 
  },
  "athletes": {
    dict: "happiness", word: "athletes", stem: "athlet", anew: "athletics",
    avg: [ 6.10, 6.24 ], std: [ 2.29, 1.38 ], fq: 50 
  },
  "bowling": {
    dict: "happiness", word: "bowling", stem: "bowl", anew: "bowl",
    avg: [ 3.47, 6.24 ], std: [ 2.12, 1.51 ], fq: 50 
  },
  "boy": {
    dict: "happiness", word: "boy", stem: "boy", anew: "boy",
    avg: [ 4.58, 6.24 ], std: [ 2.37, 1.29 ], fq: 50 
  },
  "built": {
    dict: "happiness", word: "built", stem: "built", anew: "building",
    avg: [ 3.92, 6.24 ], std: [ 1.94, 1.19 ], fq: 50 
  },
  "choice": {
    dict: "happiness", word: "choice", stem: "choic", anew: "option",
    avg: [ 4.74, 6.24 ], std: [ 2.23, 1.32 ], fq: 50 
  },
  "day": {
    dict: "happiness", word: "day", stem: "day", anew: "daylight",
    avg: [ 4.77, 6.24 ], std: [ 2.50, 1.36 ], fq: 50 
  },
  "deliver": {
    dict: "happiness", word: "deliver", stem: "deliv", anew: "save",
    avg: [ 4.95, 6.24 ], std: [ 2.19, 1.02 ], fq: 50 
  },
  "eyes": {
    dict: "happiness", word: "eyes", stem: "eye", anew: "heart",
    avg: [ 6.34, 6.24 ], std: [ 2.25, 1.10 ], fq: 50 
  },
  "flying": {
    dict: "happiness", word: "flying", stem: "fli", anew: "quick",
    avg: [ 6.57, 6.24 ], std: [ 1.78, 1.65 ], fq: 50 
  },
  "grad": {
    dict: "happiness", word: "grad", stem: "grad", anew: "graduate",
    avg: [ 7.25, 6.24 ], std: [ 2.25, 1.29 ], fq: 50 
  },
  "jelly": {
    dict: "happiness", word: "jelly", stem: "jelli", anew: "jelly",
    avg: [ 3.70, 6.24 ], std: [ 2.29, 1.32 ], fq: 50 
  },
  "making": {
    dict: "happiness", word: "making", stem: "make", anew: "urine",
    avg: [ 4.20, 6.24 ], std: [ 2.18, 1.19 ], fq: 50 
  },
  "options": {
    dict: "happiness", word: "options", stem: "option", anew: "option",
    avg: [ 4.74, 6.24 ], std: [ 2.23, 0.94 ], fq: 50 
  },
  "queen": {
    dict: "happiness", word: "queen", stem: "queen", anew: "queen",
    avg: [ 4.76, 6.24 ], std: [ 2.18, 1.79 ], fq: 50 
  },
  "show": {
    dict: "happiness", word: "show", stem: "show", anew: "present",
    avg: [ 5.12, 6.24 ], std: [ 2.39, 1.49 ], fq: 50 
  },
  "speed": {
    dict: "happiness", word: "speed", stem: "speed", anew: "swift",
    avg: [ 5.39, 6.24 ], std: [ 2.53, 1.48 ], fq: 50 
  },
  "tip": {
    dict: "happiness", word: "tip", stem: "tip", anew: "crown",
    avg: [ 4.28, 6.24 ], std: [ 2.53, 1.04 ], fq: 50 
  },
  "worlds": {
    dict: "happiness", word: "worlds", stem: "world", anew: "world",
    avg: [ 5.32, 6.24 ], std: [ 2.39, 1.56 ], fq: 50 
  },
  "writing": {
    dict: "happiness", word: "writing", stem: "write", anew: "save",
    avg: [ 4.95, 6.24 ], std: [ 2.19, 1.65 ], fq: 50 
  },
  "embrace": {
    dict: "happiness", word: "embrace", stem: "embrac", anew: "hug",
    avg: [ 5.35, 6.22 ], std: [ 2.76, 1.90 ], fq: 50 
  },
  "produces": {
    dict: "happiness", word: "produces", stem: "produc", anew: "farm",
    avg: [ 3.90, 6.22 ], std: [ 1.95, 1.34 ], fq: 50 
  },
  "answered": {
    dict: "happiness", word: "answered", stem: "answer", anew: "answer",
    avg: [ 5.41, 6.22 ], std: [ 2.43, 1.34 ], fq: 50 
  },
  "authors": {
    dict: "happiness", word: "authors", stem: "author", anew: "writer",
    avg: [ 4.33, 6.22 ], std: [ 2.45, 1.68 ], fq: 50 
  },
  "big": {
    dict: "happiness", word: "big", stem: "big", anew: "adult",
    avg: [ 4.76, 6.22 ], std: [ 1.95, 1.50 ], fq: 50 
  },
  "breast": {
    dict: "happiness", word: "breast", stem: "breast", anew: "breast",
    avg: [ 5.37, 6.22 ], std: [ 2.39, 1.45 ], fq: 50 
  },
  "build": {
    dict: "happiness", word: "build", stem: "build", anew: "building",
    avg: [ 3.92, 6.22 ], std: [ 1.94, 1.07 ], fq: 50 
  },
  "contributions": {
    dict: "happiness", word: "contributions", stem: "contribut", anew: "part",
    avg: [ 3.82, 6.22 ], std: [ 2.24, 1.56 ], fq: 50 
  },
  "decent": {
    dict: "happiness", word: "decent", stem: "decent", anew: "decorate",
    avg: [ 5.14, 6.22 ], std: [ 2.39, 1.71 ], fq: 50 
  },
  "farm": {
    dict: "happiness", word: "farm", stem: "farm", anew: "farm",
    avg: [ 3.90, 6.22 ], std: [ 1.95, 1.58 ], fq: 50 
  },
  "foundations": {
    dict: "happiness", word: "foundations", stem: "foundat", anew: "foot",
    avg: [ 3.27, 6.22 ], std: [ 1.98, 1.17 ], fq: 50 
  },
  "full": {
    dict: "happiness", word: "full", stem: "full", anew: "good",
    avg: [ 5.43, 6.22 ], std: [ 2.85, 1.22 ], fq: 50 
  },
  "guys": {
    dict: "happiness", word: "guys", stem: "guy", anew: "ridicule",
    avg: [ 5.83, 6.22 ], std: [ 2.73, 1.42 ], fq: 50 
  },
  "instrument": {
    dict: "happiness", word: "instrument", stem: "instrument", anew: "tool",
    avg: [ 4.33, 6.22 ], std: [ 1.78, 1.23 ], fq: 50 
  },
  "join": {
    dict: "happiness", word: "join", stem: "join", anew: "unit",
    avg: [ 3.75, 6.22 ], std: [ 2.49, 1.56 ], fq: 50 
  },
  "knight": {
    dict: "happiness", word: "knight", stem: "knight", anew: "horse",
    avg: [ 3.89, 6.22 ], std: [ 2.17, 1.46 ], fq: 50 
  },
  "lives": {
    dict: "happiness", word: "lives", stem: "live", anew: "lively",
    avg: [ 5.53, 6.22 ], std: [ 2.90, 1.15 ], fq: 50 
  },
  "milk": {
    dict: "happiness", word: "milk", stem: "milk", anew: "milk",
    avg: [ 3.68, 6.22 ], std: [ 2.57, 1.93 ], fq: 50 
  },
  "night": {
    dict: "happiness", word: "night", stem: "night", anew: "dark",
    avg: [ 4.28, 6.22 ], std: [ 2.21, 1.30 ], fq: 50 
  },
  "participation": {
    dict: "happiness", word: "participation", stem: "particip", anew: "engaged",
    avg: [ 6.77, 6.22 ], std: [ 2.07, 1.15 ], fq: 50 
  },
  "social": {
    dict: "happiness", word: "social", stem: "social", anew: "social",
    avg: [ 4.98, 6.22 ], std: [ 2.59, 1.04 ], fq: 50 
  },
  "styles": {
    dict: "happiness", word: "styles", stem: "style", anew: "manner",
    avg: [ 4.56, 6.22 ], std: [ 1.78, 1.02 ], fq: 50 
  },
  "supports": {
    dict: "happiness", word: "supports", stem: "support", anew: "lively",
    avg: [ 5.53, 6.22 ], std: [ 2.90, 1.53 ], fq: 50 
  },
  "thoughts": {
    dict: "happiness", word: "thoughts", stem: "thought", anew: "thoughtful",
    avg: [ 5.72, 6.22 ], std: [ 2.30, 1.54 ], fq: 50 
  },
  "tribute": {
    dict: "happiness", word: "tribute", stem: "tribut", anew: "protected",
    avg: [ 4.09, 6.22 ], std: [ 2.77, 1.36 ], fq: 50 
  },
  "dough": {
    dict: "happiness", word: "dough", stem: "dough", anew: "sugar",
    avg: [ 5.64, 6.20 ], std: [ 2.18, 1.46 ], fq: 50 
  },
  "agreements": {
    dict: "happiness", word: "agreements", stem: "agreement", anew: "agreement",
    avg: [ 5.02, 6.20 ], std: [ 2.24, 1.56 ], fq: 50 
  },
  "assured": {
    dict: "happiness", word: "assured", stem: "assur", anew: "controlling",
    avg: [ 6.10, 6.20 ], std: [ 2.19, 1.56 ], fq: 50 
  },
  "engage": {
    dict: "happiness", word: "engage", stem: "engag", anew: "engaged",
    avg: [ 6.77, 6.20 ], std: [ 2.07, 1.34 ], fq: 50 
  },
  "ethical": {
    dict: "happiness", word: "ethical", stem: "ethic", anew: "honor",
    avg: [ 5.90, 6.20 ], std: [ 1.83, 1.37 ], fq: 50 
  },
  "faces": {
    dict: "happiness", word: "faces", stem: "face", anew: "face",
    avg: [ 5.04, 6.20 ], std: [ 2.18, 1.46 ], fq: 50 
  },
  "feeds": {
    dict: "happiness", word: "feeds", stem: "feed", anew: "eat",
    avg: [ 5.69, 6.20 ], std: [ 2.51, 1.47 ], fq: 50 
  },
  "halo": {
    dict: "happiness", word: "halo", stem: "halo", anew: "glory",
    avg: [ 6.02, 6.20 ], std: [ 2.71, 1.81 ], fq: 50 
  },
  "jacket": {
    dict: "happiness", word: "jacket", stem: "jacket", anew: "crown",
    avg: [ 4.28, 6.20 ], std: [ 2.53, 1.12 ], fq: 50 
  },
  "joining": {
    dict: "happiness", word: "joining", stem: "join", anew: "unit",
    avg: [ 3.75, 6.20 ], std: [ 2.49, 1.11 ], fq: 50 
  },
  "lifted": {
    dict: "happiness", word: "lifted", stem: "lift", anew: "pinch",
    avg: [ 4.59, 6.20 ], std: [ 2.10, 1.23 ], fq: 50 
  },
  "listened": {
    dict: "happiness", word: "listened", stem: "listen", anew: "mind",
    avg: [ 5.00, 6.20 ], std: [ 2.68, 1.28 ], fq: 50 
  },
  "meat": {
    dict: "happiness", word: "meat", stem: "meat", anew: "heart",
    avg: [ 6.34, 6.20 ], std: [ 2.25, 2.14 ], fq: 50 
  },
  "nurse": {
    dict: "happiness", word: "nurse", stem: "nurs", anew: "nurse",
    avg: [ 4.84, 6.20 ], std: [ 2.04, 1.26 ], fq: 50 
  },
  "sexual": {
    dict: "happiness", word: "sexual", stem: "sexual", anew: "intimate",
    avg: [ 6.98, 6.20 ], std: [ 2.21, 1.46 ], fq: 50 
  },
  "succession": {
    dict: "happiness", word: "succession", stem: "success", anew: "success",
    avg: [ 6.11, 6.20 ], std: [ 2.65, 1.29 ], fq: 50 
  },
  "supporters": {
    dict: "happiness", word: "supporters", stem: "support", anew: "champion",
    avg: [ 5.85, 6.20 ], std: [ 3.15, 1.58 ], fq: 50 
  },
  "think": {
    dict: "happiness", word: "think", stem: "think", anew: "imagine",
    avg: [ 5.98, 6.20 ], std: [ 2.14, 1.29 ], fq: 50 
  },
  "copper": {
    dict: "happiness", word: "copper", stem: "copper", anew: "pig",
    avg: [ 4.20, 6.18 ], std: [ 2.42, 1.60 ], fq: 50 
  },
  "ate": {
    dict: "happiness", word: "ate", stem: "ate", anew: "eat",
    avg: [ 5.69, 6.18 ], std: [ 2.51, 1.45 ], fq: 50 
  },
  "blonde": {
    dict: "happiness", word: "blonde", stem: "blond", anew: "blond",
    avg: [ 5.07, 6.18 ], std: [ 2.70, 1.60 ], fq: 50 
  },
  "burger": {
    dict: "happiness", word: "burger", stem: "burger", anew: "hamburger",
    avg: [ 4.55, 6.18 ], std: [ 2.14, 2.30 ], fq: 50 
  },
  "certificate": {
    dict: "happiness", word: "certificate", stem: "certif", anew: "secure",
    avg: [ 3.14, 6.18 ], std: [ 2.47, 1.14 ], fq: 50 
  },
  "chances": {
    dict: "happiness", word: "chances", stem: "chanc", anew: "chance",
    avg: [ 5.38, 6.18 ], std: [ 2.58, 1.04 ], fq: 50 
  },
  "chief": {
    dict: "happiness", word: "chief", stem: "chief", anew: "masterful",
    avg: [ 5.20, 6.18 ], std: [ 2.85, 1.16 ], fq: 50 
  },
  "established": {
    dict: "happiness", word: "established", stem: "establish", anew: "nature",
    avg: [ 4.37, 6.18 ], std: [ 2.51, 1.17 ], fq: 50 
  },
  "expression": {
    dict: "happiness", word: "expression", stem: "express", anew: "face",
    avg: [ 5.04, 6.18 ], std: [ 2.18, 1.30 ], fq: 50 
  },
  "fishing": {
    dict: "happiness", word: "fishing", stem: "fish", anew: "fish",
    avg: [ 4.00, 6.18 ], std: [ 2.19, 1.83 ], fq: 50 
  },
  "king": {
    dict: "happiness", word: "king", stem: "king", anew: "king",
    avg: [ 5.51, 6.18 ], std: [ 2.77, 1.56 ], fq: 50 
  },
  "land": {
    dict: "happiness", word: "land", stem: "land", anew: "earth",
    avg: [ 4.24, 6.18 ], std: [ 2.49, 1.34 ], fq: 50 
  },
  "lion": {
    dict: "happiness", word: "lion", stem: "lion", anew: "lion",
    avg: [ 6.20, 6.18 ], std: [ 2.16, 1.61 ], fq: 50 
  },
  "resolution": {
    dict: "happiness", word: "resolution", stem: "resolut", anew: "answer",
    avg: [ 5.41, 6.18 ], std: [ 2.43, 1.29 ], fq: 50 
  },
  "riding": {
    dict: "happiness", word: "riding", stem: "ride", anew: "free",
    avg: [ 5.15, 6.18 ], std: [ 3.04, 1.40 ], fq: 50 
  },
  "safety": {
    dict: "happiness", word: "safety", stem: "safeti", anew: "safe",
    avg: [ 3.86, 6.18 ], std: [ 2.72, 1.73 ], fq: 50 
  },
  "sight": {
    dict: "happiness", word: "sight", stem: "sight", anew: "mountain",
    avg: [ 5.49, 6.18 ], std: [ 2.43, 0.98 ], fq: 50 
  },
  "spice": {
    dict: "happiness", word: "spice", stem: "spice", anew: "zest",
    avg: [ 5.59, 6.18 ], std: [ 2.66, 1.72 ], fq: 50 
  },
  "steady": {
    dict: "happiness", word: "steady", stem: "steadi", anew: "sweetheart",
    avg: [ 5.50, 6.18 ], std: [ 2.73, 1.34 ], fq: 50 
  },
  "trains": {
    dict: "happiness", word: "trains", stem: "train", anew: "education",
    avg: [ 5.74, 6.18 ], std: [ 2.46, 1.32 ], fq: 50 
  },
  "tune": {
    dict: "happiness", word: "tune", stem: "tune", anew: "tune",
    avg: [ 4.71, 6.18 ], std: [ 2.09, 1.42 ], fq: 50 
  },
  "victor": {
    dict: "happiness", word: "victor", stem: "victor", anew: "masterful",
    avg: [ 5.20, 6.18 ], std: [ 2.85, 1.72 ], fq: 50 
  },
  "wireless": {
    dict: "happiness", word: "wireless", stem: "wireless", anew: "radio",
    avg: [ 4.78, 6.18 ], std: [ 2.82, 1.60 ], fq: 50 
  },
  "beds": {
    dict: "happiness", word: "beds", stem: "bed", anew: "bed",
    avg: [ 3.61, 6.17 ], std: [ 2.56, 1.72 ], fq: 50 
  },
  "preference": {
    dict: "happiness", word: "preference", stem: "prefer", anew: "taste",
    avg: [ 5.22, 6.17 ], std: [ 2.38, 1.00 ], fq: 50 
  },
  "applying": {
    dict: "happiness", word: "applying", stem: "appli", anew: "employment",
    avg: [ 5.28, 6.16 ], std: [ 2.12, 1.16 ], fq: 50 
  },
  "crop": {
    dict: "happiness", word: "crop", stem: "crop", anew: "dress",
    avg: [ 4.05, 6.16 ], std: [ 1.89, 1.25 ], fq: 50 
  },
  "allowing": {
    dict: "happiness", word: "allowing", stem: "allow", anew: "reserved",
    avg: [ 3.27, 6.16 ], std: [ 2.05, 1.09 ], fq: 50 
  },
  "automobile": {
    dict: "happiness", word: "automobile", stem: "automobil", anew: "machine",
    avg: [ 3.82, 6.16 ], std: [ 2.40, 1.38 ], fq: 50 
  },
  "bands": {
    dict: "happiness", word: "bands", stem: "band", anew: "circle",
    avg: [ 3.86, 6.16 ], std: [ 2.13, 1.46 ], fq: 50 
  },
  "boys": {
    dict: "happiness", word: "boys", stem: "boy", anew: "boy",
    avg: [ 4.58, 6.16 ], std: [ 2.37, 1.23 ], fq: 50 
  },
  "engaged": {
    dict: "happiness", word: "engaged", stem: "engag", anew: "engaged",
    avg: [ 6.77, 6.16 ], std: [ 2.07, 1.96 ], fq: 50 
  },
  "fiction": {
    dict: "happiness", word: "fiction", stem: "fiction", anew: "fabric",
    avg: [ 4.14, 6.16 ], std: [ 1.98, 1.43 ], fq: 50 
  },
  "grocery": {
    dict: "happiness", word: "grocery", stem: "groceri", anew: "market",
    avg: [ 4.12, 6.16 ], std: [ 1.83, 1.73 ], fq: 50 
  },
  "hotel": {
    dict: "happiness", word: "hotel", stem: "hotel", anew: "hotel",
    avg: [ 4.80, 6.16 ], std: [ 2.53, 1.60 ], fq: 50 
  },
  "houses": {
    dict: "happiness", word: "houses", stem: "hous", anew: "house",
    avg: [ 4.56, 6.16 ], std: [ 2.41, 1.63 ], fq: 50 
  },
  "minds": {
    dict: "happiness", word: "minds", stem: "mind", anew: "mind",
    avg: [ 5.00, 6.16 ], std: [ 2.68, 1.23 ], fq: 50 
  },
  "people": {
    dict: "happiness", word: "people", stem: "peopl", anew: "people",
    avg: [ 5.94, 6.16 ], std: [ 2.09, 1.58 ], fq: 50 
  },
  "polish": {
    dict: "happiness", word: "polish", stem: "polish", anew: "smooth",
    avg: [ 4.91, 6.16 ], std: [ 2.57, 1.39 ], fq: 50 
  },
  "rocked": {
    dict: "happiness", word: "rocked", stem: "rock", anew: "rock",
    avg: [ 4.52, 6.16 ], std: [ 2.37, 1.45 ], fq: 50 
  },
  "transportation": {
    dict: "happiness", word: "transportation", stem: "transport", anew: "ship",
    avg: [ 4.38, 6.16 ], std: [ 2.29, 1.68 ], fq: 50 
  },
  "turkey": {
    dict: "happiness", word: "turkey", stem: "turkey", anew: "bomb",
    avg: [ 7.15, 6.16 ], std: [ 2.40, 1.81 ], fq: 50 
  },
  "wed": {
    dict: "happiness", word: "wed", stem: "wed", anew: "wedding",
    avg: [ 5.97, 6.16 ], std: [ 2.85, 1.82 ], fq: 50 
  },
  "yacht": {
    dict: "happiness", word: "yacht", stem: "yacht", anew: "yacht",
    avg: [ 5.61, 6.16 ], std: [ 2.72, 1.36 ], fq: 50 
  },
  "believing": {
    dict: "happiness", word: "believing", stem: "believ", anew: "trust",
    avg: [ 5.30, 6.14 ], std: [ 2.66, 1.53 ], fq: 50 
  },
  "persons": {
    dict: "happiness", word: "persons", stem: "person", anew: "person",
    avg: [ 4.19, 6.14 ], std: [ 2.45, 1.27 ], fq: 50 
  },
  "seed": {
    dict: "happiness", word: "seed", stem: "seed", anew: "germs",
    avg: [ 4.49, 6.14 ], std: [ 2.24, 1.38 ], fq: 50 
  },
  "successive": {
    dict: "happiness", word: "successive", stem: "success", anew: "success",
    avg: [ 6.11, 6.14 ], std: [ 2.65, 1.41 ], fq: 50 
  },
  "adult": {
    dict: "happiness", word: "adult", stem: "adult", anew: "adult",
    avg: [ 4.76, 6.14 ], std: [ 1.95, 1.34 ], fq: 50 
  },
  "aviation": {
    dict: "happiness", word: "aviation", stem: "aviat", anew: "air",
    avg: [ 4.12, 6.14 ], std: [ 2.30, 1.34 ], fq: 50 
  },
  "cheek": {
    dict: "happiness", word: "cheek", stem: "cheek", anew: "bold",
    avg: [ 5.60, 6.14 ], std: [ 2.21, 1.59 ], fq: 50 
  },
  "conscious": {
    dict: "happiness", word: "conscious", stem: "consciou", anew: "wit",
    avg: [ 5.42, 6.14 ], std: [ 2.44, 1.39 ], fq: 50 
  },
  "drinking": {
    dict: "happiness", word: "drinking", stem: "drink", anew: "salute",
    avg: [ 5.31, 6.14 ], std: [ 2.23, 1.71 ], fq: 50 
  },
  "eye": {
    dict: "happiness", word: "eye", stem: "eye", anew: "heart",
    avg: [ 6.34, 6.14 ], std: [ 2.25, 1.43 ], fq: 50 
  },
  "generate": {
    dict: "happiness", word: "generate", stem: "gener", anew: "father",
    avg: [ 5.92, 6.14 ], std: [ 2.60, 1.16 ], fq: 50 
  },
  "jumping": {
    dict: "happiness", word: "jumping", stem: "jump", anew: "spring",
    avg: [ 5.67, 6.14 ], std: [ 2.51, 1.58 ], fq: 50 
  },
  "kindle": {
    dict: "happiness", word: "kindle", stem: "kindl", anew: "fire",
    avg: [ 7.17, 6.14 ], std: [ 2.06, 1.25 ], fq: 50 
  },
  "mend": {
    dict: "happiness", word: "mend", stem: "mend", anew: "doctor",
    avg: [ 5.86, 6.14 ], std: [ 2.70, 1.21 ], fq: 50 
  },
  "models": {
    dict: "happiness", word: "models", stem: "model", anew: "mold",
    avg: [ 4.07, 6.14 ], std: [ 1.98, 1.58 ], fq: 50 
  },
  "offered": {
    dict: "happiness", word: "offered", stem: "offer", anew: "tender",
    avg: [ 4.88, 6.14 ], std: [ 2.30, 1.40 ], fq: 50 
  },
  "places": {
    dict: "happiness", word: "places", stem: "place", anew: "seat",
    avg: [ 2.95, 6.14 ], std: [ 1.72, 1.16 ], fq: 50 
  },
  "respectively": {
    dict: "happiness", word: "respectively", stem: "respect", anew: "respectful",
    avg: [ 4.60, 6.14 ], std: [ 2.67, 1.21 ], fq: 50 
  },
  "restore": {
    dict: "happiness", word: "restore", stem: "restor", anew: "doctor",
    avg: [ 5.86, 6.14 ], std: [ 2.70, 1.16 ], fq: 50 
  },
  "ride": {
    dict: "happiness", word: "ride", stem: "ride", anew: "tease",
    avg: [ 5.87, 6.14 ], std: [ 2.56, 1.39 ], fq: 50 
  },
  "rock": {
    dict: "happiness", word: "rock", stem: "rock", anew: "rock",
    avg: [ 4.52, 6.14 ], std: [ 2.37, 1.29 ], fq: 50 
  },
  "strongly": {
    dict: "happiness", word: "strongly", stem: "strongli", anew: "powerful",
    avg: [ 5.83, 6.14 ], std: [ 2.69, 1.28 ], fq: 50 
  },
  "trail": {
    dict: "happiness", word: "trail", stem: "trail", anew: "dog",
    avg: [ 5.76, 6.14 ], std: [ 2.50, 1.14 ], fq: 50 
  },
  "twin": {
    dict: "happiness", word: "twin", stem: "twin", anew: "couple",
    avg: [ 6.39, 6.14 ], std: [ 2.31, 1.29 ], fq: 50 
  },
  "vagina": {
    dict: "happiness", word: "vagina", stem: "vagina", anew: "vagina",
    avg: [ 5.55, 6.14 ], std: [ 2.55, 1.81 ], fq: 50 
  },
  "exclusively": {
    dict: "happiness", word: "exclusively", stem: "exclus", anew: "alone",
    avg: [ 4.83, 6.12 ], std: [ 2.66, 1.44 ], fq: 50 
  },
  "writings": {
    dict: "happiness", word: "writings", stem: "write", anew: "save",
    avg: [ 4.95, 6.12 ], std: [ 2.19, 1.70 ], fq: 50 
  },
  "outcomes": {
    dict: "happiness", word: "outcomes", stem: "outcom", anew: "event",
    avg: [ 5.10, 6.12 ], std: [ 2.40, 1.44 ], fq: 50 
  },
  "quicker": {
    dict: "happiness", word: "quicker", stem: "quicker", anew: "agility",
    avg: [ 4.85, 6.12 ], std: [ 1.80, 1.15 ], fq: 50 
  },
  "boulevard": {
    dict: "happiness", word: "boulevard", stem: "boulevard", anew: "avenue",
    avg: [ 4.12, 6.12 ], std: [ 2.01, 1.26 ], fq: 50 
  },
  "consideration": {
    dict: "happiness", word: "consideration", stem: "consider", anew: "thoughtful",
    avg: [ 5.72, 6.12 ], std: [ 2.30, 1.27 ], fq: 50 
  },
  "dish": {
    dict: "happiness", word: "dish", stem: "dish", anew: "sweetheart",
    avg: [ 5.50, 6.12 ], std: [ 2.73, 1.41 ], fq: 50 
  },
  "ensure": {
    dict: "happiness", word: "ensure", stem: "ensur", anew: "controlling",
    avg: [ 6.10, 6.12 ], std: [ 2.19, 1.36 ], fq: 50 
  },
  "event": {
    dict: "happiness", word: "event", stem: "event", anew: "event",
    avg: [ 5.10, 6.12 ], std: [ 2.40, 1.65 ], fq: 50 
  },
  "face": {
    dict: "happiness", word: "face", stem: "face", anew: "face",
    avg: [ 5.04, 6.12 ], std: [ 2.18, 1.17 ], fq: 50 
  },
  "focus": {
    dict: "happiness", word: "focus", stem: "focu", anew: "concentrate",
    avg: [ 4.65, 6.12 ], std: [ 2.13, 1.06 ], fq: 50 
  },
  "investing": {
    dict: "happiness", word: "investing", stem: "invest", anew: "invest",
    avg: [ 5.12, 6.12 ], std: [ 2.42, 1.55 ], fq: 50 
  },
  "knows": {
    dict: "happiness", word: "knows", stem: "know", anew: "loved",
    avg: [ 6.38, 6.12 ], std: [ 2.68, 0.90 ], fq: 50 
  },
  "masters": {
    dict: "happiness", word: "masters", stem: "master", anew: "masterful",
    avg: [ 5.20, 6.12 ], std: [ 2.85, 1.33 ], fq: 50 
  },
  "nursing": {
    dict: "happiness", word: "nursing", stem: "nurs", anew: "nurse",
    avg: [ 4.84, 6.12 ], std: [ 2.04, 1.47 ], fq: 50 
  },
  "patiently": {
    dict: "happiness", word: "patiently", stem: "patient", anew: "patient",
    avg: [ 4.21, 6.12 ], std: [ 2.37, 1.51 ], fq: 50 
  },
  "snowing": {
    dict: "happiness", word: "snowing", stem: "snow", anew: "snow",
    avg: [ 5.75, 6.12 ], std: [ 2.47, 2.16 ], fq: 50 
  },
  "studied": {
    dict: "happiness", word: "studied", stem: "studi", anew: "learn",
    avg: [ 5.39, 6.12 ], std: [ 2.22, 1.30 ], fq: 50 
  },
  "study": {
    dict: "happiness", word: "study", stem: "studi", anew: "field",
    avg: [ 4.08, 6.12 ], std: [ 2.41, 1.62 ], fq: 50 
  },
  "theme": {
    dict: "happiness", word: "theme", stem: "theme", anew: "idea",
    avg: [ 5.86, 6.12 ], std: [ 1.81, 1.17 ], fq: 50 
  },
  "treasurer": {
    dict: "happiness", word: "treasurer", stem: "treasur", anew: "treasure",
    avg: [ 6.75, 6.12 ], std: [ 2.30, 1.52 ], fq: 50 
  },
  "nearer": {
    dict: "happiness", word: "nearer", stem: "nearer", anew: "good",
    avg: [ 5.43, 6.10 ], std: [ 2.85, 1.18 ], fq: 50 
  },
  "nurses": {
    dict: "happiness", word: "nurses", stem: "nurs", anew: "nurse",
    avg: [ 4.84, 6.10 ], std: [ 2.04, 1.92 ], fq: 50 
  },
  "preserved": {
    dict: "happiness", word: "preserved", stem: "preserv", anew: "save",
    avg: [ 4.95, 6.10 ], std: [ 2.19, 1.40 ], fq: 50 
  },
  "senses": {
    dict: "happiness", word: "senses", stem: "sens", anew: "grass",
    avg: [ 4.14, 6.10 ], std: [ 2.11, 1.49 ], fq: 50 
  },
  "cattle": {
    dict: "happiness", word: "cattle", stem: "cattl", anew: "cow",
    avg: [ 3.49, 6.10 ], std: [ 2.13, 1.39 ], fq: 50 
  },
  "check": {
    dict: "happiness", word: "check", stem: "check", anew: "controlling",
    avg: [ 6.10, 6.10 ], std: [ 2.19, 1.53 ], fq: 50 
  },
  "customers": {
    dict: "happiness", word: "customers", stem: "custom", anew: "custom",
    avg: [ 4.66, 6.10 ], std: [ 2.12, 1.09 ], fq: 50 
  },
  "essence": {
    dict: "happiness", word: "essence", stem: "essenc", anew: "burdened",
    avg: [ 5.63, 6.10 ], std: [ 2.07, 1.15 ], fq: 50 
  },
  "increasingly": {
    dict: "happiness", word: "increasingly", stem: "increasingli", anew: "progress",
    avg: [ 6.02, 6.10 ], std: [ 2.58, 1.34 ], fq: 50 
  },
  "investments": {
    dict: "happiness", word: "investments", stem: "invest", anew: "invest",
    avg: [ 5.12, 6.10 ], std: [ 2.42, 1.67 ], fq: 50 
  },
  "keeping": {
    dict: "happiness", word: "keeping", stem: "keep", anew: "save",
    avg: [ 4.95, 6.10 ], std: [ 2.19, 1.11 ], fq: 50 
  },
  "know": {
    dict: "happiness", word: "know", stem: "know", anew: "loved",
    avg: [ 6.38, 6.10 ], std: [ 2.68, 1.39 ], fq: 50 
  },
  "markets": {
    dict: "happiness", word: "markets", stem: "market", anew: "market",
    avg: [ 4.12, 6.10 ], std: [ 1.83, 1.17 ], fq: 50 
  },
  "moments": {
    dict: "happiness", word: "moments", stem: "moment", anew: "moment",
    avg: [ 3.83, 6.10 ], std: [ 2.29, 1.11 ], fq: 50 
  },
  "open": {
    dict: "happiness", word: "open", stem: "open", anew: "outdoors",
    avg: [ 5.92, 6.10 ], std: [ 2.55, 1.36 ], fq: 50 
  },
  "release": {
    dict: "happiness", word: "release", stem: "releas", anew: "fire",
    avg: [ 7.17, 6.10 ], std: [ 2.06, 1.23 ], fq: 50 
  },
  "security": {
    dict: "happiness", word: "security", stem: "secur", anew: "secure",
    avg: [ 3.14, 6.10 ], std: [ 2.47, 1.63 ], fq: 50 
  },
  "shade": {
    dict: "happiness", word: "shade", stem: "shade", anew: "shadow",
    avg: [ 4.30, 6.10 ], std: [ 2.26, 1.68 ], fq: 50 
  },
  "start": {
    dict: "happiness", word: "start", stem: "start", anew: "part",
    avg: [ 3.82, 6.10 ], std: [ 2.24, 1.54 ], fq: 50 
  },
  "window": {
    dict: "happiness", word: "window", stem: "window", anew: "window",
    avg: [ 3.97, 6.10 ], std: [ 2.01, 1.45 ], fq: 50 
  },
  "dawning": {
    dict: "happiness", word: "dawning", stem: "dawn", anew: "dawn",
    avg: [ 4.39, 6.08 ], std: [ 2.81, 1.44 ], fq: 50 
  },
  "crops": {
    dict: "happiness", word: "crops", stem: "crop", anew: "dress",
    avg: [ 4.05, 6.08 ], std: [ 1.89, 1.61 ], fq: 50 
  },
  "throne": {
    dict: "happiness", word: "throne", stem: "throne", anew: "stool",
    avg: [ 4.00, 6.08 ], std: [ 2.14, 2.11 ], fq: 50 
  },
  "acquainted": {
    dict: "happiness", word: "acquainted", stem: "acquaint", anew: "present",
    avg: [ 5.12, 6.08 ], std: [ 2.39, 1.55 ], fq: 50 
  },
  "ball": {
    dict: "happiness", word: "ball", stem: "ball", anew: "egg",
    avg: [ 3.76, 6.08 ], std: [ 2.39, 1.23 ], fq: 50 
  },
  "belief": {
    dict: "happiness", word: "belief", stem: "belief", anew: "opinion",
    avg: [ 4.89, 6.08 ], std: [ 2.46, 1.44 ], fq: 50 
  },
  "boots": {
    dict: "happiness", word: "boots", stem: "boot", anew: "thrill",
    avg: [ 8.02, 6.08 ], std: [ 1.65, 1.37 ], fq: 50 
  },
  "coat": {
    dict: "happiness", word: "coat", stem: "coat", anew: "cake",
    avg: [ 5.00, 6.08 ], std: [ 2.37, 1.24 ], fq: 50 
  },
  "grown": {
    dict: "happiness", word: "grown", stem: "grown", anew: "farm",
    avg: [ 3.90, 6.08 ], std: [ 1.95, 1.24 ], fq: 50 
  },
  "housing": {
    dict: "happiness", word: "housing", stem: "hous", anew: "house",
    avg: [ 4.56, 6.08 ], std: [ 2.41, 1.44 ], fq: 50 
  },
  "instant": {
    dict: "happiness", word: "instant", stem: "instant", anew: "wink",
    avg: [ 5.44, 6.08 ], std: [ 2.68, 1.12 ], fq: 50 
  },
  "introduction": {
    dict: "happiness", word: "introduction", stem: "introduct", anew: "present",
    avg: [ 5.12, 6.08 ], std: [ 2.39, 1.01 ], fq: 50 
  },
  "message": {
    dict: "happiness", word: "message", stem: "messag", anew: "contents",
    avg: [ 4.32, 6.08 ], std: [ 2.14, 1.12 ], fq: 50 
  },
  "picked": {
    dict: "happiness", word: "picked", stem: "pick", anew: "foot",
    avg: [ 3.27, 6.08 ], std: [ 1.98, 1.21 ], fq: 50 
  },
  "reached": {
    dict: "happiness", word: "reached", stem: "reach", anew: "hit",
    avg: [ 5.73, 6.08 ], std: [ 2.09, 1.26 ], fq: 50 
  },
  "recognize": {
    dict: "happiness", word: "recognize", stem: "recogn", anew: "greet",
    avg: [ 5.27, 6.08 ], std: [ 2.31, 1.41 ], fq: 50 
  },
  "recognized": {
    dict: "happiness", word: "recognized", stem: "recogn", anew: "acceptance",
    avg: [ 5.40, 6.08 ], std: [ 2.70, 1.31 ], fq: 50 
  },
  "shows": {
    dict: "happiness", word: "shows", stem: "show", anew: "present",
    avg: [ 5.12, 6.08 ], std: [ 2.39, 1.05 ], fq: 50 
  },
  "superior": {
    dict: "happiness", word: "superior", stem: "superior", anew: "masterful",
    avg: [ 5.20, 6.08 ], std: [ 2.85, 1.52 ], fq: 50 
  },
  "vehicle": {
    dict: "happiness", word: "vehicle", stem: "vehicl", anew: "vehicle",
    avg: [ 4.63, 6.08 ], std: [ 2.81, 1.45 ], fq: 50 
  },
  "theories": {
    dict: "happiness", word: "theories", stem: "theori", anew: "theory",
    avg: [ 4.62, 6.06 ], std: [ 1.94, 1.45 ], fq: 50 
  },
  "fluid": {
    dict: "happiness", word: "fluid", stem: "fluid", anew: "smooth",
    avg: [ 4.91, 6.06 ], std: [ 2.57, 1.23 ], fq: 50 
  },
  "shells": {
    dict: "happiness", word: "shells", stem: "shell", anew: "crushed",
    avg: [ 5.52, 6.06 ], std: [ 2.87, 1.51 ], fq: 50 
  },
  "adults": {
    dict: "happiness", word: "adults", stem: "adult", anew: "adult",
    avg: [ 4.76, 6.06 ], std: [ 1.95, 1.30 ], fq: 50 
  },
  "composition": {
    dict: "happiness", word: "composition", stem: "composit", anew: "paper",
    avg: [ 2.50, 6.06 ], std: [ 1.85, 1.19 ], fq: 50 
  },
  "dimes": {
    dict: "happiness", word: "dimes", stem: "dime", anew: "blind",
    avg: [ 4.39, 6.06 ], std: [ 2.36, 1.22 ], fq: 50 
  },
  "harbor": {
    dict: "happiness", word: "harbor", stem: "harbor", anew: "nurse",
    avg: [ 4.84, 6.06 ], std: [ 2.04, 1.45 ], fq: 50 
  },
  "influences": {
    dict: "happiness", word: "influences", stem: "influenc", anew: "charm",
    avg: [ 5.16, 6.06 ], std: [ 2.25, 1.22 ], fq: 50 
  },
  "instruments": {
    dict: "happiness", word: "instruments", stem: "instrument", anew: "tool",
    avg: [ 4.33, 6.06 ], std: [ 1.78, 1.71 ], fq: 50 
  },
  "leads": {
    dict: "happiness", word: "leads", stem: "lead", anew: "chair",
    avg: [ 3.15, 6.06 ], std: [ 1.77, 1.10 ], fq: 50 
  },
  "muscle": {
    dict: "happiness", word: "muscle", stem: "muscl", anew: "muscular",
    avg: [ 5.47, 6.06 ], std: [ 2.20, 1.33 ], fq: 50 
  },
  "personal": {
    dict: "happiness", word: "personal", stem: "person", anew: "person",
    avg: [ 4.19, 6.06 ], std: [ 2.45, 1.22 ], fq: 50 
  },
  "preparation": {
    dict: "happiness", word: "preparation", stem: "prepar", anew: "cook",
    avg: [ 4.44, 6.06 ], std: [ 1.96, 1.36 ], fq: 50 
  },
  "reflection": {
    dict: "happiness", word: "reflection", stem: "reflect", anew: "thoughtful",
    avg: [ 5.72, 6.06 ], std: [ 2.30, 1.39 ], fq: 50 
  },
  "respective": {
    dict: "happiness", word: "respective", stem: "respect", anew: "respectful",
    avg: [ 4.60, 6.06 ], std: [ 2.67, 1.32 ], fq: 50 
  },
  "see": {
    dict: "happiness", word: "see", stem: "see", anew: "controlling",
    avg: [ 6.10, 6.06 ], std: [ 2.19, 1.06 ], fq: 50 
  },
  "servings": {
    dict: "happiness", word: "servings", stem: "serv", anew: "answer",
    avg: [ 5.41, 6.06 ], std: [ 2.43, 1.41 ], fq: 50 
  },
  "sports": {
    dict: "happiness", word: "sports", stem: "sport", anew: "mutation",
    avg: [ 4.84, 6.06 ], std: [ 2.52, 2.24 ], fq: 50 
  },
  "starring": {
    dict: "happiness", word: "starring", stem: "star", anew: "star",
    avg: [ 5.83, 6.06 ], std: [ 2.44, 1.30 ], fq: 50 
  },
  "straight": {
    dict: "happiness", word: "straight", stem: "straight", anew: "square",
    avg: [ 3.18, 6.06 ], std: [ 1.76, 1.06 ], fq: 50 
  },
  "skirt": {
    dict: "happiness", word: "skirt", stem: "skirt", anew: "doll",
    avg: [ 4.24, 6.04 ], std: [ 2.43, 2.07 ], fq: 50 
  },
  "acquired": {
    dict: "happiness", word: "acquired", stem: "acquir", anew: "win",
    avg: [ 7.72, 6.04 ], std: [ 2.16, 1.51 ], fq: 50 
  },
  "alumni": {
    dict: "happiness", word: "alumni", stem: "alumni", anew: "graduate",
    avg: [ 7.25, 6.04 ], std: [ 2.25, 1.03 ], fq: 50 
  },
  "casino": {
    dict: "happiness", word: "casino", stem: "casino", anew: "casino",
    avg: [ 6.51, 6.04 ], std: [ 2.12, 2.04 ], fq: 50 
  },
  "choices": {
    dict: "happiness", word: "choices", stem: "choic", anew: "option",
    avg: [ 4.74, 6.04 ], std: [ 2.23, 1.44 ], fq: 50 
  },
  "folks": {
    dict: "happiness", word: "folks", stem: "folk", anew: "family",
    avg: [ 4.80, 6.04 ], std: [ 2.71, 1.35 ], fq: 50 
  },
  "hint": {
    dict: "happiness", word: "hint", stem: "hint", anew: "pinch",
    avg: [ 4.59, 6.04 ], std: [ 2.10, 1.59 ], fq: 50 
  },
  "mind": {
    dict: "happiness", word: "mind", stem: "mind", anew: "mind",
    avg: [ 5.00, 6.04 ], std: [ 2.68, 1.28 ], fq: 50 
  },
  "points": {
    dict: "happiness", word: "points", stem: "point", anew: "detail",
    avg: [ 4.10, 6.04 ], std: [ 2.24, 1.47 ], fq: 50 
  },
  "prevention": {
    dict: "happiness", word: "prevention", stem: "prevent", anew: "bar",
    avg: [ 5.00, 6.04 ], std: [ 2.83, 1.23 ], fq: 50 
  },
  "prospects": {
    dict: "happiness", word: "prospects", stem: "prospect", anew: "chance",
    avg: [ 5.38, 6.04 ], std: [ 2.58, 1.07 ], fq: 50 
  },
  "purpose": {
    dict: "happiness", word: "purpose", stem: "purpos", anew: "useful",
    avg: [ 4.26, 6.04 ], std: [ 2.47, 1.16 ], fq: 50 
  },
  "replied": {
    dict: "happiness", word: "replied", stem: "repli", anew: "answer",
    avg: [ 5.41, 6.04 ], std: [ 2.43, 0.97 ], fq: 50 
  },
  "signing": {
    dict: "happiness", word: "signing", stem: "sign", anew: "bless",
    avg: [ 4.05, 6.04 ], std: [ 2.59, 1.48 ], fq: 50 
  },
  "tops": {
    dict: "happiness", word: "tops", stem: "top", anew: "crown",
    avg: [ 4.28, 6.04 ], std: [ 2.53, 1.09 ], fq: 50 
  },
  "transport": {
    dict: "happiness", word: "transport", stem: "transport", anew: "ecstasy",
    avg: [ 7.38, 6.04 ], std: [ 1.92, 1.29 ], fq: 50 
  },
  "union": {
    dict: "happiness", word: "union", stem: "union", anew: "unit",
    avg: [ 3.75, 6.04 ], std: [ 2.49, 1.40 ], fq: 50 
  },
  "vocal": {
    dict: "happiness", word: "vocal", stem: "vocal", anew: "song",
    avg: [ 6.07, 6.04 ], std: [ 2.42, 1.55 ], fq: 50 
  },
  "words": {
    dict: "happiness", word: "words", stem: "word", anew: "news",
    avg: [ 5.17, 6.04 ], std: [ 2.11, 1.19 ], fq: 50 
  },
  "beings": {
    dict: "happiness", word: "beings", stem: "be", anew: "lively",
    avg: [ 5.53, 6.02 ], std: [ 2.90, 1.25 ], fq: 50 
  },
  "colored": {
    dict: "happiness", word: "colored", stem: "color", anew: "color",
    avg: [ 4.73, 6.02 ], std: [ 2.64, 1.74 ], fq: 50 
  },
  "considerations": {
    dict: "happiness", word: "considerations", stem: "consider", anew: "thoughtful",
    avg: [ 5.72, 6.02 ], std: [ 2.30, 1.41 ], fq: 50 
  },
  "nearest": {
    dict: "happiness", word: "nearest", stem: "nearest", anew: "good",
    avg: [ 5.43, 6.02 ], std: [ 2.85, 1.25 ], fq: 50 
  },
  "basket": {
    dict: "happiness", word: "basket", stem: "basket", anew: "basket",
    avg: [ 3.63, 6.02 ], std: [ 2.02, 1.08 ], fq: 50 
  },
  "cards": {
    dict: "happiness", word: "cards", stem: "card", anew: "wit",
    avg: [ 5.42, 6.02 ], std: [ 2.44, 1.30 ], fq: 50 
  },
  "celebrity": {
    dict: "happiness", word: "celebrity", stem: "celebr", anew: "fame",
    avg: [ 6.55, 6.02 ], std: [ 2.46, 1.71 ], fq: 50 
  },
  "content": {
    dict: "happiness", word: "content", stem: "content", anew: "contents",
    avg: [ 4.32, 6.02 ], std: [ 2.14, 1.62 ], fq: 50 
  },
  "delivery": {
    dict: "happiness", word: "delivery", stem: "deliveri", anew: "rescue",
    avg: [ 6.53, 6.02 ], std: [ 2.56, 1.44 ], fq: 50 
  },
  "developing": {
    dict: "happiness", word: "developing", stem: "develop", anew: "education",
    avg: [ 5.74, 6.02 ], std: [ 2.46, 1.10 ], fq: 50 
  },
  "doll": {
    dict: "happiness", word: "doll", stem: "doll", anew: "doll",
    avg: [ 4.24, 6.02 ], std: [ 2.43, 1.94 ], fq: 50 
  },
  "eggs": {
    dict: "happiness", word: "eggs", stem: "egg", anew: "egg",
    avg: [ 3.76, 6.02 ], std: [ 2.39, 1.99 ], fq: 50 
  },
  "engineers": {
    dict: "happiness", word: "engineers", stem: "engin", anew: "engine",
    avg: [ 3.98, 6.02 ], std: [ 2.33, 1.13 ], fq: 50 
  },
  "fixed": {
    dict: "happiness", word: "fixed", stem: "fix", anew: "secure",
    avg: [ 3.14, 6.02 ], std: [ 2.47, 1.06 ], fq: 50 
  },
  "jam": {
    dict: "happiness", word: "jam", stem: "jam", anew: "crushed",
    avg: [ 5.52, 6.02 ], std: [ 2.87, 2.03 ], fq: 50 
  },
  "male": {
    dict: "happiness", word: "male", stem: "male", anew: "man",
    avg: [ 5.24, 6.02 ], std: [ 2.31, 1.36 ], fq: 50 
  },
  "newspapers": {
    dict: "happiness", word: "newspapers", stem: "newspap", anew: "paper",
    avg: [ 2.50, 6.02 ], std: [ 1.85, 1.46 ], fq: 50 
  },
  "quick": {
    dict: "happiness", word: "quick", stem: "quick", anew: "quick",
    avg: [ 6.57, 6.02 ], std: [ 1.78, 1.63 ], fq: 50 
  },
  "records": {
    dict: "happiness", word: "records", stem: "record", anew: "memory",
    avg: [ 5.42, 6.02 ], std: [ 2.25, 1.29 ], fq: 50 
  },
  "retire": {
    dict: "happiness", word: "retire", stem: "retir", anew: "bed",
    avg: [ 3.61, 6.02 ], std: [ 2.56, 1.80 ], fq: 50 
  },
  "sophisticated": {
    dict: "happiness", word: "sophisticated", stem: "sophist", anew: "pervert",
    avg: [ 6.26, 6.02 ], std: [ 2.61, 1.76 ], fq: 50 
  },
  "try": {
    dict: "happiness", word: "try", stem: "tri", anew: "stress",
    avg: [ 7.45, 6.02 ], std: [ 2.38, 0.94 ], fq: 50 
  },
  "unwind": {
    dict: "happiness", word: "unwind", stem: "unwind", anew: "relaxed",
    avg: [ 2.39, 6.02 ], std: [ 2.13, 1.85 ], fq: 50 
  },
  "windows": {
    dict: "happiness", word: "windows", stem: "window", anew: "window",
    avg: [ 3.97, 6.02 ], std: [ 2.01, 1.39 ], fq: 50 
  },
  "wondering": {
    dict: "happiness", word: "wondering", stem: "wonder", anew: "wonder",
    avg: [ 5.00, 6.02 ], std: [ 2.23, 1.35 ], fq: 50 
  },
  "writes": {
    dict: "happiness", word: "writes", stem: "write", anew: "save",
    avg: [ 4.95, 6.02 ], std: [ 2.19, 1.38 ], fq: 50 
  },
  "rains": {
    dict: "happiness", word: "rains", stem: "rain", anew: "rain",
    avg: [ 3.65, 6.01 ], std: [ 2.35, 1.87 ], fq: 50 
  },
  "allow": {
    dict: "happiness", word: "allow", stem: "allow", anew: "reserved",
    avg: [ 3.27, 6.00 ], std: [ 2.05, 1.47 ], fq: 50 
  },
  "beliefs": {
    dict: "happiness", word: "beliefs", stem: "belief", anew: "opinion",
    avg: [ 4.89, 6.00 ], std: [ 2.46, 1.51 ], fq: 50 
  },
  "biggest": {
    dict: "happiness", word: "biggest", stem: "biggest", anew: "adult",
    avg: [ 4.76, 6.00 ], std: [ 1.95, 1.32 ], fq: 50 
  },
  "brook": {
    dict: "happiness", word: "brook", stem: "brook", anew: "stomach",
    avg: [ 3.93, 6.00 ], std: [ 2.49, 1.64 ], fq: 50 
  },
  "concentrations": {
    dict: "happiness", word: "concentrations", stem: "concentr", anew: "concentrate",
    avg: [ 4.65, 6.00 ], std: [ 2.13, 1.29 ], fq: 50 
  },
  "crimson": {
    dict: "happiness", word: "crimson", stem: "crimson", anew: "violent",
    avg: [ 6.89, 6.00 ], std: [ 2.47, 1.51 ], fq: 50 
  },
  "favor": {
    dict: "happiness", word: "favor", stem: "favor", anew: "favor",
    avg: [ 4.54, 6.00 ], std: [ 1.86, 2.06 ], fq: 50 
  },
  "find": {
    dict: "happiness", word: "find", stem: "find", anew: "wit",
    avg: [ 5.42, 6.00 ], std: [ 2.44, 1.58 ], fq: 50 
  },
  "fixing": {
    dict: "happiness", word: "fixing", stem: "fix", anew: "doctor",
    avg: [ 5.86, 6.00 ], std: [ 2.70, 1.07 ], fq: 50 
  },
  "global": {
    dict: "happiness", word: "global", stem: "global", anew: "world",
    avg: [ 5.32, 6.00 ], std: [ 2.39, 1.48 ], fq: 50 
  },
  "hands": {
    dict: "happiness", word: "hands", stem: "hand", anew: "hand",
    avg: [ 4.40, 6.00 ], std: [ 2.07, 1.48 ], fq: 50 
  },
  "lawn": {
    dict: "happiness", word: "lawn", stem: "lawn", anew: "lawn",
    avg: [ 4.00, 6.00 ], std: [ 1.79, 1.23 ], fq: 50 
  },
  "lighting": {
    dict: "happiness", word: "lighting", stem: "light", anew: "fire",
    avg: [ 7.17, 6.00 ], std: [ 2.06, 1.44 ], fq: 50 
  },
  "make": {
    dict: "happiness", word: "make", stem: "make", anew: "urine",
    avg: [ 4.20, 6.00 ], std: [ 2.18, 0.99 ], fq: 50 
  },
  "metals": {
    dict: "happiness", word: "metals", stem: "metal", anew: "metal",
    avg: [ 3.79, 6.00 ], std: [ 1.96, 1.35 ], fq: 50 
  },
  "result": {
    dict: "happiness", word: "result", stem: "result", anew: "answer",
    avg: [ 5.41, 6.00 ], std: [ 2.43, 1.16 ], fq: 50 
  },
  "sights": {
    dict: "happiness", word: "sights", stem: "sight", anew: "mountain",
    avg: [ 5.49, 6.00 ], std: [ 2.43, 1.50 ], fq: 50 
  },
  "sites": {
    dict: "happiness", word: "sites", stem: "site", anew: "seat",
    avg: [ 2.95, 6.00 ], std: [ 1.72, 1.16 ], fq: 50 
  },
  "sponsor": {
    dict: "happiness", word: "sponsor", stem: "sponsor", anew: "present",
    avg: [ 5.12, 6.00 ], std: [ 2.39, 1.41 ], fq: 50 
  },
  "started": {
    dict: "happiness", word: "started", stem: "start", anew: "part",
    avg: [ 3.82, 6.00 ], std: [ 2.24, 1.07 ], fq: 50 
  },
  "stores": {
    dict: "happiness", word: "stores", stem: "store", anew: "memory",
    avg: [ 5.42, 6.00 ], std: [ 2.25, 0.97 ], fq: 50 
  },
  "survive": {
    dict: "happiness", word: "survive", stem: "surviv", anew: "lively",
    avg: [ 5.53, 6.00 ], std: [ 2.90, 1.80 ], fq: 50 
  },
  "surviving": {
    dict: "happiness", word: "surviving", stem: "surviv", anew: "lively",
    avg: [ 5.53, 6.00 ], std: [ 2.90, 1.75 ], fq: 50 
  },
  "tuned": {
    dict: "happiness", word: "tuned", stem: "tune", anew: "tune",
    avg: [ 4.71, 6.00 ], std: [ 2.09, 0.97 ], fq: 50 
  },
  "virgin": {
    dict: "happiness", word: "virgin", stem: "virgin", anew: "virgin",
    avg: [ 5.51, 6.00 ], std: [ 2.06, 1.58 ], fq: 50 
  },
  "action": {
    dict: "happiness", word: "action", stem: "action", anew: "execution",
    avg: [ 5.71, 5.98 ], std: [ 2.74, 1.42 ], fq: 50 
  },
  "august": {
    dict: "happiness", word: "august", stem: "august", anew: "reverent",
    avg: [ 4.00, 5.98 ], std: [ 1.60, 1.44 ], fq: 50 
  },
  "author": {
    dict: "happiness", word: "author", stem: "author", anew: "writer",
    avg: [ 4.33, 5.98 ], std: [ 2.45, 1.39 ], fq: 50 
  },
  "biography": {
    dict: "happiness", word: "biography", stem: "biographi", anew: "life",
    avg: [ 6.02, 5.98 ], std: [ 2.62, 1.45 ], fq: 50 
  },
  "broadcast": {
    dict: "happiness", word: "broadcast", stem: "broadcast", anew: "air",
    avg: [ 4.12, 5.98 ], std: [ 2.30, 1.29 ], fq: 50 
  },
  "creatures": {
    dict: "happiness", word: "creatures", stem: "creatur", anew: "tool",
    avg: [ 4.33, 5.98 ], std: [ 1.78, 1.38 ], fq: 50 
  },
  "drum": {
    dict: "happiness", word: "drum", stem: "drum", anew: "barrel",
    avg: [ 3.36, 5.98 ], std: [ 2.28, 1.38 ], fq: 50 
  },
  "egg": {
    dict: "happiness", word: "egg", stem: "egg", anew: "egg",
    avg: [ 3.76, 5.98 ], std: [ 2.39, 1.44 ], fq: 50 
  },
  "explained": {
    dict: "happiness", word: "explained", stem: "explain", anew: "excuse",
    avg: [ 4.48, 5.98 ], std: [ 2.29, 1.32 ], fq: 50 
  },
  "fabric": {
    dict: "happiness", word: "fabric", stem: "fabric", anew: "fabric",
    avg: [ 4.14, 5.98 ], std: [ 1.98, 1.10 ], fq: 50 
  },
  "flash": {
    dict: "happiness", word: "flash", stem: "flash", anew: "wink",
    avg: [ 5.44, 5.98 ], std: [ 2.68, 1.04 ], fq: 50 
  },
  "folk": {
    dict: "happiness", word: "folk", stem: "folk", anew: "family",
    avg: [ 4.80, 5.98 ], std: [ 2.71, 1.44 ], fq: 50 
  },
  "identity": {
    dict: "happiness", word: "identity", stem: "ident", anew: "identity",
    avg: [ 4.95, 5.98 ], std: [ 2.24, 1.12 ], fq: 50 
  },
  "informal": {
    dict: "happiness", word: "informal", stem: "inform", anew: "intimate",
    avg: [ 6.98, 5.98 ], std: [ 2.21, 1.45 ], fq: 50 
  },
  "keys": {
    dict: "happiness", word: "keys", stem: "key", anew: "key",
    avg: [ 3.70, 5.98 ], std: [ 2.18, 1.20 ], fq: 50 
  },
  "lessons": {
    dict: "happiness", word: "lessons", stem: "lesson", anew: "moral",
    avg: [ 4.49, 5.98 ], std: [ 2.28, 1.38 ], fq: 50 
  },
  "looks": {
    dict: "happiness", word: "looks", stem: "look", anew: "spirit",
    avg: [ 5.56, 5.98 ], std: [ 2.62, 1.38 ], fq: 50 
  },
  "meets": {
    dict: "happiness", word: "meets", stem: "meet", anew: "satisfied",
    avg: [ 4.94, 5.98 ], std: [ 2.63, 1.10 ], fq: 50 
  },
  "messages": {
    dict: "happiness", word: "messages", stem: "messag", anew: "contents",
    avg: [ 4.32, 5.98 ], std: [ 2.14, 0.94 ], fq: 50 
  },
  "national": {
    dict: "happiness", word: "national", stem: "nation", anew: "home",
    avg: [ 4.21, 5.98 ], std: [ 2.94, 1.15 ], fq: 50 
  },
  "pairs": {
    dict: "happiness", word: "pairs", stem: "pair", anew: "couple",
    avg: [ 6.39, 5.98 ], std: [ 2.31, 1.17 ], fq: 50 
  },
  "pic": {
    dict: "happiness", word: "pic", stem: "pic", anew: "movie",
    avg: [ 4.93, 5.98 ], std: [ 2.54, 1.17 ], fq: 50 
  },
  "recordings": {
    dict: "happiness", word: "recordings", stem: "record", anew: "memory",
    avg: [ 5.42, 5.98 ], std: [ 2.25, 1.24 ], fq: 50 
  },
  "represented": {
    dict: "happiness", word: "represented", stem: "repres", anew: "present",
    avg: [ 5.12, 5.98 ], std: [ 2.39, 1.17 ], fq: 50 
  },
  "schools": {
    dict: "happiness", word: "schools", stem: "school", anew: "education",
    avg: [ 5.74, 5.98 ], std: [ 2.46, 1.44 ], fq: 50 
  },
  "store": {
    dict: "happiness", word: "store", stem: "store", anew: "memory",
    avg: [ 5.42, 5.98 ], std: [ 2.25, 0.98 ], fq: 50 
  },
  "train": {
    dict: "happiness", word: "train", stem: "train", anew: "education",
    avg: [ 5.74, 5.98 ], std: [ 2.46, 1.49 ], fq: 50 
  },
  "lasts": {
    dict: "happiness", word: "lasts", stem: "last", anew: "lively",
    avg: [ 5.53, 5.98 ], std: [ 2.90, 1.76 ], fq: 50 
  },
  "refer": {
    dict: "happiness", word: "refer", stem: "refer", anew: "name",
    avg: [ 4.25, 5.98 ], std: [ 2.47, 1.11 ], fq: 50 
  },
  "souls": {
    dict: "happiness", word: "souls", stem: "soul", anew: "person",
    avg: [ 4.19, 5.98 ], std: [ 2.45, 1.71 ], fq: 50 
  },
  "allowed": {
    dict: "happiness", word: "allowed", stem: "allow", anew: "reserved",
    avg: [ 3.27, 5.96 ], std: [ 2.05, 1.74 ], fq: 50 
  },
  "body": {
    dict: "happiness", word: "body", stem: "bodi", anew: "body",
    avg: [ 5.52, 5.96 ], std: [ 2.63, 1.03 ], fq: 50 
  },
  "convinced": {
    dict: "happiness", word: "convinced", stem: "convinc", anew: "confident",
    avg: [ 6.22, 5.96 ], std: [ 2.41, 0.97 ], fq: 50 
  },
  "head": {
    dict: "happiness", word: "head", stem: "head", anew: "mind",
    avg: [ 5.00, 5.96 ], std: [ 2.68, 1.07 ], fq: 50 
  },
  "heels": {
    dict: "happiness", word: "heels", stem: "heel", anew: "dog",
    avg: [ 5.76, 5.96 ], std: [ 2.50, 1.12 ], fq: 50 
  },
  "made": {
    dict: "happiness", word: "made", stem: "made", anew: "urine",
    avg: [ 4.20, 5.96 ], std: [ 2.18, 1.07 ], fq: 50 
  },
  "match": {
    dict: "happiness", word: "match", stem: "match", anew: "couple",
    avg: [ 6.39, 5.96 ], std: [ 2.31, 0.99 ], fq: 50 
  },
  "mighty": {
    dict: "happiness", word: "mighty", stem: "mighti", anew: "mighty",
    avg: [ 5.61, 5.96 ], std: [ 2.38, 1.31 ], fq: 50 
  },
  "net": {
    dict: "happiness", word: "net", stem: "net", anew: "profit",
    avg: [ 6.68, 5.96 ], std: [ 1.78, 1.03 ], fq: 50 
  },
  "presently": {
    dict: "happiness", word: "presently", stem: "present", anew: "present",
    avg: [ 5.12, 5.96 ], std: [ 2.39, 1.26 ], fq: 50 
  },
  "reaches": {
    dict: "happiness", word: "reaches", stem: "reach", anew: "ambition",
    avg: [ 5.61, 5.96 ], std: [ 2.92, 1.37 ], fq: 50 
  },
  "releases": {
    dict: "happiness", word: "releases", stem: "releas", anew: "fire",
    avg: [ 7.17, 5.96 ], std: [ 2.06, 1.47 ], fq: 50 
  },
  "rocks": {
    dict: "happiness", word: "rocks", stem: "rock", anew: "rock",
    avg: [ 4.52, 5.96 ], std: [ 2.37, 1.48 ], fq: 50 
  },
  "selection": {
    dict: "happiness", word: "selection", stem: "select", anew: "option",
    avg: [ 4.74, 5.96 ], std: [ 2.23, 1.29 ], fq: 50 
  },
  "ship": {
    dict: "happiness", word: "ship", stem: "ship", anew: "ship",
    avg: [ 4.38, 5.96 ], std: [ 2.29, 1.23 ], fq: 50 
  },
  "ships": {
    dict: "happiness", word: "ships", stem: "ship", anew: "ship",
    avg: [ 4.38, 5.96 ], std: [ 2.29, 1.01 ], fq: 50 
  },
  "space": {
    dict: "happiness", word: "space", stem: "space", anew: "space",
    avg: [ 5.14, 5.96 ], std: [ 2.54, 1.01 ], fq: 50 
  },
  "stadium": {
    dict: "happiness", word: "stadium", stem: "stadium", anew: "bowl",
    avg: [ 3.47, 5.96 ], std: [ 2.12, 1.58 ], fq: 50 
  },
  "starts": {
    dict: "happiness", word: "starts", stem: "start", anew: "part",
    avg: [ 3.82, 5.96 ], std: [ 2.24, 1.19 ], fq: 50 
  },
  "taught": {
    dict: "happiness", word: "taught", stem: "taught", anew: "learn",
    avg: [ 5.39, 5.96 ], std: [ 2.22, 1.46 ], fq: 50 
  },
  "writer": {
    dict: "happiness", word: "writer", stem: "writer", anew: "writer",
    avg: [ 4.33, 5.96 ], std: [ 2.45, 1.54 ], fq: 50 
  },
  "justify": {
    dict: "happiness", word: "justify", stem: "justifi", anew: "excuse",
    avg: [ 4.48, 5.96 ], std: [ 2.29, 1.34 ], fq: 50 
  },
  "spreading": {
    dict: "happiness", word: "spreading", stem: "spread", anew: "air",
    avg: [ 4.12, 5.96 ], std: [ 2.30, 1.31 ], fq: 50 
  },
  "exhibit": {
    dict: "happiness", word: "exhibit", stem: "exhibit", anew: "present",
    avg: [ 5.12, 5.96 ], std: [ 2.39, 1.25 ], fq: 50 
  },
  "fiddle": {
    dict: "happiness", word: "fiddle", stem: "fiddl", anew: "toy",
    avg: [ 5.11, 5.96 ], std: [ 2.84, 1.73 ], fq: 50 
  },
  "alternative": {
    dict: "happiness", word: "alternative", stem: "altern", anew: "option",
    avg: [ 4.74, 5.94 ], std: [ 2.23, 1.39 ], fq: 50 
  },
  "awe": {
    dict: "happiness", word: "awe", stem: "awe", anew: "awed",
    avg: [ 5.74, 5.94 ], std: [ 2.31, 2.09 ], fq: 50 
  },
  "building": {
    dict: "happiness", word: "building", stem: "build", anew: "building",
    avg: [ 3.92, 5.94 ], std: [ 1.94, 1.11 ], fq: 50 
  },
  "chick": {
    dict: "happiness", word: "chick", stem: "chick", anew: "doll",
    avg: [ 4.24, 5.94 ], std: [ 2.43, 1.65 ], fq: 50 
  },
  "consent": {
    dict: "happiness", word: "consent", stem: "consent", anew: "acceptance",
    avg: [ 5.40, 5.94 ], std: [ 2.70, 1.22 ], fq: 50 
  },
  "correspondence": {
    dict: "happiness", word: "correspondence", stem: "correspond", anew: "agreement",
    avg: [ 5.02, 5.94 ], std: [ 2.24, 1.32 ], fq: 50 
  },
  "custom": {
    dict: "happiness", word: "custom", stem: "custom", anew: "custom",
    avg: [ 4.66, 5.94 ], std: [ 2.12, 0.91 ], fq: 50 
  },
  "diary": {
    dict: "happiness", word: "diary", stem: "diari", anew: "journal",
    avg: [ 4.05, 5.94 ], std: [ 1.96, 1.15 ], fq: 50 
  },
  "elevation": {
    dict: "happiness", word: "elevation", stem: "elev", anew: "elevator",
    avg: [ 4.16, 5.94 ], std: [ 1.99, 1.52 ], fq: 50 
  },
  "finds": {
    dict: "happiness", word: "finds", stem: "find", anew: "wit",
    avg: [ 5.42, 5.94 ], std: [ 2.44, 1.25 ], fq: 50 
  },
  "framework": {
    dict: "happiness", word: "framework", stem: "framework", anew: "fabric",
    avg: [ 4.14, 5.94 ], std: [ 1.98, 1.06 ], fq: 50 
  },
  "frank": {
    dict: "happiness", word: "frank", stem: "frank", anew: "dog",
    avg: [ 5.76, 5.94 ], std: [ 2.50, 1.30 ], fq: 50 
  },
  "impression": {
    dict: "happiness", word: "impression", stem: "impress", anew: "impressed",
    avg: [ 5.42, 5.94 ], std: [ 2.65, 1.08 ], fq: 50 
  },
  "jet": {
    dict: "happiness", word: "jet", stem: "jet", anew: "green",
    avg: [ 4.28, 5.94 ], std: [ 2.46, 1.63 ], fq: 50 
  },
  "kings": {
    dict: "happiness", word: "kings", stem: "king", anew: "king",
    avg: [ 5.51, 5.94 ], std: [ 2.77, 1.53 ], fq: 50 
  },
  "knew": {
    dict: "happiness", word: "knew", stem: "knew", anew: "loved",
    avg: [ 6.38, 5.94 ], std: [ 2.68, 1.30 ], fq: 50 
  },
  "letter": {
    dict: "happiness", word: "letter", stem: "letter", anew: "letter",
    avg: [ 4.90, 5.94 ], std: [ 2.37, 1.10 ], fq: 50 
  },
  "listen": {
    dict: "happiness", word: "listen", stem: "listen", anew: "mind",
    avg: [ 5.00, 5.94 ], std: [ 2.68, 1.43 ], fq: 50 
  },
  "looking": {
    dict: "happiness", word: "looking", stem: "look", anew: "face",
    avg: [ 5.04, 5.94 ], std: [ 2.18, 0.98 ], fq: 50 
  },
  "member": {
    dict: "happiness", word: "member", stem: "member", anew: "penis",
    avg: [ 5.54, 5.94 ], std: [ 2.63, 1.11 ], fq: 50 
  },
  "men": {
    dict: "happiness", word: "men", stem: "men", anew: "humane",
    avg: [ 4.50, 5.94 ], std: [ 1.91, 1.39 ], fq: 50 
  },
  "option": {
    dict: "happiness", word: "option", stem: "option", anew: "option",
    avg: [ 4.74, 5.94 ], std: [ 2.23, 1.39 ], fq: 50 
  },
  "preparations": {
    dict: "happiness", word: "preparations", stem: "prepar", anew: "cook",
    avg: [ 4.44, 5.94 ], std: [ 1.96, 1.41 ], fq: 50 
  },
  "reality": {
    dict: "happiness", word: "reality", stem: "realiti", anew: "world",
    avg: [ 5.32, 5.94 ], std: [ 2.39, 1.65 ], fq: 50 
  },
  "reservations": {
    dict: "happiness", word: "reservations", stem: "reserv", anew: "reserved",
    avg: [ 3.27, 5.94 ], std: [ 2.05, 1.46 ], fq: 50 
  },
  "submitted": {
    dict: "happiness", word: "submitted", stem: "submit", anew: "present",
    avg: [ 5.12, 5.94 ], std: [ 2.39, 1.30 ], fq: 50 
  },
  "substantial": {
    dict: "happiness", word: "substantial", stem: "substanti", anew: "square",
    avg: [ 3.18, 5.94 ], std: [ 1.76, 1.10 ], fq: 50 
  },
  "swift": {
    dict: "happiness", word: "swift", stem: "swift", anew: "swift",
    avg: [ 5.39, 5.94 ], std: [ 2.53, 1.27 ], fq: 50 
  },
  "trends": {
    dict: "happiness", word: "trends", stem: "trend", anew: "cut",
    avg: [ 5.00, 5.94 ], std: [ 2.32, 1.28 ], fq: 50 
  },
  "wear": {
    dict: "happiness", word: "wear", stem: "wear", anew: "fatigued",
    avg: [ 2.64, 5.94 ], std: [ 2.19, 1.39 ], fq: 50 
  },
  "cloth": {
    dict: "happiness", word: "cloth", stem: "cloth", anew: "clothing",
    avg: [ 4.78, 5.94 ], std: [ 2.88, 1.13 ], fq: 50 
  },
  "delicate": {
    dict: "happiness", word: "delicate", stem: "delic", anew: "soft",
    avg: [ 4.63, 5.94 ], std: [ 2.61, 1.53 ], fq: 50 
  },
  "processing": {
    dict: "happiness", word: "processing", stem: "process", anew: "treat",
    avg: [ 5.62, 5.94 ], std: [ 2.25, 1.41 ], fq: 50 
  },
  "bank": {
    dict: "happiness", word: "bank", stem: "bank", anew: "trust",
    avg: [ 5.30, 5.92 ], std: [ 2.66, 1.63 ], fq: 50 
  },
  "banks": {
    dict: "happiness", word: "banks", stem: "bank", anew: "trust",
    avg: [ 5.30, 5.92 ], std: [ 2.66, 1.24 ], fq: 50 
  },
  "boobs": {
    dict: "happiness", word: "boobs", stem: "boob", anew: "dummy",
    avg: [ 4.35, 5.92 ], std: [ 2.25, 2.14 ], fq: 50 
  },
  "chicks": {
    dict: "happiness", word: "chicks", stem: "chick", anew: "doll",
    avg: [ 4.24, 5.92 ], std: [ 2.43, 1.85 ], fq: 50 
  },
  "covered": {
    dict: "happiness", word: "covered", stem: "cover", anew: "hide",
    avg: [ 5.28, 5.92 ], std: [ 2.51, 1.01 ], fq: 50 
  },
  "fields": {
    dict: "happiness", word: "fields", stem: "field", anew: "field",
    avg: [ 4.08, 5.92 ], std: [ 2.41, 1.24 ], fq: 50 
  },
  "get": {
    dict: "happiness", word: "get", stem: "get", anew: "father",
    avg: [ 5.92, 5.92 ], std: [ 2.60, 1.08 ], fq: 50 
  },
  "guy": {
    dict: "happiness", word: "guy", stem: "guy", anew: "ridicule",
    avg: [ 5.83, 5.92 ], std: [ 2.73, 1.34 ], fq: 50 
  },
  "opens": {
    dict: "happiness", word: "opens", stem: "open", anew: "outdoors",
    avg: [ 5.92, 5.92 ], std: [ 2.55, 1.28 ], fq: 50 
  },
  "raining": {
    dict: "happiness", word: "raining", stem: "rain", anew: "rain",
    avg: [ 3.65, 5.92 ], std: [ 2.35, 2.17 ], fq: 50 
  },
  "sends": {
    dict: "happiness", word: "sends", stem: "send", anew: "mail",
    avg: [ 5.63, 5.92 ], std: [ 2.36, 0.92 ], fq: 50 
  },
  "shorts": {
    dict: "happiness", word: "shorts", stem: "short", anew: "boxer",
    avg: [ 5.12, 5.92 ], std: [ 2.26, 1.26 ], fq: 50 
  },
  "shown": {
    dict: "happiness", word: "shown", stem: "shown", anew: "present",
    avg: [ 5.12, 5.92 ], std: [ 2.39, 1.07 ], fq: 50 
  },
  "solid": {
    dict: "happiness", word: "solid", stem: "solid", anew: "square",
    avg: [ 3.18, 5.92 ], std: [ 1.76, 1.12 ], fq: 50 
  },
  "umbrella": {
    dict: "happiness", word: "umbrella", stem: "umbrella", anew: "umbrella",
    avg: [ 3.68, 5.92 ], std: [ 1.99, 1.29 ], fq: 50 
  },
  "views": {
    dict: "happiness", word: "views", stem: "view", anew: "sentiment",
    avg: [ 4.41, 5.92 ], std: [ 2.30, 1.01 ], fq: 50 
  },
  "alternatives": {
    dict: "happiness", word: "alternatives", stem: "altern", anew: "option",
    avg: [ 4.74, 5.92 ], std: [ 2.23, 1.47 ], fq: 50 
  },
  "applies": {
    dict: "happiness", word: "applies", stem: "appli", anew: "employment",
    avg: [ 5.28, 5.92 ], std: [ 2.12, 1.34 ], fq: 50 
  },
  "generated": {
    dict: "happiness", word: "generated", stem: "gener", anew: "father",
    avg: [ 5.92, 5.92 ], std: [ 2.60, 1.29 ], fq: 50 
  },
  "addition": {
    dict: "happiness", word: "addition", stem: "addit", anew: "improve",
    avg: [ 5.69, 5.90 ], std: [ 2.15, 1.30 ], fq: 50 
  },
  "diaries": {
    dict: "happiness", word: "diaries", stem: "diari", anew: "journal",
    avg: [ 4.05, 5.90 ], std: [ 1.96, 1.39 ], fq: 50 
  },
  "establish": {
    dict: "happiness", word: "establish", stem: "establish", anew: "plant",
    avg: [ 3.62, 5.90 ], std: [ 2.25, 1.52 ], fq: 50 
  },
  "exist": {
    dict: "happiness", word: "exist", stem: "exist", anew: "lively",
    avg: [ 5.53, 5.90 ], std: [ 2.90, 1.68 ], fq: 50 
  },
  "existence": {
    dict: "happiness", word: "existence", stem: "exist", anew: "world",
    avg: [ 5.32, 5.90 ], std: [ 2.39, 1.25 ], fq: 50 
  },
  "feel": {
    dict: "happiness", word: "feel", stem: "feel", anew: "finger",
    avg: [ 3.78, 5.90 ], std: [ 2.42, 1.13 ], fq: 50 
  },
  "gin": {
    dict: "happiness", word: "gin", stem: "gin", anew: "noose",
    avg: [ 4.39, 5.90 ], std: [ 2.08, 1.81 ], fq: 50 
  },
  "grew": {
    dict: "happiness", word: "grew", stem: "grew", anew: "farm",
    avg: [ 3.90, 5.90 ], std: [ 1.95, 1.33 ], fq: 50 
  },
  "hand": {
    dict: "happiness", word: "hand", stem: "hand", anew: "hand",
    avg: [ 4.40, 5.90 ], std: [ 2.07, 1.07 ], fq: 50 
  },
  "letters": {
    dict: "happiness", word: "letters", stem: "letter", anew: "letter",
    avg: [ 4.90, 5.90 ], std: [ 2.37, 1.42 ], fq: 50 
  },
  "man": {
    dict: "happiness", word: "man", stem: "man", anew: "man",
    avg: [ 5.24, 5.90 ], std: [ 2.31, 1.40 ], fq: 50 
  },
  "modest": {
    dict: "happiness", word: "modest", stem: "modest", anew: "modest",
    avg: [ 3.98, 5.90 ], std: [ 2.24, 1.42 ], fq: 50 
  },
  "naked": {
    dict: "happiness", word: "naked", stem: "nake", anew: "naked",
    avg: [ 5.80, 5.90 ], std: [ 2.80, 2.29 ], fq: 50 
  },
  "pass": {
    dict: "happiness", word: "pass", stem: "pass", anew: "fall",
    avg: [ 4.70, 5.90 ], std: [ 2.48, 1.43 ], fq: 50 
  },
  "peak": {
    dict: "happiness", word: "peak", stem: "peak", anew: "crown",
    avg: [ 4.28, 5.90 ], std: [ 2.53, 1.59 ], fq: 50 
  },
  "personally": {
    dict: "happiness", word: "personally", stem: "person", anew: "person",
    avg: [ 4.19, 5.90 ], std: [ 2.45, 1.07 ], fq: 50 
  },
  "planes": {
    dict: "happiness", word: "planes", stem: "plane", anew: "plane",
    avg: [ 6.14, 5.90 ], std: [ 2.39, 1.68 ], fq: 50 
  },
  "ratings": {
    dict: "happiness", word: "ratings", stem: "rate", anew: "betray",
    avg: [ 7.24, 5.90 ], std: [ 2.06, 1.27 ], fq: 50 
  },
  "recording": {
    dict: "happiness", word: "recording", stem: "record", anew: "memory",
    avg: [ 5.42, 5.90 ], std: [ 2.25, 1.15 ], fq: 50 
  },
  "replies": {
    dict: "happiness", word: "replies", stem: "repli", anew: "answer",
    avg: [ 5.41, 5.90 ], std: [ 2.43, 0.95 ], fq: 50 
  },
  "results": {
    dict: "happiness", word: "results", stem: "result", anew: "answer",
    avg: [ 5.41, 5.90 ], std: [ 2.43, 1.37 ], fq: 50 
  },
  "scores": {
    dict: "happiness", word: "scores", stem: "score", anew: "hit",
    avg: [ 5.73, 5.90 ], std: [ 2.09, 1.13 ], fq: 50 
  },
  "settlement": {
    dict: "happiness", word: "settlement", stem: "settlement", anew: "village",
    avg: [ 4.08, 5.90 ], std: [ 1.87, 1.50 ], fq: 50 
  },
  "angle": {
    dict: "happiness", word: "angle", stem: "angl", anew: "fish",
    avg: [ 4.00, 5.90 ], std: [ 2.19, 1.36 ], fq: 50 
  },
  "dolly": {
    dict: "happiness", word: "dolly", stem: "dolli", anew: "doll",
    avg: [ 4.24, 5.90 ], std: [ 2.43, 1.34 ], fq: 50 
  },
  "puppet": {
    dict: "happiness", word: "puppet", stem: "puppet", anew: "tool",
    avg: [ 4.33, 5.90 ], std: [ 1.78, 1.76 ], fq: 50 
  },
  "admiral": {
    dict: "happiness", word: "admiral", stem: "admir", anew: "admired",
    avg: [ 6.11, 5.89 ], std: [ 2.36, 1.40 ], fq: 50 
  },
  "distinguish": {
    dict: "happiness", word: "distinguish", stem: "distinguish", anew: "severe",
    avg: [ 5.26, 5.88 ], std: [ 2.36, 1.41 ], fq: 50 
  },
  "evidently": {
    dict: "happiness", word: "evidently", stem: "evid", anew: "plain",
    avg: [ 3.52, 5.88 ], std: [ 2.05, 1.35 ], fq: 50 
  },
  "field": {
    dict: "happiness", word: "field", stem: "field", anew: "field",
    avg: [ 4.08, 5.88 ], std: [ 2.41, 1.19 ], fq: 50 
  },
  "founder": {
    dict: "happiness", word: "founder", stem: "founder", anew: "father",
    avg: [ 5.92, 5.88 ], std: [ 2.60, 1.12 ], fq: 50 
  },
  "keeps": {
    dict: "happiness", word: "keeps", stem: "keep", anew: "lively",
    avg: [ 5.53, 5.88 ], std: [ 2.90, 1.32 ], fq: 50 
  },
  "leaders": {
    dict: "happiness", word: "leaders", stem: "leader", anew: "leader",
    avg: [ 6.27, 5.88 ], std: [ 2.18, 1.32 ], fq: 50 
  },
  "mood": {
    dict: "happiness", word: "mood", stem: "mood", anew: "humor",
    avg: [ 5.50, 5.88 ], std: [ 2.91, 1.64 ], fq: 50 
  },
  "primary": {
    dict: "happiness", word: "primary", stem: "primari", anew: "masterful",
    avg: [ 5.20, 5.88 ], std: [ 2.85, 1.12 ], fq: 50 
  },
  "printed": {
    dict: "happiness", word: "printed", stem: "print", anew: "impressed",
    avg: [ 5.42, 5.88 ], std: [ 2.65, 0.96 ], fq: 50 
  },
  "privacy": {
    dict: "happiness", word: "privacy", stem: "privaci", anew: "privacy",
    avg: [ 4.12, 5.88 ], std: [ 1.83, 2.15 ], fq: 50 
  },
  "scout": {
    dict: "happiness", word: "scout", stem: "scout", anew: "watch",
    avg: [ 4.10, 5.88 ], std: [ 2.12, 1.10 ], fq: 50 
  },
  "sequence": {
    dict: "happiness", word: "sequence", stem: "sequenc", anew: "success",
    avg: [ 6.11, 5.88 ], std: [ 2.65, 1.32 ], fq: 50 
  },
  "sustained": {
    dict: "happiness", word: "sustained", stem: "sustain", anew: "nourish",
    avg: [ 4.29, 5.88 ], std: [ 2.51, 1.41 ], fq: 50 
  },
  "twilight": {
    dict: "happiness", word: "twilight", stem: "twilight", anew: "twilight",
    avg: [ 4.70, 5.88 ], std: [ 2.41, 1.91 ], fq: 50 
  },
  "weather": {
    dict: "happiness", word: "weather", stem: "weather", anew: "brave",
    avg: [ 6.15, 5.88 ], std: [ 2.45, 1.52 ], fq: 50 
  },
  "whole": {
    dict: "happiness", word: "whole", stem: "whole", anew: "unit",
    avg: [ 3.75, 5.88 ], std: [ 2.49, 1.33 ], fq: 50 
  },
  "demonstration": {
    dict: "happiness", word: "demonstration", stem: "demonstr", anew: "present",
    avg: [ 5.12, 5.88 ], std: [ 2.39, 1.22 ], fq: 50 
  },
  "flex": {
    dict: "happiness", word: "flex", stem: "flex", anew: "deformed",
    avg: [ 4.07, 5.87 ], std: [ 2.34, 1.16 ], fq: 50 
  },
  "applied": {
    dict: "happiness", word: "applied", stem: "appli", anew: "employment",
    avg: [ 5.28, 5.86 ], std: [ 2.12, 1.29 ], fq: 50 
  },
  "arrangement": {
    dict: "happiness", word: "arrangement", stem: "arrang", anew: "agreement",
    avg: [ 5.02, 5.86 ], std: [ 2.24, 1.12 ], fq: 50 
  },
  "balls": {
    dict: "happiness", word: "balls", stem: "ball", anew: "egg",
    avg: [ 3.76, 5.86 ], std: [ 2.39, 1.21 ], fq: 50 
  },
  "bear": {
    dict: "happiness", word: "bear", stem: "bear", anew: "acceptance",
    avg: [ 5.40, 5.86 ], std: [ 2.70, 1.85 ], fq: 50 
  },
  "brooks": {
    dict: "happiness", word: "brooks", stem: "brook", anew: "stomach",
    avg: [ 3.93, 5.86 ], std: [ 2.49, 1.37 ], fq: 50 
  },
  "connect": {
    dict: "happiness", word: "connect", stem: "connect", anew: "unit",
    avg: [ 3.75, 5.86 ], std: [ 2.49, 1.48 ], fq: 50 
  },
  "curve": {
    dict: "happiness", word: "curve", stem: "curv", anew: "cut",
    avg: [ 5.00, 5.86 ], std: [ 2.32, 1.48 ], fq: 50 
  },
  "diverse": {
    dict: "happiness", word: "diverse", stem: "divers", anew: "diver",
    avg: [ 5.04, 5.86 ], std: [ 2.10, 1.54 ], fq: 50 
  },
  "engineering": {
    dict: "happiness", word: "engineering", stem: "engin", anew: "engine",
    avg: [ 3.98, 5.86 ], std: [ 2.33, 1.48 ], fq: 50 
  },
  "figures": {
    dict: "happiness", word: "figures", stem: "figur", anew: "computer",
    avg: [ 4.75, 5.86 ], std: [ 1.93, 1.18 ], fq: 50 
  },
  "hotter": {
    dict: "happiness", word: "hotter", stem: "hotter", anew: "blister",
    avg: [ 4.10, 5.86 ], std: [ 2.34, 1.54 ], fq: 50 
  },
  "household": {
    dict: "happiness", word: "household", stem: "household", anew: "home",
    avg: [ 4.21, 5.86 ], std: [ 2.94, 1.65 ], fq: 50 
  },
  "introduce": {
    dict: "happiness", word: "introduce", stem: "introduc", anew: "present",
    avg: [ 5.12, 5.86 ], std: [ 2.39, 0.97 ], fq: 50 
  },
  "keep": {
    dict: "happiness", word: "keep", stem: "keep", anew: "lively",
    avg: [ 5.53, 5.86 ], std: [ 2.90, 1.07 ], fq: 50 
  },
  "nut": {
    dict: "happiness", word: "nut", stem: "nut", anew: "addicted",
    avg: [ 4.81, 5.86 ], std: [ 2.46, 1.50 ], fq: 50 
  },
  "nuts": {
    dict: "happiness", word: "nuts", stem: "nut", anew: "addicted",
    avg: [ 4.81, 5.86 ], std: [ 2.46, 1.63 ], fq: 50 
  },
  "observations": {
    dict: "happiness", word: "observations", stem: "observ", anew: "watch",
    avg: [ 4.10, 5.86 ], std: [ 2.12, 1.07 ], fq: 50 
  },
  "position": {
    dict: "happiness", word: "position", stem: "posit", anew: "statue",
    avg: [ 3.46, 5.86 ], std: [ 1.72, 1.12 ], fq: 50 
  },
  "president": {
    dict: "happiness", word: "president", stem: "presid", anew: "chair",
    avg: [ 3.15, 5.86 ], std: [ 1.77, 2.11 ], fq: 50 
  },
  "seat": {
    dict: "happiness", word: "seat", stem: "seat", anew: "seat",
    avg: [ 2.95, 5.86 ], std: [ 1.72, 1.05 ], fq: 50 
  },
  "sound": {
    dict: "happiness", word: "sound", stem: "sound", anew: "good",
    avg: [ 5.43, 5.86 ], std: [ 2.85, 1.28 ], fq: 50 
  },
  "trained": {
    dict: "happiness", word: "trained", stem: "train", anew: "education",
    avg: [ 5.74, 5.86 ], std: [ 2.46, 1.50 ], fq: 50 
  },
  "variations": {
    dict: "happiness", word: "variations", stem: "variat", anew: "mutation",
    avg: [ 4.84, 5.86 ], std: [ 2.52, 1.20 ], fq: 50 
  },
  "viewers": {
    dict: "happiness", word: "viewers", stem: "viewer", anew: "wit",
    avg: [ 5.42, 5.86 ], std: [ 2.44, 1.28 ], fq: 50 
  },
  "wrapped": {
    dict: "happiness", word: "wrapped", stem: "wrap", anew: "clothing",
    avg: [ 4.78, 5.86 ], std: [ 2.88, 1.31 ], fq: 50 
  },
  "autonomy": {
    dict: "happiness", word: "autonomy", stem: "autonomi", anew: "liberty",
    avg: [ 5.60, 5.86 ], std: [ 2.65, 1.59 ], fq: 50 
  },
  "concentrated": {
    dict: "happiness", word: "concentrated", stem: "concentr", anew: "concentrate",
    avg: [ 4.65, 5.86 ], std: [ 2.13, 1.29 ], fq: 50 
  },
  "deeper": {
    dict: "happiness", word: "deeper", stem: "deeper", anew: "riches",
    avg: [ 6.17, 5.86 ], std: [ 2.70, 1.34 ], fq: 50 
  },
  "liquid": {
    dict: "happiness", word: "liquid", stem: "liquid", anew: "smooth",
    avg: [ 4.91, 5.86 ], std: [ 2.57, 1.17 ], fq: 50 
  },
  "concentration": {
    dict: "happiness", word: "concentration", stem: "concentr", anew: "concentrate",
    avg: [ 4.65, 5.85 ], std: [ 2.13, 1.56 ], fq: 50 
  },
  "construct": {
    dict: "happiness", word: "construct", stem: "construct", anew: "fabric",
    avg: [ 4.14, 5.85 ], std: [ 1.98, 1.52 ], fq: 50 
  },
  "angeles": {
    dict: "happiness", word: "angeles", stem: "angel", anew: "angel",
    avg: [ 4.83, 5.84 ], std: [ 2.63, 1.56 ], fq: 50 
  },
  "arena": {
    dict: "happiness", word: "arena", stem: "arena", anew: "sphere",
    avg: [ 3.88, 5.84 ], std: [ 1.99, 1.02 ], fq: 50 
  },
  "banking": {
    dict: "happiness", word: "banking", stem: "bank", anew: "trust",
    avg: [ 5.30, 5.84 ], std: [ 2.66, 1.65 ], fq: 50 
  },
  "buck": {
    dict: "happiness", word: "buck", stem: "buck", anew: "horse",
    avg: [ 3.89, 5.84 ], std: [ 2.17, 1.78 ], fq: 50 
  },
  "checks": {
    dict: "happiness", word: "checks", stem: "check", anew: "controlling",
    avg: [ 6.10, 5.84 ], std: [ 2.19, 1.54 ], fq: 50 
  },
  "circles": {
    dict: "happiness", word: "circles", stem: "circl", anew: "circle",
    avg: [ 3.86, 5.84 ], std: [ 2.13, 1.18 ], fq: 50 
  },
  "classes": {
    dict: "happiness", word: "classes", stem: "class", anew: "family",
    avg: [ 4.80, 5.84 ], std: [ 2.71, 1.33 ], fq: 50 
  },
  "coming": {
    dict: "happiness", word: "coming", stem: "come", anew: "orgasm",
    avg: [ 8.10, 5.84 ], std: [ 1.45, 1.20 ], fq: 50 
  },
  "curry": {
    dict: "happiness", word: "curry", stem: "curri", anew: "dress",
    avg: [ 4.05, 5.84 ], std: [ 1.89, 1.82 ], fq: 50 
  },
  "feelings": {
    dict: "happiness", word: "feelings", stem: "feel", anew: "finger",
    avg: [ 3.78, 5.84 ], std: [ 2.42, 1.72 ], fq: 50 
  },
  "gets": {
    dict: "happiness", word: "gets", stem: "get", anew: "father",
    avg: [ 5.92, 5.84 ], std: [ 2.60, 1.30 ], fq: 50 
  },
  "gravity": {
    dict: "happiness", word: "gravity", stem: "graviti", anew: "solemn",
    avg: [ 3.56, 5.84 ], std: [ 1.95, 1.58 ], fq: 50 
  },
  "hear": {
    dict: "happiness", word: "hear", stem: "hear", anew: "learn",
    avg: [ 5.39, 5.84 ], std: [ 2.22, 1.20 ], fq: 50 
  },
  "history": {
    dict: "happiness", word: "history", stem: "histori", anew: "history",
    avg: [ 3.93, 5.84 ], std: [ 2.29, 1.50 ], fq: 50 
  },
  "individuals": {
    dict: "happiness", word: "individuals", stem: "individu", anew: "person",
    avg: [ 4.19, 5.84 ], std: [ 2.45, 1.00 ], fq: 50 
  },
  "lands": {
    dict: "happiness", word: "lands", stem: "land", anew: "earth",
    avg: [ 4.24, 5.84 ], std: [ 2.49, 1.33 ], fq: 50 
  },
  "patents": {
    dict: "happiness", word: "patents", stem: "patent", anew: "patent",
    avg: [ 3.50, 5.84 ], std: [ 1.84, 1.06 ], fq: 50 
  },
  "poster": {
    dict: "happiness", word: "poster", stem: "poster", anew: "poster",
    avg: [ 3.93, 5.84 ], std: [ 2.56, 1.13 ], fq: 50 
  },
  "producing": {
    dict: "happiness", word: "producing", stem: "produc", anew: "farm",
    avg: [ 3.90, 5.84 ], std: [ 1.95, 1.33 ], fq: 50 
  },
  "puff": {
    dict: "happiness", word: "puff", stem: "puff", anew: "comfort",
    avg: [ 3.93, 5.84 ], std: [ 2.85, 1.48 ], fq: 50 
  },
  "really": {
    dict: "happiness", word: "really", stem: "realli", anew: "rattle",
    avg: [ 4.36, 5.84 ], std: [ 2.18, 1.49 ], fq: 50 
  },
  "responses": {
    dict: "happiness", word: "responses", stem: "respons", anew: "answer",
    avg: [ 5.41, 5.84 ], std: [ 2.43, 1.15 ], fq: 50 
  },
  "sample": {
    dict: "happiness", word: "sample", stem: "sampl", anew: "taste",
    avg: [ 5.22, 5.84 ], std: [ 2.38, 0.93 ], fq: 50 
  },
  "showing": {
    dict: "happiness", word: "showing", stem: "show", anew: "present",
    avg: [ 5.12, 5.84 ], std: [ 2.39, 0.84 ], fq: 50 
  },
  "stages": {
    dict: "happiness", word: "stages", stem: "stage", anew: "rat",
    avg: [ 4.95, 5.84 ], std: [ 2.36, 1.54 ], fq: 50 
  },
  "watching": {
    dict: "happiness", word: "watching", stem: "watch", anew: "watch",
    avg: [ 4.10, 5.84 ], std: [ 2.12, 1.22 ], fq: 50 
  },
  "absorption": {
    dict: "happiness", word: "absorption", stem: "absorpt", anew: "concentrate",
    avg: [ 4.65, 5.84 ], std: [ 2.13, 1.36 ], fq: 50 
  },
  "constructed": {
    dict: "happiness", word: "constructed", stem: "construct", anew: "fabric",
    avg: [ 4.14, 5.84 ], std: [ 1.98, 1.40 ], fq: 50 
  },
  "examples": {
    dict: "happiness", word: "examples", stem: "exampl", anew: "exercise",
    avg: [ 6.84, 5.84 ], std: [ 2.06, 1.46 ], fq: 50 
  },
  "shades": {
    dict: "happiness", word: "shades", stem: "shade", anew: "shadow",
    avg: [ 4.30, 5.84 ], std: [ 2.26, 1.40 ], fq: 50 
  },
  "instruction": {
    dict: "happiness", word: "instruction", stem: "instruct", anew: "education",
    avg: [ 5.74, 5.83 ], std: [ 2.46, 1.26 ], fq: 50 
  },
  "wagon": {
    dict: "happiness", word: "wagon", stem: "wagon", anew: "wagon",
    avg: [ 3.98, 5.83 ], std: [ 2.04, 1.32 ], fq: 50 
  },
  "apply": {
    dict: "happiness", word: "apply", stem: "appli", anew: "employment",
    avg: [ 5.28, 5.82 ], std: [ 2.12, 0.80 ], fq: 50 
  },
  "bar": {
    dict: "happiness", word: "bar", stem: "bar", anew: "bar",
    avg: [ 5.00, 5.82 ], std: [ 2.83, 1.80 ], fq: 50 
  },
  "becoming": {
    dict: "happiness", word: "becoming", stem: "becom", anew: "decorate",
    avg: [ 5.14, 5.82 ], std: [ 2.39, 0.92 ], fq: 50 
  },
  "come": {
    dict: "happiness", word: "come", stem: "come", anew: "fall",
    avg: [ 4.70, 5.82 ], std: [ 2.48, 1.00 ], fq: 50 
  },
  "cow": {
    dict: "happiness", word: "cow", stem: "cow", anew: "cow",
    avg: [ 3.49, 5.82 ], std: [ 2.13, 1.47 ], fq: 50 
  },
  "detail": {
    dict: "happiness", word: "detail", stem: "detail", anew: "detail",
    avg: [ 4.10, 5.82 ], std: [ 2.24, 1.14 ], fq: 50 
  },
  "emphasized": {
    dict: "happiness", word: "emphasized", stem: "emphas", anew: "stress",
    avg: [ 7.45, 5.82 ], std: [ 2.38, 1.44 ], fq: 50 
  },
  "endowment": {
    dict: "happiness", word: "endowment", stem: "endow", anew: "talent",
    avg: [ 6.27, 5.82 ], std: [ 1.80, 1.51 ], fq: 50 
  },
  "hearing": {
    dict: "happiness", word: "hearing", stem: "hear", anew: "learn",
    avg: [ 5.39, 5.82 ], std: [ 2.22, 1.48 ], fq: 50 
  },
  "homey": {
    dict: "happiness", word: "homey", stem: "homey", anew: "home",
    avg: [ 4.21, 5.82 ], std: [ 2.94, 2.06 ], fq: 50 
  },
  "investment": {
    dict: "happiness", word: "investment", stem: "invest", anew: "invest",
    avg: [ 5.12, 5.82 ], std: [ 2.42, 1.81 ], fq: 50 
  },
  "involved": {
    dict: "happiness", word: "involved", stem: "involv", anew: "affection",
    avg: [ 6.21, 5.82 ], std: [ 2.75, 1.34 ], fq: 50 
  },
  "key": {
    dict: "happiness", word: "key", stem: "key", anew: "key",
    avg: [ 3.70, 5.82 ], std: [ 2.18, 1.06 ], fq: 50 
  },
  "lived": {
    dict: "happiness", word: "lived", stem: "live", anew: "lively",
    avg: [ 5.53, 5.82 ], std: [ 2.90, 1.60 ], fq: 50 
  },
  "met": {
    dict: "happiness", word: "met", stem: "met", anew: "satisfied",
    avg: [ 4.94, 5.82 ], std: [ 2.63, 0.92 ], fq: 50 
  },
  "opinion": {
    dict: "happiness", word: "opinion", stem: "opinion", anew: "opinion",
    avg: [ 4.89, 5.82 ], std: [ 2.46, 1.34 ], fq: 50 
  },
  "owl": {
    dict: "happiness", word: "owl", stem: "owl", anew: "owl",
    avg: [ 3.98, 5.82 ], std: [ 1.87, 1.86 ], fq: 50 
  },
  "pair": {
    dict: "happiness", word: "pair", stem: "pair", anew: "couple",
    avg: [ 6.39, 5.82 ], std: [ 2.31, 1.19 ], fq: 50 
  },
  "peoples": {
    dict: "happiness", word: "peoples", stem: "peopl", anew: "people",
    avg: [ 5.94, 5.82 ], std: [ 2.09, 1.37 ], fq: 50 
  },
  "quickly": {
    dict: "happiness", word: "quickly", stem: "quickli", anew: "quick",
    avg: [ 6.57, 5.82 ], std: [ 1.78, 1.45 ], fq: 50 
  },
  "regarded": {
    dict: "happiness", word: "regarded", stem: "regard", anew: "affection",
    avg: [ 6.21, 5.82 ], std: [ 2.75, 1.17 ], fq: 50 
  },
  "sum": {
    dict: "happiness", word: "sum", stem: "sum", anew: "heart",
    avg: [ 6.34, 5.82 ], std: [ 2.25, 1.14 ], fq: 50 
  },
  "mist": {
    dict: "happiness", word: "mist", stem: "mist", anew: "clouds",
    avg: [ 3.30, 5.82 ], std: [ 2.08, 1.58 ], fq: 50 
  },
  "acquisition": {
    dict: "happiness", word: "acquisition", stem: "acquisit", anew: "learn",
    avg: [ 5.39, 5.80 ], std: [ 2.22, 1.53 ], fq: 50 
  },
  "addressed": {
    dict: "happiness", word: "addressed", stem: "address", anew: "treat",
    avg: [ 5.62, 5.80 ], std: [ 2.25, 1.21 ], fq: 50 
  },
  "determine": {
    dict: "happiness", word: "determine", stem: "determin", anew: "mold",
    avg: [ 4.07, 5.80 ], std: [ 1.98, 1.34 ], fq: 50 
  },
  "double": {
    dict: "happiness", word: "double", stem: "doubl", anew: "fork",
    avg: [ 3.96, 5.80 ], std: [ 1.94, 1.37 ], fq: 50 
  },
  "establishing": {
    dict: "happiness", word: "establishing", stem: "establish", anew: "plant",
    avg: [ 3.62, 5.80 ], std: [ 2.25, 1.40 ], fq: 50 
  },
  "finding": {
    dict: "happiness", word: "finding", stem: "find", anew: "wit",
    avg: [ 5.42, 5.80 ], std: [ 2.44, 1.21 ], fq: 50 
  },
  "ice": {
    dict: "happiness", word: "ice", stem: "ice", anew: "trash",
    avg: [ 4.16, 5.80 ], std: [ 2.16, 1.48 ], fq: 50 
  },
  "interior": {
    dict: "happiness", word: "interior", stem: "interior", anew: "home",
    avg: [ 4.21, 5.80 ], std: [ 2.94, 0.88 ], fq: 50 
  },
  "known": {
    dict: "happiness", word: "known", stem: "known", anew: "loved",
    avg: [ 6.38, 5.80 ], std: [ 2.68, 1.39 ], fq: 50 
  },
  "liberal": {
    dict: "happiness", word: "liberal", stem: "liber", anew: "handsome",
    avg: [ 5.95, 5.80 ], std: [ 2.73, 2.17 ], fq: 50 
  },
  "model": {
    dict: "happiness", word: "model", stem: "model", anew: "mold",
    avg: [ 4.07, 5.80 ], std: [ 1.98, 1.09 ], fq: 50 
  },
  "outside": {
    dict: "happiness", word: "outside", stem: "outsid", anew: "outdoors",
    avg: [ 5.92, 5.80 ], std: [ 2.55, 1.68 ], fq: 50 
  },
  "paper": {
    dict: "happiness", word: "paper", stem: "paper", anew: "paper",
    avg: [ 2.50, 5.80 ], std: [ 1.85, 1.20 ], fq: 50 
  },
  "pardon": {
    dict: "happiness", word: "pardon", stem: "pardon", anew: "excuse",
    avg: [ 4.48, 5.80 ], std: [ 2.29, 1.63 ], fq: 50 
  },
  "practice": {
    dict: "happiness", word: "practice", stem: "practic", anew: "useful",
    avg: [ 4.26, 5.80 ], std: [ 2.47, 1.34 ], fq: 50 
  },
  "rubber": {
    dict: "happiness", word: "rubber", stem: "rubber", anew: "safe",
    avg: [ 3.86, 5.80 ], std: [ 2.72, 1.36 ], fq: 50 
  },
  "sending": {
    dict: "happiness", word: "sending", stem: "send", anew: "mail",
    avg: [ 5.63, 5.80 ], std: [ 2.36, 0.93 ], fq: 50 
  },
  "shaped": {
    dict: "happiness", word: "shaped", stem: "shape", anew: "mold",
    avg: [ 4.07, 5.80 ], std: [ 1.98, 1.21 ], fq: 50 
  },
  "write": {
    dict: "happiness", word: "write", stem: "write", anew: "save",
    avg: [ 4.95, 5.80 ], std: [ 2.19, 1.47 ], fq: 50 
  },
  "yellow": {
    dict: "happiness", word: "yellow", stem: "yellow", anew: "yellow",
    avg: [ 4.43, 5.80 ], std: [ 2.05, 1.46 ], fq: 50 
  },
  "seated": {
    dict: "happiness", word: "seated", stem: "seat", anew: "seat",
    avg: [ 2.95, 5.80 ], std: [ 1.72, 1.22 ], fq: 50 
  },
  "gender": {
    dict: "happiness", word: "gender", stem: "gender", anew: "gender",
    avg: [ 4.38, 5.80 ], std: [ 2.13, 1.24 ], fq: 50 
  },
  "involve": {
    dict: "happiness", word: "involve", stem: "involv", anew: "affection",
    avg: [ 6.21, 5.80 ], std: [ 2.75, 1.34 ], fq: 50 
  },
  "manufacture": {
    dict: "happiness", word: "manufacture", stem: "manufactur", anew: "fabric",
    avg: [ 4.14, 5.80 ], std: [ 1.98, 1.43 ], fq: 50 
  },
  "sentiment": {
    dict: "happiness", word: "sentiment", stem: "sentiment", anew: "sentiment",
    avg: [ 4.41, 5.80 ], std: [ 2.30, 1.90 ], fq: 50 
  },
  "arch": {
    dict: "happiness", word: "arch", stem: "arch", anew: "wicked",
    avg: [ 6.09, 5.79 ], std: [ 2.44, 1.31 ], fq: 50 
  },
  "actions": {
    dict: "happiness", word: "actions", stem: "action", anew: "execution",
    avg: [ 5.71, 5.78 ], std: [ 2.74, 0.89 ], fq: 50 
  },
  "amber": {
    dict: "happiness", word: "amber", stem: "amber", anew: "gold",
    avg: [ 5.76, 5.78 ], std: [ 2.79, 1.50 ], fq: 50 
  },
  "aware": {
    dict: "happiness", word: "aware", stem: "awar", anew: "mind",
    avg: [ 5.00, 5.78 ], std: [ 2.68, 1.47 ], fq: 50 
  },
  "characters": {
    dict: "happiness", word: "characters", stem: "charact", anew: "quality",
    avg: [ 4.48, 5.78 ], std: [ 2.12, 1.40 ], fq: 50 
  },
  "containing": {
    dict: "happiness", word: "containing", stem: "contain", anew: "controlling",
    avg: [ 6.10, 5.78 ], std: [ 2.19, 1.00 ], fq: 50 
  },
  "fed": {
    dict: "happiness", word: "fed", stem: "fed", anew: "eat",
    avg: [ 5.69, 5.78 ], std: [ 2.51, 1.49 ], fq: 50 
  },
  "flows": {
    dict: "happiness", word: "flows", stem: "flow", anew: "fall",
    avg: [ 4.70, 5.78 ], std: [ 2.48, 1.36 ], fq: 50 
  },
  "founding": {
    dict: "happiness", word: "founding", stem: "found", anew: "plant",
    avg: [ 3.62, 5.78 ], std: [ 2.25, 1.46 ], fq: 50 
  },
  "hottest": {
    dict: "happiness", word: "hottest", stem: "hottest", anew: "blister",
    avg: [ 4.10, 5.78 ], std: [ 2.34, 2.19 ], fq: 50 
  },
  "lift": {
    dict: "happiness", word: "lift", stem: "lift", anew: "vacation",
    avg: [ 5.64, 5.78 ], std: [ 2.99, 1.04 ], fq: 50 
  },
  "link": {
    dict: "happiness", word: "link", stem: "link", anew: "unit",
    avg: [ 3.75, 5.78 ], std: [ 2.49, 1.11 ], fq: 50 
  },
  "lot": {
    dict: "happiness", word: "lot", stem: "lot", anew: "mountain",
    avg: [ 5.49, 5.78 ], std: [ 2.43, 1.37 ], fq: 50 
  },
  "morality": {
    dict: "happiness", word: "morality", stem: "moral", anew: "moral",
    avg: [ 4.49, 5.78 ], std: [ 2.28, 1.80 ], fq: 50 
  },
  "passages": {
    dict: "happiness", word: "passages", stem: "passag", anew: "passage",
    avg: [ 4.36, 5.78 ], std: [ 2.13, 1.23 ], fq: 50 
  },
  "plates": {
    dict: "happiness", word: "plates", stem: "plate", anew: "home",
    avg: [ 4.21, 5.78 ], std: [ 2.94, 1.33 ], fq: 50 
  },
  "record": {
    dict: "happiness", word: "record", stem: "record", anew: "memory",
    avg: [ 5.42, 5.78 ], std: [ 2.25, 1.40 ], fq: 50 
  },
  "respond": {
    dict: "happiness", word: "respond", stem: "respond", anew: "answer",
    avg: [ 5.41, 5.78 ], std: [ 2.43, 1.06 ], fq: 50 
  },
  "shuttle": {
    dict: "happiness", word: "shuttle", stem: "shuttl", anew: "bird",
    avg: [ 3.17, 5.78 ], std: [ 2.23, 0.93 ], fq: 50 
  },
  "trying": {
    dict: "happiness", word: "trying", stem: "tri", anew: "stress",
    avg: [ 7.45, 5.78 ], std: [ 2.38, 1.17 ], fq: 50 
  },
  "various": {
    dict: "happiness", word: "various", stem: "variou", anew: "respectful",
    avg: [ 4.60, 5.78 ], std: [ 2.67, 0.86 ], fq: 50 
  },
  "volume": {
    dict: "happiness", word: "volume", stem: "volum", anew: "book",
    avg: [ 4.17, 5.78 ], std: [ 2.49, 1.50 ], fq: 50 
  },
  "workout": {
    dict: "happiness", word: "workout", stem: "workout", anew: "exercise",
    avg: [ 6.84, 5.78 ], std: [ 2.06, 2.08 ], fq: 50 
  },
  "sober": {
    dict: "happiness", word: "sober", stem: "sober", anew: "solemn",
    avg: [ 3.56, 5.78 ], std: [ 1.95, 1.98 ], fq: 50 
  },
  "components": {
    dict: "happiness", word: "components", stem: "compon", anew: "part",
    avg: [ 3.82, 5.78 ], std: [ 2.24, 1.37 ], fq: 50 
  },
  "flashing": {
    dict: "happiness", word: "flashing", stem: "flash", anew: "wink",
    avg: [ 5.44, 5.78 ], std: [ 2.68, 1.65 ], fq: 50 
  },
  "printing": {
    dict: "happiness", word: "printing", stem: "print", anew: "impressed",
    avg: [ 5.42, 5.77 ], std: [ 2.65, 1.36 ], fq: 50 
  },
  "accord": {
    dict: "happiness", word: "accord", stem: "accord", anew: "agreement",
    avg: [ 5.02, 5.76 ], std: [ 2.24, 1.24 ], fq: 50 
  },
  "city": {
    dict: "happiness", word: "city", stem: "citi", anew: "city",
    avg: [ 5.24, 5.76 ], std: [ 2.53, 1.55 ], fq: 50 
  },
  "days": {
    dict: "happiness", word: "days", stem: "day", anew: "daylight",
    avg: [ 4.77, 5.76 ], std: [ 2.50, 1.24 ], fq: 50 
  },
  "describes": {
    dict: "happiness", word: "describes", stem: "describ", anew: "key",
    avg: [ 3.70, 5.76 ], std: [ 2.18, 1.08 ], fq: 50 
  },
  "facilities": {
    dict: "happiness", word: "facilities", stem: "facil", anew: "quick",
    avg: [ 6.57, 5.76 ], std: [ 1.78, 1.45 ], fq: 50 
  },
  "functions": {
    dict: "happiness", word: "functions", stem: "function", anew: "useful",
    avg: [ 4.26, 5.76 ], std: [ 2.47, 1.24 ], fq: 50 
  },
  "glass": {
    dict: "happiness", word: "glass", stem: "glass", anew: "glass",
    avg: [ 4.27, 5.76 ], std: [ 2.07, 1.22 ], fq: 50 
  },
  "horny": {
    dict: "happiness", word: "horny", stem: "horni", anew: "aroused",
    avg: [ 6.63, 5.76 ], std: [ 2.70, 2.02 ], fq: 50 
  },
  "lamp": {
    dict: "happiness", word: "lamp", stem: "lamp", anew: "lamp",
    avg: [ 3.80, 5.76 ], std: [ 2.12, 0.98 ], fq: 50 
  },
  "preparing": {
    dict: "happiness", word: "preparing", stem: "prepar", anew: "machine",
    avg: [ 3.82, 5.76 ], std: [ 2.40, 1.41 ], fq: 50 
  },
  "probability": {
    dict: "happiness", word: "probability", stem: "probabl", anew: "chance",
    avg: [ 5.38, 5.76 ], std: [ 2.58, 1.25 ], fq: 50 
  },
  "referring": {
    dict: "happiness", word: "referring", stem: "refer", anew: "name",
    avg: [ 4.25, 5.76 ], std: [ 2.47, 1.17 ], fq: 50 
  },
  "representing": {
    dict: "happiness", word: "representing", stem: "repres", anew: "present",
    avg: [ 5.12, 5.76 ], std: [ 2.39, 1.10 ], fq: 50 
  },
  "sees": {
    dict: "happiness", word: "sees", stem: "see", anew: "controlling",
    avg: [ 6.10, 5.76 ], std: [ 2.19, 1.41 ], fq: 50 
  },
  "selling": {
    dict: "happiness", word: "selling", stem: "sell", anew: "betray",
    avg: [ 7.24, 5.76 ], std: [ 2.06, 1.59 ], fq: 50 
  },
  "slide": {
    dict: "happiness", word: "slide", stem: "slide", anew: "coast",
    avg: [ 4.59, 5.76 ], std: [ 2.31, 1.22 ], fq: 50 
  },
  "staying": {
    dict: "happiness", word: "staying", stem: "stay", anew: "delayed",
    avg: [ 5.62, 5.76 ], std: [ 2.39, 1.35 ], fq: 50 
  },
  "viewing": {
    dict: "happiness", word: "viewing", stem: "view", anew: "watch",
    avg: [ 4.10, 5.76 ], std: [ 2.12, 1.42 ], fq: 50 
  },
  "vital": {
    dict: "happiness", word: "vital", stem: "vital", anew: "lively",
    avg: [ 5.53, 5.76 ], std: [ 2.90, 1.56 ], fq: 50 
  },
  "voice": {
    dict: "happiness", word: "voice", stem: "voic", anew: "part",
    avg: [ 3.82, 5.76 ], std: [ 2.24, 1.06 ], fq: 50 
  },
  "handed": {
    dict: "happiness", word: "handed", stem: "hand", anew: "hand",
    avg: [ 4.40, 5.76 ], std: [ 2.07, 1.38 ], fq: 50 
  },
  "thoroughly": {
    dict: "happiness", word: "thoroughly", stem: "thoroughli", anew: "good",
    avg: [ 5.43, 5.76 ], std: [ 2.85, 1.44 ], fq: 50 
  },
  "awake": {
    dict: "happiness", word: "awake", stem: "awak", anew: "alert",
    avg: [ 6.85, 5.74 ], std: [ 2.53, 1.47 ], fq: 50 
  },
  "call": {
    dict: "happiness", word: "call", stem: "call", anew: "song",
    avg: [ 6.07, 5.74 ], std: [ 2.42, 1.44 ], fq: 50 
  },
  "calling": {
    dict: "happiness", word: "calling", stem: "call", anew: "name",
    avg: [ 4.25, 5.74 ], std: [ 2.47, 1.26 ], fq: 50 
  },
  "catch": {
    dict: "happiness", word: "catch", stem: "catch", anew: "fascinate",
    avg: [ 5.83, 5.74 ], std: [ 2.73, 1.38 ], fq: 50 
  },
  "concentrate": {
    dict: "happiness", word: "concentrate", stem: "concentr", anew: "concentrate",
    avg: [ 4.65, 5.74 ], std: [ 2.13, 1.59 ], fq: 50 
  },
  "deep": {
    dict: "happiness", word: "deep", stem: "deep", anew: "riches",
    avg: [ 6.17, 5.74 ], std: [ 2.70, 1.40 ], fq: 50 
  },
  "details": {
    dict: "happiness", word: "details", stem: "detail", anew: "detail",
    avg: [ 4.10, 5.74 ], std: [ 2.24, 1.23 ], fq: 50 
  },
  "fundamental": {
    dict: "happiness", word: "fundamental", stem: "fundament", anew: "key",
    avg: [ 3.70, 5.74 ], std: [ 2.18, 0.96 ], fq: 50 
  },
  "given": {
    dict: "happiness", word: "given", stem: "given", anew: "mind",
    avg: [ 5.00, 5.74 ], std: [ 2.68, 1.44 ], fq: 50 
  },
  "kept": {
    dict: "happiness", word: "kept", stem: "kept", anew: "save",
    avg: [ 4.95, 5.74 ], std: [ 2.19, 1.10 ], fq: 50 
  },
  "kinds": {
    dict: "happiness", word: "kinds", stem: "kind", anew: "kindness",
    avg: [ 4.30, 5.74 ], std: [ 2.62, 1.05 ], fq: 50 
  },
  "name": {
    dict: "happiness", word: "name", stem: "name", anew: "name",
    avg: [ 4.25, 5.74 ], std: [ 2.47, 1.17 ], fq: 50 
  },
  "observed": {
    dict: "happiness", word: "observed", stem: "observ", anew: "watch",
    avg: [ 4.10, 5.74 ], std: [ 2.12, 1.03 ], fq: 50 
  },
  "presented": {
    dict: "happiness", word: "presented", stem: "present", anew: "present",
    avg: [ 5.12, 5.74 ], std: [ 2.39, 0.99 ], fq: 50 
  },
  "reach": {
    dict: "happiness", word: "reach", stem: "reach", anew: "ambition",
    avg: [ 5.61, 5.74 ], std: [ 2.92, 1.40 ], fq: 50 
  },
  "responded": {
    dict: "happiness", word: "responded", stem: "respond", anew: "answer",
    avg: [ 5.41, 5.74 ], std: [ 2.43, 1.29 ], fq: 50 
  },
  "screen": {
    dict: "happiness", word: "screen", stem: "screen", anew: "blind",
    avg: [ 4.39, 5.74 ], std: [ 2.36, 1.26 ], fq: 50 
  },
  "serves": {
    dict: "happiness", word: "serves", stem: "serv", anew: "answer",
    avg: [ 5.41, 5.74 ], std: [ 2.43, 1.65 ], fq: 50 
  },
  "settled": {
    dict: "happiness", word: "settled", stem: "settl", anew: "fall",
    avg: [ 4.70, 5.74 ], std: [ 2.48, 1.55 ], fq: 50 
  },
  "showed": {
    dict: "happiness", word: "showed", stem: "show", anew: "present",
    avg: [ 5.12, 5.74 ], std: [ 2.39, 1.01 ], fq: 50 
  },
  "spare": {
    dict: "happiness", word: "spare", stem: "spare", anew: "plain",
    avg: [ 3.52, 5.74 ], std: [ 2.05, 1.51 ], fq: 50 
  },
  "suits": {
    dict: "happiness", word: "suits", stem: "suit", anew: "lawsuit",
    avg: [ 4.93, 5.74 ], std: [ 2.44, 1.01 ], fq: 50 
  },
  "swag": {
    dict: "happiness", word: "swag", stem: "swag", anew: "flag",
    avg: [ 4.60, 5.74 ], std: [ 2.35, 1.19 ], fq: 50 
  },
  "thin": {
    dict: "happiness", word: "thin", stem: "thin", anew: "cut",
    avg: [ 5.00, 5.74 ], std: [ 2.32, 1.38 ], fq: 50 
  },
  "time": {
    dict: "happiness", word: "time", stem: "time", anew: "time",
    avg: [ 4.64, 5.74 ], std: [ 2.75, 1.21 ], fq: 50 
  },
  "training": {
    dict: "happiness", word: "training", stem: "train", anew: "education",
    avg: [ 5.74, 5.74 ], std: [ 2.46, 1.40 ], fq: 50 
  },
  "wives": {
    dict: "happiness", word: "wives", stem: "wive", anew: "wife",
    avg: [ 4.93, 5.74 ], std: [ 2.22, 1.95 ], fq: 50 
  },
  "involves": {
    dict: "happiness", word: "involves", stem: "involv", anew: "affection",
    avg: [ 6.21, 5.73 ], std: [ 2.75, 1.04 ], fq: 50 
  },
  "sphere": {
    dict: "happiness", word: "sphere", stem: "sphere", anew: "sphere",
    avg: [ 3.88, 5.73 ], std: [ 1.99, 1.08 ], fq: 50 
  },
  "shell": {
    dict: "happiness", word: "shell", stem: "shell", anew: "crushed",
    avg: [ 5.52, 5.73 ], std: [ 2.87, 1.36 ], fq: 50 
  },
  "pose": {
    dict: "happiness", word: "pose", stem: "pose", anew: "manner",
    avg: [ 4.56, 5.72 ], std: [ 1.78, 1.19 ], fq: 50 
  },
  "apt": {
    dict: "happiness", word: "apt", stem: "apt", anew: "mind",
    avg: [ 5.00, 5.72 ], std: [ 2.68, 1.18 ], fq: 50 
  },
  "card": {
    dict: "happiness", word: "card", stem: "card", anew: "wit",
    avg: [ 5.42, 5.72 ], std: [ 2.44, 1.13 ], fq: 50 
  },
  "click": {
    dict: "happiness", word: "click", stem: "click", anew: "dawn",
    avg: [ 4.39, 5.72 ], std: [ 2.81, 1.03 ], fq: 50 
  },
  "detailed": {
    dict: "happiness", word: "detailed", stem: "detail", anew: "detail",
    avg: [ 4.10, 5.72 ], std: [ 2.24, 1.50 ], fq: 50 
  },
  "funky": {
    dict: "happiness", word: "funky", stem: "funki", anew: "stink",
    avg: [ 4.26, 5.72 ], std: [ 2.10, 1.68 ], fq: 50 
  },
  "happening": {
    dict: "happiness", word: "happening", stem: "happen", anew: "material",
    avg: [ 4.05, 5.72 ], std: [ 2.34, 1.01 ], fq: 50 
  },
  "hypothesis": {
    dict: "happiness", word: "hypothesis", stem: "hypothesi", anew: "theory",
    avg: [ 4.62, 5.72 ], std: [ 1.94, 1.54 ], fq: 50 
  },
  "implementation": {
    dict: "happiness", word: "implementation", stem: "implement", anew: "execution",
    avg: [ 5.71, 5.72 ], std: [ 2.74, 1.28 ], fq: 50 
  },
  "import": {
    dict: "happiness", word: "import", stem: "import", anew: "moment",
    avg: [ 3.83, 5.72 ], std: [ 2.29, 1.34 ], fq: 50 
  },
  "individual": {
    dict: "happiness", word: "individual", stem: "individu", anew: "person",
    avg: [ 4.19, 5.72 ], std: [ 2.45, 1.37 ], fq: 50 
  },
  "move": {
    dict: "happiness", word: "move", stem: "move", anew: "travel",
    avg: [ 6.21, 5.72 ], std: [ 2.51, 1.36 ], fq: 50 
  },
  "near": {
    dict: "happiness", word: "near", stem: "near", anew: "good",
    avg: [ 5.43, 5.72 ], std: [ 2.85, 1.60 ], fq: 50 
  },
  "plate": {
    dict: "happiness", word: "plate", stem: "plate", anew: "home",
    avg: [ 4.21, 5.72 ], std: [ 2.94, 1.07 ], fq: 50 
  },
  "quietly": {
    dict: "happiness", word: "quietly", stem: "quietli", anew: "quiet",
    avg: [ 2.82, 5.72 ], std: [ 2.13, 1.40 ], fq: 50 
  },
  "roles": {
    dict: "happiness", word: "roles", stem: "role", anew: "useful",
    avg: [ 4.26, 5.72 ], std: [ 2.47, 1.40 ], fq: 50 
  },
  "script": {
    dict: "happiness", word: "script", stem: "script", anew: "book",
    avg: [ 4.17, 5.72 ], std: [ 2.49, 1.74 ], fq: 50 
  },
  "signed": {
    dict: "happiness", word: "signed", stem: "sign", anew: "bless",
    avg: [ 4.05, 5.72 ], std: [ 2.59, 1.09 ], fq: 50 
  },
  "source": {
    dict: "happiness", word: "source", stem: "sourc", anew: "germs",
    avg: [ 4.49, 5.72 ], std: [ 2.24, 1.21 ], fq: 50 
  },
  "stage": {
    dict: "happiness", word: "stage", stem: "stage", anew: "present",
    avg: [ 5.12, 5.72 ], std: [ 2.39, 1.44 ], fq: 50 
  },
  "taxi": {
    dict: "happiness", word: "taxi", stem: "taxi", anew: "taxi",
    avg: [ 3.41, 5.72 ], std: [ 2.14, 1.26 ], fq: 50 
  },
  "uses": {
    dict: "happiness", word: "uses", stem: "use", anew: "useful",
    avg: [ 4.26, 5.72 ], std: [ 2.47, 1.16 ], fq: 50 
  },
  "view": {
    dict: "happiness", word: "view", stem: "view", anew: "sentiment",
    avg: [ 4.41, 5.72 ], std: [ 2.30, 1.13 ], fq: 50 
  },
  "waking": {
    dict: "happiness", word: "waking", stem: "wake", anew: "aroused",
    avg: [ 6.63, 5.72 ], std: [ 2.70, 1.46 ], fq: 50 
  },
  "contains": {
    dict: "happiness", word: "contains", stem: "contain", anew: "controlling",
    avg: [ 6.10, 5.71 ], std: [ 2.19, 1.21 ], fq: 50 
  },
  "employer": {
    dict: "happiness", word: "employer", stem: "employ", anew: "employment",
    avg: [ 5.28, 5.71 ], std: [ 2.12, 1.72 ], fq: 50 
  },
  "opinions": {
    dict: "happiness", word: "opinions", stem: "opinion", anew: "opinion",
    avg: [ 4.89, 5.71 ], std: [ 2.46, 1.54 ], fq: 50 
  },
  "hears": {
    dict: "happiness", word: "hears", stem: "hear", anew: "learn",
    avg: [ 5.39, 5.71 ], std: [ 2.22, 1.38 ], fq: 50 
  },
  "scope": {
    dict: "happiness", word: "scope", stem: "scope", anew: "ambition",
    avg: [ 5.61, 5.71 ], std: [ 2.92, 1.41 ], fq: 50 
  },
  "soil": {
    dict: "happiness", word: "soil", stem: "soil", anew: "filth",
    avg: [ 5.12, 5.71 ], std: [ 2.32, 1.65 ], fq: 50 
  },
  "timber": {
    dict: "happiness", word: "timber", stem: "timber", anew: "quality",
    avg: [ 4.48, 5.71 ], std: [ 2.12, 1.50 ], fq: 50 
  },
  "appointed": {
    dict: "happiness", word: "appointed", stem: "appoint", anew: "name",
    avg: [ 4.25, 5.70 ], std: [ 2.47, 1.42 ], fq: 50 
  },
  "arrangements": {
    dict: "happiness", word: "arrangements", stem: "arrang", anew: "agreement",
    avg: [ 5.02, 5.70 ], std: [ 2.24, 1.23 ], fq: 50 
  },
  "banner": {
    dict: "happiness", word: "banner", stem: "banner", anew: "banner",
    avg: [ 3.83, 5.70 ], std: [ 1.95, 1.04 ], fq: 50 
  },
  "churches": {
    dict: "happiness", word: "churches", stem: "church", anew: "church",
    avg: [ 4.34, 5.70 ], std: [ 2.45, 2.46 ], fq: 50 
  },
  "contain": {
    dict: "happiness", word: "contain", stem: "contain", anew: "controlling",
    avg: [ 6.10, 5.70 ], std: [ 2.19, 1.18 ], fq: 50 
  },
  "demonstrated": {
    dict: "happiness", word: "demonstrated", stem: "demonstr", anew: "present",
    avg: [ 5.12, 5.70 ], std: [ 2.39, 1.15 ], fq: 50 
  },
  "engine": {
    dict: "happiness", word: "engine", stem: "engin", anew: "engine",
    avg: [ 3.98, 5.70 ], std: [ 2.33, 1.23 ], fq: 50 
  },
  "feeling": {
    dict: "happiness", word: "feeling", stem: "feel", anew: "finger",
    avg: [ 3.78, 5.70 ], std: [ 2.42, 1.52 ], fq: 50 
  },
  "fill": {
    dict: "happiness", word: "fill", stem: "fill", anew: "satisfied",
    avg: [ 4.94, 5.70 ], std: [ 2.63, 1.23 ], fq: 50 
  },
  "hat": {
    dict: "happiness", word: "hat", stem: "hat", anew: "hat",
    avg: [ 4.10, 5.70 ], std: [ 2.00, 1.30 ], fq: 50 
  },
  "hold": {
    dict: "happiness", word: "hold", stem: "hold", anew: "controlling",
    avg: [ 6.10, 5.70 ], std: [ 2.19, 1.22 ], fq: 50 
  },
  "identical": {
    dict: "happiness", word: "identical", stem: "ident", anew: "identity",
    avg: [ 4.95, 5.70 ], std: [ 2.24, 1.47 ], fq: 50 
  },
  "journal": {
    dict: "happiness", word: "journal", stem: "journal", anew: "journal",
    avg: [ 4.05, 5.70 ], std: [ 1.96, 1.31 ], fq: 50 
  },
  "master": {
    dict: "happiness", word: "master", stem: "master", anew: "masterful",
    avg: [ 5.20, 5.70 ], std: [ 2.85, 1.52 ], fq: 50 
  },
  "mild": {
    dict: "happiness", word: "mild", stem: "mild", anew: "soft",
    avg: [ 4.63, 5.70 ], std: [ 2.61, 1.50 ], fq: 50 
  },
  "placing": {
    dict: "happiness", word: "placing", stem: "place", anew: "invest",
    avg: [ 5.12, 5.70 ], std: [ 2.42, 1.13 ], fq: 50 
  },
  "rally": {
    dict: "happiness", word: "rally", stem: "ralli", anew: "mobility",
    avg: [ 5.00, 5.70 ], std: [ 2.18, 1.25 ], fq: 50 
  },
  "rolling": {
    dict: "happiness", word: "rolling", stem: "roll", anew: "revolver",
    avg: [ 5.55, 5.70 ], std: [ 2.39, 1.25 ], fq: 50 
  },
  "running": {
    dict: "happiness", word: "running", stem: "run", anew: "execution",
    avg: [ 5.71, 5.70 ], std: [ 2.74, 1.50 ], fq: 50 
  },
  "thumb": {
    dict: "happiness", word: "thumb", stem: "thumb", anew: "finger",
    avg: [ 3.78, 5.70 ], std: [ 2.42, 1.36 ], fq: 50 
  },
  "want": {
    dict: "happiness", word: "want", stem: "want", anew: "wish",
    avg: [ 5.16, 5.70 ], std: [ 2.62, 1.34 ], fq: 50 
  },
  "watch": {
    dict: "happiness", word: "watch", stem: "watch", anew: "watch",
    avg: [ 4.10, 5.70 ], std: [ 2.12, 1.25 ], fq: 50 
  },
  "whites": {
    dict: "happiness", word: "whites", stem: "white", anew: "white",
    avg: [ 4.37, 5.70 ], std: [ 2.14, 1.22 ], fq: 50 
  },
  "written": {
    dict: "happiness", word: "written", stem: "written", anew: "save",
    avg: [ 4.95, 5.70 ], std: [ 2.19, 1.27 ], fq: 50 
  },
  "determining": {
    dict: "happiness", word: "determining", stem: "determin", anew: "mold",
    avg: [ 4.07, 5.69 ], std: [ 1.98, 1.34 ], fq: 50 
  },
  "dusk": {
    dict: "happiness", word: "dusk", stem: "dusk", anew: "fall",
    avg: [ 4.70, 5.69 ], std: [ 2.48, 1.63 ], fq: 50 
  },
  "angles": {
    dict: "happiness", word: "angles", stem: "angl", anew: "fish",
    avg: [ 4.00, 5.68 ], std: [ 2.19, 1.35 ], fq: 50 
  },
  "avenue": {
    dict: "happiness", word: "avenue", stem: "avenu", anew: "avenue",
    avg: [ 4.12, 5.68 ], std: [ 2.01, 1.17 ], fq: 50 
  },
  "bars": {
    dict: "happiness", word: "bars", stem: "bar", anew: "bar",
    avg: [ 5.00, 5.68 ], std: [ 2.83, 1.58 ], fq: 50 
  },
  "broadcasting": {
    dict: "happiness", word: "broadcasting", stem: "broadcast", anew: "air",
    avg: [ 4.12, 5.68 ], std: [ 2.30, 1.32 ], fq: 50 
  },
  "cabinet": {
    dict: "happiness", word: "cabinet", stem: "cabinet", anew: "cabinet",
    avg: [ 3.43, 5.68 ], std: [ 1.85, 1.13 ], fq: 50 
  },
  "character": {
    dict: "happiness", word: "character", stem: "charact", anew: "quality",
    avg: [ 4.48, 5.68 ], std: [ 2.12, 1.49 ], fq: 50 
  },
  "direct": {
    dict: "happiness", word: "direct", stem: "direct", anew: "engine",
    avg: [ 3.98, 5.68 ], std: [ 2.33, 1.33 ], fq: 50 
  },
  "emphasis": {
    dict: "happiness", word: "emphasis", stem: "emphasi", anew: "stress",
    avg: [ 7.45, 5.68 ], std: [ 2.38, 1.00 ], fq: 50 
  },
  "foreign": {
    dict: "happiness", word: "foreign", stem: "foreign", anew: "alien",
    avg: [ 5.45, 5.68 ], std: [ 2.15, 1.70 ], fq: 50 
  },
  "getting": {
    dict: "happiness", word: "getting", stem: "get", anew: "father",
    avg: [ 5.92, 5.68 ], std: [ 2.60, 1.19 ], fq: 50 
  },
  "grounds": {
    dict: "happiness", word: "grounds", stem: "ground", anew: "earth",
    avg: [ 4.24, 5.68 ], std: [ 2.49, 1.24 ], fq: 50 
  },
  "machines": {
    dict: "happiness", word: "machines", stem: "machin", anew: "machine",
    avg: [ 3.82, 5.68 ], std: [ 2.40, 1.30 ], fq: 50 
  },
  "mars": {
    dict: "happiness", word: "mars", stem: "mar", anew: "impair",
    avg: [ 4.04, 5.68 ], std: [ 2.14, 0.96 ], fq: 50 
  },
  "moment": {
    dict: "happiness", word: "moment", stem: "moment", anew: "moment",
    avg: [ 3.83, 5.68 ], std: [ 2.29, 1.11 ], fq: 50 
  },
  "moves": {
    dict: "happiness", word: "moves", stem: "move", anew: "travel",
    avg: [ 6.21, 5.68 ], std: [ 2.51, 0.96 ], fq: 50 
  },
  "publicity": {
    dict: "happiness", word: "publicity", stem: "public", anew: "promotion",
    avg: [ 6.44, 5.68 ], std: [ 2.58, 1.38 ], fq: 50 
  },
  "pursue": {
    dict: "happiness", word: "pursue", stem: "pursu", anew: "engaged",
    avg: [ 6.77, 5.68 ], std: [ 2.07, 1.48 ], fq: 50 
  },
  "response": {
    dict: "happiness", word: "response", stem: "respons", anew: "answer",
    avg: [ 5.41, 5.68 ], std: [ 2.43, 1.27 ], fq: 50 
  },
  "role": {
    dict: "happiness", word: "role", stem: "role", anew: "useful",
    avg: [ 4.26, 5.68 ], std: [ 2.47, 0.89 ], fq: 50 
  },
  "sitting": {
    dict: "happiness", word: "sitting", stem: "sit", anew: "seat",
    avg: [ 2.95, 5.68 ], std: [ 1.72, 1.10 ], fq: 50 
  },
  "suggests": {
    dict: "happiness", word: "suggests", stem: "suggest", anew: "intimate",
    avg: [ 6.98, 5.68 ], std: [ 2.21, 0.94 ], fq: 50 
  },
  "saddle": {
    dict: "happiness", word: "saddle", stem: "saddl", anew: "burdened",
    avg: [ 5.63, 5.67 ], std: [ 2.07, 1.45 ], fq: 50 
  },
  "samples": {
    dict: "happiness", word: "samples", stem: "sampl", anew: "taste",
    avg: [ 5.22, 5.67 ], std: [ 2.38, 1.20 ], fq: 50 
  },
  "tail": {
    dict: "happiness", word: "tail", stem: "tail", anew: "shadow",
    avg: [ 4.30, 5.67 ], std: [ 2.26, 1.51 ], fq: 50 
  },
  "evident": {
    dict: "happiness", word: "evident", stem: "evid", anew: "patent",
    avg: [ 3.50, 5.67 ], std: [ 1.84, 1.32 ], fq: 50 
  },
  "absorbed": {
    dict: "happiness", word: "absorbed", stem: "absorb", anew: "engaged",
    avg: [ 6.77, 5.66 ], std: [ 2.07, 1.48 ], fq: 50 
  },
  "aspect": {
    dict: "happiness", word: "aspect", stem: "aspect", anew: "face",
    avg: [ 5.04, 5.66 ], std: [ 2.18, 1.06 ], fq: 50 
  },
  "auto": {
    dict: "happiness", word: "auto", stem: "auto", anew: "machine",
    avg: [ 3.82, 5.66 ], std: [ 2.40, 1.59 ], fq: 50 
  },
  "blue": {
    dict: "happiness", word: "blue", stem: "blue", anew: "blue",
    avg: [ 4.31, 5.66 ], std: [ 2.20, 1.93 ], fq: 50 
  },
  "bold": {
    dict: "happiness", word: "bold", stem: "bold", anew: "bold",
    avg: [ 5.60, 5.66 ], std: [ 2.21, 1.79 ], fq: 50 
  },
  "customer": {
    dict: "happiness", word: "customer", stem: "custom", anew: "custom",
    avg: [ 4.66, 5.66 ], std: [ 2.12, 1.69 ], fq: 50 
  },
  "describe": {
    dict: "happiness", word: "describe", stem: "describ", anew: "key",
    avg: [ 3.70, 5.66 ], std: [ 2.18, 1.08 ], fq: 50 
  },
  "digest": {
    dict: "happiness", word: "digest", stem: "digest", anew: "concentrate",
    avg: [ 4.65, 5.66 ], std: [ 2.13, 1.49 ], fq: 50 
  },
  "entrance": {
    dict: "happiness", word: "entrance", stem: "entranc", anew: "fascinate",
    avg: [ 5.83, 5.66 ], std: [ 2.73, 0.80 ], fq: 50 
  },
  "follow": {
    dict: "happiness", word: "follow", stem: "follow", anew: "watch",
    avg: [ 4.10, 5.66 ], std: [ 2.12, 1.17 ], fq: 50 
  },
  "foundation": {
    dict: "happiness", word: "foundation", stem: "foundat", anew: "foot",
    avg: [ 3.27, 5.66 ], std: [ 1.98, 1.36 ], fq: 50 
  },
  "manufacturing": {
    dict: "happiness", word: "manufacturing", stem: "manufactur", anew: "fabric",
    avg: [ 4.14, 5.66 ], std: [ 1.98, 1.35 ], fq: 50 
  },
  "members": {
    dict: "happiness", word: "members", stem: "member", anew: "penis",
    avg: [ 5.54, 5.66 ], std: [ 2.63, 1.22 ], fq: 50 
  },
  "occupy": {
    dict: "happiness", word: "occupy", stem: "occupi", anew: "engaged",
    avg: [ 6.77, 5.66 ], std: [ 2.07, 1.56 ], fq: 50 
  },
  "passed": {
    dict: "happiness", word: "passed", stem: "pass", anew: "hand",
    avg: [ 4.40, 5.66 ], std: [ 2.07, 2.06 ], fq: 50 
  },
  "practices": {
    dict: "happiness", word: "practices", stem: "practic", anew: "useful",
    avg: [ 4.26, 5.66 ], std: [ 2.47, 1.32 ], fq: 50 
  },
  "prepare": {
    dict: "happiness", word: "prepare", stem: "prepar", anew: "machine",
    avg: [ 3.82, 5.66 ], std: [ 2.40, 1.48 ], fq: 50 
  },
  "regard": {
    dict: "happiness", word: "regard", stem: "regard", anew: "wish",
    avg: [ 5.16, 5.66 ], std: [ 2.62, 1.02 ], fq: 50 
  },
  "rode": {
    dict: "happiness", word: "rode", stem: "rode", anew: "tease",
    avg: [ 5.87, 5.66 ], std: [ 2.56, 1.12 ], fq: 50 
  },
  "roll": {
    dict: "happiness", word: "roll", stem: "roll", anew: "bowl",
    avg: [ 3.47, 5.66 ], std: [ 2.12, 1.06 ], fq: 50 
  },
  "rugged": {
    dict: "happiness", word: "rugged", stem: "rug", anew: "broken",
    avg: [ 5.43, 5.66 ], std: [ 2.42, 1.67 ], fq: 50 
  },
  "sake": {
    dict: "happiness", word: "sake", stem: "sake", anew: "interest",
    avg: [ 5.66, 5.66 ], std: [ 2.26, 1.47 ], fq: 50 
  },
  "served": {
    dict: "happiness", word: "served", stem: "serv", anew: "answer",
    avg: [ 5.41, 5.66 ], std: [ 2.43, 1.24 ], fq: 50 
  },
  "several": {
    dict: "happiness", word: "several", stem: "sever", anew: "severe",
    avg: [ 5.26, 5.66 ], std: [ 2.36, 0.92 ], fq: 50 
  },
  "sign": {
    dict: "happiness", word: "sign", stem: "sign", anew: "house",
    avg: [ 4.56, 5.66 ], std: [ 2.41, 1.29 ], fq: 50 
  },
  "timing": {
    dict: "happiness", word: "timing", stem: "time", anew: "time",
    avg: [ 4.64, 5.66 ], std: [ 2.75, 1.15 ], fq: 50 
  },
  "tongues": {
    dict: "happiness", word: "tongues", stem: "tongu", anew: "knife",
    avg: [ 5.80, 5.66 ], std: [ 2.00, 1.35 ], fq: 50 
  },
  "tower": {
    dict: "happiness", word: "tower", stem: "tower", anew: "tower",
    avg: [ 3.95, 5.66 ], std: [ 2.28, 1.41 ], fq: 50 
  },
  "verse": {
    dict: "happiness", word: "verse", stem: "vers", anew: "poetry",
    avg: [ 4.00, 5.66 ], std: [ 2.85, 1.36 ], fq: 50 
  },
  "explains": {
    dict: "happiness", word: "explains", stem: "explain", anew: "excuse",
    avg: [ 4.48, 5.66 ], std: [ 2.29, 1.52 ], fq: 50 
  },
  "doorway": {
    dict: "happiness", word: "doorway", stem: "doorway", anew: "door",
    avg: [ 3.80, 5.65 ], std: [ 2.29, 1.15 ], fq: 50 
  },
  "height": {
    dict: "happiness", word: "height", stem: "height", anew: "elevator",
    avg: [ 4.16, 5.65 ], std: [ 1.99, 1.41 ], fq: 50 
  },
  "influenced": {
    dict: "happiness", word: "influenced", stem: "influenc", anew: "charm",
    avg: [ 5.16, 5.65 ], std: [ 2.25, 1.47 ], fq: 50 
  },
  "phases": {
    dict: "happiness", word: "phases", stem: "phase", anew: "phase",
    avg: [ 3.98, 5.65 ], std: [ 1.82, 1.09 ], fq: 50 
  },
  "consisting": {
    dict: "happiness", word: "consisting", stem: "consist", anew: "lie",
    avg: [ 5.96, 5.65 ], std: [ 2.63, 1.18 ], fq: 50 
  },
  "asterisk": {
    dict: "happiness", word: "asterisk", stem: "asterisk", anew: "star",
    avg: [ 5.83, 5.64 ], std: [ 2.44, 1.21 ], fq: 50 
  },
  "closely": {
    dict: "happiness", word: "closely", stem: "close", anew: "intimate",
    avg: [ 6.98, 5.64 ], std: [ 2.21, 1.52 ], fq: 50 
  },
  "commons": {
    dict: "happiness", word: "commons", stem: "common", anew: "green",
    avg: [ 4.28, 5.64 ], std: [ 2.46, 1.35 ], fq: 50 
  },
  "competition": {
    dict: "happiness", word: "competition", stem: "competit", anew: "contents",
    avg: [ 4.32, 5.64 ], std: [ 2.14, 1.70 ], fq: 50 
  },
  "construction": {
    dict: "happiness", word: "construction", stem: "construct", anew: "building",
    avg: [ 3.92, 5.64 ], std: [ 1.94, 1.54 ], fq: 50 
  },
  "entitled": {
    dict: "happiness", word: "entitled", stem: "entitl", anew: "gentle",
    avg: [ 3.21, 5.64 ], std: [ 2.57, 1.51 ], fq: 50 
  },
  "guess": {
    dict: "happiness", word: "guess", stem: "guess", anew: "imagine",
    avg: [ 5.98, 5.64 ], std: [ 2.14, 1.08 ], fq: 50 
  },
  "handful": {
    dict: "happiness", word: "handful", stem: "hand", anew: "hand",
    avg: [ 4.40, 5.64 ], std: [ 2.07, 1.26 ], fq: 50 
  },
  "heads": {
    dict: "happiness", word: "heads", stem: "head", anew: "mind",
    avg: [ 5.00, 5.64 ], std: [ 2.68, 1.05 ], fq: 50 
  },
  "heights": {
    dict: "happiness", word: "heights", stem: "height", anew: "elevator",
    avg: [ 4.16, 5.64 ], std: [ 1.99, 1.64 ], fq: 50 
  },
  "holding": {
    dict: "happiness", word: "holding", stem: "hold", anew: "controlling",
    avg: [ 6.10, 5.64 ], std: [ 2.19, 1.12 ], fq: 50 
  },
  "influence": {
    dict: "happiness", word: "influence", stem: "influenc", anew: "charm",
    avg: [ 5.16, 5.64 ], std: [ 2.25, 1.24 ], fq: 50 
  },
  "involvement": {
    dict: "happiness", word: "involvement", stem: "involv", anew: "engaged",
    avg: [ 6.77, 5.64 ], std: [ 2.07, 1.37 ], fq: 50 
  },
  "layer": {
    dict: "happiness", word: "layer", stem: "layer", anew: "bed",
    avg: [ 3.61, 5.64 ], std: [ 2.56, 1.16 ], fq: 50 
  },
  "lit": {
    dict: "happiness", word: "lit", stem: "lit", anew: "fall",
    avg: [ 4.70, 5.64 ], std: [ 2.48, 1.31 ], fq: 50 
  },
  "portions": {
    dict: "happiness", word: "portions", stem: "portion", anew: "part",
    avg: [ 3.82, 5.64 ], std: [ 2.24, 1.26 ], fq: 50 
  },
  "presidents": {
    dict: "happiness", word: "presidents", stem: "presid", anew: "chair",
    avg: [ 3.15, 5.64 ], std: [ 1.77, 1.57 ], fq: 50 
  },
  "purposes": {
    dict: "happiness", word: "purposes", stem: "purpos", anew: "useful",
    avg: [ 4.26, 5.64 ], std: [ 2.47, 1.45 ], fq: 50 
  },
  "serving": {
    dict: "happiness", word: "serving", stem: "serv", anew: "answer",
    avg: [ 5.41, 5.64 ], std: [ 2.43, 1.35 ], fq: 50 
  },
  "sheets": {
    dict: "happiness", word: "sheets", stem: "sheet", anew: "plane",
    avg: [ 6.14, 5.64 ], std: [ 2.39, 1.06 ], fq: 50 
  },
  "streets": {
    dict: "happiness", word: "streets", stem: "street", anew: "street",
    avg: [ 3.39, 5.64 ], std: [ 1.87, 1.24 ], fq: 50 
  },
  "trend": {
    dict: "happiness", word: "trend", stem: "trend", anew: "cut",
    avg: [ 5.00, 5.64 ], std: [ 2.32, 1.17 ], fq: 50 
  },
  "use": {
    dict: "happiness", word: "use", stem: "use", anew: "useful",
    avg: [ 4.26, 5.64 ], std: [ 2.47, 1.16 ], fq: 50 
  },
  "venture": {
    dict: "happiness", word: "venture", stem: "ventur", anew: "adventure",
    avg: [ 6.98, 5.64 ], std: [ 2.15, 1.32 ], fq: 50 
  },
  "wrote": {
    dict: "happiness", word: "wrote", stem: "wrote", anew: "save",
    avg: [ 4.95, 5.64 ], std: [ 2.19, 1.34 ], fq: 50 
  },
  "spaces": {
    dict: "happiness", word: "spaces", stem: "space", anew: "space",
    avg: [ 5.14, 5.62 ], std: [ 2.54, 1.02 ], fq: 50 
  },
  "accent": {
    dict: "happiness", word: "accent", stem: "accent", anew: "stress",
    avg: [ 7.45, 5.62 ], std: [ 2.38, 1.03 ], fq: 50 
  },
  "appeal": {
    dict: "happiness", word: "appeal", stem: "appeal", anew: "charm",
    avg: [ 5.16, 5.62 ], std: [ 2.25, 1.51 ], fq: 50 
  },
  "bottle": {
    dict: "happiness", word: "bottle", stem: "bottl", anew: "bottle",
    avg: [ 4.79, 5.62 ], std: [ 2.44, 1.34 ], fq: 50 
  },
  "buildings": {
    dict: "happiness", word: "buildings", stem: "build", anew: "building",
    avg: [ 3.92, 5.62 ], std: [ 1.94, 1.40 ], fq: 50 
  },
  "catching": {
    dict: "happiness", word: "catching", stem: "catch", anew: "fascinate",
    avg: [ 5.83, 5.62 ], std: [ 2.73, 1.23 ], fq: 50 
  },
  "clock": {
    dict: "happiness", word: "clock", stem: "clock", anew: "clock",
    avg: [ 4.02, 5.62 ], std: [ 2.54, 0.99 ], fq: 50 
  },
  "cloud": {
    dict: "happiness", word: "cloud", stem: "cloud", anew: "clouds",
    avg: [ 3.30, 5.62 ], std: [ 2.08, 1.85 ], fq: 50 
  },
  "comments": {
    dict: "happiness", word: "comments", stem: "comment", anew: "gossip",
    avg: [ 5.74, 5.62 ], std: [ 2.38, 1.05 ], fq: 50 
  },
  "describing": {
    dict: "happiness", word: "describing", stem: "describ", anew: "key",
    avg: [ 3.70, 5.62 ], std: [ 2.18, 1.32 ], fq: 50 
  },
  "display": {
    dict: "happiness", word: "display", stem: "display", anew: "present",
    avg: [ 5.12, 5.62 ], std: [ 2.39, 0.92 ], fq: 50 
  },
  "fry": {
    dict: "happiness", word: "fry", stem: "fri", anew: "child",
    avg: [ 5.55, 5.62 ], std: [ 2.29, 1.83 ], fq: 50 
  },
  "leaves": {
    dict: "happiness", word: "leaves", stem: "leav", anew: "part",
    avg: [ 3.82, 5.62 ], std: [ 2.24, 1.79 ], fq: 50 
  },
  "material": {
    dict: "happiness", word: "material", stem: "materi", anew: "material",
    avg: [ 4.05, 5.62 ], std: [ 2.34, 0.92 ], fq: 50 
  },
  "pitch": {
    dict: "happiness", word: "pitch", stem: "pitch", anew: "sky",
    avg: [ 4.27, 5.62 ], std: [ 2.17, 1.35 ], fq: 50 
  },
  "poll": {
    dict: "happiness", word: "poll", stem: "poll", anew: "crown",
    avg: [ 4.28, 5.62 ], std: [ 2.53, 1.34 ], fq: 50 
  },
  "referred": {
    dict: "happiness", word: "referred", stem: "refer", anew: "name",
    avg: [ 4.25, 5.62 ], std: [ 2.47, 0.99 ], fq: 50 
  },
  "reply": {
    dict: "happiness", word: "reply", stem: "repli", anew: "answer",
    avg: [ 5.41, 5.62 ], std: [ 2.43, 1.32 ], fq: 50 
  },
  "runs": {
    dict: "happiness", word: "runs", stem: "run", anew: "execution",
    avg: [ 5.71, 5.62 ], std: [ 2.74, 1.28 ], fq: 50 
  },
  "sells": {
    dict: "happiness", word: "sells", stem: "sell", anew: "betray",
    avg: [ 7.24, 5.62 ], std: [ 2.06, 1.32 ], fq: 50 
  },
  "snowed": {
    dict: "happiness", word: "snowed", stem: "snow", anew: "snow",
    avg: [ 5.75, 5.62 ], std: [ 2.47, 2.03 ], fq: 50 
  },
  "status": {
    dict: "happiness", word: "status", stem: "statu", anew: "statue",
    avg: [ 3.46, 5.62 ], std: [ 1.72, 1.18 ], fq: 50 
  },
  "tub": {
    dict: "happiness", word: "tub", stem: "tub", anew: "bathtub",
    avg: [ 4.36, 5.62 ], std: [ 2.59, 1.64 ], fq: 50 
  },
  "watches": {
    dict: "happiness", word: "watches", stem: "watch", anew: "watch",
    avg: [ 4.10, 5.62 ], std: [ 2.12, 1.51 ], fq: 50 
  },
  "address": {
    dict: "happiness", word: "address", stem: "address", anew: "treat",
    avg: [ 5.62, 5.60 ], std: [ 2.25, 1.05 ], fq: 50 
  },
  "apparent": {
    dict: "happiness", word: "apparent", stem: "appar", anew: "patent",
    avg: [ 3.50, 5.60 ], std: [ 1.84, 1.07 ], fq: 50 
  },
  "arranged": {
    dict: "happiness", word: "arranged", stem: "arrang", anew: "dress",
    avg: [ 4.05, 5.60 ], std: [ 1.89, 1.34 ], fq: 50 
  },
  "assembly": {
    dict: "happiness", word: "assembly", stem: "assembl", anew: "fabric",
    avg: [ 4.14, 5.60 ], std: [ 1.98, 1.09 ], fq: 50 
  },
  "bathroom": {
    dict: "happiness", word: "bathroom", stem: "bathroom", anew: "bathroom",
    avg: [ 3.88, 5.60 ], std: [ 1.72, 1.32 ], fq: 50 
  },
  "bees": {
    dict: "happiness", word: "bees", stem: "bee", anew: "bees",
    avg: [ 6.51, 5.60 ], std: [ 2.14, 2.14 ], fq: 50 
  },
  "called": {
    dict: "happiness", word: "called", stem: "call", anew: "name",
    avg: [ 4.25, 5.60 ], std: [ 2.47, 1.11 ], fq: 50 
  },
  "centers": {
    dict: "happiness", word: "centers", stem: "center", anew: "heart",
    avg: [ 6.34, 5.60 ], std: [ 2.25, 0.90 ], fq: 50 
  },
  "central": {
    dict: "happiness", word: "central", stem: "central", anew: "key",
    avg: [ 3.70, 5.60 ], std: [ 2.18, 0.88 ], fq: 50 
  },
  "columns": {
    dict: "happiness", word: "columns", stem: "column", anew: "column",
    avg: [ 3.62, 5.60 ], std: [ 1.91, 1.20 ], fq: 50 
  },
  "combined": {
    dict: "happiness", word: "combined", stem: "combin", anew: "unit",
    avg: [ 3.75, 5.60 ], std: [ 2.49, 1.11 ], fq: 50 
  },
  "covers": {
    dict: "happiness", word: "covers", stem: "cover", anew: "hide",
    avg: [ 5.28, 5.60 ], std: [ 2.51, 0.99 ], fq: 50 
  },
  "entirely": {
    dict: "happiness", word: "entirely", stem: "entir", anew: "alone",
    avg: [ 4.83, 5.60 ], std: [ 2.66, 1.14 ], fq: 50 
  },
  "function": {
    dict: "happiness", word: "function", stem: "function", anew: "useful",
    avg: [ 4.26, 5.60 ], std: [ 2.47, 1.46 ], fq: 50 
  },
  "got": {
    dict: "happiness", word: "got", stem: "got", anew: "father",
    avg: [ 5.92, 5.60 ], std: [ 2.60, 1.46 ], fq: 50 
  },
  "idol": {
    dict: "happiness", word: "idol", stem: "idol", anew: "idol",
    avg: [ 4.95, 5.60 ], std: [ 2.14, 1.47 ], fq: 50 
  },
  "immediate": {
    dict: "happiness", word: "immediate", stem: "immedi", anew: "quick",
    avg: [ 6.57, 5.60 ], std: [ 1.78, 1.67 ], fq: 50 
  },
  "involving": {
    dict: "happiness", word: "involving", stem: "involv", anew: "affection",
    avg: [ 6.21, 5.60 ], std: [ 2.75, 1.34 ], fq: 50 
  },
  "layers": {
    dict: "happiness", word: "layers", stem: "layer", anew: "bed",
    avg: [ 3.61, 5.60 ], std: [ 2.56, 1.31 ], fq: 50 
  },
  "level": {
    dict: "happiness", word: "level", stem: "level", anew: "plane",
    avg: [ 6.14, 5.60 ], std: [ 2.39, 0.99 ], fq: 50 
  },
  "links": {
    dict: "happiness", word: "links", stem: "link", anew: "unit",
    avg: [ 3.75, 5.60 ], std: [ 2.49, 1.16 ], fq: 50 
  },
  "news": {
    dict: "happiness", word: "news", stem: "news", anew: "news",
    avg: [ 5.17, 5.60 ], std: [ 2.11, 1.55 ], fq: 50 
  },
  "outcome": {
    dict: "happiness", word: "outcome", stem: "outcom", anew: "event",
    avg: [ 5.10, 5.60 ], std: [ 2.40, 1.14 ], fq: 50 
  },
  "patent": {
    dict: "happiness", word: "patent", stem: "patent", anew: "patent",
    avg: [ 3.50, 5.60 ], std: [ 1.84, 1.62 ], fq: 50 
  },
  "pick": {
    dict: "happiness", word: "pick", stem: "pick", anew: "option",
    avg: [ 4.74, 5.60 ], std: [ 2.23, 0.97 ], fq: 50 
  },
  "priest": {
    dict: "happiness", word: "priest", stem: "priest", anew: "priest",
    avg: [ 4.41, 5.60 ], std: [ 2.71, 1.70 ], fq: 50 
  },
  "reaching": {
    dict: "happiness", word: "reaching", stem: "reach", anew: "hit",
    avg: [ 5.73, 5.60 ], std: [ 2.09, 1.11 ], fq: 50 
  },
  "runner": {
    dict: "happiness", word: "runner", stem: "runner", anew: "runner",
    avg: [ 4.76, 5.60 ], std: [ 2.40, 1.63 ], fq: 50 
  },
  "spell": {
    dict: "happiness", word: "spell", stem: "spell", anew: "charm",
    avg: [ 5.16, 5.60 ], std: [ 2.25, 1.41 ], fq: 50 
  },
  "stand": {
    dict: "happiness", word: "stand", stem: "stand", anew: "stomach",
    avg: [ 3.93, 5.60 ], std: [ 2.49, 1.11 ], fq: 50 
  },
  "suggested": {
    dict: "happiness", word: "suggested", stem: "suggest", anew: "intimate",
    avg: [ 6.98, 5.60 ], std: [ 2.21, 1.25 ], fq: 50 
  },
  "utilities": {
    dict: "happiness", word: "utilities", stem: "util", anew: "useful",
    avg: [ 4.26, 5.60 ], std: [ 2.47, 1.70 ], fq: 50 
  },
  "viewed": {
    dict: "happiness", word: "viewed", stem: "view", anew: "watch",
    avg: [ 4.10, 5.60 ], std: [ 2.12, 1.21 ], fq: 50 
  },
  "constituted": {
    dict: "happiness", word: "constituted", stem: "constitut", anew: "plant",
    avg: [ 3.62, 5.59 ], std: [ 2.25, 1.14 ], fq: 50 
  },
  "sentences": {
    dict: "happiness", word: "sentences", stem: "sentenc", anew: "time",
    avg: [ 4.64, 5.59 ], std: [ 2.75, 1.63 ], fq: 50 
  },
  "habits": {
    dict: "happiness", word: "habits", stem: "habit", anew: "habit",
    avg: [ 3.95, 5.58 ], std: [ 2.11, 1.49 ], fq: 50 
  },
  "appeals": {
    dict: "happiness", word: "appeals", stem: "appeal", anew: "charm",
    avg: [ 5.16, 5.58 ], std: [ 2.25, 1.73 ], fq: 50 
  },
  "bears": {
    dict: "happiness", word: "bears", stem: "bear", anew: "acceptance",
    avg: [ 5.40, 5.58 ], std: [ 2.70, 1.82 ], fq: 50 
  },
  "circle": {
    dict: "happiness", word: "circle", stem: "circl", anew: "circle",
    avg: [ 3.86, 5.58 ], std: [ 2.13, 1.21 ], fq: 50 
  },
  "cities": {
    dict: "happiness", word: "cities", stem: "citi", anew: "city",
    avg: [ 5.24, 5.58 ], std: [ 2.53, 1.50 ], fq: 50 
  },
  "client": {
    dict: "happiness", word: "client", stem: "client", anew: "custom",
    avg: [ 4.66, 5.58 ], std: [ 2.12, 1.18 ], fq: 50 
  },
  "comes": {
    dict: "happiness", word: "comes", stem: "come", anew: "fall",
    avg: [ 4.70, 5.58 ], std: [ 2.48, 0.76 ], fq: 50 
  },
  "comment": {
    dict: "happiness", word: "comment", stem: "comment", anew: "gossip",
    avg: [ 5.74, 5.58 ], std: [ 2.38, 1.28 ], fq: 50 
  },
  "consists": {
    dict: "happiness", word: "consists", stem: "consist", anew: "lie",
    avg: [ 5.96, 5.58 ], std: [ 2.63, 1.36 ], fq: 50 
  },
  "described": {
    dict: "happiness", word: "described", stem: "describ", anew: "key",
    avg: [ 3.70, 5.58 ], std: [ 2.18, 1.14 ], fq: 50 
  },
  "example": {
    dict: "happiness", word: "example", stem: "exampl", anew: "exercise",
    avg: [ 6.84, 5.58 ], std: [ 2.06, 1.07 ], fq: 50 
  },
  "executive": {
    dict: "happiness", word: "executive", stem: "execut", anew: "execution",
    avg: [ 5.71, 5.58 ], std: [ 2.74, 1.67 ], fq: 50 
  },
  "feet": {
    dict: "happiness", word: "feet", stem: "feet", anew: "foot",
    avg: [ 3.27, 5.58 ], std: [ 1.98, 1.26 ], fq: 50 
  },
  "filling": {
    dict: "happiness", word: "filling", stem: "fill", anew: "satisfied",
    avg: [ 4.94, 5.58 ], std: [ 2.63, 1.36 ], fq: 50 
  },
  "fingers": {
    dict: "happiness", word: "fingers", stem: "finger", anew: "finger",
    avg: [ 3.78, 5.58 ], std: [ 2.42, 1.14 ], fq: 50 
  },
  "formed": {
    dict: "happiness", word: "formed", stem: "form", anew: "spring",
    avg: [ 5.67, 5.58 ], std: [ 2.51, 1.16 ], fq: 50 
  },
  "front": {
    dict: "happiness", word: "front", stem: "front", anew: "face",
    avg: [ 5.04, 5.58 ], std: [ 2.18, 1.07 ], fq: 50 
  },
  "identify": {
    dict: "happiness", word: "identify", stem: "identifi", anew: "name",
    avg: [ 4.25, 5.58 ], std: [ 2.47, 1.36 ], fq: 50 
  },
  "intro": {
    dict: "happiness", word: "intro", stem: "intro", anew: "present",
    avg: [ 5.12, 5.58 ], std: [ 2.39, 0.95 ], fq: 50 
  },
  "lay": {
    dict: "happiness", word: "lay", stem: "lay", anew: "lie",
    avg: [ 5.96, 5.58 ], std: [ 2.63, 1.28 ], fq: 50 
  },
  "looked": {
    dict: "happiness", word: "looked", stem: "look", anew: "face",
    avg: [ 5.04, 5.58 ], std: [ 2.18, 1.36 ], fq: 50 
  },
  "lords": {
    dict: "happiness", word: "lords", stem: "lord", anew: "masterful",
    avg: [ 5.20, 5.58 ], std: [ 2.85, 2.14 ], fq: 50 
  },
  "named": {
    dict: "happiness", word: "named", stem: "name", anew: "name",
    avg: [ 4.25, 5.58 ], std: [ 2.47, 0.86 ], fq: 50 
  },
  "pot": {
    dict: "happiness", word: "pot", stem: "pot", anew: "stool",
    avg: [ 4.00, 5.58 ], std: [ 2.14, 1.53 ], fq: 50 
  },
  "pursuit": {
    dict: "happiness", word: "pursuit", stem: "pursuit", anew: "interest",
    avg: [ 5.66, 5.58 ], std: [ 2.26, 1.79 ], fq: 50 
  },
  "recorded": {
    dict: "happiness", word: "recorded", stem: "record", anew: "memory",
    avg: [ 5.42, 5.58 ], std: [ 2.25, 1.20 ], fq: 50 
  },
  "returning": {
    dict: "happiness", word: "returning", stem: "return", anew: "fall",
    avg: [ 4.70, 5.58 ], std: [ 2.48, 1.47 ], fq: 50 
  },
  "rooms": {
    dict: "happiness", word: "rooms", stem: "room", anew: "board",
    avg: [ 3.36, 5.58 ], std: [ 2.12, 0.91 ], fq: 50 
  },
  "seats": {
    dict: "happiness", word: "seats", stem: "seat", anew: "seat",
    avg: [ 2.95, 5.58 ], std: [ 1.72, 1.34 ], fq: 50 
  },
  "set": {
    dict: "happiness", word: "set", stem: "set", anew: "dress",
    avg: [ 4.05, 5.58 ], std: [ 1.89, 1.20 ], fq: 50 
  },
  "shortly": {
    dict: "happiness", word: "shortly", stem: "shortli", anew: "present",
    avg: [ 5.12, 5.58 ], std: [ 2.39, 1.31 ], fq: 50 
  },
  "solely": {
    dict: "happiness", word: "solely", stem: "sole", anew: "alone",
    avg: [ 4.83, 5.58 ], std: [ 2.66, 1.34 ], fq: 50 
  },
  "stuff": {
    dict: "happiness", word: "stuff", stem: "stuff", anew: "material",
    avg: [ 4.05, 5.58 ], std: [ 2.34, 1.50 ], fq: 50 
  },
  "times": {
    dict: "happiness", word: "times", stem: "time", anew: "time",
    avg: [ 4.64, 5.58 ], std: [ 2.75, 1.20 ], fq: 50 
  },
  "trending": {
    dict: "happiness", word: "trending", stem: "trend", anew: "cut",
    avg: [ 5.00, 5.58 ], std: [ 2.32, 1.44 ], fq: 50 
  },
  "tries": {
    dict: "happiness", word: "tries", stem: "tri", anew: "stress",
    avg: [ 7.45, 5.58 ], std: [ 2.38, 1.26 ], fq: 50 
  },
  "density": {
    dict: "happiness", word: "density", stem: "densiti", anew: "concentrate",
    avg: [ 4.65, 5.57 ], std: [ 2.13, 1.20 ], fq: 50 
  },
  "component": {
    dict: "happiness", word: "component", stem: "compon", anew: "part",
    avg: [ 3.82, 5.56 ], std: [ 2.24, 1.11 ], fq: 50 
  },
  "illusion": {
    dict: "happiness", word: "illusion", stem: "illus", anew: "fantasy",
    avg: [ 5.14, 5.56 ], std: [ 2.82, 1.50 ], fq: 50 
  },
  "aspects": {
    dict: "happiness", word: "aspects", stem: "aspect", anew: "face",
    avg: [ 5.04, 5.56 ], std: [ 2.18, 1.40 ], fq: 50 
  },
  "cap": {
    dict: "happiness", word: "cap", stem: "cap", anew: "crown",
    avg: [ 4.28, 5.56 ], std: [ 2.53, 0.93 ], fq: 50 
  },
  "civil": {
    dict: "happiness", word: "civil", stem: "civil", anew: "politeness",
    avg: [ 3.74, 5.56 ], std: [ 2.37, 1.15 ], fq: 50 
  },
  "clients": {
    dict: "happiness", word: "clients", stem: "client", anew: "custom",
    avg: [ 4.66, 5.56 ], std: [ 2.12, 1.20 ], fq: 50 
  },
  "contents": {
    dict: "happiness", word: "contents", stem: "content", anew: "contents",
    avg: [ 4.32, 5.56 ], std: [ 2.14, 0.95 ], fq: 50 
  },
  "forming": {
    dict: "happiness", word: "forming", stem: "form", anew: "spring",
    avg: [ 5.67, 5.56 ], std: [ 2.51, 0.99 ], fq: 50 
  },
  "ink": {
    dict: "happiness", word: "ink", stem: "ink", anew: "ink",
    avg: [ 3.84, 5.56 ], std: [ 1.88, 1.28 ], fq: 50 
  },
  "jumped": {
    dict: "happiness", word: "jumped", stem: "jump", anew: "spring",
    avg: [ 5.67, 5.56 ], std: [ 2.51, 1.34 ], fq: 50 
  },
  "makes": {
    dict: "happiness", word: "makes", stem: "make", anew: "urine",
    avg: [ 4.20, 5.56 ], std: [ 2.18, 1.25 ], fq: 50 
  },
  "matches": {
    dict: "happiness", word: "matches", stem: "match", anew: "couple",
    avg: [ 6.39, 5.56 ], std: [ 2.31, 1.21 ], fq: 50 
  },
  "method": {
    dict: "happiness", word: "method", stem: "method", anew: "method",
    avg: [ 3.85, 5.56 ], std: [ 2.58, 0.91 ], fq: 50 
  },
  "pan": {
    dict: "happiness", word: "pan", stem: "pan", anew: "trash",
    avg: [ 4.16, 5.56 ], std: [ 2.16, 0.84 ], fq: 50 
  },
  "passage": {
    dict: "happiness", word: "passage", stem: "passag", anew: "passage",
    avg: [ 4.36, 5.56 ], std: [ 2.13, 1.15 ], fq: 50 
  },
  "place": {
    dict: "happiness", word: "place", stem: "place", anew: "seat",
    avg: [ 2.95, 5.56 ], std: [ 1.72, 1.20 ], fq: 50 
  },
  "range": {
    dict: "happiness", word: "range", stem: "rang", anew: "stove",
    avg: [ 4.51, 5.56 ], std: [ 2.14, 1.01 ], fq: 50 
  },
  "red": {
    dict: "happiness", word: "red", stem: "red", anew: "red",
    avg: [ 5.29, 5.56 ], std: [ 2.04, 1.62 ], fq: 50 
  },
  "regarding": {
    dict: "happiness", word: "regarding", stem: "regard", anew: "affection",
    avg: [ 6.21, 5.56 ], std: [ 2.75, 1.13 ], fq: 50 
  },
  "rolls": {
    dict: "happiness", word: "rolls", stem: "roll", anew: "bowl",
    avg: [ 3.47, 5.56 ], std: [ 2.12, 1.31 ], fq: 50 
  },
  "solo": {
    dict: "happiness", word: "solo", stem: "solo", anew: "alone",
    avg: [ 4.83, 5.56 ], std: [ 2.66, 1.37 ], fq: 50 
  },
  "stay": {
    dict: "happiness", word: "stay", stem: "stay", anew: "delayed",
    avg: [ 5.62, 5.56 ], std: [ 2.39, 1.16 ], fq: 50 
  },
  "stepping": {
    dict: "happiness", word: "stepping", stem: "step", anew: "abuse",
    avg: [ 6.83, 5.56 ], std: [ 2.70, 0.99 ], fq: 50 
  },
  "studying": {
    dict: "happiness", word: "studying", stem: "studi", anew: "learn",
    avg: [ 5.39, 5.56 ], std: [ 2.22, 2.00 ], fq: 50 
  },
  "substance": {
    dict: "happiness", word: "substance", stem: "substanc", anew: "heart",
    avg: [ 6.34, 5.56 ], std: [ 2.25, 1.11 ], fq: 50 
  },
  "treated": {
    dict: "happiness", word: "treated", stem: "treat", anew: "treat",
    avg: [ 5.62, 5.56 ], std: [ 2.25, 1.64 ], fq: 50 
  },
  "voices": {
    dict: "happiness", word: "voices", stem: "voic", anew: "part",
    avg: [ 3.82, 5.56 ], std: [ 2.24, 1.50 ], fq: 50 
  },
  "woke": {
    dict: "happiness", word: "woke", stem: "woke", anew: "aroused",
    avg: [ 6.63, 5.56 ], std: [ 2.70, 1.42 ], fq: 50 
  },
  "word": {
    dict: "happiness", word: "word", stem: "word", anew: "news",
    avg: [ 5.17, 5.56 ], std: [ 2.11, 1.15 ], fq: 50 
  },
  "working": {
    dict: "happiness", word: "working", stem: "work", anew: "mold",
    avg: [ 4.07, 5.56 ], std: [ 1.98, 1.76 ], fq: 50 
  },
  "calculations": {
    dict: "happiness", word: "calculations", stem: "calcul", anew: "computer",
    avg: [ 4.75, 5.55 ], std: [ 1.93, 1.60 ], fq: 50 
  },
  "tame": {
    dict: "happiness", word: "tame", stem: "tame", anew: "meek",
    avg: [ 3.80, 5.55 ], std: [ 2.13, 1.42 ], fq: 50 
  },
  "acquisitions": {
    dict: "happiness", word: "acquisitions", stem: "acquisit", anew: "learn",
    avg: [ 5.39, 5.54 ], std: [ 2.22, 1.72 ], fq: 50 
  },
  "adam": {
    dict: "happiness", word: "adam", stem: "adam", anew: "ecstasy",
    avg: [ 7.38, 5.54 ], std: [ 1.92, 1.27 ], fq: 50 
  },
  "apparently": {
    dict: "happiness", word: "apparently", stem: "appar", anew: "plain",
    avg: [ 3.52, 5.54 ], std: [ 2.05, 1.11 ], fq: 50 
  },
  "box": {
    dict: "happiness", word: "box", stem: "box", anew: "corner",
    avg: [ 3.91, 5.54 ], std: [ 1.92, 0.89 ], fq: 50 
  },
  "cardinal": {
    dict: "happiness", word: "cardinal", stem: "cardin", anew: "key",
    avg: [ 3.70, 5.54 ], std: [ 2.18, 1.61 ], fq: 50 
  },
  "chest": {
    dict: "happiness", word: "chest", stem: "chest", anew: "breast",
    avg: [ 5.37, 5.54 ], std: [ 2.39, 0.97 ], fq: 50 
  },
  "dame": {
    dict: "happiness", word: "dame", stem: "dame", anew: "doll",
    avg: [ 4.24, 5.54 ], std: [ 2.43, 1.37 ], fq: 50 
  },
  "dealing": {
    dict: "happiness", word: "dealing", stem: "deal", anew: "treat",
    avg: [ 5.62, 5.54 ], std: [ 2.25, 1.16 ], fq: 50 
  },
  "doctors": {
    dict: "happiness", word: "doctors", stem: "doctor", anew: "doctor",
    avg: [ 5.86, 5.54 ], std: [ 2.70, 1.66 ], fq: 50 
  },
  "domain": {
    dict: "happiness", word: "domain", stem: "domain", anew: "sphere",
    avg: [ 3.88, 5.54 ], std: [ 1.99, 1.11 ], fq: 50 
  },
  "firmly": {
    dict: "happiness", word: "firmly", stem: "firmli", anew: "secure",
    avg: [ 3.14, 5.54 ], std: [ 2.47, 1.23 ], fq: 50 
  },
  "frame": {
    dict: "happiness", word: "frame", stem: "frame", anew: "building",
    avg: [ 3.92, 5.54 ], std: [ 1.94, 1.54 ], fq: 50 
  },
  "go": {
    dict: "happiness", word: "go", stem: "go", anew: "ecstasy",
    avg: [ 7.38, 5.54 ], std: [ 1.92, 1.18 ], fq: 50 
  },
  "handle": {
    dict: "happiness", word: "handle", stem: "handl", anew: "treat",
    avg: [ 5.62, 5.54 ], std: [ 2.25, 1.05 ], fq: 50 
  },
  "holdings": {
    dict: "happiness", word: "holdings", stem: "hold", anew: "controlling",
    avg: [ 6.10, 5.54 ], std: [ 2.19, 1.40 ], fq: 50 
  },
  "lap": {
    dict: "happiness", word: "lap", stem: "lap", anew: "circle",
    avg: [ 3.86, 5.54 ], std: [ 2.13, 1.28 ], fq: 50 
  },
  "look": {
    dict: "happiness", word: "look", stem: "look", anew: "spirit",
    avg: [ 5.56, 5.54 ], std: [ 2.62, 1.13 ], fq: 50 
  },
  "materials": {
    dict: "happiness", word: "materials", stem: "materi", anew: "material",
    avg: [ 4.05, 5.54 ], std: [ 2.34, 1.07 ], fq: 50 
  },
  "mount": {
    dict: "happiness", word: "mount", stem: "mount", anew: "mountain",
    avg: [ 5.49, 5.54 ], std: [ 2.43, 1.27 ], fq: 50 
  },
  "mysterious": {
    dict: "happiness", word: "mysterious", stem: "mysteri", anew: "mystic",
    avg: [ 4.84, 5.54 ], std: [ 2.57, 1.67 ], fq: 50 
  },
  "obviously": {
    dict: "happiness", word: "obviously", stem: "obvious", anew: "plain",
    avg: [ 3.52, 5.54 ], std: [ 2.05, 1.27 ], fq: 50 
  },
  "panel": {
    dict: "happiness", word: "panel", stem: "panel", anew: "board",
    avg: [ 3.36, 5.54 ], std: [ 2.12, 1.28 ], fq: 50 
  },
  "particular": {
    dict: "happiness", word: "particular", stem: "particular", anew: "detail",
    avg: [ 4.10, 5.54 ], std: [ 2.24, 1.13 ], fq: 50 
  },
  "person": {
    dict: "happiness", word: "person", stem: "person", anew: "person",
    avg: [ 4.19, 5.54 ], std: [ 2.45, 1.15 ], fq: 50 
  },
  "posted": {
    dict: "happiness", word: "posted", stem: "post", anew: "mail",
    avg: [ 5.63, 5.54 ], std: [ 2.36, 1.13 ], fq: 50 
  },
  "prompted": {
    dict: "happiness", word: "prompted", stem: "prompt", anew: "inspired",
    avg: [ 6.02, 5.54 ], std: [ 2.67, 1.03 ], fq: 50 
  },
  "rating": {
    dict: "happiness", word: "rating", stem: "rate", anew: "betray",
    avg: [ 7.24, 5.54 ], std: [ 2.06, 1.09 ], fq: 50 
  },
  "reason": {
    dict: "happiness", word: "reason", stem: "reason", anew: "intellect",
    avg: [ 4.75, 5.54 ], std: [ 2.50, 1.47 ], fq: 50 
  },
  "regions": {
    dict: "happiness", word: "regions", stem: "region", anew: "part",
    avg: [ 3.82, 5.54 ], std: [ 2.24, 1.11 ], fq: 50 
  },
  "round": {
    dict: "happiness", word: "round", stem: "round", anew: "circle",
    avg: [ 3.86, 5.54 ], std: [ 2.13, 0.95 ], fq: 50 
  },
  "signs": {
    dict: "happiness", word: "signs", stem: "sign", anew: "house",
    avg: [ 4.56, 5.54 ], std: [ 2.41, 0.86 ], fq: 50 
  },
  "sources": {
    dict: "happiness", word: "sources", stem: "sourc", anew: "germs",
    avg: [ 4.49, 5.54 ], std: [ 2.24, 1.23 ], fq: 50 
  },
  "suggesting": {
    dict: "happiness", word: "suggesting", stem: "suggest", anew: "intimate",
    avg: [ 6.98, 5.54 ], std: [ 2.21, 1.20 ], fq: 50 
  },
  "tools": {
    dict: "happiness", word: "tools", stem: "tool", anew: "tool",
    avg: [ 4.33, 5.54 ], std: [ 1.78, 1.42 ], fq: 50 
  },
  "abstract": {
    dict: "happiness", word: "abstract", stem: "abstract", anew: "pinch",
    avg: [ 4.59, 5.53 ], std: [ 2.10, 1.44 ], fq: 50 
  },
  "pipe": {
    dict: "happiness", word: "pipe", stem: "pipe", anew: "shriek",
    avg: [ 5.36, 5.53 ], std: [ 2.91, 1.39 ], fq: 50 
  },
  "rely": {
    dict: "happiness", word: "rely", stem: "reli", anew: "trust",
    avg: [ 5.30, 5.53 ], std: [ 2.66, 1.46 ], fq: 50 
  },
  "sheet": {
    dict: "happiness", word: "sheet", stem: "sheet", anew: "plane",
    avg: [ 6.14, 5.53 ], std: [ 2.39, 1.23 ], fq: 50 
  },
  "sole": {
    dict: "happiness", word: "sole", stem: "sole", anew: "lonely",
    avg: [ 4.51, 5.53 ], std: [ 2.68, 1.29 ], fq: 50 
  },
  "blazing": {
    dict: "happiness", word: "blazing", stem: "blaze", anew: "blind",
    avg: [ 4.39, 5.52 ], std: [ 2.36, 2.06 ], fq: 50 
  },
  "appointment": {
    dict: "happiness", word: "appointment", stem: "appoint", anew: "engaged",
    avg: [ 6.77, 5.52 ], std: [ 2.07, 1.84 ], fq: 50 
  },
  "bottles": {
    dict: "happiness", word: "bottles", stem: "bottl", anew: "bottle",
    avg: [ 4.79, 5.52 ], std: [ 2.44, 1.09 ], fq: 50 
  },
  "boxes": {
    dict: "happiness", word: "boxes", stem: "box", anew: "corner",
    avg: [ 3.91, 5.52 ], std: [ 1.92, 1.22 ], fq: 50 
  },
  "branch": {
    dict: "happiness", word: "branch", stem: "branch", anew: "fork",
    avg: [ 3.96, 5.52 ], std: [ 1.94, 1.15 ], fq: 50 
  },
  "categories": {
    dict: "happiness", word: "categories", stem: "categori", anew: "family",
    avg: [ 4.80, 5.52 ], std: [ 2.71, 1.23 ], fq: 50 
  },
  "class": {
    dict: "happiness", word: "class", stem: "class", anew: "family",
    avg: [ 4.80, 5.52 ], std: [ 2.71, 1.78 ], fq: 50 
  },
  "demonstrate": {
    dict: "happiness", word: "demonstrate", stem: "demonstr", anew: "present",
    avg: [ 5.12, 5.52 ], std: [ 2.39, 1.18 ], fq: 50 
  },
  "employers": {
    dict: "happiness", word: "employers", stem: "employ", anew: "employment",
    avg: [ 5.28, 5.52 ], std: [ 2.12, 1.37 ], fq: 50 
  },
  "filled": {
    dict: "happiness", word: "filled", stem: "fill", anew: "satisfied",
    avg: [ 4.94, 5.52 ], std: [ 2.63, 1.27 ], fq: 50 
  },
  "findings": {
    dict: "happiness", word: "findings", stem: "find", anew: "wit",
    avg: [ 5.42, 5.52 ], std: [ 2.44, 1.47 ], fq: 50 
  },
  "jets": {
    dict: "happiness", word: "jets", stem: "jet", anew: "green",
    avg: [ 4.28, 5.52 ], std: [ 2.46, 1.36 ], fq: 50 
  },
  "josh": {
    dict: "happiness", word: "josh", stem: "josh", anew: "jolly",
    avg: [ 5.57, 5.52 ], std: [ 2.80, 1.37 ], fq: 50 
  },
  "journalism": {
    dict: "happiness", word: "journalism", stem: "journal", anew: "journal",
    avg: [ 4.05, 5.52 ], std: [ 1.96, 1.62 ], fq: 50 
  },
  "plains": {
    dict: "happiness", word: "plains", stem: "plain", anew: "plain",
    avg: [ 3.52, 5.52 ], std: [ 2.05, 1.43 ], fq: 50 
  },
  "positions": {
    dict: "happiness", word: "positions", stem: "posit", anew: "statue",
    avg: [ 3.46, 5.52 ], std: [ 1.72, 1.28 ], fq: 50 
  },
  "posting": {
    dict: "happiness", word: "posting", stem: "post", anew: "poster",
    avg: [ 3.93, 5.52 ], std: [ 2.56, 1.09 ], fq: 50 
  },
  "ray": {
    dict: "happiness", word: "ray", stem: "ray", anew: "radiator",
    avg: [ 4.02, 5.52 ], std: [ 1.94, 1.46 ], fq: 50 
  },
  "reserves": {
    dict: "happiness", word: "reserves", stem: "reserv", anew: "reserved",
    avg: [ 3.27, 5.52 ], std: [ 2.05, 1.28 ], fq: 50 
  },
  "room": {
    dict: "happiness", word: "room", stem: "room", anew: "board",
    avg: [ 3.36, 5.52 ], std: [ 2.12, 1.15 ], fq: 50 
  },
  "suggest": {
    dict: "happiness", word: "suggest", stem: "suggest", anew: "intimate",
    avg: [ 6.98, 5.52 ], std: [ 2.21, 1.23 ], fq: 50 
  },
  "summit": {
    dict: "happiness", word: "summit", stem: "summit", anew: "crown",
    avg: [ 4.28, 5.52 ], std: [ 2.53, 1.62 ], fq: 50 
  },
  "usage": {
    dict: "happiness", word: "usage", stem: "usag", anew: "employment",
    avg: [ 5.28, 5.52 ], std: [ 2.12, 1.50 ], fq: 50 
  },
  "fills": {
    dict: "happiness", word: "fills", stem: "fill", anew: "satisfied",
    avg: [ 4.94, 5.51 ], std: [ 2.63, 1.20 ], fq: 50 
  },
  "priests": {
    dict: "happiness", word: "priests", stem: "priest", anew: "priest",
    avg: [ 4.41, 5.51 ], std: [ 2.71, 2.01 ], fq: 50 
  },
  "account": {
    dict: "happiness", word: "account", stem: "account", anew: "history",
    avg: [ 3.93, 5.50 ], std: [ 2.29, 0.95 ], fq: 50 
  },
  "arm": {
    dict: "happiness", word: "arm", stem: "arm", anew: "arm",
    avg: [ 3.59, 5.50 ], std: [ 2.40, 1.02 ], fq: 50 
  },
  "capacity": {
    dict: "happiness", word: "capacity", stem: "capac", anew: "contents",
    avg: [ 4.32, 5.50 ], std: [ 2.14, 1.42 ], fq: 50 
  },
  "chairwoman": {
    dict: "happiness", word: "chairwoman", stem: "chairwoman", anew: "chair",
    avg: [ 3.15, 5.50 ], std: [ 1.77, 1.18 ], fq: 50 
  },
  "clay": {
    dict: "happiness", word: "clay", stem: "clay", anew: "corpse",
    avg: [ 4.74, 5.50 ], std: [ 2.94, 1.33 ], fq: 50 
  },
  "effects": {
    dict: "happiness", word: "effects", stem: "effect", anew: "impressed",
    avg: [ 5.42, 5.50 ], std: [ 2.65, 1.47 ], fq: 50 
  },
  "feels": {
    dict: "happiness", word: "feels", stem: "feel", anew: "finger",
    avg: [ 3.78, 5.50 ], std: [ 2.42, 1.74 ], fq: 50 
  },
  "figure": {
    dict: "happiness", word: "figure", stem: "figur", anew: "computer",
    avg: [ 4.75, 5.50 ], std: [ 1.93, 1.15 ], fq: 50 
  },
  "genetic": {
    dict: "happiness", word: "genetic", stem: "genet", anew: "family",
    avg: [ 4.80, 5.50 ], std: [ 2.71, 1.25 ], fq: 50 
  },
  "glasses": {
    dict: "happiness", word: "glasses", stem: "glass", anew: "glass",
    avg: [ 4.27, 5.50 ], std: [ 2.07, 1.30 ], fq: 50 
  },
  "handled": {
    dict: "happiness", word: "handled", stem: "handl", anew: "treat",
    avg: [ 5.62, 5.50 ], std: [ 2.25, 0.93 ], fq: 50 
  },
  "insure": {
    dict: "happiness", word: "insure", stem: "insur", anew: "controlling",
    avg: [ 6.10, 5.50 ], std: [ 2.19, 1.43 ], fq: 50 
  },
  "item": {
    dict: "happiness", word: "item", stem: "item", anew: "item",
    avg: [ 3.24, 5.50 ], std: [ 2.08, 0.93 ], fq: 50 
  },
  "manifest": {
    dict: "happiness", word: "manifest", stem: "manifest", anew: "patent",
    avg: [ 3.50, 5.50 ], std: [ 1.84, 1.36 ], fq: 50 
  },
  "minute": {
    dict: "happiness", word: "minute", stem: "minut", anew: "moment",
    avg: [ 3.83, 5.50 ], std: [ 2.29, 0.93 ], fq: 50 
  },
  "quiet": {
    dict: "happiness", word: "quiet", stem: "quiet", anew: "quiet",
    avg: [ 2.82, 5.50 ], std: [ 2.13, 1.81 ], fq: 50 
  },
  "ran": {
    dict: "happiness", word: "ran", stem: "ran", anew: "execution",
    avg: [ 5.71, 5.50 ], std: [ 2.74, 1.46 ], fq: 50 
  },
  "rated": {
    dict: "happiness", word: "rated", stem: "rate", anew: "rat",
    avg: [ 4.95, 5.50 ], std: [ 2.36, 1.43 ], fq: 50 
  },
  "settings": {
    dict: "happiness", word: "settings", stem: "set", anew: "context",
    avg: [ 4.22, 5.50 ], std: [ 2.24, 1.25 ], fq: 50 
  },
  "skin": {
    dict: "happiness", word: "skin", stem: "skin", anew: "hide",
    avg: [ 5.28, 5.50 ], std: [ 2.51, 1.56 ], fq: 50 
  },
  "tie": {
    dict: "happiness", word: "tie", stem: "tie", anew: "wedding",
    avg: [ 5.97, 5.50 ], std: [ 2.85, 1.18 ], fq: 50 
  },
  "transmission": {
    dict: "happiness", word: "transmission", stem: "transmiss", anew: "infection",
    avg: [ 5.03, 5.50 ], std: [ 2.77, 1.33 ], fq: 50 
  },
  "unit": {
    dict: "happiness", word: "unit", stem: "unit", anew: "unit",
    avg: [ 3.75, 5.50 ], std: [ 2.49, 0.97 ], fq: 50 
  },
  "variation": {
    dict: "happiness", word: "variation", stem: "variat", anew: "mutation",
    avg: [ 4.84, 5.50 ], std: [ 2.52, 1.18 ], fq: 50 
  },
  "wearing": {
    dict: "happiness", word: "wearing", stem: "wear", anew: "fatigued",
    avg: [ 2.64, 5.50 ], std: [ 2.19, 1.18 ], fq: 50 
  },
  "wild": {
    dict: "happiness", word: "wild", stem: "wild", anew: "waste",
    avg: [ 4.14, 5.50 ], std: [ 2.30, 1.81 ], fq: 50 
  },
  "works": {
    dict: "happiness", word: "works", stem: "work", anew: "mold",
    avg: [ 4.07, 5.50 ], std: [ 1.98, 1.45 ], fq: 50 
  },
  "flame": {
    dict: "happiness", word: "flame", stem: "flame", anew: "fire",
    avg: [ 7.17, 5.49 ], std: [ 2.06, 1.73 ], fq: 50 
  },
  "church": {
    dict: "happiness", word: "church", stem: "church", anew: "church",
    avg: [ 4.34, 5.48 ], std: [ 2.45, 1.85 ], fq: 50 
  },
  "column": {
    dict: "happiness", word: "column", stem: "column", anew: "column",
    avg: [ 3.62, 5.48 ], std: [ 1.91, 0.91 ], fq: 50 
  },
  "demo": {
    dict: "happiness", word: "demo", stem: "demo", anew: "present",
    avg: [ 5.12, 5.48 ], std: [ 2.39, 1.31 ], fq: 50 
  },
  "encountered": {
    dict: "happiness", word: "encountered", stem: "encount", anew: "chance",
    avg: [ 5.38, 5.48 ], std: [ 2.58, 1.33 ], fq: 50 
  },
  "felt": {
    dict: "happiness", word: "felt", stem: "felt", anew: "finger",
    avg: [ 3.78, 5.48 ], std: [ 2.42, 1.37 ], fq: 50 
  },
  "habit": {
    dict: "happiness", word: "habit", stem: "habit", anew: "habit",
    avg: [ 3.95, 5.48 ], std: [ 2.11, 1.61 ], fq: 50 
  },
  "highway": {
    dict: "happiness", word: "highway", stem: "highway", anew: "highway",
    avg: [ 5.16, 5.48 ], std: [ 2.44, 1.27 ], fq: 50 
  },
  "jump": {
    dict: "happiness", word: "jump", stem: "jump", anew: "spring",
    avg: [ 5.67, 5.48 ], std: [ 2.51, 1.74 ], fq: 50 
  },
  "led": {
    dict: "happiness", word: "led", stem: "led", anew: "chair",
    avg: [ 3.15, 5.48 ], std: [ 1.77, 1.13 ], fq: 50 
  },
  "mark": {
    dict: "happiness", word: "mark", stem: "mark", anew: "scar",
    avg: [ 4.79, 5.48 ], std: [ 2.11, 1.30 ], fq: 50 
  },
  "methods": {
    dict: "happiness", word: "methods", stem: "method", anew: "method",
    avg: [ 3.85, 5.48 ], std: [ 2.58, 0.99 ], fq: 50 
  },
  "nose": {
    dict: "happiness", word: "nose", stem: "nose", anew: "intruder",
    avg: [ 6.86, 5.48 ], std: [ 2.41, 1.23 ], fq: 50 
  },
  "operates": {
    dict: "happiness", word: "operates", stem: "oper", anew: "engaged",
    avg: [ 6.77, 5.48 ], std: [ 2.07, 1.23 ], fq: 50 
  },
  "palm": {
    dict: "happiness", word: "palm", stem: "palm", anew: "decorate",
    avg: [ 5.14, 5.48 ], std: [ 2.39, 1.33 ], fq: 50 
  },
  "picking": {
    dict: "happiness", word: "picking", stem: "pick", anew: "foot",
    avg: [ 3.27, 5.48 ], std: [ 1.98, 0.95 ], fq: 50 
  },
  "portion": {
    dict: "happiness", word: "portion", stem: "portion", anew: "part",
    avg: [ 3.82, 5.48 ], std: [ 2.24, 1.52 ], fq: 50 
  },
  "post": {
    dict: "happiness", word: "post", stem: "post", anew: "office",
    avg: [ 4.08, 5.48 ], std: [ 1.92, 1.09 ], fq: 50 
  },
  "run": {
    dict: "happiness", word: "run", stem: "run", anew: "execution",
    avg: [ 5.71, 5.48 ], std: [ 2.74, 1.43 ], fq: 50 
  },
  "sell": {
    dict: "happiness", word: "sell", stem: "sell", anew: "betray",
    avg: [ 7.24, 5.48 ], std: [ 2.06, 1.13 ], fq: 50 
  },
  "shape": {
    dict: "happiness", word: "shape", stem: "shape", anew: "mold",
    avg: [ 4.07, 5.48 ], std: [ 1.98, 0.86 ], fq: 50 
  },
  "square": {
    dict: "happiness", word: "square", stem: "squar", anew: "square",
    avg: [ 3.18, 5.48 ], std: [ 1.76, 0.99 ], fq: 50 
  },
  "tried": {
    dict: "happiness", word: "tried", stem: "tri", anew: "stress",
    avg: [ 7.45, 5.48 ], std: [ 2.38, 1.64 ], fq: 50 
  },
  "truck": {
    dict: "happiness", word: "truck", stem: "truck", anew: "truck",
    avg: [ 4.84, 5.48 ], std: [ 2.17, 1.55 ], fq: 50 
  },
  "tweet": {
    dict: "happiness", word: "tweet", stem: "tweet", anew: "pinch",
    avg: [ 4.59, 5.48 ], std: [ 2.10, 1.59 ], fq: 50 
  },
  "utility": {
    dict: "happiness", word: "utility", stem: "util", anew: "useful",
    avg: [ 4.26, 5.48 ], std: [ 2.47, 1.22 ], fq: 50 
  },
  "dwell": {
    dict: "happiness", word: "dwell", stem: "dwell", anew: "lie",
    avg: [ 5.96, 5.47 ], std: [ 2.63, 1.66 ], fq: 50 
  },
  "elaborate": {
    dict: "happiness", word: "elaborate", stem: "elabor", anew: "detail",
    avg: [ 4.10, 5.47 ], std: [ 2.24, 1.66 ], fq: 50 
  },
  "grip": {
    dict: "happiness", word: "grip", stem: "grip", anew: "fascinate",
    avg: [ 5.83, 5.47 ], std: [ 2.73, 1.71 ], fq: 50 
  },
  "loaded": {
    dict: "happiness", word: "loaded", stem: "load", anew: "money",
    avg: [ 5.70, 5.47 ], std: [ 2.66, 1.84 ], fq: 50 
  },
  "caption": {
    dict: "happiness", word: "caption", stem: "caption", anew: "legend",
    avg: [ 4.88, 5.46 ], std: [ 1.76, 0.84 ], fq: 50 
  },
  "cavalry": {
    dict: "happiness", word: "cavalry", stem: "cavalri", anew: "horse",
    avg: [ 3.89, 5.46 ], std: [ 2.17, 1.73 ], fq: 50 
  },
  "chronicle": {
    dict: "happiness", word: "chronicle", stem: "chronicl", anew: "history",
    avg: [ 3.93, 5.46 ], std: [ 2.29, 1.53 ], fq: 50 
  },
  "consisted": {
    dict: "happiness", word: "consisted", stem: "consist", anew: "lie",
    avg: [ 5.96, 5.46 ], std: [ 2.63, 1.33 ], fq: 50 
  },
  "contract": {
    dict: "happiness", word: "contract", stem: "contract", anew: "cut",
    avg: [ 5.00, 5.46 ], std: [ 2.32, 1.11 ], fq: 50 
  },
  "directed": {
    dict: "happiness", word: "directed", stem: "direct", anew: "engine",
    avg: [ 3.98, 5.46 ], std: [ 2.33, 1.07 ], fq: 50 
  },
  "explain": {
    dict: "happiness", word: "explain", stem: "explain", anew: "excuse",
    avg: [ 4.48, 5.46 ], std: [ 2.29, 1.34 ], fq: 50 
  },
  "followed": {
    dict: "happiness", word: "followed", stem: "follow", anew: "watch",
    avg: [ 4.10, 5.46 ], std: [ 2.12, 1.22 ], fq: 50 
  },
  "fox": {
    dict: "happiness", word: "fox", stem: "fox", anew: "confused",
    avg: [ 6.03, 5.46 ], std: [ 1.88, 1.72 ], fq: 50 
  },
  "index": {
    dict: "happiness", word: "index", stem: "index", anew: "powerful",
    avg: [ 5.83, 5.46 ], std: [ 2.69, 1.23 ], fq: 50 
  },
  "instructions": {
    dict: "happiness", word: "instructions", stem: "instruct", anew: "education",
    avg: [ 5.74, 5.46 ], std: [ 2.46, 1.45 ], fq: 50 
  },
  "linked": {
    dict: "happiness", word: "linked", stem: "link", anew: "couple",
    avg: [ 6.39, 5.46 ], std: [ 2.31, 1.40 ], fq: 50 
  },
  "list": {
    dict: "happiness", word: "list", stem: "list", anew: "name",
    avg: [ 4.25, 5.46 ], std: [ 2.47, 0.86 ], fq: 50 
  },
  "meeting": {
    dict: "happiness", word: "meeting", stem: "meet", anew: "satisfied",
    avg: [ 4.94, 5.46 ], std: [ 2.63, 1.34 ], fq: 50 
  },
  "process": {
    dict: "happiness", word: "process", stem: "process", anew: "treat",
    avg: [ 5.62, 5.46 ], std: [ 2.25, 1.11 ], fq: 50 
  },
  "sent": {
    dict: "happiness", word: "sent", stem: "sent", anew: "mail",
    avg: [ 5.63, 5.46 ], std: [ 2.36, 0.91 ], fq: 50 
  },
  "serve": {
    dict: "happiness", word: "serve", stem: "serv", anew: "answer",
    avg: [ 5.41, 5.46 ], std: [ 2.43, 1.31 ], fq: 50 
  },
  "shipping": {
    dict: "happiness", word: "shipping", stem: "ship", anew: "ship",
    avg: [ 4.38, 5.46 ], std: [ 2.29, 1.31 ], fq: 50 
  },
  "stacks": {
    dict: "happiness", word: "stacks", stem: "stack", anew: "mountain",
    avg: [ 5.49, 5.46 ], std: [ 2.43, 1.33 ], fq: 50 
  },
  "watched": {
    dict: "happiness", word: "watched", stem: "watch", anew: "watch",
    avg: [ 4.10, 5.46 ], std: [ 2.12, 1.27 ], fq: 50 
  },
  "notions": {
    dict: "happiness", word: "notions", stem: "notion", anew: "impressed",
    avg: [ 5.42, 5.46 ], std: [ 2.65, 1.13 ], fq: 50 
  },
  "unfold": {
    dict: "happiness", word: "unfold", stem: "unfold", anew: "blossom",
    avg: [ 5.03, 5.46 ], std: [ 2.65, 1.32 ], fq: 50 
  },
  "situations": {
    dict: "happiness", word: "situations", stem: "situat", anew: "office",
    avg: [ 4.08, 5.45 ], std: [ 1.92, 1.14 ], fq: 50 
  },
  "sway": {
    dict: "happiness", word: "sway", stem: "sway", anew: "rock",
    avg: [ 4.52, 5.45 ], std: [ 2.37, 1.21 ], fq: 50 
  },
  "drawers": {
    dict: "happiness", word: "drawers", stem: "drawer", anew: "boxer",
    avg: [ 5.12, 5.45 ], std: [ 2.26, 1.32 ], fq: 50 
  },
  "area": {
    dict: "happiness", word: "area", stem: "area", anew: "field",
    avg: [ 4.08, 5.44 ], std: [ 2.41, 0.88 ], fq: 50 
  },
  "assigned": {
    dict: "happiness", word: "assigned", stem: "assign", anew: "arrogant",
    avg: [ 5.65, 5.44 ], std: [ 2.23, 1.23 ], fq: 50 
  },
  "bob": {
    dict: "happiness", word: "bob", stem: "bob", anew: "cork",
    avg: [ 3.80, 5.44 ], std: [ 2.18, 1.16 ], fq: 50 
  },
  "calculation": {
    dict: "happiness", word: "calculation", stem: "calcul", anew: "computer",
    avg: [ 4.75, 5.44 ], std: [ 1.93, 1.20 ], fq: 50 
  },
  "centres": {
    dict: "happiness", word: "centres", stem: "centr", anew: "heart",
    avg: [ 6.34, 5.44 ], std: [ 2.25, 1.23 ], fq: 50 
  },
  "chair": {
    dict: "happiness", word: "chair", stem: "chair", anew: "chair",
    avg: [ 3.15, 5.44 ], std: [ 1.77, 1.25 ], fq: 50 
  },
  "charter": {
    dict: "happiness", word: "charter", stem: "charter", anew: "engaged",
    avg: [ 6.77, 5.44 ], std: [ 2.07, 0.93 ], fq: 50 
  },
  "company": {
    dict: "happiness", word: "company", stem: "compani", anew: "party",
    avg: [ 6.69, 5.44 ], std: [ 2.84, 1.58 ], fq: 50 
  },
  "consist": {
    dict: "happiness", word: "consist", stem: "consist", anew: "lie",
    avg: [ 5.96, 5.44 ], std: [ 2.63, 1.28 ], fq: 50 
  },
  "curtains": {
    dict: "happiness", word: "curtains", stem: "curtain", anew: "curtains",
    avg: [ 3.67, 5.44 ], std: [ 1.83, 1.37 ], fq: 50 
  },
  "deck": {
    dict: "happiness", word: "deck", stem: "deck", anew: "decorate",
    avg: [ 5.14, 5.44 ], std: [ 2.39, 1.39 ], fq: 50 
  },
  "doors": {
    dict: "happiness", word: "doors", stem: "door", anew: "door",
    avg: [ 3.80, 5.44 ], std: [ 2.29, 1.07 ], fq: 50 
  },
  "flow": {
    dict: "happiness", word: "flow", stem: "flow", anew: "fall",
    avg: [ 4.70, 5.44 ], std: [ 2.48, 1.59 ], fq: 50 
  },
  "imports": {
    dict: "happiness", word: "imports", stem: "import", anew: "moment",
    avg: [ 3.83, 5.44 ], std: [ 2.29, 1.49 ], fq: 50 
  },
  "mass": {
    dict: "happiness", word: "mass", stem: "mass", anew: "mountain",
    avg: [ 5.49, 5.44 ], std: [ 2.43, 1.11 ], fq: 50 
  },
  "metal": {
    dict: "happiness", word: "metal", stem: "metal", anew: "metal",
    avg: [ 3.79, 5.44 ], std: [ 1.96, 1.28 ], fq: 50 
  },
  "operating": {
    dict: "happiness", word: "operating", stem: "oper", anew: "engaged",
    avg: [ 6.77, 5.44 ], std: [ 2.07, 1.42 ], fq: 50 
  },
  "passes": {
    dict: "happiness", word: "passes", stem: "pass", anew: "fall",
    avg: [ 4.70, 5.44 ], std: [ 2.48, 1.49 ], fq: 50 
  },
  "passing": {
    dict: "happiness", word: "passing", stem: "pass", anew: "passage",
    avg: [ 4.36, 5.44 ], std: [ 2.13, 1.74 ], fq: 50 
  },
  "refers": {
    dict: "happiness", word: "refers", stem: "refer", anew: "name",
    avg: [ 4.25, 5.44 ], std: [ 2.47, 1.16 ], fq: 50 
  },
  "represent": {
    dict: "happiness", word: "represent", stem: "repres", anew: "present",
    avg: [ 5.12, 5.44 ], std: [ 2.39, 1.05 ], fq: 50 
  },
  "saw": {
    dict: "happiness", word: "saw", stem: "saw", anew: "controlling",
    avg: [ 6.10, 5.44 ], std: [ 2.19, 0.81 ], fq: 50 
  },
  "sept": {
    dict: "happiness", word: "sept", stem: "sept", anew: "family",
    avg: [ 4.80, 5.44 ], std: [ 2.71, 1.03 ], fq: 50 
  },
  "storage": {
    dict: "happiness", word: "storage", stem: "storag", anew: "memory",
    avg: [ 5.42, 5.44 ], std: [ 2.25, 1.07 ], fq: 50 
  },
  "street": {
    dict: "happiness", word: "street", stem: "street", anew: "street",
    avg: [ 3.39, 5.44 ], std: [ 1.87, 0.84 ], fq: 50 
  },
  "subject": {
    dict: "happiness", word: "subject", stem: "subject", anew: "contents",
    avg: [ 4.32, 5.44 ], std: [ 2.14, 1.03 ], fq: 50 
  },
  "submit": {
    dict: "happiness", word: "submit", stem: "submit", anew: "present",
    avg: [ 5.12, 5.44 ], std: [ 2.39, 1.50 ], fq: 50 
  },
  "tone": {
    dict: "happiness", word: "tone", stem: "tone", anew: "quality",
    avg: [ 4.48, 5.44 ], std: [ 2.12, 0.86 ], fq: 50 
  },
  "tongue": {
    dict: "happiness", word: "tongue", stem: "tongu", anew: "knife",
    avg: [ 5.80, 5.44 ], std: [ 2.00, 1.09 ], fq: 50 
  },
  "trunk": {
    dict: "happiness", word: "trunk", stem: "trunk", anew: "trunk",
    avg: [ 4.18, 5.44 ], std: [ 2.19, 0.97 ], fq: 50 
  },
  "tweeted": {
    dict: "happiness", word: "tweeted", stem: "tweet", anew: "pinch",
    avg: [ 4.59, 5.44 ], std: [ 2.10, 1.69 ], fq: 50 
  },
  "worked": {
    dict: "happiness", word: "worked", stem: "work", anew: "mold",
    avg: [ 4.07, 5.44 ], std: [ 1.98, 1.58 ], fq: 50 
  },
  "yen": {
    dict: "happiness", word: "yen", stem: "yen", anew: "ache",
    avg: [ 5.00, 5.44 ], std: [ 2.45, 1.43 ], fq: 50 
  },
  "modes": {
    dict: "happiness", word: "modes", stem: "mode", anew: "manner",
    avg: [ 4.56, 5.43 ], std: [ 1.78, 1.21 ], fq: 50 
  },
  "barrel": {
    dict: "happiness", word: "barrel", stem: "barrel", anew: "barrel",
    avg: [ 3.36, 5.42 ], std: [ 2.28, 1.29 ], fq: 50 
  },
  "bowl": {
    dict: "happiness", word: "bowl", stem: "bowl", anew: "bowl",
    avg: [ 3.47, 5.42 ], std: [ 2.12, 1.26 ], fq: 50 
  },
  "calls": {
    dict: "happiness", word: "calls", stem: "call", anew: "song",
    avg: [ 6.07, 5.42 ], std: [ 2.42, 1.03 ], fq: 50 
  },
  "came": {
    dict: "happiness", word: "came", stem: "came", anew: "fall",
    avg: [ 4.70, 5.42 ], std: [ 2.48, 1.42 ], fq: 50 
  },
  "category": {
    dict: "happiness", word: "category", stem: "categori", anew: "family",
    avg: [ 4.80, 5.42 ], std: [ 2.71, 1.50 ], fq: 50 
  },
  "centre": {
    dict: "happiness", word: "centre", stem: "centr", anew: "heart",
    avg: [ 6.34, 5.42 ], std: [ 2.25, 0.84 ], fq: 50 
  },
  "course": {
    dict: "happiness", word: "course", stem: "cours", anew: "nature",
    avg: [ 4.37, 5.42 ], std: [ 2.51, 1.37 ], fq: 50 
  },
  "crow": {
    dict: "happiness", word: "crow", stem: "crow", anew: "triumph",
    avg: [ 5.78, 5.42 ], std: [ 2.60, 1.68 ], fq: 50 
  },
  "derived": {
    dict: "happiness", word: "derived", stem: "deriv", anew: "education",
    avg: [ 5.74, 5.42 ], std: [ 2.46, 1.21 ], fq: 50 
  },
  "floors": {
    dict: "happiness", word: "floors", stem: "floor", anew: "dump",
    avg: [ 4.12, 5.42 ], std: [ 2.36, 0.84 ], fq: 50 
  },
  "going": {
    dict: "happiness", word: "going", stem: "go", anew: "travel",
    avg: [ 6.21, 5.42 ], std: [ 2.51, 1.16 ], fq: 50 
  },
  "gotten": {
    dict: "happiness", word: "gotten", stem: "gotten", anew: "father",
    avg: [ 5.92, 5.42 ], std: [ 2.60, 1.39 ], fq: 50 
  },
  "inner": {
    dict: "happiness", word: "inner", stem: "inner", anew: "intimate",
    avg: [ 6.98, 5.42 ], std: [ 2.21, 1.03 ], fq: 50 
  },
  "mentioned": {
    dict: "happiness", word: "mentioned", stem: "mention", anew: "name",
    avg: [ 4.25, 5.42 ], std: [ 2.47, 1.11 ], fq: 50 
  },
  "nowadays": {
    dict: "happiness", word: "nowadays", stem: "nowaday", anew: "present",
    avg: [ 5.12, 5.42 ], std: [ 2.39, 1.46 ], fq: 50 
  },
  "peter": {
    dict: "happiness", word: "peter", stem: "peter", anew: "prick",
    avg: [ 4.70, 5.42 ], std: [ 2.59, 1.05 ], fq: 50 
  },
  "point": {
    dict: "happiness", word: "point", stem: "point", anew: "detail",
    avg: [ 4.10, 5.42 ], std: [ 2.24, 0.91 ], fq: 50 
  },
  "polls": {
    dict: "happiness", word: "polls", stem: "poll", anew: "crown",
    avg: [ 4.28, 5.42 ], std: [ 2.53, 1.28 ], fq: 50 
  },
  "presentation": {
    dict: "happiness", word: "presentation", stem: "present", anew: "present",
    avg: [ 5.12, 5.42 ], std: [ 2.39, 1.58 ], fq: 50 
  },
  "rolled": {
    dict: "happiness", word: "rolled", stem: "roll", anew: "revolver",
    avg: [ 5.55, 5.42 ], std: [ 2.39, 1.36 ], fq: 50 
  },
  "select": {
    dict: "happiness", word: "select", stem: "select", anew: "quality",
    avg: [ 4.48, 5.42 ], std: [ 2.12, 1.25 ], fq: 50 
  },
  "subjects": {
    dict: "happiness", word: "subjects", stem: "subject", anew: "contents",
    avg: [ 4.32, 5.42 ], std: [ 2.14, 1.01 ], fq: 50 
  },
  "tables": {
    dict: "happiness", word: "tables", stem: "tabl", anew: "table",
    avg: [ 2.92, 5.42 ], std: [ 2.16, 0.84 ], fq: 50 
  },
  "tell": {
    dict: "happiness", word: "tell", stem: "tell", anew: "severe",
    avg: [ 5.26, 5.42 ], std: [ 2.36, 1.03 ], fq: 50 
  },
  "theory": {
    dict: "happiness", word: "theory", stem: "theori", anew: "theory",
    avg: [ 4.62, 5.42 ], std: [ 1.94, 1.49 ], fq: 50 
  },
  "toss": {
    dict: "happiness", word: "toss", stem: "toss", anew: "sky",
    avg: [ 4.27, 5.42 ], std: [ 2.17, 1.37 ], fq: 50 
  },
  "tweets": {
    dict: "happiness", word: "tweets", stem: "tweet", anew: "pinch",
    avg: [ 4.59, 5.42 ], std: [ 2.10, 1.97 ], fq: 50 
  },
  "calculated": {
    dict: "happiness", word: "calculated", stem: "calcul", anew: "computer",
    avg: [ 4.75, 5.42 ], std: [ 1.93, 1.40 ], fq: 50 
  },
  "inhabitants": {
    dict: "happiness", word: "inhabitants", stem: "inhabit", anew: "inhabitant",
    avg: [ 3.95, 5.42 ], std: [ 1.97, 1.44 ], fq: 50 
  },
  "constitutes": {
    dict: "happiness", word: "constitutes", stem: "constitut", anew: "plant",
    avg: [ 3.62, 5.41 ], std: [ 2.25, 1.37 ], fq: 50 
  },
  "boldface": {
    dict: "happiness", word: "boldface", stem: "boldfac", anew: "bold",
    avg: [ 5.60, 5.40 ], std: [ 2.21, 1.09 ], fq: 50 
  },
  "cast": {
    dict: "happiness", word: "cast", stem: "cast", anew: "mold",
    avg: [ 4.07, 5.40 ], std: [ 1.98, 1.37 ], fq: 50 
  },
  "claimed": {
    dict: "happiness", word: "claimed", stem: "claim", anew: "arrogant",
    avg: [ 5.65, 5.40 ], std: [ 2.23, 1.18 ], fq: 50 
  },
  "consecutive": {
    dict: "happiness", word: "consecutive", stem: "consecut", anew: "success",
    avg: [ 6.11, 5.40 ], std: [ 2.65, 1.16 ], fq: 50 
  },
  "document": {
    dict: "happiness", word: "document", stem: "document", anew: "paper",
    avg: [ 2.50, 5.40 ], std: [ 1.85, 1.23 ], fq: 50 
  },
  "estimate": {
    dict: "happiness", word: "estimate", stem: "estim", anew: "idea",
    avg: [ 5.86, 5.40 ], std: [ 1.81, 0.99 ], fq: 50 
  },
  "figured": {
    dict: "happiness", word: "figured", stem: "figur", anew: "computer",
    avg: [ 4.75, 5.40 ], std: [ 1.93, 1.18 ], fq: 50 
  },
  "fuel": {
    dict: "happiness", word: "fuel", stem: "fuel", anew: "fire",
    avg: [ 7.17, 5.40 ], std: [ 2.06, 1.18 ], fq: 50 
  },
  "holds": {
    dict: "happiness", word: "holds", stem: "hold", anew: "controlling",
    avg: [ 6.10, 5.40 ], std: [ 2.19, 1.07 ], fq: 50 
  },
  "intent": {
    dict: "happiness", word: "intent", stem: "intent", anew: "spirit",
    avg: [ 5.56, 5.40 ], std: [ 2.62, 1.46 ], fq: 50 
  },
  "main": {
    dict: "happiness", word: "main", stem: "main", anew: "masterful",
    avg: [ 5.20, 5.40 ], std: [ 2.85, 1.21 ], fq: 50 
  },
  "obedience": {
    dict: "happiness", word: "obedience", stem: "obedi", anew: "respectful",
    avg: [ 4.60, 5.40 ], std: [ 2.67, 1.62 ], fq: 50 
  },
  "one": {
    dict: "happiness", word: "one", stem: "one", anew: "ace",
    avg: [ 5.50, 5.40 ], std: [ 2.66, 1.59 ], fq: 50 
  },
  "picks": {
    dict: "happiness", word: "picks", stem: "pick", anew: "option",
    avg: [ 4.74, 5.40 ], std: [ 2.23, 1.36 ], fq: 50 
  },
  "processes": {
    dict: "happiness", word: "processes", stem: "process", anew: "treat",
    avg: [ 5.62, 5.40 ], std: [ 2.25, 1.48 ], fq: 50 
  },
  "putting": {
    dict: "happiness", word: "putting", stem: "put", anew: "invest",
    avg: [ 5.12, 5.40 ], std: [ 2.42, 1.09 ], fq: 50 
  },
  "represents": {
    dict: "happiness", word: "represents", stem: "repres", anew: "present",
    avg: [ 5.12, 5.40 ], std: [ 2.39, 0.88 ], fq: 50 
  },
  "seen": {
    dict: "happiness", word: "seen", stem: "seen", anew: "controlling",
    avg: [ 6.10, 5.40 ], std: [ 2.19, 1.20 ], fq: 50 
  },
  "stayed": {
    dict: "happiness", word: "stayed", stem: "stay", anew: "delayed",
    avg: [ 5.62, 5.40 ], std: [ 2.39, 1.25 ], fq: 50 
  },
  "stomach": {
    dict: "happiness", word: "stomach", stem: "stomach", anew: "stomach",
    avg: [ 3.93, 5.40 ], std: [ 2.49, 1.07 ], fq: 50 
  },
  "tap": {
    dict: "happiness", word: "tap", stem: "tap", anew: "hydrant",
    avg: [ 3.71, 5.40 ], std: [ 1.75, 1.23 ], fq: 50 
  },
  "arms": {
    dict: "happiness", word: "arms", stem: "arm", anew: "arm",
    avg: [ 3.59, 5.38 ], std: [ 2.40, 0.99 ], fq: 50 
  },
  "basis": {
    dict: "happiness", word: "basis", stem: "basi", anew: "foot",
    avg: [ 3.27, 5.38 ], std: [ 1.98, 1.01 ], fq: 50 
  },
  "control": {
    dict: "happiness", word: "control", stem: "control", anew: "controlling",
    avg: [ 6.10, 5.38 ], std: [ 2.19, 1.48 ], fq: 50 
  },
  "core": {
    dict: "happiness", word: "core", stem: "core", anew: "heart",
    avg: [ 6.34, 5.38 ], std: [ 2.25, 1.09 ], fq: 50 
  },
  "door": {
    dict: "happiness", word: "door", stem: "door", anew: "door",
    avg: [ 3.80, 5.38 ], std: [ 2.29, 1.21 ], fq: 50 
  },
  "following": {
    dict: "happiness", word: "following", stem: "follow", anew: "watch",
    avg: [ 4.10, 5.38 ], std: [ 2.12, 1.64 ], fq: 50 
  },
  "industry": {
    dict: "happiness", word: "industry", stem: "industri", anew: "industry",
    avg: [ 4.47, 5.38 ], std: [ 2.43, 1.31 ], fq: 50 
  },
  "items": {
    dict: "happiness", word: "items", stem: "item", anew: "item",
    avg: [ 3.24, 5.38 ], std: [ 2.08, 1.54 ], fq: 50 
  },
  "machine": {
    dict: "happiness", word: "machine", stem: "machin", anew: "machine",
    avg: [ 3.82, 5.38 ], std: [ 2.40, 1.26 ], fq: 50 
  },
  "manner": {
    dict: "happiness", word: "manner", stem: "manner", anew: "manner",
    avg: [ 4.56, 5.38 ], std: [ 1.78, 1.35 ], fq: 50 
  },
  "pitching": {
    dict: "happiness", word: "pitching", stem: "pitch", anew: "sky",
    avg: [ 4.27, 5.38 ], std: [ 2.17, 1.43 ], fq: 50 
  },
  "rope": {
    dict: "happiness", word: "rope", stem: "rope", anew: "circle",
    avg: [ 3.86, 5.38 ], std: [ 2.13, 1.26 ], fq: 50 
  },
  "second": {
    dict: "happiness", word: "second", stem: "second", anew: "moment",
    avg: [ 3.83, 5.38 ], std: [ 2.29, 1.19 ], fq: 50 
  },
  "securities": {
    dict: "happiness", word: "securities", stem: "secur", anew: "secure",
    avg: [ 3.14, 5.38 ], std: [ 2.47, 2.05 ], fq: 50 
  },
  "send": {
    dict: "happiness", word: "send", stem: "send", anew: "mail",
    avg: [ 5.63, 5.38 ], std: [ 2.36, 1.35 ], fq: 50 
  },
  "standards": {
    dict: "happiness", word: "standards", stem: "standard", anew: "banner",
    avg: [ 3.83, 5.38 ], std: [ 1.95, 1.09 ], fq: 50 
  },
  "steps": {
    dict: "happiness", word: "steps", stem: "step", anew: "abuse",
    avg: [ 6.83, 5.38 ], std: [ 2.70, 1.12 ], fq: 50 
  },
  "tan": {
    dict: "happiness", word: "tan", stem: "tan", anew: "burn",
    avg: [ 6.22, 5.38 ], std: [ 1.91, 1.71 ], fq: 50 
  },
  "tricks": {
    dict: "happiness", word: "tricks", stem: "trick", anew: "magical",
    avg: [ 5.95, 5.38 ], std: [ 2.36, 1.52 ], fq: 50 
  },
  "wants": {
    dict: "happiness", word: "wants", stem: "want", anew: "wish",
    avg: [ 5.16, 5.38 ], std: [ 2.62, 1.32 ], fq: 50 
  },
  "sits": {
    dict: "happiness", word: "sits", stem: "sit", anew: "seat",
    avg: [ 2.95, 5.37 ], std: [ 1.72, 1.09 ], fq: 50 
  },
  "illusions": {
    dict: "happiness", word: "illusions", stem: "illus", anew: "fantasy",
    avg: [ 5.14, 5.36 ], std: [ 2.82, 1.81 ], fq: 50 
  },
  "bee": {
    dict: "happiness", word: "bee", stem: "bee", anew: "bees",
    avg: [ 6.51, 5.36 ], std: [ 2.14, 1.65 ], fq: 50 
  },
  "caps": {
    dict: "happiness", word: "caps", stem: "cap", anew: "crown",
    avg: [ 4.28, 5.36 ], std: [ 2.53, 1.03 ], fq: 50 
  },
  "clip": {
    dict: "happiness", word: "clip", stem: "clip", anew: "dress",
    avg: [ 4.05, 5.36 ], std: [ 1.89, 1.26 ], fq: 50 
  },
  "clips": {
    dict: "happiness", word: "clips", stem: "clip", anew: "dress",
    avg: [ 4.05, 5.36 ], std: [ 1.89, 1.17 ], fq: 50 
  },
  "constitute": {
    dict: "happiness", word: "constitute", stem: "constitut", anew: "plant",
    avg: [ 3.62, 5.36 ], std: [ 2.25, 1.14 ], fq: 50 
  },
  "contracts": {
    dict: "happiness", word: "contracts", stem: "contract", anew: "cut",
    avg: [ 5.00, 5.36 ], std: [ 2.32, 1.24 ], fq: 50 
  },
  "covering": {
    dict: "happiness", word: "covering", stem: "cover", anew: "hide",
    avg: [ 5.28, 5.36 ], std: [ 2.51, 0.88 ], fq: 50 
  },
  "customs": {
    dict: "happiness", word: "customs", stem: "custom", anew: "custom",
    avg: [ 4.66, 5.36 ], std: [ 2.12, 1.64 ], fq: 50 
  },
  "dash": {
    dict: "happiness", word: "dash", stem: "dash", anew: "crash",
    avg: [ 6.95, 5.36 ], std: [ 2.44, 1.48 ], fq: 50 
  },
  "dishes": {
    dict: "happiness", word: "dishes", stem: "dish", anew: "sweetheart",
    avg: [ 5.50, 5.36 ], std: [ 2.73, 1.82 ], fq: 50 
  },
  "edit": {
    dict: "happiness", word: "edit", stem: "edit", anew: "cut",
    avg: [ 5.00, 5.36 ], std: [ 2.32, 1.17 ], fq: 50 
  },
  "finger": {
    dict: "happiness", word: "finger", stem: "finger", anew: "finger",
    avg: [ 3.78, 5.36 ], std: [ 2.42, 1.17 ], fq: 50 
  },
  "greene": {
    dict: "happiness", word: "greene", stem: "green", anew: "green",
    avg: [ 4.28, 5.36 ], std: [ 2.46, 1.05 ], fq: 50 
  },
  "hay": {
    dict: "happiness", word: "hay", stem: "hay", anew: "hay",
    avg: [ 3.95, 5.36 ], std: [ 2.58, 1.48 ], fq: 50 
  },
  "heard": {
    dict: "happiness", word: "heard", stem: "heard", anew: "learn",
    avg: [ 5.39, 5.36 ], std: [ 2.22, 0.80 ], fq: 50 
  },
  "liquor": {
    dict: "happiness", word: "liquor", stem: "liquor", anew: "spirit",
    avg: [ 5.56, 5.36 ], std: [ 2.62, 2.28 ], fq: 50 
  },
  "listing": {
    dict: "happiness", word: "listing", stem: "list", anew: "name",
    avg: [ 4.25, 5.36 ], std: [ 2.47, 1.01 ], fq: 50 
  },
  "moving": {
    dict: "happiness", word: "moving", stem: "move", anew: "impressed",
    avg: [ 5.42, 5.36 ], std: [ 2.65, 1.50 ], fq: 50 
  },
  "nude": {
    dict: "happiness", word: "nude", stem: "nude", anew: "nude",
    avg: [ 6.41, 5.36 ], std: [ 2.09, 1.97 ], fq: 50 
  },
  "press": {
    dict: "happiness", word: "press", stem: "press", anew: "pressure",
    avg: [ 6.07, 5.36 ], std: [ 2.26, 1.22 ], fq: 50 
  },
  "principal": {
    dict: "happiness", word: "principal", stem: "princip", anew: "star",
    avg: [ 5.83, 5.36 ], std: [ 2.44, 1.40 ], fq: 50 
  },
  "sit": {
    dict: "happiness", word: "sit", stem: "sit", anew: "seat",
    avg: [ 2.95, 5.36 ], std: [ 1.72, 1.22 ], fq: 50 
  },
  "sold": {
    dict: "happiness", word: "sold", stem: "sold", anew: "betray",
    avg: [ 7.24, 5.36 ], std: [ 2.06, 1.29 ], fq: 50 
  },
  "standing": {
    dict: "happiness", word: "standing", stem: "stand", anew: "stomach",
    avg: [ 3.93, 5.36 ], std: [ 2.49, 0.85 ], fq: 50 
  },
  "trucks": {
    dict: "happiness", word: "trucks", stem: "truck", anew: "truck",
    avg: [ 4.84, 5.36 ], std: [ 2.17, 1.66 ], fq: 50 
  },
  "tummy": {
    dict: "happiness", word: "tummy", stem: "tummi", anew: "stomach",
    avg: [ 3.93, 5.36 ], std: [ 2.49, 1.38 ], fq: 50 
  },
  "tweeting": {
    dict: "happiness", word: "tweeting", stem: "tweet", anew: "pinch",
    avg: [ 4.59, 5.36 ], std: [ 2.10, 1.97 ], fq: 50 
  },
  "vest": {
    dict: "happiness", word: "vest", stem: "vest", anew: "vest",
    avg: [ 3.95, 5.36 ], std: [ 2.09, 1.14 ], fq: 50 
  },
  "wakes": {
    dict: "happiness", word: "wakes", stem: "wake", anew: "aroused",
    avg: [ 6.63, 5.36 ], std: [ 2.70, 1.68 ], fq: 50 
  },
  "loot": {
    dict: "happiness", word: "loot", stem: "loot", anew: "sugar",
    avg: [ 5.64, 5.35 ], std: [ 2.18, 2.09 ], fq: 50 
  },
  "adams": {
    dict: "happiness", word: "adams", stem: "adam", anew: "ecstasy",
    avg: [ 7.38, 5.34 ], std: [ 1.92, 1.08 ], fq: 50 
  },
  "areas": {
    dict: "happiness", word: "areas", stem: "area", anew: "field",
    avg: [ 4.08, 5.34 ], std: [ 2.41, 1.02 ], fq: 50 
  },
  "backs": {
    dict: "happiness", word: "backs", stem: "back", anew: "game",
    avg: [ 5.89, 5.34 ], std: [ 2.37, 1.44 ], fq: 50 
  },
  "campaign": {
    dict: "happiness", word: "campaign", stem: "campaign", anew: "fight",
    avg: [ 7.15, 5.34 ], std: [ 2.19, 1.55 ], fq: 50 
  },
  "checked": {
    dict: "happiness", word: "checked", stem: "check", anew: "controlling",
    avg: [ 6.10, 5.34 ], std: [ 2.19, 1.14 ], fq: 50 
  },
  "crossing": {
    dict: "happiness", word: "crossing", stem: "cross", anew: "frustrated",
    avg: [ 5.61, 5.34 ], std: [ 2.76, 1.33 ], fq: 50 
  },
  "currently": {
    dict: "happiness", word: "currently", stem: "current", anew: "present",
    avg: [ 5.12, 5.34 ], std: [ 2.39, 0.82 ], fq: 50 
  },
  "doctor": {
    dict: "happiness", word: "doctor", stem: "doctor", anew: "doctor",
    avg: [ 5.86, 5.34 ], std: [ 2.70, 1.62 ], fq: 50 
  },
  "drank": {
    dict: "happiness", word: "drank", stem: "drank", anew: "salute",
    avg: [ 5.31, 5.34 ], std: [ 2.23, 1.47 ], fq: 50 
  },
  "editorial": {
    dict: "happiness", word: "editorial", stem: "editori", anew: "column",
    avg: [ 3.62, 5.34 ], std: [ 1.91, 1.36 ], fq: 50 
  },
  "flick": {
    dict: "happiness", word: "flick", stem: "flick", anew: "movie",
    avg: [ 4.93, 5.34 ], std: [ 2.54, 1.36 ], fq: 50 
  },
  "fur": {
    dict: "happiness", word: "fur", stem: "fur", anew: "fur",
    avg: [ 4.18, 5.34 ], std: [ 2.44, 1.73 ], fq: 50 
  },
  "iron": {
    dict: "happiness", word: "iron", stem: "iron", anew: "iron",
    avg: [ 3.76, 5.34 ], std: [ 2.06, 1.35 ], fq: 50 
  },
  "middle": {
    dict: "happiness", word: "middle", stem: "middl", anew: "heart",
    avg: [ 6.34, 5.34 ], std: [ 2.25, 0.72 ], fq: 50 
  },
  "moderate": {
    dict: "happiness", word: "moderate", stem: "moder", anew: "controlling",
    avg: [ 6.10, 5.34 ], std: [ 2.19, 1.27 ], fq: 50 
  },
  "physician": {
    dict: "happiness", word: "physician", stem: "physician", anew: "doctor",
    avg: [ 5.86, 5.34 ], std: [ 2.70, 1.84 ], fq: 50 
  },
  "transmitted": {
    dict: "happiness", word: "transmitted", stem: "transmit", anew: "family",
    avg: [ 4.80, 5.34 ], std: [ 2.71, 1.57 ], fq: 50 
  },
  "blink": {
    dict: "happiness", word: "blink", stem: "blink", anew: "wink",
    avg: [ 5.44, 5.33 ], std: [ 2.68, 1.43 ], fq: 50 
  },
  "threshold": {
    dict: "happiness", word: "threshold", stem: "threshold", anew: "door",
    avg: [ 3.80, 5.33 ], std: [ 2.29, 1.48 ], fq: 50 
  },
  "bench": {
    dict: "happiness", word: "bench", stem: "bench", anew: "bench",
    avg: [ 3.59, 5.32 ], std: [ 2.07, 1.04 ], fq: 50 
  },
  "chin": {
    dict: "happiness", word: "chin", stem: "chin", anew: "chin",
    avg: [ 3.31, 5.32 ], std: [ 1.98, 0.98 ], fq: 50 
  },
  "cover": {
    dict: "happiness", word: "cover", stem: "cover", anew: "hide",
    avg: [ 5.28, 5.32 ], std: [ 2.51, 1.27 ], fq: 50 
  },
  "deepest": {
    dict: "happiness", word: "deepest", stem: "deepest", anew: "riches",
    avg: [ 6.17, 5.32 ], std: [ 2.70, 1.45 ], fq: 50 
  },
  "editorials": {
    dict: "happiness", word: "editorials", stem: "editori", anew: "column",
    avg: [ 3.62, 5.32 ], std: [ 1.91, 1.10 ], fq: 50 
  },
  "estimates": {
    dict: "happiness", word: "estimates", stem: "estim", anew: "idea",
    avg: [ 5.86, 5.32 ], std: [ 1.81, 1.11 ], fq: 50 
  },
  "firm": {
    dict: "happiness", word: "firm", stem: "firm", anew: "house",
    avg: [ 4.56, 5.32 ], std: [ 2.41, 1.17 ], fq: 50 
  },
  "identified": {
    dict: "happiness", word: "identified", stem: "identifi", anew: "name",
    avg: [ 4.25, 5.32 ], std: [ 2.47, 1.27 ], fq: 50 
  },
  "measure": {
    dict: "happiness", word: "measure", stem: "measur", anew: "bar",
    avg: [ 5.00, 5.32 ], std: [ 2.83, 1.10 ], fq: 50 
  },
  "mention": {
    dict: "happiness", word: "mention", stem: "mention", anew: "name",
    avg: [ 4.25, 5.32 ], std: [ 2.47, 0.74 ], fq: 50 
  },
  "names": {
    dict: "happiness", word: "names", stem: "name", anew: "name",
    avg: [ 4.25, 5.32 ], std: [ 2.47, 1.00 ], fq: 50 
  },
  "partly": {
    dict: "happiness", word: "partly", stem: "partli", anew: "part",
    avg: [ 3.82, 5.32 ], std: [ 2.24, 1.17 ], fq: 50 
  },
  "posts": {
    dict: "happiness", word: "posts", stem: "post", anew: "office",
    avg: [ 4.08, 5.32 ], std: [ 1.92, 1.11 ], fq: 50 
  },
  "rebounds": {
    dict: "happiness", word: "rebounds", stem: "rebound", anew: "spring",
    avg: [ 5.67, 5.32 ], std: [ 2.51, 1.32 ], fq: 50 
  },
  "reserve": {
    dict: "happiness", word: "reserve", stem: "reserv", anew: "reserved",
    avg: [ 3.27, 5.32 ], std: [ 2.05, 1.11 ], fq: 50 
  },
  "review": {
    dict: "happiness", word: "review", stem: "review", anew: "refreshment",
    avg: [ 4.45, 5.32 ], std: [ 2.70, 1.02 ], fq: 50 
  },
  "skip": {
    dict: "happiness", word: "skip", stem: "skip", anew: "cut",
    avg: [ 5.00, 5.32 ], std: [ 2.32, 1.46 ], fq: 50 
  },
  "step": {
    dict: "happiness", word: "step", stem: "step", anew: "abuse",
    avg: [ 6.83, 5.32 ], std: [ 2.70, 0.87 ], fq: 50 
  },
  "table": {
    dict: "happiness", word: "table", stem: "tabl", anew: "table",
    avg: [ 2.92, 5.32 ], std: [ 2.16, 0.68 ], fq: 50 
  },
  "taking": {
    dict: "happiness", word: "taking", stem: "take", anew: "learn",
    avg: [ 5.39, 5.32 ], std: [ 2.22, 1.30 ], fq: 50 
  },
  "tells": {
    dict: "happiness", word: "tells", stem: "tell", anew: "severe",
    avg: [ 5.26, 5.32 ], std: [ 2.36, 1.27 ], fq: 50 
  },
  "turning": {
    dict: "happiness", word: "turning", stem: "turn", anew: "deformed",
    avg: [ 4.07, 5.32 ], std: [ 2.34, 1.02 ], fq: 50 
  },
  "affecting": {
    dict: "happiness", word: "affecting", stem: "affect", anew: "affection",
    avg: [ 6.21, 5.31 ], std: [ 2.75, 1.33 ], fq: 50 
  },
  "consume": {
    dict: "happiness", word: "consume", stem: "consum", anew: "waste",
    avg: [ 4.14, 5.31 ], std: [ 2.30, 1.88 ], fq: 50 
  },
  "discipline": {
    dict: "happiness", word: "discipline", stem: "disciplin", anew: "field",
    avg: [ 4.08, 5.31 ], std: [ 2.41, 1.81 ], fq: 50 
  },
  "heed": {
    dict: "happiness", word: "heed", stem: "heed", anew: "mind",
    avg: [ 5.00, 5.31 ], std: [ 2.68, 1.21 ], fq: 50 
  },
  "aire": {
    dict: "happiness", word: "aire", stem: "air", anew: "air",
    avg: [ 4.12, 5.30 ], std: [ 2.30, 1.42 ], fq: 50 
  },
  "center": {
    dict: "happiness", word: "center", stem: "center", anew: "heart",
    avg: [ 6.34, 5.30 ], std: [ 2.25, 0.99 ], fq: 50 
  },
  "chairman": {
    dict: "happiness", word: "chairman", stem: "chairman", anew: "chair",
    avg: [ 3.15, 5.30 ], std: [ 1.77, 1.47 ], fq: 50 
  },
  "circuits": {
    dict: "happiness", word: "circuits", stem: "circuit", anew: "circle",
    avg: [ 3.86, 5.30 ], std: [ 2.13, 0.76 ], fq: 50 
  },
  "creature": {
    dict: "happiness", word: "creature", stem: "creatur", anew: "tool",
    avg: [ 4.33, 5.30 ], std: [ 1.78, 1.64 ], fq: 50 
  },
  "editing": {
    dict: "happiness", word: "editing", stem: "edit", anew: "cut",
    avg: [ 5.00, 5.30 ], std: [ 2.32, 1.23 ], fq: 50 
  },
  "elevator": {
    dict: "happiness", word: "elevator", stem: "elev", anew: "elevator",
    avg: [ 4.16, 5.30 ], std: [ 1.99, 1.39 ], fq: 50 
  },
  "lesson": {
    dict: "happiness", word: "lesson", stem: "lesson", anew: "moral",
    avg: [ 4.49, 5.30 ], std: [ 2.28, 1.49 ], fq: 50 
  },
  "md": {
    dict: "happiness", word: "md", stem: "md", anew: "doctor",
    avg: [ 5.86, 5.30 ], std: [ 2.70, 1.13 ], fq: 50 
  },
  "miles": {
    dict: "happiness", word: "miles", stem: "mile", anew: "knot",
    avg: [ 4.07, 5.30 ], std: [ 2.15, 1.17 ], fq: 50 
  },
  "patch": {
    dict: "happiness", word: "patch", stem: "patch", anew: "bandage",
    avg: [ 3.90, 5.30 ], std: [ 2.07, 1.04 ], fq: 50 
  },
  "pay": {
    dict: "happiness", word: "pay", stem: "pay", anew: "devoted",
    avg: [ 5.23, 5.30 ], std: [ 2.21, 2.32 ], fq: 50 
  },
  "placed": {
    dict: "happiness", word: "placed", stem: "place", anew: "invest",
    avg: [ 5.12, 5.30 ], std: [ 2.42, 1.56 ], fq: 50 
  },
  "pounds": {
    dict: "happiness", word: "pounds", stem: "pound", anew: "hammer",
    avg: [ 4.58, 5.30 ], std: [ 2.02, 1.82 ], fq: 50 
  },
  "randy": {
    dict: "happiness", word: "randy", stem: "randi", anew: "aroused",
    avg: [ 6.63, 5.30 ], std: [ 2.70, 1.36 ], fq: 50 
  },
  "reviews": {
    dict: "happiness", word: "reviews", stem: "review", anew: "refreshment",
    avg: [ 4.45, 5.30 ], std: [ 2.70, 1.22 ], fq: 50 
  },
  "silly": {
    dict: "happiness", word: "silly", stem: "silli", anew: "silly",
    avg: [ 5.88, 5.30 ], std: [ 2.38, 1.98 ], fq: 50 
  },
  "singular": {
    dict: "happiness", word: "singular", stem: "singular", anew: "odd",
    avg: [ 4.27, 5.30 ], std: [ 2.46, 1.45 ], fq: 50 
  },
  "somebody": {
    dict: "happiness", word: "somebody", stem: "somebodi", anew: "person",
    avg: [ 4.19, 5.30 ], std: [ 2.45, 1.13 ], fq: 50 
  },
  "someone": {
    dict: "happiness", word: "someone", stem: "someon", anew: "person",
    avg: [ 4.19, 5.30 ], std: [ 2.45, 1.17 ], fq: 50 
  },
  "spray": {
    dict: "happiness", word: "spray", stem: "spray", anew: "spray",
    avg: [ 4.14, 5.30 ], std: [ 2.28, 1.45 ], fq: 50 
  },
  "suit": {
    dict: "happiness", word: "suit", stem: "suit", anew: "lawsuit",
    avg: [ 4.93, 5.30 ], std: [ 2.44, 1.58 ], fq: 50 
  },
  "telling": {
    dict: "happiness", word: "telling", stem: "tell", anew: "severe",
    avg: [ 5.26, 5.30 ], std: [ 2.36, 1.05 ], fq: 50 
  },
  "transition": {
    dict: "happiness", word: "transition", stem: "transit", anew: "passage",
    avg: [ 4.36, 5.30 ], std: [ 2.13, 1.36 ], fq: 50 
  },
  "trump": {
    dict: "happiness", word: "trump", stem: "trump", anew: "trumpet",
    avg: [ 4.97, 5.30 ], std: [ 2.13, 1.71 ], fq: 50 
  },
  "ways": {
    dict: "happiness", word: "ways", stem: "way", anew: "manner",
    avg: [ 4.56, 5.30 ], std: [ 1.78, 1.17 ], fq: 50 
  },
  "heel": {
    dict: "happiness", word: "heel", stem: "heel", anew: "dog",
    avg: [ 5.76, 5.29 ], std: [ 2.50, 1.35 ], fq: 50 
  },
  "alert": {
    dict: "happiness", word: "alert", stem: "alert", anew: "alert",
    avg: [ 6.85, 5.28 ], std: [ 2.53, 1.81 ], fq: 50 
  },
  "beef": {
    dict: "happiness", word: "beef", stem: "beef", anew: "gripe",
    avg: [ 5.00, 5.28 ], std: [ 2.19, 2.18 ], fq: 50 
  },
  "defended": {
    dict: "happiness", word: "defended", stem: "defend", anew: "champion",
    avg: [ 5.85, 5.28 ], std: [ 3.15, 1.76 ], fq: 50 
  },
  "extract": {
    dict: "happiness", word: "extract", stem: "extract", anew: "education",
    avg: [ 5.74, 5.28 ], std: [ 2.46, 1.46 ], fq: 50 
  },
  "form": {
    dict: "happiness", word: "form", stem: "form", anew: "spring",
    avg: [ 5.67, 5.28 ], std: [ 2.51, 1.11 ], fq: 50 
  },
  "handling": {
    dict: "happiness", word: "handling", stem: "handl", anew: "treat",
    avg: [ 5.62, 5.28 ], std: [ 2.25, 1.09 ], fq: 50 
  },
  "happen": {
    dict: "happiness", word: "happen", stem: "happen", anew: "material",
    avg: [ 4.05, 5.28 ], std: [ 2.34, 1.05 ], fq: 50 
  },
  "held": {
    dict: "happiness", word: "held", stem: "held", anew: "controlling",
    avg: [ 6.10, 5.28 ], std: [ 2.19, 1.28 ], fq: 50 
  },
  "institute": {
    dict: "happiness", word: "institute", stem: "institut", anew: "plant",
    avg: [ 3.62, 5.28 ], std: [ 2.25, 1.41 ], fq: 50 
  },
  "james": {
    dict: "happiness", word: "james", stem: "jame", anew: "crushed",
    avg: [ 5.52, 5.28 ], std: [ 2.87, 1.07 ], fq: 50 
  },
  "minutes": {
    dict: "happiness", word: "minutes", stem: "minut", anew: "moment",
    avg: [ 3.83, 5.28 ], std: [ 2.29, 0.90 ], fq: 50 
  },
  "mode": {
    dict: "happiness", word: "mode", stem: "mode", anew: "manner",
    avg: [ 4.56, 5.28 ], std: [ 1.78, 1.18 ], fq: 50 
  },
  "section": {
    dict: "happiness", word: "section", stem: "section", anew: "part",
    avg: [ 3.82, 5.28 ], std: [ 2.24, 0.83 ], fq: 50 
  },
  "sort": {
    dict: "happiness", word: "sort", stem: "sort", anew: "kindness",
    avg: [ 4.30, 5.28 ], std: [ 2.62, 0.83 ], fq: 50 
  },
  "stands": {
    dict: "happiness", word: "stands", stem: "stand", anew: "stomach",
    avg: [ 3.93, 5.28 ], std: [ 2.49, 0.88 ], fq: 50 
  },
  "stays": {
    dict: "happiness", word: "stays", stem: "stay", anew: "delayed",
    avg: [ 5.62, 5.28 ], std: [ 2.39, 1.31 ], fq: 50 
  },
  "tracks": {
    dict: "happiness", word: "tracks", stem: "track", anew: "dog",
    avg: [ 5.76, 5.28 ], std: [ 2.50, 1.11 ], fq: 50 
  },
  "unions": {
    dict: "happiness", word: "unions", stem: "union", anew: "unit",
    avg: [ 3.75, 5.28 ], std: [ 2.49, 1.65 ], fq: 50 
  },
  "wandering": {
    dict: "happiness", word: "wandering", stem: "wander", anew: "mobility",
    avg: [ 5.00, 5.28 ], std: [ 2.18, 1.73 ], fq: 50 
  },
  "agency": {
    dict: "happiness", word: "agency", stem: "agenc", anew: "office",
    avg: [ 4.08, 5.26 ], std: [ 1.92, 0.92 ], fq: 50 
  },
  "bid": {
    dict: "happiness", word: "bid", stem: "bid", anew: "wish",
    avg: [ 5.16, 5.26 ], std: [ 2.62, 1.19 ], fq: 50 
  },
  "companies": {
    dict: "happiness", word: "companies", stem: "compani", anew: "party",
    avg: [ 6.69, 5.26 ], std: [ 2.84, 1.03 ], fq: 50 
  },
  "facility": {
    dict: "happiness", word: "facility", stem: "facil", anew: "quick",
    avg: [ 6.57, 5.26 ], std: [ 1.78, 1.59 ], fq: 50 
  },
  "facing": {
    dict: "happiness", word: "facing", stem: "face", anew: "face",
    avg: [ 5.04, 5.26 ], std: [ 2.18, 1.10 ], fq: 50 
  },
  "frog": {
    dict: "happiness", word: "frog", stem: "frog", anew: "frog",
    avg: [ 4.54, 5.26 ], std: [ 2.03, 1.80 ], fq: 50 
  },
  "goes": {
    dict: "happiness", word: "goes", stem: "goe", anew: "ecstasy",
    avg: [ 7.38, 5.26 ], std: [ 1.92, 1.12 ], fq: 50 
  },
  "ground": {
    dict: "happiness", word: "ground", stem: "ground", anew: "grateful",
    avg: [ 4.58, 5.26 ], std: [ 2.14, 1.29 ], fq: 50 
  },
  "lines": {
    dict: "happiness", word: "lines", stem: "line", anew: "melody",
    avg: [ 4.98, 5.26 ], std: [ 2.52, 1.01 ], fq: 50 
  },
  "nearly": {
    dict: "happiness", word: "nearly", stem: "nearli", anew: "intimate",
    avg: [ 6.98, 5.26 ], std: [ 2.21, 1.24 ], fq: 50 
  },
  "papers": {
    dict: "happiness", word: "papers", stem: "paper", anew: "paper",
    avg: [ 2.50, 5.26 ], std: [ 1.85, 1.31 ], fq: 50 
  },
  "piece": {
    dict: "happiness", word: "piece", stem: "piec", anew: "part",
    avg: [ 3.82, 5.26 ], std: [ 2.24, 1.07 ], fq: 50 
  },
  "plot": {
    dict: "happiness", word: "plot", stem: "plot", anew: "game",
    avg: [ 5.89, 5.26 ], std: [ 2.37, 1.38 ], fq: 50 
  },
  "print": {
    dict: "happiness", word: "print", stem: "print", anew: "impressed",
    avg: [ 5.42, 5.26 ], std: [ 2.65, 1.21 ], fq: 50 
  },
  "reasons": {
    dict: "happiness", word: "reasons", stem: "reason", anew: "intellect",
    avg: [ 4.75, 5.26 ], std: [ 2.50, 1.01 ], fq: 50 
  },
  "shift": {
    dict: "happiness", word: "shift", stem: "shift", anew: "fault",
    avg: [ 4.07, 5.26 ], std: [ 1.69, 1.05 ], fq: 50 
  },
  "spot": {
    dict: "happiness", word: "spot", stem: "spot", anew: "office",
    avg: [ 4.08, 5.26 ], std: [ 1.92, 1.47 ], fq: 50 
  },
  "tool": {
    dict: "happiness", word: "tool", stem: "tool", anew: "tool",
    avg: [ 4.33, 5.26 ], std: [ 1.78, 1.54 ], fq: 50 
  },
  "units": {
    dict: "happiness", word: "units", stem: "unit", anew: "unit",
    avg: [ 3.75, 5.26 ], std: [ 2.49, 1.03 ], fq: 50 
  },
  "borne": {
    dict: "happiness", word: "borne", stem: "born", anew: "acceptance",
    avg: [ 5.40, 5.24 ], std: [ 2.70, 1.38 ], fq: 50 
  },
  "edited": {
    dict: "happiness", word: "edited", stem: "edit", anew: "cut",
    avg: [ 5.00, 5.24 ], std: [ 2.32, 1.14 ], fq: 50 
  },
  "encounter": {
    dict: "happiness", word: "encounter", stem: "encount", anew: "chance",
    avg: [ 5.38, 5.24 ], std: [ 2.58, 1.78 ], fq: 50 
  },
  "faced": {
    dict: "happiness", word: "faced", stem: "face", anew: "face",
    avg: [ 5.04, 5.24 ], std: [ 2.18, 1.24 ], fq: 50 
  },
  "industries": {
    dict: "happiness", word: "industries", stem: "industri", anew: "industry",
    avg: [ 4.47, 5.24 ], std: [ 2.43, 1.10 ], fq: 50 
  },
  "namely": {
    dict: "happiness", word: "namely", stem: "name", anew: "name",
    avg: [ 4.25, 5.24 ], std: [ 2.47, 1.27 ], fq: 50 
  },
  "partially": {
    dict: "happiness", word: "partially", stem: "partial", anew: "part",
    avg: [ 3.82, 5.24 ], std: [ 2.24, 1.30 ], fq: 50 
  },
  "parts": {
    dict: "happiness", word: "parts", stem: "part", anew: "part",
    avg: [ 3.82, 5.24 ], std: [ 2.24, 1.12 ], fq: 50 
  },
  "returns": {
    dict: "happiness", word: "returns", stem: "return", anew: "fall",
    avg: [ 4.70, 5.24 ], std: [ 2.48, 1.51 ], fq: 50 
  },
  "sat": {
    dict: "happiness", word: "sat", stem: "sat", anew: "seat",
    avg: [ 2.95, 5.24 ], std: [ 1.72, 1.33 ], fq: 50 
  },
  "sorts": {
    dict: "happiness", word: "sorts", stem: "sort", anew: "kindness",
    avg: [ 4.30, 5.24 ], std: [ 2.62, 0.94 ], fq: 50 
  },
  "substances": {
    dict: "happiness", word: "substances", stem: "substanc", anew: "heart",
    avg: [ 6.34, 5.24 ], std: [ 2.25, 1.30 ], fq: 50 
  },
  "ties": {
    dict: "happiness", word: "ties", stem: "tie", anew: "wedding",
    avg: [ 5.97, 5.24 ], std: [ 2.85, 1.45 ], fq: 50 
  },
  "turned": {
    dict: "happiness", word: "turned", stem: "turn", anew: "deformed",
    avg: [ 4.07, 5.24 ], std: [ 2.34, 0.85 ], fq: 50 
  },
  "way": {
    dict: "happiness", word: "way", stem: "way", anew: "manner",
    avg: [ 4.56, 5.24 ], std: [ 1.78, 1.42 ], fq: 50 
  },
  "wee": {
    dict: "happiness", word: "wee", stem: "wee", anew: "urine",
    avg: [ 4.20, 5.24 ], std: [ 2.18, 1.52 ], fq: 50 
  },
  "work": {
    dict: "happiness", word: "work", stem: "work", anew: "mold",
    avg: [ 4.07, 5.24 ], std: [ 1.98, 2.10 ], fq: 50 
  },
  "bits": {
    dict: "happiness", word: "bits", stem: "bit", anew: "moment",
    avg: [ 3.83, 5.22 ], std: [ 2.29, 0.86 ], fq: 50 
  },
  "cause": {
    dict: "happiness", word: "cause", stem: "caus", anew: "lawsuit",
    avg: [ 4.93, 5.22 ], std: [ 2.44, 1.06 ], fq: 50 
  },
  "defend": {
    dict: "happiness", word: "defend", stem: "defend", anew: "champion",
    avg: [ 5.85, 5.22 ], std: [ 3.15, 1.72 ], fq: 50 
  },
  "defending": {
    dict: "happiness", word: "defending", stem: "defend", anew: "champion",
    avg: [ 5.85, 5.22 ], std: [ 3.15, 1.50 ], fq: 50 
  },
  "nets": {
    dict: "happiness", word: "nets", stem: "net", anew: "profit",
    avg: [ 6.68, 5.22 ], std: [ 1.78, 0.93 ], fq: 50 
  },
  "officer": {
    dict: "happiness", word: "officer", stem: "offic", anew: "office",
    avg: [ 4.08, 5.22 ], std: [ 1.92, 1.64 ], fq: 50 
  },
  "pump": {
    dict: "happiness", word: "pump", stem: "pump", anew: "heart",
    avg: [ 6.34, 5.22 ], std: [ 2.25, 1.07 ], fq: 50 
  },
  "sentence": {
    dict: "happiness", word: "sentence", stem: "sentenc", anew: "time",
    avg: [ 4.64, 5.22 ], std: [ 2.75, 1.45 ], fq: 50 
  },
  "swallow": {
    dict: "happiness", word: "swallow", stem: "swallow", anew: "acceptance",
    avg: [ 5.40, 5.22 ], std: [ 2.70, 1.58 ], fq: 50 
  },
  "trance": {
    dict: "happiness", word: "trance", stem: "tranc", anew: "fascinate",
    avg: [ 5.83, 5.22 ], std: [ 2.73, 1.72 ], fq: 50 
  },
  "trick": {
    dict: "happiness", word: "trick", stem: "trick", anew: "magical",
    avg: [ 5.95, 5.22 ], std: [ 2.36, 1.67 ], fq: 50 
  },
  "masses": {
    dict: "happiness", word: "masses", stem: "mass", anew: "mountain",
    avg: [ 5.49, 5.21 ], std: [ 2.43, 1.32 ], fq: 50 
  },
  "twist": {
    dict: "happiness", word: "twist", stem: "twist", anew: "pervert",
    avg: [ 6.26, 5.21 ], std: [ 2.61, 1.38 ], fq: 50 
  },
  "alcohol": {
    dict: "happiness", word: "alcohol", stem: "alcohol", anew: "alcoholic",
    avg: [ 5.69, 5.20 ], std: [ 2.36, 2.32 ], fq: 50 
  },
  "cab": {
    dict: "happiness", word: "cab", stem: "cab", anew: "taxi",
    avg: [ 3.41, 5.20 ], std: [ 2.14, 1.53 ], fq: 50 
  },
  "checking": {
    dict: "happiness", word: "checking", stem: "check", anew: "controlling",
    avg: [ 6.10, 5.20 ], std: [ 2.19, 1.37 ], fq: 50 
  },
  "happens": {
    dict: "happiness", word: "happens", stem: "happen", anew: "material",
    avg: [ 4.05, 5.20 ], std: [ 2.34, 1.21 ], fq: 50 
  },
  "internal": {
    dict: "happiness", word: "internal", stem: "intern", anew: "intimate",
    avg: [ 6.98, 5.20 ], std: [ 2.21, 1.31 ], fq: 50 
  },
  "jaw": {
    dict: "happiness", word: "jaw", stem: "jaw", anew: "gossip",
    avg: [ 5.74, 5.20 ], std: [ 2.38, 1.34 ], fq: 50 
  },
  "lightning": {
    dict: "happiness", word: "lightning", stem: "lightn", anew: "lightning",
    avg: [ 6.61, 5.20 ], std: [ 1.77, 1.88 ], fq: 50 
  },
  "loads": {
    dict: "happiness", word: "loads", stem: "load", anew: "burdened",
    avg: [ 5.63, 5.20 ], std: [ 2.07, 1.21 ], fq: 50 
  },
  "marketing": {
    dict: "happiness", word: "marketing", stem: "market", anew: "market",
    avg: [ 4.12, 5.20 ], std: [ 1.83, 1.95 ], fq: 50 
  },
  "percentage": {
    dict: "happiness", word: "percentage", stem: "percentag", anew: "part",
    avg: [ 3.82, 5.20 ], std: [ 2.24, 0.81 ], fq: 50 
  },
  "physicians": {
    dict: "happiness", word: "physicians", stem: "physician", anew: "doctor",
    avg: [ 5.86, 5.20 ], std: [ 2.70, 1.65 ], fq: 50 
  },
  "retiring": {
    dict: "happiness", word: "retiring", stem: "retir", anew: "bed",
    avg: [ 3.61, 5.20 ], std: [ 2.56, 2.16 ], fq: 50 
  },
  "return": {
    dict: "happiness", word: "return", stem: "return", anew: "fall",
    avg: [ 4.70, 5.20 ], std: [ 2.48, 1.47 ], fq: 50 
  },
  "sections": {
    dict: "happiness", word: "sections", stem: "section", anew: "part",
    avg: [ 3.82, 5.20 ], std: [ 2.24, 1.17 ], fq: 50 
  },
  "snap": {
    dict: "happiness", word: "snap", stem: "snap", anew: "breeze",
    avg: [ 4.37, 5.20 ], std: [ 2.32, 1.63 ], fq: 50 
  },
  "tighter": {
    dict: "happiness", word: "tighter", stem: "tighter", anew: "nasty",
    avg: [ 4.89, 5.20 ], std: [ 2.50, 1.44 ], fq: 50 
  },
  "tires": {
    dict: "happiness", word: "tires", stem: "tire", anew: "bored",
    avg: [ 2.83, 5.20 ], std: [ 2.31, 1.37 ], fq: 50 
  },
  "turn": {
    dict: "happiness", word: "turn", stem: "turn", anew: "deformed",
    avg: [ 4.07, 5.20 ], std: [ 2.34, 1.25 ], fq: 50 
  },
  "turns": {
    dict: "happiness", word: "turns", stem: "turn", anew: "deformed",
    avg: [ 4.07, 5.20 ], std: [ 2.34, 0.90 ], fq: 50 
  },
  "back": {
    dict: "happiness", word: "back", stem: "back", anew: "hinder",
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50 
  },
  "basement": {
    dict: "happiness", word: "basement", stem: "basement", anew: "cellar",
    avg: [ 4.39, 5.18 ], std: [ 2.33, 1.02 ], fq: 50 
  },
  "blowing": {
    dict: "happiness", word: "blowing", stem: "blow", anew: "waste",
    avg: [ 4.14, 5.18 ], std: [ 2.30, 1.59 ], fq: 50 
  },
  "boards": {
    dict: "happiness", word: "boards", stem: "board", anew: "board",
    avg: [ 3.36, 5.18 ], std: [ 2.12, 1.08 ], fq: 50 
  },
  "claim": {
    dict: "happiness", word: "claim", stem: "claim", anew: "arrogant",
    avg: [ 5.65, 5.18 ], std: [ 2.23, 1.49 ], fq: 50 
  },
  "collar": {
    dict: "happiness", word: "collar", stem: "collar", anew: "pinch",
    avg: [ 4.59, 5.18 ], std: [ 2.10, 1.32 ], fq: 50 
  },
  "context": {
    dict: "happiness", word: "context", stem: "context", anew: "context",
    avg: [ 4.22, 5.18 ], std: [ 2.24, 0.96 ], fq: 50 
  },
  "existing": {
    dict: "happiness", word: "existing", stem: "exist", anew: "lively",
    avg: [ 5.53, 5.18 ], std: [ 2.90, 1.67 ], fq: 50 
  },
  "horn": {
    dict: "happiness", word: "horn", stem: "horn", anew: "trumpet",
    avg: [ 4.97, 5.18 ], std: [ 2.13, 1.42 ], fq: 50 
  },
  "month": {
    dict: "happiness", word: "month", stem: "month", anew: "month",
    avg: [ 4.03, 5.18 ], std: [ 1.77, 1.34 ], fq: 50 
  },
  "notion": {
    dict: "happiness", word: "notion", stem: "notion", anew: "impressed",
    avg: [ 5.42, 5.18 ], std: [ 2.65, 1.32 ], fq: 50 
  },
  "penis": {
    dict: "happiness", word: "penis", stem: "peni", anew: "penis",
    avg: [ 5.54, 5.18 ], std: [ 2.63, 1.96 ], fq: 50 
  },
  "plug": {
    dict: "happiness", word: "plug", stem: "plug", anew: "secure",
    avg: [ 3.14, 5.18 ], std: [ 2.47, 1.02 ], fq: 50 
  },
  "public": {
    dict: "happiness", word: "public", stem: "public", anew: "world",
    avg: [ 5.32, 5.18 ], std: [ 2.39, 1.37 ], fq: 50 
  },
  "returned": {
    dict: "happiness", word: "returned", stem: "return", anew: "fall",
    avg: [ 4.70, 5.18 ], std: [ 2.48, 1.44 ], fq: 50 
  },
  "stepped": {
    dict: "happiness", word: "stepped", stem: "step", anew: "abuse",
    avg: [ 6.83, 5.18 ], std: [ 2.70, 1.27 ], fq: 50 
  },
  "take": {
    dict: "happiness", word: "take", stem: "take", anew: "learn",
    avg: [ 5.39, 5.18 ], std: [ 2.22, 1.51 ], fq: 50 
  },
  "urge": {
    dict: "happiness", word: "urge", stem: "urg", anew: "inspired",
    avg: [ 6.02, 5.18 ], std: [ 2.67, 1.30 ], fq: 50 
  },
  "spine": {
    dict: "happiness", word: "spine", stem: "spine", anew: "thorn",
    avg: [ 5.14, 5.16 ], std: [ 2.14, 1.28 ], fq: 50 
  },
  "dos": {
    dict: "happiness", word: "dos", stem: "do", anew: "execution",
    avg: [ 5.71, 5.16 ], std: [ 2.74, 1.33 ], fq: 50 
  },
  "effect": {
    dict: "happiness", word: "effect", stem: "effect", anew: "impressed",
    avg: [ 5.42, 5.16 ], std: [ 2.65, 1.09 ], fq: 50 
  },
  "floor": {
    dict: "happiness", word: "floor", stem: "floor", anew: "dump",
    avg: [ 4.12, 5.16 ], std: [ 2.36, 1.25 ], fq: 50 
  },
  "locker": {
    dict: "happiness", word: "locker", stem: "locker", anew: "locker",
    avg: [ 3.38, 5.16 ], std: [ 2.13, 0.96 ], fq: 50 
  },
  "months": {
    dict: "happiness", word: "months", stem: "month", anew: "month",
    avg: [ 4.03, 5.16 ], std: [ 1.77, 0.87 ], fq: 50 
  },
  "notice": {
    dict: "happiness", word: "notice", stem: "notic", anew: "poster",
    avg: [ 3.93, 5.16 ], std: [ 2.56, 1.50 ], fq: 50 
  },
  "ones": {
    dict: "happiness", word: "ones", stem: "one", anew: "ace",
    avg: [ 5.50, 5.16 ], std: [ 2.66, 0.82 ], fq: 50 
  },
  "remaining": {
    dict: "happiness", word: "remaining", stem: "remain", anew: "odd",
    avg: [ 4.27, 5.16 ], std: [ 2.46, 1.28 ], fq: 50 
  },
  "wears": {
    dict: "happiness", word: "wears", stem: "wear", anew: "fatigued",
    avg: [ 2.64, 5.16 ], std: [ 2.19, 0.98 ], fq: 50 
  },
  "posterior": {
    dict: "happiness", word: "posterior", stem: "posterior", anew: "seat",
    avg: [ 2.95, 5.15 ], std: [ 1.72, 1.44 ], fq: 50 
  },
  "bearing": {
    dict: "happiness", word: "bearing", stem: "bear", anew: "acceptance",
    avg: [ 5.40, 5.14 ], std: [ 2.70, 1.53 ], fq: 50 
  },
  "firms": {
    dict: "happiness", word: "firms", stem: "firm", anew: "house",
    avg: [ 4.56, 5.14 ], std: [ 2.41, 1.18 ], fq: 50 
  },
  "hypnotized": {
    dict: "happiness", word: "hypnotized", stem: "hypnot", anew: "fascinate",
    avg: [ 5.83, 5.14 ], std: [ 2.73, 1.46 ], fq: 50 
  },
  "lesbian": {
    dict: "happiness", word: "lesbian", stem: "lesbian", anew: "lesbian",
    avg: [ 5.12, 5.14 ], std: [ 2.27, 2.11 ], fq: 50 
  },
  "operated": {
    dict: "happiness", word: "operated", stem: "oper", anew: "engaged",
    avg: [ 6.77, 5.14 ], std: [ 2.07, 1.31 ], fq: 50 
  },
  "region": {
    dict: "happiness", word: "region", stem: "region", anew: "part",
    avg: [ 3.82, 5.14 ], std: [ 2.24, 1.14 ], fq: 50 
  },
  "retired": {
    dict: "happiness", word: "retired", stem: "retir", anew: "bed",
    avg: [ 3.61, 5.14 ], std: [ 2.56, 1.95 ], fq: 50 
  },
  "shake": {
    dict: "happiness", word: "shake", stem: "shake", anew: "excitement",
    avg: [ 7.67, 5.14 ], std: [ 1.91, 1.20 ], fq: 50 
  },
  "silence": {
    dict: "happiness", word: "silence", stem: "silenc", anew: "quiet",
    avg: [ 2.82, 5.14 ], std: [ 2.13, 1.74 ], fq: 50 
  },
  "still": {
    dict: "happiness", word: "still", stem: "still", anew: "smooth",
    avg: [ 4.91, 5.14 ], std: [ 2.57, 1.12 ], fq: 50 
  },
  "supposed": {
    dict: "happiness", word: "supposed", stem: "suppos", anew: "imagine",
    avg: [ 5.98, 5.14 ], std: [ 2.14, 1.12 ], fq: 50 
  },
  "track": {
    dict: "happiness", word: "track", stem: "track", anew: "dog",
    avg: [ 5.76, 5.14 ], std: [ 2.50, 1.14 ], fq: 50 
  },
  "wet": {
    dict: "happiness", word: "wet", stem: "wet", anew: "stiff",
    avg: [ 4.02, 5.14 ], std: [ 2.41, 1.41 ], fq: 50 
  },
  "yearning": {
    dict: "happiness", word: "yearning", stem: "yearn", anew: "ache",
    avg: [ 5.00, 5.14 ], std: [ 2.45, 1.57 ], fq: 50 
  },
  "ankle": {
    dict: "happiness", word: "ankle", stem: "ankl", anew: "ankle",
    avg: [ 4.16, 5.12 ], std: [ 2.03, 0.82 ], fq: 50 
  },
  "backed": {
    dict: "happiness", word: "backed", stem: "back", anew: "game",
    avg: [ 5.89, 5.12 ], std: [ 2.37, 1.38 ], fq: 50 
  },
  "bare": {
    dict: "happiness", word: "bare", stem: "bare", anew: "naked",
    avg: [ 5.80, 5.12 ], std: [ 2.80, 1.72 ], fq: 50 
  },
  "cell": {
    dict: "happiness", word: "cell", stem: "cell", anew: "cell",
    avg: [ 4.08, 5.12 ], std: [ 2.19, 1.41 ], fq: 50 
  },
  "contained": {
    dict: "happiness", word: "contained", stem: "contain", anew: "controlling",
    avg: [ 6.10, 5.12 ], std: [ 2.19, 1.36 ], fq: 50 
  },
  "cops": {
    dict: "happiness", word: "cops", stem: "cop", anew: "pig",
    avg: [ 4.20, 5.12 ], std: [ 2.42, 1.85 ], fq: 50 
  },
  "crush": {
    dict: "happiness", word: "crush", stem: "crush", anew: "crushed",
    avg: [ 5.52, 5.12 ], std: [ 2.87, 1.75 ], fq: 50 
  },
  "office": {
    dict: "happiness", word: "office", stem: "offic", anew: "office",
    avg: [ 4.08, 5.12 ], std: [ 1.92, 1.62 ], fq: 50 
  },
  "rear": {
    dict: "happiness", word: "rear", stem: "rear", anew: "seat",
    avg: [ 2.95, 5.12 ], std: [ 1.72, 1.47 ], fq: 50 
  },
  "rounds": {
    dict: "happiness", word: "rounds", stem: "round", anew: "circle",
    avg: [ 3.86, 5.12 ], std: [ 2.13, 1.02 ], fq: 50 
  },
  "shadows": {
    dict: "happiness", word: "shadows", stem: "shadow", anew: "shadow",
    avg: [ 4.30, 5.12 ], std: [ 2.26, 1.73 ], fq: 50 
  },
  "side": {
    dict: "happiness", word: "side", stem: "side", anew: "face",
    avg: [ 5.04, 5.12 ], std: [ 2.18, 0.72 ], fq: 50 
  },
  "single": {
    dict: "happiness", word: "single", stem: "singl", anew: "ace",
    avg: [ 5.50, 5.12 ], std: [ 2.66, 1.52 ], fq: 50 
  },
  "wander": {
    dict: "happiness", word: "wander", stem: "wander", anew: "betray",
    avg: [ 7.24, 5.12 ], std: [ 2.06, 1.64 ], fq: 50 
  },
  "bases": {
    dict: "happiness", word: "bases", stem: "base", anew: "foot",
    avg: [ 3.27, 5.10 ], std: [ 1.98, 1.04 ], fq: 50 
  },
  "butt": {
    dict: "happiness", word: "butt", stem: "butt", anew: "seat",
    avg: [ 2.95, 5.10 ], std: [ 1.72, 1.85 ], fq: 50 
  },
  "cells": {
    dict: "happiness", word: "cells", stem: "cell", anew: "cell",
    avg: [ 4.08, 5.10 ], std: [ 2.19, 1.40 ], fq: 50 
  },
  "circuit": {
    dict: "happiness", word: "circuit", stem: "circuit", anew: "circle",
    avg: [ 3.86, 5.10 ], std: [ 2.13, 1.25 ], fq: 50 
  },
  "cliff": {
    dict: "happiness", word: "cliff", stem: "cliff", anew: "cliff",
    avg: [ 6.25, 5.10 ], std: [ 2.15, 1.53 ], fq: 50 
  },
  "consumption": {
    dict: "happiness", word: "consumption", stem: "consumpt", anew: "useful",
    avg: [ 4.26, 5.10 ], std: [ 2.47, 1.80 ], fq: 50 
  },
  "dealt": {
    dict: "happiness", word: "dealt", stem: "dealt", anew: "treat",
    avg: [ 5.62, 5.10 ], std: [ 2.25, 1.25 ], fq: 50 
  },
  "lists": {
    dict: "happiness", word: "lists", stem: "list", anew: "name",
    avg: [ 4.25, 5.10 ], std: [ 2.47, 1.37 ], fq: 50 
  },
  "mans": {
    dict: "happiness", word: "mans", stem: "man", anew: "man",
    avg: [ 5.24, 5.10 ], std: [ 2.31, 1.39 ], fq: 50 
  },
  "marks": {
    dict: "happiness", word: "marks", stem: "mark", anew: "scar",
    avg: [ 4.79, 5.10 ], std: [ 2.11, 1.43 ], fq: 50 
  },
  "merger": {
    dict: "happiness", word: "merger", stem: "merger", anew: "unit",
    avg: [ 3.75, 5.10 ], std: [ 2.49, 1.02 ], fq: 50 
  },
  "obey": {
    dict: "happiness", word: "obey", stem: "obey", anew: "obey",
    avg: [ 4.23, 5.10 ], std: [ 1.72, 1.88 ], fq: 50 
  },
  "pin": {
    dict: "happiness", word: "pin", stem: "pin", anew: "flag",
    avg: [ 4.60, 5.10 ], std: [ 2.35, 0.89 ], fq: 50 
  },
  "puts": {
    dict: "happiness", word: "puts", stem: "put", anew: "invest",
    avg: [ 5.12, 5.10 ], std: [ 2.42, 0.65 ], fq: 50 
  },
  "stack": {
    dict: "happiness", word: "stack", stem: "stack", anew: "mountain",
    avg: [ 5.49, 5.10 ], std: [ 2.43, 1.13 ], fq: 50 
  },
  "wolf": {
    dict: "happiness", word: "wolf", stem: "wolf", anew: "beast",
    avg: [ 5.57, 5.10 ], std: [ 2.61, 1.81 ], fq: 50 
  },
  "hump": {
    dict: "happiness", word: "hump", stem: "hump", anew: "loved",
    avg: [ 6.38, 5.08 ], std: [ 2.68, 1.74 ], fq: 50 
  },
  "trace": {
    dict: "happiness", word: "trace", stem: "trace", anew: "shadow",
    avg: [ 4.30, 5.08 ], std: [ 2.26, 1.22 ], fq: 50 
  },
  "assuming": {
    dict: "happiness", word: "assuming", stem: "assum", anew: "acceptance",
    avg: [ 5.40, 5.08 ], std: [ 2.70, 1.41 ], fq: 50 
  },
  "neutral": {
    dict: "happiness", word: "neutral", stem: "neutral", anew: "indifferent",
    avg: [ 3.18, 5.08 ], std: [ 1.85, 1.11 ], fq: 50 
  },
  "admitted": {
    dict: "happiness", word: "admitted", stem: "admit", anew: "acceptance",
    avg: [ 5.40, 5.08 ], std: [ 2.70, 1.35 ], fq: 50 
  },
  "base": {
    dict: "happiness", word: "base", stem: "base", anew: "foot",
    avg: [ 3.27, 5.08 ], std: [ 1.98, 1.05 ], fq: 50 
  },
  "booked": {
    dict: "happiness", word: "booked", stem: "book", anew: "book",
    avg: [ 4.17, 5.08 ], std: [ 2.49, 1.55 ], fq: 50 
  },
  "buss": {
    dict: "happiness", word: "buss", stem: "buss", anew: "kiss",
    avg: [ 7.32, 5.08 ], std: [ 2.03, 1.37 ], fq: 50 
  },
  "cord": {
    dict: "happiness", word: "cord", stem: "cord", anew: "cord",
    avg: [ 3.54, 5.08 ], std: [ 2.09, 1.10 ], fq: 50 
  },
  "john": {
    dict: "happiness", word: "john", stem: "john", anew: "bathroom",
    avg: [ 3.88, 5.08 ], std: [ 1.72, 1.16 ], fq: 50 
  },
  "listed": {
    dict: "happiness", word: "listed", stem: "list", anew: "name",
    avg: [ 4.25, 5.08 ], std: [ 2.47, 1.16 ], fq: 50 
  },
  "medicine": {
    dict: "happiness", word: "medicine", stem: "medicin", anew: "medicine",
    avg: [ 4.40, 5.08 ], std: [ 2.36, 1.69 ], fq: 50 
  },
  "might": {
    dict: "happiness", word: "might", stem: "might", anew: "mighty",
    avg: [ 5.61, 5.08 ], std: [ 2.38, 1.23 ], fq: 50 
  },
  "noted": {
    dict: "happiness", word: "noted", stem: "note", anew: "fame",
    avg: [ 6.55, 5.08 ], std: [ 2.46, 1.01 ], fq: 50 
  },
  "seconds": {
    dict: "happiness", word: "seconds", stem: "second", anew: "moment",
    avg: [ 3.83, 5.08 ], std: [ 2.29, 0.97 ], fq: 50 
  },
  "sets": {
    dict: "happiness", word: "sets", stem: "set", anew: "dress",
    avg: [ 4.05, 5.08 ], std: [ 1.89, 1.34 ], fq: 50 
  },
  "settle": {
    dict: "happiness", word: "settle", stem: "settl", anew: "fall",
    avg: [ 4.70, 5.08 ], std: [ 2.48, 1.44 ], fq: 50 
  },
  "squeeze": {
    dict: "happiness", word: "squeeze", stem: "squeez", anew: "pressure",
    avg: [ 6.07, 5.08 ], std: [ 2.26, 1.70 ], fq: 50 
  },
  "tag": {
    dict: "happiness", word: "tag", stem: "tag", anew: "dog",
    avg: [ 5.76, 5.08 ], std: [ 2.50, 1.28 ], fq: 50 
  },
  "told": {
    dict: "happiness", word: "told", stem: "told", anew: "severe",
    avg: [ 5.26, 5.08 ], std: [ 2.36, 1.38 ], fq: 50 
  },
  "transit": {
    dict: "happiness", word: "transit", stem: "transit", anew: "passage",
    avg: [ 4.36, 5.08 ], std: [ 2.13, 1.21 ], fq: 50 
  },
  "wanted": {
    dict: "happiness", word: "wanted", stem: "want", anew: "desire",
    avg: [ 7.35, 5.08 ], std: [ 1.76, 1.78 ], fq: 50 
  },
  "swallowed": {
    dict: "happiness", word: "swallowed", stem: "swallow", anew: "acceptance",
    avg: [ 5.40, 5.06 ], std: [ 2.70, 1.48 ], fq: 50 
  },
  "aus": {
    dict: "happiness", word: "aus", stem: "au", anew: "gold",
    avg: [ 5.76, 5.06 ], std: [ 2.79, 1.00 ], fq: 50 
  },
  "bend": {
    dict: "happiness", word: "bend", stem: "bend", anew: "deformed",
    avg: [ 4.07, 5.06 ], std: [ 2.34, 1.32 ], fq: 50 
  },
  "chill": {
    dict: "happiness", word: "chill", stem: "chill", anew: "thrill",
    avg: [ 8.02, 5.06 ], std: [ 1.65, 2.10 ], fq: 50 
  },
  "follows": {
    dict: "happiness", word: "follows", stem: "follow", anew: "watch",
    avg: [ 4.10, 5.06 ], std: [ 2.12, 1.61 ], fq: 50 
  },
  "moved": {
    dict: "happiness", word: "moved", stem: "move", anew: "impressed",
    avg: [ 5.42, 5.06 ], std: [ 2.65, 1.24 ], fq: 50 
  },
  "phase": {
    dict: "happiness", word: "phase", stem: "phase", anew: "phase",
    avg: [ 3.98, 5.06 ], std: [ 1.82, 0.98 ], fq: 50 
  },
  "primitive": {
    dict: "happiness", word: "primitive", stem: "primit", anew: "rude",
    avg: [ 6.31, 5.06 ], std: [ 2.47, 1.54 ], fq: 50 
  },
  "rattle": {
    dict: "happiness", word: "rattle", stem: "rattl", anew: "rattle",
    avg: [ 4.36, 5.06 ], std: [ 2.18, 1.54 ], fq: 50 
  },
  "ruth": {
    dict: "happiness", word: "ruth", stem: "ruth", anew: "pity",
    avg: [ 3.72, 5.06 ], std: [ 2.02, 1.28 ], fq: 50 
  },
  "stones": {
    dict: "happiness", word: "stones", stem: "stone", anew: "rock",
    avg: [ 4.52, 5.06 ], std: [ 2.37, 1.25 ], fq: 50 
  },
  "streak": {
    dict: "happiness", word: "streak", stem: "streak", anew: "bar",
    avg: [ 5.00, 5.06 ], std: [ 2.83, 1.41 ], fq: 50 
  },
  "judgement": {
    dict: "happiness", word: "judgement", stem: "judgement", anew: "mind",
    avg: [ 5.00, 5.04 ], std: [ 2.68, 1.57 ], fq: 50 
  },
  "conquer": {
    dict: "happiness", word: "conquer", stem: "conquer", anew: "subdued",
    avg: [ 2.90, 5.04 ], std: [ 1.81, 2.22 ], fq: 50 
  },
  "advertising": {
    dict: "happiness", word: "advertising", stem: "advertis", anew: "promotion",
    avg: [ 6.44, 5.04 ], std: [ 2.58, 1.58 ], fq: 50 
  },
  "biz": {
    dict: "happiness", word: "biz", stem: "biz", anew: "game",
    avg: [ 5.89, 5.04 ], std: [ 2.37, 1.37 ], fq: 50 
  },
  "blaze": {
    dict: "happiness", word: "blaze", stem: "blaze", anew: "hell",
    avg: [ 5.38, 5.04 ], std: [ 2.62, 1.52 ], fq: 50 
  },
  "break": {
    dict: "happiness", word: "break", stem: "break", anew: "fault",
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50 
  },
  "charged": {
    dict: "happiness", word: "charged", stem: "charg", anew: "excitement",
    avg: [ 7.67, 5.04 ], std: [ 1.91, 1.59 ], fq: 50 
  },
  "doc": {
    dict: "happiness", word: "doc", stem: "doc", anew: "doctor",
    avg: [ 5.86, 5.04 ], std: [ 2.70, 1.48 ], fq: 50 
  },
  "fleet": {
    dict: "happiness", word: "fleet", stem: "fleet", anew: "swift",
    avg: [ 5.39, 5.04 ], std: [ 2.53, 1.37 ], fq: 50 
  },
  "hombre": {
    dict: "happiness", word: "hombre", stem: "hombr", anew: "cat",
    avg: [ 4.38, 5.04 ], std: [ 2.24, 1.35 ], fq: 50 
  },
  "measures": {
    dict: "happiness", word: "measures", stem: "measur", anew: "bar",
    avg: [ 5.00, 5.04 ], std: [ 2.83, 1.24 ], fq: 50 
  },
  "mile": {
    dict: "happiness", word: "mile", stem: "mile", anew: "knot",
    avg: [ 4.07, 5.04 ], std: [ 2.15, 1.05 ], fq: 50 
  },
  "nun": {
    dict: "happiness", word: "nun", stem: "nun", anew: "nun",
    avg: [ 2.93, 5.04 ], std: [ 1.80, 1.54 ], fq: 50 
  },
  "occupied": {
    dict: "happiness", word: "occupied", stem: "occupi", anew: "engaged",
    avg: [ 6.77, 5.04 ], std: [ 2.07, 1.34 ], fq: 50 
  },
  "patient": {
    dict: "happiness", word: "patient", stem: "patient", anew: "patient",
    avg: [ 4.21, 5.04 ], std: [ 2.37, 2.01 ], fq: 50 
  },
  "put": {
    dict: "happiness", word: "put", stem: "put", anew: "invest",
    avg: [ 5.12, 5.04 ], std: [ 2.42, 0.97 ], fq: 50 
  },
  "sides": {
    dict: "happiness", word: "sides", stem: "side", anew: "face",
    avg: [ 5.04, 5.04 ], std: [ 2.18, 1.18 ], fq: 50 
  },
  "stone": {
    dict: "happiness", word: "stone", stem: "stone", anew: "rock",
    avg: [ 4.52, 5.04 ], std: [ 2.37, 1.47 ], fq: 50 
  },
  "takes": {
    dict: "happiness", word: "takes", stem: "take", anew: "learn",
    avg: [ 5.39, 5.04 ], std: [ 2.22, 1.14 ], fq: 50 
  },
  "corners": {
    dict: "happiness", word: "corners", stem: "corner", anew: "corner",
    avg: [ 3.91, 5.02 ], std: [ 1.92, 1.45 ], fq: 50 
  },
  "curtain": {
    dict: "happiness", word: "curtain", stem: "curtain", anew: "curtains",
    avg: [ 3.67, 5.02 ], std: [ 1.83, 1.41 ], fq: 50 
  },
  "mash": {
    dict: "happiness", word: "mash", stem: "mash", anew: "flirt",
    avg: [ 6.91, 5.02 ], std: [ 1.69, 1.73 ], fq: 50 
  },
  "administrator": {
    dict: "happiness", word: "administrator", stem: "administr", anew: "execution",
    avg: [ 5.71, 5.02 ], std: [ 2.74, 1.33 ], fq: 50 
  },
  "apologize": {
    dict: "happiness", word: "apologize", stem: "apolog", anew: "excuse",
    avg: [ 4.48, 5.02 ], std: [ 2.29, 1.81 ], fq: 50 
  },
  "blacks": {
    dict: "happiness", word: "blacks", stem: "black", anew: "black",
    avg: [ 4.61, 5.02 ], std: [ 2.24, 1.65 ], fq: 50 
  },
  "case": {
    dict: "happiness", word: "case", stem: "case", anew: "face",
    avg: [ 5.04, 5.02 ], std: [ 2.18, 1.30 ], fq: 50 
  },
  "controls": {
    dict: "happiness", word: "controls", stem: "control", anew: "controlling",
    avg: [ 6.10, 5.02 ], std: [ 2.19, 1.33 ], fq: 50 
  },
  "documents": {
    dict: "happiness", word: "documents", stem: "document", anew: "paper",
    avg: [ 2.50, 5.02 ], std: [ 1.85, 1.32 ], fq: 50 
  },
  "flat": {
    dict: "happiness", word: "flat", stem: "flat", anew: "bland",
    avg: [ 3.29, 5.02 ], std: [ 1.89, 1.24 ], fq: 50 
  },
  "flip": {
    dict: "happiness", word: "flip", stem: "flip", anew: "sky",
    avg: [ 4.27, 5.02 ], std: [ 2.17, 1.30 ], fq: 50 
  },
  "foot": {
    dict: "happiness", word: "foot", stem: "foot", anew: "foot",
    avg: [ 3.27, 5.02 ], std: [ 1.98, 1.29 ], fq: 50 
  },
  "happened": {
    dict: "happiness", word: "happened", stem: "happen", anew: "material",
    avg: [ 4.05, 5.02 ], std: [ 2.34, 1.19 ], fq: 50 
  },
  "hot": {
    dict: "happiness", word: "hot", stem: "hot", anew: "blister",
    avg: [ 4.10, 5.02 ], std: [ 2.34, 1.92 ], fq: 50 
  },
  "industrial": {
    dict: "happiness", word: "industrial", stem: "industri", anew: "industry",
    avg: [ 4.47, 5.02 ], std: [ 2.43, 1.38 ], fq: 50 
  },
  "mi": {
    dict: "happiness", word: "mi", stem: "mi", anew: "knot",
    avg: [ 4.07, 5.02 ], std: [ 2.15, 0.91 ], fq: 50 
  },
  "phantom": {
    dict: "happiness", word: "phantom", stem: "phantom", anew: "shadow",
    avg: [ 4.30, 5.02 ], std: [ 2.26, 1.61 ], fq: 50 
  },
  "setting": {
    dict: "happiness", word: "setting", stem: "set", anew: "dress",
    avg: [ 4.05, 5.02 ], std: [ 1.89, 1.30 ], fq: 50 
  },
  "sleeve": {
    dict: "happiness", word: "sleeve", stem: "sleev", anew: "arm",
    avg: [ 3.59, 5.02 ], std: [ 2.40, 1.36 ], fq: 50 
  },
  "slice": {
    dict: "happiness", word: "slice", stem: "slice", anew: "cut",
    avg: [ 5.00, 5.02 ], std: [ 2.32, 1.49 ], fq: 50 
  },
  "stake": {
    dict: "happiness", word: "stake", stem: "stake", anew: "adventure",
    avg: [ 6.98, 5.02 ], std: [ 2.15, 1.19 ], fq: 50 
  },
  "veil": {
    dict: "happiness", word: "veil", stem: "veil", anew: "hide",
    avg: [ 5.28, 5.02 ], std: [ 2.51, 1.44 ], fq: 50 
  },
  "binding": {
    dict: "happiness", word: "binding", stem: "bind", anew: "bandage",
    avg: [ 3.90, 5.01 ], std: [ 2.07, 1.60 ], fq: 50 
  },
  "assess": {
    dict: "happiness", word: "assess", stem: "assess", anew: "seat",
    avg: [ 2.95, 5.00 ], std: [ 1.72, 1.37 ], fq: 50 
  },
  "boot": {
    dict: "happiness", word: "boot", stem: "boot", anew: "thrill",
    avg: [ 8.02, 5.00 ], std: [ 1.65, 1.03 ], fq: 50 
  },
  "commands": {
    dict: "happiness", word: "commands", stem: "command", anew: "controlling",
    avg: [ 6.10, 5.00 ], std: [ 2.19, 1.57 ], fq: 50 
  },
  "executives": {
    dict: "happiness", word: "executives", stem: "execut", anew: "execution",
    avg: [ 5.71, 5.00 ], std: [ 2.74, 1.44 ], fq: 50 
  },
  "hush": {
    dict: "happiness", word: "hush", stem: "hush", anew: "quiet",
    avg: [ 2.82, 5.00 ], std: [ 2.13, 1.50 ], fq: 50 
  },
  "listings": {
    dict: "happiness", word: "listings", stem: "list", anew: "name",
    avg: [ 4.25, 5.00 ], std: [ 2.47, 1.23 ], fq: 50 
  },
  "odds": {
    dict: "happiness", word: "odds", stem: "odd", anew: "odd",
    avg: [ 4.27, 5.00 ], std: [ 2.46, 1.12 ], fq: 50 
  },
  "offices": {
    dict: "happiness", word: "offices", stem: "offic", anew: "office",
    avg: [ 4.08, 5.00 ], std: [ 1.92, 1.44 ], fq: 50 
  },
  "paying": {
    dict: "happiness", word: "paying", stem: "pay", anew: "devoted",
    avg: [ 5.23, 5.00 ], std: [ 2.21, 1.88 ], fq: 50 
  },
  "peculiar": {
    dict: "happiness", word: "peculiar", stem: "peculiar", anew: "odd",
    avg: [ 4.27, 5.00 ], std: [ 2.46, 1.71 ], fq: 50 
  },
  "plain": {
    dict: "happiness", word: "plain", stem: "plain", anew: "plain",
    avg: [ 3.52, 5.00 ], std: [ 2.05, 1.44 ], fq: 50 
  },
  "price": {
    dict: "happiness", word: "price", stem: "price", anew: "damage",
    avg: [ 5.57, 5.00 ], std: [ 2.26, 1.40 ], fq: 50 
  },
  "pursued": {
    dict: "happiness", word: "pursued", stem: "pursu", anew: "engaged",
    avg: [ 6.77, 5.00 ], std: [ 2.07, 1.82 ], fq: 50 
  },
  "questions": {
    dict: "happiness", word: "questions", stem: "question", anew: "wonder",
    avg: [ 5.00, 5.00 ], std: [ 2.23, 1.05 ], fq: 50 
  },
  "reports": {
    dict: "happiness", word: "reports", stem: "report", anew: "paper",
    avg: [ 2.50, 5.00 ], std: [ 1.85, 1.51 ], fq: 50 
  },
  "situation": {
    dict: "happiness", word: "situation", stem: "situat", anew: "office",
    avg: [ 4.08, 5.00 ], std: [ 1.92, 1.31 ], fq: 50 
  },
  "standard": {
    dict: "happiness", word: "standard", stem: "standard", anew: "banner",
    avg: [ 3.83, 5.00 ], std: [ 1.95, 1.47 ], fq: 50 
  },
  "stir": {
    dict: "happiness", word: "stir", stem: "stir", anew: "excitement",
    avg: [ 7.67, 5.00 ], std: [ 1.91, 1.29 ], fq: 50 
  },
  "throw": {
    dict: "happiness", word: "throw", stem: "throw", anew: "confused",
    avg: [ 6.03, 5.00 ], std: [ 1.88, 1.55 ], fq: 50 
  },
  "using": {
    dict: "happiness", word: "using", stem: "use", anew: "useful",
    avg: [ 4.26, 5.00 ], std: [ 2.47, 1.05 ], fq: 50 
  },
  "weighted": {
    dict: "happiness", word: "weighted", stem: "weight", anew: "burdened",
    avg: [ 5.63, 5.00 ], std: [ 2.07, 1.14 ], fq: 50 
  },
  "cloudy": {
    dict: "happiness", word: "cloudy", stem: "cloudi", anew: "muddy",
    avg: [ 4.13, 4.98 ], std: [ 2.13, 1.86 ], fq: 50 
  },
  "hits": {
    dict: "happiness", word: "hits", stem: "hit", anew: "hit",
    avg: [ 5.73, 4.98 ], std: [ 2.09, 2.19 ], fq: 50 
  },
  "knot": {
    dict: "happiness", word: "knot", stem: "knot", anew: "knot",
    avg: [ 4.07, 4.98 ], std: [ 2.15, 1.41 ], fq: 50 
  },
  "line": {
    dict: "happiness", word: "line", stem: "line", anew: "melody",
    avg: [ 4.98, 4.98 ], std: [ 2.52, 1.20 ], fq: 50 
  },
  "nails": {
    dict: "happiness", word: "nails", stem: "nail", anew: "ace",
    avg: [ 5.50, 4.98 ], std: [ 2.66, 1.48 ], fq: 50 
  },
  "officers": {
    dict: "happiness", word: "officers", stem: "offic", anew: "office",
    avg: [ 4.08, 4.98 ], std: [ 1.92, 1.67 ], fq: 50 
  },
  "part": {
    dict: "happiness", word: "part", stem: "part", anew: "part",
    avg: [ 3.82, 4.98 ], std: [ 2.24, 1.13 ], fq: 50 
  },
  "pound": {
    dict: "happiness", word: "pound", stem: "pound", anew: "hammer",
    avg: [ 4.58, 4.98 ], std: [ 2.02, 1.71 ], fq: 50 
  },
  "question": {
    dict: "happiness", word: "question", stem: "question", anew: "wonder",
    avg: [ 5.00, 4.98 ], std: [ 2.23, 1.73 ], fq: 50 
  },
  "stared": {
    dict: "happiness", word: "stared", stem: "stare", anew: "star",
    avg: [ 5.83, 4.98 ], std: [ 2.44, 1.44 ], fq: 50 
  },
  "throws": {
    dict: "happiness", word: "throws", stem: "throw", anew: "confused",
    avg: [ 6.03, 4.98 ], std: [ 1.88, 1.06 ], fq: 50 
  },
  "shi": {
    dict: "happiness", word: "shi", stem: "shi", anew: "shy",
    avg: [ 3.77, 4.97 ], std: [ 2.29, 1.36 ], fq: 50 
  },
  "accounts": {
    dict: "happiness", word: "accounts", stem: "account", anew: "history",
    avg: [ 3.93, 4.96 ], std: [ 2.29, 1.50 ], fq: 50 
  },
  "assumed": {
    dict: "happiness", word: "assumed", stem: "assum", anew: "acceptance",
    avg: [ 5.40, 4.96 ], std: [ 2.70, 1.44 ], fq: 50 
  },
  "borders": {
    dict: "happiness", word: "borders", stem: "border", anew: "mold",
    avg: [ 4.07, 4.96 ], std: [ 1.98, 1.52 ], fq: 50 
  },
  "drops": {
    dict: "happiness", word: "drops", stem: "drop", anew: "fall",
    avg: [ 4.70, 4.96 ], std: [ 2.48, 1.55 ], fq: 50 
  },
  "fe": {
    dict: "happiness", word: "fe", stem: "fe", anew: "iron",
    avg: [ 3.76, 4.96 ], std: [ 2.06, 1.32 ], fq: 50 
  },
  "memorial": {
    dict: "happiness", word: "memorial", stem: "memori", anew: "memory",
    avg: [ 5.42, 4.96 ], std: [ 2.25, 1.75 ], fq: 50 
  },
  "socialism": {
    dict: "happiness", word: "socialism", stem: "social", anew: "social",
    avg: [ 4.98, 4.96 ], std: [ 2.59, 2.27 ], fq: 50 
  },
  "alibi": {
    dict: "happiness", word: "alibi", stem: "alibi", anew: "excuse",
    avg: [ 4.48, 4.94 ], std: [ 2.29, 1.74 ], fq: 50 
  },
  "banging": {
    dict: "happiness", word: "banging", stem: "bang", anew: "loved",
    avg: [ 6.38, 4.94 ], std: [ 2.68, 2.14 ], fq: 50 
  },
  "chase": {
    dict: "happiness", word: "chase", stem: "chase", anew: "dog",
    avg: [ 5.76, 4.94 ], std: [ 2.50, 1.72 ], fq: 50 
  },
  "dip": {
    dict: "happiness", word: "dip", stem: "dip", anew: "fall",
    avg: [ 4.70, 4.94 ], std: [ 2.48, 1.28 ], fq: 50 
  },
  "hooked": {
    dict: "happiness", word: "hooked", stem: "hook", anew: "addicted",
    avg: [ 4.81, 4.94 ], std: [ 2.46, 1.20 ], fq: 50 
  },
  "mo": {
    dict: "happiness", word: "mo", stem: "mo", anew: "moment",
    avg: [ 3.83, 4.94 ], std: [ 2.29, 1.32 ], fq: 50 
  },
  "naughty": {
    dict: "happiness", word: "naughty", stem: "naughti", anew: "blue",
    avg: [ 4.31, 4.94 ], std: [ 2.20, 1.98 ], fq: 50 
  },
  "razor": {
    dict: "happiness", word: "razor", stem: "razor", anew: "razor",
    avg: [ 5.36, 4.94 ], std: [ 2.44, 1.41 ], fq: 50 
  },
  "row": {
    dict: "happiness", word: "row", stem: "row", anew: "quarrel",
    avg: [ 6.29, 4.94 ], std: [ 2.56, 1.20 ], fq: 50 
  },
  "stood": {
    dict: "happiness", word: "stood", stem: "stood", anew: "stomach",
    avg: [ 3.93, 4.94 ], std: [ 2.49, 1.08 ], fq: 50 
  },
  "swell": {
    dict: "happiness", word: "swell", stem: "swell", anew: "cork",
    avg: [ 3.80, 4.94 ], std: [ 2.18, 2.01 ], fq: 50 
  },
  "affect": {
    dict: "happiness", word: "affect", stem: "affect", anew: "affection",
    avg: [ 6.21, 4.92 ], std: [ 2.75, 1.44 ], fq: 50 
  },
  "agencies": {
    dict: "happiness", word: "agencies", stem: "agenc", anew: "office",
    avg: [ 4.08, 4.92 ], std: [ 1.92, 1.34 ], fq: 50 
  },
  "armies": {
    dict: "happiness", word: "armies", stem: "armi", anew: "army",
    avg: [ 5.03, 4.92 ], std: [ 2.03, 1.89 ], fq: 50 
  },
  "au": {
    dict: "happiness", word: "au", stem: "au", anew: "gold",
    avg: [ 5.76, 4.92 ], std: [ 2.79, 1.05 ], fq: 50 
  },
  "common": {
    dict: "happiness", word: "common", stem: "common", anew: "green",
    avg: [ 4.28, 4.92 ], std: [ 2.46, 1.26 ], fq: 50 
  },
  "crave": {
    dict: "happiness", word: "crave", stem: "crave", anew: "lust",
    avg: [ 6.88, 4.92 ], std: [ 1.85, 1.60 ], fq: 50 
  },
  "judge": {
    dict: "happiness", word: "judge", stem: "judg", anew: "justice",
    avg: [ 5.47, 4.92 ], std: [ 2.54, 1.60 ], fq: 50 
  },
  "marked": {
    dict: "happiness", word: "marked", stem: "mark", anew: "scar",
    avg: [ 4.79, 4.92 ], std: [ 2.11, 1.29 ], fq: 50 
  },
  "shadow": {
    dict: "happiness", word: "shadow", stem: "shadow", anew: "shadow",
    avg: [ 4.30, 4.92 ], std: [ 2.26, 1.44 ], fq: 50 
  },
  "strip": {
    dict: "happiness", word: "strip", stem: "strip", anew: "rifle",
    avg: [ 6.35, 4.92 ], std: [ 2.04, 1.66 ], fq: 50 
  },
  "suppose": {
    dict: "happiness", word: "suppose", stem: "suppos", anew: "imagine",
    avg: [ 5.98, 4.92 ], std: [ 2.14, 1.12 ], fq: 50 
  },
  "pretending": {
    dict: "happiness", word: "pretending", stem: "pretend", anew: "affection",
    avg: [ 6.21, 4.92 ], std: [ 2.75, 1.57 ], fq: 50 
  },
  "border": {
    dict: "happiness", word: "border", stem: "border", anew: "mold",
    avg: [ 4.07, 4.90 ], std: [ 1.98, 1.49 ], fq: 50 
  },
  "campaigns": {
    dict: "happiness", word: "campaigns", stem: "campaign", anew: "fight",
    avg: [ 7.15, 4.90 ], std: [ 2.19, 1.93 ], fq: 50 
  },
  "charge": {
    dict: "happiness", word: "charge", stem: "charg", anew: "excitement",
    avg: [ 7.67, 4.90 ], std: [ 1.91, 1.31 ], fq: 50 
  },
  "fog": {
    dict: "happiness", word: "fog", stem: "fog", anew: "clouds",
    avg: [ 3.30, 4.90 ], std: [ 2.08, 1.89 ], fq: 50 
  },
  "sector": {
    dict: "happiness", word: "sector", stem: "sector", anew: "sphere",
    avg: [ 3.88, 4.90 ], std: [ 1.99, 1.23 ], fq: 50 
  },
  "black": {
    dict: "happiness", word: "black", stem: "black", anew: "black",
    avg: [ 4.61, 4.88 ], std: [ 2.24, 1.84 ], fq: 50 
  },
  "causes": {
    dict: "happiness", word: "causes", stem: "caus", anew: "lawsuit",
    avg: [ 4.93, 4.88 ], std: [ 2.44, 1.27 ], fq: 50 
  },
  "chuck": {
    dict: "happiness", word: "chuck", stem: "chuck", anew: "sickness",
    avg: [ 5.61, 4.88 ], std: [ 2.67, 1.39 ], fq: 50 
  },
  "cited": {
    dict: "happiness", word: "cited", stem: "cite", anew: "name",
    avg: [ 4.25, 4.88 ], std: [ 2.47, 1.41 ], fq: 50 
  },
  "issued": {
    dict: "happiness", word: "issued", stem: "issu", anew: "cut",
    avg: [ 5.00, 4.88 ], std: [ 2.32, 1.14 ], fq: 50 
  },
  "judges": {
    dict: "happiness", word: "judges", stem: "judg", anew: "justice",
    avg: [ 5.47, 4.88 ], std: [ 2.54, 1.33 ], fq: 50 
  },
  "mis": {
    dict: "happiness", word: "mis", stem: "mi", anew: "knot",
    avg: [ 4.07, 4.88 ], std: [ 2.15, 1.10 ], fq: 50 
  },
  "oil": {
    dict: "happiness", word: "oil", stem: "oil", anew: "crude",
    avg: [ 5.07, 4.88 ], std: [ 2.37, 1.64 ], fq: 50 
  },
  "toilet": {
    dict: "happiness", word: "toilet", stem: "toilet", anew: "stool",
    avg: [ 4.00, 4.88 ], std: [ 2.14, 1.49 ], fq: 50 
  },
  "went": {
    dict: "happiness", word: "went", stem: "went", anew: "travel",
    avg: [ 6.21, 4.88 ], std: [ 2.51, 1.45 ], fq: 50 
  },
  "substitute": {
    dict: "happiness", word: "substitute", stem: "substitut", anew: "reserved",
    avg: [ 3.27, 4.88 ], std: [ 2.05, 1.47 ], fq: 50 
  },
  "nous": {
    dict: "happiness", word: "nous", stem: "nou", anew: "mind",
    avg: [ 5.00, 4.88 ], std: [ 2.68, 1.16 ], fq: 50 
  },
  "circumstances": {
    dict: "happiness", word: "circumstances", stem: "circumst", anew: "context",
    avg: [ 4.22, 4.86 ], std: [ 2.24, 1.11 ], fq: 50 
  },
  "divisions": {
    dict: "happiness", word: "divisions", stem: "divis", anew: "part",
    avg: [ 3.82, 4.86 ], std: [ 2.24, 1.48 ], fq: 50 
  },
  "ft": {
    dict: "happiness", word: "ft", stem: "ft", anew: "foot",
    avg: [ 3.27, 4.86 ], std: [ 1.98, 0.78 ], fq: 50 
  },
  "ira": {
    dict: "happiness", word: "ira", stem: "ira", anew: "anger",
    avg: [ 7.63, 4.86 ], std: [ 1.91, 1.40 ], fq: 50 
  },
  "missy": {
    dict: "happiness", word: "missy", stem: "missi", anew: "girl",
    avg: [ 4.29, 4.86 ], std: [ 2.69, 1.55 ], fq: 50 
  },
  "sensitive": {
    dict: "happiness", word: "sensitive", stem: "sensit", anew: "tender",
    avg: [ 4.88, 4.86 ], std: [ 2.30, 1.41 ], fq: 50 
  },
  "staring": {
    dict: "happiness", word: "staring", stem: "stare", anew: "star",
    avg: [ 5.83, 4.86 ], std: [ 2.44, 1.28 ], fq: 50 
  },
  "tempted": {
    dict: "happiness", word: "tempted", stem: "tempt", anew: "charm",
    avg: [ 5.16, 4.86 ], std: [ 2.25, 1.73 ], fq: 50 
  },
  "tract": {
    dict: "happiness", word: "tract", stem: "tract", anew: "pamphlet",
    avg: [ 3.62, 4.86 ], std: [ 2.02, 1.25 ], fq: 50 
  },
  "geld": {
    dict: "happiness", word: "geld", stem: "geld", anew: "cut",
    avg: [ 5.00, 4.86 ], std: [ 2.32, 1.59 ], fq: 50 
  },
  "maintenance": {
    dict: "happiness", word: "maintenance", stem: "mainten", anew: "alimony",
    avg: [ 4.30, 4.84 ], std: [ 2.29, 1.60 ], fq: 50 
  },
  "mar": {
    dict: "happiness", word: "mar", stem: "mar", anew: "impair",
    avg: [ 4.04, 4.84 ], std: [ 2.14, 1.23 ], fq: 50 
  },
  "rates": {
    dict: "happiness", word: "rates", stem: "rate", anew: "betray",
    avg: [ 7.24, 4.84 ], std: [ 2.06, 1.15 ], fq: 50 
  },
  "secret": {
    dict: "happiness", word: "secret", stem: "secret", anew: "mystic",
    avg: [ 4.84, 4.84 ], std: [ 2.57, 1.61 ], fq: 50 
  },
  "horns": {
    dict: "happiness", word: "horns", stem: "horn", anew: "trumpet",
    avg: [ 4.97, 4.84 ], std: [ 2.13, 1.93 ], fq: 50 
  },
  "cane": {
    dict: "happiness", word: "cane", stem: "cane", anew: "cane",
    avg: [ 4.20, 4.82 ], std: [ 1.93, 1.79 ], fq: 50 
  },
  "cases": {
    dict: "happiness", word: "cases", stem: "case", anew: "face",
    avg: [ 5.04, 4.82 ], std: [ 2.18, 0.92 ], fq: 50 
  },
  "flipped": {
    dict: "happiness", word: "flipped", stem: "flip", anew: "sky",
    avg: [ 4.27, 4.82 ], std: [ 2.17, 1.34 ], fq: 50 
  },
  "hid": {
    dict: "happiness", word: "hid", stem: "hid", anew: "hide",
    avg: [ 5.28, 4.82 ], std: [ 2.51, 1.12 ], fq: 50 
  },
  "impact": {
    dict: "happiness", word: "impact", stem: "impact", anew: "affection",
    avg: [ 6.21, 4.82 ], std: [ 2.75, 1.32 ], fq: 50 
  },
  "smell": {
    dict: "happiness", word: "smell", stem: "smell", anew: "spirit",
    avg: [ 5.56, 4.82 ], std: [ 2.62, 1.55 ], fq: 50 
  },
  "witness": {
    dict: "happiness", word: "witness", stem: "wit", anew: "wit",
    avg: [ 5.42, 4.82 ], std: [ 2.44, 1.37 ], fq: 50 
  },
  "nerve": {
    dict: "happiness", word: "nerve", stem: "nerv", anew: "heart",
    avg: [ 6.34, 4.82 ], std: [ 2.25, 1.48 ], fq: 50 
  },
  "cock": {
    dict: "happiness", word: "cock", stem: "cock", anew: "prick",
    avg: [ 4.70, 4.80 ], std: [ 2.59, 2.00 ], fq: 50 
  },
  "el": {
    dict: "happiness", word: "el", stem: "el", anew: "elevator",
    avg: [ 4.16, 4.80 ], std: [ 1.99, 1.12 ], fq: 50 
  },
  "johns": {
    dict: "happiness", word: "johns", stem: "john", anew: "bathroom",
    avg: [ 3.88, 4.80 ], std: [ 1.72, 1.39 ], fq: 50 
  },
  "meetings": {
    dict: "happiness", word: "meetings", stem: "meet", anew: "satisfied",
    avg: [ 4.94, 4.80 ], std: [ 2.63, 1.54 ], fq: 50 
  },
  "passive": {
    dict: "happiness", word: "passive", stem: "passiv", anew: "peace",
    avg: [ 2.95, 4.80 ], std: [ 2.55, 1.77 ], fq: 50 
  },
  "belly": {
    dict: "happiness", word: "belly", stem: "belli", anew: "stomach",
    avg: [ 3.93, 4.78 ], std: [ 2.49, 1.46 ], fq: 50 
  },
  "conditions": {
    dict: "happiness", word: "conditions", stem: "condit", anew: "statue",
    avg: [ 3.46, 4.78 ], std: [ 1.72, 1.47 ], fq: 50 
  },
  "reserved": {
    dict: "happiness", word: "reserved", stem: "reserv", anew: "reserved",
    avg: [ 3.27, 4.78 ], std: [ 2.05, 1.40 ], fq: 50 
  },
  "reversed": {
    dict: "happiness", word: "reversed", stem: "revers", anew: "vacation",
    avg: [ 5.64, 4.78 ], std: [ 2.99, 1.43 ], fq: 50 
  },
  "stakes": {
    dict: "happiness", word: "stakes", stem: "stake", anew: "adventure",
    avg: [ 6.98, 4.78 ], std: [ 2.15, 0.95 ], fq: 50 
  },
  "suddenly": {
    dict: "happiness", word: "suddenly", stem: "suddenli", anew: "dead",
    avg: [ 5.73, 4.78 ], std: [ 2.73, 1.31 ], fq: 50 
  },
  "throwing": {
    dict: "happiness", word: "throwing", stem: "throw", anew: "confused",
    avg: [ 6.03, 4.78 ], std: [ 1.88, 1.23 ], fq: 50 
  },
  "witnesses": {
    dict: "happiness", word: "witnesses", stem: "wit", anew: "wit",
    avg: [ 5.42, 4.78 ], std: [ 2.44, 1.46 ], fq: 50 
  },
  "board": {
    dict: "happiness", word: "board", stem: "board", anew: "board",
    avg: [ 3.36, 4.76 ], std: [ 2.12, 1.52 ], fq: 50 
  },
  "gas": {
    dict: "happiness", word: "gas", stem: "ga", anew: "gun",
    avg: [ 7.02, 4.76 ], std: [ 1.84, 1.65 ], fq: 50 
  },
  "pieces": {
    dict: "happiness", word: "pieces", stem: "piec", anew: "part",
    avg: [ 3.82, 4.76 ], std: [ 2.24, 1.27 ], fq: 50 
  },
  "pig": {
    dict: "happiness", word: "pig", stem: "pig", anew: "pig",
    avg: [ 4.20, 4.76 ], std: [ 2.42, 2.10 ], fq: 50 
  },
  "repair": {
    dict: "happiness", word: "repair", stem: "repair", anew: "doctor",
    avg: [ 5.86, 4.76 ], std: [ 2.70, 1.82 ], fq: 50 
  },
  "report": {
    dict: "happiness", word: "report", stem: "report", anew: "paper",
    avg: [ 2.50, 4.76 ], std: [ 1.85, 1.33 ], fq: 50 
  },
  "somewhat": {
    dict: "happiness", word: "somewhat", stem: "somewhat", anew: "pretty",
    avg: [ 6.03, 4.76 ], std: [ 2.22, 1.33 ], fq: 50 
  },
  "spent": {
    dict: "happiness", word: "spent", stem: "spent", anew: "fatigued",
    avg: [ 2.64, 4.76 ], std: [ 2.19, 1.55 ], fq: 50 
  },
  "took": {
    dict: "happiness", word: "took", stem: "took", anew: "learn",
    avg: [ 5.39, 4.76 ], std: [ 2.22, 1.02 ], fq: 50 
  },
  "wore": {
    dict: "happiness", word: "wore", stem: "wore", anew: "fatigued",
    avg: [ 2.64, 4.76 ], std: [ 2.19, 1.36 ], fq: 50 
  },
  "goed": {
    dict: "happiness", word: "goed", stem: "go", anew: "travel",
    avg: [ 6.21, 4.76 ], std: [ 2.51, 1.01 ], fq: 50 
  },
  "admit": {
    dict: "happiness", word: "admit", stem: "admit", anew: "acceptance",
    avg: [ 5.40, 4.74 ], std: [ 2.70, 1.27 ], fq: 50 
  },
  "alley": {
    dict: "happiness", word: "alley", stem: "alley", anew: "alley",
    avg: [ 4.91, 4.74 ], std: [ 2.42, 1.19 ], fq: 50 
  },
  "authority": {
    dict: "happiness", word: "authority", stem: "author", anew: "office",
    avg: [ 4.08, 4.74 ], std: [ 1.92, 1.59 ], fq: 50 
  },
  "corner": {
    dict: "happiness", word: "corner", stem: "corner", anew: "corner",
    avg: [ 3.91, 4.74 ], std: [ 1.92, 1.35 ], fq: 50 
  },
  "heavily": {
    dict: "happiness", word: "heavily", stem: "heavili", anew: "hard",
    avg: [ 5.12, 4.74 ], std: [ 2.19, 1.12 ], fq: 50 
  },
  "hook": {
    dict: "happiness", word: "hook", stem: "hook", anew: "addicted",
    avg: [ 4.81, 4.74 ], std: [ 2.46, 1.14 ], fq: 50 
  },
  "judgment": {
    dict: "happiness", word: "judgment", stem: "judgment", anew: "mind",
    avg: [ 5.00, 4.74 ], std: [ 2.68, 1.84 ], fq: 50 
  },
  "load": {
    dict: "happiness", word: "load", stem: "load", anew: "burdened",
    avg: [ 5.63, 4.74 ], std: [ 2.07, 1.07 ], fq: 50 
  },
  "operate": {
    dict: "happiness", word: "operate", stem: "oper", anew: "engaged",
    avg: [ 6.77, 4.74 ], std: [ 2.07, 1.70 ], fq: 50 
  },
  "resist": {
    dict: "happiness", word: "resist", stem: "resist", anew: "rejected",
    avg: [ 6.37, 4.74 ], std: [ 2.56, 1.60 ], fq: 50 
  },
  "smaller": {
    dict: "happiness", word: "smaller", stem: "smaller", anew: "modest",
    avg: [ 3.98, 4.74 ], std: [ 2.24, 1.48 ], fq: 50 
  },
  "possessed": {
    dict: "happiness", word: "possessed", stem: "possess", anew: "obsession",
    avg: [ 6.41, 4.73 ], std: [ 2.13, 1.91 ], fq: 50 
  },
  "alien": {
    dict: "happiness", word: "alien", stem: "alien", anew: "alien",
    avg: [ 5.45, 4.72 ], std: [ 2.15, 1.63 ], fq: 50 
  },
  "assume": {
    dict: "happiness", word: "assume", stem: "assum", anew: "acceptance",
    avg: [ 5.40, 4.72 ], std: [ 2.70, 1.18 ], fq: 50 
  },
  "bent": {
    dict: "happiness", word: "bent", stem: "bent", anew: "deformed",
    avg: [ 4.07, 4.72 ], std: [ 2.34, 1.57 ], fq: 50 
  },
  "citing": {
    dict: "happiness", word: "citing", stem: "cite", anew: "name",
    avg: [ 4.25, 4.72 ], std: [ 2.47, 1.44 ], fq: 50 
  },
  "claims": {
    dict: "happiness", word: "claims", stem: "claim", anew: "arrogant",
    avg: [ 5.65, 4.72 ], std: [ 2.23, 1.44 ], fq: 50 
  },
  "condition": {
    dict: "happiness", word: "condition", stem: "condit", anew: "statue",
    avg: [ 3.46, 4.72 ], std: [ 1.72, 1.34 ], fq: 50 
  },
  "guessing": {
    dict: "happiness", word: "guessing", stem: "guess", anew: "imagine",
    avg: [ 5.98, 4.72 ], std: [ 2.14, 1.63 ], fq: 50 
  },
  "offset": {
    dict: "happiness", word: "offset", stem: "offset", anew: "runner",
    avg: [ 4.76, 4.72 ], std: [ 2.40, 1.20 ], fq: 50 
  },
  "wake": {
    dict: "happiness", word: "wake", stem: "wake", anew: "aroused",
    avg: [ 6.63, 4.72 ], std: [ 2.70, 1.65 ], fq: 50 
  },
  "interference": {
    dict: "happiness", word: "interference", stem: "interfer", anew: "hinder",
    avg: [ 4.12, 4.71 ], std: [ 2.01, 1.73 ], fq: 50 
  },
  "chasing": {
    dict: "happiness", word: "chasing", stem: "chase", anew: "dog",
    avg: [ 5.76, 4.70 ], std: [ 2.50, 1.37 ], fq: 50 
  },
  "corporate": {
    dict: "happiness", word: "corporate", stem: "corpor", anew: "body",
    avg: [ 5.52, 4.70 ], std: [ 2.63, 1.53 ], fq: 50 
  },
  "crossed": {
    dict: "happiness", word: "crossed", stem: "cross", anew: "frustrated",
    avg: [ 5.61, 4.70 ], std: [ 2.76, 1.37 ], fq: 50 
  },
  "hound": {
    dict: "happiness", word: "hound", stem: "hound", anew: "dog",
    avg: [ 5.76, 4.70 ], std: [ 2.50, 1.58 ], fq: 50 
  },
  "nail": {
    dict: "happiness", word: "nail", stem: "nail", anew: "ace",
    avg: [ 5.50, 4.70 ], std: [ 2.66, 1.43 ], fq: 50 
  },
  "rocky": {
    dict: "happiness", word: "rocky", stem: "rocki", anew: "rough",
    avg: [ 5.33, 4.70 ], std: [ 2.04, 1.73 ], fq: 50 
  },
  "seriously": {
    dict: "happiness", word: "seriously", stem: "serious", anew: "serious",
    avg: [ 4.00, 4.70 ], std: [ 1.87, 1.56 ], fq: 50 
  },
  "striking": {
    dict: "happiness", word: "striking", stem: "strike", anew: "outstanding",
    avg: [ 6.24, 4.70 ], std: [ 2.59, 1.88 ], fq: 50 
  },
  "shakes": {
    dict: "happiness", word: "shakes", stem: "shake", anew: "excitement",
    avg: [ 7.67, 4.69 ], std: [ 1.91, 1.82 ], fq: 50 
  },
  "bodies": {
    dict: "happiness", word: "bodies", stem: "bodi", anew: "body",
    avg: [ 5.52, 4.68 ], std: [ 2.63, 1.62 ], fq: 50 
  },
  "cross": {
    dict: "happiness", word: "cross", stem: "cross", anew: "frustrated",
    avg: [ 5.61, 4.68 ], std: [ 2.76, 1.71 ], fq: 50 
  },
  "curb": {
    dict: "happiness", word: "curb", stem: "curb", anew: "controlling",
    avg: [ 6.10, 4.68 ], std: [ 2.19, 1.28 ], fq: 50 
  },
  "dun": {
    dict: "happiness", word: "dun", stem: "dun", anew: "frustrated",
    avg: [ 5.61, 4.68 ], std: [ 2.76, 1.39 ], fq: 50 
  },
  "knives": {
    dict: "happiness", word: "knives", stem: "knive", anew: "knife",
    avg: [ 5.80, 4.68 ], std: [ 2.00, 2.09 ], fq: 50 
  },
  "overcast": {
    dict: "happiness", word: "overcast", stem: "overcast", anew: "overcast",
    avg: [ 3.46, 4.68 ], std: [ 1.92, 1.66 ], fq: 50 
  },
  "ruling": {
    dict: "happiness", word: "ruling", stem: "rule", anew: "opinion",
    avg: [ 4.89, 4.68 ], std: [ 2.46, 1.45 ], fq: 50 
  },
  "shady": {
    dict: "happiness", word: "shady", stem: "shadi", anew: "suspicious",
    avg: [ 6.25, 4.68 ], std: [ 1.59, 1.71 ], fq: 50 
  },
  "spots": {
    dict: "happiness", word: "spots", stem: "spot", anew: "office",
    avg: [ 4.08, 4.68 ], std: [ 1.92, 1.41 ], fq: 50 
  },
  "threw": {
    dict: "happiness", word: "threw", stem: "threw", anew: "confused",
    avg: [ 6.03, 4.68 ], std: [ 1.88, 1.06 ], fq: 50 
  },
  "bump": {
    dict: "happiness", word: "bump", stem: "bump", anew: "chance",
    avg: [ 5.38, 4.67 ], std: [ 2.58, 1.42 ], fq: 50 
  },
  "dependence": {
    dict: "happiness", word: "dependence", stem: "depend", anew: "addicted",
    avg: [ 4.81, 4.67 ], std: [ 2.46, 1.96 ], fq: 50 
  },
  "flesh": {
    dict: "happiness", word: "flesh", stem: "flesh", anew: "building",
    avg: [ 3.92, 4.67 ], std: [ 1.94, 1.56 ], fq: 50 
  },
  "tumble": {
    dict: "happiness", word: "tumble", stem: "tumbl", anew: "fall",
    avg: [ 4.70, 4.67 ], std: [ 2.48, 1.70 ], fq: 50 
  },
  "forms": {
    dict: "happiness", word: "forms", stem: "form", anew: "spring",
    avg: [ 5.67, 4.66 ], std: [ 2.51, 1.33 ], fq: 50 
  },
  "minor": {
    dict: "happiness", word: "minor", stem: "minor", anew: "modest",
    avg: [ 3.98, 4.66 ], std: [ 2.24, 1.26 ], fq: 50 
  },
  "odd": {
    dict: "happiness", word: "odd", stem: "odd", anew: "odd",
    avg: [ 4.27, 4.66 ], std: [ 2.46, 1.65 ], fq: 50 
  },
  "pile": {
    dict: "happiness", word: "pile", stem: "pile", anew: "mountain",
    avg: [ 5.49, 4.66 ], std: [ 2.43, 0.89 ], fq: 50 
  },
  "wanting": {
    dict: "happiness", word: "wanting", stem: "want", anew: "desire",
    avg: [ 7.35, 4.66 ], std: [ 1.76, 1.48 ], fq: 50 
  },
  "stripped": {
    dict: "happiness", word: "stripped", stem: "strip", anew: "rifle",
    avg: [ 6.35, 4.65 ], std: [ 2.04, 1.93 ], fq: 50 
  },
  "tire": {
    dict: "happiness", word: "tire", stem: "tire", anew: "bored",
    avg: [ 2.83, 4.65 ], std: [ 2.31, 1.49 ], fq: 50 
  },
  "wolves": {
    dict: "happiness", word: "wolves", stem: "wolv", anew: "beast",
    avg: [ 5.57, 4.65 ], std: [ 2.61, 2.28 ], fq: 50 
  },
  "crazy": {
    dict: "happiness", word: "crazy", stem: "crazi", anew: "disturb",
    avg: [ 5.80, 4.64 ], std: [ 2.39, 2.26 ], fq: 50 
  },
  "dry": {
    dict: "happiness", word: "dry", stem: "dri", anew: "iron",
    avg: [ 3.76, 4.64 ], std: [ 2.06, 1.26 ], fq: 50 
  },
  "freak": {
    dict: "happiness", word: "freak", stem: "freak", anew: "addicted",
    avg: [ 4.81, 4.64 ], std: [ 2.46, 1.92 ], fq: 50 
  },
  "fucking": {
    dict: "happiness", word: "fucking", stem: "fuck", anew: "loved",
    avg: [ 6.38, 4.64 ], std: [ 2.68, 2.93 ], fq: 50 
  },
  "government": {
    dict: "happiness", word: "government", stem: "govern", anew: "politeness",
    avg: [ 3.74, 4.64 ], std: [ 2.37, 1.64 ], fq: 50 
  },
  "left": {
    dict: "happiness", word: "left", stem: "left", anew: "odd",
    avg: [ 4.27, 4.64 ], std: [ 2.46, 1.44 ], fq: 50 
  },
  "lust": {
    dict: "happiness", word: "lust", stem: "lust", anew: "lust",
    avg: [ 6.88, 4.64 ], std: [ 1.85, 2.04 ], fq: 50 
  },
  "pretend": {
    dict: "happiness", word: "pretend", stem: "pretend", anew: "affection",
    avg: [ 6.21, 4.64 ], std: [ 2.75, 1.27 ], fq: 50 
  },
  "slit": {
    dict: "happiness", word: "slit", stem: "slit", anew: "prick",
    avg: [ 4.70, 4.64 ], std: [ 2.59, 1.51 ], fq: 50 
  },
  "stares": {
    dict: "happiness", word: "stares", stem: "stare", anew: "star",
    avg: [ 5.83, 4.63 ], std: [ 2.44, 1.50 ], fq: 50 
  },
  "stiff": {
    dict: "happiness", word: "stiff", stem: "stiff", anew: "stiff",
    avg: [ 4.02, 4.63 ], std: [ 2.41, 1.68 ], fq: 50 
  },
  "bull": {
    dict: "happiness", word: "bull", stem: "bull", anew: "pig",
    avg: [ 4.20, 4.62 ], std: [ 2.42, 1.31 ], fq: 50 
  },
  "bureau": {
    dict: "happiness", word: "bureau", stem: "bureau", anew: "office",
    avg: [ 4.08, 4.62 ], std: [ 1.92, 1.29 ], fq: 50 
  },
  "dick": {
    dict: "happiness", word: "dick", stem: "dick", anew: "prick",
    avg: [ 4.70, 4.62 ], std: [ 2.59, 1.78 ], fq: 50 
  },
  "governments": {
    dict: "happiness", word: "governments", stem: "govern", anew: "politeness",
    avg: [ 3.74, 4.62 ], std: [ 2.37, 1.70 ], fq: 50 
  },
  "holler": {
    dict: "happiness", word: "holler", stem: "holler", anew: "gripe",
    avg: [ 5.00, 4.62 ], std: [ 2.19, 1.43 ], fq: 50 
  },
  "lease": {
    dict: "happiness", word: "lease", stem: "leas", anew: "engaged",
    avg: [ 6.77, 4.62 ], std: [ 2.07, 1.26 ], fq: 50 
  },
  "pigs": {
    dict: "happiness", word: "pigs", stem: "pig", anew: "pig",
    avg: [ 4.20, 4.62 ], std: [ 2.42, 2.03 ], fq: 50 
  },
  "pressed": {
    dict: "happiness", word: "pressed", stem: "press", anew: "fight",
    avg: [ 7.15, 4.62 ], std: [ 2.19, 1.31 ], fq: 50 
  },
  "daze": {
    dict: "happiness", word: "daze", stem: "daze", anew: "dazzle",
    avg: [ 6.33, 4.61 ], std: [ 2.02, 1.44 ], fq: 50 
  },
  "bind": {
    dict: "happiness", word: "bind", stem: "bind", anew: "bandage",
    avg: [ 3.90, 4.60 ], std: [ 2.07, 1.78 ], fq: 50 
  },
  "bound": {
    dict: "happiness", word: "bound", stem: "bound", anew: "spring",
    avg: [ 5.67, 4.60 ], std: [ 2.51, 1.36 ], fq: 50 
  },
  "flames": {
    dict: "happiness", word: "flames", stem: "flame", anew: "fire",
    avg: [ 7.17, 4.60 ], std: [ 2.06, 1.87 ], fq: 50 
  },
  "sack": {
    dict: "happiness", word: "sack", stem: "sack", anew: "fire",
    avg: [ 7.17, 4.60 ], std: [ 2.06, 1.50 ], fq: 50 
  },
  "sticky": {
    dict: "happiness", word: "sticky", stem: "sticki", anew: "embarrassed",
    avg: [ 5.87, 4.60 ], std: [ 2.55, 1.32 ], fq: 50 
  },
  "tight": {
    dict: "happiness", word: "tight", stem: "tight", anew: "nasty",
    avg: [ 4.89, 4.60 ], std: [ 2.50, 1.25 ], fq: 50 
  },
  "trigger": {
    dict: "happiness", word: "trigger", stem: "trigger", anew: "activate",
    avg: [ 4.86, 4.60 ], std: [ 2.56, 1.95 ], fq: 50 
  },
  "used": {
    dict: "happiness", word: "used", stem: "use", anew: "useful",
    avg: [ 4.26, 4.60 ], std: [ 2.47, 1.48 ], fq: 50 
  },
  "busy": {
    dict: "happiness", word: "busy", stem: "busi", anew: "engaged",
    avg: [ 6.77, 4.58 ], std: [ 2.07, 1.83 ], fq: 50 
  },
  "excuse": {
    dict: "happiness", word: "excuse", stem: "excus", anew: "excuse",
    avg: [ 4.48, 4.58 ], std: [ 2.29, 1.53 ], fq: 50 
  },
  "fighter": {
    dict: "happiness", word: "fighter", stem: "fighter", anew: "champion",
    avg: [ 5.85, 4.58 ], std: [ 3.15, 1.65 ], fq: 50 
  },
  "hit": {
    dict: "happiness", word: "hit", stem: "hit", anew: "hit",
    avg: [ 5.73, 4.58 ], std: [ 2.09, 1.81 ], fq: 50 
  },
  "lock": {
    dict: "happiness", word: "lock", stem: "lock", anew: "engaged",
    avg: [ 6.77, 4.58 ], std: [ 2.07, 1.01 ], fq: 50 
  },
  "stops": {
    dict: "happiness", word: "stops", stem: "stop", anew: "bar",
    avg: [ 5.00, 4.58 ], std: [ 2.83, 1.21 ], fq: 50 
  },
  "blues": {
    dict: "happiness", word: "blues", stem: "blue", anew: "blue",
    avg: [ 4.31, 4.56 ], std: [ 2.20, 1.98 ], fq: 50 
  },
  "separately": {
    dict: "happiness", word: "separately", stem: "separ", anew: "severe",
    avg: [ 5.26, 4.55 ], std: [ 2.36, 1.51 ], fq: 50 
  },
  "bit": {
    dict: "happiness", word: "bit", stem: "bit", anew: "prick",
    avg: [ 4.70, 4.54 ], std: [ 2.59, 1.13 ], fq: 50 
  },
  "blocks": {
    dict: "happiness", word: "blocks", stem: "block", anew: "hinder",
    avg: [ 4.12, 4.54 ], std: [ 2.01, 1.42 ], fq: 50 
  },
  "command": {
    dict: "happiness", word: "command", stem: "command", anew: "controlling",
    avg: [ 6.10, 4.54 ], std: [ 2.19, 1.58 ], fq: 50 
  },
  "terms": {
    dict: "happiness", word: "terms", stem: "term", anew: "foot",
    avg: [ 3.27, 4.54 ], std: [ 1.98, 1.05 ], fq: 50 
  },
  "twisting": {
    dict: "happiness", word: "twisting", stem: "twist", anew: "pervert",
    avg: [ 6.26, 4.54 ], std: [ 2.61, 1.40 ], fq: 50 
  },
  "urged": {
    dict: "happiness", word: "urged", stem: "urg", anew: "inspired",
    avg: [ 6.02, 4.54 ], std: [ 2.67, 1.30 ], fq: 50 
  },
  "chains": {
    dict: "happiness", word: "chains", stem: "chain", anew: "iron",
    avg: [ 3.76, 4.53 ], std: [ 2.06, 1.77 ], fq: 50 
  },
  "waits": {
    dict: "happiness", word: "waits", stem: "wait", anew: "delayed",
    avg: [ 5.62, 4.53 ], std: [ 2.39, 1.24 ], fq: 50 
  },
  "blew": {
    dict: "happiness", word: "blew", stem: "blew", anew: "waste",
    avg: [ 4.14, 4.52 ], std: [ 2.30, 1.47 ], fq: 50 
  },
  "leave": {
    dict: "happiness", word: "leave", stem: "leav", anew: "part",
    avg: [ 3.82, 4.52 ], std: [ 2.24, 1.33 ], fq: 50 
  },
  "muss": {
    dict: "happiness", word: "muss", stem: "muss", anew: "messy",
    avg: [ 3.34, 4.52 ], std: [ 2.37, 1.07 ], fq: 50 
  },
  "small": {
    dict: "happiness", word: "small", stem: "small", anew: "modest",
    avg: [ 3.98, 4.52 ], std: [ 2.24, 1.36 ], fq: 50 
  },
  "utterly": {
    dict: "happiness", word: "utterly", stem: "utterli", anew: "dead",
    avg: [ 5.73, 4.52 ], std: [ 2.73, 1.71 ], fq: 50 
  },
  "weight": {
    dict: "happiness", word: "weight", stem: "weight", anew: "burdened",
    avg: [ 5.63, 4.52 ], std: [ 2.07, 1.55 ], fq: 50 
  },
  "disposed": {
    dict: "happiness", word: "disposed", stem: "dispos", anew: "mind",
    avg: [ 5.00, 4.50 ], std: [ 2.68, 1.73 ], fq: 50 
  },
  "distance": {
    dict: "happiness", word: "distance", stem: "distanc", anew: "space",
    avg: [ 5.14, 4.50 ], std: [ 2.54, 1.31 ], fq: 50 
  },
  "reverse": {
    dict: "happiness", word: "reverse", stem: "revers", anew: "vacation",
    avg: [ 5.64, 4.50 ], std: [ 2.99, 1.11 ], fq: 50 
  },
  "goo": {
    dict: "happiness", word: "goo", stem: "goo", anew: "slime",
    avg: [ 5.36, 4.49 ], std: [ 2.63, 1.59 ], fq: 50 
  },
  "army": {
    dict: "happiness", word: "army", stem: "armi", anew: "army",
    avg: [ 5.03, 4.48 ], std: [ 2.03, 2.01 ], fq: 50 
  },
  "blow": {
    dict: "happiness", word: "blow", stem: "blow", anew: "waste",
    avg: [ 4.14, 4.48 ], std: [ 2.30, 1.74 ], fq: 50 
  },
  "despite": {
    dict: "happiness", word: "despite", stem: "despit", anew: "scornful",
    avg: [ 5.04, 4.48 ], std: [ 2.56, 1.34 ], fq: 50 
  },
  "hidden": {
    dict: "happiness", word: "hidden", stem: "hidden", anew: "hide",
    avg: [ 5.28, 4.48 ], std: [ 2.51, 1.43 ], fq: 50 
  },
  "issue": {
    dict: "happiness", word: "issue", stem: "issu", anew: "event",
    avg: [ 5.10, 4.48 ], std: [ 2.40, 1.40 ], fq: 50 
  },
  "commanded": {
    dict: "happiness", word: "commanded", stem: "command", anew: "controlling",
    avg: [ 6.10, 4.47 ], std: [ 2.19, 1.60 ], fq: 50 
  },
  "nerves": {
    dict: "happiness", word: "nerves", stem: "nerv", anew: "heart",
    avg: [ 6.34, 4.47 ], std: [ 2.25, 1.70 ], fq: 50 
  },
  "spill": {
    dict: "happiness", word: "spill", stem: "spill", anew: "fall",
    avg: [ 4.70, 4.47 ], std: [ 2.48, 1.68 ], fq: 50 
  },
  "craving": {
    dict: "happiness", word: "craving", stem: "crave", anew: "lust",
    avg: [ 6.88, 4.46 ], std: [ 1.85, 1.46 ], fq: 50 
  },
  "hammer": {
    dict: "happiness", word: "hammer", stem: "hammer", anew: "hammer",
    avg: [ 4.58, 4.46 ], std: [ 2.02, 1.54 ], fq: 50 
  },
  "kicks": {
    dict: "happiness", word: "kicks", stem: "kick", anew: "kick",
    avg: [ 4.90, 4.46 ], std: [ 2.35, 1.57 ], fq: 50 
  },
  "politics": {
    dict: "happiness", word: "politics", stem: "polit", anew: "politeness",
    avg: [ 3.74, 4.46 ], std: [ 2.37, 1.76 ], fq: 50 
  },
  "rigid": {
    dict: "happiness", word: "rigid", stem: "rigid", anew: "rigid",
    avg: [ 4.66, 4.46 ], std: [ 2.47, 1.61 ], fq: 50 
  },
  "short": {
    dict: "happiness", word: "short", stem: "short", anew: "dead",
    avg: [ 5.73, 4.46 ], std: [ 2.73, 1.15 ], fq: 50 
  },
  "shy": {
    dict: "happiness", word: "shy", stem: "shi", anew: "shy",
    avg: [ 3.77, 4.46 ], std: [ 2.29, 1.74 ], fq: 50 
  },
  "thrown": {
    dict: "happiness", word: "thrown", stem: "thrown", anew: "confused",
    avg: [ 6.03, 4.46 ], std: [ 1.88, 1.16 ], fq: 50 
  },
  "tossed": {
    dict: "happiness", word: "tossed", stem: "toss", anew: "sky",
    avg: [ 4.27, 4.46 ], std: [ 2.17, 1.49 ], fq: 50 
  },
  "infantry": {
    dict: "happiness", word: "infantry", stem: "infantri", anew: "foot",
    avg: [ 3.27, 4.45 ], std: [ 1.98, 2.08 ], fq: 50 
  },
  "blank": {
    dict: "happiness", word: "blank", stem: "blank", anew: "space",
    avg: [ 5.14, 4.44 ], std: [ 2.54, 0.84 ], fq: 50 
  },
  "bottom": {
    dict: "happiness", word: "bottom", stem: "bottom", anew: "seat",
    avg: [ 2.95, 4.44 ], std: [ 1.72, 1.33 ], fq: 50 
  },
  "cop": {
    dict: "happiness", word: "cop", stem: "cop", anew: "pig",
    avg: [ 4.20, 4.44 ], std: [ 2.42, 1.69 ], fq: 50 
  },
  "errands": {
    dict: "happiness", word: "errands", stem: "errand", anew: "errand",
    avg: [ 3.85, 4.44 ], std: [ 1.92, 1.54 ], fq: 50 
  },
  "gay": {
    dict: "happiness", word: "gay", stem: "gay", anew: "brave",
    avg: [ 6.15, 4.44 ], std: [ 2.45, 2.18 ], fq: 50 
  },
  "harder": {
    dict: "happiness", word: "harder", stem: "harder", anew: "hard",
    avg: [ 5.12, 4.44 ], std: [ 2.19, 1.47 ], fq: 50 
  },
  "push": {
    dict: "happiness", word: "push", stem: "push", anew: "promotion",
    avg: [ 6.44, 4.44 ], std: [ 2.58, 1.47 ], fq: 50 
  },
  "rag": {
    dict: "happiness", word: "rag", stem: "rag", anew: "irritate",
    avg: [ 5.76, 4.44 ], std: [ 2.15, 1.26 ], fq: 50 
  },
  "tank": {
    dict: "happiness", word: "tank", stem: "tank", anew: "tank",
    avg: [ 4.88, 4.44 ], std: [ 1.86, 1.61 ], fq: 50 
  },
  "weed": {
    dict: "happiness", word: "weed", stem: "weed", anew: "grass",
    avg: [ 4.14, 4.44 ], std: [ 2.11, 2.10 ], fq: 50 
  },
  "longing": {
    dict: "happiness", word: "longing", stem: "long", anew: "hungry",
    avg: [ 5.13, 4.43 ], std: [ 2.44, 1.70 ], fq: 50 
  },
  "behind": {
    dict: "happiness", word: "behind", stem: "behind", anew: "slow",
    avg: [ 3.39, 4.42 ], std: [ 2.22, 1.21 ], fq: 50 
  },
  "breaks": {
    dict: "happiness", word: "breaks", stem: "break", anew: "fault",
    avg: [ 4.07, 4.42 ], std: [ 1.69, 1.83 ], fq: 50 
  },
  "controlling": {
    dict: "happiness", word: "controlling", stem: "control", anew: "controlling",
    avg: [ 6.10, 4.42 ], std: [ 2.19, 2.05 ], fq: 50 
  },
  "emotional": {
    dict: "happiness", word: "emotional", stem: "emot", anew: "excitement",
    avg: [ 7.67, 4.42 ], std: [ 1.91, 1.76 ], fq: 50 
  },
  "hides": {
    dict: "happiness", word: "hides", stem: "hide", anew: "hide",
    avg: [ 5.28, 4.42 ], std: [ 2.51, 1.11 ], fq: 50 
  },
  "remains": {
    dict: "happiness", word: "remains", stem: "remain", anew: "corpse",
    avg: [ 4.74, 4.42 ], std: [ 2.94, 1.44 ], fq: 50 
  },
  "serious": {
    dict: "happiness", word: "serious", stem: "seriou", anew: "good",
    avg: [ 5.43, 4.42 ], std: [ 2.85, 1.46 ], fq: 50 
  },
  "stumble": {
    dict: "happiness", word: "stumble", stem: "stumbl", anew: "hit",
    avg: [ 5.73, 4.42 ], std: [ 2.09, 1.58 ], fq: 50 
  },
  "beats": {
    dict: "happiness", word: "beats", stem: "beat", anew: "crushed",
    avg: [ 5.52, 4.40 ], std: [ 2.87, 1.93 ], fq: 50 
  },
  "controlled": {
    dict: "happiness", word: "controlled", stem: "control", anew: "controlling",
    avg: [ 6.10, 4.40 ], std: [ 2.19, 1.76 ], fq: 50 
  },
  "desert": {
    dict: "happiness", word: "desert", stem: "desert", anew: "deserter",
    avg: [ 5.50, 4.40 ], std: [ 2.55, 1.83 ], fq: 50 
  },
  "hearings": {
    dict: "happiness", word: "hearings", stem: "hear", anew: "learn",
    avg: [ 5.39, 4.40 ], std: [ 2.22, 1.65 ], fq: 50 
  },
  "tied": {
    dict: "happiness", word: "tied", stem: "tie", anew: "wedding",
    avg: [ 5.97, 4.40 ], std: [ 2.85, 1.36 ], fq: 50 
  },
  "authorities": {
    dict: "happiness", word: "authorities", stem: "author", anew: "office",
    avg: [ 4.08, 4.38 ], std: [ 1.92, 1.16 ], fq: 50 
  },
  "chills": {
    dict: "happiness", word: "chills", stem: "chill", anew: "thrill",
    avg: [ 8.02, 4.38 ], std: [ 1.65, 1.76 ], fq: 50 
  },
  "economy": {
    dict: "happiness", word: "economy", stem: "economi", anew: "save",
    avg: [ 4.95, 4.38 ], std: [ 2.19, 1.66 ], fq: 50 
  },
  "effing": {
    dict: "happiness", word: "effing", stem: "ef", anew: "loved",
    avg: [ 6.38, 4.38 ], std: [ 2.68, 1.40 ], fq: 50 
  },
  "frozen": {
    dict: "happiness", word: "frozen", stem: "frozen", anew: "frigid",
    avg: [ 4.75, 4.38 ], std: [ 2.56, 1.54 ], fq: 50 
  },
  "prices": {
    dict: "happiness", word: "prices", stem: "price", anew: "damage",
    avg: [ 5.57, 4.38 ], std: [ 2.26, 1.60 ], fq: 50 
  },
  "slips": {
    dict: "happiness", word: "slips", stem: "slip", anew: "mistake",
    avg: [ 5.18, 4.38 ], std: [ 2.42, 1.47 ], fq: 50 
  },
  "tangled": {
    dict: "happiness", word: "tangled", stem: "tangl", anew: "knot",
    avg: [ 4.07, 4.38 ], std: [ 2.15, 1.60 ], fq: 50 
  },
  "consequence": {
    dict: "happiness", word: "consequence", stem: "consequ", anew: "moment",
    avg: [ 3.83, 4.36 ], std: [ 2.29, 1.32 ], fq: 50 
  },
  "custody": {
    dict: "happiness", word: "custody", stem: "custodi", anew: "hand",
    avg: [ 4.40, 4.36 ], std: [ 2.07, 1.70 ], fq: 50 
  },
  "divided": {
    dict: "happiness", word: "divided", stem: "divid", anew: "part",
    avg: [ 3.82, 4.36 ], std: [ 2.24, 1.27 ], fq: 50 
  },
  "division": {
    dict: "happiness", word: "division", stem: "divis", anew: "part",
    avg: [ 3.82, 4.36 ], std: [ 2.24, 1.29 ], fq: 50 
  },
  "end": {
    dict: "happiness", word: "end", stem: "end", anew: "death",
    avg: [ 4.59, 4.36 ], std: [ 3.07, 1.74 ], fq: 50 
  },
  "grease": {
    dict: "happiness", word: "grease", stem: "greas", anew: "filth",
    avg: [ 5.12, 4.36 ], std: [ 2.32, 1.34 ], fq: 50 
  },
  "hide": {
    dict: "happiness", word: "hide", stem: "hide", anew: "hide",
    avg: [ 5.28, 4.36 ], std: [ 2.51, 1.41 ], fq: 50 
  },
  "needle": {
    dict: "happiness", word: "needle", stem: "needl", anew: "needle",
    avg: [ 5.36, 4.36 ], std: [ 2.89, 1.83 ], fq: 50 
  },
  "operations": {
    dict: "happiness", word: "operations", stem: "oper", anew: "surgery",
    avg: [ 6.35, 4.36 ], std: [ 2.32, 1.77 ], fq: 50 
  },
  "reducing": {
    dict: "happiness", word: "reducing", stem: "reduc", anew: "concentrate",
    avg: [ 4.65, 4.36 ], std: [ 2.13, 1.48 ], fq: 50 
  },
  "sharply": {
    dict: "happiness", word: "sharply", stem: "sharpli", anew: "aggressive",
    avg: [ 5.83, 4.36 ], std: [ 2.33, 1.64 ], fq: 50 
  },
  "tease": {
    dict: "happiness", word: "tease", stem: "teas", anew: "tease",
    avg: [ 5.87, 4.36 ], std: [ 2.56, 2.09 ], fq: 50 
  },
  "storms": {
    dict: "happiness", word: "storms", stem: "storm", anew: "storm",
    avg: [ 5.71, 4.34 ], std: [ 2.34, 1.98 ], fq: 50 
  },
  "blown": {
    dict: "happiness", word: "blown", stem: "blown", anew: "waste",
    avg: [ 4.14, 4.34 ], std: [ 2.30, 1.39 ], fq: 50 
  },
  "congress": {
    dict: "happiness", word: "congress", stem: "congress", anew: "intercourse",
    avg: [ 7.00, 4.34 ], std: [ 2.07, 1.76 ], fq: 50 
  },
  "ditch": {
    dict: "happiness", word: "ditch", stem: "ditch", anew: "dump",
    avg: [ 4.12, 4.34 ], std: [ 2.36, 1.55 ], fq: 50 
  },
  "hiding": {
    dict: "happiness", word: "hiding", stem: "hide", anew: "hide",
    avg: [ 5.28, 4.34 ], std: [ 2.51, 1.29 ], fq: 50 
  },
  "icy": {
    dict: "happiness", word: "icy", stem: "ici", anew: "frigid",
    avg: [ 4.75, 4.34 ], std: [ 2.56, 1.85 ], fq: 50 
  },
  "shook": {
    dict: "happiness", word: "shook", stem: "shook", anew: "excitement",
    avg: [ 7.67, 4.34 ], std: [ 1.91, 1.42 ], fq: 50 
  },
  "vampire": {
    dict: "happiness", word: "vampire", stem: "vampir", anew: "vampire",
    avg: [ 6.37, 4.34 ], std: [ 2.35, 2.12 ], fq: 50 
  },
  "eff": {
    dict: "happiness", word: "eff", stem: "eff", anew: "loved",
    avg: [ 6.38, 4.32 ], std: [ 2.68, 1.57 ], fq: 50 
  },
  "howling": {
    dict: "happiness", word: "howling", stem: "howl", anew: "terrific",
    avg: [ 6.23, 4.32 ], std: [ 2.73, 1.83 ], fq: 50 
  },
  "reduced": {
    dict: "happiness", word: "reduced", stem: "reduc", anew: "concentrate",
    avg: [ 4.65, 4.32 ], std: [ 2.13, 1.58 ], fq: 50 
  },
  "scattered": {
    dict: "happiness", word: "scattered", stem: "scatter", anew: "confused",
    avg: [ 6.03, 4.32 ], std: [ 1.88, 1.35 ], fq: 50 
  },
  "separate": {
    dict: "happiness", word: "separate", stem: "separ", anew: "fork",
    avg: [ 3.96, 4.32 ], std: [ 1.94, 1.56 ], fq: 50 
  },
  "slowly": {
    dict: "happiness", word: "slowly", stem: "slowli", anew: "slow",
    avg: [ 3.39, 4.32 ], std: [ 2.22, 1.43 ], fq: 50 
  },
  "tripping": {
    dict: "happiness", word: "tripping", stem: "trip", anew: "travel",
    avg: [ 6.21, 4.32 ], std: [ 2.51, 1.87 ], fq: 50 
  },
  "blunt": {
    dict: "happiness", word: "blunt", stem: "blunt", anew: "crude",
    avg: [ 5.07, 4.31 ], std: [ 2.37, 1.52 ], fq: 50 
  },
  "shaking": {
    dict: "happiness", word: "shaking", stem: "shake", anew: "excitement",
    avg: [ 7.67, 4.31 ], std: [ 1.91, 1.75 ], fq: 50 
  },
  "smack": {
    dict: "happiness", word: "smack", stem: "smack", anew: "slap",
    avg: [ 6.46, 4.31 ], std: [ 2.58, 2.00 ], fq: 50 
  },
  "affected": {
    dict: "happiness", word: "affected", stem: "affect", anew: "affection",
    avg: [ 6.21, 4.30 ], std: [ 2.75, 1.39 ], fq: 50 
  },
  "drop": {
    dict: "happiness", word: "drop", stem: "drop", anew: "fall",
    avg: [ 4.70, 4.30 ], std: [ 2.48, 1.20 ], fq: 50 
  },
  "pit": {
    dict: "happiness", word: "pit", stem: "pit", anew: "scar",
    avg: [ 4.79, 4.30 ], std: [ 2.11, 1.02 ], fq: 50 
  },
  "sneak": {
    dict: "happiness", word: "sneak", stem: "sneak", anew: "pinch",
    avg: [ 4.59, 4.30 ], std: [ 2.10, 1.54 ], fq: 50 
  },
  "chased": {
    dict: "happiness", word: "chased", stem: "chase", anew: "dog",
    avg: [ 5.76, 4.29 ], std: [ 2.50, 1.63 ], fq: 50 
  },
  "divide": {
    dict: "happiness", word: "divide", stem: "divid", anew: "part",
    avg: [ 3.82, 4.29 ], std: [ 2.24, 1.46 ], fq: 50 
  },
  "mortal": {
    dict: "happiness", word: "mortal", stem: "mortal", anew: "person",
    avg: [ 4.19, 4.29 ], std: [ 2.45, 2.03 ], fq: 50 
  },
  "rebellion": {
    dict: "happiness", word: "rebellion", stem: "rebellion", anew: "revolt",
    avg: [ 6.56, 4.29 ], std: [ 2.34, 1.68 ], fq: 50 
  },
  "petroleum": {
    dict: "happiness", word: "petroleum", stem: "petroleum", anew: "crude",
    avg: [ 5.07, 4.28 ], std: [ 2.37, 1.63 ], fq: 50 
  },
  "spider": {
    dict: "happiness", word: "spider", stem: "spider", anew: "spider",
    avg: [ 5.71, 4.28 ], std: [ 2.21, 2.00 ], fq: 50 
  },
  "swore": {
    dict: "happiness", word: "swore", stem: "swore", anew: "trust",
    avg: [ 5.30, 4.28 ], std: [ 2.66, 1.58 ], fq: 50 
  },
  "taken": {
    dict: "happiness", word: "taken", stem: "taken", anew: "learn",
    avg: [ 5.39, 4.28 ], std: [ 2.22, 1.47 ], fq: 50 
  },
  "warn": {
    dict: "happiness", word: "warn", stem: "warn", anew: "discouraged",
    avg: [ 4.53, 4.27 ], std: [ 2.11, 1.72 ], fq: 50 
  },
  "blows": {
    dict: "happiness", word: "blows", stem: "blow", anew: "waste",
    avg: [ 4.14, 4.26 ], std: [ 2.30, 1.76 ], fq: 50 
  },
  "fires": {
    dict: "happiness", word: "fires", stem: "fire", anew: "fire",
    avg: [ 7.17, 4.26 ], std: [ 2.06, 1.74 ], fq: 50 
  },
  "outlaw": {
    dict: "happiness", word: "outlaw", stem: "outlaw", anew: "criminal",
    avg: [ 4.79, 4.26 ], std: [ 2.51, 1.70 ], fq: 50 
  },
  "owing": {
    dict: "happiness", word: "owing", stem: "owe", anew: "outstanding",
    avg: [ 6.24, 4.26 ], std: [ 2.59, 1.95 ], fq: 50 
  },
  "split": {
    dict: "happiness", word: "split", stem: "split", anew: "part",
    avg: [ 3.82, 4.26 ], std: [ 2.24, 1.50 ], fq: 50 
  },
  "storm": {
    dict: "happiness", word: "storm", stem: "storm", anew: "storm",
    avg: [ 5.71, 4.26 ], std: [ 2.34, 2.01 ], fq: 50 
  },
  "concerning": {
    dict: "happiness", word: "concerning", stem: "concern", anew: "interest",
    avg: [ 5.66, 4.24 ], std: [ 2.26, 1.69 ], fq: 50 
  },
  "lower": {
    dict: "happiness", word: "lower", stem: "lower", anew: "blue",
    avg: [ 4.31, 4.24 ], std: [ 2.20, 1.08 ], fq: 50 
  },
  "pounding": {
    dict: "happiness", word: "pounding", stem: "pound", anew: "hammer",
    avg: [ 4.58, 4.24 ], std: [ 2.02, 2.03 ], fq: 50 
  },
  "questioned": {
    dict: "happiness", word: "questioned", stem: "question", anew: "wonder",
    avg: [ 5.00, 4.24 ], std: [ 2.23, 1.27 ], fq: 50 
  },
  "raw": {
    dict: "happiness", word: "raw", stem: "raw", anew: "cut",
    avg: [ 5.00, 4.24 ], std: [ 2.32, 1.29 ], fq: 50 
  },
  "sag": {
    dict: "happiness", word: "sag", stem: "sag", anew: "flag",
    avg: [ 4.60, 4.24 ], std: [ 2.35, 1.32 ], fq: 50 
  },
  "smash": {
    dict: "happiness", word: "smash", stem: "smash", anew: "hit",
    avg: [ 5.73, 4.24 ], std: [ 2.09, 1.57 ], fq: 50 
  },
  "stern": {
    dict: "happiness", word: "stern", stem: "stern", anew: "severe",
    avg: [ 5.26, 4.24 ], std: [ 2.36, 1.36 ], fq: 50 
  },
  "swear": {
    dict: "happiness", word: "swear", stem: "swear", anew: "trust",
    avg: [ 5.30, 4.24 ], std: [ 2.66, 1.62 ], fq: 50 
  },
  "worn": {
    dict: "happiness", word: "worn", stem: "worn", anew: "fatigued",
    avg: [ 2.64, 4.23 ], std: [ 2.19, 1.10 ], fq: 50 
  },
  "freaks": {
    dict: "happiness", word: "freaks", stem: "freak", anew: "addicted",
    avg: [ 4.81, 4.22 ], std: [ 2.46, 2.00 ], fq: 50 
  },
  "beware": {
    dict: "happiness", word: "beware", stem: "bewar", anew: "mind",
    avg: [ 5.00, 4.22 ], std: [ 2.68, 1.67 ], fq: 50 
  },
  "blast": {
    dict: "happiness", word: "blast", stem: "blast", anew: "crucify",
    avg: [ 6.47, 4.22 ], std: [ 2.47, 2.12 ], fq: 50 
  },
  "cold": {
    dict: "happiness", word: "cold", stem: "cold", anew: "cold",
    avg: [ 5.19, 4.22 ], std: [ 2.23, 1.78 ], fq: 50 
  },
  "concerned": {
    dict: "happiness", word: "concerned", stem: "concern", anew: "interest",
    avg: [ 5.66, 4.22 ], std: [ 2.26, 1.66 ], fq: 50 
  },
  "grind": {
    dict: "happiness", word: "grind", stem: "grind", anew: "grateful",
    avg: [ 4.58, 4.22 ], std: [ 2.14, 1.37 ], fq: 50 
  },
  "python": {
    dict: "happiness", word: "python", stem: "python", anew: "python",
    avg: [ 6.18, 4.22 ], std: [ 2.25, 1.80 ], fq: 50 
  },
  "scratch": {
    dict: "happiness", word: "scratch", stem: "scratch", anew: "scar",
    avg: [ 4.79, 4.22 ], std: [ 2.11, 1.37 ], fq: 50 
  },
  "beat": {
    dict: "happiness", word: "beat", stem: "beat", anew: "crushed",
    avg: [ 5.52, 4.20 ], std: [ 2.87, 1.98 ], fq: 50 
  },
  "lone": {
    dict: "happiness", word: "lone", stem: "lone", anew: "lonely",
    avg: [ 4.51, 4.20 ], std: [ 2.68, 1.56 ], fq: 50 
  },
  "politically": {
    dict: "happiness", word: "politically", stem: "polit", anew: "politeness",
    avg: [ 3.74, 4.20 ], std: [ 2.37, 1.37 ], fq: 50 
  },
  "screw": {
    dict: "happiness", word: "screw", stem: "screw", anew: "loved",
    avg: [ 6.38, 4.20 ], std: [ 2.68, 1.85 ], fq: 50 
  },
  "whips": {
    dict: "happiness", word: "whips", stem: "whip", anew: "blister",
    avg: [ 4.10, 4.20 ], std: [ 2.34, 1.91 ], fq: 50 
  },
  "capture": {
    dict: "happiness", word: "capture", stem: "captur", anew: "fascinate",
    avg: [ 5.83, 4.18 ], std: [ 2.73, 1.70 ], fq: 50 
  },
  "forces": {
    dict: "happiness", word: "forces", stem: "forc", anew: "pressure",
    avg: [ 6.07, 4.18 ], std: [ 2.26, 1.59 ], fq: 50 
  },
  "reduce": {
    dict: "happiness", word: "reduce", stem: "reduc", anew: "concentrate",
    avg: [ 4.65, 4.18 ], std: [ 2.13, 1.26 ], fq: 50 
  },
  "smells": {
    dict: "happiness", word: "smells", stem: "smell", anew: "spirit",
    avg: [ 5.56, 4.18 ], std: [ 2.62, 1.59 ], fq: 50 
  },
  "gambling": {
    dict: "happiness", word: "gambling", stem: "gambl", anew: "game",
    avg: [ 5.89, 4.16 ], std: [ 2.37, 1.99 ], fq: 50 
  },
  "heat": {
    dict: "happiness", word: "heat", stem: "heat", anew: "passion",
    avg: [ 7.26, 4.16 ], std: [ 2.57, 1.82 ], fq: 50 
  },
  "stranger": {
    dict: "happiness", word: "stranger", stem: "stranger", anew: "alien",
    avg: [ 5.45, 4.16 ], std: [ 2.15, 0.96 ], fq: 50 
  },
  "strangers": {
    dict: "happiness", word: "strangers", stem: "stranger", anew: "alien",
    avg: [ 5.45, 4.16 ], std: [ 2.15, 1.75 ], fq: 50 
  },
  "sucking": {
    dict: "happiness", word: "sucking", stem: "suck", anew: "nurse",
    avg: [ 4.84, 4.16 ], std: [ 2.04, 1.73 ], fq: 50 
  },
  "fuck": {
    dict: "happiness", word: "fuck", stem: "fuck", anew: "loved",
    avg: [ 6.38, 4.14 ], std: [ 2.68, 2.58 ], fq: 50 
  },
  "pee": {
    dict: "happiness", word: "pee", stem: "pee", anew: "urine",
    avg: [ 4.20, 4.14 ], std: [ 2.18, 1.53 ], fq: 50 
  },
  "pushing": {
    dict: "happiness", word: "pushing", stem: "push", anew: "promotion",
    avg: [ 6.44, 4.14 ], std: [ 2.58, 1.32 ], fq: 50 
  },
  "shark": {
    dict: "happiness", word: "shark", stem: "shark", anew: "shark",
    avg: [ 7.16, 4.14 ], std: [ 1.96, 1.92 ], fq: 50 
  },
  "strict": {
    dict: "happiness", word: "strict", stem: "strict", anew: "rigid",
    avg: [ 4.66, 4.13 ], std: [ 2.47, 1.76 ], fq: 50 
  },
  "decrease": {
    dict: "happiness", word: "decrease", stem: "decreas", anew: "fall",
    avg: [ 4.70, 4.12 ], std: [ 2.48, 1.55 ], fq: 50 
  },
  "bother": {
    dict: "happiness", word: "bother", stem: "bother", anew: "irritate",
    avg: [ 5.76, 4.12 ], std: [ 2.15, 1.62 ], fq: 50 
  },
  "fuss": {
    dict: "happiness", word: "fuss", stem: "fuss", anew: "troubled",
    avg: [ 5.94, 4.12 ], std: [ 2.36, 1.78 ], fq: 50 
  },
  "nonsense": {
    dict: "happiness", word: "nonsense", stem: "nonsens", anew: "nonsense",
    avg: [ 4.17, 4.12 ], std: [ 2.02, 1.60 ], fq: 50 
  },
  "political": {
    dict: "happiness", word: "political", stem: "polit", anew: "politeness",
    avg: [ 3.74, 4.12 ], std: [ 2.37, 1.52 ], fq: 50 
  },
  "rush": {
    dict: "happiness", word: "rush", stem: "rush", anew: "kick",
    avg: [ 4.90, 4.12 ], std: [ 2.35, 1.36 ], fq: 50 
  },
  "twisted": {
    dict: "happiness", word: "twisted", stem: "twist", anew: "pervert",
    avg: [ 6.26, 4.12 ], std: [ 2.61, 1.67 ], fq: 50 
  },
  "hard": {
    dict: "happiness", word: "hard", stem: "hard", anew: "hard",
    avg: [ 5.12, 4.10 ], std: [ 2.19, 1.39 ], fq: 50 
  },
  "heavy": {
    dict: "happiness", word: "heavy", stem: "heavi", anew: "hard",
    avg: [ 5.12, 4.10 ], std: [ 2.19, 1.42 ], fq: 50 
  },
  "numb": {
    dict: "happiness", word: "numb", stem: "numb", anew: "dead",
    avg: [ 5.73, 4.10 ], std: [ 2.73, 1.63 ], fq: 50 
  },
  "pushed": {
    dict: "happiness", word: "pushed", stem: "push", anew: "promotion",
    avg: [ 6.44, 4.10 ], std: [ 2.58, 1.47 ], fq: 50 
  },
  "rid": {
    dict: "happiness", word: "rid", stem: "rid", anew: "free",
    avg: [ 5.15, 4.10 ], std: [ 3.04, 1.42 ], fq: 50 
  },
  "weary": {
    dict: "happiness", word: "weary", stem: "weari", anew: "weary",
    avg: [ 3.81, 4.08 ], std: [ 2.29, 1.62 ], fq: 50 
  },
  "cutting": {
    dict: "happiness", word: "cutting", stem: "cut", anew: "cut",
    avg: [ 5.00, 4.08 ], std: [ 2.32, 1.40 ], fq: 50 
  },
  "hung": {
    dict: "happiness", word: "hung", stem: "hung", anew: "fall",
    avg: [ 4.70, 4.08 ], std: [ 2.48, 1.63 ], fq: 50 
  },
  "knife": {
    dict: "happiness", word: "knife", stem: "knife", anew: "knife",
    avg: [ 5.80, 4.08 ], std: [ 2.00, 1.40 ], fq: 50 
  },
  "stopping": {
    dict: "happiness", word: "stopping", stem: "stop", anew: "bar",
    avg: [ 5.00, 4.08 ], std: [ 2.83, 1.40 ], fq: 50 
  },
  "surrender": {
    dict: "happiness", word: "surrender", stem: "surrend", anew: "fall",
    avg: [ 4.70, 4.08 ], std: [ 2.48, 1.68 ], fq: 50 
  },
  "temper": {
    dict: "happiness", word: "temper", stem: "temper", anew: "humor",
    avg: [ 5.50, 4.08 ], std: [ 2.91, 1.79 ], fq: 50 
  },
  "wont": {
    dict: "happiness", word: "wont", stem: "wont", anew: "habit",
    avg: [ 3.95, 4.08 ], std: [ 2.11, 1.05 ], fq: 50 
  },
  "blinding": {
    dict: "happiness", word: "blinding", stem: "blind", anew: "blind",
    avg: [ 4.39, 4.06 ], std: [ 2.36, 1.67 ], fq: 50 
  },
  "concerns": {
    dict: "happiness", word: "concerns", stem: "concern", anew: "headache",
    avg: [ 5.07, 4.06 ], std: [ 2.74, 1.56 ], fq: 50 
  },
  "sour": {
    dict: "happiness", word: "sour", stem: "sour", anew: "sour",
    avg: [ 5.10, 4.06 ], std: [ 1.95, 1.50 ], fq: 50 
  },
  "needles": {
    dict: "happiness", word: "needles", stem: "needl", anew: "needle",
    avg: [ 5.36, 4.04 ], std: [ 2.89, 1.99 ], fq: 50 
  },
  "colder": {
    dict: "happiness", word: "colder", stem: "colder", anew: "frigid",
    avg: [ 4.75, 4.04 ], std: [ 2.56, 1.96 ], fq: 50 
  },
  "concern": {
    dict: "happiness", word: "concern", stem: "concern", anew: "headache",
    avg: [ 5.07, 4.04 ], std: [ 2.74, 1.62 ], fq: 50 
  },
  "discharge": {
    dict: "happiness", word: "discharge", stem: "discharg", anew: "fire",
    avg: [ 7.17, 4.04 ], std: [ 2.06, 1.78 ], fq: 50 
  },
  "dominated": {
    dict: "happiness", word: "dominated", stem: "domin", anew: "masterful",
    avg: [ 5.20, 4.04 ], std: [ 2.85, 1.52 ], fq: 50 
  },
  "fall": {
    dict: "happiness", word: "fall", stem: "fall", anew: "fall",
    avg: [ 4.70, 4.04 ], std: [ 2.48, 1.97 ], fq: 50 
  },
  "unknown": {
    dict: "happiness", word: "unknown", stem: "unknown", anew: "alien",
    avg: [ 5.45, 4.04 ], std: [ 2.15, 1.51 ], fq: 50 
  },
  "worm": {
    dict: "happiness", word: "worm", stem: "worm", anew: "louse",
    avg: [ 4.98, 4.04 ], std: [ 2.03, 1.67 ], fq: 50 
  },
  "rust": {
    dict: "happiness", word: "rust", stem: "rust", anew: "rusty",
    avg: [ 3.77, 4.02 ], std: [ 2.16, 1.63 ], fq: 50 
  },
  "distant": {
    dict: "happiness", word: "distant", stem: "distant", anew: "aloof",
    avg: [ 4.28, 4.02 ], std: [ 2.10, 1.53 ], fq: 50 
  },
  "block": {
    dict: "happiness", word: "block", stem: "block", anew: "hinder",
    avg: [ 4.12, 4.02 ], std: [ 2.01, 1.42 ], fq: 50 
  },
  "consequences": {
    dict: "happiness", word: "consequences", stem: "consequ", anew: "moment",
    avg: [ 3.83, 4.02 ], std: [ 2.29, 1.32 ], fq: 50 
  },
  "dropping": {
    dict: "happiness", word: "dropping", stem: "drop", anew: "fall",
    avg: [ 4.70, 4.02 ], std: [ 2.48, 1.10 ], fq: 50 
  },
  "strikes": {
    dict: "happiness", word: "strikes", stem: "strike", anew: "hit",
    avg: [ 5.73, 4.02 ], std: [ 2.09, 1.36 ], fq: 50 
  },
  "bum": {
    dict: "happiness", word: "bum", stem: "bum", anew: "rat",
    avg: [ 4.95, 4.00 ], std: [ 2.36, 1.73 ], fq: 50 
  },
  "cracks": {
    dict: "happiness", word: "cracks", stem: "crack", anew: "tornado",
    avg: [ 6.83, 4.00 ], std: [ 2.49, 1.36 ], fq: 50 
  },
  "force": {
    dict: "happiness", word: "force", stem: "forc", anew: "pressure",
    avg: [ 6.07, 4.00 ], std: [ 2.26, 1.69 ], fq: 50 
  },
  "ridiculous": {
    dict: "happiness", word: "ridiculous", stem: "ridicul", anew: "ridicule",
    avg: [ 5.83, 4.00 ], std: [ 2.73, 1.80 ], fq: 50 
  },
  "roughly": {
    dict: "happiness", word: "roughly", stem: "roughli", anew: "rough",
    avg: [ 5.33, 4.00 ], std: [ 2.04, 1.21 ], fq: 50 
  },
  "twit": {
    dict: "happiness", word: "twit", stem: "twit", anew: "tease",
    avg: [ 5.87, 4.00 ], std: [ 2.56, 1.76 ], fq: 50 
  },
  "bite": {
    dict: "happiness", word: "bite", stem: "bite", anew: "prick",
    avg: [ 4.70, 3.98 ], std: [ 2.59, 1.72 ], fq: 50 
  },
  "breaking": {
    dict: "happiness", word: "breaking", stem: "break", anew: "bankrupt",
    avg: [ 6.21, 3.98 ], std: [ 2.79, 1.49 ], fq: 50 
  },
  "ruins": {
    dict: "happiness", word: "ruins", stem: "ruin", anew: "bankrupt",
    avg: [ 6.21, 3.98 ], std: [ 2.79, 1.76 ], fq: 50 
  },
  "bang": {
    dict: "happiness", word: "bang", stem: "bang", anew: "loved",
    avg: [ 6.38, 3.96 ], std: [ 2.68, 1.48 ], fq: 50 
  },
  "dagger": {
    dict: "happiness", word: "dagger", stem: "dagger", anew: "dagger",
    avg: [ 6.14, 3.96 ], std: [ 2.64, 1.32 ], fq: 50 
  },
  "loose": {
    dict: "happiness", word: "loose", stem: "loos", anew: "easy",
    avg: [ 4.48, 3.96 ], std: [ 2.82, 1.65 ], fq: 50 
  },
  "slugs": {
    dict: "happiness", word: "slugs", stem: "slug", anew: "bullet",
    avg: [ 5.33, 3.96 ], std: [ 2.48, 1.64 ], fq: 50 
  },
  "strike": {
    dict: "happiness", word: "strike", stem: "strike", anew: "hit",
    avg: [ 5.73, 3.96 ], std: [ 2.09, 1.35 ], fq: 50 
  },
  "tough": {
    dict: "happiness", word: "tough", stem: "tough", anew: "hard",
    avg: [ 5.12, 3.96 ], std: [ 2.19, 1.41 ], fq: 50 
  },
  "skull": {
    dict: "happiness", word: "skull", stem: "skull", anew: "skull",
    avg: [ 4.75, 3.96 ], std: [ 1.85, 1.63 ], fq: 50 
  },
  "charges": {
    dict: "happiness", word: "charges", stem: "charg", anew: "excitement",
    avg: [ 7.67, 3.94 ], std: [ 1.91, 1.53 ], fq: 50 
  },
  "darker": {
    dict: "happiness", word: "darker", stem: "darker", anew: "color",
    avg: [ 4.73, 3.94 ], std: [ 2.64, 1.90 ], fq: 50 
  },
  "mess": {
    dict: "happiness", word: "mess", stem: "mess", anew: "messy",
    avg: [ 3.34, 3.94 ], std: [ 2.37, 1.57 ], fq: 50 
  },
  "dizzy": {
    dict: "happiness", word: "dizzy", stem: "dizzi", anew: "silly",
    avg: [ 5.88, 3.94 ], std: [ 2.38, 1.72 ], fq: 50 
  },
  "executed": {
    dict: "happiness", word: "executed", stem: "execut", anew: "execution",
    avg: [ 5.71, 3.94 ], std: [ 2.74, 2.20 ], fq: 50 
  },
  "omitted": {
    dict: "happiness", word: "omitted", stem: "omit", anew: "neglect",
    avg: [ 4.83, 3.92 ], std: [ 2.31, 1.21 ], fq: 50 
  },
  "jaded": {
    dict: "happiness", word: "jaded", stem: "jade", anew: "fatigued",
    avg: [ 2.64, 3.92 ], std: [ 2.19, 1.66 ], fq: 50 
  },
  "dusty": {
    dict: "happiness", word: "dusty", stem: "dusti", anew: "cold",
    avg: [ 5.19, 3.92 ], std: [ 2.23, 1.70 ], fq: 50 
  },
  "alarm": {
    dict: "happiness", word: "alarm", stem: "alarm", anew: "alert",
    avg: [ 6.85, 3.90 ], std: [ 2.53, 1.66 ], fq: 50 
  },
  "dim": {
    dict: "happiness", word: "dim", stem: "dim", anew: "blind",
    avg: [ 4.39, 3.90 ], std: [ 2.36, 1.34 ], fq: 50 
  },
  "issues": {
    dict: "happiness", word: "issues", stem: "issu", anew: "event",
    avg: [ 5.10, 3.90 ], std: [ 2.40, 1.37 ], fq: 50 
  },
  "misses": {
    dict: "happiness", word: "misses", stem: "miss", anew: "girl",
    avg: [ 4.29, 3.90 ], std: [ 2.69, 1.37 ], fq: 50 
  },
  "slipping": {
    dict: "happiness", word: "slipping", stem: "slip", anew: "mistake",
    avg: [ 5.18, 3.90 ], std: [ 2.42, 1.45 ], fq: 50 
  },
  "stop": {
    dict: "happiness", word: "stop", stem: "stop", anew: "bar",
    avg: [ 5.00, 3.90 ], std: [ 2.83, 1.34 ], fq: 50 
  },
  "dropped": {
    dict: "happiness", word: "dropped", stem: "drop", anew: "neglect",
    avg: [ 4.83, 3.88 ], std: [ 2.31, 1.00 ], fq: 50 
  },
  "drunk": {
    dict: "happiness", word: "drunk", stem: "drunk", anew: "salute",
    avg: [ 5.31, 3.88 ], std: [ 2.23, 2.25 ], fq: 50 
  },
  "shout": {
    dict: "happiness", word: "shout", stem: "shout", anew: "abuse",
    avg: [ 6.83, 3.88 ], std: [ 2.70, 1.38 ], fq: 50 
  },
  "artillery": {
    dict: "happiness", word: "artillery", stem: "artilleri", anew: "weapon",
    avg: [ 6.03, 3.88 ], std: [ 1.89, 1.54 ], fq: 50 
  },
  "goddamn": {
    dict: "happiness", word: "goddamn", stem: "goddamn", anew: "bless",
    avg: [ 4.05, 3.88 ], std: [ 2.59, 2.18 ], fq: 50 
  },
  "rags": {
    dict: "happiness", word: "rags", stem: "rag", anew: "irritate",
    avg: [ 5.76, 3.88 ], std: [ 2.15, 1.54 ], fq: 50 
  },
  "fiends": {
    dict: "happiness", word: "fiends", stem: "fiend", anew: "devil",
    avg: [ 6.07, 3.88 ], std: [ 2.61, 1.92 ], fq: 50 
  },
  "ass": {
    dict: "happiness", word: "ass", stem: "ass", anew: "seat",
    avg: [ 2.95, 3.86 ], std: [ 1.72, 1.86 ], fq: 50 
  },
  "farewell": {
    dict: "happiness", word: "farewell", stem: "farewel", anew: "part",
    avg: [ 3.82, 3.86 ], std: [ 2.24, 2.13 ], fq: 50 
  },
  "hang": {
    dict: "happiness", word: "hang", stem: "hang", anew: "fall",
    avg: [ 4.70, 3.86 ], std: [ 2.48, 1.32 ], fq: 50 
  },
  "stopped": {
    dict: "happiness", word: "stopped", stem: "stop", anew: "bar",
    avg: [ 5.00, 3.86 ], std: [ 2.83, 1.23 ], fq: 50 
  },
  "slipped": {
    dict: "happiness", word: "slipped", stem: "slip", anew: "mistake",
    avg: [ 5.18, 3.86 ], std: [ 2.42, 1.58 ], fq: 50 
  },
  "mold": {
    dict: "happiness", word: "mold", stem: "mold", anew: "mold",
    avg: [ 4.07, 3.85 ], std: [ 1.98, 1.80 ], fq: 50 
  },
  "shiver": {
    dict: "happiness", word: "shiver", stem: "shiver", anew: "thrill",
    avg: [ 8.02, 3.85 ], std: [ 1.65, 1.49 ], fq: 50 
  },
  "armed": {
    dict: "happiness", word: "armed", stem: "arm", anew: "arm",
    avg: [ 3.59, 3.84 ], std: [ 2.40, 1.86 ], fq: 50 
  },
  "excuses": {
    dict: "happiness", word: "excuses", stem: "excus", anew: "excuse",
    avg: [ 4.48, 3.84 ], std: [ 2.29, 1.52 ], fq: 50 
  },
  "gripe": {
    dict: "happiness", word: "gripe", stem: "gripe", anew: "gripe",
    avg: [ 5.00, 3.84 ], std: [ 2.19, 1.87 ], fq: 50 
  },
  "rent": {
    dict: "happiness", word: "rent", stem: "rent", anew: "engaged",
    avg: [ 6.77, 3.84 ], std: [ 2.07, 1.48 ], fq: 50 
  },
  "snatch": {
    dict: "happiness", word: "snatch", stem: "snatch", anew: "abduction",
    avg: [ 5.53, 3.84 ], std: [ 2.43, 1.63 ], fq: 50 
  },
  "ghosts": {
    dict: "happiness", word: "ghosts", stem: "ghost", anew: "obsession",
    avg: [ 6.41, 3.84 ], std: [ 2.13, 1.98 ], fq: 50 
  },
  "dark": {
    dict: "happiness", word: "dark", stem: "dark", anew: "dark",
    avg: [ 4.28, 3.82 ], std: [ 2.21, 1.41 ], fq: 50 
  },
  "darkness": {
    dict: "happiness", word: "darkness", stem: "dark", anew: "dark",
    avg: [ 4.28, 3.82 ], std: [ 2.21, 1.87 ], fq: 50 
  },
  "eliminate": {
    dict: "happiness", word: "eliminate", stem: "elimin", anew: "rejected",
    avg: [ 6.37, 3.82 ], std: [ 2.56, 1.75 ], fq: 50 
  },
  "hanging": {
    dict: "happiness", word: "hanging", stem: "hang", anew: "fall",
    avg: [ 4.70, 3.82 ], std: [ 2.48, 1.72 ], fq: 50 
  },
  "hardest": {
    dict: "happiness", word: "hardest", stem: "hardest", anew: "hard",
    avg: [ 5.12, 3.82 ], std: [ 2.19, 1.62 ], fq: 50 
  },
  "junk": {
    dict: "happiness", word: "junk", stem: "junk", anew: "trash",
    avg: [ 4.16, 3.82 ], std: [ 2.16, 1.34 ], fq: 50 
  },
  "oppose": {
    dict: "happiness", word: "oppose", stem: "oppos", anew: "fight",
    avg: [ 7.15, 3.82 ], std: [ 2.19, 1.44 ], fq: 50 
  },
  "slip": {
    dict: "happiness", word: "slip", stem: "slip", anew: "mistake",
    avg: [ 5.18, 3.82 ], std: [ 2.42, 1.29 ], fq: 50 
  },
  "thirst": {
    dict: "happiness", word: "thirst", stem: "thirst", anew: "lust",
    avg: [ 6.88, 3.82 ], std: [ 1.85, 1.72 ], fq: 50 
  },
  "aggressive": {
    dict: "happiness", word: "aggressive", stem: "aggress", anew: "aggressive",
    avg: [ 5.83, 3.80 ], std: [ 2.33, 1.58 ], fq: 50 
  },
  "fire": {
    dict: "happiness", word: "fire", stem: "fire", anew: "fire",
    avg: [ 7.17, 3.80 ], std: [ 2.06, 1.58 ], fq: 50 
  },
  "interment": {
    dict: "happiness", word: "interment", stem: "inter", anew: "burial",
    avg: [ 5.08, 3.80 ], std: [ 2.40, 1.83 ], fq: 50 
  },
  "pale": {
    dict: "happiness", word: "pale", stem: "pale", anew: "sickness",
    avg: [ 5.61, 3.80 ], std: [ 2.67, 1.09 ], fq: 50 
  },
  "witch": {
    dict: "happiness", word: "witch", stem: "witch", anew: "glamour",
    avg: [ 4.68, 3.80 ], std: [ 2.23, 2.09 ], fq: 50 
  },
  "thirsty": {
    dict: "happiness", word: "thirsty", stem: "thirsti", anew: "hungry",
    avg: [ 5.13, 3.79 ], std: [ 2.44, 1.46 ], fq: 50 
  },
  "thorns": {
    dict: "happiness", word: "thorns", stem: "thorn", anew: "thorn",
    avg: [ 5.14, 3.79 ], std: [ 2.14, 1.68 ], fq: 50 
  },
  "battles": {
    dict: "happiness", word: "battles", stem: "battl", anew: "engaged",
    avg: [ 6.77, 3.78 ], std: [ 2.07, 2.00 ], fq: 50 
  },
  "bugs": {
    dict: "happiness", word: "bugs", stem: "bug", anew: "tease",
    avg: [ 5.87, 3.78 ], std: [ 2.56, 1.52 ], fq: 50 
  },
  "ends": {
    dict: "happiness", word: "ends", stem: "end", anew: "death",
    avg: [ 4.59, 3.78 ], std: [ 3.07, 1.49 ], fq: 50 
  },
  "risks": {
    dict: "happiness", word: "risks", stem: "risk", anew: "danger",
    avg: [ 7.32, 3.78 ], std: [ 2.07, 1.76 ], fq: 50 
  },
  "rusty": {
    dict: "happiness", word: "rusty", stem: "rusti", anew: "rusty",
    avg: [ 3.77, 3.78 ], std: [ 2.16, 1.46 ], fq: 50 
  },
  "slow": {
    dict: "happiness", word: "slow", stem: "slow", anew: "slow",
    avg: [ 3.39, 3.78 ], std: [ 2.22, 1.11 ], fq: 50 
  },
  "bothered": {
    dict: "happiness", word: "bothered", stem: "bother", anew: "irritate",
    avg: [ 5.76, 3.78 ], std: [ 2.15, 1.53 ], fq: 50 
  },
  "resigned": {
    dict: "happiness", word: "resigned", stem: "resign", anew: "vacation",
    avg: [ 5.64, 3.76 ], std: [ 2.99, 1.59 ], fq: 50 
  },
  "yell": {
    dict: "happiness", word: "yell", stem: "yell", anew: "scream",
    avg: [ 7.04, 3.76 ], std: [ 1.96, 1.72 ], fq: 50 
  },
  "hangs": {
    dict: "happiness", word: "hangs", stem: "hang", anew: "fall",
    avg: [ 4.70, 3.76 ], std: [ 2.48, 1.68 ], fq: 50 
  },
  "boo": {
    dict: "happiness", word: "boo", stem: "boo", anew: "bird",
    avg: [ 3.17, 3.74 ], std: [ 2.23, 1.76 ], fq: 50 
  },
  "last": {
    dict: "happiness", word: "last", stem: "last", anew: "death",
    avg: [ 4.59, 3.74 ], std: [ 3.07, 1.26 ], fq: 50 
  },
  "noise": {
    dict: "happiness", word: "noise", stem: "nois", anew: "disturb",
    avg: [ 5.80, 3.74 ], std: [ 2.39, 1.31 ], fq: 50 
  },
  "obsession": {
    dict: "happiness", word: "obsession", stem: "obsess", anew: "obsession",
    avg: [ 6.41, 3.74 ], std: [ 2.13, 1.12 ], fq: 50 
  },
  "wait": {
    dict: "happiness", word: "wait", stem: "wait", anew: "delayed",
    avg: [ 5.62, 3.74 ], std: [ 2.39, 1.21 ], fq: 50 
  },
  "tearing": {
    dict: "happiness", word: "tearing", stem: "tear", anew: "water",
    avg: [ 4.97, 3.73 ], std: [ 2.49, 1.38 ], fq: 50 
  },
  "strain": {
    dict: "happiness", word: "strain", stem: "strain", anew: "deformed",
    avg: [ 4.07, 3.73 ], std: [ 2.34, 1.81 ], fq: 50 
  },
  "crack": {
    dict: "happiness", word: "crack", stem: "crack", anew: "tornado",
    avg: [ 6.83, 3.72 ], std: [ 2.49, 1.44 ], fq: 50 
  },
  "gross": {
    dict: "happiness", word: "gross", stem: "gross", anew: "crude",
    avg: [ 5.07, 3.72 ], std: [ 2.37, 1.49 ], fq: 50 
  },
  "kick": {
    dict: "happiness", word: "kick", stem: "kick", anew: "kick",
    avg: [ 4.90, 3.72 ], std: [ 2.35, 1.55 ], fq: 50 
  },
  "operation": {
    dict: "happiness", word: "operation", stem: "oper", anew: "surgery",
    avg: [ 6.35, 3.72 ], std: [ 2.32, 1.60 ], fq: 50 
  },
  "removed": {
    dict: "happiness", word: "removed", stem: "remov", anew: "murderer",
    avg: [ 7.47, 3.72 ], std: [ 2.18, 1.39 ], fq: 50 
  },
  "withdrawal": {
    dict: "happiness", word: "withdrawal", stem: "withdraw", anew: "detached",
    avg: [ 4.26, 3.72 ], std: [ 2.57, 1.84 ], fq: 50 
  },
  "con": {
    dict: "happiness", word: "con", stem: "con", anew: "victim",
    avg: [ 6.06, 3.70 ], std: [ 2.32, 1.15 ], fq: 50 
  },
  "crooked": {
    dict: "happiness", word: "crooked", stem: "crook", anew: "corrupt",
    avg: [ 4.67, 3.70 ], std: [ 2.35, 1.61 ], fq: 50 
  },
  "dirt": {
    dict: "happiness", word: "dirt", stem: "dirt", anew: "dirt",
    avg: [ 3.76, 3.70 ], std: [ 2.26, 1.53 ], fq: 50 
  },
  "locked": {
    dict: "happiness", word: "locked", stem: "lock", anew: "engaged",
    avg: [ 6.77, 3.70 ], std: [ 2.07, 1.27 ], fq: 50 
  },
  "remove": {
    dict: "happiness", word: "remove", stem: "remov", anew: "murderer",
    avg: [ 7.47, 3.70 ], std: [ 2.18, 1.20 ], fq: 50 
  },
  "hustler": {
    dict: "happiness", word: "hustler", stem: "hustler", anew: "hooker",
    avg: [ 4.93, 3.69 ], std: [ 2.82, 1.76 ], fq: 50 
  },
  "controversy": {
    dict: "happiness", word: "controversy", stem: "controversi", anew: "contents",
    avg: [ 4.32, 3.68 ], std: [ 2.14, 1.74 ], fq: 50 
  },
  "hitting": {
    dict: "happiness", word: "hitting", stem: "hit", anew: "hit",
    avg: [ 5.73, 3.68 ], std: [ 2.09, 1.74 ], fq: 50 
  },
  "kicking": {
    dict: "happiness", word: "kicking", stem: "kick", anew: "kick",
    avg: [ 4.90, 3.68 ], std: [ 2.35, 1.62 ], fq: 50 
  },
  "mean": {
    dict: "happiness", word: "mean", stem: "mean", anew: "hate",
    avg: [ 6.95, 3.68 ], std: [ 2.56, 1.92 ], fq: 50 
  },
  "missed": {
    dict: "happiness", word: "missed", stem: "miss", anew: "lost",
    avg: [ 5.82, 3.68 ], std: [ 2.62, 1.24 ], fq: 50 
  },
  "wrath": {
    dict: "happiness", word: "wrath", stem: "wrath", anew: "anger",
    avg: [ 7.63, 3.68 ], std: [ 1.91, 1.97 ], fq: 50 
  },
  "low": {
    dict: "happiness", word: "low", stem: "low", anew: "depression",
    avg: [ 4.54, 3.66 ], std: [ 3.19, 1.12 ], fq: 50 
  },
  "messy": {
    dict: "happiness", word: "messy", stem: "messi", anew: "messy",
    avg: [ 3.34, 3.66 ], std: [ 2.37, 1.19 ], fq: 50 
  },
  "patients": {
    dict: "happiness", word: "patients", stem: "patient", anew: "patient",
    avg: [ 4.21, 3.66 ], std: [ 2.37, 1.41 ], fq: 50 
  },
  "pressure": {
    dict: "happiness", word: "pressure", stem: "pressur", anew: "pressure",
    avg: [ 6.07, 3.66 ], std: [ 2.26, 1.55 ], fq: 50 
  },
  "snitch": {
    dict: "happiness", word: "snitch", stem: "snitch", anew: "betray",
    avg: [ 7.24, 3.66 ], std: [ 2.06, 1.65 ], fq: 50 
  },
  "sorry": {
    dict: "happiness", word: "sorry", stem: "sorri", anew: "regretful",
    avg: [ 5.74, 3.66 ], std: [ 2.32, 1.76 ], fq: 50 
  },
  "snakes": {
    dict: "happiness", word: "snakes", stem: "snake", anew: "snake",
    avg: [ 6.82, 3.65 ], std: [ 2.10, 2.09 ], fq: 50 
  },
  "lesions": {
    dict: "happiness", word: "lesions", stem: "lesion", anew: "wounds",
    avg: [ 5.82, 3.65 ], std: [ 2.01, 1.90 ], fq: 50 
  },
  "bill": {
    dict: "happiness", word: "bill", stem: "bill", anew: "poster",
    avg: [ 3.93, 3.64 ], std: [ 2.56, 1.77 ], fq: 50 
  },
  "blocked": {
    dict: "happiness", word: "blocked", stem: "block", anew: "hinder",
    avg: [ 4.12, 3.64 ], std: [ 2.01, 1.45 ], fq: 50 
  },
  "bore": {
    dict: "happiness", word: "bore", stem: "bore", anew: "bored",
    avg: [ 2.83, 3.64 ], std: [ 2.31, 1.59 ], fq: 50 
  },
  "cuts": {
    dict: "happiness", word: "cuts", stem: "cut", anew: "cut",
    avg: [ 5.00, 3.64 ], std: [ 2.32, 1.40 ], fq: 50 
  },
  "darkest": {
    dict: "happiness", word: "darkest", stem: "darkest", anew: "color",
    avg: [ 4.73, 3.64 ], std: [ 2.64, 2.12 ], fq: 50 
  },
  "ghost": {
    dict: "happiness", word: "ghost", stem: "ghost", anew: "obsession",
    avg: [ 6.41, 3.64 ], std: [ 2.13, 2.08 ], fq: 50 
  },
  "miss": {
    dict: "happiness", word: "miss", stem: "miss", anew: "girl",
    avg: [ 4.29, 3.64 ], std: [ 2.69, 1.63 ], fq: 50 
  },
  "shocked": {
    dict: "happiness", word: "shocked", stem: "shock", anew: "outrage",
    avg: [ 6.83, 3.64 ], std: [ 2.26, 1.32 ], fq: 50 
  },
  "awkward": {
    dict: "happiness", word: "awkward", stem: "awkward", anew: "clumsy",
    avg: [ 5.18, 3.62 ], std: [ 2.40, 1.40 ], fq: 50 
  },
  "haunt": {
    dict: "happiness", word: "haunt", stem: "haunt", anew: "obsession",
    avg: [ 6.41, 3.62 ], std: [ 2.13, 1.64 ], fq: 50 
  },
  "risk": {
    dict: "happiness", word: "risk", stem: "risk", anew: "danger",
    avg: [ 7.32, 3.62 ], std: [ 2.07, 1.64 ], fq: 50 
  },
  "crude": {
    dict: "happiness", word: "crude", stem: "crude", anew: "crude",
    avg: [ 5.07, 3.60 ], std: [ 2.37, 1.44 ], fq: 50 
  },
  "falls": {
    dict: "happiness", word: "falls", stem: "fall", anew: "fall",
    avg: [ 4.70, 3.60 ], std: [ 2.48, 1.90 ], fq: 50 
  },
  "madness": {
    dict: "happiness", word: "madness", stem: "mad", anew: "mad",
    avg: [ 6.76, 3.60 ], std: [ 2.26, 1.82 ], fq: 50 
  },
  "mistaken": {
    dict: "happiness", word: "mistaken", stem: "mistaken", anew: "FALSE",
    avg: [ 3.43, 3.60 ], std: [ 2.09, 1.43 ], fq: 50 
  },
  "acid": {
    dict: "happiness", word: "acid", stem: "acid", anew: "blister",
    avg: [ 4.10, 3.59 ], std: [ 2.34, 1.55 ], fq: 50 
  },
  "pistol": {
    dict: "happiness", word: "pistol", stem: "pistol", anew: "pistol",
    avg: [ 6.15, 3.59 ], std: [ 2.19, 1.90 ], fq: 50 
  },
  "decreased": {
    dict: "happiness", word: "decreased", stem: "decreas", anew: "fall",
    avg: [ 4.70, 3.58 ], std: [ 2.48, 1.40 ], fq: 50 
  },
  "excluded": {
    dict: "happiness", word: "excluded", stem: "exclud", anew: "bar",
    avg: [ 5.00, 3.58 ], std: [ 2.83, 1.54 ], fq: 50 
  },
  "gossip": {
    dict: "happiness", word: "gossip", stem: "gossip", anew: "gossip",
    avg: [ 5.74, 3.58 ], std: [ 2.38, 1.93 ], fq: 50 
  },
  "shotgun": {
    dict: "happiness", word: "shotgun", stem: "shotgun", anew: "shotgun",
    avg: [ 6.27, 3.58 ], std: [ 1.94, 1.87 ], fq: 50 
  },
  "confusing": {
    dict: "happiness", word: "confusing", stem: "confus", anew: "confused",
    avg: [ 6.03, 3.56 ], std: [ 1.88, 0.97 ], fq: 50 
  },
  "empty": {
    dict: "happiness", word: "empty", stem: "empti", anew: "vacation",
    avg: [ 5.64, 3.56 ], std: [ 2.99, 1.63 ], fq: 50 
  },
  "fucked": {
    dict: "happiness", word: "fucked", stem: "fuck", anew: "loved",
    avg: [ 6.38, 3.56 ], std: [ 2.68, 2.71 ], fq: 50 
  },
  "gloom": {
    dict: "happiness", word: "gloom", stem: "gloom", anew: "gloom",
    avg: [ 3.83, 3.56 ], std: [ 2.33, 2.12 ], fq: 50 
  },
  "mob": {
    dict: "happiness", word: "mob", stem: "mob", anew: "family",
    avg: [ 4.80, 3.56 ], std: [ 2.71, 1.86 ], fq: 50 
  },
  "offense": {
    dict: "happiness", word: "offense", stem: "offens", anew: "crime",
    avg: [ 5.41, 3.56 ], std: [ 2.69, 1.53 ], fq: 50 
  },
  "piss": {
    dict: "happiness", word: "piss", stem: "piss", anew: "urine",
    avg: [ 4.20, 3.56 ], std: [ 2.18, 1.73 ], fq: 50 
  },
  "sorely": {
    dict: "happiness", word: "sorely", stem: "sore", anew: "pain",
    avg: [ 6.50, 3.56 ], std: [ 2.49, 1.28 ], fq: 50 
  },
  "dire": {
    dict: "happiness", word: "dire", stem: "dire", anew: "terrible",
    avg: [ 6.27, 3.55 ], std: [ 2.44, 1.99 ], fq: 50 
  },
  "stains": {
    dict: "happiness", word: "stains", stem: "stain", anew: "filth",
    avg: [ 5.12, 3.55 ], std: [ 2.32, 1.47 ], fq: 50 
  },
  "haunted": {
    dict: "happiness", word: "haunted", stem: "haunt", anew: "obsession",
    avg: [ 6.41, 3.54 ], std: [ 2.13, 1.64 ], fq: 50 
  },
  "bug": {
    dict: "happiness", word: "bug", stem: "bug", anew: "tease",
    avg: [ 5.87, 3.54 ], std: [ 2.56, 1.37 ], fq: 50 
  },
  "caught": {
    dict: "happiness", word: "caught", stem: "caught", anew: "fascinate",
    avg: [ 5.83, 3.54 ], std: [ 2.73, 1.79 ], fq: 50 
  },
  "crushed": {
    dict: "happiness", word: "crushed", stem: "crush", anew: "crushed",
    avg: [ 5.52, 3.54 ], std: [ 2.87, 1.67 ], fq: 50 
  },
  "despise": {
    dict: "happiness", word: "despise", stem: "despis", anew: "despise",
    avg: [ 6.28, 3.54 ], std: [ 2.43, 2.03 ], fq: 50 
  },
  "dispute": {
    dict: "happiness", word: "dispute", stem: "disput", anew: "quarrel",
    avg: [ 6.29, 3.54 ], std: [ 2.56, 1.73 ], fq: 50 
  },
  "forsaken": {
    dict: "happiness", word: "forsaken", stem: "forsaken", anew: "deserter",
    avg: [ 5.50, 3.54 ], std: [ 2.55, 1.94 ], fq: 50 
  },
  "hospitals": {
    dict: "happiness", word: "hospitals", stem: "hospit", anew: "hospital",
    avg: [ 5.98, 3.54 ], std: [ 2.54, 1.57 ], fq: 50 
  },
  "rough": {
    dict: "happiness", word: "rough", stem: "rough", anew: "rough",
    avg: [ 5.33, 3.54 ], std: [ 2.04, 1.45 ], fq: 50 
  },
  "shock": {
    dict: "happiness", word: "shock", stem: "shock", anew: "outrage",
    avg: [ 6.83, 3.54 ], std: [ 2.26, 1.62 ], fq: 50 
  },
  "slug": {
    dict: "happiness", word: "slug", stem: "slug", anew: "bullet",
    avg: [ 5.33, 3.54 ], std: [ 2.48, 1.37 ], fq: 50 
  },
  "separation": {
    dict: "happiness", word: "separation", stem: "separ", anew: "detached",
    avg: [ 4.26, 3.53 ], std: [ 2.57, 1.82 ], fq: 50 
  },
  "spite": {
    dict: "happiness", word: "spite", stem: "spite", anew: "nasty",
    avg: [ 4.89, 3.53 ], std: [ 2.50, 1.83 ], fq: 50 
  },
  "addicted": {
    dict: "happiness", word: "addicted", stem: "addict", anew: "addicted",
    avg: [ 4.81, 3.52 ], std: [ 2.46, 2.10 ], fq: 50 
  },
  "fallen": {
    dict: "happiness", word: "fallen", stem: "fallen", anew: "fall",
    avg: [ 4.70, 3.52 ], std: [ 2.48, 1.42 ], fq: 50 
  },
  "suspicion": {
    dict: "happiness", word: "suspicion", stem: "suspicion", anew: "suspicious",
    avg: [ 6.25, 3.52 ], std: [ 1.59, 1.50 ], fq: 50 
  },
  "tomb": {
    dict: "happiness", word: "tomb", stem: "tomb", anew: "tomb",
    avg: [ 4.73, 3.52 ], std: [ 2.72, 2.04 ], fq: 50 
  },
  "warned": {
    dict: "happiness", word: "warned", stem: "warn", anew: "discouraged",
    avg: [ 4.53, 3.52 ], std: [ 2.11, 1.31 ], fq: 50 
  },
  "untrue": {
    dict: "happiness", word: "untrue", stem: "untru", anew: "FALSE",
    avg: [ 3.43, 3.51 ], std: [ 2.09, 1.31 ], fq: 50 
  },
  "casket": {
    dict: "happiness", word: "casket", stem: "casket", anew: "coffin",
    avg: [ 5.03, 3.50 ], std: [ 2.79, 2.10 ], fq: 50 
  },
  "dope": {
    dict: "happiness", word: "dope", stem: "dope", anew: "grass",
    avg: [ 4.14, 3.50 ], std: [ 2.11, 1.71 ], fq: 50 
  },
  "hospital": {
    dict: "happiness", word: "hospital", stem: "hospit", anew: "hospital",
    avg: [ 5.98, 3.50 ], std: [ 2.54, 1.62 ], fq: 50 
  },
  "snake": {
    dict: "happiness", word: "snake", stem: "snake", anew: "snake",
    avg: [ 6.82, 3.50 ], std: [ 2.10, 1.67 ], fq: 50 
  },
  "struck": {
    dict: "happiness", word: "struck", stem: "struck", anew: "fall",
    avg: [ 4.70, 3.50 ], std: [ 2.48, 1.40 ], fq: 50 
  },
  "pressures": {
    dict: "happiness", word: "pressures", stem: "pressur", anew: "pressure",
    avg: [ 6.07, 3.49 ], std: [ 2.26, 1.76 ], fq: 50 
  },
  "sucked": {
    dict: "happiness", word: "sucked", stem: "suck", anew: "nurse",
    avg: [ 4.84, 3.48 ], std: [ 2.04, 1.85 ], fq: 50 
  },
  "tobacco": {
    dict: "happiness", word: "tobacco", stem: "tobacco", anew: "tobacco",
    avg: [ 4.83, 3.48 ], std: [ 2.90, 2.18 ], fq: 50 
  },
  "screams": {
    dict: "happiness", word: "screams", stem: "scream", anew: "scream",
    avg: [ 7.04, 3.48 ], std: [ 1.96, 2.04 ], fq: 50 
  },
  "deceive": {
    dict: "happiness", word: "deceive", stem: "deceiv", anew: "betray",
    avg: [ 7.24, 3.47 ], std: [ 2.06, 2.01 ], fq: 50 
  },
  "monsters": {
    dict: "happiness", word: "monsters", stem: "monster", anew: "devil",
    avg: [ 6.07, 3.47 ], std: [ 2.61, 1.68 ], fq: 50 
  },
  "urine": {
    dict: "happiness", word: "urine", stem: "urin", anew: "urine",
    avg: [ 4.20, 3.47 ], std: [ 2.18, 1.67 ], fq: 50 
  },
  "chaos": {
    dict: "happiness", word: "chaos", stem: "chao", anew: "chaos",
    avg: [ 6.67, 3.46 ], std: [ 2.06, 1.79 ], fq: 50 
  },
  "insanity": {
    dict: "happiness", word: "insanity", stem: "insan", anew: "insane",
    avg: [ 5.83, 3.46 ], std: [ 2.45, 2.18 ], fq: 50 
  },
  "isolated": {
    dict: "happiness", word: "isolated", stem: "isol", anew: "detached",
    avg: [ 4.26, 3.46 ], std: [ 2.57, 1.82 ], fq: 50 
  },
  "monster": {
    dict: "happiness", word: "monster", stem: "monster", anew: "devil",
    avg: [ 6.07, 3.46 ], std: [ 2.61, 1.92 ], fq: 50 
  },
  "refuse": {
    dict: "happiness", word: "refuse", stem: "refus", anew: "garbage",
    avg: [ 5.04, 3.46 ], std: [ 2.50, 0.93 ], fq: 50 
  },
  "shoot": {
    dict: "happiness", word: "shoot", stem: "shoot", anew: "hit",
    avg: [ 5.73, 3.46 ], std: [ 2.09, 1.67 ], fq: 50 
  },
  "sting": {
    dict: "happiness", word: "sting", stem: "sting", anew: "prick",
    avg: [ 4.70, 3.46 ], std: [ 2.59, 1.74 ], fq: 50 
  },
  "thorn": {
    dict: "happiness", word: "thorn", stem: "thorn", anew: "thorn",
    avg: [ 5.14, 3.46 ], std: [ 2.14, 1.57 ], fq: 50 
  },
  "wreck": {
    dict: "happiness", word: "wreck", stem: "wreck", anew: "crash",
    avg: [ 6.95, 3.46 ], std: [ 2.44, 1.80 ], fq: 50 
  },
  "fright": {
    dict: "happiness", word: "fright", stem: "fright", anew: "fearful",
    avg: [ 6.33, 3.45 ], std: [ 2.28, 1.84 ], fq: 50 
  },
  "radiation": {
    dict: "happiness", word: "radiation", stem: "radiat", anew: "radiator",
    avg: [ 4.02, 3.45 ], std: [ 1.94, 2.28 ], fq: 50 
  },
  "stab": {
    dict: "happiness", word: "stab", stem: "stab", anew: "knife",
    avg: [ 5.80, 3.45 ], std: [ 2.00, 2.13 ], fq: 50 
  },
  "confined": {
    dict: "happiness", word: "confined", stem: "confin", anew: "jail",
    avg: [ 5.49, 3.44 ], std: [ 2.67, 1.74 ], fq: 50 
  },
  "delays": {
    dict: "happiness", word: "delays", stem: "delay", anew: "delayed",
    avg: [ 5.62, 3.44 ], std: [ 2.39, 1.15 ], fq: 50 
  },
  "fault": {
    dict: "happiness", word: "fault", stem: "fault", anew: "fault",
    avg: [ 4.07, 3.44 ], std: [ 1.69, 1.30 ], fq: 50 
  },
  "poop": {
    dict: "happiness", word: "poop", stem: "poop", anew: "dirt",
    avg: [ 3.76, 3.44 ], std: [ 2.26, 1.72 ], fq: 50 
  },
  "seized": {
    dict: "happiness", word: "seized", stem: "seiz", anew: "arrogant",
    avg: [ 5.65, 3.44 ], std: [ 2.23, 1.46 ], fq: 50 
  },
  "diss": {
    dict: "happiness", word: "diss", stem: "diss", anew: "insult",
    avg: [ 6.00, 3.43 ], std: [ 2.46, 1.88 ], fq: 50 
  },
  "smashed": {
    dict: "happiness", word: "smashed", stem: "smash", anew: "bankrupt",
    avg: [ 6.21, 3.42 ], std: [ 2.79, 1.74 ], fq: 50 
  },
  "cut": {
    dict: "happiness", word: "cut", stem: "cut", anew: "cut",
    avg: [ 5.00, 3.42 ], std: [ 2.32, 1.29 ], fq: 50 
  },
  "gone": {
    dict: "happiness", word: "gone", stem: "gone", anew: "travel",
    avg: [ 6.21, 3.42 ], std: [ 2.51, 1.74 ], fq: 50 
  },
  "ignorant": {
    dict: "happiness", word: "ignorant", stem: "ignor", anew: "ignorance",
    avg: [ 4.39, 3.42 ], std: [ 2.49, 1.87 ], fq: 50 
  },
  "lame": {
    dict: "happiness", word: "lame", stem: "lame", anew: "square",
    avg: [ 3.18, 3.42 ], std: [ 1.76, 1.43 ], fq: 50 
  },
  "obsessed": {
    dict: "happiness", word: "obsessed", stem: "obsess", anew: "obsession",
    avg: [ 6.41, 3.42 ], std: [ 2.13, 1.47 ], fq: 50 
  },
  "raging": {
    dict: "happiness", word: "raging", stem: "rage", anew: "rage",
    avg: [ 8.17, 3.42 ], std: [ 1.40, 1.64 ], fq: 50 
  },
  "shouting": {
    dict: "happiness", word: "shouting", stem: "shout", anew: "cheer",
    avg: [ 6.12, 3.42 ], std: [ 2.45, 1.60 ], fq: 50 
  },
  "troubles": {
    dict: "happiness", word: "troubles", stem: "troubl", anew: "troubled",
    avg: [ 5.94, 3.42 ], std: [ 2.36, 2.15 ], fq: 50 
  },
  "disturbed": {
    dict: "happiness", word: "disturbed", stem: "disturb", anew: "disturb",
    avg: [ 5.80, 3.41 ], std: [ 2.39, 1.59 ], fq: 50 
  },
  "separated": {
    dict: "happiness", word: "separated", stem: "separ", anew: "fork",
    avg: [ 3.96, 3.40 ], std: [ 1.94, 1.32 ], fq: 50 
  },
  "struggle": {
    dict: "happiness", word: "struggle", stem: "struggl", anew: "fight",
    avg: [ 7.15, 3.40 ], std: [ 2.19, 1.75 ], fq: 50 
  },
  "whores": {
    dict: "happiness", word: "whores", stem: "whore", anew: "whore",
    avg: [ 5.85, 3.40 ], std: [ 2.93, 2.29 ], fq: 50 
  },
  "deception": {
    dict: "happiness", word: "deception", stem: "decept", anew: "magical",
    avg: [ 5.95, 3.39 ], std: [ 2.36, 1.80 ], fq: 50 
  },
  "stain": {
    dict: "happiness", word: "stain", stem: "stain", anew: "filth",
    avg: [ 5.12, 3.39 ], std: [ 2.32, 1.34 ], fq: 50 
  },
  "delay": {
    dict: "happiness", word: "delay", stem: "delay", anew: "delayed",
    avg: [ 5.62, 3.38 ], std: [ 2.39, 1.32 ], fq: 50 
  },
  "difficulty": {
    dict: "happiness", word: "difficulty", stem: "difficulti", anew: "troubled",
    avg: [ 5.94, 3.38 ], std: [ 2.36, 1.23 ], fq: 50 
  },
  "eliminated": {
    dict: "happiness", word: "eliminated", stem: "elimin", anew: "rejected",
    avg: [ 6.37, 3.38 ], std: [ 2.56, 1.69 ], fq: 50 
  },
  "haunting": {
    dict: "happiness", word: "haunting", stem: "haunt", anew: "obsession",
    avg: [ 6.41, 3.38 ], std: [ 2.13, 1.74 ], fq: 50 
  },
  "hungry": {
    dict: "happiness", word: "hungry", stem: "hungri", anew: "hungry",
    avg: [ 5.13, 3.38 ], std: [ 2.44, 1.93 ], fq: 50 
  },
  "refused": {
    dict: "happiness", word: "refused", stem: "refus", anew: "rejected",
    avg: [ 6.37, 3.38 ], std: [ 2.56, 1.46 ], fq: 50 
  },
  "wicked": {
    dict: "happiness", word: "wicked", stem: "wick", anew: "wicked",
    avg: [ 6.09, 3.38 ], std: [ 2.44, 1.95 ], fq: 50 
  },
  "blinded": {
    dict: "happiness", word: "blinded", stem: "blind", anew: "blind",
    avg: [ 4.39, 3.37 ], std: [ 2.36, 1.58 ], fq: 50 
  },
  "hunger": {
    dict: "happiness", word: "hunger", stem: "hunger", anew: "lust",
    avg: [ 6.88, 3.37 ], std: [ 1.85, 2.00 ], fq: 50 
  },
  "torn": {
    dict: "happiness", word: "torn", stem: "torn", anew: "mangle",
    avg: [ 5.44, 3.37 ], std: [ 2.10, 1.47 ], fq: 50 
  },
  "phony": {
    dict: "happiness", word: "phony", stem: "phoni", anew: "bastard",
    avg: [ 6.07, 3.36 ], std: [ 2.15, 1.91 ], fq: 50 
  },
  "beast": {
    dict: "happiness", word: "beast", stem: "beast", anew: "beast",
    avg: [ 5.57, 3.36 ], std: [ 2.61, 1.52 ], fq: 50 
  },
  "bullet": {
    dict: "happiness", word: "bullet", stem: "bullet", anew: "bullet",
    avg: [ 5.33, 3.36 ], std: [ 2.48, 1.80 ], fq: 50 
  },
  "busted": {
    dict: "happiness", word: "busted", stem: "bust", anew: "broken",
    avg: [ 5.43, 3.36 ], std: [ 2.42, 1.31 ], fq: 50 
  },
  "dentist": {
    dict: "happiness", word: "dentist", stem: "dentist", anew: "dentist",
    avg: [ 5.73, 3.36 ], std: [ 2.13, 1.69 ], fq: 50 
  },
  "tornado": {
    dict: "happiness", word: "tornado", stem: "tornado", anew: "tornado",
    avg: [ 6.83, 3.36 ], std: [ 2.49, 1.83 ], fq: 50 
  },
  "weapon": {
    dict: "happiness", word: "weapon", stem: "weapon", anew: "weapon",
    avg: [ 6.03, 3.36 ], std: [ 1.89, 1.66 ], fq: 50 
  },
  "emptiness": {
    dict: "happiness", word: "emptiness", stem: "empti", anew: "vanity",
    avg: [ 4.98, 3.35 ], std: [ 2.31, 1.97 ], fq: 50 
  },
  "burnt": {
    dict: "happiness", word: "burnt", stem: "burnt", anew: "cut",
    avg: [ 5.00, 3.34 ], std: [ 2.32, 1.93 ], fq: 50 
  },
  "crap": {
    dict: "happiness", word: "crap", stem: "crap", anew: "dirt",
    avg: [ 3.76, 3.34 ], std: [ 2.26, 1.65 ], fq: 50 
  },
  "tired": {
    dict: "happiness", word: "tired", stem: "tire", anew: "fatigued",
    avg: [ 2.64, 3.34 ], std: [ 2.19, 1.12 ], fq: 50 
  },
  "warning": {
    dict: "happiness", word: "warning", stem: "warn", anew: "discouraged",
    avg: [ 4.53, 3.34 ], std: [ 2.11, 1.42 ], fq: 50 
  },
  "alone": {
    dict: "happiness", word: "alone", stem: "alon", anew: "alone",
    avg: [ 4.83, 3.32 ], std: [ 2.66, 1.73 ], fq: 50 
  },
  "confusion": {
    dict: "happiness", word: "confusion", stem: "confus", anew: "confused",
    avg: [ 6.03, 3.32 ], std: [ 1.88, 1.36 ], fq: 50 
  },
  "ignored": {
    dict: "happiness", word: "ignored", stem: "ignor", anew: "ignorance",
    avg: [ 4.39, 3.32 ], std: [ 2.49, 1.50 ], fq: 50 
  },
  "noose": {
    dict: "happiness", word: "noose", stem: "noos", anew: "noose",
    avg: [ 4.39, 3.32 ], std: [ 2.08, 2.22 ], fq: 50 
  },
  "opposed": {
    dict: "happiness", word: "opposed", stem: "oppos", anew: "fight",
    avg: [ 7.15, 3.32 ], std: [ 2.19, 1.41 ], fq: 50 
  },
  "scars": {
    dict: "happiness", word: "scars", stem: "scar", anew: "scar",
    avg: [ 4.79, 3.32 ], std: [ 2.11, 1.73 ], fq: 50 
  },
  "savage": {
    dict: "happiness", word: "savage", stem: "savag", anew: "crucify",
    avg: [ 6.47, 3.31 ], std: [ 2.47, 1.95 ], fq: 50 
  },
  "choke": {
    dict: "happiness", word: "choke", stem: "choke", anew: "foul",
    avg: [ 4.93, 3.31 ], std: [ 2.23, 1.69 ], fq: 50 
  },
  "fury": {
    dict: "happiness", word: "fury", stem: "furi", anew: "rage",
    avg: [ 8.17, 3.30 ], std: [ 1.40, 1.78 ], fq: 50 
  },
  "lowest": {
    dict: "happiness", word: "lowest", stem: "lowest", anew: "blue",
    avg: [ 4.31, 3.30 ], std: [ 2.20, 1.17 ], fq: 50 
  },
  "whip": {
    dict: "happiness", word: "whip", stem: "whip", anew: "blister",
    avg: [ 4.10, 3.30 ], std: [ 2.34, 1.74 ], fq: 50 
  },
  "helpless": {
    dict: "happiness", word: "helpless", stem: "helpless", anew: "helpless",
    avg: [ 5.34, 3.29 ], std: [ 2.52, 2.02 ], fq: 50 
  },
  "rats": {
    dict: "happiness", word: "rats", stem: "rat", anew: "rat",
    avg: [ 4.95, 3.29 ], std: [ 2.36, 1.89 ], fq: 50 
  },
  "crashing": {
    dict: "happiness", word: "crashing", stem: "crash", anew: "crash",
    avg: [ 6.95, 3.28 ], std: [ 2.44, 1.88 ], fq: 50 
  },
  "falling": {
    dict: "happiness", word: "falling", stem: "fall", anew: "fall",
    avg: [ 4.70, 3.28 ], std: [ 2.48, 1.54 ], fq: 50 
  },
  "lazy": {
    dict: "happiness", word: "lazy", stem: "lazi", anew: "lazy",
    avg: [ 2.65, 3.28 ], std: [ 2.06, 1.46 ], fq: 50 
  },
  "scar": {
    dict: "happiness", word: "scar", stem: "scar", anew: "scar",
    avg: [ 4.79, 3.28 ], std: [ 2.11, 1.46 ], fq: 50 
  },
  "suspicious": {
    dict: "happiness", word: "suspicious", stem: "suspici", anew: "suspicious",
    avg: [ 6.25, 3.28 ], std: [ 1.59, 1.37 ], fq: 50 
  },
  "scarred": {
    dict: "happiness", word: "scarred", stem: "scar", anew: "scar",
    avg: [ 4.79, 3.27 ], std: [ 2.11, 2.03 ], fq: 50 
  },
  "screamed": {
    dict: "happiness", word: "screamed", stem: "scream", anew: "scream",
    avg: [ 7.04, 3.27 ], std: [ 1.96, 1.64 ], fq: 50 
  },
  "damned": {
    dict: "happiness", word: "damned", stem: "damn", anew: "bless",
    avg: [ 4.05, 3.26 ], std: [ 2.59, 1.97 ], fq: 50 
  },
  "delayed": {
    dict: "happiness", word: "delayed", stem: "delay", anew: "delayed",
    avg: [ 5.62, 3.24 ], std: [ 2.39, 1.19 ], fq: 50 
  },
  "dull": {
    dict: "happiness", word: "dull", stem: "dull", anew: "bored",
    avg: [ 2.83, 3.24 ], std: [ 2.31, 1.22 ], fq: 50 
  },
  "fat": {
    dict: "happiness", word: "fat", stem: "fat", anew: "fat",
    avg: [ 4.81, 3.24 ], std: [ 2.80, 1.82 ], fq: 50 
  },
  "rot": {
    dict: "happiness", word: "rot", stem: "rot", anew: "waste",
    avg: [ 4.14, 3.24 ], std: [ 2.30, 1.61 ], fq: 50 
  },
  "screwed": {
    dict: "happiness", word: "screwed", stem: "screw", anew: "loved",
    avg: [ 6.38, 3.24 ], std: [ 2.68, 1.61 ], fq: 50 
  },
  "captured": {
    dict: "happiness", word: "captured", stem: "captur", anew: "fascinate",
    avg: [ 5.83, 3.22 ], std: [ 2.73, 1.61 ], fq: 50 
  },
  "fell": {
    dict: "happiness", word: "fell", stem: "fell", anew: "hide",
    avg: [ 5.28, 3.22 ], std: [ 2.51, 1.47 ], fq: 50 
  },
  "ignore": {
    dict: "happiness", word: "ignore", stem: "ignor", anew: "ignorance",
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50 
  },
  "losers": {
    dict: "happiness", word: "losers", stem: "loser", anew: "loser",
    avg: [ 4.95, 3.22 ], std: [ 2.57, 1.88 ], fq: 50 
  },
  "wasting": {
    dict: "happiness", word: "wasting", stem: "wast", anew: "waste",
    avg: [ 4.14, 3.22 ], std: [ 2.30, 1.42 ], fq: 50 
  },
  "defect": {
    dict: "happiness", word: "defect", stem: "defect", anew: "fault",
    avg: [ 4.07, 3.21 ], std: [ 1.69, 1.70 ], fq: 50 
  },
  "frightened": {
    dict: "happiness", word: "frightened", stem: "frighten", anew: "terrified",
    avg: [ 7.86, 3.20 ], std: [ 2.27, 1.86 ], fq: 50 
  },
  "combat": {
    dict: "happiness", word: "combat", stem: "combat", anew: "fight",
    avg: [ 7.15, 3.20 ], std: [ 2.19, 1.68 ], fq: 50 
  },
  "defeat": {
    dict: "happiness", word: "defeat", stem: "defeat", anew: "defeated",
    avg: [ 5.09, 3.20 ], std: [ 3.00, 1.95 ], fq: 50 
  },
  "dirty": {
    dict: "happiness", word: "dirty", stem: "dirti", anew: "dirty",
    avg: [ 4.88, 3.20 ], std: [ 2.29, 1.51 ], fq: 50 
  },
  "dread": {
    dict: "happiness", word: "dread", stem: "dread", anew: "dreadful",
    avg: [ 5.84, 3.20 ], std: [ 2.62, 1.95 ], fq: 50 
  },
  "inferior": {
    dict: "happiness", word: "inferior", stem: "inferior", anew: "inferior",
    avg: [ 3.83, 3.20 ], std: [ 2.05, 1.47 ], fq: 50 
  },
  "aching": {
    dict: "happiness", word: "aching", stem: "ach", anew: "ache",
    avg: [ 5.00, 3.18 ], std: [ 2.45, 1.49 ], fq: 50 
  },
  "difficult": {
    dict: "happiness", word: "difficult", stem: "difficult", anew: "hard",
    avg: [ 5.12, 3.18 ], std: [ 2.19, 0.90 ], fq: 50 
  },
  "faggot": {
    dict: "happiness", word: "faggot", stem: "faggot", anew: "queen",
    avg: [ 4.76, 3.18 ], std: [ 2.18, 1.98 ], fq: 50 
  },
  "false": {
    dict: "happiness", word: "false", stem: "fals", anew: "FALSE",
    avg: [ 3.43, 3.18 ], std: [ 2.09, 1.35 ], fq: 50 
  },
  "garbage": {
    dict: "happiness", word: "garbage", stem: "garbag", anew: "garbage",
    avg: [ 5.04, 3.18 ], std: [ 2.50, 1.62 ], fq: 50 
  },
  "kicked": {
    dict: "happiness", word: "kicked", stem: "kick", anew: "kick",
    avg: [ 4.90, 3.18 ], std: [ 2.35, 1.40 ], fq: 50 
  },
  "scandal": {
    dict: "happiness", word: "scandal", stem: "scandal", anew: "scandal",
    avg: [ 5.12, 3.18 ], std: [ 2.22, 1.56 ], fq: 50 
  },
  "complain": {
    dict: "happiness", word: "complain", stem: "complain", anew: "plain",
    avg: [ 3.52, 3.16 ], std: [ 2.05, 1.56 ], fq: 50 
  },
  "declined": {
    dict: "happiness", word: "declined", stem: "declin", anew: "rejected",
    avg: [ 6.37, 3.16 ], std: [ 2.56, 1.54 ], fq: 50 
  },
  "disorders": {
    dict: "happiness", word: "disorders", stem: "disord", anew: "upset",
    avg: [ 5.86, 3.16 ], std: [ 2.40, 1.43 ], fq: 50 
  },
  "forced": {
    dict: "happiness", word: "forced", stem: "forc", anew: "pressure",
    avg: [ 6.07, 3.16 ], std: [ 2.26, 1.27 ], fq: 50 
  },
  "severe": {
    dict: "happiness", word: "severe", stem: "sever", anew: "severe",
    avg: [ 5.26, 3.16 ], std: [ 2.36, 1.72 ], fq: 50 
  },
  "smoke": {
    dict: "happiness", word: "smoke", stem: "smoke", anew: "bullet",
    avg: [ 5.33, 3.16 ], std: [ 2.48, 1.94 ], fq: 50 
  },
  "feared": {
    dict: "happiness", word: "feared", stem: "fear", anew: "fearful",
    avg: [ 6.33, 3.14 ], std: [ 2.28, 1.93 ], fq: 50 
  },
  "argument": {
    dict: "happiness", word: "argument", stem: "argument", anew: "contents",
    avg: [ 4.32, 3.14 ], std: [ 2.14, 1.55 ], fq: 50 
  },
  "bitch": {
    dict: "happiness", word: "bitch", stem: "bitch", anew: "gripe",
    avg: [ 5.00, 3.14 ], std: [ 2.19, 1.81 ], fq: 50 
  },
  "bruise": {
    dict: "happiness", word: "bruise", stem: "bruis", anew: "wounds",
    avg: [ 5.82, 3.14 ], std: [ 2.01, 1.21 ], fq: 50 
  },
  "dismissed": {
    dict: "happiness", word: "dismissed", stem: "dismiss", anew: "fire",
    avg: [ 7.17, 3.14 ], std: [ 2.06, 1.11 ], fq: 50 
  },
  "disorder": {
    dict: "happiness", word: "disorder", stem: "disord", anew: "upset",
    avg: [ 5.86, 3.14 ], std: [ 2.40, 1.40 ], fq: 50 
  },
  "exhausted": {
    dict: "happiness", word: "exhausted", stem: "exhaust", anew: "fatigued",
    avg: [ 2.64, 3.14 ], std: [ 2.19, 1.71 ], fq: 50 
  },
  "incorrectly": {
    dict: "happiness", word: "incorrectly", stem: "incorrectli", anew: "FALSE",
    avg: [ 3.43, 3.14 ], std: [ 2.09, 1.03 ], fq: 50 
  },
  "scream": {
    dict: "happiness", word: "scream", stem: "scream", anew: "scream",
    avg: [ 7.04, 3.14 ], std: [ 1.96, 1.41 ], fq: 50 
  },
  "slapped": {
    dict: "happiness", word: "slapped", stem: "slap", anew: "slap",
    avg: [ 6.46, 3.14 ], std: [ 2.58, 1.55 ], fq: 50 
  },
  "suck": {
    dict: "happiness", word: "suck", stem: "suck", anew: "nurse",
    avg: [ 4.84, 3.14 ], std: [ 2.04, 1.82 ], fq: 50 
  },
  "sucks": {
    dict: "happiness", word: "sucks", stem: "suck", anew: "nurse",
    avg: [ 4.84, 3.14 ], std: [ 2.04, 1.48 ], fq: 50 
  },
  "suspect": {
    dict: "happiness", word: "suspect", stem: "suspect", anew: "suspicious",
    avg: [ 6.25, 3.14 ], std: [ 1.59, 1.31 ], fq: 50 
  },
  "whore": {
    dict: "happiness", word: "whore", stem: "whore", anew: "whore",
    avg: [ 5.85, 3.14 ], std: [ 2.93, 2.11 ], fq: 50 
  },
  "wrong": {
    dict: "happiness", word: "wrong", stem: "wrong", anew: "damage",
    avg: [ 5.57, 3.14 ], std: [ 2.26, 0.97 ], fq: 50 
  },
  "desperate": {
    dict: "happiness", word: "desperate", stem: "desper", anew: "despairing",
    avg: [ 5.68, 3.12 ], std: [ 2.37, 1.62 ], fq: 50 
  },
  "lonesome": {
    dict: "happiness", word: "lonesome", stem: "lonesom", anew: "lonely",
    avg: [ 4.51, 3.12 ], std: [ 2.68, 1.62 ], fq: 50 
  },
  "regret": {
    dict: "happiness", word: "regret", stem: "regret", anew: "regretful",
    avg: [ 5.74, 3.12 ], std: [ 2.32, 1.51 ], fq: 50 
  },
  "defects": {
    dict: "happiness", word: "defects", stem: "defect", anew: "fault",
    avg: [ 4.07, 3.10 ], std: [ 1.69, 1.56 ], fq: 50 
  },
  "ambulance": {
    dict: "happiness", word: "ambulance", stem: "ambul", anew: "ambulance",
    avg: [ 7.33, 3.10 ], std: [ 1.96, 1.61 ], fq: 50 
  },
  "annoy": {
    dict: "happiness", word: "annoy", stem: "annoy", anew: "annoy",
    avg: [ 6.49, 3.10 ], std: [ 2.17, 1.39 ], fq: 50 
  },
  "conflict": {
    dict: "happiness", word: "conflict", stem: "conflict", anew: "engaged",
    avg: [ 6.77, 3.10 ], std: [ 2.07, 1.53 ], fq: 50 
  },
  "execution": {
    dict: "happiness", word: "execution", stem: "execut", anew: "execution",
    avg: [ 5.71, 3.10 ], std: [ 2.74, 2.39 ], fq: 50 
  },
  "fought": {
    dict: "happiness", word: "fought", stem: "fought", anew: "fight",
    avg: [ 7.15, 3.10 ], std: [ 2.19, 1.39 ], fq: 50 
  },
  "pity": {
    dict: "happiness", word: "pity", stem: "piti", anew: "pity",
    avg: [ 3.72, 3.10 ], std: [ 2.02, 1.31 ], fq: 50 
  },
  "stink": {
    dict: "happiness", word: "stink", stem: "stink", anew: "stink",
    avg: [ 4.26, 3.10 ], std: [ 2.10, 1.22 ], fq: 50 
  },
  "decay": {
    dict: "happiness", word: "decay", stem: "decay", anew: "decompose",
    avg: [ 4.65, 3.08 ], std: [ 2.39, 1.41 ], fq: 50 
  },
  "decline": {
    dict: "happiness", word: "decline", stem: "declin", anew: "rejected",
    avg: [ 6.37, 3.08 ], std: [ 2.56, 1.23 ], fq: 50 
  },
  "difficulties": {
    dict: "happiness", word: "difficulties", stem: "difficulti", anew: "troubled",
    avg: [ 5.94, 3.08 ], std: [ 2.36, 1.28 ], fq: 50 
  },
  "graves": {
    dict: "happiness", word: "graves", stem: "grave", anew: "tomb",
    avg: [ 4.73, 3.08 ], std: [ 2.72, 1.85 ], fq: 50 
  },
  "regrets": {
    dict: "happiness", word: "regrets", stem: "regret", anew: "regretful",
    avg: [ 5.74, 3.08 ], std: [ 2.32, 1.52 ], fq: 50 
  },
  "trapped": {
    dict: "happiness", word: "trapped", stem: "trap", anew: "corner",
    avg: [ 3.91, 3.08 ], std: [ 1.92, 1.52 ], fq: 50 
  },
  "yelling": {
    dict: "happiness", word: "yelling", stem: "yell", anew: "scream",
    avg: [ 7.04, 3.08 ], std: [ 1.96, 1.56 ], fq: 50 
  },
  "arguing": {
    dict: "happiness", word: "arguing", stem: "argu", anew: "contents",
    avg: [ 4.32, 3.06 ], std: [ 2.14, 1.36 ], fq: 50 
  },
  "bullets": {
    dict: "happiness", word: "bullets", stem: "bullet", anew: "bullet",
    avg: [ 5.33, 3.06 ], std: [ 2.48, 1.96 ], fq: 50 
  },
  "dumb": {
    dict: "happiness", word: "dumb", stem: "dumb", anew: "slow",
    avg: [ 3.39, 3.06 ], std: [ 2.22, 0.96 ], fq: 50 
  },
  "emergency": {
    dict: "happiness", word: "emergency", stem: "emerg", anew: "pinch",
    avg: [ 4.59, 3.06 ], std: [ 2.10, 1.78 ], fq: 50 
  },
  "greed": {
    dict: "happiness", word: "greed", stem: "greed", anew: "greed",
    avg: [ 4.71, 3.06 ], std: [ 2.26, 1.92 ], fq: 50 
  },
  "idiot": {
    dict: "happiness", word: "idiot", stem: "idiot", anew: "idiot",
    avg: [ 4.21, 3.06 ], std: [ 2.47, 1.53 ], fq: 50 
  },
  "idiots": {
    dict: "happiness", word: "idiots", stem: "idiot", anew: "idiot",
    avg: [ 4.21, 3.06 ], std: [ 2.47, 1.61 ], fq: 50 
  },
  "turmoil": {
    dict: "happiness", word: "turmoil", stem: "turmoil", anew: "excitement",
    avg: [ 7.67, 3.06 ], std: [ 1.91, 1.63 ], fq: 50 
  },
  "rotting": {
    dict: "happiness", word: "rotting", stem: "rot", anew: "waste",
    avg: [ 4.14, 3.04 ], std: [ 2.30, 1.53 ], fq: 50 
  },
  "arguments": {
    dict: "happiness", word: "arguments", stem: "argument", anew: "contents",
    avg: [ 4.32, 3.04 ], std: [ 2.14, 1.52 ], fq: 50 
  },
  "bored": {
    dict: "happiness", word: "bored", stem: "bore", anew: "bored",
    avg: [ 2.83, 3.04 ], std: [ 2.31, 1.19 ], fq: 50 
  },
  "complaints": {
    dict: "happiness", word: "complaints", stem: "complaint", anew: "illness",
    avg: [ 4.71, 3.04 ], std: [ 2.24, 1.32 ], fq: 50 
  },
  "horror": {
    dict: "happiness", word: "horror", stem: "horror", anew: "horror",
    avg: [ 7.21, 3.04 ], std: [ 2.14, 2.00 ], fq: 50 
  },
  "insane": {
    dict: "happiness", word: "insane", stem: "insan", anew: "insane",
    avg: [ 5.83, 3.04 ], std: [ 2.45, 1.73 ], fq: 50 
  },
  "jealousy": {
    dict: "happiness", word: "jealousy", stem: "jealousi", anew: "jealousy",
    avg: [ 6.36, 3.04 ], std: [ 2.66, 1.55 ], fq: 50 
  },
  "lawsuits": {
    dict: "happiness", word: "lawsuits", stem: "lawsuit", anew: "lawsuit",
    avg: [ 4.93, 3.04 ], std: [ 2.44, 1.70 ], fq: 50 
  },
  "rat": {
    dict: "happiness", word: "rat", stem: "rat", anew: "rat",
    avg: [ 4.95, 3.04 ], std: [ 2.36, 1.86 ], fq: 50 
  },
  "scare": {
    dict: "happiness", word: "scare", stem: "scare", anew: "scared",
    avg: [ 6.82, 3.04 ], std: [ 2.03, 1.56 ], fq: 50 
  },
  "anxiety": {
    dict: "happiness", word: "anxiety", stem: "anxieti", anew: "anxious",
    avg: [ 6.92, 3.03 ], std: [ 1.81, 1.89 ], fq: 50 
  },
  "fiend": {
    dict: "happiness", word: "fiend", stem: "fiend", anew: "devil",
    avg: [ 6.07, 3.02 ], std: [ 2.61, 1.55 ], fq: 50 
  },
  "hostile": {
    dict: "happiness", word: "hostile", stem: "hostil", anew: "hostile",
    avg: [ 6.44, 3.02 ], std: [ 2.28, 1.97 ], fq: 50 
  },
  "broken": {
    dict: "happiness", word: "broken", stem: "broken", anew: "broken",
    avg: [ 5.43, 3.02 ], std: [ 2.42, 1.41 ], fq: 50 
  },
  "bitter": {
    dict: "happiness", word: "bitter", stem: "bitter", anew: "blister",
    avg: [ 4.10, 3.00 ], std: [ 2.34, 1.25 ], fq: 50 
  },
  "fights": {
    dict: "happiness", word: "fights", stem: "fight", anew: "fight",
    avg: [ 7.15, 3.00 ], std: [ 2.19, 1.37 ], fq: 50 
  },
  "vicious": {
    dict: "happiness", word: "vicious", stem: "viciou", anew: "evil",
    avg: [ 6.39, 3.00 ], std: [ 2.44, 1.93 ], fq: 50 
  },
  "battle": {
    dict: "happiness", word: "battle", stem: "battl", anew: "engaged",
    avg: [ 6.77, 2.98 ], std: [ 2.07, 1.73 ], fq: 50 
  },
  "confused": {
    dict: "happiness", word: "confused", stem: "confus", anew: "confused",
    avg: [ 6.03, 2.98 ], std: [ 1.88, 1.29 ], fq: 50 
  },
  "crappy": {
    dict: "happiness", word: "crappy", stem: "crappi", anew: "stink",
    avg: [ 4.26, 2.98 ], std: [ 2.10, 1.66 ], fq: 50 
  },
  "damn": {
    dict: "happiness", word: "damn", stem: "damn", anew: "bloody",
    avg: [ 6.41, 2.98 ], std: [ 2.00, 1.62 ], fq: 50 
  },
  "guns": {
    dict: "happiness", word: "guns", stem: "gun", anew: "gun",
    avg: [ 7.02, 2.98 ], std: [ 1.84, 2.02 ], fq: 50 
  },
  "ignorance": {
    dict: "happiness", word: "ignorance", stem: "ignor", anew: "ignorance",
    avg: [ 4.39, 2.98 ], std: [ 2.49, 1.36 ], fq: 50 
  },
  "missing": {
    dict: "happiness", word: "missing", stem: "miss", anew: "neglect",
    avg: [ 4.83, 2.98 ], std: [ 2.31, 1.38 ], fq: 50 
  },
  "problem": {
    dict: "happiness", word: "problem", stem: "problem", anew: "troubled",
    avg: [ 5.94, 2.98 ], std: [ 2.36, 1.41 ], fq: 50 
  },
  "worthless": {
    dict: "happiness", word: "worthless", stem: "worthless", anew: "ugly",
    avg: [ 5.38, 2.98 ], std: [ 2.23, 1.91 ], fq: 50 
  },
  "insecure": {
    dict: "happiness", word: "insecure", stem: "insecur", anew: "insecure",
    avg: [ 5.56, 2.98 ], std: [ 2.34, 1.13 ], fq: 50 
  },
  "coffin": {
    dict: "happiness", word: "coffin", stem: "coffin", anew: "coffin",
    avg: [ 5.03, 2.96 ], std: [ 2.79, 1.99 ], fq: 50 
  },
  "conflicts": {
    dict: "happiness", word: "conflicts", stem: "conflict", anew: "engaged",
    avg: [ 6.77, 2.96 ], std: [ 2.07, 1.46 ], fq: 50 
  },
  "damages": {
    dict: "happiness", word: "damages", stem: "damag", anew: "damage",
    avg: [ 5.57, 2.96 ], std: [ 2.26, 1.37 ], fq: 50 
  },
  "lawsuit": {
    dict: "happiness", word: "lawsuit", stem: "lawsuit", anew: "lawsuit",
    avg: [ 4.93, 2.96 ], std: [ 2.44, 1.62 ], fq: 50 
  },
  "screaming": {
    dict: "happiness", word: "screaming", stem: "scream", anew: "scream",
    avg: [ 7.04, 2.96 ], std: [ 1.96, 1.52 ], fq: 50 
  },
  "wound": {
    dict: "happiness", word: "wound", stem: "wound", anew: "wounds",
    avg: [ 5.82, 2.96 ], std: [ 2.01, 1.68 ], fq: 50 
  },
  "bloody": {
    dict: "happiness", word: "bloody", stem: "bloodi", anew: "bloody",
    avg: [ 6.41, 2.94 ], std: [ 2.00, 1.70 ], fq: 50 
  },
  "cemetery": {
    dict: "happiness", word: "cemetery", stem: "cemeteri", anew: "cemetery",
    avg: [ 4.82, 2.94 ], std: [ 2.66, 1.71 ], fq: 50 
  },
  "choking": {
    dict: "happiness", word: "choking", stem: "choke", anew: "foul",
    avg: [ 4.93, 2.94 ], std: [ 2.23, 1.88 ], fq: 50 
  },
  "foul": {
    dict: "happiness", word: "foul", stem: "foul", anew: "foul",
    avg: [ 4.93, 2.94 ], std: [ 2.23, 1.33 ], fq: 50 
  },
  "sore": {
    dict: "happiness", word: "sore", stem: "sore", anew: "pain",
    avg: [ 6.50, 2.94 ], std: [ 2.49, 1.33 ], fq: 50 
  },
  "tension": {
    dict: "happiness", word: "tension", stem: "tension", anew: "stress",
    avg: [ 7.45, 2.94 ], std: [ 2.38, 1.58 ], fq: 50 
  },
  "thief": {
    dict: "happiness", word: "thief", stem: "thief", anew: "thief",
    avg: [ 6.89, 2.94 ], std: [ 2.13, 2.21 ], fq: 50 
  },
  "weakness": {
    dict: "happiness", word: "weakness", stem: "weak", anew: "helpless",
    avg: [ 5.34, 2.94 ], std: [ 2.52, 1.53 ], fq: 50 
  },
  "accused": {
    dict: "happiness", word: "accused", stem: "accus", anew: "criminal",
    avg: [ 4.79, 2.92 ], std: [ 2.51, 1.55 ], fq: 50 
  },
  "awful": {
    dict: "happiness", word: "awful", stem: "aw", anew: "pain",
    avg: [ 6.50, 2.92 ], std: [ 2.49, 1.94 ], fq: 50 
  },
  "burn": {
    dict: "happiness", word: "burn", stem: "burn", anew: "burn",
    avg: [ 6.22, 2.92 ], std: [ 1.91, 1.34 ], fq: 50 
  },
  "cries": {
    dict: "happiness", word: "cries", stem: "cri", anew: "scream",
    avg: [ 7.04, 2.92 ], std: [ 1.96, 1.59 ], fq: 50 
  },
  "mistakes": {
    dict: "happiness", word: "mistakes", stem: "mistak", anew: "mistake",
    avg: [ 5.18, 2.92 ], std: [ 2.42, 1.45 ], fq: 50 
  },
  "problems": {
    dict: "happiness", word: "problems", stem: "problem", anew: "troubled",
    avg: [ 5.94, 2.92 ], std: [ 2.36, 1.56 ], fq: 50 
  },
  "riot": {
    dict: "happiness", word: "riot", stem: "riot", anew: "riot",
    avg: [ 6.39, 2.92 ], std: [ 2.63, 1.76 ], fq: 50 
  },
  "sleepless": {
    dict: "happiness", word: "sleepless", stem: "sleepless", anew: "watch",
    avg: [ 4.10, 2.92 ], std: [ 2.12, 1.55 ], fq: 50 
  },
  "demon": {
    dict: "happiness", word: "demon", stem: "demon", anew: "demon",
    avg: [ 6.76, 2.92 ], std: [ 2.68, 1.96 ], fq: 50 
  },
  "boring": {
    dict: "happiness", word: "boring", stem: "bore", anew: "bored",
    avg: [ 2.83, 2.90 ], std: [ 2.31, 1.15 ], fq: 50 
  },
  "bruised": {
    dict: "happiness", word: "bruised", stem: "bruis", anew: "wounds",
    avg: [ 5.82, 2.90 ], std: [ 2.01, 1.75 ], fq: 50 
  },
  "burned": {
    dict: "happiness", word: "burned", stem: "burn", anew: "burn",
    avg: [ 6.22, 2.90 ], std: [ 1.91, 1.42 ], fq: 50 
  },
  "collapse": {
    dict: "happiness", word: "collapse", stem: "collaps", anew: "crash",
    avg: [ 6.95, 2.90 ], std: [ 2.44, 1.45 ], fq: 50 
  },
  "complained": {
    dict: "happiness", word: "complained", stem: "complain", anew: "plain",
    avg: [ 3.52, 2.90 ], std: [ 2.05, 0.99 ], fq: 50 
  },
  "debt": {
    dict: "happiness", word: "debt", stem: "debt", anew: "debt",
    avg: [ 5.68, 2.90 ], std: [ 2.74, 1.66 ], fq: 50 
  },
  "fake": {
    dict: "happiness", word: "fake", stem: "fake", anew: "bastard",
    avg: [ 6.07, 2.90 ], std: [ 2.15, 1.25 ], fq: 50 
  },
  "frustrated": {
    dict: "happiness", word: "frustrated", stem: "frustrat", anew: "frustrated",
    avg: [ 5.61, 2.90 ], std: [ 2.76, 1.61 ], fq: 50 
  },
  "deadly": {
    dict: "happiness", word: "deadly", stem: "deadli", anew: "insane",
    avg: [ 5.83, 2.90 ], std: [ 2.45, 1.82 ], fq: 50 
  },
  "disrespect": {
    dict: "happiness", word: "disrespect", stem: "disrespect", anew: "contempt",
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50 
  },
  "drown": {
    dict: "happiness", word: "drown", stem: "drown", anew: "drown",
    avg: [ 6.57, 2.90 ], std: [ 2.33, 2.09 ], fq: 50 
  },
  "badly": {
    dict: "happiness", word: "badly", stem: "badli", anew: "illness",
    avg: [ 4.71, 2.88 ], std: [ 2.24, 1.61 ], fq: 50 
  },
  "burning": {
    dict: "happiness", word: "burning", stem: "burn", anew: "burn",
    avg: [ 6.22, 2.88 ], std: [ 1.91, 1.49 ], fq: 50 
  },
  "threats": {
    dict: "happiness", word: "threats", stem: "threat", anew: "menace",
    avg: [ 5.52, 2.88 ], std: [ 2.45, 1.77 ], fq: 50 
  },
  "sins": {
    dict: "happiness", word: "sins", stem: "sin", anew: "sinful",
    avg: [ 6.29, 2.88 ], std: [ 2.43, 1.32 ], fq: 50 
  },
  "bombs": {
    dict: "happiness", word: "bombs", stem: "bomb", anew: "bomb",
    avg: [ 7.15, 2.86 ], std: [ 2.40, 2.27 ], fq: 50 
  },
  "complaint": {
    dict: "happiness", word: "complaint", stem: "complaint", anew: "illness",
    avg: [ 4.71, 2.86 ], std: [ 2.24, 1.01 ], fq: 50 
  },
  "errors": {
    dict: "happiness", word: "errors", stem: "error", anew: "fault",
    avg: [ 4.07, 2.86 ], std: [ 1.69, 0.97 ], fq: 50 
  },
  "lonely": {
    dict: "happiness", word: "lonely", stem: "lone", anew: "lonely",
    avg: [ 4.51, 2.86 ], std: [ 2.68, 1.51 ], fq: 50 
  },
  "prisoner": {
    dict: "happiness", word: "prisoner", stem: "prison", anew: "prison",
    avg: [ 5.70, 2.86 ], std: [ 2.56, 1.85 ], fq: 50 
  },
  "stress": {
    dict: "happiness", word: "stress", stem: "stress", anew: "stress",
    avg: [ 7.45, 2.86 ], std: [ 2.38, 1.60 ], fq: 50 
  },
  "violations": {
    dict: "happiness", word: "violations", stem: "violat", anew: "assault",
    avg: [ 7.51, 2.86 ], std: [ 2.28, 1.43 ], fq: 50 
  },
  "addict": {
    dict: "happiness", word: "addict", stem: "addict", anew: "addicted",
    avg: [ 4.81, 2.84 ], std: [ 2.46, 1.31 ], fq: 50 
  },
  "devils": {
    dict: "happiness", word: "devils", stem: "devil", anew: "devil",
    avg: [ 6.07, 2.84 ], std: [ 2.61, 1.71 ], fq: 50 
  },
  "dump": {
    dict: "happiness", word: "dump", stem: "dump", anew: "dump",
    avg: [ 4.12, 2.84 ], std: [ 2.36, 1.33 ], fq: 50 
  },
  "infection": {
    dict: "happiness", word: "infection", stem: "infect", anew: "infection",
    avg: [ 5.03, 2.84 ], std: [ 2.77, 1.65 ], fq: 50 
  },
  "neglected": {
    dict: "happiness", word: "neglected", stem: "neglect", anew: "neglect",
    avg: [ 4.83, 2.84 ], std: [ 2.31, 1.75 ], fq: 50 
  },
  "penalty": {
    dict: "happiness", word: "penalty", stem: "penalti", anew: "penalty",
    avg: [ 5.10, 2.84 ], std: [ 2.31, 1.31 ], fq: 50 
  },
  "terrible": {
    dict: "happiness", word: "terrible", stem: "terribl", anew: "terrible",
    avg: [ 6.27, 2.84 ], std: [ 2.44, 1.81 ], fq: 50 
  },
  "weak": {
    dict: "happiness", word: "weak", stem: "weak", anew: "feeble",
    avg: [ 4.10, 2.84 ], std: [ 2.07, 1.25 ], fq: 50 
  },
  "annoying": {
    dict: "happiness", word: "annoying", stem: "annoy", anew: "annoy",
    avg: [ 6.49, 2.82 ], std: [ 2.17, 1.32 ], fq: 50 
  },
  "bills": {
    dict: "happiness", word: "bills", stem: "bill", anew: "poster",
    avg: [ 3.93, 2.82 ], std: [ 2.56, 1.64 ], fq: 50 
  },
  "blame": {
    dict: "happiness", word: "blame", stem: "blame", anew: "bless",
    avg: [ 4.05, 2.82 ], std: [ 2.59, 1.53 ], fq: 50 
  },
  "burden": {
    dict: "happiness", word: "burden", stem: "burden", anew: "burdened",
    avg: [ 5.63, 2.82 ], std: [ 2.07, 1.53 ], fq: 50 
  },
  "complaining": {
    dict: "happiness", word: "complaining", stem: "complain", anew: "plain",
    avg: [ 3.52, 2.82 ], std: [ 2.05, 1.14 ], fq: 50 
  },
  "danger": {
    dict: "happiness", word: "danger", stem: "danger", anew: "danger",
    avg: [ 7.32, 2.82 ], std: [ 2.07, 1.64 ], fq: 50 
  },
  "demise": {
    dict: "happiness", word: "demise", stem: "demis", anew: "death",
    avg: [ 4.59, 2.82 ], std: [ 3.07, 1.73 ], fq: 50 
  },
  "despair": {
    dict: "happiness", word: "despair", stem: "despair", anew: "despairing",
    avg: [ 5.68, 2.82 ], std: [ 2.37, 2.01 ], fq: 50 
  },
  "disabled": {
    dict: "happiness", word: "disabled", stem: "disabl", anew: "handicap",
    avg: [ 3.81, 2.82 ], std: [ 2.27, 1.19 ], fq: 50 
  },
  "filthy": {
    dict: "happiness", word: "filthy", stem: "filthi", anew: "dirty",
    avg: [ 4.88, 2.82 ], std: [ 2.29, 1.83 ], fq: 50 
  },
  "gun": {
    dict: "happiness", word: "gun", stem: "gun", anew: "gun",
    avg: [ 7.02, 2.82 ], std: [ 1.84, 1.41 ], fq: 50 
  },
  "lied": {
    dict: "happiness", word: "lied", stem: "lie", anew: "lie",
    avg: [ 5.96, 2.82 ], std: [ 2.63, 1.21 ], fq: 50 
  },
  "worry": {
    dict: "happiness", word: "worry", stem: "worri", anew: "headache",
    avg: [ 5.07, 2.82 ], std: [ 2.74, 1.71 ], fq: 50 
  },
  "wounds": {
    dict: "happiness", word: "wounds", stem: "wound", anew: "wounds",
    avg: [ 5.82, 2.80 ], std: [ 2.01, 2.02 ], fq: 50 
  },
  "burns": {
    dict: "happiness", word: "burns", stem: "burn", anew: "burn",
    avg: [ 6.22, 2.78 ], std: [ 1.91, 1.45 ], fq: 50 
  },
  "cowards": {
    dict: "happiness", word: "cowards", stem: "coward", anew: "coward",
    avg: [ 4.07, 2.78 ], std: [ 2.19, 1.36 ], fq: 50 
  },
  "fever": {
    dict: "happiness", word: "fever", stem: "fever", anew: "fever",
    avg: [ 4.29, 2.78 ], std: [ 2.31, 1.56 ], fq: 50 
  },
  "mistake": {
    dict: "happiness", word: "mistake", stem: "mistak", anew: "mistake",
    avg: [ 5.18, 2.78 ], std: [ 2.42, 1.20 ], fq: 50 
  },
  "trouble": {
    dict: "happiness", word: "trouble", stem: "troubl", anew: "troubled",
    avg: [ 5.94, 2.78 ], std: [ 2.36, 1.47 ], fq: 50 
  },
  "troubled": {
    dict: "happiness", word: "troubled", stem: "troubl", anew: "troubled",
    avg: [ 5.94, 2.78 ], std: [ 2.36, 1.43 ], fq: 50 
  },
  "wasted": {
    dict: "happiness", word: "wasted", stem: "wast", anew: "waste",
    avg: [ 4.14, 2.78 ], std: [ 2.30, 1.17 ], fq: 50 
  },
  "bitches": {
    dict: "happiness", word: "bitches", stem: "bitch", anew: "gripe",
    avg: [ 5.00, 2.76 ], std: [ 2.19, 1.92 ], fq: 50 
  },
  "fighting": {
    dict: "happiness", word: "fighting", stem: "fight", anew: "fight",
    avg: [ 7.15, 2.76 ], std: [ 2.19, 1.57 ], fq: 50 
  },
  "lost": {
    dict: "happiness", word: "lost", stem: "lost", anew: "lost",
    avg: [ 5.82, 2.76 ], std: [ 2.62, 1.39 ], fq: 50 
  },
  "pathetic": {
    dict: "happiness", word: "pathetic", stem: "pathet", anew: "pity",
    avg: [ 3.72, 2.76 ], std: [ 2.02, 1.29 ], fq: 50 
  },
  "neglect": {
    dict: "happiness", word: "neglect", stem: "neglect", anew: "neglect",
    avg: [ 4.83, 2.76 ], std: [ 2.31, 2.17 ], fq: 50 
  },
  "defeated": {
    dict: "happiness", word: "defeated", stem: "defeat", anew: "defeated",
    avg: [ 5.09, 2.74 ], std: [ 3.00, 1.61 ], fq: 50 
  },
  "stressed": {
    dict: "happiness", word: "stressed", stem: "stress", anew: "stress",
    avg: [ 7.45, 2.74 ], std: [ 2.38, 1.12 ], fq: 50 
  },
  "ugly": {
    dict: "happiness", word: "ugly", stem: "ugli", anew: "ugly",
    avg: [ 5.38, 2.74 ], std: [ 2.23, 1.44 ], fq: 50 
  },
  "violation": {
    dict: "happiness", word: "violation", stem: "violat", anew: "assault",
    avg: [ 7.51, 2.74 ], std: [ 2.28, 1.08 ], fq: 50 
  },
  "unholy": {
    dict: "happiness", word: "unholy", stem: "unholi", anew: "demon",
    avg: [ 6.76, 2.73 ], std: [ 2.68, 1.40 ], fq: 50 
  },
  "addiction": {
    dict: "happiness", word: "addiction", stem: "addict", anew: "addicted",
    avg: [ 4.81, 2.72 ], std: [ 2.46, 1.46 ], fq: 50 
  },
  "arrests": {
    dict: "happiness", word: "arrests", stem: "arrest", anew: "pinch",
    avg: [ 4.59, 2.72 ], std: [ 2.10, 1.59 ], fq: 50 
  },
  "disgrace": {
    dict: "happiness", word: "disgrace", stem: "disgrac", anew: "shamed",
    avg: [ 4.88, 2.72 ], std: [ 2.27, 1.41 ], fq: 50 
  },
  "struggling": {
    dict: "happiness", word: "struggling", stem: "struggl", anew: "fight",
    avg: [ 7.15, 2.72 ], std: [ 2.19, 1.21 ], fq: 50 
  },
  "desperation": {
    dict: "happiness", word: "desperation", stem: "desper", anew: "despairing",
    avg: [ 5.68, 2.70 ], std: [ 2.37, 1.91 ], fq: 50 
  },
  "distress": {
    dict: "happiness", word: "distress", stem: "distress", anew: "distressed",
    avg: [ 6.40, 2.70 ], std: [ 2.38, 1.42 ], fq: 50 
  },
  "fight": {
    dict: "happiness", word: "fight", stem: "fight", anew: "fight",
    avg: [ 7.15, 2.70 ], std: [ 2.19, 1.74 ], fq: 50 
  },
  "taxes": {
    dict: "happiness", word: "taxes", stem: "tax", anew: "taxi",
    avg: [ 3.41, 2.70 ], std: [ 2.14, 1.53 ], fq: 50 
  },
  "waste": {
    dict: "happiness", word: "waste", stem: "wast", anew: "waste",
    avg: [ 4.14, 2.70 ], std: [ 2.30, 1.05 ], fq: 50 
  },
  "worse": {
    dict: "happiness", word: "worse", stem: "wors", anew: "regretful",
    avg: [ 5.74, 2.70 ], std: [ 2.32, 1.42 ], fq: 50 
  },
  "sorrows": {
    dict: "happiness", word: "sorrows", stem: "sorrow", anew: "regretful",
    avg: [ 5.74, 2.69 ], std: [ 2.32, 1.78 ], fq: 50 
  },
  "ache": {
    dict: "happiness", word: "ache", stem: "ach", anew: "ache",
    avg: [ 5.00, 2.68 ], std: [ 2.45, 1.20 ], fq: 50 
  },
  "bastards": {
    dict: "happiness", word: "bastards", stem: "bastard", anew: "bastard",
    avg: [ 6.07, 2.68 ], std: [ 2.15, 1.52 ], fq: 50 
  },
  "fears": {
    dict: "happiness", word: "fears", stem: "fear", anew: "fearful",
    avg: [ 6.33, 2.68 ], std: [ 2.28, 1.27 ], fq: 50 
  },
  "injuries": {
    dict: "happiness", word: "injuries", stem: "injuri", anew: "injury",
    avg: [ 5.69, 2.68 ], std: [ 2.06, 1.50 ], fq: 50 
  },
  "misery": {
    dict: "happiness", word: "misery", stem: "miseri", anew: "misery",
    avg: [ 5.17, 2.68 ], std: [ 2.69, 2.04 ], fq: 50 
  },
  "ruin": {
    dict: "happiness", word: "ruin", stem: "ruin", anew: "bankrupt",
    avg: [ 6.21, 2.68 ], std: [ 2.79, 1.57 ], fq: 50 
  },
  "shame": {
    dict: "happiness", word: "shame", stem: "shame", anew: "shamed",
    avg: [ 4.88, 2.68 ], std: [ 2.27, 1.30 ], fq: 50 
  },
  "stupid": {
    dict: "happiness", word: "stupid", stem: "stupid", anew: "stupid",
    avg: [ 4.72, 2.68 ], std: [ 2.71, 1.22 ], fq: 50 
  },
  "trash": {
    dict: "happiness", word: "trash", stem: "trash", anew: "trash",
    avg: [ 4.16, 2.68 ], std: [ 2.16, 1.22 ], fq: 50 
  },
  "deaf": {
    dict: "happiness", word: "deaf", stem: "deaf", anew: "indifferent",
    avg: [ 3.18, 2.67 ], std: [ 1.85, 1.33 ], fq: 50 
  },
  "afraid": {
    dict: "happiness", word: "afraid", stem: "afraid", anew: "afraid",
    avg: [ 6.67, 2.66 ], std: [ 2.54, 1.51 ], fq: 50 
  },
  "loneliness": {
    dict: "happiness", word: "loneliness", stem: "loneli", anew: "loneliness",
    avg: [ 4.56, 2.66 ], std: [ 2.97, 1.81 ], fq: 50 
  },
  "penalties": {
    dict: "happiness", word: "penalties", stem: "penalti", anew: "penalty",
    avg: [ 5.10, 2.66 ], std: [ 2.31, 1.08 ], fq: 50 
  },
  "surgery": {
    dict: "happiness", word: "surgery", stem: "surgeri", anew: "surgery",
    avg: [ 6.35, 2.66 ], std: [ 2.32, 1.75 ], fq: 50 
  },
  "tensions": {
    dict: "happiness", word: "tensions", stem: "tension", anew: "stress",
    avg: [ 7.45, 2.66 ], std: [ 2.38, 1.26 ], fq: 50 
  },
  "bad": {
    dict: "happiness", word: "bad", stem: "bad", anew: "regretful",
    avg: [ 5.74, 2.64 ], std: [ 2.32, 1.47 ], fq: 50 
  },
  "demons": {
    dict: "happiness", word: "demons", stem: "demon", anew: "demon",
    avg: [ 6.76, 2.64 ], std: [ 2.68, 2.07 ], fq: 50 
  },
  "guilty": {
    dict: "happiness", word: "guilty", stem: "guilti", anew: "guilty",
    avg: [ 6.04, 2.64 ], std: [ 2.76, 1.59 ], fq: 50 
  },
  "sin": {
    dict: "happiness", word: "sin", stem: "sin", anew: "sinful",
    avg: [ 6.29, 2.64 ], std: [ 2.43, 1.70 ], fq: 50 
  },
  "heartaches": {
    dict: "happiness", word: "heartaches", stem: "heartach", anew: "grief",
    avg: [ 4.78, 2.63 ], std: [ 2.84, 2.02 ], fq: 50 
  },
  "beaten": {
    dict: "happiness", word: "beaten", stem: "beaten", anew: "crushed",
    avg: [ 5.52, 2.62 ], std: [ 2.87, 1.59 ], fq: 50 
  },
  "lies": {
    dict: "happiness", word: "lies", stem: "lie", anew: "lie",
    avg: [ 5.96, 2.62 ], std: [ 2.63, 1.38 ], fq: 50 
  },
  "nasty": {
    dict: "happiness", word: "nasty", stem: "nasti", anew: "nasty",
    avg: [ 4.89, 2.62 ], std: [ 2.50, 1.23 ], fq: 50 
  },
  "retarded": {
    dict: "happiness", word: "retarded", stem: "retard", anew: "slow",
    avg: [ 3.39, 2.62 ], std: [ 2.22, 1.54 ], fq: 50 
  },
  "rude": {
    dict: "happiness", word: "rude", stem: "rude", anew: "rude",
    avg: [ 6.31, 2.62 ], std: [ 2.47, 1.64 ], fq: 50 
  },
  "threatened": {
    dict: "happiness", word: "threatened", stem: "threaten", anew: "menace",
    avg: [ 5.52, 2.62 ], std: [ 2.45, 1.47 ], fq: 50 
  },
  "violated": {
    dict: "happiness", word: "violated", stem: "violat", anew: "outrage",
    avg: [ 6.83, 2.62 ], std: [ 2.26, 1.38 ], fq: 50 
  },
  "abortion": {
    dict: "happiness", word: "abortion", stem: "abort", anew: "abortion",
    avg: [ 5.39, 2.60 ], std: [ 2.80, 1.53 ], fq: 50 
  },
  "brutal": {
    dict: "happiness", word: "brutal", stem: "brutal", anew: "brutal",
    avg: [ 6.60, 2.60 ], std: [ 2.36, 2.08 ], fq: 50 
  },
  "crash": {
    dict: "happiness", word: "crash", stem: "crash", anew: "crash",
    avg: [ 6.95, 2.60 ], std: [ 2.44, 1.37 ], fq: 50 
  },
  "error": {
    dict: "happiness", word: "error", stem: "error", anew: "fault",
    avg: [ 4.07, 2.60 ], std: [ 1.69, 0.81 ], fq: 50 
  },
  "lie": {
    dict: "happiness", word: "lie", stem: "lie", anew: "lie",
    avg: [ 5.96, 2.60 ], std: [ 2.63, 1.62 ], fq: 50 
  },
  "mad": {
    dict: "happiness", word: "mad", stem: "mad", anew: "mad",
    avg: [ 6.76, 2.60 ], std: [ 2.26, 1.32 ], fq: 50 
  },
  "selfish": {
    dict: "happiness", word: "selfish", stem: "selfish", anew: "selfish",
    avg: [ 5.50, 2.60 ], std: [ 2.62, 1.05 ], fq: 50 
  },
  "worries": {
    dict: "happiness", word: "worries", stem: "worri", anew: "headache",
    avg: [ 5.07, 2.60 ], std: [ 2.74, 1.32 ], fq: 50 
  },
  "infections": {
    dict: "happiness", word: "infections", stem: "infect", anew: "infection",
    avg: [ 5.03, 2.59 ], std: [ 2.77, 1.91 ], fq: 50 
  },
  "annoyed": {
    dict: "happiness", word: "annoyed", stem: "annoy", anew: "annoy",
    avg: [ 6.49, 2.58 ], std: [ 2.17, 1.64 ], fq: 50 
  },
  "blind": {
    dict: "happiness", word: "blind", stem: "blind", anew: "blind",
    avg: [ 4.39, 2.58 ], std: [ 2.36, 1.23 ], fq: 50 
  },
  "cheated": {
    dict: "happiness", word: "cheated", stem: "cheat", anew: "betray",
    avg: [ 7.24, 2.58 ], std: [ 2.06, 1.59 ], fq: 50 
  },
  "damage": {
    dict: "happiness", word: "damage", stem: "damag", anew: "damage",
    avg: [ 5.57, 2.58 ], std: [ 2.26, 1.50 ], fq: 50 
  },
  "disgusting": {
    dict: "happiness", word: "disgusting", stem: "disgust", anew: "disgusted",
    avg: [ 5.42, 2.58 ], std: [ 2.59, 1.47 ], fq: 50 
  },
  "guilt": {
    dict: "happiness", word: "guilt", stem: "guilt", anew: "guilty",
    avg: [ 6.04, 2.58 ], std: [ 2.76, 1.46 ], fq: 50 
  },
  "lying": {
    dict: "happiness", word: "lying", stem: "lie", anew: "lie",
    avg: [ 5.96, 2.58 ], std: [ 2.63, 1.70 ], fq: 50 
  },
  "rotten": {
    dict: "happiness", word: "rotten", stem: "rotten", anew: "rotten",
    avg: [ 4.53, 2.58 ], std: [ 2.38, 1.60 ], fq: 50 
  },
  "scared": {
    dict: "happiness", word: "scared", stem: "scare", anew: "scared",
    avg: [ 6.82, 2.58 ], std: [ 2.03, 1.43 ], fq: 50 
  },
  "shitty": {
    dict: "happiness", word: "shitty", stem: "shitti", anew: "stink",
    avg: [ 4.26, 2.58 ], std: [ 2.10, 1.57 ], fq: 50 
  },
  "starving": {
    dict: "happiness", word: "starving", stem: "starv", anew: "starving",
    avg: [ 5.61, 2.58 ], std: [ 2.53, 1.47 ], fq: 50 
  },
  "stroke": {
    dict: "happiness", word: "stroke", stem: "stroke", anew: "accident",
    avg: [ 6.26, 2.58 ], std: [ 2.87, 1.60 ], fq: 50 
  },
  "betrayed": {
    dict: "happiness", word: "betrayed", stem: "betray", anew: "betray",
    avg: [ 7.24, 2.57 ], std: [ 2.06, 1.83 ], fq: 50 
  },
  "nightmares": {
    dict: "happiness", word: "nightmares", stem: "nightmar", anew: "nightmare",
    avg: [ 7.59, 2.56 ], std: [ 2.23, 1.65 ], fq: 50 
  },
  "assault": {
    dict: "happiness", word: "assault", stem: "assault", anew: "assault",
    avg: [ 7.51, 2.56 ], std: [ 2.28, 1.66 ], fq: 50 
  },
  "beating": {
    dict: "happiness", word: "beating", stem: "beat", anew: "crushed",
    avg: [ 5.52, 2.56 ], std: [ 2.87, 1.90 ], fq: 50 
  },
  "grave": {
    dict: "happiness", word: "grave", stem: "grave", anew: "solemn",
    avg: [ 3.56, 2.56 ], std: [ 1.95, 1.85 ], fq: 50 
  },
  "loss": {
    dict: "happiness", word: "loss", stem: "loss", anew: "red",
    avg: [ 5.29, 2.56 ], std: [ 2.04, 1.50 ], fq: 50 
  },
  "rage": {
    dict: "happiness", word: "rage", stem: "rage", anew: "rage",
    avg: [ 8.17, 2.56 ], std: [ 1.40, 1.51 ], fq: 50 
  },
  "upset": {
    dict: "happiness", word: "upset", stem: "upset", anew: "upset",
    avg: [ 5.86, 2.56 ], std: [ 2.40, 1.43 ], fq: 50 
  },
  "corpse": {
    dict: "happiness", word: "corpse", stem: "corps", anew: "corpse",
    avg: [ 4.74, 2.55 ], std: [ 2.94, 1.96 ], fq: 50 
  },
  "abandoned": {
    dict: "happiness", word: "abandoned", stem: "abandon", anew: "vacation",
    avg: [ 5.64, 2.54 ], std: [ 2.99, 1.37 ], fq: 50 
  },
  "broke": {
    dict: "happiness", word: "broke", stem: "broke", anew: "bankrupt",
    avg: [ 6.21, 2.54 ], std: [ 2.79, 1.28 ], fq: 50 
  },
  "harm": {
    dict: "happiness", word: "harm", stem: "harm", anew: "injury",
    avg: [ 5.69, 2.54 ], std: [ 2.06, 1.45 ], fq: 50 
  },
  "hurricane": {
    dict: "happiness", word: "hurricane", stem: "hurrican", anew: "hurricane",
    avg: [ 6.83, 2.54 ], std: [ 2.06, 1.57 ], fq: 50 
  },
  "miserable": {
    dict: "happiness", word: "miserable", stem: "miser", anew: "pity",
    avg: [ 3.72, 2.54 ], std: [ 2.02, 1.67 ], fq: 50 
  },
  "pissed": {
    dict: "happiness", word: "pissed", stem: "piss", anew: "irritate",
    avg: [ 5.76, 2.54 ], std: [ 2.15, 1.33 ], fq: 50 
  },
  "ruined": {
    dict: "happiness", word: "ruined", stem: "ruin", anew: "bankrupt",
    avg: [ 6.21, 2.54 ], std: [ 2.79, 1.62 ], fq: 50 
  },
  "tumor": {
    dict: "happiness", word: "tumor", stem: "tumor", anew: "tumor",
    avg: [ 6.51, 2.53 ], std: [ 2.85, 2.00 ], fq: 50 
  },
  "attacked": {
    dict: "happiness", word: "attacked", stem: "attack", anew: "aggressive",
    avg: [ 5.83, 2.52 ], std: [ 2.33, 1.55 ], fq: 50 
  },
  "bastard": {
    dict: "happiness", word: "bastard", stem: "bastard", anew: "bastard",
    avg: [ 6.07, 2.52 ], std: [ 2.15, 1.30 ], fq: 50 
  },
  "destroy": {
    dict: "happiness", word: "destroy", stem: "destroy", anew: "destroy",
    avg: [ 6.83, 2.52 ], std: [ 2.38, 1.81 ], fq: 50 
  },
  "failing": {
    dict: "happiness", word: "failing", stem: "fail", anew: "bomb",
    avg: [ 7.15, 2.52 ], std: [ 2.40, 1.27 ], fq: 50 
  },
  "shooting": {
    dict: "happiness", word: "shooting", stem: "shoot", anew: "hit",
    avg: [ 5.73, 2.52 ], std: [ 2.09, 1.74 ], fq: 50 
  },
  "useless": {
    dict: "happiness", word: "useless", stem: "useless", anew: "useless",
    avg: [ 4.87, 2.52 ], std: [ 2.58, 1.42 ], fq: 50 
  },
  "motherfuckers": {
    dict: "happiness", word: "motherfuckers", stem: "motherfuck", anew: "bastard",
    avg: [ 6.07, 2.51 ], std: [ 2.15, 2.47 ], fq: 50 
  },
  "betray": {
    dict: "happiness", word: "betray", stem: "betray", anew: "betray",
    avg: [ 7.24, 2.50 ], std: [ 2.06, 1.63 ], fq: 50 
  },
  "shit": {
    dict: "happiness", word: "shit", stem: "shit", anew: "dump",
    avg: [ 4.12, 2.50 ], std: [ 2.36, 1.52 ], fq: 50 
  },
  "shot": {
    dict: "happiness", word: "shot", stem: "shot", anew: "hit",
    avg: [ 5.73, 2.50 ], std: [ 2.09, 1.66 ], fq: 50 
  },
  "crisis": {
    dict: "happiness", word: "crisis", stem: "crisi", anew: "crisis",
    avg: [ 5.44, 2.48 ], std: [ 3.07, 1.67 ], fq: 50 
  },
  "damaged": {
    dict: "happiness", word: "damaged", stem: "damag", anew: "damage",
    avg: [ 5.57, 2.48 ], std: [ 2.26, 1.03 ], fq: 50 
  },
  "recession": {
    dict: "happiness", word: "recession", stem: "recess", anew: "corner",
    avg: [ 3.91, 2.48 ], std: [ 1.92, 1.50 ], fq: 50 
  },
  "slap": {
    dict: "happiness", word: "slap", stem: "slap", anew: "slap",
    avg: [ 6.46, 2.48 ], std: [ 2.58, 1.53 ], fq: 50 
  },
  "attacks": {
    dict: "happiness", word: "attacks", stem: "attack", anew: "fire",
    avg: [ 7.17, 2.46 ], std: [ 2.06, 1.46 ], fq: 50 
  },
  "crashed": {
    dict: "happiness", word: "crashed", stem: "crash", anew: "crash",
    avg: [ 6.95, 2.46 ], std: [ 2.44, 1.40 ], fq: 50 
  },
  "losses": {
    dict: "happiness", word: "losses", stem: "loss", anew: "red",
    avg: [ 5.29, 2.46 ], std: [ 2.04, 1.45 ], fq: 50 
  },
  "panic": {
    dict: "happiness", word: "panic", stem: "panic", anew: "panic",
    avg: [ 7.02, 2.46 ], std: [ 2.02, 1.34 ], fq: 50 
  },
  "burial": {
    dict: "happiness", word: "burial", stem: "burial", anew: "burial",
    avg: [ 5.08, 2.44 ], std: [ 2.40, 1.92 ], fq: 50 
  },
  "cheat": {
    dict: "happiness", word: "cheat", stem: "cheat", anew: "betray",
    avg: [ 7.24, 2.44 ], std: [ 2.06, 1.23 ], fq: 50 
  },
  "dangerous": {
    dict: "happiness", word: "dangerous", stem: "danger", anew: "danger",
    avg: [ 7.32, 2.44 ], std: [ 2.07, 1.46 ], fq: 50 
  },
  "drowning": {
    dict: "happiness", word: "drowning", stem: "drown", anew: "drown",
    avg: [ 6.57, 2.44 ], std: [ 2.33, 1.59 ], fq: 50 
  },
  "hating": {
    dict: "happiness", word: "hating", stem: "hate", anew: "hate",
    avg: [ 6.95, 2.44 ], std: [ 2.56, 1.45 ], fq: 50 
  },
  "prisoners": {
    dict: "happiness", word: "prisoners", stem: "prison", anew: "prison",
    avg: [ 5.70, 2.44 ], std: [ 2.56, 1.46 ], fq: 50 
  },
  "arrest": {
    dict: "happiness", word: "arrest", stem: "arrest", anew: "pinch",
    avg: [ 4.59, 2.42 ], std: [ 2.10, 1.49 ], fq: 50 
  },
  "attack": {
    dict: "happiness", word: "attack", stem: "attack", anew: "fire",
    avg: [ 7.17, 2.42 ], std: [ 2.06, 1.43 ], fq: 50 
  },
  "flood": {
    dict: "happiness", word: "flood", stem: "flood", anew: "flood",
    avg: [ 6.00, 2.42 ], std: [ 2.02, 1.37 ], fq: 50 
  },
  "ill": {
    dict: "happiness", word: "ill", stem: "ill", anew: "illness",
    avg: [ 4.71, 2.42 ], std: [ 2.24, 1.23 ], fq: 50 
  },
  "killer": {
    dict: "happiness", word: "killer", stem: "killer", anew: "killer",
    avg: [ 7.86, 2.42 ], std: [ 1.89, 1.93 ], fq: 50 
  },
  "negative": {
    dict: "happiness", word: "negative", stem: "neg", anew: "damage",
    avg: [ 5.57, 2.42 ], std: [ 2.26, 1.05 ], fq: 50 
  },
  "worried": {
    dict: "happiness", word: "worried", stem: "worri", anew: "disturb",
    avg: [ 5.80, 2.42 ], std: [ 2.39, 1.18 ], fq: 50 
  },
  "wounded": {
    dict: "happiness", word: "wounded", stem: "wound", anew: "wounds",
    avg: [ 5.82, 2.42 ], std: [ 2.01, 1.55 ], fq: 50 
  },
  "slaughter": {
    dict: "happiness", word: "slaughter", stem: "slaughter", anew: "slaughter",
    avg: [ 6.77, 2.41 ], std: [ 2.42, 1.84 ], fq: 50 
  },
  "asshole": {
    dict: "happiness", word: "asshole", stem: "asshol", anew: "bastard",
    avg: [ 6.07, 2.40 ], std: [ 2.15, 1.60 ], fq: 50 
  },
  "weapons": {
    dict: "happiness", word: "weapons", stem: "weapon", anew: "weapon",
    avg: [ 6.03, 2.40 ], std: [ 1.89, 1.69 ], fq: 50 
  },
  "sad": {
    dict: "happiness", word: "sad", stem: "sad", anew: "sad",
    avg: [ 4.13, 2.38 ], std: [ 2.38, 1.61 ], fq: 50 
  },
  "victim": {
    dict: "happiness", word: "victim", stem: "victim", anew: "victim",
    avg: [ 6.06, 2.38 ], std: [ 2.32, 1.41 ], fq: 50 
  },
  "hurting": {
    dict: "happiness", word: "hurting", stem: "hurt", anew: "hurt",
    avg: [ 5.85, 2.36 ], std: [ 2.49, 1.12 ], fq: 50 
  },
  "threat": {
    dict: "happiness", word: "threat", stem: "threat", anew: "menace",
    avg: [ 5.52, 2.36 ], std: [ 2.45, 1.31 ], fq: 50 
  },
  "frustration": {
    dict: "happiness", word: "frustration", stem: "frustrat", anew: "frustrated",
    avg: [ 5.61, 2.34 ], std: [ 2.76, 1.19 ], fq: 50 
  },
  "hate": {
    dict: "happiness", word: "hate", stem: "hate", anew: "hate",
    avg: [ 6.95, 2.34 ], std: [ 2.56, 1.88 ], fq: 50 
  },
  "grief": {
    dict: "happiness", word: "grief", stem: "grief", anew: "grief",
    avg: [ 4.78, 2.33 ], std: [ 2.84, 1.78 ], fq: 50 
  },
  "accident": {
    dict: "happiness", word: "accident", stem: "accid", anew: "accident",
    avg: [ 6.26, 2.32 ], std: [ 2.87, 1.52 ], fq: 50 
  },
  "angry": {
    dict: "happiness", word: "angry", stem: "angri", anew: "angry",
    avg: [ 7.17, 2.32 ], std: [ 2.07, 1.24 ], fq: 50 
  },
  "fear": {
    dict: "happiness", word: "fear", stem: "fear", anew: "fearful",
    avg: [ 6.33, 2.32 ], std: [ 2.28, 1.30 ], fq: 50 
  },
  "nightmare": {
    dict: "happiness", word: "nightmare", stem: "nightmar", anew: "nightmare",
    avg: [ 7.59, 2.32 ], std: [ 2.23, 1.87 ], fq: 50 
  },
  "poor": {
    dict: "happiness", word: "poor", stem: "poor", anew: "pity",
    avg: [ 3.72, 2.32 ], std: [ 2.02, 1.28 ], fq: 50 
  },
  "victims": {
    dict: "happiness", word: "victims", stem: "victim", anew: "victim",
    avg: [ 6.06, 2.32 ], std: [ 2.32, 1.50 ], fq: 50 
  },
  "anger": {
    dict: "happiness", word: "anger", stem: "anger", anew: "anger",
    avg: [ 7.63, 2.30 ], std: [ 1.91, 1.42 ], fq: 50 
  },
  "fired": {
    dict: "happiness", word: "fired", stem: "fire", anew: "fire",
    avg: [ 7.17, 2.30 ], std: [ 2.06, 1.57 ], fq: 50 
  },
  "fraud": {
    dict: "happiness", word: "fraud", stem: "fraud", anew: "fraud",
    avg: [ 5.75, 2.30 ], std: [ 2.45, 1.18 ], fq: 50 
  },
  "thieves": {
    dict: "happiness", word: "thieves", stem: "thiev", anew: "thief",
    avg: [ 6.89, 2.29 ], std: [ 2.13, 1.31 ], fq: 50 
  },
  "heartache": {
    dict: "happiness", word: "heartache", stem: "heartach", anew: "grief",
    avg: [ 4.78, 2.28 ], std: [ 2.84, 1.50 ], fq: 50 
  },
  "cheating": {
    dict: "happiness", word: "cheating", stem: "cheat", anew: "foul",
    avg: [ 4.93, 2.26 ], std: [ 2.23, 1.19 ], fq: 50 
  },
  "destruction": {
    dict: "happiness", word: "destruction", stem: "destruct", anew: "destruction",
    avg: [ 5.82, 2.26 ], std: [ 2.71, 1.51 ], fq: 50 
  },
  "disappointed": {
    dict: "happiness", word: "disappointed", stem: "disappoint", anew: "disappoint",
    avg: [ 4.92, 2.26 ], std: [ 2.64, 1.03 ], fq: 50 
  },
  "bombing": {
    dict: "happiness", word: "bombing", stem: "bomb", anew: "bomb",
    avg: [ 7.15, 2.24 ], std: [ 2.40, 1.48 ], fq: 50 
  },
  "devil": {
    dict: "happiness", word: "devil", stem: "devil", anew: "devil",
    avg: [ 6.07, 2.24 ], std: [ 2.61, 1.55 ], fq: 50 
  },
  "horrible": {
    dict: "happiness", word: "horrible", stem: "horribl", anew: "ugly",
    avg: [ 5.38, 2.24 ], std: [ 2.23, 1.48 ], fq: 50 
  },
  "suffered": {
    dict: "happiness", word: "suffered", stem: "suffer", anew: "ache",
    avg: [ 5.00, 2.24 ], std: [ 2.45, 1.60 ], fq: 50 
  },
  "hatred": {
    dict: "happiness", word: "hatred", stem: "hatr", anew: "hatred",
    avg: [ 6.66, 2.22 ], std: [ 2.56, 1.86 ], fq: 50 
  },
  "hell": {
    dict: "happiness", word: "hell", stem: "hell", anew: "hell",
    avg: [ 5.38, 2.22 ], std: [ 2.62, 1.47 ], fq: 50 
  },
  "injured": {
    dict: "happiness", word: "injured", stem: "injur", anew: "wounds",
    avg: [ 5.82, 2.22 ], std: [ 2.01, 1.11 ], fq: 50 
  },
  "suffering": {
    dict: "happiness", word: "suffering", stem: "suffer", anew: "distressed",
    avg: [ 6.40, 2.22 ], std: [ 2.38, 1.71 ], fq: 50 
  },
  "cried": {
    dict: "happiness", word: "cried", stem: "cri", anew: "scream",
    avg: [ 7.04, 2.20 ], std: [ 1.96, 1.29 ], fq: 50 
  },
  "crime": {
    dict: "happiness", word: "crime", stem: "crime", anew: "crime",
    avg: [ 5.41, 2.20 ], std: [ 2.69, 1.26 ], fq: 50 
  },
  "loser": {
    dict: "happiness", word: "loser", stem: "loser", anew: "loser",
    avg: [ 4.95, 2.20 ], std: [ 2.57, 1.11 ], fq: 50 
  },
  "depressed": {
    dict: "happiness", word: "depressed", stem: "depress", anew: "depression",
    avg: [ 4.54, 2.18 ], std: [ 3.19, 1.79 ], fq: 50 
  },
  "divorce": {
    dict: "happiness", word: "divorce", stem: "divorc", anew: "divorce",
    avg: [ 6.33, 2.18 ], std: [ 2.71, 1.32 ], fq: 50 
  },
  "hurt": {
    dict: "happiness", word: "hurt", stem: "hurt", anew: "hurt",
    avg: [ 5.85, 2.18 ], std: [ 2.49, 1.37 ], fq: 50 
  },
  "agony": {
    dict: "happiness", word: "agony", stem: "agoni", anew: "agony",
    avg: [ 6.06, 2.16 ], std: [ 2.67, 1.88 ], fq: 50 
  },
  "drowned": {
    dict: "happiness", word: "drowned", stem: "drown", anew: "drown",
    avg: [ 6.57, 2.16 ], std: [ 2.33, 1.60 ], fq: 50 
  },
  "pollution": {
    dict: "happiness", word: "pollution", stem: "pollut", anew: "pollute",
    avg: [ 6.08, 2.16 ], std: [ 2.42, 1.18 ], fq: 50 
  },
  "corruption": {
    dict: "happiness", word: "corruption", stem: "corrupt", anew: "corrupt",
    avg: [ 4.67, 2.14 ], std: [ 2.35, 1.31 ], fq: 50 
  },
  "crimes": {
    dict: "happiness", word: "crimes", stem: "crime", anew: "crime",
    avg: [ 5.41, 2.14 ], std: [ 2.69, 1.37 ], fq: 50 
  },
  "hated": {
    dict: "happiness", word: "hated", stem: "hate", anew: "hate",
    avg: [ 6.95, 2.14 ], std: [ 2.56, 1.29 ], fq: 50 
  },
  "hurts": {
    dict: "happiness", word: "hurts", stem: "hurt", anew: "hurt",
    avg: [ 5.85, 2.14 ], std: [ 2.49, 1.20 ], fq: 50 
  },
  "painful": {
    dict: "happiness", word: "painful", stem: "pain", anew: "pain",
    avg: [ 6.50, 2.12 ], std: [ 2.49, 1.45 ], fq: 50 
  },
  "sorrow": {
    dict: "happiness", word: "sorrow", stem: "sorrow", anew: "regretful",
    avg: [ 5.74, 2.12 ], std: [ 2.32, 1.56 ], fq: 50 
  },
  "unhappy": {
    dict: "happiness", word: "unhappy", stem: "unhappi", anew: "unhappy",
    avg: [ 4.18, 2.12 ], std: [ 2.50, 1.36 ], fq: 50 
  },
  "heartbreak": {
    dict: "happiness", word: "heartbreak", stem: "heartbreak", anew: "grief",
    avg: [ 4.78, 2.11 ], std: [ 2.84, 1.31 ], fq: 50 
  },
  "dying": {
    dict: "happiness", word: "dying", stem: "die", anew: "death",
    avg: [ 4.59, 2.10 ], std: [ 3.07, 1.47 ], fq: 50 
  },
  "funeral": {
    dict: "happiness", word: "funeral", stem: "funer", anew: "funeral",
    avg: [ 4.94, 2.10 ], std: [ 3.21, 1.56 ], fq: 50 
  },
  "pain": {
    dict: "happiness", word: "pain", stem: "pain", anew: "pain",
    avg: [ 6.50, 2.10 ], std: [ 2.49, 1.28 ], fq: 50 
  },
  "worst": {
    dict: "happiness", word: "worst", stem: "worst", anew: "regretful",
    avg: [ 5.74, 2.10 ], std: [ 2.32, 1.34 ], fq: 50 
  },
  "rejected": {
    dict: "happiness", word: "rejected", stem: "reject", anew: "rejected",
    avg: [ 6.37, 2.08 ], std: [ 2.56, 1.12 ], fq: 50 
  },
  "suffer": {
    dict: "happiness", word: "suffer", stem: "suffer", anew: "ache",
    avg: [ 5.00, 2.08 ], std: [ 2.45, 1.38 ], fq: 50 
  },
  "bankruptcy": {
    dict: "happiness", word: "bankruptcy", stem: "bankruptci", anew: "failure",
    avg: [ 4.95, 2.06 ], std: [ 2.81, 1.60 ], fq: 50 
  },
  "fails": {
    dict: "happiness", word: "fails", stem: "fail", anew: "bomb",
    avg: [ 7.15, 2.06 ], std: [ 2.40, 1.20 ], fq: 50 
  },
  "failure": {
    dict: "happiness", word: "failure", stem: "failur", anew: "failure",
    avg: [ 4.95, 2.06 ], std: [ 2.81, 1.22 ], fq: 50 
  },
  "hates": {
    dict: "happiness", word: "hates", stem: "hate", anew: "hate",
    avg: [ 6.95, 2.06 ], std: [ 2.56, 1.33 ], fq: 50 
  },
  "prison": {
    dict: "happiness", word: "prison", stem: "prison", anew: "prison",
    avg: [ 5.70, 2.06 ], std: [ 2.56, 1.48 ], fq: 50 
  },
  "slave": {
    dict: "happiness", word: "slave", stem: "slave", anew: "slave",
    avg: [ 6.21, 2.06 ], std: [ 2.93, 1.46 ], fq: 50 
  },
  "slaves": {
    dict: "happiness", word: "slaves", stem: "slave", anew: "slave",
    avg: [ 6.21, 2.06 ], std: [ 2.93, 1.37 ], fq: 50 
  },
  "tragedy": {
    dict: "happiness", word: "tragedy", stem: "tragedi", anew: "tragedy",
    avg: [ 6.24, 2.06 ], std: [ 2.64, 1.38 ], fq: 50 
  },
  "violent": {
    dict: "happiness", word: "violent", stem: "violent", anew: "violent",
    avg: [ 6.89, 2.06 ], std: [ 2.47, 1.35 ], fq: 50 
  },
  "crying": {
    dict: "happiness", word: "crying", stem: "cri", anew: "scream",
    avg: [ 7.04, 2.04 ], std: [ 1.96, 1.24 ], fq: 50 
  },
  "destroyed": {
    dict: "happiness", word: "destroyed", stem: "destroy", anew: "destroy",
    avg: [ 6.83, 2.04 ], std: [ 2.38, 1.34 ], fq: 50 
  },
  "injury": {
    dict: "happiness", word: "injury", stem: "injuri", anew: "injury",
    avg: [ 5.69, 2.04 ], std: [ 2.06, 1.24 ], fq: 50 
  },
  "rejection": {
    dict: "happiness", word: "rejection", stem: "reject", anew: "rejected",
    avg: [ 6.37, 2.02 ], std: [ 2.56, 1.33 ], fq: 50 
  },
  "motherfucker": {
    dict: "happiness", word: "motherfucker", stem: "motherfuck", anew: "bastard",
    avg: [ 6.07, 2.02 ], std: [ 2.15, 1.66 ], fq: 50 
  },
  "sick": {
    dict: "happiness", word: "sick", stem: "sick", anew: "sickness",
    avg: [ 5.61, 2.02 ], std: [ 2.67, 1.08 ], fq: 50 
  },
  "dead": {
    dict: "happiness", word: "dead", stem: "dead", anew: "dead",
    avg: [ 5.73, 2.00 ], std: [ 2.73, 1.32 ], fq: 50 
  },
  "illness": {
    dict: "happiness", word: "illness", stem: "ill", anew: "illness",
    avg: [ 4.71, 2.00 ], std: [ 2.24, 1.18 ], fq: 50 
  },
  "killers": {
    dict: "happiness", word: "killers", stem: "killer", anew: "killer",
    avg: [ 7.86, 2.00 ], std: [ 1.89, 1.53 ], fq: 50 
  },
  "punishment": {
    dict: "happiness", word: "punishment", stem: "punish", anew: "punishment",
    avg: [ 5.93, 2.00 ], std: [ 2.40, 1.34 ], fq: 50 
  },
  "criminal": {
    dict: "happiness", word: "criminal", stem: "crimin", anew: "criminal",
    avg: [ 4.79, 1.98 ], std: [ 2.51, 1.27 ], fq: 50 
  },
  "depression": {
    dict: "happiness", word: "depression", stem: "depress", anew: "depression",
    avg: [ 4.54, 1.98 ], std: [ 3.19, 1.56 ], fq: 50 
  },
  "headache": {
    dict: "happiness", word: "headache", stem: "headach", anew: "headache",
    avg: [ 5.07, 1.98 ], std: [ 2.74, 1.12 ], fq: 50 
  },
  "poverty": {
    dict: "happiness", word: "poverty", stem: "poverti", anew: "poverty",
    avg: [ 4.87, 1.98 ], std: [ 2.66, 1.12 ], fq: 50 
  },
  "tumors": {
    dict: "happiness", word: "tumors", stem: "tumor", anew: "tumor",
    avg: [ 6.51, 1.98 ], std: [ 2.85, 1.35 ], fq: 50 
  },
  "bomb": {
    dict: "happiness", word: "bomb", stem: "bomb", anew: "bomb",
    avg: [ 7.15, 1.96 ], std: [ 2.40, 1.28 ], fq: 50 
  },
  "disaster": {
    dict: "happiness", word: "disaster", stem: "disast", anew: "disaster",
    avg: [ 6.33, 1.96 ], std: [ 2.70, 1.43 ], fq: 50 
  },
  "fail": {
    dict: "happiness", word: "fail", stem: "fail", anew: "bomb",
    avg: [ 7.15, 1.96 ], std: [ 2.40, 1.03 ], fq: 50 
  },
  "poison": {
    dict: "happiness", word: "poison", stem: "poison", anew: "poison",
    avg: [ 6.05, 1.94 ], std: [ 2.82, 1.15 ], fq: 50 
  },
  "depressing": {
    dict: "happiness", word: "depressing", stem: "depress", anew: "depression",
    avg: [ 4.54, 1.90 ], std: [ 3.19, 1.22 ], fq: 50 
  },
  "evil": {
    dict: "happiness", word: "evil", stem: "evil", anew: "evil",
    avg: [ 6.39, 1.90 ], std: [ 2.44, 1.28 ], fq: 50 
  },
  "wars": {
    dict: "happiness", word: "wars", stem: "war", anew: "war",
    avg: [ 7.49, 1.90 ], std: [ 2.16, 1.33 ], fq: 50 
  },
  "abuse": {
    dict: "happiness", word: "abuse", stem: "abus", anew: "abuse",
    avg: [ 6.83, 1.88 ], std: [ 2.70, 1.24 ], fq: 50 
  },
  "sadness": {
    dict: "happiness", word: "sadness", stem: "sad", anew: "sad",
    avg: [ 4.13, 1.88 ], std: [ 2.38, 1.19 ], fq: 50 
  },
  "cruel": {
    dict: "happiness", word: "cruel", stem: "cruel", anew: "cruel",
    avg: [ 5.68, 1.84 ], std: [ 2.65, 1.15 ], fq: 50 
  },
  "cry": {
    dict: "happiness", word: "cry", stem: "cri", anew: "scream",
    avg: [ 7.04, 1.84 ], std: [ 1.96, 1.28 ], fq: 50 
  },
  "failed": {
    dict: "happiness", word: "failed", stem: "fail", anew: "bomb",
    avg: [ 7.15, 1.84 ], std: [ 2.40, 1.00 ], fq: 50 
  },
  "sickness": {
    dict: "happiness", word: "sickness", stem: "sick", anew: "sickness",
    avg: [ 5.61, 1.84 ], std: [ 2.67, 1.18 ], fq: 50 
  },
  "abused": {
    dict: "happiness", word: "abused", stem: "abus", anew: "abuse",
    avg: [ 6.83, 1.83 ], std: [ 2.70, 1.31 ], fq: 50 
  },
  "tortured": {
    dict: "happiness", word: "tortured", stem: "tortur", anew: "torture",
    avg: [ 6.10, 1.82 ], std: [ 2.77, 1.42 ], fq: 50 
  },
  "fatal": {
    dict: "happiness", word: "fatal", stem: "fatal", anew: "black",
    avg: [ 4.61, 1.80 ], std: [ 2.24, 1.53 ], fq: 50 
  },
  "killings": {
    dict: "happiness", word: "killings", stem: "kill", anew: "defeated",
    avg: [ 5.09, 1.80 ], std: [ 3.00, 1.54 ], fq: 50 
  },
  "murdered": {
    dict: "happiness", word: "murdered", stem: "murder", anew: "murderer",
    avg: [ 7.47, 1.80 ], std: [ 2.18, 1.63 ], fq: 50 
  },
  "war": {
    dict: "happiness", word: "war", stem: "war", anew: "war",
    avg: [ 7.49, 1.80 ], std: [ 2.16, 1.41 ], fq: 50 
  },
  "kills": {
    dict: "happiness", word: "kills", stem: "kill", anew: "defeated",
    avg: [ 5.09, 1.78 ], std: [ 3.00, 1.23 ], fq: 50 
  },
  "jail": {
    dict: "happiness", word: "jail", stem: "jail", anew: "jail",
    avg: [ 5.49, 1.76 ], std: [ 2.67, 1.02 ], fq: 50 
  },
  "terror": {
    dict: "happiness", word: "terror", stem: "terror", anew: "panic",
    avg: [ 7.02, 1.76 ], std: [ 2.02, 1.00 ], fq: 50 
  },
  "killing": {
    dict: "happiness", word: "killing", stem: "kill", anew: "defeated",
    avg: [ 5.09, 1.70 ], std: [ 3.00, 1.36 ], fq: 50 
  },
  "deaths": {
    dict: "happiness", word: "deaths", stem: "death", anew: "death",
    avg: [ 4.59, 1.64 ], std: [ 3.07, 1.14 ], fq: 50 
  },
  "raped": {
    dict: "happiness", word: "raped", stem: "rape", anew: "rape",
    avg: [ 6.81, 1.64 ], std: [ 3.17, 1.43 ], fq: 50 
  },
  "torture": {
    dict: "happiness", word: "torture", stem: "tortur", anew: "torture",
    avg: [ 6.10, 1.58 ], std: [ 2.77, 1.05 ], fq: 50 
  },
  "kill": {
    dict: "happiness", word: "kill", stem: "kill", anew: "defeated",
    avg: [ 5.09, 1.56 ], std: [ 3.00, 1.05 ], fq: 50 
  },
  "killed": {
    dict: "happiness", word: "killed", stem: "kill", anew: "defeated",
    avg: [ 5.09, 1.56 ], std: [ 3.00, 1.23 ], fq: 50 
  },
  "cancer": {
    dict: "happiness", word: "cancer", stem: "cancer", anew: "cancer",
    avg: [ 6.42, 1.54 ], std: [ 2.83, 1.07 ], fq: 50 
  },
  "death": {
    dict: "happiness", word: "death", stem: "death", anew: "death",
    avg: [ 4.59, 1.54 ], std: [ 3.07, 1.28 ], fq: 50 
  },
  "murder": {
    dict: "happiness", word: "murder", stem: "murder", anew: "murderer",
    avg: [ 7.47, 1.48 ], std: [ 2.18, 1.01 ], fq: 50 
  },
  "rape": {
    dict: "happiness", word: "rape", stem: "rape", anew: "rape",
    avg: [ 6.81, 1.44 ], std: [ 3.17, 0.79 ], fq: 50 
  },
  "suicide": {
    dict: "happiness", word: "suicide", stem: "suicid", anew: "suicide",
    avg: [ 5.73, 1.30 ], std: [ 3.14, 0.84 ], fq: 50 
  },
  "terrorist": {
    dict: "happiness", word: "terrorist", stem: "terrorist", anew: "terrorist",
    avg: [ 7.27, 1.30 ], std: [ 2.38, 0.91 ], fq: 50 
  }
};


function happiness_extend( term, avg, std )

  //  Extend the Happiness dictionary with the given term
  //
  //  term:  Term to add
  //  avg:   Happiness average
  //  std:   Happiness standard deviation
{
  term = term.toLowerCase();

  //  Warning if we're replacing terms rather than adding them

  if ( happiness_term.hasOwnProperty( term ) ) {
    console.log( "happiness_extend(), replacing term " + term );
  }

  happy_term[ term ]= { avg: avg, std: std };
}					// End routine happiness_extend_term


function happiness_find_word( w )

  //  Return the word in the happiness dictionary, or -1 if no such word
  //
  //  w:  Word to search
{
  if ( w.length == 0 ) {		// Empty term?
    return -1;
  }

  if ( happy_term.hasOwnProperty( w ) ) {
    return happy_term[ w ];
  }

  return -1;
}					// End routine happiness_find_word
