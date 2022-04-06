import React, {useState} from 'react';
import {connect} from 'react-redux';
import Splitter, {SplitDirection} from "@devbookhq/splitter";
import Paper from "@mui/material/Paper";
import SimpleBar from "simplebar-react";
import WikiMenu from "./WikiMenu";
import WIkiDoc from "./WIkiDoc";

const Wiki = (props) => {
    const [initSplitter] = useState([20, 80])
    return (
        <div className={'main_tabel'}>
            <Splitter direction={SplitDirection.Horizontal}
                      gutterClassName="custom-gutter-horizontal"
                      draggerClassName="custom-dragger-horizontal"
                      initialSizes={initSplitter}
                      // minWidths={[300, 500]}
            >
                <Paper className={'paper'}>
                    <SimpleBar style={{maxHeight: '100%'}}>
                        <WikiMenu/>
                    </SimpleBar>
                </Paper>
                <WIkiDoc />
            </Splitter>
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Wiki)