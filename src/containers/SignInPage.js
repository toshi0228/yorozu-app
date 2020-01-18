import React from 'react'
// import PlanList from "../components/planList"
import { connect } from 'react-redux'
import { sigIn } from '../actions/'
import { Link } from 'react-router-dom'
import '../styles/Header.scss';



class SignInPage extends React.Component {
    // componentDidMount(){
    //     this.props.sigIn()
    //     console.log("propsの中身")
    //     console.log(this.props)
    // }


    render(){

        return (
            <div>
                {/* <h2 className="total-socre">プランリスト</h2> */}
                <div className='header-wrap'>
                    <h2 className='plan-list'>ログインページ</h2>
                    <div className='rogin-btn'>
                    <Link to="/"><div onClick={(user)=>{sigIn(user)}}>ホーム </div></Link>
                        {/* <Link to="/events/signin">new Event</Link> */}
                    </div>
                </div>
                <hr className='header-borde-line'/>
            </div>
            )
    }
  }



const mapStateToProps = (state) => {
    return {
      planList: state.planData.planList,
    };
  };
  

const mapDispatchToProps = dispatch => {
  return {
    sigIn: () => dispatch(sigIn())
    // changeScore: (id) => dispatch(changeScore(id))
    // readEvents: () => dispatch(readEvents())
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps )(SignInPage);