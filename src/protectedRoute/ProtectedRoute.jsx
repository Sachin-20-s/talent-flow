import {Navigate} from "react-router-dom"
import CryptoJS from "crypto-js";

const ProtectedRoute = ({children}) => {
    const encryptedUser = localStorage.getItem("validUser");
    const secretKey = import.meta.env.VITE_SECRET_KEY;
if (encryptedUser) {
  const bytes = CryptoJS.AES.decrypt(encryptedUser, secretKey);
  const decryptedUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  if(decryptedUser.username!="Sachin_HR" || decryptedUser.password!="Sachin@123"){
    return <Navigate to="/login" replace />;
  }else{
    return children
  }
}
  return <Navigate to="/login" replace />;
}

export default ProtectedRoute