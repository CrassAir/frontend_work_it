import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import Paper from "@mui/material/Paper";
import {SEOptionsView} from "./utils";
import {Drawer} from "antd";
import WIkiDocEdit from "./WIkiDocEdit";
import IconButton from "@mui/material/IconButton";
import {Edit} from "@mui/icons-material";
import {Tooltip, Typography} from "@mui/material";
import {tryGetDocument} from "../../store/action/wikiActions";


const WIkiDoc = ({document, user, tryGetDocument}) => {
    const [visible, setVisible] = useState(false)

    const sunEditor = useRef()
    const getSunEditorInstance = (ref) => {
        sunEditor.current = ref;
        sunEditor.current.disabled()
        sunEditor.current.toolbar.enable()
        console.log(sunEditor.current.toolbar)
    };

    if (!document) {
        return <div/>
    }

    const drawer = () => {
        return <Drawer
            title={document.name}
            placement={'bottom'}
            height={'100vh'}
            onClose={() => {
                setVisible(false)
                tryGetDocument(document.id)
            }}
            visible={visible}
            destroyOnClose
            bodyStyle={{background: "#d3d3d3"}}
        >
            <WIkiDocEdit document={document}/>
        </Drawer>
    }

    const editorBuild = () => {
        if (document.access_edit.includes(user.username)) {
            return <Tooltip title="Редактировать документ" placement={'bottom'} arrow>
                <IconButton className={'edit_doc_btn'} onClick={() => setVisible(true)}><Edit/></IconButton>
            </Tooltip>
        }
    }

    return (<div className={'main_sun doc_read'}>
        <Paper sx={{padding: '5px', width: '774px', height: '100%', position: 'relative'}}>
            <Typography className={'title_doc'} variant="h5" gutterBottom>
                {document.name}
            </Typography>
            <SunEditor
                getSunEditorInstance={getSunEditorInstance}
                // onClick={(e) => onClickComment(e, this.state.doc.comments)}
                setContents={document.tmp_body} setOptions={SEOptionsView}/>
            {editorBuild()}
        </Paper>
        {drawer()}
    </div>)
}

const mapStateToProps = (state) => ({
    document: state.document, user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
    tryGetDocument: (id) => dispatch(tryGetDocument(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WIkiDoc)