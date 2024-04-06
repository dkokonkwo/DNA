# Digital Nourish Africa

Welcome to Digital Nourish Africa! This repository hosts the codebase for a comprehensive web application designed to empower farmers by automating farming and irrigation processes. Digital Nourish Africa utilizes Flask and React to provide a seamless experience for farmers to manage their farms efficiently. Below you will find detailed information on how to set up, deploy, and use this application.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
4. [Deployment](#deployment)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

## Features

- **Dashboard and Farm Pages:** Display city weather information using the OpenWeather API and a live location map using Leaflet JS.
- **Sensor Integration:** Sends requests to the server/microcontroller on the farm to collect sensor data. Displays the status of active sensors and their data in real-time.
- **Automation:** Automates farming and irrigation processes. Allows farmers to manually irrigate their farms if needed.
- **Posts Page:** Enables farmers to send, view, and like posts. Additionally, farmers can request technical help on this page.
- **Profile Page:** Allows farmers to update their account information and set/update their location.
- **Contact Page:** Provides a platform for users to contact the company for support or inquiries.

## Technologies Used

- **Backend:**
  - Flask: A lightweight WSGI web application framework in Python.
  - PostgreSQL: An open-source relational database management system.
  - Redis: An in-memory data structure store used as a cache and message broker.
- **Frontend:**
  - React: A JavaScript library for building user interfaces.
  - Leaflet JS: An open-source JavaScript library for interactive maps.
- **APIs:**
  - OpenWeather API: Provides weather data for cities.
- **Other:**
  - HTML, CSS, JavaScript: For building frontend components.
  - Docker: For containerizing the application.

## Getting Started

To get started with Digital Nourish Africa locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/digital-nourish-africa.git
   ```

2. Navigate to the project directory:

   ```
   cd digital-nourish-africa
   ```

3. Install dependencies:

   ```
   pip install -r requirements.txt
   ```

4. Set up PostgreSQL and Redis on your local machine. Update the database and Redis configurations in the Flask application accordingly.

5. Start the Flask backend:

   ```
   flask run
   ```

6. Navigate to the `frontend` directory:

   ```
   cd frontend
   ```

7. Install frontend dependencies:

   ```
   npm install
   ```

8. Start the React development server:

   ```
   npm start
   ```

9. Access the application at `http://localhost:3000` in your web browser.

## Deployment

To deploy Digital Nourish Africa to a production environment, you can follow the steps outlined in the respective documentation for Flask and React. Additionally, you may consider using Docker for containerization to simplify deployment and manage dependencies.

## Usage

Once the application is set up and running, users can navigate through the various pages:

- **Dashboard:** View weather information and live location map.
- **Farm Page:** Monitor sensor data, automate/irrigate farming processes.
- **Posts Page:** Send/view/like posts, request technical help.
- **Profile Page:** Update account information, set/update location.
- **Contact Page:** Reach out to the company for support or inquiries.

## Contributing

Contributions are welcome! If you'd like to contribute to Digital Nourish Africa, please follow these guidelines:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/improvement`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/improvement`).
6. Create a new Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for considering Digital Nourish Africa! If you have any questions or concerns, please don't hesitate to reach out. Happy farming! 🌱🚜