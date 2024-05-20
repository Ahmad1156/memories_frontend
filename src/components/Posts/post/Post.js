import { useState } from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import {Link} from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const [likes,setLikes]=useState(post?.likes);
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
 
  const userID=user?.result?.sub || user?.result?._id;
  const hasLikedPost=likes.find((like) => like === userID);

  const handleLike=async()=>{
       dispatch(likePost(post._id));
       if(hasLikedPost){
         setLikes(likes.filter((id)=>id!==userID));
       }else{
          setLikes([...post.likes,userID]);
       }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === userID
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          {likes.length > 2
            ? `You & ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="body1">{post.name}</Typography>
        <Typography variant="body1">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
      {(user?.result?.sub === post?.creator ||
          user?.result?._id === post?.creator) && (
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize="medium" />
        </Button>
        )}
      </div>
      <CardActionArea component={Link} to={`/posts/${post._id}`}  >
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag}`)}
        </Typography>
      </div>
      <Typography className={classes.title} varient="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
      <Typography style={{padding:'0px'}} varient="body2" color="textSecondary" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.sub === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            style={{color:'red'}}
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
export default Post;
