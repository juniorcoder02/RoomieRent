# RoomieRent

RoomieRent is a platform to help users find rooms or flats for rent, designed to connect renters with property owners for seamless booking and communication. [View RoomieRent live here](https://roomierent.onrender.com).

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Models Overview](#models-overview)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

RoomieRent simplifies the process of finding rental properties, particularly for students or individuals seeking affordable living spaces. It enables users to view properties, contact owners directly, and book spaces online.

## Features

- **Property Listings**: Explore available rooms and flats for rent with details such as title, description, location, and amenities.
- **Direct Contact**: Contact property owners via WhatsApp, call, or email to arrange bookings or ask questions.
- **Book Now**: Initiate bookings with a single click, allowing users to express interest in a property.
- **User Reviews**: Add and view reviews for properties, helping future renters make informed choices.

## Installation

To run RoomieRent locally:

1. Clone this repository:

   ```bash
   git clone https://github.com/juniorcoder02/roomierent.git
   cd roomierent

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Set up environment variables (create a .env file with your configuration):

   - MongoDB connection string
   - Render or local server configurations
   - Secret keys for sessions or any APIs used

4. Start the application:

   ```bash
   node app.js

   ```

## Usage

1. Register or log in to access full functionality.
2. Search for properties by city or other filters.
3. Use the "Direct Contact" section on the property page to get in touch with the owner.
4. Click "Book Now" to express interest in booking a property.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, EJS
- **Backend**: Node.js, Express
- **Database**: MongoDB (using Mongoose)
- **Hosting**: Render

## Models Overview

RoomieRent includes two primary models:

- **Properties**: Contains details like title, description, location, amenities, owner details, and reviews.
- **Owners**: Stores owner-specific data, enabling direct contact functionality on property pages.

## Future Enhancements

- **Advanced Filtering**: Add filters for rent range, property type, and amenities.
- **Booking System**: Expand booking functionality to handle payment and reservation tracking.
- **Notification System**: Implement email or SMS notifications for booking confirmations and updates.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and test them.
4. Submit a pull request with a detailed explanation.

## License

This project is licensed under the MIT License.
