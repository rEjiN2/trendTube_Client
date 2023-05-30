import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase'
import axios from "../../utils/axios"
import { useNavigate } from 'react-router-dom';



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
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
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
const Label = styled.label`
  font-size: 14px;
`;
const PopupContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.popupBackground};
  color: ${({ theme }) => theme.popupText};
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


function Upload({setShow1}) {

    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const [uploadClicked, setUploadClicked] = useState(false);
    const [popupConfirmed, setPopupConfirmed] = useState(false);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
   const handleChange =(e)=>{
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
   }

    const handleTags = (e)=>{
        setTags(e.target.value.split(","))
    }
    const uploadFile = (file ,urlType)=>{
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}${file?.name}`;
      if (!fileName) {
        console.error("File name is not defined");
        return;
      }
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
    
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          urlType === "imgUrl" ? setImgPerc(progress) : setVideoPerc(Math.round(progress))
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        }, 
        (error) => {
          console.error(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setInputs((prev) =>{
                  return {...prev ,[urlType]: downloadURL  }
              })
          })
          .catch((error) => {
            console.error(error);
          });
        }
      )
    }
    

    useEffect(()=> {
    video && uploadFile(video ,"videoUrl")


    },[video])

    useEffect(()=>{
      
    img && uploadFile(img , "imgUrl")



    },[img])

  const  handleUpload = async (e)=>{
      e.preventDefault();
      setUploadClicked(true);
      const res =  await axios.post("/videos" , {...inputs ,tags})
    
      if (popupConfirmed) {
        setShow1(false);
      }
      // res.status === 200 && navigate(`/video/${res.data._id}`)
      res.status === 200 && navigate(`/`)
    }

  return (
    <Container>
         <Wrapper>
           <Close onClick={()=>setShow1(false)} >   
             X
           </Close>
           <Title>Upload a Video</Title>

           <Label>Video:</Label>
           {videoPerc > 0 ? (
          "Uploading:" + videoPerc + "%"
        ) : (
          <Input
            type="file"
            accept="video/*"
             onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
           
          <Input
          type="text"
          placeholder="Title"
          name="title"
           onChange={handleChange}
        />
         <Desc
          placeholder="Description"
          name="description"
          rows={8}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas."
           onChange={handleTags}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
             onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload} >Upload</Button>
        {uploadClicked && !popupConfirmed && (
          <PopupContainer>
            <p>Video will be updated shortly...</p>
            <button onClick={() => setPopupConfirmed(true)}>OK</button>
          </PopupContainer>
        )}


         </Wrapper>

    </Container>
  )
}

export default Upload; 