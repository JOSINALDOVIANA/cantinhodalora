

import { IconButton } from '@mui/material';
import React from 'react';
import { ColorModeContext } from '../../routs'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@emotion/react';


function ButtonThemeComponent() {
   
    const theme = useTheme();
  return (
    <IconButton   color="inherit">
    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
  </IconButton>
  );
}

export default ButtonThemeComponent;