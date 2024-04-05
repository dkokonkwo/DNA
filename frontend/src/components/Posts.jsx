import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import iron from "../assets/img/default.jpg";
import { useEffect, useState } from "react";
import NavbarMain from "./TopHeader";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [usernames, setUsernames] = useState([]);
  const [userId, setUserId] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/@me", {
          withCredentials: true,
        });
        const data = response.data;
        if (response.status === 200) {
          // Handle successful login
          console.log(data.id);
          setUserId(data.id);
          getPosts();
        } else {
          // You can redirect the user to the login page if needed
          window.location.href = "/login";
        }
      } catch (error) {
        // Handle network errors or server errors
        console.error("An error occurred:", error);
        if (error.response.status === 401 || error.response.status === 404) {
          alert("please sign in again");
          window.location.href = "/login";
        }
      }
    };

    checkLogin();
  }, []);

  const getPosts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/posts", {
        withCredentials: true,
      });

      const data = response.data;
      if (response.status === 200) {
        // Handle successful login
        console.log(data.id);
        setPosts(data.posts);
        setUsernames(data.usernames);
      } else {
        // You can redirect the user to the login page if needed
      }
    } catch (error) {
      // Handle network errors or server errors
      console.error("An error occurred:", error);
      if (error.response.status === 400) {
        alert(response.data.message);
      }
    }
  };

  const createPost = async (e) => {
    e.preventDefault();

    const data = {
      title,
      content,
    };

    if (!title || !content) {
      alert("Add a title and Content");
      return;
    }

    const url = "http://127.0.0.1:5000/create_post";

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Setting credentials to true
      });
      const resp = response.data;
      if (response.status === 201 || response.status === 200) {
        alert(resp.message);
      } else {
        // Handle other response statuses
        alert(response.data.message);
      }
    } catch (error) {
      // Handle network errors or server errors
      console.error("An error occurred:", error);
      alert(error);
    }
  };

  const updatePost = async (id) => {
    const data = {
      title,
      content,
    };

    const url = "http://127.0.0.1:5000/" + `update_post/${id}`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      updateCallback();
    }
  };

  const deletePost = async (postId) => {
    const url = `http://127.0.0.1:5000/delete_post/${postId}`;

    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Setting credentials to true
      });
      const resp = response.data;
      if (response.status === 201 || response.status === 200) {
        alert(resp.message);
      } else {
        // Handle other response statuses
        alert(resp.message);
      }
    } catch (error) {
      // Handle network errors or server errors
      console.error("An error occurred:", error);
      alert(error);
    }
  };

  const UpdateForm = ({ username, postId }) => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="new-post">
            <div className="pro-pic">
              <img src={iron} alt="profile picture" />
            </div>
            <div className="username-form">
              <h6>{username}</h6>
              <Form onSubmit={() => updatePost(postId)}>
                <Form.Control
                  type="text"
                  id="title-1"
                  placeholder="Update Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Form.Control
                  as="textarea"
                  rows={3}
                  id="content"
                  placeholder="Update Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <Button type="submit">Save</Button>
              </Form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="page-1">
      <NavbarMain />
      <Container fluid className="posts-body">
        <Row>
          <Col className="col-7" id="scrollable-col">
            <div className="new-post">
              <div className="pro-pic">
                <img src={iron} alt="profile picture" />
              </div>
              <div className="username-form">
                <h6>NEW POST</h6>
                <Form onSubmit={createPost}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    id="title-1"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Type Post"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <Button type="submit">Post</Button>
                </Form>
              </div>
            </div>
            <div className="all-posts">
              <div className="pro-pic">
                <img src={iron} alt="profile picture" />
              </div>
              <div className="posts-list">
                <div className="name-time">
                  <h5>Jack Black</h5>
                  <p>2018-04-23</p>
                </div>
                <div className="post-info">
                  <h4>Title of post</h4>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Labore distinctio iusto rem cupiditate praesentium maxime
                    corporis, ab ad quas saepe numquam sed tempore officia
                    suscipit. Numquam earum recusandae quasi ipsa!
                  </p>
                </div>
              </div>
            </div>
            {posts.map((post, index) => (
              <div className="all-posts">
                <div className="pro-pic">
                  <img src={iron} alt="profile picture" />
                </div>
                <div className="posts-list">
                  <div className="name-time">
                    <h5>{usernames[index]}</h5>
                    <p>{post.dateCreated}</p>
                  </div>
                  <div className="post-info">
                    <h4>{post.title}</h4>
                    <p>{post.content}</p>
                    {post.userId === userId ? (
                      <div className="space-buttons">
                        <Button onClick={handleShow}>Update</Button>
                        <Button onClick={() => deletePost(post.id)}>
                          Delete
                        </Button>
                        <UpdateForm
                          username={usernames[index]}
                          postId={post.id}
                        />
                      </div>
                    ) : (
                      <Button>Like</Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Col>
          <Col className="col-3" id="filters">
            <h3>Filters</h3>
            <div className="filter-options">
              <Button>My Posts</Button>
              <Button>Latest</Button>
              <Button>Liked Posts</Button>
              <Button>Private</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Posts;
