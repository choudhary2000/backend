## How to run

* First create a **.env** file in the root folder with following contents

  ```javascript
  NODE_ENV="development"
  PORT=3001
  DB_URL=127.0.0.1
  DB_PORT=5432
  DB_USER="sameer"
  DB_PASSWORD="sameer@1234"
  DATABASE="grofers"
  CRON_INTERVAL="30 20 * * *"
  ```

  1. Replace DB_URL, DB_PORT, DB_USER, DB_PASSWORD, DATABASE values with your postgres setup

  **Then follow following commands**

  ```bash
  npm install
  npm run migrate
  npm run seed
  npm start
  ```

* Following users are present in DB(**npm run seed** is used to insert this user into users table)

  ```bash
  USER = [
      {
        "email": "sameerme@iitk.ac.in",
        "role": "ADMIN"
      },
      {
        "email": "sameerme1@iitk.ac.in",
        "role": "USER"
      },
      {
        "email": "sameerme2@iitk.ac.in",
        "role": "USER"
      },
      {
        "email": "grofers@iitk.ac.in",
        "role": "USER"
      },
      {
        "email": "grofers1@iitk.ac.in",
        "role": "USER"
      },
      {
        "email": "grofers2@iitk.ac.in",
        "role": "ADMIN"
      }
    ]
  ```

## Following thing I consider in the assignment

1. Result always declared at fixed time. for example(8:00 pm)
2. An event has fixed number of tickets and winners
3. All user already present in the databases
4. In tickets I'm using Alphanumeric charaset [a-z A-Z 0-9]





## About assignment

1. I used node and express for server
2. Knex for database migration and query building
3. PostresSQL as database
4. Node-cron for cron job
5. async-retry for retry
6. joi for validation
7. With the help of **Randomstring** package generating packages



### How I created raffle tickets for an event

	1. Lets us assume L be the limits of an event(i.e. that many ticket will be sells for an event)
	2. Therefore minimum characters in a ticket should be **C=** **ceil(log(L)/log(62))** (here 62 be the charaset)
​	3. Then, I will generate L different tickets of length(**C**) using randomstring package

Above implementation can be found in: ***src/helper/generateticketsforevent.js***



### How I calculated winners of an event

​	***Assuming result always declared at 8:00pm(can be change from environment variable***

1. I created an cron job that run every day at scheduled time
2. Then, It fetch all events whose **event_date(timestamp) <= current date+time** and **status- NOT_DECLARED**
3. Then, for a given event, using event_id, fetching all participants from participations table
4. Then generating desire amount of winners by randomly sorting all participants
5. Then insert winners for the event into winners table and update **event.Status to DECLARED**

 	6. If any of events winners calculation get failed then, It will retry again upto 5 times
 	7. After 5 times, calculation still failing then here we can implement wake up call mechanism(such as email triggers or slack messaging)





![ER diagram](resource/overview.png)



