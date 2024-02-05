/// <reference types="vite/client" />

interface Blogpost {
    allPost: Array<{
      _id: string;
      username: string;
      title: string;
      content: string;
      views: number;
      blogImg: {
        public_id: string;
        url: string;
      };
      likes: number;
      comment: Array<string>;
      tags: string;
      avatar:string
    }>;
  }
  

interface Login{
  token:string
  user:{
    _id:string;
     success: boolean;
    avatar:string;
    createdAt:Date;
    email:string;
    name:string;
    password:string;
    role:string;
   }
}
interface LoginUser{
  email:string;
  password:string;
}

interface MyError {
  status: string;
  data?: {
    message?: string;
  };
}
interface registration{
  email:string;
  password:string;
  name:string;
  avatar:string
}
interface Logout{
  message:string
}