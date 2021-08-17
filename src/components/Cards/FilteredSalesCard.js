import React from "react";
// import Fade from "react-reveal/Fade";

import "./filteredsalescard.styles.scss";

const FilteredSalesCard = ({
  closeModal,
  pendingSales,
  cashSales,
  posSales,
  transferSales,
}) => {
  return (
    <>
      {/* <Fade> */}
      <div  className="body">
        <span>
          <h1>SALES REPORT</h1>
          <p onClick={closeModal}>close</p>
        </span>

        <div className="body-flex">
          <div>
            <h2>Pending Sales</h2>
            {pendingSales.map((sales, idx) => (
              <div key={idx}>
                <p>{sales.items}</p>
                <p>{sales.prices}</p>
              </div>
            ))}
          </div>

          <div>
            <h2>Cash Sales</h2>
            {cashSales.map((sales, idx) => (
              <div key={idx}> {sales.items}</div>
            ))}
          </div>

          <div>
            <h2>POS Sales</h2>
            {posSales.map((sales, idx) => (
              <div key={idx}>{sales.items}</div>
            ))}
          </div>

          <div>
            <h2>Transfer Sales</h2>
            {transferSales.map((sales, idx) => (
              <div key={idx}>{sales.items}</div>
            ))}
          </div>
        </div>
      </div>
      {/* </Fade> */}
    </>
  );
};

export default FilteredSalesCard;
