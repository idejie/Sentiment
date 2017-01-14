/*--------------------------------------------------------------------------*/
/*  MST.JS								    */
/*    Routines to cluster 2d points with a minimum spanning tree	    */
/*									    */
/*  Usage:								    */
/*    1. Build object w/vertices:					    */
/*         v = [ { x: ..., y: ..., ... }, ... ]				    */
/*									    */
/*      2a. Build dissimilarity matrix between vertices:		    */
/*            dissim = [						    */
/*                       [ v0 - v0, ... v0 - vn ],			    */
/*                         ...,						    */
/*                       [ vn - v0, ... vn - vn ]			    */
/*                     ]						    */
/*									    */
/*            vi - vj: dissimilarity between vi and vj			    */
/*									    */
/*      2b. To compute clusters C with a given threshold t:		    */
/*            C = build_cluster( v, dissim, t );			    */
/*									    */
/*            C:  Array of clusters, each cluster is an array of indices    */
/*                into v						    */
/*									    */
/*     OR								    */
/*									    */
/*      2a. To compute clusters C with a given threshold t:		    */
/*            C = build_cluster_alt( v, d_func, t );			    */
/*              d_func( v_p, v_q ):  Dissimilarity function for two	    */
/*              vertices v_p and v_q					    */
/*									    */
/*            C:  Array of clusters, each cluster is an array of indices    */
/*                into v						    */
/*									    */
/*     3. To request an "optimal" clustering C:				    */
/*          res = cluster( v, dissim );					    */
/*									    */
/*          res:  Object w/two members, C (as above), and threshold,	    */
/*                the threshold value that produced C			    */
/*									    */
/*      See test_mst() for some additional details			    */
/*									    */
/*- Modification History: --------------------------------------------------*/
/*  When:	Who:			Comments:			    */
/*									    */
/*  26-Apr-12	Christopher G. Healey	Initial implementation		    */
/*--------------------------------------------------------------------------*/


function build_cluster_alt( v, d_func, t )

  //  Build a cluster from a MST where edges with weight above a given
  //  threshold are removed
  //
  //  v:       Vertex list
  //  d_func:  Dissimilarity function, d_func( v_p, v_q ), for two vertices
  //           v_p and v_q, both must have .x and .y members
  //  t:       Edge threshold
{
  var  comp = [ ];			// Array of connected components
  var  comp_n = 0;			// Number of connected componnents
  var  dissim;				// Dissimilarity value
  var  e = [ ];				// Edges
  var  i, j;				// Loop counters
  var  mst;				// Minimum spanning tree
  var  v_sort;				// Sorted vertex list
  var  v_e = [ ];			// Set of adjacent edges for each vert
  var  v_inc = [ ];			// Vertex in connected component flag
  var  vert;				// Vertex from connected component


  //  Since MST requires at least one complete path through the graph,
  //  use v0 to all other nodes to build this path

  for( i = 1; i < v.length; i++ ) {
    e.push( { v0: 0, v1: i, w: d_func( v[ 0 ], v[ i ] ) } );
  }

  //  Create a copy of the (remaining) vertex list, sorted by X-pos

  v_sort = new Array( v.length - 1 );

  for( i = 1; i < v.length; i++ ) {
    v_sort[ i - 1 ] = { x: v[ i ].x, y: v[ i ].y, id: i };
  }

  v_sort.sort( function( p, q ) {
    return ( p.x > q.x ) ? 1 : ( ( p.x < q.x ) ? -1 : 0 );
  } );

  //  Build edge list, only include edges within threshold

  for( i = 0; i < v_sort.length; i++ ) {
    for( j = i + 1; ( j < v_sort.length ) &&
                    ( v_sort[ j ].x - v_sort[ i ].x <= t ); j++ ) {
      dissim = d_func( v_sort[ i ], v_sort[ j ] );
      if ( dissim <= t ) {
        e.push( { v0: v_sort[ i ].id, v1: v_sort[ j ].id, w: dissim } );
      }
    }
  }

  mst = kruskal( v, e );		// Built MST

  for( i = 0; i < v.length; i++ ) {	// For all vertices
    v_e[ i ] = { };			// Init vertex's adjacent edge list
    v_inc[ i ] = false;			// Mark vertex as NOT in a component
  }

  for( i = 0; i < mst.length; i++ ) {	// For all MST edges
    if ( mst[ i ].w <= t ) {		// Add edge if below cutoff threshold
      v_e[ mst[ i ].v0 ][ i ] = true;
      v_e[ mst[ i ].v1 ][ i ] = true;
    }
  }

  for( i = 0; i < v.length; i++ ) {	// For all vertices
    if ( v_inc[ i ] == false ) {	// Process vertex if not in component
      comp[ comp_n ] = connect_comp( i, mst, v_e );
      comp_n++;

      for( vert in comp[ comp_n - 1 ] ) {
        v_inc[ vert ] = true;
      }
    }
  }

  return comp;				// Return connected components
}					// End function build_cluster


