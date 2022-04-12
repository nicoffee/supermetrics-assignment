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
  selectSortByDate,
  selectStatus,
} from './postListSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

import styles from './PostList.module.css'
import { formatDate } from './formatDate'
import { Input } from '../shared/ui/Input'

export default function PostList() {
  const [userFilter, setUserFilter] = useState('')
  const [postFilter, setPostFilter] = useState('')

  const slToken = useAppSelector(selectSlToken)
  const userList = useAppSelector(selectUsers)
  const userPosts = useAppSelector(selectUserPosts)
  const activeUserId = useAppSelector(selectActiveUserId)
  const sortByDateOrder = useAppSelector(selectSortByDate)
  const state = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPostListThunk({ slToken, page: 1 }))
  }, [dispatch, slToken])

  if (state === 'loading') {
    return <span>Loading...</span>
  }

  return (
    <div className={styles.grid}>
      <div className={styles.list}>
        <Input
          value={userFilter}
          onChange={(event) => {
            setUserFilter(event.target.value)
            dispatch(filterUsers(event.target.value))
          }}
          size="small"
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
              className={`${styles.sortButton} ${
                sortByDateOrder === 'asc' && styles.activeButton
              }`}
              type="button"
              onClick={() => dispatch(setSortByDate('asc'))}
            >
              🔼
            </button>
            <button
              className={`${styles.sortButton} ${
                sortByDateOrder === 'desc' && styles.activeButton
              }`}
              type="button"
              onClick={() => dispatch(setSortByDate('desc'))}
            >
              🔽
            </button>
          </div>
          <Input
            classNames={styles.postFilter}
            value={postFilter}
            onChange={(event) => {
              setPostFilter(event.target.value)
              dispatch(filterPosts(event.target.value))
            }}
            size="small"
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
