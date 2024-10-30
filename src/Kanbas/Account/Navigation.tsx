import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  console.log(links)
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
      
    </div>
  );
}