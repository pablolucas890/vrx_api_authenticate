import clsx from 'clsx';
import React from 'react';
import DataTable from 'react-data-table-component';
import { MdDelete, MdEdit, MdOutlineArrowDropDown } from 'react-icons/md';
import Content from '../components/Content';
import Input from '../components/Input';
import SideBar from '../components/SideBar';
import SubTitle from '../components/SubTitle';
import Title from '../components/Title';
import { Users } from '../global/props';
import { SERVER_HOST, SERVER_PORT, SERVER_PROTOCOL, hoverClassName } from '../global/utils';

function ListUsers() {
  const [users, setUsers] = React.useState<Users[]>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<Users[]>([]);

  const USERNAME = localStorage.getItem('username');
  const PASSWORD = localStorage.getItem('password');

  const cellStyle = { fontFamily: 'poppins', fontSize: '12px' };
  const columns = [
    {
      name: <SubTitle title='Nome' />,
      selector: (r: Users) => r.name,
      sortable: true,
      grow: 4,
      reorder: true,
      style: cellStyle,
    },
    {
      name: <SubTitle title='E-mail' />,
      selector: (r: Users) => r.email,
      sortable: true,
      grow: 4,
      reorder: true,
      style: cellStyle,
    },
    {
      name: <SubTitle title='Telefone' />,
      selector: (r: Users) => r.phone,
      sortable: true,
      grow: 4,
      reorder: true,
      style: cellStyle,
    },
    {
      name: <SubTitle title='Deletar' />,
      selector: (r: Users) => r.id!,
      sortable: false,
      grow: 1,
      reorder: false,
      cell: (row: Users) => (
        <MdDelete
          onClick={() => handleDelete(row.id)}
          className={clsx('cursor-pointer text-2xl text-primary-450', hoverClassName)}
        />
      ),
    },
    {
      name: <SubTitle title='Editar' />,
      selector: (r: Users) => r.id!,
      sortable: false,
      grow: 1,
      reorder: false,
      style: cellStyle,
      cell: (row: Users) => (
        <MdEdit
          onClick={() => handleEdit(row.id)}
          className={clsx('cursor-pointer text-2xl text-primary-450', hoverClassName)}
        />
      ),
    },
  ];

  React.useEffect(() => {
    fetch(`${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/users`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(USERNAME + ':' + PASSWORD),
      },
    })
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch(() => {
        alert('Erro ao conectar com o servidor');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        window.location.href = '/';
      });
  }, []);

  function handleDelete(id?: number) {
    const response = confirm('Deseja realmente deletar este usuário?');
    if (!response) return;
    fetch(`${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/user/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Basic ' + btoa(USERNAME + ':' + PASSWORD),
      },
    })
      .then(response => response.json())
      .then((data: Users[]) => {
        alert('Usuário deletado com sucesso');
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch(() => {
        alert('Erro ao conectar com o servidor');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        window.location.href = '/';
      });
  }

  function handleEdit(id?: number) {
    window.location.href = `/edit/${id}`;
  }

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toLowerCase();
    if (!value) return setFilteredUsers(users);
    const filtered = users.filter(
      user =>
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.phone.toLowerCase().includes(value),
    );
    setFilteredUsers(filtered);
  }

  return (
    <div className='flex'>
      <SideBar />
      <Content>
        <div className='w-full h-screen'>
          <Title title='Usuários cadastrados' className='mb-4' />
          <SubTitle title='Veja abaixo a lista de usuários cadastrados' className='mb-4' />
          <Input placeholder='Buscar' className='bg-white mb-4 float-end rounded-3xl' onChange={e => handleFilter(e)} />
          <DataTable
            pagination
            columns={columns}
            data={filteredUsers}
            selectableRowsComponentProps={{ indeterminate: (isIndeterminate: boolean) => isIndeterminate }}
            sortIcon={<MdOutlineArrowDropDown />}
          />
        </div>
      </Content>
    </div>
  );
}

export default ListUsers;
