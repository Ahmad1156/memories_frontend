import * as api from "../api";
import { postsActions } from "../store/postsSlice";

//Action Creators
export const getPost = (id) => {
  return async (dispatch) => {
    try {
      dispatch(postsActions.startLoading());
      const { data } = await api.fetchPost(id);
      dispatch(postsActions.FETCH_POST(data));
      dispatch(postsActions.endLoading());
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getPosts = (page) => {
  return async (dispatch) => {
    try {
      dispatch(postsActions.startLoading());
      const { data } = await api.fetchPosts(page);

      dispatch(postsActions.FETCH_ALL(data));
      dispatch(postsActions.endLoading());
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getPostBySearch=(searchQuery)=>{
  return async (dispatch)=>{
    try {
      dispatch(postsActions.startLoading());
      const {data:{data}}=await api.fetchPostsBySearch(searchQuery);

      dispatch(postsActions.FetchBySearch(data));
      dispatch(postsActions.endLoading());
    } catch (error) {
      console.log(error);
    }
  }
}

export const createPost=(post,navigate)=>{
  return async (dispatch)=>{
    try {
      dispatch(postsActions.startLoading());
       const {data}=await api.createPost(post);
       
       dispatch(postsActions.CREATE(data));
       dispatch(postsActions.endLoading());
       navigate(`/posts/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  }
}
export const updatePost=(id, post)=>{
   return async(dispatch)=>{
    try {
     const {data}= await api.updatePost(id,post);
    
     dispatch(postsActions.updatePost(data));
    } catch (error) {
       console.log(error.message);
    }
   }
}
export const deletePost=(id)=>{
  return async(dispatch)=>{
  try {
    await api.deletePost(id);
    
    dispatch(postsActions.deletePost(id));
  } catch (error) {
    console.log(error);
  }
}
}
export const likePost=(id)=>{
  return async (dispatch)=>{
    try {
      const {data}=await api.likePost(id);

      dispatch(postsActions.likePost(data));
    } catch (error) {
      console.log(error);
    }
  }
}
export const commentPost=(value,id)=>{
  return async (dispatch)=>{
    try {
      const {data}=await api.comment(value,id);
      dispatch(postsActions.updatePost(data));
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  }
}


