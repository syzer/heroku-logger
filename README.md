## WAT

[![Build Status](https://travis-ci.org/syzer/heroku-logger.svg?branch=master)](https://travis-ci.org/syzer/heroku-logger)
Ultra fast json - message server.
It that persist and retrieve your messages.
From 0 to heroku hero (deploy) in 30 sec.

## HOW

#### deploy
```
$ heroku create
$ git push heroku master
$ heroku open
```

#### run locally

```
npm init
npm start
```

#### develop
```
nodemon -i data/  
curl -X GET -H "Content-Type: application/json" localhost:5000
curl -X POST -H "Content-Type: application/json" localhost:5000 -d '{"message":"awesome"}'
curl -X GET -H "Content-Type: application/json" https://heroku-sink-666.herokuapp.com/
curl -X POST -H "Content-Type: application/json" https://heroku-sink-666.herokuapp.com/  -d '{"message":"awesome"}'
```
## Test

#### with ava
```
npm i -g ava
ava test
```

#### with curl
```
curl -H "Accept-Encoding: gzip,deflate" -X GET localhost:5000
>{"1":"ok"}{"1":"ok"}{"1":"ok"}
```

### querying logs
You can query strings with q parameters
options lt,lte, gt, gte

Please look in the tests for more detailed information or here:
[https://github.com/Level/levelup#createReadStream]()


## Testing performance

#### *read*:
```
npm run test-read-performance                                                                                                                                 6 s

> ab -n 10000 -c 100 http://127.0.0.1:5000/

Document Path:          /
Document Length:        30 bytes

Concurrency Level:      100
Time taken for tests:   5.133 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      1550000 bytes
HTML transferred:       300000 bytes
Requests per second:    1948.00 [#/sec] (mean)
Time per request:       51.335 [ms] (mean)
Time per request:       0.513 [ms] (mean, across all concurrent requests)
Transfer rate:          294.86 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.6      0      15
Processing:    11   51  13.8     48      93
Waiting:       11   50  13.8     48      92
Total:         19   51  13.8     49      93

Percentage of the requests served within a certain time (ms)
  50%     49
  66%     57
  75%     62
  80%     65
  90%     71
  95%     74
  98%     78
  99%     84
 100%     93 (longest request)
```

#### write
```sh
npm run test-write-performance

> ab -n 10000 -c 100 -T 'application/json'  -p test/test.json http://127.0.0.1:5000/

Concurrency Level:      100
Time taken for tests:   4.188 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      980000 bytes
Total body sent:        1460000
HTML transferred:       0 bytes
Requests per second:    2387.51 [#/sec] (mean)
Time per request:       41.885 [ms] (mean)
Time per request:       0.419 [ms] (mean, across all concurrent requests)
Transfer rate:          228.49 [Kbytes/sec] received
                        340.41 kb/s sent
                        568.90 kb/s total

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    2   1.4      2       9
Processing:    11   40  11.4     38      80
Waiting:       11   39  11.3     38      80
Total:         16   42  11.6     40      81

Percentage of the requests served within a certain time (ms)
  50%     40
  66%     46
  75%     49
  80%     51
  90%     56
  95%     63
  98%     70
  99%     75
 100%     81 (longest request)
```

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
