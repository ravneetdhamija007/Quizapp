import React from 'react'

function ErrorBoundary(props){
  if (props.hasError) {
      // Rendering error page
      return (
        <div className="main">
          <div className="something-wrong">
              <h2>Something Went Worng!</h2>
              <h3>Please Try After Sometime</h3>
          </div>
        </div>
        );
    } else {
     return props.children;
    }
  }
export default ErrorBoundary
