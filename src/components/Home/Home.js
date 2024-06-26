import { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Grow,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Forms";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import Pagination from "../Pagination/Pagination";
import { useDispatch } from "react-redux";
import {getPostBySearch } from "../../actions/posts";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useQuery();
  const navigate = useNavigate();

  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const handleKeyPress=(e)=>{
     if(e.keyCode === 13){
      searchPost();
     }
  }
  const handleAdd=(tag)=>{
    setTags([...tags,tag])
  }
  const handleDelete=(tagToDelete)=>setTags(tags.filter(tag=>tag!==tagToDelete));


  const searchPost=()=>{
    if(search.trim() || tags){
      //dispatch -> fetch search post
      dispatch(getPostBySearch({search,tags:tags.join(',')}));
      navigate(`/posts/search?searchQuery=${search || 'none'} &tags=${tags.join(',')}`);
    }
    else{
      navigate('/');
    }
  }
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justify-content="space-between"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item xs={12} sm={7} md={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={5} md={4} className={classes.form} >
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onKeyDown={handleKeyPress}
                onChange={(e)=>setSearch(e.target.value)}
              />
              <ChipInput 
                style={{margin:'10px 0'}}
                value={tags}
                onDelete={handleDelete}
                label="search Tags"
                onAdd={handleAdd}
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length)&& (
              <Paper className={classes.pagination} elevation={6}>
                 <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
