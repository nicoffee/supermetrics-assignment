import { useEffect, useState } from 'react'
import { selectSlToken } from '../auth/authSlice'
import {
  selectUsers,
  setActiveUser,
  selectUserPosts,
  getPostListThunk,
  selectActiveUserId,
  filterUsers,
  filterPosts,
  setSortByDate,
} from './postListSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

import styles from './PostList.module.css'
import { formatDate } from './formatDate'

export function PostList() {
  const [userFilter, setUserFilter] = useState('')
  const [postFilter, setPostFilter] = useState('')

  const slToken = useAppSelector(selectSlToken)
  const userList = useAppSelector(selectUsers)
  const userPosts = useAppSelector(selectUserPosts)
  const activeUserId = useAppSelector(selectActiveUserId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPostListThunk({ slToken, page: 1 }))
  }, [dispatch, slToken])

  return (
    <div className={styles.grid}>
      <div className={styles.list}>
        <input
          value={userFilter}
          onChange={(event) => {
            setUserFilter(event.target.value)
            dispatch(filterUsers(event.target.value))
          }}
        />
        {userList.map((user) => (
          <div
            key={user.id}
            className={`${styles.user} ${
              user.id === activeUserId ? styles.activeUser : ''
            }`}
            onClick={() => dispatch(setActiveUser(user.id))}
          >
            <span>{user.name}</span>
            <div className={styles.count}>{user.postIds.length}</div>
          </div>
        ))}
      </div>

      <div className={styles.list}>
        <div className={styles.postListControls}>
          <div className={styles.sortButtons}>
            <button
              className={styles.activeButton}
              type="button"
              onClick={() => dispatch(setSortByDate('asc'))}
            >
              🔼
            </button>
            <button
              className={styles.activeButton}
              type="button"
              onClick={() => dispatch(setSortByDate('desc'))}
            >
              🔽
            </button>
          </div>
          <input
            className={styles.postFilterInput}
            value={postFilter}
            onChange={(event) => {
              setPostFilter(event.target.value)
              dispatch(filterPosts(event.target.value))
            }}
          />
        </div>

        {userPosts.map((post) => (
          <div key={post.id} className={styles.post}>
            <div className={styles.postHeader}>
              {formatDate(post.created_time)}
            </div>
            <div className={styles.postContent}>{post.message}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
