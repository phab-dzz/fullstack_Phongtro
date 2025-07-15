import { Routes, Route } from 'react-router-dom';
import { Login, Home, Rental, Homepage, DetailsPost } from './containers/public';
import { path } from './utils/constant';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as actions from './store/actions';
import { System,CreatePost,ManagePost,UserProfile } from './containers/System';
import { ToastContainer } from 'react-toastify';


function App() {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 1000)
  }, [isLoggedIn])

  useEffect(() => {
    dispatch(actions.getPrices())
    dispatch(actions.getAreas())
    dispatch(actions.getProvinces())
  }, [])

  return (
    <div className="h-screen w-full bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />} >
          <Route path={path.LOGIN} element={<Login />} />
          <Route path='*' element={<Homepage />} />
          <Route path={path.HOME__PAGE} element={<Homepage />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={'chi-tiet/*'} element={<DetailsPost />} />

        </Route>
        <Route path={path.SYSTEM} element={<System />} >
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.USER_PROFILE} element={<UserProfile />} />
        </Route>
      </Routes>
      {/* app */}
       <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
}

export default App;
