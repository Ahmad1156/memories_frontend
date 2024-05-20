import {createSlice} from "@reduxjs/toolkit";


const postsSlice=createSlice({
    name:"Posts",
    initialState:{
      posts:{
        isLoading:true,
        posts:[]
      }
    },
    //we can do this,since redux toolkit will take of this mutable methods.
    reducers:{
        FETCH_ALL(state,action){
          state.posts={
            ...state.posts,
            posts:action.payload.data,
            currentPage:action.payload.currentPage,
            numberOfPages:action.payload.numberOfPages
          }
        },
        FETCH_POST(state,action){
           state.posts={
            ...state.posts,
            post:action.payload
           }
        },
        FetchBySearch(state,action){
           state.posts={
             ...state.posts,
             posts:action.payload,
           }
        },
        CREATE(state,action){
          state.posts={
            ...state.posts,
            posts:[...state.posts.posts,action.payload]
          };
        },
       updatePost(state,action){
        state.posts={
          ...state.posts,
          posts:state.posts.posts.map((post)=>post._id === action.payload._id?action.payload:post)
        }
       },
       deletePost(state,action){
         state.posts={
          ...state.posts,
          posts:state.posts.posts.filter((post)=> post._id !== action.payload)
         }
       },
       likePost(state,action){
        state.posts={
          ...state.posts,
          posts:state.posts.posts.map((post)=>post._id === action.payload._id?action.payload:post)
        }
       },
       startLoading(state,action){
        state.posts={
          ...state.posts,
          isLoading:true
        }
       },
       endLoading(state,action){
        state.posts={
          ...state.posts,
          isLoading:false
        }
       },
    }
});

export const postsActions=postsSlice.actions;
export default postsSlice;