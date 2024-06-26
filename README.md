Certainly! Here's a revised version of your README file content:

---

# Stock Monitoring App - MERN Stack Monolithic Architecture

## Backend Technologies
- Express
- MongoDB
- Node.js
- JSON Web Tokens (JWT) for authentication

### API Endpoints (Postman Link)
[Postman Workspace](https://restless-spaceship-284418.postman.co/workspace/My-Workspace~c0fa9137-0031-4932-8268-18f7881794d9/collection/33646561-251d70dc-212f-4238-9612-8fc591816135?action=share&creator=33646561)

1. Authentication
   - Sign Up: `POST http://localhost:4500/api/v1/auth/signup`
   - Sign In: `POST http://localhost:4500/api/v1/auth/signin`

2. WatchList
   - Get User's Watchlist: `GET http://localhost:4500/api/v1/wishlist/get-user-watchlist`
   - Add Symbol: `POST http://localhost:4500/api/v1/wishlist/add-user-watchlist`
   - Delete Symbol: `DELETE http://localhost:4500/api/v1/wishlist/remove-user-watchlist`

3. Stock
   - Get Change: `GET http://localhost:20000/api/v1/stock/get-change?symbol=IBM`
   - Get Stock Data: `GET http://localhost:20000/api/v1/stock/get-stock-data?symbol=ICICIBANK&interval=60`
   - Dummy Stock API: `GET http://localhost:20000/api/v1/stock/get-stock-dummy-data`

## Frontend Technologies
- React
- Material UI
- Tailwind CSS
- Canva
- React Stock Chart

### Routes
- `/`: Home (Landing Page)
- `/stock-data`: Display Stock Data (Presentation Logic under development)
- `/watchlist`: User's Watchlist (Requires Login)
- `/signup`: Sign Up Page
- `/signin`: Sign In Page

## Additional Details
- Utilized Higher-Order Components (HOC) to manage loading states.
- Implemented Context API to avoid prop drilling.
- Hosting Link: [Stock Monitoring App](https://stockmoniteringapp-front-end.onrender.com/)

---

