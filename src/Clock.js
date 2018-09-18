import React from 'react';
class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          date: new Date(),
          desc: 'Hello, world!'
      };
      this.handleClick = this.handleClick.bind(this);
    }
   
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
   
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
   
    tick() {
      this.setState({
        date: new Date()
      });
    }
    /*
    handleClick = () => {
        this.state.desc = '已激活'
    }
    */
    handleClick() {
        this.state.desc = '已激活'
    }

    render() {
      return (
        <div>
          <h1>{this.state.desc}</h1>
          <h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
          <div>
           <button onClick={this.handleClick}>激活按钮</button>
         </div>   
        </div>
        
      );
    }
  }
export default Clock;