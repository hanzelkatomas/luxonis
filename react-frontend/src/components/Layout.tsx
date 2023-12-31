import {FC, PropsWithChildren} from "react";

const Layout: FC<PropsWithChildren> = ({ children }) =>
  (
    <div className="w-full my-20 mx-30" style={{ width: "100vw"}}>
      {children}
    </div>
  );

export default Layout;
