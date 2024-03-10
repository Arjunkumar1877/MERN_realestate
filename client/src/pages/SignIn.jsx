import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

function SignIn() {
  const [formData, setFormData] = useState({});
 const {loading, error} = useSelector((state)=> state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleChange = (e) =>{
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      })
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
   try {
   dispatch(signInStart());
    const res = await fetch('/api/auth/signin',
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data)

    if(data.success === false){
   dispatch(signInFailure(data.message))
     return;
    }

 dispatch(signInSuccess(data));
    navigate('/');
   } catch (error) {
  dispatch(signInFailure(error.message));
   }
  };

  // console.log(formData);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold m-7">Sign In</h1>
      <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input onChange={handleChange} type="email" id="email" className="border p-3 rounded-lg"  placeholder='email' />
        <input onChange={handleChange} type="password"  id="password" className="border p-3 rounded-lg"  placeholder='password' />
       <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95  disabled:opacity-80'>{loading ? "Loading..." : "Sign In"}</button>
       <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p className="">
          Have an account ?
        </p>
       <Link to="/sign-up">
       <span className='text-blue-700'>Sign up</span>
       </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn