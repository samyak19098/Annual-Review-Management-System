import React from 'react';
import SplitPane from "react-split-pane";
import Split from 'react-split';
import Typography from "@material-ui/core/Typography";

function Test({ color }) {
    return <div style={{ height: 500, width: 500, background: color }} />;
}

function SplitScreenTrial(props) {
    return (
        // <Split direction="vertical" style={{ height: `calc(100vh - 4rem)` }}>
        <div style={{height:"800px"}}>
            <Split
                sizes={[25, 75]}
                direction="horizontal"
                cursor="col-resize"
                className="split-flex"
                style={{display: "flex", flexDirection: "row"}}// You'll need to define this. check styles.css
            >
                <Test color="red" />
                <Test color="green" />
            </Split>
        </div>
        // </Split>

    );
}

export default SplitScreenTrial;