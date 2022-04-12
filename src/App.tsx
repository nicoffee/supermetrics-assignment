import React from 'react'
import { Suspense, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from './app/hooks'
import { getSlToken, selectSlToken } from './features/auth/authSlice'
import styles from './App.module.css'

const Auth = React.lazy(() => import('./features/auth/Auth'))
const PostList = React.lazy(() => import('./features/post-list/PostList'))

function App() {
  const slToken = useAppSelector(selectSlToken)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getSlToken())
  }, [dispatch])

  return (
    <div className={`${styles.content} ${slToken ? '' : styles.overlay}`}>
      <Suspense fallback={<div>Loading...</div>}>
        {slToken ? <PostList /> : <Auth />}
      </Suspense>
    </div>
  )
}

export default App