function build_cluster( v, dissim, thresh )

  //  Build a cluster from a MST where edges with weight above a given
  //  threshold are removed
  //
  //  v:       Vertex list
  //  dissim:  Dissimilarity between vertices
  //  thresh:  Edge threshold
{
  var  comp = [ ];			// Array of connected components
  var  comp_n = 0;			// Number of connected componnents
  var  e = [ ];				// Edges
  var  i, j;				// Loop counters
  var  mst;				// Minimum spanning tree
  var  v_e = [ ];			// Set of adjacent edges for each vert
  var  v_inc = [ ];			// Vertex in connected component flag
  var  vert;				// Vertex from connected component


  //  Build edge list, only include edges within threshold EXCEPT all
  //  edges to v0 are included to ensure at least one complete path

  for( i = 0; i < v.length; i++ ) {	// Build edge list
    for( j = i + 1; j < v.length; j++ ) {
      if ( i == 0 || dissim[ i ][ j ] <= thresh ) {
        e.push( { v0: i, v1: j, w: dissim[ i ][ j ] } );
      }
    }
  }

  mst = kruskal( v, e );		// Built MST

  for( i = 0; i < v.length; i++ ) {	// For all vertices
    v_e[ i ] = { };			// Init vertex's adjacent edge list
    v_inc[ i ] = false;			// Mark vertex as NOT in a component
  }

  for( i = 0; i < mst.length; i++ ) {	// For all MST edges
    if ( mst[ i ].w <= thresh ) {	// Add edge if below cutoff threshold
      v_e[ mst[ i ].v0 ][ i ] = true;
      v_e[ mst[ i ].v1 ][ i ] = true;
    }
  }

  for( i = 0; i < v.length; i++ ) {	// For all vertices
    if ( v_inc[ i ] == false ) {	// Process vertex if not in component
      comp[ comp_n ] = connect_comp( i, mst, v_e );
      comp_n++;

      for( vert in comp[ comp_n - 1 ] ) {
        v_inc[ vert ] = true;
      }
    }
  }

/*
  console.log( "tweets=" + tw.length );
  for( i = 0; i < comp.length; i++ ) {
    var k = Object.keys( comp[ i ] ).length;
    if ( k > 3 ) {
      console.log( "comp[" + i + "]: " + Object.keys( comp[ i ] ).length );
      n = 0;
      for( j = 0; j < tw.length; j++ ) {
        if ( comp[ i ].hasOwnProperty( j ) ) {
          console.log( j + ": " + tw[ j ].body );
        }
      }
      console.log( "---" );
    }
  }
*/

  return comp;				// Return connected components
}					// End function build_cluster


function build_cluster_old( v, mst, thresh )

  //  Build a cluster from a MST where edges with weight above a given
  //  threshold are removed
  //
  //  v:       Vertex list
  //  mst:     Minimum spanning tree
  //  thresh:  Edge threshold
{
  var  comp = [ ];			// Array of connected components
  var  comp_n = 0;			// Number of connected componnents
  var  i;				// Loop counter
  var  v_e = [ ];			// Set of adjacent edges for each vert
  var  v_inc = [ ];			// Vertex in connected component flag
  var  vert;				// Vertex from connected component


  for( i = 0; i < v.length; i++ ) {	// For all vertices
    v_e[ i ] = { };			// Init vertex's adjacent edge list
    v_inc[ i ] = false;			// Mark vertex as NOT in a component
  }

  for( i = 0; i < mst.length; i++ ) {	// For all MST edges
    if ( mst[ i ].w <= thresh ) {	// Add edge if below cutoff threshold
      v_e[ mst[ i ].v0 ][ i ] = true;
      v_e[ mst[ i ].v1 ][ i ] = true;
    }
  }

  for( i = 0; i < v.length; i++ ) {	// For all vertices
    if ( v_inc[ i ] == false ) {	// Process vertex if not in component
      comp[ comp_n ] = connect_comp( i, mst, v_e );
      comp_n++;

      for( vert in comp[ comp_n - 1 ] ) {
        v_inc[ vert ] = true;
      }
    }
  }

/*
  console.log( "tweets=" + tw.length );
  for( i = 0; i < comp.length; i++ ) {
    var k = Object.keys( comp[ i ] ).length;
    if ( k > 3 ) {
      console.log( "comp[" + i + "]: " + Object.keys( comp[ i ] ).length );
      n = 0;
      for( j = 0; j < tw.length; j++ ) {
        if ( comp[ i ].hasOwnProperty( j ) ) {
          console.log( j + ": " + tw[ j ].body );
        }
      }
      console.log( "---" );
    }
  }
*/

  return comp;				// Return connected components
}					// End function build_cluster_old


function build_edge_list( v, dissim, thresh )

  //  Build edge list, only include edges within threshold EXCEPT all
  //  edges to v0 are included to ensure at least one complete path
  //
  //  v:       Vertex list
  //  dissim:  Dissimilarity between vertices
  //  thresh:  Edge threshold
{
  var  e = [ ];				// Edges
  var  i, j;				// Loop counters


  for( i = 0; i < v.length; i++ ) {	// Build edge list
    for( j = i + 1; j < v.length; j++ ) {
      if ( i == 0 || dissim[ i ][ j ] <= thresh ) {
        e.push( { v0: i, v1: j, w: dissim[ i ][ j ] } );
      }
    }
  }

  return e;
}					// End function build_edge_list


