import { Link, useLoaderData, useNavigate } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";
import classes from "./EditPost.module.css";
import React, { useState } from "react";

export default function EditPost(){

    const initialData = useLoaderData();
    const [formData, setFormData] = useState(initialData);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(`${DOMAIN}/api/edit`, formData);
            if (res?.data.success){
                navigate(`/posts/${formData.id}`)
            }
        } catch(error){
            console.log("Error submitting form >_<" , error);
        }
    };

    return(
        <>
        <form onSubmit={handleSubmit} className={classes.form}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}/>
            </div>
            <div>
            <label htmlFor="category">Category</label>
            <select name="category" id="category" onChange={handleChange}>
                <option value="nature">Nature</option>
                <option value="culture">Culture</option>
                <option value="art">Art</option>
                <option value="cooking">Cooking</option>
            </select>
            </div>

            <div>
                <label htmlFor="content">Content</label>
                <textarea rows={4} name="content" id="content" value={formData.content} onChange={handleChange}></textarea>
            </div>

            <div>
            <label htmlFor="pictureURL">Picture URL</label>
            <input type="url" id="pictureURL" name="image" value={formData.image} onChange={handleChange}/>
            </div>
            <input type="submit" className={classes.submit}/>
        </form>
        </>
    )
}

export const postDetailsLoader = async ({ params }) => {
    const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
    return res.data;
  };