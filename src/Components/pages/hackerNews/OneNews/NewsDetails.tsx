import { ThumbUpAltOutlined } from "@mui/icons-material";
import { Box, Divider, Paper, Typography } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { News } from "../../../../redux/hackerNewsSlice";
import { FC } from "react";

interface NewsDetailsProps {
  selectedNews: News;
}

const NewsDetails: FC<NewsDetailsProps> = ({ selectedNews }) => {
  const navigate = useNavigate();
  return (
    <Box
      component={Paper}
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
          <a href={selectedNews.url} target="_blank" rel="noopener noreferrer">
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
          <ThumbUpAltOutlined />
          {selectedNews.score}
        </Typography>
      </Box>
      <Divider />
    </Box>
  );
};

export default NewsDetails;