function cluster( v, dissim )

  //  Minimum spanning tree based clustering
  //
  //  v:       Array of vertex IDs (MUST have .x and .y members)
  //  dissim:  Dissimilarity between vertices
{
  var  alpha;				// Normlization for cluster scatter
  var  cur_comp = [ ];			// Current connected component array
  var  cur_ratio;			// Current cluster validation ratio
  var  cur_thresh;			// Current edge weight threshold
  var  e = [ ];				// Edge list
  var  i;				// Loop counter
  var  max;				// Maximum edge threshold
  var  min;				// Minimum edge threshold
  var  mst;				// Minimum spanning tree
  var  ratio_opt;			// Optimal ratio
  var  ratio = [ ];			// Validity ratios for each clustering
  var  stat;				// Statistics on MST
  var  step;				// Threshold step size
  var  thresh;				// Optimal threshold

  var  SDbw = false;			// Use udpated SDbw density metric


  e = build_edge_list( v, dissim, 1 );	// Build complete edge list
  mst = kruskal( v, e );		// Kruskal's MST

  stat = comp_stat( mst );		// Calculate avg/std on edge weights
  if ( stat.med - stat.std > stat.std ) {
    min = stat.med - stat.std;
  } else {
    min = stat.med - ( stat.med / 2 );
  }
  max = stat.med + stat.std;

  step = ( max - min ) / 20.0;		// Set threshold, step size
  cur_thresh = max;

  while( cur_thresh >= min ) {		// For all edge thresholds
    cur_comp.length = 0;		// Build clusters
    //cur_comp = build_cluster( v, mst, cur_thresh );
    cur_comp = build_cluster( v, dissim, cur_thresh );

    if ( SDbw ) {			// Compute validity ratio
      ratio.push( comp_ratio_SDbw( cur_comp, v ) );
    } else {
      ratio.push( comp_ratio_SD( cur_comp, v ) );
    }

    cur_thresh -= step;			// Reduce edge threshold
  }

  if ( SDbw ) {				// Set scatter correction factor
    alpha = 1.0;
  } else {
    alpha = ratio[ ratio.length - 1 ].D;
  }

  thresh = max;				// Search for optimal ratio
  ratio_opt = ( alpha * ratio[ 0 ].S ) + ratio[ 0 ].D;

  for( i = 1; i < ratio.length; i++ ) {
    if ( ratio_opt > ( alpha * ratio[ i ].S ) + ratio[ i ].D ) {
      thresh = max - ( step * i );
      ratio_opt = ( alpha * ratio[ i ].S ) + ratio[ i ].D;
    }
  }

  return { C: build_cluster( v, dissim, thresh ), threshold: thresh };
}					// End function cluster


function cmp_edge( e0, e1 )

  //  Compare two edge structures, -1 if e0.w < e1.w, 0 if e0.w ==
  //  e1.w, +1 if e0.w > e1.w
  //
  //  e0:  First edge, in form: { v0, v1, w }
  //  e1:  Second edge
{
  if ( e0.w < e1.w ) {			// Compare edge weights
    return -1;
  } else if ( e0.w > e1.w ) {
    return 1;
  } else {
    return 0;
  }
}					// End function cmp_edge


function comp_centroid( c, v )

  //  Compute the centroid of points in the cluster
  //
  //  c:  Cluster
  //  v:  Vertex positions (MUST have .x and .y members)
{
  var  cent = { x: 0, y: 0 };		// Centroid of cluster
  var  n = 0;				// Number of vertices in cluster
  var  vert;				// Current vertex


  for( vert in c ) {			// Calc average distance to anchor
    n++;
    cent.x += v[ vert ].x;
    cent.y += v[ vert ].y;
  }
  cent.x /= n;
  cent.y /= n;

  return cent;
}					// End function comp_centroid


function comp_ratio_SD( comp, v )

  //  Determine the ratio of intra-cluster scatter to inter-cluster
  //  distance, for a given clustering
  //
  //  Halkidi, Vazirgiannis & Batisakis, "Quality Scheme Assessment
  //  in the Clustering Process", PKDD 2000
  //
  //  comp:  Connected components
  //  v:     Vertex position data
{
  var  cnt;				// Cluster centroids
  var  D;				// Cluster density
  var  D_max;				// Maximum cluster separation
  var  D_min;				// Minimum cluster separation
  var  data = [ ];			// Union of cluster vertices
  var  dist;				// Separation between centroids
  var  dist_i;				// Sum of separation for cluster i
  var  i, j;				// Loop counters
  var  n;				// Number of clusters
  var  S;				// Cluster scatter
  var  vert;				// Vertex in cluster
  var  vrn;				// Cluster variances


  if ( comp.length == 1 ) {		// Only a single component?
    return { S: 0, D: 0 };
  }

  n = comp.length;
  cnt = new Array( n + 1 );
  vrn = new Array( n + 1 );

  //  Calculate cluster variances, and variance of entire dataset

  for( i = 0; i < n; i++ ) {		// Build entire dataset
    cnt[ i ] = comp_centroid( comp[ i ], v );
    vrn[ i ] = comp_variance( comp[ i ], cnt[ i ], v );

    for( vert in comp[ i ] ) {		// Add cluster's vertices to dataset
      data[ vert ] = true;
    }
  }
  cnt[ n ] = comp_centroid( data, v );
  vrn[ n ] = comp_variance( data, cnt[ n ], v );

  S = 0;				// Compute cluster scatter
  for( i = 0; i < n; i++ ) {
    S += len( vrn[ i ] ) / len( vrn[ n ] );
  }
  S /=  n;

  D_max = len( diff( cnt[ 0 ], cnt[ 1 ] ) );
  D_min = len( diff( cnt[ 0 ], cnt[ 1 ] ) );

  D = 0;				// Compute cluster separation
  for( i = 0; i < n; i++ ) {		// For all clusters
    dist_i = 0;				// Init sum of clsuter separations

    for( j = 0; j < n; j++ ) {		// For all other clusters
      if ( i == j ) {			// Ignore self-comparison
        continue;
      }

    //  Calculate cluster separation

      dist = len( diff( cnt[ i ], cnt[ j ] ) );
      dist_i += dist;

      if ( dist > D_max ) {		// Update max/min cluster separation
        D_max = dist;
      } else if ( dist < D_min ) {
        D_min = dist;
      }
    }					// End for all other clusters

    if ( dist_i != 0 ) {
      D += 1.0 / dist_i;		// Update sum of separations
    }
  }					// End for all clusters
  D = ( D_max / D_min ) * D;		// Update overall separation

  return { S: S, D: D };
}					// End function comp_ratio_SD


