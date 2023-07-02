import * as React from 'react';
import { AppBar, Box, IconButton, List, ListItem, ListItemButton, ListItemText, SwipeableDrawer, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import user from '../types/user.type';
export default function MenuAppBar({ users, user, selectChat }) {
    const [state, setState] = React.useState(false);


    type Anchor = "left";

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState(open);
            };


    const list = (anchor: Anchor) => (
        <div
            style={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {users.map((u) => {
                    if (u.user != user.user && u.id != user.id) {
                        return <ListItem onClick={() => { selectChat(u) }} key={u.id + u.user}>
                            <ListItemButton>
                                <ListItemText primary={u.user} />
                            </ListItemButton>
                        </ListItem>;
                    }
                    return;

                }
                )}
            </List>

        </div>
    );


    return (
        <Box sx={{ flexGrow: 1 }}>

            <AppBar position="static">
                <Toolbar>
                    <React.Fragment key={'left'}>


                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer('left', true)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <SwipeableDrawer
                            anchor={'left'}
                            open={state}
                            onClose={toggleDrawer('left', false)}
                            onOpen={toggleDrawer('left', true)}
                        >
                            <h3 className='ps-4 mt-2 mb-0'>Chats</h3>
                            {list('left')}
                        </SwipeableDrawer>
                    </React.Fragment>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {user.user}
                    </Typography>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
