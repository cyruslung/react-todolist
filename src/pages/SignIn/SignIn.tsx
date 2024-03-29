import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { StyledSignIn } from './StyledSignIn'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootStore } from '../../redux/store'
import { signInFetchUsers } from '../../redux'
import { useTranslation } from 'react-i18next'

interface TypeUser {
  email: string,
  password: string,
}

export default function SignIn() {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<TypeUser>()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const userStatus = useSelector((store: RootStore) => store.userStatus)

  const onSubmit = (data: any) => {
    const form = {
      user: {
        email: data.email,
        password: data.password
      }
    }
    dispatch(signInFetchUsers(form))
  }

  const onError = (errors: any) => console.log(errors)

  useEffect(() => {
    if (userStatus.user) {
      reset()
      navigate('/Todo')
    }
  }, [userStatus])

  return (
    <StyledSignIn>
      <div className="signIn">
        <div className="signIn_form">
          <div className="title">{t('sign_in')}</div>
          <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <div className='formList'>
              <label >Email：
                <input

                  type="email"
                  placeholder={t('PleaseEnterEmail')}
                  {...register("email", {
                    required: { value: true, message: `*${t('ThisFieldIsRequired')}` },
                    pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: `*${t('DoesNotMeetEmailRules')}` }
                  })}
                />
              </label>
              <div className="error-message">
                {errors.email?.message}
              </div>
            </div>
            <div className='formList'>
              <label>
                密碼：
                <input
                  type="password"
                  placeholder={t('PleaseEnterPassword')}
                  {...register("password", {
                    required: { value: true, message: `*${t('ThisFieldIsRequired')}` },
                  })}
                />
              </label>
              <div className="error-message">
                {errors.password?.message}
              </div>
            </div>
            <input type="submit" value={t('sign_in')} />
            <Link to='/Register' className="register">{t('register_account')}</Link>
          </form>
        </div>
      </div>
    </StyledSignIn>
  )

}