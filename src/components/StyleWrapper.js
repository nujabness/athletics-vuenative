import { StyleProvider } from "native-base";
import React, { Component } from "react";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";

export class StyleWrapper extends Component {
    render() {
        return (
            <StyleProvider style={getTheme(commonColor)}>
                {this.props.children}
            </StyleProvider>
        )
    }
}