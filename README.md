![featured--picture-low](https://user-images.githubusercontent.com/50569315/135026949-7fedee51-0827-4fe4-a764-8b974dd9a9fd.jpg)

# Noxford Library
It is a full-stack website for a library. Here you can place a hold for a book, see book information, search for books. Although you can't read any book, it shows you how can nicely build a system like this.<br/>
A user can also register and login into the website to keep track of the books. Further details are given below.

Visit the site: [Noxford Library](http://rir-noxford-library.herokuapp.com/)

## Technologies
### Frontend
* BootStrap 5
* CSS 3
* EJS
### Backend
* AJAX
* Node JS
* Express JS
  * Express Session
  * Express Layouts
* Bcrypt
### Database
* MongoDb Atlas
### Hosting
* Heroku

## Login/Register
**Login:** Login system is supported by Express Session. That uses cookie to remember a login session.<br/>
**Register:** Register form is fully functional and supported by HTML Form and JavaScript. However, if anyone manages to pass any unacceptable input, it will be rejected by the server.

![login-register](https://user-images.githubusercontent.com/50569315/135061176-c62b9b41-0775-4741-92db-495e63a9177c.jpg)

## Encryption
For security measures, I've used Bcrypt to hash and protect the passwords. Bcrypt is a password-hashing function designed by Niels Provos and David Mazières, based on the Blowfish cipher and presented at USENIX in 1999.

![image](https://user-images.githubusercontent.com/50569315/135064755-4608e3cb-9354-4f68-9ab3-92ca5c531d31.png)

## Dashboard
The dashboard keeps track of the books that a user has placed a hold on. Anyone can place a hold on any book by logging into the site.

![dashboard](https://user-images.githubusercontent.com/50569315/135064027-941163b8-81b4-4bdf-a93d-f455b53d7d0f.jpg)

## Search
The search page uses AJAX to show results dynamically. Users can search for a keyword and apply filters to the results. User input always gets sanitized before a search operation execute.

![search](https://user-images.githubusercontent.com/50569315/135061216-fc1ca333-510f-4f0c-a462-90d34e3f3211.jpg)

## There's a lot more you can learn
I hope by exploring this project, anyone can have a good idea about full-stack projects easily. Visit the site and dive into the projects files to know more. Happy coding. Thank you for visiting my project.

![footer- picture](https://user-images.githubusercontent.com/50569315/135061735-519450ed-40b6-4664-abf9-eb2660077f55.jpg)
