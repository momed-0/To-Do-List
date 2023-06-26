# To-Do-List


This is a simple To-Do List application built using Node.js, Express, and EJS. It allows you to create and manage your daily tasks efficiently.

## Features

- Add new tasks with a title and optional details
- Mark tasks as completed
- Delete tasks from the list
- View tasks based on the current day

## Installation

1. Clone the repository:

   git clone https://github.com/momed-0/To-Do-List.git


2. Navigate to the project directory:

   cd To-Do-List


3. Install the dependencies:

    npm install express ejs body-parser

4. Start the server:

   node app.js


5. Open your web browser and visit `http://localhost:3000` to access the To-Do List application.

## Usage

- On the home page, you will see a list of tasks for the current day.
- To add a new task, enter the title and details (optional) in the input fields and click the "Add" button.
- To mark a task as completed, click the checkbox next to the task.
- To delete a task, click the "Delete" button next to the task.
- To view tasks for a specific day, navigate to `http://localhost:3000/day` and replace "day" with the desired day of the week (e.g., `http://localhost:3000/sunday`).

## Dependencies

- Node.js
- Express
- EJS
- body-parser

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

