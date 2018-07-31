import React from 'react';

import './buttons.css';

class Buttons extends React.Component {

  resetButtonClick = () => {
    console.log('wip');
  }

  undoButtonClick = () => {
    console.log(this.props.draftOrder);
  }

  render () {

    return (
      <div className="col-sm-12">
        <div className="col-sm-6">
          <button className="btn btn-default text-center" onClick={this.undoButtonClick}>Undo</button>
        </div>
        <div className="col-sm-6">
          <button className="btn btn-default text-center" onClick={this.resetButtonClick}>Reset Draft</button>
        </div>
      </div>
    );
  }
}

export default Buttons;
