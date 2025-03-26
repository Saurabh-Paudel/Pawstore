# Pawstore

Pawstore is an e-commerce platform for buying and selling dogs and dog accessories. It is built using the MERN (MongoDB, Express.js, React, Node.js) stack and integrates eSewa for secure online payments.

## Developer
This project was developed by **Saurabh Paudel**, a passionate full-stack developer specializing in MERN stack applications.

## Features

### Users
- Browse and search for dogs and accessories
- Purchase dogs and accessories with eSewa payment integration
- View order history and transaction details
- Send messages to the admin for inquiries

### Admin
- Manage dog and accessory listings (Add, Edit, Delete)
- View and respond to user messages
- Track purchase transactions

## Tech Stack
- **Frontend:** React.js (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Payment Gateway:** eSewa
- **Authentication:** JWT (JSON Web Token)

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Saurabh-Paudel/Pawstore.git
   cd Pawstore
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Use the `.env.example` file as a reference.

4. Start the backend server:
   ```sh
   npm start
   ```

5. Navigate to the `client` directory and start the frontend:
   ```sh
   cd client
   npm install
   npm run dev
   ```

## Environment Variables
To run this project, create a `.env` file in the root directory and follow the structure from `.env.example`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ESEWA_SECRET_KEY=your_esewa_secret_key
ESEWA_PRODUCT_CODE=your_esewa_product_code
FRONTEND_URL=your_frontend_url
BACKEND_URL=your_backend_url
```

## API Endpoints
| Method | Endpoint              | Description |
|--------|----------------------|-------------|
| POST   | `/api/dogs`          | Add a new dog listing |
| GET    | `/api/dogs`          | Get all dogs |
| GET    | `/api/dogs/:id`      | Get a specific dog |
| DELETE | `/api/dogs/:id`      | Delete a dog |
| POST   | `/api/accessories`   | Add a new accessory |
| GET    | `/api/accessories`   | Get all accessories |
| POST   | `/api/payment`       | Process payment |
| POST   | `/api/messages`      | Send a message |
| GET    | `/api/messages`      | View messages (Admin) |

## Contributing
1. Fork the repository.
2. Create a new branch (`feature-branch`)
3. Commit changes and push to the branch.
4. Open a Pull Request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, feel free to reach out via [GitHub](https://github.com/Saurabh-Paudel) or email.

