
import React, { useState, useContext, useRef } from 'react'
import { ImagePlus } from 'lucide-react'
import { postContext } from '../context/post.context.jsx'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
const navigate = useNavigate()
  const { createPost, loading } = useContext(postContext)

  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)

  const postImageInputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!image) {
      alert('Please select an image')
      return
    }

    const result = await createPost(image, caption)

    if (result) {
      navigate('/feed')
      setImage(null)
      setCaption('')
      postImageInputRef.current.value = ''
      alert('Post created successfully!')
    }
  }

  

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-xl shadow"
      >

        <h2 className="text-xl font-semibold mb-6">
          Create New Post
        </h2>

        <label className="block text-sm font-medium mb-2">
          Select Image
        </label>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-5">

          <ImagePlus className="mx-auto mb-3 text-gray-400" size={35} />

          <input
            ref={postImageInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm"
          />

          {image && (
            <p className="text-sm text-green-600 mt-3">
              {image.name}
            </p>
          )}

        </div>

        <label className="block text-sm font-medium mb-2">
          Caption
        </label>

        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500 mb-5 resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Sharing...' : 'Share Post'}
        </button>

      </form>

    </div>
  )
}

export default CreatePost
