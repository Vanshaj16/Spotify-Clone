# Spotify Clone

This project is a Spotify clone that includes both backend and frontend implementations. The backend is built with Node.js, Express, and MongoDB, while the frontend is built with React and Tailwind CSS.

## Project Structure
## Backend

The backend is built with Node.js, Express, and MongoDB. It includes the following features:

### SignIn / SignUp

- **SignUp**: Users can register by providing their email, password, first name, last name, and username.
- **SignIn**: Users can log in by providing their email and password.

### Models

- **User**: Represents a user in the system.
- **Song**: Represents a song in the system.
- **Playlist**: Represents a playlist in the system.

### Routes

- **Auth Routes**: Handles user authentication (register and login).
- **Song Routes**: Handles song creation and retrieval.
- **Playlist Routes**: Handles playlist creation, retrieval, and song addition.

### Environment Variables

- `MONGO_PASSWORD`: MongoDB password.
- `SECRET_KEY`: Secret key for JWT.

### Running the Backend

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
  ```
  node index.js
 ```
### Available Scripts
In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.
