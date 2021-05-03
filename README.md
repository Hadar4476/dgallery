How to install

1. create new folder
2. open your code editor
3. open the new folder you just created
4. open the terminal and copy this line: git clone https://github.com/Hadar4476/dgallery.git
5. navigate to the dgallery folder with: cd dgallery
6. type npm install to install node_modules
7. navigate to the client folder with: cd client
8. type npm install to install node_modules there aswell
9. now you need to create a .env file and add the following environment variables:
10. MONGODB_URI = "mongodb+srv://hadrame:hadar123456@hadfun-galleryglee.iszom.mongodb.net/gallery-glee?retryWrites=true&w=majority"
11. JWT_KEY = "private-key"
12. save the file
13. navigate back to the dgallery folder with: cd..
14. run this line: nodemon app to start Node server
15. open new terminal window and navigate to the client folder with: cd dgallery/client
16. got to src folder -> myaxios.js, change const url = 'https://dgallery.herokuapp.com'; to const url = 'http://localhost:3005';
17. to start the website run this line: npm start
