import { React, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select, Box, Button, Menu, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



const Dropdown = ({ items, labelName, labelId, onClickFunction }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const executionFunction = (name) => {
        setAnchorEl(null)
        onClickFunction(name)
    }
    console.log('items',items)
  return (
    <Box>
        <Button
            sx={{
                backgroundColor: 'white',
                color: 'dimgrey',
                fontWeight:'medium',
                fontSize: '16px',
                px: '0',
                textTransform: 'capitalize',
                '&:hover': {
                    backgroundColor: 'lightgrey'
                }
            }}
            id={labelId}
            aria-controls={anchorEl ? `${labelId}-menu` : undefined}
            aria-haspopup='true'
            aria-expanded={anchorEl ? 'true' : undefined}
            variant='contained'
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
        >
            {labelName}
        </Button>
        <Menu
            id={`${labelId}-menu`}
            MenuListProps={{
                'aria-labelledby': labelId
            }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: 1,
                    minWidth: 180,
                    boxShadow:
                      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                }
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
            {items.length ? items.map((item, i) => <MenuItem key={i} onClick={() => executionFunction(item)}>{item && item[0].toUpperCase() + item.slice(1)}</MenuItem>) : <MenuItem disabled>{'No Options'}</MenuItem>}
        </Menu>
    </Box>

    // <FormControl fullWidth>
    //     <InputLabel id={labelId}>{labelName}</InputLabel>
    //     <Select 
    //         labelId={labelId}
    //         value={value}
    //         label={labelName}
    //         onChange={handleChange}
    //     >
    //         {items.length ? items.map((item, i) => <MenuItem value={item}>{item[0].toUpperCase() + item.slice(1)}</MenuItem>) : 'No Sections'}
    //     </Select>
    // </FormControl>
  )
}

export default Dropdown