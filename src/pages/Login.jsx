import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Result } from "postcss";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase.init";


function Login() {

  const [show, setShow] = useState(false);
  const [err, setErr] = useState("")
  const emailRef = useRef()


  const handleSubmit = (e) => {
    e.preventDefault()
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    // reset err 
    setErr("");

    // sign in users 

    signInWithEmailAndPassword(auth, email, password)
    .then((result) =>{
      if(!result.user.emailVerified){
        setErr("Please verify your Email.")
      }
      console.log(result);

    }).catch((error)=> {

      console.log(error);
      setErr(error.massage)
      
    })
 
    
}

  const handleReset = () =>{

    const email = emailRef.current.value;

    if (email){
      sendPasswordResetEmail(auth, email)
      .then((result) => {
        console.log(result);
        
      }).catch((error)=>{
        console.log(error);
        setErr(error.massage)
        
      })
    }
  };


  return (
    <div>
      <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center p-5">Login Now</h1>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              ref={emailRef}
              type="email"
              placeholder="email"
              className="input input-bordered"
              name="email"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={show ? "text" : "password"}
              placeholder="password"
              className="input input-bordered"
              name="password"
              required
            />
            <button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-[51px]">
              {
                show ? <FaEyeSlash /> : <FaEye />
              }
              
              </button>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
              If you haven't an account ? Please <Link to={"/Register"}>Registration Your Account</Link>
              </a>
            </label>
            <label className="label">
              <a onClick={handleReset} className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {
            err && <p className="text-red-600">{err}</p>
          }
          <div className="form-control mt-6">
            <button className="btn btn-primary"><Link to={''}>Login</Link></button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login