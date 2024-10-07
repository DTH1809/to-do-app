 ## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Then run ```npm run db``` to start json server database on [http://localhost3001](http://localhost:3001)

You can modify db.json file to directly change database, after refresh your app because i get data in a component server. If you need data to test, you can copy dbtest.json into db.json

Main feature:
    - Form with text input, has client validation for submit empty task name, button to create new task in database
    - List to display task from database, checkbox to indicate task status, click task name to navigate to update task page, click check box to change status of the task, tooltip to indicate user 
    - Update task form display the task name from database (get task data from database base on task id), text input field to change task name, button to subbmit task name change to database, button to navigate to homepage if user do not want to update task, client validation for submit when not change the task name.


