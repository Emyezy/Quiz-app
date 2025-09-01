Quiz App

The Quiz App is an online tool that displays multiple-choice questions, provides immediate feedback, keeps score, and displays results. The user interface will have a dark theme by default and be responsive and visually appealing.

🚀 Features:

Multiple-choice interactive question cards are available.
Every option chosen receives immediate feedback, including its proper and incorrect states and any available explanations.
Throughout the session, scores are tracked, and at the conclusion, they are shown.
Start Quiz, Next Question, and Restart Quiz buttons are positioned in the middle of the page for easy navigation.
mobile-first design, approachable color contrast, and a dark-themed, responsive user interface.
API request loading and error statuses (visual loader/spinner and retry handling).
Selectors for amount, difficulty, and category.
🛠️ Technologies Used

HTML5

CSS

JavaScript

API (Application Programming Interface): Open Trivia Database (OpenTDB) https://opentdb.com/api.php is the base endpoint.

Remarks: HTML entities are frequently returned by OpenTDB; decoding will be done before rendering. Types of questions: Boolean and many. The scope of this endeavor is multifaceted.

🎯 Key Features Interactive Quiz: Answer questions by selecting options displayed as interactive cards. Instant Feedback: Determines your ultimate score and keeps track of the right responses automatically. User-friendly Interface: Clear design with buttons in the middle for simple navigation.

🚀 Getting Started Clone the Repository git clone https://github.com/Emyezy/Quiz-App.git Navigate to the project directory: Quiz-App Open index.html in your browser to start using the quiz application.

🚀 Usage To get started, click the "Start Quiz" button. Choose your response from the list of possibilities. Press "Next Question" to continue taking the test. At the conclusion, your ultimate score will be shown. To retake the test, select "Restart Quiz".

✨ Future Improvements Include additional question pools or categories (OpenTDB categories, bespoke JSON files). Each question has a timer with bonus or penalty points. Answers (selected or fetched if available) should be explained. Leaderboard of high scores for local storage. Question review screen (see all questions and answers once you're done). Last quiz cached offline (Service Worker/PWA).

📄 License The MIT License governs the availability of this open source project. You are welcome to use it or alter it for your projects.