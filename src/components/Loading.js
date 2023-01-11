import * as React from 'react';
import { Box, LinearProgress, Typography } from '@material-ui/core';


export default function Loading(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1, minWidth: '70vw' }}>
                <LinearProgress variant="determinate" value={props.value} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" style={{ color: "white" }}>{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}
