import { Box, Divider, Typography, IconButton, Stack } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { FC } from "react";
import { NewsComment } from "../../../../redux/hackerNewsSlice";

interface NewsDetailsProps {
  selectedNewsComments: NewsComment[] | null;
  selectedInsideComments: any; // Не знаю как определить правильно
  handleOpenInsideComments: (commentId: number) => void;
}

const CommentSection: FC<NewsDetailsProps> = ({
  selectedNewsComments,
  selectedInsideComments,
  handleOpenInsideComments,
}) => {
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography variant="h6">Комментарии:</Typography>
      {selectedNewsComments &&
        selectedNewsComments.map((comment) => (
          <Box key={comment.id} sx={{ marginBottom: "16px" }}>
            <Typography variant="subtitle1" sx={{ color: "#1976d2" }}>
              {comment.by}
            </Typography>
            <Typography>{comment.text}</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton onClick={() => handleOpenInsideComments(comment.id)}>
                <CommentIcon />
              </IconButton>
              <Typography>
                {Array.isArray(comment.kids) ? comment.kids.length : 0}
              </Typography>
            </Stack>
            <Divider />
            {/* Отображаем вложенные комментарии, если они есть */}
            {selectedInsideComments[comment.id] &&
              selectedInsideComments[comment.id].map((insideComment: any) => (
                <Box key={insideComment.id} sx={{ marginLeft: "50px" }}>
                  <Typography variant="subtitle1" sx={{ color: "#1976d2" }}>
                    {insideComment.by}
                  </Typography>
                  <Typography>{insideComment.text}</Typography>
                  <Divider />
                </Box>
              ))}
          </Box>
        ))}
    </Box>
  );
};

export default CommentSection;
