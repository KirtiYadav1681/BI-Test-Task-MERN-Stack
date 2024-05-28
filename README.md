# BL Test Task – MERN Stack

## Project Overview

This project is a MERN stack application. The application includes a simple yet elegant login page and a registration panel, supporting OAuth 2.0 for all REST APIs. The application is designed for an expense management system similar to Splitwise, where users can create groups, invite members, and share expenses.

## Features

- **Login Page:** Simple and elegant login page with fields for email and password.
- **Registration Panel:** Allows users to register with:
  - Name
  - Email
  - Phone number
  - Password
- **Expense Management:** 
  - Create groups and invite members via email.
  - Groups are identified by a unique group ID.
  - Share expenses with other group members.
- **Email Notifications:** Sends an email to users with the group invitation link.
- **OAuth 2.0 Support:** All REST APIs support OAuth 2.0 for secure authentication.

## Project Structure

The project follows industry best practice design patterns and is managed using Git, with a clear Git history showing the development process.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/BL-Test-Task-MERNStack.git
   cd BL-Test-Task-MERNStack
   ```

2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   ```

4. **Create environment variables:**

   In the `server` directory, create a `.env` file and add the following variables:

   ```env
     PORT=your_port_number
     JWT_SECRET=your_jwt_secret
     EMAIL=your_email_id
     PASSWORD=your_email_password
   ```
   Or there are already values added inside the code

5. **Run the server:**
   ```bash
   cd ../server
   npm start
   ```

6. **Run the client:**
   ```bash
   cd ../client
   npm start
   ```

The frontend should now be running on `http://localhost:3000`.
The backend should now be running on `http://localhost:port`.

## Usage

1. **Login:** Use the login page to sign in with your credentials.
2. **Register:** If you don’t have an account, register using the registration panel.
3. **Create Group:** Create a new group and invite members via email.
4. **Share Expenses:** Add expenses and share them with group members.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
