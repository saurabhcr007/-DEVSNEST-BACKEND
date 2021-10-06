## Redis

Connecting redis with express

```js
const redis = require("redis");
const connectRedis = require("connect-redis");
const session = require("express-session");
const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});
redisClient.on("error", (error) => {
  console.error("could not connect to redis", error);
});
```

## Postgres

Connecting postgres with express

```js
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});
router.get("/", function (req, res, next) {
  pool.query('SELECT * FROM "Users"', (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).json(result);
  });
});
```

## MongoDB

Connecting mongodb with express

```js
const mongoose = require("mongoose");
const mongodb = "mongodb://127.0.0.1/my_database";
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongodb connection error"));
db.on(
  "connect",
  console.error.bind(console, "successfully connected to mongodb")
);
```
