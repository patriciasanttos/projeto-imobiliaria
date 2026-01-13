import "./ScrollTop.scss"

import ScrollTopIcon from "../../assets/Icons/scroll-top.svg"

function ScrollTop() {
     const scrollToTop = () => {
       window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
     };

    return (
      <div className="scroll-container">
        <img src={ScrollTopIcon} alt="" onClick={scrollToTop} />
      </div>
    );
}

export default ScrollTop