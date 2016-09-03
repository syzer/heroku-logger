# HOW
```
nodemon -i data/  
curl -X GET -H "Content-Type: application/json" localhost:5000 -d '{"message":"awesome"}'
curl -X POST -H "Content-Type: application/json" localhost:5000 -d '{"message":"awesome"}'
curl -X GET -H "Content-Type: application/json" https://heroku-sink-666.herokuapp.com/ -d '{"message":"awesome"}'
curl -X POST -H "Content-Type: application/json" https://heroku-sink-666.herokuapp.com/  -d '{"message":"awesome"}'
```

## Testing performance

#### *read*:
```
ab -n 10000 -c 100 http://127.0.0.1:5000/
```
#### yields:
```
Concurrency Level:      100
Time taken for tests:   4.514 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      1250000 bytes
HTML transferred:       0 bytes
Requests per second:    2215.24 [#/sec] (mean)
Time per request:       45.142 [ms] (mean)
Time per request:       0.451 [ms] (mean, across all concurrent requests)
Transfer rate:          270.42 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    3   3.8      3      45
Processing:     9   41  11.3     39      92
Waiting:        8   41  11.2     39      92
Total:         18   45  11.6     43      94

Percentage of the requests served within a certain time (ms)
  50%     43
  66%     48
  75%     51
  80%     52
  90%     60
  95%     66
  98%     76
  99%     85
 100%     94 (longest request)
```


## Deploying to Heroku

```
$ git push heroku master
$ heroku open
```
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
