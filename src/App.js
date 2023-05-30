import styled, { ThemeProvider } from "styled-components";
import Sidebar from "./Components/user/Sidebar";
import Navbar from "./Components/user/Navbar";
import { useState } from "react";
import { darkTheme, LightTheme } from "./utils/Theme";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/user/Home";
import Video from "./Pages/user/Video";
import Login from "./Pages/user/Login";
import Search from "./Pages/user/Search";
import HistoryPage from "./Pages/user/HistoryPage";
import UserAuth from "./Protected/UserAutherization";
import AuthRoute from "./Protected/AuthRoute";
const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.soft};
`;

const Wrapper = styled.div`
  padding: 15px 56px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : LightTheme}>
      <Container>
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Main>
          <Navbar />
          <Wrapper>
            <Routes>
              <Route path="/" element={<Home type="random" />} />
              <Route path="/history" element={
              <UserAuth>
              <HistoryPage />
              </UserAuth>
              } />
              <Route path="myvideos" element={
              <UserAuth>
              <Home type="myVid" />
              </UserAuth>

              } />
              <Route path="/subscriptions" element={
              <UserAuth>
              <Home type="sub" />
              </UserAuth>
              } />
              <Route path="/trends" element={<Home type="trend" />} />
              <Route path="/signin" element={
              <AuthRoute>
              <Login />
              </AuthRoute>
              } />
              <Route path="/search" element={<Search />} />
              <Route path="/video/:id" element={<Video />} />
            </Routes>
          </Wrapper>
        </Main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
