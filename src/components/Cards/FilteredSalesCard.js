import React from "react";
// import Fade from "react-reveal/Fade";

import "./filteredsalescard.styles.scss";

const FilteredSalesCard = ({ closeModal }) => {
  return (
    <>
      {/* <Fade> */}
        <div onClick={closeModal} className="body">
          Working
        </div>
      {/* </Fade> */}
    </>
  );
};

export default FilteredSalesCard;
