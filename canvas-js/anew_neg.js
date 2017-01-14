/*--------------------------------------------------------------------------*/
/*  ANEW_NEG.JS								    */
/*    Routines to calculate ANEW scores using the negated ANEW dictionary,  */
/*    which returns scores for a term when it is seen as negated, e.g.	    */
/*    entry for "happy" gives scores for occurrences of "not ... happy"	    */
/* 									    */
/*    These are calculated using dict.py by:				    */
/* 									    */
/*    1. Examine all terms t_iin all dictionaries, use Wordnet to identify  */
/*       any antonyms a_i for t_i					    */
/*    2. If a_i exist, for each a_i search for it in all dictionaries	    */
/*    3. If no a_i occur in the dictionaries, we cannot estimate a score    */
/*       for negated t_i						    */
/*    4. If one or more a_i occur, statistically aggregate their scores	    */
/*       in the same way we aggregate term scores in a tweet to get an	    */
/*       overall "negated" score for t_i				    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  31-May-16	Christopher G. Healey	Initial implementation		    */
/*--------------------------------------------------------------------------*/

//  Module global variables

//  ANEW description structure:
//  - word, full term
//  - stem, stemmed term
//  - ant, [ term, ... ] antonym terms used to calculate negated score
//  - avg, [ ARO, VAL ] average score (1..9)
//  - std, [ ARO, VAL ] standard deviation score
//  - fq, sum of number of volunteers scoring antonym terms

var  anew_neg_term = {
  "ability": {
    dict: "anew-neg", word: "ability", stem: "abil",
    ant: [ "inability" ],
    avg: [ 3.50, 3.00 ], std: [ 2.28, 1.33 ], fq: 19
  },
  "able": {
    dict: "anew-neg", word: "able", stem: "abl",
    ant: [ "unable" ],
    avg: [ 3.61, 2.96 ], std: [ 2.48, 1.30 ], fq: 20
  },
  "abnormal": {
    dict: "anew-neg", word: "abnormal", stem: "abnorm",
    ant: [ "normal" ],
    avg: [ 2.29, 6.17 ], std: [ 2.03, 2.07 ], fq: 19
  },
  "abolish": {
    dict: "anew-neg", word: "abolish", stem: "abolish",
    ant: [ "establish" ],
    avg: [ 3.62, 5.90 ], std: [ 2.25, 1.52 ], fq: 50
  },
  "abundant": {
    dict: "anew-neg", word: "abundant", stem: "abund",
    ant: [ "scarce" ],
    avg: [ 3.90, 3.37 ], std: [ 2.49, 1.42 ], fq: 19
  },
  "accept": {
    dict: "anew-neg", word: "accept", stem: "accept",
    ant: [ "reject", "refuse" ],
    avg: [ 4.90, 3.28 ], std: [ 2.27, 1.40 ], fq: 72
  },
  "acceptable": {
    dict: "anew-neg", word: "acceptable", stem: "accept",
    ant: [ "unacceptable" ],
    avg: [ 4.43, 3.29 ], std: [ 2.66, 2.12 ], fq: 22
  },
  "acceptance": {
    dict: "anew-neg", word: "acceptance", stem: "accept",
    ant: [ "rejection" ],
    avg: [ 6.37, 2.02 ], std: [ 2.56, 1.33 ], fq: 50
  },
  "accepted": {
    dict: "anew-neg", word: "accepted", stem: "accept",
    ant: [ "reject", "refuse" ],
    avg: [ 4.90, 3.28 ], std: [ 2.27, 1.40 ], fq: 72
  },
  "accessible": {
    dict: "anew-neg", word: "accessible", stem: "access",
    ant: [ "inaccessible" ],
    avg: [ 4.05, 3.82 ], std: [ 2.29, 1.59 ], fq: 21
  },
  "acclaim": {
    dict: "anew-neg", word: "acclaim", stem: "acclaim",
    ant: [ "boo" ],
    avg: [ 3.17, 3.74 ], std: [ 2.23, 1.76 ], fq: 50
  },
  "accord": {
    dict: "anew-neg", word: "accord", stem: "accord",
    ant: [ "disagreement" ],
    avg: [ 3.91, 2.86 ], std: [ 2.54, 1.90 ], fq: 22
  },
  "accurate": {
    dict: "anew-neg", word: "accurate", stem: "accur",
    ant: [ "inaccurate" ],
    avg: [ 3.95, 3.35 ], std: [ 1.99, 1.35 ], fq: 20
  },
  "acknowledge": {
    dict: "anew-neg", word: "acknowledge", stem: "acknowledg",
    ant: [ "deny" ],
    avg: [ 5.63, 3.81 ], std: [ 2.39, 1.72 ], fq: 20
  },
  "acquire": {
    dict: "anew-neg", word: "acquire", stem: "acquir",
    ant: [ "lose" ],
    avg: [ 5.43, 3.59 ], std: [ 2.69, 2.09 ], fq: 21
  },
  "acquired": {
    dict: "anew-neg", word: "acquired", stem: "acquir",
    ant: [ "lose" ],
    avg: [ 5.43, 3.59 ], std: [ 2.69, 2.09 ], fq: 21
  },
  "acquittal": {
    dict: "anew-neg", word: "acquittal", stem: "acquitt",
    ant: [ "conviction" ],
    avg: [ 4.67, 3.89 ], std: [ 2.06, 1.57 ], fq: 18
  },
  "active": {
    dict: "anew-neg", word: "active", stem: "activ",
    ant: [ "passive", "quiet", "extinct" ],
    avg: [ 3.41, 4.20 ], std: [ 2.39, 1.66 ], fq: 119
  },
  "actual": {
    dict: "anew-neg", word: "actual", stem: "actual",
    ant: [ "potential" ],
    avg: [ 4.09, 6.86 ], std: [ 2.50, 1.85 ], fq: 22
  },
  "admit": {
    dict: "anew-neg", word: "admit", stem: "admit",
    ant: [ "deny", "reject", "exclude" ],
    avg: [ 5.05, 3.44 ], std: [ 2.18, 1.68 ], fq: 62
  },
  "admitted": {
    dict: "anew-neg", word: "admitted", stem: "admit",
    ant: [ "deny", "reject", "exclude" ],
    avg: [ 5.05, 3.44 ], std: [ 2.18, 1.68 ], fq: 62
  },
  "adult": {
    dict: "anew-neg", word: "adult", stem: "adult",
    ant: [ "juvenile" ],
    avg: [ 3.85, 3.74 ], std: [ 2.25, 1.91 ], fq: 19
  },
  "adults": {
    dict: "anew-neg", word: "adults", stem: "adult",
    ant: [ "juvenile" ],
    avg: [ 3.85, 3.74 ], std: [ 2.25, 1.91 ], fq: 19
  },
  "advance": {
    dict: "anew-neg", word: "advance", stem: "advanc",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "advanced": {
    dict: "anew-neg", word: "advanced", stem: "advanc",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "advances": {
    dict: "anew-neg", word: "advances", stem: "advanc",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "advantage": {
    dict: "anew-neg", word: "advantage", stem: "advantag",
    ant: [ "disadvantage", "penalty" ],
    avg: [ 4.41, 2.76 ], std: [ 2.03, 1.37 ], fq: 69
  },
  "advantages": {
    dict: "anew-neg", word: "advantages", stem: "advantag",
    ant: [ "disadvantage", "penalty" ],
    avg: [ 4.41, 2.76 ], std: [ 2.03, 1.37 ], fq: 69
  },
  "afraid": {
    dict: "anew-neg", word: "afraid", stem: "afraid",
    ant: [ "unafraid" ],
    avg: [ 3.38, 6.43 ], std: [ 2.32, 2.18 ], fq: 22
  },
  "aggravate": {
    dict: "anew-neg", word: "aggravate", stem: "aggrav",
    ant: [ "better" ],
    avg: [ 4.60, 7.00 ], std: [ 2.67, 1.28 ], fq: 50
  },
  "agitate": {
    dict: "anew-neg", word: "agitate", stem: "agit",
    ant: [ "calm" ],
    avg: [ 2.82, 6.36 ], std: [ 2.13, 1.60 ], fq: 50
  },
  "agree": {
    dict: "anew-neg", word: "agree", stem: "agre",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "agreeable": {
    dict: "anew-neg", word: "agreeable", stem: "agreeabl",
    ant: [ "disagreeable" ],
    avg: [ 4.26, 3.29 ], std: [ 2.60, 2.00 ], fq: 22
  },
  "agreement": {
    dict: "anew-neg", word: "agreement", stem: "agreement",
    ant: [ "disagreement" ],
    avg: [ 3.91, 2.86 ], std: [ 2.54, 1.90 ], fq: 22
  },
  "agreements": {
    dict: "anew-neg", word: "agreements", stem: "agreement",
    ant: [ "disagreement" ],
    avg: [ 3.91, 2.86 ], std: [ 2.54, 1.90 ], fq: 22
  },
  "alien": {
    dict: "anew-neg", word: "alien", stem: "alien",
    ant: [ "citizen" ],
    avg: [ 2.63, 6.43 ], std: [ 2.22, 1.66 ], fq: 20
  },
  "alive": {
    dict: "anew-neg", word: "alive", stem: "aliv",
    ant: [ "dead" ],
    avg: [ 5.73, 2.00 ], std: [ 2.73, 1.32 ], fq: 50
  },
  "allies": {
    dict: "anew-neg", word: "allies", stem: "alli",
    ant: [ "foe" ],
    avg: [ 4.71, 3.15 ], std: [ 2.85, 1.60 ], fq: 22
  },
  "allow": {
    dict: "anew-neg", word: "allow", stem: "allow",
    ant: [ "forbid", "deny" ],
    avg: [ 5.25, 3.25 ], std: [ 2.48, 1.54 ], fq: 44
  },
  "allowed": {
    dict: "anew-neg", word: "allowed", stem: "allow",
    ant: [ "forbid", "deny" ],
    avg: [ 5.25, 3.25 ], std: [ 2.48, 1.54 ], fq: 44
  },
  "allowing": {
    dict: "anew-neg", word: "allowing", stem: "allow",
    ant: [ "forbid", "deny" ],
    avg: [ 5.25, 3.25 ], std: [ 2.48, 1.54 ], fq: 44
  },
  "allows": {
    dict: "anew-neg", word: "allows", stem: "allow",
    ant: [ "forbid", "deny" ],
    avg: [ 5.25, 3.25 ], std: [ 2.48, 1.54 ], fq: 44
  },
  "ally": {
    dict: "anew-neg", word: "ally", stem: "alli",
    ant: [ "foe" ],
    avg: [ 4.71, 3.15 ], std: [ 2.85, 1.60 ], fq: 22
  },
  "annul": {
    dict: "anew-neg", word: "annul", stem: "annul",
    ant: [ "validate" ],
    avg: [ 4.05, 6.50 ], std: [ 1.88, 1.70 ], fq: 20
  },
  "answer": {
    dict: "anew-neg", word: "answer", stem: "answer",
    ant: [ "question" ],
    avg: [ 5.00, 4.98 ], std: [ 2.23, 1.73 ], fq: 50
  },
  "answers": {
    dict: "anew-neg", word: "answers", stem: "answer",
    ant: [ "question" ],
    avg: [ 5.00, 4.98 ], std: [ 2.23, 1.73 ], fq: 50
  },
  "appeal": {
    dict: "anew-neg", word: "appeal", stem: "appeal",
    ant: [ "repel" ],
    avg: [ 4.43, 3.67 ], std: [ 2.25, 1.96 ], fq: 21
  },
  "appeals": {
    dict: "anew-neg", word: "appeals", stem: "appeal",
    ant: [ "repel" ],
    avg: [ 4.43, 3.67 ], std: [ 2.25, 1.96 ], fq: 21
  },
  "appearance": {
    dict: "anew-neg", word: "appearance", stem: "appear",
    ant: [ "disappearance" ],
    avg: [ 4.95, 3.75 ], std: [ 2.25, 1.65 ], fq: 20
  },
  "applaud": {
    dict: "anew-neg", word: "applaud", stem: "applaud",
    ant: [ "boo" ],
    avg: [ 3.17, 3.74 ], std: [ 2.23, 1.76 ], fq: 50
  },
  "appropriate": {
    dict: "anew-neg", word: "appropriate", stem: "appropri",
    ant: [ "inappropriate" ],
    avg: [ 4.95, 3.70 ], std: [ 2.55, 1.94 ], fq: 22
  },
  "approval": {
    dict: "anew-neg", word: "approval", stem: "approv",
    ant: [ "disapproval" ],
    avg: [ 4.23, 3.40 ], std: [ 2.22, 1.82 ], fq: 21
  },
  "approve": {
    dict: "anew-neg", word: "approve", stem: "approv",
    ant: [ "disapprove" ],
    avg: [ 3.81, 3.55 ], std: [ 2.40, 0.94 ], fq: 20
  },
  "arise": {
    dict: "anew-neg", word: "arise", stem: "aris",
    ant: [ "fall" ],
    avg: [ 4.70, 4.04 ], std: [ 2.48, 1.97 ], fq: 50
  },
  "armed": {
    dict: "anew-neg", word: "armed", stem: "arm",
    ant: [ "unarmed" ],
    avg: [ 3.64, 3.74 ], std: [ 1.97, 1.76 ], fq: 20
  },
  "arrive": {
    dict: "anew-neg", word: "arrive", stem: "arriv",
    ant: [ "leave" ],
    avg: [ 3.82, 4.52 ], std: [ 2.24, 1.33 ], fq: 50
  },
  "artificial": {
    dict: "anew-neg", word: "artificial", stem: "artifici",
    ant: [ "natural" ],
    avg: [ 4.37, 6.56 ], std: [ 2.51, 1.49 ], fq: 50
  },
  "ascend": {
    dict: "anew-neg", word: "ascend", stem: "ascend",
    ant: [ "set" ],
    avg: [ 4.05, 5.58 ], std: [ 1.89, 1.20 ], fq: 50
  },
  "asleep": {
    dict: "anew-neg", word: "asleep", stem: "asleep",
    ant: [ "awake" ],
    avg: [ 6.85, 5.74 ], std: [ 2.53, 1.47 ], fq: 50
  },
  "asset": {
    dict: "anew-neg", word: "asset", stem: "asset",
    ant: [ "liability" ],
    avg: [ 4.58, 3.45 ], std: [ 2.04, 2.04 ], fq: 20
  },
  "assure": {
    dict: "anew-neg", word: "assure", stem: "assur",
    ant: [ "worry" ],
    avg: [ 5.07, 2.82 ], std: [ 2.74, 1.71 ], fq: 50
  },
  "assured": {
    dict: "anew-neg", word: "assured", stem: "assur",
    ant: [ "worry" ],
    avg: [ 5.07, 2.82 ], std: [ 2.74, 1.71 ], fq: 50
  },
  "attack": {
    dict: "anew-neg", word: "attack", stem: "attack",
    ant: [ "defend" ],
    avg: [ 5.85, 5.22 ], std: [ 3.15, 1.72 ], fq: 50
  },
  "attacked": {
    dict: "anew-neg", word: "attacked", stem: "attack",
    ant: [ "defend" ],
    avg: [ 5.85, 5.22 ], std: [ 3.15, 1.72 ], fq: 50
  },
  "attacks": {
    dict: "anew-neg", word: "attacks", stem: "attack",
    ant: [ "defend" ],
    avg: [ 5.85, 5.22 ], std: [ 3.15, 1.72 ], fq: 50
  },
  "attract": {
    dict: "anew-neg", word: "attract", stem: "attract",
    ant: [ "repel" ],
    avg: [ 4.43, 3.67 ], std: [ 2.25, 1.96 ], fq: 21
  },
  "attractive": {
    dict: "anew-neg", word: "attractive", stem: "attract",
    ant: [ "unattractive", "repulsive" ],
    avg: [ 4.74, 2.17 ], std: [ 2.28, 1.16 ], fq: 42
  },
  "audible": {
    dict: "anew-neg", word: "audible", stem: "audibl",
    ant: [ "inaudible" ],
    avg: [ 3.33, 3.61 ], std: [ 2.55, 1.58 ], fq: 21
  },
  "aunt": {
    dict: "anew-neg", word: "aunt", stem: "aunt",
    ant: [ "uncle" ],
    avg: [ 4.05, 6.50 ], std: [ 2.33, 1.57 ], fq: 21
  },
  "auntie": {
    dict: "anew-neg", word: "auntie", stem: "aunti",
    ant: [ "uncle" ],
    avg: [ 4.05, 6.50 ], std: [ 2.33, 1.57 ], fq: 21
  },
  "available": {
    dict: "anew-neg", word: "available", stem: "avail",
    ant: [ "unavailable" ],
    avg: [ 3.85, 3.52 ], std: [ 2.35, 1.89 ], fq: 20
  },
  "awake": {
    dict: "anew-neg", word: "awake", stem: "awak",
    ant: [ "asleep" ],
    avg: [ 2.00, 6.50 ], std: [ 2.43, 1.89 ], fq: 19
  },
  "aware": {
    dict: "anew-neg", word: "aware", stem: "awar",
    ant: [ "unaware" ],
    avg: [ 4.10, 3.89 ], std: [ 2.00, 1.59 ], fq: 20
  },
  "awful": {
    dict: "anew-neg", word: "awful", stem: "aw",
    ant: [ "nice" ],
    avg: [ 4.38, 7.38 ], std: [ 2.69, 1.51 ], fq: 50
  },
  "awkward": {
    dict: "anew-neg", word: "awkward", stem: "awkward",
    ant: [ "graceful" ],
    avg: [ 4.00, 6.95 ], std: [ 2.97, 1.05 ], fq: 20
  },
  "back": {
    dict: "anew-neg", word: "back", stem: "back",
    ant: [ "front", "advance" ],
    avg: [ 6.39, 6.03 ], std: [ 2.17, 1.21 ], fq: 100
  },
  "backed": {
    dict: "anew-neg", word: "backed", stem: "back",
    ant: [ "advance", "front" ],
    avg: [ 6.39, 6.03 ], std: [ 2.17, 1.21 ], fq: 100
  },
  "backs": {
    dict: "anew-neg", word: "backs", stem: "back",
    ant: [ "front", "advance" ],
    avg: [ 6.39, 6.03 ], std: [ 2.17, 1.21 ], fq: 100
  },
  "bad": {
    dict: "anew-neg", word: "bad", stem: "bad",
    ant: [ "good", "goodness" ],
    avg: [ 5.43, 7.40 ], std: [ 2.85, 1.42 ], fq: 100
  },
  "badly": {
    dict: "anew-neg", word: "badly", stem: "badli",
    ant: [ "well" ],
    avg: [ 5.43, 6.68 ], std: [ 2.85, 1.25 ], fq: 50
  },
  "badness": {
    dict: "anew-neg", word: "badness", stem: "bad",
    ant: [ "good", "goodness" ],
    avg: [ 5.43, 7.40 ], std: [ 2.85, 1.42 ], fq: 100
  },
  "balance": {
    dict: "anew-neg", word: "balance", stem: "balanc",
    ant: [ "imbalance" ],
    avg: [ 4.58, 3.90 ], std: [ 2.19, 1.92 ], fq: 20
  },
  "bank": {
    dict: "anew-neg", word: "bank", stem: "bank",
    ant: [ "distrust" ],
    avg: [ 4.05, 2.95 ], std: [ 2.77, 2.28 ], fq: 20
  },
  "banking": {
    dict: "anew-neg", word: "banking", stem: "bank",
    ant: [ "distrust" ],
    avg: [ 4.05, 2.95 ], std: [ 2.77, 2.28 ], fq: 20
  },
  "banks": {
    dict: "anew-neg", word: "banks", stem: "bank",
    ant: [ "distrust" ],
    avg: [ 4.05, 2.95 ], std: [ 2.77, 2.28 ], fq: 20
  },
  "bare": {
    dict: "anew-neg", word: "bare", stem: "bare",
    ant: [ "covered" ],
    avg: [ 5.28, 5.92 ], std: [ 2.51, 1.01 ], fq: 50
  },
  "bear": {
    dict: "anew-neg", word: "bear", stem: "bear",
    ant: [ "bull" ],
    avg: [ 4.20, 4.62 ], std: [ 2.42, 1.31 ], fq: 50
  },
  "bears": {
    dict: "anew-neg", word: "bears", stem: "bear",
    ant: [ "bull" ],
    avg: [ 4.20, 4.62 ], std: [ 2.42, 1.31 ], fq: 50
  },
  "beautiful": {
    dict: "anew-neg", word: "beautiful", stem: "beauti",
    ant: [ "ugly" ],
    avg: [ 5.38, 2.74 ], std: [ 2.23, 1.44 ], fq: 50
  },
  "beauty": {
    dict: "anew-neg", word: "beauty", stem: "beauti",
    ant: [ "ugliness" ],
    avg: [ 4.43, 2.75 ], std: [ 2.52, 1.92 ], fq: 20
  },
  "begin": {
    dict: "anew-neg", word: "begin", stem: "begin",
    ant: [ "end" ],
    avg: [ 4.59, 4.36 ], std: [ 3.07, 1.74 ], fq: 50
  },
  "beginning": {
    dict: "anew-neg", word: "beginning", stem: "begin",
    ant: [ "end", "finish" ],
    avg: [ 4.15, 5.36 ], std: [ 2.76, 1.78 ], fq: 71
  },
  "begrudge": {
    dict: "anew-neg", word: "begrudge", stem: "begrudg",
    ant: [ "wish" ],
    avg: [ 5.16, 6.92 ], std: [ 2.62, 1.50 ], fq: 50
  },
  "behave": {
    dict: "anew-neg", word: "behave", stem: "behav",
    ant: [ "misbehave" ],
    avg: [ 4.28, 3.79 ], std: [ 2.59, 1.55 ], fq: 18
  },
  "believable": {
    dict: "anew-neg", word: "believable", stem: "believ",
    ant: [ "incredible" ],
    avg: [ 6.35, 7.59 ], std: [ 2.87, 2.11 ], fq: 21
  },
  "belittle": {
    dict: "anew-neg", word: "belittle", stem: "belittl",
    ant: [ "flatter" ],
    avg: [ 4.61, 6.10 ], std: [ 2.83, 2.10 ], fq: 19
  },
  "bend": {
    dict: "anew-neg", word: "bend", stem: "bend",
    ant: [ "straighten" ],
    avg: [ 3.00, 6.26 ], std: [ 2.30, 1.76 ], fq: 20
  },
  "bent": {
    dict: "anew-neg", word: "bent", stem: "bent",
    ant: [ "straighten" ],
    avg: [ 3.00, 6.26 ], std: [ 2.30, 1.76 ], fq: 20
  },
  "best": {
    dict: "anew-neg", word: "best", stem: "best",
    ant: [ "worst", "bad", "evil", "ill", "badly" ],
    avg: [ 5.44, 2.36 ], std: [ 2.31, 1.39 ], fq: 250
  },
  "better": {
    dict: "anew-neg", word: "better", stem: "better",
    ant: [ "worse", "bad", "evil", "ill", "badly" ],
    avg: [ 5.44, 2.48 ], std: [ 2.31, 1.41 ], fq: 250
  },
  "big": {
    dict: "anew-neg", word: "big", stem: "big",
    ant: [ "small" ],
    avg: [ 3.98, 4.52 ], std: [ 2.24, 1.36 ], fq: 50
  },
  "bigger": {
    dict: "anew-neg", word: "bigger", stem: "bigger",
    ant: [ "small" ],
    avg: [ 3.98, 4.52 ], std: [ 2.24, 1.36 ], fq: 50
  },
  "biggest": {
    dict: "anew-neg", word: "biggest", stem: "biggest",
    ant: [ "small" ],
    avg: [ 3.98, 4.52 ], std: [ 2.24, 1.36 ], fq: 50
  },
  "birth": {
    dict: "anew-neg", word: "birth", stem: "birth",
    ant: [ "death" ],
    avg: [ 4.59, 1.54 ], std: [ 3.07, 1.28 ], fq: 50
  },
  "black": {
    dict: "anew-neg", word: "black", stem: "black",
    ant: [ "white" ],
    avg: [ 4.37, 6.28 ], std: [ 2.14, 1.54 ], fq: 50
  },
  "blackness": {
    dict: "anew-neg", word: "blackness", stem: "black",
    ant: [ "white" ],
    avg: [ 4.37, 6.28 ], std: [ 2.14, 1.54 ], fq: 50
  },
  "blacks": {
    dict: "anew-neg", word: "blacks", stem: "black",
    ant: [ "white" ],
    avg: [ 4.37, 6.28 ], std: [ 2.14, 1.54 ], fq: 50
  },
  "bless": {
    dict: "anew-neg", word: "bless", stem: "bless",
    ant: [ "curse", "desecrate" ],
    avg: [ 4.70, 2.99 ], std: [ 2.58, 1.84 ], fq: 42
  },
  "blessed": {
    dict: "anew-neg", word: "blessed", stem: "bless",
    ant: [ "curse", "desecrate" ],
    avg: [ 4.70, 2.99 ], std: [ 2.58, 1.84 ], fq: 42
  },
  "blessing": {
    dict: "anew-neg", word: "blessing", stem: "bless",
    ant: [ "disapproval", "curse", "desecrate" ],
    avg: [ 4.53, 3.12 ], std: [ 2.46, 1.83 ], fq: 63
  },
  "blessings": {
    dict: "anew-neg", word: "blessings", stem: "bless",
    ant: [ "disapproval", "curse", "desecrate" ],
    avg: [ 4.53, 3.12 ], std: [ 2.46, 1.83 ], fq: 63
  },
  "block": {
    dict: "anew-neg", word: "block", stem: "block",
    ant: [ "free", "remember" ],
    avg: [ 3.91, 7.24 ], std: [ 2.53, 1.28 ], fq: 71
  },
  "blocked": {
    dict: "anew-neg", word: "blocked", stem: "block",
    ant: [ "free", "remember" ],
    avg: [ 3.91, 7.24 ], std: [ 2.53, 1.28 ], fq: 71
  },
  "blocks": {
    dict: "anew-neg", word: "blocks", stem: "block",
    ant: [ "free", "remember" ],
    avg: [ 3.91, 7.24 ], std: [ 2.53, 1.28 ], fq: 71
  },
  "bold": {
    dict: "anew-neg", word: "bold", stem: "bold",
    ant: [ "timid" ],
    avg: [ 3.15, 3.37 ], std: [ 1.84, 1.95 ], fq: 19
  },
  "bomb": {
    dict: "anew-neg", word: "bomb", stem: "bomb",
    ant: [ "pass" ],
    avg: [ 4.70, 5.90 ], std: [ 2.48, 1.43 ], fq: 50
  },
  "bombing": {
    dict: "anew-neg", word: "bombing", stem: "bomb",
    ant: [ "pass" ],
    avg: [ 4.70, 5.90 ], std: [ 2.48, 1.43 ], fq: 50
  },
  "bombs": {
    dict: "anew-neg", word: "bombs", stem: "bomb",
    ant: [ "pass" ],
    avg: [ 4.70, 5.90 ], std: [ 2.48, 1.43 ], fq: 50
  },
  "boo": {
    dict: "anew-neg", word: "boo", stem: "boo",
    ant: [ "applaud" ],
    avg: [ 5.05, 6.70 ], std: [ 1.75, 1.17 ], fq: 19
  },
  "bore": {
    dict: "anew-neg", word: "bore", stem: "bore",
    ant: [ "interest" ],
    avg: [ 5.66, 6.36 ], std: [ 2.26, 1.54 ], fq: 50
  },
  "bored": {
    dict: "anew-neg", word: "bored", stem: "bore",
    ant: [ "interest" ],
    avg: [ 5.66, 6.36 ], std: [ 2.26, 1.54 ], fq: 50
  },
  "boring": {
    dict: "anew-neg", word: "boring", stem: "bore",
    ant: [ "interest" ],
    avg: [ 5.66, 6.36 ], std: [ 2.26, 1.54 ], fq: 50
  },
  "bottom": {
    dict: "anew-neg", word: "bottom", stem: "bottom",
    ant: [ "top", "side" ],
    avg: [ 4.69, 5.65 ], std: [ 2.36, 1.19 ], fq: 100
  },
  "bought": {
    dict: "anew-neg", word: "bought", stem: "bought",
    ant: [ "sell" ],
    avg: [ 7.24, 5.48 ], std: [ 2.06, 1.13 ], fq: 50
  },
  "bounce": {
    dict: "anew-neg", word: "bounce", stem: "bounc",
    ant: [ "clear" ],
    avg: [ 2.71, 6.14 ], std: [ 1.71, 1.70 ], fq: 21
  },
  "bound": {
    dict: "anew-neg", word: "bound", stem: "bound",
    ant: [ "free" ],
    avg: [ 5.15, 7.96 ], std: [ 3.04, 1.26 ], fq: 50
  },
  "boy": {
    dict: "anew-neg", word: "boy", stem: "boy",
    ant: [ "girl", "daughter" ],
    avg: [ 4.29, 7.02 ], std: [ 2.69, 1.52 ], fq: 100
  },
  "boys": {
    dict: "anew-neg", word: "boys", stem: "boy",
    ant: [ "girl", "daughter" ],
    avg: [ 4.29, 7.02 ], std: [ 2.69, 1.52 ], fq: 100
  },
  "brave": {
    dict: "anew-neg", word: "brave", stem: "brave",
    ant: [ "timid", "cowardly" ],
    avg: [ 4.12, 3.08 ], std: [ 1.89, 1.78 ], fq: 39
  },
  "bravery": {
    dict: "anew-neg", word: "bravery", stem: "braveri",
    ant: [ "cowardice", "fear" ],
    avg: [ 5.27, 2.69 ], std: [ 2.24, 1.29 ], fq: 69
  },
  "breach": {
    dict: "anew-neg", word: "breach", stem: "breach",
    ant: [ "keep" ],
    avg: [ 5.53, 5.86 ], std: [ 2.90, 1.07 ], fq: 50
  },
  "break": {
    dict: "anew-neg", word: "break", stem: "break",
    ant: [ "repair", "keep", "make", "promote" ],
    avg: [ 5.44, 6.01 ], std: [ 2.60, 1.28 ], fq: 200
  },
  "breaking": {
    dict: "anew-neg", word: "breaking", stem: "break",
    ant: [ "repair", "keep", "make", "promote" ],
    avg: [ 5.44, 6.01 ], std: [ 2.60, 1.28 ], fq: 200
  },
  "breaks": {
    dict: "anew-neg", word: "breaks", stem: "break",
    ant: [ "repair", "keep", "make", "promote" ],
    avg: [ 5.44, 6.01 ], std: [ 2.60, 1.28 ], fq: 200
  },
  "bright": {
    dict: "anew-neg", word: "bright", stem: "bright",
    ant: [ "dull" ],
    avg: [ 2.83, 3.24 ], std: [ 2.31, 1.22 ], fq: 50
  },
  "brighten": {
    dict: "anew-neg", word: "brighten", stem: "brighten",
    ant: [ "overcast" ],
    avg: [ 3.46, 4.68 ], std: [ 1.92, 1.66 ], fq: 50
  },
  "brighter": {
    dict: "anew-neg", word: "brighter", stem: "brighter",
    ant: [ "dull" ],
    avg: [ 2.83, 3.24 ], std: [ 2.31, 1.22 ], fq: 50
  },
  "broke": {
    dict: "anew-neg", word: "broke", stem: "broke",
    ant: [ "repair", "keep", "make", "promote" ],
    avg: [ 5.44, 6.01 ], std: [ 2.60, 1.28 ], fq: 200
  },
  "broken": {
    dict: "anew-neg", word: "broken", stem: "broken",
    ant: [ "repair", "keep", "make", "promote" ],
    avg: [ 5.44, 6.01 ], std: [ 2.60, 1.28 ], fq: 200
  },
  "brother": {
    dict: "anew-neg", word: "brother", stem: "brother",
    ant: [ "sister" ],
    avg: [ 5.53, 6.76 ], std: [ 2.80, 1.65 ], fq: 50
  },
  "brothers": {
    dict: "anew-neg", word: "brothers", stem: "brother",
    ant: [ "sister" ],
    avg: [ 5.53, 6.76 ], std: [ 2.80, 1.65 ], fq: 50
  },
  "brunette": {
    dict: "anew-neg", word: "brunette", stem: "brunett",
    ant: [ "blond" ],
    avg: [ 3.00, 6.08 ], std: [ 2.25, 1.95 ], fq: 29
  },
  "bull": {
    dict: "anew-neg", word: "bull", stem: "bull",
    ant: [ "bear" ],
    avg: [ 5.40, 5.86 ], std: [ 2.70, 1.85 ], fq: 50
  },
  "bump": {
    dict: "anew-neg", word: "bump", stem: "bump",
    ant: [ "promote" ],
    avg: [ 6.44, 6.92 ], std: [ 2.58, 1.07 ], fq: 50
  },
  "bury": {
    dict: "anew-neg", word: "bury", stem: "buri",
    ant: [ "remember" ],
    avg: [ 3.14, 6.50 ], std: [ 1.88, 1.30 ], fq: 21
  },
  "busted": {
    dict: "anew-neg", word: "busted", stem: "bust",
    ant: [ "repair" ],
    avg: [ 5.86, 4.76 ], std: [ 2.70, 1.82 ], fq: 50
  },
  "buy": {
    dict: "anew-neg", word: "buy", stem: "buy",
    ant: [ "sell" ],
    avg: [ 7.24, 5.48 ], std: [ 2.06, 1.13 ], fq: 50
  },
  "buying": {
    dict: "anew-neg", word: "buying", stem: "buy",
    ant: [ "sell" ],
    avg: [ 7.24, 5.48 ], std: [ 2.06, 1.13 ], fq: 50
  },
  "calm": {
    dict: "anew-neg", word: "calm", stem: "calm",
    ant: [ "agitate", "stimulate" ],
    avg: [ 5.91, 5.46 ], std: [ 2.66, 1.61 ], fq: 41
  },
  "came": {
    dict: "anew-neg", word: "came", stem: "came",
    ant: [ "go", "leave" ],
    avg: [ 5.74, 5.06 ], std: [ 2.09, 1.26 ], fq: 100
  },
  "can": {
    dict: "anew-neg", word: "can", stem: "can",
    ant: [ "hire" ],
    avg: [ 6.77, 6.50 ], std: [ 2.07, 1.34 ], fq: 50
  },
  "capable": {
    dict: "anew-neg", word: "capable", stem: "capabl",
    ant: [ "incapable" ],
    avg: [ 3.90, 3.55 ], std: [ 2.49, 1.50 ], fq: 21
  },
  "capitalism": {
    dict: "anew-neg", word: "capitalism", stem: "capit",
    ant: [ "socialism" ],
    avg: [ 4.98, 4.96 ], std: [ 2.59, 2.27 ], fq: 50
  },
  "careful": {
    dict: "anew-neg", word: "careful", stem: "care",
    ant: [ "careless" ],
    avg: [ 4.27, 3.53 ], std: [ 2.03, 1.81 ], fq: 20
  },
  "careless": {
    dict: "anew-neg", word: "careless", stem: "careless",
    ant: [ "careful" ],
    avg: [ 2.95, 6.32 ], std: [ 1.99, 1.78 ], fq: 21
  },
  "cautious": {
    dict: "anew-neg", word: "cautious", stem: "cautiou",
    ant: [ "brave" ],
    avg: [ 6.15, 7.02 ], std: [ 2.45, 1.29 ], fq: 50
  },
  "cease": {
    dict: "anew-neg", word: "cease", stem: "ceas",
    ant: [ "begin" ],
    avg: [ 2.85, 6.44 ], std: [ 2.23, 2.04 ], fq: 19
  },
  "center": {
    dict: "anew-neg", word: "center", stem: "center",
    ant: [ "left" ],
    avg: [ 4.27, 4.64 ], std: [ 2.46, 1.44 ], fq: 50
  },
  "certain": {
    dict: "anew-neg", word: "certain", stem: "certain",
    ant: [ "uncertain", "unsure" ],
    avg: [ 4.50, 3.49 ], std: [ 2.00, 1.39 ], fq: 41
  },
  "certainty": {
    dict: "anew-neg", word: "certainty", stem: "certainti",
    ant: [ "uncertainty" ],
    avg: [ 5.27, 3.30 ], std: [ 2.53, 1.69 ], fq: 22
  },
  "charge": {
    dict: "anew-neg", word: "charge", stem: "charg",
    ant: [ "discharge", "calm" ],
    avg: [ 5.03, 5.26 ], std: [ 2.10, 1.69 ], fq: 100
  },
  "charged": {
    dict: "anew-neg", word: "charged", stem: "charg",
    ant: [ "discharge", "calm" ],
    avg: [ 5.03, 5.26 ], std: [ 2.10, 1.69 ], fq: 100
  },
  "charges": {
    dict: "anew-neg", word: "charges", stem: "charg",
    ant: [ "discharge", "calm" ],
    avg: [ 5.03, 5.26 ], std: [ 2.10, 1.69 ], fq: 100
  },
  "check": {
    dict: "anew-neg", word: "check", stem: "check",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "checked": {
    dict: "anew-neg", word: "checked", stem: "check",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "checking": {
    dict: "anew-neg", word: "checking", stem: "check",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "checks": {
    dict: "anew-neg", word: "checks", stem: "check",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "cheer": {
    dict: "anew-neg", word: "cheer", stem: "cheer",
    ant: [ "complain" ],
    avg: [ 3.52, 3.16 ], std: [ 2.05, 1.56 ], fq: 50
  },
  "cheerful": {
    dict: "anew-neg", word: "cheerful", stem: "cheer",
    ant: [ "depressing" ],
    avg: [ 4.54, 1.90 ], std: [ 3.19, 1.22 ], fq: 50
  },
  "cheers": {
    dict: "anew-neg", word: "cheers", stem: "cheer",
    ant: [ "complain" ],
    avg: [ 3.52, 3.16 ], std: [ 2.05, 1.56 ], fq: 50
  },
  "child": {
    dict: "anew-neg", word: "child", stem: "child",
    ant: [ "parent" ],
    avg: [ 4.14, 6.73 ], std: [ 2.63, 1.91 ], fq: 21
  },
  "children": {
    dict: "anew-neg", word: "children", stem: "children",
    ant: [ "parent" ],
    avg: [ 4.14, 6.73 ], std: [ 2.63, 1.91 ], fq: 21
  },
  "chill": {
    dict: "anew-neg", word: "chill", stem: "chill",
    ant: [ "heat" ],
    avg: [ 7.26, 4.16 ], std: [ 2.57, 1.82 ], fq: 50
  },
  "chills": {
    dict: "anew-neg", word: "chills", stem: "chill",
    ant: [ "heat" ],
    avg: [ 7.26, 4.16 ], std: [ 2.57, 1.82 ], fq: 50
  },
  "claim": {
    dict: "anew-neg", word: "claim", stem: "claim",
    ant: [ "forfeit" ],
    avg: [ 4.74, 3.68 ], std: [ 2.65, 1.57 ], fq: 21
  },
  "claimed": {
    dict: "anew-neg", word: "claimed", stem: "claim",
    ant: [ "forfeit" ],
    avg: [ 4.74, 3.68 ], std: [ 2.65, 1.57 ], fq: 21
  },
  "claims": {
    dict: "anew-neg", word: "claims", stem: "claim",
    ant: [ "forfeit" ],
    avg: [ 4.74, 3.68 ], std: [ 2.65, 1.57 ], fq: 21
  },
  "clap": {
    dict: "anew-neg", word: "clap", stem: "clap",
    ant: [ "boo" ],
    avg: [ 3.17, 3.74 ], std: [ 2.23, 1.76 ], fq: 50
  },
  "clean": {
    dict: "anew-neg", word: "clean", stem: "clean",
    ant: [ "dirty", "unclean" ],
    avg: [ 4.52, 3.08 ], std: [ 2.43, 1.62 ], fq: 72
  },
  "clear": {
    dict: "anew-neg", word: "clear", stem: "clear",
    ant: [ "clutter", "overcast", "bounce", "convict", "unclear", "cloudy" ],
    avg: [ 4.29, 4.30 ], std: [ 2.21, 1.65 ], fq: 212
  },
  "closeness": {
    dict: "anew-neg", word: "closeness", stem: "close",
    ant: [ "openness" ],
    avg: [ 4.37, 6.52 ], std: [ 2.69, 2.42 ], fq: 20
  },
  "clothes": {
    dict: "anew-neg", word: "clothes", stem: "cloth",
    ant: [ "undress" ],
    avg: [ 5.96, 6.14 ], std: [ 2.77, 1.74 ], fq: 22
  },
  "clothing": {
    dict: "anew-neg", word: "clothing", stem: "cloth",
    ant: [ "undress" ],
    avg: [ 5.96, 6.14 ], std: [ 2.77, 1.74 ], fq: 22
  },
  "cloudy": {
    dict: "anew-neg", word: "cloudy", stem: "cloudi",
    ant: [ "clear" ],
    avg: [ 2.71, 6.14 ], std: [ 1.71, 1.70 ], fq: 21
  },
  "coarse": {
    dict: "anew-neg", word: "coarse", stem: "coars",
    ant: [ "fine" ],
    avg: [ 3.86, 6.50 ], std: [ 2.43, 1.41 ], fq: 21
  },
  "cold": {
    dict: "anew-neg", word: "cold", stem: "cold",
    ant: [ "hot" ],
    avg: [ 4.10, 5.02 ], std: [ 2.34, 1.92 ], fq: 50
  },
  "colder": {
    dict: "anew-neg", word: "colder", stem: "colder",
    ant: [ "hot" ],
    avg: [ 4.10, 5.02 ], std: [ 2.34, 1.92 ], fq: 50
  },
  "come": {
    dict: "anew-neg", word: "come", stem: "come",
    ant: [ "go", "leave" ],
    avg: [ 5.74, 5.06 ], std: [ 2.09, 1.26 ], fq: 100
  },
  "comedy": {
    dict: "anew-neg", word: "comedy", stem: "comedi",
    ant: [ "tragedy" ],
    avg: [ 6.24, 2.06 ], std: [ 2.64, 1.38 ], fq: 50
  },
  "comes": {
    dict: "anew-neg", word: "comes", stem: "come",
    ant: [ "go", "leave" ],
    avg: [ 5.74, 5.06 ], std: [ 2.09, 1.26 ], fq: 100
  },
  "comfort": {
    dict: "anew-neg", word: "comfort", stem: "comfort",
    ant: [ "discomfort" ],
    avg: [ 4.43, 2.84 ], std: [ 2.42, 0.83 ], fq: 30
  },
  "comfortable": {
    dict: "anew-neg", word: "comfortable", stem: "comfort",
    ant: [ "uncomfortable" ],
    avg: [ 5.50, 2.70 ], std: [ 2.21, 1.56 ], fq: 22
  },
  "comfy": {
    dict: "anew-neg", word: "comfy", stem: "comfi",
    ant: [ "uncomfortable" ],
    avg: [ 5.50, 2.70 ], std: [ 2.21, 1.56 ], fq: 22
  },
  "coming": {
    dict: "anew-neg", word: "coming", stem: "come",
    ant: [ "go", "leave" ],
    avg: [ 5.74, 5.06 ], std: [ 2.09, 1.26 ], fq: 100
  },
  "commendation": {
    dict: "anew-neg", word: "commendation", stem: "commend",
    ant: [ "disapproval" ],
    avg: [ 4.23, 3.40 ], std: [ 2.22, 1.82 ], fq: 21
  },
  "common": {
    dict: "anew-neg", word: "common", stem: "common",
    ant: [ "individual" ],
    avg: [ 4.19, 5.72 ], std: [ 2.45, 1.37 ], fq: 50
  },
  "compatible": {
    dict: "anew-neg", word: "compatible", stem: "compat",
    ant: [ "incompatible" ],
    avg: [ 3.61, 3.20 ], std: [ 2.79, 1.11 ], fq: 19
  },
  "compensate": {
    dict: "anew-neg", word: "compensate", stem: "compens",
    ant: [ "wrong" ],
    avg: [ 5.57, 3.14 ], std: [ 2.26, 0.97 ], fq: 50
  },
  "competence": {
    dict: "anew-neg", word: "competence", stem: "compet",
    ant: [ "incompetence" ],
    avg: [ 5.17, 2.26 ], std: [ 2.75, 1.19 ], fq: 18
  },
  "competent": {
    dict: "anew-neg", word: "competent", stem: "compet",
    ant: [ "incompetent" ],
    avg: [ 4.50, 2.77 ], std: [ 1.98, 2.14 ], fq: 20
  },
  "competition": {
    dict: "anew-neg", word: "competition", stem: "competit",
    ant: [ "cooperation" ],
    avg: [ 3.32, 6.62 ], std: [ 2.29, 1.60 ], fq: 23
  },
  "complain": {
    dict: "anew-neg", word: "complain", stem: "complain",
    ant: [ "cheer" ],
    avg: [ 6.12, 7.46 ], std: [ 2.45, 1.68 ], fq: 50
  },
  "complained": {
    dict: "anew-neg", word: "complained", stem: "complain",
    ant: [ "cheer" ],
    avg: [ 6.12, 7.46 ], std: [ 2.45, 1.68 ], fq: 50
  },
  "complaining": {
    dict: "anew-neg", word: "complaining", stem: "complain",
    ant: [ "cheer" ],
    avg: [ 6.12, 7.46 ], std: [ 2.45, 1.68 ], fq: 50
  },
  "complete": {
    dict: "anew-neg", word: "complete", stem: "complet",
    ant: [ "incomplete" ],
    avg: [ 4.12, 3.55 ], std: [ 2.19, 1.64 ], fq: 22
  },
  "complicate": {
    dict: "anew-neg", word: "complicate", stem: "complic",
    ant: [ "simplify" ],
    avg: [ 3.10, 6.35 ], std: [ 2.59, 1.35 ], fq: 20
  },
  "complicated": {
    dict: "anew-neg", word: "complicated", stem: "complic",
    ant: [ "simplify" ],
    avg: [ 3.10, 6.35 ], std: [ 2.59, 1.35 ], fq: 20
  },
  "con": {
    dict: "anew-neg", word: "con", stem: "con",
    ant: [ "pro" ],
    avg: [ 3.81, 6.36 ], std: [ 2.46, 1.71 ], fq: 21
  },
  "conceal": {
    dict: "anew-neg", word: "conceal", stem: "conceal",
    ant: [ "show" ],
    avg: [ 5.12, 6.24 ], std: [ 2.39, 1.49 ], fq: 50
  },
  "concentrated": {
    dict: "anew-neg", word: "concentrated", stem: "concentr",
    ant: [ "soft" ],
    avg: [ 4.63, 6.48 ], std: [ 2.61, 1.22 ], fq: 50
  },
  "condemnation": {
    dict: "anew-neg", word: "condemnation", stem: "condemn",
    ant: [ "acquittal" ],
    avg: [ 4.95, 6.19 ], std: [ 2.31, 1.72 ], fq: 20
  },
  "confine": {
    dict: "anew-neg", word: "confine", stem: "confin",
    ant: [ "free" ],
    avg: [ 5.15, 7.96 ], std: [ 3.04, 1.26 ], fq: 50
  },
  "confined": {
    dict: "anew-neg", word: "confined", stem: "confin",
    ant: [ "free", "invasive" ],
    avg: [ 5.81, 5.92 ], std: [ 2.65, 1.52 ], fq: 69
  },
  "connect": {
    dict: "anew-neg", word: "connect", stem: "connect",
    ant: [ "disconnect" ],
    avg: [ 3.12, 3.81 ], std: [ 2.49, 1.29 ], fq: 22
  },
  "connected": {
    dict: "anew-neg", word: "connected", stem: "connect",
    ant: [ "disconnect" ],
    avg: [ 3.12, 3.81 ], std: [ 2.49, 1.29 ], fq: 22
  },
  "conscious": {
    dict: "anew-neg", word: "conscious", stem: "consciou",
    ant: [ "unconscious" ],
    avg: [ 4.55, 3.81 ], std: [ 2.44, 1.72 ], fq: 21
  },
  "consent": {
    dict: "anew-neg", word: "consent", stem: "consent",
    ant: [ "refuse" ],
    avg: [ 5.04, 3.46 ], std: [ 2.50, 0.93 ], fq: 50
  },
  "considerate": {
    dict: "anew-neg", word: "considerate", stem: "consider",
    ant: [ "inconsiderate" ],
    avg: [ 5.05, 2.58 ], std: [ 2.48, 1.46 ], fq: 20
  },
  "consistent": {
    dict: "anew-neg", word: "consistent", stem: "consist",
    ant: [ "inconsistent", "incoherent" ],
    avg: [ 3.08, 3.57 ], std: [ 1.97, 1.16 ], fq: 41
  },
  "construct": {
    dict: "anew-neg", word: "construct", stem: "construct",
    ant: [ "misconception" ],
    avg: [ 3.45, 3.65 ], std: [ 2.24, 0.81 ], fq: 20
  },
  "content": {
    dict: "anew-neg", word: "content", stem: "content",
    ant: [ "discontent" ],
    avg: [ 4.67, 2.75 ], std: [ 2.93, 1.12 ], fq: 19
  },
  "contents": {
    dict: "anew-neg", word: "contents", stem: "content",
    ant: [ "discontent" ],
    avg: [ 4.67, 2.75 ], std: [ 2.93, 1.12 ], fq: 19
  },
  "convenience": {
    dict: "anew-neg", word: "convenience", stem: "conveni",
    ant: [ "inconvenience" ],
    avg: [ 6.26, 3.05 ], std: [ 2.66, 1.23 ], fq: 19
  },
  "convenient": {
    dict: "anew-neg", word: "convenient", stem: "conveni",
    ant: [ "inconvenient" ],
    avg: [ 4.83, 2.73 ], std: [ 2.57, 1.16 ], fq: 22
  },
  "conviction": {
    dict: "anew-neg", word: "conviction", stem: "convict",
    ant: [ "acquittal" ],
    avg: [ 4.95, 6.19 ], std: [ 2.31, 1.72 ], fq: 20
  },
  "cooked": {
    dict: "anew-neg", word: "cooked", stem: "cook",
    ant: [ "raw" ],
    avg: [ 5.00, 4.24 ], std: [ 2.32, 1.29 ], fq: 50
  },
  "cool": {
    dict: "anew-neg", word: "cool", stem: "cool",
    ant: [ "heat", "warm" ],
    avg: [ 6.85, 5.45 ], std: [ 2.21, 1.81 ], fq: 100
  },
  "cooler": {
    dict: "anew-neg", word: "cooler", stem: "cooler",
    ant: [ "warm" ],
    avg: [ 6.57, 6.72 ], std: [ 1.78, 1.80 ], fq: 50
  },
  "cooperation": {
    dict: "anew-neg", word: "cooperation", stem: "cooper",
    ant: [ "competition" ],
    avg: [ 4.32, 5.64 ], std: [ 2.14, 1.70 ], fq: 50
  },
  "cooperative": {
    dict: "anew-neg", word: "cooperative", stem: "cooper",
    ant: [ "uncooperative" ],
    avg: [ 4.80, 2.86 ], std: [ 2.31, 1.46 ], fq: 20
  },
  "correct": {
    dict: "anew-neg", word: "correct", stem: "correct",
    ant: [ "wrong", "incorrect" ],
    avg: [ 4.55, 3.12 ], std: [ 2.16, 1.17 ], fq: 74
  },
  "corrupt": {
    dict: "anew-neg", word: "corrupt", stem: "corrupt",
    ant: [ "straight" ],
    avg: [ 3.18, 6.06 ], std: [ 1.76, 1.06 ], fq: 50
  },
  "counterfeit": {
    dict: "anew-neg", word: "counterfeit", stem: "counterfeit",
    ant: [ "genuine" ],
    avg: [ 4.27, 7.11 ], std: [ 2.16, 1.85 ], fq: 20
  },
  "courage": {
    dict: "anew-neg", word: "courage", stem: "courag",
    ant: [ "cowardice" ],
    avg: [ 4.25, 3.05 ], std: [ 2.20, 1.27 ], fq: 19
  },
  "courageous": {
    dict: "anew-neg", word: "courageous", stem: "courag",
    ant: [ "cowardly" ],
    avg: [ 5.14, 2.85 ], std: [ 1.93, 1.60 ], fq: 20
  },
  "covered": {
    dict: "anew-neg", word: "covered", stem: "cover",
    ant: [ "bare" ],
    avg: [ 5.80, 5.12 ], std: [ 2.80, 1.72 ], fq: 50
  },
  "cowardice": {
    dict: "anew-neg", word: "cowardice", stem: "cowardic",
    ant: [ "courage" ],
    avg: [ 6.15, 7.46 ], std: [ 2.45, 1.18 ], fq: 50
  },
  "cowardly": {
    dict: "anew-neg", word: "cowardly", stem: "cowardli",
    ant: [ "brave" ],
    avg: [ 6.15, 7.02 ], std: [ 2.45, 1.29 ], fq: 50
  },
  "credible": {
    dict: "anew-neg", word: "credible", stem: "credibl",
    ant: [ "incredible" ],
    avg: [ 6.35, 7.59 ], std: [ 2.87, 2.11 ], fq: 21
  },
  "cried": {
    dict: "anew-neg", word: "cried", stem: "cri",
    ant: [ "laugh" ],
    avg: [ 6.74, 8.22 ], std: [ 1.84, 1.37 ], fq: 50
  },
  "cries": {
    dict: "anew-neg", word: "cries", stem: "cri",
    ant: [ "laugh" ],
    avg: [ 6.74, 8.22 ], std: [ 1.84, 1.37 ], fq: 50
  },
  "criticize": {
    dict: "anew-neg", word: "criticize", stem: "critic",
    ant: [ "praise" ],
    avg: [ 5.45, 7.65 ], std: [ 2.04, 1.31 ], fq: 20
  },
  "crooked": {
    dict: "anew-neg", word: "crooked", stem: "crook",
    ant: [ "straight" ],
    avg: [ 3.18, 6.06 ], std: [ 1.76, 1.06 ], fq: 50
  },
  "crude": {
    dict: "anew-neg", word: "crude", stem: "crude",
    ant: [ "refined" ],
    avg: [ 3.95, 6.11 ], std: [ 2.19, 1.94 ], fq: 20
  },
  "cry": {
    dict: "anew-neg", word: "cry", stem: "cri",
    ant: [ "laugh" ],
    avg: [ 6.74, 8.22 ], std: [ 1.84, 1.37 ], fq: 50
  },
  "crying": {
    dict: "anew-neg", word: "crying", stem: "cri",
    ant: [ "laugh" ],
    avg: [ 6.74, 8.22 ], std: [ 1.84, 1.37 ], fq: 50
  },
  "curse": {
    dict: "anew-neg", word: "curse", stem: "curs",
    ant: [ "bless", "communicate" ],
    avg: [ 3.91, 6.64 ], std: [ 2.48, 1.79 ], fq: 68
  },
  "damn": {
    dict: "anew-neg", word: "damn", stem: "damn",
    ant: [ "bless" ],
    avg: [ 4.05, 7.08 ], std: [ 2.59, 1.97 ], fq: 50
  },
  "damned": {
    dict: "anew-neg", word: "damned", stem: "damn",
    ant: [ "bless" ],
    avg: [ 4.05, 7.08 ], std: [ 2.59, 1.97 ], fq: 50
  },
  "danger": {
    dict: "anew-neg", word: "danger", stem: "danger",
    ant: [ "safety" ],
    avg: [ 3.86, 6.18 ], std: [ 2.72, 1.73 ], fq: 50
  },
  "dangerous": {
    dict: "anew-neg", word: "dangerous", stem: "danger",
    ant: [ "safe" ],
    avg: [ 3.86, 7.04 ], std: [ 2.72, 1.62 ], fq: 50
  },
  "dark": {
    dict: "anew-neg", word: "dark", stem: "dark",
    ant: [ "light", "day" ],
    avg: [ 5.10, 6.32 ], std: [ 2.42, 1.44 ], fq: 100
  },
  "darkened": {
    dict: "anew-neg", word: "darkened", stem: "darken",
    ant: [ "lighten", "brighten" ],
    avg: [ 4.04, 6.86 ], std: [ 2.28, 1.63 ], fq: 40
  },
  "darker": {
    dict: "anew-neg", word: "darker", stem: "darker",
    ant: [ "light" ],
    avg: [ 5.40, 6.40 ], std: [ 2.33, 1.51 ], fq: 50
  },
  "darkest": {
    dict: "anew-neg", word: "darkest", stem: "darkest",
    ant: [ "light" ],
    avg: [ 5.40, 6.40 ], std: [ 2.33, 1.51 ], fq: 50
  },
  "darkness": {
    dict: "anew-neg", word: "darkness", stem: "dark",
    ant: [ "light", "lightness" ],
    avg: [ 4.97, 6.38 ], std: [ 2.47, 1.51 ], fq: 68
  },
  "daughter": {
    dict: "anew-neg", word: "daughter", stem: "daughter",
    ant: [ "son", "boy" ],
    avg: [ 4.58, 6.61 ], std: [ 2.37, 1.57 ], fq: 100
  },
  "daughters": {
    dict: "anew-neg", word: "daughters", stem: "daughter",
    ant: [ "son", "boy" ],
    avg: [ 4.58, 6.61 ], std: [ 2.37, 1.57 ], fq: 100
  },
  "dawn": {
    dict: "anew-neg", word: "dawn", stem: "dawn",
    ant: [ "sunset" ],
    avg: [ 4.20, 7.16 ], std: [ 2.99, 2.11 ], fq: 50
  },
  "dawning": {
    dict: "anew-neg", word: "dawning", stem: "dawn",
    ant: [ "sunset" ],
    avg: [ 4.20, 7.16 ], std: [ 2.99, 2.11 ], fq: 50
  },
  "day": {
    dict: "anew-neg", word: "day", stem: "day",
    ant: [ "night" ],
    avg: [ 4.28, 6.22 ], std: [ 2.21, 1.30 ], fq: 50
  },
  "daybreak": {
    dict: "anew-neg", word: "daybreak", stem: "daybreak",
    ant: [ "sunset" ],
    avg: [ 4.20, 7.16 ], std: [ 2.99, 2.11 ], fq: 50
  },
  "daylight": {
    dict: "anew-neg", word: "daylight", stem: "daylight",
    ant: [ "night" ],
    avg: [ 4.28, 6.22 ], std: [ 2.21, 1.30 ], fq: 50
  },
  "days": {
    dict: "anew-neg", word: "days", stem: "day",
    ant: [ "night" ],
    avg: [ 4.28, 6.22 ], std: [ 2.21, 1.30 ], fq: 50
  },
  "daytime": {
    dict: "anew-neg", word: "daytime", stem: "daytim",
    ant: [ "night" ],
    avg: [ 4.28, 6.22 ], std: [ 2.21, 1.30 ], fq: 50
  },
  "deactivate": {
    dict: "anew-neg", word: "deactivate", stem: "deactiv",
    ant: [ "activate" ],
    avg: [ 4.86, 5.46 ], std: [ 2.56, 0.98 ], fq: 2
  },
  "dead": {
    dict: "anew-neg", word: "dead", stem: "dead",
    ant: [ "living", "alive", "live" ],
    avg: [ 5.52, 6.90 ], std: [ 2.85, 1.35 ], fq: 150
  },
  "deaf": {
    dict: "anew-neg", word: "deaf", stem: "deaf",
    ant: [ "hearing" ],
    avg: [ 5.39, 5.82 ], std: [ 2.22, 1.48 ], fq: 50
  },
  "death": {
    dict: "anew-neg", word: "death", stem: "death",
    ant: [ "birth" ],
    avg: [ 5.75, 6.52 ], std: [ 2.73, 2.36 ], fq: 20
  },
  "deaths": {
    dict: "anew-neg", word: "deaths", stem: "death",
    ant: [ "birth" ],
    avg: [ 5.75, 6.52 ], std: [ 2.73, 2.36 ], fq: 20
  },
  "decisive": {
    dict: "anew-neg", word: "decisive", stem: "decis",
    ant: [ "indecisive" ],
    avg: [ 4.81, 3.52 ], std: [ 2.20, 1.83 ], fq: 21
  },
  "decline": {
    dict: "anew-neg", word: "decline", stem: "declin",
    ant: [ "improvement", "better", "accept" ],
    avg: [ 5.26, 6.74 ], std: [ 2.52, 1.21 ], fq: 150
  },
  "declined": {
    dict: "anew-neg", word: "declined", stem: "declin",
    ant: [ "better", "accept" ],
    avg: [ 5.00, 6.68 ], std: [ 2.69, 1.18 ], fq: 100
  },
  "deep": {
    dict: "anew-neg", word: "deep", stem: "deep",
    ant: [ "shallow" ],
    avg: [ 3.00, 3.86 ], std: [ 2.34, 1.74 ], fq: 22
  },
  "deeper": {
    dict: "anew-neg", word: "deeper", stem: "deeper",
    ant: [ "shallow" ],
    avg: [ 3.00, 3.86 ], std: [ 2.34, 1.74 ], fq: 22
  },
  "deepest": {
    dict: "anew-neg", word: "deepest", stem: "deepest",
    ant: [ "shallow" ],
    avg: [ 3.00, 3.86 ], std: [ 2.34, 1.74 ], fq: 22
  },
  "defeat": {
    dict: "anew-neg", word: "defeat", stem: "defeat",
    ant: [ "victory" ],
    avg: [ 6.63, 7.98 ], std: [ 2.84, 1.08 ], fq: 50
  },
  "defeated": {
    dict: "anew-neg", word: "defeated", stem: "defeat",
    ant: [ "undefeated" ],
    avg: [ 4.32, 6.21 ], std: [ 2.61, 2.44 ], fq: 20
  },
  "defend": {
    dict: "anew-neg", word: "defend", stem: "defend",
    ant: [ "attack", "prosecute" ],
    avg: [ 6.08, 2.79 ], std: [ 2.45, 1.43 ], fq: 70
  },
  "defended": {
    dict: "anew-neg", word: "defended", stem: "defend",
    ant: [ "attack", "prosecute" ],
    avg: [ 6.08, 2.79 ], std: [ 2.45, 1.43 ], fq: 70
  },
  "defending": {
    dict: "anew-neg", word: "defending", stem: "defend",
    ant: [ "attack", "prosecute" ],
    avg: [ 6.08, 2.79 ], std: [ 2.45, 1.43 ], fq: 70
  },
  "deficient": {
    dict: "anew-neg", word: "deficient", stem: "defici",
    ant: [ "sufficient" ],
    avg: [ 3.17, 6.10 ], std: [ 2.65, 1.61 ], fq: 22
  },
  "deficit": {
    dict: "anew-neg", word: "deficit", stem: "deficit",
    ant: [ "lead" ],
    avg: [ 3.15, 6.28 ], std: [ 1.77, 1.46 ], fq: 50
  },
  "delay": {
    dict: "anew-neg", word: "delay", stem: "delay",
    ant: [ "rush" ],
    avg: [ 4.90, 4.12 ], std: [ 2.35, 1.36 ], fq: 50
  },
  "delayed": {
    dict: "anew-neg", word: "delayed", stem: "delay",
    ant: [ "rush" ],
    avg: [ 4.90, 4.12 ], std: [ 2.35, 1.36 ], fq: 50
  },
  "delays": {
    dict: "anew-neg", word: "delays", stem: "delay",
    ant: [ "rush" ],
    avg: [ 4.90, 4.12 ], std: [ 2.35, 1.36 ], fq: 50
  },
  "delicate": {
    dict: "anew-neg", word: "delicate", stem: "delic",
    ant: [ "rugged" ],
    avg: [ 5.43, 5.66 ], std: [ 2.42, 1.67 ], fq: 50
  },
  "delight": {
    dict: "anew-neg", word: "delight", stem: "delight",
    ant: [ "displease" ],
    avg: [ 5.71, 2.63 ], std: [ 2.22, 0.96 ], fq: 20
  },
  "delighted": {
    dict: "anew-neg", word: "delighted", stem: "delight",
    ant: [ "displease" ],
    avg: [ 5.71, 2.63 ], std: [ 2.22, 0.96 ], fq: 20
  },
  "demise": {
    dict: "anew-neg", word: "demise", stem: "demis",
    ant: [ "birth" ],
    avg: [ 5.75, 6.52 ], std: [ 2.73, 2.36 ], fq: 20
  },
  "demonstrate": {
    dict: "anew-neg", word: "demonstrate", stem: "demonstr",
    ant: [ "disprove" ],
    avg: [ 4.30, 3.90 ], std: [ 2.10, 1.79 ], fq: 22
  },
  "demonstrated": {
    dict: "anew-neg", word: "demonstrated", stem: "demonstr",
    ant: [ "disprove" ],
    avg: [ 4.30, 3.90 ], std: [ 2.10, 1.79 ], fq: 22
  },
  "denial": {
    dict: "anew-neg", word: "denial", stem: "denial",
    ant: [ "prosecution" ],
    avg: [ 4.56, 3.37 ], std: [ 2.53, 1.21 ], fq: 18
  },
  "deny": {
    dict: "anew-neg", word: "deny", stem: "deni",
    ant: [ "admit", "allow" ],
    avg: [ 4.19, 5.32 ], std: [ 2.40, 1.37 ], fq: 100
  },
  "dependable": {
    dict: "anew-neg", word: "dependable", stem: "depend",
    ant: [ "unreliable" ],
    avg: [ 4.29, 2.74 ], std: [ 2.17, 1.19 ], fq: 20
  },
  "depressing": {
    dict: "anew-neg", word: "depressing", stem: "depress",
    ant: [ "cheerful" ],
    avg: [ 5.76, 8.00 ], std: [ 2.41, 1.41 ], fq: 20
  },
  "desirable": {
    dict: "anew-neg", word: "desirable", stem: "desir",
    ant: [ "undesirable" ],
    avg: [ 4.00, 3.00 ], std: [ 2.16, 1.73 ], fq: 21
  },
  "despair": {
    dict: "anew-neg", word: "despair", stem: "despair",
    ant: [ "hope" ],
    avg: [ 5.78, 7.38 ], std: [ 2.09, 1.31 ], fq: 50
  },
  "despairing": {
    dict: "anew-neg", word: "despairing", stem: "despair",
    ant: [ "hope" ],
    avg: [ 5.78, 7.38 ], std: [ 2.09, 1.31 ], fq: 50
  },
  "destroyed": {
    dict: "anew-neg", word: "destroyed", stem: "destroy",
    ant: [ "preserved" ],
    avg: [ 4.95, 6.10 ], std: [ 2.19, 1.40 ], fq: 50
  },
  "detain": {
    dict: "anew-neg", word: "detain", stem: "detain",
    ant: [ "free", "rush" ],
    avg: [ 5.01, 6.11 ], std: [ 2.72, 1.31 ], fq: 100
  },
  "determined": {
    dict: "anew-neg", word: "determined", stem: "determin",
    ant: [ "undetermined" ],
    avg: [ 3.70, 3.67 ], std: [ 2.05, 1.80 ], fq: 22
  },
  "detest": {
    dict: "anew-neg", word: "detest", stem: "detest",
    ant: [ "love" ],
    avg: [ 6.38, 8.42 ], std: [ 2.68, 1.11 ], fq: 50
  },
  "difficult": {
    dict: "anew-neg", word: "difficult", stem: "difficult",
    ant: [ "easy" ],
    avg: [ 4.48, 6.76 ], std: [ 2.82, 1.60 ], fq: 50
  },
  "difficulties": {
    dict: "anew-neg", word: "difficulties", stem: "difficulti",
    ant: [ "ease" ],
    avg: [ 4.48, 6.52 ], std: [ 2.82, 1.59 ], fq: 50
  },
  "difficulty": {
    dict: "anew-neg", word: "difficulty", stem: "difficulti",
    ant: [ "ease" ],
    avg: [ 4.48, 6.52 ], std: [ 2.82, 1.59 ], fq: 50
  },
  "dignified": {
    dict: "anew-neg", word: "dignified", stem: "dignifi",
    ant: [ "undignified" ],
    avg: [ 4.41, 3.25 ], std: [ 2.11, 1.41 ], fq: 21
  },
  "diligent": {
    dict: "anew-neg", word: "diligent", stem: "dilig",
    ant: [ "negligent" ],
    avg: [ 4.45, 2.05 ], std: [ 2.54, 1.28 ], fq: 20
  },
  "dim": {
    dict: "anew-neg", word: "dim", stem: "dim",
    ant: [ "focus" ],
    avg: [ 4.65, 6.12 ], std: [ 2.13, 1.06 ], fq: 50
  },
  "dimes": {
    dict: "anew-neg", word: "dimes", stem: "dime",
    ant: [ "focus" ],
    avg: [ 4.65, 6.12 ], std: [ 2.13, 1.06 ], fq: 50
  },
  "direct": {
    dict: "anew-neg", word: "direct", stem: "direct",
    ant: [ "indirect" ],
    avg: [ 3.77, 3.58 ], std: [ 1.90, 1.61 ], fq: 20
  },
  "dirty": {
    dict: "anew-neg", word: "dirty", stem: "dirti",
    ant: [ "clean" ],
    avg: [ 4.37, 6.90 ], std: [ 2.14, 1.90 ], fq: 50
  },
  "disadvantage": {
    dict: "anew-neg", word: "disadvantage", stem: "disadvantag",
    ant: [ "advantage" ],
    avg: [ 4.76, 6.84 ], std: [ 2.18, 1.28 ], fq: 50
  },
  "disagree": {
    dict: "anew-neg", word: "disagree", stem: "disagre",
    ant: [ "agree" ],
    avg: [ 3.62, 7.17 ], std: [ 2.09, 1.58 ], fq: 19
  },
  "disagreeable": {
    dict: "anew-neg", word: "disagreeable", stem: "disagre",
    ant: [ "agreeable" ],
    avg: [ 3.55, 6.90 ], std: [ 2.21, 1.94 ], fq: 20
  },
  "disagreement": {
    dict: "anew-neg", word: "disagreement", stem: "disagr",
    ant: [ "agreement" ],
    avg: [ 5.02, 6.32 ], std: [ 2.24, 1.22 ], fq: 50
  },
  "disappearance": {
    dict: "anew-neg", word: "disappearance", stem: "disappear",
    ant: [ "appearance" ],
    avg: [ 4.57, 6.14 ], std: [ 2.45, 1.90 ], fq: 22
  },
  "disapproval": {
    dict: "anew-neg", word: "disapproval", stem: "disapprov",
    ant: [ "approval" ],
    avg: [ 4.05, 6.98 ], std: [ 2.59, 1.20 ], fq: 50
  },
  "disapprove": {
    dict: "anew-neg", word: "disapprove", stem: "disapprov",
    ant: [ "approve" ],
    avg: [ 4.09, 7.00 ], std: [ 2.29, 1.92 ], fq: 21
  },
  "discharge": {
    dict: "anew-neg", word: "discharge", stem: "discharg",
    ant: [ "charge", "convict", "fill" ],
    avg: [ 6.04, 4.45 ], std: [ 2.36, 1.39 ], fq: 118
  },
  "discomfort": {
    dict: "anew-neg", word: "discomfort", stem: "discomfort",
    ant: [ "comfort" ],
    avg: [ 3.93, 7.50 ], std: [ 2.85, 1.15 ], fq: 50
  },
  "disconnect": {
    dict: "anew-neg", word: "disconnect", stem: "disconnect",
    ant: [ "connect" ],
    avg: [ 3.75, 5.86 ], std: [ 2.49, 1.48 ], fq: 50
  },
  "discontent": {
    dict: "anew-neg", word: "discontent", stem: "discont",
    ant: [ "contentment", "content" ],
    avg: [ 4.44, 6.27 ], std: [ 2.53, 1.97 ], fq: 70
  },
  "discord": {
    dict: "anew-neg", word: "discord", stem: "discord",
    ant: [ "agree" ],
    avg: [ 3.62, 7.17 ], std: [ 2.09, 1.58 ], fq: 19
  },
  "discourage": {
    dict: "anew-neg", word: "discourage", stem: "discourag",
    ant: [ "encourage" ],
    avg: [ 6.44, 6.90 ], std: [ 2.58, 1.68 ], fq: 50
  },
  "discouraged": {
    dict: "anew-neg", word: "discouraged", stem: "discourag",
    ant: [ "encourage" ],
    avg: [ 6.44, 6.90 ], std: [ 2.58, 1.68 ], fq: 50
  },
  "discouraging": {
    dict: "anew-neg", word: "discouraging", stem: "discourag",
    ant: [ "encourage", "encouraging" ],
    avg: [ 6.44, 7.07 ], std: [ 2.58, 1.62 ], fq: 100
  },
  "discredit": {
    dict: "anew-neg", word: "discredit", stem: "discredit",
    ant: [ "believe" ],
    avg: [ 5.30, 6.70 ], std: [ 2.66, 1.59 ], fq: 50
  },
  "disgrace": {
    dict: "anew-neg", word: "disgrace", stem: "disgrac",
    ant: [ "honor" ],
    avg: [ 5.90, 7.22 ], std: [ 1.83, 1.20 ], fq: 50
  },
  "dishonest": {
    dict: "anew-neg", word: "dishonest", stem: "dishonest",
    ant: [ "honest" ],
    avg: [ 5.32, 7.46 ], std: [ 1.92, 1.13 ], fq: 50
  },
  "dishonesty": {
    dict: "anew-neg", word: "dishonesty", stem: "dishonesti",
    ant: [ "honesty" ],
    avg: [ 5.32, 7.76 ], std: [ 1.92, 1.27 ], fq: 50
  },
  "dishonor": {
    dict: "anew-neg", word: "dishonor", stem: "dishonor",
    ant: [ "honor" ],
    avg: [ 5.90, 7.22 ], std: [ 1.83, 1.20 ], fq: 50
  },
  "dishonorable": {
    dict: "anew-neg", word: "dishonorable", stem: "dishonor",
    ant: [ "honorable", "honest" ],
    avg: [ 5.07, 7.56 ], std: [ 2.09, 1.26 ], fq: 71
  },
  "dislike": {
    dict: "anew-neg", word: "dislike", stem: "dislik",
    ant: [ "liking", "like" ],
    avg: [ 5.16, 7.01 ], std: [ 2.62, 1.06 ], fq: 100
  },
  "disloyal": {
    dict: "anew-neg", word: "disloyal", stem: "disloy",
    ant: [ "patriotic", "loyal" ],
    avg: [ 4.88, 7.07 ], std: [ 2.65, 1.38 ], fq: 71
  },
  "disloyalty": {
    dict: "anew-neg", word: "disloyalty", stem: "disloyalti",
    ant: [ "loyalty" ],
    avg: [ 4.52, 7.18 ], std: [ 2.71, 2.13 ], fq: 21
  },
  "dismissed": {
    dict: "anew-neg", word: "dismissed", stem: "dismiss",
    ant: [ "hire" ],
    avg: [ 6.77, 6.50 ], std: [ 2.07, 1.34 ], fq: 50
  },
  "disobedience": {
    dict: "anew-neg", word: "disobedience", stem: "disobedi",
    ant: [ "obedience" ],
    avg: [ 4.60, 5.40 ], std: [ 2.67, 1.62 ], fq: 50
  },
  "disobey": {
    dict: "anew-neg", word: "disobey", stem: "disobey",
    ant: [ "obey" ],
    avg: [ 4.23, 5.10 ], std: [ 1.72, 1.88 ], fq: 50
  },
  "disorderly": {
    dict: "anew-neg", word: "disorderly", stem: "disorderli",
    ant: [ "orderly" ],
    avg: [ 5.05, 6.36 ], std: [ 2.39, 2.19 ], fq: 20
  },
  "disparage": {
    dict: "anew-neg", word: "disparage", stem: "disparag",
    ant: [ "flatter" ],
    avg: [ 4.61, 6.10 ], std: [ 2.83, 2.10 ], fq: 19
  },
  "displace": {
    dict: "anew-neg", word: "displace", stem: "displac",
    ant: [ "hire" ],
    avg: [ 6.77, 6.50 ], std: [ 2.07, 1.34 ], fq: 50
  },
  "displease": {
    dict: "anew-neg", word: "displease", stem: "displeas",
    ant: [ "please" ],
    avg: [ 5.44, 6.36 ], std: [ 2.88, 1.68 ], fq: 50
  },
  "displeased": {
    dict: "anew-neg", word: "displeased", stem: "displeas",
    ant: [ "please", "pleased" ],
    avg: [ 5.44, 6.98 ], std: [ 2.88, 1.44 ], fq: 100
  },
  "disposed": {
    dict: "anew-neg", word: "disposed", stem: "dispos",
    ant: [ "disqualify" ],
    avg: [ 4.70, 2.47 ], std: [ 1.84, 1.07 ], fq: 19
  },
  "disqualify": {
    dict: "anew-neg", word: "disqualify", stem: "disqualifi",
    ant: [ "qualify" ],
    avg: [ 6.05, 6.77 ], std: [ 2.22, 1.41 ], fq: 20
  },
  "disrespect": {
    dict: "anew-neg", word: "disrespect", stem: "disrespect",
    ant: [ "respect", "esteem" ],
    avg: [ 4.26, 6.78 ], std: [ 2.68, 1.40 ], fq: 72
  },
  "disrespectful": {
    dict: "anew-neg", word: "disrespectful", stem: "disrespect",
    ant: [ "respectful" ],
    avg: [ 3.32, 7.45 ], std: [ 2.34, 1.26 ], fq: 42
  },
  "dissatisfied": {
    dict: "anew-neg", word: "dissatisfied", stem: "dissatisfi",
    ant: [ "satisfy" ],
    avg: [ 4.94, 7.34 ], std: [ 2.63, 1.44 ], fq: 50
  },
  "distressed": {
    dict: "anew-neg", word: "distressed", stem: "distress",
    ant: [ "euphoric" ],
    avg: [ 5.25, 7.80 ], std: [ 2.69, 1.40 ], fq: 20
  },
  "distrust": {
    dict: "anew-neg", word: "distrust", stem: "distrust",
    ant: [ "trust" ],
    avg: [ 5.30, 7.22 ], std: [ 2.66, 1.23 ], fq: 50
  },
  "divide": {
    dict: "anew-neg", word: "divide", stem: "divid",
    ant: [ "unite" ],
    avg: [ 3.75, 6.64 ], std: [ 2.49, 1.19 ], fq: 50
  },
  "divided": {
    dict: "anew-neg", word: "divided", stem: "divid",
    ant: [ "unite", "united" ],
    avg: [ 3.75, 6.98 ], std: [ 2.49, 1.20 ], fq: 100
  },
  "doctor": {
    dict: "anew-neg", word: "doctor", stem: "doctor",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "doctors": {
    dict: "anew-neg", word: "doctors", stem: "doctor",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "double": {
    dict: "anew-neg", word: "double", stem: "doubl",
    ant: [ "single" ],
    avg: [ 5.50, 5.12 ], std: [ 2.66, 1.52 ], fq: 50
  },
  "doubt": {
    dict: "anew-neg", word: "doubt", stem: "doubt",
    ant: [ "certainty" ],
    avg: [ 4.35, 6.38 ], std: [ 2.52, 1.75 ], fq: 22
  },
  "dove": {
    dict: "anew-neg", word: "dove", stem: "dove",
    ant: [ "hawk" ],
    avg: [ 4.83, 6.46 ], std: [ 2.75, 1.58 ], fq: 29
  },
  "draw": {
    dict: "anew-neg", word: "draw", stem: "draw",
    ant: [ "push", "deposit", "repel" ],
    avg: [ 5.09, 4.73 ], std: [ 2.49, 1.84 ], fq: 92
  },
  "drawing": {
    dict: "anew-neg", word: "drawing", stem: "draw",
    ant: [ "push", "deposit", "repel" ],
    avg: [ 5.09, 4.73 ], std: [ 2.49, 1.84 ], fq: 92
  },
  "drawings": {
    dict: "anew-neg", word: "drawings", stem: "draw",
    ant: [ "push", "deposit", "repel" ],
    avg: [ 5.09, 4.73 ], std: [ 2.49, 1.84 ], fq: 92
  },
  "dress": {
    dict: "anew-neg", word: "dress", stem: "dress",
    ant: [ "undress" ],
    avg: [ 5.96, 6.14 ], std: [ 2.77, 1.74 ], fq: 22
  },
  "dressed": {
    dict: "anew-neg", word: "dressed", stem: "dress",
    ant: [ "undress" ],
    avg: [ 5.96, 6.14 ], std: [ 2.77, 1.74 ], fq: 22
  },
  "dresses": {
    dict: "anew-neg", word: "dresses", stem: "dress",
    ant: [ "undress" ],
    avg: [ 5.96, 6.14 ], std: [ 2.77, 1.74 ], fq: 22
  },
  "drive": {
    dict: "anew-neg", word: "drive", stem: "drive",
    ant: [ "attract" ],
    avg: [ 5.35, 6.38 ], std: [ 2.81, 2.11 ], fq: 22
  },
  "drunk": {
    dict: "anew-neg", word: "drunk", stem: "drunk",
    ant: [ "sober" ],
    avg: [ 3.56, 5.78 ], std: [ 1.95, 1.98 ], fq: 50
  },
  "dry": {
    dict: "anew-neg", word: "dry", stem: "dri",
    ant: [ "wet", "sweet" ],
    avg: [ 4.41, 6.57 ], std: [ 2.52, 1.25 ], fq: 100
  },
  "dull": {
    dict: "anew-neg", word: "dull", stem: "dull",
    ant: [ "lively", "bright" ],
    avg: [ 5.72, 7.39 ], std: [ 2.52, 1.25 ], fq: 80
  },
  "dying": {
    dict: "anew-neg", word: "dying", stem: "die",
    ant: [ "birth" ],
    avg: [ 5.75, 6.52 ], std: [ 2.73, 2.36 ], fq: 20
  },
  "ease": {
    dict: "anew-neg", word: "ease", stem: "eas",
    ant: [ "difficulty" ],
    avg: [ 5.94, 3.38 ], std: [ 2.36, 1.23 ], fq: 50
  },
  "easier": {
    dict: "anew-neg", word: "easier", stem: "easier",
    ant: [ "difficult", "uneasy" ],
    avg: [ 4.84, 3.03 ], std: [ 2.50, 0.97 ], fq: 71
  },
  "easy": {
    dict: "anew-neg", word: "easy", stem: "easi",
    ant: [ "difficult", "uneasy", "quickly" ],
    avg: [ 5.54, 3.73 ], std: [ 2.28, 1.15 ], fq: 121
  },
  "educated": {
    dict: "anew-neg", word: "educated", stem: "educ",
    ant: [ "uneducated" ],
    avg: [ 3.90, 3.00 ], std: [ 2.41, 1.26 ], fq: 20
  },
  "effective": {
    dict: "anew-neg", word: "effective", stem: "effect",
    ant: [ "ineffective" ],
    avg: [ 3.75, 3.11 ], std: [ 2.20, 1.15 ], fq: 19
  },
  "elaborate": {
    dict: "anew-neg", word: "elaborate", stem: "elabor",
    ant: [ "contract" ],
    avg: [ 5.00, 5.46 ], std: [ 2.32, 1.11 ], fq: 50
  },
  "elated": {
    dict: "anew-neg", word: "elated", stem: "elat",
    ant: [ "depress" ],
    avg: [ 3.14, 2.47 ], std: [ 1.46, 2.01 ], fq: 20
  },
  "elevate": {
    dict: "anew-neg", word: "elevate", stem: "elev",
    ant: [ "lower" ],
    avg: [ 4.31, 4.24 ], std: [ 2.20, 1.08 ], fq: 50
  },
  "elevated": {
    dict: "anew-neg", word: "elevated", stem: "elev",
    ant: [ "lower" ],
    avg: [ 4.31, 4.24 ], std: [ 2.20, 1.08 ], fq: 50
  },
  "employ": {
    dict: "anew-neg", word: "employ", stem: "employ",
    ant: [ "unemployment", "fire" ],
    avg: [ 6.52, 2.97 ], std: [ 2.53, 1.42 ], fq: 72
  },
  "employed": {
    dict: "anew-neg", word: "employed", stem: "employ",
    ant: [ "fire", "unemployed" ],
    avg: [ 6.25, 3.28 ], std: [ 2.14, 1.71 ], fq: 72
  },
  "employment": {
    dict: "anew-neg", word: "employment", stem: "employ",
    ant: [ "unemployment" ],
    avg: [ 5.59, 2.32 ], std: [ 2.92, 1.25 ], fq: 22
  },
  "emptiness": {
    dict: "anew-neg", word: "emptiness", stem: "empti",
    ant: [ "fullness" ],
    avg: [ 3.20, 6.19 ], std: [ 2.07, 2.18 ], fq: 20
  },
  "empty": {
    dict: "anew-neg", word: "empty", stem: "empti",
    ant: [ "fill", "full" ],
    avg: [ 5.18, 5.96 ], std: [ 2.74, 1.23 ], fq: 100
  },
  "encourage": {
    dict: "anew-neg", word: "encourage", stem: "encourag",
    ant: [ "discourage" ],
    avg: [ 3.73, 3.05 ], std: [ 2.35, 1.16 ], fq: 21
  },
  "encouraged": {
    dict: "anew-neg", word: "encouraged", stem: "encourag",
    ant: [ "discourage" ],
    avg: [ 3.73, 3.05 ], std: [ 2.35, 1.16 ], fq: 21
  },
  "encouraging": {
    dict: "anew-neg", word: "encouraging", stem: "encourag",
    ant: [ "discourage", "discouraging" ],
    avg: [ 3.95, 2.99 ], std: [ 2.36, 1.72 ], fq: 42
  },
  "end": {
    dict: "anew-neg", word: "end", stem: "end",
    ant: [ "beginning", "begin" ],
    avg: [ 2.92, 6.42 ], std: [ 2.48, 2.08 ], fq: 38
  },
  "ends": {
    dict: "anew-neg", word: "ends", stem: "end",
    ant: [ "beginning", "begin" ],
    avg: [ 2.92, 6.42 ], std: [ 2.48, 2.08 ], fq: 38
  },
  "enduring": {
    dict: "anew-neg", word: "enduring", stem: "endur",
    ant: [ "enjoy" ],
    avg: [ 5.20, 7.66 ], std: [ 2.72, 1.47 ], fq: 50
  },
  "enemy": {
    dict: "anew-neg", word: "enemy", stem: "enemi",
    ant: [ "friend" ],
    avg: [ 5.11, 7.66 ], std: [ 2.96, 1.51 ], fq: 50
  },
  "engage": {
    dict: "anew-neg", word: "engage", stem: "engag",
    ant: [ "fire" ],
    avg: [ 7.17, 3.80 ], std: [ 2.06, 1.58 ], fq: 50
  },
  "engaged": {
    dict: "anew-neg", word: "engaged", stem: "engag",
    ant: [ "fire" ],
    avg: [ 7.17, 3.80 ], std: [ 2.06, 1.58 ], fq: 50
  },
  "enjoy": {
    dict: "anew-neg", word: "enjoy", stem: "enjoy",
    ant: [ "suffer" ],
    avg: [ 5.00, 2.08 ], std: [ 2.45, 1.38 ], fq: 50
  },
  "enjoyed": {
    dict: "anew-neg", word: "enjoyed", stem: "enjoy",
    ant: [ "suffer" ],
    avg: [ 5.00, 2.08 ], std: [ 2.45, 1.38 ], fq: 50
  },
  "enjoying": {
    dict: "anew-neg", word: "enjoying", stem: "enjoy",
    ant: [ "suffer" ],
    avg: [ 5.00, 2.08 ], std: [ 2.45, 1.38 ], fq: 50
  },
  "entirely": {
    dict: "anew-neg", word: "entirely", stem: "entir",
    ant: [ "partly" ],
    avg: [ 3.82, 5.32 ], std: [ 2.24, 1.17 ], fq: 50
  },
  "equal": {
    dict: "anew-neg", word: "equal", stem: "equal",
    ant: [ "inadequate" ],
    avg: [ 4.30, 2.57 ], std: [ 2.03, 1.21 ], fq: 22
  },
  "establish": {
    dict: "anew-neg", word: "establish", stem: "establish",
    ant: [ "abolish", "disprove" ],
    avg: [ 4.24, 3.87 ], std: [ 2.09, 1.67 ], fq: 40
  },
  "established": {
    dict: "anew-neg", word: "established", stem: "establish",
    ant: [ "abolish", "disprove" ],
    avg: [ 4.24, 3.87 ], std: [ 2.09, 1.67 ], fq: 40
  },
  "establishing": {
    dict: "anew-neg", word: "establishing", stem: "establish",
    ant: [ "abolish", "disprove" ],
    avg: [ 4.24, 3.87 ], std: [ 2.09, 1.67 ], fq: 40
  },
  "esteem": {
    dict: "anew-neg", word: "esteem", stem: "esteem",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "esteemed": {
    dict: "anew-neg", word: "esteemed", stem: "esteem",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "ethical": {
    dict: "anew-neg", word: "ethical", stem: "ethic",
    ant: [ "unethical" ],
    avg: [ 4.25, 2.19 ], std: [ 2.84, 1.36 ], fq: 20
  },
  "evil": {
    dict: "anew-neg", word: "evil", stem: "evil",
    ant: [ "good", "goodness" ],
    avg: [ 5.43, 7.40 ], std: [ 2.85, 1.42 ], fq: 100
  },
  "excite": {
    dict: "anew-neg", word: "excite", stem: "excit",
    ant: [ "calm" ],
    avg: [ 2.82, 6.36 ], std: [ 2.13, 1.60 ], fq: 50
  },
  "excited": {
    dict: "anew-neg", word: "excited", stem: "excit",
    ant: [ "calm" ],
    avg: [ 2.82, 6.36 ], std: [ 2.13, 1.60 ], fq: 50
  },
  "exciting": {
    dict: "anew-neg", word: "exciting", stem: "excit",
    ant: [ "calm" ],
    avg: [ 2.82, 6.36 ], std: [ 2.13, 1.60 ], fq: 50
  },
  "exclude": {
    dict: "anew-neg", word: "exclude", stem: "exclud",
    ant: [ "include", "admit" ],
    avg: [ 4.07, 5.50 ], std: [ 2.40, 1.39 ], fq: 69
  },
  "excluded": {
    dict: "anew-neg", word: "excluded", stem: "exclud",
    ant: [ "include", "admit" ],
    avg: [ 4.07, 5.50 ], std: [ 2.40, 1.39 ], fq: 69
  },
  "existing": {
    dict: "anew-neg", word: "existing", stem: "exist",
    ant: [ "nonexistent" ],
    avg: [ 3.81, 3.89 ], std: [ 2.02, 1.24 ], fq: 20
  },
  "experienced": {
    dict: "anew-neg", word: "experienced", stem: "experienc",
    ant: [ "inexperienced" ],
    avg: [ 3.67, 3.50 ], std: [ 2.06, 1.32 ], fq: 19
  },
  "extinct": {
    dict: "anew-neg", word: "extinct", stem: "extinct",
    ant: [ "active" ],
    avg: [ 4.86, 6.82 ], std: [ 2.56, 1.77 ], fq: 50
  },
  "face": {
    dict: "anew-neg", word: "face", stem: "face",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "faced": {
    dict: "anew-neg", word: "faced", stem: "face",
    ant: [ "back", "faceless" ],
    avg: [ 4.11, 4.10 ], std: [ 2.10, 1.51 ], fq: 70
  },
  "faceless": {
    dict: "anew-neg", word: "faceless", stem: "faceless",
    ant: [ "faced" ],
    avg: [ 5.04, 5.24 ], std: [ 2.18, 1.24 ], fq: 50
  },
  "faces": {
    dict: "anew-neg", word: "faces", stem: "face",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "facing": {
    dict: "anew-neg", word: "facing", stem: "face",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "fag": {
    dict: "anew-neg", word: "fag", stem: "fag",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "fail": {
    dict: "anew-neg", word: "fail", stem: "fail",
    ant: [ "succeed", "pass" ],
    avg: [ 6.31, 6.75 ], std: [ 2.33, 1.57 ], fq: 100
  },
  "failed": {
    dict: "anew-neg", word: "failed", stem: "fail",
    ant: [ "succeed", "pass" ],
    avg: [ 6.31, 6.75 ], std: [ 2.33, 1.57 ], fq: 100
  },
  "failing": {
    dict: "anew-neg", word: "failing", stem: "fail",
    ant: [ "passing", "succeed", "pass" ],
    avg: [ 5.63, 6.35 ], std: [ 2.26, 1.63 ], fq: 150
  },
  "fails": {
    dict: "anew-neg", word: "fails", stem: "fail",
    ant: [ "succeed", "pass" ],
    avg: [ 6.31, 6.75 ], std: [ 2.33, 1.57 ], fq: 100
  },
  "failure": {
    dict: "anew-neg", word: "failure", stem: "failur",
    ant: [ "success" ],
    avg: [ 6.11, 7.86 ], std: [ 2.65, 1.64 ], fq: 50
  },
  "fair": {
    dict: "anew-neg", word: "fair", stem: "fair",
    ant: [ "unfair", "foul" ],
    avg: [ 4.41, 3.05 ], std: [ 2.53, 1.32 ], fq: 72
  },
  "faithful": {
    dict: "anew-neg", word: "faithful", stem: "faith",
    ant: [ "unfaithful" ],
    avg: [ 5.59, 2.33 ], std: [ 2.44, 1.75 ], fq: 40
  },
  "fall": {
    dict: "anew-neg", word: "fall", stem: "fall",
    ant: [ "ascend" ],
    avg: [ 4.13, 6.19 ], std: [ 2.53, 1.50 ], fq: 22
  },
  "fallen": {
    dict: "anew-neg", word: "fallen", stem: "fallen",
    ant: [ "ascend" ],
    avg: [ 4.13, 6.19 ], std: [ 2.53, 1.50 ], fq: 22
  },
  "falling": {
    dict: "anew-neg", word: "falling", stem: "fall",
    ant: [ "ascend", "rising" ],
    avg: [ 5.39, 6.39 ], std: [ 2.44, 1.32 ], fq: 72
  },
  "falls": {
    dict: "anew-neg", word: "falls", stem: "fall",
    ant: [ "ascend" ],
    avg: [ 4.13, 6.19 ], std: [ 2.53, 1.50 ], fq: 22
  },
  "false": {
    dict: "anew-neg", word: "false", stem: "fals",
    ant: [ "true" ],
    avg: [ 5.32, 7.08 ], std: [ 1.92, 1.10 ], fq: 50
  },
  "fancy": {
    dict: "anew-neg", word: "fancy", stem: "fanci",
    ant: [ "plain" ],
    avg: [ 3.52, 5.00 ], std: [ 2.05, 1.44 ], fq: 50
  },
  "fast": {
    dict: "anew-neg", word: "fast", stem: "fast",
    ant: [ "slow" ],
    avg: [ 3.39, 3.78 ], std: [ 2.22, 1.11 ], fq: 50
  },
  "faster": {
    dict: "anew-neg", word: "faster", stem: "faster",
    ant: [ "slow" ],
    avg: [ 3.39, 3.78 ], std: [ 2.22, 1.11 ], fq: 50
  },
  "fat": {
    dict: "anew-neg", word: "fat", stem: "fat",
    ant: [ "thin" ],
    avg: [ 5.00, 5.74 ], std: [ 2.32, 1.38 ], fq: 50
  },
  "father": {
    dict: "anew-neg", word: "father", stem: "father",
    ant: [ "mother" ],
    avg: [ 6.13, 7.68 ], std: [ 2.71, 1.67 ], fq: 50
  },
  "fathers": {
    dict: "anew-neg", word: "fathers", stem: "father",
    ant: [ "mother" ],
    avg: [ 6.13, 7.68 ], std: [ 2.71, 1.67 ], fq: 50
  },
  "fatigue": {
    dict: "anew-neg", word: "fatigue", stem: "fatigu",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "fatigued": {
    dict: "anew-neg", word: "fatigued", stem: "fatigu",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "fault": {
    dict: "anew-neg", word: "fault", stem: "fault",
    ant: [ "merit" ],
    avg: [ 4.52, 6.74 ], std: [ 2.52, 1.21 ], fq: 50
  },
  "fearful": {
    dict: "anew-neg", word: "fearful", stem: "fear",
    ant: [ "brave" ],
    avg: [ 6.15, 7.02 ], std: [ 2.45, 1.29 ], fq: 50
  },
  "fed": {
    dict: "anew-neg", word: "fed", stem: "fed",
    ant: [ "starve" ],
    avg: [ 4.00, 2.53 ], std: [ 2.59, 1.02 ], fq: 18
  },
  "feed": {
    dict: "anew-neg", word: "feed", stem: "feed",
    ant: [ "starve" ],
    avg: [ 4.00, 2.53 ], std: [ 2.59, 1.02 ], fq: 18
  },
  "feeding": {
    dict: "anew-neg", word: "feeding", stem: "feed",
    ant: [ "starve" ],
    avg: [ 4.00, 2.53 ], std: [ 2.59, 1.02 ], fq: 18
  },
  "feeds": {
    dict: "anew-neg", word: "feeds", stem: "feed",
    ant: [ "starve" ],
    avg: [ 4.00, 2.53 ], std: [ 2.59, 1.02 ], fq: 18
  },
  "feet": {
    dict: "anew-neg", word: "feet", stem: "feet",
    ant: [ "head" ],
    avg: [ 5.00, 5.96 ], std: [ 2.68, 1.07 ], fq: 50
  },
  "fell": {
    dict: "anew-neg", word: "fell", stem: "fell",
    ant: [ "ascend" ],
    avg: [ 4.13, 6.19 ], std: [ 2.53, 1.50 ], fq: 22
  },
  "female": {
    dict: "anew-neg", word: "female", stem: "femal",
    ant: [ "male" ],
    avg: [ 5.24, 6.02 ], std: [ 2.31, 1.36 ], fq: 50
  },
  "fidelity": {
    dict: "anew-neg", word: "fidelity", stem: "fidel",
    ant: [ "infidelity" ],
    avg: [ 5.70, 2.10 ], std: [ 2.57, 1.62 ], fq: 21
  },
  "figure": {
    dict: "anew-neg", word: "figure", stem: "figur",
    ant: [ "ground" ],
    avg: [ 4.58, 5.26 ], std: [ 2.14, 1.29 ], fq: 50
  },
  "figures": {
    dict: "anew-neg", word: "figures", stem: "figur",
    ant: [ "ground" ],
    avg: [ 4.58, 5.26 ], std: [ 2.14, 1.29 ], fq: 50
  },
  "fill": {
    dict: "anew-neg", word: "fill", stem: "fill",
    ant: [ "empty" ],
    avg: [ 5.64, 3.56 ], std: [ 2.99, 1.63 ], fq: 50
  },
  "filled": {
    dict: "anew-neg", word: "filled", stem: "fill",
    ant: [ "empty" ],
    avg: [ 5.64, 3.56 ], std: [ 2.99, 1.63 ], fq: 50
  },
  "filling": {
    dict: "anew-neg", word: "filling", stem: "fill",
    ant: [ "empty" ],
    avg: [ 5.64, 3.56 ], std: [ 2.99, 1.63 ], fq: 50
  },
  "fills": {
    dict: "anew-neg", word: "fills", stem: "fill",
    ant: [ "empty" ],
    avg: [ 5.64, 3.56 ], std: [ 2.99, 1.63 ], fq: 50
  },
  "find": {
    dict: "anew-neg", word: "find", stem: "find",
    ant: [ "lose" ],
    avg: [ 5.43, 3.59 ], std: [ 2.69, 2.09 ], fq: 21
  },
  "finding": {
    dict: "anew-neg", word: "finding", stem: "find",
    ant: [ "lose" ],
    avg: [ 5.43, 3.59 ], std: [ 2.69, 2.09 ], fq: 21
  },
  "findings": {
    dict: "anew-neg", word: "findings", stem: "find",
    ant: [ "lose" ],
    avg: [ 5.43, 3.59 ], std: [ 2.69, 2.09 ], fq: 21
  },
  "finds": {
    dict: "anew-neg", word: "finds", stem: "find",
    ant: [ "lose" ],
    avg: [ 5.43, 3.59 ], std: [ 2.69, 2.09 ], fq: 21
  },
  "fine": {
    dict: "anew-neg", word: "fine", stem: "fine",
    ant: [ "coarse" ],
    avg: [ 4.21, 4.55 ], std: [ 1.84, 1.42 ], fq: 10
  },
  "finish": {
    dict: "anew-neg", word: "finish", stem: "finish",
    ant: [ "beginning", "start", "begin" ],
    avg: [ 3.24, 6.29 ], std: [ 2.40, 1.92 ], fq: 88
  },
  "fire": {
    dict: "anew-neg", word: "fire", stem: "fire",
    ant: [ "hire" ],
    avg: [ 6.77, 6.50 ], std: [ 2.07, 1.34 ], fq: 50
  },
  "fired": {
    dict: "anew-neg", word: "fired", stem: "fire",
    ant: [ "hire" ],
    avg: [ 6.77, 6.50 ], std: [ 2.07, 1.34 ], fq: 50
  },
  "fires": {
    dict: "anew-neg", word: "fires", stem: "fire",
    ant: [ "hire" ],
    avg: [ 6.77, 6.50 ], std: [ 2.07, 1.34 ], fq: 50
  },
  "first": {
    dict: "anew-neg", word: "first", stem: "first",
    ant: [ "end", "last", "second" ],
    avg: [ 4.29, 4.53 ], std: [ 2.83, 1.42 ], fq: 150
  },
  "fit": {
    dict: "anew-neg", word: "fit", stem: "fit",
    ant: [ "disagree", "unfit" ],
    avg: [ 4.33, 2.89 ], std: [ 2.07, 1.28 ], fq: 39
  },
  "fix": {
    dict: "anew-neg", word: "fix", stem: "fix",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "fixed": {
    dict: "anew-neg", word: "fixed", stem: "fix",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "fixing": {
    dict: "anew-neg", word: "fixing", stem: "fix",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "flat": {
    dict: "anew-neg", word: "flat", stem: "flat",
    ant: [ "natural" ],
    avg: [ 4.37, 6.56 ], std: [ 2.51, 1.49 ], fq: 50
  },
  "flatter": {
    dict: "anew-neg", word: "flatter", stem: "flatter",
    ant: [ "disparage", "natural" ],
    avg: [ 4.14, 4.63 ], std: [ 2.26, 1.38 ], fq: 72
  },
  "flattered": {
    dict: "anew-neg", word: "flattered", stem: "flatter",
    ant: [ "disparage" ],
    avg: [ 3.96, 3.00 ], std: [ 1.97, 1.26 ], fq: 22
  },
  "flattering": {
    dict: "anew-neg", word: "flattering", stem: "flatter",
    ant: [ "disparage" ],
    avg: [ 3.96, 3.00 ], std: [ 1.97, 1.26 ], fq: 22
  },
  "flex": {
    dict: "anew-neg", word: "flex", stem: "flex",
    ant: [ "straighten" ],
    avg: [ 3.00, 6.26 ], std: [ 2.30, 1.76 ], fq: 20
  },
  "flexible": {
    dict: "anew-neg", word: "flexible", stem: "flexibl",
    ant: [ "uncompromising" ],
    avg: [ 5.17, 3.95 ], std: [ 2.12, 1.72 ], fq: 22
  },
  "flunk": {
    dict: "anew-neg", word: "flunk", stem: "flunk",
    ant: [ "passing", "pass" ],
    avg: [ 4.52, 5.69 ], std: [ 2.31, 1.59 ], fq: 100
  },
  "foe": {
    dict: "anew-neg", word: "foe", stem: "foe",
    ant: [ "friend" ],
    avg: [ 5.11, 7.66 ], std: [ 2.96, 1.51 ], fq: 50
  },
  "following": {
    dict: "anew-neg", word: "following", stem: "follow",
    ant: [ "leading" ],
    avg: [ 5.83, 6.64 ], std: [ 2.44, 1.51 ], fq: 50
  },
  "foolish": {
    dict: "anew-neg", word: "foolish", stem: "foolish",
    ant: [ "wise" ],
    avg: [ 3.91, 7.10 ], std: [ 2.64, 1.27 ], fq: 50
  },
  "foot": {
    dict: "anew-neg", word: "foot", stem: "foot",
    ant: [ "head" ],
    avg: [ 5.00, 5.96 ], std: [ 2.68, 1.07 ], fq: 50
  },
  "forbid": {
    dict: "anew-neg", word: "forbid", stem: "forbid",
    ant: [ "allow" ],
    avg: [ 3.27, 6.00 ], std: [ 2.05, 1.47 ], fq: 50
  },
  "forbidding": {
    dict: "anew-neg", word: "forbidding", stem: "forbid",
    ant: [ "allow" ],
    avg: [ 3.27, 6.00 ], std: [ 2.05, 1.47 ], fq: 50
  },
  "force": {
    dict: "anew-neg", word: "force", stem: "forc",
    ant: [ "push" ],
    avg: [ 6.44, 4.44 ], std: [ 2.58, 1.47 ], fq: 50
  },
  "forced": {
    dict: "anew-neg", word: "forced", stem: "forc",
    ant: [ "push" ],
    avg: [ 6.44, 4.44 ], std: [ 2.58, 1.47 ], fq: 50
  },
  "forces": {
    dict: "anew-neg", word: "forces", stem: "forc",
    ant: [ "push" ],
    avg: [ 6.44, 4.44 ], std: [ 2.58, 1.47 ], fq: 50
  },
  "forfeit": {
    dict: "anew-neg", word: "forfeit", stem: "forfeit",
    ant: [ "claim" ],
    avg: [ 5.65, 5.18 ], std: [ 2.23, 1.49 ], fq: 50
  },
  "forget": {
    dict: "anew-neg", word: "forget", stem: "forget",
    ant: [ "remember", "mind" ],
    avg: [ 3.91, 6.27 ], std: [ 2.31, 1.29 ], fq: 71
  },
  "forgetful": {
    dict: "anew-neg", word: "forgetful", stem: "forget",
    ant: [ "mindful" ],
    avg: [ 6.00, 6.70 ], std: [ 2.70, 1.30 ], fq: 20
  },
  "forgiving": {
    dict: "anew-neg", word: "forgiving", stem: "forgiv",
    ant: [ "unforgiving" ],
    avg: [ 4.81, 2.41 ], std: [ 2.30, 1.59 ], fq: 24
  },
  "fortunate": {
    dict: "anew-neg", word: "fortunate", stem: "fortun",
    ant: [ "unfortunate" ],
    avg: [ 3.52, 3.33 ], std: [ 2.35, 1.49 ], fq: 24
  },
  "foul": {
    dict: "anew-neg", word: "foul", stem: "foul",
    ant: [ "fair" ],
    avg: [ 5.32, 6.96 ], std: [ 1.92, 1.26 ], fq: 50
  },
  "found": {
    dict: "anew-neg", word: "found", stem: "found",
    ant: [ "abolish", "lose", "lost" ],
    avg: [ 5.06, 3.35 ], std: [ 2.48, 1.70 ], fq: 89
  },
  "founded": {
    dict: "anew-neg", word: "founded", stem: "found",
    ant: [ "abolish" ],
    avg: [ 4.18, 3.84 ], std: [ 2.07, 1.54 ], fq: 18
  },
  "founding": {
    dict: "anew-neg", word: "founding", stem: "found",
    ant: [ "abolish" ],
    avg: [ 4.18, 3.84 ], std: [ 2.07, 1.54 ], fq: 18
  },
  "frail": {
    dict: "anew-neg", word: "frail", stem: "frail",
    ant: [ "robust" ],
    avg: [ 5.24, 6.10 ], std: [ 2.74, 1.33 ], fq: 20
  },
  "free": {
    dict: "anew-neg", word: "free", stem: "free",
    ant: [ "confine", "lodge", "obstruct", "blame", "block", "bound" ],
    avg: [ 4.23, 4.05 ], std: [ 2.33, 1.41 ], fq: 212
  },
  "fresh": {
    dict: "anew-neg", word: "fresh", stem: "fresh",
    ant: [ "stale", "preserved" ],
    avg: [ 3.75, 4.86 ], std: [ 2.07, 1.40 ], fq: 71
  },
  "freshen": {
    dict: "anew-neg", word: "freshen", stem: "freshen",
    ant: [ "tire" ],
    avg: [ 2.83, 4.65 ], std: [ 2.31, 1.49 ], fq: 50
  },
  "friend": {
    dict: "anew-neg", word: "friend", stem: "friend",
    ant: [ "foe", "stranger" ],
    avg: [ 5.13, 3.78 ], std: [ 2.52, 1.32 ], fq: 72
  },
  "friendly": {
    dict: "anew-neg", word: "friendly", stem: "friendli",
    ant: [ "hostile", "unfriendly" ],
    avg: [ 5.31, 2.65 ], std: [ 2.41, 1.92 ], fq: 70
  },
  "friends": {
    dict: "anew-neg", word: "friends", stem: "friend",
    ant: [ "foe", "stranger" ],
    avg: [ 5.13, 3.78 ], std: [ 2.52, 1.32 ], fq: 72
  },
  "front": {
    dict: "anew-neg", word: "front", stem: "front",
    ant: [ "rear", "back" ],
    avg: [ 3.49, 5.15 ], std: [ 1.87, 1.36 ], fq: 100
  },
  "full": {
    dict: "anew-neg", word: "full", stem: "full",
    ant: [ "empty", "thin" ],
    avg: [ 5.28, 4.74 ], std: [ 2.68, 1.51 ], fq: 100
  },
  "fullness": {
    dict: "anew-neg", word: "fullness", stem: "full",
    ant: [ "emptiness" ],
    avg: [ 4.98, 3.35 ], std: [ 2.31, 1.97 ], fq: 50
  },
  "function": {
    dict: "anew-neg", word: "function", stem: "function",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "functions": {
    dict: "anew-neg", word: "functions", stem: "function",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "gain": {
    dict: "anew-neg", word: "gain", stem: "gain",
    ant: [ "loss", "lose", "reduce" ],
    avg: [ 5.10, 3.48 ], std: [ 2.30, 1.65 ], fq: 121
  },
  "gained": {
    dict: "anew-neg", word: "gained", stem: "gain",
    ant: [ "lose", "reduce" ],
    avg: [ 4.99, 3.96 ], std: [ 2.43, 1.73 ], fq: 71
  },
  "gains": {
    dict: "anew-neg", word: "gains", stem: "gain",
    ant: [ "loss", "lose", "reduce" ],
    avg: [ 5.10, 3.48 ], std: [ 2.30, 1.65 ], fq: 121
  },
  "garment": {
    dict: "anew-neg", word: "garment", stem: "garment",
    ant: [ "undress" ],
    avg: [ 5.96, 6.14 ], std: [ 2.77, 1.74 ], fq: 22
  },
  "gave": {
    dict: "anew-neg", word: "gave", stem: "gave",
    ant: [ "take", "starve" ],
    avg: [ 4.75, 3.60 ], std: [ 2.41, 1.29 ], fq: 68
  },
  "generous": {
    dict: "anew-neg", word: "generous", stem: "gener",
    ant: [ "stingy" ],
    avg: [ 4.73, 2.53 ], std: [ 3.27, 1.47 ], fq: 20
  },
  "genuine": {
    dict: "anew-neg", word: "genuine", stem: "genuin",
    ant: [ "counterfeit" ],
    avg: [ 4.18, 3.16 ], std: [ 2.86, 1.54 ], fq: 20
  },
  "geographic": {
    dict: "anew-neg", word: "geographic", stem: "geograph",
    ant: [ "magnetic" ],
    avg: [ 3.55, 6.17 ], std: [ 2.56, 1.47 ], fq: 19
  },
  "geographical": {
    dict: "anew-neg", word: "geographical", stem: "geograph",
    ant: [ "magnetic" ],
    avg: [ 3.55, 6.17 ], std: [ 2.56, 1.47 ], fq: 19
  },
  "get": {
    dict: "anew-neg", word: "get", stem: "get",
    ant: [ "leave", "end" ],
    avg: [ 4.14, 4.45 ], std: [ 2.69, 1.55 ], fq: 100
  },
  "gets": {
    dict: "anew-neg", word: "gets", stem: "get",
    ant: [ "leave", "end" ],
    avg: [ 4.14, 4.45 ], std: [ 2.69, 1.55 ], fq: 100
  },
  "getting": {
    dict: "anew-neg", word: "getting", stem: "get",
    ant: [ "leave", "end" ],
    avg: [ 4.14, 4.45 ], std: [ 2.69, 1.55 ], fq: 100
  },
  "girl": {
    dict: "anew-neg", word: "girl", stem: "girl",
    ant: [ "boy", "son" ],
    avg: [ 4.58, 6.61 ], std: [ 2.37, 1.57 ], fq: 100
  },
  "girls": {
    dict: "anew-neg", word: "girls", stem: "girl",
    ant: [ "boy", "son" ],
    avg: [ 4.58, 6.61 ], std: [ 2.37, 1.57 ], fq: 100
  },
  "give": {
    dict: "anew-neg", word: "give", stem: "give",
    ant: [ "take", "starve" ],
    avg: [ 4.75, 3.60 ], std: [ 2.41, 1.29 ], fq: 68
  },
  "given": {
    dict: "anew-neg", word: "given", stem: "given",
    ant: [ "take", "starve" ],
    avg: [ 4.75, 3.60 ], std: [ 2.41, 1.29 ], fq: 68
  },
  "gives": {
    dict: "anew-neg", word: "gives", stem: "give",
    ant: [ "take", "starve" ],
    avg: [ 4.75, 3.60 ], std: [ 2.41, 1.29 ], fq: 68
  },
  "giving": {
    dict: "anew-neg", word: "giving", stem: "give",
    ant: [ "take", "starve" ],
    avg: [ 4.75, 3.60 ], std: [ 2.41, 1.29 ], fq: 68
  },
  "glad": {
    dict: "anew-neg", word: "glad", stem: "glad",
    ant: [ "sad" ],
    avg: [ 4.13, 2.38 ], std: [ 2.38, 1.61 ], fq: 50
  },
  "go": {
    dict: "anew-neg", word: "go", stem: "go",
    ant: [ "come", "malfunction", "stop" ],
    avg: [ 4.76, 4.36 ], std: [ 2.58, 1.29 ], fq: 120
  },
  "goed": {
    dict: "anew-neg", word: "goed", stem: "go",
    ant: [ "come", "malfunction", "stop" ],
    avg: [ 4.76, 4.36 ], std: [ 2.58, 1.29 ], fq: 120
  },
  "goes": {
    dict: "anew-neg", word: "goes", stem: "goe",
    ant: [ "come", "malfunction", "stop" ],
    avg: [ 4.76, 4.36 ], std: [ 2.58, 1.29 ], fq: 120
  },
  "going": {
    dict: "anew-neg", word: "going", stem: "go",
    ant: [ "come", "malfunction", "stop" ],
    avg: [ 4.76, 4.36 ], std: [ 2.58, 1.29 ], fq: 120
  },
  "gone": {
    dict: "anew-neg", word: "gone", stem: "gone",
    ant: [ "come", "malfunction", "stop" ],
    avg: [ 4.76, 4.36 ], std: [ 2.58, 1.29 ], fq: 120
  },
  "good": {
    dict: "anew-neg", word: "good", stem: "good",
    ant: [ "evil", "bad", "badness", "ill" ],
    avg: [ 5.34, 2.53 ], std: [ 2.50, 1.53 ], fq: 170
  },
  "goodness": {
    dict: "anew-neg", word: "goodness", stem: "good",
    ant: [ "bad", "badness", "evil" ],
    avg: [ 5.57, 2.58 ], std: [ 2.58, 1.62 ], fq: 120
  },
  "goods": {
    dict: "anew-neg", word: "goods", stem: "good",
    ant: [ "evil", "bad", "badness" ],
    avg: [ 5.57, 2.58 ], std: [ 2.58, 1.62 ], fq: 120
  },
  "got": {
    dict: "anew-neg", word: "got", stem: "got",
    ant: [ "leave", "end" ],
    avg: [ 4.14, 4.45 ], std: [ 2.69, 1.55 ], fq: 100
  },
  "gotten": {
    dict: "anew-neg", word: "gotten", stem: "gotten",
    ant: [ "leave", "end" ],
    avg: [ 4.14, 4.45 ], std: [ 2.69, 1.55 ], fq: 100
  },
  "graceful": {
    dict: "anew-neg", word: "graceful", stem: "grace",
    ant: [ "awkward" ],
    avg: [ 5.18, 3.62 ], std: [ 2.40, 1.40 ], fq: 50
  },
  "grateful": {
    dict: "anew-neg", word: "grateful", stem: "grate",
    ant: [ "ungrateful" ],
    avg: [ 4.71, 2.68 ], std: [ 2.24, 1.45 ], fq: 20
  },
  "grime": {
    dict: "anew-neg", word: "grime", stem: "grime",
    ant: [ "clean" ],
    avg: [ 4.37, 6.90 ], std: [ 2.14, 1.90 ], fq: 50
  },
  "gross": {
    dict: "anew-neg", word: "gross", stem: "gross",
    ant: [ "net" ],
    avg: [ 6.68, 5.96 ], std: [ 1.78, 1.03 ], fq: 50
  },
  "ground": {
    dict: "anew-neg", word: "ground", stem: "ground",
    ant: [ "figure" ],
    avg: [ 4.75, 5.50 ], std: [ 1.93, 1.15 ], fq: 50
  },
  "grounds": {
    dict: "anew-neg", word: "grounds", stem: "ground",
    ant: [ "figure" ],
    avg: [ 4.75, 5.50 ], std: [ 1.93, 1.15 ], fq: 50
  },
  "guilt": {
    dict: "anew-neg", word: "guilt", stem: "guilt",
    ant: [ "innocence" ],
    avg: [ 4.21, 6.50 ], std: [ 1.99, 1.73 ], fq: 50
  },
  "guilty": {
    dict: "anew-neg", word: "guilty", stem: "guilti",
    ant: [ "innocent" ],
    avg: [ 4.21, 6.36 ], std: [ 1.99, 1.38 ], fq: 50
  },
  "happiness": {
    dict: "anew-neg", word: "happiness", stem: "happi",
    ant: [ "unhappiness", "sadness" ],
    avg: [ 4.26, 1.88 ], std: [ 2.62, 1.22 ], fq: 70
  },
  "happy": {
    dict: "anew-neg", word: "happy", stem: "happi",
    ant: [ "unhappy" ],
    avg: [ 4.18, 2.12 ], std: [ 2.50, 1.36 ], fq: 50
  },
  "hard": {
    dict: "anew-neg", word: "hard", stem: "hard",
    ant: [ "easy", "soft" ],
    avg: [ 4.56, 6.60 ], std: [ 2.72, 1.42 ], fq: 100
  },
  "harder": {
    dict: "anew-neg", word: "harder", stem: "harder",
    ant: [ "easy", "soft" ],
    avg: [ 4.56, 6.60 ], std: [ 2.72, 1.42 ], fq: 100
  },
  "hardest": {
    dict: "anew-neg", word: "hardest", stem: "hardest",
    ant: [ "easy", "soft" ],
    avg: [ 4.56, 6.60 ], std: [ 2.72, 1.42 ], fq: 100
  },
  "hardware": {
    dict: "anew-neg", word: "hardware", stem: "hardwar",
    ant: [ "software" ],
    avg: [ 3.83, 6.37 ], std: [ 2.48, 1.57 ], fq: 21
  },
  "harmful": {
    dict: "anew-neg", word: "harmful", stem: "harm",
    ant: [ "harmless" ],
    avg: [ 3.50, 6.59 ], std: [ 2.64, 1.44 ], fq: 20
  },
  "harmless": {
    dict: "anew-neg", word: "harmless", stem: "harmless",
    ant: [ "harmful" ],
    avg: [ 4.89, 2.29 ], std: [ 2.62, 1.95 ], fq: 20
  },
  "harsh": {
    dict: "anew-neg", word: "harsh", stem: "harsh",
    ant: [ "fine" ],
    avg: [ 3.86, 6.50 ], std: [ 2.43, 1.41 ], fq: 21
  },
  "hate": {
    dict: "anew-neg", word: "hate", stem: "hate",
    ant: [ "love" ],
    avg: [ 6.38, 8.42 ], std: [ 2.68, 1.11 ], fq: 50
  },
  "hated": {
    dict: "anew-neg", word: "hated", stem: "hate",
    ant: [ "love" ],
    avg: [ 6.38, 8.42 ], std: [ 2.68, 1.11 ], fq: 50
  },
  "hateful": {
    dict: "anew-neg", word: "hateful", stem: "hate",
    ant: [ "lovable" ],
    avg: [ 5.41, 8.26 ], std: [ 2.72, 0.99 ], fq: 20
  },
  "hates": {
    dict: "anew-neg", word: "hates", stem: "hate",
    ant: [ "love" ],
    avg: [ 6.38, 8.42 ], std: [ 2.68, 1.11 ], fq: 50
  },
  "hating": {
    dict: "anew-neg", word: "hating", stem: "hate",
    ant: [ "love" ],
    avg: [ 6.38, 8.42 ], std: [ 2.68, 1.11 ], fq: 50
  },
  "hatred": {
    dict: "anew-neg", word: "hatred", stem: "hatr",
    ant: [ "love" ],
    avg: [ 6.38, 8.42 ], std: [ 2.68, 1.11 ], fq: 50
  },
  "hawk": {
    dict: "anew-neg", word: "hawk", stem: "hawk",
    ant: [ "dove" ],
    avg: [ 3.79, 7.04 ], std: [ 2.28, 1.44 ], fq: 50
  },
  "head": {
    dict: "anew-neg", word: "head", stem: "head",
    ant: [ "rear", "foot", "tail" ],
    avg: [ 3.45, 5.26 ], std: [ 2.00, 1.43 ], fq: 150
  },
  "heads": {
    dict: "anew-neg", word: "heads", stem: "head",
    ant: [ "rear", "foot", "tail" ],
    avg: [ 3.45, 5.26 ], std: [ 2.00, 1.43 ], fq: 150
  },
  "health": {
    dict: "anew-neg", word: "health", stem: "health",
    ant: [ "illness" ],
    avg: [ 4.71, 2.00 ], std: [ 2.24, 1.18 ], fq: 50
  },
  "healthy": {
    dict: "anew-neg", word: "healthy", stem: "healthi",
    ant: [ "unhealthy" ],
    avg: [ 4.36, 2.55 ], std: [ 2.11, 1.47 ], fq: 21
  },
  "hearing": {
    dict: "anew-neg", word: "hearing", stem: "hear",
    ant: [ "deaf" ],
    avg: [ 3.18, 2.67 ], std: [ 1.85, 1.33 ], fq: 50
  },
  "heat": {
    dict: "anew-neg", word: "heat", stem: "heat",
    ant: [ "cool" ],
    avg: [ 3.43, 6.82 ], std: [ 2.31, 1.56 ], fq: 21
  },
  "heavy": {
    dict: "anew-neg", word: "heavy", stem: "heavi",
    ant: [ "light" ],
    avg: [ 5.40, 6.40 ], std: [ 2.33, 1.51 ], fq: 50
  },
  "held": {
    dict: "anew-neg", word: "held", stem: "held",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "hid": {
    dict: "anew-neg", word: "hid", stem: "hid",
    ant: [ "show" ],
    avg: [ 5.12, 6.24 ], std: [ 2.39, 1.49 ], fq: 50
  },
  "hidden": {
    dict: "anew-neg", word: "hidden", stem: "hidden",
    ant: [ "show" ],
    avg: [ 5.12, 6.24 ], std: [ 2.39, 1.49 ], fq: 50
  },
  "hide": {
    dict: "anew-neg", word: "hide", stem: "hide",
    ant: [ "show" ],
    avg: [ 5.12, 6.24 ], std: [ 2.39, 1.49 ], fq: 50
  },
  "hides": {
    dict: "anew-neg", word: "hides", stem: "hide",
    ant: [ "show" ],
    avg: [ 5.12, 6.24 ], std: [ 2.39, 1.49 ], fq: 50
  },
  "hiding": {
    dict: "anew-neg", word: "hiding", stem: "hide",
    ant: [ "show" ],
    avg: [ 5.12, 6.24 ], std: [ 2.39, 1.49 ], fq: 50
  },
  "high": {
    dict: "anew-neg", word: "high", stem: "high",
    ant: [ "low" ],
    avg: [ 4.54, 3.66 ], std: [ 3.19, 1.12 ], fq: 50
  },
  "hire": {
    dict: "anew-neg", word: "hire", stem: "hire",
    ant: [ "fire" ],
    avg: [ 7.17, 3.80 ], std: [ 2.06, 1.58 ], fq: 50
  },
  "hired": {
    dict: "anew-neg", word: "hired", stem: "hire",
    ant: [ "fire" ],
    avg: [ 7.17, 3.80 ], std: [ 2.06, 1.58 ], fq: 50
  },
  "hiring": {
    dict: "anew-neg", word: "hiring", stem: "hire",
    ant: [ "fire" ],
    avg: [ 7.17, 3.80 ], std: [ 2.06, 1.58 ], fq: 50
  },
  "hiss": {
    dict: "anew-neg", word: "hiss", stem: "hiss",
    ant: [ "applaud" ],
    avg: [ 5.05, 6.70 ], std: [ 1.75, 1.17 ], fq: 19
  },
  "hit": {
    dict: "anew-neg", word: "hit", stem: "hit",
    ant: [ "miss" ],
    avg: [ 4.29, 3.64 ], std: [ 2.69, 1.63 ], fq: 50
  },
  "hits": {
    dict: "anew-neg", word: "hits", stem: "hit",
    ant: [ "miss" ],
    avg: [ 4.29, 3.64 ], std: [ 2.69, 1.63 ], fq: 50
  },
  "hitting": {
    dict: "anew-neg", word: "hitting", stem: "hit",
    ant: [ "miss" ],
    avg: [ 4.29, 3.64 ], std: [ 2.69, 1.63 ], fq: 50
  },
  "hold": {
    dict: "anew-neg", word: "hold", stem: "hold",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "holding": {
    dict: "anew-neg", word: "holding", stem: "hold",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "holdings": {
    dict: "anew-neg", word: "holdings", stem: "hold",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "holds": {
    dict: "anew-neg", word: "holds", stem: "hold",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "holy": {
    dict: "anew-neg", word: "holy", stem: "holi",
    ant: [ "unholy" ],
    avg: [ 6.76, 2.73 ], std: [ 2.68, 1.40 ], fq: 50
  },
  "honest": {
    dict: "anew-neg", word: "honest", stem: "honest",
    ant: [ "dishonest" ],
    avg: [ 4.95, 3.00 ], std: [ 2.24, 1.49 ], fq: 21
  },
  "honesty": {
    dict: "anew-neg", word: "honesty", stem: "honesti",
    ant: [ "dishonesty" ],
    avg: [ 5.39, 2.05 ], std: [ 2.68, 0.89 ], fq: 19
  },
  "honor": {
    dict: "anew-neg", word: "honor", stem: "honor",
    ant: [ "dishonor", "disrespect" ],
    avg: [ 5.07, 2.62 ], std: [ 2.25, 1.68 ], fq: 70
  },
  "honorable": {
    dict: "anew-neg", word: "honorable", stem: "honor",
    ant: [ "dishonest", "dishonorable" ],
    avg: [ 5.40, 2.64 ], std: [ 2.03, 1.39 ], fq: 42
  },
  "honored": {
    dict: "anew-neg", word: "honored", stem: "honor",
    ant: [ "dishonor", "disrespect" ],
    avg: [ 5.07, 2.62 ], std: [ 2.25, 1.68 ], fq: 70
  },
  "honour": {
    dict: "anew-neg", word: "honour", stem: "honour",
    ant: [ "dishonor", "disrespect" ],
    avg: [ 5.07, 2.62 ], std: [ 2.25, 1.68 ], fq: 70
  },
  "hope": {
    dict: "anew-neg", word: "hope", stem: "hope",
    ant: [ "despair" ],
    avg: [ 5.68, 2.82 ], std: [ 2.37, 2.01 ], fq: 50
  },
  "hoped": {
    dict: "anew-neg", word: "hoped", stem: "hope",
    ant: [ "despair" ],
    avg: [ 5.68, 2.82 ], std: [ 2.37, 2.01 ], fq: 50
  },
  "hopeful": {
    dict: "anew-neg", word: "hopeful", stem: "hope",
    ant: [ "hopeless" ],
    avg: [ 4.52, 2.20 ], std: [ 2.38, 1.20 ], fq: 22
  },
  "hopeless": {
    dict: "anew-neg", word: "hopeless", stem: "hopeless",
    ant: [ "hopeful" ],
    avg: [ 4.84, 7.44 ], std: [ 2.64, 1.34 ], fq: 43
  },
  "hopes": {
    dict: "anew-neg", word: "hopes", stem: "hope",
    ant: [ "despair" ],
    avg: [ 5.68, 2.82 ], std: [ 2.37, 2.01 ], fq: 50
  },
  "hoping": {
    dict: "anew-neg", word: "hoping", stem: "hope",
    ant: [ "despair" ],
    avg: [ 5.68, 2.82 ], std: [ 2.37, 2.01 ], fq: 50
  },
  "hospitable": {
    dict: "anew-neg", word: "hospitable", stem: "hospit",
    ant: [ "inhospitable" ],
    avg: [ 4.36, 2.65 ], std: [ 2.22, 1.53 ], fq: 21
  },
  "hostile": {
    dict: "anew-neg", word: "hostile", stem: "hostil",
    ant: [ "friendly" ],
    avg: [ 4.54, 7.66 ], std: [ 1.86, 1.55 ], fq: 50
  },
  "hot": {
    dict: "anew-neg", word: "hot", stem: "hot",
    ant: [ "cold" ],
    avg: [ 5.19, 4.22 ], std: [ 2.23, 1.78 ], fq: 50
  },
  "hotter": {
    dict: "anew-neg", word: "hotter", stem: "hotter",
    ant: [ "cold" ],
    avg: [ 5.19, 4.22 ], std: [ 2.23, 1.78 ], fq: 50
  },
  "hottest": {
    dict: "anew-neg", word: "hottest", stem: "hottest",
    ant: [ "cold" ],
    avg: [ 5.19, 4.22 ], std: [ 2.23, 1.78 ], fq: 50
  },
  "humane": {
    dict: "anew-neg", word: "humane", stem: "human",
    ant: [ "inhumane" ],
    avg: [ 5.43, 3.10 ], std: [ 2.18, 2.36 ], fq: 21
  },
  "humble": {
    dict: "anew-neg", word: "humble", stem: "humbl",
    ant: [ "proud" ],
    avg: [ 5.56, 7.32 ], std: [ 3.01, 1.43 ], fq: 50
  },
  "hungry": {
    dict: "anew-neg", word: "hungry", stem: "hungri",
    ant: [ "thirsty" ],
    avg: [ 5.13, 3.79 ], std: [ 2.44, 1.46 ], fq: 50
  },
  "husband": {
    dict: "anew-neg", word: "husband", stem: "husband",
    ant: [ "wife", "waste" ],
    avg: [ 4.54, 4.14 ], std: [ 2.26, 1.48 ], fq: 100
  },
  "ignore": {
    dict: "anew-neg", word: "ignore", stem: "ignor",
    ant: [ "notice", "know" ],
    avg: [ 5.13, 5.65 ], std: [ 2.62, 1.45 ], fq: 100
  },
  "ignored": {
    dict: "anew-neg", word: "ignored", stem: "ignor",
    ant: [ "notice", "know" ],
    avg: [ 5.13, 5.65 ], std: [ 2.62, 1.45 ], fq: 100
  },
  "ill": {
    dict: "anew-neg", word: "ill", stem: "ill",
    ant: [ "well" ],
    avg: [ 5.43, 6.68 ], std: [ 2.85, 1.25 ], fq: 50
  },
  "illness": {
    dict: "anew-neg", word: "illness", stem: "ill",
    ant: [ "wellness" ],
    avg: [ 4.56, 7.67 ], std: [ 2.40, 1.28 ], fq: 23
  },
  "illogical": {
    dict: "anew-neg", word: "illogical", stem: "illog",
    ant: [ "logical" ],
    avg: [ 3.83, 6.38 ], std: [ 1.99, 2.25 ], fq: 22
  },
  "imbalance": {
    dict: "anew-neg", word: "imbalance", stem: "imbal",
    ant: [ "balance" ],
    avg: [ 4.13, 6.84 ], std: [ 2.03, 1.57 ], fq: 21
  },
  "immature": {
    dict: "anew-neg", word: "immature", stem: "immatur",
    ant: [ "old" ],
    avg: [ 4.48, 3.19 ], std: [ 2.66, 1.94 ], fq: 21
  },
  "immobile": {
    dict: "anew-neg", word: "immobile", stem: "immobil",
    ant: [ "mobile" ],
    avg: [ 5.00, 6.36 ], std: [ 2.18, 1.21 ], fq: 50
  },
  "immoral": {
    dict: "anew-neg", word: "immoral", stem: "immor",
    ant: [ "moral" ],
    avg: [ 4.49, 6.54 ], std: [ 2.28, 1.86 ], fq: 50
  },
  "immortal": {
    dict: "anew-neg", word: "immortal", stem: "immort",
    ant: [ "mortal" ],
    avg: [ 4.19, 4.29 ], std: [ 2.45, 2.03 ], fq: 50
  },
  "impatience": {
    dict: "anew-neg", word: "impatience", stem: "impati",
    ant: [ "patience" ],
    avg: [ 3.16, 6.62 ], std: [ 1.55, 1.83 ], fq: 23
  },
  "impatient": {
    dict: "anew-neg", word: "impatient", stem: "impati",
    ant: [ "patient" ],
    avg: [ 4.21, 5.04 ], std: [ 2.37, 2.01 ], fq: 50
  },
  "impede": {
    dict: "anew-neg", word: "impede", stem: "imped",
    ant: [ "free" ],
    avg: [ 5.15, 7.96 ], std: [ 3.04, 1.26 ], fq: 50
  },
  "impersonal": {
    dict: "anew-neg", word: "impersonal", stem: "imperson",
    ant: [ "personal" ],
    avg: [ 4.19, 6.06 ], std: [ 2.45, 1.22 ], fq: 50
  },
  "impolite": {
    dict: "anew-neg", word: "impolite", stem: "impolit",
    ant: [ "polite" ],
    avg: [ 2.95, 6.57 ], std: [ 1.86, 1.93 ], fq: 22
  },
  "important": {
    dict: "anew-neg", word: "important", stem: "import",
    ant: [ "insignificant" ],
    avg: [ 3.70, 3.64 ], std: [ 1.78, 2.08 ], fq: 21
  },
  "impossibility": {
    dict: "anew-neg", word: "impossibility", stem: "imposs",
    ant: [ "possibility" ],
    avg: [ 4.62, 6.40 ], std: [ 1.94, 1.25 ], fq: 50
  },
  "impossible": {
    dict: "anew-neg", word: "impossible", stem: "imposs",
    ant: [ "possible" ],
    avg: [ 3.71, 7.14 ], std: [ 2.10, 0.99 ], fq: 21
  },
  "impotence": {
    dict: "anew-neg", word: "impotence", stem: "impot",
    ant: [ "power" ],
    avg: [ 5.83, 6.68 ], std: [ 2.69, 1.49 ], fq: 50
  },
  "improvement": {
    dict: "anew-neg", word: "improvement", stem: "improv",
    ant: [ "decline" ],
    avg: [ 6.37, 3.08 ], std: [ 2.56, 1.23 ], fq: 50
  },
  "improvements": {
    dict: "anew-neg", word: "improvements", stem: "improv",
    ant: [ "decline" ],
    avg: [ 6.37, 3.08 ], std: [ 2.56, 1.23 ], fq: 50
  },
  "impure": {
    dict: "anew-neg", word: "impure", stem: "impur",
    ant: [ "pure", "clean" ],
    avg: [ 4.95, 6.89 ], std: [ 2.10, 1.65 ], fq: 100
  },
  "inability": {
    dict: "anew-neg", word: "inability", stem: "inabl",
    ant: [ "ability" ],
    avg: [ 5.83, 6.68 ], std: [ 2.69, 1.00 ], fq: 50
  },
  "inaccessible": {
    dict: "anew-neg", word: "inaccessible", stem: "inaccess",
    ant: [ "accessible" ],
    avg: [ 3.20, 6.68 ], std: [ 2.42, 1.38 ], fq: 22
  },
  "inaccurate": {
    dict: "anew-neg", word: "inaccurate", stem: "inaccur",
    ant: [ "accurate" ],
    avg: [ 4.35, 7.42 ], std: [ 2.25, 1.57 ], fq: 21
  },
  "inappropriate": {
    dict: "anew-neg", word: "inappropriate", stem: "inappropri",
    ant: [ "appropriate" ],
    avg: [ 3.27, 6.26 ], std: [ 2.05, 1.24 ], fq: 50
  },
  "inaudible": {
    dict: "anew-neg", word: "inaudible", stem: "inaud",
    ant: [ "audible" ],
    avg: [ 4.45, 6.05 ], std: [ 2.54, 1.60 ], fq: 21
  },
  "incapable": {
    dict: "anew-neg", word: "incapable", stem: "incap",
    ant: [ "capable" ],
    avg: [ 5.08, 6.74 ], std: [ 2.07, 1.68 ], fq: 50
  },
  "include": {
    dict: "anew-neg", word: "include", stem: "includ",
    ant: [ "exclude" ],
    avg: [ 4.81, 3.55 ], std: [ 2.11, 1.57 ], fq: 20
  },
  "incompatible": {
    dict: "anew-neg", word: "incompatible", stem: "incompat",
    ant: [ "compatible" ],
    avg: [ 4.04, 6.29 ], std: [ 2.12, 1.79 ], fq: 22
  },
  "incompetence": {
    dict: "anew-neg", word: "incompetence", stem: "incompet",
    ant: [ "competence" ],
    avg: [ 3.72, 6.15 ], std: [ 2.67, 2.08 ], fq: 19
  },
  "incompetent": {
    dict: "anew-neg", word: "incompetent", stem: "incompet",
    ant: [ "competent" ],
    avg: [ 4.09, 6.05 ], std: [ 2.66, 2.06 ], fq: 22
  },
  "incomplete": {
    dict: "anew-neg", word: "incomplete", stem: "incomplet",
    ant: [ "complete" ],
    avg: [ 5.95, 6.74 ], std: [ 2.73, 1.24 ], fq: 50
  },
  "inconsiderate": {
    dict: "anew-neg", word: "inconsiderate", stem: "inconsider",
    ant: [ "considerate" ],
    avg: [ 3.67, 7.20 ], std: [ 2.59, 1.20 ], fq: 20
  },
  "inconsistent": {
    dict: "anew-neg", word: "inconsistent", stem: "inconsist",
    ant: [ "consistent" ],
    avg: [ 3.19, 6.43 ], std: [ 1.72, 1.66 ], fq: 21
  },
  "inconvenience": {
    dict: "anew-neg", word: "inconvenience", stem: "inconveni",
    ant: [ "convenience" ],
    avg: [ 3.50, 7.14 ], std: [ 2.28, 1.93 ], fq: 20
  },
  "inconvenient": {
    dict: "anew-neg", word: "inconvenient", stem: "inconveni",
    ant: [ "convenient" ],
    avg: [ 3.48, 7.15 ], std: [ 2.04, 1.50 ], fq: 20
  },
  "incorrect": {
    dict: "anew-neg", word: "incorrect", stem: "incorrect",
    ant: [ "correct", "right" ],
    avg: [ 4.61, 6.68 ], std: [ 2.53, 1.88 ], fq: 69
  },
  "incorrectly": {
    dict: "anew-neg", word: "incorrectly", stem: "incorrectli",
    ant: [ "right" ],
    avg: [ 5.61, 6.54 ], std: [ 2.38, 1.27 ], fq: 50
  },
  "incredible": {
    dict: "anew-neg", word: "incredible", stem: "incred",
    ant: [ "credible" ],
    avg: [ 3.95, 6.95 ], std: [ 2.82, 1.36 ], fq: 20
  },
  "indecisive": {
    dict: "anew-neg", word: "indecisive", stem: "indecis",
    ant: [ "decisive" ],
    avg: [ 3.95, 6.78 ], std: [ 2.46, 1.52 ], fq: 19
  },
  "indirect": {
    dict: "anew-neg", word: "indirect", stem: "indirect",
    ant: [ "direct" ],
    avg: [ 3.98, 5.68 ], std: [ 2.33, 1.33 ], fq: 50
  },
  "individual": {
    dict: "anew-neg", word: "individual", stem: "individu",
    ant: [ "common" ],
    avg: [ 4.28, 4.92 ], std: [ 2.46, 1.26 ], fq: 50
  },
  "indoor": {
    dict: "anew-neg", word: "indoor", stem: "indoor",
    ant: [ "outdoor" ],
    avg: [ 5.92, 6.94 ], std: [ 2.55, 1.24 ], fq: 50
  },
  "ineffective": {
    dict: "anew-neg", word: "ineffective", stem: "ineffect",
    ant: [ "effective" ],
    avg: [ 5.43, 6.76 ], std: [ 2.85, 1.29 ], fq: 50
  },
  "ineffectual": {
    dict: "anew-neg", word: "ineffectual", stem: "ineffectu",
    ant: [ "effective" ],
    avg: [ 5.43, 6.76 ], std: [ 2.85, 1.29 ], fq: 50
  },
  "inexpensive": {
    dict: "anew-neg", word: "inexpensive", stem: "inexpens",
    ant: [ "expensive" ],
    avg: [ 6.10, 3.36 ], std: [ 2.38, 1.99 ], fq: 21
  },
  "inexperienced": {
    dict: "anew-neg", word: "inexperienced", stem: "inexperienc",
    ant: [ "experienced" ],
    avg: [ 5.53, 6.82 ], std: [ 2.90, 1.17 ], fq: 50
  },
  "inferior": {
    dict: "anew-neg", word: "inferior", stem: "inferior",
    ant: [ "superior" ],
    avg: [ 5.20, 6.08 ], std: [ 2.85, 1.52 ], fq: 50
  },
  "infidelity": {
    dict: "anew-neg", word: "infidelity", stem: "infidel",
    ant: [ "fidelity" ],
    avg: [ 3.83, 6.70 ], std: [ 1.76, 1.49 ], fq: 19
  },
  "inhospitable": {
    dict: "anew-neg", word: "inhospitable", stem: "inhospit",
    ant: [ "hospitable" ],
    avg: [ 3.62, 7.00 ], std: [ 2.13, 1.62 ], fq: 20
  },
  "inhumane": {
    dict: "anew-neg", word: "inhumane", stem: "inhuman",
    ant: [ "humane" ],
    avg: [ 3.21, 6.88 ], std: [ 1.94, 1.48 ], fq: 42
  },
  "injustice": {
    dict: "anew-neg", word: "injustice", stem: "injustic",
    ant: [ "justice" ],
    avg: [ 5.47, 6.74 ], std: [ 2.54, 1.96 ], fq: 50
  },
  "innocence": {
    dict: "anew-neg", word: "innocence", stem: "innoc",
    ant: [ "guilt" ],
    avg: [ 6.04, 2.58 ], std: [ 2.76, 1.46 ], fq: 50
  },
  "innocent": {
    dict: "anew-neg", word: "innocent", stem: "innoc",
    ant: [ "guilty" ],
    avg: [ 6.04, 2.64 ], std: [ 2.76, 1.59 ], fq: 50
  },
  "insane": {
    dict: "anew-neg", word: "insane", stem: "insan",
    ant: [ "sane" ],
    avg: [ 3.81, 6.73 ], std: [ 2.44, 1.42 ], fq: 21
  },
  "insecure": {
    dict: "anew-neg", word: "insecure", stem: "insecur",
    ant: [ "secure" ],
    avg: [ 3.14, 6.92 ], std: [ 2.47, 1.29 ], fq: 50
  },
  "insecurity": {
    dict: "anew-neg", word: "insecurity", stem: "insecur",
    ant: [ "security" ],
    avg: [ 3.14, 6.10 ], std: [ 2.47, 1.63 ], fq: 50
  },
  "insensitive": {
    dict: "anew-neg", word: "insensitive", stem: "insensit",
    ant: [ "sensitive" ],
    avg: [ 4.88, 4.86 ], std: [ 2.30, 1.41 ], fq: 50
  },
  "insignificant": {
    dict: "anew-neg", word: "insignificant", stem: "insignific",
    ant: [ "significant" ],
    avg: [ 4.90, 6.60 ], std: [ 2.51, 1.27 ], fq: 20
  },
  "inspire": {
    dict: "anew-neg", word: "inspire", stem: "inspir",
    ant: [ "exhale" ],
    avg: [ 3.75, 6.11 ], std: [ 2.20, 1.41 ], fq: 19
  },
  "inspired": {
    dict: "anew-neg", word: "inspired", stem: "inspir",
    ant: [ "exhale" ],
    avg: [ 3.75, 6.11 ], std: [ 2.20, 1.41 ], fq: 19
  },
  "inspiring": {
    dict: "anew-neg", word: "inspiring", stem: "inspir",
    ant: [ "exhale" ],
    avg: [ 3.75, 6.11 ], std: [ 2.20, 1.41 ], fq: 19
  },
  "instability": {
    dict: "anew-neg", word: "instability", stem: "instabl",
    ant: [ "stability", "balance" ],
    avg: [ 3.27, 6.54 ], std: [ 1.77, 1.75 ], fq: 43
  },
  "instrumental": {
    dict: "anew-neg", word: "instrumental", stem: "instrument",
    ant: [ "vocal" ],
    avg: [ 6.07, 6.04 ], std: [ 2.42, 1.55 ], fq: 50
  },
  "insufficient": {
    dict: "anew-neg", word: "insufficient", stem: "insuffici",
    ant: [ "sufficient" ],
    avg: [ 3.17, 6.10 ], std: [ 2.65, 1.61 ], fq: 22
  },
  "intellectual": {
    dict: "anew-neg", word: "intellectual", stem: "intellectu",
    ant: [ "emotional" ],
    avg: [ 7.67, 4.42 ], std: [ 1.91, 1.76 ], fq: 50
  },
  "intelligence": {
    dict: "anew-neg", word: "intelligence", stem: "intellig",
    ant: [ "stupidity" ],
    avg: [ 4.50, 2.71 ], std: [ 2.93, 1.79 ], fq: 20
  },
  "interest": {
    dict: "anew-neg", word: "interest", stem: "interest",
    ant: [ "bore" ],
    avg: [ 2.83, 3.64 ], std: [ 2.31, 1.59 ], fq: 50
  },
  "interested": {
    dict: "anew-neg", word: "interested", stem: "interest",
    ant: [ "bore" ],
    avg: [ 2.83, 3.64 ], std: [ 2.31, 1.59 ], fq: 50
  },
  "interesting": {
    dict: "anew-neg", word: "interesting", stem: "interest",
    ant: [ "bore" ],
    avg: [ 2.83, 3.64 ], std: [ 2.31, 1.59 ], fq: 50
  },
  "interests": {
    dict: "anew-neg", word: "interests", stem: "interest",
    ant: [ "bore" ],
    avg: [ 2.83, 3.64 ], std: [ 2.31, 1.59 ], fq: 50
  },
  "interior": {
    dict: "anew-neg", word: "interior", stem: "interior",
    ant: [ "outside" ],
    avg: [ 5.92, 5.80 ], std: [ 2.55, 1.68 ], fq: 50
  },
  "interrogation": {
    dict: "anew-neg", word: "interrogation", stem: "interrog",
    ant: [ "answer" ],
    avg: [ 5.41, 6.24 ], std: [ 2.43, 1.57 ], fq: 50
  },
  "intolerance": {
    dict: "anew-neg", word: "intolerance", stem: "intoler",
    ant: [ "tolerance" ],
    avg: [ 3.36, 6.43 ], std: [ 2.30, 1.89 ], fq: 21
  },
  "invalid": {
    dict: "anew-neg", word: "invalid", stem: "invalid",
    ant: [ "valid" ],
    avg: [ 4.00, 6.05 ], std: [ 2.41, 1.05 ], fq: 20
  },
  "invasive": {
    dict: "anew-neg", word: "invasive", stem: "invas",
    ant: [ "confined" ],
    avg: [ 5.49, 3.44 ], std: [ 2.67, 1.74 ], fq: 50
  },
  "invulnerable": {
    dict: "anew-neg", word: "invulnerable", stem: "invulner",
    ant: [ "vulnerable" ],
    avg: [ 4.50, 3.57 ], std: [ 2.64, 1.72 ], fq: 22
  },
  "irresponsible": {
    dict: "anew-neg", word: "irresponsible", stem: "irrespons",
    ant: [ "responsible" ],
    avg: [ 3.00, 6.28 ], std: [ 2.17, 2.19 ], fq: 19
  },
  "irritate": {
    dict: "anew-neg", word: "irritate", stem: "irrit",
    ant: [ "soothe" ],
    avg: [ 3.91, 6.63 ], std: [ 2.69, 1.86 ], fq: 20
  },
  "irritating": {
    dict: "anew-neg", word: "irritating", stem: "irrit",
    ant: [ "soothe" ],
    avg: [ 3.91, 6.63 ], std: [ 2.69, 1.86 ], fq: 20
  },
  "jade": {
    dict: "anew-neg", word: "jade", stem: "jade",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "jaded": {
    dict: "anew-neg", word: "jaded", stem: "jade",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "jam": {
    dict: "anew-neg", word: "jam", stem: "jam",
    ant: [ "free" ],
    avg: [ 5.15, 7.96 ], std: [ 3.04, 1.26 ], fq: 50
  },
  "james": {
    dict: "anew-neg", word: "james", stem: "jame",
    ant: [ "free" ],
    avg: [ 5.15, 7.96 ], std: [ 3.04, 1.26 ], fq: 50
  },
  "joy": {
    dict: "anew-neg", word: "joy", stem: "joy",
    ant: [ "sorrow" ],
    avg: [ 5.74, 2.12 ], std: [ 2.32, 1.56 ], fq: 50
  },
  "joyful": {
    dict: "anew-neg", word: "joyful", stem: "joy",
    ant: [ "sorrowful" ],
    avg: [ 3.64, 3.43 ], std: [ 2.48, 2.06 ], fq: 23
  },
  "justice": {
    dict: "anew-neg", word: "justice", stem: "justic",
    ant: [ "injustice" ],
    avg: [ 6.45, 2.45 ], std: [ 1.88, 1.64 ], fq: 20
  },
  "justified": {
    dict: "anew-neg", word: "justified", stem: "justifi",
    ant: [ "blame" ],
    avg: [ 4.05, 2.82 ], std: [ 2.59, 1.53 ], fq: 50
  },
  "justify": {
    dict: "anew-neg", word: "justify", stem: "justifi",
    ant: [ "blame" ],
    avg: [ 4.05, 2.82 ], std: [ 2.59, 1.53 ], fq: 50
  },
  "juvenile": {
    dict: "anew-neg", word: "juvenile", stem: "juvenil",
    ant: [ "adult" ],
    avg: [ 4.76, 6.14 ], std: [ 1.95, 1.34 ], fq: 50
  },
  "keep": {
    dict: "anew-neg", word: "keep", stem: "keep",
    ant: [ "discontinue", "lose", "break" ],
    avg: [ 4.36, 4.18 ], std: [ 2.20, 1.75 ], fq: 89
  },
  "keeping": {
    dict: "anew-neg", word: "keeping", stem: "keep",
    ant: [ "discontinue", "lose", "break" ],
    avg: [ 4.36, 4.18 ], std: [ 2.20, 1.75 ], fq: 89
  },
  "keeps": {
    dict: "anew-neg", word: "keeps", stem: "keep",
    ant: [ "discontinue", "lose", "break" ],
    avg: [ 4.36, 4.18 ], std: [ 2.20, 1.75 ], fq: 89
  },
  "kept": {
    dict: "anew-neg", word: "kept", stem: "kept",
    ant: [ "discontinue", "lose", "break", "broken" ],
    avg: [ 4.60, 3.86 ], std: [ 2.26, 1.67 ], fq: 139
  },
  "kick": {
    dict: "anew-neg", word: "kick", stem: "kick",
    ant: [ "cheer" ],
    avg: [ 6.12, 7.46 ], std: [ 2.45, 1.68 ], fq: 50
  },
  "kicked": {
    dict: "anew-neg", word: "kicked", stem: "kick",
    ant: [ "cheer" ],
    avg: [ 6.12, 7.46 ], std: [ 2.45, 1.68 ], fq: 50
  },
  "kicking": {
    dict: "anew-neg", word: "kicking", stem: "kick",
    ant: [ "cheer" ],
    avg: [ 6.12, 7.46 ], std: [ 2.45, 1.68 ], fq: 50
  },
  "kicks": {
    dict: "anew-neg", word: "kicks", stem: "kick",
    ant: [ "cheer" ],
    avg: [ 6.12, 7.46 ], std: [ 2.45, 1.68 ], fq: 50
  },
  "kid": {
    dict: "anew-neg", word: "kid", stem: "kid",
    ant: [ "parent" ],
    avg: [ 4.14, 6.73 ], std: [ 2.63, 1.91 ], fq: 21
  },
  "kids": {
    dict: "anew-neg", word: "kids", stem: "kid",
    ant: [ "parent" ],
    avg: [ 4.14, 6.73 ], std: [ 2.63, 1.91 ], fq: 21
  },
  "kind": {
    dict: "anew-neg", word: "kind", stem: "kind",
    ant: [ "unkind" ],
    avg: [ 4.24, 2.55 ], std: [ 2.07, 1.54 ], fq: 20
  },
  "king": {
    dict: "anew-neg", word: "king", stem: "king",
    ant: [ "queen" ],
    avg: [ 4.76, 6.24 ], std: [ 2.18, 1.79 ], fq: 50
  },
  "kings": {
    dict: "anew-neg", word: "kings", stem: "king",
    ant: [ "queen" ],
    avg: [ 4.76, 6.24 ], std: [ 2.18, 1.79 ], fq: 50
  },
  "knew": {
    dict: "anew-neg", word: "knew", stem: "knew",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "know": {
    dict: "anew-neg", word: "know", stem: "know",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "knowing": {
    dict: "anew-neg", word: "knowing", stem: "know",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "known": {
    dict: "anew-neg", word: "known", stem: "known",
    ant: [ "ignore", "unknown" ],
    avg: [ 4.96, 3.61 ], std: [ 2.33, 1.44 ], fq: 100
  },
  "knows": {
    dict: "anew-neg", word: "knows", stem: "know",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "lady": {
    dict: "anew-neg", word: "lady", stem: "ladi",
    ant: [ "nobleman" ],
    avg: [ 4.00, 6.86 ], std: [ 2.07, 1.42 ], fq: 21
  },
  "last": {
    dict: "anew-neg", word: "last", stem: "last",
    ant: [ "first" ],
    avg: [ 4.90, 7.33 ], std: [ 2.83, 1.28 ], fq: 19
  },
  "laugh": {
    dict: "anew-neg", word: "laugh", stem: "laugh",
    ant: [ "cry" ],
    avg: [ 7.04, 1.84 ], std: [ 1.96, 1.28 ], fq: 50
  },
  "laughs": {
    dict: "anew-neg", word: "laughs", stem: "laugh",
    ant: [ "cry" ],
    avg: [ 7.04, 1.84 ], std: [ 1.96, 1.28 ], fq: 50
  },
  "launch": {
    dict: "anew-neg", word: "launch", stem: "launch",
    ant: [ "abolish" ],
    avg: [ 4.18, 3.84 ], std: [ 2.07, 1.54 ], fq: 18
  },
  "lawful": {
    dict: "anew-neg", word: "lawful", stem: "law",
    ant: [ "unlawful" ],
    avg: [ 4.46, 2.73 ], std: [ 2.32, 1.83 ], fq: 24
  },
  "lay": {
    dict: "anew-neg", word: "lay", stem: "lay",
    ant: [ "sit", "arise" ],
    avg: [ 3.72, 5.76 ], std: [ 2.03, 1.24 ], fq: 69
  },
  "lead": {
    dict: "anew-neg", word: "lead", stem: "lead",
    ant: [ "deficit", "follow" ],
    avg: [ 4.14, 4.60 ], std: [ 2.35, 1.54 ], fq: 71
  },
  "leading": {
    dict: "anew-neg", word: "leading", stem: "lead",
    ant: [ "follow", "following" ],
    avg: [ 4.10, 5.54 ], std: [ 2.12, 1.42 ], fq: 100
  },
  "leads": {
    dict: "anew-neg", word: "leads", stem: "lead",
    ant: [ "deficit", "follow" ],
    avg: [ 4.14, 4.60 ], std: [ 2.35, 1.54 ], fq: 71
  },
  "leaky": {
    dict: "anew-neg", word: "leaky", stem: "leaki",
    ant: [ "tight" ],
    avg: [ 4.89, 4.60 ], std: [ 2.50, 1.25 ], fq: 50
  },
  "lean": {
    dict: "anew-neg", word: "lean", stem: "lean",
    ant: [ "fat", "rich" ],
    avg: [ 5.50, 5.99 ], std: [ 2.75, 1.59 ], fq: 100
  },
  "leave": {
    dict: "anew-neg", word: "leave", stem: "leav",
    ant: [ "arrive", "enter" ],
    avg: [ 4.62, 6.23 ], std: [ 2.54, 1.64 ], fq: 42
  },
  "leaves": {
    dict: "anew-neg", word: "leaves", stem: "leav",
    ant: [ "arrive", "enter" ],
    avg: [ 4.62, 6.23 ], std: [ 2.54, 1.64 ], fq: 42
  },
  "led": {
    dict: "anew-neg", word: "led", stem: "led",
    ant: [ "follow" ],
    avg: [ 4.10, 5.66 ], std: [ 2.12, 1.17 ], fq: 50
  },
  "left": {
    dict: "anew-neg", word: "left", stem: "left",
    ant: [ "right", "arrive", "enter", "center" ],
    avg: [ 5.33, 6.00 ], std: [ 2.43, 1.41 ], fq: 142
  },
  "level": {
    dict: "anew-neg", word: "level", stem: "level",
    ant: [ "raise" ],
    avg: [ 7.17, 6.74 ], std: [ 2.06, 1.21 ], fq: 50
  },
  "liability": {
    dict: "anew-neg", word: "liability", stem: "liabil",
    ant: [ "asset" ],
    avg: [ 4.43, 7.25 ], std: [ 2.84, 1.21 ], fq: 20
  },
  "liberating": {
    dict: "anew-neg", word: "liberating", stem: "liber",
    ant: [ "confine" ],
    avg: [ 3.96, 3.00 ], std: [ 2.70, 1.45 ], fq: 22
  },
  "lie": {
    dict: "anew-neg", word: "lie", stem: "lie",
    ant: [ "sit", "arise" ],
    avg: [ 3.72, 5.76 ], std: [ 2.03, 1.24 ], fq: 69
  },
  "lied": {
    dict: "anew-neg", word: "lied", stem: "lie",
    ant: [ "sit", "arise" ],
    avg: [ 3.72, 5.76 ], std: [ 2.03, 1.24 ], fq: 69
  },
  "lies": {
    dict: "anew-neg", word: "lies", stem: "lie",
    ant: [ "sit", "arise" ],
    avg: [ 3.72, 5.76 ], std: [ 2.03, 1.24 ], fq: 69
  },
  "lift": {
    dict: "anew-neg", word: "lift", stem: "lift",
    ant: [ "lower", "fall" ],
    avg: [ 4.49, 4.17 ], std: [ 2.34, 1.59 ], fq: 100
  },
  "lifted": {
    dict: "anew-neg", word: "lifted", stem: "lift",
    ant: [ "lower", "fall" ],
    avg: [ 4.49, 4.17 ], std: [ 2.34, 1.59 ], fq: 100
  },
  "light": {
    dict: "anew-neg", word: "light", stem: "light",
    ant: [ "dark", "heavy" ],
    avg: [ 4.70, 3.96 ], std: [ 2.20, 1.42 ], fq: 100
  },
  "lighting": {
    dict: "anew-neg", word: "lighting", stem: "light",
    ant: [ "dark" ],
    avg: [ 4.28, 3.82 ], std: [ 2.21, 1.41 ], fq: 50
  },
  "lightness": {
    dict: "anew-neg", word: "lightness", stem: "light",
    ant: [ "darkness" ],
    avg: [ 4.28, 3.82 ], std: [ 2.21, 1.87 ], fq: 50
  },
  "lights": {
    dict: "anew-neg", word: "lights", stem: "light",
    ant: [ "dark" ],
    avg: [ 4.28, 3.82 ], std: [ 2.21, 1.41 ], fq: 50
  },
  "likable": {
    dict: "anew-neg", word: "likable", stem: "likabl",
    ant: [ "unsympathetic" ],
    avg: [ 4.30, 3.35 ], std: [ 2.32, 1.73 ], fq: 20
  },
  "like": {
    dict: "anew-neg", word: "like", stem: "like",
    ant: [ "dislike" ],
    avg: [ 4.27, 3.25 ], std: [ 2.60, 1.55 ], fq: 21
  },
  "liked": {
    dict: "anew-neg", word: "liked", stem: "like",
    ant: [ "dislike" ],
    avg: [ 4.27, 3.25 ], std: [ 2.60, 1.55 ], fq: 21
  },
  "likely": {
    dict: "anew-neg", word: "likely", stem: "like",
    ant: [ "unlikely" ],
    avg: [ 3.82, 3.85 ], std: [ 2.36, 1.60 ], fq: 21
  },
  "likes": {
    dict: "anew-neg", word: "likes", stem: "like",
    ant: [ "dislike" ],
    avg: [ 4.27, 3.25 ], std: [ 2.60, 1.55 ], fq: 21
  },
  "liking": {
    dict: "anew-neg", word: "liking", stem: "like",
    ant: [ "dislike" ],
    avg: [ 4.27, 3.25 ], std: [ 2.60, 1.55 ], fq: 21
  },
  "link": {
    dict: "anew-neg", word: "link", stem: "link",
    ant: [ "disconnect" ],
    avg: [ 3.12, 3.81 ], std: [ 2.49, 1.29 ], fq: 22
  },
  "linked": {
    dict: "anew-neg", word: "linked", stem: "link",
    ant: [ "disconnect" ],
    avg: [ 3.12, 3.81 ], std: [ 2.49, 1.29 ], fq: 22
  },
  "links": {
    dict: "anew-neg", word: "links", stem: "link",
    ant: [ "disconnect" ],
    avg: [ 3.12, 3.81 ], std: [ 2.49, 1.29 ], fq: 22
  },
  "live": {
    dict: "anew-neg", word: "live", stem: "live",
    ant: [ "recorded", "dead" ],
    avg: [ 5.56, 3.88 ], std: [ 2.50, 1.26 ], fq: 100
  },
  "lively": {
    dict: "anew-neg", word: "lively", stem: "live",
    ant: [ "dull" ],
    avg: [ 2.83, 3.24 ], std: [ 2.31, 1.22 ], fq: 50
  },
  "living": {
    dict: "anew-neg", word: "living", stem: "live",
    ant: [ "dead" ],
    avg: [ 5.73, 2.00 ], std: [ 2.73, 1.32 ], fq: 50
  },
  "local": {
    dict: "anew-neg", word: "local", stem: "local",
    ant: [ "national" ],
    avg: [ 4.21, 5.98 ], std: [ 2.94, 1.15 ], fq: 50
  },
  "logical": {
    dict: "anew-neg", word: "logical", stem: "logic",
    ant: [ "illogical", "incoherent" ],
    avg: [ 3.80, 3.69 ], std: [ 2.22, 1.55 ], fq: 41
  },
  "look": {
    dict: "anew-neg", word: "look", stem: "look",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "looked": {
    dict: "anew-neg", word: "looked", stem: "look",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "looking": {
    dict: "anew-neg", word: "looking", stem: "look",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "looks": {
    dict: "anew-neg", word: "looks", stem: "look",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "loose": {
    dict: "anew-neg", word: "loose", stem: "loos",
    ant: [ "confine", "tight" ],
    avg: [ 4.44, 3.86 ], std: [ 2.60, 1.35 ], fq: 72
  },
  "lose": {
    dict: "anew-neg", word: "lose", stem: "lose",
    ant: [ "keep", "win", "find", "gain" ],
    avg: [ 6.71, 6.67 ], std: [ 2.43, 1.34 ], fq: 200
  },
  "loser": {
    dict: "anew-neg", word: "loser", stem: "loser",
    ant: [ "winner" ],
    avg: [ 5.53, 7.78 ], std: [ 2.81, 1.69 ], fq: 50
  },
  "losers": {
    dict: "anew-neg", word: "losers", stem: "loser",
    ant: [ "winner" ],
    avg: [ 5.53, 7.78 ], std: [ 2.81, 1.69 ], fq: 50
  },
  "loss": {
    dict: "anew-neg", word: "loss", stem: "loss",
    ant: [ "gain" ],
    avg: [ 7.72, 6.40 ], std: [ 2.16, 1.54 ], fq: 50
  },
  "losses": {
    dict: "anew-neg", word: "losses", stem: "loss",
    ant: [ "winnings", "gain" ],
    avg: [ 7.17, 7.21 ], std: [ 2.31, 1.39 ], fq: 71
  },
  "lost": {
    dict: "anew-neg", word: "lost", stem: "lost",
    ant: [ "keep", "win", "find", "gain", "found", "saved", "won" ],
    avg: [ 6.42, 6.89 ], std: [ 2.36, 1.33 ], fq: 350
  },
  "lovable": {
    dict: "anew-neg", word: "lovable", stem: "lovabl",
    ant: [ "hateful" ],
    avg: [ 5.71, 1.90 ], std: [ 2.17, 0.91 ], fq: 20
  },
  "love": {
    dict: "anew-neg", word: "love", stem: "love",
    ant: [ "hate" ],
    avg: [ 6.95, 2.34 ], std: [ 2.56, 1.88 ], fq: 50
  },
  "loved": {
    dict: "anew-neg", word: "loved", stem: "love",
    ant: [ "hate" ],
    avg: [ 6.95, 2.34 ], std: [ 2.56, 1.88 ], fq: 50
  },
  "loves": {
    dict: "anew-neg", word: "loves", stem: "love",
    ant: [ "hate" ],
    avg: [ 6.95, 2.34 ], std: [ 2.56, 1.88 ], fq: 50
  },
  "loving": {
    dict: "anew-neg", word: "loving", stem: "love",
    ant: [ "hate" ],
    avg: [ 6.95, 2.34 ], std: [ 2.56, 1.88 ], fq: 50
  },
  "low": {
    dict: "anew-neg", word: "low", stem: "low",
    ant: [ "high" ],
    avg: [ 4.75, 6.64 ], std: [ 2.91, 1.21 ], fq: 50
  },
  "lower": {
    dict: "anew-neg", word: "lower", stem: "lower",
    ant: [ "raise", "high" ],
    avg: [ 6.17, 6.69 ], std: [ 2.52, 1.21 ], fq: 100
  },
  "lowest": {
    dict: "anew-neg", word: "lowest", stem: "lowest",
    ant: [ "high" ],
    avg: [ 4.75, 6.64 ], std: [ 2.91, 1.21 ], fq: 50
  },
  "loyal": {
    dict: "anew-neg", word: "loyal", stem: "loyal",
    ant: [ "disloyal" ],
    avg: [ 5.14, 2.27 ], std: [ 2.46, 1.22 ], fq: 31
  },
  "loyalty": {
    dict: "anew-neg", word: "loyalty", stem: "loyalti",
    ant: [ "disloyalty" ],
    avg: [ 5.77, 2.57 ], std: [ 2.20, 1.78 ], fq: 21
  },
  "lucky": {
    dict: "anew-neg", word: "lucky", stem: "lucki",
    ant: [ "unlucky" ],
    avg: [ 4.62, 2.70 ], std: [ 2.36, 1.84 ], fq: 20
  },
  "lying": {
    dict: "anew-neg", word: "lying", stem: "lie",
    ant: [ "sit", "arise" ],
    avg: [ 3.72, 5.76 ], std: [ 2.03, 1.24 ], fq: 69
  },
  "made": {
    dict: "anew-neg", word: "made", stem: "made",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "magnetic": {
    dict: "anew-neg", word: "magnetic", stem: "magnet",
    ant: [ "geographic" ],
    avg: [ 3.05, 6.21 ], std: [ 1.91, 1.44 ], fq: 20
  },
  "magnifying": {
    dict: "anew-neg", word: "magnifying", stem: "magnifi",
    ant: [ "reduce" ],
    avg: [ 4.65, 4.18 ], std: [ 2.13, 1.26 ], fq: 50
  },
  "make": {
    dict: "anew-neg", word: "make", stem: "make",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "makes": {
    dict: "anew-neg", word: "makes", stem: "make",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "making": {
    dict: "anew-neg", word: "making", stem: "make",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "malady": {
    dict: "anew-neg", word: "malady", stem: "maladi",
    ant: [ "wellness" ],
    avg: [ 4.56, 7.67 ], std: [ 2.40, 1.28 ], fq: 23
  },
  "male": {
    dict: "anew-neg", word: "male", stem: "male",
    ant: [ "female" ],
    avg: [ 5.90, 7.52 ], std: [ 2.90, 1.86 ], fq: 20
  },
  "malfunction": {
    dict: "anew-neg", word: "malfunction", stem: "malfunct",
    ant: [ "function" ],
    avg: [ 4.26, 5.60 ], std: [ 2.47, 1.46 ], fq: 50
  },
  "man": {
    dict: "anew-neg", word: "man", stem: "man",
    ant: [ "woman" ],
    avg: [ 5.32, 6.84 ], std: [ 2.59, 1.65 ], fq: 50
  },
  "mans": {
    dict: "anew-neg", word: "mans", stem: "man",
    ant: [ "woman" ],
    avg: [ 5.32, 6.84 ], std: [ 2.59, 1.65 ], fq: 50
  },
  "mark": {
    dict: "anew-neg", word: "mark", stem: "mark",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "marked": {
    dict: "anew-neg", word: "marked", stem: "mark",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "marks": {
    dict: "anew-neg", word: "marks", stem: "mark",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "masochist": {
    dict: "anew-neg", word: "masochist", stem: "masochist",
    ant: [ "sadist" ],
    avg: [ 5.00, 2.11 ], std: [ 2.47, 1.37 ], fq: 19
  },
  "match": {
    dict: "anew-neg", word: "match", stem: "match",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "matches": {
    dict: "anew-neg", word: "matches", stem: "match",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "matching": {
    dict: "anew-neg", word: "matching", stem: "match",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "meaningful": {
    dict: "anew-neg", word: "meaningful", stem: "meaning",
    ant: [ "meaningless" ],
    avg: [ 3.05, 2.95 ], std: [ 1.86, 1.39 ], fq: 20
  },
  "meaningless": {
    dict: "anew-neg", word: "meaningless", stem: "meaningless",
    ant: [ "meaningful" ],
    avg: [ 3.78, 6.79 ], std: [ 1.93, 0.98 ], fq: 18
  },
  "men": {
    dict: "anew-neg", word: "men", stem: "men",
    ant: [ "woman" ],
    avg: [ 5.32, 6.84 ], std: [ 2.59, 1.65 ], fq: 50
  },
  "mend": {
    dict: "anew-neg", word: "mend", stem: "mend",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "merciful": {
    dict: "anew-neg", word: "merciful", stem: "merci",
    ant: [ "merciless" ],
    avg: [ 5.05, 3.05 ], std: [ 2.63, 2.36 ], fq: 20
  },
  "merciless": {
    dict: "anew-neg", word: "merciless", stem: "merciless",
    ant: [ "merciful" ],
    avg: [ 4.22, 7.00 ], std: [ 2.13, 2.00 ], fq: 22
  },
  "middle": {
    dict: "anew-neg", word: "middle", stem: "middl",
    ant: [ "beginning" ],
    avg: [ 3.00, 6.39 ], std: [ 2.70, 2.12 ], fq: 19
  },
  "mind": {
    dict: "anew-neg", word: "mind", stem: "mind",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "mindless": {
    dict: "anew-neg", word: "mindless", stem: "mindless",
    ant: [ "mindful" ],
    avg: [ 6.00, 6.70 ], std: [ 2.70, 1.30 ], fq: 20
  },
  "minds": {
    dict: "anew-neg", word: "minds", stem: "mind",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "misbehave": {
    dict: "anew-neg", word: "misbehave", stem: "misbehav",
    ant: [ "behave" ],
    avg: [ 3.72, 6.25 ], std: [ 2.42, 1.65 ], fq: 19
  },
  "misconduct": {
    dict: "anew-neg", word: "misconduct", stem: "misconduct",
    ant: [ "behave" ],
    avg: [ 3.72, 6.25 ], std: [ 2.42, 1.65 ], fq: 19
  },
  "miss": {
    dict: "anew-neg", word: "miss", stem: "miss",
    ant: [ "hit" ],
    avg: [ 5.73, 4.58 ], std: [ 2.09, 1.81 ], fq: 50
  },
  "missed": {
    dict: "anew-neg", word: "missed", stem: "miss",
    ant: [ "hit" ],
    avg: [ 5.73, 4.58 ], std: [ 2.09, 1.81 ], fq: 50
  },
  "misses": {
    dict: "anew-neg", word: "misses", stem: "miss",
    ant: [ "hit" ],
    avg: [ 5.73, 4.58 ], std: [ 2.09, 1.81 ], fq: 50
  },
  "missing": {
    dict: "anew-neg", word: "missing", stem: "miss",
    ant: [ "hit" ],
    avg: [ 5.73, 4.58 ], std: [ 2.09, 1.81 ], fq: 50
  },
  "mistrust": {
    dict: "anew-neg", word: "mistrust", stem: "mistrust",
    ant: [ "trust" ],
    avg: [ 5.30, 7.22 ], std: [ 2.66, 1.23 ], fq: 50
  },
  "mobile": {
    dict: "anew-neg", word: "mobile", stem: "mobil",
    ant: [ "immobile" ],
    avg: [ 4.38, 2.89 ], std: [ 2.38, 1.20 ], fq: 20
  },
  "moral": {
    dict: "anew-neg", word: "moral", stem: "moral",
    ant: [ "immoral" ],
    avg: [ 5.42, 2.79 ], std: [ 2.24, 1.47 ], fq: 31
  },
  "morning": {
    dict: "anew-neg", word: "morning", stem: "morn",
    ant: [ "sunset" ],
    avg: [ 4.20, 7.16 ], std: [ 2.99, 2.11 ], fq: 50
  },
  "mornings": {
    dict: "anew-neg", word: "mornings", stem: "morn",
    ant: [ "sunset" ],
    avg: [ 4.20, 7.16 ], std: [ 2.99, 2.11 ], fq: 50
  },
  "mortal": {
    dict: "anew-neg", word: "mortal", stem: "mortal",
    ant: [ "immortal" ],
    avg: [ 5.95, 6.62 ], std: [ 2.84, 1.65 ], fq: 50
  },
  "mother": {
    dict: "anew-neg", word: "mother", stem: "mother",
    ant: [ "father" ],
    avg: [ 5.92, 7.06 ], std: [ 2.60, 1.74 ], fq: 50
  },
  "mothers": {
    dict: "anew-neg", word: "mothers", stem: "mother",
    ant: [ "father" ],
    avg: [ 5.92, 7.06 ], std: [ 2.60, 1.74 ], fq: 50
  },
  "move": {
    dict: "anew-neg", word: "move", stem: "move",
    ant: [ "stay", "rest" ],
    avg: [ 4.29, 6.34 ], std: [ 2.53, 1.21 ], fq: 100
  },
  "moved": {
    dict: "anew-neg", word: "moved", stem: "move",
    ant: [ "stay", "rest" ],
    avg: [ 4.29, 6.34 ], std: [ 2.53, 1.21 ], fq: 100
  },
  "moves": {
    dict: "anew-neg", word: "moves", stem: "move",
    ant: [ "stay", "rest" ],
    avg: [ 4.29, 6.34 ], std: [ 2.53, 1.21 ], fq: 100
  },
  "moving": {
    dict: "anew-neg", word: "moving", stem: "move",
    ant: [ "stay", "rest", "still" ],
    avg: [ 4.49, 5.92 ], std: [ 2.54, 1.18 ], fq: 150
  },
  "nakedness": {
    dict: "anew-neg", word: "nakedness", stem: "naked",
    ant: [ "closeness" ],
    avg: [ 3.90, 6.85 ], std: [ 2.45, 1.79 ], fq: 20
  },
  "nasty": {
    dict: "anew-neg", word: "nasty", stem: "nasti",
    ant: [ "nice" ],
    avg: [ 4.38, 7.38 ], std: [ 2.69, 1.51 ], fq: 50
  },
  "national": {
    dict: "anew-neg", word: "national", stem: "nation",
    ant: [ "local" ],
    avg: [ 3.80, 6.77 ], std: [ 1.91, 1.74 ], fq: 21
  },
  "natural": {
    dict: "anew-neg", word: "natural", stem: "natur",
    ant: [ "artificial", "supernatural", "flat" ],
    avg: [ 4.43, 4.91 ], std: [ 1.85, 1.71 ], fq: 93
  },
  "negative": {
    dict: "anew-neg", word: "negative", stem: "neg",
    ant: [ "neutral", "positive" ],
    avg: [ 4.50, 6.36 ], std: [ 2.15, 1.18 ], fq: 100
  },
  "negligent": {
    dict: "anew-neg", word: "negligent", stem: "neglig",
    ant: [ "diligent" ],
    avg: [ 4.33, 6.14 ], std: [ 2.82, 1.59 ], fq: 22
  },
  "nephew": {
    dict: "anew-neg", word: "nephew", stem: "nephew",
    ant: [ "niece" ],
    avg: [ 3.95, 6.52 ], std: [ 1.80, 1.75 ], fq: 21
  },
  "net": {
    dict: "anew-neg", word: "net", stem: "net",
    ant: [ "gross" ],
    avg: [ 5.07, 3.72 ], std: [ 2.37, 1.49 ], fq: 50
  },
  "neutral": {
    dict: "anew-neg", word: "neutral", stem: "neutral",
    ant: [ "negative" ],
    avg: [ 5.57, 2.42 ], std: [ 2.26, 1.05 ], fq: 50
  },
  "new": {
    dict: "anew-neg", word: "new", stem: "new",
    ant: [ "old", "worn" ],
    avg: [ 3.47, 3.85 ], std: [ 2.44, 1.58 ], fq: 71
  },
  "newest": {
    dict: "anew-neg", word: "newest", stem: "newest",
    ant: [ "old", "worn" ],
    avg: [ 3.47, 3.85 ], std: [ 2.44, 1.58 ], fq: 71
  },
  "nice": {
    dict: "anew-neg", word: "nice", stem: "nice",
    ant: [ "nasty" ],
    avg: [ 4.89, 2.62 ], std: [ 2.50, 1.23 ], fq: 50
  },
  "niece": {
    dict: "anew-neg", word: "niece", stem: "niec",
    ant: [ "nephew" ],
    avg: [ 4.33, 6.75 ], std: [ 2.39, 1.83 ], fq: 20
  },
  "night": {
    dict: "anew-neg", word: "night", stem: "night",
    ant: [ "day" ],
    avg: [ 4.77, 6.24 ], std: [ 2.50, 1.36 ], fq: 50
  },
  "nights": {
    dict: "anew-neg", word: "nights", stem: "night",
    ant: [ "day" ],
    avg: [ 4.77, 6.24 ], std: [ 2.50, 1.36 ], fq: 50
  },
  "nighttime": {
    dict: "anew-neg", word: "nighttime", stem: "nighttim",
    ant: [ "day" ],
    avg: [ 4.77, 6.24 ], std: [ 2.50, 1.36 ], fq: 50
  },
  "noisy": {
    dict: "anew-neg", word: "noisy", stem: "noisi",
    ant: [ "quiet" ],
    avg: [ 2.82, 5.50 ], std: [ 2.13, 1.81 ], fq: 50
  },
  "nonviolent": {
    dict: "anew-neg", word: "nonviolent", stem: "nonviol",
    ant: [ "violent" ],
    avg: [ 6.89, 2.06 ], std: [ 2.47, 1.35 ], fq: 50
  },
  "normal": {
    dict: "anew-neg", word: "normal", stem: "normal",
    ant: [ "abnormal" ],
    avg: [ 4.48, 3.53 ], std: [ 2.29, 1.22 ], fq: 20
  },
  "noted": {
    dict: "anew-neg", word: "noted", stem: "note",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "notice": {
    dict: "anew-neg", word: "notice", stem: "notic",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "obedience": {
    dict: "anew-neg", word: "obedience", stem: "obedi",
    ant: [ "disobedience" ],
    avg: [ 4.50, 3.32 ], std: [ 2.69, 2.24 ], fq: 20
  },
  "obey": {
    dict: "anew-neg", word: "obey", stem: "obey",
    ant: [ "disobey" ],
    avg: [ 5.35, 3.19 ], std: [ 2.25, 2.02 ], fq: 22
  },
  "observe": {
    dict: "anew-neg", word: "observe", stem: "observ",
    ant: [ "disrespect", "break" ],
    avg: [ 4.62, 3.96 ], std: [ 1.87, 1.80 ], fq: 100
  },
  "observed": {
    dict: "anew-neg", word: "observed", stem: "observ",
    ant: [ "disrespect", "break" ],
    avg: [ 4.62, 3.96 ], std: [ 1.87, 1.80 ], fq: 100
  },
  "obstruct": {
    dict: "anew-neg", word: "obstruct", stem: "obstruct",
    ant: [ "free" ],
    avg: [ 5.15, 7.96 ], std: [ 3.04, 1.26 ], fq: 50
  },
  "offend": {
    dict: "anew-neg", word: "offend", stem: "offend",
    ant: [ "keep" ],
    avg: [ 5.53, 5.86 ], std: [ 2.90, 1.07 ], fq: 50
  },
  "offset": {
    dict: "anew-neg", word: "offset", stem: "offset",
    ant: [ "end" ],
    avg: [ 4.59, 4.36 ], std: [ 3.07, 1.74 ], fq: 50
  },
  "old": {
    dict: "anew-neg", word: "old", stem: "old",
    ant: [ "young", "new" ],
    avg: [ 5.64, 6.82 ], std: [ 2.51, 1.19 ], fq: 100
  },
  "omitted": {
    dict: "anew-neg", word: "omitted", stem: "omit",
    ant: [ "include" ],
    avg: [ 3.05, 6.39 ], std: [ 2.06, 1.50 ], fq: 19
  },
  "open": {
    dict: "anew-neg", word: "open", stem: "open",
    ant: [ "covert" ],
    avg: [ 4.32, 3.79 ], std: [ 2.36, 1.27 ], fq: 20
  },
  "openness": {
    dict: "anew-neg", word: "openness", stem: "open",
    ant: [ "closeness" ],
    avg: [ 3.90, 6.85 ], std: [ 2.45, 1.79 ], fq: 20
  },
  "operate": {
    dict: "anew-neg", word: "operate", stem: "oper",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "operated": {
    dict: "anew-neg", word: "operated", stem: "oper",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "operates": {
    dict: "anew-neg", word: "operates", stem: "oper",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "operating": {
    dict: "anew-neg", word: "operating", stem: "oper",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "optimist": {
    dict: "anew-neg", word: "optimist", stem: "optimist",
    ant: [ "pessimist" ],
    avg: [ 4.20, 3.81 ], std: [ 2.89, 1.99 ], fq: 20
  },
  "optimistic": {
    dict: "anew-neg", word: "optimistic", stem: "optimist",
    ant: [ "pessimistic" ],
    avg: [ 4.48, 3.90 ], std: [ 2.18, 2.28 ], fq: 21
  },
  "orderly": {
    dict: "anew-neg", word: "orderly", stem: "orderli",
    ant: [ "disorderly" ],
    avg: [ 4.85, 2.95 ], std: [ 2.78, 1.39 ], fq: 19
  },
  "outdoor": {
    dict: "anew-neg", word: "outdoor", stem: "outdoor",
    ant: [ "indoor" ],
    avg: [ 2.86, 6.29 ], std: [ 1.59, 1.27 ], fq: 21
  },
  "outside": {
    dict: "anew-neg", word: "outside", stem: "outsid",
    ant: [ "indoor" ],
    avg: [ 2.86, 6.29 ], std: [ 1.59, 1.27 ], fq: 21
  },
  "paid": {
    dict: "anew-neg", word: "paid", stem: "paid",
    ant: [ "unpaid" ],
    avg: [ 5.62, 2.58 ], std: [ 2.60, 1.30 ], fq: 20
  },
  "pain": {
    dict: "anew-neg", word: "pain", stem: "pain",
    ant: [ "pleasure" ],
    avg: [ 5.74, 8.08 ], std: [ 2.81, 0.97 ], fq: 50
  },
  "painful": {
    dict: "anew-neg", word: "painful", stem: "pain",
    ant: [ "painless" ],
    avg: [ 4.10, 7.40 ], std: [ 2.63, 1.70 ], fq: 20
  },
  "painless": {
    dict: "anew-neg", word: "painless", stem: "painless",
    ant: [ "painful" ],
    avg: [ 6.50, 2.12 ], std: [ 2.49, 1.45 ], fq: 50
  },
  "parent": {
    dict: "anew-neg", word: "parent", stem: "parent",
    ant: [ "child" ],
    avg: [ 5.55, 7.24 ], std: [ 2.29, 1.56 ], fq: 50
  },
  "particular": {
    dict: "anew-neg", word: "particular", stem: "particular",
    ant: [ "universal" ],
    avg: [ 4.87, 6.59 ], std: [ 2.83, 2.29 ], fq: 20
  },
  "pass": {
    dict: "anew-neg", word: "pass", stem: "pass",
    ant: [ "failing", "fail", "running" ],
    avg: [ 6.71, 3.17 ], std: [ 2.52, 1.28 ], fq: 150
  },
  "passed": {
    dict: "anew-neg", word: "passed", stem: "pass",
    ant: [ "fail" ],
    avg: [ 7.15, 1.96 ], std: [ 2.40, 1.03 ], fq: 50
  },
  "passes": {
    dict: "anew-neg", word: "passes", stem: "pass",
    ant: [ "failing", "fail" ],
    avg: [ 7.15, 2.21 ], std: [ 2.40, 1.16 ], fq: 100
  },
  "passing": {
    dict: "anew-neg", word: "passing", stem: "pass",
    ant: [ "failing", "fail", "running" ],
    avg: [ 6.71, 3.17 ], std: [ 2.52, 1.28 ], fq: 150
  },
  "passive": {
    dict: "anew-neg", word: "passive", stem: "passiv",
    ant: [ "active" ],
    avg: [ 4.86, 6.82 ], std: [ 2.56, 1.77 ], fq: 50
  },
  "patience": {
    dict: "anew-neg", word: "patience", stem: "patienc",
    ant: [ "impatience" ],
    avg: [ 4.22, 3.63 ], std: [ 2.60, 1.21 ], fq: 18
  },
  "patient": {
    dict: "anew-neg", word: "patient", stem: "patient",
    ant: [ "impatient" ],
    avg: [ 4.61, 3.53 ], std: [ 2.52, 2.17 ], fq: 21
  },
  "peace": {
    dict: "anew-neg", word: "peace", stem: "peac",
    ant: [ "war" ],
    avg: [ 7.49, 1.80 ], std: [ 2.16, 1.41 ], fq: 50
  },
  "penalties": {
    dict: "anew-neg", word: "penalties", stem: "penalti",
    ant: [ "reward" ],
    avg: [ 4.95, 7.24 ], std: [ 2.62, 1.89 ], fq: 50
  },
  "penalty": {
    dict: "anew-neg", word: "penalty", stem: "penalti",
    ant: [ "reward" ],
    avg: [ 4.95, 7.24 ], std: [ 2.62, 1.89 ], fq: 50
  },
  "personal": {
    dict: "anew-neg", word: "personal", stem: "person",
    ant: [ "impersonal" ],
    avg: [ 4.21, 3.85 ], std: [ 2.47, 1.31 ], fq: 22
  },
  "pessimist": {
    dict: "anew-neg", word: "pessimist", stem: "pessimist",
    ant: [ "optimist" ],
    avg: [ 4.43, 7.19 ], std: [ 2.39, 1.72 ], fq: 22
  },
  "pessimistic": {
    dict: "anew-neg", word: "pessimistic", stem: "pessimist",
    ant: [ "optimistic" ],
    avg: [ 4.19, 7.45 ], std: [ 2.40, 1.71 ], fq: 24
  },
  "plain": {
    dict: "anew-neg", word: "plain", stem: "plain",
    ant: [ "cheer", "fancy" ],
    avg: [ 5.66, 7.18 ], std: [ 2.64, 1.53 ], fq: 100
  },
  "plains": {
    dict: "anew-neg", word: "plains", stem: "plain",
    ant: [ "cheer" ],
    avg: [ 6.12, 7.46 ], std: [ 2.45, 1.68 ], fq: 50
  },
  "pleasant": {
    dict: "anew-neg", word: "pleasant", stem: "pleasant",
    ant: [ "unpleasant" ],
    avg: [ 4.73, 2.53 ], std: [ 2.80, 1.43 ], fq: 20
  },
  "please": {
    dict: "anew-neg", word: "please", stem: "pleas",
    ant: [ "displease" ],
    avg: [ 5.71, 2.63 ], std: [ 2.22, 0.96 ], fq: 20
  },
  "pleased": {
    dict: "anew-neg", word: "pleased", stem: "pleas",
    ant: [ "displease", "displeased" ],
    avg: [ 5.02, 2.90 ], std: [ 2.40, 1.45 ], fq: 63
  },
  "pleasing": {
    dict: "anew-neg", word: "pleasing", stem: "pleas",
    ant: [ "displease" ],
    avg: [ 5.71, 2.63 ], std: [ 2.22, 0.96 ], fq: 20
  },
  "pleasure": {
    dict: "anew-neg", word: "pleasure", stem: "pleasur",
    ant: [ "pain" ],
    avg: [ 6.50, 2.10 ], std: [ 2.49, 1.28 ], fq: 50
  },
  "polite": {
    dict: "anew-neg", word: "polite", stem: "polit",
    ant: [ "impolite" ],
    avg: [ 5.25, 3.10 ], std: [ 2.36, 1.61 ], fq: 20
  },
  "poor": {
    dict: "anew-neg", word: "poor", stem: "poor",
    ant: [ "rich" ],
    avg: [ 6.17, 7.98 ], std: [ 2.70, 1.32 ], fq: 50
  },
  "positive": {
    dict: "anew-neg", word: "positive", stem: "posit",
    ant: [ "negative" ],
    avg: [ 5.57, 2.42 ], std: [ 2.26, 1.05 ], fq: 50
  },
  "possibilities": {
    dict: "anew-neg", word: "possibilities", stem: "possibl",
    ant: [ "impossibility" ],
    avg: [ 3.83, 3.67 ], std: [ 2.95, 1.74 ], fq: 22
  },
  "possibility": {
    dict: "anew-neg", word: "possibility", stem: "possibl",
    ant: [ "impossibility" ],
    avg: [ 3.83, 3.67 ], std: [ 2.95, 1.74 ], fq: 22
  },
  "possible": {
    dict: "anew-neg", word: "possible", stem: "possibl",
    ant: [ "impossible", "actual" ],
    avg: [ 3.47, 5.09 ], std: [ 2.44, 1.81 ], fq: 38
  },
  "potential": {
    dict: "anew-neg", word: "potential", stem: "potenti",
    ant: [ "actual" ],
    avg: [ 2.75, 6.22 ], std: [ 1.94, 1.48 ], fq: 19
  },
  "poverty": {
    dict: "anew-neg", word: "poverty", stem: "poverti",
    ant: [ "wealth" ],
    avg: [ 6.17, 7.38 ], std: [ 2.70, 1.23 ], fq: 50
  },
  "power": {
    dict: "anew-neg", word: "power", stem: "power",
    ant: [ "inability" ],
    avg: [ 3.50, 3.00 ], std: [ 2.28, 1.33 ], fq: 19
  },
  "powerful": {
    dict: "anew-neg", word: "powerful", stem: "power",
    ant: [ "powerless" ],
    avg: [ 3.95, 2.90 ], std: [ 2.89, 1.92 ], fq: 21
  },
  "powerless": {
    dict: "anew-neg", word: "powerless", stem: "powerless",
    ant: [ "powerful" ],
    avg: [ 5.83, 7.08 ], std: [ 2.69, 1.54 ], fq: 50
  },
  "powers": {
    dict: "anew-neg", word: "powers", stem: "power",
    ant: [ "inability" ],
    avg: [ 3.50, 3.00 ], std: [ 2.28, 1.33 ], fq: 19
  },
  "praise": {
    dict: "anew-neg", word: "praise", stem: "prais",
    ant: [ "criticize" ],
    avg: [ 5.27, 2.41 ], std: [ 2.39, 1.26 ], fq: 22
  },
  "preparation": {
    dict: "anew-neg", word: "preparation", stem: "prepar",
    ant: [ "resolution" ],
    avg: [ 5.41, 6.18 ], std: [ 2.43, 1.29 ], fq: 50
  },
  "preparations": {
    dict: "anew-neg", word: "preparations", stem: "prepar",
    ant: [ "resolution" ],
    avg: [ 5.41, 6.18 ], std: [ 2.43, 1.29 ], fq: 50
  },
  "prepared": {
    dict: "anew-neg", word: "prepared", stem: "prepar",
    ant: [ "unprepared" ],
    avg: [ 5.09, 3.11 ], std: [ 2.20, 1.52 ], fq: 20
  },
  "present": {
    dict: "anew-neg", word: "present", stem: "present",
    ant: [ "future" ],
    avg: [ 5.33, 6.68 ], std: [ 2.58, 1.78 ], fq: 21
  },
  "preserve": {
    dict: "anew-neg", word: "preserve", stem: "preserv",
    ant: [ "discontinue" ],
    avg: [ 3.89, 3.94 ], std: [ 2.11, 1.21 ], fq: 18
  },
  "preserved": {
    dict: "anew-neg", word: "preserved", stem: "preserv",
    ant: [ "discontinue", "fresh", "destroyed" ],
    avg: [ 4.87, 4.41 ], std: [ 2.39, 1.29 ], fq: 118
  },
  "prize": {
    dict: "anew-neg", word: "prize", stem: "prize",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "prized": {
    dict: "anew-neg", word: "prized", stem: "prize",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "prizes": {
    dict: "anew-neg", word: "prizes", stem: "prize",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "pro": {
    dict: "anew-neg", word: "pro", stem: "pro",
    ant: [ "con" ],
    avg: [ 6.06, 3.70 ], std: [ 2.32, 1.15 ], fq: 50
  },
  "profane": {
    dict: "anew-neg", word: "profane", stem: "profan",
    ant: [ "sacred" ],
    avg: [ 5.00, 6.95 ], std: [ 2.75, 1.60 ], fq: 22
  },
  "professional": {
    dict: "anew-neg", word: "professional", stem: "profession",
    ant: [ "unprofessional" ],
    avg: [ 4.71, 2.71 ], std: [ 2.16, 1.49 ], fq: 22
  },
  "profound": {
    dict: "anew-neg", word: "profound", stem: "profound",
    ant: [ "superficial" ],
    avg: [ 4.20, 3.79 ], std: [ 1.82, 2.30 ], fq: 19
  },
  "prosecute": {
    dict: "anew-neg", word: "prosecute", stem: "prosecut",
    ant: [ "defend" ],
    avg: [ 5.85, 5.22 ], std: [ 3.15, 1.72 ], fq: 50
  },
  "protected": {
    dict: "anew-neg", word: "protected", stem: "protect",
    ant: [ "unprotected" ],
    avg: [ 5.35, 3.48 ], std: [ 2.31, 1.81 ], fq: 22
  },
  "proud": {
    dict: "anew-neg", word: "proud", stem: "proud",
    ant: [ "humble" ],
    avg: [ 3.74, 6.48 ], std: [ 2.33, 1.30 ], fq: 50
  },
  "punctuality": {
    dict: "anew-neg", word: "punctuality", stem: "punctual",
    ant: [ "tardiness" ],
    avg: [ 5.05, 2.95 ], std: [ 2.13, 1.27 ], fq: 20
  },
  "purchase": {
    dict: "anew-neg", word: "purchase", stem: "purchas",
    ant: [ "sell" ],
    avg: [ 7.24, 5.48 ], std: [ 2.06, 1.13 ], fq: 50
  },
  "pure": {
    dict: "anew-neg", word: "pure", stem: "pure",
    ant: [ "impure" ],
    avg: [ 4.38, 3.68 ], std: [ 2.36, 1.91 ], fq: 23
  },
  "purge": {
    dict: "anew-neg", word: "purge", stem: "purg",
    ant: [ "rehabilitate" ],
    avg: [ 4.67, 6.32 ], std: [ 2.39, 1.70 ], fq: 21
  },
  "qualify": {
    dict: "anew-neg", word: "qualify", stem: "qualifi",
    ant: [ "disqualify" ],
    avg: [ 4.70, 2.47 ], std: [ 1.84, 1.07 ], fq: 19
  },
  "queen": {
    dict: "anew-neg", word: "queen", stem: "queen",
    ant: [ "king" ],
    avg: [ 5.51, 6.18 ], std: [ 2.77, 1.56 ], fq: 50
  },
  "queens": {
    dict: "anew-neg", word: "queens", stem: "queen",
    ant: [ "king" ],
    avg: [ 5.51, 6.18 ], std: [ 2.77, 1.56 ], fq: 50
  },
  "question": {
    dict: "anew-neg", word: "question", stem: "question",
    ant: [ "answer" ],
    avg: [ 5.41, 6.24 ], std: [ 2.43, 1.57 ], fq: 50
  },
  "questions": {
    dict: "anew-neg", word: "questions", stem: "question",
    ant: [ "answer" ],
    avg: [ 5.41, 6.24 ], std: [ 2.43, 1.57 ], fq: 50
  },
  "quickly": {
    dict: "anew-neg", word: "quickly", stem: "quickli",
    ant: [ "slowly" ],
    avg: [ 3.39, 4.32 ], std: [ 2.22, 1.43 ], fq: 50
  },
  "quiet": {
    dict: "anew-neg", word: "quiet", stem: "quiet",
    ant: [ "sound", "agitate", "noisy", "active" ],
    avg: [ 5.31, 4.79 ], std: [ 2.63, 1.55 ], fq: 155
  },
  "quit": {
    dict: "anew-neg", word: "quit", stem: "quit",
    ant: [ "stay", "enter" ],
    avg: [ 4.95, 5.80 ], std: [ 2.35, 1.29 ], fq: 71
  },
  "raise": {
    dict: "anew-neg", word: "raise", stem: "rais",
    ant: [ "lower", "level" ],
    avg: [ 5.19, 4.95 ], std: [ 2.30, 1.04 ], fq: 100
  },
  "raised": {
    dict: "anew-neg", word: "raised", stem: "rais",
    ant: [ "lower", "level" ],
    avg: [ 5.19, 4.95 ], std: [ 2.30, 1.04 ], fq: 100
  },
  "raises": {
    dict: "anew-neg", word: "raises", stem: "rais",
    ant: [ "lower", "level" ],
    avg: [ 5.19, 4.95 ], std: [ 2.30, 1.04 ], fq: 100
  },
  "raising": {
    dict: "anew-neg", word: "raising", stem: "rais",
    ant: [ "lower", "level" ],
    avg: [ 5.19, 4.95 ], std: [ 2.30, 1.04 ], fq: 100
  },
  "ran": {
    dict: "anew-neg", word: "ran", stem: "ran",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "raw": {
    dict: "anew-neg", word: "raw", stem: "raw",
    ant: [ "cooked" ],
    avg: [ 4.44, 6.54 ], std: [ 1.96, 1.09 ], fq: 50
  },
  "rear": {
    dict: "anew-neg", word: "rear", stem: "rear",
    ant: [ "head", "front", "level" ],
    avg: [ 5.40, 5.71 ], std: [ 2.43, 1.04 ], fq: 150
  },
  "reasonable": {
    dict: "anew-neg", word: "reasonable", stem: "reason",
    ant: [ "unreasonable" ],
    avg: [ 5.00, 3.85 ], std: [ 2.47, 1.73 ], fq: 21
  },
  "reassure": {
    dict: "anew-neg", word: "reassure", stem: "reassur",
    ant: [ "worry" ],
    avg: [ 5.07, 2.82 ], std: [ 2.74, 1.71 ], fq: 50
  },
  "recorded": {
    dict: "anew-neg", word: "recorded", stem: "record",
    ant: [ "live" ],
    avg: [ 5.53, 6.84 ], std: [ 2.90, 1.52 ], fq: 50
  },
  "recover": {
    dict: "anew-neg", word: "recover", stem: "recov",
    ant: [ "deteriorate" ],
    avg: [ 4.86, 3.64 ], std: [ 2.55, 1.56 ], fq: 22
  },
  "recovered": {
    dict: "anew-neg", word: "recovered", stem: "recov",
    ant: [ "deteriorate" ],
    avg: [ 4.86, 3.64 ], std: [ 2.55, 1.56 ], fq: 22
  },
  "red": {
    dict: "anew-neg", word: "red", stem: "red",
    ant: [ "gain" ],
    avg: [ 7.72, 6.40 ], std: [ 2.16, 1.54 ], fq: 50
  },
  "reduce": {
    dict: "anew-neg", word: "reduce", stem: "reduc",
    ant: [ "gain" ],
    avg: [ 7.72, 6.40 ], std: [ 2.16, 1.54 ], fq: 50
  },
  "reduced": {
    dict: "anew-neg", word: "reduced", stem: "reduc",
    ant: [ "gain" ],
    avg: [ 7.72, 6.40 ], std: [ 2.16, 1.54 ], fq: 50
  },
  "reducing": {
    dict: "anew-neg", word: "reducing", stem: "reduc",
    ant: [ "gain" ],
    avg: [ 7.72, 6.40 ], std: [ 2.16, 1.54 ], fq: 50
  },
  "refresh": {
    dict: "anew-neg", word: "refresh", stem: "refresh",
    ant: [ "tire" ],
    avg: [ 2.83, 4.65 ], std: [ 2.31, 1.49 ], fq: 50
  },
  "refreshing": {
    dict: "anew-neg", word: "refreshing", stem: "refresh",
    ant: [ "tire" ],
    avg: [ 2.83, 4.65 ], std: [ 2.31, 1.49 ], fq: 50
  },
  "refuse": {
    dict: "anew-neg", word: "refuse", stem: "refus",
    ant: [ "accept", "allow", "admit" ],
    avg: [ 4.55, 5.75 ], std: [ 2.50, 1.28 ], fq: 150
  },
  "refused": {
    dict: "anew-neg", word: "refused", stem: "refus",
    ant: [ "accept", "allow", "admit" ],
    avg: [ 4.55, 5.75 ], std: [ 2.50, 1.28 ], fq: 150
  },
  "regain": {
    dict: "anew-neg", word: "regain", stem: "regain",
    ant: [ "lose" ],
    avg: [ 5.43, 3.59 ], std: [ 2.69, 2.09 ], fq: 21
  },
  "regard": {
    dict: "anew-neg", word: "regard", stem: "regard",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "regards": {
    dict: "anew-neg", word: "regards", stem: "regard",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "rehabilitate": {
    dict: "anew-neg", word: "rehabilitate", stem: "rehabilit",
    ant: [ "purge" ],
    avg: [ 5.45, 3.61 ], std: [ 2.21, 1.94 ], fq: 19
  },
  "reject": {
    dict: "anew-neg", word: "reject", stem: "reject",
    ant: [ "accept", "approve", "admit" ],
    avg: [ 4.91, 5.96 ], std: [ 2.57, 1.47 ], fq: 121
  },
  "rejected": {
    dict: "anew-neg", word: "rejected", stem: "reject",
    ant: [ "accept", "approve", "admit" ],
    avg: [ 4.91, 5.96 ], std: [ 2.57, 1.47 ], fq: 121
  },
  "rejection": {
    dict: "anew-neg", word: "rejection", stem: "reject",
    ant: [ "acceptance" ],
    avg: [ 5.40, 6.86 ], std: [ 2.70, 1.28 ], fq: 50
  },
  "relax": {
    dict: "anew-neg", word: "relax", stem: "relax",
    ant: [ "tense", "strain" ],
    avg: [ 4.66, 3.17 ], std: [ 2.48, 1.59 ], fq: 82
  },
  "relaxed": {
    dict: "anew-neg", word: "relaxed", stem: "relax",
    ant: [ "tense", "strain" ],
    avg: [ 4.66, 3.17 ], std: [ 2.48, 1.59 ], fq: 82
  },
  "relaxing": {
    dict: "anew-neg", word: "relaxing", stem: "relax",
    ant: [ "tense", "strain", "restless" ],
    avg: [ 4.46, 3.32 ], std: [ 2.51, 1.58 ], fq: 102
  },
  "release": {
    dict: "anew-neg", word: "release", stem: "releas",
    ant: [ "hold", "confine", "block" ],
    avg: [ 4.76, 4.32 ], std: [ 2.32, 1.37 ], fq: 122
  },
  "released": {
    dict: "anew-neg", word: "released", stem: "releas",
    ant: [ "hold", "confine", "block" ],
    avg: [ 4.76, 4.32 ], std: [ 2.32, 1.37 ], fq: 122
  },
  "releases": {
    dict: "anew-neg", word: "releases", stem: "releas",
    ant: [ "hold", "confine", "block" ],
    avg: [ 4.76, 4.32 ], std: [ 2.32, 1.37 ], fq: 122
  },
  "reliable": {
    dict: "anew-neg", word: "reliable", stem: "reliabl",
    ant: [ "unreliable" ],
    avg: [ 4.29, 2.74 ], std: [ 2.17, 1.19 ], fq: 20
  },
  "relinquish": {
    dict: "anew-neg", word: "relinquish", stem: "relinquish",
    ant: [ "hold" ],
    avg: [ 6.10, 5.70 ], std: [ 2.19, 1.22 ], fq: 50
  },
  "rely": {
    dict: "anew-neg", word: "rely", stem: "reli",
    ant: [ "distrust" ],
    avg: [ 4.05, 2.95 ], std: [ 2.77, 2.28 ], fq: 20
  },
  "remember": {
    dict: "anew-neg", word: "remember", stem: "rememb",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "remembering": {
    dict: "anew-neg", word: "remembering", stem: "rememb",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "repair": {
    dict: "anew-neg", word: "repair", stem: "repair",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "repel": {
    dict: "anew-neg", word: "repel", stem: "repel",
    ant: [ "attract" ],
    avg: [ 5.35, 6.38 ], std: [ 2.81, 2.11 ], fq: 22
  },
  "represent": {
    dict: "anew-neg", word: "represent", stem: "repres",
    ant: [ "prosecute" ],
    avg: [ 4.62, 3.15 ], std: [ 2.78, 1.42 ], fq: 20
  },
  "represented": {
    dict: "anew-neg", word: "represented", stem: "repres",
    ant: [ "prosecute" ],
    avg: [ 4.62, 3.15 ], std: [ 2.78, 1.42 ], fq: 20
  },
  "representing": {
    dict: "anew-neg", word: "representing", stem: "repres",
    ant: [ "prosecute" ],
    avg: [ 4.62, 3.15 ], std: [ 2.78, 1.42 ], fq: 20
  },
  "represents": {
    dict: "anew-neg", word: "represents", stem: "repres",
    ant: [ "prosecute" ],
    avg: [ 4.62, 3.15 ], std: [ 2.78, 1.42 ], fq: 20
  },
  "repulsive": {
    dict: "anew-neg", word: "repulsive", stem: "repuls",
    ant: [ "attractive" ],
    avg: [ 4.91, 7.19 ], std: [ 2.94, 1.91 ], fq: 21
  },
  "resent": {
    dict: "anew-neg", word: "resent", stem: "resent",
    ant: [ "wish" ],
    avg: [ 5.16, 6.92 ], std: [ 2.62, 1.50 ], fq: 50
  },
  "resist": {
    dict: "anew-neg", word: "resist", stem: "resist",
    ant: [ "surrender" ],
    avg: [ 4.70, 4.08 ], std: [ 2.48, 1.68 ], fq: 50
  },
  "resolution": {
    dict: "anew-neg", word: "resolution", stem: "resolut",
    ant: [ "preparation" ],
    avg: [ 4.44, 6.06 ], std: [ 1.96, 1.36 ], fq: 50
  },
  "respect": {
    dict: "anew-neg", word: "respect", stem: "respect",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "respected": {
    dict: "anew-neg", word: "respected", stem: "respect",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "respectful": {
    dict: "anew-neg", word: "respectful", stem: "respect",
    ant: [ "disrespectful" ],
    avg: [ 4.65, 2.71 ], std: [ 2.17, 1.76 ], fq: 22
  },
  "respects": {
    dict: "anew-neg", word: "respects", stem: "respect",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "responsible": {
    dict: "anew-neg", word: "responsible", stem: "respons",
    ant: [ "irresponsible" ],
    avg: [ 5.00, 2.50 ], std: [ 2.57, 1.40 ], fq: 19
  },
  "responsive": {
    dict: "anew-neg", word: "responsive", stem: "respons",
    ant: [ "unresponsive" ],
    avg: [ 3.94, 2.95 ], std: [ 2.36, 1.76 ], fq: 19
  },
  "restful": {
    dict: "anew-neg", word: "restful", stem: "rest",
    ant: [ "restless" ],
    avg: [ 4.05, 3.63 ], std: [ 2.55, 1.57 ], fq: 20
  },
  "restless": {
    dict: "anew-neg", word: "restless", stem: "restless",
    ant: [ "restful" ],
    avg: [ 2.58, 6.05 ], std: [ 2.19, 2.21 ], fq: 22
  },
  "restore": {
    dict: "anew-neg", word: "restore", stem: "restor",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "restored": {
    dict: "anew-neg", word: "restored", stem: "restor",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "retard": {
    dict: "anew-neg", word: "retard", stem: "retard",
    ant: [ "accelerate" ],
    avg: [ 6.04, 6.10 ], std: [ 1.77, 1.48 ], fq: 22
  },
  "retarded": {
    dict: "anew-neg", word: "retarded", stem: "retard",
    ant: [ "accelerate" ],
    avg: [ 6.04, 6.10 ], std: [ 1.77, 1.48 ], fq: 22
  },
  "retire": {
    dict: "anew-neg", word: "retire", stem: "retir",
    ant: [ "advance" ],
    avg: [ 7.72, 6.58 ], std: [ 2.16, 1.33 ], fq: 50
  },
  "retired": {
    dict: "anew-neg", word: "retired", stem: "retir",
    ant: [ "advance" ],
    avg: [ 7.72, 6.58 ], std: [ 2.16, 1.33 ], fq: 50
  },
  "retiring": {
    dict: "anew-neg", word: "retiring", stem: "retir",
    ant: [ "advance" ],
    avg: [ 7.72, 6.58 ], std: [ 2.16, 1.33 ], fq: 50
  },
  "retrieve": {
    dict: "anew-neg", word: "retrieve", stem: "retriev",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "reward": {
    dict: "anew-neg", word: "reward", stem: "reward",
    ant: [ "penalty", "dishonor" ],
    avg: [ 4.96, 2.63 ], std: [ 2.38, 1.45 ], fq: 70
  },
  "rewarding": {
    dict: "anew-neg", word: "rewarding", stem: "reward",
    ant: [ "dishonor" ],
    avg: [ 4.82, 2.37 ], std: [ 2.44, 1.57 ], fq: 20
  },
  "rich": {
    dict: "anew-neg", word: "rich", stem: "rich",
    ant: [ "poor", "lean" ],
    avg: [ 3.52, 4.00 ], std: [ 2.03, 1.56 ], fq: 72
  },
  "riches": {
    dict: "anew-neg", word: "riches", stem: "rich",
    ant: [ "poor" ],
    avg: [ 3.72, 2.32 ], std: [ 2.02, 1.28 ], fq: 50
  },
  "ride": {
    dict: "anew-neg", word: "ride", stem: "ride",
    ant: [ "walk" ],
    avg: [ 3.24, 6.77 ], std: [ 2.02, 1.60 ], fq: 21
  },
  "rides": {
    dict: "anew-neg", word: "rides", stem: "ride",
    ant: [ "walk" ],
    avg: [ 3.24, 6.77 ], std: [ 2.02, 1.60 ], fq: 21
  },
  "riding": {
    dict: "anew-neg", word: "riding", stem: "ride",
    ant: [ "walk" ],
    avg: [ 3.24, 6.77 ], std: [ 2.02, 1.60 ], fq: 21
  },
  "right": {
    dict: "anew-neg", word: "right", stem: "right",
    ant: [ "left", "wrong", "incorrect", "center", "incorrectly" ],
    avg: [ 4.61, 3.86 ], std: [ 2.23, 1.17 ], fq: 224
  },
  "rising": {
    dict: "anew-neg", word: "rising", stem: "rise",
    ant: [ "fall", "set", "falling" ],
    avg: [ 4.44, 4.44 ], std: [ 2.30, 1.60 ], fq: 150
  },
  "robust": {
    dict: "anew-neg", word: "robust", stem: "robust",
    ant: [ "frail" ],
    avg: [ 2.65, 3.55 ], std: [ 1.81, 1.85 ], fq: 20
  },
  "rocky": {
    dict: "anew-neg", word: "rocky", stem: "rocki",
    ant: [ "smooth" ],
    avg: [ 4.91, 6.80 ], std: [ 2.57, 1.18 ], fq: 50
  },
  "rode": {
    dict: "anew-neg", word: "rode", stem: "rode",
    ant: [ "walk" ],
    avg: [ 3.24, 6.77 ], std: [ 2.02, 1.60 ], fq: 21
  },
  "roll": {
    dict: "anew-neg", word: "roll", stem: "roll",
    ant: [ "unwind" ],
    avg: [ 2.39, 6.02 ], std: [ 2.13, 1.85 ], fq: 50
  },
  "rolled": {
    dict: "anew-neg", word: "rolled", stem: "roll",
    ant: [ "unwind" ],
    avg: [ 2.39, 6.02 ], std: [ 2.13, 1.85 ], fq: 50
  },
  "rolling": {
    dict: "anew-neg", word: "rolling", stem: "roll",
    ant: [ "unwind" ],
    avg: [ 2.39, 6.02 ], std: [ 2.13, 1.85 ], fq: 50
  },
  "rolls": {
    dict: "anew-neg", word: "rolls", stem: "roll",
    ant: [ "unwind" ],
    avg: [ 2.39, 6.02 ], std: [ 2.13, 1.85 ], fq: 50
  },
  "rose": {
    dict: "anew-neg", word: "rose", stem: "rose",
    ant: [ "fall", "set" ],
    avg: [ 4.33, 5.00 ], std: [ 2.20, 1.63 ], fq: 100
  },
  "rough": {
    dict: "anew-neg", word: "rough", stem: "rough",
    ant: [ "smooth", "cut" ],
    avg: [ 4.96, 5.19 ], std: [ 2.45, 1.24 ], fq: 100
  },
  "round": {
    dict: "anew-neg", word: "round", stem: "round",
    ant: [ "square" ],
    avg: [ 3.18, 5.48 ], std: [ 1.76, 0.99 ], fq: 50
  },
  "rude": {
    dict: "anew-neg", word: "rude", stem: "rude",
    ant: [ "civil" ],
    avg: [ 3.74, 5.56 ], std: [ 2.37, 1.15 ], fq: 50
  },
  "rudeness": {
    dict: "anew-neg", word: "rudeness", stem: "rude",
    ant: [ "courtesy" ],
    avg: [ 4.30, 6.79 ], std: [ 2.03, 1.36 ], fq: 19
  },
  "rugged": {
    dict: "anew-neg", word: "rugged", stem: "rug",
    ant: [ "delicate" ],
    avg: [ 4.63, 5.94 ], std: [ 2.61, 1.53 ], fq: 50
  },
  "run": {
    dict: "anew-neg", word: "run", stem: "run",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "running": {
    dict: "anew-neg", word: "running", stem: "run",
    ant: [ "malfunction", "standing", "passing" ],
    avg: [ 4.31, 4.64 ], std: [ 2.34, 1.41 ], fq: 120
  },
  "runs": {
    dict: "anew-neg", word: "runs", stem: "run",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "rush": {
    dict: "anew-neg", word: "rush", stem: "rush",
    ant: [ "delay" ],
    avg: [ 5.62, 3.38 ], std: [ 2.39, 1.32 ], fq: 50
  },
  "sack": {
    dict: "anew-neg", word: "sack", stem: "sack",
    ant: [ "hire" ],
    avg: [ 6.77, 6.50 ], std: [ 2.07, 1.34 ], fq: 50
  },
  "sacred": {
    dict: "anew-neg", word: "sacred", stem: "sacr",
    ant: [ "profane" ],
    avg: [ 4.55, 2.47 ], std: [ 2.34, 1.39 ], fq: 20
  },
  "sad": {
    dict: "anew-neg", word: "sad", stem: "sad",
    ant: [ "glad" ],
    avg: [ 6.49, 7.48 ], std: [ 2.77, 1.52 ], fq: 50
  },
  "sadist": {
    dict: "anew-neg", word: "sadist", stem: "sadist",
    ant: [ "masochist" ],
    avg: [ 4.77, 3.39 ], std: [ 2.43, 2.23 ], fq: 20
  },
  "sadness": {
    dict: "anew-neg", word: "sadness", stem: "sad",
    ant: [ "happiness" ],
    avg: [ 6.49, 8.44 ], std: [ 2.77, 0.97 ], fq: 50
  },
  "safe": {
    dict: "anew-neg", word: "safe", stem: "safe",
    ant: [ "dangerous" ],
    avg: [ 7.32, 2.44 ], std: [ 2.07, 1.46 ], fq: 50
  },
  "safety": {
    dict: "anew-neg", word: "safety", stem: "safeti",
    ant: [ "danger" ],
    avg: [ 7.32, 2.82 ], std: [ 2.07, 1.64 ], fq: 50
  },
  "sane": {
    dict: "anew-neg", word: "sane", stem: "sane",
    ant: [ "insane" ],
    avg: [ 5.83, 3.04 ], std: [ 2.45, 1.73 ], fq: 50
  },
  "sanitary": {
    dict: "anew-neg", word: "sanitary", stem: "sanitari",
    ant: [ "unsanitary" ],
    avg: [ 4.95, 1.79 ], std: [ 2.19, 1.23 ], fq: 20
  },
  "sat": {
    dict: "anew-neg", word: "sat", stem: "sat",
    ant: [ "lie", "arise" ],
    avg: [ 5.32, 4.62 ], std: [ 2.47, 1.45 ], fq: 69
  },
  "saved": {
    dict: "anew-neg", word: "saved", stem: "save",
    ant: [ "lost" ],
    avg: [ 5.82, 2.76 ], std: [ 2.62, 1.39 ], fq: 50
  },
  "scarce": {
    dict: "anew-neg", word: "scarce", stem: "scarc",
    ant: [ "abundant" ],
    avg: [ 5.51, 7.16 ], std: [ 2.63, 1.65 ], fq: 50
  },
  "seated": {
    dict: "anew-neg", word: "seated", stem: "seat",
    ant: [ "standing" ],
    avg: [ 3.93, 5.36 ], std: [ 2.49, 0.85 ], fq: 50
  },
  "second": {
    dict: "anew-neg", word: "second", stem: "second",
    ant: [ "first" ],
    avg: [ 4.90, 7.33 ], std: [ 2.83, 1.28 ], fq: 19
  },
  "secure": {
    dict: "anew-neg", word: "secure", stem: "secur",
    ant: [ "insecure" ],
    avg: [ 5.56, 2.98 ], std: [ 2.34, 1.13 ], fq: 50
  },
  "securities": {
    dict: "anew-neg", word: "securities", stem: "secur",
    ant: [ "insecurity" ],
    avg: [ 4.81, 2.24 ], std: [ 1.94, 1.04 ], fq: 21
  },
  "security": {
    dict: "anew-neg", word: "security", stem: "secur",
    ant: [ "insecurity" ],
    avg: [ 4.81, 2.24 ], std: [ 1.94, 1.04 ], fq: 21
  },
  "selfish": {
    dict: "anew-neg", word: "selfish", stem: "selfish",
    ant: [ "unselfish" ],
    avg: [ 3.30, 6.84 ], std: [ 2.27, 1.95 ], fq: 19
  },
  "sell": {
    dict: "anew-neg", word: "sell", stem: "sell",
    ant: [ "buy" ],
    avg: [ 4.67, 6.28 ], std: [ 2.35, 1.36 ], fq: 50
  },
  "selling": {
    dict: "anew-neg", word: "selling", stem: "sell",
    ant: [ "buy" ],
    avg: [ 4.67, 6.28 ], std: [ 2.35, 1.36 ], fq: 50
  },
  "sells": {
    dict: "anew-neg", word: "sells", stem: "sell",
    ant: [ "buy" ],
    avg: [ 4.67, 6.28 ], std: [ 2.35, 1.36 ], fq: 50
  },
  "sensible": {
    dict: "anew-neg", word: "sensible", stem: "sensibl",
    ant: [ "unreasonable" ],
    avg: [ 5.00, 3.85 ], std: [ 2.47, 1.73 ], fq: 21
  },
  "sensitive": {
    dict: "anew-neg", word: "sensitive", stem: "sensit",
    ant: [ "insensitive" ],
    avg: [ 4.32, 3.55 ], std: [ 2.14, 1.74 ], fq: 20
  },
  "sentence": {
    dict: "anew-neg", word: "sentence", stem: "sentenc",
    ant: [ "acquittal" ],
    avg: [ 4.95, 6.19 ], std: [ 2.31, 1.72 ], fq: 20
  },
  "sentences": {
    dict: "anew-neg", word: "sentences", stem: "sentenc",
    ant: [ "acquittal" ],
    avg: [ 4.95, 6.19 ], std: [ 2.31, 1.72 ], fq: 20
  },
  "separate": {
    dict: "anew-neg", word: "separate", stem: "separ",
    ant: [ "unite" ],
    avg: [ 3.75, 6.64 ], std: [ 2.49, 1.19 ], fq: 50
  },
  "separated": {
    dict: "anew-neg", word: "separated", stem: "separ",
    ant: [ "unite" ],
    avg: [ 3.75, 6.64 ], std: [ 2.49, 1.19 ], fq: 50
  },
  "separation": {
    dict: "anew-neg", word: "separation", stem: "separ",
    ant: [ "union" ],
    avg: [ 3.75, 6.04 ], std: [ 2.49, 1.40 ], fq: 50
  },
  "serious": {
    dict: "anew-neg", word: "serious", stem: "seriou",
    ant: [ "playful" ],
    avg: [ 5.89, 7.63 ], std: [ 2.49, 1.21 ], fq: 18
  },
  "settle": {
    dict: "anew-neg", word: "settle", stem: "settl",
    ant: [ "float" ],
    avg: [ 3.10, 6.42 ], std: [ 1.61, 1.02 ], fq: 20
  },
  "settled": {
    dict: "anew-neg", word: "settled", stem: "settl",
    ant: [ "float" ],
    avg: [ 3.10, 6.42 ], std: [ 1.61, 1.02 ], fq: 20
  },
  "shallow": {
    dict: "anew-neg", word: "shallow", stem: "shallow",
    ant: [ "deep" ],
    avg: [ 6.17, 5.74 ], std: [ 2.70, 1.40 ], fq: 50
  },
  "shame": {
    dict: "anew-neg", word: "shame", stem: "shame",
    ant: [ "honor" ],
    avg: [ 5.90, 7.22 ], std: [ 1.83, 1.20 ], fq: 50
  },
  "shamed": {
    dict: "anew-neg", word: "shamed", stem: "shame",
    ant: [ "honor" ],
    avg: [ 5.90, 7.22 ], std: [ 1.83, 1.20 ], fq: 50
  },
  "short": {
    dict: "anew-neg", word: "short", stem: "short",
    ant: [ "tall" ],
    avg: [ 3.85, 6.71 ], std: [ 2.08, 1.93 ], fq: 20
  },
  "shout": {
    dict: "anew-neg", word: "shout", stem: "shout",
    ant: [ "whisper" ],
    avg: [ 4.10, 6.14 ], std: [ 2.92, 1.71 ], fq: 20
  },
  "shouting": {
    dict: "anew-neg", word: "shouting", stem: "shout",
    ant: [ "whisper" ],
    avg: [ 4.10, 6.14 ], std: [ 2.92, 1.71 ], fq: 20
  },
  "show": {
    dict: "anew-neg", word: "show", stem: "show",
    ant: [ "disprove", "hide" ],
    avg: [ 4.75, 4.16 ], std: [ 2.31, 1.61 ], fq: 72
  },
  "showed": {
    dict: "anew-neg", word: "showed", stem: "show",
    ant: [ "disprove", "hide" ],
    avg: [ 4.75, 4.16 ], std: [ 2.31, 1.61 ], fq: 72
  },
  "showing": {
    dict: "anew-neg", word: "showing", stem: "show",
    ant: [ "disprove", "hide" ],
    avg: [ 4.75, 4.16 ], std: [ 2.31, 1.61 ], fq: 72
  },
  "shown": {
    dict: "anew-neg", word: "shown", stem: "shown",
    ant: [ "disprove", "hide" ],
    avg: [ 4.75, 4.16 ], std: [ 2.31, 1.61 ], fq: 72
  },
  "shows": {
    dict: "anew-neg", word: "shows", stem: "show",
    ant: [ "disprove", "hide" ],
    avg: [ 4.75, 4.16 ], std: [ 2.31, 1.61 ], fq: 72
  },
  "shy": {
    dict: "anew-neg", word: "shy", stem: "shi",
    ant: [ "confident" ],
    avg: [ 6.22, 7.10 ], std: [ 2.41, 1.18 ], fq: 50
  },
  "sick": {
    dict: "anew-neg", word: "sick", stem: "sick",
    ant: [ "well" ],
    avg: [ 5.43, 6.68 ], std: [ 2.85, 1.25 ], fq: 50
  },
  "sickness": {
    dict: "anew-neg", word: "sickness", stem: "sick",
    ant: [ "wellness" ],
    avg: [ 4.56, 7.67 ], std: [ 2.40, 1.28 ], fq: 23
  },
  "side": {
    dict: "anew-neg", word: "side", stem: "side",
    ant: [ "bottom" ],
    avg: [ 2.95, 4.44 ], std: [ 1.72, 1.33 ], fq: 50
  },
  "significant": {
    dict: "anew-neg", word: "significant", stem: "signific",
    ant: [ "insignificant" ],
    avg: [ 3.70, 3.64 ], std: [ 1.78, 2.08 ], fq: 21
  },
  "silence": {
    dict: "anew-neg", word: "silence", stem: "silenc",
    ant: [ "sound" ],
    avg: [ 5.43, 5.86 ], std: [ 2.85, 1.28 ], fq: 50
  },
  "simplicity": {
    dict: "anew-neg", word: "simplicity", stem: "simplic",
    ant: [ "difficulty" ],
    avg: [ 5.94, 3.38 ], std: [ 2.36, 1.23 ], fq: 50
  },
  "simplify": {
    dict: "anew-neg", word: "simplify", stem: "simplifi",
    ant: [ "complicate" ],
    avg: [ 4.95, 3.30 ], std: [ 2.09, 1.26 ], fq: 20
  },
  "single": {
    dict: "anew-neg", word: "single", stem: "singl",
    ant: [ "common", "double", "married" ],
    avg: [ 4.62, 5.71 ], std: [ 2.45, 1.52 ], fq: 150
  },
  "sister": {
    dict: "anew-neg", word: "sister", stem: "sister",
    ant: [ "brother" ],
    avg: [ 4.71, 7.22 ], std: [ 2.68, 1.23 ], fq: 50
  },
  "sisters": {
    dict: "anew-neg", word: "sisters", stem: "sister",
    ant: [ "brother" ],
    avg: [ 4.71, 7.22 ], std: [ 2.68, 1.23 ], fq: 50
  },
  "sit": {
    dict: "anew-neg", word: "sit", stem: "sit",
    ant: [ "lie", "arise" ],
    avg: [ 5.32, 4.62 ], std: [ 2.47, 1.45 ], fq: 69
  },
  "sites": {
    dict: "anew-neg", word: "sites", stem: "site",
    ant: [ "lie", "arise" ],
    avg: [ 5.32, 4.62 ], std: [ 2.47, 1.45 ], fq: 69
  },
  "sits": {
    dict: "anew-neg", word: "sits", stem: "sit",
    ant: [ "lie", "arise" ],
    avg: [ 5.32, 4.62 ], std: [ 2.47, 1.45 ], fq: 69
  },
  "sitting": {
    dict: "anew-neg", word: "sitting", stem: "sit",
    ant: [ "lie", "arise", "standing" ],
    avg: [ 4.86, 4.95 ], std: [ 2.48, 1.28 ], fq: 119
  },
  "sleep": {
    dict: "anew-neg", word: "sleep", stem: "sleep",
    ant: [ "wake" ],
    avg: [ 6.63, 4.72 ], std: [ 2.70, 1.65 ], fq: 50
  },
  "sleeping": {
    dict: "anew-neg", word: "sleeping", stem: "sleep",
    ant: [ "waking", "wake" ],
    avg: [ 6.63, 5.25 ], std: [ 2.70, 1.56 ], fq: 100
  },
  "sleeps": {
    dict: "anew-neg", word: "sleeps", stem: "sleep",
    ant: [ "wake" ],
    avg: [ 6.63, 4.72 ], std: [ 2.70, 1.65 ], fq: 50
  },
  "slept": {
    dict: "anew-neg", word: "slept", stem: "slept",
    ant: [ "wake" ],
    avg: [ 6.63, 4.72 ], std: [ 2.70, 1.65 ], fq: 50
  },
  "slim": {
    dict: "anew-neg", word: "slim", stem: "slim",
    ant: [ "gain" ],
    avg: [ 7.72, 6.40 ], std: [ 2.16, 1.54 ], fq: 50
  },
  "slow": {
    dict: "anew-neg", word: "slow", stem: "slow",
    ant: [ "accelerate", "fast", "quickly" ],
    avg: [ 6.00, 6.14 ], std: [ 2.01, 1.39 ], fq: 122
  },
  "slowly": {
    dict: "anew-neg", word: "slowly", stem: "slowli",
    ant: [ "quickly" ],
    avg: [ 6.57, 5.82 ], std: [ 1.78, 1.45 ], fq: 50
  },
  "slug": {
    dict: "anew-neg", word: "slug", stem: "slug",
    ant: [ "work" ],
    avg: [ 4.07, 5.24 ], std: [ 1.98, 2.10 ], fq: 50
  },
  "slugs": {
    dict: "anew-neg", word: "slugs", stem: "slug",
    ant: [ "work" ],
    avg: [ 4.07, 5.24 ], std: [ 1.98, 2.10 ], fq: 50
  },
  "slumber": {
    dict: "anew-neg", word: "slumber", stem: "slumber",
    ant: [ "wake" ],
    avg: [ 6.63, 4.72 ], std: [ 2.70, 1.65 ], fq: 50
  },
  "slur": {
    dict: "anew-neg", word: "slur", stem: "slur",
    ant: [ "focus" ],
    avg: [ 4.65, 6.12 ], std: [ 2.13, 1.06 ], fq: 50
  },
  "small": {
    dict: "anew-neg", word: "small", stem: "small",
    ant: [ "big" ],
    avg: [ 4.76, 6.22 ], std: [ 1.95, 1.50 ], fq: 50
  },
  "smaller": {
    dict: "anew-neg", word: "smaller", stem: "smaller",
    ant: [ "big" ],
    avg: [ 4.76, 6.22 ], std: [ 1.95, 1.50 ], fq: 50
  },
  "smart": {
    dict: "anew-neg", word: "smart", stem: "smart",
    ant: [ "stupid" ],
    avg: [ 4.72, 2.68 ], std: [ 2.71, 1.22 ], fq: 50
  },
  "smooth": {
    dict: "anew-neg", word: "smooth", stem: "smooth",
    ant: [ "rough" ],
    avg: [ 5.33, 3.54 ], std: [ 2.04, 1.45 ], fq: 50
  },
  "sober": {
    dict: "anew-neg", word: "sober", stem: "sober",
    ant: [ "playful" ],
    avg: [ 5.89, 7.63 ], std: [ 2.49, 1.21 ], fq: 18
  },
  "socialism": {
    dict: "anew-neg", word: "socialism", stem: "social",
    ant: [ "capitalism" ],
    avg: [ 5.39, 3.62 ], std: [ 2.89, 1.94 ], fq: 22
  },
  "soft": {
    dict: "anew-neg", word: "soft", stem: "soft",
    ant: [ "hard" ],
    avg: [ 5.12, 4.10 ], std: [ 2.19, 1.39 ], fq: 50
  },
  "soften": {
    dict: "anew-neg", word: "soften", stem: "soften",
    ant: [ "stand" ],
    avg: [ 3.93, 5.60 ], std: [ 2.49, 1.11 ], fq: 50
  },
  "softness": {
    dict: "anew-neg", word: "softness", stem: "soft",
    ant: [ "fitness" ],
    avg: [ 5.32, 6.45 ], std: [ 2.75, 1.74 ], fq: 22
  },
  "software": {
    dict: "anew-neg", word: "software", stem: "softwar",
    ant: [ "hardware" ],
    avg: [ 4.41, 6.11 ], std: [ 2.24, 1.49 ], fq: 20
  },
  "soil": {
    dict: "anew-neg", word: "soil", stem: "soil",
    ant: [ "clean" ],
    avg: [ 4.37, 6.90 ], std: [ 2.14, 1.90 ], fq: 50
  },
  "sold": {
    dict: "anew-neg", word: "sold", stem: "sold",
    ant: [ "buy" ],
    avg: [ 4.67, 6.28 ], std: [ 2.35, 1.36 ], fq: 50
  },
  "son": {
    dict: "anew-neg", word: "son", stem: "son",
    ant: [ "daughter", "girl" ],
    avg: [ 4.29, 7.02 ], std: [ 2.69, 1.52 ], fq: 100
  },
  "sons": {
    dict: "anew-neg", word: "sons", stem: "son",
    ant: [ "daughter", "girl" ],
    avg: [ 4.29, 7.02 ], std: [ 2.69, 1.52 ], fq: 100
  },
  "soothe": {
    dict: "anew-neg", word: "soothe", stem: "sooth",
    ant: [ "irritate" ],
    avg: [ 5.85, 3.19 ], std: [ 2.23, 1.69 ], fq: 40
  },
  "soothing": {
    dict: "anew-neg", word: "soothing", stem: "sooth",
    ant: [ "irritate" ],
    avg: [ 5.85, 3.19 ], std: [ 2.23, 1.69 ], fq: 40
  },
  "sorrow": {
    dict: "anew-neg", word: "sorrow", stem: "sorrow",
    ant: [ "joy" ],
    avg: [ 5.98, 8.16 ], std: [ 2.54, 1.06 ], fq: 50
  },
  "sorrowful": {
    dict: "anew-neg", word: "sorrowful", stem: "sorrow",
    ant: [ "joyful" ],
    avg: [ 5.53, 8.21 ], std: [ 2.88, 0.98 ], fq: 41
  },
  "sorrows": {
    dict: "anew-neg", word: "sorrows", stem: "sorrow",
    ant: [ "joy" ],
    avg: [ 5.98, 8.16 ], std: [ 2.54, 1.06 ], fq: 50
  },
  "sound": {
    dict: "anew-neg", word: "sound", stem: "sound",
    ant: [ "silence" ],
    avg: [ 2.82, 5.14 ], std: [ 2.13, 1.74 ], fq: 50
  },
  "sour": {
    dict: "anew-neg", word: "sour", stem: "sour",
    ant: [ "sweeten", "sweet" ],
    avg: [ 4.77, 7.01 ], std: [ 2.52, 1.18 ], fq: 70
  },
  "sparkling": {
    dict: "anew-neg", word: "sparkling", stem: "sparkl",
    ant: [ "still" ],
    avg: [ 4.91, 5.14 ], std: [ 2.57, 1.12 ], fq: 50
  },
  "split": {
    dict: "anew-neg", word: "split", stem: "split",
    ant: [ "unite" ],
    avg: [ 3.75, 6.64 ], std: [ 2.49, 1.19 ], fq: 50
  },
  "square": {
    dict: "anew-neg", word: "square", stem: "squar",
    ant: [ "round", "crooked" ],
    avg: [ 4.25, 4.86 ], std: [ 2.24, 1.32 ], fq: 100
  },
  "stability": {
    dict: "anew-neg", word: "stability", stem: "stabil",
    ant: [ "instability" ],
    avg: [ 4.89, 2.75 ], std: [ 2.32, 1.21 ], fq: 19
  },
  "stale": {
    dict: "anew-neg", word: "stale", stem: "stale",
    ant: [ "fresh" ],
    avg: [ 3.91, 7.26 ], std: [ 2.64, 1.32 ], fq: 50
  },
  "stand": {
    dict: "anew-neg", word: "stand", stem: "stand",
    ant: [ "lie" ],
    avg: [ 5.96, 2.60 ], std: [ 2.63, 1.62 ], fq: 50
  },
  "standing": {
    dict: "anew-neg", word: "standing", stem: "stand",
    ant: [ "lie", "running", "seated" ],
    avg: [ 4.57, 4.83 ], std: [ 2.41, 1.46 ], fq: 150
  },
  "stands": {
    dict: "anew-neg", word: "stands", stem: "stand",
    ant: [ "lie" ],
    avg: [ 5.96, 2.60 ], std: [ 2.63, 1.62 ], fq: 50
  },
  "start": {
    dict: "anew-neg", word: "start", stem: "start",
    ant: [ "end", "finish", "stop" ],
    avg: [ 4.43, 4.78 ], std: [ 2.79, 1.65 ], fq: 121
  },
  "started": {
    dict: "anew-neg", word: "started", stem: "start",
    ant: [ "end", "stop" ],
    avg: [ 4.80, 4.10 ], std: [ 2.95, 1.55 ], fq: 100
  },
  "starting": {
    dict: "anew-neg", word: "starting", stem: "start",
    ant: [ "end", "stop" ],
    avg: [ 4.80, 4.10 ], std: [ 2.95, 1.55 ], fq: 100
  },
  "starts": {
    dict: "anew-neg", word: "starts", stem: "start",
    ant: [ "end", "finish", "stop" ],
    avg: [ 4.43, 4.78 ], std: [ 2.79, 1.65 ], fq: 121
  },
  "starve": {
    dict: "anew-neg", word: "starve", stem: "starv",
    ant: [ "feed" ],
    avg: [ 5.69, 6.42 ], std: [ 2.51, 1.20 ], fq: 50
  },
  "starving": {
    dict: "anew-neg", word: "starving", stem: "starv",
    ant: [ "feed" ],
    avg: [ 5.69, 6.42 ], std: [ 2.51, 1.20 ], fq: 50
  },
  "stay": {
    dict: "anew-neg", word: "stay", stem: "stay",
    ant: [ "move" ],
    avg: [ 6.21, 5.72 ], std: [ 2.51, 1.36 ], fq: 50
  },
  "stayed": {
    dict: "anew-neg", word: "stayed", stem: "stay",
    ant: [ "move" ],
    avg: [ 6.21, 5.72 ], std: [ 2.51, 1.36 ], fq: 50
  },
  "staying": {
    dict: "anew-neg", word: "staying", stem: "stay",
    ant: [ "move" ],
    avg: [ 6.21, 5.72 ], std: [ 2.51, 1.36 ], fq: 50
  },
  "stays": {
    dict: "anew-neg", word: "stays", stem: "stay",
    ant: [ "move" ],
    avg: [ 6.21, 5.72 ], std: [ 2.51, 1.36 ], fq: 50
  },
  "stiff": {
    dict: "anew-neg", word: "stiff", stem: "stiff",
    ant: [ "impotent" ],
    avg: [ 3.71, 2.95 ], std: [ 2.41, 2.17 ], fq: 20
  },
  "still": {
    dict: "anew-neg", word: "still", stem: "still",
    ant: [ "agitate", "moving", "sparkling" ],
    avg: [ 5.39, 4.98 ], std: [ 2.60, 1.77 ], fq: 93
  },
  "stingy": {
    dict: "anew-neg", word: "stingy", stem: "stingi",
    ant: [ "generous" ],
    avg: [ 5.70, 7.43 ], std: [ 2.32, 1.83 ], fq: 20
  },
  "stinky": {
    dict: "anew-neg", word: "stinky", stem: "stinki",
    ant: [ "fragrant" ],
    avg: [ 4.85, 7.05 ], std: [ 2.43, 1.18 ], fq: 19
  },
  "stood": {
    dict: "anew-neg", word: "stood", stem: "stood",
    ant: [ "lie" ],
    avg: [ 5.96, 2.60 ], std: [ 2.63, 1.62 ], fq: 50
  },
  "stop": {
    dict: "anew-neg", word: "stop", stem: "stop",
    ant: [ "start", "begin" ],
    avg: [ 3.33, 6.25 ], std: [ 2.24, 1.81 ], fq: 69
  },
  "stopped": {
    dict: "anew-neg", word: "stopped", stem: "stop",
    ant: [ "start", "begin" ],
    avg: [ 3.33, 6.25 ], std: [ 2.24, 1.81 ], fq: 69
  },
  "stopping": {
    dict: "anew-neg", word: "stopping", stem: "stop",
    ant: [ "start", "begin" ],
    avg: [ 3.33, 6.25 ], std: [ 2.24, 1.81 ], fq: 69
  },
  "stops": {
    dict: "anew-neg", word: "stops", stem: "stop",
    ant: [ "start", "begin" ],
    avg: [ 3.33, 6.25 ], std: [ 2.24, 1.81 ], fq: 69
  },
  "straight": {
    dict: "anew-neg", word: "straight", stem: "straight",
    ant: [ "crooked" ],
    avg: [ 4.67, 3.70 ], std: [ 2.35, 1.61 ], fq: 50
  },
  "straighten": {
    dict: "anew-neg", word: "straighten", stem: "straighten",
    ant: [ "bend" ],
    avg: [ 4.07, 5.06 ], std: [ 2.34, 1.32 ], fq: 50
  },
  "strain": {
    dict: "anew-neg", word: "strain", stem: "strain",
    ant: [ "relax" ],
    avg: [ 2.39, 7.70 ], std: [ 2.13, 1.07 ], fq: 50
  },
  "stranger": {
    dict: "anew-neg", word: "stranger", stem: "stranger",
    ant: [ "familiar" ],
    avg: [ 6.98, 6.44 ], std: [ 2.21, 1.26 ], fq: 50
  },
  "strength": {
    dict: "anew-neg", word: "strength", stem: "strength",
    ant: [ "weakness" ],
    avg: [ 5.34, 2.94 ], std: [ 2.52, 1.53 ], fq: 50
  },
  "strengthen": {
    dict: "anew-neg", word: "strengthen", stem: "strengthen",
    ant: [ "weaken" ],
    avg: [ 4.19, 3.30 ], std: [ 2.86, 1.13 ], fq: 18
  },
  "strike": {
    dict: "anew-neg", word: "strike", stem: "strike",
    ant: [ "miss" ],
    avg: [ 4.29, 3.64 ], std: [ 2.69, 1.63 ], fq: 50
  },
  "strikes": {
    dict: "anew-neg", word: "strikes", stem: "strike",
    ant: [ "miss" ],
    avg: [ 4.29, 3.64 ], std: [ 2.69, 1.63 ], fq: 50
  },
  "striking": {
    dict: "anew-neg", word: "striking", stem: "strike",
    ant: [ "miss" ],
    avg: [ 4.29, 3.64 ], std: [ 2.69, 1.63 ], fq: 50
  },
  "strip": {
    dict: "anew-neg", word: "strip", stem: "strip",
    ant: [ "dress" ],
    avg: [ 4.05, 6.60 ], std: [ 1.89, 1.18 ], fq: 50
  },
  "stripped": {
    dict: "anew-neg", word: "stripped", stem: "strip",
    ant: [ "dress" ],
    avg: [ 4.05, 6.60 ], std: [ 1.89, 1.18 ], fq: 50
  },
  "strong": {
    dict: "anew-neg", word: "strong", stem: "strong",
    ant: [ "weak", "impotent" ],
    avg: [ 3.92, 2.88 ], std: [ 2.25, 1.77 ], fq: 70
  },
  "stronger": {
    dict: "anew-neg", word: "stronger", stem: "stronger",
    ant: [ "weak", "impotent" ],
    avg: [ 3.92, 2.88 ], std: [ 2.25, 1.77 ], fq: 70
  },
  "struck": {
    dict: "anew-neg", word: "struck", stem: "struck",
    ant: [ "miss" ],
    avg: [ 4.29, 3.64 ], std: [ 2.69, 1.63 ], fq: 50
  },
  "stupid": {
    dict: "anew-neg", word: "stupid", stem: "stupid",
    ant: [ "smart", "intelligent" ],
    avg: [ 5.30, 7.54 ], std: [ 2.76, 1.36 ], fq: 69
  },
  "stupidity": {
    dict: "anew-neg", word: "stupidity", stem: "stupid",
    ant: [ "intelligence" ],
    avg: [ 5.17, 7.30 ], std: [ 2.11, 1.20 ], fq: 50
  },
  "succeed": {
    dict: "anew-neg", word: "succeed", stem: "succeed",
    ant: [ "fail" ],
    avg: [ 7.15, 1.96 ], std: [ 2.40, 1.03 ], fq: 50
  },
  "succeeded": {
    dict: "anew-neg", word: "succeeded", stem: "succeed",
    ant: [ "fail" ],
    avg: [ 7.15, 1.96 ], std: [ 2.40, 1.03 ], fq: 50
  },
  "succeeding": {
    dict: "anew-neg", word: "succeeding", stem: "succeed",
    ant: [ "fail" ],
    avg: [ 7.15, 1.96 ], std: [ 2.40, 1.03 ], fq: 50
  },
  "success": {
    dict: "anew-neg", word: "success", stem: "success",
    ant: [ "failure", "loser" ],
    avg: [ 4.95, 2.13 ], std: [ 2.69, 1.17 ], fq: 100
  },
  "successful": {
    dict: "anew-neg", word: "successful", stem: "success",
    ant: [ "unsuccessful" ],
    avg: [ 3.36, 2.33 ], std: [ 2.48, 1.39 ], fq: 23
  },
  "suffer": {
    dict: "anew-neg", word: "suffer", stem: "suffer",
    ant: [ "enjoy" ],
    avg: [ 5.20, 7.66 ], std: [ 2.72, 1.47 ], fq: 50
  },
  "suffered": {
    dict: "anew-neg", word: "suffered", stem: "suffer",
    ant: [ "enjoy" ],
    avg: [ 5.20, 7.66 ], std: [ 2.72, 1.47 ], fq: 50
  },
  "suffering": {
    dict: "anew-neg", word: "suffering", stem: "suffer",
    ant: [ "enjoy" ],
    avg: [ 5.20, 7.66 ], std: [ 2.72, 1.47 ], fq: 50
  },
  "sufficient": {
    dict: "anew-neg", word: "sufficient", stem: "suffici",
    ant: [ "insufficient" ],
    avg: [ 3.57, 3.24 ], std: [ 1.75, 1.95 ], fq: 22
  },
  "sundown": {
    dict: "anew-neg", word: "sundown", stem: "sundown",
    ant: [ "sunrise" ],
    avg: [ 5.06, 7.04 ], std: [ 3.05, 1.80 ], fq: 50
  },
  "sunrise": {
    dict: "anew-neg", word: "sunrise", stem: "sunris",
    ant: [ "sunset" ],
    avg: [ 4.20, 7.16 ], std: [ 2.99, 2.11 ], fq: 50
  },
  "sunset": {
    dict: "anew-neg", word: "sunset", stem: "sunset",
    ant: [ "sunrise" ],
    avg: [ 5.06, 7.04 ], std: [ 3.05, 1.80 ], fq: 50
  },
  "superficial": {
    dict: "anew-neg", word: "superficial", stem: "superfici",
    ant: [ "profound" ],
    avg: [ 4.14, 6.65 ], std: [ 2.73, 1.35 ], fq: 20
  },
  "superior": {
    dict: "anew-neg", word: "superior", stem: "superior",
    ant: [ "inferior" ],
    avg: [ 3.83, 3.20 ], std: [ 2.05, 1.47 ], fq: 50
  },
  "supernatural": {
    dict: "anew-neg", word: "supernatural", stem: "supernatur",
    ant: [ "natural" ],
    avg: [ 4.37, 6.56 ], std: [ 2.51, 1.49 ], fq: 50
  },
  "sure": {
    dict: "anew-neg", word: "sure", stem: "sure",
    ant: [ "uncertain", "unsure" ],
    avg: [ 4.50, 3.49 ], std: [ 2.00, 1.39 ], fq: 41
  },
  "surrender": {
    dict: "anew-neg", word: "surrender", stem: "surrend",
    ant: [ "resist" ],
    avg: [ 6.37, 4.74 ], std: [ 2.56, 1.60 ], fq: 50
  },
  "suspect": {
    dict: "anew-neg", word: "suspect", stem: "suspect",
    ant: [ "trust" ],
    avg: [ 5.30, 7.22 ], std: [ 2.66, 1.23 ], fq: 50
  },
  "swear": {
    dict: "anew-neg", word: "swear", stem: "swear",
    ant: [ "distrust" ],
    avg: [ 4.05, 2.95 ], std: [ 2.77, 2.28 ], fq: 20
  },
  "sweet": {
    dict: "anew-neg", word: "sweet", stem: "sweet",
    ant: [ "sour", "dry" ],
    avg: [ 4.45, 4.38 ], std: [ 2.01, 1.39 ], fq: 100
  },
  "sweeten": {
    dict: "anew-neg", word: "sweeten", stem: "sweeten",
    ant: [ "sour" ],
    avg: [ 5.10, 4.06 ], std: [ 1.95, 1.50 ], fq: 50
  },
  "sweeter": {
    dict: "anew-neg", word: "sweeter", stem: "sweeter",
    ant: [ "sour", "dry" ],
    avg: [ 4.45, 4.38 ], std: [ 2.01, 1.39 ], fq: 100
  },
  "sweetest": {
    dict: "anew-neg", word: "sweetest", stem: "sweetest",
    ant: [ "sour", "dry" ],
    avg: [ 4.45, 4.38 ], std: [ 2.01, 1.39 ], fq: 100
  },
  "sweetness": {
    dict: "anew-neg", word: "sweetness", stem: "sweet",
    ant: [ "unpleasantness" ],
    avg: [ 4.36, 2.59 ], std: [ 2.22, 1.30 ], fq: 23
  },
  "swore": {
    dict: "anew-neg", word: "swore", stem: "swore",
    ant: [ "distrust" ],
    avg: [ 4.05, 2.95 ], std: [ 2.77, 2.28 ], fq: 20
  },
  "sympathetic": {
    dict: "anew-neg", word: "sympathetic", stem: "sympathet",
    ant: [ "unsympathetic" ],
    avg: [ 4.30, 3.35 ], std: [ 2.32, 1.73 ], fq: 20
  },
  "tail": {
    dict: "anew-neg", word: "tail", stem: "tail",
    ant: [ "head" ],
    avg: [ 5.00, 5.96 ], std: [ 2.68, 1.07 ], fq: 50
  },
  "take": {
    dict: "anew-neg", word: "take", stem: "take",
    ant: [ "give", "refuse" ],
    avg: [ 5.35, 4.54 ], std: [ 2.51, 1.39 ], fq: 100
  },
  "taken": {
    dict: "anew-neg", word: "taken", stem: "taken",
    ant: [ "give", "refuse" ],
    avg: [ 5.35, 4.54 ], std: [ 2.51, 1.39 ], fq: 100
  },
  "takes": {
    dict: "anew-neg", word: "takes", stem: "take",
    ant: [ "give", "refuse" ],
    avg: [ 5.35, 4.54 ], std: [ 2.51, 1.39 ], fq: 100
  },
  "taking": {
    dict: "anew-neg", word: "taking", stem: "take",
    ant: [ "give", "refuse" ],
    avg: [ 5.35, 4.54 ], std: [ 2.51, 1.39 ], fq: 100
  },
  "tall": {
    dict: "anew-neg", word: "tall", stem: "tall",
    ant: [ "short" ],
    avg: [ 5.73, 4.46 ], std: [ 2.73, 1.15 ], fq: 50
  },
  "tame": {
    dict: "anew-neg", word: "tame", stem: "tame",
    ant: [ "wild" ],
    avg: [ 4.14, 5.50 ], std: [ 2.30, 1.81 ], fq: 50
  },
  "tardiness": {
    dict: "anew-neg", word: "tardiness", stem: "tardi",
    ant: [ "punctuality" ],
    avg: [ 3.85, 6.72 ], std: [ 2.66, 1.45 ], fq: 19
  },
  "tasteful": {
    dict: "anew-neg", word: "tasteful", stem: "tast",
    ant: [ "tasteless" ],
    avg: [ 3.86, 3.25 ], std: [ 2.22, 1.02 ], fq: 20
  },
  "tasteless": {
    dict: "anew-neg", word: "tasteless", stem: "tasteless",
    ant: [ "tasty", "tasteful" ],
    avg: [ 5.03, 6.89 ], std: [ 2.44, 1.76 ], fq: 38
  },
  "tasty": {
    dict: "anew-neg", word: "tasty", stem: "tasti",
    ant: [ "tasteless" ],
    avg: [ 3.86, 3.25 ], std: [ 2.22, 1.02 ], fq: 20
  },
  "tender": {
    dict: "anew-neg", word: "tender", stem: "tender",
    ant: [ "tough" ],
    avg: [ 5.12, 3.96 ], std: [ 2.19, 1.41 ], fq: 50
  },
  "tense": {
    dict: "anew-neg", word: "tense", stem: "tens",
    ant: [ "relax", "relaxed" ],
    avg: [ 2.39, 7.46 ], std: [ 2.13, 1.07 ], fq: 100
  },
  "terminate": {
    dict: "anew-neg", word: "terminate", stem: "termin",
    ant: [ "begin", "hire" ],
    avg: [ 4.88, 6.48 ], std: [ 2.15, 1.73 ], fq: 69
  },
  "thankful": {
    dict: "anew-neg", word: "thankful", stem: "thank",
    ant: [ "ungrateful" ],
    avg: [ 4.71, 2.68 ], std: [ 2.24, 1.45 ], fq: 20
  },
  "thankless": {
    dict: "anew-neg", word: "thankless", stem: "thankless",
    ant: [ "grateful" ],
    avg: [ 4.58, 7.36 ], std: [ 2.14, 1.47 ], fq: 50
  },
  "thin": {
    dict: "anew-neg", word: "thin", stem: "thin",
    ant: [ "gain", "fat", "full" ],
    avg: [ 6.15, 5.47 ], std: [ 2.62, 1.55 ], fq: 150
  },
  "think": {
    dict: "anew-neg", word: "think", stem: "think",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "thinking": {
    dict: "anew-neg", word: "thinking", stem: "think",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "thinks": {
    dict: "anew-neg", word: "thinks", stem: "think",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "thirsty": {
    dict: "anew-neg", word: "thirsty", stem: "thirsti",
    ant: [ "hungry" ],
    avg: [ 5.13, 3.38 ], std: [ 2.44, 1.93 ], fq: 50
  },
  "thought": {
    dict: "anew-neg", word: "thought", stem: "thought",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "tidy": {
    dict: "anew-neg", word: "tidy", stem: "tidi",
    ant: [ "untidy" ],
    avg: [ 3.67, 3.58 ], std: [ 2.00, 1.12 ], fq: 18
  },
  "tie": {
    dict: "anew-neg", word: "tie", stem: "tie",
    ant: [ "disconnect" ],
    avg: [ 3.12, 3.81 ], std: [ 2.49, 1.29 ], fq: 22
  },
  "tied": {
    dict: "anew-neg", word: "tied", stem: "tie",
    ant: [ "disconnect" ],
    avg: [ 3.12, 3.81 ], std: [ 2.49, 1.29 ], fq: 22
  },
  "ties": {
    dict: "anew-neg", word: "ties", stem: "tie",
    ant: [ "disconnect" ],
    avg: [ 3.12, 3.81 ], std: [ 2.49, 1.29 ], fq: 22
  },
  "tight": {
    dict: "anew-neg", word: "tight", stem: "tight",
    ant: [ "loose", "leaky" ],
    avg: [ 4.40, 3.96 ], std: [ 2.59, 1.65 ], fq: 71
  },
  "tighter": {
    dict: "anew-neg", word: "tighter", stem: "tighter",
    ant: [ "loose", "leaky" ],
    avg: [ 4.40, 3.96 ], std: [ 2.59, 1.65 ], fq: 71
  },
  "timid": {
    dict: "anew-neg", word: "timid", stem: "timid",
    ant: [ "brave", "bold", "confident" ],
    avg: [ 5.98, 6.70 ], std: [ 2.36, 1.44 ], fq: 150
  },
  "tire": {
    dict: "anew-neg", word: "tire", stem: "tire",
    ant: [ "refresh", "interest" ],
    avg: [ 4.20, 6.49 ], std: [ 2.24, 1.55 ], fq: 71
  },
  "tired": {
    dict: "anew-neg", word: "tired", stem: "tire",
    ant: [ "refresh", "interest" ],
    avg: [ 4.20, 6.49 ], std: [ 2.24, 1.55 ], fq: 71
  },
  "tires": {
    dict: "anew-neg", word: "tires", stem: "tire",
    ant: [ "refresh", "interest" ],
    avg: [ 4.20, 6.49 ], std: [ 2.24, 1.55 ], fq: 71
  },
  "tiring": {
    dict: "anew-neg", word: "tiring", stem: "tire",
    ant: [ "refresh", "interest" ],
    avg: [ 4.20, 6.49 ], std: [ 2.24, 1.55 ], fq: 71
  },
  "tolerance": {
    dict: "anew-neg", word: "tolerance", stem: "toler",
    ant: [ "intolerance" ],
    avg: [ 5.35, 2.95 ], std: [ 2.03, 1.27 ], fq: 19
  },
  "took": {
    dict: "anew-neg", word: "took", stem: "took",
    ant: [ "give", "refuse" ],
    avg: [ 5.35, 4.54 ], std: [ 2.51, 1.39 ], fq: 100
  },
  "top": {
    dict: "anew-neg", word: "top", stem: "top",
    ant: [ "bottom" ],
    avg: [ 2.95, 4.44 ], std: [ 1.72, 1.33 ], fq: 50
  },
  "tops": {
    dict: "anew-neg", word: "tops", stem: "top",
    ant: [ "bottom" ],
    avg: [ 2.95, 4.44 ], std: [ 1.72, 1.33 ], fq: 50
  },
  "tough": {
    dict: "anew-neg", word: "tough", stem: "tough",
    ant: [ "tender" ],
    avg: [ 4.88, 6.45 ], std: [ 2.30, 1.72 ], fq: 50
  },
  "tragedy": {
    dict: "anew-neg", word: "tragedy", stem: "tragedi",
    ant: [ "comedy" ],
    avg: [ 5.85, 7.98 ], std: [ 2.81, 1.15 ], fq: 50
  },
  "trained": {
    dict: "anew-neg", word: "trained", stem: "train",
    ant: [ "untrained" ],
    avg: [ 4.57, 3.95 ], std: [ 2.29, 1.58 ], fq: 20
  },
  "triumph": {
    dict: "anew-neg", word: "triumph", stem: "triumph",
    ant: [ "defeat" ],
    avg: [ 5.09, 3.20 ], std: [ 3.00, 1.95 ], fq: 50
  },
  "troubled": {
    dict: "anew-neg", word: "troubled", stem: "troubl",
    ant: [ "untroubled" ],
    avg: [ 3.02, 6.21 ], std: [ 2.30, 1.84 ], fq: 41
  },
  "true": {
    dict: "anew-neg", word: "true", stem: "true",
    ant: [ "false" ],
    avg: [ 3.43, 3.18 ], std: [ 2.09, 1.35 ], fq: 50
  },
  "trust": {
    dict: "anew-neg", word: "trust", stem: "trust",
    ant: [ "distrust" ],
    avg: [ 4.05, 2.95 ], std: [ 2.77, 2.28 ], fq: 20
  },
  "trusted": {
    dict: "anew-neg", word: "trusted", stem: "trust",
    ant: [ "distrust" ],
    avg: [ 4.05, 2.95 ], std: [ 2.77, 2.28 ], fq: 20
  },
  "trustworthy": {
    dict: "anew-neg", word: "trustworthy", stem: "trustworthi",
    ant: [ "untrustworthy" ],
    avg: [ 4.80, 2.67 ], std: [ 2.86, 2.03 ], fq: 20
  },
  "trusty": {
    dict: "anew-neg", word: "trusty", stem: "trusti",
    ant: [ "untrustworthy" ],
    avg: [ 4.80, 2.67 ], std: [ 2.86, 2.03 ], fq: 20
  },
  "ugliness": {
    dict: "anew-neg", word: "ugliness", stem: "ugli",
    ant: [ "beauty" ],
    avg: [ 4.95, 7.76 ], std: [ 2.57, 1.61 ], fq: 50
  },
  "ugly": {
    dict: "anew-neg", word: "ugly", stem: "ugli",
    ant: [ "beautiful" ],
    avg: [ 4.95, 7.92 ], std: [ 2.57, 1.18 ], fq: 50
  },
  "unable": {
    dict: "anew-neg", word: "unable", stem: "unabl",
    ant: [ "able" ],
    avg: [ 5.08, 6.56 ], std: [ 2.07, 1.25 ], fq: 50
  },
  "unacceptable": {
    dict: "anew-neg", word: "unacceptable", stem: "unaccept",
    ant: [ "acceptable" ],
    avg: [ 5.40, 6.67 ], std: [ 2.70, 1.21 ], fq: 50
  },
  "unafraid": {
    dict: "anew-neg", word: "unafraid", stem: "unafraid",
    ant: [ "afraid", "insecure" ],
    avg: [ 6.09, 2.84 ], std: [ 2.44, 1.33 ], fq: 100
  },
  "unarmed": {
    dict: "anew-neg", word: "unarmed", stem: "unarm",
    ant: [ "armed" ],
    avg: [ 3.59, 3.84 ], std: [ 2.40, 1.86 ], fq: 50
  },
  "unattractive": {
    dict: "anew-neg", word: "unattractive", stem: "unattract",
    ant: [ "attractive" ],
    avg: [ 4.91, 7.19 ], std: [ 2.94, 1.91 ], fq: 21
  },
  "unavailable": {
    dict: "anew-neg", word: "unavailable", stem: "unavail",
    ant: [ "available" ],
    avg: [ 4.04, 6.86 ], std: [ 2.48, 1.28 ], fq: 22
  },
  "unaware": {
    dict: "anew-neg", word: "unaware", stem: "unawar",
    ant: [ "aware" ],
    avg: [ 5.00, 5.78 ], std: [ 2.68, 1.47 ], fq: 50
  },
  "unbalanced": {
    dict: "anew-neg", word: "unbalanced", stem: "unbalanc",
    ant: [ "balance" ],
    avg: [ 4.13, 6.84 ], std: [ 2.03, 1.57 ], fq: 21
  },
  "uncertain": {
    dict: "anew-neg", word: "uncertain", stem: "uncertain",
    ant: [ "certain", "sure" ],
    avg: [ 4.08, 6.22 ], std: [ 2.51, 1.53 ], fq: 69
  },
  "uncertainty": {
    dict: "anew-neg", word: "uncertainty", stem: "uncertainti",
    ant: [ "certainty" ],
    avg: [ 4.35, 6.38 ], std: [ 2.52, 1.75 ], fq: 22
  },
  "uncle": {
    dict: "anew-neg", word: "uncle", stem: "uncl",
    ant: [ "aunt" ],
    avg: [ 2.71, 6.56 ], std: [ 2.41, 2.09 ], fq: 19
  },
  "unclean": {
    dict: "anew-neg", word: "unclean", stem: "unclean",
    ant: [ "clean" ],
    avg: [ 4.37, 6.90 ], std: [ 2.14, 1.90 ], fq: 50
  },
  "unclear": {
    dict: "anew-neg", word: "unclear", stem: "unclear",
    ant: [ "clear" ],
    avg: [ 2.71, 6.14 ], std: [ 1.71, 1.70 ], fq: 21
  },
  "uncomfortable": {
    dict: "anew-neg", word: "uncomfortable", stem: "uncomfort",
    ant: [ "comfortable" ],
    avg: [ 3.93, 7.32 ], std: [ 2.85, 1.10 ], fq: 50
  },
  "unconscious": {
    dict: "anew-neg", word: "unconscious", stem: "unconsci",
    ant: [ "conscious" ],
    avg: [ 5.42, 6.14 ], std: [ 2.44, 1.39 ], fq: 50
  },
  "uncooperative": {
    dict: "anew-neg", word: "uncooperative", stem: "uncoop",
    ant: [ "cooperative" ],
    avg: [ 3.43, 6.62 ], std: [ 2.04, 1.72 ], fq: 21
  },
  "undefeated": {
    dict: "anew-neg", word: "undefeated", stem: "undef",
    ant: [ "defeated" ],
    avg: [ 5.09, 2.74 ], std: [ 3.00, 1.61 ], fq: 50
  },
  "undesirable": {
    dict: "anew-neg", word: "undesirable", stem: "undesir",
    ant: [ "desirable" ],
    avg: [ 7.35, 7.08 ], std: [ 1.76, 1.66 ], fq: 50
  },
  "undetermined": {
    dict: "anew-neg", word: "undetermined", stem: "undetermin",
    ant: [ "determined" ],
    avg: [ 4.07, 6.50 ], std: [ 1.98, 1.53 ], fq: 50
  },
  "undignified": {
    dict: "anew-neg", word: "undignified", stem: "undignifi",
    ant: [ "dignified" ],
    avg: [ 3.48, 6.55 ], std: [ 2.06, 1.56 ], fq: 42
  },
  "undress": {
    dict: "anew-neg", word: "undress", stem: "undress",
    ant: [ "dress" ],
    avg: [ 4.05, 6.60 ], std: [ 1.89, 1.18 ], fq: 50
  },
  "uneasy": {
    dict: "anew-neg", word: "uneasy", stem: "uneasi",
    ant: [ "easy", "restful" ],
    avg: [ 3.41, 6.46 ], std: [ 2.52, 1.93 ], fq: 72
  },
  "uneducated": {
    dict: "anew-neg", word: "uneducated", stem: "uneduc",
    ant: [ "educated" ],
    avg: [ 5.74, 7.29 ], std: [ 2.46, 1.31 ], fq: 50
  },
  "unemployed": {
    dict: "anew-neg", word: "unemployed", stem: "unemploy",
    ant: [ "employed" ],
    avg: [ 5.28, 7.28 ], std: [ 2.12, 1.36 ], fq: 50
  },
  "unemployment": {
    dict: "anew-neg", word: "unemployment", stem: "unemploy",
    ant: [ "employment" ],
    avg: [ 5.28, 6.36 ], std: [ 2.12, 1.78 ], fq: 50
  },
  "unethical": {
    dict: "anew-neg", word: "unethical", stem: "uneth",
    ant: [ "ethical" ],
    avg: [ 5.90, 6.20 ], std: [ 1.83, 1.37 ], fq: 50
  },
  "unfair": {
    dict: "anew-neg", word: "unfair", stem: "unfair",
    ant: [ "fair" ],
    avg: [ 5.32, 6.96 ], std: [ 1.92, 1.26 ], fq: 50
  },
  "unfaithful": {
    dict: "anew-neg", word: "unfaithful", stem: "unfaith",
    ant: [ "faithful" ],
    avg: [ 4.48, 7.95 ], std: [ 2.58, 1.07 ], fq: 23
  },
  "unfit": {
    dict: "anew-neg", word: "unfit", stem: "unfit",
    ant: [ "qualify", "fit" ],
    avg: [ 5.28, 6.57 ], std: [ 2.45, 1.78 ], fq: 39
  },
  "unforgiving": {
    dict: "anew-neg", word: "unforgiving", stem: "unforgiv",
    ant: [ "forgiving" ],
    avg: [ 3.95, 6.74 ], std: [ 2.40, 1.66 ], fq: 20
  },
  "unfortunate": {
    dict: "anew-neg", word: "unfortunate", stem: "unfortun",
    ant: [ "fortunate" ],
    avg: [ 3.81, 7.33 ], std: [ 2.36, 2.03 ], fq: 21
  },
  "unfriendly": {
    dict: "anew-neg", word: "unfriendly", stem: "unfriendli",
    ant: [ "friendly" ],
    avg: [ 4.54, 7.66 ], std: [ 1.86, 1.55 ], fq: 50
  },
  "ungrateful": {
    dict: "anew-neg", word: "ungrateful", stem: "ungrat",
    ant: [ "grateful" ],
    avg: [ 4.58, 7.36 ], std: [ 2.14, 1.47 ], fq: 50
  },
  "unhappiness": {
    dict: "anew-neg", word: "unhappiness", stem: "unhappi",
    ant: [ "happiness" ],
    avg: [ 6.49, 8.44 ], std: [ 2.77, 0.97 ], fq: 50
  },
  "unhappy": {
    dict: "anew-neg", word: "unhappy", stem: "unhappi",
    ant: [ "happy", "euphoric" ],
    avg: [ 5.86, 8.09 ], std: [ 2.73, 1.21 ], fq: 70
  },
  "unhealthy": {
    dict: "anew-neg", word: "unhealthy", stem: "unhealthi",
    ant: [ "healthy" ],
    avg: [ 4.60, 8.02 ], std: [ 2.67, 1.06 ], fq: 50
  },
  "unholy": {
    dict: "anew-neg", word: "unholy", stem: "unholi",
    ant: [ "holy" ],
    avg: [ 3.37, 6.06 ], std: [ 2.87, 2.65 ], fq: 18
  },
  "unification": {
    dict: "anew-neg", word: "unification", stem: "unif",
    ant: [ "separation" ],
    avg: [ 4.26, 3.53 ], std: [ 2.57, 1.82 ], fq: 50
  },
  "unified": {
    dict: "anew-neg", word: "unified", stem: "unifi",
    ant: [ "divide" ],
    avg: [ 3.82, 4.29 ], std: [ 2.24, 1.46 ], fq: 50
  },
  "union": {
    dict: "anew-neg", word: "union", stem: "union",
    ant: [ "separation" ],
    avg: [ 4.26, 3.53 ], std: [ 2.57, 1.82 ], fq: 50
  },
  "unions": {
    dict: "anew-neg", word: "unions", stem: "union",
    ant: [ "separation" ],
    avg: [ 4.26, 3.53 ], std: [ 2.57, 1.82 ], fq: 50
  },
  "unite": {
    dict: "anew-neg", word: "unite", stem: "unit",
    ant: [ "divide" ],
    avg: [ 3.82, 4.29 ], std: [ 2.24, 1.46 ], fq: 50
  },
  "united": {
    dict: "anew-neg", word: "united", stem: "unit",
    ant: [ "divide", "divided" ],
    avg: [ 3.82, 4.33 ], std: [ 2.24, 1.37 ], fq: 100
  },
  "universal": {
    dict: "anew-neg", word: "universal", stem: "univers",
    ant: [ "particular" ],
    avg: [ 4.10, 5.54 ], std: [ 2.24, 1.13 ], fq: 50
  },
  "unjust": {
    dict: "anew-neg", word: "unjust", stem: "unjust",
    ant: [ "fair" ],
    avg: [ 5.32, 6.96 ], std: [ 1.92, 1.26 ], fq: 50
  },
  "unkind": {
    dict: "anew-neg", word: "unkind", stem: "unkind",
    ant: [ "kind" ],
    avg: [ 4.30, 7.24 ], std: [ 2.62, 1.39 ], fq: 50
  },
  "unknown": {
    dict: "anew-neg", word: "unknown", stem: "unknown",
    ant: [ "known" ],
    avg: [ 6.38, 5.80 ], std: [ 2.68, 1.39 ], fq: 50
  },
  "unlawful": {
    dict: "anew-neg", word: "unlawful", stem: "unlaw",
    ant: [ "lawful" ],
    avg: [ 3.70, 6.26 ], std: [ 2.30, 1.24 ], fq: 19
  },
  "unlikely": {
    dict: "anew-neg", word: "unlikely", stem: "unlik",
    ant: [ "likely" ],
    avg: [ 4.42, 6.90 ], std: [ 2.29, 1.37 ], fq: 20
  },
  "unlucky": {
    dict: "anew-neg", word: "unlucky", stem: "unlucki",
    ant: [ "lucky" ],
    avg: [ 6.53, 7.68 ], std: [ 2.34, 1.27 ], fq: 50
  },
  "unpaid": {
    dict: "anew-neg", word: "unpaid", stem: "unpaid",
    ant: [ "paid" ],
    avg: [ 5.23, 7.14 ], std: [ 2.21, 1.71 ], fq: 50
  },
  "unpleasant": {
    dict: "anew-neg", word: "unpleasant", stem: "unpleas",
    ant: [ "pleasant" ],
    avg: [ 2.91, 7.24 ], std: [ 2.52, 1.51 ], fq: 21
  },
  "unprepared": {
    dict: "anew-neg", word: "unprepared", stem: "unprepar",
    ant: [ "prepared" ],
    avg: [ 3.82, 6.74 ], std: [ 2.40, 1.07 ], fq: 50
  },
  "unprofessional": {
    dict: "anew-neg", word: "unprofessional", stem: "unprofession",
    ant: [ "professional" ],
    avg: [ 5.20, 6.44 ], std: [ 2.85, 1.16 ], fq: 50
  },
  "unprotected": {
    dict: "anew-neg", word: "unprotected", stem: "unprotect",
    ant: [ "protected" ],
    avg: [ 4.09, 6.60 ], std: [ 2.77, 1.18 ], fq: 50
  },
  "unqualified": {
    dict: "anew-neg", word: "unqualified", stem: "unqualifi",
    ant: [ "competent" ],
    avg: [ 4.09, 6.05 ], std: [ 2.66, 2.06 ], fq: 22
  },
  "unreasonable": {
    dict: "anew-neg", word: "unreasonable", stem: "unreason",
    ant: [ "reasonable" ],
    avg: [ 3.00, 6.84 ], std: [ 2.12, 1.30 ], fq: 18
  },
  "unreliable": {
    dict: "anew-neg", word: "unreliable", stem: "unreli",
    ant: [ "reliable", "dependable" ],
    avg: [ 4.62, 7.13 ], std: [ 2.55, 1.41 ], fq: 72
  },
  "unresponsive": {
    dict: "anew-neg", word: "unresponsive", stem: "unrespons",
    ant: [ "responsive" ],
    avg: [ 4.90, 6.10 ], std: [ 2.57, 1.25 ], fq: 20
  },
  "unsafe": {
    dict: "anew-neg", word: "unsafe", stem: "unsaf",
    ant: [ "secure", "safe" ],
    avg: [ 3.48, 6.97 ], std: [ 2.60, 1.46 ], fq: 100
  },
  "unsanitary": {
    dict: "anew-neg", word: "unsanitary", stem: "unsanitari",
    ant: [ "sanitary" ],
    avg: [ 3.09, 6.33 ], std: [ 2.11, 1.91 ], fq: 22
  },
  "unselfish": {
    dict: "anew-neg", word: "unselfish", stem: "unselfish",
    ant: [ "selfish" ],
    avg: [ 5.50, 2.60 ], std: [ 2.62, 1.05 ], fq: 50
  },
  "unsuccessful": {
    dict: "anew-neg", word: "unsuccessful", stem: "unsuccess",
    ant: [ "successful" ],
    avg: [ 6.11, 8.16 ], std: [ 2.65, 1.08 ], fq: 50
  },
  "unsure": {
    dict: "anew-neg", word: "unsure", stem: "unsur",
    ant: [ "confident", "certain", "sure" ],
    avg: [ 4.81, 6.56 ], std: [ 2.48, 1.42 ], fq: 119
  },
  "unsympathetic": {
    dict: "anew-neg", word: "unsympathetic", stem: "unsympathet",
    ant: [ "sympathetic" ],
    avg: [ 3.29, 6.67 ], std: [ 2.22, 1.93 ], fq: 22
  },
  "untidy": {
    dict: "anew-neg", word: "untidy", stem: "untidi",
    ant: [ "tidy" ],
    avg: [ 2.86, 6.24 ], std: [ 1.59, 1.85 ], fq: 29
  },
  "untrained": {
    dict: "anew-neg", word: "untrained", stem: "untrain",
    ant: [ "trained" ],
    avg: [ 5.74, 5.86 ], std: [ 2.46, 1.50 ], fq: 50
  },
  "untroubled": {
    dict: "anew-neg", word: "untroubled", stem: "untroubl",
    ant: [ "troubled", "insecure" ],
    avg: [ 5.75, 2.89 ], std: [ 2.35, 1.29 ], fq: 100
  },
  "untrustworthy": {
    dict: "anew-neg", word: "untrustworthy", stem: "untrustworthi",
    ant: [ "trustworthy" ],
    avg: [ 4.22, 7.25 ], std: [ 2.37, 1.55 ], fq: 19
  },
  "unwanted": {
    dict: "anew-neg", word: "unwanted", stem: "unwant",
    ant: [ "wanted", "desirable" ],
    avg: [ 7.35, 6.11 ], std: [ 1.76, 1.72 ], fq: 100
  },
  "unwelcome": {
    dict: "anew-neg", word: "unwelcome", stem: "unwelcom",
    ant: [ "welcome" ],
    avg: [ 3.76, 7.27 ], std: [ 2.26, 1.88 ], fq: 21
  },
  "unwilling": {
    dict: "anew-neg", word: "unwilling", stem: "unwil",
    ant: [ "willing" ],
    avg: [ 2.76, 6.83 ], std: [ 2.05, 2.04 ], fq: 19
  },
  "unwind": {
    dict: "anew-neg", word: "unwind", stem: "unwind",
    ant: [ "tense", "strain" ],
    avg: [ 4.66, 3.17 ], std: [ 2.48, 1.59 ], fq: 82
  },
  "unworthy": {
    dict: "anew-neg", word: "unworthy", stem: "unworthi",
    ant: [ "worthy" ],
    avg: [ 7.35, 6.90 ], std: [ 1.76, 1.68 ], fq: 50
  },
  "uplifting": {
    dict: "anew-neg", word: "uplifting", stem: "uplift",
    ant: [ "depress" ],
    avg: [ 3.14, 2.47 ], std: [ 1.46, 2.01 ], fq: 20
  },
  "useful": {
    dict: "anew-neg", word: "useful", stem: "use",
    ant: [ "useless" ],
    avg: [ 4.87, 2.52 ], std: [ 2.58, 1.42 ], fq: 50
  },
  "useless": {
    dict: "anew-neg", word: "useless", stem: "useless",
    ant: [ "useful" ],
    avg: [ 4.26, 7.10 ], std: [ 2.47, 1.20 ], fq: 50
  },
  "valid": {
    dict: "anew-neg", word: "valid", stem: "valid",
    ant: [ "invalid" ],
    avg: [ 3.70, 3.52 ], std: [ 2.91, 1.60 ], fq: 22
  },
  "valuable": {
    dict: "anew-neg", word: "valuable", stem: "valuabl",
    ant: [ "worthless" ],
    avg: [ 5.38, 2.98 ], std: [ 2.23, 1.91 ], fq: 50
  },
  "value": {
    dict: "anew-neg", word: "value", stem: "valu",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "valued": {
    dict: "anew-neg", word: "valued", stem: "valu",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "values": {
    dict: "anew-neg", word: "values", stem: "valu",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "vegetation": {
    dict: "anew-neg", word: "vegetation", stem: "veget",
    ant: [ "fauna" ],
    avg: [ 3.25, 6.05 ], std: [ 2.31, 2.15 ], fq: 19
  },
  "victor": {
    dict: "anew-neg", word: "victor", stem: "victor",
    ant: [ "loser" ],
    avg: [ 4.95, 2.20 ], std: [ 2.57, 1.11 ], fq: 50
  },
  "victories": {
    dict: "anew-neg", word: "victories", stem: "victori",
    ant: [ "defeat" ],
    avg: [ 5.09, 3.20 ], std: [ 3.00, 1.95 ], fq: 50
  },
  "victory": {
    dict: "anew-neg", word: "victory", stem: "victori",
    ant: [ "defeat" ],
    avg: [ 5.09, 3.20 ], std: [ 3.00, 1.95 ], fq: 50
  },
  "violate": {
    dict: "anew-neg", word: "violate", stem: "violat",
    ant: [ "keep" ],
    avg: [ 5.53, 5.86 ], std: [ 2.90, 1.07 ], fq: 50
  },
  "violated": {
    dict: "anew-neg", word: "violated", stem: "violat",
    ant: [ "keep" ],
    avg: [ 5.53, 5.86 ], std: [ 2.90, 1.07 ], fq: 50
  },
  "violent": {
    dict: "anew-neg", word: "violent", stem: "violent",
    ant: [ "nonviolent" ],
    avg: [ 3.95, 6.84 ], std: [ 2.11, 1.30 ], fq: 19
  },
  "virtuous": {
    dict: "anew-neg", word: "virtuous", stem: "virtuou",
    ant: [ "wicked" ],
    avg: [ 6.09, 3.38 ], std: [ 2.44, 1.95 ], fq: 50
  },
  "vocal": {
    dict: "anew-neg", word: "vocal", stem: "vocal",
    ant: [ "instrumental" ],
    avg: [ 3.92, 6.76 ], std: [ 2.36, 1.45 ], fq: 23
  },
  "volume": {
    dict: "anew-neg", word: "volume", stem: "volum",
    ant: [ "softness" ],
    avg: [ 5.06, 6.75 ], std: [ 3.02, 1.97 ], fq: 19
  },
  "volumes": {
    dict: "anew-neg", word: "volumes", stem: "volum",
    ant: [ "softness" ],
    avg: [ 5.06, 6.75 ], std: [ 3.02, 1.97 ], fq: 19
  },
  "vulnerable": {
    dict: "anew-neg", word: "vulnerable", stem: "vulner",
    ant: [ "invulnerable" ],
    avg: [ 3.85, 6.05 ], std: [ 2.46, 2.01 ], fq: 20
  },
  "wake": {
    dict: "anew-neg", word: "wake", stem: "wake",
    ant: [ "sleep" ],
    avg: [ 2.80, 7.16 ], std: [ 2.66, 1.71 ], fq: 50
  },
  "wakes": {
    dict: "anew-neg", word: "wakes", stem: "wake",
    ant: [ "sleep" ],
    avg: [ 2.80, 7.16 ], std: [ 2.66, 1.71 ], fq: 50
  },
  "waking": {
    dict: "anew-neg", word: "waking", stem: "wake",
    ant: [ "sleeping", "sleep" ],
    avg: [ 2.80, 7.09 ], std: [ 2.66, 1.69 ], fq: 100
  },
  "walk": {
    dict: "anew-neg", word: "walk", stem: "walk",
    ant: [ "ride" ],
    avg: [ 5.87, 6.14 ], std: [ 2.56, 1.39 ], fq: 50
  },
  "wanted": {
    dict: "anew-neg", word: "wanted", stem: "want",
    ant: [ "unwanted" ],
    avg: [ 5.10, 2.71 ], std: [ 2.17, 1.55 ], fq: 20
  },
  "war": {
    dict: "anew-neg", word: "war", stem: "war",
    ant: [ "peace" ],
    avg: [ 2.95, 7.86 ], std: [ 2.55, 1.34 ], fq: 50
  },
  "warm": {
    dict: "anew-neg", word: "warm", stem: "warm",
    ant: [ "cool" ],
    avg: [ 3.43, 6.82 ], std: [ 2.31, 1.56 ], fq: 21
  },
  "wars": {
    dict: "anew-neg", word: "wars", stem: "war",
    ant: [ "peace" ],
    avg: [ 2.95, 7.86 ], std: [ 2.55, 1.34 ], fq: 50
  },
  "weak": {
    dict: "anew-neg", word: "weak", stem: "weak",
    ant: [ "strong" ],
    avg: [ 5.92, 7.06 ], std: [ 2.28, 1.52 ], fq: 50
  },
  "weaken": {
    dict: "anew-neg", word: "weaken", stem: "weaken",
    ant: [ "strengthen" ],
    avg: [ 4.70, 7.21 ], std: [ 2.52, 1.08 ], fq: 19
  },
  "weakness": {
    dict: "anew-neg", word: "weakness", stem: "weak",
    ant: [ "strength" ],
    avg: [ 5.30, 6.73 ], std: [ 2.83, 2.31 ], fq: 21
  },
  "wealth": {
    dict: "anew-neg", word: "wealth", stem: "wealth",
    ant: [ "poverty" ],
    avg: [ 4.87, 1.98 ], std: [ 2.66, 1.12 ], fq: 50
  },
  "wear": {
    dict: "anew-neg", word: "wear", stem: "wear",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "wearing": {
    dict: "anew-neg", word: "wearing", stem: "wear",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "wears": {
    dict: "anew-neg", word: "wears", stem: "wear",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "weary": {
    dict: "anew-neg", word: "weary", stem: "weari",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "weep": {
    dict: "anew-neg", word: "weep", stem: "weep",
    ant: [ "laugh" ],
    avg: [ 6.74, 8.22 ], std: [ 1.84, 1.37 ], fq: 50
  },
  "welcome": {
    dict: "anew-neg", word: "welcome", stem: "welcom",
    ant: [ "unwelcome" ],
    avg: [ 4.39, 3.50 ], std: [ 2.59, 1.96 ], fq: 21
  },
  "well": {
    dict: "anew-neg", word: "well", stem: "well",
    ant: [ "ill", "badly" ],
    avg: [ 4.71, 2.62 ], std: [ 2.24, 1.43 ], fq: 100
  },
  "wellness": {
    dict: "anew-neg", word: "wellness", stem: "well",
    ant: [ "illness" ],
    avg: [ 4.71, 2.00 ], std: [ 2.24, 1.18 ], fq: 50
  },
  "went": {
    dict: "anew-neg", word: "went", stem: "went",
    ant: [ "come", "malfunction", "stop" ],
    avg: [ 4.76, 4.36 ], std: [ 2.58, 1.29 ], fq: 120
  },
  "wet": {
    dict: "anew-neg", word: "wet", stem: "wet",
    ant: [ "dry" ],
    avg: [ 3.76, 4.64 ], std: [ 2.06, 1.26 ], fq: 50
  },
  "whisper": {
    dict: "anew-neg", word: "whisper", stem: "whisper",
    ant: [ "shout" ],
    avg: [ 6.83, 3.88 ], std: [ 2.70, 1.38 ], fq: 50
  },
  "white": {
    dict: "anew-neg", word: "white", stem: "white",
    ant: [ "black" ],
    avg: [ 4.61, 4.88 ], std: [ 2.24, 1.84 ], fq: 50
  },
  "whites": {
    dict: "anew-neg", word: "whites", stem: "white",
    ant: [ "black" ],
    avg: [ 4.61, 4.88 ], std: [ 2.24, 1.84 ], fq: 50
  },
  "whole": {
    dict: "anew-neg", word: "whole", stem: "whole",
    ant: [ "partly" ],
    avg: [ 3.82, 5.32 ], std: [ 2.24, 1.17 ], fq: 50
  },
  "wicked": {
    dict: "anew-neg", word: "wicked", stem: "wick",
    ant: [ "virtuous" ],
    avg: [ 5.10, 6.85 ], std: [ 2.25, 1.53 ], fq: 20
  },
  "wife": {
    dict: "anew-neg", word: "wife", stem: "wife",
    ant: [ "husband" ],
    avg: [ 4.38, 7.41 ], std: [ 2.89, 1.74 ], fq: 21
  },
  "wild": {
    dict: "anew-neg", word: "wild", stem: "wild",
    ant: [ "tame" ],
    avg: [ 3.80, 5.55 ], std: [ 2.13, 1.42 ], fq: 50
  },
  "willing": {
    dict: "anew-neg", word: "willing", stem: "will",
    ant: [ "unwilling" ],
    avg: [ 4.64, 3.25 ], std: [ 1.99, 1.41 ], fq: 21
  },
  "win": {
    dict: "anew-neg", word: "win", stem: "win",
    ant: [ "lose", "fail" ],
    avg: [ 6.34, 2.50 ], std: [ 2.55, 1.65 ], fq: 71
  },
  "wines": {
    dict: "anew-neg", word: "wines", stem: "wine",
    ant: [ "lose", "fail" ],
    avg: [ 6.34, 2.50 ], std: [ 2.55, 1.65 ], fq: 71
  },
  "winner": {
    dict: "anew-neg", word: "winner", stem: "winner",
    ant: [ "loser" ],
    avg: [ 4.95, 2.20 ], std: [ 2.57, 1.11 ], fq: 50
  },
  "winners": {
    dict: "anew-neg", word: "winners", stem: "winner",
    ant: [ "loser" ],
    avg: [ 4.95, 2.20 ], std: [ 2.57, 1.11 ], fq: 50
  },
  "winning": {
    dict: "anew-neg", word: "winning", stem: "win",
    ant: [ "lose", "fail" ],
    avg: [ 6.34, 2.50 ], std: [ 2.55, 1.65 ], fq: 71
  },
  "wins": {
    dict: "anew-neg", word: "wins", stem: "win",
    ant: [ "lose", "fail" ],
    avg: [ 6.34, 2.50 ], std: [ 2.55, 1.65 ], fq: 71
  },
  "wise": {
    dict: "anew-neg", word: "wise", stem: "wise",
    ant: [ "foolish" ],
    avg: [ 4.57, 3.00 ], std: [ 2.01, 1.33 ], fq: 20
  },
  "wish": {
    dict: "anew-neg", word: "wish", stem: "wish",
    ant: [ "begrudge" ],
    avg: [ 4.47, 3.95 ], std: [ 1.71, 1.59 ], fq: 20
  },
  "wished": {
    dict: "anew-neg", word: "wished", stem: "wish",
    ant: [ "begrudge" ],
    avg: [ 4.47, 3.95 ], std: [ 1.71, 1.59 ], fq: 20
  },
  "wishes": {
    dict: "anew-neg", word: "wishes", stem: "wish",
    ant: [ "begrudge" ],
    avg: [ 4.47, 3.95 ], std: [ 1.71, 1.59 ], fq: 20
  },
  "wishing": {
    dict: "anew-neg", word: "wishing", stem: "wish",
    ant: [ "begrudge" ],
    avg: [ 4.47, 3.95 ], std: [ 1.71, 1.59 ], fq: 20
  },
  "wives": {
    dict: "anew-neg", word: "wives", stem: "wive",
    ant: [ "husband" ],
    avg: [ 4.38, 7.41 ], std: [ 2.89, 1.74 ], fq: 21
  },
  "woke": {
    dict: "anew-neg", word: "woke", stem: "woke",
    ant: [ "sleep" ],
    avg: [ 2.80, 7.16 ], std: [ 2.66, 1.71 ], fq: 50
  },
  "woman": {
    dict: "anew-neg", word: "woman", stem: "woman",
    ant: [ "man" ],
    avg: [ 5.24, 5.90 ], std: [ 2.31, 1.40 ], fq: 50
  },
  "women": {
    dict: "anew-neg", word: "women", stem: "women",
    ant: [ "man" ],
    avg: [ 5.24, 5.90 ], std: [ 2.31, 1.40 ], fq: 50
  },
  "won": {
    dict: "anew-neg", word: "won", stem: "won",
    ant: [ "lose", "fail", "lost" ],
    avg: [ 6.17, 2.58 ], std: [ 2.57, 1.57 ], fq: 121
  },
  "wore": {
    dict: "anew-neg", word: "wore", stem: "wore",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "work": {
    dict: "anew-neg", word: "work", stem: "work",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "worked": {
    dict: "anew-neg", word: "worked", stem: "work",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "working": {
    dict: "anew-neg", word: "working", stem: "work",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "works": {
    dict: "anew-neg", word: "works", stem: "work",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "worn": {
    dict: "anew-neg", word: "worn", stem: "worn",
    ant: [ "refresh", "new" ],
    avg: [ 4.12, 6.74 ], std: [ 2.37, 1.37 ], fq: 71
  },
  "worried": {
    dict: "anew-neg", word: "worried", stem: "worri",
    ant: [ "reassure" ],
    avg: [ 3.70, 6.55 ], std: [ 2.40, 1.76 ], fq: 21
  },
  "worries": {
    dict: "anew-neg", word: "worries", stem: "worri",
    ant: [ "reassure" ],
    avg: [ 3.70, 6.55 ], std: [ 2.40, 1.76 ], fq: 21
  },
  "worry": {
    dict: "anew-neg", word: "worry", stem: "worri",
    ant: [ "reassure" ],
    avg: [ 3.70, 6.55 ], std: [ 2.40, 1.76 ], fq: 21
  },
  "worrying": {
    dict: "anew-neg", word: "worrying", stem: "worri",
    ant: [ "reassure" ],
    avg: [ 3.70, 6.55 ], std: [ 2.40, 1.76 ], fq: 21
  },
  "worse": {
    dict: "anew-neg", word: "worse", stem: "wors",
    ant: [ "better", "good" ],
    avg: [ 5.00, 7.09 ], std: [ 2.76, 1.37 ], fq: 100
  },
  "worst": {
    dict: "anew-neg", word: "worst", stem: "worst",
    ant: [ "best", "good" ],
    avg: [ 5.00, 7.19 ], std: [ 2.76, 1.58 ], fq: 100
  },
  "worthless": {
    dict: "anew-neg", word: "worthless", stem: "worthless",
    ant: [ "valuable" ],
    avg: [ 3.85, 7.17 ], std: [ 2.32, 1.42 ], fq: 19
  },
  "worthy": {
    dict: "anew-neg", word: "worthy", stem: "worthi",
    ant: [ "unworthy" ],
    avg: [ 4.24, 2.79 ], std: [ 2.47, 1.72 ], fq: 20
  },
  "wound": {
    dict: "anew-neg", word: "wound", stem: "wound",
    ant: [ "unwind" ],
    avg: [ 2.39, 6.02 ], std: [ 2.13, 1.85 ], fq: 50
  },
  "wrapped": {
    dict: "anew-neg", word: "wrapped", stem: "wrap",
    ant: [ "unwind" ],
    avg: [ 2.39, 6.02 ], std: [ 2.13, 1.85 ], fq: 50
  },
  "wrong": {
    dict: "anew-neg", word: "wrong", stem: "wrong",
    ant: [ "right", "correct" ],
    avg: [ 4.61, 6.68 ], std: [ 2.53, 1.88 ], fq: 69
  },
  "young": {
    dict: "anew-neg", word: "young", stem: "young",
    ant: [ "old" ],
    avg: [ 4.48, 3.19 ], std: [ 2.66, 1.94 ], fq: 21
  },
  "younger": {
    dict: "anew-neg", word: "younger", stem: "younger",
    ant: [ "old" ],
    avg: [ 4.48, 3.19 ], std: [ 2.66, 1.94 ], fq: 21
  }
};

var  anew_neg_stem = {
  "abil": {
    dict: "anew-neg-stem", word: "ability", stem: "abil",
    ant: [ "inability" ],
    avg: [ 3.50, 3.00 ], std: [ 2.28, 1.33 ], fq: 19
  },
  "abl": {
    dict: "anew-neg-stem", word: "able", stem: "abl",
    ant: [ "unable" ],
    avg: [ 3.61, 2.96 ], std: [ 2.48, 1.30 ], fq: 20
  },
  "abnorm": {
    dict: "anew-neg-stem", word: "abnormal", stem: "abnorm",
    ant: [ "normal" ],
    avg: [ 2.29, 6.17 ], std: [ 2.03, 2.07 ], fq: 19
  },
  "abolish": {
    dict: "anew-neg-stem", word: "abolish", stem: "abolish",
    ant: [ "establish" ],
    avg: [ 3.62, 5.90 ], std: [ 2.25, 1.52 ], fq: 50
  },
  "abund": {
    dict: "anew-neg-stem", word: "abundant", stem: "abund",
    ant: [ "scarce" ],
    avg: [ 3.90, 3.37 ], std: [ 2.49, 1.42 ], fq: 19
  },
  "accept": {
    dict: "anew-neg-stem", word: "acceptable", stem: "accept",
    ant: [ "unacceptable" ],
    avg: [ 4.43, 3.29 ], std: [ 2.66, 2.12 ], fq: 22
  },
  "accept": {
    dict: "anew-neg-stem", word: "accepted", stem: "accept",
    ant: [ "reject", "refuse" ],
    avg: [ 4.90, 3.28 ], std: [ 2.27, 1.40 ], fq: 72
  },
  "accept": {
    dict: "anew-neg-stem", word: "accept", stem: "accept",
    ant: [ "reject", "refuse" ],
    avg: [ 4.90, 3.28 ], std: [ 2.27, 1.40 ], fq: 72
  },
  "accept": {
    dict: "anew-neg-stem", word: "acceptance", stem: "accept",
    ant: [ "rejection" ],
    avg: [ 6.37, 2.02 ], std: [ 2.56, 1.33 ], fq: 50
  },
  "access": {
    dict: "anew-neg-stem", word: "accessible", stem: "access",
    ant: [ "inaccessible" ],
    avg: [ 4.05, 3.82 ], std: [ 2.29, 1.59 ], fq: 21
  },
  "acclaim": {
    dict: "anew-neg-stem", word: "acclaim", stem: "acclaim",
    ant: [ "boo" ],
    avg: [ 3.17, 3.74 ], std: [ 2.23, 1.76 ], fq: 50
  },
  "accord": {
    dict: "anew-neg-stem", word: "accord", stem: "accord",
    ant: [ "disagreement" ],
    avg: [ 3.91, 2.86 ], std: [ 2.54, 1.90 ], fq: 22
  },
  "accur": {
    dict: "anew-neg-stem", word: "accurate", stem: "accur",
    ant: [ "inaccurate" ],
    avg: [ 3.95, 3.35 ], std: [ 1.99, 1.35 ], fq: 20
  },
  "acknowledg": {
    dict: "anew-neg-stem", word: "acknowledge", stem: "acknowledg",
    ant: [ "deny" ],
    avg: [ 5.63, 3.81 ], std: [ 2.39, 1.72 ], fq: 20
  },
  "acquir": {
    dict: "anew-neg-stem", word: "acquire", stem: "acquir",
    ant: [ "lose" ],
    avg: [ 5.43, 3.59 ], std: [ 2.69, 2.09 ], fq: 21
  },
  "acquir": {
    dict: "anew-neg-stem", word: "acquired", stem: "acquir",
    ant: [ "lose" ],
    avg: [ 5.43, 3.59 ], std: [ 2.69, 2.09 ], fq: 21
  },
  "acquitt": {
    dict: "anew-neg-stem", word: "acquittal", stem: "acquitt",
    ant: [ "conviction" ],
    avg: [ 4.67, 3.89 ], std: [ 2.06, 1.57 ], fq: 18
  },
  "activ": {
    dict: "anew-neg-stem", word: "active", stem: "activ",
    ant: [ "passive", "quiet", "extinct" ],
    avg: [ 3.41, 4.20 ], std: [ 2.39, 1.66 ], fq: 119
  },
  "actual": {
    dict: "anew-neg-stem", word: "actual", stem: "actual",
    ant: [ "potential" ],
    avg: [ 4.09, 6.86 ], std: [ 2.50, 1.85 ], fq: 22
  },
  "admit": {
    dict: "anew-neg-stem", word: "admit", stem: "admit",
    ant: [ "deny", "reject", "exclude" ],
    avg: [ 5.05, 3.44 ], std: [ 2.18, 1.68 ], fq: 62
  },
  "admit": {
    dict: "anew-neg-stem", word: "admitted", stem: "admit",
    ant: [ "deny", "reject", "exclude" ],
    avg: [ 5.05, 3.44 ], std: [ 2.18, 1.68 ], fq: 62
  },
  "adult": {
    dict: "anew-neg-stem", word: "adult", stem: "adult",
    ant: [ "juvenile" ],
    avg: [ 3.85, 3.74 ], std: [ 2.25, 1.91 ], fq: 19
  },
  "adult": {
    dict: "anew-neg-stem", word: "adults", stem: "adult",
    ant: [ "juvenile" ],
    avg: [ 3.85, 3.74 ], std: [ 2.25, 1.91 ], fq: 19
  },
  "advanc": {
    dict: "anew-neg-stem", word: "advances", stem: "advanc",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "advanc": {
    dict: "anew-neg-stem", word: "advanced", stem: "advanc",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "advanc": {
    dict: "anew-neg-stem", word: "advance", stem: "advanc",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "advantag": {
    dict: "anew-neg-stem", word: "advantages", stem: "advantag",
    ant: [ "disadvantage", "penalty" ],
    avg: [ 4.41, 2.76 ], std: [ 2.03, 1.37 ], fq: 69
  },
  "advantag": {
    dict: "anew-neg-stem", word: "advantage", stem: "advantag",
    ant: [ "disadvantage", "penalty" ],
    avg: [ 4.41, 2.76 ], std: [ 2.03, 1.37 ], fq: 69
  },
  "afraid": {
    dict: "anew-neg-stem", word: "afraid", stem: "afraid",
    ant: [ "unafraid" ],
    avg: [ 3.38, 6.43 ], std: [ 2.32, 2.18 ], fq: 22
  },
  "aggrav": {
    dict: "anew-neg-stem", word: "aggravate", stem: "aggrav",
    ant: [ "better" ],
    avg: [ 4.60, 7.00 ], std: [ 2.67, 1.28 ], fq: 50
  },
  "agit": {
    dict: "anew-neg-stem", word: "agitate", stem: "agit",
    ant: [ "calm" ],
    avg: [ 2.82, 6.36 ], std: [ 2.13, 1.60 ], fq: 50
  },
  "agre": {
    dict: "anew-neg-stem", word: "agree", stem: "agre",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "agreeabl": {
    dict: "anew-neg-stem", word: "agreeable", stem: "agreeabl",
    ant: [ "disagreeable" ],
    avg: [ 4.26, 3.29 ], std: [ 2.60, 2.00 ], fq: 22
  },
  "agreement": {
    dict: "anew-neg-stem", word: "agreement", stem: "agreement",
    ant: [ "disagreement" ],
    avg: [ 3.91, 2.86 ], std: [ 2.54, 1.90 ], fq: 22
  },
  "agreement": {
    dict: "anew-neg-stem", word: "agreements", stem: "agreement",
    ant: [ "disagreement" ],
    avg: [ 3.91, 2.86 ], std: [ 2.54, 1.90 ], fq: 22
  },
  "alien": {
    dict: "anew-neg-stem", word: "alien", stem: "alien",
    ant: [ "citizen" ],
    avg: [ 2.63, 6.43 ], std: [ 2.22, 1.66 ], fq: 20
  },
  "aliv": {
    dict: "anew-neg-stem", word: "alive", stem: "aliv",
    ant: [ "dead" ],
    avg: [ 5.73, 2.00 ], std: [ 2.73, 1.32 ], fq: 50
  },
  "alli": {
    dict: "anew-neg-stem", word: "ally", stem: "alli",
    ant: [ "foe" ],
    avg: [ 4.71, 3.15 ], std: [ 2.85, 1.60 ], fq: 22
  },
  "alli": {
    dict: "anew-neg-stem", word: "allies", stem: "alli",
    ant: [ "foe" ],
    avg: [ 4.71, 3.15 ], std: [ 2.85, 1.60 ], fq: 22
  },
  "allow": {
    dict: "anew-neg-stem", word: "allowed", stem: "allow",
    ant: [ "forbid", "deny" ],
    avg: [ 5.25, 3.25 ], std: [ 2.48, 1.54 ], fq: 44
  },
  "allow": {
    dict: "anew-neg-stem", word: "allows", stem: "allow",
    ant: [ "forbid", "deny" ],
    avg: [ 5.25, 3.25 ], std: [ 2.48, 1.54 ], fq: 44
  },
  "allow": {
    dict: "anew-neg-stem", word: "allowing", stem: "allow",
    ant: [ "forbid", "deny" ],
    avg: [ 5.25, 3.25 ], std: [ 2.48, 1.54 ], fq: 44
  },
  "allow": {
    dict: "anew-neg-stem", word: "allow", stem: "allow",
    ant: [ "forbid", "deny" ],
    avg: [ 5.25, 3.25 ], std: [ 2.48, 1.54 ], fq: 44
  },
  "annul": {
    dict: "anew-neg-stem", word: "annul", stem: "annul",
    ant: [ "validate" ],
    avg: [ 4.05, 6.50 ], std: [ 1.88, 1.70 ], fq: 20
  },
  "answer": {
    dict: "anew-neg-stem", word: "answer", stem: "answer",
    ant: [ "question" ],
    avg: [ 5.00, 4.98 ], std: [ 2.23, 1.73 ], fq: 50
  },
  "answer": {
    dict: "anew-neg-stem", word: "answers", stem: "answer",
    ant: [ "question" ],
    avg: [ 5.00, 4.98 ], std: [ 2.23, 1.73 ], fq: 50
  },
  "appeal": {
    dict: "anew-neg-stem", word: "appeals", stem: "appeal",
    ant: [ "repel" ],
    avg: [ 4.43, 3.67 ], std: [ 2.25, 1.96 ], fq: 21
  },
  "appeal": {
    dict: "anew-neg-stem", word: "appeal", stem: "appeal",
    ant: [ "repel" ],
    avg: [ 4.43, 3.67 ], std: [ 2.25, 1.96 ], fq: 21
  },
  "appear": {
    dict: "anew-neg-stem", word: "appearance", stem: "appear",
    ant: [ "disappearance" ],
    avg: [ 4.95, 3.75 ], std: [ 2.25, 1.65 ], fq: 20
  },
  "applaud": {
    dict: "anew-neg-stem", word: "applaud", stem: "applaud",
    ant: [ "boo" ],
    avg: [ 3.17, 3.74 ], std: [ 2.23, 1.76 ], fq: 50
  },
  "appropri": {
    dict: "anew-neg-stem", word: "appropriate", stem: "appropri",
    ant: [ "inappropriate" ],
    avg: [ 4.95, 3.70 ], std: [ 2.55, 1.94 ], fq: 22
  },
  "approv": {
    dict: "anew-neg-stem", word: "approval", stem: "approv",
    ant: [ "disapproval" ],
    avg: [ 4.23, 3.40 ], std: [ 2.22, 1.82 ], fq: 21
  },
  "approv": {
    dict: "anew-neg-stem", word: "approve", stem: "approv",
    ant: [ "disapprove" ],
    avg: [ 3.81, 3.55 ], std: [ 2.40, 0.94 ], fq: 20
  },
  "aris": {
    dict: "anew-neg-stem", word: "arise", stem: "aris",
    ant: [ "fall" ],
    avg: [ 4.70, 4.04 ], std: [ 2.48, 1.97 ], fq: 50
  },
  "arm": {
    dict: "anew-neg-stem", word: "armed", stem: "arm",
    ant: [ "unarmed" ],
    avg: [ 3.64, 3.74 ], std: [ 1.97, 1.76 ], fq: 20
  },
  "arriv": {
    dict: "anew-neg-stem", word: "arrive", stem: "arriv",
    ant: [ "leave" ],
    avg: [ 3.82, 4.52 ], std: [ 2.24, 1.33 ], fq: 50
  },
  "artifici": {
    dict: "anew-neg-stem", word: "artificial", stem: "artifici",
    ant: [ "natural" ],
    avg: [ 4.37, 6.56 ], std: [ 2.51, 1.49 ], fq: 50
  },
  "ascend": {
    dict: "anew-neg-stem", word: "ascend", stem: "ascend",
    ant: [ "set" ],
    avg: [ 4.05, 5.58 ], std: [ 1.89, 1.20 ], fq: 50
  },
  "asleep": {
    dict: "anew-neg-stem", word: "asleep", stem: "asleep",
    ant: [ "awake" ],
    avg: [ 6.85, 5.74 ], std: [ 2.53, 1.47 ], fq: 50
  },
  "asset": {
    dict: "anew-neg-stem", word: "asset", stem: "asset",
    ant: [ "liability" ],
    avg: [ 4.58, 3.45 ], std: [ 2.04, 2.04 ], fq: 20
  },
  "assur": {
    dict: "anew-neg-stem", word: "assured", stem: "assur",
    ant: [ "worry" ],
    avg: [ 5.07, 2.82 ], std: [ 2.74, 1.71 ], fq: 50
  },
  "assur": {
    dict: "anew-neg-stem", word: "assure", stem: "assur",
    ant: [ "worry" ],
    avg: [ 5.07, 2.82 ], std: [ 2.74, 1.71 ], fq: 50
  },
  "attack": {
    dict: "anew-neg-stem", word: "attacked", stem: "attack",
    ant: [ "defend" ],
    avg: [ 5.85, 5.22 ], std: [ 3.15, 1.72 ], fq: 50
  },
  "attack": {
    dict: "anew-neg-stem", word: "attacks", stem: "attack",
    ant: [ "defend" ],
    avg: [ 5.85, 5.22 ], std: [ 3.15, 1.72 ], fq: 50
  },
  "attack": {
    dict: "anew-neg-stem", word: "attack", stem: "attack",
    ant: [ "defend" ],
    avg: [ 5.85, 5.22 ], std: [ 3.15, 1.72 ], fq: 50
  },
  "attract": {
    dict: "anew-neg-stem", word: "attract", stem: "attract",
    ant: [ "repel" ],
    avg: [ 4.43, 3.67 ], std: [ 2.25, 1.96 ], fq: 21
  },
  "attract": {
    dict: "anew-neg-stem", word: "attractive", stem: "attract",
    ant: [ "unattractive", "repulsive" ],
    avg: [ 4.74, 2.17 ], std: [ 2.28, 1.16 ], fq: 42
  },
  "audibl": {
    dict: "anew-neg-stem", word: "audible", stem: "audibl",
    ant: [ "inaudible" ],
    avg: [ 3.33, 3.61 ], std: [ 2.55, 1.58 ], fq: 21
  },
  "aunt": {
    dict: "anew-neg-stem", word: "aunt", stem: "aunt",
    ant: [ "uncle" ],
    avg: [ 4.05, 6.50 ], std: [ 2.33, 1.57 ], fq: 21
  },
  "aunti": {
    dict: "anew-neg-stem", word: "auntie", stem: "aunti",
    ant: [ "uncle" ],
    avg: [ 4.05, 6.50 ], std: [ 2.33, 1.57 ], fq: 21
  },
  "avail": {
    dict: "anew-neg-stem", word: "available", stem: "avail",
    ant: [ "unavailable" ],
    avg: [ 3.85, 3.52 ], std: [ 2.35, 1.89 ], fq: 20
  },
  "aw": {
    dict: "anew-neg-stem", word: "awful", stem: "aw",
    ant: [ "nice" ],
    avg: [ 4.38, 7.38 ], std: [ 2.69, 1.51 ], fq: 50
  },
  "awak": {
    dict: "anew-neg-stem", word: "awake", stem: "awak",
    ant: [ "asleep" ],
    avg: [ 2.00, 6.50 ], std: [ 2.43, 1.89 ], fq: 19
  },
  "awar": {
    dict: "anew-neg-stem", word: "aware", stem: "awar",
    ant: [ "unaware" ],
    avg: [ 4.10, 3.89 ], std: [ 2.00, 1.59 ], fq: 20
  },
  "awkward": {
    dict: "anew-neg-stem", word: "awkward", stem: "awkward",
    ant: [ "graceful" ],
    avg: [ 4.00, 6.95 ], std: [ 2.97, 1.05 ], fq: 20
  },
  "back": {
    dict: "anew-neg-stem", word: "back", stem: "back",
    ant: [ "front", "advance" ],
    avg: [ 6.39, 6.03 ], std: [ 2.17, 1.21 ], fq: 100
  },
  "back": {
    dict: "anew-neg-stem", word: "backed", stem: "back",
    ant: [ "advance", "front" ],
    avg: [ 6.39, 6.03 ], std: [ 2.17, 1.21 ], fq: 100
  },
  "back": {
    dict: "anew-neg-stem", word: "backs", stem: "back",
    ant: [ "front", "advance" ],
    avg: [ 6.39, 6.03 ], std: [ 2.17, 1.21 ], fq: 100
  },
  "bad": {
    dict: "anew-neg-stem", word: "bad", stem: "bad",
    ant: [ "good", "goodness" ],
    avg: [ 5.43, 7.40 ], std: [ 2.85, 1.42 ], fq: 100
  },
  "bad": {
    dict: "anew-neg-stem", word: "badness", stem: "bad",
    ant: [ "good", "goodness" ],
    avg: [ 5.43, 7.40 ], std: [ 2.85, 1.42 ], fq: 100
  },
  "badli": {
    dict: "anew-neg-stem", word: "badly", stem: "badli",
    ant: [ "well" ],
    avg: [ 5.43, 6.68 ], std: [ 2.85, 1.25 ], fq: 50
  },
  "balanc": {
    dict: "anew-neg-stem", word: "balance", stem: "balanc",
    ant: [ "imbalance" ],
    avg: [ 4.58, 3.90 ], std: [ 2.19, 1.92 ], fq: 20
  },
  "bank": {
    dict: "anew-neg-stem", word: "bank", stem: "bank",
    ant: [ "distrust" ],
    avg: [ 4.05, 2.95 ], std: [ 2.77, 2.28 ], fq: 20
  },
  "bank": {
    dict: "anew-neg-stem", word: "banks", stem: "bank",
    ant: [ "distrust" ],
    avg: [ 4.05, 2.95 ], std: [ 2.77, 2.28 ], fq: 20
  },
  "bank": {
    dict: "anew-neg-stem", word: "banking", stem: "bank",
    ant: [ "distrust" ],
    avg: [ 4.05, 2.95 ], std: [ 2.77, 2.28 ], fq: 20
  },
  "bare": {
    dict: "anew-neg-stem", word: "bare", stem: "bare",
    ant: [ "covered" ],
    avg: [ 5.28, 5.92 ], std: [ 2.51, 1.01 ], fq: 50
  },
  "bear": {
    dict: "anew-neg-stem", word: "bears", stem: "bear",
    ant: [ "bull" ],
    avg: [ 4.20, 4.62 ], std: [ 2.42, 1.31 ], fq: 50
  },
  "bear": {
    dict: "anew-neg-stem", word: "bear", stem: "bear",
    ant: [ "bull" ],
    avg: [ 4.20, 4.62 ], std: [ 2.42, 1.31 ], fq: 50
  },
  "beauti": {
    dict: "anew-neg-stem", word: "beauty", stem: "beauti",
    ant: [ "ugliness" ],
    avg: [ 4.43, 2.75 ], std: [ 2.52, 1.92 ], fq: 20
  },
  "beauti": {
    dict: "anew-neg-stem", word: "beautiful", stem: "beauti",
    ant: [ "ugly" ],
    avg: [ 5.38, 2.74 ], std: [ 2.23, 1.44 ], fq: 50
  },
  "begin": {
    dict: "anew-neg-stem", word: "begin", stem: "begin",
    ant: [ "end" ],
    avg: [ 4.59, 4.36 ], std: [ 3.07, 1.74 ], fq: 50
  },
  "begin": {
    dict: "anew-neg-stem", word: "beginning", stem: "begin",
    ant: [ "end", "finish" ],
    avg: [ 4.15, 5.36 ], std: [ 2.76, 1.78 ], fq: 71
  },
  "begrudg": {
    dict: "anew-neg-stem", word: "begrudge", stem: "begrudg",
    ant: [ "wish" ],
    avg: [ 5.16, 6.92 ], std: [ 2.62, 1.50 ], fq: 50
  },
  "behav": {
    dict: "anew-neg-stem", word: "behave", stem: "behav",
    ant: [ "misbehave" ],
    avg: [ 4.28, 3.79 ], std: [ 2.59, 1.55 ], fq: 18
  },
  "believ": {
    dict: "anew-neg-stem", word: "believable", stem: "believ",
    ant: [ "incredible" ],
    avg: [ 6.35, 7.59 ], std: [ 2.87, 2.11 ], fq: 21
  },
  "belittl": {
    dict: "anew-neg-stem", word: "belittle", stem: "belittl",
    ant: [ "flatter" ],
    avg: [ 4.61, 6.10 ], std: [ 2.83, 2.10 ], fq: 19
  },
  "bend": {
    dict: "anew-neg-stem", word: "bend", stem: "bend",
    ant: [ "straighten" ],
    avg: [ 3.00, 6.26 ], std: [ 2.30, 1.76 ], fq: 20
  },
  "bent": {
    dict: "anew-neg-stem", word: "bent", stem: "bent",
    ant: [ "straighten" ],
    avg: [ 3.00, 6.26 ], std: [ 2.30, 1.76 ], fq: 20
  },
  "best": {
    dict: "anew-neg-stem", word: "best", stem: "best",
    ant: [ "worst", "bad", "evil", "ill", "badly" ],
    avg: [ 5.44, 2.36 ], std: [ 2.31, 1.39 ], fq: 250
  },
  "better": {
    dict: "anew-neg-stem", word: "better", stem: "better",
    ant: [ "worse", "bad", "evil", "ill", "badly" ],
    avg: [ 5.44, 2.48 ], std: [ 2.31, 1.41 ], fq: 250
  },
  "big": {
    dict: "anew-neg-stem", word: "big", stem: "big",
    ant: [ "small" ],
    avg: [ 3.98, 4.52 ], std: [ 2.24, 1.36 ], fq: 50
  },
  "bigger": {
    dict: "anew-neg-stem", word: "bigger", stem: "bigger",
    ant: [ "small" ],
    avg: [ 3.98, 4.52 ], std: [ 2.24, 1.36 ], fq: 50
  },
  "biggest": {
    dict: "anew-neg-stem", word: "biggest", stem: "biggest",
    ant: [ "small" ],
    avg: [ 3.98, 4.52 ], std: [ 2.24, 1.36 ], fq: 50
  },
  "birth": {
    dict: "anew-neg-stem", word: "birth", stem: "birth",
    ant: [ "death" ],
    avg: [ 4.59, 1.54 ], std: [ 3.07, 1.28 ], fq: 50
  },
  "black": {
    dict: "anew-neg-stem", word: "black", stem: "black",
    ant: [ "white" ],
    avg: [ 4.37, 6.28 ], std: [ 2.14, 1.54 ], fq: 50
  },
  "black": {
    dict: "anew-neg-stem", word: "blacks", stem: "black",
    ant: [ "white" ],
    avg: [ 4.37, 6.28 ], std: [ 2.14, 1.54 ], fq: 50
  },
  "black": {
    dict: "anew-neg-stem", word: "blackness", stem: "black",
    ant: [ "white" ],
    avg: [ 4.37, 6.28 ], std: [ 2.14, 1.54 ], fq: 50
  },
  "bless": {
    dict: "anew-neg-stem", word: "blessing", stem: "bless",
    ant: [ "disapproval", "curse", "desecrate" ],
    avg: [ 4.53, 3.12 ], std: [ 2.46, 1.83 ], fq: 63
  },
  "bless": {
    dict: "anew-neg-stem", word: "blessed", stem: "bless",
    ant: [ "curse", "desecrate" ],
    avg: [ 4.70, 2.99 ], std: [ 2.58, 1.84 ], fq: 42
  },
  "bless": {
    dict: "anew-neg-stem", word: "bless", stem: "bless",
    ant: [ "curse", "desecrate" ],
    avg: [ 4.70, 2.99 ], std: [ 2.58, 1.84 ], fq: 42
  },
  "bless": {
    dict: "anew-neg-stem", word: "blessings", stem: "bless",
    ant: [ "disapproval", "curse", "desecrate" ],
    avg: [ 4.53, 3.12 ], std: [ 2.46, 1.83 ], fq: 63
  },
  "block": {
    dict: "anew-neg-stem", word: "block", stem: "block",
    ant: [ "free", "remember" ],
    avg: [ 3.91, 7.24 ], std: [ 2.53, 1.28 ], fq: 71
  },
  "block": {
    dict: "anew-neg-stem", word: "blocked", stem: "block",
    ant: [ "free", "remember" ],
    avg: [ 3.91, 7.24 ], std: [ 2.53, 1.28 ], fq: 71
  },
  "block": {
    dict: "anew-neg-stem", word: "blocks", stem: "block",
    ant: [ "free", "remember" ],
    avg: [ 3.91, 7.24 ], std: [ 2.53, 1.28 ], fq: 71
  },
  "bold": {
    dict: "anew-neg-stem", word: "bold", stem: "bold",
    ant: [ "timid" ],
    avg: [ 3.15, 3.37 ], std: [ 1.84, 1.95 ], fq: 19
  },
  "bomb": {
    dict: "anew-neg-stem", word: "bombing", stem: "bomb",
    ant: [ "pass" ],
    avg: [ 4.70, 5.90 ], std: [ 2.48, 1.43 ], fq: 50
  },
  "bomb": {
    dict: "anew-neg-stem", word: "bomb", stem: "bomb",
    ant: [ "pass" ],
    avg: [ 4.70, 5.90 ], std: [ 2.48, 1.43 ], fq: 50
  },
  "bomb": {
    dict: "anew-neg-stem", word: "bombs", stem: "bomb",
    ant: [ "pass" ],
    avg: [ 4.70, 5.90 ], std: [ 2.48, 1.43 ], fq: 50
  },
  "boo": {
    dict: "anew-neg-stem", word: "boo", stem: "boo",
    ant: [ "applaud" ],
    avg: [ 5.05, 6.70 ], std: [ 1.75, 1.17 ], fq: 19
  },
  "bore": {
    dict: "anew-neg-stem", word: "bored", stem: "bore",
    ant: [ "interest" ],
    avg: [ 5.66, 6.36 ], std: [ 2.26, 1.54 ], fq: 50
  },
  "bore": {
    dict: "anew-neg-stem", word: "bore", stem: "bore",
    ant: [ "interest" ],
    avg: [ 5.66, 6.36 ], std: [ 2.26, 1.54 ], fq: 50
  },
  "bore": {
    dict: "anew-neg-stem", word: "boring", stem: "bore",
    ant: [ "interest" ],
    avg: [ 5.66, 6.36 ], std: [ 2.26, 1.54 ], fq: 50
  },
  "bottom": {
    dict: "anew-neg-stem", word: "bottom", stem: "bottom",
    ant: [ "top", "side" ],
    avg: [ 4.69, 5.65 ], std: [ 2.36, 1.19 ], fq: 100
  },
  "bought": {
    dict: "anew-neg-stem", word: "bought", stem: "bought",
    ant: [ "sell" ],
    avg: [ 7.24, 5.48 ], std: [ 2.06, 1.13 ], fq: 50
  },
  "bounc": {
    dict: "anew-neg-stem", word: "bounce", stem: "bounc",
    ant: [ "clear" ],
    avg: [ 2.71, 6.14 ], std: [ 1.71, 1.70 ], fq: 21
  },
  "bound": {
    dict: "anew-neg-stem", word: "bound", stem: "bound",
    ant: [ "free" ],
    avg: [ 5.15, 7.96 ], std: [ 3.04, 1.26 ], fq: 50
  },
  "boy": {
    dict: "anew-neg-stem", word: "boy", stem: "boy",
    ant: [ "girl", "daughter" ],
    avg: [ 4.29, 7.02 ], std: [ 2.69, 1.52 ], fq: 100
  },
  "boy": {
    dict: "anew-neg-stem", word: "boys", stem: "boy",
    ant: [ "girl", "daughter" ],
    avg: [ 4.29, 7.02 ], std: [ 2.69, 1.52 ], fq: 100
  },
  "brave": {
    dict: "anew-neg-stem", word: "brave", stem: "brave",
    ant: [ "timid", "cowardly" ],
    avg: [ 4.12, 3.08 ], std: [ 1.89, 1.78 ], fq: 39
  },
  "braveri": {
    dict: "anew-neg-stem", word: "bravery", stem: "braveri",
    ant: [ "cowardice", "fear" ],
    avg: [ 5.27, 2.69 ], std: [ 2.24, 1.29 ], fq: 69
  },
  "breach": {
    dict: "anew-neg-stem", word: "breach", stem: "breach",
    ant: [ "keep" ],
    avg: [ 5.53, 5.86 ], std: [ 2.90, 1.07 ], fq: 50
  },
  "break": {
    dict: "anew-neg-stem", word: "break", stem: "break",
    ant: [ "repair", "keep", "make", "promote" ],
    avg: [ 5.44, 6.01 ], std: [ 2.60, 1.28 ], fq: 200
  },
  "break": {
    dict: "anew-neg-stem", word: "breaks", stem: "break",
    ant: [ "repair", "keep", "make", "promote" ],
    avg: [ 5.44, 6.01 ], std: [ 2.60, 1.28 ], fq: 200
  },
  "break": {
    dict: "anew-neg-stem", word: "breaking", stem: "break",
    ant: [ "repair", "keep", "make", "promote" ],
    avg: [ 5.44, 6.01 ], std: [ 2.60, 1.28 ], fq: 200
  },
  "bright": {
    dict: "anew-neg-stem", word: "bright", stem: "bright",
    ant: [ "dull" ],
    avg: [ 2.83, 3.24 ], std: [ 2.31, 1.22 ], fq: 50
  },
  "brighten": {
    dict: "anew-neg-stem", word: "brighten", stem: "brighten",
    ant: [ "overcast" ],
    avg: [ 3.46, 4.68 ], std: [ 1.92, 1.66 ], fq: 50
  },
  "brighter": {
    dict: "anew-neg-stem", word: "brighter", stem: "brighter",
    ant: [ "dull" ],
    avg: [ 2.83, 3.24 ], std: [ 2.31, 1.22 ], fq: 50
  },
  "broke": {
    dict: "anew-neg-stem", word: "broke", stem: "broke",
    ant: [ "repair", "keep", "make", "promote" ],
    avg: [ 5.44, 6.01 ], std: [ 2.60, 1.28 ], fq: 200
  },
  "broken": {
    dict: "anew-neg-stem", word: "broken", stem: "broken",
    ant: [ "repair", "keep", "make", "promote" ],
    avg: [ 5.44, 6.01 ], std: [ 2.60, 1.28 ], fq: 200
  },
  "brother": {
    dict: "anew-neg-stem", word: "brothers", stem: "brother",
    ant: [ "sister" ],
    avg: [ 5.53, 6.76 ], std: [ 2.80, 1.65 ], fq: 50
  },
  "brother": {
    dict: "anew-neg-stem", word: "brother", stem: "brother",
    ant: [ "sister" ],
    avg: [ 5.53, 6.76 ], std: [ 2.80, 1.65 ], fq: 50
  },
  "brunett": {
    dict: "anew-neg-stem", word: "brunette", stem: "brunett",
    ant: [ "blond" ],
    avg: [ 3.00, 6.08 ], std: [ 2.25, 1.95 ], fq: 29
  },
  "bull": {
    dict: "anew-neg-stem", word: "bull", stem: "bull",
    ant: [ "bear" ],
    avg: [ 5.40, 5.86 ], std: [ 2.70, 1.85 ], fq: 50
  },
  "bump": {
    dict: "anew-neg-stem", word: "bump", stem: "bump",
    ant: [ "promote" ],
    avg: [ 6.44, 6.92 ], std: [ 2.58, 1.07 ], fq: 50
  },
  "buri": {
    dict: "anew-neg-stem", word: "bury", stem: "buri",
    ant: [ "remember" ],
    avg: [ 3.14, 6.50 ], std: [ 1.88, 1.30 ], fq: 21
  },
  "bust": {
    dict: "anew-neg-stem", word: "busted", stem: "bust",
    ant: [ "repair" ],
    avg: [ 5.86, 4.76 ], std: [ 2.70, 1.82 ], fq: 50
  },
  "buy": {
    dict: "anew-neg-stem", word: "buying", stem: "buy",
    ant: [ "sell" ],
    avg: [ 7.24, 5.48 ], std: [ 2.06, 1.13 ], fq: 50
  },
  "buy": {
    dict: "anew-neg-stem", word: "buy", stem: "buy",
    ant: [ "sell" ],
    avg: [ 7.24, 5.48 ], std: [ 2.06, 1.13 ], fq: 50
  },
  "calm": {
    dict: "anew-neg-stem", word: "calm", stem: "calm",
    ant: [ "agitate", "stimulate" ],
    avg: [ 5.91, 5.46 ], std: [ 2.66, 1.61 ], fq: 41
  },
  "came": {
    dict: "anew-neg-stem", word: "came", stem: "came",
    ant: [ "go", "leave" ],
    avg: [ 5.74, 5.06 ], std: [ 2.09, 1.26 ], fq: 100
  },
  "can": {
    dict: "anew-neg-stem", word: "can", stem: "can",
    ant: [ "hire" ],
    avg: [ 6.77, 6.50 ], std: [ 2.07, 1.34 ], fq: 50
  },
  "capabl": {
    dict: "anew-neg-stem", word: "capable", stem: "capabl",
    ant: [ "incapable" ],
    avg: [ 3.90, 3.55 ], std: [ 2.49, 1.50 ], fq: 21
  },
  "capit": {
    dict: "anew-neg-stem", word: "capitalism", stem: "capit",
    ant: [ "socialism" ],
    avg: [ 4.98, 4.96 ], std: [ 2.59, 2.27 ], fq: 50
  },
  "care": {
    dict: "anew-neg-stem", word: "careful", stem: "care",
    ant: [ "careless" ],
    avg: [ 4.27, 3.53 ], std: [ 2.03, 1.81 ], fq: 20
  },
  "careless": {
    dict: "anew-neg-stem", word: "careless", stem: "careless",
    ant: [ "careful" ],
    avg: [ 2.95, 6.32 ], std: [ 1.99, 1.78 ], fq: 21
  },
  "cautiou": {
    dict: "anew-neg-stem", word: "cautious", stem: "cautiou",
    ant: [ "brave" ],
    avg: [ 6.15, 7.02 ], std: [ 2.45, 1.29 ], fq: 50
  },
  "ceas": {
    dict: "anew-neg-stem", word: "cease", stem: "ceas",
    ant: [ "begin" ],
    avg: [ 2.85, 6.44 ], std: [ 2.23, 2.04 ], fq: 19
  },
  "center": {
    dict: "anew-neg-stem", word: "center", stem: "center",
    ant: [ "left" ],
    avg: [ 4.27, 4.64 ], std: [ 2.46, 1.44 ], fq: 50
  },
  "certain": {
    dict: "anew-neg-stem", word: "certain", stem: "certain",
    ant: [ "uncertain", "unsure" ],
    avg: [ 4.50, 3.49 ], std: [ 2.00, 1.39 ], fq: 41
  },
  "certainti": {
    dict: "anew-neg-stem", word: "certainty", stem: "certainti",
    ant: [ "uncertainty" ],
    avg: [ 5.27, 3.30 ], std: [ 2.53, 1.69 ], fq: 22
  },
  "charg": {
    dict: "anew-neg-stem", word: "charge", stem: "charg",
    ant: [ "discharge", "calm" ],
    avg: [ 5.03, 5.26 ], std: [ 2.10, 1.69 ], fq: 100
  },
  "charg": {
    dict: "anew-neg-stem", word: "charges", stem: "charg",
    ant: [ "discharge", "calm" ],
    avg: [ 5.03, 5.26 ], std: [ 2.10, 1.69 ], fq: 100
  },
  "charg": {
    dict: "anew-neg-stem", word: "charged", stem: "charg",
    ant: [ "discharge", "calm" ],
    avg: [ 5.03, 5.26 ], std: [ 2.10, 1.69 ], fq: 100
  },
  "check": {
    dict: "anew-neg-stem", word: "checks", stem: "check",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "check": {
    dict: "anew-neg-stem", word: "check", stem: "check",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "check": {
    dict: "anew-neg-stem", word: "checked", stem: "check",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "check": {
    dict: "anew-neg-stem", word: "checking", stem: "check",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "cheer": {
    dict: "anew-neg-stem", word: "cheers", stem: "cheer",
    ant: [ "complain" ],
    avg: [ 3.52, 3.16 ], std: [ 2.05, 1.56 ], fq: 50
  },
  "cheer": {
    dict: "anew-neg-stem", word: "cheer", stem: "cheer",
    ant: [ "complain" ],
    avg: [ 3.52, 3.16 ], std: [ 2.05, 1.56 ], fq: 50
  },
  "cheer": {
    dict: "anew-neg-stem", word: "cheerful", stem: "cheer",
    ant: [ "depressing" ],
    avg: [ 4.54, 1.90 ], std: [ 3.19, 1.22 ], fq: 50
  },
  "child": {
    dict: "anew-neg-stem", word: "child", stem: "child",
    ant: [ "parent" ],
    avg: [ 4.14, 6.73 ], std: [ 2.63, 1.91 ], fq: 21
  },
  "children": {
    dict: "anew-neg-stem", word: "children", stem: "children",
    ant: [ "parent" ],
    avg: [ 4.14, 6.73 ], std: [ 2.63, 1.91 ], fq: 21
  },
  "chill": {
    dict: "anew-neg-stem", word: "chill", stem: "chill",
    ant: [ "heat" ],
    avg: [ 7.26, 4.16 ], std: [ 2.57, 1.82 ], fq: 50
  },
  "chill": {
    dict: "anew-neg-stem", word: "chills", stem: "chill",
    ant: [ "heat" ],
    avg: [ 7.26, 4.16 ], std: [ 2.57, 1.82 ], fq: 50
  },
  "claim": {
    dict: "anew-neg-stem", word: "claims", stem: "claim",
    ant: [ "forfeit" ],
    avg: [ 4.74, 3.68 ], std: [ 2.65, 1.57 ], fq: 21
  },
  "claim": {
    dict: "anew-neg-stem", word: "claim", stem: "claim",
    ant: [ "forfeit" ],
    avg: [ 4.74, 3.68 ], std: [ 2.65, 1.57 ], fq: 21
  },
  "claim": {
    dict: "anew-neg-stem", word: "claimed", stem: "claim",
    ant: [ "forfeit" ],
    avg: [ 4.74, 3.68 ], std: [ 2.65, 1.57 ], fq: 21
  },
  "clap": {
    dict: "anew-neg-stem", word: "clap", stem: "clap",
    ant: [ "boo" ],
    avg: [ 3.17, 3.74 ], std: [ 2.23, 1.76 ], fq: 50
  },
  "clean": {
    dict: "anew-neg-stem", word: "clean", stem: "clean",
    ant: [ "dirty", "unclean" ],
    avg: [ 4.52, 3.08 ], std: [ 2.43, 1.62 ], fq: 72
  },
  "clear": {
    dict: "anew-neg-stem", word: "clear", stem: "clear",
    ant: [ "clutter", "overcast", "bounce", "convict", "unclear", "cloudy" ],
    avg: [ 4.29, 4.30 ], std: [ 2.21, 1.65 ], fq: 212
  },
  "close": {
    dict: "anew-neg-stem", word: "closeness", stem: "close",
    ant: [ "openness" ],
    avg: [ 4.37, 6.52 ], std: [ 2.69, 2.42 ], fq: 20
  },
  "cloth": {
    dict: "anew-neg-stem", word: "clothes", stem: "cloth",
    ant: [ "undress" ],
    avg: [ 5.96, 6.14 ], std: [ 2.77, 1.74 ], fq: 22
  },
  "cloth": {
    dict: "anew-neg-stem", word: "clothing", stem: "cloth",
    ant: [ "undress" ],
    avg: [ 5.96, 6.14 ], std: [ 2.77, 1.74 ], fq: 22
  },
  "cloudi": {
    dict: "anew-neg-stem", word: "cloudy", stem: "cloudi",
    ant: [ "clear" ],
    avg: [ 2.71, 6.14 ], std: [ 1.71, 1.70 ], fq: 21
  },
  "coars": {
    dict: "anew-neg-stem", word: "coarse", stem: "coars",
    ant: [ "fine" ],
    avg: [ 3.86, 6.50 ], std: [ 2.43, 1.41 ], fq: 21
  },
  "cold": {
    dict: "anew-neg-stem", word: "cold", stem: "cold",
    ant: [ "hot" ],
    avg: [ 4.10, 5.02 ], std: [ 2.34, 1.92 ], fq: 50
  },
  "colder": {
    dict: "anew-neg-stem", word: "colder", stem: "colder",
    ant: [ "hot" ],
    avg: [ 4.10, 5.02 ], std: [ 2.34, 1.92 ], fq: 50
  },
  "come": {
    dict: "anew-neg-stem", word: "come", stem: "come",
    ant: [ "go", "leave" ],
    avg: [ 5.74, 5.06 ], std: [ 2.09, 1.26 ], fq: 100
  },
  "come": {
    dict: "anew-neg-stem", word: "comes", stem: "come",
    ant: [ "go", "leave" ],
    avg: [ 5.74, 5.06 ], std: [ 2.09, 1.26 ], fq: 100
  },
  "come": {
    dict: "anew-neg-stem", word: "coming", stem: "come",
    ant: [ "go", "leave" ],
    avg: [ 5.74, 5.06 ], std: [ 2.09, 1.26 ], fq: 100
  },
  "comedi": {
    dict: "anew-neg-stem", word: "comedy", stem: "comedi",
    ant: [ "tragedy" ],
    avg: [ 6.24, 2.06 ], std: [ 2.64, 1.38 ], fq: 50
  },
  "comfi": {
    dict: "anew-neg-stem", word: "comfy", stem: "comfi",
    ant: [ "uncomfortable" ],
    avg: [ 5.50, 2.70 ], std: [ 2.21, 1.56 ], fq: 22
  },
  "comfort": {
    dict: "anew-neg-stem", word: "comfort", stem: "comfort",
    ant: [ "discomfort" ],
    avg: [ 4.43, 2.84 ], std: [ 2.42, 0.83 ], fq: 30
  },
  "comfort": {
    dict: "anew-neg-stem", word: "comfortable", stem: "comfort",
    ant: [ "uncomfortable" ],
    avg: [ 5.50, 2.70 ], std: [ 2.21, 1.56 ], fq: 22
  },
  "commend": {
    dict: "anew-neg-stem", word: "commendation", stem: "commend",
    ant: [ "disapproval" ],
    avg: [ 4.23, 3.40 ], std: [ 2.22, 1.82 ], fq: 21
  },
  "common": {
    dict: "anew-neg-stem", word: "common", stem: "common",
    ant: [ "individual" ],
    avg: [ 4.19, 5.72 ], std: [ 2.45, 1.37 ], fq: 50
  },
  "compat": {
    dict: "anew-neg-stem", word: "compatible", stem: "compat",
    ant: [ "incompatible" ],
    avg: [ 3.61, 3.20 ], std: [ 2.79, 1.11 ], fq: 19
  },
  "compens": {
    dict: "anew-neg-stem", word: "compensate", stem: "compens",
    ant: [ "wrong" ],
    avg: [ 5.57, 3.14 ], std: [ 2.26, 0.97 ], fq: 50
  },
  "compet": {
    dict: "anew-neg-stem", word: "competent", stem: "compet",
    ant: [ "incompetent" ],
    avg: [ 4.50, 2.77 ], std: [ 1.98, 2.14 ], fq: 20
  },
  "compet": {
    dict: "anew-neg-stem", word: "competence", stem: "compet",
    ant: [ "incompetence" ],
    avg: [ 5.17, 2.26 ], std: [ 2.75, 1.19 ], fq: 18
  },
  "competit": {
    dict: "anew-neg-stem", word: "competition", stem: "competit",
    ant: [ "cooperation" ],
    avg: [ 3.32, 6.62 ], std: [ 2.29, 1.60 ], fq: 23
  },
  "complain": {
    dict: "anew-neg-stem", word: "complaining", stem: "complain",
    ant: [ "cheer" ],
    avg: [ 6.12, 7.46 ], std: [ 2.45, 1.68 ], fq: 50
  },
  "complain": {
    dict: "anew-neg-stem", word: "complained", stem: "complain",
    ant: [ "cheer" ],
    avg: [ 6.12, 7.46 ], std: [ 2.45, 1.68 ], fq: 50
  },
  "complain": {
    dict: "anew-neg-stem", word: "complain", stem: "complain",
    ant: [ "cheer" ],
    avg: [ 6.12, 7.46 ], std: [ 2.45, 1.68 ], fq: 50
  },
  "complet": {
    dict: "anew-neg-stem", word: "complete", stem: "complet",
    ant: [ "incomplete" ],
    avg: [ 4.12, 3.55 ], std: [ 2.19, 1.64 ], fq: 22
  },
  "complic": {
    dict: "anew-neg-stem", word: "complicated", stem: "complic",
    ant: [ "simplify" ],
    avg: [ 3.10, 6.35 ], std: [ 2.59, 1.35 ], fq: 20
  },
  "complic": {
    dict: "anew-neg-stem", word: "complicate", stem: "complic",
    ant: [ "simplify" ],
    avg: [ 3.10, 6.35 ], std: [ 2.59, 1.35 ], fq: 20
  },
  "con": {
    dict: "anew-neg-stem", word: "con", stem: "con",
    ant: [ "pro" ],
    avg: [ 3.81, 6.36 ], std: [ 2.46, 1.71 ], fq: 21
  },
  "conceal": {
    dict: "anew-neg-stem", word: "conceal", stem: "conceal",
    ant: [ "show" ],
    avg: [ 5.12, 6.24 ], std: [ 2.39, 1.49 ], fq: 50
  },
  "concentr": {
    dict: "anew-neg-stem", word: "concentrated", stem: "concentr",
    ant: [ "soft" ],
    avg: [ 4.63, 6.48 ], std: [ 2.61, 1.22 ], fq: 50
  },
  "condemn": {
    dict: "anew-neg-stem", word: "condemnation", stem: "condemn",
    ant: [ "acquittal" ],
    avg: [ 4.95, 6.19 ], std: [ 2.31, 1.72 ], fq: 20
  },
  "confin": {
    dict: "anew-neg-stem", word: "confined", stem: "confin",
    ant: [ "free", "invasive" ],
    avg: [ 5.81, 5.92 ], std: [ 2.65, 1.52 ], fq: 69
  },
  "confin": {
    dict: "anew-neg-stem", word: "confine", stem: "confin",
    ant: [ "free" ],
    avg: [ 5.15, 7.96 ], std: [ 3.04, 1.26 ], fq: 50
  },
  "connect": {
    dict: "anew-neg-stem", word: "connect", stem: "connect",
    ant: [ "disconnect" ],
    avg: [ 3.12, 3.81 ], std: [ 2.49, 1.29 ], fq: 22
  },
  "connect": {
    dict: "anew-neg-stem", word: "connected", stem: "connect",
    ant: [ "disconnect" ],
    avg: [ 3.12, 3.81 ], std: [ 2.49, 1.29 ], fq: 22
  },
  "consciou": {
    dict: "anew-neg-stem", word: "conscious", stem: "consciou",
    ant: [ "unconscious" ],
    avg: [ 4.55, 3.81 ], std: [ 2.44, 1.72 ], fq: 21
  },
  "consent": {
    dict: "anew-neg-stem", word: "consent", stem: "consent",
    ant: [ "refuse" ],
    avg: [ 5.04, 3.46 ], std: [ 2.50, 0.93 ], fq: 50
  },
  "consider": {
    dict: "anew-neg-stem", word: "considerate", stem: "consider",
    ant: [ "inconsiderate" ],
    avg: [ 5.05, 2.58 ], std: [ 2.48, 1.46 ], fq: 20
  },
  "consist": {
    dict: "anew-neg-stem", word: "consistent", stem: "consist",
    ant: [ "inconsistent", "incoherent" ],
    avg: [ 3.08, 3.57 ], std: [ 1.97, 1.16 ], fq: 41
  },
  "construct": {
    dict: "anew-neg-stem", word: "construct", stem: "construct",
    ant: [ "misconception" ],
    avg: [ 3.45, 3.65 ], std: [ 2.24, 0.81 ], fq: 20
  },
  "content": {
    dict: "anew-neg-stem", word: "content", stem: "content",
    ant: [ "discontent" ],
    avg: [ 4.67, 2.75 ], std: [ 2.93, 1.12 ], fq: 19
  },
  "content": {
    dict: "anew-neg-stem", word: "contents", stem: "content",
    ant: [ "discontent" ],
    avg: [ 4.67, 2.75 ], std: [ 2.93, 1.12 ], fq: 19
  },
  "conveni": {
    dict: "anew-neg-stem", word: "convenience", stem: "conveni",
    ant: [ "inconvenience" ],
    avg: [ 6.26, 3.05 ], std: [ 2.66, 1.23 ], fq: 19
  },
  "conveni": {
    dict: "anew-neg-stem", word: "convenient", stem: "conveni",
    ant: [ "inconvenient" ],
    avg: [ 4.83, 2.73 ], std: [ 2.57, 1.16 ], fq: 22
  },
  "convict": {
    dict: "anew-neg-stem", word: "conviction", stem: "convict",
    ant: [ "acquittal" ],
    avg: [ 4.95, 6.19 ], std: [ 2.31, 1.72 ], fq: 20
  },
  "cook": {
    dict: "anew-neg-stem", word: "cooked", stem: "cook",
    ant: [ "raw" ],
    avg: [ 5.00, 4.24 ], std: [ 2.32, 1.29 ], fq: 50
  },
  "cool": {
    dict: "anew-neg-stem", word: "cool", stem: "cool",
    ant: [ "heat", "warm" ],
    avg: [ 6.85, 5.45 ], std: [ 2.21, 1.81 ], fq: 100
  },
  "cooler": {
    dict: "anew-neg-stem", word: "cooler", stem: "cooler",
    ant: [ "warm" ],
    avg: [ 6.57, 6.72 ], std: [ 1.78, 1.80 ], fq: 50
  },
  "cooper": {
    dict: "anew-neg-stem", word: "cooperation", stem: "cooper",
    ant: [ "competition" ],
    avg: [ 4.32, 5.64 ], std: [ 2.14, 1.70 ], fq: 50
  },
  "cooper": {
    dict: "anew-neg-stem", word: "cooperative", stem: "cooper",
    ant: [ "uncooperative" ],
    avg: [ 4.80, 2.86 ], std: [ 2.31, 1.46 ], fq: 20
  },
  "correct": {
    dict: "anew-neg-stem", word: "correct", stem: "correct",
    ant: [ "wrong", "incorrect" ],
    avg: [ 4.55, 3.12 ], std: [ 2.16, 1.17 ], fq: 74
  },
  "corrupt": {
    dict: "anew-neg-stem", word: "corrupt", stem: "corrupt",
    ant: [ "straight" ],
    avg: [ 3.18, 6.06 ], std: [ 1.76, 1.06 ], fq: 50
  },
  "counterfeit": {
    dict: "anew-neg-stem", word: "counterfeit", stem: "counterfeit",
    ant: [ "genuine" ],
    avg: [ 4.27, 7.11 ], std: [ 2.16, 1.85 ], fq: 20
  },
  "courag": {
    dict: "anew-neg-stem", word: "courageous", stem: "courag",
    ant: [ "cowardly" ],
    avg: [ 5.14, 2.85 ], std: [ 1.93, 1.60 ], fq: 20
  },
  "courag": {
    dict: "anew-neg-stem", word: "courage", stem: "courag",
    ant: [ "cowardice" ],
    avg: [ 4.25, 3.05 ], std: [ 2.20, 1.27 ], fq: 19
  },
  "cover": {
    dict: "anew-neg-stem", word: "covered", stem: "cover",
    ant: [ "bare" ],
    avg: [ 5.80, 5.12 ], std: [ 2.80, 1.72 ], fq: 50
  },
  "cowardic": {
    dict: "anew-neg-stem", word: "cowardice", stem: "cowardic",
    ant: [ "courage" ],
    avg: [ 6.15, 7.46 ], std: [ 2.45, 1.18 ], fq: 50
  },
  "cowardli": {
    dict: "anew-neg-stem", word: "cowardly", stem: "cowardli",
    ant: [ "brave" ],
    avg: [ 6.15, 7.02 ], std: [ 2.45, 1.29 ], fq: 50
  },
  "credibl": {
    dict: "anew-neg-stem", word: "credible", stem: "credibl",
    ant: [ "incredible" ],
    avg: [ 6.35, 7.59 ], std: [ 2.87, 2.11 ], fq: 21
  },
  "cri": {
    dict: "anew-neg-stem", word: "cry", stem: "cri",
    ant: [ "laugh" ],
    avg: [ 6.74, 8.22 ], std: [ 1.84, 1.37 ], fq: 50
  },
  "cri": {
    dict: "anew-neg-stem", word: "crying", stem: "cri",
    ant: [ "laugh" ],
    avg: [ 6.74, 8.22 ], std: [ 1.84, 1.37 ], fq: 50
  },
  "cri": {
    dict: "anew-neg-stem", word: "cried", stem: "cri",
    ant: [ "laugh" ],
    avg: [ 6.74, 8.22 ], std: [ 1.84, 1.37 ], fq: 50
  },
  "cri": {
    dict: "anew-neg-stem", word: "cries", stem: "cri",
    ant: [ "laugh" ],
    avg: [ 6.74, 8.22 ], std: [ 1.84, 1.37 ], fq: 50
  },
  "critic": {
    dict: "anew-neg-stem", word: "criticize", stem: "critic",
    ant: [ "praise" ],
    avg: [ 5.45, 7.65 ], std: [ 2.04, 1.31 ], fq: 20
  },
  "crook": {
    dict: "anew-neg-stem", word: "crooked", stem: "crook",
    ant: [ "straight" ],
    avg: [ 3.18, 6.06 ], std: [ 1.76, 1.06 ], fq: 50
  },
  "crude": {
    dict: "anew-neg-stem", word: "crude", stem: "crude",
    ant: [ "refined" ],
    avg: [ 3.95, 6.11 ], std: [ 2.19, 1.94 ], fq: 20
  },
  "curs": {
    dict: "anew-neg-stem", word: "curse", stem: "curs",
    ant: [ "bless", "communicate" ],
    avg: [ 3.91, 6.64 ], std: [ 2.48, 1.79 ], fq: 68
  },
  "damn": {
    dict: "anew-neg-stem", word: "damned", stem: "damn",
    ant: [ "bless" ],
    avg: [ 4.05, 7.08 ], std: [ 2.59, 1.97 ], fq: 50
  },
  "damn": {
    dict: "anew-neg-stem", word: "damn", stem: "damn",
    ant: [ "bless" ],
    avg: [ 4.05, 7.08 ], std: [ 2.59, 1.97 ], fq: 50
  },
  "danger": {
    dict: "anew-neg-stem", word: "danger", stem: "danger",
    ant: [ "safety" ],
    avg: [ 3.86, 6.18 ], std: [ 2.72, 1.73 ], fq: 50
  },
  "danger": {
    dict: "anew-neg-stem", word: "dangerous", stem: "danger",
    ant: [ "safe" ],
    avg: [ 3.86, 7.04 ], std: [ 2.72, 1.62 ], fq: 50
  },
  "dark": {
    dict: "anew-neg-stem", word: "dark", stem: "dark",
    ant: [ "light", "day" ],
    avg: [ 5.10, 6.32 ], std: [ 2.42, 1.44 ], fq: 100
  },
  "dark": {
    dict: "anew-neg-stem", word: "darkness", stem: "dark",
    ant: [ "light", "lightness" ],
    avg: [ 4.97, 6.38 ], std: [ 2.47, 1.51 ], fq: 68
  },
  "darken": {
    dict: "anew-neg-stem", word: "darkened", stem: "darken",
    ant: [ "lighten", "brighten" ],
    avg: [ 4.04, 6.86 ], std: [ 2.28, 1.63 ], fq: 40
  },
  "darker": {
    dict: "anew-neg-stem", word: "darker", stem: "darker",
    ant: [ "light" ],
    avg: [ 5.40, 6.40 ], std: [ 2.33, 1.51 ], fq: 50
  },
  "darkest": {
    dict: "anew-neg-stem", word: "darkest", stem: "darkest",
    ant: [ "light" ],
    avg: [ 5.40, 6.40 ], std: [ 2.33, 1.51 ], fq: 50
  },
  "daughter": {
    dict: "anew-neg-stem", word: "daughter", stem: "daughter",
    ant: [ "son", "boy" ],
    avg: [ 4.58, 6.61 ], std: [ 2.37, 1.57 ], fq: 100
  },
  "daughter": {
    dict: "anew-neg-stem", word: "daughters", stem: "daughter",
    ant: [ "son", "boy" ],
    avg: [ 4.58, 6.61 ], std: [ 2.37, 1.57 ], fq: 100
  },
  "dawn": {
    dict: "anew-neg-stem", word: "dawn", stem: "dawn",
    ant: [ "sunset" ],
    avg: [ 4.20, 7.16 ], std: [ 2.99, 2.11 ], fq: 50
  },
  "dawn": {
    dict: "anew-neg-stem", word: "dawning", stem: "dawn",
    ant: [ "sunset" ],
    avg: [ 4.20, 7.16 ], std: [ 2.99, 2.11 ], fq: 50
  },
  "day": {
    dict: "anew-neg-stem", word: "days", stem: "day",
    ant: [ "night" ],
    avg: [ 4.28, 6.22 ], std: [ 2.21, 1.30 ], fq: 50
  },
  "day": {
    dict: "anew-neg-stem", word: "day", stem: "day",
    ant: [ "night" ],
    avg: [ 4.28, 6.22 ], std: [ 2.21, 1.30 ], fq: 50
  },
  "daybreak": {
    dict: "anew-neg-stem", word: "daybreak", stem: "daybreak",
    ant: [ "sunset" ],
    avg: [ 4.20, 7.16 ], std: [ 2.99, 2.11 ], fq: 50
  },
  "daylight": {
    dict: "anew-neg-stem", word: "daylight", stem: "daylight",
    ant: [ "night" ],
    avg: [ 4.28, 6.22 ], std: [ 2.21, 1.30 ], fq: 50
  },
  "daytim": {
    dict: "anew-neg-stem", word: "daytime", stem: "daytim",
    ant: [ "night" ],
    avg: [ 4.28, 6.22 ], std: [ 2.21, 1.30 ], fq: 50
  },
  "deactiv": {
    dict: "anew-neg-stem", word: "deactivate", stem: "deactiv",
    ant: [ "activate" ],
    avg: [ 4.86, 5.46 ], std: [ 2.56, 0.98 ], fq: 2
  },
  "dead": {
    dict: "anew-neg-stem", word: "dead", stem: "dead",
    ant: [ "living", "alive", "live" ],
    avg: [ 5.52, 6.90 ], std: [ 2.85, 1.35 ], fq: 150
  },
  "deaf": {
    dict: "anew-neg-stem", word: "deaf", stem: "deaf",
    ant: [ "hearing" ],
    avg: [ 5.39, 5.82 ], std: [ 2.22, 1.48 ], fq: 50
  },
  "death": {
    dict: "anew-neg-stem", word: "death", stem: "death",
    ant: [ "birth" ],
    avg: [ 5.75, 6.52 ], std: [ 2.73, 2.36 ], fq: 20
  },
  "death": {
    dict: "anew-neg-stem", word: "deaths", stem: "death",
    ant: [ "birth" ],
    avg: [ 5.75, 6.52 ], std: [ 2.73, 2.36 ], fq: 20
  },
  "decis": {
    dict: "anew-neg-stem", word: "decisive", stem: "decis",
    ant: [ "indecisive" ],
    avg: [ 4.81, 3.52 ], std: [ 2.20, 1.83 ], fq: 21
  },
  "declin": {
    dict: "anew-neg-stem", word: "declined", stem: "declin",
    ant: [ "better", "accept" ],
    avg: [ 5.00, 6.68 ], std: [ 2.69, 1.18 ], fq: 100
  },
  "declin": {
    dict: "anew-neg-stem", word: "decline", stem: "declin",
    ant: [ "improvement", "better", "accept" ],
    avg: [ 5.26, 6.74 ], std: [ 2.52, 1.21 ], fq: 150
  },
  "deep": {
    dict: "anew-neg-stem", word: "deep", stem: "deep",
    ant: [ "shallow" ],
    avg: [ 3.00, 3.86 ], std: [ 2.34, 1.74 ], fq: 22
  },
  "deeper": {
    dict: "anew-neg-stem", word: "deeper", stem: "deeper",
    ant: [ "shallow" ],
    avg: [ 3.00, 3.86 ], std: [ 2.34, 1.74 ], fq: 22
  },
  "deepest": {
    dict: "anew-neg-stem", word: "deepest", stem: "deepest",
    ant: [ "shallow" ],
    avg: [ 3.00, 3.86 ], std: [ 2.34, 1.74 ], fq: 22
  },
  "defeat": {
    dict: "anew-neg-stem", word: "defeated", stem: "defeat",
    ant: [ "undefeated" ],
    avg: [ 4.32, 6.21 ], std: [ 2.61, 2.44 ], fq: 20
  },
  "defeat": {
    dict: "anew-neg-stem", word: "defeat", stem: "defeat",
    ant: [ "victory" ],
    avg: [ 6.63, 7.98 ], std: [ 2.84, 1.08 ], fq: 50
  },
  "defend": {
    dict: "anew-neg-stem", word: "defended", stem: "defend",
    ant: [ "attack", "prosecute" ],
    avg: [ 6.08, 2.79 ], std: [ 2.45, 1.43 ], fq: 70
  },
  "defend": {
    dict: "anew-neg-stem", word: "defend", stem: "defend",
    ant: [ "attack", "prosecute" ],
    avg: [ 6.08, 2.79 ], std: [ 2.45, 1.43 ], fq: 70
  },
  "defend": {
    dict: "anew-neg-stem", word: "defending", stem: "defend",
    ant: [ "attack", "prosecute" ],
    avg: [ 6.08, 2.79 ], std: [ 2.45, 1.43 ], fq: 70
  },
  "defici": {
    dict: "anew-neg-stem", word: "deficient", stem: "defici",
    ant: [ "sufficient" ],
    avg: [ 3.17, 6.10 ], std: [ 2.65, 1.61 ], fq: 22
  },
  "deficit": {
    dict: "anew-neg-stem", word: "deficit", stem: "deficit",
    ant: [ "lead" ],
    avg: [ 3.15, 6.28 ], std: [ 1.77, 1.46 ], fq: 50
  },
  "delay": {
    dict: "anew-neg-stem", word: "delays", stem: "delay",
    ant: [ "rush" ],
    avg: [ 4.90, 4.12 ], std: [ 2.35, 1.36 ], fq: 50
  },
  "delay": {
    dict: "anew-neg-stem", word: "delayed", stem: "delay",
    ant: [ "rush" ],
    avg: [ 4.90, 4.12 ], std: [ 2.35, 1.36 ], fq: 50
  },
  "delay": {
    dict: "anew-neg-stem", word: "delay", stem: "delay",
    ant: [ "rush" ],
    avg: [ 4.90, 4.12 ], std: [ 2.35, 1.36 ], fq: 50
  },
  "delic": {
    dict: "anew-neg-stem", word: "delicate", stem: "delic",
    ant: [ "rugged" ],
    avg: [ 5.43, 5.66 ], std: [ 2.42, 1.67 ], fq: 50
  },
  "delight": {
    dict: "anew-neg-stem", word: "delight", stem: "delight",
    ant: [ "displease" ],
    avg: [ 5.71, 2.63 ], std: [ 2.22, 0.96 ], fq: 20
  },
  "delight": {
    dict: "anew-neg-stem", word: "delighted", stem: "delight",
    ant: [ "displease" ],
    avg: [ 5.71, 2.63 ], std: [ 2.22, 0.96 ], fq: 20
  },
  "demis": {
    dict: "anew-neg-stem", word: "demise", stem: "demis",
    ant: [ "birth" ],
    avg: [ 5.75, 6.52 ], std: [ 2.73, 2.36 ], fq: 20
  },
  "demonstr": {
    dict: "anew-neg-stem", word: "demonstrated", stem: "demonstr",
    ant: [ "disprove" ],
    avg: [ 4.30, 3.90 ], std: [ 2.10, 1.79 ], fq: 22
  },
  "demonstr": {
    dict: "anew-neg-stem", word: "demonstrate", stem: "demonstr",
    ant: [ "disprove" ],
    avg: [ 4.30, 3.90 ], std: [ 2.10, 1.79 ], fq: 22
  },
  "deni": {
    dict: "anew-neg-stem", word: "deny", stem: "deni",
    ant: [ "admit", "allow" ],
    avg: [ 4.19, 5.32 ], std: [ 2.40, 1.37 ], fq: 100
  },
  "denial": {
    dict: "anew-neg-stem", word: "denial", stem: "denial",
    ant: [ "prosecution" ],
    avg: [ 4.56, 3.37 ], std: [ 2.53, 1.21 ], fq: 18
  },
  "depend": {
    dict: "anew-neg-stem", word: "dependable", stem: "depend",
    ant: [ "unreliable" ],
    avg: [ 4.29, 2.74 ], std: [ 2.17, 1.19 ], fq: 20
  },
  "depress": {
    dict: "anew-neg-stem", word: "depressing", stem: "depress",
    ant: [ "cheerful" ],
    avg: [ 5.76, 8.00 ], std: [ 2.41, 1.41 ], fq: 20
  },
  "desir": {
    dict: "anew-neg-stem", word: "desirable", stem: "desir",
    ant: [ "undesirable" ],
    avg: [ 4.00, 3.00 ], std: [ 2.16, 1.73 ], fq: 21
  },
  "despair": {
    dict: "anew-neg-stem", word: "despair", stem: "despair",
    ant: [ "hope" ],
    avg: [ 5.78, 7.38 ], std: [ 2.09, 1.31 ], fq: 50
  },
  "despair": {
    dict: "anew-neg-stem", word: "despairing", stem: "despair",
    ant: [ "hope" ],
    avg: [ 5.78, 7.38 ], std: [ 2.09, 1.31 ], fq: 50
  },
  "destroy": {
    dict: "anew-neg-stem", word: "destroyed", stem: "destroy",
    ant: [ "preserved" ],
    avg: [ 4.95, 6.10 ], std: [ 2.19, 1.40 ], fq: 50
  },
  "detain": {
    dict: "anew-neg-stem", word: "detain", stem: "detain",
    ant: [ "free", "rush" ],
    avg: [ 5.01, 6.11 ], std: [ 2.72, 1.31 ], fq: 100
  },
  "determin": {
    dict: "anew-neg-stem", word: "determined", stem: "determin",
    ant: [ "undetermined" ],
    avg: [ 3.70, 3.67 ], std: [ 2.05, 1.80 ], fq: 22
  },
  "detest": {
    dict: "anew-neg-stem", word: "detest", stem: "detest",
    ant: [ "love" ],
    avg: [ 6.38, 8.42 ], std: [ 2.68, 1.11 ], fq: 50
  },
  "die": {
    dict: "anew-neg-stem", word: "dying", stem: "die",
    ant: [ "birth" ],
    avg: [ 5.75, 6.52 ], std: [ 2.73, 2.36 ], fq: 20
  },
  "difficult": {
    dict: "anew-neg-stem", word: "difficult", stem: "difficult",
    ant: [ "easy" ],
    avg: [ 4.48, 6.76 ], std: [ 2.82, 1.60 ], fq: 50
  },
  "difficulti": {
    dict: "anew-neg-stem", word: "difficulty", stem: "difficulti",
    ant: [ "ease" ],
    avg: [ 4.48, 6.52 ], std: [ 2.82, 1.59 ], fq: 50
  },
  "difficulti": {
    dict: "anew-neg-stem", word: "difficulties", stem: "difficulti",
    ant: [ "ease" ],
    avg: [ 4.48, 6.52 ], std: [ 2.82, 1.59 ], fq: 50
  },
  "dignifi": {
    dict: "anew-neg-stem", word: "dignified", stem: "dignifi",
    ant: [ "undignified" ],
    avg: [ 4.41, 3.25 ], std: [ 2.11, 1.41 ], fq: 21
  },
  "dilig": {
    dict: "anew-neg-stem", word: "diligent", stem: "dilig",
    ant: [ "negligent" ],
    avg: [ 4.45, 2.05 ], std: [ 2.54, 1.28 ], fq: 20
  },
  "dim": {
    dict: "anew-neg-stem", word: "dim", stem: "dim",
    ant: [ "focus" ],
    avg: [ 4.65, 6.12 ], std: [ 2.13, 1.06 ], fq: 50
  },
  "dime": {
    dict: "anew-neg-stem", word: "dimes", stem: "dime",
    ant: [ "focus" ],
    avg: [ 4.65, 6.12 ], std: [ 2.13, 1.06 ], fq: 50
  },
  "direct": {
    dict: "anew-neg-stem", word: "direct", stem: "direct",
    ant: [ "indirect" ],
    avg: [ 3.77, 3.58 ], std: [ 1.90, 1.61 ], fq: 20
  },
  "dirti": {
    dict: "anew-neg-stem", word: "dirty", stem: "dirti",
    ant: [ "clean" ],
    avg: [ 4.37, 6.90 ], std: [ 2.14, 1.90 ], fq: 50
  },
  "disadvantag": {
    dict: "anew-neg-stem", word: "disadvantage", stem: "disadvantag",
    ant: [ "advantage" ],
    avg: [ 4.76, 6.84 ], std: [ 2.18, 1.28 ], fq: 50
  },
  "disagr": {
    dict: "anew-neg-stem", word: "disagreement", stem: "disagr",
    ant: [ "agreement" ],
    avg: [ 5.02, 6.32 ], std: [ 2.24, 1.22 ], fq: 50
  },
  "disagre": {
    dict: "anew-neg-stem", word: "disagreeable", stem: "disagre",
    ant: [ "agreeable" ],
    avg: [ 3.55, 6.90 ], std: [ 2.21, 1.94 ], fq: 20
  },
  "disagre": {
    dict: "anew-neg-stem", word: "disagree", stem: "disagre",
    ant: [ "agree" ],
    avg: [ 3.62, 7.17 ], std: [ 2.09, 1.58 ], fq: 19
  },
  "disappear": {
    dict: "anew-neg-stem", word: "disappearance", stem: "disappear",
    ant: [ "appearance" ],
    avg: [ 4.57, 6.14 ], std: [ 2.45, 1.90 ], fq: 22
  },
  "disapprov": {
    dict: "anew-neg-stem", word: "disapprove", stem: "disapprov",
    ant: [ "approve" ],
    avg: [ 4.09, 7.00 ], std: [ 2.29, 1.92 ], fq: 21
  },
  "disapprov": {
    dict: "anew-neg-stem", word: "disapproval", stem: "disapprov",
    ant: [ "approval" ],
    avg: [ 4.05, 6.98 ], std: [ 2.59, 1.20 ], fq: 50
  },
  "discharg": {
    dict: "anew-neg-stem", word: "discharge", stem: "discharg",
    ant: [ "charge", "convict", "fill" ],
    avg: [ 6.04, 4.45 ], std: [ 2.36, 1.39 ], fq: 118
  },
  "discomfort": {
    dict: "anew-neg-stem", word: "discomfort", stem: "discomfort",
    ant: [ "comfort" ],
    avg: [ 3.93, 7.50 ], std: [ 2.85, 1.15 ], fq: 50
  },
  "disconnect": {
    dict: "anew-neg-stem", word: "disconnect", stem: "disconnect",
    ant: [ "connect" ],
    avg: [ 3.75, 5.86 ], std: [ 2.49, 1.48 ], fq: 50
  },
  "discont": {
    dict: "anew-neg-stem", word: "discontent", stem: "discont",
    ant: [ "contentment", "content" ],
    avg: [ 4.44, 6.27 ], std: [ 2.53, 1.97 ], fq: 70
  },
  "discord": {
    dict: "anew-neg-stem", word: "discord", stem: "discord",
    ant: [ "agree" ],
    avg: [ 3.62, 7.17 ], std: [ 2.09, 1.58 ], fq: 19
  },
  "discourag": {
    dict: "anew-neg-stem", word: "discourage", stem: "discourag",
    ant: [ "encourage" ],
    avg: [ 6.44, 6.90 ], std: [ 2.58, 1.68 ], fq: 50
  },
  "discourag": {
    dict: "anew-neg-stem", word: "discouraging", stem: "discourag",
    ant: [ "encourage", "encouraging" ],
    avg: [ 6.44, 7.07 ], std: [ 2.58, 1.62 ], fq: 100
  },
  "discourag": {
    dict: "anew-neg-stem", word: "discouraged", stem: "discourag",
    ant: [ "encourage" ],
    avg: [ 6.44, 6.90 ], std: [ 2.58, 1.68 ], fq: 50
  },
  "discredit": {
    dict: "anew-neg-stem", word: "discredit", stem: "discredit",
    ant: [ "believe" ],
    avg: [ 5.30, 6.70 ], std: [ 2.66, 1.59 ], fq: 50
  },
  "disgrac": {
    dict: "anew-neg-stem", word: "disgrace", stem: "disgrac",
    ant: [ "honor" ],
    avg: [ 5.90, 7.22 ], std: [ 1.83, 1.20 ], fq: 50
  },
  "dishonest": {
    dict: "anew-neg-stem", word: "dishonest", stem: "dishonest",
    ant: [ "honest" ],
    avg: [ 5.32, 7.46 ], std: [ 1.92, 1.13 ], fq: 50
  },
  "dishonesti": {
    dict: "anew-neg-stem", word: "dishonesty", stem: "dishonesti",
    ant: [ "honesty" ],
    avg: [ 5.32, 7.76 ], std: [ 1.92, 1.27 ], fq: 50
  },
  "dishonor": {
    dict: "anew-neg-stem", word: "dishonorable", stem: "dishonor",
    ant: [ "honorable", "honest" ],
    avg: [ 5.07, 7.56 ], std: [ 2.09, 1.26 ], fq: 71
  },
  "dishonor": {
    dict: "anew-neg-stem", word: "dishonor", stem: "dishonor",
    ant: [ "honor" ],
    avg: [ 5.90, 7.22 ], std: [ 1.83, 1.20 ], fq: 50
  },
  "dislik": {
    dict: "anew-neg-stem", word: "dislike", stem: "dislik",
    ant: [ "liking", "like" ],
    avg: [ 5.16, 7.01 ], std: [ 2.62, 1.06 ], fq: 100
  },
  "disloy": {
    dict: "anew-neg-stem", word: "disloyal", stem: "disloy",
    ant: [ "patriotic", "loyal" ],
    avg: [ 4.88, 7.07 ], std: [ 2.65, 1.38 ], fq: 71
  },
  "disloyalti": {
    dict: "anew-neg-stem", word: "disloyalty", stem: "disloyalti",
    ant: [ "loyalty" ],
    avg: [ 4.52, 7.18 ], std: [ 2.71, 2.13 ], fq: 21
  },
  "dismiss": {
    dict: "anew-neg-stem", word: "dismissed", stem: "dismiss",
    ant: [ "hire" ],
    avg: [ 6.77, 6.50 ], std: [ 2.07, 1.34 ], fq: 50
  },
  "disobedi": {
    dict: "anew-neg-stem", word: "disobedience", stem: "disobedi",
    ant: [ "obedience" ],
    avg: [ 4.60, 5.40 ], std: [ 2.67, 1.62 ], fq: 50
  },
  "disobey": {
    dict: "anew-neg-stem", word: "disobey", stem: "disobey",
    ant: [ "obey" ],
    avg: [ 4.23, 5.10 ], std: [ 1.72, 1.88 ], fq: 50
  },
  "disorderli": {
    dict: "anew-neg-stem", word: "disorderly", stem: "disorderli",
    ant: [ "orderly" ],
    avg: [ 5.05, 6.36 ], std: [ 2.39, 2.19 ], fq: 20
  },
  "disparag": {
    dict: "anew-neg-stem", word: "disparage", stem: "disparag",
    ant: [ "flatter" ],
    avg: [ 4.61, 6.10 ], std: [ 2.83, 2.10 ], fq: 19
  },
  "displac": {
    dict: "anew-neg-stem", word: "displace", stem: "displac",
    ant: [ "hire" ],
    avg: [ 6.77, 6.50 ], std: [ 2.07, 1.34 ], fq: 50
  },
  "displeas": {
    dict: "anew-neg-stem", word: "displease", stem: "displeas",
    ant: [ "please" ],
    avg: [ 5.44, 6.36 ], std: [ 2.88, 1.68 ], fq: 50
  },
  "displeas": {
    dict: "anew-neg-stem", word: "displeased", stem: "displeas",
    ant: [ "please", "pleased" ],
    avg: [ 5.44, 6.98 ], std: [ 2.88, 1.44 ], fq: 100
  },
  "dispos": {
    dict: "anew-neg-stem", word: "disposed", stem: "dispos",
    ant: [ "disqualify" ],
    avg: [ 4.70, 2.47 ], std: [ 1.84, 1.07 ], fq: 19
  },
  "disqualifi": {
    dict: "anew-neg-stem", word: "disqualify", stem: "disqualifi",
    ant: [ "qualify" ],
    avg: [ 6.05, 6.77 ], std: [ 2.22, 1.41 ], fq: 20
  },
  "disrespect": {
    dict: "anew-neg-stem", word: "disrespect", stem: "disrespect",
    ant: [ "respect", "esteem" ],
    avg: [ 4.26, 6.78 ], std: [ 2.68, 1.40 ], fq: 72
  },
  "disrespect": {
    dict: "anew-neg-stem", word: "disrespectful", stem: "disrespect",
    ant: [ "respectful" ],
    avg: [ 3.32, 7.45 ], std: [ 2.34, 1.26 ], fq: 42
  },
  "dissatisfi": {
    dict: "anew-neg-stem", word: "dissatisfied", stem: "dissatisfi",
    ant: [ "satisfy" ],
    avg: [ 4.94, 7.34 ], std: [ 2.63, 1.44 ], fq: 50
  },
  "distress": {
    dict: "anew-neg-stem", word: "distressed", stem: "distress",
    ant: [ "euphoric" ],
    avg: [ 5.25, 7.80 ], std: [ 2.69, 1.40 ], fq: 20
  },
  "distrust": {
    dict: "anew-neg-stem", word: "distrust", stem: "distrust",
    ant: [ "trust" ],
    avg: [ 5.30, 7.22 ], std: [ 2.66, 1.23 ], fq: 50
  },
  "divid": {
    dict: "anew-neg-stem", word: "divide", stem: "divid",
    ant: [ "unite" ],
    avg: [ 3.75, 6.64 ], std: [ 2.49, 1.19 ], fq: 50
  },
  "divid": {
    dict: "anew-neg-stem", word: "divided", stem: "divid",
    ant: [ "unite", "united" ],
    avg: [ 3.75, 6.98 ], std: [ 2.49, 1.20 ], fq: 100
  },
  "doctor": {
    dict: "anew-neg-stem", word: "doctor", stem: "doctor",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "doctor": {
    dict: "anew-neg-stem", word: "doctors", stem: "doctor",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "doubl": {
    dict: "anew-neg-stem", word: "double", stem: "doubl",
    ant: [ "single" ],
    avg: [ 5.50, 5.12 ], std: [ 2.66, 1.52 ], fq: 50
  },
  "doubt": {
    dict: "anew-neg-stem", word: "doubt", stem: "doubt",
    ant: [ "certainty" ],
    avg: [ 4.35, 6.38 ], std: [ 2.52, 1.75 ], fq: 22
  },
  "dove": {
    dict: "anew-neg-stem", word: "dove", stem: "dove",
    ant: [ "hawk" ],
    avg: [ 4.83, 6.46 ], std: [ 2.75, 1.58 ], fq: 29
  },
  "draw": {
    dict: "anew-neg-stem", word: "drawings", stem: "draw",
    ant: [ "push", "deposit", "repel" ],
    avg: [ 5.09, 4.73 ], std: [ 2.49, 1.84 ], fq: 92
  },
  "draw": {
    dict: "anew-neg-stem", word: "draw", stem: "draw",
    ant: [ "push", "deposit", "repel" ],
    avg: [ 5.09, 4.73 ], std: [ 2.49, 1.84 ], fq: 92
  },
  "draw": {
    dict: "anew-neg-stem", word: "drawing", stem: "draw",
    ant: [ "push", "deposit", "repel" ],
    avg: [ 5.09, 4.73 ], std: [ 2.49, 1.84 ], fq: 92
  },
  "dress": {
    dict: "anew-neg-stem", word: "dress", stem: "dress",
    ant: [ "undress" ],
    avg: [ 5.96, 6.14 ], std: [ 2.77, 1.74 ], fq: 22
  },
  "dress": {
    dict: "anew-neg-stem", word: "dressed", stem: "dress",
    ant: [ "undress" ],
    avg: [ 5.96, 6.14 ], std: [ 2.77, 1.74 ], fq: 22
  },
  "dress": {
    dict: "anew-neg-stem", word: "dresses", stem: "dress",
    ant: [ "undress" ],
    avg: [ 5.96, 6.14 ], std: [ 2.77, 1.74 ], fq: 22
  },
  "dri": {
    dict: "anew-neg-stem", word: "dry", stem: "dri",
    ant: [ "wet", "sweet" ],
    avg: [ 4.41, 6.57 ], std: [ 2.52, 1.25 ], fq: 100
  },
  "drive": {
    dict: "anew-neg-stem", word: "drive", stem: "drive",
    ant: [ "attract" ],
    avg: [ 5.35, 6.38 ], std: [ 2.81, 2.11 ], fq: 22
  },
  "drunk": {
    dict: "anew-neg-stem", word: "drunk", stem: "drunk",
    ant: [ "sober" ],
    avg: [ 3.56, 5.78 ], std: [ 1.95, 1.98 ], fq: 50
  },
  "dull": {
    dict: "anew-neg-stem", word: "dull", stem: "dull",
    ant: [ "lively", "bright" ],
    avg: [ 5.72, 7.39 ], std: [ 2.52, 1.25 ], fq: 80
  },
  "eas": {
    dict: "anew-neg-stem", word: "ease", stem: "eas",
    ant: [ "difficulty" ],
    avg: [ 5.94, 3.38 ], std: [ 2.36, 1.23 ], fq: 50
  },
  "easi": {
    dict: "anew-neg-stem", word: "easy", stem: "easi",
    ant: [ "difficult", "uneasy", "quickly" ],
    avg: [ 5.54, 3.73 ], std: [ 2.28, 1.15 ], fq: 121
  },
  "easier": {
    dict: "anew-neg-stem", word: "easier", stem: "easier",
    ant: [ "difficult", "uneasy" ],
    avg: [ 4.84, 3.03 ], std: [ 2.50, 0.97 ], fq: 71
  },
  "educ": {
    dict: "anew-neg-stem", word: "educated", stem: "educ",
    ant: [ "uneducated" ],
    avg: [ 3.90, 3.00 ], std: [ 2.41, 1.26 ], fq: 20
  },
  "effect": {
    dict: "anew-neg-stem", word: "effective", stem: "effect",
    ant: [ "ineffective" ],
    avg: [ 3.75, 3.11 ], std: [ 2.20, 1.15 ], fq: 19
  },
  "elabor": {
    dict: "anew-neg-stem", word: "elaborate", stem: "elabor",
    ant: [ "contract" ],
    avg: [ 5.00, 5.46 ], std: [ 2.32, 1.11 ], fq: 50
  },
  "elat": {
    dict: "anew-neg-stem", word: "elated", stem: "elat",
    ant: [ "depress" ],
    avg: [ 3.14, 2.47 ], std: [ 1.46, 2.01 ], fq: 20
  },
  "elev": {
    dict: "anew-neg-stem", word: "elevate", stem: "elev",
    ant: [ "lower" ],
    avg: [ 4.31, 4.24 ], std: [ 2.20, 1.08 ], fq: 50
  },
  "elev": {
    dict: "anew-neg-stem", word: "elevated", stem: "elev",
    ant: [ "lower" ],
    avg: [ 4.31, 4.24 ], std: [ 2.20, 1.08 ], fq: 50
  },
  "employ": {
    dict: "anew-neg-stem", word: "employ", stem: "employ",
    ant: [ "unemployment", "fire" ],
    avg: [ 6.52, 2.97 ], std: [ 2.53, 1.42 ], fq: 72
  },
  "employ": {
    dict: "anew-neg-stem", word: "employed", stem: "employ",
    ant: [ "fire", "unemployed" ],
    avg: [ 6.25, 3.28 ], std: [ 2.14, 1.71 ], fq: 72
  },
  "employ": {
    dict: "anew-neg-stem", word: "employment", stem: "employ",
    ant: [ "unemployment" ],
    avg: [ 5.59, 2.32 ], std: [ 2.92, 1.25 ], fq: 22
  },
  "empti": {
    dict: "anew-neg-stem", word: "emptiness", stem: "empti",
    ant: [ "fullness" ],
    avg: [ 3.20, 6.19 ], std: [ 2.07, 2.18 ], fq: 20
  },
  "empti": {
    dict: "anew-neg-stem", word: "empty", stem: "empti",
    ant: [ "fill", "full" ],
    avg: [ 5.18, 5.96 ], std: [ 2.74, 1.23 ], fq: 100
  },
  "encourag": {
    dict: "anew-neg-stem", word: "encourage", stem: "encourag",
    ant: [ "discourage" ],
    avg: [ 3.73, 3.05 ], std: [ 2.35, 1.16 ], fq: 21
  },
  "encourag": {
    dict: "anew-neg-stem", word: "encouraging", stem: "encourag",
    ant: [ "discourage", "discouraging" ],
    avg: [ 3.95, 2.99 ], std: [ 2.36, 1.72 ], fq: 42
  },
  "encourag": {
    dict: "anew-neg-stem", word: "encouraged", stem: "encourag",
    ant: [ "discourage" ],
    avg: [ 3.73, 3.05 ], std: [ 2.35, 1.16 ], fq: 21
  },
  "end": {
    dict: "anew-neg-stem", word: "end", stem: "end",
    ant: [ "beginning", "begin" ],
    avg: [ 2.92, 6.42 ], std: [ 2.48, 2.08 ], fq: 38
  },
  "end": {
    dict: "anew-neg-stem", word: "ends", stem: "end",
    ant: [ "beginning", "begin" ],
    avg: [ 2.92, 6.42 ], std: [ 2.48, 2.08 ], fq: 38
  },
  "endur": {
    dict: "anew-neg-stem", word: "enduring", stem: "endur",
    ant: [ "enjoy" ],
    avg: [ 5.20, 7.66 ], std: [ 2.72, 1.47 ], fq: 50
  },
  "enemi": {
    dict: "anew-neg-stem", word: "enemy", stem: "enemi",
    ant: [ "friend" ],
    avg: [ 5.11, 7.66 ], std: [ 2.96, 1.51 ], fq: 50
  },
  "engag": {
    dict: "anew-neg-stem", word: "engaged", stem: "engag",
    ant: [ "fire" ],
    avg: [ 7.17, 3.80 ], std: [ 2.06, 1.58 ], fq: 50
  },
  "engag": {
    dict: "anew-neg-stem", word: "engage", stem: "engag",
    ant: [ "fire" ],
    avg: [ 7.17, 3.80 ], std: [ 2.06, 1.58 ], fq: 50
  },
  "enjoy": {
    dict: "anew-neg-stem", word: "enjoy", stem: "enjoy",
    ant: [ "suffer" ],
    avg: [ 5.00, 2.08 ], std: [ 2.45, 1.38 ], fq: 50
  },
  "enjoy": {
    dict: "anew-neg-stem", word: "enjoyed", stem: "enjoy",
    ant: [ "suffer" ],
    avg: [ 5.00, 2.08 ], std: [ 2.45, 1.38 ], fq: 50
  },
  "enjoy": {
    dict: "anew-neg-stem", word: "enjoying", stem: "enjoy",
    ant: [ "suffer" ],
    avg: [ 5.00, 2.08 ], std: [ 2.45, 1.38 ], fq: 50
  },
  "entir": {
    dict: "anew-neg-stem", word: "entirely", stem: "entir",
    ant: [ "partly" ],
    avg: [ 3.82, 5.32 ], std: [ 2.24, 1.17 ], fq: 50
  },
  "equal": {
    dict: "anew-neg-stem", word: "equal", stem: "equal",
    ant: [ "inadequate" ],
    avg: [ 4.30, 2.57 ], std: [ 2.03, 1.21 ], fq: 22
  },
  "establish": {
    dict: "anew-neg-stem", word: "established", stem: "establish",
    ant: [ "abolish", "disprove" ],
    avg: [ 4.24, 3.87 ], std: [ 2.09, 1.67 ], fq: 40
  },
  "establish": {
    dict: "anew-neg-stem", word: "establishing", stem: "establish",
    ant: [ "abolish", "disprove" ],
    avg: [ 4.24, 3.87 ], std: [ 2.09, 1.67 ], fq: 40
  },
  "establish": {
    dict: "anew-neg-stem", word: "establish", stem: "establish",
    ant: [ "abolish", "disprove" ],
    avg: [ 4.24, 3.87 ], std: [ 2.09, 1.67 ], fq: 40
  },
  "esteem": {
    dict: "anew-neg-stem", word: "esteemed", stem: "esteem",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "esteem": {
    dict: "anew-neg-stem", word: "esteem", stem: "esteem",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "ethic": {
    dict: "anew-neg-stem", word: "ethical", stem: "ethic",
    ant: [ "unethical" ],
    avg: [ 4.25, 2.19 ], std: [ 2.84, 1.36 ], fq: 20
  },
  "evil": {
    dict: "anew-neg-stem", word: "evil", stem: "evil",
    ant: [ "good", "goodness" ],
    avg: [ 5.43, 7.40 ], std: [ 2.85, 1.42 ], fq: 100
  },
  "excit": {
    dict: "anew-neg-stem", word: "excite", stem: "excit",
    ant: [ "calm" ],
    avg: [ 2.82, 6.36 ], std: [ 2.13, 1.60 ], fq: 50
  },
  "excit": {
    dict: "anew-neg-stem", word: "exciting", stem: "excit",
    ant: [ "calm" ],
    avg: [ 2.82, 6.36 ], std: [ 2.13, 1.60 ], fq: 50
  },
  "excit": {
    dict: "anew-neg-stem", word: "excited", stem: "excit",
    ant: [ "calm" ],
    avg: [ 2.82, 6.36 ], std: [ 2.13, 1.60 ], fq: 50
  },
  "exclud": {
    dict: "anew-neg-stem", word: "exclude", stem: "exclud",
    ant: [ "include", "admit" ],
    avg: [ 4.07, 5.50 ], std: [ 2.40, 1.39 ], fq: 69
  },
  "exclud": {
    dict: "anew-neg-stem", word: "excluded", stem: "exclud",
    ant: [ "include", "admit" ],
    avg: [ 4.07, 5.50 ], std: [ 2.40, 1.39 ], fq: 69
  },
  "exist": {
    dict: "anew-neg-stem", word: "existing", stem: "exist",
    ant: [ "nonexistent" ],
    avg: [ 3.81, 3.89 ], std: [ 2.02, 1.24 ], fq: 20
  },
  "experienc": {
    dict: "anew-neg-stem", word: "experienced", stem: "experienc",
    ant: [ "inexperienced" ],
    avg: [ 3.67, 3.50 ], std: [ 2.06, 1.32 ], fq: 19
  },
  "extinct": {
    dict: "anew-neg-stem", word: "extinct", stem: "extinct",
    ant: [ "active" ],
    avg: [ 4.86, 6.82 ], std: [ 2.56, 1.77 ], fq: 50
  },
  "face": {
    dict: "anew-neg-stem", word: "faced", stem: "face",
    ant: [ "back", "faceless" ],
    avg: [ 4.11, 4.10 ], std: [ 2.10, 1.51 ], fq: 70
  },
  "face": {
    dict: "anew-neg-stem", word: "faces", stem: "face",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "face": {
    dict: "anew-neg-stem", word: "facing", stem: "face",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "face": {
    dict: "anew-neg-stem", word: "face", stem: "face",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "faceless": {
    dict: "anew-neg-stem", word: "faceless", stem: "faceless",
    ant: [ "faced" ],
    avg: [ 5.04, 5.24 ], std: [ 2.18, 1.24 ], fq: 50
  },
  "fag": {
    dict: "anew-neg-stem", word: "fag", stem: "fag",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "fail": {
    dict: "anew-neg-stem", word: "failing", stem: "fail",
    ant: [ "passing", "succeed", "pass" ],
    avg: [ 5.63, 6.35 ], std: [ 2.26, 1.63 ], fq: 150
  },
  "fail": {
    dict: "anew-neg-stem", word: "fails", stem: "fail",
    ant: [ "succeed", "pass" ],
    avg: [ 6.31, 6.75 ], std: [ 2.33, 1.57 ], fq: 100
  },
  "fail": {
    dict: "anew-neg-stem", word: "failed", stem: "fail",
    ant: [ "succeed", "pass" ],
    avg: [ 6.31, 6.75 ], std: [ 2.33, 1.57 ], fq: 100
  },
  "fail": {
    dict: "anew-neg-stem", word: "fail", stem: "fail",
    ant: [ "succeed", "pass" ],
    avg: [ 6.31, 6.75 ], std: [ 2.33, 1.57 ], fq: 100
  },
  "failur": {
    dict: "anew-neg-stem", word: "failure", stem: "failur",
    ant: [ "success" ],
    avg: [ 6.11, 7.86 ], std: [ 2.65, 1.64 ], fq: 50
  },
  "fair": {
    dict: "anew-neg-stem", word: "fair", stem: "fair",
    ant: [ "unfair", "foul" ],
    avg: [ 4.41, 3.05 ], std: [ 2.53, 1.32 ], fq: 72
  },
  "faith": {
    dict: "anew-neg-stem", word: "faithful", stem: "faith",
    ant: [ "unfaithful" ],
    avg: [ 5.59, 2.33 ], std: [ 2.44, 1.75 ], fq: 40
  },
  "fall": {
    dict: "anew-neg-stem", word: "falling", stem: "fall",
    ant: [ "ascend", "rising" ],
    avg: [ 5.39, 6.39 ], std: [ 2.44, 1.32 ], fq: 72
  },
  "fall": {
    dict: "anew-neg-stem", word: "falls", stem: "fall",
    ant: [ "ascend" ],
    avg: [ 4.13, 6.19 ], std: [ 2.53, 1.50 ], fq: 22
  },
  "fall": {
    dict: "anew-neg-stem", word: "fall", stem: "fall",
    ant: [ "ascend" ],
    avg: [ 4.13, 6.19 ], std: [ 2.53, 1.50 ], fq: 22
  },
  "fallen": {
    dict: "anew-neg-stem", word: "fallen", stem: "fallen",
    ant: [ "ascend" ],
    avg: [ 4.13, 6.19 ], std: [ 2.53, 1.50 ], fq: 22
  },
  "fals": {
    dict: "anew-neg-stem", word: "false", stem: "fals",
    ant: [ "true" ],
    avg: [ 5.32, 7.08 ], std: [ 1.92, 1.10 ], fq: 50
  },
  "fanci": {
    dict: "anew-neg-stem", word: "fancy", stem: "fanci",
    ant: [ "plain" ],
    avg: [ 3.52, 5.00 ], std: [ 2.05, 1.44 ], fq: 50
  },
  "fast": {
    dict: "anew-neg-stem", word: "fast", stem: "fast",
    ant: [ "slow" ],
    avg: [ 3.39, 3.78 ], std: [ 2.22, 1.11 ], fq: 50
  },
  "faster": {
    dict: "anew-neg-stem", word: "faster", stem: "faster",
    ant: [ "slow" ],
    avg: [ 3.39, 3.78 ], std: [ 2.22, 1.11 ], fq: 50
  },
  "fat": {
    dict: "anew-neg-stem", word: "fat", stem: "fat",
    ant: [ "thin" ],
    avg: [ 5.00, 5.74 ], std: [ 2.32, 1.38 ], fq: 50
  },
  "father": {
    dict: "anew-neg-stem", word: "father", stem: "father",
    ant: [ "mother" ],
    avg: [ 6.13, 7.68 ], std: [ 2.71, 1.67 ], fq: 50
  },
  "father": {
    dict: "anew-neg-stem", word: "fathers", stem: "father",
    ant: [ "mother" ],
    avg: [ 6.13, 7.68 ], std: [ 2.71, 1.67 ], fq: 50
  },
  "fatigu": {
    dict: "anew-neg-stem", word: "fatigued", stem: "fatigu",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "fatigu": {
    dict: "anew-neg-stem", word: "fatigue", stem: "fatigu",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "fault": {
    dict: "anew-neg-stem", word: "fault", stem: "fault",
    ant: [ "merit" ],
    avg: [ 4.52, 6.74 ], std: [ 2.52, 1.21 ], fq: 50
  },
  "fear": {
    dict: "anew-neg-stem", word: "fearful", stem: "fear",
    ant: [ "brave" ],
    avg: [ 6.15, 7.02 ], std: [ 2.45, 1.29 ], fq: 50
  },
  "fed": {
    dict: "anew-neg-stem", word: "fed", stem: "fed",
    ant: [ "starve" ],
    avg: [ 4.00, 2.53 ], std: [ 2.59, 1.02 ], fq: 18
  },
  "feed": {
    dict: "anew-neg-stem", word: "feeding", stem: "feed",
    ant: [ "starve" ],
    avg: [ 4.00, 2.53 ], std: [ 2.59, 1.02 ], fq: 18
  },
  "feed": {
    dict: "anew-neg-stem", word: "feeds", stem: "feed",
    ant: [ "starve" ],
    avg: [ 4.00, 2.53 ], std: [ 2.59, 1.02 ], fq: 18
  },
  "feed": {
    dict: "anew-neg-stem", word: "feed", stem: "feed",
    ant: [ "starve" ],
    avg: [ 4.00, 2.53 ], std: [ 2.59, 1.02 ], fq: 18
  },
  "feet": {
    dict: "anew-neg-stem", word: "feet", stem: "feet",
    ant: [ "head" ],
    avg: [ 5.00, 5.96 ], std: [ 2.68, 1.07 ], fq: 50
  },
  "fell": {
    dict: "anew-neg-stem", word: "fell", stem: "fell",
    ant: [ "ascend" ],
    avg: [ 4.13, 6.19 ], std: [ 2.53, 1.50 ], fq: 22
  },
  "femal": {
    dict: "anew-neg-stem", word: "female", stem: "femal",
    ant: [ "male" ],
    avg: [ 5.24, 6.02 ], std: [ 2.31, 1.36 ], fq: 50
  },
  "fidel": {
    dict: "anew-neg-stem", word: "fidelity", stem: "fidel",
    ant: [ "infidelity" ],
    avg: [ 5.70, 2.10 ], std: [ 2.57, 1.62 ], fq: 21
  },
  "figur": {
    dict: "anew-neg-stem", word: "figure", stem: "figur",
    ant: [ "ground" ],
    avg: [ 4.58, 5.26 ], std: [ 2.14, 1.29 ], fq: 50
  },
  "figur": {
    dict: "anew-neg-stem", word: "figures", stem: "figur",
    ant: [ "ground" ],
    avg: [ 4.58, 5.26 ], std: [ 2.14, 1.29 ], fq: 50
  },
  "fill": {
    dict: "anew-neg-stem", word: "filling", stem: "fill",
    ant: [ "empty" ],
    avg: [ 5.64, 3.56 ], std: [ 2.99, 1.63 ], fq: 50
  },
  "fill": {
    dict: "anew-neg-stem", word: "filled", stem: "fill",
    ant: [ "empty" ],
    avg: [ 5.64, 3.56 ], std: [ 2.99, 1.63 ], fq: 50
  },
  "fill": {
    dict: "anew-neg-stem", word: "fills", stem: "fill",
    ant: [ "empty" ],
    avg: [ 5.64, 3.56 ], std: [ 2.99, 1.63 ], fq: 50
  },
  "fill": {
    dict: "anew-neg-stem", word: "fill", stem: "fill",
    ant: [ "empty" ],
    avg: [ 5.64, 3.56 ], std: [ 2.99, 1.63 ], fq: 50
  },
  "find": {
    dict: "anew-neg-stem", word: "findings", stem: "find",
    ant: [ "lose" ],
    avg: [ 5.43, 3.59 ], std: [ 2.69, 2.09 ], fq: 21
  },
  "find": {
    dict: "anew-neg-stem", word: "finding", stem: "find",
    ant: [ "lose" ],
    avg: [ 5.43, 3.59 ], std: [ 2.69, 2.09 ], fq: 21
  },
  "find": {
    dict: "anew-neg-stem", word: "find", stem: "find",
    ant: [ "lose" ],
    avg: [ 5.43, 3.59 ], std: [ 2.69, 2.09 ], fq: 21
  },
  "find": {
    dict: "anew-neg-stem", word: "finds", stem: "find",
    ant: [ "lose" ],
    avg: [ 5.43, 3.59 ], std: [ 2.69, 2.09 ], fq: 21
  },
  "fine": {
    dict: "anew-neg-stem", word: "fine", stem: "fine",
    ant: [ "coarse" ],
    avg: [ 4.21, 4.55 ], std: [ 1.84, 1.42 ], fq: 10
  },
  "finish": {
    dict: "anew-neg-stem", word: "finish", stem: "finish",
    ant: [ "beginning", "start", "begin" ],
    avg: [ 3.24, 6.29 ], std: [ 2.40, 1.92 ], fq: 88
  },
  "fire": {
    dict: "anew-neg-stem", word: "fired", stem: "fire",
    ant: [ "hire" ],
    avg: [ 6.77, 6.50 ], std: [ 2.07, 1.34 ], fq: 50
  },
  "fire": {
    dict: "anew-neg-stem", word: "fires", stem: "fire",
    ant: [ "hire" ],
    avg: [ 6.77, 6.50 ], std: [ 2.07, 1.34 ], fq: 50
  },
  "fire": {
    dict: "anew-neg-stem", word: "fire", stem: "fire",
    ant: [ "hire" ],
    avg: [ 6.77, 6.50 ], std: [ 2.07, 1.34 ], fq: 50
  },
  "first": {
    dict: "anew-neg-stem", word: "first", stem: "first",
    ant: [ "end", "last", "second" ],
    avg: [ 4.29, 4.53 ], std: [ 2.83, 1.42 ], fq: 150
  },
  "fit": {
    dict: "anew-neg-stem", word: "fit", stem: "fit",
    ant: [ "disagree", "unfit" ],
    avg: [ 4.33, 2.89 ], std: [ 2.07, 1.28 ], fq: 39
  },
  "fix": {
    dict: "anew-neg-stem", word: "fix", stem: "fix",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "fix": {
    dict: "anew-neg-stem", word: "fixing", stem: "fix",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "fix": {
    dict: "anew-neg-stem", word: "fixed", stem: "fix",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "flat": {
    dict: "anew-neg-stem", word: "flat", stem: "flat",
    ant: [ "natural" ],
    avg: [ 4.37, 6.56 ], std: [ 2.51, 1.49 ], fq: 50
  },
  "flatter": {
    dict: "anew-neg-stem", word: "flatter", stem: "flatter",
    ant: [ "disparage", "natural" ],
    avg: [ 4.14, 4.63 ], std: [ 2.26, 1.38 ], fq: 72
  },
  "flatter": {
    dict: "anew-neg-stem", word: "flattered", stem: "flatter",
    ant: [ "disparage" ],
    avg: [ 3.96, 3.00 ], std: [ 1.97, 1.26 ], fq: 22
  },
  "flatter": {
    dict: "anew-neg-stem", word: "flattering", stem: "flatter",
    ant: [ "disparage" ],
    avg: [ 3.96, 3.00 ], std: [ 1.97, 1.26 ], fq: 22
  },
  "flex": {
    dict: "anew-neg-stem", word: "flex", stem: "flex",
    ant: [ "straighten" ],
    avg: [ 3.00, 6.26 ], std: [ 2.30, 1.76 ], fq: 20
  },
  "flexibl": {
    dict: "anew-neg-stem", word: "flexible", stem: "flexibl",
    ant: [ "uncompromising" ],
    avg: [ 5.17, 3.95 ], std: [ 2.12, 1.72 ], fq: 22
  },
  "flunk": {
    dict: "anew-neg-stem", word: "flunk", stem: "flunk",
    ant: [ "passing", "pass" ],
    avg: [ 4.52, 5.69 ], std: [ 2.31, 1.59 ], fq: 100
  },
  "foe": {
    dict: "anew-neg-stem", word: "foe", stem: "foe",
    ant: [ "friend" ],
    avg: [ 5.11, 7.66 ], std: [ 2.96, 1.51 ], fq: 50
  },
  "follow": {
    dict: "anew-neg-stem", word: "following", stem: "follow",
    ant: [ "leading" ],
    avg: [ 5.83, 6.64 ], std: [ 2.44, 1.51 ], fq: 50
  },
  "foolish": {
    dict: "anew-neg-stem", word: "foolish", stem: "foolish",
    ant: [ "wise" ],
    avg: [ 3.91, 7.10 ], std: [ 2.64, 1.27 ], fq: 50
  },
  "foot": {
    dict: "anew-neg-stem", word: "foot", stem: "foot",
    ant: [ "head" ],
    avg: [ 5.00, 5.96 ], std: [ 2.68, 1.07 ], fq: 50
  },
  "forbid": {
    dict: "anew-neg-stem", word: "forbidding", stem: "forbid",
    ant: [ "allow" ],
    avg: [ 3.27, 6.00 ], std: [ 2.05, 1.47 ], fq: 50
  },
  "forbid": {
    dict: "anew-neg-stem", word: "forbid", stem: "forbid",
    ant: [ "allow" ],
    avg: [ 3.27, 6.00 ], std: [ 2.05, 1.47 ], fq: 50
  },
  "forc": {
    dict: "anew-neg-stem", word: "force", stem: "forc",
    ant: [ "push" ],
    avg: [ 6.44, 4.44 ], std: [ 2.58, 1.47 ], fq: 50
  },
  "forc": {
    dict: "anew-neg-stem", word: "forced", stem: "forc",
    ant: [ "push" ],
    avg: [ 6.44, 4.44 ], std: [ 2.58, 1.47 ], fq: 50
  },
  "forc": {
    dict: "anew-neg-stem", word: "forces", stem: "forc",
    ant: [ "push" ],
    avg: [ 6.44, 4.44 ], std: [ 2.58, 1.47 ], fq: 50
  },
  "forfeit": {
    dict: "anew-neg-stem", word: "forfeit", stem: "forfeit",
    ant: [ "claim" ],
    avg: [ 5.65, 5.18 ], std: [ 2.23, 1.49 ], fq: 50
  },
  "forget": {
    dict: "anew-neg-stem", word: "forget", stem: "forget",
    ant: [ "remember", "mind" ],
    avg: [ 3.91, 6.27 ], std: [ 2.31, 1.29 ], fq: 71
  },
  "forget": {
    dict: "anew-neg-stem", word: "forgetful", stem: "forget",
    ant: [ "mindful" ],
    avg: [ 6.00, 6.70 ], std: [ 2.70, 1.30 ], fq: 20
  },
  "forgiv": {
    dict: "anew-neg-stem", word: "forgiving", stem: "forgiv",
    ant: [ "unforgiving" ],
    avg: [ 4.81, 2.41 ], std: [ 2.30, 1.59 ], fq: 24
  },
  "fortun": {
    dict: "anew-neg-stem", word: "fortunate", stem: "fortun",
    ant: [ "unfortunate" ],
    avg: [ 3.52, 3.33 ], std: [ 2.35, 1.49 ], fq: 24
  },
  "foul": {
    dict: "anew-neg-stem", word: "foul", stem: "foul",
    ant: [ "fair" ],
    avg: [ 5.32, 6.96 ], std: [ 1.92, 1.26 ], fq: 50
  },
  "found": {
    dict: "anew-neg-stem", word: "founded", stem: "found",
    ant: [ "abolish" ],
    avg: [ 4.18, 3.84 ], std: [ 2.07, 1.54 ], fq: 18
  },
  "found": {
    dict: "anew-neg-stem", word: "found", stem: "found",
    ant: [ "abolish", "lose", "lost" ],
    avg: [ 5.06, 3.35 ], std: [ 2.48, 1.70 ], fq: 89
  },
  "found": {
    dict: "anew-neg-stem", word: "founding", stem: "found",
    ant: [ "abolish" ],
    avg: [ 4.18, 3.84 ], std: [ 2.07, 1.54 ], fq: 18
  },
  "frail": {
    dict: "anew-neg-stem", word: "frail", stem: "frail",
    ant: [ "robust" ],
    avg: [ 5.24, 6.10 ], std: [ 2.74, 1.33 ], fq: 20
  },
  "free": {
    dict: "anew-neg-stem", word: "free", stem: "free",
    ant: [ "confine", "lodge", "obstruct", "blame", "block", "bound" ],
    avg: [ 4.23, 4.05 ], std: [ 2.33, 1.41 ], fq: 212
  },
  "fresh": {
    dict: "anew-neg-stem", word: "fresh", stem: "fresh",
    ant: [ "stale", "preserved" ],
    avg: [ 3.75, 4.86 ], std: [ 2.07, 1.40 ], fq: 71
  },
  "freshen": {
    dict: "anew-neg-stem", word: "freshen", stem: "freshen",
    ant: [ "tire" ],
    avg: [ 2.83, 4.65 ], std: [ 2.31, 1.49 ], fq: 50
  },
  "friend": {
    dict: "anew-neg-stem", word: "friend", stem: "friend",
    ant: [ "foe", "stranger" ],
    avg: [ 5.13, 3.78 ], std: [ 2.52, 1.32 ], fq: 72
  },
  "friend": {
    dict: "anew-neg-stem", word: "friends", stem: "friend",
    ant: [ "foe", "stranger" ],
    avg: [ 5.13, 3.78 ], std: [ 2.52, 1.32 ], fq: 72
  },
  "friendli": {
    dict: "anew-neg-stem", word: "friendly", stem: "friendli",
    ant: [ "hostile", "unfriendly" ],
    avg: [ 5.31, 2.65 ], std: [ 2.41, 1.92 ], fq: 70
  },
  "front": {
    dict: "anew-neg-stem", word: "front", stem: "front",
    ant: [ "rear", "back" ],
    avg: [ 3.49, 5.15 ], std: [ 1.87, 1.36 ], fq: 100
  },
  "full": {
    dict: "anew-neg-stem", word: "fullness", stem: "full",
    ant: [ "emptiness" ],
    avg: [ 4.98, 3.35 ], std: [ 2.31, 1.97 ], fq: 50
  },
  "full": {
    dict: "anew-neg-stem", word: "full", stem: "full",
    ant: [ "empty", "thin" ],
    avg: [ 5.28, 4.74 ], std: [ 2.68, 1.51 ], fq: 100
  },
  "function": {
    dict: "anew-neg-stem", word: "function", stem: "function",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "function": {
    dict: "anew-neg-stem", word: "functions", stem: "function",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "gain": {
    dict: "anew-neg-stem", word: "gains", stem: "gain",
    ant: [ "loss", "lose", "reduce" ],
    avg: [ 5.10, 3.48 ], std: [ 2.30, 1.65 ], fq: 121
  },
  "gain": {
    dict: "anew-neg-stem", word: "gained", stem: "gain",
    ant: [ "lose", "reduce" ],
    avg: [ 4.99, 3.96 ], std: [ 2.43, 1.73 ], fq: 71
  },
  "gain": {
    dict: "anew-neg-stem", word: "gain", stem: "gain",
    ant: [ "loss", "lose", "reduce" ],
    avg: [ 5.10, 3.48 ], std: [ 2.30, 1.65 ], fq: 121
  },
  "garment": {
    dict: "anew-neg-stem", word: "garment", stem: "garment",
    ant: [ "undress" ],
    avg: [ 5.96, 6.14 ], std: [ 2.77, 1.74 ], fq: 22
  },
  "gave": {
    dict: "anew-neg-stem", word: "gave", stem: "gave",
    ant: [ "take", "starve" ],
    avg: [ 4.75, 3.60 ], std: [ 2.41, 1.29 ], fq: 68
  },
  "gener": {
    dict: "anew-neg-stem", word: "generous", stem: "gener",
    ant: [ "stingy" ],
    avg: [ 4.73, 2.53 ], std: [ 3.27, 1.47 ], fq: 20
  },
  "genuin": {
    dict: "anew-neg-stem", word: "genuine", stem: "genuin",
    ant: [ "counterfeit" ],
    avg: [ 4.18, 3.16 ], std: [ 2.86, 1.54 ], fq: 20
  },
  "geograph": {
    dict: "anew-neg-stem", word: "geographic", stem: "geograph",
    ant: [ "magnetic" ],
    avg: [ 3.55, 6.17 ], std: [ 2.56, 1.47 ], fq: 19
  },
  "geograph": {
    dict: "anew-neg-stem", word: "geographical", stem: "geograph",
    ant: [ "magnetic" ],
    avg: [ 3.55, 6.17 ], std: [ 2.56, 1.47 ], fq: 19
  },
  "get": {
    dict: "anew-neg-stem", word: "get", stem: "get",
    ant: [ "leave", "end" ],
    avg: [ 4.14, 4.45 ], std: [ 2.69, 1.55 ], fq: 100
  },
  "get": {
    dict: "anew-neg-stem", word: "gets", stem: "get",
    ant: [ "leave", "end" ],
    avg: [ 4.14, 4.45 ], std: [ 2.69, 1.55 ], fq: 100
  },
  "get": {
    dict: "anew-neg-stem", word: "getting", stem: "get",
    ant: [ "leave", "end" ],
    avg: [ 4.14, 4.45 ], std: [ 2.69, 1.55 ], fq: 100
  },
  "girl": {
    dict: "anew-neg-stem", word: "girls", stem: "girl",
    ant: [ "boy", "son" ],
    avg: [ 4.58, 6.61 ], std: [ 2.37, 1.57 ], fq: 100
  },
  "girl": {
    dict: "anew-neg-stem", word: "girl", stem: "girl",
    ant: [ "boy", "son" ],
    avg: [ 4.58, 6.61 ], std: [ 2.37, 1.57 ], fq: 100
  },
  "give": {
    dict: "anew-neg-stem", word: "give", stem: "give",
    ant: [ "take", "starve" ],
    avg: [ 4.75, 3.60 ], std: [ 2.41, 1.29 ], fq: 68
  },
  "give": {
    dict: "anew-neg-stem", word: "gives", stem: "give",
    ant: [ "take", "starve" ],
    avg: [ 4.75, 3.60 ], std: [ 2.41, 1.29 ], fq: 68
  },
  "give": {
    dict: "anew-neg-stem", word: "giving", stem: "give",
    ant: [ "take", "starve" ],
    avg: [ 4.75, 3.60 ], std: [ 2.41, 1.29 ], fq: 68
  },
  "given": {
    dict: "anew-neg-stem", word: "given", stem: "given",
    ant: [ "take", "starve" ],
    avg: [ 4.75, 3.60 ], std: [ 2.41, 1.29 ], fq: 68
  },
  "glad": {
    dict: "anew-neg-stem", word: "glad", stem: "glad",
    ant: [ "sad" ],
    avg: [ 4.13, 2.38 ], std: [ 2.38, 1.61 ], fq: 50
  },
  "go": {
    dict: "anew-neg-stem", word: "goed", stem: "go",
    ant: [ "come", "malfunction", "stop" ],
    avg: [ 4.76, 4.36 ], std: [ 2.58, 1.29 ], fq: 120
  },
  "go": {
    dict: "anew-neg-stem", word: "going", stem: "go",
    ant: [ "come", "malfunction", "stop" ],
    avg: [ 4.76, 4.36 ], std: [ 2.58, 1.29 ], fq: 120
  },
  "go": {
    dict: "anew-neg-stem", word: "go", stem: "go",
    ant: [ "come", "malfunction", "stop" ],
    avg: [ 4.76, 4.36 ], std: [ 2.58, 1.29 ], fq: 120
  },
  "goe": {
    dict: "anew-neg-stem", word: "goes", stem: "goe",
    ant: [ "come", "malfunction", "stop" ],
    avg: [ 4.76, 4.36 ], std: [ 2.58, 1.29 ], fq: 120
  },
  "gone": {
    dict: "anew-neg-stem", word: "gone", stem: "gone",
    ant: [ "come", "malfunction", "stop" ],
    avg: [ 4.76, 4.36 ], std: [ 2.58, 1.29 ], fq: 120
  },
  "good": {
    dict: "anew-neg-stem", word: "goods", stem: "good",
    ant: [ "evil", "bad", "badness" ],
    avg: [ 5.57, 2.58 ], std: [ 2.58, 1.62 ], fq: 120
  },
  "good": {
    dict: "anew-neg-stem", word: "good", stem: "good",
    ant: [ "evil", "bad", "badness", "ill" ],
    avg: [ 5.34, 2.53 ], std: [ 2.50, 1.53 ], fq: 170
  },
  "good": {
    dict: "anew-neg-stem", word: "goodness", stem: "good",
    ant: [ "bad", "badness", "evil" ],
    avg: [ 5.57, 2.58 ], std: [ 2.58, 1.62 ], fq: 120
  },
  "got": {
    dict: "anew-neg-stem", word: "got", stem: "got",
    ant: [ "leave", "end" ],
    avg: [ 4.14, 4.45 ], std: [ 2.69, 1.55 ], fq: 100
  },
  "gotten": {
    dict: "anew-neg-stem", word: "gotten", stem: "gotten",
    ant: [ "leave", "end" ],
    avg: [ 4.14, 4.45 ], std: [ 2.69, 1.55 ], fq: 100
  },
  "grace": {
    dict: "anew-neg-stem", word: "graceful", stem: "grace",
    ant: [ "awkward" ],
    avg: [ 5.18, 3.62 ], std: [ 2.40, 1.40 ], fq: 50
  },
  "grate": {
    dict: "anew-neg-stem", word: "grateful", stem: "grate",
    ant: [ "ungrateful" ],
    avg: [ 4.71, 2.68 ], std: [ 2.24, 1.45 ], fq: 20
  },
  "grime": {
    dict: "anew-neg-stem", word: "grime", stem: "grime",
    ant: [ "clean" ],
    avg: [ 4.37, 6.90 ], std: [ 2.14, 1.90 ], fq: 50
  },
  "gross": {
    dict: "anew-neg-stem", word: "gross", stem: "gross",
    ant: [ "net" ],
    avg: [ 6.68, 5.96 ], std: [ 1.78, 1.03 ], fq: 50
  },
  "ground": {
    dict: "anew-neg-stem", word: "ground", stem: "ground",
    ant: [ "figure" ],
    avg: [ 4.75, 5.50 ], std: [ 1.93, 1.15 ], fq: 50
  },
  "ground": {
    dict: "anew-neg-stem", word: "grounds", stem: "ground",
    ant: [ "figure" ],
    avg: [ 4.75, 5.50 ], std: [ 1.93, 1.15 ], fq: 50
  },
  "guilt": {
    dict: "anew-neg-stem", word: "guilt", stem: "guilt",
    ant: [ "innocence" ],
    avg: [ 4.21, 6.50 ], std: [ 1.99, 1.73 ], fq: 50
  },
  "guilti": {
    dict: "anew-neg-stem", word: "guilty", stem: "guilti",
    ant: [ "innocent" ],
    avg: [ 4.21, 6.36 ], std: [ 1.99, 1.38 ], fq: 50
  },
  "happi": {
    dict: "anew-neg-stem", word: "happy", stem: "happi",
    ant: [ "unhappy" ],
    avg: [ 4.18, 2.12 ], std: [ 2.50, 1.36 ], fq: 50
  },
  "happi": {
    dict: "anew-neg-stem", word: "happiness", stem: "happi",
    ant: [ "unhappiness", "sadness" ],
    avg: [ 4.26, 1.88 ], std: [ 2.62, 1.22 ], fq: 70
  },
  "hard": {
    dict: "anew-neg-stem", word: "hard", stem: "hard",
    ant: [ "easy", "soft" ],
    avg: [ 4.56, 6.60 ], std: [ 2.72, 1.42 ], fq: 100
  },
  "harder": {
    dict: "anew-neg-stem", word: "harder", stem: "harder",
    ant: [ "easy", "soft" ],
    avg: [ 4.56, 6.60 ], std: [ 2.72, 1.42 ], fq: 100
  },
  "hardest": {
    dict: "anew-neg-stem", word: "hardest", stem: "hardest",
    ant: [ "easy", "soft" ],
    avg: [ 4.56, 6.60 ], std: [ 2.72, 1.42 ], fq: 100
  },
  "hardwar": {
    dict: "anew-neg-stem", word: "hardware", stem: "hardwar",
    ant: [ "software" ],
    avg: [ 3.83, 6.37 ], std: [ 2.48, 1.57 ], fq: 21
  },
  "harm": {
    dict: "anew-neg-stem", word: "harmful", stem: "harm",
    ant: [ "harmless" ],
    avg: [ 3.50, 6.59 ], std: [ 2.64, 1.44 ], fq: 20
  },
  "harmless": {
    dict: "anew-neg-stem", word: "harmless", stem: "harmless",
    ant: [ "harmful" ],
    avg: [ 4.89, 2.29 ], std: [ 2.62, 1.95 ], fq: 20
  },
  "harsh": {
    dict: "anew-neg-stem", word: "harsh", stem: "harsh",
    ant: [ "fine" ],
    avg: [ 3.86, 6.50 ], std: [ 2.43, 1.41 ], fq: 21
  },
  "hate": {
    dict: "anew-neg-stem", word: "hating", stem: "hate",
    ant: [ "love" ],
    avg: [ 6.38, 8.42 ], std: [ 2.68, 1.11 ], fq: 50
  },
  "hate": {
    dict: "anew-neg-stem", word: "hate", stem: "hate",
    ant: [ "love" ],
    avg: [ 6.38, 8.42 ], std: [ 2.68, 1.11 ], fq: 50
  },
  "hate": {
    dict: "anew-neg-stem", word: "hated", stem: "hate",
    ant: [ "love" ],
    avg: [ 6.38, 8.42 ], std: [ 2.68, 1.11 ], fq: 50
  },
  "hate": {
    dict: "anew-neg-stem", word: "hates", stem: "hate",
    ant: [ "love" ],
    avg: [ 6.38, 8.42 ], std: [ 2.68, 1.11 ], fq: 50
  },
  "hate": {
    dict: "anew-neg-stem", word: "hateful", stem: "hate",
    ant: [ "lovable" ],
    avg: [ 5.41, 8.26 ], std: [ 2.72, 0.99 ], fq: 20
  },
  "hatr": {
    dict: "anew-neg-stem", word: "hatred", stem: "hatr",
    ant: [ "love" ],
    avg: [ 6.38, 8.42 ], std: [ 2.68, 1.11 ], fq: 50
  },
  "hawk": {
    dict: "anew-neg-stem", word: "hawk", stem: "hawk",
    ant: [ "dove" ],
    avg: [ 3.79, 7.04 ], std: [ 2.28, 1.44 ], fq: 50
  },
  "head": {
    dict: "anew-neg-stem", word: "head", stem: "head",
    ant: [ "rear", "foot", "tail" ],
    avg: [ 3.45, 5.26 ], std: [ 2.00, 1.43 ], fq: 150
  },
  "head": {
    dict: "anew-neg-stem", word: "heads", stem: "head",
    ant: [ "rear", "foot", "tail" ],
    avg: [ 3.45, 5.26 ], std: [ 2.00, 1.43 ], fq: 150
  },
  "health": {
    dict: "anew-neg-stem", word: "health", stem: "health",
    ant: [ "illness" ],
    avg: [ 4.71, 2.00 ], std: [ 2.24, 1.18 ], fq: 50
  },
  "healthi": {
    dict: "anew-neg-stem", word: "healthy", stem: "healthi",
    ant: [ "unhealthy" ],
    avg: [ 4.36, 2.55 ], std: [ 2.11, 1.47 ], fq: 21
  },
  "hear": {
    dict: "anew-neg-stem", word: "hearing", stem: "hear",
    ant: [ "deaf" ],
    avg: [ 3.18, 2.67 ], std: [ 1.85, 1.33 ], fq: 50
  },
  "heat": {
    dict: "anew-neg-stem", word: "heat", stem: "heat",
    ant: [ "cool" ],
    avg: [ 3.43, 6.82 ], std: [ 2.31, 1.56 ], fq: 21
  },
  "heavi": {
    dict: "anew-neg-stem", word: "heavy", stem: "heavi",
    ant: [ "light" ],
    avg: [ 5.40, 6.40 ], std: [ 2.33, 1.51 ], fq: 50
  },
  "held": {
    dict: "anew-neg-stem", word: "held", stem: "held",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "hid": {
    dict: "anew-neg-stem", word: "hid", stem: "hid",
    ant: [ "show" ],
    avg: [ 5.12, 6.24 ], std: [ 2.39, 1.49 ], fq: 50
  },
  "hidden": {
    dict: "anew-neg-stem", word: "hidden", stem: "hidden",
    ant: [ "show" ],
    avg: [ 5.12, 6.24 ], std: [ 2.39, 1.49 ], fq: 50
  },
  "hide": {
    dict: "anew-neg-stem", word: "hide", stem: "hide",
    ant: [ "show" ],
    avg: [ 5.12, 6.24 ], std: [ 2.39, 1.49 ], fq: 50
  },
  "hide": {
    dict: "anew-neg-stem", word: "hides", stem: "hide",
    ant: [ "show" ],
    avg: [ 5.12, 6.24 ], std: [ 2.39, 1.49 ], fq: 50
  },
  "hide": {
    dict: "anew-neg-stem", word: "hiding", stem: "hide",
    ant: [ "show" ],
    avg: [ 5.12, 6.24 ], std: [ 2.39, 1.49 ], fq: 50
  },
  "high": {
    dict: "anew-neg-stem", word: "high", stem: "high",
    ant: [ "low" ],
    avg: [ 4.54, 3.66 ], std: [ 3.19, 1.12 ], fq: 50
  },
  "hire": {
    dict: "anew-neg-stem", word: "hiring", stem: "hire",
    ant: [ "fire" ],
    avg: [ 7.17, 3.80 ], std: [ 2.06, 1.58 ], fq: 50
  },
  "hire": {
    dict: "anew-neg-stem", word: "hire", stem: "hire",
    ant: [ "fire" ],
    avg: [ 7.17, 3.80 ], std: [ 2.06, 1.58 ], fq: 50
  },
  "hire": {
    dict: "anew-neg-stem", word: "hired", stem: "hire",
    ant: [ "fire" ],
    avg: [ 7.17, 3.80 ], std: [ 2.06, 1.58 ], fq: 50
  },
  "hiss": {
    dict: "anew-neg-stem", word: "hiss", stem: "hiss",
    ant: [ "applaud" ],
    avg: [ 5.05, 6.70 ], std: [ 1.75, 1.17 ], fq: 19
  },
  "hit": {
    dict: "anew-neg-stem", word: "hit", stem: "hit",
    ant: [ "miss" ],
    avg: [ 4.29, 3.64 ], std: [ 2.69, 1.63 ], fq: 50
  },
  "hit": {
    dict: "anew-neg-stem", word: "hitting", stem: "hit",
    ant: [ "miss" ],
    avg: [ 4.29, 3.64 ], std: [ 2.69, 1.63 ], fq: 50
  },
  "hit": {
    dict: "anew-neg-stem", word: "hits", stem: "hit",
    ant: [ "miss" ],
    avg: [ 4.29, 3.64 ], std: [ 2.69, 1.63 ], fq: 50
  },
  "hold": {
    dict: "anew-neg-stem", word: "hold", stem: "hold",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "hold": {
    dict: "anew-neg-stem", word: "holding", stem: "hold",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "hold": {
    dict: "anew-neg-stem", word: "holds", stem: "hold",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "hold": {
    dict: "anew-neg-stem", word: "holdings", stem: "hold",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "holi": {
    dict: "anew-neg-stem", word: "holy", stem: "holi",
    ant: [ "unholy" ],
    avg: [ 6.76, 2.73 ], std: [ 2.68, 1.40 ], fq: 50
  },
  "honest": {
    dict: "anew-neg-stem", word: "honest", stem: "honest",
    ant: [ "dishonest" ],
    avg: [ 4.95, 3.00 ], std: [ 2.24, 1.49 ], fq: 21
  },
  "honesti": {
    dict: "anew-neg-stem", word: "honesty", stem: "honesti",
    ant: [ "dishonesty" ],
    avg: [ 5.39, 2.05 ], std: [ 2.68, 0.89 ], fq: 19
  },
  "honor": {
    dict: "anew-neg-stem", word: "honored", stem: "honor",
    ant: [ "dishonor", "disrespect" ],
    avg: [ 5.07, 2.62 ], std: [ 2.25, 1.68 ], fq: 70
  },
  "honor": {
    dict: "anew-neg-stem", word: "honor", stem: "honor",
    ant: [ "dishonor", "disrespect" ],
    avg: [ 5.07, 2.62 ], std: [ 2.25, 1.68 ], fq: 70
  },
  "honor": {
    dict: "anew-neg-stem", word: "honorable", stem: "honor",
    ant: [ "dishonest", "dishonorable" ],
    avg: [ 5.40, 2.64 ], std: [ 2.03, 1.39 ], fq: 42
  },
  "honour": {
    dict: "anew-neg-stem", word: "honour", stem: "honour",
    ant: [ "dishonor", "disrespect" ],
    avg: [ 5.07, 2.62 ], std: [ 2.25, 1.68 ], fq: 70
  },
  "hope": {
    dict: "anew-neg-stem", word: "hopes", stem: "hope",
    ant: [ "despair" ],
    avg: [ 5.68, 2.82 ], std: [ 2.37, 2.01 ], fq: 50
  },
  "hope": {
    dict: "anew-neg-stem", word: "hope", stem: "hope",
    ant: [ "despair" ],
    avg: [ 5.68, 2.82 ], std: [ 2.37, 2.01 ], fq: 50
  },
  "hope": {
    dict: "anew-neg-stem", word: "hoping", stem: "hope",
    ant: [ "despair" ],
    avg: [ 5.68, 2.82 ], std: [ 2.37, 2.01 ], fq: 50
  },
  "hope": {
    dict: "anew-neg-stem", word: "hoped", stem: "hope",
    ant: [ "despair" ],
    avg: [ 5.68, 2.82 ], std: [ 2.37, 2.01 ], fq: 50
  },
  "hope": {
    dict: "anew-neg-stem", word: "hopeful", stem: "hope",
    ant: [ "hopeless" ],
    avg: [ 4.52, 2.20 ], std: [ 2.38, 1.20 ], fq: 22
  },
  "hopeless": {
    dict: "anew-neg-stem", word: "hopeless", stem: "hopeless",
    ant: [ "hopeful" ],
    avg: [ 4.84, 7.44 ], std: [ 2.64, 1.34 ], fq: 43
  },
  "hospit": {
    dict: "anew-neg-stem", word: "hospitable", stem: "hospit",
    ant: [ "inhospitable" ],
    avg: [ 4.36, 2.65 ], std: [ 2.22, 1.53 ], fq: 21
  },
  "hostil": {
    dict: "anew-neg-stem", word: "hostile", stem: "hostil",
    ant: [ "friendly" ],
    avg: [ 4.54, 7.66 ], std: [ 1.86, 1.55 ], fq: 50
  },
  "hot": {
    dict: "anew-neg-stem", word: "hot", stem: "hot",
    ant: [ "cold" ],
    avg: [ 5.19, 4.22 ], std: [ 2.23, 1.78 ], fq: 50
  },
  "hotter": {
    dict: "anew-neg-stem", word: "hotter", stem: "hotter",
    ant: [ "cold" ],
    avg: [ 5.19, 4.22 ], std: [ 2.23, 1.78 ], fq: 50
  },
  "hottest": {
    dict: "anew-neg-stem", word: "hottest", stem: "hottest",
    ant: [ "cold" ],
    avg: [ 5.19, 4.22 ], std: [ 2.23, 1.78 ], fq: 50
  },
  "human": {
    dict: "anew-neg-stem", word: "humane", stem: "human",
    ant: [ "inhumane" ],
    avg: [ 5.43, 3.10 ], std: [ 2.18, 2.36 ], fq: 21
  },
  "humbl": {
    dict: "anew-neg-stem", word: "humble", stem: "humbl",
    ant: [ "proud" ],
    avg: [ 5.56, 7.32 ], std: [ 3.01, 1.43 ], fq: 50
  },
  "hungri": {
    dict: "anew-neg-stem", word: "hungry", stem: "hungri",
    ant: [ "thirsty" ],
    avg: [ 5.13, 3.79 ], std: [ 2.44, 1.46 ], fq: 50
  },
  "husband": {
    dict: "anew-neg-stem", word: "husband", stem: "husband",
    ant: [ "wife", "waste" ],
    avg: [ 4.54, 4.14 ], std: [ 2.26, 1.48 ], fq: 100
  },
  "ignor": {
    dict: "anew-neg-stem", word: "ignored", stem: "ignor",
    ant: [ "notice", "know" ],
    avg: [ 5.13, 5.65 ], std: [ 2.62, 1.45 ], fq: 100
  },
  "ignor": {
    dict: "anew-neg-stem", word: "ignore", stem: "ignor",
    ant: [ "notice", "know" ],
    avg: [ 5.13, 5.65 ], std: [ 2.62, 1.45 ], fq: 100
  },
  "ill": {
    dict: "anew-neg-stem", word: "ill", stem: "ill",
    ant: [ "well" ],
    avg: [ 5.43, 6.68 ], std: [ 2.85, 1.25 ], fq: 50
  },
  "ill": {
    dict: "anew-neg-stem", word: "illness", stem: "ill",
    ant: [ "wellness" ],
    avg: [ 4.56, 7.67 ], std: [ 2.40, 1.28 ], fq: 23
  },
  "illog": {
    dict: "anew-neg-stem", word: "illogical", stem: "illog",
    ant: [ "logical" ],
    avg: [ 3.83, 6.38 ], std: [ 1.99, 2.25 ], fq: 22
  },
  "imbal": {
    dict: "anew-neg-stem", word: "imbalance", stem: "imbal",
    ant: [ "balance" ],
    avg: [ 4.13, 6.84 ], std: [ 2.03, 1.57 ], fq: 21
  },
  "immatur": {
    dict: "anew-neg-stem", word: "immature", stem: "immatur",
    ant: [ "old" ],
    avg: [ 4.48, 3.19 ], std: [ 2.66, 1.94 ], fq: 21
  },
  "immobil": {
    dict: "anew-neg-stem", word: "immobile", stem: "immobil",
    ant: [ "mobile" ],
    avg: [ 5.00, 6.36 ], std: [ 2.18, 1.21 ], fq: 50
  },
  "immor": {
    dict: "anew-neg-stem", word: "immoral", stem: "immor",
    ant: [ "moral" ],
    avg: [ 4.49, 6.54 ], std: [ 2.28, 1.86 ], fq: 50
  },
  "immort": {
    dict: "anew-neg-stem", word: "immortal", stem: "immort",
    ant: [ "mortal" ],
    avg: [ 4.19, 4.29 ], std: [ 2.45, 2.03 ], fq: 50
  },
  "impati": {
    dict: "anew-neg-stem", word: "impatient", stem: "impati",
    ant: [ "patient" ],
    avg: [ 4.21, 5.04 ], std: [ 2.37, 2.01 ], fq: 50
  },
  "impati": {
    dict: "anew-neg-stem", word: "impatience", stem: "impati",
    ant: [ "patience" ],
    avg: [ 3.16, 6.62 ], std: [ 1.55, 1.83 ], fq: 23
  },
  "imped": {
    dict: "anew-neg-stem", word: "impede", stem: "imped",
    ant: [ "free" ],
    avg: [ 5.15, 7.96 ], std: [ 3.04, 1.26 ], fq: 50
  },
  "imperson": {
    dict: "anew-neg-stem", word: "impersonal", stem: "imperson",
    ant: [ "personal" ],
    avg: [ 4.19, 6.06 ], std: [ 2.45, 1.22 ], fq: 50
  },
  "impolit": {
    dict: "anew-neg-stem", word: "impolite", stem: "impolit",
    ant: [ "polite" ],
    avg: [ 2.95, 6.57 ], std: [ 1.86, 1.93 ], fq: 22
  },
  "import": {
    dict: "anew-neg-stem", word: "important", stem: "import",
    ant: [ "insignificant" ],
    avg: [ 3.70, 3.64 ], std: [ 1.78, 2.08 ], fq: 21
  },
  "imposs": {
    dict: "anew-neg-stem", word: "impossible", stem: "imposs",
    ant: [ "possible" ],
    avg: [ 3.71, 7.14 ], std: [ 2.10, 0.99 ], fq: 21
  },
  "imposs": {
    dict: "anew-neg-stem", word: "impossibility", stem: "imposs",
    ant: [ "possibility" ],
    avg: [ 4.62, 6.40 ], std: [ 1.94, 1.25 ], fq: 50
  },
  "impot": {
    dict: "anew-neg-stem", word: "impotence", stem: "impot",
    ant: [ "power" ],
    avg: [ 5.83, 6.68 ], std: [ 2.69, 1.49 ], fq: 50
  },
  "improv": {
    dict: "anew-neg-stem", word: "improvement", stem: "improv",
    ant: [ "decline" ],
    avg: [ 6.37, 3.08 ], std: [ 2.56, 1.23 ], fq: 50
  },
  "improv": {
    dict: "anew-neg-stem", word: "improvements", stem: "improv",
    ant: [ "decline" ],
    avg: [ 6.37, 3.08 ], std: [ 2.56, 1.23 ], fq: 50
  },
  "impur": {
    dict: "anew-neg-stem", word: "impure", stem: "impur",
    ant: [ "pure", "clean" ],
    avg: [ 4.95, 6.89 ], std: [ 2.10, 1.65 ], fq: 100
  },
  "inabl": {
    dict: "anew-neg-stem", word: "inability", stem: "inabl",
    ant: [ "ability" ],
    avg: [ 5.83, 6.68 ], std: [ 2.69, 1.00 ], fq: 50
  },
  "inaccess": {
    dict: "anew-neg-stem", word: "inaccessible", stem: "inaccess",
    ant: [ "accessible" ],
    avg: [ 3.20, 6.68 ], std: [ 2.42, 1.38 ], fq: 22
  },
  "inaccur": {
    dict: "anew-neg-stem", word: "inaccurate", stem: "inaccur",
    ant: [ "accurate" ],
    avg: [ 4.35, 7.42 ], std: [ 2.25, 1.57 ], fq: 21
  },
  "inappropri": {
    dict: "anew-neg-stem", word: "inappropriate", stem: "inappropri",
    ant: [ "appropriate" ],
    avg: [ 3.27, 6.26 ], std: [ 2.05, 1.24 ], fq: 50
  },
  "inaud": {
    dict: "anew-neg-stem", word: "inaudible", stem: "inaud",
    ant: [ "audible" ],
    avg: [ 4.45, 6.05 ], std: [ 2.54, 1.60 ], fq: 21
  },
  "incap": {
    dict: "anew-neg-stem", word: "incapable", stem: "incap",
    ant: [ "capable" ],
    avg: [ 5.08, 6.74 ], std: [ 2.07, 1.68 ], fq: 50
  },
  "includ": {
    dict: "anew-neg-stem", word: "include", stem: "includ",
    ant: [ "exclude" ],
    avg: [ 4.81, 3.55 ], std: [ 2.11, 1.57 ], fq: 20
  },
  "incompat": {
    dict: "anew-neg-stem", word: "incompatible", stem: "incompat",
    ant: [ "compatible" ],
    avg: [ 4.04, 6.29 ], std: [ 2.12, 1.79 ], fq: 22
  },
  "incompet": {
    dict: "anew-neg-stem", word: "incompetent", stem: "incompet",
    ant: [ "competent" ],
    avg: [ 4.09, 6.05 ], std: [ 2.66, 2.06 ], fq: 22
  },
  "incompet": {
    dict: "anew-neg-stem", word: "incompetence", stem: "incompet",
    ant: [ "competence" ],
    avg: [ 3.72, 6.15 ], std: [ 2.67, 2.08 ], fq: 19
  },
  "incomplet": {
    dict: "anew-neg-stem", word: "incomplete", stem: "incomplet",
    ant: [ "complete" ],
    avg: [ 5.95, 6.74 ], std: [ 2.73, 1.24 ], fq: 50
  },
  "inconsider": {
    dict: "anew-neg-stem", word: "inconsiderate", stem: "inconsider",
    ant: [ "considerate" ],
    avg: [ 3.67, 7.20 ], std: [ 2.59, 1.20 ], fq: 20
  },
  "inconsist": {
    dict: "anew-neg-stem", word: "inconsistent", stem: "inconsist",
    ant: [ "consistent" ],
    avg: [ 3.19, 6.43 ], std: [ 1.72, 1.66 ], fq: 21
  },
  "inconveni": {
    dict: "anew-neg-stem", word: "inconvenient", stem: "inconveni",
    ant: [ "convenient" ],
    avg: [ 3.48, 7.15 ], std: [ 2.04, 1.50 ], fq: 20
  },
  "inconveni": {
    dict: "anew-neg-stem", word: "inconvenience", stem: "inconveni",
    ant: [ "convenience" ],
    avg: [ 3.50, 7.14 ], std: [ 2.28, 1.93 ], fq: 20
  },
  "incorrect": {
    dict: "anew-neg-stem", word: "incorrect", stem: "incorrect",
    ant: [ "correct", "right" ],
    avg: [ 4.61, 6.68 ], std: [ 2.53, 1.88 ], fq: 69
  },
  "incorrectli": {
    dict: "anew-neg-stem", word: "incorrectly", stem: "incorrectli",
    ant: [ "right" ],
    avg: [ 5.61, 6.54 ], std: [ 2.38, 1.27 ], fq: 50
  },
  "incred": {
    dict: "anew-neg-stem", word: "incredible", stem: "incred",
    ant: [ "credible" ],
    avg: [ 3.95, 6.95 ], std: [ 2.82, 1.36 ], fq: 20
  },
  "indecis": {
    dict: "anew-neg-stem", word: "indecisive", stem: "indecis",
    ant: [ "decisive" ],
    avg: [ 3.95, 6.78 ], std: [ 2.46, 1.52 ], fq: 19
  },
  "indirect": {
    dict: "anew-neg-stem", word: "indirect", stem: "indirect",
    ant: [ "direct" ],
    avg: [ 3.98, 5.68 ], std: [ 2.33, 1.33 ], fq: 50
  },
  "individu": {
    dict: "anew-neg-stem", word: "individual", stem: "individu",
    ant: [ "common" ],
    avg: [ 4.28, 4.92 ], std: [ 2.46, 1.26 ], fq: 50
  },
  "indoor": {
    dict: "anew-neg-stem", word: "indoor", stem: "indoor",
    ant: [ "outdoor" ],
    avg: [ 5.92, 6.94 ], std: [ 2.55, 1.24 ], fq: 50
  },
  "ineffect": {
    dict: "anew-neg-stem", word: "ineffective", stem: "ineffect",
    ant: [ "effective" ],
    avg: [ 5.43, 6.76 ], std: [ 2.85, 1.29 ], fq: 50
  },
  "ineffectu": {
    dict: "anew-neg-stem", word: "ineffectual", stem: "ineffectu",
    ant: [ "effective" ],
    avg: [ 5.43, 6.76 ], std: [ 2.85, 1.29 ], fq: 50
  },
  "inexpens": {
    dict: "anew-neg-stem", word: "inexpensive", stem: "inexpens",
    ant: [ "expensive" ],
    avg: [ 6.10, 3.36 ], std: [ 2.38, 1.99 ], fq: 21
  },
  "inexperienc": {
    dict: "anew-neg-stem", word: "inexperienced", stem: "inexperienc",
    ant: [ "experienced" ],
    avg: [ 5.53, 6.82 ], std: [ 2.90, 1.17 ], fq: 50
  },
  "inferior": {
    dict: "anew-neg-stem", word: "inferior", stem: "inferior",
    ant: [ "superior" ],
    avg: [ 5.20, 6.08 ], std: [ 2.85, 1.52 ], fq: 50
  },
  "infidel": {
    dict: "anew-neg-stem", word: "infidelity", stem: "infidel",
    ant: [ "fidelity" ],
    avg: [ 3.83, 6.70 ], std: [ 1.76, 1.49 ], fq: 19
  },
  "inhospit": {
    dict: "anew-neg-stem", word: "inhospitable", stem: "inhospit",
    ant: [ "hospitable" ],
    avg: [ 3.62, 7.00 ], std: [ 2.13, 1.62 ], fq: 20
  },
  "inhuman": {
    dict: "anew-neg-stem", word: "inhumane", stem: "inhuman",
    ant: [ "humane" ],
    avg: [ 3.21, 6.88 ], std: [ 1.94, 1.48 ], fq: 42
  },
  "injustic": {
    dict: "anew-neg-stem", word: "injustice", stem: "injustic",
    ant: [ "justice" ],
    avg: [ 5.47, 6.74 ], std: [ 2.54, 1.96 ], fq: 50
  },
  "innoc": {
    dict: "anew-neg-stem", word: "innocent", stem: "innoc",
    ant: [ "guilty" ],
    avg: [ 6.04, 2.64 ], std: [ 2.76, 1.59 ], fq: 50
  },
  "innoc": {
    dict: "anew-neg-stem", word: "innocence", stem: "innoc",
    ant: [ "guilt" ],
    avg: [ 6.04, 2.58 ], std: [ 2.76, 1.46 ], fq: 50
  },
  "insan": {
    dict: "anew-neg-stem", word: "insane", stem: "insan",
    ant: [ "sane" ],
    avg: [ 3.81, 6.73 ], std: [ 2.44, 1.42 ], fq: 21
  },
  "insecur": {
    dict: "anew-neg-stem", word: "insecurity", stem: "insecur",
    ant: [ "security" ],
    avg: [ 3.14, 6.10 ], std: [ 2.47, 1.63 ], fq: 50
  },
  "insecur": {
    dict: "anew-neg-stem", word: "insecure", stem: "insecur",
    ant: [ "secure" ],
    avg: [ 3.14, 6.92 ], std: [ 2.47, 1.29 ], fq: 50
  },
  "insensit": {
    dict: "anew-neg-stem", word: "insensitive", stem: "insensit",
    ant: [ "sensitive" ],
    avg: [ 4.88, 4.86 ], std: [ 2.30, 1.41 ], fq: 50
  },
  "insignific": {
    dict: "anew-neg-stem", word: "insignificant", stem: "insignific",
    ant: [ "significant" ],
    avg: [ 4.90, 6.60 ], std: [ 2.51, 1.27 ], fq: 20
  },
  "inspir": {
    dict: "anew-neg-stem", word: "inspire", stem: "inspir",
    ant: [ "exhale" ],
    avg: [ 3.75, 6.11 ], std: [ 2.20, 1.41 ], fq: 19
  },
  "inspir": {
    dict: "anew-neg-stem", word: "inspired", stem: "inspir",
    ant: [ "exhale" ],
    avg: [ 3.75, 6.11 ], std: [ 2.20, 1.41 ], fq: 19
  },
  "inspir": {
    dict: "anew-neg-stem", word: "inspiring", stem: "inspir",
    ant: [ "exhale" ],
    avg: [ 3.75, 6.11 ], std: [ 2.20, 1.41 ], fq: 19
  },
  "instabl": {
    dict: "anew-neg-stem", word: "instability", stem: "instabl",
    ant: [ "stability", "balance" ],
    avg: [ 3.27, 6.54 ], std: [ 1.77, 1.75 ], fq: 43
  },
  "instrument": {
    dict: "anew-neg-stem", word: "instrumental", stem: "instrument",
    ant: [ "vocal" ],
    avg: [ 6.07, 6.04 ], std: [ 2.42, 1.55 ], fq: 50
  },
  "insuffici": {
    dict: "anew-neg-stem", word: "insufficient", stem: "insuffici",
    ant: [ "sufficient" ],
    avg: [ 3.17, 6.10 ], std: [ 2.65, 1.61 ], fq: 22
  },
  "intellectu": {
    dict: "anew-neg-stem", word: "intellectual", stem: "intellectu",
    ant: [ "emotional" ],
    avg: [ 7.67, 4.42 ], std: [ 1.91, 1.76 ], fq: 50
  },
  "intellig": {
    dict: "anew-neg-stem", word: "intelligence", stem: "intellig",
    ant: [ "stupidity" ],
    avg: [ 4.50, 2.71 ], std: [ 2.93, 1.79 ], fq: 20
  },
  "interest": {
    dict: "anew-neg-stem", word: "interests", stem: "interest",
    ant: [ "bore" ],
    avg: [ 2.83, 3.64 ], std: [ 2.31, 1.59 ], fq: 50
  },
  "interest": {
    dict: "anew-neg-stem", word: "interest", stem: "interest",
    ant: [ "bore" ],
    avg: [ 2.83, 3.64 ], std: [ 2.31, 1.59 ], fq: 50
  },
  "interest": {
    dict: "anew-neg-stem", word: "interested", stem: "interest",
    ant: [ "bore" ],
    avg: [ 2.83, 3.64 ], std: [ 2.31, 1.59 ], fq: 50
  },
  "interest": {
    dict: "anew-neg-stem", word: "interesting", stem: "interest",
    ant: [ "bore" ],
    avg: [ 2.83, 3.64 ], std: [ 2.31, 1.59 ], fq: 50
  },
  "interior": {
    dict: "anew-neg-stem", word: "interior", stem: "interior",
    ant: [ "outside" ],
    avg: [ 5.92, 5.80 ], std: [ 2.55, 1.68 ], fq: 50
  },
  "interrog": {
    dict: "anew-neg-stem", word: "interrogation", stem: "interrog",
    ant: [ "answer" ],
    avg: [ 5.41, 6.24 ], std: [ 2.43, 1.57 ], fq: 50
  },
  "intoler": {
    dict: "anew-neg-stem", word: "intolerance", stem: "intoler",
    ant: [ "tolerance" ],
    avg: [ 3.36, 6.43 ], std: [ 2.30, 1.89 ], fq: 21
  },
  "invalid": {
    dict: "anew-neg-stem", word: "invalid", stem: "invalid",
    ant: [ "valid" ],
    avg: [ 4.00, 6.05 ], std: [ 2.41, 1.05 ], fq: 20
  },
  "invas": {
    dict: "anew-neg-stem", word: "invasive", stem: "invas",
    ant: [ "confined" ],
    avg: [ 5.49, 3.44 ], std: [ 2.67, 1.74 ], fq: 50
  },
  "invulner": {
    dict: "anew-neg-stem", word: "invulnerable", stem: "invulner",
    ant: [ "vulnerable" ],
    avg: [ 4.50, 3.57 ], std: [ 2.64, 1.72 ], fq: 22
  },
  "irrespons": {
    dict: "anew-neg-stem", word: "irresponsible", stem: "irrespons",
    ant: [ "responsible" ],
    avg: [ 3.00, 6.28 ], std: [ 2.17, 2.19 ], fq: 19
  },
  "irrit": {
    dict: "anew-neg-stem", word: "irritate", stem: "irrit",
    ant: [ "soothe" ],
    avg: [ 3.91, 6.63 ], std: [ 2.69, 1.86 ], fq: 20
  },
  "irrit": {
    dict: "anew-neg-stem", word: "irritating", stem: "irrit",
    ant: [ "soothe" ],
    avg: [ 3.91, 6.63 ], std: [ 2.69, 1.86 ], fq: 20
  },
  "jade": {
    dict: "anew-neg-stem", word: "jade", stem: "jade",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "jade": {
    dict: "anew-neg-stem", word: "jaded", stem: "jade",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "jam": {
    dict: "anew-neg-stem", word: "jam", stem: "jam",
    ant: [ "free" ],
    avg: [ 5.15, 7.96 ], std: [ 3.04, 1.26 ], fq: 50
  },
  "jame": {
    dict: "anew-neg-stem", word: "james", stem: "jame",
    ant: [ "free" ],
    avg: [ 5.15, 7.96 ], std: [ 3.04, 1.26 ], fq: 50
  },
  "joy": {
    dict: "anew-neg-stem", word: "joyful", stem: "joy",
    ant: [ "sorrowful" ],
    avg: [ 3.64, 3.43 ], std: [ 2.48, 2.06 ], fq: 23
  },
  "joy": {
    dict: "anew-neg-stem", word: "joy", stem: "joy",
    ant: [ "sorrow" ],
    avg: [ 5.74, 2.12 ], std: [ 2.32, 1.56 ], fq: 50
  },
  "justic": {
    dict: "anew-neg-stem", word: "justice", stem: "justic",
    ant: [ "injustice" ],
    avg: [ 6.45, 2.45 ], std: [ 1.88, 1.64 ], fq: 20
  },
  "justifi": {
    dict: "anew-neg-stem", word: "justified", stem: "justifi",
    ant: [ "blame" ],
    avg: [ 4.05, 2.82 ], std: [ 2.59, 1.53 ], fq: 50
  },
  "justifi": {
    dict: "anew-neg-stem", word: "justify", stem: "justifi",
    ant: [ "blame" ],
    avg: [ 4.05, 2.82 ], std: [ 2.59, 1.53 ], fq: 50
  },
  "juvenil": {
    dict: "anew-neg-stem", word: "juvenile", stem: "juvenil",
    ant: [ "adult" ],
    avg: [ 4.76, 6.14 ], std: [ 1.95, 1.34 ], fq: 50
  },
  "keep": {
    dict: "anew-neg-stem", word: "keeps", stem: "keep",
    ant: [ "discontinue", "lose", "break" ],
    avg: [ 4.36, 4.18 ], std: [ 2.20, 1.75 ], fq: 89
  },
  "keep": {
    dict: "anew-neg-stem", word: "keeping", stem: "keep",
    ant: [ "discontinue", "lose", "break" ],
    avg: [ 4.36, 4.18 ], std: [ 2.20, 1.75 ], fq: 89
  },
  "keep": {
    dict: "anew-neg-stem", word: "keep", stem: "keep",
    ant: [ "discontinue", "lose", "break" ],
    avg: [ 4.36, 4.18 ], std: [ 2.20, 1.75 ], fq: 89
  },
  "kept": {
    dict: "anew-neg-stem", word: "kept", stem: "kept",
    ant: [ "discontinue", "lose", "break", "broken" ],
    avg: [ 4.60, 3.86 ], std: [ 2.26, 1.67 ], fq: 139
  },
  "kick": {
    dict: "anew-neg-stem", word: "kicked", stem: "kick",
    ant: [ "cheer" ],
    avg: [ 6.12, 7.46 ], std: [ 2.45, 1.68 ], fq: 50
  },
  "kick": {
    dict: "anew-neg-stem", word: "kicking", stem: "kick",
    ant: [ "cheer" ],
    avg: [ 6.12, 7.46 ], std: [ 2.45, 1.68 ], fq: 50
  },
  "kick": {
    dict: "anew-neg-stem", word: "kicks", stem: "kick",
    ant: [ "cheer" ],
    avg: [ 6.12, 7.46 ], std: [ 2.45, 1.68 ], fq: 50
  },
  "kick": {
    dict: "anew-neg-stem", word: "kick", stem: "kick",
    ant: [ "cheer" ],
    avg: [ 6.12, 7.46 ], std: [ 2.45, 1.68 ], fq: 50
  },
  "kid": {
    dict: "anew-neg-stem", word: "kids", stem: "kid",
    ant: [ "parent" ],
    avg: [ 4.14, 6.73 ], std: [ 2.63, 1.91 ], fq: 21
  },
  "kid": {
    dict: "anew-neg-stem", word: "kid", stem: "kid",
    ant: [ "parent" ],
    avg: [ 4.14, 6.73 ], std: [ 2.63, 1.91 ], fq: 21
  },
  "kind": {
    dict: "anew-neg-stem", word: "kind", stem: "kind",
    ant: [ "unkind" ],
    avg: [ 4.24, 2.55 ], std: [ 2.07, 1.54 ], fq: 20
  },
  "king": {
    dict: "anew-neg-stem", word: "kings", stem: "king",
    ant: [ "queen" ],
    avg: [ 4.76, 6.24 ], std: [ 2.18, 1.79 ], fq: 50
  },
  "king": {
    dict: "anew-neg-stem", word: "king", stem: "king",
    ant: [ "queen" ],
    avg: [ 4.76, 6.24 ], std: [ 2.18, 1.79 ], fq: 50
  },
  "knew": {
    dict: "anew-neg-stem", word: "knew", stem: "knew",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "know": {
    dict: "anew-neg-stem", word: "knows", stem: "know",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "know": {
    dict: "anew-neg-stem", word: "knowing", stem: "know",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "know": {
    dict: "anew-neg-stem", word: "know", stem: "know",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "known": {
    dict: "anew-neg-stem", word: "known", stem: "known",
    ant: [ "ignore", "unknown" ],
    avg: [ 4.96, 3.61 ], std: [ 2.33, 1.44 ], fq: 100
  },
  "ladi": {
    dict: "anew-neg-stem", word: "lady", stem: "ladi",
    ant: [ "nobleman" ],
    avg: [ 4.00, 6.86 ], std: [ 2.07, 1.42 ], fq: 21
  },
  "last": {
    dict: "anew-neg-stem", word: "last", stem: "last",
    ant: [ "first" ],
    avg: [ 4.90, 7.33 ], std: [ 2.83, 1.28 ], fq: 19
  },
  "laugh": {
    dict: "anew-neg-stem", word: "laughs", stem: "laugh",
    ant: [ "cry" ],
    avg: [ 7.04, 1.84 ], std: [ 1.96, 1.28 ], fq: 50
  },
  "laugh": {
    dict: "anew-neg-stem", word: "laugh", stem: "laugh",
    ant: [ "cry" ],
    avg: [ 7.04, 1.84 ], std: [ 1.96, 1.28 ], fq: 50
  },
  "launch": {
    dict: "anew-neg-stem", word: "launch", stem: "launch",
    ant: [ "abolish" ],
    avg: [ 4.18, 3.84 ], std: [ 2.07, 1.54 ], fq: 18
  },
  "law": {
    dict: "anew-neg-stem", word: "lawful", stem: "law",
    ant: [ "unlawful" ],
    avg: [ 4.46, 2.73 ], std: [ 2.32, 1.83 ], fq: 24
  },
  "lay": {
    dict: "anew-neg-stem", word: "lay", stem: "lay",
    ant: [ "sit", "arise" ],
    avg: [ 3.72, 5.76 ], std: [ 2.03, 1.24 ], fq: 69
  },
  "lead": {
    dict: "anew-neg-stem", word: "leads", stem: "lead",
    ant: [ "deficit", "follow" ],
    avg: [ 4.14, 4.60 ], std: [ 2.35, 1.54 ], fq: 71
  },
  "lead": {
    dict: "anew-neg-stem", word: "leading", stem: "lead",
    ant: [ "follow", "following" ],
    avg: [ 4.10, 5.54 ], std: [ 2.12, 1.42 ], fq: 100
  },
  "lead": {
    dict: "anew-neg-stem", word: "lead", stem: "lead",
    ant: [ "deficit", "follow" ],
    avg: [ 4.14, 4.60 ], std: [ 2.35, 1.54 ], fq: 71
  },
  "leaki": {
    dict: "anew-neg-stem", word: "leaky", stem: "leaki",
    ant: [ "tight" ],
    avg: [ 4.89, 4.60 ], std: [ 2.50, 1.25 ], fq: 50
  },
  "lean": {
    dict: "anew-neg-stem", word: "lean", stem: "lean",
    ant: [ "fat", "rich" ],
    avg: [ 5.50, 5.99 ], std: [ 2.75, 1.59 ], fq: 100
  },
  "leav": {
    dict: "anew-neg-stem", word: "leaves", stem: "leav",
    ant: [ "arrive", "enter" ],
    avg: [ 4.62, 6.23 ], std: [ 2.54, 1.64 ], fq: 42
  },
  "leav": {
    dict: "anew-neg-stem", word: "leave", stem: "leav",
    ant: [ "arrive", "enter" ],
    avg: [ 4.62, 6.23 ], std: [ 2.54, 1.64 ], fq: 42
  },
  "led": {
    dict: "anew-neg-stem", word: "led", stem: "led",
    ant: [ "follow" ],
    avg: [ 4.10, 5.66 ], std: [ 2.12, 1.17 ], fq: 50
  },
  "left": {
    dict: "anew-neg-stem", word: "left", stem: "left",
    ant: [ "right", "arrive", "enter", "center" ],
    avg: [ 5.33, 6.00 ], std: [ 2.43, 1.41 ], fq: 142
  },
  "level": {
    dict: "anew-neg-stem", word: "level", stem: "level",
    ant: [ "raise" ],
    avg: [ 7.17, 6.74 ], std: [ 2.06, 1.21 ], fq: 50
  },
  "liabil": {
    dict: "anew-neg-stem", word: "liability", stem: "liabil",
    ant: [ "asset" ],
    avg: [ 4.43, 7.25 ], std: [ 2.84, 1.21 ], fq: 20
  },
  "liber": {
    dict: "anew-neg-stem", word: "liberating", stem: "liber",
    ant: [ "confine" ],
    avg: [ 3.96, 3.00 ], std: [ 2.70, 1.45 ], fq: 22
  },
  "lie": {
    dict: "anew-neg-stem", word: "lied", stem: "lie",
    ant: [ "sit", "arise" ],
    avg: [ 3.72, 5.76 ], std: [ 2.03, 1.24 ], fq: 69
  },
  "lie": {
    dict: "anew-neg-stem", word: "lies", stem: "lie",
    ant: [ "sit", "arise" ],
    avg: [ 3.72, 5.76 ], std: [ 2.03, 1.24 ], fq: 69
  },
  "lie": {
    dict: "anew-neg-stem", word: "lie", stem: "lie",
    ant: [ "sit", "arise" ],
    avg: [ 3.72, 5.76 ], std: [ 2.03, 1.24 ], fq: 69
  },
  "lie": {
    dict: "anew-neg-stem", word: "lying", stem: "lie",
    ant: [ "sit", "arise" ],
    avg: [ 3.72, 5.76 ], std: [ 2.03, 1.24 ], fq: 69
  },
  "lift": {
    dict: "anew-neg-stem", word: "lifted", stem: "lift",
    ant: [ "lower", "fall" ],
    avg: [ 4.49, 4.17 ], std: [ 2.34, 1.59 ], fq: 100
  },
  "lift": {
    dict: "anew-neg-stem", word: "lift", stem: "lift",
    ant: [ "lower", "fall" ],
    avg: [ 4.49, 4.17 ], std: [ 2.34, 1.59 ], fq: 100
  },
  "light": {
    dict: "anew-neg-stem", word: "lights", stem: "light",
    ant: [ "dark" ],
    avg: [ 4.28, 3.82 ], std: [ 2.21, 1.41 ], fq: 50
  },
  "light": {
    dict: "anew-neg-stem", word: "lighting", stem: "light",
    ant: [ "dark" ],
    avg: [ 4.28, 3.82 ], std: [ 2.21, 1.41 ], fq: 50
  },
  "light": {
    dict: "anew-neg-stem", word: "lightness", stem: "light",
    ant: [ "darkness" ],
    avg: [ 4.28, 3.82 ], std: [ 2.21, 1.87 ], fq: 50
  },
  "light": {
    dict: "anew-neg-stem", word: "light", stem: "light",
    ant: [ "dark", "heavy" ],
    avg: [ 4.70, 3.96 ], std: [ 2.20, 1.42 ], fq: 100
  },
  "likabl": {
    dict: "anew-neg-stem", word: "likable", stem: "likabl",
    ant: [ "unsympathetic" ],
    avg: [ 4.30, 3.35 ], std: [ 2.32, 1.73 ], fq: 20
  },
  "like": {
    dict: "anew-neg-stem", word: "likely", stem: "like",
    ant: [ "unlikely" ],
    avg: [ 3.82, 3.85 ], std: [ 2.36, 1.60 ], fq: 21
  },
  "like": {
    dict: "anew-neg-stem", word: "liked", stem: "like",
    ant: [ "dislike" ],
    avg: [ 4.27, 3.25 ], std: [ 2.60, 1.55 ], fq: 21
  },
  "like": {
    dict: "anew-neg-stem", word: "likes", stem: "like",
    ant: [ "dislike" ],
    avg: [ 4.27, 3.25 ], std: [ 2.60, 1.55 ], fq: 21
  },
  "like": {
    dict: "anew-neg-stem", word: "like", stem: "like",
    ant: [ "dislike" ],
    avg: [ 4.27, 3.25 ], std: [ 2.60, 1.55 ], fq: 21
  },
  "like": {
    dict: "anew-neg-stem", word: "liking", stem: "like",
    ant: [ "dislike" ],
    avg: [ 4.27, 3.25 ], std: [ 2.60, 1.55 ], fq: 21
  },
  "link": {
    dict: "anew-neg-stem", word: "link", stem: "link",
    ant: [ "disconnect" ],
    avg: [ 3.12, 3.81 ], std: [ 2.49, 1.29 ], fq: 22
  },
  "link": {
    dict: "anew-neg-stem", word: "links", stem: "link",
    ant: [ "disconnect" ],
    avg: [ 3.12, 3.81 ], std: [ 2.49, 1.29 ], fq: 22
  },
  "link": {
    dict: "anew-neg-stem", word: "linked", stem: "link",
    ant: [ "disconnect" ],
    avg: [ 3.12, 3.81 ], std: [ 2.49, 1.29 ], fq: 22
  },
  "live": {
    dict: "anew-neg-stem", word: "live", stem: "live",
    ant: [ "recorded", "dead" ],
    avg: [ 5.56, 3.88 ], std: [ 2.50, 1.26 ], fq: 100
  },
  "live": {
    dict: "anew-neg-stem", word: "living", stem: "live",
    ant: [ "dead" ],
    avg: [ 5.73, 2.00 ], std: [ 2.73, 1.32 ], fq: 50
  },
  "live": {
    dict: "anew-neg-stem", word: "lively", stem: "live",
    ant: [ "dull" ],
    avg: [ 2.83, 3.24 ], std: [ 2.31, 1.22 ], fq: 50
  },
  "local": {
    dict: "anew-neg-stem", word: "local", stem: "local",
    ant: [ "national" ],
    avg: [ 4.21, 5.98 ], std: [ 2.94, 1.15 ], fq: 50
  },
  "logic": {
    dict: "anew-neg-stem", word: "logical", stem: "logic",
    ant: [ "illogical", "incoherent" ],
    avg: [ 3.80, 3.69 ], std: [ 2.22, 1.55 ], fq: 41
  },
  "look": {
    dict: "anew-neg-stem", word: "looking", stem: "look",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "look": {
    dict: "anew-neg-stem", word: "look", stem: "look",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "look": {
    dict: "anew-neg-stem", word: "looks", stem: "look",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "look": {
    dict: "anew-neg-stem", word: "looked", stem: "look",
    ant: [ "back" ],
    avg: [ 4.12, 5.18 ], std: [ 2.01, 1.24 ], fq: 50
  },
  "loos": {
    dict: "anew-neg-stem", word: "loose", stem: "loos",
    ant: [ "confine", "tight" ],
    avg: [ 4.44, 3.86 ], std: [ 2.60, 1.35 ], fq: 72
  },
  "lose": {
    dict: "anew-neg-stem", word: "lose", stem: "lose",
    ant: [ "keep", "win", "find", "gain" ],
    avg: [ 6.71, 6.67 ], std: [ 2.43, 1.34 ], fq: 200
  },
  "loser": {
    dict: "anew-neg-stem", word: "losers", stem: "loser",
    ant: [ "winner" ],
    avg: [ 5.53, 7.78 ], std: [ 2.81, 1.69 ], fq: 50
  },
  "loser": {
    dict: "anew-neg-stem", word: "loser", stem: "loser",
    ant: [ "winner" ],
    avg: [ 5.53, 7.78 ], std: [ 2.81, 1.69 ], fq: 50
  },
  "loss": {
    dict: "anew-neg-stem", word: "losses", stem: "loss",
    ant: [ "winnings", "gain" ],
    avg: [ 7.17, 7.21 ], std: [ 2.31, 1.39 ], fq: 71
  },
  "loss": {
    dict: "anew-neg-stem", word: "loss", stem: "loss",
    ant: [ "gain" ],
    avg: [ 7.72, 6.40 ], std: [ 2.16, 1.54 ], fq: 50
  },
  "lost": {
    dict: "anew-neg-stem", word: "lost", stem: "lost",
    ant: [ "keep", "win", "find", "gain", "found", "saved", "won" ],
    avg: [ 6.42, 6.89 ], std: [ 2.36, 1.33 ], fq: 350
  },
  "lovabl": {
    dict: "anew-neg-stem", word: "lovable", stem: "lovabl",
    ant: [ "hateful" ],
    avg: [ 5.71, 1.90 ], std: [ 2.17, 0.91 ], fq: 20
  },
  "love": {
    dict: "anew-neg-stem", word: "love", stem: "love",
    ant: [ "hate" ],
    avg: [ 6.95, 2.34 ], std: [ 2.56, 1.88 ], fq: 50
  },
  "love": {
    dict: "anew-neg-stem", word: "loving", stem: "love",
    ant: [ "hate" ],
    avg: [ 6.95, 2.34 ], std: [ 2.56, 1.88 ], fq: 50
  },
  "love": {
    dict: "anew-neg-stem", word: "loved", stem: "love",
    ant: [ "hate" ],
    avg: [ 6.95, 2.34 ], std: [ 2.56, 1.88 ], fq: 50
  },
  "love": {
    dict: "anew-neg-stem", word: "loves", stem: "love",
    ant: [ "hate" ],
    avg: [ 6.95, 2.34 ], std: [ 2.56, 1.88 ], fq: 50
  },
  "low": {
    dict: "anew-neg-stem", word: "low", stem: "low",
    ant: [ "high" ],
    avg: [ 4.75, 6.64 ], std: [ 2.91, 1.21 ], fq: 50
  },
  "lower": {
    dict: "anew-neg-stem", word: "lower", stem: "lower",
    ant: [ "raise", "high" ],
    avg: [ 6.17, 6.69 ], std: [ 2.52, 1.21 ], fq: 100
  },
  "lowest": {
    dict: "anew-neg-stem", word: "lowest", stem: "lowest",
    ant: [ "high" ],
    avg: [ 4.75, 6.64 ], std: [ 2.91, 1.21 ], fq: 50
  },
  "loyal": {
    dict: "anew-neg-stem", word: "loyal", stem: "loyal",
    ant: [ "disloyal" ],
    avg: [ 5.14, 2.27 ], std: [ 2.46, 1.22 ], fq: 31
  },
  "loyalti": {
    dict: "anew-neg-stem", word: "loyalty", stem: "loyalti",
    ant: [ "disloyalty" ],
    avg: [ 5.77, 2.57 ], std: [ 2.20, 1.78 ], fq: 21
  },
  "lucki": {
    dict: "anew-neg-stem", word: "lucky", stem: "lucki",
    ant: [ "unlucky" ],
    avg: [ 4.62, 2.70 ], std: [ 2.36, 1.84 ], fq: 20
  },
  "made": {
    dict: "anew-neg-stem", word: "made", stem: "made",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "magnet": {
    dict: "anew-neg-stem", word: "magnetic", stem: "magnet",
    ant: [ "geographic" ],
    avg: [ 3.05, 6.21 ], std: [ 1.91, 1.44 ], fq: 20
  },
  "magnifi": {
    dict: "anew-neg-stem", word: "magnifying", stem: "magnifi",
    ant: [ "reduce" ],
    avg: [ 4.65, 4.18 ], std: [ 2.13, 1.26 ], fq: 50
  },
  "make": {
    dict: "anew-neg-stem", word: "make", stem: "make",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "make": {
    dict: "anew-neg-stem", word: "making", stem: "make",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "make": {
    dict: "anew-neg-stem", word: "makes", stem: "make",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "maladi": {
    dict: "anew-neg-stem", word: "malady", stem: "maladi",
    ant: [ "wellness" ],
    avg: [ 4.56, 7.67 ], std: [ 2.40, 1.28 ], fq: 23
  },
  "male": {
    dict: "anew-neg-stem", word: "male", stem: "male",
    ant: [ "female" ],
    avg: [ 5.90, 7.52 ], std: [ 2.90, 1.86 ], fq: 20
  },
  "malfunct": {
    dict: "anew-neg-stem", word: "malfunction", stem: "malfunct",
    ant: [ "function" ],
    avg: [ 4.26, 5.60 ], std: [ 2.47, 1.46 ], fq: 50
  },
  "man": {
    dict: "anew-neg-stem", word: "man", stem: "man",
    ant: [ "woman" ],
    avg: [ 5.32, 6.84 ], std: [ 2.59, 1.65 ], fq: 50
  },
  "man": {
    dict: "anew-neg-stem", word: "mans", stem: "man",
    ant: [ "woman" ],
    avg: [ 5.32, 6.84 ], std: [ 2.59, 1.65 ], fq: 50
  },
  "mark": {
    dict: "anew-neg-stem", word: "marks", stem: "mark",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "mark": {
    dict: "anew-neg-stem", word: "mark", stem: "mark",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "mark": {
    dict: "anew-neg-stem", word: "marked", stem: "mark",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "masochist": {
    dict: "anew-neg-stem", word: "masochist", stem: "masochist",
    ant: [ "sadist" ],
    avg: [ 5.00, 2.11 ], std: [ 2.47, 1.37 ], fq: 19
  },
  "match": {
    dict: "anew-neg-stem", word: "match", stem: "match",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "match": {
    dict: "anew-neg-stem", word: "matches", stem: "match",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "match": {
    dict: "anew-neg-stem", word: "matching", stem: "match",
    ant: [ "disagree" ],
    avg: [ 4.90, 2.84 ], std: [ 2.07, 1.17 ], fq: 19
  },
  "meaning": {
    dict: "anew-neg-stem", word: "meaningful", stem: "meaning",
    ant: [ "meaningless" ],
    avg: [ 3.05, 2.95 ], std: [ 1.86, 1.39 ], fq: 20
  },
  "meaningless": {
    dict: "anew-neg-stem", word: "meaningless", stem: "meaningless",
    ant: [ "meaningful" ],
    avg: [ 3.78, 6.79 ], std: [ 1.93, 0.98 ], fq: 18
  },
  "men": {
    dict: "anew-neg-stem", word: "men", stem: "men",
    ant: [ "woman" ],
    avg: [ 5.32, 6.84 ], std: [ 2.59, 1.65 ], fq: 50
  },
  "mend": {
    dict: "anew-neg-stem", word: "mend", stem: "mend",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "merci": {
    dict: "anew-neg-stem", word: "merciful", stem: "merci",
    ant: [ "merciless" ],
    avg: [ 5.05, 3.05 ], std: [ 2.63, 2.36 ], fq: 20
  },
  "merciless": {
    dict: "anew-neg-stem", word: "merciless", stem: "merciless",
    ant: [ "merciful" ],
    avg: [ 4.22, 7.00 ], std: [ 2.13, 2.00 ], fq: 22
  },
  "middl": {
    dict: "anew-neg-stem", word: "middle", stem: "middl",
    ant: [ "beginning" ],
    avg: [ 3.00, 6.39 ], std: [ 2.70, 2.12 ], fq: 19
  },
  "mind": {
    dict: "anew-neg-stem", word: "mind", stem: "mind",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "mind": {
    dict: "anew-neg-stem", word: "minds", stem: "mind",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "mindless": {
    dict: "anew-neg-stem", word: "mindless", stem: "mindless",
    ant: [ "mindful" ],
    avg: [ 6.00, 6.70 ], std: [ 2.70, 1.30 ], fq: 20
  },
  "misbehav": {
    dict: "anew-neg-stem", word: "misbehave", stem: "misbehav",
    ant: [ "behave" ],
    avg: [ 3.72, 6.25 ], std: [ 2.42, 1.65 ], fq: 19
  },
  "misconduct": {
    dict: "anew-neg-stem", word: "misconduct", stem: "misconduct",
    ant: [ "behave" ],
    avg: [ 3.72, 6.25 ], std: [ 2.42, 1.65 ], fq: 19
  },
  "miss": {
    dict: "anew-neg-stem", word: "missed", stem: "miss",
    ant: [ "hit" ],
    avg: [ 5.73, 4.58 ], std: [ 2.09, 1.81 ], fq: 50
  },
  "miss": {
    dict: "anew-neg-stem", word: "misses", stem: "miss",
    ant: [ "hit" ],
    avg: [ 5.73, 4.58 ], std: [ 2.09, 1.81 ], fq: 50
  },
  "miss": {
    dict: "anew-neg-stem", word: "miss", stem: "miss",
    ant: [ "hit" ],
    avg: [ 5.73, 4.58 ], std: [ 2.09, 1.81 ], fq: 50
  },
  "miss": {
    dict: "anew-neg-stem", word: "missing", stem: "miss",
    ant: [ "hit" ],
    avg: [ 5.73, 4.58 ], std: [ 2.09, 1.81 ], fq: 50
  },
  "mistrust": {
    dict: "anew-neg-stem", word: "mistrust", stem: "mistrust",
    ant: [ "trust" ],
    avg: [ 5.30, 7.22 ], std: [ 2.66, 1.23 ], fq: 50
  },
  "mobil": {
    dict: "anew-neg-stem", word: "mobile", stem: "mobil",
    ant: [ "immobile" ],
    avg: [ 4.38, 2.89 ], std: [ 2.38, 1.20 ], fq: 20
  },
  "moral": {
    dict: "anew-neg-stem", word: "moral", stem: "moral",
    ant: [ "immoral" ],
    avg: [ 5.42, 2.79 ], std: [ 2.24, 1.47 ], fq: 31
  },
  "morn": {
    dict: "anew-neg-stem", word: "morning", stem: "morn",
    ant: [ "sunset" ],
    avg: [ 4.20, 7.16 ], std: [ 2.99, 2.11 ], fq: 50
  },
  "morn": {
    dict: "anew-neg-stem", word: "mornings", stem: "morn",
    ant: [ "sunset" ],
    avg: [ 4.20, 7.16 ], std: [ 2.99, 2.11 ], fq: 50
  },
  "mortal": {
    dict: "anew-neg-stem", word: "mortal", stem: "mortal",
    ant: [ "immortal" ],
    avg: [ 5.95, 6.62 ], std: [ 2.84, 1.65 ], fq: 50
  },
  "mother": {
    dict: "anew-neg-stem", word: "mother", stem: "mother",
    ant: [ "father" ],
    avg: [ 5.92, 7.06 ], std: [ 2.60, 1.74 ], fq: 50
  },
  "mother": {
    dict: "anew-neg-stem", word: "mothers", stem: "mother",
    ant: [ "father" ],
    avg: [ 5.92, 7.06 ], std: [ 2.60, 1.74 ], fq: 50
  },
  "move": {
    dict: "anew-neg-stem", word: "moved", stem: "move",
    ant: [ "stay", "rest" ],
    avg: [ 4.29, 6.34 ], std: [ 2.53, 1.21 ], fq: 100
  },
  "move": {
    dict: "anew-neg-stem", word: "moves", stem: "move",
    ant: [ "stay", "rest" ],
    avg: [ 4.29, 6.34 ], std: [ 2.53, 1.21 ], fq: 100
  },
  "move": {
    dict: "anew-neg-stem", word: "moving", stem: "move",
    ant: [ "stay", "rest", "still" ],
    avg: [ 4.49, 5.92 ], std: [ 2.54, 1.18 ], fq: 150
  },
  "move": {
    dict: "anew-neg-stem", word: "move", stem: "move",
    ant: [ "stay", "rest" ],
    avg: [ 4.29, 6.34 ], std: [ 2.53, 1.21 ], fq: 100
  },
  "naked": {
    dict: "anew-neg-stem", word: "nakedness", stem: "naked",
    ant: [ "closeness" ],
    avg: [ 3.90, 6.85 ], std: [ 2.45, 1.79 ], fq: 20
  },
  "nasti": {
    dict: "anew-neg-stem", word: "nasty", stem: "nasti",
    ant: [ "nice" ],
    avg: [ 4.38, 7.38 ], std: [ 2.69, 1.51 ], fq: 50
  },
  "nation": {
    dict: "anew-neg-stem", word: "national", stem: "nation",
    ant: [ "local" ],
    avg: [ 3.80, 6.77 ], std: [ 1.91, 1.74 ], fq: 21
  },
  "natur": {
    dict: "anew-neg-stem", word: "natural", stem: "natur",
    ant: [ "artificial", "supernatural", "flat" ],
    avg: [ 4.43, 4.91 ], std: [ 1.85, 1.71 ], fq: 93
  },
  "neg": {
    dict: "anew-neg-stem", word: "negative", stem: "neg",
    ant: [ "neutral", "positive" ],
    avg: [ 4.50, 6.36 ], std: [ 2.15, 1.18 ], fq: 100
  },
  "neglig": {
    dict: "anew-neg-stem", word: "negligent", stem: "neglig",
    ant: [ "diligent" ],
    avg: [ 4.33, 6.14 ], std: [ 2.82, 1.59 ], fq: 22
  },
  "nephew": {
    dict: "anew-neg-stem", word: "nephew", stem: "nephew",
    ant: [ "niece" ],
    avg: [ 3.95, 6.52 ], std: [ 1.80, 1.75 ], fq: 21
  },
  "net": {
    dict: "anew-neg-stem", word: "net", stem: "net",
    ant: [ "gross" ],
    avg: [ 5.07, 3.72 ], std: [ 2.37, 1.49 ], fq: 50
  },
  "neutral": {
    dict: "anew-neg-stem", word: "neutral", stem: "neutral",
    ant: [ "negative" ],
    avg: [ 5.57, 2.42 ], std: [ 2.26, 1.05 ], fq: 50
  },
  "new": {
    dict: "anew-neg-stem", word: "new", stem: "new",
    ant: [ "old", "worn" ],
    avg: [ 3.47, 3.85 ], std: [ 2.44, 1.58 ], fq: 71
  },
  "newest": {
    dict: "anew-neg-stem", word: "newest", stem: "newest",
    ant: [ "old", "worn" ],
    avg: [ 3.47, 3.85 ], std: [ 2.44, 1.58 ], fq: 71
  },
  "nice": {
    dict: "anew-neg-stem", word: "nice", stem: "nice",
    ant: [ "nasty" ],
    avg: [ 4.89, 2.62 ], std: [ 2.50, 1.23 ], fq: 50
  },
  "niec": {
    dict: "anew-neg-stem", word: "niece", stem: "niec",
    ant: [ "nephew" ],
    avg: [ 4.33, 6.75 ], std: [ 2.39, 1.83 ], fq: 20
  },
  "night": {
    dict: "anew-neg-stem", word: "night", stem: "night",
    ant: [ "day" ],
    avg: [ 4.77, 6.24 ], std: [ 2.50, 1.36 ], fq: 50
  },
  "night": {
    dict: "anew-neg-stem", word: "nights", stem: "night",
    ant: [ "day" ],
    avg: [ 4.77, 6.24 ], std: [ 2.50, 1.36 ], fq: 50
  },
  "nighttim": {
    dict: "anew-neg-stem", word: "nighttime", stem: "nighttim",
    ant: [ "day" ],
    avg: [ 4.77, 6.24 ], std: [ 2.50, 1.36 ], fq: 50
  },
  "noisi": {
    dict: "anew-neg-stem", word: "noisy", stem: "noisi",
    ant: [ "quiet" ],
    avg: [ 2.82, 5.50 ], std: [ 2.13, 1.81 ], fq: 50
  },
  "nonviol": {
    dict: "anew-neg-stem", word: "nonviolent", stem: "nonviol",
    ant: [ "violent" ],
    avg: [ 6.89, 2.06 ], std: [ 2.47, 1.35 ], fq: 50
  },
  "normal": {
    dict: "anew-neg-stem", word: "normal", stem: "normal",
    ant: [ "abnormal" ],
    avg: [ 4.48, 3.53 ], std: [ 2.29, 1.22 ], fq: 20
  },
  "note": {
    dict: "anew-neg-stem", word: "noted", stem: "note",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "notic": {
    dict: "anew-neg-stem", word: "notice", stem: "notic",
    ant: [ "ignore" ],
    avg: [ 4.39, 3.22 ], std: [ 2.49, 1.37 ], fq: 50
  },
  "obedi": {
    dict: "anew-neg-stem", word: "obedience", stem: "obedi",
    ant: [ "disobedience" ],
    avg: [ 4.50, 3.32 ], std: [ 2.69, 2.24 ], fq: 20
  },
  "obey": {
    dict: "anew-neg-stem", word: "obey", stem: "obey",
    ant: [ "disobey" ],
    avg: [ 5.35, 3.19 ], std: [ 2.25, 2.02 ], fq: 22
  },
  "observ": {
    dict: "anew-neg-stem", word: "observed", stem: "observ",
    ant: [ "disrespect", "break" ],
    avg: [ 4.62, 3.96 ], std: [ 1.87, 1.80 ], fq: 100
  },
  "observ": {
    dict: "anew-neg-stem", word: "observe", stem: "observ",
    ant: [ "disrespect", "break" ],
    avg: [ 4.62, 3.96 ], std: [ 1.87, 1.80 ], fq: 100
  },
  "obstruct": {
    dict: "anew-neg-stem", word: "obstruct", stem: "obstruct",
    ant: [ "free" ],
    avg: [ 5.15, 7.96 ], std: [ 3.04, 1.26 ], fq: 50
  },
  "offend": {
    dict: "anew-neg-stem", word: "offend", stem: "offend",
    ant: [ "keep" ],
    avg: [ 5.53, 5.86 ], std: [ 2.90, 1.07 ], fq: 50
  },
  "offset": {
    dict: "anew-neg-stem", word: "offset", stem: "offset",
    ant: [ "end" ],
    avg: [ 4.59, 4.36 ], std: [ 3.07, 1.74 ], fq: 50
  },
  "old": {
    dict: "anew-neg-stem", word: "old", stem: "old",
    ant: [ "young", "new" ],
    avg: [ 5.64, 6.82 ], std: [ 2.51, 1.19 ], fq: 100
  },
  "omit": {
    dict: "anew-neg-stem", word: "omitted", stem: "omit",
    ant: [ "include" ],
    avg: [ 3.05, 6.39 ], std: [ 2.06, 1.50 ], fq: 19
  },
  "open": {
    dict: "anew-neg-stem", word: "open", stem: "open",
    ant: [ "covert" ],
    avg: [ 4.32, 3.79 ], std: [ 2.36, 1.27 ], fq: 20
  },
  "open": {
    dict: "anew-neg-stem", word: "openness", stem: "open",
    ant: [ "closeness" ],
    avg: [ 3.90, 6.85 ], std: [ 2.45, 1.79 ], fq: 20
  },
  "oper": {
    dict: "anew-neg-stem", word: "operate", stem: "oper",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "oper": {
    dict: "anew-neg-stem", word: "operating", stem: "oper",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "oper": {
    dict: "anew-neg-stem", word: "operates", stem: "oper",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "oper": {
    dict: "anew-neg-stem", word: "operated", stem: "oper",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "optimist": {
    dict: "anew-neg-stem", word: "optimist", stem: "optimist",
    ant: [ "pessimist" ],
    avg: [ 4.20, 3.81 ], std: [ 2.89, 1.99 ], fq: 20
  },
  "optimist": {
    dict: "anew-neg-stem", word: "optimistic", stem: "optimist",
    ant: [ "pessimistic" ],
    avg: [ 4.48, 3.90 ], std: [ 2.18, 2.28 ], fq: 21
  },
  "orderli": {
    dict: "anew-neg-stem", word: "orderly", stem: "orderli",
    ant: [ "disorderly" ],
    avg: [ 4.85, 2.95 ], std: [ 2.78, 1.39 ], fq: 19
  },
  "outdoor": {
    dict: "anew-neg-stem", word: "outdoor", stem: "outdoor",
    ant: [ "indoor" ],
    avg: [ 2.86, 6.29 ], std: [ 1.59, 1.27 ], fq: 21
  },
  "outsid": {
    dict: "anew-neg-stem", word: "outside", stem: "outsid",
    ant: [ "indoor" ],
    avg: [ 2.86, 6.29 ], std: [ 1.59, 1.27 ], fq: 21
  },
  "paid": {
    dict: "anew-neg-stem", word: "paid", stem: "paid",
    ant: [ "unpaid" ],
    avg: [ 5.62, 2.58 ], std: [ 2.60, 1.30 ], fq: 20
  },
  "pain": {
    dict: "anew-neg-stem", word: "pain", stem: "pain",
    ant: [ "pleasure" ],
    avg: [ 5.74, 8.08 ], std: [ 2.81, 0.97 ], fq: 50
  },
  "pain": {
    dict: "anew-neg-stem", word: "painful", stem: "pain",
    ant: [ "painless" ],
    avg: [ 4.10, 7.40 ], std: [ 2.63, 1.70 ], fq: 20
  },
  "painless": {
    dict: "anew-neg-stem", word: "painless", stem: "painless",
    ant: [ "painful" ],
    avg: [ 6.50, 2.12 ], std: [ 2.49, 1.45 ], fq: 50
  },
  "parent": {
    dict: "anew-neg-stem", word: "parent", stem: "parent",
    ant: [ "child" ],
    avg: [ 5.55, 7.24 ], std: [ 2.29, 1.56 ], fq: 50
  },
  "particular": {
    dict: "anew-neg-stem", word: "particular", stem: "particular",
    ant: [ "universal" ],
    avg: [ 4.87, 6.59 ], std: [ 2.83, 2.29 ], fq: 20
  },
  "pass": {
    dict: "anew-neg-stem", word: "pass", stem: "pass",
    ant: [ "failing", "fail", "running" ],
    avg: [ 6.71, 3.17 ], std: [ 2.52, 1.28 ], fq: 150
  },
  "pass": {
    dict: "anew-neg-stem", word: "passes", stem: "pass",
    ant: [ "failing", "fail" ],
    avg: [ 7.15, 2.21 ], std: [ 2.40, 1.16 ], fq: 100
  },
  "pass": {
    dict: "anew-neg-stem", word: "passed", stem: "pass",
    ant: [ "fail" ],
    avg: [ 7.15, 1.96 ], std: [ 2.40, 1.03 ], fq: 50
  },
  "pass": {
    dict: "anew-neg-stem", word: "passing", stem: "pass",
    ant: [ "failing", "fail", "running" ],
    avg: [ 6.71, 3.17 ], std: [ 2.52, 1.28 ], fq: 150
  },
  "passiv": {
    dict: "anew-neg-stem", word: "passive", stem: "passiv",
    ant: [ "active" ],
    avg: [ 4.86, 6.82 ], std: [ 2.56, 1.77 ], fq: 50
  },
  "patienc": {
    dict: "anew-neg-stem", word: "patience", stem: "patienc",
    ant: [ "impatience" ],
    avg: [ 4.22, 3.63 ], std: [ 2.60, 1.21 ], fq: 18
  },
  "patient": {
    dict: "anew-neg-stem", word: "patient", stem: "patient",
    ant: [ "impatient" ],
    avg: [ 4.61, 3.53 ], std: [ 2.52, 2.17 ], fq: 21
  },
  "peac": {
    dict: "anew-neg-stem", word: "peace", stem: "peac",
    ant: [ "war" ],
    avg: [ 7.49, 1.80 ], std: [ 2.16, 1.41 ], fq: 50
  },
  "penalti": {
    dict: "anew-neg-stem", word: "penalties", stem: "penalti",
    ant: [ "reward" ],
    avg: [ 4.95, 7.24 ], std: [ 2.62, 1.89 ], fq: 50
  },
  "penalti": {
    dict: "anew-neg-stem", word: "penalty", stem: "penalti",
    ant: [ "reward" ],
    avg: [ 4.95, 7.24 ], std: [ 2.62, 1.89 ], fq: 50
  },
  "person": {
    dict: "anew-neg-stem", word: "personal", stem: "person",
    ant: [ "impersonal" ],
    avg: [ 4.21, 3.85 ], std: [ 2.47, 1.31 ], fq: 22
  },
  "pessimist": {
    dict: "anew-neg-stem", word: "pessimist", stem: "pessimist",
    ant: [ "optimist" ],
    avg: [ 4.43, 7.19 ], std: [ 2.39, 1.72 ], fq: 22
  },
  "pessimist": {
    dict: "anew-neg-stem", word: "pessimistic", stem: "pessimist",
    ant: [ "optimistic" ],
    avg: [ 4.19, 7.45 ], std: [ 2.40, 1.71 ], fq: 24
  },
  "plain": {
    dict: "anew-neg-stem", word: "plains", stem: "plain",
    ant: [ "cheer" ],
    avg: [ 6.12, 7.46 ], std: [ 2.45, 1.68 ], fq: 50
  },
  "plain": {
    dict: "anew-neg-stem", word: "plain", stem: "plain",
    ant: [ "cheer", "fancy" ],
    avg: [ 5.66, 7.18 ], std: [ 2.64, 1.53 ], fq: 100
  },
  "pleas": {
    dict: "anew-neg-stem", word: "please", stem: "pleas",
    ant: [ "displease" ],
    avg: [ 5.71, 2.63 ], std: [ 2.22, 0.96 ], fq: 20
  },
  "pleas": {
    dict: "anew-neg-stem", word: "pleasing", stem: "pleas",
    ant: [ "displease" ],
    avg: [ 5.71, 2.63 ], std: [ 2.22, 0.96 ], fq: 20
  },
  "pleas": {
    dict: "anew-neg-stem", word: "pleased", stem: "pleas",
    ant: [ "displease", "displeased" ],
    avg: [ 5.02, 2.90 ], std: [ 2.40, 1.45 ], fq: 63
  },
  "pleasant": {
    dict: "anew-neg-stem", word: "pleasant", stem: "pleasant",
    ant: [ "unpleasant" ],
    avg: [ 4.73, 2.53 ], std: [ 2.80, 1.43 ], fq: 20
  },
  "pleasur": {
    dict: "anew-neg-stem", word: "pleasure", stem: "pleasur",
    ant: [ "pain" ],
    avg: [ 6.50, 2.10 ], std: [ 2.49, 1.28 ], fq: 50
  },
  "polit": {
    dict: "anew-neg-stem", word: "polite", stem: "polit",
    ant: [ "impolite" ],
    avg: [ 5.25, 3.10 ], std: [ 2.36, 1.61 ], fq: 20
  },
  "poor": {
    dict: "anew-neg-stem", word: "poor", stem: "poor",
    ant: [ "rich" ],
    avg: [ 6.17, 7.98 ], std: [ 2.70, 1.32 ], fq: 50
  },
  "posit": {
    dict: "anew-neg-stem", word: "positive", stem: "posit",
    ant: [ "negative" ],
    avg: [ 5.57, 2.42 ], std: [ 2.26, 1.05 ], fq: 50
  },
  "possibl": {
    dict: "anew-neg-stem", word: "possible", stem: "possibl",
    ant: [ "impossible", "actual" ],
    avg: [ 3.47, 5.09 ], std: [ 2.44, 1.81 ], fq: 38
  },
  "possibl": {
    dict: "anew-neg-stem", word: "possibilities", stem: "possibl",
    ant: [ "impossibility" ],
    avg: [ 3.83, 3.67 ], std: [ 2.95, 1.74 ], fq: 22
  },
  "possibl": {
    dict: "anew-neg-stem", word: "possibility", stem: "possibl",
    ant: [ "impossibility" ],
    avg: [ 3.83, 3.67 ], std: [ 2.95, 1.74 ], fq: 22
  },
  "potenti": {
    dict: "anew-neg-stem", word: "potential", stem: "potenti",
    ant: [ "actual" ],
    avg: [ 2.75, 6.22 ], std: [ 1.94, 1.48 ], fq: 19
  },
  "poverti": {
    dict: "anew-neg-stem", word: "poverty", stem: "poverti",
    ant: [ "wealth" ],
    avg: [ 6.17, 7.38 ], std: [ 2.70, 1.23 ], fq: 50
  },
  "power": {
    dict: "anew-neg-stem", word: "powers", stem: "power",
    ant: [ "inability" ],
    avg: [ 3.50, 3.00 ], std: [ 2.28, 1.33 ], fq: 19
  },
  "power": {
    dict: "anew-neg-stem", word: "power", stem: "power",
    ant: [ "inability" ],
    avg: [ 3.50, 3.00 ], std: [ 2.28, 1.33 ], fq: 19
  },
  "power": {
    dict: "anew-neg-stem", word: "powerful", stem: "power",
    ant: [ "powerless" ],
    avg: [ 3.95, 2.90 ], std: [ 2.89, 1.92 ], fq: 21
  },
  "powerless": {
    dict: "anew-neg-stem", word: "powerless", stem: "powerless",
    ant: [ "powerful" ],
    avg: [ 5.83, 7.08 ], std: [ 2.69, 1.54 ], fq: 50
  },
  "prais": {
    dict: "anew-neg-stem", word: "praise", stem: "prais",
    ant: [ "criticize" ],
    avg: [ 5.27, 2.41 ], std: [ 2.39, 1.26 ], fq: 22
  },
  "prepar": {
    dict: "anew-neg-stem", word: "preparation", stem: "prepar",
    ant: [ "resolution" ],
    avg: [ 5.41, 6.18 ], std: [ 2.43, 1.29 ], fq: 50
  },
  "prepar": {
    dict: "anew-neg-stem", word: "prepared", stem: "prepar",
    ant: [ "unprepared" ],
    avg: [ 5.09, 3.11 ], std: [ 2.20, 1.52 ], fq: 20
  },
  "prepar": {
    dict: "anew-neg-stem", word: "preparations", stem: "prepar",
    ant: [ "resolution" ],
    avg: [ 5.41, 6.18 ], std: [ 2.43, 1.29 ], fq: 50
  },
  "present": {
    dict: "anew-neg-stem", word: "present", stem: "present",
    ant: [ "future" ],
    avg: [ 5.33, 6.68 ], std: [ 2.58, 1.78 ], fq: 21
  },
  "preserv": {
    dict: "anew-neg-stem", word: "preserve", stem: "preserv",
    ant: [ "discontinue" ],
    avg: [ 3.89, 3.94 ], std: [ 2.11, 1.21 ], fq: 18
  },
  "preserv": {
    dict: "anew-neg-stem", word: "preserved", stem: "preserv",
    ant: [ "discontinue", "fresh", "destroyed" ],
    avg: [ 4.87, 4.41 ], std: [ 2.39, 1.29 ], fq: 118
  },
  "prize": {
    dict: "anew-neg-stem", word: "prize", stem: "prize",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "prize": {
    dict: "anew-neg-stem", word: "prized", stem: "prize",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "prize": {
    dict: "anew-neg-stem", word: "prizes", stem: "prize",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "pro": {
    dict: "anew-neg-stem", word: "pro", stem: "pro",
    ant: [ "con" ],
    avg: [ 6.06, 3.70 ], std: [ 2.32, 1.15 ], fq: 50
  },
  "profan": {
    dict: "anew-neg-stem", word: "profane", stem: "profan",
    ant: [ "sacred" ],
    avg: [ 5.00, 6.95 ], std: [ 2.75, 1.60 ], fq: 22
  },
  "profession": {
    dict: "anew-neg-stem", word: "professional", stem: "profession",
    ant: [ "unprofessional" ],
    avg: [ 4.71, 2.71 ], std: [ 2.16, 1.49 ], fq: 22
  },
  "profound": {
    dict: "anew-neg-stem", word: "profound", stem: "profound",
    ant: [ "superficial" ],
    avg: [ 4.20, 3.79 ], std: [ 1.82, 2.30 ], fq: 19
  },
  "prosecut": {
    dict: "anew-neg-stem", word: "prosecute", stem: "prosecut",
    ant: [ "defend" ],
    avg: [ 5.85, 5.22 ], std: [ 3.15, 1.72 ], fq: 50
  },
  "protect": {
    dict: "anew-neg-stem", word: "protected", stem: "protect",
    ant: [ "unprotected" ],
    avg: [ 5.35, 3.48 ], std: [ 2.31, 1.81 ], fq: 22
  },
  "proud": {
    dict: "anew-neg-stem", word: "proud", stem: "proud",
    ant: [ "humble" ],
    avg: [ 3.74, 6.48 ], std: [ 2.33, 1.30 ], fq: 50
  },
  "punctual": {
    dict: "anew-neg-stem", word: "punctuality", stem: "punctual",
    ant: [ "tardiness" ],
    avg: [ 5.05, 2.95 ], std: [ 2.13, 1.27 ], fq: 20
  },
  "purchas": {
    dict: "anew-neg-stem", word: "purchase", stem: "purchas",
    ant: [ "sell" ],
    avg: [ 7.24, 5.48 ], std: [ 2.06, 1.13 ], fq: 50
  },
  "pure": {
    dict: "anew-neg-stem", word: "pure", stem: "pure",
    ant: [ "impure" ],
    avg: [ 4.38, 3.68 ], std: [ 2.36, 1.91 ], fq: 23
  },
  "purg": {
    dict: "anew-neg-stem", word: "purge", stem: "purg",
    ant: [ "rehabilitate" ],
    avg: [ 4.67, 6.32 ], std: [ 2.39, 1.70 ], fq: 21
  },
  "qualifi": {
    dict: "anew-neg-stem", word: "qualify", stem: "qualifi",
    ant: [ "disqualify" ],
    avg: [ 4.70, 2.47 ], std: [ 1.84, 1.07 ], fq: 19
  },
  "queen": {
    dict: "anew-neg-stem", word: "queens", stem: "queen",
    ant: [ "king" ],
    avg: [ 5.51, 6.18 ], std: [ 2.77, 1.56 ], fq: 50
  },
  "queen": {
    dict: "anew-neg-stem", word: "queen", stem: "queen",
    ant: [ "king" ],
    avg: [ 5.51, 6.18 ], std: [ 2.77, 1.56 ], fq: 50
  },
  "question": {
    dict: "anew-neg-stem", word: "questions", stem: "question",
    ant: [ "answer" ],
    avg: [ 5.41, 6.24 ], std: [ 2.43, 1.57 ], fq: 50
  },
  "question": {
    dict: "anew-neg-stem", word: "question", stem: "question",
    ant: [ "answer" ],
    avg: [ 5.41, 6.24 ], std: [ 2.43, 1.57 ], fq: 50
  },
  "quickli": {
    dict: "anew-neg-stem", word: "quickly", stem: "quickli",
    ant: [ "slowly" ],
    avg: [ 3.39, 4.32 ], std: [ 2.22, 1.43 ], fq: 50
  },
  "quiet": {
    dict: "anew-neg-stem", word: "quiet", stem: "quiet",
    ant: [ "sound", "agitate", "noisy", "active" ],
    avg: [ 5.31, 4.79 ], std: [ 2.63, 1.55 ], fq: 155
  },
  "quit": {
    dict: "anew-neg-stem", word: "quit", stem: "quit",
    ant: [ "stay", "enter" ],
    avg: [ 4.95, 5.80 ], std: [ 2.35, 1.29 ], fq: 71
  },
  "rais": {
    dict: "anew-neg-stem", word: "raised", stem: "rais",
    ant: [ "lower", "level" ],
    avg: [ 5.19, 4.95 ], std: [ 2.30, 1.04 ], fq: 100
  },
  "rais": {
    dict: "anew-neg-stem", word: "raises", stem: "rais",
    ant: [ "lower", "level" ],
    avg: [ 5.19, 4.95 ], std: [ 2.30, 1.04 ], fq: 100
  },
  "rais": {
    dict: "anew-neg-stem", word: "raise", stem: "rais",
    ant: [ "lower", "level" ],
    avg: [ 5.19, 4.95 ], std: [ 2.30, 1.04 ], fq: 100
  },
  "rais": {
    dict: "anew-neg-stem", word: "raising", stem: "rais",
    ant: [ "lower", "level" ],
    avg: [ 5.19, 4.95 ], std: [ 2.30, 1.04 ], fq: 100
  },
  "ran": {
    dict: "anew-neg-stem", word: "ran", stem: "ran",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "raw": {
    dict: "anew-neg-stem", word: "raw", stem: "raw",
    ant: [ "cooked" ],
    avg: [ 4.44, 6.54 ], std: [ 1.96, 1.09 ], fq: 50
  },
  "rear": {
    dict: "anew-neg-stem", word: "rear", stem: "rear",
    ant: [ "head", "front", "level" ],
    avg: [ 5.40, 5.71 ], std: [ 2.43, 1.04 ], fq: 150
  },
  "reason": {
    dict: "anew-neg-stem", word: "reasonable", stem: "reason",
    ant: [ "unreasonable" ],
    avg: [ 5.00, 3.85 ], std: [ 2.47, 1.73 ], fq: 21
  },
  "reassur": {
    dict: "anew-neg-stem", word: "reassure", stem: "reassur",
    ant: [ "worry" ],
    avg: [ 5.07, 2.82 ], std: [ 2.74, 1.71 ], fq: 50
  },
  "record": {
    dict: "anew-neg-stem", word: "recorded", stem: "record",
    ant: [ "live" ],
    avg: [ 5.53, 6.84 ], std: [ 2.90, 1.52 ], fq: 50
  },
  "recov": {
    dict: "anew-neg-stem", word: "recover", stem: "recov",
    ant: [ "deteriorate" ],
    avg: [ 4.86, 3.64 ], std: [ 2.55, 1.56 ], fq: 22
  },
  "recov": {
    dict: "anew-neg-stem", word: "recovered", stem: "recov",
    ant: [ "deteriorate" ],
    avg: [ 4.86, 3.64 ], std: [ 2.55, 1.56 ], fq: 22
  },
  "red": {
    dict: "anew-neg-stem", word: "red", stem: "red",
    ant: [ "gain" ],
    avg: [ 7.72, 6.40 ], std: [ 2.16, 1.54 ], fq: 50
  },
  "reduc": {
    dict: "anew-neg-stem", word: "reducing", stem: "reduc",
    ant: [ "gain" ],
    avg: [ 7.72, 6.40 ], std: [ 2.16, 1.54 ], fq: 50
  },
  "reduc": {
    dict: "anew-neg-stem", word: "reduced", stem: "reduc",
    ant: [ "gain" ],
    avg: [ 7.72, 6.40 ], std: [ 2.16, 1.54 ], fq: 50
  },
  "reduc": {
    dict: "anew-neg-stem", word: "reduce", stem: "reduc",
    ant: [ "gain" ],
    avg: [ 7.72, 6.40 ], std: [ 2.16, 1.54 ], fq: 50
  },
  "refresh": {
    dict: "anew-neg-stem", word: "refresh", stem: "refresh",
    ant: [ "tire" ],
    avg: [ 2.83, 4.65 ], std: [ 2.31, 1.49 ], fq: 50
  },
  "refresh": {
    dict: "anew-neg-stem", word: "refreshing", stem: "refresh",
    ant: [ "tire" ],
    avg: [ 2.83, 4.65 ], std: [ 2.31, 1.49 ], fq: 50
  },
  "refus": {
    dict: "anew-neg-stem", word: "refuse", stem: "refus",
    ant: [ "accept", "allow", "admit" ],
    avg: [ 4.55, 5.75 ], std: [ 2.50, 1.28 ], fq: 150
  },
  "refus": {
    dict: "anew-neg-stem", word: "refused", stem: "refus",
    ant: [ "accept", "allow", "admit" ],
    avg: [ 4.55, 5.75 ], std: [ 2.50, 1.28 ], fq: 150
  },
  "regain": {
    dict: "anew-neg-stem", word: "regain", stem: "regain",
    ant: [ "lose" ],
    avg: [ 5.43, 3.59 ], std: [ 2.69, 2.09 ], fq: 21
  },
  "regard": {
    dict: "anew-neg-stem", word: "regard", stem: "regard",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "regard": {
    dict: "anew-neg-stem", word: "regards", stem: "regard",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "rehabilit": {
    dict: "anew-neg-stem", word: "rehabilitate", stem: "rehabilit",
    ant: [ "purge" ],
    avg: [ 5.45, 3.61 ], std: [ 2.21, 1.94 ], fq: 19
  },
  "reject": {
    dict: "anew-neg-stem", word: "rejected", stem: "reject",
    ant: [ "accept", "approve", "admit" ],
    avg: [ 4.91, 5.96 ], std: [ 2.57, 1.47 ], fq: 121
  },
  "reject": {
    dict: "anew-neg-stem", word: "reject", stem: "reject",
    ant: [ "accept", "approve", "admit" ],
    avg: [ 4.91, 5.96 ], std: [ 2.57, 1.47 ], fq: 121
  },
  "reject": {
    dict: "anew-neg-stem", word: "rejection", stem: "reject",
    ant: [ "acceptance" ],
    avg: [ 5.40, 6.86 ], std: [ 2.70, 1.28 ], fq: 50
  },
  "relax": {
    dict: "anew-neg-stem", word: "relax", stem: "relax",
    ant: [ "tense", "strain" ],
    avg: [ 4.66, 3.17 ], std: [ 2.48, 1.59 ], fq: 82
  },
  "relax": {
    dict: "anew-neg-stem", word: "relaxing", stem: "relax",
    ant: [ "tense", "strain", "restless" ],
    avg: [ 4.46, 3.32 ], std: [ 2.51, 1.58 ], fq: 102
  },
  "relax": {
    dict: "anew-neg-stem", word: "relaxed", stem: "relax",
    ant: [ "tense", "strain" ],
    avg: [ 4.66, 3.17 ], std: [ 2.48, 1.59 ], fq: 82
  },
  "releas": {
    dict: "anew-neg-stem", word: "release", stem: "releas",
    ant: [ "hold", "confine", "block" ],
    avg: [ 4.76, 4.32 ], std: [ 2.32, 1.37 ], fq: 122
  },
  "releas": {
    dict: "anew-neg-stem", word: "releases", stem: "releas",
    ant: [ "hold", "confine", "block" ],
    avg: [ 4.76, 4.32 ], std: [ 2.32, 1.37 ], fq: 122
  },
  "releas": {
    dict: "anew-neg-stem", word: "released", stem: "releas",
    ant: [ "hold", "confine", "block" ],
    avg: [ 4.76, 4.32 ], std: [ 2.32, 1.37 ], fq: 122
  },
  "reli": {
    dict: "anew-neg-stem", word: "rely", stem: "reli",
    ant: [ "distrust" ],
    avg: [ 4.05, 2.95 ], std: [ 2.77, 2.28 ], fq: 20
  },
  "reliabl": {
    dict: "anew-neg-stem", word: "reliable", stem: "reliabl",
    ant: [ "unreliable" ],
    avg: [ 4.29, 2.74 ], std: [ 2.17, 1.19 ], fq: 20
  },
  "relinquish": {
    dict: "anew-neg-stem", word: "relinquish", stem: "relinquish",
    ant: [ "hold" ],
    avg: [ 6.10, 5.70 ], std: [ 2.19, 1.22 ], fq: 50
  },
  "rememb": {
    dict: "anew-neg-stem", word: "remembering", stem: "rememb",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "rememb": {
    dict: "anew-neg-stem", word: "remember", stem: "rememb",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "repair": {
    dict: "anew-neg-stem", word: "repair", stem: "repair",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "repel": {
    dict: "anew-neg-stem", word: "repel", stem: "repel",
    ant: [ "attract" ],
    avg: [ 5.35, 6.38 ], std: [ 2.81, 2.11 ], fq: 22
  },
  "repres": {
    dict: "anew-neg-stem", word: "represents", stem: "repres",
    ant: [ "prosecute" ],
    avg: [ 4.62, 3.15 ], std: [ 2.78, 1.42 ], fq: 20
  },
  "repres": {
    dict: "anew-neg-stem", word: "represented", stem: "repres",
    ant: [ "prosecute" ],
    avg: [ 4.62, 3.15 ], std: [ 2.78, 1.42 ], fq: 20
  },
  "repres": {
    dict: "anew-neg-stem", word: "representing", stem: "repres",
    ant: [ "prosecute" ],
    avg: [ 4.62, 3.15 ], std: [ 2.78, 1.42 ], fq: 20
  },
  "repres": {
    dict: "anew-neg-stem", word: "represent", stem: "repres",
    ant: [ "prosecute" ],
    avg: [ 4.62, 3.15 ], std: [ 2.78, 1.42 ], fq: 20
  },
  "repuls": {
    dict: "anew-neg-stem", word: "repulsive", stem: "repuls",
    ant: [ "attractive" ],
    avg: [ 4.91, 7.19 ], std: [ 2.94, 1.91 ], fq: 21
  },
  "resent": {
    dict: "anew-neg-stem", word: "resent", stem: "resent",
    ant: [ "wish" ],
    avg: [ 5.16, 6.92 ], std: [ 2.62, 1.50 ], fq: 50
  },
  "resist": {
    dict: "anew-neg-stem", word: "resist", stem: "resist",
    ant: [ "surrender" ],
    avg: [ 4.70, 4.08 ], std: [ 2.48, 1.68 ], fq: 50
  },
  "resolut": {
    dict: "anew-neg-stem", word: "resolution", stem: "resolut",
    ant: [ "preparation" ],
    avg: [ 4.44, 6.06 ], std: [ 1.96, 1.36 ], fq: 50
  },
  "respect": {
    dict: "anew-neg-stem", word: "respectful", stem: "respect",
    ant: [ "disrespectful" ],
    avg: [ 4.65, 2.71 ], std: [ 2.17, 1.76 ], fq: 22
  },
  "respect": {
    dict: "anew-neg-stem", word: "respects", stem: "respect",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "respect": {
    dict: "anew-neg-stem", word: "respect", stem: "respect",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "respect": {
    dict: "anew-neg-stem", word: "respected", stem: "respect",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "respons": {
    dict: "anew-neg-stem", word: "responsive", stem: "respons",
    ant: [ "unresponsive" ],
    avg: [ 3.94, 2.95 ], std: [ 2.36, 1.76 ], fq: 19
  },
  "respons": {
    dict: "anew-neg-stem", word: "responsible", stem: "respons",
    ant: [ "irresponsible" ],
    avg: [ 5.00, 2.50 ], std: [ 2.57, 1.40 ], fq: 19
  },
  "rest": {
    dict: "anew-neg-stem", word: "restful", stem: "rest",
    ant: [ "restless" ],
    avg: [ 4.05, 3.63 ], std: [ 2.55, 1.57 ], fq: 20
  },
  "restless": {
    dict: "anew-neg-stem", word: "restless", stem: "restless",
    ant: [ "restful" ],
    avg: [ 2.58, 6.05 ], std: [ 2.19, 2.21 ], fq: 22
  },
  "restor": {
    dict: "anew-neg-stem", word: "restored", stem: "restor",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "restor": {
    dict: "anew-neg-stem", word: "restore", stem: "restor",
    ant: [ "break" ],
    avg: [ 4.07, 5.04 ], std: [ 1.69, 1.82 ], fq: 50
  },
  "retard": {
    dict: "anew-neg-stem", word: "retarded", stem: "retard",
    ant: [ "accelerate" ],
    avg: [ 6.04, 6.10 ], std: [ 1.77, 1.48 ], fq: 22
  },
  "retard": {
    dict: "anew-neg-stem", word: "retard", stem: "retard",
    ant: [ "accelerate" ],
    avg: [ 6.04, 6.10 ], std: [ 1.77, 1.48 ], fq: 22
  },
  "retir": {
    dict: "anew-neg-stem", word: "retire", stem: "retir",
    ant: [ "advance" ],
    avg: [ 7.72, 6.58 ], std: [ 2.16, 1.33 ], fq: 50
  },
  "retir": {
    dict: "anew-neg-stem", word: "retiring", stem: "retir",
    ant: [ "advance" ],
    avg: [ 7.72, 6.58 ], std: [ 2.16, 1.33 ], fq: 50
  },
  "retir": {
    dict: "anew-neg-stem", word: "retired", stem: "retir",
    ant: [ "advance" ],
    avg: [ 7.72, 6.58 ], std: [ 2.16, 1.33 ], fq: 50
  },
  "retriev": {
    dict: "anew-neg-stem", word: "retrieve", stem: "retriev",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "reward": {
    dict: "anew-neg-stem", word: "reward", stem: "reward",
    ant: [ "penalty", "dishonor" ],
    avg: [ 4.96, 2.63 ], std: [ 2.38, 1.45 ], fq: 70
  },
  "reward": {
    dict: "anew-neg-stem", word: "rewarding", stem: "reward",
    ant: [ "dishonor" ],
    avg: [ 4.82, 2.37 ], std: [ 2.44, 1.57 ], fq: 20
  },
  "rich": {
    dict: "anew-neg-stem", word: "rich", stem: "rich",
    ant: [ "poor", "lean" ],
    avg: [ 3.52, 4.00 ], std: [ 2.03, 1.56 ], fq: 72
  },
  "rich": {
    dict: "anew-neg-stem", word: "riches", stem: "rich",
    ant: [ "poor" ],
    avg: [ 3.72, 2.32 ], std: [ 2.02, 1.28 ], fq: 50
  },
  "ride": {
    dict: "anew-neg-stem", word: "rides", stem: "ride",
    ant: [ "walk" ],
    avg: [ 3.24, 6.77 ], std: [ 2.02, 1.60 ], fq: 21
  },
  "ride": {
    dict: "anew-neg-stem", word: "riding", stem: "ride",
    ant: [ "walk" ],
    avg: [ 3.24, 6.77 ], std: [ 2.02, 1.60 ], fq: 21
  },
  "ride": {
    dict: "anew-neg-stem", word: "ride", stem: "ride",
    ant: [ "walk" ],
    avg: [ 3.24, 6.77 ], std: [ 2.02, 1.60 ], fq: 21
  },
  "right": {
    dict: "anew-neg-stem", word: "right", stem: "right",
    ant: [ "left", "wrong", "incorrect", "center", "incorrectly" ],
    avg: [ 4.61, 3.86 ], std: [ 2.23, 1.17 ], fq: 224
  },
  "rise": {
    dict: "anew-neg-stem", word: "rising", stem: "rise",
    ant: [ "fall", "set", "falling" ],
    avg: [ 4.44, 4.44 ], std: [ 2.30, 1.60 ], fq: 150
  },
  "robust": {
    dict: "anew-neg-stem", word: "robust", stem: "robust",
    ant: [ "frail" ],
    avg: [ 2.65, 3.55 ], std: [ 1.81, 1.85 ], fq: 20
  },
  "rocki": {
    dict: "anew-neg-stem", word: "rocky", stem: "rocki",
    ant: [ "smooth" ],
    avg: [ 4.91, 6.80 ], std: [ 2.57, 1.18 ], fq: 50
  },
  "rode": {
    dict: "anew-neg-stem", word: "rode", stem: "rode",
    ant: [ "walk" ],
    avg: [ 3.24, 6.77 ], std: [ 2.02, 1.60 ], fq: 21
  },
  "roll": {
    dict: "anew-neg-stem", word: "rolled", stem: "roll",
    ant: [ "unwind" ],
    avg: [ 2.39, 6.02 ], std: [ 2.13, 1.85 ], fq: 50
  },
  "roll": {
    dict: "anew-neg-stem", word: "roll", stem: "roll",
    ant: [ "unwind" ],
    avg: [ 2.39, 6.02 ], std: [ 2.13, 1.85 ], fq: 50
  },
  "roll": {
    dict: "anew-neg-stem", word: "rolling", stem: "roll",
    ant: [ "unwind" ],
    avg: [ 2.39, 6.02 ], std: [ 2.13, 1.85 ], fq: 50
  },
  "roll": {
    dict: "anew-neg-stem", word: "rolls", stem: "roll",
    ant: [ "unwind" ],
    avg: [ 2.39, 6.02 ], std: [ 2.13, 1.85 ], fq: 50
  },
  "rose": {
    dict: "anew-neg-stem", word: "rose", stem: "rose",
    ant: [ "fall", "set" ],
    avg: [ 4.33, 5.00 ], std: [ 2.20, 1.63 ], fq: 100
  },
  "rough": {
    dict: "anew-neg-stem", word: "rough", stem: "rough",
    ant: [ "smooth", "cut" ],
    avg: [ 4.96, 5.19 ], std: [ 2.45, 1.24 ], fq: 100
  },
  "round": {
    dict: "anew-neg-stem", word: "round", stem: "round",
    ant: [ "square" ],
    avg: [ 3.18, 5.48 ], std: [ 1.76, 0.99 ], fq: 50
  },
  "rude": {
    dict: "anew-neg-stem", word: "rudeness", stem: "rude",
    ant: [ "courtesy" ],
    avg: [ 4.30, 6.79 ], std: [ 2.03, 1.36 ], fq: 19
  },
  "rude": {
    dict: "anew-neg-stem", word: "rude", stem: "rude",
    ant: [ "civil" ],
    avg: [ 3.74, 5.56 ], std: [ 2.37, 1.15 ], fq: 50
  },
  "rug": {
    dict: "anew-neg-stem", word: "rugged", stem: "rug",
    ant: [ "delicate" ],
    avg: [ 4.63, 5.94 ], std: [ 2.61, 1.53 ], fq: 50
  },
  "run": {
    dict: "anew-neg-stem", word: "runs", stem: "run",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "run": {
    dict: "anew-neg-stem", word: "run", stem: "run",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "run": {
    dict: "anew-neg-stem", word: "running", stem: "run",
    ant: [ "malfunction", "standing", "passing" ],
    avg: [ 4.31, 4.64 ], std: [ 2.34, 1.41 ], fq: 120
  },
  "rush": {
    dict: "anew-neg-stem", word: "rush", stem: "rush",
    ant: [ "delay" ],
    avg: [ 5.62, 3.38 ], std: [ 2.39, 1.32 ], fq: 50
  },
  "sack": {
    dict: "anew-neg-stem", word: "sack", stem: "sack",
    ant: [ "hire" ],
    avg: [ 6.77, 6.50 ], std: [ 2.07, 1.34 ], fq: 50
  },
  "sacr": {
    dict: "anew-neg-stem", word: "sacred", stem: "sacr",
    ant: [ "profane" ],
    avg: [ 4.55, 2.47 ], std: [ 2.34, 1.39 ], fq: 20
  },
  "sad": {
    dict: "anew-neg-stem", word: "sad", stem: "sad",
    ant: [ "glad" ],
    avg: [ 6.49, 7.48 ], std: [ 2.77, 1.52 ], fq: 50
  },
  "sad": {
    dict: "anew-neg-stem", word: "sadness", stem: "sad",
    ant: [ "happiness" ],
    avg: [ 6.49, 8.44 ], std: [ 2.77, 0.97 ], fq: 50
  },
  "sadist": {
    dict: "anew-neg-stem", word: "sadist", stem: "sadist",
    ant: [ "masochist" ],
    avg: [ 4.77, 3.39 ], std: [ 2.43, 2.23 ], fq: 20
  },
  "safe": {
    dict: "anew-neg-stem", word: "safe", stem: "safe",
    ant: [ "dangerous" ],
    avg: [ 7.32, 2.44 ], std: [ 2.07, 1.46 ], fq: 50
  },
  "safeti": {
    dict: "anew-neg-stem", word: "safety", stem: "safeti",
    ant: [ "danger" ],
    avg: [ 7.32, 2.82 ], std: [ 2.07, 1.64 ], fq: 50
  },
  "sane": {
    dict: "anew-neg-stem", word: "sane", stem: "sane",
    ant: [ "insane" ],
    avg: [ 5.83, 3.04 ], std: [ 2.45, 1.73 ], fq: 50
  },
  "sanitari": {
    dict: "anew-neg-stem", word: "sanitary", stem: "sanitari",
    ant: [ "unsanitary" ],
    avg: [ 4.95, 1.79 ], std: [ 2.19, 1.23 ], fq: 20
  },
  "sat": {
    dict: "anew-neg-stem", word: "sat", stem: "sat",
    ant: [ "lie", "arise" ],
    avg: [ 5.32, 4.62 ], std: [ 2.47, 1.45 ], fq: 69
  },
  "save": {
    dict: "anew-neg-stem", word: "saved", stem: "save",
    ant: [ "lost" ],
    avg: [ 5.82, 2.76 ], std: [ 2.62, 1.39 ], fq: 50
  },
  "scarc": {
    dict: "anew-neg-stem", word: "scarce", stem: "scarc",
    ant: [ "abundant" ],
    avg: [ 5.51, 7.16 ], std: [ 2.63, 1.65 ], fq: 50
  },
  "seat": {
    dict: "anew-neg-stem", word: "seated", stem: "seat",
    ant: [ "standing" ],
    avg: [ 3.93, 5.36 ], std: [ 2.49, 0.85 ], fq: 50
  },
  "second": {
    dict: "anew-neg-stem", word: "second", stem: "second",
    ant: [ "first" ],
    avg: [ 4.90, 7.33 ], std: [ 2.83, 1.28 ], fq: 19
  },
  "secur": {
    dict: "anew-neg-stem", word: "secure", stem: "secur",
    ant: [ "insecure" ],
    avg: [ 5.56, 2.98 ], std: [ 2.34, 1.13 ], fq: 50
  },
  "secur": {
    dict: "anew-neg-stem", word: "securities", stem: "secur",
    ant: [ "insecurity" ],
    avg: [ 4.81, 2.24 ], std: [ 1.94, 1.04 ], fq: 21
  },
  "secur": {
    dict: "anew-neg-stem", word: "security", stem: "secur",
    ant: [ "insecurity" ],
    avg: [ 4.81, 2.24 ], std: [ 1.94, 1.04 ], fq: 21
  },
  "selfish": {
    dict: "anew-neg-stem", word: "selfish", stem: "selfish",
    ant: [ "unselfish" ],
    avg: [ 3.30, 6.84 ], std: [ 2.27, 1.95 ], fq: 19
  },
  "sell": {
    dict: "anew-neg-stem", word: "sells", stem: "sell",
    ant: [ "buy" ],
    avg: [ 4.67, 6.28 ], std: [ 2.35, 1.36 ], fq: 50
  },
  "sell": {
    dict: "anew-neg-stem", word: "selling", stem: "sell",
    ant: [ "buy" ],
    avg: [ 4.67, 6.28 ], std: [ 2.35, 1.36 ], fq: 50
  },
  "sell": {
    dict: "anew-neg-stem", word: "sell", stem: "sell",
    ant: [ "buy" ],
    avg: [ 4.67, 6.28 ], std: [ 2.35, 1.36 ], fq: 50
  },
  "sensibl": {
    dict: "anew-neg-stem", word: "sensible", stem: "sensibl",
    ant: [ "unreasonable" ],
    avg: [ 5.00, 3.85 ], std: [ 2.47, 1.73 ], fq: 21
  },
  "sensit": {
    dict: "anew-neg-stem", word: "sensitive", stem: "sensit",
    ant: [ "insensitive" ],
    avg: [ 4.32, 3.55 ], std: [ 2.14, 1.74 ], fq: 20
  },
  "sentenc": {
    dict: "anew-neg-stem", word: "sentence", stem: "sentenc",
    ant: [ "acquittal" ],
    avg: [ 4.95, 6.19 ], std: [ 2.31, 1.72 ], fq: 20
  },
  "sentenc": {
    dict: "anew-neg-stem", word: "sentences", stem: "sentenc",
    ant: [ "acquittal" ],
    avg: [ 4.95, 6.19 ], std: [ 2.31, 1.72 ], fq: 20
  },
  "separ": {
    dict: "anew-neg-stem", word: "separated", stem: "separ",
    ant: [ "unite" ],
    avg: [ 3.75, 6.64 ], std: [ 2.49, 1.19 ], fq: 50
  },
  "separ": {
    dict: "anew-neg-stem", word: "separate", stem: "separ",
    ant: [ "unite" ],
    avg: [ 3.75, 6.64 ], std: [ 2.49, 1.19 ], fq: 50
  },
  "separ": {
    dict: "anew-neg-stem", word: "separation", stem: "separ",
    ant: [ "union" ],
    avg: [ 3.75, 6.04 ], std: [ 2.49, 1.40 ], fq: 50
  },
  "seriou": {
    dict: "anew-neg-stem", word: "serious", stem: "seriou",
    ant: [ "playful" ],
    avg: [ 5.89, 7.63 ], std: [ 2.49, 1.21 ], fq: 18
  },
  "settl": {
    dict: "anew-neg-stem", word: "settled", stem: "settl",
    ant: [ "float" ],
    avg: [ 3.10, 6.42 ], std: [ 1.61, 1.02 ], fq: 20
  },
  "settl": {
    dict: "anew-neg-stem", word: "settle", stem: "settl",
    ant: [ "float" ],
    avg: [ 3.10, 6.42 ], std: [ 1.61, 1.02 ], fq: 20
  },
  "shallow": {
    dict: "anew-neg-stem", word: "shallow", stem: "shallow",
    ant: [ "deep" ],
    avg: [ 6.17, 5.74 ], std: [ 2.70, 1.40 ], fq: 50
  },
  "shame": {
    dict: "anew-neg-stem", word: "shame", stem: "shame",
    ant: [ "honor" ],
    avg: [ 5.90, 7.22 ], std: [ 1.83, 1.20 ], fq: 50
  },
  "shame": {
    dict: "anew-neg-stem", word: "shamed", stem: "shame",
    ant: [ "honor" ],
    avg: [ 5.90, 7.22 ], std: [ 1.83, 1.20 ], fq: 50
  },
  "shi": {
    dict: "anew-neg-stem", word: "shy", stem: "shi",
    ant: [ "confident" ],
    avg: [ 6.22, 7.10 ], std: [ 2.41, 1.18 ], fq: 50
  },
  "short": {
    dict: "anew-neg-stem", word: "short", stem: "short",
    ant: [ "tall" ],
    avg: [ 3.85, 6.71 ], std: [ 2.08, 1.93 ], fq: 20
  },
  "shout": {
    dict: "anew-neg-stem", word: "shout", stem: "shout",
    ant: [ "whisper" ],
    avg: [ 4.10, 6.14 ], std: [ 2.92, 1.71 ], fq: 20
  },
  "shout": {
    dict: "anew-neg-stem", word: "shouting", stem: "shout",
    ant: [ "whisper" ],
    avg: [ 4.10, 6.14 ], std: [ 2.92, 1.71 ], fq: 20
  },
  "show": {
    dict: "anew-neg-stem", word: "showed", stem: "show",
    ant: [ "disprove", "hide" ],
    avg: [ 4.75, 4.16 ], std: [ 2.31, 1.61 ], fq: 72
  },
  "show": {
    dict: "anew-neg-stem", word: "shows", stem: "show",
    ant: [ "disprove", "hide" ],
    avg: [ 4.75, 4.16 ], std: [ 2.31, 1.61 ], fq: 72
  },
  "show": {
    dict: "anew-neg-stem", word: "show", stem: "show",
    ant: [ "disprove", "hide" ],
    avg: [ 4.75, 4.16 ], std: [ 2.31, 1.61 ], fq: 72
  },
  "show": {
    dict: "anew-neg-stem", word: "showing", stem: "show",
    ant: [ "disprove", "hide" ],
    avg: [ 4.75, 4.16 ], std: [ 2.31, 1.61 ], fq: 72
  },
  "shown": {
    dict: "anew-neg-stem", word: "shown", stem: "shown",
    ant: [ "disprove", "hide" ],
    avg: [ 4.75, 4.16 ], std: [ 2.31, 1.61 ], fq: 72
  },
  "sick": {
    dict: "anew-neg-stem", word: "sickness", stem: "sick",
    ant: [ "wellness" ],
    avg: [ 4.56, 7.67 ], std: [ 2.40, 1.28 ], fq: 23
  },
  "sick": {
    dict: "anew-neg-stem", word: "sick", stem: "sick",
    ant: [ "well" ],
    avg: [ 5.43, 6.68 ], std: [ 2.85, 1.25 ], fq: 50
  },
  "side": {
    dict: "anew-neg-stem", word: "side", stem: "side",
    ant: [ "bottom" ],
    avg: [ 2.95, 4.44 ], std: [ 1.72, 1.33 ], fq: 50
  },
  "signific": {
    dict: "anew-neg-stem", word: "significant", stem: "signific",
    ant: [ "insignificant" ],
    avg: [ 3.70, 3.64 ], std: [ 1.78, 2.08 ], fq: 21
  },
  "silenc": {
    dict: "anew-neg-stem", word: "silence", stem: "silenc",
    ant: [ "sound" ],
    avg: [ 5.43, 5.86 ], std: [ 2.85, 1.28 ], fq: 50
  },
  "simplic": {
    dict: "anew-neg-stem", word: "simplicity", stem: "simplic",
    ant: [ "difficulty" ],
    avg: [ 5.94, 3.38 ], std: [ 2.36, 1.23 ], fq: 50
  },
  "simplifi": {
    dict: "anew-neg-stem", word: "simplify", stem: "simplifi",
    ant: [ "complicate" ],
    avg: [ 4.95, 3.30 ], std: [ 2.09, 1.26 ], fq: 20
  },
  "singl": {
    dict: "anew-neg-stem", word: "single", stem: "singl",
    ant: [ "common", "double", "married" ],
    avg: [ 4.62, 5.71 ], std: [ 2.45, 1.52 ], fq: 150
  },
  "sister": {
    dict: "anew-neg-stem", word: "sisters", stem: "sister",
    ant: [ "brother" ],
    avg: [ 4.71, 7.22 ], std: [ 2.68, 1.23 ], fq: 50
  },
  "sister": {
    dict: "anew-neg-stem", word: "sister", stem: "sister",
    ant: [ "brother" ],
    avg: [ 4.71, 7.22 ], std: [ 2.68, 1.23 ], fq: 50
  },
  "sit": {
    dict: "anew-neg-stem", word: "sitting", stem: "sit",
    ant: [ "lie", "arise", "standing" ],
    avg: [ 4.86, 4.95 ], std: [ 2.48, 1.28 ], fq: 119
  },
  "sit": {
    dict: "anew-neg-stem", word: "sit", stem: "sit",
    ant: [ "lie", "arise" ],
    avg: [ 5.32, 4.62 ], std: [ 2.47, 1.45 ], fq: 69
  },
  "sit": {
    dict: "anew-neg-stem", word: "sits", stem: "sit",
    ant: [ "lie", "arise" ],
    avg: [ 5.32, 4.62 ], std: [ 2.47, 1.45 ], fq: 69
  },
  "site": {
    dict: "anew-neg-stem", word: "sites", stem: "site",
    ant: [ "lie", "arise" ],
    avg: [ 5.32, 4.62 ], std: [ 2.47, 1.45 ], fq: 69
  },
  "sleep": {
    dict: "anew-neg-stem", word: "sleep", stem: "sleep",
    ant: [ "wake" ],
    avg: [ 6.63, 4.72 ], std: [ 2.70, 1.65 ], fq: 50
  },
  "sleep": {
    dict: "anew-neg-stem", word: "sleeps", stem: "sleep",
    ant: [ "wake" ],
    avg: [ 6.63, 4.72 ], std: [ 2.70, 1.65 ], fq: 50
  },
  "sleep": {
    dict: "anew-neg-stem", word: "sleeping", stem: "sleep",
    ant: [ "waking", "wake" ],
    avg: [ 6.63, 5.25 ], std: [ 2.70, 1.56 ], fq: 100
  },
  "slept": {
    dict: "anew-neg-stem", word: "slept", stem: "slept",
    ant: [ "wake" ],
    avg: [ 6.63, 4.72 ], std: [ 2.70, 1.65 ], fq: 50
  },
  "slim": {
    dict: "anew-neg-stem", word: "slim", stem: "slim",
    ant: [ "gain" ],
    avg: [ 7.72, 6.40 ], std: [ 2.16, 1.54 ], fq: 50
  },
  "slow": {
    dict: "anew-neg-stem", word: "slow", stem: "slow",
    ant: [ "accelerate", "fast", "quickly" ],
    avg: [ 6.00, 6.14 ], std: [ 2.01, 1.39 ], fq: 122
  },
  "slowli": {
    dict: "anew-neg-stem", word: "slowly", stem: "slowli",
    ant: [ "quickly" ],
    avg: [ 6.57, 5.82 ], std: [ 1.78, 1.45 ], fq: 50
  },
  "slug": {
    dict: "anew-neg-stem", word: "slugs", stem: "slug",
    ant: [ "work" ],
    avg: [ 4.07, 5.24 ], std: [ 1.98, 2.10 ], fq: 50
  },
  "slug": {
    dict: "anew-neg-stem", word: "slug", stem: "slug",
    ant: [ "work" ],
    avg: [ 4.07, 5.24 ], std: [ 1.98, 2.10 ], fq: 50
  },
  "slumber": {
    dict: "anew-neg-stem", word: "slumber", stem: "slumber",
    ant: [ "wake" ],
    avg: [ 6.63, 4.72 ], std: [ 2.70, 1.65 ], fq: 50
  },
  "slur": {
    dict: "anew-neg-stem", word: "slur", stem: "slur",
    ant: [ "focus" ],
    avg: [ 4.65, 6.12 ], std: [ 2.13, 1.06 ], fq: 50
  },
  "small": {
    dict: "anew-neg-stem", word: "small", stem: "small",
    ant: [ "big" ],
    avg: [ 4.76, 6.22 ], std: [ 1.95, 1.50 ], fq: 50
  },
  "smaller": {
    dict: "anew-neg-stem", word: "smaller", stem: "smaller",
    ant: [ "big" ],
    avg: [ 4.76, 6.22 ], std: [ 1.95, 1.50 ], fq: 50
  },
  "smart": {
    dict: "anew-neg-stem", word: "smart", stem: "smart",
    ant: [ "stupid" ],
    avg: [ 4.72, 2.68 ], std: [ 2.71, 1.22 ], fq: 50
  },
  "smooth": {
    dict: "anew-neg-stem", word: "smooth", stem: "smooth",
    ant: [ "rough" ],
    avg: [ 5.33, 3.54 ], std: [ 2.04, 1.45 ], fq: 50
  },
  "sober": {
    dict: "anew-neg-stem", word: "sober", stem: "sober",
    ant: [ "playful" ],
    avg: [ 5.89, 7.63 ], std: [ 2.49, 1.21 ], fq: 18
  },
  "social": {
    dict: "anew-neg-stem", word: "socialism", stem: "social",
    ant: [ "capitalism" ],
    avg: [ 5.39, 3.62 ], std: [ 2.89, 1.94 ], fq: 22
  },
  "soft": {
    dict: "anew-neg-stem", word: "softness", stem: "soft",
    ant: [ "fitness" ],
    avg: [ 5.32, 6.45 ], std: [ 2.75, 1.74 ], fq: 22
  },
  "soft": {
    dict: "anew-neg-stem", word: "soft", stem: "soft",
    ant: [ "hard" ],
    avg: [ 5.12, 4.10 ], std: [ 2.19, 1.39 ], fq: 50
  },
  "soften": {
    dict: "anew-neg-stem", word: "soften", stem: "soften",
    ant: [ "stand" ],
    avg: [ 3.93, 5.60 ], std: [ 2.49, 1.11 ], fq: 50
  },
  "softwar": {
    dict: "anew-neg-stem", word: "software", stem: "softwar",
    ant: [ "hardware" ],
    avg: [ 4.41, 6.11 ], std: [ 2.24, 1.49 ], fq: 20
  },
  "soil": {
    dict: "anew-neg-stem", word: "soil", stem: "soil",
    ant: [ "clean" ],
    avg: [ 4.37, 6.90 ], std: [ 2.14, 1.90 ], fq: 50
  },
  "sold": {
    dict: "anew-neg-stem", word: "sold", stem: "sold",
    ant: [ "buy" ],
    avg: [ 4.67, 6.28 ], std: [ 2.35, 1.36 ], fq: 50
  },
  "son": {
    dict: "anew-neg-stem", word: "son", stem: "son",
    ant: [ "daughter", "girl" ],
    avg: [ 4.29, 7.02 ], std: [ 2.69, 1.52 ], fq: 100
  },
  "son": {
    dict: "anew-neg-stem", word: "sons", stem: "son",
    ant: [ "daughter", "girl" ],
    avg: [ 4.29, 7.02 ], std: [ 2.69, 1.52 ], fq: 100
  },
  "sooth": {
    dict: "anew-neg-stem", word: "soothe", stem: "sooth",
    ant: [ "irritate" ],
    avg: [ 5.85, 3.19 ], std: [ 2.23, 1.69 ], fq: 40
  },
  "sooth": {
    dict: "anew-neg-stem", word: "soothing", stem: "sooth",
    ant: [ "irritate" ],
    avg: [ 5.85, 3.19 ], std: [ 2.23, 1.69 ], fq: 40
  },
  "sorrow": {
    dict: "anew-neg-stem", word: "sorrows", stem: "sorrow",
    ant: [ "joy" ],
    avg: [ 5.98, 8.16 ], std: [ 2.54, 1.06 ], fq: 50
  },
  "sorrow": {
    dict: "anew-neg-stem", word: "sorrowful", stem: "sorrow",
    ant: [ "joyful" ],
    avg: [ 5.53, 8.21 ], std: [ 2.88, 0.98 ], fq: 41
  },
  "sorrow": {
    dict: "anew-neg-stem", word: "sorrow", stem: "sorrow",
    ant: [ "joy" ],
    avg: [ 5.98, 8.16 ], std: [ 2.54, 1.06 ], fq: 50
  },
  "sound": {
    dict: "anew-neg-stem", word: "sound", stem: "sound",
    ant: [ "silence" ],
    avg: [ 2.82, 5.14 ], std: [ 2.13, 1.74 ], fq: 50
  },
  "sour": {
    dict: "anew-neg-stem", word: "sour", stem: "sour",
    ant: [ "sweeten", "sweet" ],
    avg: [ 4.77, 7.01 ], std: [ 2.52, 1.18 ], fq: 70
  },
  "sparkl": {
    dict: "anew-neg-stem", word: "sparkling", stem: "sparkl",
    ant: [ "still" ],
    avg: [ 4.91, 5.14 ], std: [ 2.57, 1.12 ], fq: 50
  },
  "split": {
    dict: "anew-neg-stem", word: "split", stem: "split",
    ant: [ "unite" ],
    avg: [ 3.75, 6.64 ], std: [ 2.49, 1.19 ], fq: 50
  },
  "squar": {
    dict: "anew-neg-stem", word: "square", stem: "squar",
    ant: [ "round", "crooked" ],
    avg: [ 4.25, 4.86 ], std: [ 2.24, 1.32 ], fq: 100
  },
  "stabil": {
    dict: "anew-neg-stem", word: "stability", stem: "stabil",
    ant: [ "instability" ],
    avg: [ 4.89, 2.75 ], std: [ 2.32, 1.21 ], fq: 19
  },
  "stale": {
    dict: "anew-neg-stem", word: "stale", stem: "stale",
    ant: [ "fresh" ],
    avg: [ 3.91, 7.26 ], std: [ 2.64, 1.32 ], fq: 50
  },
  "stand": {
    dict: "anew-neg-stem", word: "stands", stem: "stand",
    ant: [ "lie" ],
    avg: [ 5.96, 2.60 ], std: [ 2.63, 1.62 ], fq: 50
  },
  "stand": {
    dict: "anew-neg-stem", word: "stand", stem: "stand",
    ant: [ "lie" ],
    avg: [ 5.96, 2.60 ], std: [ 2.63, 1.62 ], fq: 50
  },
  "stand": {
    dict: "anew-neg-stem", word: "standing", stem: "stand",
    ant: [ "lie", "running", "seated" ],
    avg: [ 4.57, 4.83 ], std: [ 2.41, 1.46 ], fq: 150
  },
  "start": {
    dict: "anew-neg-stem", word: "starts", stem: "start",
    ant: [ "end", "finish", "stop" ],
    avg: [ 4.43, 4.78 ], std: [ 2.79, 1.65 ], fq: 121
  },
  "start": {
    dict: "anew-neg-stem", word: "start", stem: "start",
    ant: [ "end", "finish", "stop" ],
    avg: [ 4.43, 4.78 ], std: [ 2.79, 1.65 ], fq: 121
  },
  "start": {
    dict: "anew-neg-stem", word: "started", stem: "start",
    ant: [ "end", "stop" ],
    avg: [ 4.80, 4.10 ], std: [ 2.95, 1.55 ], fq: 100
  },
  "start": {
    dict: "anew-neg-stem", word: "starting", stem: "start",
    ant: [ "end", "stop" ],
    avg: [ 4.80, 4.10 ], std: [ 2.95, 1.55 ], fq: 100
  },
  "starv": {
    dict: "anew-neg-stem", word: "starve", stem: "starv",
    ant: [ "feed" ],
    avg: [ 5.69, 6.42 ], std: [ 2.51, 1.20 ], fq: 50
  },
  "starv": {
    dict: "anew-neg-stem", word: "starving", stem: "starv",
    ant: [ "feed" ],
    avg: [ 5.69, 6.42 ], std: [ 2.51, 1.20 ], fq: 50
  },
  "stay": {
    dict: "anew-neg-stem", word: "stays", stem: "stay",
    ant: [ "move" ],
    avg: [ 6.21, 5.72 ], std: [ 2.51, 1.36 ], fq: 50
  },
  "stay": {
    dict: "anew-neg-stem", word: "staying", stem: "stay",
    ant: [ "move" ],
    avg: [ 6.21, 5.72 ], std: [ 2.51, 1.36 ], fq: 50
  },
  "stay": {
    dict: "anew-neg-stem", word: "stayed", stem: "stay",
    ant: [ "move" ],
    avg: [ 6.21, 5.72 ], std: [ 2.51, 1.36 ], fq: 50
  },
  "stay": {
    dict: "anew-neg-stem", word: "stay", stem: "stay",
    ant: [ "move" ],
    avg: [ 6.21, 5.72 ], std: [ 2.51, 1.36 ], fq: 50
  },
  "stiff": {
    dict: "anew-neg-stem", word: "stiff", stem: "stiff",
    ant: [ "impotent" ],
    avg: [ 3.71, 2.95 ], std: [ 2.41, 2.17 ], fq: 20
  },
  "still": {
    dict: "anew-neg-stem", word: "still", stem: "still",
    ant: [ "agitate", "moving", "sparkling" ],
    avg: [ 5.39, 4.98 ], std: [ 2.60, 1.77 ], fq: 93
  },
  "stingi": {
    dict: "anew-neg-stem", word: "stingy", stem: "stingi",
    ant: [ "generous" ],
    avg: [ 5.70, 7.43 ], std: [ 2.32, 1.83 ], fq: 20
  },
  "stinki": {
    dict: "anew-neg-stem", word: "stinky", stem: "stinki",
    ant: [ "fragrant" ],
    avg: [ 4.85, 7.05 ], std: [ 2.43, 1.18 ], fq: 19
  },
  "stood": {
    dict: "anew-neg-stem", word: "stood", stem: "stood",
    ant: [ "lie" ],
    avg: [ 5.96, 2.60 ], std: [ 2.63, 1.62 ], fq: 50
  },
  "stop": {
    dict: "anew-neg-stem", word: "stop", stem: "stop",
    ant: [ "start", "begin" ],
    avg: [ 3.33, 6.25 ], std: [ 2.24, 1.81 ], fq: 69
  },
  "stop": {
    dict: "anew-neg-stem", word: "stopping", stem: "stop",
    ant: [ "start", "begin" ],
    avg: [ 3.33, 6.25 ], std: [ 2.24, 1.81 ], fq: 69
  },
  "stop": {
    dict: "anew-neg-stem", word: "stops", stem: "stop",
    ant: [ "start", "begin" ],
    avg: [ 3.33, 6.25 ], std: [ 2.24, 1.81 ], fq: 69
  },
  "stop": {
    dict: "anew-neg-stem", word: "stopped", stem: "stop",
    ant: [ "start", "begin" ],
    avg: [ 3.33, 6.25 ], std: [ 2.24, 1.81 ], fq: 69
  },
  "straight": {
    dict: "anew-neg-stem", word: "straight", stem: "straight",
    ant: [ "crooked" ],
    avg: [ 4.67, 3.70 ], std: [ 2.35, 1.61 ], fq: 50
  },
  "straighten": {
    dict: "anew-neg-stem", word: "straighten", stem: "straighten",
    ant: [ "bend" ],
    avg: [ 4.07, 5.06 ], std: [ 2.34, 1.32 ], fq: 50
  },
  "strain": {
    dict: "anew-neg-stem", word: "strain", stem: "strain",
    ant: [ "relax" ],
    avg: [ 2.39, 7.70 ], std: [ 2.13, 1.07 ], fq: 50
  },
  "stranger": {
    dict: "anew-neg-stem", word: "stranger", stem: "stranger",
    ant: [ "familiar" ],
    avg: [ 6.98, 6.44 ], std: [ 2.21, 1.26 ], fq: 50
  },
  "strength": {
    dict: "anew-neg-stem", word: "strength", stem: "strength",
    ant: [ "weakness" ],
    avg: [ 5.34, 2.94 ], std: [ 2.52, 1.53 ], fq: 50
  },
  "strengthen": {
    dict: "anew-neg-stem", word: "strengthen", stem: "strengthen",
    ant: [ "weaken" ],
    avg: [ 4.19, 3.30 ], std: [ 2.86, 1.13 ], fq: 18
  },
  "strike": {
    dict: "anew-neg-stem", word: "strike", stem: "strike",
    ant: [ "miss" ],
    avg: [ 4.29, 3.64 ], std: [ 2.69, 1.63 ], fq: 50
  },
  "strike": {
    dict: "anew-neg-stem", word: "striking", stem: "strike",
    ant: [ "miss" ],
    avg: [ 4.29, 3.64 ], std: [ 2.69, 1.63 ], fq: 50
  },
  "strike": {
    dict: "anew-neg-stem", word: "strikes", stem: "strike",
    ant: [ "miss" ],
    avg: [ 4.29, 3.64 ], std: [ 2.69, 1.63 ], fq: 50
  },
  "strip": {
    dict: "anew-neg-stem", word: "strip", stem: "strip",
    ant: [ "dress" ],
    avg: [ 4.05, 6.60 ], std: [ 1.89, 1.18 ], fq: 50
  },
  "strip": {
    dict: "anew-neg-stem", word: "stripped", stem: "strip",
    ant: [ "dress" ],
    avg: [ 4.05, 6.60 ], std: [ 1.89, 1.18 ], fq: 50
  },
  "strong": {
    dict: "anew-neg-stem", word: "strong", stem: "strong",
    ant: [ "weak", "impotent" ],
    avg: [ 3.92, 2.88 ], std: [ 2.25, 1.77 ], fq: 70
  },
  "stronger": {
    dict: "anew-neg-stem", word: "stronger", stem: "stronger",
    ant: [ "weak", "impotent" ],
    avg: [ 3.92, 2.88 ], std: [ 2.25, 1.77 ], fq: 70
  },
  "struck": {
    dict: "anew-neg-stem", word: "struck", stem: "struck",
    ant: [ "miss" ],
    avg: [ 4.29, 3.64 ], std: [ 2.69, 1.63 ], fq: 50
  },
  "stupid": {
    dict: "anew-neg-stem", word: "stupidity", stem: "stupid",
    ant: [ "intelligence" ],
    avg: [ 5.17, 7.30 ], std: [ 2.11, 1.20 ], fq: 50
  },
  "stupid": {
    dict: "anew-neg-stem", word: "stupid", stem: "stupid",
    ant: [ "smart", "intelligent" ],
    avg: [ 5.30, 7.54 ], std: [ 2.76, 1.36 ], fq: 69
  },
  "succeed": {
    dict: "anew-neg-stem", word: "succeeding", stem: "succeed",
    ant: [ "fail" ],
    avg: [ 7.15, 1.96 ], std: [ 2.40, 1.03 ], fq: 50
  },
  "succeed": {
    dict: "anew-neg-stem", word: "succeeded", stem: "succeed",
    ant: [ "fail" ],
    avg: [ 7.15, 1.96 ], std: [ 2.40, 1.03 ], fq: 50
  },
  "succeed": {
    dict: "anew-neg-stem", word: "succeed", stem: "succeed",
    ant: [ "fail" ],
    avg: [ 7.15, 1.96 ], std: [ 2.40, 1.03 ], fq: 50
  },
  "success": {
    dict: "anew-neg-stem", word: "successful", stem: "success",
    ant: [ "unsuccessful" ],
    avg: [ 3.36, 2.33 ], std: [ 2.48, 1.39 ], fq: 23
  },
  "success": {
    dict: "anew-neg-stem", word: "success", stem: "success",
    ant: [ "failure", "loser" ],
    avg: [ 4.95, 2.13 ], std: [ 2.69, 1.17 ], fq: 100
  },
  "suffer": {
    dict: "anew-neg-stem", word: "suffered", stem: "suffer",
    ant: [ "enjoy" ],
    avg: [ 5.20, 7.66 ], std: [ 2.72, 1.47 ], fq: 50
  },
  "suffer": {
    dict: "anew-neg-stem", word: "suffer", stem: "suffer",
    ant: [ "enjoy" ],
    avg: [ 5.20, 7.66 ], std: [ 2.72, 1.47 ], fq: 50
  },
  "suffer": {
    dict: "anew-neg-stem", word: "suffering", stem: "suffer",
    ant: [ "enjoy" ],
    avg: [ 5.20, 7.66 ], std: [ 2.72, 1.47 ], fq: 50
  },
  "suffici": {
    dict: "anew-neg-stem", word: "sufficient", stem: "suffici",
    ant: [ "insufficient" ],
    avg: [ 3.57, 3.24 ], std: [ 1.75, 1.95 ], fq: 22
  },
  "sundown": {
    dict: "anew-neg-stem", word: "sundown", stem: "sundown",
    ant: [ "sunrise" ],
    avg: [ 5.06, 7.04 ], std: [ 3.05, 1.80 ], fq: 50
  },
  "sunris": {
    dict: "anew-neg-stem", word: "sunrise", stem: "sunris",
    ant: [ "sunset" ],
    avg: [ 4.20, 7.16 ], std: [ 2.99, 2.11 ], fq: 50
  },
  "sunset": {
    dict: "anew-neg-stem", word: "sunset", stem: "sunset",
    ant: [ "sunrise" ],
    avg: [ 5.06, 7.04 ], std: [ 3.05, 1.80 ], fq: 50
  },
  "superfici": {
    dict: "anew-neg-stem", word: "superficial", stem: "superfici",
    ant: [ "profound" ],
    avg: [ 4.14, 6.65 ], std: [ 2.73, 1.35 ], fq: 20
  },
  "superior": {
    dict: "anew-neg-stem", word: "superior", stem: "superior",
    ant: [ "inferior" ],
    avg: [ 3.83, 3.20 ], std: [ 2.05, 1.47 ], fq: 50
  },
  "supernatur": {
    dict: "anew-neg-stem", word: "supernatural", stem: "supernatur",
    ant: [ "natural" ],
    avg: [ 4.37, 6.56 ], std: [ 2.51, 1.49 ], fq: 50
  },
  "sure": {
    dict: "anew-neg-stem", word: "sure", stem: "sure",
    ant: [ "uncertain", "unsure" ],
    avg: [ 4.50, 3.49 ], std: [ 2.00, 1.39 ], fq: 41
  },
  "surrend": {
    dict: "anew-neg-stem", word: "surrender", stem: "surrend",
    ant: [ "resist" ],
    avg: [ 6.37, 4.74 ], std: [ 2.56, 1.60 ], fq: 50
  },
  "suspect": {
    dict: "anew-neg-stem", word: "suspect", stem: "suspect",
    ant: [ "trust" ],
    avg: [ 5.30, 7.22 ], std: [ 2.66, 1.23 ], fq: 50
  },
  "swear": {
    dict: "anew-neg-stem", word: "swear", stem: "swear",
    ant: [ "distrust" ],
    avg: [ 4.05, 2.95 ], std: [ 2.77, 2.28 ], fq: 20
  },
  "sweet": {
    dict: "anew-neg-stem", word: "sweetness", stem: "sweet",
    ant: [ "unpleasantness" ],
    avg: [ 4.36, 2.59 ], std: [ 2.22, 1.30 ], fq: 23
  },
  "sweet": {
    dict: "anew-neg-stem", word: "sweet", stem: "sweet",
    ant: [ "sour", "dry" ],
    avg: [ 4.45, 4.38 ], std: [ 2.01, 1.39 ], fq: 100
  },
  "sweeten": {
    dict: "anew-neg-stem", word: "sweeten", stem: "sweeten",
    ant: [ "sour" ],
    avg: [ 5.10, 4.06 ], std: [ 1.95, 1.50 ], fq: 50
  },
  "sweeter": {
    dict: "anew-neg-stem", word: "sweeter", stem: "sweeter",
    ant: [ "sour", "dry" ],
    avg: [ 4.45, 4.38 ], std: [ 2.01, 1.39 ], fq: 100
  },
  "sweetest": {
    dict: "anew-neg-stem", word: "sweetest", stem: "sweetest",
    ant: [ "sour", "dry" ],
    avg: [ 4.45, 4.38 ], std: [ 2.01, 1.39 ], fq: 100
  },
  "swore": {
    dict: "anew-neg-stem", word: "swore", stem: "swore",
    ant: [ "distrust" ],
    avg: [ 4.05, 2.95 ], std: [ 2.77, 2.28 ], fq: 20
  },
  "sympathet": {
    dict: "anew-neg-stem", word: "sympathetic", stem: "sympathet",
    ant: [ "unsympathetic" ],
    avg: [ 4.30, 3.35 ], std: [ 2.32, 1.73 ], fq: 20
  },
  "tail": {
    dict: "anew-neg-stem", word: "tail", stem: "tail",
    ant: [ "head" ],
    avg: [ 5.00, 5.96 ], std: [ 2.68, 1.07 ], fq: 50
  },
  "take": {
    dict: "anew-neg-stem", word: "take", stem: "take",
    ant: [ "give", "refuse" ],
    avg: [ 5.35, 4.54 ], std: [ 2.51, 1.39 ], fq: 100
  },
  "take": {
    dict: "anew-neg-stem", word: "takes", stem: "take",
    ant: [ "give", "refuse" ],
    avg: [ 5.35, 4.54 ], std: [ 2.51, 1.39 ], fq: 100
  },
  "take": {
    dict: "anew-neg-stem", word: "taking", stem: "take",
    ant: [ "give", "refuse" ],
    avg: [ 5.35, 4.54 ], std: [ 2.51, 1.39 ], fq: 100
  },
  "taken": {
    dict: "anew-neg-stem", word: "taken", stem: "taken",
    ant: [ "give", "refuse" ],
    avg: [ 5.35, 4.54 ], std: [ 2.51, 1.39 ], fq: 100
  },
  "tall": {
    dict: "anew-neg-stem", word: "tall", stem: "tall",
    ant: [ "short" ],
    avg: [ 5.73, 4.46 ], std: [ 2.73, 1.15 ], fq: 50
  },
  "tame": {
    dict: "anew-neg-stem", word: "tame", stem: "tame",
    ant: [ "wild" ],
    avg: [ 4.14, 5.50 ], std: [ 2.30, 1.81 ], fq: 50
  },
  "tardi": {
    dict: "anew-neg-stem", word: "tardiness", stem: "tardi",
    ant: [ "punctuality" ],
    avg: [ 3.85, 6.72 ], std: [ 2.66, 1.45 ], fq: 19
  },
  "tast": {
    dict: "anew-neg-stem", word: "tasteful", stem: "tast",
    ant: [ "tasteless" ],
    avg: [ 3.86, 3.25 ], std: [ 2.22, 1.02 ], fq: 20
  },
  "tasteless": {
    dict: "anew-neg-stem", word: "tasteless", stem: "tasteless",
    ant: [ "tasty", "tasteful" ],
    avg: [ 5.03, 6.89 ], std: [ 2.44, 1.76 ], fq: 38
  },
  "tasti": {
    dict: "anew-neg-stem", word: "tasty", stem: "tasti",
    ant: [ "tasteless" ],
    avg: [ 3.86, 3.25 ], std: [ 2.22, 1.02 ], fq: 20
  },
  "tender": {
    dict: "anew-neg-stem", word: "tender", stem: "tender",
    ant: [ "tough" ],
    avg: [ 5.12, 3.96 ], std: [ 2.19, 1.41 ], fq: 50
  },
  "tens": {
    dict: "anew-neg-stem", word: "tense", stem: "tens",
    ant: [ "relax", "relaxed" ],
    avg: [ 2.39, 7.46 ], std: [ 2.13, 1.07 ], fq: 100
  },
  "termin": {
    dict: "anew-neg-stem", word: "terminate", stem: "termin",
    ant: [ "begin", "hire" ],
    avg: [ 4.88, 6.48 ], std: [ 2.15, 1.73 ], fq: 69
  },
  "thank": {
    dict: "anew-neg-stem", word: "thankful", stem: "thank",
    ant: [ "ungrateful" ],
    avg: [ 4.71, 2.68 ], std: [ 2.24, 1.45 ], fq: 20
  },
  "thankless": {
    dict: "anew-neg-stem", word: "thankless", stem: "thankless",
    ant: [ "grateful" ],
    avg: [ 4.58, 7.36 ], std: [ 2.14, 1.47 ], fq: 50
  },
  "thin": {
    dict: "anew-neg-stem", word: "thin", stem: "thin",
    ant: [ "gain", "fat", "full" ],
    avg: [ 6.15, 5.47 ], std: [ 2.62, 1.55 ], fq: 150
  },
  "think": {
    dict: "anew-neg-stem", word: "think", stem: "think",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "think": {
    dict: "anew-neg-stem", word: "thinking", stem: "think",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "think": {
    dict: "anew-neg-stem", word: "thinks", stem: "think",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "thirsti": {
    dict: "anew-neg-stem", word: "thirsty", stem: "thirsti",
    ant: [ "hungry" ],
    avg: [ 5.13, 3.38 ], std: [ 2.44, 1.93 ], fq: 50
  },
  "thought": {
    dict: "anew-neg-stem", word: "thought", stem: "thought",
    ant: [ "forget" ],
    avg: [ 4.43, 3.73 ], std: [ 2.31, 1.28 ], fq: 21
  },
  "tidi": {
    dict: "anew-neg-stem", word: "tidy", stem: "tidi",
    ant: [ "untidy" ],
    avg: [ 3.67, 3.58 ], std: [ 2.00, 1.12 ], fq: 18
  },
  "tie": {
    dict: "anew-neg-stem", word: "tie", stem: "tie",
    ant: [ "disconnect" ],
    avg: [ 3.12, 3.81 ], std: [ 2.49, 1.29 ], fq: 22
  },
  "tie": {
    dict: "anew-neg-stem", word: "tied", stem: "tie",
    ant: [ "disconnect" ],
    avg: [ 3.12, 3.81 ], std: [ 2.49, 1.29 ], fq: 22
  },
  "tie": {
    dict: "anew-neg-stem", word: "ties", stem: "tie",
    ant: [ "disconnect" ],
    avg: [ 3.12, 3.81 ], std: [ 2.49, 1.29 ], fq: 22
  },
  "tight": {
    dict: "anew-neg-stem", word: "tight", stem: "tight",
    ant: [ "loose", "leaky" ],
    avg: [ 4.40, 3.96 ], std: [ 2.59, 1.65 ], fq: 71
  },
  "tighter": {
    dict: "anew-neg-stem", word: "tighter", stem: "tighter",
    ant: [ "loose", "leaky" ],
    avg: [ 4.40, 3.96 ], std: [ 2.59, 1.65 ], fq: 71
  },
  "timid": {
    dict: "anew-neg-stem", word: "timid", stem: "timid",
    ant: [ "brave", "bold", "confident" ],
    avg: [ 5.98, 6.70 ], std: [ 2.36, 1.44 ], fq: 150
  },
  "tire": {
    dict: "anew-neg-stem", word: "tired", stem: "tire",
    ant: [ "refresh", "interest" ],
    avg: [ 4.20, 6.49 ], std: [ 2.24, 1.55 ], fq: 71
  },
  "tire": {
    dict: "anew-neg-stem", word: "tires", stem: "tire",
    ant: [ "refresh", "interest" ],
    avg: [ 4.20, 6.49 ], std: [ 2.24, 1.55 ], fq: 71
  },
  "tire": {
    dict: "anew-neg-stem", word: "tiring", stem: "tire",
    ant: [ "refresh", "interest" ],
    avg: [ 4.20, 6.49 ], std: [ 2.24, 1.55 ], fq: 71
  },
  "tire": {
    dict: "anew-neg-stem", word: "tire", stem: "tire",
    ant: [ "refresh", "interest" ],
    avg: [ 4.20, 6.49 ], std: [ 2.24, 1.55 ], fq: 71
  },
  "toler": {
    dict: "anew-neg-stem", word: "tolerance", stem: "toler",
    ant: [ "intolerance" ],
    avg: [ 5.35, 2.95 ], std: [ 2.03, 1.27 ], fq: 19
  },
  "took": {
    dict: "anew-neg-stem", word: "took", stem: "took",
    ant: [ "give", "refuse" ],
    avg: [ 5.35, 4.54 ], std: [ 2.51, 1.39 ], fq: 100
  },
  "top": {
    dict: "anew-neg-stem", word: "top", stem: "top",
    ant: [ "bottom" ],
    avg: [ 2.95, 4.44 ], std: [ 1.72, 1.33 ], fq: 50
  },
  "top": {
    dict: "anew-neg-stem", word: "tops", stem: "top",
    ant: [ "bottom" ],
    avg: [ 2.95, 4.44 ], std: [ 1.72, 1.33 ], fq: 50
  },
  "tough": {
    dict: "anew-neg-stem", word: "tough", stem: "tough",
    ant: [ "tender" ],
    avg: [ 4.88, 6.45 ], std: [ 2.30, 1.72 ], fq: 50
  },
  "tragedi": {
    dict: "anew-neg-stem", word: "tragedy", stem: "tragedi",
    ant: [ "comedy" ],
    avg: [ 5.85, 7.98 ], std: [ 2.81, 1.15 ], fq: 50
  },
  "train": {
    dict: "anew-neg-stem", word: "trained", stem: "train",
    ant: [ "untrained" ],
    avg: [ 4.57, 3.95 ], std: [ 2.29, 1.58 ], fq: 20
  },
  "triumph": {
    dict: "anew-neg-stem", word: "triumph", stem: "triumph",
    ant: [ "defeat" ],
    avg: [ 5.09, 3.20 ], std: [ 3.00, 1.95 ], fq: 50
  },
  "troubl": {
    dict: "anew-neg-stem", word: "troubled", stem: "troubl",
    ant: [ "untroubled" ],
    avg: [ 3.02, 6.21 ], std: [ 2.30, 1.84 ], fq: 41
  },
  "true": {
    dict: "anew-neg-stem", word: "true", stem: "true",
    ant: [ "false" ],
    avg: [ 3.43, 3.18 ], std: [ 2.09, 1.35 ], fq: 50
  },
  "trust": {
    dict: "anew-neg-stem", word: "trust", stem: "trust",
    ant: [ "distrust" ],
    avg: [ 4.05, 2.95 ], std: [ 2.77, 2.28 ], fq: 20
  },
  "trust": {
    dict: "anew-neg-stem", word: "trusted", stem: "trust",
    ant: [ "distrust" ],
    avg: [ 4.05, 2.95 ], std: [ 2.77, 2.28 ], fq: 20
  },
  "trusti": {
    dict: "anew-neg-stem", word: "trusty", stem: "trusti",
    ant: [ "untrustworthy" ],
    avg: [ 4.80, 2.67 ], std: [ 2.86, 2.03 ], fq: 20
  },
  "trustworthi": {
    dict: "anew-neg-stem", word: "trustworthy", stem: "trustworthi",
    ant: [ "untrustworthy" ],
    avg: [ 4.80, 2.67 ], std: [ 2.86, 2.03 ], fq: 20
  },
  "ugli": {
    dict: "anew-neg-stem", word: "ugliness", stem: "ugli",
    ant: [ "beauty" ],
    avg: [ 4.95, 7.76 ], std: [ 2.57, 1.61 ], fq: 50
  },
  "ugli": {
    dict: "anew-neg-stem", word: "ugly", stem: "ugli",
    ant: [ "beautiful" ],
    avg: [ 4.95, 7.92 ], std: [ 2.57, 1.18 ], fq: 50
  },
  "unabl": {
    dict: "anew-neg-stem", word: "unable", stem: "unabl",
    ant: [ "able" ],
    avg: [ 5.08, 6.56 ], std: [ 2.07, 1.25 ], fq: 50
  },
  "unaccept": {
    dict: "anew-neg-stem", word: "unacceptable", stem: "unaccept",
    ant: [ "acceptable" ],
    avg: [ 5.40, 6.67 ], std: [ 2.70, 1.21 ], fq: 50
  },
  "unafraid": {
    dict: "anew-neg-stem", word: "unafraid", stem: "unafraid",
    ant: [ "afraid", "insecure" ],
    avg: [ 6.09, 2.84 ], std: [ 2.44, 1.33 ], fq: 100
  },
  "unarm": {
    dict: "anew-neg-stem", word: "unarmed", stem: "unarm",
    ant: [ "armed" ],
    avg: [ 3.59, 3.84 ], std: [ 2.40, 1.86 ], fq: 50
  },
  "unattract": {
    dict: "anew-neg-stem", word: "unattractive", stem: "unattract",
    ant: [ "attractive" ],
    avg: [ 4.91, 7.19 ], std: [ 2.94, 1.91 ], fq: 21
  },
  "unavail": {
    dict: "anew-neg-stem", word: "unavailable", stem: "unavail",
    ant: [ "available" ],
    avg: [ 4.04, 6.86 ], std: [ 2.48, 1.28 ], fq: 22
  },
  "unawar": {
    dict: "anew-neg-stem", word: "unaware", stem: "unawar",
    ant: [ "aware" ],
    avg: [ 5.00, 5.78 ], std: [ 2.68, 1.47 ], fq: 50
  },
  "unbalanc": {
    dict: "anew-neg-stem", word: "unbalanced", stem: "unbalanc",
    ant: [ "balance" ],
    avg: [ 4.13, 6.84 ], std: [ 2.03, 1.57 ], fq: 21
  },
  "uncertain": {
    dict: "anew-neg-stem", word: "uncertain", stem: "uncertain",
    ant: [ "certain", "sure" ],
    avg: [ 4.08, 6.22 ], std: [ 2.51, 1.53 ], fq: 69
  },
  "uncertainti": {
    dict: "anew-neg-stem", word: "uncertainty", stem: "uncertainti",
    ant: [ "certainty" ],
    avg: [ 4.35, 6.38 ], std: [ 2.52, 1.75 ], fq: 22
  },
  "uncl": {
    dict: "anew-neg-stem", word: "uncle", stem: "uncl",
    ant: [ "aunt" ],
    avg: [ 2.71, 6.56 ], std: [ 2.41, 2.09 ], fq: 19
  },
  "unclean": {
    dict: "anew-neg-stem", word: "unclean", stem: "unclean",
    ant: [ "clean" ],
    avg: [ 4.37, 6.90 ], std: [ 2.14, 1.90 ], fq: 50
  },
  "unclear": {
    dict: "anew-neg-stem", word: "unclear", stem: "unclear",
    ant: [ "clear" ],
    avg: [ 2.71, 6.14 ], std: [ 1.71, 1.70 ], fq: 21
  },
  "uncomfort": {
    dict: "anew-neg-stem", word: "uncomfortable", stem: "uncomfort",
    ant: [ "comfortable" ],
    avg: [ 3.93, 7.32 ], std: [ 2.85, 1.10 ], fq: 50
  },
  "unconsci": {
    dict: "anew-neg-stem", word: "unconscious", stem: "unconsci",
    ant: [ "conscious" ],
    avg: [ 5.42, 6.14 ], std: [ 2.44, 1.39 ], fq: 50
  },
  "uncoop": {
    dict: "anew-neg-stem", word: "uncooperative", stem: "uncoop",
    ant: [ "cooperative" ],
    avg: [ 3.43, 6.62 ], std: [ 2.04, 1.72 ], fq: 21
  },
  "undef": {
    dict: "anew-neg-stem", word: "undefeated", stem: "undef",
    ant: [ "defeated" ],
    avg: [ 5.09, 2.74 ], std: [ 3.00, 1.61 ], fq: 50
  },
  "undesir": {
    dict: "anew-neg-stem", word: "undesirable", stem: "undesir",
    ant: [ "desirable" ],
    avg: [ 7.35, 7.08 ], std: [ 1.76, 1.66 ], fq: 50
  },
  "undetermin": {
    dict: "anew-neg-stem", word: "undetermined", stem: "undetermin",
    ant: [ "determined" ],
    avg: [ 4.07, 6.50 ], std: [ 1.98, 1.53 ], fq: 50
  },
  "undignifi": {
    dict: "anew-neg-stem", word: "undignified", stem: "undignifi",
    ant: [ "dignified" ],
    avg: [ 3.48, 6.55 ], std: [ 2.06, 1.56 ], fq: 42
  },
  "undress": {
    dict: "anew-neg-stem", word: "undress", stem: "undress",
    ant: [ "dress" ],
    avg: [ 4.05, 6.60 ], std: [ 1.89, 1.18 ], fq: 50
  },
  "uneasi": {
    dict: "anew-neg-stem", word: "uneasy", stem: "uneasi",
    ant: [ "easy", "restful" ],
    avg: [ 3.41, 6.46 ], std: [ 2.52, 1.93 ], fq: 72
  },
  "uneduc": {
    dict: "anew-neg-stem", word: "uneducated", stem: "uneduc",
    ant: [ "educated" ],
    avg: [ 5.74, 7.29 ], std: [ 2.46, 1.31 ], fq: 50
  },
  "unemploy": {
    dict: "anew-neg-stem", word: "unemployed", stem: "unemploy",
    ant: [ "employed" ],
    avg: [ 5.28, 7.28 ], std: [ 2.12, 1.36 ], fq: 50
  },
  "unemploy": {
    dict: "anew-neg-stem", word: "unemployment", stem: "unemploy",
    ant: [ "employment" ],
    avg: [ 5.28, 6.36 ], std: [ 2.12, 1.78 ], fq: 50
  },
  "uneth": {
    dict: "anew-neg-stem", word: "unethical", stem: "uneth",
    ant: [ "ethical" ],
    avg: [ 5.90, 6.20 ], std: [ 1.83, 1.37 ], fq: 50
  },
  "unfair": {
    dict: "anew-neg-stem", word: "unfair", stem: "unfair",
    ant: [ "fair" ],
    avg: [ 5.32, 6.96 ], std: [ 1.92, 1.26 ], fq: 50
  },
  "unfaith": {
    dict: "anew-neg-stem", word: "unfaithful", stem: "unfaith",
    ant: [ "faithful" ],
    avg: [ 4.48, 7.95 ], std: [ 2.58, 1.07 ], fq: 23
  },
  "unfit": {
    dict: "anew-neg-stem", word: "unfit", stem: "unfit",
    ant: [ "qualify", "fit" ],
    avg: [ 5.28, 6.57 ], std: [ 2.45, 1.78 ], fq: 39
  },
  "unforgiv": {
    dict: "anew-neg-stem", word: "unforgiving", stem: "unforgiv",
    ant: [ "forgiving" ],
    avg: [ 3.95, 6.74 ], std: [ 2.40, 1.66 ], fq: 20
  },
  "unfortun": {
    dict: "anew-neg-stem", word: "unfortunate", stem: "unfortun",
    ant: [ "fortunate" ],
    avg: [ 3.81, 7.33 ], std: [ 2.36, 2.03 ], fq: 21
  },
  "unfriendli": {
    dict: "anew-neg-stem", word: "unfriendly", stem: "unfriendli",
    ant: [ "friendly" ],
    avg: [ 4.54, 7.66 ], std: [ 1.86, 1.55 ], fq: 50
  },
  "ungrat": {
    dict: "anew-neg-stem", word: "ungrateful", stem: "ungrat",
    ant: [ "grateful" ],
    avg: [ 4.58, 7.36 ], std: [ 2.14, 1.47 ], fq: 50
  },
  "unhappi": {
    dict: "anew-neg-stem", word: "unhappy", stem: "unhappi",
    ant: [ "happy", "euphoric" ],
    avg: [ 5.86, 8.09 ], std: [ 2.73, 1.21 ], fq: 70
  },
  "unhappi": {
    dict: "anew-neg-stem", word: "unhappiness", stem: "unhappi",
    ant: [ "happiness" ],
    avg: [ 6.49, 8.44 ], std: [ 2.77, 0.97 ], fq: 50
  },
  "unhealthi": {
    dict: "anew-neg-stem", word: "unhealthy", stem: "unhealthi",
    ant: [ "healthy" ],
    avg: [ 4.60, 8.02 ], std: [ 2.67, 1.06 ], fq: 50
  },
  "unholi": {
    dict: "anew-neg-stem", word: "unholy", stem: "unholi",
    ant: [ "holy" ],
    avg: [ 3.37, 6.06 ], std: [ 2.87, 2.65 ], fq: 18
  },
  "unif": {
    dict: "anew-neg-stem", word: "unification", stem: "unif",
    ant: [ "separation" ],
    avg: [ 4.26, 3.53 ], std: [ 2.57, 1.82 ], fq: 50
  },
  "unifi": {
    dict: "anew-neg-stem", word: "unified", stem: "unifi",
    ant: [ "divide" ],
    avg: [ 3.82, 4.29 ], std: [ 2.24, 1.46 ], fq: 50
  },
  "union": {
    dict: "anew-neg-stem", word: "union", stem: "union",
    ant: [ "separation" ],
    avg: [ 4.26, 3.53 ], std: [ 2.57, 1.82 ], fq: 50
  },
  "union": {
    dict: "anew-neg-stem", word: "unions", stem: "union",
    ant: [ "separation" ],
    avg: [ 4.26, 3.53 ], std: [ 2.57, 1.82 ], fq: 50
  },
  "unit": {
    dict: "anew-neg-stem", word: "united", stem: "unit",
    ant: [ "divide", "divided" ],
    avg: [ 3.82, 4.33 ], std: [ 2.24, 1.37 ], fq: 100
  },
  "unit": {
    dict: "anew-neg-stem", word: "unite", stem: "unit",
    ant: [ "divide" ],
    avg: [ 3.82, 4.29 ], std: [ 2.24, 1.46 ], fq: 50
  },
  "univers": {
    dict: "anew-neg-stem", word: "universal", stem: "univers",
    ant: [ "particular" ],
    avg: [ 4.10, 5.54 ], std: [ 2.24, 1.13 ], fq: 50
  },
  "unjust": {
    dict: "anew-neg-stem", word: "unjust", stem: "unjust",
    ant: [ "fair" ],
    avg: [ 5.32, 6.96 ], std: [ 1.92, 1.26 ], fq: 50
  },
  "unkind": {
    dict: "anew-neg-stem", word: "unkind", stem: "unkind",
    ant: [ "kind" ],
    avg: [ 4.30, 7.24 ], std: [ 2.62, 1.39 ], fq: 50
  },
  "unknown": {
    dict: "anew-neg-stem", word: "unknown", stem: "unknown",
    ant: [ "known" ],
    avg: [ 6.38, 5.80 ], std: [ 2.68, 1.39 ], fq: 50
  },
  "unlaw": {
    dict: "anew-neg-stem", word: "unlawful", stem: "unlaw",
    ant: [ "lawful" ],
    avg: [ 3.70, 6.26 ], std: [ 2.30, 1.24 ], fq: 19
  },
  "unlik": {
    dict: "anew-neg-stem", word: "unlikely", stem: "unlik",
    ant: [ "likely" ],
    avg: [ 4.42, 6.90 ], std: [ 2.29, 1.37 ], fq: 20
  },
  "unlucki": {
    dict: "anew-neg-stem", word: "unlucky", stem: "unlucki",
    ant: [ "lucky" ],
    avg: [ 6.53, 7.68 ], std: [ 2.34, 1.27 ], fq: 50
  },
  "unpaid": {
    dict: "anew-neg-stem", word: "unpaid", stem: "unpaid",
    ant: [ "paid" ],
    avg: [ 5.23, 7.14 ], std: [ 2.21, 1.71 ], fq: 50
  },
  "unpleas": {
    dict: "anew-neg-stem", word: "unpleasant", stem: "unpleas",
    ant: [ "pleasant" ],
    avg: [ 2.91, 7.24 ], std: [ 2.52, 1.51 ], fq: 21
  },
  "unprepar": {
    dict: "anew-neg-stem", word: "unprepared", stem: "unprepar",
    ant: [ "prepared" ],
    avg: [ 3.82, 6.74 ], std: [ 2.40, 1.07 ], fq: 50
  },
  "unprofession": {
    dict: "anew-neg-stem", word: "unprofessional", stem: "unprofession",
    ant: [ "professional" ],
    avg: [ 5.20, 6.44 ], std: [ 2.85, 1.16 ], fq: 50
  },
  "unprotect": {
    dict: "anew-neg-stem", word: "unprotected", stem: "unprotect",
    ant: [ "protected" ],
    avg: [ 4.09, 6.60 ], std: [ 2.77, 1.18 ], fq: 50
  },
  "unqualifi": {
    dict: "anew-neg-stem", word: "unqualified", stem: "unqualifi",
    ant: [ "competent" ],
    avg: [ 4.09, 6.05 ], std: [ 2.66, 2.06 ], fq: 22
  },
  "unreason": {
    dict: "anew-neg-stem", word: "unreasonable", stem: "unreason",
    ant: [ "reasonable" ],
    avg: [ 3.00, 6.84 ], std: [ 2.12, 1.30 ], fq: 18
  },
  "unreli": {
    dict: "anew-neg-stem", word: "unreliable", stem: "unreli",
    ant: [ "reliable", "dependable" ],
    avg: [ 4.62, 7.13 ], std: [ 2.55, 1.41 ], fq: 72
  },
  "unrespons": {
    dict: "anew-neg-stem", word: "unresponsive", stem: "unrespons",
    ant: [ "responsive" ],
    avg: [ 4.90, 6.10 ], std: [ 2.57, 1.25 ], fq: 20
  },
  "unsaf": {
    dict: "anew-neg-stem", word: "unsafe", stem: "unsaf",
    ant: [ "secure", "safe" ],
    avg: [ 3.48, 6.97 ], std: [ 2.60, 1.46 ], fq: 100
  },
  "unsanitari": {
    dict: "anew-neg-stem", word: "unsanitary", stem: "unsanitari",
    ant: [ "sanitary" ],
    avg: [ 3.09, 6.33 ], std: [ 2.11, 1.91 ], fq: 22
  },
  "unselfish": {
    dict: "anew-neg-stem", word: "unselfish", stem: "unselfish",
    ant: [ "selfish" ],
    avg: [ 5.50, 2.60 ], std: [ 2.62, 1.05 ], fq: 50
  },
  "unsuccess": {
    dict: "anew-neg-stem", word: "unsuccessful", stem: "unsuccess",
    ant: [ "successful" ],
    avg: [ 6.11, 8.16 ], std: [ 2.65, 1.08 ], fq: 50
  },
  "unsur": {
    dict: "anew-neg-stem", word: "unsure", stem: "unsur",
    ant: [ "confident", "certain", "sure" ],
    avg: [ 4.81, 6.56 ], std: [ 2.48, 1.42 ], fq: 119
  },
  "unsympathet": {
    dict: "anew-neg-stem", word: "unsympathetic", stem: "unsympathet",
    ant: [ "sympathetic" ],
    avg: [ 3.29, 6.67 ], std: [ 2.22, 1.93 ], fq: 22
  },
  "untidi": {
    dict: "anew-neg-stem", word: "untidy", stem: "untidi",
    ant: [ "tidy" ],
    avg: [ 2.86, 6.24 ], std: [ 1.59, 1.85 ], fq: 29
  },
  "untrain": {
    dict: "anew-neg-stem", word: "untrained", stem: "untrain",
    ant: [ "trained" ],
    avg: [ 5.74, 5.86 ], std: [ 2.46, 1.50 ], fq: 50
  },
  "untroubl": {
    dict: "anew-neg-stem", word: "untroubled", stem: "untroubl",
    ant: [ "troubled", "insecure" ],
    avg: [ 5.75, 2.89 ], std: [ 2.35, 1.29 ], fq: 100
  },
  "untrustworthi": {
    dict: "anew-neg-stem", word: "untrustworthy", stem: "untrustworthi",
    ant: [ "trustworthy" ],
    avg: [ 4.22, 7.25 ], std: [ 2.37, 1.55 ], fq: 19
  },
  "unwant": {
    dict: "anew-neg-stem", word: "unwanted", stem: "unwant",
    ant: [ "wanted", "desirable" ],
    avg: [ 7.35, 6.11 ], std: [ 1.76, 1.72 ], fq: 100
  },
  "unwelcom": {
    dict: "anew-neg-stem", word: "unwelcome", stem: "unwelcom",
    ant: [ "welcome" ],
    avg: [ 3.76, 7.27 ], std: [ 2.26, 1.88 ], fq: 21
  },
  "unwil": {
    dict: "anew-neg-stem", word: "unwilling", stem: "unwil",
    ant: [ "willing" ],
    avg: [ 2.76, 6.83 ], std: [ 2.05, 2.04 ], fq: 19
  },
  "unwind": {
    dict: "anew-neg-stem", word: "unwind", stem: "unwind",
    ant: [ "tense", "strain" ],
    avg: [ 4.66, 3.17 ], std: [ 2.48, 1.59 ], fq: 82
  },
  "unworthi": {
    dict: "anew-neg-stem", word: "unworthy", stem: "unworthi",
    ant: [ "worthy" ],
    avg: [ 7.35, 6.90 ], std: [ 1.76, 1.68 ], fq: 50
  },
  "uplift": {
    dict: "anew-neg-stem", word: "uplifting", stem: "uplift",
    ant: [ "depress" ],
    avg: [ 3.14, 2.47 ], std: [ 1.46, 2.01 ], fq: 20
  },
  "use": {
    dict: "anew-neg-stem", word: "useful", stem: "use",
    ant: [ "useless" ],
    avg: [ 4.87, 2.52 ], std: [ 2.58, 1.42 ], fq: 50
  },
  "useless": {
    dict: "anew-neg-stem", word: "useless", stem: "useless",
    ant: [ "useful" ],
    avg: [ 4.26, 7.10 ], std: [ 2.47, 1.20 ], fq: 50
  },
  "valid": {
    dict: "anew-neg-stem", word: "valid", stem: "valid",
    ant: [ "invalid" ],
    avg: [ 3.70, 3.52 ], std: [ 2.91, 1.60 ], fq: 22
  },
  "valu": {
    dict: "anew-neg-stem", word: "valued", stem: "valu",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "valu": {
    dict: "anew-neg-stem", word: "values", stem: "valu",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "valu": {
    dict: "anew-neg-stem", word: "value", stem: "valu",
    ant: [ "disrespect" ],
    avg: [ 5.28, 2.90 ], std: [ 2.04, 1.78 ], fq: 50
  },
  "valuabl": {
    dict: "anew-neg-stem", word: "valuable", stem: "valuabl",
    ant: [ "worthless" ],
    avg: [ 5.38, 2.98 ], std: [ 2.23, 1.91 ], fq: 50
  },
  "veget": {
    dict: "anew-neg-stem", word: "vegetation", stem: "veget",
    ant: [ "fauna" ],
    avg: [ 3.25, 6.05 ], std: [ 2.31, 2.15 ], fq: 19
  },
  "victor": {
    dict: "anew-neg-stem", word: "victor", stem: "victor",
    ant: [ "loser" ],
    avg: [ 4.95, 2.20 ], std: [ 2.57, 1.11 ], fq: 50
  },
  "victori": {
    dict: "anew-neg-stem", word: "victories", stem: "victori",
    ant: [ "defeat" ],
    avg: [ 5.09, 3.20 ], std: [ 3.00, 1.95 ], fq: 50
  },
  "victori": {
    dict: "anew-neg-stem", word: "victory", stem: "victori",
    ant: [ "defeat" ],
    avg: [ 5.09, 3.20 ], std: [ 3.00, 1.95 ], fq: 50
  },
  "violat": {
    dict: "anew-neg-stem", word: "violate", stem: "violat",
    ant: [ "keep" ],
    avg: [ 5.53, 5.86 ], std: [ 2.90, 1.07 ], fq: 50
  },
  "violat": {
    dict: "anew-neg-stem", word: "violated", stem: "violat",
    ant: [ "keep" ],
    avg: [ 5.53, 5.86 ], std: [ 2.90, 1.07 ], fq: 50
  },
  "violent": {
    dict: "anew-neg-stem", word: "violent", stem: "violent",
    ant: [ "nonviolent" ],
    avg: [ 3.95, 6.84 ], std: [ 2.11, 1.30 ], fq: 19
  },
  "virtuou": {
    dict: "anew-neg-stem", word: "virtuous", stem: "virtuou",
    ant: [ "wicked" ],
    avg: [ 6.09, 3.38 ], std: [ 2.44, 1.95 ], fq: 50
  },
  "vocal": {
    dict: "anew-neg-stem", word: "vocal", stem: "vocal",
    ant: [ "instrumental" ],
    avg: [ 3.92, 6.76 ], std: [ 2.36, 1.45 ], fq: 23
  },
  "volum": {
    dict: "anew-neg-stem", word: "volume", stem: "volum",
    ant: [ "softness" ],
    avg: [ 5.06, 6.75 ], std: [ 3.02, 1.97 ], fq: 19
  },
  "volum": {
    dict: "anew-neg-stem", word: "volumes", stem: "volum",
    ant: [ "softness" ],
    avg: [ 5.06, 6.75 ], std: [ 3.02, 1.97 ], fq: 19
  },
  "vulner": {
    dict: "anew-neg-stem", word: "vulnerable", stem: "vulner",
    ant: [ "invulnerable" ],
    avg: [ 3.85, 6.05 ], std: [ 2.46, 2.01 ], fq: 20
  },
  "wake": {
    dict: "anew-neg-stem", word: "wake", stem: "wake",
    ant: [ "sleep" ],
    avg: [ 2.80, 7.16 ], std: [ 2.66, 1.71 ], fq: 50
  },
  "wake": {
    dict: "anew-neg-stem", word: "waking", stem: "wake",
    ant: [ "sleeping", "sleep" ],
    avg: [ 2.80, 7.09 ], std: [ 2.66, 1.69 ], fq: 100
  },
  "wake": {
    dict: "anew-neg-stem", word: "wakes", stem: "wake",
    ant: [ "sleep" ],
    avg: [ 2.80, 7.16 ], std: [ 2.66, 1.71 ], fq: 50
  },
  "walk": {
    dict: "anew-neg-stem", word: "walk", stem: "walk",
    ant: [ "ride" ],
    avg: [ 5.87, 6.14 ], std: [ 2.56, 1.39 ], fq: 50
  },
  "want": {
    dict: "anew-neg-stem", word: "wanted", stem: "want",
    ant: [ "unwanted" ],
    avg: [ 5.10, 2.71 ], std: [ 2.17, 1.55 ], fq: 20
  },
  "war": {
    dict: "anew-neg-stem", word: "wars", stem: "war",
    ant: [ "peace" ],
    avg: [ 2.95, 7.86 ], std: [ 2.55, 1.34 ], fq: 50
  },
  "war": {
    dict: "anew-neg-stem", word: "war", stem: "war",
    ant: [ "peace" ],
    avg: [ 2.95, 7.86 ], std: [ 2.55, 1.34 ], fq: 50
  },
  "warm": {
    dict: "anew-neg-stem", word: "warm", stem: "warm",
    ant: [ "cool" ],
    avg: [ 3.43, 6.82 ], std: [ 2.31, 1.56 ], fq: 21
  },
  "weak": {
    dict: "anew-neg-stem", word: "weakness", stem: "weak",
    ant: [ "strength" ],
    avg: [ 5.30, 6.73 ], std: [ 2.83, 2.31 ], fq: 21
  },
  "weak": {
    dict: "anew-neg-stem", word: "weak", stem: "weak",
    ant: [ "strong" ],
    avg: [ 5.92, 7.06 ], std: [ 2.28, 1.52 ], fq: 50
  },
  "weaken": {
    dict: "anew-neg-stem", word: "weaken", stem: "weaken",
    ant: [ "strengthen" ],
    avg: [ 4.70, 7.21 ], std: [ 2.52, 1.08 ], fq: 19
  },
  "wealth": {
    dict: "anew-neg-stem", word: "wealth", stem: "wealth",
    ant: [ "poverty" ],
    avg: [ 4.87, 1.98 ], std: [ 2.66, 1.12 ], fq: 50
  },
  "wear": {
    dict: "anew-neg-stem", word: "wearing", stem: "wear",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "wear": {
    dict: "anew-neg-stem", word: "wears", stem: "wear",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "wear": {
    dict: "anew-neg-stem", word: "wear", stem: "wear",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "weari": {
    dict: "anew-neg-stem", word: "weary", stem: "weari",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "weep": {
    dict: "anew-neg-stem", word: "weep", stem: "weep",
    ant: [ "laugh" ],
    avg: [ 6.74, 8.22 ], std: [ 1.84, 1.37 ], fq: 50
  },
  "welcom": {
    dict: "anew-neg-stem", word: "welcome", stem: "welcom",
    ant: [ "unwelcome" ],
    avg: [ 4.39, 3.50 ], std: [ 2.59, 1.96 ], fq: 21
  },
  "well": {
    dict: "anew-neg-stem", word: "wellness", stem: "well",
    ant: [ "illness" ],
    avg: [ 4.71, 2.00 ], std: [ 2.24, 1.18 ], fq: 50
  },
  "well": {
    dict: "anew-neg-stem", word: "well", stem: "well",
    ant: [ "ill", "badly" ],
    avg: [ 4.71, 2.62 ], std: [ 2.24, 1.43 ], fq: 100
  },
  "went": {
    dict: "anew-neg-stem", word: "went", stem: "went",
    ant: [ "come", "malfunction", "stop" ],
    avg: [ 4.76, 4.36 ], std: [ 2.58, 1.29 ], fq: 120
  },
  "wet": {
    dict: "anew-neg-stem", word: "wet", stem: "wet",
    ant: [ "dry" ],
    avg: [ 3.76, 4.64 ], std: [ 2.06, 1.26 ], fq: 50
  },
  "whisper": {
    dict: "anew-neg-stem", word: "whisper", stem: "whisper",
    ant: [ "shout" ],
    avg: [ 6.83, 3.88 ], std: [ 2.70, 1.38 ], fq: 50
  },
  "white": {
    dict: "anew-neg-stem", word: "white", stem: "white",
    ant: [ "black" ],
    avg: [ 4.61, 4.88 ], std: [ 2.24, 1.84 ], fq: 50
  },
  "white": {
    dict: "anew-neg-stem", word: "whites", stem: "white",
    ant: [ "black" ],
    avg: [ 4.61, 4.88 ], std: [ 2.24, 1.84 ], fq: 50
  },
  "whole": {
    dict: "anew-neg-stem", word: "whole", stem: "whole",
    ant: [ "partly" ],
    avg: [ 3.82, 5.32 ], std: [ 2.24, 1.17 ], fq: 50
  },
  "wick": {
    dict: "anew-neg-stem", word: "wicked", stem: "wick",
    ant: [ "virtuous" ],
    avg: [ 5.10, 6.85 ], std: [ 2.25, 1.53 ], fq: 20
  },
  "wife": {
    dict: "anew-neg-stem", word: "wife", stem: "wife",
    ant: [ "husband" ],
    avg: [ 4.38, 7.41 ], std: [ 2.89, 1.74 ], fq: 21
  },
  "wild": {
    dict: "anew-neg-stem", word: "wild", stem: "wild",
    ant: [ "tame" ],
    avg: [ 3.80, 5.55 ], std: [ 2.13, 1.42 ], fq: 50
  },
  "will": {
    dict: "anew-neg-stem", word: "willing", stem: "will",
    ant: [ "unwilling" ],
    avg: [ 4.64, 3.25 ], std: [ 1.99, 1.41 ], fq: 21
  },
  "win": {
    dict: "anew-neg-stem", word: "wins", stem: "win",
    ant: [ "lose", "fail" ],
    avg: [ 6.34, 2.50 ], std: [ 2.55, 1.65 ], fq: 71
  },
  "win": {
    dict: "anew-neg-stem", word: "win", stem: "win",
    ant: [ "lose", "fail" ],
    avg: [ 6.34, 2.50 ], std: [ 2.55, 1.65 ], fq: 71
  },
  "win": {
    dict: "anew-neg-stem", word: "winning", stem: "win",
    ant: [ "lose", "fail" ],
    avg: [ 6.34, 2.50 ], std: [ 2.55, 1.65 ], fq: 71
  },
  "wine": {
    dict: "anew-neg-stem", word: "wines", stem: "wine",
    ant: [ "lose", "fail" ],
    avg: [ 6.34, 2.50 ], std: [ 2.55, 1.65 ], fq: 71
  },
  "winner": {
    dict: "anew-neg-stem", word: "winners", stem: "winner",
    ant: [ "loser" ],
    avg: [ 4.95, 2.20 ], std: [ 2.57, 1.11 ], fq: 50
  },
  "winner": {
    dict: "anew-neg-stem", word: "winner", stem: "winner",
    ant: [ "loser" ],
    avg: [ 4.95, 2.20 ], std: [ 2.57, 1.11 ], fq: 50
  },
  "wise": {
    dict: "anew-neg-stem", word: "wise", stem: "wise",
    ant: [ "foolish" ],
    avg: [ 4.57, 3.00 ], std: [ 2.01, 1.33 ], fq: 20
  },
  "wish": {
    dict: "anew-neg-stem", word: "wishing", stem: "wish",
    ant: [ "begrudge" ],
    avg: [ 4.47, 3.95 ], std: [ 1.71, 1.59 ], fq: 20
  },
  "wish": {
    dict: "anew-neg-stem", word: "wished", stem: "wish",
    ant: [ "begrudge" ],
    avg: [ 4.47, 3.95 ], std: [ 1.71, 1.59 ], fq: 20
  },
  "wish": {
    dict: "anew-neg-stem", word: "wishes", stem: "wish",
    ant: [ "begrudge" ],
    avg: [ 4.47, 3.95 ], std: [ 1.71, 1.59 ], fq: 20
  },
  "wish": {
    dict: "anew-neg-stem", word: "wish", stem: "wish",
    ant: [ "begrudge" ],
    avg: [ 4.47, 3.95 ], std: [ 1.71, 1.59 ], fq: 20
  },
  "wive": {
    dict: "anew-neg-stem", word: "wives", stem: "wive",
    ant: [ "husband" ],
    avg: [ 4.38, 7.41 ], std: [ 2.89, 1.74 ], fq: 21
  },
  "woke": {
    dict: "anew-neg-stem", word: "woke", stem: "woke",
    ant: [ "sleep" ],
    avg: [ 2.80, 7.16 ], std: [ 2.66, 1.71 ], fq: 50
  },
  "woman": {
    dict: "anew-neg-stem", word: "woman", stem: "woman",
    ant: [ "man" ],
    avg: [ 5.24, 5.90 ], std: [ 2.31, 1.40 ], fq: 50
  },
  "women": {
    dict: "anew-neg-stem", word: "women", stem: "women",
    ant: [ "man" ],
    avg: [ 5.24, 5.90 ], std: [ 2.31, 1.40 ], fq: 50
  },
  "won": {
    dict: "anew-neg-stem", word: "won", stem: "won",
    ant: [ "lose", "fail", "lost" ],
    avg: [ 6.17, 2.58 ], std: [ 2.57, 1.57 ], fq: 121
  },
  "wore": {
    dict: "anew-neg-stem", word: "wore", stem: "wore",
    ant: [ "refresh" ],
    avg: [ 2.77, 6.62 ], std: [ 2.22, 1.56 ], fq: 21
  },
  "work": {
    dict: "anew-neg-stem", word: "work", stem: "work",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "work": {
    dict: "anew-neg-stem", word: "worked", stem: "work",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "work": {
    dict: "anew-neg-stem", word: "working", stem: "work",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "work": {
    dict: "anew-neg-stem", word: "works", stem: "work",
    ant: [ "malfunction" ],
    avg: [ 4.62, 2.68 ], std: [ 2.40, 1.49 ], fq: 20
  },
  "worn": {
    dict: "anew-neg-stem", word: "worn", stem: "worn",
    ant: [ "refresh", "new" ],
    avg: [ 4.12, 6.74 ], std: [ 2.37, 1.37 ], fq: 71
  },
  "worri": {
    dict: "anew-neg-stem", word: "worried", stem: "worri",
    ant: [ "reassure" ],
    avg: [ 3.70, 6.55 ], std: [ 2.40, 1.76 ], fq: 21
  },
  "worri": {
    dict: "anew-neg-stem", word: "worries", stem: "worri",
    ant: [ "reassure" ],
    avg: [ 3.70, 6.55 ], std: [ 2.40, 1.76 ], fq: 21
  },
  "worri": {
    dict: "anew-neg-stem", word: "worrying", stem: "worri",
    ant: [ "reassure" ],
    avg: [ 3.70, 6.55 ], std: [ 2.40, 1.76 ], fq: 21
  },
  "worri": {
    dict: "anew-neg-stem", word: "worry", stem: "worri",
    ant: [ "reassure" ],
    avg: [ 3.70, 6.55 ], std: [ 2.40, 1.76 ], fq: 21
  },
  "wors": {
    dict: "anew-neg-stem", word: "worse", stem: "wors",
    ant: [ "better", "good" ],
    avg: [ 5.00, 7.09 ], std: [ 2.76, 1.37 ], fq: 100
  },
  "worst": {
    dict: "anew-neg-stem", word: "worst", stem: "worst",
    ant: [ "best", "good" ],
    avg: [ 5.00, 7.19 ], std: [ 2.76, 1.58 ], fq: 100
  },
  "worthi": {
    dict: "anew-neg-stem", word: "worthy", stem: "worthi",
    ant: [ "unworthy" ],
    avg: [ 4.24, 2.79 ], std: [ 2.47, 1.72 ], fq: 20
  },
  "worthless": {
    dict: "anew-neg-stem", word: "worthless", stem: "worthless",
    ant: [ "valuable" ],
    avg: [ 3.85, 7.17 ], std: [ 2.32, 1.42 ], fq: 19
  },
  "wound": {
    dict: "anew-neg-stem", word: "wound", stem: "wound",
    ant: [ "unwind" ],
    avg: [ 2.39, 6.02 ], std: [ 2.13, 1.85 ], fq: 50
  },
  "wrap": {
    dict: "anew-neg-stem", word: "wrapped", stem: "wrap",
    ant: [ "unwind" ],
    avg: [ 2.39, 6.02 ], std: [ 2.13, 1.85 ], fq: 50
  },
  "wrong": {
    dict: "anew-neg-stem", word: "wrong", stem: "wrong",
    ant: [ "right", "correct" ],
    avg: [ 4.61, 6.68 ], std: [ 2.53, 1.88 ], fq: 69
  },
  "young": {
    dict: "anew-neg-stem", word: "young", stem: "young",
    ant: [ "old" ],
    avg: [ 4.48, 3.19 ], std: [ 2.66, 1.94 ], fq: 21
  },
  "younger": {
    dict: "anew-neg-stem", word: "younger", stem: "younger",
    ant: [ "old" ],
    avg: [ 4.48, 3.19 ], std: [ 2.66, 1.94 ], fq: 21
  }
};


function anew_neg_extend( term, avg, std, fq )

  //  Extend the ANEW negation dictionary with the given term
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

  if ( anew_neg_term.hasOwnProperty( term ) ) {
    console.log( "anew_neg_extend(), replacing term " + term );
  }
  if ( anew_neg_stem.hasOwnProperty( stem ) ) {
    console.log( "anew_neg_extend(), replacing stem " + stem );
  }

  anew_neg_term[ term ] = { dict: "anew-neg",
    word: term, stem: stem, ant: [ ], avg: avg, std: std, fq: fq };
  anew_neg_stem[ stem ] = { dict: "anew-neg-stem",
    word: term, stem: stem, ant: [ ], avg: avg, std: std, fq: fq };
}					// End routine anew_neg_extend


function anew_neg_find_stem( s )

  //  Return the stem's in the ANEW dictionary, or -1 if no such stem
  //
  //  s:  Stem to search
{
  if ( s.length == 0 ) {		// Empty term?
    return -1;
  }

  if ( anew_neg_stem.hasOwnProperty( s ) ) {
    return anew_neg_stem[ s ];
  }

  return -1;
}					// End routine anew_neg_find_stem


function anew_neg_find_word( w )

  //  Return the word's in the ANEW dictionary, or -1 if no such word
  //
  //  w:  Word to search
{
  if ( w.length == 0 ) {		// Empty term?
    return -1;
  }

  if ( anew_neg_term.hasOwnProperty( w ) ) {
    return anew_neg_term[ w ];
  }

  return -1;
}					// End routine anew_neg_find_word
