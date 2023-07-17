import {
  Box,
  CircularProgress,
  Divider,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Div from "../../UI/Div";
import { RootState } from "../../../redux/Store";
import { getNews } from "../../../redux/hackerNewsSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { ThumbUpAltOutlined } from "@mui/icons-material";
import UpdateIcon from "@mui/icons-material/Update";
import { useNavigate } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";

const HackerNews: FC = () => {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
    useDispatch();
  const news = useSelector((state: RootState) => state.news.news);
  const loading = useSelector((state: RootState) => state.news.loading);
  const [refreshInterval, setRefreshInterval] = useState(60000);
  const navigate = useNavigate();

  const sortedNews = [...news].sort((a, b) => b.time - a.time); //Сортировка по дате, самые новые вверху
  useEffect(() => {
    dispatch(getNews());

    // Установка интервала обновления данных
    const intervalId = setInterval(() => {
      dispatch(getNews());
    }, refreshInterval);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [dispatch, refreshInterval]);

  const handleRefreshClick = () => {
    dispatch(getNews());
  };

  return (
    <>
      {!loading ? (
        <>
          <Div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": {
                  color: "primary.main",
                },
              }}
              onClick={handleRefreshClick}
            >
              Обновить новостную ленту
              <UpdateIcon sx={{ ml: 1 }} />
            </Box>
          </Div>
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
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      Автор: {story.by}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        Дата публикации:{" "}
                        {new Date(story.time * 1000).toLocaleString()}
                      </Typography>
                      <Link
                        href={story.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="body2"
                      >
                        Ссылка на новость
                      </Link>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      cursor: "pointer",
                      "&:hover": { color: "primary.main" },
                    }}
                    onClick={() => navigate(`/hackersNews/${story.id}`)}
                  >
                    {story.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      <ThumbUpAltOutlined sx={{ mr: 0.5 }} />
                      {story.score}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", ml: 1 }}
                    >
                      <CommentIcon sx={{ mr: 0.5 }} />
                      {story.descendants}
                    </Typography>
                  </Box>
                  <Divider />
                </Box>
              </Box>
            ))}
          </Div>
        </>
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

export default HackerNews;
