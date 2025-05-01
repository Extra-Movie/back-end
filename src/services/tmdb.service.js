const axios = require("axios");
const dotenv = require("dotenv").config({
  path: "../../.env",
});

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

const getMovies = async (page = 1) => {
  try {
    const { data } = await tmdb.get("/discover/movie", { params: { page } });
    return data;
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
    throw error;
  }
};

const getMovieGenres = async () => {
  try {
    const { data } = await tmdb.get("/genre/movie/list");
    return data;
  } catch (error) {
    console.error("Error fetching genres:", error.message);
    throw error;
  }
};

const getSeries = async (page = 1) => {
  try {
    const { data } = await tmdb.get("/discover/tv", { params: { page } });
    return data;
  } catch (error) {
    console.error("Error fetching series data:", error.message);
    throw error;
  }
};

const getTvShowGenres = async () => {
  try {
    const { data } = await tmdb.get("/genre/tv/list");
    return data;
  } catch (error) {
    console.error("Error fetching genres:", error.message);
    throw error;
  }
};

module.exports = {
  getMovies,
  getMovieGenres,
  getTvShowGenres,
  getSeries,
};
