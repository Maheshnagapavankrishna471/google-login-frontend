// import React, { useState } from 'react'
// import Login from './components/Login'
// import Logout from './components/Logout'

// const App = () => {
//   const [stateAuth, setStateAuth] = useState()
//   const response = (res) => {
//     setStateAuth(res)
//   }
//   return (
//     <div className='d-flex justify-content-center align-items-center flex-column'
//       style={{ height: "100vh" }}
//     >
//       {!stateAuth ?
//         <Login response={response} />
//         :
//         <div className='d-flex justify-content-center align-items-center flex-column'>
//           <img src={stateAuth.data.picture} />
//           <h5>{stateAuth.data.name}</h5>
//           <p>{stateAuth.data.email}</p>
//         <Logout response={response} />
//         </div>
//       }
//     </div>
//   )
// }

// export default App



// import { GoogleLogin } from '@react-oauth/google';
// import React, { useState, useEffect } from 'react';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

// function App() {
//   const [user, setUser] = useState([]);
//   const [profile, setProfile] = useState([]);

//   const login = useGoogleLogin({
//     onSuccess: (codeResponse) => setUser(codeResponse),
//     onError: (error) => console.log('Login Failed:', error),
//   });

//   // useEffect(() => {
//   //   if (user) {
//   //     axios
//   //       .get(`http://localhost:5000/api/userdetails`, {
//   //         headers: {
//   //           Authorization: `Bearer ${user.access_token}`,
//   //           Accept: 'application/json',
//   //         },
//   //       })
//   //       .then((res) => {
//   //         setProfile(res.data);
//   //         console.log(res);
//   //       })
//   //       .catch((err) => console.log(err));
//   //   }
//   // }, [user]);

//   useEffect(() => {
//     if (user) {
//       axios
//         .post('http://localhost:5000/api/users', {
//           googleId: user.googleId,
//           name: profile.data.name,
//           email: profile.email,
//           picture: profile.picture,
//         })
//         .then((res) => {
//           setProfile(res.data);
//         })
//         .catch((err) => console.log(err));
//     }
//   }, [user]);


//   const logOut = () => {
//     googleLogout();
//     setProfile(null);
//   };

//   return (
//     <>
//       <div>
//         <h2>React Google Login</h2>
//         <br />
//         <br />
//         {profile && profile.name ? (
//           <div>
//             <img src={profile.picture} alt="user image" />
//             <h3>User Logged in</h3>
//             <p>Name: {profile.name}</p>
//             <p>Email Address: {profile.email}</p>
//             <br />
//             <br />
//             <button onClick={logOut}>Log out</button>
//           </div>
//         ) : (
//           <button onClick={() => login()}>Sign in with Google 🚀 </button>
//         )}
//       </div>
//     </>
//   );
// }

// export default App;

// Frontend: React component
// client/src/App.js
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState([]);
  console.log(profile)

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.access_token) {
          const userDetailsResponse = await axios.get('http://localhost:5000/api/userinfo', {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          });
          console.log(userDetailsResponse)
          setProfile(userDetailsResponse.data);
    
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
    fetchData();
  }, [user]);
  let send=async()=>{
    try{
      const res=await axios.post("http://localhost:5000/api/users",{ googleId:profile.id, name:profile.name, email:profile.email, picture:profile.picture } )
      console.log(res.data)
    }
    catch(err){
      console.log(err)
    }
   }
  useEffect(() => {
send()
  }, [profile]);

  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
  };

  return (
    <>
      <div>
        <h2>React Google Login</h2>
        <br />
        <br />
        {profile && profile.name ? (
          <div>
            <img src={profile.picture} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <button onClick={logOut}>Log out</button>
          </div>
        ) : (
          <button onClick={() => {login();send()}}>Sign in with Google 🚀</button>
        )}
      </div>
    </>
  );
}

export default App;











