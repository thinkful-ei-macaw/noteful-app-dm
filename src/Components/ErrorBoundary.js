import React from 'react';


class ErrorBoundary extends React.Component{
  state={error:null};
  static getDerivedStateFromError(err){
    return {error:err}
}
  render(){
      if (this.state.error){
          return(
              <p>{this.state.error}</p>
          )
      }
      return this.props.children;
  }
  }




export default ErrorBoundary;