import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
// @mui
import {
  Avatar,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
// routes
import useSettings from '../hooks/useSettings';
// _mock_
import { _userList } from '../_mock';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user/list';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const TABLE_HEAD = [{ id: 'name', label: 'Name', alignRight: false }, { id: '' }];

// ----------------------------------------------------------------------

export default function UserList() {
  const { themeStretch } = useSettings();

  const [userList, setUserList] = useState(_userList);
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteUser = (userId) => {
    const deleteUser = userList.filter((user) => user.id !== userId);
    setUserList(deleteUser);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(userList, filterName);

  const isNotFound = !filteredUsers.length && Boolean(filterName);

  const navigate = useNavigate();

  function handleUserView(id) {
    navigate(`/dashboard/users/${id}`);
  }

  return (
    <Page title="Users">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading={'Users'} links={[{ name: 'Dashboard', href: '/dashboard' }, { name: 'Users' }]} />
        <Card>
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={userList.length} />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, avatarUrl } = row;

                    return (
                      <TableRow onClick={() => handleUserView(id)} hover key={id} sx={{ cursor: 'pointer' }}>
                        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <UserMoreMenu onDelete={() => handleDeleteUser(id)} userName={name} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter(array, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => a[1] - b[1]);
  if (query) {
    return array.filter((_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
