/*- NEG.JS -----------------------------------------------------------------*/
/*    Routines to determine if ANEW terms in a tweet should be considered   */
/*    negated								    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  22-Sep-16	Christopher G. Healey	Initial implementation		    */
/*  27-Oct-16	Christopher G. Healey	Added degree adverbs		    */
/*  30-Oct-16	Christopher G. healey	Switched from 3-arrays to dict:	    */
/*					{ term:, neg:, type: }; term is	    */
/*					term: target term, neg is negation  */
/*					flag, type is negation type, pre-   */
/*					negation PREN, post-negation POSN   */
/*--------------------------------------------------------------------------*/

//  Module global variables

var  conj = [				// Conjunctions to extend term wnidow
  "and", "or", "nor"
];
var  deg_adv = [			// Adverbs of degree
  "almost", "absolutely", "awfully", "badly", "barely", "completely",
  "decidedly", "deeply", "enough", "enormously", "entirely", "extremely",
  "fairly", "far", "fully", "greatly", "hardly", "highly", "how",
  "incredibly", "indeed", "intensely", "just", "least", "less", "little",
  "lots", "most", "much", "nearly", "perfectyl", "positively", "practically",
  "pretty", "purely", "quite", "rather", "really", "scarcely", "simply",
  "so", "somewhat", "strongly", "terribly", "thoroughly", "too", "totally",
  "utterly", "very", "virtually", "well"
];
var  doub = [				// Double negative trigger terms
  "still", [ "no", "doubt" ], [ "no", "need" ]
];

//  https://www.grammarly.com/handbook/sentences/negatives/
//  Need multi-term triggers to occur first, then single term triggers
//  Need to include UTF-8 \u2019 apostrophe

var  trig = [				// Negation trigger terms
  [ "no", "need" ], [ "no", "one" ], "no", "not", "none", "nobody",
  "nothing", "neither", "nowhere", "never", "hardly", "scarcely", "barely",
  "doesnt", "doesn't", "doesn\u2019t", "isnt", "isn't", "isn\u2019t",
  "wasnt", "wasn't", "wasn\u2019t", "shouldnt", "shouldn't",
  "shouldn\u2019t", "couldnt", "couldn't", "couldn\u2019t", "wont",
  "won't", "won\u2019t", "cant", "can't", "can\u2019t", "dont", "don't",
  "don\u2019t", "aint", "ain't", "ain\u2019t", "cannot"
];
var  win_sz = 5;			// Window size for negation terms


