import React from "react";

import Page from "./component/page";
import HomePage from "./container/home";
// import IndexPage from "./container/index";
import SignIn from "./container/sign-in";
// import Logout from "./container/logout";
import PostCreate from "./container/post-create";
import PostItem from "./container/post-item";
// import PostList from "./container/post-list";
import Recovery from "./container/recovery";
import RecoveryConfirm from "./container/recovery-confirm";
import SignUp from "./container/signup";
import SignupConfirm from "./container/signup-confirm";

function App() {
  return (
    <div>
      <Page>
        <SignUp />
      </Page>
      <footer style={{ display: "grid", gap: "5px", margin: "15px" }}>
        <a href="http://localhost:3000/">3000/</a>
				<a href="http://localhost:3000/signin">3000/signin</a>
				<a href="http://localhost:3000/recovery">3000/recovery</a>
				<a href="http://localhost:3000/recovery-confirm">3000/recovery-confirm</a>
				<a href="http://localhost:3000/signup">3000/signup</a>
				
				
				
				<br/>

				<a href="http://localhost:3000/signup-confirm">3000/signup-confirm</a>
								

				<br/>
        
       
       
        <a href="http://localhost:3000/settings">3000/settings</a>
        <a href="http://localhost:3000/notification">3000/notification</a>
        <a href="http://localhost:3000/balance">3000/balance</a>
        <a href="http://localhost:3000/send">3000/send</a>
        <a href="http://localhost:3000/recive">3000/recive</a>
        <a href="http://localhost:3000/transaction">
          3000/transaction/:trainsactionId
        </a>
      </footer>
    </div>
  );
}

export default App;

// return (
//   <AuthContext.Provider value={authContextData}>
//     <BrowserRouter>
//       <Routes>
//         <Route
//           index
//           element={
//             <AuthRoute>
//               <WellcomePage />
//             </AuthRoute>
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             <AuthRoute>
//               <SignupPage />
//             </AuthRoute>
//           }
//         />
//         <Route
//           path="/signup-confirm"
//           element={
//             <PrivateRoute>
//               <SignupConfirmPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/signin"
//           element={
//             <AuthRoute>
//               <SigninPage />
//             </AuthRoute>
//           }
//         />
// 				        <Route
//           path="/recovery"
//           element={
//             <AuthRoute>
//               <RecoveryPage />
//             </AuthRoute>
//           }
//         />
//         <Route
//           path="/recovery-confirm"
//           element={
//             <AuthRoute>
//               <RecoveryConfirmPage />
//             </AuthRoute>
//           }
//         />
//         <Route
//           path="/balance"
//           element={
//             <PrivateRoute>
//               <BalancePage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/notifications"
//           element={
//             <PrivateRoute>
//               <NotificationsPage />
//             </PrivateRoute>
//           }
//         />
// 				        <Route
//           path="/settings"
//           element={
//             <PrivateRoute>
//               <SettingsPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/recive"
//           element={
//             <PrivateRoute>
//               <RecivePage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/send"
//           element={
//             <PrivateRoute>
//               <SendPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/transaction/:transactionId"
//           element={
//             <PrivateRoute>
//               <TransactionPage />
//             </PrivateRoute>
//           }
//         />
// 				        <Route path="*" Component={Error} />
//       </Routes>
//     </BrowserRouter>
//   </AuthContext.Provider>
// );
