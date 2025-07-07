import { Routes, Route } from 'react-router-dom';
import { Login, Home, Rental, Homepage, DetailsPost } from './containers/public';
import { path } from './utils/constant';
function App() {
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
      </Routes>
      {/* app */}

    </div>
  );
}

export default App;
