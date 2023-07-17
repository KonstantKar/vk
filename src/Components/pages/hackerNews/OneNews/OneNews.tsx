import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Div from "../../../UI/Div";
import { RootState } from "../../../../redux/Store";
import {
  getInsideComments,
  getNewsItem,
  getNewsItemComments,
  getShowComments,
} from "../../../../redux/hackerNewsSlice";
import { useParams } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Box, CircularProgress } from "@mui/material";

import NewsDetails from "./NewsDetails";
import CommentSection from "./CommentSection";

const OneNews = () => {
  const { id } = useParams();

  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
    useDispatch();
  const selectedNews = useSelector(
    (state: RootState) => state.news.selectedNews
  );
  const selectedNewsComments = useSelector(
    (state: RootState) => state.news.selectedNewsComments
  );
  const selectedInsideComments = useSelector(
    (state: RootState) => state.news.commentsMap
  );

  useEffect(() => {
    // Проверяем, что id не равен undefined перед вызовом dispatch
    id !== undefined && dispatch(getNewsItem(id));
    if (id !== undefined) {
      dispatch(getNewsItemComments(id));
    }
  }, [dispatch, id]);

  const handleOpenComment = () => {
    dispatch(getShowComments());
  };

  const handleOpenInsideComments = (commentId: number) => {
    if (!selectedInsideComments[commentId]) {
      // Если вложенные комментарии еще не загружены, вызываем экшен для их получения
      dispatch(getInsideComments(commentId));
    }
  };

  return (
    <>
      {selectedNews ? (
        <Div>
          <NewsDetails selectedNews={selectedNews} />
          <CommentSection
            selectedNewsComments={selectedNewsComments}
            selectedInsideComments={selectedInsideComments}
            handleOpenInsideComments={handleOpenInsideComments}
          />
        </Div>
      ) : (
        <Div>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        </Div>
      )}
    </>
  );
};

export default OneNews;
