import { useSelector } from "react-redux";
import {Grid,CircularProgress} from '@material-ui/core';
import Post from "./post/Post";
import useStyles from './styles';


const Posts = ({setCurrentId}) => {
    const {posts,isLoading}=useSelector((state)=>state.Posts.posts);
    const classes=useStyles();

    
  if(!posts?.length && !isLoading) return 'No Posts';
  return (
    isLoading ? <CircularProgress />:(
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {
          posts.map((post)=>(
            <Grid key={post._id} item xs={12} sm={11} md={6} lg={4}>
              <Post  post={post} setCurrentId={setCurrentId}/>
            </Grid>
          ))
        }
      </Grid>
    )
  );
};
export default Posts;
