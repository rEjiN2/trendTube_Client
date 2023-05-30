import React,{useState , useRef} from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import styled from 'styled-components'
import axios from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
import { loginSuccess } from '../../redux/userSlice'

const Container = styled.div`
  width:100%;
  height:100%;
  position:absolute;
  top:0;
  left:0;
  background-color: #000000a7;
  display:flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`

const Title = styled.h1`
  text-align: center;
`

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Profile = ({setShow2}) => {
  const inputRef = useRef(null)
  const {currentUser} = useSelector(state=>state.user)
  const [name, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password , setPassword] =useState('')
  const [image , setImage] = useState('https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png')
  const [picMessage , setPicMessage] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleImageClick = ()=>{
    inputRef.current.click()
  }

  
  const postDetails = (pics) =>{
    const file = pics
    const imgname   = pics.name
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 7,
          (maxSize - img.height) /7
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png" || "image/jpeg",
              lastModified: Date.now(),
            });
           
          },
          "image/jpeg",
          0.8
        );
      }
    }

    if(pics === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
      return setPicMessage("Please Select an Image");
    }

  setPicMessage(null)
  if (pics.type === "image/jpeg" || pics.type === "image/png") {
    const data = new FormData();
    
    data.append("file", file);
    data.append("upload_preset", "videoSharingApp");
    data.append("cloud_name", "dl4xaqrfu");
    fetch("https://api.cloudinary.com/v1_1/dl4xaqrfu/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) =>
       res.text())
      .then((data) => {
        
         
         const profileurl = JSON.parse(data)
        setImage(profileurl.url);
        
        
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    return setPicMessage("Please Select an Image");
  }
}
const handleSubmit = async(e)=>{
 e.preventDefault();
 const res =  await axios.put(`/users/${currentUser?._id}` , {name,email,image,password})
     
       dispatch(loginSuccess(res?.data))
      // setShow2(false);
      // res.status === 200 && navigate(`/`)

}


  return (
    <Container >
      <Wrapper>
        <Close onClick={()=>setShow2(false)}>   
          X
        </Close>
        <Title>User Profile</Title>
        <ImageContainer onClick={handleImageClick}>
          <img src={ currentUser.image} alt="Profile Picture" />
          
        </ImageContainer>
        <Input
          type="text"
          placeholder="User Name"
          name="name"
          
          onChange={(e)=>setUserName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          
          onChange={(e)=>setEmail(e.target.value)}

        />
        <Input
          type="password"
          placeholder="Change Password"
          name="password"
          onChange={(e)=>setPassword(e.target.value)}

        />
        <Input
          type="file"
          accept="image/png, image/jpeg"
          placeholder="User Image"
         ref={inputRef}
          onChange={(e) => postDetails(e.target.files[0], setImage)}
        />
        <Button onClick={handleSubmit}  >Upload</Button>
      </Wrapper>
    </Container>
  )
}

export default Profile

// import React,{useState , useRef} from 'react'
// import { useSelector ,useDispatch } from 'react-redux'
// import styled from 'styled-components'
// import axios from '../utils/axios'
// import { useNavigate } from 'react-router-dom'
// import { loginSuccess } from '../redux/userSlice'

// const Container = styled.div`
//   width:100%;
//   height:100%;
//   position:absolute;
//   top:0;
//   left:0;
//   background-color: #000000a7;
//   display:flex;
//   align-items: center;
//   justify-content: center;
// `

// const Wrapper = styled.div`
//   width: 600px;
//   height: 600px;
//   background-color: ${({ theme }) => theme.bgLighter};
//   color: ${({ theme }) => theme.text};
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   position: relative;
// `

// const Close = styled.div`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   cursor: pointer;
// `

// const Title = styled.h1`
//   text-align: center;
// `

// const Input = styled.input`
//   border: 1px solid ${({ theme }) => theme.soft};
//   color: ${({ theme }) => theme.text};
//   border-radius: 3px;
//   padding: 10px;
//   background-color: transparent;
//   z-index: 999;
// `;

// const ImageContainer = styled.div`
//   width: 150px;
//   height: 150px;
//   border-radius: 50%;
//   overflow: hidden;
//   position: relative;
//   margin: 0 auto;
//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-size: 14px;
//   margin-top: 10px;
// `;

// const Button = styled.button`
//   border-radius: 3px;
//   border: none;
//   padding: 10px 20px;
//   font-weight: 500;
//   cursor: pointer;
//   background-color: ${({ theme }) => theme.soft};
//   color: ${({ theme }) => theme.textSoft};
// `;

// const Profile = ({setShow2}) => {
//   const inputRef = useRef(null)
//   const {currentUser} = useSelector(state=>state.user)
//   const [name, setUserName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password , setPassword] =useState('')
//   const [image , setImage] = useState('https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png')
//   const [picMessage , setPicMessage] = useState(null)
//   const navigate = useNavigate();
//   const dispatch = useDispatch()

//   const handleImageClick = ()=>{
//     inputRef.current.click()
//   }

//   const handleImageChange = (e) =>{
//     const file = e.target.files[0];
//     postDetails(file);
//   }

//   const postDetails = (pics) =>{
//     const file = pics
//     const imgname   = pics.name
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       const img = new Image();
//       img.src = reader.result;
//       console.log(img.src);
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         const maxSize = Math.max(img.width, img.height);
//         canvas.width = maxSize;
//         canvas.height = maxSize;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(
//           img,
//           (maxSize - img.width) / 2, //x position
//           (maxSize - img.height) / 2, //y position
//           );
//           const dataUrl = canvas.toDataURL("image/jpeg");
//           setPicMessage(null)
//   if (pics.type === "image/jpeg" || pics.type === "image/png") {
//     const data = new FormData();
    
//     data.append("file", dataUrl);
//     data.append("upload_preset", "videoSharingApp");
//     data.append("cloud_name", "dl4xaqrfu");
//     fetch("https://api.cloudinary.com/v1_1/dl4xaqrfu/image/upload", {
//       method: "post",
//       body: data,
//     })
//       .then((res) =>
//        res.text())
//       .then((data) => {
        
         
//          const profileurl = JSON.parse(data)
//         setImage(profileurl.url);
        
        
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   else {
//     return setPicMessage("Please Select an Image");
//   }
//           };
//           };
//           }
          
//           const handleSubmit = async(e) => {
//             e.preventDefault();
//              const res =  await axios.put(`/users/${currentUser?._id}` , {name,email,image,password})
                 
//                  dispatch(loginSuccess(res?.data))
//           }
          
//           return (
//           <Container>
//           <Wrapper>
//           <Close onClick={()=>setShow2(false)}>X</Close>
//           <Title>Edit Profile</Title>
//           <ImageContainer onClick={handleImageClick}>
//           <img src={image} alt="profile" />
//           </ImageContainer>
//           <Input type="file" hidden onChange={handleImageChange} ref={inputRef}/>
//           {picMessage && <ErrorMessage>{picMessage}</ErrorMessage>}
//           <Input type="text" placeholder="Name" value={name} onChange={(e)=>setUserName(e.target.value)}/>
//           <Input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
//           <Input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
//           <Button onClick={handleSubmit}>Update</Button>
//           </Wrapper>
//           </Container>
//           )
//           }
          
//           export default Profile
