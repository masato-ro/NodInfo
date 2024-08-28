# NodInfo

NodInfo is a simple web application built with Node.js and Express.js that displays system information and provides the ability to run Neofetch.

## Features

- **Home Page**: Displays a welcome message and the application version.
- **System Info Page**: Provides detailed information about the system, including CPU, memory, network interfaces, environment variables, and the currently used npm packages.
- **Neofetch Output Page**: Shows the output of the Neofetch command.

## Project Structure

- `server.js`: The main server file of the application, handling routes and rendering pages.
- `views/`: Directory for storing EJS template files.
- `public/`: Directory for storing static files (e.g., CSS, JS, etc.).

## Installation and Running

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd nodinfo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

```bash
node server.js
```

The application will run at [http://127.0.0.1:3000/](http://127.0.0.1:3000/).

### Routes

- `/`: Home page, displaying a welcome message.
- `/info`: Displays detailed system information.
- `/neofetch`: Runs Neofetch and displays its output.
- `/*`: Catches all other undefined routes and returns a `404 Error`.

### Dependencies

- `express`: Used for building the web server.
- `systeminformation`: Used for retrieving system information.
- `strip-ansi`: Used for removing ANSI color codes from the Neofetch output.
- `ejs`: Used as the view engine for rendering HTML.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Version

- Current Version: 0.1