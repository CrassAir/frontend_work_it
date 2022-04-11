import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {tryGetCatalogs, tryGetDocument} from "../../store/action/wikiActions";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Badge, Collapse, ListItemButton, styled} from "@mui/material";
import {CreateNewFolder, Folder, FolderOpen} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import CatalogForm from "./CatalogForm";
import {Modal} from "antd";


const WikiMenu = (props) => {
    const {document, catalogs, user} = props

    const [catalogCollapse, setCatalogCollapse] = useState(new Set([]))
    const [catalogModal, setCatalogModal] = useState(false)

    useEffect(() => {
        console.log(document)
        props.tryGetCatalogs()
    }, [document])

    useEffect(() => {
        if (catalogs) {
            console.log(catalogs)
            // в теории обновлять данные раз в минуту
            // let id = setInterval(tryGetCatalogs, 60 * 1000);
            // return () => clearInterval(id);
        }
    }, [catalogs])

    const StyledBadge = styled(Badge)(({theme}) => ({
        '& .MuiBadge-badge': {
            top: '50%',
            right: -20,
        },
    }));

    let topViews = 0; // Костыль !!!
    const recursiveCatalog = (catalog, index, views = 0) => {
        if (!catalogs) {
            return <li/>
        }

        index++
        if (index === 0) {
            topViews = 0
        }
        let open = catalogCollapse.has(catalog.id)
        let listCats = catalog.children.map((cat) => {
            let result;
            [views, result] = recursiveCatalog(cat, index)
            return result
        })

        let listDocs = catalog.documents.map((doc) => {
            let have = false
            if (!doc.views.find(acc => acc.username === user.username)) {
                views++
                topViews++
                have = true
            }
            return <ListItem sx={{pl: (index + 1) * 2}} key={`item-${catalog.id}-${doc.id}`} disablePadding>
                <ListItemButton onClick={() => {
                    props.tryGetDocument(doc.id)
                }}>
                    <ListItemText primary={doc.name}/>
                    {have ? <ListItemText sx={{position: 'absolute', right: 10}} secondary='новый'/> : null}
                    {/*<InsertDriveFileTwoTone color={have ? 'warning': 'inherit'} sx={{position: 'absolute', right: 0}} />*/}
                </ListItemButton>
            </ListItem>
        })

        let editButton = []
        let disabled = true
        if (catalog.access_edit.includes(user.username)) {
            disabled = false
            editButton.push(<IconButton key={`create_btn-${catalog.id}`} onClick={() => {
                let newCat = JSON.parse(JSON.stringify(catalog))
                delete newCat.name
                newCat['create'] = true
                catalogCollapse.add(catalog.id)
                setCatalogCollapse(new Set([...catalogCollapse]))
                setCatalogModal(newCat)
            }}>
                <CreateNewFolder/>
            </IconButton>)
        }
        editButton.push(<IconButton disabled={disabled} key={`view_btn-${catalog.id}`} edge="end" onClick={() => {
            setCatalogModal(catalog)
        }}>
            {open ? <FolderOpen color={'disabled'}/> : <Folder color={'disabled'}/>}
        </IconButton>)

        return [views, <div key={`catalog-${catalog.id}`}>
            <ListItem sx={{pl: index * 2}} disablePadding secondaryAction={editButton}>

                <ListItemButton onClick={() => {
                    if (open) {
                        catalogCollapse.delete(catalog.id)
                    } else {
                        catalogCollapse.add(catalog.id)
                    }
                    setCatalogCollapse(new Set([...catalogCollapse]))
                }}>
                    <StyledBadge badgeContent={index === 0 ? topViews : views} color={'primary'} anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}>
                        <ListItemText secondary={catalog.name}/>
                    </StyledBadge>
                </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List disablePadding key={`doc-${catalog.id}`}>
                    {listCats}
                    {listDocs}
                </List>
            </Collapse>
        </div>
        ]
    }


    const modal = () => {
        const title = catalogModal.create ? 'Создание' : 'Редактирование'

        const closeModal = () => {
            setCatalogModal(false)
        }

        return <Modal
            visible={!!catalogModal}
            title={title}
            footer={false}
            destroyOnClose
            onCancel={closeModal}
        >
            <CatalogForm close={closeModal} catalog={catalogModal}/>
        </Modal>
    }

    // Если данные не прилетели то вернуть заглушку( пока не сделано )
    if (!catalogs) {
        return <div/>
    }

    return (
        <div>
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    marginTop: '5px',
                    marginBottom: '5px',
                }}
                subheader={<li/>}
            >
                {catalogs.map((catalog) => {
                    let result;
                    [topViews, result] = recursiveCatalog(catalog, -1)
                    return result
                })}
            </List>
            {modal()}
        </div>
    )
}


const mapStateToProps = (state) => ({
    user: state.user,
    catalogs: state.catalogs,
    document: state.document,
})

const mapDispatchToProps = (dispatch) => ({
    tryGetCatalogs: () => dispatch(tryGetCatalogs()),
    tryGetDocument: (id) => dispatch(tryGetDocument(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WikiMenu)


