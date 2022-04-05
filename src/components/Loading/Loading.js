import {Spin} from "antd";
import React from "react";

const Loading = () => {
    return <div>
        <div className={"mask"}/>
        <div className={"loading"}><Spin tip="Loading..." size={"large"}/></div>
    </div>;
}

export default Loading