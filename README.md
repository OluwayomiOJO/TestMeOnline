# AssesMeOnline
### Application that allows you to set series of multiple choice questions, get a public link and send to anyone. Each question it timed. 


## Introduction ?
I recently wrote an online test for a role I applied for. After seeing my resume, the employer invited for an online test.
I was fascinated by the awesomeness of the test app, the user interface was very sleek and interactive, and I decided to create one from scratch, add the dashboard (user’s backend) that I imagined for it since I didn’t have access to it and improve on what I experienced at the frontend by adding more features and eventually come up with a relatively better version so that young programmers can learn from it. (I am also a volunteer coding Instructor as Ye WeCode, Canada)
## The Tech Stack and Architecture
Databases : MySQL,
Framework:   Laravel , 
Backend: PHP
Frontend: JavaScript React. 
CSS UI framework:  Tailwind, Headless Heroi Icon 
And the CSS UI framework is tailwind.
React hooks extensively used:  useState, useParam, useRef, useContext  
Some array methods used: map(). Filter(),optional chaining, splice(), react destructuring, , HeroIcons
API vendor: axios’ axiosClient().  Laravel’s apiResource()

## Key Feature
1.	Sign in and sigh out features
2.	Generate you own questions and options (A, B, C, D)
3.	Select answers for each questions 
4.	One set of questions per user. Maximum of 10 questions
5.	Dynamically  add and remove question and options form and save all at once
6.	Ability to edit each of your questions inline without reloading the entire question 
7.	Answer corresponding to the selected options from A,B, C, D is displayed on the dashboard for each question 
8.	Option inputs  and answer select buttons are locked until your question is set
9.	Question mark is automatically added to the end of your question statement
10.	First letter of each question and answer is automatically changed  to CAPITAL letter
11.	Generate a public  link to your questions for users to consume it via API
12.	End users have 30 seconds to select an option
13.	End users get instant answer as soon as an option is  selected (No second change, for the fun of it)

 

### Page http://localhost:3000/Signup
![image](https://github.com/user-attachments/assets/07c194bf-cefe-486f-b011-8b19bb2d674d)



### Dashboard
 ![image](https://github.com/user-attachments/assets/a77ba140-719e-4e00-ae69-6d61e488a1cf)


### Front End
![image](https://github.com/user-attachments/assets/e0446111-9bf9-493c-9ca1-86fefd4592e1)

 




	### End of Quiz
 ![image](https://github.com/user-attachments/assets/40096ac6-d499-4a84-9ecf-9d3685bfa256)


## Installation and set up
1. Clone the repository: `git clone https://github.com/username/project.git`
2. Install dependencies: `npm install`
3. Start the application: `npm start`
4. Run php laravel migration : php artisan migrate
5. set up your environment variable .env


## Document Usage and API Examples
1.	To sign up :  `POST       /api/signup
2.	Submit Questions` ‘POSTb    /api/question’
3.	Answer Question : GET  '/questions/fetch_by_id/{user_id}',



## License 
MIT License

