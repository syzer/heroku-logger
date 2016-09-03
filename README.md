# HOW
```
nodemon -i data/  
curl -X GET -H "Content-Type: application/json" localhost:5000 -d '{"message":"awesome"}'
curl -X POST -H "Content-Type: application/json" localhost:5000 -d '{"message":"awesome"}'
curl -X GET -H "Content-Type: application/json" https://heroku-sink-666.herokuapp.com/ -d '{"message":"awesome"}'
curl -X POST -H "Content-Type: application/json" https://heroku-sink-666.herokuapp.com/  -d '{"message":"awesome"}'
```

## Deploying to Heroku

```
$ git push heroku master
$ heroku open
```
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
