import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {tryGetCatalogs, tryGetDocument} from "../../store/action/wikiActions";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import {Badge, Collapse, ListItemButton, styled} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

const Wiki = (props) => {
    const {document, catalogs, user, tryGetDocument, tryGetCatalogs} = props

    const [catalogCollapse, setCatalogCollapse] = useState([])

    useEffect(() => {
        tryGetCatalogs()
    }, [])


    useEffect(() => {
        if (catalogs) {
            console.log(catalogs)
            // tryGetDocument(catalogs[0].documents[0].id)
        }
    }, [catalogs])

    useEffect(() => {
        console.log(document)
    }, [document])

    const StyledBadge = styled(Badge)(({theme}) => ({
        '& .MuiBadge-badge': {
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const recursiveCatalog = (catalog, index, views = 0) => {
        if (!catalogs) {
            return <li/>
        }
        index++
        let list_cats = catalog.children.map((cat) => (
            recursiveCatalog(cat, index, views)
        ))
        let list_docs = catalog.documents.map((doc) => {
            if (!doc.views.find(acc => acc.username === user.username)) {
                views++
            }
            return <ListItem key={`item-${catalog.id}-${doc.id}`}>
                <ListItemButton onClick={() => {
                    tryGetDocument(doc.id)
                }}>
                    <ListItemText sx={{marginLeft: `${index * 7}px`}} primary={doc.name}/>
                </ListItemButton>
            </ListItem>
        })
        return <ul>
            <ListSubheader key={`section-${catalog.id}`}>
                <StyledBadge badgeContent={views} color="primary" anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}>
                    <ListItemButton onClick={() => {
                        if (catalogCollapse.includes(catalog.id)) {
                            catalogCollapse.splice(catalogCollapse.indexOf(catalog.id), 1)
                        } else {
                            catalogCollapse.push(catalog.id)
                        }
                        setCatalogCollapse([...catalogCollapse])
                    }}>
                        <ListItemText sx={{marginLeft: `${index * 5}px`}} primary={catalog.name}/>
                        {catalogCollapse.includes(catalog.id) ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                </StyledBadge>
            </ListSubheader>
            <Collapse in={catalogCollapse.includes(catalog.id)} timeout="auto" unmountOnExit>
                {list_cats}
                {list_docs}
            </Collapse>
        </ul>
    }

    if (!catalogs) {
        return <div/>
    }

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: '80vh',
                '& ul': {padding: 0},
            }}
            subheader={<li/>}
        >
            {catalogs.map((catalog) => {
                return recursiveCatalog(catalog, -1)
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

export default connect(mapStateToProps, mapDispatchToProps)(Wiki)


