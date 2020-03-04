1 Clon ethe app <br />
2 cd user_management<br />
3 npm install <br />
4 NODE_ENV=local npm start<br />
5 http://localhost:3001<br />

<h3>Assumptions</h3>

1 API is receiving user token and current group ID(i.e. in which he is going to logged in) in the headers.<br />
2 We have set the user details on server based on that token coming in the headers.<br />
3 So, user needs to send two values in the headers(i.e. token, currentgroup)to work with this api<br />

<b> Please go to root directory and find file named "api_docs" for API documentation. </b>