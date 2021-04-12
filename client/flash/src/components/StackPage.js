import React from 'react'
import {useParams, useRouteMatch} from "react-router-dom";

export const StackPage = (props) => {
    const params = useParams()
    const match = useRouteMatch()
    console.log(match)
    return (
        <div className={"content"}>{params.divider}/{params.stack}, {match.url}</div>
    )
}