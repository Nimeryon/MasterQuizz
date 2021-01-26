import React, { Component } from "react";
// Material-ui
import { IconButton, AppBar, Toolbar } from "@material-ui/core";
import { MenuRounded } from "@material-ui/icons";

class Navigation extends Component {
    render() {
        return <AppBar position="static">
            <Toolbar className={this.props.classes.root}>
                <IconButton
                    color="inherit"
                    onClick={() => this.props.toggleOpenMenu(true)}>
                    <MenuRounded />
                </IconButton>
                <IconButton
                    color="inherit"
                    onClick={() => this.props.setTheme(!this.props.theme)}
                >
                    {this.props.icon}
                </IconButton>
            </Toolbar>
        </AppBar>
    }
}

export default Navigation;