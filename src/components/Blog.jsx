import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import reducer from './Reducer';

const initialValue = {
    posts: [],
  };

  function Blog() {
    const [state, dispatch] = useReducer(reducer, initialValue);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [editingPost, setEditingPost] = useState();

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          dispatch({ type: 'fetch_success', payload: response.data });
        });
      }, []);

      const deletePost = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(() => {
          dispatch({ type: 'DELETE_POST', payload: id });
        });
      };

      const addPost = (title, body) => {
        axios.post('https://jsonplaceholder.typicode.com/posts', { title, body })
        .then(response => {
          dispatch({ type: 'ADD_POST', payload: response.data });
          setTitle('');
          setBody('');
        });
      };
    
      const updatePost = (id, title, body) => {
        axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, { title, body })
        .then(response => {
          dispatch({ type: 'UPDATE_POST', payload: response.data });
          setEditingPost();
          setTitle('');
          setBody('');
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (editingPost) {
          updatePost(editingPost.id, title, body);
        } else {
          addPost(title, body);
        }
      };

      const handleEdit = (post) => {
        setEditingPost(post);
        setTitle(post.title);
        setBody(post.body);
      };
    
      
    
      

      return (
        <div>
            <h1>Blog Post</h1>
            <div>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button className='btn btn-dark' type="submit">{editingPost ? 'Update Post' : 'Add Post'}</button>
      </form>
    </div>

        <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.posts?.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>
                <button className='btn btn-danger ' onClick={() => deletePost(post.id)}>Delete</button>
                <button className='btn btn-primary' onClick={() => handleEdit(post)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      );
    }

    export default Blog