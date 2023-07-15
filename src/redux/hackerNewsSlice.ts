import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface HackerNewsSlice {
  news: News[];
  loading: boolean;
}

interface News {
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
  },
});

export const { getHackerNewsLoading, getHackerNews } = newsSlice.actions;

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

export default newsSlice.reducer;
