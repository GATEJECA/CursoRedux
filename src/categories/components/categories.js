import React from 'react';
import Category from './category';
import './categories.css';
import Search from '../../widgets/containers/search';
import Media from '../../playlist/components/media';

function Categories(props) {
  return (
    <div className="Categories">
      <Search />
      {
        props.isLoading &&
        <p>Buscando tus videos favoritos...</p>
      }
      {
        props.search.map((item)=>{
          //el ...item.toJS() es mejor pasarlo cada uno de los atributos
          return <Media openModal={props.handleOpenModal} key={item.get("id")} {...item.toJS()} />
        })
      }
      {
        props.categories.map((item) =>{
          return (
            <Category
              key={item.get("id")}
              {...item.toJS()}
              handleOpenModal={props.handleOpenModal}
            />
          )
        })
      }
    </div>
  )
}

export default Categories
