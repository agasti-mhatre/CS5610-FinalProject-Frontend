import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  const location = useLocation();
  const pathname = location.pathname;
  
  const active = (path: string) => (pathname.includes(path) ? "active" : "");

  return (
    <div id="wd-account-navigation">

      {
        links.map(
          (link) =>
          (
            <>
              <Link to={`/Kanbas/Account/${link}`} className="list-group-item active border border-0 me-3"> 
                { link } 
              </Link> 
              <br/>
            </>
          )
        )
      }
      {currentUser && currentUser.role === "ADMIN" && (
        <Link to={`/Kanbas/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link> )}
    </div>
  );
}