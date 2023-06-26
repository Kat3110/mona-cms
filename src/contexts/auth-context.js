// import {
//   createContext,
//   useContext,
//   useEffect,
//   useReducer,
//   useRef
// } from "react";
// import PropTypes from "prop-types";
// import { auth, ENABLE_AUTH } from "../lib/auth";
//
// const HANDLERS = {
//   INITIALIZE: "INITIALIZE",
//   SIGN_IN: "SIGN_IN",
//   SIGN_OUT: "SIGN_OUT",
//   INITIALIZE_LOGIN_BY_PASS: "INITIALIZE_LOGIN_BY_PASS",
//   SIGN_IN_BY_PASS: "SIGN_IN_BY_PASS",
//   SIGN_OUT_BY_PASS: "SIGN_OUT_BY_PASS"
// };
//
// const initialState = {
//   isAuthenticated: false,
//   isLoading: true,
//   user: null,
//   token: ""
// };
//
// const handlers = {
//   [HANDLERS.INITIALIZE]: (state, action) => {
//     const user = action.payload;
//
//     return {
//       ...state,
//       ...// if payload (user) is provided, then is authenticated
//       (user
//         ? {
//             isAuthenticated: true,
//             isLoading: false,
//             user
//           }
//         : {
//             isLoading: false
//           })
//     };
//   },
//   [HANDLERS.SIGN_IN]: (state, action) => {
//     const user = action.payload;
//
//     return {
//       ...state,
//       isAuthenticated: true,
//       user
//     };
//   },
//   [HANDLERS.SIGN_OUT]: (state) => {
//     return {
//       ...state,
//       isAuthenticated: false,
//       user: null
//     };
//   },
//   [HANDLERS.INITIALIZE_LOGIN_BY_PASS]: (state, action) => {
//     const token = action.payload;
//
//     return {
//       ...state,
//       ...// if payload (user) is provided, then is authenticated
//       (token
//         ? {
//             isAuthenticated: true,
//             isLoading: false,
//             token
//           }
//         : {
//             isLoading: false
//           })
//     };
//   },
//   [HANDLERS.SIGN_IN_BY_PASS]: (state, action) => {
//     const token = action.payload;
//     console.log("token SIGN_IN_BY_PASS", token);
//     return {
//       ...state,
//       isAuthenticated: true,
//       token
//     };
//   },
//   [HANDLERS.SIGN_OUT_BY_PASS]: (state) => {
//     return {
//       ...state,
//       isAuthenticated: false,
//       user: null,
//       token: ""
//     };
//   }
// };
//
// const reducer = (state, action) =>
//   handlers[action.type] ? handlers[action.type](state, action) : state;
//
// // The role of this context is to propagate authentication state through the App tree.
//
// export const AuthContext = createContext({ undefined });
//
// export const AuthProvider = (props) => {
//   const { children } = props;
//   // const [state, dispatch] = useReducer(reducer, initialState);
//   const initialized = useRef(false);
//
//   // const initialize = async () => {
//   //   // Prevent from calling twice in development mode with React.StrictMode enabled
//   //   if (initialized.current) {
//   //     return;
//   //   }
//   //
//   //   initialized.current = true;
//   //
//   //   // Check if auth has been skipped
//   //   // From sign-in page we may have set "skip-auth" to "true"
//   //   const authSkipped =
//   //     globalThis.sessionStorage.getItem("skip-auth") === "true";
//   //
//   //   if (authSkipped) {
//   //     const user = {};
//   //
//   //     dispatch({
//   //       type: HANDLERS.INITIALIZE,
//   //       payload: user
//   //     });
//   //     return;
//   //   }
//   //
//   //   // Check if authentication with Zalter is enabled
//   //   // If not, then set user as authenticated
//   //   if (!ENABLE_AUTH) {
//   //     const user = {};
//   //
//   //     dispatch({
//   //       type: HANDLERS.INITIALIZE,
//   //       payload: user
//   //     });
//   //     return;
//   //   }
//   //
//   //   try {
//   //     // Check if user is authenticated
//   //     const isAuthenticated = await auth.isAuthenticated();
//   //
//   //     if (isAuthenticated) {
//   //       // Get user from your database
//   //       const user = {};
//   //
//   //       dispatch({
//   //         type: HANDLERS.INITIALIZE,
//   //         payload: user
//   //       });
//   //     } else {
//   //       dispatch({
//   //         type: HANDLERS.INITIALIZE
//   //       });
//   //     }
//   //   } catch (err) {
//   //     console.error(err);
//   //     dispatch({
//   //       type: HANDLERS.INITIALIZE
//   //     });
//   //   }
//   // };
//
//   // const initializeLoginByPass = async () => {
//   //   // Prevent from calling twice in development mode with React.StrictMode enabled
//   //   if (initialized.current) {
//   //     return;
//   //   }
//   //
//   //   initialized.current = true;
//   //
//   //   const token = localStorage.getItem("token");
//   //
//   //   if (token) {
//   //     dispatch({
//   //       type: HANDLERS.INITIALIZE_LOGIN_BY_PASS,
//   //       payload: token
//   //     });
//   //   } else {
//   //     dispatch({
//   //       type: HANDLERS.INITIALIZE_LOGIN_BY_PASS
//   //     });
//   //   }
//   // };
//
//   // useEffect(() => {
//   //   // initialize().catch(console.error);
//   //   initializeLoginByPass();
//   // }, []);
//
//   const signIn = (user) => {
//     dispatch({
//       type: HANDLERS.SIGN_IN,
//       payload: user
//     });
//   };
//
//   const signOut = () => {
//     dispatch({
//       type: HANDLERS.SIGN_OUT
//     });
//   };
//
//   const signInByPass = (token) => {
//     console.log("chạy signInByPass");
//     dispatch({
//       type: HANDLERS.SIGN_IN_BY_PASS,
//       payload: token
//     });
//   };
//
//   const signOutByPass = () => {
//     dispatch({
//       type: HANDLERS.SIGN_OUT_BY_PASS
//     });
//   };
//
//   return (
//     <AuthContext.Provider
//       // value={{
//       //   // ...state,
//       //   signIn,
//       //   signOut,
//       //   signInByPass,
//       //   signOutByPass
//       // }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
//
// AuthProvider.propTypes = {
//   children: PropTypes.node
// };
//
// export const AuthConsumer = AuthContext.Consumer;
//
// export const useAuthContext = () => useContext(AuthContext);
