import PlanList from "../components/planList"
import { connect } from 'react-redux'
import { changeScore} from '../actions/plus'





const mapStateToProps = (state) => {
    return {
      planList: state.planData.planList,
    };
  };


const mapDispatchToProps = dispatch => {
  return {
    changeScore: (id) => dispatch(changeScore(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps )(PlanList);