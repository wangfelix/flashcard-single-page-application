import './css/ToolBar.css'
import React, {useState} from 'react'
import {PopUpPlsBtn} from "./PopUpPlsBtn";

export const ToolBar = (props) => {

    const [popUpPlsBtnState, setPopUpPlsBtnState] = useState('closed')

    console.log("passed value " + props.movingUp)

    return (
        <div className="header" id="header" movingup={props.movingUp}>

            <div className="toolbar">

                <PopUpPlsBtn
                    popUpPlsBtnState={popUpPlsBtnState}
                    setPopUpPlsBtnState={setPopUpPlsBtnState}
                    dividers={props.dividers}
                    updateDividers={props.updateDividers}
                />

                <button className="progressBtn">
                    <svg width="426" height="353" viewBox="0 0 426 353" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M0 29C0 12.9837 12.9837 0 29 0H184C200.016 0 213 12.9837 213 29V73C213 89.0163 200.016 102 184 102H29C12.9837 102 0 89.0163 0 73V29ZM0 155C0 138.984 12.9837 126 29 126H397C413.016 126 426 138.984 426 155V198C426 214.016 413.016 227 397 227H29C12.9837 227 0 214.016 0 198V155ZM29 251C12.9837 251 0 263.984 0 280V324C0 340.016 12.9837 353 29 353H312C328.016 353 341 340.016 341 324V280C341 263.984 328.016 251 312 251H29Z"
                              fill="url(#paint0_linear)"/>
                        <defs>
                            <linearGradient id="paint0_linear" x1="0" y1="0" x2="426" y2="353"
                                            gradientUnits="userSpaceOnUse">
                                <stop stop-color="#595C61"/>
                                <stop offset="1" stop-color="#A4A6A9"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </button>

                <button className="settingsBtn"
/*                        onClick={
                        document.getElementById('id01').style.display='block';
                        document.querySelector('.dimBackgroundForModals').style.display='block';
                        document.querySelector('.dimBackgroundForModals').style.animation='blurBackground 0.4s ease forwards';
                        document.querySelector('.settings-modal').style.animation='settings-modal-slide-in 0.2s ease forwards'
                    }*/
                >
                    <svg width="468" height="468" viewBox="0 0 468 468" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M276 46.6077V24C276 10.7452 265.255 0 252 0H216C202.745 0 192 10.7452 192 24V46.6077C172.771 50.8987 154.629 58.0739 138.053 67.6557L119.368 48.9706C109.995 39.598 94.7991 39.598 85.4265 48.9706L59.9706 74.4264C50.5981 83.799 50.5981 98.995 59.9706 108.368L76.1987 124.596C62.2882 144.622 52.0921 167.422 46.6077 192H24C10.7452 192 0 202.745 0 216V252C0 265.255 10.7452 276 24 276H46.6077C51.5298 298.058 60.2469 318.684 72.038 337.158L59.9706 349.225C50.598 358.598 50.598 373.794 59.9706 383.167L85.4264 408.622C94.799 417.995 109.995 417.995 119.368 408.622L131.567 396.423C149.855 407.98 170.231 416.535 192 421.392V444C192 457.255 202.745 468 216 468H252C265.255 468 276 457.255 276 444V421.392C300.336 415.962 322.93 405.912 342.813 392.21L359.225 408.622C368.598 417.995 383.794 417.995 393.166 408.622L418.622 383.167C427.995 373.794 427.995 358.598 418.622 349.225L399.977 330.58C409.743 313.833 417.047 295.474 421.392 276H444C457.255 276 468 265.255 468 252V216C468 202.745 457.255 192 444 192H421.392C416.48 169.988 407.789 149.401 396.034 130.956L408.622 118.368C417.995 108.995 417.995 93.799 408.622 84.4264L383.167 58.9706C373.794 49.598 358.598 49.598 349.225 58.9706L336.547 71.6494C318.229 60.0553 297.815 51.4756 276 46.6077ZM303 234C303 272.108 272.108 303 234 303C195.892 303 165 272.108 165 234C165 195.892 195.892 165 234 165C272.108 165 303 195.892 303 234Z"
                              fill="url(#paint0_linear)"/>
                        <defs>
                            <linearGradient id="paint0_linear" x1="397.669" y1="70.9888" x2="95.9663" y2="411.472"
                                            gradientUnits="userSpaceOnUse">
                                <stop stop-color="#89909C"/>
                                <stop offset="1" stop-color="#595C61"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </button>

            </div>

            <p className="title-text" id="titleText" movingup={ props.movingUp }>{ props.title }</p>
            <div className="header-divider"/>

        </div>
    )
}