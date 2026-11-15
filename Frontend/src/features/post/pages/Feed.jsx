
import React ,{useContext,useEffect} from 'react'
import Post from '../components/Post.jsx'
import Navbar from '../components/Navbar.jsx'
import { postContext } from '../context/post.context.jsx'
import { AuthContext } from '../../auth/context/auth.context.jsx'


const Feed = () => {
  const { feed,getFeed,loading } = useContext(postContext)
  const { user } = useContext(AuthContext)

  useEffect(()=>{
    getFeed()
  },[])


  if(loading || !feed){
    return <div>Loading...</div>
  }
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <Navbar/>

      <div className="max-w-[470px] mx-auto flex flex-col gap-5">

       {feed.map((post) => (
          <Post
            key={post._id}
            post={post}
            user={post.user}
            currentUser={user}
          />
        ))}

      </div>

    </main>
  )
}

export default Feed
