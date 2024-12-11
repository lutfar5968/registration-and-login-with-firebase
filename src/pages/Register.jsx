import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";

import { auth } from "../firebase/firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Register() {
  const [err, setErr] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    
    


    const term = e.target.term.checked;
    console.log(term);
    if (!term){
      setErr('Please check our terms');
      return;
    }
    

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    // reset error
    setErr("");

    if (password.length <= 6) {
      setErr("Password should be taken at least 6 character");
      return;
    }

    if (!passwordRegex.test(password)) {
      setErr(
        "Password contains at least one uppercase ,one lowercase , one number and one special character."
      );
      return;
    }

    // createUserWithEmailAndPassword

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
         
        // email verification 
        sendEmailVerification(auth.currentUser)
        .then(()=>{
          alert ("Email verification has sent")
        });


        const userProfile = {displayName: name, photoURL: photo}
        // update profile 

        updateProfile(auth.currentUser, userProfile)
        .then(()=>{
          console.log("updated");
          e.target.reset()
          
        }).catch((error)=>{
          setErr("something went wrong")
        });

      }).catch((error) => {
        const errorMessage = error.message;
        setErr(errorMessage);
      });
  };

  return (
    <div>
      <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center p-5">
          Please Registration it
        </h1>
        <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered"
              name="name"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">User Photo</span>
            </label>
            <input
              type="url"
              placeholder="PhotoUrl"
              className="input input-bordered"
              name="photo"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
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
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-[51px]"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </button>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                If you have an account ? Please <Link to={"/Login"}>Login</Link>
              </a>
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label flex justify-start">
              <input name="term" type="checkbox" className="checkbox checkbox-secondary"
              />
              <span className="label-text ml-3">Please checked our term</span>
            </label>
          </div>
          {err && <p className="text-red-700 font-bold">{err}</p>}
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
