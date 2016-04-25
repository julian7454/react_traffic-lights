var TrafficLight = React.createClass({

  render: function(){
    console.log(this.props.key , this.props.children)
    return (<li className={this.props.open} key={this.props.key} style={{background:this.props.children}}></li>);
  }
});

var TrafficLights = React.createClass({
  tick: function() {

    var targetIndex =  _.findIndex(this.state.trafficlights , { open : true }) ;
   
    //所在位置在最後一個
    if ( targetIndex == this.state.trafficlights.length-1 ) {

      this.state.trafficlights.map(function(value) {
        value.open = false;

      });

      this.state.trafficlights[0].open = true; 
    }
    //所在位置有下一個
    else {
      this.state.trafficlights[targetIndex].open = false ;
      this.state.trafficlights[targetIndex +1 ].open = true ;
    }

    this.setState({trafficlights : this.state.trafficlights });

  },
  componentDidMount: function() {
    this.setState({trafficlights : this.props.trafficlights});
    this.interval = setInterval(this.tick, 2000);
  },
  render: function() {
    var displayItems = this.props.trafficlights.map(function(trafficlight) {
      //return (<li key={trafficlight.id}>{trafficlight.color}</li>);
      return (<TrafficLight open={trafficlight.open} key={trafficlight.id}>{trafficlight.color}</TrafficLight>);
    });
   
    return (
      <div>
        <ul>
          {displayItems}
        </ul>
      </div>
    );
  }
});

var TRAFFICLIGHTS = [
  {id : 1 ,color: 'red', open: true},
  {id : 2 ,color: 'yellow', open: false},
  {id : 3 ,color: 'green', open: false}
];

var TrafficLightsOuter = React.createClass({

  render: function() {
    
    return (
      <TrafficLights trafficlights={TRAFFICLIGHTS} />
    );
  }
});



ReactDOM.render(
  <TrafficLightsOuter />,
  document.getElementById('container')
);