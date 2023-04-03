import { makeStyles } from '@mui/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import UserService from '../services/user-service';
import { useEffect, useState } from 'react';

const useStyles = makeStyles({
    table: {
      minWidth: 200,
      maxWidth: 500,
      margin: 'auto',
    },
  });


interface User {
    name: string;
    score: number;
  }


const Score = () => {
  const classes = useStyles();
  const {t} = useTranslation(["pages"]);
  const userService = new UserService();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
        const data = await userService.getUsers();
        const updatedUsers = data.docs.map((doc) => ({name: doc.data().FirstName, score:doc.data().Points })) as User[];
        setUsers(updatedUsers);
    };

    getUsers();
  }, []);

  return (
<TableContainer sx={{paddingTop:"80px"}}>
      <Table className={classes.table} aria-label="user scores">
        <TableHead>
          <TableRow>
            <TableCell>{t('user')}</TableCell>
            <TableCell align="right">{t('score')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.name}>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Score;