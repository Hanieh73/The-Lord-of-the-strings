# The-Lord-of-the-strings present you "City 72"

## Table of Contents

- [About](#about)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Built With](#built-with)
- [Testing](#testing)
- [Contributing](#contributing)
- [Demo](#demo)
- [Authors & Acknowledgment](#authors--acknowledgment)

## About ℹ️

The City 72 is a retro-futuristic educational game designed to tackle the problem of low engagement in educational apps. Set in the interactive cyberpunk cityscape of City 72, the game enhances GCSE knowledge through text-based decision-making, interactive challenges, and a dynamic storyline.

## Deployment 🌐

Our project is deployed on Render, and can be accessed at:
https://city-72-game.onrender.com/

## Project Structure 🏗️

This application employs an MVC architecture, with:

- **Models**: Define data structures for game components.
- **Controllers**: Business logic for handling API requests.
- **Routers**: Direct HTTP requests to the appropriate controllers.
- **Middleware**: Handles authentication and other pre-processing.
- **Database**: PostgreSQL schema for persistent data storage.

## Getting Started 🚀

To get the API up and running:

1. Clone the repo:

```bash
git clone <repository-link>
```

2. Install dependencies:

```bash
cd lord-of-the-strings
npm install
```

3. Set up environment variables in `.env`.

4. Initialize your PostgreSQL database.

5. Start the server:

```bash
npm start
```

## API Endpoints 🌐

The API provides CRUD operations for Characters, Chats, Games, Items, Progress, Stories, and Users.

## Built With 🛠️

- **Express.js**: For server setup and middleware.
- **Node.js**: As the runtime environment.
- **PostgreSQL**: For database management.
- **bcrypt**: For secure password hashing.
- **OpenAI's GPT**: For interactive chat functionalities.

## Testing 🧪

Testing is handled using:

```bash
npm run test
```

## Contributing 🤝

Contributions are welcome. Please get in touch if you would like to contribute to our project!

## Demo 🖥️

The demo walks through the gameplay experience, highlighting features like voice commands, interactive storytelling powered by OpenAI's GPT, and text-to-speech options. It also showcases the achievement and leaderboard systems.

## Authors & Acknowledgment 🙌

Hanieh Zaab
Tayeeb Islam
Adil Wadud
Khalifa Bamikole
Nadim Ahmed
