import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Activity from 'scenes/activity';
import Announcement from 'scenes/announcement';
import Dashboard from 'scenes/dashboard';
import FinishedPkm from 'scenes/finished-pkm';
import FinishedResearch from 'scenes/finished-research';
import Layout from 'scenes/layout';
import Login from 'scenes/login';
import Profile from 'scenes/profile';
import ReviewProposal from 'scenes/review-proposal';
import { setLogin } from 'state';
import { themeSettings } from 'theme';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      dispatch(
        setLogin({
          user: data.user,
          token: data.token,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isAuth) {
      getUser();
    }
  }, []);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/auth' element={<Login />} />
            <Route element={isAuth ? <Layout /> : <Navigate to='/auth' />}>
              <Route path='/' element={<Navigate to='/dashboard' />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/announcement' element={<Announcement />} />
              <Route path='/finished-pkm' element={<FinishedPkm />} />
              <Route path='/finished-research' element={<FinishedResearch />} />
              <Route path='/activity' element={<Activity />} />
              <Route path='/review-proposal' element={<ReviewProposal />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
