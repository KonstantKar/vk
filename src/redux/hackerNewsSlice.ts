import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface HackerNewsSlice {
  news: News[];
  loading: boolean;
  selectedNews: News | null;
  selectedNewsComments: NewsComment[] | null;
  selectedInsideComments: NewsComment[] | null;
  showComments: boolean;
  commentsMap: { [key: number]: NewsComment[] };
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

export interface NewsComment {
  id: number;
  by: string;
  text: string;
  time: number;
  kids: number[];
}

const initialState: HackerNewsSlice = {
  news: [],
  loading: false,
  selectedNews: null,
  selectedNewsComments: null,
  selectedInsideComments: null,
  showComments: false,
  commentsMap: [],
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
    getNewsItemCommentsSuccess(state, action) {
      state.selectedNewsComments = action.payload;
    },
    getSelectedInsideComments(state, action) {
      state.selectedInsideComments = action.payload;
    },
    getNewsItemInsideCommentsSuccess(
      state,
      action: PayloadAction<{ commentId: number; comments: NewsComment[] }>
    ) {
      const { commentId, comments } = action.payload;
      state.commentsMap[commentId] = comments;
    },
    getShowComments(state) {
      state.showComments = !state.showComments;
    },
  },
});

export const {
  getHackerNewsLoading,
  getHackerNews,
  getSelectedNews,
  getNewsItemCommentsSuccess,
  getShowComments,
  getSelectedInsideComments,
  getNewsItemInsideCommentsSuccess,
} = newsSlice.actions;

export const getNews = () => async (dispatch: any) => {
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

export const getNewsItem =
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

export const getNewsItemComments =
  (selectedNewsId: string) => async (dispatch: any) => {
    dispatch(getHackerNewsLoading());
    try {
      const response = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${selectedNewsId}.json`
      );
      const selectedNews = response.data;
      dispatch(getSelectedNews(selectedNews));
      const commentsPromises = selectedNews.kids.map((commentId: number) =>
        axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
        )
      );
      const commentsResponses = await Promise.all(commentsPromises);
      const comments = commentsResponses.map((response) => response.data);
      dispatch(getNewsItemCommentsSuccess(comments));
    } catch (error) {
      console.log(error);
    }
  };

export const getInsideComments =
  (selectedCommentId: number) => async (dispatch: any) => {
    dispatch(getHackerNewsLoading());
    try {
      const response = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${selectedCommentId}.json`
      );
      const selectedComment = response.data;
      dispatch(getSelectedInsideComments(selectedComment));

      if (selectedComment.kids && selectedComment.kids.length > 0) {
        const commentsPromises = selectedComment.kids.map((commentId: number) =>
          axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
          )
        );
        const commentsResponses = await Promise.all(commentsPromises);
        const comments = commentsResponses.map((response) => response.data);
        dispatch(
          getNewsItemInsideCommentsSuccess({
            commentId: selectedCommentId,
            comments,
          })
        );
      } else {
        // Если вложенных комментариев нет, устанавливаем пустой массив для данного комментария
        dispatch(
          getNewsItemInsideCommentsSuccess({
            commentId: selectedCommentId,
            comments: [],
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

export default newsSlice.reducer;
