# RescueMap BD 🌊

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)

A real-time flood response system for Bangladesh, integrating resource tracking, volunteer management, and interactive mapping.

![Screenshot](public/screenshot.png)

## Features 🚀

- Interactive flood severity map with color-coded markers
- CRUD operations for resource management
- Volunteer registration portal
- Real-time updates and geolocation
- Secure authentication system
- Automated database backups
- Mobile-responsive design

## Installation 💻

### Prerequisites

- Node.js v18.x+
- npm v9.x+
- SQLite3

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/rescue-map-bd.git
   cd rescue-map-bd

   ```

2. Install backend dependencies
   cd rescue-backend
   npm install
3. Install frontend dependencies
   cd ../rescue-frontend
   npm install
4. Configure environment
   # Create .env file for backend
   echo "PORT=5000" > ../rescue-backend/.env
5. Initialize database
   cd ../rescue-backend
   npm run init-db
6. Start development servers
   # In separate terminals:
   cd rescue-backend && npm start
   cd rescue-frontend && npm start

Configuration ⚙️
File Purpose
rescue-backend/.env Server port configuration
rescue-backend/database.js Database connection settings
rescue-frontend/src/config.js API endpoint configuration

Default Admin Credentials (Change in production!):
Username: admin
Password: password123

License 📄
This project is licensed under the MIT License - see LICENSE file for details.
