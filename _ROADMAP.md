Tools we'll be using:
1. Angular
2. SQL with BookShelf
3. Node/EXPRESS
4. Passport
5. Jasmine for TDD

- Have access to Google, Reddit, RSS feeds, Facebook, Twitter, Hacker News, 
  Tumblr, Quora(?)

Road Map
1. Set up link models and states in Angular
2. Set up iframe
3. Set up a database for link collection and standardization
4. Set up sharing to Facebook, Twitter, Reddit
5. Set up user login
6. Deploy site
7. (Reach) Set up a contextual filter

Software Architecture Description
1. Multiple cron jobs that are each responsible for grabbing data from each API endpoint
2. Each cron job feeds their data to their respective SQL table that is responsible for 
   holding the unique story attributes of stories from each site.
3. We'll also have a hub table that grabs the common fields from every individual story
   table and standardizes it all.
4. Our Angular frontend app then makes POST requests to the hub table to populate a user's 
   stories. 
5. User login outsourced to Facebook/Google. 
