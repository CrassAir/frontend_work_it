import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {tryGetCatalogs, tryGetDocument} from "../../store/action/wikiActions";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Badge, Collapse, ListItemButton, styled} from "@mui/material";
import {Folder, FolderOpen} from "@mui/icons-material";


const WikiMenu = (props) => {
    const {document, catalogs, user} = props

    const [catalogCollapse, setCatalogCollapse] = useState([])

    // useEffect(() => {
    //     tryGetCatalogs()
    // }, [])

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
            left: -15,
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
        let open = catalogCollapse.includes(catalog.id)
        let list_cats = catalog.children.map((cat) => {
            let result;
            [views, result] = recursiveCatalog(cat, index)
            return result
        })

        let list_docs = catalog.documents.map((doc) => {
            let have = false
            if (!doc.views.find(acc => acc.username === user.username)) {
                views++
                topViews++
                have = true
            }
            return <ListItem key={`item-${catalog.id}-${doc.id}`} sx={{paddingBottom: 0, paddingTop: 0}}>
                <ListItemButton onClick={() => {
                    props.tryGetDocument(doc.id)
                }}>
                    <ListItemText sx={{marginLeft: `${index * 7}px`}} primary={doc.name}/>
                    {have ? <ListItemText sx={{position: 'absolute', right: 0}} secondary='новый'/> : null}
                    {/*<InsertDriveFileTwoTone color={have ? 'warning': 'inherit'} sx={{position: 'absolute', right: 0}} />*/}
                </ListItemButton>
            </ListItem>
        })

        return [views, <ul key={`catalog-${catalog.id}`}>
            <ListItemButton onClick={() => {
                if (open) {
                    catalogCollapse.splice(catalogCollapse.indexOf(catalog.id), 1)
                } else {
                    catalogCollapse.push(catalog.id)
                }
                setCatalogCollapse([...catalogCollapse])
            }}>
                <ListItemText sx={{marginLeft: `${index * 5}px`}} secondary={catalog.name}/>
                <StyledBadge badgeContent={index === 0 ? topViews : views} color={'primary'} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}>
                    {open ? <FolderOpen color={'disabled'}/> : <Folder color={'disabled'}/>}
                </StyledBadge>
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {list_cats}
                {list_docs}
            </Collapse>
        </ul>]
    }

    // Если данные не прилетели то вернуть заглушку( пока не сделано )
    if (!catalogs) {
        return <div/>
    }

    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                marginTop: '5px',
                marginBottom: '5px',
                // maxHeight: '80vh',
                '& ul': {padding: 0},
            }}
            subheader={<li/>}
        >
            {catalogs.map((catalog) => {
                let result;
                [topViews, result] = recursiveCatalog(catalog, -1)
                return result
            })}
        </List>
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