function neg_post( list, term, i )

  //  Estimate if term list[ i ] is post-negated
  //
  //  list:  List of terms in tweet
  //  term:  Term to check
  //  i:     Position of term
{
  var  anew_neg;			// ANEW negation structure for term
  var  block;				// Potential blocking term
  var  j, k;				// Loop counters
  var  stop;				// Stop index


  //  Check succeding terms for negation triggers

  for( j = i + 1; j < list.length && j <= i + win_sz; j++ ) {
    if ( neg_trig_term( list, j ) ) {

    //  Check for a "blocker" word (verb, noun, adjective, adverb)
    //  occuring after a negation term, e.g.
    //
    //    I'm happy and it's not SILLY
    //
    //  Here, if the target is HAPPY, we would see not and think HAPPY
    //  is negated, but not is applying to SILLY. So, if we see this
    //  situation, we want to stop searching for a negation term and
    //  return False
    //
    //  Use regex to strip any leading or trailing quote characters

      stop = j + win_sz;
      for( k = j; k < list.length && k <= j + win_sz; k++ ) {
        block = list[ k ].replace( /^['"]/, "" ).replace( /['"]$/, "" );

        if ( block == "." ) {		// Start of new sentence ends search
          return [ false, -1 ];
        }

    //  Ignore "degree adverbs" like HARDLY SILLY or INCREDIBLY SILLY
    //  they're affecting the degree of following terms and shoudln't
    //  be blockers

        if ( deg_adv.indexOf( block ) != -1 ) {
          stop++;
          continue;
        }
          
        if ( POS.hasOwnProperty( block ) ) {
          return [ false, -1 ];
        }				// End if blocker term
      }					// End for all possible blocker terms

      return [ true, j ];
    }					// End if negation trigger found
  }					// End for all suceeding terms

  return [ false, -1 ];
}					// End function neg_post


function neg_pre( list, term, i )

  //  Estimate if term list[ i ] is pre-negated
  //
  //  list:  List of terms in tweet
  //  term:  Term to check
  //  i:     Position of term
{
  var  anew_neg;			// ANEW negation structure for term
  var  block = "";			// Potential blocking term
  var  comma_beg;			// Beginning of comma block
  var  comma_end;			// End of comma block
  var  conj_term;			// Current term is conjunction flag
  var  j;				// Loop counter
  var  prev_conj;			// Previous term was conjunction flag
  var  stop;				// Stop index


  conj_term = false;
  prev_conj = false;

  //  Term to check may be in the middle of a comma list, e.g.
  //
  //    I'm not HAPPY_,_ SAD_,_ _or_ UPSET
  //
  //  so look forward to see if a conjection happens, if so, then set
  //  conj_seen to true (otherwise false); see below for more details
  //  on how commas are specia-case conjunctions

  //  Check preceding terms for negation triggers

  stop = i - win_sz;

  for( j = i - 1; j >= 0 && j >= stop; j-- ) {
    if ( neg_trig_term( list, j ) ) {
      return [ true, j ];
    }

    if ( block == "." ) {		// Start of new sentence ends search
      return [ false, -1 ];
    }

    //  Check for a "blocker" word (verb, noun, adjective, adverb)
    //  occuring between the target term and negation trigger, e.g.
    //
    //    it's not SILLY to be HAPPY
    //
    //  Here, if the target is HAPPY, we would see not and think HAPPY
    //  is negated, but not is applying to SILLY. So here, we want to
    //  stop searching for a negation term and return False
    //
    //  However, we also need to look for a conjunction that connects
    //  the blocker to the target, e.g.
    //
    //    I'm not HAPPY _or_ SAD
    //
    //  If SAD were the target, HAPPY would block it, but the
    //  conjunction term _or_ means not is applied to both HAPPY and
    //  SAD. Here, we'd ignore the blocker and continue searching for
    //  a negation term
    //
    //  Finally, sometimes a comma can act as a conjunction
    //
    //    I'm not HAPPY_,_ SAD_,_ _or_ UPSET
    //
    //  but sometimes it doesn't
    //
    //    I'm not ANGRY_,_ RIGHT?
    //
    //  Here, if RIGHT is the target, then the comma SHOULD NOT act as
    //  a conjunction, otherwise ANGRY will be ignored as a blocker
    //  and RIGHT will be negated by not. The key seems to be that a
    //  comma can act as a blocker only if the target has an
    //  conjunction (AND, OR, NOR) immediately after the list of
    //  blockers connected by commas

    //  If we see a comma, walk a possible comma block
    //
    //    ..X, [Y,]+ _CONJ_ Z
    //
    //  to update j to position of X, and to update stop to skip the
    //  comma block (so comma block doesn't count as part of term
    //  window to check)

    if ( block == "," ) {		// Previous term was comma?
      comma_beg = walk_comma_pre( list, j + 1 );

      if ( comma_beg != -1 ) {		// Comma block found?
        stop -= ( j + 1 ) - comma_beg;
        j = ( comma_beg - 1 < 0 ) ? 0 : comma_beg;
        prev_conj = true;

      } else {				// Comma block not found
        prev_conj = false;
      }

    //  Check if succeeding term term is a conjunction, use block from
    //  prev pass thru list since it's the "j+1" term; skip first pass
    //  thru loop since target is behind first blocker

    } else if ( j + 1 < i ) {
      prev_conj = ( conj.indexOf( block ) != -1 );
    }

    //  Skip empty entries in token list

    while( list[ j ].length == 0 ) {
      if ( j - 1 < 0 ) {
        return [ false, -1 ];
      } else {
        j--;
        stop--;
      }
    }

    //  Use regex to strip any leading or trailing quote characters

    block = list[ j ].replace( /^['"]/, "" ).replace( /['"]$/, "" );

    //  Ignore "degree adverbs" like HARDLY SILLY or INCREDIBLY SILLY
    //  they're affecting the degree of following terms and shoudln't
    //  be blockers

    if ( deg_adv.indexOf( block ) != -1 ) {
      stop--;
      continue;
    }

    //  Conjunction terms can't be blockers

    conj_term = ( conj.indexOf( block ) != -1 ) || ( block == "," );

    if ( !conj_term && !prev_conj && POS.hasOwnProperty( block ) ) {
      return [ false, -1 ];
    }
  }

  return [ false, -1 ];
}					// End function neg_pre


function neg_split( body )

  //  Split body into terms, normally we'd split on any
  //  non-alphanumeric character [A-Za-z0-9_], but commas can act as
  //  conjunctions, so we expand them from ',' to ' ,' to appear as a
  //  separate term, then split on non-alphanumeric or comma
  //
  //  body:  Body text to split
{
  var  list;				// Body converted to tokens


  body = body.replace( /,/g, " , " );	// Expand commas
  body = body.replace( /\./g, " . " );	// Expand periods

  //  Split on non-alphanumeric, except comma or apostrophe, then use
  //  filter to strip any empty entries in the array

  list = body.toLowerCase().split( /[^\w,.']/ );
  return list;
}					// End function neg_split


function neg_list( body )

  //  Check a list of tokens to see which (if any) are negated
  //
  //  body:  Body text to check
{
  var  i;				// Loop counter
  var  list;				// Body converted to tokens
  var  list_type = [ ];			// Term type: term, stem, or none
  var  neg_tok = [ ];			// True/false negation for each token
  var  neg_trigger = [ ];		// Whether word is negation trigger
  var  rc;				// Return code list from pre/post_neg..
  var  stem;				// Stemmed term
  var  tg;				// Target term


  list = neg_split( body );		// Split body into terms

  //  Initialize the lists to the same length as the number of tokens

  for( i = 0; i < list.length; i++ ) {
    neg_tok.push( { term: list[ i ], neg: false, type: "NONE" } );
  }

  //  Build a list of term/stem/none to define whether each term is in
  //  the anew_neg_term dict, anew_neg_stem dict, or neither

  for( i = 0; i < list.length; i++ ) {
    tg = list[ i ];			// Target term to evaluate

    //  Conjunctions and degree adverbs cannot be negated

    if ( conj.indexOf( tg ) != -1 || deg_adv.indexOf( tg ) != -1 ) {
      list_type.push( [ tg, "none" ] );
    } else if ( anew_neg_term.hasOwnProperty( tg ) ) {
      list_type.push( [ tg, "term" ] );

    } else {			//  Check if stemmed term in neg stem list
      stem = stemmer( tg );

      if ( anew_neg_stem.hasOwnProperty( stem ) ) {
        list_type.push( [ stem, "stem" ] );
      } else {
        list_type.push( [ tg, "none" ] );
      }				// End if stem in neg stem list
    }				// End if term in neg term list
  }				// End for all terms in list

  //  First, check for pre-negation of terms

  for( i = 0; i < list.length; i++ ) {
    type = list_type[ i ][ 1 ];
    if ( type != "term" && type != "stem" ) {
      continue;
    }

    rc = neg_pre( list, list_type[ i ][ 0 ], i );
    if ( rc[ 0 ] != false ) {
      neg_tok[ i ][ "neg" ] = true
      neg_tok[ i ][ "term" ] = list[ i ];
      neg_tok[ i ][ "type" ] = "PREN";
    }
  }

  //  Next, check for post-negation of terms, this can only happen if
  //  a trigger hasn't pre-negated something in the previous loop

  for( i = 0; i < list.length; i++ ) {
    type = list_type[ i ][ 1 ];
    if ( type != "term" && type != "stem" ) {
      continue;
    }

    rc = neg_post( list, list_type[ i ][ 0 ], i );
    if ( rc[ 0 ] != false && neg_trigger[ rc[ 1 ] ] == "NONE" ) {
      neg_tok[ i ][ "neg" ] = true
      neg_tok[ i ][ "term" ] = tg;
      neg_tok[ i ][ "type" ] = "POSN";
    }
  }

  return neg_tok;
}


function neg_trig_term( list, pos )

  //  Check if term is a negation trigger
  //
  //  list:  List of tokens in tweet
  //  pos:   Position of term to check as trigger
{
  var  i, j;				// Loop counter
  var  len;				// Length of multi-term trigger


  for( i = 0; i < trig.length; i++ ) {

    //  Check for single-term triggers

    if ( typeof( trig[ i ] ) == "string" ) {
      if ( list[ pos ] == trig[ i ] ) {
        return true;
      }

    } else {				//  Trigger must be a list of terms
      len = trig[ i ].length;

    //  First check for a situation like "no one" starting at "no" and
    //  moving on to "one"

      if ( pos + len <= list.length ) {	// Enough terms to check
        for( j = 0; j < len; j++ ) {
          if ( list[ pos + j ] != trig[ i ][ j ] ) {
            break;
          }
        }
      }

      if ( j == len ) {			// All terms passed?
        return true;
      }

    //  Next check for a situation like "no one" starting at "one" and
    //  moving backwards to "no"

      if ( pos - ( len - 1 ) >= 0 ) {	// Enough terms to check
        for( j = 0; j < len; j++ ) {
          if ( list[ pos - j ] != trig[ i ][ ( len - 1 ) - j ] ) {
            break;
          }
        }
      }

      if ( j == len ) {			// All terms passed?
        return true;
      }

    }
  }

  return false;
}					// End function neg_trig_term


function walk_comma_post( list, pos )

  //  This routine walks forwards through a comma conjunctive block:
  //
  //    ..X, [Y,]+, _CONJ_ Z
  //
  //  where _CONJ_ is a conjunction (conj) and we want to return the
  //  position of Z
  //
  //  Note: We do not handle multiple tokens between commas, e.g.
  //
  //    ...good, pretty good, or bad...
  //
  //  list:  List of tokens in tweet
  //  pos:   Position of first comma seent
{
  var  conj_seen = false;		// Conjunction seen flag
  var  i;				// Loop counter


  //  First, ensure a conjunction occurs somewhere after the comma

  for( i = pos + 1; i < list.length - 1; i += 2 ) {
    if ( conj.indexOf( list[ i ] ) != -1 ) {
      return i + 1;

    //  If token isn't conjunction, and following token isn't comma,
    //  this is not a comma block

    } else if ( i + 1 < list.length && list[ i + 1 ] != "," ) {
      return pos + 1;
    }
  }

  return pos + 1;			// No conjunction seen
}					// End function walk_comma_pre


function walk_comma_pre( list, pos )

  //  This routine walks backwards through a comma conjunctive block:
  //
  //    ..X, [Y,]+, _CONJ_ Z  (Oxford comma)
  //
  //  or
  //
  //    ..X, [Y,]+ _CONJ_ Z
  //
  //  where _CONJ_ is a conjunction (conj) and we want to return the
  //  position of X; if not a comma block, return -1
  //
  //  Note: We do not handle multiple tokens between commas, e.g.
  //
  //    ...good, pretty good, or bad...
  //
  //  would fail at second good, because it doesn't see a conjunction
  //  or comma
  //
  //  list:  List of tokens in tweet
  //  pos:   Position of first comma seent
{
  var  conj_seen = false;		// Conjunction seen flag
  var  i;				// Loop counter


  //  First, ensure a conjunction occurs somewhere after the comma

  for( i = pos + 1; i < list.length; i += 2 ) {
    while( list[ i ].length == 0 ) {	// Skip empty tokens
      if ( ( ( i + 1 >= list.length ) ? -1 : i++ ) == -1 ) {
        return -1;
      }
    }

    if ( list[ i ] == "." ) {		// End of current sentence ends search
      return -1;
    }

    if ( conj.indexOf( list[ i ] ) != -1 ) {
      conj_seen = true;
      break;

    //  If no Oxford comma (X, [X',]+ Y _CONJ Z) then eventually term
    //  at i+1 will be a conjunction

    } else if ( i + 1 < list.length && conj.indexOf( list[ i + 1 ] ) != -1 ) {
      conj_seen = true;
      break;

    //  If token isn't conjunction, and following token isn't comma,
    //  this is not a comma block

    } else if ( i + 1 < list.length && list[ i + 1 ] != "," ) {
      return -1;
    }
  }

  if ( !conj_seen ) {			// No conjunction, not comma block
    return -1;
  }

  //  Now walk backwards, searching for X, start of comma block

  for( i = pos - 2; i >= 0; i -= 2 ) {
    while( list[ i ].length == 0 ) {	// Skip empty tokens
      if ( ( ( i + 1 >= list.length ) ? -1 : i-- ) == -1 ) {
        return -1;
      }
    }

    if ( list[ i ] != "," ) {		// End of comma block seen?
      return i + 1;
    }
  }

  return 0;				// First tok is front of comma block
}					// End function walk_comma_pre
