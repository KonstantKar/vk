import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Div from "../../UI/Div";
import { RootState } from "../../../redux/Store";
import { getAxiosNews } from "../../../redux/hackerNewsSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { ThumbUpAltOutlined } from "@mui/icons-material";

const HackerNews: FC = () => {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
    useDispatch();
  const news = useSelector((state: RootState) => state.news.news);
  const loading = useSelector((state: RootState) => state.news.loading);
  const sortedNews = [...news].sort((a, b) => b.time - a.time); //Сортировка по дате, самые новые вверху

  useEffect(() => {
    dispatch(getAxiosNews());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Div>
          <CircularProgress />
        </Div>
      ) : (
        <Div>
          {sortedNews.map((story) => (
            <Box
              key={story.id}
              sx={{
                margin: "30px 30px 30px 0px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="caption">Автор:{story.by}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="caption">
                      Дата публикации:
                      {new Date(story.time * 1000).toLocaleString()}
                    </Typography>
                    <a
                      href={story.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      "Ссылка на новость!"
                    </a>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <li style={{ paddingBottom: "50px" }}>{story.title}</li>
                <Typography variant="caption">
                  <ThumbUpAltOutlined /> {story.score}
                </Typography>
                <Divider />
              </Box>
            </Box>
          ))}
        </Div>
      )}
    </>
  );
};

export default HackerNews;
