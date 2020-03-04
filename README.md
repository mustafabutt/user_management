1 Clon ethe app <br />
2 cd user_management<br />
3 npm install <br />
4 NODE_ENV=local npm start<br />
5 http://localhost:3001<br />

<h3>Assumptions</h3>

1 API is receiving user token and current group ID(i.e. in which he is going to logged in) in the headers.<br />
2 We have set the user details on server based on that token coming in the headers.<br />
3 So, user needs to send two values in the headers(i.e. token, currentgroup)to work with this api<br />

To test regular.<br />
 Please send token value "1aa" and groupId "1"  in the headers (i.e. token = 1aa, , groupId=1).<br />

To test manager.<br />
 Please send token value "2bb" and groupId "2"  in the headers (i.e. token = 2bb , groupId=1/2).<br />

To test Global manager.<br />
 Please send token value "" and groupId "" in the headers (i.e. token = 3cc, groupId="").<br />

<b> Please go to root directory and find file named "api_docs" for API documentation. </b>