function comp_ratio_SDbw( comp, v )

  //  Determine the ratio of intra-cluster scatter to inter-cluster
  //  distance, for a given clustering
  //
  //  Halkidi & Vazirgiannis, "Cluster Validity Assessment: Finding
  //  the Optimal Partitioning of a Data Set", IEEE ICDM 2001
  //
  //  comp:  Connected components
  //  v:     Vertex position data
{
  var  cnt;				// Cluster centroids
  var  D;				// Cluster density
  var  data = [ ];			// Union of cluster vertices
  var  den_i;				// Density of cluster i
  var  den_j;				// Density of cluster j
  var  den_u;				// Density of union'd clusters
  var  i, j;				// Loop counters
  var  n;				// Number of clusters
  var  S;				// Cluster scatter
  var  std;				// Std dev of clusters
  var  vert;				// Vertex in cluster
  var  vrn;				// Cluster variances
  var  u = { };				// Midpoint between cluster centroids
  var  u_comp;				// Union of cluster points


  n = comp.length;
  cnt = new Array( n + 1 );
  vrn = new Array( n + 1 );

  //  Calculate cluster variances, and variance of entire dataset

  for( i = 0; i < n; i++ ) {		// Build entire dataset
    cnt[ i ] = comp_centroid( comp[ i ], v );
    vrn[ i ] = comp_variance( comp[ i ], cnt[ i ], v );

    for( vert in comp[ i ] ) {		// Add cluster's vertices to dataset
      data[ vert ] = true;
    }
  }
  cnt[ n ] = comp_centroid( data, v );
  vrn[ n ] = comp_variance( data, cnt[ n ], v );

  S = 0;				// Compute cluster scatter
  for( i = 0; i < n; i++ ) {
    S += len( vrn[ i ] ) / len( vrn[ n ] );
  }
  S /=  n;

  std = 0;				// Compute cluster std dev
  for( i = 0; i < n; i++ ) {
    std += len( vrn[ i ] );
  }
  std = Math.sqrt( std ) / n;

  D = 0;				// Compute cluster separation
  for( i = 0; i < n; i++ ) {
    for( j = 0; j < n; j++ ) {		// For all other clusters
      if ( i == j ) {			// Ignore self-comparison
        continue;
      }

  //  Calculate midpoint of cluster centroids, union of cluster
  //  vertices

      u.x = cnt[ i ].x + ( ( cnt[ j ].x - cnt[ i ].x ) / 2.0 );
      u.y = cnt[ i ].y + ( ( cnt[ j ].y - cnt[ i ].y ) / 2.0 );

      u_comp = new Object();
      for( vert in comp[ i ] ) {
        u_comp[ vert ] = true;
      }
      for( vert in comp[ j ] ) {
        u_comp[ vert ] = true;
      }

  //  Calculate density of clusters and union'd cluster

      den_i = density( comp[ i ], cnt[ i ], v, std );
      den_j = density( comp[ j ], cnt[ j ], v, std );
      den_u = density( u_comp, u, v, std );

  //  Calculate ratio of union'd density to highest cluster density

      if ( den_i == 0 && den_j == 0 ) {
        D += 0;
      } else if ( den_i > den_j ) {
        D += den_u / den_i;
      } else {
        D += den_u / den_j;
      }
    }
  }
  D /= n * ( n - 1 );			// Normalize for number of clusters

  return { S: S, D: D };
}					// End function comp_ratio_SDbw


function comp_stat( mst )

  //  Calculate average and standard deviation of MST edge weights
  //
  //  mst:  Minimum spanning tree to evaluate
{
  var  a = 0;				// Average edge weight
  var  i;				// Loop counter
  var  s = 0;				// Standard deviation of edge weight


  for( i = 0; i < mst.length; i++ ) {	// Calculate avgerage
    a += mst[ i ].w;
  }
  a /= mst.length;

  for( i = 0; i < mst.length; i++ ) {	// Calculate standard deviation
    s += Math.pow( mst[ i ].w - a, 2.0 );
  }
  s = Math.sqrt( s / mst.length );

  return { avg: a, med: mst[ Math.round( mst.length / 2 ) ].w, std: s };
}					// End function comp_stat


