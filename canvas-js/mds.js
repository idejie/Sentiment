/*--------------------------------------------------------------------------*/
/*  MDS.JS								    */
/*    Routines to perform multidimensional scaling projection		    */
/* 									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/* 									    */
/*  01-May-12	Christopher G. Healey	Initial implementation		    */
/*--------------------------------------------------------------------------*/


function mds( D )

  //  Perform Classic MDS based on tweet dissimilarity matrix
  //
  //  D:  Dissimilarity matrix
{
  var  B;				// Double centering matrix
  var  D_sqr = [ ];			// Squared dissimilarity matrix
  var  diag;				// Matrix w/sqrt(eigenval) on diagonal
  var  E;				// Eigenvectors/values
  var  E_vec;				// Matrix w/eigenvecs as columns
  var  max_eig_i = [ ];			// Indices of two largest eignevals
  var  max_eig_v = [ ];			// Two largest eignevals
  var  n;				// Number of tweets
  var  I;				// Identity matrix
  var  J;				// Centering matrix
  var  One;				// Matrix of all 1/n
  var  P = [ ];				// Project point matrix
  var  proj;				// Vector-form of projected points


  //  Classical MDS calculation:
  //
  //    1. Compute squared dissimilarity matrix D^2
  //    2. Compute centering matrix J = I - (1/n) 1, where
  //       - n = number of items in D (i.e., D.rows() or D.cols())
  //       - 1 = n x n matrix w/1 in every position
  //    3. Compute double centering matrix B = -(1/2) J D^2 J
  //    4. Extract m largest positive eigenvalues (e.g., E_1, E_2 for
  //       an embedding in the plane) and corresponding eigenvectors
  //    5. Create diagonal matrix diag w/sqrt of eigenvalues on diagonal
  //    6. Create matrix E_vec w/eigenvectors as columns
  //    7. Projected point positions P are P = E_vec * diag

  n = D.length;
  //n = D.length;

  I = numeric.identity( n );		// Create I, One matrices
  One = numeric.rep( [n,n], 1.0 / n );

  D_Sqr = new Array( n );		// Build D_sqr, eigenvec matrices
  E_vec = new Array( n );

  for( i = 0; i < n; i++ ) {
    D_sqr[ i ] = new Array( n );
    E_vec[ i ] = new Array( 2 );

    for( j = 0; j < n; j++ ) {
      D_sqr[ i ][ j ] = Math.pow( D[ i ][ j ], 2.0 );
      //D_sqr[ i ][ j ] = Math.pow( D[ i ][ j ], 2.0 );
    }
  }

  J = numeric.sub( I, One );
  B = numeric.dot( J, numeric.dot( D_sqr, J ) );
  B = numeric.mul( -0.5, B );

  try {					// Try to compute eigenvectors
    //E = numeric.eig( B, 50000 );
    E = numeric.eig( B, 500 );
  } catch( err ) {			// Catch error

  //  This error is usually caused by a cluster with identical tweets,
  //  which produces a dissimilarity matrix of all 0s

    console.log( "eig() failure, " + n + " tweets..." );
    console.log( "dissim[ 0 ]:" );
    for( i = 0; i < n; i++ ) {
      console.log( "  [ 0 ][ " + i + " ]: " + D[ 0 ][ i ] );
    }

    for( i = 0; i < n; i++ ) {		// Randomly position tweets
      P[ i ] = { x: Math.random(), y: Math.random() };
    }
    return P;
  }

  max_eig_i[ 0 ] = ( E.lambda.x[ 0 ] > E.lambda.x[ 1 ] ) ? 0 : 1;
  max_eig_i[ 1 ] = ( E.lambda.x[ 0 ] > E.lambda.x[ 1 ] ) ? 1 : 0;

  for( i = 2; i < n; i++ ) {
    if ( E.lambda.x[ i ] > E.lambda.x[ max_eig_i[ 0 ] ] ) {
      max_eig_i[ 1 ] = max_eig_i[ 0 ];
      max_eig_i[ 0 ] = i;
    } else if ( E.lambda.x[ i ] > E.lambda.x[ max_eig_i[ 1 ] ] ) {
      max_eig_i[ 1 ] = i;
    }
  }

  diag = numeric.rep( [2,2], 0 );	// Build eigenvalue diagonal matrix
  diag[ 0 ][ 0 ] = Math.sqrt( E.lambda.x[ max_eig_i[ 0 ] ] );
  diag[ 1 ][ 1 ] = Math.sqrt( E.lambda.x[ max_eig_i[ 1 ] ] );

  for( i = 0; i < n; i++ ) {		// Build eigenvector column matrix
    E_vec[ i ][ 0 ] = E.E.x[ i ][ max_eig_i[ 0 ] ];
    E_vec[ i ][ 1 ] = E.E.x[ i ][ max_eig_i[ 1 ] ];
  }

  proj = numeric.dot( E_vec, diag );	// Calc projected point positions

  for( i = 0; i < proj.length; i++ ) {	// Convert to associative entries
    P[ i ] = { x: proj[ i ][ 0 ], y: proj[ i ][ 1 ] };
  }

  return P;
}					// End function MDS


function test_mds()

  //  Test multidimensional scaling on a set of known city distances

{
  var  D;				// Dissimilarity matrix
  var  dist;				// Distance between points
  var  i, j;				// Loop counter
  var  msg;				// Console output message
  var  n;				// Number of points
  var  P;				// Projected distances


  //  US city distance matrix, used to test MDS

  D = [
    [    0, 1052,  776,  578,  618,  581, 1095,  641, 1152,  567,  433,  579 ],
    [ 1052,    0,  400,  851,  551, 1551, 1769,  613, 2072, 1605,  807, 1251 ],
    [  776,  400,    0,  454,  173, 1198, 1370,  216, 1692, 1286,  435,  861 ],
    [  578,  851,  454,    0,  308,  803,  920,  238, 1252,  940,  165,  414 ],
    [  618,  551,  173,  308,    0, 1025, 1227,   90, 1525, 1114,  263,  700 ],
    [  581, 1551, 1198,  803, 1025,    0,  663,  999,  572,  225,  763,  451 ],
    [ 1095, 1769, 1370,  920, 1227,  663,    0, 1156,  557,  879, 1000,  558 ],
    [  641,  613,  216,  238,   90,  999, 1156,    0, 1479, 1105,  240,  645 ],
    [ 1152, 2072, 1692, 1252, 1525,  572,  557, 1479,    0,  676, 1264,  839 ],
    [  567, 1605, 1286,  940, 1114,  225,  879, 1105,  676,    0,  865,  644 ],
    [  433,  807,  435,  165,  263,  763, 1000,  240, 1264,  865,    0,  453 ],
    [  579, 1251,  861,  414,  700,  451,  558,  645,  839,  644,  453,    0 ]
  ];

  P = mds( D );

  //  Print projected distances versus original distance matrix

  n = P.length;

  for( i = 0; i < n; i++ ) {
    msg = i + ": ";

    for( j = 0; j < n; j++ ) {
      dist = Math.sqrt(
        Math.pow( P[ i ].x - P[ j ].x, 2.0 ) +
        Math.pow( P[ i ].y - P[ j ].y, 2.0 ) );

      msg += dist.toFixed( 1 ) + "/" + D[ i ][ j ].toFixed( 1 ) + "; ";
    }

    console.log( msg );
  }
}					// End function test_mds
