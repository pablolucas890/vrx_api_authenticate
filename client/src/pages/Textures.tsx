import React from 'react';
import { MdDelete } from 'react-icons/md';
import Button from '../components/Button';
import Content from '../components/Content';
import Input from '../components/Input';
import SideBar from '../components/SideBar';
import SubTitle from '../components/SubTitle';
import { SERVER_HOST, SERVER_PORT, SERVER_PROTOCOL } from '../global/utils';

function Textures() {
  const [materials, setMaterials] = React.useState<string[]>([]);
  const [filteredMaterials, setFilteredMaterials] = React.useState<string[]>([]);

  const USERNAME = localStorage.getItem('username');
  const PASSWORD = localStorage.getItem('password');

  React.useEffect(() => {
    fetchTextures();
  }, []);

  function fetchTextures() {

    fetch(`${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/materials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: USERNAME, password: PASSWORD }),
    })
      .then(response => response.json())
      .then(data => {
        if(data.materials){
          setMaterials(data.materials);
          setFilteredMaterials(data.materials);
        }
        else alert('Erro ao conectar com o servidor');
      })
      .catch(() => {
        alert('Erro ao conectar com o servidor');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        window.location.href = '/';
      });
  }
  function handleUpload() {
    const file = document.getElementById('file') as HTMLInputElement;
    file.click();
  }

  async function handleSaveTexture(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return console.error('Arquivo não encontrado');

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    fetch(`${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/upload_texture`, {
      method: 'POST',
      headers: { Authorization: 'Basic ' + btoa(USERNAME + ':' + PASSWORD) },
      body: formData,
    })
      .then(async res => {
        if (res.status === 200) return await res.json();
        else return false;
      })
      .then(res => (res ? alert('Textura adicionada com sucesso') : alert('Erro ao adicionar textura')))
      .then(() => fetchTextures())
      .catch(err => console.error(err));
    fetchTextures();
  }

  async function handleDeleteTexture(material: string) {
    fetch(`${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/delete_texture`, {
      method: 'POST',
      headers: { Authorization: 'Basic ' + btoa(USERNAME + ':' + PASSWORD) },
      body: JSON.stringify({ material }),
    })
      .then(async res => {
        if (res.status === 200) return await res.json();
        else return false;
      })
      .then(res => (res ? alert('Textura deletada com sucesso') : alert('Erro ao deletar textura')))
      .then(() => fetchTextures())
      .catch(err => console.error(err));
  }

  async function handleFilterMaterials(e: React.ChangeEvent<HTMLInputElement>) {
    const filter = e.target.value;
    if (filter === '') return setFilteredMaterials(materials);

    const filtered = materials.filter(material => material.toLowerCase().includes(filter.toLowerCase()));

    setFilteredMaterials(filtered);
  }

  return (
    <div className='flex'>
      <SideBar pageSelected='textures' />
      <Content className='flex flex-col items-center'>
        <div className='flex justify-center gap-4'>
          <Button title='Adicionar Textura' active onClick={handleUpload} className='mb-4' />
          <Input type='text' placeholder='Pesquisar...' className='mb-4 border-primary-900 border-2' onChange={handleFilterMaterials} />
        </div>
        <input type='file' id='file' accept='.png' style={{ display: 'none' }} onChange={handleSaveTexture} />
        <div className='grid grid-cols-4 gap-4 h-screen overflow-y-auto border border-gray-300'>
          {filteredMaterials.map(material => (
            <div key={material}>
              <img src={SERVER_PROTOCOL + '://' + SERVER_HOST + ':' + SERVER_PORT + '/download/' + material} alt={material} className='w-60 h-60 border border-gray-300' />
              <div className='flex justify-center gap-4'>
                <SubTitle title={material} className='text-center mt-2' />
                <MdDelete className='text-red-500 text-3xl cursor-pointer' onClick={() => handleDeleteTexture(material)} />
              </div>
            </div>
          ))}
        </div>
      </Content>
    </div>
  );
}

export default Textures;
