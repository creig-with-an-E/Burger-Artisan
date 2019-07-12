import React from "react"
import Modal from "../../components/common/Modal"
import Aux from "../Aux"

const withErrorHandler=(WrapperdComponent, axios)=>{
  return class extends React.Component {
    state ={
      error: null
    }
    componentWillMount(){
      this.reqInterceptor =axios.interceptors.request.use(request=>{
        this.setState({error: null})
        return request
      })
      this.responseInterceptor =axios.interceptors.response.use(response=>response, error=>{
        this.setState({error: error})
      })
    }

    componentWillUnmount(){
      console.log(`will unmount ${this.reqInterceptor} ${this.responseInterceptor}`)
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.responseInterceptor)

    }
    errorConfirmedHandler=()=>{
       this.setState({ error:null })
     }
    render(){
      return (
        <Aux>
            <Modal show={this.state.error}
              closeModal={this.errorConfirmedHandler}
            >
              {this.state.error? this.state.error.message: null}  
            </Modal>
          <WrapperdComponent {...this.props}/>
        </Aux>)
    }
  }
}

export default withErrorHandler