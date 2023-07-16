import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Div from "../../UI/Div";
import { RootState } from "../../../redux/Store";
import { getAxiosNewsItem } from "../../../redux/hackerNewsSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ThumbUpAltOutlined } from "@mui/icons-material";

const HackerNewsItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
    useDispatch();
  const selectedNews = useSelector(
    (state: RootState) => state.news.selectedNews
  );

  useEffect(() => {
    // Проверяем, что id не равен undefined перед вызовом dispatch
    id !== undefined && dispatch(getAxiosNewsItem(id));
  }, [dispatch, id]);

  return (
    <>
      {selectedNews ? (
        <Div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "32px",
              }}
            >
              <Box onClick={() => navigate("/hackersNews")}>
                <ArrowBackIcon />
              </Box>
              <Box sx={{ flex: 1 }} />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>
                  Дата публикации:
                  {new Date(selectedNews.time * 1000).toLocaleString()}
                </Typography>
                <a
                  href={selectedNews.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  "Ссылка на новость!"
                </a>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5">{selectedNews.title}</Typography>
            </Box>
            <Box
              sx={{
                margin: 4,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography>
                {selectedNews.text ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography variant="caption">
                <CommentIcon />
                {selectedNews.descendants}
              </Typography>
              <Typography variant="caption">
                <ThumbUpAltOutlined />
                {selectedNews.score}
              </Typography>
            </Box>
            <Divider />
          </Box>
          <Box>
            <Typography>Комментарии</Typography>
            {selectedNews.kids.map((comment) => {
              return <div>{comment}</div>;
            })}
          </Box>
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

export default HackerNewsItem;
