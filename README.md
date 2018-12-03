# bitmex-tickdata-server

1. git clone  https://github.com/jakeadelman/tickdata-server.git
2. cd tickdata-server
3. yarn install
4. Edit ormconfig.json with your postgresql db details
5. Make sure your postgres db is set up and running


now start the graphql server and the xbt-fetch script to get all quote and tick data logged to your postgres db

6. yarn start
7. yarn bitmex-fetch

you can access the graphql server on localhost:4000 and make graphql requests with the schema shown on this graphql endpoint page

example:

{
  tick(symbol:"XBTUSD", hour: "18120320"){
    askPrice
    bidPrice
    timestamp
    ...
  }
}

the hour is in format YYMMDDHH, and you can always check your db for hour and symbol data to query the results you'd like to save
