import "./FloatingButtons.css";

function FloatingButtons() {

  const scrollTop = () => {

    window.scrollTo({

      top:0,

      behavior:"smooth"

    });

  };

  return (

    <>

      <a

      href="https://wa.me/919876543210"

      target="_blank"

      rel="noreferrer"

      className="whatsapp"

      >

      💬

      </a>

      <a

      href="tel:+919876543210"

      className="call"

      >

      📞

      </a>

      <button

      className="top"

      onClick={scrollTop}

      >

      ↑

      </button>

    </>

  );

}

export default FloatingButtons;
