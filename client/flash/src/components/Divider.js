import React from 'react'
import './css/Divider.css'

export const Divider  = (props) => {
    return (
        <div
            className={"singleSectionContainer"}
            id={props._id}
            content-loaded={props.contentLoaded}
        >

            <div className={"dividerWithText"}>
                <p className={"dividerText"}> {props.sectionContainerName} </p>
            </div>


            <div className={"navSetsContainer"} data-divider-id={props._id}>

                {props.stacks.map(stack => (
                    <div className={"nav-ui-li-border-div"} key={stack._id}>
                        <li className={"li"}>
                            <a className={"setNavLink"} href={"/stacks/" + props.sectionContainerName + ":" + stack.stackName}>
                                {stack.stackName}
                            </a>
                        </li>
                    </div>
                ))}

            </div>
        </div>
    )
}