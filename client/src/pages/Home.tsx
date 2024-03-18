import clsx from 'clsx';
import React from 'react';
import DataTable from 'react-data-table-component';
import { LuRefreshCw } from 'react-icons/lu';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import Card from '../components/Card';
import Content from '../components/Content';
import SideBar from '../components/SideBar';
import SubTitle from '../components/SubTitle';
import Title from '../components/Title';
import { Users } from '../global/props';
import { SERVER_HOST, SERVER_PORT, SERVER_PROTOCOL, hoverClassName } from '../global/utils';

const cellStyle = { fontFamily: 'poppins', fontSize: '12px' };
const columns = [
  {
    name: <SubTitle title='ID' />,
    selector: (r: Users) => String(r.id),
    sortable: true,
    grow: 2,
    reorder: true,
    style: cellStyle,
  },
  {
    name: <SubTitle title='E-mail' />,
    selector: (r: Users) => r.email,
    sortable: true,
    grow: 2,
    reorder: true,
    style: cellStyle,
  },
  {
    name: <SubTitle title='Nome' />,
    selector: (r: Users) => r.name,
    sortable: true,
    grow: 2,
    reorder: true,
    style: cellStyle,
  },
  {
    name: <SubTitle title='Telefone' />,
    selector: (r: Users) => r.phone,
    sortable: true,
    grow: 2,
    reorder: true,
    style: cellStyle,
  },
];

export function Home() {
  const [users, setUsers] = React.useState<Users[]>([]);

  React.useEffect(() => {
    listUsers();
  }, []);

  function listUsers() {
    const USERNAME = localStorage.getItem('username');
    const PASSWORD = localStorage.getItem('password');

    fetch(`${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/users`, {
      method: 'POST',
      headers: { Authorization: 'Basic ' + btoa(USERNAME + ':' + PASSWORD) },
    })
      .then(response => response.json())
      .then((data: Users[]) => setUsers(data))
      .catch(() => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        window.location.href = '/';
      });
  }

  return (
    <div className='flex'>
      <SideBar pageSelected='home' />
      <Content>
        <div className='w-full h-screen mt-24'>
          <Title title='Olá, selecione o que gostaria de fazer' className='pb-6' />
          <SubTitle title='Clique no card para acessá-lo' className='pb-6' />
          <Card url='/register' title='+ Novo cadastro' />
          {users.length > 0 && (
            <div>
              <div className='flex justify-between items-center'>
                <Title title='Usuários cadastrados' className='pt-6 pb-6' />
                <LuRefreshCw onClick={listUsers} className={clsx('text-primary-450 text-2xl', hoverClassName)} />
              </div>
              <DataTable
                pagination
                columns={columns}
                data={users}
                selectableRowsComponentProps={{ indeterminate: (isIndeterminate: boolean) => isIndeterminate }}
                sortIcon={<MdOutlineArrowDropDown />}
              />
            </div>
          )}
        </div>
      </Content>
    </div>
  );
}

export default Home;
