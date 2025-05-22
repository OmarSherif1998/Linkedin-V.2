<!-- @format -->

# LinkedIn Clone V2

A full-stack LinkedIn clone built with React, Node.js, and MongoDB, featuring real-time interactions and modern UI/UX design.

## Features

- 🔐 User Authentication & Authorization
- 👤 User Profiles
- 📝 Posts & Feed
- 💬 Real-time Messaging
- 🔍 Search Functionality
- 👥 Connections & Networking
- 📱 Responsive Design
- 🎨 Modern UI with Material-UI and Tailwind CSS
- ⚡ Real-time Updates with Socket.IO
- 🔄 State Management with Redux Toolkit
- 🚀 API Integration with React Query

## Tech Stack

### Frontend

- React 18
- Redux Toolkit for state management
- React Query for API integration
- Material-UI & Tailwind CSS for styling
- Socket.IO Client for real-time features
- React Router for navigation
- Framer Motion for animations

### Backend

- Node.js & Express
- MongoDB with Mongoose
- Socket.IO for real-time communication
- Redis for caching
- JWT for authentication
- Cloudinary for image storage
- SendGrid for email services
- Multer for file uploads

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis
- Cloudinary Account
- SendGrid Account

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Linkedin-V.2
```

2. Install dependencies for both client and server:

```bash
# Install client dependencies
cd Client
npm install

# Install server dependencies
cd ../Server
npm install
```

3. Create a `.env` file in the Server directory with the following variables:

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SENDGRID_API_KEY=your_sendgrid_api_key
REDIS_URL=your_redis_url
```

## Running the Application

1. Start the server:

```bash
cd Server
npm start
```

2. Start the client:

```bash
cd Client
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
Linkedin-V.2/
├── Client/                 # Frontend React application
│   ├── src/               # Source files
│   ├── public/            # Static files
│   └── package.json       # Frontend dependencies
│
└── Server/                # Backend Node.js application
    ├── routers/           # API routes
    ├── schema/            # Database schemas
    ├── middlewares/       # Custom middlewares
    ├── functions/         # Utility functions
    ├── Redis/             # Redis configuration
    ├── staticData/        # Static data files
    └── index.js           # Server entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- LinkedIn for inspiration
- All open-source libraries and tools used in this project
