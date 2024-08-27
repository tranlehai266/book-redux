import React, { useState, useEffect } from "react";
import { Container, Button, Box, Card, Stack, CardMedia, CardActionArea, Typography, CardContent } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReadingList, removeReadingList } from "../features/pageSlice";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const ReadingPage = () => {
  const [removedBookId, setRemovedBookId] = useState("");
  
  const dispatch = useDispatch()
  const status = useSelector((state) => state.page.status)
  const readingList = useSelector((state) => state.page.readingBook)
  
  const navigate = useNavigate()
  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };


  const removeBook = (bookId) => {
    setRemovedBookId(bookId);
  };

  useEffect(() => {
    dispatch(getReadingList())
  },[dispatch,removedBookId])

  useEffect(() => {
    if (!removedBookId) return;
    dispatch(removeReadingList(removedBookId))
    setRemovedBookId("")
  },[removedBookId, dispatch])
  

  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: "center" }} m={3}>Book Store</Typography>
      {status ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }} >
          <ClipLoader color="inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Stack direction="row" spacing={2} justifyContent="space-around" flexWrap={"wrap"}>
          {readingList.map((book) => (
            <Card
              key={book.id}
              sx={{
                width: "12rem",
                height: "27rem",
                marginBottom: "2rem",
              }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`${BACKEND_API}/${book.imageLink}`}
                  alt={`${book.title}`}
                  onClick={() => handleClickBook(book.id)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {`${book.title}`}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    {`${book.author}`}
                  </Typography>
                  <Button
                    sx={{
                      position: "absolute", top: "5px", right: "5px",
                      backgroundColor: "secondary.light", color: "secondary.contrastText",
                      padding: "0", minWidth: "1.5rem"
                    }}
                    size="small"
                    onClick={() => removeBook(book.id)}
                  >
                    &times;
                  </Button>
                </CardContent>

              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </Container >
  );
};

export default ReadingPage;
