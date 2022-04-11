import { useEffect } from 'react'
import { Auth } from './features/auth/Auth'
import { PostList } from './features/post-list/PostList'
import { useAppSelector, useAppDispatch } from './app/hooks'
import { getSlToken, selectSlToken } from './features/auth/authSlice'
import styles from './App.module.css'

function App() {
  const slToken = useAppSelector(selectSlToken)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getSlToken())
  }, [dispatch])

  return (
    <div className={`${styles.content} ${slToken ? '' : styles.overlay}`}>
      {slToken ? <PostList /> : <Auth />}
    </div>
  )
}

export default App
