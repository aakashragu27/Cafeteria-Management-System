import React from "react";

import "../App.css";

function Footer() {
  return (
    <div className="foot d-flex flex-column fixe-bottom ">
    <div
      className="text-center p-2 col-sm-12 col-lg-12 col-md-12"
      style={{
        fontFamily: "Comfortaa",
        backgroundColor: "#362e29",
        color: "white",
      }}
    >
      <h5>
        Made with <i className="fa-regular fa-heart "></i> by Aakash  
      </h5>
    </div>
      <div
        className="socialLinks text-center p-3"
        style={{
          backgroundColor: "#2b2521",
        }}
      >
        <div className=" d-flex justify-content-evenly">
          <a className="text-white" href="">
            <i className="fa-brands fa-facebook fa-2x "></i>
          </a>
          <a className="text-white" href="">
            <i className="fa-brands fa-instagram fa-2x"></i>
          </a>
          <a className="text-white" href="">
            <i className="fa-brands fa-twitter fa-2x"></i>
          </a>
          <a className="text-white" href="">
            <i className="fa-regular fa-envelope fa-2x"></i>
          </a>
          <a className="text-white" href="">
            <i className="fa-solid fa-phone fa-2x "></i>
          </a>
        </div>
      </div>
      <div
        className="p-5 col-sm-12 col-lg-12 col-md-12"
        style={{
          backgroundColor: "#221f1d",
          color: "white",
        }}
      >
        <div className=" downFoot d-flex justify-content-evenly ">
          <div className="foot-3 ">
            <h3 className="fs-5">
              Location : <br />
            </h3>
            <p
              style={{
                fontFamily: "sono",
              }}
            >
              <br></br> Kovai East Coast <br></br>2nd,Farmville street <br></br>{" "}
              KG Complex (opp) <br />
              Coimbatore 000-009
            </p>
          </div>
          <div>
            <img
              className="rounded-circle"
              src="https://res.cloudinary.com/dfsvudyfv/image/upload/v1701415924/WhatsApp_Image_2023-12-01_at_12.53.17_d0d6de96_jptya2.jpg"
              alt="shop-logo"
              style={{
                width: 150,
              }}
            />
          </div>
        </div>
        <div className="col-sm-12 col-lg-6 col-md-6-lg-6 container mt-3 border-info border-bottom">
        </div>
      </div>
    </div>
  
  );
}

export default Footer;
