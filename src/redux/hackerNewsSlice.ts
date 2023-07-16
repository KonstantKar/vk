import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface HackerNewsSlice {
  news: News[];
  loading: boolean;
  selectedNews: News | null;
}

export interface News {
  id: number;
  deleted: boolean;
  type: string;
  by: string;
  time: number;
  text: string;
  dead: boolean;
  parent: number;
  poll: number;
  kids: number[];
  url: string;
  score: number;
  title: string;
  parts: number[];
  descendants: number;
}

const initialState: HackerNewsSlice = {
  news: [],
  loading: false,
  selectedNews: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    getHackerNewsLoading(state) {
      state.loading = true;
    },
    getHackerNews(state, action) {
      state.loading = false;
      state.news = action.payload;
    },
    getSelectedNews(state, action) {
      state.selectedNews = action.payload;
    },
  },
});

export const { getHackerNewsLoading, getHackerNews, getSelectedNews } =
  newsSlice.actions;

export const getAxiosNews = () => async (dispatch: any) => {
  dispatch(getHackerNewsLoading());
  try {
    const response = await axios.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    const topNewsIds = response.data.slice(0, 10);
    const newsPromises = topNewsIds.map((id: string) =>
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    );
    const newsResponses = await Promise.all(newsPromises);
    const newsItems = newsResponses.map((response) => response.data);
    dispatch(getHackerNews(newsItems));
  } catch (error) {
    console.log(error);
  }
};

export const getAxiosNewsItem =
  (selectedNewsId: string) => async (dispatch: any) => {
    dispatch(getHackerNewsLoading());
    try {
      const response = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${selectedNewsId}.json`
      );
      const selectedNewsIds = response.data;
      dispatch(getSelectedNews(selectedNewsIds));
    } catch (error) {
      console.log(error);
    }
  };

export default newsSlice.reducer;
