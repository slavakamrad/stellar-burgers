import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  BrowserRouter
} from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

// const location = useLocation();
// const navigate = useNavigate();
// const background = location.state && location.state.background;

const handleModalClose = () => {};

const App = () => (
  <BrowserRouter>
    <div className={styles.app}>
      <AppHeader />
      {/* <Routes location={background || location}> */}
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <Modal title='' onClose={handleModalClose}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <Modal title='' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
