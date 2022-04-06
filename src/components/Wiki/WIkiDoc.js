import React from 'react';
import {connect} from 'react-redux';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import lang from "suneditor/src/lang";
import Paper from "@mui/material/Paper";

export const SEOptionsView = {
    "mode": "classic",
    "pasteTagsWhitelist": "p",
    "minHeight": "80vh",
    "attributesWhitelist": {
        "all": "style",
        "p": "style|text-align",
    },
    "defaultStyle": "font-size: 16px;color:#525c69;background:#fafafa;",
    "lang": lang.ru,
    "resizingBar": false,
    "showPathLabel": false,
    // "defaultStyle": "font-size: 14px;",
    "buttonList": [
        [
            "fullScreen",
            "print",
        ]
    ],
}

const WIkiDoc = (props) => {

    const {document} = props

    // if (!document) {
    //     return <div/>
    // }

    return (
        <div className={'main_sun'}>
            <Paper sx={{padding: '5px', width: '816px', height: '100%'}}>
                <SunEditor
                    // onClick={(e) => onClickComment(e, this.state.doc.comments)}
                    // onInput={(e) => {
                    //     clearTimeout(timer)
                    //     timer = setTimeout(() => {
                    //         this.state.refSunEditor.editor.setContents(this.state.doc.html_body)
                    //         message.error("Ввод данных запрещен, можно оставить коментарий!")
                    //     }, 300)
                    // }}
                    setContents={'document.tmp_body'} setOptions={SEOptionsView}/>
            </Paper>
        </div>
    )
}

const mapStateToProps = (state) => ({
    document: state.document
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(WIkiDoc)