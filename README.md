This React application serves as the frontend for the Blog API. It allows users to manage blog posts through a user-friendly interface with various features such as login, signup, post creation, editing, and deletion.

### Installation

### Clone the repository for Frontend :

git clone https://github.com/vkonga/zuai-frontend.git

cd zuai-frontend

server run in PORT:3000

### clone the repository for Backend

git clone https://github.com/vkonga/zuai-backend.git

cd zuai-backend

server run in PORT:5000

### Install dependencies:

npm install
Set up environment variables:

### Features
User Authentication:

Signup: Register a new user.
Login: Authenticate existing users.
Post Management:

Home: View a list of all posts.
Add Post: Create a new post.
Edit Post: Modify existing posts.
Post Details: View detailed information about a specific post.
Responsive Design: The application is designed to be responsive and work well on various devices.

Folder Structure
src/: Contains all the source code.
components/: React components for different parts of the application.
Home: Displays a list of posts.
AddPost: Form for creating a new post.
PostDetails: Shows detailed information about a post.
EditPost: Form for editing an existing post.
Signup: User registration component.
Login: User login component.
Footer: Footer component.
App.js: Main application component with routing setup.
index.js: Entry point for the React application.
index.css: Global styles.
Routing
The application uses React Router for navigation. The available routes are:

/login - Login page
/signup - Signup page
/ - Home page (lists all posts)
/addpost - Add a new post
/posts/:id - View details of a specific post
/editpost/:id - Edit an existing post
/footer - Footer component (if used separately)
