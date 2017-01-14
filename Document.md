# What Do I Do?

Type a keyword into the input field, then click the Query button. Recent tweets that contain your keyword are pulled from Twitter and visualized in the Sentiment tab as circles. Hover your mouse over a tweet or click on it to see its text. Words highlighted in bold blue italics or bold orange italics are the words being used to estimate the sentiment of a tweet. Blue words are evaluted as-is. Orange words are evaluated as though they are negated, for example, "happy" versus "not happy".

# What Am I Seeing?

Tweets are visualized in different ways in each of the tabs at the top of the window.

**Sentiment**. Each tweet is shown as a circle positioned by *sentiment*, an estimate of the emotion contained in the tweet's text. Unpleasant tweets are drawn as blue circles on the left, and pleasant tweets as green circles on the right. Sedate tweets are drawn as darker circles on the bottom, and active tweets as brighter circles on the top. Hover your mouse over a tweet or click on it to see its text.

**Topics**. Tweets about a common topic are grouped into *topic clusters*. Keywords above a cluster indicate its topic. Tweets that do not belong to a topic are visualized as *singletons* on the right. Hover your mouse over a tweet or click on it to see its text.

**Heatmap**. Pleasure and arousal are used to divide sentiment into a 8×8 grid. The number of tweets that lie within each grid cell are counted and used to color the cell: red for more tweets than average, and blue for fewer tweets than average. White cells contain no tweets. Hover your mouse over a cell to see its tweet count.

**Tag Cloud**. Common words from the emotional regions Upset, Happy, Relaxed, and Unhappy are shown. Words that are more frequent are larger. Hover the mouse over a word to see how often it occurred.

**Timeline**. Tweets are drawn in a bar chart to show the number of tweets posted at different times. Pleasant tweets are shown in green on the top of the chart, and unpleasant tweets are shown in blue on the bottom. Hover the mouse over a bar to see how many tweets were posted at the given time.

**Map**. Tweets are drawn on a map of the world at the location where they were posted.

 **Please note** most Twitter users do not provide their location, so only a few tweets will be shown on the map. Hover your mouse over a tweet or click on it to see its text.

**Affinity**. Frequent tweets, people, hashtags, and URLs are drawn in a graph to show important actors in the tweet set, and any relationship or affinity they have to one another. Hover your mouse over a node, or click on a node to see its tweets.

**Narrative**. Selecting a *anchor tweet* of interest from the tweet list displays a time-ordered sequence of tweets that form conversations or *narrative threads* passing through the anchor tweet. Hover your mouse over a node or click on it to see its text. Hover your mouse over a link to see all threads that pass through the link, or click on it to see the tweets in each thread.

**Tweets**. Tweets are listed to show their date, author, pleasure, arousal, and text. You can click on a column's header to sort by that column.

# ZoomingTo

 zoom in on the tweets in the Sentiment and Topic tabs, click the zoom icon to the right of the Query button. This displays a zoom lens that you can move around the visualization.

# Keywords

You can query multiple keywords at once, and combine keywords in different ways. For example, to search for tweets with the words "cat" and "dog", enter: **cat dog**. To search for tweets with the words "cat" or "dog", enter: **cat OR dog**. To search for tweets with the phrase "cat dog", enter: **"cat dog"**. To search for tweets with the words "cat" but not "dog", enter: **cat -dog**.

# How Do You Estimate Sentiment?

We use a sentiment dictionary to estimate sentiment. We search each tweet for words in the dictionary, then combine the words' pleasure and arousal ratings to estimate sentiment for the entire tweet. When you hover your mouse over a tweet's circle to see its text, the words in our dictionary are shown in bold italics. You can click on a tweet's circle to bring up a dialog that gives even more information.To learn more details about how our estimates work, take a look at the [tweet visualization web page](http://www.csc.ncsu.edu/faculty/healey/tweet_viz).

# How Do You Build Topic Clusters?

We use a technique known as term frequency-inverse document frequency (TF-IDF) to estimate the similarity of the text between pairs of tweets. The similarities are examined to identify groups of tweets whose text is similar. Each group forms a topic cluster. 