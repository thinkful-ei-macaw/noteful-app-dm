import React from 'react';


class ErrorBoundary extends React.Component{
  state = { error: null };

  static getDerivedStateFromError(err){
    return { error: err }
}
  render(){
    let err = this.props.appError || this.state.error || null;
    if (err){
      return(
        <main className="error">
          <div>
            <h1>Welp...</h1>
            <p>
              That's embarrasing. Something went <em>terribly</em> wrong.<br/>
              <span>{err.message}</span>
            </p>
          </div>
        </main>
      )
    }
    return this.props.children;
  }
  }




export default ErrorBoundary;