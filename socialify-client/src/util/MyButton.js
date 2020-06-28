import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';


const WhiteOnBlueTooltip = withStyles({
    tooltip: {
        color: "white",
        backgroundColor: "#2196f3"
    }
})(Tooltip);

export default ({ children, onClick, tip, btnClassName, tipClassName }) => (
    <WhiteOnBlueTooltip title={tip} className={tipClassName}>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </WhiteOnBlueTooltip>
)
