import {FC, PropsWithChildren} from "react";

const Layout: FC<PropsWithChildren> = ({ children }) =>
  (
    <div className="w-full" style={{ width: "100vw"}}>
      {children}
    </div>
  );

export default Layout;
