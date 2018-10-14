# appointment-scheduler

Steps to run code locally:

1. Open the redmart-frontend folder.
2. Open a terminal and run the following command :
   npm install
3. After the install run :
   npm start
   Note : Application will run on port 3001, in case that port is not available, you can change it from package.json file on line number 9:
   "open": "concurrently \"http-server -a localhost -p {PORT}\" \"open http://localhost:{PORT}/build\""

To run tests:

1. Run the following command:
   npm test
