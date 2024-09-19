import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState([]);
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [show, setShow] = useState(0);



  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: posts[posts.length - 1].title,
          content: posts[posts.length - 1].content
        })
      });
    }
    fetchData();
  }, [posts]);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: posts[posts.length - 1].title,
          content: posts[posts.length - 1].content
        })
      });
    }
    fetchData();
  }, [posts]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/api/posts");
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, [posts]);
  console.log(data);
  function handleSubmit(e) {
    e.preventDefault();
    let formdata = new FormData(e.target);
    let formObj = Object.fromEntries(formdata);
    console.log(formObj);
    setPosts([...posts, formObj]);
    console.log(posts);
    e.target.reset();
  }

  function handleSubmitComment(e) {
    e.preventDefault();
    let formdata = new FormData(e.target);
    let formObj = Object.fromEntries(formdata);
    console.log(formObj);
    setComment([...comment, formObj]);
    console.log(comment);
    e.target.reset();
  }

  console.log(posts);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name='title' />
        <input type="text" name='content' />
        <button>Gönder</button>
      </form>

      <div className="container">
        {
          show === 0 ? <div className="postList"> {data.map((x, i) => <div className='postItem' key={i}>
            <h2>Yazar: {x.title}</h2>
            <h3>Gönderi: {x.content}</h3>
            <p>Oluşturulma Tarihi: {new Date(x.createdAt).toLocaleDateString('tr-TR')}</p>
            <button onClick={() => { setShow(1); setSelectedIndex(x.id) }}>Yorumlar</button>
          </div>)}</div> :
            <div className="CommentList">
              <button onClick={() => setShow(0)} >Geri Dön</button>
              {data.map((x, i) => <div className='commentItem' key={i} style={{
                display: `${selectedIndex === x.id ? "flex" : "none"}`
              }} >
                <div className="postItem">
                  <h2>Yazar: {x.title}</h2>
                  <h3>Gönderi: {x.content}</h3>
                  <p>Oluşturulma Tarihi: {new Date(x.createdAt).toLocaleDateString('tr-TR')}</p>
                </div>
                <div className="comments">
                  <h2>Yorumlar</h2>
                  <button onClick={() => setShow(2)}>Yorum Ekle</button>
                  {show === 2 ? <form onSubmit={handleSubmitComment} className='commentForm'>
                    <button onClick={() => setShow(3)}>X</button>
                    <input type="text" name='title' />
                    <input type="text" name='comment' />
                    <input type="hidden" name='postId' value={x.id} />
                    <button>Gönder</button>
                  </form> : ""}
                </div>
              </div>)}
            </div>
        }
      </div>
    </>
  )
}
export default App
