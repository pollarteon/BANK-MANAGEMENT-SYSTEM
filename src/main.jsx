import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import HomePage from './Pages/HomePage.jsx';
import AuthPage from './Pages/AuthPage.jsx';
import './index.css';
import { Provider } from 'react-redux'
import store from './redux/store.js';
import ClientPage from './Pages/ClientPage.jsx';
import ProtectedRoute from './Components/Auth/ProtectedRoute.jsx';
import EmployeePage from './Pages/EmployeePage.jsx';
import Transactions from './Components/Client/Transactions.jsx';
import Details from './Components/Client/Details.jsx';
import Accounts from './Components/Client/Accounts.jsx';
import Loans from './Components/Client/Loans.jsx';
import AccountDetails from './Components/Client/AccountsDetails.jsx';
import UserForm from './Components/Client/UserForm/UserForm.jsx';
import Clients from './Components/admin/Clients.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'auth', element: <AuthPage /> },
      {
        path: 'client/:clientId', element:
          <ProtectedRoute>
            <ClientPage />
          </ProtectedRoute>,
        children: [
          { path: '', element: <Details userType={'client'} /> },
          {
            path: 'accounts', element:        
            <AccountDetails userType={'client'}/>
          },
          {
            path: 'accounts/:accountId', element:  <Accounts/>, children: [
              {path:'',element:<AccountDetails userType={'client'}/>},
              { path: 'transactions', element: <Transactions /> },
              {path:'transactions/new',element:<UserForm type={'transaction'}/>},
              { path: 'loans', element: <Loans /> },
              {path:'loans/new',element:<UserForm type={'loan'}/>},
              {path:'accounts/new',element:<UserForm type={'account'}/>}
            ]
          }
        ]
      },
      {
        path: 'employee/:employeeId', element:
          <ProtectedRoute>
            <EmployeePage />
          </ProtectedRoute>,
        children:[
          {path:'',element:<Details userType={'employee'}/>},
          {path:'clients',element:<Clients/>},
          {path:'clients/:clientId/accounts',element:<AccountDetails userType={'employee'}/>}
        ]
      }
    ]
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
