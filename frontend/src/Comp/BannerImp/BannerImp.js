import React, { useEffect, useState } from 'react'
import { data } from '../data'
import { HiOutlineHome } from "react-icons/hi2";
import { FaCaretUp,FaCaretDown } from "react-icons/fa";

import './BannerImp.css'

function BannerImp() {
  return (
    <div>
        {/* <center >
            <div className='banner-imp-navbar'>
                <BannerNavBar/>
            </div>
        </center> */}
        <BannerImage/>
    </div>
  ) 
}

export default BannerImp


function BannerNavBar() {
    let [hover,setHover] = useState(false)

    return (
        <div style={{ display: "flex", justifyContent: "space-around" ,paddingTop:"10px"}}>
            <div 
            style={{margin:"5px",cursor:"pointer",display:"flex"}}
            onMouseEnter={()=>setHover(true)}
            onMouseLeave={()=>setHover(false)}
            >
                <label style={{
                    borderBottom: hover ? '3px solid #0057af' : '3px solid white',
                    color:hover ?"#0057af":'#454545',
                    cursor:"pointer"
                }}    >HOME</label>
            </div>
            {
                data.bannerData.header.map((item,idx)=><BannerNavBarDropDown data={item}/>)
            }
        </div>
    );
}


function BannerNavBarDropDown({ data }) {
    const [state, setState] = useState(false); 

    return (
        <div 
            onMouseEnter={() => setState(true)} 
            onMouseLeave={() => setState(false)} 
            style={{marginLeft:"60px",cursor: "pointer", margin: "5px" }}
        >
            <div 
                style={{
                    borderBottom: state ? '3px solid #0057af' : 'none',
                    color:state ?"#0057af":'#454545'
                }}
            >
                {data.type}
            </div>


            {state && (
                <div className="banner-imp-on-hover-content">
                    {data.categories.map((item, idx) => (
                        <div key={idx}  style={{margin:"15px"}}  >
                            <label  >{item.name}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function BannerImage() {
    const [count, setCount] = useState(0);
    let startX = 0; // Track the start position for both touch and mouse
    let endX = 0;

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prevCount => (prevCount === 2 ? 0 : prevCount + 1));
        }, 4000);
        
        return () => clearInterval(interval);
    }, []);

    // Handle touch events
    const handleTouchStart = (e) => {
        startX = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        endX = e.changedTouches[0].clientX;
        handleGesture();
    };

    // Handle mouse events
    const handleMouseDown = (e) => {
        startX = e.clientX;
    };

    const handleMouseUp = (e) => {
        endX = e.clientX;
        handleGesture();
    };

    // Determine gesture direction and change the count accordingly
    const handleGesture = () => {
        if (startX - endX > 50) {
            // Swiped or dragged left
            setCount((prevCount) => (prevCount === 2 ? 0 : prevCount + 1));
        }
        if (endX - startX > 50) {
            // Swiped or dragged right
            setCount((prevCount) => (prevCount === 0 ? 2 : prevCount - 1));
        }
    };

    return (
        <div 
            className='image-outside' 
            onTouchStart={handleTouchStart} 
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown} 
            onMouseUp={handleMouseUp}
        >
            <br /> 
            <center>
                <img 
                    src={data.bannerData.desktop[count].image} 
                    alt={`Image ${count}`} 
                    className='image-inner' 
                />
            </center>
        </div>
    );
}