import { FormEvent, useState } from 'react'

import { useAppDispatch } from '../../app/hooks'
import { loginThunk } from './authSlice'
import styles from './Auth.module.css'
import { Input } from '../shared/ui/Input'
import { Button } from '../shared/ui/Button'

export default function Auth() {
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(loginThunk({ name, email }))
  }

  return (
    <div className={styles.modal}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formFields}>
          <Input
            id="name"
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required={true}
          />

          <Input
            id="email"
            label="Email"
            value={email}
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            required={true}
          />
        </div>

        <Button>Login</Button>
      </form>
    </div>
  )
}
