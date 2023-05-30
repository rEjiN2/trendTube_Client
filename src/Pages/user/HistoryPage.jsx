import React,{ useState, useEffect } from 'react'
import axios from '../../utils/axios'
import Card from '../../Components/user/Card';
import styled from 'styled-components';
const Container = styled.div`
  
`;



function HistoryPage() {
    const [history, setHistory] = useState([]);
    
    useEffect(() => {
        const fetchHistory = async () => {
          try {
            const res = await axios.get('/videos/history');
            setHistory(res.data);
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchHistory();
      }, []);
  return (
    <Container>
      {history.map((item)=>{
      return  <Card type="sm"  key={item._id} videos={item}/>
      })

      }

    </Container>
  )
}

export default HistoryPage