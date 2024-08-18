# vue-chat

## Description

This is a simple chat app example.

I developed it while studying web technologies in 2017. My former mentor and I discussed my next educational project (after finishing a jQuery based todo app and an AngularJS based blog app) and the technologies I would need/want to practice. We decided to go with a chat app.

Despite various mistakes, funny moments and downright stupid things I did due to lack of experience, I decided not to delete this repository to have a reference to what and how I wrote back then.

Think of it as the first pot that at least didn't break and survived the firing when you first started making pottery. Yes, it's all crooked and lopsided, but it's one of your first things that finally worked. So, it's one of my "first pots" and I’m putting it on a shelf to see where I began.

Main technologies involved:
- NodeJS (^9.0.0)
- ExpressJS (^4.15.5)
- MongoDB (~3.6.0) + Mongoose (^4.12.3)
- VueJS (^2.5.2)
- WebSockets

## Setup

To run the app, you need to have Docker installed on your machine.

After cloning the repository, navigate to the root folder and run the following command:

```bash
docker-compose up --build
```

When docker-compose finishes building the containers, the app will be available at http://localhost:3000.

To test the functionality you can create 2 accounts in 2 different browsers (or normal tab/incognito tab). Add both users to a mutual chat and start sending messages between them.
