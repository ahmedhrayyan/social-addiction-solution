import PropTypes from 'prop-types';
// @mui
import {Box, Checkbox, TableRow, TableCell, TableHead} from '@mui/material';

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
};

UserListHead.propTypes = {
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
};

export default function UserListHead({headLabel}) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
