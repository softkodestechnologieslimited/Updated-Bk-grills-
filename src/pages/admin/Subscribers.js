import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { AppStateContext } from "../../context";
import apiService from "../../context/apiService";
import { useToasts } from "react-toast-notifications";
import Fade from "react-reveal/Fade";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import FullScreenLoader from "components/fullScreenLoader";
import AllSubscribers from "../../components/Subscribers/AllSubscribers";

const Subscribers = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const { subscriptionService } = useContext(AppStateContext);
  const [subs, setSubs] = useState([]);
  const addToast = useToasts();

  const getSubs = async () => {
    try {
        setIsLoading(true);
      const response = await apiService.getSubscribers();
      const { data } = response;
      if (data.length !== 0) {
        subscriptionService.setSubscribers([...data])
      } else {
        console.log("no subs");
      }

      refreshSubs();
    } catch (error) {
      const message = apiService.getErrorMessage(error);
      addToast(message, {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshSubs = () => {
    setSubs(subscriptionService.subscribers);
  };

  useEffect(() => {
    if (subs.length) {
      refreshSubs();
      return;
    }
    getSubs();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <div className="relative px-4 md:px-10 mx-auto w-full h-90 md:pt-32 pt-12 md:mt-0 mt-24">
          <div className="px-4 mt-6 mb-12">
            <Fade left>
              <AllSubscribers mail={subs}></AllSubscribers>
            </Fade>
          </div>
        </div>
        <FooterAdmin />
      </div>
    </>
  );
});

export default Subscribers;
