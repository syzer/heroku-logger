## WAT

[![Build Status](https://travis-ci.org/syzer/heroku-logger.svg?branch=master)](https://travis-ci.org/syzer/heroku-logger)
Ultra fast json - message server.
It allows to persist and retrieve your messages... till next day when heroku recycle your container :).
From 0 to heroku hero (deploy) in 30 sec.

## HOW

#### deploy
```
$ heroku create
$ git push heroku master
$ heroku open
```

#### Run locally
##### With Docker
```bash
docker-compose up
```

then figure out docker ip
```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' heroku-logger_default
```
and open that ip port [http://172.19.0.2:5000/](http://172.19.0.2:5000/)


#### or with plain node
```
npm init
npm start
```
[localhost:5000](localhost:5000)

#### Develop
```
npm run devrm 
curl -X GET -H "Content-Type: application/json" localhost:5000
curl -X POST -H "Content-Type: application/json" localhost:5000 -d '{"message":"awesome"}'
curl -X GET -H "Content-Type: application/json" https://heroku-sink-666.herokuapp.com/
curl -X POST -H "Content-Type: application/json" https://heroku-sink-666.herokuapp.com/  -d '{"message":"awesome"}'
```

## Send messages
#### TCP 
```bash
curl -X POST -H "Content-Type: application/json" localhost:5000 -d '{"message":"awesome"}'
```

### UDP
```bash
echo '{"2":"My KungFu is Good!"}' | nc -u -w0 127.0.0.1 5001
```

## Test

#### with ava
```
npm test
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
TL;DR: It's fast with tiny footprint.

#### *read*:
```
npm run test-read-performance                                                                                                                                 6 s

> ab -n 10000 -c 100 http://127.0.0.1:5000/

Document Path:          /
Document Length:        892 bytes

Concurrency Level:      100
Time taken for tests:   5.523 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      9900000 bytes
HTML transferred:       8920000 bytes
Requests per second:    1810.72 [#/sec] (mean)
Time per request:       55.227 [ms] (mean)
Time per request:       0.552 [ms] (mean, across all concurrent requests)
Transfer rate:          1750.60 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.7      1       7
Processing:    36   54  15.8     50     174
Waiting:        7   28  10.1     27      74
Total:         40   55  16.0     51     176

Percentage of the requests served within a certain time (ms)
  50%     51
  66%     55
  75%     58
  80%     60
  90%     71
  95%     76
  98%    100
  99%    176
 100%    176 (longest request)```

#### write
```sh
npm run test-write-performance

> ab -n 10000 -c 100 -T 'application/json'  -p test/test.json http://127.0.0.1:5000/

Concurrency Level:      100
Time taken for tests:   1.868 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      980000 bytes
Total body sent:        1460000
HTML transferred:       0 bytes
Requests per second:    5351.90 [#/sec] (mean)
Time per request:       18.685 [ms] (mean)
Time per request:       0.187 [ms] (mean, across all concurrent requests)
Transfer rate:          512.19 [Kbytes/sec] received
                        763.06 kb/s sent
                        1275.26 kb/s total

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.9      1      12
Processing:     7   18   5.5     17      41
Waiting:        4   13   4.8     12      37
Total:          7   19   5.7     17      42

Percentage of the requests served within a certain time (ms)
  50%     17
  66%     19
  75%     22
  80%     22
  90%     26
  95%     29
  98%     35
  99%     40
 100%     42 (longest request)```

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