function comp_variance( c, cent, v )

  //  Compute the variance of (x,y) for each point in the cluster
  //  against an "anchor" point
  //
  //  c:     Cluster
  //  cent:  Central "anchor" point
  //  v:     Vertex positions (MUST have .x and .y members)
{
  var  n = 0;				// Number of vertices in cluster
  var  vert;				// Current vertex
  var  vrn = { x: 0, y: 0 };		// Variance of point distances


  for( vert in c ) {			// Calc variance of distances
    n++;
    vrn.x += Math.pow( v[ vert ].x - cent.x, 2.0 );
    vrn.y += Math.pow( v[ vert ].y - cent.y, 2.0 );
  }
  vrn.x /= n;
  vrn.y /= n;

  return vrn;
}					// End function comp_variance


function connect_comp( v, e, v_e )

  //  Find connected component containing v (i.e., all vertices u
  //  s.t. there exists a path uv)
  //
  //  v:    Anchor vertex
  //  e:    Edge list
  //  v_e:  Adjacent edges for each vertex
{
  var  v_list = { };			// List of vertices in component
  var  head;				// Position of head of queue
  var  tail;				// Position of tail of queue
  var  v_cur;				// Current vertex
  var  v_queue;				// List of vertices to process
  var  vert;				// Index into vertex edge list


  head = 0;				// Setup vertex queue
  tail = 0;
  v_queue = new Array( e.length * 2 );

  v_list[ v ] = true;			// Add anchor vertex

  for( vert in v_e[ v ] ) {		// Add edges adjacent to anchor vert
    if ( v_list[ e[ vert ].v0 ] != true ) {
      v_queue[ tail ] = e[ vert ].v0;
      tail++;
    }
    if ( v_list[ e[ vert ].v1 ] != true ) {
      v_queue[ tail ] = e[ vert ].v1;
      tail++;
    }
  }

  while( head != tail ) {		// While queue not empty
    v_cur = v_queue[ head ];		// Grab vertex at head of queue
    head++;

  //  If this vertex is not in the connected component list, add it,
  //  and add all adjacent vertices to the vertex queue

    if ( v_list[ v_cur ] != true ) {
      v_list[ v_cur ] = true;

      for( vert in v_e[ v_cur ] ) {	// Add endpoint vertices
        if ( v_list[ e[ vert ].v0 ] != true ) {
          v_queue[ tail ] = e[ vert ].v0;
          tail++;
        }
        if ( v_list[ e[ vert ].v1 ] != true ) {
          v_queue[ tail ] = e[ vert ].v1;
          tail++;
        }
      }					// End for all endpoint vertices
    }					// End if vertex not in connected list
  }					// End while queue not empty

  return v_list;
}					// End function connect_comp


function d( p0, p1 )

  //  Calculate Euclidean distance between two points
  //
  //  p0:  First point, MUST have .x and .y members
  //  p1:  Second point
{
  return Math.sqrt( d_2( p0, p1 ) );
}					// End function d


function d_2( p0, p1 )

  //  Calculate squared Euclidean distance between two points
  //
  //  p0:  First point, MUST have .x and .y members
  //  p1:  Second point
{
  return Math.pow( p0.x - p1.x, 2.0 ) + Math.pow( p0.y - p1.y, 2.0 );
}					// End function d


function density( c, cent, v, std )

  //  Compute the density of a cluster's points versus its centroid
  //
  //  c:     Cluster
  //  cent:  Central "anchor" point
  //  v:     Vertex positions (MUST have .x and .y members)
  //  std:   Standard deviation of clusters
{
  var  f = 0;				// Sum of outliers
  var  vert;				// Vertex in cluster


  for( vert in c ) {
    if ( len( diff( v[ vert ], cent ) ) > std ) {
      f++;
    }
  }

  return f;
}					// End function density


function diff( v0, v1 )

  //  Calculate the vector difference
  //
  //  v0:  First vector
  //  v1:  Second vector
{
  return { x: v0.x - v1.x, y: v0.y - v1.y };
}					// End function diff


