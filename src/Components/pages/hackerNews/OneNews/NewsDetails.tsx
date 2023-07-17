import { ThumbUpAltOutlined } from "@mui/icons-material";
import { Box, Divider, Paper, Typography, Link } from "@mui/material";
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
    <Paper elevation={3} sx={{ padding: "16px", marginBottom: "32px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Box onClick={() => navigate("/hackersNews")}>
          <ArrowBackIcon />
        </Box>
        <Box sx={{ flex: 1 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Дата публикации:{" "}
            {new Date(selectedNews.time * 1000).toLocaleString()}
          </Typography>
          <Link
            href={selectedNews.url}
            target="_blank"
            rel="noopener noreferrer"
            variant="body2"
          >
            Ссылка на новость
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h5">{selectedNews.title}</Typography>
      </Box>
      <Box sx={{ margin: 4 }}>
        <Typography>
          {selectedNews.text ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipi.Lorem isectetur adipi"}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: "8px",
        }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <ThumbUpAltOutlined sx={{ marginRight: "4px" }} />
          {selectedNews.score}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", marginLeft: "16px" }}
        >
          <CommentIcon sx={{ marginRight: "4px" }} />
          {selectedNews.descendants}
        </Typography>
      </Box>
    </Paper>
  );
};

export default NewsDetails;
