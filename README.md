
# Earthquakes Chile Visualizer

A project to visualize earthquakes in Chile on an interactive map. Users can explore and filter earthquakes based on different dates and sources. The map also displays additional information about each earthquake, such as its magnitude, depth, and location. Users can interact with the map to zoom in and out and click on individual earthquake markers to see more details. Visit the live demo [HERE](https://earthquakes-chile-visualizer.netlify.app/).

![screenshot](https://user-images.githubusercontent.com/57046544/221298703-76bf3238-5496-4b7b-9f76-8616f67e19dd.png)

## Technologies used
 - [React](https://es.reactjs.org/)
 - [Mapbox](https://www.mapbox.com/)
 - [Sass](https://sass-lang.com/)
 - [Express](https://expressjs.com/)
 - [Node](https://nodejs.org/en/)

## How it works
It uses a simple web scraper that fetches data from [Centro Sismológico Nacional](https://www.sismologia.cl/) and the API from [USGS](https://earthquake.usgs.gov/fdsnws/event/1/). On top of that, it uses an [Express](https://expressjs.com/) API to filter earthquakes by date and source.

## Running Locally

To run this project, you will need to create an account on [Mapbox](https://www.mapbox.com/) and get your API TOKEN, then set an .env file in the root of the client directory with the following variable:

```bash
REACT_APP_MAPBOX_TOKEN="YOUR_MAPBOX_TOKEN_HERE"
```

Then, make sure to install dependencies in both client and server folders

```bash
  npm install
```

Start the server (available at http://localhost:5000)

```bash
  npm start
```

Start the client (available at http://localhost:3000)

```bash
  npm start
```

