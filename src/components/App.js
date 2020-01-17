import React from 'react';
import PlanList from "../containers/PlanList"
import Header from '../containers/Header'
import '../styles/App.scss';
import { readEvents } from '../actions'
import { connect } from 'react-redux'




class App extends React.Component{
  componentDidMount(){
    this.props.readEvents()
    console.log("hi")
  }


  render(){

      // const {number, plus} = this.props

    return(
      <div className="wrap">
        {/* <h2 className="aaa">合計点数{number}</h2>
        <button onClick={()=>{plus(10)}}>プラス</button> */}
        <Header/>
        <PlanList/>
      </div>
    )
  }
};

const mapStateToProps = (state) => state



const mapDispatchToProps = dispatch => {
  return {
    readEvents: () => dispatch(readEvents())
  }
}

// const mapDispatchToProps = ({readEvents})
  
export default connect(mapStateToProps, mapDispatchToProps)(App);