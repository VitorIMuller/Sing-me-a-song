# Sing Me A Song

Have you ever asked someone for a song recommendation? Thats solved by this app! This is an application for anonymous songs recommendations.
<p align="center">
  <img src="front-end/public/assets/sing-me-a-song.gif" />
</p>

## About

This is an web application which lots of people share their musical taste and preferences. The more people thumbs up a song, higher the chances of it getting recommended for even more people!
Below are the implemented features:

- Add a new recommendation
- Add and subtract points from a recommendation
- See the top recommended songs in the app
- Listen to a random recommended song

By using this app any user can discover a whole new musical world!

## Technologies
The following tools and frameworks were used in the construction of the project:<br>
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/styled-components%20-%2320232a.svg?&style=for-the-badge&color=b8679e&logo=styled-components&logoColor=%3a3a3a'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/axios%20-%2320232a.svg?&style=for-the-badge&color=informational'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/react-app%20-%2320232a.svg?&style=for-the-badge&color=60ddf9&logo=react&logoColor=%2361DAFB"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/react_route%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/react-icons%20-%2320232a.svg?&style=for-the-badge&color=f28dc7&logo=react-icons&logoColor=%2361DAFB'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/cypress%20-%2320232a.svg?&style=for-the-badge&color=orange'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/prisma%20-%2320232a.svg?&style=for-the-badge&color=blueviolet'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/typescript%20-%2320232a.svg?&style=for-the-badge&color=blue'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/supertest%20-%2320232a.svg?&style=for-the-badge&color=green'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/jest%20-%2320232a.svg?&style=for-the-badge&color=red'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/joi%20-%2320232a.svg?&style=for-the-badge&color=informational'>
</p>

## How to run

1. Clone this repository (it contains both frontend and backend)
2. Install dependencies for both main directories (front and back)
```bash
npm i
```
3. Create a ".env" file, in frontend root, containing the following variable
```bash
REACT_APP_API_BASE_URL=your_back_end_link
```
4. Create a ".env" file, in backend root, containing the following variables
```bash
DATABASE_URL=your_database_url
NODE_ENV=prod
```
5. Also create a ".env.test" file, in backend root, containing the following variables
```bash
DATABASE_URL=your_test_database_url
NODE_ENV=test
```
6. Build the database by running the following command in the backend directory
```bash
npx prisma migrate dev
```
7. If you want to run the backend tests (coverage included) try to run 
```bash
npm t
```
8. If you want to take a look at the frontend tests, run in the respective directory
```bash
npm run cy
```
9. Finally you can run the front-end with
```bash
npm start
```
10. And run the back-end with
```bash
npm run start
```
11. Also you can run the back-end on "development" mode by running
```bash
npm run dev
```
