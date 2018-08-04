import React from 'react';

import './buttons.css';

class Buttons extends React.Component {
  undoButtonClick = () => {
    this.props.unDraftPlayer(this.props.details);
  }

  render () {

    return (
      <div className="col-sm-12">
        <div className="text-center">
          <button className="btn btn-warning text-center undo" onClick={this.undoButtonClick}>Undo</button>
        </div>
      </div>
    );
  }
}

export default Buttons;
