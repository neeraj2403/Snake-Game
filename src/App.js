/* eslint-disable default-case */


import React, { Component } from 'react';
import Snake from './Components/Snake';
import Food from './Components/Food';
import Obstacle from './Components/obstacles';

// Find randaom coordinates for positioning the food
const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

// Initialising the different properties of the game
const initialState = {
  food: getRandomCoordinates(),
  speed: 100,
  direction: '',
  temp:'',
  pattern:null,
  snakeDots: [
    [0,0],
    [2,0],
    [4,0]
  ],
  // coordinates for obstacles
  obstacles: [
    [38,20],[40,20],[42,20],[44,20],[46,20],[48,20],[50,20],[52,20],[54,20],[56,20],[58,20],[60,20],[62,20],[64,20],
    [38,70],[40,70],[42,70],[44,70],[46,70],[48,70],[50,70],[52,70],[54,70],[56,70],[58,70],[60,70],[62,70],[64,70],
    [30,28],[30,30],[30,32],[30,34],[30,36],[30,38],[30,40],[30,42],[30,44],[30,46],[30,48],[30,50],[30,52],[30,54],[30,56],[30,58],[30,60],
    [70,28],[70,30],[70,32],[70,34],[70,36],[70,38],[70,40],[70,42],[70,44],[70,46],[70,48],[70,50],[70,52],[70,54],[70,56],[70,58],[70,60]
  ],
  obstacles2: [
    [30,20],[32,20],[28,20],[34,20],[36,20],[38,20],[40,20],[42,20],[44,20],[46,20],[47,20],[28,22],[28,24],[28,26],[28,28],[28,30],[28,32],[28,34],[28,36],[28,38],
    [52,70],[54,70],[56,70],[58,70],[60,70],[62,70],[64,70],[66,70],[68,70],[70,70],[70,68],[70,66],[70,64],[70,62],[70,60],[70,58],[70,56],[70,54],[70,52],
    [12,90],[14,90],[16,90],[18,90],[20,90],[22,90],[24,90],[26,90],[28,90],[30,90],[32,90],[34,90],[36,90],[38,90],[40,90],[42,90],[44,90],
    [12,88],[12,86],[12,84],[12,82],[12,80],[12,78],[12,76],[12,74],[12,72],[12,70],[12,68],[12,66],[12,64],[12,62],[12,60],[12,58],[12,56],
    [90,10],[90,12],[90,14],[90,16],[90,18],[90,20],[90,22],[90,24],[90,26],[90,28],[90,30],[90,32],[90,34],[90,36],[90,38],[90,40],[90,42],
    [88,10],[86,10],[84,10],[82,10],[80,10],[78,10],[76,10],[74,10],[72,10],[70,10],[68,10],[66,10],[64,10],[62,10],[60,10],[58,10],[56,10],
    
  ],
  obstacles3: []
}


function refreshPage() {
  window.location.reload();
}



class App extends Component {
  state = initialState;
  componentDidMount() {
    document.onkeydown = this.onKeyDown;
    setInterval(this.moveSnake, this.state.speed);
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    if(this.state.pattern){
    this.checkforObstacle();}
    if (this.state.direction){
    this.checkIfCollapsed();}
    this.checkIfEat();
    
    
  }

  // configuring movement of the snake using keyboard arrows
  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case '':
        break;
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }
    if (this.state.direction){
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  }
  }

//checking whether the snake has gone out of the area

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length -1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    })
  }

  // check for finding obstacle
  checkforObstacle() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length -1];
    let obs = [...this.state.pattern];
    obs.pop();
    obs.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    })
  }

  // check whether the food is ate
  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  // function for enlarging the snake when food is ate
  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }
  // function for increasing the speed of the snake when food is ate

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 4
      })
    }
  }

  // alert game over message
  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState)
  }
  getdir(){
    this.setState({temp: this.state.direction})
  }

  // funtion for starting the game using start game button
  startgame(){ 
    if(this.state.direction)
    {this.getdir();
    this.setState({
      direction: ''
    })}
    else if(!this.state.direction && this.state.temp)
    this.setState({
      direction: this.state.temp
    })
    else if(!this.state.direction)
    this.setState({
      direction: 'RIGHT'
    })
  }
  selectpattern() {
    this.setState({pattern:this.state.obstacles})
  }
  selectpattern2() {
    this.setState({pattern:this.state.obstacles2})
  }
  selectpattern3() {
    this.setState({pattern:this.state.obstacles3})
  }
  

  render() {
   
    return (
      
      <div className="game">
      

      <div className = "heading">
      <h1>Snake Game</h1>

      </div>
      <div className = "game-canvas">

        <div className="game-area">

          <Snake snakeDots={this.state.snakeDots}/>
          <Food dot={this.state.food}/>
          <Snake snakeDots={this.state.snakeDots}/>
          <Food dot={this.state.food}/>
          {this.state.pattern==this.state.obstacles && <Obstacle pattern={this.state.obstacles}/>}
          {this.state.pattern==this.state.obstacles2 && <Obstacle pattern={this.state.obstacles2}/>}
          {this.state.pattern==this.state.obstacles3 && <Obstacle pattern={this.state.obstacles3}/>}


        </div>
        <div className="score">
          <h1> Score: {this.state.snakeDots.length - 3} </h1>
          <button className="btn" onClick= {() =>this.startgame()}>START|PAUSE</button>
          <button className="btn" onClick= {refreshPage}>STOP</button>

          <button className="btn" onClick= {() =>this.selectpattern()}>Pattern1</button>
          <button className="btn" onClick= {() =>this.selectpattern2()}>Pattern2</button>
          <button className="btn" onClick= {() =>this.selectpattern3()}>No pattern</button>

        

        

        </div>
        

        </div>
      
      </div>
     
      
    );
    
  }
}

export default App;