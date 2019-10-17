This is ApacheBench, Version 2.3 <$Revision: 1807734 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)


Server Software:        
Server Hostname:        127.0.0.1
Server Port:            5000

Document Path:          /
Document Length:        3600 bytes

Concurrency Level:      100
Time taken for tests:   19.243 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      36980000 bytes
HTML transferred:       36000000 bytes
Requests per second:    519.67 [#/sec] (mean)
Time per request:       192.428 [ms] (mean)
Time per request:       1.924 [ms] (mean, across all concurrent requests)
Transfer rate:          1876.72 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.8      0      14
Processing:    89  191  29.3    191     335
Waiting:       20  125  27.2    127     221
Total:         91  192  29.1    192     336
WARNING: The median and mean for the initial connection time are not within a normal deviation
        These results are probably not that reliable.

Percentage of the requests served within a certain time (ms)
  50%    192
  66%    201
  75%    207
  80%    211
  90%    223
  95%    235
  98%    251
  99%    270
 100%    336 (longest request)