function draw_mst( city, mst, thresh )

  //  Draw minimum spanning tree in tweet canvas for debugging
  //
  //  city:    City array, { name, x, y }
  //  mst:     Minimum spanning tree
  //  thresh:  Edge removal threshold for clustering
{
  var  canvas;  			// Canvas element on page
  var  ctx;				// Canvas 2d context
  var  h;                               // Canvas height
  var  i;				// Loop counter
  var  max_x, max_y;			// Maximum x, y-value
  var  min_x, min_y;			// Minimum x, y-value
  var  rng_x, rng_y;			// Range of x, y-values
  var  w;                               // Canvas width
  var  x, y;                            // Label's (x,y) position


  canvas = document.getElementById( "topic-canvas" );
  if ( !canvas.getContext ) {
    return;
  }
  w = canvas.width - 50;		// Width, height minus border
  h = canvas.height - 50;

  ctx = canvas.getContext( "2d" );      // Get context, set fill colour
  ctx.fillStyle = "rgb( 192, 0, 0 )";

  max_x = city[ 0 ].x;			// Calculate min, max, range
  min_x = city[ 0 ].x;
  max_y = city[ 0 ].y;
  min_y = city[ 0 ].y;

  for( i = 1; i < mst.length; i++ ) {	// For all MST edges
    if ( city[ i ].x > max_x )		// Update min/max x-values
      max_x = city[ i ].x;
    else if ( city[ i ].x < min_x )
      min_x = city[ i ].x;

    if ( city[ i ].y > max_y )		// Update min/max y-values
      max_y = city[ i ].y;
    else if ( city[ i ].y < min_y )
      min_y = city[ i ].y;
  }
  rng_x = max_x - min_x;		// Calculate x, y-value ranges
  rng_y = max_y - min_y;

  for( i = 0; i < mst.length; i++ ) {	// For all MST edges
    if ( mst[ i ].w > thresh ) {	// Edge included based on threshold?
      ctx.strokeStyle = "rgb( 240, 240, 240 )";
    } else {
      ctx.strokeStyle = "rgb( 192, 0, 0 )";
    }

  //  Calculate left endpoint's (x,y) on tweet canvas

    x = 25 + ( w - ( ( city[ mst[ i ].v0 ].x - min_x ) / rng_x * w ) );
    y = 25 + ( h - ( ( city[ mst[ i ].v0 ].y - min_y ) / rng_y * h ) );

    ctx.beginPath();			// Draw left endpoint circle
    ctx.arc( x, y, 2.0, 0.0, 2.0 * Math.PI, false );
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();			// Start edge
    ctx.moveTo( x, y );

  //  Calculate right endpoint's (x,y) on tweet canvas

    x = 25 + ( w - ( ( city[ mst[ i ].v1 ].x - min_x ) / rng_x * w ) );
    y = 25 + ( h - ( ( city[ mst[ i ].v1 ].y - min_y ) / rng_y * h ) );

    ctx.lineTo( x, y );			// Complete edge
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();			// Draw right endpoint circle
    ctx.arc( x, y, 2.0, 0.0, 2.0 * Math.PI, false );
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}					// End function draw_mst


function kruskal( v, e )

  //  Minimum spanning tree using Kruskal's algorithm
  //
  //  v:  Array of vertex IDs
  //  e:  Array of edges with weights, in form: { v0, v1, w }
{
  var  e_n;				// Number of edges
  var  i, j;				// Loop counters
  var  mst = [ ];			// Minimum spanning tree
  var  T;				// Tree containing each vertex
  var  v_n;				// Number of vertices
  var  T0, T1;				// Trees for endpoints of cur edge


  e_n = e.length;
  v_n = v.length;

  T = new Array( v_n );			// Initially each vertex forms a tree
  for( i = 0; i < v_n; i++ ) {
    T[ i ] = i;
  }

  e.sort( cmp_edge );			// Sort edges by edge weight

  for( i = 0; i < e_n; i++ ) {		// For all edges, ascending by weight
    T0 = T[ e[ i ].v0 ];		// Get trees for edge's endpoints
    T1 = T[ e[ i ].v1 ];

    if ( T0 != T1 ) {			// Different trees? If so, merge
      mst.push( e[ i ] );		// Save edge in MST
      if ( mst.length == v_n - 1 ) {	// MST complete?
        return mst;
      }

      for( j = 0; j < v_n; j++ ) {	// Update tree membership
        if ( T[ j ] == T1 ) {
          T[ j ] = T0;
        }
      }					// End for all vertex tree IDs
    }					// End if endpoints in different trees
  }					// End for all edges

  //  If we look at all edges and don't add v_n - 1 edges to MST,
  //  something's gone badly wrong

  alert( "Unexpected termination of Kruskal's MST algorithm" );

  return mst;
}					// End function kruskal


function len( v )

  //  Calculate the dot product of the given vector
  //
  //  v:  Vector to dot product
{
  return Math.sqrt( ( v.x * v.x ) + ( v.y * v.y ) );
}					// End function len


function test_mst()

  //  Test function, using North American cities and lat/lon for (x,y)
{
  var  city = [				// City array, { name, x, y }
    { name: "Albany, N.Y.", x: 73.75, y: 42.67 },
    { name: "Albuquerque, N.M.", x: 106.65, y: 35.08 },
    { name: "Amarillo, Tex.", x: 101.83, y: 35.18 },
    { name: "Anchorage, Alaska", x: 149.90, y: 61.22 },
    { name: "Atlanta, Ga.", x: 84.38, y: 33.75 },
    { name: "Austin, Tex.", x: 97.73, y: 30.27 },
    { name: "Baker, Ore.", x: 117.83, y: 44.78 },
    { name: "Baltimore, Md.", x: 76.63, y: 39.30 },
    { name: "Bangor, Maine", x: 68.78, y: 44.80 },
    { name: "Birmingham, Ala.", x: 86.83, y: 33.50 },
    { name: "Bismarck, N.D.", x: 100.78, y: 46.80 },
    { name: "Boise, Idaho", x: 116.22, y: 43.60 },
    { name: "Boston, Mass.", x: 71.08, y: 42.35 },
    { name: "Buffalo, N.Y.", x: 78.83, y: 42.92 },
    { name: "Calgary, Alba., Can.", x: 114.02, y: 51.02 },
    { name: "Carlsbad, N.M.", x: 104.25, y: 32.43 },
    { name: "Charleston, S.C.", x: 79.93, y: 32.78 },
    { name: "Charleston, W. Va.", x: 81.63, y: 38.35 },
    { name: "Charlotte, N.C.", x: 80.83, y: 35.23 },
    { name: "Cheyenne, Wyo.", x: 104.87, y: 41.15 },
    { name: "Chicago, Ill.", x: 87.62, y: 41.83 },
    { name: "Cincinnati, Ohio", x: 84.50, y: 39.13 },
    { name: "Cleveland, Ohio", x: 81.62, y: 41.47 },
    { name: "Columbia, S.C.", x: 81.03, y: 34.00 },
    { name: "Columbus, Ohio", x: 83.02, y: 40.00 },
    { name: "Dallas, Tex.", x: 96.77, y: 32.77 },
    { name: "Denver, Colo.", x: 105.00, y: 39.75 },
    { name: "Des Moines, Iowa", x: 93.62, y: 41.58 },
    { name: "Detroit, Mich.", x: 83.05, y: 42.33 },
    { name: "Dubuque, Iowa", x: 90.67, y: 42.52 },
    { name: "Duluth, Minn.", x: 92.08, y: 46.82 },
    { name: "Eastport, Maine", x: 67.00, y: 44.90 },
    { name: "Edmonton, Alb., Can.", x: 113.47, y: 53.57 },
    { name: "El Centro, Calif.", x: 115.55, y: 32.63 },
    { name: "El Paso, Tex.", x: 106.48, y: 31.77 },
    { name: "Eugene, Ore.", x: 123.08, y: 44.05 },
    { name: "Fargo, N.D.", x: 96.80, y: 46.87 },
    { name: "Flagstaff, Ariz.", x: 111.68, y: 35.22 },
    { name: "Fort Worth, Tex.", x: 97.32, y: 32.72 },
    { name: "Fresno, Calif.", x: 119.80, y: 36.73 },
    { name: "Grand Junction, Colo.", x: 108.55, y: 39.08 },
    { name: "Grand Rapids, Mich.", x: 85.67, y: 42.97 },
    { name: "Havre, Mont.", x: 109.72, y: 48.55 },
    { name: "Helena, Mont.", x: 112.03, y: 46.58 },
    { name: "Honolulu, Hawaii", x: 157.83, y: 21.30 },
    { name: "Hot Springs, Ark.", x: 93.05, y: 34.52 },
    { name: "Houston, Tex.", x: 95.35, y: 29.75 },
    { name: "Idaho Falls, Idaho", x: 112.02, y: 43.50 },
    { name: "Indianapolis, Ind.", x: 86.17, y: 39.77 },
    { name: "Jackson, Miss.", x: 90.20, y: 32.33 },
    { name: "Jacksonville, Fla.", x: 81.67, y: 30.37 },
    { name: "Juneau, Alaska", x: 134.40, y: 58.30 },
    { name: "Kansas City, Mo.", x: 94.58, y: 39.10 },
    { name: "Key West, Fla.", x: 81.80, y: 24.55 },
    { name: "Kingston, Ont., Can.", x: 76.50, y: 44.25 },
    { name: "Klamath Falls, Ore.", x: 121.73, y: 42.17 },
    { name: "Knoxville, Tenn.", x: 83.93, y: 35.95 },
    { name: "Las Vegas, Nev.", x: 115.20, y: 36.17 },
    { name: "Lewiston, Idaho", x: 117.03, y: 46.40 },
    { name: "Lincoln, Neb.", x: 96.67, y: 40.83 },
    { name: "London, Ont., Can.", x: 81.57, y: 43.03 },
    { name: "Long Beach, Calif.", x: 118.18, y: 33.77 },
    { name: "Los Angeles, Calif.", x: 118.25, y: 34.05 },
    { name: "Louisville, Ky.", x: 85.77, y: 38.25 },
    { name: "Manchester, N.H.", x: 71.50, y: 43.00 },
    { name: "Memphis, Tenn.", x: 90.05, y: 35.15 },
    { name: "Miami, Fla.", x: 80.20, y: 25.77 },
    { name: "Milwaukee, Wis.", x: 87.92, y: 43.03 },
    { name: "Minneapolis, Minn.", x: 93.23, y: 44.98 },
    { name: "Mobile, Ala.", x: 88.05, y: 30.70 },
    { name: "Montgomery, Ala.", x: 86.30, y: 32.35 },
    { name: "Montpelier, Vt.", x: 72.53, y: 44.25 },
    { name: "Montreal, Que., Can.", x: 73.58, y: 45.50 },
    { name: "Moose Jaw, Sask., Can.", x: 105.52, y: 50.62 },
    { name: "Nashville, Tenn.", x: 86.78, y: 36.17 },
    { name: "Nelson, B.C., Can.", x: 117.28, y: 49.50 },
    { name: "Newark, N.J.", x: 74.17, y: 40.73 },
    { name: "New Haven, Conn.", x: 72.92, y: 41.32 },
    { name: "New Orleans, La.", x: 90.07, y: 29.95 },
    { name: "New York, N.Y.", x: 73.97, y: 40.78 },
    { name: "Nome, Alaska", x: 165.50, y: 64.42 },
    { name: "Oakland, Calif.", x: 122.27, y: 37.80 },
    { name: "Oklahoma City, Okla.", x: 97.47, y: 35.43 },
    { name: "Omaha, Neb.", x: 95.93, y: 41.25 },
    { name: "Ottawa, Ont., Can.", x: 75.72, y: 45.40 },
    { name: "Philadelphia, Pa.", x: 75.17, y: 39.95 },
    { name: "Phoenix, Ariz.", x: 112.07, y: 33.48 },
    { name: "Pierre, S.D.", x: 100.35, y: 44.37 },
    { name: "Pittsburgh, Pa.", x: 79.95, y: 40.45 },
    { name: "Portland, Maine", x: 70.25, y: 43.67 },
    { name: "Portland, Ore.", x: 122.68, y: 45.52 },
    { name: "Providence, R.I.", x: 71.40, y: 41.83 },
    { name: "Quebec, Que., Can.", x: 71.18, y: 46.82 },
    { name: "Raleigh, N.C.", x: 78.65, y: 35.77 },
    { name: "Reno, Nev.", x: 119.82, y: 39.50 },
    { name: "Richfield, Utah", x: 112.08, y: 38.77 },
    { name: "Richmond, Va.", x: 77.48, y: 37.55 },
    { name: "Roanoke, Va.", x: 79.95, y: 37.28 },
    { name: "Sacramento, Calif.", x: 121.50, y: 38.58 },
    { name: "St. John, N.B., Can.", x: 66.17, y: 45.30 },
    { name: "St. Louis, Mo.", x: 90.20, y: 38.58 },
    { name: "Salt Lake City, Utah", x: 111.90, y: 40.77 },
    { name: "San Antonio, Tex.", x: 98.55, y: 29.38 },
    { name: "San Diego, Calif.", x: 117.17, y: 32.70 },
    { name: "San Francisco, Calif.", x: 122.43, y: 37.78 },
    { name: "San Jose, Calif.", x: 121.88, y: 37.33 },
    { name: "San Juan, P.R.", x: 66.17, y: 18.50 },
    { name: "Santa Fe, N.M.", x: 105.95, y: 35.68 },
    { name: "Savannah, Ga.", x: 81.08, y: 32.08 },
    { name: "Seattle, Wash.", x: 122.33, y: 47.62 },
    { name: "Shreveport, La.", x: 93.70, y: 32.47 },
    { name: "Sioux Falls, S.D.", x: 96.73, y: 43.55 },
    { name: "Sitka, Alaska", x: 135.25, y: 57.17 },
    { name: "Spokane, Wash.", x: 117.43, y: 47.67 },
    { name: "Springfield, Ill.", x: 89.63, y: 39.80 },
    { name: "Springfield, Mass.", x: 72.57, y: 42.10 },
    { name: "Springfield, Mo.", x: 93.28, y: 37.22 },
    { name: "Syracuse, N.Y.", x: 76.13, y: 43.03 },
    { name: "Tampa, Fla.", x: 82.45, y: 27.95 },
    { name: "Toledo, Ohio", x: 83.55, y: 41.65 },
    { name: "Toronto, Ont., Can.", x: 79.40, y: 43.67 },
    { name: "Tulsa, Okla.", x: 95.98, y: 36.15 },
    { name: "Vancouver, B.C., Can.", x: 123.10, y: 49.22 },
    { name: "Victoria, B.C., Can.", x: 123.35, y: 48.42 },
    { name: "Virginia Beach, Va.", x: 75.97, y: 36.85 },
    { name: "Washington, D.C.", x: 77.03, y: 38.88 },
    { name: "Wichita, Kan.", x: 97.28, y: 37.72 },
    { name: "Wilmington, N.C.", x: 77.95, y: 34.23 },
    { name: "Winnipeg, Man., Can.", x: 97.12, y: 49.90 },
  ];
  var  dissim = [ ];			// Dissimiliarty matrix
  var  i;				// Loop counter
  var  msg;				// Console message
  var  mst;				// Minimum spanning tree
  var  res;				// Cluster result
  var  res_alt;				// Alternate cluster result


  dissim = new Array( city.length );
  for( i = 0; i < city.length; i++ ) {	// Initialize dissimilarity matrix
    dissim[ i ] = new Array( city.length );
  }

  for( i = 0; i < city.length; i++ ) {	// Build complete graph's edges
    for( j = i + 1; j < city.length; j++ ) {
      dissim[ i ][ j ] = d( city[ i ], city[ j ] );
      dissim[ j ][ i ] = dissim[ i ][ j ];
    }
  }

  res = cluster( city, dissim );	// Build optimal clusters

  //  Report clusters (by city) in console log

  for( i = 0; i < res.C.length; i++ ) {
    msg = "";
    for( var vert in res.C[ i ] ) {
      msg = msg + city[ vert ].name + " ";
    }
    console.log( i + ": " + msg );
  }

  //res_alt = build_cluster_alt( city, d, 2.5 );
  //res = build_cluster( city, dissim, 2.5 );
}					// End function test_mst
