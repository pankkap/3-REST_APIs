import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.js'

export default function Notes() {
  // create state to store API Data
  const [posts, setposts] = useState();
  const [post, setpost] = useState()
  const [newPost, setnewPost] = useState({
    id:"",title:'',body:''
  })
  const [showEditForm, setshowEditForm] = useState(false)
  const [showCreateForm, setshowCreateForm] = useState(false)

  // Fetching API Data in the Background using UseEffect Hook
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/notes/")
      .then((res) => setposts(res.data))
      .catch((err) => console.log(err));
  }, []); // [] will work like ComponentDidMount() and runs only once

  // Check weather data stored in the state or not
  // console.log(posts);

  // Update Operation
  function editPostDetails(postInfo)
  {
    console.log(postInfo)
    setpost(postInfo)
    setshowEditForm(true)
  }
  console.log(post)

  function updateRecord(e){
    e.preventDefault()
    // console.log(newPost)
    axios
    // Template String
    .put(`http://localhost:4000/api/notes/${post._id}`, newPost)
    .then(res=>{
      alert("Record Updated")
      setshowEditForm(false)
      window.location.reload()
    })
    .catch(err=>console.log(err))
  }

  const deletePost = (postInfo)=>{
    axios
    .delete(`http://localhost:4000/api/notes/${postInfo._id}`)
    .then((res)=>{
        alert("Post Deleted Successfully")
        window.location.reload();
    })
    .catch(err=>console.log(err))

  }
  
  function showCreatePostForm()
  {
    setshowCreateForm(true)
  }

  function CreateNewPost(){
    // console.log(newPost)
    axios
    .post(`http://localhost:4000/api/notes/`, newPost)
    .then(res=>alert("New Post Created"))
    .catch(err=>console.log(err))

    window.location.reload()

  }
  return (
    <div className="container">
      {/* Heading of Social App */}
      <div className="row ">
        <div className="col-md-12">
          <h2 className="text-center bg-primary text-white py-2">
            List of Posts
          </h2>
        </div>
      </div>

    <button className="btn btn-primary" onClick={showCreatePostForm}>Lets Create New Record</button>
      {/* Table to display Posts Data */}
      {showCreateForm?<form>
        <label htmlFor="">Title</label>
        <input type="text"  className="form-control"
        onChange={(e)=>setnewPost({...newPost, title:e.target.value})}

        />

        <label htmlFor="">Body</label>
        <input type="text" className="form-control"
        onChange={(e)=>setnewPost({...newPost, body:e.target.value})}

        />

        <button type="button" className="btn btn-primary my-2" onClick={CreateNewPost}>Create Record</button>
      </form>
      :null}
      


      {showEditForm?
      <form>
        <label htmlFor="">ID</label>
        <input type="text" defaultValue={post._id} className="form-control"/>

        <label htmlFor="">Title</label>
        <input type="text" defaultValue={post.title} className="form-control"
        onChange={(e)=>setnewPost({...newPost, title:e.target.value})}
        />

        <label htmlFor="">Body</label>
        <input type="text" defaultValue={post.body} className="form-control"
        onChange={(e)=>setnewPost({...newPost, body:e.target.value})}
        />

        <button className="btn btn-primary my-2" onClick={updateRecord}>Update Record</button>
      </form>
      :<table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Body</th>
          <th scope="col" colSpan={2} className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts ?
          // posts && is used here for conditional rendering
          posts.map((post, i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={()=>editPostDetails(post)}>Edit</button>
              </td>
              <td>
                <button className="btn btn-success btn-sm" onClick={()=>deletePost(post)}>Delete</button>
              </td>
            </tr>
          )):<tr>
            <td>Loading...!!</td>
          </tr>
          }
      </tbody>
    </table>
      }
    </div>
  );
}
