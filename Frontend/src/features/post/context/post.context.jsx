
import { createContext, useState } from "react"
import axios from "axios"

export const postContext = createContext()

export const PostProvider = ({ children }) => {

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const [feed, setFeed] = useState([])

  const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
  })

  // Get Feed
  const getFeed = async () => {
    try {
      setLoading(true)

      const response = await api.get('/api/v1/posts/feed')

      setFeed(response.data.posts)

    } catch (error) {
      console.error('Error fetching feed:', error)
    } finally {
      setLoading(false)
    }
  }

  // Create Post
  const createPost = async (imageFile, caption) => {
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('image', imageFile)
      formData.append('caption', caption)

      const response = await api.post(
        '/api/v1/posts/create',
        formData
      )

      const newPost = response.data.post

      setFeed(prev => [newPost, ...prev])

      return newPost

    } catch (error) {
      console.error(
        'Error creating post:',
        error.response?.data || error.message
      )
      return null

    } finally {
      setLoading(false)
    }
  }


  // Like Post
  const likePost = async (postId) => {
    try {
      setLoading(true)
      const response = await api.post(
        `/api/v1/posts/like/${postId}`
      )

      await getFeed()

      return response.data
    } catch (error) {
      console.error(
        "Error liking post:",
        error.response?.data || error.message
      )
      return null
    }finally {
      setLoading(false)
    }
  }

  // Unlike Post
  const unLikePost = async (postId) => {
    try {
      setLoading(true)
      const response = await api.post(
        `/api/v1/posts/unlike/${postId}`
      )

      await getFeed()

      return response.data
    } catch (error) {
      console.error(
        "Error unliking post:",
        error.response?.data || error.message
      )
      return null
    }finally {
      setLoading(false)
    }
  }


  return (
    <postContext.Provider
      value={{
        post,
        setPost,
        loading,
        setLoading,
        feed,
        setFeed,
        getFeed,
        createPost,
        likePost,unLikePost
      }}
    >
      {children}
    </postContext.Provider>
  )
}
