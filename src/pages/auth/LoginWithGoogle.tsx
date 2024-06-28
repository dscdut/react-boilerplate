import google from '@/assets/google.png'
import { auth } from '@/configs/config'
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function LoginWithGoogle() {
  const navigate = useNavigate()
  const [, setUser] = useState<User | null>(null)

  const provider = new GoogleAuthProvider()
  const SIGN_IN_WITH_GOOGLE = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        setUser(user)
        toast.success('Login successfully')
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code
        toast.error(`Login failed: ${errorCode}`)
      })
  }

  return (
    <div>
      <p className='flex justify-center font-bold'>--Or continue with--</p>
      <div className='flex justify-center cursor-pointer' onClick={SIGN_IN_WITH_GOOGLE}>
        <img src={google} width={'60%'} alt='Google login button' />
      </div>
    </div>
  )
}

export default LoginWithGoogle
