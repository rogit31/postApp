import { Link, useLoaderData } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";
import classes from './PostDetails.modules.css';
import {parseToken, users, findUserById} from './../../../../backend/fakedb';
import { useEffect, useState } from "react";

function PostDetailsPage() {
  const postData = useLoaderData()
  const [currentUser, setCurrentUser] = useState(null);
  const [isThem, setIsThem] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('jwt_access_token');
        if (token) {
          const response = await axios.post(`${DOMAIN}/api/user/validation`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const user = response.data.result.user;
          setCurrentUser(user);
          setIsThem(user.id === postData.userId);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchCurrentUser();
  }, [postData.userId]);

  console.log(currentUser)
  const user = users.find((user)=> user.id === postData.userId);
  const email = user.email;
  const username = email.split('@')[0];
  console.log(postData.id)

  return (
    <>
      <Container>
        <div className="postCard">
          <div className="postDetails">
            <p className="username">{username}</p>
            <h1>{postData.title}</h1>
            <p className="category">{postData.category}</p>
            <p>{postData.content}</p>
          </div>
          <img src={postData.image} alt="" />
        </div>
        <div className="buttonWrapper">
        <Button id="backButton">
          <Link to="/posts">Back to Posts</Link>
        </Button>
       {isThem ?
         <Button id='editButton'>
          <Link to={`/edit/${postData.id.toString()}`}>Edit</Link>
        </Button> : ''}
        </div>

      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default PostDetailsPage;
