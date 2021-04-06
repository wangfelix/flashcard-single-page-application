import './css/SideBar.css'
import React, {useState, useEffect} from 'react'
import {Divider} from './Divider'

export const SideBar = (props) => {


    return (
        <nav className="nav">

            <div className="logo">
                <a href={"/"}>
                    <svg id="logoSVG" width="441" height="101" viewBox="0 0 441 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M60.03 5.3V19.99H22.2V43.26H51.19V57.69H22.2V96.04H4V5.3H60.03Z" stroke="#F4B947" strokeWidth="7"/>
                        <path d="M105.436 81.61H135.336V96.04H87.2355V5.3H105.436V81.61Z" stroke="#F4B947" strokeWidth="7"/>
                        <path d="M216.844 78.75H180.704L174.724 96.04H155.614L188.244 5.16999H209.434L242.064 96.04H222.824L216.844 78.75ZM211.904 64.19L198.774 26.23L185.644 64.19H211.904Z" stroke="#F4B947" strokeWidth="7"/>
                        <path d="M299.89 96.95C293.563 96.95 287.843 95.8667 282.73 93.7C277.703 91.5333 273.717 88.4133 270.77 84.34C267.823 80.2667 266.307 75.4567 266.22 69.91H285.72C285.98 73.6367 287.28 76.5833 289.62 78.75C292.047 80.9167 295.34 82 299.5 82C303.747 82 307.083 81.0033 309.51 79.01C311.937 76.93 313.15 74.2433 313.15 70.95C313.15 68.2633 312.327 66.0533 310.68 64.32C309.033 62.5867 306.953 61.2433 304.44 60.29C302.013 59.25 298.633 58.1233 294.3 56.91C288.407 55.1767 283.597 53.4867 279.87 51.84C276.23 50.1067 273.067 47.55 270.38 44.17C267.78 40.7033 266.48 36.11 266.48 30.39C266.48 25.0167 267.823 20.3367 270.51 16.35C273.197 12.3633 276.967 9.33 281.82 7.25C286.673 5.08333 292.22 4 298.46 4C307.82 4 315.403 6.29666 321.21 10.89C327.103 15.3967 330.353 21.7233 330.96 29.87H310.94C310.767 26.75 309.423 24.1933 306.91 22.2C304.483 20.12 301.233 19.08 297.16 19.08C293.607 19.08 290.747 19.99 288.58 21.81C286.5 23.63 285.46 26.2733 285.46 29.74C285.46 32.1667 286.24 34.2033 287.8 35.85C289.447 37.41 291.44 38.71 293.78 39.75C296.207 40.7033 299.587 41.83 303.92 43.13C309.813 44.8633 314.623 46.5967 318.35 48.33C322.077 50.0633 325.283 52.6633 327.97 56.13C330.657 59.5967 332 64.1467 332 69.78C332 74.6333 330.744 79.14 328.23 83.3C325.717 87.46 322.033 90.7967 317.18 93.31C312.327 95.7367 306.563 96.95 299.89 96.95Z" stroke="#F4B947" strokeWidth="7"/>
                        <path d="M437.349 5.3V96.04H419.149V57.43H380.279V96.04H362.079V5.3H380.279V42.61H419.149V5.3H437.349Z" stroke="#F4B947" strokeWidth="7"/>
                    </svg>
                </a>
            </div>


            <ul className={"nav-links"}>

                <div className={"divider"}/>

                <div className={"nav-ui-li-border-div"}>
                    <li className={"li"}>
                        <a href={'/'}>Dashboard</a>
                    </li>
                </div>

                <div className={"nav-ui-li-border-div"}>
                    <li className={"li"}>
                        <a href={'/explore'}>Explore</a>
                    </li>
                </div>


                {/* Container-div, that includes all the Dividers */}
                <div className={"allSectionsContainer"}>
                    {props.dividers.map(divider => (
                        <Divider key={divider._id} _id={divider._id} stacks={divider.stacks} sectionContainerName={divider.sectionContainerName} />
                    ))}
                </div>


                {/* Divider and Spacer at the bottom of the Navbar. Class li so that it also has a height of 20px */}
                <div className={"navBarBottomDivider"}/>
                <div>
                    <li className={"li"}/>
                </div>

            </ul>
        </nav >
    );
}

// - TODO Replace href routing with state
// - TODO ul elements: li should wrap div, not other way around