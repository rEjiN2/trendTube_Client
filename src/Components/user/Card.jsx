import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from '../../utils/axios';

const Container = styled.div`
  width: ${(props) => (props.type === 'sm' ? '360px' : '300px')};
  margin-bottom: ${(props) => (props.type === 'sm' ? '10px' : '45px')};
  cursor: pointer;
  display: ${(props) => props.type === 'sm' && 'flex'};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === 'sm' ? '120px' : '202px')};
  background-color: #999;
  flex: 1;
  border-radius: 5px;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== 'sm' && '16px'};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50px;
  background-color: #999;
  display: ${(props) => props.type === 'sm' && 'none'};
`;

const Texts = styled.div`
  max-height: 100px;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

function Card({ type, videos }) {
  const [channel, setChannel] = React.useState({});

  React.useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${videos.userId}`);
      setChannel(res?.data);
    };
    fetchChannel();
  }, [videos?.userId]);

  if (!videos) {
    return <div>NO VIDEO</div>;
  } else {
    return (
      <Link to={`/video/${videos._id}`} style={{ textDecoration: 'none' }}>
        <Container type={type}>
          <Image type={type} src={videos?.imgUrl} />
          <Details type={type}>
            <ChannelImage type={type} src={channel?.image} />
            <Texts>
              <Title>{videos.title}</Title>
              <ChannelName>{channel?.name}</ChannelName>
              <Info>
                {videos.views} views • {format(videos.createdAt)}
              </Info>
            </Texts>
          </Details>
        </Container>
      </Link>
    );
  }
}

export default Card;
