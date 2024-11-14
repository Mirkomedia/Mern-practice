import React from 'react'

const ScrollUpButton = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top:0,
            behavior: 'smooth' //smooth scroll
        })
    }
    return (
        <button 
          onClick={scrollToTop} 
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 15px',
            fontSize: '16px',
            borderRadius: '5px',
            backgroundColor: 'hsl(207, 26%, 17%)',
            color: 'antiquewhite',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Scroll to Top
        </button>
      );
    };

export default ScrollUpButton