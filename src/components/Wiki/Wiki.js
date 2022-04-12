import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Splitter, {SplitDirection} from "@devbookhq/splitter";
import Paper from "@mui/material/Paper";
import SimpleBar from "simplebar-react";
import WikiMenu from "./WikiMenu";
import WIkiDoc from "./WIkiDoc";
import Fade from 'react-reveal/Fade';
import {tryUnmountDocument} from "../../store/action/wikiActions";
import {createTheme, ThemeProvider} from "@mui/material";

const Wiki = ({animDoc, tryUnmountDocument}) => {
    const [initSplitter] = useState([20, 80])

    useEffect(() => {
        return tryUnmountDocument
    }, [])

    const theme = createTheme({
            components: {
                MuiListItemButton: {
                    styleOverrides: {
                        root: {
                            "&.Mui-selected": {
                                "background": "rgba(25,118,210, 0.3)"
                            },
                            "&.Mui-selected:hover": {
                                "background": "rgba(25,118,210, 0.4)"
                            }
                        },
                    }
                }
            }
        }
    );

    return (
        <div className={'main_tabel'}>
            <ThemeProvider theme={theme}>
                <Splitter direction={SplitDirection.Horizontal}
                          gutterClassName="custom-gutter-horizontal"
                          draggerClassName="custom-dragger-horizontal"
                          initialSizes={initSplitter}
                          minWidths={[370, 816]}
                >
                    <Fade left>
                        <div style={{height: '100%'}}>
                            <Paper className={'paper'}>
                                <SimpleBar style={{maxHeight: '100%'}}>
                                    <WikiMenu/>
                                </SimpleBar>
                            </Paper>
                        </div>
                    </Fade>
                    <Fade top opposite collapse big when={animDoc}>
                        <WIkiDoc/>
                    </Fade>
                </Splitter>
            </ThemeProvider>
        </div>
    )
}

const mapStateToProps = (state) => ({
    animDoc: state.animDoc,
})

const mapDispatchToProps = (dispatch) => ({
    tryUnmountDocument: () => dispatch(tryUnmountDocument())
})

export default connect(mapStateToProps, mapDispatchToProps)(Wiki)