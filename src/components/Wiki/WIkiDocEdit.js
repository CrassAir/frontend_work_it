import React, {useRef} from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import Paper from "@mui/material/Paper";
import {SEOptionsEdit} from "./utils";
import {trySaveBodyDocument} from "../../api/api";
import DocumentForm from "./DocumentForm";


const WIkiDocEdit = ({document}) => {

    const sunEditor = useRef()
    const getSunEditorInstance = (ref) => {
        sunEditor.current = ref;
    };
    let timer;

    if (!document) {
        return <div/>
    }

    return (
        <div className={'main_sun'}>
            <Paper sx={{marginRight: '10px', padding: '10px', height: '100%'}}>
                <DocumentForm data={{catalog: document.catalog, document: document, create: false}}/>
                {/*<Button style={{float: 'right', margin: '5px'}} variant={'contained'} color={'success'}*/}
                {/*>Опубликовать</Button>*/}
            </Paper>
            <Paper sx={{padding: '5px', width: '774px', height: '100%'}}>
                <SunEditor
                    onSave={() => trySaveBodyDocument(document.id, sunEditor.current.getContents())}
                    getSunEditorInstance={getSunEditorInstance}
                    // onClick={(e) => onClickComment(e, this.state.doc.comments)}
                    onInput={(e) => {
                        clearTimeout(timer)
                        timer = setTimeout(() => {
                            sunEditor.current.core.allCommandButtons.save.disabled = true
                            sunEditor.current.save()
                        }, 1000)
                    }}
                    setContents={document.tmp_body} setOptions={SEOptionsEdit}/>
            </Paper>
            <Paper sx={{marginLeft: '10px', padding: '10px', height: '100%'}}>
                comment
            </Paper>
        </div>
    )
}

export default WIkiDocEdit