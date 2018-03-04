import React, { Component } from 'react';
import HomeLayout from '../components/home-layout';
import Categories from '../../categories/components/categories';
import Related from '../components/related';
import ModalContainer from '../../widgets/containers/modal';
import Modal from '../../widgets/components/modal';
import HandleError from '../../error/containers/handle-error';
import VideoPlayer from '../../player/containers/video-player';
import { connect } from "react-redux";
import { List as list } from 'immutable';
import * as actions from '../../actions/index';
import { bindActionCreators } from "redux";


class Home extends Component {
  /*state = {
    modalVisible: false,
  }*/
  handleOpenModal = (id) => {
    /* this.setState({
      modalVisible: true,
      media
    }); */
    /* this.props.dispatch({
      type: 'OPEN_MODAL',
      payload:{
        mediaId:id
      }
    }); */
    //usando bind actions, en search js esta otra forma
    this.props.actions.openModal(id);
  }
  handleCloseModal = (event) => {
    /*this.setState({
      modalVisible: false,
    })*/
    /* this.props.dispatch({
      type:'CLOSE_MODAL'
    }); */
    this.props.actions.closeModal();
  }
  render() {
    return (
      <HandleError>
        <HomeLayout>
          <Related />
          <Categories
            categories={this.props.categories}
            handleOpenModal={this.handleOpenModal}
            search={this.props.search}
            isLoading={this.props.isLoading}
          />
          {
            this.props.modal.get("visibility") &&
            <ModalContainer>
              <Modal
                handleClick={this.handleCloseModal}
              >
                <VideoPlayer
                  autoplay
                  id={this.props.modal.get("mediaId")}
                  //src={this.state.media.src}
                  //title={this.state.media.title}
                />
              </Modal>
            </ModalContainer>
          }
        </HomeLayout>
      </HandleError>
    )
  }
}
let mapStateToProps = (state, props) => {
  //const categories = state.data.categories.map((categoryId) => state.data.entities.categories[categoryId]);
  //se puede acceder por propiedad
  //const categories = state.get('data').get('categories').map((categoryId) => state.get('data').get('entities').get('categories').get(categoryId);
  //o por getIn
  const categories = state.getIn(['data', 'categories']).map((categoryId) => state.getIn(['data', 'entities', 'categories', categoryId]));
  let searchResults = list();
  const search = state.getIn(['data', 'search']);
  if (search) {
    const mediaList = state.get('data').get('entities').get('media');
    searchResults = mediaList.filter((item) => {
      if (item.get('author').toLowerCase().includes(search.toLowerCase()) || item.get('title').toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      return false;
    }).toList();
  }
  return {
    categories,
    search: searchResults,
    modal:state.get('modal'),
    isLoading: state.get('isLoading').get('active')
  }
};
const mapDispatchToProps=(dispatch)=>{
  return {
    actions:bindActionCreators(actions,dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps )(Home);

/*
  existe un shorthand donde no es necesario importar bindAnctionCreators, 
  consiste en que mapDispatchToProps sea un objeto en vez de una funcion y recibe
  las acciones como propiedades asi podran ser usadas directamente en los 
  props del componente.
  import { openModal, closeModal } from'.../../actions/index';
  const mapDispatchToProps = {
    openModal,
    closeModal,
  }
  Esta sugerencia es ideal si no tienes intención o necesidad de hacer uso de la función dispatch 
  del store, sino solamente pasar las acciones a connect, 
  ya que de esa manera no podrás disponer de acceso a dispatch en tu componente.

  Si no suministras la segunda opción a connect, React-redux devolverá una versión por defecto 
  de dispatch y la asignará a props.

  Si usas tu propia functión mapDispatchToProps, dispatch no estará disponible de manera 
  automática, por lo que deberás asegurarte de pasarla en tu función, si 
  es que piensas usarla más adelante.

*/